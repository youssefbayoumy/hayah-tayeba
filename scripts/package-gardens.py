"""Verify v0.6 source pixels/media/baseline, then package the current handoff."""
from pathlib import Path
import hashlib, json, zipfile
from PIL import Image, ImageOps, ImageDraw

ROOT=Path(__file__).resolve().parents[1]
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
assets=ROOT/'docs/design/prototype/assets/gardens'
manifest=json.loads((assets/'manifest.json').read_text(encoding='utf-8'))
crop_checks=[]
for crop in manifest['crops']:
    actual=Image.open(assets/crop['asset']).convert('RGB')
    expected=Image.open(assets/'references'/crop['source']).convert('RGB').crop(crop['bounds'])
    assert actual.size==expected.size and actual.tobytes()==expected.tobytes(),crop['asset']
    crop_checks.append({'asset':crop['asset'],'pixelExactOriginalCrop':True,'sha256':sha(assets/crop['asset'])})
film=ROOT/'docs/design/prototype/assets/tazkiya-overview.mp4'
assert sha(film)==sha(ROOT/'WhatsApp Video 2026-10-12 at 4.55.25 PM.mp4')
assert sha(ROOT/'baselines/v0.3-2026-10-03/Hayah_Tayeba_v0.3_Baseline.zip')=='2e0f38cae68847bfbd2d8c6bbcfee594da71ec1bfe887a2ad65dd971f4cba6e2'
previous=ROOT/'output/design/Hayah_Tayeba_UI_UX_Design_Pack_v0.5.zip'
previous_manifest=json.loads((previous.parent/'Hayah_Tayeba_UI_UX_Design_Pack_v0.5.manifest.json').read_text(encoding='utf-8'))
assert sha(previous)==previous_manifest['sha256'],'Previous handoff was changed'

def luminance(color):
    channels=[int(color[i:i+2],16)/255 for i in (1,3,5)]
    values=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in channels]
    return sum(v*k for v,k in zip(values,(.2126,.7152,.0722)))
def ratio(a,b):
    values=sorted((luminance(a),luminance(b)))
    return round((values[1]+.05)/(values[0]+.05),2)
colors=json.loads((ROOT/'docs/design/TOKENS.json').read_text(encoding='utf-8'))['colors']
contrast={f'{fg}/{bg}':ratio(colors[fg],colors[bg]) for fg in ('navy','ink','muted','green','error') for bg in ('paper','wood','pink','sky','leaf')}
assert min(contrast.values())>=4.5,contrast
contrast['white/accent']=ratio('#FFFFFF',colors['accent'])
assert contrast['white/accent']>=4.5
integrity={'version':'0.6.0','originalFilmUnchanged':True,'filmSHA256':sha(film),'frozenBaselineUnchanged':True,'v05HandoffUnchanged':True,'cropChecks':crop_checks,'contrastRatios':contrast,'limitations':['Token contrast, not whole-product certification','Original collage resolution retained','No synthetic image detail added']}
(ROOT/'docs/design/qa/asset-integrity-v06.json').write_text(json.dumps(integrity,indent=2),encoding='utf-8')

names=['01-welcome','02-character','03-home','04-three-gardens','challenge-takhliya-1','challenge-tahliya-3','challenge-tazkiya-3','key-tazkiya','08-treasure']
contact=Image.new('RGB',(900,1950),'#F6D39B');draw=ImageDraw.Draw(contact)
for i,name in enumerate(names):
    shot=Image.open(ROOT/'docs/design/screens/v0.6'/f'{name}.png').convert('RGB')
    contact.paste(ImageOps.fit(shot,(280,590),centering=(.5,0)),((i%3)*300+10,(i//3)*650+30))
    draw.text(((i%3)*300+10,(i//3)*650+5),name,fill='#5B2D1C')
contact.save(ROOT/'docs/design/PREVIEW.png')
target=ROOT/'output/design/Hayah_Tayeba_UI_UX_Design_Pack_v0.6.zip'
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as archive:
    for directory in ['docs/design','docs/revisions/v0.6','tests','scripts']:
        for file in sorted((ROOT/directory).rglob('*')):
            if file.is_file() and '__pycache__' not in file.parts: archive.write(file,file.relative_to(ROOT).as_posix())
    archive.write(ROOT/'README.md','README.md')
result={'archive':target.name,'version':'0.6.0','bytes':target.stat().st_size,'sha256':sha(target)}
(target.parent/'Hayah_Tayeba_UI_UX_Design_Pack_v0.6.manifest.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps({**result,'verifiedOriginalCrops':len(crop_checks),'minimumTextContrast':min(contrast.values()),'originalFilmAndPreviousVersionsUnchanged':True}))
