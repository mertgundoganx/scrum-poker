import { BlogIndexPage, blogIndexMetadata } from '@/app/blog/BlogIndexPage';

export async function generateMetadata() {
  return blogIndexMetadata('en');
}

export default function Page() {
  return <BlogIndexPage locale="en" />;
}
