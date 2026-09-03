---
status: DRAFT
provenance: OBSERVED
---

# AI-Native Organizational Maturity Framework

> **Version:** 0.2 — Hybrid restructure: merged external maturity model with Emtelligent-specific grounding **Status:** 🟡 In Progress — pending team calibration **Author:** KD (Product Manager) **Date:** 2026-04-07 **Audience:** Feature team \+ exec leadership **Inspired by:** Nielsen Norman Group UX Maturity Model, McKinsey State of AI, Microsoft WorkLab Frontier Firm, BCG AI Workforce Strategy, industry AI maturity frameworks **Companion doc:** `L1-08-ai-native-team-operations-research.md` (named company examples, tool tradeoffs, 7-component rubric)

---

## Why This Document Exists

Emtelligent is trying to launch a production SaaS platform on a compressed timeline with a small team. The org spans multiple levels of AI adoption maturity — from individuals who haven't committed to working with AI, to a product team actively building with AI-native toolchains. This spread creates friction: mismatched expectations about velocity, quality, and how work gets done.

This framework does three things:

1. **Names the stages** so everyone can self-locate and understand the journey  
2. **Makes the binary decision visible** — there is a commitment threshold where the org must decide, not drift  
3. **Provides concrete workflows** showing what high-performing AI-native teams actually do, grounded in both general principles and Emtelligent's own toolchain

The analogy: NN/g's UX Maturity Model helped organizations understand that "doing UX" isn't a binary — it's a spectrum of capability across strategy, culture, process, and outcomes. AI-native adoption follows a similar pattern, but with a critical difference: there is a commitment threshold where hybrid approaches break down and the org must choose.

> **AI-Native Maturity \= the degree to which a team has moved from ad hoc AI usage to intentionally redesigned human-AI systems.**

---

## The Three Eras (Executive Summary)

For leadership, the entire maturity journey compresses into three eras. Every stage in the detailed model maps to one of these eras. This is the version for a 2-minute exec conversation.

### Era 1: AI as Tool

People use AI individually. Wins are personal and anecdotal. The org gets faster individuals but not a faster organization. Nothing about how work is structured changes.

*Stages: Resistant, Opportunistic*

### Era 2: AI as Workflow

Teams redesign recurring work around AI. Shared templates, evaluation standards, and documented use cases emerge. AI is part of delivery, but the organization's structure — roles, decision-making, hiring — hasn't changed yet.

*Stages: Assisted, Systematized*

### ⚡ The Commitment Threshold

Between Era 2 and Era 3, the organization faces a binary decision: redesign how work gets done around human-AI collaboration, or continue operating traditionally with AI bolted on. This is not a gradual transition. Hybrid approaches at the org level create two-speed teams that can't collaborate effectively. The org must choose.

### Era 3: AI as Operating Model

The organization redesigns roles, decisions, and structure around human-AI collaboration. Humans focus on judgment, taste, direction, and exception handling. AI handles execution, synthesis, first-pass production, and coordination. Team sizes shrink. Cycle times compress from weeks to days. The bottleneck shifts from "building" to "deciding what to build."

*Stages: AI-First, AI-Native*

---

## The 6 Stages of AI-Native Maturity

### The Four Dimensions

Maturity is assessed across four dimensions. An org can be at different stages across each dimension — and often is. The gap between dimensions is where friction lives.

| Dimension | What It Measures |
| :---- | :---- |
| **Strategy** | How explicit is the company's point of view on AI? Low: "Everyone should try AI." High: "These workflows are AI-first, these are human-only, and these are the metrics." |
| **Culture** | How safe and normal is AI usage? Low: secret use, politics, stigma. High: clear norms, peer learning, strong review culture, no shame around using AI well. |
| **Process** | How embedded is AI in actual work? Low: random prompting. High: defined flows, reusable patterns, QA gates, escalation rules, evaluation methods. |
| **Outcomes** | Is the organization measuring real gains? Low: anecdotes. High: measured impact on cycle time, throughput, quality, defect rate, and cost-to-serve. |

---

### Stage 1 — Resistant

**Era:** AI as Tool **Leadership mindset:** "Prove it's safe first." **Primary bottleneck:** Trust

