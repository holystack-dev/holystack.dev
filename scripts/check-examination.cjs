const {chromium,webkit}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
const base=process.env.SITE_URL || 'http://127.0.0.1:4322';const site=path.resolve(__dirname,'..');
const out=process.env.SCREENSHOT_DIR || path.join(site,'artifacts/website/examination');fs.mkdirSync(out,{recursive:true});
const locales=['en','es','pt-br','fr','de','it','pl','tl','vi','id','ko','ml','ta','hi'];
(async()=>{
 for(const engine of [chromium,webkit]){
  const browser=await engine.launch({headless:true});
  for(const width of [1440,768,390,320])for(const theme of ['light','dark']){
   const context=await browser.newContext({viewport:{width,height:1000},colorScheme:theme,reducedMotion:'reduce'});
   await context.addInitScript(()=>{window.__storageWrites=[];const original=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){window.__storageWrites.push(key);return original.call(this,key,value)};});
   const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'/metanoia/examine/',{waitUntil:'networkidle'});
   assert.equal(await page.locator('[data-question]').count(),243);assert.equal(await page.locator('[data-section]').count(),14);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,'overflow');
   assert.equal(await page.locator('input[type=checkbox],textarea').count(),0);
   await page.locator('[data-section-link="section-8"]').click();assert.equal(await page.locator('#section-8').getAttribute('open'),'');
   let requests=[];page.on('request',r=>requests.push(r.url()));
   await page.getByLabel('Find a question').fill('gossip');
   assert((await page.locator('[data-question]:visible').count())>0);
   const visible=await page.locator('[data-question]:visible').allTextContents();assert(visible.every(t=>t.toLowerCase().includes('gossip')));
   await page.getByLabel('Find a question').fill('zzzznotaword');assert(await page.getByText('No questions found.',{exact:true}).isVisible());
   await page.getByRole('button',{name:'Clear search',exact:true}).last().click();assert.equal(await page.locator('[data-result-count]').textContent(),'243 questions · 14 sections');
   await page.getByRole('button',{name:'Expand all',exact:true}).click();assert.equal(await page.locator('[data-section][open]').count(),14);
   await page.getByRole('button',{name:'Collapse all',exact:true}).click();assert.equal(await page.locator('[data-section][open]').count(),0);
   assert.deepEqual(await page.evaluate(()=>window.__storageWrites),[]);assert.deepEqual(requests,[],'Reader interactions must not make network requests');
   assert.equal(new URL(page.url()).search,'');
   await page.locator('.reader-language summary').click();await page.getByRole('link',{name:'Español',exact:true}).click();
   assert(page.url().endsWith('/metanoia/examine/es/'));assert.equal(await page.locator('[data-question]').count(),243);assert.equal(await page.locator('.examination-sections').getAttribute('lang'),'es');
   assert.equal(await page.getByLabel('Find a question').inputValue(),'');
   await page.locator('.reader-language summary').click();await page.keyboard.press('Escape');assert.equal(await page.locator('.reader-language').getAttribute('open'),null);
   await page.goto(base+'/metanoia/examine/',{waitUntil:'networkidle'});
   await page.screenshot({path:`${out}/${engine.name()}-${width}-${theme}.png`,fullPage:true});
   assert.deepEqual(errors,[]);await context.close();
  }
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:800},colorScheme:'dark'});const page=await context.newPage();
  await page.goto(base+'/metanoia/examine/');assert.equal(await page.locator('[data-question]').count(),243);assert(await page.locator('#section-1 [data-question]').first().isVisible());assert.equal(await page.locator('[data-search-controls]').isVisible(),false);
  await page.locator('#section-8 summary').click();assert(await page.locator('#section-8 [data-question]').first().isVisible());
  await page.locator('.reader-language summary').click();await page.getByRole('link',{name:'മലയാളം',exact:true}).click();assert.equal(await page.locator('[data-question]').count(),171);
  await context.close();await browser.close();console.log(engine.name()+': 8 layout/theme cases, search, section browsing, language selection, no storage/network writes and no-JavaScript reading passed');
 }
 const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:320,height:800},colorScheme:'dark'});
 for(const locale of locales){
  const route=locale==='en'?'/metanoia/examine/':`/metanoia/examine/${locale}/`;
  const source=JSON.parse(fs.readFileSync(path.join(site,`src/data/metanoia-content/questions/questions_${locale==='pt-br'?'pt_BR':locale}.json`),'utf8')).flatMap(g=>g.questions.map(q=>q.text));
  await page.goto(base+route);const actual=await page.locator('[data-question] p').allTextContents();assert.deepEqual(actual,source);assert.equal(await page.locator('.examination-sections').getAttribute('lang'),locale==='pt-br'?'pt-BR':locale);
  const family={ml:'Noto Sans Malayalam',ta:'Noto Sans Tamil',hi:'Noto Sans Devanagari'}[locale];
  if(family){
   await page.evaluate(()=>document.fonts.ready);
   assert((await page.locator('[data-question] p').first().evaluate(el=>getComputedStyle(el).fontFamily)).includes(family),locale+' font family');
   assert(await page.evaluate(family=>[...document.fonts].some(face=>face.family.includes(family)&&face.status==='loaded'),family),locale+' font loaded');
  }
  await page.getByRole('button',{name:'Expand all',exact:true}).click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),320,locale+' expanded mobile overflow');
 }
 await browser.close();console.log('All 14 language routes reproduce the original question text exactly and fit 320px with every section expanded.');
})().catch(e=>{console.error(e);process.exit(1)});
