---
status: DRAFT
title: "Resources, scope, and project trust"
tier: reference
project: harness-atlas
source: "earendil-works/pi @ v0.85.1 · docs/{skills,prompt-templates,themes,packages,settings,security,extensions}.md"
version_at_capture: "v0.85.1"
source_verified: "2026-09-08"
---

# Resources, scope, and project trust

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `packages/coding-agent/docs/` at **v0.85.1**, **2026-09-08**.

Pi has **four resource types** — extension, skill, prompt template, theme — and a fifth container, the
**pi package**, that bundles all four. Each type documents its own locations on its own page, in the
same five-bullet shape, and none of the pages carries the other three. The gate that decides whether
half of those locations load at all is on a sixth page. This assembles them.

---

## 1. The four types × six sources

| Source | Extension | Skill | Prompt template | Theme |
|---|---|---|---|---|
| **Built-in** | — | — | — | `dark`, `light` |
| **Global** | `~/.pi/agent/extensions/*.ts` and `*/index.ts` | `~/.pi/agent/skills/` and `~/.agents/skills/` | `~/.pi/agent/prompts/*.md` | `~/.pi/agent/themes/*.json` |
| **Project** *(trust-gated)* | `.pi/extensions/*.ts` and `*/index.ts` | `.pi/skills/` and `.agents/skills/` in cwd **and ancestors** *"up to git repo root, or filesystem root when not in a repo"* | `.pi/prompts/*.md` | `.pi/themes/*.json` |
| **Package** | `extensions/` dir or `pi.extensions` in `package.json` | `skills/` dir or `pi.skills` | `prompts/` dir or `pi.prompts` | `themes/` dir or `pi.themes` |
| **Settings array** | `extensions` | `skills` | `prompts` | `themes` |
| **CLI** | `-e` / `--extension <path\|npm:\|git:>` | `--skill <path>` | `--prompt-template <path>` | `--theme <path>` |
| **Disable discovery** | `--no-extensions` | `--no-skills` | `--no-prompt-templates` | `--no-themes` |

All four CLI flags are repeatable. `--skill` is *"additive even with `--no-skills`"*; the pattern the
docs give generally is *"Combine `--no-*` with explicit flags to load exactly what you need, ignoring
`settings.json`."*

**Settings arrays resolve relative to their own file** — paths in `~/.pi/agent/settings.json` against
`~/.pi/agent`, paths in `.pi/settings.json` against `.pi`. Absolute and `~` paths work. All four arrays
accept globs, `!pattern` to exclude, `+path` to force-include an exact path and `-path` to force-exclude
one.

**Skills carry discovery rules the other three do not**, because — in `DOCS/skills.md`'s words — *"Pi
implements the Agent Skills standard, warning about most violations but remaining lenient"*:

- in `~/.pi/agent/skills/` and `.pi/skills/`, a root `.md` file is a skill only if it has *"valid skill
  frontmatter with a non-empty `description`"*
- in **all** locations, directories containing `SKILL.md` are found recursively
- in `~/.agents/skills/` and project `.agents/skills/`, root `.md` files are **ignored**; nested `.md`
  files inside grouping folders are found if they declare skill frontmatter
- *"Root Markdown files other than `SKILL.md` that do not look like skills are ignored silently"*

`enableSkillCommands` (default `true`) registers each skill as a `/skill:name` command.

**A fifth, example-supplied type sits beside these.** The `subagent/` example adds
`~/.pi/agent/agents/*.md` and `.pi/agents/*.md` with its own scope switch (`agentScope`) and its own
confirmation (`confirmProjectAgents`) — see [`01-the-refusals.md`](./01-the-refusals.md) §4. It is not
part of the core resource model: `DOCS/packages.md` scopes `pi config` to *"extensions, skills, prompt
templates, and themes"*, and agents are named on no resource page. Checked `DOCS/packages.md`,
`DOCS/settings.md` §Resources, `DOCS/index.md`; the only source for them is `EX/subagent/README.md`.

---

## 2. What project trust gates, and what it does not

*"Project trust controls whether pi loads project-local settings, resources, packages, and extensions.
It is not a sandbox and it does not restrict what the model can ask tools to do after you start
working in a directory."*

**Trust is triggered by presence.** Pi considers a project to require trust when it finds any of:
`.pi/settings.json`; `.pi/extensions`, `.pi/skills`, `.pi/prompts` or `.pi/themes`; `.pi/SYSTEM.md` or
`.pi/APPEND_SYSTEM.md`; project `.agents/skills` in cwd or an ancestor. *"A bare `.pi` directory does
not count."*

| Loaded **only after** trust | Loaded **regardless** of trust |
|---|---|
| `.pi/settings.json` | `AGENTS.override.md`, `AGENTS.md`, `CLAUDE.md` — *"unless context loading is disabled"* |
| `.pi` extensions, skills, prompt templates, themes | User/global extensions |
| `.pi/SYSTEM.md`, `.pi/APPEND_SYSTEM.md` | CLI `-e` extensions |
| *"missing project packages configured through project settings"* | |
| project-local and project package-managed extensions | |

**Context files are the notable exception.** `AGENTS.md` and `CLAUDE.md` load from an untrusted
repository. Disabling that is `--no-context-files` / `-nc`, not a trust decision.

**And the vendor bounds the gate itself:** *"Project trust is only an input-loading guard. It prevents
a repository from silently changing pi's settings or extensions before you approve it. It does not make
untrusted code, untrusted prompts, or untrusted model output safe. Prompt injection from repository
files, comments, documentation, context files, or build output is expected local-agent risk and cannot
be reliably prevented by pi."*

