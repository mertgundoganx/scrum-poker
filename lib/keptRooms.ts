import 'server-only';
import { cache } from 'react';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { redis } from '@/lib/redis';
import { liveRoom, ensureRoomsLoaded, reviveRoom, restoreIssueUrl, ROOM_NAME_FALLBACK, type Room } from '@/lib/store';
import { roomLogger } from '@/lib/logger';
import { cutText, isDeckType } from '@/lib/deck';
import { MAX_PARTICIPANTS, MAX_ROOM_NAME } from '@/lib/limits';

/*
 * Kept rooms: the host can keep a room, so its code, name, deck, settings,
 * story queue and the last results outlive the room itself (which is deleted
 * an hour after it empties). Opening the link of a kept room that is gone
 * brings it back.
 *
 * There are no accounts. Keeping a room hands out an owner key: the browser
 * remembers it, and the owner link (/room/CODE#owner=KEY) carries it to other
 * devices. Whoever shows the key is an owner: they take the host role from
 * anyone without it and can stop keeping the room. Only its SHA-256 is stored.
 *
 * They live in Redis under kept:CODE with a 180-day expiry that the owner
 * renews by coming back, and a sorted set (kept:index, no expiry, so Redis
 * never evicts it) caps how many there are. Without Redis (development) they
 * are kept in memory. A Redis problem never breaks a room: it then behaves as
 * if nothing were kept.
 */

const ROOM_CODE = /^[A-Z0-9]{8}$/;
// 256 bits, base64url: 43 characters.
const OWNER_KEY = /^[A-Za-z0-9_-]{43}$/;
const KEPT_PREFIX = 'kept:';
const INDEX_KEY = 'kept:index';
const DAY_MS = 24 * 60 * 60 * 1000;
// Every time its owner comes back with the key, a kept room has this long again.
const KEPT_TTL_MS = 180 * DAY_MS;
// A room nobody came back to after keeping it goes sooner: a flood of kept
// rooms must not hold the server's kept-room limit for half a year.
const FIRST_TTL_MS = 30 * DAY_MS;
// At most this many kept rooms (about 25 KB each at the very most: a full
// queue and 50 results). Past it, keeping a room answers "try later".
const MAX_KEPT_ROOMS = 5_000;
const MAX_FINALS = 50;
// Changes to a kept room are written at most this often.
const SYNC_DELAY_MS = 1_000;

export interface KeptFinal { item: string; final?: string; ts: number }

interface KeptRecord {
  name: string;
  deckType: string;
  customCards: string[];
  autoReveal: boolean;
  anonymous: boolean;
  hostRuns: boolean;
  reactions: boolean;
  issueUrl: string;
  queue: string[];
  finals: KeptFinal[];
  ownerKeyHash: string;
  keptAt: number;
}

/* ── Storage: Redis, or this process's memory without it ── */

declare global {
  var __scrumKeptRooms: Map<string, { record: KeptRecord; expiresAt: number }> | undefined;
  var __scrumKeptSyncs: Map<string, { timer: ReturnType<typeof setTimeout>; latest: ReturnType<typeof fields> }> | undefined;
}
const memory = (global.__scrumKeptRooms ??= new Map());
const pendingSyncs = (global.__scrumKeptSyncs ??= new Map());

const strings = (v: unknown): string[] => (Array.isArray(v) ? v.filter((s): s is string => typeof s === 'string') : []);

/**
 * A stored record, with the fields added after it was written filled in. The
 * name is cleaned here (lookups show it); the rest when the room is opened
 * again (cleanRestoredRoom in lib/store.ts). Without a SHA-256 hash it is
 * nobody's: unusable.
 */
function asRecord(r: unknown): KeptRecord | null {
  const o = r as Partial<KeptRecord> | null;
  if (typeof o?.name !== 'string' || typeof o.deckType !== 'string' || typeof o.ownerKeyHash !== 'string') return null;
  if (!/^[0-9a-f]{64}$/.test(o.ownerKeyHash)) return null;
  return {
    name: cutText(o.name, MAX_ROOM_NAME) || ROOM_NAME_FALLBACK,
    deckType: isDeckType(o.deckType) ? o.deckType : 'scrum',
    customCards: strings(o.customCards),
    autoReveal: o.autoReveal === true,
    anonymous: o.anonymous === true,
    hostRuns: o.hostRuns === true,
    reactions: o.reactions !== false,
    issueUrl: typeof o.issueUrl === 'string' ? o.issueUrl : '',
    queue: strings(o.queue),
    finals: Array.isArray(o.finals) ? o.finals.filter(f => typeof f?.item === 'string' && typeof f.ts === 'number') : [],
    ownerKeyHash: o.ownerKeyHash,
    keptAt: typeof o.keptAt === 'number' ? o.keptAt : 0,
  };
}

