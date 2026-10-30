'use client';

import { useEffect, useEffectEvent, useId, useRef, useState } from 'react';
import type { DeckType } from '@/lib/store';
import { cleanIssueUrl } from '@/lib/deck';
import { LANGUAGE_NAMES as LANGUAGES } from '@/lib/translations';
import { useLanguage } from '@/app/LanguageProvider';
import { useTheme } from '@/app/ThemeProvider';
import { IconMore, IconCheck, IconCoffee, IconVolume, IconVolumeOff, IconGlobe, IconLayers, IconZap, IconEye, IconLink, IconCrown, IconBookmark, type IconProps } from '@/app/icons';
import { MAX_ISSUE_URL } from '@/lib/limits';
import { ROOM_TEXT } from './roomText';

function menuIcon(children: React.ReactNode) {
  return function Icon({ size = 16, ...rest }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
        {children}
      </svg>
    );
  };
}
const IconMoon = menuIcon(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />);
const IconLock = menuIcon(<><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>);
const IconSmile = menuIcon(<><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></>);
const IconKeyboard = menuIcon(<><rect width="20" height="16" x="2" y="4" rx="2" /><path d="M6 8h.01" /><path d="M10 8h.01" /><path d="M14 8h.01" /><path d="M18 8h.01" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" /><path d="M7 16h10" /></>);

/** The host's on/off room settings. */
export type SettingSwitch = 'autoReveal' | 'anonymous' | 'hostRuns' | 'closed' | 'reactions';
export type MenuSettings = Record<SettingSwitch, boolean> & { issueUrl: string };

export interface DeckOption {
  value: DeckType;
  label: string;
  Icon: (props: IconProps) => React.ReactElement;
}

// Note: globals.css sets an unlayered :focus-visible outline, so the offset needs `!` to stay inside the scroll container.
const ITEM =
  'w-full min-h-10 h-auto py-2 flex items-center gap-3 px-3 text-sm leading-snug text-start text-slate-700 dark:text-slate-200 ' +
  'hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:bg-slate-100 dark:focus-visible:bg-slate-800 ' +
  '-outline-offset-2! transition-colors cursor-pointer';
const ITEM_ICON = 'shrink-0 text-slate-500 dark:text-slate-400';
const DIVIDER = 'border-t border-slate-200 dark:border-slate-800';
// The chosen deck or language: ink, its check in red.
const CHOSEN = 'font-semibold text-slate-900! dark:text-slate-100!';
const CHECK = 'shrink-0 text-accent-600 dark:text-accent-400';

/**
 * Header overflow ("more") menu for the room.
 * On phones it carries every secondary control; from `sm`/`md` up the controls
 * that are shown inline in the header are hidden from the menu.
 */
export function RoomMoreMenu({
  userName, avatar, isSpectator, onToggleSpectator,
  deckType, deckOptions, canChangeDeck, onPickDeck,
  soundOn, onToggleSound, onOpenProfile, onOpen, isHost, settings, onChangeSetting, onChangeIssueUrl, onIssueUrlRefused, anonymousLocked = false, kept, canKeep = true, onToggleKept, onCopyOwnerLink,
  onShowShortcuts,
}: {
  userName: string;
  avatar: React.ReactNode;
  isSpectator: boolean;
  onToggleSpectator: () => void;
  deckType: DeckType;
  deckOptions: DeckOption[];
  canChangeDeck: boolean;
  onPickDeck: (value: DeckType) => void;
  soundOn: boolean;
  onToggleSound: () => void;
  onOpenProfile: () => void;
  /** Room settings, shown to the host only. */
  isHost: boolean;
  settings: MenuSettings;
  onChangeSetting: (key: SettingSwitch, value: boolean) => void;
  /** Saves the issue link pattern; false when the server refused it. */
  onChangeIssueUrl: (url: string) => Promise<boolean>;
  /** The menu closed on an issue link that can't be saved (the field and its message are gone with it). */
  onIssueUrlRefused?: () => void;
  /** Anonymous voting can't be switched off while this round has votes. */
  anonymousLocked?: boolean;
  /** Whether the room is kept; keeping is offered to the host. */
  kept: boolean;
  /** False while someone else holds the owner key (a later host can't change that). */
  canKeep?: boolean;
  onToggleKept: () => void;
  /** Set when this browser owns the kept room: copies the owner link. */
  onCopyOwnerLink: (() => Promise<boolean>) | null;
  /** Called when the menu opens so the parent can close its other popovers. */
  onOpen?: () => void;
  onShowShortcuts: () => void;
}) {
  const { t, locale, setLocale } = useLanguage();
  const rt = ROOM_TEXT[locale] ?? ROOM_TEXT.en;
  const { theme, toggle: toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  // The issue link being typed (null: show the saved one), and whether the server refused it.
  const [issueDraft, setIssueDraft] = useState<string | null>(null);
  const [issueInvalid, setIssueInvalid] = useState(false);
  const issueId = useId();
  const keepHintId = useId();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  function visibleItems(): HTMLElement[] {
    const nodes = menuRef.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]');
    return nodes ? Array.from(nodes).filter(n => n.offsetParent !== null) : [];
  }

  // Declared before closeMenu, which uses it (the React Compiler gives up on a
  // function used before its declaration).
  async function saveIssueUrl(closing = false) {
    if (issueDraft === null) return;
    const url = issueDraft.trim();
    if (url === settings.issueUrl) { setIssueDraft(null); setIssueInvalid(false); return; }
    // A refused one stays as typed, marked, for another try when the menu opens again.
    const ok = cleanIssueUrl(url) !== null && await onChangeIssueUrl(url);
    setIssueInvalid(!ok);
    if (ok) setIssueDraft(null);
    else if (closing) onIssueUrlRefused?.();
  }

  // Closing the menu unmounts the issue link field before it can blur: save
  // what was typed first, however the menu closes.
  function closeMenu() {
    void saveIssueUrl(true);
    setOpen(false);
  }
  const closeFromOutside = useEffectEvent(() => closeMenu());

  // Close on outside press (capture phase: other popovers stop propagation).
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) closeFromOutside();
    }
    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, [open]);

  // Move focus into the menu when it opens.
  useEffect(() => {
    if (!open) return;
    visibleItems()[0]?.focus();
  }, [open]);

  function close(returnFocus: boolean) {
    closeMenu();
    if (returnFocus) buttonRef.current?.focus();
  }

  function onMenuKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true); return; }
    if (e.key === 'Tab') { close(true); return; } // let Tab continue from the trigger
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const items = visibleItems();
    if (!items.length) return;
    e.preventDefault();
    const idx = items.indexOf(document.activeElement as HTMLElement);
    const next = e.key === 'Home' ? 0
      : e.key === 'End' ? items.length - 1
        : e.key === 'ArrowDown' ? (idx + 1) % items.length
          : (idx - 1 + items.length) % items.length;
    items[next]?.focus();
  }

  const currentDeck = deckOptions.find(o => o.value === deckType);
  const CurrentDeckIcon = currentDeck?.Icon ?? IconLayers;
  const isDark = theme === 'dark';

  return (
    <div ref={wrapRef} className="relative shrink-0" onClick={e => e.stopPropagation()}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => { if (open) { closeMenu(); return; } onOpen?.(); setOpen(true); }}
        onKeyDown={e => { if (e.key === 'ArrowDown' && !open) { e.preventDefault(); onOpen?.(); setOpen(true); } }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={rt.more}
        title={rt.more}
        className={`w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border transition-colors cursor-pointer ${open
          ? 'border-accent-300 dark:border-accent-500/50 bg-accent-50 dark:bg-accent-500/15 text-accent-700 dark:text-accent-300'
          : 'border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'}`}
      >
        <IconMore size={18} />
      </button>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={rt.more}
          onKeyDown={onMenuKeyDown}
          className="absolute end-0 top-full mt-2 z-50 w-64 max-w-[calc(100vw-1.5rem)] max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain glass-strong rounded-xl animate-pop-in py-1"
        >
          {/* Controls that are inline in the header on larger screens */}
          <div className="md:hidden">
            <button type="button" role="menuitem" onClick={() => { close(false); onOpenProfile(); }} className={`${ITEM} sm:hidden h-14!`}>
              {avatar}
              <span className="min-w-0 flex-1">
                <span dir="auto" title={userName} className="block truncate font-semibold text-slate-900 dark:text-slate-100">{userName}</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">{t.settingsTitle}</span>
              </span>
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => { close(true); onToggleSpectator(); }}
              className={`${ITEM} ${isSpectator ? 'text-amber-800! dark:text-amber-300!' : ''}`}
            >
              <IconCoffee size={16} className={isSpectator ? 'shrink-0' : ITEM_ICON} />
              <span className="flex-1">{isSpectator ? t.specComeBack : t.specGoBreak}</span>
            </button>

            <div className={`${DIVIDER} mt-1 pt-2`} role="group" aria-label={rt.deck}>
              <p className="eyebrow px-3 pb-1">{rt.deck}</p>
              {canChangeDeck ? deckOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={deckType === opt.value}
                  onClick={() => { close(false); onPickDeck(opt.value); }}
                  className={`${ITEM} ${deckType === opt.value ? CHOSEN : ''}`}
                >
                  <opt.Icon size={16} className={deckType === opt.value ? 'shrink-0' : ITEM_ICON} />
                  <span className="flex-1">{opt.label}</span>
                  {deckType === opt.value && <IconCheck size={16} className={CHECK} />}
                </button>
              )) : (
                <div className="flex items-center gap-3 px-3 h-10 text-sm text-slate-700 dark:text-slate-200">
                  <CurrentDeckIcon size={16} className={ITEM_ICON} />
                  <span>{currentDeck?.label ?? deckType}</span>
                </div>
              )}
            </div>
            <div className={`${DIVIDER} mt-1 mb-1`} />
          </div>

          {isHost && (
            <div role="group" aria-label={t.roomSettings} className={`${DIVIDER} pt-2 pb-1 mb-1`}>
              <p className="eyebrow px-3 pb-1">{t.roomSettings}</p>
              {([
                ['autoReveal', t.settingAutoReveal, IconZap],
                ['anonymous', t.settingAnonymous, IconEye],
                ['hostRuns', t.settingHostRuns, IconCrown],
                ['closed', t.settingClosed, IconLock],
                ['reactions', t.settingReactions, IconSmile],
              ] as const).map(([key, label, Icon]) => (
                <button key={key} type="button" role="menuitemcheckbox" aria-checked={settings[key]}
                  disabled={key === 'anonymous' && anonymousLocked}
                  title={key === 'anonymous' && anonymousLocked ? t.anonymousLockedHint : undefined}
                  onClick={() => onChangeSetting(key, !settings[key])} className={`${ITEM} disabled:opacity-50 disabled:cursor-not-allowed`}>
                  <Icon size={16} className={ITEM_ICON} />
                  <span className="flex-1">{label}</span>
                  <span aria-hidden className={`shrink-0 w-8 h-4.5 rounded-full p-0.5 flex transition-colors ${settings[key] ? 'bg-accent-600 dark:bg-accent-550 justify-end' : 'bg-slate-300 dark:bg-slate-600 justify-start'}`}>
                    <span className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                  </span>
                </button>
              ))}
              {/* Issue keys in stories (ABC-123) link here; saved on Enter or when leaving the field */}
              <div className="px-3 pt-1.5 pb-2">
                <label htmlFor={issueId} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <IconLink size={16} className={ITEM_ICON} />{t.settingIssueUrl}
                </label>
                <input
                  id={issueId}
                  type="url"
                  inputMode="url"
                  dir="ltr"
                  value={issueDraft ?? settings.issueUrl}
                  onChange={e => { setIssueDraft(e.target.value); setIssueInvalid(false); }}
                  onBlur={() => { void saveIssueUrl(); }}
                  onKeyDown={e => {
                    // Keys edit the text; only Escape and Tab still close the menu.
                    if (e.key !== 'Escape' && e.key !== 'Tab') e.stopPropagation();
                    if (e.key === 'Enter') { e.preventDefault(); void saveIssueUrl(); }
                  }}
                  placeholder={t.issueUrlPlaceholder}
                  maxLength={MAX_ISSUE_URL}
                  aria-invalid={issueInvalid}
                  aria-describedby={issueInvalid ? `${issueId}-error` : undefined}
                  className={`input-glow mt-1.5 w-full h-10 sm:h-8 px-2.5 rounded-lg bg-white dark:bg-slate-950 border text-base sm:text-xs text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none ${issueInvalid ? 'border-red-400 dark:border-red-500/70' : 'border-slate-300 dark:border-slate-700'}`}
                />
                {issueInvalid && <p id={`${issueId}-error`} role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">{t.issueUrlInvalid}</p>}
              </div>
              {canKeep && (
                <button type="button" role="menuitemcheckbox" aria-checked={kept} onClick={onToggleKept}
                  aria-labelledby={`${keepHintId}-label`} aria-describedby={keepHintId} className={`${ITEM} h-auto! py-2 items-start!`}>
                  <IconBookmark size={16} className={`${ITEM_ICON} mt-0.5`} />
                  <span className="flex-1 min-w-0">
                    <span id={`${keepHintId}-label`} className="block">{t.keepRoom}</span>
                    <span id={keepHintId} className="block mt-0.5 text-xs leading-snug text-slate-500 dark:text-slate-400">{t.keepRoomHint}</span>
                  </span>
                  <span aria-hidden className={`shrink-0 mt-0.5 w-8 h-4.5 rounded-full p-0.5 flex transition-colors ${kept ? 'bg-accent-600 dark:bg-accent-550 justify-end' : 'bg-slate-300 dark:bg-slate-600 justify-start'}`}>
                    <span className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                  </span>
                </button>
              )}
            </div>
          )}

          {/* The owner link: the only way to manage a kept room from elsewhere */}
          {onCopyOwnerLink && (
            <div className={`${DIVIDER} pt-1 pb-1 mb-1`}>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  void onCopyOwnerLink().then(ok => {
                    if (!ok) return;
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  });
                }}
                className={ITEM}
              >
                {linkCopied ? <IconCheck size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" /> : <IconLink size={16} className={ITEM_ICON} />}
                <span className="flex-1" aria-live="polite">{linkCopied ? t.ownerLinkCopied : t.ownerLinkCopy}</span>
              </button>
              <p className="px-3 pb-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{t.ownerLinkHint}</p>
            </div>
          )}

          <button type="button" role="menuitem" onClick={onToggleSound} className={ITEM}>
            {soundOn ? <IconVolume size={16} className={ITEM_ICON} /> : <IconVolumeOff size={16} className={ITEM_ICON} />}
            <span className="flex-1">{soundOn ? t.soundOff : t.soundOn}</span>
          </button>
          <button type="button" role="menuitem" onClick={() => { close(false); onShowShortcuts(); }} className={ITEM}>
            <IconKeyboard size={16} className={ITEM_ICON} />
            <span className="flex-1">{t.shortcutsTitle}</span>
          </button>
          <button type="button" role="menuitemcheckbox" aria-checked={isDark} onClick={toggleTheme} className={ITEM}>
            <IconMoon size={16} className={ITEM_ICON} />
            <span className="flex-1">{rt.darkTheme}</span>
            <span aria-hidden className={`shrink-0 w-8 h-4.5 rounded-full p-0.5 flex transition-colors ${isDark ? 'bg-accent-600 dark:bg-accent-550 justify-end' : 'bg-slate-300 dark:bg-slate-600 justify-start'}`}>
              <span className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
            </span>
          </button>

          <div className={`${DIVIDER} mt-1 pt-2`} role="group" aria-label={rt.language}>
            <p className="eyebrow px-3 pb-1 flex items-center gap-1.5"><IconGlobe size={13} />{rt.language}</p>
            <div className="grid grid-cols-2 gap-x-1 px-1">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={locale === lang.code}
                  lang={lang.code}
                  onClick={() => setLocale(lang.code)}
                  className={`${ITEM} px-2! rounded-lg gap-1.5! ${locale === lang.code ? `${CHOSEN} bg-slate-100 dark:bg-slate-800` : ''}`}
                >
                  <span className="flex-1 truncate">{lang.label}</span>
                  {locale === lang.code && <IconCheck size={14} className={CHECK} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
