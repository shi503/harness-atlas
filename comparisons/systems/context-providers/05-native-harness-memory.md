---
title: "Teardown — native harness memory (Claude Code, and what is not researched)"
tier: reference
project: loomwarp
created: "2026-08-27"
status: DRAFT
owner: KD
---

# Native harness memory — the default provider, and the event we are not using

**What it is.** The context layer the harness already ships: instruction files, path-scoped rules,
auto-memory, and the lifecycle events that fire around them.

**Why it matters to us.** It is the **recommended default** for `F3`'s Fabric in
[`../../../../specs/v0/02-functions.md`](../../../archive/v0/02-functions.md) §9, and native is
genuinely good here. It is also where the single cheapest path to the Briefing runs — see *What to
steal*.

> Scored against [`../../../../specs/v0/09-context-layer.md`](../../../archive/v0/09-context-layer.md) §6.
> Deep native analysis already exists at [`../../../claude-code/`](../../../content/claude-code); this reads it
> only as an `F3` provider.

---

## Architecture

| Layer | **Claude Code** | **Codex** | **Cursor · Amp · others** |
|---|---|---|---|
| **Fabric** | Nested `CLAUDE.md`, `.claude/rules/` with `paths:` globs, lazy nested loading, `claudeMdExcludes` | **TBD — not researched** | **TBD — not researched** |
| **Individual memory** | Auto-memory, per-user | TBD | TBD |
| **Scope** | Project · user · org; *"per repository, shared across worktrees"* | TBD | TBD |
| **Selection** | Path-scoped rules load on directory match; lazy nested loading | TBD | TBD |
| **Isolation** | Sub-agents with their own context; path scoping | TBD | TBD |
| **Compression** | Native compaction, improving fast | TBD | TBD |
| **Emission point** | **`InstructionsLoaded`** | TBD | TBD |
| **Capability provenance** | `claude_code.plugin_loaded` at session start | TBD | TBD |
| **Correlation keys** | `session_id` · `prompt_id` · `agent_id` · `workflow.run_id` | TBD | TBD |
| **The hole** | *"**No context provenance.** Nothing records which instruction files, skills, and rules were in the window"* | TBD | TBD |

