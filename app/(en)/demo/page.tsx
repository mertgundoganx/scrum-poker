import { DemoPage, demoMetadata } from '@/app/demo/DemoPage';

export async function generateMetadata() {
  return demoMetadata('en');
}

export default function Page() {
  return <DemoPage locale="en" />;
}
