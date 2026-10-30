import { notFound } from 'next/navigation';
import BlogArticle, { articleMetadata } from '@/app/blog/BlogArticle';
import { BLOG_SLUGS, isBlogSlug, type BlogSlug } from '@/lib/localePath';
import { routeLocale } from '@/app/routeLocale';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

// Every article is built ahead of time, in every language (the layout lists the languages).
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_SLUGS.map(slug => ({ slug }));
}

async function articleSlug(params: Props['params']): Promise<BlogSlug> {
  const { slug } = await params;
  if (!isBlogSlug(slug)) notFound();
  return slug;
}

export async function generateMetadata({ params }: Props) {
  return articleMetadata(await articleSlug(params), await routeLocale(params));
}

export default async function Page({ params }: Props) {
  return <BlogArticle slug={await articleSlug(params)} locale={await routeLocale(params)} />;
}
