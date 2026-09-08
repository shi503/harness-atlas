---
status: DRAFT
title: "Building on Claude Code — the consolidated guide"
tier: reference
project: harness-atlas
source_verified: "2026-08-10"
covers: "Claude Code through v2.1.224 (Week 32, Aug 3–7 2026)"
---

# Building on Claude Code — the consolidated guide

> **Drafted 2026-08-10 by `claude-opus-5`, not yet verified.** Attested, not captured — see [`00-README.md`](./00-README.md).

One opinionated read of the current extension layer, synthesized from the numbered references in this
directory. Written for someone building an agent platform on top of Claude Code rather than someone
configuring it for personal use.

---

## 1. The mental model

Claude Code is an agent loop with **seven insertion points**. Everything you can build reduces to
choosing which one to use:

```
                    ┌─────────────────────────────────────────┐
   session start ──►│ ① instructions   CLAUDE.md, rules       │  always in context
                    │ ② capability     skills, MCP tools      │  descriptions in, bodies on demand
                    └─────────────────────────────────────────┘
                                      │
                                      ▼
   each turn ──────► ③ lifecycle events  ── hooks ──► deterministic side effects & decisions
                                      │
                                      ▼
   each tool call ─► ④ permission layer  ── rules, hooks, managed settings, sandbox
                                      │
                                      ▼
   delegation ─────► ⑤ isolation       subagents, forks, worktrees
                                      │
                                      ▼
   scale ──────────► ⑥ orchestration   agent teams, dynamic workflows, background sessions
                                      │
                                      ▼
   distribution ───► ⑦ packaging       plugins, marketplaces, managed settings
```

**Two properties govern every choice.** *When does it load* determines context cost. *Who enforces
it* determines whether it is a request or a guarantee. Almost every configuration mistake is a
mismatch on one of those two.

---

## 2. The seven rules that matter most

**Rule 1 — If it must hold every time, it is not a prompt.**
CLAUDE.md and skills shape behavior; they do not bind it. The enforcement ladder, cheapest first:
permission `deny` rules → `PreToolUse` hooks → managed settings → sandbox. Only the last binds
arbitrary subprocesses. Writing "never edit `.env`" in CLAUDE.md and calling it a control is the
single most common category error.

**Rule 2 — CLAUDE.md is the only surface with a recurring per-request cost.**
Target under 200 lines. Everything reference-shaped belongs in a skill (loads on demand) or a
path-scoped rule (loads on matching files). `@` imports organize but do not save budget — imported
files load at launch. The `/doctor` trim check will tell you what to cut: anything derivable from the
codebase goes, pitfalls and non-default conventions stay.

**Rule 3 — Precedence is not uniform, and two surfaces are inverted.**
Skills resolve `managed > user > project`. Subagents resolve `managed > CLI > project > user`. A
developer's personal skill silently overrides your committed project skill; a personal *agent* does
not. If distributed capability must be authoritative, `strictPluginOnlyCustomization` in managed
settings is the only mechanism that guarantees it.

**Rule 4 — Isolation is the real value of a subagent, not parallelism.**
The gain is that a subagent's file reads, logs, and search results never enter your window. Two
sharp edges: background is now the **default**, and a background subagent runs with a **narrower
built-in tool set** — silently. The same definition resolves to different tools in the foreground and
the background. And a **fork** shares the parent's prompt cache, so forking is cheaper than spawning
a fresh subagent when the task needs the same context.

**Rule 5 — Move the plan into code when Claude is spending turns on coordination.**
Subagents, skills, and agent teams all keep the plan in a context window. A dynamic workflow puts it
in a script, so intermediate results live in variables and Claude's context holds only the answer.
The threshold is roughly: more than a handful of workers, or the same step across many items, or you
want the orchestration itself to be the reusable artifact. Also — a workflow can apply an
adversarial-verification pattern that a single pass cannot.

