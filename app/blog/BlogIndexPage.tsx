import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/app/SiteHeader';
import { SiteFooter } from '@/app/SiteFooter';
import { IconArrowRight, IconTimer } from '@/app/icons';
import { BLOG_INDEX, BLOG_POSTS, postText } from '@/lib/blogPosts';
import { getDictionary } from '@/lib/dictionaries';
import { fill } from '@/lib/i18n';
import { localizedPath } from '@/lib/localePath';
import { getMeta } from '@/lib/meta';
import { JsonLd } from '@/app/JsonLd';
import { CtaBlock, PageMain, pageLead, pageTitle, pageTrail } from '@/app/ContentPage';
import { linkCard } from '@/app/surfaces';
import { LOGO_URL, SITE_NAME, SITE_URL, absoluteUrl, pageMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/translations';
import { formatDate } from './formatDate';

export function blogIndexMetadata(locale: Locale): Metadata {
  return pageMetadata({ locale, path: '/blog', ...getMeta(locale).pages.blog, image: 'blog' });
}

/** /blog: every article and the guide, rendered on the server in the page's language. */
export function BlogIndexPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const home = localizedPath(locale, '/');
  const blog = localizedPath(locale, '/blog');
  const url = absoluteUrl(blog);
  const { title, description } = getMeta(locale).pages.blog;
  const trail = pageTrail(t, locale, { name: t.navBlog, href: blog });
  // The BreadcrumbList comes with the visible trail (PageTrail).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': url,
    url,
    name: title,
    description,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    // The articles only: the guide is listed on the page but isn't a post.
    blogPost: BLOG_POSTS.map(post => ({
      '@type': 'BlogPosting',
      headline: postText(post, locale).title,
      url: absoluteUrl(localizedPath(locale, post.href)),
      datePublished: post.published,
      dateModified: post.updated,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader />
      <PageMain trail={trail}>
        <div className="mx-auto w-full max-w-6xl px-4">
          <header className="max-w-2xl">
            <h1 className={pageTitle}>{t.blogPageTitle}</h1>
            <p className={pageLead}>{t.blogPageSubtitle}</p>
          </header>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
            {BLOG_INDEX.map(post => {
              const text = postText(post, locale);
              return (
                <li key={post.href} className="flex">
                  <Link
                    href={localizedPath(locale, post.href)}
                    className={`group flex w-full flex-col p-5 sm:p-6 ${linkCard}`}
                  >
                    <h2 className="text-lg font-semibold leading-snug tracking-[-0.01em] text-balance text-slate-900 transition-colors group-hover:text-accent-700 dark:text-white dark:group-hover:text-accent-400">
                      {text.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
                      {text.description}
                    </p>
                    <p className="mt-auto flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <IconTimer size={14} />
                        {fill(t.blogReadTime, { n: text.minutes })}
                      </span>
                      <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                      <time dateTime={post.published}>{formatDate(post.published, locale)}</time>
                      <IconArrowRight
                        size={18}
                        className="ms-auto shrink-0 rtl:rotate-180 text-slate-400 transition-colors group-hover:text-accent-600 dark:text-slate-500 dark:group-hover:text-accent-400"
                      />
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>

          <CtaBlock text={t.blogCtaText} label={t.blogPageCta} href={home} />
        </div>
      </PageMain>
      <SiteFooter />
    </>
  );
}
