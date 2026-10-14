# SRS addendum v0.5

Current working scope, 14 October 2026. Historical requirement IDs remain in the frozen baseline; the following revision IDs specify the changed preview and intended MVP behavior.

| ID | Requirement | Implemented preview acceptance |
|---|---|---|
| V05-01 | Child-only, ages 10–14, Arabic; no MVP login or mother role. | Setup opens directly and asks only for a character and optional nickname. |
| V05-02 | Select exactly one of two client-reference characters; share it across journeys. | Boy and girl appear in setup and learning; changes preserve all journey progress. |
| V05-03 | Shared poster palette and live RTL text. | Wood `#FBDDBC`, pink `#FCEDF0`, sky `#E9F3FB`, leaf `#EDF5DE`, navy `#193D59`; no text baked into interface artwork. |
| V05-04 | Both journeys are initially available, without cross-journey prerequisites. | Map opens both doors; completing Tazkiya does not mark Dhikr stages complete. |
| V05-05 | Tazkiya has the twelve client-defined stages with actual authored interactions. | All twelve are navigable in order and each has its specified learning badge. |
| V05-06 | Three ranged video gates use one supplied original film. | Segments 0–55, 55–115, 115–end precede stages 1, 4, 12 respectively. Playback, seeks, replay and resume stay in the current range. |
| V05-07 | Required media errors and failed persistence cannot unlock a stage. | Continue remains disabled on missing video; failed video/progress commits never award completion. |
| V05-08 | Replay and repeated taps do not duplicate stage badges. | Completed stage IDs and badge IDs are unique per journey. |
| V05-09 | Reflection is written, optional, private and local. | Draft/save/reopen/edit/delete/skip work; journal identifies journey and stage. No outgoing reflection requests. |
| V05-10 | A failed write preserves text and guards navigation. | Editor retains typed text; offer retry, continue writing, or deliberate discard of unsaved changes. |
| V05-11 | Practice records are daily self-reports with no punitive streak reset. | A second record on the same local date asks to edit; older records remain. |
| V05-12 | Seven-day plan contains virtue, behavior to improve, daily good act and short reflection. | Plan is saved in stage 12; digital completion does not require seven elapsed days or proof of real-life practice. |
| V05-13 | Preserve v0.4 browser-local data. | Migration keeps nickname, earned Dhikr milestones, practice, drafts and notes; character remains unset until selected. Corrupt/unknown data is not overwritten. |
| V05-14 | Delete a note separately from learner reset. | Confirmations protect notes; reset clears both store and migration backup only after successful storage operations. |
| V05-15 | Content and learner state are separate. | `content.js` has stable canonical IDs, templates, text and media bindings; `store.js` owns schema/version/transactions; `app.js` presents the journey. |
| V05-16 | Completion does not measure faith, feelings, sincerity or superiority. | No numeric moral scores, penalties for feelings, rankings or rewards for exposing personal writing. |

## Stage inventory

| Stage | Title | Interaction | Badge |
|---|---|---|---|
| t1 | اكتشف بوصلتك | Intro film, choose a behavior, optional writing | مستكشف القلب |
| t2 | مرآة النفس | Pick a familiar situation and consider feeling/action/next step | مفتاح الوعي |
| t3 | نظّف نافذة القلب | Seven short trait stories; reveal behavior, harm and repair | نافذة أكثر صفاءً |
| t4 | ازرع بذرة الخير | Film 2; five behavior-to-virtue matches | بذرة الخير الأولى |
| t5 | كن صادقًا وشجاعًا | Broken-object scenario, consequences and retry | وسام الأمانة |
| t6 | قلبك يتّسع للآخرين | Choose a helpful real-life invitation | وسام القلب الرحيم |
| t7 | قوّة التسامح | Respectful boundaries, forgiveness and trusted help | وسام الحِلم |
| t8 | سحر الكلمة الطيبة | Three rephrases, or authored examples; no automated writing grade | وسام الكلمة الطيبة |
| t9 | ابتسامتك صدقة | Select a small welcoming act | وسام البشاشة |
| t10 | كن داعية بأخلاقك | Advice scenario and consequences | وسام الحكمة |
| t11 | وقفة مع النفس | Three optional reflective questions | مرآة التقدم |
| t12 | عِش الحياة الطيبة | Film 3, seven-day plan, closing invitation | حارس الحياة الطيبة |

Selecting a story/choice demonstrates participation; it does not establish that the child acted that way in real life. Rephrasing has authored examples, not AI judgment. All feelings are accepted. Reflection and real-life execution never gate stage completion.

## Deferred delivery and review

Expo implementation must bundle assets and reviewed Arabic fonts for first installed launch in airplane mode. A native local repository can implement the same domain contracts, but browser localStorage is not a production native database. Online accounts, publishing, remote media, admin workflows, synchronization/conflict resolution and cloud consent are deferred. Complete Dhikr curriculum, religious copy validation, full captions/transcript and age-range usability approval are still needed before product release.
