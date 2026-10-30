import 'server-only';
import { EventEmitter } from 'events';
import { roomLogger } from '@/lib/logger';
import { cutText, getCards, cleanCustomCards, cleanIssueUrl, isDeckType, type DeckType } from '@/lib/deck';
import { AVATARS, MAX_CARD, MAX_CHAT, MAX_NAME, MAX_PARTICIPANTS, MAX_QUEUE, MAX_ROOM_NAME, MAX_STORY, MIN_CUSTOM_CARDS, REACTIONS, ROOM_CODE_LENGTH, TIMER_LIMITS_MS } from '@/lib/limits';

export { cutText, getCards, cleanCustomCards, DECK_CARDS, DECK_TYPES, type DeckType } from '@/lib/deck';
export { MAX_PARTICIPANTS, MAX_QUEUE, REACTIONS, TIMER_LIMITS_MS } from '@/lib/limits';
// Lazy Redis import — only loaded server-side, never bundled to client
type RedisModule = typeof import('@/lib/redis');
function getRedisSync(): RedisModule | null {
  if (typeof window !== 'undefined') return null; // client-side
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('@/lib/redis') as RedisModule;
  } catch {
    return null;
  }
}

// Non-blocking Redis persist, coalesced: a burst of changes (everyone voting
// at once) becomes one write of the room's latest state. Nothing is written
// once the process is shutting down: the replica replacing this one owns the
// rooms by then, and a late timer here must not overwrite its newer state.
const SAVE_DELAY_MS = 250;
const pendingSaves = new Map<string, ReturnType<typeof setTimeout>>();

function saveToRedis(roomId: string): void {
  if (global.__scrumShuttingDown || pendingSaves.has(roomId)) return;
  const timer = setTimeout(() => writeRoom(roomId), SAVE_DELAY_MS);
  timer.unref?.();
  pendingSaves.set(roomId, timer);
}

function writeRoom(roomId: string): Promise<void> {
  pendingSaves.delete(roomId);
  const room = rooms.get(roomId);
  return room ? getRedisSync()?.persistRoom(roomId, room).catch(() => {}) ?? Promise.resolve() : Promise.resolve();
}

/** Write every pending change now (before the process exits). */
function flushSaves(): Promise<unknown> {
  const writes: Promise<void>[] = [];
  for (const [roomId, timer] of pendingSaves) {
    clearTimeout(timer);
    writes.push(writeRoom(roomId));
  }
  return Promise.all(writes);
}

function saveChatToRedis(roomId: string, msgs: ChatMessage[]): void {
  if (global.__scrumShuttingDown) return;
  getRedisSync()?.persistChat(roomId, msgs).catch(() => {});
}


export interface Participant {
  id: string;
  name: string;
  avatar: string;
  /** Spectator: watches the round but doesn't vote (self-toggled anytime) */
  spectator?: boolean;
  /** No live connection; removed if it doesn't come back in time */
  away?: boolean;
}

export interface RoundHistory {
  item: string;
  /** Who voted what; in anonymous rooms the keys are placeholders and names empty */
  votes: Record<string, { name: string; card: string }>;
  deckType: DeckType;
  ts: number;
  /** The estimate the team settled on, when one was picked */
  final?: string;
}

export interface RoomSettings {
  /** Reveal (after the usual countdown) as soon as everyone present has voted */
  autoReveal: boolean;
  /** After the reveal show the cards, but not who played which */
  anonymous: boolean;
  /** Only the host runs the round: reveal, next round, the queue and the timer */
  hostRuns: boolean;
  /** Nobody new can join; people already in the room (and owners) still can */
  closed: boolean;
  /** People can throw emoji reactions */
  reactions: boolean;
  /** Link for issue keys in stories, with {key} where the key goes (https only); '' for none */
  issueUrl: string;
}

export { cleanIssueUrl };

export const DEFAULT_SETTINGS: RoomSettings = { autoReveal: false, anonymous: false, hostRuns: false, closed: false, reactions: true, issueUrl: '' };

/** One of the avatars to pick from, or '' (the name's initial). */
export function cleanAvatar(value: unknown): string {
  return typeof value === 'string' && (AVATARS as readonly string[]).includes(value) ? value : '';
}

export interface Room {
  id: string;
  name: string;
  creatorId: string;
  deckType: DeckType;
  customCards: string[] | null;
  maxParticipants: number;
  participants: Record<string, Participant>;
  currentItem: string;
  votes: Record<string, string>;
  revealed: boolean;
  locked: boolean;
  createdAt: number;
  history: RoundHistory[];
  queue: string[];
  /** Shared timer: epoch ms when started, or null while paused */
  timerStartedAt: number | null;
  /** Accumulated elapsed ms from previous start/stop cycles */
  timerAccumMs: number;
  /** Countdown length in ms, or null when the timer counts up */
  timerLimitMs?: number | null;
  /** Ids the host removed; they can't join again */
  banned: string[];
  /** How the room votes; only the host changes these */
  settings: RoomSettings;
  /** Kept: its code and setup survive deletion (see lib/keptRooms.ts) */
  kept?: boolean;
  /**
   * Who showed the owner key in this room's life (they manage the kept room).
   * Server-side only, like `banned`.
   */
  owners?: string[];
  /** Per viewer: whether they showed the owner key. Never stored. */
  isOwner?: boolean;
  /**
   * Anonymous rooms after the reveal: the cards without who played them
   * (sent instead of the per-person values). Never stored.
   */
  anonymousVotes?: string[];
  /** Grows with every change, so clients can drop snapshots older than one they have */
  version: number;
  /** Server clock when this copy was sent; clients use it for the shared timer */
  serverNow?: number;
}

/**
 * Why the store refused an action; the route answers with it as the error
 * code (refused() in lib/roomRequest.ts). `host_only`: only the host, or
 * whoever may run the round, does this. `item_gone`: the story it names is no
 * longer in the queue, or no longer current. `round_changed`: the round moved
 * on (revealed, locked for the reveal, or the next one started).
 * `spectator`: spectators don't vote. `anonymous_locked`: anonymous voting
 * stays on while the round has votes. `rejected`: anything else.
 */
export type Refusal = 'host_only' | 'item_gone' | 'round_changed' | 'spectator' | 'anonymous_locked' | 'rejected';

const MAX_HISTORY = 50;
const MAX_HISTORY_BYTES = 48_000;

/** Own keys only: ids such as "constructor" must not match Object.prototype. */
function has(obj: object, key: string): boolean {
  return Object.hasOwn(obj, key);
}

/** Votes are open to everyone: revealed, and the room isn't anonymous. */
function votesOpen(room: Room): boolean {
  return room.revealed && !room.settings?.anonymous;
}

/**
 * Votes as `viewerId` may see them. Keys are kept so clients can show who has
 * voted; the values stay hidden (except the viewer's own) until the reveal,
 * and in anonymous rooms for good — the revealed cards then come as a sorted
 * list that says nothing about who played which.
 */
function viewerVotes(room: Room, viewerId: string | null): { votes: Record<string, string>; anonymousVotes?: string[] } {
  const open = votesOpen(room);
  const votes: Record<string, string> = {};
  for (const [uid, card] of Object.entries(room.votes)) votes[uid] = open || uid === viewerId ? card : '✓';
  return room.revealed && room.settings?.anonymous ? { votes, anonymousVotes: Object.values(room.votes).sort() } : { votes };
}

/** The room as `viewerId` may see it. The ban list and the owners stay on the server. */
export function sanitizeRoomForViewer(room: Room, viewerId: string | null): Room {
  const { owners, ...rest } = room;
  return { ...rest, ...viewerVotes(room, viewerId), banned: [], isOwner: viewerId !== null && (owners ?? []).includes(viewerId), serverNow: Date.now() };
}

/* ── Broadcast encoding ───────────────────────────────────────────────
 * One change reaches every open stream of the room. The JSON that is the
 * same for everyone is built once per version; per viewer only the votes
 * differ (until the reveal), and the history is left out when the stream
 * already has it (it is the bulk of a long session's payload).
 */

