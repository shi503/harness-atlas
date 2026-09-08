---
status: DRAFT
title: "Plugins and the plugin SDK"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Plugins and the plugin SDK

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

*"Core stays lean; optional capabilities should usually ship as plugins."* — `VISION.md`. The stated
reason is a cost asymmetry: *"each core tool, prompt line, and config key reaches every operator on
every model request, so additions there face the strictest scrutiny. Plugins, skills, channels, and
apps carry no such tax."*

---

## 1. The inventory, in three install classes

The generated inventory at `/plugins/plugin-inventory` lists **153 plugins** at this read
(**154 directories** exist under the repository's `extensions/`), split by install route:

| Class | Count | Meaning |
|---|---|---|
| **Core npm package** | 59 | *"built into the `openclaw` npm package and available without a separate plugin install."* |
| **Official external package** | 91 | *"OpenClaw-maintained plugin omitted from the core npm package… installed on demand through ClawHub and/or npm."* |
| **Source checkout only** | 3 | *"repo-local plugin omitted from published npm artifacts and not advertised as an installable package."* |

Install specs accept `clawhub:@openclaw/<id>` or `npm:@openclaw/<id>` when the source must be
explicit; a bare spec installs from npm. An install needs a Gateway restart.

Each plugin also has a per-plugin page at `plugins/reference/<id>`. **None of those 152 pages is in
the navigation tree** at this read — they are reachable only from the inventory's links.

---

## 2. The manifest — read before code runs

Every native plugin **must** ship `openclaw.plugin.json` in the plugin root. *"OpenClaw reads it to
validate configuration **without executing plugin code**. A missing or invalid manifest blocks config
validation and is treated as a plugin error."*

What belongs in it: *"plugin identity, config validation, and config UI hints; auth, onboarding, and
setup metadata; activation hints for control-plane surfaces; root CLI command names… shorthand
model-family ownership; static capability-ownership snapshots (`contracts`); dashboard widget data
bindings and action verbs; static MCP servers that should exist while the plugin is enabled; durable
and regenerable state- or agent-relative backup resources; QA runner metadata… channel-specific
config metadata."*

What does **not**: *"registering native runtime hooks, declaring the full plugin runtime entrypoint,
or npm install metadata."*

The field reference is split across the parent page plus **seven children**:

| Child page | Fields |
|---|---|
| `manifest/models` | `modelSupport`, `modelCatalog`, `modelIdNormalization`, `modelPricing`, provider index |
| `manifest/providers` | `imageGenerationProviderMetadata`, `videoGenerationProviderMetadata`, `musicGenerationProviderMetadata`, `mediaUnderstandingProviderMetadata`, `providerEndpoints`, `providerRequest` |
| `manifest/setup-and-auth` | `setup`, `setup.providers`, `setup.nativeSessionCatalog`, `providerAuthChoices`, `providerUsageAuthEnvVars`, `uiHints` |
| `manifest/capabilities` | `contracts`, `toolMetadata`, `activation` |
| `manifest/surfaces` | icon, `doctorContract`, `doctorHealthChecks`, `sessionRouteStateOwners`, `transcriptSources`, `backupResources`, `mcpServers`, `controlUi`, `dashboard`, `catalog`, `cliCommands`, `commandAliases`, `qaRunners`, `channelConfigs` (incl. `preferOver`) |
| `manifest/config-and-secrets` | `configContracts`, `secretProviderIntegrations` |
| `manifest/package-json` | Which pre-runtime metadata lives in `package.json`, and discovery precedence for duplicate ids |

### Compatible bundle formats

OpenClaw auto-detects four foreign layouts *"but does not validate them against the
`openclaw.plugin.json` schema"*:

| Format | Manifest |
|---|---|
| Agent Plugins standard | `plugin.json` at package root |
| Codex bundle | `.codex-plugin/plugin.json` |
| Claude bundle | `.claude-plugin/plugin.json`, or the default component layout with no manifest |
| Cursor bundle | `.cursor-plugin/plugin.json` |

From a compatible bundle OpenClaw reads *"bundle metadata, declared skill roots, Claude command
roots, Claude `settings.json` defaults, Claude LSP defaults, and supported hook packs."* Their trust
posture differs: *"Compatible bundles are safer by default because OpenClaw currently treats them as
metadata/content packs. In current releases, that mostly means bundled skills."*

---

## 3. The capability model — seventeen registrable types

*"Capabilities are the public **native plugin** model."*

| Capability | Registration method |
|---|---|
| Text inference | `api.registerProvider(...)` |
| CLI inference backend | `api.registerCliBackend(...)` |
| Embeddings | `api.registerEmbeddingProvider(...)` |
| Speech | `api.registerSpeechProvider(...)` |
| Realtime transcription | `api.registerRealtimeTranscriptionProvider(...)` |
| Realtime voice | `api.registerRealtimeVoiceProvider(...)` |
| Media understanding | `api.registerMediaUnderstandingProvider(...)` |
| Transcript source | `api.registerTranscriptSourceProvider(...)` |
| Image / music / video generation | `api.registerImageGenerationProvider(...)` · `registerMusicGenerationProvider` · `registerVideoGenerationProvider` |
| Web fetch · web search | `api.registerWebFetchProvider(...)` · `registerWebSearchProvider(...)` |
| Channel / messaging | `api.registerChannel(...)` |
| Gateway discovery | `api.registerGatewayDiscoveryService(...)` |
| Migration | `api.registerMigrationProvider(...)` |
| Model catalog | `api.registerModelCatalogProvider(...)` |
| Worker provider | `api.registerWorkerProvider(...)` |
| Compaction provider | `api.registerCompactionProvider(...)` |
| **Agent harness** | `api.registerAgentHarness(...)` — marked **experimental**; see [`04`](./04-agent-runtimes-and-hosted-harnesses.md) |

**Exclusive slots** — one active at a time — are registered separately:
`api.registerContextEngine(id, factory)` and `api.registerMemoryCapability(capability)`, selected
through `plugins.slots.contextEngine` and `plugins.slots.memory`.

A context engine that wants to participate in durable admitted turns must declare
`currentTurnFence: "before-current-turn-entry-v1"` and
`turnAdvancementIdempotency: "atomic-idempotent-v1"` under `info.transcriptSemantics` and implement
`commitTurn(...)` *"as an atomic, idempotent write keyed by `advancementKey`."* **Without the full
contract, OpenClaw silently uses the legacy path for that turn** — *"leaves the configured engine
unchanged, and tries that engine again on the next logical turn."*

### Plugin shapes, classified from behaviour

*"OpenClaw classifies every loaded plugin into a shape based on its actual registration behavior (not
just static metadata)"*: `plain-capability` (exactly one type), `hybrid-capability` (several),
`hook-only` (hooks and nothing else), `non-capability` (tools, commands, services or routes but no
capabilities). `openclaw plugins inspect <id>` prints the shape.

