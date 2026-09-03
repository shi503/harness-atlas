---
title: "Context and the librarian — the stewardship answer"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# Context and the librarian

**What this settles.** [`../../00-README.md`](../../00-README.md) §F-2b asks whether `generic-cerebro` has a librarian, how it is processed and managed, and speculates that at a low level it would be *"automations that run cleanup and promote to decision log."*

**Answer: yes, and the speculation is right about the shape and generous about the state.** The librarian is not an agent. It is a **tier** — declared in frontmatter, backed by its own concurrency model, with a defined pipeline and a set of skills that are its hands. The cleanup-and-promote automation exists, runs nightly, and its filename ends in `.LOCAL-ONLY.sh`, which is the most honest statement in the system about how far the ritual automation got.

---

## 1. The librarian is a tier, not a role

Every page in the knowledge base carries `tier: librarian` in frontmatter. The tier is one half of a two-tier operating model that shares a single git-tracked markdown corpus:

| Tier | Root | Who writes | Concurrency model |
|---|---|---|---|
| **Wiki (librarian)** | the knowledge base | anyone; the model files and cross-links | **Optimistic** — git merge, pull before edit |
| **Project ledger (PM)** | per-project decision logs | responsible/accountable owners only | **Pessimistic** — locks plus conflict audit |

That table is the whole design. **Two different concurrency models over one corpus, selected by editorial tier rather than by directory or by tool.** Low-friction capture is optimistic because the cost of a merge conflict in a capture note is trivial. Change-managed decisions are pessimistic because the cost of two people silently overwriting a ratified decision is not.

This is a genuine primitive and the corpus has a row waiting for it. [`../../01-concepts.md`](../../01-concepts.md) §4's **Stewardship** row is populated for only two systems — one names its product after the role, one has a librarian — while a third *"bets that manual curation is the failure mode"* and automates it away. `generic-cerebro` is the fourth answer, and it is the only one that makes stewardship a property of the *content* rather than of a person or a bot.

→ [`adr-seeds/ADR-019`](./adr-seeds/ADR-019.md)

## 2. The pipeline

```
_INBOX/                capture — mechanical, no interpretation, provenance stamped
   │
   ▼  wiki-ingest / transcript-ingest
raw/                   normalized source of record, never edited after landing
   │
   ▼
sources/               one summary per source, linked back to its raw file
   │
   ▼
synthesis/             cross-source distillation — the highest-value output
   │
   ▼  promote-to-ledger
decision-log/          schema-valid, RACI-attributed, locked
```

Four properties are worth naming:

**Capture is deliberately dumb.** The capture skill is specified as *mechanical capture with provenance, no interpretation.* Separating "get it into the system" from "decide what it means" is what makes capture cheap enough to actually happen. Interpretation is a later, different step with a different skill.

**Raw is immutable.** Summaries link back to the raw file; the raw file is not edited to match the summary. Provenance survives.

**Synthesis is the product.** The synthesis directory holds eight documents and its own README declares it the highest-value librarian output: cross-repo analyses and dot-connecting, not restatement. Every page carries a `sources:` list in frontmatter — provenance at the document level, hand-maintained.

**Promotion is a ceremony, not a copy.** Nothing graduates from prose to decision without going through the promotion skill, which is what makes [`04-decision-ledger.md`](./04-decision-ledger.md) §4's bright line hold.

Alongside the pipeline sits an **entity graph** — one page per person, concept, system or topic, with a naming convention and a rule that the model will not overwrite human edits. This is the part closest to a conventional wiki and the part that has aged best.

## 3. The maintenance half, and its ceiling

A lint skill checks for contradictions, orphans, stale claims and missing cross-links. **It reports and never silently edits** — the same posture as the ledger's conflict resolver, and the correct one for any automation operating on a shared corpus: surface, do not resolve.

A nightly local job runs inbox ingestion plus the lint pass. Its filename declares its own limitation: it is local-only and non-distributable. The alternative — scheduling in a hosted sandbox — was evaluated and ruled out because that sandbox cannot reach local plugins or MCP servers. So the librarian's automation runs on one laptop, and the corpus is maintained on the days that laptop is awake.

