---
status: DRAFT
title: "Skill distribution and the registry"
tier: reference
project: harness-atlas
source: "`loomwarp-team-system` @ `8844df6` (branch `master`, private) — `control/sync-skills.sh`, `registry/repositories.yaml`, `skills/`, `vendor/manifest.json`, `docs/ARCHITECTURE.md`, `docs/BUILD-LOG.md`"
version_at_capture: "8844df6f4bc48f8a563340eb3163401792e000d5"
source_verified: "2026-09-08"
---

# Skill distribution and the registry

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `loomwarp-team-system` @ `8844df6` (private), **2026-09-08**.

Capabilities travel by file copy. `control/sync-skills.sh` pushes `skills/` into every registered
repository's `.claude/skills/`, where Claude Code loads them as its own. There is no package, no
version, and no import — the mechanism is `rsync` plus a receipt file.

---

## 1. `registry/repositories.yaml` — the target list

A `domain:` key and a `repositories:` list. Per entry: `name`, `path`, `origin`, `visibility`,
`owner`, `role`, `modified_by_this_project`, `fractal_installed`, `notes`. Its own header states two
consumers: *"dispatch.py reads this to resolve repo paths; humans read it to know what exists without
cloning everything."*

Two entries at this commit:

| `name` | `path` | `visibility` | `role` | `fractal_installed` |
|---|---|---|---|---|
| `taskflow-web` | `repos/taskflow-web` | public | frontend | true |
| `notify-service` | `repos/notify-service` | private | backend | true |

**The first claim in that header does not hold.** `control/dispatch.py` never opens
`registry/repositories.yaml`; it resolves a repository path from the workstream's own `repo:` field
(`os.path.join(ROOT, ws["repo"])`). The only program that reads the registry is
`control/sync-skills.sh`. The registry's second stated purpose — a human-readable catalogue — is
what it actually serves.

**The control repository is absent from its own registry** while being a dispatch target: eleven
workstreams in `BLUEPRINT-LoomWarp-V1.yaml` carry `repo: .`. `fractal/ISSUES.md` `ISSUE-001` names
this in its required fix — *"The control repo is also absent from the registry despite being a
dispatch target."* Both listed repositories are git submodules (`.gitmodules`), and one of them is
private, which is the stated reason a stranger cannot `git clone --recursive` this repository.

## 2. `control/sync-skills.sh` — the mechanism

150 lines of bash, `set -euo pipefail`, deliberately free of the Python venv the rest of the control
plane needs. Flags: `--dry-run`, `--json`, `-h`. Exit codes are declared in the header —
*"0 all targets synced · 1 one or more targets failed · 2 usage or precondition error."*

```
skills/<name>/  ──rsync -a --delete──▶  <repo>/.claude/skills/<name>/
                                        + .synced-from-loomwarp   (the receipt)
```

**Targets come from the registry, parsed with `grep`.** `grep -E '^[[:space:]]+path:'` piped through
`sed` — the script explains the choice: *"Parsed with grep rather than a YAML library to keep this
script free of a Python/venv dependency; it relies on the registry's one-path-per-line shape."* It
also documents avoiding `mapfile` because it is *"bash 4+ and absent on macOS's system bash 3.2."*

**`--delete` is scoped per skill directory, never across the target.** The reasoning is written into
the file:

> A blanket `rsync --delete` over `.claude/skills/` would treat the hub as authoritative for the
> whole directory and delete any skill the sibling owns independently — including tracked upstream
> files. That is destructive and wrong: a repo may legitimately carry skills the hub does not manage.

**Removal is receipt-driven.** After a successful sync the script writes the hub's current skill
names to `<target>/.claude/skills/.synced-from-loomwarp`. On the next run, any name in the previous
receipt that the hub no longer owns has its directory removed; anything not in the receipt is treated
as the sibling's own and left alone.

**Reporting.** stdout is reserved for `--json` and every human line goes to stderr, *"so the two never
interleave."* Per-target status is one of `skipped`, `failed`, `unchanged`, `would-change`, `synced`,
with a change count from `rsync --itemize-changes`.

