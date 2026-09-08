---
status: DRAFT
title: "LoomWarp — the consolidated guide"
tier: reference
project: harness-atlas
source: "`loomwarp-team-system` @ `8844df6` (branch `master`, private) — `README.md`, `docs/`, `fractal/`, `standards/`, `skills/`, `control/`, `policy/`, `context/`, `registry/`, `vendor/`, `.claude/agents/`"
version_at_capture: "8844df6f4bc48f8a563340eb3163401792e000d5"
source_verified: "2026-09-08"
---

# LoomWarp — the consolidated guide

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `loomwarp-team-system` @ `8844df6` (private), **2026-09-08**.

One pass over the control plane for a reader with ten minutes. Every claim here is sourced in a
numbered document; this page carries the shape.

---

## 1. The mental model

**An unmodified core, extended only by addition.** One 322-line Python file, `router.py`, holds a
dependency-driven state machine with no model call in it, and is copied byte-for-byte from an
upstream repository. Everything LoomWarp does is arranged around never touching it: cross-repo
behaviour arrives as **extra YAML keys** the router ignores, corrections arrive as **overlays beside**
vendored files, and improvements arrive as **new files**. The word the tree uses for itself,
repeatedly, is *additive*.

**Work is a filesystem contract, not a protocol.** A workstream is a BLUEPRINT entry plus a markdown
PRD. The dispatcher assembles a prompt, spawns `claude -p` in the target repository, and then reads
the outcome **off the filesystem** — a `HANDOFF.md` or a `PULSE.md` at a hard-coded path — because
its governing rule is to classify *"WITHOUT trusting the process exit code."* Nothing is returned
over a channel; the agent writes a file and the controller looks for it.

**Two layers with a narrow seam.** Below: the vendored core and its three-word state vocabulary.
Above: a 345-line dispatcher with a four-outcome vocabulary. The seam is one call — `router.py update
<name> COMPLETE` — and it fires for exactly one of the four outcomes. Everything else the dispatcher
learns stays in evidence files that the router never sees.

**The estate is a directory of submodules.** A registry names two sibling repositories; skills are
pushed into them by `rsync`; the shared contract they both read is a markdown file in `context/`.
Federation here means one checkout containing others, not a service that talks to them.

---

## 2. The five things to know first

1. **`--permission-mode bypassPermissions` is a literal in the dispatch command**, not a
   configuration. The four `policy/tier-*.json` files are templates for a target repository's own
   `settings.json`; nothing in this repository loads them, and the headless path skips them.
   — [`03`](./03-dispatch-and-outcome-classification.md), [`06`](./06-policy-tiers.md)
2. **The outcome classifier's two regexes are asymmetric.** `PASS` matches at the start of a cell and
   tolerates trailing text; `FAIL` matches only a cell containing nothing else. A HANDOFF written
   from either shipped template, placeholders intact, classifies as `COMPLETE`.
   — [`03`](./03-dispatch-and-outcome-classification.md) §4
3. **Only `COMPLETE` reaches the router.** `FAILED`, `BLOCKED` and `UNKNOWN` have no representation
   in the state file, so such a workstream stays `NOT_STARTED` and is re-dispatched on the next run,
   with no attempt counter. — [`01`](./01-the-vendored-core.md), [`03`](./03-dispatch-and-outcome-classification.md)
4. **State lives in four uncoordinated places** — `.state.json`, `context/evidence/`,
   `control/events.jsonl`, and the decision ledger — sharing no identifier and no join.
   — [`04`](./04-the-context-fabric.md) §6
5. **The router reads three workstream fields.** `feature_lead`, `model`, `dependencies` — not `prd`,
   which two BLUEPRINT headers and a distributed skill place among them.
   — [`02`](./02-the-blueprint-and-the-workstream.md) §3

---

## 3. Choosing a surface

| You want to… | Use | Document |
|---|---|---|
| Add a unit of work and its ordering | A BLUEPRINT entry plus a PRD file | [`02`](./02-the-blueprint-and-the-workstream.md) |
| Give a workstream standing context | `context_bundle:` paths | [`04`](./04-the-context-fabric.md) |
| Change which agent role runs it | `target_agent:`, and a role file in `.claude/agents/` | [`02`](./02-the-blueprint-and-the-workstream.md) |
| Run it unattended or hand it to a person | `target_mode: headless` or anything else | [`03`](./03-dispatch-and-outcome-classification.md) |
| Bound cost or wall clock | `LOOMWARP_DISPATCH_MAX_BUDGET`, `LOOMWARP_DISPATCH_TIMEOUT_SEC` | [`03`](./03-dispatch-and-outcome-classification.md) |
| Distribute a capability to sibling repositories | A directory under `skills/`, then `control/sync-skills.sh` | [`05`](./05-skill-distribution-and-the-registry.md) |
| Add a repository to the estate | An entry in `registry/repositories.yaml` | [`05`](./05-skill-distribution-and-the-registry.md) |
| Constrain what a target repository may run | Copy a `policy/tier-*.json` into its `settings.json` | [`06`](./06-policy-tiers.md) |
| State what good work is | A guide under `standards/`, referenced by a `context_bundle` | [`07`](./07-the-standards-tier.md) |
| Record a decision | An ADR through the decision ledger's CLI | [`04`](./04-the-context-fabric.md) §4 |
| Record a defect in the harness itself | An appended entry in `fractal/ISSUES.md` | [`08`](./08-the-audit-trail.md) |
| Upgrade something vendored | A manifest SHA bump plus a reviewed diff | [`01`](./01-the-vendored-core.md) §2 |

