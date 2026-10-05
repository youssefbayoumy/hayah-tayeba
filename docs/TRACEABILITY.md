# Requirements traceability and acceptance checks

Version 0.3 · **These are planned checks, not executed application tests.** No application exists yet.

Model keys: **U1** use cases; **U2** content classes; **U3** learner classes; **U4** child activity; **U5** child access sequence; **U6** progress sequence; **U7** content lifecycle; **U8** components; **U9** locale editions; **U10** practice and rewards. Sources live in `uml/01-...` through `uml/10-...` and are linked in [UML.md](UML.md).

## Functional coverage

| Requirement | Use case | Models | Planned acceptance check |
|---|---|---|---|
| FR-01 | UC-01, UC-06 | U1, U5, U8 | AT-01: deny anonymous private-data access, wrong-learner requests, and child publication attempts. |
| FR-02 | UC-01, UC-10 | U3, U5 | AT-02: independent age/profile/character setup; no second-person account dependency. |
| FR-03 | Retired | None | Removed in v0.3; historical identifier, no current acceptance obligation. |
| FR-04 | UC-01, UC-08 | U3, U5 | AT-04: expire/revoke session; restore only own confirmed progress through approved recovery; disclose guest limitations. |
| FR-05 | Retired | None | Removed in v0.3; historical identifier, no current acceptance obligation. |
| FR-06 | UC-02 | U1, U4 | AT-06: one full door and explicit preview metadata work; draft and withdrawn lessons cannot start. |
| FR-07 | UC-02 | U2, U4, U8 | AT-07: render supported manifest; safely reject future schema/template without corrupting an existing attempt. |
| FR-08 | UC-02 | U2, U4 | AT-08: read/listen/navigation with audio off, unavailable, or interrupted; essential meaning remains accessible. |
| FR-09 | UC-02 | U2, U4 | AT-09: every authored choice resolves; try another response; no moral score or completion reset. |
| FR-10 | UC-02 | U1, U4 | AT-10: finish the learning route with only the child role; no external approval or attendance dependency. |
| FR-11 | UC-02 | U2, U4 | AT-11: defer real-life task and skip reflection; required progression still works. |
| FR-12 | UC-03 | U3, U6 | AT-12: save, kill app, resume, lose network, retry duplicate event, reject changed-payload ID reuse. |
| FR-13 | UC-03 | U3, U4, U6 | AT-13: required-step set yields one completion per attempt; optional skips/replay preserve history. |
| FR-14 | Retired | None | Removed in v0.3; historical identifier, no current acceptance obligation. |
| FR-15 | Retired | None | Removed in v0.3; historical identifier, no current acceptance obligation. |
| FR-16 | Retired | None | Removed in v0.3; historical identifier, no current acceptance obligation. |
| FR-17 | UC-06 | U1, U2, U8 | AT-17: publish a second supported journey; unchanged client binary retrieves it. |
| FR-18 | UC-06 | U2 | AT-18: validate every supported template, malformed step, broken target, and optional-step gate. |
| FR-19 | UC-06 | U2, U8 | AT-19: incomplete/invalid upload cannot publish; draft media is inaccessible to child session. |
| FR-20 | UC-06 | U2, U7 | AT-20: preview paths and require review; fail on missing alternatives, bad sources/references, unreachable steps. |
| FR-21 | UC-06, UC-07 | U2, U7 | AT-21: failed, repeated, or stale publish leaves an atomic live pointer and no partial revision. |
| FR-22 | UC-03, UC-07 | U2, U3, U6 | AT-22: publish R2 during an R1 attempt; old attempt stays on R1 and historical completion survives. |
| FR-23 | UC-07 | U7, U8 | AT-23: withdraw bound revision; block subsequent online delivery, preserve records, show unavailable state. |
| FR-24 | UC-06, UC-07 | U2, U8 | AT-24: verify actor/version/action/outcome audit records without credentials or child answers. |
| FR-25 | UC-02, UC-03 | U4, U6 | AT-25: fail required/optional media and network separately; maintain checkpoint and meaningful retry. |
| FR-26 | UC-03, UC-12 | U3, U6 | AT-26: choose/skip supported reflection; inspect requests/logs for excluded payloads; text/voice tests await OQ-14. |
| FR-27 | UC-08 | U3, U8 | AT-27: deliberate scoped reset/deletion; reject cross-learner action; verify agreed erasure process. |
| FR-28 | UC-11 | U2, U9 | AT-28: Arabic release completeness; nonpublic English fixture shares IDs and progress; explicit fallback. |
| FR-29 | UC-10 | U1, U3 | AT-29: all five character choices persist through restart/authorized recovery and remain editable. |
| FR-30 | UC-10 | U1, U2, U4 | AT-30: distinguish available, progression-locked, preview, completed, and withdrawn; reject impossible unlocks. |
| FR-31 | UC-02, UC-09 | U2, U4 | AT-31: all required Dhikr stages exist; door learning completion differs from continuing practice. |
| FR-32 | UC-09 | U10 | AT-32: create/edit when-then plan and remembering moments; resume without duplicate context records. |
| FR-33 | UC-09 | U10 | AT-33: pause/resume, missing days, offline duplicate check-in, and timezone edges. |
| FR-34 | UC-09 | U10 | AT-34: reward once per eligible event; replay and worship counts do not inflate XP. |
| FR-35 | UC-06, UC-11 | U2, U7, U9 | AT-35: publish locale edition and preview metadata; reject missing Arabic and invalid prerequisite graphs. |

