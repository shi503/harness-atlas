---
title: "LoomWarp — control-plane reference set"
tier: reference
project: harness-atlas
provenance: OBSERVED
created: "2026-09-08"
source_verified: "2026-09-08"
claims_captured: "2026-09-08"
docs_root: "`loomwarp-team-system` @ `8844df6` — repository root (private; no hosted documentation exists)"
version_at_capture: "8844df6f4bc48f8a563340eb3163401792e000d5"
status: ACTIVE
verification:
  derived_from:
    - "`loomwarp-team-system` @ `8844df6f4bc48f8a563340eb3163401792e000d5` (branch `master`, private) — README.md, docs/, fractal/, standards/, skills/, control/, policy/, context/, registry/, vendor/, .claude/agents/, .gitmodules, .gitignore — read 2026-09-08 via the GitHub contents API"
    - "`fractal-agent-system` @ `6398f6db059598e381336601b21609928cf24034` (public) — read 2026-09-08, only to check the vendoring manifest's hashes and paths"
    - "no positioning copy — none exists; see the record below"
  grounded_against:
    - "the profile at ../loomwarp.md"
    - "every executable file in scope, opened directly: control/dispatch.py, fractal/router.py, control/sync-skills.sh, scripts/verify-vendored.mjs"
    - "sha256 recomputed for all 15 vendor/manifest.json entries in both repositories"
    - "the shipped classifier regexes, run against the two HANDOFF templates and the two real HANDOFF files in the tree"
  drafted_by: "claude-opus-5"
  drafted_on: "2026-09-08"
  verified: false
  verified_by: ~
  verified_on: ~
  note: >
    drafted_by is CAPTURED at write time, not attested. Depth (Standard) and scope (the LoomWarp
    control plane as it exists in code and in its own markdown) were agreed before reading, per the
    harness-deep-read skill's step one. This set follows that skill's "When there is no vendor"
    branch: the claim ledger is replaced by a stated-intent ledger cited to file and commit, and
    every stated intent is grounded against the code.
---

# LoomWarp — control-plane reference set

**This folder is the deep read for the Template v2 profile at [`../loomwarp.md`](../loomwarp.md).**
Start there; open these documents when a detail row's `Ships`/`Path`/`Source` needs more grain.

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**What this is.** A reading of LoomWarp's source tree and its own markdown, organised by the surfaces
the system names for itself — the vendored core, the BLUEPRINT and the workstream, dispatch and
outcome classification, the context fabric, skill distribution and the registry, policy tiers, the
standards tier, and the framework-error audit trail.

**Why it exists.** A profile answers *what is this harness, and how does it compare*. It cannot hold
a regex and the two shipped templates it is run against, or fifteen places where a design document
and the source tree say different things. This folder is that grain.

---

## Scope, and the shape found

**Depth: Standard.** Eight surface documents, plus this index and the guide.

**Scope: the LoomWarp control plane as it exists in code and in its own markdown.** Read at the
repository root of `loomwarp-team-system` @ `8844df6`: `README.md`, `docs/*.md`, `fractal/`,
`standards/`, `skills/`, `control/`, `policy/`, `context/`, `registry/`, `vendor/`, `.gitmodules`,
`.gitignore`. Two additions to that list, both because a surface in it is unreadable without them:
`.claude/agents/*.md`, which `dispatch.py`'s `--agent` flag selects and `vendor/manifest.json`
records; and `scripts/verify-vendored.mjs`, which is the mechanism `vendor/README.md` names as its
enforcement.

**Excluded, deliberately:** `projects/` and `specs/` — 167 files of design specification,
session records and framework drafts, including the `GAP-`, `F`-number and exit-evidence registers
that in-scope files cite. Where an in-scope reference points into that tree, this set records the
reference as unresolved within scope rather than following it.

### The shape found, and why it is not this atlas's

**LoomWarp names its machinery and does not name what a user composes.** There is a real internal
vocabulary — `workstream`, `BLUEPRINT`, `HANDOFF`, `PULSE`, `context_bundle`, `target_mode`, the four
outcomes, the vendoring contract, the standards tier, the receipt — and `README.md` makes the choice
of those words an explicit decision rather than an accident. What is absent is a bounded set of
authorable units: nothing in the tree tells a user *these are the things you write*.

