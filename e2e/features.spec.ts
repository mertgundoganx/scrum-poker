import { readFile } from 'node:fs/promises';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { card, createRoom, joinRoom, me, newPerson, participant } from './helpers';

async function setting(page: Page, name: string) {
  await page.getByRole('button', { name: 'More' }).click();
  await page.getByRole('menuitemcheckbox', { name }).click();
  await page.keyboard.press('Escape');
}

async function loadStories(page: Page, stories: string) {
  const story = page.getByRole('region', { name: 'Story' });
  await story.getByRole('button', { name: /^Stories/ }).click();
  await page.getByRole('textbox', { name: 'Paste stories (one per line)' }).fill(stories);
  await page.getByRole('button', { name: 'Load Stories' }).click();
}

/** Alone in the room: vote, reveal and start the next round. */
async function playRound(page: Page, value: string) {
  await card(page, value).click();
  await expect(page.getByRole('progressbar', { name: 'vote' })).toHaveAttribute('aria-valuenow', '1');
  await page.getByRole('button', { name: /Reveal Votes/ }).click();
  await page.getByRole('button', { name: 'New Round' }).click({ timeout: 10_000 });
}

test('the host hands over the role', async ({ browser }) => {
  const host = await newPerson(browser);
  const guest = await newPerson(browser);
  const code = await createRoom(host.page, { name: 'Old Host', room: 'Handover' });
  await joinRoom(guest.page, code, 'New Host');

  await participant(host.page, 'New Host').hover();
  await host.page.getByRole('button', { name: 'Make New Host the host' }).click();
  await host.page.getByRole('button', { name: 'Make New Host the host' }).click();

  // The new host can now remove people; the old one can't.
  // The role reaches the guest over the stream, and seats reorder when it does: hover again until it shows.
  await expect(async () => {
    await participant(guest.page, 'Old Host').hover();
    await expect(guest.page.getByRole('button', { name: 'Remove: Old Host' })).toBeVisible({ timeout: 1_000 });
  }).toPass();
  await participant(host.page, 'New Host').hover();
  await expect(host.page.getByRole('button', { name: 'Remove: New Host' })).toHaveCount(0);

  await host.context.close();
  await guest.context.close();
});

test('the final estimate is recorded with the round', async ({ browser }) => {
  const host = await newPerson(browser);
  const guest = await newPerson(browser);
  const code = await createRoom(host.page, { name: 'Lead', room: 'Final' });
  await joinRoom(guest.page, code, 'Dev');
  await loadStories(host.page, 'Checkout');

  await card(host.page, '5').click();
  await card(guest.page, '8').click();
  // Reveal only once the guest's card has reached the server.
  await expect(host.page.getByRole('progressbar', { name: 'vote' })).toHaveAttribute('aria-valuenow', '2');
  await host.page.getByRole('button', { name: /Reveal Votes/ }).click();
  const final = host.page.getByRole('radiogroup', { name: 'Final estimate' });
  await expect(final).toBeVisible({ timeout: 10_000 });
  await final.getByRole('radio', { name: '8' }).click();
  await host.page.getByRole('button', { name: 'New Round' }).click();

  await guest.page.getByRole('button', { name: /^History/ }).click();
  const round = guest.page.getByText('Checkout').locator('xpath=ancestor::div[contains(@class,"px-4")][1]');
  await expect(round.getByTitle('Final estimate')).toContainText('8');

  await host.context.close();
  await guest.context.close();
});

test('stories can be skipped, edited and reordered', async ({ browser }) => {
  const host = await newPerson(browser);
  await createRoom(host.page, { name: 'PO', room: 'Backlog' });
  const page = host.page;
  const story = page.getByRole('region', { name: 'Story' });
  const heading = story.getByRole('heading', { level: 2 });
  await loadStories(page, 'First\nSecond\nThird');
  await expect(heading).toHaveText('First');

  // Skip: First goes to the back, Second is up.
  await story.getByRole('button', { name: 'Skip for now' }).click();
  await expect(heading).toHaveText('Second');

  // Edit the current story without losing it.
  await story.getByRole('button', { name: 'Edit story', exact: true }).click();
  await story.getByRole('textbox', { name: 'Edit story' }).fill('Second, reworded');
  await story.getByRole('button', { name: 'Save' }).click();
  await expect(heading).toHaveText('Second, reworded');

  // Queue is now Third, First: move First up.
  await page.getByRole('button', { name: 'Move up: First' }).click();
  await expect(story.locator('ol li').first()).toContainText('First');

  await host.context.close();
});