AI is treated as suspicious, off-policy, or mostly a compliance risk.

**What it looks like:**

- People use AI quietly, if at all  
- Leadership talks more about risk than value  
- No sanctioned tools, no approved data boundaries, no guidance  
- AI work is framed as cheating, laziness, or low-quality output  
- The word "AI" appears in strategy decks but not in tooling budgets

**Common failure mode:** Moral panic — fear-driven restrictions that prevent any learning.

**The driver distinction — Innovation vs. FOMO:** This is the stage where motive matters most. Organizations exit Stage 1 for one of two reasons, and the reason determines whether they stall at Stage 3 or break through to the commitment threshold:

- **Innovation-driven:** "We believe AI-native workflows will make us fundamentally better. We're committing resources to find out how." → These orgs reach Era 3\.  
- **FOMO-driven:** "Everyone else is doing AI. We need to be doing AI too. Let's get some licenses." → These orgs stall in Era 1-2 indefinitely, accumulating tool spend without changing how work gets done.

**How to tell the difference:** Innovation-driven orgs ask "what should we stop doing?" FOMO-driven orgs ask "what should we add?"

| Dimension | Stage 1 Signal |
| :---- | :---- |
| Strategy | AI not in operating plan |
| Culture | Fear, skepticism, shadow usage |
| Process | Traditional workflows only |
| Outcomes | No AI-related metrics |

---

### Stage 2 — Opportunistic

**Era:** AI as Tool **Leadership mindset:** "Let people experiment." **Primary bottleneck:** Repeatability

A few individuals use AI to go faster, but it is personal productivity, not team capability.

**What it looks like:**

- Strong individual performers get leverage from prompting, coding copilots, chat tools, meeting summarizers, and research assistants  
- Wins are anecdotal — "I used Claude for..." conversations happen informally  
- No shared prompts, no shared context, no organizational knowledge about what works  
- AI is used for acceleration of existing tasks (drafting, code completion, summarization) but doesn't change what work gets done or how it's structured  
- Management is aware but hasn't made adoption a priority or expectation

**Common failure mode:** Hero culture — one person is 3x faster, but the organization can't replicate it. Knowledge stays trapped in individual habits and prompt snippets. The power user leaves and the capability leaves with them.

**Emtelligent signal:** Parts of the org are here. Some individuals use AI tools; it's not expected or standardized.

| Dimension | Stage 2 Signal |
| :---- | :---- |
| Strategy | AI in individual toolbelts, not in team plans |
| Culture | Optional, self-directed, uneven across functions |
| Process | Traditional processes with personal AI bolt-ons |
| Outcomes | Anecdotal productivity gains, not measured |

---

### Stage 3 — Assisted

**Era:** AI as Workflow **Leadership mindset:** "Where can AI remove toil?" **Primary bottleneck:** Workflow design

Teams standardize a few AI-supported workflows, but humans still do almost all orchestration.

**What it looks like:**

- Common use cases are documented: drafting, summarizing, research synthesis, prototyping, code scaffolding, QA support  
- Team-level guidance exists for approved tools and safe data handling  
- People share templates, prompt patterns, and review checklists  
- AI is part of delivery, but not yet part of how the organization is designed  
- The team sees velocity gains but struggles to quantify them  
- There's tension between AI-native team members and traditional workflows elsewhere in the org

**Common failure mode:** Prompt theater — people go through the motions of "using AI" but workflows haven't actually changed. AI is added onto processes rather than redesigning them.

**The critical observation:** Stage 3 teams often produce work faster than the org can absorb it. They're bottlenecked not by their own velocity but by downstream processes (review cycles, approval chains, deployment cadences) designed for traditional speed. This creates the pressure that forces the commitment threshold.

**Emtelligent signal:** The product/dev team (KD, PD) is attempting to operate here — using Claude Code, FRACTAL orchestration, agent-based development, Cowork for planning. But the broader org's processes (decision cadence, resource allocation, review cycles) are still Stage 1-2, creating the friction documented in D-112.

| Dimension | Stage 3 Signal |
| :---- | :---- |
| Strategy | Team-level AI adoption, not org-wide |
| Culture | Team norm, org curiosity |
| Process | AI-augmented traditional processes, some shared patterns |
| Outcomes | Team velocity up, org absorption lagging |

