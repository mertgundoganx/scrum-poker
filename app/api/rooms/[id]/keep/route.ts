import { setKept, liveRoom, unkeepRoom, isRoomOwner, roomForActor, ensureRoomsLoaded } from '@/lib/store';
import { keepRoom, forgetRoom, forgetRoomWithKey } from '@/lib/keptRooms';
import { rateLimit, rateLimitAll, rateLimitResponse } from '@/lib/rateLimit';
import { getClientIp, networkKey } from '@/lib/clientIp';
import { jsonBody, optional, refused, roomActor, roomCode, roomError, roomRoute } from '@/lib/roomRequest';

/**
 * The host keeps the room ({ kept: true }) and gets its owner key once, in the
 * answer's `ownerKey`; or its owner, as host, stops keeping it
 * ({ kept: false, ownerKey }).
 */
export const POST = roomRoute('keep', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'keep', perMinute: 20 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { kept, ownerKey } = body;
  if (typeof kept !== 'boolean') return roomError('invalid', 'kept (boolean) is required', 400);
  if (!optional(ownerKey, 'string')) return roomError('invalid', 'ownerKey must be a string', 400);

  const room = liveRoom(roomId);
  if (!room || room.creatorId !== userId) return refused('host_only', 'Only the host can keep the room');

  if (!kept) {
    if (!room.kept) return Response.json(roomForActor(room, userId));
    // The key itself, not only an owner's id: ids are visible to everyone.
    if (!isRoomOwner(room, userId) || !await forgetRoomWithKey(roomId, ownerKey)) {
      return roomError('rejected', 'Only the owner can stop keeping this room', 403);
    }
    const updated = setKept(roomId, userId, false);
    if (typeof updated === 'string') return refused(updated, 'Only the owner can stop keeping this room', 403);
    return Response.json(roomForActor(updated, userId));
  }

  if (room.kept) {
    if (isRoomOwner(room, userId)) return Response.json(roomForActor(room, userId));
    return roomError('rejected', 'Someone else keeps this room', 409);
  }
  // Kept rooms outlive their visitors: a single address keeps only so many,
  // and so does its network (an IPv6 customer has thousands of /64s).
  const ip = getClientIp(request.headers);
  const over = await rateLimitAll([
    { key: `keep:${ip}`, max: 10, windowMs: 60 * 60_000 },
    { key: `keep-net:${networkKey(ip)}`, max: 30, windowMs: 60 * 60_000 },
  ]);
  if (over) return rateLimitResponse(over);
  const result = await keepRoom(room);
  if (result === 'taken') return roomError('rejected', 'Someone else keeps this room', 409);
  if (result === 'full') return Response.json({ error: 'No more rooms can be kept right now', code: 'kept_full' }, { status: 503, headers: { 'Retry-After': '3600' } });
  if (result === 'error') return roomError('rejected', 'Could not keep the room', 503);
  const updated = setKept(roomId, userId, true);
  if (typeof updated === 'string') {
    // No longer the host in the meantime: don't leave a room nobody can manage.
    await forgetRoom(roomId);
    return refused(updated, 'Only the host can keep the room');
  }
  return Response.json({ ...roomForActor(updated, userId), ownerKey: result.key });
});

/**
 * Stop keeping the room from outside it (the home page's list): { ownerKey }.
 * No seat needed; the key is the proof.
 */
export const DELETE = roomRoute('keep', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const rl = await rateLimit(`unkeep:${getClientIp(request.headers)}`, 30, 60_000);
  if (!rl.allowed) return rateLimitResponse(rl);
  const roomId = roomCode((await props.params).id);
  if (!roomId) return roomError('rejected', 'Not the owner key of this room', 403);
  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { ownerKey } = body;
  if (typeof ownerKey !== 'string') return roomError('invalid', 'ownerKey is required', 400);
  if (!await forgetRoomWithKey(roomId, ownerKey)) {
    return roomError('rejected', 'Not the owner key of this room', 403);
  }
  await ensureRoomsLoaded();
  unkeepRoom(roomId);
  return Response.json({ ok: true });
});
