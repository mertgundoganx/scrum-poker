# Contributing

Thanks for wanting to make Scrum Poker Online better. Bug reports, ideas, translations and code are all welcome.

- [Before you start](#before-you-start)
- [Setting up](#setting-up)
- [Making a change](#making-a-change)
- [Running the tests](#running-the-tests)
- [Code conventions](#code-conventions)
- [Text and translations](#text-and-translations)
- [Adding a page, an article or a language](#adding-a-page-an-article-or-a-language)
- [Stored data](#stored-data)
- [Pull requests](#pull-requests)

## Before you start

- **Bugs**: open an issue with the steps to reproduce it, what you expected and what happened.
- **Features**: open an issue first and describe the problem it solves, so we can agree on the approach before you
  write code.
- **Security problems**: please don't open an issue; follow [SECURITY.md](SECURITY.md).

By contributing you agree that your contribution is licensed under the project's license,
the [GNU AGPL v3.0](LICENSE), and that you follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Setting up

Follow the [Quick start](README.md#quick-start) in the README: Node.js 24 or later, pnpm (via
`corepack enable`), a `ROOM_TOKEN_SECRET` in `.env`, and Redis if you want rooms to survive a restart.
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) explains how the pieces fit together; read it before changing
`lib/store.ts` or the room API.

## Making a change

1. Create a branch from `master`.
2. Make the change, with an end-to-end test in `e2e/` where it changes behaviour.
3. Run the same checks as CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)):

   ```bash
   pnpm typecheck
   pnpm lint
   pnpm check:compiler
   pnpm build
   # start the build on port 3100 first, see "Running the tests" below
   pnpm test:e2e
   pnpm test:layout     # slow; run it when you change layout or text
   ```

4. Open a pull request.

## Running the tests

The Playwright tests run against a **running production build** on `http://localhost:3100`; set `E2E_BASE_URL`
to test another server. Give it a Redis of its own, so test rooms don't mix with your development ones:

```bash
docker run -d --name sp-redis-test -p 6380:6379 redis:8-alpine
pnpm build
REDIS_URL=redis://localhost:6380 ROOM_TOKEN_SECRET=e2e-room-secret-0123456789abcdef0123 \
  pnpm start -p 3100 &
pnpm exec playwright install chromium   # once
pnpm test:e2e
pnpm test:layout
```

- **End-to-end** (`pnpm test:e2e`, [`e2e/`](e2e)): Chromium on a desktop (the `desktop` project, every spec but
  the layout audit) and on a phone (the `mobile` project, the page checks in `e2e/pages.spec.ts`). It covers people
  voting, revealing and chatting in a room; the room API's authorization, limits and input rules; kept rooms and
  owner links; the room's Content-Security-Policy; reloads, reconnects and page transitions; every page of the
  sitemap in every language; and an accessibility scan (axe, WCAG 2.1 AA) of every page and of a room.
- **Layout audit** (`pnpm test:layout`, `e2e/layout.spec.ts`): every page of the sitemap and a missing page, in
  every language, from 320 to 1536 px wide, light and dark; the header menus on phones; a room in a few states
  with the longest names and stories. It fails on sideways scrolling, anything past the screen edge, tap targets
  under 40×40 px on phones and header items on top of each other. It takes minutes, so `pnpm test:e2e` leaves it
  out.
- **Load test** ([`scripts/loadtest.mjs`](scripts/loadtest.mjs)): fills rooms with people who vote, reveal and
  start new rounds, each with a live event stream, and prints latency percentiles and errors. Every simulated
  person sends its own `X-Forwarded-For` address, so run it against your own test server, never against the
  public site:

  ```bash
  node scripts/loadtest.mjs --url http://localhost:3100 --rooms 100 --people 10 --seconds 60
  ```

CI runs on every push to `master` and every pull request, with Redis: one job runs `pnpm typecheck`, `pnpm lint`,
`pnpm check:compiler`, `pnpm build` and `pnpm test:e2e`; a second job builds and runs `pnpm test:layout`.

## Code conventions

What the tools enforce: TypeScript in `strict` mode (`pnpm typecheck`), ESLint with Next.js's `core-web-vitals`
and TypeScript rules (`pnpm lint`), and the React Compiler check (`pnpm check:compiler`). The rest is convention;
please follow it too.

- **This is Next.js 16 and React 19.** Their APIs and conventions differ from older versions and from many
  tutorials (for example, `middleware.ts` is now `proxy.ts`, and `params` is a promise). Before using a Next.js API,
  read its guide in `node_modules/next/dist/docs/`.
- **Match the code around you**: its naming, its comment density, its idioms. Comments explain *why*, not what.
- **No `any`** where a real type is possible.
- **Lint suppressions** are a last resort: fix the cause if you can, and give the reason after `--` when you can't
  (`// eslint-disable-next-line rule -- why`).
- **React Compiler** is on and `pnpm check:compiler` fails when it has to skip a component. Keep components pure:
  no side effects during render, helpers outside components, `useEffectEvent` for effects that need the latest
  values. You rarely need `useMemo` or `useCallback`.
- **Server code stays on the server.** Modules that touch Redis, secrets, logging or the full dictionaries start
  with `import 'server-only'`. Code shared with the browser (`lib/deck.ts`, `lib/limits.ts`, `lib/localePath.ts`)
  has no server imports.
- **Tailwind classes are written out in full** (`'bg-accent-600'`, not `` `bg-${tone}-600` ``): classes built at
  run time aren't generated. Colours come from the tokens in `app/globals.css`: `accent-*` (the red) and `slate-*`
  (warm greys, from paper to ink). Tailwind's other colour ramps (`violet-*`, `indigo-*`…) aren't part of the look;
  green, amber and red appear only for success, warnings and errors.
- **Room state** changes only through the functions in `lib/store.ts`, and each change goes through `commit()`.
  Rooms returned by those functions are the live objects: serialize them right away, never change or keep them.
- **Every input from a request is untrusted.** Use the helpers in `lib/roomRequest.ts` (`jsonBody`, the field
  checks, `cutText` for text) and the limits in `lib/limits.ts`; refuse what isn't expected with one of the error
  codes in [Input rules](docs/ARCHITECTURE.md#input-rules). A new room route is wrapped in `roomRoute()`.
- **Accessibility**: real buttons and labels, keyboard access, visible focus, `aria-*` where the role isn't obvious,
  and enough contrast in both themes. The axe scan in `e2e/a11y.spec.ts` checks every page.
- **Dependencies**: the app has seven runtime dependencies, all pinned to exact versions, and much is written by
  hand to keep it that way (CSV import, rate limiting, sounds, the load test). Please ask in an issue before adding
  one, and pin it exactly. Dependabot proposes updates weekly; major versions of Next.js, TypeScript and
  `@types/node` are upgraded by hand.

## Text and translations

The interface is in seven languages: English (`en`), Turkish (`tr`), German (`de`), French (`fr`), Italian (`it`),
Arabic (`ar`, right to left) and Chinese (`zh`). Text the visitor sees never goes straight into a component.

- **Interface text** lives in `lib/locales/<code>.ts`. `lib/locales/en.ts` defines the keys and their type; every
  other language starts from `...en`, so a key it doesn't translate shows in English. Add a new key to
  `lib/locales/en.ts`, then its translation to the other six. Counts use plural forms (`Plural` in `lib/i18n.ts`);
  placeholders are `{name}`.
- **Which keys reach the browser**: `lib/dictionaries.ts` sends client components only part of the dictionary:
  `CHROME_KEYS` (header, footer, menus, error and 404 views) on every page, `HOME_KEYS` on the home page, and
  everything else in the room. A client component outside the room that starts using a key must add it to the
  right list, or it shows nothing (the development build logs the missing key). A few room-only strings are in
  `app/(en)/room/[id]/roomText.ts`.
- **Long content** (guide, demo, pricing, privacy policy, terms, the landing pages) has one file per language in
  the page's `content/` folder, for example `app/guide/content/de.ts`. Blog articles have one per language in
  `app/blog/<slug>/`. Content files have no English fallback: the type checker wants all seven.
- **Search titles and descriptions** are in `lib/meta/<code>.ts`: about 38 characters for a title
  (" | Scrum Poker Online" is added), up to about 160 for a description.
- **Links** between pages go through `localizedPath(locale, '/guide')` from `lib/localePath.ts`, never a bare
  `'/guide'`, so the reader stays in their language.
- **Right to left**: use logical properties (`ms-`, `me-`, `ps-`, `start-`, `end-`) instead of `left`/`right`.
- **The legal pages** (`app/terms/content/`, `app/privacy/content/`) describe the public site and its operator.
  Changes to their meaning are for the operator to make; corrections of translations are welcome.

If you can't translate a language, leave the English text and say so in the pull request; someone will translate
it. Native speakers improving existing translations are very welcome.

## Adding a page, an article or a language

**A content page** (one that exists in every language):

1. A page component in `app/<page>/` that takes the locale, with its content in `app/<page>/content/<code>.ts`.
2. A route file in `app/(en)/<page>/page.tsx` and one in `app/[lang]/<page>/page.tsx` (copy the guide's,
   `app/(en)/guide/page.tsx` and `app/[lang]/guide/page.tsx`).
3. Its English path in `CONTENT_PATHS` in `lib/localePath.ts`, its entry in `app/sitemap.ts`, and its title and
   description in every `lib/meta/<code>.ts` (`MetaPage` in `lib/meta/types.ts`).

**A blog article**:

1. Its text in `app/blog/<slug>/<code>.ts` for all seven languages (the shape is `Localized` in
   `app/blog/articleTypes.ts`).
2. The slug in `BLOG_SLUGS` in `lib/localePath.ts`; its loaders, related posts and dates in `app/blog/articles.ts`;
   its index entry (title, description, read time per language, icon, dates) in `lib/blogPosts.ts`; its search
   title in every `lib/meta/<code>.ts` (`articles`).
3. The route files exist already (`app/(en)/blog/[slug]/`, `app/[lang]/blog/[slug]/`), and the sitemap reads
   `lib/blogPosts.ts`.

**A language**:

1. Its code in `Locale`, `LOCALES`, `LANGUAGE_NAMES` and the loaders in `lib/translations.ts`; right to left goes
   in `textDirection` there.
2. Then follow the type checker: `pnpm typecheck` lists every place that needs the new language, among them
   `lib/locales/<code>.ts` and `lib/dictionaries.ts`, `lib/meta/<code>.ts` and `lib/meta/index.ts`, the Open Graph
   locale in `lib/seo.ts`, every content folder, every blog article in `app/blog/articles.ts`, and the room-only
   text in `app/(en)/room/[id]/roomText.ts`.
3. The `/<code>` pages are built from `PREFIXED_LOCALES` automatically. Add the code to the `LOCALES` lists in
   `e2e/pages.spec.ts` and `e2e/layout.spec.ts`, the language to the "Site language" list in
   [`.github/ISSUE_TEMPLATE/bug_report.yml`](.github/ISSUE_TEMPLATE/bug_report.yml), and its name to the README.

## Stored data

Redis is the only store. Every key in it but one expires:

| Key | Holds | Expires |
|---|---|---|
| `room:<code>` | A room's snapshot | An hour after the last change; renewed while people are connected |
| `chat:<code>` | A room's last 30 chat messages | With its room |
| `kept:<code>` | A kept room | 30 days after it is kept, 180 days after each time its owner comes back |
| `kept:index` | The kept rooms by expiry (caps them at 5,000) | Never; expired entries are trimmed when a room is kept |
| `replica:active` | Which replica holds the rooms (deploy handover) | 5 seconds, renewed every 2 |

A new kind of key needs an expiry too: production evicts by time left (`volatile-ttl`), and a key without one is
never evicted. When you change what a stored value looks like, keep reading the old shape: values written by the
previous version are still there after a deploy. Rooms and chat read back from Redis, and kept rooms opened
again, go through `cleanRestoredRoom()` in `lib/store.ts`; extend it there.

## Pull requests

- Keep a pull request to one topic; a small one gets reviewed faster.
- Describe what changes for the visitor and why, and how you tested it. Screenshots help for visual changes
  (light and dark theme, phone and desktop).
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org):
  `feat: …`, `fix: …`, `perf: …`, `docs: …`, `chore: …`, with the reason in the body when it isn't obvious.
- All CI checks must pass: type check, lint, React Compiler check, build, end-to-end tests and the layout audit.
