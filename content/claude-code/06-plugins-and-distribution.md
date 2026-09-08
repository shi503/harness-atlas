---
status: DRAFT
title: "Plugins and distribution"
tier: reference
project: harness-atlas
source: "https://code.claude.com/docs/en/plugins, /plugins-reference, /plugin-marketplaces, /plugin-dependencies"
source_verified: "2026-08-10"
---

# Plugins and distribution

> **Drafted 2026-08-10 by `claude-opus-5`, not yet verified.** Attested, not captured — see [`00-README.md`](./00-README.md).

A plugin is a self-contained directory bundling skills, agents, hooks, MCP servers, LSP servers,
workflows, output styles, themes, monitors, channels, and executables. A marketplace is a catalog
that distributes plugins with version tracking, SHA pinning, and automatic updates.

**This is the packaging layer.** Everything else in this reference set describes a capability; this
describes how a capability travels between repositories and teams.

---

## Standalone vs plugin

| Approach | Skill names | Best for |
|---|---|---|
| Standalone (`.claude/`) | `/hello` | Personal workflows, project-specific customization, experiments |
| Plugin | `/plugin-name:hello` | Sharing with teammates, community distribution, **versioned releases**, reuse across projects |

Documented advice: start standalone in `.claude/` for iteration, convert to a plugin when ready to
share.

---

## Directory structure

```text
my-plugin/
├── .claude-plugin/
│   └── plugin.json      # manifest — the ONLY thing that goes in .claude-plugin/
├── skills/              # <name>/SKILL.md directories
├── commands/            # flat .md skill files (legacy shape; use skills/ for new work)
├── agents/              # subagent definitions
├── hooks/
│   └── hooks.json
├── workflows/           # dynamic workflow scripts
├── output-styles/
├── monitors/
│   └── monitors.json
├── themes/
├── bin/                 # executables added to the Bash tool's PATH while enabled
├── settings.json        # default settings applied when enabled
├── .mcp.json
└── .lsp.json
```

> **The most common mistake:** putting `commands/`, `agents/`, `skills/`, or `hooks/` *inside*
> `.claude-plugin/`. Only `plugin.json` goes there; everything else sits at the plugin root. The
> plugin root is the individual plugin's own directory — **never** `~/.claude/`.

A plugin shipping exactly one skill can put `SKILL.md` at the plugin root. **Set the frontmatter
`name`** — without it, Claude Code falls back to the install directory name, which for
marketplace-installed plugins is a version string that changes on every update.

### Component notes

- **Agents** support `name`, `description`, `model`, `effort`, `maxTurns`, `tools`,
  `disallowedTools`, `skills`, `memory`, `background`, and `isolation` (only valid value:
  `"worktree"`). **`hooks`, `mcpServers`, and `permissionMode` are not supported** for security.
- **Hooks** that target the plugin's own bundled MCP server must use scoped names: tool matchers and
  `if` fields take `mcp__plugin_<plugin-name>_<server-name>__<tool>`; an `mcp_tool` hook's `server`
  field takes `plugin:<plugin-name>:<server-name>`. A matcher on the bare server key never fires.
- **MCP servers** start automatically when the plugin is enabled. `/reload-plugins` keeps live
  connections for servers whose configuration is unchanged.
- **Monitors** (experimental) run a shell command for the session's lifetime and deliver every stdout
  line to Claude as a notification — so Claude reacts to log entries or polled events without being
  asked to start the watch. Interactive CLI sessions only; **unsandboxed, at the same trust level as
  hooks**. Fields: `name` (unique within the plugin, prevents duplicate processes), `command`,
  `description`, `when` (e.g. `on-skill-invoke:debug`).
- **`settings.json`** at the plugin root currently supports only `agent` and `subagentStatusLine`.
  Setting `agent` activates one of the plugin's agents as the **main thread** — a plugin can change
  how Claude Code behaves by default when enabled. It takes priority over `settings` in
  `plugin.json`; unknown keys are silently ignored.

---

## `plugin.json` schema

The manifest is **optional**. Without it, components auto-discover in default locations and the name
comes from the directory. Use one when you need metadata or custom paths.

```json
{
  "name": "plugin-name",
  "displayName": "Plugin Name",
  "version": "1.2.0",
  "description": "Brief plugin description",
  "author": { "name": "Author Name", "email": "author@example.com", "url": "https://..." },
  "homepage": "https://docs.example.com/plugin",
  "repository": "https://github.com/author/plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"],
  "metadata": { "catalogId": "cat-123", "tier": "pro" },
  "skills": "./custom/skills/",
  "commands": ["./custom/commands/special.md"],
  "agents": ["./custom/agents/reviewer.md"],
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json",
  "outputStyles": "./styles/",
  "lspServers": "./.lsp.json",
  "experimental": { "themes": "./themes/", "monitors": "./monitors.json" },
  "dependencies": ["helper-lib", { "name": "secrets-vault", "version": "~2.1.0" }]
}
```

