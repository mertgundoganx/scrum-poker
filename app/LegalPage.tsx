import type { Metadata } from 'next';
import { SiteHeader } from '@/app/SiteHeader';
import { SiteFooter } from '@/app/SiteFooter';
import { ContentShell, ContentSurface, LegalBody, PageHeader, pageTrail, type LegalContent } from '@/app/ContentPage';
import { loadContent, type ContentLoaders } from '@/lib/content';
import { getDictionary } from '@/lib/dictionaries';
import { localizedPath } from '@/lib/localePath';
import { getMeta } from '@/lib/meta';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/translations';

/** The legal pages (/privacy, /terms), rendered on the server from app/<page>/content/<code>.ts. */

const LEGAL: Record<'privacy' | 'terms', ContentLoaders<LegalContent>> = {
  privacy: {
    en: () => import('./privacy/content/en'),
    tr: () => import('./privacy/content/tr'),
    de: () => import('./privacy/content/de'),
    fr: () => import('./privacy/content/fr'),
    it: () => import('./privacy/content/it'),
    ar: () => import('./privacy/content/ar'),
    zh: () => import('./privacy/content/zh'),
  },
  terms: {
    en: () => import('./terms/content/en'),
    tr: () => import('./terms/content/tr'),
    de: () => import('./terms/content/de'),
    fr: () => import('./terms/content/fr'),
    it: () => import('./terms/content/it'),
    ar: () => import('./terms/content/ar'),
    zh: () => import('./terms/content/zh'),
  },
};

export type LegalKey = keyof typeof LEGAL;

export function legalMetadata(page: LegalKey, locale: Locale): Metadata {
  return pageMetadata({ locale, path: `/${page}`, ...getMeta(locale).pages[page] });
}

export async function LegalPage({ page, locale }: { page: LegalKey; locale: Locale }) {
  const c = await loadContent(LEGAL[page], locale);
  const t = getDictionary(locale);
  // Named the way the footer links to it.
  const trail = pageTrail(t, locale, { name: page === 'privacy' ? t.footerPrivacy : t.footerTerms, href: localizedPath(locale, `/${page}`) });

  return (
    <>
      <SiteHeader />
      <ContentShell trail={trail}>
        <ContentSurface>
          <PageHeader title={c.title} meta={c.updated} />
          <LegalBody c={c} />
        </ContentSurface>
      </ContentShell>
      <SiteFooter />
    </>
  );
}
