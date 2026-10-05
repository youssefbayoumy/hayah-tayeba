# Software Requirements Specification — Hayah Tayeba

Version 0.3 · 2026-09-29 · Discussion draft

## 1. Purpose and interpretation

Specify the behavior of the first usable product and its content-management capability before visual design and backend technology selection. This is a tailored SRS, not a claim of conformance to a particular standard.

**D (derived)** means a requirement directly operationalizes a confirmed user decision. **P (proposed)** means its mechanism or scope needs product approval. Both remain part of a draft. “Shall” makes the proposed baseline testable; it does not imply approval. Sources C-xx and P-xx are defined in [DECISIONS.md](DECISIONS.md).

Priority: **Must** = required for the proposed MVP; **Should** = desirable but negotiable. Items explicitly deferred are not MVP commitments.

## 2. Product purpose, scope, and success

Help children aged 10–14 explore a value, practice a response, and try a small action in everyday life. The child is the only learner-facing role; the content admin remains an operational role. The first and only complete MVP door is «باب الذكر». It covers meaning, entry, practical application, continued practice, and a closing reflection. The former good-character/anger journey is superseded as the initial release.

The product shall represent learning participation and practice, not certify spiritual growth, moral worth, or emotional health. Completion is not evidence that a child has changed behavior outside the app.

### Proposed MVP includes

- One child-facing learning experience using Expo React Native.
- Child profile setup, scoped session access, and a recovery approach to be selected before implementation.
- One complete Dhikr door with several learning stages for the child.
- A lightly fantastical map with locked doors and everyday situations, preceded by child character creation; Arabic at launch and English-ready content structure.
- Supported content templates and an admin authoring/publication workflow.
- Persisted progress, resumption, duplicate-safe synchronization, and basic recovery states.
- Authorization, accessibility, editorial provenance, and operational controls appropriate to this scope.

### Deferred

Custom game builder, free-roaming 3D world, generative AI/chat, social messaging, public child profiles, public user uploads, competitive rankings, payments/ads, full offline media library, teacher/school roles, push campaigns, and automated adaptive learning.

### Acceptance outcomes

- A child can create their character and complete the published learning route independently.
- No family link, second learner role, or companion workflow is required.
- An admin can publish a second journey using supported templates without changing the client binary.
- Existing completion and in-progress sessions remain interpretable after a routine content revision.
- A network interruption does not silently erase acknowledged progress or cause duplicate completion.

Pilot engagement and learning effectiveness need observation and a separate evaluation plan. This SRS sets no invented adoption or efficacy targets.

## 3. Actors and boundaries

| Actor | Allowed capability | Boundary |
|---|---|---|
| Child | Access their published journey, make choices, complete activities, resume progress. | No admin controls, other children's records, or public profile. |
| Admin | Author, preview, review, publish, revise, and withdraw content. | Content role alone grants no access to private learner records. |

Authentication and media services are external technical dependencies, not additional human roles. A support/operator role is not specified for MVP; production ownership must be resolved before launch.

## 4. Functional requirements

### Child profile and access

| ID | Status / priority / basis | Requirement and acceptance criterion |
|---|---|---|
| FR-01 | P / Must / C-15, P-01 | The system shall establish a child-scoped learning session and authenticate content admins separately; protected operations shall enforce learner scope and role on the server. **Accept:** one child cannot retrieve another child's data, a child cannot publish content, and anonymous requests cannot access private progress. The exact guest/account sign-in method remains OQ-01. |
| FR-02 | D / Must / C-01, C-13, C-15 | The child shall complete their own profile setup for the 10–14 age range and create their character through FR-29. **Accept:** no second-person account or device approval is required; age handling is appropriate to the supported range. Exact birth date, email, and phone are not mandatory fields until the access model is selected. |
| FR-04 | P / Must / P-01, OQ-01 | The selected child access model shall define session expiration, logout, recovery, and access on a replacement device without creating duplicate learner identities. **Accept:** revoked/expired credentials cannot access protected data; restored access retrieves only that learner's server-confirmed progress. Guest/local-only limitations must be explicit, and cross-device recovery is not promised until a mechanism is approved. |

### Child learning and progress

