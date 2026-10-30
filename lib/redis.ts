import 'server-only';
import Redis from 'ioredis';
import { dbLogger } from '@/lib/logger';

declare global {
  var __redis: Redis | null | undefined;
}

function createRedis(): Redis | null {
  const url = process.env.REDIS_URL;
  if (!url) {
    dbLogger.warn('REDIS_URL not set — room persistence disabled');
    return null;
  }
  const client = new Redis(url, {
    maxRetriesPerRequest: 3,
    // Never give up: a Redis restart (a redeploy) can take longer than a few
    // retries, and a client that stopped retrying stays down until the app
    // itself restarts.
    retryStrategy(times) {
      return Math.min(times * 200, 5000);
    },
  });
  client.on('connect', () => dbLogger.info('Redis connected'));
  client.on('error', (err) => dbLogger.error({ err: err.message }, 'Redis error'));
  return client;
}

export const redis: Redis | null = global.__redis ?? (global.__redis = createRedis());

const ROOM_PREFIX = 'room:';
const ROOM_TTL = 60 * 60; // 1 hour

export async function persistRoom(roomId: string, data: unknown): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(ROOM_PREFIX + roomId, JSON.stringify(data), 'EX', ROOM_TTL);
  } catch (err) {
    dbLogger.error({ err, roomId }, 'Failed to persist room to Redis');
  }
}

export async function deleteRoom(roomId: string): Promise<void> {
  if (!redis) return;
  try {
    await redis.del(ROOM_PREFIX + roomId);
  } catch { /* ignore */ }
}

/** Every stored room. Throws when Redis can't be read, so the caller can retry. */
export async function loadAllRooms(): Promise<Map<string, unknown>> {
  const result = new Map<string, unknown>();
  if (!redis) return result;
  try {
    // SCAN instead of KEYS — KEYS blocks Redis on large keyspaces
    const keys: string[] = [];
    let cursor = '0';
    do {
      const [next, batch] = await redis.scan(cursor, 'MATCH', ROOM_PREFIX + '*', 'COUNT', 100);
      cursor = next;
      keys.push(...batch);
    } while (cursor !== '0');
    if (!keys.length) return result;
    const pipeline = redis.pipeline();
    for (const key of keys) pipeline.get(key);
    const values = await pipeline.exec();
    if (!values) return result;
    for (let i = 0; i < keys.length; i++) {
      const val = values[i]?.[1] as string | null;
      if (!val) continue;
      try {
        result.set(keys[i].slice(ROOM_PREFIX.length), JSON.parse(val));
      } catch {
        dbLogger.warn({ key: keys[i] }, 'Skipping unreadable room in Redis');
      }
    }
    dbLogger.info({ count: result.size }, 'Rooms loaded from Redis');
  } catch (err) {
    dbLogger.error({ err }, 'Failed to load rooms from Redis');
    throw err;
  }
  return result;
}

// Rooms and their chat expire an hour after the last change; a room in use
// but unchanged (a long discussion) is kept alive from its open streams.
const touched = new Map<string, number>();
const TOUCH_EVERY_MS = 5 * 60 * 1000;

export async function touchRoom(roomId: string): Promise<void> {
  if (!redis) return;
  const now = Date.now();
  if (now - (touched.get(roomId) ?? 0) < TOUCH_EVERY_MS) return;
  touched.set(roomId, now);
  if (touched.size > 10_000) touched.clear();
  try {
    await redis.pipeline().expire(ROOM_PREFIX + roomId, ROOM_TTL).expire(CHAT_PREFIX + roomId, ROOM_TTL).exec();
  } catch { /* the next keepalive tries again */ }
}

const CHAT_PREFIX = 'chat:';

export async function persistChat(roomId: string, messages: unknown[]): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(CHAT_PREFIX + roomId, JSON.stringify(messages), 'EX', ROOM_TTL);
  } catch { /* ignore */ }
}

export async function loadChat(roomId: string): Promise<unknown[] | null> {
  if (!redis) return null;
  try {
    const data = await redis.get(CHAT_PREFIX + roomId);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function deleteChat(roomId: string): Promise<void> {
  if (!redis) return;
  try {
    await redis.del(CHAT_PREFIX + roomId);
  } catch { /* ignore */ }
}
