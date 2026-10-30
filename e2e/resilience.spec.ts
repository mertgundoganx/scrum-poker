import { expect, test } from '@playwright/test';
import { card, createRoom, joinRoom, me, newPerson, participant } from './helpers';

test('a refresh keeps the host a host, with one identity', async ({ browser }) => {
  const host = await newPerson(browser);
  const guest = await newPerson(browser);
  const code = await createRoom(host.page, { name: 'Hostess', room: 'Reload' });
  await joinRoom(guest.page, code, 'Visitor');
  await card(host.page, '5').click();
  const idBefore = await host.page.evaluate(() => localStorage.getItem('scrumPoker_userId'));

  for (let i = 0; i < 3; i++) {
    await host.page.reload();
    await expect(me(host.page, 'Hostess')).toBeVisible();
  }
  // Give a late leave beacon and the stream time to settle, then act.
  await host.page.waitForTimeout(3_000);
  await card(host.page, '8').click();

  const idAfter = await host.page.evaluate(() => localStorage.getItem('scrumPoker_userId'));
  expect(idAfter).toBe(idBefore);
  await expect(card(host.page, '8')).toHaveAttribute('aria-pressed', 'true');
  await expect(guest.page.locator('[data-participant-id]')).toHaveCount(2);
  // Still the host: the remove control is there.
  await participant(host.page, 'Visitor').hover();
  await expect(host.page.getByRole('button', { name: 'Remove: Visitor' })).toBeVisible();

  await host.context.close();
  await guest.context.close();
});

test('someone removed by the host stays out after a reload', async ({ browser }) => {
  const host = await newPerson(browser);
  const guest = await newPerson(browser);
  const code = await createRoom(host.page, { name: 'Keeper', room: 'Ban' });
  await joinRoom(guest.page, code, 'Visitor');
  await participant(host.page, 'Visitor').hover();
  await host.page.getByRole('button', { name: 'Remove: Visitor' }).click();
  await host.page.getByRole('button', { name: 'Remove Visitor?' }).click();
  await expect(guest.page.getByRole('heading', { name: 'Removed from Room' })).toBeVisible();

  await guest.page.reload();
  await guest.page.waitForTimeout(2_000);
  await expect(participant(host.page, 'Visitor')).toHaveCount(0);

  await host.context.close();
  await guest.context.close();
});

test('the idle cookie refresh is accepted', async ({ browser }) => {
  const host = await newPerson(browser);
  const code = await createRoom(host.page, { name: 'Idle', room: 'Refresh' });
  // What RoomClient sends every 30 minutes.
  const status = await host.page.evaluate(async c => (await fetch(`/api/rooms/${c}/refresh`, {
    method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: '{}',
  })).status, code);
  expect(status).toBe(200);
  await host.context.close();
});

test('a refused change says why and keeps what was typed', async ({ browser }) => {
  const host = await newPerson(browser);
  const page = host.page;
  await createRoom(page, { name: 'Editor', room: 'Refusals' });
  const story = page.getByRole('region', { name: 'Story' });
  await story.getByRole('button', { name: /^Stories/ }).click();
  await page.getByRole('textbox', { name: 'Paste stories (one per line)' }).fill('First\nSecond');
  await page.getByRole('button', { name: 'Load Stories' }).click();
  await expect(story.getByRole('heading', { level: 2 })).toHaveText('First');

  // The server says someone else got to the story first (mocked: no second person, no race to time).
  const queue = '**/api/rooms/*/queue';
  await page.route(queue, route => (route.request().method() === 'PATCH'
    ? route.fulfill({ status: 409, json: { error: 'That story is no longer in the queue', code: 'item_gone' } })
    : route.fallback()));
  await story.getByRole('button', { name: 'Edit story: Second' }).click();
  const field = story.getByRole('textbox', { name: 'Edit story' });
  await field.fill('Second, reworded');
  await field.press('Enter');
  await expect(page.getByRole('alert').filter({ hasText: 'Someone else moved, changed or removed that story meanwhile.' })).toBeVisible();
  await expect(field).toHaveValue('Second, reworded');

  // The text is still there to try again, and this time it's taken.
  await page.unroute(queue);
  await field.press('Enter');
  await expect(story.locator('ol li').first()).toContainText('Second, reworded');

  await host.context.close();
});
