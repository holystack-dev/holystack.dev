# Website design and content maintenance

The September 2026 studio redesign uses ivory, gold and deep navy throughout the
site. The homepage presents the studio and a growing catalogue of projects. `src/styles/site.css` owns the colours, spacing, typography and common
layout classes. `src/styles/shema.css` aliases these tokens for the existing
product and installer components. The header appearance control offers Light, Dark and Use device setting.
Both explicit themes work independently of the operating system.

## Shared components

- `MainLayout`: header, footer and page structure, with optional social image and
  a forwarded head slot for structured data. Every page uses this layout.
- `Brand`, `Icon` and `GitHubIcon`: shared brand and icon shapes.
- `projects.ts` and `ProductCard`: one typed project collection for the homepage,
  catalogue and footer. Add future projects here; cards accept phone or device
  media. Shema always uses the **full angled device** in its card and hero.
- `PhoneFrame`: responsive WebP output through Astro Image from unchanged source
  screenshots. Original status bars are retained; no extra notch is added.
- `DeviceFrame`: circular screen or full enclosure. The **video stays circular**.
- `StoreLinks`: the same App Store and Google Play destinations in both Metanoia
  download sections.

Navigation supports keyboard use, Escape and click outside. The header is 76px
on desktop and 72px at widths up to 760px. Mobile navigation starts at 860px;
anchor scroll padding follows the shared header-height token. Do not add autoplay, scroll
effects or analytics as part of a visual refresh.

## Metanoia source of truth

The app repository is the sibling `../metanoia` project. The app itself was not
modified for this website update. Current copy was checked against:

- `assets/data/questions/questions_en.json`: 243 questions, described as 240+.
- `lib/src/core/constants/app_constants.dart`: 14 supported content languages
  and store IDs.
- `lib/src/features/journal`: Daily Examen, journal calendar and reflections.
- `lib/src/features/examination`: Quick Review and Deep Reflection.
- Confession and penance feature folders: Confession Mode, dates and tracking.
- `lib/src/core/database/database_encryption.dart`: encrypted local entries.
- `lib/src/core/router/route_guard.dart`: a PIN is required before opening
  examination, confession, journal and settings. Biometrics are optional.
  The prepared App Store listing says “optional PIN”; the actual route guard
  takes precedence for website copy.
- Repository licences: MIT for code; CC BY-NC-ND 4.0 for spiritual content.

`src/data/metanoia.ts` centralises language labels, screenshot imports, store
links and app FAQs. FAQ structured data is generated from the visible questions.
The confession guide at `/metanoia/guide/` now includes the complete app guide,
prayers, all 22 original FAQs and the invitation for returning to confession in
14 languages, backed by `src/data/metanoia-guide.ts`. The earlier shortened
English content in `src/data/confession.ts` is retained as reference. Website
copy should avoid adding promises about how a particular priest will react or
how a visitor will feel after confession. The existing privacy
policy content and date are retained with the new presentation.

## Refresh Metanoia screenshots

The latest supplied raw set lives in `src/assets/metanoia/2026-09-30/`. Its manifest
records source paths, byte sizes and SHA-256 values. These are existing product
captures containing sample entries, not anyone’s private confession or journal.
The date names the website import, not an app release.

```sh
python3 scripts/sync-metanoia-media.py \
  --raw-source /Users/sabinjose/Downloads/Metanoia_AppStore_Screenshots/raw \
  --date 2026-09-30
npm run build
```

The supplied set includes eight main screenshots and nine extras, copied unchanged.
The examination screen is used in the hero and project cards; Daily Examen and
the journal calendar use the new light-mode captures. The existing app icon remains
in the previous import because no replacement icon was supplied.

Without `--raw-source`, the script copies 13 captures from
`output/app-store/en/source/captures/` and the current `assets/icon/icon.png`.
It never starts a simulator or runs the screenshot app entry point, which resets
sample data. For a new capture set, follow the app repository's screenshot guide
and `output/app-store/en/README.md`, choose a new date and update the imports in
`src/data/metanoia.ts`. Do not use experimental branding assets automatically.

The Metanoia overview combines icon navigation with four app facts. All icons,
including review stars, use the shared inline SVG component. Four selected
reviews from user-supplied App Store and Google Play screenshots are stored in
`src/data/metanoia.ts`. Excerpts and translations are labelled; ratings are those
visible in the supplied screenshots. Do not infer an aggregate rating or a year
missing from an App Store screenshot.

