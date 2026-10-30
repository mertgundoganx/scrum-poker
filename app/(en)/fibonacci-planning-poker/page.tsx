import { LandingPage, landingMetadata } from '@/app/LandingPage';

export async function generateMetadata() {
  return landingMetadata('fibonacci', 'en');
}

export default function Page() {
  return <LandingPage page="fibonacci" locale="en" />;
}
