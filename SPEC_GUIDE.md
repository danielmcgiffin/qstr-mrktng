# Process Grader Spec.md

## Goal

The tool is a lead-gen applet. Users can upload docs and get a letter grade inline + full diagnostic emailed within 24 hours, including top-level grade for human-readability and AI-readiness.

## User flow

1. /grader - landing + form (paste textarea OR file upload, email required)
2. Submit -> sends the input to my email where I can grade it, send them back their version, their grade, and what I'd do if I were them.
3. Report Received -> User can check out Quaestor or set up a call.

## Constraints

- No site storage of docs, only in my email for now.
- Max paste length: 50k chars
- Max upload size: 5MB, PDF/docx/txt/md only
- Privacy copy MUST appear above submit button

# Report Format

## AI Readiness Score

- a score out of 100
- Verdict: a sentence that passes judgement on their readiness to deploy AI.

## Human Legibility Score

- a score out of 100
- Verdict: a sentence passing judgement on the state of their written knowledge.

### AI Readiness Breakdown

#### Process trigger defined

#### Step trigger defined

#### Process outcome defined

#### Step outcome defined

#### Step granularity

#### Named doer

#### Connected context source

#### Decision points defined

#### Outputs & state changes named

#### Handoffs explicit

### Human Readiness

#### Readability

#### Scannability

#### Self-contained context

#### References linked

#### Terms consistent

#### Process exhaustive and exclusive