---

## 4. What actually runs, and what is written down

The control plane has few executable parts and a great deal of prose. Sorting them is the fastest way
to read the repository accurately.

**Executes.** `fractal/router.py` (vendored), `control/dispatch.py`, `control/sync-skills.sh`,
`scripts/verify-vendored.mjs` and five sibling `check-*.mjs` scripts, and the decision ledger's
TypeScript storage and validator.

**Is read by a model at run time.** A workstream's PRD, the files its `context_bundle` names, the
`.claude/agents/*.md` role file the `--agent` flag selects, and whatever skills `sync-skills.sh` put
in the target repository.

**Is read by people only.** `README.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-LOG.md`,
`docs/DEMO-SCRIPT.md`, `fractal/STRATEGIST-loomwarp.md`, `fractal/ISSUES.md`, `vendor/README.md`,
`standards/` unless a bundle names a guide, and `registry/repositories.yaml` beyond its `path:` lines.

**Nothing at all reads.** `policy/*.json` — within this repository. They are copied out by hand.

**No CI runs any of it.** There is no `.github/` directory at this commit, which the repository's own
`standards/evaluation-doctrine.md` §10 addresses directly: *"An eval not in CI is not a gate."*

---

## 5. Where the code and a design document disagree

The rule applied throughout this set: **where a design document and the source tree disagree, the
code wins and the disagreement is recorded.** Fifteen were found within the agreed scope. None is
graded; each names both sides and the document that carries the detail.

| # | The document says | The code does | Detail |
|---|---|---|---|
| 1 | `docs/ARCHITECTURE.md`'s dispatch diagram labels the headless invocation `--permission-mode acceptEdits` | `dispatch_headless` passes `bypassPermissions`, with an `ADR-005` comment explaining why | [`03`](./03-dispatch-and-outcome-classification.md) §3 |
| 2 | Three documents describe a *"standalone `PASS` table cell"* | `\|\s*PASS\b[^\|]*\|` matches a cell that merely begins with `PASS` | [`03`](./03-dispatch-and-outcome-classification.md) §4 |
| 3 | `context/org/PRINCIPLES.md` §1: *"Deny wins… cannot be weakened"*, loaded into the dispatched prompt | The dispatcher shipping that text disables deny rules for the same run | [`04`](./04-the-context-fabric.md) §2 |
| 4 | `context/org/PRINCIPLES.md` §6 cites *"the BLOCKED-file convention in `control/dispatch.py`"* | No such named convention; a generic `{OUTCOME}.md` write, and a `.gitignore` pattern (`BLOCKED-*.md`) matching neither | [`04`](./04-the-context-fabric.md) §2 |
| 5 | Both BLUEPRINT headers and `skills/cross-repo-dispatch/SKILL.md` list `prd` among the fields the router reads | `router.py` reads `feature_lead`, `model`, `dependencies` | [`02`](./02-the-blueprint-and-the-workstream.md) §3 |
| 6 | `BLUEPRINT-LoomWarp-V1.yaml`'s header: *"10 workstreams and 10 edges… resolving in 9 waves"* | 11 workstreams, 11 edges, 10 waves | [`02`](./02-the-blueprint-and-the-workstream.md) §5 |
| 7 | The same header: *"the two Phase-1 human-mode PRDs are authored"* | Phase 1 has one human-mode workstream | [`02`](./02-the-blueprint-and-the-workstream.md) §4 |
| 8 | `registry/repositories.yaml`'s header: *"dispatch.py reads this to resolve repo paths"* | `dispatch.py` never opens the registry; it uses the workstream's `repo:` field. `sync-skills.sh` is the only reader | [`05`](./05-skill-distribution-and-the-registry.md) §1 |
| 9 | `docs/BUILD-LOG.md` and `docs/ARCHITECTURE.md` count *"5 vendored + cross-repo-dispatch"* skills | Seven directories; `vendor/manifest.json` records six as vendored | [`05`](./05-skill-distribution-and-the-registry.md) §4 |
| 10 | `docs/BUILD-LOG.md` describes skill distribution as a `cp -r` copy | `sync-skills.sh` is `rsync --delete` scoped per skill, with a `.synced-from-loomwarp` receipt driving removal — the header of which states it *replaced* the `cp -r` loop | [`05`](./05-skill-distribution-and-the-registry.md) §3 |
| 11 | `FINDING-006`'s resolution: agent definitions *"move out of the vendored set… stops asserting byte-identity for them"* | All four still carry `"status": "unmodified"` a month later, and `vendor/README.md` still lists them unqualified | [`01`](./01-the-vendored-core.md) §5 |
| 12 | `vendor/manifest.json` records `example-claude/fractal/router.py` as the upstream source path | Upstream at `6398f6d` has `example-claude/FRACTAL/router.py`; the recorded path 404s, and the verifier never reads the field | [`01`](./01-the-vendored-core.md) §4 |
| 13 | `router.py`'s `cmd_next` docstring: *"Prints the names… one per line"* | Prints `  -> {name}  [model: {model}]` under a header — the format `dispatch.py`'s regex depends on | [`03`](./03-dispatch-and-outcome-classification.md) §1 |
| 14 | `fractal/ISSUES.md`'s header declares three severities: `CRITICAL · WARN · MINOR` | Three entries use `OBSERVATION`, `DESIGN-BLOCKING`, `INFORMATIONAL`; none uses `MINOR` | [`08`](./08-the-audit-trail.md) §1 |
| 15 | `control/events.jsonl` carries a `dispatch_end` for `mode: "human"` with a `note` field | `dispatch_human` emits only `dispatch_printed`; no `log_event` call has a `note` key | [`03`](./03-dispatch-and-outcome-classification.md) §6 |

