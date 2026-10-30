import { revealVotes, roomForActor } from '@/lib/store';
import { refused, roomActor, roomRoute } from '@/lib/roomRequest';

export const POST = roomRoute('reveal', async (
  _request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'reveal', perMinute: 30 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const room = revealVotes(roomId, userId);
  if (typeof room === 'string') return refused(room, 'Cannot reveal');
  return Response.json(roomForActor(room, userId));
});
