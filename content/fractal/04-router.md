---
status: DRAFT
title: "FRACTAL — router.py"
tier: reference
project: harness-atlas
source: "shi503/fractal-agent-system @ 6398f6db059598e381336601b21609928cf24034"
version_at_capture: "6398f6db (2026-04-20)"
source_verified: "2026-09-08"
---

# `router.py`

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `github.com/shi503/fractal-agent-system` at **`6398f6db`** (2026-04-20), **2026-09-08**.
Behaviours marked **reproduced** were obtained by executing the shipped file against constructed
BLUEPRINTs in a scratch directory on the read date.

FRACTAL's only executable artifact: 322 lines of Python, three imports beyond the standard library
(`yaml`), five commands, no network, no subprocess, no LLM call. `README.md` Core Principle #1:
*"Flow control lives in Python (`router.py`), not in LLM prompts. LLMs are unreliable routers; code is
not."*

---

## 1. The five commands

```
python3 router.py init                              # build .state.json from the BLUEPRINT
python3 router.py next                              # print workstreams whose dependencies are COMPLETE
python3 router.py update <workstream_name> <status>  # set one entry
python3 router.py status                            # print N/M and the three groups
python3 router.py pulse <path/to/PULSE.md>          # read the last JSON block, print OK or ALERT
python3 router.py --blueprint <file> <command>      # override BLUEPRINT_PATH for init/next
```

`--blueprint` is stripped by `_resolve_blueprint_path()` before dispatch and is only consulted by
`init` and `next`; `update`, `status` and `pulse` never load a BLUEPRINT.

**Every command exits 0 on success and on most failures.** The four `sys.exit(1)` calls are: no
arguments; `--blueprint` with no filename; `update` with a name absent from the state file or an
invalid status; and `pulse` with a missing file. Everything else — including `HEARTBEAT_ALERT`, an
unsatisfiable dependency graph, and a `next` that finds nothing — returns 0. A caller cannot branch on
exit status; it must parse stdout.

---

## 2. `.state.json`

The whole of persisted state. Written by `init` and `update`, read by `next`, `status` and `update`:

```json
{
  "FeatureLead-ExampleBackend": "NOT_STARTED",
  "FeatureLead-ExampleFrontend": "NOT_STARTED",
  "FeatureLead-ExampleIntegration": "NOT_STARTED"
}
```

A flat map from agent name to status string. **No dependency edges, no timestamps, no PRD paths, no
HANDOFF paths, no phase, no history, no schema version.** Edges exist only in the BLUEPRINT and are
re-derived on every `next` call. The file is gitignored as a runtime artifact
(`BEST-PRACTICES.md` §4: *"It will conflict across branches"*).

**Three statuses, and no fourth.** `NOT_STARTED | IN_PROGRESS | COMPLETE`, validated on write.
`REJECTED` is refused with exit 1 — reproduced. There is no `BLOCKED`, no `FAILED`, no
`AWAITING_REVIEW`; the evaluation pipeline's reject path ([`06`](./06-the-evaluation-layers.md) §3) has
no representation in state, and `PULSE`'s own `"status": "BLOCKED"` example is free text inside the
pulse file, never written here.

---

## 3. What `update` actually checks

This is the mechanism the whole design rests on, so it is quoted rather than summarised
(`cmd_update`, lines 180–202):

```python
state = load_state()
if workstream_name not in state:
    print(f"Error: Workstream '{workstream_name}' not found in state file.")
    ...
    sys.exit(1)

valid_statuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETE"]
if status not in valid_statuses:
    ...
    sys.exit(1)

old_status = state[workstream_name]
state[workstream_name] = status
save_state(state)
```

**Two checks: the key exists, and the string is one of three.** Then it writes.

- It does not look for a `HANDOFF.md`. It does not check whether one exists, where it is, or what it
  says. The string `HANDOFF` does not appear anywhere in `router.py`.
- It does not read the workstream's PRD, its acceptance criteria, or its `prd:` path.
- It does not run, re-run or parse a build command.
- It does not enforce an order: `NOT_STARTED → COMPLETE` is accepted directly, skipping `IN_PROGRESS`.
- It does not record who ran it, or when.

**Reproduced.** In a directory containing only `router.py`, `BLUEPRINT-Example.yaml` and `.state.json`
— no `workstreams/` directory, no HANDOFF, no PULSE, no source tree:

```
$ python3 router.py update FeatureLead-ExampleBackend COMPLETE
'FeatureLead-ExampleBackend': NOT_STARTED -> COMPLETE
exit=0
$ python3 router.py status
Epic Progress: 2/3 (67%)
```

**The design document says the same thing about itself.** `BEST-PRACTICES.md` §4:

> **`router.py update COMPLETE` without writing HANDOFF.md produces no audit trail.** Marking a
> workstream COMPLETE by calling the router directly bypasses the HANDOFF generation. You end up with a
> state file that says "COMPLETE" but no record of what was built, what wasn't, or whether the build
> passed.

So the HANDOFF requirement is real, and it is enforced **entirely by the role files** — by
`feature-lead.md`'s bash block writing the file before calling the router, and by `architect.md`'s
*"HANDOFF evaluation is an approval gate."* The state machine is mechanical about *transitions* and has
no opinion about *evidence*.

