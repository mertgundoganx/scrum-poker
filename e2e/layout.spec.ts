import { expect, test, type Browser, type BrowserContext, type Page } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { LANDING_PAGES } from '../app/landingPages';
import { ROOM_TEXT } from '../app/(en)/room/[id]/roomText';
import { BLOG_POSTS } from '../lib/blogPosts';
import { localizedPath } from '../lib/localePath';
import type { Locale } from '../lib/translations';
import ar from '../lib/locales/ar';
import de from '../lib/locales/de';
import en from '../lib/locales/en';
import { createRoom, joinRoom, randomIp } from './helpers';

/*
 * Layout audit (slow, kept out of `pnpm test:e2e`; run it with `pnpm test:layout`).
 * Every page at several widths, languages and both themes, the header menus and a
 * room in a few states. It fails on a page that scrolls sideways, anything visible
 * past the edge of the screen, tap targets under 40×40 on phones and header or
 * navigation items on top of each other. Phone widths emulate a touch screen, the
 * wider ones a mouse (the CSS gives touch screens bigger targets).
 */

const LOCALES: Locale[] = ['en', 'tr', 'de', 'fr', 'it', 'ar', 'zh'];
const PHONE = [320, 390];
const WIDE = [768, 1024, 1536];
// Dark changes colours, rarely layout: one phone and one wide width.
const DARK = new Set([320, 1024]);
const HEIGHT = 800;

/**
 * Every page of the sitemap (app/sitemap.ts, which can't be imported here: server-only)
 * in every language, and a missing page in each. The first test checks the list
 * against the live /sitemap.xml.
 */
const PAGES = [
  ...['/', '/guide', '/blog', '/pricing', '/demo', '/privacy', '/terms', ...Object.values(LANDING_PAGES).map(p => p.path), ...BLOG_POSTS.map(p => p.href)]
    .flatMap(path => LOCALES.map(lang => localizedPath(lang, path))),
  ...LOCALES.map(lang => (lang === 'en' ? '/does-not-exist' : `/${lang}/does-not-exist`)),
];

function languageOf(path: string): Locale {
  const prefix = path.split('/')[1];
  return LOCALES.find(l => l !== 'en' && l === prefix) ?? 'en';
}

/** A browser context of its own: client IP (rate limits are per IP), touch or mouse. */
async function newContext(browser: Browser, touch: boolean, width: number): Promise<BrowserContext> {
  return browser.newContext({
    viewport: { width, height: HEIGHT },
    hasTouch: touch,
    locale: 'en-US',
    colorScheme: 'light',
    reducedMotion: 'reduce',
    extraHTTPHeaders: { 'X-Forwarded-For': randomIp() },
  });
}

/**
 * Layout problems on the page as it is now, one line each. Runs in the page, so it
 * keeps everything it needs inside.
 */
