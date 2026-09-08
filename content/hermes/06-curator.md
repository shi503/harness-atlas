---
status: DRAFT
title: "The Curator — how a capability ages out"
tier: reference
project: harness-atlas
source: "hermes-agent.nousresearch.com/docs/user-guide/features/curator"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
source_verified: "2026-09-08"
---

# The Curator — how a capability ages out

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `hermes-agent.nousresearch.com/docs` at **v0.21.1 (tag `v2026.9.7`)**, **2026-09-08**.

> *"It exists so that skills created via the self-improvement loop don't pile up forever. Every time
> the agent solves a novel problem and saves a skill, that skill lands in `~/.hermes/skills/`. Without
> maintenance, you end up with dozens of narrow near-duplicates that pollute the catalog and waste
> tokens."*

The curator is the counterweight to [`04`](./04-the-learning-loop.md). Everything below turns on one
question — **is this skill agent-created?** — which is answered by a stored flag, never inferred.

---

## 1. Trigger — an inactivity check, not a schedule

*"The curator is triggered by an inactivity check, not a cron job."* It is evaluated at CLI session
start, during gateway housekeeping, and on the Desktop / `hermes serve` maintenance timer. Two
conditions, both required:

| Condition | Config key | Default |
|---|---|---|
| Enough time since the last run | `interval_hours` | **168** (7 days) |
| The agent has been idle long enough | `min_idle_hours` | **2 hours** |

If both hold, it *"spawns a background fork of `AIAgent` — the same pattern used by the memory/skill
self-improvement nudges. The fork runs in its own prompt cache and never touches the active
conversation."*

**Serve-backend specifics.** Desktop and other `hermes serve` backends *"share the existing hourly
maintenance timer (first poll after 90 seconds)"*, measure inactivity from process startup and the most
recent chat activity in the same profile, retain that timestamp after a session closes or is reaped, and
skip the curator while a turn in that profile is running. *"A connected but inactive window does not
block maintenance."* A running messaging gateway for the same profile owns these chores instead.
In-flight maintenance runs in a worker thread and *"closing the backend does not cooperatively
interrupt that pass"*; multiple independent serve processes on one profile *"can still race the
curator's interval check."*

**First run is deferred by a full interval.** *"On a brand-new install … The first observation seeds
`last_run_at` to 'now' and defers the first real pass by one full `interval_hours`. This gives you a
full interval to review your skill library, pin anything important, or opt out entirely before the
curator ever touches it."* `hermes curator run --dry-run` previews without mutating.

## 2. Phase 1 — deterministic transitions

No LLM, always on when the curator is enabled, *"with no aux-model cost."*

```
active → (30d unused) stale → (90d unused) archived → ~/.hermes/skills/.archive/
```

| Threshold | Key | Default |
|---|---|---|
| Unused → `stale` | `stale_after_days` | **30** |
| Unused → `archived` | `archive_after_days` | **90** |

Three exemptions, each with a stated reason:

- **Pinned skills** — skipped entirely.
- **Skills referenced by any cron job**, *"including paused/disabled jobs"* — *"treated like pin for
  auto-transitions so a slow or paused schedule cannot archive a skill out from under a job."*
  Consolidation *"also rewrites cron skill references when it merges umbrellas."*
- **Never-used skills** (`use_count == 0`) get a grace floor: *"they are not archived until they are at
  least `stale_after_days` old. Zero uses is absence of evidence, not proof the skill is disposable."*

**The curator never deletes.** *"the worst outcome is archival into `~/.hermes/skills/.archive/`, which
is recoverable."*

## 3. Phase 2 — LLM consolidation, off by default

```yaml
curator:
  consolidate: false     # opt-in
```

> *"By default the curator only **prunes** … The opinionated LLM **consolidation** pass
> (umbrella-building, merging overlapping skills) is off by default because it costs aux-model tokens on
> every run and makes broad structural changes to your library."*

Cost, stated: *"a single aux-model pass with a high iteration ceiling — a full curation sweep typically
takes 50–100 API calls."* Turn it on in config, or once with `hermes curator run --consolidate`.

When on, the forked agent surveys agent-created skills, may read any of them with `skill_view`, and
decides per skill whether to **keep**, **patch** (via `skill_manage`), **consolidate** overlapping ones
into *"class-level umbrellas"*, or **archive**.

**Consolidation treats a skill as a package, not a file.** If a skill has `references/`, `templates/`,
`scripts/`, `assets/`, or relative links to them, the curator must *"either keep it standalone, re-home
the needed support files and rewrite paths, or archive the entire package unchanged — not flatten only
`SKILL.md` into another skill's `references/` file."*

## 4. Configuration

```yaml
curator:
  enabled: true
  interval_hours: 168          # 7 days
  min_idle_hours: 2
  stale_after_days: 30
  archive_after_days: 90
  consolidate: false           # LLM umbrella-building pass — opt-in
  prune_builtins: true         # archive unused bundled built-in skills too
  archive_ttl_days: 0          # 0 (default) = never purge
  backup:
    enabled: true
    keep: 5
```

