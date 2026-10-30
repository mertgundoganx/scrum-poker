import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { card, createRoom, joinRoom, newPerson } from './helpers';

/** Every page the sitemap lists, as a path. */
async function sitemapPaths(baseURL: string): Promise<string[]> {
  const xml = await (await fetch(new URL('/sitemap.xml', baseURL))).text();
  return [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname))];
}

/** Serious and critical WCAG 2.1 A/AA problems on the page, one line each. */
async function violations(page: Page, where: string): Promise<string[]> {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  return result.violations
    .filter(v => v.impact === 'serious' || v.impact === 'critical')
    .map(v => `${where}: ${v.id} (${v.impact}) — ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(', ')}`);
}

test.describe('accessibility', () => {
  // Every page in light; in dark only the English ones (the other languages use the same components and colors).
  test('every page, light and dark', async ({ page, baseURL }) => {
    test.setTimeout(900_000);
    const problems: string[] = [];
    const paths = await sitemapPaths(baseURL!);
    for (const theme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      for (const path of theme === 'light' ? paths : paths.filter(p => !/^\/(tr|de|fr|it|ar|zh)(\/|$)/.test(p))) {
        await page.goto(path);
        problems.push(...await violations(page, `${theme} ${path}`));
      }
    }
    expect(problems, problems.join('\n')).toEqual([]);
  });

  test('a room with two people, after the reveal', async ({ browser }) => {
    const host = await newPerson(browser);
    const guest = await newPerson(browser);
    const code = await createRoom(host.page, { name: 'Host', room: 'Access' });
    await joinRoom(guest.page, code, 'Guest');
    await host.page.emulateMedia({ reducedMotion: 'reduce' });
    const problems = await violations(host.page, 'room');
    await card(host.page, '5').click();
    await card(guest.page, '8').click();
    await expect(host.page.getByRole('progressbar', { name: 'vote' })).toHaveAttribute('aria-valuenow', '2');
    await host.page.getByRole('button', { name: /Reveal Votes/ }).click();
    await expect(host.page.getByRole('button', { name: 'New Round' })).toBeVisible({ timeout: 10_000 });
    problems.push(...await violations(host.page, 'room revealed'));
    expect(problems, problems.join('\n')).toEqual([]);
    await host.context.close();
    await guest.context.close();
  });
});
