'use client';

import { useEffect, useEffectEvent, useId, useImperativeHandle, useLayoutEffect, useRef, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { Room, DeckType, Participant, ChatMessage, RoundHistory } from '@/lib/store';
import { getCards, cardValue, splitCardInput, limitCardInput, cleanCustomCards, cutText } from '@/lib/deck';
import { nameSkeleton } from '@/lib/confusables';
import { AVATARS, MAX_CARD, MAX_CHAT, MAX_CUSTOM_CARDS, MAX_NAME, MAX_QUEUE, MAX_STORY, MIN_CUSTOM_CARDS, REACTIONS, TIMER_LIMITS_MS } from '@/lib/limits';
import type { ParsedStories } from '@/lib/storyImport';
import { browserId, newBrowserId } from '@/lib/browserId';
import { ownerKeyFor, ownerLink, rememberOwnedRoom, forgetOwnedRoom, takeOwnerKeyFromUrl } from '@/lib/ownedRooms';
import { useLanguage } from '@/app/LanguageProvider';
import { LogoMark } from '@/app/Logo';
import { localizedPath } from '@/lib/localePath';
import {
  IconLink, IconCopy, IconChat, IconCoffee, IconX, IconCheck, IconChevronDown, IconArrowRight,
  IconUsers, IconTimer, IconList, IconChart, IconLayers, IconHash, IconShirt, IconZap, IconPencil,
  IconCrown, IconBell, IconRotate, IconHistory, IconPlay, IconPause, IconTarget, IconEye, IconMore, type IconProps,
} from '@/app/icons';
import { playLastVoter, playReveal, playNudge, playChime, primeAudio } from '@/lib/sounds';
import { RoomMoreMenu, type DeckOption, type MenuSettings, type SettingSwitch } from './RoomMoreMenu';
import { ROOM_TEXT } from './roomText';
import { fill, plural } from '@/lib/i18n';
import { useFocusTrap, onMenuKeyDown } from '@/app/useFocusTrap';
import './room.css';

// Opened rarely: loaded when first shown, not with the room.
const ShortcutsDialog = dynamic(() => import('./ShortcutsDialog').then(m => m.ShortcutsDialog));
const ConfirmDialog = dynamic(() => import('@/app/ConfirmDialog').then(m => m.ConfirmDialog));

const AVATAR_PRESETS = AVATARS;

/** First letter, upper-cased the way the language does it (Turkish i → İ); never half an emoji. */
function initialOf(name: string, locale: string): string {
  return Array.from(name.trim())[0]?.toLocaleUpperCase(locale) ?? '';
}

function Avatar({ p, size = 'md' }: { p: Participant; size?: 'xs' | 'sm' | 'md' | 'lg' }) {
  const { locale } = useLanguage();
  const sz = size === 'xs' ? 'w-6 h-6 text-xs' : size === 'sm' ? 'w-8 h-8 text-sm' : size === 'lg' ? 'w-14 h-14 text-2xl' : 'w-10 h-10 text-base';
  // One plain circle for everyone: the emoji or the initial is what tells people apart.
  const circle = `${sz} rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 select-none`;
  if (p.avatar) return <div className={circle}>{p.avatar}</div>;
  return (
    <div className={`${circle} text-slate-700 dark:text-slate-200 font-semibold`}>
      {initialOf(p.name, locale)}
    </div>
  );
}

// A name tag's characters: none that pass for another (0/O, 1/I/l, 2/Z, 5/S, 6/G, 8/B).
const TAG_CHARS = 'ACDEFHJKMNPRTUVWXY3479';

/** Three characters from someone's id (FNV-1a): the same on every screen, for as long as they're in the room. */
function nameTagOf(id: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 0x01000193);
  h >>>= 0;
  let tag = '';
  for (let i = 0; i < 3; i++) {
    tag += TAG_CHARS[h % TAG_CHARS.length];
    h = Math.floor(h / TAG_CHARS.length);
  }
  return tag;
}

/** Of these people (id, name as shown), the ones whose name reads like someone else's. */
function lookalikeIds(people: Iterable<readonly [string, string]>): Set<string> {
  const bySkeleton = new Map<string, Set<string>>();
  for (const [id, name] of people) {
    const key = nameSkeleton(name);
    if (!key) continue;
    const ids = bySkeleton.get(key) ?? new Set<string>();
    ids.add(id);
    bySkeleton.set(key, ids);
  }
  const out = new Set<string>();
  for (const ids of bySkeleton.values()) if (ids.size > 1) ids.forEach(id => out.add(id));
  return out;
}

/** A name with its tag, for labels ("Remove: Aleyna (K3F)"), when the name alone could be two people. */
function taggedName(name: string, id: string, lookalikes: Set<string>): string {
  return lookalikes.has(id) ? `${name} (${nameTagOf(id)})` : name;
}

/** The tag after a name that reads like someone else's: two Aleynas become Aleyna K3F and Aleyna 7TW. */
function NameTag({ id }: { id: string }) {
  const { t } = useLanguage();
  const tag = nameTagOf(id);
  const label = fill(t.nameTag, { tag });
  return (
    <span role="img" aria-label={label} title={label} dir="ltr"
      className="shrink-0 px-1 rounded text-[11px] leading-4 font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{tag}</span>
  );
}

