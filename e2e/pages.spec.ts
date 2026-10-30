import { expect, test, type Page } from '@playwright/test';
import deGuide from '../app/guide/content/de';
import trGuide from '../app/guide/content/tr';
import trPrivacy from '../app/privacy/content/tr';
import trTerms from '../app/terms/content/tr';

const LOCALES = ['en', 'tr', 'de', 'fr', 'it', 'ar', 'zh'];

/** A page's address in a language: English has no prefix (/guide), the others do (/de/guide). */
function inLanguage(lang: string, path: string): string {
  if (lang === 'en') return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

/** The text of the first <h1> in server-rendered HTML. */
function firstHeading(html: string): string {
  const inner = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';
  return inner.replace(/<[^>]+>/g, '').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim();
}

/**
 * Opens `path` and waits until the page's language logic has run (it notes the page's
 * language for the tab just before it decides whether to redirect), so that staying put
 * can be checked.
 */
async function gotoAndSettle(page: Page, path: string, lang: string) {
  // A fresh tab (about:blank) has no storage yet, and nothing to clear.
  if (page.url() !== 'about:blank') await page.evaluate(() => sessionStorage.removeItem('scrumPoker_pageLang'));
  await page.goto(path);
  await page.waitForFunction(l => sessionStorage.getItem('scrumPoker_pageLang') === l, lang);
  await page.waitForLoadState();
}

/** Every page the sitemap lists, as a path. */
async function sitemapPaths(baseURL: string): Promise<string[]> {
  const xml = await (await fetch(new URL('/sitemap.xml', baseURL))).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
}

test.describe('every page', () => {
  test('loads without errors', async ({ page, baseURL }) => {
    // Every page in all seven languages.
    test.setTimeout(600_000);
    const paths = await sitemapPaths(baseURL!);
    expect(paths.length).toBeGreaterThan(10);

    const problems: string[] = [];
    let current = '';
    page.on('console', msg => {
      // Cloudflare's beacon is injected at the edge only.
      if (msg.type() === 'error' && !msg.text().includes('cloudflareinsights')) problems.push(`${current}: console: ${msg.text()}`);
    });
    page.on('pageerror', err => problems.push(`${current}: exception: ${err.message}`));

    for (const path of paths) {
      current = path;
      const res = await page.goto(path);
      if (res?.status() !== 200) problems.push(`${path}: HTTP ${res?.status()}`);
      if (!(await page.title()).trim()) problems.push(`${path}: empty <title>`);
      if ((await page.locator('h1').count()) !== 1) problems.push(`${path}: ${await page.locator('h1').count()} h1 elements`);
      const description = await page.locator('meta[name="description"]').getAttribute('content').catch(() => null);
      if (!description) problems.push(`${path}: no meta description`);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href').catch(() => null);
      if (canonical && new URL(canonical).pathname.replace(/\/$/, '') !== path.replace(/\/$/, '')) problems.push(`${path}: canonical ${canonical}`);
      const prefix = path.split('/')[1];
      const lang = LOCALES.includes(prefix) ? prefix : 'en';
      if ((await page.locator('html').getAttribute('lang')) !== lang) problems.push(`${path}: not lang="${lang}"`);
      if (page.url() !== new URL(path, page.url()).href) problems.push(`${path}: moved to ${page.url()}`);
      // Nothing wider than the screen.
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow > 1) problems.push(`${path}: horizontal overflow ${overflow}px`);
    }
    expect(problems, problems.join('\n')).toEqual([]);
  });

  test('every language renders the home page', async ({ page }) => {
    for (const lang of LOCALES) {
      await page.goto(inLanguage(lang, '/'));
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('html')).toHaveAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      await expect(page.locator('h1')).not.toBeEmpty();
    }
  });

  test('legal pages come in the chosen language, with working contact links', async ({ page }) => {
    for (const [path, heading] of [['/tr/privacy', trPrivacy.title], ['/tr/terms', trTerms.title]] as const) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
      await expect(page.getByRole('link', { name: 'contact@scrumpokerplay.com' }).first()).toHaveAttribute('href', 'mailto:contact@scrumpokerplay.com');
    }
  });
});

