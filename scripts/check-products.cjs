const { chromium, webkit } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.SITE_URL || 'http://127.0.0.1:4322';
const out = process.env.SCREENSHOT_DIR || path.join(__dirname, '../artifacts/website/interactions');
fs.mkdirSync(out, { recursive: true });
(async () => {
  for (const engine of [chromium, webkit]) {
    const browser = await engine.launch({ headless: true });
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, colorScheme: 'dark', reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      for (const route of ['/', '/apps/', '/metanoia/', '/shema/']) {
        await page.goto(base + route, { waitUntil: 'networkidle' });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width, route);
      }
      assert(await page.locator('video').evaluate(video => video.paused));
      assert.equal(await page.locator('[data-chapter]').count(), 8);
      assert.equal(await page.locator('input[type="range"], select').count(), 0);
      assert.equal(await page.getByText('Recorded on the device', { exact: false }).count(), 0);
      assert.equal(await page.getByText('favourite verse', { exact: false }).count(), 0);
      assert.equal(await page.locator('.hero-device .device').getAttribute('data-view'), 'angled');
      await page.getByRole('button', { name: 'Library', exact: true }).click();
      await page.waitForFunction(() => {
        const video = document.querySelector('video');
        return !video.paused && video.currentTime >= 35.378 && video.currentTime < 40;
      });
      await page.getByRole('button', { name: 'Pause device tour' }).click();
      const box = await page.locator('video').boundingBox();
      assert(Math.abs(box.width - box.height) < 1, 'Video must stay circular');
      await page.locator('device-tour').screenshot({ path: `${out}/${engine.name()}-${width}-tour.png` });
      await page.goto(base + '/shema/flash/', { waitUntil: 'networkidle' });
      assert(await page.getByText('FAT32 is required.', { exact: true }).isVisible());
      assert.equal(await page.locator('esp-web-install-button').getAttribute('manifest'), '/shema/manifest.json');
      await page.waitForFunction(() => !!customElements.get('esp-web-install-button'));
      if (engine === chromium && width === 390) {
        // Open only the library's help dialog. Never call requestPort or a flash action.
        await page.evaluate(async () => {
          const loader = document.querySelector('script[src*="esp-web-tools"]').src;
          const source = await (await fetch(loader)).text();
          const match = source.match(/import\("([^\"]+)"\)\.then\(.{0,100}openNoPortPickedDialog/);
          if (!match) throw new Error('ESP Web Tools changed: review the no-port dialog entry point');
          const module = await import(new URL(match[1], loader).href);
          module.openNoPortPickedDialog(() => {});
        });
        const dialog = page.locator('ewt-no-port-picked-dialog');
        await dialog.waitFor({ state: 'attached' });
        await dialog.locator('dialog').waitFor({ state: 'visible' });
        assert.equal(await dialog.evaluate(el => getComputedStyle(el).getPropertyValue('--md-sys-color-surface').trim()), '#162630');
        await page.screenshot({ path: `${out}/installer-dialog-dark.png`, animations: 'disabled' });
        // The open shadow dialog must also update when the theme changes.
        await page.evaluate(() => document.dispatchEvent(new CustomEvent('holystack:theme-request', { detail: 'light' })));
        await page.waitForFunction(() => getComputedStyle(document.querySelector('ewt-no-port-picked-dialog')).getPropertyValue('--md-sys-color-surface').trim() === '#fffdfa');
        await page.waitForFunction(() => getComputedStyle(document.body).backgroundColor === 'rgb(250, 248, 244)');
        await page.screenshot({ path: `${out}/installer-dialog-light.png`, animations: 'disabled' });
      }
      assert.deepEqual(errors, []);
      await page.close();
      console.log(`${engine.name()} ${width}: product layouts, circular video, first-load chapter selection, FAT32 and installer checks passed`);
    }
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
