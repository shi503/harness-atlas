---
title: "The architect jobs, as a lens for sizing a harness"
tier: reference
project: harness-atlas
provenance: AUTHORED
created: "2026-09-01"
updated: "2026-09-01"
status: ARCHIVED
owner: KD
---

# The architect jobs, as a lens for sizing a harness

**Provenance: `DERIVED`.** Our synthesis over one `OBSERVED` source
([`01-source-hohpe.md`](./01-source-hohpe.md)). The synthesis is claimable; the
underlying observations are not. Per `loomwarp-team-system` `00-MAP.md` (private) §1.

**What this is.** A lens for answering one question: **how much harness does
this team actually need, for this work, right now?** It takes the jobs a senior
human architect is hired to do and asks, of each, whether a harness can
*mechanize* it, only *scaffold* it, or cannot reach it at all.

**Why the lens is useful.** [`../comparisons/03-jtbd.md`](../comparisons/03-jtbd.md)
enumerates seventeen jobs a harness does **for a unit of work** — compose
context, decompose and sequence, validate, prove. This document enumerates eight
jobs a senior human does **around the work** — framing the question, surfacing
assumptions, budgeting complexity, judging suitability. The two lists barely
overlap, and *the gap between them is the staffing requirement a framework
creates and does not name.*

---

## §0. What this is not

Three exclusions, because this artifact was initially drafted in the wrong
register and moved here from `standards/`:

| Not | Why |
|---|---|
| **Not a team standard** | `loomwarp-team-system` `standards/README.md` (private) is the canonical tier with a one-directional inheritance contract. Nothing here is inherited from, tightened, or enforced. It is a thinking tool, not a rule set |
| **Not the model for LoomWarp's own agents** | The `.claude/agents/*` roster is not derived from this and should not be retrofitted to it. §7.4 records where the two disagree, as observation only |
| **Not a measured claim about the field** | One interview, one practitioner. `03-jtbd.md`'s convergence line was measured against a committed 562-session corpus; this was not. Where they conflict, that document wins on standing |

**And a hiring caveat.** This reads like an interview rubric and could be used as
one. It should not be, without much more evidence behind it than one podcast.

---

## §1. The move

A harness and a senior architect get hired for different reasons.

```
       ┌─────────────────────────────────────────────┐
       │  A1–A8   the jobs around the work           │  ← this document
       │          frame · express · surface · budget │
       │          scout · escalate · judge · refresh │
       ├─────────────────────────────────────────────┤
       │  J1–J17  the jobs on a unit of work         │  ← 03-jtbd.md
       │          context · memory · decompose ·     │
       │          route · bound · validate · prove   │
       └─────────────────────────────────────────────┘
```

The seventeen jobs are about **executing work correctly.** The eight are about
**deciding the work was worth doing, and being able to say why later.** A system
can be excellent at the first and contribute nothing to the second — and that
system will feel fast and produce drift.

### 1.1 The three dispositions

Every job below carries one. This is the whole analytic device:

| Disposition | Means | Test |
|---|---|---|
| **MECHANIZE** | A harness can perform it, and the output is checkable without judgment | Could a CI job fail on it? |
| **SCAFFOLD** | A harness cannot perform it, but can make a human perform it reliably — prompt for it, store it, template it, refuse to proceed without it | Can the system force the question to be asked, without grading the answer? |
| **HUMAN** | The harness cannot reach it. Staff for it, or accept it undone and say so | Is the failure only visible to someone with context the system does not hold? |

**The sizing rule falls straight out of this.** A harness that MECHANIZEs
nothing on this list is a task runner. One that claims to MECHANIZE all of it is
lying. The interesting question is which jobs you SCAFFOLD — because every
SCAFFOLD is a human you must have, and every HUMAN is a gap you are choosing to
carry.

---

## §2. The eight architect jobs

Renumbered `A1`–`A8`. **The `J` prefix is taken** — `03-jtbd.md` owns `J1`–`J17`
as stable identifiers that the function crosswalk and
[`../../specs/v0/02-functions.md`](../v0/02-functions.md) depend on. A
second `J1` in this corpus would be exactly the overloaded vocabulary the project
exists to reduce.

### 2.1 The job these are all sub-jobs of