async function read(id: string): Promise<KeptRecord | null> {
  if (!redis) {
    const entry = memory.get(id);
    if (entry && entry.expiresAt > Date.now()) return entry.record;
    memory.delete(id);
    return null;
  }
  const raw = await redis.get(KEPT_PREFIX + id);
  if (!raw) return null;
  try {
    return asRecord(JSON.parse(raw));
  } catch {
    return null;
  }
}

// One atomic step: drop expired index entries, refuse a kept code or a full
// index, then store the record and index it by its expiry.
const KEEP_SCRIPT = `
redis.call('ZREMRANGEBYSCORE', KEYS[2], '-inf', ARGV[3])
if redis.call('EXISTS', KEYS[1]) == 1 then return 'taken' end
if redis.call('ZCARD', KEYS[2]) >= tonumber(ARGV[4]) then return 'full' end
redis.call('SET', KEYS[1], ARGV[1], 'PX', ARGV[2])
redis.call('ZADD', KEYS[2], tonumber(ARGV[3]) + tonumber(ARGV[2]), ARGV[5])
return 'ok'
`;

async function create(id: string, record: KeptRecord): Promise<'ok' | 'taken' | 'full'> {
  const now = Date.now();
  if (!redis) {
    for (const [code, entry] of memory) if (entry.expiresAt <= now) memory.delete(code);
    if (memory.has(id)) return 'taken';
    if (memory.size >= MAX_KEPT_ROOMS) return 'full';
    memory.set(id, { record, expiresAt: now + FIRST_TTL_MS });
    return 'ok';
  }
  return await redis.eval(KEEP_SCRIPT, 2, KEPT_PREFIX + id, INDEX_KEY, JSON.stringify(record), FIRST_TTL_MS, now, MAX_KEPT_ROOMS, id) as 'ok' | 'taken' | 'full';
}

/** Store a changed record of a room that is still kept. Its expiry stays: only the owner coming back renews it. */
async function update(id: string, record: KeptRecord): Promise<void> {
  if (!redis) {
    const entry = memory.get(id);
    if (entry) memory.set(id, { record, expiresAt: entry.expiresAt });
    return;
  }
  await redis.set(KEPT_PREFIX + id, JSON.stringify(record), 'KEEPTTL', 'XX');
}

async function drop(id: string): Promise<void> {
  if (!redis) memory.delete(id);
  else await redis.multi().del(KEPT_PREFIX + id).zrem(INDEX_KEY, id).exec();
}

async function renew(id: string): Promise<void> {
  if (!redis) {
    const entry = memory.get(id);
    if (entry) entry.expiresAt = Date.now() + KEPT_TTL_MS;
  } else if (await redis.pexpire(KEPT_PREFIX + id, KEPT_TTL_MS)) {
    await redis.zadd(INDEX_KEY, 'XX', Date.now() + KEPT_TTL_MS, id);
  }
}

/* ── Owner keys ── */

function hashKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}

/** Whether `key` is the owner key whose hash is `hash`. */
function keyMatches(key: unknown, hash: string | undefined): key is string {
  if (!hash || typeof key !== 'string' || !OWNER_KEY.test(key)) return false;
  return timingSafeEqual(Buffer.from(hashKey(key), 'hex'), Buffer.from(hash, 'hex'));
}

/* ── Kept rooms ── */

/** A kept room's record, or null (also when it can't be read). */
async function lookUp(id: string): Promise<KeptRecord | null> {
  if (!ROOM_CODE.test(id)) return null;
  return read(id).catch(err => {
    roomLogger.warn({ err, roomId: id }, 'Could not look up a kept room');
    return null;
  });
}

/**
 * The live room, or the kept room with this code opened again; null if
 * neither (or if the server can't take another live room right now). Only
 * joining opens a kept room again (looking a code up must not fill the
 * server), and that doesn't renew its time: only its owner coming back does.
 */
export async function getOrReviveRoom(id: string): Promise<Room | null> {
  await ensureRoomsLoaded();
  const live = liveRoom(id);
  if (live) return live;
  const kept = await lookUp(id);
  if (!kept) return null;
  if (!reviveRoom({ id, ...kept })) return null;
  return liveRoom(id);
}

/** The name and deck of a live or kept room, without opening a kept one. */
export async function roomExists(id: string): Promise<{ id: string; name: string; deckType: string; participantCount: number; maxParticipants: number } | null> {
  await ensureRoomsLoaded();
  const live = liveRoom(id);
  if (live) return { id, name: live.name, deckType: live.deckType, participantCount: Object.keys(live.participants).length, maxParticipants: live.maxParticipants };
  const kept = await lookUp(id);
  return kept ? { id, name: kept.name, deckType: kept.deckType, participantCount: 0, maxParticipants: MAX_PARTICIPANTS } : null;
}