**One interaction with `reset`.** Synced skills are untracked in each sibling, so `dispatch.py
reset`'s `git clean -fd` deletes them; `cmd_reset` prints a reminder to re-run this script, and
`docs/DEMO-SCRIPT.md` puts the two commands together in its rehearsal block.

## 3. Where the documentation and the script disagree

`control/sync-skills.sh`'s own header describes what it replaced:

> Replaces a `cp -r` loop that had three defects: it never removed skills deleted upstream (a retired
> skill stayed installed in every sibling forever), it reported nothing about what actually changed,
> and it hardcoded the sibling list instead of reading the registry.

All three defects are addressed by the script at this commit — the receipt, the itemised change
counts and `--json`, and the registry parse. `docs/BUILD-LOG.md` still describes the mechanism in its
pre-replacement form: *"`control/sync-skills.sh` copies into both siblings, `diff`-verified
byte-identical."* No document in the tree describes the receipt.

## 4. The seven skills, and the counts

`skills/` holds seven directories at this commit:

| Skill | Origin | Lines |
|---|---|--:|
| `commit-summarize` | vendored, `6398f6d` | 111 |
| `fractal-init` | vendored, `6398f6d` | 49 |
| `gap-analysis` | vendored, `6398f6d` | 131 |
| `handoff` | vendored, `6398f6d` | 96 |
| `pulse` | vendored, `6398f6d` | 47 |
| `quality-pass` | vendored, `6398f6d` | 124 |
| `cross-repo-dispatch` | LoomWarp's own | 42 |

Six vendored plus one local. Three documents count them differently:

| Source | Count |
|---|---|
| `docs/ARCHITECTURE.md` topology diagram | *"skills/ — 5 vendored + cross-repo-dispatch reference skill"* — 6 |
| `docs/BUILD-LOG.md` | *"`skills/` (5 vendored + `cross-repo-dispatch`)"* — 6 |
| `vendor/README.md` | *"The six upstream `skills/*` directories (`commit-summarize`, `fractal-init`, `gap-analysis`, `handoff`, `pulse`, `quality-pass`)"* — 7 with the local one |
| **The tree, and `vendor/manifest.json`** | **6 vendored + 1 local = 7** |

All six vendored `SKILL.md` files were confirmed byte-identical to
`fractal-agent-system` @ `6398f6d` at this read.

## 5. What the skills are

Two are executed by an agent inside a session (`handoff`, `pulse`), and each carries the same
boundary in its own text: *"When the Feature Lead runs as a background agent, they use the bash steps
in `feature-lead.md` instead of this skill; this skill runs when the Feature Lead is in an
interactive Claude Code session."* Since every headless dispatch instructs the agent to assume
background-agent mode, the headless path does not use them.

`cross-repo-dispatch` is the one skill LoomWarp wrote, and it declares itself documentation:

> This is a **reference document**, not executable dispatch logic — `control/dispatch.py` in the
> control repo owns the actual behavior. This skill exists so it's distributed to every sibling repo
> alongside the other vendored skills, and any agent reading a sibling's `.claude/skills/` can
> understand what the control plane expects of it without reading the control repo's Python.

It restates the field split ([`02-the-blueprint-and-the-workstream.md`](./02-the-blueprint-and-the-workstream.md)
§3), the two `target_mode` behaviours, and the three evidence paths the classifier checks.

**A distributed skill may not depend on a path back home.** `standards/README.md` states the rule and
calls it *"the one learned expensively"*:

> A distributed skill must **never hard-depend on a path in this repo.** Repos that install a
> LoomWarp skill do not have `standards/` on disk. A distributable skill carries its operational
> checklist **inline** and **cites the canonical guide by name.**

`handoff`, `pulse` and `cross-repo-dispatch` reference `feature-lead.md`, `router.py` and
`dispatch.py` by name and relative sibling path, not by control-repo path.
