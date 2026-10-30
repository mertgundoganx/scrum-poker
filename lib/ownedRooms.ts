/*
 * Kept rooms this browser holds the owner key of, in local storage. There are
 * no accounts: the key is what makes someone a kept room's owner. It reaches
 * other devices through the owner link, /room/CODE#owner=KEY; the fragment
 * never leaves the browser, so the key stays out of every server log.
 *
 * Every storage access is guarded: private modes and full disks throw.
 */

export interface OwnedRoom { id: string; name: string; key: string }

const STORAGE_KEY = 'scrumPoker_ownedRooms';
const MAX_OWNED_ROOMS = 50;
const OWNER_KEY = /^[A-Za-z0-9_-]{43}$/;

function isOwnedRoom(r: unknown): r is OwnedRoom {
  const o = r as OwnedRoom;
  return typeof o?.id === 'string' && typeof o.name === 'string' && typeof o.key === 'string' && OWNER_KEY.test(o.key);
}

/** Most recently kept or opened first. */
export function ownedRooms(): OwnedRoom[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(stored) ? stored.filter(isOwnedRoom) : [];
  } catch {
    return [];
  }
}

function store(rooms: OwnedRoom[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms.slice(0, MAX_OWNED_ROOMS)));
  } catch { /* storage unavailable */ }
}

export function ownerKeyFor(id: string): string | null {
  return ownedRooms().find(r => r.id === id)?.key ?? null;
}

/** Remember the room (or move it first, with its current name). */
export function rememberOwnedRoom(room: OwnedRoom): void {
  if (!OWNER_KEY.test(room.key)) return;
  store([room, ...ownedRooms().filter(r => r.id !== room.id)]);
}

export function forgetOwnedRoom(id: string): void {
  const rooms = ownedRooms();
  if (rooms.some(r => r.id === id)) store(rooms.filter(r => r.id !== id));
}

export function ownerLink(id: string, key: string): string {
  return `${window.location.origin}/room/${id}#owner=${key}`;
}

/**
 * Opened through the owner link: its key, as a candidate only. The join
 * answers whether it is this room's key, and only then does the page remember
 * it, so a forged link can't replace the key this browser holds. The room
 * page's first script already took it out of the address bar (so it isn't
 * shared on with the ordinary room link) and left it in sessionStorage; a page
 * that didn't run that script still has it in the fragment.
 */
export function takeOwnerKeyFromUrl(id: string): string | null {
  try {
    let key = new URLSearchParams(window.location.hash.slice(1)).get('owner');
    if (key) window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
    const pending = sessionStorage.getItem('scrumPoker_ownerKey');
    if (pending) {
      sessionStorage.removeItem('scrumPoker_ownerKey');
      const [room, pendingKey] = pending.split(' ');
      if (room === id) key ??= pendingKey;
    }
    return key && OWNER_KEY.test(key) ? key : null;
  } catch {
    return null; // storage or history unavailable
  }
}
