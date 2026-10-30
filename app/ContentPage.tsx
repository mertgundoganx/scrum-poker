/**
 * Shared building blocks for the site's pages (guide, legal, landing pages, blog, pricing, demo).
 * No hooks and no 'use client', but server only in practice: PageTrail's structured data
 * pulls in lib/seo, which a client component shouldn't ship.
 * Links take addresses already in the page's language (localizedPath in lib/localePath.ts).
 *
 * Body copy lives in `.prose-article` (globals.css, unlayered). Anything nested inside it
 * that must not look like prose (cards, tiles) uses Tailwind `!` utilities to opt out.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { IconArrowRight, IconChevronRight } from '@/app/icons';
import { JsonLd } from '@/app/JsonLd';
import { CardFan, accentBand } from '@/app/surfaces';
import { localizedPath } from '@/lib/localePath';
import { absoluteUrl } from '@/lib/seo';
import type { Locale, Translations } from '@/lib/translations';

/** Inline code chip, e.g. a run of card values. Sized relative to the surrounding text. */
export const inlineCode =
  'px-1.5 py-0.5 rounded-md box-decoration-clone bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-[0.875em] font-mono';

/** Card surface used for FAQ items, examples and feature tiles. */
export const cardSurface = 'glass rounded-xl p-5';

/** Heading / body inside a card that sits within `.prose-article`. */
export const cardTitle = 'mt-0! mb-1.5! text-base! leading-snug! font-semibold! text-balance';
export const cardText = 'mb-0! text-[0.9375rem] leading-relaxed';

/** Every page's <h1> and the lead under it. A word too long for the line (German) breaks instead of overflowing. */
export const pageTitle =
  'text-3xl sm:text-[2.5rem] font-bold leading-tight sm:leading-[1.12] tracking-[-0.025em] text-balance wrap-break-word text-slate-900 dark:text-white';
export const pageLead = 'mt-4 text-lg leading-relaxed text-pretty text-slate-600 dark:text-slate-300';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 dark:focus-visible:outline-accent-400';

/** One step of a page's breadcrumb trail. `href` is the page's address in its language. */
export interface Crumb { name: string; href: string }
/** Where a page sits in the site: Home first, the page itself last; `label` names the trail. */
export interface Trail { label: string; items: Crumb[] }

/** The trail of a page in `locale`: Home, then `items` (the last one is the page itself). */
export function pageTrail(t: Translations, locale: Locale, ...items: Crumb[]): Trail {
  return { label: t.breadcrumbLabel, items: [{ name: t.btnHome, href: localizedPath(locale, '/') }, ...items] };
}

/**
 * "Home › Blog › This post" at the top of every subpage, in the same place on each: the
 * header's column, so it starts under the logo (at its right edge in Arabic). The page's own
 * name ends in an ellipsis rather than wrap (the <h1> below says it in full). Search engines
 * get the same trail as a BreadcrumbList.
 */
