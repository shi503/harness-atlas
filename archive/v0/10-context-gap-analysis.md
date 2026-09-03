---
title: "Context layer — gap analysis"
tier: spec
project: loomwarp
created: "2026-08-27"
status: ARCHIVED
owner: KD
---

# Context layer — gap analysis

**Scope.** `F3 Context`, graded against the provider contract at
[`09-context-layer.md`](./09-context-layer.md) §6 and against the five providers torn down at
[`context-providers/`](../../comparisons/systems/context-providers).

**Predecessor.** [`../v1/01-gap-analysis.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/specs/v1/01-gap-analysis.md) — `GAP-01`…`GAP-23`, 9 at P0.

> **ID note.** `GAP` IDs are one global sequence. `GAP-01`…`GAP-23` are keyed to the **superseded
> seven-element** scheme; `GAP-24`+ are keyed to `F0`–`F11`. Nothing is renumbered.
> Claims continue at `C-15`.

> **Placement note.** This lives in `specs/v0/`, not `specs/v1/`, because
> `scripts/check-element-vocabulary.mjs` exempts the whole `specs/v1/` path with the reason *"predates
> v0"*. A new document there would silently inherit an exemption written for legacy files.

---

## Executive finding

**The `○` marks in the component matrix's five context rows are correct for the wrong reason, and that
is more dangerous than being wrong.**

They read as *"LoomWarp has not built individual/team memory."* What is actually true:

> **`context/memory/decision-ledger/` is 1,428 lines of git-tracked TypeScript** — a config-driven schema
> validator, atomic writes, optimistic locking with 5-minute TTL, an append-only audit table, a SQLite
> index, and a CLI. It works. **And it has no concept of scope at all**: `storage/config.ts` hardcodes
> `DEFAULT_STORE_DIR = path.resolve(__dirname, "../store")`. One store, one path, everyone, every
> project.

**`StorageOptions.storeDir` already exists in the same file and is unused.** The seam is cut and nobody
has used it.

**Why the distinction matters for planning.** A gap that reads as *"unbuilt"* gets sized as a build. This
one is a **parameter** — `GAP-24`, P0/XS. Meanwhile the thing that genuinely is unbuilt, the per-run
manifest, gets sized as a build and turns out to be an **integration**, because `InstructionsLoaded`
already fires. **Both estimates were wrong in opposite directions, and both were wrong because the grade
described the Fabric and the code sits under `context/memory/`.**

- **Gaps:** 11 new, **4 at P0**
- **The governing verb:** `write` — and it scores **0**
- **Blocking dependency:** none. All four P0s are independently actionable

---

## The matrix — 4 verbs × 4 lenses

Graded per **verb**, not per function, exercising `C-11`'s ruling — *"grade at the system level, roll up
as the minimum."* This is the first time that ruling has been applied.

| Verb | **L1 External**<br>*vs. the five providers* | **L2 Internal parity**<br>*vs. generic-cerebro's running layer* | **L3 Design conformance**<br>*vs. `09` §6 and §7* | **L4 Second-person readiness**<br>*can a stranger plug a provider in* |
|---|---|---|---|---|
| **write** | Three peers declare scope cells; ours declares none. gbrain has two clean axes, QM three values, cerebro two directories. **`GAP-24`** | 240 live decision entries with RACI, a promotion ceremony, and a routing doctrine. We have 5 ADRs and no routing rule. **`GAP-33`** | `P-1`…`P-5`, `P-7` unmet. No provenance field, no actor identity. **`GAP-29` `GAP-30`** | A stranger cannot say which store a fact belongs in. **0** |
| **select** | Nobody has `P-15`; we do not have `P-6` either. gbrain returns typed results, OKF a portable bundle | cerebro's 3-tier ladder with a **committed** BM25 index — a fresh clone gets team-grade retrieval. We have none | The Briefing is `‡` throughout. §7 names the emission point and nothing subscribes. **`GAP-27`** | Nothing to plug into: no interface exists. **`GAP-25`** |
| **compress** | Native, and improving faster than anyone could match | n/a — not attempted in either | `P-8` unmet, correctly deferred | Native handles it. **Least differentiated, and that is fine** |
| **isolate** | Native path-scoped rules are the best answer here; Indigo's overlay is second | cerebro builds its entire injection strategy on `paths:` globs, 8 rules. We have zero | `P-9` partial via native. **`P-25` — access control — unmet by every provider examined. `GAP-26`** | Blast radius is unbounded and unstated. **`GAP-28`** |

**Roll-up: the minimum governs, and the minimum is `write` at 0.**

Not 2. The predecessor's `F3` self-grade of **2** was assessed against the Fabric alone — and the
archived model already conceded the point in its own §5: *"`F3` graded '2' was hiding a zero."* This
matrix is that sentence, evidenced.

---

## Claims register

| # | Claim | Reality | Verdict |
|---|---|---|---|
| **C-15** | `F3 Context` is at stage **2** | Graded per verb, `write` is **0**: no scope, no routing, no provenance field. The archived `02-elements.md` §5 already said *"`F3` graded '2' was hiding a zero"* — this makes it evidenced rather than asserted | **OVERSTATED** |
| **C-16** | *"Nobody in the landscape has provenance. This is the whitespace. Opportunity, not gap"* — [`../v1/01-gap-analysis.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/specs/v1/01-gap-analysis.md), `F3` row | **Google's OKF v0.2** specifies `sources[]`, `generated`, `verified[]` → trust tiers, `stale_after`, `status`, and an Attested Computation type with `executor: {resource, receipt}`. The territory is named, attested (`context layer` = 13 in the corpus, against `provenance` = 9) and schema'd | **FALSE as written.** Narrows to: OKF specifies **per-document** provenance; the Briefing is **per-run** resolution. Different objects — see [`context-providers/02`](../../comparisons/systems/context-providers/02-okf-and-wiki-langgraph.md) §6, with a dated falsifier |
| **C-17** | LoomWarp has no context/memory implementation *(implied by five `○` rows)* | 1,428 lines of working, git-tracked, schema-validated, lock-guarded TypeScript, running, with 5 ADRs in its store. **Never graded, never mentioned in any function body or matrix row** | **FALSE** |
| **C-18** | The individual/team boundary is a routing and ownership question | It is **also an access-control question**, and that framing has a breach as its failure mode. [`03-jtbd.md`](../../comparisons/03-jtbd.md) §4 asked *"Is permission-aware context one job or two?"*, called it whitespace, and left it unassigned for four months | **INCOMPLETE** |
| **C-19** | *"Adapters are a property of `F0`; you do not write an adapter for the thing you are"* | True for the harness. **`F3`'s Fabric provider is explicitly `native`** — we resolve against a context layer, we do not implement one. There is no `Context adapter` row anywhere in the corpus | **TRUE, but does not transfer to `F3`.** See `09` §8 |

