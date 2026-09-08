---
status: DRAFT
title: "Tool policy, exec approvals, and sandboxing"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Tool policy, exec approvals, and sandboxing

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

*"OpenClaw has three related but different controls"*, and the docs devote a whole page to keeping
them apart because every "why is this blocked" question resolves to one of them:

1. **Sandbox** (`agents.defaults.sandbox.*`, `agents.entries.*.sandbox.*`, or a required creator-role
   policy) decides **where tools run**.
2. **Tool policy** (`tools.*`, `tools.sandbox.tools.*`, `agents.entries.*.tools.*`) decides **which
   tools are available**.
3. **Elevated** (`tools.elevated.*`) is *"an **exec-only escape hatch** from ordinary sandboxing…
   It cannot bypass a creator role's required sandbox."*

`openclaw sandbox explain [--session … | --agent … | --json]` prints the effective mode, scope,
workspace access, whether the session is currently sandboxed, the effective sandbox tool allow/deny
**and where it came from**, and the elevated gates with their fix-it key paths.

---

## 1. Tool policy — five layers and two rules

Layers, all with per-agent equivalents:

- **Tool profile** — `tools.profile`, `agents.entries.*.tools.profile`
- **Provider tool profile** — `tools.byProvider[provider].profile`
- **Global / per-agent policy** — `tools.allow` / `tools.deny`
- **Provider tool policy** — `tools.byProvider[provider].allow|deny`
- **Sandbox tool policy** — `tools.sandbox.tools.allow|deny`, applied **only when sandboxed**

Two rules: *"`deny` always wins"*, and *"If `allow` is non-empty, everything else is treated as
blocked."*

**Tool policy is the hard stop** — *"`/exec` cannot override a denied `exec` tool."* But it filters
**by name only**: *"it does not inspect side effects inside `exec`. If `exec` is allowed, denying
`write`, `edit`, or `apply_patch` does not make shell commands read-only."* Provider keys accept
either `provider` or `provider/model`.

`openclaw logs` carries `agents/tool-policy` entries *"when a tool policy step removes tools or a
sandbox tool policy blocks a call"*, naming the rule label, config key and affected tools.

### The thirteen tool groups

`group:*` entries expand inside any tool policy:

| Group | Tools |
|---|---|
| `group:runtime` | `exec`, `process`, `code_execution` (`bash` aliases `exec`) |
| `group:fs` | `read`, `write`, `edit`, `apply_patch` |
| `group:sessions` | `sessions`, `sessions_list`, `sessions_history`, `sessions_search`, `conversations_list`, `conversations_send`, `conversations_turn`, `sessions_send`, `sessions_spawn`, `sessions_yield`, `subagents`, `session_status`, `suggest_task`, `dismiss_task` |
| `group:memory` | `memory_search`, `memory_get` |
| `group:web` | `web_search`, `x_search`, `web_fetch` |
| `group:ui` | `browser`, `screen`, `terminal`, `canvas`, `progress_card`, `show_widget` |
| `group:automation` | `heartbeat_respond`, `cron`, `gateway` |
| `group:messaging` | `message` |
| `group:nodes` | `nodes`, `computer` |
| `group:agents` | `agents_list`, `get_goal`, `create_goal`, `update_goal`, `progress_card`, `ask_user`, `skill_workshop` |
| `group:media` | `image`, `image_generate`, `music_generate`, `video_generate`, `tts` |
| `group:openclaw` | Most built-ins, **excluding** the `read`/`write`/`edit`/`apply_patch`/`exec`/`process` primitives, `canvas`, and provider plugins |
| `group:plugins` | All loaded plugin-owned tools, *"including configured MCP servers exposed through `bundle-mcp`"* |

*"For read-only agents, deny `group:runtime` as well as mutating filesystem tools."*

**The sandbox tool policy is a second allow gate for MCP.** If `mcp.servers` is configured but
sandboxed turns show only built-ins, add `bundle-mcp`, `group:plugins`, or a server-prefixed name or
glob to `tools.sandbox.tools.alsoAllow`. `openclaw doctor` *"currently checks this shape for
OpenClaw-managed servers in `mcp.servers`"* only — servers from bundled plugin manifests or a Claude
`.mcp.json` *"use the same sandbox gate, but this diagnostic does not enumerate those sources yet."*

