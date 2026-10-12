/* Haven FW website — Smarter Guide tab (feature #32, ported from the app's gm-guides.js):
   category chips, synonym search, "Suggested for today", live open-now badges,
   distance + View map / Directions / Call buttons per guide, [[place]] rich links,
   and bring/steps checklists that remember progress.
   Uses the same 'hvgp' localStorage store as the old Guide tab, so existing
   check-off progress is kept. English-only per site convention. */
"use strict";
var SG_CH=[["all","✨","All"],["food","🛒","Food"],["health","🩺","Health"],["money","💳","Money & ID"],["home","🏠","Housing & safety"],["move","🚌","Getting around"],["phone","📱","Phone & internet"]];
function sgCatOf(g){var s=String((g.id||"")+" "+(g.title||"")).toLowerCase();
  if(/snap|wic|food|ebt|meal|gift/.test(s))return"food";
  if(/medic|meds|therap|addict|health|dental|glass|walker|mental/.test(s))return"health";
  if(/ssi|legal|voucher|benefit|\bid\b|license|budget|money/.test(s))return"money";
  if(/shelter|safe|winter|heat|hous|storm|lgbt/.test(s))return"home";
  if(/bus|ride|bike|transit/.test(s))return"move";
  if(/phone|data|internet|wifi/.test(s))return"phone";
  return"all";}
var SG_SYN=[["food stamps","snap ebt grocery"],["doctor","medicaid medicare clinic"],["rent","housing shelter"],["cold","winter shelter"],["hot","heat"],["phone","freephone"],["internet","data wifi"],["ride","bus"],["lawyer","legal"],["drugs","addiction recovery"],["mental","therapy"],["hungry","food snap"],["glasses","vision"],["medicine","meds pharmacy"]];
var sgCat="all", sgQ="";
function sgGet(k){try{return JSON.parse(localStorage.getItem(k)||"{}");}catch(e){return{};}}
function sgSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function sgHay(g){return{t:String(g.title||"").toLowerCase(),
  all:[g.title,g.intro,g.where,(g.bring||[]).join(" "),(g.steps||[]).join(" "),g.tips].join(" ").toLowerCase()};}
function sgMatch(g){var h=sgHay(g);
  if(sgCat!=="all"&&sgCatOf(g)!==sgCat)return 0;
  if(!sgQ)return 1;
  var score=0, toks=sgQ.split(/\s+/).filter(Boolean), ti, si, wi, grp, hit;
  for(ti=0;ti<toks.length;ti++){var tk=toks[ti];grp=[tk];
    for(si=0;si<SG_SYN.length;si++){if(SG_SYN[si][0].indexOf(tk)>=0||tk.indexOf(SG_SYN[si][0])>=0){var ws=SG_SYN[si][1].split(" ");for(wi=0;wi<ws.length;wi++)grp.push(ws[wi]);}}
    hit=0;
    for(wi=0;wi<grp.length;wi++){var w=grp[wi];if(h.t.indexOf(w)>=0)hit+=5;else if(h.all.indexOf(w)>=0)hit+=1;}
    if(!hit)return 0;
    score+=hit;}
  return score;}
function sgPlace(g){try{var r=(typeof byId==="function")?byId(g.whereId):null;return (r&&r.id)?r:null;}catch(e){return null;}}
function sgRich(s){var x=(typeof escapeHtml==="function")?escapeHtml(String(s==null?"":s)):String(s==null?"":s);
  return x.replace(/\[\[([a-z0-9-]+)\]\]/g,function(m,id){
    var r=null;try{r=(typeof byId==="function")?byId(id):null;}catch(e){}
    if(r&&r.id){var nm=(typeof escapeHtml==="function")?escapeHtml(r.name):r.name;
      return '<button class="sg-place" data-sgplace="'+id+'">'+nm+'</button>';}
    return m;});}
function sgProg(g){var p=sgGet("hvgp")[g.id]||{},n=((g.bring)||[]).length;
  return{done:(p.b||[]).length,n:n,b:p.b||[],s:p.s||[]};}
function sgOpenBadge(r){var s=null;try{s=(typeof isOpenNow==="function")?isOpenNow(r):null;}catch(e){}
  if(s===true)return '<span class="sg-open">🟢 Open now</span>';
  if(s===false)return '<span class="sg-closed">🔴 Closed now</span>';
  return "";}
function sgDist(r){try{
  if(typeof userLoc!=="undefined"&&userLoc&&r&&r.lat&&typeof distMi==="function"){
    return ' <span class="sg-dist">📍 '+distMi(userLoc.lat,userLoc.lng,r.lat,r.lng).toFixed(1)+' mi</span>';}
  }catch(e){}
  return "";}