| ID | Status / priority / basis | Requirement and acceptance criterion |
|---|---|---|
| FR-06 | D / Must / C-04, C-05, C-09, C-14 | The child shall see «خريطة الحياة الطيبة» with the full Dhikr door and explicitly labeled published previews of selected future doors. **Accept:** the full Dhikr route is startable; teaser metadata may be visible, but draft lessons/media never leak through preview doors. A future door cannot falsely promise that more XP will open unavailable content. |
| FR-07 | P / Must / P-06, P-09 | The client shall fetch a validated, versioned content manifest and render only supported schema/template versions. **Accept:** unsupported content does not crash the client or advance progress; a suitable update/unavailable message appears. Existing supported content remains accessible. |
| FR-08 | P / Must / P-06, P-14 | Story steps shall display illustrated scenes, short dialogue, and optional narration with accessible playback controls. **Accept:** essential meaning remains available as text when audio is muted/unavailable; navigation does not depend on audio completing. |
| FR-09 | P / Must / P-06, P-11 | Choice steps shall provide authored feedback or a consequence and permit another attempt. **Accept:** each choice has a valid destination or feedback; no score of faith/character is inferred; trying another response does not erase existing completion. A required choice step completes after exploring at least one choice and its feedback, not after guessing an approved answer. |
| FR-10 | D / Must / C-03, C-15 | The child shall complete every required learning step independently. **Accept:** progression never requires another person's account, attendance, approval, linked device, or participation. |
| FR-11 | P / Must / P-06, P-11 | Real-life activities and reflections shall support deferral or skipping. **Accept:** “أجربها بعدين” and “مش حابب أجاوب” do not block the next step or completion. No proof of a real-world event is required. |
| FR-12 | P / Must / P-09, P-10 | The system shall persist the last checkpoint and required-step completion for each attempt, queue unsent progress durably, and retry safely. **Accept:** force-closing after a local save resumes at that checkpoint on the same device; duplicate event submission has one effect; the UI distinguishes pending synchronization from confirmed synchronization. |
| FR-13 | P / Must / P-09, P-11, OQ-13 | Required digital learning steps shall produce version-bound journey completion. Completion of all required stages produces door learning completion; continued practice remains separate. **Accept:** a missed day, unchanged emotion, optional reflection skip does not remove completed learning. A mandatory seven-day completion gate is not assumed. |

### Admin content management

| ID | Status / priority / basis | Requirement and acceptance criterion |
|---|---|---|
| FR-17 | D / Must / C-08 | An authorized admin shall add/edit doors and journeys and order their content. **Accept:** a second supported journey can be created, published, and retrieved by an existing client without a code change. |
| FR-18 | P / Must / P-06, C-09, C-12 | The editor shall support stories, video/animation media, choice/feedback, short guided challenges, practice plans, check-ins, reflection prompts. **Accept:** stable locale-neutral IDs, stage/path, type, completion rule, and valid template data exist for every step; unsupported game mechanics are rejected. |
| FR-19 | P / Must / P-06 | Admins shall associate images/audio/video with usage-rights notes, meaningful accessibility text/captions, and processing status. **Accept:** unsafe or unsupported file types, unfinished uploads, and missing required assets cannot be published; upload alone never makes media public. |
| FR-20 | P / Must / P-08 | Admins shall preview the child journey and supported language editions and record an editorial review before publication. **Accept:** unresolved references, unreachable required steps, missing essential alternatives, unreviewed religious quotations, and unsupported schemas block publication with specific errors. A second distinct reviewer is not required by this draft. |
| FR-21 | P / Must / P-09 | Publishing shall atomically expose an immutable revision and update the catalog pointer. **Accept:** editing live content creates a draft; a failed publish exposes no partial journey; concurrent stale edits/publishes are rejected rather than overwriting newer work. |
| FR-22 | P / Must / P-09 | Routine revisions shall preserve attempts bound to older available revisions and historical completion. **Accept:** new attempts use the current revision; existing attempts resume their revision unless withdrawn; a future optional second journey does not undo completion of the first. |
| FR-23 | P / Must / P-09 | An admin shall withdraw a published revision with a reason and explicit confirmation. **Accept:** it disappears from new-start catalog results; the next online access check blocks further delivery for bound attempts and offers an explanation; historical progress remains. The app cannot guarantee immediate revocation of already-delivered offline bytes. |
| FR-24 | P / Must / P-08, P-09 | The system shall audit authoring lifecycle changes, review, publish, and withdrawal with actor, timestamp, revision, action, and reason where needed. **Accept:** failed actions are distinguishable from successful publication; secrets and child answers are absent from audit payloads. |

### Recovery and account lifecycle

