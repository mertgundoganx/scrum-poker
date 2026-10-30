## What and why

<!-- What changes for the visitor, and why. Link the issue it closes: "Closes #123". -->

## How it was tested

<!-- The checks you ran, and what you tried by hand. Screenshots for visual changes (light/dark, phone/desktop). -->

## Checklist

<!-- CONTRIBUTING.md explains each point. -->

- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm check:compiler` and `pnpm build` pass
- [ ] `pnpm test:e2e` passes, and new behaviour has a test
- [ ] `pnpm test:layout` passes (for changes to layout or text)
- [ ] New interface text is in `lib/locales/en.ts` and translated in the other six files (or the untranslated ones are listed below)
- [ ] Input from requests is checked on the server, within `lib/limits.ts`
- [ ] Values stored in Redis still read in their old shape, and new keys expire
- [ ] No new dependency, or the reason for it is given below