---

## 2. Exec approvals — five modes over two dimensions

`tools.exec.mode` is *"the normalized policy surface for host `exec`."* Each mode resolves to a
`security` (allowlist strictness) and `ask` (prompt-on-miss) pair:

| Mode | security / ask | Behaviour |
|---|---|---|
| `deny` | `deny` / `off` | Block host exec entirely |
| `allowlist` | `allowlist` / `off` | Run allowlisted commands; **silently deny misses** |
| `ask` | `allowlist` / `on-miss` | Run matches; ask a human on misses |
| `auto` | `allowlist` / `on-miss` | Run matches; *"send misses through auto-review before falling back to human approval"* |
| `full` | `full` / `off` | Run host exec without prompts |

`auto` is the recommended default for coding agents; it *"additionally enables the native
auto-reviewer, which decides misses itself and only defers to the configured human approval route
when it cannot safely approve."*

**Approvals can only tighten.** *"Effective policy is the **stricter** of `tools.exec.*` and approvals
defaults: approvals can only tighten config-derived security/ask, never loosen them."* Host exec also
consults **local approvals state on the executing machine** — *"a host-local `ask: 'always'` in the
execution host approvals document keeps prompting even if session or config defaults request
`ask: 'on-miss'`."*

**Node execution is checked on both ends:** *"caller `allowlist` / `off` denies an unmatched command,
and target `ask: 'always'` requires approval even when the caller requests `full` / `off`."*

`tools.exec.host` is a **separate axis**: it *"chooses where a command runs"* (`gateway`, `node`,
`sandbox`, `auto`), while `tools.exec.mode` *"chooses how host exec is approved."*

Inspect with `openclaw approvals get` and `openclaw exec-policy show`.

### The trust model, stated as limits

- *"Gateway-authenticated callers are trusted operators for that Gateway."*
- *"Paired nodes extend that trusted operator capability onto the node host."*
- *"Approvals reduce accidental execution risk, but are **not** a per-user auth boundary or filesystem
  read-only policy."*
- *"Once approved, a command can mutate files according to the selected host or sandbox filesystem
  permissions."*

**Approved node-host runs bind canonical execution context:** cwd, exact argv, env binding when
present, and the pinned executable path. For shell scripts and direct interpreter invocations,
OpenClaw also binds *"one concrete local file operand. If that file changes after approval but before
execution, the run is denied instead of executing drifted content."* The limit is stated with it:
*"File binding is best-effort, not a complete model of every interpreter/runtime loader path. If
exactly one concrete local file cannot be identified, OpenClaw refuses to mint an approval-backed run
rather than pretend full coverage."*

---

## 3. The allowlist

Per agent, glob matches. *"Bare names match only commands invoked through `PATH`, so `rg` can match
`/opt/homebrew/bin/rg` when the command is `rg`, but **not** `./rg` or `/tmp/rg`."* *"Shell chains
such as `echo ok && pwd` still need every top-level segment to satisfy allowlist rules."*

| Field | Meaning |
|---|---|
| `pattern` | Resolved binary path glob or bare command-name glob |
| `argPattern` | ECMAScript argv regex, or a generated exact-argv hash; omitted means path-only |
| `id` | Stable opaque id, UUID when absent |
| `source` | Generated-entry source such as `allow-always`; omit for manual entries |
| `commandText` | Legacy plaintext input — *"discarded during load"* |
| `lastUsedAt` · `lastUsedCommand` · `lastResolvedPath` | Usage metadata; `lastUsedCommand` is omitted for hashed-argv entries |

`argPattern` uses ECMAScript semantics **on every host**, evaluated against the parsed arguments
**excluding `argv[0]`**, joined with a single space for hand-authored entries — *"anchor the pattern
when you need an exact match."* A path-only entry for the same binary *"can still fall back"* for
unmatched arguments; omit it when the goal is to restrict the binary to declared arguments. *"If
OpenClaw cannot parse argv for a command segment, entries with `argPattern` do not match."*