---

### Stage 4 — Systematized

**Era:** AI as Workflow **Leadership mindset:** "Which workflows should be AI-assisted by default?" **Primary bottleneck:** Cross-functional operating model

AI is designed into core workflows, with governance, evaluation, and measurable business value.

**What it looks like:**

- Teams define where AI should be used, where it should not be used, and what level of human validation is required  
- There are approved data flows, knowledge sources, model choices, and escalation paths  
- Output quality is measured — teams instrument cycle time, quality, rework, and adoption  
- Governance is embedded into delivery rather than treated as a separate function  
- Shared knowledge assets exist: organizational prompts, agent configurations, evaluation templates, style guides  
- Cross-functional workflows involve AI — not just engineering (product specs, legal review, GTM copy, support triage)

**Common failure mode:** Bureaucracy without redesign — governance layers are added but the underlying work structure doesn't change. AI gets slower because of process overhead, not faster.

| Dimension | Stage 4 Signal |
| :---- | :---- |
| Strategy | AI in operating plan with explicit workflow designations |
| Culture | Org-wide expectation, shared practices, clear norms |
| Process | Defined flows, reusable patterns, QA gates, escalation rules |
| Outcomes | Cycle time, throughput, and quality measured and reported |

---

### ⚡ The Commitment Threshold (Stage 4 → Stage 5\)

This is the most important transition in the model. Unlike NN/g's UX maturity (where progression is always gradual), AI-native adoption has a **commitment threshold** that requires an explicit organizational decision.

**The decision:** "AI-native workflows are how this organization works. Not optional. Not experimental. The default."

**Why it's binary:**

- Hybrid approaches at the org level create two-speed teams that can't collaborate effectively  
- Traditional review/approval processes become the bottleneck for AI-native teams, creating resentment and slowdowns  
- Investment in AI infrastructure (agents, knowledge bases, evaluation frameworks) only pays off at org scale  
- Cultural permission to "work differently" must come from leadership, not from individual teams

**What the commitment looks like:**

1. **Tooling is provisioned org-wide** — not "if you want it" but "this is your environment"  
2. **Processes are redesigned** — not "use AI within the existing sprint" but "we ship in days, not sprints"  
3. **Quality gates change** — from "did a human write this" to "does this meet our standard, regardless of how it was produced"  
4. **Metrics change** — from story points and sprint velocity to cycle time and outcomes delivered  
5. **Hiring and roles change** — from "5 engineers" to "2 engineers \+ AI orchestration capability that equals 10"

**What happens if you don't commit:**

- Stage 3-4 teams burn out from fighting org friction  
- The best AI-native talent leaves for orgs that have committed  
- Tool spend increases without proportional output gains  
- The org tells a "we use AI" story externally while operating traditionally internally

---

### Stage 5 — AI-First

**Era:** AI as Operating Model **Leadership mindset:** "How should the team work if intelligence is abundant?" **Primary bottleneck:** Organization redesign

The team no longer asks "Should we use AI here?" It designs work assuming AI collaborators are present.

**What it looks like:**

- Roles are redefined around judgment, taste, systems thinking, and exception handling  
- Routine synthesis, drafting, analysis, and first-pass production are delegated to AI by default  
- Hiring changes: the organization values people who can direct, verify, compose systems, and improve tooling  
- Documentation, playbooks, and internal knowledge are structured so AI can use them well  
- Managers focus less on task assignment and more on system design  
- Functional boundaries soften because AI handles much of the translation layer between disciplines

**Common failure mode:** Speed without judgment — shipping faster but losing the human oversight that catches domain errors, clinical incorrectness, or strategic misalignment.

**The velocity difference becomes measurable:**

- Features that took 2-3 sprints now ship in 3-5 days  
- Documentation, specs, and plans are produced in hours, not days  
- Code review cycles compress from days to hours  
- The bottleneck shifts from "building" to "deciding what to build"

| Dimension | Stage 5 Signal |
| :---- | :---- |
| Strategy | AI capability as a strategic asset in planning and headcount models |
| Culture | AI-native is "how things are done here" — part of identity |
| Process | AI-native processes (not AI-augmented traditional), proprietary workflows |
| Outcomes | AI ROI measured and reported; cycle time in days, not sprints |