**Rule 6 — Package before the second consumer, not after.**
A `marketplace.json` with relative-path sources and `enabledPlugins` in each consumer is smaller than
any hand-rolled sync script, and it gets versioning, SHA pinning, dependency constraints, and
**removal handling** for free. The usual argument — "a marketplace is premature" — treats
distribution as the expensive option. With relative sources it is the cheap one.

**Rule 7 — Instrument before you build a reporting layer.**
OpenTelemetry already emits per-agent, per-skill, per-plugin cost and token attribution, a full
permission-decision audit trail, and (in beta) distributed traces with `agent_id`/`parent_agent_id`
reconstructing the whole agent tree. Set `OTEL_LOG_TOOL_DETAILS=1` or the names you want are redacted.

---

## 3. Choosing the right surface

| You want to… | Use | Not |
|---|---|---|
| State a convention Claude should always know | CLAUDE.md | A skill (won't be loaded when needed) |
| Provide reference material used occasionally | A skill | CLAUDE.md (costs every request) |
| Scope instructions to part of the tree | `.claude/rules/` with `paths:`, or a per-directory CLAUDE.md | One big root file |
| Trigger a repeatable procedure | A skill with `disable-model-invocation: true` | A CLAUDE.md section |
| Guarantee something happens | A hook | A strongly-worded instruction |
| Guarantee something *never* happens | A `deny` rule, then a `PreToolUse` hook for the cases rules can't express | A `PostToolUse` hook (too late) |
| Keep verbose output out of your window | A subagent | The main conversation |
| Reuse a worker configuration | A subagent definition | Re-typing the prompt |
| Give a worker its own checkout | `isolation: worktree` | Coordinating by convention |
| Run many similar tasks | A dynamic workflow | Twenty subagents in one turn |
| Have workers challenge each other | An agent team, or a workflow with adversarial verification | Sequential investigation (anchoring) |
| Reach an external system | MCP | Screen-scraping via Bash |
| Teach Claude to use that system well | A skill alongside the MCP server | A longer tool description |
| Share any of the above across repos | A plugin in a marketplace | Copying files |
| Make it non-negotiable across an org | Managed settings + `strictPluginOnlyCustomization` | Documentation |

---

## 4. A reference setup, by scale

### One developer, one repo

```text
CLAUDE.md                                  # <200 lines: build/test commands, conventions, layout
.claude/settings.json                      # permissions.deny for secrets and generated code
.claude/skills/<workflow>/SKILL.md          # each repeated procedure
```

Add `/run-skill-generator` once so `/run` and `/verify` know how to launch the app.

### A team, one repo

Add:

```text
.claude/rules/*.md                         # topic files, paths:-scoped where possible
.claude/agents/*.md                        # reusable worker roles
.claude/settings.json  → hooks             # lint on edit, block protected paths, log
.claude/workflows/*.js                     # saved orchestrations
```

Commit all of it. Review CLAUDE.md edits in PRs. Add `Read` deny rules for vendored and generated
trees. Install a code intelligence plugin for your language — it usually reduces net context.

### A monorepo

Add per-package `CLAUDE.md` and `.claude/skills/`, and per-package `.claude/settings.json` — noting
that **project settings load only from your starting directory and do not inherit downward**.
Then:

```json
{
  "worktree": { "sparsePaths": [".claude", "packages/api", "packages/shared"],
                "symlinkDirectories": ["node_modules"] },
  "permissions": { "additionalDirectories": ["../shared"],
                   "deny": ["Read(./**/dist/**)", "Read(./**/build/**)"] }
}
```

Use `claudeMdExcludes` in `.claude/settings.local.json` for other teams' packages. Watch skill
discovery: starting from the repo root can accumulate hundreds of skills over a session, and
descriptions get shortened when there are many.

### An estate — several repos, several teams

This is where the packaging layer earns its keep:

1. **One marketplace repository** with `.claude-plugin/marketplace.json` and relative-path plugin
   sources. Private or internal; organization sync handles distribution.
2. **Each consumer repo** declares `enabledPlugins` in its committed `.claude/settings.json` — so a
   clone gets the right capabilities without anyone running an install script, and cloud sessions
   inherit them.
3. **Managed settings** carry the non-negotiables: `permissions.deny`, `allowManagedPermissionRulesOnly`,
   `disableBypassPermissionsMode`, and `strictPluginOnlyCustomization` if capability must come only
   from plugins.
4. **Telemetry** to a collector, with `OTEL_RESOURCE_ATTRIBUTES` carrying team and cost centre.
5. **CI** runs `claude plugin validate --strict` and gates on `system/init`'s `plugin_errors` and
   `mcp_server_errors`.

---

## 5. Enforcement, ordered

Pick the cheapest layer that actually binds.

| Layer | Binds | Cost | Use for |
|---|---|---|---|
| **Permission rules** | Built-in tools + recognized Bash file commands | Nearly zero | Path denies, command allowlists, domain allowlists |
| **Hooks** | The same, plus anything you can decide in a script | Zero context; some latency | Decisions needing input inspection, redaction, logging, gates |
| **Managed settings** | Everything above, non-overridably | Admin deployment | Organizational invariants |
| **Sandbox** | **Arbitrary subprocesses** | OS-level setup | Anything a Python or Node script could otherwise open |

Three traps documented explicitly:

- **Read/Edit deny rules do not cover arbitrary subprocesses.** A script that opens a file itself is
  not stopped. Only the sandbox is.
- **A `WebFetch` domain allowlist does not restrict the network** while Bash is allowed. Deny
  `curl`/`wget` too, or use a hook.
- **Argument-constraining Bash patterns are fragile.** `Bash(curl http://github.com/ *)` misses
  options before the URL, a different protocol, redirects, variables, and extra spaces. And
  environment runners — `devbox run`, `npx`, `docker exec`, `mise exec` — are *not* stripped, so
  `Bash(devbox run *)` permits `devbox run rm -rf .`. Write one rule per inner command.

Note also that hook decisions do **not** bypass rules: a deny still blocks and an ask still prompts
even after a hook returned `"allow"`. But a hook that **exits 2** stops the call before rules are
evaluated, so it beats allow rules. That asymmetry is the documented way to build "allow broadly,
block specifically".

---

## 6. Evaluation — the part most setups skip

The documented framing, which generalizes past skills:

> Seeing a skill trigger tells you Claude found it, not that it did what you intended.

Measure **triggering** and **output quality** separately, both by baseline comparison in a fresh
session — with the capability available, and again with it disabled. A fresh session matters because
context from authoring masks gaps in the written instructions.

The `skill-creator` plugin implements the whole loop and writes real artifacts: `evals/evals.json`
(cases), `grading.json` (assertion results with evidence), `benchmark.json` (pass rate, time, tokens
with-vs-without), plus blind A/B between versions and description tuning that measures
should-trigger / should-not-trigger hit rate. If you are building an evaluation practice, start by
adopting this rather than designing one.

For gating rather than measuring, the primitives are: `TaskCompleted` and `TeammateIdle` hooks (exit 2
rejects a completion and returns feedback), `type: agent` hooks (an agentic verifier with Read/Grep/Glob),
`type: prompt` hooks (a cheap model judge), and `--json-schema` on the result (a typed verdict the
harness validates).

---

## 7. Cost and scale controls

| Lever | Where |
|---|---|
| Route work to cheaper models | Subagent `model:`; a project `Explore` agent with `model: haiku`; `CLAUDE_CODE_SUBAGENT_MODEL` |
| Cap workflow size | `workflowSizeGuideline`: `small` <5, `medium` <15 (default), `large` <50 agents |
| Cap concurrency | `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` (default 20); workflow runtime caps at 16 concurrent, 1,000 total per run |
| Cap nesting | `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` (default 3) |
| Reduce reads | Code intelligence plugin; `Read` deny rules on generated and vendored trees |
| Reduce always-on context | Path-scoped rules; `claudeMdExcludes`; move reference into skills |
| Attribute spend | OTel `claude_code.cost.usage` by `agent.name` / `skill.name` / `plugin.name` |
| See it in-session | `/usage`, `/context`, `/mcp` (per-server token cost) |

Two structural notes. **Agent teams cost meaningfully more than subagents** — each teammate is a full
Claude instance; 3–5 is the documented starting range. And **a workflow that fans out across many
small agents preserves more progress on resume** than one long agent, because replay follows start
order and every agent that started after an unfinished one reruns.

---

## 8. Reproducibility

If you need the same result on every machine — CI, a control plane, a scheduled job:

```bash
claude --bare -p "<task>" \
  --settings ./policy.json \
  --agents '<json>' \
  --mcp-config ./mcp.json \
  --output-format json \
  --json-schema '<result schema>' \
  --allowedTools "Read,Edit,Bash(npm test *)"
```

`--bare` skips discovery of hooks, skills, plugins, MCP servers, auto memory, and CLAUDE.md — so a
teammate's `~/.claude` cannot change the outcome. It is documented as the future default for `-p`. It
also requires `ANTHROPIC_API_KEY` (no keychain, no OAuth).

Then gate CI on the `system/init` event's `plugin_errors` and `mcp_server_errors` — both keys are
**omitted when empty**, so presence is the failure signal. Feature-detect with the `capabilities`
array rather than parsing version strings.

---

## 9. What changed recently, and what it means

From the weekly digests, the extensibility-relevant deltas:

| Week | Change | Why it matters |
|---|---|---|
| 32 (Aug 3–7) | **Cross-session messaging** on macOS/Linux; self-hosted environments in beta; **auto mode becomes the default permission mode** on Pro/Max/Team from Aug 14 | Sessions can pass findings without you re-explaining. The permission-mode default shift changes the baseline every extension assumes |
| 30 (Jul 20–24) | **Claude Opus 5** default, 1M context; `/code-review` runs as a background subagent | Bigger windows change the context-budget calculus |
| 29 (Jul 13–17) | Artifacts call MCP connectors; `/fork` copies a session to a background session | |
| 28 (Jul 6–10) | `/doctor` becomes a full setup checkup that can fix issues | The supported way to diagnose configuration |
| 27 (Jun 29–Jul 3) | **Subagents run in the background by default** | Silently changes the tool set a subagent gets. The single most consequential recent change for anything that dispatches subagents |
| 25 (Jun 15–19) | **`Tool(param:value)` deny/ask matching** (e.g. `Agent(model:opus)`); `/config key=value` | Policy can now gate on tool *parameters*, not just names |
| 24 (Jun 8–12) | Subagents can spawn subagents; `--safe-mode`; `fallbackModel` | Nested delegation became a supported topology |
| 22 (May 25–29) | **Dynamic workflows** ship | Script-held orchestration at 100s-of-agents scale |
| 21 (May 18–22) | `/usage` breaks limits down by skill, subagent, plugin, MCP server | Per-capability attribution in the UI |
| 20 (May 11–15) | **Agent view** (`claude agents`); `/goal` | Background session management |
| 19 (May 4–8) | Plugins load from `.zip` and URLs; **auto-mode hard deny rules**; hooks see effort level | |
| 13 (Mar 23–27) | Auto mode; **conditional `if` hooks** | |

The trajectory is unambiguous: **orchestration, policy, and packaging are being absorbed into the
harness.** Anything built on top of Claude Code should assume that trend continues and should
concentrate its own investment where the harness is structurally unlikely to go.

---

## 10. Where the harness stops

Honest boundaries, useful for anyone deciding what to build:

- **No context provenance.** Nothing records which instruction files, skills, and rules were in the
  window for a unit of work, at what version, with what content hash, owned by whom.
  `InstructionsLoaded` reports *that* files loaded; `plugin_loaded` reports plugin versions. Neither
  hashes, pins, or attributes ownership, and nothing joins either to an outcome.
- **No durable orchestration across process death.** Workflows resume within a session only; exiting
  Claude Code restarts them. Agent teams do not restore in-process teammates on `/resume`. There is
  no saga, compensation, or lease model.
- **No cross-repo impact analysis.** Nothing knows that a change in repo A affects repo B.
- **No retroactive invalidation.** No mechanism lets a later evaluation invalidate an earlier
  accepted result.
- **No organizational standards tier.** There is no native concept of "what good looks like" as a
  versioned, owned, inherited artifact — CLAUDE.md and skills are the substrate, but the inheritance
  contract and ownership model are yours to build.
- **Client-side, not a security boundary.** The docs say this outright about managed settings: a user
  running a modified binary or an older version bypasses any client-side control.

Those six are where a platform built on Claude Code can hold durable ground. Everything else in this
guide is table stakes that the harness either already provides or is visibly moving toward.

---

## 11. The claims, walked against what this set documented

The claim ledger in [`00-README.md`](./00-README.md) records what Anthropic says Claude Code is for.
This walks each claim to the mechanism behind it, in this set.

**This maps; it does not grade.** A row names the document carrying the mechanism, or records that
nothing was found and says what was checked. There is no verdict column, and none is implied — the
corpus grades in one place, and it is not here.

| Claim, abbreviated | Mechanism, and where it is documented |
|---|---|
| *"reads your codebase, edits files, runs commands"* | The built-in tool set, which this set treats as the loop's floor rather than an extension surface — the surfaces in [`01`](./01-extension-surfaces.md) are what changes its behaviour, not what performs it |
| *"integrates with your development tools"* | MCP servers, one of the nine surfaces — [`01`](./01-extension-surfaces.md); permission and scope treatment in [`08`](./08-policy-and-governance.md) |
| *"Available in your terminal, IDE, desktop app, and browser"* · *"Each surface connects to the same underlying Claude Code engine"* | **Not a mechanism this set documents.** Surface parity is a product claim about deployment, and this folder is cut by the extension layer. Checked: the docs index at capture, and each of the eleven pages read. The cross-surface artifacts the claim rests on — `CLAUDE.md`, settings, MCP config — are documented in [`07`](./07-context-and-memory.md) and [`08`](./08-policy-and-governance.md), but their portability across surfaces was not read |
| *"understands your entire codebase"* | `CLAUDE.md` load order, `@` imports, `.claude/rules/` path scoping, auto memory, and monorepo layering — [`07`](./07-context-and-memory.md). Note the shape: this is instruction context assembled by rule, not an index of the repository |
| *"helps you build features, fix bugs, and automate development tasks"* | Automation surfaces: `claude -p`, `--bare`, structured output, stream-json and CI gating — [`10`](./10-programmatic-and-sdk.md) |
| *"handling git workflows"* | Worktrees, covered as an orchestration mechanism — [`05`](./05-multi-agent-orchestration.md). The commit and PR behaviour the claim names is built-in tool behaviour, not an extension surface, and is not documented here |
| *"through natural language commands"* | Skills, which subsume the former custom-command surface — [`02`](./02-skills.md) |
| *"tag @claude on Github"* | **Not documented in this set.** Checked: the docs index at capture and all eleven pages. GitHub Actions and Code Review are product surfaces outside the extension layer this folder cuts by |
| *"composable and follows the Unix philosophy"* | The strongest-supported claim here: `claude -p`, `--output-format json`, `--json-schema`, stream-json, and subprocess invocation from any language — [`10`](./10-programmatic-and-sdk.md) |

**One asymmetry worth naming, and it is about this folder, not about Claude Code.** The claims are
about *what the product does for a developer*; this set is cut by *what a builder can change*. Three
rows above resolve to "not documented here" for that reason alone — they are absences in this folder's
scope, not absences in the harness. A reader testing product claims should read the profile at
[`../claude-code.md`](../claude-code.md), whose 33 rows are cut to answer exactly that.
