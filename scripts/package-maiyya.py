"""Current handoff; preserve all previous packages and original media/artwork."""
from pathlib import Path
import hashlib,json,zipfile
from PIL import Image,ImageOps,ImageDraw
ROOT=Path(__file__).resolve().parents[1]
def sha(file):return hashlib.sha256(file.read_bytes()).hexdigest()
for version in ['0.5','0.6']:
    archive=ROOT/f'output/design/Hayah_Tayeba_UI_UX_Design_Pack_v{version}.zip'
    manifest=json.loads(archive.with_suffix('.manifest.json').read_text(encoding='utf-8'))
    assert sha(archive)==manifest['sha256']
assert sha(ROOT/'baselines/v0.3-2026-10-03/Hayah_Tayeba_v0.3_Baseline.zip')=='2e0f38cae68847bfbd2d8c6bbcfee594da71ec1bfe887a2ad65dd971f4cba6e2'
film=ROOT/'docs/design/prototype/assets/tazkiya-overview.mp4'
assert sha(film)==sha(ROOT/'WhatsApp Video 2026-10-12 at 4.55.25 PM.mp4')
assets=ROOT/'docs/design/prototype/assets/gardens'
manifest=json.loads((assets/'manifest.json').read_text(encoding='utf-8'))
for crop in manifest['crops']:
    actual=Image.open(assets/crop['asset']).convert('RGB')
    expected=Image.open(assets/'references'/crop['source']).convert('RGB').crop(crop['bounds'])
    assert actual.size==expected.size and actual.tobytes()==expected.tobytes()
names=['01-home-three-journeys','02-journey','03-first-story','04-verse-matching','06-dhikr-timer','09-final-badge','10-daily-six-items','11-surprise-triangles','12-virtual-dice']
contact=Image.new('RGB',(900,1950),'#F6D39B');draw=ImageDraw.Draw(contact)
for i,name in enumerate(names):
    shot=Image.open(ROOT/'docs/design/screens/v0.7/maiyya'/f'{name}.png').convert('RGB')
    contact.paste(ImageOps.fit(shot,(280,590),centering=(.5,0)),((i%3)*300+10,(i//3)*650+30))
    draw.text(((i%3)*300+10,(i//3)*650+5),name,fill='#5B2D1C')
contact.save(ROOT/'docs/design/PREVIEW.png')
sources=ROOT/'docs/revisions/v0.7/references'
source_hashes={p.name:sha(p) for p in sources.glob('*.jpg')}
assert len(source_hashes)==5
contrast=json.loads((ROOT/'docs/design/qa/asset-integrity-v06.json').read_text(encoding='utf-8'))['contrastRatios']
# The actual palette is retained from v0.6; compare tokens before reusing its measured ratios.
previous_tokens=json.loads(zipfile.ZipFile(ROOT/'output/design/Hayah_Tayeba_UI_UX_Design_Pack_v0.6.zip').read('docs/design/TOKENS.json'))
tokens=json.loads((ROOT/'docs/design/TOKENS.json').read_text(encoding='utf-8'))
assert tokens['colors']==previous_tokens['colors']
report={'version':'0.7.0','previousHandoffsUnchanged':True,'frozenBaselineUnchanged':True,'originalFilmUnchanged':True,'verifiedOriginalCrops':len(manifest['crops']),'paletteUnchangedFromV06':True,'contrastRatios':contrast,'newContentReferences':source_hashes,'limitations':['Browser preview, not native offline/device acceptance','Religious copy remains for client editorial review','New reference images are not a theme change']}
(ROOT/'docs/design/qa/asset-integrity-v07.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
target=ROOT/'output/design/Hayah_Tayeba_UI_UX_Design_Pack_v0.7.zip'
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
    for folder in ['docs/design','docs/revisions/v0.7','tests','scripts']:
        for file in sorted((ROOT/folder).rglob('*')):
            if not file.is_file() or '__pycache__' in file.parts:continue
            # This ZIP is the current handoff, not a duplicate of every old screenshot/export.
            relative=file.relative_to(ROOT).as_posix()
            if relative.startswith('docs/design/stitch-export/'):continue
            if relative.startswith('docs/design/screens/') and not relative.startswith('docs/design/screens/v0.7/'):continue
            z.write(file,relative)
    z.write(ROOT/'README.md','README.md')
result={'version':'0.7.0','archive':target.name,'bytes':target.stat().st_size,'sha256':sha(target)}
target.with_suffix('.manifest.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps({**result,'verifiedOriginalCrops':len(manifest['crops']),'previousVersionsAndMediaUnchanged':True}))
