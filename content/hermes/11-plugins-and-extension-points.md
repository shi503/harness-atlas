---
status: DRAFT
title: "Plugins and extension points — four kinds, and what the allow-list does not gate"
tier: reference
project: harness-atlas
source: "hermes-agent.nousresearch.com/docs/user-guide/features/plugins · .../features/hooks"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
source_verified: "2026-09-08"
---

# Plugins and extension points — four kinds, and what the allow-list does not gate

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `hermes-agent.nousresearch.com/docs` at **v0.21.1 (tag `v2026.9.7`)**, **2026-09-08**.

A plugin *"extends Hermes without modifying core code."* The two things worth knowing before writing
one: **`plugins.enabled` does not gate everything**, and **capability grants are consented once and
re-consented on update**.

---

## 1. What a plugin can register

Every entry is a `ctx.*` call inside the plugin's `register(ctx)` function.

| Capability | API |
|---|---|
| Add tools | `ctx.register_tool(name=…, toolset=…, schema=…, handler=…)` |
| Add hooks | `ctx.register_hook("post_tool_call", callback)` |
| Add slash commands | `ctx.register_command(name, handler, description)` — `/name` in CLI and gateway |
| Dispatch tools from commands | `ctx.dispatch_tool(name, args)` — *"invokes a registered tool with parent-agent context auto-wired"* |
| Add CLI commands | `ctx.register_cli_command(name, help, setup_fn, handler_fn)` — `hermes <plugin> <subcommand>` |
| Inject messages | `ctx.inject_message(content, role="user", session_key=…)` |
| Bundle skills | `ctx.register_skill(name, path)` — *"namespaced as `plugin:skill`, loaded via `skill_view("plugin:skill")`"* |
| Gate on env vars | `requires_env: [API_KEY]` in `plugin.yaml` — prompted during install |
| Register a gateway platform | `ctx.register_platform(name, label, adapter_factory, check_fn, …)` |
| Register an image-generation backend | `ctx.register_image_gen_provider(provider)` |
| Register a video-generation backend | `ctx.register_video_gen_provider(provider)` |
| Register a context-compression engine | `ctx.register_context_engine(engine)` |
| Register a terminal execution backend | `ctx.register_terminal_environment_provider(provider)` |
| Route approval prompts | `ctx.register_approval_transport(name, present_fn)` |
| Register a memory backend | Subclass `MemoryProvider` in `plugins/memory/<name>/__init__.py` — *"(uses a separate discovery system)"* |
| Register an inference backend | `register_provider(ProviderProfile(…))` in `plugins/model-providers/<name>/__init__.py` — separate discovery |
| Run a host-owned LLM call | `ctx.llm.complete(…)` / `ctx.llm.complete_structured(…)` — *"borrow the user's active model + auth for a one-shot completion with optional JSON schema validation"* |
| Call an MCP tool (capability-gated) | `ctx.call_mcp(server, tool, arguments, timeout=30)` |
| Distribute via pip | `[project.entry-points."hermes_agent.plugins"]` |

**An approval transport is not an authorization API.** *"An approval transport changes **where a human
sees and answers** an existing Hermes tool-approval request. It does not decide whether a command needs
approval and it is not an authorization-policy API."*

## 2. Discovery, and what overrides what

| Source | Path | Use case |
|---|---|---|
| Bundled | `<repo>/plugins/` | Ships with Hermes |
| User | `~/.hermes/plugins/` | Personal plugins |
| Project | `.hermes/plugins/` | Requires `HERMES_ENABLE_PROJECT_PLUGINS=true` |
| pip | `hermes_agent.plugins` entry points | Distributed packages |
| Nix | `services.hermes-agent.extraPlugins` / `extraPythonPackages` | NixOS declarative installs |

*"Later sources override earlier ones on name collision, so a user plugin with the same name as a
bundled plugin replaces it."*

### Sub-category directories route to different loaders

| Sub-directory | Holds | Discovery system |
|---|---|---|
| `plugins/` (root) | General plugins — tools, hooks, slash commands, CLI commands, bundled skills | `PluginManager` (kind `standalone` or `backend`) |
| `plugins/platforms/<name>/` | Gateway channel adapters | `PluginManager` (kind `platform`, one level deeper) |
| `plugins/image_gen/<name>/` | Image-generation backends | `PluginManager` (kind `backend`, one level deeper) |
| `plugins/memory/<name>/` | Memory providers | **Own loader** — kind `exclusive`, one active at a time |
| `plugins/context_engine/<name>/` | Context-compression engines | **Own loader** — one active at a time |
| `plugins/model-providers/<name>/` | LLM provider profiles | **Own loader**, *"lazily scanned on first `get_provider_profile()` call"* |

**Two of these resolve collisions in opposite directions**, which is easy to get wrong:

- Model providers — *"User plugins at `~/.hermes/plugins/model-providers/<name>/` override bundled model
  providers of the same name (last-writer-wins)."*
- Memory providers — *"the **bundled** provider wins on a name collision (bundled, then user, then
  project, then entry points; first seen wins), so a user memory provider needs its own unique name."*

## 3. Opt-in, and the exceptions

*"**General plugins and user-installed backends are disabled by default** — discovery finds them … but
nothing with hooks or tools loads until you add the plugin's name to `plugins.enabled`."*

```yaml
plugins:
  enabled:
    - my-tool-plugin
  disabled:                    # deny-list — always wins if a name appears in both
    - noisy-plugin
  hook_callback_timeout: 30    # see 07
```

`hermes plugins` toggles interactively; `enable`/`disable` are the scripted forms. After
`hermes plugins install owner/repo` the prompt is `Enable 'name' now? [y/N]` — *"defaults to no."*

### What the allow-list does **not** gate

