# Hayah Tayeba — engineering specification pack

Version: 0.3 · Authored: 2026-09-29 · Baselined: 2026-10-03 · Status: **locked planning baseline; explicit open decisions retained**

This pack records the historical baseline requirements and software models. The current [v0.7 addendum](revisions/v0.7/README.md) adds Ma'iyya, faith/good-deeds learning, contextual verse matching, private daily reports and migration, and links the implemented [browser preview](design/prototype/index.html?demo=1). The existing journeys remain available. An installed Expo application has not yet been delivered.

The approved v0.3 snapshot and change-control policy are recorded in [BASELINE.md](BASELINE.md). Original draft labels in the archived documents describe their preparation status; the baseline record captures the subsequent approval.

## Read in this order

0. [Client revision and Dhikr scope](CLIENT_REVISION.md): changes, content interpretation, and unresolved scope choices.
1. [Decisions and open questions](DECISIONS.md): what the user actually confirmed, what is proposed, and what remains undecided.
2. [Software Requirements Specification](SRS.md): scope, behavior, data boundaries, quality targets, and acceptance criteria.
3. [Use cases](USE_CASES.md): normal flows, failures, and permissions.
4. [UML models](UML.md): use case, class, activity, sequence, state, and component diagrams, with editable source files.
5. [Logical architecture](ARCHITECTURE.md): proposed responsibilities and boundaries; no backend vendor selection.
6. [Requirements traceability](TRACEABILITY.md): requirements mapped to scenarios, models, and acceptance checks.

## Product baseline

Children aged 10–14 use an Expo React Native app independently. The child is the only learner-facing role; content admins remain operational users. The MVP delivers the complete **«باب الذكر»**: understanding, practical entry, continued practice, reflection, and completion of the learning route. Arabic is the launch language, with a locale-neutral structure for English later. The child creates a character before entering «خريطة الحياة الطيبة» with locked doors. The world is lightly fantastical, while situations and dialogue stay close to everyday life. Administrators need to add content over time.

The specification distinguishes a confirmed product objective from a proposed mechanism for achieving it. A detailed behavior appearing in a diagram is **not** evidence that the user approved it. The current version is locked as the planning reference. Explicit proposals and unanswered decisions keep their recorded status; the approval does not invent missing choices.

## Review sequence

- First: confirm the child access/recovery model and learner-data privacy.
- Next: confirm the complete door's educational flow and the content templates admins need.
- Then: agree platform coverage, connectivity expectations, release quality targets, and operational ownership.
- After those decisions: select backend technologies and produce physical database/API designs, followed by UI flows and visual design.

Engineering and UI design can inform each other. This pack should evolve when a prototype or user test exposes a bad assumption; it should not freeze untested product ideas.

## Sources and evidence limits

- `../Presentation 13.pptx`: provided conceptual content, including beginning, consistency, growth, good character, remembrance, and related themes. It is source material, not a completed curriculum or executable instruction set.
- User-provided `Pasted text.txt` in the attachment dated this conversation: expanded content notes. It is not copied into this pack as an approved syllabus.
- This chat: explicit decisions are recorded in [DECISIONS.md](DECISIONS.md).

Religious quotations and learning-effectiveness claims have not been independently verified. These documents do not certify legal, educational, security, or accessibility compliance. They define proposed product and engineering checks. No delivery dates, operating costs, traffic estimates, or learning-outcome guarantees are asserted.

## Change discipline

Keep requirement IDs stable. Record a decision before changing a proposed assumption to confirmed. Update affected use cases, diagrams, and traceability together. Historical learner completion must not be silently rewritten when content changes.

## Verification of this draft

The pack contains 30 active functional requirements plus 5 retired identifiers, 14 nonfunctional requirements, 15 business rules, 10 active use cases plus 2 retired identifiers, and 10 UML sources. Requirement IDs and traceability coverage were checked, local Markdown links resolved, and all UML sources rendered successfully to SVG and PNG. The rendered diagrams were visually inspected. These are documentation checks only; the planned application acceptance checks have not been executed.
