# الحياة الطيبة | Hayah Tayeba

Arabic learning-app design and interactive prototype for children aged **10–14**, beginning with the complete **باب الذكر** learning direction.

- [Open the demo](https://youssefbayoumy.github.io/hayah-tayeba/)
- [Review the design board](https://youssefbayoumy.github.io/hayah-tayeba/design/)
- [Open the prototype with reviewer navigation](https://youssefbayoumy.github.io/hayah-tayeba/design/prototype/)

The current deliverable is a UI/UX prototype. The planned native mobile framework is Expo React Native. The MVP direction is child-only, works offline after installation, has no login requirement, and uses written reflections stored on the device. The online product follows later.

## Project files

- [Engineering documents](docs/README.md): SRS, use cases, architecture, UML, and traceability.
- [Locked v0.3 planning baseline](docs/BASELINE.md): snapshot, checksums, and revision policy.
- [Latest v0.4 decisions](docs/revisions/v0.4/DECISIONS.md): offline MVP, deferred login, and written reflections.
- [UI/UX handoff](docs/design/README.md): 18 core screens, interactive states, design tokens, and browser QA.
- [Implementation plan](docs/planning/IMPLEMENTATION_PLAN.md).
- [Design package](output/design/Hayah_Tayeba_UI_UX_Design_Pack_v0.4.zip) and [client specification PDF](output/pdf/Hayah_Tayeba_SRS_and_UML_Client_Review_v0.3.pdf).
- Original presentation and preserved specification versions are included for project history.

## Run locally

Open `docs/design/prototype/index.html` directly in a browser, or serve the published directory:

```sh
python -m http.server 8757 --directory docs
```

Then open `http://localhost:8757/` for the demo, or `http://localhost:8757/design/` for the board.

Prototype writing and progress use browser-local storage. They are not submitted to a backend. Browser storage is specific to the browser/origin; locally saved data is not a cloud backup.

## Deployment

GitHub Pages publishes **main /docs**. `docs/index.html` opens the child demo, and `docs/.nojekyll` keeps the static files unchanged. Updating these files and pushing `main` publishes the updated preview through GitHub Pages.

The native application, final complete curriculum, and testing with children remain implementation work. The browser QA reports describe tests of the design prototype.