test('auto-reveal and anonymous voting', async ({ browser }) => {
  const host = await newPerson(browser);
  const guest = await newPerson(browser);
  const code = await createRoom(host.page, { name: 'Facilitator', room: 'Settings' });
  await joinRoom(guest.page, code, 'Voter');
  await setting(host.page, 'Reveal when everyone has voted');
  await setting(host.page, 'Anonymous voting');

  await card(host.page, '3').click();
  await card(guest.page, '13').click();
  // Revealed without anyone pressing the button…
  await expect(guest.page.getByRole('button', { name: 'New Round' })).toBeVisible({ timeout: 10_000 });
  // …and anonymously: the cards are in the results, not on the people.
  await expect(guest.page.getByText('Anonymous voting: the cards are shown without names.')).toBeVisible();
  await expect(participant(guest.page, 'Facilitator')).not.toContainText('3');

  await host.context.close();
  await guest.context.close();
});

test('the host keeps a room, finds it on the home page and opens it elsewhere as host', async ({ browser }) => {
  test.setTimeout(60_000);
  const host = await newPerson(browser);
  const page = host.page;
  const code = await createRoom(page, { name: 'Keeper', room: 'Weekly planning' });
  await page.getByRole('button', { name: 'More' }).click();
  const keep = page.getByRole('menuitemcheckbox', { name: 'Keep this room' });
  await keep.click();
  await expect(keep).toHaveAttribute('aria-checked', 'true');
  await expect(page.getByRole('menuitem', { name: 'Copy owner link' })).toBeVisible();
  await page.keyboard.press('Escape');
  const key = await page.evaluate(id => JSON.parse(localStorage.getItem('scrumPoker_ownedRooms') ?? '[]').find((r: { id: string }) => r.id === id)?.key, code);
  expect(key).toMatch(/^[A-Za-z0-9_-]{43}$/);

  // Another device: the owner link makes it an owner too, and leaves the address bar clean.
  const laptop = await newPerson(browser);
  await laptop.page.goto(`/room/${code}#owner=${key}`);
  await laptop.page.getByRole('textbox', { name: 'Enter your name' }).fill('Keeper on laptop');
  await laptop.page.getByRole('button', { name: /^Join/ }).click();
  await expect(laptop.page).toHaveURL(new RegExp(`/room/${code}$`));
  await laptop.page.getByRole('button', { name: 'More' }).click();
  await expect(laptop.page.getByRole('menuitem', { name: 'Copy owner link' })).toBeVisible();
  await laptop.page.keyboard.press('Escape');

  await page.goto('/');
  const yours = page.getByRole('link', { name: /Weekly planning/ });
  await expect(yours).toHaveAttribute('href', `/room/${code}`);
  // Asked first: the owner link stops working for good.
  await page.getByRole('button', { name: 'Stop keeping: Weekly planning' }).click();
  const ask = page.getByRole('alertdialog');
  await expect(ask).toContainText('Stop keeping this room?');
  await ask.getByRole('button', { name: 'Stop keeping' }).click();
  await expect(yours).toHaveCount(0);
  // The list drops it at once; the request behind it may still be on its way.
  await expect.poll(async () => (await (await laptop.page.request.get(`/api/rooms/${code}`)).json()).kept).toBe(false);

  await host.context.close();
  await laptop.context.close();
});

