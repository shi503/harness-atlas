---
title: "FRACTAL — process-layer reference set"
tier: reference
project: harness-atlas
provenance: OBSERVED
created: "2026-09-08"
source_verified: "2026-09-08"
claims_captured: "2026-09-08"
docs_root: "github.com/shi503/fractal-agent-system (no documentation site — see Provenance)"
version_at_capture: "6398f6db059598e381336601b21609928cf24034 (2026-04-20)"
status: ACTIVE
verification:
  derived_from:
    - "shi503/fractal-agent-system @ 6398f6db059598e381336601b21609928cf24034 (2026-04-20) — README.md, BEST-PRACTICES.md, SETUP-CLAUDE-CODE.md, SETUP-CURSOR.md, The FRACTAL Multi-Agent System.md, .claude/ (agents, skills, fractal), example-claude/, docs/, ROUTING_LOGIC/ — read 2026-09-08"
    - "the same repository at origin/main 9905012412fb7847893d630701e7ec75cf222760 (2026-09-03), for the kernel added since the pinned commit — read 2026-09-08"
    - "harness-atlas working tree at 7d1bb149a7936987fcaaeb31cede78ed1f7310b3 (2026-09-08) — CLAUDE.md, fractal/, docs/agents/, .claude/agents/"
    - "no positioning copy exists — see 'What FRACTAL says it is for' below for what was checked"
  grounded_against:
    - "the profile at ../fractal.md, read against 6398f6db on 2026-09-03"
    - "router.py executed directly against six constructed BLUEPRINTs and six constructed PULSE files (see 04 and 05)"
    - "gh api for the repository, its releases, tags, pages and owner repository list"
  drafted_by: "claude-opus-5"
  drafted_on: "2026-09-08"
  verified: false
  verified_by: ~
  verified_on: ~
  note: >
    drafted_by is CAPTURED at write time, not attested. Depth (Standard) and scope (instances U and R
    only) arrived in the dispatch and were not negotiated by this agent. One of the profile's three
    instances is unreachable — see 'Instance C' below.
---

# FRACTAL — process-layer reference set

**This folder is the deep read for the Template v2 profile at [`../fractal.md`](../fractal.md).**
Start there; open these documents when a §6 detail row's `Ships`/`Path` needs more grain.

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**What this is.** A reading of FRACTAL's own markdown and its one piece of code, organised by **the
objects FRACTAL names** — the install payload, the four tiers, the BLUEPRINT and workstream PRD,
`router.py`, HANDOFF and PULSE, the four evaluation layers, and the un-routed instance. Cut by
FRACTAL's vocabulary rather than by this atlas's components, which is what makes it the profile's
complement rather than a second copy of it.

---

## The shape found, and why it is this one

**FRACTAL's surfaces are documents produced at a tier boundary, not extension points.** There is no
plugin system, no hook table, no configuration file with sections to enumerate. What it ships is five
named artifacts, one 322-line Python state machine, four role files and four evaluation templates. So
the decomposition below follows the **order a reader meets those objects** — install, tiers, the
inputs the Architect authors, the machine that reads them, the outputs a Feature Lead produces, the
gate that judges them — rather than any structure imposed from outside.

**Two documents sit outside the pinned read**, and are marked as such wherever they appear:

- [`07-the-un-routed-instance.md`](./07-the-un-routed-instance.md) describes instance `R`, which the
  profile's §6 rows already carry deltas for.
- [`08-the-kernel.md`](./08-the-kernel.md) describes a surface added to instance `U` **after** the
  commit the profile pins and grades. **It has no counterpart in the profile's §6**, nothing links out
  to it from there, and nothing in it should be read as scoring.

---

## What FRACTAL says it is for

### There is no positioning copy, and that is a fact about the system

**Checked, 2026-09-08, and found empty:** `gh api repos/shi503/fractal-agent-system` returns
`homepage: null`, `has_pages: false`, `topics: []`; `/releases` returns `0` and `/tags` returns `0`, so
there are no release notes; `/pages` returns 404; the declared wiki has no content
(`git ls-remote …wiki.git` → *Repository not found*); a web search for the repository name and the
framework name returns unrelated academic and vendor material only. There is no landing page, no
product site, no launch or announcement post, and nothing in the tree written to persuade.

The nearest thing to a pitch is the **GitHub repository description**, which is the same sentence as
the first line of `README.md`. It is recorded as the first row below rather than treated as marketing.

### The stated-intent ledger, from the system's own markdown

Verbatim, cited to **file and commit** rather than URL, because there is no URL to cite. These are
**statements of intent**, which is the one thing the author is the sole authority on — recorded as
claims, never as findings. [`20-consolidated-guide.md`](./20-consolidated-guide.md) §7 walks each
against the mechanisms this set documents.