**`name` is the only required field.** It namespaces every component.

### Fields worth knowing

| Field | Notes |
|---|---|
| `version` | Semantic version. **Setting it pins the plugin to that string — users only receive updates when you bump it.** If also set in the marketplace entry, `plugin.json` wins |
| `displayName` | UI label; may contain spaces. Not used for namespacing (v2.1.143+) |
| `metadata` | Free-form object for your own catalog/entitlement data. Claude Code never reads it (v2.1.222+ treats it as recognized) |
| `defaultEnabled` | `false` ships a plugin that installs **disabled** until the user opts in (v2.1.154+). Overridden by a user's `enabledPlugins` entry, and by a dependency requirement |
| `dependencies` | Other plugins required, optionally with semver constraints |
| `userConfig` | Values Claude Code prompts for at enable time, with `type`, `title`, `description`, and `sensitive` — so users never hand-edit `settings.json` for a token |

**Component path fields** are `string \| array` and mostly **replace** the default scan. The
exception: `skills` **adds to** the default `skills/` scan rather than replacing it.

### Validation

```bash
claude plugin validate ./my-plugin
claude plugin validate ./my-plugin --strict    # treat warnings as errors — use in CI
```

Unrecognized top-level fields are **ignored at load** and reported as warnings, not errors — so one
manifest can double as a VS Code/Cursor extension manifest, an npm `package.json`, or an MCPB/DXT
bundle manifest. A field one or two characters off a recognized one gets a "did you mean" warning. A
plugin with only unrecognized-field warnings still loads.

Wrong *types* behave differently: most fields fail the load (a `keywords` string instead of an array
is a load error), but `experimental` and `metadata` with non-object values are ignored with a warning.

---

## `marketplace.json` schema

Lives at `.claude-plugin/marketplace.json` in the repository root.

```json
{
  "name": "company-tools",
  "owner": { "name": "DevTools Team", "email": "devtools@example.com" },
  "plugins": [
    {
      "name": "code-formatter",
      "source": "./plugins/formatter",
      "description": "Automatic code formatting on save",
      "version": "2.1.0",
      "author": { "name": "DevTools Team" }
    },
    {
      "name": "deployment-tools",
      "source": { "source": "github", "repo": "company/deploy-plugin" },
      "description": "Deployment automation tools"
    }
  ]
}
```

**Required:** `name` (kebab-case, public-facing — users type `/plugin install x@your-marketplace`),
`owner` (`name` required; `email`, `url` optional), `plugins`.

**Optional:**

| Field | Purpose |
|---|---|
| `description`, `version` | Also accepted under `metadata` for backward compatibility |
| `metadata.pluginRoot` | Base directory prepended to relative sources — lets you write `"source": "formatter"` instead of `"./plugins/formatter"` |
| `allowCrossMarketplaceDependenciesOn` | Other marketplaces this one's plugins may depend on. Anything else is blocked at install |
| `renames` | Map from a former plugin `name` to its current name, or `null` if removed — existing users migrate automatically (v2.1.193+) |

**Each user can register only one marketplace per name** — adding a second with the same name
replaces the first. To publish multiple plugins under one name, list them all in a single
`marketplace.json`.

A set of names is **reserved for Anthropic** (`claude-plugins-official`, `anthropic-marketplace`,
`agent-skills`, `first-party-plugins`, `healthcare`, and others), as are names impersonating official
sources. Reserved names are re-checked on **every load**, not only on add.

### Plugin entry fields

Any field from the plugin manifest schema, plus marketplace-specific ones: `source`, `category`,
`tags`, `strict`, `relevance`, `defaultEnabled`.

- `strict` (default `true`) — whether `plugin.json` is the authority for component definitions.
- `relevance` — signals telling Claude Code when to suggest this plugin. **Only takes effect for
  marketplaces an administrator allowlists in managed settings** (v2.1.152+).

---

## Plugin sources and pinning

| Source | Type | Fields | Notes |
|---|---|---|---|
| Relative path | `string` (`"./my-plugin"`) | — | Must start with `./`. Resolved from the **marketplace root**, not `.claude-plugin/` |
| `github` | object | `repo`, `ref?`, `sha?` | |
| `url` | object | `url`, `ref?`, `sha?` | Git URL |
| `git-subdir` | object | `url`, `path`, `ref?`, `sha?` | Sparse clone — minimizes bandwidth for monorepos |
| `npm` | object | `package`, `version?`, `registry?` | Installed via `npm install` |
| `archive` | object | `url`, `sha256?` | HTTPS zip. Works without git or npm (v2.1.224+) |

