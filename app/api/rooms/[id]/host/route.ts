import { setHost, roomForActor } from '@/lib/store';
import { jsonBody, refused, roomActor, roomError, roomRoute } from '@/lib/roomRequest';
import { isValidUserId } from '@/lib/store';

/** The host hands the role to someone else in the room. */
export const POST = roomRoute('host', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'host', perMinute: 20 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { targetId } = body;
  if (!isValidUserId(targetId)) return roomError('invalid', 'targetId must be a participant id', 400);

  const room = setHost(roomId, userId, targetId);
  if (typeof room === 'string') return refused(room, 'The role goes to someone else in the room');
  return Response.json(roomForActor(room, userId));
});
