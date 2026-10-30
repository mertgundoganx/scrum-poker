/**
 * Renders the small inline markup used by the landing page content files:
 * **bold**, `code` (card values) and [text](/path) (internal links, given by their
 * English address and pointed at the page's language).
 * No hooks and no directive, so it renders the same on the server and the client.
 */
import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import { inlineCode } from '@/app/ContentPage';
import { localizedPath } from '@/lib/localePath';
import type { Locale } from '@/lib/translations';

const TOKEN = /\*\*(.+?)\*\*|`(.+?)`|\[(.+?)\]\((\/[^)\s]*)\)/g;

export function parseInline(text: string, locale: Locale): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index;
    if (i > last) out.push(text.slice(last, i));
    if (m[1] !== undefined) out.push(<strong key={i}>{parseInline(m[1], locale)}</strong>);
    else if (m[2] !== undefined) out.push(<code key={i} className={inlineCode}>{m[2]}</code>);
    else out.push(<Link key={i} href={localizedPath(locale, m[4])}>{parseInline(m[3], locale)}</Link>);
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function InlineMarkup({ text, locale }: { text: string; locale: Locale }) {
  return <Fragment>{parseInline(text, locale)}</Fragment>;
}
