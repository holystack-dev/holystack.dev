const { chromium, webkit } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.SITE_URL || 'http://127.0.0.1:4322';
const out = process.env.SCREENSHOT_DIR || path.join(__dirname, '../artifacts/website/guide');
fs.mkdirSync(out, { recursive: true });
const locales = ['en', 'es', 'pt_BR', 'fr', 'de', 'it', 'pl', 'tl', 'vi', 'id', 'ko', 'ml', 'ta', 'hi'];
const route = code => '/metanoia/guide/' + (code === 'en' ? '' : code.replace('_', '-').toLowerCase() + '/');
const read = (folder, code) => JSON.parse(fs.readFileSync(path.join(__dirname, `../src/data/metanoia-content/${folder}/${folder}_${code}.json`)));
const normalize = text => text.replace(/\[\/?[A-Z_]+\]/g, '').replace(/•/g, '').replace(/\s+/g, ' ').trim();
const webText = (section, kind) => section.content.split('\n\n').filter((_, i) => i !== (kind === 'guide' && ['before_confession', 'tips'].includes(section.id) ? 3 : kind === 'invitation' && section.id === 'fear_memory' ? 5 : -1)).join('\n\n');

(async () => {
  for (const [engine, browserType] of Object.entries({ chromium, webkit })) {
    const browser = await browserType.launch({ headless: true });
    for (const width of [1440, 390, 320]) for (const colorScheme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width, height: 960 }, colorScheme, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(() => { window.guideWrites = []; const original = Storage.prototype.setItem; Storage.prototype.setItem = function (key, value) { window.guideWrites.push(key); return original.call(this, key, value); }; });
      assert.equal((await page.goto(base + route('en'), { waitUntil: 'networkidle' })).status(), 200);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('.guide-topics a').count(), 4);
      const requests = []; page.on('request', request => requests.push(request.url()));
      await page.locator('.guide-topics a[href="#prayers"]').click();
      assert.equal(new URL(page.url()).hash, '#prayers');
      await page.locator('[data-reading-id="prayer-act_of_contrition"] summary').click();
      assert(await page.getByText('My God, I am sorry for my sins with all my heart.', { exact: false }).last().isVisible());
      await page.locator('[data-reading-id="prayer-holy_rosary"] summary').click();
      assert.equal(await page.locator('[data-reading-id="prayer-holy_rosary"] .prayer-part').count(), 7);
      await page.locator('.guide-language summary').click();
      assert.equal(await page.locator('.guide-language a').count(), 14);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.guide-language').getAttribute('open'), null);
      assert.deepEqual(await page.evaluate(() => window.guideWrites), []);
      assert(requests.every(url => new URL(url).origin === new URL(base).origin && /^\/_astro\/.*\.woff2$/.test(new URL(url).pathname)), 'Only local font files may load when the language menu opens');
      assert.equal(await page.locator('textarea, input:not([type="hidden"])').count(), 0);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      assert.deepEqual(errors, []);
      if (engine === 'chromium' && width !== 390) {
        await page.goto(base + route('en'));
        await page.screenshot({ path: `${out}/${engine}-${width}-${colorScheme}.png` });
      }
      await page.close();
    }
    const page = await browser.newPage({ viewport: { width: 320, height: 900 }, colorScheme: 'dark' });
    for (const code of engine === 'chromium' ? locales : ['en', 'ml', 'ta', 'hi']) {
      assert.equal((await page.goto(base + route(code), { waitUntil: 'networkidle' })).status(), 200);
      await page.locator('.guide-disclosure').evaluateAll(items => items.forEach(item => item.open = true));
      const guide = read('confession_guide', code);
      const invitation = read('invitation', code);
      const prayers = read('prayers', code);
      const faqs = read('faqs', code);
      const expected = [...guide.sections.map(s => webText(s, 'guide')), ...prayers.categories.flatMap(c => c.prayers.flatMap(p => [p.content, ...(p.sections || []).map(s => s.content)].filter(Boolean))), ...faqs.map(f => f.content), ...invitation.sections.map(s => webText(s, 'invitation'))];
      const actual = await page.locator('.disclosure-body .reading-text').allInnerTexts();
      assert.deepEqual(actual.map(normalize), expected.map(normalize), `${engine} ${code}: complete source text, except mobile-only paragraphs`);
      assert.equal(await page.locator('.guide-disclosure').count(), guide.sections.length + prayers.categories.reduce((sum, c) => sum + c.prayers.length, 0) + faqs.length + invitation.sections.length);
      assert.equal(await page.locator('.guide-sections').getAttribute('lang'), null);
      assert.equal(await page.locator('#confession').getAttribute('lang'), code.replace('_', '-'));
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 320, code + ' expanded text overflow');
      assert(!await page.locator('.guide-sections').innerText().then(t => /\[\/?(?:PRAYER|RUBRIC|SCRIPTURE|INSTRUCTION|LITURGICAL|RESPONSE|VERSICLE|SAINT|AMEN)\]/.test(t)), code + ' raw markers');
      if (['ml', 'ta', 'hi'].includes(code)) assert.match(await page.locator('#confession h2').evaluate(el => getComputedStyle(el).fontFamily), /Noto Sans/);
      assert.equal(await page.locator('.guide-toolbar > a').getAttribute('href'), '/metanoia/examine/' + (code === 'en' ? '' : code.replace('_', '-').toLowerCase() + '/'));
    }
    const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await noJS.goto(base + route('en'));
    await noJS.locator('[data-reading-id="prayer-act_of_contrition"] summary').click();
    assert(await noJS.locator('[data-reading-id="prayer-act_of_contrition"] .reading-text').isVisible());
    await noJS.locator('.guide-language summary').click();
    await noJS.locator('.guide-language a[href="/metanoia/guide/ml/"]').click();
    assert.equal(await noJS.locator('#confession').getAttribute('lang'), 'ml');
    await noJS.close();
    console.log(`${engine}: guide layout, content, language links, privacy and no-JavaScript checks passed`);
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
