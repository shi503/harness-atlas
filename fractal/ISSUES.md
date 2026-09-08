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

---

## ISSUE-011 — R10 is under-specified: "the half stated most directly" is ambiguous when both halves are stated

**Severity:** WARN · **Found:** 2026-09-07, W8b Pi pilot · **Assigned:** none yet — KD to rule

`spectrums/01-scorecard.md` §1 R10 says: where two halves of a harness disagree, *"score the half the
profile states most directly."* On Claude Code that was workable — the profile stated one half verbatim
and left the other unanswered. On **Pi it fired five times** (axes I, III, V, VII, IX) and the tie-break
did not decide any of them, because Pi states **both** halves equally clearly and by design.

The pattern is one distinction repeated: **posture versus mechanism.** Pi's stated posture is
single-operator, no enforcement, no capture; its shipped mechanism is a shareable settings file, a
`--tools` allowlist, and a real promotion path. A harness whose identity is a published refusal list
will always read this way, so this is a class of case, not a one-off.

Options: (a) score the **posture** by default, since it is what the vendor asserts and R11 says a
position is derived from how a harness presents itself; (b) score the **mechanism** by default, since
R11 also says the observed artifact wins where the two disagree — which arguably already settles it;
(c) leave R10 as judgement and require `split:` to name both, which is what happened here.
**(b) appears to be the existing answer** and R10 simply does not cite R11. If so this is an editorial
fix, not a rule change.

---

## ISSUE-012 — axis VII `Control posture` is marked `centred`, and the second scored harness argues it is `polar`

**Severity:** WARN · **Found:** 2026-09-07, W8b Pi pilot · **Assigned:** ✅ RULED 2026-09-07, `2026-09-07-axis-vii-polar` — the axis is `polar`; see `RULINGS.md`

`spectrums/00-README.md` §3 VII marks the axis `centred` — `0` is healthy, `|value|` is distance from
health — and flags the shape itself as *"the one shape call in the sheet that is a judgement, not a
reading."* It asked to be falsified by a harness that is unambiguously autonomous-by-default.

**Pi is that harness.** It scores `+2`: no permission system, no popups, no plan mode, nothing gated by
default. Under `centred` that is *two notches from healthy* — a defect. But Pi's own docs defend the
position at length: *"This is intentional… A partial in-process sandbox would be easy to misunderstand
as a security boundary… Real isolation needs to come from the operating system or a virtualization
boundary."* An axis that scores a defended, argued design choice as a failure is measuring the wrong
thing.

Recommendation: **retire the `centred` marking; axis VII is `polar`.** The axis's own §3 text already
says the shape is the contested part, and this is the evidence it asked for. Note the consequence:
`centred` axes cannot be read by a DX dimension without an inversion note (R8), so a polar axis VII
becomes eligible to feed a dimension — which is a separate decision, not part of this ruling.


---

## ISSUE-011 addendum, 2026-09-07 — the proposed fix does not hold; a narrower one is ruled instead

**Severity:** WARN · **Found:** 2026-09-07, applying the ruling · **Assigned:** partially ruled, `2026-09-07-split-before-anchor`; the fuller question stays open for KD

The entry above offered option (b) — *R11 already settles it, because the observed artifact wins* — as
the likely answer. **On inspection it does not.** R11 adjudicates **positioning against artifact**.
None of Pi's five splits is that shape: every one is **artifact against artifact**, at two different
layers of the same system. *"Runs with the permissions of the user that launched it"* and
*"`.pi/settings.json` can be shared with your team"* are both observed facts; R11 has nothing to
choose between them.

Worse, the three obvious tie-breaks each fail on a case already scored:

| Proposed tie-break | Fails on |
|---|---|
| Score the **default**, not the configured | Claude Code axis I would drop to `−3`. Its managed settings are a shipped org mechanism an admin configures — the harness genuinely serves orgs |
| Score the **weakest** half | Would force Pi axis IX to `−3` and discard a real, vendor-stated promotion path |
| Score the **stated posture** | Contradicts R11's own direction of travel |

**What the five cases actually show is that the split was reached too early.** Pi axis I: the `0`
anchor already reads *"A second person can copy the files; no mechanism knows they exist"* — which is
Pi exactly, both halves at once. No split was needed; the anchor had already absorbed the tension.
The same is true of axis III, whose `0` anchor is *"A gate exists and the model can reach it."*

**Ruled now, narrowly:** re-read the anchor before recording a `split:`; a split is for two states
**simultaneously true at different anchors**, not for uncertainty between two readings of one anchor.
`2026-09-07-split-before-anchor`.

**Left open for KD:** whether Pi's five splits should be re-scored against their anchors under that
rule. Three of them (axes I, III, IX) look like they collapse to a single anchor value on re-read,
which would move Pi's fingerprint. **Recorded and not acted on** — a re-score is KD's call, and the
values as written are defensible under the rule that was in force when they were made.

---

## ISSUE-013 — the §1 budgets predate §1a/§1b, and three profiles now breach caps that moved under them

**Severity:** MINOR · **Found:** 2026-09-07, W8b fan-out audit · **Assigned:** W8b (this workstream)

`skills/harness-teardown/SKILL.md` set `## 6. Details` at or before **line 220** and the whole file at
**≤ 700** when §1 was a single eleven-row card of ~14 lines. W9 phase 1 added `### 1a. Positioning
stats` (a seven-row table, a drafted banner and four links) and `### 1b. Contents` — together ~55
lines. Every downstream line number moved by that amount and **no cap was re-cut.**

