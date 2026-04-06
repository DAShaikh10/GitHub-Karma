import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, "..");

const assetGroups = ["emojis", "logos"];
const assetMap = {};

for (const group of assetGroups) {
  const dirPath = join(repoRoot, "public", group);
  const files = readdirSync(dirPath)
    .filter((name) => name.toLowerCase().endsWith(".png"))
    .sort((a, b) => a.localeCompare(b));

  for (const fileName of files) {
    const absolutePath = join(dirPath, fileName);
    const key = `/${group}/${fileName}`;
    const base64 = readFileSync(absolutePath).toString("base64");

    assetMap[key] = `data:image/png;base64,${base64}`;
  }
}

const outputFilePath = join(repoRoot, "src", "lib", "card", "asset-data-uri.ts");
const output = [
  "// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.",
  "// Run: bun run generate:asset-data-uri",
  "",
  `export const ASSET_DATA_URI: Record<string, string> = ${JSON.stringify(assetMap, null, 2)};`,
  "",
].join("\n");

writeFileSync(outputFilePath, output, "utf8");

console.log(`Generated ${Object.keys(assetMap).length} asset data URIs at ${outputFilePath}`);
