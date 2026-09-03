---
title: "Teardown — the decision ledger, in three implementations"
tier: reference
project: loomwarp
created: "2026-08-27"
status: DRAFT
owner: KD
---

# The decision ledger — three implementations of one primitive

**What it is.** A store for change-managed decisions: the third destination in the routing doctrine,
where a fact goes when it is *"shared knowledge **and** change-managed with named ownership."*

**Why one document and not three.** There are three separate implementations in this estate. They share
a name and a philosophy and **zero code**. Reading them side by side is the entire content — they fail
in complementary directions, and no two of them have the same holes.

> Scored against [`../../../../specs/v0/09-context-layer.md`](../../../archive/v0/09-context-layer.md) §6.

| | **A · LoomWarp (vendored)** | **B · generic-cerebro DL v2** | **C · gstack decision store** |
|---|---|---|---|
| Path | `context/memory/decision-ledger/` | `generic-cerebro/tools/decision-ledger/` | `gstack/lib/gstack-decision.ts` |
| Size | **1,428 lines TS**, git-tracked | ~240 live entries across two stores | one module + two bins |

---

## Architecture

| Layer | A · LoomWarp vendored | B · cerebro DL v2 | C · gstack |
|---|---|---|---|
| **Canonical store** | Markdown + frontmatter in `store/` | Markdown in git, `projects/<p>/decision-log/<ID>.md` | **JSONL append-only event log**, `~/.gstack/projects/<slug>/decisions.jsonl` |
| **Index** | `.index.sqlite` | `.index.sqlite`, *"NEVER the source of truth"* — rebuildable | `decisions.active.json`, a **computed** snapshot |
| **Mutability** | Mutable files + append-only audit table | Mutable files + append-only audit table | **Immutable log; "active" is derived** |
| **Scope resolution** | **None. `DEFAULT_STORE_DIR` is hardcoded** | Store root per project directory | Slug dir, resolved by walking to the **outermost** repo root |
| **Individual / team** | **Neither — one store for everyone** | **Team**, with `_dev/<username>/` as the individual sibling | **Individual by default**, team by opt-in artifacts sync |
| **Entry types** | One — `decision`, `^ADR-\d{3}$` | Four — `D-NNNN` · `CD-NNN` · `BI-NNN` · `L#-NN` | Three *kinds* — `decide` · `supersede` · `redact` |
| **Statuses** | proposed · accepted · superseded · deprecated | open · in_discovery · answered · conflicted · pending_signoff · deferred | *(computed, not stored)* |
| **Identity** | RACI, `responsible` min 1 | RACI with cardinality bounds, over a `people.yaml` registry | **None** — a 3-value `source` enum: user \| skill \| agent |
| **Write gate** | Validator in-process | **Git pre-commit hook** + PHI lint + 5-min locks | Write-time validator only |
| **Injection defence** | **None** | **None** | **`datamark()` at the render boundary** |
| **Deletion** | — | Never; `superseded_by` + conflict sidecars | `supersede` archives · **`redact` expunges from every read path** |
| **Read path** | SQLite query | 3-tier ladder: SQLite → committed BM25 index → qmd MCP (disabled team-wide) | Bounded snapshot, `O(active)` |
| **Context injection** | — | `.claude/rules/*.md` with `paths:` globs, 8 rules | Session-start Context Recovery block |

---

## Primitives it names

| Primitive | What it is | Function it implements | Scope it serves |
|---|---|---|---|
| **entry** (A, B) | A change-managed decision with an owner and a status | `F3 write` — the governed tier | **team × project** (B); **none declared** (A) |
| **RACI** (A, B) | Responsible / accountable / consulted / informed | `F3 write` → `P-16` ownership | team |
| **event** (C) | `decide` \| `supersede` \| `redact`, appended | `F3 write` → `P-17` supersession | **individual × project** |
| **scope** (C) | `repo` \| `branch` \| `issue`, on the record | `F3 select` → `P-3` | record-level, not store-level |
| **promotion** (B) | The ceremony that moves a fact into the ledger | `F3 write` → `P-7` routing | team |

---

## What it forces you to decide

1. **Whether a decision has an owner.** A and B say yes and will not write without one. C says no and
   records a three-value provenance enum instead.
2. **Whether the store is mutable.** B mutates files and audits the mutation. C forbids mutation and
   computes state. Both are defensible; they are not compatible.
3. **Who can take a lock away.** B makes force-unlock a first-class, audited user option.
4. **What deletion means.** C is the only one that distinguishes *superseded* (archived, still readable)
   from *redacted* (expunged from every read path).

---

## What it does well — and the three findings this document exists to make

### 1 · LoomWarp's ledger is one parameter from being scope-aware

**`storage/config.ts`:**

```ts
export const DEFAULT_STORE_DIR = path.resolve(__dirname, "../store");
```

One store, one path, for every project and every person. **`F3`'s scope model has no purchase on it at
all** — it serves no cell in the 2×2 because it has no concept of a cell.

**And `StorageOptions.storeDir` already exists and is unused.** The seam is cut. 1,428 lines of working,
schema-validated, atomically-written, optimistically-locked, audit-logged TypeScript are **one parameter
away**. That is `GAP-24`, **P0 / XS**, and it is the cheapest P0 in the corpus.

**The related finding is about the grade, not the code.** `F3 Context` is self-assessed at stage **2**
with the evidence *"83 lines of markdown across org + domain."* That evidence does not mention 1,428
lines of working code, because the grade was written against the Fabric and the ledger sits under
`context/memory/`. **The `○` marks in the component matrix's context rows are right for the wrong
reason** — and a grade that is right for the wrong reason is worse than a wrong one, because closing it
*looks* like a build when it is a config change.

