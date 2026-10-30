import Link from 'next/link';
import { IconArrowRight, IconChevronDown, IconTimer } from '@/app/icons';
import { parseInline } from '@/app/InlineMarkup';
import { CtaBlock, PageMain, pageLead, pageTitle, type Trail } from '@/app/ContentPage';
import { linkCard } from '@/app/surfaces';
import { articleWordCount, headingIds, parseList, plainText } from './articleFormat';
import type { Localized, RelatedPost, Section } from './articleTypes';
import { formatDate } from './formatDate';
import { fill } from '@/lib/i18n';
import { BLOG_INDEX, postText } from '@/lib/blogPosts';
import { localizedPath } from '@/lib/localePath';
import type { Locale, Translations } from '@/lib/translations';
import { ScrollSpyToc } from './ScrollSpyToc';
import { TocList, type TocEntry } from './TocList';

/**
 * The body (`<main>`) of a blog article, rendered on the server by BlogArticle in the page's
 * language. Only the scroll-spy of the table of contents runs in the browser.
 */

const WORDS_PER_MINUTE = 200;
// Chinese has no spaces between words: read time from characters instead.
const CHARS_PER_MINUTE_ZH = 400;
export const FAQ_ID = 'faq';

/** The landing pages a post can list as related, by the interface text that names them. */
const LANDING_TITLES = {
  '/fibonacci-planning-poker': 'homeLinkFibTitle',
  '/t-shirt-sizing': 'homeLinkTshirtTitle',
  '/planning-poker-cards': 'homeLinkCardsTitle',
} as const satisfies Record<string, keyof Translations>;

/** The title of the post, guide or landing page at `href`, as the blog index or the home page names it in `locale`. */
function relatedTitle(href: string, locale: Locale, t: Translations) {
  if (href in LANDING_TITLES) return t[LANDING_TITLES[href as keyof typeof LANDING_TITLES]];
  const post = BLOG_INDEX.find(p => p.href === href);
  return post ? postText(post, locale).title : null;
}

export interface ArticleViewProps {
  data: Localized;
  /** The language of `data` and `t`. */
  locale: Locale;
  t: Translations;
  /** The English section titles: anchor ids come from them, so every language has the same ones. */
  enSectionTitles: string[];
  /** The read time (minutes) listed on the blog index in this language, if the article is listed there. */
  listedMinutes?: number;
  related?: RelatedPost[];
  /** 'YYYY-MM-DD' */
  published: string;
  /** 'YYYY-MM-DD' */
  updated?: string;
  /** Home › Blog › this article (pageTrail). */
  trail: Trail;
}

function ArticleList({ items, locale }: { items: string[]; locale: Locale }) {
  const list = parseList(items);
  const children = list.items.map((item, i) => (
    <li key={i} value={list.ordered ? item.value : undefined}>
      {item.label ? (
        <>
          <strong>{parseInline(item.label, locale)}</strong>
          {item.joiner}
          {parseInline(item.text, locale)}
        </>
      ) : (
        parseInline(item.text, locale)
      )}
    </li>
  ));
  return list.ordered ? <ol>{children}</ol> : <ul>{children}</ul>;
}

/** Section text may hold [links](/path) (English addresses, sent to the page's language). */
function ArticleSection({ id, section, locale }: { id: string; section: Section; locale: Locale }) {
  // Follow the order the author wrote the keys in: a section declared as `items` then `paragraphs`
  // reads "intro → list → closing remarks"; the other way round the list comes last.
  const keys = Object.keys(section);
  const listFirst = keys.includes('paragraphs') && keys.indexOf('items') < keys.indexOf('paragraphs');
  const list = section.items && section.items.length > 0 ? <ArticleList items={section.items} locale={locale} /> : null;

  return (
    <section data-toc-section={id} className="prose-article">
      <h2 id={id}>{section.title}</h2>
      <p>{parseInline(section.content, locale)}</p>
      {listFirst && list}
      {section.paragraphs?.map((paragraph, j) => <p key={j}>{parseInline(paragraph, locale)}</p>)}
      {!listFirst && list}
    </section>
  );
}

