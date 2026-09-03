---
title: "FRACTAL as iterated — the delta from upstream"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# FRACTAL as iterated

**What this settles.** [`../fractal.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/fractal.md) profiles upstream FRACTAL — four tiers, blueprint → router → handoff, Claude Code only, vendored at a commit with zero tags and zero releases. LoomWarp vendored that version. `generic-cerebro` ran a fork of it across 27 blueprints and 130 workstreams and changed it substantially. This document is the delta, including the parts not worth taking.

**The short answer.** Adopt the artifacts and the disciplines. Do not adopt the state machine — their own defect register and yours independently condemned it, and the harness now supplies a better one.

---

## 1. What the iteration added

| Addition | What it does | Worth taking? |
|---|---|---|
| **`pulse` as a router command** | Regex-extracts every fenced JSON block from a heartbeat file, parses the last, exits `HEARTBEAT_ALERT` / `HEARTBEAT_OK`. Unparseable trailing block alerts rather than passes. Zero model calls. | **Yes** — the pattern, not the code |
| **Dual blueprint-schema normalization** | Accepts both the legacy phased shape (top-level list of phases, `feature_lead:` + `dependencies:`) and the flat shape (top-level dict, `id:`/`name:` + `depends_on:`), coercing to one internal form via a reference lookup keyed three ways | Situationally — this is migration scaffolding, and its existence is evidence that a schema change mid-flight is expensive |
| **Per-subtree state isolation** | The state path derives from the router's own file location, so copying the router into an isolated subtree gives that subtree independent state. Their sanctioned multi-blueprint workaround | **No** — it is a workaround for the defect in §3 |
| **Four evaluation templates** | Deterministic, LLM-judgment, qualitative-persona, strategic-benchmark. Layers 1–2 block; 3–4 advise | **Yes** — see [`01`](./01-the-composition-contract.md) §C-5 |
| **An append-only defect register** | `ISSUES.md` with three severities (critical, warn, minor), a lifecycle (`OPEN` → resolved by a named handoff), and a **pre-decomposition triage gate**: grep for open issues before authoring a new blueprint; any critical one becomes a workstream or is explicitly deferred in the blueprint's notes | **Yes** — and this is the single highest-value process addition |
| **Release-cut archive discipline** | `_archive/r{NN}-{slug}/` with a manifest, cut criteria (all workstreams complete, phase commit landed, next blueprint activating), a dry-run-by-default maintenance skill, and an explicit **never-archive list** | **Yes** |
| **A workstream benchmark** | A `what-good-looks-like.md` reference the architect grades against | Yes, cheap |
| **A gitignored intake staging area** | Where raw material waits before the Tier-0 agent shapes it | Minor |
> KD Note: on worth taking; this fractal iteration is a clear improvement and we should push this (when the time is right) and our discovered improvements to FRACTAL as is. 


The register deserves the emphasis. Upstream FRACTAL has no mechanism for recording that the framework itself is broken; defects live in memory or in a chat log. An append-only register with a gate that *reads it before the next decomposition* converts framework bugs from folklore into a scheduling input. LoomWarp created its own `ISSUES.md` during its first two build sessions — independently, and for the same reason.

---

## 2. What the iteration did not fix

**The tier vocabulary drifted.** The atomic-task tier is called `sub-agent` in one location and `fl-worker` in another, with the two definitions not byte-identical. Claude Code resolves agents by frontmatter `name:`, not filename, so both exist and either can win depending on load order. Their own workstream handoff documents the drift and does not close it.

> KD note: fl-worker is intentional because if you ask for a 'sub-agent' you unreliably will sometimes get a claude sub-agent generic vs our specific agent.  

**The status vocabularies do not agree.** The PRD template declares five statuses — `NOT_STARTED`, `IN_PROGRESS`, `BLOCKED`, `IN_REVIEW`, `COMPLETE`. The router validates three. `BLOCKED` and `IN_REVIEW` are therefore writable in a PRD and unrepresentable in state, and the router's status report silently buckets anything it does not recognize as not-started. **Do not reproduce this** — one vocabulary, declared once.

**The "one active blueprint" rule is not upheld.** Of 27 blueprints, several declare `status: ACTIVE` simultaneously, one is marked *do NOT initialize*, one is deliberately never initialized, and the router's configured default points at a different one again. The blueprint README states the lifecycle; nothing enforces it.

---

## 3. The convergent defect

This is the most useful finding in the folder, because it was found twice, independently, by two instantiations of the same design.

**`generic-cerebro`'s register**, across five separate issues, records one recurring failure: a blueprint is expanded, the flat state file goes stale, `update` fails against a key that does not exist, and the only command that would fix it — `init` — resets every workstream to not-started. Workers are therefore forbidden from running it, and the documented workaround is to hand-patch JSON. The standing remediation request is an additive `sync-from-blueprint` mode. It is unimplemented.

**LoomWarp's own register** records `ISSUE-002`: *one global `.state.json` across all blueprints; `init` silently wipes.* Severity WARN, unassigned. `specs/loom-warp-consolidation/02-remaining.md` carries the operational warning: *"Never run `router.py init` on the live blueprint… Back it up first."*

Two teams, one design, the same defect, no contact between the discoveries. That makes it a property of the state model rather than an operator error, and the property is specific: **a flat `{workstream: status}` map cannot represent the dependency graph it is supposed to be resolving.** Edges live only in the blueprint; state holds only nodes. Every downstream problem — contingency edges unenforced, `init` destructive, multi-blueprint collision, hand-patching — follows from that one omission.

The corpus's own gap analysis reached the right conclusion by a different route: **adopt the native resolver, delete the hand-rolled one.** This is the evidence that the conclusion is not merely a convenience.

---

## 4. What actually transferred

Strip the state machine out and what remains is a document set and a set of authoring rules:

| Survives | Because |
|---|---|
| Blueprint schema (as a *declaration* format) | Dependency edges declared in a reviewable artifact are valuable regardless of what resolves them |
| PRD template, incl. manifest + CI gate + session protocol | [`01`](./01-the-composition-contract.md) §C-3 — the harness supplies no equivalent |
| Handoff template with its evidence table | [`01`](./01-the-composition-contract.md) §C-7 |
| Pulse format and the model-free check | [`01`](./01-the-composition-contract.md) §C-8 |
| Four-layer evaluation ladder | [`01`](./01-the-composition-contract.md) §C-5 |
| Defect register + pre-decomposition triage gate | §1 above |
| Archive discipline with a never-archive list | §1 above |
| Tier model | Already inherited by both systems |
| **`router.py`** | **Does not survive.** §3 |

Upstream's profile lists what FRACTAL does not have: *single-repo only · Claude Code only · no policy enforcement layer · no context provenance · no standards tier · no maturity diagnosis · no capture loop.* The iteration closed three of those — standards tier, maturity diagnosis, capture loop — and closed none of the other four. Policy enforcement in particular remained absent through 130 workstreams, which is a reasonable measure of how little the absence hurts until it does.

---

## 5. The open question upstream's profile raised

[`../fractal.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/fractal.md) asks whether four tiers is minimum-sufficient scope, noting that `STRATEGIST-loomwarp.md` §2.6 requires naming the measurable failure of a simpler design before adding a tier, and that no such failure is recorded for tier four.

The evidence here is genuinely mixed and does not settle it. The atomic-task tier is used — the corpus contains dedicated worker agent definitions and single-file task dispatch — but it is also the tier with the vocabulary drift in §2, which is what an under-exercised abstraction looks like. Meanwhile the Tier-0/Tier-1 split is heavily exercised and clearly load-bearing: the intent document and the decomposition artifacts are authored by different roles at different cadences with different review gates.

**A defensible reading:** tiers 0, 1 and 2 are evidenced. Tier 3 is a dispatch pattern, not a tier, and calling it one may be what produced two names for it.

---

*Companion: [`../fractal.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/fractal.md) — upstream · [`01-the-composition-contract.md`](./01-the-composition-contract.md) — the disciplines that survive · [`08-appendix-schemas.md`](./08-appendix-schemas.md) — the schemas, lift-ready*
