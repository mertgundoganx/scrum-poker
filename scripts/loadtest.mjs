// A load test: many rooms full of people voting, revealing and starting new
// rounds, each with a live event stream, against a running server. No
// dependencies (Node 24's fetch).
//
//   node scripts/loadtest.mjs [--url http://localhost:3000] [--rooms 50]
//                             [--people 10] [--seconds 60] [--ramp 10]
//
// Every simulated person has their own client address (X-Forwarded-For), as
// the server limits per address; run it against a test server, never against
// production. Prints action latency percentiles, errors and the events the
// streams received.

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, arg, i, all) => {
  if (arg.startsWith('--')) pairs.push([arg.slice(2), all[i + 1]]);
  return pairs;
}, []));
const BASE = args.url ?? 'http://localhost:3000';
const ROOMS = Number(args.rooms ?? 50);
const PEOPLE = Number(args.people ?? 10);
const SECONDS = Number(args.seconds ?? 60);
const CARDS = ['1', '2', '3', '5', '8', '13'];
const RAMP_MS = Number(args.ramp ?? 10) * 1000;

const latencies = [];
const errors = new Map();
let events = 0;
let eventBytes = 0;

function randomIp() {
  const b = () => Math.floor(Math.random() * 256);
  return `10.${b()}.${b()}.${b()}`;
}

function noteError(what) {
  errors.set(what, (errors.get(what) ?? 0) + 1);
}

/** One simulated person: their address, id and room cookie. */
function person() {
  return { ip: randomIp(), id: crypto.randomUUID(), cookie: '' };
}

async function call(p, path, body, method = 'POST') {
  const started = performance.now();
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': p.ip, ...(p.cookie ? { Cookie: p.cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  }).catch(() => null);
  latencies.push(performance.now() - started);
  if (!res) { noteError(`${path.split('/').at(-1)}: network`); return null; }
  const set = res.headers.getSetCookie?.() ?? [];
  const room = set.find(c => c.startsWith('scrum_rt_'));
  if (room) p.cookie = room.split(';')[0];
  if (!res.ok) noteError(`${path.split('/').at(-1)}: ${res.status}`);
  return res.ok ? res.json().catch(() => ({})) : null;
}

/** Read a person's event stream until `signal` aborts. */
async function listen(p, code, signal) {
  let failure = 'network';
  const res = await fetch(`${BASE}/api/rooms/${code}/events`, {
    headers: { 'X-Forwarded-For': p.ip, Cookie: p.cookie },
    signal,
  }).catch(err => { failure = err.cause?.code ?? err.name ?? 'network'; return null; });
  if (!res?.ok || !res.body) { noteError(`events: ${res?.status ?? failure}`); return; }
  const reader = res.body.getReader();
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      eventBytes += value.length;
      for (const byte of value) if (byte === 10) events++; // counts lines; a rough event rate
    }
  } catch { /* aborted */ }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function runRoom(index, signal) {
  // People arrive over the first seconds, as they do: a test that opens every
  // connection in the same millisecond measures the operating system's accept
  // queue, not the server.
  await sleep(Math.random() * RAMP_MS);
  const host = person();
  const room = await call(host, '/api/rooms', { name: `Load ${index}`, creatorId: host.id, creatorName: 'Host', deckType: 'scrum' });
  if (!room?.id) return;
  const code = room.id;
  const people = [host];
  for (let i = 1; i < PEOPLE; i++) {
    const p = person();
    if (await call(p, `/api/rooms/${code}/join`, { userId: p.id, name: `P${i}` })) people.push(p);
  }
  for (const p of people) void sleep(Math.random() * 2000).then(() => listen(p, code, signal));
  await sleep(2500);

  while (!signal.aborted) {
    // Everyone votes over a few seconds, the host reveals, then starts the next round.
    await Promise.all(people.map(async p => {
      await sleep(Math.random() * 3000);
      if (!signal.aborted) await call(p, `/api/rooms/${code}/vote`, { card: CARDS[Math.floor(Math.random() * CARDS.length)] });
    }));
    if (signal.aborted) break;
    await call(host, `/api/rooms/${code}/reveal`, {});
    await sleep(1500);
    await call(host, `/api/rooms/${code}/reset`, {});
    await sleep(500);
  }
}

function percentile(sorted, p) {
  return sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))] : 0;
}

const controller = new AbortController();
console.log(`${ROOMS} rooms × ${PEOPLE} people for ${SECONDS}s against ${BASE}`);
const started = Date.now();
const rooms = Array.from({ length: ROOMS }, (_, i) => runRoom(i, controller.signal));
await sleep(SECONDS * 1000);
controller.abort();
await Promise.allSettled(rooms);

const sorted = latencies.sort((a, b) => a - b);
const seconds = (Date.now() - started) / 1000;
console.log(`requests: ${sorted.length} (${(sorted.length / seconds).toFixed(0)}/s)`);
console.log(`latency ms: p50 ${percentile(sorted, 0.5).toFixed(1)}, p95 ${percentile(sorted, 0.95).toFixed(1)}, p99 ${percentile(sorted, 0.99).toFixed(1)}, max ${(sorted.at(-1) ?? 0).toFixed(1)}`);
console.log(`stream lines received: ${events} (${(eventBytes / 1024 / 1024).toFixed(1)} MB)`);
console.log(errors.size ? `errors: ${[...errors].map(([k, n]) => `${k} ×${n}`).join(', ')}` : 'errors: none');
