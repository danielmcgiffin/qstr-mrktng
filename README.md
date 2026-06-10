# qstr-mrktng

Quaestor marketing site (SvelteKit 5 + Tailwind CSS 4), deployed to Cloudflare Pages with prerendered marketing pages plus edge endpoints.

This repo is set up to be worked on by a human owner plus an AI coding agent.

See also: [`CLAUDE.md`](./CLAUDE.md)
For content-only edits, start with [`CONTENT_GUIDE.md`](./CONTENT_GUIDE.md).

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

- `src/routes/content.ts` — marketing copy for the homepage (`/`), including the full funnel sections.
- `src/routes/manifesto/content.ts` — the Quaestor manifesto (`/manifesto`).
- `src/routes/partners/content.ts` — copy for the single-section **Partners** page (`/partners`).
- `src/routes/about/content.ts` — founder cards and about page copy.
- `src/routes/docs/content.ts` — docs index copy.
- `src/routes/changelog/content.ts` — changelog skeleton copy.
- `src/routes/pricing-content.ts` — shared pricing copy used by the marketing pages.
- `src/routes/method/content.ts` — long-form method chapter content.
- `src/routes/method/nav.ts` — method index and slug helpers.
- `src/routes/security/content.ts` — security and data handling page copy.
- `src/lib/components/marketing/` — shared section components used by the marketing pages.

### Routes

- `src/routes/+page.svelte` — homepage (hero → pain → diagnosis → product proof → method → convictions → reactions → tests → pricing → FAQ → final CTA).
- `src/routes/manifesto/+page.svelte` — manifesto page.
- `src/routes/ai-score/+page.svelte` — **AI Score** (lead-gen tool; previously "Ops Grader").
- `src/routes/method/+page.svelte` — method landing page.
- `src/routes/method/[slug]/+page.svelte` + `+page.ts` — chapter pages.
- `src/routes/partners/+page.svelte` — **Partners** page.
- `src/routes/about/+page.svelte` — founder/about page.
- `src/routes/docs/+page.svelte` — docs skeleton.
- `src/routes/changelog/+page.svelte` — release notes placeholder.
- `src/routes/security/+page.svelte` — security and data handling page.
- `src/routes/contact/+page.svelte` — contact page.
- `src/routes/ai-score/submit/+server.ts` — backend for AI Score (JSON + Base64 attachment).
- `src/routes/grade/+server.ts` — Anthropic/Supabase grading endpoint (`POST /grade`, `PATCH /grade`).
- `src/routes/+layout.svelte` — global header/nav with dynamic CTAs based on current home view.

### Site Navigation & CTAs

The site uses a dynamic header that adjusts its Primary CTA based on the user's current context:

- **Partners page (`/partners`)**: Primary CTA is "Book a partner call" (cal.com).
- **Default (including `/ai-score`)**: Primary CTA is "Map your business" (signup path).

Partner interest is flagged through the contact form's optional reason select (`/contact?type=partner` preselects it).

### Shared utilities

- `src/lib/analytics.ts` — global analytics helper for GA4/dataLayer events.
- `static/` — image/video assets used by pages.

### Analytics coverage

Global layout instrumentation records public-page behavior across the marketing site:

- `page_view` — every public SvelteKit route change.
- `section_view` — first meaningful view of each section/article on a page.
- `scroll_depth` — 25/50/75/90/100% page-depth milestones.
- `link_click`, `button_click`, `details_toggle`, `form_submit` — broad interaction coverage.
- Funnel-specific events such as `signup_start`, `demo_click`, `booking_click`, `partner_intake_click`, `ai_score_click`, and `pricing_plan_click` remain in place.

`/admin` routes are excluded from global analytics.

## 4) Environment variables

Copy from `.env.example` and fill only what you need.

Public runtime vars (safe for browser exposure):

- `PUBLIC_SITE_ORIGIN` (optional, defaults to `https://qstr.tools`)
- `PUBLIC_GA_MEASUREMENT_ID` (optional GA4 measurement ID override; defaults to `G-PMQNSJP905`, set to an empty value to disable GA). GA only loads when the page is served from `PUBLIC_SITE_ORIGIN`'s hostname, so preview deploys and local dev never report into the production property.

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

## 7) Production Release Checklist

Follow these steps to repeatably deploy updates to production safely.

### Step 1: Pre-Release Validation

Before running any deploy commands, run the validation gate locally to ensure formatting, linting, and SvelteKit compilation pass:

```bash
# Formats files, checks types, lints, and builds the production bundle
npm run format
npm run check
npm run lint
npm run build
```

Verify that all commands finish successfully with `0 errors and 0 warnings`.

### Step 2: Deploy to Production

To push the build live on Cloudflare Pages, run the production deploy command:

```bash
# Deploys the built files to Cloudflare Pages (targeting main branch / production)
npm run cf:pages:deploy:prod
```

_Note: Alternatively, pushing code to the `main` branch on GitHub will automatically trigger the GitHub Actions deployment workflow._

### Step 3: Smoke Checks

Once the deployment finishes, perform these manual tests:

1. **Homepage Check:** Open the site (e.g., `https://qstr.tools`) and verify the header logo, typography, and styling render properly.
2. **Navigation Check:** Visit `/method` and `/docs` to confirm sidebar navigation, category grouping, and active route highlighting behave correctly.
3. **Lead Gen / AI Score Check:** Navigate to `/ai-score`. Paste a small text paragraph and click "Score my SOP" to verify the grader API finishes scoring and renders the readiness results block.
4. **CTA Click Check:** Click a scheduling CTA button (e.g. TidyCal or Cal.com links) and confirm it opens the booking tool in a new tab.

### Step 4: Rollback (If needed)

If any critical issues are discovered:

1. Log into your **Cloudflare Dashboard**.
2. Navigate to **Workers & Pages** > **Pages** > **qstr-mrktng**.
3. Under the **Deployments** tab, find the last successful deployment (prior to this release).
4. Click the three dots next to that deployment and select **Rollback to this deployment** (or **Set as Active**) to immediately revert production.
