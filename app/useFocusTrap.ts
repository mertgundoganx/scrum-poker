'use client';

import { useEffect, type RefObject } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function focusables(el: HTMLElement): HTMLElement[] {
  return [...el.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(i => i.offsetParent !== null);
}

/**
 * Keyboard focus for a dialog or popover while `active`: focus moves inside
 * (unless an autoFocus field already has it), Tab and Shift+Tab cycle within
 * it when `trap` is set, and when it closes focus returns to where it was —
 * unless the user has meanwhile moved it somewhere else on purpose.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, { trap = true }: { trap?: boolean } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return;
    const previous = document.activeElement as HTMLElement | null;
    if (!el.contains(document.activeElement)) focusables(el)[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (!trap || e.key !== 'Tab' || !el) return;
      const items = focusables(el);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !el.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !el.contains(document.activeElement))) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      // Closed with focus inside (now gone, so on <body>): put it back.
      const now = document.activeElement;
      if ((!now || now === document.body || el.contains(now)) && previous?.isConnected) previous.focus();
    };
  }, [ref, active, trap]);
}

/** Arrow keys, Home and End move between a menu's items. */
export function onMenuKeyDown(e: React.KeyboardEvent<HTMLElement>) {
  const items = [...e.currentTarget.querySelectorAll<HTMLElement>('[role^="menuitem"]')];
  const at = items.indexOf(document.activeElement as HTMLElement);
  const go = (i: number) => { e.preventDefault(); items[(i + items.length) % items.length]?.focus(); };
  if (e.key === 'ArrowDown') go(at + 1);
  else if (e.key === 'ArrowUp') go(at - 1);
  else if (e.key === 'Home') go(0);
  else if (e.key === 'End') go(items.length - 1);
}