function layoutProblems({ tapTargets }: { tapTargets: boolean }): string[] {
  const out: string[] = [];
  const root = document.documentElement;
  const vw = root.clientWidth;
  const vh = window.innerHeight;
  const INTERACTIVE = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=tab], '
    + '[role=menuitem], [role=menuitemradio], [role=menuitemcheckbox], [role=option], [role=switch], [role=checkbox], [role=radio]';
  const OVERLAY = '[role=menu], [role=dialog], [role=alertdialog], [role=listbox], [role=tooltip]';

  const name = (el: Element) => {
    let s = el.tagName.toLowerCase();
    // useId() ids (":r1:", "«r1»", "_R_…") say nothing.
    if (el.id && !/[:«_]/.test(el.id)) s += `#${el.id}`;
    const cls = (el.getAttribute('class') ?? '').split(/\s+/).filter(Boolean).slice(0, 3);
    if (cls.length) s += `.${cls.join('.')}`;
    const text = (el.getAttribute('aria-label') || (el as HTMLElement).innerText || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    return text ? `${s} "${text}"` : s;
  };
  const px = (n: number) => Math.round(n);

  /** Seen by a person: not hidden, transparent, empty or visually hidden (sr-only). */
  const visible = (el: Element) => {
    if (el.closest('nextjs-portal')) return false; // the dev server's overlay
    if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    for (let a: Element | null = el; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.position !== 'absolute' && cs.position !== 'fixed') continue;
      if (cs.clipPath === 'inset(50%)' || /^rect\(0(px)?,? 0(px)?,? 0(px)?,? 0(px)?\)$/.test(cs.clip)) return false;
      const ar = a.getBoundingClientRect();
      if (ar.width <= 1 && ar.height <= 1 && cs.overflow !== 'visible') return false;
    }
    return true;
  };

  /** Cut off by an ancestor that is itself on the screen (a scroller, a carousel, overflow-hidden). */
  const clippedOnScreen = (el: Element) => {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflowX !== 'visible' || cs.contain.includes('paint')) {
        const r = a.getBoundingClientRect();
        return r.left >= -1 && r.right <= vw + 1;
      }
      // Above a fixed element the ancestors don't clip it.
      if (cs.position === 'fixed') return false;
    }
    return false;
  };

  // (a) The page scrolls sideways.
  if (root.scrollWidth > vw + 1) out.push(`page scrolls sideways: scrollWidth ${root.scrollWidth} > ${vw}`);

  // (b) Visible things past the left or right edge (the outermost one of each).
  const all = [...document.body.querySelectorAll('*')].filter(el => !(el instanceof SVGElement && el.tagName.toLowerCase() !== 'svg'));
  const outside: Element[] = [];
  for (const el of all) {
    if (outside.some(o => o.contains(el)) || !visible(el)) continue;
    const r = el.getBoundingClientRect();
    if ((r.right > vw + 1 || r.left < -1) && !clippedOnScreen(el)) {
      outside.push(el);
      out.push(`past the screen edge: ${name(el)} left ${px(r.left)} right ${px(r.right)} (screen ${vw})`);
    }
  }

  // Open menus and dialogs: their bottom on the screen, unless they scroll.
  for (const el of document.querySelectorAll(OVERLAY)) {
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.bottom <= vh + 1 && r.top >= -1) continue;
    const scrolls = [el, ...el.querySelectorAll('*')].some(c => /(auto|scroll)/.test(getComputedStyle(c).overflowY) && c.scrollHeight > c.clientHeight + 1);
    if (!scrolls) out.push(`overlay off the screen: ${name(el)} top ${px(r.top)} bottom ${px(r.bottom)} (screen height ${vh})`);
  }

  // (c) Tap targets on phones.
  if (tapTargets) {
    for (const el of document.querySelectorAll(INTERACTIVE)) {
      // A control inside another (a link in a button): the outer one is the target.
      if (el.parentElement?.closest(INTERACTIVE) || !visible(el)) continue;
      let target: Element = el;
      if (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio')) target = el.closest('label') ?? el.labels?.[0] ?? el;
      if (el.tagName === 'A' && getComputedStyle(el).display === 'inline') {
        // A link in running text is exempt; a link on its own (a footer link) is not.
        let block = el.parentElement;
        while (block && getComputedStyle(block).display === 'inline') block = block.parentElement;
        const own = (el.textContent ?? '').trim().length;
        if (block && (block.textContent ?? '').trim().length > own + 2) continue;
      }
      const r = target.getBoundingClientRect();
      if (r.width < 39.5 || r.height < 39.5) out.push(`tap target under 40×40: ${name(target)} ${px(r.width)}×${px(r.height)}`);
    }
  }

  // (d) Header and navigation items on top of each other, or out of the header bar.
  const items = [...new Set([...document.querySelectorAll('header, nav')].flatMap(c => [...c.querySelectorAll('a[href], button, input, select')]))]
    .filter(visible);
  /** What an item is laid out in: the header or nav, or a menu or panel floating over it. */
  const layer = (el: Element) => {
    let nav: Element | null = null;
    for (let a = el.parentElement; a; a = a.parentElement) {
      if (a.matches(OVERLAY)) return a;
      const cs = getComputedStyle(a);
      if (cs.position === 'absolute' || cs.position === 'fixed' || a.tagName === 'HEADER') return a;
      if (a.tagName === 'NAV') nav ??= a;
    }
    return nav;
  };
  const layers = new Map(items.map(el => [el, layer(el)]));
  for (let i = 0; i < items.length; i++) {
    const a = items[i];
    const ra = a.getBoundingClientRect();
    const la = layers.get(a);
    if (la?.tagName === 'HEADER') {
      const bar = la.getBoundingClientRect();
      if (ra.top < bar.top - 1 || ra.bottom > bar.bottom + 1) out.push(`out of the header: ${name(a)} top ${px(ra.top)} bottom ${px(ra.bottom)} (header ${px(bar.top)}–${px(bar.bottom)})`);
    }
    for (let j = i + 1; j < items.length; j++) {
      const b = items[j];
      if (layers.get(b) !== la || a.contains(b) || b.contains(a)) continue;
      const rb = b.getBoundingClientRect();
      const w = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
      const h = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
      if (w > 1 && h > 1) out.push(`overlapping: ${name(a)} and ${name(b)} by ${px(w)}×${px(h)}`);
    }
  }
  return [...new Set(out)];
}

