---
title: "Comparisons — the component matrix"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# The component matrix

**What this is.** The same systems, decomposed into the components a process layer is made of. Rows are the components named in `[01-concepts.md](./01-concepts.md)`; columns are the systems.

**Notation.** `●` owns it as a **named primitive** — defined at `[01-concepts.md](./01-concepts.md)` §3.17: *a minimal, named, composable unit that the harness makes the single sanctioned way to express something* · `◐` partial, or present without being a first-class
thing · `○` absent. Deliberately matching the notation in the Indigo landscape analysis so the two
read side by side.

**Sourcing rule.** Every `●` traces to a cited primitive in that system's teardown under
`[systems/](./systems)`. Where a rating is inferred rather than documented, it is marked `◐?` and
listed in §4.

---



## 1. Components × systems

> **Two notes added 2026-08-27, after the** `F3` **re-spec.**
>
> `Context adapter` **is a new row, and its emptiness is the finding.** Row 1 has been `Harness adapter`
> since this matrix was written; there has never been a context equivalent, for us or for any peer. The
> objection *"you do not write an adapter for the thing you are"* is about the **harness** — `F3`'s
> Fabric provider is explicitly `native`, so we resolve against a context layer rather than being one.
> See `[../../specs/v0/09-context-layer.md](../archive/v0/09-context-layer.md)` §8; tracked as `GAP-25`.
>
> **Five rows below are sub-functions of** `F3`**, not peers of the rows around them** —
> `Individual memory`, `Team memory`, `Context assembly`, `Capture loop`, and
> `Provenance → outcome join`. Per `[../../specs/v0/02-functions.md](../archive/v0/02-functions.md)`
> §0.1, matrix components decompose a function; they are not a rival vocabulary for one. Their
> per-provider scoring lives at
> `[systems/context-providers/00-README.md](./systems/context-providers/00-README.md)` §3.
>
> **Columns stay process layers.** Providers are components *inside* one function and are a different
> axis; merging them is the genre error
> `[2026-08-research/06-frameworks-addendum.md](./2026-08-research/06-frameworks-addendum.md)` §0 names.

