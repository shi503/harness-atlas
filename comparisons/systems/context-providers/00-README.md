---
title: "Context providers — five teardowns, scored against one contract"
tier: reference
project: loomwarp
created: "2026-08-27"
status: DRAFT
owner: KD
---

# Context providers

**What this is.** Five teardowns of things that can fill `F3 Context`, each scored against the same
contract, so *"which one should we plug in"* has an evidenced answer instead of a preference.

**Why a sub-folder.** The sibling teardowns in [`../`](..) compare **whole process layers** against
each other — gstack against QM against Indigo. These compare **components inside one function**.
Different axis, and merging them is the genre error
[`../../2026-08-research/06-frameworks-addendum.md`](../../2026-08-research/06-frameworks-addendum.md)
§0 warns about. Precedent for the shape: [`../kd-built-frameworks/`](../kd-built-frameworks).

**The contract they are scored against** is
[`../../../../specs/v0/09-context-layer.md`](../../../archive/v0/09-context-layer.md) §6. The matrix
rows below are that contract, unchanged — **if a row cannot be scored `●◐○` without editing §6, §6 is
prose and needs rewriting.** That is the test, and it is why the matrix is here rather than in the spec.

---

## 1. The inclusion test

A system belongs in this folder if it does all three:

1. **It persists** something across sessions, machines or people.
2. **It declares a scope** — or its failure to is itself the finding.
3. **It is pluggable** — the harness could use it instead of something else.

`beads` fails test 3 and is included anyway, as a **negative control**. That is stated in its file and
is the reason it earns a place.

---

## 2. Reading order

| # | Teardown | Read it for |
|---|---|---|
| **01** | [`01-gbrain.md`](./01-gbrain.md) | The most complete typed store. **The 186,000-page / 94-type postmortem** — the empirical argument for a closed type root |
| **02** | [`02-okf-and-wiki-langgraph.md`](./02-okf-and-wiki-langgraph.md) | **Google's OKF v0.2** — the only published *schema* for context provenance. Contains the third narrowing of our own claim, with a dated falsifier |
| **03** | [`03-decision-ledger.md`](./03-decision-ledger.md) | Three implementations, three complementary failures. **Our own vendored copy has no scope concept and is one parameter from having one** |
| **04** | [`04-beads-and-gas-city.md`](./04-beads-and-gas-city.md) | The negative control. Git-native artifacts done well **for work** and not attempted **for context** |
| **05** | [`05-native-harness-memory.md`](./05-native-harness-memory.md) | The default provider — and **`InstructionsLoaded`, the event that turns the Briefing from a build into an integration** |

**Read 01 and 02 back to back.** gbrain has a closed vocabulary and no portability; OKF has portability
and no vocabulary. They are the two horns of the same tension, and the contract resolves it by requiring
both at different layers.

---

## 3. The provider matrix

Rows are the obligations from [`09-context-layer.md`](../../../archive/v0/09-context-layer.md) §6.
Notation matches [`../../02-component-matrix.md`](../../02-component-matrix.md): **`●` implemented ·
`◐` partial, or present without being first-class · `○` absent · `n/a` out of the provider's scope.**

Columns: **gb** gbrain · **OKF** the spec + wiki-langgraph · **DL-L** LoomWarp's vendored ledger ·
**DL-c** generic-cerebro DL v2 · **DL-g** gstack decision store · **nat** native harness · **LW** LoomWarp
overall today.

### Identity and scope

| | Obligation | gb | OKF | DL-L | DL-c | DL-g | nat | LW |
|---|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| `P-1` | Declares its scope cells | ● | ○ | **○** | ● | ● | ◐ | ○ |
| `P-2` | `list_scopes()` at runtime | ● | ○ | ○ | ◐ | ● | ○ | ○ |
| `P-3` | Fails conservative on unknown scope | ◐ | n/a | ○ | ○ | **●** | ○ | ○ |
| `P-4` | Deterministic project identity | ● | n/a | ○ | ● | **●** | ● | ◐ |

### The verbs

| | Obligation | gb | OKF | DL-L | DL-c | DL-g | nat | LW |
|---|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| `P-5` | `write` with explicit scope | ● | ○ | ○ | ◐ | ● | ◐ | ○ |
| `P-6` | `select` returns an addressable **bundle** | ◐ | ○ | ○ | ○ | ○ | ○ | **○ ‡** |
| `P-7` | Routing applied at `write` | ○ | ○ | ○ | **●** | ○ | ○ | ○ |
| `P-8` | `compress` with declared discard order | ○ | n/a | n/a | n/a | ◐ | ● | ○ |
| `P-9` | `isolate` — a caller gets strictly less | ◐ | ○ | ○ | ◐ | ● | **●** | ◐ |

