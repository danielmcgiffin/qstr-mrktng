export type MethodItem = {
  id: string;
  title: string;
  desc: string;
};

export type MethodGroup = {
  title?: string;
  items: MethodItem[];
};

export type MethodContentSection = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  groups: MethodGroup[];
};

export const methodContent: MethodContentSection[] = [
  {
    slug: "diagnosis",
    title: "Why Most Ops Documentation Fails",
    summary:
      "The patterns that kill every documentation effort — and why yours probably already has.",
    intro:
      "You've seen this before. Maybe you built it yourself, maybe you inherited it. Either way, the result is the same: documentation that looked great on day one and became a liability by month three. These are the four failure modes we designed Quaestor to eliminate.",
    groups: [
      {
        items: [
          {
            id: "theater",
            title: "Documentation theater",
            desc: "Long SOPs that look professional in the binder and rot within a month. Everyone's built these. Nobody uses them. The effort goes into the writing, not the maintaining — and the business outgrows the docs before the ink is dry.",
          },
          {
            id: "duplicates",
            title: "Duplicate systems of record",
            desc: "The same process described in a Google Doc, a wiki page, and an email thread — none of them current. Work happens in the tool. The docs just add confusion and make people second-guess which version is real.",
          },
          {
            id: "unowned",
            title: "Unowned workflows",
            desc: "Processes that exist on paper but have no accountable owner. When something breaks, everyone points at someone else. When something changes, nobody updates the map. Accountability isn't optional — it's structural.",
          },
          {
            id: "graveyard",
            title: "The documentation graveyard",
            desc: "Wikis nobody reads. SOPs from two reorgs ago. A SharePoint that answers questions nobody's asking anymore. The saddest part: someone spent real time building all of it.",
          },
        ],
      },
    ],
  },
  {
    slug: "model",
    title: "The Operating Model",
    summary:
      "Three primitives. Infinite connections. One source of truth.",
    intro:
      "Every business operation — no matter the industry, no matter the size — reduces to three elements and the relationships between them. Quaestor maps these relationships into a living graph so the picture of how work works is always current, always connected, and always queryable.",
    groups: [
      {
        items: [
          {
            id: "primitives",
            title: "Three primitives: Roles, Processes, Systems",
            desc: "Who does what, and where. Every action in your business has one accountable role, belongs to one process, and executes in one system. This isn't a simplification — it's the atomic structure of operations itself.",
          },
          {
            id: "connections",
            title: "Everything connected, nothing duplicated",
            desc: "Each element links to every other element it touches. Change a role's responsibilities and every affected process updates. Retire a system and every step that depended on it gets flagged. One change, one place, zero drift.",
          },
          {
            id: "source-of-truth",
            title: "The map is the source of truth",
            desc: "Not a copy of your docs — a live graph that links to your systems of record. Quaestor doesn't replace your tools. It connects them into one place where you can see how work actually works, not how you hope it works.",
          },
          {
            id: "outputs",
            title: "Atomic knowledge, dynamic outputs",
            desc: "Capture knowledge once at the smallest useful level. Then generate onboarding guides, role charters, process playbooks, and compliance docs on demand — assembled from the graph, not written by hand.",
          },
        ],
      },
    ],
  },
  {
    slug: "method",
    title: "How to Map Your Operations",
    summary: "Four steps. Start where it hurts. Ship before it's perfect.",
    intro:
      "This isn't a six-month implementation. Start with the workflow that costs the most time, map it in a sitting, and let the structure grow from there. The method works whether you're mapping your own business or deploying it across multiple client engagements.",
    groups: [
      {
        items: [
          {
            id: "bottleneck",
            title: "Start with the bottleneck",
            desc: "Find the workflow that generates the most interruptions — the process where the owner gets pulled in every time. Map that first. It proves immediate value, sets the pattern for everything else, and builds the momentum to keep going.",
          },
          {
            id: "interfaces",
            title: "Define the handoffs",
            desc: "Where work passes between people is where operations break down. Make those edges explicit: who hands off to whom, what triggers the handoff, and who owns the next step. Handoffs without owners are just hopes.",
          },
          {
            id: "commands",
            title: "Write steps as commands",
            desc: "Verbs, not paragraphs. Each step should be executable without a meeting and linked to the system where the work actually happens. If a step requires interpretation, it's not a step — it's a suggestion.",
          },
          {
            id: "ship",
            title: "Ship the 80%",
            desc: "A working map you can react to beats a perfect map you never finish. Publish the draft. Let the team push back, fill gaps, and correct what's wrong. The map gets better through use, not through editing in isolation.",
          },
        ],
      },
    ],
  },
  {
    slug: "alive",
    title: "How It Stays Alive",
    summary:
      "Light rhythms and automatic signals that prevent decay.",
    intro:
      "The reason most documentation efforts fail isn't the initial build — it's the first month after. Quaestor builds maintenance into the structure itself: review cadences that are light enough to stick, and automatic signals that surface problems before they become surprises.",
    groups: [
      {
        title: "The Cadence",
        items: [
          {
            id: "weekly",
            title: "Weekly: unblock",
            desc: "Open the map, spot friction, assign ownership, close the loop. Fifteen minutes. No heroics.",
          },
          {
            id: "monthly",
            title: "Monthly: consolidate",
            desc: "Combine duplicate workflows, standardize templates, and cut noise. Keep the map lean enough to trust.",
          },
          {
            id: "quarterly",
            title: "Quarterly: audit",
            desc: "Review the highest-impact workflows against how work actually happened. Update what drifted. Retire what's dead.",
          },
        ],
      },
      {
        title: "The Safety Net",
        items: [
          {
            id: "stale",
            title: "Stale steps surface automatically",
            desc: "When a linked system changes or a review date passes, affected steps get flagged. Nobody has to remember to check — the map tells you what's drifting before it becomes a problem.",
          },
          {
            id: "retire",
            title: "Retire on purpose",
            desc: "Archive obsolete workflows cleanly so new hires don't follow ghosts from two reorgs ago. A clean map is a trustworthy map.",
          },
        ],
      },
    ],
  },
  {
    slug: "signals",
    title: "How You Know It's Working",
    summary:
      "Four metrics that prove the map is reducing friction, not just adding pages.",
    intro:
      "Documentation for its own sake is busywork. These are the signals that tell you whether the map is actually making operations run better — and they're the same metrics you'd use to prove the ROI to anyone who asks.",
    groups: [
      {
        items: [
          {
            id: "time-to-answer",
            title: "Time to answer",
            desc: "How long before someone finds what they need without asking the person who 'just knows.' If this number isn't dropping, the map isn't working.",
          },
          {
            id: "interruptions",
            title: "Interruptions per week",
            desc: "The number of questions routed to a single person — usually the owner. Track it before, track it after. That delta is the ROI.",
          },
          {
            id: "handoff-delay",
            title: "Handoff delay",
            desc: "Time between a request and the next owned action. Every hour of delay is a hour of lost momentum. Shorter is better. Zero is the goal.",
          },
          {
            id: "vacation-test",
            title: "The vacation test",
            desc: "Can the owner leave for a week without everything falling apart? If not, the map isn't done yet. This is the only metric that ultimately matters.",
          },
        ],
      },
      {
        title: "What We Won't Do",
        items: [
          {
            id: "no-theater",
            title: "No documentation theater",
            desc: "We won't help you build long, static docs that look impressive in a deliverable and go stale in a month. Everyone's built those. Never again.",
          },
          {
            id: "no-duplicates",
            title: "No duplicate systems of record",
            desc: "If work happens in a system, the map links to it — it doesn't copy it. One source of truth means one source of truth.",
          },
          {
            id: "no-unowned",
            title: "No unowned workflows",
            desc: "If a process doesn't have an owner, it doesn't get published. Period. Ambiguity is not a feature.",
          },
        ],
      },
    ],
  },
];
