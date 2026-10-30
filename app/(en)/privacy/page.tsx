import { LegalPage, legalMetadata } from '@/app/LegalPage';

export async function generateMetadata() {
  return legalMetadata('privacy', 'en');
}

export default function Page() {
  return <LegalPage page="privacy" locale="en" />;
}
