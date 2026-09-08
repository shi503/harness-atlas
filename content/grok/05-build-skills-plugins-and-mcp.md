---
status: DRAFT
title: "Grok Build — skills, plugins, marketplaces and MCP"
tier: reference
project: harness-atlas
product: "Grok Build"
source: "xai-org/grok-build @ 7581004 — user-guide 07, 08, 09"
version_at_capture: "commit 7581004 (SOURCE_REV eb4a894), no tags"
source_verified: "2026-09-08"
---

# Grok Build — skills, plugins, marketplaces and MCP

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**Product: Grok Build**, the Apache-2.0 Rust runtime. **Grok Bot has a "skill" and a "plugin" too, and
neither is this one** — Bot's skill has no documented file format and its plugins are connectors from a
hosted marketplace; see [`10`](./10-bot-skills-routines-and-automations.md). The words collide across
the two products; the objects do not.

Read against `xai-org/grok-build` at commit `7581004`, **2026-09-08**. No tags exist.

---

## 1. Skills

*"A skill is a directory that contains a `SKILL.md` file… Use a skill for a repeatable procedure that's
too specific for AGENTS.md but too long to retype."*

### `SKILL.md` frontmatter

**Two core fields.** `name` — lowercase letters, digits and hyphens, up to 64 characters; spaces and
underscores are normalized to hyphens; defaults to the directory name. `description` — *"Grok reads
this to decide whether to invoke the skill"*; defaults to the body's first paragraph.

**Nine optional fields.** Multi-word keys are kebab-case; single-word keys are bare.

| Field | Effect |
|---|---|
| `when-to-use` | trigger phrases, *"kept separate from `description`"* |
| `allowed-tools` | a YAML list, or a comma- or space-separated string |
| `argument-hint` | autocomplete hint text |
| `user-invocable` | default `true`; `false` hides it from slash commands |
| `disable-model-invocation` | default `false`; `true` means *"only your slash command runs the skill"* |
| `model` | model override for the skill |
| `effort` | reasoning-effort override |
| `license` | e.g. `Apache-2.0` |
| `compatibility` | *"Environment requirements (for example, `Requires git, docker, jq`)"* |
| `metadata` | arbitrary key-values; `metadata.author` and `metadata.short-description` are promoted for display |

**`user-invocable` and `disable-model-invocation` are two different switches**, and the guide says so
explicitly: one hides the slash command, the other blocks automatic invocation. Setting the wrong one
produces the opposite of the intended restriction.

### Discovery and control

The seven-location ladder — three native, four foreign — is in
[`01`](./01-build-harness-compatibility.md) §2, along with the `.gitignore` and vendor-default-filter
behaviours. Native control is `[skills]`:

```toml
[skills]
paths   = ["~/my-team-skills"]      # additional dirs, walked recursively
ignore  = ["~/my-team-skills/wip"]  # hidden entirely
disabled = ["wip-skill"]            # listed but inactive
```

*"`ignore` hides a skill completely; `disabled` keeps it in the list but excludes it from the system
prompt and from invocation."* `paths` and `ignore` take filesystem paths with `~` expansion; `disabled`
takes skill names.

**Two scopes exist that are not directories.** Bundled platform skills cache under
`~/.grok/bundled/skills/`, which *"Grok never writes"* to; and a managed workspace *"can sync skills to
users directly, without a plugin. Synced skills appear with the `server` scope… a user's own skill of
the same name shadows the synced one."*

`grok inspect` tags colliding skills — *"`[collides with /login → /acme:login]`"*.

`/create-skill` drafts one interactively, writing `<scope>/.grok/skills/<name>/` *"plus `scripts/` or
`references/` subdirectories when the skill needs them."*

---

## 2. Plugins

*"A plugin bundles skills, slash commands, agents, hooks, and MCP servers into one installable unit."*

### What a plugin directory holds

`skills/` (SKILL.md files) · `commands/` · `agents/` · `hooks/hooks.json` · `.mcp.json` · `.lsp.json`.
*"An optional `plugin.json` manifest can override paths or add metadata; without one, Grok discovers
components from these standard directories."*

