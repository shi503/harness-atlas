---
status: DRAFT
title: "FRACTAL — the kernel, added after the pinned commit"
tier: reference
project: harness-atlas
source: "shi503/fractal-agent-system @ 9905012412fb7847893d630701e7ec75cf222760 (origin/main)"
version_at_capture: "9905012 (2026-09-03) — four commits past the pinned 6398f6db"
source_verified: "2026-09-08"
---

# The kernel

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**Outside the pinned read.** Read against `github.com/shi503/fractal-agent-system` at
**`9905012`** (2026-09-03), **2026-09-08** — four commits past `6398f6db`, the commit every other
document in this set and the profile's own §6 rows describe. **This surface has no counterpart in the
profile**; nothing there links out to it, and nothing here should be read as scoring or as a revision
of anything the profile records.

It is documented because it is the only substantive change upstream since the pinned commit, and
because it is the first mechanical validation the family ships.

---

## 1. What arrived, and when

`git rev-list --count 6398f6db..origin/main` returns **4** on 2026-09-08; `git diff --shortstat`
returns *16 files changed, 1506 insertions(+), 230 deletions(-)*. Two of those commits are a dependency
bump and its merge. The rest is one feature — *"feat: add portable harness kernel contract"*
(`bdbb56e`, merged as `ff4fb07`) — plus a ten-line README edit.

```
kernel/
├── README.md                                    178 lines
├── validate.py                                  163 lines
├── schemas/blueprint.schema.json                138
├── schemas/evidence.schema.json                 101
├── templates/{BLUEPRINT.yaml, prd.md, evidence.md}
└── examples/nova-p1-notification-core/
    ├── BLUEPRINT-NOVA-P1-NotificationCore.yaml  102
    └── {notification-schema, notification-inbox,
       notification-prefs, notification-actions}/prd-*.md
.github/workflows/kernel.yml                      24
```

`kernel/README.md` states the boundary in its first two lines:

> Portable **spec / installer contract**. Not a Claude Code plugin rewrite.
>
> The kernel is the shared BLUEPRINT, PRD, evidence, and graph law. Each runtime (installer) copies
> those artifacts, then applies its own scheduler. Claude Code is the **default / primary** installer.

---

## 2. A second BLUEPRINT contract, incompatible with the first

The kernel's BLUEPRINT is a YAML **object** with ten required top-level keys; `router.py` parses a
top-level **list** of phases ([`03`](./03-blueprint-and-workstream-prd.md) §1). Neither reads the
other's shape.

| | `router.py`, at `6398f6db` | `kernel/schemas/blueprint.schema.json`, at `9905012` |
|---|---|---|
| Root | a list of phases | an object; required `name`, `title`, `date`, `status`, `revised`, `trigger`, `context`, `workstreams`, `parallel`, `notes` |
| Workstream identity | `feature_lead` — an agent name | `id` |
| Workstream keys | `feature_lead`, `model`, `prd`, `dependencies` | required `id`, `name`, `prd`, `description`, `depends_on`, `acceptance` — and `additionalProperties: false` |
| `model:` | read and printed | **rejected by the schema** |
| Epic status | not represented | `draft \| active \| complete \| superseded`, annotated *"Epic-level lifecycle only. Workstream readiness is derived from accepted evidence, not this field."* |
| Readiness | `dependencies` all `COMPLETE` in `.state.json` | every `depends_on` has evidence with `accepted: true` |

`additionalProperties: false` on the workstream object is the sharp edge: `model:` and `feature_lead:`
are not merely discouraged in a kernel BLUEPRINT, they fail validation. The README lists both under
*"KERNEL MUST NOT include"*, alongside *"`.claude/` paths in schemas or kernel templates"*,
*"`router.py`, plugin marketplace, slash commands, or PULSE.md as required protocol"*, and
*"Stored PRD Status as source of truth"*.

**Both contracts ship in the same tree, and coexistence is explicit.** The README's Claude Code row
says the existing layout stays valid — *"You may **keep using the existing project layout**… Copying
kernel templates is not required to run first-run"* — and that Claude *"may keep installer extensions
the kernel forbids: `model:` on workstreams, `feature_lead` names, phase-list BLUEPRINTs, `.state.json`,
slash commands, PULSE.md. Those are Claude-only. Do not put them back into `kernel/`."*

---

## 3. The graph law

Five numbered rules in `kernel/README.md`, and they name the two things the pinned router leaves
implicit:

1. *"`depends_on` lists workstream `id` values only — not Feature Lead names, phase titles, or PR
   numbers."*