> **When** my team faces a consequential technical decision under uncertainty,
> **I want to** understand the real trade-off space and choose deliberately,
> **so I can** commit with confidence and know later why we chose what we chose.

The "I" is **the team**, not the architect. The team is the buyer; the architect
is what gets hired `[§2.1]`. That grammar makes "the architect decides" a
category error rather than merely a bad habit — you cannot hire someone to hold
your confidence for you.

The two halves of the outcome fail separately, and the second is the one a
harness is unusually good at:

- **commit with confidence** — the decision happens now
- **know later why we chose what we chose** — the decision stays legible in six months

Most architecture decay is the second half. The choice was fine; the trade-off
was never recorded; the constraint expired; three years on a team is defending a
decision whose premise is dead and nobody can tell.

### 2.2 The eight

| # | Job | Disposition | What a harness can actually do |
|---|---|---|---|
| **A1** | **Frame the space.** When two people are arguing past each other, I want a shared map of the options, so I can make the disagreement resolvable. `[§2.5]` | **HUMAN** | Nothing. Framing requires knowing which axis the two parties are actually split on, which is not in any repository |
| **A2** | **Express what the team already knows.** When people understand their system but can't articulate it, I want to draw it back to them, so I can turn tacit knowledge into a shared object. `[§2.10]` | **SCAFFOLD** | Give the artifact a home and a shape. Cannot supply the draw-and-be-corrected loop — see §7.1 |
| **A3** | **Surface hidden assumptions.** When a design carries unstated premises, I want them named before we commit, so I can convert a latent risk into a known one. `[§2.22]` | **SCAFFOLD** | Require an `assumptions` field and refuse to proceed while empty. Cannot judge whether the listed ones are the load-bearing ones |
| **A4** | **Right-size complexity.** When a domain has irreducible complexity, I want to make it *intuitive to handle* rather than pretend it away, so I can keep cognitive load below the point where people stop changing the code. `[§2.4]` | **HUMAN** | Proxy metrics only (change frequency, file churn, escalation rate). The inherent/accidental split is a judgment about the domain |
| **A5** | **Answer live questions, not all questions.** When leadership needs a position on something new, I want to scout the specific question, so I can return a small, timely, decision-shaped answer. `[§2.11]` | **SCAFFOLD** | Enforce that an artifact names the question it answers. This is the anti-bloat gate — §6.2 |
| **A6** | **Carry the decision upstairs.** When a decision needs executive assent, I want a sticky story I can defend under questioning, so I can get a real decision instead of a deferral. `[§2.7] [§2.20]` | **HUMAN** | Nothing. The one-head constraint (H11) forbids splitting the story from the model that backs it |
| **A7** | **Assess suitability, not goodness.** When reviewing someone's architecture, I want to review their *reasoning*, so I can tell fit-for-purpose apart from unfamiliar. `[§2.18]` | **SCAFFOLD** | Gate on conformance; capture the trade-off. Cannot grade suitability — §7.3 |
| **A8** | **Keep my own heuristics from expiring.** When my instincts fire on a design, I want to check whether their premises still hold, so I can avoid confidently reasoning from dead constraints. `[§2.12]` | **MECHANIZE** | The one genuinely mechanizable job here. Date a recorded decision, attach its premise, and alert when the premise's evidence ages out |

**Read the disposition column as a distribution: 1 MECHANIZE, 4 SCAFFOLD, 3
HUMAN.** That ratio is the headline. A harness contributes materially to
one-eighth of the architect's job, can be made to help with half, and is
structurally absent from the rest.

### 2.3 The counterfeits

For each job, the failure that looks like success from inside the room. This is
the evaluation device — you are never checking whether a job was *done*, you are
checking whether its specific counterfeit slipped through.

| Job | Counterfeit | Why it fools people |
|---|---|---|
| **A1** | Everyone agrees, holding different maps `[§2.5]` | Consensus *is* the felt win condition. Only separates weeks later, at integration |
| **A2** | You explain, they nod | Reads as knowledge transfer. Nothing moved, because nothing was contradicted |
| **A3** | Nothing surfaces | Reads as a clean design, right up until production |
| **A4** | Code nobody touches | Shows as *stable* on every dashboard you have. It is legacy `[§2.4]` |
| **A5** | A comprehensive landscape map | Reads as thoroughness. Arrives dead — the snapshot assumption `[§2.11]` |
| **A6** | A smooth meeting, no hard questions | Usually deferral, not assent |
| **A7** | A long findings list | Reads as rigor. Usually your agenda, itemized `[§2.18]` |
| **A8** | Confident, articulate, internally consistent advice | From constraints that expired. **No local symptom at all** |

