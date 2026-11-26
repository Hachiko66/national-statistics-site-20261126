// Statistik Nusantara — entry program for make.fun.
// Copies app/ and screenshots/ from this repository into the output
// directory and writes /output/dossier.json with buildDossier from
// vendor/makefun-frontend.ts (the kit's library, unchanged).
// Node 22 standard library only; no network, no install step.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here);
const outDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : "/output";

function main() {
  // Start from a clean output directory so the two grader runs agree.
  // The grader bind-mounts the output directory (e.g. /output), so the
  // directory itself must NOT be removed — rmSync on a mount point
  // throws (a mount point cannot be removed). Keep the directory and
  // remove only its contents instead.
  mkdirSync(outDir, { recursive: true });
  for (const child of readdirSync(outDir)) {
    rmSync(join(outDir, child), { recursive: true, force: true });
  }

  // The site itself, and its screenshots, copied whole.
  cpSync(join(repoRoot, "app"), join(outDir, "app"), { recursive: true });
  const shots = join(repoRoot, "screenshots");
  if (existsSync(shots)) {
    cpSync(shots, join(outDir, "screenshots"), { recursive: true });
  }

  // The dossier is whatever buildDossier writes from those files.
  const dossier = buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  });
  writeFileSync(join(outDir, "dossier.json"), dossier);
}

main();
