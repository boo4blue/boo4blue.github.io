/* Haven FW website: pop-out map menu (FAB).
   Feature #45: ports the app's gm-fab.js + gm-fab.css — moves Near me, Add my
   pin, Bus stops and Trip planner into one bottom-right button that fans them
   out. English-only (site convention); no i18n layer on the site.
   Also fixes a live layout bug: the tag-filter button, the pin FAB and the bus
   button all sat at top:172px right:10px and overlapped each other; the bus
   button was additionally appended to #tab-map (no positioned ancestor), so it
   was positioned against the page instead of the map. */
(function () {
  "use strict";
  /* App ORDER verbatim: [id/query, label]. The site's Near-me button is the
     anonymous button in the map search row (onclick="showUserLocation(true)"). */
  var ORDER = [
    { q: '#tab-map button[onclick*="showUserLocation"]', label: "Near me" },
    { id: "pinBtn", label: "Add my pin" },
    { id: "busBtn", label: "Bus stops" },
    { id: "tpBtn", label: "Plan a trip" }
  ];
  var fab = null, main = null, found = {}, obs = null, iv = null, mapWired = false;

  function $(id) { try { return document.getElementById(id); } catch (e) { return null; } }
  function findIt(o) {
    if (o.id) return $(o.id);
    try { return document.querySelector(o.q); } catch (e) { return null; }
  }
  function setOpen(on, why) {
    if (!fab || !main) return;
    var wasOpen = fab.classList.contains("open");
    fab.classList.toggle("open", !!on);
    try { main.setAttribute("aria-expanded", on ? "true" : "false"); } catch (e) {}
    /* HV-FAB-FOCUS-RETURN (ported): on dismiss paths, hand focus back to the
       trigger so a keyboard/screen-reader user doesn't resume Tab from an
       invisible item. Item-tap closes are excluded: the tapped action (e.g.
       the trip sheet) manages focus itself. */
    if (!on && wasOpen && why !== "item") {
      try {
        var ae = document.activeElement;
        if (ae && ae !== main && fab.contains(ae) && main.focus) main.focus({ preventScroll: true });
      } catch (e) {}
    }
  }
  function place() {
    if (!fab) return 0;
    var n = 0;
    ORDER.forEach(function (o, idx) {
      var el = findIt(o);
      if (!el) return;
      n++;
      if (el.parentNode !== fab) fab.appendChild(el);
      try {
        el.classList.add("hvf-it");
        el.style.setProperty("--i", String(idx));
        el.setAttribute("data-lbl", o.label);
        el.setAttribute("aria-label", o.label);
      } catch (e) {}
      var key = o.id || o.q;
      if (!found[key]) {
        found[key] = 1;
        el.addEventListener("click", function () { setTimeout(function () { setOpen(false, "item"); }, 120); });
      }
    });
    return n;
  }
  function wireMap() {
    if (mapWired) return;
    try {
      if (typeof map !== "undefined" && map && map.on) {
        map.on("dragstart zoomstart", function () { setOpen(false, "dismiss"); });
        mapWired = true;
      }
    } catch (e) {}
  }
  function build() {
    var wrap = $("map-wrap") || $("tab-map");
    if (!wrap || $("hvFab")) return false;
    fab = document.createElement("div"); fab.id = "hvFab";
    main = document.createElement("button"); main.id = "hvFabMain"; main.type = "button";
    main.setAttribute("aria-label", "Map menu"); main.setAttribute("aria-expanded", "false");
    main.innerHTML = "<span>\uff0b</span>";
    main.addEventListener("click", function (e) { e.stopPropagation(); setOpen(!fab.classList.contains("open")); });
    ["mousedown", "touchstart", "dblclick", "wheel"].forEach(function (ev) {
      fab.addEventListener(ev, function (e) { e.stopPropagation(); }, { passive: true });
    });
    try { if (window.L && L.DomEvent) L.DomEvent.disableClickPropagation(fab); } catch (e) {}
    fab.appendChild(main);
    wrap.appendChild(fab);
    place();
    /* The pin/bus/trip buttons are created by their own modules a moment
       later (after the Leaflet map boots): grab them as they appear. */
    var tab = $("tab-map") || wrap;
    try {
      obs = new MutationObserver(function () { if (place() === ORDER.length && obs) { obs.disconnect(); obs = null; } });
      obs.observe(tab, { childList: true, subtree: true });
    } catch (e) { obs = null; }
    var tries = 0;
    iv = setInterval(function () { place(); wireMap(); if (++tries > 40 || !obs) { clearInterval(iv); iv = null; } }, 500);
    document.addEventListener("click", function (e) { if (fab && fab.classList.contains("open") && !fab.contains(e.target)) setOpen(false, "dismiss"); }, true);
    document.addEventListener("touchstart", function (e) { if (fab && fab.classList.contains("open") && !fab.contains(e.target)) setOpen(false, "dismiss"); }, { capture: true, passive: true });
    document.addEventListener("keydown", function (e) { if (e && e.key === "Escape") setOpen(false, "dismiss"); });
    wireMap();
    return true;
  }
  function boot() {
    if ($("hvFab")) return;
    if (!$("map-wrap") && !$("tab-map")) { setTimeout(boot, 400); return; }
    build();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  try {
    window._fabApi = {
      build: build, place: place, setOpen: setOpen, ORDER: ORDER,
      get fab() { return fab; }, get main() { return main; }
    };
  } catch (e) {}
})();
