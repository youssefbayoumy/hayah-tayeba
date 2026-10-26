/* Current v0.6 browser acceptance. Start scripts/serve-preview.py --port 8762. */
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('assert/strict'),{v2}=require('./garden-fixtures.cjs');
const BASE=process.env.PREVIEW_URL||'http://127.0.0.1:8763/design/prototype/?demo=1',OUT='docs/design/screens/v0.7/regression';
fs.mkdirSync(OUT,{recursive:true});const checks=[],errors=[];
function check(name,value){assert.ok(value,name);checks.push(name);}
let browser;
(async()=>{
 browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));
 const act=(a,v)=>p.locator(`[data-act="${a}"]${v===undefined?'':`[data-value="${v}"]`}`).first().click();
 const state=()=>p.evaluate(()=>HayahStore.data),screen=()=>p.evaluate(()=>HayahApp.screen);
 const shot=async name=>{await p.evaluate(()=>document.getElementById('toast').hidden=true);await p.screenshot({path:path.join(OUT,name+'.png'),fullPage:true});};
 async function setup(){await p.goto(BASE);await act('go','character');await act('character','girl');await p.locator('#nickname').fill('نور');await act('save-character');}
 async function segment(id,start,end){
  await p.waitForFunction(()=>document.querySelector('video')?.readyState>=1);
  check(id+' begins within configured range',await p.evaluate(s=>Math.abs(document.querySelector('video').currentTime-s)<.2,start));
  const target=end??await p.evaluate(()=>document.querySelector('video').duration);
  await p.evaluate(t=>{const v=document.querySelector('video');v.muted=true;v.currentTime=t-.6;},target);
  await p.waitForFunction(()=>!document.querySelector('video').seeking);await act('video-play');
  await p.waitForFunction(id=>HayahStore.data.journeys.tazkiya.videos[id]?.completed,id,{timeout:10000});
  check(id+' pauses at boundary',await p.evaluate(t=>document.querySelector('video').paused&&Math.abs(document.querySelector('video').currentTime-t)<.1,target));
  await act('video-next');
 }
 await p.goto(BASE);await shot('01-welcome');await act('go','character');await shot('02-character');
 check('only two original-art character choices',await p.locator('[data-act="character"]').count()===2);
 await act('character','girl');await p.locator('#nickname').fill('نور');await act('save-character');await shot('03-home');
 check('main map has three journeys',await p.locator('[data-act="journey"]').count()===3);
 await act('journey','tazkiya');await shot('04-three-gardens');
 check('exactly three nested garden doors',await p.locator('[data-act="garden"]').count()===3);
 await act('garden','tahliya');check('later garden is locked',await p.locator('dialog').isVisible()&&await screen()==='journey');await p.locator('[data-act="close-dialog"]').click();
 await act('treasure');check('treasure requires all keys',await p.locator('dialog').isVisible());await p.locator('[data-act="close-dialog"]').click();
 await act('garden','takhliya');await p.waitForFunction(()=>document.querySelector('video')?.readyState>=1);await shot('05-video');
 await p.evaluate(()=>document.querySelector('video').currentTime=12);await p.waitForFunction(()=>!document.querySelector('video').seeking);await act('go','journey');await act('garden','takhliya');await p.waitForFunction(()=>document.querySelector('video')?.readyState>=1);
 check('video position resumes',await p.evaluate(()=>Math.abs(document.querySelector('video').currentTime-12)<.2));
 await p.evaluate(()=>document.querySelector('video').currentTime=90);await p.waitForTimeout(100);check('seek cannot escape first segment',await p.evaluate(()=>document.querySelector('video').currentTime<=55));
 await act('video-restart');await segment('tazkiya-intro',0,55);await shot('06-garden-map');
 await act('stage','takhliya-3');check('within-garden challenge lock',await p.locator('dialog').isVisible());await p.locator('[data-act="close-dialog"]').click();
 const gardens=[['takhliya','tazkiya-intro',0,55],['tahliya','tazkiya-tahliya',55,115],['tazkiya','tazkiya-final',115,null]];
 let explored=0;
 for(let gi=0;gi<gardens.length;gi++){
  const [gid,vid,start,end]=gardens[gi];
  if(gi){await act('garden',gid);await segment(vid,start,end);}
  await act('stage',gid+'-1');
  for(let n=1;n<=5;n++){
   check(`${gid}-${n} has three client choices`,await p.locator('[data-act="choose"]').count()===3);
   check(`${gid}-${n} has no answers preselected`,await p.locator('[data-act="choose"][aria-pressed="true"]').count()===0);
   for(let choice=0;choice<3;choice++){
    await act('choose',String(choice));check(`${gid}-${n} choice ${choice} explains and permits next`,await p.locator('.feedback').innerText().then(x=>x.length>35)&&await p.locator('[data-act="activity-next"]').isEnabled());
   }
   const notSuggested=await p.evaluate(()=>HAYAH_CONTENT.journeys[1].stages.find(s=>s.id===HayahApp.route.stageId).options.findIndex(o=>!o.suggested));await act('choose',String(notSuggested));
   if(gid==='tazkiya'&&n===3){await act('choose','1');check('talking to others is not condemned',(await p.locator('.feedback').innerText()).includes('طلب الدعم'));}
   await shot(`challenge-${gid}-${n}`);
   if(gi===0&&n===2){await p.reload();await act('resume','tazkiya');check('selected answer and challenge checkpoint survive reload',await p.locator('[data-act="choose"][aria-pressed="true"]').count()===1);}
   await act('activity-next');explored++;
   check(`${gid}-${n} counts exploration, not correctness`,(await state()).journeys.tazkiya.completed.length===explored);
  }
  check(gid+' earns exactly one garden key',(await state()).journeys.tazkiya.badges.length===gi+1);
  await shot(`key-${gid}`);
  if(gi===0){
   await act('open-prompt','0');await p.locator('#reflection').fill('أفكر في كلامي وأحاول مرة أخرى.');await shot('07-writing');await act('save-reflection');check('optional writing returns to key screen',await screen()==='garden-reward');
   await act('go','journey');await act('garden','takhliya');await act('stage','takhliya-5');await act('choose','0');await act('activity-next');check('replay cannot duplicate keys or progress',(await state()).journeys.tazkiya.badges.length===1&&(await state()).journeys.tazkiya.completed.length===5);
  }
 }
 await act('treasure');await shot('08-treasure');let data=await state();
 check('15 explored challenges and exactly 3 keys',data.journeys.tazkiya.completed.length===15&&data.journeys.tazkiya.badges.length===3);
 check('Dhikr progress independent',data.journeys.dhikr.completed.length===0);
 check('daily practice never gates treasure',data.journeys.tazkiya.practice.length===0);
 await act('plan-edit');await p.locator('#virtue').selectOption({label:'الصدق'});await p.locator('#behavior').selectOption({label:'الكذب'});await p.locator('#good').selectOption({label:'مساعدة أحد'});await shot('09-plan');await act('save-plan');
 await act('practice','جربت خطوتي اليوم');await act('practice','حاولت وأحتاج أن أجرب ثانية');await p.locator('[data-act="confirm"]').click();await shot('10-moments');check('duplicate daily record edits instead',(await state()).journeys.tazkiya.practice.length===1);
 await act('go','notebook');await shot('11-notebook');await act('entry','tazkiya:takhliya-5:p0');await p.locator('#reflection').fill('كتابة معدّلة');await act('save-reflection');await act('entry','tazkiya:takhliya-5:p0');check('saved note reopens and edits',await p.locator('#reflection').inputValue()==='كتابة معدّلة');
 await act('delete-entry','tazkiya:takhliya-5:p0');await p.locator('[data-act="close-dialog"]').click();check('delete cancellation retains writing',!!(await state()).reflections['tazkiya:takhliya-5:p0']);await act('delete-entry','tazkiya:takhliya-5:p0');await p.locator('[data-act="confirm"]').click();check('note deletion keeps all keys',(await state()).journeys.tazkiya.badges.length===3);
 await act('go','profile');await act('edit-character');await act('character','boy');await act('save-character');check('character change preserves new journey',(await state()).characterId==='boy'&&(await state()).journeys.tazkiya.completed.length===15);
 await act('journey','dhikr');for(let i=1;i<=4;i++){await act('stage','d'+i);await act('choose','0');await act('activity-next');await act('finish-stage');await act('go','journey');}check('all four original Dhikr sample stages usable',(await state()).journeys.dhikr.completed.length===4);
 await act('go','profile');await shot('12-profile');await act('go','settings');await shot('13-settings');await act('reset');await p.locator('[data-act="close-dialog"]').click();check('reset cancellation preserves both journeys',(await state()).journeys.tazkiya.completed.length===15);
 const entryState=await state();
 for(const width of [360,390,430]){
  await p.setViewportSize({width,height:844});await act('go','map');await shot('home-'+width);check('home RTL and no overflow '+width,await p.evaluate(()=>document.documentElement.dir==='rtl'&&document.documentElement.scrollWidth<=innerWidth));
  await act('journey','tazkiya');await act('garden','tazkiya');await act('stage','tazkiya-3');check('question no overflow '+width,await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await shot('question-'+width);
  await act('go','settings');await act('motion');check('motion switch persists '+width,typeof (await state()).settings.motion==='boolean');
 }
 // v0.5 upgrade retains all old writings, including draft-only metadata.
 await p.evaluate(old=>localStorage.setItem(HayahStore.KEY,JSON.stringify(old)),v2());await p.reload();
 check('v2 upgrades to schema 4',await p.evaluate(()=>HayahStore.data.schemaVersion===4));check('old completion archived, new challenges fresh',(await state()).archives.tazkiyaV05.progress.completed.length===12&&(await state()).journeys.tazkiya.completed.length===0);
 await act('go','notebook');await act('entry','tazkiya:t11:p1');check('old draft-only note reopens without missing stage',await p.locator('#reflection').inputValue()==='كتابة لم أحفظها كتأمل');await p.locator('#reflection').fill('تأمل سابق تم تعديله');await act('save-reflection');await act('entry','tazkiya:t11:p1');check('old note edits preserve archived origin',(await state()).reflections['tazkiya:t11:p1'].archived===true);await act('delete-entry','tazkiya:t11:p1');await p.locator('[data-act="confirm"]').click();check('deleting old note also purges raw migration backup',await p.evaluate(()=>!localStorage.getItem(HayahStore.KEY+'.backup-v2')));
 await act('go','profile');await p.locator('summary').click();await shot('14-previous-journey');check('old keepsakes remain visible',await p.locator('details .badge-card').count()===12);
 await act('go','map');await act('journey','tazkiya');await act('garden','takhliya');check('previous video completion remains valid',await screen()==='garden');
 // Fault injection stays isolated from ordinary learner flow.
 const fc=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),f=await fc.newPage();f.on('pageerror',e=>errors.push(e.message));
 await f.addInitScript(()=>{window.failStorage=false;const set=Storage.prototype.setItem,remove=Storage.prototype.removeItem;Storage.prototype.setItem=function(...args){if(window.failStorage)throw Error('test quota');return set.apply(this,args);};Storage.prototype.removeItem=function(...args){if(window.failStorage)throw Error('test removal');return remove.apply(this,args);};});
 await f.goto(BASE);await f.locator('[data-value="character"]').first().click();await f.locator('[data-act="character"][data-value="boy"]').click();await f.evaluate(()=>window.failStorage=true);await f.locator('[data-act="save-character"]').click();check('failed setup remains on character screen',await f.evaluate(()=>HayahApp.screen==='character'&&HayahStore.data.characterId===null));
 await f.evaluate(()=>window.failStorage=false);await f.locator('[data-act="save-character"]').click();
 const old=v2();old.journeys.tazkiya.completed=[];old.journeys.tazkiya.badges=[];old.journeys.tazkiya.checkpoint=null;
 await f.evaluate(old=>localStorage.setItem(HayahStore.KEY,JSON.stringify(old)),old);await f.reload();await f.locator('[data-act="journey"][data-value="tazkiya"]').click();await f.locator('[data-act="garden"][data-value="takhliya"]').click();await f.locator('[data-act="stage"][data-value="takhliya-1"]').click();await f.locator('[data-act="choose"][data-value="2"]').click();await f.evaluate(()=>window.failStorage=true);await f.locator('[data-act="activity-next"]').click();check('failed challenge save never completes',await f.evaluate(()=>HayahApp.screen==='stage'&&HayahStore.data.journeys.tazkiya.completed.length===0));
 await f.evaluate(()=>window.failStorage=false);await f.locator('[data-act="go"][data-value="garden"]').first().click();await f.locator('[data-act="go"][data-value="journey"]').first().click();await f.locator('[data-act="go"][data-value="map"]').first().click();await f.locator('[data-act="go"][data-value="notebook"]').first().click();await f.locator('[data-act="entry"][data-value="tazkiya:t8:p0"]').click();await f.evaluate(()=>window.failStorage=true);await f.locator('#reflection').fill('لا أفقد هذه الكتابة');await f.locator('[data-act="save-reflection"]').click();check('failed note save retains typed value',await f.locator('#reflection').inputValue()==='لا أفقد هذه الكتابة'&&await f.evaluate(()=>HayahApp.screen==='editor'));await f.locator('[data-act="editor-back"]').last().click();check('failed note guards navigation',await f.locator('dialog').isVisible());await f.locator('[data-act="close-dialog"]').click();await f.evaluate(()=>window.failStorage=false);await f.locator('[data-act="save-reflection"]').click();
 await f.locator('[data-act="go"][data-value="settings"]').click();await f.evaluate(()=>window.failStorage=true);await f.locator('[data-act="reset"]').click();await f.locator('[data-act="confirm"]').click();check('failed reset preserves learner and archive',await f.evaluate(()=>HayahStore.data.characterId==='girl'&&!!HayahStore.data.archives.tazkiyaV05));await f.locator('[data-act="close-dialog"]').click();await f.evaluate(()=>window.failStorage=false);await f.locator('[data-act="reset"]').click();await f.locator('[data-act="confirm"]').click();check('reset clears current state and both backups',await f.evaluate(()=>!localStorage.getItem(HayahStore.KEY)&&!localStorage.getItem(HayahStore.KEY+'.backup-v1')&&!localStorage.getItem(HayahStore.KEY+'.backup-v2')&&HayahApp.screen==='welcome'));
 await f.evaluate(()=>localStorage.setItem('hayah-tayeba-design-preview-v1','{corrupt'));await f.reload();check('corrupt data is preserved without overwrite',await f.evaluate(()=>HayahApp.screen==='load-error'&&localStorage.getItem(HayahStore.KEY)==='{corrupt'));
 const mc=await browser.newContext(),m=await mc.newPage();await m.route('**/tazkiya-overview.mp4',r=>r.abort());await m.goto(BASE);await m.locator('[data-value="character"]').click();await m.locator('[data-act="character"][data-value="girl"]').click();await m.locator('[data-act="save-character"]').click();await m.locator('[data-act="journey"][data-value="tazkiya"]').click();await m.locator('[data-act="garden"][data-value="takhliya"]').click();await m.locator('#video-error').waitFor({state:'visible'});check('missing film never opens garden gate',await m.locator('#video-next').isDisabled()&&await m.evaluate(()=>!HayahStore.data.journeys.tazkiya.videos['tazkiya-intro']?.completed));
 check('no uncaught browser errors',errors.length===0);
 fs.writeFileSync('docs/design/qa/browser-regression-v07.json',JSON.stringify({version:'0.7.0',timestamp:new Date().toISOString(),passed:checks.length,checks,errors,browser:'Installed Chrome via Playwright',limitations:['Browser prototype, not native Expo/device QA','Original client collage crops retain their source resolution','Video boundary tests use muted playback after near-end seeks; not full audio/caption acceptance']},null,2));
 console.log(JSON.stringify({passed:checks.length,errors}));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();});
