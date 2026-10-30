import { GuidePage, guideMetadata } from '@/app/guide/GuidePage';

export async function generateMetadata() {
  return guideMetadata('en');
}

export default function Page() {
  return <GuidePage locale="en" />;
}
