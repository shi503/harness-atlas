# HANDOFF: W10-deep-read-and-wiki-nav

**Epic:** harness-atlas — the re-cut
**Mode:** the PRD says *interactive with KD*; the two skills were authored headless inside W11's
evening run on the PRD's own standing recommendations. **Both open decisions are taken and marked as
such — a person may overrule either.**
**Branch:** `template-v2`. **PRD:** `W10-deep-read-and-wiki-nav.md`.

## Produced

| Deliverable | Where | State |
|---|---|---|
| The reference-set skill | `skills/harness-deep-read/SKILL.md` | Written to the PRD's six requirements |
| The navigation skill | `skills/wiki-nav/SKILL.md` | Written; **not yet run** — see below |
| The neutral re-heading | `content/claude-code/00-README.md` | Done, with the change recorded on the page |

## The two open decisions, taken

Both follow the recommendation the PRD already carried, and both are argued on the page rather than
asserted:

1. **Highlighted harnesses are a standing list KD maintains.** `harness-deep-read` opens by requiring
   confirmation that the harness is on it and stopping if it was not told. A deep read is ~4,000 lines;
   the alternatives make the corpus decide, and the cost is high enough that a person should.
2. **No footer on `content/*.md` profiles.** `1b. Contents` already is that page's navigation, and two
   navigation blocks on one page are two answers to one question. `README.md` and `index.md` are
   likewise excluded — Tier 0 and Tier 1 are hand-authored, and the manifesto is not generated.

## What the re-heading fixed

`content/claude-code/00-README.md` opened as *"a distilled, LoomWarp-oriented reading"* whose stated
purpose was to establish *"what LoomWarp should build, adopt, or delete."* That is pre-spin-out framing
and a plain violation of rule 9 — **a profile describes its harness and nothing else** — in the one
folder the corpus holds up as the model for the genre. It also pointed at
`30-gap-analysis-loomwarp.md`, which correctly left with that consumer at the spin-out and had been a
dead link into a private repo ever since.

The skill generalises the fix rather than just patching the file: **the `30-` slot is reserved and
forbidden**, because a consumer-specific gap analysis belongs with the consumer, and the spin-out is
the worked example of what happens when it does not.

## Not done — `wiki-nav` has not been run

The skill is written; **no footer block exists anywhere yet.** Its first run would touch roughly a
hundred files across four trees, and the PRD's own acceptance criterion is idempotence — *running it
twice produces no diff* — which can only be demonstrated by running it twice and inspecting both
diffs. That is a reviewable act, not an unattended one, and W11's autonomy contract for this run puts
it out of scope.

**The first run is the acceptance test.** Run it, commit, run it again, and confirm
`git diff --quiet`. If the second run is dirty, the skill is wrong and §4's three idempotence rules
are where to look.

## Not done — the deep-read skill has not been exercised

`harness-deep-read` was written *from* `content/claude-code/`, which is the only instance of the genre.
A skill derived from one example is a hypothesis about a genre. **The next commissioned deep read is
its real test**, and the PRD's own note applies: a skill's first run is where its unstated assumptions
surface.
