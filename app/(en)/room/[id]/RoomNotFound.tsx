'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/LanguageProvider';
import { localizedPath } from '@/lib/localePath';

/** Shown for a room code that doesn't exist (or has expired), in the visitor's language (./not-found.tsx). */
export function RoomNotFound() {
  const { t, locale } = useLanguage();
  // not-found.tsx gets no props: the code is the last part of the address.
  const code = (usePathname().split('/').pop() ?? '').toUpperCase();
  // The server's title is English; the tab follows the language picked in the browser.
  useEffect(() => { document.title = `${t.roomGoneTitle} | Scrum Poker Online`; }, [t.roomGoneTitle]);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-strong rounded-xl p-8 sm:p-10 text-center w-full max-w-md animate-pop-in">
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 bg-accent-50 dark:bg-accent-500/15 text-accent-600 dark:text-accent-400"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" focusable="false">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3">{t.roomGoneTitle}</h1>
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 mb-2">{t.roomGoneSub}</p>
        <p className="font-mono font-bold text-slate-900 dark:text-slate-100 break-all mb-7" dir="ltr">{code}</p>
        <Link href={localizedPath(locale, '/')} className="btn-primary inline-flex items-center justify-center h-11 px-6 rounded-lg text-white font-semibold text-base">
          {t.btnHome}
        </Link>
      </div>
    </div>
  );
}