`content/claude-code.md` is the proof: 671 lines with §6 at 220 before phase 1, **726 lines with §6 at
275** after, having gained nothing but the two subsections. It did not get worse; the ruler did.

**Ruled here as mechanical, the same way the 600 → 700 raise was when layout B forced it:** whole file
**≤ 760**, `## 6. Details` at or before **line 275**. `## 6.` itself stays **≤ 400**.

**Two profiles breach the §6 body cap on content, and that is not mechanical:** `content/codex.md` §6 is
**465** lines and `content/grok.md` §6 is **477**, against 400. Grok has a defence — it is a product
pair carrying two mark columns throughout — Codex does not. Both are trimmed under this workstream;
the fix is shorter **Ships** lines, not a higher cap.

---

## ISSUE-014 — the DX-5 fill formula and every rendered bar disagree

**Severity:** WARN · **Found:** 2026-09-07, reported by the OpenClaw feature-lead during the W8b fan-out · **Assigned:** W8b (this workstream)

`spectrums/01-scorecard.md` §2.3 states the graded-dimension fill as **six cells, `value + 3` filled**,
so `−3` is empty and `+3` is full. **No rendered bar in the corpus follows it.** Every one uses
`value + 2`: Claude Code renders `+3` as `▰▰▰▰▰▱` (five) where the formula says six, and Pi renders
`+2` as `▰▰▰▰▱▱` (four) where the formula says five.

The cause is order of writing. The first two bars were drawn by eye before any rule existed —
`01-scorecard.md` §2.3 says so itself: *"The fill mapping was undefined until 2026-09-07."* The rule
was then written to be principled (`−3` empty, `+3` full) without re-rendering the two bars already
drawn, and six feature-leads copied the bars rather than the rule, correctly preferring the worked
example they were pointed at.

**The formula is right and the bars are wrong.** `value + 2` never fills the meter — `+3` would render
as five of six forever, which reads as "not quite the top" for a dimension whose top it *is*. Every bar
is re-rendered to `value + 3` under this workstream.

**The transferable lesson, and the reason this is WARN and not MINOR:** a worked example outranks a
written rule for anyone following it. When both exist, they must be generated from each other or
checked against each other — and this repo's standing rule forbids a checker, so the example is the
thing to keep correct.

---

## ISSUE-015 — axis I's `−3` corpus anchor is OpenClaw, and the OpenClaw teardown scores it `+1`

**Severity:** WARN · **Found:** 2026-09-07, reported by the OpenClaw feature-lead during the W8b fan-out · **Assigned:** ✅ RULED 2026-09-07, `2026-09-07-openclaw-permissions-not-tenancy` — and the addendum below supersedes the analysis

`spectrums/00-README.md` §2.1 and §3 I both cite **OpenClaw** as the corpus anchor for
`operator-scale −3`, quoting *"designed for a single operator."* The W8b restructure read the fuller
profile and scored OpenClaw **`+1`** — it ships named team machinery: session owner and participant
roles, per-scope operator roles, and a gateway with bindings.

**R1 requires a real harness in this corpus at each end, cited.** If OpenClaw is `+1`, axis I's minus
pole is **vacant**, and R1 says an axis with a vacant pole *"is an aspiration, i.e. a grade."*

Three ways out, and the choice is a ruling: (a) the quote is real but partial — OpenClaw says
single-operator *and* ships roles, so it is a `split:` case and the anchor should cite a different
harness; (b) Pi is the better `−3` anchor, since its single-operator posture is stated in its security
model rather than its marketing; (c) the axis's `−3` anchor text is too strict and should be relaxed.

**(b) looks strongest** on the evidence now in hand — Pi scores `−1` and its `−3` reading is the
stated posture — but no harness in the scored corpus sits at `−3` yet, which is itself the finding.
Recorded rather than resolved; the remaining restructures may supply a genuine `−3`.

---

## ISSUE-013 addendum, 2026-09-07 — the Codex and Grok "breaches" were a mid-flight measurement, not a defect

**Severity:** MINOR · **Found:** 2026-09-07, re-audit after the fan-out settled · **Assigned:** closed by this note

The entry above reported `content/codex.md` §6 at **465** lines and `content/grok.md` §6 at **477**
against a cap of 400, and assigned both for trimming. **Both numbers were read while the feature-leads
were still writing the files.** Measured after they finished:

| | §6 body | whole file |
|---|---:|---:|
| Codex | **353** | 624 |
| Grok | **355** | 651 |

Every landed profile is inside the §6 body cap of 400 — Pi 366, Claude Code 354, Hermes 368, OpenClaw
372, Codex 353, FRACTAL 343, Grok 355 — and inside 700 lines but for `content/claude-code.md` at 726,
which is the §1a/§1b arithmetic this issue was raised for.

**The mechanical cap raise stands** (760 whole-file, §6 starting by 275); the trimming assignment is
withdrawn. **Nothing needs trimming.**

**The process lesson is the part worth keeping:** an audit run against a working tree that eight agents
are concurrently writing measures a moment, not a result. Byte counts confirm it — all seven profiles
sit between 45 KB and 54 KB, within 20% of each other, so no profile was ever an outlier in substance.
Audit after the writers stop.

---

## ISSUE-016 — `git add -A` during a fan-out swept half-written agent files into an unrelated commit

**Severity:** WARN · **Found:** 2026-09-07, reported by the LoomWarp feature-lead during the W8b fan-out · **Assigned:** closed by this note; the rule below is the fix

