---
title: "Harness alignment — Hermes, Pi, OpenClaw, OpenCode and Grok against the thirty-three components"
tier: reference
project: loomwarp
created: "2026-09-02"
status: DRAFT
owner: KD
provenance: DERIVED
extends: spec/v1-framework/00-README.md
---

# Harness alignment — five harnesses against the v1 components

**What this is.** The four harnesses this corpus had only by relayed name — Hermes, Pi, OpenClaw,
and OpenCode — plus **Grok Bot / Grok Build**, asked for by name the same day, read at primary source
on 2026-09-02 and scored against the thirty-three components of
[`specs/v1-framework/00-README.md`](../spec/v1-framework/00-README.md). Every cell traces to a
row in a teardown under [`systems/harnesses/`](../content), and every row there carries a URL,
an access date, and a sourcing mark.

**Why now.** [`00-README.md`](./00-README.md) §3 declined to tear down harnesses because *"the harness
layer is not where LoomWarp competes"* and assessing more runtimes *"would not change a single
function."* That was true of the seventeen-function model. It is not true of v1: the components at
layers 5, 9, 10 and 11 carry `emerging`, `claimed` and `bet` markers whose evidence rule is *two peers
shipping it as a named primitive*, and four of the most-adopted harnesses in the field had never been
asked. This document asks them.

**What it is not.** Not an edit to the framework. v1 is mid-review
([`WALKTHROUGH.md`](../spec/v1-framework/WALKTHROUGH.md)) and its definitions are contested in
places; this file records what the four systems ship and what that *would* do to each marker, and
leaves the marker changes to the framework pass. Where a recommendation is made it is labelled one.

**Notation.** As [`02-component-matrix.md`](./02-component-matrix.md) §1: `●` owns it as a **named
primitive** — [`01-concepts.md`](./01-concepts.md) §3.17, *a minimal, named, composable unit that the
harness makes the single sanctioned way to express something* · `◐` present, not first-class, or
more than one way · `○` absent, checked. Every mark is ✅ direct unless the teardown says otherwise.

---

## 1. Who they are, and whether they are peers

