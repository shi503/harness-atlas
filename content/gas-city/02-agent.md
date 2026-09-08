---
status: DRAFT
title: "Agent — the five axes, the pool, and the identity contract"
tier: reference
project: harness-atlas
source: "gastownhall/gascity @ 042e965 · docs/guides/configuring-an-agent.md · docs/guides/harness-recipes.md · docs/reference/config.md · docs/reference/specs/identity-separator-contract-v1.md"
version_at_capture: "main/edge 042e965 (v1.4.1 is the latest release, 2026-08-15)"
source_verified: "2026-09-08"
---

# Agent — the five axes, the pool, and the identity contract

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `gastownhall/gascity` at **`042e965`**, **2026-09-08**.

*"An agent is who does the work — a worker a pack defines as a prompt plus a scope and a provider.
The prompt template is its entire behavioral spec; because the platform has no hardcoded roles, a
'reviewer' or a 'planner' is nothing more than the prompt you wrote for it."*
— `docs/getting-started/how-gas-city-works.md`

An agent on disk is a directory: `agents/<name>/agent.toml` plus a prompt template. What that TOML
can say is the largest single config surface in the project — the generated `Agent` struct in
`docs/reference/config.md` documents **55 fields**, two of which (`skills`, `mcp`) are
*"tombstone field[s] retained for v0.15.1 backwards compatibility … accepted but ignored by the
active materializer."*

---

## 1. The five axes

`docs/guides/configuring-an-agent.md` is titled for them and the table is its own:

| Axis | Question | Where you set it | Example |
|---|---|---|---|
| **Harness** | *"which agent CLI?"* | agent `provider` | `provider = "claude"` |
| **Model** | *"which model label?"* | agent `option_defaults.model` | `option_defaults = { model = "sonnet" }` |
| **Upstream** | *"who serves the model?"* | agent `upstream` + `[upstreams.<name>]` | `upstream = "bedrock"` |
| **Transport** | *"how does gc drive it?"* | agent `session` | `session = "acp"` |
| **Runtime** | *"where does it run?"* | city `[session] provider` / `GC_SESSION` | `provider = "k8s"` |

The first four are per-agent; **runtime is city-wide** — *"every session in a city runs on the same
backend."*

### 1a. `provider` means two different things

The guide flags this itself, and it is the single easiest thing to misread in a `city.toml`:

> *"A note on the word 'provider.' It is overloaded by history. In an `[[agent]]` / `agent.toml`
> block, `provider` selects the **harness** (the agent CLI — `claude`, `codex`, …). In the city
> `[session]` block, `provider` selects the **runtime backend** (where sessions run — `tmux`,
> `k8s`, …). They are different axes."*

A third `provider` key exists under `[beads]`, `[events]` and `[usage]`, selecting a *storage or
sink* backend — see [`08`](./08-runtimes-and-exec-providers.md).

---

## 2. Harnesses, and what each one reads

`docs/guides/harness-recipes.md` §"At a glance" names **sixteen** built-in harness presets, each
with the environment variables it reads (its *"serving-env contract"*) and whether it exposes a
`model` option.

| `provider` | Reads (base URL · key/token) | `model` option |
|---|---|:-:|
| `claude` | `ANTHROPIC_BASE_URL` · `ANTHROPIC_API_KEY` / `ANTHROPIC_AUTH_TOKEN` | yes |
| `codex` | `OPENAI_BASE_URL` · `OPENAI_API_KEY` | yes |
| `gemini` | `GOOGLE_GEMINI_BASE_URL` · `GEMINI_API_KEY` | yes |
| `grok` | — · `XAI_API_KEY` | yes |
| `kimi` | `KIMI_BASE_URL` · `KIMI_API_KEY` | yes |
| `kiro` | — · `KIRO_API_KEY` | — |
| `cursor` | — · `CURSOR_API_KEY` | — |
| `copilot` | `COPILOT_PROVIDER_BASE_URL` · `COPILOT_PROVIDER_API_KEY` / `COPILOT_GITHUB_TOKEN` | — |
| `amp` | `AMP_URL` · `AMP_API_KEY` | — |
| `opencode` | gateway (per-upstream) | yes |
| `groq` | gateway → `GROQ_API_KEY` | yes |
| `cerebras` | gateway → `CEREBRAS_API_KEY` | yes |
| `pi` | login | yes |
| `auggie` | login | — |
| `omp` | login | — |
| `antigravity` | login | yes |

A preset is overridable and inheritable from `city.toml`: a same-named `[providers.<name>]` block
*"merges over the built-in (you set only what you change)"*, and a differently-named one takes
`base = "builtin:claude"`.

---

## 3. Upstream — abstract or raw, and the hard error

The upstream axis is the one the guide calls *"the newest knob"*. An upstream is a named city-level
preset an agent selects by name; resolution is *"agent `upstream` → `agent_defaults.upstream` →
unset (no upstream env injected; the harness uses whatever is ambient)."*