test.describe('languages', () => {
  test('a localized page is server-rendered in its language, with hreflang and a canonical to itself', async ({ request }) => {
    const res = await request.get('/de/guide');
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toMatch(/<html[^>]* lang="de"/);
    expect(firstHeading(html)).toBe(deGuide.title);
    expect(html).toContain('<link rel="canonical" href="https://www.scrumpokerplay.com/de/guide"/>');
    for (const lang of LOCALES) {
      expect(html, lang).toContain(`hrefLang="${lang}" href="https://www.scrumpokerplay.com${inLanguage(lang, '/guide')}"`);
    }
    expect(html).toContain('hrefLang="x-default" href="https://www.scrumpokerplay.com/guide"');
    expect(html).toContain('<meta property="og:locale" content="de_DE"/>');
    // Links stay in the language; links into a room never get a prefix.
    expect(html).toContain('href="/de/blog"');
    expect(html).not.toContain('href="/de/room');
  });

  test('Arabic is right-to-left from the server', async ({ request }) => {
    const html = await (await request.get('/ar')).text();
    expect(html).toMatch(/<html[^>]* lang="ar"[^>]* dir="rtl"/);
  });

  test('the language menu goes to the same page in the chosen language and remembers it', async ({ page }) => {
    await page.goto('/guide');
    await page.getByRole('button', { name: /Language: English/ }).click();
    await page.getByRole('menuitemradio', { name: 'Türkçe' }).click();
    await page.waitForURL('**/tr/guide');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(trGuide.title);
    expect(await page.evaluate(() => localStorage.getItem('scrumPoker_lang'))).toBe('tr');
    // The saved choice also takes English addresses to Turkish…
    await page.goto('/pricing');
    await page.waitForURL('**/tr/pricing');
    // …until English is chosen.
    await page.getByRole('button', { name: /Türkçe/ }).click();
    await page.getByRole('menuitemradio', { name: 'English' }).click();
    await page.waitForURL(url => url.pathname === '/pricing');
    await gotoAndSettle(page, '/guide', 'en');
    expect(new URL(page.url()).pathname).toBe('/guide');
  });

  test('every language version is a crawlable link with hreflang, in the menu and the footer', async ({ request }) => {
    const html = await (await request.get('/de/guide')).text();
    const anchors = html.match(/<a\s[^>]*>/g) ?? [];
    for (const lang of LOCALES) {
      // Twice: the language menu (in the HTML while closed) and the footer.
      const links = anchors.filter(a => a.includes(`href="${inLanguage(lang, '/guide')}"`) && a.includes(`hrefLang="${lang}"`));
      expect(links.length, lang).toBe(2);
    }
  });

  test('the footer\'s language links go to the page in that language and remember it', async ({ page }) => {
    await gotoAndSettle(page, '/de/pricing', 'de');
    await page.getByRole('contentinfo').getByRole('link', { name: 'English' }).click();
    await page.waitForURL(url => url.pathname === '/pricing');
    expect(await page.evaluate(() => localStorage.getItem('scrumPoker_lang'))).toBe('en');
  });

  test('a first visit follows the browser language once', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'fr-FR' });
    const page = await context.newPage();
    await page.goto('/guide');
    await page.waitForURL('**/fr/guide');
    // Once per visit: going back to the English page now stays there.
    await gotoAndSettle(page, '/guide', 'en');
    expect(new URL(page.url()).pathname).toBe('/guide');
    await context.close();
  });

  test('old ?lang= links go to the language\'s address, without the parameter', async ({ request }) => {
    for (const [from, to] of [['/?lang=fr', '/fr'], ['/guide?lang=tr', '/tr/guide'], ['/de/blog?lang=en', '/blog']]) {
      const res = await request.get(from, { maxRedirects: 0 });
      expect(res.status(), from).toBe(308);
      const location = new URL(res.headers().location, 'http://localhost');
      expect(location.pathname, from).toBe(to);
      expect(location.search, from).toBe('');
    }
  });

  test('/en addresses lead to the unprefixed English page in one hop', async ({ request }) => {
    for (const [from, to] of [['/en/guide', '/guide'], ['/en/guide/', '/guide'], ['/en/', '/'], ['/en', '/'], ['/guide/', '/guide']]) {
      const res = await request.get(from, { maxRedirects: 0 });
      expect(res.status(), from).toBe(308);
      expect(new URL(res.headers().location, 'http://localhost').pathname, from).toBe(to);
    }
    // An old ?lang= link under /en goes straight to the language's address.
    const res = await request.get('/en/guide?lang=de', { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    const location = new URL(res.headers().location, 'http://localhost');
    expect(location.pathname).toBe('/de/guide');
    expect(location.search).toBe('');
  });

  test('the sitemap lists every page in every language, with alternates', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    for (const lang of LOCALES) {
      expect(xml, lang).toContain(`<loc>https://www.scrumpokerplay.com${inLanguage(lang, '/guide')}</loc>`);
      expect(xml, lang).toContain(`<loc>https://www.scrumpokerplay.com${inLanguage(lang, '/blog/agile-velocity')}</loc>`);
    }
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="de" href="https://www.scrumpokerplay.com/de/guide" />');
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="x-default" href="https://www.scrumpokerplay.com/guide" />');
  });

  test('a missing page in a language is a real 404', async ({ page }) => {
    for (const path of ['/de/does-not-exist', '/xx', '/blog/does-not-exist', '/tr/blog/does-not-exist']) {
      const res = await page.goto(path);
      expect(res?.status(), path).toBe(404);
      await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
    }
  });
});

