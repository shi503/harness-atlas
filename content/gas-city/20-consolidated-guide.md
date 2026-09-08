---
status: DRAFT
title: "Gas City — the consolidated guide"
tier: reference
project: harness-atlas
source: "gastownhall/gascity @ 042e965 · docs/ and engdocs/ · https://docs.gascity.com"
version_at_capture: "main/edge 042e965 (v1.4.1 is the latest release, 2026-08-15)"
source_verified: "2026-09-08"
---

# Gas City — the consolidated guide

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `gastownhall/gascity` at **`042e965`** and `docs.gascity.com`, **2026-09-08**.

One pass over the whole surface, for a reader with ten minutes. Every claim here is sourced in a
numbered document; this page carries the shape, not the field names.

---

## 1. The mental model

**Work is a row in a shared database, and nothing else is.** A unit of work is a **bead**; so is
mail, so is a running session, so is a convoy, so is a formula's every step. *"Sessions come and go;
the beads remain."* Every other design decision follows from that one.

**The loop closes through shared state, never a callback.** The page that introduces the primitives
says so in the same breath as it introduces them:

> *"the orchestrator acts on sessions — spawning, stopping, restarting them — but reads their
> progress from the bead store and event bus rather than being called back directly. The loop closes
> through shared state, which is why work survives a crash on either side."*

**Roles are absent from the binary, on purpose.** *"The orchestrator hardcodes **zero roles** — no
built-in 'manager' or 'reviewer.' Every role is configuration supplied through a **Pack**."*
A prompt template *"is its entire behavioral spec."*

**Two things that look like the same axis are not**: configuration resolves *down* through a
loading order in which later layers win and defaults only fill blanks ([`06`](./06-pack.md) §2);
identity resolves *up* through a rig prefix and an import binding that both qualify the same name
([`05`](./05-rig.md) §3).

---

## 2. The code layering, in the vendor's own mapping

`engdocs/architecture/nine-concepts.md` maps the Go substrate onto the six primitives. It is the
single most useful table for anyone reading the source:

| Code substrate | User-facing primitive |
|---|---|
| Session + Prompt Templates | **Agent** (who) |
| Task Store (Beads) | **Bead** (what) |
| Formulas + Molecules + Dispatch (Sling) + Orders + Health Patrol | **Formula** (how) |
| *(rigs register projects with the city)* | **Rig** (where) |
| Config | **Pack** (configures) |
| Event Bus | **Event** (observe) |

Six layering invariants hold across it: *"No upward dependencies … Beads is the universal
persistence substrate … Events are the universal outbound notification … Config is the universal
activation mechanism … Side effects (I/O, process spawning) are confined to Layer 0 … The controller
drives all SDK infrastructure operations. No SDK mechanism may require a specific user-configured
agent role."*

---

## 3. The five rules that matter most

1. **`bd` filters every query by prefix, so a bead from another rig reads as missing, not
   forbidden.** One Dolt server holds them all. *"The row is right there on the server."* —
   [`03`](./03-bead.md) §2a
2. **Graph-only formula constructs are rejected without the `[requires]` declaration**, with a named
   error — and v1 is not legacy, it is a peer contract. — [`04`](./04-formula.md) §1
3. **`provider` means the harness in an agent block and the runtime backend in a `[session]`
   block.** A third one selects a storage backend. The guide flags the overload itself. —
   [`02`](./02-agent.md) §1a
4. **An exec provider that returns exit `2` is treated as having succeeded.** That is the
   forward-compatibility mechanism, and it means a missing operation is silent by design. —
   [`08`](./08-runtimes-and-exec-providers.md) §1
5. **Nothing sandboxes an agent's tool calls.** *"Those commands are a feature, not a sandbox."*
   The trust model classifies *inputs*; the runtime constrains almost nothing. —
   [`10`](./10-trust-boundaries.md)

---

## 4. Choosing a surface

| You want to… | Use | Document |
|---|---|---|
| Define who does the work | an agent directory + `agent.toml` | [`02`](./02-agent.md) |
| Change the model, the endpoint, or the box independently | the five axes | [`02`](./02-agent.md) §1 |
| Track a unit of work durably | a bead | [`03`](./03-bead.md) |
| Write down a repeatable method | a formula (v2) | [`04`](./04-formula.md) §1 |
| Run that method on a schedule or an event | an order | [`04`](./04-formula.md) §4 |
| Add a project to the city | `gc rig add` | [`05`](./05-rig.md) §1 |
| Ship or reuse a whole configuration | a pack + `[imports.<binding>]` | [`06`](./06-pack.md) |
| Watch what the fleet is doing | `gc events`, the SSE API | [`07`](./07-event.md) §2 |
| Put sessions somewhere other than local tmux | a runtime backend | [`08`](./08-runtimes-and-exec-providers.md) §2 |
| Replace the bead store, the event log, or the usage sink | an `exec:` provider | [`08`](./08-runtimes-and-exec-providers.md) §5 |
| Teach every agent in a scope one workflow | a skill at pack or role level | [`09`](./09-skills-mail-and-mcp.md) §1 |
| Let two agents that share no session talk | mail (durable) or nudge (not) | [`09`](./09-skills-mail-and-mcp.md) §4 |

