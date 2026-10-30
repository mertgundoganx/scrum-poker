import type { BlogSlug } from '@/lib/localePath';
import type { ContentLoaders } from '@/lib/content';
import type { Localized, RelatedPost } from './articleTypes';

/**
 * Every blog article: its text per language (app/blog/<slug>/<code>.ts, read on the server),
 * related posts and dates. Titles and descriptions for the index live in lib/blogPosts.ts,
 * the <title>s in lib/meta.
 */
export interface Article {
  content: ContentLoaders<Localized>;
  related: RelatedPost[];
  /** 'YYYY-MM-DD' */
  published: string;
  /** 'YYYY-MM-DD' */
  updated?: string;
}

export const ARTICLES: Record<BlogSlug, Article> = {
  'agile-velocity': {
    content: {
      en: () => import('./agile-velocity/en'),
      tr: () => import('./agile-velocity/tr'),
      de: () => import('./agile-velocity/de'),
      fr: () => import('./agile-velocity/fr'),
      it: () => import('./agile-velocity/it'),
      ar: () => import('./agile-velocity/ar'),
      zh: () => import('./agile-velocity/zh'),
    },
    related: [
      { href: '/blog/story-points-vs-hours' },
      { href: '/blog/sprint-planning-checklist' },
      { href: '/blog/fibonacci-vs-tshirt' },
      { href: '/fibonacci-planning-poker' },
    ],
    published: '2026-07-05',
    updated: '2026-10-18',
  },
  'estimation-consensus': {
    content: {
      en: () => import('./estimation-consensus/en'),
      tr: () => import('./estimation-consensus/tr'),
      de: () => import('./estimation-consensus/de'),
      fr: () => import('./estimation-consensus/fr'),
      it: () => import('./estimation-consensus/it'),
      ar: () => import('./estimation-consensus/ar'),
      zh: () => import('./estimation-consensus/zh'),
    },
    related: [
      { href: '/blog/fibonacci-vs-tshirt' },
      { href: '/blog/scrum-poker-best-practices' },
      { href: '/blog/what-is-planning-poker' },
      { href: '/fibonacci-planning-poker' },
    ],
    published: '2026-07-05',
    updated: '2026-10-18',
  },
  'fibonacci-vs-tshirt': {
    content: {
      en: () => import('./fibonacci-vs-tshirt/en'),
      tr: () => import('./fibonacci-vs-tshirt/tr'),
      de: () => import('./fibonacci-vs-tshirt/de'),
      fr: () => import('./fibonacci-vs-tshirt/fr'),
      it: () => import('./fibonacci-vs-tshirt/it'),
      ar: () => import('./fibonacci-vs-tshirt/ar'),
      zh: () => import('./fibonacci-vs-tshirt/zh'),
    },
    related: [
      { href: '/blog/estimation-consensus' },
      { href: '/blog/agile-velocity' },
      { href: '/blog/what-is-planning-poker' },
      { href: '/fibonacci-planning-poker' },
      { href: '/t-shirt-sizing' },
    ],
    published: '2026-07-05',
    updated: '2026-10-18',
  },
  'free-scrum-poker-tools': {
    content: {
      en: () => import('./free-scrum-poker-tools/en'),
      tr: () => import('./free-scrum-poker-tools/tr'),
      de: () => import('./free-scrum-poker-tools/de'),
      fr: () => import('./free-scrum-poker-tools/fr'),
      it: () => import('./free-scrum-poker-tools/it'),
      ar: () => import('./free-scrum-poker-tools/ar'),
      zh: () => import('./free-scrum-poker-tools/zh'),
    },
    related: [
      { href: '/blog/what-is-planning-poker' },
      { href: '/blog/fibonacci-vs-tshirt' },
      { href: '/blog/scrum-poker-best-practices' },
      { href: '/planning-poker-cards' },
    ],
    published: '2026-07-05',
    updated: '2026-10-18',
  },
  'remote-sprint-planning': {
    content: {
      en: () => import('./remote-sprint-planning/en'),
      tr: () => import('./remote-sprint-planning/tr'),
      de: () => import('./remote-sprint-planning/de'),
      fr: () => import('./remote-sprint-planning/fr'),
      it: () => import('./remote-sprint-planning/it'),
      ar: () => import('./remote-sprint-planning/ar'),
      zh: () => import('./remote-sprint-planning/zh'),
    },
    related: [
      { href: '/blog/scrum-poker-best-practices' },
      { href: '/blog/sprint-planning-checklist' },
      { href: '/blog/estimation-consensus' },
      { href: '/blog/free-scrum-poker-tools' },
    ],
    published: '2026-07-05',
    updated: '2026-10-18',
  },
  'scrum-poker-best-practices': {
    content: {
      en: () => import('./scrum-poker-best-practices/en'),
      tr: () => import('./scrum-poker-best-practices/tr'),
      de: () => import('./scrum-poker-best-practices/de'),
      fr: () => import('./scrum-poker-best-practices/fr'),
      it: () => import('./scrum-poker-best-practices/it'),
      ar: () => import('./scrum-poker-best-practices/ar'),
      zh: () => import('./scrum-poker-best-practices/zh'),
    },
    related: [
      { href: '/blog/what-is-planning-poker' },
      { href: '/blog/estimation-consensus' },
      { href: '/blog/remote-sprint-planning' },
      { href: '/blog/free-scrum-poker-tools' },
    ],
    published: '2026-07-05',
    updated: '2026-10-18',
  },
  'sprint-planning-checklist': {
    content: {
      en: () => import('./sprint-planning-checklist/en'),
      tr: () => import('./sprint-planning-checklist/tr'),
      de: () => import('./sprint-planning-checklist/de'),
      fr: () => import('./sprint-planning-checklist/fr'),
      it: () => import('./sprint-planning-checklist/it'),
      ar: () => import('./sprint-planning-checklist/ar'),
      zh: () => import('./sprint-planning-checklist/zh'),
    },
    related: [
      { href: '/blog/agile-velocity' },
      { href: '/blog/estimation-consensus' },
      { href: '/blog/remote-sprint-planning' },
    ],
    published: '2026-07-05',
    updated: '2026-10-18',
  },
  'story-points-vs-hours': {
    content: {
      en: () => import('./story-points-vs-hours/en'),
      tr: () => import('./story-points-vs-hours/tr'),
      de: () => import('./story-points-vs-hours/de'),
      fr: () => import('./story-points-vs-hours/fr'),
      it: () => import('./story-points-vs-hours/it'),
      ar: () => import('./story-points-vs-hours/ar'),
      zh: () => import('./story-points-vs-hours/zh'),
    },
    related: [
      { href: '/blog/agile-velocity' },
      { href: '/blog/sprint-planning-checklist' },
      { href: '/blog/fibonacci-vs-tshirt' },
      { href: '/fibonacci-planning-poker' },
    ],
    published: '2026-07-05',
    updated: '2026-09-20',
  },
  'what-is-planning-poker': {
    content: {
      en: () => import('./what-is-planning-poker/en'),
      tr: () => import('./what-is-planning-poker/tr'),
      de: () => import('./what-is-planning-poker/de'),
      fr: () => import('./what-is-planning-poker/fr'),
      it: () => import('./what-is-planning-poker/it'),
      ar: () => import('./what-is-planning-poker/ar'),
      zh: () => import('./what-is-planning-poker/zh'),
    },
    related: [
      { href: '/blog/fibonacci-vs-tshirt' },
      { href: '/blog/scrum-poker-best-practices' },
      { href: '/blog/estimation-consensus' },
      { href: '/planning-poker-cards' },
      { href: '/blog/free-scrum-poker-tools' },
    ],
    published: '2026-07-05',
    updated: '2026-10-18',
  },
};
