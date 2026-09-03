---
title: "Teardown — beads / Gas City, as a negative control"
tier: reference
project: loomwarp
created: "2026-08-27"
status: DRAFT
owner: KD
---

# beads — the git-native artifact, applied to work and not to context

> ## ⚠️ No implementation was inspected
>
> **Verified 2026-08-27** across the whole estate: no `beads` / `bead` / `.beads` / `gastown` /
> `gas-city` directory, no `bd` binary on `PATH`, no `~/.beads`, no `formulas/` tree. Every substantive
> hit is documentary.
>
> **This teardown is reconstructed from published descriptions and from
> [`../gas-city.md`](../gas-city.md) (116 lines). No code was read.** Architecture claims below are
> Yegge's, relayed. Treat primitive *descriptions* as reliable and *scale* claims as unverified — the
> caveat the existing teardown already carries.

**What it is.** Gas City's work-unit primitive: **tiny trackable units stored as JSON in git alongside
the code.**

**Why it is in a folder about context providers.** Because it is not one — and the reason it is not one
is the finding. **Beads is the negative control for the context-layer thesis.**

---

## Architecture — reconstructed from published descriptions, not inspected

| Layer | Implementation |
|---|---|
| **Workflow** | **Formulas** — TOML, step-by-step, multi-agent |
| **Worker** | **Agents** — reusable across formulas; configured with scope, wake mode, provider, model |
| **Work units** | **Beads** — tiny trackable units, **JSON in git alongside the code** |
| **Automation** | **Orders** — trigger-based: *when X happens, run Y* |
| **Distribution** | **Packs** — shareable bundles of agents, formulas and orders |
| **Observability** | **Event Stream** — notification and logging across orchestrated work |
| **Portability** | **Factory Worker Protocol** — *"a standardized interface abstracting differences between CLI coding agents"* |

**No record schema, no field names, no write or read path, no provenance model, no supersession
semantics, and no enforcement mechanism are available for beads at any level of detail.** The corpus's
treatment is architecture-level by necessity, not by choice.

---

## Primitives it names

| Primitive | What it is | Function it implements | Scope it serves |
|---|---|---|---|
| **bead** | A work unit as JSON in git, beside the code it changes | **`F1 Surfaces`** — where work is seen | **team × project** — it is in the repo, so it is everyone's |
| **formula** | A declarative multi-agent workflow | `F4 Control` | team × project |
| **order** | A trigger: *when X, run Y* | `F10 Cadence` | team × project |
| **pack** | A shareable bundle | `F5 Capability` | team × org |
| **Event Stream** | Cross-run notification and logging | `F7 Evidence` | team × project |

**Not one of these is an `F3` primitive.** That is the point of the document.

---

## What it forces you to decide

1. **Beads or Linear** — Gas City surfaces work tracking as an explicit team choice rather than a
   default. [`../../02-component-matrix.md`](../../02-component-matrix.md) §2 notes we have no such
   pre-flight question, and calls it *"a cheap question with an expensive default."*
2. **Whether work lives in the repo or in a SaaS** — and therefore whether it is diffable, reviewable,
   and co-located with what it changes.

---

## What it does well — and the asymmetry that makes this a finding

**Beads is the best answer in the landscape to *where does work live*.** JSON work units in git beside
the code makes work **diffable, reviewable, and co-located with what it changes.** That is exactly the
argument `F1` uses for repo-markdown-as-source-of-truth, applied to tracking.

**And then Gas City did not apply the same argument to context.** Its own *what it does not claim* line,
from [`../gas-city.md`](../gas-city.md), names it outright:

> Maturity diagnosis · a standards tier · **context provenance** · policy enforcement as a first-class
> layer.

### The asymmetry, stated plainly

**The system that made *work units* git-native, versioned, diffable and co-located with the code
deliberately did not do the same for *context*.**

That is the negative control the thesis needs. If context provenance were simply an obvious consequence
of git-native artifacts, Gas City would have it — the argument was already made, in the same repo, by
the same author, for a neighbouring object. **It doesn't. Nobody transferred it.**

Two things follow:

1. **The git-native-artifact argument transfers, and the transfer is unclaimed.** A bead is to `F1` what
   a context artifact should be to `F3`: versioned, diffable, reviewable, co-located. `GAP-25` and the
   provider contract are that transfer written down.
2. **A negative control is stronger evidence than another positive example.** Five systems doing context
   provenance badly would show it is hard. One system doing the *identical* thing well for a different
   object, and not doing it here, shows it was **not attempted** — which is a much better answer to *why
   is this unclaimed*.

---

## What it does not claim

Any context layer at all · context provenance (stated by the system itself) · a knowledge store ·
memory · an individual/team boundary.

---

## Credibility check

| | |
|---|---|
| **Local copy** | **None. No code read.** Verified absent 2026-08-27 |
| **License** | Not established from this pass |
| **Stage** | Not independently verified |
| **Scale evidence** | **None verified.** [`../gas-city.md`](../gas-city.md) notes *"Yegge's own writing is deliberately rhetorical; primitive descriptions are reliable, scale claims are not independently verified here"* |
| **Sourcing** | [`../gas-city.md`](../gas-city.md) plus published writing. `beads` is also listed in [`../../2026-08-research/99-source-hygiene.md`](../../2026-08-research/99-source-hygiene.md) §4 under **"never returned"** — the shared-primitives thread was not completed |
| **Caveat** | Everything above is relayed. **Do not cite a beads mechanism as verified.** |

---

## Open threads this closes or sharpens

| # | Was | Now |
|---|---|---|
| **`R-5`** | *"Beads stores work units as JSON in git alongside code — a concrete answer to `F1`'s SoT question that neither this repo nor the peers treat as settled"* | **Sharpened into a finding.** The answer is settled *for work* and unattempted *for context*. The transfer is `GAP-25` |
| **`R-1`** | Orders — *"probably an `F4` implementation detail… 'Probably' has been the answer for two revisions; close it or name it"* | **Still open, and out of scope here.** Orders are `F10 Cadence`, not `F3`. Naming it is `F10`'s job, not this document's |

**KD's note at [`../../00-README.md`](../../00-README.md) is answered.** It read: *"curious about beads,
but for now let's keep decision-ledger as our own, but beads is an obvious corollary."* **The corollary
is now specific: beads is to `F1` what the decision-ledger is to `F3` — a git-native, diffable,
co-located artifact store — and neither one emits a per-run manifest.** Same gap, two functions.

---

## What to steal

| # | Pattern | For |
|---|---|---|
| 1 | **Work units as JSON in git beside the code** | `F1`. Diffable, reviewable, co-located — the same argument `F3` makes for context artifacts |
| 2 | **Forcing *beads or Linear* as an explicit choice** | `05-preflight-spec.md`. We have no project-board question; this is one of the two missing ones |
| 3 | **The asymmetry itself** | `F3`. Cite it as evidence that context provenance is unattempted rather than attempted-and-hard |

---

## Sources

- [`../gas-city.md`](../gas-city.md) — the system teardown, 116 lines, the only structured source
- [`../../02-component-matrix.md`](../../02-component-matrix.md) §1, §2 — the primitive set and the
  forced choice
- [`../../../../specs/v0/references.md`](../../../archive/v0/references.md) — threads `R-1`, `R-5`
- **Not read:** any beads implementation, the `bd` CLI, the bead record schema
