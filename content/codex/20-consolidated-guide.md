---
status: DRAFT
title: "Codex CLI — the consolidated guide"
tier: reference
project: harness-atlas
source: "openai/codex @ rust-v0.153.4 · https://learn.chatgpt.com/docs"
version_at_capture: "rust-v0.153.4"
source_verified: "2026-09-08"
---

# Codex CLI — the consolidated guide

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openai/codex` and `learn.chatgpt.com/docs` at **rust-v0.153.4**, **2026-09-08**.

One pass over the whole extension surface, for a reader with ten minutes. Every claim here is
sourced in a numbered document; this page carries the shape, not the field names.

---

## 1. The mental model

**One session object, addressed identically from everywhere.** A unit of work is a `Turn` inside a
`Thread`. The terminal, an IDE extension, an SDK caller and a cloud task all name those same objects
through the app-server's JSON-RPC surface. **Codex is not a CLI with an API bolted on; it is a session
engine with a CLI as one client.** That single fact explains most of the design decisions below.

**Configuration resolves down; instructions accumulate up.** These are opposite motions and are the
most common source of confusion:

- `config.toml` resolves through **five layers**, and the administrative layers are a **floor** that
  local settings cannot weaken.
- `AGENTS.md` **concatenates** from the Git root downward, and later files win **only because the
  model reads them last**. Nothing enforces it.

The first is mechanical. The second is prose. Treating the second as a guarantee is the mistake.

---

## 2. The five rules that matter most

1. **`decision` in an execpolicy rule defaults to `allow`.** A rule written to *describe* a command
   permits it. — [`07`](./07-execpolicy.md)
2. **The sandbox and the approval policy are different controls.** *"The sandbox defines technical
   boundaries. The approval policy decides when the agent must stop and ask before crossing them."*
   Loosening one does not loosen the other. — [`06`](./06-sandboxing-and-permissions.md)
3. **Untrusted hooks silently do not run.** Not an error, not a block — skipped. Enforcement that
   depends on a hook has no signal when the hook was never trusted. — [`03`](./03-hooks.md)
4. **`allow_managed_hooks_only` in the wrong file does nothing, quietly.** It is valid only in
   `requirements.toml`. — [`10`](./10-administration-and-enterprise.md)
5. **Check `features` before concluding a surface is absent.** Hooks, multi-agent, the network proxy
   and memories are flag-gated, and "disabled" looks exactly like "missing". —
   [`01`](./01-agents-md-and-configuration.md)

---

## 3. Choosing a surface

| You want to… | Use | Document |
|---|---|---|
| State standing expectations in prose | `AGENTS.md` | [`01`](./01-agents-md-and-configuration.md) |
| Set behaviour mechanically | `config.toml` | [`01`](./01-agents-md-and-configuration.md) |
| Package a repeatable workflow | Skill | [`02`](./02-skills-and-plugins.md) |
| Distribute skills and an MCP server together | Plugin | [`02`](./02-skills-and-plugins.md) |
| Act on a lifecycle moment, or rewrite a tool call | Hook | [`03`](./03-hooks.md) |
| Delegate with a different model, sandbox or tool set | Subagent | [`04`](./04-subagents.md) |
| Give the model a new tool | MCP server | [`05`](./05-mcp-and-the-app-server.md) |
| Drive Codex from your own program | app-server / SDK | [`05`](./05-mcp-and-the-app-server.md) |
| Constrain what may run at all | Execpolicy + sandbox | [`06`](./06-sandboxing-and-permissions.md) · [`07`](./07-execpolicy.md) |
| Run it in a pipeline | `codex exec` | [`08`](./08-non-interactive-and-ci.md) |
| Enforce across an organisation | `requirements.toml` | [`10`](./10-administration-and-enterprise.md) |

---

## 4. Enforcement, ordered

Four layers, outermost last, and each one is a different kind of thing:

1. **Execpolicy** evaluates the command string before it runs — `allow`, `prompt`, `forbidden`.
2. **The sandbox** constrains what a permitted command can reach — Seatbelt, `bubblewrap`, the
   Windows sandbox. The OS enforces it, not the harness.
3. **The approval policy** decides when a human or an automated reviewer is asked, independently of
   both of the above.
4. **The administrative floor** decides which of the above a local configuration may weaken.

**Only layer 2 is enforced outside the process.** Layers 1, 3 and 4 are the harness deciding about
itself. `codex exec --ignore-rules` skips layer 1 outright, and the documentation states no
threat-model boundary for any of them — recorded as an absence in
[`06`](./06-sandboxing-and-permissions.md) §5, not as a claim that none exists.

---

## 5. Delegation

A subagent is a **scoped configuration overlay**, not just a prompt: it may set `model`,
`model_reasoning_effort`, `sandbox_mode`, `mcp_servers` and `skills.config`. Delegation can therefore
*narrow* what a subtask may touch without narrowing the parent.

Two behaviours to know: model and reasoning effort resolve **independently**, so selecting a model
drops to that model's default effort rather than inheriting the parent's; and the memory pipeline
**excludes sub-agent sessions**, so delegation does not multiply memory work.
— [`04`](./04-subagents.md), [`09`](./09-memory-and-session-state.md)

---

## 6. What the system does on its own

The memory pipeline is the part of Codex that acts without being asked. On the start of a
non-ephemeral root session, in the background: Phase 1 sends recent rollouts to a model and stores
structured extracts; Phase 2 takes a global lock, syncs artifacts under a **git-baselined**
`~/.codex/memories/`, and — if anything changed — spawns an internal consolidation agent that runs
*"with no approvals, no network, and local write access only"*, with delegation disabled to prevent
recursion.

**The review model is after the fact, not before it.** There is no approval gate; the git baseline and
`phase2_workspace_diff.md` are what make the run auditable once it has happened. Leases and a single
global lock, rather than permissions, are what keep it safe to run concurrently.
— [`09`](./09-memory-and-session-state.md)

---

## 7. Where the documentation stops

Absences recorded across this set, each naming what was checked:

- **Subagent nesting depth** — not stated on the subagents page, the `agents` configuration section,
  or the `agent-graph-store` crate. [`04`](./04-subagents.md)
- **A trust-boundary statement** — not found on the sandboxing page or the network-proxy crate; the
  security page returned content for a different product on the read date and was discarded rather
  than cited. [`06`](./06-sandboxing-and-permissions.md)
- **`codex exec` exit codes** — not documented on the non-interactive page or the repository stub.
  [`08`](./08-non-interactive-and-ci.md)
- **What the IDE extension shares with the CLI** — stated as "configuration patterns", without naming
  files or scopes. [`11`](./11-beyond-the-cli.md)

One structural note: the repository's `docs/` directory is now **stubs**, each linking to
`developers.openai.com/codex/…`, which **308-redirects** to `learn.chatgpt.com/docs/…`. Two redirects
separate a reader starting at the repository from the current text. Crate `README.md` files remain
substantive and are the only source for execpolicy's grammar and the memory pipeline's phases.

---

## 8. The claims, walked against what this set documented

The claim ledger in [`00-README.md`](./00-README.md) records what OpenAI says Codex is for. This walks
each claim to the mechanism behind it.

**This maps; it does not grade.** A row names the document carrying the mechanism, or records that
nothing was found and says what was checked. There is no verdict column and none is implied.

| Claim, abbreviated | Mechanism, and where it is documented |
|---|---|
| *"a coding agent from OpenAI that runs locally on your computer"* | The local runtime under an OS sandbox — [`06`](./06-sandboxing-and-permissions.md); session state on local disk — [`09`](./09-memory-and-session-state.md) |
| *"Run coding tasks in parallel cloud environments"* | Per-task dedicated environments with configured setup and administratively controlled egress — [`11`](./11-beyond-the-cli.md) §1 |
| *"start work from the web, GitHub, GitLab, Linear, or Slack"* | **Named, not mechanised in this set.** The integrations are listed on the cloud page; none was opened. Checked: the cloud page and the documentation index. Recorded as scope — this set is cut by what a builder configures |
| *"Give each task dedicated environments"* | The cloud environment model — [`11`](./11-beyond-the-cli.md) §1. Note the mechanism differs from the local one: container plus egress policy, not `sandbox_mode` |
| *"extend ChatGPT and Codex with task-specific capabilities"* | Skills, portable across both products, with `agents/openai.yaml` as the cross-product metadata file — [`02`](./02-skills-and-plugins.md) |
| *"an installable package that can include skills, an MCP server, or both"* | `.codex-plugin/plugin.json`, plus plugin-bundled hooks at `hooks/hooks.json` — [`02`](./02-skills-and-plugins.md), [`03`](./03-hooks.md) |
| *"an extensibility framework for Codex"* (hooks) | Twelve lifecycle events, a JSON/exit-code decision protocol, and `updatedInput` rewriting — [`03`](./03-hooks.md) |
| *"custom agents with different model configurations and instructions"* | TOML agent files accepting any `config.toml` key, with independent model/effort resolution — [`04`](./04-subagents.md) |
| *"consistent expectations, no matter which repository you open"* | The `AGENTS.md` global-then-project chain — [`01`](./01-agents-md-and-configuration.md) §1. The mechanism delivers *assembly*; consistency of *effect* rests on the model reading the later file last, which the docs state and nothing enforces |
| *"local configuration cannot relax"* the managed floor | `requirements.toml` and `managed_config.toml`, plus `allowed_permission_profiles` and `allow_managed_hooks_only` — [`10`](./10-administration-and-enterprise.md) |
| *"Work with Codex beside your code"* | The IDE extension across VS Code and compatibles, JetBrains and Xcode — [`11`](./11-beyond-the-cli.md) §2 |
