/* Haven FW website — 🏷️ Tag filter sheet (feature #39).
 * Ported from the Android app's plus-ui.js: a bottom-sheet tag filter that sits on top
 * of the category/search/open-now filters. Tap a tag chip to include it; Match-any vs
 * Match-all segmented control; tag search with 150ms debounce; Clear + "Show N places".
 * Entry points: 🏷️ button on the map overlay (below the 🕐 open-now toggle) and a TAGS
 * section in the filter panel (the site analogue of the app's Categories panel button).
 * Hooks into app.js render(): render() applies window._tagActive/_tagMatch to its list
 * (one-line guarded insertion there), and render is wrapped here to refresh the 🏷️
 * count badges. Loaded after app.js; needs its globals: placesInArea, activeCats,
 * activeQ, isOpenNow, escapeHtml, escapeAttr, render. English-only per site convention. */
var tfTags = [];
var tfAll = false;
var tfQ = "";
var tfDeb = null, tfLast = "";

function tfNorm(s) { return String(s || "").toLowerCase().trim(); }
/* Skip audit noise + overly long tags, same rule as the app */
function tfSkip(s) { return /^verified/i.test(s) || /days old/i.test(s) || s.length > 32; }

function tfActive() { return tfTags.length > 0; }
function tfMatch(r) {
  if (!tfTags.length) return true;
  const tg = (r.tags || []).map(tfNorm);
  return tfAll ? tfTags.every(x => tg.indexOf(x) >= 0) : tfTags.some(x => tg.indexOf(x) >= 0);
}
window._tagActive = tfActive;
window._tagMatch = tfMatch;

/* Base list: the app's pipeline minus tags (area + categories + open-now + search) */
function tfBaseList() {
  let list = (typeof placesInArea === "function") ? placesInArea() : [];
  const cats = (typeof activeCats === "function") ? activeCats() : [];
  if (cats.length) list = list.filter(r => (r.cats || []).some(c => cats.indexOf(c) >= 0));
  if (typeof mapOpenOnly !== "undefined" && mapOpenOnly && typeof isOpenNow === "function")
    list = list.filter(r => isOpenNow(r));
  const q = tfNorm((typeof activeQ === "function") ? activeQ() : "");
  if (q) list = list.filter(r => ((r.name || "") + " " + (r.desc || "") + " " + (r.addr || "")).toLowerCase().indexOf(q) >= 0);
  return list;
}

function tfCounts() {
  const m = {};
  tfBaseList().forEach(r => (r.tags || []).forEach(t => {
    t = tfNorm(t); if (t && !tfSkip(t)) m[t] = (m[t] || 0) + 1;
  }));
  tfTags.forEach(t => { if (!m[t]) m[t] = 0; });
  return Object.entries(m).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
}

function tfRefresh() {
  if (typeof render === "function") render(activeCats(), activeQ());
  tfUpdateBtns();
}

function tfUpdateBtns() {
  const n = tfTags.length;
  const badge = n ? ' <span class="catn">' + n + "</span>" : "";
  document.querySelectorAll(".tagbtn").forEach(b => {
    if (b.classList.contains("tagbtn-map")) b.innerHTML = "🏷️" + badge;
    else b.innerHTML = "🏷️ Filter by tags" + badge;
  });
}

function tfEnsureSheet() {
  if (document.getElementById("tagSheet")) return;
  const sc = document.createElement("div");
  sc.id = "tagScrim";
  sc.addEventListener("click", tfClose);
  const sh = document.createElement("div");
  sh.id = "tagSheet";
  sh.setAttribute("aria-label", "Filter by tags");
  sh.innerHTML =
    '<div class="grab"></div>' +
    '<div class="thead"><h2>🏷️ Filter by tags</h2><button class="iconbtn" id="tagClose" aria-label="Close">✕</button></div>' +
    '<div class="tsearch"><span class="mag">🔍</span><input id="tagQ" type="search" autocomplete="off" placeholder="Search tags… (veterans, seniors, no ID)"><button class="iconbtn" id="tagQClear" aria-label="Clear search" style="display:none">✕</button></div>' +
    '<div class="topts"><div class="seg" id="tagMode"><button id="tagModeAny" data-m="any">Match any</button><button id="tagModeAll" data-m="all">Match all</button></div><button class="tclear" id="tagClear">Clear</button></div>' +
    '<div class="tchips" id="tagChips"></div>' +
    '<button class="widebtn tdone" id="tagDone">Show places</button>';
  document.body.appendChild(sc);
  document.body.appendChild(sh);
  sh.querySelector("#tagClose").addEventListener("click", tfClose);
  sh.querySelector("#tagDone").addEventListener("click", tfClose);
  sh.querySelector("#tagClear").addEventListener("click", () => { tfTags = []; tfDraw(); tfRefresh(); });
  const qIn = sh.querySelector("#tagQ"), qClear = sh.querySelector("#tagQClear");
  qIn.addEventListener("input", () => {
    const v = tfNorm(qIn.value);
    qClear.style.display = qIn.value ? "flex" : "none";
    if (v === tfLast) return;
    tfQ = v;
    if (tfDeb) clearTimeout(tfDeb);
    tfDeb = setTimeout(() => { tfDeb = null; tfLast = v; tfDraw(); }, 150);
  });
  qClear.addEventListener("click", () => {
    if (tfDeb) { clearTimeout(tfDeb); tfDeb = null; }
    qIn.value = ""; tfQ = ""; tfLast = ""; qClear.style.display = "none"; tfDraw(); qIn.focus();
  });
  ["tagModeAny", "tagModeAll"].forEach(id => {
    const b = sh.querySelector("#" + id);
    if (b) b.addEventListener("click", () => { tfAll = b.dataset.m === "all"; tfDraw(); tfRefresh(); });
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") tfClose();
  });
}

