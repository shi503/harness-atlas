---
title: "v0 — Regrounding"
tier: spec
project: harness-atlas
created: "2026-08-11"
status: ARCHIVED
owner: KD
supersedes_framing_of: projects/loomwarp/references/elements.md
provenance: AUTHORED
---

# v0 — Regrounding

**What this is.** A first-principles re-derivation of what LoomWarp's concepts are, starting from the
question a team actually has to answer rather than from the artifacts this repo happens to have
built.

**Why it exists, and why it is numbered v0 rather than v2.** The existing planning substrate —
`references/elements.md` and `specs/v1/` — was built inside-out. It started from `router.py`,
`dispatch.py`, and `registry/repositories.yaml`, and named the structural properties those artifacts expressed. That produced a coherent *diagnostic* (the seven elements and the Grid), and the diagnostic is good. What it cannot do is answer the question a product manager has to answer for a team:

> **"How does our AI-native team work?"**
> → *How does work get done? · What does good look like? · How does this get implemented?*

v0 is numbered below v1 because it is the layer that should have come first. It is groundwork, not a successor.

---

## Status and authority

| | |
|---|---|
| **Status** | DRAFT — written to be edited. Every contested call is marked `OPEN` with the case for each side |
| **Supersedes** | The *framing* of `references/elements.md` — what the elements are and what the nouns denote |
| **Does NOT supersede** | The Grid machinery (six stages, minimum-governs, evidence-or-you're-a-column-left), which `03-maturity.md` extends rather than replaces |
| **Does NOT invalidate** | `specs/v1/*` or `BLUEPRINT-LoomWarp-V1.yaml`. Those remain valid execution plans. Whether and how to migrate them is a later, explicit decision |

Nothing in v1 was renumbered or edited by this pass.

---

## Reading order

| # | Document | What it settles |
|---|---|---|
| 00 | [`00-the-framework-from-agile.md`](./00-the-framework-from-agile.md) | **Start here.** What the framework *is*, in one screen — for a team coming from Agile: what Agile assumed, which seats an agent can hold, and the loom |
| 01 | [`01-problem.md`](./01-problem.md) | The question tree, the derivation method, and the two-question test for what counts as an element |
| 02 | [`02-functions.md`](./02-functions.md) | **The reference.** The twelve functions in full, in decision bands, each naming the system you implement and who provides it |
| 03 | [`03-maturity.md`](./03-maturity.md) | Two maturity axes, three thresholds, per-stage pitfalls. Merges the prior AI-native rubric with the Grid |
| 04 | [`04-decision-layers.md`](./04-decision-layers.md) | Who decides what, at what cadence, recorded where, and how expensive it is to change later |
| 05 | [`05-preflight-spec.md`](./05-preflight-spec.md) | Spec for the install config generator — the onboarding wizard. Spec only; no HTML this pass |
| 11 | [`11-architecture.md`](./11-architecture.md) | **The stack.** Nine bands bottom-up, the two layers that accumulate, ports-and-adapters, and the five functions `F12`–`F16` the graded model was missing |
| — | [`references.md`](./references.md) | The sourced catalog: the systems, the standards layer, the maturity-model prior art |
| — | [`../../references/comparisons/`](../comparisons) | **The landscape analysis.** What "agentOS" means, the concept vocabulary, the component matrix, jobs-to-be-done, and per-system teardowns |

**Read `00` if you read nothing else.** It is the only document written for someone who does not already care about this framework, and everything below it is elaboration.

Read **00 → 01 → 02** for the argument. Read **02** alone if you want the full element list. Read **[`comparisons/01-concepts.md`](../comparisons/01-concepts.md)** first if you want to know whether any of this is novel — it scores the element model against fifteen concepts and finds four with no element at all.

> **A note on `00` versus `02`.** The twelve functions are a *diagnostic*: they exist to be graded, one at a time, so a team can find its thinnest thread. That makes `02-functions.md` an excellent reference and a poor introduction — the failure mode KD named is that it reads like a decomposition of an enterprise framework rather than something a team recognises as their own work. `00` is the fix, and it is deliberately a different shape: no grading, no providers, no `OPEN` markers in the body. Neither supersedes the other.

---

## What changed, in one screen

Three findings drove the regrounding.

**1. The elements are categorically inconsistent.** The current seven mix four different kinds of
noun:

| Element | The noun names a… |
|---|---|
| E1 Workspace, E2 Context, E3 Control | **system** — a thing that runs |
| E4 Capability | **unit** — the thing being packaged, not the packager |
| E5 Policy, E6 Evidence | **principle** — "every claim points at an artifact" |
| E7 Learning | **process** |

"Implement Evidence" does not parse. "Implement the Evidence Ledger" does. This is a structural
problem, not a wording problem, which is why it needs a re-derivation rather than an edit.

**2. Three of three comparable systems build the thing we called a non-element.**
`references/elements.md:63` lists *"Adapters / runtime-neutrality"* as a deliberate non-element — *"a
cross-cutting property of E2 and E4, not a thing you construct."* But:

- **gstack** ships `./setup --host <claude|codex|opencode|cursor|factory|slate|kiro|hermes|gbrain>`
- **Gas City** makes the **Factory Worker Protocol** a headline primitive, explicitly so agents are
  substitutable without modifying formulas
- **QM** ships adapters for **Pi, OpenCode, Codex, and Claude Code**, selectable per user or per room

All three constructed it. That is corroboration strong enough to overturn the call. It becomes
`F0 Substrate`.

**3. "Workspace" was under-specified, and the prior art already named the missing half.** Workspace
currently means *repos*. For a real team it also means where work is seen and done — Slack, Gmail,
Drive, GitHub, Linear/Jira, the wiki — and, critically, **which of those is the single source of
truth**. QM names this layer directly: *"surfaces are plugins, not the product."* It becomes
`F1 Surfaces`, split out from what is now `F2 Estate`.

---

## Open questions this draft does not resolve

Posed deliberately, for KD to settle while editing. Each is marked `OPEN` at the point it arises.

> **Register swept 2026-08-27.** **Seven of fourteen are now resolved** — `OPEN-2`, `OPEN-3`, `OPEN-4`,
> `OPEN-5`, `OPEN-6`, `OPEN-8`, `OPEN-9` — mostly by [`02-functions.md`](./02-functions.md) §2's conflicts
> table, which had been answering them without the register knowing. **Five remain open:** `OPEN-1`
> (is *system* a real layer), `OPEN-3`'s sibling `C-3` (the `Substrate` name), `OPEN-10`…`OPEN-12`,
> plus the two the context-layer spec added, `OPEN-13` and `OPEN-14`. `OPEN-7` is narrowed rather than
> closed and carries a dated falsifier.
>
> **The lesson worth keeping:** a resolution recorded in one document does not propagate to a register
> in another. Five of these were settled for weeks and read as open.

| # | Question | Where |
|---|---|---|
| **OPEN-1** | Is "system" a genuine second layer below the function, or is this a renaming pass? | **Still open.** [`02-functions.md`](./02-functions.md) §6 ships the Systems row in every function body, so the layer exists in practice and has never been ratified |
| **OPEN-2** | ~~Do `F3` Context and `F5` Capability split at the function level or the system level?~~ | **RESOLVED as `C-11`** — [`02-functions.md`](./02-functions.md) §2: **grade at the system level, roll up as the minimum.** First exercised in [`10-context-gap-analysis.md`](./10-context-gap-analysis.md), which grades `F3` per verb |
| **OPEN-3** | ~~Nine elements, or fewer?~~ | **RESOLVED as `C-12`** — [`02-functions.md`](./02-functions.md) §2: **twelve.** The count grew because the *jobs* grew from 12 to 17, not because the model inflated. `F7`+`F8` remains the strongest merge candidate if it must shrink |

### Raised by the comparisons pass, 2026-08-11

The landscape analysis at [`../../references/comparisons/`](../comparisons) found four
things the element model does not cover and one claim that has to narrow. They are recorded as
findings, **not acted on** — acting on them is the next pass.

| # | Question | Where |
|---|---|---|
| **OPEN-4** | ~~`F0 Substrate` bundles *which harness* and *what keeps us portable*. Split?~~ | **RESOLVED as `C-4`** — [`02-functions.md`](./02-functions.md) §2: portability is **a property of `F0`, not a peer function.** `C-3` separately keeps the *name* `Substrate` under protest; that half stays open | [`comparisons/01-concepts.md`](../comparisons/01-concepts.md) §2 |
| **OPEN-5** | ~~Individual vs. team memory is a first-class primitive in four peer systems and has no place in `F3`~~ | **RESOLVED 2026-08-27** — [`09-context-layer.md`](./09-context-layer.md) §3 makes scope a first-class axis: individual\|team × project\|org, with every provider required to declare its cells |
| **OPEN-6** | ~~Communication and human-in-the-loop *placement* have no function~~ | **RESOLVED** — [`02-functions.md`](./02-functions.md) §4 places `J11 coordinate humans` at **`F1` (the channel) + `F10` (the rhythm)**. Absorbed, not a new function |
| **OPEN-7** | The Briefing's claim has now narrowed **three times** — `ox agent prime` (SageOx), OpenAI's *run receipt*, and Google's **OKF v0.2** schema | **Narrowed, still ours.** [`10-context-gap-analysis.md`](./10-context-gap-analysis.md) `C-15`: OKF specifies **per-document** provenance; the Briefing is **per-run** resolution. Different objects. Falsifier dated **2026-12-01** |
| **OPEN-8** | ~~**Rituals** passes the two-question test and has no function~~ | **RESOLVED as `C-7`** — [`02-functions.md`](./02-functions.md) §2: `F10 Cadence` **is a function.** *A ritual is not a meeting; it is a scheduled loop that emits an artifact.* `J17` has no input without it |
| **OPEN-9** | ~~**Stewardship** — is the steward an agent or a gate?~~ | **RESOLVED as `C-8`** — [`02-functions.md`](./02-functions.md) §2: **an agent, over an evidence corpus.** No longer a design question: LangSmith Engine is a shipped implementation. `generic-cerebro`'s tier split (agent over `wiki/`, gate over `decision-log/`) is the finer answer |
| **OPEN-13** | Does `F6 Policy` widen to own RBAC-over-context, or does `F3 isolate` own the decision with `F6` owning only the gate? | [`09-context-layer.md`](./09-context-layer.md) §5.1 takes the second position; the first was not argued out |
| **OPEN-14** | Is the Briefing (`P-6`, `P-15`) a **provider obligation** or a LoomWarp layer *above* any provider? | [`09-context-layer.md`](./09-context-layer.md) §10. **This decides whether we integrate or build** |

---

## What this pass deliberately did not do

- **No HTML artifacts.** The maturity explorer and the pre-flight generator are specified in `03` and
  `05` and built later, per the instruction to get the markdown right first.
- **No rewrite of `references/claude-code/30-gap-analysis-loomwarp.md`.** That becomes a coverage
  matrix once these elements are settled, so its rows can be v0 systems rather than v1 elements.
- **No migration of v1.** `specs/v1/*`, `plan.md`, and the blueprint are untouched.

---

## Provenance

Written 2026-08-11. Draws on:

- `projects/loomwarp/references/elements.md` — the seven elements and the Grid, superseded in framing
- `projects/loomwarp/references/claude-code/` — 13 documents on Claude Code's extension layer, read from the official docs on 2026-08-10
- **`generic-cerebro`** — the author's prior agent-OS. Its six-stage AI-native maturity rubric is the direct ancestor of the Grid, and its architecture is inherited rather than merely cited. Teardown: [`comparisons/systems/kd-built-frameworks/`](../comparisons/systems/kd-built-frameworks)
- [`../../references/AI-Native Organizational Maturity Framework.md`](../../../references/AI-Native Organizational Maturity Framework.md) — the source maturity model: three eras, six stages, four dimensions, and an explicit commitment threshold
- The systems and essays catalogued in [`references.md`](./references.md)
