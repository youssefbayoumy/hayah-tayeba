/* Run with Playwright and installed Chrome; local server must serve /docs. */
const {chromium}=require('playwright');
const fs=require('fs'), path=require('path'), assert=require('assert/strict');
const BASE=process.env.PREVIEW_URL||'http://127.0.0.1:8761/design/prototype/?demo=1';
const DIR=path.resolve('docs/design/screens/v0.5');fs.mkdirSync(DIR,{recursive:true});
const checks=[],errors=[];const check=(name,value)=>{assert.ok(value,name);checks.push(name);};
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));
const act=(a,v)=>p.locator(`[data-act="${a}"]${v===undefined?'':`[data-value="${v}"]`}`).first().click();
const shot=async name=>{await p.waitForTimeout(230);await p.evaluate(()=>document.getElementById('toast').hidden=true);await p.screenshot({path:path.join(DIR,name+'.png'),fullPage:true});};
const state=()=>p.evaluate(()=>HayahStore.data);
const screen=()=>p.evaluate(()=>HayahApp.screen);
async function completeSegment(id,start,end){
  await p.waitForFunction(()=>document.querySelector('video')?.readyState>=1);
  check(id+' starts in range',await p.evaluate(s=>Math.abs(document.querySelector('video').currentTime-s)<.2,start));
  const duration=await p.evaluate(()=>document.querySelector('video').duration);
  const target=end??duration;
  // Seek near the cut, then actually play across it. No completed state is injected.
  await p.evaluate(t=>{const v=document.querySelector('video');v.muted=true;v.currentTime=t-.55;},target);
  await p.waitForFunction(()=>!document.querySelector('video').seeking);
  await act('video-play');
  await p.waitForFunction(seg=>HayahStore.data.journeys.tazkiya.videos[seg]?.completed,id,{timeout:7000});
  const boundary=await p.evaluate(()=>({time:document.querySelector('video').currentTime,paused:document.querySelector('video').paused}));
  check(id+' pauses at cut',boundary.paused&&Math.abs(boundary.time-target)<.1);
  check(id+' continuation enabled',await p.locator('[data-act="video-next"]').isEnabled());
  await act('video-next');
}
await p.goto(BASE);await shot('01-welcome');await act('go','character');await shot('02-character');
check('exactly two character options',await p.locator('[data-act="character"]').count()===2);
await act('character','boy');await p.locator('#nickname').fill('نور');await act('save-character');await shot('03-map');
check('optional nickname setup works',(await state()).characterId==='boy');
check('both journeys available',await p.locator('[data-act="journey"]').count()===2);
await act('journey','tazkiya');await shot('04-tazkiya-map');await act('stage','t4');
check('sequential stage lock',await p.locator('dialog').isVisible()&&await screen()==='journey');await p.locator('[data-act="close-dialog"]').click();
await act('stage','t1');await p.waitForFunction(()=>document.querySelector('video')?.readyState>=1);await shot('05-video-intro');
await p.evaluate(()=>{document.querySelector('video').currentTime=12;});await act('go','journey');await act('stage','t1');
await p.waitForFunction(()=>document.querySelector('video')?.readyState>=1);check('video resume position',await p.evaluate(()=>Math.abs(document.querySelector('video').currentTime-12)<.2));
await p.evaluate(()=>{document.querySelector('video').currentTime=80;});await p.waitForTimeout(150);
check('seeking cannot escape first range',await p.evaluate(()=>document.querySelector('video').currentTime<=55));
await act('video-restart');await completeSegment('tazkiya-intro',0,55);await shot('06-compass');
await act('choose','1');await act('activity-next');await act('open-prompt','0');await p.locator('#reflection').fill('أريد أن أهدأ قبل أن أتكلم.');await shot('07-reflection');
await act('save-reflection');check('reflection returns to learning',await screen()==='reflect');
await p.reload();await act('resume','tazkiya');check('reflection checkpoint resumes',await screen()==='reflect');
await act('finish-stage');await shot('08-reward');
check('first badge awarded once',(await state()).journeys.tazkiya.badges.length===1);
await act('go','journey');await act('stage','t1');await act('activity-next');await act('finish-stage');
check('replaying does not duplicate badge',(await state()).journeys.tazkiya.badges.length===1);
await act('stage','t2');await act('choose','0');await act('activity-next');await act('finish-stage');
await act('stage','t3');await act('story','2');await act('inspect-story');await shot('09-story');await act('activity-next');await act('finish-stage');
await act('stage','t4');await completeSegment('tazkiya-tahliya',55,115);
for(let i=0;i<5;i++)await p.locator('#match'+i).selectOption(String(i));await act('virtue-choice','1');await shot('10-matching');await act('activity-next');await act('finish-stage');
await act('stage','t5');await act('choose','0');check('authored consequence shown',(await p.locator('.feedback').innerText()).includes('بريء'));await act('retry-choice');await act('choose','2');await shot('11-honesty');await act('activity-next');await act('finish-stage');
await act('stage','t6');await act('choose','0');await act('activity-next');await act('finish-stage');
await act('stage','t7');await act('choose','2');check('trusted help included',(await p.locator('.feedback').innerText()).includes('مساعدة'));await act('activity-next');await act('finish-stage');
await act('stage','t8');for(let i=0;i<3;i++)await act('example',String(i));await shot('12-kind-words');await act('activity-next');await act('finish-stage');
await act('stage','t9');await act('choose','1');await act('activity-next');await act('finish-stage');
await act('stage','t10');await act('choose','2');await act('activity-next');await act('finish-stage');
await act('stage','t11');await shot('13-review');await act('activity-next');await act('finish-stage');
await act('stage','t12');await completeSegment('tazkiya-final',115,null);
await p.locator('#virtue').selectOption({label:'الصدق'});await p.locator('#behavior').selectOption({label:'الكذب'});await p.locator('#good').selectOption({label:'مساعدة أحد'});await shot('14-plan');await act('activity-next');await act('finish-stage');await shot('15-final');
let s=await state();check('all 12 stages complete',s.journeys.tazkiya.completed.length===12);check('12 unique badges',new Set(s.journeys.tazkiya.badges).size===12&&s.journeys.tazkiya.badges.length===12);
check('seven day practice never gates digital completion',s.journeys.tazkiya.practice.length===0);
check('Dhikr progress independent',s.journeys.dhikr.completed.length===0);
await act('go','moments');await act('practice','جربت خطوتي اليوم');await act('practice','حاولت وأحتاج أن أجرب ثانية');await p.locator('[data-act="confirm"]').click();await shot('16-moments');
check('daily check-in edits without duplication',(await state()).journeys.tazkiya.practice.length===1);
await act('go','notebook');await act('entry','tazkiya:t1:p0');check('saved reflection reopens',(await p.locator('#reflection').inputValue()).includes('أهدأ'));
await p.locator('#reflection').fill('أحاول مرة ثانية.');await act('save-reflection');await act('entry','tazkiya:t1:p0');await act('delete-entry','tazkiya:t1:p0');await p.locator('[data-act="close-dialog"]').click();check('delete cancel preserves reflection',!!(await state()).reflections['tazkiya:t1:p0']);await act('delete-entry','tazkiya:t1:p0');await p.locator('[data-act="confirm"]').click();check('individual delete preserves progress',!(await state()).reflections['tazkiya:t1:p0']&&(await state()).journeys.tazkiya.completed.length===12);
await act('go','profile');await act('edit-character');await act('character','girl');await act('save-character');s=await state();check('character edit preserves progress',s.characterId==='girl'&&s.journeys.tazkiya.completed.length===12);
await act('journey','dhikr');for(let i=1;i<=4;i++){await act('stage','d'+i);await act('choose','0');await act('activity-next');await act('finish-stage');await act('go','journey');}check('Dhikr sample remains usable',(await state()).journeys.dhikr.completed.length===4);
await act('go','profile');await shot('17-profile');await act('go','settings');await shot('18-settings');await act('reset');await p.locator('[data-act="close-dialog"]').click();check('reset cancellation preserves progress',(await state()).journeys.tazkiya.completed.length===12);
for(const width of [360,390,430]){await p.setViewportSize({width,height:844});await act('go','map');check('RTL no overflow '+width,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.documentElement.dir==='rtl'));await shot('map-'+width);}
// Legacy upgrade in a separate context: old shape, nickname, checkpoints, drafts, notes.
const legacy={profile:{name:'قديم',avatar:3,appearance:2,color:1,badge:2},done:['story','meaning','plan','complete'],drafts:{'dhikr-reflection-0':'مسودة قديمة'},reflections:{'dhikr-reflection-1':'تأمل قديم'},moment:'sleep',practice:[{day:'2026-10-01',date:'١ أكتوبر',text:'جربت'}],settings:{motion:false},last:'reflection'};
const m=await context.newPage();await m.goto(BASE);await m.evaluate(old=>localStorage.setItem('hayah-tayeba-design-preview-v1',JSON.stringify(old)),legacy);await m.reload();
check('legacy asks for new character',await m.evaluate(()=>HayahApp.screen==='character'&&HayahStore.data.characterId===null));
let migrated=await m.evaluate(()=>HayahStore.data);check('legacy nickname and progress preserved',migrated.profile.name==='قديم'&&migrated.journeys.dhikr.completed.length===4);check('legacy writings preserved',migrated.drafts['dhikr-reflection-0']==='مسودة قديمة'&&migrated.reflections['dhikr-reflection-1'].text==='تأمل قديم');
await m.locator('[data-act="character"][data-value="boy"]').click();await m.locator('[data-act="save-character"]').click();await m.locator('[data-act="go"][data-value="notebook"]').click();check('legacy journal entry labelled',await m.locator('[data-act="entry"]').count()===2);await m.close();
// Storage failures cannot claim completion, navigate destructively, or overwrite raw data.
const failureContext=await browser.newContext({viewport:{width:390,height:844}});const f=await failureContext.newPage();await f.addInitScript(()=>{const original=Storage.prototype.setItem,remove=Storage.prototype.removeItem;window.failStorage=false;Storage.prototype.setItem=function(...args){if(window.failStorage)throw Error('test quota');return original.apply(this,args);};Storage.prototype.removeItem=function(...args){if(window.failStorage)throw Error('test removal');return remove.apply(this,args);};});
await f.goto(BASE);await f.locator('[data-value="character"]').click();await f.locator('[data-act="character"][data-value="boy"]').click();await f.evaluate(()=>window.failStorage=true);await f.locator('[data-act="save-character"]').click();check('setup save failure retains selection',await f.evaluate(()=>HayahApp.screen==='character'&&HayahStore.data.characterId===null));await f.evaluate(()=>window.failStorage=false);await f.locator('[data-act="save-character"]').click();
await f.locator('[data-act="journey"][data-value="dhikr"]').click();await f.locator('[data-act="stage"][data-value="d1"]').first().click();await f.locator('[data-act="choose"][data-value="1"]').click();await f.locator('[data-act="activity-next"]').click();await f.locator('[data-act="open-prompt"]').click();await f.evaluate(()=>window.failStorage=true);await f.locator('#reflection').fill('كتابة لا أريد فقدها');await f.locator('[data-act="save-reflection"]').click();check('failed reflection stays in editor',await f.evaluate(()=>HayahApp.screen==='editor')&&await f.locator('#reflection').inputValue()==='كتابة لا أريد فقدها');await f.locator('[data-act="editor-back"]').last().click();check('failed draft guards navigation',await f.locator('dialog').isVisible());await f.locator('[data-act="close-dialog"]').click();await f.evaluate(()=>window.failStorage=false);await f.locator('[data-act="save-reflection"]').click();
await f.evaluate(()=>window.failStorage=true);await f.locator('[data-act="finish-stage"]').click();check('failed completion never awards badge',await f.evaluate(()=>HayahStore.data.journeys.dhikr.badges.length===0&&HayahApp.screen==='reflect'));await f.evaluate(()=>window.failStorage=false);await f.locator('[data-act="go"][data-value="settings"]').click();await f.evaluate(()=>window.failStorage=true);await f.locator('[data-act="reset"]').click();await f.locator('[data-act="confirm"]').click();check('failed reset retains learner',await f.evaluate(()=>HayahStore.data.characterId==='boy'));await f.locator('[data-act="close-dialog"]').click();await f.evaluate(()=>window.failStorage=false);await f.locator('[data-act="reset"]').click();await f.locator('[data-act="confirm"]').click();check('reset erases both store keys',await f.evaluate(()=>!localStorage.getItem(HayahStore.KEY)&&!localStorage.getItem(HayahStore.KEY+'.backup-v1')&&HayahApp.screen==='welcome'));
await f.evaluate(()=>localStorage.setItem('hayah-tayeba-design-preview-v1','{corrupt'));await f.reload();check('corrupt data protected',await f.evaluate(()=>HayahApp.screen==='load-error'&&localStorage.getItem(HayahStore.KEY)==='{corrupt'));
// Missing media remains an error, not a completed gate.
const missingContext=await browser.newContext();const missing=await missingContext.newPage();await missing.route('**/tazkiya-overview.mp4',route=>route.abort());await missing.goto(BASE);await missing.locator('[data-value="character"]').click();await missing.locator('[data-act="character"][data-value="girl"]').click();await missing.locator('[data-act="save-character"]').click();await missing.locator('[data-act="journey"][data-value="tazkiya"]').click();await missing.locator('[data-act="stage"][data-value="t1"]').first().click();await missing.locator('#video-error').waitFor({state:'visible'});check('missing video never unlocks',await missing.locator('[data-act="video-next"]').isDisabled()&&await missing.evaluate(()=>!HayahStore.data.journeys.tazkiya.videos['tazkiya-intro']?.completed));
check('no uncaught browser errors',errors.length===0);
const report={version:'0.5.0',timestamp:new Date().toISOString(),browser:'installed Chrome / Playwright',base:BASE,checks,errors,passed:checks.length,screenshots:path.relative(process.cwd(),DIR),limitations:['Browser design preview, not native Expo QA','Segment boundary tests use muted real playback after seeking near cuts, not full unattended film/audio playback','Curriculum and source wording remain client-review content']};
fs.writeFileSync('docs/design/qa/browser-report-v05.json',JSON.stringify(report,null,2));console.log(JSON.stringify({passed:checks.length,errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
