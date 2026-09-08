---
title: "RULING 2026-09-07 — OpenClaw's roles are permissions on a messaging gateway, not tenancy"
status: PERMANENT
owner: KD
created: "2026-09-07"
provenance: AUTHORED
---

# Ruling — permissions, not tenancy

**Decided** by KD on 2026-09-07, on a conflict reported by the OpenClaw feature-lead during the
Template v2 fan-out.

**The conflict.** `spectrums/00-README.md` cited **OpenClaw** as the corpus anchor for
`operator-scale −3`, quoting *"designed for a single operator."* The restructured profile read the
fuller source and scored OpenClaw **`+1`** on named team machinery: session owner and participant
roles, per-scope operator roles, and a gateway with bindings. R1 requires a real harness at each end of
an axis, cited — so if OpenClaw is `+1`, axis I's minus pole was **vacant**, and R1 says an axis with a
vacant pole *"is an aspiration, i.e. a grade."*

**KD's ruling, verbatim:** *"initially it's ranked more as an individual agent, and the gateway
messaging is permissions."*

**The effect.** Axis I and DX-1 re-scored **`+1` → `0`**. The reasoning is a two-sided bound worth
keeping: **a mechanism that knows a second person exists keeps OpenClaw off `−3`; what it knows is a
permission scope rather than a tenant, which keeps it off `+1`.**

**The standing consequence.** Named roles on a gateway are permissions until something in the system
models a *tenant* — a boundary that owns state. This is the test to apply the next time a harness
ships roles and is read as multi-tenant.

**Recorded at the time, and now due.** A team version of OpenClaw shipped after the 2026-09-02 read,
making it the corpus's strongest re-read candidate. The 2026-09-08 deep read confirmed the team
version is present: named operator roles with four closed policies, `users.setRole`, and an eighth
scope. **The scores above have not been revisited against it.**
