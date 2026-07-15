// Dev helper: capture review screenshots of the running dev server.
// Usage: node scripts/screenshot.mjs [baseUrl]
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3002";
const chromePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await chromium.launch({ executablePath: chromePath });

async function shoot(name, url, { width = 1440, height = 950, fullPage = false, settle = 3500 } = {}) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
  // Walk the page so every whileInView reveal fires before we capture
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(settle);
  await page.screenshot({ path: `/tmp/pw-${name}.png`, fullPage });
  await page.close();
  console.log(`pw-${name}.png done`);
}

async function shootSection(name, selector, url = base) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 }).catch(() => {});
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `/tmp/pw-${name}.png` });
  await page.close();
  console.log(`pw-${name}.png done`);
}

await shoot("hero", base, { settle: 6000 });
for (const s of ["projects", "experience", "consulting", "about", "contact"]) {
  await shootSection(s, `#${s}`);
}
await shoot("detail", `${base}/projects/argus`, { fullPage: true });
await shoot("mobile", base, { width: 390, height: 844, settle: 6000 });

await browser.close();