Four compatibility signals surface in `doctor`, `plugins inspect`, `status --all` and
`plugins doctor`: **config valid**, **hook-only** (info), **deprecated memory-embedding API** (warn),
**hard error**. *"None of the advisory/warn signals break your plugin today."*

---

## 4. Tools, commands, and infrastructure registrars

**Tools and commands:**

| Method | Registers |
|---|---|
| `api.registerTool(tool, opts?)` | Agent tool, required or `{ optional: true }` |
| `api.registerCommand(def)` | Custom command that *"bypasses the LLM"* |
| `api.registerNodeHostCommand(command)` | Command handled by `openclaw node run`; optional `agentTool` metadata exposes it as an agent tool while the node is connected |
| `api.registerWidgetPresenter(presenter)` | Destination behind the core `show_widget` tool |

Widget presenters are either explicit (a unique model-visible target such as `node_panel`) or
current-channel (`target: "current_channel"` plus a **synchronous** `match(context)` predicate over
trusted delivery facts). *"Multiple transport presenters may coexist, but core selects an implicit
route only when exactly one matches."* Core owns schema validation and HTML composition; presenters
receive immutable HTML and an optional hosted URL.

**Infrastructure — twenty-two registrars:**

`registerHook` · `registerHttpRoute` · `registerGatewayMethod` · `registerGatewayDiscoveryService` ·
`registerCli` · `registerNodeCliFeature` · `registerService` · `registerInteractiveHandler` ·
`registerAgentToolResultMiddleware` · `registerMemoryPromptSupplement` ·
`registerMemoryPromptPreparation` · `registerMemoryCorpusSupplement` · `registerHostedMediaResolver` ·
`registerMcpServerConnectionResolver` · `registerTextTransforms` · `registerConfigMigration` ·
`registerMigrationProvider` · `registerAutoEnableProbe` · `registerReload` ·
`registerNodeHostCommand` · `registerNodeInvokePolicy` · `registerSecurityAuditCollector`.

