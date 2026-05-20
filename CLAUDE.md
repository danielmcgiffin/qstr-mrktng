# CLAUDE.md

Instructions for Claude Code agents working in `qstr-mrktng`.

## Mission

Maintain and improve the Quaestor marketing site while preserving:

- messaging consistency,
- static-site reliability,
- clean deploy path to Cloudflare Pages.

## Read this first (in order)

1. `README.md`
2. `BRAND_BIBLE.md`
3. `src/routes/content.ts`
4. `src/routes/method/content.ts`
5. `src/routes/+layout.svelte`
6. `src/lib/analytics.ts`

## Architecture quick map

- **Content model:**
  - Page-owned content lives beside its route in `src/routes/**/content.ts`.
  - `src/routes/content.ts` = default homepage content.
  - `src/routes/method/content.ts` = method chapters.
- **Rendering:** SvelteKit routes in `src/routes/**`.
- **Build mode:** static prerender (`src/routes/+layout.ts` exports `prerender = true`).
- **Styling:** global styles in `src/app.css`, design tokens in `src/tokens.css`, and route/layout CSS.
- **Assets:** `static/`.
- **Analytics:** event helper in `src/lib/analytics.ts` (Plausible/gtag/dataLayer compatible).

## Hard constraints

1. Keep the site static-compatible (no server-only runtime features unless explicitly requested).
2. Follow `BRAND_BIBLE.md` for voice, palette, typography, motif, and component rules.
3. Do not commit secrets, tokens, or real `.env` values.
4. Prefer editing route-local `content.ts` files rather than hardcoding copy in page components.
5. Preserve existing analytics event names unless asked to change them.
6. Keep changes scoped to requested outcome; avoid opportunistic refactors.

## Allowed workflow

1. Restate requested outcome + affected files.
2. Make smallest viable change.
3. Run quality gates:
   - `npm run check`
   - `npm run lint`
   - `npm run build`
4. Report:
   - files changed,
   - command results,
   - any follow-up risks.

## Definition of done

A task is done only when:

- requested behavior/content is implemented,
- `check`, `lint`, and `build` pass (or failures are pre-existing and explicitly documented),
- no secrets were introduced,
- output summary includes verification commands and results.

## Common task routing

- **Homepage copy/CTA/pricing/nav/FAQ edits:** `src/routes/content.ts`
- **Method chapter edits/additions:** `src/routes/method/content.ts` (+ optional route polish)
- **Header/nav/tracking adjustments:** `src/routes/+layout.svelte`
- **Partner intake behavior:** `src/routes/partners/+page.svelte`
- **Contact page content:** `src/routes/contact/+page.svelte`

## Non-goals by default

- Rewriting design system/tokens.
- Reorganizing all route structure unless explicitly requested.
- Changing deploy provider.
- Migrating frameworks.

Unless explicitly requested, do not do these.