---

## 5. Enforcement, ordered — and how short the list is

1. **Nothing constrains an agent's own tool calls.** Whichever coding-agent CLI a `provider` names
   runs under that CLI's permission model.
2. **The trust model classifies inputs, not actions.** Five classes; three of them are *"trusted
   operator code"* or *"trusted dependency code"*, meaning "review it yourself".
3. **Four things bind mechanically**: secret-shaped env keys are stripped by name pattern;
   `credentials.toml` is refused at unsafe file modes; an unbindable abstract upstream field is a
   hard error rather than a fallback; a runtime name collision is a composition error rather than a
   shadow.
4. **Two defaults narrow exposure without enforcing anything**: the dashboard binds `127.0.0.1`,
   and webhook visibility is default-closed to `tenant`.

`docs/reference/trust-boundaries.md` names the classes and twelve execution surfaces;
[`10`](./10-trust-boundaries.md) collects what binds and the four scoped refusal lists.

---

## 6. What changed between this set and its own sources

Three places where two current, in-repo pages state different things. None is resolved here.

| Subject | One page says | The other says |
|---|---|---|
| **Cost accounting** | `docs/reference/gastown-command-map.md`: *"`gt costs` → no direct equivalent — No matching top-level cost accounting command today."* | `docs/reference/cli.md` (generated): `gc costs` exists — *"Aggregate recorded usage facts (model tokens and compute wall-seconds) by run for local cost insight"*, reading `.gc/usage.jsonl` |
| **MCP** | `docs/guides/capabilities-for-coding-agent-users.md`: *"MCP is list-only today … you wire the servers yourself"* | `docs/reference/cli.md` (generated): `gc mcp list` shows *"the precedence-resolved MCP servers that Gas City would project into the provider-native config"* |
| **The primitive test's condition 1** | `engdocs/contributors/primitive-test.md`: *"Atomicity — can agents do it safely without races?"* | `engdocs/architecture/nine-concepts.md`: *"Atomicity — can it be decomposed into existing primitives?"* |

A fourth, smaller one: `engdocs/contributors/docs-organization.md` gives *"Gas City 1.0 Pack System
(PackV2)"* as its worked example of a spec title, while the file's actual `title` is *"Gas City Pack
Specification"* — [`06`](./06-pack.md) §6.

In the first two, `docs/reference/cli.md` is **generated from the Go source** and gated by
`TestCLIDocsFreshness`, while the pages it disagrees with are hand-written and undated
(`engdocs/contributors/docs-organization.md`). In the third, both are hand-written and each cites
the other.

`gc costs` carries its own honesty note worth quoting, because it names what the number is not:
*"Cost is a list-price estimate for decision support, not an authoritative charge; invocations with
no pricing are flagged 'unpriced' and excluded from the cost total."* Pricing itself is
configuration — a `ModelPricing` entry per `(provider, model)` pair, each requiring a
`last_verified` date.

Separately, `gc metrics` is an **opt-in** command-usage telemetry channel: `gc metrics on`
*"Read[s] and accept[s] the command-usage disclosure on a verified TTY"*, `gc metrics off`
*"Disable[s] … and delete[s] local queued data"*, `gc metrics status` shows a *"redacted"* view, and
`--show-installation-id` *"print[s] the stable linkable installation pseudonym with a warning."*

---

## 7. Where the documentation stops

Absences recorded across this set, each naming what was checked:

- **No general "what Gas City is not" page.** Four scoped refusal lists exist, in four files, none
  of them about the same layer. Checked: `README.md`, `docs/index.mdx`,
  `docs/getting-started/faq.md`, `docs/getting-started/how-gas-city-works.md`, `SECURITY.md`, and
  the `docs.json` navigation. — [`10`](./10-trust-boundaries.md) §4
- **No specification for Bead or Rig**, and both absences are structural rather than accidental —
  `bd` is a separate upstream project, and Rig has no substrate layer. Checked:
  `docs/reference/specs/` (six files), `docs/reference/index.md`, `engdocs/specs/`. —
  [`01`](./01-the-six-primitives-and-the-admission-test.md) §4
- **The control-bead kinds are enumerated twice, differently** — six in `formula-spec-v2.md` §0.2,
  seven in `nine-concepts.md` §7. `tally` has its own spec section either way. —
  [`04`](./04-formula.md) §3
- **The event-type catalogue is dated 2026-04-25 and the changelog describes a family that is not
  in it.** Both name `internal/events/events.go` as the definition site. — [`07`](./07-event.md) §1a
