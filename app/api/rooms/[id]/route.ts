import { isParticipant, liveRoom, ensureRoomsLoaded, sanitizeRoomForViewer } from '@/lib/store';
import { roomExists } from '@/lib/keptRooms';
import { getRoomUserId } from '@/lib/roomToken';
import { rateLimit, rateLimitResponse } from '@/lib/rateLimit';
import { getClientIp } from '@/lib/clientIp';
import { lookupBlocked, lookupMissed, roomCode, roomError, roomRoute } from '@/lib/roomRequest';

/**
 * The room. `?summary=1` asks only whether it exists and whether we're in it
 * (the room page reconnecting, the home page's recent rooms): the summary
 * without the votes, the queue and the history a participant would get.
 */
export const GET = roomRoute('room', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  // Room codes are guessable only by brute force; keep it slow.
  const ip = getClientIp(request.headers);
  const rl = await rateLimit(`roomGet:${ip}`, 120, 60_000);
  if (!rl.allowed) return rateLimitResponse(rl);

  const roomId = roomCode((await props.params).id);
  if (!roomId) return roomError('room_not_found', 'Room not found', 404);
  const viewerId = await getRoomUserId(roomId);
  // An address that missed too many codes lately looks nothing up.
  const blocked = lookupBlocked(ip, viewerId);
  if (blocked) return blocked;
  await ensureRoomsLoaded();
  const live = liveRoom(roomId);
  const member = Boolean(live && viewerId && isParticipant(live, viewerId));
  const summaryOnly = new URL(request.url).searchParams.get('summary') === '1';
  // Participants get the room as they may see it.
  if (live && viewerId && member && !summaryOnly) return Response.json(sanitizeRoomForViewer(live, viewerId));

  // Anyone who knows the code may check that a room exists (join flow, the
  // home page's recent rooms): a summary, and a kept room isn't opened for it.
  const summary = await roomExists(roomId);
  if (!summary) {
    lookupMissed(ip, roomId, viewerId);
    return roomError('room_not_found', 'Room not found', 404);
  }
  return Response.json(summaryOnly ? { ...summary, member } : summary);
});
