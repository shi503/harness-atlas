---
status: DRAFT
title: "Policies — provider access, and the one inverted precedence"
tier: reference
project: harness-atlas
source: "https://opencode.ai/docs/policies · https://opencode.ai/docs/config#policies · https://opencode.ai/config.json"
version_at_capture: "v1.18.29"
source_verified: "2026-09-08"
---

# Policies — provider access, and the one inverted precedence

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `opencode.ai/docs` at **v1.18.29**, **2026-09-08**.

> *"Policies are separate from permissions. Permissions control what tools can do during a session,
> while policies control whether OpenCode may use a resource such as an LLM provider."*

The two systems share a grammar — wildcards, last-match-wins — and share nothing else. A policy is
evaluated before a model is available for selection, not when a tool is called. The feature *"is
experimental and is configured with the `experimental.policies` array in `opencode.json`."*

---

## 1. A statement

Three fields, all required:

| Field | Value |
|---|---|
| `effect` | *"Either `"allow"` or `"deny"`"* |
| `action` | *"The operation being controlled"* |
| `resource` | *"The resource ID or wildcard pattern the statement applies to"* |

```json
{ "experimental": { "policies": [
  { "effect": "deny", "action": "provider.use", "resource": "openai" }
] } }
```

*"A provider denied by policy is not available for model selection or model use, even if it has
credentials or is otherwise configured correctly."*

---

## 2. One action exists

| Action | Resource | Description, verbatim |
|---|---|---|
| `provider.use` | *"Provider ID, such as `openai`"* | *"Allow or deny use of an LLM provider."* |

*"OpenCode currently supports one policy action… More policy actions may be added in the future."*

---

## 3. Matching and order

`resource` takes the same wildcard grammar as a permission pattern — `*` for zero or more characters,
`?` for one — so `"company-*"` *"denies providers such as `company-us` and `company-eu`."*

*"When multiple statements match, the last matching statement wins. Put broad rules first, then more
specific exceptions after them."*

*"If no policy matches a provider, provider use is allowed by default."* An allowlist is therefore
written as a deny-all followed by the exceptions:

```json
{ "experimental": { "policies": [
  { "effect": "deny",  "action": "provider.use", "resource": "*" },
  { "effect": "allow", "action": "provider.use", "resource": "anthropic" }
] } }
```

---

## 4. The inversion

> *"Policies may be set in both your global config and project config. If policies from both
> locations match the same provider, your global policy takes priority over the project policy. This
> prevents a repository from re-enabling a provider that you deny globally."*

**This is the opposite direction to every other key in the chain.** For `opencode.json` generally, a
project config *"has the highest precedence among standard config files — it overrides both global
and remote configs."* For `experimental.policies`, global wins. The stated reason is in the sentence
itself: a checked-in repository config is not trusted to widen provider access.

---

## 5. What policies replace

> *"Use policies instead of the older `disabled_providers` and `enabled_providers` settings when
> controlling provider access."*

Both older keys remain in the published schema and keep their own section on `/docs/config/`, with
their own precedence rule: *"The `disabled_providers` takes priority over `enabled_providers`… If a
provider appears in both, the `disabled_providers` takes priority for backwards compatibility."* A
configuration can therefore express provider access three ways at once, and no page states how the
policy array and the two lists resolve against each other — checked `/docs/policies/`,
`/docs/config/` and `/docs/providers/`.

The documented translations:

| Older form | Policy form |
|---|---|
| `disabled_providers: ["openai"]` | one `deny` statement per provider |
| `enabled_providers: ["anthropic"]` | `deny` on `*`, then `allow` per provider |

---

## 6. The organisational path to the same outcome

`/docs/enterprise/` describes the same end state reached by configuration rather than by policy: a
*"single central config"* that integrates with an SSO provider and *"ensures all users access only
your internal AI gateway"*, where *"You can also disable all other AI providers, ensuring all
requests go through your organization's approved infrastructure."* The mechanics of getting that
config onto a machine are the managed-settings and MDM rungs in
[`01`](./01-config-and-rules.md) §2.
