// Build-time tool: node --env-file=.env.local scripts/media/download.mjs <outDir> <id> [<id>...]
import fs from "node:fs";
const key = process.env.MAGNIFIC_API_KEY;
if (!key) throw new Error("MAGNIFIC_API_KEY is not set");
const [outDir, ...ids] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
for (const id of ids) {
  const res = await fetch(`https://api.magnific.com/v1/resources/${id}/download`, { headers: { "x-magnific-api-key": key } });
  const body = await res.text();
  if (!res.ok) { console.log(id, "FAILED", res.status, body.slice(0, 300)); continue; }
  const json = JSON.parse(body);
  const url = json.data?.url ?? json.data?.signed_url ?? json.url;
  console.log(id, "ok", Object.keys(json.data ?? json).join(","));
  if (!url) continue;
  const file = await fetch(url);
  fs.writeFileSync(`${outDir}/${id}.jpg`, Buffer.from(await file.arrayBuffer()));
}
