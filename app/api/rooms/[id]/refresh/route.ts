import { roomActor, roomRoute } from '@/lib/roomRequest';

/**
 * Refresh room token cookie (sliding expiration).
 * Called periodically by the client to keep idle sessions alive.
 */
export const POST = roomRoute('refresh', async (
  _request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  // roomActor() re-issues the cookie on success (getRoomUserId slides it).
  const actor = await roomActor(props, { name: 'refresh', perMinute: 10 });
  if (actor instanceof Response) return actor;
  return Response.json({ ok: true });
});
