#!/usr/bin/env node
// Adds N copies of the last child of a list to see whether the layout survives growth.
//   node stress.mjs <url> <selector-of-list-container> [--n 6] [--out .doable/stress]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const [url, selector] = args.filter((a) => !a.startsWith("--"));
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
if (!url || !selector) {
  console.error("usage: stress.mjs <url> <list-selector> [--n 6] [--out dir]");
  process.exit(2);
}
const n = Number(opt("n", 6));
const out = opt("out", ".doable/stress");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
let bad = 0;
for (const width of [375, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  const r = await page.evaluate(
    ({ selector, n }) => {
      const list = document.querySelector(selector);
      if (!list || !list.lastElementChild) return { error: `no element or children for ${selector}` };
      for (let i = 0; i < n; i++) list.appendChild(list.lastElementChild.cloneNode(true));
      list.scrollIntoView({ block: "center" });
      return {
        children: list.children.length,
        overflowX: document.documentElement.scrollWidth - innerWidth,
        listHeight: Math.round(list.getBoundingClientRect().height),
      };
    },
    { selector, n }
  );
  if (r.error) {
    console.error(r.error);
    process.exit(1);
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(out, `${width}.png`) });
  const ok = r.overflowX <= 1;
  if (!ok) bad++;
  console.log(`[${width}] children=${r.children} listHeight=${r.listHeight}px overflowX=${r.overflowX}px ${ok ? "ok" : "OVERFLOW"}`);
  await page.close();
}
await browser.close();
console.log(`Screenshots in ${out}. Look at them: a list that "grows" should be a carousel or a layout that holds N+${n}.`);
process.exit(bad ? 1 : 0);