interface BroadcastParts {
  version: number;
  /** The room's own fields as JSON members, without votes/history/queue/banned/owners/serverNow */
  head: string;
  history: string;
  historyKey: string;
  /** The queue as JSON; also what a stream remembers to know it has it */
  queue: string;
  /** Votes as everyone sees them once revealed */
  revealedVotes: string | null;
}

const partsCache = new Map<string, BroadcastParts>();

function broadcastParts(room: Room): BroadcastParts {
  const cached = partsCache.get(room.id);
  if (cached && cached.version === room.version) return cached;
  const { votes, history, queue, banned: _banned, owners: _owners, isOwner: _isOwner, serverNow: _now, anonymousVotes: _anon, ...rest } = room;
  void _banned; void _owners; void _isOwner; void _now; void _anon;
  const parts: BroadcastParts = {
    version: room.version,
    head: JSON.stringify(rest).slice(1, -1),
    history: JSON.stringify(history),
    historyKey: historyKey(history),
    queue: JSON.stringify(queue),
    revealedVotes: votesOpen(room) ? JSON.stringify(votes) : null,
  };
  partsCache.set(room.id, parts);
  return parts;
}

function historyKey(history: RoundHistory[]): string {
  return `${history.length}:${history.at(-1)?.ts ?? 0}`;
}

/** What a stream last sent of the parts that only go out when they change. */
export interface SentParts { historyKey: string | null; queue: string | null }

/**
 * The room as `viewerId` may see it, as JSON. Without `history` or `queue`
 * when unchanged since `sent`; returns what to remember next.
 */
export function encodeRoomForViewer(room: Room, viewerId: string, sent: SentParts): { json: string; sent: SentParts } {
  const parts = broadcastParts(room);
  let votes = parts.revealedVotes;
  let anonymous = '';
  if (votes === null) {
    const seen = viewerVotes(room, viewerId);
    votes = JSON.stringify(seen.votes);
    if (seen.anonymousVotes) anonymous = `,"anonymousVotes":${JSON.stringify(seen.anonymousVotes)}`;
  }
  const history = parts.historyKey === sent.historyKey ? '' : `,"history":${parts.history}`;
  const queue = parts.queue === sent.queue ? '' : `,"queue":${parts.queue}`;
  return {
    json: `{${parts.head},"votes":${votes}${anonymous},"banned":[],"isOwner":${(room.owners ?? []).includes(viewerId)},"serverNow":${Date.now()}${history}${queue}}`,
    sent: { historyKey: parts.historyKey, queue: parts.queue },
  };
}

/**
 * An action's answer: the room as the actor sees it, without the history
 * unless the action changed it (the stream brings it either way).
 */
export function roomForActor(room: Room, viewerId: string, withHistory = false): Omit<Room, 'history'> & { history?: RoundHistory[] } {
  const { history, ...rest } = sanitizeRoomForViewer(room, viewerId);
  return withHistory ? { ...rest, history } : rest;
}

/**
 * A participant id: the UUID a browser makes for itself (crypto.randomUUID),
 * nothing else. Ids become object keys; a UUID can't be "__proto__".
 */
