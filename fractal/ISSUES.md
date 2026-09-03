# FRACTAL ISSUES — append-only process-error audit trail

Severity: CRITICAL (blocks dispatch) · WARN (degrades correctness) · MINOR.

---

## ISSUE-001 — two teardowns have no matrix column

**Severity:** WARN · **Found:** 2026-09-02, carried from the spin-out handoff §6 · **Assigned:** W6 matrix-backfill

HumanLayer and LangChain Deep Agents each have a ~385-line teardown under `comparisons/systems/` and
neither has a column in `comparisons/02-component-matrix.md` §1 or `comparisons/04-harness-alignment.md`
§2. Their findings live only in prose. The teardown skill (W2) encodes the three downstream obligations
as steps so this cannot recur.

---

## ISSUE-002 — this repo has no history; provenance is by ruling

**Severity:** MINOR · **Found:** 2026-09-02 · **Assigned:** none — accepted by KD at the spin-out interview

Files were copied, not filtered, from `loomwarp-team-system` at `de3ce64`. `git blame` here starts at
the spin-out commit. `RULING-2026-09-02-spinout.md` carries the source path for every file; the source
repo keeps the originals marked `SUPERSEDED`.
