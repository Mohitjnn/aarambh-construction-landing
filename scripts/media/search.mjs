// Build-time tool: node --env-file=.env.local scripts/media/search.mjs "<term>" [orientation] [limit]
const key = process.env.MAGNIFIC_API_KEY;
if (!key) throw new Error("MAGNIFIC_API_KEY is not set");
const [term, orientation = "landscape", limit = "8"] = process.argv.slice(2);
const params = new URLSearchParams({ term, limit, order: "relevance" });
params.set("filters[content_type][photo]", "1");
params.set("filters[ai-generated][excluded]", "1");
params.set(`filters[orientation][${orientation}]`, "1");
const res = await fetch(`https://api.magnific.com/v1/resources?${params}`, {
  headers: { "x-magnific-api-key": key, "Accept-Language": "en-US" },
});
if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
const { data } = await res.json();
for (const r of data) {
  console.log([r.id, r.licenses?.map((l) => l.type).join("/"), r.title, r.image?.source?.url].join(" | "));
}