**Most of the vocabulary that exists is inherited, and the inheritance is checkable.** Fifteen files
carrying it — `router.py`, six of seven skills, all four policy tiers, four of five agent roles — are
byte-identical to `fractal-agent-system` @ `6398f6d`, confirmed by recomputing every sha256 in both
repositories at this read. What LoomWarp itself authored around that core is `control/dispatch.py`
(345 lines), `control/sync-skills.sh` (150), `skills/cross-repo-dispatch/SKILL.md` (42),
`.claude/agents/loomwarp-cto-architect.md` (203), `standards/` (970), the context fabric, the
registry, the vendoring contract, the blueprints and the audit trail.

**So the folder is cut by the seam, not by this atlas's 33 components.** Each document is one surface LoomWarp
added around a core it does not touch, plus the core itself and the contract protecting it. The word
the tree uses for that relationship, in `ADR-001`, both BLUEPRINT headers, `vendor/README.md`,
`context/org/PRINCIPLES.md` and the distributed skill, is *additive*.

---

## No positioning copy — the record

**LoomWarp publishes nothing written to persuade.** Checked, at this read:

| Checked | Found |
|---|---|
| A landing or product page | None. `gh api repos/shi503/loomwarp-team-system` returns `"homepage"` unset |
| Hosted documentation | None. `README.md` plus three files in `docs/` are the whole of it |
| A launch or announcement post | None. The repository is private, has zero stars and zero forks |
| Releases and tags | None — `gh api .../releases` and `.../tags` are both empty |
| A repository description | One line: *"LoomWarp — federated context harness and multi-repo FRACTAL control plane"* |
| A `LICENSE` | None in the tree; `gh api` reports `"license": null` |

The absence of marketing is a fact about the system, not a missing ledger. What replaces it is below.

## What the system says it is for — the stated-intent ledger

Verbatim, cited to **file and commit** rather than to a URL, all from
`loomwarp-team-system` @ `8844df6`. These are **statements of intent**, recorded as such.
[`20-consolidated-guide.md`](./20-consolidated-guide.md) §7 walks them against the mechanisms this
set documented.