test('stopping keeping a room asks first', async ({ browser }) => {
  const host = await newPerson(browser);
  const page = host.page;
  await createRoom(page, { name: 'Keeper', room: 'Asked' });
  await page.getByRole('button', { name: 'More' }).click();
  const keep = page.getByRole('menuitemcheckbox', { name: 'Keep this room' });
  await keep.click();
  await expect(keep).toHaveAttribute('aria-checked', 'true');

  const ask = page.getByRole('alertdialog');
  await keep.click();
  await expect(ask).toHaveAccessibleName('Stop keeping this room?');
  await expect(ask).toContainText('Its owner link stops working');
  // Cancel has the focus: a stray Enter keeps the room.
  await expect(ask.getByRole('button', { name: 'Cancel' })).toBeFocused();
  // Escape keeps it.
  await page.keyboard.press('Escape');
  await expect(ask).toHaveCount(0);
  if (!(await keep.isVisible())) await page.getByRole('button', { name: 'More' }).click();
  await expect(keep).toHaveAttribute('aria-checked', 'true');

  await keep.click();
  await ask.getByRole('button', { name: 'Stop keeping' }).click();
  if (!(await keep.isVisible())) await page.getByRole('button', { name: 'More' }).click();
  await expect(keep).toHaveAttribute('aria-checked', 'false');

  await host.context.close();
});

test('a forged owner link leaves the owner key alone', async ({ browser }) => {
  const host = await newPerson(browser);
  const page = host.page;
  const code = await createRoom(page, { name: 'Keeper', room: 'Forged' });
  await page.getByRole('button', { name: 'More' }).click();
  await page.getByRole('menuitemcheckbox', { name: 'Keep this room' }).click();
  await expect(page.getByRole('menuitem', { name: 'Copy owner link' })).toBeVisible();
  await page.keyboard.press('Escape');
  const storedKey = () => page.evaluate(id => JSON.parse(localStorage.getItem('scrumPoker_ownedRooms') ?? '[]').find((r: { id: string }) => r.id === id)?.key, code);
  const key = await storedKey();
  expect(key).toMatch(/^[A-Za-z0-9_-]{43}$/);

  // A well-formed key that isn't the room's, opened in the owner's browser
  // (from another page: a fragment change alone doesn't load the room again).
  const forged = key.startsWith('A') ? 'B'.repeat(43) : 'A'.repeat(43);
  await page.goto('/');
  await page.goto(`/room/${code}#owner=${forged}`);
  await expect(me(page, 'Keeper')).toBeVisible();
  await expect(page).toHaveURL(new RegExp(`/room/${code}$`));
  // Still the owner: the server refused the link's key and took the stored one.
  await page.getByRole('button', { name: 'More' }).click();
  await expect(page.getByRole('menuitem', { name: 'Copy owner link' })).toBeVisible();
  expect(await storedKey()).toBe(key);

  await host.context.close();
});

test('new rooms use the Scrum deck', async ({ browser }) => {
  const host = await newPerson(browser);
  await createRoom(host.page, { name: 'Dealer', room: 'Scrum deck' });
  for (const value of ['0', '½', '20', '40', '100', '?', '☕']) await expect(card(host.page, value)).toBeVisible();
  await expect(card(host.page, '21')).toHaveCount(0);
  await host.context.close();
});

test('only the host runs the round when the host asks for it', async ({ browser }) => {
  const host = await newPerson(browser);
  const guest = await newPerson(browser);
  const code = await createRoom(host.page, { name: 'Lead', room: 'Host runs' });
  await joinRoom(guest.page, code, 'Dev');
  await setting(host.page, 'Only the host runs the round');

  await expect(guest.page.getByText('The host runs the round')).toBeVisible();
  await expect(guest.page.getByRole('button', { name: /Reveal Votes/ })).toHaveCount(0);
  await expect(guest.page.getByRole('button', { name: 'Start', exact: true })).toHaveCount(0);

  // The guest still votes; the host reveals, for everyone.
  await card(guest.page, '8').click();
  await card(host.page, '5').click();
  await expect(host.page.getByRole('progressbar', { name: 'vote' })).toHaveAttribute('aria-valuenow', '2');
  await host.page.getByRole('button', { name: /Reveal Votes/ }).click();
  await expect(guest.page.getByText(/Avg\.\s*6\.5/)).toBeVisible({ timeout: 10_000 });
  await expect(guest.page.getByRole('button', { name: 'New Round' })).toHaveCount(0);
  // The server refuses it as well.
  expect((await guest.page.request.post(`/api/rooms/${code}/reset`, { data: {} })).status()).toBe(403);

  await host.context.close();
  await guest.context.close();
});

