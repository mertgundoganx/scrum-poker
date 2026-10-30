import { timerAction, roomForActor, TIMER_LIMITS_MS } from '@/lib/store';
import { jsonBody, refused, roomActor, roomError, roomRoute } from '@/lib/roomRequest';

const VALID_ACTIONS = ['start', 'stop', 'reset', 'limit'] as const;
type TimerActionName = (typeof VALID_ACTIONS)[number];

/** { action: start | stop | reset } or { action: 'limit', ms } (0 counts up, else a countdown). */
export const POST = roomRoute('timer', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'timer', perMinute: 30 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { action, ms } = body;
  if (!VALID_ACTIONS.includes(action as TimerActionName)) {
    return roomError('invalid', 'action must be start, stop, reset or limit', 400);
  }
  if (action === 'limit' && ms !== 0 && !(TIMER_LIMITS_MS as readonly unknown[]).includes(ms)) {
    return roomError('invalid', `limit needs ms: 0 or one of ${TIMER_LIMITS_MS.join(', ')}`, 400);
  }

  const room = timerAction(roomId, userId, action as TimerActionName, typeof ms === 'number' ? ms : 0);
  if (typeof room === 'string') return refused(room, 'Cannot change the timer');
  return Response.json(roomForActor(room, userId));
});
