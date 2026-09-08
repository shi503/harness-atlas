---
title: "LangChain · Deep Agents · LangSmith — the harness as a middleware stack"
tier: reference
project: loomwarp
created: "2026-08-27"
updated: "2026-08-30"
status: DRAFT
owner: KD
source: "clone: /Users/kevindeng/Googlyeye-Monsters/deepagents @ 3a0f68ccd08166394e02fd736869482be5759f83 (2026-08-30) · /Users/kevindeng/Googlyeye-Monsters/deepagentsjs @ 2cce30d269f25d3b8836bdce73ea84c08f8e4fbb"
prior-source: "projects/loomwarp/references/comparisons/2026-08-research/data/langchain-harness-evals-talk.md"
---

# LangChain — Deep Agents, LangSmith, and harness engineering

> **Rewritten from source, 2026-08-30.** The first version of this file was built entirely from an
> auto-generated caption track of one talk, and said so. It has now been re-based on the repository
> at `3a0f68c`. **Four of its conclusions did not survive**, and they are the four that mattered most
> to our own positioning. Where a claim still holds it is now cited to code rather than to a
> transcript; where it does not, the original is preserved in a quote block and struck.
>
> The transcript remains a cited source for *intent* — what the authors say they are doing — at
> [`../2026-08-research/data/langchain-harness-evals-talk.md`](../2026-08-research/data/langchain-harness-evals-talk.md).
> ⚠️ It is ASR output; proper nouns from it are unreliable and are not quoted here.

**Why this earns a teardown.** It is the only system in the corpus that states **where in the loop**
you customise a harness rather than **what a harness contains**. Every other taxonomy we hold —
AAIF's five functions, Meng's six components, our own twelve — names abstract nouns. Deep Agents
names **insertion points**, and an insertion point is mechanically checkable in a way a noun is not.

**And it is now the strongest single challenge to our headline claim.** See §7.

---

## 1. What it is

Three products, one argument — restated as the repository states it, which is narrower and clearer
than the talk.

| | |
|---|---|
| **LangGraph** | *"the runtime … state, checkpoints, streaming, interrupts"* |
| **LangChain `create_agent()`** | *"the agent abstraction … model + tools + middleware -> agent loop"* |
| **Deep Agents** | *"an opinionated harness **on top of** `create_agent()`. It does not introduce a new runtime."* |

— `libs/ARCHITECTURE.md` §"The three layers"

The repository's own headline is **"The batteries-included agent harness"** (`README.md`), and its
four stated principles are *opinionated · extensible · model-agnostic · production-ready*. It is MIT,
28.7k stars, and it shipped a commit the day this teardown was written.

**What changed since the transcript.** The talk described DeepAgents as *"our model agnostic and more
general purpose version of [Claude Code]"* — an SDK. The repository is now seven packages:

| Package | What it is |
|---|---|
| `libs/deepagents` | the SDK — `create_deep_agent()`, middleware, backends, profiles |
| `libs/code` | **Deep Agents Code** (`dcode`) — a terminal coding agent, installed by `curl \| bash` |
| `libs/acp` | **Agent Client Protocol** — editor integration |
| `libs/evals` | the evaluation suite, with Harbor adapters and a published scorecard |
| `libs/talon` | experimental long-running host |
| `libs/partners` | sandbox and provider integrations — Daytona, Modal, Runloop, Vercel, QuickJS |
| `openwiki/` | a machine-maintained code wiki with **claim-level evidence pinning** (§4) |

---

## 2. Architecture

### The core loop, and the definition of the job

> **"The main job of a harness is to bring context to the model at the right point in time."**

Still the sharpest one-line statement of the harness's job anywhere in the corpus, and strictly
narrower than Weng's inventory. It survives contact with the code: every middleware in the default
stack is doing exactly that.

### Middleware — the insertion points, counted in code

The transcript named **four** insertion points. **The implementation exposes six**, each with an
async twin:

| Hook | Async twin | Occurrences in `libs/deepagents/deepagents/` |
|---|---|---|
| `wrap_model_call` | `awrap_model_call` | 14 |
| `wrap_tool_call` | `awrap_tool_call` | 4 |
| `before_agent` | `abefore_agent` | 4 |
| `after_agent` | `aafter_agent` | 4 |
| `before_model` | `abefore_model` | 2 |
| `after_model` | — | 0 in this repo; part of the LangChain base class |