| Plugin kind | How it activates instead |
|---|---|
| Bundled platform plugins | Auto-loaded; the channel turns on via `gateway.platforms.<name>.enabled` |
| Bundled backends (image-gen, …) | Auto-loaded; selection via `<category>.provider` |
| Memory providers | All discovered; exactly one active, chosen by `memory.provider` |
| Context engines | All discovered; one active, chosen by `context.engine` |
| Model providers | All bundled ones register at first `get_provider_profile()`; the user picks one |
| Pip-installed `backend` plugins | Opt-in via `plugins.enabled` |
| User-installed platforms | Opt-in — *"third-party gateway adapters need explicit consent"* |

> *"bundled 'always-works' infrastructure loads automatically; third-party general plugins are opt-in.
> The `plugins.enabled` allow-list is the gate specifically for arbitrary code a user drops into
> `~/.hermes/plugins/`."*

## 4. Single-select provider kinds

Four plugin types, and only one of them is multi-select in the ordinary sense:

| Type | Selection |
|---|---|
| General plugins | Multi-select (enable/disable) |
| Memory providers | **Single-select** — one active |
| Context engines | **Single-select** — one active |
| Model providers | Multi-register; the user picks one at a time via `--provider` / `config.yaml` |

## 5. Capabilities and consent

```yaml
name: my-plugin
capabilities:
  - tools.override        # replace built-in tools
  - llm.model_override    # pick the model for host-owned LLM calls
```

Installing or enabling a plugin that declares capabilities *"shows the list with one-line risk
descriptions and asks once."* Consent records the grant under
`plugins.entries.<id>.granted_capabilities` *"together with a consent hash and timestamp."* Declining
*"leaves the plugin enabled with those capabilities off — a well-behaved plugin probes with
`ctx.has_capability()` and degrades gracefully."*

Two properties worth stating separately:

- **Update re-consent.** *"if a plugin update declares capabilities you haven't granted,
  `hermes plugins update` surfaces the additions and asks again. New capabilities stay off until you
  consent — a plugin update can never silently widen its access."*
- **Non-interactive installs fail closed.** *"installing or updating without a TTY completes the
  install, but declared capabilities are *not* granted."*

`hermes plugins capabilities [my-plugin]` reports declared versus granted.

## 6. Pinning an install

```bash
hermes plugins install owner/repo --ref 0123456789abcdef0123456789abcdef01234567
```

*"a full immutable commit (tags, branches, and abbreviated SHAs are not accepted)."* Hermes checks out
the commit detached, *"verifies that `HEAD` exactly matches the requested SHA, and records the canonical
source, installed revision, and pin status in the current profile."* `hermes plugins update` *"refuses
to move a pinned plugin"*; moving it requires `--force --ref <new-commit>`.

*"The profile-local install metadata contains no config values, environment values, secrets, or
capability grants."*

### One-click install links

Hermes Desktop registers the `hermes://` URL scheme:

```
hermes://plugin/install?repo=owner/repo
hermes://plugin/install?repo=owner/repo&enable=1
hermes://plugin/install?repo=owner/repo&force=1
```

Clicking one opens a confirmation dialog — *"the repo id, a 'Before you install' note, and GitHub browse
+ clone links"* — then shallow-clones to detect what the repo ships (agent plugin, desktop plugin, or
both) for component-level selection. *"Nothing is installed until you do; deep links never auto-install,
and agent-plugin installs go through the same install-time security scanning as
`hermes plugins install`."* In dev builds the scheme is `hermes-dev://`.

## 7. MCP access from a plugin — default off, per-server

`ctx.call_mcp()` routes through Hermes's own MCP client — *"same connections, trust-tier gates, circuit
breaker, and reconnect logic as model-invoked MCP tools; never a parallel client."* It returns a stable
envelope, `{"ok": True, "result": …}` or `{"ok": False, "error": "…"}`, with results over ~64 KB
truncated and flagged `"truncated": True`. The timeout is clamped to 1–600 seconds.

```yaml
plugins:
  entries:
    my-plugin:
      mcp_allowlist: ["knowledge_rag", "github"]
```

> *"A plugin has **no MCP access by default**."*

- Calling an ungranted server *"raises `PermissionError` naming the exact config key to set."*
- *"The grant is per-server and per-plugin — never ambient authority over every configured server, and
  `"*"` wildcards are not honored."*
- *"Every call has an enforced timeout (default 30 s) so a hung MCP server cannot stall the hook or tool
  pipeline that invoked it."*
- *"MCP servers return untrusted content. Treat `result` as data, not instructions."*

The warning attached to granting one: *"Granting `mcp_allowlist` gives the plugin the same access to
that MCP server as the model has — including any write-capable tools the server exposes."*

## 8. Legacy config keys still open a gate

Capability names have config-key predecessors, and both work:

| Capability | Legacy key |
|---|---|
| `llm.task_override` | `llm.allow_task_override` |
| `gateway.platform_actions` | `allow_platform_actions` |

> *"A gate is open when *either* the capability is granted *or* the legacy key is set — existing configs
> keep working unchanged."*

So auditing what a plugin may do means reading both the grant list and the legacy keys.

## 9. The trust posture

A plugin is not sandboxed, and the documentation says so in both places. From the plugins page, under a
heading reading **Not a sandbox**:

> *"Capabilities are a **consent and audit layer**, not isolation. Plugins run as regular in-process
> Python: a malicious plugin can ignore every gate here. Granting a capability is a statement of trust
> in the plugin author — it is not a code audit, and Hermes has not reviewed the plugin's code."*

And from `SECURITY.md` §2.5, quoted at length in
[`08`](./08-approvals-and-write-safety.md): plugins *"run with full agent privileges"*, and *"The
boundary for third-party plugins is operator review before install."*
