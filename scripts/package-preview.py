"""Package the current handoff and check media/baseline integrity."""
from pathlib import Path
import hashlib, json, zipfile
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

film = ROOT/'WhatsApp Video 2026-10-12 at 4.55.25 PM.mp4'
bundled = ROOT/'docs/design/prototype/assets/tazkiya-overview.mp4'
assert sha(film) == sha(bundled), 'Bundled film changed'
baseline = ROOT/'baselines/v0.3-2026-10-03/Hayah_Tayeba_v0.3_Baseline.zip'
assert sha(baseline) == '2e0f38cae68847bfbd2d8c6bbcfee594da71ec1bfe887a2ad65dd971f4cba6e2', 'Frozen baseline changed'
alpha = {}
for name in ('boy.png','girl.png'):
    image = Image.open(bundled.parent/name)
    assert image.mode == 'RGBA' and image.getchannel('A').getextrema() == (0,255)
    alpha[name] = {'size':image.size,'mode':image.mode,'alphaRange':[0,255]}

# Contact sheet uses existing screen captures for QA, not creative image editing.
names=['01-welcome','02-character','03-map','06-compass','10-matching','12-kind-words','14-plan','15-final','17-profile']
contact=Image.new('RGB',(900,1950),'#E9F3FB');draw=ImageDraw.Draw(contact)
for i,name in enumerate(names):
    shot=Image.open(ROOT/'docs/design/screens/v0.5'/f'{name}.png').convert('RGB')
    contact.paste(ImageOps.fit(shot,(280,590),centering=(.5,0)),((i%3)*300+10,(i//3)*650+30))
    draw.text(((i%3)*300+10,(i//3)*650+5),name,fill='#193D59')
contact.save(ROOT/'docs/design/PREVIEW.png')

def luminance(hex_color):
    channels = [int(hex_color[i:i+2], 16)/255 for i in (1, 3, 5)]
    values = [v/12.92 if v <= .04045 else ((v+.055)/1.055)**2.4 for v in channels]
    return sum(v*k for v, k in zip(values, (.2126, .7152, .0722)))
def ratio(a, b):
    values = sorted((luminance(a), luminance(b)))
    return round((values[1]+.05)/(values[0]+.05), 2)

tokens = json.loads((ROOT/'docs/design/TOKENS.json').read_text(encoding='utf-8'))['colors']
contrast = {f'{fg}/{bg}':ratio(tokens[fg], tokens[bg]) for fg in ('navy', 'ink', 'muted', 'green', 'error') for bg in ('paper', 'wood', 'pink', 'sky', 'leaf')}
assert min(contrast.values()) >= 4.5
contrast['white/navy'] = ratio('#FFFFFF',tokens['navy'])
report = {'version':'0.5.0','filmBytes':bundled.stat().st_size,'filmSHA256':sha(bundled),'originalFilmUnchanged':True,'frozenBaselineUnchanged':True,'contrastRatios':contrast,'characterAssets':alpha,'limitations':['Token pairs, not whole-product accessibility certification','Reference-derived generated assets require client likeness review']}
(ROOT/'docs/design/qa/asset-integrity-v05.json').write_text(json.dumps(report,indent=2),encoding='utf-8')

target=ROOT/'output/design/Hayah_Tayeba_UI_UX_Design_Pack_v0.5.zip'
target.parent.mkdir(parents=True,exist_ok=True)
roots=['docs/design','docs/revisions/v0.5','tests','scripts']
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
    for folder in roots:
        for file in sorted((ROOT/folder).rglob('*')):
            if file.is_file():
                z.write(file,file.relative_to(ROOT).as_posix())
    z.write(ROOT/'README.md','README.md')
manifest={'archive':target.name,'bytes':target.stat().st_size,'sha256':sha(target),'version':'0.5.0'}
(target.parent/'Hayah_Tayeba_UI_UX_Design_Pack_v0.5.manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps({'package':str(target),'bytes':manifest['bytes'],'filmUnchanged':True,'baselineUnchanged':True,'minimumTextContrast':min(contrast.values())}))