**Abstract** fields — `base_url`, `api_key`, `auth_token` — are *"harness-agnostic"*. The resolver
renders them onto whatever env-var names that harness declares in its `upstream_env` binding, so one
upstream works on any harness: *"on a `claude` agent → `ANTHROPIC_BASE_URL` + `ANTHROPIC_API_KEY`;
on a `codex` agent → `OPENAI_BASE_URL` + `OPENAI_API_KEY`."*

**Raw** `[upstreams.<name>.env]` keys *"merge after the abstract render, so they win."*

Per-field precedence is stated as **upstream `*_env` override → harness binding → hard error**, and
the failure is deliberate rather than silent:

> *"An abstract field with no matching harness binding (and no override) is a **hard error**, never a
> silent no-op — you find out at resolution time, not when the agent quietly talks to the wrong
> endpoint."*

**Gateway harnesses** — one CLI fronting many upstreams whose credential variable is
upstream-dependent — have no single binding to declare, so the *upstream* names its own target:
`api_key_env = "GROQ_API_KEY"`.

**Two facts about secrets and restarts**, both from the same section:

- *"Secrets are never inlined."* Values may be `$VAR` / `${VAR}` references *"expanded at
  resolution"* from the controller's environment.
- *"Switching the upstream name relaunches the agent in the warm box (it is a launch-half
  fingerprint change). **Rotating the key** within the same upstream moves no fingerprint — the
  resolved serving env is excluded from the hash, so a credential rotation never churns live
  sessions."*

---

## 4. Sessions and pools

*"When an agent is running it is a **session** — a live process the platform can start, stop,
prompt, and observe."* Sessions are disposable: *"the work they did survives them, because work
lives in beads."* On restart the orchestrator *"**adopts** the live sessions it finds — creating a
session bead for each — rather than respawning them."*

A pool is *"a pool of identical workers sharing one queue"*, sized each tick by the agent's
`scale_check` query. The relevant `Agent` fields, with the reference's own semantics:

| Field | What it does |
|---|---|
| `scale_check` | Shell command template *"whose output reports new unassigned session demand"*. In bead-backed reconciliation it is **additive** — *"assigned work is resumed separately, and ScaleCheck reports only how many new generic sessions to start"* |
| `max_active_sessions` | *"the agent-level cap on concurrent sessions … Replaces pool.max"*; nil inherits rig → workspace → unlimited |
| `min_active_sessions` | *"the minimum number of sessions to keep alive. Agent-level only"*; *"Replaces pool.min"* |
| `drain_timeout` | Default `5m` — *"the maximum time to wait for a session to finish its current work before force-killing it during scale-down"* |
| `idle_timeout` | Empty by default, which *"disables idle checking"* |
| `max_session_age` | *"the maximum wall-clock lifetime of a single runtime session before the controller preemptively restarts it"*; *"The restart is idle-gated"* |
| `max_session_age_jitter` | *"bounds random jitter … so a fleet of identically-configured agents doesn't synchronize restarts"* |
| `wake_mode` | `resume` (default) *"reuse provider session key for conversation continuity"*; `fresh` *"start a new provider session on every wake (polecat pattern)"* |
| `sleep_after_idle` | A duration or the literal `"off"` |
| `depends_on` | *"agent names that must be awake before this agent wakes"*; *"Validated for cycles at config load time"* |

`max_session_age` carries its own stated motivation, which is the clearest statement anywhere in
the docs of why the fleet needs a preemptive restart at all: *"provider SDKs that cache credentials
at session start (e.g. Claude Code via Bedrock) can wedge when the underlying token expires if the
SDK doesn't re-chain providers."*

### 4a. Routing is two commands, and both are per-agent overridable

| Field | Default | Role |
|---|---|---|
| `sling_query` | `bd update {} --set-metadata gc.routed_to=<qualified-name>` | *"the command template to route a bead to this session config … used by `gc sling` to make a bead visible to the target's `work_query`"*. `{}` is replaced with the bead ID |
| `work_query` | a **three-tier default**, below | *"the shell command template to find available work for this agent"*, used by `gc hook` and exposed to prompt templates as `{{.WorkQuery}}` |

The default `work_query` tiers, verbatim: *"1. in_progress work assigned to this session/alias
(crash recovery) 2. ready work assigned to this session/alias (pre-assigned work) 3. ready
unassigned work with `gc.routed_to=<qualified-name>`"* — and *"When the controller probes for demand
without session context, only the routed_to tier applies."*

*"Routing is metadata-based; sling stamps the target template and the reconciler/scale_check paths
decide when sessions are created."*

### 4b. `gc hook` is the claim door

`gc hook` *"Finds routed work using the agent's `work_query` config."* Without `--inject` it
*"prints normalized ready-only output, exits 0 if work exists, 1 if empty"*; `--claim`
*"atomically claim[s] one routed work item for the current session"*; `--inject` is *"silent legacy
Stop-hook compatibility"*.

