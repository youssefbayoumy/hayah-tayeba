# Hayah Tayeba — MVP screen inventory

Design working draft · 2026-10-05 · 18 reusable core screens

Read with [UX_FLOW.md](UX_FLOW.md), [v0.4 decisions](../revisions/v0.4/DECISIONS.md), and the [offline implementation plan](../planning/IMPLEMENTATION_PLAN.md). All copy below is illustrative Arabic UX copy requiring editorial review. The narrative examples do not lock final lessons or religious wording.

The bounded design set is **18 core screen templates**, plus state variants, sheets, and confirmations. Reuse story/choice/meaning/practice templates across the complete Dhikr curriculum rather than producing a unique app screen for every lesson. No login, mother, admin consumer screen, online download screen, permission request for voice recording, or password recovery is included.

## Core screens

| ID | Screen | Goal and main content | Primary action / destination | Important variants |
|---|---|---|---|---|
| S01 | **بداية الرحلة** | Brand, warm world introduction, «اكتشف أبواب الحياة الطيبة، خطوة بخطوة». Brief local-data note. | **ابدأ رحلتك** → S02 | Fresh installation; saved profile normally bypasses this screen |
| S02 | **اصنع شخصيتك** | Avatar preview; nickname; appearance preset, color, personal badge. Minimal non-personal setup. | **دي شخصيتي** → local save → S03 | No nickname; invalid length if implemented; retained setup on save failure |
| S03 | **خريطة الحياة الطيبة** | Main illustrated map with active Dhikr door, selected character, resume action, and clearly unavailable future previews such as معية الله. | **كمّل رحلتك** → saved checkpoint; first use taps **باب الذكر** → S04 | First use; in progress; completed; future preview sheet |
| S04 | **بوابة الذكر** | Selected avatar beside the door; «بالك مشغول بحاجات كتير؟ تعال نكتشف معنى الذكر». Introduce exploratory first question. | **نكتشف سوا** → S07 baseline choice → S05 | First visit; replay; returning child resumes instead |
| S05 | **عالم الذكر** | Dhikr subregion map, suggested next step, completed/available/learning-locked markers, concise learning-progress labels. | **ابدأ الخطوة** / **كمّل** → next authored step | Specific prerequisite sheet; progress save error; full learning route completed |
| S06 | **الحكاية** | Large illustrated scene or bundled video, short dialogue, narration/captions, pause/replay, scene progress. Example study notification story. | **كمّل الحكاية** → next scene / S07 | Narration muted; captions; video paused/resumed; missing required asset |
| S07 | **اختيار وموقف** | Baseline idea OR story response; 2–3 readable authored choices, then consequence/explanation. Example: «إيه اللي ممكن يساعده يرجع يركز؟» | **شوف اللي حصل**; outcome **نجرب اختيار تاني** / **نكمل** | Selection; consequence; replay; no graded red-cross failure |
| S08 | **معنى اكتشفته** | Short reviewed explanation, approved source if present, example Dhikr phrases, optional narration and source sheet. | **نجرب خطوة صغيرة** → S09 / authored next step | Source detail; audio unavailable only when optional; text scaling |
| S09 | **تجربة صغيرة** | Calm sequence of approved practice instructions. Example «خد لحظة… جرّب الذكر اللي اتعلمته». User-paced steps and optional bundled audio. | **جرّبت** / **نكمّل** → S10 | Paused; reduced motion; audio off; no forced countdown or repetition counter |
| S10 | **لاحظ تجربتك** | Optional feelings/observation choices: «حاسس بهدوء أكتر»، «ما حسّيتش بفرق»، «لسه مشتت»، «لاحظت حاجة». | **نكمل** → next step; **مش حابب أجاوب** also continues | Any response accepted; no progress gate tied to calm |
| S11 | **لحظاتي** | Everyday context map/list and chosen moments. Examples study, waking, bedtime, happiness, difficult moments. Current saved intention is visible. | **اختار لحظة** → S12; existing moment **سجّل تجربتك** → S13 | No chosen moments; one/multiple saved moments if supported; brief history |
| S12 | **خطتي للحظة** | Choose a context and reviewed Dhikr/practice option. Preview: «لما [اللحظة]، هجرّب [الخطوة]». | **احفظ خطتي** → S11 or guided route | Incomplete choice; save failure; edit existing plan; successful save |
| S13 | **سجّل تجربتك** | Saved plan plus simple self-report «جربت»، «افتكرت من نفسي»، «لسه ما جربتش». Optional return to reflection. | **احفظ** → S11; **مش دلوقتي** returns | No check-ins; already checked-in today; editing; local failure; no loss after a missed day |
| S14 | **دفتر الرحلة** | Private local list of written reflections and drafts, with prompt title and local date. | **اكتب تأملًا** or entry → S15 | Empty journal; drafts; saved entries; deletion confirmation; long text preview truncation |
| S15 | **اكتب وتأمل** | One optional reviewed prompt, multiline field, save/draft status. Final route may offer three prompts one at a time without making them required. | **احفظ التأمل** → S14/returning learning flow; **مش حابب أكتب دلوقتي** → next | Empty input; restored draft; edit; unsaved changes; save failure; text limit if defined |
| S16 | **ختام رحلة التعلم** | Completed Dhikr learning route, modest keepsake/tree, acknowledgement of exploration. «اكتشفت إزاي الذكر ممكن يبقى جزء من يومك». | **ارجع للحظاتي** → S11; **الخريطة** → S03 | Session ending vs entire-route completion clearly distinct; reflection skipped |
| S17 | **شخصيتي** | Current avatar/nickname and saved appearance options, unnumbered learning keepsakes, settings access. | **احفظ التغييرات** → originating screen | Editing; invalid nickname; save failure; no changes |
| S18 | **الإعدادات وبياناتي** | Audio/readability/motion controls as supported; local-data explanation; full reset entry. | Save settings locally; **ابدأ من جديد** → deliberate confirmation | Reset confirmation; failed settings save; reset success/failure |

