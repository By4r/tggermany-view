import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const dir = 'docs/screenshots/ttec';
mkdirSync(dir, { recursive: true });

const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const browser = await chromium.launch();

async function shoot(url, name, bp, { full = true, clip = null } = {}) {
  const ctx = await browser.newContext({ viewport: { width: bp.w, height: bp.h }, userAgent: ua });
  const page = await ctx.newPage();
  let status = 'ok';
  try { await page.goto(url, { waitUntil: 'networkidle', timeout: 40000 }); }
  catch { try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); status = 'dom-fallback'; } catch (e) { status = 'FAIL ' + e.message; } }
  await page.waitForTimeout(3000);
  await page.evaluate(async () => {
    await new Promise((res) => { let y = 0; const s = () => { window.scrollBy(0, innerHeight); y += innerHeight; if (y < document.body.scrollHeight && y < 26000) setTimeout(s, 180); else { scrollTo(0, 0); setTimeout(res, 600); } }; s(); });
  });
  const opts = clip ? { path: `${dir}/${name}.png`, clip } : { path: `${dir}/${name}.png`, fullPage: full };
  await page.screenshot(opts);
  console.log(`${name}.png  [${bp.w}x${bp.h}]  ${status}`);
  await ctx.close();
}

// Homepage at 3 breakpoints
await shoot('https://ttec.com.tr', 'ttec-1440', { w: 1440, h: 900 });
await shoot('https://ttec.com.tr', 'ttec-768', { w: 768, h: 1024 });
await shoot('https://ttec.com.tr', 'ttec-390', { w: 390, h: 844 });

// A category page
await shoot('https://ttec.com.tr/category/1', 'ttec-category-1440', { w: 1440, h: 900 });
await shoot('https://ttec.com.tr/category/1', 'ttec-category-390', { w: 390, h: 844 });

// Product card / grid closeup (clip a region near the top of the homepage product area)
await shoot('https://ttec.com.tr', 'ttec-card-closeup', { w: 1440, h: 900 }, { clip: { x: 40, y: 760, width: 1360, height: 520 } });

await browser.close();
console.log('DONE');
