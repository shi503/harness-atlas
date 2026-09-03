---
status: DRAFT
title: "Policy and governance — permissions, managed settings, sandboxing"
tier: reference
project: loomwarp
source: "https://code.claude.com/docs/en/permissions, /settings, /server-managed-settings, /sandboxing"
source_verified: "2026-08-10"
---

# Policy and governance

Four enforcement layers, in increasing order of authority: **permission rules** (declarative,
client-side), **hooks** (procedural, client-side), **managed settings** (admin-controlled,
client-side), and **sandboxing** (OS-level).

The distinction the docs draw repeatedly is worth stating once at the top:

> Settings rules are enforced by the client regardless of what Claude decides to do. CLAUDE.md
> instructions shape Claude's behavior but are **not** a hard enforcement layer.

---

## The tiered permission model

| Tool type | Approval required | "Don't ask again" scope |
|---|---|---|
| Read-only (file reads, Grep) | No, within the working directory and additional directories | N/A |
| Bash commands | Yes, except a built-in read-only set | Permanently, per repository and command |
| File modification (Edit/Write) | Yes | Until session end |

---

## Permission modes

| Mode | Behavior |
|---|---|
| `default` | Standard checking with prompts |
| `plan` | Read-only exploration |
| `acceptEdits` | Auto-accept file edits and common filesystem commands (`mkdir`, `touch`, `mv`, `cp`) in the working directory or `additionalDirectories` |
| `auto` | A background classifier reviews commands and protected-directory writes |
| `dontAsk` | Auto-deny prompts. Explicitly allowed tools and the read-only command set still work |
| `bypassPermissions` | Skip prompts |

**Auto mode becomes the default permission mode for new sessions on Pro, Max, and Team plans starting
August 14, 2026** (Week 32 digest). Its classifier is configurable via the `autoMode` settings key
with `environment`, `allow`, `soft_deny`, and `hard_deny` arrays; include `"$defaults"` to inherit
built-in rules. It is read from user settings, `--settings`, and managed settings only.

```json
{
  "autoMode": {
    "environment": [
      "Source control: github.example.com/acme-corp and all repos under it",
      "Trusted cloud buckets: s3://acme-build-artifacts",
      "Trusted internal domains: *.corp.example.com"
    ]
  }
}
```

Even `bypassPermissions` still prompts for: explicit `ask` rules, connector tools your org set to
`ask`, MCP tools marked `requiresUserInteraction`, root/home removals such as `rm -rf /`, and the
`isolatePeerMachines` approval.

---

## Rule syntax

### The three arrays

`permissions.allow`, `permissions.ask`, `permissions.deny`.

**Deny always wins, from any scope.** A user-level deny blocks a project-level allow and vice versa;
deny rules are evaluated before allow rules regardless of level. A managed deny cannot be overridden
by `--allowedTools`.

### Match all uses of a tool

A bare tool name: `Bash`, `WebFetch`, `Skill`.

### Match by input parameter — `Tool(param:value)`

**Deny and ask rules only.** An allow rule for one parameter value would not establish the call is
safe overall, so allow rules keep each tool's own specifier syntax.

| Rule | Matches |
|---|---|
| `Agent(model:opus)` | Agent calls requesting the Opus tier |
| `Agent(isolation:worktree)` | Agent calls requesting a git worktree |
| `Bash(run_in_background:true)` | Bash calls running in the background |

Rules: the parameter must be a **direct** field (nested fields are not matchable); one parameter per
rule; `*` wildcards work in the value; a parameter the model omits is **never** matched, so
`Agent(model:*)` does not match a call leaving `model` unset; the value compares against the
**literal input before normalization**, so `Agent(model:opus)` matches the alias but not a full model
ID.

You cannot match a tool's primary content field this way — `command`, `file_path`, `path`,
`notebook_path`, `url`. A rule like `Bash(command:rm *)` would be bypassable by a compound command,
so Claude Code ignores it and warns at startup.

### Tool-name wildcards

Deny and ask rules accept globs in the tool-name position; the pattern must match the full name.
`"*"` matches every tool, `"mcp__*"` matches every MCP tool. **Allow rules** accept globs only after
a literal `mcp__<server>__` prefix — the server segment must be glob-free. An unanchored allow glob
(`"*"`, `"B*"`, `"mcp__*"`) is **skipped with a warning** and auto-approves nothing.

