import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const targets = [
  { name: 'ttec', url: 'https://www.ttec.com.tr' },
  { name: 'tggermany', url: 'https://www.tggermany.com' },
];

const breakpoints = [
  { label: '1440', width: 1440, height: 900 },
  { label: '768', width: 768, height: 1024 },
  { label: '390', width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const t of targets) {
  const dir = `docs/screenshots/${t.name}`;
  mkdirSync(dir, { recursive: true });
  for (const bp of breakpoints) {
    const ctx = await browser.newContext({
      viewport: { width: bp.width, height: bp.height },
      deviceScaleFactor: 2,
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    });
    const page = await ctx.newPage();
    let status = 'ok';
    try {
      await page.goto(t.url, { waitUntil: 'networkidle', timeout: 45000 });
    } catch (e) {
      try {
        await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        status = 'domcontentloaded-fallback';
      } catch (e2) {
        status = 'FAILED: ' + e2.message;
      }
    }
    // settle: lazy content, animations
    await page.waitForTimeout(3500);
    // trigger lazy-load by scrolling
    await page.evaluate(async () => {
      await new Promise((res) => {
        let y = 0;
        const step = () => {
          window.scrollBy(0, window.innerHeight);
          y += window.innerHeight;
          if (y < document.body.scrollHeight && y < 30000) setTimeout(step, 200);
          else { window.scrollTo(0, 0); setTimeout(res, 600); }
        };
        step();
      });
    });
    const file = `${dir}/${t.name}-${bp.label}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(`${file}  [${bp.width}x${bp.height}]  ${status}`);
    await ctx.close();
  }
}

await browser.close();
console.log('DONE');