test('a closed room keeps new people out, not the people in it', async ({ browser }) => {
  const host = await newPerson(browser);
  const guest = await newPerson(browser);
  const code = await createRoom(host.page, { name: 'Door', room: 'Closed' });
  await joinRoom(guest.page, code, 'Inside');
  await setting(host.page, 'Close to new people');
  await expect(guest.page.getByText('Closed', { exact: true }).first()).toBeVisible();

  const late = await newPerson(browser);
  await late.page.goto(`/room/${code}`);
  await late.page.getByRole('textbox', { name: 'Enter your name' }).fill('Late');
  await late.page.getByRole('button', { name: /^Join/ }).click();
  await expect(late.page.getByText('This room is closed to new people.')).toBeVisible();

  await guest.page.reload();
  await expect(me(guest.page, 'Inside')).toBeVisible();
  await expect(participant(host.page, 'Inside')).toBeVisible();

  await host.context.close();
  await guest.context.close();
  await late.context.close();
});

test('the join form says when the name is missing', async ({ browser }) => {
  const host = await newPerson(browser);
  const code = await createRoom(host.page, { name: 'Host', room: 'Names' });
  const guest = await newPerson(browser);
  await guest.page.goto(`/room/${code}`);
  await guest.page.getByRole('button', { name: /^Join/ }).click();
  await expect(guest.page.getByRole('alert').filter({ hasText: 'Please enter your name.' })).toBeVisible();
  await host.context.close();
  await guest.context.close();
});

test('the timer counts down from a chosen length', async ({ browser }) => {
  const host = await newPerson(browser);
  const guest = await newPerson(browser);
  const code = await createRoom(host.page, { name: 'Clock', room: 'Countdown' });
  await joinRoom(guest.page, code, 'Watcher');

  await host.page.getByRole('button', { name: 'Timer length' }).click();
  await host.page.getByRole('menuitemradio', { name: '1 min', exact: true }).click();
  const timer = guest.page.getByRole('timer');
  await expect(timer).toHaveText(/^(01:00|00:5\d)$/, { timeout: 5_000 });
  await expect(timer).toHaveText(/^00:5\d$/, { timeout: 5_000 });

  // Back to counting up, from zero.
  await host.page.getByRole('button', { name: 'Timer length' }).click();
  await host.page.getByRole('menuitemradio', { name: 'Count up' }).click();
  await expect(timer).toHaveText('00:00');

  await host.context.close();
  await guest.context.close();
});

test('a finished story can be estimated again from the history', async ({ browser }) => {
  const host = await newPerson(browser);
  const page = host.page;
  await createRoom(page, { name: 'PO', room: 'Again' });
  const story = page.getByRole('region', { name: 'Story' });
  const heading = story.getByRole('heading', { level: 2 });
  await loadStories(page, 'Checkout\nSearch');
  await expect(heading).toHaveText('Checkout');
  await playRound(page, '5');
  await expect(heading).toHaveText('Search');

  await page.getByRole('button', { name: /^History/ }).click();
  await page.getByRole('button', { name: 'Estimate again: Checkout' }).click();
  // Search is being estimated: Checkout is next in line.
  await expect(story.getByRole('button', { name: /^Stories/ })).toContainText('1 remaining');
  await expect(story.locator('ol li').first()).toContainText('Checkout');

  await host.context.close();
});