/** Let the page settle (fonts, a re-render after a resize, animations), then measure it. */
async function measure(page: Page, width: number): Promise<string[]> {
  for (let attempt = 0; ; attempt++) {
    try {
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        for (const a of document.getAnimations()) {
          try { if (a.effect?.getTiming().iterations !== Infinity) a.finish(); } catch { /* already gone */ }
        }
      });
      return await page.evaluate(layoutProblems, { tapTargets: width < 640 });
    } catch (error) {
      // A reload in the middle (the dev server's hot reload): once more when it is back.
      if (attempt > 0 || !String(error).includes('Execution context was destroyed')) throw error;
      await page.waitForLoadState('load');
    }
  }
}

/** Opens a content page, in its language and at its own address. */
async function openPage(page: Page, path: string): Promise<void> {
  const res = await page.goto(path);
  expect(res?.status(), `${path}: HTTP status`).toBe(path.endsWith('/does-not-exist') ? 404 : 200);
  await expect(page.locator('html'), `${path}: language`).toHaveAttribute('lang', languageOf(path));
  await page.waitForLoadState('load');
  expect(new URL(page.url()).pathname, `${path}: stays at its address`).toBe(path);
}

async function sweep(page: Page, label: string, widths: number[], problems: string[], prepare?: () => Promise<void>) {
  for (const width of widths) {
    await page.setViewportSize({ width, height: HEIGHT });
    if (prepare) await prepare();
    problems.push(...(await measure(page, width)).map(p => `${label} ${width}px: ${p}`));
  }
}

test.describe('layout of every page', () => {
  test('the sitemap lists the pages this audit covers', async ({ baseURL }) => {
    const xml = await (await fetch(new URL('/sitemap.xml', baseURL))).text();
    const live = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname).sort();
    expect(live).toEqual(PAGES.filter(p => !p.endsWith('/does-not-exist')).sort());
  });

  for (const path of PAGES) {
    test(path, async ({ browser }) => {
      test.setTimeout(180_000);
      const problems: string[] = [];
      for (const touch of [true, false]) {
        const widths = touch ? PHONE : WIDE;
        const context = await newContext(browser, touch, widths[0]);
        const page = await context.newPage();
        for (const theme of ['light', 'dark'] as const) {
          // The page picks the theme from prefers-color-scheme as it loads.
          await page.emulateMedia({ colorScheme: theme });
          await openPage(page, path);
          expect(await page.evaluate(() => document.documentElement.classList.contains('dark')), `${path} in ${theme}`).toBe(theme === 'dark');
          await sweep(page, `${path} ${theme}`, widths.filter(w => theme === 'light' || DARK.has(w)), problems);
        }
        await context.close();
      }
      expect(problems, problems.join('\n')).toEqual([]);
    });
  }
});

