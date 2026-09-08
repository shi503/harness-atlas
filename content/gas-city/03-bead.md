---
status: DRAFT
title: "Bead — the universal substrate, and the one Dolt server underneath it"
tier: reference
project: harness-atlas
source: "gastownhall/gascity @ 042e965 · docs/getting-started/how-gas-city-works.md · docs/reference/internal/beads-topology.md · engdocs/architecture/nine-concepts.md"
version_at_capture: "main/edge 042e965 (v1.4.1 is the latest release, 2026-08-15)"
source_verified: "2026-09-08"
---

# Bead — the universal substrate, and the one Dolt server underneath it

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `gastownhall/gascity` at **`042e965`**, **2026-09-08**.

*"A bead is what the work is — one unit with an ID, title, status, and type, moving `open` →
`in_progress` → `closed`. Beads are also the universal store: tasks, inter-agent mail, running
sessions, and convoys are all beads that differ only by `type`, sharing one query interface."*
— `docs/getting-started/how-gas-city-works.md`

---

## 1. Everything is a bead

`engdocs/architecture/nine-concepts.md` states the substrate rule as a layering invariant:
*"**Beads is the universal persistence substrate** for domain state."* The store interface it names
is `beads.Store`, with *"Create, Get, Update, Close, List, Ready, Children, ListByLabel,
SetMetadata, MolCook."*

Types observed across the documentation, each described as *"a bead"* by the page that introduces
it:

| Type | What it is | Where stated |
|---|---|---|
| task | ordinary work | `how-gas-city-works.md` |
| `message` | mail — *"Sender, recipient, subject, body; threads and waits in an inbox until read"* | `guides/capabilities-for-coding-agent-users.md` |
| session | a running agent; the orchestrator creates one on adoption | `how-gas-city-works.md` §Agent |
| convoy | *"a container bead that groups related work so you track a batch as a unit"* | `how-gas-city-works.md` §Bead |
| molecule | the v1 materialization of a formula run — *"a root bead plus child step beads"* | `nine-concepts.md` §7 |
| wisp | *"ephemeral runs are wisps"* — a v1 formula slung with no steps | `nine-concepts.md` §7 |
| workflow root | *"type `task`, `gc.kind = "workflow"`"* under v2 | `reference/specs/formula-spec-v2.md` §0.2 |
| control bead | orchestrator-owned; see [`04`](./04-formula.md) §3 | `formula-spec-v2.md` §0.2 |
| order tracking bead | labelled `order-run:<scopedName>` | `engdocs/architecture/orders.md` |

**Ordering has no scheduler.** *"Dependencies are blocking `needs` edges: a bead with an open
blocker is invisible to agents until that blocker closes — which is how ordering happens with no
central scheduler."* And the convergence property follows from durability, not from retry logic:
*"if an agent dies, its beads stay open and a fresh agent picks up the same work."*

---

## 2. The store is one Dolt server, filtered by prefix

`docs/reference/internal/beads-topology.md` is the page that says what the layout actually is, and
it opens by naming the misreading it exists to prevent:

> *"From the outside that looks like several separate databases. Underneath it is the opposite: one
> shared Dolt server, with each scope's beads tagged by an `issue_prefix` that the `bd` CLI uses as
> a hard query filter."*

A city root gets a `.beads/` directory at `gc init`; every `gc rig add <path>` gives the target one
too. **There is one Dolt server process for the whole city.** The city's
`.beads/dolt-server.port` records the port; every rig's `.beads/config.yaml` declares
`gc.endpoint_origin: inherited_city`, meaning *"use whatever endpoint the city is using."*
*"Rigs do not run their own Dolt."*

`gc.endpoint_origin` *"is the canonical key that records who owns the endpoint declaration"* and has
**four legal values**, defined in `internal/beads/contract/files.go`. A default `gc init` city sees
only two:

