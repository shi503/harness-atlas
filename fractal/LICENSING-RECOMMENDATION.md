---
title: "Licensing — the recommendation, ready to apply; the choice is KD's"
tier: fractal
status: DRAFT
provenance: AUTHORED
created: "2026-09-08"
owner: KD
---

# Licensing

**No `LICENSE` file was created.** A licence is a legal decision about quoted vendor material, and an
agent choosing one and committing it is the choice being made — a file saying *DRAFT* would be worse
than none, because it leaves the terms ambiguous rather than absent. This page carries the
recommendation and the text; applying it is three `cp`-shaped commands and one decision.

## The recommendation, and why

**`LICENSE` = CC-BY-4.0, for the prose corpus.**
The asset is an argument, and the delivery vehicle is a talk that deep-links into it. Attribution-
required reuse is exactly the right permission: people should be able to quote a component page in a
deck and be obliged to say where it came from. A code licence on a corpus of prose mis-signals what
the repository is — the first thing a reader infers from `MIT` is *this is software*.

**`LICENSE-CODE` = MIT, for `scripts/` and `skills/`.**
`skills/harness-teardown/SKILL.md` exists to be copied into other repositories and run. CC-BY on
executable content is known friction — attribution obligations on a file that gets vendored produce
exactly the ambiguity nobody wants to litigate. Two files, one line in the README saying which covers
what.

**`NOTICE` — the one not to skip.**
CC-BY does not launder quoted material. This corpus quotes vendor documentation heavily and
deliberately, under a stated discipline — *vendor's words only, verbatim, cited, dated* — and that
discipline **is** the defence. It should be written where someone looking for it would look, not left
implicit in a contributing guide.

Two things the NOTICE must cover explicitly:

1. **Quoted vendor documentation.** Named, cited, dated throughout; quoted for comparison and
   commentary; every claim attributable to its source.
2. **The redrawn diagrams.** `assets/projects/*.mmd` are derivative works of vendor originals —
   `content/loomwarp.md` states the standard for them: *"no node or edge not in the original."* A
   derivative work of someone else's diagram is the clearest licensing exposure in the repository and
   the least obvious.

## Draft `NOTICE`

```
harness-atlas
Copyright (c) 2026 the harness-atlas contributors

This work is licensed under CC-BY-4.0 (see LICENSE), except for the contents of
scripts/ and skills/, which are licensed under MIT (see LICENSE-CODE).

QUOTED MATERIAL
This corpus quotes documentation, source code and public statements from the
harnesses it describes. Quotations are used for comparison and commentary, are
reproduced verbatim, and are attributed with a source and a read date at the
point of use. No claim of ownership is made over quoted material; rights remain
with the respective authors.

DERIVED DIAGRAMS
Files under assets/projects/ include diagrams redrawn from vendor originals into
a common notation. Where a diagram is redrawn, the source, its version and the
read date are recorded alongside it, and the redrawing introduces no node or edge
absent from the original. These are derivative works; rights in the originals
remain with their authors.

CORRECTIONS
If you are the rights holder of quoted or redrawn material and want a citation
corrected or an item removed, open an issue and it will be handled.
```

## To apply

1. Fetch the CC-BY-4.0 text into `LICENSE` and the MIT text into `LICENSE-CODE`.
2. Save the block above as `NOTICE`.
3. One line in `README.md`: *"Prose under CC-BY-4.0; `scripts/` and `skills/` under MIT. See `NOTICE`
   for quoted and redrawn material."*
4. GitHub will show the licence in the sidebar once `LICENSE` exists.
