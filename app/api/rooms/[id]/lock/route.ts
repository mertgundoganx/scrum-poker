import { lockRoom, roomForActor } from '@/lib/store';
import { refused, roomActor, roomRoute } from '@/lib/roomRequest';

export const POST = roomRoute('lock', async (
  _request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  // Locking stops everyone's voting for up to 15s; keep it from being spammed.
  const actor = await roomActor(props, { name: 'lock', perMinute: 20 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const room = lockRoom(roomId, userId);
  if (typeof room === 'string') return refused(room, 'Cannot lock');
  return Response.json(roomForActor(room, userId));
});
