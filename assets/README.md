# assets

Diagrams and renders. Split in two:

| Where | What | Rule |
|---|---|---|
| `templates/` | The standardized core-concept diagrams every page may reuse: `layer-stack`, `harness-loop`, `wiki-map` | The `.mmd` is canonical. Pages embed a copy so GitHub renders it inline; when you edit a diagram, edit the `.mmd` first and re-paste |
| `projects/<harness>/` | Per-harness diagrams, drawn only when the harness's own documentation carries one — redrawn in the house notation, with the source cited in the profile | Same rule. One diagram per file, named for what it shows |

Source and render sit side by side: `name.mmd` next to `name.png`. A `.png` is a polish layer for readers whose viewer does not render mermaid; it is generated from the `.mmd`, never hand-edited, and a missing `.png` is fine. PNGs are cut once a diagram has stopped changing, not before.