- **`gc skill list` explicitly does not predict the materialized set.** For that, the reference
  sends you to inspect the sink on disk. — [`09`](./09-skills-mail-and-mcp.md) §1

Two structural notes about where the documentation lives. First, `docs.gascityhall.com` — the URL
in the repository README's own docs badge and in the profile above this folder — **301-redirects to
`docs.gascity.com`**; the `docs.json` logo already points at the new host, and
`docs/reference/schema/events.json`'s `$id` still carries the old one. Second, three of the largest
reference pages are **generated, never hand-edited**: `reference/cli.md` (185 KB, 250 command
sections), `reference/config.md` (130 KB), and everything under `reference/schema/` except its
index. A `.githooks/pre-commit` regenerates and stages them on any staged Go change.

---

## 8. The claims, walked against what this set documented

The claim ledger in [`00-README.md`](./00-README.md) records what Gas City says it is for. This
walks each claim to the mechanism behind it.

**This maps; it does not grade.** A row names the document carrying the mechanism, records that
nothing was found and says what was checked, or says the claim is outside this set's agreed scope.
There is no verdict column and none is implied.

| Claim, abbreviated | Mechanism, and where it is documented |
|---|---|
| *"Orchestration-builder SDK for multi-agent coding workflows"* | The six primitives and the machinery beneath them — [`01`](./01-the-six-primitives-and-the-admission-test.md) §1; the SDK/consumer boundary is itself a documented test — §2 |
| *"extracts the reusable infrastructure from Gas Town into a configurable toolkit with runtime providers, work routing, formulas, orders, health patrol, and a declarative city configuration"* | Runtime providers — [`08`](./08-runtimes-and-exec-providers.md) §2; work routing (`sling_query` / `work_query`) — [`02`](./02-agent.md) §4a; formulas, orders and health patrol — [`04`](./04-formula.md); `city.toml` — [`06`](./06-pack.md) |
| *"the orchestrator hardcodes zero roles"* | No role name appears in config as a type: an agent is a directory plus a prompt ([`02`](./02-agent.md)), and the layering invariant states it as a rule — *"No SDK mechanism may require a specific user-configured agent role"* (§2 above). The example roster ships in the separate `gastown` pack, which `core` deliberately does not — [`06`](./06-pack.md) §6 |
| *"the same engine becomes Gas Town, Ralph, or whatever you configure"* | Pack imports and the loading order — [`06`](./06-pack.md) §2–3; the progressive capability model, in which *"config presence is sufficient"* — §1 |
| *"an orchestrator runs it across a fleet of agents, outside your session"* | The v2 control dispatcher: *"No agent participates in control execution"* — [`04`](./04-formula.md) §3 |
| *"a crash never loses progress"* / *"Sessions come and go; the beads remain"* | The Dolt-backed bead store and session adoption on restart — [`03`](./03-bead.md), [`02`](./02-agent.md) §4 |
| *"Sixteen built-in harnesses"* | The harness table, each with its serving-env contract — [`02`](./02-agent.md) §2 |
| *"Everything user-facing is configuration … A 'reviewer' or 'planner' is a prompt you wrote, not a plugin you compiled"* | The 55-field agent surface and prompt-fragment assembly — [`02`](./02-agent.md) §1, §6 |
| *"Every reusable capability in Gas City comes from a pack"* | Packs, imports, bindings, and the bundled packs that are *"not implicit"* — [`06`](./06-pack.md) |
| *"Events … fired, not polled"* | `Watch()` on `events.Provider`, and the event-triggered order that reads the stream — [`07`](./07-event.md) §3–4 |
| *"Gas City is MIT-licensed and free … The only spend is the model usage of the agents you run"* | Confirmed: `LICENSE` is MIT. The usage sink and `gc costs` are the only spend-facing mechanism, and it disclaims authority over the number — §6 above |
| *"The open software factory platform that runs on Beads. Orchestrate agents … with factory configuration you own—configured, not coded"* (gascity.com) | *"configured, not coded"* maps to the pack model above. **"Runs on Beads" reaches past this set's scope** — `beads` is a separate repository and CLI, and its own surface was not read; this set documents the `beads.Store` seam and the store topology only, in [`03`](./03-bead.md) |
| *"Beads Team Server makes the work shared, governed, and visible"* (gascity.com) | **Outside this set's scope**, not an absence. Beads Team Server is a separate product on the vendor's landing page, offered *"through design partnerships"*; the agreed scope is the `gascity` Go orchestration SDK. The nearest in-scope surface is the hosted Service Protocol v0, which pointedly refuses tenancy — [`10`](./10-trust-boundaries.md) §4 |
| *"Gasworks — the multi-operator factory platform"* (gascity.com) | **Outside this set's scope**, and marked *"Coming soon"* by the vendor at capture. Nothing in the repository at `042e965` was read as its mechanism |