This is exactly [`../../01-concepts.md`](../../01-concepts.md) §3.15's note — *"all of our rituals are similarly manually invoked and were not fully integrated"* — confirmed with a mechanism. It is also the same physical ceiling their own maturity rubric names for two other rows: capability is present, always-on substrate is not.

## 4. Retrieval, and the honest number

The system measured four retrieval backends over 25 developer-phrased queries with ground truth:

| Backend | F1 | Latency |
|---|--:|--:|
| Lexical (BM25) | 0.22 | 6 ms |
| Vector | 0.76 | 39 ms |
| Hybrid | 0.75 | 294 ms |
| Full rerank | **0.84** | 5,692 ms |

**They then shipped the worst one.** The decision record is explicit that a committed lexical index is the sanctioned team default — *not a fallback* — because the semantic path loads roughly 3.3 GB of local models and the team's machines could not carry it. Measured on a constrained box: lexical 0.7 s, vector-only 167 s, full query 273 s.

That is a defensible trade, stated plainly, with the losing number published. **It is also the single most useful datapoint in this entire corpus for anyone building an Context story**, because no other system in [`../../02-component-matrix.md`](../../02-component-matrix.md) publishes a retrieval quality measurement at all. The transferable principle: *the retrieval floor must be the one every machine can actually run, and you should know exactly what that costs you in recall.*

→ [`adr-seeds/ADR-020`](./adr-seeds/ADR-020.md)

**And then the distribution failed.** The index is gitignored. `.gitignore:69` excludes `bm25-index/*.sqlite`; `git ls-files` on that directory returns only the README. The 12 MB index sits on disk, untracked, while the decision record describes it as committed and zero-setup. Every teammate must rebuild it — which is the exact cost the decision was made to eliminate. The gitignore rule was written to stop two much larger indexes from being committed and swept this one up with them.

Worth stating as a lesson rather than a jab: **a distribution decision that is not enforced by the thing that does the distributing is a preference.** One gitignore line silently reversed a ratified decision, and nothing detected it for weeks.

## 5. Where a fact goes — the routing doctrine

The sharpest artifact in the system, and it fits on a card. One question:

> **Would another teammate's agent need this to be correct about the project?**

| Answer | Destination |
|---|---|
| No — it is about the user, their preferences, or how to work with them | Personal memory |
| Yes — it is shared knowledge or synthesis | The knowledge base |
| Yes, **and** it is change-managed with named ownership | The decision log, via promotion |

The rule names the failure it exists to prevent: the agent reaches for personal memory *because it is auto-loaded every session and zero-friction to write* — and that store is per-user, outside git, invisible to every teammate's agent. Team-relevant facts written there become a shadow source of truth.

It then supplies its own smell test: **a `type: project` memory is almost always a promotion smell.** Personal-identity and working-preference memories are the legitimate residents; project facts belong elsewhere. And a precedence rule for when the copies disagree: the ledger wins.

This is the piece to take verbatim. It is short, it is mechanism-shaped, it addresses a failure every agent system has, and LoomWarp has no equivalent — [`../../01-concepts.md`](../../01-concepts.md) §4 currently records LoomWarp's individual-memory answer as *"(claude auto-memory)"* in parentheses, which is the notation for a gap.

→ [`adr-seeds/ADR-021`](./adr-seeds/ADR-021.md)

## 6. What to take

| Take | Effort | Note |
|---|---|---|
| The routing doctrine | **Hours** | One rule file, adaptable close to verbatim |
| The librarian tier + two concurrency models | Days | Needs a frontmatter convention and a lint pass |
| `_INBOX` → raw → sources → synthesis, with capture separated from interpretation | Days | The capture-is-dumb split is the load-bearing part |
| Report-never-edit posture for all corpus automation | Hours | Applies to lint, conflict resolution, and any future promoter |
| Publishing the retrieval trade with its measured cost | Hours | Nobody else in the corpus does this |
| The nightly maintenance job | — | **Take the intent, not the implementation** — theirs cannot leave one machine |

---

*Companion: [`04-decision-ledger.md`](./04-decision-ledger.md) — where promotion lands · [`06-capability-and-standards.md`](./06-capability-and-standards.md) — the compounding tier this feeds · [`../../01-concepts.md`](../../01-concepts.md) §4 — the Stewardship row*
