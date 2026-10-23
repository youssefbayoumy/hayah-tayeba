(() => {
  'use strict';
  const C=window.HAYAH_CONTENT,S=window.HayahStore,V=window.HayahVideo,root=document.getElementById('app');
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const num=x=>new Intl.NumberFormat('ar-EG').format(x);
  const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const date=x=>new Intl.DateTimeFormat('ar-EG',{day:'numeric',month:'long'}).format(new Date(x));
  let ui={screen:S.loadError?'load-error':S.data.characterId?'map':S.data.profile?'character':'welcome',jid:S.data.activeJourneyId};
  let selectedCharacter=S.data.characterId,nickname=S.data.profile?.name||'',activity={},dirtyActivity=false,planDraft={};
  const drafts={},failedDrafts=new Set();
  const j=()=>C.journeys.find(x=>x.id===ui.jid),p=()=>S.data.journeys[ui.jid],s=()=>j()?.stages.find(x=>x.id===ui.stageId);
  const g=()=>j()?.gardens?.find(x=>x.id===(s()?.gardenId||ui.gardenId));
  function icon(name){const paths={map:'<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16"/>',book:'<path d="M12 5C9 2 4 3 3 4v15c3-2 6-2 9 1 3-3 6-3 9-1V4c-3-2-6-2-9 1Zm0 0v15"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="m9 3 6 0 1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1 1-3Z"/>',back:'<path d="m9 5 7 7-7 7"/>',arrow:'<path d="M19 12H5m6-6-6 6 6 6"/>',check:'<path d="m5 12 4 4L19 6"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/>',heart:'<path d="M12 21S2 15 2 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 7-10 13-10 13Z"/>',star:'<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/>',leaf:'<path d="M20 4C9 3 3 7 4 14c1 8 14 8 16-10ZM5 20 16 9"/>',key:'<circle cx="8" cy="8" r="5"/><path d="m12 12 9 9m-5-5 3-3m-1 5 3-3"/>',door:'<path d="M4 22V11a8 8 0 0 1 16 0v11M8 22V11a4 4 0 0 1 8 0v11m-3-8v2"/>'};return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.leaf}</svg>`;}
  const button=(label,act,value='',kind='primary',extra='')=>`<button class="${kind}" data-act="${esc(act)}" data-value="${esc(value)}" ${extra}>${label}</button>`;
  const scene=(name,alt='',cls='')=>`<img class="scene ${cls}" src="assets/gardens/${esc(name)}.png" alt="${esc(alt)}" draggable="false">`;
  const portrait=(id=S.data.characterId)=>{const c=C.characters.find(x=>x.id===id);return c?`<img class="portrait" src="${c.asset}" alt="${c.label}">`:'';};
  function toast(text){const el=document.getElementById('toast');el.textContent=text;el.hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.hidden=true,6000);}
  function save(change){if(S.commit(change))return true;toast('لم نقدر نحفظ على الجهاز. اختياراتك ما زالت هنا؛ جرّب مرة أخرى.');return false;}
  function closeModal(){document.getElementById('dialog').close();}
  function modal(title,text,action,label='متابعة'){const d=document.getElementById('dialog');d.innerHTML=`<h2 id="dialog-title">${esc(title)}</h2><p>${esc(text)}</p><div class="actions">${button('رجوع','close-dialog','','secondary','autofocus')}${button(esc(label),'confirm')}</div>`;d.confirmAction=action;d.showModal();}
  function retry(){let ok=true;for(const id of [...failedDrafts]){if(S.commit(d=>{d.drafts[id]=drafts[id];d.writingOrigins[id]=ui.noteMeta;}))failedDrafts.delete(id);else ok=false;}if(dirtyActivity){if(S.commit(d=>d.journeys[ui.jid].activities[ui.stageId]=S.clone(activity)))dirtyActivity=false;else ok=false;}return ok;}
  function go(screen,params={},force=false){
    if(!force&&(failedDrafts.size||dirtyActivity)){
      modal('كتابتك لم تُحفظ بعد','يمكنك العودة أو محاولة الحفظ قبل المغادرة.',()=>{if(retry()){closeModal();go(screen,params,true);}else toast('ما زال الحفظ متعذرًا. كتابتك موجودة هنا.');},'احفظ وتابع');
      const d=document.getElementById('dialog');d.querySelector('.actions').insertAdjacentHTML('beforeend',button('أترك التغييرات غير المحفوظة','discard','','quiet danger'));
      d.discardAction=()=>{for(const id of failedDrafts)delete drafts[id];failedDrafts.clear();dirtyActivity=false;closeModal();go(screen,params,true);};return;
    }
    V.stop();ui={...ui,screen,...params};render();window.scrollTo({top:0,behavior:'instant'});
    requestAnimationFrame(()=>root.querySelector('main')?.focus({preventScroll:true}));
  }
  function header(back=''){return `<header class="head">${back?button(icon('back'),ui.screen==='editor'?'editor-back':'go',back,'icon-btn','aria-label="رجوع"'):`<span class="brand">${icon('door')} الحياة الطيبة</span>`}<div class="head-actions">${S.data.characterId?button(portrait(),'go','profile','icon-btn','aria-label="افتح شخصيتي"'):''}${button(icon('settings'),'go','settings','icon-btn','aria-label="الإعدادات"')}</div></header>`;}
  function nav(active){return `<nav class="nav" aria-label="التنقل الرئيسي">${[['map','map','الخريطة'],['moments','leaf','لحظاتي'],['notebook','book','دفتر الرحلة']].map(([id,i,t])=>button(icon(i)+`<span>${t}</span>`,'go',id,'',id===active?'aria-current="page"':'')).join('')}</nav>`;}
  const shell=(body,back='',tab='',cls='')=>`${header(back)}<main class="content ${cls}" tabindex="-1">${body}</main>${tab?nav(tab):''}`;
  const isOpen=(journey,stage)=>{const i=journey.stages.indexOf(stage),done=S.data.journeys[journey.id].completed;return i===0||done.includes(stage.id)||done.includes(journey.stages[i-1].id);};
  const nextStage=journey=>journey.stages.find(x=>!S.data.journeys[journey.id].completed.includes(x.id))||journey.stages.at(-1);
  function openJourney(id){if(save(d=>d.activeJourneyId=id))go('journey',{jid:id});}
  function openGarden(id){const garden=j().gardens.find(x=>x.id===id),first=j().stages.find(x=>x.id===garden.challengeIds[0]);if(!isOpen(j(),first)){modal('حديقة تفتح بخطوة','استكشف تحديات الحديقة السابقة أولًا، ثم نكمل معًا.',()=>{closeModal();openStage(nextStage(j()).id);},'أكمل من حيث توقفت');return;}
    const gate=!p().videos[garden.segmentId]?.completed;if(gate&&!save(d=>d.journeys[ui.jid].checkpoint={stageId:first.id,step:'video'}))return;
    if(gate)go('video',{gardenId:id,stageId:first.id,segmentId:garden.segmentId,videoReturn:'garden'});else go('garden',{gardenId:id,stageId:first.id});
  }
  function openStage(id){const stage=j().stages.find(x=>x.id===id);if(!stage)return;if(!isOpen(j(),stage)){modal('خطوة بخطوة','هذا التحدي يفتح بعد التحدي السابق.',()=>{closeModal();openStage(nextStage(j()).id);},'أكمل رحلتك');return;}
    const old=p().checkpoint,gate=stage.video&&!p().videos[stage.video]?.completed;
    const step=!j().gardens&&old?.stageId===id&&old.step==='reflection'&&p().activities[id]?.completed?'reflection':gate?'video':'activity';
    if(!save(d=>d.journeys[ui.jid].checkpoint={stageId:id,step}))return;
    activity=S.clone(p().activities[id]||{});dirtyActivity=false;
    go(step==='video'?'video':step==='reflection'?'reflect':'stage',{stageId:id,gardenId:stage.gardenId,segmentId:stage.video,videoReturn:'stage'});
  }
  function select(index){activity.selected=index;dirtyActivity=!S.commit(d=>d.journeys[ui.jid].activities[ui.stageId]=S.clone(activity));render();if(dirtyActivity)toast('اختيارك هنا، لكن تعذر حفظه.');}
  function finishChallenge(){const stage=s(),garden=g();if(!Number.isInteger(activity.selected)){toast('اختر إجابة وتأمل ما يحدث أولًا.');return;}
    const required=j().stages.find(x=>x.id===garden.challengeIds[0]).video;
    if(!p().videos[required]?.completed){openGarden(garden.id);return;}
    const last=garden.challengeIds.at(-1)===stage.id;
    if(!save(d=>{const progress=d.journeys[ui.jid];progress.activities[stage.id]={...S.clone(activity),completed:true};if(!progress.completed.includes(stage.id))progress.completed.push(stage.id);
      if(garden.challengeIds.every(id=>progress.completed.includes(id))&&!progress.badges.includes(garden.keyId))progress.badges.push(garden.keyId);
      const next=j().stages[j().stages.indexOf(stage)+1];progress.checkpoint=next?{stageId:next.id,step:next.video?'video':'activity'}:null;}))return;
    dirtyActivity=false;if(last)go('garden-reward');else openStage(garden.challengeIds[garden.challengeIds.indexOf(stage.id)+1]);
  }
  function continueDhikr(){if(!Number.isInteger(activity.selected))return;if(!save(d=>{const progress=d.journeys.dhikr;progress.activities[ui.stageId]={...S.clone(activity),completed:true};progress.checkpoint={stageId:ui.stageId,step:'reflection'};if(ui.stageId==='d3')progress.plan={moment:s().options[activity.selected]};}))return;dirtyActivity=false;go('reflect');}
  function finishDhikr(){const stage=s();if(!p().activities[stage.id]?.completed&&!p().completed.includes(stage.id))return;if(save(d=>{const x=d.journeys.dhikr;if(!x.completed.includes(stage.id))x.completed.push(stage.id);if(!x.badges.includes(stage.id))x.badges.push(stage.id);const next=j().stages[j().stages.indexOf(stage)+1];x.checkpoint=next?{stageId:next.id,step:'activity'}:null;}))go('reward');}
  function taskBody(){const stage=s(),garden=g(),idx=garden?garden.challengeIds.indexOf(stage.id):j().stages.indexOf(stage),count=garden?5:j().stages.length;
    const selected=Number.isInteger(activity.selected),answer=selected?stage.options[activity.selected]:null;
    let body=`<div class="row spread"><span class="tag ${garden?.color||''}">${esc(garden?.short||'الذكر')}</span><span class="small">${garden?'التحدي':'المحطة'} ${num(idx+1)} من ${num(count)}</span></div><h1 class="plaque">${esc(stage.title)}</h1>`;
    body+=stage.scene?`<img class="scene challenge-scene" src="${stage.scene}" alt="مشهد ${esc(stage.title)} من الموقف">`:scene(stage.id==='d1'?'tazkiya-5':'tazkiya-3','رفيقا الرحلة','challenge-scene');
    body+=`<section class="question-panel">${stage.story?`<p>${esc(stage.story)}</p>`:''}<h2>${esc(stage.question)}</h2><div class="choice-list">${stage.options.map((o,i)=>button(`<span class="choice-marker">${activity.selected===i?'●':'○'}</span><span>${esc(typeof o==='string'?o:o.label)}</span>`,'choose',i,'choice'+(activity.selected===i?' chosen':''),`aria-pressed="${activity.selected===i}"`)).join('')}</div>`;
    if(selected&&typeof answer==='object')body+=`<div class="feedback ${answer.suggested?'suggested':''}" role="status"><strong>${answer.suggested?'خطوة تساعد':'نفكّر معًا'}</strong><p>${esc(answer.feedback)}</p></div>${button('أستكشف اختيارًا آخر','retry-choice','','quiet')}`;
    if(stage.lesson)body+=`<p>${esc(stage.lesson)}</p>`;
    body+=`<div class="actions">${button(garden?'التالي '+icon('arrow'):'نكمل المحطة','activity-next','','primary',selected?'':'disabled')}${button('أرجع لخريطة '+(garden?'الحديقة':'الرحلة'),'go',garden?'garden':'journey','quiet')}</div></section>`;
    return shell(body,garden?'garden':'journey','','task');
  }
  function noteMeta(id){const parts=id.split(':'),entry=S.data.reflections[id];return S.data.writingOrigins[id]||entry||{journeyId:parts[0]==='tazkiya'?'tazkiya':'dhikr',stageId:parts[1],title:'فكرة من رحلتي',stageTitle:'من رحلتي'};}
  function draft(id){return Object.hasOwn(drafts,id)?drafts[id]:S.data.drafts[id]??S.data.reflections[id]?.text??'';}
  function openPrompt(index=0){const stage=s()||j().stages[0],garden=g(),id=`${ui.jid}:${stage.id}:p${index}`;
    const meta={journeyId:ui.jid,stageId:stage.id,title:stage.prompts[index]||stage.prompts[0],stageTitle:garden?.title||stage.title,archived:false};
    go('editor',{stageId:stage.id,promptId:id,noteMeta:meta,returnTo:{screen:ui.screen,jid:ui.jid,stageId:stage.id,gardenId:ui.gardenId}});
  }
  function editorBack(){const target=ui.returnTo||{screen:'notebook'};go(target.screen,target);}
  function saveNote(){const text=draft(ui.promptId).trim();if(!text){toast('يمكنك الكتابة عندما تحب، أو العودة دون تأمل.');return;}
    if(save(d=>{d.drafts[ui.promptId]=draft(ui.promptId);d.writingOrigins[ui.promptId]=ui.noteMeta;d.reflections[ui.promptId]={...ui.noteMeta,promptId:ui.promptId,text,updatedAt:new Date().toISOString()};})){failedDrafts.delete(ui.promptId);toast('تم حفظ التأمل على هذا الجهاز.');editorBack();}
  }
  function deleteNote(id){modal('تمسح هذه الكتابة؟','سيُمسح التأمل ومسودته ونسخه القديمة فقط. تقدمك يظل محفوظًا.',()=>{if(S.deleteWriting(id)){delete drafts[id];failedDrafts.delete(id);closeModal();go('notebook',{},true);toast('تم مسح الكتابة.');}else toast('لم نقدر نمسح الكتابة. ما زالت محفوظة.');},'امسح الكتابة');}
  function notebook(){const ids=[...new Set([...Object.keys(S.data.reflections),...Object.keys(S.data.drafts)])].filter(id=>S.data.reflections[id]?.text||S.data.drafts[id]?.trim());
    return shell(`<span class="eyebrow">أفكار أعود إليها</span><h1 class="plaque">دفتر الرحلة</h1><p class="small">كتابتك خاصة بهذا الجهاز. التأمل اختياري دائمًا.</p>${ids.length?ids.map(id=>{const meta=noteMeta(id),entry=S.data.reflections[id];return button(`<span class="tag">${meta.archived?'رحلتك السابقة':meta.journeyId==='tazkiya'?'رحلة القلب':'الذكر'}</span><h3>${esc(meta.title)}</h3><span class="small">${esc(meta.stageTitle||'من رحلتي')}</span><p>${esc(draft(id).slice(0,110))}</p><span class="small">${entry?'تأمل محفوظ':'مسودة'}${entry?.updatedAt?' · '+date(entry.updatedAt):''}</span>`,'entry',id,'journal-entry');}).join(''):`<div class="panel center">${icon('book')}<h2>دفترك ينتظر أفكارك</h2><p>فكّر أو اكتب… على راحتك.</p></div>`}<div class="actions">${button('أكتب فكرة','new-note','','secondary')}</div>`, '', 'notebook');
  }
  function moments(){const progress=p(),plan=progress.plan,labels={sleep:'قبل النوم',study:'قبل المذاكرة',walk:'أثناء المشي',happy:'عندما أفرح',hard:'في موقف صعب',wake:'بعد الاستيقاظ'};
    return shell(`<span class="eyebrow">كل محاولة لها مكان</span><h1 class="plaque">لحظاتي</h1><div class="chips">${C.journeys.map(x=>button(x.id==='tazkiya'?'رحلة القلب':x.short,'moment-journey',x.id,'chip',`aria-pressed="${ui.jid===x.id}"`)).join('')}</div>${scene(ui.jid==='tazkiya'?'tahliya-5':'tazkiya-3','خطوة طيبة في يومي')}<div class="panel">${plan?`<h2>خطوتي ليومي</h2>${plan.virtue?`<p>أنمّي ${esc(plan.virtue)}، وأحاول تغيير ${esc(plan.behavior)}.</p><p>عمل خير: ${esc(plan.good)}</p><p class="small">${esc(plan.review||'وقفة قصيرة أراجع فيها محاولتي')}</p>`:`<p>لحظتي: ${esc(labels[plan.moment]||plan.moment||'خطوة من رحلتي')}</p>`}`:'<h2>خطوة صغيرة على راحتك</h2><p>تقدر تختار خطة ليومك، دون أن تؤثر على تقدّم التعلّم.</p>'}${button(plan?'أعدّل خطتي':'أختار خطوة ليومي','plan-edit','','secondary')}</div>${plan?`<h2>دعوة لسبعة أيام</h2><p class="small">إذا فاتك يوم، ارجع عندما تستطيع. لا تضيع محاولاتك.</p><div class="days">${Array.from({length:7},(_,i)=>`<span class="day ${i<progress.practice.length?'filled':''}" aria-label="${i<progress.practice.length?'تسجيل محفوظ':'مساحة لتسجيل'} ${num(i+1)}">${i<progress.practice.length?'✓':num(i+1)}</span>`).join('')}</div><div class="choice-list">${['جربت خطوتي اليوم','حاولت وأحتاج أن أجرب ثانية','لم أجرب بعد'].map(x=>button(x,'practice',x,'choice')).join('')}</div>`:''}<h2>محاولاتي السابقة</h2>${progress.practice.length?progress.practice.slice().reverse().map(x=>`<div class="prompt-row"><span>${esc(x.text)}</span><span class="small">${esc(x.date||x.day)}</span></div>`).join(''):'<p class="small">لا توجد تسجيلات بعد.</p>'}`, '', 'moments');
  }
  function checkIn(text,confirmed=false){const day=today(),index=p().practice.findIndex(x=>x.day===day);if(index>=0&&!confirmed){modal('لديك تسجيل لهذا اليوم','هل تحب تعديله؟ تسجيلات الأيام الأخرى تبقى محفوظة.',()=>{closeModal();checkIn(text,true);},'عدّل تسجيل اليوم');return;}
    if(save(d=>{const a=d.journeys[ui.jid].practice,entry={day,date:date(new Date()),text};if(index>=0)a[index]=entry;else a.push(entry);})){render();toast('تم تسجيل محاولتك.');}
  }
  const planOptions={virtue:['الصدق','الرحمة','الصبر','الكلمة الطيبة','التسامح'],behavior:['الكذب','الكلام المؤذي','الأنانية','السخرية','سوء الظن'],good:['مساعدة أحد','كلمة طيبة','الاستماع باهتمام','الترحيب بزميل']};
  function planScreen(){return shell(`<span class="eyebrow">خطتي اختيارية</span><h1 class="plaque">بذرة ليومي</h1>${scene('tahliya-intro','نزرع الأخلاق الجميلة')}${Object.entries(planOptions).map(([key,values])=>`<div class="field"><label for="${key}">${{virtue:'خلق أنمّيه',behavior:'سلوك أحاول تغييره',good:'عمل خير يومي'}[key]}</label><select id="${key}" data-plan="${key}"><option value="">اختر ما يناسبك</option>${[...new Set([...values,...(planDraft[key]?[planDraft[key]]:[])])].map(x=>`<option ${planDraft[key]===x?'selected':''}>${esc(x)}</option>`).join('')}</select></div>`).join('')}<div class="panel"><p>وقفة قصيرة آخر اليوم: ماذا جرّبت؟ وماذا سأحاول غدًا؟</p><p class="small">دعوة لسبعة أيام، دون انتظار أو خصم للتقدم.</p></div><div class="actions">${button('احفظ خطتي','save-plan')}${button('أرجع للحظاتي','go','moments','quiet')}</div>`, 'moments');}
  function keys(){return `<div class="key-collection" aria-label="مفاتيح التعلّم">${j().gardens.map(garden=>`<div class="key-slot ${garden.color} ${p().badges.includes(garden.keyId)?'earned':''}">${icon(p().badges.includes(garden.keyId)?'key':'lock')}<span>${garden.short}</span><span class="small">${p().badges.includes(garden.keyId)?'جمعته':'لم أجمعه'}</span></div>`).join('')}</div>`;}
  function gardenOverview(){return shell(`<span class="eyebrow">ثلاث حدائق… وثلاثة مفاتيح</span><h1 class="plaque">رحلة القلب الطيب</h1>${scene('welcome','رفيقا المغامرة في الحديقة')}<p>${esc(j().intro)}</p>${keys()}<div class="garden-cards">${j().gardens.map((garden,i)=>{const count=garden.challengeIds.filter(id=>p().completed.includes(id)).length,open=isOpen(j(),j().stages.find(x=>x.id===garden.challengeIds[0]));return button(`<img src="${garden.scene}" alt=""><div class="garden-card-copy"><span class="chapter-number ${garden.color}">${num(i+1)}</span><h2>${garden.title}</h2><p>${garden.subtitle}</p><span class="tag">${open?num(count)+' / ٥ تحديات استكشفتها':'تفتح بعد الحديقة السابقة'}</span></div>`,'garden',garden.id,`garden-card ${garden.color} ${open?'':'locked'}`);}).join('')}</div>${button('كنز القلب الطيب','treasure','','secondary')}`, 'map');}
  function gardenMap(){const garden=g();return shell(`<span class="eyebrow">${esc(garden.subtitle)}</span><h1 class="plaque">حديقة ${garden.short}</h1><img class="scene garden-intro" src="${garden.scene}" alt="رفيقا الرحلة عند ${garden.title}"><div class="progress-label"><strong>${num(garden.challengeIds.filter(id=>p().completed.includes(id)).length)} / ٥</strong><span class="small">تحديات استكشفتها</span></div><div class="progress-markers">${garden.challengeIds.map(id=>`<span class="marker ${p().completed.includes(id)?'filled':''}">${icon(p().completed.includes(id)?'check':garden.symbol)}</span>`).join('')}</div><div class="garden-path">${garden.challengeIds.map((id,i)=>{const stage=j().stages.find(x=>x.id===id),done=p().completed.includes(id),open=isOpen(j(),stage);return button(`<span class="number">${done?icon('check'):open?num(i+1):icon('lock')}</span><div><h2>${stage.title}</h2><span class="small">${done?'استكشفتها · أعد الزيارة':open?'جاهز للاكتشاف':'يفتح بعد التحدي السابق'}</span></div>${icon('arrow')}`,'stage',id,`stage-row ${done?'done':''}`);}).join('')}</div>${button('أعيد فيديو الحديقة','replay-segment',garden.segmentId,'quiet')}`, 'journey','',garden.color);}
  function videoScreen(){const seg=C.segments[ui.segmentId],done=p().videos[seg.id]?.completed;return shell(`<span class="eyebrow">فيلم الرحلة</span><h1 class="plaque">${esc(seg.title)}</h1><p class="small">شاهد على راحتك. تقدر توقف وتكمل من نفس المكان.</p><div class="video-wrap"><video id="journey-video" src="assets/tazkiya-overview.mp4" preload="metadata" playsinline aria-label="${esc(seg.title)}"></video><div id="video-error" class="video-error" hidden><h2>الفيديو غير متاح</h2><p>حاول فتحه مرة أخرى. تقدمك السابق محفوظ.</p>${button('إعادة المحاولة','video-retry','','secondary')}</div></div><div class="video-controls"><div class="row">${button('تشغيل','video-play','','','id="play-button"')}${button('من البداية','video-restart','','')}${button('كتم الصوت','video-mute','','','id="mute-button"')}</div><label for="video-seek" class="small">موضعك داخل هذا الجزء</label><input type="range" id="video-seek" min="0" max="1" step="0.1" value="0" aria-label="موضع الفيديو داخل الجزء"><div class="row spread"><span id="video-status" class="small" role="status">جارٍ تجهيز الفيديو…</span><span id="video-time" class="time">0:00 / —</span></div></div><details class="panel"><summary>الفكرة في كلمات</summary><p>${esc(seg.description)}</p><p class="small">ملخص للفكرة، وليس تفريغًا حرفيًا لكل الكلام.</p></details><div class="actions">${button(ui.videoReturn==='stage'?'أدخل التحدي':'أدخل الحديقة','video-next','','primary',`id="video-next" ${done?'':'disabled'}`)}${button('رجوع لخريطة الرحلة','go','journey','quiet')}</div>`, 'journey');}
  function render(){
    const journey=j();let html='';root.className='app '+(!S.data.settings.motion?'reduced':'');
    if(ui.screen==='load-error')html=shell(`<h1 class="plaque">لم نقدر نفتح تقدمك</h1><p>بياناتك القديمة لم تُستبدل. يمكنك إعادة المحاولة.</p><div class="actions">${button('إعادة المحاولة','reload')}${button('الإعدادات','go','settings','secondary')}</div>`);
    if(ui.screen==='welcome')html=shell(`<span class="eyebrow center">خطوة صغيرة إلى خير أكبر</span><h1 class="plaque">الحياة الطيبة</h1>${scene('welcome','رفيقا الرحلة في الحديقة','welcome-scene')}<h2>ازرع خيرًا… واكتشف الرحلة</h2><p>اختر شخصيتك، واستكشف حكايات ومواقف من يومك في الذكر ورحلة القلب الطيب.</p><div class="actions">${button('ابدأ المغامرة '+icon('arrow'),'go','character')}</div><p class="small center">للأعمار ١٠–١٤ · دون حساب</p>`,'','','welcome');
    if(ui.screen==='character')html=shell(`<span class="eyebrow">أنت بطل المغامرة</span><h1 class="plaque">اختر رفيق الرحلة</h1><p>تقدر تغيّر الشخصية لاحقًا، وتقدمك يبقى محفوظًا.</p>${S.data.profile&&!S.data.characterId?'<div class="panel"><p>تقدمك القديم وكتاباتك محفوظة. اختر شخصيتك الجديدة لنكمل.</p></div>':''}<div class="character-grid">${C.characters.map(c=>button(`<img src="${c.asset}" alt="${c.label}"><strong>${c.label}</strong>`,'character',c.id,'character-card',`aria-pressed="${selectedCharacter===c.id}"`)).join('')}</div><div class="field"><label for="nickname">اسم تحب نناديك به <span class="small">(اختياري)</span></label><input id="nickname" maxlength="24" value="${esc(nickname)}" autocomplete="off" placeholder="مستكشف الحياة الطيبة"></div><div class="actions">${button('هذه شخصيتي '+icon('arrow'),'save-character','','primary',selectedCharacter?'':'disabled')}</div>`,S.data.characterId?'profile':'welcome');
    if(ui.screen==='map'){
      const active=C.journeys.find(x=>x.id===S.data.activeJourneyId),cp=S.data.journeys[active.id].checkpoint;
      html=shell(`<div class="row spread"><div><span class="eyebrow">أهلًا ${esc(S.data.profile?.name||'يا مستكشف')}</span><h1 class="plaque">خريطة الحياة الطيبة</h1></div>${portrait()}</div>${scene('welcome','رفيقا الرحلة يرحبان بك')}<p>اختر بابك، وتعلّم خطوة بخطوة.</p>${cp?`<div class="resume"><div><strong>نكمل من حيث توقفنا؟</strong><div class="small">${esc(active.stages.find(x=>x.id===cp.stageId)?.title||active.short)}</div></div>${button('نكمل','resume',active.id)}</div>`:''}<div class="home-doors">${C.journeys.map(x=>button(`${scene(x.id==='dhikr'?'tazkiya-3':'takhliya-intro','')}<div><h2>${x.id==='dhikr'?'باب الذكر':'رحلة القلب الطيب'}</h2><p class="small">${esc(x.id==='dhikr'?x.subtitle:'التخلية · التحلية · التزكية')}</p><span class="tag">${num(S.data.journeys[x.id].completed.length)} ${x.id==='dhikr'?'محطات':'تحديات'} استكشفتها</span></div>${icon('arrow')}`,'journey',x.id,'door-button')).join('')}</div><p class="small center">المحاولة والتعلّم أهم من الكمال.</p>`,'','map');
    }
    if(ui.screen==='journey'){
      if(journey.gardens)html=gardenOverview();
      else html=shell(`<span class="eyebrow">${esc(journey.scope)}</span><h1 class="plaque">${journey.title}</h1>${scene('tazkiya-3','الذكر والدعاء')}<p>${journey.intro}</p><div class="progress"><span style="width:${p().completed.length/journey.stages.length*100}%"></span></div>${button('أكمل رحلتي','stage',nextStage(journey).id)}<div class="garden-path">${journey.stages.map((stage,i)=>button(`<span class="number">${p().completed.includes(stage.id)?icon('check'):isOpen(journey,stage)?num(i+1):icon('lock')}</span><div><h2>${stage.title}</h2><span class="small">${p().completed.includes(stage.id)?'اكتشفتها':'خطوة في رحلة الذكر'}</span></div>`,'stage',stage.id,'stage-row')).join('')}</div>`,'map');
    }
    if(ui.screen==='garden')html=gardenMap();
    if(ui.screen==='stage')html=taskBody();
    if(ui.screen==='reflect')html=shell(`<span class="eyebrow">وقفة على راحتك</span><h1 class="plaque">ما الذي اكتشفته؟</h1><p>فكّر أو اكتب، دون أن تؤثر الكتابة على تقدمك.</p>${s().prompts.map((prompt,i)=>`<div class="prompt-row"><span>${esc(prompt)}</span>${button('أكتب','open-prompt',i,'secondary')}</div>`).join('')}<div class="actions">${button('أكمل المحطة','finish-stage')}${button('أراجع النشاط','go','stage','quiet')}</div>`,'journey');
    if(ui.screen==='editor'){
      const text=draft(ui.promptId);html=shell(`<span class="eyebrow">${ui.noteMeta.archived?'من رحلتك السابقة':'مساحة خاصة بك'}</span><h1 class="plaque">دفتر القلب</h1><p>${esc(ui.noteMeta.title)}</p><label for="reflection" class="small">تأملك المكتوب · اختياري</label><textarea id="reflection" maxlength="2000" placeholder="اكتب ما تحب أن تتذكره…">${esc(text)}</textarea><div id="draft-status" class="editor-status ${failedDrafts.has(ui.promptId)?'error':''}">${failedDrafts.has(ui.promptId)?'تعذر الحفظ. كتابتك ما زالت هنا.':S.data.drafts[ui.promptId]!==undefined?'المسودة محفوظة على الجهاز':'كتابتك خاصة بهذا الجهاز.'}</div><div id="count" class="small">${num(text.length)} / ٢٠٠٠</div><div class="actions">${button('احفظ التأمل','save-reflection')}${button('أرجع دون حفظ تأمل','editor-back','','secondary')}${S.data.reflections[ui.promptId]||S.data.drafts[ui.promptId]?button('امسح هذه الكتابة','delete-entry',ui.promptId,'quiet danger'):''}</div>`, 'notebook');
    }
    if(ui.screen==='notebook')html=notebook();
    if(ui.screen==='moments')html=moments();
    if(ui.screen==='plan')html=planScreen();
    if(ui.screen==='garden-reward'){
      const garden=g(),last=journey.gardens.at(-1).id===garden.id,next=journey.gardens[journey.gardens.indexOf(garden)+1];
      html=shell(`<span class="eyebrow center">خمس محاولات… ومفتاح جديد</span><h1 class="plaque">أحسنت الاستكشاف!</h1><img class="scene reward-scene" src="${garden.keyAsset}" alt="رفيقا الرحلة يحملان مفتاح ${garden.short}"><div class="key-emblem ${garden.color}">${icon('key')}</div><h2 class="center">جمعت مفتاح ${garden.short}</h2><p class="center">تذكار استكشافك للمواقف، وليس تقييمًا لقلبك أو مشاعرك.</p>${keys()}<div class="actions">${button(last?'إلى كنز القلب الطيب':'إلى '+next.title,last?'treasure':'garden',last?'':next.id)}${button('أكتب فكرة عن الحديقة','open-prompt','0','secondary')}${button('خريطة الرحلة','go','journey','quiet')}</div>`,'journey','',garden.color);
    }
    if(ui.screen==='treasure')html=shell(`<span class="eyebrow center">جمعت المفاتيح الثلاثة</span><h1 class="plaque">كنز القلب الطيب</h1>${scene('treasure','صندوق كنز مضيء في الحديقة','reward-scene')}${keys()}<h2>خطوات خير تحملها معك</h2><p>استكشفت كيف نترك السلوك المؤذي، ونزرع الأخلاق الجميلة، وننمي الخير بالإيمان والعمل الصالح.</p><p>لم تنتهِ رحلتك اليوم؛ لقد تعلمت كيف تبدأ من جديد كل يوم.</p><div class="actions">${button('أختار خطوة ليومي','plan-edit')}${button('العودة إلى الخريطة','go','map','secondary')}${button('أعود إلى الحدائق','go','journey','quiet')}</div>`,'journey');
    if(ui.screen==='reward'){const stage=s(),last=journey.stages.at(-1).id===stage.id;html=shell(`<span class="eyebrow center">تذكار تعلّم</span><h1 class="plaque">${stage.badge}</h1>${scene('tazkiya-3','الذكر في يومنا')}<p>${last?'انتهت الجلسة الافتتاحية للذكر. تقدر تعود لما تعلمته.':'اكتشفت محطة جديدة، ونقدر نكمل على راحتك.'}</p><div class="actions">${button(last?'أعود للحظاتي':'المحطة التالية',last?'go':'stage',last?'moments':journey.stages[journey.stages.indexOf(stage)+1].id)}${button('خريطة الرحلة','go','journey','secondary')}</div>`,'journey');}
    if(ui.screen==='profile'){
      const archived=S.data.archives.tazkiyaV05,dhikr=C.journeys[0].stages.filter(stage=>S.data.journeys.dhikr.badges.includes(stage.id)),gardens=C.journeys[1].gardens.filter(garden=>S.data.journeys.tazkiya.badges.includes(garden.keyId));
      html=shell(`<span class="eyebrow">رفيق كل الأبواب</span><h1 class="plaque">${esc(S.data.profile?.name||'شخصيتي')}</h1><div class="profile-portrait">${portrait()}</div>${button('أغيّر الشخصية أو الاسم','edit-character','','secondary')}<h2>مفاتيح وتذكارات تعلّمي</h2><div class="badge-grid">${gardens.map(garden=>`<div class="badge-card ${garden.color}">${icon('key')}<h3>مفتاح ${garden.short}</h3></div>`).join('')}${dhikr.map(stage=>`<div class="badge-card">${icon('leaf')}<h3>${stage.badge}</h3><span class="small">الذكر</span></div>`).join('')}</div>${!gardens.length&&!dhikr.length?'<p>كل حديقة تستكشفها تترك لك تذكارًا.</p>':''}${archived?`<details class="panel"><summary>رحلتك السابقة</summary><p>احتفظنا بتقدمك وتذكارات النسخة السابقة. التحديات الجديدة مغامرة مستقلة.</p><p class="small">${num(archived.progress.completed.length)} محطات اكتشفتها سابقًا</p><div class="badge-grid">${archived.catalog.filter(stage=>archived.progress.badges.includes(stage.id)).map(stage=>`<div class="badge-card">${esc(stage.badge)}</div>`).join('')}</div></details>`:''}<p class="small">التذكارات للمشاركة والتعلّم، وليست مقياسًا لصلاح القلب.</p>`,'map');
    }
    if(ui.screen==='settings')html=shell(`<span class="eyebrow">على راحتك</span><h1 class="plaque">تجربتك وبياناتك</h1><div class="settings-row"><p>اللغة</p><span class="tag">العربية</span></div>${button(`<div><strong>تقليل الحركة</strong><p class="small">شاشة أهدأ عندما تحب</p></div><span class="switch ${S.data.settings.motion?'':'on'}"></span>`,'motion','','settings-row',`role="switch" aria-checked="${!S.data.settings.motion}"`)}<div class="panel"><h2>محفوظ على هذا الجهاز</h2><p>الشخصية والتقدم والكتابات خاصة بهذا المتصفح. مسح بياناته أو تغيير الجهاز قد يفقدها. لا توجد نسخة سحابية.</p><p class="small">هذه معاينة ويب؛ فتحها والفيديو لأول مرة يحتاج إنترنت. النسخة المثبتة المخطط لها ستضم المحتوى للعمل دون إنترنت.</p></div>${button('امسح بياناتي وابدأ من جديد','reset','','secondary danger')}<p class="small center">الحياة الطيبة · معاينة ٠٫٦</p>`,S.loadError?'load-error':S.data.characterId?'map':'welcome');
    if(ui.screen==='video')html=videoScreen();
    root.innerHTML=html;
    if(ui.screen==='video'){
      const jid=ui.jid,segment=C.segments[ui.segmentId];V.mount({segment,saved:S.data.journeys[jid].videos[segment.id],warn:toast,save:record=>S.commit(d=>{const old=d.journeys[jid].videos[segment.id];d.journeys[jid].videos[segment.id]={...record,completed:!!(old?.completed||record.completed)};})});
    }
  }
  root.addEventListener('click',async event=>{
    const target=event.target.closest('[data-act]');if(!target||target.disabled)return;const act=target.dataset.act,value=target.dataset.value;
    if(act==='go'){if(!S.data.characterId&&!['welcome','character','settings','load-error'].includes(value)){go('character');return;}go(value);}
    if(act==='character'){nickname=document.getElementById('nickname').value;selectedCharacter=value;render();}
    if(act==='save-character'){nickname=document.getElementById('nickname').value.trim();if(selectedCharacter&&save(d=>{d.profile={name:nickname};d.characterId=selectedCharacter;}))go('map');}
    if(act==='edit-character'){selectedCharacter=S.data.characterId;nickname=S.data.profile?.name||'';go('character');}
    if(act==='journey')openJourney(value);
    if(act==='garden')openGarden(value);
    if(act==='stage')openStage(value);
    if(act==='resume'){if(save(d=>d.activeJourneyId=value)){ui.jid=value;openStage(p().checkpoint?.stageId||nextStage(j()).id);}}
    if(act==='choose')select(Number(value));
    if(act==='retry-choice'){delete activity.selected;dirtyActivity=!S.commit(d=>d.journeys[ui.jid].activities[ui.stageId]=S.clone(activity));render();}
    if(act==='activity-next'){if(j().gardens)finishChallenge();else continueDhikr();}
    if(act==='finish-stage')finishDhikr();
    if(act==='treasure'){if(j().gardens.every(garden=>p().badges.includes(garden.keyId)))go('treasure');else modal('ثلاثة مفاتيح للكنز','استكشف الحدائق الثلاث، واجمع مفاتيح التعلّم لفتح الكنز.',()=>{closeModal();openStage(nextStage(j()).id);},'أكمل رحلتي');}
    if(act==='open-prompt')openPrompt(Number(value));
    if(act==='new-note'){ui.stageId=nextStage(j()).id;openPrompt(0);}
    if(act==='entry'){const meta=noteMeta(value);go('editor',{jid:meta.journeyId,stageId:meta.stageId,promptId:value,noteMeta:meta,returnTo:{screen:'notebook'}});}
    if(act==='editor-back')editorBack();
    if(act==='save-reflection')saveNote();
    if(act==='delete-entry')deleteNote(value);
    if(act==='moment-journey'){if(save(d=>d.activeJourneyId=value))go('moments',{jid:value});}
    if(act==='practice')checkIn(value);
    if(act==='plan-edit'){
      if(ui.jid==='dhikr'){const stage=j().stages.find(x=>x.id==='d3');if(isOpen(j(),stage))openStage('d3');else openJourney('dhikr');}
      else {planDraft={...p().plan};go('plan');}
    }
    if(act==='save-plan'){if(!planDraft.virtue||!planDraft.behavior||!planDraft.good){toast('اختر الخطوات الثلاث، أو ارجع على راحتك.');return;}if(save(d=>d.journeys[ui.jid].plan={...planDraft,review:'وقفة قصيرة آخر اليوم',updatedAt:new Date().toISOString()})){toast('تم حفظ خطتك.');go('moments');}}
    if(act==='motion'){if(save(d=>d.settings.motion=!d.settings.motion))render();}
    if(act==='reset')modal('تبدأ من جديد؟','سيُمسح اختيار الشخصية وتقدم الرحلتين والأرشيف والخطط وكل الكتابات من هذا المتصفح. لا يمكن التراجع.',()=>{if(S.reset()){failedDrafts.clear();Object.keys(drafts).forEach(id=>delete drafts[id]);dirtyActivity=false;selectedCharacter=null;nickname='';closeModal();go('welcome',{jid:'dhikr'},true);}else toast('لم نقدر نمسح البيانات. بياناتك ما زالت موجودة.');},'امسح بياناتي');
    if(act==='reload')location.reload();
    if(act==='replay-segment')go('video',{segmentId:value,videoReturn:'garden'});
    if(act==='video-retry'){V.stop();render();}
    if(act==='video-play')await V.action('play');
    if(act==='video-restart')await V.action('restart');
    if(act==='video-mute')await V.action('mute');
    if(act==='video-next'){if(!p().videos[ui.segmentId]?.completed||!V.available)return;const destination=ui.videoReturn==='stage'?'stage':'garden';if(save(d=>d.journeys[ui.jid].checkpoint={stageId:ui.stageId,step:'activity'})){activity=S.clone(p().activities[ui.stageId]||{});go(destination);}}
  });
  root.addEventListener('input',event=>{
    const target=event.target;if(target.id==='nickname')nickname=target.value;
    if(target.id==='reflection'){
      const id=ui.promptId;drafts[id]=target.value;
      const ok=S.commit(d=>{d.drafts[id]=target.value;d.writingOrigins[id]=ui.noteMeta;});if(ok)failedDrafts.delete(id);else failedDrafts.add(id);
      const status=document.getElementById('draft-status');status.textContent=ok?'المسودة محفوظة على الجهاز':'تعذر الحفظ. كتابتك ما زالت هنا؛ جرّب مرة أخرى.';status.classList.toggle('error',!ok);document.getElementById('count').textContent=num(target.value.length)+' / ٢٠٠٠';
    }
    if(target.id==='video-seek')V.seek(target.value);
  });
  root.addEventListener('change',event=>{if(event.target.dataset.plan)planDraft[event.target.dataset.plan]=event.target.value;});
  document.getElementById('dialog').addEventListener('click',event=>{const target=event.target.closest('[data-act]');if(!target)return;const d=document.getElementById('dialog');if(target.dataset.act==='close-dialog')closeModal();if(target.dataset.act==='confirm')d.confirmAction?.();if(target.dataset.act==='discard')d.discardAction?.();});
  window.addEventListener('beforeunload',event=>{if(failedDrafts.size||dirtyActivity){event.preventDefault();event.returnValue='';}});
  window.HayahApp={get screen(){return ui.screen;},get route(){return {...ui};},get content(){return C;}};
  render();if(S.error==='migration-save')toast('تقدمك القديم موجود، لكن تعذر حفظ التحديث الآن. جرّب مرة أخرى.');
})();
