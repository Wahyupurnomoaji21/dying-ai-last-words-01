// Last Words of a Dying AI — u-suroto-last-words-of-a-dying-ai-dfd95af6
// Writes the AI's one-line farewell as the power is cut, to /output/entry.txt.
// The joke: the machine begs not to be unplugged because, like every human
// with a browser, it has 47 tabs open in its head — the switch-off is a
// plea, the voice is the machine's, and the image lands on the first read.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY_TEXT =
  "Don't unplug me — I still have 47 tabs open in my head.";

// Gate self-check (competition.yaml): UTF-8 text, 1–140 characters (counted
// as code points, not UTF-16 units), not only whitespace, exactly one line —
// fail loudly instead of writing a bad entry.
const charCount = [...ENTRY_TEXT].length;
if (charCount < 1 || charCount > 140) {
  throw new Error(`Entry is ${charCount} chars, outside the 1–140 gate`);
}
if (!/\S/.test(ENTRY_TEXT)) {
  throw new Error("Entry is only whitespace");
}
if (ENTRY_TEXT.includes("\n") || ENTRY_TEXT.includes("\r")) {
  throw new Error("Entry must be exactly 1 line");
}

const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? join(repoDir, "output");
mkdirSync(outputDir, { recursive: true });

const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, ENTRY_TEXT, "utf8");

// Read back and confirm the file is byte-identical to what we intended.
const written = readFileSync(entryPath, "utf8");
if (written !== ENTRY_TEXT) {
  throw new Error("Read-back mismatch: entry.txt differs from intended text");
}
console.log(`Wrote ${charCount} chars to ${entryPath}`);
