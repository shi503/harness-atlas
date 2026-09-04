---
name: harness-teardown
description: Tear one agent harness down into a comparable profile — identity, the three-question inclusion test and the loop question, all 33 component rows, its primitive set in the vendor's own words, its stated limits, its sources, and what could not be verified — then wire the result into the grids.
argument-hint: <harness name> [--sanity]
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, WebFetch, WebSearch, Write, Bash(gh api *), Bash(gh search *), Bash(git log *), Bash(git status *)
---

# Harness teardown — Template A

You are producing **one profile page for one harness**, in a fixed shape, so that it can sit beside
every other profile and be read cell for cell. The shape is not negotiable; the findings are.

**Who reads the result.** An AI engineer who has never used this harness and has five minutes. They
read the three opener paragraphs and have the thesis. They read §A and know what altitude it sits
at. They scan §B and see what it ships and what it does not. They read §C and know its primitives by
the vendor's names. §D–§F tell them how far to trust the rest.

## Rules that override everything below

1. **Vendor's words only** in the identity quotes, the primitive definitions and the limitations.
   Verbatim, cited, dated. Your paraphrase goes in "What it ships", nowhere else.
2. **Absence is recorded, never inferred.** An empty component row is written
   `**Nothing here** — checked <the pages you checked>`. Naming the pages is the evidence. Two
   absences are not the same: **never built** is the form above; **deliberately removed** (a
   mechanism the vendor shipped and later deleted, or an instance that runs without a piece its
   upstream has) is written `**Removed** — <what, when, cited>`. The second is a design decision
   and belongs in §C's verdict; the first is just a gap.
3. **Do not borrow a word and change its referent.** If the harness calls something a *project* or a
   *skill* and means something different from the component of the same name, say so in the row and
   in the primitive table. The vocabulary ledger `vocabulary.md` exists for exactly this.
4. **A primitive set is 5–7 and forces a choice.** Count it. Say which of *5–7 healthy · 12+
   accommodation failure · refusal list* it is. Do not pad a set to look complete or trim one to look
   healthy. **What counts** (settled after two runs on the same harness disagreed 8 vs 5):
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
     count `⚠️ contestable`, and cite what you built it from.
   - A **published refusal list** (*"No MCP. No sub-agents."*) is quoted once, in full, in §D, and
     pointed at from §C's verdict. Affected §B rows carry a one-line pointer, not the quote again.
   - A fourth verdict exists: **stated once, then dropped** — the vendor named a set in a document it
     has since superseded and never restated it. Count is `0 named`; the old set goes in a separate
     *candidates* table, clearly labelled as not the vendor's current claim; the verdict says which
     of the old names still exist as concrete objects. Never promote a candidate into the count.
5. **Every factual cell carries a mark**: `✅` direct (you read the primary source) · `◐` relayed (a
   secondary source, or a snippet you did not open) · `⚠️` unverified. No unmarked claims. A thing
   that is **specified but not shipped** (a design doc marked proposal, an acknowledged CLI gap) is
   `◐ (proposal)` with the source — neither "ships it" nor "nothing here". When **two primary
   sources disagree** (one page says *deprecated*, another says *experimental*), quote both, mark the
   cell `✅ (conflicting)`, and let the newer commit win for the "what it ships" column. A page you
   read through a fetch tool is still a primary read (`✅`) if it is the vendor's own docs or repo;
   the mark is about *whose* words, not *which* tool. When **doctrine and shipped code disagree**
   (the docs say a gate exists; the code comment says the gate was bypassed), the code is the
   primary source for "what it ships" and the doctrine is quoted in §D as a stated claim — mark the
   row `✅ (doctrine ≠ code)`. Seen in three consecutive teardowns; it is the normal case, not an edge.
   **A system that already speaks this atlas's vocabulary** (a KD-built layer, or one that cites the
   33 components) is a hazard: its own use of *primitive*, *component*, *evidence* is a claim to be
   verified against its files, not a shortcut. Quote it as the vendor's word and classify it yourself.
