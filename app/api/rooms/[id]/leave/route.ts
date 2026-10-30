import { softLeave, ensureRoomsLoaded } from '@/lib/store';
import { getRoomUserId } from '@/lib/roomToken';
import { roomCode, roomRoute } from '@/lib/roomRequest';

/**
 * The page's leave beacon (tab closed, or reloaded). A reload joins again a
 * moment later, so this only starts a short grace period; the room cookie is
 * kept so the reloaded page can prove its identity.
 */
export const POST = roomRoute('leave', async (
  _request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const roomId = roomCode((await props.params).id);
  if (!roomId) return Response.json({ ok: true });
  await ensureRoomsLoaded();

  const userId = await getRoomUserId(roomId);
  // Cookie missing/expired — nothing to leave. Return ok so beacons don't error.
  if (userId) softLeave(roomId, userId);
  return Response.json({ ok: true });
});
