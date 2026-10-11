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