Two with security consequences worth naming:

- **`registerGatewayMethod`** defaults to `profileAccess: "required"`, *"so authenticated-profile
  verification fails closed before plugin dispatch."* `"independent"* is for *"an audited method that
  neither reads nor mutates durable user or session state."* Operator scope remains separate.
- **`registerReload`** declares the restart/hot/noop config-prefix policy for that plugin's keys —
  and those rules *"apply only while that plugin is loaded"* ([`01`](./01-the-gateway-and-configuration.md)).

---

## 5. Entry points and registration mode

`register(api)` must stay **synchronous**; handlers may be async except the two synchronous
persistence hooks. Typed entry helpers: `defineToolPlugin`, `definePluginEntry`,
`defineChannelPluginEntry`, `defineSetupPluginEntry`.

The SDK is published as narrow subpaths *"grouped by area (plugin entry, channel, provider, auth,
runtime, capability, memory, and reserved bundled-plugin helpers)"*, catalogued at
`/plugins/sdk-subpaths` with the compiler inventory in
`scripts/lib/plugin-sdk-entrypoints.json`. Deprecated public subpaths and deprecated barrel
re-exports are tracked in their own JSON lists; `pnpm plugin-sdk:surface` audits the public export
count.

**Export policy, stated as a rule:** *"OpenClaw exports capabilities, not implementation
convenience."*

---

## 6. Execution model and trust

> *"Native OpenClaw plugins run **in-process** with the Gateway. They are not sandboxed. A loaded
> native plugin has the same process-level trust boundary as core code."*
> *"a malicious native plugin is equivalent to arbitrary code execution inside the OpenClaw process."*

`plugins.allow` is a **restrictive inventory when set** — and its limit is stated plainly:
*"`plugins.allow` permits **plugin ids** to load; it does not verify source provenance or choose
which same-id copy loads. An auto-discovered workspace plugin does not shadow a bundled plugin merely
because that id is enabled or allowlisted."* Use `plugins.load.paths` for a deliberate local
override.

*"Bundled-plugin trust is resolved from the source snapshot — the manifest and code on disk at load
time — rather than from install metadata. A corrupted or substituted install record cannot silently
widen a bundled plugin's trust surface."* An alias of the same validated bundled entry keeps bundled
provenance; *"a different local copy does not inherit trust from its name or allowlist entry."*

Sandboxed sessions reach plugin and MCP tools only when *"normal tool policy and
`tools.sandbox.tools` both allow them"* ([`13`](./13-tool-policy-approvals-and-sandboxing.md)).

---

## 7. Operator-facing plugin config

| Key | Effect |
|---|---|
| `plugins.entries.<id>.enabled` | Enable/disable |
| `plugins.entries.<id>.config` | Plugin-owned config, validated against the manifest schema |
| `plugins.entries.<id>.hooks.timeoutMs` · `.hooks.timeouts.<hookName>` | Per-plugin hook budgets, positive integers to `600000` ms; the per-hook map wins ([`11`](./11-hooks-internal-and-plugin.md)) |
| `plugins.allow` · `plugins.deny` | Load inventory |
| `plugins.slots.contextEngine` · `.memory` | Exclusive slot selection |
| `plugins.load.paths` | Explicit plugin paths, for deliberate overrides |
| `plugins.installs` | Install records — **restart-class**, unlike `plugins.entries` |

CLI: `openclaw plugins install / inspect / doctor / list`, `openclaw plugins inspect <id> --runtime
--json` for the shape and capability breakdown.