**Generated `allow-always` entries are bound to both the exact argv and the approving working
directory.** *"Choosing **Always allow here** authorizes the same command only in that directory;
running it elsewhere is an allowlist miss."* Older entries that were not directory-bound *"are
inactive after an upgrade"* and are removed by `openclaw update`'s Doctor pass.

---

## 4. Standing grants for automations

An approval raised by a Gateway-host automation run is delivered **only** to connected exec-approval
clients — Control UI, macOS/iOS/Android apps, API clients declaring the `approvals` or
`exec-approvals` capability. *"The TUI does not render exec approval cards, and chat channels never
receive automation approvals."* **With no approval surface connected, the request is denied
immediately.**

Resolving such an approval with **Always allow** *"does not write a JSON allowlist entry. Instead the
Gateway mints a scoped standing grant bound to that exact agent, automation, job configuration, and
operation (command text, working directory, and requested environment)."* The approval card carries a
scope line saying so.

**A grant fails closed on any change:** *"the job was edited or deleted (any configuration change
invalidates it), the command, working directory, or environment differs by even one byte, the grant
was revoked or expired, or the original approval record is gone."* The check runs *"immediately before
the process spawns, so a revocation or job edit that lands mid-flight still wins."* Mutable file
operands, heredocs, strict inline eval, and audit suppression *"keep prompting per occurrence."*

**Lifetime.** *"By default a grant lives **until revoked**."* `tools.exec.grantExpiryDays` sets a
default for **future** grants only — *"Existing grants keep the terms they were minted with."* A
resolving surface may override per grant with `grantExpiresInDays` on `approval.resolve` /
`exec.approval.resolve`, or `openclaw approvals resolve <id> allow-always --expires-in-days <n>`.

**Visible and revocable.** Control UI **Settings → Approvals** shows the ledger — automation, exact
command, use count, state — with a Revoke action; `openclaw approvals grants list` and
`… grants revoke <grant-id>` do the same. *"Revocation is idempotent and takes effect at the next
occurrence's spawn boundary."* The authority stays with the approval row: *"a grant is derivative
correlation, revalidated against the live approval row, automation row, and revocation state on every
use."*

MCP tool grants are a parallel mechanism: **Allow Always** on a Gateway-hosted run can save a durable
grant for one MCP tool at `agents.<agentId>.mcpTools` in the same approvals document, covering
*"the exact agent, configured server name, and tool name, **with any arguments**."*

---

## 5. Sandboxing — three independent settings

*"Sandboxing is off by default… The Gateway process always stays on the host; only tool execution
moves into the sandbox when enabled."* And the honest bound: *"This is not a perfect security
boundary, but it materially limits filesystem and process access when the model does something
dumb."*

| Setting | Key | Values | Default |
|---|---|---|---|
| Mode | `agents.defaults.sandbox.mode` | `off`, `non-main`, `all` | `off` |
| Scope | `agents.defaults.sandbox.scope` | `agent`, `session`, `shared` | `agent` |
| Backend | `agents.defaults.sandbox.backend` | `docker`, `podman`, `ssh`, `openshell` | `docker` |

**`non-main` is the mode that surprises people.** *"The main session key is always
`agent:<agentId>:main`… it is not configurable. Group/channel sessions use their own keys, so they
always count as non-main and get sandboxed."*

**Scope `shared` ignores per-agent overrides** — *"per-agent `docker`/`ssh`/`browser` overrides are
ignored under this scope."*

**Non-shared runtime identity includes the resolved workspace path**, *"This prevents co-hosted
workspaces that reuse the same agent or session keys from sharing Docker, browser, SSH, OpenShell, or
plugin-provided sandbox state."* The first use after upgrade creates fresh runtimes under the
workspace-qualified identity: *"Existing non-shared runtimes are not adopted; this is an intentional
one-time reset."*

### What is and is not sandboxed

**Sandboxed:** `exec`, `ls`, `read`, `write`, `edit`, `apply_patch`, `process`, and the optional
sandboxed browser.

**Not:** *"The Gateway process itself"*, and any exec allowed out via `tools.elevated`. Native plugins
*"remain in-process with the Gateway and share its trust boundary"*; plugin and MCP tools execute
Gateway-side and are gated by policy rather than moved.

### Backend capability matrix

