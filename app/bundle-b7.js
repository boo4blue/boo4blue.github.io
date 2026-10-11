/* === more-features.js === */
/* Haven FW more-features: "Can I go here?" finder, my pins, private notes, guide search,
   more show-a-card languages, icon-first and high-contrast modes, meal and daily alerts,
   plan progress bar. Everything here stays on the phone. */
"use strict";
(function () {
  const ls = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
  const sv = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  const es = () => typeof settings !== "undefined" && settings.lang === "es";
  const E = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const PLUS_KEYS = ["haven_notes", "haven_pins", "haven_plus"];
  if (typeof BK !== "undefined") PLUS_KEYS.forEach(k => { if (!BK.includes(k)) BK.push(k); });

  function overlay(id, html) {
    const old = document.getElementById(id); if (old) old.remove();
    const ov = document.createElement("div"); ov.id = id; ov.className = "plOv";
    ov.innerHTML = `<div class="plIn">${html}</div>`;
    document.body.appendChild(ov);
    return ov;
  }

  /* ---------- 1. Can I go here? finder (also a quick staff lookup) ---------- */
  const XRX = {
    couples: /couple|spouse|married|partner/,
    nosober: /no sobriety|sobriety (is )?(not )?(required|needed)|low[- ]barrier|no (drug|alcohol) (test|screen)|harm reduction|no sober/,
    record: /felon|criminal record|re-?entry|second chance|expunge|record cleared|with (a )?records?/,
  };
  const FF = [
    ["open", "🟢 Open now", r => openStatus(r).state === "open"],
    ["pets", "🐾 Pets OK", r => QF.pets(r)],
    ["noid", "🪪 No ID needed", r => QF.noid(r)],
    ["fam", "👨‍👩‍👧 Families", r => QF.fam(r)],
    ["couples", "💑 Couples", r => XRX.couples.test(hayOf(r))],
    ["nosober", "🍺 No sobriety needed", r => XRX.nosober.test(hayOf(r))],
    ["record", "🔓 Records OK", r => XRX.record.test(hayOf(r))],
    ["vet", "🎖️ Veterans", r => RX.vet.test(hayOf(r))],
    ["senior", "🧓 Seniors", r => RX.senior.test(hayOf(r))],
    ["wheel", "♿ Accessible", r => !!r.wheel || RX.disab.test(hayOf(r))],
  ];
  function openFinder() {
    const sel = new Set(); let cat = "";
    const ov = overlay("cyOv", `
      <h2>🔎 ${es() ? "¿Puedo ir aquí?" : "Can I go here?"}</h2>
      <p class="sq-sub">${es() ? "Elige lo que necesitas. Haven busca en el texto de cada lugar. Llama para confirmar antes de ir." : "Tap what you need and Haven checks each listing's text. Staff can use this at the front desk. Call to confirm before you go."}</p>
      <div class="plChips" id="cyF"></div>
      <div class="plChips" id="cyC"></div>
      <div id="cyN" class="sq-sub" style="margin:8px 0"></div>
      <div id="cyR"></div>
      <button class="widebtn" id="cyX" style="margin-top:14px">✕ ${es() ? "Cerrar" : "Close"}</button>`);
    const draw = () => {
      ov.querySelector("#cyF").innerHTML = FF.map(([k, l]) => `<button class="langbtn${sel.has(k) ? " on" : ""}" data-f="${k}">${E(l)}</button>`).join("");
      ov.querySelector("#cyC").innerHTML = `<button class="langbtn${cat === "" ? " on" : ""}" data-c="">${es() ? "Todo" : "All types"}</button>` +
        Object.keys(CATS).map(k => `<button class="langbtn${cat === k ? " on" : ""}" data-c="${k}">${CATS[k].icon} ${E(catLabel(k))}</button>`).join("");
      let list = RESOURCES.filter(r => (!cat || r.cats.includes(cat)) && [...sel].every(k => FF.find(f => f[0] === k)[2](r)));
      if (state.loc) list.sort((a, b) => miles(state.loc[0], state.loc[1], a.lat, a.lng) - miles(state.loc[0], state.loc[1], b.lat, b.lng));
      ov.querySelector("#cyN").textContent = list.length + (es() ? " lugares" : " places") + (state.loc ? (es() ? " · más cercanos primero" : " · nearest first") : "");
      ov.querySelector("#cyR").innerHTML = list.slice(0, 40).map(r => {
        const s = openStatus(r);
        return `<button class="plRes" data-id="${r.id}"><span class="ri">${catIcon(r)}</span><span class="rb"><b>${E(r.name)}</b><small>${E(r.addr)}${state.loc ? " · " + E(distText(r, true)) : ""}</small></span><span class="badge ${s.state}">${E(s.text)}</span></button>`;
      }).join("") || `<p class="sq-sub">${es() ? "Nada coincide. Quita un filtro." : "Nothing matches. Try removing a filter."}</p>`;
      ov.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { const k = b.dataset.f; sel.has(k) ? sel.delete(k) : sel.add(k); draw(); });
      ov.querySelectorAll("[data-c]").forEach(b => b.onclick = () => { cat = b.dataset.c; draw(); });
      ov.querySelectorAll("[data-id]").forEach(b => b.onclick = () => { const id = b.dataset.id; ov.remove(); goTab("list"); openSheet(id); });
    };
    ov.querySelector("#cyX").onclick = () => ov.remove();
    draw();
  }

  /* ---------- 2. Private notes and ratings on every place ---------- */
  const NOTE_TAGS = [["respect", "🙂 Staff were respectful"], ["safe", "🛡️ Felt safe"], ["wait", "⏳ Long wait"], ["turned", "🚫 Turned away"], ["again", "💜 Would go again"]];
  function notesBlock(id) {
    const body = document.getElementById("sheetBody"); if (!body || body.querySelector(".plNote")) return;
    const all = ls("haven_notes", {}), n = all[id] || { tags: [], note: "" };
    const box = document.createElement("div"); box.className = "plNote";
    box.innerHTML = `<h4>📝 ${es() ? "Mis notas (privadas)" : "My private notes"}</h4>
      <div class="plChips">${NOTE_TAGS.map(([k, l]) => `<button class="langbtn${n.tags.includes(k) ? " on" : ""}" data-t="${k}">${E(l)}</button>`).join("")}</div>
      <textarea class="plTa" maxlength="500" placeholder="${es() ? "Tu nota sobre este lugar. Solo la ves tú." : "Your note about this place. Only you can see it."}">${E(n.note)}</textarea>`;
    const anchor = body.querySelector(".verifyrow") || body.lastElementChild;
    anchor.parentNode.insertBefore(box, anchor);
    const save = () => { const a = ls("haven_notes", {}); a[id] = n; if (!n.tags.length && !n.note) delete a[id]; sv("haven_notes", a); };
    box.querySelectorAll("[data-t]").forEach(b => b.onclick = () => { const k = b.dataset.t, i = n.tags.indexOf(k); i >= 0 ? n.tags.splice(i, 1) : n.tags.push(k); b.classList.toggle("on", n.tags.includes(k)); save(); });
    box.querySelector("textarea").addEventListener("input", e => { n.note = e.target.value; save(); });
  }
  const _openSheet = openSheet;
  openSheet = function (id) { _openSheet(id); try { notesBlock(id); } catch (e) {} };

  /* ---------- 3. My pins: safe spots, showers, laundry, sleep spots ---------- */
  const PIN_TYPES = [["safe", "🛡️", "Safe spot", "#34d399"], ["shower", "🚿", "Shower", "#b48cf2"], ["laundry", "🧺", "Laundry", "#93c5fd"],
    ["sleep", "🛏️", "Sleep spot", "#fb923c"], ["water", "💧", "Water", "#38bdf8"], ["charge", "🔌", "Charging", "#facc15"], ["other", "⭐", "Other", "#f472b6"]];
  const pinT = k => PIN_TYPES.find(p => p[0] === k) || PIN_TYPES[6];
  let pinLayer = null;
  function drawPins() {
    if (typeof map === "undefined" || !map) return;
    if (pinLayer) map.removeLayer(pinLayer);
    pinLayer = L.layerGroup().addTo(map);
    ls("haven_pins", []).forEach(p => {
      const pt = pinT(p.type);
      L.marker([p.lat, p.lng], {
        icon: L.divIcon({ className: "mk", html: `<div class="pin" style="background:${pt[3]};border:2px dashed #fff">${pt[1]}</div>`, iconSize: hvIS(38), iconAnchor: hvIS(19) }),
        zIndexOffset: 800,
      }).on("click", ev => { L.DomEvent.stopPropagation(ev); pinDetail(p.id); }).addTo(pinLayer);
    });
  }
  function shareText(p) {
    return `📌 ${p.name} (${pinT(p.type)[2]})${p.note ? " - " + p.note : ""}\nhttps://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;
  }
  function pinDetail(id) {
    const p = ls("haven_pins", []).find(x => x.id === id); if (!p) return;
    const pt = pinT(p.type);
    const ov = overlay("pnOv", `<h2>${pt[1]} ${E(p.name)}</h2><p class="sq-sub">${E(pt[2])} · ${es() ? "Solo tú ves este pin" : "Only you see this pin"}</p>
      ${p.note ? `<div class="tip">${E(p.note)}</div>` : ""}
      <a class="widebtn" style="display:block;text-align:center;text-decoration:none" href="geo:${p.lat},${p.lng}?q=${p.lat},${p.lng}(${encodeURIComponent(p.name)})">🧭 ${es() ? "Cómo llegar" : "Directions"}</a>
      <button class="widebtn" id="pnShare">📤 ${es() ? "Compartir con quien confías" : "Share with someone I trust"}</button>
      <button class="widebtn" id="pnDel">🗑️ ${es() ? "Borrar pin" : "Delete pin"}</button>
      <button class="widebtn" id="pnX">✕ ${es() ? "Cerrar" : "Close"}</button>`);
    ov.querySelector("#pnX").onclick = () => ov.remove();
    ov.querySelector("#pnDel").onclick = () => { if (confirm(es() ? "¿Borrar este pin?" : "Delete this pin?")) { sv("haven_pins", ls("haven_pins", []).filter(x => x.id !== id)); ov.remove(); drawPins(); } };
    ov.querySelector("#pnShare").onclick = () => {
      const txt = shareText(p);
      if (navigator.share) navigator.share({ text: txt }).catch(() => {});
      else qaCopyText(txt, es() ? "Copiado" : "Copied");
    };
  }
  function addPin(lat, lng) {
    let type = "safe";
    const ov = overlay("pnOv", `<h2>📌 ${es() ? "Nuevo pin" : "New pin"}</h2><p class="sq-sub">${es() ? "Marca tu propio lugar. Se guarda solo en este teléfono. Puedes compartirlo después." : "Mark your own spot. It is saved only on this phone. You can share it later."}</p>
      <input id="pnName" class="txtin" maxlength="40" placeholder="${es() ? "Nombre" : "Name"}" autocomplete="off">
      <div class="plChips" id="pnTypes" style="margin-top:10px"></div>
      <textarea id="pnNote" class="plTa" maxlength="200" placeholder="${es() ? "Nota (opcional)" : "Note (optional)"}"></textarea>
      <button class="widebtn" id="pnSave">💾 ${es() ? "Guardar pin" : "Save pin"}</button>
      <button class="widebtn" id="pnX">✕ ${es() ? "Cancelar" : "Cancel"}</button>`);
    const draw = () => {
      ov.querySelector("#pnTypes").innerHTML = PIN_TYPES.map(([k, ic, l]) => `<button class="langbtn${type === k ? " on" : ""}" data-k="${k}">${ic} ${E(l)}</button>`).join("");
      ov.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { type = b.dataset.k; draw(); });
    };
    draw();
    ov.querySelector("#pnX").onclick = () => ov.remove();
    ov.querySelector("#pnSave").onclick = () => {
      const name = ov.querySelector("#pnName").value.trim() || pinT(type)[2];
      const a = ls("haven_pins", []);
      a.push({ id: "p" + Date.now(), name, type, note: ov.querySelector("#pnNote").value.trim(), lat, lng });
      sv("haven_pins", a); ov.remove(); drawPins(); toast(es() ? "Pin guardado" : "Pin saved");
    };
  }
  function pinHere() {
    const c = (typeof state !== "undefined" && state.loc) || (map && [map.getCenter().lat, map.getCenter().lng]);
    addPin(c[0], c[1]);
  }

  /* ---------- 4. Guide search ---------- */
  function guideSearch() {
    const list = document.getElementById("guideList"); if (!list) return;
    let box = document.getElementById("guideQ");
    if (!box) {
      const wrap = document.createElement("div"); wrap.style.cssText = "padding:0 16px 10px";
      wrap.innerHTML = `<input id="guideQ" class="txtin" type="search" placeholder="${es() ? "Buscar guías (andador, gafas, vivienda…)" : "Search guides (walker, glasses, housing…)"}" autocomplete="off">`;
      list.parentNode.insertBefore(wrap, list);
      box = wrap.firstElementChild;
      box.addEventListener("input", filterGuides);
    }
    filterGuides();
  }
  function filterGuides() {
    const box = document.getElementById("guideQ"), q = box ? box.value.trim().toLowerCase() : "";
    document.querySelectorAll("#guideList .gcard").forEach(c => { c.style.display = !q || c.textContent.toLowerCase().includes(q) ? "" : "none"; });
  }
  const _renderGuides = renderGuides;
  renderGuides = function () { _renderGuides(); guideSearch(); };

  /* ---------- 5. Show-a-card: more phrases and languages ---------- */
  const MORE = {
    en: ["I need a shower.", "I need a ride.", "I need to make a phone call."],
    es: ["Necesito una ducha.", "Necesito transporte.", "Necesito hacer una llamada."],
  };
  CARDS.en.push(...MORE.en); CARDS.es.push(...MORE.es);
  const CL = {
    my: { n: "မြန်မာ", dir: "ltr", t: ["ဒီည အိပ်ဖို့ ခုတင် လိုပါတယ်။", "အစားအစာ လိုပါတယ်။", "စကားပြန် လိုပါတယ်။", "ဆေးဘက်ဆိုင်ရာ အကူအညီ လိုပါတယ်။", "ဖုန်း အားသွင်းချင်ပါတယ်။", "ဘတ်စ်ကား လက်မှတ် လိုပါတယ်။", "ရေချိုးချင်ပါတယ်။", "သွားလာရေး အကူအညီ လိုပါတယ်။", "ဖုန်းခေါ်ချင်ပါတယ်။"] },
    ar: { n: "العربية", dir: "rtl", t: ["أحتاج إلى سرير الليلة.", "أحتاج إلى طعام.", "أحتاج إلى مترجم.", "أحتاج إلى مساعدة طبية.", "أحتاج إلى شحن هاتفي.", "أحتاج إلى تذكرة حافلة.", "أحتاج إلى الاستحمام.", "أحتاج إلى وسيلة نقل.", "أحتاج إلى إجراء مكالمة هاتفية."] },
    ht: { n: "Kreyòl", dir: "ltr", t: ["Mwen bezwen yon kabann aswè a.", "Mwen bezwen manje.", "Mwen bezwen yon entèprèt.", "Mwen bezwen èd medikal.", "Mwen bezwen chaje telefòn mwen.", "Mwen bezwen yon tikè bis.", "Mwen bezwen pran yon douch.", "Mwen bezwen transpò.", "Mwen bezwen fè yon apèl telefòn."] },
    sw: { n: "Kiswahili", dir: "ltr", t: ["Ninahitaji kitanda usiku wa leo.", "Ninahitaji chakula.", "Ninahitaji mkalimani.", "Ninahitaji msaada wa matibabu.", "Ninahitaji kuchaji simu yangu.", "Ninahitaji tiketi ya basi.", "Ninahitaji kuoga.", "Ninahitaji usafiri.", "Ninahitaji kupiga simu."] },
  };
  showCard = function (i) {
    const old = document.getElementById("cardOv"); if (old) old.remove();
    const ov = document.createElement("div"); ov.id = "cardOv";
    let lang = ls("haven_cardlang", es() ? "es" : "es");
    const draw = () => {
      const second = lang === "es" ? { t: CARDS.es, dir: "ltr" } : CL[lang];
      ov.innerHTML = `<div class="cardOvIn"><div class="cardBig">${E(CARDS.en[i])}</div>
        <div class="cardBig sm" dir="${second.dir}">${E(second.t[i])}</div>
        <div class="cardLangs">${[["es", "Español"]].concat(Object.keys(CL).map(k => [k, CL[k].n])).map(([k, n]) => `<button data-l="${k}" class="${k === lang ? "on" : ""}">${E(n)}</button>`).join("")}</div>
        <button class="widebtn" data-x="1">✕</button></div>`;
      ov.querySelectorAll("[data-l]").forEach(b => b.onclick = e => { e.stopPropagation(); lang = b.dataset.l; sv("haven_cardlang", lang); draw(); });
      ov.querySelector("[data-x]").onclick = () => ov.remove();
    };
    draw(); document.body.appendChild(ov);
  };

  /* ---------- 6. Plan progress bar ---------- */
  const _renderPlan = renderPlan;
  renderPlan = function () {
    _renderPlan();
    const el = document.getElementById("planList"); if (!el || el.querySelector(".plBar")) return;
    const done = state.plan.length, total = PLAN.length, pct = total ? Math.round(100 * done / total) : 0;
    el.insertAdjacentHTML("afterbegin", `<div class="plBar" aria-label="${pct}%"><div class="plBarT"><b>${pct}%</b> ${es() ? "de tu plan" : "of your plan done"} · ${done}/${total}</div><div class="plBarB"><i style="width:${pct}%"></i></div></div>`);
    const bar = el.querySelector(".plBar");
    bar.style.setProperty("--ppct", pct);
    bar.classList.toggle("up-done", pct >= 100);
    bar.classList.toggle("up-half", pct >= 50 && pct < 100);
  };

  /* ---------- 7. Settings: icon-first, high contrast, alerts ---------- */
  const P = () => Object.assign({ icon: false, hc: false, meal: false, lead: 45, daily: false, hour: 9, ids: [] }, ls("haven_plus", {}));
  const putP = p => sv("haven_plus", p);
  function applyPlus() {
    const p = P();
    document.body.classList.toggle("iconfirst", !!p.icon);
    document.body.classList.toggle("hc", !!p.hc);
  }
  const bridge = () => { const b = window.HavenBridge; return b && typeof b.scheduleReminder === "function" ? b : null; };
  function needPerm(b) { try { if (typeof b.hasNotifPermission === "function" && !b.hasNotifPermission()) b.requestNotifPermission(); } catch (e) {} }
  function schedulePlusAlerts() {
    const b = bridge(), p = P(); if (!b) return;
    (p.ids || []).forEach(id => { try { b.cancelReminder(id); } catch (e) {} });
    const ids = [], now = Date.now();
    if (p.meal) {
      needPerm(b);
      (state.favs || []).forEach(id => {
        const r = byId(id); if (!r || !r.hours) return;
        for (let d = 0; d < 4; d++) {
          const day = new Date(); day.setDate(day.getDate() + d);
          const h = r.hours[day.getDay()]; if (!h) continue;
          day.setHours(0, 0, 0, 0);
          const ms = day.getTime() + (h[0] - p.lead) * 60000;
          if (ms <= now + 5000) continue;
          const rid = "meal_" + id + "_" + d;
          try { b.scheduleReminder(rid, es() ? "Haven: pronto abre" : "Haven: opening soon", r.name + (es() ? " abre a las " : " opens at ") + fmtT(h[0]), ms); ids.push(rid); } catch (e) {}
        }
      });
    }
    if (p.daily) {
      needPerm(b);
      for (let d = 0; d < 7; d++) {
        const day = new Date(); day.setDate(day.getDate() + d); day.setHours(p.hour, 0, 0, 0);
        if (day.getTime() <= now + 5000) continue;
        const tip = TIPS[Math.floor(day.getTime() / 86400000) % TIPS.length], rid = "dtip_" + d;
        try { b.scheduleReminder(rid, es() ? "Haven: ánimo de hoy" : "Haven: today's encouragement", tip, day.getTime()); ids.push(rid); } catch (e) {}
      }
    }
    p.ids = ids; putP(p);
  }
  const _renderSettings = renderSettings;
  renderSettings = function () {
    _renderSettings();
    const el = document.getElementById("settingsList"); if (!el || el.querySelector("#plusSet")) return;
    const p = P();
    const sw = (id, on) => `<button class="swbtn${on ? " on" : ""}" id="${id}" role="switch" aria-checked="${on}"><i></i></button>`;
    el.insertAdjacentHTML("beforeend", `<div id="plusSet">
      <div class="setrow"><div class="sic">🖼️</div><div class="sbody"><h3>${es() ? "Modo de íconos" : "Icon-first mode"}</h3><p>${es() ? "Íconos grandes, menos texto. Ayuda si lees poco o ves mal." : "Big icons and less text. Helps with low reading or poor eyesight."}</p></div>${sw("plIcon", p.icon)}</div>
      <div class="setrow"><div class="sic">🌗</div><div class="sbody"><h3>${es() ? "Alto contraste" : "High contrast"}</h3><p>${es() ? "Negro puro y texto brillante." : "Pure black with bright text and strong borders."}</p></div>${sw("plHc", p.hc)}</div>
      <div class="setrow col"><div class="shead"><div class="sic">⏰</div><div class="sbody"><h3>${es() ? "Avisos de lugares guardados" : "Alerts before my saved places open"}</h3><p>${es() ? "Una notificación antes de que abran tus lugares guardados." : "A notification before your saved places open (needs notifications allowed)."}</p></div>${sw("plMeal", p.meal)}</div>
        <div class="langrow">${[30, 45, 60].map(m => `<button class="langbtn${p.lead === m ? " on" : ""}" data-lead="${m}">${m} min</button>`).join("")}</div></div>
      <div class="setrow col"><div class="shead"><div class="sic">🌱</div><div class="sbody"><h3>${es() ? "Ánimo diario" : "Daily encouragement"}</h3><p>${es() ? "Una nota corta de ánimo cada día." : "A short encouragement or tip each day."}</p></div>${sw("plDaily", p.daily)}</div>
        <div class="langrow">${[[8, "8 AM"], [9, "9 AM"], [12, "Noon"], [18, "6 PM"]].map(([h, l]) => `<button class="langbtn${p.hour === h ? " on" : ""}" data-hour="${h}">${l}</button>`).join("")}</div></div>
      <div class="setrow"><div class="sic">📌</div><div class="sbody"><h3>${es() ? "Mis pins" : "My pins"}</h3><p>${es() ? "Mantén presionado el mapa o toca 📌 para marcar un lugar propio." : "Press and hold the map, or tap 📌, to mark your own spot."}</p></div></div>
      ${bridge() ? "" : `<p class="sq-sub" style="padding:0 16px">${es() ? "Los avisos funcionan solo en la app de Android." : "Alerts work only in the Android app."}</p>`}
    </div>`);
    const tog = (id, key) => el.querySelector("#" + id).addEventListener("click", e => {
      const q = P(); q[key] = !q[key]; putP(q); e.currentTarget.classList.toggle("on", q[key]); e.currentTarget.setAttribute("aria-checked", q[key]);
      applyPlus(); schedulePlusAlerts();
    });
    tog("plIcon", "icon"); tog("plHc", "hc"); tog("plMeal", "meal"); tog("plDaily", "daily");
    el.querySelectorAll("[data-lead]").forEach(b => b.onclick = () => { const q = P(); q.lead = +b.dataset.lead; putP(q); el.querySelectorAll("[data-lead]").forEach(x => x.classList.toggle("on", x === b)); schedulePlusAlerts(); });
    el.querySelectorAll("[data-hour]").forEach(b => b.onclick = () => { const q = P(); q.hour = +b.dataset.hour; putP(q); el.querySelectorAll("[data-hour]").forEach(x => x.classList.toggle("on", x === b)); schedulePlusAlerts(); });
  };

  /* ---------- wiring on boot ---------- */
  window.addEventListener("DOMContentLoaded", () => {
    applyPlus();
    // (guide search lives in gm-guides.js now — its synonym search + categories replace the old box)
    // entry points for the finder
    const mkBtn = (id, label) => { const b = document.createElement("button"); b.className = "widebtn"; b.id = id; b.innerHTML = label; b.onclick = openFinder; return b; };
    const near = document.getElementById("nearOpenBtn");
    if (near && !document.getElementById("cyBtn")) near.parentNode.insertBefore(mkBtn("cyBtn", "🔎 " + (es() ? "¿Puedo ir aquí? (filtros)" : "Can I go here? (pets, no ID, couples…)")), near);
    const eb = document.getElementById("extraBtns");
    if (eb && !document.getElementById("cyBtn2")) eb.insertBefore(mkBtn("cyBtn2", "🔎 " + (es() ? "¿Puedo ir aquí? / búsqueda para personal" : "Can I go here? / staff referral lookup")), eb.firstChild);
    // my pins
    const tab = document.getElementById("tab-map");
    if (tab && typeof map !== "undefined" && map) {
      if (!document.getElementById("pinBtn")) {
        const b = document.createElement("button"); b.id = "pinBtn"; b.setAttribute("aria-label", "Add my pin"); b.textContent = "📌"; b.onclick = pinHere;
        tab.appendChild(b);
      }
      map.on("contextmenu", e => addPin(e.latlng.lat, e.latlng.lng));
      drawPins();
    }
    setTimeout(schedulePlusAlerts, 3000);
  });
})();




/* === plus-ui.js === */
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




/* === theme.js === */
/* Haven FW theme: Settings → Appearance (Dark / Light / Auto). Dark is the default. */
"use strict";
(function () {
  const KEY = "haven_theme";
  const get = () => { try { const v = localStorage.getItem(KEY); return ["dark", "light", "auto"].includes(v) ? v : "dark"; } catch (e) { return "dark"; } };
  const mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
  const es = () => typeof settings !== "undefined" && settings.lang === "es";
  const L = (en, s) => (es() ? s : en);
  function apply() {
    const m = get(), light = m === "light" || (m === "auto" && mq && mq.matches);
    document.documentElement.classList.toggle("light", light);
    const tc = document.querySelector('meta[name="theme-color"]'); if (tc) tc.setAttribute("content", light ? "#f3f5fa" : "#0a0e17");
  }
  apply();
  if (mq && mq.addEventListener) mq.addEventListener("change", apply);
  if (typeof BK !== "undefined" && !BK.includes(KEY)) BK.push(KEY);
  window.havenTheme = { get, set: v => { try { localStorage.setItem(KEY, v); } catch (e) {} apply(); }, apply };

  if (typeof renderSettings === "function") {
    const base = renderSettings;
    renderSettings = function () {
      base();
      const el = document.getElementById("settingsList"); if (!el || el.querySelector("#themeRow")) return;
      const cur = get();
      const opts = [["dark", "🌙 " + L("Dark", "Oscuro")], ["light", "☀️ " + L("Light", "Claro")], ["auto", "📱 " + L("Auto", "Auto")]];
      el.insertAdjacentHTML("afterbegin", `<div class="setrow col" id="themeRow"><div class="shead"><div class="sic">🎨</div><div class="sbody"><h3>${L("Appearance", "Apariencia")}</h3><p>${L("Dark, light, or match your phone.", "Oscuro, claro o igual que tu teléfono.")}</p></div></div>
        <div class="langrow">${opts.map(([k, l]) => `<button class="langbtn${cur === k ? " on" : ""}" data-theme="${k}">${l}</button>`).join("")}</div></div>`);
      el.querySelectorAll("[data-theme]").forEach(b => b.addEventListener("click", () => {
        havenTheme.set(b.dataset.theme);
        el.querySelectorAll("[data-theme]").forEach(x => x.classList.toggle("on", x === b));
      }));
    };
  }
})();




/* === learn.js === */
/* Haven FW learn: 🎓 Learn tab — GED / diploma, free courses & apps, college & aid, trades,
   English & citizenship, basic skills, test prep, kids. Links go to the official sites.
   Programs, fees and deadlines change: always confirm on the site or by phone. */
"use strict";
(function () {
  if (typeof TABS === "undefined" || typeof goTab !== "function") return;
  const es = () => settings && settings.lang === "es";
  const L = (en, s) => (es() ? s : en);
  const E = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const CATS_L = [
    ["ged",     "📝", "GED & Diploma",        "GED y diploma"],
    ["courses", "💻", "Free courses & apps",  "Cursos y apps gratis"],
    ["college", "🏫", "College & aid",        "Universidad y ayuda"],
    ["trades",  "🔧", "Trades & careers",     "Oficios y carreras"],
    ["english", "🗣️", "English & citizenship", "Inglés y ciudadanía"],
    ["skills",  "🧰", "Basic & digital skills", "Habilidades básicas"],
    ["test",    "✏️", "Test prep",            "Preparación de exámenes"],
    ["kids",    "🧒", "Kids & family",        "Niños y familia"],
  ];
  const FREE = ["Free", "Gratis"], MOST = ["Free to learn · certificate costs", "Gratis · el certificado cuesta"],
        LOW = ["Free or low cost", "Gratis o bajo costo"], AID = ["Aid available", "Hay ayuda económica"];
  const SEARCH = q => "https://duckduckgo.com/?q=" + encodeURIComponent(q);

  // [id, cat, icon, name, desc, url, cost, app?, extra tags]
  const ITEMS = [
    ["ged-com", "ged", "🎓", "GED.com (official)", "The official GED site. Make a free account, see what the 4 tests cover, take the practice test to check if you're ready, then schedule your test. Test fees vary by state — ask your adult-ed program or WorkOne about help paying.", "https://ged.com", LOW, false, ["GED", "High school equivalency", "Practice test"]],
    ["hiset", "ged", "📘", "HiSET (other equivalency test)", "A second high school equivalency test used in many states. Local adult-education programs can tell you which test(s) they prepare you for in Indiana, so ask before you pay for anything.", "https://hiset.org", LOW, false, ["HiSET", "High school equivalency"]],
    ["in-adulted", "ged", "🏛️", "Indiana adult education (state)", "Indiana's Dept. of Workforce Development lists free adult-education classes — GED/HiSET prep, reading, math and English. Search the site for “adult education” to find classes near Fort Wayne.", "https://www.in.gov/dwd/", FREE, false, ["Free classes", "Adult education", "GED prep"]],
    ["excel-center", "ged", "🏫", "The Excel Center (adult diploma)", "Free public high school for adults in Indiana — earn a real high school diploma, not just an equivalency. Check the site for the Fort Wayne location, ages and what support they offer.", "https://excelcenter.org", FREE, false, ["Adult diploma", "Free tuition"]],
    ["khan-ged", "ged", "📐", "Khan Academy — math, reading, science", "Free lessons and practice from basic math up through algebra, reading and writing, science and social studies. A great free study partner while you prepare for the GED or HiSET.", "https://www.khanacademy.org", FREE, true, ["Free", "Math", "Reading", "Science", "Self-paced"]],
    ["library-ged", "ged", "📚", "Ask the library for study help", "Libraries have free study books, computers, quiet space and often tutors or classes for adult learners. Tap to see library locations on the map.", "", FREE, false, ["Free", "Study space", "Computers"], { cat: "library" }],

    ["alison", "courses", "🧠", "Alison", "Hundreds of free online courses in business, IT, health, language, personal development and more. Learning is free; a certificate or diploma costs extra. Has Android and iPhone apps.", "https://alison.com", MOST, true, ["Free courses", "Certificates", "App"]],
    ["coursera", "courses", "🌐", "Coursera", "University and company courses. Many can be audited free; paid certificates are optional, and financial aid is available if you apply.", "https://www.coursera.org", AID, true, ["Free to audit", "Certificates", "Financial aid"]],
    ["edx", "courses", "🎒", "edX", "College-level courses from universities. Auditing is usually free; verified certificates cost money.", "https://www.edx.org", MOST, true, ["Free to audit", "College courses"]],
    ["ocw", "courses", "🏛️", "MIT OpenCourseWare", "Free lecture notes, videos and problem sets from real MIT classes. No sign-up or certificate — just learning.", "https://ocw.mit.edu", FREE, false, ["Free", "College level", "No sign-up"]],
    ["fcc", "courses", "👨‍💻", "freeCodeCamp", "Free coding lessons and projects for web development, data and more — a path toward tech jobs.", "https://www.freecodecamp.org", FREE, false, ["Free", "Coding", "Tech jobs"]],
    ["grow-google", "courses", "📈", "Grow with Google", "Free beginner training on digital skills, using computers at work, and starting a business.", "https://grow.google", FREE, false, ["Free", "Digital skills", "Career"]],
    ["libby", "courses", "🎧", "Libby (library ebooks & audiobooks)", "With a free library card you can borrow ebooks and audiobooks on your phone. Ask the Allen County Public Library which apps they support.", "https://libbyapp.com", FREE, true, ["Free", "Audiobooks", "Ebooks", "Library card"]],
    ["crashcourse", "courses", "▶️", "Crash Course (YouTube)", "Quick, fun video lessons on history, science, literature, economics and more.", "https://www.youtube.com/@crashcourse", FREE, false, ["Free", "Videos"]],
    ["duolingo", "courses", "🦉", "Duolingo", "Free bite-size language lessons, including Spanish and English.", "https://www.duolingo.com", FREE, true, ["Free", "Languages", "App"]],

    ["fafsa", "college", "💵", "FAFSA (free money for school)", "The free federal form for grants (like Pell), work-study and loans. Never pay anyone to file it — it's always free at studentaid.gov. Many Indiana state aid programs use it too.", "https://studentaid.gov", FREE, false, ["FAFSA", "Grants", "Financial aid"]],
    ["learn-more-in", "college", "🧭", "Learn More Indiana", "Indiana's college-planning hub: find schools, apply for state aid and learn about grants for short career programs (like the Workforce Ready Grant). Check eligibility.", "https://learnmoreindiana.org", FREE, false, ["Indiana", "State aid", "Planning"]],
    ["ivytech", "college", "🏫", "Ivy Tech Community College", "Indiana's community college, with a Fort Wayne campus. Certificates and 2-year degrees, lower tuition, and classes you can transfer to a 4-year school.", "https://www.ivytech.edu", AID, false, ["Community college", "Certificates", "Transfer"]],
    ["pfw", "college", "🎓", "Purdue Fort Wayne", "4-year public university in Fort Wayne. Ask the admissions and financial-aid offices about aid and adult-student options.", "https://www.pfw.edu", AID, false, ["University", "Fort Wayne"]],
    ["iufw", "college", "🎓", "IU Fort Wayne", "The Indiana University side of the Fort Wayne campus. Search the name for programs, admissions and aid.", SEARCH("IU Fort Wayne admissions"), AID, false, ["University", "Fort Wayne"]],
    ["usf", "college", "🎓", "University of Saint Francis", "Private university in Fort Wayne with many health and education programs. Ask about scholarships.", "https://www.sf.edu", AID, false, ["University", "Fort Wayne", "Scholarships"]],
    ["21cs", "college", "⭐", "21st Century Scholars (Indiana)", "Indiana scholarship for income-eligible students — students usually must sign up in 7th or 8th grade, so tell any young person you know about it.", "https://scholars.in.gov", FREE, false, ["Scholarship", "Indiana", "Middle school"]],
    ["bigfuture", "college", "🔎", "BigFuture (College Board)", "Free tools to search colleges, plan costs and find scholarships.", "https://bigfuture.collegeboard.org", FREE, false, ["Free", "Scholarship search", "College search"]],
    ["commonapp", "college", "📨", "Common App", "Apply to many colleges with one application. Fee waivers are available if cost is a barrier.", "https://www.commonapp.org", AID, false, ["Applications", "Fee waivers"]],
    ["fastweb", "college", "💰", "Fastweb scholarship search", "Free scholarship matching. Never pay a fee to “find” scholarships.", "https://www.fastweb.com", FREE, false, ["Free", "Scholarships"]],
    ["clep", "college", "⏱️", "CLEP (college credit by exam)", "Pass an exam, earn college credit, and save time and tuition. Check that your school accepts it.", "https://clep.collegeboard.org", LOW, false, ["College credit", "Exams"]],
    ["gibill", "college", "🎖️", "GI Bill (veterans)", "Veterans and family members can use education benefits for college, trades and training. Ask the Allen County Veterans Service Office to help you apply.", "https://www.va.gov/education/", FREE, false, ["Veterans", "Benefits"], { cat: "veterans", label: ["Veterans places", "Lugares para veteranos"] }],

    ["apprentice", "trades", "🛠️", "Apprenticeship.gov", "Earn while you learn: paid on-the-job training in the trades and other careers. Search by job and state.", "https://www.apprenticeship.gov", FREE, false, ["Paid training", "Trades", "Earn & learn"]],
    ["careeronestop", "trades", "🧭", "CareerOneStop (U.S. Dept. of Labor)", "Explore careers, find training and certifications, and search jobs, with free tools like a skills matcher.", "https://www.careeronestop.org", FREE, false, ["Career", "Training finder"]],
    ["onet", "trades", "🔬", "O*NET OnLine", "See what any job involves, what it pays and what skills it needs.", "https://www.onetonline.org", FREE, false, ["Career explorer", "Pay"]],
    ["jobcorps-l", "trades", "🏕️", "Job Corps & residential programs", "Live on-site while you learn a trade, with housing and meals. See the Programs tab.", "", FREE, false, ["Free", "Housing", "Trades"], { tab: "programs", label: ["Open Programs tab", "Abrir Programas"] }],
    ["workone-l", "trades", "💼", "Job help in Fort Wayne", "WorkOne and other local career centers offer resume help, training and job leads. Tap to see them on the Places list.", "", FREE, false, ["Free", "Resume", "Job training"], { cat: "jobsedu" }],
    ["gg-certs", "trades", "🎫", "Google Career Certificates", "Job-ready training for jobs like IT support and data analysis. Not free, but financial aid and scholarships exist — apply for aid first.", "https://grow.google/certificates/", AID, false, ["Certificates", "IT", "Aid available"]],

    ["usalearns", "english", "🇺🇸", "USA Learns", "Free online English lessons plus citizenship and reading help, made for adults.", "https://www.usalearns.org", FREE, false, ["Free", "ESL", "Citizenship"]],
    ["voa", "english", "🎙️", "VOA Learning English", "Free news stories, lessons and videos written for English learners.", "https://learningenglish.voanews.com", FREE, false, ["Free", "ESL", "Listening"]],
    ["uscis", "english", "🗽", "USCIS citizenship study tools", "Free official civics and English test study materials — flashcards, practice and an app.", "https://www.uscis.gov/citizenship", FREE, true, ["Free", "Citizenship", "Civics test"]],
    ["newcomers-l", "english", "🌍", "Local help for new arrivals", "Local groups that help immigrants and refugees with English, paperwork and jobs. Tap to see them.", "", FREE, false, ["Free", "ESL", "Immigrants"], { cat: "newcomers" }],

    ["gcf", "skills", "🖱️", "GCFGlobal (GCFLearnFree)", "Free, simple tutorials on computers, email, the internet, Word, Excel, resumes, job skills and money.", "https://edu.gcfglobal.org", FREE, false, ["Free", "Computers", "Resume", "Beginner"]],
    ["typing", "skills", "⌨️", "Typing.com", "Free typing lessons — a fast way to look more job-ready.", "https://www.typing.com", FREE, false, ["Free", "Typing"]],
    ["proliteracy", "skills", "📖", "ProLiteracy — adult reading help", "Find adult literacy programs and tutors if you want to read or write better. Libraries often connect adults with tutors too.", "https://www.proliteracy.org", FREE, false, ["Reading", "Literacy"]],
    ["khan-math", "skills", "➗", "Khan Academy — start from the basics", "Starts at basic arithmetic and lets you go at your own speed. Free, and nobody sees your score but you.", "https://www.khanacademy.org/math", FREE, true, ["Free", "Math", "Beginner"]],

    ["sat-khan", "test", "✏️", "Official SAT practice (Khan Academy)", "Free, official SAT practice with personalized study plans.", "https://www.khanacademy.org/test-prep/sat", FREE, true, ["Free", "SAT"]],
    ["asvab", "test", "🪖", "ASVAB (military entrance test)", "Info and practice for the test used to enlist. Ask a recruiter or your school about free versions.", "https://www.officialasvab.com", FREE, false, ["Military", "Practice test"]],
    ["ged-test-l", "test", "📝", "GED practice", "The official GED site has practice tests that show whether you're ready. See the GED & Diploma section.", "", LOW, false, ["GED", "Practice test"], { filt: "ged", label: ["Go to GED section", "Ir a GED"] }],

    ["khan-kids", "kids", "🧸", "Khan Academy Kids", "Free learning app for ages 2–8: reading, math and stories. No ads.", "https://learn.khanacademy.org/khan-academy-kids/", FREE, true, ["Free", "Ages 2–8", "App"]],
    ["pbskids", "kids", "📺", "PBS Kids", "Free games and videos that teach reading, math and science.", "https://pbskids.org", FREE, true, ["Free", "Games", "Videos"]],
    ["scratch", "kids", "🐱", "Scratch (kids coding)", "Free, fun block-based coding for kids to make games and stories.", "https://scratch.mit.edu", FREE, false, ["Free", "Coding", "Kids"]],
    ["headstart", "kids", "🏠", "Head Start (free preschool)", "Free early learning for young children in low-income families, plus family support. Use the site to find a program in Allen County.", "https://eclkc.ohs.acf.hhs.gov", FREE, false, ["Free", "Preschool", "Families"]],
    ["library-kids", "kids", "📚", "Library story times & homework help", "Libraries have free story times, homework help and summer reading programs. Tap to see library locations.", "", FREE, false, ["Free", "Story time", "Homework help"], { cat: "library" }],
  ];

  const STEPS = [
    ["🪪", "Gather your papers", "Reúne tus documentos", "Programs usually ask for a photo ID and proof you live in the area. Requirements vary — ask first."],
    ["🏫", "Find free classes", "Busca clases gratis", "Call or visit adult education, WorkOne or the library. Classes and tutoring are usually free."],
    ["🧪", "Take a practice test", "Haz un examen de práctica", "See where you stand before you study, so you spend time where it helps."],
    ["📚", "Study a little every day", "Estudia un poco cada día", "15–30 minutes a day beats one long night. Khan Academy is free for math, reading and science."],
    ["📅", "Register and test", "Inscríbete y presenta", "Sign up at GED.com (or for HiSET), schedule it, and bring your ID. Ask about help with test fees."],
    ["🚀", "Plan your next step", "Planea tu siguiente paso", "Use your GED or diploma for college, a trade program or a better job. Check the other sections here."],
  ];

  const st = { cat: "all", q: "", free: false, steps: false };
  const costOf = i => (es() ? i[6][1] : i[6][0]);

  function card(i) {
    const ex = i[9] || {};
    const free = i[6] === FREE;
    const btns = [];
    if (i[5]) btns.push(`<a class="qbtn primary" href="${E(i[5])}" target="_blank" onclick="event.stopPropagation()">${L("Open", "Abrir")} ↗</a>`);
    if (ex.cat) btns.push(`<button class="qbtn${i[5] ? "" : " primary"}" data-lcat="${ex.cat}">${E(ex.label ? (es() ? ex.label[1] : ex.label[0]) : L("See places", "Ver lugares"))}</button>`);
    if (ex.tab) btns.push(`<button class="qbtn primary" data-ltab="${ex.tab}">${E(es() ? ex.label[1] : ex.label[0])}</button>`);
    if (ex.filt) btns.push(`<button class="qbtn primary" data-lfilt="${ex.filt}">${E(es() ? ex.label[1] : ex.label[0])}</button>`);
    const cl = CATS_L.find(c => c[0] === i[1]);
    return `<div class="card learncard">
      <div class="lhead"><div class="lic">${i[2]}</div><div style="flex:1;min-width:0"><h3>${E(i[3])}</h3>
        <div class="meta"><span class="badge ${free ? "open" : "unknown"}">${E(costOf(i))}</span>${i[7] ? `<span class="catpill">📱 ${L("App", "App")}</span>` : ""}<span class="catpill">${cl[1]} ${E(es() ? cl[3] : cl[2])}</span></div></div></div>
      <p class="desc" style="margin-top:6px">${E(i[4])}</p>
      ${i[8] && i[8].length ? `<div class="tagrow">${i[8].map(t => `<span class="tag">✓ ${E(t)}</span>`).join("")}</div>` : ""}
      <div class="quick">${btns.join("")}</div></div>`;
  }

  function render() {
    const el = document.getElementById("learnBody"); if (!el) return;
    const chips = `<button class="chip${st.cat === "all" ? " on" : ""}" data-c="all">${L("All", "Todo")}</button>` +
      CATS_L.map(c => `<button class="chip${st.cat === c[0] ? " on" : ""}" data-c="${c[0]}">${c[1]} ${E(es() ? c[3] : c[2])}</button>`).join("");
    document.getElementById("learnChips").innerHTML = chips;
    const tf = document.getElementById("learnFree"); tf.classList.toggle("on", st.free);
    const q = st.q.trim().toLowerCase();
    const list = ITEMS.filter(i => {
      if (st.cat !== "all" && i[1] !== st.cat) return false;
      if (st.free && i[6] !== FREE) return false;
      if (q && !(i[3] + " " + i[4] + " " + (i[8] || []).join(" ") + " " + i[6][0]).toLowerCase().includes(q)) return false;
      return true;
    });
    const showSteps = (st.cat === "all" || st.cat === "ged") && !q;
    let h = "";
    if (showSteps) {
      h += `<div class="card learnsteps${st.steps ? " open" : ""}" id="learnSteps"><button class="lsHead" id="lsToggle"><span class="lic">🗺️</span><span style="flex:1;text-align:left"><b>${L("How to get your GED — step by step", "Cómo obtener tu GED — paso a paso")}</b><small>${L("6 steps · tap to open", "6 pasos · toca para abrir")}</small></span><span class="gchev">›</span></button>
        <ol class="lsBody">${STEPS.map(s => `<li><span class="n">${s[0]}</span><div><b>${E(es() ? s[2] : s[1])}</b><p>${E(s[3])}</p></div></li>`).join("")}</ol></div>`;
    }
    h += list.length ? list.map(card).join("") : `<div class="empty"><div class="big">🔍</div><h3>${L("Nothing found", "No se encontró nada")}</h3><p>${L("Try a different word or category.", "Prueba otra palabra o categoría.")}</p></div>`;
    h += `<p class="learnnote">${L("Programs, fees and deadlines change — check the website or call to confirm. Links need internet.", "Los programas, costos y fechas cambian — confirma en el sitio o por teléfono. Los enlaces necesitan internet.")}</p>`;
    el.innerHTML = h;
    el.querySelectorAll("[data-lcat]").forEach(b => b.addEventListener("click", () => { state.cats = [b.dataset.lcat]; if (typeof renderChips === "function") renderChips(); goTab("list"); }));
    el.querySelectorAll("[data-ltab]").forEach(b => b.addEventListener("click", () => goTab(b.dataset.ltab)));
    el.querySelectorAll("[data-lfilt]").forEach(b => b.addEventListener("click", () => { st.cat = b.dataset.lfilt; render(); document.getElementById("tab-learn").scrollTop = 0; el.scrollTop = 0; }));
    const ls = el.querySelector("#lsToggle");
    if (ls) ls.addEventListener("click", () => { st.steps = !st.steps; el.querySelector("#learnSteps").classList.toggle("open", st.steps); });
    document.querySelectorAll("#learnChips [data-c]").forEach(b => b.addEventListener("click", () => { st.cat = b.dataset.c; render(); }));
  }

  /* ---- DOM: section, nav button, drawer entry ---- */
  const main = document.querySelector("main");
  if (main && !document.getElementById("tab-learn")) {
    const sec = document.createElement("section"); sec.className = "tab"; sec.id = "tab-learn";
    sec.innerHTML = `<div class="secHead"><h2 id="learnTitle"></h2><p id="learnSub"></p></div>
      <div class="searchbar" style="margin:0 16px 10px"><span class="mag">🔍</span><input id="learnQ" type="search" autocomplete="off"><button class="iconbtn" id="learnClear" aria-label="Clear">✕</button></div>
      <div class="chips listchips" id="learnChips"></div>
      <div class="listopts" style="padding:0 16px 8px"><div class="toggle" id="learnFree"><span id="learnFreeL"></span><span class="sw"></span></div></div>
      <div class="scroll" id="learnBody" style="padding-top:2px"></div>`;
    main.appendChild(sec);
    const txt = () => {
      document.getElementById("learnTitle").textContent = "🎓 " + L("Learn", "Aprender");
      document.getElementById("learnSub").textContent = L("GED, free courses & apps, college, trades — everything to help you learn", "GED, cursos y apps gratis, universidad, oficios — todo para aprender");
      document.getElementById("learnQ").placeholder = L("Search GED, Alison, FAFSA, English…", "Buscar GED, Alison, FAFSA, inglés…");
      document.getElementById("learnFreeL").textContent = L("Free only", "Solo gratis");
    };
    txt();
    document.getElementById("learnQ").addEventListener("input", e => { st.q = e.target.value; render(); });
    document.getElementById("learnClear").addEventListener("click", () => { st.q = ""; document.getElementById("learnQ").value = ""; render(); });
    document.getElementById("learnFree").addEventListener("click", () => { st.free = !st.free; render(); });
    window.__learnTxt = txt;
  }
  const nav = document.querySelector("nav");
  if (nav && !nav.querySelector('[data-tab="learn"]')) {
    const b = document.createElement("button"); b.dataset.tab = "learn";
    b.innerHTML = `<span class="ni">🎓</span><span data-i18n="nav_learn">Learn</span>`;
    b.addEventListener("click", () => goTab("learn"));
    const ref = nav.querySelector('[data-tab="jobs"]'); nav.insertBefore(b, ref ? ref.nextSibling : null);
  }
  if (!TABS.some(x => x[0] === "learn")) {
    const i = TABS.findIndex(x => x[0] === "programs"); TABS.splice(i < 0 ? TABS.length - 3 : i + 1, 0, ["learn", "📚", "nav_learn"]);
  }
  if (typeof STRINGS !== "undefined") { STRINGS.en.nav_learn = "Learn"; STRINGS.es.nav_learn = "Aprender"; if (STRINGS.my) STRINGS.my.nav_learn = "လေ့လာရန်"; }
  if (typeof renderDrawer === "function") renderDrawer();
  if (typeof applyI18n === "function") applyI18n();

  const baseGo = goTab;
  goTab = function (tb) { baseGo(tb); if (tb === "learn") { if (window.__learnTxt) window.__learnTxt(); render(); } };
  window.goLearn = () => goTab("learn");
})();




/* === flyer-share.js === */
/* ---------- Flyer sharing ----------
   Tap a flyer -> bottom sheet: Share (any app) / Text / Email / Copy / Print.
   The recipient does NOT need Haven FW: the flyer goes out as plain text.
   If the native bridge has shareFlyer(html,title,text) (see the patch notes),
   it is used first so the flyer goes out as a picture (Bluetooth, Instagram,
   Snapchat, Messenger...). Loaded after app.js. */
"use strict";
(function () {
  Object.assign(STRINGS.en, {
    fshare_title: "Share this flyer", fshare_any: "Share…", fshare_any_s: "Messenger, Instagram, Snapchat, Bluetooth, email…",
    fshare_sms: "Text message", fshare_mail: "Email", fshare_copy: "Copy text", fshare_copy_s: "Paste anywhere",
    fshare_copied: "Copied — paste it anywhere", fshare_print: "Print", fshare_close: "Close",
    fshare_hint: "If nothing opened, tap Copy text and paste it.", fshare_from: "Shared from the Haven FW app"
  });
  Object.assign(STRINGS.es, {
    fshare_title: "Compartir este volante", fshare_any: "Compartir…", fshare_any_s: "Messenger, Instagram, Snapchat, Bluetooth, correo…",
    fshare_sms: "Mensaje de texto", fshare_mail: "Correo", fshare_copy: "Copiar texto", fshare_copy_s: "Pégalo donde quieras",
    fshare_copied: "Copiado — pégalo donde quieras", fshare_print: "Imprimir", fshare_close: "Cerrar",
    fshare_hint: "Si no se abrió nada, toca Copiar texto y pégalo.", fshare_from: "Compartido desde la app Haven FW"
  });

  const BLOCK = { DIV: 1, P: 1, H1: 1, H2: 1, H3: 1, UL: 1, OL: 1, LI: 1, BR: 1, TABLE: 1, TR: 1 };

  /* Flyer HTML -> tidy plain text */
  function flyerText(id, compact) {
    const doc = new DOMParser().parseFromString(buildFlyerHTML(id), "text/html");
    doc.querySelectorAll("style,script").forEach(n => n.remove());
    let out = "";
    const nl = (n) => { out = out.replace(/[ \t]+$/, ""); if (!out) return; const have = out.match(/\n*$/)[0].length; out += "\n".repeat(Math.max(0, n - have)); };
    (function walk(node) {
      node.childNodes.forEach(c => {
        if (c.nodeType === 3) { const s = c.nodeValue.replace(/\s+/g, " "); if (s.trim() || (out && !out.endsWith("\n") && !out.endsWith(" "))) out += s; return; }
        if (c.nodeType !== 1) return;
        const cls = c.className || "", par = c.parentNode, pcls = (par && par.className) || "";
        if (compact && /\bds\b/.test(cls)) return;
        if (c.tagName === "BR" && par && par.parentNode && /\bhl\b/.test(par.parentNode.className || "")) { out += " — "; return; }
        const inl = (c.tagName === "DIV" && (/\bhli\b/.test(cls) || /\bhl\b/.test(pcls)));
        const isB = (BLOCK[c.tagName] && !inl) || (c.tagName === "SPAN" && /\b(fine|rmfoot)\b/.test(pcls));
        if (c.tagName === "H2" || /\b(rsech)\b/.test(cls)) nl(2); else if (isB) nl(1);
        if (c.tagName === "LI") out += "• ";
        walk(c);
        if (/\bhli\b/.test(cls)) out += " ";
        if (/\b(card|rsec|hl)\b/.test(cls) || c.tagName === "H1") nl(2); else if (isB) nl(1);
      });
    })(doc.body);
    out = out.replace(/\u00a0/g, " ").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    const link = (typeof SHARE_URL !== "undefined") ? SHARE_URL : "";
    return out + "\n\n" + t("fshare_from") + (link ? ": " + link : "");
  }

  function flyerName(id) {
    const f = (typeof FLYERS !== "undefined" && FLYERS.find(x => x.id === id));
    if (f) return f.icon + " " + t("fly_" + id);
    const rf = (typeof RESCUE_FLYERS !== "undefined" && RESCUE_FLYERS.find(x => x.id === id));
    return rf ? rf.icon + " " + t(rf.titleKey) : "Haven FW";
  }

  /* Launch an external-app URL from an iframe so a scheme the app can't
     handle fails quietly instead of replacing the whole page. */
  function launch(url) {
    const f = document.createElement("iframe");
    f.style.cssText = "display:none;width:0;height:0;border:0";
    f.src = url;
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 2500);
  }

  /* The app's WebView can't open mailto: links (it shows an error page and
     breaks the app), so email goes out through an Android intent instead. */
  window.havenMail = function (subject, body) {
    launch("intent://share#Intent;action=android.intent.action.SEND;type=message/rfc822;" +
      "S.android.intent.extra.SUBJECT=" + encodeURIComponent(subject || "") + ";" +
      "S.android.intent.extra.TEXT=" + encodeURIComponent(body || "") + ";end");
    setTimeout(() => toast(t("fshare_hint")), 1800);
  };

  function copyText(txt) {
    const ok = () => toast(t("fshare_copied"));
    const old = () => {
      const ta = document.createElement("textarea");
      ta.value = txt; ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.appendChild(ta); ta.focus(); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) {}
      ta.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, old); else old();
  }

  function shareAny(id, title, txt) {
    const b = window.HavenBridge;
    try { if (b && typeof b.shareFlyer === "function") { b.shareFlyer(buildFlyerHTML(id), title, txt); return; } } catch (e) {}
    if (navigator.share) { navigator.share({ title: title, text: txt }).catch(() => {}); return; }
    launch("intent://share#Intent;action=android.intent.action.SEND;type=text/plain;" +
      "S.android.intent.extra.SUBJECT=" + encodeURIComponent(title) + ";" +
      "S.android.intent.extra.TEXT=" + encodeURIComponent(txt) + ";end");
    setTimeout(() => toast(t("fshare_hint")), 1800);
  }

  function injectCss() {
    if (document.getElementById("fshareCss")) return;
    const s = document.createElement("style"); s.id = "fshareCss";
    s.textContent =
      "#fshare{position:fixed;inset:0;z-index:998;background:rgba(0,0,0,.55);display:flex;align-items:flex-end}" +
      "#fshare .fs-sheet{width:100%;max-height:85%;overflow:auto;background:var(--card,#141b2e);color:var(--txt,#f2f5fb);" +
      "border-radius:18px 18px 0 0;padding:14px 14px calc(14px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--line,#26304a)}" +
      "#fshare .fs-h{font-weight:800;font-size:16px;margin:2px 4px 10px}" +
      "#fshare .fs-btn{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:13px 12px;margin-bottom:8px;" +
      "border-radius:12px;border:1px solid var(--line,#26304a);background:var(--card2,#1a2338);color:inherit;font-size:15px;font-weight:700}" +
      "#fshare .fs-btn small{display:block;font-weight:500;font-size:12px;color:var(--mut,#9aa4bb);margin-top:2px}" +
      "#fshare .fs-btn .fi{font-size:22px}" +
      "#fshare .fs-pri{background:var(--grad,linear-gradient(135deg,#6ea8ff,#8a7bff));color:#0a0e17;border:0}" +
      "#fshare .fs-pri small{color:rgba(10,14,23,.75)}" +
      "#fshare .fs-x{justify-content:center;background:transparent;margin:4px 0 0}";
    document.head.appendChild(s);
  }

  window.openFlyerSheet = function (id) {
    injectCss();
    const old = document.getElementById("fshare"); if (old) old.remove();
    const title = flyerName(id) + " · Haven FW";
    let txt = "";
    try { txt = flyerText(id); } catch (e) { txt = title; }
    const ov = document.createElement("div"); ov.id = "fshare";
    const row = (cls, ic, name, sub, act) =>
      '<button class="fs-btn ' + cls + '" data-act="' + act + '"><span class="fi">' + ic + '</span><span>' +
      fesc(name) + (sub ? "<small>" + fesc(sub) + "</small>" : "") + "</span></button>";
    ov.innerHTML = '<div class="fs-sheet"><div class="fs-h">' + fesc(flyerName(id)) + " — " + fesc(t("fshare_title")) + "</div>" +
      row("fs-pri", "📤", t("fshare_any"), t("fshare_any_s"), "any") +
      row("", "💬", t("fshare_sms"), "", "sms") +
      row("", "✉️", t("fshare_mail"), "", "mail") +
      row("", "📋", t("fshare_copy"), t("fshare_copy_s"), "copy") +
      row("", "🖨️", t("fshare_print"), "", "print") +
      row("fs-x", "", t("fshare_close"), "", "close") + "</div>";
    document.body.appendChild(ov);
    const close = () => ov.remove();
    ov.addEventListener("click", e => {
      if (e.target === ov) return close();
      const b = e.target.closest("[data-act]"); if (!b) return;
      const a = b.getAttribute("data-act");
      if (a === "close") close();
      else if (a === "any") shareAny(id, title, txt);
      else if (a === "sms") window.location.href = "sms:?body=" + encodeURIComponent(flyerText(id, true));
      else if (a === "mail") window.havenMail(title, txt);
      else if (a === "copy") copyText(txt);
      else if (a === "print") { close(); printFlyerId(id); }
    });
  };
})();




/* === polish.js === */
/* Haven FW polish: keep the active bottom-nav tab centered when the bar scrolls */
"use strict";
(function () {
  const nav = document.querySelector("nav");
  if (!nav) return;
  const center = () => {
    const b = nav.querySelector("button.on");
    if (b && b.scrollIntoView) b.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  };
  new MutationObserver(center).observe(nav, { subtree: true, attributes: true, attributeFilter: ["class"] });
  setTimeout(center, 600);
})();

/* Haven FW polish v2: one-tap theme button in the header (Dark → Light → Auto), synced with Settings */
(function () {
  const t = window.havenTheme, info = document.getElementById("infoBtn");
  if (!t || !info || document.getElementById("themeBtn")) return;
  const ICON = { dark: "🌙", light: "☀️", auto: "📱" }, ORDER = ["dark", "light", "auto"], root = document.documentElement;
  const btn = document.createElement("button");
  btn.className = "iconbtn"; btn.id = "themeBtn";
  const sync = () => {
    const m = t.get(); btn.textContent = ICON[m] || ICON.dark; btn.setAttribute("aria-label", "Theme: " + m);
    document.querySelectorAll("[data-theme]").forEach(x => x.classList.toggle("on", x.dataset.theme === m));
  };
  const rawSet = t.set;
  t.set = v => { root.classList.add("theme-anim"); rawSet(v); sync(); setTimeout(() => root.classList.remove("theme-anim"), 450); };
  btn.addEventListener("click", () => t.set(ORDER[(ORDER.indexOf(t.get()) + 1) % ORDER.length]));
  info.parentNode.insertBefore(btn, info); sync();
})();

/* Haven FW polish v3: guided start questionnaire (language → accessibility → about you → review) */
(function () {
  if (typeof openStartQ !== "function" || typeof settings === "undefined") return;
  const X = {
    en: { n: "Step {n} of {t}", next: "Next", back: "Back", fin: "Finish", skip: "Skip — show everything", cancel: "Cancel",
      w1: "Welcome to Haven", w2: "Free help in Fort Wayne. Pick your language, then answer a few quick questions so Haven fits you. Nothing leaves your phone.",
      a1: "Make Haven easier to use", a2: "Tap any that help. You can change this later.",
      y1: "A little about you", y2: "Tap any that fit. Haven highlights help for you.",
      r1: "Your Haven", r2: "Check this looks right, then finish.",
      none: "Nothing selected, so Haven will show everything.", will: "Haven will", big: "Use larger text", tts: "Read aloud",
      hide: "Hide tabs: ", mark: "Highlight help for: ", later: "Change anytime: Settings → My situation",
      d: { eyes: "Turns on larger text", read: "Reads guides and places aloud", simple: "Larger text and fewer tabs", kids: "Family and children's help", vet: "Veteran services", senior: "Senior services", disab: "Accessible places and services", record: "Re-entry help, keeps Jobs tabs", newus: "Language and newcomer help", pets: "Pet-friendly help", work: "Keeps Jobs and Gigs tabs" },
      tab: { jobs: "Jobs", events: "Events", gigs: "Gigs", programs: "Programs", chat: "Chat" } },
    es: { n: "Paso {n} de {t}", next: "Siguiente", back: "Atrás", fin: "Terminar", skip: "Omitir — mostrar todo", cancel: "Cancelar",
      w1: "Bienvenido a Haven", w2: "Ayuda gratis en Fort Wayne. Elige tu idioma y responde unas preguntas para que Haven se adapte a ti. Nada sale de tu teléfono.",
      a1: "Haz Haven más fácil de usar", a2: "Toca lo que te ayude. Puedes cambiarlo después.",
      y1: "Un poco sobre ti", y2: "Toca lo que te aplique. Haven destaca ayuda para ti.",
      r1: "Tu Haven", r2: "Revisa que todo esté bien y termina.",
      none: "No elegiste nada, así que Haven mostrará todo.", will: "Haven va a", big: "Usar texto más grande", tts: "Leer en voz alta",
      hide: "Ocultar pestañas: ", mark: "Destacar ayuda para: ", later: "Cámbialo cuando quieras: Ajustes → Mi situación",
      d: { eyes: "Activa el texto más grande", read: "Lee guías y lugares en voz alta", simple: "Texto grande y menos pestañas", kids: "Ayuda para familias y niños", vet: "Servicios para veteranos", senior: "Servicios para mayores", disab: "Lugares y servicios accesibles", record: "Ayuda de reinserción, mantiene Empleos", newus: "Ayuda de idioma y para recién llegados", pets: "Ayuda con mascotas", work: "Mantiene Empleos y Trabajos" },
      tab: { jobs: "Empleos", events: "Eventos", gigs: "Trabajos", programs: "Programas", chat: "Chat" } }
  };
  const STEPS = ["lang", "access", "you", "review"], ACC = ["eyes", "read", "simple"],
    YOU = ["kids", "vet", "senior", "disab", "record", "newus", "pets", "work"];
  const x = k => (X[settings.lang] || X.en)[k];
  const E = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const split = k => { const m = qt(k).match(/^(\S+)\s+([\s\S]*)$/); return m ? [m[1], m[2]] : ["•", qt(k)]; };
  const hiddenTabs = a => {
    if (a.simple) return ["jobs", "events", "gigs", "programs", "chat"];
    if (!Object.values(a).some(Boolean)) return [];
    return a.work || a.record ? [] : ["jobs", "gigs"];
  };

  openStartQ = function (fromSettings) {
    let ov = document.getElementById("startQ");
    if (!ov) { ov = document.createElement("div"); ov.id = "startQ"; document.body.appendChild(ov); }
    ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
    const cur = Object.assign({}, (settings.profile && settings.profile.a) || {});
    const names = { en: "English", es: "Español", my: "မြန်မာ" };
    let i = 0, dir = 1;
    const finish = skip => {
      if (skip) { if (!fromSettings) settings.profile = { done: true, showAll: true, a: {} }; }
      else {
        settings.profile = { done: true, showAll: false, a: cur };
        if (cur.eyes || cur.simple) settings.largeText = true;
        if (cur.read) settings.tts = true;
      }
      saveSettings(); applySettings(); ov.remove(); renderList(); renderJobs();
      if (state.tab === "settings") renderSettings();
    };
    const opt = k => {
      const p = split(k);
      return `<button class="sqx-opt${cur[k] ? " on" : ""}" data-k="${k}" aria-pressed="${!!cur[k]}"><span class="sqx-ic">${E(p[0])}</span><span class="sqx-tx"><b>${E(p[1])}</b><small>${E(x("d")[k])}</small></span><span class="sqx-ck">✓</span></button>`;
    };
    const head = (a, b) => `<h2>${E(x(a))}</h2><p class="sq-sub">${E(x(b))}</p>`;
    const review = () => {
      const on = ACC.concat(YOU).filter(k => cur[k]);
      if (!on.length) return `<p class="sqx-none">${E(x("none"))}</p>`;
      const hid = hiddenTabs(cur), mk = YOU.filter(k => cur[k]), rows = [];
      if (cur.eyes || cur.simple) rows.push(["🔎", x("big")]);
      if (cur.read) rows.push(["🔊", x("tts")]);
      if (mk.length) rows.push(["⭐", x("mark") + mk.map(k => split(k)[1]).join(", ")]);
      if (hid.length) rows.push(["🙈", x("hide") + hid.map(id => x("tab")[id]).join(", ")]);
      return `<div class="sqx-chips">${on.map(k => `<span>${E(split(k)[0])} ${E(split(k)[1])}</span>`).join("")}</div>` +
        `<div class="sqx-sum"><h3>${E(x("will"))}</h3>${rows.map(r => `<div><i>${r[0]}</i><span>${E(r[1])}</span></div>`).join("")}</div>`;
    };
    const draw = () => {
      const total = STEPS.length, id = STEPS[i];
      const inner = id === "lang"
        ? head("w1", "w2") + `<div class="sqx-langs">${Object.keys(names).map(l => `<button class="sqx-lang${settings.lang === l ? " on" : ""}" data-l="${l}">${names[l]}</button>`).join("")}</div>`
        : id === "access" ? head("a1", "a2") + `<div class="sqx-list">${ACC.map(opt).join("")}</div>`
        : id === "you" ? head("y1", "y2") + `<div class="sqx-list">${YOU.map(opt).join("")}</div>`
        : head("r1", "r2") + review() + `<p class="sqx-later">${E(x("later"))}</p>`;
      ov.innerHTML = `<div class="sq-in sqx"><div class="sqx-top"><div class="sqx-bar"><i style="width:${((i + 1) / total) * 100}%"></i></div><span>${E(x("n").replace("{n}", i + 1).replace("{t}", total))}</span></div>` +
        `<div class="sqx-body ${dir > 0 ? "fwd" : dir < 0 ? "back" : ""}">${inner}</div>` +
        `<div class="sqx-nav">${i ? `<button class="sqx-back">${E(x("back"))}</button>` : ""}<button class="sqx-next">${E(x(i === total - 1 ? "fin" : "next"))}</button></div>` +
        `<button class="sq-skip">${E(fromSettings ? x("cancel") : x("skip"))}</button></div>`;
      ov.querySelectorAll("[data-l]").forEach(b => b.addEventListener("click", () => {
        settings.lang = b.dataset.l; saveSettings(); applySettings(); applyI18n();
        renderChips(); renderInfo(); renderList(); renderSaved(); dir = 0; draw();
      }));
      ov.querySelectorAll("[data-k]").forEach(b => b.addEventListener("click", () => {
        const on = !cur[b.dataset.k]; cur[b.dataset.k] = on;
        b.classList.toggle("on", on); b.setAttribute("aria-pressed", on);
        try { if (navigator.vibrate) navigator.vibrate(8); } catch (e) {}
      }));
      const bk = ov.querySelector(".sqx-back"); if (bk) bk.addEventListener("click", () => { i--; dir = -1; draw(); });
      ov.querySelector(".sqx-next").addEventListener("click", () => { if (i < total - 1) { i++; dir = 1; draw(); } else finish(false); });
      ov.querySelector(".sq-skip").addEventListener("click", () => finish(true));
      ov.scrollTop = 0;
    };
    draw();
  };
})();



