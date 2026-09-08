---
status: DRAFT
title: "The vendored core — router.py and the vendoring contract"
tier: reference
project: harness-atlas
source: "`loomwarp-team-system` @ `8844df6` (branch `master`, private) — `fractal/router.py`, `vendor/README.md`, `vendor/manifest.json`, `scripts/verify-vendored.mjs`"
version_at_capture: "8844df6f4bc48f8a563340eb3163401792e000d5"
source_verified: "2026-09-08"
---

# The vendored core — `router.py` and the vendoring contract

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `loomwarp-team-system` @ `8844df6` (private), **2026-09-08**.

LoomWarp's central architectural claim is negative: one file is never changed. `vendor/README.md`
states it directly — *"`fractal/router.py` being byte-identical to upstream is a load-bearing
architectural claim… the deterministic router is never forked, never patched."* This document is
what that file does, what the contract around it says, and what the mechanism enforcing it
actually checks.

---

## 1. `router.py` — the whole surface

322 lines, five subcommands, no model call anywhere. It is invoked only as a subprocess, never
imported.

| Command | Reads | Writes | Notes |
|---|---|---|---|
| `init` | blueprint | `.state.json` | Every workstream set to `NOT_STARTED`, wholesale |
| `next` | blueprint, `.state.json` | — | Prints ready workstreams to stdout |
| `update <name> <status>` | `.state.json` | `.state.json` | Exits 1 on an unknown name or status |
| `status` | `.state.json` | — | Counts by category, one percentage |
| `pulse <path>` | a `PULSE.md` | — | Prints `HEARTBEAT_OK` or `HEARTBEAT_ALERT` |

**The state vocabulary is three words.** `NOT_STARTED | IN_PROGRESS | COMPLETE`, enforced in
`cmd_update`'s `valid_statuses` list. There is no `FAILED`, no `BLOCKED`, no `UNKNOWN` — a fact
that matters because the dispatcher above it classifies four outcomes. See
[`03-dispatch-and-outcome-classification.md`](./03-dispatch-and-outcome-classification.md).

**Readiness is two conditions.** `cmd_next`: status is exactly `NOT_STARTED`, and every name in
`dependencies:` reads `COMPLETE`. A missing dependency name is not an error — `state.get(d)` returns
`None`, which is not `COMPLETE`, so the workstream simply never becomes ready.

**Three fields of a workstream are read, and only three.** `feature_lead` (by `cmd_init` and
`cmd_next`), `dependencies` and `model` (by `cmd_next`). `prd`, `repo`, `kebab`, `target_mode`,
`target_agent` and `context_bundle` are never read by this file. Three documents in the tree
disagree about that list — recorded in
[`02-the-blueprint-and-the-workstream.md`](./02-the-blueprint-and-the-workstream.md) §3.

**`pulse` parses the last fenced JSON block.** `re.findall(r"```json\s*\n(.*?)\n```", …)`, takes
`[-1]`, reads `escalation_needed`. No entries prints `HEARTBEAT_OK`; unparseable JSON prints
`HEARTBEAT_ALERT` — the one place in the tree where a parse failure escalates rather than passes.

### Two behaviours a reader hits in the first five minutes

**The default blueprint path is an unresolved placeholder.** `BLUEPRINT_PATH` is
`os.path.join(os.path.dirname(__file__), "BLUEPRINT-{EpicName}.yaml")` — a literal template string.
Every invocation without `--blueprint` raises `FileNotFoundError`.

**A relative `--blueprint` resolves against the router's own directory, not the caller's.**
`_resolve_blueprint_path` joins a non-absolute value to `os.path.dirname(__file__)`, i.e. `fractal/`.
The repository's own audit trail carries this as `ISSUE-003` and states the compounding form: the
dispatcher passes the same string to two consumers with different rules, so *"no relative path
satisfies both."* — [`08-the-audit-trail.md`](./08-the-audit-trail.md).

**`.state.json` is one file, not one per blueprint.** `STATE_PATH` is fixed at module level beside
the router and is unaffected by `--blueprint`; `cmd_update`, `cmd_status` and `cmd_pulse` never
receive a blueprint at all. Running `init` for a second blueprint overwrites the first blueprint's
record, and the path is gitignored, so the loss is not recoverable from git. Carried as `ISSUE-002`,
with the surviving backup committed beside it as `fractal/.state.demo-crossrepo.json.bak`.

