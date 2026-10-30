import { IconCoffee, IconCrown, IconEye, IconLink } from '@/app/icons';
import { LogoMark } from '@/app/Logo';
import type { Locale } from '@/lib/translations';
// The room's playing cards (pc-*), so the preview's cards are the room's own.
import '@/app/(en)/room/[id]/room.css';

/**
 * Static, decorative mock of a planning poker room for the landing page hero.
 * Pure markup: no state, no network, no images. Its few labels come from the
 * page (in the visitor's language); the tree is hidden from assistive tech.
 * Drawn with the real room's pieces (app/(en)/room/[id], room.css), a size smaller: seats on
 * a table, red card backs for the votes in, a dashed place for the rest, and a hand of white
 * playing cards with the picked one framed in red and lifted.
 */

type Person = {
  name: string;
  /** An avatar from the picker, or the name's initial. */
  face: string;
  state: 'voted' | 'waiting' | 'watching';
  host?: boolean;
  me?: boolean;
};

// The same people as the demo page (app/demo/DemoPage.tsx).
const PEOPLE: Person[] = [
  { name: 'Aleyna', face: '🦊', state: 'voted', host: true },
  { name: 'Bob', face: '🐻', state: 'voted' },
  { name: 'Carol', face: '🐱', state: 'voted' },
  { name: 'Damla', face: 'D', state: 'waiting' },
  { name: 'Mert', face: 'M', state: 'watching' },
  // Name and initial come from the page's word for "you".
  { name: 'You', face: 'Y', state: 'voted', me: true },
];

// `wide` cards are dropped on phones so the row never gets cramped.
const CARDS: { label: string; wide?: boolean; selected?: boolean }[] = [
  { label: '0', wide: true },
  { label: '1' },
  { label: '2' },
  { label: '3' },
  { label: '5', selected: true },
  { label: '8' },
  { label: '13' },
  { label: '21', wide: true },
  { label: '?' },
  { label: '☕', wide: true },
];

const PANEL = 'rounded-xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900';

/** ♦ drawn, so it is the same shape everywhere (as the room draws it). */
function Pip({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 12" focusable="false" className={className}>
      <path d="M5 0 9.5 6 5 12 .5 6z" fill="currentColor" />
    </svg>
  );
}

/** A card's corner index, as in the room: its value over a pip, red like the suit. */
function CardIndex({ card, corner }: { card: string; corner: 'top' | 'bottom' }) {
  return (
    <span className={`pc-index absolute flex flex-col items-center gap-px text-[8px] font-bold leading-none ${corner === 'top' ? 'left-1 top-1' : 'bottom-1 right-1 rotate-180'}`}>
      {card === '☕' ? <IconCoffee className="h-[1em] w-[1em]" strokeWidth={2.5} /> : card}
      <Pip className="h-1.5 w-1" />
    </span>
  );
}

