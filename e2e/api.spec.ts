import { expect, test, type APIRequestContext, type APIResponse, type PlaywrightWorkerArgs } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { randomIp } from './helpers';
import { MAX_NAME, MAX_ROOM_NAME, MAX_STORY } from '../lib/limits';

/** An API client with its own client IP (rate limits are per IP). */
async function client(playwright: PlaywrightWorkerArgs['playwright'], baseURL: string): Promise<APIRequestContext> {
  return playwright.request.newContext({
    baseURL,
    extraHTTPHeaders: { 'X-Forwarded-For': randomIp() },
  });
}

async function newRoom(api: APIRequestContext, overrides: Record<string, unknown> = {}) {
  const creatorId = randomUUID();
  const res = await api.post('/api/rooms', {
    data: { name: 'API room', creatorId, creatorName: 'Host', deckType: 'fibonacci', ...overrides },
  });
  expect(res.status()).toBe(201);
  return { room: await res.json(), creatorId };
}

test.describe('room API', () => {
  test('creation validates its input', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    expect((await api.post('/api/rooms', { data: { creatorId: 'x' } })).status()).toBe(400);
    expect((await api.post('/api/rooms', { data: { name: 'R' } })).status()).toBe(400);
    expect((await api.post('/api/rooms', { data: { name: 'R', creatorId: 'x', deckType: 'custom', customCards: ['1'] } })).status()).toBe(400);
    // Not JSON: refused by the proxy before the route.
    const form = await api.post('/api/rooms', { form: { name: 'R', creatorId: 'x' } });
    expect(form.status()).toBe(415);
    // Garbage JSON is a 400, not a 500.
    const broken = await api.post('/api/rooms', { headers: { 'Content-Type': 'application/json' }, data: '{"name":' });
    expect(broken.status()).toBe(400);
    await api.dispose();
  });

  test('actions need the room cookie', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room } = await newRoom(owner);
    const stranger = await client(playwright, baseURL!);
    for (const action of ['vote', 'reveal', 'reset', 'lock', 'chat', 'kick', 'queue', 'item', 'timer', 'deck', 'spectator', 'nudge']) {
      const res = await stranger.post(`/api/rooms/${room.id}/${action}`, { data: { card: '5', text: 'hi', targetId: 'x', items: ['a'], item: 'a', action: 'start', deckType: 'tshirt', spectator: true } });
      expect(res.status(), action).toBe(401);
    }
    // Room details beyond the summary are for participants only.
    const summary = await (await stranger.get(`/api/rooms/${room.id}`)).json();
    expect(summary.participants).toBeUndefined();
    await owner.dispose();
    await stranger.dispose();
  });

  test('?summary=1 says whether we are in the room, without the room', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room } = await newRoom(owner);
    const stranger = await client(playwright, baseURL!);
    const mine = await (await owner.get(`/api/rooms/${room.id}?summary=1`)).json();
    expect(mine).toMatchObject({ id: room.id, name: 'API room', member: true, participantCount: 1 });
    // Even for a participant: no votes, queue or history.
    expect(mine.participants).toBeUndefined();
    expect(mine.history).toBeUndefined();
    expect((await (await stranger.get(`/api/rooms/${room.id}?summary=1`)).json()).member).toBe(false);
    expect((await stranger.get('/api/rooms/ZZZZZZZZ?summary=1')).status()).toBe(404);
    await owner.dispose();
    await stranger.dispose();
  });

  test("nobody can take over the host's identity", async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room, creatorId } = await newRoom(owner);
    const attacker = await client(playwright, baseURL!);
    const res = await attacker.post(`/api/rooms/${room.id}/join`, { data: { userId: creatorId, name: 'Evil' } });
    expect(res.status()).toBe(409);
    expect((await res.json()).code).toBe('identity_in_use');
    await owner.dispose();
    await attacker.dispose();
  });

  test('only the host changes the deck or removes people', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room, creatorId } = await newRoom(owner);
    const guest = await client(playwright, baseURL!);
    const guestId = randomUUID();
    expect((await guest.post(`/api/rooms/${room.id}/join`, { data: { userId: guestId, name: 'Guest' } })).status()).toBe(200);

    for (const [action, data] of [['deck', { deckType: 'tshirt' }], ['kick', { targetId: creatorId }], ['settings', { closed: true }], ['host', { targetId: guestId }]] as const) {
      const res = await guest.post(`/api/rooms/${room.id}/${action}`, { data });
      expect(res.status(), action).toBe(403);
      expect((await res.json()).code, action).toBe('host_only');
    }
    expect((await owner.post(`/api/rooms/${room.id}/deck`, { data: { deckType: 'tshirt' } })).ok()).toBe(true);
    expect((await owner.post(`/api/rooms/${room.id}/kick`, { data: { targetId: guestId } })).ok()).toBe(true);
    // The kicked guest's cookie no longer lets them act.
    expect((await guest.post(`/api/rooms/${room.id}/vote`, { data: { card: 'M' } })).ok()).toBe(false);
    await owner.dispose();
    await guest.dispose();
  });

  test('votes: only cards of the deck, none after the reveal', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room } = await newRoom(owner);
    const vote = (card: unknown) => owner.post(`/api/rooms/${room.id}/vote`, { data: { card } });
    const notInDeck = await vote('4');
    expect(notInDeck.status()).toBe(409);
    expect((await notInDeck.json()).code).toBe('rejected');
    expect((await vote({ toString: 1 })).status()).toBe(400);
    expect((await vote('5')).status()).toBe(200);
    expect((await owner.post(`/api/rooms/${room.id}/reveal`, { data: {} })).status()).toBe(200);
    const late = await vote('8');
    expect(late.status()).toBe(409);
    expect((await late.json()).code).toBe('round_changed');
    const state = await (await owner.get(`/api/rooms/${room.id}`)).json();
    expect(Object.values(state.votes)).toEqual(['5']);
    await owner.dispose();
  });

  test('oversized and odd input is cut or refused, never stored as is', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room } = await newRoom(owner, { name: 'x'.repeat(5000), creatorName: 'y'.repeat(5000), creatorAvatar: 'z'.repeat(5000) });
    expect(room.name).toHaveLength(MAX_ROOM_NAME);
    const p = Object.values(room.participants)[0] as { name: string; avatar: string };
    expect(p.name).toHaveLength(MAX_NAME);
    // Only the avatars to pick from; anything else is none.
    expect(p.avatar).toBe('');

    // Over the body limit: refused before anything reads it.
    const huge = await owner.post(`/api/rooms/${room.id}/queue`, { data: { items: Array.from({ length: 500 }, (_, i) => `story ${i} ${'q'.repeat(500)}`) } });
    expect(huge.status()).toBe(413);
    // Under it, but too many and too long: cut.
    const queue = await owner.post(`/api/rooms/${room.id}/queue`, { data: { items: Array.from({ length: 300 }, (_, i) => `story ${i} ${'q'.repeat(300)}`) } });
    expect(queue.ok()).toBe(true);
    const q = await queue.json();
    expect(q.queue.length).toBeLessThanOrEqual(100);
    expect(q.currentItem.length).toBeLessThanOrEqual(MAX_STORY);

    const proto = await owner.post(`/api/rooms/${room.id}/join`, { data: { userId: '__proto__', name: 'Proto' } });
    expect(proto.status()).toBe(400);
    // The server keeps working afterwards.
    expect((await owner.get(`/api/rooms/${room.id}`)).status()).toBe(200);
    await owner.dispose();
  });

  test('room creation is rate limited per client', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const statuses: number[] = [];
    // 10 a minute from one address.
    for (let i = 0; i < 12; i++) {
      statuses.push((await api.post('/api/rooms', { data: { name: 'R', creatorId: randomUUID() } })).status());
    }
    expect(statuses.slice(0, 10).every(s => s === 201)).toBe(true);
    expect(statuses.at(-1)).toBe(429);
    const refused = await api.post('/api/rooms', { data: { name: 'R', creatorId: randomUUID() } });
    expect((await refused.json()).code).toBe('rate_limited');
    await api.dispose();
  });

  test('the events stream needs the room cookie', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room } = await newRoom(owner);
    const stranger = await client(playwright, baseURL!);
    const res = await stranger.get(`/api/rooms/${room.id}/events`, { timeout: 5_000 });
    expect(res.status()).toBe(401);
    await owner.dispose();
    await stranger.dispose();
  });
});