## Quality coverage

| Requirement | Planned check | Baseline dependency |
|---|---|---|
| NFR-01 | AT-N01: learner-level authorization for access, recovery, deletion, progress, content, and media. | Final API surface. |
| NFR-02 | AT-N02: expired/revoked credentials, failed recovery, duplicate-safe issuance, secure storage, and abuse controls. | Selected child access model and threat review. |
| NFR-03 | AT-N03: network/telemetry/log inspection and deletion/retention exercise. | Retention and release-country decisions. |
| NFR-04 | AT-N04: local restart, server transaction failure, reordered events, duplicate submissions. | Concrete persistence implementation. |
| NFR-05 | AT-N05: measure p95 local interaction timing against proposed 200 ms target. | Agreed representative device. |
| NFR-06 | AT-N06: measure p95 metadata/progress latency against proposed 1 second target. | Agreed concurrency, network, region, and dataset. |
| NFR-07 | AT-N07: screen reader, 200% text, RTL, captions, non-color feedback, reduced motion. | Supported OS/device matrix. |
| NFR-08 | AT-N08: release-build smoke and regression tests on supported platforms and admin browsers. | Launch platform/version decision. |
| NFR-09 | AT-N09: old supported client versus incompatible manifest; safe fallback and preserved progress. | Compatibility policy and template versions. |
| NFR-10 | AT-N10: injected sync/publish faults, correlation IDs, backup restore rehearsal. | Owner, recovery targets, backup/retention policy. |
| NFR-11 | AT-N11: source/rights and age-suitability review exists for every published revision. | Appointed editorial owner and completed content. |
| NFR-12 | AT-N12: observed child usability sessions across the age range. | Sample/recruitment plan and agreed threshold. |
| NFR-13 | AT-N13: Arabic/RTL and English/LTR fixtures, text growth, media alternatives, locale fallback, unchanged progress. | Locale contract and release-language policy. |
| NFR-14 | AT-N14: duplicate check-ins/rewards, timezones, content revisions, and paused practice. | Confirmed check-in/reward and calendar rules. |

## Confirmed needs mapped to the specification

| User decision | Coverage |
|---|---|
| C-01: ages 10–14 | FR-02, NFR-11, NFR-12 |
| C-03: independent child learning | FR-10, FR-11, BR-01 |
| C-04: Dhikr replaces former first journey | SRS scope, FR-06, UC-02 |
| C-05: light fantasy / everyday dialogue | FR-06, UC-02, editorial review |
| C-06: Expo React Native | SRS interfaces, NFR-08, architecture / U8 |
| C-08: admin content updates | FR-17–FR-24, UC-06/UC-07 |
| C-09: complete single-door MVP | SRS scope, FR-06, AT-17 tests later extensibility |
| C-10: supplied concept materials | README evidence limits; production content remains a dependency |
| C-11: documents before UI | This pack; no UI implementation or visual design is performed |
| C-12: Arabic first, English-ready structure | FR-28, FR-35, NFR-13, UC-11, U9 |
| C-13: child character creation | FR-29, UC-10, U3 |
| C-14: locked-door map | FR-06, FR-30, UC-10, U2/U4 |
| C-15: child-only scope | FR-01/02/04/10/27, retired requirements/use cases, U1/U3/U5/U6/U8 |

## Documentation verification versus product verification

Documentation checks validate file links, unique IDs, coverage, and renderable diagram syntax. They cannot prove that an implementation is secure, a child understands the experience, the religious content is correct, or the service meets latency targets. Those checks occur after the relevant content and software exist.
