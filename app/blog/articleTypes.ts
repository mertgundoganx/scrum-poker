/** Shapes of a blog article's content (app/blog/<slug>/<language>.ts). */

export interface Section {
  title: string;
  content: string;
  paragraphs?: string[];
  items?: string[];
}

export interface Faq {
  q: string;
  a: string;
}

export interface Localized {
  title: string;
  subtitle: string;
  sections: Section[];
  faq?: Faq[];
}

/**
 * Another post, the guide or a landing page; its title comes from lib/blogPosts.ts (posts, guide)
 * or the home page's link text (landing pages), in the visitor's language.
 */
export interface RelatedPost {
  href: string;
}
