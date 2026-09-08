---
status: DRAFT
title: "AGENTS.md and the configuration chain"
tier: reference
project: harness-atlas
source: "https://learn.chatgpt.com/docs/agent-configuration/agents-md · https://learn.chatgpt.com/docs/config-file/config-reference · openai/codex docs/config.md"
version_at_capture: "rust-v0.153.4"
source_verified: "2026-09-08"
---

# AGENTS.md and the configuration chain

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `learn.chatgpt.com/docs` and `openai/codex` at **rust-v0.153.4**, **2026-09-08**.

Two separate mechanisms that are easy to conflate. **`AGENTS.md` is prose Codex reads before working.**
**`config.toml` is settings Codex resolves through five layers.** They have different discovery rules,
different precedence directions, and different failure modes.

---

## 1. `AGENTS.md` — the instruction chain

*"Codex reads `AGENTS.md` files before doing any work. By layering global guidance with
project-specific overrides, you can start each task with consistent expectations, no matter which
repository you open."*

### Resolution order

**Global scope, checked first.** `~/.codex/AGENTS.override.md` if it exists, otherwise
`~/.codex/AGENTS.md`. **Only the first non-empty file at this level is used.**

**Project scope, checked second.** Codex walks **from the Git root down to the current working
directory**. At each directory level it checks, in order:

1. `AGENTS.override.md`
2. `AGENTS.md`
3. the fallback names configured in `project_doc_fallback_filenames`

**At most one file per directory level.** If no Git root is found, only the current directory is
checked — the walk does not descend below cwd.

### How they combine

Files are **concatenated from root downward**, separated by blank lines. The precedence direction
follows from that and is worth stating plainly, because it is the opposite of most config systems:

> *"Files closer to your current directory override earlier guidance because they appear later in the
> combined prompt."*

**This is prose precedence, not mechanical precedence.** Nothing enforces that a later file wins; it
wins because it is later in the prompt and the model reads it last. A contradiction between two
levels is resolved by the model, not by the loader.

### Limits and keys

| Key | Default | Effect |
|---|---|---|
| `project_doc_max_bytes` | **32 KiB** | Combined size ceiling. Accumulation stops once reached |
| `project_doc_fallback_filenames` | — | Alternative filenames checked after `AGENTS.md` at each level |
| `CODEX_HOME` (env) | `~/.codex` | Relocates the global scope — the mechanism for alternative profiles |

Empty files are skipped rather than counted.

---

## 2. `config.toml` — five layers, and a floor

**Precedence, highest first:**

| # | Layer | Where | Note |
|---|---|---|---|
| 1 | **Session** | runtime flags | Overrides for the current invocation only |
| 2 | **Project** | `.codex/config.toml` | **Trusted projects only** |
| 3 | **User** | `~/.codex/config.toml` | Personal machine configuration |
| 4 | **System** | `requirements.toml` | Administrator baseline |
| 5 | **Managed** | `managed_config.toml` | Organization policy |

**The inversion that matters.** Layers 4 and 5 sit *below* the others in the read order but are
**not** overridable by them. `requirements.toml` establishes a **floor**: local configuration cannot
weaken managed constraints on provider auth, notifications, telemetry, or specific security keys. A
reader who assumes "lower in the list means weaker" will get this backwards.

### The top-level sections

| Section | What it governs |
|---|---|
| `model` | Active model, reasoning effort, verbosity |
| `model_providers` | Custom provider definitions, auth, endpoints |
| `approval_policy` | When execution stops to ask — see [`06`](./06-sandboxing-and-permissions.md) |
| `sandbox_mode` | Filesystem and network access level — see [`06`](./06-sandboxing-and-permissions.md) |
| `permissions` | Named filesystem/network/workspace profiles — see [`06`](./06-sandboxing-and-permissions.md) |
| `default_permissions` | Which named profile applies |
| `mcp_servers` | MCP server definitions and tool policy — see [`05`](./05-mcp-and-the-app-server.md) |
| `agents` | Multi-agent settings, role declarations, spawn defaults — see [`04`](./04-subagents.md) |
| `features` | Feature flags: apps, hooks, multi-agent, network proxy, memories |
| `shell_environment_policy` | Environment variable filtering and inheritance |
| `apps` | App connector enablement and approval modes |
| `browser_use` | Browser history access, per-origin restrictions |
| `computer_use` | Native application access on macOS and Windows |
| `web_search` | `cached`, `indexed`, `live`, or disabled |
| `tui` | Terminal UI theming, keybindings, notifications |

`features` is the one to check first when a surface appears absent — hooks, multi-agent, the network
proxy and memories are all flag-gated, so "not working" and "not enabled" look identical.

---

## 3. One setting documented in only one place

The repository's `docs/config.md` is otherwise a stub pointing at the hosted docs, but it carries a
key the hosted configuration reference does not:

> *"Admins can set top-level `allow_managed_hooks_only = true` in `requirements.toml` to ignore user,
> project, and session hook configs while still allowing managed hooks from requirements and managed
> config layers. This setting is only supported in `requirements.toml`; putting it in `config.toml`
> does not enable managed-hooks-only mode."*

The second sentence is the trap: the same key in the wrong file fails **silently**. See
[`03-hooks.md`](./03-hooks.md).

---

## 4. A note on where these docs live

The repository's `docs/` directory is now **stubs**. `agents_md.md`, `sandbox.md`, `execpolicy.md`,
`skills.md`, `slash_commands.md`, `exec.md` and `authentication.md` each contain a heading and a link
to `developers.openai.com/codex/…`, which **308-redirects** to `learn.chatgpt.com/docs/…`. Two
redirects sit between a reader starting at the repository and the current text. Crate `README.md`
files under `codex-rs/` remain substantive and are the primary source for
[`07`](./07-execpolicy.md) and [`09`](./09-memory-and-session-state.md).
