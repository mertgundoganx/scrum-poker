import { notFound } from 'next/navigation';
import { isPrefixedLocale, type PrefixedLocale } from '@/lib/translations';

/** Props of a page or layout under app/[lang]. */
export interface LangParams {
  params: Promise<{ lang: string }>;
}

/** The language of a page under app/[lang] (only the prefixed ones get there). */
export async function routeLocale(params: LangParams['params']): Promise<PrefixedLocale> {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return lang;
}
