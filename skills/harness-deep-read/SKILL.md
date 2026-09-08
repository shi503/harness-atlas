---
name: harness-deep-read
description: Produce a deep-read reference set for one highlighted harness — a folder of documents cut by the vendor's own surface vocabulary, sitting beneath that harness's profile as its finer grain. Not a second profile; the companion a §6 detail row links out to when one paragraph cannot hold what a surface does.
argument-hint: <harness name> [--refresh]
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, WebFetch, WebSearch, Write, Edit, Bash(gh api *), Bash(gh search *), Bash(git log *), Bash(git rev-parse *), Bash(node scripts/check-doc-links.mjs)
---

# Harness deep read — the reference set

You are producing **one folder for one harness**, at `content/<name>/`, beneath the profile at
`content/<name>.md`. The profile answers *what is this harness and how does it compare*. This answers
*how does this surface actually work*, at a grain the profile cannot hold.

**Only for a highlighted harness.** A deep read is roughly 4,000 lines of work and is commissioned by
a person, not triggered by a score. The list of highlighted harnesses is maintained by KD; if you were
not told this harness is on it, stop and ask.

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

> **The house-neutral framing, and it is a live correction.** `content/claude-code/00-README.md` opens
> with pre-spin-out text — a *"LoomWarp-oriented reading"*, framed around what one consumer should
> adopt. **That framing is now a rule-9 violation and must be re-headed** to the neutral form: *what
> this harness ships, organised by its own surfaces*. A deep read has no house.

---

## 2. The file shape

```
content/<name>/
  00-README.md            the folder index — provenance, freshness, contents
  01-<surface>.md         one document per vendor surface, numbered from 01
  …
  20-consolidated-guide.md   the one narrative pass over all of it
```

- **`00-README.md`** carries: what this set is, the docs root and read date, a **freshness
  statement**, a contents table with one line per document, and a link back up to the profile.
- **`NN-<surface>.md`** numbered from `01` in the order a reader meets them, not alphabetically.
  The name is the **vendor's word** for the surface, lower-kebab.
- **`20-consolidated-guide.md`** is the single narrative that reads the surfaces as one system. It is
  the last thing written, and it is the document most readers actually want.
- **The `30-` slot is reserved and stays empty here.** A consumer-specific gap analysis — *what
  should my system adopt from this* — lives **with the consumer, not with the harness**. This is
  exactly what happened to `30-gap-analysis-loomwarp.md`, which left at the spin-out and is now a
  dead link from a private repo. **Do not create a `30-`.**

---

## 3. The link contract, both directions

A deep read that nothing links to is a folder; a deep read that links nowhere is a dead end. Both
directions are mandatory:

| Direction | Where | What |
|---|---|---|
| **Profile → set** | `content/<name>.md` §`1b. Contents` | Every document listed by name, linked |
| **Profile → document** | §6 detail rows | A row whose `Ships`/`Path` needs more grain links out to the document that carries the full table |
| **Set → profile** | `00-README.md`, first paragraph | *"This folder is the deep read for the profile at `../<name>.md`. Start there."* |
| **Set → set** | between documents | A surface that references another links to it |

Run `node scripts/check-doc-links.mjs` at the end. Every link resolves or the set is not done.

---

## 4. Provenance — a deep read is a snapshot, and must say so

**Every document carries, in its header:** the docs root it was read from, the **version at capture**,
and the **read date**. Not the folder — every document, because they are read at different times and
go stale at different rates.

**`00-README.md` carries a freshness statement**, and it is a sentence a reader can act on:

> *Read against `<docs root>` at `<version>`, `<date>`. A surface that has shipped since is not here.*

**Staleness is marked, never silently trusted.** `content/claude-code/` is a 2026-08-10 read cited by
a 2026-09-04 profile, and it says so — that is the standard. When the gap matters, `--refresh` re-reads
and re-dates; when it does not, the statement is the honest disclosure.

---

## 5. Rules inherited by name

These are the corpus's, cited by name and never by path, because this skill is distributable:

- **Vendor's words only** for anything the vendor names. Verbatim, cited, dated.
- **Absence is recorded, never inferred.** *"Nothing here — checked the docs index, the changelog and
  the examples"* names what was checked. It never says *"appears to lack"*.
- **Primary sources first.** The repository, the official docs, the changelog. A blog post about the
  harness is a secondary source and is marked as one.
- **High signal, low noise.** No history of your search, no "it is worth noting", no restating the
  profile.

---

## 6. Steps

1. **Confirm the harness is highlighted.** If you were not told, stop.
2. **Read the profile first**, all of it. The deep read is the profile's grain, and duplicating §6 is
   the most common way to waste four thousand lines.
3. **Inventory the vendor's surfaces** from its own navigation — its docs sidebar is the outline. Do
   not impose the 33 components.
4. **Draft the numbered documents**, one surface each. A surface that fits in the profile's §6 does
   not get a document.
5. **Write `20-consolidated-guide.md` last.**
6. **Write `00-README.md` last but one** — index, provenance, freshness.
7. **Wire both directions** per §3, then run the checker.

## Do NOT

- Create a `30-` document, or any consumer-specific analysis.
- Score, count primitives, or use a coverage mark.
- Compare this harness to another, anywhere in the set.
- Read from an archived path. `archive/` is history; if a deep read needs it, cite it as history.
- Write a document that a link to the vendor's own page would replace.
