---
title: "Architect craft — source notes, Gregor Hohpe"
tier: reference
project: loomwarp
provenance: OBSERVED
created: "2026-09-01"
updated: "2026-09-01"
status: DRAFT
owner: KD
---

# What top-tier architects do differently — Gregor Hohpe

**Provenance: `OBSERVED`.** Other people's work, recorded as evidence. Per
[`../../00-MAP.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/00-MAP.md) §1 this may be quoted and cited, never
restated as ours. The synthesis built on it is `DERIVED` and lives at
[`02-harness-sizing-lens.md`](./02-harness-sizing-lens.md).

**Source:** *Google & AWS Veteran: What Top Tier Software Architects Do Differently* — Beyond Coding podcast, guest Gregor Hohpe (ex-AWS, ex-Google; author of *The Software Architect Elevator*, *Platform Strategy*, *Enterprise Integration Patterns*)
**URL:** https://www.youtube.com/watch?v=F8X9_Dp3ZUk · 1:04:55 · published 2026-01-21
**Accessed:** 2026-09-01, from the published English captions

> **On this document.** These are structured notes, not a transcript. Section
> summaries are paraphrase; anything in quote marks is verbatim from the
> captions and kept short. Timestamps let you jump to the source. Auto-captions
> garble some names and terms — where a word is uncertain it is marked `[sic]`.
>
> **One voice, not a field.** This is a single practitioner's opinion, captured
> from one interview. It is evidence of how one well-regarded architect
> describes the craft — not a measured claim about the field, and not comparable
> in standing to [`../comparisons/03-jtbd.md`](../comparisons/03-jtbd.md), whose
> convergence line was measured against a committed 562-session corpus. Weight
> it accordingly.
---

## 1. Section map

| Time | Section |
|---|---|
| 00:00 | Cold open — the thesis in four lines |
| 01:35 | Spotting bad architects (easier than spotting good ones) |
| 02:20 | The amplifier, not the oracle |
| 03:53 | Architecture as a risk-management function |
| 05:27 | Inherent vs. accidental complexity |
| 09:24 | Disagreement: frame the solution space before debating it |
| 11:45 | Worked example — microservices → four quadrants |
| 13:15 | Visual thinking; why pen and paper |
| 16:25 | Learning to sketch; the left-brain/right-brain ping-pong |
| 19:34 | The architect elevator — story plus defensibility, in one head |
| 22:45 | Hard skills, and the decay of hard skills |
| 24:22 | The rubber-duck test |
| 25:09 | The phantom sketch artist |
| 29:03 | Cartographer → scout: what changed in enterprise architecture |
| 34:29 | Revalidating your heuristics |
| 36:49 | Staying current via network, not social media |
| 39:57 | Three viable career paths; the networked IC |
| 41:32 | Making yourself unnecessary |
| 43:49 | The jester, and political capital |
| 49:59 | Suitable, not good: how to review an architecture |
| 53:08 | In defence of the big ball of mud |
| 56:16 | Executives smell gaps in reasoning, not bad tech |
| 58:33 | LLMs: amplifier or substitute |
| 01:01:43 | Two traps at the finish line |

---

## 2. Core claims

### 2.1 Amplifier, not oracle `[00:00, 02:20]`

The single organising idea of the interview:

> "Architects shouldn't try to be the smartest people, but they should make everybody else smarter."

> "You don't want to be a kind of oracle, where people come with their questions and look for magic answers."

The reasoning is ownership-based, not modesty-based. It's their project and their
application, so making the decision *for* them is both presumptuous and
unscalable. What the architect can do instead: absorb context, surface blind
spots, offer other angles, and make explicit the trade-offs the team is already
making implicitly without knowing it.

Good architects are hard to detect — "the ones where magically everything goes
well and nobody knows exactly why."

### 2.2 The bad-architect tells `[01:35]`

Named anti-signals, all of them observable from outside:

- **Buzzword spew.** "Everything must be cloud native or loosely coupled" — his response: "I don't need an architect to tell me that, I can just put a poster on the wall."
- **Decision-power hoarding.** "People who believe they should have all the decision power" — prescribing "three components, no more, no less."
- **Gatekeeping.** The architect as a checkpoint you must clear. The interviewer names this from experience in risk-averse enterprises and banks, where architects become "a stopgap between innovating and solutions."
- **Knowledge monopolisation** `[41:32]` — the "unmissable" posture. Hohpe's counter: he has never hesitated to share, which is why he writes books.
- **Complexity as résumé-building** `[44:38]` — "don't make our solutions overly complex so our résumé looks much better."

### 2.3 Architecture is a risk-management function `[03:53]`

The value proposition, stated plainly: *I lower your risk.* You might be fine
without an architect — you cobble something together, maybe it scales, maybe it
has no security exploits. That is a risky proposition. Lower risk is lower cost;
that is money in the bank.

But the risk register is broader than traditional architects assume. Banks
"focus purely on execution risk" — did we build what we said we'd build, on
plan? Software's real risks are different: will users like it, does it move the
needle, does it make revenue, does it grow market share. **Which risks an
organisation chooses to track determines how its architects behave.**

Corollary: lowering risk does *not* mean up-front plans, one-true reference
architectures, or a perfect design document.

### 2.4 Inherent vs. accidental complexity `[05:27 – 09:24]`

Simplicity is "one of the biggest strengths that a good design can have" — but
some complexity is physics, not failure. Distributed systems bring retries,
timeouts, idempotency, back pressure, retry storms. At AWS, product designers
pushed to "make it simpler"; his answer was that some things have irreducible
complexity.

The resulting guideline, which is the sharpest operational line in the interview:

> "Don't try to make it simpler than that, but make it intuitive to deal with the inherent complexity."

Don't pretend the complexity isn't there; make it tractable. Aim at the minimum,
don't overshoot it.

He is explicit that today's stack is not simpler than yesterday's: a Java
monolith on one server was simpler than modern software. Modern software
auto-scales, self-heals, is distributed — desirable properties, but bought with
complexity, not for free.

Why it matters — the cognitive-load chain:

> too complex → cognitive load rises → people make mistakes, move slower →
> **people become hesitant to change anything** → "that's called legacy."

"In an ever-changing world, having a piece of software that you're afraid to
touch — well, that's called legacy. We have plenty of that."

### 2.5 Frame the solution space before you debate it `[09:24 – 13:15]`

The cylinder metaphor: one person views it end-on and reports a circle; another
views it side-on and reports a rectangle. Both are right, neither will ever
concede, and the argument is unresolvable *at the level it is being held*.

Two failure modes, and the second is worse:

1. People never agree.
2. **People agree, but hold different maps** — "they think they agreed, but they actually walk out thinking very different things."

The fix is a two-step process. First establish a shared frame; that frame is
*not* up for debate. Then argue about where in the frame you should sit. "We
might be discussing different paths, but at least in our mind we should have the
same map."

**Worked example — microservices `[11:45]`.** Rather than answering
"monolith or microservices," decompose the word: it means modularity, and
modularity has two independent axes — *design-time* modularity (spaghetti vs.
well-structured) and *runtime* modularity (one deployable vs. many).

|  | Deploy as one | Deploy as many |
|---|---|---|
| **Spaghetti design** | big ball of mud | distributed monolith |
| **Modular design** | **modular monolith** | microservices |

> "Now what you've achieved as an architect: you doubled the solution space."

This is where the modular monolith comes from — a complex domain you want
well-structured at design time, without the scalability need that would justify
twenty independently deployed services. He calls the move **"mapping the map."**
The payoff is social as much as technical: the discussion stops being *you vs.
me* and becomes *where in our shared world are we, and why*.

### 2.6 Visual thinking `[13:15 – 19:34]`

He prefers ad-hoc sketches over standard notations. C4 and UML are for
*communicating what has been done*; one-off visual models are for *teasing out
nuance* while the thinking is still live.

The core argument for drawing:

> "In words it's much easier to contradict yourself or be fuzzy than in a diagram."

Two boxes either have a line between them or they don't. In prose you can say
"these things have some relationship" and burn a thousand words without ever
committing. A picture doesn't have that escape hatch.

He arrives with a pen because of *when* he is called: when a debate has ground to
a halt, when a high-profile decision is pending, or when people can't reach
agreement. Almost always the underlying cause is that people are unclear on the
constraints, the trade-offs, or what he calls **the coordinate system** — "if you
don't know what your world map looks like, it's very difficult to discuss the
path."

**Sketches are richer than they look.** In workshops he enumerates the
expressive dimensions available: size, shape, shading, ordering/numbering,
labels, a legend, nesting, relative position, and so on — roughly **20
dimensions from two coloured pens and a piece of paper.** Pen and paper win
because "the tool doesn't get in your way."

**On learning it `[16:25]`:** you do not need to be a gifted artist; nobody is
born one. It is muscle memory and repetition. The fastest route is to pair with
someone who does it well and get feedback — far faster than reading a book alone
"in your quiet chamber."

**The ping-pong `[17:59]`.** Diagrams are a strange left-brain/right-brain
hybrid: artistic and playful on one hand, rigorously semantic on the other. A
stack of three boxes probably means *multiple*, not *three* — and if it really
means three you have to say so. An arrow is either data flow or control flow,
either synchronous or asynchronous. The technique is to alternate:

> structured mind gets something down → creative mind asks "is there a missing
> dimension, another way to express this, something we're not seeing?" → iterate

"You don't need to be a genius at either one. But if you can flip back and
forth, that makes a world of difference."

### 2.7 The architect elevator `[19:34 – 22:45]`

The winning combination is a **catchy story or visual that you can defend
technically under questioning.** Walk into the decision meeting — "the
penthouse" — with the sticky artifact, and when someone asks "why is this arrow
here?", answer from the model underneath.

The non-obvious constraint:

> "You cannot split that into two heads. You must get this into one head."

You can't have an engineer do the technical work and hand it to a graphics
person to prettify, because the graphics person doesn't know the semantics —
what can be moved, what can be changed, what a line means. Both halves have to
sit in one skull so you can play the ping-pong with yourself: *what pattern do I
see, what story does it tell, and is it defensible from the underlying model?*

Naming matters. In that day's workshop the output got called the "IT Strategy
Ladder" — a ladder because of its shape — and became sticky immediately.

> "It's real engineering, but it kind of doesn't look like engineering."

**On recipes `[21:58]`:** he's wary of them. "The recipe book and the really
good cooking school are two very different things." A recipe book feeds you
tonight; a real cooking school teaches you why things work so you can *make* the
recipe.

### 2.8 Hard skills, and their decay `[22:45 – 24:22]`

You still have to be technical: be a good developer, understand trade-offs,
operations, observability, domain-driven design.

The most dangerous failure mode is not ignorance — it's **stale competence**:

> "Having had the hard skills might lead you to wrong assumptions, because your
> trade-off might have been a good one five or ten years ago, but it no longer is."

This person is well-meaning, technically grounded, and reasoning correctly — from
constraints that expired. `[34:29]`

Skills don't add, they multiply. "It's not just 'you're a good techie person and
you're a good communicator' — you're a good *technical communicator*. That is the
combination of both."

### 2.9 The rubber-duck test `[24:22]`

The proposed self-check for whether you are actually an architect:

> "Are you a popular rubber duck?"

Do people bring you problems not to have them solved, but to think out loud
against? You ask a couple of questions, maybe make a small sketch, and they walk
off with it saying "oh, that's an interesting way to think about it" — and then
go do something. If that's happening, you're on to something.

### 2.10 The phantom sketch artist `[25:09 – 29:03]`

The interview's best metaphor. Before CCTV, a police sketch artist drew suspects
from witness descriptions. The witness *knows* what the robber looked like but
can't express it — hand them a pen and you get a stick figure with a money bag.
The artist *doesn't know* what the robber looked like but has the expression
skill. The picture only exists because of the pair.

> "Knowing something and being able to express something are two different skills."

The architect is usually the artist, not the witness: "I don't have any more
knowledge than the other people. They know everything, it's their application."

**The success signal is being told you're wrong.** He draws his understanding of
someone's system and hopes to hear "oh, that's wrong":

> "Oh, excellent. Well, how does it look?"

Once people see their system drawn back at them, correcting it is easy — and now
you're in a constructive dialogue instead of an argument. The end state is "yep,
exactly like that" — from something they could never have produced themselves,
without ever having been lectured or constrained. You extracted knowledge they
already had and played it back in a consumable format.

**The hidden requirement `[28:16]`.** Sketch artists study human anatomy — bone
structure, posture, facial architecture — or the drawing doesn't read as a
person. Same for us: "it's not about drawing the most beautiful rectangle, it's
understanding the anatomy." Which makes the sketch artist a kind of architect.

### 2.11 Cartographer → scout `[29:03 – 34:29]`

What actually changed in the role: **the snapshot assumption died.** Architects
used to be able to assume the world holds still long enough to be catalogued.
Spend a few months inventorying every application into a tool and the landscape
has moved by the time you finish.

So stop being **the cartographer** with the giant complete map. Be **the scout**:

- You have an objective — cross the river, get past the enemy.
- You go look at the specific thing.
- You come back with a small, timely, *purpose-driven* map: the bridge is out, but it's shallow here, we can cross there.
- The map depicts only what is relevant to the move.

Applied to Gen AI as a live example: what's our strategy, where are the best
first use cases, how do we integrate with existing systems, how do we keep the
high rate of model churn *out of* our other systems, is agentic work just another
form of workflow integration or something genuinely novel? Deliberately opinionated
and scoped — and you can only do it if you actually understand the subject matter.

> "Too many architects try to find answers when they don't have a question."

The seductive alternative — "here's the thing that answers all possible
questions" — would be lovely, and doesn't work any more. Without a question
driving it, the output is decoration: "we're not a museum, we're not collecting
modern art. Our diagrams serve a purpose." The purpose is better decisions,
clearer decision transparency, and a shared record of what the decision *was* and
which trade-offs were accepted.

### 2.12 Revalidate your heuristics `[34:29 – 36:49]`

Everyone runs on heuristics; the job is keeping them fresh.

*Example one — "everything must scale out."* Moore's Law has outrun most
businesses' growth. A great many real business applications would fit in memory
on a single server with a couple of terabytes of RAM. Unless you're Netflix or
eBay, a normal transport or insurance workload will probably be fine.

*Example two — the shared database.* Someone shows you a diagram: many boxes,
one big barrel, everything talks to the database. Heuristics fire immediately —
performance bottleneck, brittle integration, a schema nobody can evolve. Then you
learn it's a NoSQL cloud database that "scales more than you can afford," with
per-document schemas. No problem at all. **Your heuristic was out of date and it
fired anyway.**

The honest answer to fixing this is hands-on time, which doesn't scale across
every technology — hence the next section.

### 2.13 Network as the update mechanism `[36:49 – 39:57]`

He deliberately skipped the first 12–18 months of Gen AI "madness," then needed
to catch up fast. Method: a friend deep in the field stayed with him for two
days and gave him "the full download" — walked through what he was building,
showed him the code. High-bandwidth, in person, with someone he trusts.

> "Don't think you can do this all on your own."

Social media is explicitly ruled out as a source on technologies and trade-offs,
"because everybody's peddling something." What you want is a handful of trusted
people you can buy a coffee and ask: *is that framework for real?* — "basically
be the social geek."

Note the reciprocity constraint: you need a framework and you must not waste
their time; they should be able to transmit at a high rate.

The interviewer adds the on-ramp for people without a network yet: meetups, free
conferences, and — once you're in a role — mentors on and off the job.

Hohpe goes further: a senior engineer sealed in a quiet room is already doubtful;
an architect operating that way is *"completely impossible."* You cannot have
requirements go in and architectures come out. You need the network to stay
current, and you need feedback to learn whether your own past decisions worked.

> "You don't want to be the person where people are afraid… 'great advice, great
> advice' — and then they do the opposite thing. Because you won't learn."

### 2.14 Career shape `[39:57]`

Three viable, satisfying paths, differing in emphasis, not in rank:

1. Stay an engineer and be top-notch.
2. Become a technical manager — real people skills, understanding motivation, not "a box checker."
3. Become an architect.

The architect is best understood as **a heavily networked IC.** He preferred IC
life ("I want you all to be happy, but I don't want to be the one in charge of
all your happiness") — but networked, not isolated. And the role is not the
business card: "it can be a technical product person with a very architecture
mindset." `[00:47]`

### 2.15 Making yourself unnecessary `[41:32]`

If your job is to make others smarter, success trends toward not being needed —
same as ops: perfect systems mean the ops team does nothing.

Two possible outcomes, per Hohpe: either you genuinely have nothing to do — "then
I just make sure nobody finds out" — or, far more likely, new work arrives and
you've freed the cycles to take it.

The important caveat: in a large organisation, with turnover and constant
churn, the odds of getting the org onto autopilot are low. **Treat it as a
direction to aim in, not a metric to be measured against.**

### 2.16 The jester `[43:49 – 44:38]`

Architects have "little direct power" — not the headcount, not the budget, not
the biggest teams — but high influence. That is exactly the court jester's
position: trusted to tell the truth precisely *because they have no competing
agenda*. No empire to grow, no budget to defend, no incentive to inflate
complexity for a résumé.

He is careful to add that the metaphor is for raising your own awareness while
navigating, not a recipe for success.

### 2.17 Political capital `[45:25 – 49:59]`

**Earn it** by delivering, keeping promises, being supportive, transparent,
fair, and open about what you're doing.

**Spend it** — the goal is not to become the most trusted person in the
organisation and sit on the balance. Trust that's never spent bought nothing.

**Spend it narrowly.** The canonical spend is telling the truth about the train
wreck in progress — "the implosion is scheduled for Q3 and they're holding Q2, so
everything is still perfect." His image is Wile E. Coyote past the cliff edge,
still running until he looks down: "if they don't look, they don't drop."

The two failure modes:

- **Overspending early.** Arriving convinced you're the smartest person and telling everyone what's wrong "is not going to end well for you." You must earn before you spend. A manager can extend you a small line of credit — "having friends in high levels helps, but nobody has an infinite line of credit."
- **Skirmishing everywhere.** Running around telling every project it should be more loosely coupled, cloud native and portable "doesn't help anybody."

> Have **one thing** where you really want to move the needle, and spend there.

**And the precondition — sleep at night.** Not everything will be in a perfect
state, ever. Someone reports a team violating a standard; what exactly are you
going to do? He compares it to herding cats: the cat will not always do what you
say. If you can't live with that, you get insomnia and ulcers.

The interviewer adds the relationship dimension: identical criticism reads as
valid critique from someone you have history with, and as negativity from
someone you don't. Do it constantly and "you become the grumpy old person no one
wants to talk to."

### 2.18 Suitable, not good `[49:59 – 53:08]`

> "Architecture isn't good or bad… It's suitable or not suitable. Does it do the
> job or does it not do the job."

Which means you must first know what job it's supposed to do. There is **no
global ranking** of architectures — "it's not a one-dimensional, it's not a
linear space." Anything can be criticised on some axis, because trade-offs were
consciously made and something was consciously given up.

**How he actually runs an architecture assessment:** at least two-thirds of the
exercise is determining whether the team understands its own needs and the
decisions it made.

- If **no** — that's the real problem. You can't even judge the design, because nobody knows what it was for.
- If **yes** — "I would be hard pressed to question that." You understood your priorities, you built to them, you accepted a trade-off. That's fine.

> "It's less looking at the final product and saying whether this is good or bad,
> and more reviewing your thought process."

Three questions, in order: were the decisions conscious, are the trade-offs
understood, and were those trade-offs aligned with what the business needed.

**A warning about outside reviews `[50:45]`:** third parties "generally come with
an agenda and they will always find something" that matches it. The vendor's
finding is always that you didn't use their latest product — and they will
construct a very plausible case for it.

### 2.19 In defence of the big ball of mud `[53:08 – 56:16]`

He notes the pattern's authors were unhappy that it got flattened into "bad,
don't do it," and rewrote it to restore the balance. The big ball of mud is
**quick, cheap, and buildable with a limited skill set.**

> "Who doesn't want something that's cheap and quick and made with a limited skill set?"

Those are genuinely desirable qualities. It has real downsides in shared
infrastructure and maintainability — that's the trade-off — but if it were bad in
every dimension, nobody would ever build one.

The scenario: one month to launch, can't hire, existing skill set. What's the
advice — build a platform and send everyone to cloud-native training? "The month
is going to be up."

> "It's so easy to judge and be the smarty-pants, but I don't think that's going
> to make you the architect that people want to come to."

The architect people *do* come to takes the trade-off seriously and then extends
the horizon: that was right for how far you've come — now what does the future
look like? What are the next requirements? How big must this get? What's the
system's expected lifespan? Then you can guide toward a little modularity. "This
comes out of the dialogue, not out of some judgement or recipe."

### 2.20 Executives smell reasoning gaps, not bad tech `[56:16 – 58:33]`

Board members, CIOs, CEOs and CFOs will essentially never challenge your
technical decision — "that's your domain." What they have is an exceptional nose
for **whether your story and your logic hold together.**

The failure looks like this: someone asks *why Kubernetes?* and you treat the
question as stupid — obviously, it's the future, Google uses it, it's best
practice — and hand-wave. They will zoom straight in.

What they actually ask:

- What alternatives did you consider?
- What metrics did you use? How do we know what success looks like?
- How much up-front investment does this take?
- Could we defer this decision? Could we start simple and add Kubernetes later?

> "They're like dogs who can smell [it]… they can smell jumps in logic."

That is where hidden assumptions are buried, where risks are buried, and where
people **reverse-engineer justification from the answer they already picked.**
Executives are trained to find exactly that — which is where a lot of engineers
stumble, "because they don't have their reasoning straight."

Which closes the loop: an architect who probes *does this all make sense, do we
understand the trade-offs* is also the perfect preparation for the upper floors
of the elevator.

### 2.21 LLMs — amplifier or substitute `[58:33 – 01:01:43]`

Reasoning is now the differentiator precisely *because* plausible output is
cheap. "You can ask a magical box a question and the answer pops out." If your
reasoning is solid, the path you took to the answer doesn't much matter.

He describes reading an architecture document, asking two questions, and knowing:
"who wrote this?" The tells are long lists, fluffy wording, and unearned
confidence — "it always shines through." Then one or two questions and "the house
of cards falls down."

> "If you paste the output of the LLM into an architecture document, you can only lose."

The asymmetry is the argument. If the tool's raw output is bad, that's bad for
you. If the tool's raw output is genuinely good enough to ship unedited, that's
*also* bad for you: "why are we paying the architect? We'll just use the same
tool that person is using."

> "Your starting point is the output of the tool. And you put the value on top."

> "Make sure the tool works for you, not you work for the tool. Use it as an
> amplifier of your own abilities, not as a substitute."

The interviewer's summary, which Hohpe endorses: **don't be the tool, be on top
of the tool.**

### 2.22 Two traps at the finish line `[01:01:43 – end]`

Both are traps of *self-devaluation at the moment of success*.

**Trap 1 — the anticlimax.** People arrive confused; you draw the picture; now it
all seems easy. It can feel like you did nothing.

> "Don't stumble on the finish line. If you made sense out of this and suddenly
> it seems obvious, you've done a fantastic job."

> "We've gotten so in love with complexity that if we actually cut through the
> complexity, we sometimes doubt ourselves."

If it all makes sense now, you found the right model, drew the right picture, and
abstracted away the right things. **That is what success looks like.**

**Trap 2 — "that was obvious."** A large part of the job is unearthing hidden
assumptions baked into a design that will surface later to hurt you. The catch:
*once stated, an assumption is obvious.* People will say "well, that was
obvious" — and the answer is: if it was that obvious, why hadn't you stated it?

> "If that was the case, they would have come up with it themselves, and you
> wouldn't have to do anything."

Being the catalyst that makes it easy for other people to articulate what they
know is highly valuable. "And if the end result is simple, well, that is even
better. That's the absolute peak performance."

---

## 3. Quick index of the metaphors

| Metaphor | Compresses |
|---|---|
| **Amplifier, not oracle** | Multiply the room's intelligence; don't centralise answers |
| **Rubber duck** | The usable self-test for whether you're an architect |
| **Circle vs. rectangle** | Two right people, two projections, one unresolvable argument |
| **Mapping the map** | Build the shared frame first; debate positions second |
| **Phantom sketch artist** | Knowing ≠ expressing; you supply expression, they supply knowledge |
| **Ping-pong (left/right brain)** | Alternate structure and creativity; both in one head |
| **Architect elevator** | Sticky story upstairs, defensible model underneath |
| **Cartographer → scout** | Purpose-driven situational maps beat exhaustive stale ones |
| **Jester** | Influence without positional power, credible for lack of agenda |
| **Political capital** | Earn broadly, spend rarely, spend on one thing |
| **Wile E. Coyote** | The project that stays airborne only by not looking down |
| **Herding cats** | You will not get compliance; sleep anyway |
| **Recipe book vs. cooking school** | Teach why it works, not what to type |
| **Don't be the tool** | LLM output is your starting line, not your deliverable |