export function isValidUserId(id: unknown): id is string {
  return typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

// Ids remembered as owners of a kept room (devices and browsers of its owner).
const MAX_OWNERS = 20;
// Ids the host removed, remembered at most.
const MAX_BANNED = 200;

// An emptied room waits this long for its people to come back.
const EMPTY_ROOM_TTL_MS = 60 * 60 * 1000;
// A room nobody ever used (no story, no round) goes sooner: they are cheap to
// make, and a flood of them must not crowd out the rooms people are in.
const UNUSED_ROOM_TTL_MS = 10 * 60 * 1000;
// Live rooms on this server at most; past it new rooms wait (503).
const MAX_ROOMS = 2_000;
// How long someone without a live connection keeps their seat. Covers the
// client's reconnect cycle, a backgrounded phone and a rolling deploy.
const AWAY_GRACE_MS = 90_000;
// After the leave beacon (tab closed or reloaded): long enough for a reload
// to join again, short enough that a closed tab leaves the room promptly.
const LEAVE_GRACE_MS = 15_000;
// A seat whose page never connected: the room page opens its stream within
// a second or two of joining, so a seat still without one is nobody.
const JOIN_GRACE_MS = 30_000;
// Open event streams: per person (tabs and devices) and per room.
const MAX_STREAMS_PER_USER = 5;
const MAX_STREAMS_PER_ROOM = 150;
// An office behind one address has many people, each with a tab or two.
const MAX_STREAMS_PER_ADDRESS = 100;
const MAX_STREAMS = 6_000;
export const MAX_ROOMS_PER_ADDRESS = 20;

declare global {
  var __scrumRooms: Map<string, Room> | undefined;
  var __scrumEmitters: Map<string, EventEmitter> | undefined;
  var __scrumDeleteTimers: Map<string, ReturnType<typeof setTimeout>> | undefined;
  var __scrumRemovals: Map<string, { timer: ReturnType<typeof setTimeout>; at: number }> | undefined;
  var __scrumConnections: Map<string, number> | undefined;
  var __scrumLockTimers: Map<string, ReturnType<typeof setTimeout>> | undefined;
  var __scrumRoomsLoaded: boolean | undefined;
  var __scrumRestorePromise: Promise<void> | undefined;
  var __scrumShutdownHooked: boolean | undefined;
  var __scrumShuttingDown: boolean | undefined;
}

const rooms: Map<string, Room> = (global.__scrumRooms ??= new Map());
const emitters: Map<string, EventEmitter> = (global.__scrumEmitters ??= new Map());
const deleteTimers: Map<string, ReturnType<typeof setTimeout>> = (global.__scrumDeleteTimers ??= new Map());
/** Pending removal of a participant, keyed `${roomId}:${userId}` */
const removals = (global.__scrumRemovals ??= new Map());
/** Open event streams per participant (several tabs share one id) */
const connections: Map<string, number> = (global.__scrumConnections ??= new Map());
const lockTimers: Map<string, ReturnType<typeof setTimeout>> = (global.__scrumLockTimers ??= new Map());
/** Open event streams per room */
const roomStreams: Map<string, number> = ((globalThis as { __scrumRoomStreams?: Map<string, number> }).__scrumRoomStreams ??= new Map());

/** How many more rooms this server takes now. */
export function roomCapacityLeft(): number {
  return MAX_ROOMS - rooms.size;
}

// Who opened which live room, and how many streams each address holds: in
// memory only (never stored), so one address can't take the whole server.
const roomCreators: Map<string, string> = ((globalThis as { __scrumRoomCreators?: Map<string, string> }).__scrumRoomCreators ??= new Map());
const roomsByAddress: Map<string, number> = ((globalThis as { __scrumRoomsByAddress?: Map<string, number> }).__scrumRoomsByAddress ??= new Map());
const streamsByAddress: Map<string, number> = ((globalThis as { __scrumStreamsByAddress?: Map<string, number> }).__scrumStreamsByAddress ??= new Map());
let openStreams = 0;

function addCount(map: Map<string, number>, key: string, by: number): void {
  const n = (map.get(key) ?? 0) + by;
  if (n > 0) map.set(key, n);
  else map.delete(key);
}

/** Live rooms opened from this address. */
export function roomsOpenedBy(address: string): number {
  return roomsByAddress.get(address) ?? 0;
}

/** Whether this participant, from this address, may open another event stream. */
export function canOpenStream(roomId: string, userId: string, address: string): boolean {
  return (connections.get(presenceKey(roomId, userId)) ?? 0) < MAX_STREAMS_PER_USER
    && (roomStreams.get(roomId) ?? 0) < MAX_STREAMS_PER_ROOM
    && (streamsByAddress.get(address) ?? 0) < MAX_STREAMS_PER_ADDRESS
    && openStreams < MAX_STREAMS;
}

/** Nobody has used the room for anything yet. */
function unused(room: Room): boolean {
  return room.history.length === 0 && !room.currentItem && room.queue.length === 0;
}

function scheduleDelete(roomId: string, ms = EMPTY_ROOM_TTL_MS): void {
  cancelDelete(roomId);
  const timer = setTimeout(() => {
    roomLogger.info({ roomId }, 'Room expired and deleted');
    clearTimeout(pendingSaves.get(roomId));
    pendingSaves.delete(roomId);
    getRedisSync()?.deleteRoom(roomId).catch(() => {});
    getRedisSync()?.deleteChat(roomId).catch(() => {});
    emitters.get(roomId)?.removeAllListeners();
    rooms.delete(roomId);
    const creator = roomCreators.get(roomId);
    if (creator !== undefined) {
      roomCreators.delete(roomId);
      addCount(roomsByAddress, creator, -1);
    }
    emitters.delete(roomId);
    deleteTimers.delete(roomId);
    chatHistory.delete(roomId);
    partsCache.delete(roomId);
  }, ms);
  timer.unref?.();
  deleteTimers.set(roomId, timer);
}

function cancelDelete(roomId: string): void {
  const timer = deleteTimers.get(roomId);
  if (timer !== undefined) {
    clearTimeout(timer);
    deleteTimers.delete(roomId);
  }
}

function getEmitter(roomId: string): EventEmitter {
  if (!emitters.has(roomId)) {
    emitters.set(roomId, new EventEmitter().setMaxListeners(MAX_STREAMS_PER_ROOM * 5 + 10));
  }
  return emitters.get(roomId)!;
}

/**
 * Listeners get the live room, not a copy: they encode it synchronously and
 * must neither keep nor change it (copying a long session's room for every
 * change was most of the cost of a broadcast).
 */
function emit(roomId: string): void {
  // A burst of changes (everyone voting at once) becomes one broadcast of
  // the latest state.
  if (pendingEmits.has(roomId)) return;
  pendingEmits.add(roomId);
  setImmediate(() => {
    pendingEmits.delete(roomId);
    const room = rooms.get(roomId);
    if (room) getEmitter(roomId).emit('update', room);
  });
}
const pendingEmits = new Set<string>();

/**
 * Every change goes through here: new version, persisted, broadcast. Returns
 * the live room, as do the actions below: callers serialize it right away and
 * never change or keep it (a copy per action was a copy of the whole history).
 */
function commit(roomId: string, room: Room): Room {
  room.version = (room.version ?? 0) + 1;
  saveToRedis(roomId);
  emit(roomId);
  return room;
}

export function subscribeToRoom(roomId: string, cb: (room: Room) => void): () => void {
  const emitter = getEmitter(roomId);
  emitter.on('update', cb);
  return () => emitter.off('update', cb);
}

/* ── Presence ─────────────────────────────────────────────────────────
 * A participant counts as present while at least one event stream of theirs
 * is open. Without one they are marked away and removed after a grace period,
 * unless they connect or join again first.
 */

function presenceKey(roomId: string, userId: string): string {
  return `${roomId}:${userId}`;
}

function cancelRemoval(roomId: string, userId: string): void {
  const key = presenceKey(roomId, userId);
  const pending = removals.get(key);
  if (pending) {
    clearTimeout(pending.timer);
    removals.delete(key);
  }
}

/** Remove the participant in `ms`, unless an earlier removal is already due. */
function scheduleRemoval(roomId: string, userId: string, ms: number): void {
  const key = presenceKey(roomId, userId);
  const at = Date.now() + ms;
  const pending = removals.get(key);
  if (pending && pending.at <= at) return;
  if (pending) clearTimeout(pending.timer);
  const timer = setTimeout(() => {
    removals.delete(key);
    if ((connections.get(key) ?? 0) > 0) return;
    removeParticipant(roomId, userId);
    roomLogger.info({ roomId, userId }, 'Participant removed after leaving or losing the connection');
  }, ms);
  timer.unref?.();
  removals.set(key, { timer, at });
}

function setAway(room: Room, userId: string, away: boolean): boolean {
  const p = room.participants[userId];
  if (!p || Boolean(p.away) === away) return false;
  p.away = away;
  return true;
}

/** An event stream of this participant opened, from `address`. */
export function connect(roomId: string, userId: string, address: string): void {
  const key = presenceKey(roomId, userId);
  connections.set(key, (connections.get(key) ?? 0) + 1);
  roomStreams.set(roomId, (roomStreams.get(roomId) ?? 0) + 1);
  addCount(streamsByAddress, address, 1);
  openStreams++;
  cancelRemoval(roomId, userId);
  const room = rooms.get(roomId);
  if (!room) return;
  // A live connection keeps the room alive (relevant after a Redis restore,
  // where nobody re-joins but streams reconnect).
  cancelDelete(roomId);
  if (setAway(room, userId, false)) commit(roomId, room);
}

/** An event stream of this participant closed. */
export function disconnect(roomId: string, userId: string, address: string): void {
  addCount(streamsByAddress, address, -1);
  openStreams = Math.max(0, openStreams - 1);
  const streams = (roomStreams.get(roomId) ?? 1) - 1;
  if (streams > 0) roomStreams.set(roomId, streams);
  else roomStreams.delete(roomId);
  const key = presenceKey(roomId, userId);
  const remaining = (connections.get(key) ?? 1) - 1;
  if (remaining > 0) {
    connections.set(key, remaining);
    return;
  }
  connections.delete(key);
  const room = rooms.get(roomId);
  if (!room || !has(room.participants, userId)) return;
  if (setAway(room, userId, true)) commit(roomId, room);
  scheduleRemoval(roomId, userId, AWAY_GRACE_MS);
}

/**
 * The page sent its leave beacon. That also happens on a reload, so this only
 * shortens the grace period; joining or reconnecting cancels it.
 */
export function softLeave(roomId: string, userId: string): void {
  const room = rooms.get(roomId);
  if (!room || !has(room.participants, userId)) return;
  scheduleRemoval(roomId, userId, LEAVE_GRACE_MS);
}

function removeParticipant(roomId: string, userId: string): void {
  const room = rooms.get(roomId);
  if (!room || !has(room.participants, userId)) return;
  delete room.participants[userId];
  delete room.votes[userId];
  if (room.creatorId === userId) handOverHost(room);
  if (room.settings?.autoReveal) maybeAutoReveal(room);
  commit(roomId, room);
  if (Object.keys(room.participants).length === 0) {
    roomLogger.info({ roomId }, 'Room empty, scheduling deletion');
    scheduleDelete(roomId, unused(room) ? UNUSED_ROOM_TTL_MS : EMPTY_ROOM_TTL_MS);
  }
}

/**
 * The host left for good: the room needs someone who can change the deck and
 * remove people. The first person still connected and voting gets the role,
 * else anyone left.
 */
function handOverHost(room: Room): void {
  const people = Object.values(room.participants);
  const next = people.find(p => !p.away && !p.spectator) ?? people.find(p => !p.away) ?? people[0];
  if (!next) return;
  roomLogger.info({ roomId: room.id, from: room.creatorId, to: next.id }, 'Host left; role handed over');
  room.creatorId = next.id;
}

/** The host gives the role to someone else in the room. */
export function setHost(roomId: string, userId: string, targetId: string): Room | Refusal {
  const room = hostOf(roomId, userId);
  if (typeof room === 'string') return room;
  if (userId === targetId || !has(room.participants, targetId)) return 'rejected';
  room.creatorId = targetId;
  return commit(roomId, room);
}

/** Put the kept room's own issue link back (its owner arrived). */
export function restoreIssueUrl(roomId: string, issueUrl: string): void {
  const room = rooms.get(roomId);
  const url = cleanIssueUrl(issueUrl) ?? '';
  if (!room || (room.settings?.issueUrl ?? '') === url) return;
  room.settings = { ...DEFAULT_SETTINGS, ...room.settings, issueUrl: url };
  commit(roomId, room);
}

/** The host changes how the room votes. */
export function setSettings(roomId: string, userId: string, changes: Partial<RoomSettings>): Room | Refusal {
  const room = hostOf(roomId, userId);
  if (typeof room === 'string') return room;
  // People voted trusting their cards stay nameless: names may only come back
  // with the next round.
  if (changes.anonymous === false && room.settings?.anonymous && Object.keys(room.votes).length > 0) return 'anonymous_locked';
  room.settings = { ...DEFAULT_SETTINGS, ...room.settings, ...changes };
  // Turning auto-reveal on when everyone has already voted reveals now.
  if (room.settings.autoReveal) maybeAutoReveal(room);
  return commit(roomId, room);
}

export function isParticipant(room: Room, userId: string): boolean {
  return has(room.participants, userId);
}

export function isBanned(room: Room, userId: string): boolean {
  return (room.banned ?? []).includes(userId);
}

/** Let someone removed back in (the kept room's owner showing the key). */
function unban(room: Room, userId: string): void {
  if (isBanned(room, userId)) room.banned = room.banned.filter(id => id !== userId);
}

/** Let the ids this browser used back in: the owner key proves whose browser it is. */
export function unbanOwner(roomId: string, ids: string[]): void {
  const room = rooms.get(roomId);
  if (!room) return;
  for (const id of ids) unban(room, id);
}

/** Where `userId` stands in the room, without copying the room. */
export function roomStatus(roomId: string, userId: string): 'missing' | 'member' | 'banned' | 'outsider' {
  const room = rooms.get(roomId);
  if (!room) return 'missing';
  if (has(room.participants, userId)) return 'member';
  return isBanned(room, userId) ? 'banned' : 'outsider';
}

/* ── Chat ─────────────────────────────────────────────────────────── */

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  ts: number;
}