A deny or ask rule matching no known tool produces a startup warning to catch typos. Rules match the
**canonical** tool name, not the transcript label — the tool shown as `Stop Task` is `TaskStop`.

---

## Tool-specific syntax

### Bash

```json
{
  "permissions": {
    "allow": ["Bash(npm run *)", "Bash(git commit *)", "Bash(git * main)", "Bash(* --version)"],
    "deny":  ["Bash(git push *)"]
  }
}
```

- `*` matches any sequence **including spaces**, so one wildcard spans multiple arguments.
- A trailing `*` **with a preceding space** enforces a word boundary: `Bash(ls *)` matches `ls -la`
  but not `lsof`. Without the space, `Bash(ls*)` matches both.
- `:*` is an equivalent trailing-wildcard form — `Bash(ls:*)` ≡ `Bash(ls *)`. **Only recognized at
  the end**; in `Bash(git:* push)` the colon is literal.

**Compound commands.** Claude Code is shell-aware: `Bash(safe-cmd *)` does **not** permit
`safe-cmd && other-cmd`. Recognized separators: `&&`, `||`, `;`, `|`, `|&`, `&`, newlines. **A rule
must match each subcommand independently.** Approving a compound command with "don't ask again" saves
a **separate rule per subcommand** (up to 5).

**Wrappers stripped before matching:** `timeout`, `time`, `nice`, `nohup`, `stdbuf`, the builtins
`command` and `builtin`, zsh's `noglob`, and bare `xargs` (only with no flags). So
`Bash(npm test *)` matches `timeout 30 npm test`. Not stripped: `command -v`, `nocorrect`,
`xargs -n1`.

**Leading environment assignments**: an *allow* rule matches past an assignment of certain known-safe
variables only. A *deny or ask* rule matches past **any** leading assignment — `Bash(rm *)` in deny
still catches `FOO=bar rm -rf tmp/`.

**Exec wrappers always prompt** and cannot be prefix-approved: `watch`, `setsid`, `ionice`, `flock`,
and `find` with `-exec` or `-delete`. Environment runners are **not** in the strip list, and this is
a trap: `Bash(devbox run *)` matches whatever follows `run`, **including `devbox run rm -rf .`**.
Write `Bash(devbox run npm test)` — one rule per inner command.

**Read-only command set** (not configurable): `ls`, `cat`, `echo`, `pwd`, `head`, `tail`, `grep`,
`find`, `wc`, `which`, `diff`, `stat`, `du`, `cd`, and read-only forms of `git`. These run without a
prompt in **every** mode. They still prompt for: unquoted globs on commands with write-capable flags
(`find`, `sort`, `sed`, `git`); `docker` pointed at another daemon (`-H`, `--context`); `file` with
`-m`/`-f`; **UNC network paths on Windows** (credential exposure); and commands the parser cannot
handle, including anything over 10,000 characters.

> **The documented warning about argument-constraining Bash patterns is worth quoting.**
> `Bash(curl http://github.com/ *)` looks like it restricts curl to GitHub but misses options before
> the URL, a different protocol, redirects, variables, and extra spaces. The recommended approach:
> deny `curl`/`wget` in Bash and use `WebFetch(domain:github.com)`; or use a `PreToolUse` hook to
> validate URLs. **Using WebFetch alone does not prevent network access** — if Bash is allowed,
> Claude can still reach any URL.

### Read and Edit

`Edit` rules apply to **all** built-in file-editing tools. `Read` rules apply best-effort to Grep,
Glob, `@file` mentions, and IDE-shared selection/open-file context.

**Only `Edit(path)` and `Read(path)` rules are consulted.** A path rule written for `Write`,
`NotebookEdit`, `Glob`, or `MultiEdit` is accepted but **never checked**, with a startup warning
(v2.1.210+):

```
Permission deny rule (.claude/settings.json): Write(docs/**) is not matched by file permission
checks — only Edit(path) rules are. Use Edit(docs/**) instead.
```

A `Read` deny rule also blocks `Edit` on the same path, including creating a new file there
(v2.1.208+). Write and NotebookEdit are **not** covered — add an `Edit` deny rule for paths no tool
may change.

