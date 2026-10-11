/* Haven — organized navigation layer.
   5 bottom tabs (Map · Places · Work · Guides · More), sub-tabs inside each,
   a tile menu under More, a collapsible filter panel on Places, grouped Help and Settings. */
(function () {
  if (window.__havenNav) return; window.__havenNav = true;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const lang = () => (typeof settings !== "undefined" && settings.lang) || "en";
  const L = (en, es, my) => lang() === "es" ? es : (lang() === "my" && my ? my : en);
  const tt = k => { try { return typeof t === "function" ? t(k) : k; } catch (e) { return k; } };
  const hidden = id => { try { return typeof profileHidden === "function" && profileHidden(id); } catch (e) { return false; } };
  const mk = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  const HUBS = [
    { id: "map",    ic: "🗺️", l: () => L("Map", "Mapa", "မြေပုံ"),            tabs: ["map"] },
    { id: "places", ic: "📋", l: () => L("Places", "Lugares", "နေရာများ"),     tabs: ["list", "saved", "events"] },
    { id: "work",   ic: "💼", l: () => L("Work", "Trabajo", "အလုပ်"),          tabs: ["jobs", "gigs", "volunteer", "programs", "ptools"] },
    { id: "guides", ic: "🧭", l: () => L("Guides", "Guías", "လမ်းညွှန်"),      tabs: ["guide", "plan", "learn"] },
    { id: "more",   ic: "☰",  l: () => L("More", "Más", "နောက်ထပ်"),           tabs: ["more", "chat", "info", "settings"] }
  ];
  const SUB = { list: ["📋", "nav_places"], saved: ["⭐", "nav_saved"], jobs: ["💼", "nav_jobs"], gigs: ["⚡", "nav_gigs"],
    programs: ["🎓", "nav_programs"], learn: ["📚", "nav_learn"], guide: ["📖", "nav_guide"], plan: ["✅", "nav_plan"], events: ["📅", "nav_events"], volunteer: ["🙌", "nav_volunteer"] };
  const NAMEKEY = { map: "nav_map", chat: "nav_chat", info: "nav_help", settings: "nav_settings", ptools: "nav_programs" };
  const hubOf = tb => HUBS.find(h => h.tabs.includes(tb)) || HUBS[0];
  const label = tb => SUB[tb] ? tt(SUB[tb][1]) : (NAMEKEY[tb] ? tt(NAMEKEY[tb]) : L("More", "Más", "နောက်ထပ်"));
  const lastSub = {};

  /* ---------- bottom nav: 5 hubs ---------- */
  const nav = $("nav");
  const app = $("#app");
  const subnav = mk("div"); subnav.id = "subnav"; subnav.hidden = true;
  const hdr = $("header");
  if (hdr && hdr.nextSibling) hdr.parentNode.insertBefore(subnav, hdr.nextSibling);

  const hubDefault = h => {
    if (h.id === "more") return "more";
    const keep = lastSub[h.id];
    if (keep && !hidden(keep)) return keep;
    return h.tabs.find(x => !hidden(x) && x !== "ptools") || h.tabs[0];
  };
  const hubHidden = h => h.id !== "more" && h.tabs.every(x => hidden(x));

  function buildNav() {
    if (!nav) return;
    nav.innerHTML = "";
    HUBS.forEach(h => {
      const b = mk("button", "", `<span class="ni">${h.ic}</span><span class="nl"></span>`);
      b.dataset.hub = h.id; b.dataset.tab = hubDefault(h);
      b.addEventListener("click", () => {
        const dest = hubOf(state.tab) === h && h.id === "more" ? "more" : hubDefault(h);
        b.dataset.tab = dest;
        goTab(dest);
      });
      nav.appendChild(b);
    });
    refreshLabels();
  }
  function refreshLabels() {
    $$("nav button[data-hub]").forEach(b => {
      const h = HUBS.find(x => x.id === b.dataset.hub);
      b.querySelector(".nl").textContent = h.l();
      b.style.display = hubHidden(h) ? "none" : "";
    });
  }

  /* ---------- sub-tabs ---------- */
  function renderSub(h, tb) {
    const solo = tb === "map" || tb === "more";
    subnav.hidden = solo; document.body.dataset.sub = solo ? "0" : "1";
    if (solo) return;
    subnav.innerHTML = ""; subnav.classList.toggle("seg4", h.id !== "more");
    if (h.id === "more") {
      const back = mk("button", "sn-back", "‹ " + L("More", "Más", "နောက်ထပ်"));
      back.addEventListener("click", () => goTab("more"));
      subnav.append(back, mk("span", "sn-title", label(tb)));
      return;
    }
    const cur = tb === "ptools" ? "programs" : tb;
    h.tabs.filter(x => SUB[x] && !hidden(x)).forEach(x => {
      const b = mk("button", x === cur ? "on" : "", `${SUB[x][0]} ${esc2(tt(SUB[x][1]))}`);
      b.dataset.tab = x;
      b.addEventListener("click", () => goTab(x));
      subnav.appendChild(b);
    });
    
  }
  const esc2 = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  /* ---------- header ---------- */
  const hp = $("header .t p");
  if (hp) hp.removeAttribute("data-i18n");
  const info = $("#infoBtn");
  function setHeader(tb) {
    if (hp) hp.textContent = havenCity() + " · " + label(tb);
    if (info) info.innerHTML = `<span class="sosi">🆘</span><span class="sosl">SOS</span>`;
  }
  window.havenSetHeader = setHeader;

  /* ---------- More: tile menu ---------- */
  function ensureMore() {
    if ($("#tab-more")) return $("#tab-more");
    const s = mk("section", "tab"); s.id = "tab-more";
    const m = $("main"); if (m) m.appendChild(s);
    return s;
  }
  function renderMore() {
    const sec = ensureMore();
    const T = [
      ["chat",   "💬", L("Community chat", "Chat comunitario"),    L("Talk with others", "Habla con otros"), "c1"],
      ["saved",  "⭐", L("Saved places", "Guardados"),             L("Your lifelines, offline", "Tus lugares, sin internet"), "c2"],
      ["info",   "🆘", L("Help & safety", "Ayuda y seguridad"),    L("Hotlines and tools", "Líneas y herramientas"), "c3"],
      ["quiz",   "🧭", L("Personalize", "Personalizar"),           L("Show what fits you", "Muestra lo que necesitas"), "c4"],
      ["share",  "📲", L("Share Haven", "Compartir Haven"),        L("QR code and link", "Código QR y enlace"), "c5"],
      ["flyers", "🖨️", L("Flyers", "Volantes"),                    L("Print one-pagers", "Imprime hojas"), "c6"],
      ["about",  "📜", L("Terms & about", "Términos"),             L("Privacy and waiver", "Privacidad"), "c7"],
      ["transit", "🚌", L("TriMet", "TriMet"),                    L("Bus, MAX & WES schedules", "Horarios de bus, MAX y WES"), "c9"],
      ["donate", "💜", L("Donate", "Donar"),                       L("Support Haven", "Apoya Haven"), "c9"],
      ["settings", "⚙️", L("Settings", "Ajustes"),                 L("Text size, language", "Texto, idioma"), "c8"]
    ].filter(x => !hidden(x[0]));
    sec.innerHTML = `<div class="scroll morewrap">
      <div class="sosrow">
        <a class="sosbtn" href="tel:988"><span>📞</span><b>988</b><small>${L("Crisis line", "Línea de crisis")}</small></a>
        <a class="sosbtn alt" href="tel:211"><span>📞</span><b>211</b><small>${L("Help & referrals", "Ayuda y referencias")}</small></a>
      </div>
      <div class="moregrid">${T.map(x => `<button class="mtile ${x[4]}" data-go="${x[0]}"><span class="mi">${x[1]}</span><span class="mt">${esc2(x[2])}</span><span class="ms">${esc2(x[3])}</span></button>`).join("")}</div>
      <p class="morefoot">Haven · ${L("Made with 💜 for " + havenCity(), "Hecho con 💜 para " + havenCity())}</p></div>`;
    $$(".mtile", sec).forEach(b => b.addEventListener("click", () => {
      const g = b.dataset.go;
      if (g === "transit") { if (window.havenOpenExternal) window.havenOpenExternal("https://trimet.org/schedules/index.htm"); return; }
      if (g === "donate") { if (window.havenOpenDonate) window.havenOpenDonate(); return; }
      if (g === "quiz") { if (typeof openStartQ === "function") openStartQ(true); return; }
      if (g === "share" || g === "flyers" || g === "about") { window.__igWant = g === "flyers" ? "share" : g; return goTab("info"); }
      goTab(g);
    }));
  }

  /* ---------- Places: search + compact filters ---------- */
  function updateLf() {
    const n = $("#lfN"); if (!n) return;
    let c = 0;
    try { c += (state.cats || []).length; } catch (e) {}
    c += $$("#lfPanel .toggle.on").length + $$("#quickRow .on").length;
    $$("#radiusRow .on").forEach(b => { if (b !== $("#radiusRow").firstElementChild) c++; });
    n.textContent = c; n.hidden = !c;
    const fb = $("#lfBtn"); if (fb) fb.classList.toggle("active", c > 0);
  }
  function buildPlaces() {
    const tab = $("#tab-list"); if (!tab) return;
    if ($("#lfBar")) return updateLf();
    const search = $(".searchbar", tab), cards = $("#cards", tab);
    if (!search || !cards) return;
    const area = $(".areabar", tab), catbar = $(".catbar", tab), opts = $(".listopts", tab);
    const quick = $("#quickRow"), sub = $(".sq-sub", tab), radius = $("#radiusRow"), cy = $("#cyBtn"), near = $("#nearOpenBtn");
    const bar = mk("div"); bar.id = "lfBar";
    const fb = mk("button", "", `<span>⚙️</span><span class="lfT">${L("Filters", "Filtros")}</span><span id="lfN" hidden>0</span>`);
    fb.id = "lfBtn";
    if (area) bar.appendChild(area);
    bar.appendChild(fb);
    const panel = mk("div"); panel.id = "lfPanel";
    if (catbar) panel.appendChild(catbar);
    if (opts) panel.appendChild(opts);
    if (radius) { panel.appendChild(mk("div", "lfLab", L("Distance", "Distancia"))); panel.appendChild(radius); }
    if (sub) panel.appendChild(sub);
    const tools = mk("div"); tools.id = "lfTools";
    if (cy) tools.appendChild(cy);
    if (near) tools.appendChild(near);
    search.after(bar);
    let anchor = bar;
    if (quick) { bar.after(quick); anchor = quick; }
    anchor.after(panel); panel.after(tools);
    fb.addEventListener("click", () => { panel.classList.toggle("open"); fb.classList.toggle("openp", panel.classList.contains("open")); });
    tab.addEventListener("click", () => setTimeout(updateLf, 80));
    updateLf();
  }

  /* ---------- Help: grouped into inner tabs ---------- */
  function buildInfo() {
    const tab = $("#tab-info"), sc = tab && $(".scroll", tab); if (!sc) return;
    if (!$("#infoSeg")) {
      const seg = mk("div", "", ""); seg.id = "infoSeg";
      [["call", "📞", L("Call", "Llamar")], ["tools", "🧰", L("Tools", "Herramientas")], ["share", "📲", L("Share", "Compartir")], ["about", "ℹ️", L("About", "Acerca")]]
        .forEach(g => { const b = mk("button", "", `${g[1]} ${g[2]}`); b.dataset.ig = g[0]; seg.appendChild(b); });
      sc.before(seg);
      seg.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; setIg(b.dataset.ig); sc.scrollTop = 0; });
    }
    let hl = 0;
    Array.from(sc.children).forEach(c => {
      if (c.dataset.ig) return;
      let g = "tools";
      if (c.id === "hotlines" || c.id === "phonelines") g = "call";
      else if (c.id === "termsCard" || c.matches("details.aboutdet") || c.id === "hvFresh") g = "about";
      else if (c.classList.contains("sharecard")) g = "share";
      else if (c.classList.contains("hline")) { g = hl === 0 ? "tools" : "about"; hl++; }
      c.dataset.ig = g;
    });
    setIg(window.__igWant || "call"); window.__igWant = null;
  }
  function setIg(g) {
    const tab = $("#tab-info"); if (!tab) return;
    tab.dataset.ig = g;
    $$("#infoSeg button").forEach(b => b.classList.toggle("on", b.dataset.ig === g));
  }

  /* ---------- Settings: collapsible groups ---------- */
  const openGrp = { 0: true };
  function groupSettings() {
    const el = $("#settingsList"); if (!el) return;
    const loose = Array.from(el.children).filter(c => c.tagName !== "DETAILS" && c.id !== "docLight");
    if (el.querySelector(":scope > details.setgrp")) {
      const last = el.querySelector(":scope > details.setgrp[data-key='stuff'] .sgbody");
      loose.forEach(c => { if (c.dataset.navrow || c.querySelector("[data-navmode]")) c.remove(); else if (last) last.appendChild(c); });
      return;
    }
    if (!loose.length) return;
    const defs = [
      { key: "look", ic: "🎨", t: L("Look & text size", "Aspecto y texto") },
      { key: "me", ic: "🧭", t: L("My area & situation", "Mi zona y situación") }
    ];
    const groups = defs.map(d => Object.assign({ items: [] }, d));
    let cur = groups[0], ix = 0, afterAbout = false, aboutKept = false;
    const LAB = [[/access|accesib/i, "♿", "access"], [/lang|idioma/i, "🌍", "lang"], [/offline|sin conex/i, "📶", "offline"],
      [/stuff|tus cosas|your/i, "🧰", "stuff"], [/about|acerca/i, "💜", "about"]];
    const byKey = {}; groups.forEach(g => byKey[g.key] = g);
    loose.forEach(c => {
      if (c.classList.contains("setlabel")) {
        const txt = c.textContent.trim();
        const hit = LAB.find(x => x[0].test(txt));
        const key = hit ? hit[2] : "x" + (ix++);
        if (!byKey[key]) { byKey[key] = { key, ic: hit ? hit[1] : "•", t: txt, items: [] }; groups.push(byKey[key]); }
        cur = byKey[key]; afterAbout = key === "about"; c.remove(); return;
      }
      if (c.querySelector("[data-navmode]")) { c.remove(); return; }
      if (cur.key === "look" && !/^(themeRow|szTextRow|szPinRow)$/.test(c.id)) cur = byKey.me;
      if (afterAbout) {
        if (!aboutKept) { aboutKept = true; cur.items.push(c); return; }
        if (!byKey.stuff) { byKey.stuff = { key: "stuff", ic: "🧰", t: L("Your stuff", "Tus cosas"), items: [] }; groups.splice(groups.indexOf(byKey.about), 0, byKey.stuff); }
        byKey.stuff.items.push(c); return;
      }
      cur.items.push(c);
    });
    const order = ["look", "me", "access", "lang", "stuff", "offline", "about"];
    groups.sort((a, b) => { const ia = order.indexOf(a.key), ib = order.indexOf(b.key); return (ia < 0 ? 50 : ia) - (ib < 0 ? 50 : ib); });
    groups.filter(g => g.items.length).forEach((g, i) => {
      const d = mk("details", "setgrp"); d.dataset.key = g.key;
      d.open = openGrp[g.key] !== undefined ? openGrp[g.key] : i === 0;
      d.innerHTML = `<summary><span class="sgi">${g.ic}</span><span class="sgt">${esc2(g.t)}</span><span class="sgc">›</span></summary><div class="sgbody"></div>`;
      const body = d.querySelector(".sgbody"); g.items.forEach(x => body.appendChild(x));
      d.addEventListener("toggle", () => { openGrp[g.key] = d.open; });
      el.insertBefore(d, $("#docLight", el) || null);
    });
  }
  const sl = $("#settingsList");
  if (sl && window.MutationObserver) {
    let busy = false;
    new MutationObserver(() => { if (busy) return; busy = true; Promise.resolve().then(() => { try { groupSettings(); } catch (e) {} busy = false; }); })
      .observe(sl, { childList: true });
  }

  /* ---------- tips: collapse long tip boxes ---------- */
  function clampTips(tb) {
    $$("#tab-" + tb + " > .tip").forEach(t0 => {
      if (t0.dataset.cl) return; t0.dataset.cl = "1"; t0.classList.add("clamp");
      t0.addEventListener("click", () => t0.classList.toggle("open"));
    });
  }

  /* ---------- hook goTab ---------- */
  function afterNav(tb) {
    const h = hubOf(tb);
    document.body.dataset.tab = tb; document.body.dataset.hub = h.id;
    if (h.id !== "more" && SUB[tb]) lastSub[h.id] = tb;
    if (tb === "ptools") lastSub.work = "programs";
    $$("nav button[data-hub]").forEach(b => {
      b.classList.toggle("on", b.dataset.hub === h.id);
      b.dataset.tab = hubDefault(HUBS.find(x => x.id === b.dataset.hub));
    });
    renderSub(h, tb); setHeader(tb); refreshLabels();
    if (tb === "list") buildPlaces();
    if (tb === "info") buildInfo();
    if (tb === "settings") groupSettings();
    if (tb === "more") renderMore();
    clampTips(tb);
    const sec = $("#tab-" + tb); if (sec && tb !== "map") { const sc = $(".scroll", sec); if (sc && sc.scrollTop && lastTab !== tb) sc.scrollTop = 0; }
    lastTab = tb;
  }
  let lastTab = null;

  const baseGo = goTab;
  goTab = function (tb) { baseGo(tb); afterNav(tb); };
  const baseVis = typeof applyTabVisibility === "function" ? applyTabVisibility : null;
  applyTabVisibility = function () { if (baseVis) { try { baseVis(); } catch (e) {} } refreshLabels(); if (state && state.tab) renderSub(hubOf(state.tab), state.tab); };

  function relabel() {
    refreshLabels();
    const tb = state.tab || "map";
    renderSub(hubOf(tb), tb); setHeader(tb);
    const lt = $("#lfBtn .lfT"); if (lt) lt.textContent = L("Filters", "Filtros");
    const seg = $("#infoSeg");
    if (seg) { const nm = { call: [L("Call", "Llamar"), "📞"], tools: [L("Tools", "Herramientas"), "🧰"], share: [L("Share", "Compartir"), "📲"], about: [L("About", "Acerca"), "ℹ️"] };
      $$("button", seg).forEach(b => { const x = nm[b.dataset.ig]; if (x) b.textContent = x[1] + " " + x[0]; }); }
    if (tb === "more") renderMore();
  }
  if (typeof setLang === "function") { const baseLang = setLang; setLang = function (l) { baseLang(l); try { relabel(); } catch (e) {} }; }

  buildNav();
  ensureMore();
  afterNav(state.tab || "map");
  window.addEventListener("resize", () => { const on = $("#subnav .on"); if (on && on.scrollIntoView) on.scrollIntoView({ inline: "center", block: "nearest" }); });
})();
