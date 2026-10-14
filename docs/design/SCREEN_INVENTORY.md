# Screen inventory — v0.5

Reusable templates, not twelve separate hard-coded stage screens. Arabic live copy, ages 10–14, child-only. See [revision scope](../revisions/v0.5/README.md).

| Route | Screen and bindings | Key states |
|---|---|---|
| welcome | Garden, both dolls, brand, start | Fresh learner |
| character | Two dolls and optional nickname | Fresh / migrated / editing / failed save |
| map | Two available doors, selected doll, checkpoint | Fresh / returning / progress independently shown |
| journey | Vertical stages, phase titles and progress | Current / complete / previous-stage lock |
| video | One bounded film segment and controls | Loading / paused / resumed / complete / missing file / failed commit |
| stage | Shared story and activity renderer | Select, mirror, seven trait stories, matching, scenario, mission, rephrase, review, seven-day plan |
| reflect | Stage prompts, optional writing, deliberate completion | Skipped / draft / saved / failed completion |
| editor | Prompt, local written answer and save | Empty / draft / saved edit / unsaved failure / deletion |
| reward | Named badge and next action | Stage badge / final journey closing / replay without duplicate |
| moments | Active journey plan and daily records | No plan / plan / same-day edit / history |
| notebook | Shared diary labelled by journey/stage | Empty / draft / saved / legacy writing |
| profile | Shared doll/nickname and learning keepsakes | No badges / earned badges / safe character change |
| settings | Language, motion and data explanation | Reset cancel / success / failure |
| load-error | Recoverable local-load failure | Retry / settings; no automatic overwrite |

Important sheets: actual prerequisite, note deletion, learner reset, unsaved navigation, same-day check-in edit. The old v0.4 core screens and Stitch studies are preserved as explicitly historical references in [the archive board](index-v04.html).

The canonical v0.5 captures are in `screens/v0.5/`; all come from the implemented preview. Three range bindings precede t1/t4/t12. Written reflection IDs include journey/stage/prompt. Required content gates never depend on optional reflection or claimed real-world success.
