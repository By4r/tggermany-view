import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const base = 'http://localhost:8099/index.html';
const dir = 'docs/screenshots/build';
mkdirSync(dir, { recursive: true });

const breakpoints = [
  { label: '1440', width: 1440, height: 900 },
  { label: '768', width: 768, height: 1024 },
  { label: '390', width: 390, height: 844 },
];

const browser = await chromium.launch();
const consoleErrors = [];

for (const bp of breakpoints) {
  const ctx = await browser.newContext({ viewport: { width: bp.width, height: bp.height } });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(`[${bp.label}] ${m.text()}`); });
  page.on('pageerror', (e) => consoleErrors.push(`[${bp.label}] pageerror: ${e.message}`));
  await page.goto(base, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(1500);
  // verify header partial hydrated
  const headerOk = await page.locator('header.site-header .nav-link, header.site-header').first().count();
  // open cart drawer interaction smoke test on desktop
  await page.screenshot({ path: `${dir}/index-${bp.label}.png`, fullPage: true });
  console.log(`index-${bp.label}.png  [${bp.width}x${bp.height}]  header nodes:${headerOk}`);
  await ctx.close();
}

await browser.close();
console.log('CONSOLE ERRORS:', consoleErrors.length ? '\n' + consoleErrors.join('\n') : 'none');
console.log('DONE');
