# Decisions, assumptions, and open questions

Version 0.3 · 2026-09-29

## Confirmed by the user

| ID | Confirmed decision | Evidence from the conversation |
|---|---|---|
| C-01 | Children are aged 10–14. | Client revision supplied 2026-09-29 supersedes ages 8–12. |
| C-03 | Children start and complete their learning independently. | Child-only scope confirmed; no companion workflow remains. |
| C-04 | The only complete MVP door is «باب الذكر». The previous good-character/anger journey is superseded as the first release. | User explicitly confirmed Dhikr as the starting door on 2026-09-29. |
| C-05 | Light fantasy setting with everyday situations and dialogue. | User explicitly selected this direction. |
| C-06 | Mobile client uses Expo React Native. | User specified the framework. |
| C-08 | Admins can periodically add new content. | User requested this capability. |
| C-09 | Deliver one complete door: meaning, entry, practical application, continuation, reflection, and a clear end to its learning route. | Client expanded the scope from a single short topic to a complete door. |
| C-10 | Existing inputs are the presentation, original notes, and the new Dhikr concept. Final production content and application code are not supplied. | Source inventory updated 2026-09-29. |
| C-11 | Hold UI design and prepare SRS/UML first. | Latest user instruction. |
| C-12 | Arabic is the release language; the content structure must permit English later without redesign. | Explicit client revision. |
| C-13 | The child creates a character before entering the map, choosing avatar, name, appearance, color, and a personal badge. | Explicit client revision; approved asset options are a proposed implementation. |
| C-14 | Present «خريطة الحياة الطيبة» with doors and visible locks; examples include Dhikr and Allah's companionship. | Explicit client revision; non-MVP doors are previews rather than functioning curricula. |
| C-15 | The app is exclusively for children aged 10–14; the mother role and every associated workflow are removed. Content admins remain operational users. | Latest explicit user correction. |

## Proposed defaults — not yet approved

| ID | Proposal | Reason and limit |
|---|---|---|
| P-01 | Child-scoped identity/session and separate admin authentication. Exact child sign-in, guest access, and recovery method remain open. | No family account, account owner, or linked adult device is assumed. |
| P-02 | Retired: mother-approved temporary-code pairing. | Removed by C-15; not part of current access design. |
| P-03 | Retired: one mother account owns multiple children. | Child identity has no family ownership relationship. |
| P-04 | Learner records remain private to the learner; content admins manage content, not child records. | Adult monitoring/summary projections are removed. Reflection storage still awaits OQ-14. |
| P-05 | Reflection input mode is being revised: the client concept requests writing or voice; the user has not yet selected MVP modalities. | The old fixed-choice-only proposal is no longer treated as settled. Text/voice retention, backup, and access need a decision before implementation. |
| P-06 | Templates support stories, video/animation, choices with feedback, short challenges, real-life practice plans, check-ins, and reflection prompts. | Dhikr is the first authored door; no general-purpose game engine is implied. |
| P-07 | Admin console is a separate desktop web application. | Easier authoring and preview. Framework is undecided. |
| P-08 | One admin role initially; review and publication are explicit actions, possibly by the same authorized person. | No unrequested multi-role approval bureaucracy. Independent editorial review can be added if the team requires it. |
| P-09 | Immutable published content revisions; attempts bind to a revision. | Protects in-progress sessions and historical completion. Withdrawals need explicit handling. |
| P-10 | Online content access, with durable local progress and a retry queue; no full offline catalog/download manager. | Handles ordinary interruptions without claiming complete offline operation. |
| P-11 | No punitive streaks, leaderboards, spirituality scores, or another-person sign-off to advance. Optional learning XP and visual growth acknowledge participation only. | Exact XP values and reward rules in the source are examples, not finalized acceptance thresholds. |
| P-12 | Locale-neutral IDs and versioned Arabic/English language editions; Arabic is complete for launch. Child copy can use accessible Arabic appropriate to ages 10–14. | Arabic-first and future bilingual structure are confirmed; dialect and translation workflow are proposed. |
| P-13 | One backend deployment with modular responsibilities, transactional data, and separate media storage. | A starting architecture, not a selected provider or mandatory infrastructure stack. |
| P-14 | Use supported illustrated scenes and media for the complete Dhikr route. Rich custom mini-games and full animation production are separately scoped. | The supplied concepts do not imply that all media assets or game mechanics already exist. |
| P-15 | Simultaneous-device policy and replacement-session behavior remain proposed decisions under the selected child access model. | No separate mother/child device relationship exists. Cross-device recovery requires an approved mechanism. |

