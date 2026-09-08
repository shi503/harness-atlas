---
status: DRAFT
title: "The BLUEPRINT and the workstream"
tier: reference
project: harness-atlas
source: "`loomwarp-team-system` @ `8844df6` (branch `master`, private) — `fractal/BLUEPRINT-CrossRepo-Demo.yaml`, `fractal/BLUEPRINT-LoomWarp-V1.yaml`, `fractal/workstreams/`, `fractal/router.py`, `control/dispatch.py`, `skills/cross-repo-dispatch/SKILL.md`, `context/memory/decision-ledger/store/ADR-001.md`"
version_at_capture: "8844df6f4bc48f8a563340eb3163401792e000d5"
source_verified: "2026-09-08"
---

# The BLUEPRINT and the workstream

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `loomwarp-team-system` @ `8844df6` (private), **2026-09-08**.

A unit of work is a **workstream**: one YAML entry in a BLUEPRINT plus one markdown PRD file. The
repository's `README.md` makes the naming a stated decision rather than an accident —

> LoomWarp is the *name and story*; `workstream` stays the *word* the code and docs actually use.

— because several candidate brand words (`worktree`, `fork`, `pattern`) *"already carry specific,
different meanings inside Claude Code and agent-harness tooling."*

---

## 1. The file shape

A BLUEPRINT is a YAML **list of phases**, each with `name:` and `workstreams:`. Both consumers
iterate `for phase in data: for ws in phase["workstreams"]`, so a phase is a grouping for readers
only — nothing in either program treats a phase as a barrier. Sequencing comes entirely from
`dependencies:`.

Two blueprints exist at this commit:

| File | Phases | Workstreams | Dependency edges |
|---|--:|--:|--:|
| `fractal/BLUEPRINT-CrossRepo-Demo.yaml` | 1 | 2 | 0 |
| `fractal/BLUEPRINT-LoomWarp-V1.yaml` | 6 | 11 | 11 |

## 2. Every field, and which program reads it

| Field | `router.py` | `dispatch.py` | Value |
|---|:-:|:-:|---|
| `feature_lead` | yes | yes | The workstream's identity — the state-file key, the `--agent` target's name, the evidence directory name |
| `model` | yes | | Printed in `next`'s output only. **Nothing passes it to the CLI** — `dispatch_headless` builds no `--model` flag |
| `dependencies` | yes | | List of `feature_lead` values that must read `COMPLETE` |
| `prd` | | yes | Path, resolved against the repo root, read into the prompt |
| `repo` | | yes | Path to the target repository, resolved against the repo root |
| `target_agent` | | yes | Passed as `--agent`; defaults to `feature-lead` |
| `target_mode` | | yes | `headless` spawns; anything else prints |
| `kebab` | | yes | The workstream directory name under the target's `.claude/fractal/workstreams/` |
| `context_bundle` | | yes | List of paths concatenated into the prompt ahead of the PRD |

`model` is the one field read by neither consumer for effect. `router.py` prints it; `dispatch.py`
parses it back out of that printed line and discards it.

## 3. Three documents disagree about that split

The mechanism is the harness's own load-bearing claim — *"the cross-repo extension required no
changes to the deterministic core"* — so which fields are "standard" is not cosmetic.

| Source | Says the router reads | Says is additive |
|---|---|---|
| Both BLUEPRINT headers | `feature_lead`, `model`, `prd`, `dependencies` | `repo`, `target_agent`, `target_mode`, `kebab`, `context_bundle` |
| `skills/cross-repo-dispatch/SKILL.md` | `feature_lead`, `model`, `prd`, `dependencies` | `repo`, `target_agent`, `target_mode`, `kebab`, `context_bundle` |
| `ADR-001` | `feature_lead`, `model`, `dependencies` | `repo`, `target_agent`, `target_mode`, `context_bundle`, `prd` |
| **`fractal/router.py`** | **`feature_lead`, `model`, `dependencies`** | everything else |