const MAX_CHAT_MESSAGES = 30;
const chatHistory: Map<string, ChatMessage[]> = (() => {
  const g = globalThis as unknown as { __scrumChat?: Map<string, ChatMessage[]> };
  return (g.__scrumChat ??= new Map());
})();

export async function sendChat(roomId: string, userId: string, text: string): Promise<ChatMessage | null> {
  const room = rooms.get(roomId);
  if (!room || !has(room.participants, userId)) return null;
  const trimmed = cutText(text, MAX_CHAT);
  if (!trimmed) return null;
  // Load the stored history first: on a fresh replica the first message
  // would otherwise replace it in Redis.
  const msgs = [...(await getChatHistory(roomId))];
  const p = room.participants[userId];
  if (!p) return null;
  const msg: ChatMessage = { id: crypto.randomUUID(), userId, userName: p.name, userAvatar: p.avatar, text: trimmed, ts: Date.now() };
  msgs.push(msg);
  if (msgs.length > MAX_CHAT_MESSAGES) msgs.splice(0, msgs.length - MAX_CHAT_MESSAGES);
  chatHistory.set(roomId, msgs);
  saveChatToRedis(roomId, msgs);
  getEmitter(roomId).emit('chat', msg);
  return msg;
}

export async function getChatHistory(roomId: string): Promise<ChatMessage[]> {
  const cached = chatHistory.get(roomId);
  if (cached) return cached;
  // Once per room and process: what Redis has (a restart or another replica
  // may have written it), an empty chat included, so later streams don't ask again.
  const redisData = await getRedisSync()?.loadChat(roomId).catch(() => null);
  const msgs = cleanRestoredChat(redisData);
  if (!chatHistory.has(roomId)) chatHistory.set(roomId, msgs);
  return chatHistory.get(roomId)!;
}

export function subscribeToChat(roomId: string, cb: (msg: ChatMessage) => void): () => void {
  const emitter = getEmitter(roomId);
  emitter.on('chat', cb);
  return () => emitter.off('chat', cb);
}

/* ── Rooms ────────────────────────────────────────────────────────── */

// 32 symbols → 256 % 32 === 0, so `byte % 32` is unbiased. Ambiguous glyphs
// (0/O, 1/I) are left out because people type these codes by hand.
const ROOM_ID_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const ROOM_ID_LENGTH = 8; // 8 × 5 bits = 40 bits of entropy

function generateRoomId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(ROOM_ID_LENGTH));
  return Array.from(bytes, b => ROOM_ID_ALPHABET[b % ROOM_ID_ALPHABET.length]).join('');
}

/** A code no live room uses (the caller also checks kept rooms). */
export function newRoomId(): string {
  let id: string;
  do {
    id = generateRoomId();
  } while (rooms.has(id));
  return id;
}

export function createRoom(name: string, creatorId: string, creatorName: string, creatorAvatar: string, deckType: DeckType = 'scrum', customCards: string[] | null = null, maxParticipants: number = MAX_PARTICIPANTS, id: string = newRoomId(), creatorAddress?: string): Room {
  const room: Room = {
    id,
    name: cutText(name, MAX_ROOM_NAME),
    creatorId,
    deckType,
    customCards,
    maxParticipants: Math.min(Math.max(maxParticipants, 2), MAX_PARTICIPANTS),
    participants: {
      [creatorId]: { id: creatorId, name: cutText(creatorName, MAX_NAME), avatar: cleanAvatar(creatorAvatar) },
    },
    currentItem: '',
    votes: {},
    revealed: false,
    locked: false,
    createdAt: Date.now(),
    history: [],
    queue: [],
    timerStartedAt: null,
    timerAccumMs: 0,
    banned: [],
    settings: { ...DEFAULT_SETTINGS },
    version: 1,
  };
  rooms.set(id, room);
  if (creatorAddress !== undefined) {
    roomCreators.set(id, creatorAddress);
    addCount(roomsByAddress, creatorAddress, 1);
  }
  saveToRedis(id);
  // The creator holds a seat until their page connects.
  scheduleRemoval(id, creatorId, JOIN_GRACE_MS);
  roomLogger.info({ roomId: id, creator: creatorId, deck: deckType, maxParticipants }, 'Room created');
  return room;
}

export interface KeptRoom {
  id: string;
  name: string;
  deckType: string;
  customCards: string[];
  autoReveal: boolean;
  anonymous: boolean;
  hostRuns: boolean;
  reactions: boolean;
  issueUrl: string;
  queue: string[];
  /** The last results: story and agreed estimate, without names or votes */
  finals: { item: string; final?: string; ts: number }[];
}

/**
 * Open a kept room again after it was emptied and deleted: same code, name,
 * deck and settings, nobody in it yet. The first to join is the host, until
 * someone with the owner key arrives. False when the server is full.
 */
export function reviveRoom(kept: KeptRoom): boolean {
  if (rooms.has(kept.id)) return true;
  if (roomCapacityLeft() <= 0) return false;
  // What was stored passes the rules fresh input does (see cleanRestoredRoom).
  const room = cleanRestoredRoom({
    id: kept.id,
    name: kept.name,
    // Nobody yet: the first to join takes it (see joinRoom).
    creatorId: '',
    deckType: kept.deckType,
    customCards: kept.customCards,
    maxParticipants: MAX_PARTICIPANTS,
    participants: {},
    currentItem: '',
    votes: {},
    revealed: false,
    locked: false,
    createdAt: Date.now(),
    history: kept.finals.slice(-MAX_HISTORY).map(f => ({ item: f.item, votes: {}, deckType: kept.deckType, ts: f.ts, final: f.final })),
    queue: kept.queue,
    timerStartedAt: null,
    timerAccumMs: 0,
    banned: [],
    settings: {
      autoReveal: kept.autoReveal,
      anonymous: kept.anonymous,
      hostRuns: kept.hostRuns,
      reactions: kept.reactions,
      issueUrl: kept.issueUrl,
    },
    kept: true,
    owners: [],
    version: 1,
  });
  if (!room) {
    roomLogger.warn({ roomId: kept.id }, 'Kept room not opened again: its record is unusable');
    return false;
  }
  rooms.set(room.id, room);
  saveToRedis(room.id);
  // Opened by its link, empty until someone joins: gone again soon if nobody
  // does (looking a code up must not fill the server).
  scheduleDelete(room.id, UNUSED_ROOM_TTL_MS);
  roomLogger.info({ roomId: room.id }, 'Kept room opened again');
  return true;
}

/** Whether `userId` showed this room's owner key. */
export function isRoomOwner(room: Room, userId: string): boolean {
  return (room.owners ?? []).includes(userId);
}

/** Its owner stopped keeping the room from outside it (the home page). */
export function unkeepRoom(roomId: string): void {
  const room = rooms.get(roomId);
  if (!room?.kept) return;
  room.kept = false;
  room.owners = [];
  commit(roomId, room);
}

