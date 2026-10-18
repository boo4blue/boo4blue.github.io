/* LASTTAB (feature #44): pick up where you left off — ported from the app's
   gm-lasttab.js. The site reopens on the tab you were using instead of always
   landing on the map. Every goTab() switch is saved to localStorage
   ("haven_lasttab", same key as the app); once after boot settles, the site
   jumps back to it. Also remembers HOW FAR you were scrolled ("haven_lasttab_scroll").

   WEBSITE ADAPTATIONS vs the app source:
   - active tab marker is ".tab.active" here (app uses ".tab.on").
   - validTab() checks the bottom-nav button (nav button[data-tab]) rather than
     the tab div: tab-ptools has a div but no nav button, and clicking it would
     throw. Same skip-map / unknown-tab guards as the app.
   - boot restore clicks the nav button DIRECTLY instead of calling goTab():
     the site's goTab() runs toggleSidebar() first, which would pop the sidebar
     open on every cold boot. The wrap still covers goTab() for saving, since
     every switch path (sidebar, wiki, ptools, jobs, foodday, crisis jump)
     flows through goTab().
   - window._lasttabApi exposes the pure helpers for vm tests (alerts.js precedent).
   No changes to any existing file's behavior; plain localStorage try/catch. */
(function () {
  var KEY = "haven_lasttab";
  var SCROLL_KEY = "haven_lasttab_scroll";
  var MIN_Y = 60;
  function save(tb) { try { localStorage.setItem(KEY, tb); } catch (e) {} }
  function load() { try { return localStorage.getItem(KEY) || ""; } catch (e) { return ""; } }
  function navBtn(tb) {
    try { return document.querySelector('nav button[data-tab="' + tb + '"]'); }
    catch (e) { return null; }
  }
  function validTab(tb) { return !!tb && tb !== "map" && !!navBtn(tb); }
  function saveScrollState(s) { try { localStorage.setItem(SCROLL_KEY, JSON.stringify(s)); } catch (e) {} }
  function loadScrollRaw() { try { return JSON.parse(localStorage.getItem(SCROLL_KEY) || "null"); } catch (e) { return null; } }
  function loadScroll() {
    var s = loadScrollRaw();
    return (s && s.tb && s.id && typeof s.y === "number" && s.y >= MIN_Y) ? s : null;
  }

  var restoring = false;
  /* HV-LASTTAB-NOYANK (from app): the boot restore fires ~1.5s after load, but
     a fast user can tap a tab inside that window -- without a guard the restore
     yanks them back to the saved tab anyway. userMoved records a
     user-initiated switch before boot settles; boot() then skips the restore
     and honors the tap. Additive only; normal cold-boot restore is unchanged. */
  var bootDone = false, userMoved = false;
  function wrap() {
    if (typeof goTab !== "function") return false;
    var baseGo = goTab;
    goTab = function (tb) {
      if (!restoring && tb) { if (!bootDone) userMoved = true; save(tb); }
      return baseGo.apply(this, arguments);
    };
    return true;
  }
  if (!wrap()) {
    var tries = 0;
    var iv = setInterval(function () {
      if (wrap() || ++tries > 20) clearInterval(iv);
    }, 250);
  }

  /* Scroll tracking: capture-phase so non-bubbling scroller events are seen. */
  var scrollT = null, pending = null;
  function flushScroll() {
    if (!pending) return;
    var p = pending; pending = null;
    if (p.y >= MIN_Y) { saveScrollState(p); return; }
    var cur = loadScrollRaw();
    if (cur && cur.id === p.id) saveScrollState({ tb: p.tb, id: p.id, y: 0 });
  }
  document.addEventListener("scroll", function (e) {
    var t = e.target;
    if (!(t instanceof Element) || !t.id) return;
    var sec = document.querySelector(".tab.active");
    if (!sec || !sec.contains(t)) return;
    pending = { tb: sec.id.replace(/^tab-/, ""), id: t.id, y: Math.round(t.scrollTop) || 0 };
    clearTimeout(scrollT);
    scrollT = setTimeout(flushScroll, 400);
  /* HV-SCROLL-PASSIVE (from app): the capture-phase scroll tracker never calls
     preventDefault, so mark it passive - the compositor can start scrolling
     without waiting for this JS. capture:true keeps the capture semantics. */
  }, { capture: true, passive: true });
  window.addEventListener("pagehide", function () { if (pending) flushScroll(); });

  /* HV-LASTTAB-NOFIGHT (from app): the retry loop kept re-asserting the saved
     scrollTop every 350ms until the content converged -- if the user started
     scrolling the restored tab inside that ~4s window, every tick yanked them
     back to the saved position. A touchstart/wheel listener on the scroller
     now cancels the loop the moment the user interacts: programmatic scrollTop
     sets never fire touchstart/wheel, so no false cancels. Listeners are
     passive and detached on every exit path. */
  function restoreScroll(s) {
    var n = 0, elA = null, cancelled = false;
    function onUser() { cancelled = true; }
    function detach() {
      try {
        if (elA) {
          elA.removeEventListener("touchstart", onUser);
          elA.removeEventListener("wheel", onUser);
        }
      } catch (e) {}
      elA = null;
    }
    function attach(el) {
      if (el === elA) return;
      detach();
      elA = el;
      try {
        elA.addEventListener("touchstart", onUser, { passive: true });
        elA.addEventListener("wheel", onUser, { passive: true });
      } catch (e) {}
    }
    function stop() { clearInterval(iv2); detach(); }
    var iv2 = setInterval(function () {
      if (cancelled) { stop(); return; }
      n++;
      var sec = document.querySelector(".tab.active");
      var el = document.getElementById(s.id);
      var tabOk = sec && sec.id === "tab-" + s.tb;
      if (el && tabOk) attach(el);
      if (el && tabOk && n < 12) {
        try { el.scrollTop = s.y; } catch (x) {}
        if (el.scrollHeight >= s.y + el.clientHeight - 40) {
          stop();
          return;
        }
      }
      if (n >= 12) {
        if (el && tabOk) { try { el.scrollTop = s.y; } catch (x) {} }
        stop();
      }
    }, 350);
  }

  function boot() {
    bootDone = true;
    if (userMoved) return; /* user already picked a tab -- don't yank them back */
    var tb = load();
    if (!validTab(tb)) return;
    var btn = navBtn(tb);
    if (!btn) return;
    restoring = true;
    try { btn.click(); } catch (e) {}
    restoring = false;
    var s = loadScroll();
    if (s && s.tb === tb) setTimeout(function () { restoreScroll(s); }, 600);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(boot, 1500); });
  } else {
    setTimeout(boot, 1500);
  }

  /* Test hook (alerts.js precedent): pure helpers for vm tests. */
  try { window._lasttabApi = { save: save, load: load, validTab: validTab, loadScroll: loadScroll, saveScrollState: saveScrollState, KEY: KEY, SCROLL_KEY: SCROLL_KEY }; } catch (e) {}
})();