`gc hook current` exists because the environment cannot name the claimed bead on its own — the docs
state the exact reason and the exact fallback chain:

> *"`$GC_BEAD_ID` exists only in the controller's dispatch condition environment, never in a session
> shell, and `$GC_TRIGGER_BEAD_ID` — exported to demand-spawned pool seats as a pool-level spawn
> marker — is absent on other seats … and never decides what a session claims; the pool is pull."*

```sh
BEAD_ID="${GC_BEAD_ID:-${GC_TRIGGER_BEAD_ID:-$(gc hook current --id-only)}}"
```

`gc hook run` *"Runs a managed gc hook command in a child process with a hard timeout."*

---

## 5. Identity — and why it has a specification

*"Each live agent has a deterministic session name (e.g. `hello-world/pack.worker_furiosa`), so you
and other agents can message, wake, peek at, and resume exactly that one."*

`docs/reference/specs/identity-separator-contract-v1.md` — *"Authoritative specification"*, last
verified 2026-08-25, primary implementation `internal/agent/session_name.go` — exists because two
codebases have to agree byte for byte. *"gascity mints qualified agent identities … beads stores and
compares those same strings … without minting them itself."*

**Two characters are positional separators, and only doubled forms carry structural meaning.**

| Structural meaning | Raw character | Encoded form |
|---|---|---|
| Rig/agent boundary | `/` | `--` |
| City/agent boundary (imported identity) | `.` | `__` |

*"A single `-` or single `_` is never itself a positional separator"* — both are legal inside a name
segment, which must match `[a-zA-Z0-9][a-zA-Z0-9_-]*`.

**Decoding is explicitly lossy**, and the spec says so rather than leaving it to be discovered:

> *"The encode direction is total; the decode direction guesses. Do not build an exact round-trip on
> this table — treat an encoded session name as a display and lookup key, and carry the raw
> qualified identity alongside it wherever you need to recover it exactly."*

Its worked failure is `rig/builder--1` → `rig--builder--1` → decodes to the **different** identity
`rig/builder/1`. And it publishes a second, live divergence: `beads`' own comparison helper
*"collapses any run of `.`, `_`, or `-` down to a single `_`"*, which *"MISSES the slash axis
entirely"* — and it lives in a `beads` version **newer than the one `gascity`'s `go.mod` pins**
(`v1.1.1-0.20260810093734-…` versus `v1.1.1-0.20260805093327-…`, five days apart), so the spec
labels that paragraph as *"the nearest available upstream behavior, not code gascity has adopted
yet."*

---

## 6. Prompt, context, and hook installation

The prompt template is Go `text/template` in Markdown, rendered *"with deployment data (city, rig,
working directory, branch, custom variables)"*. Inspect the rendered result without launching
anything: `gc prime <qualified-name>`.

Assembly fields, all on the same `Agent` struct:

- `prompt_template`, `prompt_mode` (`arg` · `flag` · `none`), `prompt_flag`
- `inject_fragments` / `append_fragments` — *"named template fragments to append … Each name must
  match a `{{ define "name" }}` block"* from a pack's `prompts/shared/`
- `workspace.global_fragments` — injected into **every** agent's prompt, *"before per-agent
  InjectFragments"*
- `inject_assigned_skills` — a pointer tri-state (`nil` inherit / `*true` inject / `*false`
  disable) controlling an appendix that *"lists every skill visible to this agent, partitioned into
  (assigned-to-you, shared-with-every-agent)"*
- `overlay_dir` — *"a directory whose contents are recursively copied (additive) into the agent's
  working directory at startup. Existing files are not overwritten."*

`install_agent_hooks` (workspace-level, agent-overridable and **replacing rather than adding**)
lists the providers whose hooks are installed into agent working directories. The reference names
**fourteen**: `claude`, `codex`, `gemini`, `antigravity`, `kiro`, `opencode`, `mimocode`, `groq`,
`cerebras`, `copilot`, `cursor`, `pi`, `omp`, `kimi`. That is a wider set than the four skill sinks
in [`09`](./09-skills-mail-and-mcp.md) §1 — hooks and skills are separate materializations with
different coverage.

Five shell-command lifecycle fields run around a session, each with its own filesystem and timing:
`pre_start` (*"run before session creation … locally for tmux, inside the pod/container for exec
providers"*), `session_setup` (*"run in gc's process (not inside the agent session) via `sh -c`"*),
`session_setup_script`, `session_live` (*"safe to re-apply without restarting the agent … Must be
idempotent"*), and `on_boot` / `on_death`. Each carries the same warning: *"the last 4 KiB of the
command's stdout/stderr is included in the error and may appear in controller and reconciler logs;
avoid `set -x` or echoing secrets."* Their trust classification is in
[`10`](./10-trust-boundaries.md).
