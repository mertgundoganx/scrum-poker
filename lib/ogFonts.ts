// Fonts for the share images (app/opengraph-image/route.tsx, app/blog/opengraph-image.tsx).

const FONT_BASE = 'https://cdn.jsdelivr.net/npm/geist@1.5.1/dist/fonts/geist-sans';

/**
 * Geist Regular + Bold for the artwork. If the CDN is unreachable the image still renders
 * with the single regular face bundled in next/og.
 */
export async function loadFonts() {
  try {
    const [regular, bold] = await Promise.all(
      ['Geist-Regular.ttf', 'Geist-Bold.ttf'].map(async file => {
        const res = await fetch(`${FONT_BASE}/${file}`, { signal: AbortSignal.timeout(3000) });
        if (!res.ok) throw new Error(`font ${file}: ${res.status}`);
        return res.arrayBuffer();
      })
    );
    return [
      { name: 'Geist', data: regular, weight: 400 as const, style: 'normal' as const },
      { name: 'Geist', data: bold, weight: 700 as const, style: 'normal' as const },
    ];
  } catch {
    return undefined;
  }
}
