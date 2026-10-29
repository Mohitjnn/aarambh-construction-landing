// Build-time tool: node --env-file=.env.local scripts/media/preview.mjs <outDir> <id,id,...>
import fs from "node:fs";
const key = process.env.MAGNIFIC_API_KEY;
if (!key) throw new Error("MAGNIFIC_API_KEY is not set");
const [outDir, ids] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const params = new URLSearchParams({ "filters[ids]": ids, limit: "20" });
const res = await fetch(`https://api.magnific.com/v1/resources?${params}`, { headers: { "x-magnific-api-key": key } });
if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
const { data } = await res.json();
for (const r of data) {
  const img = await fetch(r.image.source.url.replace(/^http:/, "https:"));
  fs.writeFileSync(`${outDir}/${r.id}.jpg`, Buffer.from(await img.arrayBuffer()));
  console.log(r.id, r.image.source.size, r.title.slice(0, 70));
}