export function PageTrail({ trail }: { trail: Trail }) {
  const last = trail.items.length - 1;
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absoluteUrl(c.href) })),
  };
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <nav aria-label={trail.label} className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-5 sm:pt-6">
        <ol className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
          {trail.items.map((c, i) => i < last ? (
            <li key={c.href} className="flex shrink-0 items-center gap-1">
              <Link
                href={c.href}
                className={`inline-flex items-center justify-center rounded-md font-medium text-slate-600 dark:text-slate-300 hover:text-accent-700 dark:hover:text-accent-400 transition-colors ${focusRing}`}
              >
                {c.name}
              </Link>
              <IconChevronRight size={14} className="shrink-0 text-slate-400 dark:text-slate-500 rtl:rotate-180" />
            </li>
          ) : (
            <li key={c.href} className="min-w-0">
              <span aria-current="page" className="block truncate">{c.name}</span>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/**
 * `<main>` of every subpage: the breadcrumb trail, then the page, with the same space
 * above and below on each. SiteHeader / SiteFooter stay in the page.
 */
export function PageMain({ trail, children }: { trail: Trail; children: ReactNode }) {
  return (
    <main className="flex-1 w-full">
      <PageTrail trail={trail} />
      <div className="relative z-10 pt-6 pb-16 sm:pt-8 sm:pb-20">{children}</div>
    </main>
  );
}

/** PageMain with a centred reading column (guide, legal and landing pages). */
export function ContentShell({ trail, children, as: Tag = 'article' }: { trail: Trail; children: ReactNode; as?: 'article' | 'div' }) {
  return (
    <PageMain trail={trail}>
      <Tag className="mx-auto block w-full max-w-184 px-4 sm:px-6">{children}</Tag>
    </PageMain>
  );
}

/** Bare on mobile, a white sheet on the paper from `sm` up (inner measure is about 70ch). */
export function ContentSurface({ children }: { children: ReactNode }) {
  return (
    <div className="sm:rounded-xl sm:border sm:border-slate-200 sm:bg-white sm:px-10 sm:py-10 sm:shadow-card dark:sm:border-slate-800 dark:sm:bg-slate-900">
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, meta }: { title: ReactNode; subtitle?: ReactNode; meta?: ReactNode }) {
  return (
    <header className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
      <h1 className={pageTitle}>{title}</h1>
      {subtitle && <p className={pageLead}>{subtitle}</p>}
      {meta && <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{meta}</p>}
    </header>
  );
}

/** FAQ cards. Safe both inside and outside `.prose-article`. */
export function FaqList({ items, columns = 1 }: { items: { q: string; a: string }[]; columns?: 1 | 2 }) {
  return (
    <div className={columns === 2 ? 'grid gap-4 md:grid-cols-2' : 'grid gap-3'}>
      {items.map(({ q, a }) => (
        <div key={q} className={cardSurface}>
          <h3 className={`${cardTitle} text-slate-900 dark:text-slate-100`}>{q}</h3>
          <p className="mb-0! text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">{a}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * The closing call to action, the same box on every page: a red-tinted band with the card fan.
 * Render it outside `.prose-article` (prose would restyle the link).
 */
export function CtaBlock({ text, label, href }: { text: ReactNode; label: ReactNode; href: string }) {
  return (
    <section className={`mt-12 rounded-xl ${accentBand} px-4 py-8 sm:px-8 sm:py-10 text-center`}>
      <CardFan className="mb-5" />
      <p className="text-lg sm:text-xl font-semibold leading-snug tracking-[-0.01em] text-balance text-slate-900 dark:text-white mb-6">{text}</p>
      <Link
        href={href}
        // A label too long for a phone wraps into two even lines rather than leave one word behind.
        className={`btn-primary inline-flex max-w-full items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg text-base font-semibold text-white text-balance ${focusRing}`}
      >
        {label}
        <IconArrowRight size={18} className="shrink-0 rtl:rotate-180" />
      </Link>
    </section>
  );
}

/** "Keep reading" link list for the landing pages. */
export function RelatedLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h2 className="eyebrow mb-4">{title}</h2>
      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-base">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`group inline-flex items-start gap-2 rounded-md text-slate-800 dark:text-slate-100 hover:text-accent-700 dark:hover:text-accent-400 transition-colors ${focusRing}`}
            >
              <IconArrowRight size={16} className="mt-1 shrink-0 text-slate-400 group-hover:text-current dark:text-slate-500 rtl:rotate-180" />
              <span className="underline decoration-accent-500/60 underline-offset-[3px]">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Plain text with its e-mail addresses and https links made clickable. Trailing punctuation,
 * Latin, CJK or Arabic (。，；：）」』、،؛), never becomes part of a link.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/([\w.+-]+@[\w-]+(?:\.[\w-]+)+|https:\/\/[^\s)]+[^\s).,;:。，；：）」』、،؛])/g);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part;
        if (part.startsWith('https://')) return <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part.replace(/^https:\/\//, '')}</a>;
        return <a key={i} href={`mailto:${part}`}>{part}</a>;
      })}
    </>
  );
}

export type LegalContent = {
  title: string;
  updated: string;
  intro: string;
  sections: { title: string; content?: string; items?: string[] }[];
};

/** The body of a legal page (privacy, terms): sections of paragraphs and lists. */
export function LegalBody({ c }: { c: LegalContent }) {
  return (
    <div className="prose-article">
      <p><RichText text={c.intro} /></p>
      {c.sections.map((section, i) => (
        <section key={i}>
          <h2>{section.title}</h2>
          {section.content && <p><RichText text={section.content} /></p>}
          {section.items && (
            <ul>
              {section.items.map((item, j) => <li key={j}><RichText text={item} /></li>)}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
