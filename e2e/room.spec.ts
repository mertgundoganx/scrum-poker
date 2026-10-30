import { expect, test } from '@playwright/test';
import { card, createRoom, joinRoom, me, newPerson, participant } from './helpers';

test.describe('a planning session with two people', () => {
  test('create, join, vote, reveal, new round', async ({ browser }) => {
    const host = await newPerson(browser);
    const guest = await newPerson(browser);
    const code = await createRoom(host.page, { name: 'Ayla', room: 'Sprint 42' });

    await joinRoom(guest.page, code, 'Baran');
    await expect(participant(host.page, 'Baran')).toBeVisible();

    // Votes stay hidden until the reveal.
    await card(host.page, '5').click();
    await card(guest.page, '8').click();
    await expect(host.page.getByRole('button', { name: /Reveal Votes/ })).toBeEnabled();
    await expect(participant(host.page, 'Baran')).not.toContainText('8');

    await host.page.getByRole('button', { name: /Reveal Votes/ }).click();
    await expect(host.page.getByRole('button', { name: 'New Round' })).toBeVisible({ timeout: 10_000 });
    await expect(participant(host.page, 'Baran')).toContainText('8');
    await expect(participant(guest.page, 'Ayla')).toContainText('5');
    for (const { page } of [host, guest]) {
      await expect(page.getByText(/Avg\.\s*6\.5/)).toBeVisible();
    }

    await guest.page.getByRole('button', { name: 'New Round' }).click();
    for (const { page } of [host, guest]) {
      await expect(page.getByRole('button', { name: /Reveal Votes/ })).toBeDisabled();
      await expect(card(page, '5')).toHaveAttribute('aria-pressed', 'false');
    }

    // Same card from both: consensus.
    await card(host.page, '3').click();
    await card(guest.page, '3').click();
    await guest.page.getByRole('button', { name: /Reveal Votes/ }).click();
    await expect(host.page.getByText('Consensus!').first()).toBeVisible({ timeout: 10_000 });

    // Re-vote keeps the story and clears the votes.
    await host.page.getByRole('button', { name: 'Re-vote' }).click();
    await expect(guest.page.getByRole('button', { name: /Reveal Votes/ })).toBeDisabled();

    await host.context.close();
    await guest.context.close();
  });

  test('the server hides other votes before the reveal', async ({ browser }) => {
    const host = await newPerson(browser);
    const guest = await newPerson(browser);
    const code = await createRoom(host.page, { name: 'Host', room: 'Hidden' });
    await joinRoom(guest.page, code, 'Guest');
    await card(host.page, '13').click();
    // The card lights up at once (optimistic); wait until the vote reached the guest.
    await expect(guest.page.getByRole('progressbar', { name: 'vote' })).toHaveAttribute('aria-valuenow', '1');

    const room = await (await guest.page.request.get(`/api/rooms/${code}`)).json();
    expect(room.votes[room.creatorId]).toBe('✓');
    expect(Object.values(room.votes)).toEqual(['✓']);

    await host.context.close();
    await guest.context.close();
  });

  test('chat reaches the other participant', async ({ browser }) => {
    const host = await newPerson(browser);
    const guest = await newPerson(browser);
    const code = await createRoom(host.page, { name: 'Chatty', room: 'Chat room' });
    await joinRoom(guest.page, code, 'Listener');

    await host.page.getByRole('button', { name: 'Chat', exact: true }).click();
    await host.page.getByRole('textbox', { name: 'Type a message…' }).fill('<b>hello</b> team');
    await host.page.getByRole('button', { name: 'Send', exact: true }).click();

    await expect(guest.page.getByRole('button', { name: 'Chat (1)' })).toBeVisible();
    await guest.page.getByRole('button', { name: 'Chat (1)' }).click();
    // Rendered as text, never as markup.
    await expect(guest.page.getByText('<b>hello</b> team')).toBeVisible();

    await host.context.close();
    await guest.context.close();
  });

  test('story queue feeds the current story', async ({ browser }) => {
    const host = await newPerson(browser);
    await createRoom(host.page, { name: 'Planner', room: 'Queue' });
    const page = host.page;
    const story = page.getByRole('region', { name: 'Story' });

    const heading = story.getByRole('heading', { level: 2 });
    const queueToggle = story.getByRole('button', { name: /^Stories/ });

    await expect(story).toContainText('No stories in queue');
    await queueToggle.click();
    await page.getByRole('textbox', { name: 'Paste stories (one per line)' }).fill('Login page\nPassword reset\nAudit log');
    await page.getByRole('button', { name: 'Load Stories' }).click();
    await expect(heading).toHaveText('Login page');
    await expect(queueToggle).toContainText('2 remaining');

    // Loading more stories adds them; the queued ones stay.
    await page.getByRole('textbox', { name: 'Paste stories (one per line)' }).fill('Export CSV');
    await page.getByRole('button', { name: /Load Stories|stories added/ }).click();
    await expect(queueToggle).toContainText('3 remaining');
    await queueToggle.click();
    await expect(page.getByRole('textbox', { name: 'Paste stories (one per line)' })).toHaveCount(0);

    await card(page, '2').click();
    await page.getByRole('button', { name: /Reveal Votes/ }).click();
    await page.getByRole('button', { name: 'New Round' }).click({ timeout: 10_000 });
    await expect(heading).toHaveText('Password reset');
    await expect(queueToggle).toContainText('2 remaining');

    await host.context.close();
  });

  test('the shared timer runs for everyone', async ({ browser }) => {
    const host = await newPerson(browser);
    const guest = await newPerson(browser);
    const code = await createRoom(host.page, { name: 'Timer', room: 'Clock' });
    await joinRoom(guest.page, code, 'Watcher');

    await host.page.getByRole('button', { name: 'Start', exact: true }).click();
    await expect(guest.page.getByRole('timer')).not.toHaveText('00:00', { timeout: 5_000 });
    await guest.page.getByRole('button', { name: 'Stop', exact: true }).click();
    await expect(host.page.getByRole('button', { name: 'Reset', exact: true })).toBeVisible();

    await host.context.close();
    await guest.context.close();
  });

  test('host removes a participant', async ({ browser }) => {
    const host = await newPerson(browser);
    const guest = await newPerson(browser);
    const code = await createRoom(host.page, { name: 'Boss', room: 'Kick test' });
    await joinRoom(guest.page, code, 'Leaver');

    await participant(host.page, 'Leaver').hover();
    await host.page.getByRole('button', { name: 'Remove: Leaver' }).click();
    await host.page.getByRole('button', { name: 'Remove Leaver?' }).click();

    await expect(guest.page.getByRole('heading', { name: 'Removed from Room' })).toBeVisible({ timeout: 10_000 });
    await expect(participant(host.page, 'Leaver')).toHaveCount(0);

    await host.context.close();
    await guest.context.close();
  });

  test('spectator does not count as a voter', async ({ browser }) => {
    const host = await newPerson(browser);
    const guest = await newPerson(browser);
    const code = await createRoom(host.page, { name: 'Voter', room: 'Spectate' });
    await joinRoom(guest.page, code, 'Watcher');

    await guest.page.getByRole('button', { name: 'Take a break (watch only)' }).click();
    await expect(card(guest.page, '5')).toHaveCount(0);
    await card(host.page, '5').click();
    // One voter, one vote: all voted, so no "1/2" counter on the button.
    await expect(host.page.getByRole('button', { name: /Reveal Votes/ })).not.toContainText('/');

    await guest.page.getByRole('button', { name: 'Back to voting' }).first().click();
    await expect(card(guest.page, '5')).toBeVisible();

    await host.context.close();
    await guest.context.close();
  });

  test('a page refresh keeps you in the room with your vote', async ({ browser }) => {
    const host = await newPerson(browser);
    const guest = await newPerson(browser);
    const code = await createRoom(host.page, { name: 'Stayer', room: 'Refresh' });
    await joinRoom(guest.page, code, 'Other');
    await card(host.page, '8').click();
    await expect(participant(guest.page, 'Stayer')).toBeVisible();

    await host.page.reload();
    await expect(me(host.page, 'Stayer')).toBeVisible();
    await expect(card(host.page, '8')).toHaveAttribute('aria-pressed', 'true');
    // The other person still sees one Stayer, not two.
    await expect(guest.page.locator('[data-participant-id]').filter({ hasText: 'Stayer' })).toHaveCount(1);

    await host.context.close();
    await guest.context.close();
  });

  test('custom and t-shirt decks', async ({ browser }) => {
    const host = await newPerson(browser);
    await createRoom(host.page, { name: 'Decks', room: 'Custom', deck: 'Custom', customCards: 'XS,S,M,L' });
    await expect(card(host.page, 'M')).toBeVisible();
    await expect(card(host.page, '5')).toHaveCount(0);

    await createRoom(host.page, { name: 'Decks', room: 'Shirts', deck: 'T-Shirt' });
    await expect(card(host.page, 'XL')).toBeVisible();
    await host.context.close();
  });
});

test.describe('missing rooms', () => {
  test('an unknown code on the home page', async ({ browser }) => {
    const { page, context } = await newPerson(browser);
    await page.goto('/');
    await page.getByRole('tab', { name: 'Join Room' }).click();
    await page.locator('#home-name').fill('Nobody');
    await page.locator('#home-roomCode').fill('ZZZZZZZZ');
    await page.locator('form').getByRole('button', { name: 'Join Room' }).click();
    await expect(page.locator('p[role=alert]')).toContainText('Room not found');
    await context.close();
  });

  test('an unknown room link', async ({ browser }) => {
    const { page, context } = await newPerson(browser);
    const res = await page.goto('/room/ZZZZZZZZ');
    // A real 404 (not indexed), with the room's own not-found page.
    expect(res?.status()).toBe(404);
    await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
    await expect(page.getByRole('heading', { name: 'Room Not Found' })).toBeVisible();
    await expect(page.getByText('ZZZZZZZZ', { exact: true })).toBeVisible();
    await context.close();
  });
});