`prune_builtins: true` (the default) lets the curator archive **unused bundled built-in skills** after
`archive_after_days` — *"never patched, consolidated, or deleted"*, only archived. **Hub-installed
skills are always off-limits.** Set `prune_builtins: false` to exempt bundled skills entirely.

The LLM review runs on the ordinary auxiliary slot `auxiliary.curator` — *"alongside Vision,
Compression, Session Search, etc."* — pickable through `hermes model` or the dashboard's Models tab:

```yaml
auxiliary:
  curator:
    provider: openrouter
    model: google/gemini-3-flash-preview
    timeout: 600               # generous — reviews can take several minutes
```

A legacy `curator.auxiliary.{provider,model}` block *"still works but emits a deprecation log line."*

## 5. What "agent-created" means

The curator manages only skills marked agent-created in `~/.hermes/skills/.usage.json`. **All three**
conditions must hold:

1. The name is **not** in `~/.hermes/skills/.bundled_manifest` (bundled skills).
2. The name is **not** in `~/.hermes/skills/.hub/lock.json` (hub-installed skills).
3. Its `.usage.json` entry has `"created_by": "agent"` or `"agent_created": true`.

Only the background review fork sets that marker — see
[`04` §1](./04-the-learning-loop.md#1-the-three-writers-and-why-the-distinction-is-load-bearing).

### `created_by` is a policy flag, not a provenance claim

The documentation is unusually explicit that the field's name misleads:

> *"The stored field is named `created_by`, but it is consumed as 'may autonomous curation touch this?'
> — not 'who wrote this file'. Those are different questions, and for records predating the marker the
> authorship answer is simply unrecoverable. The name is kept because it is already on disk in every
> `.usage.json`; read it as policy."*

### Provenance is declared, never inferred

The stated argument against automating adoption:

> *"Telemetry cannot establish authorship: a skill with thousands of patches proves the agent
> **maintains** it, not that the agent **wrote** it — Hermes edits user-authored skills on your behalf
> constantly. An automatic 'looks agent-made, adopt it' heuristic would eventually archive something you
> hand-wrote."*

## 6. Adoption — the gap, and closing it by declaration

`hermes curator status` reports two populations:

```
curator-managed skills: 43 total  (agent-created=43  bundled=0)
  active     41
  stale       2
  archived    0

unmanaged (no provenance marker): 112 total
  pre-dates marker    34
  foreground-created  78
  never auto-staled or archived — `hermes curator adopt <name>` hands one over
```

> *"A large library can therefore look fully curated while most of it is untouchable."*

Two reasons a skill is unmanaged: **pre-dates marker** (*"the record was written before `created_by`
existed … Authorship is genuinely unknowable from the record"*) and **foreground-created** (*"left the
marker unset by design, since skills you ask for belong to you"*).

```bash
hermes curator list-unmanaged                    # itemize them, with reasons
hermes curator adopt <name> [<name> ...]         # hand specific skills over
hermes curator adopt --all-unmanaged --dry-run   # preview the full list
hermes curator adopt --all-unmanaged --yes       # skip the prompt
```

**Adoption does not reset the clock.** *"an adopted skill keeps its existing `last_activity_at`, so
handing over a library you already stopped using does not buy it a fresh 90-day window. Expect adopted
long-idle skills to go `stale` (or `archived`) on the next pass; that is the point."*

`adopt` *"refuses bundled, hub-installed, external, and protected built-in skills, which have an owner
other than you."*

## 7. Pinning

Pinning protects against **two** deleters: *"the curator's automated archive passes and the agent's
`skill_manage(action="delete")` tool call."*

- The curator skips a pinned skill in auto-transitions and *"its LLM review pass is instructed to leave
  it alone."*
- `skill_manage` refuses `delete`, *"pointing the user at `hermes curator unpin <name>`."*
- **Patches and edits still go through** — *"so the agent can improve a pinned skill's content as
  pitfalls come up without a pin/unpin/re-pin dance."*

Stored as `"pinned": true` on the skill's `.usage.json` entry. Only **agent-created** skills can be
pinned; `hermes curator pin` refuses on bundled and hub-installed ones.

**Protected built-ins** are a stronger, hardcoded class: *"never-archivable and never-consolidatable,
regardless of `curator.prune_builtins`, pin state, or LLM judgment"*, and *"filtered out of the
curator's candidate list entirely, so the consolidation pass never sees them."* The stated reason is a
UX failure mode — *"silently archiving one would turn its slash command into an 'Unknown command' error
with no signal to you."* **The set is currently empty**: its original member, `plan`, *"graduated to a
built-in `/plan` command with no skill on disk."*

The pin's stated limit: *"The pin guards tool-driven deletion, not your own filesystem access."*

## 8. Usage telemetry

The sidecar at `~/.hermes/skills/.usage.json`, one entry per skill:

```json
{
  "my-skill": {
    "use_count": 12,
    "view_count": 34,
    "last_used_at": "2026-04-24T18:12:03Z",
    "last_viewed_at": "2026-04-23T09:44:17Z",
    "patch_count": 3,
    "last_patched_at": "2026-04-20T22:01:55Z",
    "created_at": "2026-03-01T14:20:00Z",
    "state": "active",
    "pinned": false,
    "archived_at": null
  }
}
```

| Counter | Increments when |
|---|---|
| `view_count` | the agent calls `skill_view` on the skill |
| `use_count` | the skill is loaded into a conversation's prompt |
| `patch_count` | `skill_manage patch/edit/write_file/remove_file` runs on it |

*"Bundled and hub-installed skills are explicitly excluded from telemetry writes."*

`hermes curator status` also *"lists the five least-recently-used skills — a quick way to see what's
likely to become stale next."*

## 9. Undo — three depths

### Whole-run snapshot

*"Before every real curator pass, Hermes takes a tar.gz snapshot of `~/.hermes/skills/` at
`~/.hermes/skills/.curator_backups/<utc-iso>/skills.tar.gz`."*

```bash
hermes curator rollback        # restore newest snapshot (with confirmation)
hermes curator rollback --list # all snapshots with reason + size
hermes curator rollback --id <ts>
hermes curator backup --reason "before-refactor"
```

**The rollback is itself reversible**: *"before replacing the skills tree, Hermes takes another snapshot
tagged `pre-rollback to <target-id>`, so a mistaken rollback can be undone by rolling forward to that
one with `--id`."* Snapshots prune to `curator.backup.keep` (default **5**). `backup.enabled: false`
disables automatic snapshotting, and *"the flag gates both paths symmetrically so there's no way to
accidentally skip the pre-run snapshot on mutating runs."*

### Per-mutation ledger

Every skill mutation — *"curator auto-transitions, agent `skill_manage` calls, and your own CLI
archive/restore/purge"* — appends one entry to the append-only JSONL ledger at
`~/.hermes/skills/.curator_ledger.jsonl`:

| Field | Values |
|---|---|
| **actor** | `curator` (background review fork / auto-transitions), `agent` (foreground tool calls), `user` (CLI commands) |
| **action** | `create`, `edit`, `patch`, `delete`, `write_file`, `remove_file`, `archive`, `restore`, `purge`, `rollback` |
| **evidence** | delete intent (`absorbed_into` for consolidations, empty for prunes, whether the recoverable-archive path handled it), triggering session id when available |
| **before/after** | per-file `{path, sha256}` manifests; contents stored content-addressed under `~/.hermes/.curator_backups/blobs/`, *"so a hundred entries touching the same unchanged file cost one blob"* |

```bash
hermes curator ledger                  # newest 20 entries
hermes curator ledger --skill my-skill --limit 50
hermes curator rollback <entry-id>     # restore that one mutation's before-state
```

Single-entry rollback *"restores exactly the files that mutation touched (and removes files it created)
… nothing else in the skills tree moves"*, takes a safety ledger entry first, and **fails closed**: *"if
the safety capture can't be written, nothing is changed."* Because foreground deletes are ledgered,
`hermes curator rollback <entry-id>` *"can resurrect a hard-deleted skill."*

**The ledger is telemetry, never a gate**: *"if writing an entry fails, the mutation still goes
through."* Disable with `skills.ledger: false`.

### Archive TTL purge

Archived skills are kept forever by default. `curator.archive_ttl_days` sets a TTL, and *"purging never
runs automatically"*:

```bash
hermes curator purge --dry-run
hermes curator purge             # delete archives older than the TTL (with confirmation)
hermes curator purge --days 90   # one-off TTL override
```

*"every purged skill is captured into the ledger (with blobs) first, so even a purge leaves an
auditable, recoverable trail."*

## 10. CLI

```bash
hermes curator status              # last run, counts, pinned list, LRU top 5
hermes curator run [--consolidate | --background | --dry-run]
hermes curator pause / resume      # pause persists across sessions
hermes curator pin / unpin <skill>
hermes curator adopt <skill> | --all-unmanaged | list-unmanaged
hermes curator archive <skill>     # manually archive one now
hermes curator restore <skill>     # move an archived skill back to active
hermes curator list-archived
hermes curator prune [--days N]    # bulk-archive agent-created skills idle >= N days (default 90)
hermes curator backup / rollback / ledger / purge
```

*"The same subcommands are available as the `/curator` slash command inside a running session (CLI or
gateway platforms)."*

`restore` *"refuses if a bundled or hub-installed skill has since been installed under the same name
(would shadow upstream)."*

## 11. Per-run reports

Every run writes a timestamped directory under `~/.hermes/logs/curator/`:

```
~/.hermes/logs/curator/
└── 20260429-111512/
    ├── run.json      # machine-readable: full fidelity, stats, LLM output
    └── REPORT.md     # human-readable summary
```

When a run consolidated skills, the end-of-run summary carries **an explicit rename map** of every
`old-name → new-name` pair, *"so when a wave of renames lands you can spot them at a glance without
diffing the JSON report."* The hint also surfaces under `hermes curator pin`.

**A report reading `Model: (not resolved) via (not resolved)` with `Duration: 0s` is not an error.**
*"It simply means there were no candidates, so no model was ever invoked. The auto-transition phase still
runs and reports its counts normally."*
