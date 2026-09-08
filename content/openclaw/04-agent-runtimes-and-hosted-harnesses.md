---
status: DRAFT
title: "Agent runtimes and hosted harnesses"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Agent runtimes and hosted harnesses

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

*"An **agent runtime** owns one prepared model loop: it receives the prompt, drives model output,
handles native tool calls, and returns the finished turn to OpenClaw."* This document is the
mechanism by which OpenClaw hands a turn to a loop it did not write. It describes what OpenClaw
does — what it keeps, what it mirrors, what it bridges, and where it stops — and nothing about the
harnesses on the other side beyond the ids and contracts OpenClaw names.

---

## 1. Four layers that look like one

| Layer | Examples | Meaning |
|---|---|---|
| Provider | `anthropic`, `github-copilot`, `openai` | *"How OpenClaw authenticates, discovers models, and names model refs."* |
| Model | `claude-opus-4-6`, `gpt-5.6-sol` | *"The model selected for the agent turn."* |
| Agent runtime | `claude-cli`, `codex`, `copilot`, `openclaw` | *"The low-level loop or backend that executes the prepared turn."* |
| Channel | Discord, Slack, Telegram, WhatsApp | *"Where messages enter and leave OpenClaw."* |

*"A **harness** is the implementation that provides an agent runtime (code term)."*