## Navigation rules

S03/S11/S14 use the stable destinations **الخريطة / لحظاتي / دفتر الرحلة**. S17 is opened through the avatar with a screen-reader label **افتح شخصيتي**. Settings are S18. S05 belongs under the map; its back action returns to S03.

S06–S10 use contextual navigation, preserve the learning checkpoint, and expose **رجوع لعالم الذكر**. A plain previous arrow must have an Arabic accessible label; it follows RTL navigation conventions. Closing playback pauses media. Returning to a scene does not auto-play unexpectedly.

S15 must know its origin: opened from the journal it returns there; offered during learning it saves/skips and returns to the learning route. Save success cannot hijack navigation to a new unrelated activity.

S16 has two presentations in the same template: **انتهت جلستك** for a natural pause with saved progress, and **اكتملت رحلة التعلم** for the full required digital route. Session success must not falsely claim the entire door is complete.

## Required supporting states and sheets

These are variants of the 18 screens, not new product features or a second dashboard.

| State ID | Parent | Illustrative copy / controls | Invariant |
|---|---|---|---|
| V01 | S02/S17 | Missing nickname: «اختار اسمًا لشخصيتك». Show inline by field. | Keep avatar/customization choices; no legal-name request |
| V02 | S02/S17 | «ما قدرناش نحفظ التغييرات. اختياراتك لسه موجودة.» / **حاول تاني** | Do not show saved success until committed |
| V03 | S03 | Future preview: **باب معية الله** / «غير متاح في هذه النسخة» / **رجوع للخريطة** | No XP requirement or achievable unlock button |
| V04 | S05 | Learning lock: «تفتح المنطقة بعد [اسم خطوة منشورة]» / **اذهب للخطوة المطلوبة** | Real bundled prerequisite; reflection and emotional state never gate |
| V05 | S05/S06 | «تقدمك لسه ما اتحفظش.» / **حاول تاني** / **رجوع للخريطة** | No unlocked/completed claim based on failed save |
| V06 | S06/S08 | Required missing media: «المشهد مش متاح في النسخة دي.» / **حاول تاني** / **رجوع** | No connect/download instruction; no auto-completion |
| V07 | S06/S07 | Replay: «هتشوف الحكاية من الأول. تقدمك محفوظ.» / **ابدأ الحكاية** | Replay does not erase completion or farm rewards |
| V08 | S10 | No change selected: «شكرًا إنك لاحظت تجربتك. نقدر نكمل.» | Does not promise mood improvement or score feelings |
| V09 | S11 | Empty moments: «لسه ما اخترتش لحظة. إيه وقت مناسب تبدأ فيه؟» / **اختار لحظة** | Friendly invitation without failure state |
| V10 | S12 | «اختار اللحظة والخطوة اللي تحب تجربها.» | Intention field validation; no proof of practice required |
| V11 | S13 | Already saved today: «عندك تسجيل لليوم ده.» / **عدّل التسجيل** / **رجوع** | Avoid duplicate check-ins; history remains separate from completion |
| V12 | S13 | After pause: «الرحلة فيها وقفات. تقدر تكمل من هنا.» | No streak-loss animation, red missed-day marks, or reset |
| V13 | S14 | Empty journal: «دفترك لسه فاضي. تقدر تكتب لما تحب.» / **اكتب تأملًا** | No required reflection, reminders, or XP incentive tied to private writing |
| V14 | S15 | Empty save: «اكتب حاجة لو تحب تحفظها، أو كمّل من غير كتابة.» | No blank saved entry; skip works |
| V15 | S15 | Save: **جارٍ الحفظ…** → **اتحفظت على الجهاز** | Draft status and saved status are distinct |
| V16 | S15 | Failure: «كلامك لسه هنا، لكن ما اتحفظش.» / **حاول تاني** | Retain text; no false navigation success |
| V17 | S15 | Leave with unsaved changes: «تحب تحتفظ باللي كتبته؟» / **احفظ مسودة** / **كمّل كتابة** / **اترك التغييرات** | Save draft only exits after successful write; discard deliberate |
| V18 | S14/S15 | Delete: «تمسح التأمل ده؟ مش هنقدر نرجّعه.» / **احتفظ به** / **امسح التأمل** | Deletes only selected reflection; progress remains |
| V19 | S18 | Full reset: «ده هيمسح شخصيتك وتقدمك ولحظاتك وكتاباتك من الجهاز.» / **رجوع** / **امسح بياناتي وابدأ من جديد** | Separate deliberate confirmation; success → S01 |
| V20 | S18 | Reset failed: «ما قدرناش نكمّل المسح. جرّب تاني.» | Do not display a clean slate if reset failed; data consistency handled atomically |
| V21 | Global | Local load failure: «ما قدرناش نفتح تقدمك دلوقتي.» / **حاول تاني** | No automatic destructive reset |
| V22 | S08 | **مصدر المحتوى** sheet with reviewed source attribution | Show approved content only; no generated religious quotation |

