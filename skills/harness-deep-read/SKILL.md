---
name: harness-deep-read
description: Produce a deep-read reference set for one harness — a folder of documents cut by the vendor's own surface vocabulary, sitting beneath that harness's profile as its finer grain. Not a second profile; the companion a §6 detail row links out to when one paragraph cannot hold what a surface does. Opens by agreeing a depth with the commissioner.
argument-hint: <harness name> [--depth index|standard|exhaustive] [--refresh]
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, WebFetch, WebSearch, Write, Edit, AskUserQuestion, Bash(curl *), Bash(tar *), Bash(mkdir *), Bash(grep *), Bash(find *), Bash(python3 *), Bash(gh api *), Bash(gh search *), Bash(git clone *), Bash(git log *), Bash(git show *), Bash(git rev-parse *), Bash(git cat-file *), Bash(node scripts/check-doc-links.mjs)
---

# Harness deep read — the reference set

You are producing **one folder for one harness**, at `content/<name>/`, beneath the profile at
`content/<name>.md`. The profile answers *what is this harness and how does it compare*. This answers
*how does this surface actually work*, at a grain the profile cannot hold.

---

## 1. What this is, and three things it is not

**It is a companion, cut by the vendor's vocabulary.** The profile is cut by the 33 components,
which are ours. This is cut by the *harness's own surfaces* — whatever it calls them: extension
points, plugins, hooks, orchestration, telemetry. **The two cuts are different on purpose.** A reader
who wants comparison reads the profile; a reader who wants to use the thing reads this.

**It is not a second profile.** No card, no coverage matrix, no primitive count, no scoring. If you
find yourself writing `●`, you are writing the wrong document.

**It is not a rewrite of the vendor's documentation.** If a page can be replaced by a link to the
docs, it should be. What earns a page is *organisation the vendor did not do* — a surface assembled
from four scattered pages, a table of every event with its payload, a caveat stated once in a
changelog and nowhere else.

**It is not the place for corpus placement or comparison.** Rule 9 — *a profile describes its harness
and nothing else* — binds here too, and harder, because the extra grain makes it tempting. No
"unlike Codex". No "this is what we should adopt". The grids compare; this documents.

> **Rule 9 is hardest to hold when you are standing inside the thing you are describing** — reading a
> harness from a repository that has adopted it. Describing that repository's *use* of the harness is
> in scope; describing the repository is not. The working test: **would this sentence be false or
> meaningless in a different repository that adopted the same harness?** If so, it is about the host,
> not the harness, and does not belong.

---

## 2. Agree the depth first — this is step one, always

**There is no eligibility gate.** Any harness with a profile may have a deep read. What varies is how
far it goes, and that is the commissioner's call, not yours. **Ask before you read anything**, with
`AskUserQuestion`, offering these three and letting them name surfaces if they have a view:

| Depth | Shape | When it is right |
|---|---|---|
| **Index** | `00-README.md` + `20-consolidated-guide.md` only | The vendor's own docs are already well organised. The value here is the claim ledger and the one narrative pass, not re-tabulating what is already navigable |
| **Standard** | `00` + the surfaces that earn a document + `20` | The default |
| **Exhaustive** | Every surface, with full field / event / attribute tables | The harness's docs are scattered enough that assembling them *is* the contribution |

A harness with thirty lifecycle events and a wire protocol is **Exhaustive**. Guessing wrong in
either direction wastes the whole set, which is why this is a question and not a judgement.

> **Two heuristics that look sound and are not. Both were falsified on first contact.**
>
> **A published refusal list is a signal that a page is *needed*, not that one is not.** A vendor that
> refuses six things usually states each refusal in a different place — a philosophy section, a post
> that argues it, an examples directory that partly restores it — and assembling those is exactly the
> organisation the vendor did not do. Check whether anything is actually shipped behind each refusal;
> a refusal with nothing behind it is a finding.
>
> **Coverage does not predict depth.** How much of the atlas's component list a harness ships and how
> much its vendor wrote are independent. The thinnest-coverage harness in this corpus ships the single
> largest documentation file in it. Size the read from the sources, never from the profile's matrix.

