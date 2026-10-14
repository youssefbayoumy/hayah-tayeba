# Design System: الحياة الطيبة — v0.5

14 October 2026 · Client-reference revision · Child-only ages 10–14 · Arabic RTL.

## 1. Visual Theme & Atmosphere

A warm garden of discovery inspired by the supplied posters: cream paper, pale wood plaques, soft sky and leaf panels, white flowers, arched doors, and the two specific yarn doll characters. The child is the explorer. Familiar everyday situations and plain language carry the learning; the garden supplies light fantasy.

The client's character direction supersedes the earlier original-avatar style. Preserve their facial identity, golden-brown yarn hair, soft embroidered texture, boy's pale blue-trim outfit and girl's pink flower/dress. Use one selected character in both journeys. Do not mirror it or change the supplied film. Character visuals are reference-derived generated assets, not pixel-exact manual extraction; client likeness review remains appropriate.

Density 4/10, variance 3/10, motion 2/10. The Stitch taste workflow is adapted for Arabic reading and children: no Latin editorial fonts, perpetual movement, oversized web-hero conventions or asymmetric controls that harm predictable navigation. Art remains separated from text, with one main decision per screen.

## 2. Color Palette & Roles

| Token | Hex | Role |
|---|---|---|
| paper | `#FFFCF7` | Warm reading canvas |
| wood | `#FBDDBC` | Plaques, stage symbols and keepsake artwork |
| pink | `#FCEDF0` | Gentle story/rewrite panels and girl selection surface |
| sky | `#E9F3FB` | Dhikr/media panels and boy selection surface |
| leaf | `#EDF5DE` | Tazkiya, helpful feedback and selected navigation |
| navy | `#193D59` | Titles, primary actions, focus, selected outlines |
| ink | `#253E4B` | Body copy |
| muted | `#50616B` | Readable secondary text |
| edge | `#75858A` | Essential input/choice boundaries |
| green | `#35644A` | Completed steps and plant icons |
| error | `#8B3145` | Failed saves and deliberate destructive actions |

Pastels are surfaces, not text colors. Selection combines an outline, marker and semantic state. Stages use text and a check/lock symbol as well as color. No opacity-reduced body copy. Token contrast is verified in the revision QA; it is not whole-product accessibility certification.

## 3. Typography Rules

Browser stack: `Tahoma, Arial, sans-serif`, with no font fetch. Native target: bundle and verify Noto Sans Arabic before release. Display 29px/1.65 bold; page 24px/1.65 bold; section 19px/1.8 bold; body 17px/1.95; controls 16px/1.65; captions 14px/1.85. Instruction/choice text stays at least 16px. Arabic tracking is zero and text remains live and selectable. No forced uppercasing, truncated instructions or fixed-height prose. Numerals are Arabic except conventional playback time.

## 4. Component Stylings

- Primary: navy/white, 52px minimum height, 16px radius. Secondary: visible edge and warm canvas. Focus: 3px navy, 3px offset. Icon targets minimum 48px.
- Character selection: exactly two side-by-side reference-derived dolls. Sky and pink backgrounds do not restrict who may choose either one. Selected outline and check; optional 24-character nickname.
- Map: two spatially offset arched-door buttons on one garden field; labels sit on clear panels. Both doors available. No false locked preview for either MVP journey.
- Stage path: continuous vertical trail with stage number/check/lock and explanatory text. Locks reference the previous actual stage in that journey.
- Learning panel: short story above choice/task. Consequences support retry without moral scoring. Matching uses tap/select controls, not mandatory drag gestures.
- Rephrasing: optional typed exercise or authored example for each phrase. No AI grading or claims about a child's intentions. Written values persist locally.
- Media: custom play/pause, replay, mute and bounded scrubber. No autoplay. One original film, three configured ranges. On error, show retry and retain the gate. Full verbatim captions are pending; the current text alternative is explicitly a concept summary.
- Reflection: optional textarea, max 2000 characters, distinct draft/saved/failure status. Save success is shown only after commit. Failed text remains in memory with retry/continue writing/deliberate discard before navigation.
- Reward: named learning keepsake, awarded once per stage. No points, leaderboards, emotional score or claim of spiritual superiority.
- Practice: editable same-day self-report. Seven-day plan is an invitation; digital completion and prior history never reset after absence.
- Deletion/reset: native dialog, safe cancel focus, clear affected data, rollback on failed write. Individual writing deletion does not erase progress. Migration backups are cleared when writings are deleted or the learner is reset.

## 5. Layout & Arabic RTL

Phone reference 390×844; check 360/390/430. Content margins 24px (18px on narrow phones), single reading column; maximum app width 480px. Spacing 4/8/12/16/20/24/32/40. The header and bottom navigation are in document flow, never cover writing or long stories. Phone safe-area padding at the bottom. The header provides profile and settings; main tabs are الخريطة / لحظاتي / دفتر الرحلة starting at the right. Stage screens have contextual return to the journey map. Play symbols and characters are not mirrored. Dialog and keyboard order follow semantic DOM order.

## 6. Motion & Interaction

Only a 180ms opacity/4px entry transition. No continuous loops, bouncing targets, flashing rewards or time-pressure decisions. Respect system reduced motion and the saved in-app switch. Content stays available with motion disabled. Video pauses on page backgrounding; reopening does not start it unexpectedly.

## 7. Local Assets & Product Boundary

`assets/boy.png`, `assets/girl.png` are generated with the client's second poster as identity reference and genuine alpha. `assets/tazkiya-overview.mp4` is an exact copy of the supplied original. Source posters are preserved separately; do not use dense poster text as UI.

The web preview uses relative assets and browser storage, but is not promised to work offline on a first public-page visit. Expo must bundle all files/fonts and use a native local repository, then pass installed-device airplane-mode tests. Remote admin publishing and English are future product work. Stable content IDs allow those additions without altering learner identities or silently uploading private writings.

## 8. Anti-Patterns & Review Gates

Avoid dense poster layouts, pasted image text, extra invented character choices, automatic speech recording, moral meters, streak guilt, rewards for private disclosure, leaderboard comparisons and false completion on failed media/save. All twelve Tazkiya stages are implemented as reviewable interactions; editorial approval is separate. Dhikr remains an explicitly labelled introductory sample until the full curriculum is supplied. Before release, review likeness, religious wording, all video captions, usability with 10–14 year olds, system text scaling and native device behavior.