test.describe('layout of the header menus on phones', () => {
  for (const lang of LOCALES) {
    test(lang, async ({ browser }) => {
      test.setTimeout(120_000);
      const path = lang === 'en' ? '/guide' : `/${lang}/guide`;
      const problems: string[] = [];
      const context = await newContext(browser, true, PHONE[0]);
      const page = await context.newPage();
      const menuButton = page.locator('header button[aria-controls]:not([aria-haspopup])');
      const languageButton = page.locator('header button[aria-haspopup="menu"]');
      for (const theme of ['light', 'dark'] as const) {
        await page.emulateMedia({ colorScheme: theme });
        await openPage(page, path);
        for (const [menu, button] of [['menu', menuButton], ['language menu', languageButton]] as const) {
          for (const width of PHONE) {
            await page.setViewportSize({ width, height: HEIGHT });
            await button.click();
            const panel = page.locator(`[id="${await button.getAttribute('aria-controls')}"]`);
            await expect(panel).toBeVisible();
            problems.push(...(await measure(page, width)).map(p => `${path} ${theme} ${menu} open ${width}px: ${p}`));
            await page.keyboard.press('Escape');
            if (await panel.isVisible()) await button.click();
            await expect(panel).toBeHidden();
          }
        }
      }
      await context.close();
      expect(problems, problems.join('\n')).toEqual([]);
    });
  }
});

// The longest names and stories people can type (16 and 140 characters), in several scripts.
const HOST = 'WWWWWWWWWWWWWWWW';
const GUEST = 'Donaudampfschiff';
const BOTS = ['MMMMMMMMMMMMMMMM', 'محمد عبدالرحمن', '王小明张伟李娜', 'Jean-François L.', 'Ünal Çağlayan', '👩‍👩‍👧‍👦👨‍💻🧑🏽‍🚀'];
const STORIES = [
  `Implement${'X'.repeat(131)}`,
  'https://example.atlassian.net/browse/PROJ-12345?filter=allopenissues&jql=project%3DPROJ%20AND%20status%3DOpen&very=long&query=string',
  'PROJ-123 Login page with SSO and two factor authentication for the enterprise customers of the platform',
  'تسجيل الدخول باستخدام حساب جوجل وإعادة تعيين كلمة المرور للمستخدمين الجدد في التطبيق',
  '用户可以通过微信扫码登录并且绑定手机号码以便找回密码和接收通知消息提醒',
  'Datenschutzgrundverordnungskonformitätsüberprüfungsmechanismusimplementierung',
];

/** Someone in the room without a page: joins over the API and keeps an event stream open (or the seat goes). */
async function bot(baseURL: string, code: string, name: string) {
  const ip = randomIp();
  const userId = randomUUID();
  const res = await fetch(new URL(`/api/rooms/${code}/join`, baseURL), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': ip },
    body: JSON.stringify({ userId, name, avatar: '' }),
  });
  if (!res.ok) throw new Error(`${name} could not join: HTTP ${res.status} ${await res.text()}`);
  const headers = {
    'Content-Type': 'application/json',
    'X-Forwarded-For': ip,
    Cookie: res.headers.getSetCookie().map(c => c.split(';')[0]).join('; '),
  };
  const stream = new AbortController();
  void fetch(new URL(`/api/rooms/${code}/events`, baseURL), { headers, signal: stream.signal })
    .then(async r => { const reader = r.body!.getReader(); while (!(await reader.read()).done) { /* keep it open */ } })
    .catch(() => { /* closed at the end */ });
  return {
    vote: async (card: string) => {
      const r = await fetch(new URL(`/api/rooms/${code}/vote`, baseURL), { method: 'POST', headers, body: JSON.stringify({ userId, card }) });
      expect(r.ok, `${name} votes`).toBe(true);
    },
    close: () => stream.abort(),
  };
}