**When the scope spans more than one product, agree a depth for each.** One Standard setting across an
open-source runtime and a closed hosted product silently over-documents whichever has readable source
and under-documents the other — the difference measures what you could reach, not what exists.

**Agree the scope in the same breath, because a vendor may publish more than one outline.** Ask which
before you read, not after. A harness often has several, and they are not nested:

- its **repository's documentation directory**, usually cut by the thing you install;
- its **hosted product documentation**, usually cut by product and surface, which may cover editions
  the profile deliberately excludes;
- its **source tree**, whose per-module READMEs sometimes document surfaces neither of the others
  mentions.

Depth changes how long the set is; **scope changes what it is about**. If the agreed scope is wider
than the profile's, say so in `00-README.md` and mark the documents that have no counterpart in §6 —
nothing links out to them, and nothing in them should read as scoring.

> **If you were dispatched as a sub-agent, depth and scope arrive in your dispatch — do not ask.**
> They were agreed with the commissioner before you were launched, and you have no channel to that
> person. If your dispatch does not name both, **stop and say so**; guessing the scope produces a
> folder about a different subject than the profile it sits beneath.

---

## 3. The file shape — navigation is fixed, content is free

```
content/<name>/
  00-README.md              the folder index — claims, provenance, freshness, contents
  NN-<surface>.md           one document per vendor surface, numbered from 01
  …
  20-consolidated-guide.md  the one narrative pass over all of it
```

**Two files are always present**, because they are the entry and the exit and the corpus links to
both: `00-README.md` and `20-consolidated-guide.md`. The profile's `1b. Contents` and the wiki
navigation both depend on them existing.

**Everything between them is the harness's own decomposition** — any count, any names, floor of one
at Standard or above. The name is the **vendor's word** for the surface, lower-kebab, numbered in the
order a reader meets them, not alphabetically.

> **Do not force a harness into our shape.** If its model decomposes the way ours does, use ours. If
> it is distinctly different — one surface that does everything, or a set that only makes sense as a
> pipeline — **follow the harness**, and say in `00-README.md` what shape you found and why. The
> profile is already the forced cut; this folder is the one place the harness gets to be itself.

**The `30-` slot is reserved and stays empty.** A consumer-specific gap analysis — *what should my
system adopt from this* — lives **with the consumer, not with the harness**. **Do not create a `30-`.**

---

## 4. What the vendor says it is for — and the guide's test

**`00-README.md` carries a claim block, near the top.** Verbatim, each with its source URL and
capture date, drawn from:

- the landing or product page,
- the repository README's pitch,
- the documentation's own introduction,
- the launch or announcement post.

**For a claim of intent, the vendor's marketing page is a primary source.** This is the one place the
usual hierarchy inverts: a blog post is secondary evidence about *mechanism* and primary evidence
about *what the vendor says this is for*, because the vendor is the only authority on its own intent.
Mark it as the claim it is, never as a finding.

### When there is no vendor

**A self-authored or internal system has no landing page, no launch post and nothing written to
persuade.** That is not a missing claim ledger; it is a different one. Do both of these:

1. **Record the absence, naming what was checked** — *"no positioning copy: checked the repository
   description, `README.md`, `docs/` and the release history."* An absence of marketing is a fact
   about the system worth stating plainly.
2. **Substitute a stated-intent ledger from the system's own markdown.** Its README, its `docs/`, its
   standards files, its module headers. Same discipline — verbatim, cited, dated — but **cited to a
   file and a commit rather than a URL**.

**And apply the opposite caution.** Marketing copy overstates on purpose, and §4 exists to quarantine
that. A self-authored system's markdown fails the other way: **it states intent in the present tense
as though it were implemented**, because it was written to specify rather than to sell. So ground each
stated intent against the code before the guide's walk in §4 — where a design document and the source
tree disagree, **the code wins and the disagreement is recorded**, never resolved silently.

