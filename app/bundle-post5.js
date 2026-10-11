
/* === gm-pins.js === */
/* Google-Maps-style pin behavior: tap = select (no zoom), pan pin above card, card with actions, swipe up = details, swipe down / tap map = dismiss */
(function(){
  const _mcg=L.markerClusterGroup; L.markerClusterGroup=o=>(o&&o.hvBus)?_mcg(o):_mcg(Object.assign({},o,{disableClusteringAtZoom:1,maxClusterRadius:1,spiderfyOnMaxZoom:false}));
  window.selectMarker = function(id){
    const prev = state.selId; state.selId = id;
    if (id && state.markers[id] && clusters && !clusters.hasLayer(state.markers[id])) clusters.addLayer(state.markers[id]);
    new Set([prev, id]).forEach(mid=>{
      const m = mid && state.markers[mid], r = mid && byId(mid);
      if (m && m.setZIndexOffset) m.setZIndexOffset(mid===id?100000:0);
      if (m && r) m.setIcon(L.divIcon({className:"mk"+(mid===id?" sel":""),html:pinHtml(r),iconSize:hvIS(38),iconAnchor:hvIS(19)}));
    });
    setTimeout(hvDeclutterNames,350);
    if (!id) return;
    const r = byId(id), m = state.markers[id]; if (!r) return;
    const go = () => { // keep zoom; park the pin in the upper third, clear of the card
      const z = map.getZoom(), p = map.project([r.lat,r.lng], z), h = map.getSize().y;
      map.panTo(map.unproject(p.add([0, h*0.22]), z), {animate:true, duration:.35});
    };
    if (m && clusters && clusters.getVisibleParent && clusters.getVisibleParent(m) !== m) clusters.zoomToShowLayer(m, go); else go();
  };
  window.showPeek = function(r){
    const el = document.getElementById("peek");
    const h = r.hours && r.hours[new Date().getDay()];
    const today = r.hours ? (h ? fmtT(h[0])+" – "+fmtT(h[1]) : esc(t("sheet_closed"))) : esc(r.hoursText&&r.hoursText.length<=40?r.hoursText:t("sheet_hoursvary"));
    const dest = encodeURIComponent(r.name+", "+r.addr+", Fort Wayne, IN");
    el.classList.remove("full");
    el.innerHTML = `<div class="gm-head" id="gmHead"><div class="gm-grab"></div>
      <div class="gm-t">${esc(r.name)}</div>
      <div class="gm-s">${esc(catLabel(r.cats[0]))} · ${badgeHtml(r)}${state.loc?` · ${distText(r)}`:""}</div></div>
      <div class="gm-a">
        <a class="p" href="geo:${r.lat},${r.lng}?q=${dest}">➤ Directions</a>
        <a href="#" data-hv-go="car" data-lat="${r.lat}" data-lng="${r.lng}" data-name="${esc(r.name)}">🚗 Drive</a>
        ${r.phone?`<a href="tel:${r.phoneHref}">📞 Call</a>`:""}
        <button id="gmSave">${state.favs.includes(r.id)?"★ Saved":"☆ Save"}</button>
        <button id="gmShare">⇪ Share</button></div>
      <div class="gm-body">
        <div class="gm-row">📍 ${esc(r.addr)}, Fort Wayne, IN ${r.zip}</div>
        <div class="gm-row">🕒 Today: ${today}</div>
        ${r.phone?`<div class="gm-row">📞 ${esc(r.phone)}</div>`:""}
        ${r.web?`<div class="gm-row"><a href="${esc(r.web)}" target="_blank">🌐 Website</a></div>`:""}
        <p class="gm-desc">${esc(r.desc)}</p>
        ${r.tags?`<div class="tagrow">${r.tags.map(tg=>`<span class="tag">✓ ${esc(tg)}</span>`).join("")}</div>`:""}
        <div class="hours gm-more"><h4>${esc(t("sheet_hours"))}</h4>${hoursRows(r)}</div>
        ${r.inside?`<div class="hours gm-more"><h4>${esc(t("sheet_inside"))}</h4>${r.inside.map(x=>`<div class="insiderow"><b>${esc(x.t)}</b><p>${esc(x.d)}</p></div>`).join("")}</div>`:""}
      </div>`;
    const nv=document.querySelector("nav"); el.style.bottom=(nv&&nv.offsetHeight?nv.offsetHeight:0)+"px";
    el.classList.add("show"); el.scrollTop = 0;
    el.querySelector("#gmSave").onclick = e => { const b=e.currentTarget, i=state.favs.indexOf(r.id);
      if (i>=0) state.favs.splice(i,1); else state.favs.push(r.id);
      saveFavs(); try{renderList();}catch(x){} try{renderSaved();}catch(x){} b.textContent = state.favs.includes(r.id)?"★ Saved":"☆ Save"; gmLOD(); };
    el.querySelector("#gmShare").onclick = () => { const u=`https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lng}`; navigator.share ? navigator.share({title:r.name,text:r.name+", "+r.addr,url:u}).catch(()=>{}) : (navigator.clipboard&&navigator.clipboard.writeText(u)); };
    const head = el.querySelector("#gmHead"); let y0=null, moved=false;
    head.ontouchstart = e => { y0 = e.touches[0].clientY; moved=false; };
    head.ontouchmove = () => { moved=true; };
    head.ontouchend = e => { if (y0==null) return; const dy = e.changedTouches[0].clientY - y0; y0=null;
      if (dy < -30) el.classList.add("full");
      else if (dy > 30) { if (el.classList.contains("full")) el.classList.remove("full"); else { hidePeek(); selectMarker(null); } }
      else if (!moved) el.classList.toggle("full"); };
  };
  /* the old details menu is retired: every "open place" goes to the map card instead */
  window.openSheet = function(id){ const r=byId(id); if(!r) return;
    goTab("map");
    setTimeout(()=>{ if(map.getZoom()<15) map.setView([r.lat,r.lng],16); selectMarker(id); showPeek(r); },150); };
  /* importance-based decluttering: low zoom shows only the most important places; zoom in to reveal the rest */
  const PRI={shelter:9,meals:9,health:8,mental:8,recovery:7,benefits:7,food:6,cash:6,bathroom:5,water:5,youth:5,hangout:3,thrift:3};
  const score=r=>(state.favs.includes(r.id)?100:0)+Math.max(...r.cats.map(c=>PRI[c]||4))*10+Math.min((r.desc||"").length/120,6);
  window.gmLOD=function(){
    if(!map||!clusters) return;
    const z=map.getZoom();
    if(!window.__gmJit){ window.__gmJit=1; const seen={};   // pull pins that share an exact spot slightly apart
      Object.keys(state.markers).forEach(id=>{ const m=state.markers[id],ll=m.getLatLng(),k=ll.lat.toFixed(5)+","+ll.lng.toFixed(5),n=seen[k]=(seen[k]||0)+1;
        if(n>1){ const ang=n*2.4; m.setLatLng([ll.lat+Math.sin(ang)*0.00004*n,ll.lng+Math.cos(ang)*0.00005*n]); } }); }
    const searching=(state.q&&state.q.trim())||state.cats.length||state.qf.length||state.openOnly||state.wheelOnly;
    const bnd=map.getBounds().pad(.5), minD=(z>=17?30:z>=15?40:z>=13?52:64)*Math.max(.7,hvPS());
    const ids=Object.keys(state.markers).map(id=>({id,r:byId(id)})).filter(x=>x.r);
    const inV=ids.filter(x=>bnd.contains(state.markers[x.id].getLatLng())).sort((a,b)=>score(b.r)-score(a.r));
    const keep=new Set(), pts=[];
    const must=x=>x.id===state.selId||state.favs.includes(x.id);
    inV.filter(must).forEach(x=>{ keep.add(x.id); pts.push(map.latLngToContainerPoint(state.markers[x.id].getLatLng())); });
    const showAll=searching&&inV.length<=40;
    inV.forEach(x=>{ if(keep.has(x.id)) return; const pt=map.latLngToContainerPoint(state.markers[x.id].getLatLng());
      if(showAll||!pts.some(q=>Math.abs(q.x-pt.x)<minD&&Math.abs(q.y-pt.y)<minD)){ keep.add(x.id); pts.push(pt); } });
    const frac=0;
    const add=[],rem=[];
    ids.forEach(({id,r})=>{ const m=state.markers[id];
      const show=keep.has(id)||id===state.selId||state.favs.includes(id);
      const has=clusters.hasLayer(m); if(show&&!has) add.push(m); else if(!show&&has) rem.push(m); });
    if(rem.length) clusters.removeLayers(rem); if(add.length) clusters.addLayers(add);
    setTimeout(hvDeclutterNames,80);
  };
  const _rm=window.refreshMarkers; window.refreshMarkers=function(){ _rm.apply(this,arguments); gmLOD(); };
  const _t=setInterval(()=>{ if(typeof map!=="undefined"&&map&&clusters){ clearInterval(_t); const tier=()=>{ const z=map.getZoom(),c=document.body.classList; c.toggle("pnames",z>=15); c.toggle("gs",z<14); c.toggle("gm",z>=14&&z<16); };
      if(clusters.options.disableClusteringAtZoom!==1){ map.removeLayer(clusters); clusters.options.disableClusteringAtZoom=1; clusters.options.maxClusterRadius=1; map.addLayer(clusters); }
      map.on("moveend zoomend",()=>{tier();gmLOD();}); tier(); gmLOD(); } },300);
})();


