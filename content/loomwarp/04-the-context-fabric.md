---
status: DRAFT
title: "The federated context fabric"
tier: reference
project: harness-atlas
source: "`loomwarp-team-system` @ `8844df6` (branch `master`, private) — `context/`, `docs/ARCHITECTURE.md`, `control/dispatch.py`, `fractal/BLUEPRINT-*.yaml`, `.gitignore`"
version_at_capture: "8844df6f4bc48f8a563340eb3163401792e000d5"
source_verified: "2026-09-08"
---

# The federated context fabric

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `loomwarp-team-system` @ `8844df6` (private), **2026-09-08**.

`docs/ARCHITECTURE.md` names `context/` *"federated context fabric"* and labels its four
subdirectories in the topology diagram. They are four unrelated mechanisms with one parent
directory, not four tiers of one store — nothing joins them and none is the others' source of truth.

| Layer | Diagram label | What it is |
|---|---|---|
| `context/org/` | *"PRINCIPLES.md — real"* | One 19-line markdown file |
| `context/domain/` | *"CONVENTIONS.md — real, load-bearing contract"* | Per-domain markdown, authored |
| `context/evidence/` | *"populated at run time"* | Written by `dispatch.py`, gitignored |
| `context/memory/` | *"decision-ledger — adapted from real prior art"* | A TypeScript ADR store with a schema |

---

## 1. `context_bundle` — the only resolution mechanism

A workstream's `context_bundle:` is a list of repository-relative paths. `build_prompt_for` opens
each one and `assemble_prompt` concatenates them, each preceded by `--- {path} ---`, ahead of the
PRD text. That is the entire mechanism: no ordering rule, no size limit, no deduplication, no
version pin, no hash, no record of what was resolved.

Every workstream in both blueprints selects its own bundle by hand. `context/org/PRINCIPLES.md`
appears in every workstream of `BLUEPRINT-CrossRepo-Demo.yaml` and in three of eleven in
`BLUEPRINT-LoomWarp-V1.yaml`; the file itself claims a stronger rule — *"Always-on, loaded into
every dispatched workstream regardless of repo or domain."* Nothing enforces "always-on"; it is a
line in a YAML list each time.

Four of the V1 blueprint's bundle entries point outside the control plane's own directories, into
`projects/loomwarp/` — the design-specification tree, which is outside this set's scope.

## 2. `context/org/PRINCIPLES.md`

Seven numbered principles, *"Kept deliberately small."* Three of the seven make claims that other
parts of the tree bear on:

> 1. **Deny wins.** Policy enforcement (see `policy/`) is outside the prompt and cannot be weakened
>    by a workstream, a repo, or an agent's own judgment.

The dispatcher that ships this text into the prompt passes `--permission-mode bypassPermissions`,
which skips deny rules — [`03-dispatch-and-outcome-classification.md`](./03-dispatch-and-outcome-classification.md)
§3, [`06-policy-tiers.md`](./06-policy-tiers.md).

> 6. **Silence is not success.** An agent that cannot proceed must say so explicitly (see the
>    BLOCKED-file convention in `control/dispatch.py`).

`control/dispatch.py` has no BLOCKED-file convention under that name. What it has is a generic
`{OUTCOME}.md` write, which produces `BLOCKED.md` when `classify()` returns `BLOCKED`. `.gitignore`
carries a third spelling, `BLOCKED-*.md`, which matches neither — and is redundant regardless,
because `context/evidence/*` is already excluded.

> 7. **The deterministic core does not move.** `fractal/router.py` is vendored unmodified… cross-repo
>    behavior is added through additive BLUEPRINT fields, never by changing router logic.

Verified mechanically at this read — [`01-the-vendored-core.md`](./01-the-vendored-core.md) §4.

## 3. `context/domain/taskflow-platform/`

Two files. `CONVENTIONS.md` (53 lines) is the shared contract both siblings in the demo had to read,
and is the one file `docs/DEMO-SCRIPT.md` opens on stage to show the federation working.
`CAPABILITIES.md` (11 lines) is a two-row table of repository → capability → owner, and states its
own boundary: *"This domain currently spans 2 repositories (the MVP boundary from the foundation doc
calls for 3–5 — this demo intentionally starts smaller)."*