/** The card in a seat: face down once they've voted, an empty place while they think. */
function SeatCard({ state }: { state: Person['state'] }) {
  if (state === 'voted') {
    return (
      <span className="pc-back h-10 w-7 rounded-[5px]">
        <svg viewBox="-2 -2 14 16" focusable="false" className="relative h-3 w-2.5">
          <path d="M5 0 9.5 6 5 12 .5 6z" fill="#FFFFFF" strokeWidth="3" paintOrder="stroke" strokeLinejoin="round" className="pc-back-pip" />
        </svg>
      </span>
    );
  }
  if (state === 'waiting') {
    return (
      <span className="inline-flex h-10 w-7 items-center justify-center rounded-[5px] border-[1.5px] border-dashed border-slate-300 bg-slate-50/70 text-slate-300 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-700">
        <Pip className="h-2 w-1.5" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-10 w-7 items-center justify-center text-slate-400 dark:text-slate-500">
      <IconEye size={14} />
    </span>
  );
}

function Seat({ p }: { p: Person }) {
  const emoji = p.face.length > 1;
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-lg bg-white px-2 py-2.5 shadow-card ring-1 ring-slate-200/80 dark:bg-slate-900 dark:ring-slate-800">
      <div className="relative">
        <div className={`rounded-full ${p.me ? 'ring-2 ring-accent-500 ring-offset-2 ring-offset-white dark:ring-accent-400 dark:ring-offset-slate-900' : ''}`}>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 ${emoji ? 'text-base' : 'text-sm font-semibold'}`}>
            {p.face}
          </div>
        </div>
        {p.host && (
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full border border-slate-200 bg-white text-amber-600 dark:border-slate-600 dark:bg-slate-800 dark:text-amber-400">
            <IconCrown size={9} fill="currentColor" />
          </span>
        )}
      </div>
      <span className={`text-xs ${p.me ? 'font-semibold text-slate-900 dark:text-slate-50' : 'font-medium text-slate-700 dark:text-slate-200'}`}>
        {p.name}
      </span>
      <SeatCard state={p.state} />
    </div>
  );
}

export interface RoomPreviewLabels { you: string; room: string; copyLink: string; story: string; storyText: string; reveal: string; deck: string }

/** The first letter of the word, upper-cased the way the language does it (Turkish i → İ). */
function initialOf(word: string, locale: Locale): string {
  return (Array.from(word.trim())[0] ?? '?').toLocaleUpperCase(locale);
}

export function RoomPreview({ labels, locale, className = '' }: { labels: RoomPreviewLabels; locale: Locale; className?: string }) {
  const myInitial = initialOf(labels.you, locale);
  return (
    // Left to right like the room's own deck and row of cards.
    <div aria-hidden="true" dir="ltr" className={`pointer-events-none select-none ${className}`}>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-overlay dark:border-slate-700 dark:bg-slate-950">

        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-800">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
          </div>
          <div className="mx-auto flex min-w-0 max-w-[70%] flex-1 items-center justify-center rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500 dark:border-transparent dark:bg-slate-950 dark:text-slate-400">
            <span className="truncate">scrumpokerplay.com/room/SPRINT42</span>
          </div>
          <span className="w-[42px]" />
        </div>

        {/* Room header */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900">
          <LogoMark size={22} />
          <span className="text-sm font-bold text-slate-900 dark:text-white">{labels.room}</span>
          <span className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:text-slate-200">
            <IconLink size={12} />
            {labels.copyLink}
          </span>
          <span className="ml-auto hidden rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 min-[420px]:block dark:border-slate-700 dark:text-slate-300">
            {labels.deck}
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-700 max-[419px]:ml-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">{myInitial}</span>
        </div>

        <div className="space-y-3 p-3 sm:p-4">
          {/* Current story: a red edge and label, as in the room */}
          <div className={`${PANEL} border-s-[3px] border-s-accent-500 px-3 py-2 dark:border-s-accent-400`}>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-accent-700 dark:text-accent-400">{labels.story}</span>
            <span className="flex items-baseline gap-2">
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{labels.storyText}</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">+2</span>
            </span>
          </div>

          {/* Participants: seats on a table */}
          <div className={`${PANEL} p-3`}>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-4/5 rounded-full bg-accent-500" />
              </div>
              <span className="text-xs font-semibold tabular-nums text-slate-600 dark:text-slate-300">4/5</span>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-100/80 p-2 ring-1 ring-inset ring-slate-200/80 dark:bg-slate-950/60 dark:ring-slate-800">
              {PEOPLE.map(p => <Seat key={p.name} p={p.me ? { ...p, name: labels.you, face: myInitial } : p} />)}
            </div>
          </div>

          {/* Reveal */}
          <div className="flex justify-center">
            <span className="btn-primary flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white">
              {labels.reveal}
              <span className="rounded-md bg-accent-800/50 px-1.5 py-0.5 text-xs font-bold tabular-nums text-white">4/5</span>
            </span>
          </div>

          {/* Hand: the room's playing cards; the chosen one played (pc-on: lifted, framed in red) */}
          <div className={`${PANEL} px-2.5 pb-3 pt-5 sm:px-3`}>
            <div className="flex gap-1.5">
              {CARDS.map(c => (
                <span
                  key={c.label}
                  className={`${c.wide ? 'hidden sm:flex' : 'flex'} pc aspect-[5/7] min-w-0 flex-1 items-center justify-center rounded-[7px] text-base font-bold tabular-nums tracking-tight ${c.selected ? 'pc-on -translate-y-2.5' : ''}`}
                >
                  <CardIndex card={c.label} corner="top" />
                  {c.label === '☕' ? <IconCoffee size={16} /> : c.label}
                  <CardIndex card={c.label} corner="bottom" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