/* === gm-guides.js === */
/* Smarter, nicer Guide tab: categories, synonym search, suggestions, live open-now, checklists that remember progress */
(function(){
  const LS=(k)=>{try{return JSON.parse(localStorage.getItem(k)||"{}")}catch(e){return{}}}, SV=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
  const CH=[["all","✨","All"],["food","🛒","Food"],["health","🩺","Health"],["money","💳","Money & ID"],["home","🏠","Housing & safety"],["move","🚌","Getting around"],["phone","📱","Phone & internet"]];
  const catOf=g=>{const s=(g.id+" "+g.title).toLowerCase();
    if(/snap|wic|food|ebt|meal|gift/.test(s))return"food"; if(/medic|meds|therap|addict|health|dental|glass|walker|mental/.test(s))return"health";
    if(/ssi|legal|voucher|benefit|\bid\b|license|budget|money/.test(s))return"money"; if(/shelter|safe|winter|heat|hous|storm|lgbt/.test(s))return"home";
    if(/bus|ride|bike|transit/.test(s))return"move"; if(/phone|data|internet|wifi/.test(s))return"phone"; return"all";};
  const SYN=[["food stamps","snap ebt grocery"],["doctor","medicaid medicare clinic"],["rent","housing shelter"],["cold","winter shelter"],["hot","heat"],["phone","freephone"],["internet","data wifi"],["ride","bus"],["lawyer","legal"],["drugs","addiction recovery"],["mental","therapy"],["hungry","food snap"],["glasses","vision"],["medicine","meds pharmacy"]];
  const tr=g=>{const T=(settings.lang==="es"&&typeof GUIDE_ES!=="undefined"&&GUIDE_ES[g.id])||(settings.lang==="my"&&typeof GUIDE_MY!=="undefined"&&GUIDE_MY[g.id])||null;return T?Object.assign({},g,T):g;};
  let cat="all", q="";
  const hay=g=>{const x=tr(g);return{t:(x.title||"").toLowerCase(),all:[x.title,x.intro,g.where,(x.bring||[]).join(" "),(x.steps||[]).join(" "),x.tips].join(" ").toLowerCase()};};
  function match(g){ const h=hay(g); if(cat!=="all"&&catOf(g)!==cat) return 0; if(!q) return 1;
    let score=0; for(const tk of q.split(/\s+/).filter(Boolean)){ const grp=[tk]; SYN.forEach(([k,v])=>{ if(k.includes(tk)||tk.includes(k)) grp.push(...v.split(" ")); });
      let hit=0; grp.forEach(w=>{ if(h.t.includes(w))hit+=5; else if(h.all.includes(w))hit+=1; }); if(!hit) return 0; score+=hit; } return score; }
  function place(g){ const r=g.whereId?byId(g.whereId):null; return r; }
  function prog(g){ const p=LS("hv_gprog")[g.id]||{}, n=((tr(g).bring)||[]).length; return {done:(p.b||[]).length,n,b:p.b||[],s:p.s||[]}; }
  function card(g){ const x=tr(g), r=place(g), p=prog(g), open=false;
    let st=""; if(r){ try{ st=badgeHtml(r);}catch(e){} }
    const dist=(r&&state.loc)?` <span class="gg-d">📍 ${distText(r)}</span>`:"";
    const pill=p.n?`<span class="gg-pill" data-pill="${g.id}">${p.done}/${p.n} ready</span>`:"";
    return `<div class="gcard gg-card" data-g="${g.id}" data-cat="${catOf(g)}">
      <button class="ghead gg-head"><div class="gicon gg-ic">${g.icon}</div>
        <div class="gg-main"><h3>${esc(x.title)}</h3><p>${guideRich(x.intro)}</p>
        <div class="gg-meta">${st}${dist}${pill}</div></div><div class="gchev">›</div></button>
      <div class="gbody gg-body">
        <div class="gg-where"><div class="gg-wl"><span>${esc(t("guide_where"))}</span><b>${guideRich(g.where)}</b></div>
          <div class="gg-btns">${r?`<button class="gg-b p" data-map="${r.id}">${esc(t("guide_viewmap"))}</button>`:""}
          ${r?`<a class="gg-b" href="geo:${r.lat},${r.lng}?q=${encodeURIComponent(r.name+", "+r.addr+", Fort Wayne, IN")}">➤ Directions</a>`:""}
          ${r&&r.phone?`<a class="gg-b" href="tel:${r.phoneHref}">📞 Call</a>`:""}</div></div>
        ${x.bring&&x.bring.length?`<div class="gg-sec">${esc(t("guide_bring"))} <small>tap to check off</small></div>
        <ul class="gg-chk">${x.bring.map((b,i)=>`<li data-k="b" data-i="${i}" class="${p.b.includes(i)?"done":""}"><i></i><span>${guideRich(b)}</span></li>`).join("")}</ul>`:""}
        <div class="gg-sec">${esc(t("guide_steps"))}</div>
        <ol class="gg-steps">${x.steps.map((s,i)=>`<li data-k="s" data-i="${i}" class="${p.s.includes(i)?"done":""}"><i>${i+1}</i><span>${guideRich(s)}</span></li>`).join("")}</ol>
        <div class="gg-tip">💡 ${guideRich(x.tips)}</div></div></div>`; }
  function suggest(){ const m=new Date().getMonth()+1, ids=[]; const cold=m>=11||m<=3, hot=m>=6&&m<=9;
    if(cold) ids.push("winter","safehaven"); if(hot) ids.push("heat");
    const v=LS("hv_gview"); Object.keys(v).sort((a,b)=>v[b]-v[a]).slice(0,2).forEach(i=>ids.push(i));
    GUIDES.forEach(g=>{ const r=place(g); if(r&&ids.length<8){ try{ if(openStatus(r).state==="open") ids.push(g.id);}catch(e){} } });
    return [...new Set(ids)].map(i=>GUIDES.find(g=>g.id===i)).filter(Boolean).slice(0,4); }
  function paint(){ const box=document.getElementById("ggCards"); if(!box) return;
    let L=GUIDES.map(g=>({g,s:match(g)})).filter(x=>x.s); if(q) L.sort((a,b)=>b.s-a.s);
    const sg=(!q&&cat==="all")?suggest():[];
    box.innerHTML=(sg.length?`<div class="gg-sug"><div class="gg-sh">⭐ Suggested for today</div><div class="gg-sr">${sg.map(g=>`<button data-go="${g.id}"><span>${g.icon}</span>${esc(tr(g).title)}</button>`).join("")}</div></div>`:"")
      +(L.length?L.map(x=>card(x.g)).join(""):`<div class="gg-empty">😕 No guide found for “${esc(q)}”.<br>Try “food”, “rent”, “doctor” or “phone”.</div>`);
    bind(box); }
  function bind(box){
    box.querySelectorAll(".gg-card").forEach(c=>{
      c.querySelector(".ghead").onclick=()=>{ const o=c.classList.toggle("open"); if(o){ const v=LS("hv_gview"); v[c.dataset.g]=(v[c.dataset.g]||0)+1; SV("hv_gview",v); } };
      c.querySelectorAll(".gplace").forEach(b=>b.onclick=e=>{ e.stopPropagation(); openSheet(b.dataset.gp); });
      c.querySelectorAll("[data-map]").forEach(b=>b.onclick=e=>{ e.stopPropagation(); const id=b.dataset.map,r=byId(id); goTab("map"); setTimeout(()=>{ if(map.getZoom()<15) map.setView([r.lat,r.lng],16); selectMarker(id); showPeek(r); },150); });
      c.querySelectorAll(".gg-chk li,.gg-steps li").forEach(li=>li.onclick=()=>{ const P=LS("hv_gprog"), id=c.dataset.g, o=P[id]=P[id]||{b:[],s:[]}, k=li.dataset.k, i=+li.dataset.i, a=o[k];
        const at=a.indexOf(i); if(at>=0) a.splice(at,1); else a.push(i); li.classList.toggle("done"); SV("hv_gprog",P);
        const pl=c.querySelector("[data-pill]"); if(pl&&k==="b"){ const n=c.querySelectorAll(".gg-chk li").length; pl.textContent=o.b.length+"/"+n+" ready"; pl.classList.toggle("all",o.b.length===n); } });
    });
    box.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{ const c=box.querySelector(`.gg-card[data-g="${b.dataset.go}"]`); if(c){ c.classList.add("open"); c.scrollIntoView({behavior:"smooth",block:"start"}); } });
  }
  window.renderGuides=function(){
    const list=document.getElementById("guideList"); if(!list) return;
    if(!document.getElementById("ggCards")){
      list.innerHTML=`<div class="gg-top"><input id="guideQ" class="txtin gg-q" type="search" placeholder="What do you need? (food, rent, doctor, phone…)" autocomplete="off">
        <div class="gg-chips">${CH.map(c=>`<button data-c="${c[0]}" class="${c[0]===cat?"on":""}"><span>${c[1]}</span>${c[2]}</button>`).join("")}</div></div><div id="ggCards"></div>`;
      list.querySelector("#guideQ").oninput=e=>{ q=e.target.value.trim().toLowerCase(); paint(); };
      list.querySelectorAll(".gg-chips button").forEach(b=>b.onclick=()=>{ cat=b.dataset.c; list.querySelectorAll(".gg-chips button").forEach(x=>x.classList.toggle("on",x===b)); paint(); });
    }
    paint(); };
})();


