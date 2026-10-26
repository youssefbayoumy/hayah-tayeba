/* Third-journey screens reuse the app shell, local repository and garden assets. */
(() => {
  let timer=null,timerAPI=null;
  const config=a=>a.C.journeys.find(j=>j.id==='maiyya');
  const progress=a=>a.S.data.journeys.maiyya;
  const record=a=>progress(a).daily[a.today()]||{items:{}};
  const random=n=>{if(globalThis.crypto?.getRandomValues){const v=new Uint32Array(1);crypto.getRandomValues(v);return v[0]%n;}return Math.floor(Math.random()*n);};
  function verse(a,id){const v=config(a).verses[id];return `<blockquote class="quote"><p>﴿${a.esc(v.text)}﴾</p><cite><a href="${v.url}" target="_blank" rel="noopener">${v.ref}</a></cite><p class="small">${a.esc(v.context)}</p></blockquote>`;}
  function matchingCard(a,id){
    const c=config(a),m=c.matches.find(x=>x.id===id),r=progress(a).matching[id]||{completed:false},doorReady=r.door===m.correctDoor;
    return `<section class="panel verse-match"><h2>افتح باب المعنى</h2>${verse(a,m.verseId)}<h3>أي باب يناسب معنى الآية؟</h3><div class="choice-list">${m.doors.map((door,i)=>a.button(`${a.icon('door')}<span>${a.esc(door)}</span>`,'match-door',id+':'+i,'choice'+(r.door===i?' chosen':''),`aria-pressed="${r.door===i}"`)).join('')}</div>${r.door!==undefined?`<div class="feedback" role="status">${doorReady?'هذا الباب يرتبط بالمعنى. جرّب الموقف التالي.':'فكّر في معنى الآية وجرّب بابًا آخر. لا تخسر أي تقدم.'}</div>`:''}${doorReady?`<h3>${a.esc(m.question)}</h3><div class="choice-list">${m.options.map((text,i)=>a.button(a.esc(text),'match-answer',id+':'+i,'choice'+(r.choice===i?' chosen':''),`aria-pressed="${r.choice===i}"`)).join('')}</div>${r.choice!==undefined?`<div class="feedback ${r.choice===m.correctChoice?'suggested':''}" role="status">${r.choice===m.correctChoice?a.esc(m.feedback):'هذا التحدي يربط المعنى بخطوة مناسبة. جرّب اختيارًا آخر دون خصم أو عقوبة.'}</div>`:''}`:''}${r.completed?`<div class="tag">${a.icon('check')} فتحت هذا الباب التعليمي</div>`:''}</section>`;
  }
  function ready(a){const stage=a.s();if(stage.matchId)return !!progress(a).matching[stage.matchId]?.completed;if(stage.kind==='classify')return stage.classification.every((item,i)=>a.activity['class'+i]===item.answer);return Number.isInteger(a.activity.selected);}
  function overview(a){const c=config(a),p=progress(a);return a.shell(`<span class="eyebrow">رحلة جديدة · علم ورجاء وعمل</span><h1 class="plaque">باب مَعِيَّة الله</h1>${a.scene('tazkiya-intro','رفيقا الرحلة عند باب الحديقة')}<p>${a.esc(c.intro)}</p><div class="panel"><h2>ما الذي نتعلمه؟</h2><p>الله يعلم حالنا ولا يخفى عليه شيء. نسعى إلى الطاعة والتقوى والإحسان، ونرجو عونه وتوفيقه. لا تقيس الأنشطة ما في القلب، ولا تعد بزوال الخوف أو المشكلات فورًا.</p></div><div class="row spread"><span class="tag">${a.num(p.completed.length)} / ١٥ محطات تعلّم</span><span class="small">دون انتظار يوم جديد</span></div><div class="actions">${a.button(p.completed.length?'أكمل رحلتي':'أكتشف معنى المعية','stage',c.stages.find(s=>!p.completed.includes(s.id))?.id||'ma-live')}${a.button('رحلتي اليوم','daily','','secondary')}${a.button('ألعاب الآيات','matching','','secondary')}</div>${c.chapters.map(chapter=>`<h2 class="chapter-heading">${chapter.title}</h2><div class="garden-path">${c.stages.filter(s=>s.chapterId===chapter.id).map(stage=>{const done=p.completed.includes(stage.id),open=a.isOpen(c,stage);return a.button(`<span class="number">${done?a.icon('check'):open?a.num(c.stages.indexOf(stage)+1):a.icon('lock')}</span><div><h3>${stage.title}</h3><span class="small">${done?'استكشفتها · أعد الزيارة':open?'جاهزة للتعلّم':'تفتح بعد المحطة السابقة'}</span></div>`,'stage',stage.id,'stage-row');}).join('')}</div>`).join('')}`,'map');}
  function stageScreen(a){
    const stage=a.s(),c=config(a),selected=Number.isInteger(a.activity.selected),answer=selected?stage.options?.[a.activity.selected]:null;
    let body=`<div class="row spread"><span class="tag">معية الله</span><span class="small">المحطة ${a.num(c.stages.indexOf(stage)+1)} من ١٥</span></div><h1 class="plaque">${stage.title}</h1>${a.scene(stage.scene,'مشهد من حديقة التعلّم','challenge-scene')}<div class="panel"><p>${a.esc(stage.story)}</p></div>`;
    if(stage.kind==='classify'){
      body+=`<h2>صِل المثال بالقسم المناسب</h2>${stage.classification.map((item,i)=>`<div class="field"><label for="class${i}">${a.esc(item.text)}</label><select id="class${i}" data-ma-class="${i}"><option value="">اختر القسم</option>${['القلب','اللسان','البدن'].map(label=>`<option ${a.activity['class'+i]===label?'selected':''}>${label}</option>`).join('')}</select>${a.activity['class'+i]?`<span class="small" role="status">${a.activity['class'+i]===item.answer?'هذا مثال مناسب لهذا القسم.':'جرّب القسم الأقرب لهذا المثال.'}</span>`:''}</div>`).join('')}`;
    }
    if(stage.kind==='dhikr')body+=`<div class="panel"><h2>اختر ذكرًا وتأمل معناه</h2><div class="chips">${['سبحان الله','أستغفر الله'].map((label,i)=>a.button(label,'ma-phrase',i,'chip',`aria-pressed="${(a.activity.phrase||0)===i}"`)).join('')}</div><p>${a.activity.phrase===1?'أستغفر الله: أطلب من الله مغفرة ذنبي.':'سبحان الله: أنزّه الله عن كل نقص.'}</p><div class="timer-display" id="ma-timer">${format(a.activity.timerRemaining??120)}</div><div class="row">${a.button('ابدأ / أوقف','ma-timer','','secondary')}${a.button('من البداية','ma-timer-reset','','quiet')}</div><p class="small">مؤقت اختياري، لا يقيس العبادة أو المشاعر ولا يمنع المتابعة.</p></div>`;
    if(stage.matchId)body+=matchingCard(a,stage.matchId);
    else if(stage.options){body+=`<h2>${stage.question}</h2><div class="choice-list">${stage.options.map((o,i)=>a.button(`<span class="choice-marker">${a.activity.selected===i?'●':'○'}</span><span>${a.esc(o.label)}</span>`,'choose',i,'choice'+(a.activity.selected===i?' chosen':''),`aria-pressed="${a.activity.selected===i}"`)).join('')}</div>${answer?`<div class="feedback ${answer.suggested?'suggested':''}" role="status"><p>${a.esc(answer.feedback)}</p></div>`:''}`;}
    if(stage.verseId&&!stage.matchId)body+=verse(a,stage.verseId);
    if(stage.kind==='prayer')body+=`<div class="panel"><h3>تذكير أكتبه لنفسي</h3><p class="small">يمكنك الاحتفاظ بالفكرة في دفترك، دون تنبيه أو إذن جديد.</p>${a.button('أكتب خطتي للصلاة','open-prompt','0','secondary')}</div>`;
    if(stage.kind==='closing')body+=`<div class="panel"><h2>خطتي لسبعة أيام</h2><p>كل يوم: ذكر، واهتمام بالصلاة، وتعلّم، وعمل خير، وصبر أو توكل، ووقفة مراجعة. تقدر تبدأ بخطوة واحدة، وتعود بعد أي انقطاع.</p><label for="ma-plan-time">متى أحب مراجعة يومي؟</label><select id="ma-plan-time" data-ma-plan="reviewTime"><option value="">أختار لاحقًا</option>${['بعد يومي الدراسي','قبل النوم','في وقت هادئ أختاره'].map(text=>`<option ${a.activity.reviewTime===text?'selected':''}>${text}</option>`).join('')}</select></div>`;
    if(stage.lesson)body+=`<p>${a.esc(stage.lesson)}</p>`;
    if(stage.sourceUrl)body+=`<p class="small"><a href="${stage.sourceUrl}" target="_blank" rel="noopener">اقرأ المصدر</a></p>`;
    body+=`<div class="actions">${a.button('أكمل المحطة '+a.icon('arrow'),'activity-next','','primary',ready(a)?'':'disabled')}${a.button('أكتب فكرة · اختياري','open-prompt','0','secondary')}${a.button('خريطة معية الله','go','journey','quiet')}</div>`;
    return a.shell(body,'journey','','maiyya-stage');
  }
  function finish(a){
    if(!ready(a)){a.toast('استكشف النشاط التعليمي أولًا، دون حاجة لإثبات عمل خارج الشاشة.');return;}
    stopTimer(a);const stage=a.s(),c=config(a);
    if(!a.save(d=>{const p=d.journeys.maiyya;p.started=true;p.activities[stage.id]={...a.activity,completed:true};if(!p.completed.includes(stage.id))p.completed.push(stage.id);if(stage.badge&&!p.badges.includes(stage.id))p.badges.push(stage.id);const next=c.stages[c.stages.indexOf(stage)+1];p.checkpoint=next?{stageId:next.id,step:'activity'}:null;if(stage.kind==='closing')p.sevenDayPlan={startedOn:a.today(),reviewTime:a.activity.reviewTime||'وقت أختاره لاحقًا',itemIds:c.dailyItems.map(item=>item.id)};}))return;
    a.clearDirty();a.go('ma-reward');
  }
  function reward(a){const stage=a.s(),c=config(a),next=c.stages[c.stages.indexOf(stage)+1];return a.shell(`<span class="eyebrow center">${next?'خطوة تعلّم اكتشفتها':'اكتملت رحلة التعلّم'}</span><h1 class="plaque">${stage.badge||'محاولة وفكرة جديدة'}</h1>${a.scene(stage.scene,'رفيقا الحديقة','reward-scene')}<p>${next?'استكشفت «'+stage.title+'». يمكنك العودة إليها في أي وقت.':'كل يوم فرصة جديدة لتذكر الله، والتقرب إليه، واختيار الخير.'}</p><div class="panel"><p class="small">هذا تذكار تعلّم ومشاركة، وليس حكمًا على الإيمان أو الإخلاص أو معية الله الخاصة. لا ننتظر سبعة أيام لإكمال الرحلة الرقمية.</p></div><div class="actions">${a.button(next?'المحطة التالية':'رحلتي اليوم',next?'stage':'daily',next?.id||'')}${a.button('أكتب فكرة · اختياري','open-prompt','0','secondary')}${a.button('خريطة الرحلة','go','journey','quiet')}</div>`,'journey');}
  function daily(a){
    const c=config(a),r=record(a),count=c.dailyItems.filter(item=>r.items[item.id]).length,history=Object.entries(progress(a).daily).filter(([,v])=>Object.values(v.items).some(Boolean));
    return a.shell(`<span class="eyebrow">${a.date(new Date())} · خطوات على راحتك</span><h1 class="plaque">رحلتي اليوم 🌱 <span>${a.num(count)}/٦</span></h1><p class="small">عدد الخطوات التي اخترت تسجيلها، وليس درجة للإيمان أو التقوى. لا حاجة لإثبات، ولا يضيع تقدمك إذا فاتك يوم.</p>${progress(a).sevenDayPlan?`<div class="panel"><h2>خطتي لسبعة أيام</h2><p>وقت مراجعتي: ${a.esc(progress(a).sevenDayPlan.reviewTime)}</p><p class="small">أبدأ بخطوة أقدر عليها، وأعود بعد أي انقطاع.</p></div>`:''}<div class="daily-checklist">${c.dailyItems.map(item=>a.button(`<span class="daily-check">${r.items[item.id]?'✓':''}</span><span><strong>${item.title}</strong><span class="small">${item.description}</span></span>`,'daily-toggle',item.id,'daily-item',`role="checkbox" aria-checked="${!!r.items[item.id]}"`)).join('')}</div><div class="actions">${a.button('أكمل رحلة معية الله','journey','maiyya')}${a.button('أراجع يومي كتابةً · اختياري','daily-note','','secondary')}${a.button('الخريطة وكل الأبواب','go','map','quiet')}</div><section class="panel"><h2>مثلثات خطوة طيبة</h2><p class="small">اقتراح عشوائي اختياري لليوم. لا يغيّر ترتيب المحطات ولا يفتح يومًا إجباريًا.</p><div class="triangles">${[0,1,2].map(i=>a.button(`<span aria-hidden="true">△</span><span class="small">${r.triangle?.index===i?'فتحت هذا':'اقتراح '+a.num(i+1)}</span>`,'triangle',i,'triangle',r.triangle?'disabled':'')).join('')}</div>${r.triangle?`<div class="feedback" role="status">${c.surpriseMessages[r.triangle.message]}</div>`:''}</section><section class="panel"><h2>مفاجأة المشاركة 🎲</h2><p class="small">تذكار افتراضي عشوائي للمشاركة، دون نقاط أو تقييم للصلاة. نتيجة واحدة محفوظة لكل يوم، ولا تُسحب إذا عدّلت تسجيلك.</p>${r.dice?`<div class="dice-result" role="status"><strong>${a.num(r.dice.number)}</strong><h3>${c.stickers[r.dice.number-1]}</h3><p>تقدر تبدأ من جديد كل يوم.</p></div>`:a.button('أكشف تذكاري الافتراضي','dice','','secondary',history.length||progress(a).completed.length?'':'disabled')}${!history.length&&!progress(a).completed.length?'<p class="small">استكشف محطة أو سجّل خطوة تختارها عندما تحب.</p>':''}</section><section class="panel"><h2>مسيرتي دون خصم</h2><p>سجّلت مشاركتي في ${a.num(history.length)} أيام. أقدر أعود في أي وقت.</p>${history.slice(-7).reverse().map(([day,entry])=>`<div class="prompt-row"><span>${a.date(day+'T12:00:00')}</span><span class="small">${a.num(c.dailyItems.filter(item=>entry.items[item.id]).length)}/٦ خطوات سجّلتها</span></div>`).join('')||'<p class="small">ليس لديك تسجيل بعد. ابدأ عندما يناسبك.</p>'}</section>`,'map','daily');
  }
  function library(a){const c=config(a),unlocked=progress(a).completed.includes('ma-meaning');if(!unlocked)return a.shell(`<h1 class="plaque">ألعاب الآيات</h1><p>نبدأ أولًا بفهم معنى المعية، ثم نستكشف الأبواب التعليمية.</p>${a.button('أكتشف المعنى','stage','ma-meaning')}`,'journey');const id=a.ui.matchId||c.matches[0].id;return a.shell(`<h1 class="plaque">آية وباب ومعنى</h1><p>صل المعنى ببابه ثم جرّب الموقف. المحاولات بلا خصم، وفتح الباب إنجاز تعليمي فقط.</p><div class="chips">${c.matches.map(m=>a.button(c.verses[m.verseId].ref,'match-open',m.id,'chip',`aria-pressed="${id===m.id}"`)).join('')}</div>${matchingCard(a,id)}${a.button('خريطة معية الله','go','journey','quiet')}`,'journey');}
  function format(seconds){return Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');}
  function stopTimer(a=timerAPI){if(!timer)return;clearInterval(timer);timer=null;if(a){a.storeActivity({timerRemaining:a.activity.timerRemaining??120},false);a.toast('تقدر تكمل وقتما تحب.');}timerAPI=null;}
  function handle(act,value,a){
    const c=config(a);
    if(act==='daily'){a.go('daily',{jid:'maiyya'});return true;}
    if(act==='matching'){a.go('matching',{jid:'maiyya'});return true;}
    if(act==='match-open'){a.go('matching',{jid:'maiyya',matchId:value});return true;}
    if(act==='match-door'||act==='match-answer'){
      const [id,raw]=value.split(':'),index=Number(raw),m=c.matches.find(x=>x.id===id);if(!m||!Number.isInteger(index)||index<0||index>2)return true;
      a.save(d=>{const old=d.journeys.maiyya.matching[id]||{completed:false};if(act==='match-door'){d.journeys.maiyya.matching[id]={...old,door:index};delete d.journeys.maiyya.matching[id].choice;}else if(old.door===m.correctDoor)d.journeys.maiyya.matching[id]={...old,choice:index,completed:old.completed||index===m.correctChoice};});a.render();return true;
    }
    if(act==='daily-toggle'){
      if(!c.dailyItems.some(item=>item.id===value))return true;
      if(a.save(d=>{const m=d.journeys.maiyya;m.started=true;const r=m.daily[a.today()]??={items:{}};r.items[value]=!r.items[value];})){a.render();requestAnimationFrame(()=>document.querySelector(`[data-act="daily-toggle"][data-value="${value}"]`)?.focus({preventScroll:true}));}return true;
    }
    if(act==='daily-note'){
      const id='maiyya:daily:'+a.today(),meta={journeyId:'maiyya',stageId:'daily',stageTitle:'رحلتي اليوم · '+a.date(new Date()),title:'ماذا تعلمت؟ وما الخطوة الصغيرة التي أحب أن أجرّبها غدًا؟',archived:false};
      a.go('editor',{jid:'maiyya',stageId:'daily',promptId:id,noteMeta:meta,returnTo:{screen:'daily',jid:'maiyya'}});return true;
    }
    if(act==='triangle'||act==='dice'){
      const r=record(a);if(act==='triangle'&&r.triangle||act==='dice'&&r.dice)return true;
      if(act==='dice'&&!progress(a).completed.length&&!Object.values(progress(a).daily).some(day=>Object.values(day.items).some(Boolean)))return true;
      if(a.save(d=>{const m=d.journeys.maiyya;m.started=true;const entry=m.daily[a.today()]??={items:{}};if(act==='triangle'){const index=Number(value);if(!Number.isInteger(index)||index<0||index>2)throw Error('Invalid triangle');entry.triangle={index,message:random(c.surpriseMessages.length)};}else entry.dice={number:random(6)+1};}))a.render();return true;
    }
    if(act==='ma-phrase'){a.storeActivity({phrase:Number(value)});return true;}
    if(act==='ma-timer-reset'){stopTimer(a);a.storeActivity({timerRemaining:120});return true;}
    if(act==='ma-timer'){
      if(timer){stopTimer(a);return true;}
      if((a.activity.timerRemaining??120)<=0)a.activity.timerRemaining=120;
      timerAPI=a;timer=setInterval(()=>{a.activity.timerRemaining=Math.max(0,(a.activity.timerRemaining??120)-1);const el=document.getElementById('ma-timer');if(el)el.textContent=format(a.activity.timerRemaining);if(a.activity.timerRemaining%5===0)a.storeActivity({timerRemaining:a.activity.timerRemaining},false);if(a.activity.timerRemaining===0){stopTimer(a);a.toast('انتهت الوقفة الاختيارية. نكمل على راحتك.');}},1000);return true;
    }
    return false;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopTimer();});
  window.MaiyyaUI={overview,stageScreen,reward,daily,library,finish,handle,stopTimer};
})();