Commit `1b29f7a`, whose message is *"withdraw the Codex/Grok trim assignment — it was a mid-flight
measurement"*, actually contains five files: the intended `fractal/ISSUES.md` change, **plus
`content/gas-city.md`, `content/grok.md`, `content/loomwarp.md` and a whole new
`spectrums/positions/loomwarp.yaml`** — 281 insertions the message does not mention. All four were
being written by feature-leads at that moment.

**Cause.** The architect ran `git add -A` while eight agents shared one uninsulated working tree. The
agents behaved correctly: none of them ran `git add` or `git commit`, exactly as instructed. The
architect's own staging was the only thing that touched their files.

**Consequences, in order of seriousness.** A commit message that does not describe its diff is a
corrupted record, and this repo's whole bar is *"links resolve and git is clean"* — a clean tree that
was made clean by capturing someone else's unfinished work is not the property that rule is asking
for. Two profiles were captured mid-edit, so the snapshot in that commit is of files in a state no
one intended to publish; the LoomWarp lead's subsequent corrections (a joined-frontmatter bug and
Ships/Path/Source lines that had been collapsed) landed after it.

**The rule, and it is narrow enough to keep.** **While any agent is writing, stage by explicit path,
never `-A`.** The architect commits only files it wrote itself, and commits an agent's output only
after that agent has reported. Nothing else about the fan-out design was wrong: per-harness file
manifests kept the *agents* from colliding, and they did not collide. The collision was between the
architect and the agents, which the manifests never covered.

**Not rewritten.** `1b29f7a` stands, per *archive by ruling, never by deletion*. This note is the
correction; the history keeps the mistake.

---

## ISSUE-017 — the two-product rule in §4 asks for something `--restructure` forbids

**Severity:** WARN · **Found:** 2026-09-07, reported by the Grok feature-lead during the W8b fan-out · **Assigned:** W8c or the next skill revision

`skills/harness-teardown/SKILL.md` §4 says *"Two-product harnesses (Grok Bot / Grok Build) carry two
mark columns and two totals."* The `--restructure` mode says the matrix's marks are **copied from the
harness's existing column in `04-harness-alignment.md` §2, not re-derived.** That grid holds **one**
Grok column. A second column can only come from re-deriving marks, which the mode bans.

**The two rules are individually sound and jointly unsatisfiable**, and nothing in the skill says which
yields. The Grok restructure only got through because the dispatch brief happened to patch it by hand —
*"keep the single copied mark, carry the distinction in the note"* — which was luck, not design.

**Proposed general form:** a two-product harness carries two mark columns **only where the grid carries
two**. Where the grid carries one, the profile carries one, and the per-product distinction lives in the
row note and in §6, under rule 8's requirement that every row name which product it is about. Under
`--sanity` or a full teardown, where marks *are* derived, the two-column form applies as written.