/* === gm-jobs.js === */
/* Cleaner Jobs tab: search, big chips, open-now first, bigger cards with a big Call button */
(function(){
  let jq="";
  /* dismissible jobs tip — remembered on this phone */
  try {
    const tip = document.querySelector('#tab-jobs .tip');
    if (tip) {
      if (localStorage.getItem("haven_jobtip_x")) tip.style.display = "none";
      else {
        const x = document.createElement("button");
        x.className = "tipx"; x.textContent = "✕"; x.setAttribute("aria-label", "Dismiss");
        x.onclick = (e) => { e.stopPropagation(); tip.style.display = "none"; try { localStorage.setItem("haven_jobtip_x", "1"); } catch (e2) {} };
        tip.appendChild(x);
      }
    }
  } catch (e) {}
  window.jobCardHtml=function(j,i){
    const ty=JTYPES[j.type]; let open=""; try{ open=openStatus(j).state; }catch(e){}
    const dly="--d:"+Math.min((i||0)*0.045,0.45).toFixed(2)+"s";
    return `<div class="card gj-card${open==="open"?" is-open":""}" style="--cc:${ty.color};${dly}" data-id="${j.id}">
      <div class="gj-top"><div class="gj-ic" style="background:${ty.color}26">${ty.icon}</div>
        <div class="gj-main"><h3>${esc(j.name)}</h3>
          <div class="gj-meta"><span class="gj-type" style="color:${ty.color}">${esc(jtLabel(j.type))}</span>${badgeHtml(j)}${state.loc?`<span class="gj-dist">📍 ${distText(j)}</span>`:""}</div></div></div>
      <div class="gj-addr">📌 ${esc(j.addr)}, Fort Wayne, IN ${j.zip}</div>
      <p class="gj-desc">${esc(j.desc)}</p>
      ${j.tags?`<div class="gj-tags">${j.tags.map(tg=>`<span>✓ ${esc(tg)}</span>`).join("")}</div>`:""}
      <div class="gj-act">
        ${j.phone?`<a class="gj-b call" href="tel:${j.phoneHref}">${esc(t("card_call"))}</a>`:""}
        ${j.web?`<a class="gj-b" href="${esc(j.web)}" target="_blank">${esc(t("card_apply"))}</a>`:""}
        <a class="gj-b" href="geo:${j.lat},${j.lng}?q=${encodeURIComponent(j.name+", "+j.addr+", Fort Wayne, IN")}">${esc(t("card_directions"))}</a>
        <button class="gj-b" data-jobmap="${j.id}">${esc(t("card_map"))}</button>
        ${settings.tts?`<button class="gj-b" data-tts="${j.id}" aria-label="${esc(t("read_aloud"))}">🔊</button>`:""}
      </div></div>`;
  };
  window.renderJobs=function(){
    const tab=document.getElementById("tab-jobs"), chipsEl=document.getElementById("jobChips"), el=document.getElementById("jobList"); if(!el||!chipsEl) return;
    if(!document.getElementById("jobQ")){ const w=document.createElement("div"); w.className="gj-search";
      w.innerHTML='<input id="jobQ" class="txtin" type="search" placeholder="Search jobs (warehouse, temp, resume…)" autocomplete="off">';
      chipsEl.parentNode.insertBefore(w,chipsEl); w.firstChild.oninput=e=>{ jq=e.target.value.trim().toLowerCase(); renderJobs(); }; }
    chipsEl.innerHTML=`<button class="chip${state.jtype==="all"?" on":""}" data-jt="all">${esc(t("jt_all"))}</button>`+
      Object.entries(JTYPES).map(([k,ty])=>`<button class="chip${state.jtype===k?" on":""}" data-jt="${k}">${ty.icon} ${esc(jtLabel(k))}</button>`).join("");
    chipsEl.querySelectorAll(".chip").forEach(ch=>ch.onclick=()=>{ state.jtype=ch.dataset.jt; renderJobs(); });
    const isOpen=j=>{ try{ return openStatus(j).state==="open"; }catch(e){ return false; } };
    const list=JOBS.filter(j=>(state.jtype==="all"||j.type===state.jtype)&&(!jq||(j.name+" "+j.addr+" "+j.desc+" "+(j.tags||[]).join(" ")+" "+jtLabel(j.type)).toLowerCase().includes(jq)));
    list.sort((a,b)=>(isOpen(b)-isOpen(a))||(state.loc?miles(state.loc[0],state.loc[1],a.lat,a.lng)-miles(state.loc[0],state.loc[1],b.lat,b.lng):a.name.localeCompare(b.name)));
    const n=list.filter(isOpen).length;
    el.innerHTML=list.length?`<div class="gj-sum">${n?`🟢 ${n} open right now`:"⏰ Nothing open right now — call ahead or check hours"}${state.loc?" · nearest first":""}</div>`+list.map((j,i)=>jobCardHtml(j,i)).join("")
      :`<div class="gg-empty">😕 No jobs match.<br>Try “temp”, “warehouse” or clear the search.</div>`;
    try{ el.classList.toggle("typing", document.activeElement===document.getElementById("jobQ")); }catch(e){}
    el.querySelectorAll("[data-jobmap]").forEach(b=>b.onclick=e=>{ e.stopPropagation(); showJobOnMap(b.dataset.jobmap); });
    el.querySelectorAll("[data-tts]").forEach(b=>b.onclick=e=>{ e.stopPropagation(); sayPlaceText(b.dataset.tts); });
    el.querySelectorAll(".gj-desc").forEach(d=>d.onclick=()=>d.classList.toggle("open"));
  };
})();