Patterns use **gitignore syntax** with four anchors:

| Pattern | Anchor | Example |
|---|---|---|
| `//path` | Filesystem root | `Read(//Users/alice/secrets/**)` |
| `~/path` | Home directory | `Read(~/Documents/*.pdf)` |
| `/path` | **The settings source** | `Edit(/src/**/*.ts)` → `<project root>/src/` in project settings |
| `path` or `./path` | Current directory | `Read(*.env)` |

> `/Users/alice/file` is **not** an absolute path — the single leading slash anchors at the settings
> source. Use `//Users/alice/file`.

Where `/path` resolves, by source:

| Defined in | Resolves to |
|---|---|
| `.claude/settings.json` | `<project root>/path` |
| `.claude/settings.local.json` | `<original cwd>/path` |
| `~/.claude/settings.json` | `~/.claude/path` |
| `--settings <file>` | `<directory of file>/path` |
| CLI flags, `/permissions`, session rules | `<original cwd>/path` |

A deny rule `Read(/secrets/**)` in **user settings** blocks `~/.claude/secrets/**`, not your
project's. Use `//` or `~/` for rules meant to apply inside every project.

**Depth differs by rule type** for single-segment relative directory patterns:

- **Allow:** `Edit(src/**)` matches only `<cwd>/src`. For any depth write `Edit(**/src/**)`.
- **Deny and ask:** `Read(secrets/**)` matches a `secrets` directory **at any depth** below cwd.

Bare filenames follow gitignore semantics and match at any depth — `Read(.env)` ≡ `Read(**/.env)`.

On Windows, paths normalize to POSIX before matching: `C:\Users\alice` → `/c/Users/alice`, so use
`//c/**/.env`, or `//**/.env` across all drives.

> Read and Edit deny rules apply to built-in file tools and recognized Bash file commands. They do
> **not** apply to arbitrary subprocesses that open files themselves — a Python or Node script.
> **For OS-level enforcement across all processes, enable the sandbox.**

### WebFetch

`domain:` prefix, matched against the hostname. Case-insensitive; trailing `.` stripped from both
sides.

- `WebFetch(domain:example.com)` — that host
- `WebFetch(domain:*.example.com)` — any subdomain at any depth, but **not** `example.com` itself
- `WebFetch(domain:*)` ≡ a bare `WebFetch` rule

In any position other than a leading `*.` or a bare `*`, the wildcard matches **only text between two
dots**. `WebFetch(domain:example.*)` matches `example.org` but **not** `example.evil.com` — this
prevents a trailing wildcard matching a domain an attacker could register.

### MCP, Agent, Skill, Cd

```text
mcp__puppeteer                        # any tool from that server
mcp__puppeteer__*                     # same, wildcard form
mcp__puppeteer__puppeteer_navigate    # one tool

Agent(Explore)                        # a built-in subagent
Agent(my-custom-agent)                # a custom one

Skill(commit)                         # exact
Skill(review-pr *)                    # prefix with any arguments

Cd(~/code/*)                          # one segment
Cd(~/code/**)                         # ~/code and anything under it
Cd(**/node_modules)                   # at any depth
```

If your org set a claude.ai connector tool to `ask`, allow rules **do not take effect** — Claude Code
prompts on every call even in `auto` and `bypassPermissions`, and **denies** in `dontAsk`. Connector
tools appear as `mcp__claude_ai_<server>__<tool>`.

`Cd` is not model-invocable — rules apply only when you run `/cd`. Adding any `Cd` **allow** rule
switches `/cd` to allowlist mode. Deny rules check **every spelling** of the target, including each
symlink hop.

---

## Hooks and permission rules together

Restating from `03-hooks.md` because this interaction is the most misunderstood part of the model:

- Deny and ask rules are evaluated **regardless** of what a `PreToolUse` hook returns. A matching
  deny blocks; a matching ask still prompts, even after the hook returned `"allow"`.
- A hook that **exits 2** stops the call *before* rules are evaluated — so it beats allow rules.
- The documented pattern for "allow all Bash except a specific list": allow `"Bash"`, then register a
  `PreToolUse` hook rejecting the specific commands.

---

