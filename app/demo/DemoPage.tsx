import type { Metadata } from 'next';
import { SiteHeader } from '@/app/SiteHeader';
import { SiteFooter } from '@/app/SiteFooter';
import { parseInline } from '@/app/InlineMarkup';
import { CtaBlock, PageMain, pageLead, pageTitle, pageTrail } from '@/app/ContentPage';
import { loadContent, type ContentLoaders } from '@/lib/content';
import { getDictionary } from '@/lib/dictionaries';
import { localizedPath } from '@/lib/localePath';
import { getMeta } from '@/lib/meta';
import { pageMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/translations';
import { IconChart, IconEye, IconZap, type IconProps } from '@/app/icons';
import { LogoMark } from '@/app/Logo';
import { iconTile } from '@/app/surfaces';
// The room's playing cards (pc-*), for the sample round's cards.
import '@/app/(en)/room/[id]/room.css';
import type { DemoContent } from './content/types';

const content: ContentLoaders<DemoContent> = {
  en: () => import('./content/en'),
  tr: () => import('./content/tr'),
  de: () => import('./content/de'),
  fr: () => import('./content/fr'),
  it: () => import('./content/it'),
  ar: () => import('./content/ar'),
  zh: () => import('./content/zh'),
};

/** Closed padlock (not in the shared set). */
function IconLock({ size = 16, strokeWidth = 2, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// The same people as the home page's room preview (app/RoomPreview.tsx); the explanation names them.
const MOCK_PARTICIPANTS = [
  { name: 'Aleyna', avatar: '🦊', vote: '5' },
  { name: 'Bob', avatar: '🐻', vote: '8' },
  { name: 'Carol', avatar: '🐱', vote: '5' },
  { name: 'Damla', avatar: '', vote: '3' },
];

export function demoMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, path: '/demo', ...getMeta(locale).pages.demo });
}

/** /demo: a revealed sample round and what it means, rendered on the server in the page's language. */
export async function DemoPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = await loadContent(content, locale);
  // Named the way the footer links to it.
  const trail = pageTrail(t, locale, { name: t.demoLink, href: localizedPath(locale, '/demo') });

  const features = [
    { Icon: IconLock, title: t.demoFeat1Title, desc: t.demoFeat1Desc },
    { Icon: IconZap, title: t.demoFeat2Title, desc: t.demoFeat2Desc },
    { Icon: IconChart, title: t.demoFeat3Title, desc: t.demoFeat3Desc },
  ];

  return (
    <>
      <SiteHeader />
      <PageMain trail={trail}>
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="eyebrow mb-4 flex items-center justify-center gap-2">
              <IconEye size={14} /> {t.demoLivePreview}
            </p>
            <h1 className={pageTitle}>{t.demoTitle}</h1>
            <p className={pageLead}>{t.demoSubtitle}</p>
          </div>

          {/* Mock room */}
          <div className="glass-strong rounded-xl overflow-hidden">
            {/* Fake header */}
            <div className="px-4 sm:px-5 h-12 flex items-center gap-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
              <LogoMark size={22} />
              <span className="font-semibold text-base text-slate-900 dark:text-white truncate">{t.demoRoomName}</span>
              <span className="ms-auto shrink-0 px-2 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wide border border-accent-200 bg-accent-50 text-accent-700 dark:border-accent-400/30 dark:bg-accent-500/15 dark:text-accent-300">{t.demoBadge}</span>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              {/* Participants */}
              <div>
                <p className="eyebrow mb-4">{t.demoVotesRevealed}</p>
                <div className="flex gap-4 sm:gap-6 justify-center flex-wrap">
                  {MOCK_PARTICIPANTS.map((p) => (
                    <div key={p.name} className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold text-lg">
                        {p.avatar || p.name.charAt(0)}
                      </div>
                      {/* A revealed card, the room's own (room.css): a corner index top-left and bottom-right;
                          the cards on the most common value framed in red, as the room marks them */}
                      <div dir="ltr" className={`pc w-14 h-20 rounded-lg flex items-center justify-center font-bold text-2xl tabular-nums ${p.vote === '5' ? 'pc-match' : ''}`}>
                        <span aria-hidden="true" className="pc-index absolute left-1.5 top-1.5 flex flex-col items-center gap-px text-[10px] font-bold leading-none">{p.vote}<span className="text-[8px]">♦</span></span>
                        {p.vote}
                        <span aria-hidden="true" className="pc-index absolute bottom-1.5 right-1.5 flex rotate-180 flex-col items-center gap-px text-[10px] font-bold leading-none">{p.vote}<span className="text-[8px]">♦</span></span>
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-300">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="pt-5 border-t border-slate-200 dark:border-slate-800">
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="stat-card rounded-xl px-3 py-3 text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">5.3</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-0.5">{t.statAvg}</p>
                  </div>
                  <div className="stat-card rounded-xl px-3 py-3 text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">3</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-0.5">{t.statMin}</p>
                  </div>
                  <div className="stat-card rounded-xl px-3 py-3 text-center">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">8</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-0.5">{t.statMax}</p>
                  </div>
                </div>
                {/* Distribution */}
                <div className="space-y-2">
                  {[{ val: '3', count: 1 }, { val: '5', count: 2 }, { val: '8', count: 1 }].map(({ val, count }) => (
                    <div key={val} className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 w-6 text-end shrink-0 tabular-nums">{val}</span>
                      <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className={`h-full rounded-full ${val === '5' ? 'bg-accent-500 dark:bg-accent-400' : 'bg-slate-400 dark:bg-slate-500'}`} style={{ width: `${(count / 4) * 100}%` }} />
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400 shrink-0 w-6 tabular-nums">{count}×</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* New round button: a picture of the room's button (the hint below says what it does there). */}
              <div className="text-center pt-1">
                <div className="inline-block px-6 py-2.5 rounded-lg font-semibold text-base bg-accent-600 dark:bg-accent-550 text-white select-none shadow-card">
                  {t.newRound}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2.5">{t.demoNewRoundHint}</p>
              </div>
            </div>
          </div>

          {/* What the sample result means */}
          <section aria-labelledby="demo-reading" className="prose-article mt-10">
            <h2 id="demo-reading">{c.title}</h2>
            {c.paragraphs.map((paragraph, i) => <p key={i}>{parseInline(paragraph, locale)}</p>)}
          </section>

          {/* Feature highlights */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {features.map(({ Icon, title, desc }) => (
              <div key={title} className="glass rounded-xl p-5 flex sm:flex-col items-start gap-4 sm:gap-3">
                <span aria-hidden="true" className={`${iconTile} w-10 h-10`}>
                  <Icon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-base font-semibold leading-snug text-slate-900 dark:text-slate-100 mb-1">{title}</p>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <CtaBlock text={t.demoCtaText} label={t.demoCtaBtn} href={localizedPath(locale, '/')} />
        </div>
      </PageMain>
      <SiteFooter />
    </>
  );
}
