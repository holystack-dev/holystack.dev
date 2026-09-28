/** Build the HolyStack vector identity and export kit. Originals stay editable here. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { openSync } from 'fontkit';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'public/brand');
const colours = {
  gold: '#A56F2B', ink: '#172B35', ivory: '#FAF8F4',
  nightGold: '#E5B976', nightText: '#F8F4EC', black: '#000000', white: '#FFFFFF',
};
const fontPath = path.join(root, 'node_modules/@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff');
const captionFont = path.join(root, 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff');
const precision = value => Number(value.toFixed(4));

// Two folded forms, sharing a cross-shaped counter. Coordinates are hand drawn,
// not a raster trace. The small version opens the crossbar for 16–32px display.
function markPaths(small = false) {
  const top = small ? 44 : 46;
  const bottom = small ? 60 : 58;
  const left = small ? 26 : 27;
  const right = 104 - left;
  return [
    `M12 10 L40 26 Q44 28 44 33 V${top} H${left + 2} Q${left} ${top} ${left} ${top + 2} V${bottom - 2} Q${left} ${bottom} ${left + 2} ${bottom} H44 V106 Q44 118 34 112 L8 97 Q2 94 2 87 V18 Q2 4 12 10 Z`,
    `M70 2 L96 17 Q102 20 102 27 V96 Q102 110 92 104 L64 88 Q60 86 60 81 V${bottom} H${right - 2} Q${right} ${bottom} ${right} ${bottom - 2} V${top + 2} Q${right} ${top} ${right - 2} ${top} H60 V10 Q60 -4 70 2 Z`,
  ];
}

function outline(text, file, height, tracking = 0, pairs = {}) {
  const font = openSync(file);
  const run = font.layout(text);
  let pen = 0;
  const glyphs = run.glyphs.map((glyph, index) => {
    const pos = run.positions[index];
    const entry = { d: glyph.path.toSVG(), x: pen + pos.xOffset, y: pos.yOffset, box: glyph.bbox };
    pen += pos.xAdvance + tracking + (pairs[text.slice(index, index + 2)] || 0);
    return entry;
  });
  const minX = Math.min(...glyphs.map(g => g.x + g.box.minX));
  const maxX = Math.max(...glyphs.map(g => g.x + g.box.maxX));
  const minY = Math.min(...glyphs.map(g => g.y + g.box.minY));
  const maxY = Math.max(...glyphs.map(g => g.y + g.box.maxY));
  const scale = height / (maxY - minY);
  return {
    width: precision((maxX - minX) * scale), height,
    paths: glyphs.map(g => ({
      d: g.d,
      transform: `matrix(${precision(scale)} 0 0 ${precision(-scale)} ${precision((g.x - minX) * scale)} ${precision((maxY - g.y) * scale)})`,
    })),
  };
}

const wordmark = outline('HolyStack', fontPath, 104, -2, { yS: 28, St: -8 });
const caption = outline('Catholic apps & open projects', captionFont, 23);
const identity = {
  name: 'HolyStack', version: 1, colours,
  mark: { viewBox: '0 0 128 128', transform: 'translate(12 6)', paths: markPaths(), smallPaths: markPaths(true) },
  wordmark,
  horizontal: { width: precision(144 + wordmark.width), height: 128, wordX: 136, wordY: 12 },
};
const mark = (fill, small = false) => `<g fill="${fill}" transform="${identity.mark.transform}">${markPaths(small).map(d => `<path d="${d}"/>`).join('')}</g>`;
const letters = (item, fill) => `<g fill="${fill}">${item.paths.map(p => `<path d="${p.d}" transform="${p.transform}"/>`).join('')}</g>`;
const word = fill => letters(wordmark, fill);
const svg = (width, height, content, title = 'HolyStack') => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}"><title>${title}</title>${content}</svg>\n`;
const modes = {
  primary: [colours.gold, colours.ink],
  dark: [colours.nightGold, colours.nightText],
  black: [colours.black, colours.black],
  white: [colours.white, colours.white],
};
function artwork(kind, mode = 'primary') {
  const [gold, ink] = modes[mode];
  if (kind === 'icon') return svg(128, 128, mark(gold));
  if (kind === 'wordmark') return svg(precision(wordmark.width + 16), 120, `<g transform="translate(8 8)">${word(ink)}</g>`);
  if (kind === 'horizontal') return svg(identity.horizontal.width, 128,
    `${mark(gold)}<g transform="translate(136 12)">${word(ink)}</g>`);
  return svg(640, 360,
    `<g transform="translate(240 28) scale(1.25)">${mark(gold)}</g><g transform="translate(${precision((640 - wordmark.width) / 2)} 230)">${word(ink)}</g>`);
}
async function save(relative, data) {
  const dest = path.join(output, relative);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, data);
}
async function raster(source, width, background) {
  let image = sharp(Buffer.from(source), { density: 300 }).resize({ width });
  if (background) image = image.flatten({ background });
  return image.png().toBuffer();
}

await fs.mkdir(output, { recursive: true });
for (const kind of ['icon', 'horizontal', 'stacked', 'wordmark']) {
  for (const mode of Object.keys(modes)) {
    const name = `holystack-${kind}${mode === 'primary' ? '' : `-${mode}`}`;
    const source = artwork(kind, mode);
    await save(`svg/${name}.svg`, source);
    for (const size of kind === 'icon' ? [512, 1024] : [1024, 2048]) {
      await save(`png/${name}-${size}.png`, await raster(source, size));
    }
  }
}

const smallIcon = svg(128, 128, mark(colours.gold, true));
await save('svg/holystack-icon-small.svg', smallIcon);
await save('source/identity.json', JSON.stringify(identity, null, 2) + '\n');
await save('source/playfair-display-latin-700-normal.woff', await fs.readFile(fontPath));
await save('source/PLAYFAIR-OFL.txt', await fs.readFile(path.join(root, 'node_modules/@fontsource/playfair-display/LICENSE')));
await save('source/INTER-OFL.txt', await fs.readFile(path.join(root, 'node_modules/@fontsource/inter/LICENSE')));
await save('source/build-brand.mjs', await fs.readFile(fileURLToPath(import.meta.url)));

const adaptiveIcon = svg(128, 128, `<style>.mark{fill:${colours.gold}}@media(prefers-color-scheme:dark){.mark{fill:${colours.nightGold}}}</style><g class="mark" transform="${identity.mark.transform}">${markPaths(true).map(d => `<path d="${d}"/>`).join('')}</g>`);
await save('favicon/favicon.svg', adaptiveIcon);
await save('favicon/safari-pinned-tab.svg', svg(128, 128, mark(colours.black, true)));
const icoSizes = [16, 32, 48];
const icoImages = [];
for (const size of [16, 32, 48, 64, 128, 256]) {
  const image = await raster(size <= 32 ? smallIcon : artwork('icon'), size);
  await save(`favicon/favicon-${size}.png`, image);
  if (icoSizes.includes(size)) icoImages.push({ size, image });
}
// ICO supports PNG image entries. Use the same optically sized icon as the SVG.
const icoHeader = Buffer.alloc(6 + icoImages.length * 16);
icoHeader.writeUInt16LE(1, 2); icoHeader.writeUInt16LE(icoImages.length, 4);
let offset = icoHeader.length;
icoImages.forEach(({ size, image }, i) => {
  const p = 6 + i * 16;
  icoHeader[p] = size; icoHeader[p + 1] = size;
  icoHeader.writeUInt16LE(1, p + 4); icoHeader.writeUInt16LE(32, p + 6);
  icoHeader.writeUInt32LE(image.length, p + 8); icoHeader.writeUInt32LE(offset, p + 12);
  offset += image.length;
});
await save('favicon/favicon.ico', Buffer.concat([icoHeader, ...icoImages.map(x => x.image)]));

function appIcon(mode = 'dark') {
  const night = mode === 'dark';
  return svg(512, 512, `<rect width="512" height="512" fill="${night ? colours.ink : colours.ivory}"/><g transform="translate(96 96) scale(2.5)">${mark(night ? colours.nightGold : colours.gold)}</g>`);
}
await save('svg/holystack-app-icon.svg', appIcon());
await save('svg/holystack-app-icon-light.svg', appIcon('light'));
for (const size of [180, 192, 512, 1024]) {
  await save(`png/holystack-app-icon-${size}.png`, await raster(appIcon(), size));
  await save(`png/holystack-app-icon-light-${size}.png`, await raster(appIcon('light'), size));
}

const logoScale = 1.42;
const social = svg(1200, 630, `<rect width="1200" height="630" fill="${colours.ivory}"/><g transform="translate(${precision((1200 - identity.horizontal.width * logoScale) / 2)} 182) scale(${logoScale})">${mark(colours.gold)}<g transform="translate(136 12)">${word(colours.ink)}</g></g><g transform="translate(${precision((1200 - caption.width) / 2)} 416)">${letters(caption, colours.ink)}</g>`, 'HolyStack: Catholic apps and open projects');
await save('social/holystack-social.svg', social);
await save('social/holystack-social-1200x630.png', await raster(social, 1200));

const sourceTS = `// Generated by npm run brand:build. Edit scripts/build-brand.mjs, not this file.\nexport const brandIdentity = ${JSON.stringify(identity, null, 2)} as const;\n`;
await fs.writeFile(path.join(root, 'src/data/brand.ts'), sourceTS);
for (const [from, to] of [
  ['favicon/favicon.svg', 'favicon.svg'], ['favicon/favicon.ico', 'favicon.ico'],
  ['favicon/safari-pinned-tab.svg', 'safari-pinned-tab.svg'],
  ['png/holystack-app-icon-180.png', 'apple-touch-icon.png'],
  ['social/holystack-social-1200x630.png', 'images/og-holystack.png'],
]) await fs.copyFile(path.join(output, from), path.join(root, 'public', to));

const guide = `# HolyStack brand assets\n\nThe H is formed from two folded shapes, with a cross in the space between them.\nThis kit is a hand-drawn vector refinement of the approved September 2026 concept.\n\n## Choose an asset\n\n- svg/holystack-horizontal.svg: primary icon + wordmark for light backgrounds.\n- svg/holystack-horizontal-dark.svg: lighter gold and ivory for dark backgrounds.\n- svg/holystack-stacked.svg: vertical arrangement.\n- svg/holystack-wordmark.svg: name only.\n- svg/holystack-icon.svg: emblem only.\n- svg/holystack-icon-small.svg: wider crossbar for 16–32px use.\n- Black and white versions are true one-colour artwork for print and overlays.\n- PNG files are transparent, except the square app icons and social card.\n- favicon/ includes an adaptive SVG, multi-size ICO and 16–256px PNGs.\n- The app icon has a solid background and generous padding for OS masking.\n- social/ contains a 1200×630 sharing card.\n\nEvery logo SVG contains actual paths. No embedded PNG, external resource or font\nis required. Wordmark letters are outlined from Playfair Display Bold, with\nadjusted spacing; its SIL Open Font License is included in source/.\n\n## Colours\n\nGold ${colours.gold}\nDeep navy ${colours.ink}\nIvory ${colours.ivory}\nDark-background gold ${colours.nightGold}\nDark-background text ${colours.nightText}\n\n## Use\n\nUse the primary logo on ivory or white and the dark variant on deep navy.\nKeep clear space at least as wide as the crossbar around the artwork. Prefer a\nhorizontal logo at 140px wide or larger; switch to the icon when space is tighter.\nUse the small icon below 32px. Keep the proportions, open cross and two flat\ncolours. Do not add outlines, gradients, shadows or bevels.\n\n## Rebuild\n\nFrom the website repository, run npm ci, then npm run brand:build. Node.js and\nPython 3 are required. The script uses the pinned Fontsource, fontkit and sharp\npackages. scripts/build-brand.mjs owns geometry, spacing and export choices.\nsrc/data/brand.ts supplies the exact same paths to the website's Brand component.\nSource font and licences are included for provenance; the final SVGs stand alone.\n`;
await save('README.md', guide);

const preview = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>HolyStack brand assets</title><style>
*{box-sizing:border-box}body{margin:0;background:${colours.ivory};color:${colours.ink};font:15px/1.6 system-ui,sans-serif}.wrap{max-width:1120px;margin:auto;padding:55px 28px}h1{font-size:14px;letter-spacing:.16em;text-transform:uppercase;font-weight:500;margin:0 0 36px}.hero{padding:60px 25px 95px;display:flex;justify-content:center}.hero img{width:min(830px,100%);height:auto}.pair{display:grid;grid-template-columns:1fr 1fr;gap:20px}.panel{padding:50px 36px;border:1px solid #ddd9d0;border-radius:20px;display:grid;place-items:center;min-height:220px}.panel img{width:100%;max-width:420px}.night{background:${colours.ink};border-color:${colours.ink}}.row{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:30px;margin:45px 0}.row img{display:block}.sizes{display:flex;align-items:center;gap:28px}.swatches{display:flex;flex-wrap:wrap;gap:12px}.swatches span{padding:12px 18px;border:1px solid #ccc;border-radius:10px}.downloads a{color:inherit;text-underline-offset:5px;margin-right:25px;display:inline-block;margin-bottom:12px}small{color:#5d686e}h2{font-size:17px;font-weight:500;margin-top:40px}.app{width:96px;border-radius:22px}@media(max-width:650px){.pair{grid-template-columns:1fr}.hero{padding:30px 0 60px}.panel{padding:32px 22px;min-height:180px}.row{justify-content:center}}
</style></head><body><main class="wrap"><h1>HolyStack / Brand assets</h1><div class="hero"><img src="svg/holystack-horizontal.svg" alt="HolyStack logo"></div><div class="pair"><div class="panel night"><img src="svg/holystack-horizontal-dark.svg" alt="Logo on navy"></div><div class="panel"><img src="svg/holystack-horizontal-black.svg" alt="Single-colour logo"></div></div><div class="row"><div class="sizes"><img src="svg/holystack-icon.svg" width="96" height="96" alt="96px emblem"><img src="svg/holystack-icon.svg" width="48" height="48" alt="48px emblem"><img src="svg/holystack-icon-small.svg" width="24" height="24" alt="24px emblem"><img src="favicon/favicon-16.png" width="16" height="16" alt="16px favicon"></div><img class="app" src="png/holystack-app-icon-192.png" width="96" height="96" alt="App icon"><img src="svg/holystack-horizontal.svg" width="180" alt="Header-size logo"></div><div class="pair"><div class="panel"><img src="svg/holystack-stacked.svg" alt="Stacked logo"></div><div class="panel night"><img src="svg/holystack-horizontal-white.svg" alt="White logo"></div></div><h2>Palette</h2><div class="swatches"><span style="background:${colours.gold};color:white">${colours.gold}</span><span style="background:${colours.ink};color:white">${colours.ink}</span><span>${colours.ivory}</span><span style="background:${colours.nightGold}">${colours.nightGold}</span></div><h2>Downloads</h2><div class="downloads"><a href="holystack-brand-assets.zip">Complete asset set</a><a href="svg/holystack-icon.svg">Icon SVG</a><a href="svg/holystack-horizontal.svg">Icon + wordmark SVG</a><a href="README.md">Usage guide</a></div><small>SVG paths, transparent PNGs, favicons, app icons and sharing artwork.</small></main></body></html>`;
await save('preview.html', preview);

async function filesIn(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(e => e.isDirectory() ? filesIn(path.join(dir, e.name)) : [path.join(dir, e.name)]));
  return nested.flat().sort();
}
const files = (await filesIn(output)).filter(p => !p.endsWith('.zip') && !p.endsWith('manifest.json'));
const manifest = [];
for (const file of files) {
  const bytes = await fs.readFile(file);
  manifest.push({ file: path.relative(output, file), bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
}
await save('manifest.json', JSON.stringify({ version: 1, files: manifest }, null, 2) + '\n');
execFileSync('python3', ['-c', `from pathlib import Path
import sys, zipfile
base=Path(sys.argv[1])
with zipfile.ZipFile(base/'holystack-brand-assets.zip','w',zipfile.ZIP_DEFLATED) as archive:
    for p in sorted(base.rglob('*')):
        if p.is_file() and p.suffix != '.zip': archive.write(p, 'holystack-brand-assets/'+str(p.relative_to(base)))
`, output]);
console.log(`Generated ${manifest.length} assets and source files, plus manifest and ZIP.`);
console.log(`Preview: /brand/preview.html | Download: /brand/holystack-brand-assets.zip`);
