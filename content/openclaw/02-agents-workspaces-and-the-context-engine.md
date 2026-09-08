---
status: DRAFT
title: "Agents, workspaces, and the context engine"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Agents, workspaces, and the context engine

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

An agent is a config entry plus a directory. There is no agent-definition file: the identity lives in
`agents.entries.<agentId>`, and the behaviour lives in Markdown inside the workspace it names.

---

## 1. The workspace, and what is deliberately outside it

*"The workspace is the agent's home: the working directory used for file tools and workspace
context."* It resolves in this order:

1. `agents.entries.<id>.workspace`
2. `agents.defaults.workspace`
3. `OPENCLAW_WORKSPACE_DIR`
4. `<state-dir>/workspace` — `~/.openclaw/workspace`, or `~/.openclaw-<profile>/workspace`

**A sole configured agent inherits the root directly. In an explicit multi-agent roster, entries
without `workspace` get `<agents.defaults.workspace>/<agentId>`** — *"Naming a shared root does not
assign it to an agent."* Keeping `main` on an existing shared root therefore requires pinning
`agents.entries.main.workspace` explicitly.

**The workspace is the default cwd, not a boundary.** *"Tools resolve relative paths against the
workspace, but absolute paths can still reach elsewhere on the host unless sandboxing is enabled"* —
see [`13`](./13-tool-policy-approvals-and-sandboxing.md).

`agents.defaults.cwd` (and `agents.entries.*.cwd`) separates *where work happens* from *where the
agent's own files live*: bootstrap files and memory stay in the managed workspace while tools run in
a repository. Precedence is session-spawned cwd → entry cwd → defaults cwd → the workspace. *"A
distinct working directory requires an unsandboxed run; sandboxed runs reject it."*

**Not in the workspace, and named as such by the vendor:** `openclaw.json`,
`state/openclaw.sqlite`, `agents/<id>/agent/openclaw-agent.sqlite`,
`agents/<id>/agent/codex-home/`, `credentials/`, `agents/<id>/sessions/`, and managed `skills/`.

---

## 2. The bootstrap files

| File | Role | Loaded |
|---|---|---|
| `AGENTS.md` | *"Operating instructions for the agent and how it should use memory."* | Every session |
| `SOUL.md` | *"Persona, tone, and boundaries."* | Every session |
| `USER.md` | Directive-based user model — *"dated active or superseded directives"* | Every session, **separate 4,000-character budget** |
| `IDENTITY.md` | *"The agent's name, vibe, and emoji."* | Created/updated by the bootstrap ritual |
| `BOOT.md` | Optional startup checklist | Gateway startup, **only when the `boot-md` internal hook is enabled** |
| `BOOTSTRAP.md` | *"One-time first-run ritual. Only created for a brand-new workspace."* | First run; delete after |
| `MEMORY.md` | Curated long-term memory | Session start, main private session only — [`07`](./07-memory-dreaming-and-the-knowledge-wiki.md) |
| `memory/YYYY-MM-DD.md` | Daily log | Not injected wholesale; searched |
| `skills/` | Workspace skills, highest precedence — [`08`](./08-skills-and-the-skill-workshop.md) | Load time |

**Budgets.** `agents.defaults.bootstrapMaxChars` default `20000` per file;
`agents.defaults.bootstrapTotalMaxChars` default `60000`; `USER.md` keeps its own 4,000-character
cap. *"If a required bootstrap file is missing, OpenClaw injects a 'missing file' marker into the
session and continues."* Optional `USER.md` and `MEMORY.md` are simply omitted when absent.
`agents.defaults.skipBootstrap: true` turns off creation for operators who manage the files
themselves.

**One line worth knowing before treating `AGENTS.md` as policy:** its `## Tools` section *"does not
control tool availability; it is only guidance."*

---

## 3. The agent entry

`agents.entries.<agentId>` carries `workspace`, `agentDir`, `cwd`, `repoRoot`, `model`,
`identity {name, theme, emoji, avatar}`, `tools`, `skills`, `sandbox`, `runtime`, `default: true`,
and per-agent overrides of anything in `agents.defaults` the schema permits.

`agents.ownership: "explicit"` switches the roster to explicit ownership, after which bare session
keys such as `global` require a named owner.

CLI: `openclaw agents list [--bindings]`, `add`, `delete`, `set-identity`, `bind`, `unbind`,
`bindings`.

---

## 4. The context engine — a pluggable slot with four lifecycle points

The assembly of every prompt runs through a **context engine**, selected by
`plugins.slots.contextEngine` and defaulting to `"legacy"`.

| Point | When | What the engine may do |
|---|---|---|
| **Ingest** | A new message is added to the session | Store or index it in the engine's own store |
| **Assemble** | Before each model run | Return an ordered message set that fits the token budget, plus an optional `systemPromptAddition` |
| **Compact** | Context window full, or `/compact` | Summarise older history — [`06`](./06-sessions-compaction-and-pruning.md) |
| **After turn** | A run completes | Persist state, trigger background compaction, update indexes |

Optional beyond the four: `maintain()` for transcript rewrites through
`runtimeContext.rewriteTranscriptEntries()` (set `info.turnMaintenanceMode: "background"` to defer
it off the reply path), plus two sub-agent hooks —

- `prepareSubagentSpawn` receives parent and child session keys, `contextMode` (`isolated` or
  `fork`), transcript ids and an optional TTL, and may return a rollback handle. Native spawns that
  request `lightContext` and resolve to `isolated` **skip it deliberately**.
- `onSubagentEnded` cleans up when a child completes or is swept.

**`systemPromptAddition` is the injection path that needs no file:** an engine can *"inject dynamic
recall guidance, retrieval instructions, or context-aware hints without requiring static workspace
files."*

For a hosted runtime that owns its own history, OpenClaw *"applies the same lifecycle by projecting
assembled context into Codex developer instructions and the current turn prompt"* while the native
side keeps its thread and its compactor — see
[`04`](./04-agent-runtimes-and-hosted-harnesses.md).

The legacy engine's `ingest` is a no-op; the session manager persists messages directly.
