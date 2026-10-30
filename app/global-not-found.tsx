import type { Metadata, Viewport } from 'next';
import { getMeta } from '@/lib/meta';
import { SITE_NAME, SITE_URL } from '@/lib/seo';
import { NotFoundView } from './NotFoundView';
import { RootDocument, VIEWPORT } from './RootDocument';

/*
 * The 404 page for any address that isn't a page: two root layouts leave no single
 * layout to build it from (see the global-not-found docs). It answers with status 404,
 * and Next.js adds noindex. The text follows the visitor's language in the browser: the
 * /<code> prefix of the missing address, else their saved or browser language.
 */

export const metadata: Metadata = {
  title: `${getMeta('en').notFound} | ${SITE_NAME}`,
  metadataBase: new URL(SITE_URL),
};
export const viewport: Viewport = VIEWPORT;

export default function GlobalNotFound() {
  return (
    <RootDocument locale="en" structuredData={false}>
      <NotFoundView />
    </RootDocument>
  );
}
