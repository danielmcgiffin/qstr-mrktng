# AI + Human Readiness Rubric

**Version:** 0.3 (draft — anti-example clauses added to every dim for LLM scoring reliability)
**Owner:** Danny
**Location of record:** `src/lib/grader/rubric.ts` (this doc is the human-readable source of truth; the TS file is the machine-readable mirror)

---

## Overview

The grader returns **two scores out of 100**:

1. **AI Readiness** — can an agent execute this process?
2. **Human Readiness** — can a new hire execute this process?

The two scores are reported separately. **No composite.** A process can be agent-executable but hard for humans, or vice versa, and collapsing into one number hides the interesting finding.

Visual weight in the UI: **2:1 AI:Human.** AI Readiness is the hero score; Human Readiness is the quieter, smaller-typeset companion.

**Grade scale: A / B / C / F. No D.** A and B are tight bands at the top (10 pts each) where the distinctions are real. C is a wide band (20 pts) that absorbs the honest middle ground — processes that work with effort. F is everything below 60. Pass or fail, with a cliff between C and F.

### Scoring philosophy

Every dimension uses a **positive-anchor + anti-example** structure:

- **Full credit requires ALL of:** explicit criteria that must be met
- **Full credit is disqualified by ANY of:** specific patterns that prevent full credit regardless of other strengths
- **Partial credit:** what half-credit looks like
- **None (0):** what zero looks like

This structure exists because LLM graders default to generous scoring when criteria are framed as "signals of quality." Framing them as "disqualifying patterns" forces the grader to find explicit reasons not to award full credit, which is what scoring consistency requires.

---

## AI Readiness — 100 points across 6 areas

| #   | Area                                | Points | Sub-dims                                                                             |
| --- | ----------------------------------- | ------ | ------------------------------------------------------------------------------------ |
| 1   | Named doer                          | 15     | —                                                                                    |
| 2   | Context source named                | 20     | —                                                                                    |
| 3   | Boundaries defined                  | 15     | Process trigger (5) · Process outcome (10)                                           |
| 4   | Step structure                      | 15     | Step granularity (8) · Step triggers (4) · Step outcomes (3)                         |
| 5   | Decision points defined             | 15     | Judgment flagged (7) · Criteria provided (8)                                         |
| 6   | Outputs, handoffs, and completeness | 20     | Outputs & state changes named (8) · Handoffs explicit (7) · Process completeness (5) |

**Total: 100**

---

### Area 1 — Named doer (15 pts)

**Question scored:** Is the actor for each step explicitly named as a role?

**Full credit (15) requires ALL of:**

- Every step names a specific role (e.g., "the Account Manager," "the Ops Lead," "the Finance Controller")
- No pronouns ("they," "we," "you") or collective nouns ("the team," "ops," "everyone") used as the actor
- If delegation or substitution is possible, the allowed roles are named explicitly
- Approval, review, or escalation actors are named as specific roles

**Full credit is disqualified by ANY of:**

- Any step uses "the team," "they," "someone," or implicit "we" as the actor
- Uses "[Role] or designee" without naming the designee's role
- Mentions peer review, approval, or supervisory sign-off without naming the approver role
- Uses person names instead of role names (e.g., "John" instead of "the Account Manager")
- External parties referenced without a specific role ("the vendor" without specifying which role)

**Partial credit (7):** Most steps have named roles, but some use pronouns, collective nouns, or unnamed delegates.
**None (0):** Majority of steps lack a named actor.

**Why it matters:** An agent needs to know whether it is the executor or whether it is triggering someone else. Pronouns and collective nouns are the first failure mode of tribal-knowledge docs.

---

### Area 2 — Context source named (20 pts)

**Question scored:** Does each step name the specific source of the information needed to act — a URL, a system, a field, an upstream output?

**Full credit (20) requires ALL of:**

- Every step that requires external information names a specific, addressable source
- System references include the specific instance, path, or record type (e.g., "Stripe dashboard → Customers → Invoices," not just "Stripe")
- Policy or threshold references point to a named document section, table, or location — not just "the policy"
- Criteria or rules that drive action are either stated inline or pointed to a specific retrievable location
- Naming conventions, lookup tables, and reference lists are either included or addressably linked

