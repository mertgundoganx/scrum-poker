import type { Viewport } from 'next';
import { Geist, Geist_Mono, Noto_Sans_Arabic } from 'next/font/google';
import { chromeDictionary, getDictionary, homeDictionary } from '@/lib/dictionaries';
import { getMeta } from '@/lib/meta';
import { REGISTER_SERVICE_WORKER, SET_THEME } from '@/lib/inlineScripts';
import { localizedPath } from '@/lib/localePath';
import { SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/seo';
import { textDirection, type Locale } from '@/lib/translations';
import { InlineScript } from './InlineScript';
import { JsonLd } from './JsonLd';
import { LanguageProvider, MoreTranslations } from './LanguageProvider';
import { ThemeProvider } from './ThemeProvider';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
// Only room codes and a few numbers use it: loaded when needed, not preloaded on every page.
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], preload: false });
// Geist has no Arabic letters, and its local fallback (Arial) draws them small. Noto Sans
// Arabic is drawn to sit with Noto Sans, whose x-height is close to Geist's (no size-adjust
// needed, which next/font/google has no option for anyway). Not preloaded: the
// browser fetches it only when there is Arabic text to draw with it (globals.css applies it
// to Arabic pages, and to the room switched to Arabic).
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], display: 'swap', preload: false, adjustFontFallback: false });

/** Arabic pages' font stack: Geist for Latin letters, then Noto Sans Arabic, then Geist's fallback. */
const ARABIC_STACK = (() => {
  const [geist, ...fallbacks] = geistSans.style.fontFamily.split(',').map(f => f.trim());
  return [geist, notoArabic.style.fontFamily, ...fallbacks].join(', ');
})();
const FONT_VARS = { '--font-sans-ar': ARABIC_STACK } as React.CSSProperties;

export const VIEWPORT: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBFAF7' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1C21' },
  ],
};

/** The site as a whole, in the page's language: on every page. */
function siteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    // The home page in the same language as inLanguage.
    url: absoluteUrl(localizedPath(locale, '/')),
    inLanguage: locale,
  };
}

/** The app and who runs it, in the page's language: on the home pages (HomeScope). */
function appJsonLd(locale: Locale) {
  const t = getDictionary(locale);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE_NAME,
      // Names, the same in every language (a description goes in description).
      alternateName: ['Planning Poker Online', 'Scrum Poker'],
      description: getMeta(locale).pages.home.description,
      url: absoluteUrl(localizedPath(locale, '/')),
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Project Management',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      // The pricing page's feature list: it names every feature once (the home page's
      // feature titles say the same things in other words).
      featureList: [
        t.pricingProFeature1, t.pricingProFeature2, t.pricingFreeFeature3, t.pricingProFeature3,
        t.pricingProFeature4, t.pricingProFeature5, t.pricingFreeFeature4, t.homeFeatSpectatorTitle,
      ],
      inLanguage: locale,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icons/icon-512.png`,
      email: 'contact@scrumpokerplay.com',
      sameAs: ['https://github.com/mertgundoganx/scrum-poker'],
    },
  ];
}

/**
 * Around the home page (both root layouts' page files): the text its form and sections
 * read in the browser, on top of the root layout's, and the app's structured data.
 */
export function HomeScope({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={appJsonLd(locale)} />
      <MoreTranslations locale={locale} t={homeDictionary(locale)}>{children}</MoreTranslations>
    </>
  );
}

/**
 * The <html> document of both root layouts (English at /…, the other languages at
 * /<code>/…) and the 404 page: language and direction are set on the server, and the
 * interface text every page's client components read goes to LanguageProvider, so nothing
 * has to switch after hydration (lib/dictionaries.ts: the rest stays on the server).
 */
export function RootDocument({ locale, children, structuredData = true }: {
  locale: Locale;
  children: React.ReactNode;
  /** Off for pages search engines should not index (404). */
  structuredData?: boolean;
}) {
  return (
    <html
      lang={locale}
      dir={textDirection(locale)}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={FONT_VARS}
      suppressHydrationWarning
    >
      <head>
        {/* Set the theme before paint to avoid a flash */}
        <InlineScript html={SET_THEME} />
        {structuredData && <JsonLd data={siteJsonLd(locale)} />}
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LanguageProvider locale={locale} t={chromeDictionary(locale)}>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <InlineScript html={REGISTER_SERVICE_WORKER} />
      </body>
    </html>
  );
}