test.describe('search engines', () => {
  /** The JSON-LD blocks of a page, parsed. */
  async function structuredData(html: string): Promise<Record<string, unknown>[]> {
    return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .flatMap(m => [JSON.parse(m[1])].flat());
  }

  test('articles link to related pages inline, in the reader\'s language', async ({ page }) => {
    await page.goto('/de/blog/what-is-planning-poker');
    const article = page.locator('article');
    await expect(article.getByRole('link', { name: 'Sonderkarten' })).toHaveAttribute('href', '/de/planning-poker-cards');
    await expect(article.getByRole('link', { name: 'modifizierte Fibonacci-Folge' })).toHaveAttribute('href', '/de/fibonacci-planning-poker');
    // No markup is left in the text.
    await expect(article).not.toContainText('](/');
    // Related posts include a landing page and the tools post, titled in German.
    const related = page.getByRole('region', { name: 'Verwandte Artikel' });
    await expect(related.getByRole('link', { name: /Planning-Poker-Karten/ })).toHaveAttribute('href', '/de/planning-poker-cards');
    await expect(related.locator('a[href="/de/blog/free-scrum-poker-tools"]')).toBeVisible();
  });

  test('blog posts, the guide and the blog have breadcrumbs and article data', async ({ request }) => {
    const post = await (await request.get('/blog/agile-velocity')).text();
    const data = await structuredData(post);
    const posting = data.find(d => d['@type'] === 'BlogPosting') as { publisher: { logo?: { url: string } } };
    expect(posting.publisher.logo?.url).toContain('/icons/icon-512.png');
    expect(data.find(d => d['@type'] === 'BreadcrumbList')).toBeTruthy();
    expect(post).toContain('<meta property="article:published_time"');
    expect(post).toContain('<meta property="article:modified_time"');

    const guide = await structuredData(await (await request.get('/tr/guide')).text());
    expect(guide.find(d => d['@type'] === 'BreadcrumbList')).toBeTruthy();
    const blog = await structuredData(await (await request.get('/blog')).text());
    expect(blog.find(d => d['@type'] === 'Blog')).toBeTruthy();
  });

  test('the home page has no HowTo, and no page says index (the 404 says noindex alone)', async ({ request }) => {
    const html = await (await request.get('/')).text();
    expect((await structuredData(html)).some(d => d['@type'] === 'HowTo')).toBe(false);
    expect(html).not.toMatch(/<meta name="robots" content="index/);
    expect(html).not.toMatch(/<meta name="googlebot" content="[^"]*\bindex/);
  });

  test('Open Graph image alt text is in the page\'s language', async ({ request }) => {
    const html = await (await request.get('/de/blog')).text();
    expect(html).toContain('<meta property="og:image:alt" content="Scrum Poker Online – Blog &amp; Leitfäden"/>');
  });

  test('the demo explains its sample round, with the home preview\'s names', async ({ page }) => {
    await page.goto('/demo');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Planning Poker Demo: A Revealed Round');
    await expect(page.getByText('Damla', { exact: true })).toBeVisible();
    await expect(page.getByRole('main').getByRole('link', { name: 'Start a free room' })).toHaveAttribute('href', '/');
  });

  test('the footer links the landing pages and credits the tools that deploy and watch the site', async ({ request }) => {
    const html = await (await request.get('/fr/blog')).text();
    for (const path of ['/fr/fibonacci-planning-poker', '/fr/t-shirt-sizing', '/fr/planning-poker-cards']) {
      expect(html, path).toContain(`href="${path}"`);
    }
    // The maker's own projects: plain credits, not sponsored links.
    expect(html).toMatch(/href="https:\/\/shipwick\.com\/"[^>]*rel="noopener"/);
    expect(html).toMatch(/href="https:\/\/reliableuptime\.com\/"[^>]*rel="noopener"/);
    expect(html).not.toContain('sponsored');
  });
});