export default function ArticleView({
  data,
  locale,
  t,
  enSectionTitles,
  listedMinutes,
  related,
  published,
  updated,
  trail,
}: ArticleViewProps) {
  const dateModified = updated ?? published;
  const hasUpdate = dateModified !== published;
  // The blog index lists the stored read time, so show the same one here; count only for unlisted articles.
  const counted = locale === 'zh'
    ? plainText(JSON.stringify(data)).length / CHARS_PER_MINUTE_ZH
    : articleWordCount(data, locale) / WORDS_PER_MINUTE;
  const readMinutes = listedMinutes ?? Math.max(1, Math.round(counted));

  const sectionIds = headingIds(
    data.sections.map((s, i) => enSectionTitles[i] ?? s.title),
    [FAQ_ID],
  );
  const faq = data.faq ?? [];
  const hasFaq = faq.length > 0;
  const faqTitle = t.blogFaq;
  const toc: TocEntry[] = [
    ...data.sections.map((s, i) => ({ id: sectionIds[i], title: s.title })),
    ...(hasFaq ? [{ id: FAQ_ID, title: faqTitle }] : []),
  ];

  // The callout goes after the middle section (never after the last one).
  const midIndex = data.sections.length > 2 ? Math.ceil(data.sections.length / 2) - 1 : -1;
  const tocLabel = t.blogOnThisPage;

  const navLinkClass =
    'inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-600 transition-colors hover:text-accent-700 dark:text-slate-400 dark:hover:text-accent-400';

  return (
    <PageMain trail={trail}>
      <div className="mx-auto w-full max-w-6xl px-4 lg:grid lg:grid-cols-[minmax(0,40rem)_16rem] lg:justify-center lg:gap-x-20">
        {/* 40rem ≈ 75–80 characters per line at 16px Geist (its wide "0" makes 70ch come out near 95). */}
        <div className="mx-auto w-full min-w-0 max-w-160 lg:mx-0">
          <article>
            <header className="border-b border-slate-200 pb-8 dark:border-slate-800">
              <h1 className={pageTitle}>{data.title}</h1>
              <p className={pageLead}>{data.subtitle}</p>
              <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-slate-500 dark:text-slate-400">
                <span>
                  <time dateTime={published}>
                    {formatDate(published, locale)}
                  </time>
                  {hasUpdate && (
                    <>
                      <span aria-hidden="true" className="mx-2 text-slate-300 dark:text-slate-600">·</span>
                      {t.blogUpdated}{' '}
                      <time dateTime={dateModified}>{formatDate(dateModified, locale)}</time>
                    </>
                  )}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <IconTimer size={14} />
                  {fill(t.blogReadTime, { n: readMinutes })}
                </span>
              </p>
            </header>

            {/* Small screens: collapsible table of contents */}
            <details className="group mt-6 rounded-xl border border-slate-200 bg-white shadow-card lg:hidden dark:border-slate-800 dark:bg-slate-900">
              <summary id="toc-mobile" className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 [&::-webkit-details-marker]:hidden">
                {tocLabel}
                <IconChevronDown size={18} className="text-slate-400 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
              </summary>
              <nav aria-labelledby="toc-mobile" className="px-4 pb-4">
                <TocList entries={toc} activeId={null} />
              </nav>
            </details>

            <div className="mt-8 flex flex-col gap-10 sm:mt-10">
              {data.sections.map((section, i) => (
                <div key={sectionIds[i]} className="contents">
                  <ArticleSection id={sectionIds[i]} section={section} locale={locale} />
                  {i === midIndex && (
                    <aside
                      aria-labelledby={`try-${i}`}
                      className="flex flex-col gap-4 rounded-xl border border-accent-100 border-s-[3px] border-s-accent-500 bg-accent-50 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6 dark:border-slate-700 dark:border-s-accent-400 dark:bg-slate-900"
                    >
                      <div className="min-w-0 flex-1">
                        <p id={`try-${i}`} className="text-base font-semibold leading-snug text-slate-900 dark:text-white">
                          {t.blogTryTitle}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {t.blogTryText}
                        </p>
                      </div>
                      <Link
                        href={localizedPath(locale, '/')}
                        className="btn-primary inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
                      >
                        {t.blogCtaBtn}
                        <IconArrowRight size={16} className="rtl:rotate-180" />
                      </Link>
                    </aside>
                  )}
                </div>
              ))}

              {hasFaq && (
                <section data-toc-section={FAQ_ID} className="prose-article">
                  <h2 id={FAQ_ID}>{faqTitle}</h2>
                  <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                    {faq.map((f, i) => (
                      <div key={i} className="py-5">
                        <h3 className="mt-0!">{f.q}</h3>
                        <p className="mb-0!">{parseInline(f.a, locale)}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <CtaBlock text={t.blogCtaText} label={t.blogCtaBtn} href={localizedPath(locale, '/')} />
          </article>

          {/* Related posts */}
          {related && related.length > 0 && (
            <section className="mt-12" aria-labelledby="related-articles">
              <h2 id="related-articles" className="eyebrow scroll-mt-24">
                {t.blogRelated}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {related.map(r => (
                  <li key={r.href}>
                    <Link
                      href={localizedPath(locale, r.href)}
                      className={`group flex items-center gap-4 px-4 py-3.5 ${linkCard}`}
                    >
                      <span className="min-w-0 flex-1 text-base font-medium leading-snug text-slate-800 transition-colors group-hover:text-accent-700 dark:text-slate-100 dark:group-hover:text-accent-400">
                        {relatedTitle(r.href, locale, t)}
                      </span>
                      <IconArrowRight
                        size={18}
                        className="shrink-0 rtl:rotate-180 text-slate-400 transition-colors group-hover:text-accent-600 dark:text-slate-500 dark:group-hover:text-accent-400"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav
            aria-labelledby="blog-nav-all"
            className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-slate-200 pt-6 dark:border-slate-800"
          >
            <Link id="blog-nav-all" href={localizedPath(locale, '/blog')} className={navLinkClass}>
              <IconArrowRight size={16} className="rotate-180 rtl:rotate-0" />
              {t.blogAllPosts}
            </Link>
            <Link href={localizedPath(locale, '/guide')} className={navLinkClass}>
              {t.blogGuideLink}
              <IconArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </nav>
        </div>

        {/* Large screens: sticky table of contents with scroll-spy */}
        <aside className="hidden lg:block">
          <nav aria-labelledby="toc-desktop" className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-4 pt-2">
            <p id="toc-desktop" className="eyebrow mb-3">{tocLabel}</p>
            <ScrollSpyToc entries={toc} />
          </nav>
        </aside>
      </div>
    </PageMain>
  );
}
