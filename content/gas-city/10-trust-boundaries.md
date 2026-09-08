---
status: DRAFT
title: "Trust boundaries — what binds, and the four refusal lists"
tier: reference
project: harness-atlas
source: "gastownhall/gascity @ 042e965 · docs/reference/trust-boundaries.md · docs/reference/specs/service-protocol-v0.md · engdocs/architecture/invariants.md · docs/getting-started/dashboard.md"
version_at_capture: "main/edge 042e965 (v1.4.1 is the latest release, 2026-08-15)"
source_verified: "2026-09-08"
---

# Trust boundaries — what binds, and the four refusal lists

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `gastownhall/gascity` at **`042e965`**, **2026-09-08**.

`docs/reference/trust-boundaries.md` opens with the sentence the rest of the project's security
posture follows from:

> *"Gas City intentionally runs operator-configured commands. **Those commands are a feature, not a
> sandbox.** Treat city config, imported packs, exec provider scripts, and agent startup commands as
> trusted code with the same review expectations as shell scripts committed to the repository."*

That page is well organised and a reader should open it directly. What it does not do — and what
this document does — is collect the **four separate refusal lists** the project publishes across
four files, and say which of them bind mechanically.

---

## 1. The trust model — five input classes

| Input | Trust level | Rule |
|---|---|---|
| *"Maintainer-authored city config and local site config"* | *"Trusted operator code"* | *"May define shell commands and explicit env. Review before use."* |
| *"Imported packs and rig configs"* | *"Trusted dependency code"* | *"Pin/review packs before importing into a privileged city."* |
| *"Bead titles, descriptions, mail, formula vars, PR text, and API request fields"* | **"Untrusted data"** | *"Do not concatenate into shell commands. Pass as env, JSON, stdin, or argv."* |
| *"GitHub Actions `pull_request_target` payloads"* | *"Untrusted data in a privileged workflow"* | *"Do not checkout or execute contributor code. Use metadata-only operations."* |
| *"Ambient process environment"* | *"Untrusted for secret propagation"* | *"Orchestrator-side shell helpers strip inherited secret-looking env keys by default."* |

**The second row is the load-bearing one for a pack ecosystem**: an imported pack is *code*, not
data, and `docs/guides/configuring-an-agent.md` says the same thing again from the other side —
*"A pack-carried `[upstreams.<name>]` … is TRUSTED configuration — the same trust level as a pack's
`provider.command` — so only import packs you trust."*

**The third row is the prompt-injection boundary**, and it is stated as an authoring rule rather
than a mechanism: *"Do not interpolate bead content, PR text, mail, formula vars, branch names, or
other user-controlled values into `sh -c` commands."* A contributor-side audit of this exists at
`engdocs/contributors/prompt-injection-system-reminder-audit.md`, not opened at this read.

---

## 2. The execution surfaces

The page's second table is its most useful artifact: twelve surfaces, each with its command source,
actor, working directory, environment behaviour, and log behaviour. In condensed form —

| Surface | Command source | Working directory | Notable |
|---|---|---|---|
| `work_query` via `gc hook` and orchestrator probes | agent config | agent's canonical city or rig repo | *"Errors are diagnostic only"* |
| `scale_check` | agent config | same | *"Parse failures include command context"* |
| `on_boot` / `on_death` | agent **pool** config | city or rig repo | *"Hook failures are logged"* |
| Order `check` triggers | order config | order target scope | *"Failure reason records exit status, not command output"* |
| Order `exec` | order config | order target scope | *"Failure errors and output are **redacted** before logs/events"* |
| `gc sling` and `/sling` command runner | sling target config | city or rig repo | *"Returned command output is caller-visible. Do not route untrusted text into shell."* |
| Agent `command` | agent config | session work directory | *"Secrets may be passed only by intentional config"* |
| `pre_start` | agent config | session work directory | provider-specific runtime env |
| `session_setup`, `session_setup_script`, `session_live` | agent config | running session environment | *"remote providers run inside the target container or pod"* |
| `exec:` session provider | user script | provider-defined | *"Direct exec, not `sh -c`; start config is JSON on stdin"* |
| `exec:` beads, mail, and events providers | user script | provider-defined | *"request data is stdin/argv"* |
| Pack fetch/include, Git probes, Docker, Dolt, tmux, kubectl, `bd` helpers | Gas City code plus configured paths/URLs | command-specific | *"Direct exec with argv except provider setup scripts where documented"* |

**Every row above is a trusted-operator surface.** The one thing absent from the table is the
agent's own tool calls: whichever coding-agent CLI a `provider` names runs under **that CLI's**
permission model, and nothing on this page constrains it.

---

## 3. What actually binds

Four mechanisms are enforced by code rather than stated as an expectation. They are the answer to
"what does Gas City stop", and it is a short list by design.

