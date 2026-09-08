---
status: DRAFT
title: "Pi — the consolidated guide"
tier: reference
project: harness-atlas
source: "earendil-works/pi @ v0.85.1 · packages/coding-agent/docs · pi.dev"
version_at_capture: "v0.85.1"
source_verified: "2026-09-08"
---

# Pi — the consolidated guide

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `earendil-works/pi` and `packages/coding-agent/docs` at **v0.85.1**, **2026-09-08**.

One pass over the extension surface, for a reader with ten minutes. Every claim here is sourced in a
numbered document; this page carries the shape, not the field names.

---

## 1. The mental model

**Pi is a loop plus a list of things it declined to put in the loop.** `@earendil-works/pi-agent-core`
runs the turn; the CLI wraps it as `AgentSession`; and six named features are published as refusals
rather than as settings or flags. Everything above the loop is authored —
by the operator, by a third-party package, or by the model itself.

**The three surfaces below are one surface wearing three names.** An extension is a TypeScript module.
A pi package is an npm or git package containing extensions, skills, prompt templates and themes. The
five shipped replacements for the refused features are *examples* in the repository — neither installed
nor packaged. They are the same mechanism at three distances from the operator: written by you,
installed by you, or copied by you out of the repository.

**Nothing gates by default, and the vendor says so twice.** *"Pi does not include a built-in permission
system…"* and *"Pi does not include a built-in sandbox."* What shapes a run is the extension set the
operator installed. The one gate that does ship — project trust — is an **input-loading guard**, and
the security page bounds it explicitly rather than letting a reader over-read it.

---

## 2. The five rules that matter most

1. **A refusal is about the core, not about the repository.** The rationale post says pi *"does not and
   will not have a built-in plan mode"*; `examples/extensions/plan-mode/` ships in the same tree. Both
   hold. — [`01`](./01-the-refusals.md)
2. **Two of the six refusals have nothing shipped behind them.** No MCP example and no background-bash
   example exist; both instructions point outside Pi. — [`01`](./01-the-refusals.md) §3
3. **Parallel tool execution splits three event orders apart.** `tool_execution_start` fires in
   assistant source order, `tool_execution_end` in completion order, and final `toolResult` messages
   back in source order. — [`02`](./02-extensions.md) §2
4. **Mutating a `tool_call` input skips validation.** *"No re-validation is performed after your
   mutation."* — [`02`](./02-extensions.md) §2
5. **Trust gates project resources but never context files.** `AGENTS.md` and `CLAUDE.md` load from an
   untrusted repository; only `--no-context-files` stops them. —
   [`03`](./03-resources-scope-and-trust.md) §2

---

## 3. Choosing a surface

| You want to… | Use | Document |
|---|---|---|
| State standing expectations in prose | `AGENTS.md` / `CLAUDE.md` context files | [`03`](./03-resources-scope-and-trust.md) §2 |
| Set behaviour mechanically | `settings.json`, global then project | [`03`](./03-resources-scope-and-trust.md) §5 |
| Package an on-demand capability the model loads itself | Skill | [`03`](./03-resources-scope-and-trust.md) §1 |
| Save a prompt behind a slash command | Prompt template | [`03`](./03-resources-scope-and-trust.md) §1 |
| Act on a lifecycle moment, block a tool, or rewrite input | Extension event | [`02`](./02-extensions.md) §1 |
| Give the model a new tool, or replace a built-in one | `pi.registerTool()` | [`02`](./02-extensions.md) §3 |
| Move where tools execute — SSH, container, micro-VM | Pluggable operations + bash `spawnHook` | [`02`](./02-extensions.md) §3 |
| Restore a refused feature | The matching shipped example | [`01`](./01-the-refusals.md) §2 |
| Share any of the above with a team | Pi package, project `.pi/settings.json` | [`03`](./03-resources-scope-and-trust.md) §4 |
| Stop a repository changing your setup before you look at it | Project trust | [`03`](./03-resources-scope-and-trust.md) §3 |

---

## 4. Enforcement, ordered

Four layers, and only the last is outside the process:

1. **Tool selection** — `--tools`, `--exclude-tools`, `--no-builtin-tools`, `--no-tools`,
   `defaultTools`, `pi.setActiveTools()`. What the model can call at all.
2. **The `tool_call` handler** — the one blocking event, returning
   `{ block: true, reason?, terminate? }`, with the input mutable in place. `tool_call` errors block the
   tool, which is the fail-safe direction.
3. **Project trust** — gates *loading* of `.pi/` settings, extensions, skills, prompts, themes and
   system-prompt files. Not execution, and not context files.
4. **OS isolation** — delegated outward entirely: Gondolin micro-VM, plain Docker, a policy-controlled
   sandbox. `DOCS/containerization.md` documents three patterns; none is Pi's own code path.

**Layers 1–3 are the harness deciding about itself, and the vendor says as much:** *"A partial
in-process sandbox would be easy to misunderstand as a security boundary while still depending on the
host shell, filesystem, package managers, credentials, and extension code. Real isolation needs to come
from the operating system or a virtualization/container boundary."*

---

## 5. Self-extension, as a stated posture

