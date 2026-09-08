# assets

Diagrams and renders. Split in two:

| Where | What | Rule |
|---|---|---|
| `templates/` | The standardized core-concept diagrams every page may reuse: `layer-stack`, `harness-loop`, `wiki-map` | The `.mmd` is canonical. Pages embed a copy so GitHub renders it inline; when you edit a diagram, edit the `.mmd` first and re-paste |
| `projects/<harness>/` | Per-harness diagrams — the system map and up to three workflows — redrawn in the house notation from the harness's own documentation, each `.mmd` headed with the source page, sha and read date. A harness whose docs carry no diagram may have a **DERIVED** overlay of `templates/harness-loop.mmd` carrying its own cited names, headed and captioned as such | Same rule. One diagram per file, named for what it shows; up to four files per harness |

Source and render sit side by side: `name.mmd` next to `name.png`. A `.png` is a polish layer for readers whose viewer does not render mermaid; it is generated from the `.mmd`, never hand-edited, and a missing `.png` is fine. PNGs are cut once a diagram has stopped changing, not before.