**`20-consolidated-guide.md` closes by walking the claims against the mechanisms this set documented.**
One row per claim, naming the document that carries the mechanism behind it.

**A row has three possible outcomes, not two.** Getting this wrong turns a scope decision into a
false finding:

| Outcome | Write |
|---|---|
| **Mechanism found** | The document that carries it |
| **Nothing found** | A **recorded absence naming what was checked** — *"no mechanism found; checked the docs index, the changelog and the examples"* |
| **Partly mechanised** | One half configurable, the other half a statement about the vendor's own infrastructure that no surface can evidence. Split the row; do not round it to either neighbour |
| **Contradicted by the system's own code** | The mechanism exists and does the opposite of the stated intent. Distinct from an absence, and the most valuable row a no-vendor read produces. Record both, and where they disagree |
| **The vendor contradicts itself** | Two vendor pages disagreeing *at the same version*. Not drift — there is no earlier and later. Record both, name which page is which, and do not adjudicate |
| **Un-mechanisable by construction** | Governance facts (*"an independent 501(c)(3)"*) and comparative superlatives (*"the most battle-tested"*). No surface can carry these. Say so plainly rather than filing them under scope |
| **Outside this set's scope** | Say so, and why. A claim about a surface the agreed scope excludes is **not** an absence, and recording it as one is false |

> **The test records; it does not grade.** **Never write a verdict.** No "overstated", "fails to
> deliver", "marketing only", no score, no mark. A claim with nothing behind it is already visible as
> one; saying so twice is grading, and grading belongs to the scorecard.

---

## 5. The link contract, both directions

A deep read that nothing links to is a folder; a deep read that links nowhere is a dead end. Both
directions are mandatory:

| Direction | Where | What |
|---|---|---|
| **Profile → set** | `content/<name>.md` §`1b. Contents` | Every document listed by name, linked |
| **Profile → document** | §6 detail rows | A row whose `Ships`/`Path` needs more grain links out to the document that carries the full table |
| **Set → profile** | `00-README.md`, first paragraph | *"This folder is the deep read for the profile at `../<name>.md`. Start there."* |
| **Set → set** | between documents | A surface that references another links to it |

Run `node scripts/check-doc-links.mjs` at the end. Every link resolves or the set is not done.

**When a linked-out row disagrees with the document it links to, carry both.** A profile is a dated
read and a deep read is a later one; what changed between them is drift, not an error in either.

**Drift is rarely a number.** A quoted sentence gains a clause; a taxonomy goes from three to four; a
mechanism is re-framed onto a different axis; a claim relayed from a self-assessment turns out to
disagree with the source at the *same commit*. All of these are drift and all take the same remedy —
carry both, with both dates, and name which reading is which. "State both figures" is the narrowest
case, not the rule.

**Above roughly three drifts, put a consolidated table in `00-README.md`** and have the §6 rows point
at it. Per-row notes alone scatter the evidence, and a reader asking *how stale is this profile* should
not have to visit twelve rows to find out. Do **not** re-read the profile — that is a teardown, not a deep read — and do **not** quietly
match the older number. State both figures with both dates, in the §6 row, so a reader who clicks is
not left holding a contradiction.

---

## 6. Provenance — a deep read is a snapshot, and must say so

**Resolve the current version yourself. The profile's pin is a datum, not your pin.** A set that
inherits the profile's version, dates itself today and publishes is a confidently stale snapshot — the
exact failure this section exists to prevent. Check the latest release *and* whether the tree has moved
past it; where the documentation is generated from a branch ahead of the last tag, **pin what the
documentation is generated from and state the release lag.**

**Read the outline at the same ref as the pages.** A repository contents API returns the **default
branch** unless you ask for a ref — so an outline fetched that way can list pages that do not exist at
your tag, and nothing warns you. This is silent corruption, not a visible error. Fetching the release
tarball at the tag and reading from that is the reliable pattern for a large set.

