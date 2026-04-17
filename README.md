# qstr-mrktng

Quaestor marketing site (SvelteKit 5 + Tailwind CSS 4), deployed to Cloudflare Pages with prerendered marketing pages plus edge endpoints.

This repo is set up to be worked on by a human owner plus an AI coding agent.

See also: [`CLAUDE.md`](./CLAUDE.md)

## 1) Quick start

```bash
npm ci
cp .env.example .env
npm run dev
```

Default dev URL: `http://127.0.0.1:5173`

The dev command uses `scripts/dev-safe.mjs` to auto-clear stale local Vite processes for this project.

## 2) Required quality gate (before PR/merge)

Run all three:

```bash
npm run check
npm run lint
npm run build
```

If lint fails only due formatting, run:

```bash
npm run format
npm run lint
```

## 3) Project map

### High-signal content files

- `src/lib/site.ts` — main marketing copy, nav, CTA links, pricing, FAQ, section content.
- `src/lib/method-content.ts` — long-form method chapter content.
- `src/lib/method.ts` — method index and slug helpers.

### Routes

- `src/routes/+page.svelte` — homepage.
- `src/routes/method/+page.svelte` — method landing page.
- `src/routes/method/[slug]/+page.svelte` + `+page.ts` — chapter pages.
- `src/routes/partners/+page.svelte` — partner page + intake flow.
- `src/routes/contact/+page.svelte` — contact page.
- `src/routes/ai-score/+page.svelte` — AI Score UI.
- `src/routes/ai-score/submit/+server.ts` — Resend-backed manual grader intake endpoint.
- `src/routes/grade/+server.ts` — Anthropic/Supabase grading endpoint (`POST /grade`, `PATCH /grade`).
- `src/routes/+layout.svelte` — global header/nav + analytics scripts + favicon/logo proxy handling.

### Shared utilities

- `src/lib/analytics.ts` — event tracking helper used by CTA interactions.
- `static/` — image/video assets used by pages.

## 4) Environment variables

Copy from `.env.example` and fill only what you need.

Public runtime vars (safe for browser exposure):

- `PUBLIC_PLAUSIBLE_DOMAIN` (optional, defaults to `cursus.tools`)
- `PUBLIC_PARTNER_INTAKE_ENDPOINT` (optional; if empty, partner intake falls back to `mailto:`)
- `PUBLIC_PARTNER_INTAKE_EMAIL` (optional fallback email)

Server runtime vars (secret; never commit values):

- `ANTHROPIC_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `IP_HASH_SALT` (optional, recommended)
- `RESEND_API_KEY` (or `PRIVATE_RESEND_API_KEY`)
- `AI_SCORE_FROM_EMAIL` (or `PRIVATE_FROM_ADMIN_EMAIL`)
- `AI_SCORE_TO_EMAIL` (optional, defaults to `danny+grader@cursus.tools`)

Local deploy vars (secret; never commit values):

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 5) Deployment

### Local CLI deploy

```bash
npm run cf:whoami
npm run cf:pages:deploy        # preview branch deploy
npm run cf:pages:deploy:prod   # production (main branch target)
```

`wrangler.toml` is configured for project `qstr-mrktng` with output dir `.svelte-kit/cloudflare`.

### GitHub Actions deploy

This repo includes a standalone workflow at:

- `.github/workflows/cloudflare-pages.yml`

It runs `check`, `lint`, and `build`, then deploys to Cloudflare Pages.

If you're still running inside the parent monorepo (`/srv/dev/qstr`), there is also a monorepo-scoped workflow at:

- `/srv/dev/qstr/.github/workflows/cloudflare-pages-qstr-mrktng.yml`

## 6) Handoff checklist (recommended)

- [ ] Rotate any previously shared/exposed Cloudflare tokens.
- [ ] Confirm GitHub repo secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.
- [ ] Ensure agent reads `CLAUDE.md` before first task.
- [ ] Start from `STARTER_BACKLOG.md` for first PRs.
