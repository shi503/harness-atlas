---
title: "The composition contract — what a dispatching agent owes its workers"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# The composition contract

**What this is.** The eight contracts that govern how a Tier-1 architect agent assembles context and hands work to a Tier-2 worker in `generic-cerebro`. Each is stated, evidenced, and paired with an ADR seed.

**Why it is the first document in this folder.** `loomwarp-team-system` `references/claude-code/30-gap-analysis-loomwarp.md` (private) reached a hard and correct conclusion: for Estate, Control, Capability, Policy and Evidence the harness now supplies substantial native mechanism, and the verdict on the hand-rolled resolver is *adopt the native one, delete ours.* That verdict prices `router.py` at roughly zero. It does **not** touch anything in this document.

Agent teams give you task dependencies, file-locked claiming, and a thousand parallel agents. They do not tell you what to put in the task. The gap between "the harness can dispatch" and "the dispatch produces correct work" is filled by a set of authoring disciplines, and those disciplines are the actual artifact this system produced over 27 blueprints and 130 workstreams. They are portable because they are contracts, not code.

---

## The framing

> **A Feature Lead starts fresh with no context beyond this PRD. If the PRD is ambiguous, the work will be ambiguous. Reference guides by path; do not paste guide content inline. Link to decisions by ID rather than re-explaining them.**
>
> — the authoring note at the head of `.claude/FRACTAL/templates/prd-template.md`, addressed to the architect, and deleted before the PRD ships

Three sentences carrying three separate disciplines: **self-containment** (the worker has nothing else), **reference over inlining** (context is a budget), and **identifier over restatement** (a decision has one canonical home and the PRD is not it). Everything below elaborates one of those three.

---

## C-1 · Intent is a cached document, not a prompt

The Tier-0 artifact (`STRATEGIST-*.md`, 155 lines) is read at the start of any orchestration session. It carries a mandate, priority-ordered principles, a phased definition of done, non-stack constraints, a numbered failure-mode register, an autonomy table, and pointers to live state.

What makes it a *contract* rather than a document is its `§0`, which declares its own read discipline:

| Rule | Behaviour |
|---|---|
| Recalled facts | Verify before acting — read the live-state pointer first |
| Cache discipline | §1–§6 are stable (cache-warm); §7+ are dynamic (re-read each session) |
| Source-of-truth conflict | **live-state pointer > this doc > git history** |

Two things there are worth stealing outright. First, **the document tells you which of its own sections to distrust** — a stable half safe to hold across sessions and a volatile half that must be re-read. Second, **the precedence rule is explicit and puts the document third.** A strategy doc that ranks itself below the live state is one that has already accepted it will go stale.

The evidence that this was learned rather than designed: `§7 Current State` is deliberately pointer-only, and carries a note that the previous revision fossilized status in prose and that this revision does not repeat the mistake. The failure is recorded in the artifact that fixes it.

## C-2 · The composing agent spends no context on implementation

Stated as a principle in the architect agent definition — *never consume tokens on implementation; the context window is for orchestration, not code details* — and made operational by a **delegation threshold**: anything requiring more than 3 steps, or touching more than 2 files or modules, is delegated. The architect keeps four things: blueprint authoring, PRD writing, handoff evaluation, and escalation.

This is a context-economy rule masquerading as a role definition, and it is the reason the architect can hold an entire epic. An orchestrator that reads implementation detail stops being able to sequence.

## C-3 · The PRD is the composition artifact, and it is self-contained

Seven mandatory sections. Two are load-bearing and the rest are hygiene.

**§3 Read / Write File Manifest** — three enumerated lists: *read only (context — do not modify)*, *write / modify (scoped change surface)*, *create (new files)*. This is the dispatch boundary made explicit. It is simultaneously a context hint (here is what to load), a scope fence (here is what you may touch), and the input to the reviewer's diff-scope check.

**§4 CI Gate** — literal runnable commands, with the instruction that a reduced gate must be documented in place rather than silently dropped. *The workstream is not COMPLETE until this passes with zero errors on the machine executing the work.*

The remaining five — feature overview with source documents and decisions linked by ID, independently checkable acceptance criteria, session protocol, explicit out-of-scope, and a blocker log that is appended to rather than deleted — exist to make the first two enforceable.

The out-of-scope section earns its place for a non-obvious reason stated in the template itself: it *"surfaces the seam for the next workstream."* Non-goals are not just scope defence; they are where the decomposition shows its joints.

## C-4 · Dependency edges are the deliverable

*"Dependency edges are the product — precise parallel vs. serial sequencing is the core value."*

The blueprint schema makes this concrete: every workstream carries `depends_on: []`, and the observed epics use it for real fan-out — a six-workstream phase with three roots, two mid-tier workstreams each depending on two roots, and one convergence node depending on four. Blueprints also express **contingency**: one workstream in the corpus is annotated *runs ONLY IF the evidence from its dependency FAILS.*

Note the honest limit, because it matters for the port: the state file is a flat `{workstream: status}` map that models no edges at all, so contingency and even ordinary `depends_on` are enforced by the architect at dispatch time, not by the resolver. Their own issue register says so. The *discipline* of declaring edges is what transferred value; the code that was supposed to enforce them did not.