> **Superseded as a rubric, kept as a reference (ruling `2026-09-07-alignment-reference`).** The five
> columns below stop at the 2026-09-02 teardowns; `Genre`, `Language · licence` and `Stars` are now
> read continuously across all eleven harnesses by the DX scorecard at
> [`../spectrums/01-scorecard.md`](../spectrums/01-scorecard.md) — DX-4, DX-6 and DX-5 respectively.
> **This section is not retired.** It is the prose inventory the scorecard compresses, it carries
> findings the scorecard does not (§3.1's argument that genre predicts which components are `●`), and
> it can still generate more. Read it for the argument; read the scorecard for the position.


| | Hermes | Pi | OpenClaw | OpenCode | Grok Bot / Grok Build |
|---|---|---|---|---|---|
| **Owner** | Nous Research | Mario Zechner → Earendil (May 2026) | Peter Steinberger · OpenClaw Foundation | Anomaly (was `sst/opencode`) | SpaceXAI (Bot runs on Cursor account infrastructure) |
| **Language · licence** | Python · MIT | TypeScript · MIT | TypeScript · MIT | TypeScript (Bun) · MIT | Bot: closed, hosted · Build: Rust · Apache-2.0, *"External contributions are not accepted"* |
| **Stars, 2026-09-02** | 239,705 | 100,782 | 388,584 | 203,146 | Build: 26,383 · Bot: n/a |
| **Latest release** | v0.21.0 (2026-08-31) | v0.84.4 (2026-08-28) | v2026.8.2 (2026-09-01) | v1.18.26 (2026-09-01) | Build: no tags, synced 2026-09-01 · Bot: beta since 2026-08-11 |
| **Says it is** | *"The self-improving AI agent"* | *"a minimal terminal coding harness"* | *"an AI assistant that runs on your devices and meets you in the channels you already use"* | *"The open source AI coding agent"* | Bot: *"AI teammates you can give real work to"* · Build: *"SpaceXAI's terminal-based AI coding agent"* |
| **Genre** | personal assistant, channel-first | coding, terminal-first | personal assistant, gateway-first | coding, terminal-first | Bot: hosted teammate, computer-first · Build: coding, terminal-first |
| **Teardown** | [`systems/harnesses/hermes.md`](../content/hermes.md) | [`systems/harnesses/pi.md`](../content/pi.md) | [`systems/harnesses/openclaw.md`](../content/openclaw.md) | [`systems/harnesses/opencode.md`](../content/opencode.md) | [`systems/harnesses/grok.md`](../content/grok.md) |

**The Grok column is a pair, and the pairing is the corpus's, not xAI's.** No primary source says
Grok Bot runs on Grok Build. What is direct: the Build repo ships a `bot.*` relay protocol and a
tool registry exporting `GROK_BOT_TOOL_IDS`, and Build's docs say *"Grok's hosted cloud sandboxes do
not run `grok agent serve`."* Shared plumbing ✅; "Bot runs on Build" ⚠️. Where the two halves score
differently below, the cell takes the stronger half and the teardown row says which.

### 1.1 The inclusion test, run

[`00-README.md`](./00-README.md) §1.4 asks three questions and says a system needs all three to be a
peer rather than an adjacent tool.

| Question | Hermes | Pi | OpenClaw | OpenCode | Grok Bot / Build |
|---|---|---|---|---|---|
| **1 · Persists across sessions?** | ✅ `MEMORY.md`/`USER.md`, SQLite `state.db` with FTS5, agent-authored skills | ✅ session JSONL tree, settings, trust — **no memory feature** | ✅ workspace Markdown, per-agent SQLite, shared `state/openclaw.sqlite`; *"there is no hidden state"* | ✅ SQLite `opencode.db`, snapshots — **no memory feature** | ✅ Bot: per-Bot memory, files, browser sessions (format opaque) · Build: sessions under `~/.grok/sessions/`, memory Markdown + SQLite **off by default** |
| **2 · Serves more than one person?** | ◐ *"single-tenant personal agent"*; Admin/Regular chat tiers; `/etc/hermes/` managed scope; git-shipped profile distributions | ○ one operator; `.pi/settings.json` shareable; experimental multi-client server with no user model | ✅ team gateway with roles, operator scopes, session creator/owner/participants — *"one trust domain"*, not a multi-tenant boundary | ◐ one operator per instance; org config via `.well-known/opencode`, managed settings, MDM; Zen workspaces | ◐ Bot: one computer per member, team/org admin roles, team rules · Build: one operator, fleet `managed_config.toml` + signed `requirements.toml` |
| **3 · Binds mechanically?** | ✅ `approvals.deny` globs, un-bypassable hardline blocklist, blocking `pre_tool_call` (fails closed), sandbox backends | ○ *"No permission popups"*; mechanical only if you install it (`tool_call { block }`, `--tools`, project trust, external sandbox) | ✅ `tools.deny`, exec modes `deny…full`, role-required sandbox, blocking plugin hooks | ✅ `permission` allow/ask/deny, `deny` survives `--auto`, policies, hooks that throw | ✅ Build: `deny` always wins, kernel sandbox, signed pins — **hooks fail open** · Bot: approval cards + model-based Auto Review, *"not a security boundary"* |
| **Passes all three** | no (2) | no (2, 3) | **yes** | no (2) | no (2) |

**And the test does not do what it was built to do.** OpenClaw passes all three and is a harness —
it runs the loop (`runEmbeddedAgent`). The test was calibrated so that *"Claude Code fails (2) as a
layer,"* and it separated harness from process layer only because the harnesses of August 2026 were
single-operator. OpenClaw's team gateway, and Hermes's managed scope, move question 2 into the
harness. **The one question that still separates the two altitudes is the one the test does not
ask: does it run the agent loop.** §4.1 takes this up.

### 1.2 The adapter tell, also broken

§1.3 of the README: *"every system in this category ships an adapter, and you do not write an adapter
for the thing you are."* OpenClaw ships `openclaw migrate claude`, an ACP plugin for eleven-plus
harnesses, `openclaw mcp serve`, and runs Codex and Claude Code as pluggable runtimes. Hermes ships
`hermes import-agent claude-code | codex` and `hermes claw migrate`, and hands `openai/*` turns to the
Codex app-server. **Both write adapters for other harnesses, and both are harnesses** — because both
are *hosts*. The tell held for process layers; it does not hold for gateways. The corpus has
one word doing three jobs, and §4.1 proposes the third.

### 1.3 What travels between harnesses, and what does not

The two migration adapters are the first primary-source evidence in this corpus of **which layers are
portable**. Read side by side:

| Travels | Does not travel | Source |
|---|---|---|
| `CLAUDE.md` → `AGENTS.md`; `~/.claude/CLAUDE.md` → `USER.md`; `.mcp.json` servers; `SKILL.md` skills; commands → skills with `disable-model-invocation` | **Claude hooks · Claude permissions and tool allowlists · `.claude/rules/` · Claude subagents** — named as *not imported* | OpenClaw `migrate claude` |
| instructions → memory; **permissions → allow/deny**; MCP servers; skills | hooks; subagents | Hermes `import-agent claude-code` |
| `CLAUDE.md`, `.claude/rules/`, `.claude/skills/`, `~/.claude.json` MCP, **`.claude/settings.json` permissions *and* hooks** (tool aliases `Bash`→`run_terminal_command`, `Task`→`spawn_subagent`), `.claude-plugin/` marketplaces, `managed-settings.json`; Cursor rules, skills, `mcp.json`, `hooks.json` | `permissions.additionalDirectories` *"parsed but not supported"*; unrecognised tools in rules skipped; Codex cells *"reserved and currently inert"* | Grok Build `[compat.claude]` / `[compat.cursor]` — read live, not migrated |

Layers 3d (context files), 4a (skills) and 2a's MCP config move in all three. Layer 2b (hooks), 2c
(enforcement) and 3c (subagents) are where the three disagree: OpenClaw drops them, Hermes maps
permissions and accepts the hook wire shape, and **Grok Build reads Claude Code's permissions and
hooks whole**, aliasing tool names. So the first version of this finding — *the mechanical layers
are harness-bound* — is too strong. The sharper statement: **the mechanical layers travel exactly as
far as a harness chooses to implement Claude Code's `settings.json` as a format**, and two of the
three now do, in part. The commoditised formats still travel by standard; the mechanical ones travel
by imitation of one vendor. That is the concrete content `F-1`'s portability posture at `0a` was
missing, and it names a de-facto standard the standards layer does not list.

---

## 2. The matrix — thirty-three components, five harnesses

Read with [`02-component-matrix.md`](./02-component-matrix.md): that grid is process layers across
eighteen concept rows; this one is harnesses across the v1 component set. The columns are a
different axis and are not merged, per the genre rule in
[`2026-08-research/06-frameworks-addendum.md`](./2026-08-research/06-frameworks-addendum.md) §0.

> **Codex column added 2026-09-03**, per [`W4-teardowns.md`](../fractal/workstreams/W4-teardowns.md)
> (Codex first in the queue: *"two systems in the corpus embed its app-server as a runtime"*). Every
> cell traces to [`content/codex.md`](../content/codex.md) §B; no existing column was re-scored.
>
> **Gas City column added 2026-09-03** (W4 #2). Every cell traces to
> [`content/gas-city.md`](../content/gas-city.md) §B; no existing column was re-scored. Unlike the six
> columns beside it, Gas City is not itself a **runtime** — its altitude is gateway/host (§4.1) — so
> several rows read as its *analogue* rather than a like-for-like instance: 3a Control is
> dependency-gated dispatch, not an interactive approval gate; 2c Enforcement is trust-boundary policy
> over operator-configured commands, not a sandbox around an agent's own tool calls. Marked ◐ rather
> than ● where the row's chat-harness framing does not transfer cleanly; see `content/gas-city.md` §B's
> per-row notes and the Skill findings in its HANDOFF.
>
> **LoomWarp column added 2026-09-03** (W4 #3). Every cell traces to
> [`content/loomwarp.md`](../content/loomwarp.md) §B; no existing column was re-scored. LoomWarp's
> altitude is **process layer**, one step further from a runtime than Gas City's gateway/host: it does
> not drive other harnesses' loops in general, it installs *into* exactly one (Claude Code), by copying
> agent and skill files into that harness's own convention. Rows read as thinner analogues even where
> the mechanism is real — 3a Control is a model-free dependency resolver plus a markdown-regex outcome
> classifier, not an approval gate or a completion contract; 2c Enforcement is four permission-tier
> files, one wired, bypassed on the one live run. Several `○`s below are the product's own recorded
> absences (`content/loomwarp.md` §B), not this table failing to find something that exists.
>
> **FRACTAL column added 2026-09-03** (W4 #4). Every cell traces to
> [`content/fractal.md`](../content/fractal.md) §B, graded against the commit LoomWarp itself vendors
> (`6398f6db`) — not against `content/loomwarp.md`'s own column, which is LoomWarp's *federated* build
> on top of this substrate and scores higher in several rows FRACTAL itself ships nothing for (5b Team
> Memory, 6c Estate, 8c Observability, 8d Efficiency, 10b Org — all LoomWarp-only additions over the
> vendored router). FRACTAL's altitude is process layer, same as LoomWarp, one step thinner still: no
> subprocess dispatcher of its own (a human or an already-open session runs every `claude` invocation
> by hand), no event log, no per-dispatch budget cap. Its two strongest rows are 7a Workflow Tasks (the
> workstream/PRD pair, the primitive the whole design protects) and 9d Anti-fragile Lifecycle
> (`ISSUES.md`, which — corrected from this corpus's own prior framing — ships at the vendored commit
> itself, not as a later addition by either downstream fork).
>
> **Claude Code column added 2026-09-04**, Template v2. Every cell is a verbatim copy of
> [`content/claude-code.md`](../content/claude-code.md) §4; no existing column was re-scored. Claude Code
> is the one column in this table that is itself a runtime rather than something installed into or
> hosting one — LoomWarp and FRACTAL's altitude notes above describe their relationship *to* this
> column, not a peer reading of it.

**Every column below is a verbatim copy of that harness's own profile §4 (or, pre-Template-v2, its
teardown §B); the profile is the source of truth and this grid does not re-derive a mark.**

| | Component | v1 horizon | Hermes | Pi | OpenClaw | OpenCode | Grok | Codex | Gas City | LoomWarp | FRACTAL | Claude Code | What the row shows |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **0a** | Substrate | `shipped` | ● | ● | ● | ● | ● | ● | ● | ◐ | ◐ | ● | Model-pluggable in all four; Hermes and OpenClaw add per-task **auxiliary/utility model slots**; OpenClaw adds a **runtime** slot beside the model. LoomWarp is Claude-Code-only, model chosen per agent role, no adapter — its own spec marks portability **undecided** |
| **1a** | Environment | `bet` | ◐ | ○ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | Hermes `terminal.backend` (7 options) and OpenClaw `tools.exec.host` declare *where shell runs*; OpenCode `references` declares *which other repos exist*. None declares the inventory of systems a team reaches. Adjacent, not against. LoomWarp's `registry/repositories.yaml` is the same shape at one further remove — two repos, no shell/network inventory |
| **2a** | Adapters & Middleware | `shipped` | ● | ● | ● | ● | ● | ● | ● | ◐ | ○ | ● | MCP client in 3 of 4 — Pi refuses it. ACP in 3 of 4 (see §3.4). LoomWarp's one adapter is a CLI invocation (`claude -p ...`) — no MCP, no ACP |
| **2b** | Hooks | `shipped` | ● | ● | ● | ● | ● | ● | ● | ○ | ○ | ● | ~45 · ~40 · ~45 · 21 named events. **All four are code hooks** (Python/TS); only Hermes also takes shell hooks. LoomWarp ships none of its own — checked `.claude/settings.local.json`, `policy/*.json` |
| **2c** | Enforcement | `shipped` | ● | ◐ | ● | ● | ● | ● | ◐ | ◐ | ◐ | ● | Pi's ◐ is by declaration: *"Run in a container, or build your own confirmation flow."* LoomWarp's four risk-tier files are real Claude-Code-shaped deny lists, one wired — but the one live dispatch bypassed all of them (`--permission-mode bypassPermissions`), its own code comment naming the gap |
| **3a** | Control | `shipped` | ● | ◐ | ◐ | ● | ● | ● | ◐ | ◐ | ◐ | ● | Hermes `/goal` with `gate add <command>` is a **completion contract with deterministic gates**. LoomWarp's `router.py`+`dispatch.py` is genuinely model-free dependency resolution, but the terminal classifier is a regex over a HANDOFF's markdown table — the exact anti-pattern its own evaluation doctrine names |
| **3b** | Routing | `emerging` | ● | ○ | ● | ◐ | ◐ | ◐ | ● | ○ | ○ | ◐ | Two new named objects for *message → agent*: Hermes `gateway.profile_routes`, OpenClaw `bindings[]` with a published specificity ladder. LoomWarp's routing is static, author-time BLUEPRINT fields — no resolver, no roster to resolve against |
| **3c** | Composition | `emerging` | ● | ◐ | ● | ● | ● | ● | ◐ | ◐ | ◐ | ● | Two shapes now visible: **agent-as-file** (OpenCode `agents/*.md` with `mode:`; Pi's example; Claude Code) vs **agent-as-directory** (Hermes profile; OpenClaw workspace + `agentDir`). LoomWarp ships five agent-as-file role definitions but the composition runtime itself is Claude Code's, not its own |
| **3d** | Configuration | `shipped` | ● | ● | ● | ● | ● | ● | ● | ◐ | ◐ | ● | `AGENTS.md` and `CLAUDE.md` read by 4 of 4. **Managed scope** in 3 of 4. LoomWarp's BLUEPRINT explicitly splits router-read vs. dispatch-only fields, but has no managed/org-override layer of its own |
| **3e** | Standards | `bet` | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ● | ○ | ◐ | Holds for every runtime. **LoomWarp is the one column that ships it**: seven guides, ~930 lines, a stated three-tier inheritance contract (*"reference never copy, tighten never contradict"*) — the strongest single row in this table for LoomWarp, and the one no runtime beside it has an answer to |
| **4a** | Capability | `shipped` | ● | ● | ● | ● | ● | ● | ● | ◐ | ● | ● | `SKILL.md` / Agent Skills in 4 of 4. LoomWarp ships seven skills, distributed by a `cp -r` sync script with a documented removal defect — present, not first-class |
| **4b** | Capability Permissions | `emerging` | ● | ◐ | ● | ● | ● | ● | ◐ | ○ | ○ | ● | Five peers now, four words: `toolset` · `tool policy` · `permission` · QM keychain · Indigo profile. LoomWarp has none — its permission tiers gate actions, not who may invoke a skill |
| **5a** | Individual Memory | `emerging` | ● | ○ | ● | ○ | ● | ● | ◐ | ○ | ○ | ● | **The genre split** (§3.1). LoomWarp's own spec defers this layer to Claude Code's native default and names it explicitly as a layer a personal stack may diverge on |
| **5b** | Team Memory | `emerging` | ○ | ○ | ◐ | ○ | ○ | ○ | ◐ | ◐ | ○ | ◐ | OpenClaw: shared-workspace dreaming and a memory-provenance table. LoomWarp's `context/memory/decision-ledger/` is a real, schema-validated ADR store with a CLI — genuine, if small (five ADRs) |
| **5c** | Knowledge | `shipped` | ◐ | ○ | ● | ○ | ◐ | ◐ | ○ | ○ | ○ | ◐ | OpenClaw `memory-wiki`: *"structured claims with evidence, provenance."* LoomWarp has nothing distinct from its context fabric and decision ledger — checked and confirmed absent |
| **6a** | Product | `bet` | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | [○](../content/claude-code.md#6a-product) | Holds, 4 × ○, and holds for LoomWarp too — no statement of what its own output may not become was found |
| **6b** | Infrastructure | `emerging` | ● | ◐ | ● | ◐ | ● | ● | ● | ◐ | ○ | ● | Hermes `terminal.backend`; OpenClaw `sandbox` + `node` + `cloud worker` + `fleet`. LoomWarp is local subprocess execution only, wall-clock-timeout-wrapped, no container or remote layer |
| **6c** | Estate | `emerging` | ◐ | ○ | ◐ | ◐ | ○ | ◐ | ◐ | ◐ | ○ | ◐ | Worktrees in three; OpenCode `references` is the nearest thing to a declared estate. LoomWarp's `registry/repositories.yaml` is a real, if two-entry, inventory schema — and it omits the control repo itself (a named open defect) |
| **6d** | Delivery | `bet` | ◐ | ○ | ○ | ◐ | ◐ | ◐ | ◐ | ○ | ○ | ● | OpenCode's GitHub Action / GitLab component opens PRs from a comment — the strongest ◐. LoomWarp has no CI/CD of its own — `find .github` is empty; its `ci-cd.md` guide is doctrine, not a wired gate |
| **7a** | Workflow Tasks | `emerging` | ● | ○ | ◐ | ◐ | ◐ | ◐ | ● | ● | ● | ◐ | Hermes **kanban** *"owns lifecycle truth."* LoomWarp's **work contract** (a BLUEPRINT entry + PRD) is the one object its own current spec names as a surviving, concrete primitive — the strongest `●` in this column |
| **8a** | Evals | `shipped` | ◐ | ◐ | ◐ | ○ | ◐ | ◐ | ○ | ◐ | ◐ | ◐ | All dev-facing. LoomWarp's own evaluation doctrine specifies a genuine five-layer model, but the shipped classifier is the markdown-regex anti-pattern that doctrine names and rejects — doctrine real, mechanism contradicts it |
| **8b** | Evidence | `shipped` | ● | ● | ● | ◐ | ● | ● | ● | ◐ | ◐ | ● | Pi's session JSONL tree is a receipt with `usage`/`cost` per entry. LoomWarp's `context/evidence/<workstream>/` is real and populated at run time, but only for the handful of workstreams actually dispatched |
| **8c** | Observability | `shipped` | ● | ◐ | ● | ◐ | ● | ● | ● | ◐ | ○ | ● | OTLP in three. LoomWarp's `events.jsonl` is real (13 lines, 3 event types) but unschema'd — by its own standards doc's rule, *"a log, not evidence"* |
| **8d** | Efficiency | `emerging` | ● | ◐ | ● | ◐ | ● | ◐ | ◐ | ◐ | ○ | ● | Compaction and cost display in all four. LoomWarp has one crude per-dispatch spend cap (`--max-budget-usd`, default 5, explicitly "not a measured value" per its own docstring), no aggregate accounting |
| **9a** | Learning | `emerging` | ● | ○ | ● | ○ | ● | ◐ | ○ | ○ | ○ | ◐ | Genre split again. LoomWarp's own spec marks this layer *"designed only"* — no promotion mechanism found |
| **9b** | Rituals | `emerging` | ◐ | ○ | ◐ | ○ | ◐ | ○ | ○ | ○ | ○ | ◐ | Machine rituals only. LoomWarp has none — no cron, standup, or retro object of its own |
| **9c** | Cadence | `shipped` | ● | ○ | ● | ○ | ● | ○ | ● | ○ | ○ | ● | Hermes cron with an `executions.db` attempt ledger. LoomWarp's dispatch is manually invoked only — no scheduler |
| **9d** | Anti-fragile Lifecycle | `bet` | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ● | ● | [○](../content/claude-code.md#9d-anti-fragile-lifecycle) | Recovery everywhere — restart resume, failover, doctor — and no closed improvement loop, until LoomWarp: `fractal/ISSUES.md` is a genuine append-only defect ledger, eight dated entries with severity, root cause and required fix — the second `●` in this column |
| **9e** | Raise the Floor | `bet` | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ | The row asks how a second way gets retired. LoomWarp's `standards/` and `fractal-init` skill are real starting templates; no retirement mechanism for a second way once it appears |
| **9f** | Diagnose the Bottleneck | `bet` | ◐ | ○ | ◐ | ○ | ◐ | ○ | ◐ | ○ | ○ | ◐ | OpenClaw ships a **maturity scorecard for itself**. LoomWarp has nothing — its own spec calls this function unprovided by anyone, field-wide, and that held for its own instance on this pass too |
| **10a** | Roster | `emerging` | ● | ○ | ● | ◐ | ● | ◐ | ● | ◐ | ◐ | ◐ | Hermes Bot Mode: *"a roster of named Bots."* LoomWarp ships five role files (`.claude/agents/`) — real, though its own field-level analysis calls this function unprovided by anyone, itself included; recorded as a tension, not resolved (`content/loomwarp.md` §F) |
| **10b** | Org | `claimed` | ◐ | ○ | ● | ◐ | ● | ◐ | ◐ | ◐ | ○ | ◐ | **OpenClaw ships it.** LoomWarp's `people.yaml` is a thin (two-entry) but real, mechanically validated RACI registry inside its decision ledger |
| **11a** | Surfaces | `emerging` | ● | ◐ | ● | ● | ● | ● | ● | ◐ | ◐ | ● | 35 and ~30 channel docs in the assistants. LoomWarp is CLI-only — headless dispatch or a human-run second window — with markdown (HANDOFF/PULSE) as the surface of record |

**Column totals** (● / ◐ / ○): Hermes 20 / 10 / 3 · Pi 6 / 11 / 16 · OpenClaw 20 / 10 / 3 ·
OpenCode 10 / 13 / 10 · Grok 19 / 10 / 4. **Codex 14 / 13 / 6** — added 2026-09-03, not part of the
2026-09-02 read the rest of this total sentence describes; full sourcing at
[`content/codex.md`](../content/codex.md) §B. **Gas City 13 / 14 / 6** — added 2026-09-03 (W4 #2);
full sourcing at [`content/gas-city.md`](../content/gas-city.md) §B. Its total sits in the same range
as the six runtimes beside it despite the altitude difference — a process layer/host that drives
someone else's loop still fills most of the same rows, just with an analogue rather than an instance
in several of them (see the note above the table). **LoomWarp 3 / 19 / 11** — added 2026-09-03 (W4 #3);
full sourcing at [`content/loomwarp.md`](../content/loomwarp.md) §B. The lowest `●` count in the
table, and the three are not the three a runtime would earn: `3e` Standards (unclaimed by every
runtime beside it), `7a` Workflow Tasks (the work contract — its own spec's one surviving named
primitive), and `9d` Anti-fragile Lifecycle (the ISSUES ledger) — all team-process rows, none a loop
row, which is the expected shape for a process layer one altitude below Gas City's gateway/host.
**FRACTAL 3 / 11 / 19** — added 2026-09-03 (W4 #4); full sourcing at
[`content/fractal.md`](../content/fractal.md) §B, graded at the commit LoomWarp vendors, not at
LoomWarp's own federated build. The same three `●`s as LoomWarp (`7a`, `9d`) minus `3e` Standards
(unclaimed at the pinned commit — since added upstream, out of this table's pinned scope) plus `4a`
Capability (seven first-class skills shipped once, no ongoing sync mechanism to carry a removal
defect). More `◐` and fewer `○` than LoomWarp's column: FRACTAL's own thin mechanisms (a model-free
resolver with no completion classifier at all, four-layer eval doctrine with no coded gate) read as
present-but-not-first-class more often than they read as fully absent — LoomWarp's federated additions
(an event log, a budget cap, a people registry) are exactly the rows that flip FRACTAL's `◐`s or `○`s
to LoomWarp's own thin `◐`s, which is the expected shape for a fork adding real, if small, mechanisms
on top of a substrate that ships almost none. The totals are not a ranking — the next section is about
why the shapes differ. The Grok column reads high because it is a pair: Build supplies the loop-side
`●`s (2b, 2c, 3a, 3d, 4b, 8b, 8c) and Bot supplies the team-side ones (5a, 9a, 9c, 10a); neither
half alone would score the way the pair does, which is the genre split of §3.1 inside one vendor.
**Claude Code 17 / 14 / 2** — added 2026-09-04, Template v2; full sourcing at
[`content/claude-code.md`](../content/claude-code.md) §4. The highest `●` count among the runtimes,
and unsurprisingly so: it is the substrate LoomWarp and FRACTAL both install into, so rows that read
thin or absent for them (3e Standards, 8c Observability, 8d Efficiency) read `●` here at first hand.
Its two `○`s are 6a Product (holds for every column in this table) and 9d Anti-fragile Lifecycle — no
defect ledger or post-mortem object was found in the harness itself, which is the inverse of LoomWarp
and FRACTAL's strongest row.

**Grok cells worth reading before the totals.** `3d` — three config files *"written by different
people"* (user · fleet · signed pin), the clearest published statement of *where opinion attaches and
who may attach it*. `2c` — kernel sandbox where `deny` *"always wins … regardless of order or
source"*, beside hooks that **fail open**. `8d` — `/goal --budget <tokens>` and workflow
`agent_budget`, the first budget-shaped object in this read (§3.8). `9a` — Bot's
**teach-by-demonstration**: a recorded browser session becomes a draft skill the user reviews.
`10b` — Bot's member / team admin / org admin roles and Build's config-ownership tiers, the second
peer at that row (§3.5). `3c` — agents *and* personas *and* roles, three composition objects where
the row wants one.

---

## 3. Findings

### 3.1 The upper layers populate from the assistant genre, not the coding genre

Sort the 33 rows by which pair scores them. Hermes and OpenClaw hold the `●`s at **5a, 9a, 9c, 10a,
10b, 11a** — memory, learning, cadence, roster, org, surfaces. Pi and OpenCode hold **3c** (the
agent file) and **6d** (PR flow), and Pi holds **8b** (the session as receipt). The coding pair is
explicit that the assistant rows are out of scope: Pi's refusal list; OpenCode with no memory, no
cadence, no rituals and no non-goals section. **Grok reproduces the split inside one vendor**: Bot
carries memory, routines, roster and teach-by-demonstration; Build carries hooks, sandbox, plan mode
and the config ladder, with memory *"experimental and disabled by default"* and scheduling that
*"auto-expire[s] after 7 days"* and dies with the session.

**What this does to v1.** The framework says it *"assumes a team whose deliverable lives in version
control"* and that its layer 5/9/10/11 citations are *"from software."* After this read, the
strongest **shipped** evidence for those layers comes from two personal assistants whose deliverable
is a chat reply. The layers are real — corroborated more, not less — but the citation base for the
top of the stack is now split by genre, and the framework's boundary paragraph should say so. The
sharper version: **coding harnesses ship the loop's guardrails; assistant harnesses ship the
team-shaped objects.** A team-scale coding harness has to take from both.

### 3.2 Rule 2 is now stated by the vendors, in their limitation registers

*"If it must hold every time, it is not a prompt"* — the framework's own line for the 2c/3e split —
appears in four primary sources this week, in the vendors' words:

- OpenClaw: internal hooks *"do not block, cancel, or rewrite the operation"*; the `AGENTS.md`
  `## Tools` section *"does not control tool availability; it is only guidance"*; memory *"does not
  enforce policy."*
- Hermes: *"nothing inside the agent process constitutes containment — not the approval gate, not
  output redaction, not any pattern scanner."*
- Pi: project trust *"is not a sandbox and it does not restrict what the model can ask tools to do."*
- OpenCode: *"Explicit `deny` rules are still enforced"* under `--auto`.
- Grok Build: *"Allow rules are not a closed allowlist"*; the read-only command list is *"a
  convenience, not a security boundary"*; and — the line the others do not have — *"Hooks fail open.
  If a hook script crashes, times out, or is missing, the tool call proceeds as if the hook had
  allowed it."* Hermes's default is the opposite (`fail_closed`, and *"timeout fails closed (blocks
  tool)"*). **The failure default of a blocking hook is a disagreement between shipped harnesses**,
  and it belongs in `2c`'s row as a named one: the same mechanism is a gate in one system and a
  suggestion in another, decided by what happens when the script does not answer.
- Grok Bot: *"Do not use separate Bots as a security boundary"*; Auto Review *"is model-based and
  should complement, not replace, least privilege."*

And once from outside the vendors, in an operator's words — Tom Crawshaw's Hermes walkthrough
(2026-08-24, [`systems/harnesses/hermes.md`](../content/hermes.md) §G, ◐): *"An approval waits
for your answer while a hook applies a rule that you set in advance and can block on its own"*, and a
hook *"does that in a shell. It's not a prompt that gets injected."* The same example, too: block
`.env` from entering the conversation. The rule has reached the people who install these things.

OpenClaw goes further and **types the distinction**: two hook tiers, one observe-only by construction,
one that returns `{ block: true }`. That is the 2b/2c boundary as an API, and it is the strongest
external corroboration the split has. It also confirms pattern #10 in [`00-README.md`](./00-README.md)
§5 — *the stated-limitation register* — as the place where a vendor's prose/mechanism line is most
honestly drawn. Three of the four have one; OpenCode does not.

### 3.3 Primitive-set discipline: Pi subtracts, OpenClaw accommodates

[`02-component-matrix.md`](./02-component-matrix.md) §1: *"The count is small everywhere — five to seven
… A set that grows without bound is a feature list wearing the word."* The four sets:

| System | Named primitives | Count |
|---|---|---|
| **Pi** | extension · skill · prompt template · theme · **pi package** · session tree · settings · context file | 8 (+3 supporting) |
| **OpenCode** | agent · command · skill · plugin · tool · permission · rules · MCP server | 8 (+ `references`, `policies`) |
| **Hermes** | profile · `SOUL.md` · skill · memory · toolset · plugin · hook · cron job · context file · kanban task | 10 |
| **OpenClaw** | gateway · agent · workspace files · channel + binding · skill · plugin · hook · tool policy / exec approvals / sandbox · automation / heartbeat · node · session · agent runtime | 12+ |
| **Grok Build** | project rules · skill · plugin / marketplace · hook · MCP server · permission rule / mode · sandbox profile · agent / persona / role — plus `config.toml` · `managed_config.toml` · `requirements.toml` | 8 (+3 files, +5 second-tier) |
| **Grok Bot** | Bot · Computer · skill · routine · plugin / connector · approval / auto-review rule | 6 |

**Pi's set is the disciplined one, and the discipline is subtraction.** Six things it will not ship,
each pushed to the extension layer, and one meta-primitive — the pi package — that makes four resource
types travel as one unit. That is pattern #3 in [`00-README.md`](./00-README.md) §5, *thin harness, fat
skills*, shipped as a product rather than stated as a rule.

**OpenClaw's set shows the failure the rule warns about, at `7a`.** Background tasks, task flows,
goals, standing orders, standing intents, and a workboard — six task-shaped objects, each documented,
none the single sanctioned way. Its own docs concede the overlap (*"A goal is not a task queue"*;
the workboard *"is not a replacement for GitHub Issues, Linear, Jira"*). The `◐` in the matrix is
that concession. Hermes, by contrast, ships one — the kanban — and names it the owner of *"lifecycle
truth"*, with worker lanes that *"never own that truth."* That sentence is a source-of-truth
declaration of the kind `11a` asks for, and it is the cleanest one in this read.

### 3.4 What converged at the file level

Counted across the four teardowns:

| Object | Hermes | Pi | OpenClaw | OpenCode | Grok Build | Count |
|---|---|---|---|---|---|---|
| Reads `AGENTS.md` | ✅ | ✅ | ✅ | ✅ | ✅ | 5 |
| Reads `CLAUDE.md` | ✅ | ✅ | ✅ (migrates) | ✅ | ✅ (+ `CLAUDE.local.md`) | 5 |
| `SKILL.md` / Agent Skills standard | ✅ | ✅ | ✅ | ✅ | ✅ | 5 |
| Reads `.agents/skills/` | ✅ | ✅ | ✅ | ✅ | ✅ | 5 |
| Reads `.claude/skills/` | ✅ (import) | ✅ | ✅ (migrate) | ✅ | ✅ | 5 |
| Reads `.claude/settings.json` permissions / hooks | ◐ (permissions mapped; hook wire shape) | ○ | ○ (dropped) | ○ | ✅ both, with tool aliases | 1 + 1 partial |
| MCP client | ✅ | ○ refused | ✅ | ✅ | ✅ | 4 |
| **ACP** (Agent Client Protocol) | ✅ server | ○ (RPC/SDK instead) | ✅ client, 11+ harnesses | ✅ server | ✅ server (stdio / WebSocket / relay) | 4 |
| Code-level lifecycle hooks | ✅ | ✅ | ✅ | ✅ | ○ — command / HTTP handlers in JSON, the Claude Code shape | 4 |
| `SOUL.md` · `MEMORY.md` · `USER.md` | ✅ | ○ | ✅ | ○ | ◐ `MEMORY.md` only | 2, by lineage |
| `AGENTS.override.md` | ✅ | ✅ | ○ | ○ | ○ | 2 |
| Managed / org-enforced config | ✅ | ○ | ✅ | ✅ | ✅ fleet file + signed pins + MDM | 4 |

Two things the corpus did not have. **ACP is a layer-2 standard now** — four of five ship it, and it
is the protocol at exactly the seam §4.1 describes (a host driving a runtime). It is absent from the
standards list in [`00-README.md`](./00-README.md) §2 and from
[`2026-08-research/05-standards-layer.md`](./2026-08-research/05-standards-layer.md); it should be added
with a date. And **the assistant file-set converged by copying, not independently** — Hermes ships a
migration from OpenClaw and adopted its file names. The `shipped` rule wants two peers; whether two
peers with a migration path between them count as two is a question the horizon rule does not
answer, and `5a` is where it bites.

### 3.5 `10b` Org has a shipped implementation

The v1 marker is `claimed` — *"named publicly, no shipped implementation"* — citing Chan's *Identity
Binding* and AAIF's Identity & Trust working group. OpenClaw ships, at source:

- an immutable session **creator** and an assignable **owner**, *"in the style of a GitHub issue
  assignee"*;
- **roles** with `sessions: none | view | suggest | write`, bound per user;
- **operator scopes** (`operator.read / write / admin / approvals / …`);
- escalation rules — as prose, in standing orders;
- and the honest caveat: *"Session ownership, visibility, and presence are usability features, not
  security boundaries."*

Hermes ships a thinner version: Admin/Regular chat tiers, a managed scope an ordinary user *"cannot
override,"* and kanban `assignee` / `request_review`.

**Grok is the second peer, and it answers the row's other half.** `10b` asks *who answers for this,
and who may change it*. OpenClaw answers *who answers* (the session owner). Grok Build answers *who
may change it*, as an artifact: *"Three files configure Grok Build, and they are written by different
people"* — the user's `config.toml`, the fleet's `managed_config.toml`, and a **signed
`requirements.toml`** whose pins (`allowed_models`, `disable_bypass_permissions_mode`, version floors)
*"users cannot override."* Grok Bot adds member / team admin / organization admin roles, with the
explicit rung that *"team admin rights are not enough"* to remove a computer.

**Recommendation, for the framework pass:** `10b` moves `claimed → emerging`, with two peers and the
disagreement recorded — OpenClaw's *owner* is a property of a **session**, Grok's is a property of a
**configuration file**, and Hermes's is a property of a **board**. Three objects, no shared word; the
horizon rule's definition of `emerging` exactly. It allows an upgrade only on new citations; these are
new.

### 3.6 Evidence is converging on content-free ledgers — which is the provenance claim's best news

`F-4` in [`00-README.md`](./00-README.md) narrowed the headline claim to the **join** between what an
agent saw and what came of it. Two of the four ship an audit ledger, and both exclude content **by
design**:

- OpenClaw's audit ledger *"never stores prompts, message bodies, tool arguments, tool results"* —
  metadata only, 30-day cap.
- Hermes's monitoring plane is *"content-free by construction."*

Grok Build is the third, with a switch: its external OpenTelemetry stream is *"content-free by
default"*, and four gates — `OTEL_LOG_USER_PROMPTS`, `OTEL_LOG_ASSISTANT_RESPONSES`,
`OTEL_LOG_TOOL_DETAILS`, `OTEL_LOG_TOOL_CONTENT` — turn content on per class. Its events include
`skill_activated`, `plugin_loaded`, `permission_mode_changed` and `compaction`, which is closer to
*what was loaded* than any other stream here; there is still no manifest of what was loaded, and
Grok Bot's *"audit view of Bot actions is coming."*

Pi's session tree is the opposite — everything, per entry, with cost — but it is one process's
transcript with no owner attribution and no versioned manifest of what was loaded. **Nobody in this
read holds the join**, and two of them have built a ledger that structurally cannot, while a third
has built one that can be switched to carry content and still does not carry the join. That leaves
the narrow claim standing, dated 2026-09-02.

One new item for the §6 re-check table: OpenClaw's `memory-wiki` compiles *"structured claims with
evidence, provenance"* and its memory-provenance page *"tracks entry origins per agent/session."*
That is provenance on the **memory** side — where a fact came from — not the **run** side — what a
run saw. It is the nearest new thing to the claim and should be watched.

### 3.7 The maturity diagnostic has a shipped sibling, aimed the other way

`F-5` calls the maturity diagnostic a wedge and notes `kodustech/agent-readiness` as a repo-grader.
OpenClaw ships a **maturity scorecard** for itself: fifty surfaces, 280 capability areas, bands
*Experimental / Alpha / Beta / Stable / Clawesome*, a taxonomy *"Surfaces > categories > capabilities
> evidence"*, and coverage *"deliberately evidence-led"* from QA scenario IDs. It grades the product,
not a team, so it is not competition for the Grid. It is the same *shape* — a grid of named surfaces
with evidence-gated bands — and it is the first one in this corpus that a vendor publishes about
itself. Worth citing at `9f` as the nearest shipped artifact, and worth reading for the
evidence-gating rule.

### 3.7b The operator's rituals, seen once

One practitioner source was read beside the five vendor sources — a forty-minute Hermes walkthrough
by a consultant who runs it for clients ([`systems/harnesses/hermes.md`](../content/hermes.md)
§G, all ◐). It changed no cell. What it showed is that the rows the vendors leave thin, the operator
fills by hand: a **handoff document** written at 40–60 % of context because the harness's own
compaction fires too late for his taste (ACE-FCA's *intentional compaction*, arrived at
independently); a **startup-context audit** on day one because loaded tools and skills took 15–20 %
of the window before the first prompt; **model routing written into `AGENTS.md`** because the
harness has no *by-kind-of-work* route, only by pipeline stage; and a **human as an assignee** on the
same kanban board as five agent profiles, with the approval step as a column. Each is a `9b` ritual
standing in for a primitive the harness does not have. That is the framework's claim about layers 5
and above, observed in one operator's setup rather than argued — and it is one source, so it is
recorded here and not promoted.

### 3.8 `8d`: five more systems, one budget — and it is a token budget on a goal, not a spend cap

Every one of the five shows tokens and cost; two compute dollars from provider price tables; none
lets a team set a **spend** ceiling that stops a run — Grok Bot says so directly: *"No per-product
spend cap exists yet."* The one budget-shaped object in the read is Grok Build's: `/goal <objective>
--budget <tokens>` and a workflow `agent_budget` (default 128, range 1–1024). It bounds a **unit of
work** in tokens, not a team in dollars, and it lives at `3a` (the goal contract) as much as at `8d`.
The teardowns checked configuration, environment variables and CLI references and record the
absences rather than infer them. The
[`02-harness-taxonomies.md`](./2026-08-research/02-harness-taxonomies.md) §3 finding — cost accounting
is a slot no taxonomy names — now has a shipped-harness corollary: **the field instruments cost, and
where it bounds anything it bounds tokens per task, not money per team.** `8d`'s `emerging` marker
holds; the disagreement about the unit (per agent, per skill, per seat) is now joined by a
disagreement about whether the number is a gauge or a limit, and by one system that limits at a
different altitude from the one the row asks about.

---

## 4. What this does to the corpus

### 4.1 A third altitude, and a word for it

[`00-README.md`](./00-README.md) §1.2 found *harness* naming two layers — QM is *"a harness"* that runs
Pi, OpenCode and Claude Code — and §1.3 named the upper one *process layer*. This read finds the same
collision **inside the harness tier**: OpenClaw hosts Codex, Claude Code and eleven ACP harnesses;
Hermes hosts the Codex app-server. The field has a word for the thing underneath, and OpenClaw's docs
supply it:

> An **agent runtime** *"owns one prepared model loop: it receives the prompt, drives model output,
> handles native tool calls, and returns the finished turn."* A harness is *"the implementation that
> provides an agent runtime (code term)."*

So, as a proposal for the concepts pass, three altitudes rather than two:

| Altitude | Runs the loop? | Ships adapters? | Examples |
|---|---|---|---|
| **Process layer** | no | yes, into harnesses | gstack, Gas City, Indigo, SageOx, FRACTAL, LoomWarp |
| **Gateway / host** | yes, its own — *and* others' | yes, for runtimes | OpenClaw, Hermes, QM |
| **Runtime** | yes, one | reads others' files; exposes ACP/SDK | Pi, OpenCode, Claude Code, Codex app-server, **Grok Build** |
| **Hosted product** (loop not user-visible) | presumably — cannot be read | consumes MCP / connectors; exposes nothing | **Grok Bot**, Claude Tag, Cursor cloud agents |

**Grok Bot is the case the loop question cannot reach.** It is a hosted product; whether its loop is
Grok Build is unstated at source (§1). A row of the altitude table therefore has to exist for systems
where the question is unanswerable from outside — and for those, the inclusion test's questions 1–3
are all a team has. That is a limit of the method, recorded rather than argued around.

The inclusion test's three questions distinguish a process layer from dotfiles and style guides. They
do not distinguish a host from a runtime; **the loop question does**, and ACP is the protocol at that
seam. This is offered as evidence for the `01-concepts.md` pass, not as a rewrite.

### 4.2 Marker recommendations, in one table

Not applied. Each is a proposal with its citation; the framework pass decides.

| Component | v1 marker | Proposal | Citation |
|---|---|---|---|
| `10b` Org | `claimed` | **→ `emerging`**, two peers, three objects (session · config file · board) | OpenClaw session owner / roles / scopes; Grok Build's three-file ownership + Bot admin roles; Hermes managed scope + tiers — §3.5 |
| `2b` Hooks | `shipped` | keep; note **8 vendors**, and that Claude Code's `settings.json` shape is being copied — Hermes takes its wire format, Grok Build reads the file | Hermes *"Claude Code compatible"*; Grok Build `[compat.claude]`; Pi, OpenClaw, OpenCode event lists |
| `2c` Enforcement | `shipped` | keep; **name the failure default of a blocking hook** as a disagreement between peers | Grok Build *"Hooks fail open"* vs Hermes `fail_closed` — §3.2 |
| `3c` Composition | `emerging` | keep; add that one peer ships **three** composition objects | Grok Build agents `.md` · personas `.toml` · roles `.toml` |
| `3d` Configuration | `shipped` | keep; cite the three-file *"written by different people"* split as the clearest statement of the row's question | Grok Build config reference |
| `3b` Routing | `emerging` | keep; add *message → agent* as a named routing object in two peers | Hermes `profile_routes`; OpenClaw `bindings[]` |
| `3c` Composition | `emerging` | keep; name the disagreement as **file vs directory**, not just vocabulary | OpenCode `agents/*.md`; Hermes profile; OpenClaw workspace |
| `4b` Cap. Permissions | `emerging` | keep; five peers, four words | Hermes toolset; OpenClaw tool policy; OpenCode permission |
| `5a` Ind. Memory | `emerging` | keep; record that the two `●`s share a file-set **by lineage** | Hermes `claw migrate` |
| `8b` Evidence | `shipped` | keep; add that two ledgers are content-free by construction | OpenClaw audit; Hermes monitoring — §3.6 |
| `8d` Efficiency | `emerging` | keep; add *gauge vs limit* to the disagreement, and one token budget at the goal altitude | §3.8; Grok Build `/goal --budget` |
| `9a` Learning | `emerging` | keep; name the converged shape — **a review gate on model-authored skills** — now three peers, and one of them captures by **demonstration** rather than from a transcript | Hermes `write_approval` + Curator; OpenClaw Workshop + `skill_proposal_evaluate`; Grok Bot teach-by-demonstration → *"review the skill the Bot creates"* |
| `9c` Cadence | `shipped` | keep; note the session-bound vs cloud-resident split inside one vendor | Grok Build `/loop` (7-day expiry, dies with the session) vs Grok Bot routines (*"while your laptop is closed"*) |
| `9e` Raise the Floor | `bet` | keep; cite OpenClaw's *no long-lived aliases* + `doctor --fix` as the nearest vendor-side ratchet | OpenClaw VISION.md, `gateway/doctor` |
| `9f` Diagnose | `bet` | keep; cite OpenClaw's self-scorecard as the nearest shipped shape | §3.7 |
| `1a` · `3e` · `6a` · `6d` · `9d` | `bet` | **hold** — four more `○` or `◐` each | §2 |

### 4.3 Worth stealing — additions to `00-README.md` §5

| # | Pattern | From | For |
|---|---|---|---|
| 15 | **The migration manifest** — an adapter that names what does *not* travel (hooks, permissions, rules, subagents) | OpenClaw `migrate claude`; Hermes `import-agent` | `0a` portability posture — §1.3 |
| 16 | **The specificity ladder** for routing — *"exact peer > parent peer > peer wildcard > guild+roles > guild > team > account > channel > default"*, first-in-config wins on ties | OpenClaw `bindings[]` | `3b` |
| 17 | **Two hook tiers, typed** — observe-only and blocking as distinct APIs, not a flag | OpenClaw | `2b`/`2c` boundary |
| 18 | **Session owner as issue assignee** — creator immutable, owner assignable, participants listed, and the caveat that it is not a security boundary | OpenClaw | `10b` |
| 19 | **The refusal list** as primitive-set discipline, with each refused feature shipped as an example extension | Pi | `4a`, and `02-component-matrix.md`'s blank LoomWarp row |
| 20 | **One container for all resource types** — extensions, skills, prompts, themes in one installable unit, npm or git, pinned | Pi package | `4a` |
| 21 | **`deny` survives auto-mode; global policy beats project** — a repository cannot re-enable what the org denied | OpenCode | `2c`, `4b` |
| 22 | **The goal as a completion contract with deterministic gates** — `/goal draft` + `gate add <command>` | Hermes | `3a`, `8a` |
| 23 | **"Kanban owns lifecycle truth; lanes never own that truth"** — a source-of-truth sentence for the work unit | Hermes | `7a`, `11a` |
| 24 | **Subagents cannot broaden** — *"parent-broadening toolsets get rejected"* | Hermes | `4b` |
| 25 | **Evidence-led maturity bands** — a band is claimable only against named QA IDs | OpenClaw scorecard | `9f`, the Grid |
| 26 | **Session ID exported to every tool** — `PI_SESSION_ID`, `PI_SESSION_FILE` in the tool's environment, so external systems can attribute | Pi | `8b`, the provenance join |
| 27 | **The "two-bucket rule"** for config — infrastructure and cross-agent defaults at root; agent-loop behaviour under `agents.defaults` | OpenClaw | `3d`, and it maps onto layers 0–2 vs 3 |
| 28 | **Three files, three authors** — user config · fleet defaults · signed pins that *"users cannot override"*, with `grok inspect` showing which layer won | Grok Build | `3d`, `10b` — ownership as a file boundary, not a role name |
| 29 | **Teach by demonstration** — a recorded session becomes a *draft* skill that the person reviews before it is saved | Grok Bot | `9a` — capture from doing, not from transcript |
| 30 | **The failure default, stated** — *"Hooks fail open"* in one sentence in the permissions doc, so nobody discovers it in an incident | Grok Build (and Hermes for the opposite default) | `2c` — a pre-flight question the spec should ask |
| 31 | **Stop-hook continuation with a cap** — a `Stop` hook can keep the agent working *"until tests pass"*, overridden after 8 continuations per turn | Grok Build | `8a` — *spin at the gate until green*, as a hook with a bound |

---

## 5. What this read deliberately did not do

- **No marker edits.** §4.2 is a proposal table. v1 is mid-review and the markers are its to change.
- **No change to the inclusion test or the category name.** §1.1, §1.2 and §4.1 record where the test
  and the adapter tell break, and propose a third altitude; [`01-concepts.md`](./01-concepts.md) decides.
- **Four columns were added to [`02-component-matrix.md`](./02-component-matrix.md)**, beside Claude
  Code, which already sat there as a harness. That grid is the same read compressed onto eighteen
  concept rows; the `Harness adapter` row carries an `ᴴ` mark where a host ships adapters *for*
  runtimes rather than *into* a harness, which is the collision §4.1 names.
- **Nothing on Codex CLI, goose, Cursor, Amp, Gemini CLI, Droid, Aider, Cline.** The short-profile rows
  stand. Codex and goose are the two most worth this treatment next — Codex because two systems here
  embed its app-server as a runtime, goose because it is the AAIF-hosted harness.
- **No per-mechanism adoption counts.** These four are read at source; how many teams use each
  mechanism is the survey's job, and it does not publish it.

## 6. Re-check

| What | Why | By |
|---|---|---|
| **OpenClaw `memory-wiki` and memory provenance** | closest new thing to the provenance claim — §3.6 | 2026-12-01, with the existing provenance row |
| **`10b` at OpenClaw and Grok** | if the two converge on a word for the owning object, `emerging → shipped` | opportunistically |
| **Does Grok Bot run on Grok Build?** | unstated at source; the Build repo's `bot.*` relay and `GROK_BOT_TOOL_IDS` are the trail. If xAI states it, the Grok column stops being a pairing of convenience | on any xAI architecture post |
| **ACP as a layer-2 standard** | three of four ship it; check whether AAIF lists it | with the standards-layer row |
| **Star counts and versions in §1** | all four release weekly or faster | before any external citation |

---

*Companion: [`00-README.md`](./00-README.md) — the category argument this file tests ·
[`02-component-matrix.md`](./02-component-matrix.md) — the process-layer grid on the other axis ·
[`systems/harnesses/`](../content) — the four teardowns, every cell sourced ·
[`../../specs/v1-framework/12-horizon.md`](../spec/v1-framework/12-horizon.md) — the marker rules §4.2 obeys*
