import { setItem, renameStory, roomForActor } from '@/lib/store';
import { jsonBody, optional, refused, roomActor, roomError, roomRoute, textField } from '@/lib/roomRequest';
import { MAX_STORY } from '@/lib/limits';
import { syncKeptRoom } from '@/lib/keptRooms';

/** Set the story to estimate (a new round), or with `rename: true` correct its text and keep the votes. */
export const POST = roomRoute('item', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'item', perMinute: 60 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const item = textField(body.item, MAX_STORY);
  if (!item) return roomError('invalid', 'Item cannot be empty', 400);
  const { rename } = body;
  if (!optional(rename, 'boolean')) return roomError('invalid', 'rename must be a boolean', 400);

  const room = rename === true ? renameStory(roomId, userId, item) : setItem(roomId, userId, item);
  if (typeof room === 'string') return refused(room, 'Cannot set the story');
  syncKeptRoom(room, userId);
  return Response.json(roomForActor(room, userId));
});
