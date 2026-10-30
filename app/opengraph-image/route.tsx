import { ImageResponse } from 'next/og';
import { loadFonts } from '@/lib/ogFonts';

// The site's share image at /opengraph-image, rendered once at build time. A
// route, not the opengraph-image.tsx file convention: that one would sit above
// both root layouts (app/(en), app/[lang]) and resolve its address without
// their metadataBase. Pages name it in their Open Graph data (lib/seo.ts).
export const dynamic = 'force-static';

const size = { width: 1200, height: 630 };

// Bright paper (app/globals.css): ink for text, the card-suit red only in the mark.
const PAPER = '#FBFAF7';
const INK = '#23262D';
const GREY = '#5A5750';
const RULE = '#E8E5DF';
const DOT = '#A9A49B';

/** The mark (app/Logo.tsx) at a large size: hairline edge, the card back's frame. */
function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-15 14.5 27.5)">
        <rect x="7" y="3.5" width="15" height="21" rx="2.6" fill="#BF3830" />
        <rect x="8.7" y="5.2" width="11.6" height="17.6" rx="1.4" fill="none" stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="0.45" />
      </g>
      <g transform="rotate(7 14.5 27.5)">
        <rect x="8" y="3" width="15" height="21" rx="2.6" fill="#FFFFFF" stroke={INK} strokeWidth="0.8" />
        <path d="M15.5 7.9Q16.4 12.27 19.6 13.5Q16.4 14.73 15.5 19.1Q14.6 14.73 11.4 13.5Q14.6 12.27 15.5 7.9Z" fill="#D6453D" />
      </g>
    </svg>
  );
}

const POINTS = ['Real-time', 'No sign-up', '100% free'];

export async function GET() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '64px 72px 60px 80px',
          background: PAPER,
          color: INK,
          fontFamily: 'Geist, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 720 }}>
          {/* Wordmark */}
          <div style={{ display: 'flex', fontSize: 34, letterSpacing: -0.7 }}>
            <span style={{ fontWeight: 700 }}>Scrum</span>
            <span style={{ fontWeight: 400, marginLeft: 9 }}>Poker</span>
          </div>

          {/* Headline + what it is */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <div style={{ display: 'flex', fontSize: 66, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2.4 }}>
              Free Online Planning Poker for Agile Teams
            </div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 28, color: GREY }}>
              {POINTS.map((point, i) => (
                <div key={point} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && <div style={{ width: 6, height: 6, borderRadius: 6, background: DOT, margin: '0 18px' }} />}
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', paddingTop: 22, borderTop: `1px solid ${RULE}`, fontSize: 24, color: GREY }}>
            scrumpokerplay.com
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 310 }}>
          <Mark size={310} />
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