---

## 4. `init` wipes, and nothing stops it

`cmd_init` rebuilds the dict from scratch — every workstream `NOT_STARTED` — and calls `save_state`,
which opens the file `"w"`. There is no guard: no role check, no `--force`, no confirmation prompt, no
backup, no diff, no warning when the existing file contains `COMPLETE` entries.

**Reproduced.** Two entries at `COMPLETE`; then:

```
$ python3 router.py --blueprint BLUEPRINT-Example.yaml init
State initialized with 3 workstreams.
  FeatureLead-ExampleBackend: NOT_STARTED
  FeatureLead-ExampleFrontend: NOT_STARTED
  FeatureLead-ExampleIntegration: NOT_STARTED
exit=0
```

The prohibition is stated in four places — `README.md` *"Known Gotchas"* #6, `feature-lead.md`'s
*"Router command restrictions (CRITICAL)"*, `BEST-PRACTICES.md` §4 and its §8 anti-pattern table — and
§4 records that it has already happened once:

> This was observed in production when a Feature Lead ran `init` mid-epic and erased the epic's
> accumulated state.

An instruction repeated four times in prose, protecting a one-line unguarded overwrite, is the shape of
this whole layer in miniature.

---

## 5. Five failure modes, reproduced

Each was produced by running the shipped code at the pinned commit against a constructed BLUEPRINT.

| # | Input | Output | exit |
|---|---|---|---|
| 1 | A workstream added to the BLUEPRINT after `init`, then `update … COMPLETE` | `Error: Workstream 'FeatureLead-NewWorkstream' not found in state file.` + the available list | **1** |
| 2 | `dependencies: [FL-Typo]` — a name in no BLUEPRINT entry | `No new workstreams ready. Waiting on:` — **and nothing listed** | 0 |
| 3 | `FL-X depends_on FL-Y`, `FL-Y depends_on FL-X` | identical output to #2 | 0 |
| 4 | Two workstreams in different phases sharing `feature_lead: FL-Dup` | `State initialized with 1 workstreams.` — from a two-workstream BLUEPRINT | 0 |
| 5 | Every `prd:` pointing at a non-existent file | `init`, `next` and `update` all behave normally | 0 |

**#1** is the one the family has already hit. `cmd_update` requires the key to be present, and only
`cmd_init` creates keys — so a BLUEPRINT that grows mid-epic leaves the new workstream unable to mark
itself complete, while `init` (which would create it) is the command that would erase everything else.
The profile quotes an instance of exactly this from a fork's own issue ledger; it reproduces from the
shipped upstream code with no fork-specific change.

**#2 and #3** produce the same output, and that output is the deadlock signature: `cmd_next` prints
*"Waiting on:"* followed by the `IN_PROGRESS` list, which is empty when nothing is in progress. A typo
in a dependency name and a genuine cycle are indistinguishable from each other, from a normal wait, and
from an epic that has quietly stopped. There is no cycle detection and no validation that a dependency
name exists — `all(state.get(d) == "COMPLETE" for d in deps)` reads a missing name as `None`, which is
not `COMPLETE`, forever.

**#4** contradicts a stated rule with no enforcement behind it. `SETUP-CLAUDE-CODE.md` §7:
*"`feature_lead` names must be unique across the entire blueprint (used as state keys)."* A collision
silently drops a workstream from the epic; nothing counts the BLUEPRINT's entries against the state
file's.

---

## 6. `pulse`, and what it does not check

`cmd_pulse` is documented as *"Deterministic rule-based check — zero LLM tokens if HEARTBEAT_OK."* It
regex-matches ```` ```json ```` fences, parses **the last one only**, and branches on
`escalation_needed`. Its behaviours are recorded in [`05-handoff-and-pulse.md`](./05-handoff-and-pulse.md)
§4, with the six cases reproduced.

The two that matter here: **an alert is not sticky** — one later heartbeat with
`escalation_needed: false` makes an earlier alert invisible, because only the final block is read; and
**there is no staleness check** — a heartbeat timestamped 2023 reports `HEARTBEAT_OK` in 2026, because
the `timestamp` field is printed and never compared to anything. The *"every 30 minutes"* cadence is a
prose instruction in `feature-lead.md`; no code measures elapsed time.

---

## 7. What `router.py` does not have

Each checked by reading the full file at the pinned commit and by grep:

- **No logging, no event stream, no audit record.** Every command's entire output is `print()` to
  stdout; nothing is written except `.state.json`.
- **No locking.** `save_state` is a plain truncating write. Two concurrent Feature Leads calling
  `update` race, and the loser's status is lost.
- **No cost, token or budget accounting.** No such field exists in the state file or the BLUEPRINT.
- **No process invocation.** The router never launches an agent, a session or a build; it does not
  import `subprocess`. Everything it decides is executed by a human or an already-open session reading
  its stdout.
- **No `HANDOFF`, no `PULSE.md` write, no PRD read.** Confirmed by grep.

---

**Next:** [`05-handoff-and-pulse.md`](./05-handoff-and-pulse.md) — the artifacts the router does not
read.
