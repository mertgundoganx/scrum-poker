import { LandingPage, landingMetadata } from '@/app/LandingPage';

export async function generateMetadata() {
  return landingMetadata('cards', 'en');
}

export default function Page() {
  return <LandingPage page="cards" locale="en" />;
}