/**
 * The host kept the room (and got the owner key), or its owner, as host,
 * stopped keeping it.
 */
export function setKept(roomId: string, userId: string, kept: boolean): Room | Refusal {
  const room = hostOf(roomId, userId);
  if (typeof room === 'string') return room;
  if (!kept && !isRoomOwner(room, userId)) return 'rejected';
  room.kept = kept;
  room.owners = kept ? [userId] : [];
  return commit(roomId, room);
}

// Lazy restore: first room access triggers the Redis load. The promise is
// memoised globally so concurrent requests during the load all wait for it.
// A failed load is retried by the next request instead of leaving every
// stored room unreachable until the process restarts.
function ensureRestored(): Promise<void> {
  if (global.__scrumRoomsLoaded) return Promise.resolve();
  return (global.__scrumRestorePromise ??= takeOver().then(restoreRoomsFromRedis).finally(() => {
    global.__scrumRestorePromise = undefined;
  }));
}

/* ── Deploy handover ─────────────────────────────────────────────────
 * During a rolling deploy the new replica serves requests a moment before the
 * old one gets SIGTERM. Loading the rooms then would miss what the old one
 * still changes; so the replica that has the rooms says so in Redis (renewed
 * every 2 s), and a new one waits until that is gone — the old replica clears
 * it after its last writes on SIGTERM, or it lapses if that one crashed.
 */

const ACTIVE_KEY = 'replica:active';
const ACTIVE_TTL_MS = 5_000;
const HANDOVER_WAIT_MS = 8_000;

declare global {
  var __scrumBootId: string | undefined;
  var __scrumHeartbeat: ReturnType<typeof setInterval> | undefined;
}
const bootId = (global.__scrumBootId ??= crypto.randomUUID());

async function takeOver(): Promise<void> {
  installShutdownHook();
  const client = getRedisSync()?.redis;
  if (!client || global.__scrumHeartbeat) return;
  const until = Date.now() + HANDOVER_WAIT_MS;
  while (Date.now() < until) {
    const holder = await client.get(ACTIVE_KEY).catch(() => null);
    if (!holder || holder === bootId) break;
    await new Promise(r => setTimeout(r, 150));
  }
  const beat = () => client.set(ACTIVE_KEY, bootId, 'PX', ACTIVE_TTL_MS).catch(() => {});
  await beat();
  global.__scrumHeartbeat = setInterval(() => { if (!global.__scrumShuttingDown) void beat(); }, 2_000);
  global.__scrumHeartbeat.unref?.();
}

/** The rooms are handed over: let the next replica load them. */
async function releaseRooms(): Promise<void> {
  if (global.__scrumHeartbeat) clearInterval(global.__scrumHeartbeat);
  const client = getRedisSync()?.redis;
  if (!client) return;
  if ((await client.get(ACTIVE_KEY).catch(() => null)) === bootId) await client.del(ACTIVE_KEY).catch(() => {});
}

/** Must be called before any room operation after server restart */
export async function ensureRoomsLoaded(): Promise<void> {
  await ensureRestored();
}

/** The live room, to read and serialize at once (never change or keep it). */
export function liveRoom(id: string): Room | null {
  return rooms.get(id) ?? null;
}

/** The room as it is right now (after ensureRoomsLoaded), without awaiting. */
export function snapshot(id: string): Room | null {
  const room = rooms.get(id);
  return room ? structuredClone(room) : null;
}

/**
 * Seat a participant (or update their name and avatar). `owner`: they showed
 * the owner key, so they manage the kept room and, arriving, take the host
 * role from anyone who doesn't hold the key.
 */
export function joinRoom(roomId: string, participant: Participant, owner = false): Room | 'full' | 'banned' | 'closed' | null {
  const room = rooms.get(roomId);
  if (!room) return null;
  if (owner) unban(room, participant.id);
  if (isBanned(room, participant.id)) return 'banned';
  const prev = has(room.participants, participant.id) ? room.participants[participant.id] : undefined;
  if (!prev && !owner && room.settings?.closed) return 'closed';
  if (!prev && Object.keys(room.participants).length >= (room.maxParticipants ?? MAX_PARTICIPANTS)) return 'full';
  const name = cutText(participant.name, MAX_NAME);
  const avatar = cleanAvatar(participant.avatar);
  const key = presenceKey(roomId, participant.id);
  const connected = (connections.get(key) ?? 0) > 0;
  cancelDelete(roomId);
  cancelRemoval(roomId, participant.id);
  // Joined but not connected yet: the seat is held until the page's event
  // stream opens. Someone who never connects doesn't keep it forever.
  if (!connected) scheduleRemoval(roomId, participant.id, prev?.away ? AWAY_GRACE_MS : JOIN_GRACE_MS);
  const away = !connected && Boolean(prev?.away);
  let changed = false;
  // A kept room opened again has no host until the first person joins.
  if (!room.creatorId) {
    room.creatorId = participant.id;
    changed = true;
  }
  if (owner) {
    // Arriving (not a reload), the owner takes the host role from anyone
    // without the key; a host they handed it to keeps it across their reloads.
    if (!prev && room.creatorId !== participant.id && !isRoomOwner(room, room.creatorId)) {
      room.creatorId = participant.id;
      changed = true;
    }
    if (!isRoomOwner(room, participant.id)) {
      room.owners = [...(room.owners ?? []), participant.id].slice(-MAX_OWNERS);
      room.kept = true;
      changed = true;
    }
  }
  if (!changed && prev && prev.name === name && prev.avatar === avatar && Boolean(prev.away) === away) {
    return room;
  }
  room.participants[participant.id] = {
    id: participant.id,
    name,
    avatar,
    // Preserve spectator preference across rejoins (page refresh)
    spectator: prev?.spectator ?? false,
    away,
  };
  if (!prev) roomLogger.info({ roomId, userId: participant.id }, 'User joined');
  return commit(roomId, room);
}

export function kickUser(roomId: string, creatorId: string, targetId: string): Room | Refusal {
  const room = hostOf(roomId, creatorId);
  if (typeof room === 'string') return room;
  if (creatorId === targetId) return 'rejected'; // can't kick yourself
  if (!has(room.participants, targetId)) return 'rejected';
  // The kept room's owner stays: a host without the key can't lock them out.
  if (isRoomOwner(room, targetId) && !isRoomOwner(room, creatorId)) return 'rejected';
  delete room.participants[targetId];
  delete room.votes[targetId];
  room.banned = [...(room.banned ?? []).filter(id => id !== targetId), targetId].slice(-MAX_BANNED);
  cancelRemoval(roomId, targetId);
  roomLogger.info({ roomId, creatorId, targetId }, 'User kicked');
  // Emit kick event so the kicked user's client can react and their streams close
  getEmitter(roomId).emit('kick', targetId);
  return commit(roomId, room);
}

export function subscribeToKick(roomId: string, cb: (userId: string) => void): () => void {
  const emitter = getEmitter(roomId);
  emitter.on('kick', cb);
  return () => emitter.off('kick', cb);
}

export interface Nudge { fromId: string; fromName: string; targetId: string }

/** Poke a participant to remind them to vote (MSN-style). Returns false if invalid. */
export function nudgeUser(roomId: string, fromId: string, targetId: string): boolean {
  const room = rooms.get(roomId);
  if (!room) return false;
  if (fromId === targetId) return false;
  if (!has(room.participants, fromId) || !has(room.participants, targetId)) return false;
  const from = room.participants[fromId];
  getEmitter(roomId).emit('nudge', { fromId, fromName: from.name, targetId } as Nudge);
  return true;
}

export function subscribeToNudge(roomId: string, cb: (n: Nudge) => void): () => void {
  const emitter = getEmitter(roomId);
  emitter.on('nudge', cb);
  return () => emitter.off('nudge', cb);
}

export interface Reaction { fromId: string; emoji: string; targetId: string | null }