| Value | Meaning |
|---|---|
| `managed_city` | *"This city runs its own local Dolt; the port lives in `.beads/dolt-server.port`."* |
| `inherited_city` | *"This rig has no endpoint of its own; resolve through the city."* |
| `city_canonical` | *"for cities and rigs that point at an external Dolt server"* |
| `explicit` | as above |

### 2a. The surprising read

The page publishes the failure it expects a reader to hit, with the command and the output:

```console
$ cd repo-a && bd show rigb-h2t
no issue found: rigb-h2t
```

*"The row is right there on the server. But `bd` reads `.beads/config.yaml` in its working
directory, sees `issue_prefix: riga`, and constrains every query to that prefix."* From the city
root, `bd list` shows only `mc-*` — *"**not** a federated view across rigs."*

And it names the tradeoff plainly: *"It is not a federated view across separate databases, and it is
not isolated databases either. It is one shared store with **prefix scoping enforced at the `bd`
query layer**."*

**`gc bd` adds no federation.** *"The `gc bd --rig <name> …` command is a small wrapper that changes
directory into the named rig and runs `bd` there … Anything `bd` cannot do from inside the rig,
`gc bd` cannot do either."* For a genuine cross-rig view the page sends you to Dolt directly,
*"using the port from `my-city/.beads/dolt-server.port`."*

---

## 3. Store backends

`[beads] provider` (or `GC_BEADS`) selects the implementation. `nine-concepts.md` names four:
*"BdStore (production, Dolt-backed), FileStore, MemStore, exec Store."* The repository README states
the default and the escape hatch together: *"The `bd` (beads) provider is the default. To use a
file-based store instead (no dolt/bd/flock needed), set `GC_BEADS=file` or add
`[beads] provider = "file"` to your `city.toml`."*

The `bd` provider carries hard external dependencies the file store does not: `dolt` **2.1.0 or
newer**, `bd` 1.0.0, and `flock`. The README pins the floor and its reason: *"releases before
1.86.2 can also miss the upstream GC/writer deadlock fix in dolthub/dolt commit `ccf7bde206`, which
can hang `dolt_backup sync` under heavy write load."*

Beads is a **separate upstream project** — `gastownhall/beads`, with its own CLI reference — which
is why no bead specification lives in `docs/reference/specs/`. The `bd` surface that `gc bd`
forwards to is documented there, not here. Checked: `docs/reference/specs/` (six files),
`docs/reference/index.md`, `engdocs/specs/`.

---

## 4. Operating a store

Bead storage is the one subsystem with its own runbook and troubleshooting pages, which is itself
the clearest statement of where the operational weight sits:

| Page | Covers |
|---|---|
| `docs/troubleshooting/dolt-bloat-recovery.md` | recovering a bloated Dolt store |
| `docs/troubleshooting/bd-backup-cleanup.md` | backup cleanup |
| `docs/runbooks/split-storage-classes.md` | serving a storage class from its own `[storage]` binding |
| `engdocs/contributors/dolt-maintenance.md`, `dolt-quality-hardening-plan.md`, `dolt-regression-audit.md` | contributor-side maintenance and audit |

Commands: `gc beads health`, `gc beads city use-managed` / `use-external`, `gc beads metadata-cas`,
`gc maintenance dolt-gc`, `gc dolt-cleanup`, `gc storage status` / `migrate` / `preflight` /
`recover-stranded`.

**A "split city"** — one that *"serves the graph class from its own `[storage]` binding"* — changes
formula behaviour: `gc formula cook --attach` is *"limited on a split city"*
(`docs/guides/understanding-formulas.md`). The `StorageConfig`, `StorageBindingConfig` and
`StorageClasses` sections are generated into `docs/reference/config.md`. A family of
`storage.binding.*` events reporting the cutover verdict is described in `CHANGELOG.md` under
**`[Unreleased]`** and does **not** appear in the event-type table this set quotes in
[`07`](./07-event.md) §3 — see that document's note on the two lists.
