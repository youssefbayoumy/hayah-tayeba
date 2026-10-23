"""Crop client-supplied collage pixels only; no generation, repainting or upscaling."""
from pathlib import Path
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT/'.codex-remote-attachments/01a0e07f-ec59-70a2-8af1-a4f4bebc1873/24f144d0-4a6a-4f4d-95af-e0a1de908ac9'
DEST = ROOT/'docs/design/prototype/assets/gardens'
DEST.mkdir(parents=True, exist_ok=True)
# Bounds intentionally omit baked-in answer choices and question panels.
CROPS = {
 'welcome':(4,(25,88,355,190)), 'scenery':(1,(435,108,740,194)),
 'boy-portrait':(2,(206,85,312,243)), 'girl-portrait':(2,(31,93,157,252)),
 'takhliya-intro':(1,(4,87,421,250)),
 'tahliya-intro':(2,(4,83,421,220)),
 'tazkiya-intro':(3,(4,86,421,215)),
 'takhliya-1':(1,(909,42,1278,184)),
 'takhliya-2':(1,(435,379,899,456)),
 'takhliya-3':(1,(908,382,1277,456)),
 'takhliya-4':(1,(4,637,421,718)),
 'takhliya-5':(1,(434,638,899,716)),
 'tahliya-1':(2,(860,43,1276,178)),
 'tahliya-2':(2,(4,354,423,456)),
 'tahliya-3':(2,(432,354,851,456)),
 'tahliya-4':(2,(859,354,1276,456)),
 'tahliya-5':(2,(4,614,423,710)),
 'tazkiya-1':(3,(859,42,1277,176)),
 'tazkiya-2':(3,(4,355,424,472)),
 'tazkiya-3':(3,(431,355,852,471)),
 'tazkiya-4':(3,(859,355,1277,472)),
 'tazkiya-5':(3,(4,616,424,731)),
 'takhliya-key':(1,(913,641,1275,730)),
 'tahliya-key':(2,(441,617,845,729)),
 'tazkiya-key':(3,(438,614,848,738)),
 'treasure':(3,(861,617,1276,744)),
}
files={1:'1-1000185161.jpg',2:'2-1000185162.jpg',3:'3-1000185164.jpg',4:'4-1000185163.jpg'}
manifest=[]
for name,(source,bounds) in CROPS.items():
    source_path=SOURCE/files[source]
    if not source_path.exists(): source_path=DEST/'references'/files[source]
    image=Image.open(source_path).convert('RGB').crop(bounds)
    image.save(DEST/f'{name}.png')
    # Remove only this script's superseded, untracked JPEG crop.
    (DEST/f'{name}.jpg').unlink(missing_ok=True)
    manifest.append({'asset':f'{name}.png','source':files[source],'bounds':bounds,'size':image.size,'operation':'lossless original-pixel crop only'})
for filename in files.values():
    # Preserve original references alongside the crop manifest for future maintenance.
    (DEST/'references').mkdir(exist_ok=True)
    source_path=SOURCE/filename
    if source_path.exists(): (DEST/'references'/filename).write_bytes(source_path.read_bytes())
(DEST/'manifest.json').write_text(json.dumps({'version':'0.6.0','sources':'Client supplied 23 October 2026','crops':manifest},ensure_ascii=False,indent=2),encoding='utf-8')
print(f'{len(manifest)} original-art crops created')