`wrap_model_call` carries three-quarters of the weight. The package docstring is explicit about why
this is the primitive rather than a plain tool:

> *"Middleware subclasses `AgentMiddleware`, overriding its `wrap_model_call()` hook that
> **intercepts every LLM request** before it is sent … A plain tool function in a `tools=[]` list
> cannot do any of this — it is only invoked *by* the LLM, not *before* the LLM call."*
> — `libs/deepagents/deepagents/middleware/__init__.py`

**`middleware` passes [`../01-concepts.md`](../01-concepts.md) §3.17's test cleanly** — it is *the
single sanctioned way* to modify the loop, and the code enforces that by making the alternative
strictly less capable.

### The default stack, in order

Documented at `libs/deepagents/deepagents/graph.py:363-393`, and this ordering is itself the
architecture:

```
TodoListMiddleware
SkillsMiddleware            (if skills)
FilesystemMiddleware
SubAgentMiddleware
SummarizationMiddleware
PatchToolCallsMiddleware
AsyncSubAgentMiddleware     (if async subagents)
── user middleware is inserted here ──
harness profile extra_middleware
AnthropicPromptCachingMiddleware  (unconditional; no-ops off-Anthropic)
BedrockPromptCachingMiddleware
FireworksPromptCachingMiddleware
MemoryMiddleware            (if memory)
HumanInTheLoopMiddleware    (if interrupt_on)
```

Two things worth naming. **Human-in-the-loop is last** — it wraps everything, including user
middleware. And there is a **protected core**: `_excluded_middleware.py` maintains a set of
scaffolding middleware that a harness profile *cannot* strip, raising `ValueError` rather than
proceeding. That is a mechanically enforced floor, which is the thing
[`../00-README.md`](../00-README.md) §1.4 question 3 asks for and which our own system does not have.

### Backends — where files, memory and shell actually live

Not in the transcript at all, and it is the load-bearing abstraction:

`state` (thread-scoped, the default) · `store` · `filesystem` · `local_shell` · `sandbox` ·
`composite` · **`context_hub`** · **`langsmith`**

`ContextHubBackend` is *"Store files in a LangSmith Hub agent repo (persistent)"* — a **hosted,
cross-session, cross-agent context store**, addressed by `AgentEntry` / `FileEntry` / `SkillEntry`.
That is a context provider, and it belongs in
[`context-providers/`](./context-providers) rather than only here.

### Skills, and the overlay we thought was Indigo's

`SkillsMiddleware` implements *"Anthropic's agent skills pattern with progressive disclosure"* over
**ordered sources**, last-one-wins:

> *"This enables layering: base -> user -> project -> team skills."*
> — `middleware/skills.py`

**That is Indigo's `core/` vs `personal/` overlay, generalised to four tiers, in a library.**
[`../00-README.md`](../00-README.md) §5 row 5 lists the overlay as something to steal *from Indigo*;
it is now also available as an implementation to read.

### Profiles — the in/out-of-distribution rule, in code

The talk's build-vs-buy rule is implemented as `profiles/`, split `provider/` and `harness/`, with
`excluded_tools` and `excluded_middleware`. Deep Agents swaps the edit-file implementation by model
family and can shrink the tool surface *"when a provider or model needs a smaller or differently
described surface"* (`libs/ARCHITECTURE.md`).

### Permissions — a real policy primitive, and it is *not* deny-wins

`FilesystemPermission` (`middleware/filesystem.py:387`) is a dataclass of `operations · paths · mode`
where mode is **`allow` | `deny` | `interrupt`**:

- `allow` — the call proceeds
- `deny` — the tool returns a permission-denied error
- `interrupt` — *"the call is paused for human approval via `HumanInTheLoopMiddleware`"*

Paths must be absolute; `..` is rejected with `ValueError` and `~` with `NotImplementedError`.

**Read this against [`../2026-08-research/05-harness-factors.md`](../2026-08-research/05-harness-factors.md) Factor V — *"Scope only narrows … deny wins from any scope."*** `_check_fs_permission`
is **first-match-wins with an `allow` default**:

