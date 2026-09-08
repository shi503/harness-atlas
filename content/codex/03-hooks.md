---
status: DRAFT
title: "Hooks — the twelve lifecycle events"
tier: reference
project: harness-atlas
source: "https://learn.chatgpt.com/docs/hooks · openai/codex docs/config.md"
version_at_capture: "rust-v0.153.4"
source_verified: "2026-09-08"
---

# Hooks — the twelve lifecycle events

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `learn.chatgpt.com/docs` at **rust-v0.153.4**, **2026-09-08**.

*"Hooks are an extensibility framework for Codex… enabling features such as: Send the chat to a custom
logging/analytics engine."*

---

## 1. The events

Twelve, by exact name:

| Event | Fires |
|---|---|
| `SessionStart` | A session begins — sub-triggers `startup`, `resume`, `clear`, `compact` |
| `SessionEnd` | A session ends |
| `UserPromptSubmit` | The user submits a prompt |
| `PreToolUse` | Before a tool executes |
| `PermissionRequest` | Before an approval prompt is shown |
| `PostToolUse` | After a tool executes |
| `PreCompact` | Before chat compaction |
| `PostCompact` | After chat compaction |
| `SubagentStart` | Before a subagent launches |
| `SubagentStop` | A subagent stops |
| `Stop` | A turn completes |
| `Interrupt` | An active turn is interrupted |

**`PreToolUse` and `PermissionRequest` are not the same gate.** `PreToolUse` fires before execution;
`PermissionRequest` fires before the *prompt* that would ask a human. A hook that auto-approves belongs
on `PermissionRequest`; a hook that blocks belongs on `PreToolUse`.

`SessionStart`'s four sub-triggers matter for anything that seeds context: `compact` and `clear` fire
it again mid-session, so a hook that injects setup state will re-inject on compaction unless it
branches on the trigger.

---

## 2. Where hooks are configured

| Location | Scope |
|---|---|
| `~/.codex/hooks.json` | User |
| `~/.codex/config.toml`, inline `[hooks]` | User |
| `<repo>/.codex/hooks.json` | Project |
| `<repo>/.codex/config.toml`, inline `[hooks]` | Project |
| `<plugin>/hooks/hooks.json` | Plugin-bundled — see [`02`](./02-skills-and-plugins.md) |

Two formats for the same thing at each scope: a dedicated JSON file, or an inline TOML table.

---

## 3. The decision protocol

A hook communicates through **JSON on stdout** or through its **exit code**.

| Intent | JSON | Exit code |
|---|---|---|
| **Block** | `{"decision": "block", "reason": "…"}` | `2` |
| **Allow** | `{"decision": "allow"}` or `permissionDecision: "allow"` | — |
| **Allow, rewritten** | `permissionDecision: "allow"` with `updatedInput` | — |
| **Pass through** | no output | `0` |

`updatedInput` is the capability worth knowing about: a hook can **modify the tool call** rather than
only voting on it — rewrite a command, narrow a path — and the modified form is what executes.

---

## 4. Trust, and the admin override

Hooks are **fail-closed on trust**: *"Non-managed hooks must be reviewed and trusted before they
run"*, and Codex *"skips until trusted"*. An untrusted hook is not an error and not a block; it
simply does not run. Anything depending on a hook for enforcement must confirm the hook is trusted,
or the guarantee is absent without a signal.

**The admin escape hatch**, documented only in the repository's `docs/config.md`:

> *"Admins can set top-level `allow_managed_hooks_only = true` in `requirements.toml` to ignore user,
> project, and session hook configs while still allowing managed hooks from requirements and managed
> config layers. This setting is only supported in `requirements.toml`; putting it in `config.toml`
> does not enable managed-hooks-only mode."*

The failure mode is silent: the key in `config.toml` is accepted and does nothing. See
[`01`](./01-agents-md-and-configuration.md) §3.

Hooks are gated by `features` in `config.toml` — a hook that never fires may be a disabled feature
rather than a bad matcher.
