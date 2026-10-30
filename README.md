<div align="center">

<img src="public/icons/icon-192.png" alt="" width="80" height="80">

# Scrum Poker Online

Free, real-time planning poker for agile teams, in the browser.

**[scrumpokerplay.com](https://www.scrumpokerplay.com)**

[![CI](https://github.com/mertgundoganx/scrum-poker/actions/workflows/ci.yml/badge.svg)](https://github.com/mertgundoganx/scrum-poker/actions/workflows/ci.yml)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-23262d)](LICENSE)

</div>

Create a room, share the link, and everyone votes in private; the cards are revealed together. There are no
accounts and nothing to install. This repository holds the whole app that runs
[scrumpokerplay.com](https://www.scrumpokerplay.com): a Next.js server that keeps rooms in memory, pushes every
change to the room over Server-Sent Events, and copies it to Redis.

## Features

- **Decks**: Scrum, Fibonacci, T-shirt sizes, powers of 2, or your own cards
- **Real-time voting**: votes stay hidden until the reveal, then show consensus, a suggested estimate and the spread
- **Story queue**: paste a list or import a CSV from Jira, Linear or a spreadsheet; export the results as CSV
  or Markdown
- **Shared timer** that counts up or down, plus chat, emoji reactions and nudges
- **Host controls**: remove people, hand over the host role, run the round alone, close the room to newcomers;
  anonymous voting and auto-reveal
- **Kept rooms**: the same link every sprint, with its setup and story queue; the owner link opens it as host on
  any device
- **7 languages**: English, Türkçe, Deutsch, Français, Italiano, العربية (right to left) and 中文
- **Light and dark theme**, keyboard shortcuts, accessibility checked with axe (WCAG 2.1 AA), installable as an
  app
- **No account**: no e-mail addresses or passwords are stored

## Quick start

You need [Node.js](https://nodejs.org) 24 or later and [pnpm](https://pnpm.io) (pinned in `package.json`;
`corepack enable` installs that version).

```bash
git clone https://github.com/mertgundoganx/scrum-poker.git
cd scrum-poker
corepack enable
pnpm install
cp .env.example .env    # then set ROOM_TOKEN_SECRET, see below
pnpm dev                # http://localhost:3000
```

`ROOM_TOKEN_SECRET` signs the room cookies and is required, also in development. Generate one with
`openssl rand -base64 32`, or with Node:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Redis is optional. Without it everything works, but rooms and kept rooms live in memory and end when the server
stops. With it, rooms survive a restart: start one with `docker run -d -p 6379:6379 redis:8-alpine` and uncomment
`REDIS_URL` in `.env`. All settings are described in [`.env.example`](.env.example).

## Tests

| Command | What it checks |
|---|---|
| `pnpm typecheck` | TypeScript, in strict mode |
| `pnpm lint` | ESLint |
| `pnpm check:compiler` | That the React Compiler optimizes every component and hook in `app/` |
| `pnpm test:e2e` | Playwright end-to-end tests on desktop and phone: rooms, the API, kept rooms, every page, accessibility |
| `pnpm test:layout` | Layout audit of every page and the room, 320 to 1536 px wide (slow) |
| `node scripts/loadtest.mjs` | Load test: many rooms of people voting, with latency percentiles (your own server only) |

The Playwright tests run against a production build on port 3100;
[CONTRIBUTING.md](CONTRIBUTING.md#running-the-tests) shows how to start one. [CI](.github/workflows/ci.yml) runs all
but the load test on every push to `master` and every pull request.

## Deployment

The [`Dockerfile`](Dockerfile) builds a self-contained image that runs as a non-root user on port 3000, next to a
Redis. The public site runs it on one server with [Shipwick](https://shipwick.com), described in
[`shipwick.yaml`](shipwick.yaml); a deploy replaces the app without ending the rooms in it. Behind Cloudflare, keep
Rocket Loader off, or the room page's Content-Security-Policy blocks its scripts.
[Deployment](docs/ARCHITECTURE.md#deployment) in the architecture notes has the commands for both.

Running your own instance:

- **One instance only**: rooms live in the process's memory. Grow with a bigger server.
- **HTTPS is required**: in production the room cookie is `Secure`, so over plain HTTP nobody can join.
- **Replace the site's details**: its domain, contact address, and the terms and privacy policy, which describe
  scrumpokerplay.com ([what to change](docs/ARCHITECTURE.md#running-your-own-instance)).
- **Link to your source**: if you change the code, point the footer's "Source code" link at your version, as the
  AGPL asks.

## Project structure

```
app/(en)/          English pages and the room (/room/<code>)
app/[lang]/        The same pages in the other six languages (/tr, /de/guide, …)
app/api/rooms/     The room API
lib/               Room state (store.ts), kept rooms, limits, security checks, translations
proxy.ts           Guards in front of the API, and the room page's Content-Security-Policy
e2e/               Playwright tests
scripts/           React Compiler check, load test
```

[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) explains how a room works, identity and kept rooms, the security
measures and limits, and where each piece of code lives.

## Contributing

Bug reports, translations, ideas and pull requests are welcome. [CONTRIBUTING.md](CONTRIBUTING.md) explains the
setup, the conventions and the checks, and the [Code of Conduct](CODE_OF_CONDUCT.md) applies everywhere.

## Security

Please report vulnerabilities privately, as [SECURITY.md](SECURITY.md) describes, not in a public issue.

## License

Copyright (C) 2026 Mert Gündoğan

[GNU AGPL v3.0](LICENSE) (AGPL-3.0-only): if you run a changed version as a service for others, offer them its
source code under the same license.

The public site is deployed with [Shipwick](https://shipwick.com) and monitored by
[ReliableUptime](https://reliableuptime.com), both made by the author of this project.

"Planning Poker" is a registered trademark of Mountain Goat Software, LLC; this project is not affiliated with it.
