import 'server-only';
import type { Locale } from '@/lib/translations';
import type { SiteMeta } from './types';
import en from './en';
import tr from './tr';
import de from './de';
import fr from './fr';
import it from './it';
import ar from './ar';
import zh from './zh';

export type { MetaPage, PageMeta, SiteMeta } from './types';

const META: Record<Locale, SiteMeta> = { en, tr, de, fr, it, ar, zh };

/** Titles and descriptions for search engines, in `locale`. */
export function getMeta(locale: Locale): SiteMeta {
  return META[locale];
}
