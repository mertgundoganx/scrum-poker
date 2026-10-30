'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useEffect, useId, useRef, useState,
  type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent,
} from 'react';
import { useLanguage } from './LanguageProvider';
import { HEADER_KEY } from './ThemeToggle';
import { contentPage, localizedPath } from '@/lib/localePath';
import { LANGUAGE_NAMES as LANGUAGES, type Locale } from '@/lib/translations';
import { IconCheck, IconChevronDown, IconGlobe } from '@/app/icons';

/**
 * This page in `code`. The room has one address for everyone and stays where it is. The 404
 * has no page in another language (and is built once, as /_not-found), so it links to that
 * language's home page. A plain click on either switches the language in place.
 */
export function languageHref(code: Locale, pathname: string): string {
  const page = contentPage(pathname);
  if (page) return localizedPath(code, page.path);
  return pathname.startsWith('/room/') ? pathname : localizedPath(code, '/');
}

/**
 * A click on a link to another language. A plain click goes through setLocale, which saves the
 * choice (so an English page doesn't send the visitor back to the saved language) and goes there,
 * or switches in place where there is one address for everyone. A click for a new tab or window
 * keeps the browser's default.
 */
export function onLanguageLinkClick(
  e: ReactMouseEvent<HTMLAnchorElement>, code: Locale, setLocale: (l: Locale) => void,
) {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  setLocale(code);
}

/**
 * The header's language menu. Each language is a real link to this page in that language
 * (in the HTML even while the menu is closed, so crawlers find every version), shown as a
 * menu of radio items.
 */
export function LanguageSelector() {
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    // Move focus to the active item so arrow keys work straight away.
    menuRef.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus();

    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    }
    // Capture phase: this widget (and others) stop propagation of their own pointer events.
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  function onMenuKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitemradio"]') ?? []);
    if (items.length === 0) return;
    const index = items.indexOf(document.activeElement as HTMLElement);
    let next = -1;
    if (e.key === 'ArrowDown') next = (index + 1) % items.length;
    else if (e.key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else if (e.key === 'Tab') { setOpen(false); return; }
    else if (e.key === ' ' && index >= 0) {
      // Space chooses a menu item; on a link it would scroll the page.
      e.preventDefault();
      items[index].click();
      return;
    }
    if (next < 0) return;
    e.preventDefault();
    items[next].focus();
  }

  function choose(e: ReactMouseEvent<HTMLAnchorElement>, code: Locale) {
    onLanguageLinkClick(e, code, setLocale);
    setOpen(false);
    triggerRef.current?.focus();
  }

  const current = LANGUAGES.find(l => l.code === locale) ?? LANGUAGES[0];

  return (
    <div ref={rootRef} className="relative" onClick={e => e.stopPropagation()} onPointerDown={e => e.stopPropagation()}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className={`${HEADER_KEY} gap-1.5 px-2 text-xs font-semibold text-slate-700 dark:text-slate-300 aria-expanded:bg-slate-50 dark:aria-expanded:bg-slate-800 aria-expanded:border-slate-300 dark:aria-expanded:border-slate-700`}
      >
        <IconGlobe size={15} className="text-slate-500 dark:text-slate-400" />
        {/* The name starts with the visible code, then says what it is. */}
        <span>{current.code.toUpperCase()}</span>
        <span className="sr-only">{` ${t.language}: ${current.label}`}</span>
        <IconChevronDown size={14} className={`hidden sm:block text-slate-500 dark:text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        ref={menuRef}
        id={menuId}
        role="menu"
        aria-label={t.language}
        hidden={!open}
        onKeyDown={onMenuKeyDown}
        className="absolute end-0 top-full mt-1.5 z-50 w-44 glass-strong rounded-xl p-1 animate-pop-in origin-top-right rtl:origin-top-left overflow-hidden"
      >
        {LANGUAGES.map(lang => {
          const selected = locale === lang.code;
          return (
            <Link
              key={lang.code}
              href={languageHref(lang.code, pathname)}
              prefetch={false}
              hrefLang={lang.code}
              lang={lang.code}
              role="menuitemradio"
              aria-checked={selected}
              tabIndex={-1}
              onClick={e => choose(e, lang.code)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-start transition-colors ${
                selected
                  ? 'bg-accent-50 dark:bg-accent-500/12 text-slate-900 dark:text-white font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:bg-slate-100 dark:focus-visible:bg-slate-800'
              }`}
            >
              <span aria-hidden className={`w-6 text-[11px] font-bold tracking-wide ${selected ? 'text-accent-700 dark:text-accent-300' : 'text-slate-500 dark:text-slate-400'}`}>{lang.code.toUpperCase()}</span>
              <span>{lang.label}</span>
              {selected && <IconCheck size={16} className="ms-auto text-accent-600 dark:text-accent-400" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
