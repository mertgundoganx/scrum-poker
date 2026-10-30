/**
 * Pure formatting helpers for BlogArticle: heading slugs, ordered-list detection,
 * "Label: explanation" splitting and word counts. No React, no browser APIs —
 * the output is identical on the server and the client.
 */

import type { Locale } from '@/lib/translations';
import type { Localized } from './articleTypes';

const MAX_LABEL_CHARS = 60;
const NUMBERED_ITEM = /^(\d+)[.)]\s+/;
const ABBREVIATION_END = /(?:^|[\s(])(?:e\.g|i\.e|vs|etc|approx|örn|vb)$/i;
/** An inline link, `[text](/path)` (app/InlineMarkup.tsx renders it). */
const INLINE_LINK = /\[(.+?)\]\((\/[^)\s]*)\)/g;

const TR_CHAR_MAP: Record<string, string> = {
  ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u',
};

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[çğıöşü]/g, ch => TR_CHAR_MAP[ch] ?? ch)
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/['’"“”]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Caps a slug at `max` characters without cutting a word in half. */
function capSlug(slug: string, max = 72) {
  if (slug.length <= max) return slug;
  const cut = slug.slice(0, max + 1);
  return cut.slice(0, cut.lastIndexOf('-'));
}

/**
 * Stable, unique ids for a list of headings. `reserved` ids (e.g. "faq") are never handed out.
 * Empty slugs fall back to the position (`s-3`).
 */
export function headingIds(titles: string[], reserved: string[] = []) {
  const used = new Set(reserved);
  return titles.map((title, i) => {
    const base = capSlug(slugify(title)) || `s-${i + 1}`;
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    return id;
  });
}

export type LabelKind = 'colon' | 'dash' | 'sentence';

export interface ListItem {
  /** Number parsed from a "3. " prefix (ordered lists only). */
  value?: number;
  /** Short lead-in rendered in <strong>, including its punctuation ("Label:" / "Label."). */
  label?: string;
  /** Separator rendered between label and text for dash labels. */
  joiner: string;
  text: string;
}

export interface ParsedList {
  ordered: boolean;
  items: ListItem[];
}

interface Split { kind: LabelKind; label: string; joiner: string; rest: string }

function parenDepth(text: string) {
  let depth = 0;
  for (const ch of text) {
    if (ch === '(') depth++;
    else if (ch === ')') depth = Math.max(0, depth - 1);
  }
  return depth;
}

/**
 * Finds a short lead-in: "Label: rest" (French "Label\u00a0: rest", Chinese "标签：rest"),
 * "Label — rest" or "First short sentence. Rest".
 */
function splitLabel(text: string): Split | null {
  const separator = /(\u00a0?: |：| [—–] |\. )/g;
  // A label ends before any link: a separator inside or after one ("[a: b](/x)") is not a lead-in.
  const firstLink = text.search(/\[.+?\]\(\//);
  let match: RegExpExecArray | null;
  while ((match = separator.exec(text)) !== null) {
    if (firstLink >= 0 && match.index > firstLink) return null;
    const head = text.slice(0, match.index);
    if (head.length > MAX_LABEL_CHARS) return null;
    const rest = text.slice(match.index + match[0].length).trim();
    if (!head.trim() || !rest) continue;
    if (parenDepth(head) > 0) continue;

    if (match[0].endsWith(': ')) return { kind: 'colon', label: `${head}${match[0].trimEnd()}`, joiner: ' ', rest };
    if (match[0] === '：') return { kind: 'colon', label: `${head}：`, joiner: '', rest };
    if (match[0] !== '. ') return { kind: 'dash', label: head, joiner: match[0], rest };

    // Sentence lead-in: must be a real (multi-word) sentence, not an abbreviation.
    if (ABBREVIATION_END.test(head) || !/\s/.test(head.trim())) continue;
    return { kind: 'sentence', label: `${head}.`, joiner: ' ', rest };
  }
  return null;
}

/**
 * - All items start with "1. " / "2) " → ordered list with the prefix stripped (numbers kept as `value`).
 * - "Label: explanation" / "Label — explanation" items get their label emphasised when that is the
 *   dominant shape of the list; "Short sentence. Explanation" lead-ins only when every item has one,
 *   so a list never ends up with one randomly bold bullet.
 */
export function parseList(raw: string[]): ParsedList {
  const ordered = raw.length > 0 && raw.every(item => NUMBERED_ITEM.test(item));

  const bodies = raw.map(item => {
    if (!ordered) return { value: undefined, text: item };
    const m = NUMBERED_ITEM.exec(item)!;
    return { value: Number(m[1]), text: item.slice(m[0].length) };
  });

  const splits = bodies.map(b => splitLabel(b.text));
  const allLabelled = splits.every(Boolean);
  const explicit = splits.filter(s => s && s.kind !== 'sentence').length;
  const explicitDominant = explicit > 0 && explicit * 2 >= raw.length;

  const items = bodies.map((b, i): ListItem => {
    const s = splits[i];
    const show = s && (allLabelled || (explicitDominant && s.kind !== 'sentence'));
    return show
      ? { value: b.value, label: s.label, joiner: s.joiner, text: s.rest }
      : { value: b.value, joiner: '', text: b.text };
  });

  return { ordered, items };
}

/** The text a reader sees: links keep their words and lose their address. */
export function plainText(text: string) {
  return text.replace(INLINE_LINK, '$1');
}

/** Words as the language counts them: Chinese has no spaces between words, so a segmenter finds them. */
export function articleWordCount(data: Localized, locale: Locale) {
  const segmenter = new Intl.Segmenter(locale, { granularity: 'word' });
  const countWords = (text: string) => {
    let n = 0;
    for (const segment of segmenter.segment(plainText(text))) if (segment.isWordLike) n++;
    return n;
  };
  let words = countWords(data.title) + countWords(data.subtitle);
  for (const s of data.sections) {
    words += countWords(s.title) + countWords(s.content);
    for (const p of s.paragraphs ?? []) words += countWords(p);
    for (const item of s.items ?? []) words += countWords(item);
  }
  for (const f of data.faq ?? []) words += countWords(f.q) + countWords(f.a);
  return words;
}
