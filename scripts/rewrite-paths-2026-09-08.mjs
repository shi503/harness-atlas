#!/usr/bin/env node
/**
 * rewrite-paths-2026-09-08 — the mechanical half of W11 Phase 2.
 *
 * One-shot, NOT idempotent, kept as the provenance chain for the move — the same discipline as
 * scripts/rewrite-paths.mjs, which holds the exact old→new table for the 2026-09-02 spin-out and
 * was likewise run once. Read it as evidence of what was done, not as a tool to run again.
 *
 * What it does: carries the 33 component sources out of `spec/v1-framework/content/` into
 * `components/`, renaming each to its own `sublayer:` id, and fixes what the move mechanically
 * breaks.
 *
 *   1. RENAME   component-NN-<name>.md -> <id>-<name>.md, where <id> is read from the file's own
 *               `sublayer:` frontmatter. The numbering 01..33 was bottom-up ordering, never the ID;
 *               CROSSWALK §0's table and these 33 frontmatter fields agree, 33/33 (verified).
 *
 *   2. DEPTH    The files move from depth 3 to depth 1, so every relative link shortens:
 *                 ../../../comparisons/  -> ../comparisons/     (180)
 *                 ../../../archive/      -> ../archive/         (27)
 *                 ../../../maturity/     -> ../maturity/        (2)
 *                 ../CROSSWALK.md        -> ../spec/v1-framework/CROSSWALK.md    (53)
 *                 ../00-README.md        -> ../spec/v1-framework/00-README.md    (35)
 *                 ../12-horizon.md       -> ../spec/v1-framework/12-horizon.md   (6)
 *                 ../../EXPLAINER-PLAN.md-> ../spec/EXPLAINER-PLAN.md            (1)
 *
 *               NOTE the spec/ targets are re-pointed to their LIVE paths, not their eventual
 *               archive paths. `spec/` is archived in Phase 3, and that phase re-points every
 *               spec/ reference repo-wide in one pass. Doing it here would leave the gate red
 *               between two commits, which is how a corpus learns to ignore its own gate.
 *
 *   3. FRONTMATTER  Drops the four fields that are false or project-bound the moment the file is
 *               Tier 2, and adds the one CLAUDE.md mandates:
 *                 - project: loomwarp   dropped. CLAUDE.md: LoomWarp is "one peer column here …
 *                                       with no special status". A Tier-2 page is not its artifact.
 *                 - img: img/NNN-*.png  dropped. 33/33 named a PNG that has never existed;
 *                                       spec/v1-framework/img/ holds one SVG. A named mechanism
 *                                       that does not exist is a documentation defect (GAP-07).
 *                 - wave: W3            dropped. Build metadata from the spec's authoring pass.
 *                 - extends:            dropped. Pointed at CROSSWALK, which splits in Phase 3;
 *                                       the derivation is cited in the body instead.
 *                 + provenance: INHERITED   added. Mandated by CLAUDE.md and absent from every
 *                                       one of these files; the prose is carried, not re-authored.
 *                 ~ tier: spec -> tier: components
 *
 * What it deliberately does NOT do, because neither is mechanical:
 *   - The 33 `**ours**` rows. They carry real first-person findings ("recorded against ourselves",
 *     "our own architecture record"). A regex can change the label and the citation target; only a
 *     person or a careful pass can turn the prose third-person without losing the finding.
 *   - The ~35 citations of comparisons/systems/claude-code.md. Those links still RESOLVE (that file
 *     stays published), but each carries a prose section reference — "§*Two constraints that break
 *     control-plane designs*" — naming a heading in the SHORT profile that has no counterpart in
 *     the v2 one. Re-pointing the path without re-deriving the section would create a citation that
 *     resolves and lies, which is worse than one that is merely dated.
 *
 *   4. INBOUND  (--inbound, run after the move) Every reference anywhere in the repo to an old
 *               `component-NN-<name>.md` path is re-pointed to `components/<id>-<name>.md`,
 *               relativised from the referring file. 196 of them: 107 from the four spec/ files
 *               that indexed the component set, ~88 between the moved files themselves (they were
 *               siblings before the rename and still are, under new names), and 1 from an archived
 *               session note.
 *
 * Run: node scripts/rewrite-paths-2026-09-08.mjs [--dry]      # steps 1-3, the move
 *      node scripts/rewrite-paths-2026-09-08.mjs --inbound    # step 4, the re-pointing
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, relative, dirname } from "node:path";

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const SRC = join(REPO, "spec/v1-framework/content");
const DST = join(REPO, "components");
const DRY = process.argv.includes("--dry");

/** Ordered longest-prefix-first so ../../../ never matches inside ../ */
const PATHS = [
  ["../../../comparisons/", "../comparisons/"],
  ["../../../archive/", "../archive/"],
  ["../../../maturity/", "../maturity/"],
  ["../../EXPLAINER-PLAN.md", "../spec/EXPLAINER-PLAN.md"],
  ["../CROSSWALK.md", "../spec/v1-framework/CROSSWALK.md"],
  ["../00-README.md", "../spec/v1-framework/00-README.md"],
  ["../12-horizon.md", "../spec/v1-framework/12-horizon.md"],
];

