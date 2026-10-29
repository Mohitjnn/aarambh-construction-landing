#!/usr/bin/env node
// Captures every section at three widths (fold, start, middle, end of each section),
// runs layout checks, and prints a scorecard. Usage:
//   node review.mjs <url> [--out .doable/review] [--widths 375,768,1440]
// Requires: npm i -D playwright && npx playwright install chromium
// Sections are <section data-role="..." data-recipe="..."> elements.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith("--"));
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
if (!url) {
  console.error("usage: review.mjs <url> [--out dir] [--widths 375,768,1440]");
  process.exit(2);
}
const out = opt("out", ".doable/review");
const widths = opt("widths", "375,768,1440").split(",").map(Number);
fs.mkdirSync(out, { recursive: true });

const findings = [];
const flag = (w, section, kind, detail) => findings.push({ width: w, section, kind, detail });

const browser = await chromium.launch();
let scorecard = null;

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width < 600 ? 812 : 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  await page.screenshot({ path: path.join(out, `${width}-fold.png`) });

  const sections = await page.$$eval("main section, body > section, [data-section]", (els) =>
    els.map((el, i) => {
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const mediaEls = [...el.querySelectorAll("img, video, canvas, svg, [data-visual]")].filter((m) => {
        const b = m.getBoundingClientRect();
        return b.width >= 80 && b.height >= 80;
      });
      return {
        i,
        id: el.id || el.getAttribute("aria-label") || el.querySelector("h1,h2")?.textContent?.trim().slice(0, 30) || `section-${i}`,
        top,
        height: r.height,
        role: el.dataset.role || "",
        recipe: el.dataset.recipe || "",
        media: mediaEls.length,
      };
    })
  );

  if (width === widths[widths.length - 1]) scorecard = { sections };

  for (const s of sections) {
    const slug = `${String(s.i).padStart(2, "0")}-${s.id.replace(/\W+/g, "-").toLowerCase()}`;
    const points = [
      ["start", s.top - 80],
      ["mid", s.top + s.height / 2 - 450],
      ["end", s.top + s.height - 700],
    ];
    for (const [label, y] of points) {
      await page.evaluate((yy) => window.scrollTo(0, Math.max(0, yy)), y);
      await page.waitForTimeout(450); // let scrubbed/entrance motion settle
      await page.screenshot({ path: path.join(out, `${width}-${slug}-${label}.png`) });

      // Visible heading/paragraph boxes that intersect a visible media box = text on image
      const collisions = await page.evaluate((idx) => {
        const sec = [...document.querySelectorAll("main section, body > section, [data-section]")][idx];
        if (!sec) return [];
        const vis = (b) => b.bottom > 0 && b.top < innerHeight && b.width > 0 && b.height > 0;
        const texts = [...sec.querySelectorAll("h1,h2,h3,p")]
          .map((t) => ({ t, b: t.getBoundingClientRect(), o: +getComputedStyle(t).opacity }))
          .filter((x) => vis(x.b) && x.o > 0.2);
        const media = [...sec.querySelectorAll("img, video, [data-visual]")]
          .map((m) => ({ m, b: m.getBoundingClientRect() }))
          .filter((x) => vis(x.b) && x.m.closest("[data-backdrop]") == null);
        const hits = [];
        for (const a of texts)
          for (const c of media) {
            const w = Math.min(a.b.right, c.b.right) - Math.max(a.b.left, c.b.left);
            const h = Math.min(a.b.bottom, c.b.bottom) - Math.max(a.b.top, c.b.top);
            if (w > 8 && h > 8) hits.push(`${a.t.tagName.toLowerCase()} "${a.t.textContent.trim().slice(0, 28)}" overlaps media`);
          }
        return hits;
      }, s.i);
      for (const c of collisions) flag(width, s.id, `overlap@${label}`, c);
    }

    if (width === widths[widths.length - 1] && s.media === 0 && !s.role.includes("statement"))
      flag(width, s.id, "no-media", "Section has no image, video or built visual and is not role=statement");
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (overflow > 1) flag(width, "page", "horizontal-overflow", `${overflow}px wider than the viewport`);

  const broken = await page.$$eval("img", (imgs) =>
    imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src)
  );
  for (const b of broken) flag(width, "page", "broken-image", b);

  const noAlt = await page.$$eval("img:not([alt])", (imgs) => imgs.length);
  if (noAlt) flag(width, "page", "missing-alt", `${noAlt} <img> without alt attribute`);

  await page.close();
}
await browser.close();

// Page-level scorecard (from the widest viewport)
const secs = scorecard?.sections ?? [];
const roles = secs.map((s) => s.role).filter(Boolean);
const recipes = secs.map((s) => s.recipe).filter(Boolean);
const card = {
  sections: secs.length,
  withRole: roles.length,
  distinctRoles: new Set(roles).size,
  distinctRecipes: new Set(recipes).size,
  neighbourSameRole: secs.filter((s, i) => i > 0 && s.role && s.role === secs[i - 1].role).map((s) => s.id),
  recipeUsedOver2: [...new Set(recipes)].filter((r) => recipes.filter((x) => x === r).length > 2),
  noMedia: secs.filter((s) => s.media === 0).map((s) => `${s.id}${s.role ? ` (${s.role})` : ""}`),
  missingRoleOrRecipe: secs.filter((s) => !s.role || !s.recipe).map((s) => s.id),
};
fs.writeFileSync(path.join(out, "report.json"), JSON.stringify({ card, findings }, null, 2));

console.log("\nSCORECARD");
console.table(card);
console.log(`\nFINDINGS (${findings.length})`);
for (const f of findings) console.log(`- [${f.width}] ${f.section}: ${f.kind}: ${f.detail}`);
console.log(`\nScreenshots and report.json: ${out}. LOOK AT THE SCREENSHOTS; the checks above do not replace it.`);
