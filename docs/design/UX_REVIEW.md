# Independent UX review — working design

2026-10-05 · Code/document inspection only · Reinspection of reported fixes

## Scope and evidence

Inspected [DESIGN.md](DESIGN.md), [TOKENS.json](TOKENS.json), [UX_FLOW.md](UX_FLOW.md), [SCREEN_INVENTORY.md](SCREEN_INVENTORY.md), and [prototype source](prototype/index.html). No browser, mobile-device, screen-reader, or child-user test has been performed by this reviewer. Parent/orchestrator browser QA is separate evidence. Token contrast claims are reported by the design-system author and are not a finished-screen accessibility certification. Function names below are stable evidence anchors while prototype edits can shift line numbers.

## Actionable findings

### R01 — Resolve top-level navigation before final handoff

**Status:** resolved in current prototype source · **Evidence:** document/code inspection.

`UX_FLOW.md` defines **الخريطة / لحظاتي / دفتر الرحلة** as stable anchors, while `DESIGN.md` allows **map / journal / profile/settings** as the bottom navigation. Those alternatives change how a returning child reaches their ongoing daily intention, which is central to the supplied Dhikr content.

**Resolution:** `nav()` now uses **الخريطة / لحظاتي / دفتر الرحلة**. `header()` exposes character/settings actions. The orchestrator requested the same document contract from the visual-design author. Rendered discoverability remains a browser/child-test task.

### R02 — Preserve edited nickname when changing character appearance

**Priority:** medium · **Status:** resolved by code reinspection · **Evidence:** `customize()` code inspection.

The object merge sets `name` before spreading `data.profile`. An existing profile's older name therefore overrides a newly typed nickname when the child presses an avatar/color/badge option. This makes the field unexpectedly lose changes during ordinary editing.

**Resolution:** the current input `name` is now applied after the prior-profile spread. Root browser QA should check typing a different nickname, then changing color/badge, saving, and reopening the profile. Expected: the new nickname survives throughout.

### R03 — Guard departure after a failed reflection draft write

**Priority:** high · **Status:** resolved by code reinspection; runtime fault test remains required · **Evidence:** `draftReflection()`, `go()`, `switchPrompt()`, `guardLeave()`, and `beforeunload`.

Draft autosave truthfully reports failed local persistence and retains in-memory text, but navigation, prompt switches, and page departure do not ask the child to stay/retry/discard when that failure occurs. The child can leave after reading a generic warning and later close the page, losing the only remaining copy. This falls short of the specified unsaved-change decision.

**Resolution:** failed autosave sets an unsaved flag, app departure/prompt changes expose retry/stay/discard, retry exits only after successful persistence, and page departure requests the browser's supported unsaved-change prompt. Successful autosave does not require a guard. Root browser QA should test success and simulated write failure; browser handling of `beforeunload` is environment dependent.

### R04 — Restore the selected story consequence on checkpoint resume

**Priority:** medium · **Status:** resolved by code reinspection · **Evidence:** `choose()`, restored `choiceValue`, `go()`, outcome render branch, and `resetData()`.

`go('outcome')` persists an outcome checkpoint, but `choiceValue` is only a volatile variable. After reload, resuming an outcome for a video/rush choice renders the default pause consequence instead. The child sees a consequence for a decision they did not make.

**Resolution:** the selected choice is now persisted with the checkpoint, restored on load, and cleared on full reset. Root browser QA should test every outcome → reload → **كمّل رحلتك**. Expected: the same consequence remains visible, with replay still available.

### R05 — Return keyboard focus after a modal closes

**Priority:** medium · **Status:** cancel/Escape restoration resolved by code reinspection; full keyboard route still requires browser QA · **Evidence:** `modal()` and `closeModal()`.

The modal initially focuses the safe cancel action and traps Tab correctly, but closing it removes the focused node without restoring focus to the triggering control or a meaningful destination. Keyboard users can lose their position after cancel/Escape.

**Resolution:** the modal remembers the trigger and restores it on dismissal, falling back to a current control when necessary. Root browser QA should open/cancel the future preview and destructive confirmation entirely by keyboard, then check meaningful focus after successful deletion/reset and screen rerendering. Code alone does not prove mobile keyboard or screen-reader behavior.

### R06 — Offer deletion for a draft-only journal entry

**Priority:** medium · **Status:** resolved by code reinspection · **Evidence:** reflection render branch now uses `saved !== undefined || draft` for the delete action.

An autosaved draft appears in the notebook but the delete control appears only after an explicit saved reflection exists. The child cannot clearly remove a private draft without saving it first or clearing the text manually.

