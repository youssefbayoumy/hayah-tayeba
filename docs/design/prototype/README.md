# Browser preview — v0.7

Run `python scripts/serve-preview.py --port 8763`, then open `http://127.0.0.1:8763/`. Byte ranges support accurate seeking in the existing film. Pages deploys the same `/docs` files.

Three independent journeys: Dhikr's opening sample; the fifteen-challenge three-garden journey; and باب معية الله with fifteen stations in three chapters. Existing garden artwork/characters remain. The five new blue/gold images are retained as content references, not a new visual theme.

## Modules

- `content.js` / `gardens.js`: existing source catalog and three-garden curriculum.
- `maiyya-content.js`: faith/good-deeds chapter, contextual Quran sources, six matching exercises, daily-item definitions and virtual suggestions.
- `store.js`: schema 4, legacy migration and local transactions.
- `app.js` / `maiyya-ui.js`: shared shell and third-journey screens. The latter receives explicit shell/repository helpers.
- `video-player.js`: existing bounded film; no new Ma'iyya video was supplied.
- `garden-theme.css`: unchanged color/art identity with new checklist, matching, timer and surprise components.

Ma'iyya has no daily waiting. Four matching exercises bind to stations and two are optional in the library; a suitable educational association/application opens the gate with unlimited retries. Narrative answers give supportive feedback and permit continuing. The optional timer and actual worship/feelings never gate learning. Seven-day plan data is separate from digital completion.

The daily screen stores editable local-date reports. It becomes the returning landing page after Ma'iyya is started. One optional triangle suggestion and virtual dice result are saved per date; dice eligibility depends on participation, not prayer reporting. No real gifts, points, competitive ranking, microphone, notification permission or cloud service exists.

Schema 4 keeps the existing browser key. Version 3 gains an empty Ma'iyya record without changing either existing journey, diary or archive. Earlier migrations remain supported. Note deletion/reset handles `.backup-v1`, `.backup-v2`, `.backup-v3`. Failed writes never report a new completion/reward.

## Verification

`node tests/store-qa.cjs` and `node tests/preview-qa.cjs` run existing-journey regression. `node tests/maiyya-store-qa.cjs` and `node tests/maiyya-preview-qa.cjs` cover new behavior and schema 3 migration. Browser tests require Playwright/installed Chrome; `NODE_PATH`, `CHROME_PATH`, `PREVIEW_URL` may identify the tooling environment. Current reports/captures are under `qa/` and `screens/v0.7/`.

`python scripts/package-preview.py` creates the current handoff with integrity evidence. Pillow is used for visual QA contact sheets and verifying original crop pixels, not for generating new art. The original sources/crop manifest and previous handoffs remain preserved.

This is a network-loaded web prototype with browser-local storage, not the installed Expo build. Native first-launch offline behavior, full captions, qualified curriculum approval and device/child usability acceptance remain future release work.