test('the session downloads as a CSV file for trackers', async ({ browser }) => {
  const host = await newPerson(browser);
  const page = host.page;
  const code = await createRoom(page, { name: 'Planner', room: 'Export' });
  await loadStories(page, 'PAY-12 Checkout');
  // Alone with ½: the suggested (and so the final) estimate is ½.
  await playRound(page, '½');

  await page.getByRole('button', { name: /^History/ }).click();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Download CSV' }).click(),
  ]);
  expect(download.suggestedFilename()).toMatch(new RegExp(`^scrum-poker-${code}-\\d{4}-\\d{2}-\\d{2}\\.csv$`));
  const text = await readFile(await download.path(), 'utf8');
  expect(text.charCodeAt(0)).toBe(0xfeff);
  const lines = text.slice(1).trim().split(/\r?\n/);
  expect(lines[0]).toBe('"Issue key","Summary","Story Points","Final","Average","Median","Votes"');
  expect(lines[1]).toBe('"PAY-12","Checkout","0.5","½","0.5","0.5","Planner: ½"');

  await host.context.close();
});

test('stories come in from a CSV file or pasted cells, after a preview', async ({ browser }) => {
  const host = await newPerson(browser);
  const page = host.page;
  await createRoom(page, { name: 'Importer', room: 'Import' });
  const story = page.getByRole('region', { name: 'Story' });
  const heading = story.getByRole('heading', { level: 2 });
  await story.getByRole('button', { name: /^Stories/ }).click();

  // Pasted spreadsheet cells with a header: a preview, nothing added yet.
  const textarea = page.getByRole('textbox', { name: 'Paste stories (one per line)' });
  await textarea.evaluate(el => {
    const data = new DataTransfer();
    data.setData('text/plain', 'Key\tTitle\nWEB-7\tSign up\nWEB-8\tSign in');
    el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
  });
  await expect(page.getByText('Found 2 stories (columns: Key + Title)')).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();

  // A Jira export: a BOM, quoted commas, doubled quotes, a line break in a field, and a duplicate.
  const csv = String.fromCharCode(0xfeff) + [
    'Issue key,Summary,Status',
    'ABC-1,"Login, with SSO",Open',
    'ABC-2,"Reset ""forgotten"" password',
    'by email",Done',
    'ABC-1,"Login, with SSO",Open',
  ].join('\r\n');
  await page.locator('input[type=file]').setInputFiles({ name: 'jira.csv', mimeType: 'text/csv', buffer: Buffer.from(csv) });
  await expect(page.getByText('Found 2 stories (columns: Issue key + Summary)')).toBeVisible();
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await expect(heading).toHaveText('ABC-1 Login, with SSO');
  await expect(story.locator('ol li').first()).toContainText('ABC-2 Reset "forgotten" password by email');

  await host.context.close();
});

test('issue keys link to the tracker', async ({ browser }) => {
  const host = await newPerson(browser);
  const page = host.page;
  await createRoom(page, { name: 'Linker', room: 'Links' });
  await page.getByRole('button', { name: 'More' }).click();
  const field = page.getByRole('textbox', { name: 'Issue link' });
  await field.fill('http://example.com/{key}');
  await field.press('Enter');
  await expect(page.getByText('Use an https link with {key} where the issue key goes.')).toBeVisible();
  await field.fill('https://example.atlassian.net/browse/{key}');
  await field.press('Enter');
  await expect(page.getByText('Use an https link with {key} where the issue key goes.')).toHaveCount(0);
  await page.keyboard.press('Escape');

  await loadStories(page, 'PAY-12 Checkout, see https://example.com/spec');
  const story = page.getByRole('region', { name: 'Story' }).getByRole('heading', { level: 2 });
  await expect(story.getByRole('link', { name: 'PAY-12' })).toHaveAttribute('href', 'https://example.atlassian.net/browse/PAY-12');
  await expect(story.getByRole('link', { name: 'https://example.com/spec' })).toHaveAttribute('rel', 'noopener noreferrer nofollow');

  await host.context.close();
});

