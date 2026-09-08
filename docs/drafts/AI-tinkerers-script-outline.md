AI Tinkerers Script \- Mapping the changing shape of Agent Harnesses. 

Hey, my name is Kevin Deng.  I’ve been working with AI building products for the past 2 years both as a startup founder and then for the past year in an applied AI role helping to use AI to build and ship enterprise SaaS platform products.  Today I just wanted to share a side project that I’ve built that uses Claude Code to analyze and compare different agent harnesses and workflows. 

Why this exists

So why did I build this? Back in March I was a contractor and my main tool that I used was Cursor.  I loved that it allowed me to use different models and I’d built a good workflow by using AI to follow a spec and test driven development process.  

Then in April, I accepted a full-time position and the full-time obligations and responsibilities.  The way I had to work had to change as I was restricted to the corporate VM, no Claude Desktop or AI IDEs, just VSCode and a Claude API key.  

As the world moved into context engineering, building loops, and experimenting with new AI subscriptions that our team couldn’t get Ops to approve, I realized I had to start building my own tools.  After I built a workflow for orchestrating agents and learning from OpenClaw I was able to ship a feature.  Then I shared my repo with my team and realized that what we were missing was shared context so I built a decision ledger.  Next thing I know the stack I had built the industry was calling it a harness. 

Fast forward to today, for the past month I’ve been trying to compare what I’d built and realized I had a very hard time trying to describe my workflow.  As AI developers, we have a unique challenge where the way we work with agents is vastly different based on what we’re building and how we ship code.  If working with engineers has taught me anything, we are very opinionated about what good code looks like and it isn’t productive to tell someone how to code. That being said, for individuals it’s fine to work the way you want, but teams need structure, shared understanding, and frameworks. 

![][image1]  
[Jeff Patton & Luke Barret \- I'm glad we all agree](https://jpattonassociates.com/glad-we-all-agree-2/) & [User Story Mapping](https://jpattonassociates.com/story-mapping-quick-ref/)

In the age of AI convenience, it’s hard to advocate for alignment when nobody reads.  One of my favorite graphics encapsulates this and why it’s important to at least nail down the shape of what your team is building before AI completes and ships a shape you didn’t expect. 

What this repo is: 

* This repo is my attempt to build a map and document the shape of what your team harness looks like so we have an easy tool to see what’s similar and what’s different about what our workflows look like.   
* You’ll see a profile and teardowns for each harness and a mental model of their workflows.   
* Stat sheets, feature comparisons, and diagrams to track trends. 

# What I learned (and mostly not from the AI): 

* Don’t assume your team’s goal is AI-native; the best framework for your team is mapped environment that lets users and agents get the job done.   
  * Refute the bitter lesson; not about what is better but trying to establish and answer how teams can build 

![][image2]  
Dex Horothy \- HumanLayer 12-factor-agents ([https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-08-own-your-control-flow.md](https://github.com/humanlayer/12-factor-agents/blob/main/content/factor-08-own-your-control-flow.md))

* Fundamentally; we are trying to answer “How do we work?”

![][image3]  
Harness Engineering is not Enough: Why Software Factories Fail — Dex Horthy, HumanLayer (https://youtu.be/Ib5GBkD555M?si=6m8aScOdVPZf50Sc)

* 4 Layers that answer “How do we Work”   
  * Foundation \- The Substrate and what models and frameworks you run on  
    * What is configured \- Harness System Stacks, Loops, Capabilities, defining the Work Environment.   
    * What accumulates \- Codebase as a platform, Knowledge & Context  
    * What RUNS \- How does work get done? Surfaces, Team (Agents and Users), What evaluates and says what good looks like?   
  * Harness \= SDLC. Similar to agile and how it’s ranged from lean to SaFE 6.0 the complexity of your harness scales as you grow and migrate towards mature enterprise platforms.   
* Harnesses and loop engineering mostly have the same shape: 

![][image4]  
![][image5]

* Trends:   
  * Everybody has agreed on these core features:   
    * Task Decomposition & Context assembly  
    * Skills / Plugins  
    * Individual Memory  
    * Steering \- HITL  
    * Observability  
  * Multiplayer and Context for teams is the next frontier  
    * Team knowledge, secret brokering, decision ledgers, cost optimization  
  * Surfaces \- making your harness and agents accessible is a differentiator. AI tools are trending towards convenience, adapters and gateways make switching costs lower.   
  * Most harnesses don’t make deterministic validation by default.    
    * Routing \- handle it deterministically  
    * TDD \- just prompt it, the AI will handle the rest  
  * Nobody ships the standards and evals  
* My hot takes:  
  * Work Environment \- If agents work the entire environment, you need to map the entire environment.   
    * Company turns into a mono-repo or virtual mono-repo  
  * “Rituals” like a meetings, standups, or other agile practices don’t have agents present.   
    * Turns into manual maintenance until they are part of the team.   
  * Ecosystems lead to longevity  
    * Marketplaces and network effects are the next era  
    * Harnesses nobody uses 

Call to action: 

* A place for feedback: What did I get right? What did I get wrong?   
  * Would we benefit from tools that can help teams what we’re building and where we’re going? 

[image1]: ../../assets/img/user-story-mapping_jeff-patton.png

[image2]: ../../assets/img/12-factor-08-own-your-control-flow.png

[image3]: ../../assets/img/dex-horothy-software-factory-circa-2022.png

[image4]: ../../assets/img/harness-loop-dark.png

[image5]: ../../assets/img/component-matrix.png