**When both `ref` and `sha` are set, the `sha` is the effective pin** and Claude Code checks out that
commit directly. On most hosts installation then succeeds even if the branch or tag was deleted, as
long as the commit is reachable. Some servers (AWS CodeCommit) cannot fetch by SHA — there the `ref`
must still exist.

> **Marketplace source ≠ plugin source.** The *marketplace* source says where to fetch
> `marketplace.json` and supports `ref` but **not** `sha`. The *plugin* source says where to fetch
> one plugin and supports **both**. They point at different repositories and pin independently.

After fetching, plugins are copied into the local versioned cache at `~/.claude/plugins/cache`.

**Relative paths do not resolve** when a user adds the marketplace via a direct URL to
`marketplace.json`, because only that file is downloaded. For URL-based distribution use github,
npm, git URL, or archive sources.

---

## Development workflow

```bash
claude plugin init my-tool                 # scaffolds ~/.claude/skills/my-tool/ as a skills-dir plugin
claude --plugin-dir ./my-plugin            # load locally for testing (also accepts a .zip)
claude --plugin-dir ./a --plugin-dir ./b   # multiple
claude --plugin-url https://example.com/my-plugin.zip   # fetch an archive for this session only
claude plugin validate ./my-plugin --strict
```

- `/reload-plugins` picks up changes mid-session — plugins, skills, agents, hooks, plugin MCP
  servers, plugin LSP servers. (The skills count in the summary only covers `commands/` directories,
  so it can report `0 skills` even when a skill reloaded.)
- A `--plugin-dir` plugin with the same name as an installed one **takes precedence for that
  session** — you can test changes without uninstalling. The exception is plugins managed settings
  force-enable or force-disable.
- **Skills-directory plugins**: add `.claude-plugin/plugin.json` to a skill folder and it loads as
  a plugin named `<name>@skills-dir` with no marketplace or install step, so it can bundle agents,
  hooks, and MCP servers. In a project's `.claude/skills/` this requires accepting the workspace
  trust dialog.

### Migrating standalone config to a plugin

```bash
mkdir -p my-plugin/.claude-plugin
cp -r .claude/commands my-plugin/
cp -r .claude/agents   my-plugin/
cp -r .claude/skills   my-plugin/
mkdir my-plugin/hooks   # then move the `hooks` object from settings.json into hooks/hooks.json
```

| Standalone | Plugin |
|---|---|
| One project only | Shareable via marketplaces |
| `.claude/commands/` | `plugin-name/commands/` |
| Hooks in `settings.json` | Hooks in `hooks/hooks.json` |
| Manual copy to share | `/plugin install` |

**After migrating, remove the originals.** Project and user `.claude/agents/` definitions **override
same-named plugin agents**, so the plugin version only takes effect once the originals are gone.
Plugin *skills* are namespaced, so both remain available rather than one overriding the other.

---

## Enterprise and private distribution

| Setting | Effect |
|---|---|
| `enabledPlugins` | `[{"marketplace": "...", "plugin": "..."}]` |
| `disabledPlugins` | Same shape |
| `extraKnownMarketplaces` | Additional marketplace sources beyond the defaults |
| `blockedMarketplaces` | (Managed) Blocklist, checked **before download** so blocked sources never touch the filesystem |
| `strictKnownMarketplaces` | (Managed) Only allow plugins from listed marketplaces; restricts sideload flags |
| `disableSideloadFlags` | (Managed) Reject `--plugin-dir`, `--plugin-url`, `--agents`, `--mcp-config` at startup (v2.1.193+) |
| `pluginTrustMessage` | (Managed) Custom message appended to the plugin trust warning |
| `strictPluginOnlyCustomization` | (Managed) **Block skills, agents, hooks, and MCP servers from user and project sources entirely** — they may come only from plugins or managed settings. `true` locks all four; an array such as `["skills","hooks"]` locks only those |

To enable a plugin for everyone in a repository rather than per-developer, add it to the
`enabledPlugins` **project** setting. Repo-declared plugins install at cloud-session start; plugins
enabled only in user settings do not transfer to cloud sessions.

**Organization sync** (Team/Enterprise, via Organization settings → Plugins) has narrower source
rules: the marketplace repository must be private or internal, `npm` and `archive` sources are **not**
supported, and only two kinds of private plugin source work — a github.com source sharing the
marketplace repo's owner, or a source on your GitHub Enterprise host with the GHE App installed. For
private plugins, put the folders **inside** the marketplace repository and reference them by relative
path; organization sync packages each plugin during distribution.
