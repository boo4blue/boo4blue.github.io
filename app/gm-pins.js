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