**Full credit is disqualified by ANY of:**

- Any step says "follow [document]" or "per policy" without naming the specific section
- Thresholds, criteria, or limits are referenced but not stated or pointed to
- System references are generic ("check the spreadsheet," "see the CRM," "ask in Slack")
- Uses "ask [person]" or "check with [role]" as a context source
- Naming conventions, approved lists, or standard templates exist by reference only
- The phrase "as appropriate," "as needed," or "as applicable" appears without criteria
- "In accordance with requirements" or equivalent fuzzy language appears without pointing to the requirements

**Partial credit (10):** Some steps name sources; others say "check the usual place," "ask Sarah," or reference context implicitly.
**None (0):** Context is assumed, not surfaced. Heavy reliance on reader's prior knowledge.

**Why it matters:** This is the single most AI-specific dimension in the rubric. An agent cannot "ask Sarah." Naming the source is what separates human-legible ops from agent-legible ops.

**Highest-weighted dim in the AI block.** Pairs intentionally with Human-Readiness Area 3 (Self-contained context) — they ask different questions about the same underlying property.

---

### Area 3 — Boundaries defined (15 pts)

**Question scored:** Does the process have a clear start and a clear end?

#### 3a. Process trigger (5 pts)

**Full credit (5) requires ALL of:**

- The first sentence or an explicit trigger clause names the event, schedule, upstream output, or request that starts the process
- The trigger is concrete enough that an observer can detect when it fires
- If multiple triggers are possible, they are enumerated

**Full credit is disqualified by ANY of:**

- The process begins mid-workflow (step 1 assumes an earlier event already happened without naming it)
- Trigger is "when needed," "as appropriate," "periodically," or similarly conditional without stated conditions
- Trigger is implied by section context but never explicitly stated
- The triggering actor is named but the triggering event is not

**Partial credit (2):** Trigger is implied or fuzzy.
**None (0):** No trigger stated.

#### 3b. Process outcome (10 pts)

**Full credit (10) requires ALL of:**