| ID | Status / priority / basis | Requirement and acceptance criterion |
|---|---|---|
| FR-25 | P / Must / P-10 | The client shall recover gracefully from network and media failures. **Accept:** a visible retry and saved checkpoint remain; it does not claim that unfetched media works offline; a failed optional media load does not permanently trap a user. |
| FR-26 | P / Must / OQ-14 | Reflection prompts shall be optional and nonjudgmental. Fixed choices are currently supported; written and voice modes remain conditional pending an explicit MVP decision and storage/access policy. **Accept:** skipping does not block completion; no reflection payload enters progress, other-user views, admin tools, or telemetry. No microphone permission or upload is introduced merely because the source suggests voice notes. |
| FR-27 | P / Must / OQ-01, OQ-11 | The system shall provide a clear, confirmed process to reset local data or request deletion of the child's own profile, as appropriate to the selected access model. **Accept:** authorization binds the action to that learner, the scope is explained, associated sessions are revoked, and remote data follows the agreed erasure policy; one child cannot delete another's data. Recovery, retention, and backup-purge timing remain open. |


### Client revision: complete door, language, and practice

| ID | Status / priority / basis | Requirement and acceptance criterion |
|---|---|---|
| FR-28 | D / Must / C-12 | The system shall ship with complete Arabic UI/content and a locale-neutral content model capable of English editions later. **Accept:** translating a test journey changes localized text/audio/captions without duplicating door, step, choice, or progress IDs; no English authoring placeholders leak into Arabic release screens. The later English launch still requires translation, review, and LTR UI testing. |
| FR-29 | D / Must / C-13 | The child's first personal setup shall offer avatar, nickname, appearance, color, and badge before showing the map. **Accept:** each choice persists after restart/authorized recovery, can be edited later, and belongs to that child. Approved presets are proposed; public profiles and personal-photo uploads are not implied. |
| FR-30 | D / Must / C-14 | Map nodes shall distinguish available, progression-locked, completed, withdrawn, and future-preview states. **Accept:** a progression lock states its reachable learning prerequisite; a future-preview lock states that content is not yet available; withdrawal cannot be bypassed by an unlock record. The entry experience opens the only available MVP door without requiring another unreleased door. |
| FR-31 | D / Must / C-09 | The MVP shall cover the whole Dhikr learning route: discover meaning, explore contextual stories, try a small practice, choose a daily moment, continue practice, and reach a closing reflection/end state. **Accept:** no required stage is an empty placeholder; admins can author and order these stages, and digital door completion is distinct from an ongoing habit. |
| FR-32 | P / Must / Dhikr source | The child shall select a daily context and associate an approved practice using a when/then plan, and collect discovered remembering moments. **Accept:** the plan survives resume, the same moment is not duplicated by retries, and no real-world location, microphone, or background surveillance is used to infer worship. |
| FR-33 | P / Must / Dhikr source, OQ-13 | A practice journal shall accept optional self-reports such as tried, remembered, or remembered without a reminder. **Accept:** a missed day is a neutral pause, not a reset; duplicate check-ins for the same plan/day update one record. Proposed seven-day windows use the chosen plan timezone; calendar/timezone rules are documented before implementation. |
| FR-34 | P / Should / Dhikr source, OQ-15 | Optional XP and visual growth shall reward defined learning/participation events only. **Accept:** retry/replay cannot farm the same reward; emotion changes and worship repetition counts never determine XP. Discovery/practice/habit labels describe participation, not verified spirituality; exact values remain to be agreed. |
| FR-35 | P / Must / C-08, C-12, C-14 | Admins shall edit localized editions, stage prerequisites, preview-door metadata, and approved practice/reward configurations through validated content tools. **Accept:** translation publication cannot alter progression IDs; missing required Arabic copy blocks release; cyclic/impossible prerequisites and unavailable-door unlock rules fail validation; user reflection content is not exposed in this editor. |

### Retired requirements retained for traceability

These identifiers are historical records, not current scope. They are not reused for unrelated functionality.

| ID | Status | Disposition |
|---|---|---|
| FR-03 | Retired in v0.3 | Two-person device pairing removed. Child access is specified by FR-01, FR-02, and FR-04. |
| FR-05 | Retired in v0.3 | Separate adult/child learning contexts removed. Only the child learns in the app. |
| FR-14 | Retired in v0.3 | Adult personal learning path removed. |
| FR-15 | Retired in v0.3 | Adult monitoring/child-summary feature removed. |
| FR-16 | Retired in v0.3 | Shared family-activity workflow removed. |

## 5. Business rules

