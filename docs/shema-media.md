# Shema product content and media

The product page, homepage and Apps card use the shared capture date and paths in
`src/data/shema.ts`. `DeviceFrame.astro` supplies the same circular screen and CSS
bezel for the hero video and screen gallery. The separate product image and
installer show an angled full-device view using the existing enclosure render
with a current screenshot overlaid. The video stays in its circular frame.
The original 360 × 360 UI pixels are never retouched or baked into mockup images.

## Current set: 2026-09-26

- 80 original device screenshots, 37 routes/states, in
  `public/images/shema/screens/2026-09-26/`. The source manifest and SHA-256 list
  are preserved beside them. The page uses a curated selection; other captures
  remain available for future product material and are not fetched by the page.
- `public/videos/shema/2026-09-26/navigation-tour.mp4`: 157.7 seconds,
  360 × 360 H.264 / yuv420p, silent, about 1.1 MB, fast-start MP4. Recorded from
  actual LCD updates on the connected ESP32; 336 source frames, no dropped frames.
- The sibling video JSON records device action labels and their timestamps.
  Tour chapters in `src/data/shema.ts` use those timestamps, in seconds.
- `preview-player-playing.png` uses temporary sample playback state on real
  firmware. The page labels it **Example playback screen**. Any other future
  `preview-*` selection must retain the distinction from ordinary captured state;
  the screenshot manifest identifies fixtures explicitly.

The feature descriptions were checked against the firmware's `app_ui`,
`app_player`, `app_store` and `app_played` components and the captured UI:
73-book Bible, recording/language choice, 365-day Bible in a Year, nested Library,
alphabet jump/shuffle, favourites by source, recent listening, resume, played
markers, seeking/volume, sleep 15–120 minutes, brightness, seven accent colours,
screen timeout, auto power-off, and confirmation before removal/clearing history.
Audio is user supplied. No new battery-life, price or speed benchmark is claimed.

Hardware reference: [Waveshare documentation](https://docs.waveshare.com/ESP32-S3-Touch-LCD-1.85C),
checked 2026-09-26. The setup refers to V2 and BOX + battery SKU 30684;
buyers are directed to confirm the package and price with the seller.

## Refresh from a connected device

Use a clone of the `esp32-rounded-bible` firmware repository as the source.
All capture automation stays with that repository:

- `audio_bible/tools/SCREENSHOTS.md` — full screenshot workflow.
- `audio_bible/tools/RECORDING.md` — reproducible video workflow.
- `audio_bible/tools/record_device.py` — recorder.
- `audio_bible/tools/navigation_tour.json` — deliberately ordered navigation plan.
- `audio_bible/tools/review_device.sh` — builds diagnostic firmware, captures,
  checks and restores normal firmware even on exit.

Follow those guides to create a new dated export in
`design/product-screenshots/YYYY-MM-DD` and `design/product-videos/YYYY-MM-DD`.
Do not replace the planned tour with random taps or create footage that implies
unsupported features. Then, from this website repository:

```sh
SHEMA_REPO=/path/to/esp32-rounded-bible
python3 scripts/sync-shema-media.py \
  --source "$SHEMA_REPO" \
  --date YYYY-MM-DD
npm run build
```

The sync script validates the inputs, copies originals and verifies their hashes.
It never changes firmware, rewrites source captures or deletes old sets. Update
`SHEMA_CAPTURE`, feature selections and tour timing in `src/data/shema.ts` when
using a new capture date. Copy `ms / 1000` from the matching video action;
do not guess chapter offsets from an older tour.

## Presentation and verification

- Video and screenshots are clipped by the same device component. The angled
  screen is projected onto the enclosure render; the front view remains circular.
  Keep the unprojected screen at or below its native 360 CSS pixels.
- Video is user initiated, `playsinline`, muted, and `preload="none"`. The poster
  renders before downloading the MP4. Reduced-motion visitors also get a still
  image until they choose to play. Controls sit outside the circular mask.
- Play/pause and feature chips are keyboard accessible. The chips replace the
  seek slider and dropdown. Selecting a chip starts that section, including before
  metadata has loaded. The active chip follows playback.
  A no-JavaScript link and a media-error link open the original MP4.
- Check `/shema/`, `/` and `/apps/` in light and dark mode. Check at 320/390 px
  mobile, tablet and desktop widths; no horizontal overflow, clipped controls,
  distorted circles or missing images. Test play/pause, seeking, first-action
  chapter jump, end/replay, keyboard controls and reduced motion.
- Re-run `npm run build` after changing content or components.

## Release boundary

This update is website content and captured media. It does not publish firmware
or modify `public/shema/manifest.json`, whose existing installer points to the
firmware repository's published `installer/firmware.bin`. Before publishing a
product announcement that promises the demo's features in the installer, verify
that published full-flash image matches the reviewed firmware. An app-only `.bin`
must never replace the installer image at offset zero.

## Verification of the 2026-09-26 website update

The production build passed. A Chromium browser audit checked 1440 px and
1280 px desktop, 768 px tablet, and 390 px / 320 px mobile layouts in light and
dark mode. The page had no horizontal overflow, missing media or JavaScript
errors; the circular screen stayed at native size or smaller. All 80 copied
screenshot hashes matched the export.

Playback checks passed for a chapter jump before the first media load, play,
pause, keyboard seeking, end/replay, reduced-motion initial state and the
no-JavaScript fallback. The MP4 was not fetched before user interaction.
The updated homepage and Apps cards were also checked on mobile.


## Product page and installer styling

`src/styles/site.css` owns the site palette; `src/styles/shema.css` aliases it
for the product and installer pages. Keep the installer’s hardware requirements, FAT32 card
format, folder/file naming link, browser/cable instructions, download-mode steps
and troubleshooting when updating its presentation. The installer element and
manifest path remain the existing ESP Web Tools integration.

The angled `DeviceFrame` uses the existing 1280px enclosure artwork with a build-time 1024px WebP
output for faster loading. The original PNG stays unchanged. Its
SVG viewBox is `(276, 244, 686, 814)`. The live screen is mapped to an ellipse
centred at `(620, 450)` with radii `(263, 160)` in the original artwork. An SVG luminance
mask removes the white background. Its black 8px outline trims four source pixels
inside the silhouette, removing the pale bottom fringe on dark backgrounds. Do not change
these coordinates without inspecting the screen fit. Source UI pixels and the
MP4 remain unchanged. The `view` prop selects the angled full-device illustration or front circular
frame. The demo always uses the circular frame; it is not projected onto the
full device.

Public copy describes Bible navigation and favourites at chapter level, not
individual verses. The recording caption was removed at the owner’s request;
provenance stays here, and the no-audio description remains screen-reader text.

## Verification of the 2026-09-27 revision

The production build passed after the copy, media controls and installer update.
Browser checks passed at 1440/1280px desktop and 390/320px mobile in light and
dark mode, with no horizontal overflow or JavaScript errors. The video remains
circular; a separate full-device still appears in the playback section and on
the installer. Feature chips jump to the correct recording timestamps and update
the active state. Play/pause and initial paused state were checked. The old
caption, slider and dropdown are absent. The installer component loaded with its
existing manifest, and FAT32 is prominent. This was a website/UI check, not a
firmware flash to the connected device.

The home and Apps product cards also use the full enclosure. The original
artwork stays unchanged; the inset mask is shared everywhere the device appears.
