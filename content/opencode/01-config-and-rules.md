---
status: DRAFT
title: "The configuration chain and AGENTS.md"
tier: reference
project: harness-atlas
source: "https://opencode.ai/docs/config · https://opencode.ai/docs/rules · anomalyco/opencode packages/opencode/src/config/config.ts"
version_at_capture: "v1.18.29"
source_verified: "2026-09-08"
---

# The configuration chain and `AGENTS.md`

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `opencode.ai/docs` and `anomalyco/opencode` at **v1.18.29**, **2026-09-08**.

Two mechanisms with opposite resolution rules. **`opencode.json` merges** — *"Configuration files are
**merged together**, not replaced"* — so every source in the chain contributes and later sources win
only on conflicting keys. **`AGENTS.md` selects** — *"The first matching file wins in each
category."* Confusing them is the common mistake: adding a project `opencode.json` adds to what the
global one said, but adding a project `AGENTS.md` suppresses the `CLAUDE.md` beside it.

---

## 1. The numbered chain, and what sits outside it

`/docs/config#precedence-order` lists **eight** sources, *"loaded in this order (later sources
override earlier ones)"*:

| # | Source | Where |
|---|---|---|
| 1 | **Remote config** | `.well-known/opencode` — *"organizational defaults"*, fetched *"when you authenticate with a provider that supports it"* |
| 2 | **Global config** | `~/.config/opencode/opencode.json` |
| 3 | **Custom config** | the `OPENCODE_CONFIG` env var |
| 4 | **Project config** | `opencode.json` in the project |
| 5 | **`.opencode` directories** | *"agents, commands, plugins"* |
| 6 | **Inline config** | the `OPENCODE_CONFIG_CONTENT` env var |
| 7 | **Managed config files** | `/Library/Application Support/opencode/` · `/etc/opencode/` · `%ProgramData%\opencode` |
| 8 | **macOS managed preferences** | a `.mobileconfig` via MDM — *"highest priority, not user-overridable"* |

**Three more loading points are documented or implemented outside that list**, which is why a count
of the chain depends on where you draw its edge:

- **`OPENCODE_CONFIG_DIR`** has its own section on the same page: a directory *"searched for agents,
  commands, modes, and plugins just like the standard `.opencode` directory"*, and *"loaded after the
  global config and `.opencode` directories, so it **can override** their settings."* In
  `config.ts` it is iterated inside the same directory loop as `.opencode`, alongside rung 5.
- **An active-organisation config** is fetched from `<account url>/api/config` between rungs 6 and 7
  (`Config.loadActiveOrgConfig` in `config.ts`), when the signed-in account has an
  `active_org_id`. **It is not named in the precedence list** — checked `/docs/config/`,
  `/docs/enterprise/` and `/docs/providers/`.
