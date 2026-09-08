---
status: DRAFT
title: "Sandboxing, permissions and approvals"
tier: reference
project: harness-atlas
source: "https://learn.chatgpt.com/docs/sandboxing · openai/codex codex-rs/network-proxy/README.md"
version_at_capture: "rust-v0.153.4"
source_verified: "2026-09-08"
---

# Sandboxing, permissions and approvals

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `learn.chatgpt.com/docs` and `openai/codex` at **rust-v0.153.4**, **2026-09-08**.

**Three controls, and the docs are explicit that they are distinct:**

> *"The sandbox defines technical boundaries. The approval policy decides when the agent must stop and
> ask before crossing them."*

Read that twice before configuring either. A permissive `approval_policy` does not widen the sandbox,
and a wide sandbox does not suppress approvals. They compose; neither subsumes the other.

---

## 1. The sandbox, per platform

Codex drives the operating system's own isolation rather than an in-process approximation:

| Platform | Mechanism |
|---|---|
| **macOS** | The built-in **Seatbelt** framework |
| **Linux / WSL2** | **`bubblewrap`** (`bwrap`), which must be installed. Falls back to a bundled helper, which requires **unprivileged user namespace support** |
| **Windows** | Native Windows sandbox under PowerShell; the Linux implementation under WSL2 |

The Linux fallback is the one to check in constrained environments: a host with user namespaces
disabled has neither `bwrap` nor the fallback, and the failure surfaces at execution rather than at
startup.

---

## 2. `sandbox_mode`

Three values:

| Value | Meaning |
|---|---|
| `read-only` | No writes |
| `workspace-write` | Writes within the workspace |
| `danger-full-access` | No sandbox |

`sandbox_workspace_write.writable_roots` extends what `workspace-write` counts as the workspace.

---

## 3. `approval_policy`

| Value | Behaviour |
|---|---|
| `untrusted` | Stop and ask, broadly |
| `on-request` | Ask when the model requests escalation |
| `never` | Do not ask |

**`approvals_reviewer` decides *who* answers**, which is the less-known half:

| Value | Reviewer |
|---|---|
| `user` | A human — the default |
| `auto_review` | An automated reviewer |

`approval_policy = "untrusted"` with `approvals_reviewer = "auto_review"` is an unattended
configuration that still evaluates every crossing, rather than one that skips the gate.

---

## 4. Named permission profiles

`[permissions.<name>]` declares a reusable bundle of filesystem, network and workspace rules;
`default_permissions` selects which applies. Network rules sit under the profile, for example
`[permissions.workspace.network]`, where per the network-proxy crate *"Hosts must match the allowlist
(unless denied)"* — an allowlist with a deny list layered over it, denial winning.

**Two mechanisms for one job, and both are current.** `sandbox_mode` is a single global setting;
`[permissions.<name>]` is a named profile selected by reference. They coexist in the same
configuration for the same purpose. Administrators constrain which profiles may be chosen through
`allowed_permission_profiles` — see [`10`](./10-administration-and-enterprise.md).

Whichever is chosen, [`07-execpolicy.md`](./07-execpolicy.md) evaluates the shell command itself
before it runs; the sandbox constrains what a permitted command can then reach.

---

## 5. What the docs do not say

**No explicit statement of the trust boundary was found.** Checked: the sandboxing page, the security
overview page, and the `network-proxy` crate README. The sandboxing page distinguishes the sandbox
from the approval policy but does not state whether either is intended to withstand a hostile
operator, a hostile prompt, or neither. **Recorded as an absence in what was read, not as a claim
that no such statement exists** — the security section of the hosted docs was reachable but returned
content for a different product on the read date, and was discarded rather than cited.
