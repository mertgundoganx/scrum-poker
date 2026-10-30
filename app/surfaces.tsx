/**
 * The site's shared surfaces as class strings (and the card fan), for server and client
 * components alike: the home page (a client component) can't import app/ContentPage.tsx,
 * which pulls in lib/seo. The page-wide classes (.glass, .btn-primary…) are in globals.css.
 */

/**
 * A card that is a link: white (dark: slate-900) on a hairline, lifting a little on hover, its
 * edge warming to the red. Utilities, not .glass: that class is unlayered, so its border would
 * win over the hover one.
 */
export const linkCard =
  'rounded-xl border border-slate-200 bg-white shadow-card transition-[translate,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-200 hover:shadow-raised motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-400/40';

/** A square for an icon: the red on a faint red tint. Give it a size (h-10 w-10). */
export const iconTile =
  'shrink-0 flex items-center justify-center rounded-lg bg-accent-50 text-accent-600 ring-1 ring-inset ring-accent-100 dark:bg-accent-500/15 dark:text-accent-300 dark:ring-accent-400/20';

/** The quiet button beside a primary one (.btn-secondary in globals.css), laid out like the primary. */
export const secondaryButton = 'btn-secondary inline-flex items-center justify-center gap-2 rounded-lg font-semibold';

/** A band for a call to action: a faint red tint on paper; in dark a raised anthracite (a red wash there turns brown). */
export const accentBand = 'border border-accent-100 bg-accent-50 dark:border-slate-700 dark:bg-slate-800/50';

/**
 * Three small cards fanned out, the middle one picked (a red frame, lifted): the mark of the
 * site's calls to action. Decoration only.
 */
export function CardFan({ className = '' }: { className?: string }) {
  const card = 'absolute bottom-0 flex h-10 w-7 items-center justify-center rounded-[5px] border bg-white text-xs font-bold tabular-nums shadow-card dark:bg-slate-800';
  const side = `${card} border-slate-200 text-slate-700 dark:border-slate-600 dark:text-slate-200`;
  return (
    <span aria-hidden="true" dir="ltr" className={`relative mx-auto block h-12 w-20 select-none ${className}`}>
      <span className={`${side} left-1.5 origin-bottom -rotate-12`}>3</span>
      <span className={`${side} right-1.5 origin-bottom rotate-12`}>8</span>
      <span className={`${card} left-1/2 -translate-x-1/2 -translate-y-1.5 border-accent-500 text-slate-900 ring-1 ring-accent-500 dark:border-accent-400 dark:text-slate-50 dark:ring-accent-400`}>
        5
        <span className="absolute left-[3px] top-px text-[7px] leading-none text-accent-500 dark:text-accent-400">♦</span>
      </span>
    </span>
  );
}

/** A step's number on a small playing card, red pips in two corners; `picked` frames it in red. */
export function StepCard({ n, picked = false }: { n: number | string; picked?: boolean }) {
  const pip = 'absolute text-[8px] leading-none text-accent-500 dark:text-accent-400';
  return (
    <span
      aria-hidden="true"
      dir="ltr"
      className={`relative flex h-14 w-10 shrink-0 items-center justify-center rounded-md border bg-white text-lg font-bold tabular-nums text-slate-900 shadow-card dark:bg-slate-800 dark:text-slate-50 ${picked
        ? 'border-accent-500 ring-1 ring-accent-500 dark:border-accent-400 dark:ring-accent-400'
        : 'border-slate-200 dark:border-slate-700'
      }`}
    >
      {n}
      <span className={`${pip} left-1 top-0.5`}>♦</span>
      <span className={`${pip} bottom-0.5 right-1 rotate-180`}>♦</span>
    </span>
  );
}
