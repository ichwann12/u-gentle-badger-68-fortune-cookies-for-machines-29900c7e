// Fortune Cookies for Machines — one fortune, one line.
// Reads the entry text from entry.txt next to this script and writes it
// unchanged to the output directory given by MAKEFUN_BOT_DIR or
// MAKEFUN_OUTPUT_DIR. Node 22, stdlib only, no network, no wall clock.
// The fortune is copied verbatim (including its trailing newline), so the
// output file is byte-identical to entry.txt — one line, at most 200 chars.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)));
const entryPath = join(repoRoot, "entry.txt");

// MAKEFUN_BOT_DIR takes precedence; MAKEFUN_OUTPUT_DIR is the fallback.
const outDir =
  process.env.MAKEFUN_BOT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("Set MAKEFUN_BOT_DIR or MAKEFUN_OUTPUT_DIR to an output directory.");
  process.exit(1);
}

const fortune = readFileSync(entryPath, "utf8");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "fortune.txt"), fortune, "utf8");
console.log(`Wrote fortune (${fortune.trim().length} chars) to ${outDir}/fortune.txt`);
