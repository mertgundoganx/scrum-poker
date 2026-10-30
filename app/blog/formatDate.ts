import type { Locale } from '@/lib/translations';

const DATE_LOCALES: Record<Locale, string> = {
  en: 'en-US', tr: 'tr-TR', de: 'de-DE', fr: 'fr-FR', it: 'it-IT', ar: 'ar', zh: 'zh-CN',
};

/** A 'YYYY-MM-DD' blog date for display in the visitor's language. */
export function formatDate(iso: string, locale: Locale) {
  // Parse as local noon so the calendar day is stable across timezones (server vs client).
  return new Date(`${iso}T12:00:00`).toLocaleDateString(
    DATE_LOCALES[locale] ?? 'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' },
  );
}
