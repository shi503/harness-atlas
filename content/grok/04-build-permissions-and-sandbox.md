---
status: DRAFT
title: "Grok Build — permissions, modes and the kernel sandbox"
tier: reference
project: harness-atlas
product: "Grok Build"
source: "xai-org/grok-build @ 7581004 — user-guide 18, 22"
version_at_capture: "commit 7581004 (SOURCE_REV eb4a894), no tags"
source_verified: "2026-09-08"
---

# Grok Build — permissions, modes and the kernel sandbox

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**Product: Grok Build**, the Apache-2.0 Rust runtime. **Grok Bot's equivalent is an approval card plus
a model-based Auto Review rule**, and its isolation is a per-user microVM rather than a kernel profile;
see [`11`](./11-bot-approvals-security-and-teams.md).

Read against `xai-org/grok-build` at commit `7581004`, **2026-09-08**. No tags exist.

Two controls, stated separately: *"**Modes** set how often Grok asks for approval… **Rules** set which
tools are allowed, asked about, or blocked."* A third, the sandbox, is enforced by the kernel and is
**off by default**.

---

## 1. The six modes

| Mode | What runs without asking | Vendor's "best for" |
|---|---|---|
| `default` (**ask**) | read-only tools and built-in read-only shell commands | interactive day-to-day use |
| `acceptEdits` | file edits without a prompt | *"Local coding while you review diffs later"* |
| `plan` | *"Accepted for compatibility; use plan mode for gated planning"* | *"Claude-compatible settings"* |
| `auto` | *"Work the safety check allows; other calls are blocked or escalated"* | fewer prompts, interactive |
| `dontAsk` | *"Only pre-approved tools and built-in read-only handling"* | *"Strict CI allowlists"* |
| `bypassPermissions` (**always-approve**) | *"Tool calls in general (`deny` rules, hooks, and some shell `ask` rules still apply)"* | *"Trusted automation and agent servers"* |

*"**Always-approve** is the product name; config and Claude-compatible settings may use
`bypassPermissions` for the same mode. Always-approve and auto are mutually exclusive (always-approve
takes precedence when both are requested)."*

Set it five ways: `Shift+Tab` / `Ctrl+O`, `/always-approve` or `/auto`, `--always-approve` (alias
`--yolo`) or `--permission-mode`, `[ui] permission_mode`, or ACP `_meta.yoloMode` on `session/new`.
*"CLI overrides config for that process."*

**Auto mode fails differently without a human.** *"In non-interactive sessions (`grok -p`, unidentified
stdio), that same call fails and is reported to the model (for example `Auto mode blocked this
action …`)."* The vendor's own guidance is to use always-approve plus deny rules for automation
*"rather than auto alone."*

**Locking it off is a `requirements.toml`-only operation.** `[ui] disable_bypass_permissions_mode =
true`; the legacy `[ui] yolo = false` also works. *"Do not use `permission_mode` for this lock; that
key is a switchable default."* The lock *"is enforced only from a requirements layer; true in user or
managed files is ignored"* — a fourth documented silent-no-op, alongside the three in
[`02`](./02-build-configuration-and-project-rules.md) §2.

---

## 2. How a tool call is authorized — five ordered checks

1. **`PreToolUse` hooks.** *"A hook can deny a tool call before any other check. A hook that allows a
   call does not skip the checks below; it only declines to deny."*
2. **Permission rules**, from config files or `--allow`/`--deny`. *"A matching `deny` rule rejects the
   call. `deny` wins over every other rule."* A matching `ask` prompts *"including for file reads,
   searches, and shell commands that would otherwise be auto-approved."*
3. **Remembered grants** — per-command approvals saved from earlier prompts, scoped to the project. An
   existing grant can satisfy an `ask` rule. *"Commands on the dangerous list prompt again rather than
   using a remembered prefix."*
4. **Built-in auto-approvals** — the read-only tool and shell lists in §3.
5. **Prompt policy**, set by the mode.

**Always-approve short-circuits after step 2**, not before it: *"`deny` rules, hooks, and `ask` rules
that match a shell command's segments still apply, but remembered grants (including remembered 'never
allow' entries) are not consulted, and `ask` rules on non-shell tools do not prompt."*

**Evaluation inside step 2 is `deny` > `ask` > `allow`, *"regardless of order or source."*** Rules from
`~/.grok/config.toml` and every project `.grok/config.toml` from repo root down are merged into one
set. The stated consequence: *"you cannot combine these `allow` rules with a catch-all `deny` on `bash`
to mean 'only allow git/gh'; a `deny tool = 'bash'` rule"* wins over the allow.

---

## 3. What never prompts, and the exceptions carved out of it

**Read-only tools:** `read_file`, `list_dir`, `grep`, `web_search`, `todo_write`,
`get_command_or_subagent_output` / `kill_command_or_subagent`, and *"Invoking skills"*.

**Read-only shell commands**, matched **after splitting on `&&`, `||`, `;` and pipes**, word-boundary
matched *"so `ls` does not match `lsof` or `less`"*:

- *Filesystem:* `ls`, `cat`, `pwd`, `date`, `whoami`, `hostname`, `uptime`, `ps`, `head`, `tail`, `wc`,
  `sort`, `uniq`, `tr`, `cut`
- *Git:* `git status|branch|log|diff|ls-files|show|rev-parse|blame|describe|merge-base|shortlog|
  check-ignore|check-attr|cat-file|ls-tree|show-ref|for-each-ref|rev-list|name-rev|count-objects`
- *Search:* `grep`, `rg` — *"not `rg --pre` / `rg --pre=…`, which spawn a preprocessor per file"*
- *Kubernetes:* `kubectl get`, `kubectl logs`, `kubectl describe`

The exclusions are the interesting part, because each names a specific escape:

| Excluded | Why, in the vendor's words |
|---|---|
| `tee` | *"it can write its input to arbitrary files"* |
| `cargo check` | *"it compiles and runs `build.rs`, proc-macros, and any `build.rustc-wrapper` from the repo"* |
| `sort --compress-program=…` | raises a request-level floor and prompts |
| `git -c` / `--config-env` overrides | same |
| a git command whose config installs an executable hook | *"`core.fsmonitor`, a `diff.*.command`/`textconv`/`external` driver, or a shell `alias.<safe-subcommand> = !…`"* |

Per-segment evaluation is stated with its own example: *"In a command like `ls && rm -rf /`, the `ls`
segment is recognized as read-only, but the `rm` segment is not on the list. In `default` mode the `rm`
segment prompts; under `dontAsk` it is denied."*

---

## 4. The sandbox — kernel-enforced, off by default

Five built-in profiles, selected with `--sandbox <profile>`:

| Profile | FS read | FS write | Child network |
|---|---|---|---|
| `off` (**default**) | unrestricted | unrestricted | unrestricted |
| `workspace` | everywhere | CWD + `~/.grok/` + `/tmp` + `/var/tmp` | allowed |
| `devbox` | everywhere | all top-level dirs except `/data` | allowed |
| `read-only` | everywhere | `~/.grok/` + `/tmp` + `/var/tmp` | blocked |
| `strict` | CWD + system paths + `~/.grok` | CWD + `~/.grok/sessions` + `/tmp` + `/var/tmp` | blocked |

**Platforms:** Linux **Landlock**, kernel 5.13 or later; macOS **Seatbelt**, all versions. Custom
profiles live in `~/.grok/sandbox.toml` with `extends`, `restrict_network`, `read_only`, `read_write`,
and `deny` (globs on `*`, `?`, `[`).

### Direct global hook write protection

The most specific mechanism on this page, and the one with the sharpest compatibility edge. Under
`workspace`, `read-only`, `strict` and profiles extending them, the kernel **write-denies** the
Grok-owned paths used as user-global hook sources, *"(they stay readable when granted)"*:

- `~/.grok/hooks/`
- `~/.grok/hooks-paths` — *"registry file; not loaded as hook JSON — only its absolute targets are"*
- absolute targets listed in `hooks-paths`; *"relative lines are ignored; missing targets refuse
  sandbox start"*

Supporting rules: on first launch Grok *"creates a real empty `hooks/` directory and empty
`hooks-paths` file when they are missing (never symlinks or wrong types)"*; *"a symlinked `$GROK_HOME`
or a `hooks-paths` entry with a symlink component is refused at sandbox start (prevents
retargeting)"*; parent directories are pinned against rename; *"on Linux, nested user namespaces are
disabled inside bubblewrap so mount binds cannot be rearranged."* `devbox` *"does not apply this
protection (disposable VMs)"*, and *"profiles that require it refuse to start if the kernel policy
cannot be applied."*

**And the stated gap:** *"Claude/Cursor global settings are **not** covered by this write-deny;
discovery of those vendors remains separately gated by compatibility settings."* The kernel protects
the native hook source; the foreign hook sources are protected by a configuration flag instead —
see [`01`](./01-build-harness-compatibility.md) §5.

---

## 5. What the vendor says the boundary is not

Four statements, each a limit on a control this page describes:

> *"Allow rules are not a closed allowlist… Treat the read-only command list as a convenience, not a
> security boundary."*

> *"Hooks fail open. If a hook script crashes, times out, or is missing, the tool call proceeds as if
> the hook had allowed it."*

> *"Sandbox mode is off by default."*

> *"Child-network blocking is enforced on Linux only… On macOS it is a no-op."*

And on plugins: *"Plugins run with your privileges, so treat them like any software you install."*
Plugin agent frontmatter *"cannot declare `mcpServers` or hooks, or set `permissionMode:
bypassPermissions`"* — the one hard restriction on that surface.

**No overall threat-model statement was found.** Checked UG/18, UG/22, UG/09 §Trust and security, and
`SECURITY.md`, which is a seven-line HackerOne referral and contains no model. The four quotes above
are the whole of what is stated, and each scopes one control rather than the system.
