---
name: harness-teardown
description: Tear one agent harness down into a comparable, glanceable profile — a 30-second card, the vendor's system map and workflows redrawn, a 33-row coverage matrix grouped by layer, the primitive set in the vendor's own words, and the details, limits, sources and unverified items collapsed beneath — then wire the result into the grids.
argument-hint: <harness name> [--sanity | --restructure]
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, WebFetch, WebSearch, Write, Edit, Bash(gh api *), Bash(gh search *), Bash(git log *), Bash(git rev-parse *), Bash(git status *), Bash(node scripts/check-doc-links.mjs)
---

# Harness teardown — Template v2

You are producing **one profile page for one harness**, in a fixed shape, so that it can sit beside
every other profile and be read cell for cell. The shape is not negotiable; the findings are.

**Four readers, in order of how long they stay.**
- **Thirty seconds** — the H1, the thesis line, the at-a-glance card, the system map. They leave
  knowing the altitude, the primitives, what it optimises for, and what it refuses.
- **Five minutes** — plus the workflows, the matrix, the primitives table. They can now place it on
  the grids themselves.
- **Lookup** — the details: one component, opened, with its path and source.
- **Trust** — identity, limits, sources, unverified. Only the reader who is about to cite you.

Write for the first reader; the others open what they need.

## Rules that override everything below

1. **Vendor's words only** in the identity quotes, the primitive definitions and the limitations.
   Verbatim, cited, dated. Your paraphrase goes in the card, the map paragraph, and the details'
   **Ships** line — nowhere else.
2. **Absence is recorded, never inferred.** An empty component is written
   `**Nothing here** — checked <the pages you checked>`. Naming the pages is the evidence. Two
   absences are not the same: **never built** is the form above; **deliberately removed** (a
   mechanism the vendor shipped and later deleted, or an instance that runs without a piece its
   upstream has) is written `**Removed** — <what, when, cited>`. The second is a design decision
   and belongs in §5's verdict; the first is just a gap.
3. **Do not borrow a word and change its referent.** If the harness calls something a *project* or a
   *skill* and means something different from the component of the same name, say so in the detail
   row and in the primitive table. The vocabulary ledger `vocabulary.md` exists for exactly this.
4. **A primitive set is 5–7 and forces a choice.** Count it. Say which of *5–7 healthy · 12+
   accommodation failure · refusal list · stated once, then dropped* it is. Do not pad a set to look
   complete or trim one to look healthy. **What counts:**
   - A **primitive** is a unit the *user authors* to express intent, and the harness makes the single
     sanctioned way to do so — an extension, a skill, a formula, a bead, a prompt template.
   - Infrastructure the *harness owns* — the session store, the settings file, the trust ledger, the
     model catalog — is **`(supporting)`** unless the vendor's own docs name it as a first-class
     authoring unit. Singular and sanctioned is necessary, not sufficient.
   - Two names for the same slot (`AGENTS.md` / `CLAUDE.md`) are **one** primitive; record the alias
     in the path cell.
   - A primitive that bundles others (a *package* over extensions, skills, prompts) stays one row;
     write `bundles: …` in its definition cell. The table is flat; the hierarchy is in the cell.
   - If the vendor publishes **no** list, say so, give the range you could defend (*"7–9"*), mark the
     count `⚠️ contestable`, and cite what you built it from. (`⚠️ contestable` on a count is a rule-4
     modifier, not a source mark; it may appear in the card and in §5.)
   - **The count is a snapshot.** Harnesses ship primitives between reads (Claude Code went 7 → 8 in
     a month). State the read date beside the count; never "correct" an older profile's count from
     a newer read without re-reading.
   - A **published refusal list** (*"No MCP. No sub-agents."*) is quoted once, in full, in §5, and
     pointed at from the card's **Refuses** row. Matrix notes and detail rows carry a pointer, not
     the quote again.
   - **Stated once, then dropped**: the vendor named a set in a document it has since superseded and
     never restated it. Count is `0 named`; the old set goes in a separate *candidates* table,
     clearly labelled as not the vendor's current claim. Never promote a candidate into the count.