---

### Stage 6 — AI-Native

**Era:** AI as Operating Model **Leadership mindset:** "What should humans uniquely do, and what should the system do?" **Primary bottleneck:** Strategic coherence

The operating model, team design, and product strategy are built around human-agent collaboration as a core capability.

**What it looks like:**

- The organization is structured around outcomes, not traditional function silos  
- Agents or AI systems own meaningful sub-workflows under human supervision  
- Knowledge management, tooling, evaluation, and governance are all designed for machine participation  
- The company's products, internal processes, and strategy all assume AI as infrastructure  
- A smaller team achieves output that previously required much larger headcount  
- Competitive advantage comes from better orchestration, better data, and better judgment loops  
- The boundary between "product" and "how we build the product" blurs — internal AI workflows become external product features

**Common failure mode:** Automation without accountability — delegating too much to AI systems without maintaining the human oversight, audit trails, and governance that high-stakes domains (like healthcare) require.

**This is aspirational for most orgs in 2026\.** The point of including it is directional — it shows where the maturity curve leads and prevents Stage 5 complacency.

| Dimension | Stage 6 Signal |
| :---- | :---- |
| Strategy | AI-native as market differentiator; internal AI capabilities become external products |
| Culture | Attracts talent based on working model; outcomes-organized, not function-organized |
| Process | Frontier experimentation as standard practice; agents own sub-workflows |
| Outcomes | Planning, delivery, knowledge reuse, and decision support are deeply AI-mediated |

---

## What Distinguishes a Truly AI-Native Team

A truly AI-native team is not just a team that uses a lot of AI. It is a team where:

- Work is decomposed clearly into tasks AI can do and tasks humans should own  
- Knowledge is structured so AI can retrieve and use it  
- Review loops are explicit rather than assumed  
- Managers design systems, not just assign tasks  
- Roles shift upward toward judgment, direction, integration, and exception handling  
- Measurement is tied to business value rather than novelty

---

## Part 2: How AI-Native Teams Actually Work

This section moves from framework to practice. What does a Stage 5-6 team look like day-to-day? How does work actually get done at \<1 week ship speeds?

### The Fundamental Shift: From Assembly Line to Orchestra

Traditional agile development is an **assembly line**: requirements → design → build → test → review → deploy. Each step is sequential, each handoff introduces delay, each role waits for the previous one.

AI-native development is an **orchestra**: a small number of humans conduct, and AI instruments play simultaneously. The human provides intent, judgment, and taste. The AI provides velocity, breadth, and tireless execution.

Think of it like this: in traditional development, a feature goes through 5 people sequentially over 3 weeks. In AI-native development, 1 person orchestrates AI agents that handle the 5 roles simultaneously in 3 days. The human's job shifts from "doing the work" to "directing the work and evaluating the output."

### Team Composition

**Traditional team (Stage 1-2):** | Role | Count | Responsibility | |------|-------|----------------| | Product Manager | 1 | Requirements, prioritization | | Designer | 1 | UX/UI design | | Frontend Engineer | 2 | Implementation | | Backend Engineer | 2 | Implementation | | QA Engineer | 1 | Testing | | **Total** | **7** | |

**AI-native team (Stage 5+):** | Role | Count | Responsibility | |------|-------|----------------| | Product-Engineer (orchestrator) | 1-2 | Intent, architecture, quality judgment, AI orchestration | | Domain Expert | 1 | Clinical/business context that AI can't have | | AI Capability | N agents | Implementation, testing, documentation, review | | **Total humans** | **2-3** | |

The AI-native team isn't "the same team with AI tools." It's a fundamentally different structure where the humans' roles change from producing artifacts to directing and evaluating AI-produced artifacts.

**Emtelligent example:** The current Cerebro feature team (KD \+ PD \+ BA) operating with Claude Code \+ FRACTAL orchestration is closer to the AI-native model than a traditional 7-person team — but is constrained by org-level processes designed for the traditional model (D-112).

### The \<1 Week Ship Cycle

**Day 0 (hours): Intent \+ Architecture**

