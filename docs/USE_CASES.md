# Use cases

Version 0.3 · All mechanisms marked P in the SRS remain proposed.

## UC-01 — Start or resume the child's own profile

**Actor:** Child. **Requirements:** FR-01, FR-02, FR-04, FR-29. **Decision dependency:** OQ-01/OQ-09.

1. The child opens the app and starts profile setup or resumes authorized access to an existing profile.
2. The system establishes the child-scoped session through the selected guest/account mechanism. The mechanism is not selected in this draft.
3. The child supplies age-band information and chooses their own avatar, nickname, appearance, color, and badge before entering the map.
4. Profile settings and learning progress are saved within that learner's scope.
5. Later entry resumes valid access or offers the approved recovery flow.

**Failures/alternatives:** expired credential requires renewal/recovery; a nickname match is not identity proof; failed recovery never opens a different learner's record. A local-only guest may lose unsynced data after app removal or device loss; limitations must be explained if that model is chosen.

**Postcondition:** the child reaches their own map without a second account or linked person's device. A content admin uses a separate authenticated route.

## UC-02 — Explore the first child journey

**Actor:** Child. **Requirements:** FR-06–FR-11. **Preconditions:** authorized session, published supported content available.

1. Child completes their own character setup, enters «خريطة الحياة الطيبة», and opens the available «باب الذكر» entry experience.
2. Service selects an available revision and creates/resumes a bound attempt.
3. Child views an illustrated scene; narration is optional and core meaning is readable.
4. Child explores a choice and its authored consequence.
5. Child may try a different response and continues after the step's participation criterion is satisfied.
6. Child sees a real-life activity and may defer it; reflection is optional.

**Alternatives/failures:** unsupported schema → explanatory state with safe return; missing required media → retry without losing checkpoint; optional media failure → text alternative; distressing/repeated-mistreatment scenario → authored trusted-adult guidance, not a diagnostic or emergency service.

**Postcondition:** the child has a meaningful next action and saved learning checkpoint. No moral score is generated.

**Dhikr content is provisional:** a notification interrupts study; the child explores a reconnecting choice, discovers the meaning of Dhikr through a story, and tries a brief guided practice. The app accepts “not much changed” without grading emotions. Final Arabic copy, religious references, pacing, and assets require review.

## UC-03 — Save, resume, and complete learning

**Actor:** Child. **Requirements:** FR-12, FR-13, FR-22, FR-25, FR-26.

1. App records the current checkpoint and completion evidence locally using a unique event ID and attempt revision.
2. App marks unsynced progress as pending and submits allowed progress fields to the service.
3. Service checks learner scope, revision availability, step identity, event uniqueness, and sequencing.
4. Service atomically records the event and merges completed steps without regression.
5. Service determines completion from the bound revision's required-step rules and returns confirmed state.
6. App acknowledges synchronization and can resume at the saved checkpoint on later entry.

**Alternatives/failures:** duplicate request → same result; same event ID/different payload → reject; connection loss → durable queue; force-close → restore local checkpoint; stale cursor event → retain newer cursor; a deliberate later replay of an earlier scene → allow newer cursor while retaining completion; withdrawn revision → stop new content access, retain historical records, show explanation.

**Postcondition:** progress is either explicitly pending locally or committed on the server. A second device cannot see progress that has never reached the server.

**Privacy:** choice feedback is processed from authored content; raw choice histories and optional reflection answers are not progress payloads. Completion evidence contains step IDs/statuses, not free-form answers. The server is not certifying real-world behavior.

## UC-06 — Author, review, and publish new content

**Actor:** Admin. **Requirements:** FR-17–FR-21, FR-24.

**Preconditions:** admin authorization, supported templates known; no learner-data access implied.

1. Admin creates a door/journey or a draft revision of an existing journey.
2. Admin assigns child learning paths, stable step IDs, ordering, template data, media, and completion rules.
3. Media is uploaded privately; processing and rights/accessibility metadata are checked.
4. Admin previews the child path and locale editions and records editorial review, including sources where applicable.
5. Validator checks schema, assets, references, reachable required steps, optionality rules, and supported client capabilities.
6. Admin explicitly publishes using the expected current draft version.
7. Service atomically freezes the revision, changes the live pointer, and records an audit event.
8. Existing compatible clients see the new journey on the next catalog refresh; already open sessions are not forcibly navigated away.

**Alternatives/failures:** invalid data/unreviewed material → actionable errors; stale draft version → reload/reconcile; publication failure → previous live version remains; upload alone → remains private; same publish operation retried → one published revision and one effective publication action.

**Postcondition:** a complete revision is live. No app update is needed for content using already supported templates; no arbitrary game-engine creation is implied.

## UC-07 — Revise or withdraw content

**Actor:** Admin. **Requirements:** FR-21–FR-24.

**Routine revision:** clone live revision to a new draft → review/validate → publish. Existing attempts remain bound to the older available revision. New attempts use the current one. Old completion remains historical.

