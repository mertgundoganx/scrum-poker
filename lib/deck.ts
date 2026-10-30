/**
 * Decks and the text rules for anything people type. No server imports: the
 * room page uses this in the browser, and lib/store.ts on the server.
 */

import { MAX_CARD, MAX_CUSTOM_CARDS, MAX_ISSUE_URL } from '@/lib/limits';

export { MAX_CUSTOM_CARDS } from '@/lib/limits';

export type DeckType = 'scrum' | 'fibonacci' | 'tshirt' | 'powers' | 'custom';

/** Every deck, in the order the pickers show them. */
export const DECK_TYPES: readonly DeckType[] = ['scrum', 'fibonacci', 'tshirt', 'powers', 'custom'];

export function isDeckType(value: unknown): value is DeckType {
  return typeof value === 'string' && (DECK_TYPES as readonly string[]).includes(value);
}

export const DECK_CARDS: Record<Exclude<DeckType, 'custom'>, string[]> = {
  // The modified Fibonacci most teams know as the planning poker deck.
  scrum:       ['0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', '☕'],
  fibonacci:   ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '?', '☕'],
  tshirt:      ['Z', 'T', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '?', '☕'],
  powers:      ['0', '1', '2', '4', '8', '16', '32', '64', '128', '?', '☕'],
};

/** A card as a number, for averages and sums (½ is 0.5); NaN for ?, ☕ and T-shirt sizes. */
export function cardValue(card: string): number {
  return card === '½' ? 0.5 : Number(card);
}

/** The active card list for a room. */
export function getCards(room: { deckType: DeckType; customCards: string[] | null }): string[] {
  if (room.deckType === 'custom' && room.customCards) return room.customCards;
  return DECK_CARDS[room.deckType as Exclude<DeckType, 'custom'>] ?? DECK_CARDS.fibonacci;
}

// Control characters, bidi overrides and isolates, invisible separators and
// the BOM: they let one name pass for another ("Alice" with a hidden mark, or
// text that renders reversed). So do the letters that render as nothing (the
// Hangul fillers, the blank Braille pattern, the soft hyphen). ZWJ (U+200D)
// and VS16 (U+FE0F) stay, they hold emoji together, and so does ZWNJ
// (U+200C), which Persian and Arabic use. Tabs and line breaks become spaces.
const INVISIBLE = /[\u0000-\u0008\u000E-\u001F\u007F-\u009F\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180E\u200B\u200E\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\u2800\u3164\uFEFF\uFFA0\uFFF9-\uFFFB]/g;
// Half of a surrogate pair: not a character at all.
const LONE_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;
// Tag characters carry text nobody sees; the flags of England, Scotland and
// Wales are the one thing made of them.
const TAGS = /(\u{1F3F4}[\u{E0020}-\u{E007E}]+\u{E007F})|[\u{E0000}-\u{E007F}]/gu;
// ZWJ and ZWNJ next to a Latin, Greek or Cyrillic letter (which never join)
// or at either end do nothing but make "Alice" a different name from "Alice".
const LOOSE_JOINERS = /(?<=^|[\p{sc=Latin}\p{sc=Greek}\p{sc=Cyrillic}\u0000-\u007F])[\u200C\u200D]+|[\u200C\u200D]+(?=[\p{sc=Latin}\p{sc=Greek}\p{sc=Cyrillic}\u0000-\u007F]|$)/gu;
// So does a run of variation selectors; a character takes one.
const SELECTORS = /([\uFE00-\uFE0F\u{E0100}-\u{E01EF}])[\uFE00-\uFE0F\u{E0100}-\u{E01EF}]+/gu;
// Selectors without a character to change.
const ONLY_SELECTORS = /^[\uFE00-\uFE0F\u{E0100}-\u{E01EF}]*$/u;
// Accents stacked without end ("Zalgo") spill over the lines around them; no
// script needs more than a few on one letter.
const STACKED_MARKS = /(\p{M}{6})\p{M}+/gu;
const graphemes = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter() : null;