| Capability | Docker / Podman | SSH | OpenShell |
|---|---|---|---|
| Shell and child processes | Inside the container | On the remote host | Inside the managed sandbox |
| File tools | Container filesystem bridge | SSH filesystem bridge | SSH bridge in `mirror` or `remote` mode |
| Workspace access | `none` · `ro` · `rw` | same | same |
| Network restriction | `docker.network`, **defaults to `"none"`** | Remote host's | Selected OpenShell policy |
| Sandboxed browser | **Supported** (Docker engine only) | Not supported | Not supported |
| Additional host folders | `docker.binds` with explicit `:ro`/`:rw` | Not as mounts — seed or copy | Not as mounts |
| Packages and runtimes | Custom image, or `setupCommand` | Provision on the remote host | Source image, or install if policy permits |
| Plugin / MCP tool access | Gateway-side, gated by sandbox tool policy | same | same |

Docker defaults: `network: "none"`, `readOnlyRoot: true`, `capDrop: ["ALL"]`, image
`openclaw-sandbox:bookworm-slim`.

### Workspace access

| Value | Behaviour |
|---|---|
| `none` (default) | An isolated sandbox workspace under `~/.openclaw/sandboxes`; *"the agent workspace is not exposed"* |
| `ro` | Agent workspace mounted read-only at `/agent`; disables `write`/`edit`/`apply_patch` |
| `rw` | Agent workspace mounted read/write at `/workspace` |

The read-only roots are enforced by container mounts and sandbox file tools; *"SSH and OpenShell shell
execution relies on the remote host or OpenShell policy for filesystem restrictions; `workspaceAccess`
alone does not make remote shell paths read-only."*

**Bind mounts pierce the sandbox.** *"whatever you mount is visible inside the container with the mode
you set… Default is read-write if you omit the mode."* Sources are validated twice — on the
normalized path and again through the deepest existing ancestor — so *"Symlink-parent escapes do not
bypass blocked-path or allowed-root checks."* And the one named landmine: *"Binding
`/var/run/docker.sock` effectively hands host control to the sandbox."*

---

## 6. Role-required sandboxing

A named operator role may set `sandbox: "required"` ([`17`](./17-operators-roles-and-multi-user.md)).
Four properties, and they are the strongest guarantees on this page:

- It **overrides agent mode**, including `mode: "off"`.
- It is **immutable for the session** — *"The creator requirement is immutable for the session."*
- It **cannot be escaped** *"through elevated execution or host overrides."*
- It **fails closed**: *"unavailable backends fail closed"*, and *"backend failure never falls back to
  host execution."*

Two further clamps: `rw` workspace access is **capped at `ro`** with an `agent/sandbox` warning, and
isolation is **per authenticated creator**, not per agent or session — *"Different guests using the
same agent receive separate sandbox environments and workspaces… This per-guest boundary applies
regardless of the configured sandbox scope."*

---

## 7. Elevated — exec-only, and gated

*"Elevated does **not** grant extra tools; it only affects `exec`."*

- `/elevated on`, or `exec` with `elevated: true`, runs outside the ordinary sandbox — approvals may
  still apply. `/elevated full` skips exec approvals for the session.
- **Creator-role-required sandboxes reject elevated execution.**
- It *"does **not** override tool allow/deny"* and is *"not skill-scoped."*
- It *"does not grant arbitrary cross-host overrides from `host=auto`"* — it follows normal exec
  target rules and only preserves `node` when the target is already `node`.
- Gates: `tools.elevated.enabled` and `tools.elevated.allowFrom.<provider>`, each with per-agent
  equivalents.

`/exec` is a **different** command: *"It only adjusts per-session exec defaults for authorized
senders"* and grants no tool access.

---

## 8. The two most common blocks, and their keys

**"Tool X blocked by sandbox tool policy"** — either turn ordinary sandboxing off
(`agents.defaults.sandbox.mode=off`, which *"does not override a creator role's required sandbox"*),
or remove the tool from `tools.sandbox.tools.deny` / add it to the allow list. `openclaw logs` records
the sandbox mode and which rule blocked it.

**"I thought this was main, why is it sandboxed?"** — *"In `'non-main'` mode, group/channel keys are
_not_ main."*