## Working directories and trust

`permissions.allow` rules and `permissions.additionalDirectories` in a project's
`.claude/settings.json` **grant capability**, so they apply only after you accept the **workspace
trust dialog**. Until then Claude Code reads them but does not apply them. The dialog lists what the
folder would grant. `deny` and `ask` rules are unaffected — they only restrict.

Trust is saved per workspace, keyed on the git repository root, or outside a repo on the launch
directory. Starting in your **home directory** holds trust for the session only and never writes it
to disk. **Trusting a parent directory does not apply a nested project's allow rules.**

Workspace trust also gates: project-level hooks, skill `allowed-tools` grants, subagent frontmatter
hooks, `autoMemoryDirectory` from project settings, and skills-directory plugins in a project.

### `--add-dir` loads configuration only for skills

| Added with | File access | CLAUDE.md / rules | Skills | Subagents |
|---|---|---|---|---|
| `additionalDirectories` setting | Yes | No | **No** | No |
| `--add-dir` / `/add-dir` | Yes | Only with `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` | **Yes** | Yes |

---

## Settings files and precedence

| Scope | Location | Shared |
|---|---|---|
| Managed | Server-managed, MDM plist/registry, or `managed-settings.json` | Yes, admin-deployed |
| User | `~/.claude/settings.json` | No |
| Project | `.claude/settings.json` | Yes, committed |
| Local | `.claude/settings.local.json` | No, gitignored |

**Precedence, highest first:** Managed → command-line arguments → Local → Project → User.

Permission rules **merge** across scopes rather than override, with deny-first evaluation. Most keys
reload live when files change, and the **`ConfigChange` hook fires for each detected change**. Two
keys are read once at session start: `model` and `outputStyle`.

Schema for editor autocomplete: `https://json.schemastore.org/claude-code-settings.json`.
Verify what actually loaded with `/status` → **Setting sources**.

---

## Managed-only settings

These are read **only** from managed settings; placing them elsewhere has no effect.

| Setting | Effect |
|---|---|
| `allowManagedPermissionRulesOnly` | Prevents user and project settings from defining `allow`, `ask`, or `deny`. Only managed rules apply |
| `allowManagedHooksOnly` | Only managed hooks, SDK hooks, and hooks from force-enabled plugins load |
| `allowManagedMcpServersOnly` | Only `allowedMcpServers` from managed settings are respected. `deniedMcpServers` still merges |
| `strictPluginOnlyCustomization` | **Block skills, agents, hooks, and MCP servers from user and project sources** — plugins or managed settings only. `true` locks all four; an array like `["skills","hooks"]` locks those |
| `strictKnownMarketplaces` | Which marketplace sources users may add and install from |
| `blockedMarketplaces` | Blocklist, checked before download |
| `disableSideloadFlags` | Reject `--plugin-dir`, `--plugin-url`, `--agents`, `--mcp-config` at startup (v2.1.193+) |
| `pluginTrustMessage` | Custom message on the plugin trust warning |
| `channelsEnabled` | Master switch for channels |
| `allowedChannelPlugins` | Which channel plugins may register. Replaces the Anthropic default list |
| `allowAllClaudeAiMcps` | Load claude.ai connectors alongside a deployed `managed-mcp.json` |
| `forceRemoteSettingsRefresh` | Block startup until remote managed settings are freshly fetched; exit if the fetch fails |
| `sandbox.filesystem.allowManagedReadPathsOnly` | Only managed `allowRead` paths respected; `denyRead` still merges |
| `sandbox.network.allowManagedDomainsOnly` | Only managed `allowedDomains` and `WebFetch(domain:…)` allows respected; non-allowed domains blocked **without prompting** |
| `wslInheritsWindowsSettings` | WSL reads managed settings from the Windows policy chain |

`disableBypassPermissionsMode` is typically managed but works from **any** scope — a user can set it
to lock themselves out of bypass mode.

---

## Server-managed settings

For organizations without MDM. Owners configure from **Admin Settings → Claude Code → Managed
settings** on claude.ai; clients fetch at authentication.

| Approach | Best for | Security model |
|---|---|---|
| **Server-managed** | Orgs without MDM, users on unmanaged devices | Delivered from Anthropic's servers at auth time |
| **Endpoint-managed** | Orgs with MDM | Deployed via MDM profiles, registry policies, or `managed-settings.json` |

