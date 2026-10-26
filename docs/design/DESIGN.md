# Design System: الحياة الطيبة — v0.7

26 October 2026 · Existing garden identity retained · Arabic RTL · Child-only ages 10–14.

## 1. Visual Theme & Atmosphere

A richly illustrated garden adventure: original yarn characters, flowers, lanterns, arched doors, parchment plaques and a treasure chest. Use the supplied collage pixels, not generated approximations. The theme applies to the entire demo, including Dhikr and shared screens. Dhikr's learning content remains its existing opening sample.

The second journey has three gardens: التخلية، التحلية، التزكية. The third is باب معية الله, with fifteen stations, a faith/good-deeds chapter and daily practice. Both keep the existing identity. The newly supplied blue/gold images are content references only. Activities do not rate a child's inner state. Density 4/10, variance 3/10, motion 2/10.

Adaptation of the Stitch design workflow: the client's pink/green/purple identities and original luminous key artwork override its one-accent/no-purple style defaults. Arabic shaping, predictable interaction and reduced motion override Latin headline, asymmetric web-hero and perpetual-animation prescriptions. No extra animation glow is added to the supplied art.

## 2. Color Palette & Roles

| Token | Hex | Functional role |
|---|---|---|
| paper | `#FFF5DA` | Warm parchment canvas |
| wood | `#F6D39B` | Wooden plaque/panel surface |
| pink | `#F9D6DC` | Neutral answer surfaces, before feedback |
| sky | `#DDF0E4` | Soft garden supporting surface |
| leaf | `#E5EDC7` | Gentle green surfaces |
| navy (legacy name) | `#5B2D1C` | Deep wood-brown titles and icons |
| ink | `#38281E` | Body copy |
| muted | `#685243` | Supporting text |
| edge | `#937951` | Essential input/choice borders |
| green | `#325F31` | Suggested-action feedback and completed markers |
| error | `#8B173D` | Save failures and deliberate deletion |
| accent | `#B91451` | Vivid deep-pink primary actions, readable with white text |
| purple | `#703392` | Third-garden identity and keyboard focus |

Artwork keeps its exact source colors. UI colors follow those families, calibrated for legibility rather than using arbitrary photograph averages. Never reveal the lesson's suggested answer through green coloring before selection. Pink is not a failure signal. A suggested response receives a green explanation panel; other responses receive supportive parchment feedback without red-cross judgment of feelings.

## 3. Typography Rules

Browser stack `Tahoma, Arial, sans-serif`; no external font request. Native target remains bundled Noto Sans Arabic after device verification. Main plaque headings 25px/1.65 bold, section/question headings 20px/1.9, body 17px/1.95, choices/buttons 16px/1.8, captions generally 14px. Arabic tracking is zero. All questions, explanations, numbers and controls are live HTML, independently readable from artwork. Avoid image-based answer text, fixed-height prose or truncated instructions.

## 4. Component Stylings

- **Plaques:** parchment/wood gradient, restrained inset edge, brown live title, 22px radius. Shallow depth follows the source plaques; controls never rely on image text.
- **Primary actions:** deep pink with white text, minimum 52px height, 16px radius, visible pressed/disabled states. Secondary actions use parchment and a visible brown border. Keyboard outline 3px purple.
- **Original scenes:** lossless PNG crops above questions. They omit source question/answer panels and misleading numbering. No AI repainting, upscaling or invented detail. Crop resolution is the original collage resolution. Maps use separate live labels instead of screenshot hotspots.
- **Character setup:** exactly two source-image portraits, same stable boy/girl IDs and optional nickname. Fixed original scenes may contain both characters regardless of the selected profile.
- **Garden overview:** three illustrated garden panels and a three-key collection inside the second journey. Home has three main journeys. Ma'iyya uses three chapter headings and an ordered station path in the same garden theme.
- **Challenge:** live topic/number, original scene, one scenario and three neutral pink choices. Selecting any response shows its explanation and enables Next. Retrying is optional. No lives, score deductions or completion gate tied to the suggested response.
- **Progress:** five labelled exploration markers; a key is awarded once after five challenges. A repeated visit cannot farm progress. Three keys open the treasure ending.
- **Media:** custom play/pause, replay, mute and bounded scrubber. No autoplay. Existing one-film ranges introduce the three gardens. Missing media and failed completion writes retain the gate. Concept summaries are explicitly not verbatim captions; full captions remain pending.
- **Diary:** optional private writing, 2000-character limit, truthful draft/save/failure states. Old source titles remain independent of retired stage screens. Failed text stays available with retry, continued writing or deliberate discard.
- **Practice:** optional plan editor independent of the old stage 12. Daily self-report edits the same date after confirmation; missed days do not erase learning.
- **Ma'iyya matching:** live verse/excerpt, reference and context, then three doors and a practical question. Correct educational associations open the gate, with unlimited retries. Suggested narrative responses remain exploratory; matching never claims to grant divine favor.
- **Daily screen:** six editable private checkboxes, 0/6 explicitly labelled as self-reported steps. Returning Ma'iyya participants land here with continue/map actions. Optional triangles give ordinary random suggestions; dice reveal one saved virtual participation keepsake per date, independent of prayer reports.
- **Timer:** optional two-minute practice with a visible countdown, start/pause/reset and persisted remaining time. Background/navigation pauses it. It never gates progress or measures worship/attention.
- **Profile/reset:** current keys and Dhikr keepsakes are separate from a collapsible previous-journey archive. Note deletion and whole-learner reset have distinct confirmations and preserve data on failure.

## 5. Layout & Arabic RTL

Phone reference 390×844; verify 360/390/430. Content margins 24px, 18px on narrow phones; maximum app width 480px. Rich art and live parchment text have distinct zones. Natural scrolling keeps explanations/editors usable. Header and navigation remain in flow. Destinations are الخريطة / رحلتي اليوم / لحظاتي / دفتر الرحلة, starting at the right. Contextual back returns to garden, journey or originating diary screen. Play, photos and characters are not mirrored.

## 6. Motion & Interaction

Only the existing brief entry transition, using opacity/transform. Honor system and in-app reduced motion. No perpetual loops, flashing answer marks, timed decisions or guilt effects. Touch targets at least 48px; choices at least 59px. Backgrounding pauses video; returning does not autoplay.

## 7. Assets & Delivery

`assets/gardens/manifest.json` records original file, crop rectangle and output dimensions for all 26 assets. The four source boards are preserved under its `references/`. Images 1–3 define the questions; image 4 provides welcome/overall visual material only. The unchanged original MP4 is reused, with cuts at 55 and 115 seconds.

The static browser demo needs initial network access and uses local browser storage. Expo still needs bundled files/fonts and standalone airplane-mode device acceptance. No backend, account, analytics, live admin publishing or reflection upload is introduced.

## 8. Anti-Patterns & Review Gates

Never copy full answer-key screenshots into an interactive question, reveal correct choices before interaction, assign moral scores, penalize emotions, discourage trusted help, condemn ordinary recreation, equate a treasure with measured spiritual worth, reset old data silently or mislabel old progress as new completion. Do not mix the twelve alternative questions from image 4 into the approved fifteen. Review original-art crops, Arabic copy, saved/failed states, archive editing, video ranges, keyboard focus and narrow screens before publishing.
