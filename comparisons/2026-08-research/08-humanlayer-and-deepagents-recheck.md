---
title: "The 2026-08-30 re-check — HumanLayer and Deep Agents, read at source"
tier: reference
project: loomwarp
created: "2026-08-30"
status: DRAFT
owner: KD
---

# HumanLayer and Deep Agents — what they change

**What this is.** A dated ledger of every claim in the comparison corpus that the two newly-read
systems overturn, narrow or confirm. **No existing corpus file is edited by this pass.** This is the
same treatment [`00-README.md`](./00-README.md) §1 gave the last re-check, for the same reason: the
corrections should be reviewable as a set before they are folded in.

**What was read.** Seven repositories cloned to `/Users/kevindeng/Googlyeye-Monsters/` on 2026-08-30
and pinned:

| Clone | SHA | Date |
|---|---|---|
| `deepagents` | `3a0f68ccd08166394e02fd736869482be5759f83` | 2026-08-30 |
| `deepagentsjs` | `2cce30d269f25d3b8836bdce73ea84c08f8e4fbb` | 2026-08-30 |
| `fold` | `c00757703f853c24a17a2e12070b885f6cb7efdb` | 2026-08-29 |
| `humanlayer-skills` | `3c2629142c5d437428269b1b722b08c0b87f574d` | 2026-08-13 |
| `advanced-context-engineering-for-coding-agents` | `f2bc7aec4575418d2d2e83fec078266cc56d3e6a` | 2026-08-04 |
| `rpi-coordination-template` | `90a4e7b261a9f61a351415cb872fda02e861f693` | 2026-08-03 |
| `humanlayer` | `99abe673498cf8bdcd5f989aebe9406a27185b3b` | 2026-06-18 |
| `12-factor-agents` *(already present)* | `d20c728368bf9c189d6d7aab704744decb6ec0cc` | 2025-09-21 |

Nothing was installed and nothing was executed. Source and documentation only.

Teardowns: [`../systems/humanlayer.md`](../systems/humanlayer.md) ·
[`../systems/langchain-deepagents.md`](../systems/langchain-deepagents.md).

---

## 1. What we got wrong

Stated first, per house rule.

| # | Our claim | Where | Reality |
|---|---|---|---|
| 1 | HumanLayer is a **position to answer** | [`../03-jtbd.md`](../03-jtbd.md) §5 | It is the **nearest competitor**. Live tagline: *"The multiplayer control plane for your software factory."* We catalogued the critique and not the company |
| 2 | *"Context **provenance** … is still unclaimed by everyone in this corpus"* | [`../00-README.md`](../00-README.md) §F-4 · [`../02-component-matrix.md`](../02-component-matrix.md) §3 | **Partly falsified.** `deepagents/openwiki/.claims/` ships content hashing, version pinning and reconstruction over 515 claims. See §2 — the surviving claim is real and much narrower |
| 3 | DeepAgents has *"no policy, no evidence, no distribution, no roster, no cost"* | `../systems/langchain-deepagents.md` §9⑤ *(prior version)* | **Three of five wrong.** `THREAT_MODEL.md`, `libs/evals/` + `UNIFIED_SCORECARD.md`, and `action.yml`. Roster and cost survive |
| 4 | DeepAgents has **four** middleware insertion points | same, §2 | **Six in code**, each with an async twin. The transcript described an older or simplified surface |
| 5 | The `Context adapter` matrix row is empty and *"its emptiness is the finding"* | [`../02-component-matrix.md`](../02-component-matrix.md) §1 | HumanLayer's `thoughts` occupies it — separate repo, mounted in, hook-enforced, generating the harness's own `CLAUDE.md` |
| 6 | Harbor is `◐ relayed` | `../systems/langchain-deepagents.md` §10 | Verified: `libs/evals/harbor_adapters/`, and pinned by SHA in the published scorecard |
| 7 | 12-Factor Agents is `◐ relayed` | [`06-frameworks-addendum.md`](./06-frameworks-addendum.md) §3.2, §5 table · [`05-harness-factors.md`](./05-harness-factors.md) §"Why this form" | Verified at source, `d20c7283`. The twelve are exactly as recorded. **No correction to content** — only the marker |

---

## 2. The provenance claim, narrowed a third time

This is the entry that matters. [`../02-component-matrix.md`](../02-component-matrix.md) §3 published
its own falsification test:

> *"the claim dies if any of SageOx, Anthropic, or a memory vendor ships a per-run manifest that pins
> content versions and can be reconstructed later."*

**A vendor shipped most of that, and it was none of the three named.**

