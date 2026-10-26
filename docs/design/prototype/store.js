/* Versioned, browser-local learner repository. No upload or remote dependencies. */
(() => {
  const C=window.HAYAH_CONTENT,KEY='hayah-tayeba-design-preview-v1';
  const BACKUPS=[KEY+'.backup-v1',KEY+'.backup-v2',KEY+'.backup-v3'];
  const clone=x=>JSON.parse(JSON.stringify(x));
  const object=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
  const blankJourney=()=>({completed:[],activities:{},videos:{},badges:[],checkpoint:null,practice:[],plan:null});
  const blankMaiyya=()=>({...blankJourney(),started:false,daily:{},matching:{},sevenDayPlan:null});
  const fresh=()=>({schemaVersion:4,characterId:null,profile:null,activeJourneyId:'dhikr',journeys:{dhikr:blankJourney(),tazkiya:blankJourney(),maiyya:blankMaiyya()},drafts:{},reflections:{},writingOrigins:{},settings:{motion:true},legacy:null,archives:{tazkiyaV05:null}});
  function validateJourney(j,stageIds,badgeIds,isTazkiya=false,archived=false){
    if(!object(j)||!Array.isArray(j.completed)||!Array.isArray(j.badges)||!Array.isArray(j.practice)||!object(j.activities)||!object(j.videos))throw Error('Invalid journey');
    if(j.completed.some(x=>!stageIds.includes(x))||j.badges.some(x=>!badgeIds.includes(x))||new Set(j.completed).size!==j.completed.length||new Set(j.badges).size!==j.badges.length)throw Error('Invalid milestones');
    if(j.practice.some(x=>!object(x)||typeof x.day!=='string'||typeof x.text!=='string'))throw Error('Invalid practice');
    if(j.plan!==null&&!object(j.plan))throw Error('Invalid plan');
    if(j.checkpoint!==null&&(!object(j.checkpoint)||!stageIds.includes(j.checkpoint.stageId)||!['activity','video','reflection'].includes(j.checkpoint.step)))throw Error('Invalid checkpoint');
    if(Object.entries(j.activities).some(([key,value])=>!stageIds.includes(key)||!object(value)))throw Error('Invalid activity');
    for(const [key,value] of Object.entries(j.videos)){
      const segment=C.segments[key];
      if(!isTazkiya||!segment||!object(value)||value.videoSegmentId!==key||typeof value.completed!=='boolean'||!Number.isFinite(value.position)||value.position<segment.start||(segment.end!==null&&value.position>segment.end))throw Error('Invalid video');
    }
    if(isTazkiya&&!archived){
      for(const g of C.journeys[1].gardens)if(j.badges.includes(g.keyId)&&!g.challengeIds.every(id=>j.completed.includes(id)))throw Error('Unearned key');
    }
  }
  function validateCommon(d){
    if(!object(d)||!object(d.journeys)||!object(d.drafts)||!object(d.reflections)||!object(d.settings)||typeof d.settings.motion!=='boolean')throw Error('Invalid learner data');
    if(!['boy','girl',null].includes(d.characterId)||!C.journeys.some(j=>j.id===d.activeJourneyId)||(d.profile!==null&&(!object(d.profile)||typeof d.profile.name!=='string')))throw Error('Invalid profile');
    if(Object.values(d.drafts).some(x=>typeof x!=='string'))throw Error('Invalid draft');
    if(Object.values(d.reflections).some(x=>!object(x)||typeof x.text!=='string'||(x.updatedAt&&!Number.isFinite(Date.parse(x.updatedAt)))))throw Error('Invalid reflection');
  }
  function validate(d){
    validateCommon(d);
    if(d.schemaVersion!==4||!object(d.archives)||!object(d.writingOrigins))throw Error('Unsupported schema');
    for(const j of C.journeys)validateJourney(d.journeys[j.id],j.stages.map(s=>s.id),j.gardens?j.gardens.map(g=>g.keyId):j.stages.map(s=>s.id),j.id==='tazkiya');
    if(d.archives.tazkiyaV05!==null){const a=d.archives.tazkiyaV05;if(!object(a)||!Array.isArray(a.catalog))throw Error('Invalid archive');const ids=C.previousTazkiya.stages.map(s=>s.id);validateJourney(a.progress,ids,ids,true,true);}
    const m=d.journeys.maiyya,config=C.journeys.find(j=>j.id==='maiyya');
    if(!object(m.daily)||!object(m.matching)||typeof m.started!=='boolean'||(m.sevenDayPlan!==null&&!object(m.sevenDayPlan)))throw Error('Invalid maiyya data');
    for(const [day,entry] of Object.entries(m.daily)){
      const parsed=new Date(day+'T12:00:00Z');
      if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==day||!object(entry)||!object(entry.items))throw Error('Invalid daily record');
      if(Object.entries(entry.items).some(([id,value])=>!config.dailyItems.some(item=>item.id===id)||typeof value!=='boolean'))throw Error('Invalid daily item');
      if(entry.triangle&&(!object(entry.triangle)||!Number.isInteger(entry.triangle.index)||entry.triangle.index<0||entry.triangle.index>2||!Number.isInteger(entry.triangle.message)||entry.triangle.message<0||entry.triangle.message>=config.surpriseMessages.length))throw Error('Invalid triangle');
      if(entry.dice&&(!Number.isInteger(entry.dice.number)||entry.dice.number<1||entry.dice.number>6))throw Error('Invalid dice');
    }
    for(const [id,entry]of Object.entries(m.matching))if(!config.matches.some(x=>x.id===id)||!object(entry)||typeof entry.completed!=='boolean'||(entry.door!==undefined&&(!Number.isInteger(entry.door)||entry.door<0||entry.door>2))||(entry.choice!==undefined&&(!Number.isInteger(entry.choice)||entry.choice<0||entry.choice>2)))throw Error('Invalid matching record');
    if(m.badges.includes('ma-live')&&!config.stages.every(stage=>m.completed.includes(stage.id)))throw Error('Premature final badge');
    return d;
  }
  function origin(id,record={}){
    const parts=id.split(':'),jid=record.journeyId||(['dhikr','tazkiya'].includes(parts[0])?parts[0]:'dhikr');
    const sid=record.stageId||(id.startsWith('dhikr-reflection-')?'d4':parts[1]);
    const catalog=jid==='tazkiya'?C.previousTazkiya.stages:C.journeys[0].stages;
    const s=catalog.find(x=>x.id===sid),index=Number(parts[2]?.slice(1)||id.split('-').at(-1)||0);
    return {journeyId:jid,stageId:sid||'d4',stageTitle:s?.title||'من رحلتك السابقة',title:record.title||s?.prompts?.[index]||'تأمل من رحلتك السابقة',archived:jid==='tazkiya'};
  }
  function annotateWriting(d){
    for(const id of new Set([...Object.keys(d.drafts),...Object.keys(d.reflections)])){
      const meta=origin(id,d.reflections[id]);d.writingOrigins[id]=meta;
      if(d.reflections[id])d.reflections[id]={...d.reflections[id],...meta,promptId:id};
    }
  }
  function migrate(old){
    if(old?.schemaVersion===4)return validate(old);
    if(old?.schemaVersion===3){
      validateCommon(old);
      const d={...clone(old),schemaVersion:4,journeys:{...clone(old.journeys),maiyya:blankMaiyya()}};
      return validate(d);
    }
    if(old?.schemaVersion===2){
      validateCommon(old);
      validateJourney(old.journeys.dhikr,C.journeys[0].stages.map(s=>s.id),C.journeys[0].stages.map(s=>s.id));
      const ids=C.previousTazkiya.stages.map(s=>s.id);validateJourney(old.journeys.tazkiya,ids,ids,true,true);
      const d={...fresh(),...clone(old),schemaVersion:4,journeys:{...fresh().journeys,...clone(old.journeys)},writingOrigins:{},archives:{tazkiyaV05:{version:'0.5.0',catalog:clone(C.previousTazkiya.stages),progress:clone(old.journeys.tazkiya)}}};
      d.journeys.tazkiya={...blankJourney(),videos:clone(old.journeys.tazkiya.videos),practice:clone(old.journeys.tazkiya.practice),plan:clone(old.journeys.tazkiya.plan)};
      annotateWriting(d);return validate(d);
    }
    if(old?.schemaVersion!==undefined||!object(old)||!Array.isArray(old.done)||!Array.isArray(old.practice)||!object(old.drafts)||!object(old.reflections))throw Error('Unsupported or invalid legacy state');
    const d=fresh();d.legacy=clone(old);d.profile=old.profile?{name:String(old.profile.name||'')}:null;d.settings={...d.settings,...old.settings};
    const ids={story:'d1',meaning:'d2',plan:'d3',complete:'d4'};d.journeys.dhikr.completed=Object.keys(ids).filter(x=>old.done.includes(x)).map(x=>ids[x]);d.journeys.dhikr.badges=[...d.journeys.dhikr.completed];d.journeys.dhikr.practice=clone(old.practice);
    if(old.moment)d.journeys.dhikr.plan={moment:old.moment,legacy:true};
    const checkpoints={story:'d1',choice:'d1',outcome:'d1',meaning:'d2',pause:'d2',observation:'d2',moment:'d3',plan:'d3',reflection:'d4'};
    if(checkpoints[old.last])d.journeys.dhikr.checkpoint={stageId:checkpoints[old.last],step:'activity'};
    d.drafts=clone(old.drafts);
    for(const [id,value] of Object.entries(old.reflections)){const entry=typeof value==='string'?{text:value}:value;if(!object(entry)||typeof entry.text!=='string')throw Error('Invalid old reflection');d.reflections[id]={...entry,journeyId:'dhikr',stageId:'d4'};}
    annotateWriting(d);return validate(d);
  }
  let state=fresh(),loadError=false,error=null;
  try{
    const raw=localStorage.getItem(KEY);
    if(raw){const parsed=JSON.parse(raw);state=migrate(parsed);if(parsed?.schemaVersion!==4){try{localStorage.setItem(KEY+(parsed?.schemaVersion===3?'.backup-v3':parsed?.schemaVersion===2?'.backup-v2':'.backup-v1'),raw);localStorage.setItem(KEY,JSON.stringify(state));}catch(e){error='migration-save';}}}
  }catch(e){loadError=true;error='load';}
  // Transactions retain prior in-memory state until the durable primary write succeeds.
  function write(next){if(loadError)return false;try{validate(next);localStorage.setItem(KEY,JSON.stringify(next));state=next;error=null;return true;}catch(e){error='save';return false;}}
  function removeWithBackups(next,reset=false){
    const previous=new Map();
    try{
      const keys=[...BACKUPS,KEY];keys.forEach(k=>previous.set(k,localStorage.getItem(k)));
      BACKUPS.forEach(k=>localStorage.removeItem(k));
      if(reset)localStorage.removeItem(KEY);else localStorage.setItem(KEY,JSON.stringify(validate(next)));
      state=next;loadError=false;error=null;return true;
    }catch(e){for(const [key,value]of previous){try{if(value!==null)localStorage.setItem(key,value);}catch(_){} }error=reset?'reset':'delete';return false;}
  }
  window.HayahStore={KEY,get data(){return state;},get loadError(){return loadError;},get error(){return error;},
    commit(change){if(loadError)return false;const next=clone(state);try{change(next);}catch(e){error='save';return false;}return write(next);},
    deleteWriting(id){if(loadError)return false;const next=clone(state);delete next.drafts[id];delete next.reflections[id];delete next.writingOrigins[id];if(next.legacy){delete next.legacy.drafts?.[id];delete next.legacy.reflections?.[id];}return removeWithBackups(next);},
    reset(){return removeWithBackups(fresh(),true);},clone,fresh,migrate,validate
  };
})();
