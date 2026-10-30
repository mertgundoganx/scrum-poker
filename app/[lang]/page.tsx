import { HomePage, homeMetadata } from '@/app/HomePage';
import { HomeScope } from '@/app/RootDocument';
import { routeLocale, type LangParams } from '@/app/routeLocale';

export async function generateMetadata({ params }: LangParams) {
  return homeMetadata(await routeLocale(params));
}

export default async function Page({ params }: LangParams) {
  const locale = await routeLocale(params);
  return <HomeScope locale={locale}><HomePage locale={locale} /></HomeScope>;
}
