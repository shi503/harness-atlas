---
status: DRAFT
title: "Approvals, deny globs and write safety — and the boundary the project names"
tier: reference
project: harness-atlas
source: "hermes-agent.nousresearch.com/docs/user-guide/security · NousResearch/hermes-agent SECURITY.md"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
source_verified: "2026-09-08"
---

# Approvals, deny globs and write safety — and the boundary the project names

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `hermes-agent.nousresearch.com/docs` and `NousResearch/hermes-agent` at
**v0.21.1 (tag `v2026.9.7`)**, **2026-09-08**.

Hermes ships a layered command-approval stack **and** a policy document stating that none of it is a
security boundary. Both halves are the surface; reading either alone misreads the design.

---

## 1. The eight layers, as the vendor numbers them

> 1. **User authorization** — who can talk to the agent (allowlists, DM pairing)
> 2. **Dangerous command approval** — human-in-the-loop for destructive operations
> 3. **File write safety** — denylist and optional write sandbox for `write_file`/`patch`
> 4. **Container isolation** — Docker/Singularity/Modal sandboxing with hardened settings
> 5. **MCP credential filtering** — environment variable isolation for MCP subprocesses
> 6. **Context file scanning** — prompt injection detection in project files
> 7. **Cross-session isolation** — sessions cannot access each other's data or state
> 8. **Input sanitization** — working directory parameters validated against an allowlist

## 2. Approval configuration

```yaml
approvals:
  mode: smart                     # smart | manual | off
  timeout: 300                    # seconds to wait for a reply (fail-closed on expiry)
  cron_mode: deny                 # deny | approve
  single_query_mode: deny         # deny | approve
  unattended_mode: deny           # deny | approve
  mcp_reload_confirm: true
  destructive_slash_confirm: true
  deny: []                        # user-defined glob denylist — see §4
```

| Mode | Behaviour |
|---|---|
| **`smart`** (default) | *"Use an auxiliary LLM to assess risk. Low-risk commands … are auto-approved for that command only. Genuinely dangerous commands are auto-denied. Uncertain cases escalate to a manual prompt."* |
| `manual` | Always prompt |
| `off` | *"Disable all approval checks — equivalent to running with `--yolo`."* |

The three headless modes differ from each other only in which surface they cover, and all three default
to `deny`:

| Key | Surface | On a dangerous command |
|---|---|---|
| `cron_mode` | Scheduled jobs | `deny` blocks it — *"the agent must find another path"*; `approve` auto-approves everything in cron context |
| `single_query_mode` | `hermes chat -q` one-shots | Same shape — *"A `-q` session runs a single turn and exits with no user waiting"* |
| `unattended_mode` | webhook, msgraph_webhook, api_server | Same shape, and `deny` *"blocks the command instantly"* rather than waiting out the approval timeout |

Two confirmation keys guard non-shell destruction: `mcp_reload_confirm` (because rebuilding the MCP
tool set *"invalidates the provider prompt cache"*) and `destructive_slash_confirm` for `/clear`,
`/new`, `/reset`, `/undo`. Clicking **Always Approve** on either flips the key to `false`.

**Timeout is fail-closed**: *"If no response is given within the timeout, the command is **denied** by
default."*

## 3. YOLO mode, and the floor beneath it

Three activations: `hermes --yolo` / `hermes chat --yolo`, the `/yolo` toggle, or `HERMES_YOLO_MODE=1`.
Two persistent visual reminders — a red session-start banner (`⚠ YOLO mode — all approval prompts
bypassed`) and a `⚠ YOLO` status-bar fragment *"across all width tiers, updated live"*.

> *"YOLO mode disables **all** dangerous command safety checks for the session — **except** the hardline
> blocklist."*

### The hardline blocklist

> *"Some commands are so catastrophic … that Hermes refuses to run them **regardless** of: `--yolo` /
> `/yolo` toggled on · `approvals.mode: off` · Cron jobs running in headless `approve` mode · User
> explicitly clicking 'allow always'."*
>
> *"The blocklist is the floor below `--yolo`. It trips **before** the approval layer even sees the
> command, and there's no override flag."*

Patterns, *"not exhaustive; kept in sync with `tools/approval.py::UNRECOVERABLE_BLOCKLIST`"*:

| Pattern | Why it is hardline |
|---|---|
| `rm -rf /` and obvious variants | Wipes the filesystem root |
| `rm -rf --no-preserve-root /` | The explicit "yes I mean root" variant |
| `:(){ :\|:& };:` (bash fork bomb) | Pegs the host until reboot |
| `mkfs.*` on a mounted root device | Formats the live system |
| `dd if=/dev/zero of=/dev/sd*` | Zeroes a physical disk |
| Piping untrusted URLs to `sh` at the rootfs top level | *"Remote-code-execution attack vector too broad to approve"* |