Reviews sit in the hero section: four equal cards on desktop and a swipeable row
before the phone preview on mobile. The download copy states that Metanoia is
completely free and that personal entries stay encrypted on the device. Dark
Metanoia image panels use a restrained navy-purple surface (`#20232b`).

## Browser guide

`/metanoia/guide/` offers four reading sections: confession steps, prayers,
common questions and help for returning to confession. Topic links appear near
the top on mobile; desktop adds a sticky index. Native disclosure elements keep
long prayers and answers manageable and work without JavaScript. Prayer
collections vary by language; the website shows the supplied collection without
substituting English material. The English collection includes the Rosary and
Divine Mercy Chaplet with their complete instructions.

`scripts/sync-metanoia-content.py` copies 85 files unchanged, including the
content licence, with source hashes. It excludes the quotes collection. The web
renderer omits exactly three mobile-only paragraphs from each language: the
preparation promotion, the app-feature tip and the invitation's saved-progress
instructions. All remaining source text is retained. App formatting markers
become readable prayer, rubric and response typography, with source text safely
escaped by Astro. The public licence includes third-party acknowledgements.

Language links preserve the chosen language when moving between the guide and
examination. Reading uses no saved state or network submissions; the language
menu can load additional font files from the same local website. The existing
shared appearance preference remains the only website preference saved.

`scripts/check-guide.cjs` checks Chromium and WebKit in light/dark mode at
1440, 390 and 320px, no-JavaScript access, all 14 complete text collections,
expanded-content overflow, native disclosures, language links, Indic fonts and
the absence of input collection or storage writes.

## Browser examination of conscience

`/metanoia/examine/` is a standalone reader for visitors who prefer to read the
questions without downloading an app. It has 14 sections, expandable question
lists, search and links to all 14 question languages. All text is rendered into
static HTML and remains readable with JavaScript disabled. The language links
also work without JavaScript. Search and open sections remain in memory; the
reader makes no network requests during filtering and stores no responses or
progress. The shared site theme preference still behaves as documented below.

The unchanged sources, content licence and SHA-256 manifest live in
`src/data/metanoia-content/`. The public reader credits HolyStack and links the
content licence. English and ten other languages have 243 questions each;
Hindi, Malayalam and Tamil have 171. Counts are derived from each language's
data, with no invented or substituted questions.

Indian-language text uses locally hosted Noto Sans Malayalam, Noto Sans Tamil
and Noto Sans Devanagari, selected through each element's language attribute.
The question reader, web guide and language labels use these families consistently; English
UI text retains Inter and Playfair Display. Narrow layouts allow long Indic
headings to wrap, and the reader check expands all sections at 320px in every
language, including checks that the intended Indic font family has loaded.

```sh
python3 scripts/sync-metanoia-content.py --source ../metanoia
npm run build
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright node scripts/check-examination.cjs
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright node scripts/check-guide.cjs
```

The reader check covers both browser engines, light/dark themes, four viewport
widths, section browsing, search and reset, language selection, storage writes,
network requests during reading interactions and no-JavaScript access. It also
compares every rendered question in all 14 languages with its source text.

For Shema screenshots, planned navigation footage, hardware setup and FAT32 card
preparation, see [the Shema media guide](shema-media.md). Device capture scripts
remain in the firmware repository, linked from that guide.

## Repeatable browser review

Build and serve the production output:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4322
```

In a second terminal, run `scripts/check-site.cjs` with a local Playwright module:

```sh
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright \
  node scripts/check-site.cjs
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright \
  node scripts/check-themes.cjs
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright \
  node scripts/check-products.cjs
