import type { BlogSlug } from '@/lib/localePath';

/**
 * Search-engine text per language (lib/meta/<code>.ts): the <title> and meta description
 * of every page. Server-only, so none of it ships to the browser.
 *
 * - `title` gets " | Scrum Poker Online" appended (except the home page's, which is used
 *   as is): keep it to about 38 characters, so the whole title stays within ~60.
 * - `description`: about 160 characters at most.
 */
export interface PageMeta {
  title: string;
  description: string;
  /** English only: other languages leave them out. */
  keywords?: string[];
}

export type MetaPage =
  | 'home' | 'guide' | 'blog' | 'pricing' | 'demo' | 'privacy' | 'terms'
  | 'fibonacci' | 'tshirt' | 'cards';

export interface SiteMeta {
  pages: Record<MetaPage, PageMeta>;
  /** Blog articles; without a description the blog index's (lib/blogPosts.ts) is used. */
  articles: Record<BlogSlug, Omit<PageMeta, 'description'> & { description?: string }>;
  /** The 404 page's title. */
  notFound: string;
  /** Alt text of the Open Graph images: the site's (most pages) and the blog's. */
  imageAlt: { site: string; blog: string };
}