**Two runtime families.** *"**Embedded harnesses** run inside OpenClaw's prepared agent loop: the
built-in `openclaw` runtime, plus registered plugin harnesses such as `codex` and `copilot."*
*"**CLI backends** run a local CLI process while keeping the model ref canonical"* — `claude-cli` is
a CLI backend and *"is not an embedded harness id and must not be passed to AgentHarness
selection."*

---

## 2. Where the selection lives

`agentRuntime.id` is set **on a provider or model entry**, never on the agent:

```json5
{ agents: { defaults: {
  model: "anthropic/claude-opus-5",
  models: { "anthropic/claude-opus-5": { agentRuntime: { id: "claude-cli" } } },
} } }
```

*"Public config uses `agentRuntime.id` on provider or model entries; whole-agent runtime keys are
legacy and ignored."* The environment variable `OPENCLAW_AGENT_RUNTIME` is ignored too.
`openclaw doctor --fix` *"removes old whole-agent runtime pins and rewrites legacy runtime model refs
to canonical provider/model refs."*

### Resolution order

1. **Model-scoped policy wins** — `agents.defaults.models["provider/model"].agentRuntime` or the
   per-entry equivalent. A provider wildcard (`agents.defaults.models["vllm/*"].agentRuntime`)
   applies **after** exact model policy, so discovered models share a runtime without overriding
   exceptions.
2. **Provider-scoped policy** — `models.providers.<provider>.agentRuntime`.
3. **`auto`** — *"registered plugin runtimes can claim supported provider/model pairs."*
4. **Fallback** — *"If nothing claims the turn in `auto` mode, OpenClaw falls back to `openclaw` as
   the compatibility runtime. Use an explicit runtime id when the run must be strict."*

**Explicit plugin runtimes fail closed** when the harness is missing or cannot support the route or
authentication. One selection-time exception exists: *"a harness may declare that OpenClaw can
reproduce the exact request"* — used to preserve authored headers, request parameters, timeouts and
compatibility switches rather than dropping them. *"Once a harness starts executing, its failures are
not replayed through another runtime."*

Historical `agentHarnessId` records which runtime produced a transcript; *"it does not pin the next
turn."* An explicit trusted `pluginOwnerId` stays the session's control owner even after another
harness reports usage. ACP sessions retain their ACP backend.

---

## 3. Runtime ownership — the surface-by-surface split

The contract that decides what OpenClaw can still do once it has handed over the loop:

| Surface | OpenClaw embedded | A hosted app-server runtime |
|---|---|---|
| Model loop owner | OpenClaw's embedded runner | The native runtime |
| Canonical thread state | OpenClaw transcript | Native thread, **plus an OpenClaw transcript mirror** |
| OpenClaw dynamic tools | Native OpenClaw tool loop | *"Bridged through the … adapter"* |
| Native shell and file tools | OpenClaw path | Native tools, *"bridged through native hooks where supported"* |
| Context engine | Native OpenClaw assembly | *"OpenClaw projects assembled context into the … turn"* |
| Compaction | OpenClaw or the selected context engine | Native compaction, *"with OpenClaw notifications and mirror maintenance"* |
| Channel delivery | OpenClaw | OpenClaw |

**The design rule, verbatim:** *"if OpenClaw owns the surface, it can provide normal plugin hook
behavior. If the native runtime owns the surface, OpenClaw needs runtime events or native hooks. If
the native runtime owns canonical thread state, OpenClaw mirrors and projects context rather than
rewriting unsupported internals."*

Channel delivery never moves. That is the constant across every row: whatever runs the loop, OpenClaw
keeps the conversation.

---

## 4. The compatibility contract a runtime's docs must answer

*"When a runtime is not OpenClaw, its docs should state which OpenClaw surfaces it supports."* Eight
questions, and they double as the checklist for reading any hosted runtime's support table:

| Question | Why it matters |
|---|---|
| Who owns the model loop? | Where retries, tool continuation and final-answer decisions happen |
| Who owns canonical thread history? | Whether OpenClaw can edit history or only mirror it |
| Do OpenClaw dynamic tools work? | Messaging, sessions, cron and OpenClaw-owned tools rely on it |
| Do dynamic tool hooks work? | Plugins expect `before_tool_call`, `after_tool_call` and middleware |
| Do native tool hooks work? | Shell, patch and runtime-owned tools need them for policy and observation |
| Does the context-engine lifecycle run? | Memory and context plugins depend on assemble/ingest/after-turn/compaction |
| What compaction data is exposed? | Notifications only, or kept/dropped metadata |
| What is intentionally unsupported? | *"Users should not assume OpenClaw equivalence where the native runtime owns more state"* |

---

## 5. The native hook relay

For a bound native session, OpenClaw *"injects a per-turn native hook relay so plugin hooks can block
`before_tool_call`, observe `after_tool_call`, and route … `PermissionRequest` events through
OpenClaw approvals."* A native `Stop` hook is relayed to OpenClaw's `before_agent_finalize`, *"where
plugins can request one more model pass before"* the native side finalises its answer.

**The relay is bounded by design:** *"it does not mutate … native tool arguments or rewrite …
thread records."*

`before_agent_run` is **not** part of this bridge. *"The catalog is the registration API, not a
promise that every runtime emits every hook… `before_agent_run` is implemented by the embedded and
CLI runners; do not rely on it as a Codex or Copilot input gate."* See
[`11`](./11-hooks-internal-and-plugin.md).

---

## 6. Disambiguating one vendor's several surfaces

The docs carry a dedicated table because five different things share the Codex name:

| Surface | OpenClaw name / config | What it does |
|---|---|---|
| Native app-server runtime | `openai/*` model refs | Runs OpenAI embedded agent turns through the app-server |
| OAuth auth profiles | `openai` OAuth profiles | Stores the subscription auth the app-server harness consumes |
| ACP adapter | `runtime: "acp"`, `agentId: "codex"` | Runs through the external ACP control plane — [`05`](./05-acp-and-external-harness-sessions.md) |
| Native chat-control command set | `/codex …` | Binds, resumes, steers, stops and inspects native threads from chat |
| Platform API route | `openai/*` plus API-key auth | Direct APIs — images, embeddings, speech, realtime |

*"These surfaces are intentionally independent."* Automatic selection requires *"an exact official
HTTPS Platform Responses or ChatGPT Responses endpoint without authored request overrides. The
`openai/*` prefix alone does not select Codex."* Custom endpoints, Completions adapters and authored
overrides stay on the `openclaw` runtime *"rather than losing their transport settings."*

The `copilot` runtime, from the external `@openclaw/copilot` plugin, *"claims the canonical
subscription `github-copilot` provider and is **never** selected by `auto`."* Its manifest declares
the harness provider, runtime, CLI session key and auth profile prefix *"without requiring
`openclaw doctor` to load plugin code."* Its page (`plugins/copilot`) exists in the repository but is
absent from the navigation tree at this read.

---

## 7. Native auth versus host auth

Two distinct shapes, and confusing them is what the docs spend most of this section preventing:

- **A locked concrete model chat** *"still uses normal model discovery, credential selection, and its
  configured request transport. The lock prevents model changes; it does not hand model or
  authentication ownership to a native runtime."*
- **A bound native session** may retain its native model and, separately, its native connection's
  authentication. *"OpenClaw verifies that ownership against the exact pinned harness and its private
  binding, not a previous usage report."*

Native-auth connections keep their own connection policy, receive no forwarded host profile, and
*"reject explicit per-run provider stream parameters rather than silently dropping them."* When a
native model still uses host authentication, *"its actual provider/model pair controls credential and
request preparation, not the outer default"* — and if resume changes that pair after credentials were
prepared, *"the turn stops before inference and preserves the newly observed native state; it does not
retry with stale credentials or replace the thread."*

---

## 8. CLI backends — the conservative third option

*"OpenClaw can run a local AI CLI as a text-only fallback when API providers are down, rate-limited,
or misbehaving. It is intentionally conservative"*:

- OpenClaw tools are **not** injected directly, though a backend with `bundleMcp: true` receives
  gateway tools *"through a loopback MCP bridge."*
- JSONL streaming where the CLI supports it; sessions supported so follow-ups stay coherent; images
  pass through if the CLI accepts image paths.

*"Use it as a safety net for 'always works' text responses, not a primary path."* The bundled
Anthropic plugin registers a default `claude-cli` backend. Launch mechanics belong in a CLI backend
plugin, not in `openclaw.json`: *"If a deployment needs a nonstandard executable path or arguments,
register that adapter in a CLI backend plugin."*

One policy crossover: the `claude-cli` backend *"checks native Bash commands against the agent's exec
allowlist when `ask: 'on-miss'`. This authorizes command arguments while"* the CLI owns execution;
*"it does not provide OpenClaw sandboxing."* See
[`13`](./13-tool-policy-approvals-and-sandboxing.md).

---

## 9. Status labels

Status output shows `Execution` and `Runtime` labels. *"Read them as diagnostics, not provider
names"*: the model ref is the selected provider/model, the runtime id is the loop executing the turn,
the channel label is where the conversation is. *"The completed result records the runtime that
actually ran."*