Endpoint-managed provides **stronger** guarantees because the file can be OS-protected. But
endpoint-managed settings **do not reach cloud sessions** — organizations using Claude Code on the
web should configure server-managed as well.

**Delivery and precedence.** Both occupy the highest tier. A configured `policyHelper` preempts every
other managed source. Otherwise Claude Code uses the **first source that delivers a non-empty
configuration** — server-managed is checked first, then endpoint-managed — and **sources do not
merge**. If server-managed delivers any keys at all, other endpoint-managed settings are ignored.

Two exceptions to no-merge: **cross-source lock keys** (the sandbox allowlist locks), and **the `env`
block**, which merges per key across admin-controlled sources (v2.1.223+), with the telemetry
exporter variables treated as a unit and credential-paired routing variables landing only from the
winning source.

**Caching and hardening.** Fetched at startup, polled hourly. On first launch without cache the fetch
is asynchronous — **there is a brief window before settings load where restrictions are not
enforced**. Cached settings apply immediately on later launches, **except** for withheld `env`
categories (v2.1.198+): proxy and TLS config, API routing and provider selection, authentication
credentials, `CLAUDE_CONFIG_DIR`, and (v2.1.223+) federation variables and OS directory variables.
These stay withheld until the server confirms the payload, so a cached value cannot redirect or
intercept the fetch that confirms it.

**Fail-closed:** `"forceRemoteSettingsRefresh": true` blocks startup until a fresh fetch succeeds and
exits if it fails. It self-perpetuates once delivered. `claude auth` subcommands are exempt
(v2.1.139+) so users can re-authenticate.

**Security approval dialogs.** Settings that execute shell commands, certain `env` variables (a
non-empty proxy, base-URL, or `OTEL_EXPORTER_OTLP_ENDPOINT` always qualifies), any hook definition,
and `claudeMd` content require explicit user approval. Rejecting exits Claude Code. A non-interactive
run cannot show the dialog: it applies the settings **for that run only**, without caching or
recording approval.

**Not available on third-party providers** — Bedrock, Google Cloud's Agent Platform, Microsoft
Foundry, Claude Platform on AWS, or a custom `ANTHROPIC_BASE_URL`. Exporting a `CLAUDE_CODE_USE_*`
variable in your shell **skips the fetch**, and you cannot clear that with a server-managed `env`
block because the block arrives through the fetch the export prevents. For those deployments a
self-hosted **Claude apps gateway** provides equivalent delivery.

> **Stated plainly in the docs:** server-managed settings "operate as a client-side control, not a
> security boundary. On unmanaged devices, a user doesn't need admin or sudo access to bypass them."
> A user running a modified binary or an older version bypasses any client-side control.

**Audit logging** for settings changes is available through the compliance API or audit log export —
action type, account and device, and previous/new value references. Contact your account team.

---

## Sandboxing

The `sandbox` settings key (**managed settings only**) configures `filesystem.disabled` and
`credentials` — with `files`/`envVars`, `path`/`name`, and a `mode` of `mask` or `deny`. Sandboxing
is the only layer that binds **arbitrary subprocesses**, which permission rules explicitly do not.

`sandbox.filesystem.allowManagedReadPathsOnly` and `sandbox.network.allowManagedDomainsOnly` are the
lock keys that make managed sandbox policy exclusive. Full detail: `/docs/en/sandboxing` and
`/docs/en/sandbox-environments`.

---

## LoomWarp notes

- **`policy/tier-1..4.json` map directly onto `permissions` blocks**, but LoomWarp's four tiers are
  currently templates that nothing reads at runtime, and the gap analysis records that enforcement
  was bypassed on the only live run (E5 is graded Stage 1, "the thinnest warp section"). The native
  path from template to enforcement is: put the tier's rules in a settings file, and put anything
  needing judgment in a `PreToolUse` hook.
