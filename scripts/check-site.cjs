const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
const path=require('node:path');
const base=process.env.SITE_URL || 'http://127.0.0.1:4322';
const out=process.env.SCREENSHOT_DIR || path.join(__dirname,'../artifacts/website');fs.mkdirSync(out,{recursive:true});
const routes=process.env.SITE_ROUTES?.split(',') || ['/','/apps/','/metanoia/','/metanoia/guide/','/metanoia/privacy/','/contact/','/privacy/','/shema/','/shema/flash/'];
(async()=>{
 const browser=await chromium.launch({headless:true});
 for(const scenario of [{name:'desktop',width:1440,height:1000,colorScheme:'light'},{name:'mobile',width:390,height:844,colorScheme:'light'},{name:'dark',width:1280,height:900,colorScheme:'dark'},{name:'small',width:320,height:800,colorScheme:'dark'}]){
  const page=await browser.newPage({viewport:scenario,colorScheme:scenario.colorScheme,reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const route of routes){
   const response=await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(response.status(),200,route);
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('h1').count(),1,route+' h1 count');
   assert.equal((await page.locator('header').boundingBox()).height,scenario.width<=760?72:76,route+' header height');
   const overflow=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth}));assert.equal(overflow.w,overflow.scroll,route+' overflow '+scenario.name);
   const badImages=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src));assert.deepEqual(badImages,[],route+' broken images');
   const id=route==='/'?'home':route.replaceAll('/','-').replace(/^-|-$/g,'');
   await page.screenshot({path:`${out}/${scenario.name}-${id}.png`,fullPage:true});
   if(route==='/apps/')assert.equal(await page.locator('.shema .device').getAttribute('data-view'),'angled');
   if(route==='/metanoia/'){
    assert.equal(await page.locator('.languages li').count(),14);
    const schemas=await page.locator('script[type="application/ld+json"]').evaluateAll(s=>s.map(x=>JSON.parse(x.textContent)));assert(schemas.some(s=>s['@type']==='SoftwareApplication'&&s.inLanguage.length===14));
    await page.getByText('Is Metanoia free?',{exact:true}).click();assert(await page.getByText('Yes. There are no ads, subscriptions or in-app purchases.',{exact:true}).isVisible());
   }
   if(scenario.width<=860){
    const nav=page.locator('#site-navigation');assert.equal(await nav.isVisible(),false);
    const toggle=page.getByRole('button',{name:'Open navigation'});await toggle.click();assert(await nav.isVisible());await page.keyboard.press('Escape');assert.equal(await nav.isVisible(),false);assert.equal(await toggle.getAttribute('aria-expanded'),'false');
   }
  }
  assert.deepEqual(errors,[]);console.log(scenario.name+': '+routes.length+' pages passed');await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
