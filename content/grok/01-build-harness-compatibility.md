---
status: DRAFT
title: "Grok Build — the harness compatibility layer"
tier: reference
project: harness-atlas
product: "Grok Build"
source: "xai-org/grok-build @ 7581004 — crates/codegen/xai-grok-pager/docs/user-guide/"
version_at_capture: "commit 7581004 (SOURCE_REV eb4a894), no tags"
source_verified: "2026-09-08"
---

# Grok Build — the harness compatibility layer

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**Product: Grok Build**, the Apache-2.0 Rust runtime. **Not Grok Bot** — Bot has no
compatibility surface of this kind, and reads no foreign configuration; see
[`09`](./09-bot-bots-and-the-agent-computer.md).

Read against `xai-org/grok-build` at commit `7581004`, **2026-09-08**. No tags exist.

Assembled from ten user-guide pages that each mention a piece of this — UG/05, 07, 08, 09, 10, 12,
14, 18, 22, 26 — plus one page outside the user guide.

**The vendor documents no single reference page for this**; the `[compat]` config table is the closest
thing, and it is one section inside the configuration page. There *is* a one-page orientation,
`crates/codegen/xai-grok-pager/docs/tutorial/01-coming-from-another-tool.md`, titled **"Coming from
Claude, Cursor, or Codex?"** — *"Fear not — your settings, rules, and skills come with you. Grok Build
reads the same project conventions other agents use, and imports the rest."* It is a tour, not a
reference: it names five categories and no field. It is also **not in the user-guide directory**, so a
reader following the guide's own numbering never meets it.

---

## 1. The switchboard: `[compat.<vendor>]`

Three vendors, six cells each, **every cell defaults to `true`** — compatibility is on unless you
turn it off. UG/05 §Harness compatibility:

| Cell | `cursor` reads | `claude` reads |
|---|---|---|
| `skills` | `~/.cursor/skills/` and `<cwd>/.cursor/skills/` | `~/.claude/skills/` and `<cwd>/.claude/skills/` |
| `rules` | `~/.cursor/rules/` and `<dir>/.cursor/rules/` | `~/.claude/rules/` and `<dir>/.claude/rules/` |
| `agents` | `~/.cursor/` for named instruction files | `~/.claude/` and `<dir>/.claude/CLAUDE*.md` |
| `mcps` | `~/.cursor/mcp.json` and `<cwd>/.cursor/mcp.json` | `~/.claude.json` for MCP servers |
| `hooks` | `~/.cursor/hooks.json` | `~/.claude/settings.json` for hooks |
| `sessions` | *"staged; no scanner consumer yet"* | *"staged; no scanner consumer yet"* |

**`[compat.codex]` carries only `sessions`.** Its other five cells appear in the config reference
(`compat.codex.hooks`, `compat.codex.skills`) but the guide states them inert: *"Codex's `skills`,
`rules`, `agents`, `mcps`, and `hooks` cells are reserved and currently inert — they do not enable
`.codex` discovery."*

**`sessions` is gated twice, and the two pages that describe it disagree.** UG/05: *"Session cells
stay staged and inert until a foreign-session scanner consumes them, and each tool needs both its
`sessions` cell and the matching `resume-claude`, `resume-codex`, or `resume-cursor` skill — a missing
skill means zero foreign-session filesystem I/O."* The tutorial page states the same three skills as
working: *"The **`/resume-claude`**, **`/resume-codex`**, and **`/resume-cursor`** skills continue a
recent session from those tools right here."* Both read directly on 2026-09-08. Whether "staged and
inert" describes the cell or the feature is not resolved by either page; recorded, not resolved.

**`rules` and `agents` are independent for Claude and Cursor.** *"Turning off named instruction files
doesn't disable the home or project rules directory, and turning off rules doesn't disable named
files."* Claude's `agents` cell gates home-level `~/.claude/` named files and project
`<dir>/.claude/CLAUDE*.md`; **generic top-level `Claude.md`, `CLAUDE.md` and `CLAUDE.local.md` stay
recognized regardless of the cell** — they are on the project-rules filename list in
[`02`](./02-build-configuration-and-project-rules.md) §3, not behind the switchboard.

Each cell also has an environment variable (`GROK_CLAUDE_SKILLS_ENABLED`,
`GROK_CURSOR_MCPS_ENABLED`, …). Resolution is **env var > `config.toml` > default (on)**.

---

## 2. What is read, from where, and how it is ranked