**Resolution:** the same confirmed delete action now appears for either a saved entry or a nonempty local draft. Its operation deletes only that prompt's saved/draft records and retains other writing/progress, with failure rollback. Root browser QA should type without explicit Save, open the draft from the notebook, delete/cancel, and verify the expected local state.

## Design points supported by current documents

- Tone and illustration direction target 10–14 and explicitly avoid preschool styling. Actual age appropriateness still needs child feedback; it cannot be confirmed from tokens.
- Arabic letter spacing, larger text, directional back navigation, safe-area layout, captions, and reduced motion are specified. Rendered RTL and keyboard behavior still need browser and native testing.
- Device-local written reflection, draft/saved/error distinction, failed-save text retention, private text, individual deletion, and whole-profile reset are specified.
- Future doors state **غير متاح في هذه النسخة**; prerequisite locks inside bundled Dhikr content describe a reachable learning action.
- No login, mother lane, online dependency, microphone, numerical XP rule, or seven-day hard gate is introduced.
- The written screen inventory distinguishes ending a session from finishing the entire required learning route. Prototype completion copy must retain that distinction, especially when content is illustrative.

## Static checks supported by the updated prototype

- `mark()` rolls back a new completion marker when a write fails. Character setup and plan-save actions stay on their screens when the commit fails.
- Reflection save distinguishes a retained draft from a successful saved entry; failed deletion restores the original reflection/draft. Failed full reset restores the prior data object and retains the profile. Successful reset replaces local data and resets the active prompt.
- Per-calendar-date practice check-ins offer editing instead of creating a second record. The exact behavior under browser storage faults needs runtime testing.
- The code declares `lang="ar"` and `dir="rtl"`; visual reading order, keyboard focus, Arabic shaping, and mobile keyboard behavior are not proven by those attributes alone.
- Typography overrides remove negative Arabic tracking, raise instructions/choices to 16 px and reflection text to 18 px, and add the essential-control border. Some metadata remains smaller by design; final legibility requires rendered review.
- A real learning-prerequisite sheet is separate from the future معية الله preview. The future preview has no actionable unlock promise.
- Completion is named **ختام الجلسة** / **جلسة الاكتشاف الأولى** and the prototype discloses that it does not contain the complete approved Dhikr curriculum. The full content inventory and all authored stages remain implementation/editorial work.
- No login, mother, voice-capture, cloud/online invitation, network request, numeric XP, worship repetition score, or mandatory seven-day gate is present in the inspected prototype source.

## Runtime evidence still required

Parent/orchestrator browser QA should confirm the final fixes, actual save/draft recovery and storage-failure behavior, fresh reset state, safe destructive cancellation, absence of horizontal overflow, large Arabic text, keyboard reachability, and focus return. Native installation, all bundled media, and on-device data durability are outside this HTML prototype's evidence boundary.

## Planned usability tasks — not executed

Use individual sessions with children near both ends of the 10–14 range, subject to the project’s research arrangements. These tasks are a plan, not evidence of completed research or a claim about children's preferences. Do not evaluate religious sincerity, request private autobiographical disclosures, or imply that completing the task makes an answer morally better.

1. **Make a character and enter the world:** «اعمل شخصية تحبها، وابدأ أول رحلة». Observe whether setup fields, the main action, and the available door are understood without adult explanation. Record points of confusion and unnecessary taps.
2. **Explain the two locks:** «لو حبيت تدخل المكانين دول، إيه الفرق بينهم؟». Point to a Dhikr prerequisite lock and the future معية الله preview. Ask the child to explain what is possible now; observe whether the interface implies unpublished content can be unlocked.
3. **Resume and find a daily moment:** «اقفل التجربة وافتحها تاني. كمّل من مكانك، وبعدها اختار وقت تفتكر فيه الذكر». Observe checkpoint recognition and finding **لحظاتي** without replaying required content.
4. **Write, leave, and reopen a harmless example:** «اكتب جملة تجريبية في الدفتر، ارجع، وبعدين افتحها وعدّلها». Use invented text rather than personal religious reflection. Observe understanding of draft/saved status, editing, optional skip, and expected storage location.
5. **Understand deletion and change their mind:** «افتح اختيار مسح البيانات، واقرأ هيحصل إيه، وبعدين ارجع من غير ما تمسح». Ask what would disappear and what would remain. Observe whether cancellation is clear and accidental confirmation is avoided. Perform any actual destructive test only on a disposable test profile.

For each task, record completion without help, requested help, child explanation, and concrete interface issues. No numerical success threshold or preference result is assumed before research.
