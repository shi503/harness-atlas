---
status: DRAFT
title: "Subagents and agent roles"
tier: reference
project: harness-atlas
source: "https://learn.chatgpt.com/docs/agent-configuration/subagents"
version_at_capture: "rust-v0.153.4"
source_verified: "2026-09-08"
---

# Subagents and agent roles

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `learn.chatgpt.com/docs` at **rust-v0.153.4**, **2026-09-08**.

*"you can additionally define custom agents with different model configurations and instructions for
different tasks"* — additionally, that is, to three built-in roles that exist whether or not anything
is authored.

---

## 1. The three built-in roles

| Role | Shape |
|---|---|
| `default` | General-purpose fallback |
| `worker` | Execution-focused, for implementation |
| `explorer` | Read-heavy codebase exploration |

These are not templates to copy; they are the roles a spawn resolves to when nothing custom is named.

---

## 2. Custom agents

Standalone TOML files, one agent per file:

| Location | Scope |
|---|---|
| `~/.codex/agents/*.toml` | Personal |
| `.codex/agents/*.toml` | Project |

**Three required keys:**

| Key | Purpose |
|---|---|
| `name` | The identifier Codex uses when spawning |
| `description` | Human-facing guidance for when to use this agent |
| `developer_instructions` | *"Core instructions that define the agent's behavior"* |

**Optional keys are the whole of `config.toml`.** An agent file may set any supported configuration
key, which makes a subagent definition a *scoped configuration overlay* rather than only a prompt.
The ones that change behaviour most:

- `model`
- `model_reasoning_effort`
- `sandbox_mode` — a subagent can run under a different sandbox than its parent
- `mcp_servers` — a different tool surface
- `skills.config`

That `sandbox_mode` is settable per-agent is the load-bearing detail: delegation can *narrow* what a
subtask may touch, without narrowing the parent session.

---

## 3. Invocation

- **Direct request** — *"spawn one agent per point"*.
- **Configuration** — an applicable `AGENTS.md` or skill instruction.
- **Proactive delegation** — ChatGPT delegates automatically where parallel work improves the
  outcome. Documented as **Ultra only**, so it is a tier-gated behaviour rather than a runtime one.

---

## 4. Model and reasoning-effort routing

Resolution order, first match wins:

1. The explicit value in the spawn request
2. The `[agents]` default configuration
3. The parent agent's value

> *"If an explicit spawn request or an `[agents]` default selects a model without an explicit or
> configured reasoning effort, the subagent uses that model's default reasoning effort."*

Model and effort resolve **independently**. Selecting a model at step 1 or 2 does not carry the
parent's effort with it — effort falls to the new model's own default rather than inheriting.

---

## 5. Concurrency, and what is not stated

| Key | Effect |
|---|---|
| `agents.max_concurrent_threads_per_session` | Caps open spawned-agent threads, **excluding the primary thread**. Codex-determined when unset |
| `agents.max_threads` | Legacy alias for the above |

**Nesting depth is not documented.** The page does not state a limit, and does not address recursive
spawning. Checked: the subagents page, the configuration reference's `agents` section, and the
`agent-graph-store` crate, which records parent/child thread-spawn edges without describing a depth
bound. **Recorded as an absence in the documentation, not as an absence in the runtime.**
