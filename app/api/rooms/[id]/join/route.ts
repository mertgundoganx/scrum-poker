import { joinRoom, ensureRoomsLoaded, sanitizeRoomForViewer, isParticipant, isBanned, isRoomOwner, isValidUserId, unbanOwner } from '@/lib/store';
import { getOrReviveRoom, isOwnerKey, ownerArrived } from '@/lib/keptRooms';
import { rateLimit, rateLimitAll, rateLimitResponse } from '@/lib/rateLimit';
import { getClientIp } from '@/lib/clientIp';
import { issueRoomToken, getRoomUserId } from '@/lib/roomToken';
import { jsonBody, lookupBlocked, lookupMissed, optional, roomCode, roomError, roomRoute, textField } from '@/lib/roomRequest';
import { MAX_NAME } from '@/lib/limits';

/** A cuid, as account ids were. */
function isOldAccountId(id: unknown): boolean {
  return typeof id === 'string' && /^c[a-z0-9]{20,31}$/.test(id);
}

/**
 * Take a seat: { userId, name, avatar?, ownerKey? }. `ownerKey` is the key of
 * a kept room this browser keeps (or got through the owner link). An avatar
 * that isn't one of AVATARS is stored as none.
 */
export const POST = roomRoute('join', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const roomId = roomCode((await props.params).id);
  if (!roomId) return roomError('room_not_found', 'Room not found', 404);
  await ensureRoomsLoaded();
  // Generous: a whole team behind one office NAT joins at the same time. Per
  // room as well, so one address can't fill a room with made-up seats.
  const ip = getClientIp(request.headers);
  const over = await rateLimitAll([
    { key: `join:${ip}`, max: 60, windowMs: 60_000 },
    { key: `join:${roomId}:${ip}`, max: 30, windowMs: 60_000 },
  ]);
  if (over) return rateLimitResponse(over);
  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const userId = body.userId;
  const name = textField(body.name, MAX_NAME);

  // An account id from before accounts were removed, still in the browser's
  // storage: the client answers `identity_in_use` with a fresh id.
  if (isOldAccountId(userId) && name) {
    return Response.json({ error: 'Use a new identity', code: 'identity_in_use' }, { status: 409 });
  }
  if (!isValidUserId(userId) || !name) {
    return roomError('invalid', 'userId and name are required', 400);
  }
  if (!optional(body.avatar, 'string') || !optional(body.ownerKey, 'string')) {
    return roomError('invalid', 'avatar and ownerKey must be strings', 400);
  }

  // The id this browser can prove: the one in its room cookie.
  const cookieUserId = await getRoomUserId(roomId);
  // An address that missed too many codes lately joins no room it isn't in.
  const blocked = lookupBlocked(ip, cookieUserId);
  if (blocked) return blocked;
  const room = await getOrReviveRoom(roomId);
  if (!room) {
    lookupMissed(ip, roomId, cookieUserId);
    return roomError('room_not_found', 'Room not found', 404);
  }

  // The kept room's owner key: it gets its holder in even if removed (a host
  // without the key can't lock the owner out of their own room).
  const owner = body.ownerKey != null && await isOwnerKey(roomId, body.ownerKey);
  if (owner) unbanOwner(roomId, cookieUserId ? [userId, cookieUserId] : [userId]);
  if (isBanned(room, userId)) return roomError('kicked', 'Removed from this room', 403);
  // Removed by the host: a new id from the same browser doesn't get back in.
  if (cookieUserId && isBanned(room, cookieUserId)) return roomError('kicked', 'Removed from this room', 403);

  // Prevent identity hijacking: an id already in the room, the host's, or one
  // that showed the owner key (everyone in the room sees these ids) needs its
  // room cookie.
  const isProtectedId = isParticipant(room, userId) || room.creatorId === userId || isRoomOwner(room, userId);
  if (isProtectedId && cookieUserId !== userId) {
    return Response.json({ error: 'This identity is already in use', code: 'identity_in_use' }, { status: 409 });
  }
  // New seats from one address in one room: an office fits, a script filling
  // the room with made-up people doesn't (ids cost nothing to make).
  if (!isParticipant(room, userId) && !owner) {
    const seats = await rateLimit(`seat:${roomId}:${ip}`, 40, 60 * 60_000);
    if (!seats.allowed) return rateLimitResponse(seats);
  }

  const result = joinRoom(roomId, {
    id: userId,
    name,
    avatar: typeof body.avatar === 'string' ? body.avatar : '',
  }, owner);
  if (!result) return roomError('room_not_found', 'Room not found', 404);
  if (result === 'banned') return roomError('kicked', 'Removed from this room', 403);
  if (result === 'closed') return Response.json({ error: 'The room is closed to new people', code: 'room_closed' }, { status: 403 });
  if (result === 'full') {
    return Response.json({ error: 'Room is full', code: 'room_full' }, { status: 403 });
  }
  if (owner) await ownerArrived(roomId);
  // Issue signed cookie so subsequent requests prove this userId
  await issueRoomToken(roomId, userId);
  // ownerKeyValid: whether the key sent was this room's, so the page keeps a
  // key only once the server accepted it (a forged owner link can't replace one).
  return Response.json({ ...sanitizeRoomForViewer(result, userId), ...(body.ownerKey != null ? { ownerKeyValid: owner } : {}) });
});
