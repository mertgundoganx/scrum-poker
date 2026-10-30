import type { Metadata } from 'next';
import { LOCALES, type Locale } from './translations';
import { localizedPath } from './localePath';
import { getMeta } from './meta';

/** The canonical host (next.config.ts redirects the bare domain here). */
export const SITE_URL = 'https://www.scrumpokerplay.com';
export const SITE_NAME = 'Scrum Poker Online';

/** Open Graph locales (language_TERRITORY, as Facebook spells them). */
const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US', tr: 'tr_TR', de: 'de_DE', fr: 'fr_FR', it: 'it_IT', ar: 'ar_AR', zh: 'zh_CN',
};

/** An absolute address on the canonical host. */
export function absoluteUrl(path: string): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * hreflang alternates of a page, by its English address: one per language, and
 * x-default (for everyone else) pointing at English.
 */
export function languageAlternates(path: string, toUrl: (p: string) => string = p => p): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) languages[locale] = toUrl(localizedPath(locale, path));
  languages['x-default'] = toUrl(path);
  return languages;
}

/** The Open Graph images (1200×630); their alt text is in lib/meta, in the page's language. */
const OG_IMAGES = { site: '/opengraph-image', blog: '/blog/opengraph-image' } as const;
export type OgImage = keyof typeof OG_IMAGES;
export const BLOG_IMAGE_URL = OG_IMAGES.blog;

/** The site's logo for structured data (an Organization's `logo`). */
export const LOGO_URL = `${SITE_URL}/icons/icon-512.png`;

interface PageMetadataInput {
  locale: Locale;
  /** The page's English address: canonical and alternates are derived from it. */
  path: string;
  /** Gets " | Scrum Poker Online" appended, unless `absoluteTitle`. */
  title: string;
  absoluteTitle?: boolean;
  description: string;
  keywords?: string[];
  /** Defaults to "<title> — Scrum Poker Online". */
  ogTitle?: string;
  type?: 'website' | 'article';
  image?: OgImage;
  /** Articles: 'YYYY-MM-DD', as article:published_time / article:modified_time. */
  published?: string;
  modified?: string;
}

/**
 * Everything a page in the localized tree tells search engines: its title and
 * description, its own address as canonical, the same page in every other language,
 * and Open Graph data. A page-level `openGraph` replaces the layout's object instead
 * of merging with it, so this always returns the whole object.
 */
export function pageMetadata({
  locale, path, title, absoluteTitle, description, keywords, ogTitle, type = 'website', image = 'site',
  published, modified,
}: PageMetadataInput): Metadata {
  const url = localizedPath(locale, path);
  const shared = {
    siteName: SITE_NAME,
    locale: OG_LOCALES[locale],
    alternateLocale: LOCALES.filter(l => l !== locale).map(l => OG_LOCALES[l]),
    title: ogTitle ?? (absoluteTitle ? title : `${title} — ${SITE_NAME}`),
    description,
    url,
    images: [{ url: OG_IMAGES[image], width: 1200, height: 630, alt: getMeta(locale).imageAlt[image] }],
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: type === 'article'
      ? { ...shared, type, publishedTime: published, modifiedTime: modified ?? published }
      : { ...shared, type },
  };
}

/** What every page shares; each page adds its own title, description, alternates and Open Graph data. */
export const ROOT_METADATA: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  // Title, description and image come from each page's Open Graph data.
  twitter: {
    card: 'summary_large_image',
  },
  // Indexing is the default, so no index/follow here: the 404 page's noindex must not meet an "index" from this.
  robots: {
    googleBot: {
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Scrum Poker',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  category: 'productivity',
  other: {
    'mobile-web-app-capable': 'yes',
  },
};
