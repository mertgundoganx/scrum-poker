import { expect, test, type Page } from '@playwright/test';

/**
 * Page transitions (app/PageTransition.tsx, app/transitions.css). What a view transition
 * animated is read when it starts, from the browser's own animations: which pictures moved
 * (the old page, the new one, the header) and how (opacity, translate).
 */

type Animated = { pseudo: string; name: string; opacity: string[]; translate: string[] };
declare global {
  interface Window { __transitions: Animated[][]; __reveal?: string[] | null }
}

/** Records each view transition this page starts (client-side) and the one it arrived with (full load). */
async function recordTransitions(page: Page) {
  await page.addInitScript(() => {
    window.__transitions = [];
    const record = (vt: ViewTransition) => {
      const list: Animated[] = [];
      window.__transitions.push(list);
      vt.ready.then(() => {
        for (const a of document.documentElement.getAnimations({ subtree: true })) {
          const effect = a.effect as KeyframeEffect | null;
          if (!effect?.pseudoElement?.startsWith('::view-transition-')) continue;
          const frames = effect.getKeyframes();
          list.push({
            pseudo: effect.pseudoElement,
            name: (a as CSSAnimation).animationName ?? '',
            opacity: frames.map(f => String(f.opacity ?? '')),
            translate: frames.map(f => String(f.translate ?? '')),
          });
        }
      }, () => {});
    };
    const start = Document.prototype.startViewTransition;
    Document.prototype.startViewTransition = function (this: Document, arg?: Parameters<Document['startViewTransition']>[0]) {
      const vt = start.call(this, arg);
      record(vt);
      return vt;
    } as Document['startViewTransition'];
    addEventListener('pagereveal', e => {
      const vt = (e as PageRevealEvent).viewTransition;
      window.__reveal = vt ? [...vt.types] : null;
      if (vt) record(vt);
    });
  });
}

/** The animations of the last view transition, once it has started. */
async function lastTransition(page: Page): Promise<Animated[]> {
  await page.waitForFunction(() => (window.__transitions.at(-1)?.length ?? 0) > 0);
  return page.evaluate(() => window.__transitions.at(-1)!);
}

/** The new page's and the old page's pictures (React names them; the header has its own name). */
const pageIn = (anims: Animated[]) => anims.filter(a => a.pseudo.startsWith('::view-transition-new(') && a.name === 'page-in');
const pageOut = (anims: Animated[]) => anims.filter(a => a.pseudo.startsWith('::view-transition-old(') && a.name === 'page-out');

