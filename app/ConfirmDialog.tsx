'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from './useFocusTrap';
import { IconX } from './icons';

/**
 * A yes/no question for a step that can't be undone. Cancel has the focus
 * first and Escape cancels, so a stray Enter never confirms. With a title it
 * has the header of the room's other dialogs (the title, a close button).
 */
export function ConfirmDialog({ title, message, confirmLabel, cancelLabel, closeLabel, onConfirm, onCancel }: {
  title?: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  /** The close button's name; Cancel's by default (closing cancels). */
  closeLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const titleId = useId();
  const messageId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  // Rendered into <body> after mount, like the room's other dialogs.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- portal target exists only after mount
  useEffect(() => { setMounted(true); }, []);
  useFocusTrap(dialogRef, mounted);
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onCancel(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCancel]);

  if (!mounted) return null;
  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/30 dark:bg-black/60" onClick={onCancel} />
      <div ref={dialogRef} role="alertdialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} aria-describedby={messageId}
        className="relative glass-strong rounded-xl w-full max-w-sm max-h-full overflow-y-auto overscroll-contain animate-pop-in">
        {title && (
          <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-200 dark:border-slate-800">
            <h2 id={titleId} className="font-bold text-slate-900 dark:text-slate-100 text-base">{title}</h2>
            <button type="button" onClick={onCancel} aria-label={closeLabel ?? cancelLabel} title={closeLabel ?? cancelLabel}
              className="shrink-0 w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              <IconX size={14} />
            </button>
          </div>
        )}
        <div className="p-5">
          <p id={messageId} className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{message}</p>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            {/* Focused first (before the close button too): Enter right away cancels. */}
            <button type="button" onClick={onCancel} autoFocus
              className="btn-secondary min-h-10 px-4 py-2 rounded-lg text-sm font-semibold">
              {cancelLabel}
            </button>
            <button type="button" onClick={onConfirm}
              className="min-h-10 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-semibold text-white transition-colors">
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
