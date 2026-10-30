import { sendChat } from '@/lib/store';
import { rateLimit, rateLimitResponse } from '@/lib/rateLimit';
import { jsonBody, roomActor, roomError, roomRoute, textField } from '@/lib/roomRequest';
import { MAX_CHAT } from '@/lib/limits';

export const POST = roomRoute('chat', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props);
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const text = textField(body.text, MAX_CHAT);
  if (!text) return roomError('invalid', 'Message is required', 400);

  const rl = await rateLimit(`chat:${userId}`, 30, 10_000);
  if (!rl.allowed) return rateLimitResponse(rl);

  // Stored as typed: the client renders messages as text, never as HTML.
  const msg = await sendChat(roomId, userId, text);
  if (!msg) return roomError('rejected', 'Failed to send message', 409);
  return Response.json(msg);
});
