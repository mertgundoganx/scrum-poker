const STORAGE_KEY = 'scrumPoker_userId';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * This browser's participant id: a random UUID made once and kept in local
 * storage. Anything else stored there (an account id from before accounts
 * were removed) is replaced.
 */
export function browserId(): string {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && UUID.test(stored)) return stored;
  return newBrowserId();
}

/** A fresh id, when the room says the current one is taken. */
export function newBrowserId(): string {
  const id = crypto.randomUUID();
  localStorage.setItem(STORAGE_KEY, id);
  return id;
}
