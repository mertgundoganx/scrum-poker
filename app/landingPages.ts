/**
 * The landing pages' addresses and dates, in one place: their structured data
 * (app/LandingPage.tsx) and the sitemap both read them. No server or browser imports.
 * Bump `modified` when a page's content meaningfully changes.
 */
export const LANDING_PAGES = {
  fibonacci: { path: '/fibonacci-planning-poker', published: '2026-09-20', modified: '2026-10-30' },
  tshirt: { path: '/t-shirt-sizing', published: '2026-09-20', modified: '2026-10-30' },
  cards: { path: '/planning-poker-cards', published: '2026-09-20', modified: '2026-10-30' },
} as const;
