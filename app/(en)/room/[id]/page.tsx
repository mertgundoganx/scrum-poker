import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { roomSummary } from '@/lib/keptRooms';
import { noteRoomMiss, rateLimit, roomLookupBlocked } from '@/lib/rateLimit';
import { roomCode } from '@/lib/roomRequest';
import { getClientIp } from '@/lib/clientIp';
import { roomDictionary } from '@/lib/dictionaries';
import { MoreTranslations } from '@/app/LanguageProvider';
import { InlineScript } from '@/app/InlineScript';
import { TAKE_OWNER_KEY } from '@/lib/inlineScripts';
import RoomClient from './RoomClient';

// The room's Content-Security-Policy comes from proxy.ts: a fresh nonce per request,
// which Next.js puts on its own scripts (this page renders per request), and the
// hashes of our inline scripts (lib/inlineScripts.ts).

export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await props.params;
  // A blocked address learns nothing from the title either.
  const code = roomLookupBlocked(getClientIp(await headers())) ? null : roomCode(id);
  const room = code && await roomSummary(code);
  // Rooms are private and short-lived: noindex, and no canonical or language alternates
  // (a room has one address in every language).
  if (!room) return { title: 'Room Not Found', robots: { index: false, follow: false }, alternates: null };
  return {
    title: `${room.name} — Room ${room.id}`,
    description: `Join the scrum poker room "${room.name}". Room code: ${room.id}. Estimate user stories in real time with your team.`,
    robots: { index: false, follow: false },
    alternates: null,
  };
}

export default async function RoomPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const ip = getClientIp(await headers());
  // Codes are found only by trying: as slow here as the room API (past the
  // limit, or after too many unknown codes, every code looks unknown).
  const rl = await rateLimit(`roomPage:${ip}`, 120, 60_000);
  if (!rl.allowed || roomLookupBlocked(ip)) notFound();
  const code = roomCode(id);
  const room = code && await roomSummary(code);
  // An unknown or expired code answers 404 (./not-found.tsx shows which code it was).
  if (!room) {
    if (code) noteRoomMiss(ip, code);
    notFound();
  }
  return (
    <>
      <InlineScript html={TAKE_OWNER_KEY} />
      {/* The room reads most of the dictionary; the root layout sends only the chrome's.
          Another language picked in the room loads that one complete. */}
      <MoreTranslations locale="en" t={roomDictionary('en')}>
        <RoomClient roomId={room.id} roomName={room.name} />
      </MoreTranslations>
    </>
  );
}
