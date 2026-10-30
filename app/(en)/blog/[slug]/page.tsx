import { notFound } from 'next/navigation';
import BlogArticle, { articleMetadata } from '@/app/blog/BlogArticle';
import { BLOG_SLUGS, isBlogSlug, type BlogSlug } from '@/lib/localePath';

interface Props {
  params: Promise<{ slug: string }>;
}

// Every article is built ahead of time; any other slug is a 404.
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
  return articleMetadata(await articleSlug(params), 'en');
}

export default async function Page({ params }: Props) {
  return <BlogArticle slug={await articleSlug(params)} locale="en" />;
}