**Self-authored markdown fails the opposite way to marketing: it states intent in the present tense as
though it were implemented.** Every row below was therefore checked against the source tree before the
walk in `20`, and where a document and the code disagree, **the code is recorded as what happens** and
the disagreement is named. Four such disagreements are collected in
[`20`](./20-consolidated-guide.md) §6.

| Stated intent, verbatim | File, at `6398f6db` |
|---|---|
| *"a hierarchical framework for orchestrating teams of AI agents on complex software development tasks. It addresses context drift, serialization of parallel work, and cost inefficiency in long-running agentic sessions."* | GitHub repository description; first line of `README.md` |
| *"Deterministic Orchestration — Flow control lives in Python (`router.py`), not in LLM prompts. LLMs are unreliable routers; code is not."* | `README.md` → Core Principles #1 |
| *"Hard Context Resets — Each agent starts with a clean, well-defined context file. No accumulated conversation history. Prevents context drift."* | `README.md` → Core Principles #2 |
| *"Hierarchy and Specialization — Four tiers with explicit model assignments. Match model cost to task complexity."* | `README.md` → Core Principles #3 |
| *"Tool Trace as Truth — Evaluation is based on actual build/lint/test output, not agent self-reporting."* | `README.md` → Core Principles #4 |
| *"The flow of work is controlled by a deterministic state machine (router.py), not by an LLM. This ensures that the system is predictable and that agents remain focused on assigned tasks."* | `The FRACTAL Multi-Agent System.md` → Core Philosophy #2 |
| *"While orchestration is deterministic, the work performed by agents is not. The FRACTAL system manages non-determinism — not eliminates it."* | `The FRACTAL Multi-Agent System.md` → A Note on Determinism |
| *"The key insight: The Architect never writes code. Feature Leads never make architectural decisions. Sub-Agents never reason about surrounding context. Each tier does exactly one thing."* | `README.md` → Architecture |
| *"HANDOFF evaluation is an approval gate — do not mark COMPLETE without reviewing the handoff artifact"* | `.claude/agents/architect.md` → Architect Principles |
| *"A HANDOFF without build evidence is opinion, not evidence."* | `BEST-PRACTICES.md` §6 |
| *"`router.py update COMPLETE` without writing HANDOFF.md produces no audit trail… You end up with a state file that says 'COMPLETE' but no record of what was built, what wasn't, or whether the build passed."* | `BEST-PRACTICES.md` §4 |
| *"The PRD is the only context a Feature Lead gets. It starts fresh with no memory of previous sessions."* | `BEST-PRACTICES.md` §2 |
| *"A Strategist doc generated without user input is worse than no doc at all — it gives the Architect false confidence in a mandate that was never actually validated."* | `.claude/agents/strategist.md` → Background-Agent Guard |
| *"FRACTAL adds overhead. Use it when the epic has: 3+ workstreams that could run independently… Skip it for: single-file fixes, small features, tasks under ~2 hours."* | `README.md` → When to Use FRACTAL |
| *"FRACTAL runs **un-routed** here: no router, no blueprint YAML, no state file."* | instance `R`, `CLAUDE.md` § Workstreams, at `7d1bb14` |

---

## Instance `C` is unreachable

The profile reads three instances. **Two were reachable on 2026-09-08.**

- **`U` — `shi503/fractal-agent-system`**, public, MIT. Pinned at `6398f6db059598e381336601b21609928cf24034`
  (2026-04-20), which is the commit the profile grades. Reachable; this set's primary subject.
- **`R` — `harness-atlas`**, the un-routed instance. Reachable — working tree at `7d1bb14` (2026-09-08).
  Covered in [`07`](./07-the-un-routed-instance.md).
- **`C` — `shi503/generic-cerebro` @ `2cd56e7`** — **not reachable at this read date.**

**What was checked for `C`, 2026-09-08:** `gh api repos/shi503/generic-cerebro` returns HTTP 404;
`gh api "search/repositories?q=user:shi503+cerebro"` returns `total_count: 0`; the same authenticated
search for *fractal* returns exactly two repositories, neither of them `generic-cerebro`; and the
owner listing `gh api "user/repos?per_page=100&affiliation=owner"` returns nineteen repositories, none
of them `generic-cerebro` under any name. No local clone exists on this machine.

**Consequence, stated plainly.** Every `C` figure in the profile — the 156 workstream directories, the
39 skills, the 849-line standards tier, the decision ledger's 242 entries, the dual-schema
`_normalize_blueprint()` — was true when read on 2026-09-03 and **cannot be re-verified now**. This set
does not restate any of them, and no document here should be read as confirming one. The profile is
not retro-fitted; that is a correction for its next re-read. Recorded as ISSUE-024.

---

## Provenance and freshness

> **Read against `github.com/shi503/fractal-agent-system` at `6398f6db` (2026-04-20), 2026-09-08. A
> surface that has shipped since is not here — with the single, disclosed exception of
> [`08-the-kernel.md`](./08-the-kernel.md).**

**Where the documentation actually lives.** There is no documentation site and no rendered reference.
Everything is markdown in the repository, and it is in **four** places that do not agree about which
is authoritative:

1. `README.md` — install, first run, core principles, the one architecture diagram, known gotchas.
2. `SETUP-CLAUDE-CODE.md` (584 lines) — the real setup manual, and the only place the BLUEPRINT
   authoring rules and the workstream PRD's required sections are written out.
3. `BEST-PRACTICES.md` (133 lines) — production findings, and the most candid document in the tree.
4. `docs/` — reference prose the README itself marks *"not installable"*, plus the four permission-tier
   JSON files and a `_PRD-template.md` that is a **product** PRD template, not the workstream PRD
   template, and which writes the framework directory as `.claude/FRACTAL/`.

A reader who starts at the README will not find the BLUEPRINT authoring rules; they are in
`SETUP-CLAUDE-CODE.md` §7, which `ROUTING_LOGIC/README.md` points at and the README does not.

**Drift, and one figure that could not be reproduced.** The pinned commit is **four** commits behind
`origin/main` at `9905012` (2026-09-03): 16 files, +1,506/−230 lines, and the whole of that change is
the kernel documented in [`08`](./08-the-kernel.md). The profile records a different HEAD — `60393054`,
*"29 commits past the pinned read, +32,875/-3,853 lines across 303 files"*, carrying `standards/`,
`tools/decision-ledger/`, `tools/wiki-index/` and a plugin-marketplace install path. On 2026-09-08
`git cat-file -t 60393054` reports *"Not a valid object name"* in a full clone, that commit appears on
no branch, tag or pull-request ref, and none of those four directories exists at `9905012`. Both reads
are recorded with their dates; neither is adjusted to match the other.

**Refresh protocol.**

```bash
# Has main moved, and is the pinned commit still an ancestor?
gh api repos/shi503/fractal-agent-system --jq '.pushed_at'
git rev-list --count 6398f6db059598e381336601b21609928cf24034..origin/main

# The router is the only code. A diff here changes 04 and 06.
git diff 6398f6db origin/main -- .claude/fractal/router.py ROUTING_LOGIC/router.py

# The kernel is the newest surface; its schemas are the contract.
git show origin/main:kernel/schemas/blueprint.schema.json
```

When you refresh, update `source_verified` and `version_at_capture` in each file's frontmatter.

---

## The documents

| # | Document | Covers |
|---|---|---|
| 01 | [`01-install-and-repository-layout.md`](./01-install-and-repository-layout.md) | The two-line install, what the copy step does and does not install, three copies of the router, the payload's directory-name defect |
| 02 | [`02-the-four-tiers.md`](./02-the-four-tiers.md) | Strategist / Architect / Feature Lead / Sub-Agent role files, model assignment, the agent overlay, the Background-Agent Guard |
| 03 | [`03-blueprint-and-workstream-prd.md`](./03-blueprint-and-workstream-prd.md) | Every BLUEPRINT key, which three the router reads and which two it ignores, the workstream PRD's required sections, the name→directory mapping nothing performs |
| 04 | [`04-router.md`](./04-router.md) | The five commands, the state file's exact shape, and six behaviours reproduced by running the shipped code |
| 05 | [`05-handoff-and-pulse.md`](./05-handoff-and-pulse.md) | Three divergent HANDOFF templates, the PULSE JSON contract, and six pulse behaviours reproduced by running the shipped code |
| 06 | [`06-the-evaluation-layers.md`](./06-the-evaluation-layers.md) | The four layers and their templates, the 2-attempt retry policy, and who marks a workstream COMPLETE |
| 07 | [`07-the-un-routed-instance.md`](./07-the-un-routed-instance.md) | Instance `R`: what a FRACTAL install looks like with the router removed, and what replaces each thing it did |
| 08 | [`08-the-kernel.md`](./08-the-kernel.md) | **Outside the pinned read** — the harness-neutral contract, JSON Schemas and CI validator added to `U` after `6398f6db` |
| **20** | [**`20-consolidated-guide.md`**](./20-consolidated-guide.md) | **The synthesis: the mental model, the five things to know, where documents and code disagree — and the stated intents walked against what this set documented** |

Read **20** if you have ten minutes. The numbered references are lookup material; open them when you
need an exact key, section or command.

---

## How to read these

- **Exact names are preserved verbatim.** Status values, BLUEPRINT keys, command strings, file paths
  and section headings are quoted as the source spells them, including where two sources spell the same
  thing differently.
- **Behaviours marked *reproduced* were obtained by running the shipped `router.py`** against
  constructed inputs in a scratch directory, at the pinned commit. The exact input and output are given
  in [`04`](./04-router.md) and [`05`](./05-handoff-and-pulse.md).
- **Absences name what was checked.** They are collected in [`20`](./20-consolidated-guide.md) §5. None
  says "appears to lack".
- **Nothing here scores.** No coverage marks, no primitive count, no comparison to another harness.
  The profile and the grids do that.