`deepagents/openwiki/` is a machine-maintained code wiki. Every page carries a `.claims/*.json`
sidecar — 27 files, **515 claims**. Each claim is a natural-language statement with `evidence[]`
entries of the form:

```
resource:  repo://libs/DEVELOPMENT.md#L30-L49
version:   repo-lines-v1:sha256:7fadcab…:<base64 line fingerprint>
```

The fingerprint decodes to `firstSelectedLineHash`, `lastSelectedLineHash`, and three lines of hashed
context on each side — a citation that tolerates edits elsewhere in the file and **breaks loudly when
the cited region changes**. The page itself carries `pageVersion: sha256:…`. The run manifest
`.last-update.json` pins `gitHead`, `model` (`gpt-5.6-terra`), `updatedAt` and `status`.

### Scoring it against our four properties

| Property | `openwiki` | LoomWarp's claim |
|---|:--:|---|
| Content hashing | ✅ | per-claim + per-page |
| Version pinning | ✅ | `gitHead` + line fingerprints |
| Reconstructable after the fact | ✅ | you can re-derive whether any claim went stale |
| **Owner attribution** | ✗ | no author, no approver, no source ownership |
| **Join to the work's outcome** | ✗ | nothing connects a claim to whether work succeeded |

### The distinction that survives, stated precisely

> **`openwiki` pins what a *document* asserts about a repository. `F7` pins what an *agent saw during
> a run*, who owned it, and what came of the work.** The unit is a **page**; ours is a **run**.

That is a real difference and it is defensible. It is also **much smaller than the claim we have been
making**, and the phrasing above should replace the current wording everywhere it appears —
[`../00-README.md`](../00-README.md) §F-4, [`../02-component-matrix.md`](../02-component-matrix.md)
§3, and `specs/v0/02-functions.md`.

### Two things that make this sharper, not softer

**The corroboration is now first-party from the strongest critic.** `wsff.md` — the full keynote text,
which this corpus had only ever quoted from a schedule listing — names the missing mechanism in our
own words:

> *"A bad decision leads to random slop leads to a bug/incident weeks or months later — and there's no
> way to backprop the incident to the decision that caused it."*

**Horthy's impossibility claim and our `F7` are the same sentence in opposite moods.**
[`../03-jtbd.md`](../03-jtbd.md) §5 already answers him with `J8`; that answer should now be stated
against his own text rather than against a paraphrase.

**And there is a shipped run receipt to copy.** `libs/evals/UNIFIED_SCORECARD.md` footnotes every
benchmark number with run ID, date, judge model, harness SHA, sandbox, rollout count, wall-clock, and
an honest count of errored trials scored as failures. That is closer to
[`00-README.md`](./00-README.md) §F-4's *"run receipt"* than anything else in the corpus, and it is over
an **eval run** rather than a unit of work — which is exactly the narrowing `J12` already took.

---

## 3. Rituals — `OPEN-8` should close in favour of first-class

[`../00-README.md`](../00-README.md) §F-2 row 4 and [`../03-jtbd.md`](../03-jtbd.md) §4 hold Rituals
open. HumanLayer closes it on the corpus's own corroboration standard.

**RPI** — Research → Plan → Implement — is a named phase set, with a published prompt per phase
(`.claude/commands/{research_codebase,create_plan,implement_plan}.md`), an artifact per phase, a
stated human checkpoint at each, a documented variant (**PRD-oriented**, splitting PRD from TDD), a
skill namespace (`rpi:*`), and a paid product built around it. It matches KD's definition exactly —
**a scheduled loop that emits an artifact.**

