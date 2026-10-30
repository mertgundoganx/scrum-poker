/**
 * The visible part of a landing page (breadcrumb trail to "keep reading"), built from a LandingContent.
 * No hooks and no directive: app/LandingPage.tsx renders it on the server in the page's language.
 */
import {
  ContentShell, ContentSurface, CtaBlock, FaqList, PageHeader, RelatedLinks,
  cardSurface, cardText, cardTitle, inlineCode, type Trail,
} from '@/app/ContentPage';
import { InlineMarkup } from '@/app/InlineMarkup';
import type { LandingBlock, LandingContent } from '@/app/landingTypes';
import { localizedPath } from '@/lib/localePath';
import type { Locale } from '@/lib/translations';

function Block({ block, locale }: { block: LandingBlock; locale: Locale }) {
  if ('p' in block) return <p><InlineMarkup text={block.p} locale={locale} /></p>;
  if ('ul' in block) return <ul>{block.ul.map((item, i) => <li key={i}><InlineMarkup text={item} locale={locale} /></li>)}</ul>;
  if ('ol' in block) return <ol>{block.ol.map((item, i) => <li key={i}><InlineMarkup text={item} locale={locale} /></li>)}</ol>;
  if ('example' in block) {
    return (
      <div className={`${cardSurface} mb-4`}>
        <p className="mb-0!"><InlineMarkup text={block.example} locale={locale} /></p>
      </div>
    );
  }
  if ('sizes' in block) {
    return (
      <ul className="list-none! ps-0! grid gap-2.5">
        {block.sizes.map(({ size, desc }) => (
          <li key={size} className="m-0! p-0! flex items-start gap-3">
            <span
              dir="ltr"
              className="shrink-0 w-12 mt-0.5 text-center px-1.5 py-0.5 rounded-md bg-accent-50 dark:bg-accent-500/15 border border-accent-100 dark:border-accent-400/20 text-accent-800 dark:text-accent-200 text-sm font-bold"
            >
              {size}
            </span>
            <span><InlineMarkup text={desc} locale={locale} /></span>
          </li>
        ))}
      </ul>
    );
  }
  if ('decks' in block) {
    return (
      <div className="grid gap-3 mb-4">
        {block.decks.map(({ title, cards, desc }) => (
          <div key={title} className={cardSurface}>
            <h3 className={cardTitle}>{title}</h3>
            <p className="mb-2! text-base leading-relaxed"><code className={inlineCode}>{cards}</code></p>
            <p className={cardText}><InlineMarkup text={desc} locale={locale} /></p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid sm:grid-cols-2 gap-3 mb-4">
      {block.compare.map(({ title, items }) => (
        <div key={title} className={cardSurface}>
          <h3 className={cardTitle}>{title}</h3>
          <ul className="mb-0! text-[0.9375rem] leading-relaxed">
            {items.map((item, i) => <li key={i}><InlineMarkup text={item} locale={locale} /></li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function LandingBody({ c, locale, trail }: {
  c: LandingContent;
  locale: Locale;
  /** Home › this page, in the page's language (pageTrail). */
  trail: Trail;
}) {
  const home = localizedPath(locale, '/');
  return (
    <ContentShell trail={trail}>
      <ContentSurface>
        <PageHeader title={c.title} subtitle={c.subtitle} />

        <div className="prose-article">
          {c.sections.map((section, i) => (
            <section key={i}>
              {section.title && <h2>{section.title}</h2>}
              {section.blocks.map((block, j) => <Block key={j} block={block} locale={locale} />)}
            </section>
          ))}

          <section>
            <h2>{c.faqTitle}</h2>
            <FaqList items={c.faq} />
          </section>
        </div>

        <CtaBlock text={c.ctaText} label={c.ctaLabel} href={home} />

        <RelatedLinks
          title={c.relatedTitle}
          links={c.related.map(link => ({ ...link, href: localizedPath(locale, link.href) }))}
        />
      </ContentSurface>
    </ContentShell>
  );
}