### Provenance, trust, freshness

| | Obligation | gb | OKF | DL-L | DL-c | DL-g | nat | LW |
|---|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| `P-10` | Per-item provenance | ◐ | **●** | ○ | ● | ◐ | ○ | ◐ |
| `P-11` | Actor identity, human/agent/process | ○ | **●** | ◐ | ● | ◐ | ○ | ◐ |
| `P-12` | Trust tier derivable | ◐ | **●** | ○ | ◐ | ○ | ○ | ○ |
| `P-13` | Freshness / `stale_after` | ○ | **●** | ○ | ○ | ○ | ○ | ○ |
| `P-14` | Lifecycle status | ◐ | **●** | ● | ● | ◐ | ○ | ● |
| `P-15` | **Per-run manifest** | ○ | ○ | ○ | ○ | ○ | ○ | **○ ‡** |

### Integrity and change

| | Obligation | gb | OKF | DL-L | DL-c | DL-g | nat | LW |
|---|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| `P-16` | Ownership on change-managed records | ○ | ◐ | ● | **●** | ○ | ○ | ● |
| `P-17` | Supersession retains history | ◐ | ◐ | ● | ● | **●** | ○ | ● |
| `P-18` | **Referential integrity on supersession** | ◐ | ○ | ○ | ○ | ○ | n/a | **○ ‡** |
| `P-19` | Closed type root, open subtypes | **●** | ○ | ◐ | ◐ | ◐ | ○ | ◐ |
| `P-20` | Migration under a live corpus | **●** | ○ | ○ | ○ | ◐ | ○ | ○ |
| `P-21` | Redaction expunges every read path | ○ | ○ | ○ | ○ | **●** | ○ | ○ |

### Enforcement and safety

| | Obligation | gb | OKF | DL-L | DL-c | DL-g | nat | LW |
|---|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| `P-22` | A write gate the model cannot reach | ◐ | ◐ | ○ | **●** | ○ | ● | ○ |
| `P-23` | **Stored text is data, not instructions** | ○ | ○ | ○ | ○ | **●** | ○ | ○ |
| `P-24` | Fails closed on secrets and PII | ○ | ○ | ○ | ◐ | **●** | ○ | ○ |
| `P-25` | **Context-owned access control** | ○ | ○ | ○ | ○ | ○ | ○ | **○ ‡** |

> **`‡` = specified, not built**, per the corpus rule *"if you cannot point at the artifact, you are one
> column to the left."*

---

## 4. What the matrix says

**Nobody implements the contract.** The best column is gbrain, and it is `○` on nine rows. **That is the
expected result and it is the argument for the contract existing** — every provider was built for one
team's problem, and the union of their solutions is larger than any of them.

**Three obligations are unimplemented by everyone examined:**

| | | Consequence |
|---|---|---|
| `P-15` | the per-run manifest | **The differentiation claim.** And `05`'s finding says it is an *integration*, not a build — `InstructionsLoaded` already fires |
| `P-18` | referential integrity on supersession | Every ledger here lets you point at a decision that does not exist. Cheapest unclaimed correctness win in the folder |
| `P-25` | context-owned access control | The whole of `09` §5. **The corpus framed the individual/team boundary as ownership for four months and never as a breach surface** |

**Three of the five are complements, not competitors.** gbrain owns vocabulary and migration; OKF owns
provenance and portability; the ledgers own governance and — in gstack's case alone — safety. **A
credible roadmap is "adopt OKF's frontmatter, borrow gbrain's type discipline, keep the ledger, and
build only `P-15`,"** not "pick one."

**And the safety column is a single system.** `P-23` and `P-24` are `●` in exactly one place. A shared
context layer without render-boundary datamarking is a prompt-injection channel with an audit trail, and
five of six providers here are one.

---

## 5. Where this goes next

- The graded self-assessment: [`../../../../specs/v0/10-context-gap-analysis.md`](../../../archive/v0/10-context-gap-analysis.md)
- The contract itself: [`../../../../specs/v0/09-context-layer.md`](../../../archive/v0/09-context-layer.md) §6
- The model: [`../../../../specs/v0/02-functions.md`](../../../archive/v0/02-functions.md) §0.4

**Not researched, and queued:** Codex, Cursor and Amp memory (`05`) · any beads implementation (`04`) ·
OKF from a full local checkout rather than a `SPEC.md` fetch (`02`).