/** The start of `text` that fits in `max` code points, never half a character. */
function cutPoints(text: string, max: number): string {
  const points = Array.from(text);
  if (points.length <= max) return text;
  if (!graphemes) return points.slice(0, max).join('');
  let out = '';
  let count = 0;
  for (const { segment } of graphemes.segment(text)) {
    count += Array.from(segment).length;
    if (count > max) break;
    out += segment;
  }
  return out;
}

/**
 * User text as stored: NFC-normalized (the same name typed on two systems is
 * the same string), without invisible or direction-changing characters, on
 * one line with single spaces, trimmed and cut to `max` code points (never
 * inside an emoji or an accented letter). Empty when nothing visible is left.
 */
export function cutText(text: string, max: number): string {
  // Only the start can survive the cut, so a huge input costs no more than a short one.
  const head = text.length > max * 4 ? text.slice(0, max * 4) : text;
  const clean = head
    .replace(LONE_SURROGATE, '')
    .normalize('NFC')
    .replace(INVISIBLE, '')
    .replace(TAGS, (_, flag: string | undefined) => flag ?? '')
    .replace(LOOSE_JOINERS, '')
    .replace(SELECTORS, '$1')
    .replace(STACKED_MARKS, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  const cut = cutPoints(clean, max).trim();
  return ONLY_SELECTORS.test(cut) ? '' : cut;
}

// What people type between custom cards: the comma of their keyboard
// (Latin, full-width, ideographic, Arabic) or a semicolon.
const CARD_SEPARATOR = /[,，、،;]/;

/** The cards typed into a custom deck field (not yet cleaned; see cleanCustomCards). */
export function splitCardInput(text: string): string[] {
  return text.split(CARD_SEPARATOR).map(c => Array.from(c.trim()).slice(0, MAX_CARD).join('')).filter(Boolean);
}

/** The field's text as typed, with each card cut to MAX_CARD characters. */
export function limitCardInput(text: string): string {
  return text.replace(/[^,，、،;]+/g, piece => {
    const lead = piece.length - piece.trimStart().length;
    const card = Array.from(piece.trim());
    return card.length > MAX_CARD ? piece.slice(0, lead) + card.slice(0, MAX_CARD).join('') : piece;
  });
}

// What everyone else sees for a vote before the reveal (lib/store.ts): never a card.
const HIDDEN_VOTE = '✓';

/** Cleaned (cutText) to MAX_CARD characters, without blanks and duplicates; at most MAX_CUSTOM_CARDS. */
export function cleanCustomCards(cards: unknown[]): string[] {
  const out = new Set<string>();
  for (const c of cards) {
    if (out.size >= MAX_CUSTOM_CARDS) break;
    if (typeof c !== 'string') continue;
    const card = cutText(c, MAX_CARD);
    if (card && card !== HIDDEN_VOTE) out.add(card);
  }
  return [...out];
}

// No spaces, control, invisible or direction-changing characters anywhere in it.
const URL_UNSAFE = /[\p{C}\p{Z}]/u;
// The address up to {key} already has its host and the start of a path, query or fragment.
const AUTHORITY_DONE = /^https:\/\/[^/?#]+[/?#]/i;

/**
 * A valid issue link pattern, '' for none, or null: an https address of at
 * most MAX_ISSUE_URL characters, without credentials, with {key} once, in
 * its path, query or fragment (the page puts the issue key there, encoded).
 */
export function cleanIssueUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const url = value.trim();
  if (url === '') return '';
  if (url.length > MAX_ISSUE_URL || URL_UNSAFE.test(url)) return null;
  const at = url.indexOf('{key}');
  if (at < 0 || url.indexOf('{key}', at + 1) >= 0 || !AUTHORITY_DONE.test(url.slice(0, at))) return null;
  try {
    const parsed = new URL(url.replace('{key}', 'KEY-1'));
    return parsed.protocol === 'https:' && !parsed.username && !parsed.password ? url : null;
  } catch {
    return null;
  }
}
