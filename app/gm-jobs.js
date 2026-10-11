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
