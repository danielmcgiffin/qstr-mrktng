<script lang="ts">
  const outline = [
    { id: "introduction", title: "Introduction" },
    { id: "principles", title: "Principles" },
    { id: "direction", title: "Direction" },
    { id: "building", title: "Building" },
    { id: "maintenance", title: "Maintenance" },
    { id: "cadence", title: "Cadence" },
    { id: "metrics", title: "Signals" },
    { id: "cta", title: "Get started" }
  ];

  const principles = [
    {
      title: "Make the map the source of truth",
      desc: "Processes, roles, and systems are connected, not scattered. If it isn't connected, it isn't real."
    },
    {
      title: "One owner, one outcome",
      desc: "Every workflow has a single accountable owner and a clear definition of done. No shared ambiguity."
    },
    {
      title: "Fewer docs, more links",
      desc: "Short, linked steps beat long documents. Capture the minimum and connect it to everything else."
    },
    {
      title: "Keep it alive",
      desc: "Outdated steps are worse than missing ones. Routine reviews and alerts prevent rot."
    }
  ];

  const direction = [
    {
      title: "Start with the bottleneck",
      desc: "Pick the workflow that interrupts you most. Map that first and let it set the system."
    },
    {
      title: "Define the interfaces",
      desc: "Where teams hand off is where momentum dies. Make those edges explicit and owned."
    },
    {
      title: "Name the system of record",
      desc: "Every step should point to the system where the work happens. Notion isn't a system of record."
    }
  ];

  const building = [
    {
      title: "Write steps like commands",
      desc: "Use verbs, not paragraphs. Each step is an action someone can execute without a meeting."
    },
    {
      title: "Link the why",
      desc: "Attach the rationale, not the novel. Give enough context to prevent debates."
    },
    {
      title: "Attach the template",
      desc: "If a step needs a doc, make it a linked template. Remove blank-page friction."
    },
    {
      title: "Ship the 80%",
      desc: "Don’t wait for perfection. Publish the draft map and refine it in the open."
    }
  ];

  const maintenance = [
    {
      title: "Own the review rhythm",
      desc: "Every core process has a review date and a named owner. No exceptions."
    },
    {
      title: "Surface stale steps",
      desc: "Flag steps tied to systems you changed. Staleness is a signal, not a surprise."
    },
    {
      title: "Retire on purpose",
      desc: "Archive obsolete workflows so new hires don't follow ghosts."
    }
  ];

  const cadence = [
    {
      title: "Weekly: unblock",
      desc: "Open the map, spot friction, assign ownership, and close the loop."
    },
    {
      title: "Monthly: consolidate",
      desc: "Combine duplicate workflows, standardize templates, and cut noise."
    },
    {
      title: "Quarterly: audit",
      desc: "Review the highest-impact workflows against actual execution data."
    }
  ];

  const signals = [
    {
      title: "Time to answer",
      desc: "How long it takes for a teammate to find an answer without asking."
    },
    {
      title: "Handoff delay",
      desc: "Time between a request and the next owned action."
    },
    {
      title: "Stale rate",
      desc: "Percent of workflows with steps older than your review window."
    },
    {
      title: "Interruptions",
      desc: "Number of questions routed to a single person per week."
    }
  ];
</script>

<svelte:head>
  <title>Method — Quaestor</title>
  <meta
    name="description"
    content="The Quaestor method: a practical system for mapping, owning, and maintaining how your company runs."
  />
</svelte:head>

