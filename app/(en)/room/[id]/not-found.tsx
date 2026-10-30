import { RoomNotFound } from './RoomNotFound';

// page.tsx calls notFound() for a code that isn't a room: status 404, and Next.js adds noindex.
export default function RoomNotFoundPage() {
  return <RoomNotFound />;
}
