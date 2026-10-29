// node scripts/checks.mjs <url> : horizontal overflow at 4 widths + reduced-motion hero shot + console errors
import { chromium } from "playwright";
const url = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();
for (const w of [375, 768, 1024, 1440]) {
  const page = await browser.newPage({ viewport: { width: w, height: 800 } });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: "networkidle" });
  const over = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  console.log(w, over.sw > over.cw ? `OVERFLOW ${over.sw}>${over.cw}` : "no h-scroll", errors.length ? errors.slice(0, 3) : "no console errors");
  await page.close();
}
for (const w of [375, 1440]) {
  const page = await browser.newPage({ viewport: { width: w, height: w === 375 ? 667 : 900 }, reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `.doable/review/reduced-${w}-hero.png` });
  await page.evaluate(() => document.querySelector("[data-recipe='marquee']").scrollIntoView());
  await page.waitForTimeout(400);
  await page.screenshot({ path: `.doable/review/reduced-${w}-testimonials.png` });
  await page.close();
}
await browser.close();