```

If Playwright is installed normally, `node scripts/check-site.cjs` is enough.
Set `SITE_URL` for a different preview port and `SCREENSHOT_DIR` to change the
output directory. The script saves eleven representative pages, including the
English and Malayalam readers, at desktop and narrow mobile widths in light and
dark mode under `artifacts/website/` (gitignored). It checks
page responses, headings, image loading, horizontal overflow, mobile navigation,
Metanoia language/schema consistency and the full-device project card.
`check-themes.cjs` exercises manual overrides on all eleven representative routes in Chromium and
WebKit, persistence across navigation/reload, system changes, cross-tab sync,
keyboard interaction and no-JavaScript navigation. `check-products.cjs` tests
the circular tour, chapter selection before metadata loads, full-device media,
FAT32 notice and installer registration. It opens only the installer’s help
dialog, never a serial port or a firmware installation. Interaction captures
are saved under `artifacts/website/interactions/`.

Review the actual screenshots as well. In particular, look at the device's
bottom edge against the dark panel, phone placement on mobile, text wrapping,
and focus states. Separately exercise the Shema tour chips and installer loading;
never trigger a real firmware installation as part of browser layout QA.

These are local website changes. Store listings, app releases and firmware
releases are separate actions; this workflow does not publish any of them.

## Validation of the initial studio redesign

The production build generates nine routes. All nine passed Chromium review at
1440px and 1280px desktop, and 390px and 320px mobile, in light and dark mode.
Thirty-six complete page screenshots are saved in `artifacts/website/`.
WebKit checks passed for the homepage, Apps, Metanoia and Shema at 1440px and
390px, including the device mask and first-load video chapter selection.
The no-JavaScript navigation remains accessible without covering the page.
All internal page/anchor links and all 14 imported Metanoia asset hashes passed.
The asset build supplies the adaptive SVG favicon and a separate 180px Apple
touch icon.

The 30 September follow-up builds 36 routes, including all 14 examination and
all 14 guide languages.
Eleven representative pages passed light/dark desktop and mobile checks. Shared
theme, persistence and keyboard checks passed in Chromium and WebKit. The reader
passed both engines at 1440, 768, 390 and 320px, including no-JavaScript access,
search without storage/network writes, exact source text in all languages,
loaded Noto fonts for the three Indian scripts and every language expanded at
320px without horizontal overflow. Metanoia's top reviews and the English and
Malayalam readers also passed contrast and section-link checks in both themes.

## HolyStack identity

The shared brand now uses the outlined H-and-cross identity. See the
[identity guide](brand/README.md) for its master geometry, export script and asset
kit. Header, footer, favicons, Apple touch icon and default sharing image use it.

## Appearance implementation

- `ThemeInit.astro` is an inline head script that resolves appearance before the
  page paints. The single `holystack-theme` localStorage value is `light` or
  `dark`. System appearance removes the saved value. Storage failures are caught.
- The resolved mode is `html[data-theme]`; `data-theme-preference` retains the
  user’s choice. Native controls receive the matching `color-scheme`, and the
  browser toolbar receives the matching theme-colour metadata.
- `ThemePicker.astro` is a keyboard-accessible details popover. It is hidden when
  JavaScript is unavailable; CSS then follows the device setting.
- Website surfaces, controls, text, logo paths and focus indicators use semantic
  tokens in `site.css`. Do not add component-level operating-system media queries:
  they would override a visitor’s explicit choice. The single no-JavaScript
  fallback uses `:root:not([data-theme])`.
- Keep real screenshots, the black phone bezel and the physical device rendering
  unchanged across themes. They depict the product, rather than website surfaces.
- ESP Web Tools v10 appends `ewt-install-dialog` and
  `ewt-no-port-picked-dialog` to the document body. Global selectors in `shema.css`
  set its declared Material colour tokens and font, including error colours.
  These names were checked against the exact v10 bundle used by the installer.
  Recheck them when upgrading that dependency. Native browser serial permission
  prompts are controlled by the browser.
- The website privacy page explains the saved appearance preference. It is not
  analytics and is never sent to a server.

## Writing and future projects

Describe HolyStack as a development studio dedicated exclusively to Catholic
apps and open projects. Describe the apps as free, supporting prayer, growth
in holiness, and a deeper relationship with God through Scripture and the
sacramental life. State this focus explicitly in the main introduction,
project catalogue, footer and metadata. Use neutral, concrete
language for capabilities and availability. The spiritual foundation is Catholic
faith: seeking to draw closer to our heavenly Father through Jesus Christ,
guided by the Holy Spirit, and lived through prayer, Scripture and the sacraments. The homepage closes with the complete traditional Prayer to Saint Michael
on the left and the full Hail Mary on the right; they stack in that order on
narrow screens. Both use the reusable `PrayerPanel` component and end with Amen.
Keep Saint Michael’s “be our protection” and “cast into hell” wording. The Hail
Mary follows the traditional form published by the USCCB at
https://www.usccb.org/prayers/hail-mary. The former Latin invocation above the
prayers has been removed. The footer has no Latin motto. Avoid product superlatives, invented endorsements,
launch dates for unannounced projects, and promotional claims about spiritual
outcomes. Further projects are mentioned without inventing names or features.

The logo kit is a fixed-colour brand specimen, so its preview deliberately shows
both approved palettes at once. It is not a normal themed product page.
