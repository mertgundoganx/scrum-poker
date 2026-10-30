import { setQueue, removeFromQueue, moveInQueue, editInQueue, requeueStory, roomForActor, type Refusal, type Room } from '@/lib/store';
import { syncKeptRoom } from '@/lib/keptRooms';
import { MAX_STORY } from '@/lib/limits';
import { isIndex, jsonBody, optional, refused, roomActor, roomError, roomRoute, textField } from '@/lib/roomRequest';

/**
 * Add stories (`append: true`) or replace the queue; an empty list clears it.
 * { requeue: story } estimates a story again: current story, or next in line.
 * Blank stories are left out, and past the queue's limit the rest is dropped.
 */
export const POST = roomRoute('queue', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'queue', perMinute: 30 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { items, append, requeue } = body;
  if (requeue != null) {
    const story = textField(requeue, MAX_STORY);
    if (!story) return roomError('invalid', 'requeue must be a story', 400);
    const room = requeueStory(roomId, userId, story);
    if (typeof room === 'string') return refused(room, 'Cannot estimate that story again: the queue is full');
    syncKeptRoom(room, userId);
    return Response.json(roomForActor(room, userId));
  }
  if (!Array.isArray(items) || !items.every(i => typeof i === 'string')) {
    return roomError('invalid', 'items must be a list of strings', 400);
  }
  if (!optional(append, 'boolean')) return roomError('invalid', 'append must be a boolean', 400);

  const room = setQueue(roomId, userId, items, append === true ? 'append' : 'replace');
  if (typeof room === 'string') return refused(room, 'Cannot change the queue');
  syncKeptRoom(room, userId);
  return Response.json(roomForActor(room, userId));
});

/**
 * Change one queued story, found by its `index` and checked against its text
 * `item`: { op: 'move', to } puts it at position `to` (0 = next);
 * { op: 'edit', text } corrects its text.
 */
export const PATCH = roomRoute('queue', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'queue', perMinute: 60 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { op, index, to, text, item } = body;
  if (!isIndex(index)) return roomError('invalid', 'index must be a whole number from 0', 400);
  if (!optional(item, 'string')) return roomError('invalid', 'item must be a string', 400);
  const expected = typeof item === 'string' ? item : undefined;
  let room: Room | Refusal;
  if (op === 'move' && isIndex(to)) {
    room = moveInQueue(roomId, userId, index, to, expected);
  } else if (op === 'edit') {
    const story = textField(text, MAX_STORY);
    if (!story) return roomError('invalid', 'edit needs the text of a story', 400);
    room = editInQueue(roomId, userId, index, story, expected);
  } else {
    return roomError('invalid', "op must be 'move' (with to) or 'edit' (with text)", 400);
  }

  if (typeof room === 'string') return refused(room, 'Cannot change that story');
  syncKeptRoom(room, userId);
  return Response.json(roomForActor(room, userId));
});

/** Remove one story: its `index`, checked against its text `item` when given. */
export const DELETE = roomRoute('queue', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'queue', perMinute: 30 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { index, item } = body;
  if (!isIndex(index)) return roomError('invalid', 'index must be a whole number from 0', 400);
  if (!optional(item, 'string')) return roomError('invalid', 'item must be a string', 400);

  const room = removeFromQueue(roomId, userId, index, typeof item === 'string' ? item : undefined);
  if (typeof room === 'string') return refused(room, 'Cannot remove that story');
  syncKeptRoom(room, userId);
  return Response.json(roomForActor(room, userId));
});
