---
title: "ADR seeds — staged, not filed"
tier: reference
project: harness-atlas
created: "2026-08-11"
status: ARCHIVED
owner: KD
provenance: AUTHORED
---

# ADR seeds

**What these are.** 22 decision records extracted from [`../01-the-composition-contract.md`](../../comparisons/systems/kd-built-frameworks/01-the-composition-contract.md) through [`../07-transfer-manifest.md`](../../comparisons/systems/kd-built-frameworks/07-transfer-manifest.md), written in the exact format the memory layer's schema requires, ready to file.

**They are staged, not filed.** The live store at `context/memory/decision-ledger/store/` holds `ADR-001`…`ADR-005`. These carry `status: proposed` and IDs `ADR-006`…`ADR-027`. Filing them would burn IDs and imply an acceptance that has not been given — and the store's own doctrine says entries are written through the CLI, never hand-placed.

**What decides.** [`../ENRICHMENT-PLAN.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/kd-built-frameworks/ENRICHMENT-PLAN.md). Each proposal there names the ADRs it would accept; a `Go` files them, a `No-Go` leaves them here as a record of what was considered and declined.

**ID collision warning.** If anything else files an ADR before these are decided, renumber from the next free ID. The store enforces uniqueness; it does not renumber for you.

---

## Filing

```bash
cd context/memory/decision-ledger
npx tsx schema/validate.ts <path-to>/adr-seeds
# → 22 passed, 1 failed — the single failure is this README, which is not an entry.
#   validate.ts scans every .md in the directory it is given.

# then, per accepted seed — set status: accepted first
cp <path-to>/adr-seeds/ADR-0NN.md store/ADR-0NN.md
```

**Verified 2026-08-11:** all 22 seeds pass the live validator unmodified — required fields, ID pattern, status enum, layer enum, and the `responsible` floor.

---

## The set

### architecture — 6

| ID | Title | From |
|---|---|---|
| [006](./ADR-006.md) | Tier-0 intent lives in a document with declared cache discipline and a precedence rule | [`01`](../../comparisons/systems/kd-built-frameworks/01-the-composition-contract.md) C-1 |
| [015](./ADR-015.md) | Context routes by path glob as well as by directory | [`01`](../../comparisons/systems/kd-built-frameworks/01-the-composition-contract.md) §9 |
| [016](./ADR-016.md) | Markdown is canonical; the index is derived | [`04`](../../comparisons/systems/kd-built-frameworks/04-decision-ledger.md) §1 |
| [020](./ADR-020.md) | The retrieval floor is whatever every machine can run, and its cost is published | [`05`](../../comparisons/systems/kd-built-frameworks/05-context-and-the-librarian.md) §4 |
| [026](./ADR-026.md) | **Decisions and work outcomes are joined** | [`04`](../../comparisons/systems/kd-built-frameworks/04-decision-ledger.md) §5 |
| [027](./ADR-027.md) | **The hand-rolled workstream resolver is retired onto native orchestration** | [`03`](../../comparisons/systems/kd-built-frameworks/03-fractal-as-iterated.md) §3 |

### process — 8

| ID | Title | From |
|---|---|---|
| [007](./ADR-007.md) | The orchestrating agent spends no context on implementation detail | [`01`](../../comparisons/systems/kd-built-frameworks/01-the-composition-contract.md) C-2 |
| [008](./ADR-008.md) | A workstream PRD must be executable by an agent with no prior context | [`01`](../../comparisons/systems/kd-built-frameworks/01-the-composition-contract.md) C-3 |
| [009](./ADR-009.md) | The read/write file manifest is the dispatch boundary | [`01`](../../comparisons/systems/kd-built-frameworks/01-the-composition-contract.md) C-3 |
| [010](./ADR-010.md) | Dependency edges are the deliverable, and they are declared in a reviewable artifact | [`01`](../../comparisons/systems/kd-built-frameworks/01-the-composition-contract.md) C-4 |
| [011](./ADR-011.md) | Evaluation is layered, and only the deterministic and judgment layers block | [`01`](../../comparisons/systems/kd-built-frameworks/01-the-composition-contract.md) C-5 |
| [012](./ADR-012.md) | Evaluation retries are bounded at two, and escalation carries a recommendation | [`01`](../../comparisons/systems/kd-built-frameworks/01-the-composition-contract.md) C-6 |
| [013](./ADR-013.md) | The handoff is an evidence artifact, and absences are asserted rather than omitted | [`01`](../../comparisons/systems/kd-built-frameworks/01-the-composition-contract.md) C-7 |
| [014](./ADR-014.md) | Heartbeat checking must require no model | [`01`](../../comparisons/systems/kd-built-frameworks/01-the-composition-contract.md) C-8 |

### governance — 6

| ID | Title | From |
|---|---|---|
| [017](./ADR-017.md) | Every decision entry requires a responsible owner | [`04`](../../comparisons/systems/kd-built-frameworks/04-decision-ledger.md) §3 |
| [018](./ADR-018.md) | The decision store has exactly one write path, and prose is not a decision | [`04`](../../comparisons/systems/kd-built-frameworks/04-decision-ledger.md) §4 |
| [019](./ADR-019.md) | Stewardship is a property of content, expressed as a tier with its own concurrency model | [`05`](../../comparisons/systems/kd-built-frameworks/05-context-and-the-librarian.md) §1 |
| [021](./ADR-021.md) | Where a fact lives is decided by one question | [`05`](../../comparisons/systems/kd-built-frameworks/05-context-and-the-librarian.md) §5 |
| [023](./ADR-023.md) | Standards have a compounding tier, and hardened findings promote into canon | [`06`](../../comparisons/systems/kd-built-frameworks/06-capability-and-standards.md) §3 |
| [025](./ADR-025.md) | **Every authoring contract ships with the hook that makes it binding** | [`01`](../../comparisons/systems/kd-built-frameworks/01-the-composition-contract.md) §"What the contract does not solve" |

### tooling — 2

| ID | Title | From |
|---|---|---|
| [022](./ADR-022.md) | A skill's description is its entire trigger, and side-effecting skills do not self-fire | [`06`](../../comparisons/systems/kd-built-frameworks/06-capability-and-standards.md) §1 |
| [024](./ADR-024.md) | A distributed capability never hard-depends on the hub's filesystem | [`06`](../../comparisons/systems/kd-built-frameworks/06-capability-and-standards.md) §4 |

---

## The three that are not prior art

Most of this set records something the predecessor did. Three record something **neither** system has done, and they are the ones that change the grade:

- **[ADR-025](./ADR-025.md)** — enforcement. Without it, every other seed lands as prose and reproduces the predecessor's exact ceiling. It is the only decision here that moves the minimum function stage, and therefore the only one that moves the real grade.
- **[ADR-026](./ADR-026.md)** — the decision-to-outcome join. The corpus's stated unclaimed ground, and this repository is the only system holding both halves already.
- **[ADR-027](./ADR-027.md)** — retiring the resolver. Not a transfer; a deletion, justified by a defect found twice independently.

Filing 006–024 without 025 produces a better-documented version of a system that was held together by one person's discipline.

---

*Companion: [`../ENRICHMENT-PLAN.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/kd-built-frameworks/ENRICHMENT-PLAN.md) — what decides these · [`../07-transfer-manifest.md`](../../comparisons/systems/kd-built-frameworks/07-transfer-manifest.md) — the underlying verdicts*
