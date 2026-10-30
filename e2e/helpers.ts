import { expect, type Browser, type BrowserContext, type Page } from '@playwright/test';

import { randomBytes } from 'node:crypto';

/** A random private IPv4 address: the server's limits count per address, across tests. */
export function randomIp(): string {
  const [a, b, c] = randomBytes(3);
  return `10.${a}.${b}.${c}`;
}

/**
 * A fresh browser context with its own client IP. The app rate-limits per IP
 * (the rightmost X-Forwarded-For entry), so every simulated person gets one.
 */
export async function newPerson(browser: Browser): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext({ extraHTTPHeaders: { 'X-Forwarded-For': randomIp() } });
  const page = await context.newPage();
  return { context, page };
}

/** Create a room from the home page; returns its code. */
export async function createRoom(page: Page, opts: { name: string; room: string; deck?: string; customCards?: string }): Promise<string> {
  await page.goto('/');
  await page.locator('#home-name').fill(opts.name);
  await page.locator('#home-roomName').fill(opts.room);
  if (opts.deck) await page.getByRole('group', { name: 'Deck type' }).getByRole('button', { name: opts.deck }).click();
  if (opts.customCards) await page.locator('#home-customCards').fill(opts.customCards);
  await page.getByRole('button', { name: 'Create Room' }).click();
  await page.waitForURL(/\/room\/[A-Z0-9]{8}$/);
  const code = page.url().split('/').pop()!;
  await expect(me(page, opts.name)).toBeVisible();
  return code;
}

/** Open a room link as someone new and join through the name form. */
export async function joinRoom(page: Page, code: string, name: string): Promise<void> {
  await page.goto(`/room/${code}`);
  await page.getByRole('textbox', { name: 'Enter your name' }).fill(name);
  await page.getByRole('button', { name: /^Join/ }).click();
  await expect(me(page, name)).toBeVisible();
}

/** Signed into the room as this name (the profile button in the header). */
export function me(page: Page, name: string) {
  return page.getByRole('button', { name: `Profile: ${name}` });
}

/** Someone else's entry in the participant list (your own reads "You"). */
export function participant(page: Page, name: string) {
  return page.locator('[data-participant-id]').filter({ hasText: name }).first();
}

export function card(page: Page, value: string) {
  return page.getByRole('button', { name: `Vote ${value}`, exact: true });
}
