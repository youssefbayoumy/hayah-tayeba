# Offline MVP implementation plan

Updated: 2026-10-05 (Africa/Cairo)

This working plan follows DEC-02/DEC-03/DEC-04 in the [v0.4 addendum](../revisions/v0.4/DECISIONS.md). It replaces the account-first/backend-first sequence. The locked v0.3 snapshot and PDF remain unchanged.

## Confirmed direction

- Child-only, ages 10-14; Expo React Native.
- No login requirement for the MVP; local profile and character setup.
- One complete Dhikr door in Arabic, with locale-neutral keys for English later.
- Full offline operation from first installed launch.
- Written reflections saved on the device; no voice capture.
- Online full product later; its accounts, synchronization, and remote publishing are deferred.

## Build structure

Separate three responsibilities:

1. Content package: reviewed curriculum manifest, stage/step/choice definitions, local media, localized text, prerequisites, and version metadata.
2. Local learner store: profile, character, attempts/checkpoints, completion, practice history, written reflection drafts, and any agreed rewards.
3. Presentation and learning logic: screens and template renderers read content and commit learner changes through local repository interfaces.

A local database is proposed; the specific package will be selected during implementation. No cloud service is needed to begin. Stable IDs and storage migrations prepare for later online work without pretending that synchronization already exists.

## Delivery sequence

### 1. Content inventory and local data contracts

Map every Dhikr stage to its story/activity, Arabic copy, required media, review status, prerequisites, and completion rule. All required stages need actual content. Define the package schema and learner records before hard-coding scenes.

A written reflection needs learner ID, canonical prompt ID, text, draft/saved state, and timestamps. Support save, reopen, edit, delete, and skip. Keep response text separate from generic progress and reward records.

### 2. Child screen inventory and visual prototype

Map character setup, the main map, Dhikr discovery, story/choices, guided practice, remembering moments, journal, written reflection, and completion/resume. Include character editing, settings, and deliberate local-data reset.

There are no login, verification, password recovery, mother, or device-pairing screens in the MVP. Offline is the normal condition, not an error screen. The visual design follows this inventory.

### 3. Standalone offline technical slice

Implement local character setup, bundled manifest loading, one authored story/choice, saved progress, and a written reflection. Bundle all needed media and fonts.

Acceptance: fresh standalone installation in airplane mode, with no development server, initial download, account, or API response required. Force-stop/relaunch preserves checkpoint and reflection drafts. This proves integration; it is not the complete door.

### 4. Complete Dhikr door

Add every reviewed stage, local practice plans/check-ins, learning unlocks, and the closing reflection/end state. Future-door previews remain explicitly unavailable. Optional reflection and emotional improvement do not gate learning completion.

XP eligibility/values and mandatory seven-day gating remain open; they do not block defining the content or local storage. Add only the rules actually agreed.

### 5. Persistence and release verification

Test the complete route and all media in airplane mode; local save failures; restart and app-upgrade data preservation; duplicate taps/check-ins/rewards; reflection save/edit/delete/skip; and deliberate profile reset. Test Arabic/RTL and accessibility on the agreed devices and review usability across ages 10-14.

Launch platform coverage remains open and must be resolved before release-build/device QA, not before content and local-data planning.

## Content updates and the future online product

Keep editable content source and validation. The proposed MVP distribution is a self-contained app build; updating bundled content requires a new packaged distribution. A live remote admin service is not needed by the offline runtime. Periodic admin-added content remains a goal for the online product.

Local data survives normal restarts. App removal, clearing data, or device loss can remove progress and reflections; no cloud backup is promised. A content update must not reset learner data. Disconnected devices cannot receive immediate content withdrawal.

Later, design accounts/recovery, remote content/media delivery, admin publishing, synchronization/conflicts, retention, and operations. Existing written reflections must not be uploaded automatically merely because an online version becomes available.

## Immediate next work

Create the concrete Dhikr content inventory and local data schema, followed by the child screen inventory. Do not reopen MVP login questions. The next consolidated specification handoff can incorporate these decisions into the SRS/UML and a new PDF.
