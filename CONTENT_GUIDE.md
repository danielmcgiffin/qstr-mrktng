# Content Guide

Most small marketing edits should be data edits, not Svelte layout edits.

## Common Edits

- Homepage copy: edit `src/routes/content.ts`.
- Operators page copy: edit `src/routes/ops/content.ts`.
- Partners page copy and partner CTA behavior: edit `src/routes/partners/content.ts`.
- About page founder cards/copy: edit `src/routes/about/content.ts`.
- Docs skeleton copy: edit `src/routes/docs/content.ts`.
- Changelog skeleton copy: edit `src/routes/changelog/content.ts`.
- Pricing: edit `src/routes/pricing-content.ts`.
- Method chapters: edit `src/routes/method/content.ts`.
- Security page copy: edit `src/routes/security/content.ts`.
- Contact page copy: edit `src/routes/contact/+page.svelte`.
- Global header CTA rules: edit `src/routes/+layout.svelte`.
- Canonical/OG site origin: set `PUBLIC_SITE_ORIGIN`.

## Page Structure

The main marketing pages are assembled from shared section components in `src/lib/components/marketing/`:

- `MarketingHero.svelte`
- `BulletSection.svelte`
- `CardGridSection.svelte`
- `StepsSection.svelte`
- `ProofFaqSection.svelte`
- `PricingSection.svelte`
- `FinalCtaSection.svelte`
- `MarketingFooter.svelte`

Use those components for new marketing sections before adding route-local markup. If a visual pattern appears on two pages, it should probably be a shared component or a semantic class in `src/app.css`.

## Styling Rules

- Design tokens live in `src/tokens.css`.
- Reusable marketing primitives live in `src/app.css`.
- Prefer semantic classes like `btn`, `btn-primary`, `panel-card`, `section-title`, and `marketing-section` over long route-local Tailwind strings.
- Add a new token only when the value is part of the brand system. Add a component/class when the issue is repeated UI structure.

## Quality Gate

Run these after a content or layout change:

```bash
npm run check
npm run lint
npm run build
```
