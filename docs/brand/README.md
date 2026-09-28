# HolyStack identity

The production identity refines the approved folded H and cross concept into
hand-drawn SVG paths. Rounded outer corners, a consistent counter and adjusted
wordmark spacing replace the generated bitmap edges. The mark stays flat and
uses two folded forms; the Christian cross is the space between them.

## Master and exports

- `scripts/build-brand.mjs` owns the mark geometry, small-size optical variant,
  outlined wordmark, palette, layout and all export dimensions.
- `src/data/brand.ts` is generated from that master. The shared `Brand.astro`
  component renders those exact paths in every header and footer, with the site’s selected
  light or dark colours. The site does not load a bitmap logo or depend on a font
  being installed to render the wordmark.
- `public/brand/svg/` contains icon, horizontal, stacked and wordmark SVGs in
  primary, dark, black and white versions, plus a small-icon variant.
- `public/brand/png/` contains transparent 512/1024px icon exports, 1024/2048px
  logo exports and square app icons at 180/192/512/1024px.
- `public/brand/favicon/` contains adaptive SVG, a 16/32/48px ICO, PNG favicons
  and a monochrome Safari pinned-tab mask.
- `public/brand/social/` contains the SVG and 1200×630 PNG sharing card.
- `public/brand/preview.html` shows the identity on light and dark backgrounds,
  in one colour, at header size and as 16–96px icons.
- `public/brand/holystack-brand-assets.zip` is the complete downloadable kit.
  Its manifest includes SHA-256 hashes. Source geometry, font provenance and
  usage guidance are included.

The original imagegen proposal is kept separately under
`public/images/brand/holystack-logo-concept-v1.png` for design history.

## Palette

| Role | Colour |
| --- | --- |
| Primary gold | `#A56F2B` |
| Deep navy | `#172B35` |
| Ivory | `#FAF8F4` |
| Gold on dark backgrounds | `#E5B976` |
| Wordmark on dark backgrounds | `#F8F4EC` |

The site's small text links use a darker amber for readability. The brand gold
is for the symbol. Use true black/white versions when only one colour is needed.

## Typography and sizing

The wordmark is based on Playfair Display Bold, already used by the site, with
font kerning and optical spacing adjustments, including extra room between
the “y” and “S”. All distributed logo letters
are paths, so SVGs contain no external fonts or raster images. The SIL Open Font
License and source font are included in the kit.

Use the horizontal logo at 140px wide or larger and the icon for smaller spaces.
Use `holystack-icon-small.svg` below 32px: its wider crossbar keeps the negative
space readable. Leave clear space at least as wide as the crossbar. Do not stretch,
recolour individual pieces, add gradients, or close the cross-shaped opening.

## Rebuild

```sh
npm ci
npm run brand:build
npm run build
```

`brand:build` uses Node.js, Python 3, and the pinned fontkit/sharp packages. It also
updates the root favicon, Apple touch icon, pinned-tab mask and the default social
image. Changes to geometry or colours must happen in the master script, followed
by regeneration. Do not edit generated SVGs individually.

For browser QA, use the existing `scripts/check-site.cjs` workflow in
[the site design guide](../site-design.md). Inspect the logo at 16px, 24px, header
size and large size in light and dark mode. Check SVG transparency, no clipping,
internal cross spacing, mobile navigation room, and the ZIP download.
