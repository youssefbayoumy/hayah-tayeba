/* Browser-local repository. No network, analytics or reflection upload. */
(() => {
  const KEY = 'hayah-tayeba-design-preview-v1';
  const clone = value => JSON.parse(JSON.stringify(value));
  const blankJourney = () => ({completed:[], activities:{}, videos:{}, badges:[], checkpoint:null, practice:[], plan:null});
  const fresh = () => ({schemaVersion:2, characterId:null, profile:null, activeJourneyId:'dhikr', journeys:{dhikr:blankJourney(),tazkiya:blankJourney()}, drafts:{}, reflections:{}, settings:{motion:true}, legacy:null});
  const object = x => !!x && typeof x === 'object' && !Array.isArray(x);
  function validate(data) {
    if (!object(data) || data.schemaVersion !== 2 || !object(data.journeys) || !object(data.drafts) || !object(data.reflections) || !object(data.settings) || typeof data.settings.motion!=='boolean') throw Error('Invalid learner data');
    if (!['boy','girl',null].includes(data.characterId) || !['dhikr','tazkiya'].includes(data.activeJourneyId) || (data.profile!==null&&(!object(data.profile)||typeof data.profile.name!=='string'))) throw Error('Invalid profile');
    for (const id of ['dhikr','tazkiya']) {
      const j=data.journeys[id];
      if(!object(j)||!Array.isArray(j.completed)||!Array.isArray(j.badges)||!Array.isArray(j.practice)||!object(j.activities)||!object(j.videos)) throw Error('Invalid journey');
      const stageIds=window.HAYAH_CONTENT.journeys.find(x=>x.id===id).stages.map(x=>x.id);
      if(j.completed.some(x=>!stageIds.includes(x))||j.badges.some(x=>!stageIds.includes(x))||new Set(j.completed).size!==j.completed.length||new Set(j.badges).size!==j.badges.length) throw Error('Invalid milestones');
      if(j.practice.some(x=>!object(x)||typeof x.day!=='string'||typeof x.text!=='string')) throw Error('Invalid practice');
      if(j.plan!==null&&!object(j.plan))throw Error('Invalid plan');
      if(j.checkpoint!==null&&(!object(j.checkpoint)||!stageIds.includes(j.checkpoint.stageId)||!['activity','video','reflection'].includes(j.checkpoint.step)))throw Error('Invalid checkpoint');
      if(Object.entries(j.activities).some(([key,value])=>!stageIds.includes(key)||!object(value)))throw Error('Invalid activity');
      for(const [key,value] of Object.entries(j.videos)){
        const segment=window.HAYAH_CONTENT.segments[key];
        if(id!=='tazkiya'||!segment||!object(value)||value.videoSegmentId!==key||typeof value.completed!=='boolean'||!Number.isFinite(value.position)||value.position<segment.start||(segment.end!==null&&value.position>segment.end))throw Error('Invalid video');
      }
    }
    if(Object.values(data.drafts).some(x=>typeof x!=='string')) throw Error('Invalid drafts');
    if(Object.values(data.reflections).some(x=>!object(x)||typeof x.text!=='string'||(x.updatedAt&&!Number.isFinite(Date.parse(x.updatedAt))))) throw Error('Invalid reflections');
    return data;
  }
  function migrate(old) {
    if(!object(old)||!Array.isArray(old.done)||!Array.isArray(old.practice)||!object(old.drafts)||!object(old.reflections)) throw Error('Invalid legacy data');
    const data=fresh(); data.legacy=clone(old); data.profile=old.profile ? {name:String(old.profile.name || '')}:null;
    data.settings={...data.settings,...old.settings};
    const mappings={story:'d1',meaning:'d2',plan:'d3',complete:'d4'};
    data.journeys.dhikr.completed=Object.keys(mappings).filter(x=>old.done.includes(x)).map(x=>mappings[x]);
    data.journeys.dhikr.badges=[...data.journeys.dhikr.completed];
    data.journeys.dhikr.practice=clone(old.practice);
    if(old.moment) data.journeys.dhikr.plan={moment:old.moment, legacy:true};
    const oldStage={story:'d1',choice:'d1',outcome:'d1',meaning:'d2',pause:'d2',observation:'d2',moment:'d3',plan:'d3',reflection:'d4'};
    if(oldStage[old.last]) data.journeys.dhikr.checkpoint={stageId:oldStage[old.last],step:'activity'};
    for(const [key,value] of Object.entries(old.drafts)) {
      if(typeof value!=='string') throw Error('Invalid legacy draft');
      data.drafts[key]=value;
    }
    for(const [key,value] of Object.entries(old.reflections)) {
      const entry=typeof value==='string'?{text:value}:value;
      if(!object(entry)||typeof entry.text!=='string') throw Error('Invalid legacy reflection');
      data.reflections[key]={...entry,journeyId:'dhikr',stageId:'d4',promptId:key,title:entry.title||'تأمل من رحلة الذكر السابقة'};
    }
    return validate(data);
  }
  let state=fresh(), loadError=false, error=null;
  try {
    const raw=localStorage.getItem(KEY);
    if(raw) {
      const parsed=JSON.parse(raw);
      if(parsed?.schemaVersion!==undefined&&parsed?.schemaVersion!==2)throw Error('Unsupported schema');
      state=parsed?.schemaVersion===2 ? validate(parsed):migrate(parsed);
      if(parsed?.schemaVersion!==2) {
        try {localStorage.setItem(KEY+'.backup-v1',raw); localStorage.setItem(KEY,JSON.stringify(state));}
        catch(e){error='migration-save';}
      }
    }
  } catch(e) {loadError=true; error='load';}
  window.HayahStore={
    KEY, get data(){return state;}, get loadError(){return loadError;}, get error(){return error;},
    commit(change){
      if(loadError){error='load';return false;}
      const next=clone(state);
      try {change(next); validate(next); localStorage.setItem(KEY,JSON.stringify(next));state=next;error=null;return true;}
      catch(e){error='save';return false;}
    },
    deleteWriting(id){
      if(loadError)return false;
      const next=clone(state);delete next.drafts[id];delete next.reflections[id];
      if(next.legacy){delete next.legacy.drafts?.[id];delete next.legacy.reflections?.[id];}
      let backup=null;
      try{
        backup=localStorage.getItem(KEY+'.backup-v1');
        localStorage.removeItem(KEY+'.backup-v1');
        localStorage.setItem(KEY,JSON.stringify(validate(next)));state=next;error=null;return true;
      }catch(e){try{if(backup!==null)localStorage.setItem(KEY+'.backup-v1',backup);}catch(_){}error='delete';return false;}
    },
    reset(){
      try {
        const old=localStorage.getItem(KEY),backup=localStorage.getItem(KEY+'.backup-v1');
        try{localStorage.removeItem(KEY+'.backup-v1');localStorage.removeItem(KEY);}
        catch(e){if(backup!==null)localStorage.setItem(KEY+'.backup-v1',backup);if(old!==null)localStorage.setItem(KEY,old);throw e;}
        state=fresh();loadError=false;error=null;return true;
      }catch(e){error='reset';return false;}
    }, clone, fresh, migrate, validate
  };
})();
