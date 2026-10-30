import { GuidePage, guideMetadata } from '@/app/guide/GuidePage';
import { routeLocale, type LangParams } from '@/app/routeLocale';

export async function generateMetadata({ params }: LangParams) {
  return guideMetadata(await routeLocale(params));
}

export default async function Page({ params }: LangParams) {
  return <GuidePage locale={await routeLocale(params)} />;
}
