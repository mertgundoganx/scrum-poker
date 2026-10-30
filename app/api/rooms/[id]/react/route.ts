import { react, isValidUserId, REACTIONS } from '@/lib/store';
import { jsonBody, roomActor, roomError, roomRoute } from '@/lib/roomRequest';
import { rateLimit, rateLimitResponse } from '@/lib/rateLimit';

/** Throw an emoji: { emoji, targetId? } (no target: at the whole room). */
export const POST = roomRoute('react', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'react', perMinute: 40 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;
  // Bursts too: a reaction flies across every screen in the room.
  const rl = await rateLimit(`react-burst:${userId}`, 10, 10_000);
  if (!rl.allowed) return rateLimitResponse(rl);

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { emoji, targetId } = body;
  if (typeof emoji !== 'string' || !(REACTIONS as readonly string[]).includes(emoji)) {
    return roomError('invalid', `emoji must be one of ${REACTIONS.join(' ')}`, 400);
  }
  if (targetId != null && !isValidUserId(targetId)) return roomError('invalid', 'targetId must be a participant id', 400);

  if (!react(roomId, userId, emoji, isValidUserId(targetId) ? targetId : null)) {
    return roomError('rejected', 'Cannot react', 409);
  }
  return Response.json({ ok: true });
});