There is one domain. The directory shape allows more; nothing else exists at this commit.

## 4. `context/memory/decision-ledger/` — the one schema-validated store

The only place in the tree where a schema is loaded and enforced by code. Adapted, per its own
header, *"from a real, tested decision-ledger implementation… Genericized here from a tenant-specific
taxonomy into a plain ADR shape — a pure YAML edit, no code change."*

```
schema/schema.yaml     entry types, statuses, layers, RACI and audit requirements
schema/people.yaml     the contributor registry the validator reads
schema/validate.ts     the validator
storage/               atomic-write.ts · locks.ts · audit.ts · sqlite-index.ts · cli.ts · config.ts · index.ts
store/ADR-001…005.md   five entries
package.json           the store's own Node dependencies
```

**`schema.yaml` v2.0** declares four `statuses` (`proposed`, `accepted`, `superseded`, `deprecated`),
four `layers` (`architecture`, `process`, `tooling`, `governance`), and one `entry_type`, `decision`,
with `id_pattern: "^ADR-\\d{3}$"` and eleven required fields — including `raci`, `created_by` and
`updated_by`. `layer_required: false`. `audit_schema` pins an ISO-8601 timestamp pattern.

**`people.yaml` v1.0** holds two entries: `KD` (Kevin Deng, Owner, default RACI `A`) and `AGENT`
(Dispatched Agent, "Implementer (Feature Lead / Architect)", default RACI `R`). Its comment states
the extension path — *"Add contributors here — no code change needed, the validator picks up new
initials immediately."*

**Five ADRs** are on disk, `ADR-001` through `ADR-005`, all `status: accepted`, all `owner: KD`, all
`created_by: KD`. `ADR-001` is the unmodified-router decision cited throughout the tree; `ADR-005`
is the `bypassPermissions` decision, whose text is the source of the comment in `dispatch.py`.

**Nothing in the control plane reads this store.** `dispatch.py` does not import it, `router.py` does
not know about it, and no ADR path appears in either blueprint's `context_bundle`. It is reached by
`npx tsx storage/cli.ts list` / `audit`, which is how `docs/DEMO-SCRIPT.md` presents it.

`STRATEGIST-loomwarp.md` §8 states the intended discipline for it: *"ADRs; decisions are recorded
there, never inline in prose."*

## 5. `context/evidence/`

Structure is fixed by `dispatch.py`: `context/evidence/{feature_lead}/{run.json, {OUTCOME}.md}` —
keyed by the workstream's `feature_lead` name, not its `kebab`. The directory is gitignored except
for `.gitkeep`, and holds only `.gitkeep` at this commit. Contents and limitations are in
[`03-dispatch-and-outcome-classification.md`](./03-dispatch-and-outcome-classification.md) §5.

---

## 6. Four stores, one directory, no join

State that survives a session lives in four places, written by four different mechanisms, in four
formats:

| Store | Written by | Format | Tracked in git |
|---|---|---|---|
| `fractal/.state.json` | `router.py` | flat JSON map, overwritten wholesale | no — gitignored |
| `context/evidence/<ws>/` | `dispatch.py` | JSON + markdown, per run | no — gitignored |
| `control/events.jsonl` | `dispatch.py` | JSON Lines, append-only, no schema | yes |
| `context/memory/decision-ledger/store/` | a CLI a person runs | markdown + YAML frontmatter, schema-validated | yes (the SQLite index is not) |

No identifier is shared across all four. A workstream appears in the first as a `feature_lead` key,
in the second as a directory of the same name, in the third as a `workstream` field — and not at all
in the fourth. `standards/evaluation-doctrine.md` §3 specifies what a bundle would need to join them:
*"Stable identifiers: job, workstream, trace — assigned at intake and propagated through every
event"* and *"The resolved context set: each artifact, its version, its content hash, when it was
resolved, and who owns it."* Neither an intake step nor a resolved-context record exists in the code.
