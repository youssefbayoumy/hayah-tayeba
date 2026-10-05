# Design System: الحياة الطيبة — Offline MVP

Working design proposal · 2026-10-05 · aligned to v0.4 DEC-02/03/04. The locked v0.3 baseline is preserved. `TOKENS.json` is the matching machine-readable token reference. Educational wording, XP amounts, and seven-day completion gates are not finalized by this design.

## 1. Visual Theme & Atmosphere

An illustrated field journal for exploring a gentle fantasy world: warm paper, deep pine, garden paths, architectural arches, and lightly drawn contour lines. The world has visual wonder; instructions and everyday situations remain direct and familiar. Children aged 10–14 should feel they are exploring something meaningful rather than using a preschool reward game.

- Density: 4/10, balanced; short copy, one prominent decision per screen.
- Variance: 3–4/10; confident artwork and a slightly offset composition, stable controls and predictable reading order.
- Motion: 2–3/10; restrained feedback, no continuously moving controls or attention-seeking loops.
- One complete Dhikr door. Future doors may be visible only as clearly unavailable previews; a lock must not imply that completing Dhikr unlocks unpublished content.
- Child-only local experience. No login, parent lane, pairing, cloud status, online invitation, microphone, or voice recording.
- Offline is ordinary operation. A device without internet uses exactly the same learning flow.

Adaptation of the Stitch taste workflow: its web hero layouts, Latin-font preferences, CSS-grid prescriptions, inline headline imagery, and perpetual animation are not requirements for this Arabic native learning app. Clear Arabic shaping, stable navigation, and child comprehension take precedence. A symmetric story frame is appropriate when it improves focus.

## 2. Color Palette & Roles

| Token | Name / Hex | Use |
|---|---|---|
| `canvas` | Paper / `#F7F8F5` | Entire application background; warm neutral with very slight green undertone |
| `surface` | Clear sheet / `#FFFFFF` | Writing areas and occasional separated controls |
| `ink` | Forest ink / `#243B36` | Titles, body text, navigation icons |
| `textSecondary` | Sage ink / `#566961` | Supporting text, captions, metadata; never lower-opacity body text |
| `accent` | Deep pine / `#246B60` | Sole interactive accent: primary actions, selection, focus, progress |
| `accentPressed` | Pressed pine / `#1D574E` | Pressed primary action |
| `accentSoft` | Pine wash / `#E8F0EB` | Selected-row fill, low-intensity learning feedback |
| `border` | Paper seam / `#C9D3CC` | Decorative separators and nonessential container boundaries |
| `controlBorder` | Clear edge / `#6F8279` | Essential input/choice boundary when needed for recognition |
| `error` | Clay ink / `#8B4B3F` | Destructive/error text and icon; semantic exception, not a second decorative accent |
| `errorSoft` | Clay wash / `#F3E9E5` | Error surface paired with clay ink and an explanatory icon |

Illustration-only colors: sand `#D9C9AC`, pale leaf `#BFCFBF`, stone `#C5CECA`, clay `#CBAF9C`. They are not interactive accents and cannot carry text, selection, or status meaning on their own.

Contrast measured with WCAG sRGB luminance calculations:

| Pair | Ratio |
|---|---:|
| Forest ink on paper | 11.23:1 |
| Pine on paper | 5.89:1 |
| White on pine | 6.27:1 |
| Sage ink on paper | 5.49:1 |
| Sage ink on white | 5.85:1 |
| Clay ink on paper | 6.20:1 |
| Pine on pine wash | 5.41:1 |
| Clear edge on paper | 3.83:1 |

The decorative seam is only 1.44:1 against paper: never use it as the sole boundary of an input or as the sole indicator of a selected/focused state. These values describe tokens, not a certification of every finished screen; inspect overlays, pressed/disabled states, and actual exported artwork separately.

## 3. Typography Rules

