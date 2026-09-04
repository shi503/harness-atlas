---
title: "Gas City — six primitives, an admission test, and a documented deletion"
tier: reference
project: harness-atlas
created: "2026-09-03"
status: DRAFT
owner: FeatureLead-GasCity (W4 #2)
source: "gastownhall/gascity @ 407114321e1a8e7ad36ddd2660cc115bd2ca96b3 (main, tagged `edge`; latest tagged release v1.4.1, commit 610666314a884cd2db7386c1df3b6ef7c521706e, 2026-08-15) · docs root docs/ (Mintlify, docs.gascityhall.com), engdocs/ (contributor-facing) · read 2026-09-03"
provenance: OBSERVED
---

# Gas City — Gas Town Hall

**Why this file exists.** [`../comparisons/systems/90-short-profiles.md`](../comparisons/systems/90-short-profiles.md)
§1 and [`../README.md`](../README.md)'s highlight reel carried Gas City against
[`../comparisons/systems/gas-city.md`](../comparisons/systems/gas-city.md), a short profile compiled
2026-08-11 from Steve Yegge's own blog posts and two independent write-ups, without reading a
repository. Second in the W4 queue (`fractal/workstreams/W4-teardowns.md`) — a `--sanity` run against
this same harness on 2026-09-03 (`content/gas-city-draft.md`, superseded by this file) had already
found that the short profile does not survive contact with the vendor's own architecture page: its
primitive count is **six, not seven**, and there is **no "Factory Worker Protocol."** This file is the
primary-source read that replaces it. Synthesis: this file's `●`/`◐`/`○` cells correct the existing
Gas City column in [`../comparisons/02-component-matrix.md`](../comparisons/02-component-matrix.md) §1
and populate a new one in [`../comparisons/04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §2.

**In one screen.** Gas City is a Go orchestration SDK, extracted out of the older, more opinionated
**Gas Town** product, that runs fleets of external coding-agent CLIs ("harnesses," in its own
vocabulary — Claude Code, Codex, Gemini CLI, and a dozen others) as managed **sessions**, coordinating
them entirely through a shared, Dolt-backed work store. Its defining move: the orchestrator
**hardcodes zero roles** — "manager," "reviewer," "mayor" are all just prompts a config file supplies
— and the whole system is built from six named primitives (Agent, Bead, Formula, Rig, Pack, Event)
gated by a documented admission test before a seventh is ever added, plus a documented instance of a
primitive being *deleted* rather than accreted. It refuses to be a sandbox: command execution is a
trusted-operator feature, not a security boundary, by the vendor's own words. Beads, the work-item
substrate, is developed as a separate product; Gas Town, the seven-role opinionated product Gas City
replaced the internals of, is *also* still developed, in parallel, with its own releases.

**What it does not claim.** §D. The load-bearing lines: command execution is "a feature, not a
sandbox"; the dashboard is "intended for local, single-operator use"; MCP is "list-only today... you
wire the servers yourself"; a first-class cost-accounting surface is a reviewed **proposal**, not a
shipped command (`gt costs` → "No matching top-level cost accounting command today").

---

Access date for every source: **2026-09-03**. Marks: ✅ direct (primary read) · ◐ relayed
(secondary) · ⚠️ unverified.

URL shorthands used below:
- `REPO` = `https://github.com/gastownhall/gascity`
- `DOCS` = `docs/` inside `REPO` (rendered at `docs.gascityhall.com`)
- `ENGDOCS` = `engdocs/` inside `REPO` (contributor-facing architecture docs)
- `GASTOWN` = `https://github.com/gastownhall/gastown` (the prior, still-live product)
- `BEADS` = `https://github.com/gastownhall/beads`
- `WASTELAND` = `https://github.com/gastownhall/wasteland`

---

## A. Identity

| Field | Value | Mark / Source |
|---|---|---|
| Canonical name | **Gas City** (binary `gc`) | ✅ `REPO` README |
| Prior names / homes | Not a rename. **Gas Town** (`GASTOWN`) is the earlier, still-maintained, more opinionated product; Gas City is "the platform that machinery was extracted into" — both ship releases in the same period. Rule 8 (sibling vocabulary) applies throughout this page: every claim below is about **Gas City** unless a row says otherwise | ✅ `DOCS/getting-started/coming-from-gastown.md`: *"Gas City is the platform that machinery was extracted into."* |
| Owner / maintainer | GitHub org **`gastownhall`** ("Gas Town Hall" — *"Building community for Gas Town, your AI agent orchestrator."*). Copyright holder in `LICENSE` is **"Gas City Contributors,"** not an individual. `orgs/gastownhall.public_members` is empty (private membership), so no formal maintainer role can be confirmed from the API; Steve Yegge is the top committer on `gastown` (4,831 of its commits) and a lighter contributor to `gascity` (not the top committer there) | ✅ `gh api orgs/gastownhall`; `REPO/LICENSE`; `gh api repos/gastownhall/{gascity,gastown}/contributors`; `gh api orgs/gastownhall/public_members` (`[]`) |
| GitHub URL | `REPO` | ✅ `gh api repos/gastownhall/gascity` |
| License | MIT | ✅ `REPO/LICENSE` |
| Stars | 1,219 stars, 390 forks (2026-09-03) — for scale, `GASTOWN` has 17,921 and `BEADS` has 26,863 | ✅ `gh api repos/gastownhall/{gascity,gastown,beads}` |
| Language | Go (backend); TypeScript SPA for the bundled dashboard | ✅ `gh api repos/gastownhall/gascity` `.language`; `REPO/internal/api/dashboardspa/web/` |
| Repo created | 2026-02-22 | ✅ `gh api repos/gastownhall/gascity` `.created_at` |
| First release | `v0.13.0-rc1`, 2026-03-17 | ✅ `gh api repos/gastownhall/gascity/releases,tags --paginate` |
| Latest release | **`v1.4.1`** (2026-08-15, commit `6106663`); a rolling `edge` tag tracks `main`, which has moved 32 commits past `v1.4.1` as of this read (commit `4071143`, 2026-09-03) — an actively developed repo, read at `main`/`edge` | ✅ `gh api repos/gastownhall/gascity/releases`; `gh api repos/gastownhall/gascity/git/refs/tags/{edge,v1.4.1}` |
| Install | `brew install gascity`; source build (`make install`, requires Go 1.26.4+ and ICU4C for a Dolt CGO dependency) | ✅ `REPO/README.md` |
| Website / docs | `docs.gascityhall.com` (Mintlify, rooted at `DOCS/`) | ✅ `REPO/README.md` |
| What it says it is (verbatim) | GitHub description: **"Orchestration-builder SDK for multi-agent coding workflows."** README H1 strap: **"Composable orchestration infrastructure for multi-agent coding workflows."** It "extracts the reusable infrastructure from Gas Town into a configurable toolkit with runtime providers, work routing, formulas, orders, health patrol, and a declarative city configuration." | ✅ `gh api repos/gastownhall/gascity` `.description`; `REPO/README.md` |

### Inclusion test

**1. Does state persist across sessions? Where, in what format?** **Yes.** Every unit of work is a
**bead**, stored in a Dolt-backed SQL database (or a file store) under `.gc/`, queried live rather
than read from a status file: *"Everything is a bead: a stored work item with status, labels,
relationships, and metadata, queried live (`bd`, `gc`) — never tracked in status or lock files that
go stale on a crash. Sessions come and go; the beads remain."* The event log is a separate
append-only JSONL file: *"Storage: `.gc/events.jsonl` (JSONL format)."*
— ✅ `DOCS/guides/capabilities-for-coding-agent-users.md`; ✅ `ENGDOCS/architecture/nine-concepts.md`.

**2. Does it serve more than one person? — Answered per layer (Rule 7).**
- **Local CLI / dashboard, one operator.** *"It is intended for local, single-operator use."* ✅ `DOCS/getting-started/dashboard.md`
- **Many agents through the shared store, yes.** Coordination between agents requires no
  session-to-session link — that is the entire point of Mail and the Event Bus (rows 5b, 8c). ✅
- **The hosted Service Protocol v0** (`gc login`) supports an *account*, but pointedly not an org:
  *"There is no org or tenant field. An account is addressed only by opaque `id`/`handle`; the wire
  carries no tenancy identity."* ✅ `DOCS/reference/specs/service-protocol-v0.md`
— citations directly re-opened 2026-09-03.

**3. Does it bind mechanically, or only by prose?** **Mostly prose, by explicit design choice.**
*"Gas City intentionally runs operator-configured commands. Those commands are a feature, not a
sandbox. Treat city config, imported packs, exec provider scripts, and agent startup commands as
trusted code with the same review expectations as shell scripts committed to the repository."* A
handful of things *do* bind mechanically: inherited secret-shaped env vars (`TOKEN`, `PASSWORD`,
`SECRET`, `PRIVATE_KEY`, `API_KEY`, `ACCESS_KEY`, `CREDENTIAL`, `OAUTH`, `AUTH_JSON`) are stripped by
default before shell helpers run, dashboard mutations require a same-origin CSRF header
(`X-GC-Request`), a non-loopback dashboard bind without `allow_mutations` is read-only, and
pack-contributed public webhooks are capped to `tenant` visibility unless an explicit,
content-digest-pinned grant exists. None of this is a sandbox around what an agent's *own* tool calls
can do — that boundary, if any, belongs to whichever coding-agent CLI Gas City is driving.
— ✅ `DOCS/reference/trust-boundaries.md`; ✅ `DOCS/reference/config.md`.

### Harness or process layer? — the loop question

**Altitude: gateway / host — with a genuine, narrower install-into-a-loop mechanism nested inside it
(Rule 7: both recorded, with evidence for each).**

What Gas City runs itself: a **controller/orchestrator loop** (`internal/dispatch`, health patrol,
the session reconciler) that ticks on its own schedule, reconciling "desired state to running state."
It does not run the coding loop — it **starts, stops, and restarts other processes** ("sessions") that
run one of fifteen-plus external coding-agent CLIs (`provider = "claude" | "codex" | "gemini" |
"grok" | ...`) under a pluggable runtime backend (tmux, subprocess, exec, ACP, Kubernetes, or the
third-party `herdr`). Crucially, it never calls back into a session directly to learn what happened:
*"the orchestrator acts on sessions — spawning, stopping, restarting them — but reads their progress
from the bead store and event bus rather than being called back directly. The loop closes through
shared state."* That is the textbook shape of a **host**: many independent agent loops, run and
retired from outside any of them, coordinated through durable shared state rather than direct calls.

The nested exception: Gas City *does* install into the coding agent's own extension points for one
capability. Skills authored once at pack or role scope are **symlinked into each provider's own
skill convention** — `.claude/skills/`, `.agents/skills/` (Codex), `.gemini/skills/`,
`.opencode/skills/` — and the docs are explicit that Gas City "*places* the files into each
provider's own convention; it doesn't translate them." `gc hook` similarly injects new mail into a
running agent's context each turn through whatever hook mechanism that provider's own CLI exposes.
Those two mechanisms are "install into a loop," in miniature, nested inside the larger "host many
loops" architecture — the two are not mutually exclusive, and the loop question's three-way altitude
ladder has no rung named for "both, at different layers" (§F).

No adapter runs the reverse direction: nothing in the docs shows another harness shipping a Gas City
adapter (the closest is the `herdr` third-party runtime backend, which Gas City *consumes*, not the
other way round).
— ✅ `ENGDOCS/architecture/nine-concepts.md`; ✅ `DOCS/getting-started/how-gas-city-works.md`; ✅
`DOCS/guides/capabilities-for-coding-agent-users.md`; ✅ `DOCS/guides/harness-recipes.md`.

### Primitive set (see §C for definitions)

**Agent · Bead · Formula · Rig · Pack · Event**

Supporting, second-class objects that ride on top of the six: **Order** (pairs a trigger with a
Formula — not itself primitive), **Convoy** (a container Bead), **Session** (a running Agent),
**Provider** (the model/CLI backend an Agent names), **Skill** (pack-supplied, materialized into a
provider's own convention).

### Structured output

**The Bead** — one durable, queryable work-item record in the shared store (Dolt-backed by default).
Every other primitive is defined in terms of it or writes through it: *"Beads is the universal
persistence substrate. All domain state flows through a single interface."* A formula run, a mail
message, a session, and a convoy are all, on disk, the same record type differing only by `type`.
— ✅ `ENGDOCS/architecture/nine-concepts.md`.

---

## Diagram

Gas City's own docs carry an architecture diagram at the point in `how-gas-city-works.md` where the
six primitives are introduced (confirmed unchanged at this read; source SVG/`.excalidraw` files also
unchanged since the sanity draft). Redrawn in house notation at
[`assets/projects/gas-city/six-primitives.mmd`](../assets/projects/gas-city/six-primitives.mmd):

```mermaid
%% Redrawn in house notation from Gas City's own diagram, embedded in
%% docs/getting-started/how-gas-city-works.md (gastownhall/gascity @ 4071143,
%% file docs/diagrams/excalidraw-rendered/primitives.svg, source .excalidraw at
%% docs/diagrams/excalidraw/primitives.excalidraw). Alt text in the docs page:
%% "The six primitives and how they relate: Packs declare agents, formulas,
%% and orders; a Formula operates over a convoy of Beads, fanning work out to
%% Agents that execute in a Rig; Events are fired so humans and agents can
%% observe." Accessed 2026-09-03.
%% NOTE: the SVG's text layer gives six node labels and six edge labels
%% ("configures", "configures", "operates over", "executes", "works in",
%% "fires") but not machine-readable connector endpoints -- edge placement
%% below is reconstructed from the docs page's prose caption, quoted above,
%% not read off raw SVG path coordinates. See §F.
flowchart TD
  Pack["Pack<br/><i>the config</i><br/>agents · formulas · orders<br/>(City = your local pack)"]
  Formula["Formula<br/><i>the HOW</i><br/>order · run · sling"]
  Bead["Bead<br/><i>the WHAT</i><br/>convoy · dependencies"]
  Agent["Agent<br/><i>the WHO</i><br/>session · provider · pool"]
  Rig["Rig<br/><i>the WHERE</i><br/>repo · namespace · scope"]
  Event(["Event<br/><i>the signal</i><br/>humans &amp; agents observe"])

  Pack -->|configures| Agent
  Pack -->|configures| Formula
  Formula -->|operates over| Bead
  Bead -->|fans out to, executes| Agent
  Agent -->|works in| Rig
  Bead -.->|fires| Event
```

---

## B. Component table (33 rows)

| # | Component | What it ships | Path / mechanism | Source (accessed 2026-09-03) | Mark |
|---|---|---|---|---|---|
| 0a | Substrate | A `provider` field per agent selects the underlying coding-agent CLI (15 named: claude, codex, gemini, grok, kimi, kiro, cursor, copilot, amp, opencode, groq, cerebras, pi, auggie, omp, antigravity); `option_defaults.model` / `upstream` pick the model and serving endpoint. Moving harness or model is a config edit, no code | `agents/<name>/agent.toml`: `provider`, `option_defaults`, `upstream` | ✅ `DOCS/guides/harness-recipes.md`; ✅ `DOCS/reference/config.md` | ✅ |
| 1a | Environment | Shell (via `work_query`, `scale_check`, hooks, order `exec`), the registered rig's filesystem, an HTTP+SSE API, GitHub (`gh`, optional), Kubernetes (as a runtime backend), Dolt as the storage layer | `DOCS/reference/trust-boundaries.md` "Execution Surfaces" table | ✅ same | ✅ |
| 2a | Adapters & Middleware | `runtime.Provider` interface (tmux / subprocess / exec / ACP / k8s / herdr) for sessions; a separate `provider` abstraction for model backends; MCP is catalog-only (`gc mcp list`), not a managed client | `internal/runtime/`; `ENGDOCS/architecture/nine-concepts.md` §1 | ✅ `DOCS/guides/capabilities-for-coding-agent-users.md`: *"MCP is list-only today... you wire the servers yourself."*; ✅ `DOCS/reference/herdr-provider.md` | ✅ |
| 2b | Hooks | `on_boot` / `on_death` (pool lifecycle), `pre_start`, `session_setup` / `session_setup_script` / `session_live`, `work_query`, `scale_check`, order `check` / `exec` triggers, `gc hook`. All shell-command templates. Failure behavior is mixed: pool hook failures are logged and continue; the maintainer pre-commit hook that regenerates the OpenAPI spec explicitly "fails closed" when it can't run | `DOCS/reference/trust-boundaries.md`; `REPO/CONTRIBUTING.md` | ✅ same | ✅ |
| 2c | Enforcement | No sandbox around agent tool calls — stated as a deliberate non-goal (quoted in the inclusion test above). What *does* bind mechanically: inherited secret-shaped env vars stripped by default, CSRF header on dashboard mutations, non-loopback dashboard binds without `allow_mutations` are read-only, public-webhook grants require a content-digest match or auto-downgrade to `tenant` | `DOCS/reference/trust-boundaries.md`; `DOCS/reference/config.md` (`allow_public`, `write_auth_verify_key`) | ✅ same | ✅ |
| 3a | Control | Formula compiler contracts (v1 inert-after-apply, v2 graph-native); v2 control beads (`check`, `retry`, `fanout`/`fan-out`, `drain`, `scope-check`, `workflow-finalize`) gate each step on dependency (`needs`) edges before it becomes visible to any agent; `gc sling` creates and routes a bead in one motion. No interactive per-action approval gate comparable to a chat harness's "plan mode" — starting work is dependency-gated config, not a human click. This row is Gas City's *analogue* to the row's chat-harness framing, not a like-for-like instance (Skill findings, below) | `DOCS/reference/specs/formula-spec-v2.md`; `DOCS/guides/understanding-formulas.md` | ✅ same | ✅ |
| 3b | Routing | `sling_query` stamps a bead with `gc.routed_to=<qualified-name>`; per-agent `scale_check` sizes a pool between `min_active_sessions`/`max_active_sessions`; formula v2 steps carry a per-step run target. Routing is config the operator writes, never a runtime "manager" role: *"the orchestrator hardcodes zero roles."* | `DOCS/reference/config.md`; `DOCS/getting-started/how-gas-city-works.md` | ✅ same | ✅ |
| 3c | Composition | No in-session sub-agent delegation of its own — the docs explicitly contrast this with a single coding agent's subagent file, calling Gas City's equivalent "infrastructure shared across many agents" instead: an agent *role* is a folder (`agents/<name>/`), and multi-agent composition happens by **importing packs**, not delegating within a turn | `DOCS/guides/capabilities-for-coding-agent-users.md` ("Roles" row); `DOCS/guides/understanding-packs.md` | ✅ same | ✅ |
| 3d | Configuration | Two-file split: `pack.toml` (reusable definition) vs `city.toml` (this deployment). TOML "progressive activation, Levels 0–8 from section presence... Pack config **is** the feature flag." Scoped inheritance ladder: agent → rig → workspace caps. No OS-level managed-settings/MDM channel comparable to some coding-harness competitors was found | `ENGDOCS/architecture/nine-concepts.md` §4 ("Progressive Capability Model"); `DOCS/reference/config.md` | ✅ `DOCS/reference/config.md`; ✅ `DOCS/getting-started/coming-from-gastown.md` | ✅ |
| 3e | Standards | Auto-generated JSON Schemas for `city.toml`/`pack.toml`/events, and an OpenAPI 3.1 contract generated from the same Go structs the CLI uses. Formula spec v1/v2, pack spec, and the hosted service protocol are each a standalone authoritative spec doc. A genuine refusal list exists, but scoped to wire-typing, not the whole product: *"What is out of scope"* — an untyped `/svc/*` proxy, untyped outbound HTTP, untyped storage-layer (de)serialization, the generated Go client as an SDK surface, and WebSocket transport. Separately — and this is a different, narrower admission test than a "what good looks like" bar — the **Primitive Test** (§C) gates what may become SDK-owned Go at all | `DOCS/reference/schema/`; `ENGDOCS/architecture/invariants.md` §7 | ✅ same | ✅ |
| 4a | Capability | **Skills** (authored once at pack or role scope, symlinked into each provider's own skill directory — Claude Code, Codex, Gemini CLI, OpenCode confirmed; Copilot/Cursor/Pi/OMP "skipped for now"); **Packs** are the travel unit (agents + formulas + orders + skills + commands + MCP config); a public first-party registry (`gascity-packs`) ships packs including `gascity`, `gastown`, `cass`, `discord`, `github`, and Slack variants | `DOCS/guides/capabilities-for-coding-agent-users.md`; `DOCS/guides/registry-showcase.md` | ✅ same; ✅ `gh api repos/gastownhall/gascity-packs` (repo listing) | ✅ |
| 4b | Capability Permissions | Skill/agent scope is `city`-wide or role-local (role-local wins on a name collision); rig-scoped vs. city-scoped agent instantiation; webhook `visibility` (`private`/`public`/`tenant`) is default-closed to `tenant` unless an explicit, digest-pinned `allow_public` grant exists. No human-facing RBAC — the trust model is single-tier "trusted operator code" for all config authors | `DOCS/reference/config.md`; `DOCS/reference/trust-boundaries.md` | ✅ same | ✅ |
| 5a | Individual Memory | Per-agent session logs (`gc session logs <agent>`); `wake_mode=resume` reuses the provider's own session key across sleep/wake, `wake_mode=fresh` starts a new provider session each wake (the "polecat pattern"). One layer down, the separate **Beads** product ships `bd remember "insight"` (persistent project memory) and `bd prime` (injects it back), with "Semantic 'memory decay' summarizes old closed tasks to save context window" — surfaced through Gas City's Bead primitive, not a Gas-City-specific feature. Real, but one step removed from a Gas-City-owned memory object — see the component-matrix correction in §F | `DOCS/reference/config.md` (`wake_mode`); `BEADS/README.md` | ✅ `DOCS/reference/config.md`; ✅ `BEADS/README.md` (re-read 2026-09-03: `bd remember`/`bd prime`/decay lines confirmed verbatim) | ✅ |
| 5b | Team Memory | The shared bead store itself: Dolt-backed, survives any single agent's crash or restart, and is the thing packs let a team "reuse... without copying files." Mail (a bead of type `message`) threads and persists across sessions that share no session — a real, if work-item-shaped, team memory, not a curated knowledge doc | `DOCS/guides/capabilities-for-coding-agent-users.md`; `DOCS/guides/understanding-packs.md` | ✅ same | ✅ |
| 5c | Knowledge | **Nothing here** — checked `docs/guides/index.md`, `docs/reference/index.md`, and grepped the whole `docs/` tree for "RAG," "embedding," "knowledge base," and "retriev*"; no curated/cited-context feature distinct from the Bead/mail/skill mechanisms above | — | ✅ (absence, re-checked 2026-09-03) |
| 6a | Product | Work lands as commits/PRs against the registered rig's git repo; no explicit "what it must not become" boundary statement was found for agent-produced work itself (contrast with §D's API-surface refusal list, which is about the *wire*, not the product) | checked: `DOCS/getting-started/`, `DOCS/guides/` | — | ✅ (absence) |
| 6b | Infrastructure | Runtime backends: tmux (local, default), subprocess (remote), exec (script), Kubernetes, and the third-party `herdr`; Docker Compose install path; `gc supervisor` is the always-on host process serving the API/dashboard for every registered city; Dolt is the storage runtime | `DOCS/reference/herdr-provider.md`; `REPO/README.md`; `docs/runbooks/` (referenced) | ✅ same | ✅ |
| 6c | Estate | `gc rig add <path>` registers an external git repo with the city; each rig gets its own bead namespace and agent scope, so a city's rig list *is* the team's estate inventory, isolated by bead-ID prefix on one shared store rather than a separate database per repo | `DOCS/getting-started/how-gas-city-works.md` | ✅ same | ✅ |
| 6d | Delivery | Rich evidence for **how Gas City ships itself**: a pre-commit hook that reformats and regenerates the OpenAPI spec, dozens of GitHub Actions workflows (`ci.yml`, `rc-gate.yml`, `rc-release.yml`, `release.yml`, `codeql.yml`, `scorecard.yml`, …), and release archives published with SHA-256 checksums, SBOMs, and GitHub attestations. Thinner evidence for **how it ships agent-produced work**: no dedicated PR-automation guide surfaced in the guides/reference/tutorial indexes checked; `gh` is listed only as an optional dependency for "GitHub gates" | `REPO/CONTRIBUTING.md`; `REPO/.github/workflows/`; `REPO/SECURITY.md` | ✅ checked: `DOCS/guides/index.md`, `DOCS/reference/index.md`, `docs/tutorials/index.md` (referenced) | ✅ |
| 7a | Workflow Tasks | The **Bead** itself, moving `open` → `in_progress` → `closed`; a **Convoy** is a container bead grouping related work; blocking `needs` edges are how ordering happens "with no central scheduler" | `DOCS/getting-started/how-gas-city-works.md` | ✅ same | ✅ |
| 8a | Evals | **Nothing here** — checked `DOCS/guides/`, `DOCS/reference/`, `docs/tutorials/index.md`, and grepped for "eval," "benchmark," "judge," "rubric"; the only hits are the `retry-eval` control-bead *kind* (a workflow-graph retry mechanism, not a quality gate) and `ScaleCheck`'s "evaluation" of session demand. Nothing scores or gates agent output against a rubric before it ships | — | ✅ (absence, re-checked 2026-09-03) |
| 8b | Evidence | Per-bead audit trail (`bd show <id>` — "View task details and audit trail"); per-session logs; a city-wide, append-only, monotonically-sequenced event log; SBOM + GitHub artifact attestations on Gas City's own releases (evidence of the *tool's* supply chain, not of agent work) | `BEADS/README.md`; `REPO/SECURITY.md`; `ENGDOCS/architecture/nine-concepts.md` | ✅ (all three, direct reads) | ✅ |
| 8c | Observability | The Event Bus (`events.Provider`: Record/List/LatestSeq/Watch; storage `.gc/events.jsonl`) underlies `gc events`, the SSE API, and the dashboard's live view. A separate, optional repo (`gastownhall/gascity-otel`) adds an OpenTelemetry stack (VictoriaMetrics + VictoriaLogs + Grafana) — not bundled | `DOCS/reference/events.md`; `ENGDOCS/architecture/nine-concepts.md` §3 | ✅ same; ✅ `gh api repos/gastownhall/gascity-otel` | ✅ |
| 8d | Efficiency | **Proposed, not shipped** (◐ proposal, per Rule 4). An engineering design doc (`usage-facts-v0.md`, `Status: proposal, adversarially reviewed`) specs a `UsageFact` record — input/output/cache tokens, wall-clock seconds, and a list-price cost estimate per run. As of this read there is no shipped top-level command for it: the Gas Town→Gas City command map states plainly, *"`gt costs` → no direct equivalent — No matching top-level cost accounting command today."* Model spend itself is never intermediated: the only spend is the model usage of the agents you run, billed through the provider | `ENGDOCS/design/usage-facts-v0.md`; `DOCS/reference/gastown-command-map.md` | ✅ both, re-read 2026-09-03 | ◐ (proposal) |
| 9a | Learning | Skills are hand-authored once and shared by scope — a deliberate, human-curated form of encoded learning, not an automatic capture pipeline. The closest thing to automatic memory curation is one layer down, in Beads' own "semantic memory decay" compaction of old closed tasks. No mechanism was found that promotes a session's finding into a skill or rule without a human writing it | `DOCS/guides/capabilities-for-coding-agent-users.md`; `BEADS/README.md` | ✅ checked: `docs/guides/index.md` | ✅ |
| 9b | Rituals | **Nothing here** — checked `CONTRIBUTING.md`, `engdocs/contributors/index.md`, and `docs/guides/index.md`, and grepped for "retro," "postmortem," "standup"; no recurring human-practice feature. (Gas Town, the sibling product, documents an Escalation *role* ladder — Mayor/Deacon/Overseer — but `coming-from-gastown.md` frames that explicitly as one optional example pack, not a Gas City mechanism. Rule 8: that claim is about Gas Town, not Gas City) | — | ✅ (absence, re-checked 2026-09-03) |
| 9c | Cadence | **Orders** pair a trigger (cooldown, cron, condition, event, or manual) with a Formula to fire — *"no human runs a verb."* Health patrol is "one kind of order: each tick the orchestrator evaluates due triggers and fires them." | `DOCS/getting-started/how-gas-city-works.md`; `ENGDOCS/architecture/health-patrol.md` | ✅ same | ✅ |
| 9d | Anti-fragile Lifecycle | **Nothing here** as a dedicated mechanism — checked for "defect ledger," "postmortem," "blameless," none found. The `CHANGELOG.md` narrates specific production bugs and their fixes in prose (a changelog-as-incident-record, not a formal ledger). Gas Town's role-based Escalation ladder is the nearest analogue and is explicitly an optional example, not a Gas City primitive (see 9b) | — | ✅ (absence, re-checked 2026-09-03) |
| 9e | Raise the Floor | `gc agent add` scaffolds a new agent under `agents/<name>/`; `gc init` scaffolds a runnable city; the tutorials ship named starter agents (`mayor`, `reviewer`, `worker`); the first-party pack registry (`gascity`, `gastown`, `cass`, `discord`, `github`, `slack-*`) is a set of vetted starting points a team imports instead of writing from scratch. This raises the floor for *getting started*, not for *output quality* — no per-output guardrail was found | `DOCS/reference/cli.md` (`gc agent add`); `DOCS/guides/registry-showcase.md` | ✅ same | ✅ |
| 9f | Diagnose the Bottleneck | Narrow but real: the dashboard's health view surfaces system, local-tool, per-rig store, and Dolt-trend health; `gc convoy`'s tooling is oriented at tracking a batch of related work as a unit | `DOCS/reference/cli.md`; `DOCS/getting-started/dashboard.md` | ✅ same | ✅ |
| 10a | Roster | The **Agent** primitive *is* the roster entry (`agents/<name>/`); `gc session list` shows who is live right now. The Gastown pack ships an example seven-role roster (Mayor, Deacon, Witness, Refinery, Polecat, Crew, Dog) explicitly as "an example operating model, not a type system" | `DOCS/getting-started/how-gas-city-works.md`; `DOCS/getting-started/coming-from-gastown.md` | ✅ same | ✅ |
| 10b | Org | Config-level nesting exists — agent → rig → workspace caps inherit downward — but the hosted **identity** layer explicitly refuses a tenant concept (quoted in the inclusion test). Webhook `visibility: tenant` is a real enum value, so "tenant" means different things in the config schema and on the auth wire within the same product — a vocabulary seam worth flagging, not resolving here (Rule 3) | `DOCS/reference/config.md`; `DOCS/reference/specs/service-protocol-v0.md` | ✅ same | ✅ |
| 11a | Surfaces | `gc session attach` (interactive terminal, tmux-backed); the built-in web dashboard (a TypeScript SPA served by the supervisor, reading its typed API "so it reflects live state"); an HTTP+SSE external-messaging API that lets chat clients (Slack/Discord, via packs) act as session participants; the `gc`/`bd` CLIs themselves. The bead store plus event bus is the one source of truth every surface projects from — the dashboard "reads the supervisor's typed API directly (same origin)" rather than keeping its own state | `DOCS/getting-started/dashboard.md`; `DOCS/guides/connected-clients.md` | ✅ same | ✅ |

---

## C. Primitive set (name · path · project's own definition)

| Primitive | Path / key | Project's definition (verbatim) | Source |
|---|---|---|---|
| **Agent** | `agents/<name>/agent.toml` + `prompt.template.md` | "WHO — a configured worker — name, provider, prompt template, scope — pure configuration, so define as many as you like; the platform assumes none exists" | ✅ `DOCS/getting-started/how-gas-city-works.md` |
| **Bead** | `beads.Store` (Dolt-backed; file/mem/exec variants) | "WHAT — one unit of work — ID, title, status, type — the universal substrate: tasks, mail, sessions, convoys are all beads differing only by `type`" | ✅ same |
| **Formula** | `formulas/*.toml` | "HOW — a reusable, written-down method applied over work — applying it *produces* work: a formula materializes as beads that outlive the file and any session" | ✅ same |
| **Rig** | `city.toml` `[[rigs]]` | "WHERE — an external project (usually a git repo) registered with the city — each rig gets its own bead namespace and agent scope" | ✅ same |
| **Pack** | `pack.toml` + directory | "CONFIGURES — the unit of configuration — declares agents, formulas, orders — the City *is* a pack: the one rooted at this deployment" | ✅ same |
| **Event** | `events.Provider` / `.gc/events.jsonl` | "OBSERVE — an outbound notification fired by activity — *fired, not polled*; humans and agents both watch the stream" | ✅ same |
| (supporting) **Order** | `orders/*.toml` | "automates *when* a formula runs, pairing a trigger (cooldown, cron, condition, event, or manual) with the formula to fire" | ✅ same |
| (supporting) **Convoy** | a Bead of container type | "a container bead that groups related work so you track a batch as a unit" | ✅ same |
| (supporting) **Session** | `internal/session/` | "When an agent is *running* it is a **session** — a live process the platform can start, stop, prompt, and observe" | ✅ same |
| (supporting) **Provider** | `agent.toml` `provider` field | the named coding-agent-CLI backend an Agent runs on (claude, codex, gemini, …) | ✅ `DOCS/guides/harness-recipes.md` |
| (supporting) **Skill** | pack/role `skills/<name>/` | materialized into each provider's own skill convention; "it doesn't translate them" | ✅ `DOCS/guides/capabilities-for-coding-agent-users.md` |

**Count:** 6 primitives, 5 supporting. **Verdict: 5–7, healthy.** This is the strongest primitive-set
evidence in the corpus so far: the vendor names a decision framework for what may join the SDK layer
at all, and a documented instance of a primitive being *removed* rather than accreted — a prior
"Agent Protocol" interface (`agent.Agent` / `agent.Handle`) was named until commit `dd90ac0a`
(2026-03-08) and folded into `internal/session`/`internal/runtime`; the commit itself was not
independently re-verified this pass (shallow clone, no commit history — §F).

**A correction from the sanity draft, found on the re-read.** The draft quoted the "Primitive Test" as
three conditions paraphrased from `ENGDOCS/architecture/nine-concepts.md` — *"Atomicity — can it be
decomposed into existing primitives?... More useful as models improve... Judgment out of Go — does Go
make decisions, or transport only?"* Re-opening the **canonical** doc it links to,
`ENGDOCS/contributors/primitive-test.md`, shows that summary is not verbatim and, more importantly,
answers a **different question** than the one it is cited for. `primitive-test.md`'s actual three
conditions gate whether a *capability* belongs in Gas City's SDK layer at all versus the *consumer*
layer (agent prompts, the `bd` CLI, user config) — its "Atomicity" is about concurrency safety
("Can two agents hit this operation simultaneously? ... needs atomic CAS"), not about whether
something decomposes into one of the six user-facing primitives. `nine-concepts.md` frames this same
document as "the Primitive Test... before adding a new primitive," which is a looser, secondary
framing the canonical doc itself never states. Both documents point at each other as authoritative
(rule 5: two primary sources describing the same named artifact differently) — quoted in full below,
newer-verified-date wins for characterization: `primitive-test.md` carries no "last verified" date;
`nine-concepts.md` is dated "Last verified against code: 2026-04-25." The **six-primitive count itself
is unaffected** — it is directly stated and enumerated in `how-gas-city-works.md`, independent of
either test — but the *evidentiary strength* of "a published admission gate for the primitive set" is
narrower than the sanity draft credited it: the admission gate that is actually named and dated is
about SDK-vs-consumer-layer capability placement, and the "gates a seventh primitive" framing is
`nine-concepts.md`'s own secondary gloss on it. See §F.

Verbatim, from `primitive-test.md` (✅, canonical, re-opened 2026-09-03):
> "A capability belongs in the SDK **only if all three hold.** If any condition fails, it belongs in
> the consumer layer." — **1. Atomicity** — "Can two agents hit this operation simultaneously? Does
> the underlying tool (bd, git, tmux) already provide atomicity?" **2.** "Does it become MORE useful
> as models improve?" **3. Is it transport or cognition?** — "Does any line of Go contain a judgment
> call? If yes, the decision belongs in the prompt, not the code."

Against the primary source, the short profile's seven-item list (Formulas, Agents, Beads, Orders,
Packs, Event Stream, "Factory Worker Protocol") both overcounts (Order is explicitly a derived
pairing, not primitive) and undercounts by omission (Rig, a genuine sixth primitive, is absent from
that list entirely) — see §F.
— ✅ `ENGDOCS/architecture/nine-concepts.md`; ✅ `ENGDOCS/contributors/primitive-test.md`.

---

## D. Stated limitations / "what it does not claim" (quoted)

**`docs/reference/trust-boundaries.md`**
> Gas City intentionally runs operator-configured commands. Those commands are a feature, not a
> sandbox. Treat city config, imported packs, exec provider scripts, and agent startup commands as
> trusted code with the same review expectations as shell scripts committed to the repository.

**`docs/getting-started/dashboard.md`**
> The dashboard is served on the supervisor's bind address, which defaults to loopback (`127.0.0.1`).
> It is intended for local, single-operator use.

**`docs/reference/specs/service-protocol-v0.md`**
> There is no org or tenant field. An account is addressed only by opaque `id`/`handle`; the wire
> carries no tenancy identity.
>
> The CLI MUST NOT contain — and this protocol MUST NOT define wire fields for — trial/credit/
> billing/plan/quota/subscription semantics, provisioning steps, expiry math, or org/tenant identity.

**`docs/guides/capabilities-for-coding-agent-users.md`**
> MCP is list-only today (`gc mcp list` shows what's catalogued; you wire the servers yourself).
>
> Providers whose convention isn't confirmed (copilot, cursor, pi, omp) are skipped for now.

**`docs/reference/gastown-command-map.md`**
> `gt costs` → no direct equivalent — No matching top-level cost accounting command today.

**`engdocs/design/usage-facts-v0.md`**
> Status: **proposal, adversarially reviewed**

**`docs/guides/understanding-formulas.md`**
> Container dependencies have a v2 gap. Under v1 a step that `needs` a parent waits for all of that
> parent's children; the v2 compiler creates no parent-child edges yet, so the dependency gates only
> on the parent step.

**`engdocs/architecture/invariants.md` §7**
> What is out of scope: the `/svc/*` proxy; outbound HTTP; storage-layer (de)serialization; the
> generated Go client as a Go SDK surface; WebSocket transport.

**`CONTRIBUTING.md`**
> Gas City is experimental software, but the repo is now structured for external contributors.

---

## E. Sources (all accessed 2026-09-03)

**Primary**
- `gh api repos/gastownhall/gascity` — identity, license, stars, language, timestamps
- `gh api repos/gastownhall/{gastown,beads}` — sibling-repo identity (stars, license, language, created_at)
- `gh api orgs/gastownhall`; `gh api orgs/gastownhall/public_members` (`[]`) — org identity and membership
- `gh api repos/gastownhall/gascity/releases --paginate`, `gh api repos/gastownhall/gascity/tags?per_page=100`
- `gh api repos/gastownhall/gascity/git/refs/tags/{edge,v1.4.1}` — resolved `edge`/`main` to `4071143`, `v1.4.1` to `6106663`
- `gh api repos/gastownhall/gascity/commits/main` — confirmed `main` HEAD = `4071143`
- `gh api repos/gastownhall/{gascity,gastown}/contributors?per_page=100` — contributor attribution
- `gh api search/code?q=%22Factory+Worker+Protocol%22+org:gastownhall` — **zero hits**
- `gh api search/code?q=%22FWP%22+org:gastownhall` — 5 hits, all incidental substring matches inside
  `pnpm-lock.yaml`/`package-lock.json` files in unrelated repos (`bdp`, `gascity` itself, `gch-website`,
  `gascity-dashboard`); none is the term "Factory Worker Protocol" or an abbreviation of it used as a
  name — re-confirms the sanity draft's finding rather than reversing it
- `gh api repos/gastownhall/gascity-otel` — confirmed exists (separate, optional OTel stack)
- `git clone --depth 1 https://github.com/gastownhall/{gascity,gastown,beads,wasteland,gascity-packs}.git`
  into scratch, then read locally at `gascity` HEAD `4071143`:
  - `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`, `LICENSE`
  - `docs/getting-started/{how-gas-city-works,coming-from-gastown,dashboard,installation,faq}.md`
  - `docs/guides/{capabilities-for-coding-agent-users,understanding-formulas,understanding-packs,harness-recipes,registry-showcase,connected-clients}.md`
  - `docs/reference/{config,cli,events,trust-boundaries,gastown-command-map,herdr-provider}.md`
  - `docs/reference/specs/{service-protocol-v0,formula-spec-v1,formula-spec-v2,pack-spec}.md`
  - `engdocs/architecture/{nine-concepts,invariants,health-patrol,glossary}.md`
  - `engdocs/contributors/primitive-test.md` (the canonical admission-test doc; see §C)
  - `engdocs/design/usage-facts-v0.md`
  - `internal/bootstrap/packs/core/formulas/mol-review-quorum.toml` (re-read verbatim, confirms a
    two-lane parameterized review formula, not a hardcoded three-provider fan-out)
  - `.github/workflows/` (listing only, for the Delivery row)
  - `README.md` for `gastown` (the sibling product), `beads` (re-read: `bd remember`, `bd prime`,
    "Semantic 'memory decay'" lines confirmed verbatim), and `wasteland` (re-read: "Federation
    protocol for Gas Towns" — Gas City-specific integration still not confirmed)
  - `docs/docs.json` (nav structure — confirmed `trust-boundaries.md` and `reference/specs/*` still
    present at their cited paths; also surfaced one doc not previously cited,
    `docs/reference/specs/identity-separator-contract-v1.md` — not read this pass, §F)

**Secondary** (◐ — not re-verified this run; carried over from `comparisons/systems/gas-city.md`,
which itself compiled them into `specs/v0/references.md` on 2026-08-11; nothing in this profile's
§A–§D rests on them)
- Announcing Gas City 1.0 (sellsbrothers.com); Welcome to Gas City (steve-yegge.medium.com); Gas
  Town: from Clown Show to v1.0 (steve-yegge.medium.com); yegge.ai/gastown
- Maggie Appleton, "Gas Town's Agent Patterns"
- Software Engineering Daily, "Gas Town, Beads, and the Rise of Agentic Development"

---

## F. Things I could NOT verify

- **Whether "Factory Worker Protocol" or "FWP" is a real Gas City artifact under any name.** The
  short profile under correction names it as a primitive, quoting *"a standardized interface
  abstracting differences between CLI coding agents,"* covering codex/claude/gemini/amp/opencode/pi.
  `gh api search/code` for `"Factory Worker Protocol"` returns zero hits across `org:gastownhall`;
  the string `"FWP"` returns five hits, all incidental substring matches in lockfiles, re-checked
  2026-09-03 and none naming a protocol. The real, closely related mechanism is the `provider` field
  plus its documented "serving-env contract" in `harness-recipes.md` — a config value and an env-var
  convention, not a named protocol — and a separate, genuinely named `service-protocol-v0.md`, which
  is about `gc login` authenticating to a *hosted Gas City service* (the `docker login` model), not
  about talking to a coding-agent CLI at all. Carries no mark elsewhere on this page because it does
  not appear on this page outside this note.
- **`primitive-test.md` vs. `nine-concepts.md`'s characterization of it** (§C). The canonical doc's
  "Atomicity" condition (concurrency safety of a *capability* joining the SDK) is not the same test as
  `nine-concepts.md`'s paraphrase (decomposability of a *primitive*), even though the latter cites the
  former as its source and frames it as gating new primitives specifically. Both are primary sources
  from the same repository, dated differently, describing the same named artifact two ways. Recorded
  rather than resolved — the six-primitive count does not depend on either framing, since it is stated
  directly in `how-gas-city-works.md`.
- **Whether Steve Yegge holds any formal maintainer role in `gastownhall`.** The org's
  `public_members` list is empty (private membership, re-confirmed 2026-09-03), so contributor-commit
  count is the only signal available; it shows him as the top committer on `gastown` and a lighter
  contributor to `gascity`, not as the named owner of either repo. ⚠️ (organizational role) unverified;
  ✅ (commit counts themselves, directly read). Everything Yegge's own blog posts claim about intent,
  roadmap, or motivation is ◐ at best in this run — none of it was re-read; see §E.
- **Whether Wasteland (the federation protocol named in the short profile's own open thread `R-1`)
  integrates with Gas City specifically**, as opposed to Gas Town. Its README (re-read 2026-09-03)
  describes "federation protocol for Gas Towns"; I did not open `wasteland`'s own docs or `gascity`'s
  code for a wasteland integration point. ⚠️ unverified, named here rather than silently dropped.
- **Whether the `mol-review-quorum.toml` two-lane pattern is the same "code-review-loop" formula
  the short profile attributes a Codex/Claude/Gemini three-way run to.** The shipped core-pack
  formula, re-read verbatim 2026-09-03, is parameterized for exactly **two** provider/model lanes plus
  a synthesis step, not a hardcoded three-provider fan-out; no formula matching the short profile's
  specific three-way description was located. ◐ the general claim (parallel, cross-provider review is
  real and shipped); ⚠️ the specific three-provider instance.
- **The "Agent Protocol" deletion commit (`dd90ac0a`, 2026-03-08)**, quoted directly from
  `nine-concepts.md`'s own text, was not independently re-verified against `gh api` commit history
  this pass — the working clone is `--depth 1` and has no history beyond `main` HEAD. ◐ (the claim
  rests on the vendor's own architecture doc, not re-confirmed against raw commit metadata).
- **`docs/reference/specs/identity-separator-contract-v1.md`** — surfaced in `docs/docs.json`'s nav
  tree during this pass but not itself opened; unclear whether it bears on any row above (most likely
  10b Org or the Service Protocol's identity model in the inclusion test). Flagged rather than silently
  skipped.
- **The second protocol diagram this docs page might carry beyond the redrawn one** — `docs/diagrams/`
  holds sixteen `.excalidraw` sources beyond `primitives.excalidraw` (bead-lifecycle,
  formula-v1-vs-v2, coordination-through-store, work-lifecycle, and others); per the diagram rule only
  the one nearest the loop question (primitives.svg) is redrawn — the rest are named here rather than
  individually redrawn: `bead-lifecycle`, `convoy-tracks-membership`, `cooldown-vs-cron`,
  `coordination-through-store`, `formula-apply-pipeline`, `formula-drain-fanout`,
  `formula-v1-vs-v2`, `formula-whole-job`, `gastown-agents-by-scope`, `hand-rolled-to-city`,
  `import-binding-namespace`, `json-discover-validate`, `pack-loading`, `pancakes-dag`,
  `work-lifecycle` (`docs/diagrams/excalidraw-rendered/*.svg`).
- **The exact SVG text-layer connector endpoints for the primitives diagram** — the diagram above is
  reconstructed from the docs page's prose caption, not from raw SVG path coordinates (noted in the
  diagram's own comment block).
