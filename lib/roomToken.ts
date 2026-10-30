import 'server-only';
import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { roomLogger } from '@/lib/logger';

const SECRET = process.env.ROOM_TOKEN_SECRET ?? '';
// openssl rand -base64 32 gives 44 characters. A short secret can be guessed
// and then every room cookie forged: in production rooms then refuse to work
// (checked on use, so a build without the secret still runs).
const WEAK = SECRET.length > 0 && SECRET.length < 32;
if (WEAK) {
  roomLogger.error('ROOM_TOKEN_SECRET is shorter than 32 characters: generate one with `openssl rand -base64 32`');
}
const REFUSE = !SECRET || (WEAK && process.env.NODE_ENV === 'production');
const COOKIE_PREFIX = 'scrum_rt_';
const MAX_AGE_SECONDS = 2 * 60 * 60; // 2 hours
const RENEW_AFTER_MS = 30 * 60 * 1000;

/** The cookie goes only to that room's API, not with every page and asset. */
function cookieOptions(roomId: string) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: MAX_AGE_SECONDS,
    path: `/api/rooms/${roomId}`,
  };
}

function sign(userId: string, roomId: string): string {
  if (REFUSE) throw new Error('ROOM_TOKEN_SECRET is not set or too short');
  const expiry = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${userId}:${roomId}:${expiry}`;
  const sig = createHmac('sha256', SECRET).update(payload).digest('base64url');
  return `${Buffer.from(payload).toString('base64url')}.${sig}`;
}

/** A valid token's user and expiry (epoch ms), or null. */
function read(token: string, roomId: string): { userId: string; expiry: number } | null {
  if (REFUSE) return null;
  try {
    const [payloadB64, sig] = token.split('.');
    if (!payloadB64 || !sig) return null;
    const payload = Buffer.from(payloadB64, 'base64url').toString();
    const expectedSig = createHmac('sha256', SECRET).update(payload).digest('base64url');
    const sigBuf = Buffer.from(sig, 'base64url');
    const expBuf = Buffer.from(expectedSig, 'base64url');
    if (sigBuf.length !== expBuf.length) return null;
    if (!timingSafeEqual(sigBuf, expBuf)) return null;
    const parts = payload.split(':');
    if (parts.length !== 3) return null;
    const [userId, tokenRoomId, expiryStr] = parts;
    if (tokenRoomId !== roomId) return null;
    const expiry = Number(expiryStr);
    if (!Number.isFinite(expiry) || expiry < Date.now()) return null;
    return { userId, expiry };
  } catch {
    return null;
  }
}

/** Issue a fresh cookie for this user in this room. Call on join. */
export async function issueRoomToken(roomId: string, userId: string): Promise<void> {
  const token = sign(userId, roomId);
  const store = await cookies();
  store.set(COOKIE_PREFIX + roomId, token, cookieOptions(roomId));
}

/** Verify cookie and return userId. Refreshes cookie on success (sliding expiration). */
export async function getRoomUserId(roomId: string): Promise<string | null> {
  const store = await cookies();
  const token = store.get(COOKIE_PREFIX + roomId)?.value;
  if (!token) return null;
  const valid = read(token, roomId);
  if (!valid) return null;
  // Sliding expiration, once the cookie has aged half an hour: not a new
  // signature and Set-Cookie on every vote and stream.
  if (valid.expiry - Date.now() < MAX_AGE_SECONDS * 1000 - RENEW_AFTER_MS) {
    store.set(COOKIE_PREFIX + roomId, sign(valid.userId, roomId), cookieOptions(roomId));
  }
  return valid.userId;
}