test.describe('page transitions', () => {
  test.beforeEach(async ({ page }) => {
    await recordTransitions(page);
  });

  test('a link swaps the page with a short slide and fade, the header holding still', async ({ page }) => {
    await page.goto('/guide');
    await page.waitForLoadState('networkidle');
    await page.locator('header nav a[href="/blog"]').first().click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.locator('h1')).toBeVisible();

    const anims = await lastTransition(page);
    // The old page leaves, the new one rises in from below (across: neither under the other).
    expect(pageOut(anims).length).toBeGreaterThan(0);
    expect(pageIn(anims).length).toBeGreaterThan(0);
    for (const a of pageIn(anims)) expect(a.translate[0]).toBe('0px 10px');
    // The header crossfades in place: no slide, and its frame (group) does not move.
    const header = anims.filter(a => a.pseudo.includes('(site-header)'));
    expect(header.map(a => a.name).sort()).toEqual(['page-fade-in', 'page-fade-out']);
    expect(anims.some(a => a.pseudo === '::view-transition-group(site-header)')).toBe(false);

    // The new page starts at the top, and a screen reader hears its name (the route announcer:
    // the document title, "Blog & Guides | Scrum Poker Online", or the heading when there's none yet).
    expect(await page.evaluate(() => scrollY)).toBe(0);
    const heading = (await page.locator('h1').textContent())?.trim() ?? '';
    await expect.poll(() => page.evaluate(() => document.querySelector('next-route-announcer')?.shadowRoot?.textContent ?? ''))
      .toContain(heading);
  });

  test('into a post and back up: the slide follows the way the visitor went', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    // A post further down the list, scrolled to (as clicking it would).
    const post = page.locator('main a[href^="/blog/"]').nth(3);
    await post.scrollIntoViewIfNeeded();
    const listScroll = await page.evaluate(() => scrollY);
    expect(listScroll).toBeGreaterThan(0);
    const href = (await post.getAttribute('href'))!;
    const atPost = new RegExp(`${href}$`);
    await post.click();
    await expect(page).toHaveURL(atPost);
    // Deeper: from the end of the line (the right, in English). The post starts at the top.
    for (const a of pageIn(await lastTransition(page))) expect(a.translate[0]).toBe('14px');
    expect(await page.evaluate(() => scrollY)).toBe(0);

    // The browser's back button swaps at once (Next.js restores the page outside a
    // transition, so the browser can put it back where it was): the list, as it was left.
    const transitions = await page.evaluate(() => window.__transitions.length);
    await page.goBack();
    await expect(page).toHaveURL(/\/blog$/);
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(listScroll);
    expect(await page.evaluate(() => window.__transitions.length)).toBe(transitions);

    // Forward, then the breadcrumb back to the list: from the start of the line, at the top.
    await page.goForward();
    await expect(page).toHaveURL(atPost);
    await page.locator('main nav a[href="/blog"]').first().click();
    await expect(page).toHaveURL(/\/blog$/);
    for (const a of pageIn(await lastTransition(page))) expect(a.translate[0]).toBe('-14px');
    expect(await page.evaluate(() => scrollY)).toBe(0);
  });

  test('in Arabic, "deeper" comes from the left', async ({ page }) => {
    await page.goto('/ar/blog');
    await page.waitForLoadState('networkidle');
    await page.locator('main a[href^="/ar/blog/"]').first().click();
    await expect(page).toHaveURL(/\/ar\/blog\/.+/);
    for (const a of pageIn(await lastTransition(page))) expect(a.translate[0]).toBe('-14px');
    // React shrinks the overlay to nothing; pinned right, it would carry the picture off screen.
    expect(await page.evaluate(() => [...document.styleSheets].some(s => {
      try { return [...s.cssRules].some(r => r.cssText.includes('[dir="rtl"]::view-transition') && r.cssText.includes('right: auto')); } catch { return false; }
    }))).toBe(true);
  });

  test('a link within the page (contents) scrolls there without a transition', async ({ page }) => {
    await page.goto('/blog/fibonacci-vs-tshirt');
    await page.waitForLoadState('networkidle');
    const before = await page.evaluate(() => window.__transitions.length);
    const link = page.locator('a[href^="#"]:visible').nth(2);
    const hash = (await link.getAttribute('href'))!;
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${hash}$`));
    await expect.poll(() => page.evaluate(id => Math.round(document.getElementById(id)!.getBoundingClientRect().top), decodeURIComponent(hash.slice(1))))
      .toBeLessThan(200);
    expect(await page.evaluate(() => window.__transitions.length)).toBe(before);
  });

  test('with reduced motion, pages only fade', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await recordTransitions(page);
    await page.goto('/guide');
    await page.waitForLoadState('networkidle');
    await page.locator('header nav a[href="/blog"]').first().click();
    await expect(page).toHaveURL(/\/blog$/);
    const anims = await lastTransition(page);
    expect(anims.some(a => a.name === 'page-fade-in')).toBe(true);
    for (const a of anims) expect(a.translate.filter(t => t && t !== 'none')).toEqual([]);
    await context.close();
  });

  test('switching language (a full page load) keeps the header and fades the page in', async ({ page }) => {
    await page.goto('/guide');
    await page.waitForLoadState('networkidle');
    await page.locator('header button[aria-haspopup="menu"]').click();
    await page.locator('header [role="menu"] a[hreflang="de"]').click();
    await expect(page).toHaveURL(/\/de\/guide$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
    // Chromium has cross-document view transitions; both pages opt in with @view-transition.
    expect(await page.evaluate(() => window.__reveal)).toEqual(['page-load']);
    const anims = await lastTransition(page);
    expect(anims.find(a => a.pseudo === '::view-transition-new(root)' && a.name === 'page-in')?.translate[0]).toBe('0px 10px');
    expect(anims.some(a => a.pseudo === '::view-transition-new(site-header)')).toBe(true);
    expect(anims.some(a => a.pseudo === '::view-transition-old(site-header)')).toBe(true);
  });
});
