'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { localizedPath } from '@/lib/localePath';
import { iconTile } from './surfaces';

/**
 * The 404 page (app/global-not-found.tsx), in the visitor's language: the site's header
 * (with the language menu) and footer around the same card as the room's not-found view.
 */
export function NotFoundView() {
  const { t, locale } = useLanguage();
  // The built page's title is English; the tab follows the language picked in the browser.
  useEffect(() => { document.title = `${t.notFoundTitle} | Scrum Poker Online`; }, [t.notFoundTitle]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="glass-strong rounded-xl p-8 sm:p-10 text-center w-full max-w-md animate-pop-in">
          <span
            aria-hidden="true"
            className={`${iconTile} mx-auto w-12 h-12 rounded-xl! mb-5`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <p className="eyebrow mb-2 tabular-nums">404</p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-balance text-slate-900 dark:text-white mb-3">{t.notFoundTitle}</h1>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 mb-7">{t.notFoundSub}</p>
          <Link href={localizedPath(locale, '/')} className="btn-primary inline-flex items-center justify-center h-11 px-6 rounded-lg text-white font-semibold text-base">{t.btnBackHome}</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
