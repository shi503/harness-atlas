---
status: DRAFT
title: "The Gateway and openclaw.json"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# The Gateway and `openclaw.json`

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

One long-lived process owns the channels, the credentials and the control plane. Everything else in
this set is a subsystem inside it or a client of it. This document is its configuration surface.

---

## 1. One file, JSON5, strict schema

`~/.openclaw/openclaw.json`, JSON5 (comments and trailing commas). *"If the file is missing, OpenClaw
uses safe defaults."*

**Strict validation is a startup gate, not a warning.** *"Unknown keys, malformed types, or invalid
values that remain cause the Gateway to **refuse to start**. The only root-level exception is
`$schema`."* When validation fails, *"Only diagnostic commands work (`openclaw doctor`,
`openclaw logs`, `openclaw health`, `openclaw status`)."*

Three protections around writes:

| Mechanism | Behaviour |
|---|---|
| Startup migration | Deterministic, prompt-free transforms — the same ones `openclaw doctor --fix` runs. Writes only when *"the entire migrated config validates, including plugins."* Configs using `$include`, Nix-managed configs, and configs written by a newer version are **not** migrated |
| Clobber guard | Blocks writes that drop the effective `gateway.mode` or shrink the file by more than half; the rejected payload is saved as `<path>.rejected.<timestamp>` when possible |
| Last-known-good | Kept after each successful startup, but **restored only by `openclaw doctor --fix`** — never automatically. A candidate containing a redacted placeholder (`***`, `[redacted]`) is never promoted |

The active config path must be a **regular file**: OpenClaw-owned writes rename atomically onto it, so
a symlinked `openclaw.json` gets its target replaced.

---

## 2. The two-bucket rule

*"Configuration follows a two-bucket rule: root siblings hold infrastructure and cross-agent
defaults, while `agents.defaults` holds agent-loop behavior. Entries under `agents.entries` may
override either bucket where the schema supports a per-agent override."*

Knowing which bucket a key lives in is most of knowing where to look, because the field reference is
now split across twelve pages.

---

## 3. Where the field reference actually lives

`/gateway/configuration-reference` is now **almost entirely a redirect map**: most of its section
headings are `Moved to …` lines carrying anchor stubs so old fragment links still resolve. The
substantive text sits in twelve sibling pages.

| Page | Owns |
|---|---|
| `/gateway/config-runtime` | `worktreeRoot`, `models`, `discovery`, `update`, `acp`, wizard |
| `/gateway/config-extensions` | `mcp.servers`, `skills`, `plugins.entries`, canvas widget presenter |
| `/gateway/config-browser-ui-desktop` | `browser`, `ui`, desktop and paired-node config |
| `/gateway/config-gateway` | bind, auth, roles, Control UI, terminal, remote, nodes, TLS, reload |
| `/gateway/config-cloud-workers` | `cloudWorkers`, Crabbox and static-SSH profiles |
| `/gateway/config-hooks` | hook HTTP contract, agent payload, session policy, retries, Gmail |
| `/gateway/config-secrets-env` | `env`, secret providers, auth storage, `$include` |
| `/gateway/config-observability` | `logging.audit`, `logging`, `diagnostics`, `telemetry` |
| `/gateway/config-automation` | `cron`, media model template variables |
| `/gateway/config-agents` | `agents.defaults`, `multiAgent`, `session`, `messages`, `talk` |
| `/gateway/config-channels` | `channels.*` per-channel access control, pairing, keys |
| `/gateway/config-tools` | tool enablement, custom tool providers |

`/gateway/config-agents` splits again into eight children (`workspace-and-bootstrap`, `models`,
`runtime-and-cli-backends`, `heartbeat-compaction-and-streaming`, `sandbox`,
`entries-and-multi-agent`, `sessions`, `messages-and-talk`).

**The schema, not the docs, is the vendor's declared source of truth.** *"Code truth beats this
page"* — `openclaw config schema` prints the live JSON Schema, and the Gateway exposes
`config.schema.lookup` to fetch *"one exact path-scoped schema node"* plus child summaries. Plugin
and channel schemas merge in when the manifest registry is loaded.

Every leaf carries a `uiHints.advanced` boolean. *"A path with no declared ancestor is advanced by
default."* It is presentational only — *"not validation, defaults, reload behavior, or whether the
key can be set."*

---

## 4. Hot reload — three outcomes, not two

`gateway.reload.mode` has two values since `hot` and `restart` were retired (`doctor --fix` maps both
to `hybrid`):

- **`hybrid`** (default) — applies hot-reloadable settings, restarts automatically when required.
- **`off`** — no file watching; changes land at the next manual restart.

Reload **planning** classifies each changed path into one of three outcomes:

| Outcome | Meaning |
|---|---|
| `restart` | Restart the Gateway process |
| `hot` | Apply while the process keeps running — may restart the owning subsystem (a channel, cron, heartbeat) |
| `none` | Update the runtime snapshot with no reload action; consumers observe it on a later read |

**The longest matching config prefix wins, and a path matching no rule defaults to a Gateway
restart.** Rules supplied by a plugin apply only while that plugin is loaded — so unloading a plugin
can silently change a key's reload class. Channel plugins declare their own
`reload.configPrefixes` and `reload.noopPrefixes`.

Only two categories need a full restart: *"Other `gateway.*` settings (port, bind, auth mode, roles,
tailscale, TLS)"* and *"Other `discovery` and `browser` settings, MCP Apps listener settings,
`secrets.egressProxy`, `plugins.load`, `plugins.installs`."* Everything else — `agents`, `models`,
`hooks`, `cron`, `session`, `tools`, `skills`, `plugins.entries`, `bindings`, `approvals.exec` — is
hot.

Direct file edits are *"treated as untrusted until they validate."* An invalid hot reload is skipped
and the runtime keeps the last accepted config; a hand edit rejected by the watcher can still sit on
disk while the Gateway runs the old one.

---

## 5. Environment, substitution, and secret refs

Precedence, highest first: process env → inline `env.vars` → `.env` in the working directory →
`~/.openclaw/.env`. *"Neither file overrides existing env vars."* Optional login-shell import
(`env.shellEnv.enabled`, `timeoutMs` default `15000`, alias `OPENCLAW_LOAD_SHELL_ENV=1`) imports
**only the missing keys**.

`${VAR_NAME}` substitution works in any config string value, including inside `$include` files:

- only `[A-Z_][A-Z0-9_]*` names match;
- missing or empty vars *"stay visibly unresolved, emit a warning, and are unavailable to consumers that require the value"* — they do not become empty strings;
- `$${VAR}` escapes to a literal.

**SecretRef** objects replace inline credentials on supported fields:
`{ source: "env" | "file" | "exec" | "store", provider, id }`. The `env` and `store` sources use the
built-in `default` provider with no `secrets.providers` entry; `file` and `exec` require provider
configuration. The supported credential paths are enumerated separately at
`/reference/secretref-credential-surface`.

---

## 6. Editing surfaces

`openclaw config get/set/unset`, the `openclaw onboard` and `openclaw configure` wizards, the Control
UI **Config** tab (a form rendered from the live schema, with a Raw JSON escape hatch, splitting
common from `Advanced (N)` fields per section), and direct file edit under the watcher.

Related: hooks configuration in [`11`](./11-hooks-internal-and-plugin.md), tool policy in
[`13`](./13-tool-policy-approvals-and-sandboxing.md), roles in
[`17`](./17-operators-roles-and-multi-user.md).