| ID | Rule |
|---|---|
| BR-01 | The child is the only learner-facing role. There is no companion account, family link, or another-person approval gate. |
| BR-02 | Anger/sadness may be acknowledged without labeling the child's character. Completion reflects interaction with learning material. |
| BR-03 | New content uses supported templates and schemas. A new engine or game mechanic may require a new client release. |
| BR-04 | Published revisions are immutable. A draft can be rejected for review without affecting the currently live revision. |
| BR-05 | A completion record identifies learner, journey, and content revision. It remains historical after revision or withdrawal, except deliberate account erasure. |
| BR-06 | Required digital steps must be reachable. Optional/reflection/real-world steps cannot be prerequisites for required progression. |
| BR-07 | A child profile represents one learner; content admins do not inherit access to learner records. |
| BR-08 | A device credential authorizes only its scoped learner and capabilities. Nickname or avatar selection is never proof of identity. |
| BR-09 | A withdrawn revision cannot be resumed after the client learns it was withdrawn. Historical records are retained with an unavailable-content explanation. |
| BR-10 | Resume cursor and completion are different: revisiting an earlier scene can change the cursor but cannot undo completed steps. |
| BR-11 | Repeating a request with the same event identifier and payload returns the same outcome; reusing that identifier with a different payload is rejected. |
| BR-12 | Language editions share canonical step/choice IDs and completion. Translating text never resets progress or silently changes learning logic. |
| BR-13 | A locked future preview is not a progression-locked available door. All actual unlock prerequisites must be reachable in published content. |
| BR-14 | Worship counts, emotional improvement, and perfect consecutive days do not determine moral status or learning rewards. |
| BR-15 | Reward and check-in writes are idempotent. Replay cannot duplicate an award; timezone changes cannot create extra daily rewards. |

## 6. Data requirements and visibility

Conceptual entities are modeled in UML. Physical tables and a database vendor are not selected.

| Data | Minimum content | Visibility / lifecycle |
|---|---|---|
| Child profile | Learner ID, nickname, age or age band, avatar/appearance/color/badge references | Own learner only; credential or guest-session association follows OQ-01. No family owner foreign key. |
| Device session | Session ID, learner scope, expiry/revocation metadata | Scoped learner access; credentials in secure storage. Issuance/recovery method TBD. |
| Door / journey | Stable ID, age-target metadata, order, current published revision | Admin drafts private; published eligible metadata to learners. |
| Content revision / step / choice | Immutable revision ID, schema version, ordered step graph, assets, per-step rules | Readable to authorized learners only when available. |
| Attempt / checkpoint / completion | Learner, revision, cursor, completed step IDs, sequence, sync metadata | Own learner only. No raw answer history stored as progress. |
| Reflection | Optional fixed choices; text/voice modes unresolved | No other-user/admin/telemetry disclosure by default; final modality, storage, export, and erasure behavior await OQ-14. |
| Locale edition | Canonical revision ID, locale, edition version, localized copy/media, review state | Arabic required for release; English optional later; immutable published editions. |
| Practice plan / moment / check-in | Learner, approved context/practice, timezone, date, self-report | Learner-private by proposed default; no external monitoring view. |
| Reward ledger / unlock | Learner, stable reward rule/event identity, value or target | Learning participation only; no raw reflection payload. |
| Editorial review / audit event | Reviewer/admin, revision, action, time, source/rights notes | Authorized admin operations. Not a general learner activity log. |

Server progress accepts only fields needed for completion and resumption. It must not use a permissive analytics/event payload that accidentally stores child choices or reflection text. Media access must follow the same draft/published/withdrawn permissions as metadata.

## 7. Nonfunctional requirements — proposed targets

All numerical targets below are design proposals, not observed performance. Final test hardware, network profile, pilot concurrency, and deployment region must be recorded before baselining.

