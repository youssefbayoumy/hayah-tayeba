# v0.5 — Client revision and implemented browser preview

14 October 2026 · Child-only, ages 10–14 · Arabic · Expo React Native remains the target mobile framework.

This revision supersedes the single-door/custom-avatar assumptions of the v0.4 working design. The [frozen v0.3 baseline](../../BASELINE.md), original PDFs and historical v0.4 material are preserved. New client instructions override those historical assumptions.

## Confirmed changes

- Two selectable characters derived from the client posters; one shared choice across both journeys. Optional nickname; no MVP account, mother role or pairing.
- One shared palette: warm wood, blush pink, pale sky, pale leaf and navy. Arabic remains live interface text.
- Both Dhikr and Tazkiya / good character are available from the main map. Each journey has independent progress.
- Tazkiya has the twelve supplied stages. Unlocking is sequential within that journey.
- The supplied overview film is played as three logical segments: 0–55 seconds before stage 1; 55–115 before stage 4 (التحلية); 115–end before stage 12. The original film is not edited to reflect character selection.
- Written private reflections remain optional and local. No audio recording, emotional scoring, spiritual ranking, leaderboard or numeric XP.
- Seven-day practice is an invitation after making a plan, never a waiting gate for digital completion. Missed days do not erase progress.
- New schema migration retains existing Dhikr progress, nickname, drafts, reflections and practice history. Old avatar indices never imply a new boy/girl choice.

## Delivered now

The [browser preview](../../design/prototype/index.html?demo=1) includes all twelve Tazkiya stages, reusable interactions, real segment playback, plans, local writing, character changes and independent progress. Existing Dhikr opening-session functionality remains available and is labelled as an opening sample, not a fully authored complete Dhikr curriculum.

The overview video is not twelve unique lesson videos. Stage 3 can replay the first segment. No additional stage video is invented or promised. Activity stories and consequence wording are implementation drafts for client editorial review, not claims of religious approval.

## Product boundary

The public site needs internet to load its files. This is a static web design preview using browser storage, not an installed Expo app or proof of first-launch offline operation. No service worker, cloud account, remote admin UI, synchronization or production backend is added. Native offline packaging, final curriculum review, full video captions, child usability research and device QA remain later delivery work.

The future online product may support admin publishing and English content without replacing canonical content IDs. Existing private reflections must not automatically become cloud data.

Read [requirements](SRS.md), [data and flow models](UML.md), [design handoff](../../design/README.md), and [browser test evidence](../../design/qa/browser-report-v05.json).
