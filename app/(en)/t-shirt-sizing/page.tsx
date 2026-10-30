import { LandingPage, landingMetadata } from '@/app/LandingPage';

export async function generateMetadata() {
  return landingMetadata('tshirt', 'en');
}

export default function Page() {
  return <LandingPage page="tshirt" locale="en" />;
}
