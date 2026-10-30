import { expect, test, type APIRequestContext, type PlaywrightWorkerArgs } from '@playwright/test';
import { randomBytes, randomUUID } from 'node:crypto';
import { randomIp } from './helpers';

/** An API client with its own client address (limits are per address). */
async function client(playwright: PlaywrightWorkerArgs['playwright'], baseURL: string): Promise<APIRequestContext> {
  return playwright.request.newContext({ baseURL, extraHTTPHeaders: { 'X-Forwarded-For': randomIp() } });
}

/** A room its host keeps; returns the host's client, the room code and the owner key. */
async function keptRoom(playwright: PlaywrightWorkerArgs['playwright'], baseURL: string) {
  const host = await client(playwright, baseURL);
  const hostId = randomUUID();
  const room = await (await host.post('/api/rooms', { data: { name: 'Kept', creatorId: hostId, creatorName: 'Owner' } })).json();
  const kept = await (await host.post(`/api/rooms/${room.id}/keep`, { data: { kept: true } })).json();
  expect(kept.ownerKey).toMatch(/^[A-Za-z0-9_-]{43}$/);
  return { host, hostId, code: room.id as string, key: kept.ownerKey as string };
}

test.describe('hardening', () => {
  test('the join answer says whether the owner key was the room\'s', async ({ playwright, baseURL }) => {
    const { host, code, key } = await keptRoom(playwright, baseURL!);
    const other = await client(playwright, baseURL!);
    const wrong = await (await other.post(`/api/rooms/${code}/join`, { data: { userId: randomUUID(), name: 'Guess', ownerKey: 'A'.repeat(43) } })).json();
    expect(wrong.ownerKeyValid).toBe(false);
    const laptop = await client(playwright, baseURL!);
    const right = await (await laptop.post(`/api/rooms/${code}/join`, { data: { userId: randomUUID(), name: 'Owner again', ownerKey: key } })).json();
    expect(right.ownerKeyValid).toBe(true);
    // Without a key, nothing is said about one.
    const plain = await (await other.post(`/api/rooms/${code}/join`, { data: { userId: randomUUID(), name: 'Plain' } })).json();
    expect(plain.ownerKeyValid).toBeUndefined();
    await Promise.all([host.dispose(), other.dispose(), laptop.dispose()]);
  });

  test('an issue link set while the owner was away is put back when the owner arrives', async ({ playwright, baseURL }) => {
    const { host, code, key } = await keptRoom(playwright, baseURL!);
    expect((await host.post(`/api/rooms/${code}/settings`, { data: { issueUrl: 'https://tracker.example/browse/{key}' } })).ok()).toBe(true);
    // The owner hands the host role to someone without the key, who changes the link.
    const guest = await client(playwright, baseURL!);
    const guestId = randomUUID();
    expect((await guest.post(`/api/rooms/${code}/join`, { data: { userId: guestId, name: 'Guest' } })).ok()).toBe(true);
    expect((await host.post(`/api/rooms/${code}/host`, { data: { targetId: guestId } })).ok()).toBe(true);
    expect((await guest.post(`/api/rooms/${code}/settings`, { data: { issueUrl: 'https://phish.example/{key}' } })).ok()).toBe(true);
    // The owner comes back on another device: the kept link is back.
    const laptop = await client(playwright, baseURL!);
    const joined = await (await laptop.post(`/api/rooms/${code}/join`, { data: { userId: randomUUID(), name: 'Owner', ownerKey: key } })).json();
    expect(joined.settings.issueUrl).toBe('https://tracker.example/browse/{key}');
    await Promise.all([host.dispose(), guest.dispose(), laptop.dispose()]);
  });

  test('a burst of event streams stays within the per-person limit', async ({ playwright, baseURL }) => {
    const api = await client(playwright, baseURL!);
    const creatorId = randomUUID();
    const room = await (await api.post('/api/rooms', { data: { name: 'Streams', creatorId, creatorName: 'Host' } })).json();
    const cookie = (await api.storageState()).cookies.find(c => c.name === `scrum_rt_${room.id}`);
    expect(cookie).toBeTruthy();
    const ip = randomIp();
    const controller = new AbortController();
    // Ten at once, from one person: at most five may stay open.
    const firsts = await Promise.all(Array.from({ length: 10 }, async () => {
      const res = await fetch(new URL(`/api/rooms/${room.id}/events`, baseURL), {
        headers: { Cookie: `${cookie!.name}=${cookie!.value}`, 'X-Forwarded-For': ip },
        signal: controller.signal,
      });
      if (!res.ok || !res.body) return `status ${res.status}`;
      const reader = res.body.getReader();
      const { value } = await reader.read();
      return new TextDecoder().decode(value);
    }));
    controller.abort();
    const open = firsts.filter(f => f.startsWith('data:')).length;
    expect(open).toBeGreaterThan(0);
    expect(open).toBeLessThanOrEqual(5);
    await api.dispose();
  });

  test('room page lookups are limited per address', async ({ playwright, baseURL }) => {
    test.setTimeout(60_000);
    const api = await client(playwright, baseURL!);
    const creatorId = randomUUID();
    const room = await (await api.post('/api/rooms', { data: { name: 'Lookups', creatorId, creatorName: 'Host' } })).json();
    const prober = await client(playwright, baseURL!);
    // 120 a minute; after that every code, real or not, looks unknown.
    for (let i = 0; i < 120; i++) await prober.get(`/room/ZZZZZZZZ`, { maxRedirects: 0 });
    expect((await prober.get(`/room/${room.id}`)).status()).toBe(404);
    // Another address still finds it.
    expect((await api.get(`/room/${room.id}`)).status()).toBe(200);
    await Promise.all([api.dispose(), prober.dispose()]);
  });

  test('guessing room codes stops the guesser, not a team behind the same address', async ({ playwright, baseURL }) => {
    test.setTimeout(60_000);
    const host = await client(playwright, baseURL!);
    const room = await (await host.post('/api/rooms', { data: { name: 'Guessed', creatorId: randomUUID(), creatorName: 'Host' } })).json();
    const office = randomIp();
    const member = await at(playwright, baseURL!, office);
    expect((await member.post(`/api/rooms/${room.id}/join`, { data: { userId: randomUUID(), name: 'Member' } })).ok()).toBe(true);
    // A team opening its room, and one code mistyped again and again, are no guessing.
    const team = await at(playwright, baseURL!, office);
    for (let i = 0; i < 30; i++) expect((await team.get(`/api/rooms/${room.id}?summary=1`)).status()).toBe(200);
    for (let i = 0; i < 30; i++) expect((await team.get('/api/rooms/ZZZZZZZZ?summary=1')).status()).toBe(404);
    // 30 different unknown codes: after that nothing is found from there, the real room neither.
    for (let i = 0; i < 28; i++) expect((await team.get(`/api/rooms/${randomCode()}`)).status()).toBe(404);
    expect((await team.get(`/api/rooms/${room.id}`)).status()).toBe(200);
    expect((await team.post(`/api/rooms/${randomCode()}/join`, { data: { userId: randomUUID(), name: 'Typo' } })).status()).toBe(404);
    for (const res of [await team.get(`/api/rooms/${room.id}`), await team.post(`/api/rooms/${room.id}/join`, { data: { userId: randomUUID(), name: 'Late' } })]) {
      expect(res.status()).toBe(429);
      expect((await res.json()).code).toBe('rate_limited');
      expect(Number(res.headers()['retry-after'])).toBeGreaterThan(0);
    }
    // Who is in the room already carries on (the room cookie shows the code wasn't guessed).
    expect((await member.get(`/api/rooms/${room.id}`)).status()).toBe(200);
    expect((await member.post(`/api/rooms/${room.id}/vote`, { data: { card: '5' } })).ok()).toBe(true);
    expect((await host.get(`/api/rooms/${room.id}?summary=1`)).status()).toBe(200);
    await Promise.all([host.dispose(), member.dispose(), team.dispose()]);
  });

  test('guessing room codes from many addresses of one network stops the network', async ({ playwright, baseURL }) => {
    test.setTimeout(60_000);
    const host = await client(playwright, baseURL!);
    const room = await (await host.post('/api/rooms', { data: { name: 'Guessed', creatorId: randomUUID(), creatorName: 'Host' } })).json();
    const [a, b] = randomBytes(2);
    const net = `10.${a}.${b}`;
    // 25 codes from each of four addresses: none over its own limit, the /24 at its 100.
    for (let n = 1; n <= 4; n++) {
      const prober = await at(playwright, baseURL!, `${net}.${n}`);
      for (let i = 0; i < 25; i++) expect((await prober.get(`/api/rooms/${randomCode()}?summary=1`)).status()).toBe(404);
      await prober.dispose();
    }
    const neighbour = await at(playwright, baseURL!, `${net}.200`);
    expect((await neighbour.get(`/api/rooms/${room.id}?summary=1`)).status()).toBe(429);
    expect((await host.get(`/api/rooms/${room.id}?summary=1`)).status()).toBe(200);
    await Promise.all([host.dispose(), neighbour.dispose()]);
  });
});

/** An API client at the client address `ip`. */
function at(playwright: PlaywrightWorkerArgs['playwright'], baseURL: string, ip: string): Promise<APIRequestContext> {
  return playwright.request.newContext({ baseURL, extraHTTPHeaders: { 'X-Forwarded-For': ip } });
}

/** A room code nobody is likely to have (the alphabet of lib/store.ts). */
function randomCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from(randomBytes(8), x => alphabet[x % alphabet.length]).join('');
}
