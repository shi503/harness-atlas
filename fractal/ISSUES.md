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

---

## ISSUE-003 — link labels in `comparisons/` still read `systems/harnesses/…`

**Severity:** MINOR · **Found:** 2026-09-03, during the W0 `harnesses/` → `content/` rename · **Assigned:** W6 matrix-backfill

The rename re-pointed every local link *href* repo-wide and the checker passes, but the visible link
*text* in `comparisons/00-README.md`, `02-component-matrix.md`, `04-harness-alignment.md` and
`systems/90-short-profiles.md` still says `systems/harnesses/<name>.md` — a label already stale since
the spin-out. Prose in un-recut material was deliberately left alone in W0; W6 owns "the grid's own
prose describes the grid" and should fix the labels when it touches those files.

---

## ISSUE-004 — two claims in `comparisons/` rest on Gas City's disproven "Factory Worker Protocol"

**Severity:** WARN · **Found:** 2026-09-03, W4 #2 Gas City teardown · **Assigned:** W6 matrix-backfill

The Gas City profile (`content/gas-city.md`) found no "Factory Worker Protocol" / "FWP" anywhere in the
org (`gh api search/code`, zero hits). Two places outside the Gas City column still lean on it and were
out of the feature-lead's write scope: (1) the **Amp** and **Gemini CLI** rows in
`comparisons/systems/90-short-profiles.md` §1 cite "Gas City FWP" as the evidence they are supported
hosts; (2) a design-principle callout in `comparisons/02-component-matrix.md` describes a three-way
Codex/Claude/Gemini review formula that the primary sources show is two-lane. Re-source both from the
providers Gas City actually documents, or downgrade the marks.
