import { createRoom, newRoomId, cleanCustomCards, isValidUserId, roomCapacityLeft, roomsOpenedBy, cutText, sanitizeRoomForViewer, MAX_PARTICIPANTS, MAX_ROOMS_PER_ADDRESS, type DeckType } from '@/lib/store';
import { isDeckType } from '@/lib/deck';
import { MAX_NAME, MAX_ROOM_NAME, MIN_CUSTOM_CARDS } from '@/lib/limits';
import { isKeptCode } from '@/lib/keptRooms';
import { rateLimitAll, rateLimitResponse } from '@/lib/rateLimit';
import { issueRoomToken } from '@/lib/roomToken';
import { getClientIp } from '@/lib/clientIp';
import { jsonBody, optional, roomError, roomRoute, textField } from '@/lib/roomRequest';

export const POST = roomRoute('create', async (request: Request) => {
  // A team opens a room or two per meeting; a script opening hundreds would
  // crowd out everyone else.
  const ip = getClientIp(request.headers);
  const over = await rateLimitAll([
    { key: `createRoom:${ip}`, max: 10, windowMs: 60_000 },
    { key: `createRoomHour:${ip}`, max: 60, windowMs: 60 * 60_000 },
  ]);
  if (over) return rateLimitResponse(over);

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const name = textField(body.name, MAX_ROOM_NAME);
  if (!name) return roomError('invalid', 'Room name is required', 400);
  if (!isValidUserId(body.creatorId)) return roomError('invalid', 'creatorId is required', 400);
  if (!optional(body.creatorName, 'string') || !optional(body.creatorAvatar, 'string')) {
    return roomError('invalid', 'creatorName and creatorAvatar must be strings', 400);
  }
  if (body.deckType != null && !isDeckType(body.deckType)) return roomError('invalid', 'Invalid deckType', 400);
  const creatorId = body.creatorId;
  const creatorName = cutText(typeof body.creatorName === 'string' ? body.creatorName : '', MAX_NAME) || 'Host';
  const creatorAvatar = typeof body.creatorAvatar === 'string' ? body.creatorAvatar : '';
  const deckType: DeckType = isDeckType(body.deckType) ? body.deckType : 'scrum';
  let customCards: string[] | null = null;
  if (deckType === 'custom') {
    const cards = body.customCards;
    if (!Array.isArray(cards) || !cards.every(c => typeof c === 'string')) {
      return roomError('invalid', 'customCards must be a list of strings', 400);
    }
    customCards = cleanCustomCards(cards);
    if (customCards.length < MIN_CUSTOM_CARDS) {
      return roomError('invalid', `Custom deck requires at least ${MIN_CUSTOM_CARDS} different cards`, 400);
    }
  }
  if (roomsOpenedBy(ip) >= MAX_ROOMS_PER_ADDRESS) {
    return Response.json({ error: 'Too many open rooms from your address, try again later', code: 'busy' }, { status: 429, headers: { 'Retry-After': '600' } });
  }
  if (roomCapacityLeft() <= 0) {
    return Response.json({ error: 'Too many rooms open right now, try again in a few minutes', code: 'busy' }, { status: 503, headers: { 'Retry-After': '300' } });
  }

  // A new code must not be one a kept room is waiting to be opened under.
  let id = newRoomId();
  while (await isKeptCode(id)) id = newRoomId();
  const room = createRoom(name, creatorId, creatorName, creatorAvatar, deckType, customCards, MAX_PARTICIPANTS, id, ip);
  // Issue the signed room cookie immediately so the creator's identity is
  // proven when they land on the room page and re-join.
  await issueRoomToken(room.id, creatorId);
  return Response.json(sanitizeRoomForViewer(room, creatorId), { status: 201 });
});