2. *"Empty `depends_on` means ready when the epic is active."*
3. *"A workstream is **ready** only after every dependency has evidence with `accepted: true`
   (markdown: **Accepted:** yes)."*
4. *"`parallel` and `notes` document execution order. They do not replace `depends_on` and they do not
   unlock work."*
5. *"PRD Status is not a readiness signal."*

Rule 1 separates the dependency key from the agent name — the collision reproduced in
[`04`](./04-router.md) §5 #4. Rule 3 makes acceptance, not a written status string, the readiness
condition — which is the gap [`06`](./06-the-evaluation-layers.md) §3 records.

---

## 4. Evidence replaces HANDOFF as the contract term

`kernel/schemas/evidence.schema.json` requires eight fields: `workstream_id`, `blueprint`, `accepted`,
`work_completed`, `work_not_completed`, `technical_debt`, `key_decisions`, `layer1`. The markdown
template's headings are `## Work completed`, `## Work not completed`, `## Technical debt`,
`## Key decisions / deviations`, `## Layer 1 — command table` with `### lint / build / typecheck / test`.

The README's requirement, verbatim:

> **Evidence:** work completed, work not completed, technical debt, key decisions / deviations, Layer 1
> command table with **pasted output** (not self-assessment).

`accepted` is a required field on the artifact — the first place in the family where the acceptance
decision is part of the record rather than a state transition performed elsewhere. The kernel README
notes the shapes already match: *"Claude's handoff skill already matches this shape."* What it does not
carry is `New Dependencies Added`, the fifth section of the agent-file HANDOFF template
([`05`](./05-handoff-and-pulse.md) §1).

**PRD path is a law, not a convention:** `validate.py` fails unless every `prd` equals
`workstreams/{id}/prd-{id}.md`. That is the mapping nothing performed at the pinned commit
([`03`](./03-blueprint-and-workstream-prd.md) §3), turned into a check.

---

## 5. `validate.py` — what it checks, and what it can be pointed at

163 lines, dependencies `pyyaml` and `jsonschema`, run by a GitHub Actions job on any push or pull
request touching `kernel/**`. Its docstring opens *"Not a router."* Three checks:

1. **Schema** — Draft 2020-12 validation of the example BLUEPRINT against `blueprint.schema.json`.
2. **Graph law** — duplicate `id`s; `depends_on` ids that exist and are not self-referential; a Kahn
   topological sort that fails with `depends_on cycle involving: [...]`; `parallel` waves referencing
   known ids; `prd` matching the required path; and every referenced PRD file existing on disk.
3. **Installer leaks** — a regex scan of `schemas/`, `templates/` and `examples/` refusing any
   `.claude/` path or `model:` field, with the message *"installer leak in kernel
   schemas/templates/examples"*.

**It takes no arguments.** `EXAMPLE_PATH` is hard-coded to
`kernel/examples/nova-p1-notification-core/BLUEPRINT-NOVA-P1-NotificationCore.yaml`, and there is no
CLI to point it at a project's own BLUEPRINT. Cycle detection and dependency-name validation therefore
exist in the repository and run in CI against the kernel's own example — they are not, at `9905012`, a
check a user's epic passes through.

`.github/workflows/kernel.yml` in full is a checkout, a Python 3.12 setup, a `pip install pyyaml
jsonschema`, and `python3 kernel/validate.py`. At the pinned commit `.github/` held one
`dependabot.yml` and no workflow.

---

## 6. The installer matrix

`kernel/README.md` splits every runtime into three columns — what you copy from `kernel/`, what you
must **not** copy, and the native scheduler. Claude Code is *"DEFAULT"*, with `router.py` named as its
scheduler and the plugin marketplace and slash commands marked *"Claude installer, not kernel"*. Two
further installer rows follow the same shape, each with its own acceptance mechanism in place of router
state — the README's table gives *"How 'accepted' is recorded (Claude: router state; Grok Bot: PR/CI;
Cursor: files + GitHub hooks)"*.

The ownership split, verbatim from the kernel-vs-installer table:

| | Kernel owns | Installer owns |
|---|---|---|
| | *"BLUEPRINT fields, PRD sections, evidence sections, graph law, JSON Schemas, harness-neutral templates"* | *"Where files live on disk, how work is scheduled, model routing, plugins, PRs, CI YAML"* |
| Source of readiness | *"Every `depends_on` id has **accepted evidence**"* | *"How 'accepted' is recorded"* |

---

**Back to:** [`00-README.md`](./00-README.md) · **the synthesis:**
[`20-consolidated-guide.md`](./20-consolidated-guide.md)