| ID | Category | Proposed requirement / verification |
|---|---|---|
| NFR-01 | Authorization | Enforce object-level learner isolation and role checks for every protected operation, including recovery, deletion, media preview, and progress. Verify wrong-learner and wrong-role requests across the API surface. |
| NFR-02 | Sessions and recovery | Use encrypted transport, secure credential storage, expiration/revocation, duplicate-safe issuance, and server-side abuse controls. Exact sign-in, recovery, credential lifetime, and rate-limit values depend on OQ-01 and threat review; no family pairing protocol is part of this version. |
| NFR-03 | Privacy | No ads/tracking SDKs or sensitive-answer telemetry in this MVP proposal. Review network traces and logs for session/recovery credentials, reflections, child contact data, and raw answers. Decide retention and account-erasure deadlines before release. |
| NFR-04 | Reliability | Local progress writes survive app restart once acknowledged locally. Server acknowledgment occurs only after durable commit. Retry tests shall prove no duplicate completion or backward completion regression. Explicitly label unsynced state. |
| NFR-05 | Interaction performance | Proposed target: local navigation/choice feedback starts within 200 ms at p95 on the agreed representative device. Media startup is measured separately. Do not block navigation on analytics. |
| NFR-06 | Service performance | Proposed target: metadata/progress APIs complete within 1 second at p95 at an agreed pilot load, excluding media transfer. Cold launches and large assets require their own measured budget. No capacity claim until load/device/network assumptions are agreed. |
| NFR-07 | Accessibility / language | RTL layouts, text/audio alternatives, captions where essential, non-color-only feedback, reduced-motion support, and accessible control names. Verify key journeys with screen readers and 200% text scaling without loss of actions. No standards-compliance certification is claimed. |
| NFR-08 | Compatibility | Expo React Native is fixed. OS versions, Android/iOS launch coverage, admin browser support, and device matrix remain OQ-04. A tested matrix must exist before release. |
| NFR-09 | Content compatibility | Unknown schemas/templates fail safely; publication validates supported client capability requirements. Test a currently supported client against a future unsupported revision without a crash or corrupt progress. |
| NFR-10 | Operations | Capture errors, sync failures, and publication failures with correlation IDs and no sensitive payloads. Test restore from a backup in a nonproduction environment; backup frequency, recovery objectives, retention, and operator ownership must be set before launch. |
| NFR-11 | Editorial quality | Every published journey has documented source/rights review and an age-appropriateness review by the project's appointed owner. Final religious text is reviewed before publication; this SRS supplies no approval. |
| NFR-12 | Child usability | Before release, observe children across the 10–14 range completing the key flow without coaching after setup. Record confusion, reading/audio needs, and failure to find retry/exit actions. Sample size and success threshold remain to be agreed; no untested claim that one design fits all ages. |
| NFR-13 | Localization | Validate complete Arabic/RTL content at launch and a nonpublic English/LTR fixture using the same canonical IDs. Test font growth, audio/caption alternatives, locale fallback, and unchanged progress after language switching. Do not require English content to launch Arabic. |
| NFR-14 | Practice consistency | Exercise duplicate/reordered/offline check-ins, missed days, timezone boundaries, replayed rewards, and content revisions. Records must not duplicate, reset existing completion, or turn future previews into available content. |

## 8. External interfaces

- **Child mobile app:** Expo React Native. Specific screens are design work to follow, not mandated pixel layouts.
- **Admin client:** proposed desktop web app. Writes through authenticated content operations, not direct database access.
- **Identity boundary:** establish scoped child access, authenticate admins separately, revoke credentials, and implement the selected child recovery model. Provider and login method remain open.
- **Content interface:** paginated/ordered catalog, revision manifest, capability metadata, and authorized media references.
- **Progress interface:** scoped attempt creation, version-bound checkpoint events with idempotency keys, and own confirmed-progress reads.
- **Media pipeline:** uploads, validation/processing status, published-delivery references, and withdrawal checks. Provider, codecs, limits, and signed-URL policy are implementation decisions.

No API route names, database engine, hosting platform, or microservice topology is contracted by this document.

## 9. Failure and change policy

- Expired or lost session: use the approved recovery flow; never infer identity from nickname/avatar or grant access to a guessed learner ID.
- Interrupted learning: resume locally when required cached data exists; otherwise preserve checkpoint and request connectivity.
- Routine content update: keep current attempt on its version; new attempts use the new version.
- Content withdrawal: stop subsequent authorized delivery; keep an explanatory historical record; do not claim cached bytes can be remotely erased instantly.
- Stale progress submission: merge completion monotonically, validate cursor ordering, and return authoritative state. Authorized device recovery starts from server-confirmed state when supported.
- Failed publish: keep prior live version and return actionable validation errors.
- Account erasure: stop access immediately; apply the agreed erasure/backup policy without promising a period not yet defined.

## 10. Release gate and outstanding decisions

Use [TRACEABILITY.md](TRACEABILITY.md) for acceptance scenarios. Before a public release, resolve child access/recovery, reflection privacy, launch platforms/countries, content ownership, data retention/erasure, operational ownership, and the test/device/load matrix. Content production and review are release dependencies, not assumed completed work.

SRS approval, implementation verification, and educational validation are three different milestones. None is implied by creation of this draft.
