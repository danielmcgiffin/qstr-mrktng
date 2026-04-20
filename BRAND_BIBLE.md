# Quaestor Brand Bible

## 1. North Star

**Quaestor is an operational atlas for founder-led businesses.** It maps roles → processes → systems as connected, navigable relationships so the people doing the work can answer their own questions, the founder can stop being the help desk, and the business can grow smoothly.

One-liner: _How your business actually works._

Every design or copy decision must reinforce "atlas": connected, navigable, alive, authoritative. If it doesn't, it's wrong.

### Taglines (in the arsenal)

- _Handle Your Business._ short-form lockup tagline
- _Clarity is freedom._ philosophical positioning line
- _Team operations for the AI age._ longer-form positioning kicker

Short-form primary: **Handle Your Business.** Pair with the lockup. Never stack two taglines on one surface.

---

## 2. Identity Axioms

Non-negotiable. Every surface is judged against these.

### A. Continuous use, not fresh launch

The Pantheon is still standing because it has been used continuously for 2,000 years. The Pont du Gard still spans its valley because it was built for a job and the job never ended. The brand feels **lived-in, durable, active** — never pristine, never launch-y.

_In practice:_ no floating phone mockups, no gradient starfields, no "new product glow." The aesthetic is a well-maintained civic building, not a product hunt launch.

### B. Classical without kitsch

Rome = order, authority, operational discipline of a civilization. NOT _Gladiator_, togas, laurel wreaths, faux-Latin jargon, column-icons, or statuary. The reference is **architectural and typographic**, not theatrical.

_In practice:_ Roman references must be functional engineering (rotunda, aqueduct, coffering) or typographic (inscription-style serifs). Never costume.

### C. Clarity is freedom

Documented, connected operations free the founder from being the bottleneck. The brand is in service of liberation, not completeness. We are against documentation theater.

_In practice:_ every surface earns its space by liberating someone from an interruption. Avoid "comprehensive," "complete," "robust." Prefer "unblock," "delegate," "answer."

### D. Relationships over documents

A graph of typed relationships beats a library of prose. The brand expresses this through **connectivity as visual language** — lines, links, junctions, paths. Rarely stacks of pages, folder icons, or document metaphors.

### E. Witness, not thought leader

The voice observes and names. It does not evangelize, mentor, or launch. Senior operator who has seen what breaks, not marketer who has decided what should work.

---

## 3. Voice

### Cadence

- Short declarative punches alternated with elaboration. Non-uniform sentence length.
- Scene-first openers. Never "Every [noun]…" or "In today's business…"
- Second person dominant. First person plural sparingly. Never "one." Never passive corporate narration.
- One proprietary noun per paragraph max. Stack three and you sound like a buzzword generator.

### Register

- Senior operator + literate founder. Capable of a Chestertonian inversion with only a little winking. Capable of 37signals-style terseness.
- No corporate hedges. No stand-up comedy. No exclamation points.
- Wordplay is great, actually. We do have fun here. But not corporate fun. The best wordplay is structural (two meanings doing real work), not ornamental (groan-puns).

### Canonical examples (tuning fork)

- _"Leaving it unwritten trades short-term ease for long-term pain."_
- _"Notion isn't a system of record."_
- _"No documentation theater."_
- _"Wrong steps are worse than missing ones."_
- _"If it isn't written down, it isn't real."_

New copy sits next to these without clashing.

### The founder vs. marketer test

Read aloud. Does it sound like Danny at a dinner, or a launch blog? If the second, rewrite. If it contains "helps you," it's the second.

### Forbidden phrases (marketing copy)