- Product-engineer defines the intent: what, why, for whom, success criteria  
- AI architect agent decomposes into workstreams with dependency graph  
- Human reviews architecture, adjusts scope, approves workstream PRDs  
- Parallel workstreams are assigned to AI agents

**Day 1-2: Parallel Execution**

- Multiple AI agents execute workstreams simultaneously (not sequentially)  
- Each workstream has self-contained context (PRD, file manifest, acceptance criteria)  
- Agents produce code \+ tests \+ documentation as a unit  
- Deterministic evaluation (lint, build, type-check) runs automatically on each handoff

**Day 3: Integration \+ Evaluation**

- Workstream outputs are integrated  
- LLM-judgment evaluation checks code quality, intent alignment, and domain correctness  
- Human reviews taste-level decisions: is this the right UX? Does this feel right for our users?  
- Issues are caught and fixed in hours, not days

**Day 4: Ship**

- Build verification passes → commit \+ deploy → human verifies in production  
- Documentation is already written

**Why this is faster than traditional agile:**

- No handoff delays between roles (AI handles multiple roles simultaneously)  
- No sprint ceremony overhead (planning, grooming, retro)  
- No "waiting for code review" (AI evaluation is near-instant)  
- No "we'll write tests/docs later" (they're produced as part of the build)  
- No context switching (the AI maintains full context; the human focuses on judgment)

**Emtelligent example (FRACTAL):**

```
Day 0: CTO Architect reads STRATEGIST doc → produces BLUEPRINT
        BLUEPRINT decomposes epic into workstreams with dependency edges
        Feature Lead PRDs are self-contained (no context needed beyond the PRD)

Day 1-2: Feature Leads (sonnet-tier agents) execute workstreams in parallel
          Sub-agents (haiku-tier) handle atomic tasks within workstreams
          Each workstream produces: code + tests + handoff artifact

Day 3: Architect evaluates handoffs:
        Layer 1 — Deterministic (lint, build, tsc, security, diff scope)
        Layer 2 — LLM Judgment (intent alignment, Angular 21 idioms, clinical UX)
        Human reviews Layer 3-4 (qualitative, strategic)

Day 4: Commit, deploy, verify
```

### Quality at AI Speed

Quality gates change, not quality standards:

- **Layer 1 — Deterministic (seconds):** Lint, build, type-check, security scan, diff scope verification. Automated, no human needed. PASS required to proceed.  
- **Layer 2 — LLM Judgment (minutes):** Code quality, framework idioms, intent alignment, domain correctness. AI evaluator with structured rubric. PASS required to proceed.  
- **Layer 3 — Human Taste (hours):** Does this feel right? Is this the right UX decision? Does this match our clinical domain awareness? Human judgment on questions AI can't answer.  
- **Layer 4 — Strategic Benchmark (periodic):** Are we building toward our vision? Are we competitive with Harvey-class platforms? Human \+ AI evaluation at milestone boundaries.

Layers 1-2 handle 80% of quality evaluation instantly. Humans focus their limited attention on the 20% that requires taste and strategic judgment. Total quality is the same or higher; total cycle time drops by 70-80%.

---

## Part 3: Onboarding the Organization

### Where Emtelligent Is Today

| Dimension | Current Stage | Era | Evidence |
| :---- | :---- | :---- | :---- |
| Strategy | **2 (Opportunistic)** | Tool | AI tools are in some individual toolbelts; not in the operating plan. D-112 flags insufficient committed resources. |
| Culture | **2-3 (Opportunistic/Assisted)** | Tool/Workflow | Product team is experimenting with AI-native workflows. Broader org hasn't adopted. No org-wide expectation. |
| Process | **2 (Opportunistic)** | Tool | Traditional decision cadence, resource allocation, and review cycles. FRACTAL exists but is team-local. |
| Outcomes | **2 (Opportunistic)** | Tool | No AI-native metrics. Velocity gains are anecdotal, not measured or reported. |

**Overall: Stage 2-3** — with a pocket of Stage 3-4 in the product/dev team, operating inside a Stage 2 organization. Firmly in Era 1 (AI as Tool) at the org level, with one team attempting Era 2 (AI as Workflow).

### The Path Forward

#### Phase A: Make the Commitment Decision (Week 1-2)

Before any tactical changes, the org needs to face the commitment threshold. This is an exec-level decision (CD-level, like CD-01 through CD-08 in the Initiative Framework).

**Proposed Critical Decision:**

| ID | Decision | Options | Impact if Deferred |
| :---- | :---- | :---- | :---- |
| CD-09 | **AI-native operating model: commit or continue traditional?** | A) Commit: AI-native is how Emtelligent builds product. Provision tools org-wide, redesign processes, change metrics. B) Continue traditional: AI tools available but optional. Traditional agile processes remain primary. | If deferred, the product team continues to operate at Era 3 speed inside Era 1 org processes, creating the D-112 friction that threatens the Jul 7 timeline. |

