---
status: DRAFT
title: "The framework-error audit trail"
tier: reference
project: harness-atlas
source: "`loomwarp-team-system` @ `8844df6` (branch `master`, private) — `fractal/ISSUES.md`"
version_at_capture: "8844df6f4bc48f8a563340eb3163401792e000d5"
source_verified: "2026-09-08"
---

# The framework-error audit trail

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `loomwarp-team-system` @ `8844df6` (private), **2026-09-08**.

`fractal/ISSUES.md` is 199 lines and titles itself *"FRACTAL ISSUES — append-only framework-error
audit trail."* It records defects in the harness, not in the work the harness dispatches. Eight
entries at this commit, spanning 2026-08-04 to 2026-08-28.

Nothing writes to it and nothing reads it. It is a markdown file a person or a dispatched agent
appends to, and it is the mechanism the control plane most consistently uses to hold a correction
that the code has not yet absorbed.

---

## 1. The entry shape

Entries are numbered continuously across three prefixes, so the sequence is `001…008` with the
prefix carrying the kind:

| Prefix | Entries | What it marks |
|---|---|---|
| `ISSUE-` | 001, 002, 003, 004, 008 | A defect with a required fix |
| `OBS-` | 005 | An observation whose cause is unresolved |
| `FINDING-` | 006, 007 | An empirical test result, positive or negative |

A full entry carries: a title stating the defect in one line; **Severity**; **Found** (date plus the
phase or activity); **Assigned** (a workstream name, `unassigned`, or `none`); a consequence; a *"Why
it was never seen"* paragraph; an interim mitigation; and a **Required fix**. `ISSUE-008` states its
required fixes *"in cost order"*, numbered.

**The severity vocabulary the header declares is not the vocabulary the entries use.** The header
reads *"Severity: CRITICAL (blocks dispatch) · WARN (degrades correctness) · MINOR."* Three of the
eight entries carry a severity outside that list — `OBSERVATION` (`OBS-005`), `DESIGN-BLOCKING`
(`FINDING-006`), `INFORMATIONAL (load-bearing)` (`FINDING-007`) — and `MINOR` is used by none.

## 2. The eight entries

| Id | Severity | Subject | Where it lands in this set |
|---|---|---|---|
| `ISSUE-001` | CRITICAL | `repo: .` writes its HANDOFF where the classifier does not look | [`02`](./02-the-blueprint-and-the-workstream.md) §6 |
| `ISSUE-002` | WARN | One `.state.json` across all blueprints; the losing write is silent and gitignored | [`01`](./01-the-vendored-core.md) §1 |
| `ISSUE-003` | CRITICAL | The documented `--blueprint` form resolves to a path that does not exist | [`01`](./01-the-vendored-core.md) §1 |
| `ISSUE-004` | CRITICAL | Dispatch always passes `--agent`, so FRACTAL cannot bootstrap into a repo lacking the roles | [`03`](./03-dispatch-and-outcome-classification.md) §5 |
| `OBS-005` | OBSERVATION | One dispatch measured 3874s against a 600s nominal cap; cause confounded | [`03`](./03-dispatch-and-outcome-classification.md) §5 |
| `FINDING-006` | DESIGN-BLOCKING | Upstream's `*.local.md` agent-overlay mechanism does not work | [`01`](./01-the-vendored-core.md) §5 |
| `FINDING-007` | INFORMATIONAL | Repo-local agent definitions *do* propagate to spawned subagents | — |
| `ISSUE-008` | WARN | Two threads worked one intent blind; a `git mv` swept the other's untracked files | §4 below |

## 3. Three practices the register demonstrates

**A confident diagnosis is retracted in place, not deleted.** `OBS-005` was filed as CRITICAL
asserting *"the wall-clock timeout does not work"* and downgraded the same day against a controlled
test — `subprocess.run(['sleep','30'], timeout=3)` raising `TimeoutExpired` at 3.0s. The entry keeps
the retraction, states what remains observed, names the unexcluded alternative (a network stall on a
session that died on `API Error: Connection closed mid-response`), and states what would settle it.
It then separates out the part that is a defect regardless of cause: `timed_out={exit_code is None}`
reported `False` for a run that overran its cap 6.5×.

**A negative result is recorded so it is not re-attempted.** `FINDING-006` ends *"**Do not re-attempt
the overlay approach.** It was tested on 2026-08-05 and the result is recorded here so the next
reader does not spend the same cycle."* It carries the test, the control, and the exact quotation of
the upstream claim it falsified.

**A false occurrence is corrected in the entry rather than removed.** `ISSUE-008` appended a "third
occurrence" and then blockquoted a same-day correction from the dispatching thread showing the two
sessions were coordinated by disjoint write partitions, *"verified with `comm`."* Its stated reason
for leaving both on the record:

> a false occurrence corrected in place is evidence about the detection method; a deleted one is
> nothing.

## 4. `ISSUE-008` — the entry with the widest reach

Two sessions received the same intent in the same working directory and neither knew the other
existed. The entry names two mechanisms and refuses to merge them:

**(a) No interlock.** *"Nothing in FRACTAL, in `git`, or in the harness records that a thread is
working a scope. There is no lease, no claim file, and no place a second thread would look even if it
thought to. The router tracks *dispatched* workstreams; work run directly against a PRD — or against
no PRD, as here — is invisible to it."*

**(b) `git mv` on a directory moves untracked files.** The move carried ~1,800 lines of another
thread's uncommitted work into an archive directory with no warning. *"The near-miss is the finding,
not the recovery — untracked files have no reflog and no index entry."*

The correction that follows narrows the surviving finding rather than withdrawing it: the partition
that held existed *"only in the dispatching thread's instructions. Nothing on disk recorded it,"* so
an agent inside a deliberate partition could not observe it — *"An interlock a participant cannot
observe is indistinguishable from no interlock."*

The entry also states why the repository's own checks could not have caught any of it: *"All four
`scripts/check-*.mjs` validate the contents of committed markdown against other committed markdown.
Concurrency is not a property of a file."* And: *"every real defect across both threads was found by
reading a diff, and none by a check."*

## 5. References that leave the scope

Four entries cite identifiers defined outside the control plane's own directories: `GAP-18`
(`ISSUE-001`, `ISSUE-004`), `GAP-01` (`FINDING-007`), and the exit-evidence marker `F2`
(`ISSUE-003`, *"it is what a second person hits in the first five minutes, which makes it
exit-evidence F2's problem"*). Their registers are in the design-specification tree, outside this
set's scope; `fractal/STRATEGIST-loomwarp.md` §7 names the files.