Two mechanical claims were checked and **hold**: `fractal/router.py` is byte-identical to upstream
(all three of upstream's copies hash to the manifest's recorded value), and all fifteen manifest
entries match their recorded hashes at this commit, so `verify-vendored.mjs` passes here.

---

## 6. Where the documentation stops

Absences recorded across this set, each naming what was checked:

- **No schema for `control/events.jsonl`** — checked `control/`, `context/memory/decision-ledger/schema/`,
  `standards/`, `registry/`, `policy/` and `vendor/`; the only schema files in the tree are the
  decision ledger's `schema.yaml` and `people.yaml`, which describe ADR entries.
  [`03`](./03-dispatch-and-outcome-classification.md) §6
- **No mapping between the `R0`–`R4` risk tiers and the four `policy/tier-*.json` files** — checked
  `standards/evaluation-doctrine.md`, `standards/README.md`, `policy/*.json`,
  `context/org/PRINCIPLES.md` and `fractal/STRATEGIST-loomwarp.md`.
  [`06`](./06-policy-tiers.md) §5
- **No definition of the `F`-numbered function register inside this scope** — `F5` and `F7` are cited
  in `standards/`; checked `standards/`, `README.md`, `docs/`, `fractal/`, `control/`, `policy/`,
  `context/`, `registry/` and `vendor/`. The register sits in the design-specification tree, which
  this set's scope excludes. [`07`](./07-the-standards-tier.md) §4
- **No attempt counter or retry bound anywhere** — checked `control/dispatch.py`, `fractal/router.py`
  and `control/sync-skills.sh`, against `standards/evaluation-doctrine.md` §2's *"Two-attempt
  maximum."* [`03`](./03-dispatch-and-outcome-classification.md) §4
- **No record of the resolved context set** — checked `control/dispatch.py`'s prompt assembly and
  evidence write, and `context/evidence/`'s two file shapes. The bundle exists only inside the argv
  string for a headless run. [`04`](./04-the-context-fabric.md) §1
- **No CI configuration** — checked for `.github/` at this commit; absent.
  [`07`](./07-the-standards-tier.md) §3

---

## 7. What the system says it is for, walked against what this set documented

The stated-intent ledger in [`00-README.md`](./00-README.md) records what LoomWarp's own markdown says
it is, cited to file and commit. This walks each statement to the mechanism behind it.

**This maps; it does not grade.** A row names the document carrying the mechanism, or records that
nothing was found and says what was checked, or says the statement falls outside this set's scope.
There is no verdict column and none is implied.