/* === gm-theme.js === */
/* Directions: open Google Maps with the place's name + address so its info card shows (not just a bare pin) */
document.addEventListener("click", function(e){
  const a = e.target.closest && e.target.closest('a[href^="geo:"]'); if(!a) return;
  const h = a.getAttribute("href"), m = h.match(/^geo:([-\d.]+),([-\d.]+)(?:\?q=(.*))?$/); if(!m) return;
  let q = ""; try { q = decodeURIComponent(m[3] || ""); } catch(x) {}
  if (/^[-\d.]+,[-\d.]+/.test(q)) q = "";                       // bare coordinates -> use the lat/lng below
  const dest = encodeURIComponent(q || (m[1] + "," + m[2]));
  a.setAttribute("href", "https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + dest);
  a.setAttribute("target", "_blank");
}, true);


/* === gm-size.js === */
/* Settings → Text size + Pin size sliders (shown right under Appearance) */
"use strict";
(function () {
  const STEP = 5;
  const CFG = { textScale: [70, 300], pinScale: [50, 400] };
  const es = () => typeof settings !== "undefined" && settings.lang === "es";
  const L = (en, s) => (es() ? s : en);
  const root = document.documentElement;
  const pct = k => Math.round((parseFloat(settings[k]) || 1) * 100);

  function apply() {
    root.style.setProperty("--ts", String(settings.textScale || 1));
    root.style.setProperty("--ps", String(settings.pinScale || 1));
  }
  window.hvApplySizes = apply;
  apply();

  /* rebuild every pin so its box + anchor match the new size (CSS handles the look) */
  function rebuildPins() {
    try {
      if (typeof clusters !== "undefined" && clusters && typeof state !== "undefined" && state.markers) {
        Object.keys(state.markers).forEach(id => { try { clusters.removeLayer(state.markers[id]); } catch (e) {} });
        state.markers = {};
        window.__gmJit = 0;
        if (typeof refreshMarkers === "function") refreshMarkers();
      }
      if (typeof progMarkers !== "undefined" && clusters) {
        Object.keys(progMarkers).forEach(id => { try { clusters.removeLayer(progMarkers[id]); } catch (e) {} delete progMarkers[id]; });
        if (typeof refreshProgMarkers === "function") refreshProgMarkers();
      }
      if (typeof state !== "undefined" && state.selId && state.markers[state.selId]) { const id = state.selId; state.selId = null; if (typeof selectMarker === "function") selectMarker(id); }
      if (typeof map !== "undefined" && map && map.invalidateSize) map.invalidateSize();
      if (typeof hvDeclutterNames === "function") setTimeout(hvDeclutterNames, 100);
    } catch (e) {}
  }
  function afterTextChange() {
    setTimeout(() => { try { if (typeof map !== "undefined" && map && map.invalidateSize) { map.invalidateSize(); if (typeof hvDeclutterNames === "function") hvDeclutterNames(); } } catch (e) {} }, 120);
  }

  function rowHtml(id, icon, title, sub, key, extra) {
    const [mn, mx] = CFG[key];
    return `<div class="setrow col szrow" id="${id}" data-key="${key}">
      <div class="shead"><div class="sic">${icon}</div><div class="sbody"><h3>${title}</h3><p>${sub}</p></div><span class="sz-val" aria-live="polite">100%</span></div>
      <div class="sz-ctl">
        <button class="sz-step" data-d="-1" aria-label="${L("Smaller", "Más pequeño")}">−</button>
        <input class="sz" type="range" min="${mn}" max="${mx}" step="${STEP}" aria-label="${title}">
        <button class="sz-step" data-d="1" aria-label="${L("Bigger", "Más grande")}">+</button>
      </div>
      <div class="sz-ends"><span class="s">A</span><button class="sz-reset">${L("Reset to 100%", "Restablecer 100%")}</button><span class="b">A</span></div>
      ${extra}
    </div>`;
  }

  function wire(row) {
    const key = row.dataset.key, [mn, mx] = CFG[key];
    const rng = row.querySelector("input.sz"), val = row.querySelector(".sz-val"), reset = row.querySelector(".sz-reset");
    const prev = row.querySelector(".sz-prev"), pinp = row.querySelectorAll(".szp");
    let timer = null;
    const show = v => {
      rng.value = v; val.textContent = v + "%"; reset.disabled = v === 100;
      rng.style.setProperty("--fill", ((v - mn) / (mx - mn) * 100) + "%");
      if (prev) prev.style.fontSize = (16 * v / 100) + "px";               // live preview (page itself updates on release)
      pinp.forEach(p => { const base = +p.dataset.px, k = Math.round(base * v / 100); p.style.width = p.style.height = k + "px"; p.style.fontSize = Math.round(base * .55 * v / 100) + "px"; });
    };
    const commit = v => {
      settings[key] = v / 100; saveSettings(); apply();
      if (key === "pinScale") rebuildPins(); else afterTextChange();
    };
    show(pct(key));
    rng.addEventListener("input", () => show(+rng.value));
    rng.addEventListener("change", () => commit(+rng.value));
    row.querySelectorAll(".sz-step").forEach(b => b.addEventListener("click", () => {
      const v = Math.max(mn, Math.min(mx, +rng.value + (+b.dataset.d) * STEP)); show(v);
      clearTimeout(timer); timer = setTimeout(() => commit(v), 450);
    }));
    reset.addEventListener("click", () => { clearTimeout(timer); show(100); commit(100); });
  }

  if (typeof renderSettings === "function") {
    const base = renderSettings;
    renderSettings = function () {
      base();
      const el = document.getElementById("settingsList"); if (!el || el.querySelector("#szTextRow")) return;
      const text = rowHtml("szTextRow", "🔠", L("Text size", "Tamaño del texto"),
        L("Make all the text in the app smaller or much bigger.", "Haz todo el texto de la app más pequeño o mucho más grande."), "textScale",
        `<div class="sz-prev"><b>${L("Fort Wayne Community Meals", "Comidas comunitarias de Fort Wayne")}</b><span>${L("Open today 9:00 AM – 5:00 PM · Free", "Abierto hoy 9:00 – 17:00 · Gratis")}</span></div>`);
      const pins = rowHtml("szPinRow", "📍", L("Pin size", "Tamaño de los pines"),
        L("Make the map pins and their names smaller or much bigger.", "Haz los pines del mapa y sus nombres más pequeños o mucho más grandes."), "pinScale",
        `<div class="sz-pinbox"><div class="szp" data-px="38">🍲</div><div class="szp b" data-px="38">🏠</div><small>${L("Preview. The map updates when you let go.", "Vista previa. El mapa se actualiza al soltar.")}</small></div>`);
      const anchor = el.querySelector("#themeRow");
      if (anchor) anchor.insertAdjacentHTML("afterend", text + pins); else el.insertAdjacentHTML("afterbegin", text + pins);
      wire(el.querySelector("#szTextRow")); wire(el.querySelector("#szPinRow"));
    };
  }
})();


/* === guide-add-ui.js === */
/* Haven FW: "More numbers to call" list under the hotlines on the Info tab. */
"use strict";
(function () {
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fill() {
    var el = document.getElementById("phonelines");
    var list = window.HAVEN_PHONELINES;
    if (!el || !list || !list.length) return;
    el.innerHTML = '<div class="secHead" style="padding:14px 2px 8px"><h2 style="font-size:calc(18px*var(--ts,1))">More numbers to call</h2>' +
      '<p>From the Rescue Mission resource guide. Hours and eligibility change, so call first.</p></div>' +
      list.map(function (h) {
        var ext = /^https?:/.test(h.href) ? ' target="_blank" rel="noopener"' : "";
        return '<a class="hcard" href="' + esc(h.href) + '"' + ext + '><div class="ic">' + h.icon + '</div>' +
          '<div><h3>' + esc(h.name) + '</h3><p>' + esc(h.desc) + '</p></div><div class="go">›</div></a>';
      }).join("");
  }
  if (typeof renderInfo === "function") {
    var orig = renderInfo;
    renderInfo = function () { var r = orig.apply(this, arguments); fill(); return r; };
  }
  fill();
})();


/* === haven-safety.js === */
/* Haven safety + polish: chat block/report, accessibility labels, data-freshness note. */
(function () {
  var KEY = "haven_chat_blocked";
  function blocked() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function block(id) { var b = blocked(); if (id && b.indexOf(id) < 0) { b.push(id); try { localStorage.setItem(KEY, JSON.stringify(b)); } catch (e) {} } }
  function es() { return typeof settings !== "undefined" && settings.lang === "es"; }
  function say(en, sp) { return es() ? sp : en; }

  var _bind = window.chatMsgBindLongPress;
  if (typeof _bind === "function") window.chatMsgBindLongPress = function (div, m, mine, p) {
    if (!mine && m && m.device_id && blocked().indexOf(m.device_id) >= 0) div.style.display = "none";
    return _bind.apply(this, arguments);
  };

  var _menu = window.chatMsgMenu;
  if (typeof _menu === "function") window.chatMsgMenu = function (m, mine, p, div) {
    _menu.apply(this, arguments);
    if (mine || !m) return;
    var body = document.getElementById("msgSheetBody"); if (!body) return;
    var cancel = body.querySelector(".cancel");
    function add(label, cls, fn) {
      var b = document.createElement("button"); b.className = "mbtn " + cls; b.textContent = label; b.addEventListener("click", fn);
      body.insertBefore(b, cancel || null);
    }
    add("🚫 " + say("Block this user", "Bloquear a este usuario"), "danger", function () {
      block(m.device_id); if (div) div.style.display = "none"; chatMsgHide(); toast(say("User blocked. You won't see their messages.", "Usuario bloqueado."));
    });
    add("⚠️ " + say("Report this message", "Reportar este mensaje"), "danger", async function () {
      var ok = false;
      try {
        var r = await chatApi("chat_reports", { method: "POST", headers: { apikey: CHAT_KEY, Authorization: "Bearer " + CHAT_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
          body: JSON.stringify({ message_id: m.id, reported_device: m.device_id, reporter_device: chat.deviceId, text: (p && p.text) || "" }) });
        ok = r.ok;
      } catch (e) {}
      if (div) div.style.display = "none"; chatMsgHide();
      toast(ok ? say("Reported. Thank you.", "Reportado. Gracias.") : say("Hidden for you. Report couldn't be sent right now.", "Oculto para ti. No se pudo enviar el reporte."));
    });
  };

  function a11y() {
    document.querySelectorAll("nav button[data-tab]").forEach(function (b) {
      var s = b.querySelector("[data-i18n]"); if (s) b.setAttribute("aria-label", s.textContent.trim());
      b.setAttribute("aria-current", b.classList.contains("on") ? "page" : "false");
    });
    document.querySelectorAll("img:not([alt])").forEach(function (i) { i.setAttribute("alt", ""); });
    document.querySelectorAll("input:not([aria-label]),textarea:not([aria-label])").forEach(function (i) { if (i.placeholder) i.setAttribute("aria-label", i.placeholder); });
    document.querySelectorAll("button:not([aria-label])").forEach(function (b) { if (!b.textContent.trim() && b.title) b.setAttribute("aria-label", b.title); });
  }
  function note() {
    var sc = document.querySelector("#tab-info .scroll"); if (!sc || document.getElementById("hvFresh")) return;
    var d = document.createElement("p"); d.id = "hvFresh"; d.className = "tip"; d.style.margin = "12px 0";
    d.textContent = say("Listings last updated Oct 3, 2026. Hours and services change, so call before you go. Tap ⚠️ on a place to report a problem.", "Listados actualizados el 3 de oct. de 2026. Los horarios cambian; llama antes de ir. Toca ⚠️ en un lugar para reportar un problema.");
    sc.appendChild(d);
  }
  function run() { try { a11y(); note(); } catch (e) {} }
  document.addEventListener("click", function () { setTimeout(run, 120); });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run, 800);
})();


/* === haven-donors.js === */
/* Donators: groups that just show up, hand out food/supplies, and leave. Not events.
   Shown behind a Donators button in the Events tab. A map pin is added only when the
   group goes to a place that isn't already pinned. */
(function () {
  var DEALERS = { id: "dealers-to-disciples", name: "Dealers to Disciples", cats: ["meals"],
    addr: "508 E Washington Blvd", zip: "46802", lat: 41.07785, lng: -85.13195,
    desc: "Donators who show up Saturdays around 3pm with free food and water. Next to the gas station near the mission. Times can shift a little.",
    tags: ["donators", "free food", "free water", "Saturday"], hoursText: "Saturdays, around 3pm" };
  if (typeof RESOURCES !== "undefined" && !RESOURCES.some(function (r) { return r.id === DEALERS.id; })) RESOURCES.push(DEALERS);

  function nextKingsman() {
    var anchor = new Date("2026-10-03T12:00:00"), today = new Date(); today.setHours(0, 0, 0, 0);
    var d = new Date(anchor);
    while (d < today) d.setDate(d.getDate() + 14);
    return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }

  var DONORS = [
    { name: "Feeding the Hungry", gives: "Free lunches and reusable water bottles", when: "Saturdays, around 10-11am (try to be there by 10)", where: "Fort Wayne Rescue Mission (404 E Washington Blvd) and Freimann Square (201 E Main St)", pin: "fwrm", at: ["fwrm", "freimann-square"], why: "" },
    { name: "Kingsman", gives: "Free lunches", when: "Every other Saturday, around 11:30am. Next: " + nextKingsman(), where: "Fort Wayne Rescue Mission, 404 E Washington Blvd", pin: "fwrm", at: ["fwrm"], why: "" },
    { name: "Dealers to Disciples", gives: "Free food and water", when: "Saturdays, around 3pm", where: "508 E Washington Blvd (next to the gas station near the mission)", pin: DEALERS.id, at: [DEALERS.id, "fwrm"], why: "" }
  ];

  window.HAVEN_DONORS = DONORS;

  function esc2(x) { return String(x).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function openPin(id) {
    close();
    if (typeof goTab === "function") goTab("map");
    setTimeout(function () {
      try { var r = byId(id); if (r) { map.setView([r.lat, r.lng], 16, { animate: true }); selectMarker(id); showPeek(r); } } catch (e) {}
    }, 200);
  }

  var panel;
  function close() { if (panel) panel.style.display = "none"; }
  function open() {
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "donatorsPanel";
      panel.style.cssText = "position:fixed;left:0;right:0;top:0;bottom:0;z-index:9000;background:var(--bg);color:var(--txt);overflow-y:auto;padding:16px 16px 90px";
      document.body.appendChild(panel);
    }
    panel.innerHTML = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><h2 style="flex:1;font-size:22px">Donators</h2><button class="qbtn" id="donClose">Close</button></div>' +
      '<p style="color:var(--mut);font-size:14px;margin-bottom:12px">Groups that show up, hand out free food and supplies, and leave. Times can shift, so get there a little early.</p>' +
      DONORS.map(function (d, i) {
        return '<div class="card" style="margin-bottom:10px"><h3>' + esc2(d.name) + '</h3>' +
          '<div class="meta" style="margin-top:6px">Gives: ' + esc2(d.gives) + '</div>' +
          '<div class="meta" style="margin-top:4px">When: ' + esc2(d.when) + '</div>' +
          '<div class="addr" style="margin-top:4px">Where: ' + esc2(d.where) + '</div>' +
          (d.why ? '<div class="meta" style="margin-top:4px">Why they give: ' + esc2(d.why) + '</div>' : '') +
          (d.pin ? '<div class="quick"><button class="qbtn primary" data-don="' + i + '">Show on map</button></div>' : '') + '</div>';
      }).join("");
    panel.style.display = "block"; panel.scrollTop = 0;
    panel.querySelector("#donClose").onclick = close;
    panel.querySelectorAll("[data-don]").forEach(function (b) { b.onclick = function () { openPin(DONORS[+b.dataset.don].pin); }; });
  }

  function addButton() {
    var tab = document.getElementById("tab-events");
    if (!tab || document.getElementById("donatorsBtn")) return;
    var b = document.createElement("button");
    b.id = "donatorsBtn"; b.className = "widebtn"; b.style.margin = "4px 16px 8px";
    b.textContent = "Donators: free food & supplies groups";
    b.onclick = open;
    var head = tab.querySelector(".secHead");
    if (head && head.nextSibling) tab.insertBefore(b, head.nextSibling); else tab.appendChild(b);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addButton); else addButton();
})();


/* === haven-parks.js === */
/* More Fort Wayne city parks for the Parks & Hangouts category.
   Pins were placed from street addresses and nearby known spots, so they can be a little off. */
(function () {
  var H = { 0: [360, 1380], 1: [360, 1380], 2: [360, 1380], 3: [360, 1380], 4: [360, 1380], 5: [360, 1380], 6: [360, 1380] };
  var P = [
    { id: "nuckols-memorial-park", name: "Nuckols Memorial Park", addr: "901 E Jefferson Blvd", zip: "46802", lat: 41.0762, lng: -85.1255,
      desc: "Small downtown-east park at Jefferson Blvd, Harmar St and Maumee Ave, with a memorial to John Nuckols, Fort Wayne's first Black city councilman. Open 6 AM-11 PM daily.",
      tags: ["park", "downtown", "donators"] },
    { id: "memorial-park", name: "Memorial Park", addr: "2301 Maumee Ave", zip: "46803", lat: 41.07692, lng: -85.10748,
      desc: "Big east-side park with a pool, splash pad, pavilion, playground, ball diamond and basketball courts, plus a memorial wall. Open 6 AM-11 PM daily.",
      tags: ["park", "splash pad", "pavilion", "playground"] },
    { id: "meyers-park", name: "Robert E. Meyers Park", addr: "Jefferson Blvd (next to Parkview Field)", zip: "46802", lat: 41.07345, lng: -85.14366,
      desc: "Small downtown park beside Parkview Field with an amphitheater and a splash pad. Open 6 AM-11 PM daily.",
      tags: ["park", "downtown", "splash pad"] },
    { id: "rockhill-park", name: "Rockhill Park", addr: "1400 Catalpa St", zip: "46802", lat: 41.073, lng: -85.17666,
      desc: "West-side park with a ball diamond, basketball court, playground, pavilion and a Rivergreenway connection. Open 6 AM-11 PM daily.",
      tags: ["park", "pavilion", "playground", "trail"] },
    { id: "mccormick-park", name: "McCormick Park", addr: "3530 Harvester St", zip: "46803", lat: 41.0642, lng: -85.0908,
      desc: "Southeast park with a pavilion, playground, basketball court, splash pad, restrooms and picnic tables. Open 6 AM-11 PM daily.",
      tags: ["park", "restrooms", "splash pad", "pavilion"] },
    { id: "lions-park", name: "Lions Park", addr: "3257 Carew St", zip: "46805", lat: 41.1065, lng: -85.1086,
      desc: "North-side park with a pavilion, playground, ball diamond, basketball and tennis courts, and four pickleball courts. Open 6 AM-11 PM daily.",
      tags: ["park", "pavilion", "playground", "restrooms"] },
    { id: "weisser-park", name: "Weisser Park", addr: "3000 S Hanna St", zip: "46806", lat: 41.05747, lng: -85.12827,
      desc: "Neighborhood park with a rec center, pavilion, playground, ball diamond, basketball and tennis courts. Open 6 AM-11 PM daily.",
      tags: ["park", "pavilion", "playground", "restrooms"] },
    { id: "courthouse-green", name: "Courthouse Green", addr: "Calhoun St & Berry St", zip: "46802", lat: 41.0792, lng: -85.1386,
      desc: "Downtown lawn with fountains and benches next to the Allen County Courthouse. A handy place to sit downtown. Open 6 AM-11 PM daily.",
      tags: ["park", "downtown", "benches"] },
    { id: "japanese-friendship-garden", name: "Japanese Friendship Garden", addr: "E Main St (between Arts United Center and the Museum of Art)", zip: "46802", lat: 41.0813, lng: -85.1366,
      desc: "Tiny quiet garden downtown, a gift from Fort Wayne's sister city Takaoka, Japan. Open 6 AM-11 PM daily.",
      tags: ["park", "downtown", "garden"] }
    ,{ id: "hanna-homestead-park", name: "Hanna Homestead Park", addr: "1000 E Lewis St (Lewis St & Gay St)", zip: "46803", lat: 41.0700, lng: -85.1235,
      desc: "Southeast-of-downtown park with a walking path, open-air shelter with restrooms, basketball court, ball diamond and playground. Open 6 AM-11 PM daily. Pin placed from the address, so it may be a little off.",
      tags: ["park", "restrooms", "pavilion", "playground"] }
  ];
  if (typeof RESOURCES === "undefined") return;
  var have = {}; RESOURCES.forEach(function (r) { have[r.id] = 1; have[(r.name || "").toLowerCase()] = 1; });
  P.forEach(function (p) {
    if (have[p.id] || have[p.name.toLowerCase()]) return;
    p.cats = ["hangout"]; p.hours = H; p.hoursText = "6 AM-11 PM daily";
    RESOURCES.push(p);
  });
})();


/* === haven-volunteer-data.js === */
/* Haven - Volunteer tab data. Added 2026-10-08.
   Each entry becomes (a) a card on the Volunteer tab and (b) a map pin (when it has lat/lng).
   v: "ok" = details came from an official page or a news story; "call" = details come from a
   directory listing or are a best guess -- call first. Hours change; always call ahead. */
"use strict";
window.HAVEN_VOL_GROUPS = [["all", "All"], ["meals", "Meals & pantries"], ["animals", "Animals"], ["build", "Build & repair"], ["kids", "Kids & mentoring"], ["people", "People & outreach"], ["hub", "Sign-up hubs"], ["earn", "Work for a meal / earn"], ["court", "Court & school hours"]];
window.HAVEN_VOL = [
 {
  "id": "vol-volunteer-center",
  "g": "hub",
  "cat": "volunteer",
  "name": "Volunteer Center (Volunteer Fort Wayne)",
  "addr": "3401 Lake Ave",
  "zip": "46805",
  "lat": 41.0907,
  "lng": -85.09484,
  "phone": "(260) 424-3505",
  "phoneHref": "+12604243505",
  "web": "https://www.volunteerfortwayne.org",
  "how": "Browse 140+ local nonprofits on their website and match by interest or zip code, or call them and they'll point you to a place. Also runs Coats for Kids, free tax help (VITA) and expungement help.",
  "times": "Sign up online any time. Call the office to talk to a person.",
  "perk": "Free volunteer insurance, training and recognition (55+ program). Letters for volunteer hours on request - ask.",
  "v": "ok",
  "tags": [
   "sign-up hub",
   "140+ agencies",
   "55+ program",
   "all ages"
  ]
 },
 {
  "id": "vol-allen-county-parks",
  "g": "hub",
  "cat": "volunteer",
  "name": "Allen County Parks (volunteer application)",
  "addr": "7324 Yohne Rd",
  "zip": "46809",
  "phone": "",
  "phoneHref": "",
  "web": "https://allencountyparks.org/volunteer-in-the-allen-county-parks/",
  "how": "Fill out the volunteer application on the Allen County Parks website, then email it to programs@allencountyparks.org or mail it to Volunteer Department, 7324 Yohne Rd, Fort Wayne IN 46809.",
  "times": "Varies by park and season.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "parks",
   "outdoors",
   "application"
  ]
 },
 {
  "id": "vol-community-harvest",
  "g": "meals",
  "cat": "volunteer",
  "name": "Community Harvest Food Bank",
  "addr": "999 E Tillman Rd",
  "zip": "46816",
  "lat": 41.018378,
  "lng": -85.122476,
  "phone": "(260) 447-3696",
  "phoneHref": "+12604473696",
  "web": "http://www.communityharvest.org/",
  "how": "Sign up online at communityharvest.org/volunteer, or walk in Saturday morning right at 7:30 AM (a county list says 14 and older). Jobs: stocking shelves, packing, decorating donation bags.",
  "times": "Saturdays 7:30 - 11:30 AM walk-in. Weekdays by sign-up (building open Mon-Fri 8:30 AM - 5 PM).",
  "perk": "Not confirmed - ask the volunteer coordinator about take-home food. Accepts court-ordered and school hours.",
  "v": "ok",
  "court": true,
  "tags": [
   "food bank",
   "Saturday walk-in",
   "court hours ok",
   "age 14+"
  ]
 },
 {
  "id": "vol-salvation-army-pantry",
  "g": "meals",
  "cat": "volunteer",
  "name": "Salvation Army of Allen County Food Pantry",
  "addr": "2901 N Clinton St",
  "zip": "46805",
  "lat": 41.10229,
  "lng": -85.138996,
  "phone": "(260) 744-2311",
  "phoneHref": "+12607442311",
  "web": "https://www.salvationarmyusa.org/in/fort-wayne/n-clinton-street-corps/volunteer-new-volunteer/",
  "how": "Call or email Jennifer Prichard (Community Engagement): 260-744-2311 ext 205, Jennifer.Prichard@usc.salvationarmy.org. Bell-ringing spots are claimed on their website.",
  "times": "Food pantry help: Mon, Tue and Thu 10 AM - 1 PM all year. October: Christmas assistance intake. Nov-Dec: bell ringing. December: gift handout. August: school-supply backpacks.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "pantry",
   "holiday help",
   "Christmas"
  ]
 },
 {
  "id": "vol-fwrm",
  "g": "meals",
  "cat": "volunteer",
  "name": "Fort Wayne Rescue Mission",
  "addr": "404 E Washington Blvd",
  "zip": "46802",
  "lat": 41.077903,
  "lng": -85.133545,
  "phone": "(260) 426-7357",
  "phoneHref": "+12604267357",
  "web": "https://fwrm.org",
  "how": "Volunteers prep and serve meals in the kitchen (some shifts start around 6 AM) and help on big holiday meal days (Thanksgiving, Christmas Eve, Easter). Call (260) 426-7357 to ask for the volunteer contact.",
  "times": "Three meals a day, every day - call for open shifts.",
  "perk": "Not confirmed for volunteers - ask.",
  "v": "ok",
  "tags": [
   "hot meals",
   "kitchen",
   "holidays",
   "groups welcome"
  ]
 },
 {
  "id": "vol-st-marys",
  "g": "meals",
  "cat": "volunteer",
  "name": "St. Mary's Soup Kitchen",
  "addr": "1101 Lafayette St",
  "zip": "46802",
  "lat": 41.076725,
  "lng": -85.1334,
  "phone": "(260) 426-1217",
  "phoneHref": "+12604261217",
  "web": "https://stmarysfw.org",
  "how": "Sign up to volunteer on the St. Mary's Soup Kitchen website (stmarysfw.org) or call (260) 426-1217.",
  "times": "They serve meals 7 days a week, all year - call for shift times.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "soup kitchen",
   "7 days a week"
  ]
 },
 {
  "id": "vol-miss-virginia",
  "g": "meals",
  "cat": "volunteer",
  "name": "Miss Virginia's Food Pantry",
  "addr": "1312 S Hanna St",
  "zip": "46802",
  "lat": 41.073972,
  "lng": -85.129059,
  "phone": "(260) 426-0176",
  "phoneHref": "+12604260176",
  "web": "https://www.missvirginiafoodpantry.com",
  "how": "Partner of St. Mary's Soup Kitchen. Gifts of time and food are welcome - call (260) 426-0176 or stop by during pantry hours.",
  "times": "Groceries handed out Tue and Wed 10 AM - 1 PM.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "pantry",
   "Tue/Wed"
  ]
 },
 {
  "id": "vol-st-andrews-soup",
  "g": "meals",
  "cat": "volunteer",
  "name": "St. Andrew's Soup Kitchen",
  "addr": "2714 New Haven Ave",
  "zip": "46803",
  "lat": 41.068628,
  "lng": -85.102696,
  "phone": "(260) 423-6326",
  "phoneHref": "+12604236326",
  "web": "",
  "how": "Call (260) 423-6326 and ask how to help serve.",
  "times": "Meal service Mon, Wed, Fri 11 AM - 1 PM (call to confirm days).",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "soup kitchen"
  ]
 },
 {
  "id": "vol-turner-chapel",
  "g": "meals",
  "cat": "volunteer",
  "name": "Turner Chapel Food Pantry",
  "addr": "836 E Jefferson Blvd",
  "zip": "46803",
  "lat": 41.07782,
  "lng": -85.12628,
  "phone": "(260) 426-3121",
  "phoneHref": "+12604263121",
  "web": "http://turnerchapelftwayne.org/",
  "how": "Call (260) 426-3121 and ask how to help with the pantry or the hot dinner.",
  "times": "Pantry 1st, 3rd and 5th Friday 9-11 AM. Hot meal 2nd and 4th Friday 5:30-7 PM.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "pantry",
   "hot dinner",
   "Fridays"
  ]
 },
 {
  "id": "vol-franciscan-food",
  "g": "meals",
  "cat": "volunteer",
  "name": "The Franciscan Center \u2014 Food Distribution",
  "addr": "4643 Gaywood Dr",
  "zip": "46806",
  "lat": 41.041717,
  "lng": -85.122264,
  "phone": "(260) 744-3977",
  "phoneHref": "+12607443977",
  "web": "https://www.thefranciscancenter.org",
  "how": "Call (260) 744-3977 and schedule volunteer hours ahead of time (a county list notes you must call first).",
  "times": "Food distribution Tue and Thu 9-11 AM, Sat 8-10 AM. Volunteer times by appointment.",
  "perk": "Not confirmed - ask. Listed as accepting court-ordered hours.",
  "v": "call",
  "court": true,
  "tags": [
   "food distribution",
   "call ahead",
   "court hours ok"
  ]
 },
 {
  "id": "vol-associated-churches",
  "g": "meals",
  "cat": "volunteer",
  "name": "Associated Churches Food Bank",
  "addr": "602 E Wayne St",
  "zip": "46802",
  "lat": 41.079581,
  "lng": -85.130775,
  "phone": "(260) 422-3528",
  "phoneHref": "+12604223528",
  "web": "https://www.associatedchurches.org/",
  "how": "Call (260) 422-3528 and ask for volunteer shifts. They also run the Stuff-a-Bus food drive each fall.",
  "times": "Pantry open weekdays about 8 AM - 3 PM - call for shifts.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "food bank",
   "food drive"
  ]
 },
 {
  "id": "vol-homebound-meals",
  "g": "meals",
  "cat": "volunteer",
  "name": "Homebound Meals Inc.",
  "addr": "611 W Berry St",
  "zip": "46802",
  "lat": 41.077983,
  "lng": -85.148042,
  "phone": "(260) 422-3296",
  "phoneHref": "+12604223296",
  "web": "http://www.homeboundmealsfw.org/",
  "how": "Drive a route and hand-deliver hot lunches to homebound neighbors. Call (260) 422-3296 to sign up. 140+ volunteers do this.",
  "times": "Meals go out at noon, Mon-Fri. Call for route times.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "meal delivery",
   "driver",
   "weekdays"
  ]
 },
 {
  "id": "vol-hopes-harbor",
  "g": "meals",
  "cat": "volunteer",
  "name": "Hope's Harbor Family Hospitality Home",
  "addr": "7922 W Jefferson Blvd",
  "zip": "46804",
  "lat": 41.040845,
  "lng": -85.24892,
  "phone": "(260) 459-8550",
  "phoneHref": "+12604598550",
  "web": "https://www.hopesharborfw.org/",
  "how": "Volunteers cook home-style meals for families staying near the hospital. Call (260) 459-8550 and ask how to sign up a meal.",
  "times": "Meals are scheduled with the house - call.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "cook a meal",
   "families",
   "groups"
  ]
 },
 {
  "id": "vol-glass-park-fridge",
  "g": "meals",
  "cat": "volunteer",
  "name": "Forward Indiana Community Fridge - Glass Park",
  "addr": "4235 Fairfield Ave",
  "zip": "46807",
  "lat": 41.04549,
  "lng": -85.14418,
  "phone": "",
  "phoneHref": "",
  "web": "https://forwardindiana.wixsite.com/forward",
  "how": "Keep the free community fridge stocked: drop off unopened, unexpired food. Run by neighbors and Forward Indiana volunteers.",
  "times": "Open 24/7 - drop food any time.",
  "perk": "Not confirmed - it is free food for anyone who needs it.",
  "v": "ok",
  "tags": [
   "community fridge",
   "24/7",
   "drop-off"
  ]
 },
 {
  "id": "vol-food-not-bombs",
  "g": "meals",
  "cat": "volunteer",
  "name": "Food Not Bombs Fort Wayne",
  "addr": "200 E Main St",
  "zip": "46802",
  "lat": 41.081249,
  "lng": -85.137378,
  "phone": "",
  "phoneHref": "",
  "web": "https://ko-fi.com/foodnotbombsfortwayne",
  "how": "Volunteer-run meal group, going 15 years. Show up at the Sunday meal and ask how to help; no sign-up form.",
  "times": "Sundays 2:00 - 3:00 PM at Freimann Square (downtown).",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "free meal",
   "Sundays",
   "no sign-up"
  ]
 },
 {
  "id": "vol-blessed-portion",
  "g": "meals",
  "cat": "volunteer",
  "name": "Blessed Portion Ministries",
  "addr": "Wayne St & Fulton St",
  "zip": "46802",
  "lat": 41.07719,
  "lng": -85.14691,
  "phone": "",
  "phoneHref": "",
  "web": "https://www.theblessedportionministries.org/",
  "how": "Volunteer-run street ministry. Check their website's Friday update, or find the team downtown near Wayne and Fulton, and ask how to help.",
  "times": "Friday evenings, usually about 7 PM.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "street outreach",
   "Fridays"
  ]
 },
 {
  "id": "vol-out-of-a-jam",
  "g": "meals",
  "cat": "volunteer",
  "name": "Out of a Jam \u2014 Feeding Fort Wayne",
  "addr": "2310 Weisser Park Ave",
  "zip": "46803",
  "lat": 41.064186,
  "lng": -85.127195,
  "phone": "(260) 376-4847",
  "phoneHref": "+12603764847",
  "web": "https://www.outofajamfw.org/",
  "how": "Call (260) 376-4847 and ask about kitchen help.",
  "times": "Kitchen Mon-Thu 10 AM - 2 PM (back entrance on Hannah St).",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "kitchen",
   "Mon-Thu"
  ]
 },
 {
  "id": "vol-human-ag-coop",
  "g": "meals",
  "cat": "volunteer",
  "name": "Human Agricultural Cooperative",
  "addr": "1010 N Coliseum Blvd",
  "zip": "46805",
  "phone": "",
  "phoneHref": "",
  "web": "",
  "how": "Volunteers unload and sort food for a weekly free food giveaway (about 1,400 boxes). Email humanagriculturalcoop@gmail.com to confirm this week's day.",
  "times": "Unloading about 7:30 - 10 AM at 1010 N Coliseum Blvd, then curbside handout from 11 AM.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "food giveaway",
   "email first"
  ]
 },
 {
  "id": "vol-humane-fw",
  "g": "animals",
  "cat": "volunteer",
  "name": "Humane Fort Wayne",
  "addr": "1333 Maycrest Dr",
  "zip": "46805",
  "lat": 41.089301,
  "lng": -85.100314,
  "phone": "(260) 744-0454",
  "phoneHref": "+12607440454",
  "web": "https://humanefw.org/volunteer",
  "how": "Sign up for a shift on humanefw.org/volunteer. The Pet Food Pantry needs no long-term commitment. Dog Tails on Trails: take a short orientation, then check out a dog for a pup cup or a whole day.",
  "times": "Shifts available every day (clinic-side shifts Mon-Fri). Pet-food-pantry shifts are posted online.",
  "perk": "A dog buddy for the day (Tails on Trails). Form for school or community-service hours.",
  "v": "ok",
  "court": true,
  "tags": [
   "dogs",
   "cats",
   "pet food pantry",
   "court/school hours",
   "no commitment"
  ]
 },
 {
  "id": "vol-fwacc",
  "g": "animals",
  "cat": "volunteer",
  "name": "Fort Wayne Animal Care & Control",
  "addr": "3020 Hillegas Rd",
  "zip": "46808",
  "lat": 41.102473,
  "lng": -85.191124,
  "phone": "(260) 427-5502",
  "phoneHref": "+12604275502",
  "web": "https://www.cityoffortwayne.in.gov/163/Adoptions",
  "how": "Call (260) 427-5502 and ask about volunteer or dog-walking help.",
  "times": "Adoption lobby Tue/Thu/Fri 12-5:30, Wed 12-6, 1st and 3rd Sat 9-12. Call for volunteer times.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "animal control",
   "dogs"
  ]
 },
 {
  "id": "vol-neighborlink",
  "g": "build",
  "cat": "volunteer",
  "name": "NeighborLink Fort Wayne",
  "addr": "2826 S Calhoun St",
  "zip": "46807",
  "lat": 41.059356,
  "lng": -85.137878,
  "phone": "(260) 209-0074",
  "phoneHref": "+12602090074",
  "web": "http://www.neighborlinkfortwayne.org/",
  "how": "Sign up on their website to help neighbors with yard work, small repairs and ramps, for an hour or a day, in any Fort Wayne zip code. Phone: (260) 209-0074.",
  "times": "Projects are posted online - pick one that fits your schedule.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "yard work",
   "repairs",
   "any zip",
   "one-day jobs"
  ]
 },
 {
  "id": "vol-svdp-carpenters",
  "g": "build",
  "cat": "volunteer",
  "name": "SVdP Carpenter's Sons (Free Home Repairs)",
  "addr": "1600 S Calhoun St",
  "zip": "46802",
  "lat": 41.071022,
  "lng": -85.138464,
  "phone": "(260) 456-3561",
  "phoneHref": "+12604563561",
  "web": "https://svdpfortwayne.org/carpenter/",
  "how": "Skilled volunteers (and helpers) build ramps, rails and porches for low-income homeowners. Call (260) 456-3561 to join a crew.",
  "times": "Volunteer crews work Tuesday mornings.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "carpentry",
   "ramps",
   "Tuesdays"
  ]
 },
 {
  "id": "vol-habitat-restore",
  "g": "build",
  "cat": "volunteer",
  "name": "Habitat for Humanity ReStore \u2014 Greater Fort Wayne",
  "addr": "4747 Lima Rd",
  "zip": "46808",
  "lat": 41.121307,
  "lng": -85.153079,
  "phone": "(260) 470-4200",
  "phoneHref": "+12604704200",
  "web": "https://habitatgfw.com/restore",
  "how": "Call (260) 470-4200 and ask about store help, donation pickup crews and build days.",
  "times": "Store open Mon-Sat 10 AM - 5 PM. Call for volunteer shifts.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "ReStore",
   "building",
   "donation pickup"
  ]
 },
 {
  "id": "vol-svdp-thrift",
  "g": "build",
  "cat": "volunteer",
  "name": "St. Vincent de Paul Thrift Store",
  "addr": "1600 S Calhoun St",
  "zip": "46802",
  "lat": 41.071182,
  "lng": -85.138564,
  "phone": "(260) 456-3561",
  "phoneHref": "+12604563561",
  "web": "https://svdpfortwayne.org/thrift-store/",
  "how": "St. Vincent de Paul is volunteer-driven: call (260) 456-3561 to ask about store or warehouse help.",
  "times": "Store open Mon-Sat about 9:30 AM - 5:30 PM. Call for volunteer shifts.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "thrift",
   "vouchers"
  ]
 },
 {
  "id": "vol-mustard-seed",
  "g": "build",
  "cat": "volunteer",
  "name": "Mustard Seed Furniture Bank of Fort Wayne",
  "addr": "3636 Illinois Rd",
  "zip": "46804",
  "lat": 41.075168,
  "lng": -85.188679,
  "phone": "(260) 471-5802",
  "phoneHref": "+12604715802",
  "web": "https://mustardseedfortwayne.com/",
  "how": "Furniture bank: call (260) 471-5802 and ask about lifting, sorting and delivery help.",
  "times": "Open Mon-Fri 10 AM - 4 PM.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "furniture",
   "lifting"
  ]
 },
 {
  "id": "vol-bgc",
  "g": "kids",
  "cat": "volunteer",
  "name": "Boys & Girls Clubs of Fort Wayne",
  "addr": "2609 Fairfield Ave",
  "zip": "46807",
  "lat": 41.061079,
  "lng": -85.144392,
  "phone": "(260) 744-0998",
  "phoneHref": "+12607440998",
  "web": "https://www.bgcfw.org/",
  "how": "Call (260) 744-0998 and ask about volunteering with kids. Listed as accepting court-ordered hours.",
  "times": "Open after school, Mon-Fri about 2:30 - 7:30 PM.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "court": true,
  "tags": [
   "kids",
   "after school",
   "court hours ok"
  ]
 },
 {
  "id": "vol-bbbs",
  "g": "kids",
  "cat": "volunteer",
  "name": "Big Brothers Big Sisters of Northeast Indiana",
  "addr": "1005 W Rudisill Blvd, Suite 101",
  "zip": "46807",
  "lat": 41.049731,
  "lng": -85.150757,
  "phone": "(260) 456-1600",
  "phoneHref": "+12604561600",
  "web": "https://bbbsnei.org/",
  "how": "Apply to become a Big: a few hours a month with a kid ages 6-18. Call (260) 456-1600.",
  "times": "Office Mon-Fri; matches meet a few hours a month.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "mentor",
   "ages 6-18"
  ]
 },
 {
  "id": "vol-casa",
  "g": "kids",
  "cat": "volunteer",
  "name": "Allen County CASA Program",
  "addr": "1 E Main St, Suite 421",
  "zip": "46802",
  "lat": 41.08165,
  "lng": -85.1391,
  "phone": "(260) 449-7190",
  "phoneHref": "+12604497190",
  "web": "http://www.allencountycasa.org/",
  "how": "Trained volunteer advocates speak up for abused and neglected kids in court. Call (260) 449-7190 to learn about the training.",
  "times": "Training first, then by court appointment.",
  "perk": "Training provided.",
  "v": "call",
  "tags": [
   "court advocate",
   "training"
  ]
 },
 {
  "id": "vol-project-reads",
  "g": "kids",
  "cat": "volunteer",
  "name": "Project Reads \u2014 Free Youth Reading Tutoring",
  "addr": "1005 W Rudisill Blvd",
  "zip": "46807",
  "lat": 41.049586,
  "lng": -85.151163,
  "phone": "(260) 423-6447",
  "phoneHref": "+12604236447",
  "web": "http://www.literacyalliance.org/",
  "how": "Volunteer tutors help kids and adults build reading skills. Call (260) 423-6447.",
  "times": "Office Mon-Fri; tutoring times vary.",
  "perk": "Training provided - ask.",
  "v": "call",
  "tags": [
   "tutor",
   "reading"
  ]
 },
 {
  "id": "vol-study-connection",
  "g": "kids",
  "cat": "volunteer",
  "name": "FWCS Study Connection",
  "addr": "230 E Douglas Ave",
  "zip": "46802",
  "lat": 41.07415,
  "lng": -85.13562,
  "phone": "(260) 467-8810",
  "phoneHref": "+12604678810",
  "web": "https://www.fortwayneschools.org/families/face",
  "how": "One hour a week after school during the school year, helping an elementary student with homework. Sign up through the FWCS FACE Center: (260) 467-8810.",
  "times": "After school, 1 hour a week during the school year.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "tutor",
   "1 hr/week"
  ]
 },
 {
  "id": "vol-ja",
  "g": "kids",
  "cat": "volunteer",
  "name": "Junior Achievement of Northern Indiana",
  "addr": "550 E Wallen Rd",
  "zip": "46825",
  "lat": 41.160471,
  "lng": -85.136426,
  "phone": "(260) 484-2543",
  "phoneHref": "+12604842543",
  "web": "https://northernindiana.ja.org/",
  "how": "Teach a short money, career or business lesson in a local school or after-school program. Call (260) 484-2543.",
  "times": "Classroom visits during school hours.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "teach",
   "school"
  ]
 },
 {
  "id": "vol-special-olympics",
  "g": "kids",
  "cat": "volunteer",
  "name": "Special Olympics Allen County",
  "addr": "5651 Coventry Ln #151",
  "zip": "46804",
  "lat": 41.034662,
  "lng": -85.258081,
  "phone": "(260) 402-1302",
  "phoneHref": "+12604021302",
  "web": "https://www.specialolympicsallencounty.org/contact-us",
  "how": "Coach, cheer or help at events. Call (260) 402-1302.",
  "times": "Call for practice and event schedules.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "sports",
   "coaching"
  ]
 },
 {
  "id": "vol-coats-for-kids",
  "g": "kids",
  "cat": "volunteer",
  "name": "Coats for Kids (Volunteer Center)",
  "addr": "3401 Lake Ave",
  "zip": "46805",
  "phone": "(260) 424-3505",
  "phoneHref": "+12604243505",
  "web": "https://volunteerfortwayne.org/",
  "how": "Volunteer Center's annual coat drive: collect, sort and hand out winter coats for kids. Call (260) 424-3505.",
  "times": "Coat collection runs Nov 1 - 30 every year.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "seasonal",
   "November",
   "coats"
  ]
 },
 {
  "id": "vol-ave-maria",
  "g": "people",
  "cat": "volunteer",
  "name": "Ave Maria House",
  "addr": "432 Madison St",
  "zip": "46802",
  "lat": 41.07618,
  "lng": -85.132243,
  "phone": "(260) 424-8231",
  "phoneHref": "+12604248231",
  "web": "https://stmarysfw.org/ave-maria-house/",
  "how": "Day respite for people experiencing homelessness. Call the parish office at (260) 424-8231 about volunteering.",
  "times": "Open Mon-Fri 10 AM - 1 PM.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "day center",
   "showers",
   "laundry"
  ]
 },
 {
  "id": "vol-stand-down",
  "g": "people",
  "cat": "volunteer",
  "name": "Allen County Homeless Veteran Stand Down",
  "addr": "Grand Wayne Center, 120 W Jefferson Blvd",
  "zip": "46802",
  "lat": 41.07658,
  "lng": -85.14048,
  "phone": "(260) 424-3505",
  "phoneHref": "+12604243505",
  "web": "https://opportunities.volunteerfortwayne.org/need/detail/?need_id=829777",
  "how": "One-day event helping homeless veterans (clothes, services, food). Ask the Volunteer Center how to sign up: (260) 424-3505.",
  "times": "Friday, Oct 9, 2026, 9:30 AM - 1 PM at the Grand Wayne Center, 120 W Jefferson Blvd.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "until": "2026-10-09",
  "tags": [
   "veterans",
   "one-day event"
  ]
 },
 {
  "id": "vol-earn-a-bike",
  "g": "earn",
  "cat": "workmeal",
  "name": "Earn-a-Bike - Heart of the City Bike Ministry",
  "addr": "1651 Cass St",
  "zip": "46808",
  "lat": 41.09057,
  "lng": -85.14446,
  "phone": "(260) 444-2901",
  "phoneHref": "+12604442901",
  "web": "https://www.hotcfw.org/",
  "how": "Show up at the bike shop and work for a free bike: rebuild donated bikes, or do community service hours. Free repair lessons too. Questions: (260) 444-2901.",
  "times": "Shop open Fridays 9 AM - noon (use door 3 off the north parking lot). Earn it with 6 hours of community service, or two Fridays working in the shop.",
  "perk": "A free bike you earn, plus free repair lessons.",
  "v": "ok",
  "tags": [
   "free bike",
   "earn it",
   "Fridays",
   "repair lessons"
  ]
 },
 {
  "id": "vol-givehear",
  "g": "earn",
  "cat": "workmeal",
  "name": "GiveHear \u2014 Nonprofit Audiologists",
  "addr": "130 W Main Street Ste 150",
  "zip": "46802",
  "lat": 41.080493,
  "lng": -85.141234,
  "phone": "(260) 602-3276",
  "phoneHref": "+12606023276",
  "web": "https://www.givehear.org/",
  "how": "Call (260) 602-3276 and ask about their 'Circle of Giving': people who get hearing help give community volunteer hours back. Sliding-fee hearing clinic downtown.",
  "times": "Clinic Mon-Fri 9 AM - 5 PM (Saturdays limited - call first).",
  "perk": "Hearing tests and hearing aids at reduced cost, with volunteer hours given back.",
  "v": "ok",
  "tags": [
   "hearing aids",
   "volunteer hours back"
  ]
 },
 {
  "id": "vol-sa-arc",
  "g": "earn",
  "cat": "workmeal",
  "name": "Salvation Army Adult Rehabilitation Center",
  "addr": "427 W Washington Blvd",
  "zip": "46802",
  "lat": 41.076108,
  "lng": -85.145095,
  "phone": "(260) 424-1655",
  "phoneHref": "+12604241655",
  "web": "https://satruck.org/",
  "how": "Free 180-day program for men 18+ with counseling, life-skills and work therapy. Residents pay nothing. Call (260) 424-1655 for intake.",
  "times": "Live-in program. Intake office Mon-Sat 9 AM - 9 PM (closed Sunday).",
  "perk": "A free place in the program, funded by the Salvation Army stores.",
  "v": "ok",
  "tags": [
   "men 18+",
   "work therapy",
   "free",
   "residential"
  ]
 },
 {
  "id": "vol-fwrm-programs",
  "g": "earn",
  "cat": "workmeal",
  "name": "Fort Wayne Rescue Mission - Work Therapy Programs",
  "addr": "404 E Washington Blvd",
  "zip": "46802",
  "lat": 41.078063,
  "lng": -85.133645,
  "phone": "(260) 426-7357",
  "phoneHref": "+12604267357",
  "web": "https://fwrm.org",
  "how": "Men's residential programs (3-6 months up to 1 year) with case management, classes and work therapy. Must be 18+, drug and alcohol free, and complete an intake interview. Call (260) 426-7357.",
  "times": "Programs run all year - call for eligibility and openings.",
  "perk": "Housing, meals and program support while you work the program.",
  "v": "ok",
  "tags": [
   "men 18+",
   "work therapy",
   "residential"
  ]
 },
 {
  "id": "vol-habitat-sweat",
  "g": "earn",
  "cat": "workmeal",
  "name": "Habitat for Humanity - Sweat Equity Homes",
  "addr": "2085 Humphrey St",
  "zip": "46803",
  "lat": 41.078146,
  "lng": -85.11088,
  "phone": "(260) 422-4828",
  "phoneHref": "+12604224828",
  "web": "https://habitatgfw.com/apply",
  "how": "Work toward owning a home: families put in 'sweat equity' hours and repay an affordable mortgage. Apply at habitatgfw.com/apply or call (260) 422-4828.",
  "times": "Office Mon-Fri 9 AM - 4 PM.",
  "perk": "An affordable home you help build.",
  "v": "ok",
  "tags": [
   "home",
   "sweat equity"
  ]
 }
];
(function () {
  try {
    CATS.volunteer = { label: "Volunteer", icon: "\uD83D\uDE4C", color: "#f59e0b" };
    CATS.workmeal = { label: "Work for a meal / earn", icon: "\uD83D\uDEE0\uFE0F", color: "#10b981" };
    ["en", "es", "my"].forEach(function (l) {
      var S = STRINGS[l] || (STRINGS[l] = {});
      S.cat_volunteer = l === "es" ? "Voluntariado" : "Volunteer";
      S.cat_workmeal = l === "es" ? "Trabajo por comida / ganar" : "Work for a meal / earn";
      S.nav_volunteer = l === "es" ? "Voluntariado" : "Volunteer";
    });
    var seen = {};
    RESOURCES.forEach(function (r) { seen[r.id] = 1; });
    HAVEN_VOL.forEach(function (v) {
      if (typeof v.lat !== "number" || seen[v.id]) return;
      var desc = "\uD83D\uDE4C HOW: " + v.how + " WHEN: " + v.times + " YOU GET: " + v.perk +
        (v.v === "call" ? " (Details from a listing - call first.)" : "");
      RESOURCES.push({
        id: v.id, name: v.name, cats: [v.cat], addr: v.addr, zip: v.zip, lat: v.lat, lng: v.lng,
        phone: v.phone, phoneHref: v.phoneHref, web: v.web, desc: desc,
        tags: (v.tags || []).concat(["volunteer"]), hoursText: v.times
      });
    });
  } catch (e) { try { console.error("haven-volunteer-data", e); } catch (e2) {} }
})();