- Primary family: **Noto Sans Arabic**, bundled at regular 400, medium 500, semibold 600, and bold 700 weights. A browser prototype may fall back to `Tahoma, Arial, sans-serif` without an external font request. Native font registration is explicit; do not assume a CSS font stack works in React Native.
- Display: 28 px / 42 px line height / 700. Page heading: 24 / 36 / 700. Section heading: 20 / 32 / 600. Body: 18 / 30 / 400. Supporting text: 16 / 26 / 400. Caption: 14 / 24 / 500, only for secondary metadata. Button label: 17 / 28 / 600.
- Written answers: minimum 18 / 30, aligned to the right. Instruction text never falls below 16 px.
- Arabic letter spacing is 0; do not squeeze tracking or uppercase Arabic. Verify shaping, diacritics, line breaks, and glyph clipping on Android and iOS.
- Use hierarchy through weight, space, and contrast. Keep one short page title rather than stacked oversized headings.
- Allow system text scaling and multi-line labels. Prefer 45–60 Arabic characters per body line where width permits; phone screens naturally wrap earlier. Never truncate story dialogue or instructions.
- Arabic interface numeral formatting is consistent; stable canonical IDs and any developer diagnostics stay out of the product surface.

## 4. Component Stylings

**Primary action.** Pine fill, white text, 16 px radius, minimum 52 px height, 20 px horizontal padding. One primary action per decision area. On press, use the pressed token and optionally a 0.98 scale for 100 ms. Disabled action has a visible text explanation when the reason is not obvious; retain readable ink instead of relying on low opacity.

**Secondary / quiet actions.** Ink text on paper, minimum 48 px target. Underline text links if not visibly button-shaped. Back, skip, replay, and cancel remain recognizable beside a clear primary action. A bottom action area is a layout row inside safe-area constraints, never an overlay covering story text.

**Answer choices.** Full-width rows, minimum 64 px height with 16 px padding and 12 px gap. Neutral background, visible edge, right-aligned wording. Selected state combines 2 px pine outline, pine-wash fill, a check icon, and an explicit selected semantics value. In form-like selectors, selection waits for a continue action. In a narrative choice, tapping opens the authored consequence and permits retry; learning completion waits for the defined deliberate progression action. Multiple-feeling questions use actual multiple-selection behavior where the curriculum calls for it.

**Cards.** Reserve rounded containers for a writing page, a practice unit, or a meaningful grouped interaction. A main map is a spatial illustration, not a grid of equal cards. Narrative pages use open space with separators and a broad artwork panel. No heavy elevation; a rare `0, 4, 12` shadow at 6% ink opacity is enough. Native shadow/elevation behavior must be mapped explicitly.

**Inputs.** Visible label above; no placeholder-only label. Minimum 56 px field with clear edge and 2 px focus outline. Reflection editor has minimum 180 px height, right-aligned writing, generous inset, and space for keyboard-safe actions. Placeholder is a sample response starter, never an instruction the child must copy. Empty reflection may be skipped.

**Reflection save.** States distinguish `draft`, `saving`, `saved`, and `save failed`. Use truthful wording: “تم الحفظ على الجهاز” only after a successful local commit. Failure wording: “لم نقدر نحفظ كتابتك. النص ما زال هنا، جرّب مرة ثانية.” Keep the typed value present, offer “إعادة المحاولة”, and allow continued editing. Navigation after failure must explain that leaving can lose unsaved changes. No reassurance of durable draft recovery if a storage error prevented that persistence.

**Story / local media.** Art and text have separate zones. Short dialogue, optional bundled narration controls, captions, replay, and a clear next action. Native playback symbols remain conventional. A missing local file explains that the content cannot open and offers return/retry; it never asks the child to connect. A network skeleton is unnecessary; only show a stable placeholder when local loading is perceptible.

**Practice check-in.** Date/history affordances remain simple, with “جربت اليوم” and descriptive confirmation. Avoid repeated rewards for duplicate taps. A practice unit is replayable and completion language does not claim to measure sincerity, spirituality, or emotional improvement. Do not design a mandatory seven-day lock as an approved rule.

**Progress / keepsakes.** Use milestone marks, collected objects, and a restrained path segment. Name the concrete learning achievement. No leaderboard, morality meter, fabricated points, guilt about missed days, or competitive faith ranking.

**Settings / reset.** Separate progress management from individual reflection deletion. Whole-profile reset uses a clear confirmation sheet: “هتتمسح الشخصية والتقدم والكتابات المحفوظة من الجهاز.” Buttons: “إلغاء” and “مسح البيانات”. Cancel is the safe initial focus. A destructive action executes only after explicit confirmation, waits for storage completion, and returns to setup only on success. On failure show “ما قدرناش نمسح البيانات. جرّب تاني.” Retain the current profile view and never claim successful erasure.

**Empty journal.** A small neutral illustration, “لسه ما كتبتش تأملات”, and a link to the current prompt. No generated child answers or fabricated practice history.

