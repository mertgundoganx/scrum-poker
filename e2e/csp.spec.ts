import { expect, test, type APIResponse, type PlaywrightWorkerArgs } from '@playwright/test';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { card, me, randomIp } from './helpers';

/** A room made through the API; returns its code. */
async function newRoom(playwright: PlaywrightWorkerArgs['playwright'], baseURL: string): Promise<string> {
  const api = await playwright.request.newContext({ baseURL, extraHTTPHeaders: { 'X-Forwarded-For': randomIp() } });
  const res = await api.post('/api/rooms', { data: { name: 'CSP room', creatorId: randomUUID(), creatorName: 'Host' } });
  expect(res.status()).toBe(201);
  const { id } = await res.json();
  await api.dispose();
  return id;
}

/** The response's Content-Security-Policy, as directive → sources. Only one: a browser enforces every one it gets. */
function policyOf(res: APIResponse): Map<string, string[]> {
  const values = res.headersArray().filter(h => h.name.toLowerCase() === 'content-security-policy');
  expect(values).toHaveLength(1);
  return new Map(values[0].value.split(';').map(d => d.trim()).filter(Boolean).map(d => {
    const [name, ...sources] = d.split(/\s+/);
    return [name, sources] as const;
  }));
}

/** The HTML's inline scripts that run, attributes and text as sent (JSON-LD is data: CSP leaves it alone). */
function inlineScripts(html: string) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .map(([, attrs, text]) => ({ attrs, text, type: /\btype="([^"]*)"/.exec(attrs)?.[1] }))
    .filter(s => !/\bsrc=/.test(s.attrs) && (!s.type || s.type === 'text/javascript' || s.type === 'module'));
}

const sha256 = (text: string) => `'sha256-${createHash('sha256').update(text).digest('base64')}'`;

/** What the page saw while it loaded (collected by an init script). */
type Probe = { violations: string[]; darkAtBody?: boolean; ownerKey?: string; beacon?: number };

