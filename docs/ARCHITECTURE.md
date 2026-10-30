# Architecture

How Scrum Poker Online works: where state lives, how a room behaves over its life, how people are identified,
and which rules and limits protect it. Read this before changing `lib/store.ts` or the room API.

- [Overview](#overview)
- [A room's life](#a-rooms-life)
- [Real-time updates](#real-time-updates)
- [Identity](#identity)
- [Kept rooms](#kept-rooms)
- [Security measures](#security-measures)
- [Input rules](#input-rules)
- [Limits](#limits)
- [Front end](#front-end)
- [Deployment](#deployment)
- [Where things are](#where-things-are)

## Overview

```
Browser ──HTTPS──► Cloudflare ──► reverse proxy ──► Next.js (one Node process)
   ▲                                                   │  rooms and rate limits in memory (lib/store.ts, lib/rateLimit.ts)
   └──────────── Server-Sent Events ◄──────────────────┘  └─► Redis  room snapshots, chat, kept rooms
```

- **Rooms live in the server's memory.** A room is one object in a `Map`; every action changes it in place,
  bumps its `version`, and pushes the new state to everyone in the room. There is no database round trip on
  the hot path.
- **Redis is the copy, and the only store.** Each change is written to Redis (coalesced: at most one write per
  room every 250 ms) with a one-hour expiry that a room in use keeps renewing. A restarted or newly deployed server
  loads the rooms back on its first request. Kept rooms are stored there too (see [Kept rooms](#kept-rooms)). Every
  key but the kept rooms' index expires (the keys are listed in
  [CONTRIBUTING.md](../CONTRIBUTING.md#stored-data)); production Redis evicts by time left (`volatile-ttl`), so
  under memory pressure idle room snapshots go first and kept rooms last. Its append-only file and a daily backup
  keep them across restarts. Without `REDIS_URL` everything works in memory only, kept rooms included, and ends
  with the process. There are no accounts and no database: no e-mail addresses, passwords or profiles are stored.
- **Rate limits and per-address counts live in the process's memory** (`lib/rateLimit.ts`), never in Redis: there
  an attacker's traffic would grow them, and a full Redis evicting them would switch them off. The app is one
  process, so they see all of its traffic. A deploy starts them afresh.
- **One replica.** Rooms live in its memory, so the app runs as a single replica; Redis is its copy, not shared
  state. Only during a deploy do two run side by side for a moment (see [Deploys](#deploys)). Growing means a
  bigger server; several replicas would need rooms pinned to one of them, or Redis as the source of truth. Measured
  with `scripts/loadtest.mjs` on a developer laptop with the production heap limit (448 MB): 1,000 people in 100
  rooms, all streaming and voting, at 229 requests a second with a p99 of 37 ms and 370 MB of memory; idle, the
  process uses about 115 MB.
- **Content pages are static.** The home page, guide, blog, landing and legal pages are rendered at build time in
  every language; only `/room/<code>` and the API run per request.

## A room's life

1. **Created** (`POST /api/rooms`): a random 8-character code from an alphabet without look-alike characters
   (no `I`, `O`, `0` or `1`; 40 bits), the creator as host, and a signed cookie that proves the creator's seat.
2. **Joined** (`POST /api/rooms/<code>/join`): a seat with a name and avatar, and the same kind of cookie.
   A seat whose page never opens its event stream is freed after 30 seconds.
3. **In use**: votes, reveal, rounds, story queue, timer, chat, reactions. Every change goes through `commit()`,
   which bumps the version, schedules the Redis write and broadcasts (coalesced: a burst of votes is one
   broadcast). By default anyone in the room runs the round (reveal, next round, queue, timer); the host can keep
   that to themselves (`hostRuns`, lifted while the host is away), close the room to new people (`closed`), turn
   reactions off, and set an issue link pattern that turns keys such as `PROJ-123` into links.
4. **Presence**: someone counts as present while one of their event streams is open (several tabs share one
   seat). When the last one closes they are marked *away* and removed after 90 seconds unless they come back;
   closing the tab shortens that to 15 seconds. If the host leaves for good, the role passes to the next person
   who is present and voting.
5. **Emptied**: an empty room is deleted after an hour, or after ten minutes if nobody ever used it (no story and
   no round), so that empty rooms can't crowd out real ones.
6. **Kept**: the host can keep a room. Its setup, story queue and last results are stored in Redis, and joining
   through its link after the room was deleted creates it again (see [Kept rooms](#kept-rooms)).

A server takes at most 2,000 live rooms, and one address opens at most 20 of them; beyond that, creating a room
answers *try again later* (`busy`). A kept room opened again counts as unused (deleted after ten minutes) until
someone joins, so opening kept rooms can't fill the server.

### Deploys

During a rolling deploy the new replica serves requests a moment before the old one gets SIGTERM. The replica that
holds the rooms says so in Redis (`replica:active`, renewed every two seconds, expiring after five); a new one waits
for that key to go (at most eight seconds) before it loads any room. On SIGTERM the old replica flushes its pending
Redis writes, stops writing, deletes `replica:active` and tells every open stream to reconnect. The new replica then
loads the rooms from Redis, each through the rules for fresh input (see *Stored rooms* in
[Input rules](#input-rules)); a room stored during a reveal countdown gets its 15-second safety unlock again, and
everyone in a loaded room counts as away until their stream reconnects. Pages reconnect after a random delay, so
they don't all arrive at once.

## Real-time updates

Each participant's page opens `GET /api/rooms/<code>/events`, a Server-Sent Events stream:

- `data:` the room as this person may see it (see [Votes](#votes)), on every change
- `event: chat` and `event: chat-history`, `event: reaction`, `event: nudge`, `event: kick`, `event: reconnect`
- a keepalive comment every 20 seconds, well inside Cloudflare's 100-second idle timeout

The part of the room that is the same for everyone is serialized once per version; only the votes differ per
person. The round history, the bulk of a long session, is sent only when it changed since that stream last got
it. Actions answer with the new state too, so the person acting sees it without waiting for the stream; the page
drops any state older than one it already has (`version`).

### Votes

Until the reveal everyone sees *who* has voted but only their own card; the server never sends the others.
After the reveal the cards are shown with names or, in an anonymous room, as a sorted list without names.
Anonymous voting can't be switched off while the round has votes, so a card cast anonymously stays anonymous.

## Identity

There are no accounts. A participant id is a UUID the browser makes for itself (`crypto.randomUUID()`) and keeps
in local storage (`lib/browserId.ts`); the server takes no other kind of id.

The **room cookie** (`scrum_rt_<code>`, `lib/roomToken.ts`) is an HMAC-SHA256-signed `userId:roomId:expiry`,
HttpOnly, SameSite=Lax, Secure in production, sent only to that room's API (`Path=/api/rooms/<code>`), valid two
hours and renewed with use. Every room action checks it. Taking a seat needs it when the id is already in the room,
is the host's, or has shown the room's owner key, so knowing someone's id (everyone in a room sees them) is not
enough to act as them. `ROOM_TOKEN_SECRET` signs it; without a secret no cookie is issued or accepted, and in
production one shorter than 32 characters is refused too.

The **host** can remove someone; the removed id is banned from the room, and so is a new id from the same browser
while its room cookie lasts (someone who clears their browser data can come back: without accounts that can't be
helped). A host without the owner key can't remove an owner, and the owner key lets its holder back in.

## Kept rooms

A team that meets every sprint wants the same link every time. Without accounts, a kept room belongs to whoever
holds its **owner key** (`lib/keptRooms.ts` on the server, `lib/ownedRooms.ts` in the browser):

- Keeping a room (host only) creates a random 256-bit key. The server stores its SHA-256 hash with the room's code,
  name, deck, settings, story queue and the last 50 results (story and agreed estimate; no names, no votes), and
  hands the key out once; the browser keeps it in local storage. A Lua script stores the room and indexes it in
  `kept:index` in one step, so two hosts can't both keep a room and there are never more than 5,000 kept rooms.
- The **owner link** is `/room/<code>#owner=<key>`. The key is in the URL fragment, which browsers never send, so it
  stays out of every access log; an inline script at the top of the room page (`TAKE_OWNER_KEY` in
  `lib/inlineScripts.ts`) moves it to sessionStorage and out of the address bar before the page's own code and the
  analytics beacon run. The page keeps a key only once the join answer says it is the room's (`ownerKeyValid`), so a
  forged owner link can't replace a real one.
- Joining with the key makes the person an **owner**: arriving, they take the host role from anyone who doesn't
  hold the key, and they can stop keeping the room (in the room, or from the home page's list with the key alone).
  A later host without the key can neither change nor drop the kept room, and their changes are not written to it;
  an owner's are, at most once a second (the room as the owner's last change left it, even if they handed the host
  role on in that second). When an owner arrives, the issue link goes back to the kept one (a link everyone clicks
  is worth faking while the owner is away).
- A kept room lives **30 days** after it is kept; each time its owner comes back with the key it has **180 days**
  again (opening its link without the key doesn't count), so kept rooms nobody returns to clear themselves. It is
  deleted at once when its owner stops keeping it. A lost key can't be recovered: there is no account to recover it
  with. Only joining opens a kept room again; looking a code up (the room page, the API) doesn't.

## Security measures

| Threat | Measure |
|---|---|
| Acting as someone else in a room | A signed room cookie per seat; ids already in the room, the host's and owners' need it to take a seat |
| Taking over a kept room | Only the owner key manages it; stored as a SHA-256 hash, compared in constant time; ids that showed it can't be removed by a host without it |
| Cross-site requests | `proxy.ts` refuses API changes whose `Sec-Fetch-Site` is another site, and bodies that aren't `application/json`; SameSite cookies |
| Oversized input | Request bodies of 128 KB and more are refused, also when sent without a Content-Length; every text field has a length limit (see [Limits](#limits)) |
| Malformed input | Every field is type-checked; a body that isn't a JSON object, or a mistyped field, is a 400 and changes nothing (see [Input rules](#input-rules)) |
| Look-alike names | All text is NFC-normalized; invisible and direction-changing characters (bidi overrides and isolates, zero-width spaces, fillers that render as nothing, Unicode tags) are removed, and so are joiners that join nothing. Names that still read alike (`lib/confusables.ts`) are pointed out in the room, not refused |
| Flooding | In-memory rate limits per IP address (per /64 for IPv6), per network for a few, per person and per action; caps on rooms, seats, streams and kept rooms, per address and in total; round history trimmed by size |
| Spoofed client address | `CF-Connecting-IP` is believed only when the request reached the app through a Cloudflare address (`lib/clientIp.ts`) |
| Cross-site scripting | React escapes all user text; links in stories are https only and built as elements; the issue link pattern is an https address with `{key}` in its path, query or fragment. The room page, the only one that shows what people type, gets a Content-Security-Policy per request from `proxy.ts`: no inline script but Next's (with a fresh nonce) and ours (by SHA-256 hash, `lib/inlineScripts.ts`). The other pages are built once and show nothing visitors typed; their static policy in `next.config.ts` allows inline scripts, since a built page can't carry a nonce. Both limit script origins, connections and frames. The home page opens rooms with a full page load, so a room never runs under the static policy |
| Clickjacking, sniffing | `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `nosniff`, HSTS, `Cross-Origin-Opener-Policy` (`next.config.ts`) |
| Leaking through caches | API answers are `Cache-Control: private, no-store`; the service worker caches no API answers or room pages |
| Prototype pollution | Ids are checked against a strict pattern, object keys are looked up as own properties only, and request bodies are read into objects without a prototype |
| Leaking internals | Errors are answered as `{ error, code }` without details. Every room route goes through `roomRoute()` (`lib/roomRequest.ts`), so an unexpected error is `server_error` (500), logged once with the route and room code and nothing from the body or the room; logged errors keep only type, message, stack and code (`lib/logger.ts`), so a Redis error never carries the room it was writing |
| Guessing room codes | A lookup of a code with no room (the room API, joining, the room page) counts against the address and its network, each code once per ten minutes. Past 30 codes per address or 100 per network, every lookup from there is refused (429 from the API, 404 on the room page), real rooms included, until the window moves on. On the API, someone with the room cookie of that code is never blocked: it was issued, not guessed. Room actions and the event stream look nothing up without that cookie |
| A damaged or tampered Redis copy | Rooms and chat read back from Redis, and kept rooms opened again, go through `cleanRestoredRoom()` (`lib/store.ts`): the rules for fresh input, field by field (see *Stored rooms* in [Input rules](#input-rules)) |
| A compromised process | In production (`shipwick.yaml`) both containers run as unprivileged users with no capabilities and a read-only file system; only Next's cache, `/tmp` and Redis's `/data` are writable |

## Input rules

The server checks everything itself; the page's own checks are a convenience. `lib/roomRequest.ts` has the helpers
(`jsonBody`, `textField`, `optional`, `isIndex`), and `lib/limits.ts` the numbers.

- **The body** is read up to 128 KB, also without a Content-Length (Next hands a route only that much of such a
  body and cuts it off silently, so a body that fills it counts as too large: 413). It must be a JSON object in
  UTF-8; anything else (bad JSON, an array, a string, `null`, nothing) is a 400. Fields the route doesn't know are
  ignored.
- **Fields** are type-checked: a required one that is missing or of the wrong type, and an optional one present
  with the wrong type (`null` counts as absent), is a 400. Numbers must be whole and in range (a queue position is
  a whole number from 0; a countdown is one of the offered lengths), ids are browser-made UUIDs, emoji are one of
  the six reactions. Room codes in the URL are 8 letters and digits; anything else is a 404 without a lookup.
- **Text** (`cutText` in `lib/deck.ts`, used by the server and the page alike) is NFC-normalized, loses control,
  invisible and direction-changing characters, Unicode tags (except in a flag), runs of variation selectors, and
  ZWJ/ZWNJ that join nothing (next to Latin, Greek or Cyrillic, or at an end); more than six accents on one letter
  are cut to six; every run of whitespace (line breaks included) becomes one space; then it is trimmed. Lengths
  count code points of that result, and longer text is cut at the limit without splitting a character (an emoji, a
  letter and its accents). Text with nothing left is a 400 where text is required (a name, a story, a message).
  A field's `maxLength` counts UTF-16 units, never fewer than code points, so what the page accepts always fits.
- **Names** may repeat: two people can both be Alex (ids tell them apart, and the host is marked by id). Thanks to
  the rules above, two names that look the same are the same string. An avatar not in `AVATARS` is stored as none.
- **Custom cards** are cleaned like text, cut to 4 characters, without blanks and duplicates (after cleaning:
  `é` typed two ways is one card) and without `✓` (what a hidden vote shows as); at least 2 must remain or it is a
  400, and past 20 the rest is dropped. Stories past the queue's 100 are dropped the same way.
- **The issue link** is an https address of at most 200 characters, with no spaces, control or invisible
  characters, no user name or password, and `{key}` exactly once, after the host (in the path, query or fragment).
- **Stored rooms** (a Redis copy read back after a restart, a kept room opened again, the chat) pass the same rules
  in `cleanRestoredRoom()`: names, stories, chat, cards, avatars, the deck, the settings and the issue link as
  above; ids must be UUIDs, times finite numbers from 0, a countdown one of the offered lengths, a vote a card of
  the deck by someone in the room. A field that breaks them is fixed (cut, or its default) or dropped (a person
  without an id or a name: their page joins again); unknown fields are left behind; a copy without a valid room
  code is dropped whole (logged by its code only, when it is one).
- **Errors** are `{ error, code }`. `error` is English for people reading the API; the page acts on `code`. An
  action the room's state refuses says why (`Refusal` in `lib/store.ts`), with `rejected` for any other reason:

| Code | Status | Meaning |
|---|---|---|
| `invalid` | 400, 415 | The request itself is wrong (415: not JSON); sending it again won't help |
| `too_large` | 413 | The body is 128 KB or more |
| `rate_limited` | 429 | Too many requests, or too many unknown room codes; `Retry-After` says when to try again |
| `busy` | 429, 503 | Creating a room: 20 rooms are open from this address (429), or 2,000 on the server (503) |
| `host_only` | 403 | Only the host does this (the deck, settings, removing people, handing over, keeping), or, in a room the host runs alone, runs the round |
| `item_gone` | 409 | The story the request names is no longer in the queue (moved, edited or removed by someone else), or there is no current story to rename |
| `round_changed` | 409 | The round moved on: a vote or lock after the reveal (or during its countdown), the next round already started (`fromItem` isn't the current story), the deck changed during a reveal. Revealing a revealed round is not refused: every page ends the countdown with a reveal |
| `spectator` | 409 | Spectators don't vote |
| `anonymous_locked` | 409 | Anonymous voting can't be turned off while the round has votes |
| `rejected` | 409, 403, 503 | Anything else (409: a card not in the deck, a full queue, removing yourself; 403: not the owner key, a cross-site request; 503: a kept room couldn't be stored) |
| `not_participant` | 401 | Not in the room (any more): join again |
| `room_not_found` | 404 | No such room |
| `kicked` | 403 | Removed from this room |
| `identity_in_use` | 409 | The id is someone else's in this room: make a new one |
| `room_full` / `room_closed` | 403 | Joining: the room has 50 people / takes nobody new |
| `kept_full` | 503 | No more rooms can be kept right now (5,000 are kept) |
| `server_error` | 500 | Something broke on the server (logged); the request may be tried again |

## Limits

Every limit on what people send is in `lib/limits.ts`, which the server and the pages share. The capacity limits
are in `lib/store.ts` and `lib/keptRooms.ts`, the rate limits in the routes and `lib/roomRequest.ts`.

| What | Limit |
|---|---|
| Room name / display name | 40 / 16 characters (code points) |
| Avatar | one of the 15 offered, or none |
| Story / chat message / issue link | 140 / 300 / 200 characters |
| Custom deck | 2 to 20 different cards of up to 4 characters |
| People in a room | 50 |
| Story queue / round history / chat kept | 100 stories / 50 rounds (and about 48 KB) / 30 messages |
| Open event streams | 5 per person, 150 per room, 100 per address, 6,000 in total |
| Live rooms | 2,000 per server, 20 opened from one address |
| Kept rooms | 5,000 per server; 30 days, then 180 days after each time the owner comes back; the last 50 results |
| Request body | under 128 KB |

Rate limits (sliding windows, in memory; "network" is an IPv4 /24 or an IPv6 /48):

| Action | Limit |
|---|---|
| Create a room | 10 / minute and 60 / hour per address |
| Join | 60 / minute per address, 30 / minute per address and room, 40 new seats / hour per address and room |
| Open an event stream | 120 / minute per address |
| Read a room (API, room page) | 120 / minute per address, each |
| Look up a code that has no room (API, join, room page) | 30 different codes / 10 minutes per address, 100 per network; past it every lookup is refused (on the API not with that room's cookie) |
| Any room action | 300 / minute per person and 2,000 / minute per address, plus a limit per action (for example 180 votes, 30 reveals, 20 nudges, 10 refreshes) |
| Chat | 30 / 10 seconds per person |
| Reactions | 10 / 10 seconds and 40 / minute per person |
| Keep a room | 10 / hour per address, 30 / hour per network |
| Stop keeping a room with its key alone | 30 / minute per address |

## Front end

- **App Router, mostly static.** `app/(en)/room/[id]/RoomClient.tsx` is the one large client component; it joins,
  opens the event stream, and renders the room.
- **React Compiler** memoizes components automatically (`reactCompiler` in `next.config.ts`):
  keep render functions pure, put helpers outside components, and use `useEffectEvent` for effects that need the
  latest props. `pnpm check:compiler` fails when the compiler has to skip a component.
- **Languages.** Every content page has an address per language: English without a prefix (`/guide`), the others
  under their code (`/de/guide`, `/fr/blog/<slug>`). Two root layouts (route groups) set `<html lang dir>` on the
  server: `app/(en)/layout.tsx`, and `app/[lang]/layout.tsx`, built for each other language with
  `generateStaticParams`. Both render the same page components (`app/guide/GuidePage.tsx`, `app/LandingPage.tsx`, …)
  in the page's language and read the interface text (`lib/dictionaries.ts` over `lib/locales/<code>.ts`) and the
  long content (`app/<page>/content/<code>.ts`, `app/blog/<slug>/<code>.ts`) on the server, so the browser gets
  that language only.
- **Text in the browser.** `LanguageProvider` (`app/LanguageProvider.tsx`) gets the page's language from the server
  and only the strings its client components use (`lib/dictionaries.ts`: the site chrome everywhere; the home page
  and the room add theirs with `MoreTranslations`). A client component that starts using a new key must add it to
  its list there. Titles and descriptions for search engines are in `lib/meta/<code>.ts`; `lib/seo.ts` builds the
  canonical, hreflang and Open Graph data. Links go through `localizedPath()` (`lib/localePath.ts`).
- **Choosing a language.** The language menus go to the same page in the chosen language and save the choice; an
  English page sends a visitor with a saved choice (or, once per visit, a browser language the site has) to their
  language. The room and the 404 page (`app/global-not-found.tsx`) have one address for everyone and pick the
  language in the browser, loading other dictionaries on demand.
- **Redirects.** `proxy.ts` redirects old `?lang=` links to the language's address. Every old address takes one
  redirect: `next.config.ts` turns off Next's own trailing-slash redirect (`skipTrailingSlashRedirect`) and handles
  `/en`, trailing slashes, the bare domain and the old `/auth` pages itself. The landing pages' paths and dates live
  in `app/landingPages.ts`, which the pages and the sitemap both read.
- **Styling**: Tailwind CSS 4 with the palette in `app/globals.css`: bright paper (`slate-*`, warm greys from
  `#FBFAF7` for the light theme to a soft anthracite, `#1A1C21`, for the dark one) with a card-suit red
  (`accent-*`). Shared surfaces and buttons are classes there (`.glass`, `.btn-primary`, `.btn-secondary`, the
  `shadow-card` / `shadow-raised` / `shadow-overlay` depths); page building blocks are in `app/surfaces.tsx` and
  `app/ContentPage.tsx`; the playing cards (`pc-*`: face, back, flip) in `app/(en)/room/[id]/room.css`. Page changes
  animate with React's `<ViewTransition>` (`app/PageTransition.tsx`, `app/transitions.css`; full page loads use the
  CSS cross-document transition). Motion is reduced when the system asks for it. The stylesheet is inlined into the
  HTML (`inlineCss`).
- **PWA**: `public/sw.js` caches the static assets and a few pages for offline use (`public/offline.html` when
  nothing is cached), never the API or rooms.

## Deployment

### Configuration

All settings are environment variables, described in [`.env.example`](../.env.example):

| Variable | Required | What it does |
|---|---|---|
| `ROOM_TOKEN_SECRET` | yes | Signs the room cookies (see [Identity](#identity)). 32 characters or more (`openssl rand -base64 32`); a shorter one is refused in production |
| `REDIS_URL` | no, but use it in production | Room snapshots that survive a restart or deploy, and kept rooms. Nothing else is stored there |
| `LOG_LEVEL` | no | `trace`, `debug`, `info`, `warn` or `error` (default `info` in production, `debug` otherwise) |

The app listens on port 3000; the Docker image sets `PORT` and `HOSTNAME`.

### With Shipwick

The public site runs on one server with [Shipwick](https://shipwick.com). [`shipwick.yaml`](../shipwick.yaml)
describes Redis (append-only file, daily backup) and the app, both read-only and unprivileged (see
[Security measures](#security-measures)). Store the secret on the server once, then deploy:

```bash
shipwick secret set ROOM_TOKEN_SECRET    # a value from openssl rand -base64 32
shipwick deploy                          # the first time: Redis, then the app
shipwick deploy scrum-poker              # later releases: the app alone
```

`shipwick deploy redis` is needed only when the Redis entry changes. Each app deploy builds the image and replaces
the running replica without ending its rooms (see [Deploys](#deploys)). The health check is `GET /api/health`.

### With Docker

The [`Dockerfile`](../Dockerfile) builds a self-contained image (Next's standalone output) that runs as a non-root
user on port 3000:

```bash
docker build -t scrum-poker .
docker network create sp
docker run -d --name sp-redis --network sp -v sp-redis:/data redis:8-alpine \
  redis-server --appendonly yes --maxmemory 192mb --maxmemory-policy volatile-ttl
docker run -d --name scrum-poker --network sp -p 3000:3000 --env-file .env \
  -e REDIS_URL=redis://sp-redis:6379 scrum-poker
```

The append-only file keeps kept rooms across Redis restarts, and `volatile-ttl` makes them the last thing evicted
when memory runs short.

### Running your own instance

- **One instance only.** Rooms live in the process's memory; two instances side by side would each have their own
  rooms (see [Overview](#overview)). Grow with a bigger server.
- **HTTPS.** In production the room cookie is `Secure`, so over plain HTTP nobody can join a room (except on
  `localhost`). The app also sends HSTS with `includeSubDomains; preload`.
- **Your domain and your details.** The site's address is `SITE_URL` in [`lib/seo.ts`](../lib/seo.ts); the
  bare-domain redirect in [`next.config.ts`](../next.config.ts), [`public/robots.txt`](../public/robots.txt) and the
  Open Graph image ([`app/opengraph-image/route.tsx`](../app/opengraph-image/route.tsx)) name it too, and the contact
  address is in [`app/SiteFooter.tsx`](../app/SiteFooter.tsx) and [`app/RootDocument.tsx`](../app/RootDocument.tsx).
  The terms and privacy policy (`app/terms/content/`, `app/privacy/content/`) name the operator of
  scrumpokerplay.com and describe that site's hosting; they don't fit another instance as they are.
- **Your source code.** If you change the code, point the footer's "Source code" link (`app/SiteFooter.tsx`) at
  your version: the AGPL asks you to offer it to your users.
- **Behind Cloudflare**, accept traffic from Cloudflare only (a firewall on the server): the app believes the
  visitor's address in `CF-Connecting-IP` only when the request came from a Cloudflare address, and rate limits
  depend on it. If you add a cache rule for HTML pages, leave out `/api/*` and `/room/*`, and purge the cache on
  every deploy: a cached page from the old build points at JavaScript files the new one no longer has. Keep
  **Rocket Loader off**: it re-runs the page's inline scripts without their nonce, so the room page's
  Content-Security-Policy blocks Next.js's scripts and the room never starts.

## Where things are

```
app/
  (en)/                     English pages (no prefix) and the room: root layout, thin page files
  (en)/room/[id]/           The room page (RoomClient.tsx, RoomMoreMenu.tsx, ShortcutsDialog.tsx, roomText.ts)
  [lang]/                   The same pages in the other languages (/tr, /de/guide, …): root layout, page files
  api/rooms/                Room API: create, and one folder per action (vote, reveal, join, events, …)
  api/health/               Health check for the deploy
  RootDocument.tsx          The <html> both root layouts share: language, providers, theme, structured data
  LanguageProvider.tsx      The page's language and strings for client components
  blog/, guide/, privacy/, terms/, …   Page components and their per-language content
  blog/articles.ts          Every blog article: its content per language, related posts, dates
  sitemap.ts                The sitemap: every page in every language
  global-not-found.tsx      The 404 page
lib/
  store.ts                  Rooms: state, actions, presence, broadcasting, Redis persistence, deploy handover
  redis.ts                  The Redis client, room and chat snapshots
  keptRooms.ts              Kept rooms in Redis, owner keys
  ownedRooms.ts             The owner keys this browser holds (local storage)
  browserId.ts              This browser's participant id
  roomToken.ts              The signed room cookie
  roomRequest.ts            Shared checks for room routes (membership, rate limits, the body, fields, errors)
  limits.ts                 Every limit on user input (shared by server and browser)
  rateLimit.ts              Sliding-window rate limiter and the room-code guessing limit (in memory)
  clientIp.ts               The visitor's address behind Cloudflare and the proxy
  deck.ts                   Decks and text cleaning (shared by server and browser)
  confusables.ts            Which names read alike
  storyImport.ts            Reading pasted or imported stories (CSV) in the browser
  inlineScripts.ts          Our inline scripts (theme, service worker, owner key), allowed by hash on the room page
  logger.ts                 Logging (pino), without room content
  translations.ts           The languages, and loading a dictionary in the browser
  locales/                  Interface text, one file per language
  dictionaries.ts           Which interface text each page sends to the browser
  i18n.ts                   Plural forms and placeholders
  meta/                     Page titles and descriptions for search engines, one file per language
  blogPosts.ts              The blog index: titles, descriptions and read times per language
  localePath.ts             Which pages exist in every language, and their address in each
  seo.ts                    Canonical, hreflang and Open Graph data
proxy.ts                    Guards in front of the API (body size, cross-site, content type), the room's
                            Content-Security-Policy, old ?lang= links
next.config.ts              The other pages' Content-Security-Policy and security headers, redirects
public/sw.js                The service worker
e2e/                        Playwright tests (end-to-end, accessibility, layout audit)
scripts/                    React Compiler check, load test
Dockerfile, shipwick.yaml   The image, and the production deployment
```