> **Five harness columns added 2026-09-02** — Hermes · Pi · OpenClaw · OpenCode · Grok Bot / Grok
> Build, placed beside Claude Code, which already set the precedent for a harness in this grid. The
> Grok column pairs a hosted product with the open harness beside it, the way `gstack / gbrain` does;
> whether Bot *runs on* Build is ⚠️ unstated at source, and the teardown says so. Every cell traces to the 33-row
> table in that system's teardown under `[systems/harnesses/](../content)`; the 33-component
> view is `[04-harness-alignment.md](./04-harness-alignment.md)` §2, and this grid is the same read
> compressed onto the eighteen concept rows. **Read the harness columns as a block**: they answer *what
> the loop ships natively*, and the process-layer columns answer *what gets installed into a loop*.
> The `Harness adapter` row is the one place the two senses collide — `ᴴ` marks a cell where the
> system is a **host** shipping adapters *for other harnesses* (OpenClaw's `agentRuntime` slot and
> ACP plugin; Hermes's Codex app-server runtime and import adapters), not a layer shipping an adapter
> *into* one. `04` §4.1 argues that is a third altitude.
>
> **Codex column added 2026-09-03** — [`content/codex.md`](../content/codex.md), first in the W4 queue
> because Hermes and OpenClaw both embed its app-server as a runtime (confirmed at Codex's own primary
> source this pass: `external-agent-migration` reads *from* Claude Code and Cursor, one-way; nothing
> ships an ACP crate). Placed with the runtime/harness block, before `gstack / gbrain`. No existing
> column re-scored.
>
> **Gas City column corrected 2026-09-03**, against [`content/gas-city.md`](../content/gas-city.md)
> (W4 #2) — the existing column was re-checked cell by cell, not re-scored wholesale. Three cells were
> wrong and are changed here, each traceable to the new profile's §B: **Individual memory** `○→◐`
> (per-agent session logs plus the sibling **Beads** product's `bd remember`/`bd prime` project memory
> are real, if one layer removed from a Gas-City-owned object — §B row 5a); **Team memory** `○→◐` (the
> shared, Dolt-backed bead store plus Mail persist across sessions that share no session — §B row 5b);
> **Context assembly** `○→◐` (agent context is seeded automatically per turn from the role's prompt
> template plus live work items and mail — `docs/guides/capabilities-for-coding-agent-users.md`, §B
> row 3c/5a). Every other Gas City cell in the grid below was checked against the same profile and
> left unchanged. The primitive-set row (below, "The primitive sets themselves") is also corrected:
> the prior text named "order" as a primitive and "Event Stream," and omitted Rig — the vendor's own
> admission test and `how-gas-city-works.md` name six: Agent, Bead, Formula, Rig, Pack, Event.
>
> **LoomWarp column corrected 2026-09-03**, against [`content/loomwarp.md`](../content/loomwarp.md)
> (W4 #3) — re-checked cell by cell against the files, not against the product's own self-assessment.
> One cell was wrong: **Context assembly** `○→◐`. `control/dispatch.py`'s `build_prompt_for()` reads a
> workstream's `context_bundle:` file list (hand-curated per workstream in the BLUEPRINT) and
> concatenates each file's text into the assembled prompt before the PRD — a real, mechanical
> assembly step, thinner than a first-class object (no hashing, versioning, or owner attribution — the
> unbuilt "Briefing" the framework names separately) but not absent. Every other LoomWarp cell in the
> grid below was checked against `content/loomwarp.md` §B and left unchanged — including `Standards
> tier` (●, confirmed) and `Agent definitions` (●, confirmed: `.claude/agents/*.md`).
>
> **FRACTAL column re-checked 2026-09-03**, against [`content/fractal.md`](../content/fractal.md)
> (W4 #4), cell by cell against the pinned vendored commit (`6398f6db`), not against LoomWarp's own
> federated build on top of it. Two cells were wrong: **Harness adapter** `○→◐` — `SETUP-CURSOR.md`
> documents translating Claude Code agent files into Cursor rules, thin and "community-supported" but
> a real, named second-harness path, the same shape as Hermes's `◐ᴴ`; **Skills** `◐→●` — seven
> first-class `SKILL.md` files, installed once by the README's own copy step with no ongoing sync
> script and none of LoomWarp's `cp -r` removal defect, the same standing every other `●` in this row
> earns. Every other FRACTAL cell was checked against `content/fractal.md` §B and left unchanged,
> including **Standards tier** (○, confirmed absent at the pinned commit — `git ls-tree 6398f6db --
> standards` is empty; a `standards/` directory now exists at upstream's current HEAD, outside this
> pinned commit's scope, flagged in the profile's §F rather than changing this cell).
>
> **Claude Code column re-checked 2026-09-04** against the new Template v2 profile,
> [`content/claude-code.md`](../content/claude-code.md) §4. One cell corrected: **Communication
> channel** ○→◐ — Channels (Telegram, Discord, iMessage, or a webhook, pushing events into a running
> session, two-way where the integration supports it) did not exist in this matrix's 2026-08-11 read;
> confirmed present today, research preview, not first-class → [`#11a-surfaces`](../content/claude-code.md#11a-surfaces). Every other cell was
> checked against the profile's §4/§6 and left unchanged, including **Standards tier** (○ — Agent
> Skills is a co-published technical schema, not the process-doctrine artifact this row asks for; see
> [`#3e-standards`](../content/claude-code.md#3e-standards)) and **Provenance → outcome join** (○ — the profile's own card states the same gap
> the corpus already recorded here).


| Component                     | Claude Code | Hermes | Pi  | OpenClaw | OpenCode | Grok Bot / Build | Codex | gstack / gbrain | Gas City | QM  | Indigo HQ | SageOx | FRACTAL | generic-cerebro | LoomWarp |
| ----------------------------- | ----------- | ------ | --- | -------- | -------- | ---------------- | ----- | ---------------- | -------- | --- | --------- | ------ | ------- | --------------- | -------- |
| **Harness adapter**           | n/a         | ◐ᴴ     | n/a | ●ᴴ       | n/a      | n/a              | n/a   | ●               | ●        | ●   | ●         | ●      | ◐       | ○               | ○        |
| **Context adapter**           | n/a         | ●      | ○   | ◐        | ○        | ○                | ○     | ◐               | ○        | ◐   | ○         | ○      | ○       | ○               | **○**    |
| **Multi-model / adversarial** | ◐           | ●      | ◐   | ◐        | ◐        | ●                | ◐     | ◐               | ●        | ●   | ○         | ○      | ○       | ◐               | ○        |
| **Agent definitions**         | ●           | ●      | ◐   | ●        | ●        | ●                | ●     | ◐               | ●        | ◐   | ●         | ◐      | ●       | ●               | ●        |
| **Skills**                    | ●           | ●      | ●   | ●        | ●        | ●                | ●     | ●               | ●        | ●   | ●         | ○      | ●       | ●               | ◐        |
| **Individual memory**         | ●           | ●      | ○   | ●        | ○        | ●?               | ●     | ●               | ◐        | ●   | ●         | ◐      | ○       | ●               | ○        |
| **Team memory**               | ◐           | ○      | ○   | ◐        | ○        | ○                | ○     | ●               | ◐        | ●   | ●         | ●      | ○       | ●               | ◐        |
| **Context assembly**          | ◐           | ●      | ◐   | ●        | ◐        | ●                | ●     | ◐               | ◐        | ●   | ●         | ●      | ○       | ◐               | **◐**    |
| **Task decomposition**        | ●           | ●      | ◐   | ●        | ●        | ●                | ●     | ●               | ●        | ◐   | ●         | ◐      | ●       | ●               | ●        |
| **Project board**             | ○           | ●      | ○   | ◐        | ○        | ○                | ◐     | ○               | ●        | ○   | ◐         | ○      | ○       | ◐               | ○        |
| **Communication channel**     | ◐           | ●      | ○   | ●        | ◐        | ◐                | ○     | ○               | ◐        | ●   | ○         | ●      | ○       | ◐               | ○        |
| **Permissions / policy**      | ●           | ●      | ○   | ●        | ●        | ●                | ●     | ○               | ◐        | ●   | ●         | ○      | ◐       | **○**           | ◐        |
| **Human-in-loop posture**     | ●           | ●      | ○   | ●        | ●        | ●                | ●     | ○               | ●        | ●   | ●         | ○      | ◐       | ◐               | ◐        |
| **Secrets brokering**         | ○           | ◐?     | ○   | ◐        | ◐?       | ●?               | ◐?    | ○               | ○        | ◐   | ●         | ○      | ○       | ○               | ○        |
| **Evidence / telemetry**      | ●           | ●      | ●   | ●        | ◐        | ●                | ●     | ◐               | ●        | ●   | ○         | ●      | ◐       | ●               | ◐        |
| **Capture loop**              | ◐           | ●      | ○   | ●        | ○        | ●                | ●     | ●               | ○        | ○   | ◐         | ●      | ○       | ●               | ○        |
| **Distribution / sync**       | ●           | ●      | ●   | ●        | ◐        | ●                | ●     | ●               | ●        | ●   | ●         | ●      | ○       | ●               | ◐        |
| **Standards tier**            | ○           | ○      | ○   | ○        | ○        | ○                | ○     | ○               | ○        | ○   | ○         | ○      | ○       | **●**           | ●        |
| **Provenance → outcome join** | ○           | ○      | ○   | ◐?       | ○        | ○                | ○     | ○               | ○        | ○   | ○         | ◐      | ○       | **◐**           | ○        |


Every mark in the `generic-cerebro` column traces to a cited primitive in `[systems/kd-built-frameworks/](./systems/kd-built-frameworks)`. It is prior art rather than a competitor — no licence, no releases, one operator — which is why it changes what several rows *mean* without changing who the rows are *against*.

### The primitive sets themselves

The matrix says *whether* a system owns a component. This says *what it calls it* — and a system's
primitive set is the most direct available answer to *what its architecture is*.


| System              | Its primitives                                                                                                                                                                                                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Claude Code**     | skill · subagent · hook · plugin · MCP server · agent team · dynamic workflow · instruction file (`CLAUDE.md`) — corrected 2026-09-04 against [`content/claude-code.md`](../content/claude-code.md) §5; "settings" dropped as `(supporting)` infrastructure, not an authored-intent primitive |
| **Hermes**          | profile · `SOUL.md` · skill · memory (`MEMORY.md`/`USER.md`) · toolset · plugin · hook · cron job · context file · **kanban task** (*"owns lifecycle truth"*)                                                                                                                       |
| **Pi**              | extension · skill · prompt template · theme · **pi package** (the one container for the other four) · session tree · settings · context file — and a published refusal list: no MCP, no sub-agents, no permission popups, no plan mode, no to-dos                                   |
| **OpenClaw**        | gateway · agent (`agents.entries`) · workspace files (`AGENTS.md` `SOUL.md` `USER.md` `IDENTITY.md` `MEMORY.md`) · channel + **binding** · skill · plugin · hook (two tiers) · tool policy / exec approvals / sandbox · automation / heartbeat · node · session · **agent runtime** |
| **OpenCode**        | agent (`agents/*.md`, `mode:`) · command · skill · plugin · tool · **permission** · rules · MCP server · (`references` · `policies`)                                                                                                                                                |
| **Grok Build**      | project rules (`AGENTS.md`, `.grok/rules/`) · skill · plugin / marketplace · hook · MCP server · permission rule / mode · **sandbox profile** · agent / persona / role — and **three config files written by three people**: `config.toml` (user) · `managed_config.toml` (fleet) · signed `requirements.toml` (pins) |
| **Grok Bot**        | **Bot** · **Computer** (one VM per member, `/workspace`) · skill (saved by asking, or **taught by demonstration**) · **routine** (schedule or Slack/GitHub event) · plugin / connector · approval / auto-review rule |
| **Codex**           | `AGENTS.md` · skill · plugin (bundles skill + MCP server) · subagent (TOML) · hook · MCP server · **permission profile** · **execpolicy rule** — ⚠️ contestable 8, no vendor list; mid-migration (`sandbox_mode` and `[permissions]` coexist; `codex mcp-server` deprecated for the app-server) |
| **Gas City**        | **agent** (who) · **bead** (what — Dolt-backed work-item substrate, not git-native JSON) · **formula** (how) · **rig** (where) · **pack** (configures) · **event** (observe) — six, corrected 2026-09-03 against [`content/gas-city.md`](../content/gas-city.md) §C; the prior text named "order" (a derived trigger pairing, not primitive, per the vendor's own admission test) and omitted rig |
| **QM**              | **scope** (user or room, each with its own memory, files, keychain, permissions, crons, sandbox) · posture · adapter                                                                                                                                                                |
| **Indigo HQ**       | company · worker · command · thread · skill                                                                                                                                                                                                                                         |
| **SageOx**          | Knowledge Bubble · Ledger · Team Context · Murmur                                                                                                                                                                                                                                   |
| **gstack / gbrain** | skill (chained through artifacts) · brain · source                                                                                                                                                                                                                                  |
| **FRACTAL**         | STRATEGIST doc · BLUEPRINT · workstream (PRD) · HANDOFF · PULSE — five, `⚠️ contestable` (vendor never states the set; assembled from the README's own per-object descriptions, per [`content/fractal.md`](../content/fractal.md) §C, 2026-09-03). "Workstream" and "PRD" corrected from two entries to one aliased pair — the BLUEPRINT names the workstream, the PRD is its concrete file, per rule 3 |
| **generic-cerebro** | decision entry · finding-class · `paths:`-scoped rule file · wiki tier                                                                                                                                                                                                              |
| **LoomWarp**        | **— unstated.** Artifacts exist; a *set* does not                                                                                                                                                                                                                                   |


Two things the table shows that the `●`/`◐`/`○` grid cannot.

**The count is small everywhere — five to seven.** That is the point: a primitive set exists to be held
in one reader's head. **A set that grows without bound is a feature list wearing the word.**

> **The harness rows test that sentence, 2026-09-02.** Pi holds at eight by *subtracting* — six
> refused features, each shipped as an example extension — and OpenClaw runs past twelve, with six
> task-shaped objects (background tasks, task flows, goals, standing orders, standing intents, a
> workboard) where the `Task decomposition` and `Project board` rows want one each. That is the
> accommodation failure the paragraph above predicts, visible in a shipped system.
> `[04-harness-alignment.md](./04-harness-alignment.md)` §3.3.

**The strongest sets force a choice rather than accommodating one.** Gas City makes you pick *beads or
Linear*. QM gives every scope the same bundle whether it is a person or a room. Accommodation is how a
system ends up with two ways to do something — the failure the primitive exists to prevent.

**And LoomWarp's blank is a finding, not an omission.** We have `registry/repositories.yaml`, BLUEPRINT,
workstream, HANDOFF, `events.jsonl` and the standards tier — but no stated set, no claim that each is
the single sanctioned way, and no check that a second way has not appeared. **You cannot claim "one way
to do each thing" until you can name the things.**

### Reading the three rows that matter

`Standards tier` **no longer has a single entry.** Nobody in the adoptable landscape ships *what good looks like* as a versioned, owned, inherited artifact — gstack encodes *process* opinion, the sequence, which tells you the order and not the bar. But the predecessor shipped the tier first (849 lines, six guides) behind the identical contract of *reference never copy* / *tighten never contradict*, **plus a compounding half LoomWarp lacks**: named review finding-classes that any review may append to, and that promote into canon once hardened. The unclaimed ground is real and still ours among adoptable systems. What is not true is that the artifact is novel — and the row's real content is the inheritance contract *plus* the compounding loop, of which we have one. See `[systems/kd-built-frameworks/06-capability-and-standards.md](./systems/kd-built-frameworks/06-capability-and-standards.md)` §5.

`Provenance → outcome join` **now has two** `◐`**s, and neither is a join.** SageOx holds both ends — automatic session capture, knowledge units that prime — with no evidenced content hashing, version pinning, owner attribution, or reconstructable per-run manifest. The predecessor is the exact mirror: hashes, a named owner, a required RACI block, an insert-only audit trail with before/after hashes, a validator — **and no join at all.** No decision references the work that implemented it except by a hand-written cross-reference nothing checks. The headline claim in `[00-README.md](./00-README.md)` §F-4 therefore survives intact, and it survives with a sharper implication: **LoomWarp is the only system in this matrix already holding both halves** — an inherited decision store and a structured run-event stream. For everyone else the join is a build; here it is an integration.

`Permissions / policy` **is the row to read against ourselves.** The predecessor scores a flat `○` — no settings file, no hooks, no validators anywhere, verified — after 130 workstreams run entirely on prose discipline. It is the best-evidenced demonstration in this corpus of what an authoring layer achieves with no enforcement layer beneath it, and the answer is *a great deal, exactly once, for the person who wrote the rules.* LoomWarp's `◐` on the same row, with its only live run using bypassed permissions, is the same gap at an earlier stage.

**LoomWarp's column is still mostly** `○` **and** `◐`**.** That is the honest reading and it matches the v1 self-grade (minimum 1, mean 2.3). The two `●`s are the standards tier and agent definitions. Nothing in this matrix supports a claim that LoomWarp is ahead on breadth; the argument has to be depth on one or two rows — and the new column narrows which rows those can be.

---



## 2. The decisions each system forces you to make

More useful than feature presence: what does adopting this system make you decide? Each row maps to a question `specs/v0/05-preflight-spec.md` already asks, or exposes one it is missing.


| System          | Forces you to decide                                                                                                                                                             | Pre-flight question                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Claude Code** | Permission mode; which settings scope owns what                                                                                                                                  | §4 Phase 3 `F6` enforcement layer ✅                                            |
| **Hermes**      | Approval mode (`smart / manual / off / yolo`) **and terminal backend** (`local / docker / ssh / modal / …`) — where the shell runs is a config key, chosen before the first call | Posture ✅; **missing** — no *where does execution run* question                |
| **Pi**          | Which refused features to install as extensions; whether to trust a project's `.pi/`; where isolation comes from, since the harness ships none                                   | **missing** — no *what does the harness refuse, and what fills it* question    |
| **OpenClaw**    | Exec mode (`deny → full`) × sandbox mode (`off / non-main / all`) × **roles** per operator; which runtime (`openclaw / codex / claude-cli / ACP`) answers each model             | Posture ✅; **missing** — no trust-domain / roles question, no runtime question |
| **OpenCode**    | The permission ladder, and **which rung owns which rule** — remote `.well-known` → global → project → managed → MDM, where a global `deny` cannot be re-enabled by a repo        | §4 Phase 3 `F6` ✅ — the same question as Claude Code, with a longer ladder     |
| **Grok Build**  | Permission mode × sandbox profile (`off / workspace / devbox / read-only / strict`) × **who writes which of the three config files** — and whether to read Claude Code's and Cursor's config at all (`[compat.claude]`, `[compat.cursor]`) | Posture ✅; **missing** — no *who owns which configuration file* question; no *which other harness's config do we inherit* question |
| **Grok Bot**    | Which actions require approval vs. auto-review; local-computer execution policy (`Ask / Always / Never`); which Bots exist and what each one's job is | Posture ✅; **missing** — no *roster* question (`10a`) |
| **gstack**      | Which host; whether skills live in your repo or the company's                                                                                                                    | §4 Phase 1 `F0` harness + portability ✅                                        |
| **gbrain**      | Personal brain or team brain; which git sources belong to which                                                                                                                  | **missing** — `F3` has no individual/team question                             |
| **Gas City**    | **beads or Linear** for work tracking; wake mode per agent                                                                                                                       | **missing** — no project-board question                                        |
| **QM**          | Scope boundary — per user or per room; strict / auto / dangerous                                                                                                                 | Partially — posture ✅, scope boundary **missing**                              |
| **Indigo HQ**   | `core` vs `personal` overlay split; hook profile minimal/standard/strict                                                                                                         | **missing** — no overlay question                                              |
| **SageOx**      | What counts as a decision worth capturing; automatic or reviewed                                                                                                                 | **missing** — `F8` question is only "not yet / corpus / gate"                  |
| **LoomWarp**    | Source of truth; risk tier per action class                                                                                                                                      | §4 Phase 1 `F1` SoT ✅                                                          |


**Five missing questions.** The pre-flight spec is well-formed on Ground and Trust and thin on the two places peers force the most consequential choices: the **individual/team memory boundary** and the **project board**. Both should be added; both are cheap questions with expensive defaults.

**Three more from the harness rows (2026-09-02):** *where does execution run* (Hermes's backend,
OpenClaw's sandbox and exec host — a `6b` question the spec never asks); *which runtime answers which
model* (OpenClaw's `agentRuntime`, Hermes's Codex hand-off — a `0a` question that did not exist when
one harness meant one loop); and *what does the harness refuse* (Pi — the question that decides what
the process layer must supply). **A fourth from Grok Build:** *who writes which configuration file* —
its docs open the config reference with *"Three files configure Grok Build, and they are written by
different people,"* which is `10b`'s question asked of layer `3d`.

> KD Note: the pre-flight spec needs to be rewritten after we've defined all the "levers" and "warps" that we're asking you to make.  Because this is the main approach and function we're going to show off to product owners / system designers / architect level developers this should be well constructed and engaging for teams to walk through the structure and be able to walk away with a well formed .md spec for how their framework is going to be setup. 
> "wow moment" opportunity could be that this is built as an explainer artifact that is in the form of an 'ad-lib' style setup.  Where we can walk through the various layers and "pick responses" from a template as well as have the form configure itself based on high-level decision.  
> bonus points can be applied where the form can allow 'free-form' additions where when they select 'something else' this can get a free-form text field (in the style of a side-panel threaded comment) where they can write in what they want. 
> making this 'agentic' can be as simple as creating a generic-cerebro `/initiative-interview` interactive AskUserQuestion where the agent session takes on the role as a framework consultant and can interactively update the .html as you chat with it. 
> don't make this tedious: in order to prevent analysis paralysis, we need to have templated answers and standards pre-defined for these.  we can use the project's own setup as a template but need to have things in so someone can quickly set this up. 

---



## 3. Where the differentiation claim now stands

`specs/v0/02-elements.md` §6 lists four rows carrying LoomWarp's claim. This matrix tests them.


| Claim                                  | Status after this analysis                                                                                                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **The Briefing (**`F3`**)**            | ⚠️ **Contested.** `ox agent prime` ships context assembly from team memory into every session, across a dozen harnesses, MIT-licensed, funded at $15M. The *briefing* is no longer unclaimed |
| **The Standards tier (**`F5`**)**      | ✅ **Holds.** Zero of seven peers ship it — and zero of the four harnesses added 2026-09-02. Strongest remaining claim                                                                        |
| **The join (**`F7`**)**                | ✅ **Holds, narrowed.** SageOx holds both ends but does not evidence hashing, version pinning, owner attribution, or reconstruction of a past run                                             |
| **Promotion with rollback (**`F8`**)** | ✅ **Holds.** Nobody ships promotion with rollback or retroactive invalidation                                                                                                                |
|                                        |                                                                                                                                                                                              |


> KD Note: it's ok, our goal in this pass is to create a trustworthy framework and move the industry standard forward. 

**The correction this forces.** `02-functions.md` currently says the Briefing is *"LoomWarp only — does not exist yet."* Half of that is now false. The defensible statement is narrower and better:

> Context assembly is shipping. **Context *provenance* — a hashed, versioned, owner-attributed
> manifest of what an agent saw, reconstructable after the fact and joined to that work's outcome — is still unclaimed by everyone in this matrix.**

That is a smaller claim and a sharper one, and it is corroborated four times independently: Garry Tan (*"a brain nobody curates is a garbage dump with great search"* — provenance tracking, contradiction checks, a librarian), the prior AI-native rubric's own self-grade, our Claude Code gap analysis, and the Indigo landscape analysis's whitespace #4 — *"no one can answer 'what context did the agent see, from which source, when, and who approved it.'"*

**What would falsify it.** Stated so this document can be checked rather than believed: the claim
dies if any of SageOx, Anthropic, or a memory vendor ships a per-run manifest that pins content
versions and can be reconstructed later. The Indigo analysis predicts Anthropic ships team context sync within 12–18 months of June 2026, and predicts a memory interop standard under AAIF. Either would take most of this ground. **Re-check this section by 2026-12-01.**

---



## 4. Design principles, adopted or rejected explicitly

Two named principles from the landscape that bear directly on `standards/`.

**Thin harness, fat skills** (gbrain). Three layers: fat skills on top where *"90% of the value
lives"*, a thin ~200-line harness in the middle, deterministic tooling underneath. Decision rule:
*"If it's a lookup table, it's code. If the agent needs to think, it's a skill."*

> **Adopt.** This is *deterministic control, probabilistic labor* stated more operationally than our
> version. The decision rule is directly liftable and gives implementers a test our principle does
> not.

**Multi-model adversarial review** (Gas City). Run the review formula across Codex, Claude and Gemini in parallel because *"each one has been trained differently and has a different point of view."*

> **Record, do not adopt yet.** It is a Learning technique, not a portability property, and it
> conflicts with nothing — but it presumes `F8` infrastructure LoomWarp does not have. Belongs in the backlog against `F8`, not in v1.

---



## 5. Ratings marked as inferred

Honesty requirement — these are the cells rated from indirect evidence rather than documented
primitives, and they should be corrected by anyone who knows better.


| Cell                             | Why inferred                                                                                                                                                            |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Gas City · Individual memory `◐` | Corrected 2026-09-03 from `○` — no Gas-City-owned memory *primitive*, but real individual memory exists one layer down: per-agent session logs and the sibling Beads product's `bd remember`/`bd prime`, surfaced through the Bead primitive rather than a Gas City feature of its own. `content/gas-city.md` §B row 5a |
| QM · Secrets `◐`                 | Keychain view is part of the scope bundle; brokering behaviour not documented                                                                                           |
| SageOx · Individual memory `◐`   | Ledger is per-repo and cross-machine; whether a personal scope exists is not stated                                                                                     |
| Indigo · Evidence `○`            | No telemetry or event stream documented; the PM analysis notes no audit trail                                                                                           |
| gstack · Evidence `◐`            | `evals/` exists in gbrain; run-level telemetry not documented                                                                                                           |
| Hermes · Secrets `◐?`            | `hermes egress` credential firewall / iron-proxy is listed in the docs nav and named in SECURITY.md; the page body was not read (2026-09-02)                            |
| OpenCode · Secrets `◐?`          | Enterprise SSO *"to obtain credentials for your internal AI gateway"* is brokering for one credential class; nothing documented for tool or MCP secrets                 |
| OpenClaw · Provenance `◐?`       | Memory-provenance table records entry origin per agent/session — provenance on the **memory** side, same shape as SageOx's `◐`; no per-run manifest, no join. `04` §3.6 |
| Grok · Individual memory `●?`    | Bot memory is a named, automatic, per-Bot store whose **format and location are undocumented**; Build's is documented (`~/.grok/memory/MEMORY.md` + SQLite) but *"experimental and disabled by default."* The `●` rests on the Bot half |
| Grok · Secrets `●?`              | Bot: hosted-MCP sign-in tokens *"stay with Cursor's backend, which runs those tool calls on the computer's behalf"*; secure secret request is *"masked, excluded from the transcript, and not shown to the model."* Brokering by description, on a closed product; Build's half is `◐` (0600 credential file, env scrubbing) |
| Codex · Secrets `◐?`             | `codex-rs/secrets` and `codex-rs/keyring-store` crates exist in the tree and `agent-identity` signs per-agent assertion headers; crate contents were not read this pass, only the file/directory listing — `content/codex.md` §F |


> KD Note: it's probably inferred that the local user context is also inherited in your harness (eg. claude code's local memories and jsonl sessions) and the affordance we made in generic-cerebro is that users would have ./specs/ where project local specs and planning were stored and we would have individual .gitignored  `./_dev/<username>/` folders for any individual sandboxes and playgrounds. 

---

*Next:* `[03-jtbd.md](./03-jtbd.md)` *— what each system says it is for.*