**A8's counterfeit is the dangerous one**, and it is the reason A8 is worth
mechanizing even though it is the least glamorous job on the list. Every other
counterfeit eventually generates friction that someone notices. This one
generates fluent correctness-shaped wrongness, and the person producing it is
the last to find out `[§2.8]`.

---

## §3. Crosswalk — where the seventeen jobs reach

Mapping `A1`–`A8` onto [`../comparisons/03-jtbd.md`](../comparisons/03-jtbd.md).
`●` covered · `◐` partial · `○` absent.

| | Architect job | Nearest harness job(s) | | What the harness job actually does instead |
|---|---|---|---|---|
| **A1** | Frame the space | — | `○` | `J4 decompose` sequences work *within* a frame. Nothing constructs the frame |
| **A2** | Express what they know | `J1 compose context` · `J2 remember` | `◐` | Both **store and retrieve**. Expression is a different act — see §7.1 |
| **A3** | Surface assumptions | `J6 validate` · `J8 prove` | `○` | Both check work *against stated criteria*. An unstated assumption is invisible to both by construction |
| **A4** | Right-size complexity | — | `○` | No harness job owns complexity budget. `J17 diagnose the bottleneck` is the closest and is about throughput, not cognitive load |
| **A5** | Answer live questions | `J13 choose the ground` | `◐` | `J13` is one instance of the pattern — a scoped question, answered, with its cost recorded |
| **A6** | Carry it upstairs | `J11 coordinate humans` | `◐` | `J11` moves information between people. It does not construct a defensible argument |
| **A7** | Assess suitability | `J6 validate` · `J8 prove` | `◐` | Conformance and evidence, correctly. Suitability is a different question — §7.3 |
| **A8** | Keep heuristics fresh | `J9 compound` · `J16 raise the floor` · `J17 diagnose` | `●` | The IMPROVE band genuinely covers this. It is the band `03-jtbd.md` calls least modelled in the field |

### 3.1 The finding

**The uncovered architect jobs cluster, and they cluster in one place: judgment
before the work starts.**

- Fully absent (`○`): **A1 frame · A3 surface assumptions · A4 complexity budget**
- Well covered (`●`): **A8** — and only via the band the field has barely started on

The seventeen jobs cover **execution and memory** thoroughly. They cover
**pre-decision judgment** essentially not at all. That is not a defect in
`03-jtbd.md` — it enumerated what harnesses do, honestly, and harnesses do not
do this. **It is a defect in how frameworks get sold**, because a team adopting
one hears "this handles the process" and does not hear "you still need someone
to decide whether the work is the right work."

For LoomWarp specifically: the twelve-layer structure has a home for A8 (layer 9
IMPROVE) and no home for A1, A3, or A4. Whether it should is a real question and
this document does not answer it — see §9.

---

## §4. The eleven heuristics

Ten from the source, plus one this analysis found missing. Each carries a
disposition and, where it exists, the mechanical form.