**A helper script travels with the plugin; its runtime does not.** *"The script's runtime and any
packages it imports must already be present, plugins deliver files, not runtimes or native binaries."*
Stated again at the page's end: *"[Marketplaces] do not install a program onto a machine."*

### Five discovery locations, and two that are trusted because the caller supplied them

| Location | Scope | Trust |
|---|---|---|
| `_meta.pluginDirs` (`session/new` / `session/load`) | that session only | trusted automatically |
| `--plugin-dir` (`grok agent … stdio` flag) | that agent process only | trusted automatically |
| `.grok/plugins/` | project, via version control | **requires trust** |
| `~/.grok/plugins/` | user, every project | trusted automatically |
| `[plugins].paths` | custom directories | depends on location |

`.claude/plugins/` equivalents also work; name collisions resolve by priority. `--plugin-dir` is
repeatable and *"ignored in leader mode, where the shared leader discovers its own plugins."*

**Trust is per-capability, and the untrusted state is partial rather than absent.** *"Enabled plugins
require trust to load skills, commands, hooks, MCP servers, and LSP servers. Untrusted plugin agents
remain listed with frontmatter only."*

**Three things plugin agents may never declare:** `mcpServers`, hooks, or
`permissionMode: bypassPermissions`.

### Marketplaces

*"A marketplace is a git repository (or a local folder) that lists a set of plugins."* The index is
`.grok-plugin/marketplace.json`; `.grok-plugin/plugin.json` and the `.claude-plugin/` equivalents are
also accepted. Sources are declared in `config.toml` under `[[marketplace.sources]]`, or in
`~/.grok/settings.json` **or** `~/.claude/settings.json`.

**The index names the marketplace and lists its plugins**, each with a `source` in one of two shapes:
`{ "type": "local", "path": "./plugins/gdrive" }` — *"the plain string `"./plugins/gdrive"` also
works"* — or `{ "source": "url", "url": "…", "sha": "<full commit sha>" }`. Optional per-plugin fields:
`version`, `author`, `homepage`, `tags`, `keywords`. A second file, `plugin-index.json`, is a
**display-only catalog**: *"It is for display only, installs work without it, and teams usually
generate it in CI."*

**Pinning:** `[marketplace] require_sha = true` (or `GROK_MARKETPLACE_REQUIRE_SHA=1`) *"refuses any
remote plugin install or update that is not pinned to a full commit sha."* Both are tighten-only:
*"neither turns it back off."*

**Two sections disagree about which file carries the `sha`.** §Write the index puts it on a plugin's
`source` object inside `marketplace.json`. §Require pinned versions says *"Publish `sha` values in your
marketplace's `plugin-index.json` so installs from it satisfy the rule"*, and repeats it for vendored
plugins. Both read directly on 2026-09-08; the schema shown for `plugin-index.json` in §Add a catalog
contains no `sha` field. Recorded, not resolved.

`[marketplace] plugin_auto_update = false` is likewise tighten-only, and is called out as **the one
key with no foreign counterpart**: *"This global pin is Grok's own key with no Claude counterpart."*

`pager.toml`'s `disable_plugins = true` hides the plugins and hooks interface entirely.

---

## 3. Organization policy over plugins and MCP

The native-versus-advisory split — which policy file binds which subjects — is in
[`01`](./01-build-harness-compatibility.md) §5. What follows is the mechanism regardless of source.

### `strict_known_marketplaces`

*"The key being **present** is what restricts: an empty list… a list whose every entry is unsupported,
or a key with the wrong type is a complete lockdown that refuses every add and install until it is
fixed. Leave the key out to leave marketplaces unrestricted."*

Honored entry shapes: `{ "source": "git", "url": "…" }` and `{ "source": "github", "repo":
"owner/repo" }`, canonicalized to `https://github.com/owner/repo.git`. *"`local` entries in the strict
list are dropped with a warning; they never allow anything."* Adding a local path while a strict list
binds is refused *"unless an **admin** `extraKnownMarketplaces` pin names that exact path. A pin from a
user-writable `~/.grok` layer cannot carve that exception."*

