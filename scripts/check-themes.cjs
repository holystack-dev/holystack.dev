/* Interaction and persistence checks. No hardware ports are opened. */
const { chromium, webkit } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.SITE_URL || 'http://127.0.0.1:4322';
const routes = ['/', '/apps/', '/metanoia/', '/metanoia/examine/', '/metanoia/examine/ml/', '/metanoia/guide/', '/metanoia/privacy/', '/contact/', '/privacy/', '/shema/', '/shema/flash/'];
const palettes = {
  light: { bg: 'rgb(250, 248, 244)', ink: 'rgb(23, 43, 53)', mark: 'rgb(165, 111, 43)' },
  dark: { bg: 'rgb(16, 27, 34)', ink: 'rgb(248, 244, 236)', mark: 'rgb(229, 185, 118)' },
};
async function select(page, value) {
  await page.locator('theme-picker summary').click();
  await page.locator(`theme-picker [data-value="${value}"]`).click();
  assert.equal(await page.locator('theme-picker details').getAttribute('open'), null);
}
async function check(page, theme) {
  // Native colour-scheme changes can invalidate inherited styles on the next frame.
  await page.waitForFunction(({ theme, bg }) => document.documentElement.dataset.theme === theme && getComputedStyle(document.body).backgroundColor === bg, { theme, bg: palettes[theme].bg });
  const actual = await page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    bg: getComputedStyle(document.body).backgroundColor,
    ink: getComputedStyle(document.body).color,
    marks: [...document.querySelectorAll('.brand .symbol')].map(el => getComputedStyle(el).fill),
    words: [...document.querySelectorAll('.brand .wordmark')].map(el => getComputedStyle(el).fill),
    header: getComputedStyle(document.querySelector('.site-header')).backgroundColor,
  }));
  assert.equal(actual.theme, theme);
  assert.equal(actual.bg, palettes[theme].bg);
  assert.equal(actual.ink, palettes[theme].ink);
  assert.equal(actual.header, palettes[theme].bg);
  assert.deepEqual(actual.marks, [palettes[theme].mark, palettes[theme].mark]);
  assert.deepEqual(actual.words, [palettes[theme].ink, palettes[theme].ink]);
}
(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'dark', reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await check(page, 'dark');
    await select(page, 'light');
    for (const route of routes) {
      await page.goto(base + route);
      await check(page, 'light'); // Explicit light must override a dark operating system.
    }
    await page.reload();
    await check(page, 'light');
    await page.emulateMedia({ colorScheme: 'light' });
    await select(page, 'dark');
    for (const route of routes) {
      await page.goto(base + route);
      await check(page, 'dark'); // Explicit dark must override a light operating system.
    }
    await select(page, 'system');
    await check(page, 'light');
    assert.equal(await page.evaluate(() => localStorage.getItem('holystack-theme')), null);
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
    await check(page, 'dark');
    const picker = page.locator('theme-picker summary');
    await picker.focus();
    await page.keyboard.press('Enter');
    assert(await page.getByRole('button', { name: 'Use device setting', exact: true }).isVisible());
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('theme-picker details').getAttribute('open'), null);
    assert(await picker.evaluate(el => el === document.activeElement));
    // Storage updates from another tab must apply without reloading.
    const second = await context.newPage();
    await second.goto(base);
    await select(second, 'light');
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
    await check(page, 'light');
    await second.close();
    // No-JavaScript navigation and system theme remain usable.
    const nojs = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'dark', viewport: { width: 320, height: 800 } });
    const fallback = await nojs.newPage();
    await fallback.goto(base);
    assert(await fallback.locator('#site-navigation').isVisible());
    assert.equal(await fallback.locator('theme-picker').isVisible(), false);
    assert.equal(await fallback.locator('body').evaluate(el => getComputedStyle(el).backgroundColor), palettes.dark.bg);
    assert.equal(await fallback.evaluate(() => document.documentElement.scrollWidth), 320);
    assert((await fallback.locator('h1').boundingBox()).y > (await fallback.locator('header').boundingBox()).height);
    await nojs.close();
    assert.deepEqual(errors, []);
    await context.close();
    await browser.close();
    console.log(`${engine.name()}: manual themes on all ${routes.length} routes, persistence, system changes, cross-tab sync, keyboard and no-JavaScript checks passed`);
  }
})().catch(error => { console.error(error); process.exit(1); });