test.describe('API hardening', () => {
  test('only browser-made ids take a seat', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room } = await newRoom(owner);
    const guest = await client(playwright, baseURL!);
    // An old account id (from before accounts were removed): the page then makes a new id.
    const accountId = 'cm' + randomUUID().replace(/-/g, '').slice(0, 23);
    const join = await guest.post(`/api/rooms/${room.id}/join`, { data: { userId: accountId, name: 'Someone' } });
    expect(join.status()).toBe(409);
    expect((await join.json()).code).toBe('identity_in_use');
    const create = await guest.post('/api/rooms', { data: { name: 'R', creatorId: accountId } });
    expect(create.status()).toBe(400);
    await owner.dispose();
    await guest.dispose();
  });

  test('a removed guest stays out under a new id', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room } = await newRoom(owner);
    const guest = await client(playwright, baseURL!);
    const guestId = randomUUID();
    expect((await guest.post(`/api/rooms/${room.id}/join`, { data: { userId: guestId, name: 'Visitor' } })).status()).toBe(200);
    expect((await owner.post(`/api/rooms/${room.id}/kick`, { data: { targetId: guestId } })).ok()).toBe(true);
    const again = await guest.post(`/api/rooms/${room.id}/join`, { data: { userId: randomUUID(), name: 'Visitor 2' } });
    expect(again.status()).toBe(403);
    expect((await again.json()).code).toBe('kicked');
    await owner.dispose();
    await guest.dispose();
  });

  test('a huge custom deck is answered at once and cut to 20 cards', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const started = Date.now();
    // ~120 KB: under the body limit, and once enough to stall the server.
    const cards = Array.from({ length: 15_000 }, (_, i) => String(i));
    const res = await api.post('/api/rooms', { data: { name: 'Deck', creatorId: randomUUID(), deckType: 'custom', customCards: cards } });
    expect(res.status()).toBe(201);
    expect((await res.json()).customCards).toHaveLength(20);
    expect(Date.now() - started).toBeLessThan(2_000);
    await api.dispose();
  });

  test('bodies over the limit are refused', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const res = await api.post('/api/rooms', { data: { name: 'x'.repeat(200_000), creatorId: randomUUID() } });
    expect(res.status()).toBe(413);
    await api.dispose();
  });

  test('cross-site changes are refused', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const res = await api.post('/api/rooms', { headers: { 'Sec-Fetch-Site': 'cross-site' }, data: { name: 'R', creatorId: randomUUID() } });
    expect(res.status()).toBe(403);
    // A content type that only mentions JSON is not JSON.
    const sneaky = await api.post('/api/rooms', { headers: { 'Content-Type': 'text/plain; x=application/json' }, data: JSON.stringify({ name: 'R', creatorId: randomUUID() }) });
    expect(sneaky.status()).toBe(415);
    await api.dispose();
  });

  test('names lose invisible and direction-changing characters', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const { room } = await newRoom(api, { name: '‮Planning​', creatorName: '​Ayla⁦' });
    expect(room.name).toBe('Planning');
    const p = Object.values(room.participants)[0] as { name: string };
    expect(p.name).toBe('Ayla');
    const blank = await api.post(`/api/rooms/${room.id}/join`, { data: { userId: randomUUID(), name: '​‎' } });
    expect(blank.status()).toBe(400);
    await api.dispose();
  });

  test('anonymous voting stays on while the round has votes', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room } = await newRoom(owner);
    expect((await owner.post(`/api/rooms/${room.id}/settings`, { data: { anonymous: true } })).ok()).toBe(true);
    expect((await owner.post(`/api/rooms/${room.id}/vote`, { data: { card: '5' } })).ok()).toBe(true);
    expect((await owner.post(`/api/rooms/${room.id}/reveal`, { data: {} })).ok()).toBe(true);
    const locked = await owner.post(`/api/rooms/${room.id}/settings`, { data: { anonymous: false } });
    expect(locked.status()).toBe(409);
    expect((await locked.json()).code).toBe('anonymous_locked');
    expect((await owner.post(`/api/rooms/${room.id}/reset`, { data: {} })).ok()).toBe(true);
    expect((await owner.post(`/api/rooms/${room.id}/settings`, { data: { anonymous: false } })).ok()).toBe(true);
    await owner.dispose();
  });

  test('API answers are never cached', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const { room } = await newRoom(api);
    const res = await api.get(`/api/rooms/${room.id}`);
    expect(res.headers()['cache-control']).toContain('no-store');
    expect(res.headers()['x-powered-by']).toBeUndefined();
    await api.dispose();
  });
});

