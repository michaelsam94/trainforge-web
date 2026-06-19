import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

const BUDGET_BYTES = 170 * 1024;
const root = process.cwd();
const manifestPath = join(root, ".next", "app-build-manifest.json");

function readGzipSize(filePath) {
  const buffer = readFileSync(filePath);
  return gzipSync(buffer).length;
}

function collectInitialChunks(manifest) {
  const pages = manifest.pages ?? {};
  const marketingChunks = pages["/(marketing)/page"] ?? pages["/page"] ?? [];
  const layoutChunks = pages["/layout"] ?? [];
  const unique = new Set([...layoutChunks, ...marketingChunks]);
  return [...unique];
}

try {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const chunks = collectInitialChunks(manifest);
  let total = 0;

  for (const chunk of chunks) {
    const chunkPath = join(root, ".next", chunk);
    total += readGzipSize(chunkPath);
  }

  const kb = (total / 1024).toFixed(1);
  console.log(`Marketing home initial JS (gzip): ${kb} kB (budget: 170 kB)`);

  if (total > BUDGET_BYTES) {
    console.error(`Bundle budget exceeded: ${kb} kB > 170 kB`);
    process.exit(1);
  }
} catch (error) {
  console.error("Run `npm run build` before checking the bundle budget.");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