---

## Gap inventory

Priority: **P0** blocks the `F3` claim · **P1** required for a credible provider story · **P2** later.
Effort: **XS** <1h · **S** <½d · **M** 1–2d · **L** 3–5d · **XL** >1w.

| ID | Verb | Gap | P | Effort | Blocks |
|---|---|---|:--:|:--:|---|
| **GAP-24** | write | **The vendored ledger has no scope resolution.** `DEFAULT_STORE_DIR` hardcoded; `StorageOptions.storeDir` exists and is unused | **P0** | **XS** | `P-1`…`P-5`; the whole 2×2 |
| **GAP-25** | select | **No context adapter or provider interface exists** — `F3`'s provider is asserted `native` with nothing pluggable behind it. No `Context adapter` row in the matrix | **P0** | M | the pluggability claim |
| **GAP-26** | isolate | **No access control over context.** `P-25` unmet by every provider examined; RBAC-over-context has no owner | **P0** | L | `AC-1`…`AC-4`; any external adopter |
| **GAP-27** | select | **No per-run manifest, though `InstructionsLoaded` already fires.** `P-6`, `P-15` | **P0** | M | the differentiation claim; the `F7` join |
| **GAP-28** | isolate | **No render-boundary datamarking.** Stored context is fed to models as instructions. `P-23` | P1 | S | any shared store |
| **GAP-29** | write | No freshness field on any context artifact. `P-13` | P1 | S | staleness detection |
| **GAP-30** | write | No trust tier; no actor identity distinguishing human/agent/process. `P-11`, `P-12` | P1 | S | `P-15`'s usefulness |
| **GAP-31** | write | **No referential integrity on supersession pointers** — unimplemented by every provider examined. `P-18` | P1 | XS | ledger correctness |
| **GAP-32** | write | No closed type root; the ledger has one `entry_type` and no primitive/subtype split. `P-19` | P2 | M | vocabulary sprawl at scale |
| **GAP-33** | write | **The routing doctrine is not adopted**, though the corpus flags it *"the piece to take verbatim"* and it has sat unclaimed since 2026-08-11. `P-7` | **P1** | **XS** | `write`'s correctness |
| **GAP-34** | — | The census omitted the category name (`context layer` = 13 uncounted against `provenance` = 9 counted) | P2 | XS | **Closed 2026-08-27** — [`01-worldsfair-2026-vocabulary.md`](../../comparisons/2026-08-research/01-worldsfair-2026-vocabulary.md) §2.4 |