| # | Rule | Disposition | Mechanical form, if any |
|---|---|---|---|
| **H1** | **Frame before you debate.** Establish the coordinate system first; it is not up for debate. Argue positions second. `[§2.5]` | HUMAN | — |
| **H2** | **Double the solution space before choosing in it.** "Monolith or microservices" is two options; design-time × runtime modularity is four. Decompose the word before answering the question. `[§2.5]` | SCAFFOLD | Require ≥2 alternatives recorded per decision. See §4.1 for the stopping rule |
| **H3** | **Draw it.** Prose lets you stay fuzzy; a line is either there or it is not. Reach for the pen at the moment of disagreement, not after. `[§2.6]` | HUMAN | **Does not survive translation — §7.1** |
| **H4** | **As simple as possible, no simpler — then make the remainder intuitive.** Distinguish inherent from accidental complexity. Never pretend inherent complexity away. `[§2.4]` | HUMAN | — |
| **H5** | **Suitable, not good.** No global ranking of architectures exists. Ask what job it had before judging whether it did it. `[§2.18]` | HUMAN | **Cannot be gated — §7.3** |
| **H6** | **Review the thought process, not the artifact.** Conscious decision → understood trade-off → aligned with the business need. `[§2.18]` | SCAFFOLD | Assert the trade-off field is non-empty. Cannot assert it is *right* |
| **H7** | **Start from a question.** No question, no map. Situational and timely beats complete and stale. `[§2.11]` | **MECHANIZE** | Every standing artifact names the question it answers and the decision it feeds. Empty → delete. **§6.2** |
| **H8** | **Earn capital broadly, spend it narrowly.** One thing worth moving the needle on, not skirmishes everywhere. Sleep at night with the imperfection. `[§2.17]` | HUMAN | — |
| **H9** | **Revalidate heuristics on contact.** When an instinct fires, name its premise and check the premise. `[§2.12]` | SCAFFOLD | Premise + date on recorded decisions; alert on age. The A8 mechanism |
| **H10** | **The tool's output is the starting line.** You put the value on top. If pasted output would have been good enough, the role was not needed. `[§2.21]` | SCAFFOLD | **Relocates when the architect is the model — §7.2** |
| **H11** | **Keep the story and the model in one head.** The catchy artifact and the technical foundation cannot be split across two people; the second one does not know the semantics and cannot say what may move. `[§2.7]` | HUMAN | — |

### 4.1 Two rules the source leaves unstated

**H2 has no stopping rule.** "Double the solution space" is excellent once.
Applied recursively you get an architect who reframes forever and never lands —
analysis presented as rigor, which is its own counterfeit. The working stopping
condition: **stop adding axes when the next axis would not change anyone's
choice.** That is judgment, not a rule, and it is why H2's mechanical form caps
at "≥2 alternatives recorded" rather than "as many as possible."

**H8 and A3 draw on the same account.** Surfacing a hidden assumption is mildly
unwelcome every single time — you are telling people something they feel they
should have noticed `[§2.22]`. A3 says do this routinely. H8 says spend capital
rarely and on one thing. Both are right; they conflict; the source does not
resolve it and neither does this document. **This is the most honest unresolved
tension in the lens**, and it is a strong argument for mechanizing A3's prompt
(a required field costs no capital, whereas a person asking the question every
time spends some).

### 4.2 H11, and why it was missing

The first draft of this lens had ten heuristics and eight jobs, and **A6 —
carry the decision upstairs — had no heuristic serving it at all.** The job with
the highest stakes had the least procedural support. The source has the material:
you cannot have an engineer build the model and a designer make it presentable,
because only one head holds the semantics — what a line means, what may be
adjusted `[§2.7]`. Promoted to H11.

Recording the gap rather than quietly closing it, because the gap is evidence
about how the lens was built.

---

## §5. Sizing — how much harness does this team need

The lens used as intended. Three passes.

### 5.1 Which jobs are live

For each of A1–A8, answer two questions:

1. **Is this job live for us right now?** (Are we actually hitting the triggering situation?)
2. **Who does it today?** (Named person, or *nobody*.)

Jobs that are live and done by nobody are your gap. Jobs that are not live need
no harness support and any framework capability aimed at them is speculative
weight.

### 5.2 The sizing dial

Which architect jobs go live is mostly a function of **how many independent
decision-makers touch the work** — not team size, not repo count.

| Situation | Live jobs | Harness implication |
|---|---|---|
| One person, one repo | A4, A8 | Almost none. A framework here is overhead with a story attached |
| One team, one repo | A2, A3, A4, A8 | SCAFFOLD A3 (assumptions field). Everything else is conversation |
| One team, several repos | + A5, A7 | Now you need shared context and conformance gates — this is where `J1`/`J2`/`J6` start paying |
| Several teams, shared estate | + A1, A6 | The framing and escalation jobs go live. **These are the two the harness cannot help with**, so this is where you staff, not build |
| Several teams, several orgs | All eight, continuously | Everything above, plus A8 mechanized, because heuristics now expire faster than people notice |