---

## 2. The vendoring contract — three rules, in its own words

From `vendor/README.md`:

1. *"**Vendored files are never edited in place.** If a file is listed in `vendor/manifest.json`, do
   not modify it… an edited 'vendored' file is a lie the verifier can no longer catch, because the
   manifest hash would just be updated to match."*
2. *"**Improvements land as additive overlays alongside the vendored file, not inside it.**"*
3. *"**An upgrade is a manifest SHA bump plus a reviewed diff.** There is no version to bump and no
   package to update."*

The justification for copying rather than depending is stated as a fact about upstream: *"upstream
ships zero tags, zero releases, and no installable package. Its documented install mechanism *is*
`cp -r example-claude .claude`."*

---

## 3. `vendor/manifest.json` — what is recorded

One upstream block (`shi503/fractal-agent-system`, commit `6398f6db059598e381336601b21609928cf24034`,
dated 2026-04-20, resolved 2026-08-04) and **15 entries**, each with `upstream_source_path`,
`local_destination_path`, `sha256` and `status`.

| Group | Count | Entries |
|---|---|---|
| Router | 1 | `fractal/router.py` |
| Skills | 6 | `commit-summarize`, `fractal-init`, `gap-analysis`, `handoff`, `pulse`, `quality-pass` |
| Policy | 4 | `policy/tier-{1,2,3,4-auto}.json`, from upstream `docs/permission-templates/` |
| Agent roles | 4 | `.claude/agents/{architect,feature-lead,strategist,sub-agent}.md` |

Every entry carries `"status": "unmodified"`. Two files in those same directories are deliberately
absent because they are LoomWarp's own: `skills/cross-repo-dispatch/` (stated in `vendor/README.md`)
and `.claude/agents/loomwarp-cto-architect.md` (not stated anywhere in the manifest or its README).

## 4. `verify-vendored.mjs` — what the gate actually checks

`scripts/verify-vendored.mjs` recomputes the sha256 of each entry's `local_destination_path` under
`--root` and compares it to the recorded hash; a mismatch or a missing file exits 1. It rejects any
`hash_algorithm` other than `sha256` and any manifest with an empty `entries` array.

**It never reads `upstream_source_path`, and it never contacts upstream.** The invariant it enforces
is *this file has not changed since its hash was recorded* — not *this file matches upstream*. The
two are different claims, and only the first is mechanical.

**Both claims were checked directly at this read**, by hashing the blobs from each repository's API
at the pinned commits:

| Check | Result |
|---|---|
| All 15 `local_destination_path` files vs. their recorded `sha256`, at `8844df6` | **15/15 match** — the gate passes at this commit |
| 14 of 15 `upstream_source_path` files in `fractal-agent-system` @ `6398f6d` vs. the same hashes | **14/14 match** |
| `example-claude/fractal/router.py` @ `6398f6d` | **404 — no such path** |

The router's path is recorded with the wrong case. Upstream at `6398f6d` carries
`example-claude/FRACTAL/router.py`, `.claude/fractal/router.py` and `ROUTING_LOGIC/router.py`; all
three hash to `28b1f0e5…`, the manifest's recorded value. **The byte-identity claim holds; the
recorded re-vendor path does not resolve as spelled**, and the `cp` step in `vendor/README.md`'s
re-vendoring recipe copies that path verbatim. Nothing catches it, because the verifier does not
read that field.

---

## 5. One recorded resolution the manifest does not carry

`fractal/ISSUES.md` `FINDING-006` (2026-08-05) tests upstream's documented `*.local.md` agent-overlay
mechanism, finds it inert against current Claude Code, and records a consequence for this contract:
*"That rule cannot hold for agent definitions, because the only mechanism that reads a correction is
the agent file itself."* Its stated resolution:

> agent definitions move **out of the vendored set** and become LoomWarp-owned. `vendor/manifest.json`
> keeps their provenance… but stops asserting byte-identity for them.

At `8844df6` — a month later — all four agent entries still read `"status": "unmodified"`, and
`vendor/README.md` still lists them under *"What's recorded"* without qualification. The four files
are in fact still byte-identical to upstream (§4), so the assertion is true; the decision to stop
making it was not applied.
