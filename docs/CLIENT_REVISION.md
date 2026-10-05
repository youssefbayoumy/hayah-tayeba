# Client revision and complete Dhikr door

Version 0.3 · 2026-09-29 · Review draft

## Change summary

The client changes the audience to **10–14**, expands the first release to **one complete door**, confirms **Arabic first with an English-ready content structure**, and places **character creation before the locked-door map**. The product owner has explicitly confirmed **«باب الذكر»** as the first door, replacing the former anger journey inside the good-character door.

The latest correction makes the app exclusively for children aged 10–14. The mother role, curriculum, monitoring, shared activities, and family/device linking are removed. Content admins remain operational users. Expo React Native and periodic admin content updates remain in scope.

## Source interpretation

The new Dhikr note is a content/design proposal. Its English dialogue is reference copy to adapt into Arabic, not a bilingual-launch instruction. Its example XP amounts, seven-day window, ten-second practice, and ten-minute opening are not finalized engineering targets. Written and voice reflection modes require an explicit scope and data-handling decision. Religious wording and learning-effectiveness claims still require editorial review.

The written/voice-reflection choice has been raised with the product owner and remains pending. v0.3 documents that request instead of silently retaining the previous fixed-choice-only proposal or automatically introducing audio uploads.

## Full door structure proposed for the MVP

| Stage | Child experience | Completion meaning |
|---|---|---|
| 1. Character and entry | Select avatar, nickname, appearance, color, and badge; enter «خريطة الحياة الطيبة»; open the Dhikr introduction. | Setup and entry participation, not an assessment. |
| 2. Discover meaning | A familiar distracted-study situation leads into choices, explanation, and an editorially reviewed religious source. | Explore the meaning through authored scenes and feedback. |
| 3. Try a practice | A short guided pause and approved Dhikr example; feedback may include little or no change in feeling. | Participation, never emotional success or worship quantity. |
| 4. Choose a moment | Discover everyday contexts and create one when/then plan. | A chosen practical intention; no proof of real-world worship. |
| 5. Continue | Suggested seven-day journal with optional tried/remembered/remembered-independently check-ins. | Practice history distinct from digital learning completion; pauses do not erase progress. |
| 6. Pause and reflect | Consider when it was easiest, hardest, and where to continue. | Optional response, explicit end of the learning route, and invitation to continue. |

Each stage must contain real reviewed content in the MVP. “Complete door” does not mean unlocking every future door or proving lifelong habit formation. Final stage count, mission count, duration, and content-production ownership require editorial sign-off.

## Disposition of the supplied concepts

| Concept | Treatment in v0.3 | Engineering consequence |
|---|---|---|
| Child as hero / custom avatar | Confirmed setup direction | Persist preset appearance/color/badge choices; use the selected child access model. |
| Map and locked doors | Confirmed direction | Separate progression locks from unavailable future previews; only Dhikr has a complete curriculum. |
| Door, Discover, Missions, Garden, Quiet Place | Proposed regions inside Dhikr | Governed stage/region metadata and reachable prerequisites; art/names remain editable. |
| Notification story and choices | Included as a content pattern | Authored branching feedback; no punitive right/wrong framing. |
| Religious text introduced through story | Included with editorial review | Record sources and translation review; no unverified quotation auto-publication. |
| Short practice and emotional check-in | Included as a proposed interaction | No required improvement in mood; feedback does not claim treatment or guaranteed calm. |
| Find three moments, choose one | Proposed practice activity | Approved context catalog and when/then plan; three is an editable instruction, not a universal system constraint. |
| Seven-day journal and pauses | Proposed continuation design | Calendar-aware, duplicate-safe check-ins; mandatory seven-day gating remains OQ-13. |
| Learning XP | Proposed, optional MVP capability | Reward ledger, one eligible award per event, no worship-count or emotion scoring. |
| Growing tree / discovery-to-practice progression | Proposed visual representation | Derived from participation states; no claim to measure faith or prove a habit. |
| Omar, Mariam, Youssef, Lina | Illustrative characters | Names, personalities, scenes, and translations are authored content, not hard-coded accounts. |
| Secret heart/gratitude/difficult-moment doors | Proposed Dhikr subregions | They do not add complete independent curriculum doors to the MVP. Only reachable learning prerequisites may unlock them. |
| End-of-journey reflection in text or voice | Requested concept; modality decision pending | Storage, privacy, microphone handling, retention, and deletion depend on selected modes. No transcription/AI interpretation implied. |
| First ten minutes | Suggested opening storyboard | Not a fixed session-duration requirement; final pacing is tested with ages 10–14. |
| Remembering moments map | Proposed practice feature | Save personally chosen contexts without GPS, passive sensing, or worship surveillance. |
| English wording in the note | Reference only | Arabic release copy; later reviewed English editions share canonical content/progress IDs. |

## Arabic copy direction — illustrative, not final curriculum

- Map: «خريطة الحياة الطيبة».
- Main door: «باب الذكر».
- Example practice intention: «لما أستعد للنوم، هفتكر الذكر اللي اخترته».
- After a pause: «الرحلة فيها وقفات. تقدر تكمل من هنا».
- Future preview: «هذا الباب سيُضاف لاحقًا».
- Reflection can be skipped: «مش حابب أجاوب دلوقتي».

Dialect, exact devotional wording, religious explanation, and age suitability require review by the project's appointed content owner. Ordinary anger and distraction may appear as situations inside Dhikr; that does not restore the former good-character door as a second MVP door.

## Main unresolved choices

1. Written/voice/fixed-choice reflection modes and storage/access policy (OQ-14).
2. Whether seven days is only an invitation or a compulsory completion condition (OQ-13).
3. Exact reward values and unlock rules (OQ-15).
4. Editorial review and asset-production responsibilities for the child curriculum (OQ-03).

Earlier open decisions about authentication, launch platforms, offline access, distribution, and retention also remain active. The earlier PDFs are preserved as v0.1 and v0.2; this revision replaces it for current review.


## Scope removed in v0.3

The mother is no longer a product actor. There is no account for that role, no second learning track, no monitoring report, no shared-activity workflow, and no mother-approved pairing. These features are removed rather than merely hidden in the interface. The architecture, data model, authorization paths, use cases, and acceptance mapping are revised accordingly.

The exact child access and recovery mechanism remains open. Removing a role does not silently choose guest access, passwords, email, or automatic cross-device restoration.