/** Throw an emoji at someone, or at the room. Never stored. */
export function react(roomId: string, fromId: string, emoji: string, targetId: string | null): boolean {
  const room = roomOf(roomId, fromId);
  if (!room || room.settings?.reactions === false) return false;
  if (!(REACTIONS as readonly string[]).includes(emoji)) return false;
  if (targetId !== null && (targetId === fromId || !has(room.participants, targetId))) return false;
  getEmitter(roomId).emit('reaction', { fromId, emoji, targetId } as Reaction);
  return true;
}

export function subscribeToReaction(roomId: string, cb: (r: Reaction) => void): () => void {
  const emitter = getEmitter(roomId);
  emitter.on('reaction', cb);
  return () => emitter.off('reaction', cb);
}

/** The room, if `userId` is in it. */
function roomOf(roomId: string, userId: string): Room | null {
  const room = rooms.get(roomId);
  return room && has(room.participants, userId) ? room : null;
}

/**
 * Whether `userId` may run the round (reveal, next round, queue, timer):
 * anyone, unless the host asked to do it alone. While the host is away the
 * room isn't stuck: everyone can again.
 */
export function canRun(room: Room, userId: string): boolean {
  if (!room.settings?.hostRuns || room.creatorId === userId) return true;
  const host = has(room.participants, room.creatorId) ? room.participants[room.creatorId] : undefined;
  return !host || Boolean(host.away);
}

/** The room, if `userId` is in it and may run the round; else why not. */
function runnerOf(roomId: string, userId: string): Room | Refusal {
  const room = roomOf(roomId, userId);
  if (!room) return 'rejected';
  return canRun(room, userId) ? room : 'host_only';
}

/** The room, if `userId` is its host; else why not. */
function hostOf(roomId: string, userId: string): Room | Refusal {
  const room = rooms.get(roomId);
  if (!room) return 'rejected';
  return room.creatorId === userId ? room : 'host_only';
}

export function submitVote(roomId: string, userId: string, card: string): Room | Refusal {
  const room = roomOf(roomId, userId);
  if (!room) return 'rejected';
  if (room.participants[userId].spectator) return 'spectator';
  if (room.revealed || room.locked) return 'round_changed';
  const played = card.normalize('NFC');
  if (!getCards(room).includes(played)) return 'rejected';
  room.votes[userId] = played;
  if (room.settings?.autoReveal) maybeAutoReveal(room);
  return commit(roomId, room);
}

/**
 * Auto-reveal: once everyone present and voting has a card down, lock the
 * room; each client then runs the usual 3-second countdown and reveals.
 */
function maybeAutoReveal(room: Room): void {
  if (room.revealed || room.locked) return;
  const voters = Object.values(room.participants).filter(p => !p.spectator && !p.away);
  if (voters.length === 0 || !voters.every(p => has(room.votes, p.id))) return;
  lock(room);
}

export function clearVote(roomId: string, userId: string): Room | Refusal {
  const room = roomOf(roomId, userId);
  if (!room) return 'rejected';
  if (room.revealed || room.locked) return 'round_changed';
  delete room.votes[userId];
  return commit(roomId, room);
}

export function lockRoom(roomId: string, userId: string): Room | Refusal {
  const room = runnerOf(roomId, userId);
  if (typeof room === 'string') return room;
  if (room.locked) return room;
  if (room.revealed) return 'round_changed';
  lock(room);
  return commit(roomId, room);
}

/** Lock voting for the reveal countdown (no commit; the caller commits). */
function lock(room: Room): void {
  const roomId = room.id;
  room.locked = true;
  // Auto-unlock safety: if not revealed within 15s, unlock to prevent stuck state
  const prev = lockTimers.get(roomId);
  if (prev) clearTimeout(prev);
  const timer = setTimeout(() => {
    lockTimers.delete(roomId);
    const r = rooms.get(roomId);
    if (r && r.locked && !r.revealed) {
      r.locked = false;
      roomLogger.warn({ roomId }, 'Auto-unlocked room (reveal timeout)');
      commit(roomId, r);
    }
  }, 15_000);
  timer.unref?.();
  lockTimers.set(roomId, timer);
}

export function revealVotes(roomId: string, userId: string): Room | Refusal {
  const room = roomOf(roomId, userId);
  if (!room) return 'rejected';
  // Every client ends the countdown after a lock (the host's, or auto-reveal)
  // by revealing, so once locked anyone may, and all but the first find it
  // revealed: that is their answer, not a refusal.
  if (room.revealed) return room;
  if (!room.locked && !canRun(room, userId)) return 'host_only';
  room.revealed = true;
  // Clear auto-unlock safety timer — we revealed in time
  const prevLock = lockTimers.get(roomId);
  if (prevLock) { clearTimeout(prevLock); lockTimers.delete(roomId); }
  return commit(roomId, room);
}

/**
 * Start the next round. `fromItem` is the story the client was showing: a
 * double click, or two people clicking at once, then starts one round instead
 * of skipping a story from the queue.
 */
export function resetRound(roomId: string, userId: string, fromItem?: string, final?: string): Room | Refusal {
  const room = runnerOf(roomId, userId);
  if (typeof room === 'string') return room;
  if (fromItem !== undefined && fromItem !== room.currentItem) return 'round_changed';
  // Save current round to history if there were votes
  if (Object.keys(room.votes).length > 0) {
    const anonymous = Boolean(room.settings?.anonymous);
    const roundVotes: Record<string, { name: string; card: string }> = {};
    if (anonymous) {
      // The cards, sorted, not who played them: in voting order the
      // placeholders would match the order everyone saw the votes come in.
      Object.values(room.votes).sort().forEach((card, i) => { roundVotes[`v${i + 1}`] = { name: '', card }; });
    } else {
      for (const [uid, card] of Object.entries(room.votes)) {
        const p = has(room.participants, uid) ? room.participants[uid] : undefined;
        roundVotes[uid] = { name: p?.name ?? uid, card };
      }
    }
    room.history.push({
      // Without a story the page names it "Round n" in the reader's language.
      item: room.currentItem,
      votes: roundVotes,
      deckType: room.deckType,
      ts: Date.now(),
      ...(final && getCards(room).includes(final) ? { final } : {}),
    });
    if (room.history.length > MAX_HISTORY) room.history.splice(0, room.history.length - MAX_HISTORY);
    // Every change sends and stores the whole room: big rounds (50 voters)
    // keep fewer of them, so a room stays small.
    while (room.history.length > 1 && JSON.stringify(room.history).length > MAX_HISTORY_BYTES) room.history.shift();
  }
  nextStory(room);
  return commit(roomId, room);
}

/** Clear the round and take the next story from the queue. */
function nextStory(room: Room): void {
  room.votes = {};
  room.revealed = false;
  room.locked = false;
  room.currentItem = room.queue.length > 0 ? room.queue.shift()! : '';
}

/**
 * Leave the current story for later: it goes to the end of the queue and the
 * next one starts. Nothing is recorded.
 */
export function skipStory(roomId: string, userId: string, fromItem?: string): Room | Refusal {
  const room = runnerOf(roomId, userId);
  if (typeof room === 'string') return room;
  if (fromItem !== undefined && fromItem !== room.currentItem) return 'round_changed';
  if (room.currentItem && room.queue.length < MAX_QUEUE) room.queue.push(room.currentItem);
  nextStory(room);
  return commit(roomId, room);
}

/** Correct the current story's text; the votes stay. */
export function renameStory(roomId: string, userId: string, text: string): Room | Refusal {
  const room = runnerOf(roomId, userId);
  if (typeof room === 'string') return room;
  const trimmed = cutText(text, MAX_STORY);
  if (!trimmed) return 'rejected';
  if (!room.currentItem) return 'item_gone';
  room.currentItem = trimmed;
  return commit(roomId, room);
}

/** Self-service spectator toggle — watch the round without voting */
export function setSpectator(roomId: string, userId: string, spectator: boolean): Room | Refusal {
  const room = roomOf(roomId, userId);
  if (!room) return 'rejected';
  room.participants[userId].spectator = spectator;
  // A revealed vote stays part of the result.
  if (spectator && !room.revealed) delete room.votes[userId];
  if (room.settings?.autoReveal) maybeAutoReveal(room);
  return commit(roomId, room);
}

