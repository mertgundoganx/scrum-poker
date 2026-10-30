import { LandingPage, landingMetadata } from '@/app/LandingPage';
import { routeLocale, type LangParams } from '@/app/routeLocale';

export async function generateMetadata({ params }: LangParams) {
  return landingMetadata('tshirt', await routeLocale(params));
}

export default async function Page({ params }: LangParams) {
  return <LandingPage page="tshirt" locale={await routeLocale(params)} />;
}