It is the **fourth** independent peer treating rituals as first-class (gstack's sprint loop, Indigo's
Ralph loop, FRACTAL's HANDOFF, now RPI), and the first where the ritual is the thing being sold.

**Also relevant to `OPEN-8`:** the essay publishes the *distribution* of ritual use — ~40% of tasks
one-shot, medium tasks get one document, only large work gets the full ladder. **A ritual model that
does not say when to skip it will be skipped entirely.** Any Rituals function we add should carry that
field.

---

## 4. Individual vs. team memory — `F-2` row 1 is settled, and the answer is a 2×2

Four peers already treated the boundary as first-class. HumanLayer's `thoughts` makes it **two**
boundaries:

|  | per-repo | cross-repo (`global/`) |
|---|---|---|
| **individual** (`<user>/`) | `repos/<project>/alice/` | `global/alice/` |
| **team** (`shared/`) | `repos/<project>/shared/` | `global/shared/` |

Strictly more expressive than gbrain's `brain × source`, Indigo's `core`/`personal`, or QM's scope.
It is also the only one that **binds mechanically** — a pre-commit hook prevents `thoughts/` entering
the code repo, a post-commit hook syncs and rebuilds the hard-linked `searchable/` tree.

**`F3` should carry both axes or explicitly decline the second.** Deep Agents corroborates the same
shape from the other direction: `SkillsMiddleware` loads from ordered sources, last-one-wins,
documented as *"base -> user -> project -> team"*.

---

## 5. Proposed matrix changes

[`../02-component-matrix.md`](../02-component-matrix.md) §1 has nine columns. Two are missing. Scored
below to the file's own sourcing rule — every `●` traces to a cited primitive in a teardown.

| Component | **HumanLayer** | **Deep Agents** |
|---|:--:|:--:|
| Harness adapter | ● (`fold` + Claude Code + `hlyr` MCP) | n/a — it is a harness |
| **Context adapter** | **●** (`thoughts`) | ◐ (`ContextHubBackend`) |
| Multi-model / adversarial | ◐ | ◐ (profiles; scorecard across 6 models) |
| Agent definitions | ● (6 named subagents) | ● (`SubAgent` / `CompiledSubAgent` / `AsyncSubAgent`) |
| Skills | ● (`rpi:*`, published plugins) | ● (`SkillsMiddleware`, layered sources) |
| Individual memory | ● (`thoughts/<user>/`) | ◐ (`MemoryMiddleware` + store backend) |
| Team memory | ● (`thoughts/shared/`) | ◐ (`ContextHubBackend`) |
| Context assembly | ● (`<important if>`, generated `CLAUDE.md`, RPI compaction) | ● (summarization + offloading middleware) |
| Task decomposition | ● (RPI phases, vertical slices) | ● (planning + subagents) |
| Project board | ◐ (tasks; Linear integration) | ○ |
| Communication channel | ● (Slack/email/CLI/web contact channels; design reviews) | ○ |
| Permissions / policy | ● (approval daemon, `additionalDirectories`) | ● (`FilesystemPermission` allow/deny/interrupt) |
| Human-in-loop posture | ● | ● (`HumanInTheLoopMiddleware`, `interrupt` mode) |
| Secrets brokering | ○ | ○ |
| Evidence / telemetry | ◐ (event types, session status) | ● (evals, scorecard, LangSmith) |
| Capture loop | ● (post-commit `thoughts sync`) | ◐ (`openwiki` regeneration) |
| Distribution / sync | ● (thoughts repo, coordination repo, workspaces) | ● (`action.yml`, PyPI, `curl \| bash`) |
| Standards tier | ◐ (shared `AGENTS.md` + skills; no inheritance contract) | ◐ (**`RubricMiddleware`** — see below) |
| Provenance → outcome join | ○ | **◐** (`openwiki` claims; page-scoped, no owner, no join) |

**Two rows need re-reading, not just re-scoring.**

**`Standards tier`.** [`../00-README.md`](../00-README.md) §F-5 says *"Zero of seven peers ship what
good looks like as a versioned, owned, inherited artifact."* `RubricMiddleware` ships *what done looks
like* as a **declared, graded, loop-blocking artifact** — per-criterion verdicts, a grader sub-agent
invoked at the moment the agent would finish, feedback re-injected, bounded by `max_iterations`, and a
validator that rejects a grader verdict inconsistent with its own per-criterion marks. **It is not
versioned, owned or inherited** — it is per-call — so F-5's sentence survives *as written*. But the
mechanism half of that row is no longer unclaimed, and the claim should be stated as *inheritance and
compounding*, not as *"what good looks like."*

**`Provenance → outcome join`.** Now three `◐`s and still no join. SageOx holds both ends without
evidence of hashing; `generic-cerebro` has hashes and no join; `openwiki` has hashes and pinning over
documents. **LoomWarp remains the only entry holding an inherited decision store and a structured run
event stream** — but the gap to the nearest competitor is one field (owner) and one edge (outcome),
not a category.

---

## 6. Factor V has its first counter-example

[`05-harness-factors.md`](./05-harness-factors.md) Factor V — *"Scope only narrows … deny wins from any
scope"* — cites QM and Claude Code reaching it independently, which read as convergence.

Deep Agents did not. `_check_fs_permission` (`middleware/filesystem.py:423`) is **first-match-wins
with an `allow` default**: rule order is semantic, and a permissive rule listed first defeats a later
deny. Its own docs warn that unanchored patterns *"collapse to `/` and conservatively over-fire."*

**This makes Factor V stronger, not weaker.** It moves from an observation about what everyone does to
a position with a live counter-example and a stated failure mode. The factor should say so.

---

## 7. Insertion points are a converged interface

Three independent implementations, three languages:

| System | Insertion points |
|---|---|
| **Deep Agents** (Python) | `before_agent` · `before_model` · `wrap_model_call` · `wrap_tool_call` · `after_model` · `after_agent` (+ async twins) |
| **`fold`** (TypeScript/Effect) | `preRequest` · `preToolUse` · `postToolUse` · `onComplete` |
| **Claude Code** | lifecycle events (`PreToolUse`, `PostToolUse`, `SessionStart`, …) |

The shape is identical: **wrap the request, wrap the tool, bracket the session.**
[`04-primitives-ontology-platform.md`](./04-primitives-ontology-platform.md) §5 argues the durable half
of ontology is *a primitive set with bounded verbs*. This is that, arrived at three times
independently, and it belongs in the corpus as a converged interface rather than as three vendor
details.

---

## 8. Two new primitive sets for the five-to-seven count

| System | Primitives | Count |
|---|---|---|
| **HumanLayer** (product) | task · session · artifact · worktree · repository | 5 |
| **Deep Agents** | middleware · backend · profile · sub-agent · skill · permission · rubric | 7 |

Both inside the band [`04-primitives-ontology-platform.md`](./04-primitives-ontology-platform.md)
records. LoomWarp's cell in [`../02-component-matrix.md`](../02-component-matrix.md) is still
*"— unstated."*

---

## 9. A path claim, dated

Recorded because it is about this whole category and not only about one vendor.

| Date | Event |
|---|---|
| 2025-03-30 | 12-Factor Agents published — the method, free, Apache-2.0 |
| 2025→2026 | `humanlayer/humanlayer` monorepo — approvals daemon, CLI, CodeLayer WUI — grows to 11.4k★ |
| 2026-08-03 | `rpi-coordination-template` published: multi-repo coordination as four files |
| 2026-06-19 | **Monorepo deprecated in place** — *"the code here is pretty much all deprecated"* |
| 2026-08 | Coordination template annotated as obsoleted by the hosted **Workspaces** feature |
| ongoing | `fold` — a new OSS agent core with **no process opinion in it** |
| now | humanlayer.com — $100/user/month, seats, tasks, artifacts, design reviews |

**The method stayed free. The coordination became the product.** And the residue the template's own
README says you might still want a repo for is *shared `AGENTS.md` and skills* — the
standards-and-capability tier. That is a data point about which layer is defensible, and it points at
the one [`../00-README.md`](../00-README.md) §F-5 already says is ours.

---

## 10. What this pass did not do

- **No existing corpus file was edited.** Sections 1–9 are proposals against named sections.
- **No function-model change.** `OPEN-8` is argued, not closed; `F3`'s second axis is proposed, not
  added.
- **No re-scoring of existing columns.** The new column scores in §5 are additive; whether HumanLayer's
  `●` on `Context adapter` changes how gstack's `◐` should read was not examined.
- **Nothing was installed or executed.** No agent was run, no benchmark reproduced. The
  `UNIFIED_SCORECARD` numbers are read, not verified.

---

## 11. Additions to source hygiene

For folding into [`99-source-hygiene.md`](./99-source-hygiene.md).

**Retired — now verified at source:** 12-Factor Agents' twelve factors · Harbor's presence in the
Deep Agents eval suite · the *"Why Software Factories Fail"* argument (full text held locally, no
longer schedule-listing-only).

**Unverified — do not state as fact:**

| Claim | Status |
|---|---|
| HumanLayer's **QRSPI** six-phase workflow | From the marketing site via a fetch layer. `docs.humanlayer.com` names **three** phases (Research · Design · Implementation) with RPI and PRD-oriented variants. **Three phase vocabularies from one company in one quarter** — do not cite any of them as *the* model |
| HumanLayer pricing ($0 / $100 per seat / Enterprise) | Fetch layer, 2026-08-30. Stamp the date |
| Whether `humanlayer.dev` and `humanlayer.com` are one product surface | Not established |
| HumanLayer seats, revenue or adoption | No figure found |
| *"$12k/month on opus for a team of three"* | Self-reported in `ace-fca.md`. Real quote, unaudited number |
| *"models degrade codebase quality over time"* | An argument from RL reward shape, not a measurement. The BAML PRs are verifiable; this claim is not |
| Deep Agents `UNIFIED_SCORECARD` figures | Read from the repo, not reproduced. Run IDs are cited and could be checked |
| The LangChain talk's date and venue | **Still not established** — carried over unresolved from the 2026-08-27 pass |

---

*Companion: [`00-README.md`](./00-README.md) — the previous re-check ·
[`../systems/humanlayer.md`](../systems/humanlayer.md) ·
[`../systems/langchain-deepagents.md`](../systems/langchain-deepagents.md)*
