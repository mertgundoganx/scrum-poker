import { LandingPage, landingMetadata } from '@/app/LandingPage';
import { routeLocale, type LangParams } from '@/app/routeLocale';

export async function generateMetadata({ params }: LangParams) {
  return landingMetadata('cards', await routeLocale(params));
}

export default async function Page({ params }: LangParams) {
  return <LandingPage page="cards" locale={await routeLocale(params)} />;
}
