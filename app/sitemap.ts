import type { MetadataRoute } from 'next';
import { LANDING_PAGES } from '@/app/landingPages';
import { BLOG_POSTS, GUIDE_ENTRY } from '@/lib/blogPosts';
import { localizedPath } from '@/lib/localePath';
import { absoluteUrl, languageAlternates } from '@/lib/seo';
import { LOCALES } from '@/lib/translations';

// Bump when page content meaningfully changes
const SITE_UPDATED = new Date('2026-10-30');
const BLOG_INDEX_UPDATED = new Date(
  BLOG_POSTS.reduce((latest, post) => (post.updated > latest ? post.updated : latest), '1970-01-01'),
);
const GUIDE_UPDATED = new Date(GUIDE_ENTRY.updated);

type Entry = Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'> & { path: string };

const PAGES: Entry[] = [
  { path: '/',        lastModified: SITE_UPDATED,       changeFrequency: 'weekly',  priority: 1 },
  { path: '/guide',   lastModified: GUIDE_UPDATED,      changeFrequency: 'monthly', priority: 0.8 },
  { path: '/blog',    lastModified: BLOG_INDEX_UPDATED, changeFrequency: 'weekly',  priority: 0.8 },
  { path: '/pricing', lastModified: SITE_UPDATED,       changeFrequency: 'monthly', priority: 0.7 },
  { path: '/demo',    lastModified: SITE_UPDATED,       changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy', lastModified: SITE_UPDATED,       changeFrequency: 'yearly',  priority: 0.3 },
  { path: '/terms',   lastModified: SITE_UPDATED,       changeFrequency: 'yearly',  priority: 0.3 },
  ...Object.values(LANDING_PAGES).map(({ path, modified }) => ({
    path,
    lastModified: new Date(modified),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })),
  ...BLOG_POSTS.map(post => ({
    path: post.href,
    lastModified: new Date(post.updated),
    changeFrequency: 'monthly' as const,
    priority: post.priority ?? 0.7,
  })),
];

/** Every page in every language, each listing the others (and x-default) as alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, ...entry }) => {
    const languages = languageAlternates(path, absoluteUrl);
    return LOCALES.map(locale => ({
      url: absoluteUrl(localizedPath(locale, path)),
      ...entry,
      alternates: { languages },
    }));
  });
}