test.describe('kept rooms', () => {
  /** A room its host keeps; returns the owner key. */
  async function keptRoom(api: APIRequestContext) {
    const { room, creatorId } = await newRoom(api);
    const res = await api.post(`/api/rooms/${room.id}/keep`, { data: { kept: true } });
    expect(res.ok(), await res.text()).toBe(true);
    const body = await res.json();
    expect(body.kept).toBe(true);
    expect(body.isOwner).toBe(true);
    expect(body.ownerKey).toMatch(/^[A-Za-z0-9_-]{43}$/);
    // The owners stay on the server.
    expect(body.owners).toBeUndefined();
    return { room, creatorId, key: body.ownerKey as string };
  }

  test('only the host keeps a room, and the key is handed out once', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room } = await newRoom(owner);
    const guest = await client(playwright, baseURL!);
    const guestId = randomUUID();
    expect((await guest.post(`/api/rooms/${room.id}/join`, { data: { userId: guestId, name: 'Guest' } })).ok()).toBe(true);
    expect((await guest.post(`/api/rooms/${room.id}/keep`, { data: { kept: true } })).status()).toBe(403);

    const first = await owner.post(`/api/rooms/${room.id}/keep`, { data: { kept: true } });
    expect((await first.json()).ownerKey).toBeTruthy();
    // Keeping again changes nothing and hands out no new key.
    const again = await owner.post(`/api/rooms/${room.id}/keep`, { data: { kept: true } });
    expect(again.ok()).toBe(true);
    expect((await again.json()).ownerKey).toBeUndefined();
    await owner.dispose();
    await guest.dispose();
  });

  test('the owner link makes its holder the host; a wrong key does nothing', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room, key } = await keptRoom(owner);

    const stranger = await client(playwright, baseURL!);
    const strangerId = randomUUID();
    const wrong = await stranger.post(`/api/rooms/${room.id}/join`, { data: { userId: strangerId, name: 'Stranger', ownerKey: 'x'.repeat(43) } });
    expect(wrong.ok()).toBe(true);
    const seen = await wrong.json();
    expect(seen.isOwner).toBe(false);
    expect(seen.creatorId).not.toBe(strangerId);
    // The host passes the role on; the owner arriving takes it back.
    expect((await owner.post(`/api/rooms/${room.id}/host`, { data: { targetId: strangerId } })).ok()).toBe(true);

    // The same owner on another device: a new id, the key from the owner link.
    const laptop = await client(playwright, baseURL!);
    const laptopId = randomUUID();
    const join = await laptop.post(`/api/rooms/${room.id}/join`, { data: { userId: laptopId, name: 'Owner', ownerKey: key } });
    const joined = await join.json();
    expect(joined.isOwner).toBe(true);
    expect(joined.creatorId).toBe(laptopId);
    await owner.dispose();
    await stranger.dispose();
    await laptop.dispose();
  });

  test('a later host can neither keep nor let go of the room', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room } = await keptRoom(owner);
    const guest = await client(playwright, baseURL!);
    const guestId = randomUUID();
    expect((await guest.post(`/api/rooms/${room.id}/join`, { data: { userId: guestId, name: 'Guest' } })).ok()).toBe(true);
    expect((await owner.post(`/api/rooms/${room.id}/host`, { data: { targetId: guestId } })).ok()).toBe(true);

    expect((await guest.post(`/api/rooms/${room.id}/keep`, { data: { kept: true } })).status()).toBe(409);
    expect((await guest.post(`/api/rooms/${room.id}/keep`, { data: { kept: false } })).status()).toBe(403);
    const view = await (await guest.get(`/api/rooms/${room.id}`)).json();
    expect(view.kept).toBe(true);
    await owner.dispose();
    await guest.dispose();
  });

  test('the owner stops keeping it from outside the room, with the key only', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room, key } = await keptRoom(owner);
    const elsewhere = await client(playwright, baseURL!);
    expect((await elsewhere.delete(`/api/rooms/${room.id}/keep`, { data: { ownerKey: 'x'.repeat(43) } })).status()).toBe(403);
    expect((await elsewhere.delete(`/api/rooms/${room.id}/keep`, { data: { ownerKey: key } })).ok()).toBe(true);
    // Done once: the key no longer works.
    expect((await elsewhere.delete(`/api/rooms/${room.id}/keep`, { data: { ownerKey: key } })).status()).toBe(403);
    const view = await (await owner.get(`/api/rooms/${room.id}`)).json();
    expect(view.kept).toBe(false);
    await owner.dispose();
    await elsewhere.dispose();
  });

  test('stopping from inside the room needs the owner key too', async ({ playwright, baseURL }) => {
    const owner = await client(playwright, baseURL!);
    const { room, key } = await keptRoom(owner);
    expect((await owner.post(`/api/rooms/${room.id}/keep`, { data: { kept: false } })).status()).toBe(403);
    const res = await owner.post(`/api/rooms/${room.id}/keep`, { data: { kept: false, ownerKey: key } });
    expect(res.ok()).toBe(true);
    expect((await res.json()).kept).toBe(false);
    await owner.dispose();
  });
});

