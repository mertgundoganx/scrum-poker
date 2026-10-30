'use client';

import { useEffect, useState } from 'react';
import { TocList, type TocEntry } from './TocList';

/**
 * Scroll-spy: reports the id of the section currently crossing a thin band near the top of the
 * viewport. State is only ever set from the observer callback, never synchronously in the effect.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const order = key.split('|');
    const elements = order
      .map(id => document.getElementById(id)?.closest('section'))
      .filter((el): el is HTMLElement => el != null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.tocSection;
          if (!id) continue;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        let current = order.find(id => visible.has(id)) ?? null;
        if (!current) {
          // Nothing crosses the band (between sections, or after an anchor jump past the article):
          // fall back to the last section that starts above it.
          const line = window.innerHeight * 0.18;
          for (const el of elements) {
            if (el.getBoundingClientRect().top <= line) current = el.dataset.tocSection ?? current;
          }
        }
        setActive(current);
      },
      { rootMargin: '-18% 0px -78% 0px', threshold: 0 },
    );
    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [key]);

  return active;
}

/** The large-screen table of contents, highlighting the section being read. */
export function ScrollSpyToc({ entries }: { entries: TocEntry[] }) {
  const observedId = useActiveSection(entries.map(entry => entry.id));
  const activeId = observedId ?? entries[0]?.id ?? null;
  return <TocList entries={entries} activeId={activeId} />;
}