URL comparison *"folds case on the **scheme and host only**, and strips exactly one trailing `.git`
(`repo.git.git` is a different repo)."*

### MCP allow/deny entry fields

| Field | Matches |
|---|---|
| `serverUrl` / `server_url` | HTTP/SSE URL; `*` wildcards match host and path **separately** |
| `command` | *"stdio executable name, exact match on the configured command (not the rest of argv)"* |
| `serverCommand` / `server_command` | *"stdio argv, exact match on `[command, args…]`"* |
| `serverName` / `server_name` | config name on any transport; case-insensitive after spaces become `_`, and *"a `grok_com_` prefix on the runtime name is stripped"* |

**Allow entries are stricter than the format they borrow.** The scheme is *"literal or a bare `*`
(`*` matches the supported remote schemes, http and https, and nothing else); a scheme-less
`*.example.com/*` or a partial scheme glob such as Claude's `http*://` never matches and logs a
warning at startup."* Ports stay literal — *"a glob port such as Claude's `http://localhost:*/*` never
matches and logs a warning at startup — list each port."* **Deny entries** are broader by design:
*"match by host and path across every scheme and port… without a warning."*

**Misconfiguration locks down rather than failing open.** *"A policy key with the wrong type…, a key
written in both spellings with different values, an allow list whose every entry is unsupported, or a
deny entry that cannot be enforced… locks that file's MCP policy down: every server it binds is
blocked with the reason `locked down by policy (<file>)` until the file is fixed."* An unusable
**allow** entry only grants nothing. And: *"a present but empty list (`allowed_mcp_servers = []`)
blocks every server the file binds, so do not ship it as a scaffold."*

Two lockdown switches: `allowManagedMcpServersOnly = true` requires *"a positive allow-entry match…
even when the allow list is empty"*; `enableAllProjectMcpServers = false` *"drops project-scoped MCP
unless the server also matches an allow entry."*

---

## 4. MCP servers

*"An MCP server is a process that exposes tools to Grok over a standardized protocol."* stdio,
HTTP/SSE and streamable transports; OAuth is handled in-product — *"Grok opens a browser-based
authorization flow and stores the resulting tokens for future use."* `grok mcp add/remove/enable/doctor`
manages them; the four configuration sources and their merge order are in
[`01`](./01-build-harness-compatibility.md) §2.

**Per-server fields:** `command`, `args`, `env`, `enabled`, `startup_timeout_sec` (default 30),
`tool_timeout_sec` (default 6000), `tool_timeouts` (per-tool overrides).

**Output is capped and spilled, not truncated silently.** *"Large MCP / `use_tool` results are
truncated inline (full payload spilled under the session `mcp/` folder). Default is **20_000
bytes**."* Override precedence: *"requirements.toml > env > repo `.grok/config.toml` > user
`config.toml`"*, and *"the repo value applies only once the folder is trusted."*

Tools namespace as `server__tool`; that qualified name is what a hook matcher must test
([`03`](./03-build-hooks.md) §3), and what a `MCPTool(server__tool)` permission rule matches
([`04`](./04-build-permissions-and-sandbox.md) §2).

`grok inspect` lists every loaded server with its vendor origin.

---

## 5. What is not documented

- **No signature or provenance check on plugin contents.** `require_sha` pins a commit; nothing
  verifies who authored it. Checked UG/09 in full, UG/08, `SECURITY.md`.
- **No stated cap** on skill count, plugin count, or MCP server count. Checked UG/07, UG/08, UG/09,
  UG/26.
- **No stated behaviour when `require_sha` is on and a marketplace's `sha` values are absent.** The
  rule refuses the install; whether an already-installed unpinned plugin is disabled at the next
  session start is not said. Checked UG/09 §Require pinned versions, §Turn off session-start plugin
  auto-update, UG/26 §`marketplace`.