**Five capability pages open with the same one-line banner**, in the vendor's voice, above the H1 —
*"pi can create extensions. Ask it to build one for your use case."* and its equivalents on
`DOCS/skills.md`, `DOCS/prompt-templates.md`, `DOCS/themes.md`, and `DOCS/packages.md` (*"pi can help
you create pi packages. Ask it to bundle your extensions, skills, prompt templates, or themes."*). The
refusals are written the same way: **five of the six** point at extensions, and the sixth — background
bash — points at tmux.

**The mechanism behind it is the model plus the documentation, not a scaffold.** Checked
`DOCS/extensions.md`, `DOCS/skills.md`, `DOCS/packages.md`, `DOCS/prompt-templates.md`, `DOCS/index.md`
and `CA/README.md` §CLI Reference: there is no `pi init`, no generator command and no template
repository. What makes the posture work is that the extension types are importable
(`@earendil-works/pi-coding-agent`) and the examples tree is large enough to be read as a corpus.

---

## 6. Where the documentation stops

Absences recorded across this set, each naming what was checked:

- **No MCP example, no background-bash example.** Checked the 67-row docs table, the grouped tables in
  `examples/extensions/README.md`, and the 79-entry directory listing. [`01`](./01-the-refusals.md) §3
- **No total event count published**; no per-event "added in" version in the docs — that record is the
  changelog. Checked `DOCS/extensions.md`, `DOCS/index.md`, `CA/README.md`.
  [`02`](./02-extensions.md) §6
- **No stated extension load order across the seven sources**, though ordering is *"extension load
  order"* throughout. Checked `DOCS/extensions.md`, `DOCS/settings.md` §Resources, `DOCS/packages.md`.
  [`02`](./02-extensions.md) §6
- **No resolution rule when two sources supply the same-named resource.** Deduplication is documented
  for packages only. Checked the five resource pages plus `DOCS/settings.md`.
  [`03`](./03-resources-scope-and-trust.md) §6
- **No signing or provenance mechanism for installed resources.** The stated control is reading the
  source first. Checked `DOCS/packages.md`, `DOCS/security.md`.
  [`03`](./03-resources-scope-and-trust.md) §6
- **No scaffold behind the "ask pi to build it" posture.** Checked six pages, §5 above.

**Two structural notes.** `DOCS/extensions.md` is a single 3,023-line file carrying the whole extension
surface — events, both context objects, the API, custom tools, custom UI and the examples index — and
it is the only place most of that is written. And the examples tree is documented by **two lists that
disagree**: the docs table has 67 rows against 78 non-README entries on disk, and the two use different
groupings and different one-line descriptions for the same file.

---

## 7. The claims, walked against what this set documented

The claim ledger in [`00-README.md`](./00-README.md) records what Pi says it is for. This walks each
claim to the mechanism behind it.

**This maps; it does not grade.** A row names the document carrying the mechanism, records that nothing
was found and says what was checked, or says the claim falls outside this set's agreed scope. There is
no verdict column and none is implied.

| Claim, abbreviated | Mechanism, and where it is documented |
|---|---|
| *"a minimal terminal coding harness"* · *"stay small at the core"* | The refusal list, and what is provided as an example instead of a built-in — [`01`](./01-the-refusals.md) §§1–2 |
| *"extended through TypeScript extensions, skills, prompt templates, themes, and pi packages"* | Four resource types across six sources — [`03`](./03-resources-scope-and-trust.md) §1; the event and API surface — [`02`](./02-extensions.md) §§1, 3 |
| *"Adapt pi to your workflows … without having to fork and modify pi internals"* | The return contract: fifteen of the thirty-six events cancel, block, replace, mutate or intercept, and built-in tools are overridable by name — [`02`](./02-extensions.md) §§1, 3 |
| *"Primitives, not features"* (`pi.dev`) | The four resource types and one container, plus the six refusals they are meant to cover — [`03`](./03-resources-scope-and-trust.md) §1, [`01`](./01-the-refusals.md) §2 |
| *"skips features like sub agents and plan mode"* | Both refused in `CA/README.md` §Philosophy and both shipped as `examples/extensions/` — [`01`](./01-the-refusals.md) §§2, 4 |
| *"install a third party pi package that matches your workflow"* | `pi install npm:\|git:\|https:\|ssh:\|path`, manifest or convention directories, per-type filtering, global/project dedup — [`03`](./03-resources-scope-and-trust.md) §4 |
| *"you can ask pi to build what you want"* | **The mechanism is the documentation plus importable types; no scaffold, generator or `init` was found.** Checked `DOCS/{extensions,skills,packages,prompt-templates,index}.md` and `CA/README.md` §CLI Reference — [`20`](#5-self-extension-as-a-stated-posture) §5 |
| *"Pi does not include a built-in permission system…"* | Recorded as the design, with the three levers that do exist and the boundary the vendor draws around them — [`03`](./03-resources-scope-and-trust.md) §2, [`02`](./02-extensions.md) §1, §4 above |
| *"can be shared with your team, and pi installs any missing packages automatically on startup after the project is trusted"* | Project `.pi/settings.json` under version control, with install deferred behind the trust gate — [`03`](./03-resources-scope-and-trust.md) §§2, 4 |
| *"Pi runs in four modes: interactive, print or JSON, RPC for process integration, and an SDK"* | **Outside this set's scope.** Depth and scope were agreed as the CLI/runtime's extension surface; `DOCS/{sdk,rpc,json,tui}.md` were not documented here. Not an absence — the pages exist and are substantial |
| *"if I don't need it, it won't be built. And I don't need a lot of things."* | A claim about intent, not a mechanism. The six refusals and their per-refusal reasons are recorded verbatim — [`01`](./01-the-refusals.md) §1 |
