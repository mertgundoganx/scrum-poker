import { setSpectator, roomForActor } from '@/lib/store';
import { jsonBody, refused, roomActor, roomError, roomRoute } from '@/lib/roomRequest';

export const POST = roomRoute('spectator', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'spectator', perMinute: 20 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { spectator } = body;
  if (typeof spectator !== 'boolean') {
    return roomError('invalid', 'spectator (boolean) is required', 400);
  }

  const room = setSpectator(roomId, userId, spectator);
  if (typeof room === 'string') return refused(room, 'Cannot change spectator mode');
  return Response.json(roomForActor(room, userId));
});
