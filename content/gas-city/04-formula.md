---
status: DRAFT
title: "Formula — two peer contracts, three verbs, and the control beads"
tier: reference
project: harness-atlas
source: "gastownhall/gascity @ 042e965 · docs/guides/understanding-formulas.md · docs/reference/specs/formula-spec-v2.md · engdocs/architecture/orders.md"
version_at_capture: "main/edge 042e965 (v1.4.1 is the latest release, 2026-08-15)"
source_verified: "2026-09-08"
---

# Formula — two peer contracts, three verbs, and the control beads

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `gastownhall/gascity` at **`042e965`**, **2026-09-08**.

*"A formula is how a job gets done — written down once as a method instead of steered live in a
prompt … Applying a formula materializes its steps as beads, and from that moment the work is
independent of both the formula file and any agent session."*
— `docs/guides/understanding-formulas.md`

Under the vendor's own code-layering map this one primitive absorbs four subsystems —
*"Formulas + Molecules + Dispatch (Sling) + Orders + Health Patrol"* (`nine-concepts.md`) — so this
document follows that grouping rather than splitting them.

---

## 1. v1 and v2 are peers, not a version ladder

Both contracts are supported. `engdocs/contributors/docs-organization.md` makes the naming a
corpus-wide rule: *"They are peer contracts and v1 is the default — never call v1 'legacy'."*

| | **v1** (default) | **v2** (`[requires]`) |
|---|---|---|
| Engine | *"the agent you sling to"* | *"the orchestrator"* |
| Steps | *"resolved at apply, then inert"* | *"independently routable units"* |
| Control flow | *"none after apply"* | *"check/retry/drain/tally, scope checks, finalize"* |
| Routing | *"one agent, one session"* | *"many agents and pools (`gc.run_target` per step)"* |
| Shape | *"parent-child molecule tree"* | *"flat graph of blocking edges + appended finalize"* |

The guide's advice is unambiguous — *"For new work, choose v2"* — and the opt-in is one table:

```toml
[requires]
formula_compiler = ">=2.0.0"
```

**Base constructs mean the same in both contracts**: `steps`, `needs`, `children`, `condition`,
`loop`, `vars`, `extends`. **Graph-only constructs require the declaration** — `check`, `retry`,
`drain`, `on_complete`, `tally`, `timeout`, and reserved `gc.*` step metadata — and compiling
without it fails with a named error: *"requires: formulas that use graph-only constructs must
declare `[requires] formula_compiler = ">=2.0.0"` or the deprecated contract = "graph.v2"
explicitly."*

**Two v1-only edges remain**, both stated as gaps rather than reasons to start on v1:

- *"`gc converge` accepts only v1 formulas (it rejects v2 until it has an explicit input convoy
  target)."*
- *"Container dependencies have a v2 gap. Under v1 a step that `needs` a parent waits for all of
  that parent's children; the v2 compiler creates no parent-child edges yet, so the dependency gates
  only on the parent step"* — tracked as issue #3451. *"Until that lands, list the children you
  depend on explicitly in `needs`."*

---

## 2. Cook, sling, or order

Three verbs create instances, and the guide separates the **verb** (how it is created and routed)
from the **outcome** (what lands in the store, which *"follows from the contract, not from a
separate choice"*).

| Verb | Command | Behaviour |
|---|---|---|
| **Cook** | `gc formula cook <name>` | *"creates without routing … compiles the formula, writes its beads into the current scope's store, and stops. Nothing wakes up."* `--attach <bead-id>` grafts a sub-DAG onto existing work |
| **Sling** | `gc sling <target> <name> --formula` | *"creates and routes … cooks and routes in one motion"* — the one-shot dispatch verb |
| **Order** | an `order.toml` trigger | *"scheduled dispatch … the orchestrator instantiates and routes the formula to the order's pool each time the trigger fires"* |

| Outcome | From | Per-step beads | Root is visible work |
|---|---|---|---|
| Single-bead run | v1, no steps (`phase = "vapor"`) | *"No — steps stay in the recipe"* | *"Yes — the root is the work"* |
| v1 run with steps | v1 with steps (a *molecule*) | *"Yes, as children"* | *"No — the root is a container"* |
| v2 workflow | v2 | *"Yes, independently routable"* | *"No — the root blocks on finalize"* |

**One rule cuts across all of it**: *"cook and sling in the store the worker reads."* Cook
materializes into the scope it is run from (`--rig`, else the enclosing rig directory, else the
city), and sling refuses a cross-store route with the literal error `refusing cross-store route`.
*"City-scoped agents are the exception: they are cross-store eligible and may serve work in any
store."*

A pool *"wakes only for Ready-visible work, so slinging a v1 run at a pool is refused outright —
convert to v2 first."*

---

## 3. The compiled shape, and who executes what

`docs/reference/specs/formula-spec-v2.md` §0.2 — *"Authoritative specification"*, last verified
2026-06-12, primary implementation `internal/formula`, `internal/graphv2`, `internal/dispatch`,
`internal/molecule`:

```text
formula (TOML)
  → compiled recipe (flat, topologically ordered)
    → workflow root bead          (type "task", gc.kind = "workflow")
    + step beads                  (independently routable work, blocking deps only)
    + control beads               (orchestrator-owned: check, retry, fanout,
                                   drain, scope-check, workflow-finalize)
```

**Execution responsibility splits by bead kind**, and the spec states both halves:

> *"**The orchestrator executes every control bead.** The control dispatcher in `internal/dispatch`
> evaluates check and retry budgets, expands fan-outs, scatters drains, enforces scope failure
> policy, and finalizes the workflow. **No agent participates in control execution.**"*
>
> *"**Agents execute only plain work beads.** Step beads are independently Ready-visible and
> routable, so different steps of one workflow may be worked by different agents, pools, or
> providers."*

**The two lists of control-bead kinds do not match.** The spec's §0.2 fence names six —
`check`, `retry`, `fanout`, `drain`, `scope-check`, `workflow-finalize`. `nine-concepts.md` §7 names
seven, adding `tally`: *"control beads (check, retry, fan-out, tally, drain, scope-check,
workflow-finalize)."* `tally` is real either way — it has its own spec section, §3.4 *"On-Complete
And Tally"* — so the difference is in what the fence enumerates, not in what exists. Recorded, not
resolved.

