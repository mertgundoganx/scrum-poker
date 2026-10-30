import type { Metadata } from 'next';
import { SiteHeader } from '@/app/SiteHeader';
import { SiteFooter } from '@/app/SiteFooter';
import { JsonLd } from '@/app/JsonLd';
import { pageTrail } from '@/app/ContentPage';
import { BLOG_POSTS, postText } from '@/lib/blogPosts';
import { loadContent } from '@/lib/content';
import { getDictionary } from '@/lib/dictionaries';
import { localizedPath, type BlogSlug } from '@/lib/localePath';
import { getMeta } from '@/lib/meta';
import { BLOG_IMAGE_URL, LOGO_URL, SITE_NAME, SITE_URL, absoluteUrl, pageMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/translations';
import ArticleView from './ArticleView';
import { articleWordCount } from './articleFormat';
import { ARTICLES } from './articles';

function listing(slug: BlogSlug) {
  return BLOG_POSTS.find(post => post.slug === slug);
}

export async function articleMetadata(slug: BlogSlug, locale: Locale): Promise<Metadata> {
  const data = await loadContent(ARTICLES[slug].content, locale);
  const meta = getMeta(locale).articles[slug];
  const post = listing(slug);
  const { published, updated } = ARTICLES[slug];
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: meta.title,
    description: meta.description ?? (post ? postText(post, locale).description : data.subtitle),
    keywords: meta.keywords,
    ogTitle: data.title,
    type: 'article',
    image: 'blog',
    published,
    modified: updated,
  });
}

/** A blog article (/blog/<slug>), rendered on the server in the page's language. */
export default async function BlogArticle({ slug, locale }: { slug: BlogSlug; locale: Locale }) {
  const article = ARTICLES[slug];
  const [data, en] = await Promise.all([
    loadContent(article.content, locale),
    loadContent(article.content, 'en'),
  ]);
  const { published, updated, related } = article;
  const path = localizedPath(locale, `/blog/${slug}`);
  const url = absoluteUrl(path);
  const t = getDictionary(locale);

  const trail = pageTrail(t, locale, { name: t.navBlog, href: localizedPath(locale, '/blog') }, { name: data.title, href: path });

  // The BreadcrumbList comes with the visible trail (PageTrail).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.title,
    description: data.subtitle,
    inLanguage: locale,
    datePublished: published,
    dateModified: updated ?? published,
    image: `${SITE_URL}${BLOG_IMAGE_URL}`,
    wordCount: articleWordCount(data, locale),
    url,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <ArticleView
        data={data}
        locale={locale}
        t={t}
        enSectionTitles={en.sections.map(s => s.title)}
        listedMinutes={listing(slug)?.text[locale]?.minutes}
        related={related}
        published={published}
        updated={updated}
        trail={trail}
      />
      <SiteFooter />
    </>
  );
}