**Every document carries, in its header:** the docs root it was read from, the **version at capture**,
and the **read date**. Not the folder — every document, because they are read at different times and
go stale at different rates. The fields:

```yaml
source: "<the page, repo path, or docs root this document was read from>"
version_at_capture: "<tag, release, or commit>"
source_verified: "<YYYY-MM-DD>"
```

**A document read from somewhere the rest of the set was not declares that in its own header**, not
only in the index — and says so in its first paragraph.

**When no version exists at all** — no release, no changelog, no dated revision — that is a **finding
about the product**, not a blank. Say so in the field and in the freshness statement; the read date is
then the only freshness signal there is. For an untagged repository, the commit SHA plus the push date
is what makes the statement actionable.

**`00-README.md` carries a freshness statement**, and it is a sentence a reader can act on:

> *Read against `<docs root>` at `<version>`, `<date>`. A surface that has shipped since is not here.*

**Staleness is marked, never silently trusted.** When the gap matters, `--refresh` re-reads and
re-dates; when it does not, the statement is the honest disclosure.

### The authorship block — who ran this, when, on what model

`00-README.md` carries a `verification:` block in its frontmatter, in the corpus's standing
drafted-until-verified shape:

```yaml
verification:
  derived_from: ["the vendor's documentation at <root>", "the repository at <version>", "product and launch copy"]
  grounded_against: ["the profile at ../<name>.md", "<what was opened directly>"]
  drafted_by: "claude-opus-5"     # the exact model id, captured at write time — or a person's initials
  drafted_on: "YYYY-MM-DD"
  verified: false                 # a human review pass is the ONLY thing that flips this
  verified_by: ~                  # mandatory IFF verified: true
  verified_on: ~                  # mandatory IFF verified: true
  note: ~
```

**Every other document carries the one-line form** under its title — twelve files do not each need a
nine-line block:

```markdown
> **Drafted YYYY-MM-DD by `claude-opus-5`, not yet verified.**
```

**`drafted_by` is captured, never assumed.** Write the model actually running, at the moment of
writing. If you are backfilling a file whose author was never recorded, say so in `note:` — an
attested value and a captured one are not the same fact, and a provenance field that infers its own
provenance is worse than none.

---

## 7. Rules inherited by name

These are the corpus's, cited by name and never by path, because this skill is distributable:

- **Vendor's words only** for anything the vendor names. Verbatim, cited, dated.
- **A summarising fetch tool cannot produce a quotation.** A tool that converts a page and answers a
  prompt about it returns *paraphrase*, and paraphrase inside quotation marks is fabrication. **Capture
  every quote from raw source** — the raw HTML, the repository file, the string table the page renders
  from — and treat any summarised rendering as a pointer to where the quote lives, never as the quote.
  Where a landing page is built from a string file, that file is the better citation.
- **Never publish an assembled list as one quotation.** Six refusals that appear as six headings with
  prose between them are six quotes; joining them with separators invents a sentence the vendor never
  wrote. Quote them individually and say they were assembled.
- **Absence is recorded, never inferred.** *"Nothing here — checked the docs index, the changelog and
  the examples"* names what was checked. It never says *"appears to lack"*.
- **Primary sources first** for mechanism, and *the repository* is not one class but two: its
  **documentation directory** and its **source-tree READMEs**, which are frequently the only home of a
  surface the hosted docs never mention. Check both. Add the official docs and the changelog. A blog
  post about how the harness works is secondary and is marked as one. **§4 is the one inversion** —
  for a claim of intent, the vendor's own copy is primary.
- **Record where the documentation actually lives.** A stub that redirects, a page that moved, a
  README carrying what a docs page dropped, a hosted root that 404s while its children resolve, two
  different directories both called `docs`, or an engineering tree that is **deliberately unpublished
  while holding the mechanism** — say so in `00-README.md`. A reader who starts where you started
  should not have to rediscover it. For a self-authored system this is the norm rather than the
  exception: the load-bearing prose is rarely in `docs/`.
