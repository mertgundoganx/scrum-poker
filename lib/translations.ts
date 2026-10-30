import type { Translations } from './locales/en';

export type Locale = 'en' | 'tr' | 'it' | 'fr' | 'ar' | 'de' | 'zh';
/** The languages that live under a /<code> prefix (English has none). */
export type PrefixedLocale = Exclude<Locale, 'en'>;
export type { Translations };

export const LOCALES: readonly Locale[] = ['en', 'tr', 'it', 'fr', 'ar', 'de', 'zh'];
export const PREFIXED_LOCALES = LOCALES.filter((l): l is PrefixedLocale => l !== 'en');

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export function isPrefixedLocale(value: unknown): value is PrefixedLocale {
  return isLocale(value) && value !== 'en';
}

export function textDirection(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

/** The language menus' entries, each name in its own language. */
// No flag emoji: Windows draws them as two letters ("GB"), and a language isn't a country.
export const LANGUAGE_NAMES: readonly { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'ar', label: 'العربية' },
  { code: 'zh', label: '中文' },
];

// A page gets its own language's dictionary from the server (lib/dictionaries.ts);
// these separate chunks are fetched only to switch language in place (the room).
const loaders: Record<Locale, () => Promise<{ default: Translations }>> = {
  en: () => import('./locales/en'),
  tr: () => import('./locales/tr'),
  it: () => import('./locales/it'),
  fr: () => import('./locales/fr'),
  ar: () => import('./locales/ar'),
  de: () => import('./locales/de'),
  zh: () => import('./locales/zh'),
};

const loaded = new Map<Locale, Translations>();

export async function loadTranslations(locale: Locale): Promise<Translations> {
  const ready = loaded.get(locale);
  if (ready) return ready;
  const load = loaders[locale];
  // One retry: a chunk request can fail on a flaky mobile connection.
  const dict = (await load().catch(() => new Promise(r => setTimeout(r, 1000)).then(load))).default;
  loaded.set(locale, dict);
  return dict;
}
