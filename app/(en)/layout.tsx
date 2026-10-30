import type { Metadata, Viewport } from 'next';
import { ROOT_METADATA } from '@/lib/seo';
import { RootDocument, VIEWPORT } from '@/app/RootDocument';
import { PageTransition } from '@/app/PageTransition';

/*
 * Root layout of the English pages, which keep their unprefixed addresses (/, /guide,
 * /blog/…), and of the room, which has one address in every language and picks the
 * visitor's language in the browser. The other languages have their own root layout
 * in app/[lang] (route groups: two root layouts, one <html lang> each).
 */

export const metadata: Metadata = ROOT_METADATA;
export const viewport: Viewport = VIEWPORT;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootDocument locale="en">
      <PageTransition>{children}</PageTransition>
    </RootDocument>
  );
}
