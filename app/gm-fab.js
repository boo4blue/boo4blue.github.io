/* Pop-out map menu: moves Near me, My pin, Bus stops and Trip planner into one button. */
(function () {
  "use strict";
  var ORDER = [
    ["locateBtn", "Near me", "Cerca de mí"],
    ["pinBtn", "Add my pin", "Añadir mi pin"],
    ["busBtn", "Bus stops", "Paradas de autobús"],
    ["tpBtn", "Plan a trip", "Planear viaje"]
  ];
  var tab, fab, main, found = {}, obs = null;
  var es = function () { return typeof settings !== "undefined" && settings && settings.lang === "es"; };
  function setOpen(on) {
    if (!fab) return;
    fab.classList.toggle("open", !!on);
    main.setAttribute("aria-expanded", on ? "true" : "false");
  }
  function place() {
    var n = 0;
    ORDER.forEach(function (o, idx) {
      var el = document.getElementById(o[0]);
      if (!el) return;
      n++;
      if (el.parentNode !== fab) { fab.appendChild(el); }
      el.classList.add("hvf-it");
      el.style.setProperty("--i", String(idx));
      el.setAttribute("data-lbl", es() ? o[2] : o[1]);
      if (!found[o[0]]) {
        found[o[0]] = 1;
        el.addEventListener("click", function () { setTimeout(function () { setOpen(false); }, 120); });
      }
    });
    return n;
  }
  function build() {
    tab = document.getElementById("tab-map"); if (!tab || document.getElementById("hvFab")) return;
    fab = document.createElement("div"); fab.id = "hvFab";
    main = document.createElement("button"); main.id = "hvFabMain"; main.type = "button";
    main.setAttribute("aria-label", "Map menu"); main.setAttribute("aria-expanded", "false");
    main.innerHTML = "<span>＋</span>";
    main.addEventListener("click", function (e) { e.stopPropagation(); setOpen(!fab.classList.contains("open")); });
    ["mousedown", "touchstart", "dblclick", "wheel"].forEach(function (ev) { fab.addEventListener(ev, function (e) { e.stopPropagation(); }); });
    if (window.L && L.DomEvent) { L.DomEvent.disableClickPropagation(fab); }
    fab.appendChild(main); tab.appendChild(fab);
    place();
    // the other buttons are created by other scripts a moment later: grab them as they appear
    obs = new MutationObserver(function () { if (place() === ORDER.length) { obs.disconnect(); obs = null; } });
    obs.observe(tab, { childList: true });
    var tries = 0, iv = setInterval(function () { place(); if (++tries > 40 || !obs) clearInterval(iv); }, 500);
    document.addEventListener("click", function (e) { if (fab.classList.contains("open") && !fab.contains(e.target)) setOpen(false); }, true);
    document.addEventListener("touchstart", function (e) { if (fab.classList.contains("open") && !fab.contains(e.target)) setOpen(false); }, true);
    try { if (typeof map !== "undefined" && map) map.on("dragstart zoomstart", function () { setOpen(false); }); } catch (e) {}
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }
  function start() { if (typeof map === "undefined" || !map) { setTimeout(start, 200); return; } build(); }
  if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", start); else start();
})();