**Two XS P0/P1s carry disproportionate value.** `GAP-24` is one constructor parameter and unlocks the
entire scope model. `GAP-33` is adopting three rows of somebody else's table. **Neither is a build.**

---

## 5. The fit

Which cell of the 2×2 each provider serves, and what LoomWarp brings that none of them do.

| Provider | Serves | Does not serve | Verdict |
|---|---|---|---|
| **gbrain** | all four cells, via `brain × source` | policy, per-run resolution, injection defence | **Complement.** Take the type discipline and the scope model |
| **OKF + wiki-langgraph** | any cell; **declares no scope model** | scope, access control, per-run resolution | **Complement.** Adopt the frontmatter; do not invent a rival schema |
| **decision-ledger (ours)** | **no cell — it has no concept of one** | everything scope-dependent | **Keep and fix.** `GAP-24` |
| **cerebro DL v2** | team × project, with `_dev/<user>/` as the individual sibling | injection defence, freshness, referential integrity | **Complement.** Take RACI, promotion, the routing doctrine, the committed BM25 index |
| **gstack decision store** | individual × project, team by opt-in sync | ownership, governance, promotion | **Complement.** Take `datamark()`, redact-vs-supersede, fail-closed |
| **beads / Gas City** | n/a — not a context provider | all of `F3` | **Negative control**, and the strongest evidence that the transfer is unattempted rather than hard |
| **native** | individual × org (auto-memory); project files | team memory as distinct; provenance | **The recommended default for the Fabric.** And it emits the event `GAP-27` needs |

**The honest read: three of these are complements, not competitors.** The roadmap that follows is
*"adopt OKF's frontmatter, borrow gbrain's type discipline and scope model, keep the ledger and give it
a `storeDir`, and build only the per-run manifest"* — **not** *"choose a winner."*

**What LoomWarp brings that none of them do:** the join from a resolved context set to a specific run's
**outcome**. Every provider here can tell you what a document says and where it came from. **None can
tell you what an agent saw before it did the thing that failed.**

---

## The orphaned research

**The meta-finding, and it belongs in this document rather than a footnote: the research corpus measured
the differentiator and never counted the category.**

`context layer` occurs **13** times in the committed World's Fair corpus. `provenance` occurs **9**, and
the census marked it *"Scarce."* Both were present on 2026-08-25; only one was counted. Nine sibling
terms went uncounted with it, including **`team context` = 0** — the field has no word for the half of
the boundary that
[`01-concepts.md`](../../comparisons/01-concepts.md) §3.6 calls *"the largest single gap this
analysis found."*

**The cause was structural.** The census tested terms the corpus already used, so it could confirm or
refute existing vocabulary and **could not discover any.** Two talks that reframe this function —
Sankar's context-layer architecture and Gopal's breach argument — sat in the committed data, unread,
for two days while a spec was written without them.

Closed by [`01-worldsfair-2026-vocabulary.md`](../../comparisons/2026-08-research/01-worldsfair-2026-vocabulary.md)
§2.4, with the method fix stated: **a census needs a discovery pass over the corpus's own n-grams, not
only a confirmation pass over the author's term list.**

---

## What this analysis does not cover

- **Retrieval quality.** No P@k measurement of anything, ours or theirs. gbrain publishes P@5 = 49.1%;
  we have no number and did not invent one.
- **Codex, Cursor and Amp memory** — not researched, marked `TBD` rather than inferred.
- **Any beads implementation** — none exists locally; that teardown is a documented negative result.
- **Federation and sync transport** — how a team cell reaches a second machine.
- **The librarian** — who curates the knowledge base is `F8 Learning`.
- **The other eleven functions.** They carry provider *names*, not contracts. **Do not describe them as
  pluggable until each has a §6.**

---

*Contract: [`09-context-layer.md`](./09-context-layer.md) · Providers:
[`context-providers/`](../../comparisons/systems/context-providers) · Model:
[`02-functions.md`](./02-functions.md) · Predecessor: [`../v1/01-gap-analysis.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/specs/v1/01-gap-analysis.md)*
