---
status: DRAFT
title: "Grok Build — subagents, personas, roles and plan mode"
tier: reference
project: harness-atlas
product: "Grok Build"
source: "xai-org/grok-build @ 7581004 — user-guide 04, 16, 19"
version_at_capture: "commit 7581004 (SOURCE_REV eb4a894), no tags"
source_verified: "2026-09-08"
---

# Grok Build — subagents, personas, roles and plan mode

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**Product: Grok Build**, the Apache-2.0 Rust runtime. **Grok Bot delegates between whole Bots**, by
`@` mention and group chat, with no subagent, persona or plan object; see
[`09`](./09-bot-bots-and-the-agent-computer.md) §4.

Read against `xai-org/grok-build` at commit `7581004`, **2026-09-08**. No tags exist.

---

## 1. Three objects, deliberately separate

*"An agent defines the session itself. A persona shapes how a subagent behaves within a session."*

| | **Agents** | **Personas** |
|---|---|---|
| Configure | *"The whole session: model, tools, prompt mode, system prompt"* | *"A behavioral overlay added to a subagent's prompt"* |
| Scope | primary session or subagent | **subagents only** |
| Set in | `.grok/agents/*.md`, `~/.grok/agents/*.md` | `[subagents.personas]` in `config.toml`, or `.grok/personas/*.toml` |
| Control | model, tool availability, prompt body, skills | *"Tone, output format, task focus, and input/output contracts"* |
| Examples | `grok-build`, `explore`, `plan` | `researcher`, `concise` |

*"A subagent always runs as an agent type (for example, `general-purpose`), and resolution can layer a
persona on top."* Both are managed in one modal — `/config-agents` (alias `/agents`), or `/personas`
for the second tab. **Roles** are a third file class, `.grok/roles/*.toml`, carrying a
`default_capability_mode`, a model and a prompt file; they sit between the two in the resolution order
below.

---

## 2. Built-in agent types and capability modes

| Type | What it may do |
|---|---|
| `general-purpose` | *"Default type. Full-capability agent for any task"* |
| `explore` | *"Searches, reads, greps, and runs shell commands, but does not edit files"* |
| `plan` | *"Explores the codebase and produces a structured implementation plan; does not edit files"* |

*"Project- or user-defined agents can add new types or shadow these built-ins by name."*

**Capability mode is not a spawn argument.** *"A child's tools come from its **agent type** and any
**role / definition default**."*

| Mode | Read | Write | Execute |
|---|:-:|:-:|:-:|
| `read-only` | yes | no | no — *"also web search and LSP"* |
| `read-write` | yes | yes | no |
| `execute` | yes | no | yes |
| `all` | yes | yes | yes — default for `general-purpose` |

---

## 3. Persona fields and the input/output contract

| Field | Effect |
|---|---|
| `instructions` | inline instruction text |
| `instructions_file` | *"loaded at spawn time and merged after `instructions`"* |
| `description` | *"Falls back to the first paragraph of `instructions`"* |
| `inputs` / `outputs` | declared contract, below |
| `model` | model override when the persona is used |
| `reasoning_effort` | effort override when the persona is used |
| `default_isolation` | `none` or `worktree` |

**The contract is the unusual part.** *"A persona can declare the inputs it expects and the outputs it
produces. The parent agent reads these to know what context to supply and what artifacts to expect.
This lets you chain personas, so one persona's output file becomes the next persona's input."*

```toml
[[subagents.personas.reviewer.inputs]]
name = "review_file"
io_type = "file"
required = true
description = "Path to the code under review"
```

Each entry has `name`, `io_type` (defaults to `file`), `required`, and `description`.

### Resolution order

Model and reasoning effort, highest first: **explicit spawn-time override → role default → persona
default → parent session.**

**Isolation follows the same order for the first three steps and then diverges**: it *"defaults to
`none` (no worktree) rather than inheriting from the parent session."*

**A failed persona is a failed spawn.** *"If a persona is requested but cannot be resolved — it is not
found, has no instructions, or its `instructions_file` is unreadable — the spawn fails."* This is one
of the few places in Grok Build documented as fail-closed.

---

## 4. Spawning, inheritance and depth

**Depth is one.** *"Only the top-level session spawns subagents. A subagent cannot spawn its own
subagents: the maximum nesting depth is one. If a subagent calls `spawn_subagent`, the call fails with
a depth-limit error."*

