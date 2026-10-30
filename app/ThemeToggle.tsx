'use client';

import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useLanguage } from './LanguageProvider';

/** The header's square keys (theme, language, menu): white on the paper with a hairline. */
export const HEADER_KEY =
  'h-9 min-w-9 pointer-coarse:h-10 pointer-coarse:min-w-10 shrink-0 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_1px_2px_rgba(35,38,45,0.05)] dark:shadow-none hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex items-center justify-center';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- avoid SSR/client icon mismatch
  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted && theme === 'dark';
  // The icon pops in after a click only: not on first paint, nor when hydration swaps it.
  const [switched, setSwitched] = useState(false);
  const pop = switched ? 'animate-pop-in' : undefined;

  return (
    <button
      type="button"
      onClick={() => { setSwitched(true); toggle(); }}
      aria-label={t.themeDark}
      aria-pressed={isDark}
      title={isDark ? t.themeToLight : t.themeToDark}
      className={`${HEADER_KEY} w-9 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white ${className}`}
    >
      {/* Keyed by theme, so the new icon mounts and pops in (no motion under reduced motion). */}
      {isDark ? (
        <svg key="sun" className={pop} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg key="moon" className={pop} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
