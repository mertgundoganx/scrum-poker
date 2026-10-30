import Link from 'next/link';

/*
 * The mark: two playing cards fanned from one corner. The back one shows its back, card-suit
 * red with a fine white frame; the front one is white with an ink hairline and a red diamond
 * pip. Drawn on a 28-unit grid; the same geometry is in app/icon.svg, the share images
 * (app/opengraph-image/route.tsx, app/blog/opengraph-image.tsx), the app icons in
 * public/icons and public/offline.html.
 */
export const MARK_VIEWBOX = '0 0 28 28';
export const MARK_BACK = { x: 7, y: 3.5, width: 15, height: 21, rx: 2.6, transform: 'rotate(-15 14.5 27.5)' };
/** The card back's inset frame (inside MARK_BACK's rotation). */
export const MARK_FRAME = { x: 8.7, y: 5.2, width: 11.6, height: 17.6, rx: 1.4 };
export const MARK_FRONT = { x: 8, y: 3, width: 15, height: 21, rx: 2.6, transform: 'rotate(7 14.5 27.5)' };
/** A diamond with slightly drawn-in sides, like a printed pip. */
export const MARK_PIP = 'M15.5 7.9Q16.4 12.27 19.6 13.5Q16.4 14.73 15.5 19.1Q14.6 14.73 11.4 13.5Q14.6 12.27 15.5 7.9Z';

/**
 * Line weights by rendered size, in grid units: the front card's edge stays about a pixel
 * wide when small and thins to a hairline when big; the back's frame shows from 24px up.
 */
export function markStrokes(size: number) {
  return {
    edge: size <= 16 ? 1.8 : size <= 32 ? 1.5 : size <= 64 ? 1.2 : 1,
    frame: size < 24 ? 0 : size < 40 ? 0.7 : size < 100 ? 0.55 : 0.45,
  };
}

/**
 * The mark alone. Light: a red card back behind a white card edged in ink. Dark: a slightly
 * brighter red back, the white card edged in the page colour so the two stay apart.
 */
export function LogoMark({ size = 26, className = '' }: { size?: number; className?: string }) {
  const { transform: backTurn, ...back } = MARK_BACK;
  const { transform: frontTurn, ...front } = MARK_FRONT;
  const { edge, frame } = markStrokes(size);
  return (
    <svg width={size} height={size} viewBox={MARK_VIEWBOX} aria-hidden="true" focusable="false" className={`shrink-0 ${className}`}>
      <g transform={backTurn}>
        <rect {...back} className="fill-accent-600 dark:fill-accent-550" />
        {frame > 0 && <rect {...MARK_FRAME} fill="none" stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth={frame} />}
      </g>
      <g transform={frontTurn}>
        <rect {...front} strokeWidth={edge} className="fill-white stroke-slate-900 dark:stroke-slate-950" />
        <path d={MARK_PIP} className="fill-accent-500" />
      </g>
    </svg>
  );
}

/** Mark + wordmark: "Scrum" bold, "Poker" regular, both in ink; the colour is the mark's. */
export function Logo({ href = '/', className = '' }: { href?: string | null; className?: string }) {
  const mark = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="text-base leading-none tracking-[-0.02em] text-slate-900 dark:text-slate-50">
        <span className="font-bold">Scrum</span> <span className="font-normal">Poker</span>
      </span>
    </span>
  );
  if (!href) return mark;
  return (
    // No prefetch: on every page's header it would fetch the home page (often the page
    // itself) and the home page's code, for a link rarely followed.
    <Link href={href} prefetch={false} className="inline-flex items-center rounded-lg">
      {mark}
    </Link>
  );
}
