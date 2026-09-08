# Slide plan — AI Tinkerers, 5 minutes

Maps every line of `../AI-tinkerers-script-outline.md` to a visual. **14 slides, ~21s each.**
Room: AI builder computer club — devs and peers. One ask, at the end.

**Assets in this folder.** `✅ ready` · `🟡 you have it` · `🔧 make in slides`

| | Asset | State |
|---|---|---|
| A1 | `harness-loop.png` — the anatomy, light render | ✅ (your `image4` is the dark one) |
| A2 | `layer-stack.png` — the twelve layers | ✅ |
| A3 | `the-line.png` / `.svg` — where convergence stops | ✅ **new** |
| A4 | `genre-split.png` / `.svg` — who ships the team rows | ✅ **new** |
| A5 | `from-script/image1.png` — Jeff Patton, *I'm glad we all agree* | 🟡 |
| A6 | `from-script/image2.png` — 12-factor, own your control flow | 🟡 |
| A7 | `from-script/image3.png` — Dex Horthy, software factories | 🟡 |
| A8 | `from-script/image5.png` — the MATRIX grid, dark | 🟡 |
| — | numbers, quote pairs, CTA | 🔧 |

---

## The deck

| # | Slide | Your line | Visual | Say (≈) |
|---|---|---|---|---|
| **1** | **Title** | *"Mapping the changing shape of agent harnesses"* | A2 layer-stack, dimmed, as full-bleed background | Name, role, one sentence: *"a side project that uses Claude Code to tear down and compare agent harnesses."* |
| **2** | **March: I had a workflow** | Cursor + spec + TDD | 🔧 Three-panel: `Cursor · any model · spec→TDD` | 15s. Set up the loss. |
| **3** | **April: I lost it** | corporate VM, VSCode + an API key | 🔧 Same three panels, two crossed out | 15s. **This is the emotional beat — don't rush it.** |
| **4** | **So I built one** | orchestration → shared repo → *no shared context* → decision ledger | 🔧 Three boxes accreting left→right, third one lands with a thud | *"Then I shared it with my team and found what we were missing was shared context. So I built a decision ledger."* **Plant this — slide 12 pays it off.** |
| **5** | **The industry named it** | *"the stack I built, the industry was calling it a harness"* | 🔧 The same three boxes, one word stamped across: **HARNESS**. Small credits: Hashimoto · Fowler/Böckeler · LangChain · OpenAI | 10s. |
| **6** | **Why it matters now** | *(new — you don't have this)* | 🔧 One number, huge: **25.7** — *points of swing on Terminal-Bench. Same model. Different harness.* | *"Anthropic calls infra config a first-class optimization variable. Harness choice is now worth more than a model generation — and we have no standard way to describe one."* **This is your hook. 15s.** |
| **7** | **Nobody reads** | teams need structure, shared understanding, frameworks | A5 Jeff Patton | 20s. Your best analogy — let it breathe. |
| **8** | **What the repo is** | profiles · teardowns · stat sheets · comparisons | 🔧 Screenshot: `content/claude-code.md` §1 at-a-glance card. Real product beats a site map | 20s. One slide for all four bullets. |
| **9** | **Every harness has the same shape** | *"harnesses and loop engineering mostly have the same shape"* | **A1** harness-loop | 20s. |
| **10** | **Twelve layers = "how do we work"** | Foundation / configured / accumulates / runs — **cut the sub-bullets** | **A2** layer-stack. Optional overlay: *Harness = SDLC, lean → SAFe* | 25s. Narrate the four bands, not the 33 rows. |
| **11** | **What everyone agrees on — and where it stops** | your "everybody has agreed" list, **corrected** | **A3** the-line | 30s. *"Five of thirty-three are named primitives in all seven. Every one is layer 4 or below. Above the line: zero."* **Longest slide in the deck. Earn it.** |
| **12** | **Who ships the team rows** | *"multiplayer and context for teams is the next frontier"* | **A4** genre-split | 30s. *"The systems that ship memory, learning, cadence, roster and org are personal assistants. The coding harnesses refuse them — Pi in writing."* Then: *"5b Team Memory — the decision ledger I built in April — is zero of seven."* **The callback.** |
| **13** | **Hot takes, now measurements** | your three hot takes + "nobody ships standards and evals" | 🔧 Four lines, each with its number:<br/>`environment 0/7` · `rituals 0/7` · `standards 0/7` · `evals 0/7` | 30s. These stop being opinions. |
| **14** | **What did I get right? What did I get wrong?** | CTA | 🔧 QR to repo · MIT · *drafted, not yet verified* · *"would we benefit from tools that help teams see what they're building?"* | 20s. |

---

## Cuts made, and why

- **Maturity range** — out. Different audience (orgs, not builders) and it doubles the surface area.
  One link on slide 14.
- **LoomWarp** — out as a subject, per your call. But keep **eight words** on slide 8 or 14:
  *"I scored my own harness by the same rules. It came out worst."* That buys every number in slides
  11–13 and costs no time. If asked: *"which is exactly why I needed to read the other ten."*
- **The four-layer "how do we work" bullet nest** — collapsed into slide 10's narration.
- **A6 (12-factor) and A7 (Dex Horthy)** — hold as backup. Both are good, neither survives a 5-minute
  cut. If you keep one, keep A7 on slide 10 as the *"harness = SDLC"* credit.

## Cuts still needed

Current script is ~1,100 words of narration. **Five minutes is ~700.** The origin story (slides 2–5)
is worth 60 seconds and no more — it is the setup, not the talk.

---

## Two corrections to make before you write the final script

**1. `5a` Individual memory is not converged.** Pi and OpenCode ship **no memory at all** — hard `○`.
Saying "everybody agreed on individual memory" is wrong at source and a peer in that room may know it.
The accurate universal five: **substrate · adapters · hooks · configuration · skills.**

**2. "Deterministic validation" has a better quote than an assertion.** Grok Build's own docs:
*"Hooks fail open. If a hook script crashes, times out, or is missing, the tool call proceeds as if the
hook had allowed it."* Hermes's default is the opposite — `fail_closed`. Same mechanism, opposite
safety posture, both shipping today. Two quotes on one slide beats a claim.

## One line to add, on the bitter lesson

You have the receipt and aren't using it. Concede it completely, then point above the line:

> *"The bitter lesson is right — and it already happened. Below layer 5. Adapters, hooks, config,
> skills: all absorbed, all converged, in about eighteen months. It has nothing to say about who's on
> call, or what your review bar is. That's the part that doesn't come in the next model."*
