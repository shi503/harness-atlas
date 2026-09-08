---
status: DRAFT
title: "Rig — a registered repo, a bead prefix, and an agent scope"
tier: reference
project: harness-atlas
source: "gastownhall/gascity @ 042e965 · docs/getting-started/how-gas-city-works.md · docs/reference/config.md · docs/reference/cli.md · docs/reference/internal/beads-topology.md"
version_at_capture: "main/edge 042e965 (v1.4.1 is the latest release, 2026-08-15)"
source_verified: "2026-09-08"
---

# Rig — a registered repo, a bead prefix, and an agent scope

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `gastownhall/gascity` at **`042e965`**, **2026-09-08**.

*"A rig is where the work happens — an external project, usually a git repo, registered with the
city with `gc rig add <path>`. A rig carries a repo, its own **bead namespace**, and an **agent
scope**. Its directory can live anywhere on disk, inside or outside the city."*
— `docs/getting-started/how-gas-city-works.md`

Rig is the one primitive with **no code substrate layer of its own**. `nine-concepts.md` says so
directly: *"The substrate has no separate layer for **Rig** … it is a config-declared location that
work runs in."* Which is why everything a rig *is* shows up as configuration, a prefix, and a name
qualifier — the three sections below.

---

## 1. What registration does

`gc rig add <path>` *"Initializes beads database, installs agent hooks if configured, generates
cross-rig routes, and appends the rig to `city.toml`. If the target directory doesn't exist, it is
created."*

Flags worth knowing, with the reference's own semantics:

| Flag | Effect |
|---|---|
| `--name` | rig name; *"default: directory basename"* |
| `--prefix` | bead ID prefix; *"default: derived from name"* |
| `--include` | *"pack source or pack name for rig agents (repeatable; writes canonical rig imports)"* — described as *"compatibility sugar"* |
| `--default-branch` | overrides the probe below |
| `--start-suspended` | *"add rig in suspended state (dormant-by-default)"* — *"The rig's agents won't spawn until explicitly resumed"* |
| `--adopt` | *"register a directory that already has a fully initialized `.beads/` directory (must include both `metadata.json` and `config.yaml`)"*; for managed-Dolt rigs it *"runs an idempotent config sync … never destructively reinitializes"* |
| `--allow-ephemeral` | *"register the rig even though its path is on a filesystem that does not survive a restart"* |
| `--git-url` + `--request-id` | clone into a new rig on a **remote** city; the request id is an *"idempotency key … reuse it to resume/retry a provision"* |

**Branch detection is a probe with a stated fallback ladder and a visible answer.** By default
`gc rig add` *"probes the repo's remote HEADs — origin first, then any other configured remote —
and falls back to the currently checked-out branch, then stores the result in `city.toml`."*
*"The banner reports which remote answered, or says the branch was inferred when no remote HEAD is
set."* The stored value is what routing formulas use *"instead of probing origin/HEAD at sling
time"*, and it surfaces to every shell-command template as `{{.DefaultBranch}}` — which
`docs/reference/config.md` warns *"is never probed from git, so scripts should keep their own
origin/HEAD fallback."*

---

## 2. Isolation is a prefix, not a database

*"Isolation is by bead-ID prefix, not a separate database: the city and all its rigs share one
underlying store, and reads and writes are filtered to the current scope's prefix. Work slung in one
rig stays logically isolated from the others, and rig-scoped agents are instantiated once per rig."*

The mechanics — one Dolt server, `issue_prefix` as a hard query filter, and the
`bd show <other-rig-bead>` failure that surprises people — are in
[`03-bead.md`](./03-bead.md) §2.

Two config keys break the shared-server assumption when a rig's database genuinely lives elsewhere:
`dolt_host` and `dolt_port`. The port key has a visible side effect worth knowing:
*"When set, controller commands (`scale_check`, `work_query`) prefix their shell invocations with
`BEADS_DOLT_SERVER_PORT=<port>` so `bd` connects to the correct server."*

---

## 3. The rig name is an identity prefix — the path is not

`docs/guides/understanding-packs.md` states the distinction twice because it is the most common
confusion:

> *"The rig `name` becomes the identity prefix. The rig `path` is the filesystem location of the
> project. These are different pieces of information."*

A city-level import of a pack defining a city-scoped `planner` yields the runtime agent
`gascity.planner`. The **same pack** imported under `[rigs.imports.gascity]` for a rig named
`checkout-service`, defining a rig-scoped `planner`, yields `checkout-service/gascity.planner`. The
rig prefix and the import binding are separate qualifiers and both apply.

In an agent patch, `dir` selects the rig: *"Here, `dir` is the rig name, not the rig path."*

**Agent scope** decides where a pack's agent may load at all — three states, from the same page:

| `scope` | Meaning |
|---|---|
| omitted | *"eligible for city-level and rig-level loading"* |
| `city` | *"loads only when the pack is imported at the city level"* |
| `rig` | *"loads only when the pack is imported for a rig"* |

*"The scope says where the definition is available. It does not name a particular rig."*

---

## 4. Rig-level configuration

The generated `Rig` struct carries 18 fields. The ones that are not simple overrides:

| Field | What it does |
|---|---|
| `formulas_dir` | *"a rig-local formula directory — the highest-priority formula layer, above city pack formulas, the city `formulas/` directory, and rig pack formulas. Overrides pack formulas for this rig by filename."* |
| `formula_vars` | rig-scoped defaults for formula `[vars.<name>]`; *"Takes precedence over formula-level defaults but loses to `--var` flags"* |
| `default_sling_target` | the agent used *"when `gc sling` is invoked with only a bead ID"* |
| `default_sling_targets` | the plural form — *"targetless `gc sling` picks one entry at random each dispatch"*; takes precedence over the singular |
| `imports` | the V2 mechanism; `includes` is the V1 one, deprecated in favour of it |
| `patches` | the V2 name for `overrides`; *"Takes precedence over Overrides if both are set"* |
| `suspended_on_start` | the desired state at city start; *"Once the user has explicitly suspended or resumed the rig via `gc rig suspend/resume`, the runtime state wins"* (in `.gc/runtime/suspension-state.json`). The older `suspended` is *"the deprecated pre-runtime-state suspension flag"*, kept as an alias, flagged by `gc doctor --fix` |

Lifecycle commands: `gc rig add` · `list` · `remove` · `restart` · `resume` · `suspend` ·
`status` · `set-endpoint`.

---

## 5. Estate operations

Three runbooks cover a rig estate at scale, and they are the only pages in `docs/` written for an
operator rather than a builder:

| Runbook | Covers |
|---|---|
| `docs/runbooks/managed-city-endpoints.md` | endpoint management for a managed city |
| `docs/runbooks/remote-hardened-city.md` | a hardened remote deployment |
| `docs/runbooks/split-storage-classes.md` | serving a storage class from its own `[storage]` binding |

The machine-wide layer above a city is the **supervisor** — *"the always-on host process"* —
addressed with `gc supervisor install` / `start` / `status` / `reload` / `stop` / `uninstall` and
`gc cities list`. A supervisor-scope event stream merges every city's bus and adds a `city` field
to each line; see [`07-event.md`](./07-event.md) §2.