```python
for rule in rules:
    if operation not in rule.operations: continue
    if any(globmatch(path, pattern, ...) for pattern in rule.paths):
        return rule.mode
return "allow"
```

Rule order is therefore semantic, and a permissive rule listed first silently defeats a later deny.
QM and Claude Code both reached deny-wins independently; **Deep Agents did not**, and its own docs
warn that unanchored patterns *"collapse to `/` and conservatively over-fire."* This is the first
counter-example the corpus has to Factor V's claimed convergence, and it makes the factor a real
position rather than an observation.

### Rubric — *what done looks like*, graded, inside the loop

`RubricMiddleware` (`middleware/rubric.py`) is the piece with no analogue anywhere else in this
corpus:

> *"`RubricMiddleware` lets a caller declare **what done looks like** via a rubric. Each time the
> agent would otherwise finish — i.e. the model returns a response with no further tool calls — the
> middleware invokes a separate grader sub-agent against the transcript. If the grader returns
> `needs_revision`, its feedback is injected as a `HumanMessage` and the agent loop resumes. Grading
> repeats until the grader returns `satisfied` or `failed`, or `max_iterations` is reached."*

The verdict vocabulary is `satisfied | needs_revision | failed`, widened by the middleware to
`max_iterations_reached | grader_error`. Grading is **per-criterion**, and `GraderResponse` has a
`model_validator` that *rejects grader output where the overall result contradicts the per-criterion
verdicts* — a consistency check on the judge itself. A `satisfied` verdict that does not account for
every criterion is downgraded; a `needs_revision` that under-reports is left alone.

**This is FRACTAL's HANDOFF gate and `F7`'s Verdict, implemented as harness middleware, MIT.**

---

## 3. Primitives it names

| System | Its primitive set |
|---|---|
| **Deep Agents** | **middleware** · **backend** · **profile** · sub-agent · skill · permission · rubric |
| **Harbor** (eval) | task = `environment` + `solution` + `tests` + `instruction.md` |
| **LangSmith** | trace · trajectory · online evaluator · issue |

Seven — the top of the five-to-seven band
[`../2026-08-research/04-primitives-ontology-platform.md`](../2026-08-research/04-primitives-ontology-platform.md)
observes. The three added since the transcript (`backend`, `permission`, `rubric`) are all in the
half of the space our own model calls `F5`, `F6` and `F7`, which is the altitude the first version of
this file said Deep Agents did not reach.

---

## 4. `openwiki/` — the finding

Not mentioned in the talk. Not mentioned in the README. It is a directory in the repository root, and
it is the most direct challenge to LoomWarp's headline claim in the corpus.

**What it is.** A machine-maintained code wiki — `quickstart.md`, `architecture/`, `concepts/`,
`workflows/`, `operations/`, `testing/`, `integrations/`, `runtime-behavior.md` — regenerated by an
agent under `INSTRUCTIONS.md`:

> *"A code wiki for this local repository … Inspect git history to understand reasoning behind code
> changes … Keep pages grounded in the repository structure and recent code changes."*

**What makes it different from every other compiled wiki in this corpus.** Every page has a sidecar
in `.claims/`. **27 sidecar files, 515 claims.** The schema, verbatim from
`openwiki/.claims/quickstart.json`:

```json
{
  "schemaVersion": 1,
  "pageVersion": "sha256:6287e460f520b9136b8be86d1e1615deb86b6c8120bfe8f55f6c99a9c5bd1c97",
  "claims": [{
    "id": "claim_02af55a6152f4eb88b7452398694e90f",
    "statement": "The repository is a monorepo of independently versioned packages under libs/; …",
    "evidence": [{
      "resource": "repo://libs/DEVELOPMENT.md#L30-L49",
      "version": "repo-lines-v1:sha256:7fadcab…:<base64>"
    }]
  }]
}
```

The base64 tail decodes to a **drift-tolerant line fingerprint**:

```json
{ "selectedLineCount": 20,
  "firstSelectedLineHash": "85a573eb…", "lastSelectedLineHash": "7695993b…",
  "precedingContextLineCount": 3, "precedingContextHash": "fb735a15…",
  "followingContextLineCount": 3, "followingContextHash": "56817326…" }
```

