'use client';

import { createContext, useContext, useEffect, useEffectEvent, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { contentPage, localizedPath } from '@/lib/localePath';
import {
  isLocale, isPrefixedLocale, loadTranslations, textDirection, type Locale, type Translations,
} from '@/lib/translations';

interface LangCtx {
  locale: Locale;
  /** Content pages: go to this page in `l`. Elsewhere (the room, 404): switch in place. Saved either way. */
  setLocale: (l: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LangCtx | null>(null);

/** The visitor's explicit choice (only a click in a language menu saves one). */
const STORAGE_KEY = 'scrumPoker_lang';
/** Set once this tab was sent to the browser's language, so it happens only once per visit. */
const GUESSED_KEY = 'scrumPoker_langGuessed';
/** The language of the last content page read in this tab: what a room opened from it starts in. */
const PAGE_LANG_KEY = 'scrumPoker_pageLang';

// Storage helpers live outside the component: the React Compiler can't optimize
// a component whose body has these try/catch shapes.

function readStorage(storage: 'local' | 'session', key: string): string | null {
  try {
    return (storage === 'local' ? localStorage : sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(storage: 'local' | 'session', key: string, value: string) {
  try {
    (storage === 'local' ? localStorage : sessionStorage).setItem(key, value);
  } catch { /* storage unavailable */ }
}

/** The first of the browser's languages we have (by primary subtag: de-AT is de, zh-TW is zh). */
function browserLocale(): Locale | null {
  const wanted = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of wanted) {
    const primary = tag.split('-')[0].toLowerCase();
    if (isLocale(primary)) return primary;
  }
  return null;
}

function savedLocale(): Locale | null {
  const saved = readStorage('local', STORAGE_KEY);
  return isLocale(saved) ? saved : null;
}

/**
 * Where an English content page should send this visitor, if anywhere: their saved
 * choice, or (no choice yet, once per visit) their browser's language. Visitors
 * with neither, like crawlers, stay on English.
 */
function redirectTarget(): Locale | null {
  const saved = savedLocale();
  if (saved) return saved === 'en' ? null : saved;
  if (readStorage('session', GUESSED_KEY)) return null;
  const guess = browserLocale();
  if (!guess || guess === 'en') return null;
  writeStorage('session', GUESSED_KEY, '1');
  return guess;
}

/**
 * The language for a page that has a single address (the room, 404): a ?lang= link
 * (old shared links; saved as a choice), the language prefix of a missing page, the
 * saved choice, the content page this tab came from, then the browser's languages.
 */
function visitorLocale(pathname: string): Locale | null {
  const fromQuery = new URLSearchParams(window.location.search).get('lang');
  if (isLocale(fromQuery)) {
    writeStorage('local', STORAGE_KEY, fromQuery);
    return fromQuery;
  }
  const prefix = pathname.split('/')[1];
  if (isPrefixedLocale(prefix)) return prefix;
  const fromPage = readStorage('session', PAGE_LANG_KEY);
  return savedLocale() ?? (isLocale(fromPage) ? fromPage : null) ?? browserLocale();
}

// Keys already reported missing (development only).
const reported = new Set<string>();

/**
 * Development only: a dictionary that names a key it doesn't have. A page gets only the
 * keys its client components read (lib/dictionaries.ts); one left out would show nothing.
 */
function checked(t: Partial<Translations>): Translations {
  if (process.env.NODE_ENV === 'production') return t as Translations;
  return new Proxy(t as Translations, {
    get(target, key, receiver) {
      // Skips what React and the dev tools probe on any object ($$typeof, then, toJSON).
      if (typeof key === 'string' && !(key in target) && key !== 'then' && key !== 'toJSON' && !key.startsWith('$') && !reported.has(key)) {
        reported.add(key);
        console.error(`[LanguageProvider] "${key}" is not in this page's dictionary: add it to the keys in lib/dictionaries.ts`);
      }
      return Reflect.get(target, key, receiver);
    },
  });
}

function applyToDocument(l: Locale) {
  document.documentElement.lang = l;
  document.documentElement.dir = textDirection(l);
}

/**
 * The page's language and its interface text. The root layout passes both from the
 * server, so the first render is already in the page's language: of the text, only what
 * every page's client components read (the home page and the room add theirs with
 * MoreTranslations). Content pages have one address per language and never change
 * language in place; the room and the 404 page have one address for everyone, and pick
 * the visitor's language in the browser (a dictionary loaded for that is complete).
 */
export function LanguageProvider({ locale, t: subset, children }: {
  locale: Locale;
  t: Partial<Translations>;
  children: React.ReactNode;
}) {
  const t = checked(subset);
  const pathname = usePathname();
  const router = useRouter();
  const page = contentPage(pathname);
  const pagePath = page?.path ?? null;
  // Switched to in the browser; only shown on pages without per-language addresses.
  const [roaming, setRoaming] = useState<{ locale: Locale; t: Translations } | null>(null);
  // The language asked for last: a slower earlier load must not win.
  const wantedRef = useRef<Locale | null>(null);
  const current = !page && roaming ? roaming : { locale, t };

  /** Load the dictionary, then switch to it at once (no half-translated moment). */
  function show(l: Locale) {
    wantedRef.current = l;
    (l === locale ? Promise.resolve(t) : loadTranslations(l))
      .then(dict => { if (wantedRef.current === l) setRoaming({ locale: l, t: dict }); })
      .catch(() => { /* offline: stay in the current language */ });
  }

  // <html lang dir> come from the server; a language switched to in place, or a soft
  // navigation back to a content page, has to set them itself.
  useEffect(() => { applyToDocument(current.locale); }, [current.locale]);

  const onAddressChange = useEffectEvent(() => {
    if (pagePath !== null) {
      writeStorage('session', PAGE_LANG_KEY, locale);
      // Only English pages redirect, and only to another language: no loops.
      if (locale !== 'en') return;
      const target = redirectTarget();
      if (target) window.location.replace(localizedPath(target, pagePath) + window.location.search + window.location.hash);
      return;
    }
    const target = visitorLocale(pathname);
    if (target && target !== current.locale) show(target);
  });
  useEffect(() => { onAddressChange(); }, [pathname]);

  function setLocale(l: Locale) {
    writeStorage('local', STORAGE_KEY, l);
    if (pagePath === null) {
      show(l);
      return;
    }
    if (l !== locale) router.push(localizedPath(l, pagePath) + window.location.search + window.location.hash);
  }

  return (
    <LanguageContext.Provider value={{ locale: current.locale, setLocale, t: current.t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * More of the page's dictionary for the part of the page below it (the home page, the
 * room), sent by its page on top of the root layout's.
 */
export function MoreTranslations({ locale, t, children }: {
  locale: Locale;
  t: Partial<Translations>;
  children: React.ReactNode;
}) {
  const parent = useLanguage();
  // Switched to another language in place (the room): that dictionary is already complete.
  const value = parent.locale === locale ? { ...parent, t: checked({ ...parent.t, ...t }) } : parent;
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LangCtx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage() needs a LanguageProvider above it');
  return ctx;
}