test.describe('page structure', () => {
  test('every subpage has the same breadcrumb trail, in the same place, under the logo', async ({ page }) => {
    const pages: [string, string[]][] = [
      ['/guide', ['Home', 'Guide']],
      ['/pricing', ['Home', 'Free']],
      ['/blog', ['Home', 'Blog']],
      ['/blog/agile-velocity', ['Home', 'Blog', 'Agile Velocity: How to Calculate, Track and Use It for Sprint Planning']],
      ['/demo', ['Home', 'Live Demo']],
      ['/privacy', ['Home', 'Privacy']],
      ['/terms', ['Home', 'Terms']],
      ['/fibonacci-planning-poker', ['Home', 'Fibonacci Planning Poker']],
      ['/t-shirt-sizing', ['Home', 'T-Shirt Sizing']],
      ['/planning-poker-cards', ['Home', 'Planning Poker Cards']],
    ];
    let top: number | undefined;
    for (const [path, names] of pages) {
      await page.goto(path);
      const trail = page.getByRole('navigation', { name: 'Breadcrumb' });
      await expect(trail.getByRole('listitem'), path).toHaveText(names);
      await expect(trail.getByRole('link', { name: 'Home' }), path).toHaveAttribute('href', '/');
      await expect(trail.locator('[aria-current="page"]'), path).toHaveText(names.at(-1)!);
      // Lined up with the logo, at the same height on every page.
      const box = (await trail.getByRole('link', { name: 'Home' }).boundingBox())!;
      const logo = (await page.getByRole('banner').getByRole('link').first().boundingBox())!;
      expect(Math.abs(box.x - logo.x), path).toBeLessThan(2);
      top ??= box.y;
      expect(Math.abs(box.y - top), path).toBeLessThan(2);
    }
  });

  test('in Arabic the trail runs from the right, under the logo', async ({ page }) => {
    await page.goto('/ar/guide');
    const home = page.getByRole('navigation', { name: 'مسار التنقل' }).getByRole('link', { name: 'الرئيسية' });
    await expect(home).toHaveAttribute('href', '/ar');
    const box = (await home.boundingBox())!;
    const logo = (await page.getByRole('banner').getByRole('link').first().boundingBox())!;
    expect(Math.abs(box.x + box.width - (logo.x + logo.width))).toBeLessThan(2);
  });
});

