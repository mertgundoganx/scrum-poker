'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { localizedPath } from '@/lib/localePath';
import { fill } from '@/lib/i18n';
import { browserId } from '@/lib/browserId';
import { splitCardInput, limitCardInput, cleanCustomCards, type DeckType } from '@/lib/deck';
import { ownedRooms, forgetOwnedRoom, type OwnedRoom } from '@/lib/ownedRooms';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { ConfirmDialog } from './ConfirmDialog';
import { RoomPreview } from './RoomPreview';
import { ROOM_TEXT } from './(en)/room/[id]/roomText';
import { CardFan, StepCard, accentBand, iconTile, linkCard, secondaryButton } from './surfaces';
import { AVATARS, MAX_NAME, MAX_ROOM_NAME, MIN_CUSTOM_CARDS } from '@/lib/limits';
import { FAQ_KEYS } from './homeFaq';
import {
  IconArrowRight, IconChart, IconChat, IconCrown, IconEye, IconGift, IconHash, IconHistory, IconLayers,
  IconList, IconPencil, IconQr, IconShirt, IconTimer, IconUnlock, IconX, IconZap,
} from './icons';

const AVATAR_PRESETS = AVATARS;

interface RecentRoom { id: string; name: string; ts: number; }

/**
 * Rooms open as a full page load, never an in-app navigation: only a page
 * loaded fresh gets the room's own strict Content-Security-Policy (proxy.ts).
 */
function goToRoom(id: string) {
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- a fresh load is the point
  window.location.assign(`/room/${id}`);
}

// Storage and network helpers live outside the component: the React Compiler
// can't optimize a component whose body has these try/catch shapes.

/** Rooms opened recently on this device that still exist. */
async function stillOpenRecentRooms(): Promise<RecentRoom[]> {
  let stored: RecentRoom[] = [];
  try {
    stored = JSON.parse(localStorage.getItem('scrumPoker_recentRooms') ?? '[]');
  } catch { return []; }
  if (!Array.isArray(stored) || !stored.length) return [];
  // 'gone' only on a 404: a busy server or no connection says nothing about the room.
  const results = await Promise.all(
    stored.map(r => fetch(`/api/rooms/${r.id}?summary=1`)
      .then(res => (res.ok ? r : res.status === 404 ? 'gone' as const : null))
      .catch(() => null)),
  );
  // A room that is gone is forgotten, so it isn't asked about on every visit.
  if (results.includes('gone')) {
    try {
      localStorage.setItem('scrumPoker_recentRooms', JSON.stringify(stored.filter((_, i) => results[i] !== 'gone')));
    } catch { /* storage blocked: asked again next time */ }
  }
  return results.filter((r): r is RecentRoom => r !== null && r !== 'gone');
}

/**
 * Stop keeping a room this browser owns. True once it is let go (or was
 * already: the key no longer works); false if the server couldn't be asked.
 */
async function stopKeeping(room: OwnedRoom): Promise<boolean> {
  try {
    const res = await fetch(`/api/rooms/${room.id}/keep`, {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ownerKey: room.key }),
    });
    return res.ok || res.status === 403;
  } catch {
    return false;
  }
}

/** The nickname and avatar chosen last on this device. */
function savedProfile(): { name: string; avatar: string } {
  try {
    const u = JSON.parse(localStorage.getItem('scrumPoker_user') ?? 'null');
    return { name: typeof u?.name === 'string' ? u.name : '', avatar: typeof u?.avatar === 'string' ? u.avatar : '' };
  } catch {
    return { name: '', avatar: '' };
  }
}

/** Remember the nickname and avatar for next time; with storage blocked (private mode), don't. */
function saveProfile(name: string, avatar: string) {
  try {
    localStorage.setItem('scrumPoker_user', JSON.stringify({ name, avatar }));
  } catch { /* nothing to remember it in */ }
}

/** Why a request to the rooms API didn't work out. */
type Failure = 'notFound' | 'busy' | 'rateLimited' | 'offline' | 'failed';
type Outcome = { id: string } | { failure: Failure };

async function failureOf(res: Response): Promise<Failure> {
  if (res.status === 404) return 'notFound';
  if (res.status === 503) return 'busy';
  if (res.status !== 429) return 'failed';
  // 429 is either this address asking too fast or too many rooms open from its network.
  const body = await res.json().catch(() => null);
  return body?.code === 'busy' ? 'busy' : 'rateLimited';
}