5. **Two mark systems, and they never share a table.**
   - **5a — Source marks**, allowed only in §5–§10 (§5's own Source column included): `✅` direct (you read the vendor's own docs or
     repo — through a fetch tool is still direct; the mark is about *whose* words, not which tool) ·
     `↪` relayed (a secondary source, a snippet you did not open, or this repo's own earlier
     read) · `⚠️` unverified. Modifiers: `✅ (conflicting)` when two primary sources disagree (quote
     both; the newer commit wins the **Ships** line) · `✅ (doctrine ≠ code)` when the docs say a gate
     exists and the code says it was bypassed (the code wins **Ships**; the doctrine is quoted in
     §8). No unmarked claims.
   - **5b — Coverage marks**, allowed only in §4 — plus two echoes of §4 and nothing else: the card's
     **Coverage** row, and each component's §6 `<summary>` line (its §4 mark and note, verbatim),
     which must match §4 exactly. `●` the vendor names a first-class, user-authored
     unit for this row (it appears in §5, or is a cited vendor-named object) · `◐` present, not
     first-class — a mechanism without a primitive, an analogue at another altitude, or a proposal
     not shipped (note says `proposal`) · `○` absent, the detail row names the pages checked · `n/a`
     the row does not apply at this altitude, one-line reason in the detail row. Suffix `ᴴ` on `2a`
     only: a host shipping adapters *for* other harnesses, as in the component matrix.
   - A profile never carries an inferred mark (`◐?` is a grid-only mark for un-torn systems).
6. **Primary sources first, and the surface is wider than the docs nav.** The repo at a named commit
   or tag, its docs directory, its config schema, its examples, `gh api` on the repo, the vendor's own
   docs site. `packages/*/README.md`, the examples directory and design docs in the tree are
   in-bounds even when nothing links to them — mark them `(source-only, not in docs nav)`. A
   **sibling repository the vendor's own docs name** is in-bounds: read at least its README.
   Experimental packages change between reads — pin every citation to the commit you read, not
   `main`. Blog posts, reviews and search snippets are `↪` and go in §9 under *Secondary*.
7. **When two altitudes are both true, record both.** A process layer that hosts many loops *and*
   installs into each of them gets two bold altitude lines with the evidence for each; do not force
   one. Likewise the inclusion test's *"does it serve more than one person"*: where an org or
   managed-settings layer sits over a single-operator runtime, answer **per layer**.
8. **Sibling products that share vocabulary** (Gas Town / Gas City; Grok Bot / Grok Build; upstream /
   fork): every row names which product the claim is about. Rule 3 covers one harness borrowing
   another's word; this covers one vendor using the same word twice. **A system that already speaks
   this atlas's vocabulary** (a KD-built layer, or one that cites the 33 components) is a hazard:
   its own use of *primitive*, *component*, *evidence* is a claim to be verified against its files.
   Quote it as the vendor's word and classify it yourself. Same-author secondary documents about
   the same system have been wrong three times; re-check them at the pinned commit.