- "Done" is defined as a verifiable artifact, a state change, or a confirmed delivery
- The last step of the process actually produces the stated outcome (no drift between what's claimed and what the process does)
- The outcome is something an observer can verify without asking the doer

**Full credit is disqualified by ANY of:**

- Outcome is stated as a feeling ("customer is satisfied," "the team is aligned") or abstract claim ("process is complete")
- Multiple candidate endings appear (submission sent, status changed, external party acts) without designating one as canonical
- The last step describes an external actor's behavior (e.g., "customer evaluates") rather than the process's own output
- Outcome is implied by the end of the step list but not stated

**Partial credit (5):** Outcome stated but not verifiable, or multiple candidate endings without canonical designation.
**None (0):** No stated outcome.

**Why outcome is 2× trigger:** Knowing when you're done is harder and more consequential than knowing when you start. Processes without clear outcomes run forever.

---

### Area 4 — Step structure (15 pts)

**Question scored:** Are the steps shaped for execution, or do they hide complexity?

#### 4a. Step granularity (8 pts)

**Full credit (8) requires ALL of:**

- Each step names one action that a single actor can complete in one working session without hidden sub-decisions
- Step verbs are concrete and executable ("save," "upload," "send," "mark as sent")
- Multi-part steps are decomposed into atomic actions

**Full credit is disqualified by ANY of:**

- Any step uses "evaluate," "prepare," "handle," "manage," "process," or "complete" as the sole verb without decomposition
- A step contains multiple conjunction-joined actions ("X and Y and Z") that should be separate steps
- A step would require consulting another document to know what it actually entails
- Super-steps like "Complete the onboarding" or "Handle the escalation" appear without breakdown

**Partial credit (4):** Mix of atomic and fat steps. Some steps compress multiple actions or decisions.
**None (0):** Most steps are super-steps that hide real complexity.

#### 4b. Step triggers (4 pts)

**Full credit (4) requires ALL of:**

- Each step states how it knows to fire — upstream completion, explicit handoff, scheduled time, specific event
- Parallel or out-of-order steps are explicitly flagged with their alternate conditions
- Step dependencies are unambiguous

**Full credit is disqualified by ANY of:**

- Step order is implied only by position in the document with no explicit sequencing language
- Notes like "may occur earlier" or "as needed" appear without explicit trigger conditions
- References to "step N" appear in a document where steps are not numbered
- Steps that can run in parallel are presented sequentially without flagging

**Partial credit (2):** Some steps have implicit triggers (follows step N); others are unclear.
**None (0):** No step-level triggers specified.

#### 4c. Step outcomes (3 pts)

**Full credit (3) requires ALL of:**

- Each step names what it produces — an output, a state change, or a confirmation
- Step completion is verifiable by the next step

**Full credit is disqualified by ANY of:**

- Steps end without stated outputs
- Step "completion" is implicit ("done when the AM moves on")
- Outcomes described only as verbs without observable artifacts

**Partial credit (1):** Some steps have outcomes; others don't.
**None (0):** Step outcomes not specified.

**Why granularity dominates:** Fat steps are the most common AI-readiness killer. "Complete the monthly close" is a fat step that hides 40 decisions.

---

### Area 5 — Decision points defined (15 pts)

**Question scored:** Where does the process require judgment, and what criteria drive the decision?

#### 5a. Judgment flagged (7 pts)

**Full credit (7) requires ALL of:**

- Every place the process requires judgment is explicitly marked as a decision
- The type of decision (bid/no-bid, approve/reject, select from list, etc.) is named
- Duplicate decisions appearing in multiple places are distinguished from each other

**Full credit is disqualified by ANY of:**

- Decisions are buried in procedural language ("determine markup" without flagging as a decision)
- "Use your best judgment," "as appropriate," or "as necessary" appears without flagging the underlying decision
- Identical decision labels appear in multiple places without being distinguished by context
- Implicit judgment required (e.g., a step asks to "evaluate" without calling out that a decision follows)

**Partial credit (3):** Some decisions are flagged; others are silent.
**None (0):** Decisions are invisible — the process reads as if it's all procedure when it isn't.

#### 5b. Criteria provided (8 pts)

**Full credit (8) requires ALL of:**

- Every flagged decision states the criteria, thresholds, or policies that drive the call
- Criteria are specific enough to be applied consistently by different actors facing the same inputs
- Where a decision references external criteria, the source is addressable (see Area 2)
- Factors named are accompanied by weights, thresholds, or decision rules

**Full credit is disqualified by ANY of:**

- A decision is flagged but criteria are "use judgment" or absent
- Criteria name factors without weights, thresholds, or a decision rule
- Decision depends on "established thresholds" without stating or addressably pointing to them
- Criteria given for some decisions but not others
- Decision rule requires interpretation to apply ("customer satisfaction," "strategic fit")

**Partial credit (4):** Some decisions have criteria; others say "use judgment" without further guidance.
**None (0):** Decisions are flagged but criteria are absent.

**Why criteria are weighted higher than flagging:** Flagging a decision without providing criteria creates a known blocker without resolving it. Worse than leaving the decision implicit in some ways, because it surfaces the problem without solving it.

---

### Area 6 — Outputs, handoffs, and completeness (20 pts)

**Question scored:** Does the process compose into a larger system — what does it produce, who does it hand to, and does it fully cover the journey?

#### 6a. Outputs & state changes named (8 pts)

**Full credit (8) requires ALL of:**

- Each step names what it produces — an artifact, a state change, a record, a notification
- Outputs are named with enough specificity that another step can reference them
- State changes name both the from-state and the to-state

**Full credit is disqualified by ANY of:**

- Outputs described generically ("update the system," "save the doc")
- Outputs implied by context rather than stated
- State changes referenced without naming the states involved
- Steps that clearly produce an output but don't name it

**Partial credit (4):** Some steps have named outputs; others leave it implicit.
**None (0):** Outputs are absent or described in vague terms.

#### 6b. Handoffs explicit (7 pts)

**Full credit (7) requires ALL of:**

- Inter-actor transitions name the recipient, the format, and the medium
- Handoffs to external parties specify the expected return path
- Asynchronous handoffs (e.g., queues, tickets) specify the channel and lookup path

**Full credit is disqualified by ANY of:**

- Any handoff says "pass it along," "forward to [role]," or "let the team know" without specifying medium
- Recipient named without format (what they receive) or medium (how they receive it)
- One-way handoffs where a response is expected but the response path isn't named
- Handoff implied by adjacency of steps assigned to different roles

**Partial credit (3):** Handoffs happen but some are vague.
**None (0):** Handoffs implicit or absent.

#### 6c. Process completeness (5 pts)

**Full credit (5) requires ALL of:**

- Steps together cover the trigger-to-outcome path with no gaps
- Alternate paths (rejection, failure, decline, no-bid) are addressed
- Error and edge cases have stated handling
- Termination conditions for non-happy paths are explicit

**Full credit is disqualified by ANY of:**

- Only the happy path is described
- Rejection, failure, or decline states are mentioned but not handled
- Decision points reference "escalate" without specifying the escalation path
- Process ends before the stated outcome is achieved
- Gaps where a step's output doesn't connect to any subsequent step's input

**Partial credit (2):** Mostly complete but with one or two obvious gaps, OR happy path fully covered but no alternates.
**None (0):** Significant steps missing from the path.

**Why this area is the heaviest (20 pts):** This is where a process connects to the rest of the business. Agents executing one step need to know what they produced, who they're handing to, and whether the process actually finishes.

---

## Human Readiness — 100 points across 6 areas

| #   | Area                   | Points |
| --- | ---------------------- | ------ |
| 1   | Readability            | 20     |
| 2   | Scannability           | 15     |
| 3   | Self-contained context | 20     |
| 4   | References linked      | 15     |
| 5   | Terms consistent       | 15     |
| 6   | Internal consistency   | 15     |

**Total: 100**

No sub-dims — Human Readiness dimensions resist decomposition without getting tortured. Each is scored as a single area.

---

### Area 1 — Readability (20 pts)

**Question scored:** Could a plainspoken person read this without a dictionary?

**Full credit (20) requires ALL of:**

- Average sentence length under ~25 words
- Every specialist term defined on first use or obvious from context
- Minimal preamble — procedure begins near the top of the document
- Active voice as the default
- Plain language chosen over corporate or consultant register

**Full credit is disqualified by ANY of:**

- More than 3 undefined acronyms used without a glossary or expansion on first use
- Corporate-wellness preamble before procedure ("supports our ability to consistently deliver excellence…")
- Dense passive-voice constructions requiring re-reading to parse
- Specialist jargon used without plain-language support
- Paragraph-length sentences containing multiple nested clauses
- Section-opening abstract claims that don't contribute to execution

**Partial credit (10):** Competent but dense — long sentences, specialist vocabulary, passive constructions that force re-reading.
**None (0):** Impenetrable — consultant-speak, walls of qualification, or writing that assumes the reader already knows the process.

**Why it's the heaviest Human dim:** Unreadable docs fail before any other dimension matters. If prose is a barrier, structure and context don't rescue it.

---

### Area 2 — Scannability (15 pts)

**Question scored:** Can a harried ops lead find the step they need without reading the whole document?

**Full credit (15) requires ALL of:**

- Steps are numbered in an ordered process
- Section headers with clear hierarchy (procedure, resources, controls, etc.)
- Whitespace between steps and sections
- Sub-content (notes, examples, sub-bullets) visually distinct from top-level steps
- A reader can locate step N without reading steps 1 through N-1

**Full credit is disqualified by ANY of:**

- Steps unnumbered in an ordered process
- Sub-bullets or notes render at the same indentation as top-level steps, creating visual ambiguity
- Headers missing or ambiguous
- Wall of prose without structural breaks
- References to "step N" in an unnumbered document

**Partial credit (7):** Some structure but gaps — walls of text, missing headers, no step numbering, or inconsistent visual hierarchy.
**None (0):** Wall of prose. Reader must read top-to-bottom to find anything.

---

### Area 3 — Self-contained context (20 pts)

**Question scored:** Can the reader act on the process without hunting for information outside the document?

**Full credit (20) requires ALL of:**

- All context needed for execution is present in the document
- External references support deeper understanding but aren't required for action
- Thresholds, rules, and policies that govern the process are stated, not just referenced
- A new hire with no prior context could execute after one read

**Full credit is disqualified by ANY of:**

- Execution requires consulting other documents for core information
- Thresholds, policies, or rules are referenced but not stated inline
- Tribal knowledge is assumed (reader "just knows" the thresholds, conventions, or judgment calls)
- Named dependencies (manual, policy, table) aren't included or summarized
- Required naming conventions, approved lists, or templates exist only by reference

**Partial credit (10):** Doc assumes familiarity with adjacent processes, systems, or roles. Reader needs to consult other docs or ask colleagues for basic execution.
**None (0):** Document is a skeleton. Actual execution requires tribal knowledge or another document entirely.

**Pairs with AI-Readiness Area 2:** where the AI block asks "is the source pointed to?", this block asks "is the context actually present?" Both matter, for different reasons.

**Tied for highest-weighted Human dim.** Tribal-knowledge dependencies are the #1 Heroic Operations accelerant.

---

### Area 4 — References linked (15 pts)

**Question scored:** Are external dependencies addressable?

**Full credit (15) requires ALL of:**

- External references use specific names, URLs, record IDs, or system identifiers
- Policy or manual references include section numbers or headings
- System references identify specific instances, paths, or records
- A new hire could locate every referenced source without asking a colleague

**Full credit is disqualified by ANY of:**

- References are vague ("the spreadsheet," "the doc," "the tool")
- Named documents exist without section or page references
- URLs, record IDs, or specific field names are absent where needed
- "The Quality Manual" or equivalent appears without a section or clause reference
- External standards (ISO, NIST, etc.) are cited by number without context

**Partial credit (7):** References exist but are vague in places — documents named but not located, systems identified but not addressably.
**None (0):** External dependencies are alluded to but never named or pointed to.

**Distinct from Area 3:** A process can be self-contained (Area 3) AND link out to reference material for deeper dives (Area 4). Area 3 asks if the core process is actionable alone; Area 4 asks if the supporting references are findable when needed.

---

### Area 5 — Terms consistent (15 pts)

**Question scored:** Is the same concept named with the same word throughout the document?

**Full credit (15) requires ALL of:**

- One term per concept, used consistently across the document
- Synonyms only used when they point to intentionally different things
- Role names, system names, and artifact names stay constant
- Capitalization of proper nouns is consistent

**Full credit is disqualified by ANY of:**

- Important entities used interchangeably (customer/client/account, prospect/lead/opportunity)
- Role names drift (AM / account manager / Account Manager / rep)
- System references rotate (CRM / the system / Salesforce) without clarification
- Artifact names shift without explanation (final VQ / VQ, deal folder / opportunity folder)
- Process labels drift (peer review vs. supervisory approval, submission vs. response)

**Partial credit (7):** Mostly consistent but some drift — important entities called by multiple names in ways that may confuse.
**None (0):** Heavy synonym drift. Reader has to map which words refer to the same thing.

**Note:** LLMs tolerate synonym drift better than junior staff. This dim matters more for the Human score than it would for AI.

---

### Area 6 — Internal consistency (15 pts)

**Question scored:** Does the process contradict itself?

**Full credit (15) requires ALL of:**

- No contradictions between steps
- Step N's stated output matches step N+1's required input
- Named dependencies (step references, numbered references, cross-refs) all resolve
- Stated outcome matches the final step's actual output
- Roles and responsibilities remain stable throughout the document

**Full credit is disqualified by ANY of:**

- References to numbered steps in an unnumbered document
- Steps reference outputs that aren't clearly produced in earlier steps
- Stated outcome differs from what the final step actually produces
- Roles or responsibilities shift mid-document without explanation
- Duplicate-but-distinct steps (e.g., "bid/no-bid decision" appearing twice) not reconciled
- Optional paths flagged without clear branching logic

**Partial credit (7):** Minor inconsistencies — a step references an output that isn't clearly produced, or the stated outcome differs slightly from the actual last-step result.
**None (0):** Significant contradictions — steps reference non-existent outputs, stated outcome doesn't match the process body, roles change mid-document.

---

## Letter grade bands

### AI Readiness

| Score  | Grade | Interpretation                                 |
| ------ | ----- | ---------------------------------------------- |
| 90–100 | A     | Agent-executable today.                        |
| 80–89  | B     | Agent-executable with light prompting/context. |
| 60–79  | C     | Agent-assistable with human guardrails.        |
| 0–59   | F     | Agents will cause more chaos.                  |

### Human Readiness

| Score  | Grade | Interpretation                           |
| ------ | ----- | ---------------------------------------- |
| 90–100 | A     | A new hire executes without asking.      |
| 80–89  | B     | Mostly self-sufficient, minor questions. |
| 60–79  | C     | Needs shadowing.                         |
| 0–59   | F     | The document is better as decoration.    |

**No D band.** A and B are narrow (10 pts each) where top-end distinctions are real and meaningful. C is wide (20 pts) because "works with effort" is an honestly broad zone. F is everything below 60 — the bar to pass is real.

---

## Scoring mechanics

**Per sub-dim or dim:**

- 0 pts if any disqualifying pattern is present and the overall quality is low
- Full pts only if ALL positive anchors are met AND NONE of the disqualifying patterns are present
- Partial credit when positive anchors are partly met or when minor disqualifying patterns appear but don't dominate

**The disqualifying-pattern test is the tie-breaker.** If a dim appears to meet the positive anchors but ANY disqualifying pattern is clearly present, the score is capped at partial credit — not full.

**Per area:** Sub-dim points sum to area total.

**Per block:** Area points sum to 100. Letter grade assigned from band table.

---

## LLM prompt architecture

The grader uses **two Claude API calls** per submission:

1. **AI Readiness call** — scores all 15 AI sub-dims, returns JSON
2. **Human Readiness call** — scores all 6 Human dims, returns JSON

Each call receives:

- The user's pasted/uploaded process document
- The rubric block (areas + sub-dims + full signal lists including disqualification clauses)
- An instruction to return structured JSON with `{score, reasoning, disqualifiers_present}` per dim

The `disqualifiers_present` field is a list of specific disqualifying patterns the LLM observed, which forces it to audit against the anti-examples explicitly rather than vibing on positive signals alone.

**Why split into two calls:** Shorter prompts, better reliability, cleaner output. Total cost ~$0.04–0.06 per submission with expanded rubric.

**Expected latency:** 4–8 seconds total (calls can run in parallel).

### Variance reduction protocol

LLM grading is non-deterministic. To bound variance:

1. **Run each submission 2× in production.** Take the median score per dim. Cost: ~2× tokens. Reliability gain: significant.
2. **If scores on any dim diverge by more than 4 pts across the 2 runs,** run a 3rd and take the median of three.
3. **Track per-dim variance across all submissions over time.** If any dim consistently shows high variance, tighten its disqualification clause.

---

## Display logic

**Inline result view (post-submission):**

- AI Readiness score + letter grade: hero placement, Pantheon red, large typeset
- Human Readiness score + letter grade: smaller, quieter, secondary placement
- Top 3 pathologies surfaced with proprietary vocab ("Heroic Operations detected," "Documentation Graveyard pattern")
- CTA for C/F graders: Book a demo
- CTA for A/B graders: Try Quaestor free

**Emailed full report (within 24hr, post founder review):**

- Area-by-area breakdown with scores
- Sub-dim breakdowns under each AI area
- Disqualifying patterns observed per dim (the LLM's `disqualifiers_present` output)
- One-sentence founder note per submission
- Specific remediation suggestions tied to lowest-scoring areas and observed disqualifiers
- CTA: Book a demo or try Quaestor

**Sub-dim detail is shown only in the emailed report, not the inline view.** Inline stays simple; email carries the depth.

---

## Version log

- **v0.1 (2026-04-17):** Initial draft. 6 areas × 15 sub-dims (AI) + 6 flat areas (Human).
- **v0.2 (2026-04-17):** Revised grade bands. Removed D band. C widened to 60–79 (20 pts), A and B stay narrow (10 pts each), F = 0–59. Four-letter scale with a hard cliff between C and F.
- **v0.3 (2026-04-17):** Added explicit disqualification clauses to every dim and sub-dim. Structure: "Full credit requires ALL of X. Full credit is disqualified by ANY of Y." Added variance-reduction protocol (median of 2–3 runs). Added `disqualifiers_present` field to LLM output schema. Added 5-doc anchor set validation protocol. Target per-dim variance ≤ 5 pts before ship.