/** Open a room: its code, or why not. */
async function openRoom(body: object): Promise<Outcome> {
  const res = await fetch('/api/rooms', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  }).catch(() => null);
  if (!res) return { failure: 'offline' };
  if (!res.ok) return { failure: await failureOf(res) };
  const room = await res.json().catch(() => null);
  return typeof room?.id === 'string' ? { id: room.id } : { failure: 'failed' };
}

/** Whether the room `code` exists (live or kept). */
async function findRoom(code: string): Promise<Outcome> {
  const res = await fetch(`/api/rooms/${code}`).catch(() => null);
  if (!res) return { failure: 'offline' };
  return res.ok ? { id: code } : { failure: await failureOf(res) };
}

/** Room codes are 8 letters and digits (lib/store.ts). */
const ROOM_CODE_LENGTH = 8;

/**
 * The room code in what was typed or pasted: the code of an invite link, else the letters
 * and digits (a code read out as "abcd-2345" or "ABCD 2345" works too), in capitals.
 */
function roomCodeFrom(text: string): string {
  const fromLink = text.match(/\/room\/([^/?#\s]*)/)?.[1];
  return (fromLink ?? text).replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, ROOM_CODE_LENGTH);
}

type FieldName = 'name' | 'roomName' | 'roomCode' | 'customCards';
type FieldErrorKey =
  | 'errNameRequired' | 'errRoomNameRequired' | 'errRoomCodeRequired' | 'errRoomCodeInvalid' | 'errRoomNotFound' | 'errCustomCardsMin';
/** What is wrong with each field, as interface text keys (shown in the page's language). */
type FieldErrors = Partial<Record<FieldName, FieldErrorKey>>;
type FormErrorKey = 'errCreateRoom' | 'errJoin' | 'errServerBusy' | 'errNetwork' | 'actionRateLimited';

// An invalid field (aria-invalid) turns red through .input-glow in globals.css, focused or not.
const INPUT =
  'input-glow w-full px-3 py-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-600/20 dark:focus:ring-accent-400/25 transition-[color,background-color,border-color,box-shadow] text-base sm:text-sm';

/** A chosen option (avatar, deck): a red frame on a faint red tint, like the card picked in the room. */
const OPTION_ON = 'border-accent-500 bg-accent-50 text-accent-800 ring-1 ring-accent-500 dark:border-accent-400 dark:bg-accent-500/15 dark:text-accent-100 dark:ring-accent-400';
const OPTION_OFF = 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-800';

/** Text links on the page: ink, with a red underline. */
const TEXT_LINK = 'font-medium text-slate-800 underline decoration-accent-500/60 underline-offset-[3px] transition-colors hover:text-accent-700 dark:text-slate-100 dark:hover:text-accent-400';

/** One page-wide column, the header's and footer's too. */
const CONTAINER = 'mx-auto w-full max-w-6xl px-4';

// Chinese has no spaces: a heading breaks only where its text allows one (zh heroTitle has
// a zero-width space), not inside a word; a part too long for the line still wraps.
const HEADING_WRAP = 'break-keep wrap-anywhere';
const H2 = 'text-2xl sm:text-[2rem] sm:leading-tight font-bold tracking-[-0.02em] text-slate-900 dark:text-white';

function SectionHeading({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
      <h2 className={`${H2} text-balance ${HEADING_WRAP}`}>{title}</h2>
      {lead && <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">{lead}</p>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 wrap-break-word animate-pop-in">
      {children}
    </p>
  );
}

/** The home page's visible part: the create / join form and the sections below it. */
export default function HomeView() {
  const { t, locale } = useLanguage();
  const [tab, setTab] = useState<'create' | 'join'>('create');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [roomName, setRoomName] = useState('');
  const [deckType, setDeckType] = useState<DeckType>('scrum');
  const [customCards, setCustomCards] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FormErrorKey | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [recentRooms, setRecentRooms] = useState<RecentRoom[]>([]);
  const [keptRooms, setKeptRooms] = useState<OwnedRoom[]>([]);
  // The kept room waiting for "really stop keeping it?".
  const [confirmForget, setConfirmForget] = useState<OwnedRoom | null>(null);

  useEffect(() => {
    void stillOpenRecentRooms().then(rooms => { if (rooms.length) setRecentRooms(rooms); });
  }, []);

  // Once, from storage: the nickname and avatar chosen last, and the rooms
  // this browser keeps.
  useEffect(() => {
    const saved = savedProfile();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- storage exists only in the browser, after mount
    if (saved.name) setName(saved.name);
    if (saved.avatar) setAvatar(saved.avatar);
    setKeptRooms(ownedRooms());
  }, []);

  async function forgetKeptRoom(room: OwnedRoom) {
    setConfirmForget(null);
    setKeptRooms(rooms => rooms.filter(r => r.id !== room.id));
    if (await stopKeeping(room)) forgetOwnedRoom(room.id);
    else setKeptRooms(ownedRooms());
  }
  /** Mark these fields invalid and put the cursor in the first one. */
  function showFieldErrors(errors: FieldErrors) {
    setFieldErrors(errors);
    const first = Object.keys(errors)[0];
    if (first) document.getElementById(`home-${first}`)?.focus();
  }

  /** What the server's no means for this form, in words for the visitor. */
  function failureText(failure: Failure): FormErrorKey {
    if (failure === 'busy') return 'errServerBusy';
    if (failure === 'rateLimited') return 'actionRateLimited';
    if (failure === 'offline') return 'errNetwork';
    return tab === 'create' ? 'errCreateRoom' : 'errJoin';
  }

  async function handleCreate() {
    setLoading(true);
    saveProfile(name.trim(), avatar);
    const result = await openRoom({
      name: roomName.trim(), creatorId: browserId(), creatorName: name.trim(), creatorAvatar: avatar, deckType,
      ...(deckType === 'custom' ? { customCards: splitCardInput(customCards) } : {}),
    });
    if ('failure' in result) {
      setError(failureText(result.failure));
      setLoading(false);
      return;
    }
    // Stay "loading" until the room page takes over: a second click would
    // create a second room.
    goToRoom(result.id);
  }

  async function handleJoin() {
    setLoading(true);
    saveProfile(name.trim(), avatar);
    const result = await findRoom(roomCode);
    if ('failure' in result) {
      setLoading(false);
      // A wrong code is the code field's problem; anything else is the form's.
      if (result.failure === 'notFound') showFieldErrors({ roomCode: 'errRoomNotFound' });
      else setError(failureText(result.failure));
      return;
    }
    goToRoom(result.id);
  }

  // The submit button always looks enabled; every missing or malformed field is reported
  // inline and the first one gets focus, instead of silently disabling the main CTA.
  function fieldProblems(): FieldErrors {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = 'errNameRequired';
    if (tab === 'join') {
      if (!roomCode) errors.roomCode = 'errRoomCodeRequired';
      else if (roomCode.length !== ROOM_CODE_LENGTH) errors.roomCode = 'errRoomCodeInvalid';
    } else {
      if (!roomName.trim()) errors.roomName = 'errRoomNameRequired';
      // Counted the way the server counts them: "5, 5" is one card.
      if (deckType === 'custom' && cleanCustomCards(splitCardInput(customCards)).length < MIN_CUSTOM_CARDS) errors.customCards = 'errCustomCardsMin';
    }
    return errors;
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    const errors = fieldProblems();
    showFieldErrors(errors);
    if (Object.keys(errors).length) return;
    if (tab === 'create') void handleCreate(); else void handleJoin();
  }

  const invalid = (field: FieldName) => fieldErrors[field] !== undefined;
  const fieldError = (field: FieldName) => {
    const key = fieldErrors[field];
    return key && <FieldError id={`home-${field}-error`}>{t[key]}</FieldError>;
  };

  function clearFieldError(field: FieldName) {
    if (!invalid(field)) return;
    setFieldErrors(errors => {
      const rest = { ...errors };
      delete rest[field];
      return rest;
    });
  }

  function selectTab(next: 'create' | 'join', focus = false) {
    setTab(next); setError(null); setFieldErrors({});
    if (focus) document.getElementById(`home-tab-${next}`)?.focus();
  }

  // By code point, not UTF-16 unit: a name starting with an emoji shows the emoji, not half of it.
  const previewInitial = Array.from(name.trim())[0]?.toLocaleUpperCase(locale) ?? '?';

  const DECK_OPTIONS: { val: DeckType; label: string; Icon: typeof IconHash }[] = [
    { val: 'scrum', label: t.deckScrum, Icon: IconLayers },
    { val: 'fibonacci', label: t.deckFibonacci, Icon: IconHash },
    { val: 'tshirt', label: t.deckTshirt, Icon: IconShirt },
    { val: 'powers', label: t.deckPowers, Icon: IconZap },
    { val: 'custom', label: t.deckCustomLabel, Icon: IconPencil },
  ];

  const TRUST_CHIPS = [
    { Icon: IconZap, label: t.feat1 },
    { Icon: IconGift, label: t.feat2 },
    { Icon: IconUnlock, label: t.feat3 },
  ];

  const HOW_STEPS = [
    { num: '1', title: t.howStep1Title, desc: t.howStep1Desc },
    { num: '2', title: t.howStep2Title, desc: t.howStep2Desc },
    { num: '3', title: t.howStep3Title, desc: t.howStep3Desc },
  ];

  // Same maker, and they run this site: Shipwick deploys it, ReliableUptime watches it.
  const PROJECTS = [
    { name: 'Shipwick', site: 'shipwick.com', href: 'https://shipwick.com/', logo: '/brands/shipwick.svg', desc: t.homeProjectsShipwickDesc },
    { name: 'ReliableUptime', site: 'reliableuptime.com', href: 'https://reliableuptime.com/', logo: '/brands/reliableuptime.svg', desc: t.homeProjectsUptimeDesc },
  ];

  const FEATURE_GRID = [
    { Icon: IconLayers, title: t.homeFeatDecksTitle, desc: t.homeFeatDecksDesc },
    { Icon: IconEye, title: t.homeFeatRevealTitle, desc: t.homeFeatRevealDesc },
    { Icon: IconChart, title: t.homeFeatStatsTitle, desc: t.homeFeatStatsDesc },
    { Icon: IconChat, title: t.homeFeatChatTitle, desc: t.homeFeatChatDesc },
    { Icon: IconList, title: t.homeFeatQueueTitle, desc: t.homeFeatQueueDesc },
    { Icon: IconTimer, title: t.homeFeatTimerTitle, desc: t.homeFeatTimerDesc },
    { Icon: IconCrown, title: t.homeFeatSpectatorTitle, desc: t.homeFeatSpectatorDesc },
    { Icon: IconQr, title: t.homeFeatInviteTitle, desc: t.homeFeatInviteDesc },
  ];

  const FAQ_ITEMS = FAQ_KEYS.map(n => ({ q: t[`homeFaq${n}Q`], a: t[`homeFaq${n}A`] }));

  const LEARN_LINKS = [
    { href: localizedPath(locale, '/guide'), title: t.homeLinkGuideTitle, desc: t.homeLinkGuideDesc },
    { href: localizedPath(locale, '/fibonacci-planning-poker'), title: t.homeLinkFibTitle, desc: t.homeLinkFibDesc },
    { href: localizedPath(locale, '/t-shirt-sizing'), title: t.homeLinkTshirtTitle, desc: t.homeLinkTshirtDesc },
    { href: localizedPath(locale, '/planning-poker-cards'), title: t.homeLinkCardsTitle, desc: t.homeLinkCardsDesc },
    { href: localizedPath(locale, '/blog'), title: t.homeLinkBlogTitle, desc: t.homeLinkBlogDesc },
    { href: localizedPath(locale, '/demo'), title: t.homeLinkDemoTitle, desc: t.homeLinkDemoDesc },
  ];

  return (
    <>
      <SiteHeader />
      <main className="flex-1 w-full">

        {/* ── Hero: pitch + form on the left, product preview on the right ── */}
        <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16">
          <div className={`${CONTAINER} grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-14`}>

            <div className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
              <div className="text-center lg:text-start">
                <p className="eyebrow mb-4 flex items-center justify-center gap-2 lg:justify-start">
                  <span aria-hidden="true" className="text-accent-600 dark:text-accent-400">♦</span>
                  {t.heroBadge}
                </p>

                <h1 className={`text-[2rem] leading-[1.1] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05] font-bold tracking-[-0.025em] text-slate-900 dark:text-white text-balance ${HEADING_WRAP}`}>{t.heroTitle}</h1>
                <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 text-pretty">{t.heroSub}</p>

                {/* What it promises, in a quiet line */}
                <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start">
                  {TRUST_CHIPS.map(({ Icon, label }) => (
                    <li key={label} className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                      <Icon size={15} className="text-accent-600 dark:text-accent-400" />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Create / join card ── */}
              <div id="create" className="glass-strong mt-8 scroll-mt-24 rounded-xl overflow-hidden">

                {/* Tabs */}
                <div role="tablist" aria-label={`${t.tabCreate} / ${t.tabJoin}`} className="flex p-1 gap-1 bg-slate-100 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                  {(['create', 'join'] as const).map(tb => (
                    <button
                      key={tb}
                      type="button"
                      role="tab"
                      id={`home-tab-${tb}`}
                      aria-selected={tab === tb}
                      aria-controls="home-tabpanel"
                      tabIndex={tab === tb ? 0 : -1}
                      onClick={() => selectTab(tb)}
                      onKeyDown={e => {
                        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                          e.preventDefault();
                          selectTab(tb === 'create' ? 'join' : 'create', true);
                        }
                      }}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${tab === tb
                        // The open tab: a white sheet with a red edge along its foot.
                        ? 'bg-white text-slate-900 shadow-[inset_0_-2px_0_var(--color-accent-500),var(--depth-card)] dark:bg-slate-800 dark:text-white dark:shadow-[inset_0_-2px_0_var(--color-accent-400),var(--depth-card)]'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 hover:text-slate-900 dark:hover:bg-slate-800/50 dark:hover:text-white'
                      }`}
                    >
                      {tb === 'create' ? t.tabCreate : t.tabJoin}
                    </button>
                  ))}
                </div>

                <div role="tabpanel" id="home-tabpanel" aria-labelledby={`home-tab-${tab}`}>
                  <form onSubmit={handleSubmit} noValidate className="p-5 space-y-4">

                    {/* Profile row */}
                    <div>
                      <div className="flex items-center gap-3">
                        <div aria-hidden="true" className="shrink-0 w-11 h-11 rounded-full bg-accent-50 dark:bg-accent-500/15 border border-accent-200 dark:border-accent-400/30 flex items-center justify-center text-xl select-none">
                          {avatar || <span className="font-bold text-accent-700 dark:text-accent-200 text-base">{previewInitial}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <label htmlFor="home-name" className="sr-only">{t.nameLabel}</label>
                          <input
                            id="home-name" name="name" type="text" autoComplete="nickname" dir="auto"
                            value={name}
                            onChange={e => { setName(e.target.value); clearFieldError('name'); }}
                            placeholder={t.nameLabel} maxLength={MAX_NAME} required
                            aria-invalid={invalid('name')}
                            aria-describedby={invalid('name') ? 'home-name-error' : undefined}
                            className={INPUT}
                          />
                        </div>
                      </div>
                      {fieldError('name')}
                    </div>

                    {/* Avatar picker: eight in a row from 440px, six from 360px, four below (a
                        button stays 40px wide for a finger); min-w-0 lets the grid, not the
                        tap-target floor, size them. */}
                    <div role="group" aria-label={t.avatarPickerLabel} className="grid grid-cols-4 min-[360px]:grid-cols-6 min-[440px]:grid-cols-8 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setAvatar('')}
                        aria-label={t.avatarUseInitial}
                        aria-pressed={!avatar}
                        className={`h-9 w-full min-w-0 rounded-lg border text-sm font-bold flex items-center justify-center transition-colors duration-150 ${!avatar ? OPTION_ON : OPTION_OFF}`}
                      >{previewInitial}</button>
                      {AVATAR_PRESETS.map(em => (
                        <button
                          key={em}
                          type="button"
                          onClick={() => setAvatar(em)}
                          aria-label={`${t.avatarPickerLabel}: ${em}`}
                          aria-pressed={avatar === em}
                          className={`h-9 w-full min-w-0 rounded-lg border text-base flex items-center justify-center transition-colors duration-150 ${avatar === em ? OPTION_ON : OPTION_OFF}`}
                        >{em}</button>
                      ))}
                    </div>

                    {tab === 'create' ? (
                      <>
                        <div>
                          <label htmlFor="home-roomName" className="sr-only">{t.roomNameLabel}</label>
                          <input
                            id="home-roomName" name="roomName" type="text" autoComplete="off" dir="auto"
                            value={roomName}
                            onChange={e => { setRoomName(e.target.value); clearFieldError('roomName'); }}
                            placeholder={t.roomNameLabel} required maxLength={MAX_ROOM_NAME}
                            aria-invalid={invalid('roomName')}
                            aria-describedby={invalid('roomName') ? 'home-roomName-error' : undefined}
                            className={INPUT}
                          />
                          {fieldError('roomName')}
                        </div>

                        {/* Deck type */}
                        <div>
                          <div role="group" aria-label={t.deckTypeLabel} className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                            {DECK_OPTIONS.map(({ val, label, Icon }) => (
                              <button
                                key={val}
                                type="button"
                                onClick={() => { setDeckType(val); clearFieldError('customCards'); }}
                                aria-pressed={deckType === val}
                                className={`min-w-0 py-2 px-2 rounded-lg border text-xs font-medium transition-colors duration-150 flex items-center justify-center gap-1.5 sm:flex-col sm:gap-1 ${val === 'scrum' ? 'col-span-2' : ''} ${deckType === val ? OPTION_ON : OPTION_OFF}`}
                              >
                                <Icon size={15} className="shrink-0" />
                                {/* Wraps (hyphenated in the page's language) instead of cutting "Zweierpotenzen" short at 320px. */}
                                <span className="min-w-0 text-center leading-tight hyphens-auto wrap-break-word">{label}</span>
                              </button>
                            ))}
                          </div>
                          {deckType === 'custom' && (
                            <div className="mt-3 animate-slide-up">
                              <label htmlFor="home-customCards" className="sr-only">{t.customCardsPlaceholder}</label>
                              <input
                                id="home-customCards" name="customCards" type="text" autoComplete="off"
                                value={customCards}
                                onChange={e => {
                                  setCustomCards(limitCardInput(e.target.value));
                                  clearFieldError('customCards');
                                }}
                                placeholder={t.customCardsPlaceholder}
                                aria-invalid={invalid('customCards')}
                                aria-describedby={invalid('customCards') ? 'home-customCards-error' : 'home-customCards-hint'}
                                className={INPUT}
                              />
                              {fieldError('customCards') || <p id="home-customCards-hint" className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{t.customCardsHint}</p>}
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div>
                        <label htmlFor="home-roomCode" className="sr-only">{t.roomCodeLabel}</label>
                        <input
                          id="home-roomCode" name="roomCode" type="text" autoComplete="off" autoCapitalize="characters" spellCheck={false}
                          value={roomCode}
                          onChange={e => { setRoomCode(roomCodeFrom(e.target.value)); clearFieldError('roomCode'); }}
                          placeholder={t.roomCodeLabel} required
                          aria-invalid={invalid('roomCode')}
                          aria-describedby={invalid('roomCode') ? 'home-roomCode-error' : undefined}
                          className={`${INPUT} text-base! uppercase tracking-[0.25em] font-mono text-center placeholder:tracking-normal placeholder:font-sans placeholder:normal-case`}
                        />
                        {fieldError('roomCode')}
                      </div>
                    )}

                    {error && (
                      <p role="alert" className="text-red-600 dark:text-red-400 text-sm flex items-start gap-1.5 animate-pop-in">
                        <span aria-hidden="true">⚠</span><span className="min-w-0 wrap-break-word">{t[error]}</span>
                      </p>
                    )}

                    <button type="submit" disabled={loading} className="btn-primary w-full py-3 rounded-lg text-white font-semibold text-base flex items-center justify-center gap-2">
                      {tab === 'create' ? (loading ? t.btnCreating : t.btnCreate) : (loading ? t.btnJoining : t.btnJoin)}
                      {!loading && <IconArrowRight size={18} className="rtl:rotate-180" />}
                    </button>
                  </form>
                </div>
              </div>

              <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-slate-600 dark:text-slate-400 lg:justify-start">
                <span>{t.noAccountNeeded}</span>
                <Link href={localizedPath(locale, '/demo')} className={`inline-flex items-center gap-1 ${TEXT_LINK}`}>
                  {t.demoLink}
                  <IconArrowRight size={14} className="rtl:rotate-180" />
                </Link>
              </p>

              {/* ── Rooms this browser keeps ── */}
              {keptRooms.length > 0 && (
                <div className="glass mt-6 rounded-xl p-4">
                  <p className="eyebrow mb-3 flex items-center gap-1.5">
                    <IconLayers size={14} />
                    {t.keptRoomsTitle}
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {keptRooms.map(r => (
                      <li key={r.id} className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors">
                        <a href={`/room/${r.id}`} className="flex-1 min-w-0 flex items-center gap-3 px-3 py-2.5 rounded-lg group">
                          <span className={`${iconTile} h-9 w-9`}><IconLayers size={16} /></span>
                          <span className="flex-1 min-w-0">
                            <span dir="auto" className="block text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors">{r.name}</span>
                            <span className="block text-xs font-mono text-slate-500 dark:text-slate-400">{r.id}</span>
                          </span>
                        </a>
                        <button type="button" onClick={() => setConfirmForget(r)} aria-label={`${t.keptRoomsRemove}: ${r.name}`} title={t.keptRoomsRemove}
                          className="shrink-0 w-9 h-9 me-1.5 rounded-lg inline-flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                          <IconX size={15} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ── Recent rooms (in the form column so it never overlaps the hero) ── */}
              {recentRooms.length > 0 && (
                <div className="glass mt-6 rounded-xl p-4">
                  <p className="eyebrow mb-3 flex items-center gap-1.5">
                    <IconHistory size={14} />
                    {t.recentRooms}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {recentRooms.map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => goToRoom(r.id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group text-start"
                      >
                        <span className={`${iconTile} h-9 w-9`}><IconLayers size={16} /></span>
                        <span className="flex-1 min-w-0">
                          <span dir="auto" className="block text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors">{r.name}</span>
                          <span className="block text-xs font-mono text-slate-500 dark:text-slate-400">{r.id}</span>
                        </span>
                        <span className="shrink-0 flex items-center gap-1 text-xs font-semibold text-slate-700 group-hover:text-accent-700 dark:text-slate-200 dark:group-hover:text-accent-400 transition-colors">
                          {t.recentRoomsJoin}
                          <IconArrowRight size={14} className="rtl:rotate-180" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Product preview ── */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              {/* Two loose cards on the table behind the room (large screens), the room's own
                  (room.css, loaded with RoomPreview): a red back, and an 8 face up */}
              <span aria-hidden="true" className="pc-back absolute -end-5 -top-8 hidden h-28 w-20 rotate-[14deg] rounded-[10px] shadow-raised lg:inline-flex rtl:-rotate-[14deg]">
                <svg viewBox="-2 -2 14 16" focusable="false" className="relative h-7 w-6">
                  <path d="M5 0 9.5 6 5 12 .5 6z" fill="#FFFFFF" strokeWidth="3" paintOrder="stroke" strokeLinejoin="round" className="pc-back-pip" />
                </svg>
              </span>
              <span aria-hidden="true" className="pc absolute -start-12 bottom-16 hidden h-28 w-20 -rotate-[10deg] items-center justify-center rounded-[10px] text-3xl font-bold shadow-raised lg:flex rtl:rotate-[10deg]">
                8
                <span className="pc-index absolute left-2 top-1.5 flex flex-col items-center gap-px text-xs font-bold leading-none">8<span className="text-[9px]">♦</span></span>
                <span className="pc-index absolute bottom-1.5 right-2 flex rotate-180 flex-col items-center gap-px text-xs font-bold leading-none">8<span className="text-[9px]">♦</span></span>
              </span>
              <RoomPreview className="relative" locale={locale} labels={{ you: t.you, room: t.previewRoomName, copyLink: t.copyLink, story: (ROOM_TEXT[locale] ?? ROOM_TEXT.en).story, storyText: t.previewStory, reveal: t.revealVotes, deck: t.deckFibonacci }} />
              <p className="mx-auto mt-5 max-w-md text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400 text-balance">{t.homePreviewCaption}</p>
            </div>
          </div>
        </section>

        {/* ── How It Works: three steps, each numbered on a small card, joined by a dashed line ── */}
        <section className="section-band py-16 sm:py-20">
          <div className={CONTAINER}>
            <SectionHeading title={t.howTitle} lead={t.howLead} />
            <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              {HOW_STEPS.map(({ num, title, desc }, i) => (
                <li key={num} className="relative">
                  {i < HOW_STEPS.length - 1 && (
                    <span aria-hidden="true" className="absolute start-16 end-2 top-7 hidden border-t border-dashed border-slate-300 sm:block dark:border-slate-700" />
                  )}
                  <StepCard n={num} picked={i === HOW_STEPS.length - 1} />
                  <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-balance text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Feature grid: a card per feature ── */}
        <section className="py-16 sm:py-20">
          <div className={CONTAINER}>
            <SectionHeading title={t.homeFeatTitle} lead={t.homeFeatLead} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURE_GRID.map(({ Icon, title, desc }) => (
                <div key={title} className={`rounded-xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900`}>
                  <span aria-hidden="true" className={`${iconTile} mb-4 h-10 w-10`}><Icon size={20} /></span>
                  <h3 className="text-base font-semibold leading-snug text-balance text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What is Planning Poker? ── */}
        <section className="section-band py-16 sm:py-20">
          <div className={`${CONTAINER} grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14`}>
            <h2 className={`${H2} text-balance ${HEADING_WRAP}`}>{t.homeWhatTitle}</h2>
            <div className="max-w-2xl space-y-5 text-base leading-7 text-slate-600 dark:text-slate-300">
              <p className="border-s-2 border-accent-500 ps-5 text-lg leading-8 text-slate-800 dark:border-accent-400 dark:text-slate-100">{t.homeWhatP1}</p>
              <p>{t.homeWhatP2}</p>
              <p>{t.homeWhatP3}</p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 sm:py-20">
          <div className={CONTAINER}>
            <SectionHeading title={t.homeFaqTitle} lead={t.homeFaqLead} />
            {/* Rows of two; an odd last card takes the whole row instead of leaving a hole. */}
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
              {FAQ_ITEMS.map(item => (
                <div key={item.q} className="glass rounded-xl p-6 lg:last:odd:col-span-2">
                  <h3 className="text-base font-semibold text-balance text-slate-900 dark:text-white">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Learn more ── */}
        <section className="section-band py-16 sm:py-20">
          <div className={CONTAINER}>
            <SectionHeading title={t.homeLearnTitle} lead={t.homeLearnLead} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LEARN_LINKS.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`group flex flex-col p-5 ${linkCard} dark:bg-slate-800/50!`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-base font-semibold text-slate-900 transition-colors group-hover:text-accent-700 dark:text-white dark:group-hover:text-accent-400">{l.title}</span>
                    <IconArrowRight size={18} className="shrink-0 text-slate-400 transition-all group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-hover:text-accent-600 rtl:rotate-180 dark:text-slate-500 dark:group-hover:text-accent-400" />
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-slate-600 dark:text-slate-400">{l.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── The maker's other projects: they deploy and watch this site ── */}
        <section aria-labelledby="home-projects" className="pt-16 sm:pt-20">
          <div className={CONTAINER}>
            <div className="mx-auto max-w-4xl">
              <div className="mx-auto max-w-2xl text-center">
                <h2 id="home-projects" className={`text-xl sm:text-2xl font-bold tracking-[-0.02em] text-slate-900 dark:text-white text-balance ${HEADING_WRAP}`}>{t.homeProjectsTitle}</h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400 text-balance">{t.homeProjectsText}</p>
              </div>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {PROJECTS.map(p => (
                  <li key={p.name} className={`flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900`}>
                    {/* The name is right beside it, so the logo is decoration (empty alt). */}
                    {/* eslint-disable-next-line @next/next/no-img-element -- a small static SVG, nothing for next/image to do */}
                    <img src={p.logo} alt="" width={44} height={44} className="h-11 w-11 shrink-0" />
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold leading-snug text-slate-900 dark:text-white">{p.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.desc}</p>
                      <a href={p.href} target="_blank" rel="noopener" className={`mt-3 inline-flex items-center gap-1 text-sm ${TEXT_LINK}`}>
                        {fill(t.homeProjectsVisit, { site: p.site })}
                        <IconArrowRight size={14} className="shrink-0 rtl:rotate-180" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Closing CTA: 100% free ── */}
        <section className={`${CONTAINER} py-16 sm:py-20`}>
          <div className={`rounded-xl px-5 py-12 text-center sm:px-12 sm:py-16 ${accentBand}`}>
            <CardFan className="mb-7 scale-125" />
            <h2 className={`${H2} text-balance ${HEADING_WRAP}`}>{t.proCtaTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">{t.proCtaDesc}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#create"
                onClick={() => document.getElementById('home-name')?.focus({ preventScroll: true })}
                className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-base font-semibold text-balance text-white sm:w-auto sm:px-6"
              >
                {t.demoCtaBtn}
                <IconArrowRight size={18} className="rtl:rotate-180" />
              </a>
              <Link
                href={localizedPath(locale, '/pricing')}
                className={`${secondaryButton} w-full px-5 py-3 text-base text-balance sm:w-auto sm:px-6`}
              >
                {t.proCtaBtn}
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
      {confirmForget && (
        <ConfirmDialog
          title={t.stopKeepingTitle}
          message={t.stopKeepingConfirm}
          confirmLabel={t.keptRoomsRemove}
          cancelLabel={t.btnCancel}
          onConfirm={() => { void forgetKeptRoom(confirmForget); }}
          onCancel={() => setConfirmForget(null)}
        />
      )}
    </>
  );
}
