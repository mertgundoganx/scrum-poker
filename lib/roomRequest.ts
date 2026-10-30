import 'server-only';
import { headers } from 'next/headers';
import { unstable_rethrow } from 'next/navigation';
import { getClientIp } from '@/lib/clientIp';
import { cutText } from '@/lib/deck';
import { MAX_BODY_BYTES, ROOM_CODE_LENGTH } from '@/lib/limits';
import { roomLogger } from '@/lib/logger';
import { ensureRoomsLoaded, roomStatus, type Refusal } from '@/lib/store';
import { getRoomUserId } from '@/lib/roomToken';
import { noteRoomMiss, rateLimitAll, rateLimitResponse, roomLookupBlocked, type Limit } from '@/lib/rateLimit';

/**
 * Error codes the room client acts on. Only `not_participant` makes it join
 * again; anything else is a refused action and is reported, not retried.
 * `invalid`: the request itself is wrong (a missing or mistyped field, text
 * with nothing visible in it, a body that isn't a JSON object); sending it
 * again won't help. The refusals (see Refusal in lib/store.ts) say why the
 * room's state doesn't allow it right now; `rejected` is any other reason.
 * `server_error`: something broke on our side.
 */
export type RoomErrorCode = 'room_not_found' | 'not_participant' | 'kicked' | 'invalid' | 'too_large' | 'server_error' | Refusal;

export function roomError(code: RoomErrorCode, error: string, status: number): Response {
  return Response.json({ error, code }, { status });
}

const REFUSALS: Record<Exclude<Refusal, 'rejected'>, { status: number; error: string }> = {
  host_only: { status: 403, error: 'Only the host can do this' },
  item_gone: { status: 409, error: 'That story is no longer there: someone else changed the queue' },
  round_changed: { status: 409, error: 'The round has moved on' },
  spectator: { status: 409, error: 'Spectators do not vote' },
  anonymous_locked: { status: 409, error: 'Anonymous voting stays on until the next round' },
};

/** The answer to an action the store refused; `error` and `status` describe a plain `rejected`. */
export function refused(reason: Refusal, error: string, status = 409): Response {
  if (reason === 'rejected') return roomError('rejected', error, status);
  return roomError(reason, REFUSALS[reason].error, REFUSALS[reason].status);
}

/**
 * A room route's handler, guarded: an error it didn't expect is logged once
 * (the route and the room code; never the body or anything in the room) and
 * answered as `server_error` instead of an empty 500. The response is passed
 * on untouched, so the event stream still streams.
 */
export function roomRoute<P>(route: string, handler: (request: Request, props: P) => Promise<Response>) {
  return async (request: Request, props: P): Promise<Response> => {
    try {
      return await handler(request, props);
    } catch (err) {
      // What Next throws on purpose (notFound, a dynamic API during a build) is Next's.
      unstable_rethrow(err);
      const params = (props as { params?: Promise<{ id?: unknown }> } | undefined)?.params;
      const id = await params?.then(p => p.id, () => undefined);
      logRouteError(`${request.method} ${route}`, typeof id === 'string' ? roomCode(id) : null, err);
      return roomError('server_error', 'Something went wrong', 500);
    }
  };
}

/** An unexpected error in a room route (also from inside the event stream). */
export function logRouteError(route: string, roomId: string | null, err: unknown): void {
  roomLogger.error({ err, route, ...(roomId && { roomId }) }, 'Room route failed');
}

/**
 * The 429 to answer a room lookup from `ip` with while it is blocked for
 * guessing codes (see roomLookupBlocked), else null. `userId`: the room
 * cookie's, for this code; it was issued, not guessed, so it is never blocked.
 */
export function lookupBlocked(ip: string, userId: string | null): Response | null {
  const over = userId ? null : roomLookupBlocked(ip);
  return over ? rateLimitResponse(over) : null;
}

/** A lookup from `ip` found no room `code`: a guess, unless the room cookie shows it was a room of ours. */
export function lookupMissed(ip: string, code: string, userId: string | null): void {
  if (!userId) noteRoomMiss(ip, code);
}

const ROOM_CODE = new RegExp(`^[A-Z0-9]{${ROOM_CODE_LENGTH}}$`);

/** The room code in a URL, upper-cased; null when it can't be one (no room has it). */
export function roomCode(id: string): string | null {
  const code = id.toUpperCase();
  return ROOM_CODE.test(code) ? code : null;
}

export interface RoomActor { roomId: string; userId: string }

/**
 * The participant behind a room request: the room exists, the signed cookie
 * names a user, and that user is in the room. Applies a general per-user
 * limit and one per address (ids cost nothing to make), plus `limit`
 * (requests per minute) for this action when given.
 */
export async function roomActor(
  props: { params: Promise<{ id: string }> },
  limit?: { name: string; perMinute: number },
): Promise<RoomActor | Response> {
  const roomId = roomCode((await props.params).id);
  if (!roomId) return roomError('room_not_found', 'Room not found', 404);
  await ensureRoomsLoaded();
  const userId = await getRoomUserId(roomId);
  const status = userId ? roomStatus(roomId, userId) : 'outsider';
  if (status === 'missing') return roomError('room_not_found', 'Room not found', 404);
  if (status === 'banned') return roomError('kicked', 'Removed from this room', 403);
  if (!userId || status !== 'member') return roomError('not_participant', 'Not a participant', 401);

  const limits: Limit[] = [
    { key: `room:${userId}`, max: 300, windowMs: 60_000 },
    // A whole office behind one address runs its sessions comfortably below this.
    { key: `room-address:${getClientIp(await headers())}`, max: 2_000, windowMs: 60_000 },
  ];
  if (limit) limits.push({ key: `${limit.name}:${userId}`, max: limit.perMinute, windowMs: 60_000 });
  const over = await rateLimitAll(limits);
  if (over) return rateLimitResponse(over);
  return { roomId, userId };
}

/**
 * The body's bytes, or null when it reaches `max`. proxy.ts refuses a longer
 * Content-Length; a chunked body has none, and Next hands the route only its
 * first MAX_BODY_BYTES (proxyClientMaxBodySize in next.config.ts), cut off
 * without a word: a body that fills them is taken as one that didn't fit.
 */
async function readBytes(request: Request, max: number): Promise<Uint8Array | null> {
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size >= max) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let at = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, at);
    at += chunk.byteLength;
  }
  return bytes;
}

/**
 * The JSON body as an object, or the error to answer with: 413 when it is
 * MAX_BODY_BYTES or more, 400 for anything that isn't a JSON object in UTF-8
 * (bad JSON, an array, a string, null, an empty body). The object has no
 * prototype, so a key like "constructor" is only ever what was sent.
 */
export async function jsonBody(request: Request): Promise<Record<string, unknown> | Response> {
  const bytes = await readBytes(request, MAX_BODY_BYTES).catch(() => undefined);
  if (bytes === null) return roomError('too_large', 'Request too large', 413);
  let body: unknown;
  try {
    body = bytes && JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
  } catch {
    body = undefined;
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return roomError('invalid', 'The body must be a JSON object', 400);
  }
  return Object.assign(Object.create(null) as Record<string, unknown>, body);
}

/** `value` as stored text (see cutText), or null when it isn't a string or nothing visible is left. */
export function textField(value: unknown, max: number): string | null {
  return typeof value === 'string' ? cutText(value, max) || null : null;
}

/** Whether an optional field is absent (undefined or null) or of `type`. */
export function optional(value: unknown, type: 'string' | 'boolean' | 'number'): boolean {
  return value === undefined || value === null || typeof value === type;
}

/** A position in a list: a whole number from 0. */
export function isIndex(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}
