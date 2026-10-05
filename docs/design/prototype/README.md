# Local interactive design prototype

Open [index.html](index.html) in a modern browser. No installation, server, network, external images, fonts, libraries, analytics, or accounts are needed. This is a reviewable HTML design artifact, not the Expo implementation.

## What is demonstrated

- Original SVG door, map, character, notification-story, and keepsake artwork.
- Arabic RTL, children aged 10–14, a single local character with nickname, avatar shape, clothing appearance (jacket/hoodie/cap), color, and badge.
- Introductory Dhikr session: baseline idea, notification story, choice/consequence/retry, meaning, optional pause and observation, everyday intention, written reflection, and session ending.
- Three primary destinations: الخريطة / لحظاتي / دفتر الرحلة. Character/settings sit in the header; learning progress is reachable from the Dhikr region screen.
- Future معية الله preview explicitly unavailable in this version; a separate reachable learning prerequisite opens the meaning region after the story.
- Written draft autosave on input, explicit save, reopen, edit, delete confirmation, optional skip, and full data reset confirmation.
- Local practice history with one editable record per calendar date, without streak loss, XP values, faith scoring, or required seven-day waiting.

## Content and scope limits

The sample session demonstrates reusable screen types, not a complete approved curriculum. Completion means the **opening sample session** ends. The full Dhikr curriculum and religious wording need editorial review and binding to approved content. The prototype does not include genuine audio/video playback; it uses illustrated scenes with written text. The production offline app must bundle any media it needs before installation.

The desktop sidebar is outside the simulated app and exposes review shortcuts. Those shortcuts can bypass normal flow for visual inspection. The app’s finish action still checks that its sample story, meaning, and everyday plan were explored. Preview data is stored separately from future Expo data under browser-local key `hayah-tayeba-design-preview-v1`.

## Review routes

`welcome`, `character`, `map`, `door`, `baseline`, `regions`, `story`, `choice`, `outcome`, `meaning`, `pause`, `observation`, `moment`, `plan`, `journal`, `notebook`, `reflection`, `complete`, `progress`, `profile`, `settings`.

These 21 review routes include variants of the 18 core templates in [SCREEN_INVENTORY.md](../SCREEN_INVENTORY.md): baseline/story choices use one choice template, choice/outcome are two states, moment/plan use intention templates, and progress is a learning overview variant.

## Useful checks

1. Fresh start → blank nickname validation → customize → map → Dhikr → baseline → regions.
2. Try the learning lock before the story; compare it with the future-door sheet.
3. Follow story → every choice outcome → retry → meaning → pause or skip → observation → moment → plan → reflection or skip → session ending.
4. Type a draft without pressing save, navigate away, reopen, and reload. Then explicitly save, edit, and delete it. Confirm other prompts and progress remain.
5. Record a practice twice on the same day: the second action edits today’s record after confirmation instead of duplicating it.
6. Reload and use “كمّل رحلتك” to resume the last learning checkpoint; verify character and written text remain.
7. Cancel full reset, then confirm it and verify a fresh welcome screen.
8. Test 390px and 320px viewports, keyboard focus, reduced motion, and long Arabic input.
9. Simulate browser storage write failure: save actions must avoid a false success or destructive navigation; the written draft stays available in memory. This web artifact’s behavior is not proof of Android storage behavior.

Private browser data survives ordinary reloads but not storage clearing. No cross-device recovery or cloud backup is promised.