**What "commit" means concretely:**

1. Every engineer and PM gets provisioned with an AI coding environment (Claude Code or equivalent)  
2. Sprint ceremonies are replaced with continuous planning/shipping  
3. Code review is AI-evaluated first, human-reviewed for taste  
4. Documentation is AI-generated as part of the build process  
5. Success is measured in cycle time (days to ship) not story points

#### Phase B: Equip and Enable (Week 2-4)

1. **Tooling provisioning** — AI coding environments for all engineers, shared agent configurations, CLAUDE.md as a starting template for all repos  
2. **Process redesign** — Replace sprint planning with continuous intent → execution cycles, replace PR review with layered evaluation, replace Jira stories with outcome-based work items  
3. **Skills development** — Prompt engineering as core competency, agent orchestration training, evaluation skills (how to review AI-produced outputs efficiently)

#### Phase C: Measure and Iterate (Ongoing)

| Metric | What It Measures | Target (Stage 5\) |
| :---- | :---- | :---- |
| **Cycle time** | Days from intent to production | \<5 days for standard features |
| **AI leverage ratio** | AI-produced vs. human-written code in production | \>70% AI-produced |
| **Evaluation pass rate** | % of AI outputs passing Layer 1-2 on first attempt | \>80% |
| **Context quality** | Can a new AI agent produce aligned output from the codebase alone? | Yes, with CLAUDE.md \+ .SPECS/ |
| **Human focus ratio** | % of human time on judgment/taste vs. mechanical work | \>60% judgment |

### Common Objections and Responses

**"AI code quality isn't good enough for production"** Quality is a function of context, evaluation, and iteration — not of whether a human or AI wrote the first draft. The question isn't "is AI code good enough?" but "is your evaluation good enough?"

**"We can't trust AI with healthcare/clinical code"** We build clinical AI products. If we don't trust AI in our own development process, why should customers trust our AI in their clinical workflows? The key is provenance and auditability — the same principles we sell.

**"This will reduce headcount"** AI-native doesn't mean fewer people. It means the same people produce 5-10x more output. The Cerebro launch timeline (Jul 7\) is only possible with AI-native velocity. With traditional agile, it would be a Q4 2026 or Q1 2027 deliverable.

**"We need to learn gradually"** Gradual adoption at the individual level (Stage 1→2→3→4) is natural. But the commitment threshold is organizational, not individual. You can't "gradually" change decision cadence, quality gates, and team structure.

**"What about our non-technical staff?"** AI-native isn't just for engineering. Product management, legal review, GTM planning, support operations — every function has AI-native workflows. The `/initiative-interview` skill is an example: structured AI-assisted decision-making that non-technical stakeholders can use.

---

## Part 4: The Innovation vs. FOMO Diagnostic

Use this to assess whether AI adoption is innovation-driven or FOMO-driven. This isn't a judgment — it's a calibration tool. FOMO-driven adoption can transition to innovation-driven, but only if the org recognizes the difference.

| Signal | Innovation-Driven | FOMO-Driven |
| :---- | :---- | :---- |
| **Primary question** | "What should we stop doing?" | "What AI tools should we buy?" |
| **Success metric** | Outcomes delivered faster | "We use AI" in the annual report |
| **Process change** | Workflows redesigned around AI capabilities | AI bolted onto existing workflows |
| **Failure response** | "What context did the AI need that we didn't provide?" | "See, AI isn't ready yet" |
| **Investment pattern** | Tools \+ training \+ process redesign | Tool licenses only |
| **Cultural indicator** | "How did you solve that?" (genuine curiosity) | "You should be using AI for that" (guilt) |
| **Leadership posture** | "Here's how I use AI in my own work" | "The team should be using AI more" |

