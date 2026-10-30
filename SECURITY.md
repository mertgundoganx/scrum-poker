# Security policy

## Reporting a vulnerability

Please **don't open a public issue** for a security problem. Report it privately instead:

- **GitHub**: use *Report a vulnerability* on the repository's *Security* tab
  ([private vulnerability reporting](https://github.com/mertgundoganx/scrum-poker/security/advisories/new)).
- **E-mail**, if that isn't available or you prefer it: contact@scrumpokerplay.com, with "Security" in the
  subject.

Please include what you found, the steps to reproduce it, and what an attacker could do with it. A proof of
concept helps, but isn't required.

## What happens next

This is a spare-time project run by one person, so everything here is best effort, without guarantees about
response or fix times:

- You'll get a confirmation that the report arrived, and updates while it's looked into.
- We'll agree on when it's made public, normally once a fix is released.
- If you like, you'll be credited in the fix's notes.

There is no bug bounty or other reward.

## Scope

In scope:

- The code in this repository. Only the current version (the `master` branch, which the public site runs) gets
  fixes.
- The public site it runs: [www.scrumpokerplay.com](https://www.scrumpokerplay.com).

Out of scope:

- Third-party services in front of or around the site, such as Cloudflare (its proxy, firewall and analytics
  beacon), the hosting provider and GitHub. Report problems there to their owners.
- Other people's instances of this code: report to whoever runs them (a bug in the code itself is in scope).
- How much traffic the public site can take: denial of service, load and rate-limit volume tests.
- Findings without a security impact, such as missing headers that protect nothing here, version banners,
  or reports produced by a scanner without a working attack.
- Social engineering, and physical attacks.

## Testing guidelines

- **Test against your own instance** wherever you can: see the [Quick start](README.md#quick-start) and
  [Deployment](docs/ARCHITECTURE.md#deployment). Load tests ([`scripts/loadtest.mjs`](scripts/loadtest.mjs)) and
  anything that sends many requests belong there, never on the public site.
- On the public site, use only rooms you created yourself; never access, change or delete other people's rooms,
  kept rooms or messages, and don't try to guess room codes or owner keys.
- Stop and report as soon as you find something that exposes other people's data, and don't keep it.

## Security design

[Security measures](docs/ARCHITECTURE.md#security-measures) in the architecture notes describes how rooms, kept
rooms and the server are protected, and [Input rules](docs/ARCHITECTURE.md#input-rules) what the server accepts.
