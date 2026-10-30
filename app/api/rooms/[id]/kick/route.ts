import { kickUser, roomForActor } from '@/lib/store';
import { jsonBody, refused, roomActor, roomError, roomRoute } from '@/lib/roomRequest';
import { isValidUserId } from '@/lib/store';

export const POST = roomRoute('kick', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'kick', perMinute: 30 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { targetId } = body;
  if (!isValidUserId(targetId)) return roomError('invalid', 'targetId must be a participant id', 400);

  const room = kickUser(roomId, userId, targetId);
  // Yourself, someone no longer in the room, or (without the key) the owner: rejected.
  if (typeof room === 'string') return refused(room, 'Cannot remove that person');
  return Response.json(roomForActor(room, userId));
});