- **`plan.md` records a correction worth re-checking against the current docs:** *"the qm benchmark
  shows enforcement does not require hooks — it requires a point the model cannot reach."* That is
  right in spirit and the docs agree on the principle, but they are specific about *which* points the
  model cannot reach, and they are not all lint rules. In ascending order of authority: permission
  rules (client-enforced, model-independent), hooks (client-enforced, can deny and rewrite),
  managed settings (admin-controlled, user cannot override), sandboxing (OS-level, binds arbitrary
  subprocesses). Deny rules and managed settings are cheaper than hooks *and* strictly enforced —
  they should be LoomWarp's first enforcement layer, with hooks reserved for decisions that need
  inspection of the tool input.
- **"A real denial" — the v1 exit gate for E5 — is now a three-line settings change plus one command
  that trips it.** There is no remaining engineering blocker on that gate.
- **`Bash(devbox run *)` class of trap applies to LoomWarp's own dispatch.** `control/dispatch.py`
  shells out to `claude`. Any allow rule broad enough to permit the dispatcher permits whatever the
  dispatcher is told to run. Write rules for the specific invocation.
- **The `Read`/`Edit`-only rule matters for any policy tier LoomWarp writes.** Rules written for
  `Write(...)` or `Glob(...)` paths are accepted and silently never consulted.

---

## Appendix — audit of `policy/tier-*.json` against this reference

Read on 2026-08-10 and checked against the syntax rules above. The four files are structurally valid
and use only `Bash(...)`, `Read(...)`, `WebFetch(domain:...)`, and `WebSearch` — **no `Write(...)` or
`Glob(...)` path rules**, so the silently-never-consulted trap is avoided. Six findings.

**P-1 — `autoMode` in `tier-4-auto.json` is ignored in the scope it would be applied from.**
The docs state `autoMode` is read from **user settings, `--settings`, and managed settings only**.
Tier files are applied as project-scope permission templates, so the `environment` and `soft_deny`
blocks in `tier-4-auto.json` — four lines of real safety guidance, including "Never force-push to
main or master" — have no effect where they sit. Deliver via `--settings` at dispatch, or move to
managed settings.

**P-2 — tier-4 drops the `curl`/`wget` denies that tier-3 has.** Tier 3 denies `Bash(curl *)` and
`Bash(wget *)`; tier 4, the *most permissive* tier, does not. The docs are explicit that a `WebFetch`
domain allowlist provides no network restriction while Bash is allowed. The domain allowlist in
tier 4 is therefore decorative. Whether intentional or a copy-paste omission, the most permissive
tier should carry *more* network restriction, not less.

**P-3 — `Bash(python3 *router.py *)` is a leading-wildcard rule and is broader than it reads.**
A `*` matches any sequence **including spaces**, so this allows any command starting `python3 ` that
contains ` router.py ` anywhere later — for example `python3 /tmp/anything.py --flag router.py x`.
Write the specific invocation instead: `Bash(python3 fractal/router.py *)`, or better, the
`./.venv/bin/python3` form the operational notes actually use.

**P-4 — `Bash(rm -rf *)` in deny only catches that exact flag spelling.** It does not match `rm -fr`,
`rm -r -f`, or `rm --recursive --force`. Deny rules do match past leading assignments and are checked
per-subcommand, so the compound-command case is covered — but the flag-order case is not. Denying
bare `Bash(rm *)` and allowing specific safe removals is the more robust shape.

**P-5 — the tiers are stack-contaminated in the same way the agent definitions were.** Tiers 2–4
allow `npx prisma *`, `npx shadcn@latest *`, and `npm run *`; the tier-4 `autoMode.environment`
declares "Organization: FRACTAL Agent System", "Source control: github.com/shi503/fractal-agent-system",
and "Stack: Next.js 15, TypeScript, Prisma, Supabase". None of that describes this repo, whose control
plane is Python with no build step. This is the same ~25-line contamination class that
`FeatureLead-FractalRegrounding` exists to fix in the agent tier — **the policy tier has it too, and
no workstream currently owns it.**

**P-6 — `Bash(npm run *)` in tiers 3 and 4 is an arbitrary-execution allow.** `npm run` executes
whatever `package.json` defines, so the rule delegates the permission decision to a file in the
target repository. Tiers 1 and 2 correctly enumerate specific scripts; 3 and 4 do not. This is the
same class as the documented `devbox run` trap.

None of these are blocking. P-1 and P-5 are the two worth acting on, and both are cheap.