test.describe('home form', () => {
  test('reports missing fields inline and focuses the first one', async ({ page }) => {
    await page.goto('/');
    await page.locator('#home-name').fill('   ');
    await page.locator('form').getByRole('button', { name: 'Create Room' }).click();
    await expect(page.locator('#home-name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#home-name')).toHaveAttribute('aria-describedby', 'home-name-error');
    await expect(page.locator('#home-name-error')).toHaveText('Please enter your name.');
    await expect(page.locator('#home-roomName')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#home-name')).toBeFocused();
    // A repeated card counts once, as on the server.
    await page.locator('#home-name').fill('Mert');
    await page.locator('#home-roomName').fill('Sprint');
    await page.getByRole('group', { name: 'Deck type' }).getByRole('button', { name: 'Custom' }).click();
    await page.locator('#home-customCards').fill('5, 5');
    await page.locator('form').getByRole('button', { name: 'Create Room' }).click();
    await expect(page.locator('#home-customCards')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#home-customCards')).toBeFocused();
  });

  test('the join field takes a link, a code read out with spaces or dashes, and checks the length', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('tab', { name: 'Join Room' }).click();
    const code = page.locator('#home-roomCode');
    for (const [typed, kept] of [
      ['https://www.scrumpokerplay.com/room/abcd2345?from=chat', 'ABCD2345'],
      ['abcd-2345', 'ABCD2345'],
      [' ab cd 23 45 ', 'ABCD2345'],
    ]) {
      await code.fill(typed);
      await expect(code, typed).toHaveValue(kept);
    }
    await page.locator('#home-name').fill('Mert');
    await code.fill('abc');
    await page.locator('form').getByRole('button', { name: 'Join Room' }).click();
    await expect(page.locator('#home-roomCode-error')).toHaveText('A room code has 8 letters and digits.');
    await expect(code).toBeFocused();
  });

  test('server trouble is reported in the page\'s language, and one click sends one request', async ({ page }) => {
    let requests = 0;
    await page.route('**/api/rooms', async route => {
      requests++;
      await new Promise(resolve => setTimeout(resolve, 500));
      await route.fulfill({ status: 503, json: { error: 'Too many rooms open right now', code: 'busy' } });
    });
    await page.goto('/de');
    await page.locator('#home-name').fill('Jonas');
    await page.locator('#home-roomName').fill('Planung');
    await page.locator('#home-roomName').press('Enter');
    await page.locator('#home-roomName').press('Enter');
    await expect(page.getByRole('main').getByRole('alert')).toContainText('Gerade sind zu viele Räume offen.');
    expect(requests).toBe(1);
  });
});

test.describe('the rest of the site', () => {
  test('there are no account pages any more', async ({ request }) => {
    // Old sign-in and reset links lead home; the account API is gone.
    for (const path of ['/auth/signin', '/auth/reset-password']) {
      const res = await request.get(path, { maxRedirects: 0 });
      expect(res.status(), path).toBe(308);
      expect(res.headers().location, path).toBe('/');
    }
    expect((await request.get('/api/auth/session')).status()).toBe(404);
  });

  test('an unknown address is a real 404', async ({ page }) => {
    const res = await page.goto('/this-page-does-not-exist');
    expect(res?.status()).toBe(404);
  });

  test('robots.txt, manifest and service worker are served', async ({ request }) => {
    expect((await request.get('/robots.txt')).status()).toBe(200);
    expect((await request.get('/manifest.webmanifest')).status()).toBe(200);
    expect((await request.get('/sw.js')).status()).toBe(200);
    expect((await request.get('/opengraph-image')).headers()['content-type']).toContain('image/png');
    expect((await request.get('/blog/opengraph-image')).headers()['content-type']).toContain('image/png');
  });
});
