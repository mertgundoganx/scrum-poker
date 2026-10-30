import 'server-only';
import { networkKey } from '@/lib/clientIp';

/*
 * Sliding-window rate limits, kept in this process's memory. The app runs as
 * a single process (rooms live in its memory too), so these counters see all
 * of its traffic. They are deliberately not in Redis: there an attacker's
 * traffic would grow the stored windows, and a full Redis evicting them would
 * switch the limits off exactly when they matter. A deploy starts them afresh.
 */

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
}

export interface Limit {
  key: string;
  max: number;
  windowMs: number;
}

declare global {
  var __scrumRateLimits: Map<string, { hits: number[]; windowMs: number }> | undefined;
}

const windows: Map<string, { hits: number[]; windowMs: number }> = (global.__scrumRateLimits ??= new Map());
const MAX_KEYS = 50_000;
let lastSweep = Date.now();

function sweep(now: number): void {
  lastSweep = now;
  for (const [key, { hits, windowMs }] of windows) {
    // Each key keeps its own window (a minute for most, an hour for keeping rooms).
    if (!hits.length || hits[hits.length - 1] < now - windowMs) windows.delete(key);
  }
  // Still too many (a flood of made-up keys): drop the oldest. Clearing it all
  // would reset everyone's limits, which is what such a flood would be after.
  if (windows.size > MAX_KEYS) {
    let excess = windows.size - MAX_KEYS * 0.9;
    for (const key of windows.keys()) {
      if (excess-- <= 0) break;
      windows.delete(key);
    }
  }
}

/** Count one request against `limit`. */
function hit({ key, max, windowMs }: Limit, now: number): RateLimitResult {
  const cutoff = now - windowMs;
  const hits = (windows.get(key)?.hits ?? []).filter(t => t > cutoff);
  // A refused request isn't recorded: a flood can't grow the window.
  const allowed = hits.length < max;
  if (allowed) hits.push(now);
  // Re-inserted, so the key order stays oldest-used first.
  windows.delete(key);
  if (hits.length) windows.set(key, { hits, windowMs });
  return {
    allowed,
    remaining: Math.max(0, max - hits.length),
    resetMs: allowed ? windowMs : Math.max(1000, hits[0] + windowMs - now),
  };
}

/** The time now, after a sweep when one is due. */
function sweptNow(): number {
  const now = Date.now();
  if (now - lastSweep > 30_000 || windows.size > MAX_KEYS) sweep(now);
  return now;
}

/**
 * Check several limits together. Each request counts against every limit that
 * allows it; the first one exceeded is returned, or null when all allow it.
 */
export async function rateLimitAll(limits: Limit[]): Promise<RateLimitResult | null> {
  const now = sweptNow();
  let over: RateLimitResult | null = null;
  for (const limit of limits) {
    const result = hit(limit, now);
    if (!result.allowed && !over) over = result;
  }
  return over;
}

export async function rateLimit(key: string, maxRequests: number, windowMs: number): Promise<RateLimitResult> {
  const over = await rateLimitAll([{ key, max: maxRequests, windowMs }]);
  return over ?? { allowed: true, remaining: maxRequests, resetMs: windowMs };
}

/** Whether `limit` is used up, without counting a request against it. */
function peek({ key, max, windowMs }: Limit, now: number): RateLimitResult | null {
  const hits = windows.get(key)?.hits.filter(t => t > now - windowMs) ?? [];
  if (hits.length < max) return null;
  return { allowed: false, remaining: 0, resetMs: Math.max(1000, hits[0] + windowMs - now) };
}

/*
 * Guessing room codes. A code is found only by trying it, so a lookup of a
 * code that has no room (a miss) counts against the address and its network
 * (an IPv6 customer has thousands of /64s). Past the limit every lookup from
 * there, of a real room too, is refused until the window moves on. A code
 * counts once a window: a page asking again about a room that has gone (the
 * home page's recent rooms, a tab left open) is no guess. Finding a room never
 * counts, so a whole office behind one address can open its rooms.
 */
const MISS_WINDOW_MS = 10 * 60_000;
const MISS_LIMITS = [
  { scope: (ip: string) => `addr:${ip}`, max: 30 },
  { scope: (ip: string) => `net:${networkKey(ip)}`, max: 100 },
];

/** A lookup from `ip` of the room `code` found none. */
export function noteRoomMiss(ip: string, code: string): void {
  const now = sweptNow();
  for (const { scope, max } of MISS_LIMITS) {
    const key = scope(ip);
    if (hit({ key: `roomMissCode:${key}:${code}`, max: 1, windowMs: MISS_WINDOW_MS }, now).allowed) {
      hit({ key: `roomMiss:${key}`, max, windowMs: MISS_WINDOW_MS }, now);
    }
  }
}

/** The limit `ip` (or its network) used up by missing too many codes lately, to answer with; else null. */
export function roomLookupBlocked(ip: string): RateLimitResult | null {
  const now = Date.now();
  for (const { scope, max } of MISS_LIMITS) {
    const over = peek({ key: `roomMiss:${scope(ip)}`, max, windowMs: MISS_WINDOW_MS }, now);
    if (over) return over;
  }
  return null;
}

/** The 429 answer, with when to try again. */
export function rateLimitResponse(result: RateLimitResult): Response {
  return Response.json(
    { error: 'Too many requests', code: 'rate_limited' },
    {
      status: 429,
      headers: {
        'Retry-After': String(Math.ceil(result.resetMs / 1000)),
        'X-RateLimit-Remaining': String(result.remaining),
      },
    },
  );
}