The spec's runtime sections are the per-kind reference: §3.1 Check · §3.2 Retry · §3.3 Drain ·
§3.4 On-Complete And Tally · §3.5 Scopes And Failure Policy. It also carries a section named
**§4 "Accepted But Inert"**, a register `docs-organization.md` requires of every spec:
*"an 'Accepted But Inert' section for constructs the parser accepts but no runtime component
consumes. Specs are normative for **implemented** behavior and say so honestly instead of describing
intent."*

---

## 4. Orders — the WHEN

*"An Order automates when a formula runs, pairing a trigger (cooldown, cron, condition, event, or
manual) with the formula to fire — no human runs a verb."* An order is an `order.toml` inside a
formula directory, and its **name is the subdirectory name**.

**Five trigger types**, from `engdocs/architecture/orders.md` (`internal/orders/triggers.go`):

| Trigger | Fires when |
|---|---|
| `cooldown` | *"minimum interval since last run"* |
| `cron` | *"5-field schedule matching"* |
| `condition` | *"shell command exits 0"* |
| `event` | *"matching events after a cursor position"* |
| `manual` | *"explicit invocation only, never auto-fires"* |

**Two action kinds, mutually exclusive** — an order names *"a formula (or a shell command — never
both)"*:

| Kind | Field | What runs | Default timeout |
|---|---|---|---|
| **Exec order** | `exec` | *"a shell command run directly by the controller. No LLM, no agent, no wisp."* The script receives `ORDER_DIR` | **60 seconds** |
| **Formula order** | `formula` | *"the controller calls `MolCook` to instantiate a wisp and labels it for pool dispatch"* | **30 seconds** |

Three mechanisms worth knowing, each from the same page:

- **`ScopedName`** — *"a rig-qualified key that creates unique identity for orders across rigs."*
  City-level orders use the plain name (`dolt-health`); rig-level append `:rig:<rigName>`.
  It *"drives independent cooldown tracking, event cursors, and label scoping."*
- **Layer precedence** — order directories are scanned per formula layer, *"ordered lowest to
  highest priority; a higher-priority layer's order definition overrides a lower-priority one with
  the same subdirectory name (last-wins semantics)."*
- **The tracking bead** — created *"synchronously before each dispatch goroutine launches, labeled
  `order-run:<scopedName>`"*, serving a *"dual purpose: prevents the cooldown trigger from
  re-firing on the next tick, and provides execution history for `gc order history`."*

Cron schedules are evaluated in the city's `workspace.timezone` when an order sets no `tz` of its
own; *"Invalid names fail order discovery loudly rather than falling back silently"*
(`docs/reference/config.md`).

**Health patrol is an order, not a subsystem.** *"Health patrol is one kind of order: each tick the
orchestrator evaluates due triggers and fires them"* — *"it automates WHEN a remediation formula
runs"* (`engdocs/architecture/health-patrol.md`, `nine-concepts.md` §9).

---

## 5. Authoring, layering and drift

| Command | What it does |
|---|---|
| `gc formula list` | available formulas, including those from built-in packs |
| `gc formula show` | *"preview what a formula will produce before you create anything"* |
| `gc formula version-check` | *"catch when a run has drifted from the formula it came from"* |
| `gc formula cook` | compile and materialize without routing |
| `gc graph`, `gc trace cycle`, `gc trace reasons` | inspect the compiled graph and why a step is gated |

`extends` composes formulas — the shipped `gascity` pack *"wires them together with `extends` into
one composed method, not one giant file."* How requirements compose through `extends` is specified
in §5 of each spec.

**The shipped pack predates the current canon**, and the guide says so in its own admonition:
*"Every pack formula opts into v2 with the deprecated top-level `contract = "graph.v2"` key (not the
`[requires]` table) and is named `<name>.formula.toml` (not `<name>.toml`). Both spellings still
parse — `gc doctor` warns about the contract key."* Migration is tracked as issue #3462.

Naming rules are corpus-wide (`docs-organization.md`): `graph.v2` *"appears only as the deprecated
contract-key literal … never as the name of the v2 system"*, and *"'Deprecated' is reserved for
surfaces the specs enumerate as deprecated … It never applies to the v1 contract itself."*
