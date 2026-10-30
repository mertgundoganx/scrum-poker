import { LandingPage, landingMetadata } from '@/app/LandingPage';
import { routeLocale, type LangParams } from '@/app/routeLocale';

export async function generateMetadata({ params }: LangParams) {
  return landingMetadata('fibonacci', await routeLocale(params));
}

export default async function Page({ params }: LangParams) {
  return <LandingPage page="fibonacci" locale={await routeLocale(params)} />;
}