function sgTelHref(r){try{
  if(r.phoneHref)return "tel:+"+String(r.phoneHref).replace(/[^0-9+]/g,"");
  if(r.phone){var d=String(r.phone).replace(/\D/g,"");if(d)return "tel:+"+d;}
  }catch(e){}
  return "";}
function sgCard(g){var r=sgPlace(g),p=sgProg(g);
  var open=sgOpenBadge(r),dist=sgDist(r);
  var pill=p.n?'<span class="sg-pill" data-pill="'+g.id+'">'+p.done+'/'+p.n+' ready</span>':"";
  var gid=(typeof escapeAttr==="function")?escapeAttr(g.id):g.id;
  var head='<button class="sg-head"><div class="sg-ic">'+(g.icon||"📖")+'</div>'+
    '<div class="sg-main"><h3>'+sgRich(g.title)+'</h3><p>'+sgRich(g.intro)+'</p>'+
    '<div class="sg-meta">'+open+dist+pill+'</div></div><div class="sg-chev">›</div></button>';
  var where=(g.where?'<div class="sg-where">📍 <b>'+sgRich(g.where)+'</b></div>':"");
  var btns="";
  if(r){btns='<div class="sg-btns">';
    if(r.lat)btns+='<button class="sg-b" data-sgmap="'+gid+'">🗺️ View map</button>';
    if(r.lat)btns+='<a class="sg-b" target="_blank" rel="noopener" href="https://maps.google.com/?q='+r.lat+','+r.lng+'">➤ Directions</a>';
    var tel=sgTelHref(r);if(tel)btns+='<a class="sg-b" href="'+tel+'">📞 Call</a>';
    btns+='</div>';}
  var bring="";
  if(g.bring&&g.bring.length){
    bring='<div class="sg-sec">BRING <small>tap to check off</small></div><ul class="sg-chk">'+
      g.bring.map(function(b,i){var done=p.b.indexOf(i)>=0;
        return '<li data-k="b" data-i="'+i+'" class="'+(done?"done":"")+'"><i></i><span>'+sgRich(b)+'</span></li>';}).join("")+'</ul>';}
  var steps='<div class="sg-sec">STEPS</div>';
  if(g.steps&&g.steps.length){
    steps+='<ol class="sg-steps">'+g.steps.map(function(s,i){var done=p.s.indexOf("s"+i)>=0;
      return '<li data-k="s" data-i="'+i+'" class="'+(done?"done":"")+'"><i>'+(i+1)+'</i><span>'+sgRich(s)+'</span></li>';}).join("")+'</ol>';}
  else steps="";
  var tips=g.tips?'<div class="sg-tip">💡 '+sgRich(g.tips)+'</div>':"";
  return '<div class="sg-card" data-g="'+gid+'" data-cat="'+sgCatOf(g)+'">'+head+
    '<div class="sg-body">'+where+btns+bring+steps+tips+'</div></div>';}
function sgSuggest(list){var m=new Date().getMonth()+1,ids=[];
  var cold=m>=11||m<=3,hot=m>=6&&m<=9;
  if(cold){ids.push("winter","safehaven");}
  if(hot){ids.push("heat");}
  var v=sgGet("hv_gview");
  Object.keys(v).sort(function(a,b){return v[b]-v[a];}).slice(0,2).forEach(function(i){ids.push(i);});
  list.forEach(function(g){var r=sgPlace(g);
    if(r&&ids.length<8){try{if(typeof isOpenNow==="function"&&isOpenNow(r)===true)ids.push(g.id);}catch(e){}}});
  var seen={},out=[];
  ids.forEach(function(i){if(seen[i])return;seen[i]=1;
    var g=null;list.forEach(function(x){if(x.id===i)g=x;});
    if(g)out.push(g);});
  return out.slice(0,4);}
function sgPaint(){var box=document.getElementById("ggCards");if(!box)return;
  var area=null;try{area=(typeof getArea==="function")?getArea():"fort-wayne";}catch(e){area="fort-wayne";}
  var list=(typeof GUIDES!=="undefined"?GUIDES:[]).filter(function(g){return !g.area||g.area===area;});
  var L=list.map(function(g){return{g:g,s:sgMatch(g)};}).filter(function(x){return x.s;});
  if(sgQ)L.sort(function(a,b){return b.s-a.s;});
  var sg=(!sgQ&&sgCat==="all")?sgSuggest(list):[];
  var html="";
  if(sg.length){
    html+='<div class="sg-sug"><div class="sg-sh">⭐ Suggested for today</div><div class="sg-sr">'+
      sg.map(function(g){var ic=g.icon||"📖";
        return '<button data-go="'+((typeof escapeAttr==="function")?escapeAttr(g.id):g.id)+'"><span>'+ic+'</span>'+sgRich(g.title)+'</button>';}).join("")+'</div></div>';}
  if(L.length)html+='<div class="sg-grid">'+L.map(function(x){return sgCard(x.g);}).join("")+'</div>';
  else html+='<div class="sg-empty">😕 No guide found for &ldquo;'+sgRich(sgQ)+'&rdquo;.<br>Try &ldquo;food&rdquo;, &ldquo;rent&rdquo;, &ldquo;doctor&rdquo; or &ldquo;phone&rdquo;.</div>';
  box.innerHTML=html;
  sgBind(box);}