The stated remedy when a legitimate workflow needs one: *"run it outside the agent."*

### A separate non-overridable guard

The terminal tool refuses to stop or restart the gateway *"from inside its own supervised process"*,
because a self-restart *"can terminate the tool before it finishes and cause a supervisor/auto-resume
loop."* **User approval, YOLO mode, and `force=True` do not bypass this guard.** On macOS the
restriction extends to executed `launchctl submit` and `launchctl bootstrap` *"regardless of the job
label"* — described as *"a conservative registration restriction intended to catch indirect restart
helpers with neutral labels, not an inspection of the target plist."*

Two carefully drawn negatives on that guard: a rejection *"does **not** establish that the job uses
KeepAlive or controls Hermes"*, and some independent `load`/`unload` commands passing the label check
*"is not a target-verified exemption or a supported way to evade a `bootstrap` rejection."*

## 4. `approvals.deny` — the user-editable floor

> *"The hardline blocklist is fixed and code-shipped. `approvals.deny` is its user-editable counterpart:
> a list of glob patterns that block matching terminal commands unconditionally — **before** `--yolo`,
> `/yolo`, and `approvals.mode: off` are consulted. Use it to run yolo-with-exceptions."*

```yaml
approvals:
  deny:
    - "git push --force*"
    - "*curl*|*sh*"
    - "dd if=* of=/dev/*"
```

The matching semantics, which are more elaborate than "glob the command string":

- **fnmatch globs** (`*`, `?`, `[...]`), matched **case-insensitively**, against *"the whole command text
  and individual executable-command candidates."*
- Matching runs over *"the same normalized/deobfuscated command variants the dangerous-pattern detector
  uses, so simple quoting tricks (`git pu""sh --force`) don't slip past a rule."*
- **Executable candidates keep the literal path and also match the basename**: `sudo *` covers
  `/usr/bin/sudo -n id` and `./sudo -n id`. But *"A path-specific rule such as `/usr/bin/sudo *` does
  **not** become a rule for every binary named `sudo`."*
- Quote-aware parsing exposes commands after assignments, leading redirections, `;`, `&&`, `||`,
  pipelines, groups, command substitutions, and `if`/`then`/`else`/`do` transitions. Recognised
  launchers: `sudo`, `env`, `command`, `exec`, `nohup`, `setsid`, `time`, `nice`, `timeout`, `stdbuf`,
  `ionice`, `chrt`, `taskset`, `chroot`. Shell `-c` payloads are inspected recursively. `command -v`/`-V`
  lookups *"are not executions"*.
