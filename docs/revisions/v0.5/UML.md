# v0.5 models and implementation contracts

The [learner model source](learner.puml), [learner diagram](learner.svg), [learning flow source](learning-flow.puml) and [learning flow diagram](learning-flow.svg) describe the new shared-character/two-journey design. They do not overwrite the ten baseline models.

## Persistence contract

- Browser key stays `hayah-tayeba-design-preview-v1`; payload `schemaVersion` becomes 2.
- One profile and `characterId` (`boy`, `girl`, or unset during migration).
- Independent `journeys.dhikr` and `journeys.tazkiya`: completed stage IDs, activities, checkpoint, video records, badge IDs, plan and daily practice.
- A video record identifies its `videoSegmentId`, absolute file position and completed state. The configured range belongs to content, not learner data.
- Journal keys are `journeyId:stageId:promptId`; records contain source title, text and update time. Legacy `dhikr-reflection-N` IDs remain readable.
- Migration retains the original legacy fields for compatibility, plus a raw backup until individual writing deletion or full reset. Deleting a legacy note also removes its legacy copies. Reset removes both store keys.
- Committed state changes only after a successful storage write. In-memory unsaved editor text is separate and never presented as durable data.
- No automatic upload of old reflections when an online backend is introduced.

## Content contract

Canonical journey/stage/prompt/segment IDs are independent of language. A future content editor supplies reviewed data through existing templates; a new template requires development and validation. The static preview reads its bundled content manifest directly. It does not expose a live admin backend.

## Completion contract

Stage prerequisites reference the preceding stage in the same journey. A required video must have a successfully saved completed record. Required digital interaction is followed by optional reflection and deliberate stage completion. Stage ID and badge ID are inserted only once. Plans and daily practice are separate from stage completion. Playback failure, storage failure, feelings, skipped reflection or missed days cannot falsely mark a stage complete or erase prior progress.