| Stated intent, abbreviated | Mechanism, and where it is documented |
|---|---|
| *"a distributed context harness for structuring many threads of work into one coordinated system"* | One BLUEPRINT resolving a dependency graph across repositories, dispatched per workstream — [`02`](./02-the-blueprint-and-the-workstream.md), [`03`](./03-dispatch-and-outcome-classification.md) |
| *"LoomWarp is the name and story; `workstream` stays the word the code and docs actually use"* | Held throughout: the code, the blueprints, the skills and the agent roles all use `workstream`, `BLUEPRINT`, `router`, `HANDOFF`, `Feature Lead`; `thread`, `weave` and `pattern` appear only in `README.md` — [`02`](./02-the-blueprint-and-the-workstream.md) |
| *"deterministic decomposition, dependency resolution, and dispatch… with zero model in the decision loop"* | `router.py` contains no model call; `dispatch.py` makes no model call outside the dispatched subprocess — [`01`](./01-the-vendored-core.md), [`03`](./03-dispatch-and-outcome-classification.md) |
| *"the deterministic core is never forked, never patched"* | The vendoring contract, the manifest, and a sha256 gate — verified at this read for all 15 entries and, against upstream, for the router — [`01`](./01-the-vendored-core.md) §3–4 |
| *"whose defining feature is context provenance… what context the agent saw, at which version, under which policy, and what evidence resulted"* | **Partly mechanised, and recorded as an absence for the rest.** `context_bundle` resolves *what*; nothing records the version, the hash, or the policy decision, and the resolved set is not persisted for a headless run. Checked `control/dispatch.py`, `context/evidence/`, `control/events.jsonl` — [`04`](./04-the-context-fabric.md) §1, §6 |
| *"a virtual monorepo that makes an estate discoverable without merging it"* | `registry/repositories.yaml` plus git submodules; two entries, the control repository itself absent — [`05`](./05-skill-distribution-and-the-registry.md) §1 |
| *"a standards carrier… distributed as capability packages rather than tribal knowledge"* | Two mechanisms, and they are separate: `standards/` reaches an agent only through a `context_bundle` path; `skills/` reaches a sibling repository through `sync-skills.sh` — [`07`](./07-the-standards-tier.md), [`05`](./05-skill-distribution-and-the-registry.md) |
| *"Tool trace is truth… Terminal state is derived from evidence artifacts, not from the subprocess return value"* | `classify()` ignores the exit code and reads a HANDOFF or a PULSE — and derives that state by regex over markdown, which the same guide's next rule forbids — [`03`](./03-dispatch-and-outcome-classification.md) §4 |
| *"Never parse prose for structure… Emit structured evidence"* | **No mechanism found.** Checked `control/dispatch.py`'s classifier and evidence write, `control/events.jsonl` and every schema file in the tree. The intended remedy is an unauthored workstream, `FeatureLead-StructuredEvidence` — [`02`](./02-the-blueprint-and-the-workstream.md) §4 |
| *"Every event validates against a schema"* | **No mechanism found.** Checked as above; no schema for the event stream exists — [`03`](./03-dispatch-and-outcome-classification.md) §6 |
| *"`bypassPermissions` banned by a mechanical check, not a convention"* (FM-2's guard) | **No mechanism found.** Checked `control/`, `scripts/` names, `policy/` and the absent `.github/`. The literal remains in `dispatch_headless` — [`06`](./06-policy-tiers.md) §4 |
| *"No status table survives without a machine check"* (FM-3's guard) | **No mechanism found for the control plane's own status tables.** Checked `docs/ARCHITECTURE.md`'s BUILT/PARTIAL/DESIGNED-ONLY labels, `docs/BUILD-LOG.md`'s real/adapted/narrative table, and the five `scripts/check-*.mjs` names, none of which is wired to run — [`07`](./07-the-standards-tier.md) §3 |
| *"Runnable beats documented. A repo a second person cannot run has no verified claims"* | The blocking mechanism is stated in the tree rather than solved: a private submodule in `.gitmodules`, no `LICENSE`, and `ISSUE-003`'s unrunnable documented command — [`05`](./05-skill-distribution-and-the-registry.md) §1, [`08`](./08-the-audit-trail.md) |
| *"Product-AI evaluation… LoomWarp does **not** do this. It gives teams the doctrine"* | Delivered as doctrine by construction — `standards/evaluation-doctrine.md` Part II, §5–§11 — [`07`](./07-the-standards-tier.md) §3 |
| *"decisions are recorded there, never inline in prose"* | The decision ledger: a schema, a validator, atomic writes, locks, an append-only audit, a SQLite index, five ADRs — [`04`](./04-the-context-fabric.md) §4 |
| *"clarity on 'how we work' and 'what good looks like'"* | 970 lines under `standards/`, with a three-rule inheritance contract — [`07`](./07-the-standards-tier.md) |
| *"an opinionated structure to how your project is structured (virtual mono-repo)"*, item 1 of `README.md`'s four | The submodule-plus-registry layout — [`05`](./05-skill-distribution-and-the-registry.md) §1 |
| *"provides requirements, frameworks, and integrations"* — the "integrations" half | **Outside this set's scope.** No integration surface exists in the control plane's directories; the statement is about the product's intended reach, and this set is cut by what is in the repository at this commit |
