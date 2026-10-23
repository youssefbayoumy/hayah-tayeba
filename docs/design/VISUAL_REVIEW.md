# Initial Stitch visual review

Reviewed 2026-10-05. This review covers the initial three exported Stitch screens, not the complete Expo app or the separate interactive prototype. Screens are design drafts requiring the changes below.

## Evidence and limits

| Screen | Export ID | Actual local PNG |
|---|---|---|
| S03 · Map | `84b61bbcde554540858d5c9fbac0933d` | 133 × 512 |
| S02 · Character | `ba890afbc37043d7b7fbafbf5088a769` | 130 × 512 |
| S15 · Written reflection | `f7416f11c9854e678106a8b1e0a9a0e3` | 211 × 512 |

The local images are downscaled thumbnails rather than the full source screenshots. Stitch source dimensions supplied to the orchestrator were 780 × 3010 / 3076 for the first two screens. At a 390 px logical width these represent roughly 1505 / 1538 px of vertical content. The thumbnails show overall hierarchy; HTML was also inspected to identify exact labels, target sizes, type sizes, ordering, and remote dependencies. A full-size render is still required for final typography/clipping QA. No artwork was edited during this review.

## What works

- Paper/pine colors and arch imagery are consistent across the three screens. The style is calm and avoids preschool candy colors.
- Map navigation has the agreed three destinations in RTL order: الخريطة، لحظاتي، دفتر الرحلة. Profile/settings are in the header.
- Main actions have adequate height (52–54 px) and consistent emphasis. Selected rows combine fill, stroke, and a check icon.
- Artwork and explanatory text usually have separate regions. The reflection screen is the clearest and most focused of the three.
- Reflection is written, optional, and paired with an explicit local-save message. No login, parent path, microphone, or recording UI appears.
- The future door explicitly says it is unavailable in the current version. This protects against suggesting unpublished content is unlocked through points.

## Priority changes before approval

### P1 · Map: put the usable journey first

The complete unavailable “باب معية الله” illustration, label, explanation, and trail occupy the top of the map before the available Dhikr door. The sole “كمّل رحلتك” action is far down the page. This reverses the MVP hierarchy and makes a child scroll through unavailable content to find the task.

Revise: place the available Dhikr door and start/resume action in the first phone viewport. Keep the garden map concept, but make معية الله a smaller distant preview. A compact map with a stable action row or compact first-viewport journey plaque is preferable to two vertically stacked door cards. Use “ابدأ رحلتك” for a new profile and “كمّل رحلتك” only when resumable progress exists.

### P1 · Character: deliver avatar creation, not a personality assessment

“المستكشف الهادئ”، “المتأمل الصبور”، and “المبادر النشيط” are abstract personality labels introduced by generation. They do not select an illustrated avatar, and imply a behavior-based identity before the child explores the content. The requirement is an avatar, name, look, color, and badge.

Revise: show 3–4 actual illustrated avatar options with a live, sufficiently large preview. Replace disposition rows with avatar visuals. Keep outfit/color/badge options compact or move optional customization to a second step. Do not introduce new personality mechanics. The current preview contains excessive blank arch space and a tiny portrait in the thumbnail; character art should occupy its own frame prominently. Provide appealing choices across the 10–14 range rather than a single default male explorer.

### P1 · Reflection: make state truthful and failures visible

The saved-state mockup shows “تم الحفظ على الجهاز” plus a save button, but does not specify how that status changes when text is edited. “صفحة محفوظة شخصياً” inside the writing area also creates an unconditional saved impression.

Revise: distinguish draft/changed, saving, saved, and save-failed states. On edits, stale saved status must clear. Keep unsaved text if saving fails; show retry and explain unsaved navigation. The source is a static mockup, so its default prefilled child response is sample UI data rather than actual durable saved data. In first-use UI the field starts blank.

## P2 · Copy and comprehension

- Remove map badge “نسخة الميدان”; it is unexplained implementation/prototype language.
- Replace future-door explanation “تكتمل في التحديث القادم” with neutral availability text; next-update delivery is not promised. “غير متاح في هذه النسخة” is sufficient.
- Remove repeated offline/system explanations on normal learning screens. Character copy “ملفك محفوظ محلياً...ولا يحتاج إلى حساب خارجي” and reflection chip “ملف شخصي غير متصل” distract from the task. Keep a simple “الحفظ على جهازك” explanation in settings and truthful save feedback where relevant.
- Remove “غير مقيّد بطول”: a limit has not been agreed and unrestricted text is not an established product requirement. A quiet “اكتب بالقدر اللي يناسبك” is a suitable invitation without promising unlimited storage.
- Make prose more direct. “علاقة القلب بالألفاظ الكريمة” and “استمع لصوت الأثر” feel abstract for a 10-year-old. Educational content wording must come from the reviewed curriculum; design-generation copy is not final religious content.
- Reduce optional helper text and quote blocks. The art can supply atmosphere while the page tells the child clearly what to do.

## P2 · Accessibility and interaction

- Character back control is 40 × 40 px; swatch buttons are 40–44 px. Reflection close and delete controls have no 48 px minimum. Expand their actual targets while keeping restrained visual glyphs.
- Map labels/chips use 11–12 px text. Secondary captions may be 14 px, but key availability instructions should use at least 16 px. Avoid small grey text as the only explanation.
- Reflection uses sand/stone text for “غير مقيّد بطول” / “صفحة محفوظة شخصياً”; these illustration tokens are inappropriate for meaningful text. Use the tested secondary text token.
- Character option buttons need semantic checked state; a drawn check icon alone is not screen-reader state. Source markup currently uses ordinary buttons without `aria-pressed` or radio semantics. The native implementation needs equivalent accessibility states.
- Source viewport disables user zoom. Remove this from web deliverables. Native implementation must retain font scaling.
- Map’s active-dot `animate-pulse` is perpetual. Remove or stop it quickly; add reduced-motion behavior. The child does not need moving status decorations.
- Story/reflection footer behavior still needs keyboard-height testing, unsaved-exit checks, and safe-area testing. Static exports do not prove those behaviors.

## Offline implementation boundary

All three exports load remote Tailwind, Google Fonts, and Material Symbols; the character art uses a remote image URL. These are design-source dependencies, not an acceptable offline runtime. The self-contained prototype/Expo implementation must use local CSS or native styles, local icon assets, bundled fonts/media, and no first-use fetch. Exported HTML should not be described as an offline native implementation.

## Recommended Stitch refinement sequence

1. Rework S03 hierarchy: active Dhikr in first viewport; smaller future preview; concise copy; no technical badges or pulse.
2. Rework S02: real avatar thumbnails and larger preview; compact selection groups; remove personality mechanics; 48 px targets.
3. Retain S15 composition while correcting save states, removing technical/limit claims, improving text contrast, and enlarging close/delete targets.
4. Render revised screens at full phone width before signoff. Check 360/390/430 px, Arabic font rendering, text scaling, and real content states. Then continue generation using the refined patterns.
# Current revision notice

The review above is historical v0.4 evidence. Current v0.6 captures in `screens/v0.6/` were visually reviewed for original client scene crops, parchment/wood surfaces, vivid pink controls, three garden identities, live Arabic and 360/390/430 layouts. The new [crop manifest](prototype/assets/gardens/manifest.json) records exact source pixels; [integrity evidence](qa/asset-integrity-v06.json) checks asset/contrast preservation. Crops retain supplied collage resolution. Full captions and native accessibility remain release review work.
