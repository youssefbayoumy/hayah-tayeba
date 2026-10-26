# الحياة الطيبة | Hayah Tayeba

Arabic learning-app design and interactive prototype for children aged **10–14**: Dhikr, the three-garden journey, and **باب مَعِيَّة الله** with a faith-and-good-deeds chapter, contextual verse matching and private daily practice.

- [Open the demo](https://youssefbayoumy.github.io/hayah-tayeba/)
- [Review the design board](https://youssefbayoumy.github.io/hayah-tayeba/design/)
- [Open the current interactive prototype](https://youssefbayoumy.github.io/hayah-tayeba/design/prototype/)

The current deliverable is a UI/UX prototype. The planned native mobile framework is Expo React Native. The MVP direction is child-only, works offline after installation, has no login requirement, and uses written reflections stored on the device. The online product follows later.

## Project files

- [Engineering documents](docs/README.md): SRS, use cases, architecture, UML, and traceability.
- [Locked v0.3 planning baseline](docs/BASELINE.md): snapshot, checksums, and revision policy.
- [Current v0.7 revision](docs/revisions/v0.7/README.md): third journey, fifteen stations, verse matching, six-item daily screen, optional participation surprises and schema 4 migration.
- [UI/UX handoff](docs/design/README.md): current screens, interactive states, design tokens, migration and browser QA.
- [Implementation plan](docs/planning/IMPLEMENTATION_PLAN.md).
- [Design package v0.7](output/design/Hayah_Tayeba_UI_UX_Design_Pack_v0.7.zip) and preserved [baseline client specification PDF](output/pdf/Hayah_Tayeba_SRS_and_UML_Client_Review_v0.3.pdf).
- Original presentation and preserved specification versions are included for project history.

## Run locally

Open `docs/design/prototype/index.html` directly in a browser, or serve the published directory:

```sh
python scripts/serve-preview.py
```

Then open `http://127.0.0.1:8761/` for the demo, or `http://127.0.0.1:8761/design/` for the board. This server supports byte-range requests for video seeking and resume.

Prototype writing and progress use browser-local storage. They are not submitted to a backend. Browser storage is specific to the browser/origin; locally saved data is not a cloud backup.

## Deployment

GitHub Pages publishes **main /docs**. `docs/index.html` opens the child demo, and `docs/.nojekyll` keeps the static files unchanged. Updating these files and pushing `main` publishes the updated preview through GitHub Pages.

The native application, final complete curriculum, and testing with children remain implementation work. The browser QA reports describe tests of the design prototype.