test('voting with the keyboard', async ({ browser }) => {
  const host = await newPerson(browser);
  const page = host.page;
  await createRoom(page, { name: 'Typist', room: 'Keys' });

  // "1" then "3" is 13.
  await page.keyboard.press('1');
  await page.keyboard.press('3');
  await expect(card(page, '13')).toHaveAttribute('aria-pressed', 'true');
  // Escape takes it back.
  await page.keyboard.press('Escape');
  await expect(card(page, '13')).toHaveAttribute('aria-pressed', 'false');
  // "2" waits a moment for a "0", then is 2; "h" is ½.
  await page.keyboard.press('2');
  await expect(card(page, '2')).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('h');
  await expect(card(page, '½')).toHaveAttribute('aria-pressed', 'true');
  // "r" reveals.
  await page.keyboard.press('r');
  await expect(page.getByRole('button', { name: 'New Round' })).toBeVisible({ timeout: 10_000 });

  await host.context.close();
});

test('a reaction reaches the room', async ({ browser }) => {
  const host = await newPerson(browser);
  const guest = await newPerson(browser);
  const code = await createRoom(host.page, { name: 'Cheer', room: 'Reactions' });
  await joinRoom(guest.page, code, 'Fan');
  await host.page.getByRole('button', { name: 'Send a reaction' }).click();
  await host.page.getByRole('menuitem', { name: '🎉' }).click();
  // Shown for a moment over the table, then gone.
  await expect(guest.page.getByText('🎉', { exact: true })).toBeVisible();
  await expect(guest.page.getByText('🎉', { exact: true })).toHaveCount(0, { timeout: 5_000 });

  await host.context.close();
  await guest.context.close();
});

/** Paste text the way a browser does, into the focused field. */
async function paste(field: Locator, text: string) {
  await field.focus();
  await field.evaluate((el, text) => {
    const data = new DataTransfer();
    data.setData('text/plain', text);
    el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
  }, text);
}

test('names with nothing visible in them are refused where they are typed', async ({ browser }) => {
  const host = await newPerson(browser);
  const code = await createRoom(host.page, { name: 'Host', room: 'Blank names' });
  const guest = await newPerson(browser);
  await guest.page.goto(`/room/${code}`);
  const name = guest.page.getByRole('textbox', { name: 'Enter your name' });
  // Zero-width characters only: the server would keep nothing.
  await name.fill('\u200B\u200B ');
  await guest.page.getByRole('button', { name: /^Join/ }).click();
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(name).toBeFocused();
  // Two lines pasted into one: a space between them, not glued together.
  await name.fill('');
  await paste(name, 'Ayla\nBaran');
  await expect(name).toHaveValue('Ayla Baran');

  // Renaming to spaces says so in the dialog.
  await me(host.page, 'Host').click();
  const dialog = host.page.getByRole('dialog', { name: 'Profile' });
  await dialog.getByRole('textbox').fill('   ');
  await dialog.getByRole('button', { name: 'Save' }).click();
  await expect(dialog.getByRole('alert')).toBeVisible();
  await expect(dialog.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');

  await host.context.close();
  await guest.context.close();
});

test('a custom deck needs two different cards', async ({ browser }) => {
  const host = await newPerson(browser);
  const page = host.page;
  await createRoom(page, { name: 'Dealer', room: 'Own deck' });
  await page.getByRole('button', { name: /^Deck:/ }).click();
  await page.getByRole('menuitemradio', { name: 'Custom' }).click();
  const field = page.getByRole('textbox', { name: 'Custom Deck' });
  // The same card twice is one card: said, and the deck stays.
  await field.fill('5, 5');
  await page.getByRole('button', { name: 'Apply' }).click();
  await expect(field).toHaveAttribute('aria-invalid', 'true');
  await expect(field).toBeFocused();
  await expect(page.getByRole('dialog', { name: 'Custom Deck' }).getByRole('alert')).toBeVisible();
  // A pasted column is a list of cards; Enter applies.
  await field.fill('');
  await paste(field, 'XS\nS\nM');
  await expect(field).toHaveValue('XS, S, M');
  await field.press('Enter');
  await expect(card(page, 'M')).toBeVisible();
  await expect(card(page, '5')).toHaveCount(0);

  await host.context.close();
});

test('a wrong issue link is said even when the menu closes on it', async ({ browser }) => {
  const host = await newPerson(browser);
  const page = host.page;
  await createRoom(page, { name: 'Linker', room: 'Bad link' });
  await page.getByRole('button', { name: 'More' }).click();
  const field = page.getByRole('textbox', { name: 'Issue link' });
  await field.fill('https://example.com/browse/');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('alert').filter({ hasText: 'Use an https link with {key}' })).toBeVisible();
  // Kept as typed for another try.
  await page.getByRole('button', { name: 'More' }).click();
  await expect(field).toHaveValue('https://example.com/browse/');
  await expect(field).toHaveAttribute('aria-invalid', 'true');

  await host.context.close();
});