test.describe('running the round', () => {
  /** A room with a second person in it. */
  async function roomWithGuest(playwright: PlaywrightWorkerArgs['playwright'], baseURL: string) {
    const owner = await client(playwright, baseURL);
    const { room, creatorId } = await newRoom(owner);
    const guest = await client(playwright, baseURL);
    const guestId = randomUUID();
    expect((await guest.post(`/api/rooms/${room.id}/join`, { data: { userId: guestId, name: 'Guest' } })).ok()).toBe(true);
    return { owner, guest, room, creatorId, guestId };
  }

  test('host-only rounds: guests vote, only the host runs the round', async ({ playwright, baseURL }) => {
    const { owner, guest, room } = await roomWithGuest(playwright, baseURL!);
    expect((await owner.post(`/api/rooms/${room.id}/settings`, { data: { hostRuns: true } })).ok()).toBe(true);
    expect((await guest.post(`/api/rooms/${room.id}/vote`, { data: { card: '5' } })).status()).toBe(200);
    for (const [action, data] of [
      ['reveal', {}], ['lock', {}], ['reset', {}], ['timer', { action: 'start' }], ['queue', { items: ['A'] }], ['item', { item: 'B' }],
    ] as const) {
      const res = await guest.post(`/api/rooms/${room.id}/${action}`, { data });
      expect(res.status(), action).toBe(403);
      expect((await res.json()).code, action).toBe('host_only');
    }
    // After the host's lock, everyone ends the countdown with a reveal.
    expect((await owner.post(`/api/rooms/${room.id}/lock`, { data: {} })).ok()).toBe(true);
    expect((await guest.post(`/api/rooms/${room.id}/reveal`, { data: {} })).status()).toBe(200);
    await owner.dispose();
    await guest.dispose();
  });

  test('a refusal says why: the story is gone, the round moved on, a spectator voted', async ({ playwright, baseURL }) => {
    const { owner, guest, room } = await roomWithGuest(playwright, baseURL!);
    const code = async (res: Promise<APIResponse>, status: number) => {
      const answer = await res;
      expect(answer.status()).toBe(status);
      return (await answer.json()).code;
    };
    const queue = (method: 'post' | 'patch' | 'delete', data: Record<string, unknown>) => owner[method](`/api/rooms/${room.id}/queue`, { data });
    expect((await queue('post', { items: ['First', 'Second', 'Third'] })).ok()).toBe(true);
    // Someone else removed "Second" meanwhile.
    expect((await queue('delete', { index: 0, item: 'Second' })).ok()).toBe(true);
    expect(await code(queue('delete', { index: 0, item: 'Second' }), 409)).toBe('item_gone');
    expect(await code(queue('patch', { op: 'move', index: 0, to: 1, item: 'Second' }), 409)).toBe('item_gone');
    expect(await code(queue('patch', { op: 'edit', index: 0, text: 'Again', item: 'Second' }), 409)).toBe('item_gone');
    expect(await code(queue('patch', { op: 'move', index: 7, to: 0 }), 409)).toBe('item_gone');

    // Two people start the next round at once: the second finds it started.
    const reset = (data: Record<string, unknown>) => owner.post(`/api/rooms/${room.id}/reset`, { data });
    expect((await reset({ fromItem: 'First' })).ok()).toBe(true);
    expect(await code(reset({ fromItem: 'First' }), 409)).toBe('round_changed');
    expect(await code(reset({ skip: true, fromItem: 'First' }), 409)).toBe('round_changed');

    expect((await guest.post(`/api/rooms/${room.id}/spectator`, { data: { spectator: true } })).ok()).toBe(true);
    expect(await code(guest.post(`/api/rooms/${room.id}/vote`, { data: { card: '5' } }), 409)).toBe('spectator');

    // After the reveal: no votes, no lock, no new deck. Revealing again is no refusal (every
    // client ends the countdown with a reveal).
    expect((await owner.post(`/api/rooms/${room.id}/vote`, { data: { card: '5' } })).ok()).toBe(true);
    expect((await owner.post(`/api/rooms/${room.id}/reveal`, { data: {} })).ok()).toBe(true);
    expect((await owner.post(`/api/rooms/${room.id}/reveal`, { data: {} })).ok()).toBe(true);
    expect(await code(owner.post(`/api/rooms/${room.id}/vote`, { data: {} }), 409)).toBe('round_changed');
    expect(await code(owner.post(`/api/rooms/${room.id}/lock`, { data: {} }), 409)).toBe('round_changed');
    expect(await code(owner.post(`/api/rooms/${room.id}/deck`, { data: { deckType: 'tshirt' } }), 409)).toBe('round_changed');
    await owner.dispose();
    await guest.dispose();
  });

  test('a closed room: new people get room_closed, people in it come back', async ({ playwright, baseURL }) => {
    const { owner, guest, room, guestId } = await roomWithGuest(playwright, baseURL!);
    expect((await owner.post(`/api/rooms/${room.id}/settings`, { data: { closed: true } })).ok()).toBe(true);
    const stranger = await client(playwright, baseURL!);
    const refused = await stranger.post(`/api/rooms/${room.id}/join`, { data: { userId: randomUUID(), name: 'Late' } });
    expect(refused.status()).toBe(403);
    expect((await refused.json()).code).toBe('room_closed');
    expect((await guest.post(`/api/rooms/${room.id}/join`, { data: { userId: guestId, name: 'Guest' } })).status()).toBe(200);
    await owner.dispose();
    await guest.dispose();
    await stranger.dispose();
  });

  test('reactions: the six emoji only, at someone else, limited, and off when the host says so', async ({ playwright, baseURL }) => {
    const { owner, guest, room, creatorId, guestId } = await roomWithGuest(playwright, baseURL!);
    const react = (api: APIRequestContext, data: Record<string, unknown>) => api.post(`/api/rooms/${room.id}/react`, { data });
    expect((await react(guest, { emoji: '👍' })).status()).toBe(200);
    expect((await react(guest, { emoji: '🎉', targetId: creatorId })).status()).toBe(200);
    expect((await react(guest, { emoji: '💩' })).status()).toBe(400);
    expect((await react(guest, { emoji: '👍', targetId: guestId })).status()).toBe(409);
    expect((await react(guest, {})).status()).toBe(400);

    // Ten in ten seconds per person.
    const statuses: number[] = [];
    for (let i = 0; i < 11; i++) statuses.push((await react(owner, { emoji: '☕' })).status());
    expect(statuses.slice(0, 10).every(s => s === 200)).toBe(true);
    expect(statuses.at(-1)).toBe(429);

    expect((await owner.post(`/api/rooms/${room.id}/settings`, { data: { reactions: false } })).ok()).toBe(true);
    expect((await react(guest, { emoji: '👍' })).status()).toBe(409);
    await owner.dispose();
    await guest.dispose();
  });

  test('the Scrum deck is the default, with ½', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const { room } = await newRoom(api, { deckType: undefined });
    expect(room.deckType).toBe('scrum');
    expect((await api.post(`/api/rooms/${room.id}/vote`, { data: { card: '½' } })).status()).toBe(200);
    expect((await api.post(`/api/rooms/${room.id}/vote`, { data: { card: '21' } })).status()).toBe(409);
    await api.dispose();
  });

  test('a countdown: only the offered lengths, started at once', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const { room } = await newRoom(api);
    const limit = (ms: unknown) => api.post(`/api/rooms/${room.id}/timer`, { data: { action: 'limit', ms } });
    const counting = await (await limit(60_000)).json();
    expect(counting.timerLimitMs).toBe(60_000);
    expect(typeof counting.timerStartedAt).toBe('number');
    expect((await limit(12_345)).status()).toBe(400);
    expect((await limit(1e308)).status()).toBe(400);
    expect((await limit('60000')).status()).toBe(400);
    const up = await (await limit(0)).json();
    expect(up.timerLimitMs).toBeNull();
    expect(up.timerStartedAt).toBeNull();
    await api.dispose();
  });

  test('a story estimated again is current, or next in line', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const { room } = await newRoom(api);
    const requeue = async (story: string) => (await api.post(`/api/rooms/${room.id}/queue`, { data: { requeue: story } })).json();
    const first = await requeue('ABC-1 Login');
    expect(first.currentItem).toBe('ABC-1 Login');
    const second = await requeue('ABC-2 Logout');
    expect(second.currentItem).toBe('ABC-1 Login');
    expect(second.queue[0]).toBe('ABC-2 Logout');
    await api.dispose();
  });

  test('the issue link must be https with {key} once, after the host', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const { room } = await newRoom(api);
    const set = (issueUrl: unknown) => api.post(`/api/rooms/${room.id}/settings`, { data: { issueUrl } });
    for (const bad of [
      'http://example.com/{key}', 'https://example.com/browse', 'javascript:alert(1)//{key}', 'data:text/html,{key}',
      'https://{key}.example.com/', 'https:{key}', 'https://user:pw@example.com/{key}', 'https://example.com/{key}/{key}',
      'https://example.com/a\n{key}', 'https://example.com/\u202E{key}', 5,
    ]) expect((await set(bad)).status(), String(bad)).toBe(400);
    expect((await (await set('https://example.com/issues?id={key}')).json()).settings.issueUrl).toBe('https://example.com/issues?id={key}');
    const ok = await set('https://example.atlassian.net/browse/{key}');
    expect((await ok.json()).settings.issueUrl).toBe('https://example.atlassian.net/browse/{key}');
    expect((await (await set('')).json()).settings.issueUrl).toBe('');
    await api.dispose();
  });
});