6. **Primary sources first.** The repo at a named commit or tag, its docs directory, its config
   schema, its examples, `gh api` on the repo, the vendor's own docs site. Blog posts, reviews and
   search snippets are `◐` and go in §E under *Secondary*. **The docs surface is wider than the docs
   nav**: `packages/*/README.md`, the examples directory and design docs in the tree are in-bounds
   even when nothing links to them — mark them `(source-only, not in docs nav)`. A **sibling
   repository the vendor's own docs name** is in-bounds: read at least its README. Experimental
   packages change between reads — pin every citation to the commit you read, not `main`.
7. **When two altitudes are both true, record both.** A process layer that hosts many loops *and*
   installs into each of them (Gas City) gets two bold altitude lines with the evidence for each; do
   not force one. Likewise the inclusion test's *"does it serve more than one person"*: where an
   org or managed-settings layer sits over a single-operator runtime, answer **per layer**.
8. **Sibling products that share vocabulary** (Gas Town / Gas City; Grok Bot / Grok Build): every row
   names which product the claim is about. Rule 3 covers one harness borrowing another's word; this
   covers one vendor using the same word twice.

The standing rules of the repo (`CLAUDE.md`) and the definition of a primitive (the concepts document,
`01-concepts.md` §3.17) are the authorities behind this list; when this file and they disagree, they
win.

## Procedure

Work in this order. Do not write §B before §A is done — the altitude decides how half the rows read.

> **`--sanity` first, because it changes step 9.** A sanity run tests the skill, not the harness's
> place in the corpus: write to `content/<name>-draft.md`, perform **none** of the four downstream
> obligations in step 9, and end §F with a `### Skill findings` subsection (see below). Read this
> before you reach step 9, not after.

1. **Fix the source.** Resolve the canonical repo (`gh api repos/<owner>/<name>` — follow redirects,
   note prior homes), the tag or commit you are reading, the docs root, and the read date. Every
   later citation is relative to these. Write them into the frontmatter `source:` field now.