test('the queue says which stories do not fit, and adds the rest once', async ({ browser }) => {
  const host = await newPerson(browser);
  const page = host.page;
  await createRoom(page, { name: 'Planner', room: 'Full queue' });
  const story = page.getByRole('region', { name: 'Story' });
  await story.getByRole('button', { name: /^Stories/ }).click();
  await page.getByRole('textbox', { name: 'Paste stories (one per line)' })
    .fill(Array.from({ length: 103 }, (_, i) => `Story ${i + 1}`).join('\n'));
  await expect(page.getByText("3 stories don't fit: the queue holds 100.")).toBeVisible();
  await page.getByRole('button', { name: 'Load Stories' }).dblclick();
  await expect(story.getByRole('heading', { level: 2 })).toHaveText('Story 1');
  await expect(story.getByRole('button', { name: /^Stories/ })).toContainText('99 remaining');

  await host.context.close();
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 360, height: 740 } });

  test('a queued story\'s actions open from one button, and the story keeps the row', async ({ browser }) => {
    const host = await newPerson(browser);
    const page = host.page;
    // Not createRoom(): it waits for the profile button, which phones have in the More menu.
    await page.goto('/');
    await page.locator('#home-name').fill('Pocket');
    await page.locator('#home-roomName').fill('Small screen');
    await page.getByRole('button', { name: 'Create Room' }).click();
    const story = page.getByRole('region', { name: 'Story' });
    await expect(story).toBeVisible();
    await loadStories(page, 'Now\nFirst\nSecond\nThird');
    await expect(story.getByRole('heading', { level: 2 })).toHaveText('Now');

    // One button per story instead of four.
    await expect(story.getByRole('button', { name: 'Move up: Third' })).toBeHidden();
    const row = story.locator('ol li').last();
    const title = await row.getByText('Third').boundingBox();
    expect(title!.width).toBeGreaterThan((await row.boundingBox())!.width - 90);

    const more = story.getByRole('button', { name: 'Story actions: Third' });
    await more.click();
    const menu = page.getByRole('menu', { name: 'Story actions: Third' });
    await expect(menu.getByRole('menuitem', { name: 'Move up' })).toBeFocused();
    const box = (await menu.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(360);
    // Arrow keys go through it (the last story can't move down, but the item is there, marked);
    // Escape closes it and the button has the keyboard again.
    await page.keyboard.press('ArrowDown');
    await expect(menu.getByRole('menuitem', { name: 'Move down' })).toBeFocused();
    await expect(menu.getByRole('menuitem', { name: 'Move down' })).toHaveAttribute('aria-disabled', 'true');
    await page.keyboard.press('Escape');
    await expect(menu).toHaveCount(0);
    await expect(more).toBeFocused();

    // A press elsewhere closes it too.
    await more.click();
    await expect(menu).toBeVisible();
    await story.getByRole('heading', { level: 2 }).click();
    await expect(menu).toHaveCount(0);

    await more.click();
    await menu.getByRole('menuitem', { name: 'Move up' }).click();
    await expect(story.locator('ol li').nth(1)).toContainText('Third');
    await expect(story.getByRole('button', { name: 'Story actions: Third' })).toBeFocused();

    await host.context.close();
  });
});