- "helps you [verb]"
- "unlock the power of"
- "seamless / seamlessly"
- "at scale" (as a suffix; literal uses fine)
- "in today's [noun]"
- "solutions" (say the thing)
- "streamline your workflows"
- "empower your team"
- "AI-powered" (we are agent-native; different claim, different word)
- "leverage"
- "single source of truth" (we have a specific definition — don't dilute)
- em-dash bombing where a period would do

### Proprietary vocabulary

| Term                              | Use when                                |
| --------------------------------- | --------------------------------------- |
| Operational atlas                 | Describing the product as a whole       |
| Atlas / map                       | Abbreviated reference                   |
| Role → Process → System (triad)   | Technical/structural claim              |
| Typed relationships               | Differentiation from wikis/docs         |
| Liberation                        | Customer outcome / philosophical frame  |
| Chains                            | Specific obligations trapping a founder |
| Clarity is freedom                | Tagline / wall slogan                   |
| Handle Your Business              | Primary tagline / lockup                |
| Documentation graveyard / theater | Naming the antipattern                  |
| Shadow ops                        | Undocumented tacit operations           |
| Heroic operations                 | Founder-as-help-desk pattern            |
| Frankenstein systems              | Ad-hoc assembled ops stacks             |

---

## 4. Typography

### Stack

| Role                              | Typeface                          | Weights            | Notes                                                                                                                         |
| --------------------------------- | --------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Display / H1 / Wordmark character | **Fraunces** (working substitute) | 600, 700           | Bracketed serif with architectural weight. Matches Patrick's wordmark character. Swap for Patrick-spec'd face when confirmed. |
| Body / UI                         | **Inter**                         | 400, 500, 600, 700 | Workhorse. Keep.                                                                                                              |
| Mono / Data / Labels              | **IBM Plex Mono**                 | 400, 500           | Process IDs, metrics, triad labels, table headers in caps. Never decorative.                                                  |

⚠ **Open typography decision:** confirm Patrick's specific display serif. Fraunces is a solid free stand-in. Alternatives: Source Serif 4, Tiempos Headline, Canela, GT Super. NOT Cormorant Garamond (too delicate for this character).

### Rules

- Display serif for H1s and occasional oversized H2s only. Never body. Never buttons. Never small labels.
- Display headlines run tight: `line-height: 1.05` at display sizes.
- Inter does all UI and all body.
- IBM Plex Mono earns its appearance by marking something as data/structured. Semantic choice, not aesthetic.
- No third display font. Ever.

### Scale

| Token          | Size / Leading                    |
| -------------- | --------------------------------- |
| `--fs-display` | clamp(2.5rem, 5vw, 4.5rem) / 1.05 |
| `--fs-h1`      | clamp(2rem, 3.5vw, 3rem) / 1.1    |
| `--fs-h2`      | clamp(1.5rem, 2.5vw, 2rem) / 1.2  |
| `--fs-h3`      | 1.25rem / 1.35                    |
| `--fs-body`    | 1rem / 1.6                        |
| `--fs-small`   | 0.875rem / 1.5                    |
| `--fs-mono`    | 0.875rem / 1.4                    |
| `--fs-micro`   | 0.75rem / 1.4 (eyebrows/labels)   |

### The label pattern

Small, ALL CAPS, mono, letter-spaced `0.08em`, used as eyebrows or metadata:

```text
TEAM OPERATIONS FOR THE AI AGE
AGENTIC INTEGRATIONS   SOC2 COMPLIANT
```

Section eyebrows, feature labels, footer metadata. Never body. Never buttons.

---

## 5. Color

The brand runs a **two-palette system** scoped to context. Do not mix.

### Use Palette (CANONICAL — marketing, product, docs, daily surfaces)

For surfaces users spend minutes in. Muted. Warm. Low eye-fatigue. The "civic building / reference library / technical manual" register.

| Role                                 | Token             | Hex                        |
| ------------------------------------ | ----------------- | -------------------------- |
| Anchor crimson (wordmark)            | `--accent`        | **`#A31F21`**              |
| Deeper crimson (CTA emphasis, hover) | `--accent-deep`   | `#82181A`                  |
| Accent tint (soft red surface)       | `--accent-tint`   | `#FAE8E8` (ASSUMED — tune) |
| Page bg cream                        | `--bg`            | `#F9F5EC`                  |
| Card / panel                         | `--bg-panel`      | `#FFFEFA`                  |
| Subtle recess                        | `--bg-subtle`     | `#F3EEE0` (ASSUMED)        |
| Text ink                             | `--text`          | `#20252E`                  |
| Text muted                           | `--text-muted`    | `#5B6067` (ASSUMED)        |
| Divider                              | `--border`        | `#E6DFCD` (ASSUMED)        |
| Divider emphasis                     | `--border-strong` | `#B4A582` (ASSUMED)        |

**Canonical wordmark red: `#A31F21`.** All chrome, CTAs, and the mark itself draw from this.

### Attention Palette (Patrick's spec — outdoor, ads, launch, high-visibility)

For surfaces that need to shout at distance: metro posters, billboards, app icon, launch imagery, press kits. High contrast, vivid.

| Role                      | Hex       |
| ------------------------- | --------- |
| Bright red (Patrick mark) | `#E13339` |
| Pure white                | `#FDFDFD` |
| Deep navy                 | `#012B41` |

Use only for at-a-distance / attention-grabbing applications. Never mix into marketing site or product UI.

### The 60/30/10 discipline (use palette)

- 60% cream bg
- 30% white panels + ink (text, chrome)
- 10% crimson

If crimson > 10% of visible surface, cut. Its job is to draw the eye to the next action or the canonical mark. Decorative red is off-brand.

### Pairing rules

- Ink on cream: default body.
- Crimson on cream: CTAs, chrome fills, labels. Headlines at large sizes only; never small body text.
- Cream on crimson: CTA button text, nav item text, logo lockup on red chip.
- Crimson on white: cards with crimson-marked icons or CTAs.

### Dark theme (product surfaces only)

Scoped via `[data-theme="dark"]`. Near-black bg, warm-white text, slightly brightened crimson for contrast. Does not leak into marketing pages.

### What's NOT brand color

**Purple role badges (F-I, F-E, QE, etc.) are data-visualization, not brand.** Scoped to product entity labels. Never on marketing surfaces. If data-viz needs a broader palette (role/system coding), that's a separate system documented in the product spec — not here.

---

## 6. Motif System

Patrick's mark is an overloaded glyph that reads three ways. Understand this before extending.

### The mark (three readings)

1. **Pantheon rotunda from below** — coffered segments radiating around a central oculus.
2. **A stylized Q** — the central oculus + descending ray acts as the Q's tail.
3. **A keyhole** — center circle with descending key shape. Nods to Seven Locks' signature and reinforces "Quaestor = key to your operations."

The mark is the vocabulary. All derivative motifs extend from it.

### Derivative motifs

**1. The oculus ray** — descending radial ray indicating illumination / orientation.

- Use: hero background accents, section dividers, loading states.
- Constraint: always descending. Never sideways, never ascending.

**2. Coffered arc / radial segments** — nested cells in radial or linear arrangement.

- Use: section background texture at low opacity, card header accents, empty states.
- Constraint: cells imply _containment / node / cell_. Ties back to the graph thesis. Never decorative.

**3. The monogram Q** — Patrick's canonical mark.

- Use: navbar, favicon, watermark, app icon.
- Constraint: the ONLY logo. Lockup with wordmark only when space requires. Never tilt. Never bounce-animate. Never recolor outside approved combinations.

**4. The atlas line** — thin lines between nodes (role → process → system triads).

- Use: how-it-works diagrams, hero backgrounds, "what breaks if Linda leaves" illustrations.
- Constraint: lines must terminate in _labeled_ nodes. Never floating lines as decoration. Always diagnostic.

**5. Arched imagery** — photographs of continuously-used Roman engineering.

- Use: about page, vision deck, occasional large-format ad.
- Constraint: real functional engineering only (rotundas, aqueducts, arched bridges). No romanticized ruins. No sculpture. No columns-as-ornament.

### Replaces

- Stock photography of offices, handshakes, laptops, plants → none.
- 3D blobs or friendly AI mascots → none.
- Product screenshots as sole hero image → none. Screenshots are proof, page 2.

Hero images communicate the _concept_ before they show the _UI_.

---

## 7. Component Rules

### Buttons / CTAs

- Primary: `--accent` bg, cream text, 10px radius.
- Deep primary (emphasis): `--accent-deep` bg. Same rules.
- Secondary: outline on cream bg, `--text` inside, `--border-strong` line.
- On crimson chrome: white bg + crimson text, or white outline + white text.
- **One primary CTA per section.** Never two.
- Copy: first-person verb phrase. _Book a call. See the demo. Become a partner._ Never _Learn more_, _Get started_, _Click here_.

### Sections — the cardinal rule

**One job per section.** Hardest discipline; the one the current site fails on.

Each section answers ONE question:

| Section   | Question                  |
| --------- | ------------------------- |
| Hero      | What is this?             |
| Pain      | Do you get me?            |
| Mechanism | How does it work?         |
| Proof     | Why should I believe you? |
| Price     | What does it cost?        |
| CTA       | What do I do now?         |

Two questions = two sections. Split or cut.

### Cards

- `--bg-panel` bg, `--border` border, 12-16px radius, ≥24px padding.
- Max 3-4 per grid. Six cards = two concepts fighting. Separate.
- Title in display serif or Inter 600. Body Inter 400 `--text-muted`.
- No gradients. Shadows restrained: `--shadow-sm` default, `--shadow-md` for elevated.

### Benefit strips

- If used: ONE strip, 4 items max. Plain text, no bg panels, no two-column comparisons.
- Current site has TWO stacked panels ("gain" + "stop rebuilding") — kill one. Say the value once.

### Numbered step lists

- Max 4 steps. 5+ means mechanism isn't compressed.
- Number badges: white bg, crimson or ink ring, not solid filled.
- Each step: 2-5 word title + one sentence. Nothing longer.

### Pricing

- Max 3 tiers visible. Free (if offered) as "Or start free →" link below — not a 4th card.
- Tier names: domain-resonant, not generic. Reach for _Solo / Practice / Firm_ or _Operator / Partnered / Network_. If stuck, tier by price.
- No robot-counting ("up to 49 people"). Say "your whole team" or "unlimited seats."

### Labels / eyebrows

- Mono IBM Plex, ALL CAPS, `0.08em` tracking, 0.75rem.
- Crimson on cream is default. Ink on cream when competing with nearby crimson.

### Navigation

- Crimson chrome (sidebar in-product; top header may be cream with crimson accents on marketing — pick one treatment per page and keep it).
- Logo always links to `/`. Full stop.

---

## 8. Anti-Patterns (observed, blocked)

1. **Triple-layer headlines.** Eyebrow + H2 + subhead saying the same thing three ways. Max two layers.
2. **Benefit stated twice** (gain + loss-aversion panels). Say it once.
3. **Mid-section CTAs that scroll to a later section.** CTAs close arguments — they don't interrupt them.
4. **Two "how it works" flows on the same page.** One mechanism per page.
5. **Taupe muted bars for benefits.** Reads as disabled UI. Don't mute what matters.
6. **Product screenshots as hero.** Hero communicates the concept. Screenshots are proof, page 2.
7. **"Learn more" and "Get started" CTAs.** Say what the user is about to do.
8. **Dark-mode styles leaking into light pages.** One palette per page. No stray `bg-black` / `text-white` classes.
9. **Mixing Attention Palette into Use Palette pages.** Bright `#E13339` on marketing = wrong register. Use canonical `#A31F21`.
10. **Data-viz purple on marketing.** Keep purple scoped to product entity labels.

---

## 9. Photography / Imagery

- Stock photography: none on marketing. Zero exceptions.
- Illustration: geometric motifs only (coffering, oculus, atlas lines). No character illustration.
- Product screenshots: dark theme UI framed in cream "window chrome," shown as PROOF after the concept lands. Never in the hero slot.
- Diagrams: graph-shaped (nodes + typed edges) are on-brand. Consultant-deck boxes-and-arrows are off-brand.
- Arched Roman engineering photography (rotundas, aqueducts): use sparingly for about/vision surfaces only.
