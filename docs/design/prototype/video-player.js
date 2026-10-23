/* One original film, bounded logical segments. No autoplay or network APIs. */
(() => {
  let v=null,context=null,ready=false,finished=false,failed=false,end=0,lastSave=0,frame=null;
  const el=id=>document.getElementById(id);
  const status=text=>{if(el('video-status'))el('video-status').textContent=text;};
  const clock=t=>Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');
  function record(complete=false){
    if(!v||!ready||failed)return false;
    return context.save({videoSegmentId:context.segment.id,position:Math.max(context.segment.start,Math.min(end,v.currentTime)),completed:complete});
  }
  function complete(){
    if(!v||finished||failed)return;
    v.pause();finished=true;v.currentTime=end;
    if(record(true)){el('video-next').disabled=false;status('اكتمل هذا الجزء. جاهز عندما تحب.');}
    else {finished=false;status('اكتمل العرض، لكن تعذر حفظه. اضغط تشغيل لإعادة محاولة الحفظ.');}
  }
  function update(){
    if(!v||!ready)return;
    if(v.currentTime<context.segment.start-.02||v.currentTime>end+.04){v.currentTime=Math.max(context.segment.start,Math.min(end-.05,v.currentTime));return;}
    if(!v.paused&&!v.seeking&&v.currentTime>=end-.045){complete();return;}
    if(el('video-seek'))el('video-seek').value=Math.max(0,v.currentTime-context.segment.start);
    if(el('video-time'))el('video-time').textContent=clock(v.currentTime-context.segment.start)+' / '+clock(end-context.segment.start);
    if(!v.paused&&Math.abs(v.currentTime-lastSave)>=2){lastSave=v.currentTime;if(!record())status('التشغيل مستمر، لكن تعذر حفظ موضعك.');}
  }
  function watch(_,metadata){if(!v)return;if(metadata.mediaTime>=end-.045&&!v.paused&&!v.seeking)complete();else update();if(v&&!v.paused&&v.requestVideoFrameCallback)frame=v.requestVideoFrameCallback(watch);}
  function error(){if(!v)return;failed=true;ready=false;if(el('video-error'))el('video-error').hidden=false;if(el('video-next'))el('video-next').disabled=true;status('لم نقدر نفتح الفيديو. حاول مرة أخرى.');}
  window.HayahVideo={
    mount(ctx){
      context=ctx;v=el('journey-video');const target=v;ready=false;finished=false;failed=false;
      v.addEventListener('loadedmetadata',()=>{
        if(v!==target)return;end=ctx.segment.end??v.duration;
        if(!Number.isFinite(end)||v.duration<end-.1){error();return;}
        ready=true;v.currentTime=Math.max(ctx.segment.start,Math.min(end-.1,Number(ctx.saved?.position)||ctx.segment.start));lastSave=v.currentTime;
        el('video-seek').max=end-ctx.segment.start-.05;status(ctx.saved?.completed?'هذا الجزء مكتمل. يمكنك إعادته.':'جاهز عندما تحب.');update();
      });
      v.addEventListener('error',()=>{if(v===target)error();});
      v.addEventListener('timeupdate',()=>{if(v===target)update();});
      v.addEventListener('seeking',()=>{if(v!==target||!ready)return;const pos=Math.max(ctx.segment.start,Math.min(finished?end:end-.05,v.currentTime));if(Math.abs(pos-v.currentTime)>.01)v.currentTime=pos;});
      v.addEventListener('play',()=>{if(v!==target)return;el('play-button').textContent='إيقاف';status('يمكنك الإيقاف والعودة في أي وقت.');if(v.requestVideoFrameCallback)frame=v.requestVideoFrameCallback(watch);});
      v.addEventListener('pause',()=>{if(v!==target)return;if(el('play-button'))el('play-button').textContent='تشغيل';if(ready&&!record(finished))status('موضعك الأخير لم يُحفظ. جرّب مرة أخرى.');});
      v.addEventListener('ended',()=>{if(v===target&&ready&&end===v.duration)complete();});
    },
    async action(name){
      if(!v)return;
      if(name==='mute'){v.muted=!v.muted;el('mute-button').textContent=v.muted?'تشغيل الصوت':'كتم الصوت';return;}
      if(!ready)return;
      if(name==='restart'){v.pause();v.currentTime=context.segment.start;finished=false;record();status('جاهز من البداية. تقدمك السابق محفوظ.');update();return;}
      if(name==='play'){
        if(v.currentTime>=end-.06&&!finished){complete();return;}
        if(v.paused){if(finished){v.currentTime=context.segment.start;finished=false;}try{await v.play();}catch(e){status('اضغط تشغيل للمحاولة مرة أخرى.');}}
        else v.pause();
      }
    },
    seek(value){if(v&&ready){finished=false;v.currentTime=context.segment.start+Number(value);update();}},
    stop(){if(!v)return;v.pause();if(ready&&!failed&&!record(finished))context.warn('تعذر حفظ آخر موضع. موضعك المحفوظ السابق ما زال موجودًا.');if(frame&&v.cancelVideoFrameCallback)v.cancelVideoFrameCallback(frame);const previous=v;v=null;ready=false;previous.removeAttribute('src');previous.load();},
    background(){if(v)v.pause();},
    get available(){return ready&&!failed;}
  };
  document.addEventListener('visibilitychange',()=>{if(document.hidden)window.HayahVideo.background();});
  window.addEventListener('beforeunload',()=>record(finished));
})();