const DROP = /^(project|img|wave|extends):/;

/* ---------------------------------------------------------- step 4: inbound */

if (process.argv.includes("--inbound")) {
  // The rename table, rebuilt from what now sits in components/ — the id prefix is the same
  // sublayer: value step 1 read, so the two derivations agree by construction.
  const map = new Map(); // old basename -> components/<new basename>
  const order = [
    "substrate", "environment", "adapters-and-middleware", "hooks", "enforcement", "control",
    "routing", "composition", "configuration", "standards", "capability", "capability-permissions",
    "individual-memory", "team-memory", "knowledge", "product", "infrastructure", "estate",
    "delivery", "workflow-tasks", "evals", "evidence", "observability", "efficiency", "learning",
    "rituals", "cadence", "anti-fragile-lifecycle", "raise-the-floor", "diagnose-the-bottleneck",
    "roster", "org", "surfaces",
  ];
  const now = readdirSync(DST).filter((f) => f.endsWith(".md"));
  order.forEach((slug, i) => {
    const nn = String(i + 1).padStart(2, "0");
    const hit = now.find((f) => f.replace(/^[0-9]+[a-z]-/, "") === `${slug}.md`);
    if (!hit) throw new Error(`no moved file for ${slug}`);
    map.set(`component-${nn}-${slug}.md`, join(DST, hit));
  });

  const SKIP = new Set(["node_modules", ".git", ".venv", "vendor", "repos", ".obsidian"]);
  const walk = (d, out = []) => {
    for (const e of readdirSync(d)) {
      if (SKIP.has(e)) continue;
      const p = join(d, e);
      statSync(p).isDirectory() ? walk(p, out) : p.endsWith(".md") && out.push(p);
    }
    return out;
  };

  let files = 0;
  let hits = 0;
  for (const f of walk(REPO)) {
    const before = readFileSync(f, "utf8");
    const after = before.replace(
      /\]\(([^)\s]*?)(component-\d{2}-[a-z-]+\.md)((?:#[^)\s]*)?)\)/g,
      (whole, prefix, base, frag) => {
        const target = map.get(base);
        if (!target) return whole;
        hits++;
        let rel = relative(dirname(f), target);
        if (!rel.startsWith(".")) rel = `./${rel}`;
        return `](${rel}${frag})`;
      }
    );
    if (after !== before) {
      files++;
      if (!DRY) writeFileSync(f, after);
    }
  }
  console.log(`${DRY ? "[dry] " : ""}re-pointed ${hits} reference(s) across ${files} file(s)`);
  process.exit(0);
}

if (!existsSync(DST)) mkdirSync(DST, { recursive: true });

const table = [];
for (const file of readdirSync(SRC).filter((f) => /^component-\d+-.*\.md$/.test(f))) {
  const abs = join(SRC, file);
  const text = readFileSync(abs, "utf8");

  const id = text.match(/^sublayer:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
  if (!id) throw new Error(`${file}: no sublayer: frontmatter — cannot derive its id`);
  const dstName = `${id}-${file.replace(/^component-\d+-/, "")}`;

  const lines = text.split("\n");
  const end = lines.indexOf("---", 1); // close of frontmatter
  if (lines[0] !== "---" || end < 0) throw new Error(`${file}: no frontmatter block`);

  const fm = lines
    .slice(1, end)
    .filter((l) => !DROP.test(l))
    .map((l) => (l.startsWith("tier:") ? "tier: components" : l));
  fm.splice(fm.findIndex((l) => l.startsWith("status:")) + 1, 0, "provenance: INHERITED");

  let body = lines.slice(end + 1).join("\n");
  for (const [from, to] of PATHS) body = body.split(from).join(to);

  const out = ["---", ...fm, "---", body].join("\n");

  table.push([`spec/v1-framework/content/${file}`, `components/${dstName}`]);
  if (DRY) continue;

  execFileSync("git", ["mv", abs, join(DST, dstName)], { cwd: REPO });
  writeFileSync(join(DST, dstName), out);
}

console.log(`${DRY ? "[dry] " : ""}${table.length} file(s)\n`);
for (const [from, to] of table) console.log(`  ${from}\n    -> ${to}`);
