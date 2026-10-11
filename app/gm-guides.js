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