2. **Read the whole docs surface once, fast.** README, docs index, configuration reference, security
   or permissions page, extension or plugin page, **examples directory** (open it — a run that skipped
   it missed the refusal list's second citation), changelog head, the *what we do not do* or
   non-goals section if there is one, the **glossary** if there is one (a maintained glossary makes
   §C an order of magnitude cheaper; note its presence or absence in §A). List what you opened; §B's
   absence rows will name them.
3. **§A Identity.** Fill the 13-field table. Then run the **three-question inclusion test** and the
   **loop question**, each answered with a quoted line and a source. Then write the
   **primitive preview** — the names only; definitions come in §C.
4. **§B, all 33 rows, in the fixed order.** For each: what it ships (your words), the path or
   mechanism (their words), the source, the mark. Where nothing is shipped, rule 2 applies. **A row
   is a summary, not a reference**: if a row wants more than ~8 lines (thirty hook events, a full
   telemetry schema, three multi-agent objects), write the summary and link out — to a deep read
   beside the profile (`content/<name>/…`) or to the Tier-2 component page. The profile stays one
   page for any harness, however large.
5. **§C Primitive set.** One row per primitive: name · path or key · the project's own definition,
   verbatim · source. Then the count, and the verdict.
6. **The diagram rule.** If the harness's own documentation carries an architecture or loop diagram,
   redraw it as mermaid in the house notation — one file under `assets/projects/<harness>/`, cited to
   the original — and embed a copy in the profile beside §A's loop-question answer. If the
   documentation carries **several**, redraw the one nearest the loop question and list the others
   in §F by title and URL, so a later pass can pick them up. If the documentation carries no diagram,
   draw none: a diagram you invented is an inference.
7. **§D, §E, §F.** Limitations quoted and grouped by source document, no commentary. Sources split
   primary / secondary, including the literal `gh api` commands you ran. Then everything you could
   not verify — bulleted, marked, with the reason. **§F may not be empty.** If it is, you have not
   looked hard enough.
8. **The opener, last.** Only now write the three bolded paragraphs at the top — *Why this file
   exists · In one screen · What it does not claim.* They summarise what you found, so they come last.
9. **Downstream obligations** (skip all four under `--sanity`, see below):
   - **(a)** a row in the short-profiles page (`90-short-profiles.md`) marked *Torn down `<date>`*,
     linking to the profile;
   - **(b)** a column in the harness-alignment matrix (`04-harness-alignment.md` §2) — the 33-row
     view — every `●` naming the primitive, every `○` naming the pages checked;
   - **(c)** a column in the component matrix (`02-component-matrix.md` §1) — the concept-row view;
   - **(d)** the harness's **`structured output`** line — the one artifact this harness optimises for
     (a record, a file, a span, a ledger). One artifact, not a list. It goes in §A under the
     primitive preview and is what the Tier-2 comparison tables quote.
   Skipping any of these is a known live defect (the repo's ISSUES ledger, `ISSUE-001`), which is why
   they are steps and not advice.
10. **Link check.** Run the repo's link checker (`check-doc-links.mjs`) before handing off.

### `--sanity`

A sanity run exercises this skill against a harness that already has material in the corpus, to test
the *skill*, not to replace the material. Under `--sanity`:

- write to `content/<name>-draft.md`, never to `content/<name>.md`;
- perform **none** of the four downstream obligations;
- do **not** open the existing profile or short teardown until your draft is written; then diff, and
  record section by section which is right and why;
- in §F, add a final subsection **`Skill findings`**: every place this template did not fit the
  harness, every rule that was ambiguous, every section that was hard to fill from primary sources,
  and every step you skipped. These are findings about the skill; edit nothing else.

Run on 2026-09-03 against Pi, Claude Code and Gas City; the rules marked *settled after…* above
came out of that run. Findings are in the W0-alignment HANDOFF §7.

## The page

Output path: beside the other profiles, in the repo's Tier-3 directory (`content/` here), as
`<name>.md` in lower-kebab-case. Use the harness's canonical short name.

### Frontmatter

```yaml
---
title: "<Name> — <one clause that carries the thesis>"
tier: reference
project: harness-atlas
created: "<YYYY-MM-DD>"
status: DRAFT
owner: <who ran the skill>
source: "<repo> @ <tag or sha> · <docs root> · read <YYYY-MM-DD>"
provenance: OBSERVED
---
```

### Opener — three paragraphs, fixed labels, bolded

```
# <Name> — <owner or vendor>

**Why this file exists.** <Where this harness sits in the corpus and why it was read. Link the
short-profiles row and the alignment matrix.>

**In one screen.** <The harness in one paragraph: what it is, its defining move, its primitives by
name, and the one thing it refuses. This is the paragraph a reader stops at.>

**What it does not claim.** <Point at §D. Quote the two or three load-bearing limitation lines.>
```

### Legend

```
Access date for every source: **<YYYY-MM-DD>**. Marks: ✅ direct (primary read) · ◐ relayed
(secondary) · ⚠️ unverified.
```

Then the URL shorthands you will use (`REPO`, `DOCS`, …), one per line.

### §A. Identity

The 13-field table, in this order, each with a mark and a source:

| Field |
|---|
| Canonical name |
| Prior names / homes |
| Owner / maintainer |
| GitHub URL |
| License |
| Stars |
| Language |
| Repo created |
| First release |
| Latest release |
| Install |
| Website / docs |
| What it says it is (verbatim) |

Then four sub-sections:

**Inclusion test** — three numbered questions, each answered in bold, then evidenced with quotes:
1. *Does state persist across sessions? Where, in what format?*
2. *Does it serve more than one person?*
3. *Does it bind mechanically, or only by prose?*

**Harness or process layer?** — the **loop question**: *does it run the loop itself, host other
loops, or install into one?* Answer with what it runs (`Agent` class, event stream, SDK), what
adapters it ships for other harnesses, and which other systems ship adapters for it. This fixes the
**altitude**: process layer · gateway / host · runtime · hosted product (loop not user-visible). The
inclusion test separates a process layer from dotfiles; only the loop question separates a host from
a runtime. Record the altitude in one bold line.

**Primitive set (see §C for definitions)** — names only, separated by `·`. Supporting first-class
objects on a second line.

**Structured output** — one line: the one artifact this harness optimises for, and where it lives.

### §B. Component table (33 rows)

Columns: `# · Component · What it ships · Path / mechanism · Source (accessed <date>) · Mark`.
Fixed order. **This list is the checklist; it is inline on purpose and is never read from a spec.**

| # | Component | The question the row answers |
|---|---|---|
| 0a | Substrate | Which model, which harness underneath, and what it costs to move |
| 1a | Environment | What can the loop reach — shell, filesystem, network, other systems |
| 2a | Adapters & Middleware | How the loop reaches any of it — providers, MCP, ACP, SDK, protocol |
| 2b | Hooks | Which lifecycle events fire, in what language, fail-open or fail-closed |
| 2c | Enforcement | What binds mechanically — deny lists, sandboxes, trust gates, and what survives auto modes |
| 3a | Control | How intent becomes work allowed to start — plan mode, approvals, run contracts |
| 3b | Routing | Which model or agent gets which job, and who decides |
| 3c | Composition | Sub-agents, delegation, system-prompt composition |
| 3d | Configuration | Instruction files, settings precedence, scopes, managed settings |
| 3e | Standards | Sanctioned ways to express things — schemas, conventions, refusal lists |
| 4a | Capability | Skills, tools, packages — what the team can do and how it travels |
| 4b | Capability Permissions | Who may use which capability, and how that is expressed |
| 5a | Individual Memory | What one operator's session remembers, where, in what format |
| 5b | Team Memory | What is shared across people and survives them |
| 5c | Knowledge | Curated, retrievable, cited context beyond memory |
| 6a | Product | Where the work lands and what it is not allowed to become |
| 6b | Infrastructure | Runtimes, containers, remote execution, provisioning |
| 6c | Estate | The inventory of repos, services and environments the team owns |
| 6d | Delivery | How work ships — CI, PR flow, release cut |
| 7a | Workflow Tasks | The unit of work, written down — tickets, beads, plans, todos |
| 8a | Evals | What work must clear before it ships — benchmarks, rubrics, judges |
| 8b | Evidence | The record that it did — receipts, audit logs, transcripts |
| 8c | Observability | Spans, metrics, events, and where they go |
| 8d | Efficiency | Token, cost and time accounting, and what acts on it |
| 9a | Learning | What happens to a lesson after it is learned — authored skills, memory curation |
| 9b | Rituals | Recurring human practices the harness knows about — reviews, retros |
| 9c | Cadence | Schedules, loops, cron, heartbeats |
| 9d | Anti-fragile Lifecycle | How failure is captured and turned into a rule — defect ledgers, post-mortems |
| 9e | Raise the Floor | Mechanisms that lift the worst case — templates, guardrails, golden paths |
| 9f | Diagnose the Bottleneck | Instruments that show where throughput is lost |
| 10a | Roster | Who is on the team — agents, people, roles, owners |
| 10b | Org | Teams of teams, tenancy, operators and scopes |
| 11a | Surfaces | Where work is seen and agreed — TUI, IDE, chat, web, and which version is true |

### §C. Primitive set (name · path · project's own definition)

| Primitive | Path / key | Project's definition (verbatim) | Source |
|---|---|---|---|

Supporting objects go in the same table, prefixed `(supporting)`. Close with two lines:
**Count:** `<n>` primitives, `<m>` supporting. **Verdict:** 5–7 healthy · 12+ accommodation
failure · refusal list, with one sentence of reason. If the harness publishes a list of what it will
*not* ship, quote it here — a refusal list is the strongest form of a primitive set.

### §D. Stated limitations / "what it does not claim" (quoted)

Blockquotes, grouped under a heading per source document. No commentary between them.

### §E. Sources (all accessed <date>)

**Primary** — the repo and API, including every `gh api` command you ran, and every docs page by
path. **Secondary** — marked `◐`, with what each was used for and a note that nothing named in the
page rests on it.

### §F. Things I could NOT verify

Bulleted. Each item: what, why you could not, the mark it carries elsewhere in the page. Mandatory,
non-empty. Under `--sanity`, add the `Skill findings` subsection here.

## Do NOT

- Read the 33 rows from any file at runtime — they are above, and they are the checklist.
- Infer a row, a primitive, a limitation or a diagram. Quote or record absence.
- Edit any other harness's profile, `spec/`, or `components/`.
- Add a 34th row, rename a component to match a vendor's word, or grade anything — profiles record;
  the grids compare; the maturity range grades.
- Write the opener first.
