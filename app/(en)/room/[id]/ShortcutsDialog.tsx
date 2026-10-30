'use client';

import { useEffect, useId, useRef } from 'react';
import { useLanguage } from '@/app/LanguageProvider';
import { useFocusTrap } from '@/app/useFocusTrap';
import { IconCoffee, IconX } from '@/app/icons';
import { ROOM_TEXT } from './roomText';

/** Text with ☕ drawn as the line icon, as the cards show it. */
function withCoffee(text: string): React.ReactNode[] {
  return text.split('☕').flatMap((part, i) => (i === 0 ? [part] : [
    <span key={i} className="inline-flex align-[-0.125em]"><IconCoffee className="w-[1em] h-[1em]" strokeWidth={2.25} /><span className="sr-only">☕</span></span>,
    part,
  ]));
}

/** Keyboard shortcuts help (loaded only when someone opens it). */
export function ShortcutsDialog({ onClose }: { onClose: () => void }) {
  const { t, locale } = useLanguage();
  const rt = ROOM_TEXT[locale] ?? ROOM_TEXT.en;
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, true);
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  const rows: [string[], string][] = [
    [['1', '3'], t.shortcutVote],
    [['?', 'C'], t.shortcutSpecial],
    [['H'], t.shortcutHalf],
    [['Esc'], t.shortcutUnvote],
    [['R'], t.revealVotes],
    [['N'], t.newRound],
  ];
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="absolute inset-0 bg-slate-900/30 dark:bg-black/60" onClick={onClose} />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="relative glass-strong rounded-xl w-full max-w-sm max-h-full overflow-y-auto overscroll-contain animate-pop-in">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-800">
          <h2 id={titleId} className="font-bold text-slate-900 dark:text-slate-100 text-base">{t.shortcutsTitle}</h2>
          <button type="button" onClick={onClose} aria-label={rt.close} title={rt.close}
            className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            <IconX size={14} />
          </button>
        </div>
        {/* Keys in a column of their own, each description right next to them. */}
        <dl className="p-5 space-y-2.5 text-sm">
          {rows.map(([keys, label]) => (
            <div key={label} className="flex items-center gap-3">
              <dt className="w-16 flex gap-1 shrink-0" dir="ltr">
                {keys.map(k => <kbd key={k} className="min-w-7 h-7 px-1.5 inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-600 border-b-2 bg-white dark:bg-slate-800 font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">{k}</kbd>)}
              </dt>
              <dd className="min-w-0 text-slate-600 dark:text-slate-300 text-start">{withCoffee(label)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
