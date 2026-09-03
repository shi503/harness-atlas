---
title: "Teardown — Gas Town / Gas City / Beads"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# Gas Town / Gas City / Beads — Steve Yegge

**What it is.** A *software factory* — Yegge's term — for running many agents on many workstreams
without a human cycling between terminals. Declarative composable primitives: TOML workflows, reusable agent definitions, git-native work units, trigger-based automations, and a protocol that makes the underlying coding agent substitutable.

**The problem it names is babysitting.** Engineers re-injecting context and guardrails by hand,
attention as the throughput ceiling. Every primitive answers that.

---

## Architecture

| Layer | Implementation |
|---|---|
| **Workflow** | **Formulas** — TOML, step-by-step, multi-agent |
| **Worker** | **Agents** — modular, reusable across formulas; configured with scope, wake mode, provider, model |
| **Work units** | **Beads** — tiny trackable units, JSON in git alongside the code |
| **Automation** | **Orders** — trigger-based: *when X happens, run Y* |
| **Distribution** | **Packs** — shareable bundles of agents, formulas and orders |
| **Observability** | **Event Stream** — notification and logging across orchestrated work |
| **Portability** | **Factory Worker Protocol** — *"a standardized interface abstracting differences between CLI coding agents"*, covering codex, claude, gemini, amp, opencode, pi |

---

## Primitives mapped

| Gas City | LoomWarp function |
|---|---|
| Formulas | `F4` Control |
| Agents | `F5` Capability |
| Beads | `F4` Control / `F1` Surfaces — the project board |
| Orders | *(no equivalent — open thread `R-1`)* |
| Packs | `F5` Capability (Catalog) |
| Event Stream | `F7` Evidence |
| Factory Worker Protocol | `F0` Substrate |

**Orders remains unresolved.** Trigger-based automation is expressible natively as hooks plus
scheduled tasks, so it is probably an `F4` implementation detail rather than a missing function — but "probably" has been the answer for two revisions. It should either be named or explicitly closed.

---

## What it forces you to decide

1. **Beads or Linear** for work tracking. Gas City surfaces this as an explicit team choice rather
   than a default, which is exactly the shape `F1` should handle — a decision, recorded.
2. **Wake mode per agent** — when an agent runs unattended and when it waits.
3. **Which providers run in parallel**, because the multi-provider design is a quality choice here,
   not just a portability one.

---

## What it does well

**Beads is the most interesting answer to "where does work live" in the landscape.** JSON work units
in git alongside the code makes work diffable, reviewable, and co-located with what it changes. That
is the same argument `F1` uses for repo-markdown-as-source-of-truth, applied to tracking — and v0 has
never made the consistency argument that follows from it.

**The multi-provider argument is a quality argument, not a portability one.** The code-review-loop
formula runs Codex, Claude and Gemini in parallel because *"each one has been trained differently and
has a different point of view."* Portability is the side effect; adversarial diversity is the point.
That is an `F8` Learning technique v0 does not capture, filed as open thread `R-4`.

**Declarative composition.** Formulas are TOML, agents are reusable across formulas, packs bundle
both. A team can share a workflow without sharing a filesystem, which is the property `F5`'s Catalog
is trying to reach.

---

## What it does not claim

Maturity diagnosis · a standards tier · context provenance · policy enforcement as a first-class
layer.

---

## Credibility check

| | |
|---|---|
| **License** | Open source |
| **Stage** | Gas City 1.0 announced; actively written about by the author and by third parties |
| **Signal quality** | Unusually well documented for its stage, including by independent analysts (Maggie Appleton, SE Daily), which makes claims here easier to verify than most |
| **Caveat** | Yegge's own writing is deliberately rhetorical; primitive descriptions are reliable, scale claims are not independently verified here |

---

## What to steal

| # | Pattern | For |
|---|---|---|
| 1 | **Beads** — work units as JSON in git beside the code | `F1`/`F4` — the project-board question, and it is consistent with our own SoT argument |
| 2 | **The explicit "beads or Linear" choice** | `05-preflight-spec.md` — a missing question |
| 3 | **Multi-provider adversarial review** | `F8` — record now, build later |
| 4 | **Packs** — agents + formulas + orders as one shareable bundle | `F5` Catalog |
| 5 | **Wake mode per agent** | `F6` — human-in-the-loop placement expressed per worker |

---

## Sources

- [Announcing Gas City 1.0](https://sellsbrothers.com/announcing-gas-city-1-0) · [Welcome to Gas City](https://steve-yegge.medium.com/welcome-to-gas-city-57f564bb3607)
- [Gas Town: from Clown Show to v1.0](https://steve-yegge.medium.com/gas-town-from-clown-show-to-v1-0-c239d9a407ec) · [yegge.ai/gastown](https://yegge.ai/gastown)
- [Maggie Appleton — Gas Town's Agent Patterns](https://maggieappleton.com/gastown)
- [SE Daily — Gas Town, Beads, and the Rise of Agentic Development](https://softwareengineeringdaily.com/podcasts/gas-town-beads-and-the-rise-of-agentic-development-with-steve-yegge/)

*All accessed via `specs/v0/references.md`, compiled 2026-08-11.*