**The litmus test:** Does leadership use AI in their own daily work (email drafting, meeting prep, decision analysis), or do they only expect the engineering team to use it?

---

## Part 5: Assessment Tools

### Tool A: Workshop Rubric (5-minute team exercise)

Rate each statement from 1 (strongly disagree) to 5 (strongly agree).

1. AI strategy is explicit and tied to business priorities.  
2. Teams know which work should be AI-assisted by default.  
3. Approved tools and data boundaries are clear.  
4. Reusable workflows exist beyond individual prompting.  
5. Human validation rules are defined by task risk.  
6. AI adoption is measured by outcome, not usage volume.  
7. Roles and hiring are evolving to fit human-AI work.  
8. Internal knowledge is structured for AI retrieval and reuse.  
9. Managers are redesigning workflows, not just encouraging experimentation.  
10. AI systems or agents own repeatable sub-workflows with oversight.

**Interpretation:**

| Score | Stage | Era |
| :---- | :---- | :---- |
| 10–15 | Resistant / Opportunistic | AI as Tool |
| 16–25 | Assisted | AI as Workflow (early) |
| 26–35 | Systematized | AI as Workflow (mature) |
| 36–42 | AI-First | AI as Operating Model (early) |
| 43–50 | AI-Native | AI as Operating Model (mature) |

### Tool B: 7-Component Traffic Light Rubric (deeper assessment)

Score each component as 🔴 (Traditional), 🟡 (Transitioning), or 🟢 (AI-Native). Full details in companion doc `L1-08-ai-native-team-operations-research.md`.

| \# | Component | 🔴 Traditional | 🟡 Transitioning | 🟢 AI-Native |
| :---- | :---- | :---- | :---- | :---- |
| 1 | **Team Composition** | Fixed roles, 7+ people | Blurring roles, 5-8 people | Orchestrators \+ agents, 2-4 humans |
| 2 | **Dev Environment** | IDE \+ basic extensions | IDE \+ Copilot | AI-first: Claude Code / Cursor \+ agents |
| 3 | **Task Management** | Jira, 2-week sprints | Shorter sprints, AI-assisted | Continuous: intent → parallel workstreams |
| 4 | **Communication** | Meeting-heavy, sync-first | Reduced meetings, some async | Async-first, AI-generated updates |
| 5 | **Context Engineering** | No AI context files | Basic .cursorrules/prompts | Hierarchical: CLAUDE.md \+ .SPECS/ \+ agents |
| 6 | **Quality & Review** | Human PR review (days) | AI-assisted review | Layered evaluation (seconds → hours) |
| 7 | **Shipping Cadence** | 2-4 week sprints | 1-week sprints | Ship in 1-5 days |

**Emtelligent Cerebro team (current assessment):**

| \# | Component | Score | Evidence |
| :---- | :---- | :---- | :---- |
| 1 | Team Composition | 🟡 | 3 humans (KD, PD, BA), blurring roles, some agent use |
| 2 | Dev Environment | 🟢 | Claude Code, FRACTAL, agent orchestration |
| 3 | Task Management | 🟡 | Initiative Framework is AI-assisted but not continuous flow |
| 4 | Communication | 🔴 | Decision cadence is meeting/email-heavy (D-112) |
| 5 | Context Engineering | 🟢 | CLAUDE.md, .SPECS/, FRACTAL workstream PRDs |
| 6 | Quality & Review | 🟡 | Evaluation templates exist but not consistently applied |
| 7 | Shipping Cadence | 🟡 | Faster than traditional but constrained by org processes |

**Pattern:** 🟢 on tools and context (2, 5), 🟡 on team and process (1, 3, 6, 7), 🔴 on communication (4). This confirms the framework assessment: a Stage 3 team with Stage 4+ infrastructure, constrained by Stage 2 organizational processes.

---

## Appendix A: Mapping to NN/g UX Maturity Model