**The uncomfortable read.** The situations that most justify building a harness
are the same ones that surface the architect jobs a harness cannot do. Scale
does not remove the need for judgment; it is what creates it. A framework that
promises otherwise is selling the counterfeit of A1.

### 5.3 Applying it to a framework under review

For each capability the framework proposes:

1. **Which job does it serve?** `A1`–`A8`, `J1`–`J17`, or none. *None* is a finding, not a formatting error.
2. **What is its disposition, honestly?** A capability claiming to MECHANIZE a HUMAN job is the thing to catch.
3. **What is the counterfeit?** From §2.3 — if the capability's success signal and its counterfeit are indistinguishable, the capability is unfalsifiable.
4. **Does it answer a live question?** H7 as a gate. See §6.2.

---

## §6. Sequence

### 6.1 The heuristics fire in order

They are listed as a set; in a real room they run as a chain, and the order is
load-bearing:

```
H7  is there a live question?          ← gate. no question, stop here
 └─ H9  are my instincts' premises still alive?
     └─ H1  build the frame
         └─ H2  is the frame too small?
             └─ H3  draw it  (H1 and H2 actually happen here)
                 └─ H4  what complexity is inherent vs. self-inflicted?
                     └─ H5/H6  judge on suitability and reasoning
                         └─ H11 → H8  one head, and is this worth spending on?
```

Two out-of-order failures worth naming, because both are common in senior people
acting in good faith:

- **H5 before H1** — judging suitability before a frame exists. You assess against your own implicit map, which is the agenda-led review counterfeit `[§2.18]`. This is how experienced reviewers produce findings that are really autobiography.
- **H1 before H9** — building the frame out of stale heuristics. Worse than not framing at all, because a frame carries authority. The shared-database example is exactly this: the instinct fires *bottleneck*, the map gets built around scaling, and nobody notices the database in question scales past anything the business can afford `[§2.12]`.

H9 sits second for that reason. It is not Friday maintenance — it is a pre-flight
check on the instruments you are about to frame with.

### 6.2 H7 as a gate — the anti-bloat test

The single most portable thing in this document, and the only heuristic that
mechanizes cleanly.

> **Every standing artifact must name the question it answers and the decision it
> feeds. An artifact that names neither is not under-documented — it is
> unnecessary.**

The source's framing is cartographer versus scout `[§2.11]`: the complete
current-state map is obsolete on delivery, while the small purpose-built map gets
used. And the sharper line — *"too many architects try to find answers when they
don't have a question."*

Applied to a framework, this is a **deletion test, not a documentation
requirement.** Run it against a layer, a function, or a spec section and the
output is a list of things to remove. That is uncomfortable and it is the point;
every framework accretes capabilities that answer nobody's question, and nothing
else in this lens will remove them.

---

## §7. Four findings that constrain harness design

The load-bearing output. Each is a limit that holds regardless of implementation.

### 7.1 "Draw it" does not survive translation to agents

**H3 is the highest-value heuristic in the source and the least portable.**

The mechanism is not the diagram. It is **physical mutual contradiction**: I draw
my wrong understanding of your system, you say *"no, it's like this,"* and we
converge — because correcting a picture is cheap and correcting prose is
expensive. The source is explicit that being told you are wrong is the success
signal, not a setback `[§2.10]`.

An agent emitting a Mermaid diagram into a markdown file captures perhaps a fifth
of this. It is still fuzziness-resistant — a line is there or it is not — but
**nobody is present to say "that's wrong" at the moment it is cheap to say.** The
correction loop is what does the work, and the correction loop needs two parties
in the same context at the same time.

**Implication:** a framework can host the artifact and cannot supply the loop.
Any capability that claims to replace the whiteboard conversation is claiming
MECHANIZE on a HUMAN job. The honest version SCAFFOLDs: put the diagram where two
people will see it together, and make correcting it trivial.

### 7.2 H10 relocates when the architect is the model

"The tool's output is the starting line; you put the value on top" `[§2.21]` was
said about a human pasting model output into an architecture document. **In an
agent framework the architect *is* the tool**, so the heuristic does not
dissolve — it moves.

The question becomes: **where does human judgment enter, and is anyone actually
applying it?** If a plan goes from agent to dispatch with no judgment applied,
the source's asymmetry argument bites exactly as written — either the output is
bad, which is bad; or it is good enough to ship unedited, in which case the
surrounding role was not needed.