- Whitespace **between** words in candidates is collapsed while quoted content and argument paths are
  retained — so `git status` also matches `env git\tstatus; echo done`. *"Quoted mentions such as `echo
  'sudo -n id'` are not promoted to commands"*, though a whole-input glob like `*sudo*` still matches a
  mention anywhere.
- **YAML quoting matters**: *"A bare leading `*` is a YAML alias and fails to parse; `{`, `!`, and `: `
  have their own YAML meanings. Single quotes are safest."*
- Deny rules apply to **all** terminal backends, *"including isolated containers, before any
  backend-specific approval shortcut."*
- A denied command *"returns a BLOCKED error to the agent telling it not to retry or rephrase."*
- Changes take effect immediately — *"the config cache is mtime-keyed"*, no restart.

**And the stated threat model for deny rules**, which is the honest limit on all of the above:

> *"Deny rules are a shell-command policy, not a complete shell interpreter or an OS capability sandbox.
> Normalization does not resolve arbitrary variables …, aliases, functions, renamed binaries, scripts,
> interpreter programs, or every shell/launcher grammar … Do not use a basename deny rule as a guarantee
> that a capability cannot be reached by other means. For containment, use OS permissions and an isolated
> backend."*

## 5. What triggers an approval prompt

Defined in `tools/approval.py`. Grouped:

| Group | Patterns |
|---|---|
| Destructive filesystem | `rm -r` / `rm --recursive`, `rm … /`, `xargs rm`, `find -exec rm` / `find -delete` |
| Permissions and ownership | `chmod 777/666`, `o+w`, `a+w`, `chmod --recursive` with unsafe perms, `chown -R root` |
| Devices and filesystems | `mkfs`, `dd if=`, `> /dev/sd` |
| SQL | `DROP TABLE/DATABASE`, `DELETE FROM` without `WHERE`, `TRUNCATE TABLE` |
| System config | `> /etc/`, `cp`/`mv`/`install` to `/etc/`, `sed -i` on `/etc/` |
| Sensitive-file writes | `tee` or `>` / `>>` to `/etc/`, `~/.ssh/`, `~/.hermes/.env` |
| Services and processes | `systemctl stop/restart/disable/mask`, `kill -9 -1`, `pkill -9`, fork bombs |
| Self-termination | `pkill`/`killall` hermes/gateway; `gateway run` with `&`/`disown`/`nohup`/`setsid` |
| Arbitrary execution | `bash -c` / `sh -c` / `zsh -c` / `ksh -c` (including combined flags like `-lc`), `python -e` / `perl -e` / `ruby -e` / `node -c` |
| Remote code | `curl … \| sh`, `wget … \| sh`, `bash <(curl …)`, `sh <(wget …)` |
| Container lifecycle | `docker stop/kill/restart`, `docker compose down/stop/kill/restart` |
| Daemon redirect | `docker -H`/`--host`/`--context`, `DOCKER_HOST=`/`DOCKER_CONTEXT=`, `docker context use`, `podman --remote`/`-r`/`--url`/`--connection`/`--identity`, `CONTAINER_HOST=` |

**Containers skip this layer entirely.** *"When running in `docker`, `singularity`, `modal`, `daytona`,
or `vercel_sandbox` backends, dangerous command checks are **skipped** because the container itself is
the security boundary."*

### Answering a prompt

The CLI offers four options — `[o]nce`, `[s]ession`, `[a]lways`, `[d]eny` — with **deny as the
default**. `always` writes the pattern to `command_allowlist` in `config.yaml`, after which those
patterns *"are loaded at startup and silently approved in all future sessions."* On messaging platforms
the prompt is a chat message answered with `yes`/`y`/`approve`/`ok`/`go` or `no`/`n`/`deny`/`cancel`.

`hermes approvals suggest` mines `~/.hermes/state.db` for *"dangerous-classified commands that actually
executed"* and proposes allowlist entries; `--apply 1,3` merges the picks, `--json` emits machine-readable
output.

A note on the allowlist's parsing: it *"must be a list of strings"*, legacy quoted-string lists are
recovered at load with a warning, and other malformed values *"are ignored with a warning; they never
become per-character approvals."*

## 6. File write safety

A **different** mechanism from command approval, and deliberately not promptable:

> *"Before `write_file` or `patch` touches disk, Hermes checks the target path against a denylist and an
> optional sandbox. Blocked writes return an error to the agent immediately — **there is no approval
> prompt** and no way to override from the chat UI."*

### Always-blocked categories

| Category | Examples |
|---|---|
| OS credential stores | `~/.ssh/` (keys, `authorized_keys`), `~/.aws/`, `~/.kube/`, `/etc/sudoers`, `~/.netrc` |
| Hermes credential stores | `auth.json`, `.env`, `.anthropic_oauth.json`, `mcp-tokens/`, `pairing/` under `HERMES_HOME` (active profile and global root) |
| Project secret files | `.env`, `.env.local`, `.env.production`, `.envrc` anywhere on disk |

*"Sensitive paths inside the safe root are still blocked — pointing `HERMES_WRITE_SAFE_ROOT` at `$HOME`
does not allow writing `~/.ssh/id_rsa`."*

Two distinct error strings: `Write denied: '…' is outside HERMES_WRITE_SAFE_ROOT (…)` and
`Write denied: '…' is a protected system/credential file.`

**One documented exception**: `~/.ssh/config` is approval-gated rather than hard-blocked, because *"The
SSH client config holds no private-key material and editing it … is a routine task."* It still *"can
carry `ProxyCommand` / `Match exec` directives that run commands, so the write is never silent."*
Non-interactive callers — *"ACP file bridge, background jobs with no human channel"* — **fail closed**.

### `HERMES_WRITE_SAFE_ROOT`

Anything outside the listed prefix(es) is *"**hard-blocked** — not routed through dangerous-command
approval."* Multiple roots separate on `:` (Unix) or `;` (Windows). It is set automatically in the
official Docker image to `/opt/data`.

The stated foot-gun: *"**Do not add to `~/.hermes/.env` casually.** If you set it to a project directory,
the agent cannot write to `~/.hermes/cron/jobs.json`, profile skills, or other Hermes state outside that
prefix."*

### And what the write guards are not

> *"Write guards apply to `write_file` and `patch` only. The `terminal` tool runs as the same OS user and
> can still `cat` or overwrite denied paths via shell commands. The denylist reduces accidental damage
> and gives models a clear stop signal; it does not sandbox a hostile or compromised agent."*

The paired note about trusting the model's own report: *"The model may still claim the edit succeeded;
when `display.file_mutation_verifier` is on (default), trust the file-mutation verifier footer over the
assistant's closing summary."*

## 7. The refusal — the boundary the project names, in full

`SECURITY.md` §2.2, verbatim:

> **"The only security boundary against an adversarial LLM is the operating system.** Nothing inside the
> agent process constitutes containment — not the approval gate, not output redaction, not any pattern
> scanner, not any tool allowlist. Any in-process component that screens LLM output is a heuristic
> operating on an attacker-influenced string, and this policy treats it as such."

The document then classifies its own layers under **§2.4 In-Process Heuristics** — *"They are useful.
They are not boundaries"*:

| Component | The stated limit |
|---|---|
| The approval gate | *"Shell is Turing-complete; a denylist over shell strings is structurally incomplete. The gate catches cooperative-mode mistakes, not adversarial output."* |
| Output redaction | *"A motivated output producer will defeat it."* |
| Skills Guard | *"It is a review aid; the boundary for third-party skills is operator review before install. Reviewing a skill means reading its Python code and scripts, not just its SKILL.md description — skills execute arbitrary Python at import time."* |

### The two isolation postures

| Posture | What it confines | What it does not |
|---|---|---|
| **Terminal-backend isolation** | *"anything the agent does by issuing shell or file operations"* — the file tools run through the backend *"since they are implemented on top of the shell contract"* | *"everything the agent does in its own Python process … the code-execution tool …, MCP subprocesses …, plugin loading, hook dispatch, and skill loading"* |
| **Whole-process wrapping** | *"Every code path — shell, code-execution, MCP, file tools, plugins, hooks, skill loading — is subject to the same filesystem, network, process, and (where applicable) inference policy"* | — |

Whole-process wrapping is supported two ways: Hermes's own Docker image and Compose setup, or **NVIDIA
OpenShell** — *"per-session sandboxes with declarative policy across filesystem, network (L7 egress),
process/syscall, and inference-routing layers"*, with hot-reloadable network and inference policies and
credentials *"injected from a Provider store"* that *"never touch the sandbox filesystem."*

The stated line between supported and unsupported operation:

> *"Operators running the default local backend with untrusted input surfaces, or running a
> terminal-backend sandbox and expecting it to contain code paths that don't go through the shell, are
> operating outside the supported security posture."*

### Credential scoping is reduction, not containment

Hermes strips provider API keys and gateway tokens from the environment passed to shell subprocesses,
MCP subprocesses, cron job scripts and the code-execution child; declared variables pass through.

> *"This reduces casual exfiltration. It is not containment. Any component running inside the agent
> process (skills, plugins, hook handlers) can read whatever the agent itself can read, including
> in-memory credentials."*

### Plugins run with full agent privileges

> *"Plugins load into the agent process and run with full agent privileges: they can read the same
> credentials, call the same tools, register the same hooks, and import the same modules as anything
> shipped in-tree. The boundary for third-party plugins is operator review before install."*

*"A malicious or buggy plugin is not a vulnerability in Hermes Agent itself"* — but *"Bugs in Hermes
Agent's plugin-install or plugin-discovery path that prevent the operator from seeing what they're
installing are in scope."*

### External surfaces — four uniform rules

An external surface is *"any channel outside the local agent process through which a caller can dispatch
agent work, resolve approvals, or receive agent output"*: gateway platform adapters, network-exposed
HTTP surfaces (API server, dashboard plugin, kanban plugin endpoints), editor/IDE adapters (`acp_adapter/`)
and the TUI gateway over local IPC.

1. *"Authorization is required at every surface that crosses a trust boundary"* — an allowlist for
   network surfaces; OS-level access control for local-IPC ones.
2. *"An allowlist is required for every enabled network-exposed adapter. Adapters must refuse to dispatch
   agent work, resolve approvals, or relay output until an allowlist is set."*
3. *"Session identifiers are routing handles, not authorization boundaries."*
4. *"Within the authorized set, all callers are equally trusted."* Capability separation means separate
   agent instances with separate allowlists.

Binding a local-only surface to a non-loopback interface is *"a break-glass operator decision"* that
moves public-exposure hardening onto the operator.

### What is out of scope, and why that is not dismissal

*"Out of scope"* is defined before the list: *"'Out of scope' here means 'not a security vulnerability
under this policy.' It does not mean 'not worth reporting.'"* Improvements to the heuristics are
*"welcome as regular issues or pull requests"* — they simply do not go through the private channel.

The list: bypasses of in-process heuristics; *"Prompt injection per se … 'I achieved prompt injection'
without a chained §3.1 outcome is not an actionable report"*; consequences of a chosen isolation
posture; documented break-glass settings (*"that's the flag's job"*); community skills and plugins;
public exposure without external controls; and tool-level read/write restrictions on a posture where
shell is permitted.

**There is no bug bounty**: *"Hermes Agent does not operate a bug bounty program."* The coordinated
disclosure window is *"90 days from report, or until a fix is released, whichever comes first."*
