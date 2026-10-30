import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/app/SiteHeader';
import { SiteFooter } from '@/app/SiteFooter';
import { IconArrowRight, IconCheck } from '@/app/icons';
import { FaqList, PageMain, pageLead, pageTitle, pageTrail } from '@/app/ContentPage';
import { CardFan } from '@/app/surfaces';
import { loadContent, type ContentLoaders } from '@/lib/content';
import { getDictionary } from '@/lib/dictionaries';
import { localizedPath } from '@/lib/localePath';
import { getMeta } from '@/lib/meta';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/translations';
import type { PricingFaq } from './content/types';

const faq: ContentLoaders<PricingFaq> = {
  en: () => import('./content/en'),
  tr: () => import('./content/tr'),
  de: () => import('./content/de'),
  fr: () => import('./content/fr'),
  it: () => import('./content/it'),
  ar: () => import('./content/ar'),
  zh: () => import('./content/zh'),
};

export function pricingMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, path: '/pricing', ...getMeta(locale).pages.pricing });
}

/** /pricing: everything is free. Rendered on the server in the page's language. */
export async function PricingPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const faqItems = await loadContent(faq, locale);
  const home = localizedPath(locale, '/');
  // Named the way the header's menu names it.
  const trail = pageTrail(t, locale, { name: t.navPricing, href: localizedPath(locale, '/pricing') });
  // "$0", "0 $", "US$0"…: the price written the way the page's language writes it.
  const price = new Intl.NumberFormat(locale, {
    style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(0);

  const FEATURES = [
    t.pricingProFeature1,
    t.pricingProFeature2,
    t.pricingProFeature3,
    t.pricingProFeature4,
    t.pricingProFeature5,
    t.pricingFreeFeature3,
    t.pricingFreeFeature4,
  ];

  return (
    <>
      <SiteHeader />
      <PageMain trail={trail}>
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className={pageTitle}>{t.proCtaTitle}</h1>
            <p className={`${pageLead} max-w-2xl mx-auto`}>{t.proCtaDesc}</p>
          </div>

          {/* Single free plan card: white, a red edge along its top, red ticks */}
          <div className="glass-strong relative overflow-hidden rounded-xl p-6 sm:p-8 max-w-xl mx-auto">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-accent-500 dark:bg-accent-400" />
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <span className="flex flex-col items-start gap-4">
                <CardFan className="mx-0!" />
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-slate-700 dark:text-slate-200">
                  <span aria-hidden="true" className="text-accent-600 dark:text-accent-400">♦</span>
                  {t.planFree}
                </span>
              </span>
              <span className="text-5xl sm:text-6xl font-bold tracking-[-0.03em] leading-none whitespace-nowrap text-slate-900 dark:text-white tabular-nums">{price}</span>
            </div>

            <ul className="space-y-3.5 mb-8">
              {FEATURES.map(f => (
                <li key={f} className="flex items-start gap-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">
                  <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300">
                    <IconCheck size={14} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={home}
              className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-white font-semibold text-base"
            >
              {t.demoCtaBtn}
              <IconArrowRight size={18} className="shrink-0 rtl:rotate-180" />
            </Link>
          </div>

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-center text-2xl font-bold tracking-[-0.02em] text-balance text-slate-900 dark:text-white mb-6">{t.pricingFaqTitle}</h2>
            <FaqList items={faqItems} columns={2} />
          </section>
        </div>
      </PageMain>
      <SiteFooter />
    </>
  );
}
