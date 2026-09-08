---
status: DRAFT
title: "FRACTAL — the BLUEPRINT and the workstream PRD"
tier: reference
project: harness-atlas
source: "shi503/fractal-agent-system @ 6398f6db059598e381336601b21609928cf24034"
version_at_capture: "6398f6db (2026-04-20)"
source_verified: "2026-09-08"
---

# The BLUEPRINT and the workstream PRD

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `github.com/shi503/fractal-agent-system` at **`6398f6db`** (2026-04-20), **2026-09-08**.

The two things the Architect authors. The BLUEPRINT is the only file `router.py` parses; the PRD is the
only context a Feature Lead gets.

---

## 1. The BLUEPRINT, in full

A YAML file at `.claude/fractal/BLUEPRINT-{EpicName}.yaml`. The shipped example, complete:

```yaml
- name: "Phase 1 — Parallel workstreams"
  workstreams:
    - feature_lead: FeatureLead-ExampleBackend
      model: sonnet
      prd: .claude/fractal/workstreams/example-backend.md
      dependencies: []

    - feature_lead: FeatureLead-ExampleFrontend
      model: sonnet
      prd: .claude/fractal/workstreams/example-frontend.md
      dependencies: []

- name: "Phase 2 — Depends on Phase 1"
  workstreams:
    - feature_lead: FeatureLead-ExampleIntegration
      model: sonnet
      prd: .claude/fractal/workstreams/example-integration.md
      dependencies:
        - FeatureLead-ExampleBackend
        - FeatureLead-ExampleFrontend
```

**Six keys. The router reads three of them.**

| Key | Level | Documented as | What `router.py` does with it |
|---|---|---|---|
| `name` | phase | the phase label | **Never read.** No code path touches `phase["name"]` |
| `workstreams` | phase | the list | Iterated in `cmd_init` and `cmd_next` |
| `feature_lead` | workstream | *"names must be unique across the entire blueprint (used as state keys)"* | **The state key.** `state[workstream["feature_lead"]]` |
| `dependencies` | workstream | *"a list of `feature_lead` names that must be `COMPLETE`"* | Compared against the state map in `cmd_next` |
| `model` | workstream | *"a hint to the Architect"* | Printed in `next` output; defaults to `"sonnet"` if absent. Nothing else |
| `prd` | workstream | the path to the unit of work | **Never read.** The string `prd` does not appear in `router.py` |

Verified by grep at the pinned commit: the only workstream-key accesses in the 322-line file are
`workstream["feature_lead"]` (twice), `workstream.get("dependencies", [])` and
`workstream.get("model", "sonnet")`. The strings `prd`, `HANDOFF` and `handoff` do not occur in the
file at all.

**Consequence.** The BLUEPRINT is a dependency graph over *agent names*, and the document that defines
each unit of work is carried alongside it as a string nothing resolves. A `prd:` pointing at a file
that does not exist parses, initialises and schedules exactly like one that does —
[`04`](./04-router.md) §5 reproduces this.

### Format rules

- **Top-level list, never a dict.** Stated three times (README *"Known Gotchas"* #1,
  `SETUP-CLAUDE-CODE.md` §7, `BEST-PRACTICES.md` §1), each naming the same failure:
  *"`router.py` iterates the list directly and will throw `TypeError: string indices must be integers`
  if you use a dict wrapper."*
- **`.yaml`, not `.md`.** `load_blueprint()` accepts a `.md` file by scanning for the first
  ```` ```yaml ```` fence and reading to end of file with all backticks stripped.
  `BEST-PRACTICES.md` §4 marks this *"a legacy compatibility path"* and §1 records why it was replaced:
  *"it's cleaner, easier to validate, and avoids parse errors when the YAML is malformed inside a
  markdown document."* A `.md` blueprint with a second fenced block will not parse.
- **`feature_lead` uniqueness is a stated rule with no enforcement.** Two workstreams sharing a name
  collapse into one state entry silently — see [`04`](./04-router.md) §5.
- **Default to no dependencies.** `BEST-PRACTICES.md` §1: *"Most workstreams should have
  `dependencies: []`… The value of the dependency graph is identifying what can run in parallel, not
  creating artificial sequences."*
- **Path.** `BLUEPRINT_PATH` in `router.py` ships as the literal placeholder
  `BLUEPRINT-{EpicName}.yaml`. Either edit the constant per epic or pass `--blueprint <file>` on every
  invocation; there is no third option and no default that resolves out of the box.

### Two BLUEPRINTs ship

`BLUEPRINT-Example.yaml` (3 workstreams, two phases) and `BLUEPRINT-M1-CoreDataModel.yaml` (3
workstreams, three serial phases, for the TaskFlow demo). The second carries its gates as a **YAML
comment block** above the list — `npx prisma migrate deploy succeeds…`, `Auth E2E…`, `RLS verified…` —
because the schema has no field for them. Nothing reads a comment.

---

## 2. The workstream PRD

A markdown file at `.claude/fractal/workstreams/{kebab-name}.md`, described in `BEST-PRACTICES.md` §2 as
*"the only context a Feature Lead gets. It starts fresh with no memory of previous sessions. If the PRD
is ambiguous, the work will be ambiguous."*

**Required sections**, from `SETUP-CLAUDE-CODE.md` §8:

| Section | Contents |
|---|---|
| H1 | `# Workstream PRD: {FeatureLead-Name}` — the only place the state key and the document meet |
| `## Goal` | *"One-sentence description of what this workstream produces"* |
| `## Context` | Surrounding system, plus **Guides** *"(reference by path only — do NOT paste content inline)"* |
| `## Acceptance Criteria` | Checkbox list; *"Specific, verifiable outcome"*, ending with build/typecheck |
| `## File Manifest` | **Read:** files to understand first · **Write:** files that may be modified or created |
| `## Session Protocol` | Numbered: read manifest, implement, run build gate, `/pulse` if >30 min, `/handoff` on completion |

