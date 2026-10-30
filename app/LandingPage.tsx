import type { Metadata } from 'next';
import { SiteHeader } from '@/app/SiteHeader';
import { SiteFooter } from '@/app/SiteFooter';
import { JsonLd } from '@/app/JsonLd';
import { LandingBody } from '@/app/LandingBody';
import { pageTrail } from '@/app/ContentPage';
import { LANDING_PAGES } from '@/app/landingPages';
import type { LandingContent } from '@/app/landingTypes';
import { loadContent, type ContentLoaders } from '@/lib/content';
import { getDictionary } from '@/lib/dictionaries';
import { localizedPath } from '@/lib/localePath';
import { getMeta, type MetaPage } from '@/lib/meta';
import { LOGO_URL, SITE_NAME, SITE_URL, absoluteUrl, pageMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/translations';

/**
 * The landing pages (/fibonacci-planning-poker, /t-shirt-sizing, /planning-poker-cards),
 * rendered on the server in the page's language from app/<page>/content/<code>.ts.
 */

interface Landing {
  path: string;
  meta: MetaPage;
  content: ContentLoaders<LandingContent>;
  published: string;
  modified: string;
}

const LANDINGS = {
  fibonacci: {
    ...LANDING_PAGES.fibonacci,
    meta: 'fibonacci',
    content: {
      en: () => import('./fibonacci-planning-poker/content/en'),
      tr: () => import('./fibonacci-planning-poker/content/tr'),
      de: () => import('./fibonacci-planning-poker/content/de'),
      fr: () => import('./fibonacci-planning-poker/content/fr'),
      it: () => import('./fibonacci-planning-poker/content/it'),
      ar: () => import('./fibonacci-planning-poker/content/ar'),
      zh: () => import('./fibonacci-planning-poker/content/zh'),
    },
  },
  tshirt: {
    ...LANDING_PAGES.tshirt,
    meta: 'tshirt',
    content: {
      en: () => import('./t-shirt-sizing/content/en'),
      tr: () => import('./t-shirt-sizing/content/tr'),
      de: () => import('./t-shirt-sizing/content/de'),
      fr: () => import('./t-shirt-sizing/content/fr'),
      it: () => import('./t-shirt-sizing/content/it'),
      ar: () => import('./t-shirt-sizing/content/ar'),
      zh: () => import('./t-shirt-sizing/content/zh'),
    },
  },
  cards: {
    ...LANDING_PAGES.cards,
    meta: 'cards',
    content: {
      en: () => import('./planning-poker-cards/content/en'),
      tr: () => import('./planning-poker-cards/content/tr'),
      de: () => import('./planning-poker-cards/content/de'),
      fr: () => import('./planning-poker-cards/content/fr'),
      it: () => import('./planning-poker-cards/content/it'),
      ar: () => import('./planning-poker-cards/content/ar'),
      zh: () => import('./planning-poker-cards/content/zh'),
    },
  },
} satisfies Record<string, Landing>;

export type LandingKey = keyof typeof LANDINGS;

export async function landingMetadata(key: LandingKey, locale: Locale): Promise<Metadata> {
  const landing: Landing = LANDINGS[key];
  const c = await loadContent(landing.content, locale);
  return pageMetadata({
    locale,
    path: landing.path,
    ...getMeta(locale).pages[landing.meta],
    // The page's own headline: longer than the <title>, fine for a link preview.
    ogTitle: c.title,
    type: 'article',
    published: landing.published,
    modified: landing.modified,
  });
}

export async function LandingPage({ page, locale }: { page: LandingKey; locale: Locale }) {
  const landing: Landing = LANDINGS[page];
  const c = await loadContent(landing.content, locale);
  const t = getDictionary(locale);
  const url = absoluteUrl(localizedPath(locale, landing.path));

  // The BreadcrumbList comes with the visible trail (PageTrail).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: getMeta(locale).pages[landing.meta].description,
    inLanguage: locale,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    datePublished: landing.published,
    dateModified: landing.modified,
    image: `${SITE_URL}/opengraph-image`,
  };
  const trail = pageTrail(t, locale, { name: c.breadcrumb, href: localizedPath(locale, landing.path) });

  return (
    <>
      <SiteHeader />
      <LandingBody c={c} locale={locale} trail={trail} />
      <SiteFooter />
      <JsonLd data={jsonLd} />
    </>
  );
}