9. **High signal, low noise.** The profile describes *this* harness. No corpus placement ("second in
   the W4 queue"), no "why this file exists", no argument for why the reader should care, and no
   comparison to another harness anywhere in the page — the grids compare, the profile records. A
   **Ships** line leads with the mechanism, not the justification. If a sentence would survive
   deleting the harness's name, delete the sentence.

The standing rules of the repo (`CLAUDE.md`) and the definition of a primitive (the concepts document,
`01-concepts.md` §3.17) are the authorities behind this list; when this file and they disagree, they
win.

## Procedure

Work in this order. The card is written **last**, because it summarises what you found. The matrix
is **derived from** the details, never written first.

> **Modes.** `--sanity` tests the skill against a harness that already has material (write
> `content/<name>-draft.md`, skip step 11, end §10 with `### Skill findings`). `--restructure` reshapes
> an existing v1 profile into v2 **without re-reading sources** (see the mode notes at the end). Read
> the mode notes before step 1, not after.

1. **Fix the source.** Resolve the canonical repo (`gh api repos/<owner>/<name>` — follow redirects,
   note prior homes), the tag or commit you are reading (`git rev-parse` on a local clone, or the
   API), the docs root, and the read date. Write them into the frontmatter `source:` now. For the
   first release or tag, page the API (`--paginate`, or `?per_page=100&page=N` to the end) — the
   first page is the newest, not the oldest.
2. **Read the whole docs surface once, fast, and inventory the pictures.** Fetch docs pages **raw**
   (the `.md` source, or the repo file), not through a summarising fetch — summaries drop diagrams
   and event tables; one vendor lifecycle diagram was missed that way. README, docs index,
   configuration reference, security or permissions page, extension or plugin page, **examples
   directory**, changelog head, the non-goals section if there is one, the **glossary** if there is
   one (note its presence or absence in §7 — a glossary makes §5 an order of magnitude cheaper).
   While reading, list **every diagram the vendor's docs carry** (title, URL) and **every page that
   narrates a sequence** (numbered steps, an ordered lifecycle, a sequence diagram). That inventory
   drives steps 7–8 and goes in §9. List what you opened; absence rows will name it.
3. **Identity, the inclusion test, the loop question** — the content of §7, done now because the
   altitude decides how half the details read. Fill the 13-field table. Answer the **three
   questions** with a quoted line each: *does state persist across sessions, where, in what
   format? · does it serve more than one person? · does it bind mechanically, or only by prose?*
   Answer the **loop question**: *does it run the loop itself, host other loops, or install into
   one?* — with what runs the loop, what adapters it ships for other harnesses, and which other
   systems ship adapters for it. Fix the **altitude** in one bold line: process layer · gateway /
   host · runtime · hosted product (loop not user-visible). Two altitudes if rule 7 applies.
4. **Details — all 33 components, in the fixed order, under the twelve layer headings (§6).** For
   each: a visible `####` heading, then a collapsed body with **Ships** (your words, ≤ 5 lines, this
   harness only), **Path** (their words — file, key, command), **Source** (mark + citation). The
   `<summary>` line is filled in at step 6, from the matrix. Rule 2 for absences. If a row wants more than ~8 lines
   (thirty hook events, a full telemetry schema, three multi-agent objects), write the summary and
   link out — to a deep-read folder beside the profile (`content/<name>/…`) or the Tier-2
   component page. The profile stays one page for any harness.
5. **Primitives (§5).** One row per primitive: name · path or key · the project's own definition,
   verbatim · source. Supporting objects in the same table, prefixed `(supporting)`. Then the
   count and the verdict per rule 4; the refusal list quoted here if there is one.
6. **Matrix, derived from the details (§4).** Walk the 33 detail rows and give each one coverage
   mark by rule 5b. The note is ≤ 10 words: the primitive name (bold, linked to §5) for a `●`, the
   mechanism for a `◐`, nothing but the mark for a `○`. Write the totals line. Every `#` cell links
   to its detail anchor.
7. **System map (§2).** If the vendor's docs carry an architecture or loop diagram, redraw the one
   nearest the loop question as a house-notation mermaid `flowchart` — ≤ 14 nodes, ≤ 30 lines, no
   node or edge that is not in the original — as `assets/projects/<harness>/<what-it-shows>.mmd`
   with a `%%` header (source page, sha, read date, "no node or edge not in the original"), and
   embed a **copy** in §2. If the vendor has **no** diagram, draw the **DERIVED overlay**: the nodes
   of `assets/templates/harness-loop.mmd` and nothing else, relabelled only with names that appear
   in cited detail rows; header line `%% DERIVED — atlas anatomy carrying <harness>'s own names from
   §6; not a vendor diagram`, and the same sentence in the visible caption. Then one paragraph, in
   your words: **how it thinks about work** — what a unit of work is, where it enters, what decides
   it may proceed, where it lands.
8. **Workflows (§3).** One to three mermaid diagrams, each a transcription of a vendor artefact that
   *describes a sequence* — a sequence or flow diagram, a numbered-steps page, a lifecycle section
   that orders events. Priority: **(1) the turn** — session start → load → model → tool → gate →
   result → end; **(2) delegation**, when `3c` is `●`; **(3) the signature workflow** the vendor
   leads with, chosen as the one nearest the structured output. Each ≤ 25 lines, its own `.mmd`
   under `assets/projects/<harness>/`, a caption of ≤ 3 lines with the citation. A slot with no
   vendor sequence gets one line: `Turn: no vendor-documented sequence — checked <pages>.` Never
   invent a sequence. Diagrams you did not redraw go in §9 by title and URL.
9. **Limits (§8), Sources (§9), Unverified (§10).** Limitations quoted, grouped by source document,
   no commentary. Sources split primary / secondary, including the literal `gh api` commands you
   ran, the **Placement** line (the short-profiles row and both grid columns this profile feeds —
   this replaces the old "why this file exists"), and the undrawn-diagram inventory. Then
   everything you could not verify — bulleted, marked, reasoned. **§10 may not be empty.** If it
   is, you have not looked hard enough.
10. **The card and the thesis, last (§1 and the H1 line).** Every card value is ≤ 14 words and
    links to the row that carries it. The thesis line is the one sentence the README's highlight
    reel will quote.
11. **Downstream obligations** (skipped under `--sanity`; reduced to re-pointing under
    `--restructure`):
    - **(a)** the harness's row in the short-profiles page (`90-short-profiles.md`), marked *Torn
      down `<date>`*, linking to `content/<name>.md#1-at-a-glance`;
    - **(b)** the harness's column in the harness-alignment matrix (`04-harness-alignment.md` §2)
      — **a verbatim copy of the profile's §4 column**, totals equal, every `○` cell linking to
      `content/<name>.md#<id>-<slug>`; the profile is the source of truth, the grid copies;
    - **(c)** the harness's column in the component matrix (`02-component-matrix.md` §1), each cell
      citing the component anchor(s) it draws from;
    - **(d)** the **structured output** — the one artifact this harness optimises for (a record, a
      file, a span, a ledger); one artifact, not a list — is the card's row of that name;
    - **(e)** the harness's row in `index.md` §1: state cell → `v2 (<date>)`.
    Skipping any of these is a known live defect (the repo's ISSUES ledger, `ISSUE-001`).
12. **Check.** `node scripts/check-doc-links.mjs` passes (it resolves anchors). Then: `## 6. Details`
    at or before line 220; the file ≤ 700 lines; 33 matrix rows, 33 `####` headings and 33
    `<details>` blocks in §6, in order; no `◐` outside §4 and the two echoes, no `✅ ↪ ⚠️` before §5;
    matrix totals = card Coverage = grid column totals; every embedded mermaid diffs empty against
    its `.mmd`; no `####` heading sits inside a `<details>`.

## The page

Output path: beside the other profiles, in the repo's Tier-3 directory (`content/` here), as
`<name>.md` in lower-kebab-case, the harness's canonical short name. Ten numbered H2s, exact text,
so every anchor is stable. Budgets in brackets; **frontmatter through §5 ≤ 220 lines, whole file
≤ 700** (layout B costs four lines per component in §6; the number that matters is the first). A
harness that cannot fit links out to `content/<name>/`; it does not grow.

### Frontmatter [≤ 11]

```yaml
---
title: "<Name> — <one clause that carries the thesis>"
tier: reference
project: harness-atlas
created: "<YYYY-MM-DD>"
updated: "<YYYY-MM-DD>"
status: DRAFT
owner: <who ran the skill>
source: "<repo> @ <tag> (<sha>) · <docs root> · read <YYYY-MM-DD>"
provenance: OBSERVED
template: v2
---
```

### H1 and the thesis [3]

```
# <Name> — <owner or vendor>

***<One sentence: what it is, its defining move, and what it optimises for.>***
```

### `## 1. At a glance` [≤ 14]

A two-column table with an empty header, rows in this fixed order, every value ≤ 14 words, every
value linking to the row or section that carries it:

```
| | |
|---|---|
| **Altitude** | <runtime / gateway-host / process layer / hosted product — and the loop it runs or installs into> → [§7](#7-identity-and-inclusion-test) |
| **Primitives** | <count + verdict> — <names, separated by ·> → [§5](#5-primitives) |
| **Structured output** | <the one artifact> → [<id>](#<id>-<slug>) |
| **Binds mechanically?** | <yes / partly / no — the mechanism> → [2c](#2c-enforcement) |
| **State persists** | <where, in what format> → [5a](#5a-individual-memory) |
| **Serves** | <one operator / many — and at which layer> → [10b](#10b-org) |
| **Refuses** | <the refusal list in ≤ 14 words, or "no published refusal list"> → [§5](#5-primitives) |
| **Coverage** | ● n · ◐ n · ○ n · n/a n → [§4](#4-component-matrix) |
| **Deep read** | <only when a `content/<name>/` folder exists — link it> |
| **Source** | <repo> @ <tag> (<sha>) · <docs root> · read <date> |
| **Unverified** | <count> items → [§10](#10-unverified) |
```

### `## 2. System map` [≤ 45]

A caption of ≤ 4 lines (what the diagram shows; the vendor page it is redrawn from, with sha and
date; or the DERIVED sentence), the mermaid block (≤ 30 lines, a copy of the `.mmd`), then the
**how it thinks about work** paragraph (≤ 8 lines).

### `## 3. Workflows` [≤ 90]

One to three `### <workflow name>` subsections, each: a ≤ 3-line caption with the citation, a mermaid
block ≤ 25 lines (a copy of its `.mmd`). Or the one-line absence per slot.

### `## 4. Component matrix` [≤ 50]

The coverage legend in one line — `● named primitive · ◐ partial, present-not-first-class · ○ absent
(pages named in §6) · n/a does not apply at this altitude` — then **one** table: 12 bold layer-divider
rows carrying the layer names from `index.md` §3, 33 component rows in the fixed order, a totals
row. Two-product harnesses (Grok Bot / Build) carry two mark columns and two totals.

```
| # | Component | Mark | Primitive / note |
|---|---|:-:|---|
| **2 · Agent Harness** | | | |
| [2a](#2a-adapters--middleware) | Adapters & Middleware | ● | [**MCP server**](#5-primitives) · app-server · SDK |
| [2b](#2b-hooks) | Hooks | ● | [**Hook**](#5-primitives) — 11 events; MCP hooks fail open |
| [2c](#2c-enforcement) | Enforcement | ● | [**Permission profile**](#5-primitives) + OS sandbox |
| **● 14 · ◐ 13 · ○ 6 · n/a 0** | | | |
```

**The checklist.** These are the 33 rows, the layer they sit under, the question each answers, and
the anchor its detail heading produces. **This list is inline on purpose and is never read from a
spec.** Do not add a 34th row or rename one.

| Layer | # | Component | The question the row answers | Anchor |
|---|---|---|---|---|
| **0 · Foundation** | 0a | Substrate | Which model, which harness underneath, and what it costs to move | `#0a-substrate` |
| **1 · Environment** | 1a | Environment | What can the loop reach — shell, filesystem, network, other systems | `#1a-environment` |
| **2 · Agent Harness** | 2a | Adapters & Middleware | How the loop reaches any of it — providers, MCP, ACP, SDK, protocol | `#2a-adapters--middleware` |
| | 2b | Hooks | Which lifecycle events fire, in what language, fail-open or fail-closed | `#2b-hooks` |
| | 2c | Enforcement | What binds mechanically — deny lists, sandboxes, trust gates, and what survives auto modes | `#2c-enforcement` |
| **3 · System Stacks** | 3a | Control | How intent becomes work allowed to start — plan mode, approvals, run contracts | `#3a-control` |
| | 3b | Routing | Which model or agent gets which job, and who decides | `#3b-routing` |
| | 3c | Composition | Sub-agents, delegation, system-prompt composition | `#3c-composition` |
| | 3d | Configuration | Instruction files, settings precedence, scopes, managed settings | `#3d-configuration` |
| | 3e | Standards | Sanctioned ways to express things — schemas, conventions, refusal lists | `#3e-standards` |
| **4 · Capabilities** | 4a | Capability | Skills, tools, packages — what the team can do and how it travels | `#4a-capability` |
| | 4b | Capability Permissions | Who may use which capability, and how that is expressed | `#4b-capability-permissions` |
| **5 · Context ⟳** | 5a | Individual Memory | What one operator's session remembers, where, in what format | `#5a-individual-memory` |
| | 5b | Team Memory | What is shared across people and survives them | `#5b-team-memory` |
| | 5c | Knowledge | Curated, retrievable, cited context beyond memory | `#5c-knowledge` |
| **6 · Workspaces ⟳** | 6a | Product | Where the work lands and what it is not allowed to become | `#6a-product` |
| | 6b | Infrastructure | Runtimes, containers, remote execution, provisioning | `#6b-infrastructure` |
| | 6c | Estate | The inventory of repos, services and environments the team owns | `#6c-estate` |
| | 6d | Delivery | How work ships — CI, PR flow, release cut | `#6d-delivery` |
| **7 · Workflow Tasks** | 7a | Workflow Tasks | The unit of work, written down — tickets, beads, plans, todos | `#7a-workflow-tasks` |
| **8 · Trust** | 8a | Evals | What work must clear before it ships — benchmarks, rubrics, judges | `#8a-evals` |
| | 8b | Evidence | The record that it did — receipts, audit logs, transcripts | `#8b-evidence` |
| | 8c | Observability | Spans, metrics, events, and where they go | `#8c-observability` |
| | 8d | Efficiency | Token, cost and time accounting, and what acts on it | `#8d-efficiency` |
| **9 · IMPROVE** | 9a | Learning | What happens to a lesson after it is learned — authored skills, memory curation | `#9a-learning` |
| | 9b | Rituals | Recurring human practices the harness knows about — reviews, retros | `#9b-rituals` |
| | 9c | Cadence | Schedules, loops, cron, heartbeats | `#9c-cadence` |
| | 9d | Anti-fragile Lifecycle | How failure is captured and turned into a rule — defect ledgers, post-mortems | `#9d-anti-fragile-lifecycle` |
| | 9e | Raise the Floor | Mechanisms that lift the worst case — templates, guardrails, golden paths | `#9e-raise-the-floor` |
| | 9f | Diagnose the Bottleneck | Instruments that show where throughput is lost | `#9f-diagnose-the-bottleneck` |
| **10 · Teams & Agents** | 10a | Roster | Who is on the team — agents, people, roles, owners | `#10a-roster` |
| | 10b | Org | Teams of teams, tenancy, operators and scopes | `#10b-org` |
| **11 · Surfaces** | 11a | Surfaces | Where work is seen and agreed — TUI, IDE, chat, web, and which version is true | `#11a-surfaces` |

Anchor rule (GitHub's): the heading text `<id> <Component>`, lowercased, everything but letters,
digits, spaces and hyphens dropped, spaces to hyphens. `&` vanishes, which is why `2a` has a double
hyphen. Cross-file target form: `content/<name>.md#2b-hooks`.

### `## 5. Primitives` [≤ 20]

| Primitive | Path / key | Project's definition (verbatim) | Source |
|---|---|---|---|

Supporting objects in the same table, prefixed `(supporting)`. Then **Count:** `<n>` primitives,
`<m>` supporting. **Verdict:** per rule 4, one sentence of reason. The refusal list, quoted in full,
if there is one. Under *stated once, then dropped*, the candidates table follows, labelled.

### `## 6. Details` [≤ 400]

The source legend in one line — `✅ direct · ↪ relayed · ⚠️ unverified` — then twelve layer headings
in order, each holding its components. **Headings stay outside the collapsible; only the body
collapses.** (Tested 2026-09-04: GitHub scrolls a `#2b-hooks` link to the heading but does not open
a `<details>` that contains it, so a heading inside a collapsed block is unreachable by link.)

```
### 2 · Agent Harness

#### 2a Adapters & Middleware
<details>
<summary>● <b>MCP server</b> · app-server · SDK</summary>

**Ships.** <≤ 5 lines, this harness only, the mechanism first.>
**Path.** `~/.codex/config.toml` `[mcp_servers.*]` · `codex app-server`
**Source.** ✅ `LEARN/codex/extend/mcp` · ✅ `RS/app-server/README.md`

</details>

#### 2b Hooks
<details>
<summary>● <b>Hook</b> — 11 events; MCP hooks fail open</summary>

…

</details>
```

The `<summary>` line is the component's §4 mark and note, verbatim — the second of the two permitted
echoes of §4. HTML rules: a blank line after `</summary>` and before `</details>`; `<summary>` takes
inline HTML only (`<b>`, `<code>`, `<a href>`), never markdown — write `<code>x</code>` not
backticks, `<b>x</b>` not double asterisks, and no markdown links; **no mermaid inside `<details>`**. The
`####` heading text is exactly `<id> <Component>` from the checklist; the `###` layer heading is
`<n> · <Layer name>` from the checklist, nothing else. A body over ~8 lines links out and stays short.

### `## 7. Identity and inclusion test` [≤ 45]

The H2, then one `<details><summary>Identity · inclusion test · loop question</summary>` block
holding: the 13-field table (Canonical name · Prior names / homes · Owner / maintainer · GitHub URL ·
License · Stars · Language · Repo created · First release · Latest release · Install · Website / docs ·
What it says it is, verbatim), each with a source mark; the three inclusion questions, each answered
in bold and evidenced with a quote; the loop question with its evidence; the altitude line(s).

### `## 8. Limits` [≤ 40]

The H2, then one collapsed block: blockquotes grouped under a heading per source document. No
commentary between them.

### `## 9. Sources` [≤ 40]

The H2, then one collapsed block: **Primary** — the repo and API, including every `gh api` command
you ran, and every docs page by path; **Secondary** — marked `↪`, with what each was used for;
**Placement** — one line linking the short-profiles row and both grid columns this profile feeds;
**Diagrams not redrawn** — every vendor diagram from the step-2 inventory you did not draw, by
title and URL.

### `## 10. Unverified` [≤ 25]

The H2, then one collapsed block whose `<summary>` shows the count. Bulleted; each item: what, why
you could not, the mark it carries elsewhere. Mandatory, non-empty. Under `--sanity`, the
`### Skill findings` subsection closes it.

## Mode notes

**`--sanity`.** Tests the skill, not the harness's place in the corpus: write to
`content/<name>-draft.md`; perform none of the obligations in step 11; do not open the existing
profile or short teardown until your draft is written, then diff and record section by section
which is right and why; end §10 with `### Skill findings` — every place the template did not fit,
every ambiguous rule, every section hard to fill from primary sources, every step you skipped.

**`--restructure`.** Input is an existing v1 profile (Template A: §A–§F). **No source reads.** Move
the material into the v2 shape: the 13-field table, inclusion test and loop question → §7; §B rows →
§6 detail rows (Ships / Path / Source, source marks re-lettered `◐`→`↪`); §C → §5; §D → §8; §E → §9
plus a Placement line; §F → §10. The matrix's marks are **copied from the harness's existing column
in `04-harness-alignment.md` §2**, not re-derived; if a copied mark contradicts the detail row, keep
the mark and add `⚠️ mark and detail disagree at the v1 read` to the note. §2 and §3 are written as
recorded gaps, never as absence: `Diagram inventory not done at the <date> read — pending the
diagram pass.` (an existing `.mmd` under `assets/projects/<harness>/` becomes the system map; the
DERIVED overlay may be drawn from the detail rows). The card's **Structured output** row is written
only if the v1 text states one; otherwise `⚠️ not stated at the v1 read`. Frontmatter:
`updated: <today>`, `template: v2 (restructured from v1 read <date>, no re-read)`, `project:
harness-atlas`. Step 11 reduces to re-pointing every existing grid citation for this harness to the
new anchors and setting the `index.md` state cell to `v2 (restructured, diagrams pending)`. Delete
nothing: git history is the archive.

## Do NOT

- Read the 33 rows from any file at runtime — they are above, and they are the checklist.
- Infer a row, a primitive, a limitation, a diagram or a sequence. Quote or record absence.
- Put a coverage mark anywhere but §4, or a source mark anywhere in §4.
- Put mermaid inside `<details>`. Write the card before the details. Compare this harness to
  another inside its own page.
- Edit any other harness's profile, `spec/`, or `components/`.
- Add a 34th row, rename a component to match a vendor's word, or grade anything — profiles record;
  the grids compare; the maturity range grades.
