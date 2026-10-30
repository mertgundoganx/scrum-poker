'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import { Logo } from './Logo';
import { HEADER_KEY, ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { IconX } from '@/app/icons';
import { contentPage, localizedPath } from '@/lib/localePath';

function IconMenu({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/** Global top navigation for marketing & content pages. */
export function SiteHeader() {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const nav = [
    { href: localizedPath(locale, '/guide'), label: t.navGuide },
    { href: localizedPath(locale, '/blog'), label: t.navBlog },
    { href: localizedPath(locale, '/pricing'), label: t.navPricing },
  ];
  // Only on our own pages: the 404 is built once (as /_not-found), so a missing /blog/<slug>
  // lighting up the blog link after hydration would not match the HTML.
  const onPage = contentPage(pathname) !== null;
  const isCurrent = (href: string) => onPage && (pathname === href || pathname.startsWith(`${href}/`));

  useEffect(() => {
    if (!menuOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      // Any link inside the header (logo, nav) navigates away, so close the mobile menu.
      onClick={e => { if ((e.target as HTMLElement).closest('a')) setMenuOpen(false); }}
      // site-header (globals.css): a soft shadow fades in once the page scrolls under it.
      className="site-header sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-6 min-w-0">
          <Logo href={localizedPath(locale, '/')} className="whitespace-nowrap" />
          <nav aria-label={t.navMain} className="hidden md:flex items-center gap-1">
            {nav.map(n => {
              const current = isCurrent(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={current ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 ${
                    current ? 'text-slate-900 dark:text-white underline decoration-accent-500 dark:decoration-accent-400 decoration-2 underline-offset-[7px]' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <ThemeToggle />
          <LanguageSelector />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            className={`md:hidden ${HEADER_KEY} w-9 text-slate-700 dark:text-slate-200`}
          >
            {menuOpen ? <IconX size={18} /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id={menuId}
        hidden={!menuOpen}
        className="md:hidden absolute inset-x-0 top-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-raised"
      >
        <nav aria-label={t.navMobile} className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
          {nav.map(n => {
            const current = isCurrent(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={current ? 'page' : undefined}
                className={`flex items-center gap-2 min-h-11 px-3 rounded-lg text-base font-medium transition-colors ${
                  current
                    ? 'text-accent-700 dark:text-accent-300 bg-accent-50 dark:bg-accent-500/12'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {n.label}
                {current && <span aria-hidden="true" className="text-xs text-accent-500 dark:text-accent-400">♦</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
