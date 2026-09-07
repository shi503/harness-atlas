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

---

## ISSUE-005 — `03-fractal-as-iterated.md` claims three fork additions that already shipped upstream

**Severity:** WARN · **Found:** 2026-09-03, W4 #4 FRACTAL teardown · **Assigned:** none yet — KD to rule (it is a KD-authored doc)

`comparisons/systems/kd-built-frameworks/03-fractal-as-iterated.md` §1 lists `pulse` as a router
command, the append-only `ISSUES.md` ledger, and the four evaluation templates as additions the
`generic-cerebro` fork made. `content/fractal.md` re-checked upstream at the vendored commit
`6398f6db` and found all three already there; only dual blueprint-schema normalization and the
archive discipline are genuine fork additions. The delta doc's 27/130 count is also stale (32/156 at
`2cd56e7`). This is the self-referential hazard the skill's rule 5 now names: a same-author secondary
source was wrong about the author's own system. Re-head the delta doc or correct §1 with a dated note.

---

## ISSUE-006 — Template A's `◐` (relayed source) collides with the grids' `◐` (partial coverage)

**Severity:** WARN · **Found:** 2026-09-04, KD's review of the first four W4 profiles · **Assigned:** W8 template-v2

Inside a profile the legend reads `✅ direct · ◐ relayed · ⚠️ unverified`; in
`comparisons/02-component-matrix.md` and `04-harness-alignment.md` the same glyph means *present but not
a first-class primitive*. Rule 5's `◐ (proposal)` then mixed the two in one cell. Template v2 separates
them: coverage marks `● ◐ ○ n/a` live only in a profile's component matrix; source marks become
`✅ ↪ ⚠️` and live only in the details and provenance sections. Existing v1 profiles carry the
collision until restructured (W8b).

---

## ISSUE-007 — vendor-named, load-bearing objects missing from six profiles' §C tables (UNDERCOUNT)

**Severity:** WARN · **Found:** 2026-09-04, W3 vocabulary harvest · **Assigned:** W8b restructure (re-point) and W8c diagram pass (re-read) per harness

The vendor's own docs name these objects and the profile's §B rows lean on them, but the profile's §C
primitive table never lists them: **Hermes** `gateway` (`gateway.profile_routes`, `gateway-config.yaml`),
`/goal`, "Bot Mode"; **OpenClaw** the metadata-only audit ledger, operator roles/scopes
(creator/owner/participant); **Gas City** `rig` (caught by the 2026-09-03 sanity run, fixed in
`content/gas-city.md`); **Pi** counted 8 + 3 on 2026-09-02 and 5 + 3 on 2026-09-03 for the same
sources — resolved by rule 4's primitive-vs-supporting definition, to be re-run. The ledger records
each with an `UNDERCOUNT` flag (KD's ruling, W3 Q3); the profiles are corrected when re-read.

---

## ISSUE-008 — twenty-odd `●` cells in the grids have no nameable primitive

**Severity:** WARN · **Found:** 2026-09-04, W3 vocabulary harvest (AC-1) · **Assigned:** W6 matrix-backfill

`comparisons/04-harness-alignment.md` §2: Hermes `2c` `3a` `3b` `6b` `8b` `8d` `10a` `11a`; OpenClaw `8b`
`8d` `10b` `11a`; OpenCode `11a`; Grok `8c` `8d` `10b`; every harness at `0a`.
`comparisons/02-component-matrix.md` §1: QM Multi-model · Skills · Distribution/sync; Indigo HQ Team
memory; SageOx Harness adapter · Distribution/sync; Claude Code Evidence/telemetry; Hermes
Evidence/telemetry · Communication channel; gstack/gbrain Distribution/sync; generic-cerebro Skills ·
Distribution/sync; FRACTAL Agent definitions (sibling-repo source); LoomWarp Agent definitions · Task
decomposition · Standards tier. KD's ruling (W3 Q4): an unnamed `●` becomes `◐` with a dated note — a
correction, not a re-score; `0a` keeps `●` under the stated convention *`●` at 0a = model-pluggable,
not named*. W6 applies; the ledger's §2 index is the checklist.

---

## ISSUE-009 — `00-consolidated-guide-and-mental-model.md` claims a generator that no longer exists

**Severity:** MINOR · **Found:** 2026-09-07, W9 intake routing (counting the sync cost of a 34th component) · **Assigned:** W5 component-pages

`spec/v1-framework/00-consolidated-guide-and-mental-model.md` §"the grid" says `maturity/grid.html`'s rows
are *"**generated** from `CROSSWALK.md` §0 so drift is impossible."* The generator, `scripts/gen-grid-rows.mjs`,
did not come across in the spin-out — `scripts/` holds only `check-doc-links.mjs` and `rewrite-paths.mjs`.
The twelve `sub:` fields in `grid.html` are therefore **hand-maintained**, and drift is not merely possible
but unchecked. Two fixes, either acceptable: strike the sentence, or restore the script. Note the standing
rule cuts toward striking it — *markdown is not code; no generator contracts* — which is also why this is
MINOR rather than WARN. Recorded because `docs/agents/intake.md` §3 counts `grid.html` as one of the
twenty-four places a new component must be synced by hand, and that count is only correct if this is known.

---

## ISSUE-010 — "13 documents" for `content/claude-code/`, which holds 12 (stale since the spin-out)

**Severity:** MINOR · **Found:** 2026-09-07, W9 phase 1 while writing the profile's §1b deep-read links · **Assigned:** W6 matrix-backfill

Five non-archive files outside `content/` say the Claude Code deep read is **13 documents**. The folder
holds **12**. `RULING-2026-09-02-spinout.md` line 35 is explicit about why: *"`references/claude-code/**`
minus `30-gap-analysis-loomwarp.md` (12)"* moved to this repo, and line 45 lists that thirteenth file
among the nine that **stayed with LoomWarp** — it is LoomWarp-specific gap analysis and correctly did
not travel. The count was never updated to match.

Corrected in `content/claude-code.md` (the card and §9) by W9. Still stale in
`comparisons/systems/claude-code.md` (lines 14, 77) and `comparisons/systems/90-short-profiles.md`
(line 46), which W6 owns. `content/claude-code/00-README.md` §table still lists the thirteenth row and
that is **correct** — it links out to the file's LoomWarp home rather than claiming a local copy;
only the *count* is wrong. Archived copies and the superseded draft are left alone as historical record.
