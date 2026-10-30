/**
 * Content of the landing pages (/fibonacci-planning-poker, /t-shirt-sizing, /planning-poker-cards),
 * one file per page and language: app/<page>/content/<language>.ts.
 *
 * Text fields marked "markup" may use three inline forms (see app/InlineMarkup.tsx):
 * **bold**, `card values` and [link text](/path).
 */

export type LandingBlock =
  /** A paragraph (markup). */
  | { p: string }
  /** A bulleted list (markup items). */
  | { ul: string[] }
  /** A numbered list (markup items). */
  | { ol: string[] }
  /** A worked example in a card (markup). */
  | { example: string }
  /** Size chips with a description each (t-shirt sizes). */
  | { sizes: { size: string; desc: string }[] }
  /** Deck cards: name, card values and a description (markup). */
  | { decks: { title: string; cards: string; desc: string }[] }
  /** Two side-by-side cards, each with a bulleted list. */
  | { compare: { title: string; items: string[] }[] };

export interface LandingSection {
  /** No title: the page's opening paragraph(s). */
  title?: string;
  blocks: LandingBlock[];
}

export interface LandingContent {
  /** Current page in the breadcrumb. */
  breadcrumb: string;
  title: string;
  subtitle: string;
  sections: LandingSection[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaText: string;
  ctaLabel: string;
  relatedTitle: string;
  related: { href: string; label: string }[];
}
