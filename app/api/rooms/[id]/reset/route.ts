import { resetRound, revoteRound, skipStory, roomForActor } from '@/lib/store';
import { jsonBody, optional, refused, roomActor, roomError, roomRoute } from '@/lib/roomRequest';
import { syncKeptRoom } from '@/lib/keptRooms';

/**
 * Next round. { revote: true } votes again on the same story (not recorded);
 * { skip: true } leaves the story for later; otherwise the round is recorded,
 * with `final` as the agreed estimate when given.
 */
export const POST = roomRoute('reset', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'reset', perMinute: 30 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  if (!optional(body.revote, 'boolean') || !optional(body.skip, 'boolean') || !optional(body.fromItem, 'string') || !optional(body.final, 'string')) {
    return roomError('invalid', 'revote and skip must be booleans, fromItem and final strings', 400);
  }
  // fromItem: the story the client showed, so a double click starts one round.
  const fromItem = typeof body.fromItem === 'string' ? body.fromItem : undefined;
  const room = body.revote === true
    ? revoteRound(roomId, userId)
    : body.skip === true
      ? skipStory(roomId, userId, fromItem)
      : resetRound(roomId, userId, fromItem, typeof body.final === 'string' ? body.final.normalize('NFC') : undefined);
  if (typeof room === 'string') return refused(room, 'Cannot start a new round');
  syncKeptRoom(room, userId);
  return Response.json(roomForActor(room, userId, body.revote !== true && body.skip !== true));
});
