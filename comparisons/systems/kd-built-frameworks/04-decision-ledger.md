---
title: "The decision ledger — schema, guards, write path"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# The decision ledger

**What it is.** A schema-validated, RACI-attributed, hash-verified decision store where markdown files are canonical and SQLite is a derived index. 242 entries across two stores. Python 3 standard library only, by explicit constraint, with 78 tests.

**Why this document exists.** LoomWarp already runs this system's storage layer — `context/memory/decision-ledger/` was adapted from the same precursor, per its own `ADR-002`, with the schema genericized from a tenant taxonomy into a plain ADR shape. What did **not** come across is the governance built on top of it: the single write path, the ownership guard, and the discipline that keeps prose from becoming decisions. That layer is the value here.

---

## 1. The load-bearing invariant

> **Markdown is canonical. SQLite is a derived index.**

Everything else follows. The index can be deleted and rebuilt losslessly. A consistency check compares every indexed row against its file by SHA-256 and reports both directions of drift — indexed-but-missing and on-disk-but-unindexed. The clean result is a single explicit line naming the failure mode it guards.

The alternative — a database of record with markdown exports — was available and rejected. The reason is durability of the artifact: a markdown store survives the tool that wrote it, and a decision log whose readability depends on a running service is not a decision log.

→ [`adr-seeds/ADR-016`](../../../archive/adr-seeds/ADR-016.md)

## 2. Entry types are configuration, not code

Four entry types — discovery item, critical decision, big idea, layer item — each with an ID pattern, required fields, and optional fields. All four are declared **entirely in `schema.yaml`**. Adding a fifth is a YAML edit; no code changes and no redeploy.

The system names this as a deliberate guard against a specific failure: a taxonomy compiled into a validator ossifies, and the pressure to avoid touching code produces entries shoehorned into the wrong type. LoomWarp's own schema comment records inheriting exactly this property — *"entry types are configured here, not compiled into validate.ts"* — and it is why genericizing the taxonomy cost a YAML edit rather than a rewrite.

Required on every type: id, type, title, owner, status, RACI, created, updated, created_by, updated_by. Six statuses, each with a mapping from the legacy notation it replaced.

## 3. RACI is required, and `responsible` has a floor

The RACI sub-schema is not optional decoration:

| Field | Required | Min | Max |
|---|:--:|:--:|:--:|
| `responsible` | **yes** | **1** | 5 |
| `accountable` | no | 0 | 3 |
| `consulted` | no | 0 | 10 |
| `informed` | no | 0 | 20 |

All initials must resolve against a people registry. The minimum-one on `responsible` is annotated in the schema as a **guard against unowned decisions**, and it is worth pausing on: it is the only rule in the entire system that a machine actually enforces. Everything in [`01-the-composition-contract.md`](./01-the-composition-contract.md) is prose an agent may ignore. This one is a validator that fails.

That asymmetry is the argument for the whole enforcement half of [`ENRICHMENT-PLAN.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/kd-built-frameworks/ENRICHMENT-PLAN.md). The one guard they built is the one guard that never degraded.

→ [`adr-seeds/ADR-017`](../../../archive/adr-seeds/ADR-017.md)

## 4. One sanctioned write path

Entries are written through a promotion skill or the store CLI. **Direct file writes into a decision-log directory are a named failure mode** — the system's Tier-0 constraint table records tier-bypass as `FM-12`, defined as writing directly into a decision log *or treating wiki prose as decisions*.

The second clause matters more than the first. A knowledge base accumulates statements that read like decisions — a synthesis page saying "we use X" — and without a bright line, agents cite prose as though it were ratified. The line here is mechanical in shape if not in enforcement: a decision has an ID, an owner, a RACI block and an audit trail, or it is not a decision. The promotion skill is the ceremony that converts one into the other, and it exists precisely so the conversion is visible.

Supporting machinery: a lock table with a five-minute TTL, an insert-only audit log recording actor, operation, before-hash and after-hash, a git pre-commit hook that gates both write paths against the lock table, and a conflict resolver that preserves both versions and flips the entry to a conflicted status rather than picking a winner.

→ [`adr-seeds/ADR-018`](../../../archive/adr-seeds/ADR-018.md)

## 5. Where this lands on the matrix

[`../../02-component-matrix.md`](../../02-component-matrix.md) has one row that is otherwise all zeros with a single `◐`: **provenance → outcome join**. The `◐` belongs to a competitor whose ledger captures sessions automatically and whose knowledge units prime them — holding both ends — but with no evidenced content hashing, version pinning, owner attribution, or reconstructable per-run manifest.

This ledger is the mirror image. It has everything that competitor lacks on the attribution side: hashes, an owner, a RACI block, an insert-only audit trail with before/after hashes, and a validator. What it does not have is the join. **No decision entry references the work that implemented it, and no work artifact references the decision it acted on** other than by a human-written cross-reference that nothing checks.

So the honest matrix reading is a second `◐` in that row, with the boundary stated: *decision half only, strong attribution, no outcome join.* The row does not become a `●` for anyone, and the corpus's headline claim in [`../../00-README.md`](../../00-README.md) §F-4 — that context provenance joined to outcome is still unclaimed by everyone — survives intact.

**The interesting consequence for LoomWarp:** it already holds this ledger and it already holds structured run events. Nobody in the corpus holds both. The join is a smaller piece of work here than the claim implies, and it is the only place where a differentiating capability is one integration away rather than one build away.

## 6. The importer, and why it matters more than it looks

A migration path existed from the legacy format: a single hand-maintained log document containing per-layer tables, parsed into 235 individual entries. It auto-detects two different legacy table shapes by inspecting column headers, never modifies the source, is idempotent, and emits an explicit flag block for fields it could not map rather than dropping or guessing them.

That last behaviour is the transferable one. **Unmappable data becomes a visible defect in the output, not a silent omission.** A migration that quietly drops what it does not understand produces a store nobody trusts, and there is no way to audit for what was never written.

Gate procedure: a five-entry sample run with verbose output before the full import, then verification, then a content-fidelity check. Zero warnings on the full run.

## 7. What to take

| Take | Why |
|---|---|
| Markdown canonical / index derived | Already inherited; state it as an ADR so it survives the next storage decision |
| RACI required with a `responsible` floor | The only mechanically enforced rule in the source system, and it held |
| Single sanctioned write path + the wiki-prose-is-not-a-decision clause | The governance layer that did **not** come across with the storage layer |
| Lock table, insert-only audit, conflict-preserving resolver | Already present in the inherited code; document what it is for |
| The `[FLAG:]` migration convention | Cheap, and the difference between a trustworthy import and an unauditable one |
| **The outcome join** | Not present in the source. Build it — §5 |

> KD Note: there's a lot of 'ingestion' and meeting summary skills that also interact with the decision ledger and when we decide to 'promote' things that are said in transcripts. 
> This also helps to better "catch" mis-transcribed errors (or unintended decisions from mis-spoken citations or decisions that are incorrectly made) so that PMs and triage 
---

*Companion: [`05-context-and-the-librarian.md`](./05-context-and-the-librarian.md) — the tier that feeds this store · [`08-appendix-schemas.md`](./08-appendix-schemas.md) §3 — the entry schema · [`../../02-component-matrix.md`](../../02-component-matrix.md) — the row this changes*
