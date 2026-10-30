import 'server-only';
import type { Locale } from './translations';

/** One import per language of a page's long content (app/<page>/content/<code>.ts). */
export type ContentLoaders<T> = Record<Locale, () => Promise<{ default: T }>>;

/** The content in `locale`, read on the server: only the rendered page reaches the browser. */
export async function loadContent<T>(loaders: ContentLoaders<T>, locale: Locale): Promise<T> {
  return (await loaders[locale]()).default;
}
