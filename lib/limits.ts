/**
 * Every limit on what people type or send, in one place: the server enforces
 * them (lib/store.ts, the room API, proxy.ts) and the pages use the same
 * numbers for their fields. No imports, so the browser can use it too.
 *
 * Text lengths count code points of the cleaned text (see cutText in
 * lib/deck.ts: normalized, invisible characters removed, one line). A field's
 * maxLength counts UTF-16 units, never fewer than code points, so whatever a
 * field accepts fits on the server. Longer text from elsewhere is cut, never
 * inside a character (an emoji, a letter with its accents).
 */

/** A display name. */
export const MAX_NAME = 16;
/** A room's name. */
export const MAX_ROOM_NAME = 40;
/** A story: the current one, queued, imported or renamed. */
export const MAX_STORY = 140;
/** A chat message. */
export const MAX_CHAT = 300;
/** The issue link pattern (an https address with {key} in it). */
export const MAX_ISSUE_URL = 200;

/** A custom deck: this many different cards at least and at most (more are dropped). */
export const MIN_CUSTOM_CARDS = 2;
export const MAX_CUSTOM_CARDS = 20;
/** Characters on one custom card. */
export const MAX_CARD = 4;

/** Stories waiting in the queue (more are dropped). */
export const MAX_QUEUE = 100;
/** People in a room. */
export const MAX_PARTICIPANTS = 50;
/** Characters in a room code. */
export const ROOM_CODE_LENGTH = 8;
/** The largest request body any API route takes (a pasted list of 100 stories fits). */
export const MAX_BODY_BYTES = 128 * 1024;

/** The countdowns the timer offers; 0 (no countdown) counts up. */
export const TIMER_LIMITS_MS = [60_000, 120_000, 180_000, 300_000, 600_000] as const;
/** The emoji people can throw. */
export const REACTIONS = ['👍', '🎉', '🤔', '⏰', '☕', '😂'] as const;
/** The avatars to pick from; anything else is stored as none (the name's initial). */
export const AVATARS = ['🐶', '🐱', '🐻', '🐼', '🦊', '🐯', '🦁', '🐸', '🦋', '🦄', '🦉', '🐙', '🦅', '🦜', '⭐'] as const;
