import { BlogIndexPage, blogIndexMetadata } from '@/app/blog/BlogIndexPage';
import { routeLocale, type LangParams } from '@/app/routeLocale';

export async function generateMetadata({ params }: LangParams) {
  return blogIndexMetadata(await routeLocale(params));
}

export default async function Page({ params }: LangParams) {
  return <BlogIndexPage locale={await routeLocale(params)} />;
}
