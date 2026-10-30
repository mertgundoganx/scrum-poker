import { DemoPage, demoMetadata } from '@/app/demo/DemoPage';
import { routeLocale, type LangParams } from '@/app/routeLocale';

export async function generateMetadata({ params }: LangParams) {
  return demoMetadata(await routeLocale(params));
}

export default async function Page({ params }: LangParams) {
  return <DemoPage locale={await routeLocale(params)} />;
}
