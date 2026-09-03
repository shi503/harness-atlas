---
title: "Teardown — gstack and gbrain (Garry Tan)"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# gstack / gbrain — Garry Tan

**What it is.** Two halves of one thesis. **gstack** is a process layer: 35+ slash-command skills
encoding a role-based sprint loop, installable into nine different agent runtimes. **gbrain** is the
knowledge layer underneath it: a retrieval and synthesis engine over a markdown corpus held in git
and indexed into Postgres. The thesis joining them is *custody* — that leverage should accrue to the
person who owns the files, not to the platform that hosts them.

---

## Architecture

| Layer | gstack | gbrain |
|---|---|---|
| **Distribution** | `./setup --host claude\|codex\|opencode\|cursor\|factory\|slate\|kiro\|hermes\|gbrain` | MCP server + HTTP; `serve` |
| **Unit** | Slash-command skills, markdown | Pages, markdown in git |
| **Storage** | Your repo | Git is source of truth; Postgres (or PGLite) for retrieval |
| **Retrieval** | n/a | Hybrid — vector + BM25 + reciprocal-rank fusion, plus typed graph edges (`works_at`, `invested_in`, `founded`) |
| **Operations** | The sprint loop | `search` · `think` · `capture` · `sync` · `serve` |
| **Sharing** | `--prefix` to avoid collisions | Federation across team members, OAuth-scoped |

**The sprint loop.** Think (`/office-hours`, `/plan-ceo-review`) → Plan (`/plan-eng-review`,
`/plan-design-review`, `/plan-devex-review`, `/autoplan`) → Build (`/spec`, `/investigate`) → Review
(`/review`, `/codex`, `/cso`) → Test (`/qa`, `/benchmark`, `/canary`) → Ship (`/ship`,
`/land-and-deploy`, `/document-release`) → Reflect (`/retro`).

What makes it more than a prompt library is that **the skills chain through artifacts**:
`/office-hours` writes a design doc `/plan-eng-review` reads, which writes a test plan `/qa` picks
up. That artifact chain is the mechanism, and it is FRACTAL's HANDOFF pattern arrived at
independently.

---

## Primitives it names

| Primitive | What it is | Nearest LoomWarp function |
|---|---|---|
| **Skill file** | One capability, one job, in markdown | `F5` Capability |
| **Harness** | The wiring between model and context | `F0` Substrate |
| **The library / brain** | The owned corpus that makes the agent yours | `F3` Context |
| **Brain × source** | A *brain* is a database instance (personal or team); a *source* is a git repo inside it | **`F3` — no equivalent** |
| **Resolver** | *"A resolver is an org chart. A task comes in and it decides which markdown file or who handles it"* | `F4` Control — this is `router.py` |
| **Skillify** | Turning completed work into a reusable procedure | `F8` Learning |

**`brain × source` is the most valuable primitive here.** It is the individual-versus-team memory
boundary expressed as two axes rather than one, and it lets the same corpus be shared, federated, or
thin-clientable without changing its shape. `F3 Context` has nothing equivalent.

---

## What it forces you to decide

1. **Which host.** The `--host` flag makes portability a setup-time question rather than a migration
   problem.
2. **Personal brain or team brain**, and which git sources belong to which.
3. **Whose repo holds the skills.** Tan frames this as the real stake, not a config option — skills
   in *your* repo travel with you; skills in the company repo *"execute your judgment indefinitely
   without you."*

---

## What it does well

**The equation.** The cleanest one-line statement of why the harness layer is a function at all:

> **frontier model** (rented, commoditized) **+ your context** (owned, unique) **+ a harness**
> (OpenClaw, Claude Code, …) = an agent acting as a fast version of you.

**Thin harness, fat skills.** Three layers — fat skills where *"90% of the value lives"*, a thin
~200-line harness, deterministic tooling underneath — with a decision rule that is directly usable:

> *"If it's a lookup table, it's code. If the agent needs to think, it's a skill."*
> *"Push intelligence UP into skills. Push execution DOWN into deterministic tooling."*

This is *deterministic control, probabilistic labor* stated more operationally than our own version.

**Naming the context-selection problem.** *"Your life is a library… The question that determines
whether your agent is a genius or a goldfish is this: who decides, or what decides, which three books
are open on the desk?"* That is `F3`'s Briefing, posed as a question rather than a feature.

**Naming curation as infrastructure.** *"A brain nobody curates is a garbage dump with great
search… Treat the brain like production infrastructure and it compounds."* He names provenance
tracking, contradiction checks and active pruning by a *librarian* — an independent naming of the
gap LoomWarp claims.

**Coexistence as a designed feature.** `--prefix` yields `/gstack-qa` instead of `/qa` to avoid
collisions with other skill packs. `/pair-agent` connects Claude Code, OpenClaw, Hermes, Codex and
Cursor to one shared browser with per-agent isolated tabs and scoped tokens.

---

## What it does not claim

Multi-repo estate governance · policy enforcement · context provenance · maturity diagnosis · a
standards tier. gstack encodes **process** opinion — the sequence — not the bar.

---

## Credibility check

| | |
|---|---|
| **License** | MIT (both) |
| **Stage** | gstack: widely adopted, actively developed. gbrain: MIT, described as production-ready |
| **Scale evidence** | Tan's personal library ~220,000 markdown pages; gbrain deployment 155,795 indexed pages, 24,589 people, 5,340 companies |
| **Measured quality** | gbrain reports P@5 of 49.1% on retrieval — a published number, which is unusual in this category and worth respecting |
| **Caveat** | The "400x output since 2013" figure is self-reported and not independently verifiable. Cited as a claim, not a fact |

---

## What to steal

| # | Pattern | For |
|---|---|---|
| 1 | **`brain × source`** as the individual/team memory boundary | `F3` — closes the largest gap in the vocabulary |
| 2 | **Thin harness, fat skills** decision rule | `standards/` — gives implementers a test our principle lacks |
| 3 | **The artifact chain** between skills | `F4` — a Control primitive distinct from a dependency graph |
| 4 | **`--prefix` coexistence** | `F5` Catalog — collision avoidance as a shipped feature, not a caveat |
| 5 | **"Skillify at the end of every task"** | `F8` — the cheapest possible capture loop |
| 6 | **The librarian role** | `F3`/`F8` — curation as a named owner, not an implied one |
| 7 | **Publishing a retrieval quality number** | `F7` — nobody else does; it is cheap credibility |

---

## Sources

- <https://github.com/garrytan/gstack> — MIT · accessed 2026-08-11
- <https://github.com/garrytan/gbrain> — MIT · accessed 2026-08-11
- [`THIN_HARNESS_FAT_SKILLS.md`](https://github.com/garrytan/gbrain/blob/master/docs/ethos/THIN_HARNESS_FAT_SKILLS.md) · accessed 2026-08-11
- [Own Your Intelligence — YC Root Access](https://www.ycrootaccess.com/p/garry-tan-own-your-intelligence) · accessed 2026-08-11