## 5. Layout & Arabic RTL

- Base phone reference: 390 × 844 logical px; margins 24, content width 342. Check 360 px narrow screens and 430 px wider screens. On tablets cap text/interaction column around 560 px while giving art a separate generous region.
- Spacing scale: 4, 8, 12, 16, 24, 32, 40, 48. Major region gaps 24–32 px; compact control gaps 12–16 px.
- Screen shell: safe-area header → scrollable content → safe-area action row where needed. Keyboard appearance must not hide save controls, the active writing caret, or validation errors.
- Reading and interaction order begins at the right. Use semantic start/end in native layout, with explicit RTL testing for icons, focus, and screen-reader order. Back points right in RTL; forward progression points left. Do not mirror play, pause, a photograph, or established check symbols blindly.
- Character setup presents a large character preview followed by choices, nickname, and a clear continue action. All choices fit predictable groups rather than long horizontal carousel strips. Nickname is not an account or legal-name request.
- Map labels occupy their own paper plaques or layout text regions, visually separated from art. They never sit directly on textured illustration. Door nodes have stable bounded targets with nearby textual state explanations; decorative path geometry may be positioned inside the art layer.
- Dhikr is the only currently available content door. A future “معية الله” preview states “غير متاح في هذه النسخة” rather than offering a nonfunctional unlock action.
- Journey overview uses one continuous vertical path/outline, with completed/current/upcoming stage text. Learning prerequisite locks describe the next action; future-content locks describe availability. Those are different states.
- Global bottom navigation has exactly three labelled destinations: “الخريطة”، “لحظاتي”، “دفتر الرحلة”. The first item begins at the right in the RTL layout. Profile and settings are reached through the header, not an additional bottom tab. Story/practice screens focus on the task and expose a clearly labelled return action; navigation must not discard unsaved answers silently.
- No horizontal overflow; avoid text on art, overlapping footer controls, absolute text stacking, or viewport-fixed heights that break with large fonts.

## 6. Motion & Interaction

- Press feedback: 100 ms; selection: 140 ms; screen transitions: 180–220 ms; milestone reveal: at most 350 ms and dismissible.
- Motion uses opacity and transforms only. An optional native spring uses stiffness 100 / damping 20. No perpetual floating, shimmer, bouncing controls, typewriter story text, or confetti lasting across navigation.
- Respect reduced motion: replace positional movement with a brief opacity change or immediate state update. No core information is revealed solely by an animation.
- Target size minimum 48 × 48 px; icon glyph 20–24 px within it. Adjacent actions need at least 8 px separation. Meaning comes from text/icons as well as color.
- Haptics are optional device feedback and never necessary to understand an outcome.

## 7. Native & Offline Asset Requirements

- For the installed Expo React Native MVP, bundle each font weight, map/door/character art, narration file, video, subtitle/caption, and step image locally. No remote image URL, runtime font fetch, API, streaming dependency, or first-use download is allowed on the learning path.
- Keep content IDs stable across Arabic and eventual English. The visual system accommodates alternate text lengths; English is not shown as available in the Arabic-only MVP.
- Art exports: vector or local raster at appropriate display resolution; assets include transparent variants where composition requires them. Avoid oversized videos and unnecessary raster text. Arabic copy remains live UI text.
- Content package version and learner schema version are distinct. A bundled-content update must preserve character, progress, and written reflections.
- The browser prototype may use local/system fonts and locally authored SVG so it remains self-contained. Label it as a UI prototype; browser storage is not evidence that the native offline acceptance tests passed.
- Written reflections remain private local data. No automatic future upload promise is made by these designs.

## 8. Anti-Patterns & Review Gates

Never use preschool chibi styling as the default, emoji-based navigation, neon gradients, glowing purple, pure-black UI surfaces, generic equal card dashboards, tiny grey text, fake learner analytics, endless feeds, streak guilt, nonfunctional locked-door CTAs, text baked into artwork, or copy that declares the child more faithful because a task was completed.

Before implementation handoff, inspect: Arabic shaping and large text; art/text separation; selected plus disabled states; 48 px targets; local media controls; local-save failures; unsaved reflection navigation; delete/reset cancellation and failure; unavailable future-door explanation; first launch without connectivity; and reduced-motion behavior. Test the visual tone with both a 10-year-old and a 14-year-old rather than assuming one style fits the whole range.
