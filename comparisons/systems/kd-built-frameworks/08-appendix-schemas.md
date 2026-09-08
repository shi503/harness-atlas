---
title: "Appendix — lift-ready schemas and templates"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# Appendix — schemas and templates

**What this is.** The formats behind everything in [`01`](./01-the-composition-contract.md)–[`06`](./06-capability-and-standards.md), extracted so LoomWarp never has to read the predecessor to adopt them. Genericized: placeholder names, no initiative-specific content, stack-neutral gate commands.

**How to use it.** Each section states what to change before adopting. Where a format has a known defect, the defect is marked **✗** inline rather than left for someone to rediscover.

---

## 1. Blueprint — the decomposition declaration

```yaml
name: {PhaseName}                 # machine key; matches the filename stem
title: "{Phase N} — {human title}"
date: YYYY-MM-DD
status: DRAFT
revised: |
  YYYY-MM-DD — {INITIALS}. {reason for revision}
trigger: |
  {what caused this phase to exist}
context: |
  Source documents: {paths}
  Locked decisions: {IDs, one line each}
  Pending: {what is deliberately unresolved}

workstreams:
  - id: WS-1
    name: {PascalCaseName}
    prd: workstreams/{kebab-name}/prd-{kebab-name}.md
    model: {small | large}        # tier by judgement required, not by size of diff
    owner: {role}
    description: |
      {one paragraph}
    depends_on: []                # [] or [WS-N, WS-M]
    acceptance:
      - {gate command passes}
      - {grep-checkable assertion}

parallel: false
notes: |
  {execution waves · model-tier justification · follow-ups · archive instruction}
```

**Adopt as-is.** Three fields do more work than they look:

- `acceptance` entries are written to be **grep-checkable** — *"`grep X path` returns no matches"* rather than *"the migration is complete."*
- `context` carries three labelled registers (sources / locked decisions / pending). The third is what stops a decomposition silently assuming a resolution.
- `notes` carries the **execution waves** — the human-readable reading of the dependency graph, which is what a reviewer actually checks.

**Contingency edges** are expressed in `description` prose (*"runs ONLY IF the evidence from WS-G fails"*) — the schema has no field for them and nothing enforces them. If you need conditional workstreams, add a field.

**✗ Do not carry over:** the legacy phased variant (top-level list of phases with `feature_lead:` and `dependencies:`). Supporting two shapes cost the predecessor a normalization layer in its router. One schema.

---

## 2. Workstream artifacts

Directory: `workstreams/{kebab-name}/` containing `prd-{kebab-name}.md`, `PULSE.md` (gitignored), `HANDOFF.md`.

### 2.1 PRD

````markdown
# PRD — {WorkstreamName}

**Blueprint:** `blueprints/{name}.yaml`
**Workstream ID:** `{WS-N}`
**Model tier:** `{small | large}`
**Owner:** {role}
**Depends on:** `{list or []}`
**Status:** `NOT_STARTED`

> **Authoring note (delete before handoff):** A worker starts fresh with no context beyond
> this PRD. If the PRD is ambiguous, the work will be ambiguous. Reference guides by path;
> do not paste guide content inline. Link to decisions by ID rather than re-explaining them.

## 1. Feature Overview
{what is being built, for whom, why now}
**Source documents:** {paths}
**Locked decisions:** {ID: one-line summary}

## 2. Acceptance Criteria
Specific and verifiable. Each independently checkable without the author present.
- [ ] …

## 3. Read / Write File Manifest
**Read only** (context — do not modify): {paths}
**Write / modify** (scoped change surface): {paths}
**Create** (new files): {paths}

## 4. Gate
Not COMPLETE until this passes with zero errors on the machine executing the work.
```{lang}
{literal runnable commands}
```
Omit inapplicable commands and document the reduced gate here.

## 5. Session Protocol
- Heartbeat: append a JSON block to `PULSE.md` every ~30 min or at task boundaries.
- On completion: generate `HANDOFF.md`.
- On block: set `status: BLOCKED` + `escalation_needed: true` and **stop** — do not guess
  around architectural ambiguity.