- **Four source classes, not two.** Beyond the documentation directory and the source-tree READMEs:
  **published machine-readable artifacts** — a JSON Schema, an OpenAPI document, generated types, a
  string table — are frequently *more* authoritative than the prose and settle contested facts the
  pages leave open; and **generated documentation nested inside a module**, shipped with the binary,
  can be the substantive guide while the obvious hosted root is a stub.
- **High signal, low noise.** No history of your search, no "it is worth noting", no restating the
  profile.

---

## 8. Length is not a target — the deletion test is

**There is no line budget, and there never was a good one.** A set is the right size when it is the
simplest mental model that stays faithful to the system. Apply this on the way out:

- **A paragraph a link to the vendor's page would replace is deleted.**
- **A document that survives only because the vendor happens to have many pages is deleted** — page
  count is the vendor's accident, not a surface.
- **A table that restates a §6 detail row is deleted.** It exists to hold what §6 links *out* to.
- **A sentence that explains the corpus rather than the harness is deleted.**

Conciseness is not compression. Keep every exact name, field, event and version; cut the prose around
them.

**And the inclusion test, which matters more, because everything fails a deletion test on first look:**

> **A page earns its place when the fact it carries exists in the sources but in no single place.**

That is §1's *"organisation the vendor did not do"*, stated as a test you can apply. A vendor with
excellent documentation still earns pages wherever a surface is assembled from four scattered pages, a
table has to be built from prose, or a caveat appears once in a changelog.

**Record what you decided not to write.** A surface you deliberately skipped — because the vendor's own
index beats anything you would write, or because it sits outside the agreed scope — reads as an
oversight unless the set says otherwise. `00-README.md` carries a short *deliberately not documented
here* paragraph naming those surfaces and why. Unstated, a scoping decision is indistinguishable from
an absence, which is the one thing this corpus forbids.

---

## 9. Steps

1. **Agree the depth and scope** per §2 — with `AskUserQuestion` **if you were commissioned directly**,
   or from your dispatch **if you are a sub-agent, in which case do not ask**. Before anything else.
2. **Read the profile first**, all of it. The deep read is the profile's grain, and duplicating §6 is
   the most common way to waste the whole set.
3. **Capture the claims** per §4, with source and date, while the vendor's pages are open.
4. **Inventory the vendor's surfaces**, starting from its own navigation — but **verify the nav against
   a directory listing**. An overview page is often not an index of its own directory, and the pages it
   omits are disproportionately the distinctive ones. Do not impose the 33 components. If its shape does
   not match ours, follow it and say so.

   **A navigation tree is not always a surface list.** A vendor may organise by browsing convenience —
   seventy provider pages behind one capability, twenty-five platform pages describing one mechanism.
   Following that literally yields presentational documents. Merge and split as the mechanism requires,
   and **record in `00-README.md` where you departed from the vendor's grouping.**

5. **Run the artifact where the harness's defining object is executable.** Reading settles what a
   document claims; running settles what the code does, and the gap between them is often the most
   valuable thing in the set. Show the input and the output. This is evidence, not exploration —
   confine it to constructed inputs in a scratch directory, and never against a live system.
6. **Draft the numbered documents**, one surface each, to the agreed depth. A surface that fits in the
   profile's §6 does not get a document.
7. **Write `20-consolidated-guide.md`**, ending with the claim → mechanism walk.
8. **Write `00-README.md`** — claims, index, provenance, freshness, the `verification:` block.
9. **Apply §8's deletion and inclusion tests** to everything you just wrote.
10. **Wire both directions** per §5, then run the checker.

## Do NOT

- Start reading before the depth is agreed.
- Create a `30-` document, or any consumer-specific analysis.
- Score, count primitives, or use a coverage mark.
- Issue a verdict on a vendor's claim. Map it or record its absence; the scorecard grades.
- Compare this harness to another, anywhere in the set.
- Read from an archived path. `archive/` is history; if a deep read needs it, cite it as history.
- Write a document that a link to the vendor's own page would replace.
- Write `drafted_by` as a guess.
