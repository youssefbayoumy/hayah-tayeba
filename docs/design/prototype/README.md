# Interactive browser preview — v0.5

Open `index.html?demo=1`, or serve `/docs` with `python scripts/serve-preview.py`. Use `http://127.0.0.1:8761/`; the server supports video byte ranges. GitHub Pages publishes the same relative files.

`content.js` defines reviewed-by-client-pending curriculum/configuration. `store.js` implements browser-local transactions and legacy migration. `app.js` renders shared templates. `styles.css` implements the reference palette. `assets/` contains two transparent generated character variants and one exact original MP4; see asset provenance.

Both journeys open from the map. Tazkiya includes all 12 supplied stages and video ranges 0–55, 55–115, 115–end before stages 1, 4, 12. Dhikr retains its opening sample session and is labelled accordingly. Reflection is optional and written. Daily practice cannot gate completion or reset progress.

Storage uses `hayah-tayeba-design-preview-v1` with schemaVersion 2. Existing state migrates without losing nickname, progress, practice or writings. A raw migration backup is retained until writing deletion or full reset; duplicate legacy note content is removed on individual deletion. Corrupt data is preserved behind a recoverable load-error screen. No network submission or cloud backup exists.

`legacy-v04.html` is an archival reference, not the current preview; it uses the old schema and should be opened in a separate browser origin/profile for historical inspection.

The public preview needs internet for initial files/media; it does not promise first-launch offline web operation. The intended Expo build must bundle assets and fonts and pass standalone airplane-mode device QA. No installed native build is delivered by this design update.

## Verification

Install Playwright in a tooling environment, start the server, then run `node tests/preview-qa.cjs` from the repo root. Set `NODE_PATH` to that tooling module path if needed. `CHROME_PATH` can override the installed browser executable; `PREVIEW_URL` can target a deployment. The script checks real media boundaries after near-end seeks, migration, full route, errors and persistence, and exports actual screens. It never inserts completed-video flags to pass media tests.

`node tests/store-qa.cjs` checks migration, writing-copy deletion, malformed data and atomic commits without a browser. `python scripts/package-preview.py` requires Pillow and creates the handoff ZIP after verifying original-media/baseline hashes, asset alpha and text-color contrast.