## Content bindings for the prototype

Use fixed sample data for visual review with stable IDs. The final implementation reads a bundled reviewed manifest; the design should not imply server authoring is already available. Content-binding fields needed by these screens include:

- Journey, region, stage, and step IDs; Arabic titles and body copy; ordered progression and learning prerequisites.
- Bundled image/audio/video paths, caption/narration text, media accessibility labels, and required/optional flags.
- Authored choice labels, outcome scene IDs, supportive feedback, and next-step destinations.
- Reviewed practice instructions, selectable contexts, when/then templates, reflection prompt IDs, and source attribution.
- Profile character preset IDs, progress state/checkpoint, written draft/saved state, intention, and practice check-in history.

Private written reflection text should never be inserted into general progress messages or keepsake labels. No online publication status, backend provider, account status, location tracking, or voice capture is exposed in the child prototype.

## Acceptance checklist for design review

- The design can show fresh launch, independent setup, the complete Dhikr route, and a returning checkpoint without login or internet access.
- The main map distinguishes a future door from a reachable learning lock inside Dhikr.
- The full curriculum uses reviewed authored steps; a polished opening story alone is not labelled a complete door.
- A child can say there was no emotional change, miss a day, or skip writing and still retain learning progress.
- Required media errors, local save failures, unsaved text, delete, and full reset have clear recoverable states.
- Written reflections reopen and edit; no voice-recording control appears.
- Completion language refers to the learning journey; neither XP amounts nor compulsory seven-day windows appear.
- Arabic RTL survives long labels, larger system text, keyboard display, muted audio, captions, and reduced motion.
- Local data limitations are explained in settings; no cloud recovery or cross-device sync is promised.