/** Characters by code point: the invisible ones are unreadable in source. */
const u = (...points: number[]) => String.fromCodePoint(...points);

test.describe('input validation', () => {
  test('a body that is not a JSON object is refused and changes nothing', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const { room } = await newRoom(api);
    const json = { 'Content-Type': 'application/json' };
    expect((await api.post(`/api/rooms/${room.id}/vote`, { data: { card: '5' } })).ok()).toBe(true);
    for (const data of ['{"card":', '[]', 'null', '"5"', '']) {
      const res = await api.post(`/api/rooms/${room.id}/vote`, { headers: json, data });
      expect(res.status(), data).toBe(400);
      expect((await res.json()).code).toBe('invalid');
    }
    // Once read as {}: a broken vote cleared the vote, a broken reset recorded the round.
    expect((await api.post(`/api/rooms/${room.id}/reset`, { headers: json, data: '{' })).status()).toBe(400);
    const state = await (await api.get(`/api/rooms/${room.id}`)).json();
    expect(Object.values(state.votes)).toEqual(['5']);
    expect(state.history).toHaveLength(0);
    await api.dispose();
  });

  test('a chunked body over the limit is refused too', async ({ baseURL }) => {
    const big = new TextEncoder().encode(JSON.stringify({ name: 'x'.repeat(200_000), creatorId: randomUUID() }));
    const body = new ReadableStream({
      start(c) {
        for (let i = 0; i < big.length; i += 16_384) c.enqueue(big.slice(i, i + 16_384));
        c.close();
      },
    });
    // No Content-Length for the proxy to check: the route counts the bytes.
    const res = await fetch(`${baseURL}/api/rooms`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': randomIp() }, body, duplex: 'half',
    } as RequestInit);
    expect(res.status).toBe(413);
  });

  test('mistyped fields are refused, not ignored', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const { room } = await newRoom(api);
    const cases: [string, unknown, ('post' | 'patch' | 'delete')?][] = [
      ['reset', { fromItem: 5 }], ['reset', { skip: 'yes' }], ['item', { item: ['a'] }], ['item', { item: 'a', rename: 1 }],
      ['queue', { items: ['a', 5] }], ['queue', { items: 'a' }], ['queue', { requeue: 7 }], ['queue', { items: [], append: 'yes' }],
      ['queue', { op: 'move', index: -1, to: 0 }, 'patch'], ['queue', { op: 'move', index: 0, to: 1.5 }, 'patch'],
      ['queue', { op: 'edit', index: 0, text: 'a', item: 3 }, 'patch'], ['queue', { index: '0' }, 'delete'],
      ['kick', { targetId: 'x'.repeat(5000) }], ['host', { targetId: '__proto__' }], ['nudge', { targetId: 'constructor' }],
      ['react', { emoji: '👍', targetId: 5 }], ['timer', { action: 'limit', ms: '60000' }], ['spectator', { spectator: 'true' }],
      ['settings', { autoReveal: null }], ['deck', { deckType: 'custom', customCards: ['1', 2, '3'] }],
      ['deck', { deckType: 'custom', customCards: '1,2' }], ['keep', { kept: true, ownerKey: 5 }],
      ['vote', { card: 5 }], ['chat', { text: { a: 1 } }],
    ];
    for (const [action, data, method = 'post'] of cases) {
      const res = await api[method](`/api/rooms/${room.id}/${action}`, { data });
      expect(res.status(), `${action} ${JSON.stringify(data)}`).toBe(400);
      expect((await res.json()).code).toBe('invalid');
    }
    const create = (data: Record<string, unknown>) => api.post('/api/rooms', { data: { name: 'R', creatorId: randomUUID(), ...data } });
    expect((await create({ deckType: 'bogus' })).status()).toBe(400);
    expect((await create({ creatorName: 5 })).status()).toBe(400);
    expect((await api.post(`/api/rooms/${room.id}/join`, { data: { userId: randomUUID(), name: 'G', ownerKey: { a: 1 } } })).status()).toBe(400);
    await api.dispose();
  });

  test('text is one line without hidden characters, and blank text is refused', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const { room } = await newRoom(api);
    const item = (text: string) => api.post(`/api/rooms/${room.id}/item`, { data: { item: text } });
    const story = async (text: string) => (await (await item(text)).json()).currentItem as string;
    expect(await story('one\ntwo\tthree' + u(0x2028) + 'four')).toBe('one two three four');
    // Hidden text (Unicode tags), half a surrogate pair, accents stacked without end.
    expect(await story('hi' + u(0xE0041, 0xE0042) + String.fromCharCode(0xD800) + '!')).toBe('hi!');
    expect(Array.from(await story('Z' + u(0x301).repeat(40)))).toHaveLength(7);
    // Cut at the limit, never inside an emoji.
    expect(await story('x'.repeat(MAX_STORY - 3) + '👨‍👩‍👧')).toBe('x'.repeat(MAX_STORY - 3));
    for (const blank of [u(0x200B), u(0x3164), u(0x2800, 0x20, 0xAD), u(0x202E, 0x2066)]) {
      expect((await item(blank)).status(), escape(blank)).toBe(400);
      expect((await api.post(`/api/rooms/${room.id}/chat`, { data: { text: blank } })).status(), escape(blank)).toBe(400);
    }
    // é typed composed or decomposed is the same name, and a hidden joiner doesn't make another one.
    const guest = await client(playwright, baseURL!);
    const joined = await (await guest.post(`/api/rooms/${room.id}/join`, {
      data: { userId: randomUUID(), name: 'Ame' + u(0x301) + 'lie' + u(0x200D), avatar: '🦊' },
    })).json();
    const people = Object.values(joined.participants as Record<string, { name: string; avatar: string }>);
    expect(people.find(p => p.name === 'Amélie')?.avatar).toBe('🦊');
    // Cards are cleaned the same way, and the mark for a hidden vote is never one.
    const deck = await api.post(`/api/rooms/${room.id}/deck`, { data: { deckType: 'custom', customCards: ['✓', 'a\nb', 'é', 'e' + u(0x301), 'c'] } });
    expect((await deck.json()).customCards).toEqual(['a b', 'é', 'c']);
    await api.dispose();
    await guest.dispose();
  });

  test('odd room codes are not looked up', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    for (const code of ['ABC', 'Z'.repeat(300), '%00ABCDEFG']) {
      expect((await api.get(`/api/rooms/${code}`)).status(), code).toBe(404);
      expect((await api.post(`/api/rooms/${code}/join`, { data: { userId: randomUUID(), name: 'X' } })).status(), code).toBe(404);
    }
    await api.dispose();
  });
});