## C-5 · Evaluation is layered, and only the bottom two block

| Layer | Owner | Blocks? | Checks |
|---|---|:--:|---|
| 1 — Deterministic | Architect | **Yes** | lint · build · type-check · test · security scan · **diff-scope verification** |
| 2 — LLM judgment | Architect | **Yes** | code quality, framework idioms, intent alignment |
| 3 — Qualitative | Strategist | No | legibility to a new teammate, artifact actionability |
| 4 — Strategic | Strategist | No | does it advance the initiative; does it serve the team or the author |

Each layer has a template. The judgment-layer template contains the section most worth copying: **"Known False Positives — Do Not Flag."** A model-graded review with no false-positive register produces noise that trains reviewers to ignore it.

Layer 1's diff-scope check is where the file manifest from C-3 pays off — the gate can mechanically ask whether the diff stayed inside the declared write surface.

## C-6 · Retry is bounded at two, then escalates with a recommendation

| Attempt | Action |
|---|---|
| 1st failure | Specific feedback at `file:line`. Worker fixes and resubmits. |
| 2nd failure | **Stop.** Escalate with: what failed, what was tried, and a recommendation. |

The recommendation requirement is the part that is easy to drop and expensive to lose — an escalation without one moves the problem without moving the decision. Paired with a standing escalation list: any workstream scoping out-of-mandate work, any scope change to a gated workstream, any newly discovered failure mode, and any second evaluation failure.

## C-7 · The gate artifact is evidence-shaped

The handoff template opens by naming itself: *"This file is the approval gate. Do not generate it if CI is failing."* Seven sections, of which four are structurally interesting:

- **Work completed** — with file paths, function names, line numbers. Prose alone does not satisfy it.
- **Work NOT completed** — and if everything shipped, the literal word `None`. Forcing an explicit negative is what stops the section being silently skipped.
- **Technical debt register** — what, why, and the remediation path, or `None`.
- **Verification for reviewer** — numbered steps to reproduce, plus a PASS/N-A evidence table per gate command.

The pattern generalizes past software: *every completion claim names the artifact that proves it, and every absence is asserted rather than omitted.*

## C-8 · Heartbeats are checkable without a model

`PULSE.md` is append-only; each entry is one JSON block:

```json
{"timestamp":"2026-07-03T09:41:35Z","status":"COMPLETE","tasks_completed":"1/1","blockers":"none","escalation_needed":false}
```

The router regex-extracts every fenced JSON block, parses the **last** one, and exits `HEARTBEAT_ALERT` or `HEARTBEAT_OK`. No model in the loop. An unparseable trailing block alerts rather than passing — failure is the safe direction.

The corresponding worker-side rule: on a block, set `status: BLOCKED` and `escalation_needed: true` **and stop** — *do not guess around architectural ambiguity.* Escalation is cheaper than a confidently wrong branch.

---

## The ninth thing, which is not a contract but a substrate

Everything above assumes the agent arrives already holding the right instructions. That is handled separately and mechanically, by nine rule files carrying a `paths:` glob in frontmatter, auto-loaded when the agent touches a matching file. Working in the orchestration tree loads the protocol rules; editing any markdown loads the authoring and naming rules; touching the knowledge base loads the retrieval doctrine.

This is the same shape as the native parent-child instruction hierarchy documented in [`../../../claude-code/07-context-and-memory.md`](../../../../content/claude-code/07-context-and-memory.md) — a root instruction file plus per-subtree files that load on demand — with one difference worth noting: `paths:` globs are **orthogonal to directory structure**, so a rule can attach to `**/*.md` or `**/MEMORY.md` across the whole tree rather than to one subtree. Where the native mechanism keys on location, this keys on what you are touching.

The practical consequence for LoomWarp: these are not competing designs. The native hierarchy handles *where you are*; `paths:` rules handle *what kind of thing you are editing*. Both mechanisms already exist in Claude Code, and `generic-cerebro` uses only the second. Adopting the first is free.

---

## What the contract does not solve

**None of it binds.** There is no hook, no schema validator, no pre-commit gate anywhere in the repository that checks a PRD has a file manifest, a handoff has an evidence table, or a pulse entry parses. The entire apparatus is prose an agent is asked to follow, and the evidence that it mostly worked is 81 handoffs from a single disciplined operator — which is evidence about the operator at least as much as about the contract.

This is the corpus's third inclusion-test question, failed, and it is the same Stage-1 Policy hole in LoomWarp. The two systems have the identical weakness for the identical reason: both invested in the authoring layer and neither built the enforcement layer beneath it.

**The good news is that this is now cheap.** The gap analysis notes that native coverage for Policy is *high* — hooks with `permissionDecision`, managed settings, `Tool(param:value)` matchers — and concludes the v1 policy gate *"is now a config change, not a build."* Several ADR seeds are therefore written as pairs: the contract, and the hook that makes it binding. Adopting a contract without its hook reproduces this system's exact ceiling.

---

*Companion: [`02-generic-cerebro.md`](./02-generic-cerebro.md) — the system these contracts run in · [`07-transfer-manifest.md`](./07-transfer-manifest.md) — port verdicts · `loomwarp-team-system` `references/claude-code/30-gap-analysis-loomwarp.md` (private) — what the harness already supplies*
