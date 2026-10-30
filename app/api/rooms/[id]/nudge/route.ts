import { nudgeUser } from '@/lib/store';
import { jsonBody, roomActor, roomError, roomRoute } from '@/lib/roomRequest';
import { isValidUserId } from '@/lib/store';

export const POST = roomRoute('nudge', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  // Keep nudges from becoming spam.
  const actor = await roomActor(props, { name: 'nudge', perMinute: 20 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { targetId } = body;
  if (!isValidUserId(targetId)) return roomError('invalid', 'targetId must be a participant id', 400);

  if (!nudgeUser(roomId, userId, targetId)) return roomError('rejected', 'Cannot nudge', 409);
  return Response.json({ ok: true });
});
