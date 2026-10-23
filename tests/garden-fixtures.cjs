const blank=()=>({completed:[],activities:{},videos:{},badges:[],checkpoint:null,practice:[],plan:null});
function v2(){
 const t=blank(),d=blank();t.completed=Array.from({length:12},(_,i)=>'t'+(i+1));t.badges=[...t.completed];t.checkpoint={stageId:'t12',step:'reflection'};
 t.plan={virtue:'الصدق',behavior:'الكذب',good:'مساعدة أحد',review:'وقفة قصيرة'};
 t.practice=[{day:'2026-10-14',text:'جربت',date:'١٤ أكتوبر'}];
 t.videos={'tazkiya-intro':{videoSegmentId:'tazkiya-intro',position:55,completed:true},'tazkiya-tahliya':{videoSegmentId:'tazkiya-tahliya',position:115,completed:true},'tazkiya-final':{videoSegmentId:'tazkiya-final',position:190.206304,completed:true}};
 d.completed=['d1','d2'];d.badges=['d1','d2'];d.checkpoint={stageId:'d3',step:'activity'};
 return {schemaVersion:2,characterId:'girl',profile:{name:'نور'},activeJourneyId:'tazkiya',journeys:{dhikr:d,tazkiya:t},drafts:{'tazkiya:t8:p0':'مسودة من الكلمة الطيبة','tazkiya:t11:p1':'كتابة لم أحفظها كتأمل'},reflections:{'tazkiya:t8:p0':{text:'أتكلم بلطف',journeyId:'tazkiya',stageId:'t8',promptId:'tazkiya:t8:p0',title:'ما الكلمة الطيبة التي أحب أن أستخدمها؟',updatedAt:'2026-10-14T12:00:00Z'}},settings:{motion:false},legacy:null};
}
const v1=()=>({profile:{name:'قديم',avatar:2},done:['story','meaning'],drafts:{'dhikr-reflection-0':'مسودة قديمة'},reflections:{'dhikr-reflection-0':'تأمل قديم'},practice:[{day:'2026-10-01',text:'جربت'}],moment:'sleep',settings:{motion:false},last:'meaning'});
module.exports={v2,v1};
