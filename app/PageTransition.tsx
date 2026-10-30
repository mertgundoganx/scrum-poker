'use client';

import { useLayoutEffect, useRef, ViewTransition } from 'react';
import { usePathname } from 'next/navigation';
import './transitions.css';

/** Whether `path` is a page under `parent` ('/blog/x' under '/blog', anything under '/'). */
function isUnder(path: string, parent: string) {
  return path !== parent && path.startsWith(parent === '/' ? '/' : `${parent}/`);
}

/**
 * Around each root layout's pages: a client-side navigation (next/link, router.push)
 * swaps the page with a short fade and slide, the site header held still
 * (app/transitions.css). Keyed on the address, so the old page leaves (exit) and the new
 * one arrives (enter) in the navigation's view transition; a hash link, a query change or
 * anything else on the same page animates nothing (default="none"). The browser's back and
 * forward buttons swap at once: Next.js restores those pages outside a transition, which
 * keeps the browser's scroll restoration exact. Where the browser has no view
 * transitions, pages swap as before.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previous = useRef(pathname);

  // Which way the visitor went, for the stylesheet: into a page below this one, back up to
  // one above, or across. Layout effects run inside the view transition's update, before
  // the browser takes the new picture and starts the animations, which read this.
  useLayoutEffect(() => {
    const from = previous.current;
    previous.current = pathname;
    if (from === pathname) return;
    document.documentElement.dataset.pageNav =
      isUnder(pathname, from) ? 'deeper' : isUnder(from, pathname) ? 'back' : 'across';
  }, [pathname]);

  return (
    <ViewTransition key={pathname} enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