---

## 3. How the trust decision resolves

In order, first answer wins:

1. **A `project_trust` handler** from a user/global or CLI `-e` extension returning `"yes"` or `"no"`.
   *"The first extension that returns a yes/no decision owns the decision"* and it suppresses the
   built-in prompt. `"undecided"` passes to the next handler.
2. **A saved decision** in `~/.pi/agent/trust.json`, keyed by canonical directory. *"The closest saved
   decision on the current or parent path applies before the global default."*
3. **`defaultProjectTrust`** in global settings, default `"ask"`. `"ask"` prompts when UI is available.

`remember: true` on a handler's decision persists it; otherwise it holds for the process only.
`/trust` is the interactive surface.

**Non-interactive modes never prompt.** In `-p`, `--mode json` and `--mode rpc`, with no applicable
saved decision, `"ask"` and `"never"` both **ignore** protected resources and `"always"` trusts them.
`--approve` / `-a` and `--no-approve` / `-na` override for one run.

**Trust is re-resolved on session replacement.** `project_trust` fires again when `/resume` enters a
cwd *"whose trust has not been resolved in the current process."*

---

## 4. Packages — filtering, scope, and what updates

A pi package is an npm package with a `"pi"` key in `package.json` and the keyword `pi-package`, or —
with no manifest — four convention directories: `extensions/` (`.ts`, `.js`), `skills/` (recursive
`SKILL.md` folders plus top-level `.md`), `prompts/` (`.md`), `themes/` (`.json`). Manifest globs
support `!exclusions`, discover *"visible paths in lexical order"*, and require dot-prefixed and
symlinked paths to be listed directly.

**Three source types**, each with a global and a project install root:

| Source | Global | Project (`-l`) | Update behaviour |
|---|---|---|---|
| `npm:pkg[@ver]` | `~/.pi/agent/npm/` | `.pi/npm/` | **A versioned spec is pinned and skipped** by `pi update --extensions` / `--all` |
| `git:host/user/repo[@ref]`, `https://`, `ssh://`, `git://` | `~/.pi/agent/git/<host>/<path>` | `.pi/git/<host>/<path>` | **Refs are pinned** and not moved forward; an existing clone *is* reconciled to the configured ref, resetting and cleaning it and re-running `npm install` |
| local path | in settings, **not copied** | relative paths resolve against the settings file | — |

`pi install`, `pi remove`, `pi list`, `pi update [--all\|--extensions\|--models\|--self\|--force]`.
`-e npm:…` installs *"to a temporary directory for the current run only"*. `npmCommand` pins lookups
to a wrapper such as `mise` or `asdf`.

**Filtering narrows, never widens.** The object form in `packages` takes a per-type array:

- omit a key → load all of that type; `[]` → load none
- `!pattern` excludes; `+path` force-includes an exact path; `-path` force-excludes one
- *"Filters layer on top of the manifest. They narrow down what is already allowed."*

**Deduplication across scopes.** A package listed in both global and project settings resolves to the
**project** entry — *"unless the project entry has `autoload: false`, in which case it is applied as a
delta over the global entry."* Identity is the npm package name, the git URL without its ref, or the
resolved absolute path.

**Dependency rule.** Four packages are bundled by Pi and must be `peerDependencies` at `"*"`:
`@earendil-works/pi-ai`, `@earendil-works/pi-agent-core`, `@earendil-works/pi-coding-agent`,
`@earendil-works/pi-tui`, plus `typebox`. Other pi packages must be `bundledDependencies` and referenced
through `node_modules/` paths — *"Pi loads packages with separate module roots, so separate installs do
not collide or share modules."*

**The gallery is npm search plus a site.** `pi.dev/packages` displays anything keyworded `pi-package`,
with optional `video` (MP4, autoplays on hover) or `image` (PNG/JPEG/GIF/WebP) preview fields; video
wins if both are set. **It listed `5536` on 2026-09-08.** The profile records `5,618` at its
2026-09-02 read; both are stated rather than reconciled.

---

## 5. Settings merge, and the two keys that do not

*"Project settings (`.pi/settings.json`) override global settings. Nested objects are merged"* — a
project `compaction.reserveTokens` replaces only that leaf, leaving sibling keys from global intact.

`pi config` is the TUI for enabling and disabling individual resources from installed packages and
local directories. It *"starts in global settings … press Tab to switch between global and
project-local modes"*; `pi config -l` starts in project overrides *"with inherited global resources
dimmed."*

---

## 6. What the documentation does not state

- **No single resolution-order rule across the six sources.** Each page lists its own locations; no
  page says what happens when a global directory, a package and a settings array all supply a resource
  of the same name. Deduplication is documented for *packages* only (§4). Checked:
  `DOCS/settings.md` §Resources, `DOCS/packages.md` §Scope and Deduplication, `DOCS/skills.md`,
  `DOCS/prompt-templates.md`, `DOCS/themes.md`, `DOCS/extensions.md` §Extension Locations.
- **No per-resource signing, checksum or provenance mechanism.** The stated control is review before
  install — *"Pi packages run with full system access. Extensions execute arbitrary code, and skills can
  instruct the model to perform any action including running executables. Review source code before
  installing third-party packages."* Checked: `DOCS/packages.md`, `DOCS/security.md`, `REPO/SECURITY.md`
  reference in `DOCS/security.md`. The supply-chain hardening in `REPO/README.md` governs Pi's **own**
  dependencies, not the packages an operator installs.