/**
 * The id and name of the room with this code, live or kept, for the room
 * page: once per request, however often the page asks. A kept room is opened
 * again only when someone joins it.
 */
export const roomSummary = cache(async (id: string): Promise<{ id: string; name: string } | null> => {
  const room = await roomExists(id);
  return room ? { id: room.id, name: room.name } : null;
});

/** Whether a kept room uses this code (new rooms must not take it). */
export async function isKeptCode(id: string): Promise<boolean> {
  return (await lookUp(id)) !== null;
}

/**
 * Whether `key` is the owner key of the kept room `id`. A match is the owner
 * coming back: the room's 180 days start again.
 */
export async function isOwnerKey(id: string, key: unknown): Promise<boolean> {
  if (typeof key !== 'string' || !OWNER_KEY.test(key)) return false;
  const owns = keyMatches(key, (await lookUp(id))?.ownerKeyHash);
  if (owns) renew(id).catch(() => {});
  return owns;
}

function fields(room: Room) {
  return {
    name: room.name,
    deckType: room.deckType,
    customCards: room.customCards ?? [],
    autoReveal: room.settings?.autoReveal ?? false,
    anonymous: room.settings?.anonymous ?? false,
    hostRuns: room.settings?.hostRuns ?? false,
    reactions: room.settings?.reactions ?? true,
    issueUrl: room.settings?.issueUrl ?? '',
    queue: [...room.queue],
    // Stories and the agreed estimates only: never names or votes.
    finals: room.history.slice(-MAX_FINALS).map(h => ({ item: h.item, ts: h.ts, ...(h.final ? { final: h.final } : {}) })),
  };
}

/**
 * Keep the room and return its new owner key. 'taken' when it is kept
 * already, 'full' when the server keeps as many rooms as it will.
 */
export async function keepRoom(room: Room): Promise<{ key: string } | 'taken' | 'full' | 'error'> {
  const key = randomBytes(32).toString('base64url');
  try {
    const result = await create(room.id, { ...fields(room), ownerKeyHash: hashKey(key), keptAt: Date.now() });
    return result === 'ok' ? { key } : result;
  } catch (err) {
    roomLogger.error({ err, roomId: room.id }, 'Could not keep a room');
    return 'error';
  }
}

/**
 * The owner arrived with the key: the issue link goes back to the one they
 * kept, in case someone without the key changed it while they were away
 * (a link everyone clicks is worth faking).
 */
export async function ownerArrived(id: string): Promise<void> {
  // A change the owner made a moment ago may not be stored yet.
  const issueUrl = pendingSyncs.get(id)?.latest.issueUrl ?? (await lookUp(id))?.issueUrl;
  if (issueUrl !== undefined) restoreIssueUrl(id, issueUrl);
}

/** Stop keeping the room (the caller checked the owner key). */
export async function forgetRoom(id: string): Promise<void> {
  const pending = pendingSyncs.get(id);
  if (pending) { clearTimeout(pending.timer); pendingSyncs.delete(id); }
  await drop(id).catch(err => {
    roomLogger.error({ err, roomId: id }, 'Could not forget a kept room');
  });
}

/** Stop keeping the room, if `key` is its owner key. */
export async function forgetRoomWithKey(id: string, key: unknown): Promise<boolean> {
  if (typeof key !== 'string' || !OWNER_KEY.test(key)) return false;
  if (!keyMatches(key, (await lookUp(id))?.ownerKeyHash)) return false;
  await forgetRoom(id);
  return true;
}

/**
 * After a change to a kept room (deck, settings, queue, a finished round),
 * keep it: only a change an owner made while an owner is the host, so whoever
 * had the role in between doesn't rewrite their room. Coalesced, at most once
 * a second; what is written is the room as the owner's last change left it,
 * even if the host role has moved on since.
 */
export function syncKeptRoom(room: Room, actorId: string): void {
  if (!room.kept || !room.owners?.includes(actorId) || !room.owners.includes(room.creatorId)) return;
  const id = room.id;
  const pending = pendingSyncs.get(id);
  if (pending) { pending.latest = fields(room); return; }
  const timer = setTimeout(() => {
    const latest = pendingSyncs.get(id)?.latest;
    pendingSyncs.delete(id);
    if (!latest || !liveRoom(id)?.kept) return;
    void (async () => {
      const kept = await read(id);
      if (kept) await update(id, { ...kept, ...latest });
    })().catch(err => {
      roomLogger.warn({ err, roomId: id }, 'Could not update a kept room');
    });
  }, SYNC_DELAY_MS);
  timer.unref?.();
  pendingSyncs.set(id, { timer, latest: fields(room) });
}