**`resume_from`** continues a completed subagent: *"The new subagent inherits the source's transcript,
tool state, and model; its system prompt and tools are re-rendered from the current agent definition.
The source must be completed (not running), belong to the current session, and use the same agent
type."*

**MCP inheritance** defaults to everything already connected. Controlled by agent frontmatter
`mcpInheritance`: `all` (default), `none`, or `named: [server, …]`. Trusted plugin `.mcp.json` servers
attach like any other, and *"child agents inherit them."*

**`isolation: worktree`** gives a file-editing subagent *"its own copy of the working tree… The
subagent's result includes the worktree path."* Managed through the ACP `x.ai/git/worktree/*`
extension methods, *"including an apply operation that merges changes back into the main working
directory."*

---

## 5. Plan mode — a four-state machine

| State | Meaning |
|---|---|
| `Inactive` | normal operation |
| `Pending` | *"Client toggled plan mode ON, but no prompt has been sent yet"* |
| `Active` | *"Plan-file edits are auto-approved; edits to other files are rejected"* |
| `ExitPending` | *"User toggled plan mode OFF while a turn is in-flight"* |

Transitions: `Inactive → Active` when `enter_plan_mode` is called and approved (*"skips Pending"*);
`Inactive → Pending` on `/plan` or `Shift+Tab`; `Pending → Active` on the first prompt; `Active →
Inactive` on approved `exit_plan_mode` or an idle toggle-off; `Active → ExitPending → Inactive` when
toggled off mid-turn.

*"Plan mode state is persisted to disk and survives process restarts. Transient states (`Pending`,
`ExitPending`) are collapsed to `Inactive` on restart."*

### The plan file

Written to `plan.md` in the session directory. The five required parts: *"A **Context** section
explaining why the change is being made · The recommended approach (not every alternative) · The paths
of critical files to modify · Existing functions and utilities to reuse, with their file paths · A
verification section describing how to test the changes end to end."*

`exit_plan_mode` *"reads the plan file from disk"* and opens a scrollable preview with approve /
request changes / quit. *"If the agent exits without writing a plan (empty or missing `plan.md`), the
same approval surface still opens with a clear empty-state message."*

### Three enforcement edges, all stated

Plan mode's edit gate is *"independent of the permission mode"*, and the guide names exactly where it
stops:

1. **Always-approve stays armed underneath.** *"Non-edit tools (bash commands, reads, MCP tools) still
   auto-run, but file edits are blocked until you approve exiting plan mode."*
2. **Shell writes are not covered.** *"Bash commands are not inspected for file writes — plan mode
   blocks the edit tools, not shell redirection."*
3. **Subagents are not covered.** *"Each subagent starts with a fresh plan-mode tracker (`Inactive`),
   so a `general-purpose` (or other write-capable) subagent can edit files while the parent is still in
   plan mode — and it inherits the parent's permission mode (including always-approve)."* Read-only
   types stay limited by their own toolset.

Compaction preserves the state: *"The compacted context includes a reminder that plan mode is active."*

---

## 6. `/goal` — the other control loop

*"Grok works across rounds and only marks the goal complete after an independent evidence review
confirms the claim; if that review can't reproduce the result or has no usable evidence, the goal stays
active or pauses with concrete gaps."*

Arguments: `<objective> [--budget <tokens>]`, or `status` / `pause` / `resume` / `clear`. *"The
`--budget` here is a **token** budget for the goal run, separate from the agent-count budgets that
workflows use."*

**Which driver runs it depends on a feature flag.** *"With [background workflows] on, the host evaluates
each model round and runs adversarial verification on completion candidates; with them off, the legacy
model-facing `update_goal` path reports progress and triggers verification."* Two different
architectures behind one command name.

And its relationship to the stop gate is stated in the hooks page: *"grok's goal loop is a separate
feature that runs before the stop gate; it is not a prompt-type Stop hook"*
([`03`](./03-build-hooks.md) §5).

---

## 7. What is not documented

- **No concurrency cap on subagents.** Depth is capped at one; how many may run at that depth is not
  stated. Checked UG/16 in full, UG/20, UG/26 §`subagents`.
- **No stated behaviour when two `isolation: worktree` subagents touch the same files.** The apply
  operation is named; conflict handling is not. Checked UG/16 §Isolation, UG/15 §Extension methods.
- **No documented plan-mode equivalent for a headless run.** `/plan` and `Shift+Tab` are interactive;
  whether `grok -p` can enter the state is not said. Checked UG/19, UG/14 §Command-Line Options.
