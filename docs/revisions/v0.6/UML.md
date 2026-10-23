# v0.6 data and learning models

The [learner diagram](learner.svg) ([editable source](learner.puml)) and [flow diagram](learning-flow.svg) ([source](learning-flow.puml)) describe the current design. Baseline and v0.5 models remain historical records.

## Content interfaces

The content configuration retains the shared journey/stage interface for Dhikr. The new second journey adds `gardens[]`, each with a canonical ID, ordered challenge IDs, artwork bindings, video-segment ID and key ID. Its flat stages are fifteen scenario challenges with `gardenId`, original-scene asset, three authored choices and `completionMode: explore`. A choice can be suggested by the lesson; this never controls completion.

IDs are `takhliya-1..5`, `tahliya-1..5`, `tazkiya-1..5`; keys are `takhliya-key`, `tahliya-key`, `tazkiya-key`. The three existing video-segment IDs remain stable and bind to the first challenge of each garden.

## Learner schema 3

The browser key remains `hayah-tayeba-design-preview-v1`. Schema dispatch happens before validating content IDs, preventing old twelve-stage records from being rejected against the new catalog. A v2 migration stores its old progress and original stage/prompt titles in `archives.tazkiyaV05`, while the current second journey begins with empty completion/keys and retained video/practice/plan records. Original flat data can migrate directly to schema 3.

`writingOrigins` stores independent source metadata for saved notes and draft-only writings. A journal editor therefore does not require its retired stage to exist. Main records remain separate from progress. Raw `.backup-v1` and `.backup-v2` copies are removed on writing deletion or reset; deletion purges corresponding embedded legacy note copies as well. Failed writes retain prior in-memory committed state; uncommitted text remains available behind a navigation guard.

## Progress

Selecting a response persists its exploration draft and shows feedback. Deliberate next records challenge completion. Each set of five earns its key once, then opens the next garden. All three keys unlock treasure. Optional notes, real-world practice and seven elapsed days are outside the completion path. Required video errors and failed commits cannot supply missing progress.
