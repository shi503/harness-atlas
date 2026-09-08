---
status: DRAFT
title: "Administration and the enterprise layer"
tier: reference
project: harness-atlas
source: "https://learn.chatgpt.com/docs/config-file/config-reference · openai/codex docs/config.md"
version_at_capture: "rust-v0.153.4"
source_verified: "2026-09-08"
---

# Administration and the enterprise layer

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `learn.chatgpt.com/docs` and `openai/codex` at **rust-v0.153.4**, **2026-09-08**.

Everything here is a **floor**, not a default. The distinction is the whole point of the layer:
a default is a starting value a user may change; a floor is a value local configuration **cannot
weaken**.

---

## 1. The two administrative files

| File | Role |
|---|---|
| `requirements.toml` | The **floor**. Local configuration cannot relax it |
| `managed_config.toml` | Organization-enforced policy |

Both sit *below* user and project configuration in read order and *above* them in authority — see
[`01-agents-md-and-configuration.md`](./01-agents-md-and-configuration.md) §2, where that inversion is
laid out in full.

**What the floor covers**, per the configuration reference: provider auth, notifications, telemetry,
and specific security keys. Local configuration may set these; it may not weaken what the floor
already asserts about them.

---

## 2. Keys that only exist administratively

| Key | File | Effect |
|---|---|---|
| `allow_managed_hooks_only` | **`requirements.toml` only** | Ignores user, project and session hook configs; managed hooks from the requirements and managed layers still load |
| `allowed_permission_profiles` | administrative | Restricts which `[permissions.<name>]` profiles may be selected |

**`allow_managed_hooks_only` fails silently in the wrong file.** The repository documentation is
explicit: *"This setting is only supported in `requirements.toml`; putting it in `config.toml` does
not enable managed-hooks-only mode."* No warning is documented. An administrator who places it in
`config.toml` gets a configuration that parses, applies nothing, and reports nothing.

`allowed_permission_profiles` is the counterpart to the named profiles in
[`06-sandboxing-and-permissions.md`](./06-sandboxing-and-permissions.md): profiles are authored
locally, and the set that may actually be *selected* is administrative.

---

## 3. Feature gating

`features` in `config.toml` flags apps, hooks, multi-agent, the network proxy, and memories. Because
the administrative layers are a floor over the same file, a capability can be withheld
organisation-wide by flag rather than by permission — and the user-visible result of a withheld
feature is identical to the result of a misconfigured one. This is the first thing to check when a
documented surface appears not to exist.

---

## 4. What was not read

The hosted **Administration** section — identity and authentication, workspace access and model
policy, plugin and connector controls, usage and governance, deployment and model providers — is a
substantial tree that was **not opened** on this read. Checked and deliberately deferred: it describes
the ChatGPT Work product's administrative console rather than the runtime's configuration surface,
and this set is cut by what a builder configures. **Recorded as scope, not as absence** — the pages
exist and are reachable from
[the Codex documentation index](https://learn.chatgpt.com/docs).
