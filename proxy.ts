import { createHash, randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROOM_INLINE_SCRIPTS } from '@/lib/inlineScripts';
import { contentPage, localizedPath } from '@/lib/localePath';
import { isLocale } from '@/lib/translations';
import { MAX_BODY_BYTES } from '@/lib/limits';

// Our JSON endpoints: every API route that takes a body.
const JSON_ROUTES = /^\/api\/rooms(\/|$)/;

/**
 * Guards in front of the API:
 * - bodies over MAX_BODY_BYTES are refused before anything reads them (a
 *   body without a Content-Length is counted as it is read, in jsonBody);
 * - changes must come from our own pages: browsers name the requesting site in
 *   Sec-Fetch-Site, and a cross-site request is refused outright (with
 *   SameSite cookies this keeps other sites from acting for a visitor);
 * - our JSON endpoints take JSON only: an HTML form elsewhere can only send
 *   form-encoded, multipart or text/plain bodies.
 */
function guardApi(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  if (method === 'POST' || method === 'PATCH' || method === 'PUT' || method === 'DELETE') {
    const length = Number(request.headers.get('content-length') ?? 0);
    if (length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request too large', code: 'too_large' }, { status: 413 });
    }
    const site = request.headers.get('sec-fetch-site');
    if (site && site !== 'same-origin' && site !== 'none') {
      return NextResponse.json({ error: 'Cross-site request refused', code: 'rejected' }, { status: 403 });
    }
    if (JSON_ROUTES.test(pathname)) {
      const type = (request.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
      if (type !== 'application/json') {
        return NextResponse.json({ error: 'Invalid content type', code: 'invalid' }, { status: 415 });
      }
    }
  }
  return NextResponse.next();
}

/**
 * Links from before every language had its own address (/guide?lang=de): sent to that
 * address (/de/guide), without the parameter. A redirect in next.config.ts would keep
 * it, since redirects pass the query on. Rooms keep reading ?lang= in the browser.
 */
function redirectLangQuery(request: NextRequest) {
  // A plain URL: a NextURL remembers a trailing slash and would put it back.
  const url = new URL(request.url);
  // /en/guide/?lang=de: the English prefix and a trailing slash go in the same hop
  // (next.config.ts leaves these to us).
  const path = url.pathname.replace(/^\/en(?=\/|$)/, '').replace(/(.)\/+$/, '$1') || '/';
  const page = contentPage(path);
  if (!page) {
    if (path === url.pathname) return NextResponse.next();
    // /en/room/<code>?lang=de: only the prefix goes; the room reads ?lang= itself.
    url.pathname = path;
    return NextResponse.redirect(url, 308);
  }
  const lang = url.searchParams.get('lang');
  url.searchParams.delete('lang');
  url.pathname = localizedPath(isLocale(lang) ? lang : page.locale, page.path);
  return NextResponse.redirect(url, 308);
}

/** Our inline scripts (lib/inlineScripts.ts) as CSP hash sources, computed once. */
const INLINE_SCRIPT_HASHES = ROOM_INLINE_SCRIPTS
  .map(text => `'sha256-${createHash('sha256').update(text).digest('base64')}'`)
  .join(' ');

/**
 * The room is the one page that shows what people type (names, stories, chat, links),
 * and it renders per request, so its Content-Security-Policy can run no inline script
 * but ours (by hash) and Next.js's own: those carry a fresh nonce, which Next.js reads
 * from this request header and adds itself. No 'strict-dynamic': it would ignore the
 * host below, and the analytics beacon Cloudflare adds to the HTML has no nonce.
 * The other directives are next.config.ts's policy (every other page's, which allows
 * inline scripts: static pages can't carry a nonce); keep the two in step.
 */
function withRoomPolicy(request: NextRequest) {
  const nonce = randomBytes(16).toString('base64');
  // 'unsafe-eval' is only needed for HMR in development.
  const dev = process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : '';
  const policy = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' ${INLINE_SCRIPT_HASHES} https://static.cloudflareinsights.com${dev}`,
    // Inline styles stay allowed: inlineCss puts the stylesheet in a <style>, and React
    // writes style attributes, which no nonce can cover.
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
  const headers = new Headers(request.headers);
  headers.set('content-security-policy', policy);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set('Content-Security-Policy', policy);
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/api' || pathname.startsWith('/api/')) return guardApi(request);
  if (pathname.startsWith('/room/')) return withRoomPolicy(request);
  return redirectLangQuery(request);
}

export const config = {
  matcher: [
    '/api/:path*',
    '/room/:path+',
    // Only requests that carry ?lang= (old shared links); every other page skips the proxy.
    { source: '/((?!api/|_next/|room/).*)', has: [{ type: 'query', key: 'lang' }] },
  ],
};