### 2 · cerebro's write gate is narrower than its own schema

The only unbypassable enforcement in any of the three is B's **git pre-commit hook**, which exists
precisely because two write paths share one lock table.

**Its filename regex accepts `D-\d{1,3}`. The schema accepts `^D-[0-9]{1,4}[a-z]?$`** — widened
2026-06-04 for headroom. So `D-1234.md` is **schema-valid and silently skipped by the lock gate.** Same
drift on `CD` and `BI`.

> **A validator and its enforcement point disagreeing is this corpus's own *policy theater* failure**
> (`FM-2`: *"controls that exist as configuration and are bypassed in execution"*) — occurring in the one
> system that scores `●` on enforcement.

It is also the same shape as a defect found in our own tooling on the same day:
`check-element-vocabulary.mjs` exempted the very file it parsed its vocabulary from, which is how the
predecessor came to name `E0` two different things with all checks green
([`../../../../specs/archive/00-README.md`](../../../archive/00-README.md) §4.2). **Two
independent instances of *the checker and the checked have drifted apart*, found in one day, in two
codebases.** That is a class, not a coincidence.

Three smaller holes in B, all worth citing: *"never write `.md` files directly"* is **prose in a
`SKILL.md`, not a gate**; `superseded_by` and `cross_refs` have **no referential-integrity check** (`P-18`
is unimplemented by everyone); and **force-unlock is a first-class user option**, audited only by a
commit-message convention.

### 3 · gstack solved the problem from the opposite end, and has no governance at all

C is the only implementation that treats its own stored content as hostile.

**`datamark()` runs at the render boundary**, not at write: it strips C0/C1 controls and
U+0085/2028/2029, collapses ` ``` ` fences, neutralises `---` banner sentinels, and inserts zero-width
spaces into `<|`, `|>`, `<system>`-style tags and `Human:`/`Assistant:`/`System:`/`User:` turn prefixes.
Its stated reasoning: *"Write-time `hasInjection` is a denylist; this is the render-boundary defense-in-depth
that also covers `--all`/snapshot reads and records written before a pattern existed."*

**Write-time validation fails closed** on injection patterns, HIGH-tier secrets, and **MEDIUM-tier PII —
with the deviation from house policy reasoned in the code**:

> *"The taxonomy says 'confirm via AskUserQuestion', but this store is NON-INTERACTIVE and syncs
> cross-machine, so there is no confirm path — fail closed rather than silently persist + sync a secret
> that later resurfaces into agent context."*

`filterByScope()` returns `false` for an unknown scope — *"fail conservative, don't leak into every
context."* That is `P-3`, implemented.

**And it has no owner, no RACI, no identity, and no gate.** Capture is a `CLAUDE.md` norm. Nothing
prevents an agent appending to the JSONL directly, and nothing requires it to record anything.

---

## What they do not claim

**A:** scope · provenance on a record · freshness · injection defence · a gate outside the process.
**B:** injection defence · referential integrity · freshness · trust tiers.
**C:** ownership · governance · promotion · any enforcement of the *practice* rather than the store.

---

## Credibility check

| | |
|---|---|
| **Code read** | All three, locally, 2026-08-27 |
| **A — scale** | 1,428 lines TS · 5 ADRs · git-tracked · **zero tests found** |
| **B — scale** | 240 entries in one store, 5 in another · schema is config-driven (*"add an entry to this list. Do not change the validate CLI"*) |
| **C — scale** | Per-machine; volume unknown |
| **Caveat** | A is a genericized vendor of B's schema/storage layers, so their similarities are inheritance, not convergence. **B and C are genuinely independent**, which is what makes their complementarity interesting |

---

## What to steal

| # | Pattern | For |
|---|---|---|
| 1 | **`datamark()` at the render boundary** — stored context is data, never instructions | **`P-23`.** The highest-value single steal in this folder. A shared context layer without it is a prompt-injection channel with an audit trail |
| 2 | **Append-only log with computed active state** | `P-17`. Makes *"what do we believe now"* a query and *"what did we believe in March"* answerable |
| 3 | **`redact` ≠ `supersede`** — expunge from every read path vs archive | `P-21` |
| 4 | **Fail closed on secrets, with the deviation reasoned in code** | `P-24`. The comment is the artifact — it survives the next maintainer |
| 5 | **`filterByScope()` fails conservative on unknown scope** | `P-3` |
| 6 | **The 3-tier read ladder** with published latencies (BM25 0.7s · vector 167s · full rerank 273s) | `F3 select`. Committing the BM25 index so a fresh clone gets team-grade retrieval is the transferable half |
| 7 | **RACI over a people registry** | `P-16`, from B |
| 8 | **`storeDir` as a constructor parameter** | `GAP-24`. Already written; use it |

---

## Sources

- `context/memory/decision-ledger/` — `schema/schema.yaml` v2.0, `storage/config.ts`,
  `storage/index.ts`, `storage/locks.ts`, `storage/audit.ts`, `schema/validate.ts` · read 2026-08-27
- `generic-cerebro/tools/decision-ledger/` — `schema/schema.yaml`, `storage/store.py`,
  `storage/sqlite_index.py`, `storage/write_adapter.py`, `safety/pre_commit_hook.py`,
  `safety/conflict_resolver.py`, `bm25-index/README.md`, `.claude/rules/memory-vs-wiki.md` · read 2026-08-27
- `gstack/lib/gstack-decision.ts`, `lib/gstack-decision-semantic.ts`, `bin/gstack-decision-log`,
  `bin/gstack-decision-search`, `context-restore/SKILL.md`, `CLAUDE.md` · read 2026-08-27
- Prior teardown: [`../kd-built-frameworks/04-decision-ledger.md`](../kd-built-frameworks/04-decision-ledger.md)