<div class="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
  <div class="relative">
    <div aria-hidden class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute left-1/2 top-[-35%] h-[820px] w-[820px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl"></div>
      <div class="absolute right-[12%] top-[20%] h-[360px] w-[360px] rounded-full bg-white/5 blur-3xl"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60"></div>
      <div
        class="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:26px_26px] opacity-35"
      ></div>
    </div>

    <section class="relative pt-20 md:pt-28">
      <div class="mx-auto w-full max-w-6xl px-6">
        <div class="mx-auto max-w-3xl text-center">
          <span
            class="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-white/5 px-3 py-1 text-xs text-white/80"
          >
            ✦ Quaestor Method
          </span>
          <h1 class="mt-6 text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl leading-[1.05]">
            Practices for building
            <span class="text-[rgb(var(--accent))]"> reliable operations</span>
          </h1>
          <p class="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-[rgb(var(--muted))] md:text-lg">
            A practical system for mapping, owning, and maintaining how your company runs. Built for founders who are tired
            of being the answer.
          </p>
          <div class="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:justify-center">
            <a
              class="w-full min-w-[170px] rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-center text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110 sm:w-auto"
              href="https://qstr.cursus.tools/demo/process"
            >
              See it in action →
            </a>
            <a
              class="w-full min-w-[170px] rounded-xl border border-[rgb(var(--border))] bg-white/5 px-4 py-2 text-center text-sm font-medium text-white/90 hover:bg-white/10 sm:w-auto"
              href="#introduction"
            >
              Read the method →
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-14 md:py-20">
      <div class="mx-auto w-full max-w-6xl px-6">
        <div class="grid gap-10 md:grid-cols-[220px_1fr] md:gap-12">
          <aside class="hidden md:block">
            <div class="md:sticky md:top-24">
              <div class="text-xs font-semibold uppercase tracking-[0.14em] text-[rgb(var(--muted))]">Contents</div>
              <nav class="mt-4 space-y-2 text-sm">
                {#each outline as item}
                  <a
                    class="block rounded-lg px-2 py-1 text-[rgb(var(--muted))] hover:text-white"
                    href={`#${item.id}`}
                  >
                    {item.title}
                  </a>
                {/each}
              </nav>
            </div>
          </aside>

          <div class="space-y-16">
            <section id="introduction" class="scroll-mt-24">
              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Introduction</h2>
              <p class="mt-4 text-pretty text-[rgb(var(--muted))]">
                Most teams don’t lack documentation — they lack a map. The Quaestor Method is how we turn scattered SOPs into
                a living operational atlas: roles connect to processes, processes connect to systems, and teams can move
                without asking.
              </p>
            </section>

            <section id="principles" class="scroll-mt-24">
              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Principles</h2>
              <div class="mt-6 grid gap-4 md:grid-cols-2">
                {#each principles as p}
                  <div class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6">
                    <div class="text-sm font-semibold">{p.title}</div>
                    <p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">{p.desc}</p>
                  </div>
                {/each}
              </div>
            </section>

            <section id="direction" class="scroll-mt-24">
              <div class="flex flex-wrap items-end justify-between gap-3">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Direction</h2>
                <span class="text-xs font-medium uppercase tracking-[0.16em] text-[rgb(var(--muted))]">Phase 01</span>
              </div>
              <p class="mt-4 text-pretty text-[rgb(var(--muted))]">
                Start with the part of the business that costs you the most time. That’s where the map earns its keep.
              </p>
              <div class="mt-6 space-y-4">
                {#each direction as d}
                  <div class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6">
                    <div class="text-sm font-semibold">{d.title}</div>
                    <p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">{d.desc}</p>
                  </div>
                {/each}
              </div>
            </section>

            <section id="building" class="scroll-mt-24">
              <div class="flex flex-wrap items-end justify-between gap-3">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Building</h2>
                <span class="text-xs font-medium uppercase tracking-[0.16em] text-[rgb(var(--muted))]">Phase 02</span>
              </div>
              <p class="mt-4 text-pretty text-[rgb(var(--muted))]">
                Write steps to be executed. Link the system of record and keep each step clear enough to run without a
                meeting.
              </p>
              <div class="mt-6 grid gap-4 md:grid-cols-2">
                {#each building as b}
                  <div class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6">
                    <div class="text-sm font-semibold">{b.title}</div>
                    <p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">{b.desc}</p>
                  </div>
                {/each}
              </div>
            </section>

            <section id="maintenance" class="scroll-mt-24">
              <div class="flex flex-wrap items-end justify-between gap-3">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Maintenance</h2>
                <span class="text-xs font-medium uppercase tracking-[0.16em] text-[rgb(var(--muted))]">Phase 03</span>
              </div>
              <p class="mt-4 text-pretty text-[rgb(var(--muted))]">
                If a process doesn’t get maintained, it’s not a process — it’s a rumor. Maintenance makes the map
                trustworthy.
              </p>
              <div class="mt-6 space-y-4">
                {#each maintenance as m}
                  <div class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6">
                    <div class="text-sm font-semibold">{m.title}</div>
                    <p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">{m.desc}</p>
                  </div>
                {/each}
              </div>
            </section>

            <section id="cadence" class="scroll-mt-24">
              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Cadence</h2>
              <p class="mt-4 text-pretty text-[rgb(var(--muted))]">
                A light rhythm keeps your map alive without turning it into busywork.
              </p>
              <div class="mt-6 grid gap-4 md:grid-cols-3">
                {#each cadence as c}
                  <div class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6">
                    <div class="text-sm font-semibold">{c.title}</div>
                    <p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">{c.desc}</p>
                  </div>
                {/each}
              </div>
            </section>

            <section id="metrics" class="scroll-mt-24">
              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Signals</h2>
              <p class="mt-4 text-pretty text-[rgb(var(--muted))]">
                The right signals tell you whether your map is reducing friction or just adding pages.
              </p>
              <div class="mt-6 grid gap-4 md:grid-cols-2">
                {#each signals as s}
                  <div class="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev))] p-6">
                    <div class="text-sm font-semibold">{s.title}</div>
                    <p class="mt-3 text-sm leading-relaxed text-[rgb(var(--muted))]">{s.desc}</p>
                  </div>
                {/each}
              </div>
            </section>

            <section id="cta" class="scroll-mt-24">
              <div class="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-elev-2))] p-8 text-center">
                <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">Ready to build your operational atlas?</h2>
                <p class="mx-auto mt-4 max-w-2xl text-pretty text-[rgb(var(--muted))]">
                  Start with a single workflow and watch the map expand. Quaestor keeps it connected, owned, and
                  maintained.
                </p>
                <div class="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    class="w-full min-w-[170px] rounded-xl bg-[rgb(var(--accent))] px-4 py-2 text-center text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:brightness-110 sm:w-auto"
                    href="https://qstr.cursus.tools"
                  >
                    See it in action →
                  </a>
                  <a
                    class="w-full min-w-[170px] rounded-xl border border-[rgb(var(--border))] bg-white/5 px-4 py-2 text-center text-sm font-medium text-white/90 hover:bg-white/10 sm:w-auto"
                    href="/contact"
                  >
                    Talk to us →
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
