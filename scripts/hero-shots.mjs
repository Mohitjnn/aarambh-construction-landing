// node scripts/hero-shots.mjs <url> : screenshots the hero at several scroll fractions
import { chromium } from "playwright";
const url = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();
for (const [w, h] of [[1440, 900], [375, 667]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const dist = await page.evaluate(() => document.querySelector(".hero-shell").offsetHeight - innerHeight);
  for (const f of [0.1, 0.25, 0.4, 0.6, 0.8, 0.95]) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(dist * f));
    await page.waitForTimeout(500);
    await page.screenshot({ path: `.doable/review/hero-${w}-${String(Math.round(f * 100)).padStart(2, "0")}.png` });
  }
  await page.close();
}
await browser.close();
