# Hayah Tayeba - UI/UX design handoff

Prepared 2026-10-05 · First design proposal for review · Latest v0.4 offline MVP decisions

## Open the design

- [Design board](index.html): the 18 core child screens and key interaction states.
- [Clickable prototype](prototype/index.html): 21 review routes with local profile, progress, practice history, and written reflection behavior.
- [Stitch project](https://stitch.withgoogle.com/projects/12660900467156300151): 18 screen concepts plus refinement variants in the dedicated project.
- [Design system](DESIGN.md) and [tokens](TOKENS.json).
- [UX flow](UX_FLOW.md), [screen inventory](SCREEN_INVENTORY.md), and [independent UX review](UX_REVIEW.md).

Open `index.html` in a browser to review the packaged design without a server. Images, the interactive prototype, and its original SVG illustrations are local files. Browser storage restrictions are handled with an honest save-failure state.

[Generated Stitch descriptions](stitch-export/GENERATED_NOTES.md) retain the tool-generated summaries as reference text, not independent verification.

## Product direction used

Child-only, ages 10-14. Expo React Native is the future implementation target. The MVP has no login, no mother role, full installed offline functionality, one complete Dhikr door, Arabic/RTL, and written device-local reflections. Online accounts and content publication belong to later product work.

The visual direction uses warm paper, deep pine, original illustrated arches/garden paths, clear Arabic text, and restrained motion. The global destinations are **الخريطة، لحظاتي، دفتر الرحلة**; profile/settings are in the header. Future doors and reachable learning prerequisites have different explanations.

## Which artifact governs which decisions

The clickable prototype, UX flow, inventory, and token document define the reviewed interaction direction. The Stitch screens are visual studies and generated presentation references; their exported HTML is not Expo code or an offline implementation. Use the prototype's verified save/delete/reset behavior when implementing the native app.

Stitch's generated wording and static example states still need editorial/layout refinement, particularly the character labels and saved-versus-save-failed reflection example. The exported screenshots are preserved rather than presented as a verified application. The [visual review](VISUAL_REVIEW.md) records the observed issues and subsequent refinements.

## Scope of the prototype

The 18 core templates plus variants model the intended door journey. The playable prototype demonstrates an opening sample session: notification story, authored consequences, meaning, optional pause/observation, a daily moment/plan, written reflection, and an explicit session ending. It does not supply or certify the final complete educational curriculum. The full door will reuse these templates with reviewed content.

Examples and names are illustrative. No XP amounts, seven-day hard gate, worship counts, or spiritual/emotional score have been adopted. There is no automatic future upload of written reflections.

## Verification performed

[Browser report](qa/browser-report.json): 13 passing browser checks cover character preservation, future-door explanation, choice consequence resume, written draft/save/delete, sample-session progression, daily duplicate handling, reset cancellation, responsive widths 360/390/430, and storage-failure departure handling. No remote requests or JavaScript errors occurred in that offline browser run.

[Additional state captures](qa/visual-capture.json) exercise localized Arabic counters, reduced-motion semantics, safe initial reset focus, failed reflection deletion, failed reset, and preservation of unsaved text. Interactive controls inspected in the primary browser run meet the chosen 48px target minimum.

This is Chromium testing of a design prototype. Native Expo builds, real-device media playback, complete curriculum acceptance, and sessions with children have not been conducted. The UX review contains five planned usability tasks for the age range.

## Native implementation notes

- Map the local repository operations to native persistence; use stable learner/content/prompt IDs and versioned data migrations.
- Bundle fonts and each required media asset for first-launch offline operation. Keep Arabic text live, not embedded in artwork.
- Implement keyboard-safe reflection editing, truthful commit state, deletion/reset confirmation and failures, text scaling, reduced motion, and semantic RTL focus/navigation.
- Keep required digital completion separate from optional reflection and ongoing practice.
- Treat static browser screenshots and generated web HTML as design references, not a ready-to-install APK.

The locked v0.3 baseline and PDF are preserved. This handoff implements the later v0.4 design direction without locking a new requirements baseline.