**A second, related gap:** the scorecard has no case for product pairs at all. Grok's `split:` entries
carry it — DX-6 Ownership is `+3` for Build (Apache-2.0, self-hostable) and `−3` for Bot (closed, *"model
choice is fully managed by the product"*) — which is a legitimate use of `split:` under
`2026-09-07-split-before-anchor`, since both anchors are genuinely true at once. But `split:` was written
for one system with two readings, not for two products under one name, and the fingerprint can only
show one of them. **Grok is the corpus's widest internal spread and the sheet renders it as a single
row.** Worth a rule.

---

## ISSUE-018 — the per-section line budgets ignore the blank lines HTML blocks require

**Severity:** MINOR · **Found:** 2026-09-07, reported by the Gas City and Codex feature-leads during the W8b fan-out · **Assigned:** W8c or the next skill revision

Two independent leads reported the same thing and solved it the same way: to fit the budget they
**joined wrapped prose into single physical lines**, changing nothing rendered and cutting raw line
count. Codex went from 870 lines to 624 that way.

The budgets were set without counting what layout B costs. Each of the 33 components needs a blank line
after `<summary>`, a blank line before `</details>`, and a blank line after `</details>` so the next
heading is not swallowed — roughly **100 structural blank lines** in a 33-component profile, none of
them content.

**Why this is MINOR and not a defect to fix by raising the cap:** the measured outcome is fine. All ten
profiles sit between 45 KB and 54 KB, within 20% of each other, and every §6 body is inside 400 lines.
The budget is doing its job. What it is *not* doing is measuring what it claims to, and the tell is that
two leads independently reached for the same workaround.

**The honest fix is to say what the cap is for.** It is a proxy for how long a page takes to read, and
the `**Ships.** / **Path.** / **Source.**` shape is one line per field by design — the worked example
`content/pi.md` has 24 prose lines over 400 characters, so the style the skill teaches *already*
defeats a raw line count. Either count bytes, or say plainly that the cap is a soft signal and joining
lines to meet it is allowed. **Do not raise the number again without saying what it measures.**


---

## ISSUE-015 addendum, 2026-09-07 — ruled, and the finding is larger than the entry described

**Severity:** WARN · **Found:** 2026-09-07, applying KD's ruling · **Assigned:** open — the vacant-pole half is not resolved

**KD ruled the OpenClaw half.** Its session owner, participant and per-scope roles are *"permissions"*
on a messaging gateway, not tenancy: the harness is *"more of an individual agent"*. Axis I and DX-1
re-scored `+1` → `0` — a mechanism does know a second person exists, which keeps it off `−3`; what it
knows is a permission scope, which keeps it off `+1`. Recorded as
`2026-09-07-openclaw-permissions-not-tenancy`.

**The entry above asked whether axis I's minus pole was vacant. Measured across all ten scored
harnesses, both poles are:**

| | |
|---|---|
| `−2` | LoomWarp · FRACTAL |
| `−1` | Gas City · Pi |
| `0` | OpenClaw · Hermes |
| `+1` | Grok · Claude Code · OpenCode · Codex |

Range **`−2` to `+1`** — four distinct values, all of them in the middle four notches of a seven-notch
axis. R6 passes; **R1 does not.** No harness in the scored corpus sits at either end, and R1 says an
axis with a vacant pole *"is an aspiration, i.e. a grade."*

**The likely cause is the corpus, not the axis.** The `+3` anchor describes a multi-tenant platform
with per-tenant policy the harness enforces, and the cited example — **QM** — has never been torn
down; it is a short teardown in `comparisons/systems/`, not a scored profile. The `−3` anchor
describes a design where *nothing contemplates a second person*, and every one of these ten
contemplates one somehow, even Pi through a shared settings file.

**Three ways out, and the choice is KD's:** (a) tear down QM and let it anchor `+3` — the honest fix
if the anchors are right and the corpus is short; (b) narrow both anchors to the range developer
harnesses actually occupy, and accept that the axis stops describing platforms; (c) publish the
vacancy as the finding — *no developer harness in this corpus is either solipsistic or multi-tenant*
— which is defensible and is what `cost-visibility` does with its own expected clustering.

**Not acted on.** Nothing here changes a score beyond the OpenClaw ruling already applied.

---

## ISSUE-019 — DX-4 measures an instance property, not a harness property

**Severity:** WARN · **Found:** 2026-09-07, KD's reading of the ten-harness corpus · **Assigned:** none yet — KD to rule between the two options below

**KD's diagnosis, 2026-09-07:** *"DX-4 'Domain' is largely project specific and often more an example
of the guide / sensor convention that we build into a project or agent's definition. This is seen more
in FRACTAL and LoomWarp where there are things like `frontend-dev-guide`."*

**The corpus agrees, twice over.**

`domain-specialization` is the worst discriminator of the seven: **3 distinct values, and `0` on seven
of ten.** Every one of those sevens is the `0` anchor verbatim — *"names a domain in its own words, but
nothing in the machinery is domain-specific."* Ten independent reads landing on the same true sentence
is not noise; it is the axis asking a question whose answer is fixed for this whole category.

**And the harness-level version of the question is nearly empty.** If domain specialization shows up in
a harness as convention machinery, the component that carries it is `3e Standards` — and across the
grid that column is **one `●` (LoomWarp), one `◐` (Claude Code), eight `○`.** LoomWarp's `●` is its
Standards tier, which is exactly the `frontend-dev-guide` shape KD names.

**A composite does not rescue it.** Scoring `3e` + `4a` + `10a` + `3d` + `9e` together puts every
harness between 5/10 and 7/10 — flatter than the axis it would replace, because four of those five
columns are near-universal and only `3e` discriminates.

**So the flatness has a cause, and it is a category error, not a bad anchor.** A domain is authored
*into* a harness — in guides, role definitions, standards files — and R3 says a dimension must be
derivable from the harness profile. A project's domain is not in the harness profile and never will be.

### The two ways out

**(a) Re-referent DX-4 to convention machinery.** *"Can I encode my team's standards in this thing, or
do I write prose and hope?"* Reads `3e` primarily, with `4a` and `10a` secondary. Keeps seven
dimensions, answers a real adoption question, and makes LoomWarp's lone `●` mean something. **It would
be near-empty by construction — eight of ten at the floor — and that emptiness is the finding**, the
same shape `cost-visibility` publishes about its own expected clustering.

**(b) Retire DX-4 to six dimensions**, and record in the axes that domain specialization is an instance
property this instrument does not measure.

**Recommendation: (a).** An empty column that says *nobody in this category has solved conventions* is
worth more than a slot that says `0` seven times. But note the cost, which is the same cost the
2026-09-07 revision paid: **a re-referent invalidates every DX-4 value already written**, and all ten
fingerprints would need re-scoring on that one position.

**Statistical note, so the choice is not made on spread alone.** Clustering is normal here — modes of
6 of 10 appear on `state-durability`, `control-posture`, `improvement-loop` and `routing-determinism`
too. DX-4's mode of 7 is the worst but not an outlier. **The argument for changing it is the category
error, not the statistics.** The genuinely free, well-spread candidates if a replacement is ever wanted
instead: `knowledge-depth` (5 distinct, full `−3..+3`) and `improvement-loop` (4 distinct, `−2..+3`).

---

## ISSUE-019 addendum, 2026-09-07 — the replacement is Context, and the evidence is unambiguous

**Severity:** WARN · **Found:** 2026-09-07, testing KD's proposed cluster against the corpus · **Assigned:** KD to rule on the proposal below

**KD's question:** *"what do we think about potentially turning this vector into something that
encompasses domain specialization, steering, observability, trust/safety, standards — 'context
engineering' topics, but from a DX perspective? Let's consider what other vectors are genuinely vectors
that need to be known at the top level."*

**Taking that seriously meant measuring, not choosing.** Two things were computed across all ten scored
harnesses: which of the 33 components any headline dimension currently reads, and which uncovered
blocks actually discriminate.

### First finding: fourteen of thirty-three components feed no dimension at all

`3a` `3c` `5a` `5b` `5c` `6a` `6c` `7a` `9a` `9b` `9c` `9d` `9e` `9f`. **All of layer 5 (Context) and
all of layer 9 (IMPROVE) are unread.** Some of that is correct — `9e Raise the Floor` is `◐` on all ten,
literally identical, and `6a Product` is absent on nine; an axis over either would be noise. But layer 5
is not that shape.

### Second finding: four of KD's five proposed members are already read, or empty

| Proposed member | Where it already lives |
|---|---|
| observability | **DX-7** already reads `8c` |
| trust / safety | **DX-2** already reads `2c` `8a` `8b` |
| standards | `3e` — **eight of ten are `○`**; near-empty, as ISSUE-019 established |
| steering | `3a` `3b` `3c` — discriminates weakly: **six of ten score 5–6 of 6** |
| domain specialization | the broken referent this issue exists for |

Bundling them would build a composite that mostly re-reads what DX-2 and DX-7 already read — **the exact
DX-3/DX-5 collision the 2026-09-07 revision was written to fix**, rebuilt one dimension over.

### Third finding: Context is the best discriminator available, by a clear margin

Composite of `5a` `5b` `5c`, scored `● 2 · ◐ 1 · ○ 0` out of 6:

| | | |
|---|---:|---|
| OpenClaw | 5 | `5a●` `5b◐` `5c●` |
| Claude Code | 4 | `5a●` `5b◐` `5c◐` |
| Hermes · Grok · Codex | 3 | `5a●` `5b○` `5c◐` |
| Gas City | 2 | `5a◐` `5b◐` `5c○` |
| LoomWarp | 1 | `5a○` `5b◐` `5c○` |
| **Pi · OpenCode · FRACTAL** | **0** | nothing in layer 5 at all |

**Six distinct values across a possible seven.** No current DX dimension does better — `cost-controls`
is the best at six, and every other is four or five. Three harnesses score a clean zero, which is a real
statement about them and not a measurement failure.

### The proposal

**DX-4 becomes `context` — *what does it remember about my project, and what can it look up?***
Reads `5a` `5b` `5c` from the profile, and takes **axis II `state-durability`** as its axis input —
which also gives that axis a headline home and drops detail-only from four axes to three.

Anchors, low to high: nothing survives the session · file-backed and machine-local · shared, durable and
retrievable, with curated knowledge beside it.

**Why this and not KD's broader cluster:** the broad version double-counts three dimensions and pulls in
two near-flat columns. This version reads an entirely unread layer, discriminates better than anything
already on the sheet, and is the sharpest possible reading of *context engineering* — the part of it
that is a property of the harness rather than of the project.

**Cost:** re-scores position four on all ten fingerprints. Same cost as the last re-referent, and this
one is paid to cover a layer the instrument has never looked at.

---

## ISSUE-020 — what the seven dimensions still do not read, measured after the Context re-referent

**Severity:** MINOR · **Found:** 2026-09-07, KD's follow-up to the DX-4 ruling · **Assigned:** none — a standing map, not a defect

With `context` in place the headline layer reads **22 of 33 components**. Eleven are unread. They are
not equally interesting, and the point of this entry is the difference.

### Two are correctly unread, and provably so

| | | |
|---|---|---|
| `9e` Raise the Floor | `◐` on **all ten**, identically | An axis over a constant is noise |
| `6a` Product | `○` on **nine of ten** | An axis over an absence is noise |

**These two should never be promoted.** Recorded so the question is not re-opened by someone counting
uncovered components and treating the count as the finding.

### Two discriminate and are genuinely uncovered

| | | |
|---|---|---|
| `7a` Workflow Tasks | `4● 5◐ 1○` | *Is the unit of work written down?* |
| `9a` Learning | `3● 2◐ 5○` | *What happens to a lesson?* |

### Layer 9 (IMPROVE) is unread in its entirety — all six components

It is the largest uncovered block and the strongest remaining candidate for an eighth dimension.
Scored `● 2 · ◐ 1 · ○ 0` across all six, out of 12:

| | | |
|---|---:|---|
| Hermes · OpenClaw · Grok | 8 | learning, cadence and a defect lifecycle all present |
| Claude Code | 6 | |
| Gas City | 5 | |
| Codex · LoomWarp · FRACTAL | 3 | |
| Pi · OpenCode | 2 | almost nothing beyond the universal `9e` |

**Five distinct values across ten harnesses** — weaker than `context`'s six but stronger than four of
the seven dimensions already on the sheet. It would also give **axis IX `improvement-loop`** a headline
home, exactly as `context` gave one to axis II, dropping detail-only from three axes to two.

**The question it asks is a real one at the top level:** *is this harness the same after a thousand
runs?* That is Karpathy's test — *does knowledge compound, or does it just get retrieved* — and
`comparisons/03-jtbd.md` already treats it as a first-class job (`J9 compound`, `J16 raise the floor`).

**Counter-argument, and it is not weak.** Seven stats is the readable limit this sheet was built
around, and an eighth costs that. Two narrower cuts were tested and are worse: `9a 9d 9f` alone gives
only three distinct values, and `7a 3a 3c` clusters five of ten at 4–5 of 6. **If an eighth is ever
added, it is the whole of layer 9 or nothing.**

### Everything else is two-valued and low-yield

`3a` Control · `3c` Composition · `9c` Cadence · `9d` Anti-fragile Lifecycle · `6c` Estate ·
`9b` Rituals · `9f` Diagnose the Bottleneck. Each takes two of the three marks across the corpus. They
are read by the ten axes and belong there; promoting any one alone would add a slider that separates
two groups and no more.

**No action proposed.** The sheet is at seven and the seven now all discriminate. This entry exists so
the next person to ask *what is missing* gets the measured answer instead of re-deriving it.

---

## ISSUE-021 — the link checker cannot see a malformed link, only a missing target

**Severity:** WARN · **Found:** 2026-09-08, W11 while carrying `06-relations.md` §3 · **Assigned:** none yet — the fix is cheap, the decision is whether it earns its place

A substitution in `components/RELATIONS.md` dropped the closing paren on all thirteen citations:

```
before   [`2a`](./2a-adapters-and-middleware.md)
after    [`2a`](./2a-adapters-and-middleware.md
```

**`node scripts/check-doc-links.mjs` reported PASS.** It matches `\[[^\]]*\]\(([^)\s]+)\)`, so a link with no
closing paren is not a link it can see: there is no target left to resolve, and nothing to report.

**This is the same shape as the defect the `--external` flag was written for.** The gate answers *does
this target exist* and is silent on *is this still a link at all* — so a corpus can lose navigation and
stay green. It was caught by reading the output rather than trusting the exit code, which is not a
control.

The cheap fix is a warning on `](` sequences with no closing paren before the next newline. It is
narrowly defensible against *markdown is not code* on the same grounds `--external` was: it does not
check content, count or vocabulary, only whether a promise of a destination is well-formed enough to
be one. **Not taken unattended** — the standing rule is a real constraint and this is a new check.

---

## ISSUE-022 — W7's PRD and CROSSWALK §3.7 give `grid.html` contradictory row sets

**Severity:** WARN · **Found:** 2026-09-08, W11 while setting `graded:` for W5 AC-3 · **Assigned:** KD to rule

`fractal/workstreams/W7-maturity-recut.md:17` says *"`maturity/grid.html` re-pointed: rows are the
`graded: true` components only"*, and its `AC-1` makes that a gate: *"Every row in `grid.html`
corresponds to a component page with `graded: true`."*

`components/CROSSWALK.md` §3.7 is a **KD ruling dated 2026-09-01** that says the opposite: *"`grid.html`
runs on 12 warp threads — the layers — with the 33 components as drill-down"*, on a cell-count argument
(33 × 6 = 198 cells against a ~168 escalation threshold). It states it was ruled **ahead of W7**
specifically so the grid work would be written to it rather than retrofitted.

**Both cannot hold.** Twenty-three components are now `graded: true`, so the W7 reading gives 23 rows
and the ruling gives 12. The ruling is dated, argued and explicitly anticipates W7; the PRD text is
undated on this point and reads as though written before it. **The likely resolution is that W7's line
17 and `AC-1` are stale and should be struck** — but a PRD is not struck by an agent noticing a conflict,
and `graded:` is worth having either way, so the field is set and the grid is untouched.

**A second stale claim rides along.** §3.7 says the ruling was executed *"at `W7`"* by
`scripts/gen-grid-rows.mjs`. That script does not exist — see ISSUE-009, struck in the same commit as
this entry. So the ruling's own record of its execution is unreliable, and whoever settles this should
re-read `grid.html` rather than trust either document about what it currently does.

---

## ISSUE-001 update, 2026-09-08 — the substance is largely discharged by Tier 2; the columns are not, and should not be filled unattended

**Severity:** WARN → MINOR · **Assigned:** W6, still open for the two grid columns

The entry's complaint was that HumanLayer's and Deep Agents' *"findings live only in prose."* That is
now much less true: **all 33 Tier-2 pages carry a cited peer entry for each of them**, per component,
with the vendor's own words and a citation — 66 entries, which is finer-grained than the grid cell the
issue asked for.

**What is still open is the two columns**, and W11's evening run deliberately did not fill them. Adding
them to `comparisons/04-harness-alignment.md` §2 means **66 coverage marks derived from prose**, and
the prose does not carry a mark. Roughly a third is unambiguous in both directions — *"Nothing here,
stated by its own teardown"* is plainly `○`, *"the most explicit implementation in the corpus"* is
plainly `●`. The middle band is not: **"the nearest published thing", "the nearest approach", "routed
to a separate paid product", "hooks *as* middleware"** each sit between `◐` and `○`, and the choice
changes what the grid claims.

**Why that is a stop rather than a judgment call.** A wrong grid cell is the corpus's cardinal defect —
it is the artifact everything else is compared through, and a mark carries no citation to argue with.
The sheet already has the right mechanism for a scored-but-unreviewed claim (R11,
*drafted-until-verified*) and the grids deliberately do not use it. Filling 66 cells overnight and
labelling them drafted would import that mechanism into the one place the corpus chose not to have it.

**The cheap next step for a person:** the marks are derivable in one sitting *from the 33 pages that
now exist*, which did not exist when this issue was written. That is a reading pass, not a re-read of
two 385-line teardowns.

## ISSUE-023 — the deep-read skill's first real run: four gaps the one-example version could not have shown

**Severity:** MINOR · **Found:** 2026-09-08, W12 while producing `content/codex/` — the first exercise of
`harness-deep-read` since it was written · **Assigned:** fixed in the same commit, recorded here because
the *class* of defect matters more than the four instances

`harness-deep-read` was derived from `content/claude-code/`, one folder, and W10's HANDOFF said plainly
that this made it *"a hypothesis about a genre"*. Running it on a second harness falsified four parts of
the hypothesis. Every one of them is a place where Claude Code's shape had been mistaken for the genre's.

**1 · Depth is not the only thing to agree — scope is too.** §2 asked the commissioner how deep and
stopped there. Codex publishes **three** different outlines: the repository's `docs/`, cut by CLI
surface; `learn.chatgpt.com`'s Codex tree, cut by product across cloud, IDE, desktop and web; and ~120
Rust crates, several documenting surfaces the other two never mention. Depth was answerable; *which
outline* was not, and it changes the subject of the document rather than its length. Claude Code has one
docs tree, so the question never arose. **Fixed:** §2 now agrees depth **and** scope in the same step.

**2 · "The repository" is not one source class.** §7 ranked primary sources as *"the repository, the
official docs, the changelog."* For Codex the repository's `docs/` is now **stubs** — a heading and a
link, twice redirected — while the substantive text lives in `codex-rs/*/README.md`. Execpolicy's
Starlark grammar and the memory pipeline's two phases exist **nowhere else**. A skill that says "the
repository" without distinguishing its documentation directory from its source-tree READMEs will send a
reader to the empty one. **Fixed:** §7 names source-tree READMEs as their own class.

**3 · A claim can be out of scope rather than unmechanised, and §4 had no third outcome.** The claim
test as written anticipated two results: a mechanism, or a recorded absence. Walking Codex's claims
produced a third — *"start work from the web, GitHub, GitLab, Linear, or Slack"* is neither implemented
by something in the set nor missing from the product; it is outside what the set was cut to cover.
Recording it as an absence would have been false. The same shape appeared three times in the Claude Code
retrofit. **Fixed:** §4 names the three outcomes, and requires scope-misses to say so.

**4 · A deep read and its profile drift, and the drift is visible to a reader who clicks.** The Codex
profile records **11** hook events from its 2026-09-03 read; the documentation lists **12** as of
2026-09-08. Neither is wrong. But §6's row and the document it links to now contradict each other in the
reader's face, and nothing in the skill said what to do about it. Re-reading the profile is out of scope
for a deep read; silently matching the older number would be worse. **Fixed:** §5's link contract
requires a linked-out row that disagrees with the set to carry both figures and both dates. Applied at
`content/codex.md#2b-hooks`.

**What this says about the fan-out.** All four are the same error: a genre inferred from one instance,
where the instance's accidents read as the genre's rules. Eight harnesses remain, and the two most
likely to falsify further are **Pi**, whose published refusals may make `00` + `20` the honest whole set,
and **LoomWarp**, whose sources are private and cannot carry a resolvable citation. The skill should be
re-read after each, not after all eight.

---

## ISSUE-024 — FRACTAL's instance `C` no longer exists; the profile pins a commit in a repository that is gone

**Severity:** WARN · **Found:** 2026-09-08, W12 while probing sources before the deep-read fan-out · **Assigned:** the FRACTAL deep read records it; the profile is corrected on its next re-read, not retro-fitted

`content/fractal.md` reads three instances, and its frontmatter pins the second:

> *"shi503/generic-cerebro (the fork) @ 2cd56e7ef4f3472c4e91a54810d7f69215b8f536"*

**`gh api repos/shi503/generic-cerebro` returns 404.** It was not renamed — an authenticated
`search/repositories` across `user:shi503`, private repositories included, returns exactly two matches
for *cerebro* or *fractal*: `fractal-agent-system` (public) and `loomwarp-team-system` (private). The
account's repository list does not contain it under any name.

**What this costs.** §4's coverage marks grade instance `U`, so the matrix is unaffected. What is
affected is every `C` delta in a §6 row: those are now claims about a repository no reader — including
KD — can open, and they cannot be re-verified. They were true on 2026-09-03; they are unverifiable on
2026-09-08.

**Handled, not fixed.** The FRACTAL deep read covers `U` and `R` and records `C` as unreachable at its
read date. The profile itself is **not** retro-fitted, per ruling `2026-09-04-w3-q3` — a profile is
corrected when it is next re-read, and this is exactly the class of drift that rule exists for. What
should not happen is a deep read relaying `C`'s figures as though it had re-opened them.

**The general point, which is the reason this is WARN and not MINOR.** A profile pinned to a private or
personal repository has a source that can vanish without notice, and nothing in the corpus notices.
`content/loomwarp.md` has the same exposure — its source is a private repository, reachable today.
`scripts/check-doc-links.mjs --external` would not catch either, because neither is written as a link.

---

## ISSUE-024 addendum, 2026-09-08 — the same profile's drift re-check cites a commit that does not exist

**Severity:** WARN · **Found:** 2026-09-08, W12, by the FRACTAL deep read and confirmed independently · **Assigned:** the profile's next re-read

`content/fractal.md` frontmatter states its upstream pin and then a drift check against it:

> *"re-checked against HEAD `60393054` (2026-09-03) for drift only, never for §4/§6 marks"*

**`gh api repos/shi503/fractal-agent-system/commits/60393054` returns HTTP 422 — *"No commit found
for SHA"*.** The deep read reached the same result from a full clone with all PR refs
(`git cat-file -t 60393054` → *"Not a valid object name"*), and reported that the directories the
drift note describes — `standards/`, `tools/decision-ledger/`, `tools/wiki-index/`, `.claude/plugins/`
— exist nowhere at HEAD.

**What does hold:** the primary pin `6398f6db` resolves (2026-04-20). The profile's `U` reading rests
on that commit and is unaffected. What fails is only the **drift re-check** layered on top of it — and
with it the *"29 commits past the pinned read, +32,875/−3,853 across 303 files"* figure, which the deep
read measured at **4 commits / 16 files / +1,506 −230** against the actual `origin/main` at
`9905012`.

**Why this is the same defect as ISSUE-024 and not a new one.** One profile now cites two sources
nobody can open: a repository that is gone, and a commit that never resolved. Both were recorded as
verification, and both made the profile *look* better checked than it was. **A citation that cannot
fail is not evidence** — and neither of these was written as a link, so the corpus's only gate was
never going to see them.

**Three of §10's unverified items rest on the phantom commit** and should be re-derived rather than
carried forward.

---

## ISSUE-025 — eight parallel runs, thirty-six defects: what a one-example skill did not know

**Severity:** MINOR · **Found:** 2026-09-08, W12 phase 3, across eight concurrent deep reads · **Assigned:** fixed in `skills/harness-deep-read/SKILL.md` in the same commit; two items remain open below

ISSUE-023 recorded four defects from the first real run. Eight parallel runs found **thirty-six more**.
The ones worth keeping are those **three or more agents found independently**, because independent
rediscovery is the only evidence available here that a defect is real rather than one agent's taste.

### Found independently by three or more

| Defect | Found by | Fix |
|---|---|---|
| **No instruction to re-pin the version.** An agent following only the skill inherits the profile's tag, dates the set today, and publishes a confidently stale snapshot — the exact failure §6 exists to prevent | Pi, Hermes, Gas City, FRACTAL | §6: resolve the current version yourself; the profile's pin is a datum. Pin what the docs are generated from and state the release lag |
| **`allowed-tools` cannot execute the skill.** No `curl`, no `tar`, no `mkdir`, no `git clone`, no `python3`. A 123 KB doc file, a pinned release tarball, and a repository with no docs site are all unreachable as written | Pi, OpenCode, Gas City, FRACTAL, OpenClaw | Frontmatter widened |
| **§4's three outcomes are too few.** A claim can be partly mechanised, contradicted by the system's own code, contradicted by another vendor page at the same version, or un-mechanisable by construction | OpenCode, LoomWarp, Hermes, Grok, OpenClaw | Four rows added |
| **§5's drift rule is written for numbers.** Most drift is not a figure — a quoted sentence gains a clause, a mechanism is re-framed onto a different axis, a relayed claim disagrees with source at the *same commit* | Gas City, Hermes, LoomWarp, FRACTAL, OpenClaw | Generalised; consolidated table required above ~3 |
| **§8 is entirely subtractive.** Four "delete this" bullets and no inclusion test, so every candidate page fails on first look; and no way to declare a surface deliberately not written | Pi, Gas City, Hermes, OpenClaw | Inclusion test added; *deliberately not documented here* required |
| **The per-document header shape is unspecified.** §6 demands three facts and names no fields, while giving nine lines of exact YAML for `verification:`. Two sets agreed only by copying the exemplar | OpenCode, Hermes, OpenClaw | Fields named. **A distributable skill cannot depend on an exemplar it does not ship** |
| **§7's source taxonomy misses classes that turned out decisive** — published machine-readable artifacts, generated docs nested in a module, a deliberately unpublished engineering tree, two directories both called `docs` | OpenCode, Grok, Gas City, Hermes | Four classes named |

### Found once, and kept because the failure is silent

- **A summarising fetch tool cannot produce a quotation** (OpenCode). Paraphrase inside quotation marks
  is fabrication, and nothing surfaces it. **This was not hypothetical: it had already put two misquotes
  into the committed Codex set**, and an audit of all ten ledgers found a third — a six-item refusal
  list published as one `·`-joined sentence the vendor never wrote. Fixed in the sets and in §7.
- **A contents API returns the default branch, not your tag** (OpenClaw). An outline fetched that way
  listed pages absent at the pinned tag; the two navs differed by 21 routes. Caught only by extracting
  the tarball. Silent corruption, now warned about in §6.
- **§9 step 1 contradicted §2's sub-agent carve-out** (Hermes). Step 1 said *"Agree the depth… with
  `AskUserQuestion`"* unconditionally, while the exemption sat in a §2 blockquote. An agent reading
  Steps as the procedure calls a tool with nobody to answer.
- **Nothing licensed running the code** (FRACTAL). Six failure modes in `router.py` were settleable only
  by executing it against constructed inputs. §9 now names it as an evidence step.
- **§9 step 4's *"its docs sidebar is the outline"* is actively misleading** (Hermes, OpenClaw). An
  overview page is often not an index of its own directory, and a nav may be a browsing tree rather than
  a surface list. Verify against a directory listing; record where you departed from the grouping.
- **Rule 9 is hardest inside the instance you are describing** (FRACTAL). The working test is now in §1.

### Two heuristics this workstream itself got wrong

**Both were written into the skill or the PRD by the same author who then watched them fail.**

1. **§2 said a published refusal list *"may be a legitimate Index read."*** Backwards. Pi's refusal list
   was the surface that most needed a page — three sources that never meet — and the agent found **two
   of six refusals have nothing shipped behind them**, which is a finding no Index read would surface.
   The sentence was written *from* Pi without having read Pi.
2. **The phase-3 map claimed coverage predicts depth.** *"Coverage is the best available proxy for how
   much surface there is to document."* Pi has the thinnest coverage in the corpus and the largest
   single documentation file in it. Coverage measures what fraction of **our** component list a harness
   ships; it says nothing about how much the vendor wrote. They are independent.

### Still open

- **Depth does not compose across products** (Grok). One Standard setting gave an open-source runtime
  8 documents and a closed hosted product 3 — a difference measuring what was *reachable*, not what
  exists. §2 now says agree a depth per product; whether that is sufficient is untested.
- **§5's link contract assumes one document per §6 row** (Grok). Nine of seventeen rows had to point at
  two, and there is no stated convention for ordering or labelling them.

---