- **`OPENCODE_PERMISSION`**, *"Inlined json permissions config"* — see [§4](#4-two-inputs-the-chain-does-not-list).

### Merge semantics

`mergeConfigConcatArrays` in `config.ts` deep-merges, with **one array treated specially**:
`instructions` is unioned across sources (`Array.from(new Set([...target, ...source]))`). Every other
array-valued key follows the deep merge and is replaced by the later source rather than concatenated.

### Directory names

*"The `.opencode` and `~/.config/opencode` directories use **plural names** for subdirectories:
`agents/`, `commands/`, `modes/`, `plugins/`, `skills/`, `tools/`, and `themes/`. Singular names
(e.g., `agent/`) are also supported for backwards compatibility."*

`modes/` is still loaded — `ConfigAgent.loadMode(dir)` runs beside `ConfigAgent.load(dir)`, and every
entry under a `mode` key is folded into `agent` with `mode: "primary"` forced. The `mode` config key
is marked `@deprecated Use \`agent\` field instead` in the schema, and `/docs/modes/` returns **404**
(checked 2026-09-08).

---

## 2. Managed settings and MDM

**File-based.** An `opencode.json` or `opencode.jsonc` in the platform's managed directory. *"These
directories require admin/root access to write, so users cannot modify them."*

**macOS managed preferences.** OpenCode reads the `ai.opencode.managed` preference domain, checking
`/Library/Managed Preferences/<user>/ai.opencode.managed.plist` then
`/Library/Managed Preferences/ai.opencode.managed.plist`. *"The plist keys map directly to
`opencode.json` fields. MDM metadata keys (`PayloadUUID`, `PayloadType`, etc.) are stripped
automatically."* Deployment paths given: Jamf Pro configuration profiles, and FleetDM under
`mdm.macos_settings.custom_settings`.

**Verification** is `opencode debug config`: *"All managed preference keys appear in the resolved
config and cannot be overridden by user or project configuration."* The CLI reference's `debug`
entry says only *"Debugging and troubleshooting tools"* and does not name the `config` subcommand.

---

## 3. Substitution

Two forms, applied inside config files:

| Form | Behaviour |
|---|---|
| `{env:VARIABLE_NAME}` | *"If the environment variable is not set, it will be replaced with an empty string."* |
| `{file:path/to/file}` | Path is relative to the config file's directory, or absolute starting `/` or `~` |

---

## 4. Two inputs the chain does not list

**`OPENCODE_PERMISSION`.** The CLI reference's environment table describes it as *"Inlined json
permissions config"*. It appears on no other documentation page — checked `/docs/permissions/`,
`/docs/config/` and the published `config.json` schema, which has no corresponding key. In
`config.ts` it is applied after the macOS managed-preferences merge:

```ts
result.permission = mergeDeep(result.permission ?? {}, JSON.parse(Flag.OPENCODE_PERMISSION))
```

`mergeDeep(target, source)` gives the source precedence, so at this version the variable's contents
merge over the already-resolved permission block, including the block contributed by rung 8. The
configuration page states of rung 8 that it is *"not user-overridable"*. **Both are recorded as
read; neither is adjudicated here.**

**`OPENCODE_DISABLE_PROJECT_CONFIG`.** `config.ts` skips the whole project-config step when this is
set. It is **not documented** — checked the CLI reference's environment-variable table, its
experimental table, and `/docs/config/`.

---

## 5. `AGENTS.md` — the rules chain

*"You can provide custom instructions to opencode by creating an `AGENTS.md` file."*

**Resolution order**, verbatim from `/docs/rules#precedence`:

1. *"**Local files** by traversing up from the current directory (`AGENTS.md`, `CLAUDE.md`)"*
2. *"**Global file** at `~/.config/opencode/AGENTS.md`"*
3. *"**Claude Code file** at `~/.claude/CLAUDE.md` (unless disabled)"*

*"The first matching file wins in each category."* So `AGENTS.md` and `CLAUDE.md` in the same project
are not layered — the second is simply unused.

**Compatibility switches**, all three documented on the rules page:

| Variable | Disables |
|---|---|
| `OPENCODE_DISABLE_CLAUDE_CODE` | all `.claude` support |
| `OPENCODE_DISABLE_CLAUDE_CODE_PROMPT` | only `~/.claude/CLAUDE.md` |
| `OPENCODE_DISABLE_CLAUDE_CODE_SKILLS` | only `.claude/skills` |

**`instructions`** is the additive path: an array of *"paths and glob patterns"* that also accepts
remote URLs, *"fetched with a 5 second timeout"*. It is the one config array unioned rather than
overwritten across the chain (§1). *"All instruction files are combined with your `AGENTS.md` files."*

**No automatic reference expansion.** *"While opencode doesn't automatically parse file references in
`AGENTS.md`"* — the docs' workaround is prose instructing the model to read `@`-referenced files with
its `read` tool, which is model compliance rather than a loader.

**`/init`** *"scans the important files in your repo, may ask a couple of targeted questions when the
codebase cannot answer them, and then creates or updates `AGENTS.md`"*, and *"will improve it in
place instead of blindly replacing it"* when one exists.