test.describe('Content-Security-Policy', () => {
  test('the room page runs only nonced or hashed inline scripts, with a fresh nonce each time', async ({ playwright, baseURL }) => {
    const code = await newRoom(playwright, baseURL!);
    const api = await playwright.request.newContext({ baseURL, extraHTTPHeaders: { 'X-Forwarded-For': randomIp() } });
    const nonces: string[] = [];
    for (const path of [`/room/${code}`, `/room/${code}?lang=de`]) {
      const res = await api.get(path);
      expect(res.status()).toBe(200);
      const policy = policyOf(res);
      const scriptSrc = policy.get('script-src')!;
      expect(scriptSrc).not.toContain("'unsafe-inline'");
      // strict-dynamic would ignore the host list, and with it Cloudflare's beacon.
      expect(scriptSrc).not.toContain("'strict-dynamic'");
      expect(scriptSrc).toContain('https://static.cloudflareinsights.com');
      const nonce = scriptSrc.map(s => /^'nonce-(.+)'$/.exec(s)?.[1]).filter(Boolean);
      expect(nonce).toHaveLength(1);
      nonces.push(nonce[0]!);

      const scripts = inlineScripts(await res.text());
      let nonced = 0, hashed = 0;
      for (const { attrs, text } of scripts) {
        if (attrs.includes(`nonce="${nonce[0]}"`)) nonced++;
        else if (scriptSrc.includes(sha256(text))) hashed++;
        else throw new Error(`Inline script the policy blocks: <script${attrs}>${text.slice(0, 120)}`);
      }
      expect(nonced).toBeGreaterThan(0); // Next.js's own
      expect(hashed).toBe(3); // theme, service worker, owner key (lib/inlineScripts.ts)
    }
    expect(nonces[0]).not.toBe(nonces[1]);

    // Everything but script-src is the other pages' policy.
    const room = policyOf(await api.get(`/room/${code}`));
    const guide = policyOf(await api.get('/guide'));
    room.delete('script-src');
    guide.delete('script-src');
    expect(room).toEqual(guide);
    await api.dispose();
  });

  test('content pages keep the static policy and stay static', async ({ playwright, baseURL }) => {
    const api = await playwright.request.newContext({ baseURL, extraHTTPHeaders: { 'X-Forwarded-For': randomIp() } });
    const first = await api.get('/guide');
    expect(first.status()).toBe(200);
    const scriptSrc = policyOf(first).get('script-src')!;
    expect(scriptSrc).toContain("'unsafe-inline'");
    expect(scriptSrc.some(s => s.startsWith("'nonce-"))).toBe(false);
    const html = await first.text();
    expect(html).not.toContain(' nonce=');
    // A development server renders every page per request: built once only in production.
    if (!scriptSrc.includes("'unsafe-eval'")) {
      // Next may send the header twice (Playwright joins them: '1, 1').
      expect(first.headers()['x-nextjs-prerender']).toMatch(/^1(, 1)*$/);
      expect(await (await api.get('/guide')).text()).toBe(html);
    }
    await api.dispose();
  });

  test('the room loads without a violation: theme before paint, owner key, beacon, voting', async ({ browser, playwright, baseURL }) => {
    const code = await newRoom(playwright, baseURL!);
    const context = await browser.newContext({ colorScheme: 'dark', extraHTTPHeaders: { 'X-Forwarded-For': randomIp() } });
    // The page below comes from route.fulfill, which Chromium counts as a public site:
    // without this its requests to a server on localhost would be blocked.
    await context.grantPermissions(['local-network-access']);
    const page = await context.newPage();
    const consoleErrors: string[] = [];
    page.on('console', m => {
      if (m.type() === 'error' && /Content Security Policy/i.test(m.text())) consoleErrors.push(m.text());
    });
    await page.addInitScript(() => {
      const probe: Probe = { violations: [] };
      (window as unknown as { __csp: Probe }).__csp = probe;
      document.addEventListener('securitypolicyviolation', e => {
        probe.violations.push(`${e.violatedDirective} ${e.blockedURI} ${e.sample}`);
      });
      // The theme as the parser reaches <body>, i.e. before the first paint.
      new MutationObserver((_, observer) => {
        if (!document.body) return;
        probe.darkAtBody = document.documentElement.classList.contains('dark');
        observer.disconnect();
      }).observe(document, { childList: true, subtree: true });
      // Only the inline owner-key script writes this key (the room reads and removes it).
      const setItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key: string, value: string) {
        if (key === 'scrumPoker_ownerKey') probe.ownerKey = value;
        return setItem.call(this, key, value);
      };
    });
    // Cloudflare adds its analytics beacon to the HTML at the edge, without a nonce: do the
    // same here, with a stand-in beacon, so the policy has to allow it by its host.
    await page.route('https://static.cloudflareinsights.com/**', route => route.fulfill({
      contentType: 'text/javascript',
      body: 'window.__csp.beacon = 1;',
    }));
    await page.route(url => url.pathname === `/room/${code}`, async route => {
      if (route.request().resourceType() !== 'document') return route.continue();
      const response = await route.fetch();
      const headers = { ...response.headers() };
      delete headers['content-length'];
      delete headers['content-encoding'];
      const html = await response.text();
      const at = html.lastIndexOf('</body>');
      const beacon = `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"test"}'></script>`;
      await route.fulfill({ status: response.status(), headers, body: html.slice(0, at) + beacon + html.slice(at) });
    });

    const ownerKey = randomBytes(32).toString('base64url');
    await page.goto(`/room/${code}#owner=${ownerKey}`);
    await page.getByRole('textbox', { name: 'Enter your name' }).fill('Guest');
    await page.getByRole('button', { name: /^Join/ }).click();
    await expect(me(page, 'Guest')).toBeVisible();
    await card(page, '5').click();
    await expect(card(page, '5')).toHaveAttribute('aria-pressed', 'true');

    const probe = () => page.evaluate(() => (window as unknown as { __csp: Probe }).__csp);
    await expect.poll(async () => (await probe()).beacon).toBe(1);
    const seen = await probe();
    expect(seen.darkAtBody).toBe(true);
    expect(seen.ownerKey).toBe(`${code} ${ownerKey}`);
    expect(new URL(page.url()).hash).toBe('');
    expect(seen.violations).toEqual([]);
    expect(consoleErrors).toEqual([]);
    await context.close();
  });
});
