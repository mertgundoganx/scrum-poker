import type { Metadata } from 'next';
import { JsonLd } from './JsonLd';
import HomeView from './HomeView';
import { FAQ_KEYS } from './homeFaq';
import { getDictionary } from '@/lib/dictionaries';
import { getMeta } from '@/lib/meta';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/translations';

export function homeMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, path: '/', ...getMeta(locale).pages.home, absoluteTitle: true });
}

/** The home page: the interactive view, plus its structured data in the page's language. */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  // Built from the same strings the visible FAQ renders, so the two never drift apart. (No HowTo:
  // Google shows no rich result for it any more.)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: locale,
      mainEntity: FAQ_KEYS.map(n => ({
        '@type': 'Question',
        name: t[`homeFaq${n}Q`],
        acceptedAnswer: { '@type': 'Answer', text: t[`homeFaq${n}A`] },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeView />
    </>
  );
}
