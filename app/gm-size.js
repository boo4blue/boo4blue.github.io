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