| Stated intent | File | Captured |
|---|---|---|
| *"**LOOMWARP is a distributed context harness for structuring many threads of work into one coordinated system.**"* | `README.md` | 2026-09-08 |
| *"LoomWarp is the *name and story*; `workstream` stays the *word* the code and docs actually use."* | `README.md` | 2026-09-08 |
| *"LoomWarp is a framework for your AI harness platform that is built for teams to: 1. provide an opinionated structure to how your project is structured (virtual mono-repo)… 2. create a consistent and easily shared context layer… 3. create workflows and processes for how work gets scoped, built, tested, and evaluated 4. provides requirements, frameworks, and integrations to provide clarity to 'how we work' and 'what good looks like.'"* | `README.md` | 2026-09-08 |
| *"It is a working demonstration, not a finished product: this repo is the **bootstrap/control repo** in a small 'virtual monorepo'."* | `README.md` | 2026-09-08 |
| *"LoomWarp is **an open, runtime-neutral control plane for multi-repository agent work, whose defining feature is context provenance.** For any unit of work it can show what context the agent saw, at which version, under which policy, and what evidence resulted."* | `fractal/STRATEGIST-loomwarp.md` §1 | 2026-09-08 |
| *"**A control plane** — deterministic decomposition, dependency resolution, and dispatch of scoped work across independently owned repositories, with zero model in the decision loop."* | `fractal/STRATEGIST-loomwarp.md` §1 | 2026-09-08 |
| *"**A context surface** — a virtual monorepo that makes an estate discoverable without merging it, serving typed, owned, versioned context as a resolvable bundle."* | `fractal/STRATEGIST-loomwarp.md` §1 | 2026-09-08 |
| *"**A standards carrier** — the answer to 'how we work' and 'what good looks like,' distributed as capability packages rather than tribal knowledge."* | `fractal/STRATEGIST-loomwarp.md` §1 | 2026-09-08 |
| *"**Evidence over assertion.** Tool trace is truth. A claim of completion without a reproducible artifact is a claim, not a result. This binds hardest on our own work."* | `fractal/STRATEGIST-loomwarp.md` §2 | 2026-09-08 |
| *"**Mechanical over prose.** A rule the model is asked to follow is advisory… Prefer the second, always."* | `fractal/STRATEGIST-loomwarp.md` §2 | 2026-09-08 |
| *"**Honest status.** Demonstrated, designed, and aspirational are three different words. Nothing ships in the future tense."* | `fractal/STRATEGIST-loomwarp.md` §2 | 2026-09-08 |
| *"**Runnable beats documented.** A repo a second person cannot run has no verified claims, regardless of how good its documents are."* | `fractal/STRATEGIST-loomwarp.md` §2 | 2026-09-08 |
| FM-2 guard: *"A red test per enforcement rule; `bypassPermissions` banned by a mechanical check, not a convention."* | `fractal/STRATEGIST-loomwarp.md` §5 | 2026-09-08 |
| FM-3 guard: *"Documentation-drift conformance test. No status table survives without a machine check."* | `fractal/STRATEGIST-loomwarp.md` §5 | 2026-09-08 |
| *"**Never trust the exit code**… **Never parse prose for structure.** Deriving pass/fail by pattern-matching a markdown table is brittle by construction… Emit structured evidence."* | `standards/evaluation-doctrine.md` §1 | 2026-09-08 |
| *"Every event validates against a schema. An unvalidated event stream is a log, not evidence."* | `standards/evaluation-doctrine.md` §3 | 2026-09-08 |
| *"**Two-attempt maximum.** On a second failure of any layer, stop and escalate."* | `standards/evaluation-doctrine.md` §2 | 2026-09-08 |
| *"**Product-AI evaluation** gates *what we ship*… LoomWarp does **not** do this. It gives teams the doctrine and the pipeline shape to do it themselves."* | `standards/evaluation-doctrine.md` | 2026-09-08 |
| *"An eval not in CI is not a gate."* | `standards/evaluation-doctrine.md` §10 | 2026-09-08 |
| *"the substance behind LoomWarp's claim to provide *'clarity on how we work and what good looks like.'*"* | `standards/README.md` | 2026-09-08 |
| *"**Reference, never copy**… **Tighten, never contradict**… A distributed skill must **never hard-depend on a path in this repo**."* | `standards/README.md` | 2026-09-08 |
| *"`fractal/router.py` being byte-identical to upstream is a load-bearing architectural claim… the deterministic router is never forked, never patched."* | `vendor/README.md` | 2026-09-08 |
| *"**Vendored files are never edited in place**… **Improvements land as additive overlays alongside the vendored file, not inside it**… **An upgrade is a manifest SHA bump plus a reviewed diff.**"* | `vendor/README.md` | 2026-09-08 |
| *"**The deterministic core does not move.**… cross-repo behavior is added through additive BLUEPRINT fields, never by changing router logic."* | `context/org/PRINCIPLES.md` §7 | 2026-09-08 |
| *"**Deny wins.** Policy enforcement (see `policy/`) is outside the prompt and cannot be weakened by a workstream, a repo, or an agent's own judgment."* | `context/org/PRINCIPLES.md` §1 | 2026-09-08 |
| *"classifies the outcome WITHOUT trusting the process exit code"* | `control/dispatch.py`, module docstring | 2026-09-08 |
| *"decisions are recorded there, never inline in prose"* | `fractal/STRATEGIST-loomwarp.md` §8 | 2026-09-08 |

### The caution this ledger needs, inverted

Marketing copy overstates on purpose. **Self-authored markdown fails the other way: it states intent
in the present tense as though it were implemented**, because it was written to specify rather than
to sell. Every statement above was therefore grounded against the source tree before it was walked in
[`20`](./20-consolidated-guide.md) §7 — and where a design document and the code disagree, **the code
wins and the disagreement is recorded**, in [`20`](./20-consolidated-guide.md) §5. Fifteen were found.

Two mechanical claims were checked and hold: the router is byte-identical to upstream, and all
fifteen `vendor/manifest.json` entries match their recorded hashes at this commit.

---

## Provenance and freshness

> **Read against `loomwarp-team-system` at `8844df6f4bc48f8a563340eb3163401792e000d5` (branch
> `master`), 2026-09-08. A surface that has shipped since is not here.**

The repository was last pushed **2026-09-03T05:06:51Z**, so `8844df6` is `master`'s head and nothing
in the tree is newer than this read. The pin is the same commit the profile used; the read is five
days later.

**Every citation in this set is backticked, never hyperlinked.** The repository is private, so a
markdown link to it resolves for its owner and 404s for everyone else. `check-doc-links.mjs` cannot
catch that, because a backtick is not a link.