test.describe('layout of a room', () => {
  for (const lang of ['en', 'de', 'ar'] as const) {
    test(lang, async ({ browser, baseURL }) => {
      test.setTimeout(300_000);
      const t = { en, de, ar }[lang];
      const problems: string[] = [];
      const contexts: BrowserContext[] = [];
      const person = async (touch: boolean) => {
        // Created wide (the profile button the helpers wait for is in the header there).
        const context = await newContext(browser, touch, 1280);
        contexts.push(context);
        return context.newPage();
      };

      // A host on a phone, a guest on a laptop and six more, with the longest names.
      const phone = await person(true);
      const laptop = await person(false);
      const code = await createRoom(phone, { name: HOST, room: 'Sprint-Planning-Donaudampfschifffahrt-Q4' });
      await joinRoom(laptop, code, GUEST);
      const bots = await Promise.all(BOTS.map(n => bot(baseURL!, code, n)));
      // Their event streams and the pages end with the test, passed or not.
      try {
        const views = [[phone, PHONE], [laptop, [768, 1280]]] as const;

        // Someone opening the link: the join card.
        for (const [touch, widths] of [[true, PHONE], [false, [768, 1280]]] as const) {
          const visitor = await person(touch);
          await visitor.goto(`/room/${code}?lang=${lang}`);
          await expect(visitor.getByRole('textbox').first()).toBeVisible();
          await expect(visitor.locator('html')).toHaveAttribute('lang', lang);
          await sweep(visitor, `room ${lang} join card`, [...widths], problems);
        }

        for (const [page] of views) {
          await page.goto(`/room/${code}?lang=${lang}`);
          await expect(page.locator('html')).toHaveAttribute('lang', lang);
          await expect(page.locator('[data-participant-id]')).toHaveCount(2 + BOTS.length);
        }
        for (const [page, widths] of views) await sweep(page, `room ${lang} lobby`, [...widths], problems);

        // The More menu.
        for (const [page, widths] of views) {
          const more = page.locator('header').getByRole('button', { name: ROOM_TEXT[lang].more, exact: true });
          await sweep(page, `room ${lang} More menu open`, [...widths], problems, async () => {
            if (await more.getAttribute('aria-expanded') !== 'true') await more.click();
            await expect(page.getByRole('menu', { name: ROOM_TEXT[lang].more })).toBeVisible();
          });
          await page.keyboard.press('Escape');
          await expect(page.getByRole('menu', { name: ROOM_TEXT[lang].more })).toBeHidden();
        }

        // The story queue, open, with the longest titles.
        const res = await phone.request.post(`/api/rooms/${code}/queue`, { data: { items: STORIES, append: true } });
        expect(res.ok(), 'queue the stories').toBe(true);
        for (const [page, widths] of views) {
          const toggle = page.locator('button[aria-expanded]').filter({ hasText: t.queueTitle }).first();
          // The first story becomes the current one, the rest wait in the queue.
          await expect(toggle).toContainText(String(STORIES.length - 1));
          await sweep(page, `room ${lang} queue open`, [...widths], problems, async () => {
            if (await toggle.getAttribute('aria-expanded') !== 'true') await toggle.click();
            await expect(toggle).toHaveAttribute('aria-expanded', 'true');
          });
          await toggle.click();
        }

        // A revealed round with a wide spread of votes.
        await Promise.all(bots.map((b, i) => b.vote(['1', '100', '8', '?', '☕', '13'][i % 6])));
        const reveal = await phone.request.post(`/api/rooms/${code}/reveal`, { data: {} });
        expect(reveal.ok(), 'reveal the votes').toBe(true);
        for (const [page, widths] of views) {
          await expect(page.locator('[data-participant-id]').filter({ hasText: '100' })).toBeVisible();
          await sweep(page, `room ${lang} revealed`, [...widths], problems);
        }
      } finally {
        for (const b of bots) b.close();
        for (const context of contexts) await context.close();
      }
      expect(problems, problems.join('\n')).toEqual([]);
    });
  }
});