| NN/g UX Maturity | AI-Native Maturity | Era | Key Parallel |
| :---- | :---- | :---- | :---- |
| Stage 1: Absent | Stage 1: Resistant | Tool | Capability is ignored or treated with suspicion |
| Stage 2: Limited | Stage 2: Opportunistic | Tool | Individual practitioners, no org support |
| Stage 3: Emergent | Stage 3: Assisted | Workflow | Team-level adoption, uneven, not standardized |
| Stage 4: Structured | Stage 4: Systematized | Workflow | Org-wide, governed, measured |
| — | ⚡ Commitment Threshold | — | No NN/g parallel — UX maturity is always gradual |
| Stage 5: Integrated | Stage 5: AI-First | Operating Model | Strategic capability, roles redesigned |
| Stage 6: User-Driven | Stage 6: AI-Native | Operating Model | Capability drives strategy and market position |

---

## Appendix B: Emtelligent-Specific Examples

### Current AI-Native Infrastructure (Stage 3-4 pocket)

| Asset | Purpose | Stage Indicator |
| :---- | :---- | :---- |
| `CLAUDE.md` | Knowledge-encoded codebase context for AI agents | Stage 4 |
| `AGENTS.md` | Agent role definitions and orchestration patterns | Stage 4 |
| `.SPECS/` directory | Structured specs that AI agents consume for context | Stage 4 |
| FRACTAL orchestration | Multi-tier agent system (Architect → Feature Lead → Sub-agent) | Stage 5 |
| Evaluation templates | Layered quality gates (deterministic → LLM judgment → human taste) | Stage 5 |
| `/initiative-interview` skill | AI-assisted stakeholder decision-making | Stage 4 |
| CTO Architect agent | Strategic planning and task decomposition via AI | Stage 5 |

### What Moving to Org-Wide Stage 5 Would Unlock

| Current Reality (Stage 2-3 org) | Stage 5 Reality |
| :---- | :---- |
| CD-05 auth decision in discovery for 3+ weeks | Decisions AI-prepared and human-approved in 2-3 days |
| D-112 flags insufficient decision velocity | AI surfaces conflicts, prepares options — humans decide |
| 11 operating layers with 105+ open questions | AI agents process and cross-reference all layers simultaneously |
| BA capacity constraint forces timeline extension | AI-native development reduces dependency on individual capacity |
| Traditional code review adds days to each feature | Layered evaluation provides instant feedback; humans review taste only |

---

## Next Steps

1. **Present this framework** to the feature team and exec leadership  
2. **Run the workshop rubric** (Tool A) with each team member and stakeholder  
3. **Conduct the FOMO diagnostic** (Part 4\) with leadership  
4. **Propose CD-09** as a Critical Decision in the Initiative Framework  
5. **Pilot Stage 5 processes** on the Cerebro feature team as proof-of-concept  
6. **Measure and report** AI-native metrics (Part 3, Phase C) starting with the next feature delivery

---

## Sources and References

### Maturity Model Foundations

- Nielsen Norman Group. [The UX Maturity Model](https://www.nngroup.com/articles/ux-maturity-model/)  
- Nielsen Norman Group. [UX Maturity: A Living System](https://www.nngroup.com/articles/ux-maturity-living-system/)

### Industry Research

- McKinsey & Company. [The State of AI](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)  
- McKinsey & Company. [Superagency in the Workplace](https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work)  
- Microsoft WorkLab. [2025: The Year the Frontier Firm Is Born](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born)  
- Boston Consulting Group. [AI Is Outpacing Your Workforce Strategy](https://www.bcg.com/publications/2025/ai-is-outpacing-your-workforce-strategy-are-you-ready)

### AI Maturity Frameworks

- [Sema4.ai AI Maturity Model 2026](https://sema4.ai/blog/ai-maturity-model-2026/)  
- [MITRE AI Maturity Model](https://aimaturitymodel.mitre.org/)  
- [CMU SEI \+ Accenture AI Adoption Maturity Model](https://www.sei.cmu.edu/news/sei-and-accenture-partner-to-develop-ai-adoption-maturity-model/)

### Internal Context

- Emtelligent Self-Serve Initiative Framework (`00-Initiative-Framework.md`)  
- Emtelligent Discovery Log (`01-Discovery-Log.md`) — D-112 organizational readiness risk  
- Companion research doc: `L1-08-ai-native-team-operations-research.md`