## 6. Out of Scope
Explicit non-goals. Surfaces the seam for the next workstream.

## 7. Blockers
**Blockers:** None
Append as work progresses; convert resolved ones to a note rather than deleting them.
````

**✗ Status vocabulary defect.** The header above declares five statuses in the predecessor (`NOT_STARTED`, `IN_PROGRESS`, `BLOCKED`, `IN_REVIEW`, `COMPLETE`); its router validated three, and silently bucketed the unknown two as not-started. **Declare one vocabulary in one place.**

### 2.2 PULSE

Append-only. One fenced JSON block per entry; never mutate a prior entry.

```json
{"timestamp":"YYYY-MM-DDTHH:MM:SSZ","status":"IN_PROGRESS","tasks_completed":"2/7","blockers":"none","escalation_needed":false,"notes":"AC 1-2 green; starting AC 3"}
```

`notes` is optional. `escalation_needed: true` only when blocked **and** the blocker is architectural.

**The checker contract:** extract every fenced JSON block, parse the **last** one, alert if `escalation_needed` is truthy **or if the block does not parse**. Failure alerts rather than passes.

### 2.3 HANDOFF

```markdown
# HANDOFF — {WorkstreamName}
**Completed:** YYYY-MM-DD · **Blueprint:** {path} · **PRD:** {path}

> This file is the approval gate. Do not generate it if the gate is failing.

## 1. Summary of Work Completed
Cite file paths, symbol names, line numbers. Prose alone does not satisfy this section.

## 2. Summary of Work NOT Completed
Write `None` explicitly if everything shipped.

## 3. Technical Debt Register
What · why · remediation path. Or `None`.

## 4. Key Decisions Made
Decision · reasoning · impact. Propagate architectural decisions to the decision store.

## 5. Gate Results (Layer 1)
| Check | Result |
|---|---|
| {command} | PASS / FAIL / N-A |

## 6. Verification for Reviewer
Numbered steps to reproduce.

## 7. Next Steps / Handoff Notes
```

The forced-`None` convention in §2 and §3 is the load-bearing detail: an explicit negative cannot be skipped the way an omitted section can.

---

## 3. Decision entry

```yaml
---
id: ADR-001                       # ^ADR-\d{3}$ — or your own pattern
type: decision
title: "{imperative statement of what was decided}"
owner: {INITIALS}
status: DRAFT
layer: architecture               # architecture | process | tooling | governance
raci:
  responsible: [{INITIALS}]       # REQUIRED · min 1 · max 5
  accountable: []                 # 0–3
  consulted: []                   # 0–10
  informed: []                    # 0–20
created: YYYY-MM-DDTHH:MM:SSZ
updated: YYYY-MM-DDTHH:MM:SSZ
created_by: {INITIALS}
updated_by: {INITIALS}
tags: []
cross_refs: []
---

## Context
## Decision
## Consequences
```

**The four rules that make it work:**

1. **Entry types live in `schema.yaml`, never compiled into the validator.** A new type is a YAML edit. This is what made genericizing the predecessor's taxonomy free.
2. **`responsible` has a floor of 1** — a guard against unowned decisions, and the only mechanically enforced rule in the source system.
3. **Markdown canonical, index derived.** The index rebuilds losslessly; a consistency check compares each indexed row to its file by hash and reports drift in both directions.
4. **One sanctioned write path.** Direct file writes into the store are a violation, and so is treating knowledge-base prose as a decision.

Supporting tables in the derived index: entries, locks (id, actor, acquired, expires_at, session_id — short TTL), and an **insert-only** audit log (entry_id, actor, operation, before_hash, after_hash, timestamp).

**Migration convention:** unmappable source fields become a visible flag in the entry body — `[IMPORT] FLAG:{field}` — never a silent omission.

---

## 4. Path-scoped rule file

```yaml
paths: ["glob", "glob"]
---

# {Rule name}

**Rationale:** {the failure this prevents, with the incident that produced it}

## Rules
1. …
```

