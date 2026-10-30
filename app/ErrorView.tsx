'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { localizedPath } from '@/lib/localePath';
import { secondaryButton } from './surfaces';

/**
 * The error boundary of both root layouts (app/(en)/error.tsx, app/[lang]/error.tsx): the
 * site's header and footer around a card, like the 404 page.
 */
export default function ErrorView({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t, locale } = useLanguage();

  useEffect(() => {
    console.error('[ErrorView]', error);
  }, [error]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="glass-strong rounded-xl p-8 sm:p-10 text-center w-full max-w-md animate-pop-in">
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-balance text-slate-900 dark:text-white mb-3">{t.errorTitle}</h1>
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 mb-7">{t.errorSub}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button type="button" onClick={reset} className="btn-primary inline-flex items-center justify-center h-11 px-6 rounded-lg text-white font-semibold text-base cursor-pointer">{t.btnRetry}</button>
            <Link href={localizedPath(locale, '/')} className={`${secondaryButton} h-11 px-6 text-base`}>{t.btnHomePage}</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
