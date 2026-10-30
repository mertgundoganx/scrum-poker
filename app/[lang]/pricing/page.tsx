import { PricingPage, pricingMetadata } from '@/app/pricing/PricingPage';
import { routeLocale, type LangParams } from '@/app/routeLocale';

export async function generateMetadata({ params }: LangParams) {
  return pricingMetadata(await routeLocale(params));
}

export default async function Page({ params }: LangParams) {
  return <PricingPage locale={await routeLocale(params)} />;
}
