# Interactive browser preview — v0.6

Run `python scripts/serve-preview.py --port 8762` from the root; open `http://127.0.0.1:8762/`. The static server supports video byte ranges. GitHub Pages publishes the same `/docs` files.

## Structure

`content.js` keeps the earlier Dhikr content and source catalog; `gardens.js` defines the approved three-garden/fifteen-question replacement and original artwork bindings. `store.js` owns schema 3 migration and local transactions. `app.js` implements the shared screens. `video-player.js` handles bounded playback of the unchanged original film. `garden-theme.css` overrides the base styles with the global reference theme.

Original source-pixel crops and their manifest are under `assets/gardens/`. Reproduce them with `python scripts/crop-garden-assets.py`; it uses the original attachments when available and otherwise the retained source references. Crops are lossless PNGs. No image generation or upscaling is used for v0.6.

## Behavior

Two main journeys remain. Tazkiya has التخلية / التحلية / التزكية, five scenarios each, explored in order. Any answer's explanation permits Next. Five explored challenges earn one key; three keys open treasure. Required video ranges 0–55 / 55–115 / 115–end introduce the gardens. Writing and seven-day practice are optional. Dhikr remains the original opening sample, visually restyled.

Browser key `hayah-tayeba-design-preview-v1` now contains schemaVersion 3. Original flat data and schema 2 are migrated before validating current content IDs. Old Tazkiya progress/keepsakes are archived, while notes—including draft-only writings—retain independent origin metadata. New challenges do not inherit old completion. The same film's viewing records, plans, practice and Dhikr are preserved. Deleting a note removes its raw backup copies; reset removes both `.backup-v1` and `.backup-v2` along with current data.

## Verification and handoff

- `node tests/garden-store-qa.cjs`: migration, archive, duplicate/invalid keys, backup deletion, failed writes and protected corrupt loads.
- `node tests/garden-preview-qa.cjs`: original-art screens, all 45 responses, complete route, real video boundaries after near-end seeks, replay, old-note editing, local failures and 360/390/430 layouts. Requires Playwright and installed Chrome; `NODE_PATH`, `CHROME_PATH`, `PREVIEW_URL` may be set for the tooling environment.
- `python scripts/package-gardens.py`: Pillow-based contact sheet, original crop/media/baseline checks, contrast evidence and v0.6 ZIP. The stable `preview-qa.cjs`, `store-qa.cjs` and `package-preview.py` entry points now delegate to current tooling; v0.5 tooling remains preserved in Git history and its ZIP.

This public web preview needs network access for initial files/video and has no service worker or cloud backup. It is not proof of an installed Expo app working on first launch in airplane mode. Native packaging, full captions and device/child usability acceptance remain future work.
