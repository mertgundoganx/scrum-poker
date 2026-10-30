import { setDeckType, roomForActor, cleanCustomCards, type DeckType } from '@/lib/store';
import { isDeckType } from '@/lib/deck';
import { jsonBody, refused, roomActor, roomError, roomRoute } from '@/lib/roomRequest';
import { syncKeptRoom } from '@/lib/keptRooms';
import { MIN_CUSTOM_CARDS } from '@/lib/limits';

export const POST = roomRoute('deck', async (
  request: Request,
  props: { params: Promise<{ id: string }> }
) => {
  const actor = await roomActor(props, { name: 'deck', perMinute: 30 });
  if (actor instanceof Response) return actor;
  const { roomId, userId } = actor;

  const body = await jsonBody(request);
  if (body instanceof Response) return body;
  const { deckType, customCards } = body;
  if (!isDeckType(deckType)) {
    return roomError('invalid', 'Invalid deckType', 400);
  }
  let parsedCustom: string[] | undefined;
  if (deckType === 'custom') {
    if (!Array.isArray(customCards) || !customCards.every(c => typeof c === 'string')) {
      return roomError('invalid', 'customCards must be a list of strings', 400);
    }
    parsedCustom = cleanCustomCards(customCards);
    if (parsedCustom.length < MIN_CUSTOM_CARDS) {
      return roomError('invalid', `Custom deck requires at least ${MIN_CUSTOM_CARDS} different cards`, 400);
    }
  }

  const room = setDeckType(roomId, userId, deckType as DeckType, parsedCustom);
  if (typeof room === 'string') return refused(room, 'Cannot change the deck');
  syncKeptRoom(room, userId);
  return Response.json(roomForActor(room, userId));
});
