# v0.4 working revision - decision addendum

Started: 2026-10-04 · Updated: 2026-10-05 (Africa/Cairo)

Status: working successor to the locked v0.3 planning baseline. This addendum records new decisions without overwriting the v0.3 source snapshot or PDF. It is not a completed replacement specification or a newly locked baseline.

## Current MVP direction

The MVP runs entirely offline, does not require login, and supports written reflections. A local child profile holds character choices and progress. The full product will be online; accounts, recovery, synchronization, and remote content publication are later work. These decisions replace the account-first MVP sequence below.

## DEC-02 - Defer login for the MVP

**Status:** confirmed by the user on 2026-10-05.

**Decision:** do not make login, credentials, account verification, or account recovery a prerequisite for the MVP. The child can create their character and enter the map using a local profile. No mother account or pairing is introduced.

**Evidence:** “for the mvp don't worry about login”.

**Consequence:** the earlier account-first MVP decision is superseded. Full-product identity design is deferred, not selected. A local profile is not a promise of cloud backup or cross-device recovery.

## DEC-03 - Written reflections

**Status:** confirmed by the user on 2026-10-05.

**Decision:** reflections use written text in the MVP. Voice recording, microphone permission, transcription, and audio uploads are out of the MVP implementation scope.

**Working implementation:** store written drafts and saved reflections on the device, associated with the local learner and canonical prompt ID. Support save, reopen, edit, and delete. Reflection remains optional under the existing requirements; skipping it does not block learning. Exact length limits and local data-protection details are implementation decisions, not new product blockers.

## DEC-04 - Offline MVP, online full product

**Status:** confirmed by the user on 2026-10-05.

**Decision:** the installed MVP must work without an internet connection, including its first launch, character creation, map, complete Dhikr curriculum, media, activities, written reflection, and saved progress. This is full offline functionality, replacing the earlier online-with-interruption-recovery proposal.

**Consequence:** all required content, fonts, images, audio, and video must be bundled or provisioned before use; the proposed simplest MVP delivery is a self-contained app build. Streaming-only media, first-run downloads, remote authentication, and a mandatory API response cannot be on the learning path.

The full product is intended to be online. Its login, media-delivery, synchronization, conflict-resolution, and admin-publishing details remain later decisions. The user has not requested that the full product lose offline capability; that future behavior is still unspecified.

## Current requirement and model impact

| Reference | Update for the v0.4 MVP |
|---|---|
| OQ-01 / OQ-09 | Login and recovery are deferred; local profile setup precedes character/map entry. No credential decision blocks MVP work. |
| OQ-05 / P-10 | Resolved for MVP: all required learning works offline from first installed launch. |
| OQ-14 / P-05 / FR-26 | Written, device-local reflections; no voice capture. Reflection remains optional. |
| FR-01 / FR-02 / FR-04 | Use local profile isolation and device persistence; defer remote account/session/recovery requirements. |
| FR-07 / FR-19 / FR-25 | Load a validated bundled content manifest and local assets; missing packaged assets are build/content errors, not requests to connect to the internet. |
| FR-12 / FR-13 | Commit checkpoints and completion locally and recover after restart. No server acknowledgment is needed for MVP completion. |
| FR-17–FR-24 / FR-35 | Preserve the future content-admin capability. Proposed MVP content workflow is editable, validated source packages distributed with app builds; a live remote admin service is not needed by the offline runtime. |
| FR-27 | Provide deliberate local profile/data reset and reflection deletion. Remote erasure follows later account implementation. |
| FR-28–FR-34 | Keep locale-neutral IDs, character options, complete Dhikr stages, practice history, and agreed reward rules in local storage. |
| UC-01 / UC-03 / UC-08 / UC-12 | Model local entry, local save/resume/reset, and written reflection without account or network gates. |
| UML 03 / UML 05 / UML 06 / UML 08 | Replace MVP session/API dependencies with local profile, local data store, and bundled content. Document future online services separately. |
| Acceptance | Fresh standalone install in airplane mode; full journey and all media; force-stop/relaunch; written draft/save/edit/delete; no blocked request for login or connectivity. |

## Delivery implications

- Device-local progress and written reflections survive ordinary app restarts. App removal, device loss, or clearing app data can remove them; no cloud backup is promised for this MVP.
- Keep content source separate from learner data. Loading a newer bundled content package must not reset existing progress or reflections.
- Use stable learner/content/prompt identifiers and schema versions. This makes later migration feasible, but does not implement synchronization or authorize automatically uploading old reflections.
- Admin-added content cannot appear magically on a disconnected installed app. For the MVP, a new packaged app/content distribution is the proposed update route; live publication belongs to the online product.
- No backend provider, hosting service, account SDK, or cloud database must be chosen to start the offline MVP.

## Next action

Define the complete Dhikr content package and local data contracts, then map the child screens and build a standalone offline prototype. Use the [updated implementation plan](../../planning/IMPLEMENTATION_PLAN.md). Additional login discussion is deferred until the online-product phase.

## Historical DEC-01 - Account before learning

**Status:** confirmed on 2026-10-04; **superseded for the MVP by DEC-02/DEC-04 on 2026-10-05**. Retained only as history.

**Decision:** the child must create an account or sign in to an existing account before character setup, map access, or starting the learning journey. Guest learning is not included in the selected MVP approach.

**Evidence:** user selected “الحساب مطلوب قبل بدء الرحلة” in response to the choice between guest-first and account-first access.

**Behavior:** a returning valid session may resume the account without repeated sign-in on every app launch, subject to the session policy. Requiring an account does not mean requiring a fresh login for every learning session. No mother or companion account is introduced.

### Historical impact of DEC-01 - not current MVP instructions

| Reference | Required update |
|---|---|
| OQ-09 | Resolved: account-first; character setup follows account establishment and precedes the map. No guest journey. |
| OQ-01 | Partially resolved: a recoverable child account is the access direction; credentials, provider, verification, recovery proof, and session lifetime remain undecided. |
| P-01 | Remove guest/device-only access as an MVP alternative. Keep child account scope and separate admin authentication. |
| FR-01 | Require a valid child account/session for private learning/progress operations; admin authentication remains separate. |
| FR-02 / FR-29 | Account creation/sign-in precedes initial character setup; age/profile fields and credential fields remain distinct. |
| FR-04 / FR-27 | Finalize account recovery and account-scoped deletion after choosing the credential and recovery mechanisms. |
| UC-01 / UC-10 | Remove guest entry; describe new-account setup or existing-account access, then character/map entry. |
| UML 03 / UML 05 / UML 08 | Replace guest/account alternatives with a child account; retain explicit TBDs for credentials and recovery. |
| AT-01 / AT-02 / AT-04 | Check that a new unauthenticated user cannot start learning; verify existing-session resume and account recovery once specified. |

### Decisions not implied by the historical DEC-01

- Email, phone number, username, password, social sign-in, or any particular provider.
- Password reset or a recovery-code mechanism.
- Online-only learning after initial account establishment.
- A fresh login prompt on every launch.
- Reflection recording/upload permissions or storage policy.
- An adult account or device approval requirement.

Consolidate the current DEC-02/DEC-03/DEC-04 decisions into the next v0.4 specification and diagrams when preparing the next client-review export. The v0.3 baseline remains the preserved comparison point.
