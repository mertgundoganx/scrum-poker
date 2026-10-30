import { LegalPage, legalMetadata } from '@/app/LegalPage';

export async function generateMetadata() {
  return legalMetadata('terms', 'en');
}

export default function Page() {
  return <LegalPage page="terms" locale="en" />;
}