/* ── Local icons (not part of the shared set) ── */
function localIcon(children: React.ReactNode) {
  return function Icon({ size = 16, strokeWidth = 2, ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
        {children}
      </svg>
    );
  };
}
const IconAlert = localIcon(<><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></>);
const IconMoon = localIcon(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />);
const IconDoor = localIcon(<><path d="M13 4h3a2 2 0 0 1 2 2v14" /><path d="M2 20h3" /><path d="M13 20h9" /><path d="M10 12v.01" /><path d="M13 4.56v16.16a1 1 0 0 1-1.24.97L5 20V5.56a2 2 0 0 1 1.52-1.94l4-1A2 2 0 0 1 13 4.56z" /></>);
const IconSkip = localIcon(<><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" x2="19" y1="5" y2="19" /></>);
const IconSmile = localIcon(<><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></>);
const IconLock = localIcon(<><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>);
const IconDownload = localIcon(<><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></>);
const IconUpload = localIcon(<><path d="M12 3v12" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /></>);

/** ♦ drawn, so it is the same shape on every system (the character can come out as an emoji). */
function Pip({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 10 12" aria-hidden="true" focusable="false" className={className} style={style}>
      <path d="M5 0 9.5 6 5 12 .5 6z" fill="currentColor" />
    </svg>
  );
}

/** A card face down (room.css .pc-back): the red back with its frame, lattice and a white pip. */
function CardBack({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pc-back ${className}`}>
      <svg viewBox="-2 -2 14 16" focusable="false" className="relative w-3.5 h-4">
        <path d="M5 0 9.5 6 5 12 .5 6z" fill="#FFFFFF" strokeWidth="3" paintOrder="stroke" strokeLinejoin="round" className="pc-back-pip" />
      </svg>
    </span>
  );
}

/**
 * A playing card's corner index: its value with a pip under it (the bottom one turned, as
 * printed). The value is drawn as generated content, not text: a card's visible text is its
 * one value, as its name says ("Vote 5"), not "5 5 5".
 */
function CardIndex({ card, corner }: { card: string; corner: 'top' | 'bottom' }) {
  return (
    <span aria-hidden="true"
      className={`pc-index absolute flex flex-col items-center gap-px text-[10px] leading-none font-bold tracking-normal ${corner === 'top' ? 'top-1.5 left-1.5' : 'bottom-1.5 right-1.5 rotate-180'}`}>
      {card === '☕'
        ? <IconCoffee className="w-[1em] h-[1em]" strokeWidth={2.5} />
        : <span data-index={card} className="before:content-[attr(data-index)]" />}
      <Pip className="w-1.5 h-2" />
    </span>
  );
}

// Consensus: where the pips that fly off the result card end up (x, y in px, and their turn).
const BURST: readonly (readonly [number, number, number])[] = [
  [-50, -40, -25], [50, -40, 25], [-64, 6, -40], [64, 6, 40], [-38, 50, -15], [38, 50, 15],
];

const DECK_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  scrum: IconLayers, fibonacci: IconHash, tshirt: IconShirt, powers: IconZap, custom: IconPencil,
};

/** Settings of a room from before a setting existed. */
const DEFAULT_SETTINGS: MenuSettings = { autoReveal: false, anonymous: false, hostRuns: false, closed: false, reactions: true, issueUrl: '' };

// On screen at once; older ones make room.
const MAX_REACTIONS = 6;
const REACTION_MS = 2000;

// Countdown lengths the server accepts; 0 counts up.
const TIMER_LIMITS = [0, ...TIMER_LIMITS_MS] as const;
const TIMER_WARN_MS = 15_000;

/** mm:ss */
function clock(seconds: number): string {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

/** A reaction rising from where it was thrown (a ref callback: it runs once, when it appears). */
function flyUp(el: HTMLElement | null) {
  if (!el || typeof el.animate !== 'function') return;
  // Reduced motion: no flight, the emoji just shows for a moment.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  el.animate([
    { transform: 'translateY(0) scale(0.6)', opacity: 0 },
    { transform: 'translateY(-12px) scale(1.15)', opacity: 1, offset: 0.15 },
    { transform: 'translateY(-56px) scale(1)', opacity: 0 },
  ], { duration: REACTION_MS, easing: 'ease-out', fill: 'forwards' });
}

/**
 * A reaction thrown at someone: placed over their seat (found by its
 * data-participant-id next to the reaction layer), then rising. A ref
 * callback like flyUp, so it measures once, before the first paint.
 */
function flyUpAtSeat(el: HTMLElement | null) {
  const layer = el?.parentElement;
  if (!el || !layer) return;
  const seat = layer.parentElement?.querySelector(`[data-participant-id="${CSS.escape(el.dataset.seat ?? '')}"]`);
  if (!seat) { el.hidden = true; return; } // they left meanwhile
  const box = layer.getBoundingClientRect();
  const at = seat.getBoundingClientRect();
  // Up to three side by side over the avatar.
  const slot = Number(el.dataset.slot ?? 0) - 1;
  el.style.left = `${at.left - box.left + at.width / 2 - 12 + slot * 16}px`;
  el.style.top = `${at.top - box.top + 20}px`;
  flyUp(el);
}

// A story on one line, cut short with an ellipsis. Clipped sideways only (not `truncate`, which
// hides overflow both ways): a link's taller tap area (linkify) still takes touches above and below.
const STORY_LINE = 'overflow-x-clip text-ellipsis whitespace-nowrap';

const ISSUE_KEY = /\b[A-Z][A-Z0-9]+-\d+\b/;
// A web address or an issue key (ABC-123), whichever comes first.
const LINKABLE = /(https?:\/\/[^\s<>"']+)|\b([A-Z][A-Z0-9]+-\d+)\b/g;

/** Text with its web addresses (and, with an issue link pattern, its issue keys) as links. */
function linkify(text: string, issueUrl: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINKABLE)) {
    let label = m[0];
    let href: string;
    if (m[1]) {
      // Punctuation after an address belongs to the sentence.
      label = label.replace(/[.,;:!?)\]]+$/, '');
      href = label;
    } else if (issueUrl) {
      href = issueUrl.replace('{key}', encodeURIComponent(label));
    } else {
      continue;
    }
    if (m.index > last) out.push(text.slice(last, m.index));
    // On touch screens 40px tall to tap: padding on inline text reaches over the lines
    // around it without moving them (STORY_LINE keeps it from being cut off).
    out.push(
      <a key={m.index} href={href} target="_blank" rel="noopener noreferrer nofollow" onClick={e => e.stopPropagation()}
        className="underline decoration-accent-500/60 underline-offset-3 hover:text-accent-700 dark:hover:text-accent-400 hover:decoration-current break-all pointer-coarse:py-[11px]">{label}</a>,
    );
    last = m.index + label.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** The story split for trackers: its first issue key, and the rest of the text. */
function splitIssueKey(story: string): { key: string; summary: string } {
  const key = story.match(ISSUE_KEY)?.[0] ?? '';
  if (!key) return { key, summary: story };
  const summary = story.replace(key, '').replace(/\(\s*\)|\[\s*\]/g, '').replace(/^[\s:·–—-]+/, '').replace(/\s{2,}/g, ' ').trim();
  return { key, summary };
}

function median(nums: number[]): number | null {
  if (!nums.length) return null;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/** A number for people: whole numbers as they are, others with one decimal. */
function formatNum(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

/** The numeric cards of a round (½ counts as 0.5; ?, ☕ and sizes don't count). */
function numericVotes(r: RoundHistory): number[] {
  return Object.values(r.votes).map(v => cardValue(v.card)).filter(n => !isNaN(n));
}

/** Hand the browser a file to save. */
function saveFile(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Today in the device's time zone, as YYYY-MM-DD. */
function localDate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Keys belong to whatever has focus when it takes text (a field, an editable area). */
function isTextTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
}

/**
 * A paste into a one-line field: its line breaks become `joiner` (the browser
 * would drop them and glue the lines together). Inserted as typing, so undo
 * and maxLength still apply.
 */
function pasteOneLine(e: React.ClipboardEvent<HTMLInputElement>, joiner = ' ') {
  const text = e.clipboardData.getData('text/plain');
  if (!/[\r\n]/.test(text)) return;
  e.preventDefault();
  document.execCommand('insertText', false, text.trim().split(/\s*[\r\n]+\s*/).join(joiner));
}

/** A menu, popover or dialog is open: Escape and letters are its own. */
function overlayOpen(): boolean {
  return document.querySelector('[role="menu"], [role="dialog"], [aria-modal="true"]') !== null;
}

// Typed card values wait this long for another key ("1" then "3" is 13).
const KEY_BUFFER_MS = 600;

// Header buttons: 40px touch targets on phones, compact from sm.
const HDR_BTN =
  'h-10 sm:h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 ' +
  'text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 ' +
  'transition-colors cursor-pointer shrink-0';
// A text field (the focus ring and the invalid border come from .input-glow).
const FIELD = 'input-glow bg-white dark:bg-slate-950 border text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none';
const FIELD_EDGE = 'border-slate-300 dark:border-slate-700';
// Secondary buttons: the site's white button with a hairline edge (globals.css).
const OUTLINE_BTN = 'btn-secondary';
// A toggle that is on (the chat open, a picker open): tinted with the accent, never filled dark.
const ACTIVE_BTN = 'border-accent-300! dark:border-accent-500/50! bg-accent-50! dark:bg-accent-500/15! text-accent-700! dark:text-accent-300!';
// Menu rows: the chosen one in ink on grey, its check in red.
const MENU_ON = 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold';
const MENU_OFF = 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800';
const MENU_CHECK = 'shrink-0 text-accent-600 dark:text-accent-400';
// Small icon buttons' hover: ink on grey.
const ICON_HOVER = 'hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800';
// Secondary per-card actions: always visible (dimmed) on touch / small screens; on hover or keyboard focus elsewhere.
const TOUCH_REVEAL =
  'opacity-80 sm:pointer-fine:opacity-0 sm:pointer-fine:group-hover:opacity-100 sm:pointer-fine:group-focus-within:opacity-100 focus-visible:opacity-100';
// Small icon buttons (timer, seat actions): 40×40 to touch on phones, compact from sm.
const ICON_BTN = 'w-10 h-10 sm:w-8 sm:h-8 rounded-lg';
// A queued story's buttons: 40px on phones, small beside the text from sm.
const QUEUE_BTN = 'w-10 h-10 sm:w-7 sm:h-8 shrink-0 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400';
// Small upper-case labels: Chinese has no letter case, and the extra spacing only smudges it.
const ZH_TRACKING = '[&:lang(zh)]:tracking-normal';
// The .eyebrow labels of the room (a global class, so `!` to win over it).
const ZH_EYEBROWS = '[&_.eyebrow:lang(zh)]:tracking-normal!';

/** A question as the language writes it ("Host?", "Hôte ?", "主持人？"). */
function asQuestion(text: string, locale: string): string {
  if (locale === 'zh') return `${text}？`;
  if (locale === 'ar') return `${text}؟`;
  if (locale === 'fr') return `${text} ?`;
  return `${text}?`;
}

/**
 * A card as shown: ☕ as the line icon (the emoji is a small grey blob on
 * Windows), sized with the text around it; every other card as its text.
 */
function CardFace({ card }: { card: string }) {
  if (card !== '☕') return card;
  return (
    <>
      <IconCoffee className="inline-block w-[1em] h-[1em] align-[-0.125em]" strokeWidth={2.25} />
      <span className="sr-only">☕</span>
    </>
  );
}

/** Avatar chooser shared by the join screen and the profile modal. */
function AvatarPicker({ value, initial, onChange, label }: {
  value: string; initial: string; onChange: (avatar: string) => void; label: string;
}) {
  const base = 'h-10 sm:h-9 w-full rounded-lg border flex items-center justify-center transition-[color,background-color,border-color,scale]';
  // The one picked: framed and tinted in the accent, a touch bigger.
  const on = 'border-accent-500 dark:border-accent-400 ring-1 ring-accent-500 dark:ring-accent-400 bg-accent-50 dark:bg-accent-500/15 scale-110';
  const off = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-slate-400 dark:hover:border-slate-500 hover:scale-105';
  return (
    // Even rows instead of a ragged wrap. Fewer columns to touch: a touch screen makes every
    // button at least 40px wide (globals.css), and eight of those overflow the card.
    <div className="grid grid-cols-5 min-[360px]:grid-cols-6 min-[360px]:pointer-fine:grid-cols-8 gap-1.5" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange('')} aria-pressed={!value} aria-label={`${label}: ${initial}`}
        className={`${base} text-sm font-bold ${!value ? `${on} text-accent-700 dark:text-accent-300` : `${off} text-slate-500 dark:text-slate-400`}`}
      >{initial}</button>
      {AVATAR_PRESETS.map(em => (
        <button key={em} type="button" onClick={() => onChange(em)} aria-pressed={value === em} aria-label={`${label} ${em}`}
          className={`${base} text-base ${value === em ? on : off}`}
        >{em}</button>
      ))}
    </div>
  );
}

/**
 * A revealed card: a face like the cards in the hand. A big card isn't a bad
 * one, so no colour scale: the cards matching the result take the accent
 * frame (room.css .pc-match), the rest stay plain. In a consensus every card
 * matches, so the whole table turns red: that is the celebration.
 */
function revealChipClass(card: string, result: string | null): string {
  return card === result ? 'pc-match' : '';
}

const TSHIRT_ORDER: Record<string, number> = { Z: 0, T: 1, XXS: 2, XS: 3, S: 4, M: 5, L: 6, XL: 7, XXL: 8, XXXL: 9 };
const TSHIRT_LABEL: Record<number, string> = Object.entries(TSHIRT_ORDER).reduce((m, [k, v]) => { m[v] = k; return m; }, {} as Record<number, string>);

function tshirtAvgLabel(avg: number): string {
  // Find closest t-shirt size
  const sizes = Object.entries(TSHIRT_ORDER).sort((a, b) => a[1] - b[1]);
  let closest = sizes[0];
  for (const s of sizes) {
    if (Math.abs(s[1] - avg) < Math.abs(closest[1] - avg)) closest = s;
  }
  return closest[0];
}

const SPECIAL_CARDS = new Set(['?', '☕']);

/**
 * One CSV field: always quoted, and a leading = + - @ (or tab / CR) is
 * defused with an apostrophe, so a story can't run as a spreadsheet formula.
 */
function csvField(value: string): string {
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

// Parsing and storage helpers live outside the component: the React Compiler
// can't optimize a component whose body has these try/catch shapes.

/** An event payload, or null if it isn't valid JSON. */
function parseJson<T>(data: string): T | null {
  try { return JSON.parse(data) as T; } catch { return null; }
}

/** Put this room first in the device's recent rooms (shown on the home page). */
function rememberRecentRoom(room: Room) {
  try {
    const key = 'scrumPoker_recentRooms';
    const existing: { id: string; name: string; ts: number }[] = JSON.parse(localStorage.getItem(key) ?? '[]');
    const filtered = existing.filter(r => r.id !== room.id);
    filtered.unshift({ id: room.id, name: room.name, ts: Date.now() });
    localStorage.setItem(key, JSON.stringify(filtered.slice(0, 5)));
  } catch { /* storage unavailable */ }
}

/** Copy the owner link of a room this browser keeps; false if it can't. */
async function copyOwnerLink(roomId: string): Promise<boolean> {
  const key = ownerKeyFor(roomId);
  if (!key) return false;
  try {
    await navigator.clipboard.writeText(ownerLink(roomId, key));
    return true;
  } catch {
    return false;
  }
}

function saveProfile(u: { name: string; avatar: string }) {
  storeSetting('scrumPoker_user', JSON.stringify({ name: u.name, avatar: u.avatar }));
}

/** The nickname and avatar chosen last on this device, if any. */
function loadProfile(): { name?: string; avatar?: string } | null {
  return parseJson<{ name?: string; avatar?: string }>(readSetting('scrumPoker_user') ?? 'null');
}

function readSetting(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}

function storeSetting(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value);
  } catch { /* storage unavailable */ }
}

/* Several tabs of one person share a seat: leave only when the last closes. */
function tabsKey(roomId: string, uid: string) {
  return `scrumPoker_tabs_${roomId}_${uid}`;
}

function registerTab(roomId: string, uid: string, tabId: string) {
  const tabs = new Set(parseJson<string[]>(readSetting(tabsKey(roomId, uid)) ?? '[]') ?? []);
  tabs.add(tabId);
  storeSetting(tabsKey(roomId, uid), JSON.stringify([...tabs]));
}

/** Returns true if this was the last tab. */
function deregisterTab(roomId: string, uid: string, tabId: string): boolean {
  const tabs = new Set(parseJson<string[]>(readSetting(tabsKey(roomId, uid)) ?? '[]') ?? []);
  tabs.delete(tabId);
  storeSetting(tabsKey(roomId, uid), tabs.size === 0 ? null : JSON.stringify([...tabs]));
  return tabs.size === 0;
}

/** Why the stream closed: the room is gone, we're no longer in it, or neither (or unknown). */
async function roomCheck(roomId: string): Promise<'gone' | 'outsider' | 'member' | 'unknown'> {
  try {
    // The summary only: the whole room (history and all) would be thrown away.
    const res = await fetch(`/api/rooms/${roomId}?summary=1`);
    if (res.status === 404) return 'gone';
    if (!res.ok) return 'unknown';
    const data = await res.json();
    return data.member ? 'member' : 'outsider';
  } catch {
    return 'unknown'; // offline
  }
}

/** One room API call; 'network' when it never got an answer. */
async function callRoomApi(roomId: string, path: string, body: Record<string, unknown>, method: 'POST' | 'PATCH' | 'DELETE'): Promise<{ ok: boolean; status: number; data: Record<string, unknown> | null } | 'network'> {
  try {
    const res = await fetch(`/api/rooms/${roomId}/${path}`, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => null);
    return { ok: res.ok, status: res.status, data };
  } catch {
    return 'network';
  }
}

/** The invite QR as a data URL; the library loads only when someone shares. */
async function inviteQr(url: string): Promise<string> {
  const m = await import('qrcode');
  // The app's ink (slate-900) on white.
  return (m.toDataURL ?? m.default.toDataURL)(url, { width: 320, margin: 1, color: { dark: '#23262D', light: '#FFFFFF' } });
}

/** One join request; the owner key only when there is one to show. */
function sendJoin(roomId: string, u: { id: string; name: string; avatar: string }, ownerKey: string | null): Promise<Response> {
  return fetch(`/api/rooms/${roomId}/join`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: u.id, name: u.name, avatar: u.avatar, ...(ownerKey ? { ownerKey } : {}) }),
  });
}

// The story parser is needed only to add stories: it loads when the queue opens.
let storyImport: typeof import('@/lib/storyImport') | null = null;
function loadStoryImport(): Promise<typeof import('@/lib/storyImport')> {
  return import('@/lib/storyImport').then(m => (storyImport = m));
}

/** A Markdown table cell: backslashes and pipes escaped (backslashes first, so "\|" can't end the cell), line breaks flattened. */
function mdCell(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');
}

/**
 * A finished round's result: the average (nearest size for T-shirts), or the
 * most common real card for non-numeric decks.
 */
function roundResult(r: RoundHistory): string {
  const votes = Object.values(r.votes).map(v => v.card);
  const mode = freqEntries(votes).find(([v]) => !SPECIAL_CARDS.has(v))?.[0] ?? votes[0] ?? '';
  if (r.deckType === 'tshirt') {
    const sizes = votes.filter(c => c in TSHIRT_ORDER);
    return sizes.length > 0 ? tshirtAvgLabel(sizes.reduce((s, c) => s + TSHIRT_ORDER[c], 0) / sizes.length) : mode;
  }
  const nums = votes.map(cardValue).filter(n => !isNaN(n));
  return nums.length ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1) : mode;
}

/** Who voted what, for exports ("Ayla: 5; Baran: 8"; just the cards in anonymous rounds). */
function voteList(r: RoundHistory): string {
  return Object.values(r.votes).map(v => (v.name ? `${v.name}: ${v.card}` : v.card)).join('; ');
}

/** Copy to the clipboard; the clipboard API is missing outside secure contexts. */
function copyText(text: string, onCopied: () => void) {
  navigator.clipboard?.writeText(text).then(onCopied).catch(() => { /* copy failed – nothing to show */ });
}

// Frequency entries sorted by count desc, with ? and ☕ pushed to the end on ties.
function freqEntries(vals: string[]): [string, number][] {
  const freq: Record<string, number> = {};
  vals.forEach(v => { freq[v] = (freq[v] ?? 0) + 1; });
  return Object.entries(freq).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    const aSpecial = SPECIAL_CARDS.has(a[0]) ? 1 : 0;
    const bSpecial = SPECIAL_CARDS.has(b[0]) ? 1 : 0;
    return aSpecial - bSpecial;
  });
}

function calcStats(votes: Record<string, string>, deckType: DeckType) {
  const vals = Object.values(votes);
  if (!vals.length) return null;
  // T-shirt deck: ordinal average / min / max (as size labels) + frequency
  if (deckType === 'tshirt') {
    const mapped = vals.filter(v => v in TSHIRT_ORDER).map(v => TSHIRT_ORDER[v]);
    const tshirtAvg = mapped.length > 0 ? mapped.reduce((a, b) => a + b, 0) / mapped.length : null;
    return {
      type: 'freq' as const,
      top: freqEntries(vals),
      tshirtAvg: tshirtAvg !== null ? tshirtAvgLabel(tshirtAvg) : null,
      tshirtMin: mapped.length > 0 ? TSHIRT_LABEL[Math.min(...mapped)] : null,
      tshirtMax: mapped.length > 0 ? TSHIRT_LABEL[Math.max(...mapped)] : null,
    };
  }
  // Numeric decks (fibonacci, powers, and numeric custom decks):
  // treat as numeric when every non-special vote is a number.
  const nonSpecial = vals.filter(v => !SPECIAL_CARDS.has(v));
  const nums = nonSpecial.map(cardValue).filter(n => !isNaN(n));
  if (nonSpecial.length > 0 && nums.length === nonSpecial.length) {
    const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
    const allNumeric = nonSpecial.length === vals.length; // no ? / ☕ present
    return { type: 'numeric' as const, avg: avg.toFixed(1), min: Math.min(...nums), max: Math.max(...nums), median: median(nums) ?? 0, allNumeric };
  }
  // Non-numeric custom deck (or all special votes): frequency only
  return { type: 'freq' as const, top: freqEntries(vals), tshirtAvg: null, tshirtMin: null, tshirtMax: null };
}

interface LocalUser { id: string; name: string; avatar: string; }
// A queued story's buttons (from sm) and its menu button (on phones), as data-queue-control names them.
type QueueControl = 'up' | 'down' | 'edit' | 'remove' | 'menu';
type JoinResult = 'ok' | 'full' | 'closed' | 'not_found' | 'kicked' | 'rate_limited' | 'error';
// A reaction as the stream sends it: at someone's seat, or (targetId null) over the table.
interface Reaction { emoji: string; targetId: string | null; fromId: string }
interface ShownReaction extends Reaction { id: number }
interface ReactionLayerHandle { add: (reaction: Reaction) => void }

/**
 * The six emoji to throw, at someone or at the whole room. Three by two, so
 * it fits over a seat at every width; `placement` can make it one row (the
 * room's picker, from 480px).
 */
function ReactionMenu({ ref, label, placement, onPick }: {
  ref: React.Ref<HTMLDivElement>; label: string; placement: string; onPick: (emoji: string) => void;
}) {
  return (
    <div ref={ref} role="menu" aria-label={label} onKeyDown={onMenuKeyDown} onClick={e => e.stopPropagation()}
      className={`absolute z-50 w-fit glass-strong rounded-xl animate-pop-in p-1 grid grid-cols-3 gap-0.5 ${placement}`}>
      {REACTIONS.map(emoji => (
        <button key={emoji} type="button" role="menuitem" onClick={() => onPick(emoji)} aria-label={emoji}
          className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg text-xl leading-none flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 -outline-offset-2!">{emoji}</button>
      ))}
    </div>
  );
}

/**
 * Reactions flying over the participants card: over a seat, or over the
 * table with the sender's name. The stream hands them over through `ref`;
 * they live in this component's state, so one renders this layer, not the room.
 */
function ReactionLayer({ ref, participants }: {
  ref: React.Ref<ReactionLayerHandle>; participants: Record<string, Participant>;
}) {
  const [shown, setShown] = useState<ShownReaction[]>([]);
  const nextId = useRef(0);
  useImperativeHandle(ref, () => ({
    add(reaction: Reaction) {
      const id = ++nextId.current;
      setShown(prev => [...prev, { ...reaction, id }].slice(-MAX_REACTIONS));
      setTimeout(() => setShown(prev => prev.filter(x => x.id !== id)), REACTION_MS);
    },
  }), []);
  if (!shown.length) return null;
  const atTable = shown.filter(r => r.targetId === null);
  // Side by side when several reach one seat at once.
  const atSeats = shown.filter(r => r.targetId !== null).map((r, i, all) => ({
    ...r, slot: all.slice(0, i).filter(x => x.targetId === r.targetId).length % 3,
  }));
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      {atSeats.map(r => (
        <span key={r.id} ref={flyUpAtSeat} data-seat={r.targetId} data-slot={r.slot} className="select-none absolute text-2xl leading-none">{r.emoji}</span>
      ))}
      {atTable.length > 0 && (
        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-4">
          {atTable.map(r => (
            <span key={r.id} ref={flyUp} className="flex flex-col items-center gap-0.5 select-none">
              <span className="text-3xl leading-none">{r.emoji}</span>
              <span dir="auto" className="max-w-24 truncate px-1.5 rounded-md text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">{participants[r.fromId]?.name ?? ''}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * The shared timer: how long the story has been discussed, or a countdown.
 * It ticks in its own state (on the timer's second boundaries), so a second
 * passing renders this and not the room. The timer itself lives on the server.
 */
function SharedTimer({ startedAt, accumMs, limitMs, clockOffset, roundKey, canRun, soundOn, menuOpen, menuRef, onToggleMenu, onPickLimit, onAction }: {
  startedAt: number | null;
  accumMs: number;
  limitMs: number | null;
  /** Server clock minus ours: the timer started at server time. */
  clockOffset: number;
  roundKey: string;
  canRun: boolean;
  soundOn: boolean;
  menuOpen: boolean;
  menuRef: React.Ref<HTMLDivElement>;
  onToggleMenu: () => void;
  onPickLimit: (ms: number) => void;
  onAction: (action: 'start' | 'stop' | 'reset') => void;
}) {
  const { t } = useLanguage();
  const [now, setNow] = useState(() => Date.now());
  const running = startedAt !== null;
  useEffect(() => {
    if (startedAt === null) return;
    let timer: ReturnType<typeof setTimeout>;
    // Wake just after the timer's next whole second: the display changes then, never in between.
    const schedule = () => {
      const elapsed = accumMs + Math.max(0, Date.now() + clockOffset - startedAt);
      timer = setTimeout(() => { setNow(Date.now()); schedule(); }, 1000 - (elapsed % 1000) + 15);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [startedAt, accumMs, clockOffset]);
  // Read on the server's clock, so a device whose clock is off shows the same time as everyone else.
  const elapsedMs = Math.max(0, accumMs + (startedAt !== null ? Math.max(0, now + clockOffset - startedAt) : 0));
  const seconds = Math.floor(elapsedMs / 1000);
  // Counting down: what's left (it stays at 0 until someone stops or resets it; it never reveals).
  const leftMs = limitMs ? Math.max(0, limitMs - elapsedMs) : null;
  const timeUp = leftMs === 0;

  // One soft chime when the countdown runs out: only after seeing it run (not
  // when joining late), and once per round and start, even across reconnects.
  const chimeRef = useRef<{ armed: string | null; rung: string | null }>({ armed: null, rung: null });
  const chimeKey = startedAt !== null ? `${roundKey}:${startedAt}` : null;
  const ring = useEffectEvent(() => { if (soundOn) playChime(); });
  useEffect(() => {
    if (leftMs === null || !chimeKey) return;
    const chime = chimeRef.current;
    if (leftMs > 0) { chime.armed = chimeKey; return; }
    if (chime.armed === chimeKey && chime.rung !== chimeKey) {
      chime.rung = chimeKey;
      ring();
    }
  }, [leftMs, chimeKey]);

  return (
    <>
      {/* A calm pill: grey while it runs, amber near the end, red when the time is up */}
      <span className={`inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg transition-colors ${timeUp
        ? 'bg-red-50 dark:bg-red-500/15 text-red-600 dark:text-red-300'
        : leftMs !== null && leftMs <= TIMER_WARN_MS
          ? 'bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-300'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`} title={t.timerTitle}>
        {running && !timeUp
          ? <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          : <IconTimer size={15} aria-hidden="true" />}
        <span className="sr-only">{t.timerTitle}</span>
        <span role="timer" dir="ltr" className={`font-mono text-[15px] font-semibold tabular-nums ${timeUp
          ? 'font-sans text-sm text-red-700 dark:text-red-300'
          : leftMs !== null && leftMs <= TIMER_WARN_MS
            ? 'text-amber-700 dark:text-amber-300'
            : 'text-slate-800 dark:text-slate-100'}`}>
          {timeUp ? t.timeUp : clock(leftMs !== null ? Math.ceil(leftMs / 1000) : seconds)}
        </span>
      </span>
      {canRun && (
        <>
          <button
            type="button"
            onClick={() => { setNow(Date.now()); onAction(running ? 'stop' : 'start'); }}
            aria-label={running ? t.timerStop : t.timerStart}
            title={running ? t.timerStop : t.timerStart}
            className={`${ICON_BTN} inline-flex items-center justify-center transition-colors text-slate-700 dark:text-slate-200 ${ICON_HOVER}`}
          >{running ? <IconPause size={14} fill="currentColor" /> : <IconPlay size={14} fill="currentColor" />}</button>
          {seconds > 0 && !running && (
            <button type="button" onClick={() => onAction('reset')}
              aria-label={t.timerReset} title={t.timerReset}
              className={`${ICON_BTN} inline-flex items-center justify-center text-slate-500 dark:text-slate-400 ${ICON_HOVER} transition-colors`}>
              <IconRotate size={14} />
            </button>
          )}
          {/* Count up, or count down from 1–10 minutes */}
          <div className="relative" onClick={e => e.stopPropagation()}>
            <button type="button" onClick={onToggleMenu}
              aria-haspopup="menu" aria-expanded={menuOpen} aria-label={t.timerMode} title={t.timerMode}
              className="w-10 h-10 sm:w-6 sm:h-8 rounded-lg inline-flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <IconChevronDown size={14} className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
            </button>
            {menuOpen && (
              <div ref={menuRef} role="menu" aria-label={t.timerMode} onKeyDown={onMenuKeyDown}
                className="absolute start-0 sm:start-auto sm:end-0 top-full mt-1 z-50 w-40 glass-strong rounded-xl animate-pop-in overflow-hidden py-1">
                {TIMER_LIMITS.map(ms => {
                  const on = (limitMs ?? 0) === ms;
                  return (
                    <button key={ms} type="button" role="menuitemradio" aria-checked={on} onClick={() => onPickLimit(ms)}
                      className={`w-full h-10 sm:h-9 flex items-center gap-2 px-3 text-sm text-start transition-colors -outline-offset-2! ${on ? MENU_ON : MENU_OFF}`}>
                      <span className="flex-1">{ms === 0 ? t.timerCountUp : fill(t.timerMinutes, { n: ms / 60_000 })}</span>
                      {on && <IconCheck size={14} className={MENU_CHECK} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

const QUEUE_MENU_ITEM =
  'w-full h-10 flex items-center gap-2.5 px-3 text-sm text-start text-slate-700 dark:text-slate-200 transition-colors -outline-offset-2! ' +
  'hover:bg-slate-100 dark:hover:bg-slate-800 aria-disabled:opacity-40 aria-disabled:hover:bg-transparent aria-disabled:cursor-default';

/**
 * A queued story's actions on phones, behind one button. Over the page (a
 * portal: the queue's list scrolls and would cut it off), placed under the
 * button or above it near the bottom of the screen, its end edge at the
 * button's in either direction. A press elsewhere, a scroll or a resize
 * closes it; Escape and Tab close it and give the button its focus back.
 */
function QueueItemMenu({ anchor, label, first, last, onMove, onEdit, onRemove, onClose }: {
  anchor: HTMLElement;
  label: string;
  first: boolean;
  last: boolean;
  onMove: (by: -1 | 1) => void;
  onEdit: () => void;
  onRemove: () => void;
  onClose: (returnFocus: boolean) => void;
}) {
  const { t, locale } = useLanguage();
  const rt = ROOM_TEXT[locale] ?? ROOM_TEXT.en;
  const ref = useRef<HTMLDivElement>(null);
  const close = useEffectEvent(onClose);
  // Placed before the first paint, then the first item that does something gets the focus. It
  // follows the button when the page or the list scrolls (a fling still running when it opened
  // too), and closes once the button is out of sight.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const list = anchor.closest('ol');
    function place() {
      if (!el) return;
      const vw = document.documentElement.clientWidth;
      const vh = window.innerHeight;
      const at = anchor.getBoundingClientRect();
      const shown = list?.getBoundingClientRect() ?? { top: 0, bottom: vh };
      if (at.bottom <= Math.max(0, shown.top) || at.top >= Math.min(vh, shown.bottom)) { close(false); return; }
      const rtl = getComputedStyle(anchor).direction === 'rtl';
      const left = Math.min(Math.max(8, rtl ? at.left : at.right - el.offsetWidth), vw - el.offsetWidth - 8);
      const below = at.bottom + 4;
      const top = below + el.offsetHeight <= vh - 8 ? below : Math.max(8, at.top - el.offsetHeight - 4);
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    }
    place();
    el.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')?.focus();
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [anchor]);
  useEffect(() => {
    // The button itself toggles the menu with its own click.
    function onPointerDown(e: PointerEvent) {
      if (e.target instanceof Node && (ref.current?.contains(e.target) || anchor.contains(e.target))) return;
      close(false);
    }
    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, [anchor]);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); onClose(true); return; }
    if (e.key === 'Tab') { onClose(true); return; } // Tab goes on from the button
    onMenuKeyDown(e);
  }
  // Items that can't do anything here stay in the menu (and focusable), marked, like the inline buttons.
  const item = (key: string, text: string, icon: React.ReactNode, off: boolean, run: () => void) => (
    <button key={key} type="button" role="menuitem" aria-disabled={off || undefined}
      onClick={() => { if (!off) run(); }} className={QUEUE_MENU_ITEM}>
      {icon}<span className="flex-1 min-w-0">{text}</span>
    </button>
  );
  return createPortal(
    <div ref={ref} role="menu" aria-label={label} onKeyDown={onKeyDown} style={{ left: 0, top: 0 }}
      className="fixed z-[60] w-52 max-w-[calc(100vw-1rem)] glass-strong rounded-xl animate-pop-in py-1">
      {item('up', t.moveUp, <IconChevronDown size={16} className="shrink-0 rotate-180 text-slate-500 dark:text-slate-400" />, first, () => onMove(-1))}
      {item('down', t.moveDown, <IconChevronDown size={16} className="shrink-0 text-slate-500 dark:text-slate-400" />, last, () => onMove(1))}
      {item('edit', t.editStory, <IconPencil size={15} className="shrink-0 text-slate-500 dark:text-slate-400" />, false, onEdit)}
      {item('remove', rt.removeStory, <IconX size={16} className="shrink-0 text-red-500 dark:text-red-400" />, false, onRemove)}
    </div>,
    document.body,
  );
}

/* ── Settings Modal ── */
function SettingsModal({ user, others, onSave, onClose }: {
  user: LocalUser;
  /** Everyone else in the room: a name that reads like one of theirs is pointed out, not refused. */
  others: Participant[];
  onSave: (name: string, avatar: string) => Promise<void>;
  onClose: () => void;
}) {
  const { t, locale } = useLanguage();
  const rt = ROOM_TEXT[locale] ?? ROOM_TEXT.en;
  const titleId = useId();
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [saving, setSaving] = useState(false);
  // Saved with nothing visible in it: said under the field.
  const [nameMissing, setNameMissing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const errorId = useId();
  const clashId = useId();
  const skeleton = nameSkeleton(cutText(name, MAX_NAME));
  const nameInUse = skeleton !== '' && others.some(o => nameSkeleton(o.name) === skeleton);
  useFocusTrap(dialogRef, mounted);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safe portal mount
  useEffect(() => { setMounted(true); }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (saving) return;
    // As the server will store it: a name of only spaces or invisible marks is none.
    const clean = cutText(name, MAX_NAME);
    if (!clean) { setNameMissing(true); nameRef.current?.focus(); return; }
    setSaving(true);
    await onSave(clean, avatar);
    setSaving(false);
    onClose();
  }

  const modal = (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="absolute inset-0 bg-slate-900/30 dark:bg-black/60" onClick={onClose} />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="relative glass-strong rounded-xl w-full max-w-sm max-h-full overflow-y-auto overscroll-contain animate-pop-in">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-800">
          <h2 id={titleId} className="font-bold text-slate-900 dark:text-slate-100 text-base">{t.settingsTitle}</h2>
          <button type="button" onClick={onClose} aria-label={rt.close} title={rt.close}
            className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            <IconX size={14} />
          </button>
        </div>
        <form onSubmit={handleSubmit} noValidate className="p-5 space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <Avatar p={{ id: user.id, name, avatar }} size="md" />
              <input ref={nameRef} type="text" value={name} onChange={e => { setName(e.target.value); setNameMissing(false); }} onPaste={e => pasteOneLine(e)}
                required autoFocus maxLength={MAX_NAME} aria-label={t.nameLabel} dir="auto"
                aria-invalid={nameMissing} aria-describedby={nameMissing ? errorId : nameInUse ? clashId : undefined}
                className={`${FIELD} flex-1 min-w-0 h-10 px-3 rounded-lg text-base sm:text-sm ${nameMissing ? 'border-red-400 dark:border-red-500/70' : FIELD_EDGE}`}
              />
            </div>
            {nameMissing && <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 animate-pop-in">{t.errNameRequired}</p>}
            {/* Said, not refused: the room tags look-alike names so they can be told apart */}
            {!nameMissing && nameInUse && <p id={clashId} role="status" className="mt-1.5 text-xs text-amber-700 dark:text-amber-400 animate-pop-in">{t.nameInUse}</p>}
          </div>
          <AvatarPicker value={avatar} initial={initialOf(name, locale) || '?'} onChange={setAvatar} label={rt.avatar} />
          <button type="submit" disabled={saving} className="btn-primary w-full min-h-11 py-2.5 rounded-lg text-white font-semibold text-sm">
            {saving ? t.btnSaving : t.btnSave}
          </button>
        </form>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}

/* ── Main Room Component ── */
export default function RoomClient({ roomId, roomName }: {
  roomId: string;
  /** The room's name, for the join screen (the room itself comes with the join). */
  roomName?: string;
}) {
  const { t, locale } = useLanguage();
  const rt = ROOM_TEXT[locale] ?? ROOM_TEXT.en;
  const [room, setRoom] = useState<Room | null>(null);
  const [roomGone, setRoomGone] = useState(false);
  const [kicked, setKicked] = useState(false);
  // Set when the host kicks us — stops this session from silently auto-rejoining.
  const kickedRef = useRef(false);
  const [soundOn, setSoundOn] = useState(true);
  const soundOnRef = useRef(true);
  const prevRevealedRef = useRef(false);
  const prevOneLeftRef = useRef(false);
  const soundInitRef = useRef(false);
  const [user, setUser] = useState<LocalUser | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [avatarInput, setAvatarInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [joining, setJoining] = useState(false);
  // Why joining failed, as a kind: its text follows the language (picked in the browser, maybe after the failure).
  const [joinError, setJoinError] = useState<JoinResult | 'offline' | null>(null);
  // The room is closed to new people: the join screen says so instead of offering the form.
  const [joinClosed, setJoinClosed] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  // Optimistic vote: reflect the click instantly; `undefined` = defer to server state,
  // `null` = optimistically un-voted, string = optimistically that card.
  const [pendingVote, setPendingVote] = useState<string | null | undefined>(undefined);
  const [kickConfirmTarget, setKickConfirmTarget] = useState<string | null>(null);
  const kickConfirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [shake, setShake] = useState(false);
  const [nudgeToast, setNudgeToast] = useState<string | null>(null);
  const shakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudgeToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nudgeCooldownRef = useRef<Set<string>>(new Set());
  const [nudgeSent, setNudgeSent] = useState<string | null>(null);
  const [showDeckPicker, setShowDeckPicker] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCardsInput, setCustomCardsInput] = useState('');
  // Applied with fewer than two different cards: said under the field.
  const [customCardsInvalid, setCustomCardsInvalid] = useState(false);
  const customInputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const chatOpenRef = useRef(false);
  const [showHistory, setShowHistory] = useState(false);
  // The final estimate picked for the round shown (keyed by round, so a new round starts unpicked).
  const [finalPick, setFinalPick] = useState<{ round: string; value: string } | null>(null);
  // Inline editing: the current story, or a queued one by index.
  const [storyDraft, setStoryDraft] = useState<string | null>(null);
  const [queueDraft, setQueueDraft] = useState<{ index: number; item: string; text: string } | null>(null);
  // A queued story's menu on phones, by the button that opened it.
  const [queueMenu, setQueueMenu] = useState<{ index: number; item: string; anchor: HTMLElement } | null>(null);
  // A story just moved or removed: the control to give the keyboard back to once the queue shows it (its row is new).
  const queueFocusRef = useRef<{ index: number; control: QueueControl } | null>(null);
  // We joined with a name that reads like someone else's (its skeleton), until dismissed.
  const [nameClashNote, setNameClashNote] = useState<string | null>(null);
  const clashDismissedRef = useRef<string | null>(null);
  const [hostConfirmTarget, setHostConfirmTarget] = useState<string | null>(null);
  // First visit to a room: a one-line hint, until dismissed once.
  const [showHint, setShowHint] = useState(false);
  // "Really stop keeping the room?" is open.
  const [confirmUnkeep, setConfirmUnkeep] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from storage after mount
    if (readSetting('scrumPoker_roomHintSeen') !== '1') setShowHint(true);
  }, []);
  const [showQueue, setShowQueue] = useState(false);
  const [queueInput, setQueueInput] = useState('');
  const [exportCopied, setExportCopied] = useState<'csv' | 'md' | null>(null);
  const [resultCopied, setResultCopied] = useState(false);
  const [deckToast, setDeckToast] = useState<DeckType | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const prevDeckTypeRef = useRef<DeckType | null>(null);
  const deckToastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [queueAddedCount, setQueueAddedCount] = useState(0);
  // Stories on their way to the server: the button waits (a second click would add them twice).
  const [queueSending, setQueueSending] = useState(false);
  const queueSendingRef = useRef(false);
  const [sseStatus, setSseStatus] = useState<'connected' | 'reconnecting'>('connected');
  const [actionError, setActionError] = useState<string | null>(null);
  const actionErrorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [unreadChat, setUnreadChat] = useState(0);
  const [showShare, setShowShare] = useState(false);
  // Join form: the name was left empty.
  const [nameMissing, setNameMissing] = useState(false);
  // Reactions fly in their own layer (see ReactionLayer); whose emoji picker is
  // open ('room', a participant id, or none).
  const reactionLayerRef = useRef<ReactionLayerHandle>(null);
  const [reactPicker, setReactPicker] = useState<string | null>(null);
  // Stories read from a file or pasted cells, waiting for "Add".
  const [importPreview, setImportPreview] = useState<ParsedStories | null>(null);
  const importFileRef = useRef<HTMLInputElement | null>(null);
  // The final-estimate picker shows the whole deck for this round.
  const [finalMoreRound, setFinalMoreRound] = useState<string | null>(null);
  const [showTimerMenu, setShowTimerMenu] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  // The tab is in the background (its title then says what happened), and we were nudged meanwhile.
  const [tabHidden, setTabHidden] = useState(false);
  const [tabNudged, setTabNudged] = useState(false);
  // Keyboard voting: what's been typed so far.
  const keyBufferRef = useRef<{ text: string; timer: ReturnType<typeof setTimeout> | null }>({ text: '', timer: null });
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatButtonRef = useRef<HTMLButtonElement | null>(null);
  const queueInputRef = useRef<HTMLTextAreaElement | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recentRoomsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);
  const userRef = useRef<LocalUser | null>(null);
  const sseRetryCount = useRef(0);
  // The join flow must run exactly once (React runs effects twice in development).
  const joinStartedRef = useRef(false);
  const teardownRef = useRef<(() => void) | null>(null);
  // Set once the join flow has decided between auto-join and the join form,
  // so returning users don't see the form flash (and submit it twice).
  const [bootstrapped, setBootstrapped] = useState(false);
  // Newest room version applied: snapshots arrive over the stream and in action
  // responses, on different connections, so an older one can arrive later.
  const roomVersionRef = useRef(0);
  // Server clock minus ours, for the shared timer (started at server time).
  const [clockOffset, setClockOffset] = useState(0);
  // The owner key from the owner link, until the server says whether it is
  // this room's (only then is it remembered: a forged link can't replace ours).
  const ownerCandidateRef = useRef<string | null>(null);
  // The latest joinServer / registerTab, for callbacks created earlier.
  const joinRef = useRef<(u: LocalUser) => Promise<JoinResult>>(async () => 'error');
  const registerTabRef = useRef<((uid: string) => void) | null>(null);
  // connectSSE, for its own reconnect path (it can't name itself while being defined).
  const connectSSERef = useRef<() => void>(() => {});

  /**
   * Apply a room snapshot unless a newer one is already shown. Snapshots
   * leave out the round history and the queue when they haven't changed;
   * keep ours then.
   */
  const applyRoom = useCallback((next: Room): boolean => {
    if ((next.version ?? 0) < roomVersionRef.current) return false;
    roomVersionRef.current = next.version ?? 0;
    // Only a real change: every snapshot measures it a few milliseconds apart, and each new value restarts the timer's tick.
    if (typeof next.serverNow === 'number') {
      const offset = next.serverNow - Date.now();
      setClockOffset(prev => (Math.abs(prev - offset) < 50 ? prev : offset));
    }
    setRoom(prev => ({ ...next, history: next.history ?? prev?.history ?? [], queue: next.queue ?? prev?.queue ?? [] }));
    return true;
  }, []);

  /** The host removed us: stop everything that would bring us back. */
  const markKicked = useCallback(() => {
    kickedRef.current = true;
    eventSourceRef.current?.close();
    if (reconnectTimer.current) { clearTimeout(reconnectTimer.current); reconnectTimer.current = null; }
    setRoom(null);
    setKicked(true);
    setRoomGone(true);
  }, []);

  const connectSSE = useCallback(() => {
    if (reconnectTimer.current) { clearTimeout(reconnectTimer.current); reconnectTimer.current = null; }
    eventSourceRef.current?.close();
    if (kickedRef.current) return;

    const es = new EventSource(`/api/rooms/${roomId}/events`, { withCredentials: true });
    es.onopen = () => { setSseStatus('connected'); sseRetryCount.current = 0; };
    es.onmessage = e => {
      const newRoom = parseJson<Room>(e.data);
      if (!newRoom || !applyRoom(newRoom)) return;
      setRoomGone(false);
      // Toast when someone changes the deck
      if (prevDeckTypeRef.current && prevDeckTypeRef.current !== newRoom.deckType) {
        setDeckToast(newRoom.deckType as DeckType);
        if (deckToastTimerRef.current) clearTimeout(deckToastTimerRef.current);
        deckToastTimerRef.current = setTimeout(() => setDeckToast(null), 3500);
      }
      prevDeckTypeRef.current = newRoom.deckType as DeckType;
      // Save to recent rooms — debounced to avoid hammering localStorage on every SSE msg
      if (!recentRoomsTimerRef.current) {
        recentRoomsTimerRef.current = setTimeout(() => {
          recentRoomsTimerRef.current = null;
          rememberRecentRoom(newRoom);
        }, 5000);
      }
      // If room is locked but not revealed, auto-start countdown for this client
      // Handles: user who started reveal left mid-countdown, or new user joined during countdown
      if (newRoom.locked && !newRoom.revealed) {
        setCountdown(prev => prev ?? 3);
      }
      // If room is revealed or unlocked, clear any running countdown
      if (newRoom.revealed || !newRoom.locked) {
        setCountdown(null);
      }
      // Sync profile if changed from another tab
      const me = userRef.current;
      const serverMe = me ? newRoom.participants[me.id] : undefined;
      if (me && serverMe && (serverMe.name !== me.name || serverMe.avatar !== me.avatar)) {
        const synced: LocalUser = { ...me, name: serverMe.name, avatar: serverMe.avatar };
        userRef.current = synced;
        setUser(synced);
        saveProfile(synced);
      }
    };
    es.onerror = () => {
      es.close();
      if (kickedRef.current) return;
      setSseStatus('reconnecting');
      sseRetryCount.current += 1;
      // Backoff: 2s, 4s, 6s … up to 15s, for as long as it takes. Only a
      // missing room ends it; a deploy, a 5xx or being offline doesn't.
      const delay = Math.min(2000 * sseRetryCount.current, 15000);
      reconnectTimer.current = setTimeout(() => { void reconnect(); }, delay);
    };
    // The server is being replaced (a deploy): reconnect right away, with a
    // little jitter so a full room doesn't arrive at the new one all at once.
    es.addEventListener('reconnect', () => {
      es.close();
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      reconnectTimer.current = setTimeout(() => { void reconnect(); }, 300 + Math.random() * 1200);
    });
    es.addEventListener('chat-history', (e: MessageEvent) => {
      const history = parseJson<ChatMessage[]>(e.data);
      if (history) setChatMessages(history);
    });
    es.addEventListener('chat', (e: MessageEvent) => {
      const msg = parseJson<ChatMessage>(e.data);
      if (!msg) return;
      setChatMessages(prev => {
        const next = [...prev, msg];
        return next.length > 30 ? next.slice(-30) : next;
      });
      // Increment unread if chat is closed and message is from someone else
      const me = userRef.current;
      if (msg.userId !== me?.id && !chatOpenRef.current) {
        setUnreadChat(c => c + 1);
      }
    });
    es.addEventListener('kick', (e: MessageEvent) => {
      const kicked = parseJson<{ userId: string }>(e.data);
      const me = userRef.current;
      if (me && kicked?.userId === me.id) markKicked();
    });
    es.addEventListener('nudge', (e: MessageEvent) => {
      const nudged = parseJson<{ fromName: string; targetId: string }>(e.data);
      const me = userRef.current;
      if (nudged && me && nudged.targetId === me.id) {
        const { fromName } = nudged;
        // Shake the screen + short buzz, MSN-style.
        if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
        setShake(true);
        shakeTimerRef.current = setTimeout(() => setShake(false), 650);
        if (soundOnRef.current) playNudge();
        setNudgeToast(fromName);
        if (nudgeToastTimerRef.current) clearTimeout(nudgeToastTimerRef.current);
        nudgeToastTimerRef.current = setTimeout(() => setNudgeToast(null), 2500);
        if (document.hidden) setTabNudged(true);
      }
    });
    // Reactions are never stored: shown for a moment, then gone.
    es.addEventListener('reaction', (e: MessageEvent) => {
      const r = parseJson<Reaction>(e.data);
      if (!r || !(REACTIONS as readonly string[]).includes(r.emoji)) return;
      reactionLayerRef.current?.add({ emoji: r.emoji, targetId: r.targetId ?? null, fromId: r.fromId });
    });
    eventSourceRef.current = es;

    /**
     * Before opening the stream again, find out why it closed. The stream is
     * only for participants, so someone dropped after a long absence (a phone
     * in the background) joins again first.
     */
    async function reconnect() {
      if (!mountedRef.current || kickedRef.current) return;
      const status = await roomCheck(roomId);
      if (!mountedRef.current) return;
      if (status === 'gone') { setRoomGone(true); return; }
      const me = userRef.current;
      if (status === 'outsider' && me) {
        const result = await joinRef.current(me).catch(() => 'error' as const);
        if (!mountedRef.current) return;
        if (result === 'kicked') { markKicked(); return; }
        if (result === 'not_found') { setRoomGone(true); return; }
      }
      // Offline or unsure: try the stream anyway, it backs off.
      connectSSERef.current();
    }
  }, [roomId, applyRoom, markKicked]);
  useEffect(() => { connectSSERef.current = connectSSE; }, [connectSSE]);

  // Mount-only lifecycle: tear down listeners/SSE on unmount.
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      joinStartedRef.current = false; // StrictMode re-mount runs the join again
      teardownRef.current?.();
      teardownRef.current = null;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      eventSourceRef.current?.close();
      // Don't send leave on unmount — SPA navigation (e.g. to /pricing) would
      // remove the user from the room. Instead, rely on:
      // 1. pagehide handler for real tab close / full navigation
      // 2. SSE disconnect grace period (90s) for server-side cleanup
    };
  }, []);


  /**
   * One join request, with this owner key or none. The answer is the room:
   * shown at once, not one stream message later. `keyValid` says whether the
   * key was this room's (only when one was sent and the seat was taken).
   */
  async function postJoin(u: LocalUser, ownerKey: string | null): Promise<{ result: JoinResult | 'identity_in_use'; keyValid?: boolean; name?: string }> {
    const res = await sendJoin(roomId, u, ownerKey);
    if (res.ok) {
      const joined = await res.json().catch(() => null) as (Room & { ownerKeyValid?: boolean }) | null;
      if (!joined) return { result: 'ok' };
      const { ownerKeyValid, ...joinedRoom } = joined;
      applyRoom(joinedRoom);
      // Someone here already reads as this name: said once in the room (not on a rename, the profile said it).
      const mine = nameSkeleton(u.name);
      const clash = Object.values(joinedRoom.participants ?? {}).some(p => p.id !== u.id && nameSkeleton(p.name) === mine);
      setNameClashNote(clash && mine !== clashDismissedRef.current ? mine : null);
      return { result: 'ok', keyValid: ownerKey ? (ownerKeyValid ?? Boolean(joined.isOwner)) : undefined, name: joined.name };
    }
    const code = (await res.json().catch(() => null))?.code;
    if (res.status === 409 && code === 'identity_in_use') return { result: 'identity_in_use' };
    if (res.status === 404) return { result: 'not_found' };
    if (res.status === 429) return { result: 'rate_limited' };
    if (code === 'kicked') return { result: 'kicked' };
    if (code === 'room_full') return { result: 'full' };
    if (code === 'room_closed') return { result: 'closed' };
    return { result: 'error' };
  }

  /**
   * Take the seat. The owner key makes us the host: the one from the owner
   * link if we came through one, else the one this browser keeps. A key is
   * remembered only once the server took it: a refused link key is dropped
   * (and we join once more with ours, if we have one), a refused key of ours
   * is forgotten (the room was let go, or kept anew by someone else).
   */
  async function takeSeat(u: LocalUser): Promise<JoinResult | 'identity_in_use'> {
    const fromLink = ownerCandidateRef.current;
    const ours = ownerKeyFor(roomId);
    const key = fromLink ?? ours;
    const first = await postJoin(u, key);
    if (first.keyValid === undefined || !key) return first.result;
    ownerCandidateRef.current = null;
    if (first.keyValid) {
      rememberOwnedRoom({ id: roomId, name: first.name ?? roomId, key });
      return first.result;
    }
    if (!fromLink) { forgetOwnedRoom(roomId); return first.result; }
    if (!ours || ours === fromLink) return first.result;
    const again = await postJoin(u, ours);
    if (again.keyValid) rememberOwnedRoom({ id: roomId, name: again.name ?? roomId, key: ours });
    else if (again.keyValid === false) forgetOwnedRoom(roomId);
    return again.result;
  }

  async function joinServer(u: LocalUser): Promise<JoinResult> {
    userRef.current = u;
    const result = await takeSeat(u);
    // This guest ID is claimed by someone else in the room (or our room
    // cookie expired). Regenerate a fresh guest identity and retry once.
    if (result === 'identity_in_use') {
      const fresh: LocalUser = { ...u, id: newBrowserId() };
      userRef.current = fresh;
      setUser(fresh);
      const retry = await takeSeat(fresh);
      return retry === 'identity_in_use' ? 'error' : retry;
    }
    return result;
  }
  useEffect(() => { joinRef.current = joinServer; });

  function joinErrorText(result: JoinResult | 'offline'): string {
    switch (result) {
      case 'offline': return t.errConnection;
      case 'full': return t.errRoomFull;
      case 'closed': return t.errRoomClosed;
      case 'not_found': return t.errRoomNotFound;
      case 'rate_limited': return t.actionRateLimited;
      default: return t.errJoin;
    }
  }

  // The join flow: auto-join with the saved name (or show the form), and the
  // page lifecycle listeners. An effect event, so it sees the current helpers
  // while the effect below decides when it runs: once.
  const startSession = useEffectEvent(() => {
    // Opened through the owner link: join with its key (kept only if the server takes it).
    // Taking it empties the address bar and storage, so a second run (React's
    // development double run) finds nothing: that mustn't drop the key.
    const fromUrl = takeOwnerKeyFromUrl(roomId);
    if (fromUrl) ownerCandidateRef.current = fromUrl;
    const uid = browserId();
    const saved = loadProfile();
    const name = saved?.name ?? '';
    const avatar = saved?.avatar ?? '';

    // Register this tab for multi-tab tracking
    const tabId = crypto.randomUUID();
    registerTabRef.current = (id: string) => registerTab(roomId, id, tabId);
    (async () => {
      if (name) {
        const u: LocalUser = { id: uid, name, avatar };
        userRef.current = u;
        setUser(u);
        setBootstrapped(true);
        const result = await joinServer(u).catch(() => 'offline' as const);
        if (!mountedRef.current) return;
        if (result === 'kicked') { markKicked(); return; }
        if (result !== 'ok') {
          setJoinError(result);
          setJoinClosed(result === 'closed');
          // The form, filled in with the name we tried (the room may have room again in a moment).
          setNameInput(name);
          setAvatarInput(avatar);
          setUser(null);
          return;
        }
        registerTab(roomId, userRef.current?.id ?? uid, tabId);
        if (mountedRef.current) connectSSE();
      } else {
        // No saved name: show the join form. SSE needs the room cookie, so
        // connecting before joining would only produce 401 retries.
        setBootstrapped(true);
      }
    })();

    // Leave on tab close / navigation away
    let leaveSent = false;
    let reconnectingFromBfcache = false;
    function handleLeave(e: PageTransitionEvent) {
      // Don't leave if page is entering bfcache — we'll come back
      if (e.persisted) return;
      if (leaveSent) return;
      const u = userRef.current;
      if (!u) return;
      const isLastTab = deregisterTab(roomId, u.id, tabId);
      if (!isLastTab) return; // other tabs still open, don't leave
      leaveSent = true;
      // Cookie-based auth; empty body
      navigator.sendBeacon(`/api/rooms/${roomId}/leave`, new Blob([], { type: 'application/json' }));
    }
    // Reconnect when restored from bfcache or tab becomes visible again
    async function handlePageShow(e: PageTransitionEvent) {
      if (!e.persisted) return;
      if (kickedRef.current) return; // don't rejoin after being kicked
      reconnectingFromBfcache = true;
      leaveSent = false;
      const u = userRef.current;
      if (u) {
        await joinServer(u).catch(() => {});
      }
      if (mountedRef.current) connectSSE();
      // Clear flag after a short delay to prevent visibilitychange from double-firing
      setTimeout(() => { reconnectingFromBfcache = false; }, 500);
    }
    function handleVisibilityChange() {
      if (document.visibilityState !== 'visible') return;
      if (reconnectingFromBfcache) return; // pageshow already handled it
      reconnectIfClosed();
    }
    // Back online, or back on the tab: don't wait for the backoff.
    function reconnectIfClosed() {
      if (kickedRef.current || !userRef.current) return;
      if (!eventSourceRef.current || eventSourceRef.current.readyState === EventSource.CLOSED) {
        sseRetryCount.current = 0;
        connectSSE();
      }
    }
    window.addEventListener('pagehide', handleLeave);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('online', reconnectIfClosed);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    teardownRef.current = () => {
      window.removeEventListener('pagehide', handleLeave);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('online', reconnectIfClosed);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  });
  // Once, on mount.
  useEffect(() => {
    if (joinStartedRef.current) return;
    joinStartedRef.current = true;
    startSession();
  }, []);

  async function handleFirstJoin(e: React.SyntheticEvent) {
    e.preventDefault();
    if (joining) return;
    // Said inline, like on the home page, instead of a button that silently does nothing.
    // The name as the server keeps it: only spaces or invisible marks count as none.
    const name = cutText(nameInput, MAX_NAME);
    if (!name) {
      setNameMissing(true);
      document.getElementById('join-name')?.focus();
      return;
    }
    setJoining(true); setJoinError(null);
    const u: LocalUser = { id: browserId(), name, avatar: avatarInput };
    saveProfile(u);
    const result = await joinServer(u).catch(() => 'offline' as const);
    setJoining(false);
    if (result === 'offline') { setJoinError(result); return; }
    if (result === 'kicked') { markKicked(); return; }
    if (result !== 'ok') { setJoinError(result); setJoinClosed(result === 'closed'); return; }
    const joined = userRef.current ?? u;
    setUser(joined);
    registerTabRef.current?.(joined.id);
    connectSSE();
  }

  async function handleSaveSettings(name: string, avatar: string) {
    if (!user) return;
    const u: LocalUser = { ...user, name, avatar };
    saveProfile(u);
    setUser(u);
    userRef.current = u;
    await joinServer(u).catch(() => { /* SSE will sync */ });
    setNameClashNote(null);
  }

  function flashActionError(message: string, ms = 3000) {
    setActionError(message);
    // A newer message gets its full time (the older one's timer would cut it short).
    if (actionErrorTimerRef.current) clearTimeout(actionErrorTimerRef.current);
    actionErrorTimerRef.current = setTimeout(() => setActionError(null), ms);
  }
  /** Why the server refused, by its code; null for the codes that give no reason (`rejected`, or one we don't know). */
  function refusalText(code: unknown): string | null {
    switch (code) {
      case 'host_only': return t.refusedHostOnly;
      case 'item_gone': return t.refusedItemGone;
      case 'round_changed': return t.refusedRoundChanged;
      case 'spectator': return t.refusedSpectator;
      case 'anonymous_locked': return t.refusedAnonymousLocked;
      case 'server_error': case 'busy': return t.refusedServerError;
      case 'invalid': return t.refusedInvalid;
      case 'too_large': return t.refusedTooLarge;
      case 'rate_limited': return t.actionRateLimited;
      default: return null;
    }
  }
  /** A refusal with a reason is said; a bare one stays quiet (mostly a race the next snapshot settles: a double click, two people at once). */
  function reportRefusal(_status: number, code: unknown) {
    const text = refusalText(code);
    if (text) flashActionError(text, 4000);
  }
  /** Something typed was refused: say so, with the reason when there is one, never drop it silently. */
  function notSaved(_status: number, code: unknown) {
    flashActionError(refusalText(code) ?? t.actionNotSaved, 4000);
  }
  /**
   * For actions where losing a race is no news (two clicks on New Round, or
   * someone else got there first): the room on screen already shows it.
   */
  function quietIfStale(status: number, code: unknown) {
    if (code !== 'round_changed' && code !== 'item_gone') reportRefusal(status, code);
  }

  /**
   * Fire an action. If the server says we're no longer a participant (a
   * server restart, a long absence, an expired cookie) join again and retry
   * once; any other refusal is final: `onRefused` hears about it, or else
   * its reason is said (reportRefusal). A refusal that means our view was
   * behind (`item_gone`, `round_changed`) needs no fetch: the stream
   * brings the room as it is.
   */
  async function roomAction(path: string, body: Record<string, unknown>, attempt = 0, method: 'POST' | 'PATCH' | 'DELETE' = 'POST', onOk?: (data: Record<string, unknown>) => void, onRefused?: (status: number, code: unknown) => void): Promise<boolean> {
    if (!user || kickedRef.current) return false;
    const res = await callRoomApi(roomId, path, body, method);
    if (res === 'network') {
      // Network error — retry up to 2 times with backoff
      if (attempt < 2) {
        await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
        return roomAction(path, body, attempt + 1, method, onOk, onRefused);
      }
      flashActionError(t.actionNetworkErr);
      return false;
    }
    const { data } = res;
    if (res.ok) {
      // Apply the authoritative room the action returns, so our own change
      // shows immediately without waiting for the SSE echo (avoids stale UI).
      if (data && data.id && data.participants) applyRoom(data as unknown as Room);
      if (data) onOk?.(data);
      return true;
    }
    // A crash answers without a code.
    const code = data?.code ?? (res.status >= 500 ? 'server_error' : undefined);
    if (code === 'kicked') { markKicked(); return false; }
    if (code === 'room_not_found') { setRoomGone(true); return false; }
    if (code === 'not_participant' && attempt === 0) {
      const result = await joinServer(userRef.current ?? user).catch(() => 'error' as const);
      if (result === 'ok') {
        // The stream was refused while we weren't a participant; reopen it.
        if (eventSourceRef.current?.readyState !== EventSource.OPEN) connectSSE();
        return roomAction(path, body, 1, method, onOk, onRefused);
      }
      if (result === 'kicked') { markKicked(); return false; }
      // Re-join itself failed — surface to user
      flashActionError(t.actionRejoinFailed, 4000);
      return false;
    }
    if (res.status === 429) flashActionError(t.actionRateLimited);
    else (onRefused ?? reportRefusal)(res.status, code);
    return false;
  }

  async function vote(card: string) {
    primeAudio(); // resume audio context from within this user gesture
    setPendingVote(card); // optimistic — highlight instantly
    await roomAction('vote', { userId: user?.id, card });
    // The response (or a failure) is now applied to `room`; drop the optimistic
    // override so it can never linger into the next round.
    setPendingVote(undefined);
  }

  function toggleSound() {
    primeAudio();
    setSoundOn(prev => {
      const next = !prev;
      soundOnRef.current = next;
      storeSetting('scrumPoker_sound', next ? 'on' : 'off');
      return next;
    });
  }
  async function unvote() {
    setPendingVote(null); // optimistic — deselect instantly
    await roomAction('vote', { userId: user?.id });
    setPendingVote(undefined);
  }
  // Every screen asks at the end of the countdown and one is enough: only a failure on our side is news.
  async function reveal() { await roomAction('reveal', { userId: user?.id }, 0, 'POST', undefined, (status, code) => { if (code === 'server_error') reportRefusal(status, code); }); }

  /** Keep the room (this browser remembers its owner key) or stop keeping it. */
  async function toggleKept() {
    if (!room) return;
    // The owner link stops working for good: ask first.
    if (room.kept) { setConfirmUnkeep(true); return; }
    await roomAction('keep', { kept: true }, 0, 'POST', data => {
      if (typeof data.ownerKey === 'string') rememberOwnedRoom({ id: roomId, name: room.name, key: data.ownerKey });
    }, (status, code) => { if (code === 'kept_full') flashActionError(t.keepFull, 5000); else reportRefusal(status, code); });
  }
  async function stopKeeping() {
    setConfirmUnkeep(false);
    if (await roomAction('keep', { kept: false, ownerKey: ownerKeyFor(roomId) })) forgetOwnedRoom(roomId);
  }
  /** Identifies the round on screen (the history grows by one per finished round). */
  const roundKey = room ? `${room.history.length}:${room.currentItem}` : '';

  async function reset(final: string | null) {
    // fromItem: a double click (or two people at once) starts one round only.
    // final: the estimate the team settled on, recorded with the round.
    await roomAction('reset', { fromItem: room?.currentItem ?? '', ...(final ? { final } : {}) }, 0, 'POST', undefined, quietIfStale);
  }
  async function skipStory() {
    await roomAction('reset', { skip: true, fromItem: room?.currentItem ?? '' }, 0, 'POST', undefined, quietIfStale);
  }
  async function saveStory() {
    const text = storyDraft?.trim();
    setStoryDraft(null);
    if (!text || text === room?.currentItem) return;
    // Refused or lost on the way: the field comes back with the text in it, for another try.
    if (!await roomAction('item', { item: text, rename: true }, 0, 'POST', undefined, notSaved)) setStoryDraft(cur => cur ?? text);
  }
  /** Where a queued story is now: the row it was on, or wherever it moved to (-1 once it's gone or changed). */
  function queueIndexOf(item: string, index: number): number {
    const queue = room?.queue ?? [];
    return queue[index] === item ? index : queue.indexOf(item);
  }
  async function moveQueueItem(index: number, to: number, control: QueueControl) {
    queueFocusRef.current = { index: to, control };
    if (!await roomAction('queue', { op: 'move', index, to, item: room?.queue[index] }, 0, 'PATCH')) queueFocusRef.current = null;
  }
  /**
   * The story being edited was changed or removed by someone else: what was
   * typed waits in the box for new stories, with the reason (on another
   * story's row it would rename that one).
   */
  function rescueQueueDraft(draft: { item: string; text: string }) {
    const text = draft.text.trim();
    if (!text || text === draft.item) return;
    setQueueInput(prev => (prev.trim() ? `${prev.replace(/\n+$/, '')}\n${text}` : text));
    flashActionError(t.refusedItemGone, 4000);
    // Typing goes on there, if the field it was in is gone.
    if (!document.activeElement || document.activeElement === document.body) queueInputRef.current?.focus();
  }
  const draftGone = queueDraft !== null && queueIndexOf(queueDraft.item, queueDraft.index) === -1;
  const dropGoneDraft = useEffectEvent(() => {
    if (!queueDraft) return;
    setQueueDraft(null);
    rescueQueueDraft(queueDraft);
  });
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the queue changed under the field (a stream snapshot)
    if (draftGone) dropGoneDraft();
  }, [draftGone]);
  async function saveQueueItem() {
    const draft = queueDraft;
    setQueueDraft(null);
    const text = draft?.text.trim();
    if (!draft || !text || text === draft.item) return;
    const index = queueIndexOf(draft.item, draft.index);
    if (index === -1) { rescueQueueDraft(draft); return; }
    const ok = await roomAction('queue', { op: 'edit', index, item: draft.item, text }, 0, 'PATCH', undefined, notSaved);
    // Kept as typed for another try (once the stream has the queue as it is, the story is found where it went).
    if (!ok) setQueueDraft(cur => cur ?? { ...draft, index, text });
  }
  async function makeHost(targetId: string) {
    await roomAction('host', { targetId });
  }
  async function changeSetting(key: SettingSwitch, value: boolean) {
    await roomAction('settings', { [key]: value });
  }
  /** The issue link pattern; false when the server refused it (not https, no {key}). */
  async function changeIssueUrl(url: string): Promise<boolean> {
    let invalid = false;
    // The menu says why a link is wrong; any other refusal is said here.
    const ok = await roomAction('settings', { issueUrl: url }, 0, 'POST', undefined, (status, code) => { if (status === 400) invalid = true; else reportRefusal(status, code); });
    return ok || !invalid;
  }
  /** Put a finished story up for estimating again (current story, or next in line). */
  async function reestimate(story: string) {
    await roomAction('queue', { requeue: story });
  }
  async function react(emoji: string, targetId: string | null) {
    setReactPicker(null);
    await roomAction('react', targetId ? { emoji, targetId } : { emoji });
  }
  function setTimerLimit(ms: number) {
    setShowTimerMenu(false);
    void roomAction('timer', { action: 'limit', ms });
  }
  function dismissHint() {
    setShowHint(false);
    storeSetting('scrumPoker_roomHintSeen', '1');
  }

  async function sendChatMessage() {
    if (!user || !chatInput.trim()) return;
    const text = chatInput.trim();
    setChatInput('');
    const ok = await roomAction('chat', { userId: user.id, text }, 0, 'POST', undefined, notSaved);
    if (!ok) {
      // Restore input so user can retry (unless a new message is being typed already)
      setChatInput(prev => prev || text);
    }
  }

  // Auto-scroll chat to bottom, also when it opens on older messages
  useEffect(() => {
    if (chatOpen) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatOpen]);

  // Close deck picker / custom input on click outside. React listens on the
  // document too, so stopPropagation inside can't keep a click from here:
  // a click in the custom deck field would close it (and its form with it).
  const deckWrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showDeckPicker && !showCustomInput) return;
    function handleClick(e: MouseEvent) {
      if (e.target instanceof Node && deckWrapRef.current?.contains(e.target)) return;
      setShowDeckPicker(false); setShowCustomInput(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showDeckPicker, showCustomInput]);

  // Keyboard focus moves into the header popovers and back out when they close.
  const shareRef = useRef<HTMLDivElement>(null);
  const deckMenuRef = useRef<HTMLDivElement>(null);
  const customRef = useRef<HTMLDivElement>(null);
  useFocusTrap(shareRef, showShare);
  useFocusTrap(deckMenuRef, showDeckPicker, { trap: false });
  useFocusTrap(customRef, showCustomInput);

  // Escape closes the header popovers (share / deck picker / custom deck)
  useEffect(() => {
    if (!showShare && !showDeckPicker && !showCustomInput) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      setShowShare(false); setShowDeckPicker(false); setShowCustomInput(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showShare, showDeckPicker, showCustomInput]);

  const revealNow = useEffectEvent(() => { void reveal(); });
  useEffect(() => {
    if (countdown === null) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the countdown is a timer: each tick sets the next
    if (countdown === 0) { setCountdown(null); revealNow(); return; }
    const t = setTimeout(() => setCountdown(c => (c ?? 1) - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Drop the optimistic vote override once the server agrees, or the round moved on.
  useEffect(() => {
    if (pendingVote === undefined) return;
    const serverVote = (user && room?.votes) ? (room.votes[user.id] ?? null) : null;
    if (serverVote === pendingVote || room?.revealed || room?.locked) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- follows the server state that just arrived
      setPendingVote(undefined);
    }
  }, [room, user, pendingVote]);

  // Lazy-generate the invite QR when the share menu opens
  useEffect(() => {
    if (!showShare || !room?.id) return;
    let alive = true;
    inviteQr(`${window.location.origin}/room/${room.id}`)
      .then(url => { if (alive) setQrDataUrl(url); })
      .catch(() => {});
    return () => { alive = false; };
  }, [showShare, room?.id]);

  // The story parser, ready for a paste by the time the queue panel is open.
  useEffect(() => {
    if (showQueue) loadStoryImport().catch(() => { /* offline: pasting stays plain text */ });
  }, [showQueue]);

  // A story moved or removed: its row (or its neighbour's) is a new one, and the
  // keyboard was on the old. It goes to the same control there, or the row's
  // first one that works, unless it has moved on to something else meanwhile.
  useEffect(() => {
    const want = queueFocusRef.current;
    if (!want) return;
    queueFocusRef.current = null;
    if (document.activeElement && document.activeElement !== document.body) return;
    const row = document.querySelector(`[data-queue-row="${want.index}"]`);
    const shown = [...(row?.querySelectorAll<HTMLButtonElement>('[data-queue-control]') ?? [])].filter(b => b.offsetParent !== null && !b.disabled);
    (shown.find(b => b.dataset.queueControl === want.control) ?? shown[0])?.focus();
  }, [room?.queue]);

  // Keep room token cookie alive while user is in the room (sliding expiration)
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      fetch(`/api/rooms/${roomId}/refresh`, {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }, body: '{}',
      }).catch(() => {});
    }, 30 * 60 * 1000); // 30 minutes
    return () => clearInterval(interval);
  }, [user, roomId]);

  async function kick(targetId: string) {
    await roomAction('kick', { userId: user?.id, targetId });
  }

  async function nudge(targetId: string) {
    // Per-target cooldown so a double-click doesn't buzz someone twice.
    if (nudgeCooldownRef.current.has(targetId)) return;
    nudgeCooldownRef.current.add(targetId);
    setTimeout(() => nudgeCooldownRef.current.delete(targetId), 3000);
    setNudgeSent(targetId);
    setTimeout(() => setNudgeSent(prev => (prev === targetId ? null : prev)), 1200);
    await roomAction('nudge', { targetId });
  }

  async function startReveal() {
    if (await roomAction('lock', {}, 0, 'POST', undefined, quietIfStale)) setCountdown(3);
  }
  /** Add stories after the queued ones; false when they weren't added. */
  async function loadQueue(items: string[]): Promise<boolean> {
    // The ref answers at once: a fast second click comes before the button re-renders as busy.
    if (!user || queueSendingRef.current) return false;
    queueSendingRef.current = true;
    setQueueSending(true);
    const ok = await roomAction('queue', { items, append: true }, 0, 'POST', undefined, notSaved);
    queueSendingRef.current = false;
    setQueueSending(false);
    if (ok && items.length > 0) {
      setQueueAddedCount(items.length);
      setTimeout(() => setQueueAddedCount(0), 2500);
    }
    if (ok) setQueueInput('');
    return ok;
  }
  /** Empty the queue and the current story. */
  async function clearQueue() {
    await roomAction('queue', { items: [] });
  }
  async function removeQueueItem(index: number, control: QueueControl) {
    const length = room?.queue.length ?? 0;
    // The keyboard goes on to the story that takes its place (or the one before the last).
    queueFocusRef.current = length > 1 ? { index: Math.min(index, length - 2), control } : null;
    // The story's text too: if the queue moved meanwhile, the server finds it.
    if (!await roomAction('queue', { index, item: room?.queue[index] }, 0, 'DELETE')) queueFocusRef.current = null;
  }
  /** Copy the session's rounds: CSV for spreadsheets, Markdown for tickets and wikis. */
  function exportResults(format: 'csv' | 'md') {
    if (!room) return;
    const rows = room.history.map((r, i) => ({
      story: roundLabel(r, i),
      final: r.final ?? '',
      result: roundResult(r),
      votes: voteList(r),
    }));
    const head = [t.colStory, t.colFinal, t.colResult, t.colVotes];
    const text = format === 'csv'
      ? [head, ...rows.map(r => [r.story, r.final, r.result, r.votes])].map(row => row.map(csvField).join(',')).join('\n')
      : [`| ${head.map(mdCell).join(' | ')} |`, '| --- | --- | --- | --- |',
        ...rows.map(r => `| ${[r.story, r.final || '—', r.result, r.votes].map(mdCell).join(' | ')} |`)].join('\n');
    copyText(text, () => { setExportCopied(format); setTimeout(() => setExportCopied(null), 2000); });
  }
  /**
   * The session as a CSV file for trackers. The column names stay English
   * (what Jira's importer maps); Story Points only when the final is a number.
   */
  function downloadCsv() {
    if (!room) return;
    const rows = room.history.map((r, i) => {
      const { key, summary } = splitIssueKey(roundLabel(r, i));
      const final = r.final ?? '';
      const points = cardValue(final);
      const nums = numericVotes(r);
      const mid = median(nums);
      return [key, summary, final && !isNaN(points) ? String(points) : '', final,
        nums.length ? formatNum(nums.reduce((a, b) => a + b, 0) / nums.length) : '', mid === null ? '' : formatNum(mid), voteList(r)];
    });
    const text = [['Issue key', 'Summary', 'Story Points', 'Final', 'Average', 'Median', 'Votes'], ...rows]
      .map(row => row.map(csvField).join(',')).join('\r\n');
    // The BOM tells Excel the file is UTF-8.
    saveFile(`scrum-poker-${room.id}-${localDate()}.csv`, `\uFEFF${text}\r\n`, 'text/csv;charset=utf-8');
  }
  /** A round's story, or "Round n" when it had none. */
  function roundLabel(r: RoundHistory, index: number): string {
    return r.item || fill(t.historyRoundN, { n: index + 1 });
  }
  async function changeDeck(dt: DeckType, custom?: string[]) {
    const ok = await roomAction('deck', { userId: user?.id, deckType: dt, ...(custom ? { customCards: custom } : {}) }, 0, 'POST', undefined, custom ? notSaved : undefined);
    setShowDeckPicker(false);
    // Typed cards that weren't taken: the field opens again with them, for another try.
    if (!ok && custom) { setCustomCardsInput(custom.join(', ')); setCustomCardsInvalid(false); setShowCustomInput(true); }
  }
  function copyCode() {
    const url = `${window.location.origin}/room/${roomId}`;
    copyText(url, () => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  // Dashboard analytics — expensive, recompute only when history changes
  const dashboard = useMemo(() => {
    const h = room?.history ?? [];
    if (h.length === 0) return null;
    const totalRounds = h.length;

    const allNums: number[] = [];
    h.forEach(r => allNums.push(...numericVotes(r)));
    const avgEst = allNums.length ? (allNums.reduce((a, b) => a + b, 0) / allNums.length).toFixed(1) : null;

    const consensusRounds = h.filter(r => {
      const cards = Object.values(r.votes).map(v => v.card).filter(c => c !== '?' && c !== '☕');
      return cards.length > 1 && new Set(cards).size === 1;
    }).length;
    const consensusRate = totalRounds > 0 ? Math.round((consensusRounds / totalRounds) * 100) : 0;

    // Counted per person, not per name (two Aleynas are two voters); anonymous rounds have no names.
    const voterCount: Record<string, { name: string; count: number }> = {};
    h.forEach(r => Object.entries(r.votes).forEach(([uid, v]) => {
      if (v.name) voterCount[uid] = { name: v.name, count: (voterCount[uid]?.count ?? 0) + 1 };
    }));
    const topEntry = Object.entries(voterCount).sort((a, b) => b[1].count - a[1].count)[0];
    const voterLookalikes = lookalikeIds(Object.entries(voterCount).map(([uid, v]) => [uid, v.name] as const));
    const topVoter = topEntry ? { id: topEntry[0], name: topEntry[1].name, tagged: voterLookalikes.has(topEntry[0]) } : null;

    const numericRounds = h.filter(r => numericVotes(r).length > 0).slice(-8);
    const avgs = numericRounds.map(r => {
      const nums = numericVotes(r);
      return nums.reduce((a, b) => a + b, 0) / nums.length;
    });
    const maxAvg = avgs.length ? Math.max(...avgs) : 0;

    // What the team agreed on: the stories with a final estimate, and their points.
    const finals = h.filter(r => r.final);
    const agreedPoints = finals.map(r => cardValue(r.final ?? '')).filter(n => !isNaN(n));
    const agreedTotal = agreedPoints.length ? formatNum(agreedPoints.reduce((a, b) => a + b, 0)) : null;

    return { totalRounds, avgEst, consensusRate, topVoter, numericRounds, avgs, maxAvg, agreedTotal, estimated: finals.length };
  }, [room?.history]);

  // Memoized derived values — avoid re-computing on unrelated state changes
  const derived = useMemo(() => {
    if (!room || !user) return null;
    const deckType = (room.deckType ?? 'fibonacci') as DeckType;
    const participants = Object.values(room.participants ?? {});
    const voters = participants.filter(p => !p.spectator);
    const isMeSpectator = Boolean(room.participants[user.id]?.spectator);
    const myVote = room.votes[user.id];
    const votedCount = Object.keys(room.votes ?? {}).length;
    // The revealed cards: per person, or in anonymous rooms just the cards.
    const anonymous = Boolean(room.anonymousVotes);
    const voteRecord: Record<string, string> = room.anonymousVotes
      ? Object.fromEntries(room.anonymousVotes.map((v, i) => [`a${i}`, v]))
      : room.votes;
    const stats = room.revealed ? calcStats(voteRecord, deckType) : null;
    const cards = getCards(room);
    const allVoted = voters.length > 0 && votedCount === voters.length;
    const isConsensus = !!(stats && votedCount > 1 && (
      (stats.type === 'numeric' && stats.min === stats.max && stats.allNumeric) ||
      (stats.type === 'freq' && stats.top.length === 1 && stats.top[0][0] !== '?' && stats.top[0][0] !== '☕')
    ));
    const isCreator = room.creatorId === user.id;
    // Suggested estimate — computed for every deck type so all decks are consistent.
    let suggested: string | null = null;
    if (room.revealed && stats) {
      if (stats.type === 'numeric') {
        // Nearest numeric deck card to the average (ties round up).
        const avgNum = Number(stats.avg);
        const numericCards = cards
          .map(c => ({ c, n: cardValue(c) }))
          .filter(({ n }) => !isNaN(n));
        if (numericCards.length && !isNaN(avgNum)) {
          let best = numericCards[0];
          for (const cand of numericCards) {
            const d = Math.abs(cand.n - avgNum);
            const bd = Math.abs(best.n - avgNum);
            if (d < bd || (d === bd && cand.n > best.n)) best = cand;
          }
          suggested = best.c;
        }
      } else if (deckType === 'tshirt') {
        // Nearest size to the average (same idea, mapped onto the size scale).
        suggested = stats.tshirtAvg;
      } else {
        // Non-numeric custom deck: the most-voted card (mode), ignoring ? / ☕.
        const topReal = stats.top.find(([v]) => !SPECIAL_CARDS.has(v));
        suggested = topReal ? topReal[0] : null;
      }
    }
    // The headline result: the agreed card (as played: ½, not 0.5), else the suggested one.
    const heroValue = !stats ? null : isConsensus
      ? (stats.type === 'numeric' ? (Object.values(voteRecord).find(v => !SPECIAL_CARDS.has(v)) ?? String(stats.min)) : (stats.top[0] ? stats.top[0][0] : null))
      : suggested;
    // Cards the team may settle on: those played (in deck order), plus the suggestion;
    // "More…" opens the rest of the deck.
    const deckFinals = cards.filter(c => !SPECIAL_CARDS.has(c));
    const finalOptions = !stats ? [] : deckFinals.filter(c => Object.values(voteRecord).includes(c) || c === heroValue);
    // Whoever played the lowest and the highest card says why, when they are
    // at least two cards apart and the round had three numeric votes or more.
    let outliers: { low: string; high: string } | null = null;
    if (stats?.type === 'numeric' && !anonymous) {
      const played = Object.values(voteRecord).filter(v => !isNaN(cardValue(v)));
      if (played.length >= 3) {
        const low = played.reduce((a, b) => (cardValue(b) < cardValue(a) ? b : a));
        const high = played.reduce((a, b) => (cardValue(b) > cardValue(a) ? b : a));
        if (cards.indexOf(high) - cards.indexOf(low) >= 2) outliers = { low, high };
      }
    }
    // The host can keep the round to themself; while they're away anyone runs it (as the server does).
    const host = room.participants[room.creatorId];
    const canRun = !room.settings?.hostRuns || isCreator || !host || Boolean(host.away);
    // People whose names read alike: each gets a tag beside the name.
    const lookalikes = lookalikeIds(participants.map(p => [p.id, p.name] as const));
    return { deckType, participants, voters, isMeSpectator, myVote, votedCount, stats, cards, allVoted, isConsensus, isCreator, suggested, anonymous, voteRecord, heroValue, finalOptions, deckFinals, outliers, canRun, lookalikes };
  }, [room, user]);

  // The chat's authors as their messages name them, and the people here now: a
  // message from one of two Aleynas says which (one may have left, or renamed).
  const chatLookalikes = useMemo(() => lookalikeIds([
    ...Object.values(room?.participants ?? {}).map(p => [p.id, p.name] as const),
    ...chatMessages.map(m => [m.userId, m.userName] as const),
  ]), [room?.participants, chatMessages]);

  // Load persisted sound preference once on mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- storage exists only in the browser, after mount
    if (readSetting('scrumPoker_sound') === 'off') { setSoundOn(false); soundOnRef.current = false; }
  }, []);

  // Play chimes on key transitions: votes revealed, and when only one voter is left.
  useEffect(() => {
    if (!room || !derived) return;
    const revealed = !!room.revealed;
    const oneLeft = !revealed && derived.voters.length >= 2 && derived.votedCount === derived.voters.length - 1;
    if (!soundInitRef.current) {
      // Seed edge-detection on first snapshot so joining an already-revealed
      // (or already one-left) room doesn't fire a chime.
      soundInitRef.current = true;
      prevRevealedRef.current = revealed;
      prevOneLeftRef.current = oneLeft;
      return;
    }
    if (revealed && !prevRevealedRef.current && soundOnRef.current) playReveal();
    prevRevealedRef.current = revealed;
    if (oneLeft && !prevOneLeftRef.current && soundOnRef.current) playLastVoter();
    prevOneLeftRef.current = oneLeft;
  }, [room, derived]);

  // The emoji picker and the timer menu close on a click elsewhere or Escape.
  const reactRef = useRef<HTMLDivElement>(null);
  const timerMenuRef = useRef<HTMLDivElement>(null);
  useFocusTrap(reactRef, reactPicker !== null, { trap: false });
  useFocusTrap(timerMenuRef, showTimerMenu, { trap: false });
  useEffect(() => {
    if (reactPicker === null && !showTimerMenu) return;
    function close() { setReactPicker(null); setShowTimerMenu(false); }
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') close(); }
    document.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [reactPicker, showTimerMenu]);

  /** A card chosen with the keyboard (never takes the vote back, unlike clicking it again). */
  function keyVote(card: string) {
    const current = pendingVote === undefined ? derived?.myVote : (pendingVote ?? undefined);
    if (card !== current) void vote(card);
  }
  // Keyboard shortcuts: type a card value to vote (digits wait a moment for
  // the next one: 1 then 3 is 13), ? / c / h for ?, ☕ and ½, Escape takes the
  // vote back, r reveals, n starts the next round. Never while typing, in a
  // menu or dialog, or with a modifier held.
  const onShortcut = useEffectEvent((e: KeyboardEvent) => {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.isComposing || e.repeat) return;
    if (!room || !derived || isTextTarget(e.target) || overlayOpen()) return;
    const voting = !room.revealed && !room.locked && countdown === null && !derived.isMeSpectator;
    const key = e.key;
    const lower = key.toLowerCase();
    if (key === 'Escape') {
      const current = pendingVote === undefined ? derived.myVote : (pendingVote ?? undefined);
      if (voting && current) { e.preventDefault(); void unvote(); }
      return;
    }
    if (lower === 'r') {
      if (derived.canRun && !room.revealed && !room.locked && countdown === null && derived.votedCount > 0) { e.preventDefault(); void startReveal(); }
      return;
    }
    if (lower === 'n') {
      if (derived.canRun && room.revealed) { e.preventDefault(); void reset(finalPick?.round === roundKey ? finalPick.value : derived.heroValue); }
      return;
    }
    if (!voting) return;
    const special = key === '?' ? '?' : lower === 'c' ? '☕' : (lower === 'h' || key === '.') ? '½' : null;
    if (special) {
      if (derived.cards.includes(special)) { e.preventDefault(); keyVote(special); }
      return;
    }
    if (key.length !== 1 || key === ' ') return;
    const buffer = keyBufferRef.current;
    if (buffer.timer) clearTimeout(buffer.timer);
    buffer.timer = null;
    const startingWith = (text: string) => derived.cards.filter(c => c.toLowerCase().startsWith(text));
    // A key that can't continue what was typed starts over.
    let text = buffer.text + lower;
    if (!startingWith(text).length) text = lower;
    const candidates = startingWith(text);
    buffer.text = '';
    if (!candidates.length) return;
    e.preventDefault();
    const exact = candidates.find(c => c.toLowerCase() === text);
    if (exact && candidates.length === 1) { keyVote(exact); return; }
    buffer.text = text;
    buffer.timer = setTimeout(() => {
      buffer.text = '';
      buffer.timer = null;
      if (exact) keyVote(exact);
    }, KEY_BUFFER_MS);
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => onShortcut(e);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // A tab in the background says in its title what happened meanwhile.
  useEffect(() => {
    function onVisibility() {
      setTabHidden(document.hidden);
      if (!document.hidden) setTabNudged(false);
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);
  const titleRef = useRef<{ saved: string | null; wasRevealed: boolean; revealedHidden: boolean }>({ saved: null, wasRevealed: false, revealedHidden: false });
  useEffect(() => {
    const state = titleRef.current;
    const restore = () => {
      if (state.saved !== null) document.title = state.saved;
      state.saved = null;
    };
    if (!room || !derived || !tabHidden) {
      restore();
      state.revealedHidden = false;
      state.wasRevealed = Boolean(room?.revealed);
      return;
    }
    if (room.revealed && !state.wasRevealed) state.revealedHidden = true;
    if (!room.revealed) state.revealedHidden = false;
    state.wasRevealed = room.revealed;
    const yourTurn = !room.revealed && !derived.isMeSpectator && !derived.myVote
      && derived.voters.length >= 2 && derived.votedCount === derived.voters.length - 1;
    const text = tabNudged ? t.tabNudged : state.revealedHidden ? t.tabRevealed : yourTurn ? t.tabYourTurn : null;
    if (text === null) { restore(); return; }
    // Not `??=`: the React Compiler can't handle it, and would skip the whole component.
    if (state.saved === null) state.saved = document.title;
    document.title = fill(text, { room: room.name });
  }, [room, derived, tabHidden, tabNudged, t]);
  // Leaving the room page: its title is the next page's business.
  useEffect(() => {
    const state = titleRef.current;
    return () => { if (state.saved !== null) document.title = state.saved; };
  }, []);

  /* ── Still deciding between auto-join and the join form ── */
  if (!user && !bootstrapped && !roomGone) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" role="status" aria-live="polite">
        <span className="sr-only">{t.btnJoining}</span>
        <LogoMark size={40} />
      </div>
    );
  }

  /* ── Closed to new people: nothing to fill in ── */
  if (!user && !roomGone && joinClosed) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-strong rounded-xl p-8 text-center w-full max-w-sm animate-pop-in">
        <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-accent-50 dark:bg-accent-500/15 text-accent-600 dark:text-accent-400 flex items-center justify-center">
          <IconLock size={26} strokeWidth={1.75} />
        </div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 wrap-anywhere" dir="auto">{roomName ?? t.roomClosed}</h1>
        <p role="alert" className="text-slate-600 dark:text-slate-300 text-sm mb-5">{t.errRoomClosed}</p>
        <Link href={localizedPath(locale, '/')} prefetch={false} className="btn-primary inline-flex items-center justify-center h-11 px-5 rounded-lg text-white font-semibold text-sm">{t.btnHome}</Link>
      </div>
    </div>
  );

  /* ── First join screen ── */
  if (!user && !roomGone) {
    const preview: Participant = { id: 'p', name: nameInput || '?', avatar: avatarInput };
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-strong rounded-xl w-full max-w-sm overflow-hidden animate-pop-in">
          <div className="px-5 pt-6 pb-3 flex flex-col items-center text-center">
            <div className="mb-2"><LogoMark size={40} /></div>
            {/* Which room this is: the name the team gave it, under "Join room". */}
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {t.joinTitle}
              {roomName && <span className="block mt-0.5 text-base font-medium text-slate-600 dark:text-slate-300 wrap-anywhere" dir="auto">{roomName}</span>}
            </h1>
          </div>
          <form onSubmit={handleFirstJoin} noValidate className="px-5 pb-5 space-y-3">
            <div>
              <div className="flex items-center gap-3">
                <Avatar p={preview} size="md" />
                <input id="join-name" type="text" value={nameInput} onChange={e => { setNameInput(e.target.value); setNameMissing(false); }} onPaste={e => pasteOneLine(e)} dir="auto" placeholder={t.nameLabel} aria-label={t.nameLabel} required autoFocus maxLength={MAX_NAME}
                  aria-invalid={nameMissing} aria-describedby={nameMissing ? 'join-name-error' : undefined}
                  className={`${FIELD} flex-1 min-w-0 h-10 px-3 rounded-lg text-base sm:text-sm ${nameMissing ? 'border-red-400 dark:border-red-500/70' : FIELD_EDGE}`}
                />
              </div>
              {nameMissing && <p id="join-name-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 animate-pop-in">{t.errNameRequired}</p>}
            </div>
            <AvatarPicker value={avatarInput} initial={initialOf(nameInput, locale) || '?'} onChange={setAvatarInput} label={rt.avatar} />
            {joinError && <p role="alert" className="text-red-600 dark:text-red-400 text-xs flex items-center gap-1.5"><IconAlert size={14} className="shrink-0" />{joinErrorText(joinError)}</p>}
            <button type="submit" disabled={joining} className="btn-primary w-full min-h-11 py-2.5 rounded-lg text-white font-semibold text-sm">
              {joining ? t.btnJoining : t.btnJoinShort}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (roomGone) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-strong rounded-xl p-8 text-center max-w-xs animate-pop-in">
        <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-accent-50 dark:bg-accent-500/15 text-accent-600 dark:text-accent-400 flex items-center justify-center">
          <IconDoor size={28} strokeWidth={1.75} />
        </div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">{kicked ? t.kickedTitle : t.roomGoneTitle}</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-5">{kicked ? t.kickedSub : t.roomGoneSub}</p>
        <Link href={localizedPath(locale, '/')} prefetch={false} className="btn-primary inline-flex items-center justify-center h-11 px-5 rounded-lg text-white font-semibold text-sm">{t.btnHome}</Link>
      </div>
    </div>
  );

  if (!user) return null;
  if (!room) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center" role="status">
        <div className="mb-3 inline-block"><LogoMark size={44} /></div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{t.connecting}</p>
      </div>
    </div>
  );

  const { deckType, participants, voters, isMeSpectator, myVote, votedCount, stats, cards, allVoted, isConsensus, isCreator, suggested, anonymous, voteRecord, heroValue, finalOptions, deckFinals, outliers, canRun, lookalikes } = derived!;
  const settings: MenuSettings = { ...DEFAULT_SETTINGS, ...room.settings };
  // The picker shows every card of the deck once someone asked for more.
  const shownFinals = finalMoreRound === roundKey ? deckFinals : finalOptions;
  // The final estimate shown as picked: the team's pick for this round, else the headline result.
  const chosenFinal = finalPick?.round === roundKey ? finalPick.value : heroValue;
  // Optimistic selection overlays server state for instant feedback.
  const effectiveVote = pendingVote === undefined ? myVote : (pendingVote ?? undefined);
  const effectiveVotedCount = votedCount + (Boolean(effectiveVote) === Boolean(myVote) ? 0 : (effectiveVote ? 1 : -1));

  /* ── Presentation helpers ── */
  const canChangeDeck = isCreator && !room.locked && !room.revealed;
  const deckOptions: DeckOption[] = [
    { value: 'scrum', label: t.deckScrum, Icon: IconLayers },
    { value: 'fibonacci', label: t.deckFibonacci, Icon: IconHash },
    { value: 'tshirt', label: t.deckTshirt, Icon: IconShirt },
    { value: 'powers', label: t.deckPowers, Icon: IconZap },
    { value: 'custom', label: t.deckCustomLabel, Icon: IconPencil },
  ];
  const deckLabelOf = (value: DeckType) => deckOptions.find(o => o.value === value)?.label ?? value;
  const deckLabel = deckLabelOf(deckType);
  // The cards as the server keeps them (cleaned, duplicates once), and how many different ones were typed.
  const typedCards = splitCardInput(customCardsInput);
  const customCards = cleanCustomCards(typedCards);
  const typedCardCount = new Set(typedCards.map(c => cutText(c, MAX_CARD)).filter(Boolean)).size;
  function applyCustomDeck() {
    if (customCards.length < MIN_CUSTOM_CARDS) {
      setCustomCardsInvalid(true);
      customInputRef.current?.focus();
      return;
    }
    void changeDeck('custom', customCards);
    setShowCustomInput(false);
  }
  // The story being edited: on its row, or wherever it moved meanwhile (gone: see dropGoneDraft).
  const draftRow = queueDraft ? queueIndexOf(queueDraft.item, queueDraft.index) : -1;
  // The phone menu of a queued story, while that story is still on its row.
  const openQueueMenu = queueMenu && canRun && room.queue[queueMenu.index] === queueMenu.item ? queueMenu : null;
  // Stories that still fit in the queue (the server cuts it to 100 before the first moves up to current).
  const queueRoom = Math.max(0, MAX_QUEUE - room.queue.length);
  // The typed lines as stories (blank lines and invisible marks are none).
  const typedStories = queueInput.split('\n').map(line => cutText(line, MAX_STORY)).filter(Boolean);
  async function importFromFile(file: File | undefined) {
    if (!file) return;
    const [text, { parseStories }] = await Promise.all([file.text().catch(() => ''), loadStoryImport()]);
    setImportPreview(parseStories(text));
  }
  /**
   * Cells pasted from a spreadsheet: with a header row they're read like a
   * file (preview first); without one each row becomes a line. Plain lines
   * are the browser's own paste (so undo keeps working).
   */
  function pasteStories(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const text = e.clipboardData.getData('text/plain');
    const { selectionStart: from, selectionEnd: to } = e.currentTarget;
    const put = (parsed: ParsedStories | null) => {
      if (parsed && parsed.columns.length > 0) { setImportPreview(parsed); return; }
      const insert = parsed && text.includes('\t') ? parsed.stories.join('\n') : text;
      setQueueInput(prev => prev.slice(0, from) + insert + prev.slice(to));
    };
    if (storyImport) {
      const parsed = storyImport.parseStories(text);
      if (parsed.columns.length === 0 && !text.includes('\t')) return;
      e.preventDefault();
      put(parsed);
      return;
    }
    // The parser is still on its way (the queue was opened a moment ago): hold the paste for it.
    e.preventDefault();
    loadStoryImport().then(m => put(m.parseStories(text)), () => put(null));
  }
  async function addImported() {
    const preview = importPreview;
    if (!preview) return;
    const fits = preview.stories.slice(0, queueRoom);
    setImportPreview(null);
    // Not added: the preview comes back, for another try.
    if (fits.length && !await loadQueue(fits)) setImportPreview(cur => cur ?? preview);
  }
  const DeckIcon = DECK_ICONS[deckType] ?? IconLayers;
  // The reveal turns the seats' cards over one after another, all of them within 200ms.
  const flipStep = participants.length > 1 ? Math.min(40, 200 / (participants.length - 1)) : 0;
  // From lg a hand that fits one row fans out: up to 12° from end to end, the outer cards 6px lower.
  const fanHand = cards.length >= 4 && cards.length <= 13;
  const fanStep = fanHand ? Math.min(1.2, 12 / (cards.length - 1)) : 0;
  const fanDrop = fanHand ? 6 / ((cards.length - 1) / 2) ** 2 : 0;
  const specShort = t.specGoBreak.split(/[(（]/)[0].trim();
  const pickDeck = (value: DeckType) => {
    if (value === 'custom') {
      setShowDeckPicker(false);
      setCustomCardsInput(room.customCards?.join(', ') ?? '');
      setCustomCardsInvalid(false);
      setShowCustomInput(true);
    } else {
      changeDeck(value);
    }
  };
  const toggleChat = () => {
    setChatOpen(prev => { const next = !prev; chatOpenRef.current = next; return next; });
    setUnreadChat(0);
  };
  /** Escape in the chat closes it, and the keyboard goes back to the chat button. */
  const closeChat = () => {
    setChatOpen(false);
    chatOpenRef.current = false;
    chatButtonRef.current?.focus();
  };

  return (
    <>
      {showSettings && (
        <SettingsModal user={user} others={participants.filter(p => p.id !== user.id)} onSave={handleSaveSettings} onClose={() => setShowSettings(false)} />
      )}
      {showShortcuts && <ShortcutsDialog onClose={() => setShowShortcuts(false)} />}
      {confirmUnkeep && (
        <ConfirmDialog title={t.stopKeepingTitle} message={t.stopKeepingConfirm} confirmLabel={t.keptRoomsRemove} cancelLabel={t.btnCancel} closeLabel={rt.close}
          onConfirm={() => { void stopKeeping(); }} onCancel={() => setConfirmUnkeep(false)} />
      )}

      {/* Nudge toast */}
      {nudgeToast && (
        <div role="status" className="fixed top-[calc(env(safe-area-inset-top)+1rem)] left-1/2 -translate-x-1/2 z-[60] max-w-[calc(100vw-2rem)] px-4 py-2 rounded-lg glass-strong border border-amber-300 dark:border-amber-500/40 text-sm font-semibold text-amber-800 dark:text-amber-300 animate-pop-in flex items-center gap-2">
          <IconBell size={16} className="shrink-0" />
          {/* A long name wraps (anywhere, if it must) rather than pushing the message off the screen */}
          <span className="min-w-0 wrap-anywhere"><bdi>{nudgeToast}</bdi> {t.nudgedYou}</span>
        </div>
      )}

      <div className={`min-h-screen flex flex-col ${ZH_EYEBROWS} ${shake ? 'animate-shake' : ''}`}>
        {/* ── Header ── */}
        {/* Above the chat panel and the room's own popovers: its menus (More is a tall one) open over them */}
        <header className="glass border-b border-slate-200 dark:border-slate-800 sticky top-0 z-[55]" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
          <div className="max-w-4xl mx-auto px-3 h-14 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {/* Not prefetched: the home page is rarely where a room session goes next. */}
              <Link href={localizedPath(locale, '/')} prefetch={false} aria-label={t.btnHome} title={t.btnHome}
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg border border-transparent flex items-center justify-center hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0">
                <LogoMark size={22} />
              </Link>
              <h1 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base truncate min-w-0" title={room.name} dir="auto">{room.name}</h1>
              {settings.closed && (
                <span className="shrink-0 inline-flex items-center gap-1 h-6 px-2 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300" title={t.errRoomClosed}>
                  <IconLock size={11} /><span className="max-sm:sr-only">{t.roomClosed}</span>
                </span>
              )}
              <div className="relative max-sm:static shrink-0">
                <button
                  type="button"
                  onClick={() => setShowShare(p => !p)}
                  aria-haspopup="dialog"
                  aria-expanded={showShare}
                  aria-label={t.shareRoom}
                  title={t.shareRoom}
                  className={`${HDR_BTN} gap-1.5 w-10 sm:w-auto sm:px-2.5 text-xs font-semibold ${showShare ? ACTIVE_BTN : ''}`}
                >
                  <IconLink size={16} />
                  <span className="hidden sm:inline">{t.shareRoom}</span>
                </button>
                {showShare && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowShare(false)} />
                    <div ref={shareRef} role="dialog" aria-label={t.shareRoom}
                      className="z-50 glass-strong rounded-xl animate-pop-in p-3 space-y-2 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain max-sm:fixed max-sm:inset-x-3 max-sm:top-[calc(env(safe-area-inset-top)+4rem)] sm:absolute sm:start-0 sm:top-full sm:mt-2 sm:w-64">
                      <p className="eyebrow">{t.shareRoom}</p>
                      <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-xs font-mono text-slate-700 dark:text-slate-300 flex-1 truncate" dir="ltr" title={`${window.location.origin}/room/${room.id}`}>{`${window.location.origin}/room/${room.id}`}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => { copyCode(); setShowShare(false); }}
                        className={`w-full h-10 flex items-center gap-2 px-3 rounded-lg text-sm font-semibold transition-colors border ${copied ? 'border-emerald-600/30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : OUTLINE_BTN}`}
                      >
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />} {copied ? t.linkCopied : t.copyLink}
                      </button>
                      {qrDataUrl && (
                        <div className="flex flex-col items-center gap-1.5 pt-1">
                          {/* eslint-disable-next-line @next/next/no-img-element -- local data URL */}
                          <img src={qrDataUrl} alt={t.qrAlt} className="w-36 h-36 rounded-lg border border-slate-200 dark:border-slate-700 bg-white p-1.5" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">{t.qrHint}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Spectator (break) toggle — inline from md, otherwise in the more-menu */}
              <button
                type="button"
                onClick={() => roomAction('spectator', { spectator: !isMeSpectator })}
                title={isMeSpectator ? t.specComeBack : t.specGoBreak}
                aria-label={isMeSpectator ? t.specComeBack : t.specGoBreak}
                aria-pressed={isMeSpectator}
                className={`hidden md:flex h-9 items-center gap-1.5 px-2.5 rounded-lg text-xs font-medium transition-colors shrink-0 border cursor-pointer ${isMeSpectator
                  ? 'border-amber-400/70 bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
              >
                <IconCoffee size={16} />
                <span className="hidden lg:inline">{isMeSpectator ? t.specComeBack : specShort}</span>
              </button>

              {/* Deck: picker for the host, plain label for everyone else */}
              <div ref={deckWrapRef} className="relative max-md:contents" onClick={e => e.stopPropagation()} onPointerDown={e => e.stopPropagation()}>
                {canChangeDeck ? (
                  <button
                    type="button"
                    onClick={() => { setShowDeckPicker(prev => !prev); setShowCustomInput(false); }}
                    aria-haspopup="menu"
                    aria-expanded={showDeckPicker}
                    aria-label={`${rt.deck}: ${deckLabel}`}
                    className={`${HDR_BTN} hidden md:flex gap-1.5 px-2.5 text-xs font-medium ${showDeckPicker ? ACTIVE_BTN : ''}`}
                  >
                    <DeckIcon size={16} />
                    <span>{deckLabel}</span>
                    <IconChevronDown size={14} className={`text-slate-500 dark:text-slate-400 transition-transform ${showDeckPicker ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <span className="hidden md:inline-flex h-9 items-center gap-1.5 px-1.5 text-xs font-medium text-slate-700 dark:text-slate-200" title={rt.deck}>
                    <DeckIcon size={16} className="text-slate-500 dark:text-slate-400" />
                    <span className="sr-only">{rt.deck}: </span>
                    <span>{deckLabel}</span>
                  </span>
                )}

                {/* Preset dropdown */}
                {showDeckPicker && canChangeDeck && (
                  <div ref={deckMenuRef} role="menu" aria-label={rt.deck} onKeyDown={onMenuKeyDown} className="absolute end-0 top-full mt-2 z-50 w-60 glass-strong rounded-xl animate-pop-in overflow-hidden py-1">
                    {deckOptions.map(opt => (
                      <button key={opt.value}
                        type="button"
                        role="menuitemradio"
                        aria-checked={deckType === opt.value}
                        onClick={() => pickDeck(opt.value)}
                        className={`w-full h-10 flex items-center gap-2.5 px-3 text-sm text-start transition-colors -outline-offset-2! ${deckType === opt.value ? MENU_ON : MENU_OFF}`}
                      >
                        <opt.Icon size={16} className={deckType === opt.value ? 'shrink-0' : 'shrink-0 text-slate-500 dark:text-slate-400'} />
                        <span className="flex-1">{opt.label}</span>
                        {deckType === opt.value && <IconCheck size={16} className={MENU_CHECK} />}
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom deck input panel (sheet under the header on phones) */}
                {showCustomInput && (
                  <div ref={customRef} role="dialog" aria-label={t.customDeckTitle}
                    className="z-50 glass-strong rounded-xl animate-pop-in p-3 space-y-2.5 max-md:fixed max-md:inset-x-3 max-md:top-[calc(env(safe-area-inset-top)+4rem)] md:absolute md:end-0 md:top-full md:mt-2 md:w-64">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <IconPencil size={14} className="text-slate-500 dark:text-slate-400" />{t.customDeckTitle}
                    </p>
                    <form className="space-y-2.5" noValidate onSubmit={e => { e.preventDefault(); applyCustomDeck(); }}>
                    <input
                      ref={customInputRef}
                      type="text"
                      value={customCardsInput}
                      onChange={e => { setCustomCardsInput(limitCardInput(e.target.value)); setCustomCardsInvalid(false); }}
                      onPaste={e => pasteOneLine(e, ', ')}
                      placeholder={t.customCardsPlaceholder}
                      aria-label={t.customDeckTitle}
                      aria-invalid={customCardsInvalid}
                      aria-describedby={customCardsInvalid ? 'custom-cards-error' : 'custom-cards-hint'}
                      autoComplete="off"
                      autoFocus
                      className={`${FIELD} w-full h-10 px-3 rounded-lg text-base sm:text-sm ${customCardsInvalid ? 'border-red-400 dark:border-red-500/70' : FIELD_EDGE}`}
                    />
                    <div className="flex items-start justify-between gap-2">
                      {customCardsInvalid
                        ? <p id="custom-cards-error" role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">{t.errCustomCardsMin}</p>
                        : <p id="custom-cards-hint" className="text-xs text-slate-500 dark:text-slate-400">{t.customCardsHint}</p>}
                      {/* Different cards so far; past 20 the rest are left out */}
                      <span aria-hidden="true" dir="ltr" className={`shrink-0 text-xs tabular-nums ${typedCardCount > MAX_CUSTOM_CARDS ? 'font-semibold text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>{typedCardCount}/{MAX_CUSTOM_CARDS}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowCustomInput(false)}
                        className={`flex-1 h-10 md:h-9 rounded-lg text-sm font-medium ${OUTLINE_BTN}`}
                      >{t.btnCancel}</button>
                      <button type="submit" className="flex-1 h-10 md:h-9 rounded-lg text-sm font-semibold btn-primary text-white">{t.btnApply}</button>
                    </div>
                    </form>
                  </div>
                )}
              </div>

              <button
                type="button"
                ref={chatButtonRef}
                onClick={toggleChat}
                className={`${HDR_BTN} relative w-10 sm:w-9 ${chatOpen ? ACTIVE_BTN : ''} ${!chatOpen && unreadChat > 0 ? 'animate-chat-bounce' : ''}`}
                aria-label={!chatOpen && unreadChat > 0 ? `${t.chatTitle} (${unreadChat})` : t.chatTitle}
                aria-expanded={chatOpen}
                title={t.chatTitle}
              >
                <IconChat size={17} />
                {!chatOpen && unreadChat > 0 && (
                  <span aria-hidden className="absolute -top-1.5 -end-1.5 min-w-4.5 h-4.5 px-1 rounded-full bg-accent-600 dark:bg-accent-550 text-white text-[11px] leading-none font-bold flex items-center justify-center border-2 border-white dark:border-slate-900">{unreadChat > 9 ? '9+' : unreadChat}</span>
                )}
              </button>
              <button type="button" onClick={() => setShowSettings(true)}
                className={`${HDR_BTN} hidden sm:flex gap-1.5 ps-1 pe-2.5`}
                title={`${t.settingsTitle}: ${user.name}`}
              >
                {/* Named by its text ("Profile: <name>", the name being what shows), so voice control matches it. */}
                <span className="sr-only">{t.settingsTitle}: </span>
                <span aria-hidden className="contents"><Avatar p={{ id: user.id, name: user.name, avatar: user.avatar }} size="xs" /></span>
                <span dir="auto" className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-20">{user.name}</span>
              </button>
              <RoomMoreMenu
                userName={user.name}
                avatar={<Avatar p={{ id: user.id, name: user.name, avatar: user.avatar }} size="sm" />}
                isSpectator={isMeSpectator}
                onToggleSpectator={() => roomAction('spectator', { spectator: !isMeSpectator })}
                deckType={deckType}
                deckOptions={deckOptions}
                canChangeDeck={canChangeDeck}
                onPickDeck={pickDeck}
                soundOn={soundOn}
                onToggleSound={toggleSound}
                onOpenProfile={() => setShowSettings(true)}
                onOpen={() => { setShowShare(false); setShowDeckPicker(false); setShowCustomInput(false); setReactPicker(null); setShowTimerMenu(false); }}
                isHost={isCreator}
                settings={settings}
                onChangeSetting={changeSetting}
                onChangeIssueUrl={changeIssueUrl}
                onIssueUrlRefused={() => flashActionError(t.issueUrlInvalid, 5000)}
                onShowShortcuts={() => setShowShortcuts(true)}
                anonymousLocked={Boolean(room.settings?.anonymous) && Object.keys(room.votes ?? {}).length > 0}
                kept={Boolean(room.kept)}
                canKeep={!room.kept || Boolean(room.isOwner)}
                onToggleKept={toggleKept}
                onCopyOwnerLink={room.kept && room.isOwner ? () => copyOwnerLink(roomId) : null}
              />
            </div>
          </div>
        </header>

        {sseStatus === 'reconnecting' && (
          <div role="status" className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-300 text-sm font-medium text-center py-1.5 px-3 animate-pop-in flex items-center justify-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            {t.sseReconnecting}
          </div>
        )}
        {actionError && (
          <div role="alert" className="bg-red-50 dark:bg-red-500/10 border-b border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 text-sm font-medium text-center py-1.5 px-3 animate-pop-in flex items-center justify-center gap-2">
            <IconAlert size={15} className="shrink-0" /> {actionError}
          </div>
        )}
        {deckToast && (
          <div role="status" className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium text-center py-1.5 px-3 animate-pop-in flex items-center justify-center gap-2">
            <IconLayers size={15} className="shrink-0" /> <span>{t.deckChangedTo} <strong>{deckLabelOf(deckToast)}</strong></span>
          </div>
        )}

        {/* With the chat open on wide screens the column moves aside, so the panel covers no results */}
        <main className={`flex-1 w-full px-3 py-4 ${chatOpen ? 'lg:pe-[19.5rem]' : ''}`}>

          <div className="max-w-4xl mx-auto space-y-3">

            {/* ── Story: the current story, its timer, and the queue behind it ── */}
            <section aria-label={rt.story}
              className={`glass rounded-xl overflow-hidden ${room.currentItem ? 'border-s-[3px]! border-s-accent-500! dark:border-s-accent-400!' : ''}`}>
              {/* On phones the timer gets its own row under the story, which keeps the full width. */}
              <div className="px-4 pt-3 pb-2.5 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <p className={`eyebrow ${room.currentItem ? 'text-accent-700! dark:text-accent-400!' : ''}`}>{rt.story}</p>
                  {room.currentItem && storyDraft !== null ? (
                    <form className="mt-1 flex items-center gap-2" onSubmit={e => { e.preventDefault(); void saveStory(); }}>
                      <input value={storyDraft} onChange={e => setStoryDraft(e.target.value)} onPaste={e => pasteOneLine(e)} autoFocus maxLength={MAX_STORY} aria-label={t.editStory}
                        onKeyDown={e => { if (e.key === 'Escape') setStoryDraft(null); }}
                        className={`${FIELD} ${FIELD_EDGE} flex-1 min-w-0 h-10 sm:h-9 px-2.5 rounded-lg text-base font-semibold`} dir="auto" />
                      <button type="submit" className="shrink-0 h-10 sm:h-9 px-3 rounded-lg btn-primary text-white text-sm font-semibold">{t.btnSave}</button>
                    </form>
                  ) : room.currentItem ? (
                    <div className="mt-1 flex items-start gap-1 group/story">
                      <h2 className="min-w-0 text-base sm:text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100 wrap-anywhere" dir="auto">{linkify(room.currentItem, settings.issueUrl)}</h2>
                      {canRun && (
                        <button type="button" onClick={() => setStoryDraft(room.currentItem)} aria-label={t.editStory} title={t.editStory}
                          className="shrink-0 w-10 h-10 -my-2 sm:my-0 sm:w-7 sm:h-7 rounded-lg inline-flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-80 sm:pointer-fine:opacity-0 sm:pointer-fine:group-hover/story:opacity-100 sm:pointer-fine:group-focus-within/story:opacity-100 focus-visible:opacity-100">
                          <IconPencil size={13} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.queueEmpty}</p>
                  )}
                </div>

                {/* Shared timer: how long this story has been discussed, or a countdown */}
                <div className="shrink-0 flex items-center gap-1 sm:-me-1.5">
                  <SharedTimer
                    startedAt={room.timerStartedAt ?? null}
                    accumMs={room.timerAccumMs ?? 0}
                    limitMs={room.timerLimitMs ?? null}
                    clockOffset={clockOffset}
                    roundKey={roundKey}
                    canRun={canRun}
                    soundOn={soundOn}
                    menuOpen={showTimerMenu}
                    menuRef={timerMenuRef}
                    onToggleMenu={() => { setReactPicker(null); setShowTimerMenu(m => !m); }}
                    onPickLimit={setTimerLimit}
                    onAction={action => { void roomAction('timer', { action }); }}
                  />
                  {/* Leave this story for later: back of the queue, next one up */}
                  {room.currentItem && canRun && (
                    <button type="button" onClick={skipStory} aria-label={t.skipStory} title={t.skipStory}
                      className={`${ICON_BTN} inline-flex items-center justify-center text-slate-500 dark:text-slate-400 ${ICON_HOVER} transition-colors`}>
                      <IconSkip size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* The queue: collapsed to one line until someone opens it */}
              <button
                type="button"
                onClick={() => setShowQueue(q => !q)}
                aria-expanded={showQueue}
                className="w-full h-10 px-4 flex items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 text-start hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors -outline-offset-2!"
              >
                <span className="flex items-center gap-2 min-w-0 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <IconList size={14} className="shrink-0" />{t.queueTitle}
                  {room.queue.length > 0 && <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 truncate">{room.queue.length} {t.queueRemaining}</span>}
                </span>
                <IconChevronDown size={16} className={`shrink-0 text-slate-500 dark:text-slate-400 transition-transform ${showQueue ? 'rotate-180' : ''}`} />
              </button>
              {showQueue && (
                <div className="border-t border-slate-200 dark:border-slate-800 p-3 space-y-2.5">
                  {room.queue.length > 0 && (
                    <ol className="max-h-40 overflow-y-auto">
                      {room.queue.map((item, i) => (
                        <li key={`${i}:${item}`} data-queue-row={i} className="flex items-center gap-1 ps-2.5 text-sm text-slate-600 dark:text-slate-300 group/q">
                          <span className="text-xs text-slate-500 dark:text-slate-400 w-5 shrink-0 tabular-nums">{i + 1}.</span>
                          {queueDraft && draftRow === i ? (
                            <form className="flex-1 flex items-center gap-1.5 min-w-0" onSubmit={e => { e.preventDefault(); void saveQueueItem(); }}>
                              <input value={queueDraft.text} onChange={e => setQueueDraft({ ...queueDraft, text: e.target.value })} onPaste={e => pasteOneLine(e)} autoFocus maxLength={MAX_STORY}
                                aria-label={t.editStory} onKeyDown={e => { if (e.key === 'Escape') setQueueDraft(null); }} dir="auto"
                                className={`${FIELD} ${FIELD_EDGE} flex-1 min-w-0 h-10 sm:h-8 px-2 rounded-md text-base sm:text-sm`} />
                              <button type="submit" className="shrink-0 h-10 sm:h-8 px-2.5 rounded-md btn-primary text-white text-xs font-semibold">{t.btnSave}</button>
                            </form>
                          ) : (
                            <>
                              <span className={`${STORY_LINE} flex-1 min-w-0 min-h-8 leading-8`} dir="auto" title={item}>{linkify(item, settings.issueUrl)}</span>
                              {/* From sm: the four buttons beside the story */}
                              {canRun && <span className="hidden sm:flex items-center opacity-80 sm:pointer-fine:opacity-0 sm:pointer-fine:group-hover/q:opacity-100 sm:pointer-fine:group-focus-within/q:opacity-100">
                                <button type="button" data-queue-control="up" onClick={() => moveQueueItem(i, i - 1, 'up')} disabled={i === 0} aria-label={`${t.moveUp}: ${item}`} title={t.moveUp}
                                  className={`${QUEUE_BTN} ${ICON_HOVER} disabled:opacity-30`}>
                                  <IconChevronDown size={14} className="rotate-180" />
                                </button>
                                <button type="button" data-queue-control="down" onClick={() => moveQueueItem(i, i + 1, 'down')} disabled={i === room.queue.length - 1} aria-label={`${t.moveDown}: ${item}`} title={t.moveDown}
                                  className={`${QUEUE_BTN} ${ICON_HOVER} disabled:opacity-30`}>
                                  <IconChevronDown size={14} />
                                </button>
                                <button type="button" data-queue-control="edit" onClick={() => setQueueDraft({ index: i, item, text: item })} aria-label={`${t.editStory}: ${item}`} title={t.editStory}
                                  className={`${QUEUE_BTN} ${ICON_HOVER}`}>
                                  <IconPencil size={13} />
                                </button>
                                <button type="button" data-queue-control="remove" onClick={() => removeQueueItem(i, 'remove')} aria-label={`${rt.removeStory}: ${item}`} title={rt.removeStory}
                                  className={`${QUEUE_BTN} hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10`}>
                                  <IconX size={14} />
                                </button>
                              </span>}
                              {/* On phones: one button with the four in its menu, so the story keeps the row */}
                              {canRun && (
                                <button type="button" data-queue-control="menu"
                                  onClick={e => { const anchor = e.currentTarget; setQueueMenu(cur => (cur?.anchor === anchor ? null : { index: i, item, anchor })); }}
                                  aria-haspopup="menu" aria-expanded={openQueueMenu?.index === i} aria-label={`${t.storyActions}: ${item}`} title={t.storyActions}
                                  className={`${QUEUE_BTN} sm:hidden ${ICON_HOVER} ${openQueueMenu?.index === i ? 'bg-accent-50 dark:bg-accent-500/15 text-accent-700! dark:text-accent-300!' : ''}`}>
                                  <IconMore size={16} />
                                </button>
                              )}
                            </>
                          )}
                        </li>
                      ))}
                    </ol>
                  )}
                  {openQueueMenu && (
                    <QueueItemMenu
                      anchor={openQueueMenu.anchor}
                      label={`${t.storyActions}: ${openQueueMenu.item}`}
                      first={openQueueMenu.index === 0}
                      last={openQueueMenu.index === room.queue.length - 1}
                      onMove={by => { setQueueMenu(null); void moveQueueItem(openQueueMenu.index, openQueueMenu.index + by, 'menu'); }}
                      onEdit={() => { setQueueMenu(null); setQueueDraft({ index: openQueueMenu.index, item: openQueueMenu.item, text: openQueueMenu.item }); }}
                      onRemove={() => { setQueueMenu(null); void removeQueueItem(openQueueMenu.index, 'menu'); }}
                      onClose={returnFocus => { setQueueMenu(null); if (returnFocus) openQueueMenu.anchor.focus(); }}
                    />
                  )}

                  {/* Adding stories: typed or pasted lines, spreadsheet cells, or a CSV file */}
                  {canRun ? <>
                  <div>
                    <textarea
                      ref={queueInputRef}
                      value={queueInput}
                      onChange={e => {
                        // Each line cut to a story's length, never inside a character.
                        const lines = e.target.value.split('\n').map(line => (line.length > MAX_STORY ? Array.from(line).slice(0, MAX_STORY).join('') : line));
                        setQueueInput(lines.join('\n'));
                      }}
                      onPaste={pasteStories}
                      placeholder={t.queuePlaceholder}
                      aria-label={t.queuePlaceholder}
                      rows={3}
                      className={`${FIELD} ${FIELD_EDGE} w-full px-3 py-2 rounded-lg text-base sm:text-sm resize-none`}
                    />
                    {typedStories.length > 0 && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 text-end tabular-nums">
                        {plural(t.queueLineCount, typedStories.length, locale)}
                      </p>
                    )}
                    {typedStories.length > queueRoom && (
                      <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">{plural(t.importTooMany, typedStories.length - queueRoom, locale)}</p>
                    )}
                  </div>
                  {/* What a file or pasted table holds, before anything is added */}
                  {importPreview && (
                    <div role="status" className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 space-y-2">
                      <p>
                        {importPreview.stories.length === 0 ? t.importNone : plural(t.importFound, importPreview.stories.length, locale)}
                        {importPreview.columns.length > 0 && <> {fill(t.importColumns, { columns: importPreview.columns.join(' + ') })}</>}
                      </p>
                      {importPreview.stories.length > queueRoom && (
                        <p className="text-xs text-amber-700 dark:text-amber-400">{plural(t.importTooMany, importPreview.stories.length - queueRoom, locale)}</p>
                      )}
                      <div className="flex gap-2">
                        <button type="button" onClick={() => { void addImported(); }} disabled={importPreview.stories.length === 0 || queueRoom === 0}
                          className="h-10 sm:h-8 px-3 rounded-lg btn-primary text-white text-xs font-semibold disabled:opacity-40">{t.importAdd}</button>
                        <button type="button" onClick={() => setImportPreview(null)}
                          className={`h-10 sm:h-8 px-3 rounded-lg text-xs font-semibold ${OUTLINE_BTN}`}>{t.btnCancel}</button>
                      </div>
                    </div>
                  )}
                  {/* One row of one size; the buttons grow when a language needs two lines */}
                  <div className="flex flex-wrap gap-2">
                    {/* "N stories added" stays readable: inert for a moment, not dimmed like a disabled button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (queueAddedCount > 0) return;
                        // Only what fits: the server would drop the rest without a word.
                        const items = typedStories.slice(0, queueRoom);
                        if (items.length) void loadQueue(items);
                      }}
                      disabled={(typedStories.length === 0 || queueRoom === 0 || queueSending) && queueAddedCount === 0}
                      aria-disabled={queueAddedCount > 0 || undefined}
                      className={`flex-1 min-w-32 min-h-10 sm:min-h-9 h-auto py-1.5 leading-tight px-3 rounded-lg text-sm font-semibold transition-colors inline-flex items-center justify-center gap-1.5 ${queueAddedCount > 0 ? 'border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 pointer-events-none' : 'btn-primary text-white'}`}
                    >{queueAddedCount > 0 ? <><IconCheck size={15} className="shrink-0" /> {plural(t.queueAdded, queueAddedCount, locale)}</> : t.queueApply}</button>
                    {/* Read here in the browser; only the story texts are sent */}
                    <input ref={importFileRef} type="file" accept=".csv,.tsv,.txt,text/csv,text/tab-separated-values,text/plain" className="sr-only" tabIndex={-1} aria-hidden="true"
                      onChange={e => { void importFromFile(e.target.files?.[0]); e.target.value = ''; }} />
                    <button type="button" onClick={() => importFileRef.current?.click()}
                      className={`min-h-10 sm:min-h-9 h-auto py-1.5 leading-tight px-3 rounded-lg text-sm font-semibold ${OUTLINE_BTN} inline-flex items-center gap-1.5`}>
                      <IconUpload size={14} />{t.importFile}
                    </button>
                    {(room.queue.length > 0 || room.currentItem) && (
                      <button type="button" onClick={clearQueue} className={`min-h-10 sm:min-h-9 h-auto py-1.5 leading-tight px-3 rounded-lg text-sm font-semibold ${OUTLINE_BTN}`}>
                        {t.queueClear}
                      </button>
                    )}
                  </div>
                  </> : room.queue.length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">{t.queueEmpty}</p>}
                </div>
              )}
            </section>

            {/* First visit: how a round works, in one line */}
            {showHint && (
              <div role="note" className="flex items-center gap-3 rounded-xl px-4 py-2.5 bg-accent-50/70 dark:bg-accent-500/10 border border-accent-100 dark:border-accent-500/25 text-sm text-slate-700 dark:text-slate-200 animate-pop-in">
                <Pip className="shrink-0 w-3 h-3.5 text-accent-500 dark:text-accent-400" />
                <span className="flex-1">{t.roomHint}</span>
                <button type="button" onClick={dismissHint} className={`shrink-0 h-10 sm:h-8 px-3 rounded-lg text-xs font-semibold ${OUTLINE_BTN}`}>
                  {t.roomHintDismiss}
                </button>
              </div>
            )}

            {/* Joined with a name that reads like someone else's: said once, never in the way */}
            {nameClashNote !== null && nameClashNote === nameSkeleton(user.name) && lookalikes.has(user.id) && (
              <div role="note" className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl px-4 py-2.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/25 text-sm text-amber-900 dark:text-amber-100 animate-pop-in">
                <IconUsers size={16} className="shrink-0" />
                <span className="flex-1 min-w-48">{t.nameInUseRoom}</span>
                <span className="flex flex-wrap gap-2 ms-auto">
                  <button type="button" onClick={() => setShowSettings(true)} className="shrink-0 h-10 sm:h-8 px-3 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-500/25 hover:bg-amber-100/60 dark:hover:bg-slate-800">
                    {t.nameChange}
                  </button>
                  <button type="button" onClick={() => { clashDismissedRef.current = nameClashNote; setNameClashNote(null); }} className="shrink-0 h-10 sm:h-8 px-3 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-500/25 hover:bg-amber-100/60 dark:hover:bg-slate-800">
                    {t.roomHintDismiss}
                  </button>
                </span>
              </div>
            )}

            {/* One column at every width (no jump once the first round is done):
                the round, then the session so far. */}
            <div className="space-y-3">
              <div className="space-y-3 min-w-0">
            {/* ── Participants ── */}
            <div className="glass rounded-xl p-3 sm:p-4 overflow-visible relative">
              {!participants.length ? (
                <div className="flex flex-col items-center py-12 gap-3 text-slate-500 dark:text-slate-400">
                  <IconUsers size={32} strokeWidth={1.5} />
                  <p className="text-sm">{t.noParticipants}</p>
                </div>
              ) : (
                <>
                  {/* Progress bar (pre-reveal): red as the votes come in, green once everyone is in */}
                  {!room.revealed && (
                    <div className="flex items-center gap-3 mb-3 px-1">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-200/70 dark:bg-slate-800 overflow-hidden"
                        role="progressbar" aria-valuemin={0} aria-valuemax={voters.length} aria-valuenow={effectiveVotedCount} aria-label={t.voteLabel}>
                        <div className={`h-full rounded-full transition-[width,background-color] duration-500 ${allVoted ? 'bg-emerald-500' : 'bg-accent-500 dark:bg-accent-400'}`} style={{ width: `${voters.length ? (effectiveVotedCount / voters.length) * 100 : 0}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 tabular-nums shrink-0">
                        {countdown !== null ? t.revealing : `${effectiveVotedCount}/${voters.length}`}
                      </span>
                    </div>
                  )}

                  {/* The table: a softly tinted surface, the seats on it */}
                  <div className="rounded-xl p-2 sm:p-2.5 bg-slate-100/80 dark:bg-slate-950/60 ring-1 ring-inset ring-slate-200/80 dark:ring-slate-800">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {participants.map((p, seat) => {
                      const isMe = p.id === user.id;
                      // Reflect my own optimistic vote instantly (pre-reveal only).
                      const voteVal = (isMe && !room.revealed) ? effectiveVote : room.votes[p.id];
                      const hasVoted = Boolean(voteVal);
                      const isCreatorP = p.id === room.creatorId;
                      const isSpec = Boolean(p.spectator);
                      const isAway = Boolean(p.away);
                      const voteNum = cardValue(voteVal ?? '');
                      const showOutliers = room.revealed && stats?.type === 'numeric' && !isConsensus && stats.min !== stats.max && !isNaN(voteNum);
                      const isLowest = showOutliers && voteNum === stats.min;
                      const isHighest = showOutliers && voteNum === stats.max;
                      // Far from the rest: asked to explain (see `outliers`).
                      const explains = room.revealed && !anonymous && outliers !== null && (voteVal === outliers.low || voteVal === outliers.high);
                      const canKick = isCreator && !isMe && !isCreatorP;
                      // Anyone can nudge a teammate who hasn't voted yet.
                      const canNudge = !isMe && !isSpec && !isAway && !hasVoted && !room.revealed;
                      const canReact = settings.reactions && !isMe && !isAway;
                      // Their name for labels, with the tag when someone else here reads the same.
                      const who = taggedName(p.name, p.id, lookalikes);
                      return (
                        <div
                          key={p.id}
                          data-participant-id={p.id}
                          // When this seat's card turns over at the reveal (room.css .pc-flip)
                          style={{ '--flip-delay': `${Math.round(seat * flipStep)}ms` } as React.CSSProperties}
                          className={`group relative flex flex-col items-center gap-2 rounded-xl p-3 bg-white dark:bg-slate-900 ring-1 ring-slate-200/80 dark:ring-slate-800 shadow-card transition-opacity ${isAway ? 'opacity-50' : ''}`}
                        >
                          {/* Avatar + status badges; our own seat is ringed in the accent */}
                          <div className="relative">
                            <div className={`rounded-full ${isMe ? 'ring-2 ring-accent-500 dark:ring-accent-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900' : ''}`}>
                              <Avatar p={p} size="md" />
                            </div>
                            {isCreatorP && (
                              <span role="img" aria-label={rt.host} title={rt.host}
                                className="absolute -top-2 -end-2 w-5 h-5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-amber-600 dark:text-amber-400 shadow-[0_1px_2px_rgba(35,38,45,0.12)] flex items-center justify-center">
                                <IconCrown size={11} fill="currentColor" />
                              </span>
                            )}
                            {isAway && (
                              <span role="img" aria-label={rt.away} title={rt.away}
                                className="absolute -top-2 -start-2 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                                <IconMoon size={10} />
                              </span>
                            )}
                            {isSpec && !isAway && (
                              <span role="img" aria-label={rt.spectator} title={rt.spectator}
                                className="absolute -bottom-1 -end-1 w-5 h-5 rounded-full bg-amber-200 dark:bg-amber-400 border-2 border-white dark:border-slate-900 text-amber-900 dark:text-amber-950 flex items-center justify-center">
                                <IconCoffee size={10} strokeWidth={2.5} />
                              </span>
                            )}
                          </div>

                          {/* Name, and its tag when it reads like someone else's (on our own seat too: others see it) */}
                          <span className="max-w-full min-w-0 inline-flex items-center justify-center gap-1">
                            <span dir="auto" title={isMe ? undefined : p.name} className={`text-sm truncate ${isMe ? 'font-semibold text-slate-900 dark:text-slate-50' : 'font-medium text-slate-700 dark:text-slate-200'}`}>
                              {isMe ? t.you : p.name}
                            </span>
                            {lookalikes.has(p.id) && <NameTag id={p.id} />}
                          </span>

                          {/* The seat's card (room.css): one size in every state, so nothing jumps at the reveal */}
                          {isSpec ? (
                            <span className={`h-14 inline-flex items-center text-[11px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide ${ZH_TRACKING} text-center leading-tight`}>{t.specStatus}</span>
                          ) : room.revealed && hasVoted && !anonymous ? (
                            // Turned over, a seat after the one before it; the lowest and highest get an arrow once face up.
                            <span className="relative">
                              <span className="pc-flip">
                                <span className={`pc inline-flex items-center justify-center min-w-10 h-14 px-1.5 rounded-md font-bold tabular-nums ${Array.from(voteVal!).length > 2 ? 'text-base' : 'text-xl'} ${revealChipClass(voteVal!, heroValue)}`}>
                                  <CardFace card={voteVal!} />
                                </span>
                                <CardBack className="rounded-md" />
                              </span>
                              {(isLowest || isHighest) && (
                                <span title={isHighest ? t.statMax : t.statMin} aria-label={isHighest ? t.statMax : t.statMin} role="img"
                                  className="pc-after-flip absolute -top-2 -end-2 w-5 h-5 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-100 shadow-[0_1px_2px_rgba(35,38,45,0.14)] flex items-center justify-center">
                                  <IconArrowRight size={11} strokeWidth={3} className={isHighest ? '-rotate-90' : 'rotate-90'} />
                                </span>
                              )}
                            </span>
                          ) : hasVoted ? (
                            // Face down until the reveal (in an anonymous round, for good).
                            <CardBack className="pc-deal w-10 h-14 rounded-md" />
                          ) : (
                            // An empty place on the table, waiting for a card.
                            <span className="inline-flex items-center justify-center w-10 h-14 rounded-md border-[1.5px] border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950/40 text-slate-300 dark:text-slate-700">
                              <Pip className="w-2 h-2.5" />
                            </span>
                          )}
                          {/* Inside the seat, under the card: it never crosses into the next row */}
                          {explains && (
                            <span title={t.outlierHint}
                              className="-mt-1 max-w-full px-1.5 min-h-5 inline-flex items-center rounded-full text-[11px] leading-tight font-semibold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-200 border border-amber-300/70 dark:border-amber-500/40 pc-after-flip">
                              {t.outlierBadge}<span className="sr-only"> ({t.outlierHint})</span>
                            </span>
                          )}

                          {/* Nudge a non-voter (anyone). Always visible on touch / small screens, on hover or focus elsewhere. */}
                          {canNudge && (
                            <button
                              type="button"
                              onClick={() => nudge(p.id)}
                              disabled={nudgeSent === p.id}
                              className={`absolute top-1 start-1 ${ICON_BTN} flex items-center justify-center transition-colors ${nudgeSent === p.id
                                ? 'text-emerald-600 dark:text-emerald-400 opacity-100'
                                : `text-slate-500 dark:text-slate-400 ${ICON_HOVER} ${TOUCH_REVEAL}`}`}
                              title={t.nudgeTitle}
                              aria-label={`${t.nudgeTitle}: ${who}`}
                            >{nudgeSent === p.id ? <IconCheck size={15} /> : <IconBell size={15} />}</button>
                          )}

                          {/* Throw an emoji at this person */}
                          {canReact && (
                            <div className="absolute bottom-1 start-1" onClick={e => e.stopPropagation()}>
                              <button type="button" onClick={() => { setShowTimerMenu(false); setReactPicker(cur => (cur === p.id ? null : p.id)); }}
                                aria-haspopup="menu" aria-expanded={reactPicker === p.id} title={fill(t.reactTo, { name: who })} aria-label={fill(t.reactTo, { name: who })}
                                className={`${ICON_BTN} flex items-center justify-center text-slate-500 dark:text-slate-400 ${ICON_HOVER} transition-colors ${reactPicker === p.id ? 'opacity-100 bg-accent-50 dark:bg-accent-500/15 text-accent-700! dark:text-accent-300!' : TOUCH_REVEAL}`}>
                                <IconSmile size={15} />
                              </button>
                            </div>
                          )}
                          {/* Centred over the seat (not hung off the corner button), so it stays on screen */}
                          {canReact && reactPicker === p.id && <ReactionMenu ref={reactRef} label={fill(t.reactTo, { name: who })} placement="bottom-12 sm:bottom-10 inset-x-0 mx-auto" onPick={emoji => react(emoji, p.id)} />}

                          {/* Hand over the host role (host), confirmed with a second click */}
                          {canKick && !p.away && (
                            hostConfirmTarget === p.id ? (
                              <button
                                type="button"
                                onClick={() => { setHostConfirmTarget(null); makeHost(p.id); }}
                                className="absolute bottom-1 end-1 px-2 h-10 sm:h-8 rounded-lg btn-primary text-white text-[11px] font-bold flex items-center gap-1"
                                aria-label={fill(t.hostFor, { name: who })}
                              ><IconCrown size={12} /> {asQuestion(t.makeHost, locale)}</button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => { setHostConfirmTarget(p.id); setTimeout(() => setHostConfirmTarget(cur => (cur === p.id ? null : cur)), 3000); }}
                                className={`absolute bottom-1 end-1 ${ICON_BTN} text-slate-500 dark:text-slate-400 ${ICON_HOVER} transition-colors flex items-center justify-center ${TOUCH_REVEAL}`}
                                title={t.makeHost}
                                aria-label={fill(t.hostFor, { name: who })}
                              ><IconCrown size={15} /></button>
                            )
                          )}

                          {/* Kick (host) */}
                          {canKick && (
                            kickConfirmTarget === p.id ? (
                              <button
                                type="button"
                                onClick={() => { if (kickConfirmTimerRef.current) clearTimeout(kickConfirmTimerRef.current); setKickConfirmTarget(null); kick(p.id); }}
                                className="absolute top-1 end-1 px-2 h-10 sm:h-8 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold flex items-center gap-1"
                                aria-label={fill(t.kickFor, { name: who })}
                              ><IconX size={12} strokeWidth={3} /> {t.kickConfirm}</button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => { setKickConfirmTarget(p.id); if (kickConfirmTimerRef.current) clearTimeout(kickConfirmTimerRef.current); kickConfirmTimerRef.current = setTimeout(() => setKickConfirmTarget(null), 3000); }}
                                className={`absolute top-1 end-1 ${ICON_BTN} text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center justify-center ${TOUCH_REVEAL}`}
                                title={rt.remove}
                                aria-label={`${rt.remove}: ${who}`}
                              ><IconX size={15} /></button>
                            )
                          )}
                        </div>
                      );
                    })}
                  </div>
                  </div>{/* end the table */}
                </>
              )}

              {/* Stats */}
              {stats && (
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 animate-slide-up">
                  {/* Hero result — the headline estimate as a card of its own, in once the cards are turned */}
                  {(() => {
                    if (heroValue === null) return null;
                    return (
                      <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 rounded-xl py-5 px-4 border ${isConsensus
                        ? 'bg-accent-50/70 dark:bg-accent-500/10 border-accent-100 dark:border-accent-500/25'
                        : 'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800'}`}>
                        <span className="relative shrink-0" style={{ '--hero-delay': `${Math.round(flipStep * Math.max(0, participants.length - 1)) + 240}ms` } as React.CSSProperties}>
                          <span className={`pc pc-hero flex items-center justify-center min-w-16 h-22 px-3 rounded-[10px] font-bold tracking-tight leading-none tabular-nums ${Array.from(heroValue).length > 2 ? 'text-2xl' : 'text-4xl'} ${isConsensus ? 'pc-match' : ''}`}>
                            <CardIndex card={heroValue} corner="top" />
                            <CardIndex card={heroValue} corner="bottom" />
                            <CardFace card={heroValue} />
                          </span>
                          {/* Everyone agreed: a few pips fly off the card, once */}
                          {isConsensus && (
                            <span aria-hidden="true" className="pc-burst absolute inset-0 pointer-events-none">
                              {BURST.map(([dx, dy, rot]) => (
                                <Pip key={`${dx}:${dy}`} className="" style={{ '--dx': `${dx}px`, '--dy': `${dy}px`, '--rot': `${rot}deg` } as React.CSSProperties} />
                              ))}
                            </span>
                          )}
                        </span>
                        <span className="flex flex-col items-center sm:items-start gap-1.5 min-w-0">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${ZH_TRACKING} ${isConsensus ? 'text-accent-700 dark:text-accent-400' : 'text-slate-600 dark:text-slate-300'}`}>
                          {isConsensus ? (
                            <><Pip className="w-2.5 h-3" />{t.consensus}</>
                          ) : (
                            <><IconTarget size={14} />{t.suggestedLabel}</>
                          )}
                        </span>
                        {/* Each figure in one piece; they wrap between figures, never inside one */}
                        {stats.type === 'numeric' && !isConsensus && (
                          <span className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-0.5 text-sm text-slate-600 dark:text-slate-300 font-medium tabular-nums">
                            <span className="whitespace-nowrap">{t.statAvg} {stats.avg}</span>
                            <span className="whitespace-nowrap">{t.statMedian} {formatNum(stats.median)}</span>
                            <span className="whitespace-nowrap">{t.statMin} {formatNum(stats.min)}</span>
                            <span className="whitespace-nowrap">{t.statMax} {formatNum(stats.max)}</span>
                          </span>
                        )}
                        {stats.type === 'freq' && stats.tshirtAvg && !isConsensus && (
                          <span className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-0.5 text-sm text-slate-600 dark:text-slate-300 font-medium">
                            <span className="whitespace-nowrap">{t.statAvg} {stats.tshirtAvg}</span>
                            <span className="whitespace-nowrap">{t.statMin} {stats.tshirtMin}</span>
                            <span className="whitespace-nowrap">{t.statMax} {stats.tshirtMax}</span>
                          </span>
                        )}
                        </span>
                      </div>
                    );
                  })()}
                  {/* Vote distribution — identical layout for every deck type */}
                  {(() => {
                    const freq: Record<string, number> = {};
                    Object.values(voteRecord).forEach(v => { freq[v] = (freq[v] ?? 0) + 1; });
                    const total = Object.keys(voteRecord).length;
                    let entries: [string, number][];
                    if (stats.type === 'numeric') {
                      // Numbers in order; ? and ☕ after them.
                      entries = Object.entries(freq).sort((a, b) => {
                        const x = cardValue(a[0]), y = cardValue(b[0]);
                        return isNaN(x) ? (isNaN(y) ? 0 : 1) : isNaN(y) ? -1 : x - y;
                      });
                    } else if (deckType === 'tshirt') {
                      entries = Object.entries(freq).sort((a, b) => (TSHIRT_ORDER[a[0]] ?? 99) - (TSHIRT_ORDER[b[0]] ?? 99));
                    } else {
                      entries = stats.top;
                    }
                    if (entries.length <= 1) return null;
                    return (
                      <div className="mt-4">
                        <p className="eyebrow mb-2">{t.voteDistribution}</p>
                        {/* A grid, so the bars start in one line whatever the widest card (a custom one is up to 4 characters) */}
                        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2.5 gap-y-1.5" dir="ltr">
                          {entries.map(([val, count]) => (
                            <div key={val} className="contents">
                              <span className={`min-w-10 text-sm text-end whitespace-nowrap ${val === heroValue ? 'font-bold text-accent-700 dark:text-accent-400' : 'font-semibold text-slate-600 dark:text-slate-300'}`}><CardFace card={val} /></span>
                              {/* The accent for the result's card, soft grey for the rest */}
                              <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <div className={`h-full rounded-full transition-[width] duration-500 ${val === heroValue ? 'bg-accent-500 dark:bg-accent-400' : 'bg-slate-300 dark:bg-slate-600'}`} style={{ width: `${(count / total) * 100}%` }} />
                              </div>
                              <span className="min-w-6 text-xs font-medium text-slate-500 dark:text-slate-400 tabular-nums">{count}×</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                  {anonymous && (
                    <p className="mt-3 text-xs text-center text-slate-500 dark:text-slate-400 inline-flex w-full items-center justify-center gap-1.5">
                      <IconEye size={13} />{t.anonymousNote}
                    </p>
                  )}
                  {/* The estimate the team settles on, recorded with the round */}
                  {canRun && finalOptions.length > 0 && (() => {
                    return (
                      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5" role="radiogroup" aria-label={t.finalEstimate}>
                        <span className="eyebrow me-1">{t.finalEstimate}</span>
                        {/* The cards in deck order, left to right, in every language */}
                        <span className="flex flex-wrap items-center justify-center gap-1.5" dir="ltr">
                        {shownFinals.map(card => (
                          <button key={card} type="button" role="radio" aria-checked={chosenFinal === card}
                            onClick={() => setFinalPick({ round: roundKey, value: card })}
                            className={`pc pc-play min-w-10 h-12 sm:min-w-9 sm:h-11 px-2 rounded-md text-sm font-bold ${chosenFinal === card ? 'pc-match' : ''}`}
                          ><CardFace card={card} /></button>
                        ))}
                        </span>
                        {shownFinals.length < deckFinals.length && (
                          <button type="button" onClick={() => setFinalMoreRound(roundKey)}
                            className="h-12 sm:h-11 px-2.5 rounded-md text-xs font-semibold border-[1.5px] border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-slate-500 dark:hover:border-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                            {t.finalMore}
                          </button>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
              {/* Reactions in flight, over the seats and the table */}
              <ReactionLayer ref={reactionLayerRef} participants={room.participants} />
            </div>{/* end participants card */}

            {/* ── Action buttons ── */}
            <div className="relative flex flex-wrap items-center gap-2 justify-center">
              {!room.revealed ? (
                (countdown !== null || room.locked) ? (
                  <div className="flex items-center gap-3 animate-pop-in" role="status">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-slate-700" />
                      <div className="absolute inset-0 rounded-full border-2 border-t-accent-500 dark:border-t-accent-400 border-r-transparent border-b-transparent border-l-transparent animate-spin-slow" />
                      {countdown !== null && <span className="text-xl font-bold text-slate-900 dark:text-slate-100 tabular-nums animate-count" key={countdown}>{countdown}</span>}
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{t.revealing}</span>
                  </div>
                ) : !canRun ? (
                  <p className="h-12 inline-flex items-center gap-2 px-4 text-sm font-medium text-slate-500 dark:text-slate-400"><IconCrown size={15} className="shrink-0 text-slate-500 dark:text-slate-400" />{t.hostRunsHint}</p>
                ) : (
                  <button type="button" onClick={startReveal} disabled={votedCount === 0}
                    className={`min-h-12 px-8 py-3 rounded-lg font-bold text-base flex items-center gap-2 ${votedCount > 0
                      ? 'btn-primary text-white active:scale-[0.98]'
                      : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{t.revealVotes}</span>
                    {!allVoted && votedCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-xs font-bold tabular-nums">{votedCount}/{voters.length}</span>
                    )}
                    {allVoted && <IconArrowRight size={18} strokeWidth={2.5} className="rtl:rotate-180" />}
                  </button>
                )
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {canRun ? (
                      <>
                        <button type="button" onClick={() => roomAction('reset', { revote: true }, 0, 'POST', undefined, quietIfStale)}
                          className={`h-11 px-4 rounded-lg font-semibold text-sm ${OUTLINE_BTN} transition-colors inline-flex items-center gap-2`}
                        ><IconRotate size={16} /> {t.revoteBtn}</button>
                        <button type="button" onClick={() => reset(chosenFinal)}
                          className="btn-primary h-11 px-6 rounded-lg font-semibold text-sm text-white inline-flex items-center"
                        >{t.newRound}</button>
                      </>
                    ) : (
                      <p className="h-11 inline-flex items-center gap-2 px-2 text-sm font-medium text-slate-500 dark:text-slate-400"><IconCrown size={15} className="shrink-0 text-slate-500 dark:text-slate-400" />{t.hostRunsHint}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const label = room.currentItem || fill(t.historyRoundN, { n: room.history.length + 1 });
                        // Use the same suggested estimate shown in the results, for every deck type.
                        let value = suggested ?? '';
                        if (!value && stats?.type === 'numeric') value = String(stats.avg);
                        else if (!value && stats?.type === 'freq' && stats.top.length) value = stats.top[0][0];
                        const txt = `${label}: ${value} (${plural(t.voteCount, votedCount, locale)}${isConsensus ? ` · ${t.consensus}` : ''})`;
                        navigator.clipboard?.writeText(txt).then(() => {
                          setResultCopied(true);
                          setTimeout(() => setResultCopied(false), 2000);
                        }).catch(() => {});
                      }}
                      title={t.copyResultBtn}
                      className={`h-11 px-4 max-[440px]:px-3.5 rounded-lg font-semibold text-sm transition-colors inline-flex items-center gap-2 ${resultCopied
                        ? 'border border-emerald-600/40 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                        : OUTLINE_BTN
                        }`}
                    >{resultCopied
                      ? <><IconCheck size={16} /> <span className="max-[440px]:sr-only">{t.linkCopied}</span></>
                      : <><IconCopy size={16} /> <span className="max-[440px]:sr-only">{t.copyResultBtn}</span></>}</button>
                  </div>
                </div>
              )}
              {/* A reaction for the whole room */}
              {settings.reactions && (
                <div onClick={e => e.stopPropagation()}>
                  <button type="button" onClick={() => { setShowTimerMenu(false); setReactPicker(cur => (cur === 'room' ? null : 'room')); }}
                    aria-haspopup="menu" aria-expanded={reactPicker === 'room'} aria-label={t.reactRoom} title={t.reactRoom}
                    className={`w-11 h-11 rounded-lg ${OUTLINE_BTN} ${reactPicker === 'room' ? ACTIVE_BTN : ''} transition-colors inline-flex items-center justify-center`}>
                    <IconSmile size={18} />
                  </button>
                  {/* Centred over the whole row, not hung off the button: on a phone the button may sit at the edge */}
                  {reactPicker === 'room' && <ReactionMenu ref={reactRef} label={t.reactRoom} placement="bottom-full mb-2 inset-x-0 mx-auto min-[480px]:grid-cols-6" onPick={emoji => react(emoji, null)} />}
                </div>
              )}
            </div>

            {/* ── Spectator hint ── */}
            {!room.revealed && isMeSpectator && (
              <div className="glass rounded-xl p-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
                <span className="text-sm text-amber-800 dark:text-amber-300 font-medium inline-flex items-center gap-2"><IconCoffee size={16} className="shrink-0" /> {t.specWatching}</span>
                <button
                  type="button"
                  onClick={() => roomAction('spectator', { spectator: false })}
                  className="h-10 sm:h-9 px-3.5 rounded-lg text-sm font-semibold border border-amber-400/70 bg-amber-50 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/25 transition-colors"
                >
                  {t.specComeBack}
                </button>
              </div>
            )}

            {/* ── Voting cards ── */}
            {!room.revealed && !isMeSpectator && (
              <div className="glass rounded-xl px-3 pt-6 pb-4 sm:px-4">
                {/* Left to right like a ruler, in Arabic too. 56–60px cards: the Scrum deck's 13 fit one row
                    on desktop, where a hand of up to 13 fans out a little (turned by --fan-r, the outer ones lower by --fan-y) */}
                <div className="flex flex-wrap gap-x-1.5 gap-y-4 justify-center" role="group" aria-label={rt.vote} dir="ltr">
                  {cards.map((card, i) => {
                    const selected = effectiveVote === card;
                    const locked = room.locked || countdown !== null;
                    const k = i - (cards.length - 1) / 2;
                    const fan = fanHand ? { '--fan-r': `${(k * fanStep).toFixed(2)}deg`, '--fan-y': `${(k * k * fanDrop).toFixed(2)}px` } as React.CSSProperties : undefined;
                    return (
                      <button key={card} type="button" onClick={() => { if (room.locked || countdown !== null) return; if (selected) { unvote(); } else { vote(card); } }}
                        disabled={room.locked || countdown !== null}
                        aria-pressed={selected}
                        aria-label={fill(t.voteFor, { card })}
                        style={fan}
                        className={`pc pc-play min-w-14 h-20 sm:min-w-15 sm:h-21 px-2 rounded-[9px] flex items-center justify-center font-bold tracking-tight whitespace-nowrap select-none origin-bottom ${fanHand ? 'lg:[rotate:var(--fan-r)] lg:[transform:translateY(var(--fan-y))]' : ''} ${Array.from(card).length > 3 ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'} ${selected ? 'pc-on' : ''} ${locked ? `cursor-not-allowed ${selected ? '' : 'opacity-45'}` : 'cursor-pointer'}`}
                      >
                        {/* Corner indexes, as on a playing card: the value and a red pip */}
                        <CardIndex card={card} corner="top" />
                        <CardIndex card={card} corner="bottom" />
                        <CardFace card={card} />
                      </button>
                    );
                  })}
                </div>

                {effectiveVote && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 flex items-center justify-center gap-1.5" aria-live="polite">
                    <IconCheck size={14} strokeWidth={3} className="text-accent-600 dark:text-accent-400" /> <span><strong className="text-slate-900 dark:text-slate-50"><CardFace card={effectiveVote} /></strong> {t.selected}</span>
                  </p>
                )}
              </div>
            )}

              </div>{/* end the round */}

              {/* The session so far */}
              <div className="space-y-3 min-w-0">
            {/* ── Dashboard ── */}
            {dashboard && (() => {
              const { totalRounds, avgEst, consensusRate, topVoter, numericRounds, avgs, maxAvg, agreedTotal, estimated } = dashboard;
              return (
                <div className="glass rounded-xl p-4">
                  <p className="eyebrow inline-flex items-center gap-1.5 mb-3"><IconChart size={14} />{t.dashTitle}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    <div className="stat-card rounded-lg px-2 py-2.5 text-center min-w-0">
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{totalRounds}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{t.dashRounds}</p>
                    </div>
                    <div className="stat-card rounded-lg px-2 py-2.5 text-center min-w-0">
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{avgEst ?? '—'}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{t.dashAvgEst}</p>
                    </div>
                    <div className="stat-card rounded-lg px-2 py-2.5 text-center min-w-0">
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{consensusRate}%</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{t.dashConsensus}</p>
                    </div>
                    <div className="stat-card rounded-lg px-2 py-2.5 text-center min-w-0">
                      <p className="flex items-center justify-center gap-1 min-w-0 text-base leading-7 font-bold text-slate-900 dark:text-slate-100">
                        <span className="truncate" dir="auto" title={topVoter?.name}>{topVoter?.name ?? '—'}</span>
                        {topVoter?.tagged && <NameTag id={topVoter.id} />}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{t.dashTopVoter}</p>
                    </div>
                    <div className="stat-card rounded-lg px-2 py-2.5 text-center min-w-0">
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{agreedTotal ?? '—'}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{t.dashAgreedTotal}</p>
                    </div>
                    <div className="stat-card rounded-lg px-2 py-2.5 text-center min-w-0">
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{estimated}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{t.dashEstimated}</p>
                    </div>
                  </div>
                  {/* Round-by-round mini bar chart */}
                  {numericRounds.length >= 2 && (() => {
                    return (
                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                        <p className="eyebrow mb-2">{rt.recentRounds}</p>
                        <div className="flex items-end gap-1 h-10">
                          {numericRounds.map((r, i) => (
                            <div key={r.ts} className="flex-1 max-w-10 flex flex-col items-center gap-0.5 group" title={`${r.item || fill(t.historyRoundN, { n: room.history.indexOf(r) + 1 })}: ${avgs[i].toFixed(1)}`}>
                              <div
                                className="w-full rounded-t-sm bg-slate-300 dark:bg-slate-600 group-hover:bg-accent-500 dark:group-hover:bg-accent-400 transition-colors"
                                style={{ height: `${Math.max(4, (avgs[i] / maxAvg) * 36)}px` }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              );
            })()}

            {/* ── History ── */}
            {room.history.length > 0 && (() => {
              const visibleHistory = room.history;
              return (
                <div className="glass rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowHistory(h => !h)}
                    aria-expanded={showHistory}
                    className="w-full h-11 px-4 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors -outline-offset-2!"
                  >
                    <span className="flex items-center gap-2">
                      <span className="eyebrow inline-flex items-center gap-1.5"><IconHistory size={14} />{t.historyTitle}</span>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 tabular-nums">{visibleHistory.length}</span>
                    </span>
                    <IconChevronDown size={18} className={`shrink-0 text-slate-500 dark:text-slate-400 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
                  </button>
                  {showHistory && (
                    <div className="border-t border-slate-200 dark:border-slate-800">
                      <div className="flex flex-wrap gap-2 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800">
                        {(['csv', 'md'] as const).map(format => (
                          <button key={format} type="button" onClick={() => exportResults(format)}
                            className={`h-10 sm:h-8 px-3 rounded-lg text-xs font-semibold ${OUTLINE_BTN} inline-flex items-center gap-1.5`}>
                            {exportCopied === format ? <IconCheck size={14} /> : <IconCopy size={14} />}
                            {exportCopied === format ? t.queueCopied : format === 'csv' ? t.queueExport : t.exportMarkdown}
                          </button>
                        ))}
                        <button type="button" onClick={downloadCsv}
                          className={`h-10 sm:h-8 px-3 rounded-lg text-xs font-semibold ${OUTLINE_BTN} inline-flex items-center gap-1.5`}>
                          <IconDownload size={14} />{t.downloadCsv}
                        </button>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {[...visibleHistory].reverse().map((round, i) => {
                          const result = roundResult(round);
                          const label = roundLabel(round, visibleHistory.length - 1 - i);
                          const votes = Object.entries(round.votes);
                          // Two voters of this round whose names read alike (anonymous rounds have none).
                          const alike = lookalikeIds(votes.map(([uid, v]) => [uid, v.name] as const));
                          return (
                            <div key={round.ts} className={`px-4 py-2.5 group/h ${i > 0 ? 'border-t border-slate-100 dark:border-slate-800' : ''}`}>
                              <div className={`flex items-center justify-between gap-3 ${votes.length ? 'mb-1.5' : ''}`}>
                                <span className={`text-sm font-semibold text-slate-900 dark:text-slate-100 ${STORY_LINE} min-w-0 flex-1 text-start`} dir="auto" title={label}>{round.item ? linkify(round.item, settings.issueUrl) : label}</span>
                                {canRun && (
                                  <button type="button" onClick={() => reestimate(label)} aria-label={`${t.reestimate}: ${label}`} title={t.reestimate}
                                    className={`shrink-0 w-10 h-10 -my-2.5 sm:w-7 sm:h-7 sm:-my-1 rounded-lg inline-flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 sm:pointer-fine:opacity-0 sm:pointer-fine:group-hover/h:opacity-100 sm:pointer-fine:group-focus-within/h:opacity-100 focus-visible:opacity-100`}>
                                    <IconRotate size={13} />
                                  </button>
                                )}
                                {round.final ? (
                                  <span className="shrink-0 inline-flex items-center gap-1.5" title={t.finalEstimate}>
                                    {result && <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">Ø <CardFace card={result} /></span>}
                                    <span className="pc pc-match min-w-7 h-9 px-1.5 rounded-[5px] inline-flex items-center justify-center text-sm font-bold"><CardFace card={round.final} /></span>
                                  </span>
                                ) : result && <span className="text-sm font-bold text-slate-900 dark:text-slate-100 shrink-0 tabular-nums"><CardFace card={result} /></span>}
                              </div>
                              {votes.length > 0 && <div className="flex flex-wrap gap-1.5">
                                {votes.map(([uid, v]) => (
                                  <span key={uid} className="inline-flex max-w-full min-w-0 items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
                                    {v.name && <span className="font-medium truncate min-w-0" dir="auto" title={v.name}>{v.name}</span>}
                                    {v.name && alike.has(uid) && <NameTag id={uid} />}
                                    <span className="shrink-0 font-bold text-slate-900 dark:text-slate-100"><CardFace card={v.card} /></span>
                                  </span>
                                ))}
                              </div>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

              </div>{/* end session so far */}
            </div>
          </div>{/* end space-y-3 */}
        </main>

        {/* ── Chat panel (bottom sheet on phones, floating panel from sm) ── */}
        {chatOpen && (
          <aside aria-label={t.chatTitle} onKeyDown={e => { if (e.key === 'Escape') { e.stopPropagation(); closeChat(); } }}
            className="fixed z-40 glass-strong flex flex-col overflow-hidden animate-pop-in max-sm:inset-x-0 max-sm:bottom-0 max-sm:h-[60dvh] max-sm:rounded-t-xl max-sm:pb-[env(safe-area-inset-bottom)] sm:end-3 sm:bottom-3 sm:w-72 sm:h-96 sm:max-h-[calc(100dvh-5rem)] sm:rounded-xl">
            {/* Header */}
            <div className="ps-4 pe-2 h-11 shrink-0 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 inline-flex items-center gap-2"><IconChat size={15} className="text-slate-500 dark:text-slate-400" />{t.chatTitle}</span>
              <button type="button" onClick={() => { setChatOpen(prev => { chatOpenRef.current = !prev; return !prev; }); }}
                aria-label={rt.close} title={rt.close}
                className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                <IconX size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2" role="log" aria-live="polite">
              {chatMessages.length === 0 && (
                <p className="text-center text-slate-500 dark:text-slate-400 text-[13px] py-8">{t.chatEmpty}</p>
              )}
              {chatMessages.map(msg => {
                const isOwn = msg.userId === user.id;
                return (
                  <div key={msg.id} className={`flex gap-1.5 ${isOwn ? 'flex-row-reverse' : ''}`}>
                    <div className={`max-w-[85%] ${isOwn ? 'text-end' : ''}`}>
                      {!isOwn && (
                        <p className="flex items-center gap-1 min-w-0 mb-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          <span className="truncate" dir="auto" title={msg.userName}>{msg.userName}</span>
                          {chatLookalikes.has(msg.userId) && <NameTag id={msg.userId} />}
                        </p>
                      )}
                      <div dir="auto" className={`inline-block max-w-full px-2.5 py-1.5 rounded-xl text-[13px] leading-snug text-start wrap-anywhere ${isOwn
                        ? 'bg-accent-50 dark:bg-accent-500/15 text-slate-900 dark:text-slate-50 ring-1 ring-inset ring-accent-100 dark:ring-accent-500/25 rounded-se-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-ss-sm'
                        }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="px-2.5 py-2 shrink-0 border-t border-slate-200 dark:border-slate-800">
              <form onSubmit={e => { e.preventDefault(); sendChatMessage(); }} className="flex gap-1.5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onPaste={e => pasteOneLine(e)}
                  dir="auto"
                  placeholder={t.chatPlaceholder}
                  aria-label={t.chatPlaceholder}
                  maxLength={MAX_CHAT}
                  className={`${FIELD} ${FIELD_EDGE} flex-1 min-w-0 h-10 sm:h-9 px-3 rounded-lg text-base sm:text-sm`}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  aria-label={rt.send}
                  title={rt.send}
                  className="w-10 h-10 sm:w-9 sm:h-9 shrink-0 rounded-lg btn-primary text-white flex items-center justify-center disabled:opacity-30"
                ><IconArrowRight size={16} strokeWidth={2.5} className="-rotate-90" /></button>
              </form>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}