/**
 * The shared timer: start, stop, reset, or `limit` — count down from
 * `limitMs` (one of TIMER_LIMITS_MS, started at once) or, with 0, count up.
 */
export function timerAction(roomId: string, userId: string, action: 'start' | 'stop' | 'reset' | 'limit', limitMs = 0): Room | Refusal {
  const room = runnerOf(roomId, userId);
  if (typeof room === 'string') return room;
  const now = Date.now();
  if (action === 'limit') {
    if (limitMs !== 0 && !(TIMER_LIMITS_MS as readonly number[]).includes(limitMs)) return 'rejected';
    room.timerLimitMs = limitMs || null;
    room.timerAccumMs = 0;
    room.timerStartedAt = limitMs ? now : null;
    return commit(roomId, room);
  }
  if (action === 'start' && room.timerStartedAt == null) {
    room.timerStartedAt = now;
  } else if (action === 'stop' && room.timerStartedAt != null) {
    room.timerAccumMs = (room.timerAccumMs ?? 0) + (now - room.timerStartedAt);
    room.timerStartedAt = null;
  } else if (action === 'reset') {
    room.timerStartedAt = null;
    room.timerAccumMs = 0;
  }
  return commit(roomId, room);
}

/** Clear votes for the same item — "discuss & re-vote". History is not saved. */
export function revoteRound(roomId: string, userId: string): Room | Refusal {
  const room = runnerOf(roomId, userId);
  if (typeof room === 'string') return room;
  room.votes = {};
  room.revealed = false;
  room.locked = false;
  return commit(roomId, room);
}

/** Stories as stored, without blanks (and non-text); no more than the queue holds (the rest isn't even read). */
function cleanStories(items: readonly unknown[]): string[] {
  const out: string[] = [];
  for (const item of items) {
    if (out.length >= MAX_QUEUE) break;
    if (typeof item !== 'string') continue;
    const story = cutText(item, MAX_STORY);
    if (story) out.push(story);
  }
  return out;
}

/**
 * `append` adds stories after the queued ones; `replace` swaps the queue
 * (an empty list clears it, and the current story with it).
 */
export function setQueue(roomId: string, userId: string, items: string[], mode: 'append' | 'replace' = 'replace'): Room | Refusal {
  const room = runnerOf(roomId, userId);
  if (typeof room === 'string') return room;
  const stories = cleanStories(items);
  room.queue = (mode === 'append' ? [...room.queue, ...stories] : stories).slice(0, MAX_QUEUE);
  if (mode === 'replace' && stories.length === 0) {
    room.currentItem = '';
  } else if (!room.currentItem && room.queue.length > 0) {
    room.currentItem = room.queue.shift()!;
  }
  return commit(roomId, room);
}

/** Where the story `item`, last seen at `index`, is now (the queue may have moved on). */
function queueIndex(room: Room, index: number, item?: string): number {
  let at = index;
  if (item !== undefined && room.queue[at] !== item) at = room.queue.indexOf(item);
  return Number.isInteger(at) && at >= 0 && at < room.queue.length ? at : -1;
}

/** Remove the story at `index`, if it is still `item` (the queue may have moved on). */
export function removeFromQueue(roomId: string, userId: string, index: number, item?: string): Room | Refusal {
  const room = runnerOf(roomId, userId);
  if (typeof room === 'string') return room;
  const at = queueIndex(room, index, item);
  if (at < 0) return 'item_gone';
  room.queue.splice(at, 1);
  return commit(roomId, room);
}

/** Move a queued story to position `to` (0 = next). */
export function moveInQueue(roomId: string, userId: string, index: number, to: number, item?: string): Room | Refusal {
  const room = runnerOf(roomId, userId);
  if (typeof room === 'string') return room;
  if (!Number.isInteger(to)) return 'rejected';
  const at = queueIndex(room, index, item);
  if (at < 0) return 'item_gone';
  const [story] = room.queue.splice(at, 1);
  room.queue.splice(Math.max(0, Math.min(to, room.queue.length)), 0, story);
  return commit(roomId, room);
}

/** Estimate a story again: it becomes the current story, or the next one. */
export function requeueStory(roomId: string, userId: string, item: string): Room | Refusal {
  const room = runnerOf(roomId, userId);
  if (typeof room === 'string') return room;
  const story = cutText(item, MAX_STORY);
  if (!story) return 'rejected';
  if (!room.currentItem) {
    room.currentItem = story;
    room.votes = {};
    room.revealed = false;
    room.locked = false;
  } else {
    if (room.queue.length >= MAX_QUEUE) return 'rejected';
    room.queue.unshift(story);
  }
  return commit(roomId, room);
}

/** Correct a queued story's text. */
export function editInQueue(roomId: string, userId: string, index: number, text: string, item?: string): Room | Refusal {
  const room = runnerOf(roomId, userId);
  if (typeof room === 'string') return room;
  const trimmed = cutText(text, MAX_STORY);
  if (!trimmed) return 'rejected';
  const at = queueIndex(room, index, item);
  if (at < 0) return 'item_gone';
  room.queue[at] = trimmed;
  return commit(roomId, room);
}

export function setItem(roomId: string, userId: string, item: string): Room | Refusal {
  const room = runnerOf(roomId, userId);
  if (typeof room === 'string') return room;
  const trimmed = cutText(item, MAX_STORY);
  if (!trimmed) return 'rejected';
  room.currentItem = trimmed;
  room.votes = {};
  room.revealed = false;
  room.locked = false;
  return commit(roomId, room);
}

export function setDeckType(roomId: string, userId: string, deckType: DeckType, customCards?: string[]): Room | Refusal {
  const room = hostOf(roomId, userId);
  if (typeof room === 'string') return room;
  // Not while this round's cards are being revealed or shown.
  if (room.locked || room.revealed) return 'round_changed';
  room.deckType = deckType;
  room.customCards = deckType === 'custom' && customCards?.length ? cleanCustomCards(customCards) : null;
  room.votes = {};
  return commit(roomId, room);
}

/** Keep an active room's Redis copy alive; called on stream keepalives. */
export function touchRoom(roomId: string): void {
  if (global.__scrumShuttingDown) return;
  getRedisSync()?.touchRoom(roomId).catch(() => {});
}

/* ── Restoring ────────────────────────────────────────────────────────
 * A room read back from Redis, or a kept room opened again, passes the rules
 * fresh input does: a damaged or tampered copy must neither crash the server
 * nor put into a room what no request could (an unknown field would even be
 * broadcast). A bad field is fixed or dropped; a room without its code, whole.
 */

/** A room with a name that lost everything in cleaning. */
export const ROOM_NAME_FALLBACK = 'Scrum Poker';
const ROOM_CODE = new RegExp(`^[A-Z0-9]{${ROOM_CODE_LENGTH}}$`);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Stored text under the rules for `max` (cutText); '' for anything else. */
function storedText(value: unknown, max: number): string {
  return typeof value === 'string' ? cutText(value, max) : '';
}