Frontmatter is `paths:` alone — no name, no description. Globs are **orthogonal to directory structure**: `**/*.md` attaches a rule to a file *kind* across the whole tree, which is the complement to the native parent-child hierarchy that keys on location.

Observed set in the predecessor (9 files): a naming/terminology rule and an authoring rule on all markdown; an orchestration-protocol rule on the framework tree; a decision-ledger rule on the spec trees; a meeting-notes rule; a memory-routing rule on memory paths; a plugin-authoring rule on the plugin tree; a retrieval rule on the knowledge base and project trees; a cross-repo reference rule on all markdown.

**The pattern worth copying:** each rule opens with the *failure it prevents*, not with the rule itself. A rule whose rationale is missing gets argued with; one that names the incident does not.

---

## 5. Skill and plugin shapes

```
plugins/<plugin-name>/
├── .claude-plugin/plugin.json      # name, version, description, author
├── README.md
└── skills/<skill-name>/
    ├── SKILL.md
    ├── references/                 # deep-loaded only when the skill runs
    ├── examples/
    └── scripts/                    # use ${CLAUDE_PLUGIN_ROOT} for all paths
```

```yaml
---
name: <kebab-case>                  # must match the folder name
description: >
  What it does, in one or two sentences. Use when the user asks to
  <phrase 1>, <phrase 2>, or <phrase 3>.
disable-model-invocation: true      # side-effecting or user-only skills
allowed-tools: "Bash(git diff *) Read Grep"
argument-hint: "[arg]"
---
```

**Four disciplines:**

- **The description is the entire trigger.** There is no separate trigger-phrase field; the predecessor removed a non-existent one from 16 skills that had been silently under-triggering. Write it as *what + when*, ending in the literal phrases a user would say.
- **`model` and `tools` are not skill-level fields.** `model` belongs on an agent; tool restriction is `allowed-tools`.
- **`disable-model-invocation: true` on anything side-effecting** — writes, posts, publishes, or touches orchestration state. Specified as a floor, extended as new skills land.
- **A `## Gotchas` section on every skill**, carrying exact failure points and field-name mappings rather than a restatement of the skill's own steps.

**✗ Do not define the same agent in two scopes.** The harness resolves by frontmatter `name:`, not by path; two definitions both load and the winner depends on load order. The predecessor has this drift and documented it without closing it.

---

## 6. Framework defect register

```markdown
## ISSUE-{NNN} — {short title}
**Severity:** CRITICAL | WARN | MINOR
**Status:** OPEN | RESOLVED
**Reported:** YYYY-MM-DD
**Symptom:** {what was observed}
**Root cause:** {if known}
**Resolution:** {link to the handoff that closed it}
```

Append-only. Severity `CRITICAL` means it breaks the state machine or blocks execution.

**The gate is the valuable half:** before authoring a new decomposition, read the register. Any open critical issue becomes a workstream in the new phase or is explicitly deferred in that blueprint's `notes`. Without the gate, the register is a diary.

---

## 7. Archive discipline

```
_archive/r{NN}-{slug}/
├── MANIFEST.md          # per-workstream table: has PRD? has HANDOFF?
├── blueprints/
└── workstreams/{kebab}/{prd,HANDOFF}.md
```

**Cut criteria (all three):** every workstream in the phase is complete · the phase commit has landed · the next blueprint is about to activate.

**Never archive:** the defect register · the Tier-0 intent doc · root instruction files · templates · evaluation templates · the router · live state · benchmarks · intake staging.

The manifest preserves asymmetry rather than remediating it — a workstream with a PRD and no handoff is recorded as such. An archive that tidies its own gaps destroys the evidence of how the phase actually ran.

---

*Companion: [`01-the-composition-contract.md`](./01-the-composition-contract.md) — why these shapes exist · [`07-transfer-manifest.md`](./07-transfer-manifest.md) — which to adopt · [`adr-seeds/`](../../../archive/adr-seeds/README.md) — the decisions that would adopt them*