The three shipped example PRDs (`example-{backend,frontend,integration}.md`, 29–30 lines each) match
this exactly. The three real ones (`m1-*.md`, 169–288 lines) do not: they open with a four-field header
(`**Epic:**`, `**Feature Lead model:**`, `**Dependencies:**`, `**Estimated scope:**`), drop `## Context`
entirely, and insert `## Scope` or `## Data Model` plus `## Implementation Notes` before the manifest.
Both shapes are the vendor's; the template is a floor, not a schema.

**Four authoring rules**, `BEST-PRACTICES.md` §2, each stated as a consequence:

1. *"File manifests must be exhaustive. If a file isn't in the read manifest, the Feature Lead won't
   read it… Missing a read-only context file is the most common cause of Feature Lead mistakes."*
2. *"Acceptance criteria must be binary. 'Improve UX' is not a criterion. 'Badge shows count 1–99, then
   99+ above that limit' is. Every criterion must be provably pass/fail from the HANDOFF.md."*
3. *"Reference guides by path, never paste inline."*
4. *"Context section explains WHY, not just WHAT."*

Which guides a PRD names is chosen by the Architect from a **Guide Reference Matrix** in
`architect.md` — an eight-row table mapping workstream type (frontend component, state/data fetching,
backend route, agent-facing REST, database/schema, auth/security, compliance, tests) to the guide paths
to include, with the instruction *"Include only the guides relevant to each workstream type.
Unnecessary references create token bloat."*

### `docs/_PRD-template.md` is a different document

189 lines, and it is a **product** PRD template, not the workstream template above: Meta table,
Problem, Success Criteria, Scope, User Stories, Technical Approach, Risks, Open Questions, and a
55-item Verification Checklist. It instructs *"Save as `PRD-XXX-ShortName.md` in `.SPECS/PRD/`"* — a
directory that exists nowhere in the tree — and writes the framework directory as `.claude/FRACTAL/`.
Its one join to the workstream flow is a line addressed to agents: *"**AI Agents:** Include the output
of each check in HANDOFF.md Verification Evidence."*

---

## 3. The name mapping nothing performs

Three different names are derived from one another by convention, by hand, at three different places:

| Object | Example | Derived from | By what |
|---|---|---|---|
| state key | `FeatureLead-ExampleBackend` | authored in the BLUEPRINT | — |
| PRD file | `workstreams/example-backend.md` | the `prd:` string in the BLUEPRINT | authored; never resolved |
| HANDOFF / PULSE directory | `workstreams/example-backend/` | the Feature Lead name, kebab-cased | the model, at write time |

The `/pulse` skill states the mapping as examples rather than a rule, and its own second example is not
mechanical:

> `FeatureLead-PreferencesUI` → `.claude/fractal/workstreams/preferences-ui/PULSE.md`
> `FeatureLead-EventWiring-FileProcessing` → `.claude/fractal/workstreams/event-wiring-files/PULSE.md`

`FileProcessing` becomes `files`. No function performs this transformation, and the BLUEPRINT's own
`prd:` path — which would give an unambiguous kebab — is not consulted for it. A PRD at
`workstreams/example-backend.md` and a HANDOFF directory at `workstreams/example-backend/` therefore
coexist as a file and a directory whose relationship is naming convention only.

---

**Next:** [`04-router.md`](./04-router.md) — the machine that reads the BLUEPRINT.
