# Logical architecture — proposal, not technology selection

Version 0.3 · Constraint: Expo React Native mobile client (C-06).

## 1. Direction

Start with one backend application organized into clear modules, a transactional persistence boundary, and separate media storage/delivery. These are logical responsibilities, not a recommendation to deploy separate microservices. The admin web client is a proposal. Backend framework, identity provider, database, storage/CDN, queues, hosting, and observability products remain undecided.

The content model is the key architectural choice: administrators publish data that existing client renderers understand. This supports new journeys without turning the MVP into a general game-creation platform.

## 2. Responsibility boundaries

| Component | Owns | Does not own |
|---|---|---|
| Child mobile shell | Child navigation and accessibility | Server authorization decisions. |
| Content renderer | Supported template display, authored choices, audio/text controls | Executing remote scripts or inventing new game mechanics. |
| Local progress store and outbox | Durable checkpoints, pending events, restart recovery | Claiming server sync before acknowledgment. |
| Identity/session module | Child identity/session scope, admin authentication, access recovery, revocation/deletion initiation | Editorial publication. |
| Catalog/content module | Drafts, immutable revisions, validation, availability, publication pointer | Treating a new schema as supported by old apps. |
| Progress module | Version-bound attempts, idempotent events, required-step completion | Moral scores or raw reflection storage. |
| Media module | Private upload, type validation, asset readiness, delivery authorization | Automatic publication on upload. |
| Admin client | Editing, review, preview, explicit publication | Direct database writes or learner-data browsing. |
| Audit/operations | Content lifecycle audit, non-sensitive faults, backup/restore | Child-answer analytics. |

## 3. Proposed trust boundaries

All clients are untrusted. Server operations derive learner access from validated identity/session scope; passing a child ID never grants access. Preview media is private to authorized admins. Published media is available only according to its revision's delivery policy. Catalog filtering is not sufficient access control for direct asset or revision requests.

Child access may use a guest/device credential, an account, or a combination; the choice remains OQ-01. The server binds private data to the validated learner identity. Nickname, age, avatar, and a client-supplied learner ID cannot prove identity. Recovery must authenticate the same learner before restoring remote progress; local-only limitations are explicit if that model is chosen.

Content admins manage content only. A future support capability requires an explicit permission and purpose; it must not be silently added to “admin”.

## 4. Content contract

Each revision has a schema version and declares required client capabilities. Each step has a stable ID within that revision, learning path, template type, authored data, optional media references, and a completion rule. Choice destinations stay inside their authored learning path unless an explicit supported transition exists.

Publish validation checks:

- Assets exist, are ready, and have the required alternatives/source/rights metadata.
- Required digital steps are reachable; optional tasks do not become hidden gates.
- All references and choice targets resolve; authored loops have an exit.
- Template/schema capabilities are compatible with the intended supported clients.
- Review is recorded and the expected draft version matches the saved version.

Published data is immutable. The active catalog points to a live revision; previous nonwithdrawn revisions remain available for bound attempts. Withdrawal changes availability, not historical content or completion. A content fix requires another reviewed revision.

## 5. Progress and synchronization

Use one independent identity for each child learner. An attempt binds one learner to one content revision. Persist a resume cursor separately from the set of completed required steps.

Proposed event envelope: `eventId`, `attemptId`, `revisionId`, `deviceSessionId`, `sequence`, `checkpointStepId`, and newly completed allowed step IDs. Exclude raw answer/reflection payloads. The server validates step IDs and state transitions; completion measures participation only, so clients are not proving real-world conduct.

Local storage commits before showing “saved on this device”. The outbox retries with the same identifier. The server atomically deduplicates and commits before returning “synced”. Same identifier with a changed payload is an error. Stale cursor updates cannot overwrite a newer cursor; completed steps merge monotonically.

Simultaneous-device policy and recovery credentials remain open. If one active device is selected, approved recovery revokes the previous session. If simultaneous devices are selected, define cursor-conflict ordering before implementation; completion remains monotonic. No family pairing or companion device exists.

Full offline playback is not promised. Cached scenes may be usable during a disruption; missing media requires connectivity. A replacement device only restores server-confirmed state. Optional reflection data is separate from the progress outbox. Written/voice storage and deletion design remain conditional on OQ-14; no existing synchronization endpoint should accept those payloads by default.