This is the same argument as
`loomwarp-team-system` `fractal/STRATEGIST-loomwarp.md` (private)
§2.1 (*evidence over assertion*) reached from a different direction, which is
mild corroboration for both.

### 7.3 Suitability cannot be gated, and conformance can

The sharpest boundary in the lens, and it sits directly on
`loomwarp-team-system` `standards/README.md` (private)'s stated
preference for mechanical enforcement over prose.

That preference is right, and **H5/H6 mark its edge.** There is no global ranking
of architectures `[§2.18]` — a design is suitable or not *for a job*, and the job
is not in the repository. You cannot lint "did they understand the trade-off."

Two things follow:

1. **Gate conformance, dialogue suitability.** They are different questions and want different machinery. Conformance → layer 2 and layer 8. Suitability → a human, on a cadence.
2. **The drift is one-directional and worth watching.** Everything mechanizable gets mechanized; suitability has no check, so it gets no owner; the system slowly optimizes for what it can measure. This is the default trajectory of every conformance system, not a hypothetical.

**The partial fix is real, though.** H6's mechanical form — *assert the
trade-off field is non-empty* — cannot check that reasoning is good, but it can
check that reasoning happened and was written down. Partial mechanization of a
HUMAN job beats none, and it is cheap.

### 7.4 Where this disagrees with LoomWarp's own agents

Recorded as observation, not as a change proposal. The `.claude/agents/*` roster
is not derived from this lens and should not be retrofitted to it.

| Lens claim | Current agent design | Reading |
|---|---|---|
| Amplifier, not oracle `[§2.1]` | Architect decides; Feature Lead executes | **Genuine divergence, and defensible.** An agent hierarchy needs a decider where a human org needs an amplifier. Worth stating as a choice rather than inheriting it accidentally |
| Trade-offs stay recoverable `[§2.11]` | BLUEPRINTs record structure and sequencing | No *alternatives considered / trade-off accepted* field. This is H6's mechanical form and the cheapest item here |
| Review reasoning, not artifacts `[§2.18]` | HANDOFF evaluation runs conformance layers | Correct for conformance. "Did the Feature Lead understand the trade-off it made" is not a conformance question and currently nothing asks it |
| H7 as a gate `[§2.11]` | — | The deletion test in §6.2 has not been run against the twelve-layer structure |

---

## §8. What level of human sits beside the harness

The staffing question the sizing dial implies. The jobs do not change with
seniority; **what changes is which counterfeit the person can catch in
themselves.**

| Level | Reliably does | Characteristic counterfeit they miss |
|---|---|---|
| Mid | A2, A4 on request | Answers the question as asked — no H2 |
| **Senior** | A1–A7 unprompted; H1–H8 fluent | **A8.** Does not yet know heuristics have a shelf life |
| Staff+ | All of it, H9 as reflex | Over-framing — H2 with no stopping rule; capital hoarded and never spent |

The senior→staff transition is specifically **A8 arriving as a felt need rather
than an intellectual agreement**, and it usually arrives by being confidently
wrong once, in public, from a premise that had quietly expired.

Which is why A8 is the job worth mechanizing even though it is the least
glamorous: **the mechanism substitutes for an experience most people have not had
yet.**

---

## §9. Open questions

Genuinely unsettled. Listed so they are not mistaken for answered.

1. **Should the twelve-layer structure have a home for A1, A3, and A4?** §3.1 finds them absent. Absent may be correct — a harness that tries to own framing will do it badly. But *silently* absent is not correct either, since teams adopting the framework will assume the process is covered.
2. **Is A3 worth a required field?** §4.1 argues yes, on the grounds that a mechanical prompt spends no political capital where a person asking spends some. Not argued out.
3. **How much of this survives the source being one interview?** §0 flags it. The lens would be considerably stronger with a second and third practitioner source, ideally measured the way `03-jtbd.md` measured its convergence line.
4. **Does the deletion test in §6.2 actually run?** It is stated as mechanizable. Nobody has run it against a real layer set, and a test that has never been executed is a proposal.

---

## §10. The lens in one line

> **The seventeen jobs tell you what to build. The eight tell you who still has
> to be in the room.**
