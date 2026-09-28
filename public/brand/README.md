# HolyStack brand assets

The H is formed from two folded shapes, with a cross in the space between them.
This kit is a hand-drawn vector refinement of the approved September 2026 concept.

## Choose an asset

- svg/holystack-horizontal.svg: primary icon + wordmark for light backgrounds.
- svg/holystack-horizontal-dark.svg: lighter gold and ivory for dark backgrounds.
- svg/holystack-stacked.svg: vertical arrangement.
- svg/holystack-wordmark.svg: name only.
- svg/holystack-icon.svg: emblem only.
- svg/holystack-icon-small.svg: wider crossbar for 16–32px use.
- Black and white versions are true one-colour artwork for print and overlays.
- PNG files are transparent, except the square app icons and social card.
- favicon/ includes an adaptive SVG, multi-size ICO and 16–256px PNGs.
- The app icon has a solid background and generous padding for OS masking.
- social/ contains a 1200×630 sharing card.

Every logo SVG contains actual paths. No embedded PNG, external resource or font
is required. Wordmark letters are outlined from Playfair Display Bold, with
adjusted spacing; its SIL Open Font License is included in source/.

## Colours

Gold #A56F2B
Deep navy #172B35
Ivory #FAF8F4
Dark-background gold #E5B976
Dark-background text #F8F4EC

## Use

Use the primary logo on ivory or white and the dark variant on deep navy.
Keep clear space at least as wide as the crossbar around the artwork. Prefer a
horizontal logo at 140px wide or larger; switch to the icon when space is tighter.
Use the small icon below 32px. Keep the proportions, open cross and two flat
colours. Do not add outlines, gradients, shadows or bevels.

## Rebuild

From the website repository, run npm ci, then npm run brand:build. Node.js and
Python 3 are required. The script uses the pinned Fontsource, fontkit and sharp
packages. scripts/build-brand.mjs owns geometry, spacing and export choices.
src/data/brand.ts supplies the exact same paths to the website's Brand component.
Source font and licences are included for provenance; the final SVGs stand alone.