It hashes the first and last selected lines plus three lines of context on each side, so the citation
survives edits elsewhere in the file and **fails loudly when the cited region itself moves or
changes**. And the run manifest, `.last-update.json`:

```json
{ "updatedAt": "2026-08-28T12:05:55.289Z", "command": "update",
  "gitHead": "457ac435e1216d3f7cac76d4e856b7aa020b5ea8",
  "model": "gpt-5.6-terra", "status": "complete", "language": "en" }
```

**Commit pinned. Model pinned. Timestamp. Per-claim content hashes.**

**What it therefore has, of our four properties:** hashing ✅ · version pinning ✅ · after-the-fact
reconstruction ✅ · **owner attribution ✗** · **join to outcome ✗**.

**And what it is *about* is the difference that saves the claim.** `openwiki` pins *what a document
asserts about a repository*. It is a **staleness detector for prose**. It does not record *what an
agent saw during a run*, does not attribute a source to an owner or an approver, and does not join
any of it to whether the resulting work succeeded. The unit is a **page**; ours is a **run**.

That distinction is real, it is narrow, and it should be stated in exactly those words from now on.
Full disposition in
[`../2026-08-research/08-humanlayer-and-deepagents-recheck.md`](../2026-08-research/08-humanlayer-and-deepagents-recheck.md) §2.

---

## 5. Evidence, policy and distribution — the three the last version said were absent

> **Corrected 2026-08-30.** The previous §9⑤ read: *"DeepAgents' four groups — execution environment,
> delegation, steering, context management — contain **no policy, no evidence, no distribution, no
> roster, no cost**. Those are not oversights; they are out of scope for a software harness."*
> **Three of the five are wrong.**

**Policy — `libs/deepagents/THREAT_MODEL.md`.** A full threat model with scope and assumptions, an
architecture diagram, **five data classifications** (DC1 conversation history … DC5 LLM API
credentials), **six trust boundaries** (TB1 User/Framework … TB6 Framework/Remote LangGraph API),
enumerated data flows, and **nine named threats** — T1 context injection via memory/skill files, T2
prompt-injection propagation through the task tool, T3 arbitrary shell execution, T6 path-restriction
bypass via shell, T8 async-subagent output injected verbatim, T9 an unsafe default
(`FilesystemBackend virtual_mode=None`) documented as a threat against itself. Plus an explicit
out-of-scope list with rationale. **No other system in this corpus ships a threat model.**

**Evidence — `libs/evals/`.** 136 evals across 8 categories with an auto-generated
`EVAL_CATALOG.md`; Harbor adapters; a `deepagents_clbench`; and `UNIFIED_SCORECARD.md`, a published
cross-model scorecard with `pass@k` / `avg@k`, per-category breakdown, a frozen 36-task "lite"
profile, and — this is the part worth stealing — **each number footnoted to a GitHub Actions run ID,
a date, a judge model, a harbor SHA, the sandbox, the rollout count and the wall-clock**, including
an honest note that *"autonomous includes 14 of 246 trials that errored … and are scored as
failures."* That is a reproducibility manifest for a benchmark result.

**Distribution — `action.yml` / `ACTION.md`.** `dcode` runs headless in GitHub Actions with
`shell_allow_list`, `max_turns`, `task_timeout`, `json` output, and rubric grading exposed as an
input. Interactive-only options such as `--auto-approve` are *deliberately not exposed* to CI. The
docs tell you to pin a reviewed SHA rather than `main`.

**Roster and cost survive.** There is no notion of *who else is on the team* and no per-unit-of-work
cost accounting. `J12 account` and `J14 know who exists` remain unoccupied here.

---

## 6. Credibility check

| | |
|---|---|
| **Shipping?** | Yes. MIT, 28.7k★, commits the day of writing. `dcode` installs via `curl \| bash` |
| **Self-serving?** | Partly, and visible: the frame is *"own your intelligence"*, which is also the case for not standardising on one lab's harness. `ContextHubBackend` and the LangSmith backend route persistence to a paid product |
| **Dogfooded?** | Demonstrably — `openwiki` is generated from this repo by an agent, and `UNIFIED_SCORECARD.md` benchmarks their own harness against six models |
| **Falsifiable?** | Yes, and unusually so. The scorecard names run IDs. The threat model names its own unsafe default |
| **Honest about limits?** | Yes — errored trials scored as failures; `virtual_mode=None` filed as T9; *"a model may still see a tool whose call can later be denied"* |
| ⚠️ **Sourcing** | This file is now clone-sourced at `3a0f68c`. Quotes are exact. The talk's date and venue were never established and it is cited only for intent |

