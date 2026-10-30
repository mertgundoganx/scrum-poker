import { liveRoom, roomStatus, canOpenStream, getChatHistory, subscribeToRoom, subscribeToChat, subscribeToKick, subscribeToNudge, subscribeToReaction, subscribeToShutdown, connect, disconnect, touchRoom, ensureRoomsLoaded, encodeRoomForViewer, type ChatMessage, type Nudge, type Reaction, type Room, type SentParts } from '@/lib/store';
import { getRoomUserId } from '@/lib/roomToken';
import { logRouteError, roomCode, roomError, roomRoute } from '@/lib/roomRequest';
import { rateLimit, rateLimitResponse } from '@/lib/rateLimit';
import { getClientIp } from '@/lib/clientIp';

export const dynamic = 'force-dynamic';

const KEEPALIVE_MS = 20_000; // well under Cloudflare's 100s idle timeout

export const GET = roomRoute('events', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const code = roomCode((await props.params).id);
  if (!code) return roomError('room_not_found', 'Room not found', 404);
  const roomId = code;
  await ensureRoomsLoaded();
  // Reconnects after a deploy come all at once, a whole office behind one address.
  const ip = getClientIp(request.headers);
  const rl = await rateLimit(`events:${ip}`, 120, 60_000);
  if (!rl.allowed) return rateLimitResponse(rl);

  // The user comes from the signed room cookie, never from the query.
  const userId = await getRoomUserId(roomId);
  // Only participants get the stream: someone dropped after a long absence
  // joins again first (the client does so on this answer). Without the room
  // cookie nothing is looked up, so no code can be guessed here.
  const status = userId ? roomStatus(roomId, userId) : 'outsider';
  if (status === 'missing') return roomError('room_not_found', 'Room not found', 404);
  if (status === 'banned') return roomError('kicked', 'Removed from this room', 403);
  if (!userId || status !== 'member') return roomError('not_participant', 'Not a participant', 401);
  // Every stream costs memory and an encode per change: a few tabs each, and
  // a bound per address and for the server.
  if (!canOpenStream(roomId, userId, ip)) return Response.json({ error: 'Too many open connections', code: 'rejected' }, { status: 429, headers: { 'Retry-After': '30' } });
  // Read the chat before the stream starts, so nothing in start() awaits:
  // subscribing and the first snapshot then happen without a gap in which an
  // update or the client's disconnect could be missed.
  const chat = await getChatHistory(roomId);
  if (request.signal.aborted) return new Response(null, { status: 499 });

  const encoder = new TextEncoder();
  const unsubscribers: (() => void)[] = [];
  let keepaliveTimer: ReturnType<typeof setInterval> | null = null;
  let cleaned = false;
  let connected = false;

  function cleanup() {
    if (cleaned) return;
    cleaned = true;
    if (keepaliveTimer) clearInterval(keepaliveTimer);
    for (const off of unsubscribers) off();
    if (connected) disconnect(roomId, userId!, ip);
  }

  const stream = new ReadableStream({
    start(controller) {
      const write = (chunk: string) => {
        try {
          controller.enqueue(encoder.encode(chunk));
        } catch {
          cleanup(); // controller already closed
        }
      };
      const close = () => {
        cleanup();
        try { controller.close(); } catch { /* already closed */ }
      };
      // The history and the queue go out only when they changed since this
      // stream last got them.
      let sent: SentParts = { historyKey: null, queue: null };
      // Called from the room's broadcast, where a throw would reach no
      // handler: this stream closes instead (the client reconnects).
      const send = (data: Room) => {
        try {
          const encoded = encodeRoomForViewer(data, userId!, sent);
          sent = encoded.sent;
          write(`data: ${encoded.json}\n\n`);
        } catch (err) {
          logRouteError('GET events', roomId, err);
          close();
        }
      };
      const event = (name: string, data: unknown) => write(`event: ${name}\ndata: ${JSON.stringify(data)}\n\n`);

      request.signal.addEventListener('abort', close);
      unsubscribers.push(
        subscribeToRoom(roomId, send),
        subscribeToChat(roomId, (msg: ChatMessage) => event('chat', msg)),
        subscribeToKick(roomId, (kickedUserId: string) => {
          event('kick', { userId: kickedUserId });
          if (kickedUserId === userId) close();
        }),
        subscribeToNudge(roomId, (n: Nudge) => event('nudge', n)),
        subscribeToReaction(roomId, (r: Reaction) => event('reaction', r)),
        // A deploy is replacing this server: reconnect (to the new one) now.
        subscribeToShutdown(() => {
          event('reconnect', {});
          close();
        }),
      );
      // Checked again here, where nothing awaits before connect(): a burst of
      // requests all passed the first check while the chat was being read.
      if (!canOpenStream(roomId, userId!, ip)) {
        event('reconnect', {});
        close();
        return;
      }
      // Counts as present from here; this may emit our own "back" update,
      // which the subscription above already receives.
      connect(roomId, userId!, ip);
      connected = true;

      const room = liveRoom(roomId);
      if (room) send(room);
      if (chat.length) event('chat-history', chat);

      keepaliveTimer = setInterval(() => {
        write(': keepalive\n\n');
        touchRoom(roomId);
      }, KEEPALIVE_MS);
    },
    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
});
