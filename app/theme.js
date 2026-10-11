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
