/* Haven FW plus-ui: 🏷️ tag filter menu (map + places + category panel) and a search box
   inside the Categories panel. Works with the existing filtered()/state pipeline. */
"use strict";
(function () {
  if (typeof state === "undefined" || typeof filtered !== "function") return;
  state.tagf = []; state.tagAll = false;
  const norm = s => String(s).toLowerCase().trim();
  const ES = () => settings && settings.lang === "es";
  const L = (en, es) => (ES() ? es : en);
  const pretty = s => s.charAt(0).toUpperCase() + s.slice(1);
  const skipTag = s => /^verified/.test(s) || /days old/.test(s) || s.length > 32;

  /* ---- filter: tags are applied on top of everything else ---- */
  const baseFiltered = filtered;
  filtered = function () {
    const list = baseFiltered();
    if (!state.tagf.length) return list;
    return list.filter(r => {
      const tg = (r.tags || []).map(norm);
      return state.tagAll ? state.tagf.every(x => tg.includes(x)) : state.tagf.some(x => tg.includes(x));
    });
  };
  const refresh = () => { renderList(); refreshMarkers(); hidePeek(); selectMarker(null); updateTagBtns(); };

  function updateTagBtns() {
    const n = state.tagf.length;
    document.querySelectorAll(".tagbtn").forEach(b => {
      b.innerHTML = `🏷️ ${esc(L("Tags", "Etiquetas"))}${n ? ` <span class="catn">${n}</span>` : ""}`;
    });
  }

  /* ---- tag menu ---- */
  let tagQ = "";
  function tagCounts() {
    const m = {};
    baseFiltered().forEach(r => (r.tags || []).forEach(t => { t = norm(t); if (t && !skipTag(t)) m[t] = (m[t] || 0) + 1; }));
    state.tagf.forEach(t => { if (!m[t]) m[t] = 0; });
    return Object.entries(m).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }
  function ensureSheet() {
    if (document.getElementById("tagSheet")) return;
    const sc = document.createElement("div"); sc.id = "tagScrim"; sc.addEventListener("click", closeTags);
    const sh = document.createElement("div"); sh.id = "tagSheet"; sh.setAttribute("aria-label", "Tags");
    sh.innerHTML = `<div class="grab"></div>
      <div class="thead"><h2></h2><button class="iconbtn" id="tagClose" aria-label="Close">✕</button></div>
      <div class="tsearch"><span class="mag">🔍</span><input id="tagQ" type="search" autocomplete="off"></div>
      <div class="topts"><div class="seg" id="tagMode"><button data-m="any"></button><button data-m="all"></button></div><button class="tclear" id="tagClear"></button></div>
      <div class="tchips" id="tagChips"></div>
      <button class="widebtn tdone" id="tagDone"></button>`;
    document.body.appendChild(sc); document.body.appendChild(sh);
    sh.querySelector("#tagClose").addEventListener("click", closeTags);
    sh.querySelector("#tagDone").addEventListener("click", closeTags);
    sh.querySelector("#tagClear").addEventListener("click", () => { state.tagf = []; drawTags(); refresh(); });
    sh.querySelector("#tagQ").addEventListener("input", e => { tagQ = norm(e.target.value); drawTags(); });
    sh.querySelectorAll("#tagMode button").forEach(b => b.addEventListener("click", () => {
      state.tagAll = b.dataset.m === "all"; drawTags(); refresh();
    }));
  }
  function drawTags() {
    const sh = document.getElementById("tagSheet"); if (!sh) return;
    sh.querySelector("h2").textContent = "🏷️ " + L("Filter by tags", "Filtrar por etiquetas");
    sh.querySelector("#tagQ").placeholder = L("Search tags… (veterans, seniors, no ID)", "Buscar etiquetas…");
    const mb = sh.querySelectorAll("#tagMode button");
    mb[0].textContent = L("Match any", "Cualquiera"); mb[1].textContent = L("Match all", "Todas");
    mb.forEach(b => b.classList.toggle("on", (b.dataset.m === "all") === state.tagAll));
    sh.querySelector("#tagClear").textContent = L("Clear", "Borrar");
    let all = tagCounts();
    const sel = state.tagf;
    let shown = all.filter(([t]) => !sel.includes(t) && (!tagQ || t.includes(tagQ)));
    shown = shown.slice(0, tagQ ? 80 : 50);
    const chip = ([t, n], on) => `<button class="tchip${on ? " on" : ""}" data-t="${esc(t)}">${on ? "✓ " : ""}${esc(pretty(t))} <i>${n}</i></button>`;
    const counts = Object.fromEntries(all);
    let h = sel.map(t => chip([t, counts[t] || 0], true)).join("");
    h += shown.map(x => chip(x, false)).join("");
    if (!h) h = `<p class="tnone">${esc(L("No tags match.", "No hay etiquetas."))}</p>`;
    const box = sh.querySelector("#tagChips"); box.innerHTML = h;
    box.querySelectorAll(".tchip").forEach(b => b.addEventListener("click", () => {
      const t = b.dataset.t, i = state.tagf.indexOf(t);
      if (i >= 0) state.tagf.splice(i, 1); else state.tagf.push(t);
      drawTags(); refresh();
    }));
    const n = filtered().length;
    sh.querySelector("#tagDone").textContent = L(`Show ${n} place${n === 1 ? "" : "s"}`, `Mostrar ${n} lugar${n === 1 ? "" : "es"}`);
  }
  window.openTags = function (prefill) {
    ensureSheet(); tagQ = prefill ? norm(prefill) : "";
    document.getElementById("tagQ").value = tagQ;
    drawTags();
    document.getElementById("tagScrim").classList.add("show");
    document.getElementById("tagSheet").classList.add("show");
  };
  function closeTags() {
    const a = document.getElementById("tagScrim"), b = document.getElementById("tagSheet");
    if (a) a.classList.remove("show"); if (b) b.classList.remove("show");
  }
  const baseBack = window.__havenBack;
  window.__havenBack = function () {
    const sh = document.getElementById("tagSheet");
    if (sh && sh.classList.contains("show")) { closeTags(); return true; }
    return baseBack ? baseBack() : false;
  };

  /* ---- buttons ---- */
  function mkBtn(id) {
    const b = document.createElement("button"); b.className = "tagbtn"; if (id) b.id = id;
    b.addEventListener("click", () => { if (typeof closeCatPanel === "function") closeCatPanel(); openTags(); });
    return b;
  }
  const mapBtn = document.getElementById("catBtnMap");
  if (mapBtn) { const b = mkBtn("tagBtnMap"); b.classList.add("tagbtn-map"); mapBtn.insertAdjacentElement("afterend", b); }
  const listBtn = document.getElementById("catBtn");
  if (listBtn && listBtn.parentElement) { listBtn.parentElement.style.display = "flex"; listBtn.parentElement.style.gap = "8px"; listBtn.parentElement.appendChild(mkBtn("tagBtnList")); }

  /* ---- search inside the Categories panel ---- */
  let catQ = "";
  function ensureCatSearch() {
    const panel = document.getElementById("catPanel"), rows = document.getElementById("catRows");
    if (!panel || !rows || document.getElementById("catSearch")) return;
    const w = document.createElement("div"); w.id = "catSearch";
    w.innerHTML = `<div class="tsearch"><span class="mag">🔍</span><input id="catQ" type="search" autocomplete="off"><button class="iconbtn" id="catQx" aria-label="Clear">✕</button></div>`;
    rows.parentElement.insertBefore(w, rows);
    const inp = w.querySelector("#catQ");
    inp.placeholder = L("Search categories…", "Buscar categorías…");
    inp.addEventListener("input", () => { catQ = norm(inp.value); applyCatSearch(); });
    w.querySelector("#catQx").addEventListener("click", () => { inp.value = ""; catQ = ""; applyCatSearch(); inp.focus(); });
    inp.addEventListener("keydown", e => {
      if (e.key !== "Enter") return;
      const first = [...rows.querySelectorAll(".catrow[data-cat]")].find(r => r.dataset.cat !== "all" && r.style.display !== "none");
      if (first) { first.click(); closeCatPanel(); }
    });
  }
  function applyCatSearch() {
    const rows = document.getElementById("catRows"); if (!rows) return;
    let vis = 0;
    rows.querySelectorAll(".catrow[data-cat]").forEach(r => {
      const k = r.dataset.cat;
      if (k === "all" || !CATS[k]) { r.style.display = ""; return; }
      const hay = norm(catLabel(k) + " " + CATS[k].label + " " + k + " " + ((window.PLUS_CAT_WORDS || {})[k] || ""));
      const ok = !catQ || catQ.split(/\s+/).every(w => hay.includes(w));
      r.style.display = ok ? "" : "none"; if (ok) vis++;
    });
    let hint = document.getElementById("catHint");
    if (!hint) { hint = document.createElement("div"); hint.id = "catHint"; rows.appendChild(hint); }
    if (catQ && !vis) {
      hint.innerHTML = `<p>${esc(L("No category matches.", "Ninguna categoría coincide."))}</p><button class="tagbtn" id="catHintBtn">🏷️ ${esc(L("Search tags for", "Buscar etiquetas:"))} “${esc(catQ)}”</button>`;
      hint.querySelector("#catHintBtn").addEventListener("click", () => { const q = catQ; closeCatPanel(); openTags(q); });
    } else hint.innerHTML = "";
  }
  if (typeof renderCatPanel === "function") {
    const baseRCP = renderCatPanel;
    renderCatPanel = function () { baseRCP(); ensureCatSearch(); applyCatSearch();
      const w = document.getElementById("catSearch");
      if (w && !document.getElementById("catTagBtn")) { const b = mkBtn("catTagBtn"); b.classList.add("tagbtn-wide"); w.appendChild(b); updateTagBtns(); } };
  }

  /* "What's open near me" clears the other filters, so clear tags too */
  const nob = document.getElementById("nearOpenBtn");
  if (nob) nob.addEventListener("click", () => { state.tagf = []; refresh(); });

  updateTagBtns();
})();
