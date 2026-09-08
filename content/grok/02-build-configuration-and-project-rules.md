---
status: DRAFT
title: "Grok Build — configuration and project rules"
tier: reference
project: harness-atlas
product: "Grok Build"
source: "xai-org/grok-build @ 7581004 — user-guide 05, 12, 26"
version_at_capture: "commit 7581004 (SOURCE_REV eb4a894), no tags"
source_verified: "2026-09-08"
---

# Grok Build — configuration and project rules

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**Product: Grok Build**, the Apache-2.0 Rust runtime. **Grok Bot has no configuration files at all** —
its equivalents are a Bot's description and dashboard-set team rules; see
[`11`](./11-bot-approvals-security-and-teams.md) §1.

Read against `xai-org/grok-build` at commit `7581004`, **2026-09-08**. No tags exist.

Two motions run in opposite directions here, as they do in most harnesses: **configuration resolves
down through layers**, and **instructions accumulate up through directories**. Only the first is
mechanical.

---

## 1. Three files, three authors

UG/26 §How to configure, verbatim: *"Three files configure Grok Build, and they are written by
different people."*

| File | Who writes it | Where | Purpose, in the vendor's words |
|---|---|---|---|
| `config.toml` | *"The developer"* | `~/.grok/config.toml`, and `.grok/config.toml` in a project | *"Set personal defaults. Anything here can be changed by the person using the machine."* |
| `managed_config.toml` | *"You, through the console or a deployment tool"* | `/etc/grok/managed_config.toml` (and `$GROK_HOME/`) | *"Ship a starting point to a fleet. A developer's own file overrides it."* |
| `requirements.toml` | *"You, signed"* | `/etc/grok/requirements.toml`, or macOS MDM `ai.x.grok` | *"Set values a developer cannot change."* |

**The guidance is stated as a choice, not a hierarchy:** *"Choose `managed_config.toml` for defaults
you want people to be able to adjust, and `requirements.toml` for the ones you do not."*

---

## 2. The layer chain — and a discrepancy between the two pages that document it

**UG/26 lists eight layers, later winning:**

1. Compiled defaults.
2. `/etc/grok/managed_config.toml`, then `$GROK_HOME/managed_config.toml`.
3. `$GROK_HOME/config.toml` — *"`/settings` writes here."*
4. **Project `.grok/config.toml`** — *"only `[mcp_servers]`, `[plugins]`, `[permission]`, and
   `[mcp] max_output_bytes`."*
5. `GROK_CONFIG` (inline JSON) or `GROK_CONFIG_PATH` — *"Allowlisted keys only."*
6. `$GROK_HOME/requirements.toml`, then `/etc/grok/requirements.toml`, then macOS MDM `ai.x.grok`.
7. `GROK_*` environment variables.
8. CLI flags.

**UG/05 §Precedence lists seven, highest first**, and omits the project layer entirely: CLI flags →
environment variables → `requirements.toml`/MDM → `GROK_CONFIG` overlay → `config.toml` →
`managed_config.toml` → built-in defaults.

**Both were read directly on 2026-09-08.** The orders agree where they overlap; UG/26 additionally
names the project layer and its four-section restriction, which UG/05's list does not mention. A
reader who needs to know whether a project file can set a key should use UG/26's list — but which page
is authoritative is not stated on either.

