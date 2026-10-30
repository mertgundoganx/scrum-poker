import { submitVote, clearVote, roomForActor } from '@/lib/store';
import { jsonBody, refused, roomActor, roomError, roomRoute } from '@/lib/roomRequest';

export const POST = roomRoute('vote', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'vote', perMinute: 180 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { card } = body;
  if (card !== undefined && card !== null && card !== '' && typeof card !== 'string') {
    return roomError('invalid', 'card must be a string', 400);
  }

  const room = card ? submitVote(roomId, userId, card as string) : clearVote(roomId, userId);
  if (typeof room === 'string') return refused(room, 'That card is not in the deck');
  return Response.json(roomForActor(room, userId));
});
