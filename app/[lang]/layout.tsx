import type { Metadata, Viewport } from 'next';
import { ROOT_METADATA } from '@/lib/seo';
import { PREFIXED_LOCALES } from '@/lib/translations';
import { RootDocument, VIEWPORT } from '@/app/RootDocument';
import { PageTransition } from '@/app/PageTransition';
import { routeLocale, type LangParams } from '@/app/routeLocale';

/*
 * Root layout of the pages in every language but English: /tr, /de/guide, /fr/blog/….
 * Each language is built ahead of time; any other first segment is a 404.
 */

export const metadata: Metadata = ROOT_METADATA;
export const viewport: Viewport = VIEWPORT;

export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.map(lang => ({ lang }));
}

export default async function LocalizedLayout({ children, params }: LangParams & { children: React.ReactNode }) {
  return (
    <RootDocument locale={await routeLocale(params)}>
      <PageTransition>{children}</PageTransition>
    </RootDocument>
  );
}
