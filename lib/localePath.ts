import { isPrefixedLocale, type Locale } from './translations';

/**
 * Which addresses exist in every language, and how a page's address reads in each.
 * English pages keep their address (/guide); the others sit under the language's
 * code (/de/guide). Rooms, the API and other files are the same in every language.
 * No server or browser imports: proxy.ts, server pages and client components share it.
 */

/** Every article under /blog/<slug> (keep in step with lib/blogPosts.ts and app/blog/articles.ts). */
export const BLOG_SLUGS = [
  'what-is-planning-poker',
  'fibonacci-vs-tshirt',
  'remote-sprint-planning',
  'scrum-poker-best-practices',
  'free-scrum-poker-tools',
  'story-points-vs-hours',
  'agile-velocity',
  'sprint-planning-checklist',
  'estimation-consensus',
] as const;
export type BlogSlug = (typeof BLOG_SLUGS)[number];

export function isBlogSlug(value: string): value is BlogSlug {
  return (BLOG_SLUGS as readonly string[]).includes(value);
}

/** The pages that exist in every language, by their English address. */
export const CONTENT_PATHS = [
  '/',
  '/guide',
  '/blog',
  '/pricing',
  '/demo',
  '/privacy',
  '/terms',
  '/fibonacci-planning-poker',
  '/t-shirt-sizing',
  '/planning-poker-cards',
] as const;

export function isContentPath(path: string): boolean {
  if ((CONTENT_PATHS as readonly string[]).includes(path)) return true;
  return path.startsWith('/blog/') && isBlogSlug(path.slice('/blog/'.length));
}

/**
 * `href` in `locale`: localizedPath('de', '/guide') → '/de/guide', ('de', '/') → '/de'.
 * Anything that isn't a page in every language (rooms, files, mailto:, #anchors) is returned as is.
 */
export function localizedPath(locale: Locale, href: string): string {
  const cut = href.search(/[?#]/);
  const path = cut < 0 ? href : href.slice(0, cut);
  const rest = cut < 0 ? '' : href.slice(cut);
  if (locale === 'en' || !isContentPath(path)) return href;
  return `${path === '/' ? `/${locale}` : `/${locale}${path}`}${rest}`;
}

/** The page at a browser address: its language and English address, or null if it isn't one of ours. */
export function contentPage(pathname: string): { locale: Locale; path: string } | null {
  const first = pathname.split('/')[1];
  if (isPrefixedLocale(first)) {
    const path = pathname.slice(first.length + 1) || '/';
    return isContentPath(path) ? { locale: first, path } : null;
  }
  return isContentPath(pathname) ? { locale: 'en', path: pathname } : null;
}