**Secret stripping, by key-name pattern.** *"Orchestrator-side shell helpers remove inherited
environment variables whose keys look secret-bearing, including names containing `TOKEN`,
`PASSWORD`, `SECRET`, `PRIVATE_KEY`, `API_KEY`, `ACCESS_KEY`, `CREDENTIAL`, `OAUTH`, or
`AUTH_JSON`."* Its stated purpose: *"This prevents ambient CI or maintainer shell secrets from
reaching `work_query`, `scale_check`, hooks, order checks, order exec commands, and sling helpers by
accident."* Explicit values survive *"because they represent an operator decision"*, and
*"failure logs redact known secret values before writing order exec errors or events."*

**Credential file modes.** `gc` *"refuses to load a `credentials.toml` that is world-accessible or
group-writable"* — accepted modes `0600`, `0400`, and the Kubernetes `fsGroup` case `0440`.
[`06-pack.md`](./06-pack.md) §5.

**A hard error on an unbindable upstream field**, rather than a silent fallback —
[`02-agent.md`](./02-agent.md) §3.

**No silent shadowing of a runtime name.** *"Name collisions with builtin runtimes or other packs
are composition errors"* — [`08`](./08-runtimes-and-exec-providers.md) §3a.

And two defaults that narrow exposure without being enforcement:

- The dashboard binds loopback. *"The dashboard is served on the supervisor's bind address, which
  defaults to loopback (`127.0.0.1`). It is intended for local, single-operator use."*
  (`docs/getting-started/dashboard.md`)
- Webhook `visibility` is default-closed to `tenant` (`WebhookAllowPublic`, `WebhookVerify`,
  `WebhookJWTPolicy`, `WebhookRateLimitConfig` in `docs/reference/config.md`). A webhook is
  *"a city- or rig-scoped inbound HTTP receiver mounted under `/v0/city/{city}/hook/{name}`."*

---

## 4. The four refusal lists

Gas City publishes no single "what this is not" page. It publishes four scoped ones, in four files.

**1 · Sandboxing — `docs/reference/trust-boundaries.md`.** The whole page. *"Those commands are a
feature, not a sandbox."*

**2 · Tenancy — `docs/reference/specs/service-protocol-v0.md`** (*"Authoritative specification"*,
last verified 2026-07-15, contract `gascity.dev/service/v0`):

> *"`user.id` — a stable opaque account identifier. **There is no org or tenant field.** An account
> is addressed only by opaque `id`/`handle`; the wire carries no tenancy identity."*
>
> *"The CLI MUST NOT contain — and this protocol MUST NOT define wire fields for —
> trial/credit/billing/plan/quota/subscription semantics, provisioning steps, expiry math, or
> org/tenant identity. If a product wants to show '$5 of trial credit,' that sentence arrives as a
> `message`. This keeps the client generic across arbitrary servers and free of vendor-specific
> logic. A conforming server MAY reject a client that attempts to negotiate such semantics."*

**3 · Wire typing — `engdocs/architecture/invariants.md` §7 "What is out of scope":**

> *"**`/svc/*` proxy.** See §3.9. · **Outbound HTTP** … Not typed API endpoints; we consume someone
> else's contract. · **Storage-layer (de)serialization** (SQL BLOBs, JSONL log files, external-tool
> auth files). Not on our wire. · **Generated Go client as a Go SDK surface.** Stays in `internal/`
> until external consumers show up. · **WebSocket transport.** HTTP + SSE only."*

**4 · The SDK layer — `engdocs/contributors/primitive-test.md`.** Not a refusal list in form, but
in effect: a capability that fails any of the three conditions *"belongs in the consumer layer"*,
and the page names eight worked exclusions. [`01`](./01-the-six-primitives-and-the-admission-test.md) §2.

Each is scoped to its own layer, and none of them is about the same thing as another. **Checked
for a general one**: `README.md`, `docs/index.mdx`, `docs/getting-started/faq.md`,
`docs/getting-started/how-gas-city-works.md`, `SECURITY.md`, and the `docs.json` navigation —
no page states what Gas City as a whole declines to be.

---

## 5. Rules the project asks authors to follow

The page closes with five, and they are directed at whoever writes a pack, an order, or a workflow —
not at the runtime:

> *"Do not put secrets directly in command strings. Use env variables or provider credential files ·
> Do not interpolate bead content, PR text, mail, formula vars, branch names, or other
> user-controlled values into `sh -c` commands · When showing a command for a human to copy, build
> it from argv and quote each argument with Gas City's shell quoting helper · Keep
> `pull_request_target` workflows metadata-only. They may label or comment but must not checkout or
> run contributor code with privileged tokens · Prefer direct `exec.Command(..., args...)` style
> boundaries for new provider contracts. Use `sh -c` only for explicitly operator-authored shell
> snippets."*

Gas City's own supply chain is documented separately in `SECURITY.md` and `RELEASING.md` — releases
carry SHA-256 checksums, SBOMs and GitHub attestations, and `release-gates/` plus `repo-policy.py`
sit at the repository root as gates on its own delivery.