## 6. Publication consistency

A publish operation uses an idempotency identifier plus expected draft version. Validate before mutation; commit immutable revision, live pointer, and audit record in one transactional boundary. External media must be ready before the transaction. A failure leaves the prior live pointer unchanged. Asset cleanup after abandoned drafts needs a later retention policy.

For withdrawal, deny new authorized delivery and invalidate cached metadata where feasible. Time-bounded media links can reduce exposure, but exact link lifetime/CDN policy is undecided. Do not claim that previously delivered files can be retracted instantly.

## 7. Data and API design still to come

After the behavioral baseline is accepted, produce:

- Physical schema with keys, constraints, indexes, deletion/retention behavior, and migrations.
- API contracts for child access/recovery, catalog/revisions, progress , and admin workflows.
- Concrete auth threat model, credential lifetime/rotation/recovery, abuse controls, and learner-isolation tests.
- Media format/size limits, processing pipeline, caching and storage budget.
- Deployment topology, environment separation, CI/CD, backups, restore targets, monitoring, and cost estimates.

These are not omitted implementation work: the current task is requirements and UML before committing to a stack. Picking providers before OQ-04/OQ-05/OQ-06/OQ-10 would conceal assumptions about platform, connectivity, distribution, and scale.

## 8. Main risks and proposed controls

| Risk | Proposed control | Decision still needed |
|---|---|---|
| Losing access to a child profile | Explicit scoped recovery, expiry, revocation, and honest local-only limits | Choose the access/recovery model. |
| Leaking another learner's records | Server learner-scope checks and minimal responses | Confirm storage and privacy policy. |
| A content edit breaks an ongoing journey | Immutable revisions and version-bound attempts | Withdrawal/replacement UX. |
| Admin publishes unsupported interactions | Capability validation and bounded templates | Final template list. |
| User assumes unsynced work is backed up | Visible local/pending/confirmed state | Connectivity scope. |
| Production content is missing or unsuitable | Editorial ownership, provenance, preview, age testing | Content team and review process. |
| Broad scope overwhelms single-door MVP | One complete vertical journey plus reusable authoring | Approve the proposed MVP boundary. |


## 9. Localization without duplicating the curriculum

Keep locale-neutral Door, Journey, Stage, Step, and Choice identities. A versioned **LocaleEdition** belongs to one canonical ContentRevision and maps stable content keys to text, audio, captions, and accessibility alternatives. Localized door/journey labels are catalog metadata. Avoid `titleAr`/`titleEn` columns and duplicated English journeys as the long-term structure.

Arabic is complete and enabled at launch. English editions can be added and reviewed later without changing progress identity or the underlying content graph. Each published edition is immutable; a correction creates another locale-edition version. A semantic change to the learning graph needs a new canonical revision. Attempts can pin an edition during a session and adopt a reviewed equivalent edition on next entry without losing progress.

Fallback is explicit: Arabic remains the baseline; incomplete English is not published and is not mixed into Arabic UI. The mobile shell still needs translated interface strings, LTR layout, and regression testing for an eventual English release; content readiness alone does not ship a bilingual app.

## 10. Practice, rewards, and map availability

Add logical modules for character configuration, practice plans/check-ins, participation rewards, and map eligibility within the same proposed backend. Store approved avatar-option IDs; personal media uploads are not a prerequisite.

Represent `future_preview`, `progression_locked`, `available`, `completed`, and `withdrawn` separately. Preview-door metadata is explicitly published; unpublished educational assets remain private. Server eligibility checks use reachable learning prerequisites and content availability. Previously unlocked content can still be withdrawn.

PracticePlan identifies learner, approved moment/practice, timezone, and optional target window. PracticeCheckIn is unique by plan and local date; updates are idempotent, with no punitive missing-day reset. A proposed RewardGrant uses learner plus stable eligible reward/event identity to avoid replay farming. These records never certify worship or emotional improvement. Practice details are visible only within the learner's own experience under the proposed access policy.

The source's seven days, ten-second exercise, ten-minute introduction, XP values, named characters, garden, and secret doors are authoring proposals. A simple governed content implementation does not imply background reminders, AI evaluation, sound recording, or arbitrary mini-game generation. Resolve reflection input/storage and practice completion gates before implementing those dependent behaviors.