/** A time or duration in ms: a finite number from 0. */
function isTime(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

/** Participant ids, without repeats: the last `max`. */
function storedIds(value: unknown, max: number): string[] {
  return Array.isArray(value) ? [...new Set(value.filter(isValidUserId))].slice(-max) : [];
}

function storedHistory(value: unknown, deckType: DeckType): RoundHistory[] {
  if (!Array.isArray(value)) return [];
  const history: RoundHistory[] = [];
  for (const h of value.slice(-MAX_HISTORY)) {
    if (!isRecord(h)) continue;
    const votes: RoundHistory['votes'] = {};
    let count = 0;
    // By id, or by placeholder (v1, v2, …) in an anonymous room.
    for (const [key, v] of Object.entries(isRecord(h.votes) ? h.votes : {})) {
      if (count >= MAX_PARTICIPANTS) break;
      if (!isRecord(v) || !(isValidUserId(key) || /^v\d{1,2}$/.test(key))) continue;
      const card = storedText(v.card, MAX_CARD);
      if (!card) continue;
      votes[key] = { name: storedText(v.name, MAX_NAME), card };
      count++;
    }
    const final = storedText(h.final, MAX_CARD);
    history.push({
      item: storedText(h.item, MAX_STORY),
      votes,
      deckType: isDeckType(h.deckType) ? h.deckType : deckType,
      ts: isTime(h.ts) ? h.ts : 0,
      ...(final ? { final } : {}),
    });
  }
  while (history.length > 1 && JSON.stringify(history).length > MAX_HISTORY_BYTES) history.shift();
  return history;
}

/** A stored room as the rules for fresh input allow it, or null when it can't be one. */
export function cleanRestoredRoom(raw: unknown): Room | null {
  if (!isRecord(raw) || typeof raw.id !== 'string' || !ROOM_CODE.test(raw.id)) return null;
  const now = Date.now();

  let deckType: DeckType = isDeckType(raw.deckType) ? raw.deckType : 'scrum';
  let customCards: string[] | null = null;
  if (deckType === 'custom') {
    customCards = Array.isArray(raw.customCards) ? cleanCustomCards(raw.customCards) : [];
    if (customCards.length < MIN_CUSTOM_CARDS) {
      deckType = 'scrum';
      customCards = null;
    }
  }
  const cards = getCards({ deckType, customCards });

  const maxParticipants = Number.isSafeInteger(raw.maxParticipants)
    ? Math.min(Math.max(raw.maxParticipants as number, 2), MAX_PARTICIPANTS)
    : MAX_PARTICIPANTS;
  const banned = storedIds(raw.banned, MAX_BANNED);
  // Someone without an id or a name is dropped: their page joins again.
  const participants: Record<string, Participant> = {};
  let seated = 0;
  for (const [uid, p] of Object.entries(isRecord(raw.participants) ? raw.participants : {})) {
    if (seated >= maxParticipants) break;
    if (!isValidUserId(uid) || !isRecord(p) || banned.includes(uid)) continue;
    const name = storedText(p.name, MAX_NAME);
    if (!name) continue;
    participants[uid] = { id: uid, name, avatar: cleanAvatar(p.avatar), spectator: p.spectator === true, away: p.away === true };
    seated++;
  }
  // The host is someone in the room; in an empty one, whoever comes back
  // with that id (or, with none, the first to join; see joinRoom).
  const people = Object.values(participants);
  let creatorId = isValidUserId(raw.creatorId) ? raw.creatorId : '';
  if (people.length > 0 && !has(participants, creatorId)) creatorId = (people.find(p => !p.spectator) ?? people[0]).id;

  // Only the cards of the deck, of people in the room.
  const votes: Record<string, string> = {};
  for (const [uid, card] of Object.entries(isRecord(raw.votes) ? raw.votes : {})) {
    if (has(participants, uid) && typeof card === 'string' && cards.includes(card)) votes[uid] = card;
  }

  const settings = isRecord(raw.settings) ? raw.settings : {};
  const flag = (key: Exclude<keyof RoomSettings, 'issueUrl'>): boolean => {
    const value = settings[key];
    return typeof value === 'boolean' ? value : DEFAULT_SETTINGS[key];
  };

  return {
    id: raw.id,
    name: storedText(raw.name, MAX_ROOM_NAME) || ROOM_NAME_FALLBACK,
    creatorId,
    deckType,
    customCards,
    maxParticipants,
    participants,
    currentItem: storedText(raw.currentItem, MAX_STORY),
    votes,
    revealed: raw.revealed === true,
    locked: raw.locked === true,
    createdAt: isTime(raw.createdAt) ? Math.min(raw.createdAt, now) : now,
    history: storedHistory(raw.history, deckType),
    queue: cleanStories(Array.isArray(raw.queue) ? raw.queue : []),
    timerStartedAt: isTime(raw.timerStartedAt) && raw.timerStartedAt > 0 ? Math.min(raw.timerStartedAt, now) : null,
    timerAccumMs: isTime(raw.timerAccumMs) ? raw.timerAccumMs : 0,
    timerLimitMs: (TIMER_LIMITS_MS as readonly unknown[]).includes(raw.timerLimitMs) ? raw.timerLimitMs as number : null,
    banned,
    settings: {
      autoReveal: flag('autoReveal'),
      anonymous: flag('anonymous'),
      hostRuns: flag('hostRuns'),
      closed: flag('closed'),
      reactions: flag('reactions'),
      issueUrl: cleanIssueUrl(settings.issueUrl) ?? '',
    },
    // A room saved while rooms were kept by accounts (`savedBy`, gone with
    // them) is not kept: its host can keep it again and get an owner key.
    kept: raw.kept === true,
    owners: storedIds(raw.owners, MAX_OWNERS),
    version: Number.isSafeInteger(raw.version) && (raw.version as number) >= 1 ? raw.version as number : 1,
  };
}

/** Chat read back from Redis, under the rules a new message follows. */
function cleanRestoredChat(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  const msgs: ChatMessage[] = [];
  for (const m of raw.slice(-MAX_CHAT_MESSAGES)) {
    if (!isRecord(m) || !isValidUserId(m.id) || !isValidUserId(m.userId)) continue;
    const userName = storedText(m.userName, MAX_NAME);
    const text = storedText(m.text, MAX_CHAT);
    if (!userName || !text) continue;
    msgs.push({ id: m.id, userId: m.userId, userName, userAvatar: cleanAvatar(m.userAvatar), text, ts: isTime(m.ts) ? m.ts : 0 });
  }
  return msgs;
}

/** Restore rooms from Redis on server startup */
export async function restoreRoomsFromRedis(): Promise<void> {
  if (global.__scrumRoomsLoaded) return;
  const redis = getRedisSync();
  if (!redis?.redis) {
    global.__scrumRoomsLoaded = true;
    return;
  }
  // Throws when Redis can't be read; ensureRestored() tries again later.
  const saved = await redis.loadAllRooms();
  let restored = 0;
  for (const [id, data] of saved) {
    if (rooms.has(id)) continue; // already in memory (HMR)
    const room = cleanRestoredRoom(data);
    if (!room || room.id !== id) {
      // Its code only, and only when it is one: the key may be anything too.
      roomLogger.warn({ roomId: ROOM_CODE.test(id) ? id : undefined }, 'Dropped an unusable room snapshot');
      redis.deleteRoom(id).catch(() => {});
      continue;
    }
    rooms.set(id, room);
    // Stored during a reveal countdown: unlocked again if no client reveals.
    if (room.locked && !room.revealed) lock(room);
    // Nobody is connected to this process yet: everyone is away until their
    // stream reconnects, and dropped if it doesn't.
    const ids = Object.keys(room.participants);
    if (ids.length === 0) {
      scheduleDelete(id);
    } else {
      for (const uid of ids) {
        room.participants[uid].away = true;
        scheduleRemoval(id, uid, AWAY_GRACE_MS);
      }
    }
    restored++;
  }
  global.__scrumRoomsLoaded = true;
  if (restored > 0) {
    roomLogger.info({ restored }, 'Rooms restored from Redis');
  }
}

/* ── Shutdown ─────────────────────────────────────────────────────────
 * On SIGTERM (a deploy replacing this replica) every open event stream is
 * told to reconnect and closed, so clients move to the new replica at once
 * and the server can finish closing instead of waiting out stop_timeout.
 */


/** Installed with the first room access or stream, whichever comes first. */
function installShutdownHook(): void {
  if (global.__scrumShutdownHooked) return;
  global.__scrumShutdownHooked = true;
  process.once('SIGTERM', () => {
    // The last changes go to Redis before the new replica restores from
    // them. The streams close only then: Next's shutdown waits for open
    // connections, so the process can't exit with a write in flight.
    const flushed = flushSaves();
    global.__scrumShuttingDown = true;
    void flushed.then(releaseRooms).finally(() => {
      roomLogger.info('SIGTERM: closing event streams');
      shutdownEmitter.emit('shutdown');
    });
  });
}

export function subscribeToShutdown(cb: () => void): () => void {
  installShutdownHook();
  shutdownEmitter.on('shutdown', cb);
  return () => shutdownEmitter.off('shutdown', cb);
}

const shutdownEmitter = new EventEmitter().setMaxListeners(0);
