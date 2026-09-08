---
title: "3d · Configuration"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "3 System Stacks"
sublayer: "3d"
function: "new"
job: "—"
horizon: "shipped"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 3d · Configuration

**Layer 3 System Stacks** · function `new` · job `—`

> **Where does our opinion attach?**
>
> Configuration is **the surface** on which a team's answers are written into files the agent reads
> rather than instructions someone repeats. It owns the mechanism set — *where* an opinion can attach —
> and not the opinion. **Every other component in this framework has to land on one of these surfaces or
> it is prose.**

**This is the only empirically-derived inventory in the corpus, and it is not ours.** Galster et al.
identify **eight configuration mechanisms** across five tools and **2,853 repositories**, with two
definitions worth adopting whole: a **configuration mechanism** is *"a means for developers to tailor
tool and agent behavior to a project or workflow"*, and a **configuration artifact** is *"a tangible
instance of a mechanism"* — a file, or a directory bundling files that together define one artifact.

**The eight, as published:** Context Files · Settings · Skills · Subagents · Commands · Hooks · Rules ·
MCP. Two — **Context Files and Skills** — are supported by all five tools, and the paper's own headline
finding is that **despite that convergence, *"no single tool implements all eight mechanisms."***

**Two attachments are already ruled and both are outside this component.** **MCP** attaches at `1a` as
a *declaration* and at `2a` as an *adaptation*. **Hooks** attach at `2b`. The remaining six are mapped
to bands in [`11-architecture.md`](../archive/v0/11-architecture.md) §3.1 — a mapping that file explicitly
marks as **ours, derived from each mechanism's published description**, not as a finding of the paper.
**Binding all eight to named components is `AC-6`'s job, done in
[`00-README.md`](../spec/v1-framework/00-README.md)** — bound there rather than here, because a mechanism assigned in the
file that happens to be writing it is how a surface acquires a reading nobody approved.

**None of the eight carries a version dimension in the survey, and the harness's own does** *(added
2026-09-01)*. What is written on these surfaces is read by a harness that has a version, by plugins
that declare **semver dependencies**, by skills whose portable frontmatter includes a
**`compatibility`** field enforced as a hard error
([`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides,
in one screen* — Distribution row, §*Two constraints*). A configuration artifact with no compatibility
statement is an opinion addressed to whatever happens to read it — which is fine until the harness
upgrades, and the upgrade is exactly the moment the team cannot afford the surfaces going silent. The
inventory question this attaches to is `1a`'s fourth question; the assertion mechanism is `2a`'s.

> ⚠️ **What the source does not contain, stated so nothing is supplied.** There is **no per-mechanism
> frequency table** — per-mechanism adoption is a figure, and *"Commands, Hooks and MCP have no
> standalone absolute counts anywhere."* There is **no agent-loop diagram.** And the repository count is
> **2,853** from v2 onward, not v1's 2,926. What the paper declines to say about *hook lifecycle points*
> specifically is recorded at `2b`
> ([`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1).

> ⚠️ **A discrepancy inside the recorded source, found by reading it and not resolved here.** The
> reproduced Table 1 shows one tool with a published path in **all eight** rows, while the verbatim RQ1
> quote on the same page states that *"no single tool implements all eight mechanisms."* Both are
> transcribed from the same primary read. **No claim in this framework is built on either side of it**,
> and it is recorded because a count derived from the table rather than from the prose is exactly the
> shape of error that file's §6 exists to prevent.

**What the adoption numbers actually say, and it is not flattering to the mechanism set.** Context Files
reach **90.6%** of repositories — 4,768 files across 2,586 of 2,853. Skills appear in **158 repos**, at a
median of two per repo — and what those skills actually contain is `4a`'s problem rather than this
component's. Beyond Context Files, Skills, Subagents, Rules and Settings, *"no other mechanism exceeds
20% adoption."* **The surface converged; the practice on it has barely started.**

**How do we work?** *"Each project declares its own harness configuration in files we own, and the agent reads it rather than being told."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The widest surveyed surface, with a published path for every mechanism the tool supports. ⚠️ Its own hard constraint belongs on this row: **project settings load only from the starting directory** and are *not* inherited from parent directories the way context files are — which breaks configuration designs that assume a hierarchy | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1 · [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*Two constraints that break control-plane designs* |
| **Deep Agents** | **Configuration as code rather than as files**, which is a real divergence from the surveyed five: `profiles/`, middleware lists and backends are constructor arguments. It buys expressiveness and gives up the property the survey measures — that a stranger can read a repository and see the team's answers | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §2 *Profiles*, §2 *Backends* |
| **MCP** | One of the eight, and the only one that is **split across two layers** — declared at `1a`, adapted at `2a`. Its configuration artifact is a server list per project | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The only peer that ships a **discipline for the surface** rather than more surface: the `improve-claude-md` skill states the mechanism — *"the more content that isn't applicable to the current task, the more likely Claude is to ignore everything"* — and the rule, *"if it's relevant to 90%+ of tasks, leave it bare. If it's relevant to a specific kind of work, wrap it"* | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §5 |
| **LoomWarp** | Agent definitions and a settings file, and **nothing on most of the other mechanisms** — no skills directory, no commands, no hooks, no rules. A configuration surface adopted at whatever its default was | [`loomwarp.md`](../content/loomwarp.md#3d-configuration) |

**Horizon:** `shipped` — `07-verified-inventories.md` §1 — eight configuration mechanisms across five tools and 2,853 repositories (Galster et al., arXiv:2602.14690v5); Context Files at 90.6% adoption, Skills in all five tools

**The consequence.** A team that has not chosen its configuration surface has still chosen one — the
default of whichever tool it installed — and every opinion it holds that does not fit that surface stays
in someone's head. **The measured picture is a field with eight places to be explicit and one that
nearly everybody uses** — context files, at 90.6%, with everything else trailing far behind. That is the
strongest available evidence that what limits a team here is not tooling.
