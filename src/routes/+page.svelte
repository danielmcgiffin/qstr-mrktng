<script lang="ts">
  import { site } from "$lib/site";
  import RotatingWords from "$lib/components/RotatingWords.svelte";
  const year = new Date().getFullYear();
</script>

<svelte:head>
  <title>Quaestor - Stop Babysitting. Start building.</title>
  <meta name="description" content="Quaestor turns how your business runs into a living operational map so your team can always find the answers they need in 3 clicks or less and generate always up-to-date job manuals and onboarding packs on demand." />
</svelte:head>

<div class="min-h-screen bg-black text-white">
  <div class="relative">
    <!-- Background -->
    <div aria-hidden class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute left-1/2 top-[-20%] h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"></div>
      <div class="absolute left-[10%] top-[30%] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl"></div>
      <div class="absolute right-[5%] top-[45%] h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black via-black to-black"></div>
      <div class="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
    </div>

    <!-- Nav -->
      <header class="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <div class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <!-- Brand -->
          <a href="/" class="flex items-center gap-3">
            <img
              src="/logo.avif"
              alt="Quaestor"
              width="64"
              height="64"
              class="h-12 w-48 object-contain"
            />
          </a>

          <!-- Links -->
            <nav class="hidden items-center gap-6 md:flex">
              {#each site.nav as item}
                <a class="text-sm text-white/70 hover:text-white" href={item.href}>
                  {item.label}
                </a>
              {/each}
            </nav>

          <!-- CTA -->
          <div class="flex items-center gap-2">
            <a
              class="hidden rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 sm:inline-flex"
              href={site.navCta.href}
              target="_blank"
              rel="noreferrer"
            >
              {site.navCta.label}
            </a>
            <a
              class="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
              href={site.hero.primaryCta.href}
            >
              Get started →
            </a>
          </div>
        </div>
      </header>

    <!-- Hero -->
    <section class="relative pt-20 md:pt-28">
      <div class="mx-auto w-full max-w-6xl px-6">
        <div class="mx-auto max-w-3xl text-center">
          <span class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            ✦ {site.hero.kicker}
          </span>

          <h1 class="mt-6 text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl leading-[1.05]">
            <span class="grid w-full grid-cols-2 items-baseline">
              <span class="justify-self-end text-white/80 pr-2 whitespace-nowrap">{ site.hero.headline }&nbsp;</span>
              <span class="justify-self-start whitespace-nowrap">
                <RotatingWords
                  words={[
                    "dead docs",
                    "\"ask Sarah\"",
                    "dropped balls",
                    "wiki sprawl",
                    "tribal ops",
                    "\"Who does this?\"",
                    "SOP graveyards",
                    "document theater",
                    "bad handoffs",
                  ]}
                />
              </span>
            </span>
          </h1>

          <p class="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
            {site.hero.subhead}
          </p>

          <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              class="w-full rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 sm:w-auto"
              href={site.hero.primaryCta.href}
            >
              {site.hero.primaryCta.label} →
            </a>

            <a
              class="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 sm:w-auto"
              href={site.hero.secondaryCta.href}
            >
              {site.hero.secondaryCta.label} →
            </a>
          </div>
        </div>
      </div>
    </section>

          <!-- Demo PNG -->
          <div class="mt-14">
            <div class="relative mx-auto max-w-3xl">
              <div class="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-2 shadow-2xl">
                <div class="overflow-hidden rounded-xl border border-white/10 bg-black/70">
                  <!-- top bar -->
                  <div class="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                    <div class="flex gap-1.5">
                      <div class="h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent))]"></div>
                      <div class="h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent))]"></div>
                      <div class="h-2.5 w-2.5 rounded-full bg-[rgb(var(--accent))]"></div>
                    </div>
                    <div class="ml-2 text-xs text-white/60">Demo</div>
                  </div>

                  <!-- image -->
                  <img
                    src={site.demo.gifSrc}
                    alt={site.demo.alt}
                    class="block w-full"
                    loading="lazy"
                  />
                </div>
              </div>

              <div class="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 bg-gradient-to-r from-white/0 via-white/10 to-white/0 blur-3xl" />
            </div>
          </div>


    <!-- Features -->
    <section id="features" class="relative py-20 md:py-28">
      <div class="mx-auto w-full max-w-6xl px-6">
        <div class="mx-auto max-w-2xl text-center">
          <span class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">{site.features.eyebrow}</span>
          <h2 class="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-4xl">{site.features.headline}</h2>
          <p class="mt-4 text-pretty text-white/70">{site.features.subhead}</p>
        </div>

        <div class="mt-10 grid gap-4 md:grid-cols-3">
          {#each site.features.items as f}
            <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div class="text-base font-semibold">{f.title}</div>
              <p class="mt-3 text-sm leading-relaxed text-white/70">{f.desc}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Workflow -->
    <section id="workflow" class="relative py-20 md:py-28">
      <div class="mx-auto w-full max-w-6xl px-6">
        <!-- full-width header -->
        <div class="mx-auto max-w-3xl text-center">
          <span class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            {site.howItWorks.eyebrow}
          </span>
          <h2 class="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {site.howItWorks.headline}
          </h2>
          <p class="mt-4 text-pretty text-white/70">
            {site.howItWorks.subhead}
          </p>
        </div>

        <!-- two columns below -->
        <div class="mt-10 grid items-stretch gap-10 md:grid-cols-2 md:gap-12">
          <div class="flex flex-col">
            <!-- LEFT: steps -->
            <div class="space-y-3">
              {#each site.howItWorks.steps as s}
                <div class="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div class="shrink-0">
                    <div class="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-white/70">
                      {s.n}
                    </div>
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-white">{s.title}</div>
                    <div class="mt-1 text-sm text-white/70">{s.desc}</div>
                  </div>
                </div>
              {/each}
            </div>

            <!-- CTA row (optional) -->
            <div class="mt-8 flex gap-3">
              <a class="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90" href="#pricing">See pricing →</a>
            </div>
          </div>

          <div class="space-y-4">
            <!-- RIGHT: your side cards -->
            {#each site.howItWorksSide.cards as c}
              <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div class="text-sm font-semibold">{c.title}</div>

                {#if c.items}
                  <div class="mt-3 grid gap-3 text-sm text-white/70">
                    {#each c.items as r}
                      <div class="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                        <span>{r.k}</span><span class="font-mono text-xs text-white/60">{r.v}</span>
                      </div>
                    {/each}
                  </div>
                {:else}
                  <p class="mt-3 text-sm leading-relaxed text-white/70">{c.body}</p>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="relative py-20 md:py-28">
      <div class="mx-auto w-full max-w-6xl px-6">
        <div class="mx-auto max-w-2xl text-center">
          <span class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">{site.pricing.eyebrow}</span>
          <h2 class="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-4xl">{site.pricing.headline}</h2>
          <p class="mt-4 text-pretty text-white/70">{site.pricing.subhead}</p>
        </div>

        <div class="mt-10 grid gap-4 md:grid-cols-3">
          {#each site.pricing.plans as t}
            <div class={"relative rounded-2xl border p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] " + (t.featured ? "border-white/20 bg-white/10" : "border-white/10 bg-white/5")}>
              {#if t.featured}
                <div class="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span class="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">Most popular</span>
                </div>
              {/if}

              <div class="flex items-baseline justify-between">
                <div class="text-lg font-semibold">{t.name}</div>
                {#if t.price !== "Custom"}
                  <div class="text-sm text-white/60">/mo</div>
                {/if}
              </div>
              <div class="mt-3 text-3xl font-semibold">{t.price}</div>

              <ul class="mt-6 space-y-2 text-sm text-white/75">
                {#each t.perks as p}
                  <li class="flex items-start gap-2"><span class="mt-0.5 text-white/70">✓</span><span>{p}</span></li>
                {/each}
              </ul>

              <div class="mt-8">
                <a
                  class="block w-full rounded-xl bg-white px-4 py-2 text-center text-sm font-medium text-black hover:bg-white/90"
                  href={t.cta.href}
                >
                  {t.cta.label}
                </a>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="relative py-20 md:py-28">
      <div class="mx-auto w-full max-w-6xl px-6">
        <div class="mx-auto max-w-2xl text-center">
          <span class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">FAQ</span>
          <h2 class="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-4xl">Answer objections.</h2>
          <p class="mt-4 text-pretty text-white/70">Keep it short. Bury risk. Make the next step obvious.</p>
        </div>

        <div class="mx-auto mt-10 max-w-3xl space-y-3">
          {#each site.faq.items as it}
            <details class="group rounded-2xl border border-white/10 bg-white/5 p-5">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4">
                <span class="text-sm font-semibold">{it.q}</span>
                <span class="text-white/50 transition group-open:rotate-90">›</span>
              </summary>
              <p class="mt-3 text-sm leading-relaxed text-white/70">{it.a}</p>
            </details>
          {/each}
        </div>

        <div class="mt-12 text-center">
          <button class="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">
            Get started →
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative border-t border-white/10 py-12">
      <div class="mx-auto w-full max-w-6xl px-6">
        <div class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded-xl bg-white/10 ring-1 ring-white/10"></div>
              <div class="text-sm font-semibold">YourProduct</div>
            </div>
            <div class="mt-3 text-xs text-white/50">© {year} YourCompany. All rights reserved.</div>
          </div>

          <div class="flex flex-wrap gap-4 text-sm text-white/70">
            <a class="hover:text-white" href="#features">Features</a>
            <a class="hover:text-white" href="#pricing">Pricing</a>
            <a class="hover:text-white" href="#faq">FAQ</a>
            <a class="hover:text-white" href="/">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</div>
