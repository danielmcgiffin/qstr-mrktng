<script lang="ts">
  import { env } from "$env/dynamic/public";
  import { trackEvent } from "$lib/analytics";
  import { site } from "$lib/site";

  type IntakeStatus = "idle" | "submitting" | "success" | "error";

  const partnerIntakeEndpoint = env.PUBLIC_PARTNER_INTAKE_ENDPOINT ?? "";
  const partnerIntakeEmail = env.PUBLIC_PARTNER_INTAKE_EMAIL ?? "danny@cursus.tools";

  let intakeStatus = $state<IntakeStatus>("idle");
  let intakeMessage = $state("");

  const trackBookingClick = (location: string) => {
    trackEvent("booking_click", { location });
  };

  const trackDemoClick = (location: string) => {
    trackEvent("demo_click", { location });
  };

  const toText = (value: FormDataEntryValue | null): string =>
    typeof value === "string" ? value.trim() : "";

  const buildMailtoLink = (formData: FormData): string => {
    const partnerName = toText(formData.get("name"));

    const lines = [
      "New partner intake",
      "",
      `Name: ${partnerName}`,
      `Email: ${toText(formData.get("email"))}`,
      `Company: ${toText(formData.get("company"))}`,
      `Website/LinkedIn: ${toText(formData.get("website"))}`,
      `Primary role: ${toText(formData.get("role"))}`,
      `Partnership model: ${toText(formData.get("partnership_model"))}`,
      `Client count: ${toText(formData.get("client_count"))}`,
      `Typical client profile: ${toText(formData.get("client_profile"))}`,
      `Timeline: ${toText(formData.get("timeline"))}`,
      "",
      "Notes:",
      toText(formData.get("notes")),
    ];

    const subject = encodeURIComponent(`Partner intake${partnerName ? ` — ${partnerName}` : ""}`);
    const body = encodeURIComponent(lines.join("\n"));

    return `mailto:${partnerIntakeEmail}?subject=${subject}&body=${body}`;
  };

  const handlePartnerIntakeSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    if (toText(formData.get("company_website"))) {
      return;
    }

    formData.set("submitted_at", new Date().toISOString());

    intakeStatus = "submitting";
    intakeMessage = "";

    trackEvent("partner_intake_submit", {
      location: "partners_form",
      mode: partnerIntakeEndpoint ? "endpoint" : "mailto",
    });

    try {
      if (partnerIntakeEndpoint) {
        const response = await fetch(partnerIntakeEndpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Partner intake failed: ${response.status}`);
        }

        form.reset();
        intakeStatus = "success";
        intakeMessage = "Thanks — we got your intake and will follow up shortly.";
        return;
      }

      window.location.href = buildMailtoLink(formData);
      intakeStatus = "success";
      intakeMessage = "Opened your email client with a prefilled intake draft.";
    } catch {
      intakeStatus = "error";
      intakeMessage = "Couldn’t submit right now. Please book a call and we’ll take your intake live.";
      trackEvent("partner_intake_error", { location: "partners_form" });
    }
  };
</script>

<svelte:head>
  <title>Partners — Quaestor</title>
  <meta
    name="description"
    content="Deploy Quaestor across your client engagements. One framework, every client. Built for fractional operators and ops consultants."
  />
</svelte:head>

<div class="min-h-screen overflow-x-hidden bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
  <div class="relative">
    <!-- Background -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute left-1/2 top-[-35%] h-[820px] w-[820px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl"></div>
      <div class="absolute right-[8%] top-[28%] h-[360px] w-[360px] rounded-full bg-white/5 blur-3xl"></div>
      <div class="absolute left-[-8%] top-[18%] h-[480px] w-[480px] rounded-full bg-white/[0.03] blur-3xl"></div>
      <div class="absolute left-[30%] top-[55%] h-[520px] w-[520px] rounded-full bg-white/[0.025] blur-3xl"></div>
      <div class="absolute right-[-5%] top-[65%] h-[400px] w-[400px] rounded-full bg-white/[0.03] blur-3xl"></div>
      <div class="absolute left-[60%] top-[10%] h-[280px] w-[280px] rounded-full bg-white/[0.02] blur-3xl"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60"></div>
      <div
        class="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:26px_26px] opacity-35"
      ></div>
    </div>

    <!-- ═══════════════════════════════════════ -->
    <!-- HERO                                    -->
    <!-- ═══════════════════════════════════════ -->
    <section class="relative py-10 md:pt-28 md:pb-20">
      <div class="mx-auto w-full max-w-3xl px-6">
        <div class="text-center">
          <span
            class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-white/5 px-3 py-1 text-xs text-white/80"
          >
            ✦ Partner Program
          </span>

          <h1
            class="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-6xl leading-[1.05]"
          >
            <span class="gradient-text">Your method.</span><br />
            <span class="text-[rgb(var(--accent))]">Better tooling.</span>
          </h1>

          <p
            class="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-[rgb(var(--muted))] md:text-lg"
          >
            You already know how to fix operations. Quaestor gives you a repeatable system to deploy across every client — so your frameworks stick after you leave.
          </p>

          <div class="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:justify-center">
            <a
              class="w-full min-w-[170px] rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-center text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110 sm:w-auto"
              href="https://cal.com/danny-cursus/15min"
              target="_blank"
              rel="noreferrer"
              onclick={() => trackBookingClick("partners_hero")}
            >
              Book a 15-min call →
            </a>
            <a
              class="w-full min-w-[170px] rounded-xl border border-[rgb(var(--border))] bg-white/5 px-4 py-2 text-center text-sm font-medium text-white/90 hover:bg-white/10 sm:w-auto"
              href="https://qstr.cursus.tools/demo/process"
              onclick={() => trackDemoClick("partners_hero")}
            >
              See the product →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- THE PROBLEM YOU KNOW                    -->
    <!-- ═══════════════════════════════════════ -->
    <section class="relative py-4 md:py-6">
      <div class="mx-auto w-full max-w-3xl px-6">
        <div class="text-center">
          <span
            class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-white/5 px-3 py-1 text-xs text-white/80"
          >
            The pattern
          </span>
          <h2
            class="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-4xl"
          >
            You've seen this movie before
          </h2>
          <p class="mt-4 text-pretty text-[rgb(var(--muted))]">
            Every engagement starts strong. Here's how they usually end.
          </p>
        </div>

        <div class="mt-10 space-y-3">
          {#each [
            "You build the playbook. The client stops maintaining it the month you roll off. They're left wishing they'd gotten 'more'.",
            "You scope the engagement around one bottleneck and end up documenting everything by hand in Google Docs.",
            "You deploy a framework at Client A that you can't reuse at Client B because it's all bespoke and industry-coded.",
            "You spend hours in interviews only to discover people have wildly different ideas of how the work works."
          ] as bullet}
            <div
              class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] px-6 py-4"
            >
              <p class="text-sm leading-relaxed text-[rgb(var(--muted))]">
                {bullet}
              </p>
            </div>
          {/each}
        </div>

        <p
          class="mt-8 text-center text-base font-medium text-white md:text-lg"
        >
          The problem isn't your method. It's the infrastructure under it.
        </p>
        <p class="mt-4 text-pretty text-center text-[rgb(var(--muted))]">
          Tool skepticism is good. But we should know by now that document libraries and wikis aren't ideal for working knowledge retrieval.
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- WHAT CHANGES                            -->
    <!-- ═══════════════════════════════════════ -->
    <section class="relative py-10 md:py-12">
      <div class="mx-auto w-full max-w-3xl px-6">
        <div class="text-center">
          <span
            class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-white/5 px-3 py-1 text-xs text-white/80"
          >
            What changes
          </span>
          <h2
            class="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-4xl"
          >
            What changes with Quaestor
          </h2>
          <p class="mt-4 text-pretty text-[rgb(var(--muted))]">
            Your method and expertise become client infrastructure:
            repeatable, maintainable, and actionable.
          </p>
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          {#each [
            {
              title: "One framework, every client",
              desc: "Roles → Processes → Systems. The ontology works the same way regardless of industry or size. Your method becomes a repeatable deployment, not a bespoke build."
            },
            {
              title: "Deliverables that stay alive",
              desc: "Onboarding guides, role charters, and process docs generated from the graph, which means they're not written by hand. When the client updates a step, the outputs update too."
            },
            {
              title: "Maintenance built in",
              desc: "Every action has an owner and every entity has an alert scheme. Stale steps get flagged automatically. Your work doesn't rot the day you roll off."
            },
            {
              title: "Faster time to first deliverable",
              desc: "The framework is already built — you're populating it, not inventing it. Scope with the ontology, map the first bottleneck in a single session, and hand the client something real before the second invoice."
            }
          ] as card}
            <div
              class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6"
            >
              <div class="text-base font-semibold">{card.title}</div>
              <p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">
                {card.desc}
              </p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- HOW IT WORKS (for partners)             -->
    <!-- ═══════════════════════════════════════ -->
    <section class="relative py-10 md:py-12">
      <div class="mx-auto w-full max-w-3xl px-6">
        <div class="text-center">
          <span
            class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-white/5 px-3 py-1 text-xs text-white/80"
          >
            How it works
          </span>
          <h2
            class="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-4xl"
          >
            How the partnership works
          </h2>
          <p class="mt-4 text-pretty text-[rgb(var(--muted))]">
            From onboarding to ongoing client deployments — three steps.
          </p>
        </div>

        <div class="mt-10 space-y-3">
          {#each [
            {
              n: "01",
              title: "We onboard you (if you want)",
              desc: "Walk through the product, learn some approaches for maximizing the tool, and see best practices on scoping a client engagement around it. Takes about an hour."
            },
            {
              n: "02",
              title: "You deploy with clients",
              desc: "Use Quaestor as the infrastructure under your engagements. Each client gets their own workspace. You manage them all from one place."
            },
            {
              n: "03",
              title: "Clients stay on the platform",
              desc: "When your engagement ends, the map stays alive. The client keeps their subscription. Your work persists — and so does your reputation."
            }
          ] as step}
            <div
              class="flex gap-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-5"
            >
              <div class="shrink-0">
                <div
                  class="inline-flex items-center rounded-full border border-[rgb(var(--border))] bg-black/30 px-2.5 py-1 text-[11px] font-mono text-white/70"
                >
                  {step.n}
                </div>
              </div>
              <div>
                <div class="text-sm font-semibold text-white">
                  {step.title}
                </div>
                <div class="mt-1 text-sm text-[rgb(var(--muted))]">
                  {step.desc}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- PARTNER INTAKE                          -->
    <!-- ═══════════════════════════════════════ -->
    <section id="partner-intake" class="relative py-10 md:py-12">
      <div class="mx-auto w-full max-w-4xl px-6">
        <div class="text-center">
          <span
            class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-white/5 px-3 py-1 text-xs text-white/80"
          >
            Partner intake
          </span>
          <h2 class="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Tell us how you work
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-pretty text-[rgb(var(--muted))]">
            This helps us shape onboarding around your delivery model. It takes about 3–5 minutes.
          </p>
        </div>

        <form
          class="mt-10 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6 md:p-8"
          onsubmit={handlePartnerIntakeSubmit}
        >
          <div class="hidden" aria-hidden="true">
            <label for="company_website">Company website (leave blank)</label>
            <input id="company_website" name="company_website" type="text" tabindex="-1" autocomplete="off" />
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <label class="space-y-2 text-sm">
              <span class="text-white">Full name *</span>
              <input
                name="name"
                type="text"
                required
                class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[rgb(var(--muted))]"
                placeholder="Jane Doe"
              />
            </label>

            <label class="space-y-2 text-sm">
              <span class="text-white">Work email *</span>
              <input
                name="email"
                type="email"
                required
                class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[rgb(var(--muted))]"
                placeholder="jane@firm.com"
              />
            </label>

            <label class="space-y-2 text-sm">
              <span class="text-white">Company / practice name</span>
              <input
                name="company"
                type="text"
                class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[rgb(var(--muted))]"
                placeholder="Acme Ops Partners"
              />
            </label>

            <label class="space-y-2 text-sm">
              <span class="text-white">Website or LinkedIn</span>
              <input
                name="website"
                type="url"
                class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[rgb(var(--muted))]"
                placeholder="https://"
              />
            </label>

            <label class="space-y-2 text-sm">
              <span class="text-white">Primary role *</span>
              <select
                name="role"
                required
                class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-2 text-sm text-white"
              >
                <option value="">Select one</option>
                <option value="Fractional COO">Fractional COO</option>
                <option value="EOS Implementer">EOS Implementer</option>
                <option value="Process Consultant">Process Consultant</option>
                <option value="Fractional CFO">Fractional CFO</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label class="space-y-2 text-sm">
              <span class="text-white">Preferred partnership model *</span>
              <select
                name="partnership_model"
                required
                class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-2 text-sm text-white"
              >
                <option value="">Select one</option>
                <option value="Referral">Referral</option>
                <option value="Implementation">Implementation-led</option>
                <option value="Both">Both</option>
              </select>
            </label>
          </div>

          <div class="mt-4 grid gap-4 md:grid-cols-2">
            <label class="space-y-2 text-sm">
              <span class="text-white">How many active SMB clients do you support?</span>
              <input
                name="client_count"
                type="text"
                class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[rgb(var(--muted))]"
                placeholder="e.g. 8 active clients"
              />
            </label>

            <label class="space-y-2 text-sm">
              <span class="text-white">Timeline to start</span>
              <input
                name="timeline"
                type="text"
                class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[rgb(var(--muted))]"
                placeholder="e.g. this month"
              />
            </label>
          </div>

          <label class="mt-4 block space-y-2 text-sm">
            <span class="text-white">Typical client profile</span>
            <textarea
              name="client_profile"
              rows="3"
              class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[rgb(var(--muted))]"
              placeholder="Team size, industry, and operational pain patterns"
            ></textarea>
          </label>

          <label class="mt-4 block space-y-2 text-sm">
            <span class="text-white">Anything else we should know?</span>
            <textarea
              name="notes"
              rows="4"
              class="w-full rounded-xl border border-[rgb(var(--border))] bg-black/30 px-3 py-2 text-sm text-white placeholder:text-[rgb(var(--muted))]"
              placeholder="Current tooling, biggest bottlenecks, partner questions"
            ></textarea>
          </label>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              class="inline-flex min-w-[170px] items-center justify-center rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={intakeStatus === "submitting"}
            >
              {intakeStatus === "submitting" ? "Submitting…" : "Submit intake"}
            </button>

            <p class="text-xs text-[rgb(var(--muted))]">
              {#if partnerIntakeEndpoint}
                Responses are sent directly to our partner intake queue.
              {:else}
                No endpoint configured yet — submit opens a prefilled email draft to {partnerIntakeEmail}.
              {/if}
            </p>
          </div>

          {#if intakeMessage}
            <p
              class={`mt-4 rounded-xl border px-3 py-2 text-sm ${
                intakeStatus === "error"
                  ? "border-red-400/40 bg-red-500/10 text-red-100"
                  : "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
              }`}
              aria-live="polite"
            >
              {intakeMessage}
            </p>
          {/if}
        </form>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- CTA                                     -->
    <!-- ═══════════════════════════════════════ -->
    <section class="relative py-10 md:py-12">
      <div class="mx-auto w-full max-w-3xl px-10 py-14 text-center">
        <div
          class="rounded-2xl border border-[rgb(var(--border-strong))] bg-[rgb(var(--bg-elev-2))] px-8 py-10 text-center"
        >
          <h2 class="text-3xl font-semibold tracking-tight md:text-4xl">
            Let's talk
          </h2>
          <p
            class="mx-auto mt-3 max-w-lg text-md leading-relaxed text-[rgb(var(--muted))]"
          >
            We're building the partner program <i>with</i> early partners, not over top of them. If you run ops engagements for SMBs, we'd like to hear how
            you work and show you what we've built.
          </p>

          <div class="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              class="w-full min-w-[170px] rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-center text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110 sm:w-auto"
              href="https://cal.com/danny-cursus/15min"
              target="_blank"
              rel="noreferrer"
              onclick={() => trackBookingClick("partners_cta")}
            >
              Book a 15-min call →
            </a>
            <a
              class="w-full min-w-[170px] rounded-xl border border-[rgb(var(--border))] bg-white/5 px-4 py-2 text-center text-sm font-medium text-white/90 hover:bg-white/10 sm:w-auto"
              href="https://qstr.cursus.tools/demo/process"
              onclick={() => trackDemoClick("partners_cta")}
            >
              See the product →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative border-t border-[rgb(var(--border))] py-12">
      <div class="mx-auto w-full max-w-6xl px-6">
        <div
          class="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div class="text-sm font-semibold">{site.brand}</div>
            <div class="mt-2 text-xs text-[rgb(var(--muted))]">
              {site.footer.tagline}
            </div>
            <div class="mt-3 text-xs text-[rgb(var(--muted))]">
              © {new Date().getFullYear()} {site.footer.copyrightName}. All rights
              reserved.
            </div>
          </div>

          <div class="flex flex-wrap gap-4 text-sm text-[rgb(var(--muted))]">
            <a class="hover:text-white" href="/">Home</a>
            <a class="hover:text-white" href="/method">Method</a>
            <a class="hover:text-white" href="/#pricing">Pricing</a>
            <a class="hover:text-white" href="/#faq">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</div>