**Per-key resolution is finer than the chain.** Every row of UG/26's `config.toml` tables carries two
extra columns: **Requirements** (`pin` = cannot be overridden *"including env and CLI where the
resolver honors the pin"*; `yes` = accepted in that file; `—` = not read from it) and **Managed**
(`fleet` = the fleet value stands; `user` = the user's file wins; `—` = the file is ignored). So the
chain describes the default motion and the table overrides it key by key.

### Three keys that exist only in `requirements.toml`

| Key | Type | Details |
|---|---|---|
| `fail_closed` | `boolean` (default `false`) | *"Refuse to start when signed requirements or version_overrides cannot be applied."* |
| `features.image_edit` | `boolean` | *"Requirements only; a user-file entry is unrecognized."* |
| `ui.disable_bypass_permissions_mode` | `boolean` | *"Lock always-approve off. The lock is enforced only from a requirements layer; true in user or managed files is ignored."* |

**The silent-failure case is documented.** *"`requirements.toml` is missing or its signature does not
verify → The pins do not apply, and Grok Build starts without them."* An unverifiable policy file is
not an error unless `fail_closed = true` is also set — and that key lives in the same file whose
signature just failed. And separately: *"A pinned key names a value this version does not recognise →
The key is ignored and the rest of the file still applies."*

`grok inspect` *"lists every config file that contributed, including requirements and managed layers,
so a policy that is not applying is visible in one command."*

---

## 3. The `GROK_CONFIG` overlay and its allowlist

Layer 5 is the one an embedding client uses. *"A harness or ACP client that launches
`grok agent stdio` can inject settings without writing a `config.toml` or relocating `$GROK_HOME`"* —
`GROK_CONFIG` as an inline JSON object, or `GROK_CONFIG_PATH` as an *"**additional** file overlay (not
a replacement for `config.toml`)"*, read as JSON or TOML by extension. `GROK_CONFIG` wins when both are
set; an empty value is treated as unset and a malformed one *"logs a warning and falls through to
`GROK_CONFIG_PATH`."*

**It is deliberately narrow, and the narrowness is the point.** *"It is **not** a permission-escalation
path. The overlay is confined, fail-closed, to an **allowlist** of soft settings (`models`, `features`,
a narrowed `toolset`, and a `shell_environment_policy` limited to its filter fields…); every other
table is dropped at the choke point, so the overlay cannot spawn commands, set auth policy, redirect
network traffic, elevate trust, or add a discovery source."*

And a second-order rule: *"Even on the allowlisted settings, a specific set of security gates read the
raw disk layers rather than the overlay."* The canonical list is named as a rustdoc — *"The
`ConfigLayers::env_overlay` rustdoc is the canonical list of what the overlay can and cannot reach and
which gates read it overlay-free"* — a rustdoc, not a published page. The same paragraph links
`../internal/22-environment-variables.md`, and **`docs/internal/` does not exist in the published
tree**: `crates/codegen/xai-grok-pager/docs/` holds `custom-hooks.md`, `hooks-and-plugins.md`,
`tutorial/` and `user-guide/`, and nothing else. Checked that listing on 2026-09-08.

---

## 4. Project rules — instructions, accumulating

### Filenames

Six, checked **in this order** within each directory: `Agents.md`, `Claude.md`, `CLAUDE.md`,
`CLAUDE.local.md`, `AGENT.md`, `AGENTS.md`. *"Grok loads every matching file in a directory, so a
folder that contains both `AGENTS.md` and `CLAUDE.md` contributes both."* Case-insensitive filesystems
dedupe names that resolve to one file.

### Rules directories

Per-level, from repo root to cwd: `<dir>/.grok/rules/` (always), `<dir>/.claude/rules/` and
`<dir>/.cursor/rules/` (both configurable — see
[`01`](./01-build-harness-compatibility.md) §1).

Home-level, scanned regardless of where Grok starts: `$GROK_HOME/rules/` (default `~/.grok/rules/`,
always), `~/.claude/rules/` (`compat.claude.rules`), `~/.cursor/rules/` (`compat.cursor.rules`).

### Order

1. **Home rules** — `$GROK_HOME`, then enabled `~/.claude/` and `~/.cursor/` sources.
2. **Repo rules** — *"If inside a git repo, every directory from the repo root down to the current
   working directory (inclusive)."*
3. **CWD-only** — *"If not inside a git repo, only the current working directory."*

*"Files are alphabetical within each rules directory."*

### What "precedence" means here, exactly

*"Grok orders the files from the repo root to the current working directory, so files in deeper
directories appear later in its context and take precedence when instructions conflict."*

**This is ordering, not enforcement.** The mechanism guarantees assembly order; a conflict resolves
because the model reads the later file last. Nothing checks the outcome. (Contrast the permission
engine in [`04`](./04-build-permissions-and-sandbox.md), where `deny` wins *"regardless of order or
source"* — an actual precedence rule.)

**Discovery does honour `.gitignore` for rules** — *"Files ignored by `.gitignore` are skipped during
discovery"*, so gitignoring `CLAUDE.local.md` keeps a personal override out of the repo. Note this is
the **opposite** of skill discovery, which ignores `.gitignore` by design
([`01`](./01-build-harness-compatibility.md) §2).

`grok inspect` lists every loaded project instruction.
