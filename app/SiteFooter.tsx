'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import { languageHref, onLanguageLinkClick } from './LanguageSelector';
import { Logo } from './Logo';
import { LANGUAGE_NAMES, type Locale } from '@/lib/translations';
import { contentPage, localizedPath } from '@/lib/localePath';

const TRADEMARK: Record<Locale, string> = {
  en: 'Planning Poker® is a registered trademark of Mountain Goat Software, LLC.',
  tr: 'Planning Poker®, Mountain Goat Software, LLC\'nin tescilli ticari markasıdır.',
  de: 'Planning Poker® ist eine eingetragene Marke der Mountain Goat Software, LLC.',
  fr: 'Planning Poker® est une marque déposée de Mountain Goat Software, LLC.',
  it: 'Planning Poker® è un marchio registrato di Mountain Goat Software, LLC.',
  ar: 'Planning Poker® علامة تجارية مسجلة لشركة Mountain Goat Software, LLC.',
  zh: 'Planning Poker® 是 Mountain Goat Software, LLC 的注册商标。',
};

const CREDITS = [
  { href: 'https://shipwick.com/', label: 'footerDeployed' },
  { href: 'https://reliableuptime.com/', label: 'footerMonitored' },
] as const;

const FOOTER_LINK ='inline-block py-1 text-sm text-slate-600 dark:text-slate-400 hover:text-accent-700 dark:hover:text-accent-400 transition-colors';

/** Global footer for marketing & content pages. */
export function SiteFooter() {
  const { t, locale, setLocale } = useLanguage();
  // Pages with an address per language list theirs (the room and 404 have one for everyone).
  const pathname = usePathname();
  const hasLanguages = contentPage(pathname) !== null;
  const year = new Date().getFullYear();
  const cols: { title: string; links: { href: string; label: string }[] }[] = [
    {
      title: t.navGuide,
      links: [
        { href: localizedPath(locale, '/guide'), label: t.guideLink },
        { href: localizedPath(locale, '/blog'), label: t.navBlog },
        { href: localizedPath(locale, '/demo'), label: t.demoLink },
      ],
    },
    {
      title: t.footerEstimation,
      links: [
        { href: localizedPath(locale, '/fibonacci-planning-poker'), label: t.homeLinkFibTitle },
        { href: localizedPath(locale, '/t-shirt-sizing'), label: t.homeLinkTshirtTitle },
        { href: localizedPath(locale, '/planning-poker-cards'), label: t.homeLinkCardsTitle },
      ],
    },
    {
      title: t.footerProduct,
      links: [
        { href: localizedPath(locale, '/pricing'), label: t.navPricing },
        { href: localizedPath(locale, '/'), label: t.btnCreate },
        // AGPL: whoever uses the running service can get its source.
        { href: 'https://github.com/mertgundoganx/scrum-poker', label: t.footerSource },
      ],
    },
    {
      title: t.footerLegal,
      links: [
        { href: localizedPath(locale, '/privacy'), label: t.footerPrivacy },
        { href: localizedPath(locale, '/terms'), label: t.footerTerms },
        { href: 'mailto:contact@scrumpokerplay.com', label: t.footerContact },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Side by side only from lg, with a narrower blurb until xl: next to it, four columns
            of German or French links ("Nutzungsbedingungen") don't fit a tablet's width. A word
            that still doesn't fit is hyphenated. */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
          <div className="max-w-xs lg:max-w-60 xl:max-w-68">
            <Logo href={null} />
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t.heroSub}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 sm:gap-8 flex-1">
            {cols.map(col => (
              <nav key={col.title} aria-label={col.title} className="min-w-0 wrap-break-word hyphens-auto">
                <p className="eyebrow mb-3">{col.title}</p>
                <ul className="space-y-1">
                  {col.links.map(l => (
                    <li key={l.href + l.label}>
                      {/* Mail and other sites are not pages here: a plain anchor, no prefetch or client navigation. */}
                      {!l.href.startsWith('/') ? (
                        <a href={l.href} className={FOOTER_LINK}>{l.label}</a>
                      ) : (
                        <Link href={l.href} className={FOOTER_LINK}>{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        {hasLanguages && (
          // This page in every language: plain links with hreflang, for readers and crawlers alike.
          <nav aria-label={t.language} className="mt-10">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {LANGUAGE_NAMES.map(lang => (
                <li key={lang.code}>
                  <a
                    href={languageHref(lang.code, pathname)}
                    hrefLang={lang.code}
                    lang={lang.code}
                    aria-current={lang.code === locale ? 'page' : undefined}
                    onClick={e => onLanguageLinkClick(e, lang.code, setLocale)}
                    className={`${FOOTER_LINK} aria-[current=page]:font-semibold aria-[current=page]:text-slate-900 dark:aria-[current=page]:text-white`}
                  >
                    {lang.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* The page is built ahead of time: after New Year the built year can
              differ from the browser's until the next deploy, which is fine. */}
          <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-start">
            <p className="text-xs text-slate-500 dark:text-slate-400" suppressHydrationWarning>© {year} Scrum Poker Online</p>
            <p className="max-w-md text-[11px] leading-snug text-slate-500 dark:text-slate-400 text-balance">{TRADEMARK[locale]}</p>
          </div>
          {/* The maker's own projects, which deploy and watch this site: plain credits. */}
          <ul className="flex flex-wrap items-center justify-center gap-x-4 sm:justify-end">
            {CREDITS.map(c => (
              <li key={c.href}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center text-xs text-slate-500 dark:text-slate-400 hover:text-accent-700 dark:hover:text-accent-400 transition-colors"
                >
                  {t[c.label]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
