import { PricingPage, pricingMetadata } from '@/app/pricing/PricingPage';

export async function generateMetadata() {
  return pricingMetadata('en');
}

export default function Page() {
  return <PricingPage locale="en" />;
}