**Withdrawal:** admin chooses an exact revision → provides reason → confirms scope → service marks it withdrawn and invalidates new delivery access. Bound attempts receive an unavailable state on their next authorization/content check. Their records are not erased.

**Alternatives:** no replacement available → honest unavailable state, no fake next journey; correction to withdrawn content → new reviewed revision; previous safe version desired → create a new draft from it and review/publish, not an unreviewed silent rollback.

**Limit:** already downloaded bytes cannot be guaranteed to disappear immediately from disconnected devices. The offline policy remains under review.

## UC-08 — Manage own access and data

**Actor:** Child. **Requirements:** FR-04, FR-27. **Decision dependencies:** OQ-01/OQ-11.

**Session lifecycle:** expire/logout/revoke the scoped session according to the selected identity model. A replacement device restores server-confirmed progress only after successful authorized recovery. The exact recovery proof remains undecided; no second-person approval is involved.

**Reset/deletion:** explain whether the action clears local device data, the remote learner profile, or both. Require deliberate confirmation and scoped authorization. Revoke associated sessions and apply the agreed erasure and backup-retention policy. Content published by admins remains unaffected.

**Failure:** an invalid recovery proof or another learner's identifier grants no access and cannot delete their records. Unsynced data on a lost device is not guaranteed recoverable.

**Postcondition:** access management and data deletion apply only to the requesting learner. Revocation is distinct from erasure. Concrete UX and deadlines depend on the access and retention decisions.

## UC-09 — Plan and continue Dhikr practice

**Actor:** Child. **Requirements:** FR-31–FR-34. **Status:** proposed interpretation of the supplied Dhikr concept.

1. Child discovers daily remembering moments, such as before sleep or before studying.
2. Child chooses one approved context and practice for a when/then plan.
3. A suggested seven-day practice window begins in the plan's chosen timezone.
4. Child may check in with tried/remembered/remembered independently, or leave a day blank.
5. App acknowledges participation, resumes after pauses, and offers the closing reflection without claiming that a habit or calmer emotion has been proven.

**Failures/alternatives:** no check-in does not reset learning; retry writes once; changing devices uses confirmed server state; overlapping plans do not multiply the same reward. Any XP rules are explicit, capped by eligible event identity, and unrelated to worship counts.

**Postcondition:** saved practice plan and voluntary history; digital completion and long-term practice remain distinct. Compulsory seven-day gating is unresolved.

## UC-10 — Create a character and navigate doors

**Actor:** Child. **Requirements:** FR-29, FR-30.

1. After establishing their own access, child chooses avatar, nickname, appearance, color, and badge from the proposed preset catalog.
2. Choices are saved; the child enters «خريطة الحياة الطيبة».
3. Available Dhikr entry opens its introductory discovery; later authored regions explain their learning prerequisites.
4. Selecting a future preview such as «معية الله» explains that the door is not yet available, without exposing draft content or asking for impossible unlock tasks.

**Alternatives:** canceled customization retains last saved settings; missing asset has a valid default; withdrawn content takes precedence over prior unlock state. Learning unlocks depend only on available content and the defined learning prerequisites.

## UC-11 — Publish a language edition without resetting progress

**Actor:** Admin; learner is the eventual reader. **Requirements:** FR-28, FR-35, NFR-13.

1. Admin opens an existing canonical content revision and selects Arabic or a later English edition.
2. Admin supplies localized labels, scene/choice/feedback text, audio/captions, and accessibility copy linked to stable IDs.
3. Validation checks complete required fields, media readiness, religious translation review, and locale-specific rendering.
4. Publishing an immutable locale edition makes it eligible for the catalog's enabled-language policy.
5. The learner sees the appropriate published edition with the same progress and unlock identity.

**Alternatives:** English may stay absent or draft while Arabic launches; missing English falls back explicitly to Arabic after English is enabled; no mixed-language sentence fallback; changed learning meaning/graph requires a new canonical revision rather than a translation-only edit.

## UC-12 — Optional closing reflection

**Actor:** Child. **Requirements:** FR-26. **Decision dependency:** OQ-14.

The closing prompts ask when Dhikr felt easiest, when it was difficult, and where the child would like it in their day. The source proposes writing or a voice note. Those input modes are recorded as requests, not silently enabled.

The child may skip without losing learning progress. Any selected implementation must define storage, retention, deletion, and microphone denial/interruption behavior before release. Raw answers remain excluded from other-user views, content-admin tools, ordinary progress synchronization, and analytics under the current privacy proposal. No AI analysis or voice transcription is implied.


## Retired use cases

| ID | Status | Disposition |
|---|---|---|
| UC-04 | Retired in v0.3 | Separate adult learning path removed. |
| UC-05 | Retired in v0.3 | Adult monitoring and shared-support workflow removed. |

These are historical identifiers only; no corresponding current actor or interface is required.