Five discovery surfaces read foreign files. Each merges the foreign source into a native ladder
rather than keeping it separate.

### Skills and commands — UG/08

| Location | Scope | Priority |
|---|---|---|
| `./.grok/skills/`, `./.grok/commands/` | Local (CWD) | Highest |
| `./.claude/skills/`, `./.claude/commands/` | Local / Repo | High |
| `./.cursor/skills/` | Local / Repo | High |
| `<repo_root>/.grok/skills/`, `…/commands/` | Repo | Medium |
| `~/.grok/skills/`, `~/.grok/commands/` | User | Lowest |
| `~/.claude/skills/`, `~/.claude/commands/` | User | Lowest |
| `~/.cursor/skills/` | User | Lowest |

Deduplicated by name, higher priority wins. `.agents/skills/` is scanned at every tier alongside
`.grok/`. Flat `*.md` under `commands/` become slash commands, *"matching Claude Code's legacy
custom-command layout."*

**Two behaviours worth knowing.** Discovery **does not honour `.gitignore`**: *"Paths under known
skill roots (`.grok/`, `.agents/`, `.claude/`, `.cursor/`) always load when present on disk — teams
often ignore `.claude/**` as local-only config while still expecting `/frontend`-style project
commands to work."* And Grok Build **filters foreign defaults out**: it *"always filters out known
vendor-shipped default skills (such as Cursor's `shell`, `canvas`, and `statusline`), regardless of
these settings."*

### Project rules — UG/12

Six filenames are checked in each directory, in this order: `Agents.md`, `Claude.md`, `CLAUDE.md`,
`CLAUDE.local.md`, `AGENT.md`, `AGENTS.md`. *"Grok loads every matching file in a directory, so a
folder that contains both `AGENTS.md` and `CLAUDE.md` contributes both."* Case-insensitive
filesystems dedupe to one. Full discovery order in
[`02`](./02-build-configuration-and-project-rules.md) §3.

### MCP servers — UG/07

| Source | Format | Location | Gate |
|---|---|---|---|
| `config.toml` | native | `~/.grok/config.toml`, `.grok/config.toml` | always on |
| `.claude.json` | Claude Code | `~/.claude.json` | `[compat.claude] mcps` |
| `.cursor/mcp.json` | Cursor | `~/.cursor/mcp.json`, `<project>/.cursor/mcp.json` | `[compat.cursor] mcps` |
| `.mcp.json` | MCP standard | project root (cwd → git root) | loaded unless the Claude import marker is set |

*"All sources are merged in priority order: config.toml > Claude > Cursor > `.mcp.json`."*

Two env-var aliases are accepted for Claude Code parity: `MCP_TIMEOUT` (milliseconds,
*"compatible with Claude Code"*) and `MAX_MCP_OUTPUT_BYTES` — with the caveat that this is a
*"Claude-style name, but we bound by **bytes** not tokens"*; the native `GROK_MAX_MCP_OUTPUT_BYTES`
wins when both are set.

### Permission rules — UG/22 §3

Grok Build reads `~/.claude/settings.json`, `~/.claude/settings.local.json`, and the project-level
`<project>/.claude/settings.json` and `settings.local.json` walking up to the repo root.
`permissions.allow` / `deny` / `ask` are *"translated into native rules"*. Supported `defaultMode`
values: `default`, `auto`, `acceptEdits`, `bypassPermissions`, `dontAsk`, `plan`. A top-level
`defaultMode` is accepted when the nested key is absent.

Three translation notes, stated:

- MCP rules may use either `mcp__server__tool` or native `MCPTool(server__tool)`.
- *"Rules naming an unrecognized tool, and parameter rules such as `Agent(model:opus)`, are skipped
  with a warning rather than failing the load."*
- *"`permissions.additionalDirectories` is parsed but not supported."*

**This surface fills a native gap by design.** *"Grok has no native `config.local.toml`. For personal,
uncommitted rules in a project, use `.claude/settings.local.json`; Grok reads it directly."* A foreign
file is the documented home for a native use case.

### Hooks — UG/10

`~/.claude/settings.json` (+ `settings.local.json`) and `~/.cursor/hooks.json` at global scope, and
their project equivalents under folder trust. Full location table in [`03`](./03-build-hooks.md) §2.

---

## 3. How foreign vocabulary is mapped

Three separate mapping tables, all in UG/10.

**Cursor event names → Grok events.** *"Grok accepts Cursor's camelCase hook event names, so
`~/.cursor/hooks.json` loads unchanged."*

| Cursor event | Maps to |
|---|---|
| `sessionStart`, `sessionEnd` | `SessionStart`, `SessionEnd` |
| `preToolUse`, `postToolUse`, `postToolUseFailure` | `PreToolUse`, `PostToolUse`, `PostToolUseFailure` |
| `beforeShellExecution`, `beforeMCPExecution`, `beforeReadFile` | `PreToolUse` |
| `afterShellExecution`, `afterMCPExecution`, `afterFileEdit` | `PostToolUse` |
| `afterAgentResponse`, `afterAgentThought` | `PostToolUse` |
| `beforeSubmitPrompt` | `UserPromptSubmit` |
| `subagentStart`, `subagentStop` | `SubagentStart`, `SubagentStop` |
| `preCompact`, `stop` | `PreCompact`, `Stop` |

Cursor's per-operation hooks collapse onto the generic pair; *"the hook script receives the tool name
in the JSON input and can filter accordingly."*

**Claude tool names → Grok tool names**, applied inside a `matcher`:

`Bash` → `run_terminal_command` · `Read` → `read_file` · `Edit`/`Write`/`MultiEdit` →
`search_replace` · `Grep` → `grep` · `Glob`/`ListDir` → `list_dir` · `WebSearch` → `web_search` ·
`Task` → `spawn_subagent`. *"A matcher keeps its original name too, so `Bash` matches both `Bash` and
`run_terminal_command`."*

**Unknown event names are skipped, not rejected.** *"Grok skips unrecognized event names so a shared
Claude or Cursor settings file still loads."*

**One env var is a straight alias.** `CLAUDE_PROJECT_DIR` — *"a Claude Code-compatible alias for
`GROK_WORKSPACE_ROOT`, set for every hook."* The plugin adapter sets `CLAUDE_PLUGIN_ROOT` and
`CLAUDE_PLUGIN_DATA` alongside their `GROK_` originals.

**Plugin manifests take either spelling.** *"Grok reads the index from `.grok-plugin/marketplace.json`.
It also accepts `.grok-plugin/plugin.json` and the `.claude-plugin/` equivalents."* Plugin discovery
accepts `.claude/plugins/` equivalents. A marketplace can be declared in `~/.grok/settings.json` **or**
`~/.claude/settings.json`. In TOML policy, *"CamelCase Claude keys and snake_case grok keys are both
accepted."*

---

## 4. Where compatibility stops: the fourteen documented divergences

UG/10's **"Porting Claude Code stop hooks"** list is the single densest statement of the layer's
edges. The output vocabulary (`decision`, `reason`, `continue`, `stopReason`, `additionalContext`)
*"works unchanged"*; these do not match:

| Divergence | What actually differs |
|---|---|
| **camelCase input** | The stdin envelope is camelCase throughout where Claude is snake_case. `.stop_hook_active` → `.stopHookActive`; `.background_tasks[].agent_type` → `.backgroundTasks[].agentType` |
| **Two event-name keys** | `hook_event_name` (snake key) carries **Claude's PascalCase value** (`"Stop"`); `hookEventName` (camel key) carries **grok's snake_case value** (`"stop"`) |
| **`toolResult`** | `PostToolUse` output is `toolResult`; a `tool_response` snake alias copies it, so a hook reading Claude's `.tool_response` works unchanged |
| **`updatedToolOutput` shape** | Validated against grok's own serialization of a built-in tool's output, so a replacement *"written against another runtime's field names parses as the wrong shape and is ignored."* MCP tools have no shape to enforce and pass through |
| **Session-end fire** | An extra observe-only `Stop` fires at session end; filter on `reason == "end_turn"` |
| **Interval schedules** | `sessionCrons[].schedule` is a human-readable interval, *"never a cron expression"* |
| **Task types** | `backgroundTasks[].type` is only `shell`, `monitor`, or `subagent`; *"Claude's other labels (`workflow`, `teammate`, …) are not emitted"* |
| **`StopFailure` classes** | Six only: `rate_limit`, `authentication_failed`, `invalid_request`, `server_error`, `max_output_tokens`, `unknown`. *"A matcher on an error class grok does not emit never fires"* |
| **Default timeout** | 5 seconds for observe hooks, *"shorter than most"* |
| **`UserPromptSubmit` gap** | Blocking works (exit 2, `decision: "block"`); an **allowing** hook's stdout / `additionalContext` *"is discarded rather than added as context"* |
| **`StopCancelled` is grok-specific** | *"a config that uses it is not portable to a runtime with no interrupt hook"* |
| **`idle_prompt` semantics** | Fires after an interrupted or errored turn too, *"because it reports a state rather than an outcome"*. Match on `notificationType`, not `message` |
| **Subagent identity** | `subagentType` in the payload, not `agent_type` in the common fields |
| **`permission_mode` values** | `default`, `auto`, `plan`, `bypassPermissions`. *"Claude's `acceptEdits`/`dontAsk` have no grok equivalent (grok's `auto` is the nearest), so a check like `permission_mode === "acceptEdits"` never matches"* |

Note the last row against §2's permission surface: `acceptEdits` and `dontAsk` **are** accepted as
`defaultMode` values in `.claude/settings.json`, and **are not** emitted as `permissionMode` values to
a hook. The same two names are readable in one direction and absent in the other.

---

## 5. Native versus advisory — the policy asymmetry

UG/09 §Distribute across an organization draws the sharpest line in the layer. Two policy classes,
and they bind different subjects:

- **`managed_config.toml` / `requirements.toml` (and macOS MDM) are *native* policy.** They *"enforce
  on every server and marketplace, including ones defined in the user's own config or by plugins."*
- **Claude `managed-settings.json` is *advisory*.** *"Its MCP and marketplace restrictions bind
  **foreign** subjects only — project files (`.grok/config.toml`, `.mcp.json`), imported Claude
  configs, CLI overrides, and client-injected servers. They never bind grok-native subjects
  (user/system `config.toml`, plugin-provided definitions, admin pins)."*

**One exception runs the other way.** *"**Adding** a marketplace or installing a new source is always
treated as foreign, so an advisory strict list still refuses unlisted `marketplace add` /
`plugin install` sources."*

Layers combine **strictest-wins**: *"any deny wins, every restricted source must allow, and boolean
pins only tighten (`false` sticks; a later `true` cannot unpin)."* `grok inspect` prints
`allowManagedMcpServersOnly` as `off` / `advisory` / `enforced`, which is where the distinction
becomes visible at runtime.

**One lock is native-only.** *"Grok can still load Claude-style permission **rules** from managed
settings; always-approve is locked with `requirements.toml`"* — `[ui] disable_bypass_permissions_mode`
has no foreign spelling.

**And the sandbox declines to cover foreign files.** Under `workspace`, `read-only` and `strict`, the
kernel write-denies `~/.grok/hooks/`, `~/.grok/hooks-paths` and its absolute targets — but
*"Claude/Cursor global settings are **not** covered by this write-deny; discovery of those vendors
remains separately gated by compatibility settings."* See [`04`](./04-build-permissions-and-sandbox.md)
§4.

---

## 6. Import, inspection, and the unresolved state

**Import.** `/import-claude` *"opens the Claude import modal to bring over `~/.claude` settings:
permissions, environment variables, MCP servers, hooks, and paths."* Bound to **Ctrl+I** ("Import
Claude settings") when available; **Ctrl+Shift+I** dismisses the import row. Dismissing or completing
the import **sets a marker** that stops `.mcp.json` being loaded as a separate source (UG/07 §Compatibility).

**Inspection.** `grok inspect` (and `--json`) reports every discovered rule, skill, MCP server, plugin
and hook **with its vendor origin** — `[cursor]`, `[claude]` — plus the merged MCP allow/deny lists
and pins under *"Enforced by policy."*

**A third state exists between on and off.** *"`grok inspect` reports cells that still need
session-start resolution as `?` until a value is available… Affected discovery entries report
`compatibilityStatus: "unresolved"` in JSON and `[compat unresolved]` in human output."* A compat cell
is therefore **on, off, or not yet known** — and a reader auditing what loaded must distinguish the
third from the second.

---

## 7. What is not here

- **No adapter in the other direction.** Nothing in UG/01–27 documents Grok Build exporting its
  configuration to another runtime, or presenting itself as one. Checked UG/05, UG/07, UG/09, UG/15,
  UG/26.
- **No compatibility statement about a foreign runtime's *version*.** Which release of a foreign
  format is targeted is not stated anywhere. Checked UG/05, UG/07, UG/08, UG/10, UG/22, UG/26.
- **No Codex discovery**, by the vendor's own statement (§1). Only `compat.codex.sessions` exists as
  a live cell, and it is staged.