---

## 7. What to steal, in priority order

| # | Take | Where it lands |
|---|---|---|
| **1** | **`RubricMiddleware`'s shape** — declare *what done looks like*, grade at the moment the agent would finish, per-criterion, feed the gap back, bound the loop | `F7` / FRACTAL's HANDOFF. We have the ceremony; this is the mechanism, including the grader-consistency validator that stops a judge from marking a rubric it did not read |
| **2** | **The evidence manifest on a benchmark number** — run ID, date, judge model, harness SHA, sandbox, rollouts, wall-clock, and errored trials counted as failures | `F7`/`J8`. This is the closest thing in the corpus to a **run receipt that someone actually shipped** |
| **3** | **A protected middleware core** — a set that a profile may not strip, enforced with `ValueError` | Directly answers `00-README.md` §1.4 q3 for us. Our guardrails are prose; this is eleven lines of code |
| **4** | **`allow / deny / interrupt` as one mode field** | `F6`. Three-level posture as a *value on a rule*, not three subsystems — cheaper than QM's or Indigo's version |
| **5** | **Ship a threat model** | `J15 secure and harden`. Nobody else in this corpus has one, and it costs a document |
| **6** | **The drift-tolerant line fingerprint** (`repo-lines-v1`) | `F3`/`F7`. A citation that can tell you it went stale — reusable verbatim for the Briefing's source pins |
| **7** | **Skill sources as an ordered overlay** — base → user → project → team, last-one-wins | `F3`/`F5`. The individual/team boundary `F2` says has no home, expressed as list order |
| **8** | **Profiles** — in/out-of-distribution resolved per model, not per domain | The question `05-preflight-spec.md` Phase 1 still does not ask |

---

## 8. What it still does not claim

- **The convergence question stays open.** Asked whether harnesses converge or diverge, the talk's
  answer was *"I don't know is the honest answer."* Nothing in the repository settles it.
- **No team altitude.** There is no roster, no multi-person coordination, no cost-per-unit-of-work,
  and no notion of who approved anything. `HumanInTheLoopMiddleware` interrupts *a* human, not a
  named one.
- **No promotion, no rollback, no retroactive invalidation.** `openwiki` regenerates; it does not
  promote a claim to canon or invalidate downstream work when a claim breaks.

> **The altitude argument survives, narrowed and better evidenced.** The first version of this file
> said the omitted components were *"the map of where our framework goes."* That was right about the
> destination and wrong about the map: policy, evidence and distribution have all since arrived
> inside the harness, in one release cycle. **What has not moved is the *plural* — roster, approver
> identity, cost per unit of work, and promotion across repositories.** Those are the ones to bet on,
> and this repository is the reason to bet on fewer of them than we did on 2026-08-27.

---

## 9. Sources

- **Clone**: `/Users/kevindeng/Googlyeye-Monsters/deepagents` @ `3a0f68ccd08166394e02fd736869482be5759f83`,
  2026-08-30. Every quote in §§1–5 and §7 is exact from this tree
- `libs/ARCHITECTURE.md` · `libs/deepagents/THREAT_MODEL.md` · `libs/deepagents/deepagents/graph.py` ·
  `middleware/{__init__,filesystem,rubric,skills}.py` · `backends/context_hub.py` ·
  `libs/evals/{UNIFIED_SCORECARD,EVAL_CATALOG}.md` · `ACTION.md` · `openwiki/.claims/*` ·
  `openwiki/.last-update.json`
- [`../2026-08-research/data/langchain-harness-evals-talk.md`](../2026-08-research/data/langchain-harness-evals-talk.md)
  — the transcript, cited for intent only. ⚠️ ASR output
- <https://youtu.be/HI2q3ci3Iuc> — the talk. **Date and venue still not established**
- **Harbor** — now verified as present via `libs/evals/harbor_adapters/` and pinned by SHA in the
  scorecard; no longer `◐ relayed`
