import { setSettings, roomForActor, cleanIssueUrl, type RoomSettings } from '@/lib/store';
import { jsonBody, refused, roomActor, roomError, roomRoute } from '@/lib/roomRequest';
import { syncKeptRoom } from '@/lib/keptRooms';

const SWITCHES = ['autoReveal', 'anonymous', 'hostRuns', 'closed', 'reactions'] as const;

/**
 * The host changes how the room runs: { autoReveal?, anonymous?, hostRuns?,
 * closed?, reactions?, issueUrl? } (issueUrl: see cleanIssueUrl, or '' for none).
 */
export const POST = roomRoute('settings', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'settings', perMinute: 30 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const changes: Partial<RoomSettings> = {};
  for (const key of SWITCHES) {
    if (body[key] !== undefined) {
      if (typeof body[key] !== 'boolean') return roomError('invalid', `${key} must be a boolean`, 400);
      changes[key] = body[key];
    }
  }
  if (body.issueUrl !== undefined) {
    const issueUrl = cleanIssueUrl(body.issueUrl);
    if (issueUrl === null) return roomError('invalid', 'issueUrl must be an https address with {key} once, in its path, query or fragment', 400);
    changes.issueUrl = issueUrl;
  }

  const room = setSettings(roomId, userId, changes);
  if (typeof room === 'string') return refused(room, 'Cannot change the room settings');
  syncKeptRoom(room, userId);
  return Response.json(roomForActor(room, userId));
});