## Open decisions

Priority means when an answer is needed, not an instruction to ask all questions at once.

| ID | Question | Needed before | Working treatment |
|---|---|---|---|
| OQ-01 | How does the child start, sign in, and recover progress: guest/device session, account, or a defined combination? | Identity and recovery implementation | No sign-in provider, email requirement, password, or recovery-code mechanism is selected yet. |
| OQ-02 | What learner data is retained, synchronized, and visible within the child's own experience? | Data/API baseline | Private learner scope; no adult-monitoring views. Reflection modalities/storage remain OQ-14. |
| OQ-03 | Who authors and reviews educational/religious material and media usage rights? | Production content publication | Review fields exist; no reviewer authority is invented. |
| OQ-04 | Is Android first, iOS first, or both at launch? Minimum OS/device/browser support? | Build and QA plan | Expo chosen; platform release scope remains open. |
| OQ-05 | Must complete journeys work offline, or is interruption recovery enough? | Storage/media design | P-10 is the draft scope. |
| OQ-06 | Is the first release private pilot or public distribution, and in which countries? | Launch/privacy policy | No legal compliance determination made. |
| OQ-07 | Closed as removed: separate adult curriculum. | Not applicable | No content production, screens, or workflow required for that role. |
| OQ-08 | Separate content adaptations for 10–11 and 12–14, or one initial journey tested across both? | Content production | One initial version proposed; usability reviewed across ages. |
| OQ-09 | Can a child try the experience before account creation, and when must character setup occur? | Onboarding baseline | Character creation before the map is confirmed; guest access versus account-first setup remains open. |
| OQ-10 | Monetization, budget, expected pilot size, media volume, and availability target? | Hosting and operating plan | No ads, payments, or subscription system included in draft MVP. |
| OQ-11 | Account deletion, retention periods, backup retention, consent notices, and support owner? | Public release | Draft deletion behavior is specified; periods remain TBD. |
| OQ-12 | How should editorial safety withdrawals affect unfinished sessions? | Content lifecycle implementation | Stop withdrawn content, preserve records, offer another available route. |
| OQ-13 | Is seven days a suggested practice window or a compulsory completion period? | Progress rules | Proposed: seven-day invitation, no consecutive-day requirement or lost progress. Digital completion and ongoing practice remain separate. |
| OQ-14 | Which reflection modes launch: fixed choices, written text, and/or voice? Where are they stored? | Reflection implementation | Pending user response. No text or audio storage mechanism is approved by the source alone. |
| OQ-15 | Which events award XP and unlock regions, and what are the reward values? | Reward implementation | Proposed: participation only, idempotent grants, no worship-count or emotion scoring. |
| OQ-16 | Which future-door previews appear, and when is a lock actually unlockable? | Catalog baseline | Dhikr is the only full door; «معية الله» may be a clearly labeled future preview. |

## What is deliberately not a requirement yet

“بلدة طيبة” as a world name; exact palette; a particular mascot; unrestricted avatar uploads or a full character editor; a fixed lesson duration; collectible artwork; push notifications; punitive streak rules; automatic content personalization; any AI tutor; any named backend/database/cloud vendor. The earlier Stitch prompt explored several of these details and is not an approved specification.

## Tradeoffs to revisit

- A curated route is easier to author than arbitrary branching. The initial editor should allow bounded choices and explicit feedback, not a general game engine.
- Reflection collection needs a clear storage, access, and erasure policy before implementation; removing the monitoring role does not automatically resolve those data choices.
- Dynamic content reduces app releases only for supported templates and schema versions. New client capabilities need a client update.
- One shared age range lowers production cost, but usability testing may show that reading level, pacing, and visual style need variants.
- Pausing UI design is a sequencing choice. A small flow prototype may still be needed to validate access recovery and child comprehension before finalizing requirements.


## Revision history

- v0.1 (2026-09-27): ages 8–12; initial anger journey in the good-character door; fixed-choice reflection proposal.
- v0.2 (2026-09-29): ages 10–14; full Dhikr door confirmed; Arabic-first localization, character creation, and locked-door map adopted. Dhikr practice/XP concepts are mapped to proposed requirements. Reflection modes and seven-day completion policy remain explicit open decisions. The earlier PDF is retained for comparison.

- v0.3: child-only scope. C-02/C-07 are superseded; P-02/P-03 and OQ-07 are retired. FR-03/FR-05/FR-14/FR-15/FR-16 and UC-04/UC-05 remain listed as retired identifiers. The former pairing model is replaced by an access/recovery behavior model with mechanism TBD.
