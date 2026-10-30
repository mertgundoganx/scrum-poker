import { LegalPage, legalMetadata } from '@/app/LegalPage';
import { routeLocale, type LangParams } from '@/app/routeLocale';

export async function generateMetadata({ params }: LangParams) {
  return legalMetadata('privacy', await routeLocale(params));
}

export default async function Page({ params }: LangParams) {
  return <LegalPage page="privacy" locale={await routeLocale(params)} />;
}