**Where the documentation lives, and a caution.** There is no hosted documentation and no docs
directory beyond `docs/`, which holds three files: `ARCHITECTURE.md` (three mermaid diagrams),
`BUILD-LOG.md` (a session account, tagged real / adapted / narrative-only) and `DEMO-SCRIPT.md` (a
timed walkthrough). The load-bearing prose is not there: it is in `fractal/STRATEGIST-loomwarp.md`
(the mandate, the principles, the failure modes), `fractal/ISSUES.md` (the defect register),
`vendor/README.md` (the vendoring contract) and `standards/README.md` (the inheritance contract). A
reader who starts at `docs/` will miss all four.

**Refresh protocol.**

```bash
# Has the pinned commit moved?
gh api repos/shi503/loomwarp-team-system --jq '.pushed_at'
gh api repos/shi503/loomwarp-team-system/commits/master --jq '.sha'

# The vendoring claim, re-checked against both repositories.
gh api repos/shi503/loomwarp-team-system/contents/vendor/manifest.json --jq '.content' | base64 -d

# The two files that carry almost all the behaviour.
gh api repos/shi503/loomwarp-team-system/contents/control/dispatch.py --jq '.content' | base64 -d
gh api repos/shi503/loomwarp-team-system/contents/fractal/router.py --jq '.content' | base64 -d
```

On refresh, update `source_verified` and `version_at_capture` in every file's frontmatter. A
reference document with a stale date is more dangerous than none, because it will be trusted.

**One figure drifted from the profile.** The profile's `8b Evidence` row records
*"three named workstream directories at this read"* under `context/evidence/` (2026-09-03). At this
read (2026-09-08, same commit) the directory is tracked in git with `.gitkeep` only, because
`.gitignore` excludes `context/evidence/*`. Both are true of different things — a working tree and a
committed tree. Both figures are carried, with both dates, in the profile's §6 row.

---

## The documents

| # | Document | Covers |
|---|---|---|
| 01 | [`01-the-vendored-core.md`](./01-the-vendored-core.md) | `router.py`'s five subcommands and three-word state vocabulary; the vendoring contract's three rules; the 15-entry manifest; what the sha256 gate does and does not check |
| 02 | [`02-the-blueprint-and-the-workstream.md`](./02-the-blueprint-and-the-workstream.md) | Every BLUEPRINT field and which program reads it; the four-way disagreement about that split; the two blueprints, their PRDs, and the graph counted |
| 03 | [`03-dispatch-and-outcome-classification.md`](./03-dispatch-and-outcome-classification.md) | The dispatch loop, the assembled prompt, the two invocations; `classify()`'s two regexes run against the shipped templates; evidence, `events.jsonl`, and `reset` |
| 04 | [`04-the-context-fabric.md`](./04-the-context-fabric.md) | `context_bundle` resolution; the org and domain layers; the decision ledger's schema, storage and five ADRs; the four uncoordinated stores |
| 05 | [`05-skill-distribution-and-the-registry.md`](./05-skill-distribution-and-the-registry.md) | `sync-skills.sh`'s rsync-and-receipt mechanism; the registry and its one real consumer; the seven skills and the three counts of them |
| 06 | [`06-policy-tiers.md`](./06-policy-tiers.md) | The four permission files compared entry by entry; who loads them; the `R0`–`R4` ladder beside them |
| 07 | [`07-the-standards-tier.md`](./07-the-standards-tier.md) | The seven guides; the three-rule inheritance contract and its internal tension; the evaluation doctrine's own split |
| 08 | [`08-the-audit-trail.md`](./08-the-audit-trail.md) | `ISSUES.md` as a surface: entry classes, fields, the severity vocabulary, and three practices it demonstrates |
| **20** | [**`20-consolidated-guide.md`**](./20-consolidated-guide.md) | **The synthesis: the mental model, what runs versus what is written, the fifteen disagreements, the recorded absences, and the stated intents walked** |

Read **20** if you have ten minutes. The numbered documents are lookup material.

---

## How to read these

- **Exact names are preserved verbatim.** Field names, flags, regexes, environment variables, file
  paths and identifiers are quoted as the source spells them.
- **Provenance is backticked, not linked.** The form is `` `loomwarp-team-system` @ `8844df6` —
  `control/dispatch.py` ``. Nothing in this set hyperlinks into a private repository.
- **Absences name what was checked**, and are collected in [`20`](./20-consolidated-guide.md) §6.
  None says "appears to lack".
- **Disagreements are recorded, not resolved.** Where a design document and the code differ, both are
  quoted and the code is stated as what runs. No verdict is issued.
- **Nothing here scores.** No coverage marks, no primitive count, no comparison to another harness.
  The profile and the grids do that.