`prd` is not read by `router.py`. The two blueprint headers and the distributed skill place it among
the fields the router reads; `ADR-001` places it among the additive ones and matches the code, while
omitting `kebab`. The headers' own supporting sentence is nonetheless accurate about the mechanism —
upstream's `BLUEPRINT-M1-CoreDataModel.yaml` already carries a `prd:` the router ignores, which is
precisely why the extension needed no fork.

## 4. What a PRD is, and how many exist

A PRD is plain markdown at the `prd:` path. Nothing parses it: `build_prompt_for` reads the file and
concatenates it. There is no schema, no required section, no validation — the structure a PRD has is
the structure the reading agent expects, described in `.claude/agents/feature-lead.md`.

`fractal/workstreams/` holds nine files at this commit: `architecture-rebuild.md`,
`backend-webhook-endpoint.md`, `fractal-regrounding.md`, `framework-v1.md`,
`frontend-activity-badge.md`, `harness-map-v1.md`, `presentation-rewrite.md`,
`process-amendment.md`, `vendor-provenance.md`.

**Eight of `BLUEPRINT-LoomWarp-V1.yaml`'s eleven `prd:` paths do not exist**: `workspace-topology.md`,
`install-path.md`, `structured-evidence.md`, `test-harness.md`, `policy-enforcement.md`,
`context-provenance.md`, `dependency-proof.md`, `v1-evidence.md`. The blueprint declares this as
deliberate and names the consequence:

> PRD availability: Phase 0 and the two Phase-1 human-mode PRDs are authored. The remaining PRDs are
> authored at their phase boundary… `dispatch.py` will fail on a missing `prd:` path, so the Architect
> authors the next phase's PRDs before advancing the router.

Two details of that note do not match the file it heads. Phase 1 contains **one** human-mode
workstream (`FeatureLead-PresentationRewrite`), not two. And the failure is uncaught: `open()` inside
`build_prompt_for` raises `FileNotFoundError` out of `cmd_run`'s loop, so a missing PRD aborts the
whole invocation — including any sibling workstream in the same ready wave that was going to run
before it.

## 5. The graph, counted

The same header states the graph's size: *"10 workstreams and 10 edges across six phases, resolving
in 9 waves with one genuine parallel wave (WorkspaceTopology + PresentationRewrite)."*

Counted from the YAML at this commit: **11 workstreams, 11 edges, six phases, 10 waves**, with the
named parallel wave present exactly as described. The three figures are jointly one short, and are
consistent with the graph excluding its last workstream, `FeatureLead-V1Evidence`.

Waves, from `NOT_STARTED` with `next` re-run after each completion:

1. `VendorProvenance` → 2. `FractalRegrounding` → 3. `WorkspaceTopology` + `PresentationRewrite` →
4. `InstallPath` → 5. `StructuredEvidence` → 6. `TestHarness` → 7. `PolicyEnforcement` →
8. `ContextProvenance` → 9. `DependencyProof` → 10. `V1Evidence`.

The demo blueprint has zero edges, which the V1 header names as the reason this one exists: *"the
resolver's core claim has never been exercised."*

## 6. `kebab` and the two FRACTAL roots

`kebab` is not derived; it is authored per workstream, and it is what `dispatch.py` uses to find
evidence — `{repo}/.claude/fractal/workstreams/{kebab}/HANDOFF.md`. That path is hard-coded.

The control repository keeps its own FRACTAL at `fractal/`, not `.claude/fractal/`. A workstream with
`repo: .` therefore writes its HANDOFF where the classifier does not look, which is `ISSUE-001`. The
recorded interim mitigation was to instruct the agent, in its PRD, to write at the classifier's path
instead — *"a workaround at the PRD layer, not a fix — it leaves two conventions live in one repo."*
Both roots are present at this commit: `fractal/` and `.claude/fractal/workstreams/` with two
workstream directories under it.