function sgToggle(box,gid,k,i){var P=sgGet("hvgp"),o=P[gid]=P[gid]||{b:[],s:[]};
  var arr=(k==="s")?o.s:o.b,key=(k==="s")?"s"+i:i,at=arr.indexOf(key);
  if(at>=0)arr.splice(at,1);else arr.push(key);
  sgSet("hvgp",P);
  var card=box.querySelector('.sg-card[data-g="'+gid+'"]');
  if(card){var pill=card.querySelector("[data-pill]");
    if(pill&&k==="b"){var n=card.querySelectorAll(".sg-chk li").length;
      pill.textContent=o.b.length+"/"+n+" ready";
      pill.classList.toggle("all",o.b.length===n&&n>0);}}}
function sgBind(box){
  box.querySelectorAll(".sg-card").forEach(function(c){
    var head=c.querySelector(".sg-head");
    if(head)head.onclick=function(){var o=c.classList.toggle("open");
      if(o){var v=sgGet("hv_gview"),id=c.getAttribute("data-g");v[id]=(v[id]||0)+1;sgSet("hv_gview",v);}};});
  box.querySelectorAll("[data-sgplace]").forEach(function(b){
    b.onclick=function(e){e.stopPropagation();
      var r=null;try{r=(typeof byId==="function")?byId(b.getAttribute("data-sgplace")):null;}catch(x){}
      if(r&&r.id&&typeof showSheet==="function"){try{showSheet(r);}catch(x){}}};});
  box.querySelectorAll("[data-sgmap]").forEach(function(b){
    b.onclick=function(e){e.stopPropagation();
      var r=null;try{r=(typeof byId==="function")?byId(b.getAttribute("data-sgmap")):null;}catch(x){}
      if(!(r&&r.id&&r.lat))return;
      try{if(typeof goTab==="function")goTab("map");}catch(x){}
      setTimeout(function(){try{
        if(typeof map!=="undefined"&&map&&typeof map.setView==="function")map.setView([r.lat,r.lng],16);
      }catch(x){}},150);};});
  box.querySelectorAll(".sg-chk li,.sg-steps li").forEach(function(li){
    li.onclick=function(){var c=li;while(c&&!c.classList.contains("sg-card"))c=c.parentNode;
      if(!c)return;
      sgToggle(box,c.getAttribute("data-g"),li.getAttribute("data-k"),parseInt(li.getAttribute("data-i"),10));
      li.classList.toggle("done");};});
  box.querySelectorAll("[data-go]").forEach(function(b){
    b.onclick=function(){var t=box.querySelector('.sg-card[data-g="'+b.getAttribute("data-go")+'"]');
      if(t){t.classList.add("open");
        var v=sgGet("hv_gview"),id=t.getAttribute("data-g");v[id]=(v[id]||0)+1;sgSet("hv_gview",v);
        try{t.scrollIntoView({behavior:"smooth",block:"start"});}catch(e){}}};});}
function renderGuidesSmart(){var box=document.getElementById("ggCards");
  if(!box||typeof GUIDES==="undefined")return;
  if(!document.getElementById("sgTop")){
    var top=document.createElement("div");top.id="sgTop";top.className="sg-top";
    top.innerHTML='<input id="sgQ" class="sg-q" type="search" placeholder="What do you need? (food, rent, doctor, phone…)" autocomplete="off">'+
      '<div class="sg-chips">'+SG_CH.map(function(c){
        return '<button data-c="'+c[0]+'" class="'+(c[0]===sgCat?"on":"")+'"><span>'+c[1]+'</span> '+c[2]+'</button>';}).join("")+'</div>';
    box.parentNode.insertBefore(top,box);
    var q=top.querySelector("#sgQ");
    q.oninput=function(e){sgQ=e.target.value.trim().toLowerCase();sgPaint();};
    top.querySelectorAll(".sg-chips button").forEach(function(b){
      b.onclick=function(){sgCat=b.getAttribute("data-c");
        top.querySelectorAll(".sg-chips button").forEach(function(x){x.classList.toggle("on",x===b);});
        sgPaint();};});}
  else{var qq=document.getElementById("sgQ");if(qq&&document.activeElement!==qq)qq.value=sgQ;}
  sgPaint();}
if(typeof window!=="undefined"){window.renderGuides=renderGuidesSmart;}
