---
title: "Research data — provenance and query guidance"
tier: reference
project: loomwarp
created: "2026-08-25"
status: DRAFT
owner: KD
---

# Research data

## `aie-worldsfair-2026-schedule.md`

The complete text of the official printable schedule for the **AI Engineer World's Fair 2026** — 562
sessions, June 29 – July 2 2026, Moscone West, San Francisco. It is the primary evidence behind every
frequency claim in [`../`](..).

| | |
|---|---|
| **Source** | `https://www.ai.engineer/worldsfair/schedule.pdf` |
| **Retrieved** | 2026-08-25 |
| **Original** | PDF, 112 pages, 2,212,908 bytes |
| **Extraction** | `pdftotext -layout` |
| **Sessions** | 562 — matches the count printed on the PDF's own cover |
| **Coverage** | 514 carry descriptions; 48 are title-only |
| **Markers** | 25 `KEYNOTE` · 412 `SESSION` · 22 `WORKSHOP`, plus expo and other entries |

### Why it is committed rather than cited

Every vocabulary claim we make about the 2026 practitioner community is only as good as the corpus it
was measured against. Committing the corpus makes those claims **reproducible with one `grep`**
instead of asking a reader to trust a summary. That is the evidence rule — *if you cannot point at the
artifact, you are one column to the left* — applied to our own research rather than only to
competitors' claims.

### Why the provenance lives in this file and not in that one

The first draft put this prose at the head of the corpus file. Running the verification immediately
showed why that was wrong: the header quoted the very terms it documented, so a count of the corpus
returned **2 hits for a term that appears 0 times in the source**. The corpus file therefore carries
frontmatter only. **Never add commentary to it.**

### How to query it

Counts in our documents are **case-insensitive occurrences**, not matching lines — a session whose
description uses a term three times contributes three.

**Use this command.** It is portable and unambiguous:

```bash
cd data
grep -io "harness" aie-worldsfair-2026-schedule.md | wc -l    # 113
grep -io "ontolog" aie-worldsfair-2026-schedule.md | wc -l    #   6
grep -io  ".\{80\}multiplayer.\{80\}" aie-worldsfair-2026-schedule.md
```

> ⚠️ **Do not use `grep -ioc`.** Its meaning is platform-dependent: BSD/macOS grep reports
> occurrences, GNU grep reports matching *lines*. For `eval` that is **263 versus 246** — the same
> command, two different answers. This bit the first draft of these documents, and it is why
> `scripts/check-research-counts.mjs` exists.

**The counts are mechanically verified.** `node scripts/check-research-counts.mjs` parses every claim
out of the §1 census table in [`../01-worldsfair-2026-vocabulary.md`](../01-worldsfair-2026-vocabulary.md)
and re-measures it against this corpus. The table is the single source of truth; the script has no
second list to drift from.

Multi-term rows such as `scope` family are counted as a **de-duplicated union**, not a sum — `scope`,
`scoped` and `scoping` overlap as substrings, and adding them double-counts. That error was in the
first draft too.

To count **sessions** rather than occurrences, split on the session markers first; several claims
elsewhere in this folder are session-counts sourced from the researcher's own parse and are labelled
as such where they appear.

### Caveats

- Layout-preserving extraction of a multi-column PDF interleaves some adjacent columns, so a line is
  not always one field. **Counts are reliable; reading a single line as a clean record is not.**
- Track attribution and verbatim abstracts quoted in our documents were read in context, not parsed
  mechanically.
- Titles with ligatures or em-dashes may carry spacing artifacts.
- Frequency is a proxy for **attention**, not for importance. A term the field's flagship venue never
  uses is evidence the field has not converged on it — not evidence the underlying concern is unreal.