> **`TBD — not researched. Do not infer.** Codex, Cursor and Amp memory were not examined in this pass.
> [`../../02-component-matrix.md`](../../02-component-matrix.md) §5 exists because inferred ratings had
> to be confessed once already. **A `TBD` in a shipped table is a research queue item; an inferred cell
> is a future correction.**

---

## Primitives it names

| Primitive | What it is | Function it implements | Scope it serves |
|---|---|---|---|
| **instruction file** | `CLAUDE.md`, nested, lazily loaded | `F3 select` | **team × project** (committed) or **individual × project** (gitignored) |
| **path-scoped rule** | A rule file with a `paths:` glob, loaded on match | `F3 select` · `F3 isolate` | team × project |
| **auto-memory** | Per-user persistence across sessions | `F3 write` | **individual × org** |
| **`claudeMdExcludes`** | Negative selection | `F3 isolate` | — |
| **sub-agent** | A bounded context for a delegated task | `F3 isolate` | — |
| **`InstructionsLoaded`** | The lifecycle event fired when the set is assembled | **`F3 select` → `P-6`, `P-15`** | — |

---

## What it forces you to decide

1. **What goes in the committed instruction file versus the per-user memory** — the routing question,
   which native poses and does not answer.
2. **Which directories carry rules** — path scoping is the native answer to `isolate`, and it is a real
   one.
3. **Whether you accept per-repository scope.** Native gives project · user · org, but memory is *"per
   repository, shared across worktrees"* — which collapses two cells of the 2×2.

---

## What it does well

**Path-scoped rules are `isolate`, implemented.** A rule that loads only when the agent touches a
matching path is scoping enforced by the harness, not by prompt discipline. `generic-cerebro` builds
its whole context-injection strategy on this and nothing else.

**Lazy nested loading is the right default for the ETH finding.** Loading only what the working
directory implies is *scoped constraint* rather than coverage — the requirement in
[`09-context-layer.md`](../../../archive/v0/09-context-layer.md) §1.1, satisfied by the harness before
anyone asks.

**`claudeMdExcludes` is negative selection**, which almost nothing else offers. Most stores let you add;
this lets you subtract.

**The correlation keys already exist.** `session_id`, `prompt_id`, `agent_id`, `workflow.run_id` — the
join keys a per-run manifest would need are emitted today.

---

## What it does not claim

Team memory as distinct from project files · the individual/team routing question ·
**context provenance** (stated outright) · access control over context · freshness · trust tiers ·
ownership.

---

## Credibility check

| | |
|---|---|
| **Source** | First-party documentation, analysed at [`../../../claude-code/`](../../../content/claude-code) across 10+ documents |
| **Stage** | Shipped and in daily use; this is the most-verified provider in the folder |
| **Scale evidence** | n/a — it is the harness |
| **Coverage of this teardown** | **Claude Code only.** Codex, Cursor and Amp are `TBD` |
| **Caveat** | The hole is quoted from our own prior analysis, not from vendor documentation. The vendor does not claim context provenance either way |

---

## The steal that matters: `InstructionsLoaded` already fires

[`../../../claude-code/03-hooks.md`](../../../content/claude-code/03-hooks.md) names it:
*"`InstructionsLoaded` is the load-bearing event for LoomWarp's context-provenance manifest."*
[`../../../claude-code/20-consolidated-guide.md`](../../../content/claude-code/20-consolidated-guide.md) names
the hole: *"**No context provenance.** Nothing records which instruction files, skills, and rules were
in the window."*

**Both sentences are already written, in this repo, and nothing connects them.**

> **The Briefing does not need to be invented. It needs to be emitted from an event that already
> exists.**

That reclassifies `P-15` — the per-run manifest, the differentiation claim — **from an unbuilt design to
an integration.** It is the same move [`../../02-component-matrix.md`](../../02-component-matrix.md) §1
makes for the `F7` join: *"for everyone else the join is a build; here it is an integration."* **Second
function, same sentence, and it should be said in both places.**

What that leaves is genuinely small: subscribe to the event, hash what it reports, write a manifest
keyed by `session_id`, and join it to the run's outcome. **`GAP-27`.**

---

## What to steal

| # | Pattern | For |
|---|---|---|
| 1 | **Emit the Briefing from `InstructionsLoaded`** | `P-6`, `P-15`, `GAP-27`. The cheapest path to the differentiation claim in the corpus |
| 2 | **Path-scoped rules with `paths:` globs** | `P-9`. `isolate`, already solved, already adopted by a peer |
| 3 | **Lazy nested loading** | §1.1. Scoped constraint by default |
| 4 | **`claudeMdExcludes`** — negative selection | `F3 isolate`. Subtraction is rarer and more useful than addition |
| 5 | **The correlation keys** | `F7`. `session_id` and `run_id` are the join columns a manifest needs |

---

## Sources

- [`../../../claude-code/03-hooks.md`](../../../content/claude-code/03-hooks.md) — `InstructionsLoaded`
- [`../../../claude-code/07-context-and-memory.md`](../../../content/claude-code/07-context-and-memory.md) — the
  native scope table
- [`../../../claude-code/09-telemetry-and-evidence.md`](../../../content/claude-code/09-telemetry-and-evidence.md)
  — `claude_code.plugin_loaded`, correlation keys
- [`../../../claude-code/20-consolidated-guide.md`](../../../content/claude-code/20-consolidated-guide.md) — the
  no-context-provenance finding
- [`../../../claude-code/30-gap-analysis-loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/claude-code/30-gap-analysis-loomwarp.md)
  — `ContextProvenance` as a priority
- **Not read:** Codex, Cursor, Amp memory documentation. Queued
