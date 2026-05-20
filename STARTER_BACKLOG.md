# STARTER_BACKLOG.md

Small, high-confidence tasks for next Claude Code PRs.

## Baseline already completed (2026-03-16)

- ✅ `npm run lint` passes from clean checkout.
- ✅ Standalone workflow exists at `.github/workflows/cloudflare-pages.yml` and includes `check` + `lint` + `build` before deploy.

## P1 — Content and conversion improvements

### Task 1: Audit CTA tracking consistency

- **Goal:** ensure all high-value CTAs fire analytics events.
- **Likely files:** `src/routes/+page.svelte`, `src/routes/+layout.svelte`, `src/routes/partners/+page.svelte`, `src/routes/contact/+page.svelte`.
- **Acceptance criteria:**
  - Hero/nav/contact/partner primary CTAs emit events.
  - Event naming remains consistent with existing schema.

### Task 2: Add social proof/testimonial block to homepage

- **Goal:** increase trust signals above pricing.
- **Likely files:** `src/routes/content.ts`, `src/routes/+page.svelte`.
- **Acceptance criteria:**
  - New section renders cleanly on mobile and desktop.
  - Content is configured from data in `src/routes/content.ts`.

## P2 — Operational safety

### Task 3: Document release checklist

- **Goal:** make production release steps repeatable for non-engineers.
- **Likely files:** `README.md`.
- **Acceptance criteria:**
  - Checklist includes tests, deploy command, smoke checks, rollback note.
