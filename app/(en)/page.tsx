import { HomePage, homeMetadata } from '@/app/HomePage';
import { HomeScope } from '@/app/RootDocument';

export async function generateMetadata() {
  return homeMetadata('en');
}

export default function Page() {
  return <HomeScope locale="en"><HomePage locale="en" /></HomeScope>;
}