function tfDraw() {
  const sh = document.getElementById("tagSheet"); if (!sh) return;
  const mb = [sh.querySelector("#tagModeAny"), sh.querySelector("#tagModeAll")].filter(Boolean);
  mb.forEach(b => b.classList.toggle("on", (b.dataset.m === "all") === tfAll));
  const all = tfCounts();
  const counts = {};
  all.forEach(([t, n]) => { counts[t] = n; });
  let shown = all.filter(([t]) => tfTags.indexOf(t) < 0 && (!tfQ || t.indexOf(tfQ) >= 0));
  shown = shown.slice(0, tfQ ? 80 : 50);
  const chip = (t, n, on) =>
    '<button class="tchip' + (on ? " on" : "") + '" data-t="' + encodeURIComponent(t) + '">' +
    (on ? "✓ " : "") + escapeHtml(t.charAt(0).toUpperCase() + t.slice(1)) + " <i>" + n + "</i></button>";
  let h = tfTags.map(t => chip(t, counts[t] || 0, true)).join("");
  h += shown.map(([t, n]) => chip(t, n, false)).join("");
  if (!h) h = '<p class="tnone">No tags match.</p>';
  const box = sh.querySelector("#tagChips");
  box.innerHTML = h;
  box.querySelectorAll(".tchip").forEach(b => b.addEventListener("click", () => {
    const t = decodeURIComponent(b.dataset.t), i = tfTags.indexOf(t);
    if (i >= 0) tfTags.splice(i, 1); else tfTags.push(t);
    tfDraw(); tfRefresh();
  }));
  const n = tfBaseList().filter(tfMatch).length;
  sh.querySelector("#tagDone").textContent = "Show " + n + " place" + (n === 1 ? "" : "s");
}

function openTags(prefill) {
  tfEnsureSheet();
  tfQ = prefill ? tfNorm(prefill) : "";
  const qi = document.getElementById("tagQ");
  if (qi) { qi.value = tfQ; tfLast = tfQ; }
  tfDraw();
  document.getElementById("tagScrim").classList.add("show");
  document.getElementById("tagSheet").classList.add("show");
}
function tfClose() {
  const a = document.getElementById("tagScrim"), b = document.getElementById("tagSheet");
  if (a) a.classList.remove("show");
  if (b) b.classList.remove("show");
}
function closeTags() { tfClose(); }

/* ---- entry buttons ---- */
(function tfMount() {
  /* Map overlay button, below the 🕐 open-now toggle */
  const wrap = document.getElementById("map-wrap");
  const openT = document.getElementById("map-open-toggle");
  if (wrap && !document.getElementById("tagBtnMap")) {
    const b = document.createElement("button");
    b.id = "tagBtnMap";
    b.className = "tagbtn tagbtn-map";
    b.setAttribute("aria-label", "Filter by tags");
    b.style.cssText = "position:absolute;top:172px;right:10px;z-index:500;width:44px;height:44px;border:1px solid #333;border-radius:12px;background:rgba(26,31,46,0.95);color:#7c8aff;font-size:18px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;";
    b.innerHTML = "🏷️";
    b.addEventListener("click", () => openTags());
    wrap.appendChild(b);
  }
  /* TAGS section in the filter panel, after CATEGORIES */
  const sf = document.getElementById("sidebar-filters");
  if (sf && !document.getElementById("tagBtnPanel")) {
    const h = document.createElement("h3");
    h.textContent = "TAGS";
    h.style.cssText = "color:#888;font-size:12px;margin:16px 0 8px;";
    const b = document.createElement("button");
    b.id = "tagBtnPanel";
    b.className = "tagbtn tagbtn-wide";
    b.innerHTML = "🏷️ Filter by tags";
    b.addEventListener("click", () => { toggleFilterPanel(); openTags(); });
    sf.insertAdjacentElement("afterend", h);
    h.insertAdjacentElement("afterend", b);
  }
  tfUpdateBtns();
})();

/* ---- hook into render(): refresh 🏷️ count badges after every render ---- */
(function tfHookRender() {
  if (typeof render === "function" && !render._tagHooked) {
    const base = render;
    const wrapped = function (cats, q) { base(cats, q); tfUpdateBtns(); };
    wrapped._tagHooked = true;
    render = wrapped;
  }
})();

/* test api */
window._tagApi = { norm: tfNorm, skip: tfSkip, counts: tfCounts, match: tfMatch, active: tfActive, draw: tfDraw, ensure: tfEnsureSheet, close: tfClose, updateBtns: tfUpdateBtns, baseList: tfBaseList };
