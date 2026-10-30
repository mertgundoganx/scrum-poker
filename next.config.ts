import type { NextConfig } from "next";

// The policy of every page but the room, whose stricter one (a nonce instead of
// 'unsafe-inline') comes from proxy.ts; the other directives are the same there,
// keep the two in step. These pages are built once, so they can't carry a nonce,
// and they show nothing visitors typed.
// 'unsafe-eval' is only needed for HMR in development.
// static.cloudflareinsights.com hosts the Cloudflare Web Analytics beacon,
// which Cloudflare auto-injects at the edge.
const scriptSrc = process.env.NODE_ENV === 'development'
  ? "'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com"
  : "'self' 'unsafe-inline' https://static.cloudflareinsights.com";

const csp = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://cloudflareinsights.com",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  { key: "X-Content-Type-Options",    value: "nosniff" },
  { key: "X-Frame-Options",           value: "DENY" },
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // Pages we open (or that open us) get no handle on this window.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  poweredByHeader: false,
  // No next/image anywhere: nothing to optimize, and sharp stays out of the image.
  images: { unoptimized: true },
  experimental: {
    // proxy.ts buffers request bodies; it refuses larger ones by Content-Length,
    // and this caps what a body without one can make it hold.
    proxyClientMaxBodySize: '128kb',
    // Most visitors arrive once, from search: styles in the HTML render the first
    // page a round trip sooner (about 18 KB gzipped of Tailwind on every page).
    inlineCss: true,
    // Two root layouts (app/(en), app/[lang]) leave no single layout for the 404 page:
    // app/global-not-found.tsx renders it.
    globalNotFound: true,
  },

  // Next's own trailing-slash redirect runs before ours, so /en/ took two hops (/en/ → /en → /):
  // redirects() below drops the slash itself, in the same hop as any other change.
  skipTrailingSlashRedirect: true,

  // Canonical host is www: permanently redirect the bare apex to it.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "scrumpokerplay.com" }],
        destination: "https://www.scrumpokerplay.com/:path*",
        permanent: true,
      },
      // English has no prefix: /en/guide is /guide, with or without a trailing slash, in
      // one hop. Old ?lang= links (/en/guide?lang=de) are left to proxy.ts, which sends them
      // straight to the language's address.
      {
        source: "/en/",
        missing: [{ type: "query", key: "lang" }],
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/:path+/",
        missing: [{ type: "query", key: "lang" }],
        destination: "/:path+",
        permanent: true,
      },
      // No trailing slashes (what Next does by default, see skipTrailingSlashRedirect).
      // A room keeps its ?lang= (it reads it itself); on any other page proxy.ts drops the
      // slash and the parameter in one hop.
      {
        source: "/room/:path+/",
        destination: "/room/:path+",
        permanent: true,
      },
      {
        source: "/:path+/",
        missing: [{ type: "query", key: "lang" }],
        destination: "/:path+",
        permanent: true,
      },
      // There are no accounts any more: bookmarked sign-in pages and old
      // e-mail links land on the home page.
      {
        source: "/auth/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en",
        missing: [{ type: "query", key: "lang" }],
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/:path*",
        missing: [{ type: "query", key: "lang" }],
        destination: "/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Not on the room, which gets its own from proxy.ts: a browser enforces every
      // policy it is sent, so this looser one would only confuse there.
      {
        source: "/((?!room/).*)",
        headers: [{ key: "Content-Security-Policy", value: csp }],
      },
      // Non-page resources: crawlable (Google needs them to render pages)
      // but never worth an index entry of their own.
      {
        source: "/(sw.js|manifest.webmanifest|offline.html)",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      // API answers are per person: never stored by Cloudflare or a browser,
      // whatever a cache rule says. The event stream sets its own header.
      {
        source: "/api/:path((?!rooms/[^/]+/events$).*)",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
      // App icons change rarely and their names carry no hash: a week, then
      // revalidate in the background (sw.js stays uncached so updates land).
      {
        source: "/icons/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
