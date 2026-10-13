/* Haven FW trip planner: pick resources from a menu, see bus ride times like Google Maps.
   Works offline from the built-in Citilink schedule (tripdata.js + triptrips1/2.js). Weekday + Saturday service only.
   Times are from the published schedule, not live bus locations, so buses can run late.
   Website port of the Android app's tripplan.js: waits for the async data load, maps the
   app globals (state/locate/toast/catIcon/openStatus/CATS) onto the site's, and styles the
   entry button for the site's map toolbar. Like the app, tapping a Transit link anywhere
   on the site opens this planner instead of Google Maps. */
"use strict";
(function () {
  /* The site fetches RESOURCES asynchronously and builds the map during init,
     so poll until the planner's prerequisites exist, then run once. */
  function boot() {
    if (!window.HAVEN_TRANSIT || !window.HAVEN_TRANSIT.trips || !window.HAVEN_TRANSIT.trips.length ||
        typeof L === "undefined" || typeof RESOURCES === "undefined") { setTimeout(boot, 300); return; }
    try { main(window.HAVEN_TRANSIT); } catch (e) { /* planner stays dormant */ }
  }
  function main(T) {
  /* ----- website shims: the app's globals mapped onto the site's ----- */
  /* app `state.loc` ([lat,lng]) <-> site `userLoc` ({lat,lng}) */
  var state = {
    get loc() { try { return (typeof userLoc !== "undefined" && userLoc) ? [userLoc.lat, userLoc.lng] : null; } catch (e) { return null; } },
    set loc(v) { try { if (v && typeof userLoc !== "undefined") userLoc = { lat: v[0], lng: v[1] }; } catch (e) {} }
  };
  /* app `locate(true)` -> one-shot geolocation, SILENT (the site's showUserLocation
     pops a blocking alert() when location is denied/unavailable, which would freeze
     the planner's getFrom() poll; here we just fill userLoc and let getFrom fall
     back to the map center) */
  var locate = function () {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
          try { if (typeof userLoc !== "undefined") userLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude }; } catch (e) {}
        }, function () {}, { timeout: 8000, maximumAge: 60000 });
      }
    } catch (e) {}
  };
  /* app `toast(msg)` -> site miniToast */
  var toast = function (m) { try { if (typeof miniToast === "function") miniToast(m); } catch (e) {} };
  /* app `catIcon(r)` -> site PIN_EMOJI */
  var catIcon = function (r) {
    try {
      var cs = (r && r.cats) || [], i;
      for (i = 0; i < cs.length; i++) { if (typeof PIN_EMOJI !== "undefined" && PIN_EMOJI[cs[i]]) return PIN_EMOJI[cs[i]]; }
    } catch (e) {}
    return "📍";
  };
  /* app `openStatus(r).state` -> site isOpenNow(r) */
  var openStatus = function (r) {
    try {
      var v = (typeof isOpenNow === "function") ? isOpenNow(r) : null;
      return { state: v === true ? "open" : (v === false ? "closed" : "unknown") };
    } catch (e) { return { state: "unknown" }; }
  };
  /* app `CATS[k].icon/.label`; the site's data file declares const CATS asynchronously,
     so resolve it lazily (FILTER_CATS fallback keeps the menu working regardless) */
  var tpCats = function () {
    try { if (typeof CATS !== "undefined" && CATS && CATS.food && CATS.food.icon) return CATS; } catch (e) {}
    try {
      if (typeof FILTER_CATS !== "undefined") {
        var o = {}, ks = Object.keys(FILTER_CATS), i, p;
        for (i = 0; i < ks.length; i++) { p = String(FILTER_CATS[ks[i]]).split(" "); o[ks[i]] = { icon: p[0] || "📍", label: p.slice(1).join(" ") || ks[i] }; }
        return o;
      }
    } catch (e2) {}
    return {};
  };
  var S = T.stops, RT = T.routes, INF = 1e9, MAXSEL = 12, KEY_SEL = "haven_tp_sel";
  var WALK_M_PER_MIN = 75, DETOUR = 1.25, MAX_ACCESS = 1500, XFER_M = 250;
  var CAR_M_PER_MIN = 560, CAR_DETOUR = 1.3; /* ~21 mph city average, used only when the routing server cannot be reached */

  var es = function () { try { return (localStorage.getItem("haven_lang") || "").indexOf("es") === 0; } catch (e) { return false; } };
  var tx = function (en, sp) { return es() ? sp : en; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  /* ---------- geometry / time helpers ---------- */
  function dist(a, b) {
    var dy = (b[0] - a[0]) * 110540, dx = (b[1] - a[1]) * 111320 * Math.cos(a[0] * Math.PI / 180);
    return Math.sqrt(dx * dx + dy * dy);
  }
  function walkMin(m) { return Math.max(1, Math.ceil(m * DETOUR / WALK_M_PER_MIN)); }
  function fmtT(min) {
    min = Math.round(min) % 1440; if (min < 0) min += 1440;
    var h = Math.floor(min / 60), m = min % 60, ap = h >= 12 ? "PM" : "AM";
    h = h % 12; if (h === 0) h = 12;
    return h + ":" + (m < 10 ? "0" : "") + m + " " + ap;
  }
  function fmtD(min) {
    min = Math.round(min);
    if (min < 60) return min + " min";
    var h = Math.floor(min / 60), m = min % 60;
    return h + " h" + (m ? " " + m + " min" : "");
  }
  function ymd(d) { return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate() + ""; }
  function svcFor(d) {
    var w = d.getDay(), s = w === 0 ? 0 : (w === 6 ? 2 : 1);
    if (!s) return 0;
    if (ymd(d) > T.end) return 0;
    if ((T.hol[s] || []).indexOf(ymd(d)) >= 0) return 0;
    return s;
  }

  /* ---------- schedule prep ---------- */
  var prepared = {}, nbr = null;
  function prep(svc) {
    if (prepared[svc]) return prepared[svc];
    var out = [];
    T.trips.forEach(function (t) {
      if (t[1] !== svc) return;
      var tm = [], cur = t[4];
      for (var i = 0; i < t[2].length; i++) { cur += t[3][i]; tm.push(cur); }
      out.push({ r: t[0], seq: t[2], tm: tm });
    });
    return (prepared[svc] = out);
  }
  function neighbors() {
    if (nbr) return nbr;
    nbr = S.map(function () { return []; });
    for (var i = 0; i < S.length; i++) for (var j = i + 1; j < S.length; j++) {
      var d = dist(S[i], S[j]);
      if (d <= XFER_M) { var m = walkMin(d); nbr[i].push({ s: j, m: m }); nbr[j].push({ s: i, m: m }); }
    }
    return nbr;
  }
  function near(p, maxM, cap) {
    var out = [];
    for (var i = 0; i < S.length; i++) { var d = dist(p, S[i]); if (d <= maxM) out.push({ s: i, d: d, m: walkMin(d) }); }
    out.sort(function (a, b) { return a.d - b.d; });
    return out.slice(0, cap);
  }

  /* ---------- earliest-arrival search (RAPTOR style, up to 2 transfers) ---------- */
  function plan(o, d, svc, t0) {
    var n = S.length, R = 3, nb = neighbors();
    var acc = near(o, MAX_ACCESS, 12), egr = near(d, MAX_ACCESS, 12);
    if (!acc.length || !egr.length) return null;
    var arr = [], par = [], best = new Array(n), k, i;
    for (i = 0; i < n; i++) best[i] = INF;
    for (k = 0; k <= R; k++) { arr.push(new Array(n).fill(INF)); par.push(new Array(n)); }
    acc.forEach(function (a) { arr[0][a.s] = t0 + a.m; par[0][a.s] = { acc: 1, m: a.m }; best[a.s] = t0 + a.m; });
    var trips = prep(svc);
    for (k = 1; k <= R; k++) {
      var prev = arr[k - 1], cur = arr[k], pk = par[k], improved = [], buf = k > 1 ? 1 : 0;
      trips.forEach(function (tr) {
        var b = -1;
        for (var j = 0; j < tr.seq.length; j++) {
          var s = tr.seq[j], t = tr.tm[j];
          if (b >= 0 && t < best[s]) { cur[s] = t; pk[s] = { tr: tr, b: b, i: j }; best[s] = t; improved.push(s); }
          if (b < 0 && prev[s] + buf <= t) b = j;
        }
      });
      var snap = improved.map(function (s) { return { s: s, t: cur[s], p: pk[s] }; });
      snap.forEach(function (x) {
        if (pk[x.s] !== x.p) return;
        nb[x.s].forEach(function (q) {
          var t = x.t + q.m;
          if (t < best[q.s]) { cur[q.s] = t; pk[q.s] = { from: x.s, m: q.m }; best[q.s] = t; }
        });
      });
    }
    var bestTot = INF, perK = [];
    for (k = 1; k <= R; k++) {
      var bk = null;
      egr.forEach(function (e) {
        if (arr[k][e.s] < INF) { var tot = arr[k][e.s] + e.m; if (!bk || tot < bk.tot) bk = { tot: tot, e: e, k: k }; }
      });
      perK[k] = bk; if (bk && bk.tot < bestTot) bestTot = bk.tot;
    }
    if (bestTot >= INF) return null;
    var pick = null;
    for (k = 1; k <= R; k++) if (perK[k] && perK[k].tot <= bestTot + 3) { pick = perK[k]; break; }

    // walk back through the labels
    var raw = [], s = pick.e.s; k = pick.k;
    for (var guard = 0; guard < 20; guard++) {
      var p = par[k][s];
      if (!p) return null;
      if (p.tr) { raw.push({ kind: "bus", tr: p.tr, b: p.b, i: p.i }); s = p.tr.seq[p.b]; k--; }
      else if (p.acc) { raw.push({ kind: "walk", m: p.m, a: o, b: S[s], toStop: s }); break; }
      else { raw.push({ kind: "walk", m: p.m, a: S[p.from], b: S[s], toStop: s, xfer: 1 }); s = p.from; }
    }
    raw.reverse();
    var legs = [], clock = null, leave = null;
    raw.forEach(function (l, idx) {
      if (l.kind === "walk") {
        legs.push({ kind: "walk", m: l.m, a: l.a, b: l.b, toStop: l.toStop, xfer: l.xfer, _idx: idx });
      } else {
        var seq = l.tr.seq.slice(l.b, l.i + 1);
        legs.push({ kind: "bus", route: l.tr.r, dep: l.tr.tm[l.b], arr: l.tr.tm[l.i], times: l.tr.tm.slice(l.b, l.i + 1), stops: seq, from: seq[0], to: seq[seq.length - 1], head: S[l.tr.seq[l.tr.seq.length - 1]][2] });
      }
    });
    legs.push({ kind: "walk", m: pick.e.m, a: S[pick.e.s], b: d, egress: 1 });
    // two walks in a row (a hop between stops, then the final walk) are really one walk
    var merged = [];
    legs.forEach(function (l) {
      var pv = merged[merged.length - 1];
      if (pv && pv.kind === "walk" && l.kind === "walk") { pv.b = l.b; pv.toStop = l.toStop; pv.egress = l.egress; pv.xfer = 0; pv.m = walkMin(dist(pv.a, pv.b)); }
      else merged.push(l);
    });
    legs = merged;
    var firstBus = null; legs.forEach(function (l) { if (l.kind === "bus" && firstBus === null) firstBus = l; });
    var accWalk = legs[0].kind === "walk" ? legs[0].m : 0;
    leave = firstBus.dep - accWalk;
    var t = leave;
    legs.forEach(function (l) {
      if (l.kind === "walk") { l.start = t; l.end = t + l.m; t = l.end; }
      else { t = l.arr; }
    });
    var arrive = t, bus = 0, walk = 0, rides = 0;
    legs.forEach(function (l) { if (l.kind === "bus") { bus += l.arr - l.dep; rides++; } else walk += l.m; });
    return { leave: leave, arrive: arrive, total: arrive - leave, legs: legs, busMin: bus, walkMin: walk, transfers: rides - 1, firstDep: firstBus.dep };
  }

  /* up to `count` departures, each later than the last */
  function options(o, d, svc, t0, count) {
    var res = [], t = t0;
    for (var i = 0; i < count * 3 && res.length < count; i++) {
      var j = plan(o, d, svc, t); if (!j) break;
      if (!res.some(function (x) { return x.firstDep === j.firstDep; })) res.push(j);
      t = j.leave + 1; if (t > 1700) break;
    }
    return res;
  }

  /* all the work for one destination: today's buses, or the next day with service */
  function journeysTo(o, r, startMin, now) {
    var d = [r.lat, r.lng], straight = dist(o, d), wm = walkMin(straight), day = 0, res = { opts: [], day: "", walk: wm, walkM: straight };
    for (day = 0; day < 4; day++) {
      var dt = new Date(now.getTime() + day * 86400000), svc = svcFor(dt);
      if (!svc) { if (day === 0) res.noToday = true; continue; }
      var t0 = day === 0 ? startMin : 5 * 60;
      var opts = options(o, d, svc, t0, 3);
      if (opts.length) {
        res.opts = opts;
        res.day = day === 0 ? "" : (day === 1 ? tx("Tomorrow", "Mañana") : dt.toLocaleDateString(es() ? "es" : "en-US", { weekday: "long" }));
        break;
      }
      if (day === 0) res.noToday = true;
    }
    return res;
  }

  /* ---------- UI ---------- */
  var nav = null, nvTop = null, nvBot = null, walkCache = {}, tab, btn, sheet, view = "pick", sel = [], from = null, results = [], cur = null, curOpt = 0, drawn = null, startMin = null, startNow = true, multi = null;
  var filt = { q: "", cat: "all", open: false };
  try { sel = JSON.parse(localStorage.getItem(KEY_SEL) || "[]").filter(function (id) { return RESOURCES.some(function (r) { return r.id === id; }); }); } catch (e) { sel = []; }
  var saveSel = function () { try { localStorage.setItem(KEY_SEL, JSON.stringify(sel)); } catch (e) {} };
  var rById = function (id) { for (var i = 0; i < RESOURCES.length; i++) if (RESOURCES[i].id === id) return RESOURCES[i]; return null; };
  var icon = function (r) { try { return catIcon(r); } catch (e) { return "📍"; } };
  var nowMin = function () { var d = new Date(); return d.getHours() * 60 + d.getMinutes(); };

  function css() {
    var c = document.createElement("style");
    c.textContent =
      "#tab-map{position:relative}" +
      "#tpBtn{position:absolute;top:226px;right:10px;z-index:500;width:44px;height:44px;border-radius:12px;font-size:20px;border:1px solid #333;background:rgba(26,31,46,.95);color:#7c8aff;box-shadow:0 2px 8px rgba(0,0,0,.3);cursor:pointer;display:flex;align-items:center;justify-content:center}" +
      "#tpSheet{position:absolute;left:0;right:0;bottom:0;z-index:950;max-height:80%;display:none;flex-direction:column;border-radius:18px 18px 0 0;background:var(--glass2,rgba(20,27,46,.98));color:var(--txt,#fff);border-top:1px solid var(--line,#334);box-shadow:0 -8px 28px rgba(0,0,0,.5);font-size:calc(13px*var(--ts,1));backdrop-filter:blur(24px) saturate(1.3);-webkit-backdrop-filter:blur(24px) saturate(1.3)}" +
      "#tpSheet.det{max-height:88%}" +
      "#tpSheet .tp-h{display:flex;align-items:center;gap:8px;padding:12px 14px 6px}#tpSheet .tp-h b{flex:1;font-size:calc(15px*var(--ts,1));line-height:1.2}" +
      "#tpSheet .tp-x{border:0;background:rgba(127,127,127,.25);color:inherit;border-radius:50%;width:30px;height:30px;font-size:calc(14px*var(--ts,1));flex:none}" +
      "#tpSheet .tp-body{overflow:auto;padding:0 14px 10px;flex:1;-webkit-overflow-scrolling:touch}" +
      "#tpSheet .tp-bar{display:flex;gap:8px;padding:8px 14px 12px;border-top:1px solid var(--line,#334)}" +
      "#tpSheet .tp-bar button,#tpSheet .tp-btn{border:0;border-radius:12px;padding:10px 12px;font-size:calc(13.5px*var(--ts,1));font-weight:700;color:inherit;background:rgba(127,127,127,.22)}" +
      "#tpSheet .tp-bar .go{flex:1;background:#22d3ee;color:#042;}" +
      "#tpSheet .tp-bar .go[disabled]{opacity:.45}" +
      "#tpSheet input[type=search],#tpSheet select,#tpSheet input[type=time]{width:100%;box-sizing:border-box;border:1px solid var(--line,#334);background:rgba(127,127,127,.15);color:inherit;border-radius:10px;padding:8px 10px;font-size:calc(14px*var(--ts,1))}" +
      "#tpSheet .tp-row{display:flex;gap:8px;margin:6px 0;align-items:center}" +
      "#tpSheet .tp-from{font-size:calc(12.5px*var(--ts,1));opacity:.85;margin:0 0 4px}" +
      "#tpSheet .tp-it{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:1.5px solid transparent;background:rgba(127,127,127,.12);color:inherit;border-radius:12px;padding:8px 10px;margin-bottom:6px;font-size:calc(13px*var(--ts,1))}" +
      "#tpSheet .tp-it.on{border-color:#22d3ee;background:rgba(34,211,238,.14)}" +
      "#tpSheet .tp-ck{width:22px;height:22px;border-radius:7px;border:2px solid rgba(127,127,127,.6);display:flex;align-items:center;justify-content:center;flex:none;font-size:calc(14px*var(--ts,1));font-weight:900}" +
      "#tpSheet .tp-it.on .tp-ck{background:#22d3ee;border-color:#22d3ee;color:#042}" +
      "#tpSheet .tp-nm{flex:1;min-width:0}#tpSheet .tp-nm b{display:block;font-size:calc(13.5px*var(--ts,1))}#tpSheet .tp-nm small{opacity:.7;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}" +
      "#tpSheet .tp-res{display:block;width:100%;text-align:left;border:0;background:rgba(127,127,127,.12);color:inherit;border-radius:14px;padding:10px 12px;margin-bottom:8px}" +
      "#tpSheet .tp-top{display:flex;align-items:baseline;gap:8px}#tpSheet .tp-top b{flex:1;font-size:calc(14px*var(--ts,1))}#tpSheet .tp-big{font-size:calc(18px*var(--ts,1));font-weight:800;color:#22d3ee}" +
      "#tpSheet .tp-sub{opacity:.8;margin:2px 0 6px}" +
      "#tpSheet .tp-bar2{display:flex;height:22px;border-radius:7px;overflow:hidden;gap:2px}" +
      "#tpSheet .tp-seg{display:flex;align-items:center;justify-content:center;font-size:calc(11px*var(--ts,1));font-weight:800;color:#fff;min-width:22px;white-space:nowrap}" +
      "#tpSheet .tp-seg.w{background:rgba(127,127,127,.45)}" +
      ".brt2{display:inline-block;padding:1px 8px;border-radius:9px;color:#fff;font-size:calc(12px*var(--ts,1));font-weight:800;white-space:nowrap}" +
      "#tpSheet .tp-step{display:flex;gap:10px;margin:0 0 10px}#tpSheet .tp-step .ic{width:26px;text-align:center;font-size:calc(18px*var(--ts,1));flex:none}" +
      "#tpSheet .tp-step .tl{flex:1;line-height:1.3}#tpSheet .tp-step .tl small{opacity:.75;display:block}" +
      "#tpSheet .tp-chip{border:1.5px solid rgba(127,127,127,.5);background:transparent;color:inherit;border-radius:999px;padding:5px 11px;font-size:calc(12.5px*var(--ts,1));font-weight:700;margin:0 6px 6px 0}" +
      "#tpSheet .tp-modes{display:flex;gap:4px;margin:2px 0 8px}#tpSheet .tp-modes .tp-chip{flex:1;margin:0;padding:7px 4px;text-align:center}#tpSheet .tp-seg.w.c{background:rgba(37,99,235,.7)}" +
      "#tpSheet .tp-chip.on{background:#22d3ee;border-color:#22d3ee;color:#042}" +
      "#tpSheet .tp-warn{background:rgba(251,191,36,.18);border-radius:10px;padding:7px 10px;margin:6px 0;font-size:calc(12.5px*var(--ts,1))}" +
      ".tp-start{display:block;width:100%;margin:12px 0 6px;border:0;border-radius:16px;padding:16px;font-size:calc(19px*var(--ts,1));font-weight:800;letter-spacing:.2px;background:linear-gradient(135deg,#4ade80,#16a34a);color:#03170a;box-shadow:0 10px 28px rgba(34,197,94,.45),inset 0 1px 0 rgba(255,255,255,.45);cursor:pointer;transition:transform .15s ease,filter .15s ease}" +
      ".tp-start:active{transform:scale(.97);filter:brightness(1.08)}" +
      ".tpflag{font-size:calc(24px*var(--ts,1));line-height:24px;text-shadow:0 1px 3px #000;pointer-events:none}" +
      ".tpdot{width:14px;height:14px;border-radius:50%;background:#fff;border:3px solid;box-sizing:border-box}" +
      ".tpnum{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:calc(14px*var(--ts,1));box-shadow:0 2px 8px rgba(0,0,0,.45)}" +
      ".tp-msum{background:rgba(139,92,246,.14);border:1px solid rgba(139,92,246,.4);border-radius:14px;padding:10px 12px;margin:8px 0;font-size:calc(13px*var(--ts,1));line-height:1.5}";
    document.head.appendChild(c);
  }

  function build() {
    tab = document.getElementById("tab-map"); if (!tab) return;
    css();
    btn = document.createElement("button"); btn.id = "tpBtn"; btn.textContent = "🧭";
    btn.setAttribute("aria-label", tx("Plan bus trip", "Planear viaje en autobús"));
    btn.onclick = function () { open(); };
    sheet = document.createElement("div"); sheet.id = "tpSheet";
    ["click", "dblclick", "mousedown", "touchstart", "wheel"].forEach(function (ev) { sheet.addEventListener(ev, function (e) { e.stopPropagation(); }); });
    if (L.DomEvent) { L.DomEvent.disableClickPropagation(sheet); L.DomEvent.disableScrollPropagation(sheet); }
    btn.title = tx("Plan bus trip", "Planear viaje en autob\u00fas");
    var mw = document.getElementById("map-wrap");
    (mw || tab).appendChild(btn); tab.appendChild(sheet);
  }

  function open() { view = results.length && view !== "pick" ? view : "pick"; if (nav) navBars(false); sheet.style.display = "flex"; render(); }
  function close() { sheet.style.display = "none"; if (nav) navBars(true); }
  function clearDraw() { if (drawn) { map.removeLayer(drawn); drawn = null; } }

  function head(title, backFn) {
    return '<div class="tp-h">' + (backFn ? '<button class="tp-x" data-act="back" aria-label="Back">←</button>' : "") + "<b>" + title + '</b><button class="tp-x" data-act="close" aria-label="Close">✕</button></div>';
  }
  function wire(extra) {
    sheet.querySelector('[data-act="close"]').onclick = function () { close(); if (!nav) clearDraw(); };
    var bk = sheet.querySelector('[data-act="back"]');
    if (bk) bk.onclick = extra.back;
  }

  /* ----- multi-stop routing: pick 2+ places, get one ordered route ----- */
  function goMulti() {
    if (sel.length < 2) { note(tx("Pick at least 2 places to route", "Elige al menos 2 lugares para trazar la ruta")); return; }
    view = "multi";
    sheet.classList.add("det");
    sheet.innerHTML = head("🗺️ " + tx("Multi-stop route", "Ruta con paradas"), true) + '<div class="tp-body"><div class="tp-from" style="padding:24px;text-align:center">' + tx("Finding your location…", "Buscando tu ubicación…") + "</div></div>";
    wire({ back: function () { view = "pick"; clearDraw(); render(); } });
    getFrom(function (f) { from = f; multiOrder(); });
  }
  function multiOrder() {
    var stops = sel.map(rById).filter(Boolean).slice(0, 6);
    var ordered = [], remaining = stops.slice(), cur = from.ll, i, bi, bd, d;
    while (remaining.length) {
      bi = 0; bd = INF;
      for (i = 0; i < remaining.length; i++) { d = dist(cur, [remaining[i].lat, remaining[i].lng]); if (d < bd) { bd = d; bi = i; } }
      ordered.push(remaining.splice(bi, 1)[0]);
      cur = [ordered[ordered.length - 1].lat, ordered[ordered.length - 1].lng];
    }
    multi = { stops: ordered, legs: [], mode: "walk" };
    multiFetch();
  }
  function renderMultiLoading() {
    sheet.innerHTML = head("🗺️ " + tx("Multi-stop route", "Ruta con paradas"), true) + '<div class="tp-body"><div class="tp-from" style="padding:24px;text-align:center">' + tx("Tracing the route…", "Trazando la ruta…") + "</div></div>";
    wire({ back: function () { view = "pick"; clearDraw(); render(); } });
  }
  function multiFetch() {
    if (!multi) return;
    var pts = [from.ll].concat(multi.stops.map(function (r) { return [r.lat, r.lng]; }));
    var car = multi.mode === "car", pending = pts.length - 1, i;
    multi.legs = [];
    renderMultiLoading();
    if (!pending) return;
    for (i = 0; i < pending; i++) (function (i) {
      fetchWalk(pts[i], pts[i + 1], function (rt) {
        var len = rt ? rt.len : dist(pts[i], pts[i + 1]);
        var min = rt && rt.dur ? Math.max(1, Math.round(rt.dur / 60))
          : car ? carMin(len) : Math.max(1, Math.ceil(len / WALK_M_PER_MIN));
        multi.legs[i] = { rt: rt, min: min, len: len };
        if (--pending === 0 && view === "multi" && multi) renderMulti();
      }, car);
    })(i);
  }
  function renderMulti() {
    if (view !== "multi" || !multi) return;
    var car = multi.mode === "car", totalMin = 0, totalLen = 0;
    var h = head("🗺️ " + tx("Multi-stop route", "Ruta con paradas"), true) + '<div class="tp-body">';
    h += '<div class="tp-modes">' + [["walk", "🚶", tx("Walk", "Caminar")], ["car", "🚗", tx("Drive", "Auto")]].map(function (m) {
      return '<button class="tp-chip tp-mmode' + (m[0] === multi.mode ? " on" : "") + '" data-mm="' + m[0] + '">' + m[1] + " " + m[2] + "</button>";
    }).join("") + "</div>";
    if (sel.length > 6) h += '<div class="tp-msum">' + tx("Routing the first 6 stops in the fastest order from where you are.", "Trazando las primeras 6 paradas en el orden más rápido desde donde estás.") + "</div>";
    else h += '<div class="tp-msum">' + tx("Stops in the fastest order from where you are.", "Paradas en el orden más rápido desde donde estás.") + "</div>";
    multi.legs.forEach(function (lg, i) {
      totalMin += lg.min; totalLen += lg.len;
      var r = multi.stops[i];
      h += '<div class="tp-step"><div class="tpnum">' + (i + 1) + '</div><div class="tl"><b>' + icon(r) + " " + esc(r.name) + "</b>" +
        "<small>" + (car ? tx("Drive ", "Conduce ") : tx("Walk ", "Camina ")) + lg.min + " min (" + fmtDist(lg.len) + ")" +
        (i ? tx(" from stop ", " desde la parada ") + i : tx(" from you", " desde ti")) + "</small>";
      if (lg.rt && lg.rt.steps && lg.rt.steps.length > 1) {
        h += '<details><summary style="opacity:.8;font-size:calc(12px*var(--ts,1));margin-top:3px">' + tx("Turn-by-turn", "Paso a paso") + "</summary>" +
          lg.rt.steps.filter(function (s) { return !s.last; }).map(function (s) {
            return '<small style="opacity:.9">' + s.icon + " " + esc(s.text) + " · " + fmtDist(s.d) + "</small>";
          }).join("") + "</details>";
      }
      h += "</div></div>";
    });
    h += '<div class="tp-top" style="margin-top:4px"><span class="tp-big">' + fmtD(totalMin) + '</span><span style="flex:1;opacity:.85">' +
      tx("total", "total") + " · " + fmtDist(totalLen) + " · " + multi.stops.length + " " + tx("stops", "paradas") + "</span></div>";
    var dest = multi.stops[multi.stops.length - 1];
    var wp = multi.stops.slice(0, -1).map(function (r) { return r.lat + "," + r.lng; }).join("|");
    var url = "https://www.google.com/maps/dir/?api=1&travelmode=" + (car ? "driving" : "walking") + "&origin=" + from.ll[0] + "," + from.ll[1] +
      "&destination=" + dest.lat + "," + dest.lng + (wp ? "&waypoints=" + encodeURIComponent(wp) : "");
    h += '<div class="tp-row"><a class="tp-btn" style="text-decoration:none" target="_blank" href="' + url + '">🧭 ' + tx("Open in Google Maps", "Abrir en Google Maps") + "</a></div>";
    h += '<div class="tp-from" style="opacity:.65">' + tx("Routes need internet. Times are typical, without live traffic.", "Las rutas necesitan internet. Los tiempos son típicos, sin tráfico en vivo.") + "</div></div>";
    sheet.innerHTML = h;
    wire({ back: function () { view = "pick"; clearDraw(); render(); } });
    Array.prototype.forEach.call(sheet.querySelectorAll(".tp-mmode"), function (c) {
      c.onclick = function () { if (multi && multi.mode !== c.dataset.mm) { multi.mode = c.dataset.mm; multiFetch(); } };
    });
    multiDraw();
  }
  function multiDraw() {
    clearDraw(); if (!multi) return;
    drawn = L.layerGroup().addTo(map);
    var pts = [from.ll], car = multi.mode === "car";
    multi.legs.forEach(function (lg, i) {
      var wl = (lg.rt && lg.rt.pts) || [];
      if (wl.length > 1) {
        var da = car ? null : "1 11";
        L.polyline(wl, { color: "#fff", weight: 9, opacity: .95, dashArray: da, lineCap: "round", interactive: false }).addTo(drawn);
        L.polyline(wl, { color: "#8b5cf6", weight: 5, dashArray: da, lineCap: "round", interactive: false }).addTo(drawn);
        pts = pts.concat(wl);
      }
      var r = multi.stops[i];
      L.marker([r.lat, r.lng], { interactive: false, zIndexOffset: 500, icon: L.divIcon({ className: "", iconSize: [26, 26], iconAnchor: [13, 13], html: '<div class="tpnum">' + (i + 1) + "</div>" }) }).addTo(drawn);
      pts.push([r.lat, r.lng]);
    });
    try { map.fitBounds(L.latLngBounds(pts), { paddingTopLeft: [28, 70], paddingBottomRight: [28, 330], maxZoom: 16, animate: true }); } catch (e) {}
  }

  function render() {
    sheet.classList.toggle("det", view === "detail" || view === "multi");
    if (view === "pick") renderPick(); else if (view === "results") renderResults(); else if (view === "multi") renderMulti(); else renderDetail();
  }

  /* ----- step 1: the menu of resources ----- */
  function filteredRes() {
    var q = filt.q.trim().toLowerCase(), list = RESOURCES.filter(function (r) {
      if (typeof r.lat !== "number" || typeof r.lng !== "number") return false;
      if (filt.cat !== "all" && r.cats.indexOf(filt.cat) < 0) return false;
      if (filt.open) { try { if (openStatus(r).state !== "open") return false; } catch (e) {} }
      if (q && (r.name + " " + (r.addr || "") + " " + (r.tags || []).join(" ")).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    var o = (typeof state !== "undefined" && state.loc) || null;
    if (o) list.sort(function (a, b) { return dist(o, [a.lat, a.lng]) - dist(o, [b.lat, b.lng]); });
    else list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return list;
  }
  function renderPick() {
    var CC = tpCats();
    var cats = "<option value=\"all\">" + tx("All categories", "Todas las categorías") + "</option>" + Object.keys(CC).map(function (k) {
      return '<option value="' + k + '"' + (filt.cat === k ? " selected" : "") + ">" + esc(CC[k].icon + " " + CC[k].label) + "</option>";
    }).join("");
    sheet.innerHTML = head("🧭 " + tx("Where do you want to go?", "¿A dónde quieres ir?")) +
      '<div class="tp-body"><div class="tp-from" id="tpFromNote">' + tx("Pick up to " + MAXSEL + " places. You'll see the bus ride time to each one from where you are.", "Elige hasta " + MAXSEL + " lugares. Verás el tiempo en autobús desde donde estás.") + "</div>" +
      '<input type="search" id="tpQ" placeholder="' + tx("Search places…", "Buscar lugares…") + '" value="' + esc(filt.q) + '">' +
      '<div class="tp-row"><select id="tpCat">' + cats + '</select><label style="white-space:nowrap;font-size:calc(12.5px*var(--ts,1))"><input type="checkbox" id="tpOpen"' + (filt.open ? " checked" : "") + "> " + tx("Open now", "Abierto ahora") + "</label></div>" +
      '<div id="tpList"></div></div>' +
      '<div class="tp-bar"><button data-act="clear">' + tx("Clear", "Borrar") + '</button><button data-act="route">🗺️ ' + tx("Route stops", "Trazar ruta") + '</button><button class="go" data-act="go" disabled>" + tx("Select a place", "Elige un lugar") + "</button></div>';
    wire({});
    var q = sheet.querySelector("#tpQ");
    q.oninput = function () { filt.q = q.value; list(); };
    sheet.querySelector("#tpCat").onchange = function () { filt.cat = this.value; list(); };
    sheet.querySelector("#tpOpen").onchange = function () { filt.open = this.checked; list(); };
    sheet.querySelector('[data-act="clear"]').onclick = function () { sel = []; saveSel(); list(); };
    sheet.querySelector('[data-act="route"]').onclick = goMulti;
    sheet.querySelector('[data-act="go"]').onclick = go;
    list();
  }
  function list() {
    var box = sheet.querySelector("#tpList"), items = filteredRes(), shown = items.slice(0, 80);
    var o = (typeof state !== "undefined" && state.loc) || null;
    box.innerHTML = shown.map(function (r) {
      var on = sel.indexOf(r.id) >= 0, d = o ? dist(o, [r.lat, r.lng]) / 1609.34 : null;
      return '<button class="tp-it' + (on ? " on" : "") + '" data-id="' + esc(r.id) + '"><span class="tp-ck">' + (on ? "✓" : "") + '</span><span class="tp-nm"><b>' + icon(r) + " " + esc(r.name) + "</b><small>" +
        esc(r.addr || "") + (d !== null ? " · " + d.toFixed(1) + " mi" : "") + "</small></span></button>";
    }).join("") + (items.length > shown.length ? '<div class="tp-from" style="text-align:center">' + tx("Showing the first 80. Search to narrow it down.", "Mostrando los primeros 80. Busca para filtrar.") + "</div>" : "") +
      (items.length ? "" : '<div class="tp-from" style="text-align:center;padding:18px">' + tx("No places match.", "Ningún lugar coincide.") + "</div>");
    Array.prototype.forEach.call(box.querySelectorAll(".tp-it"), function (b) {
      b.onclick = function () {
        var id = b.dataset.id, i = sel.indexOf(id);
        if (i >= 0) sel.splice(i, 1);
        else if (sel.length >= MAXSEL) { note(tx("Up to " + MAXSEL + " places at a time", "Hasta " + MAXSEL + " lugares a la vez")); return; }
        else sel.push(id);
        saveSel(); b.classList.toggle("on", i < 0); b.querySelector(".tp-ck").textContent = i < 0 ? "✓" : ""; goBtn();
      };
    });
    goBtn();
  }
  function goBtn() {
    var g = sheet.querySelector('[data-act="go"]'); if (!g) return;
    g.disabled = !sel.length;
    g.textContent = sel.length ? "🚌 " + tx("Show bus times", "Ver tiempos") + " (" + sel.length + ")" : tx("Select a place", "Elige un lugar");
  }
  function note(msg) { try { if (typeof toast === "function") toast(msg); } catch (e) {} }

  /* ----- where are you? ----- */
  function getFrom(cb) {
    if (typeof state !== "undefined" && state.loc) return cb({ ll: state.loc, label: tx("your location", "tu ubicación") });
    var done = false;
    try { if (typeof locate === "function") locate(true); } catch (e) {}
    var tries = 0, iv = setInterval(function () {
      tries++;
      if (typeof state !== "undefined" && state.loc) { clearInterval(iv); if (!done) { done = true; cb({ ll: state.loc, label: tx("your location", "tu ubicación") }); } }
      else if (tries > 32) {
        clearInterval(iv);
        if (!done) { done = true; var c = map.getCenter(); cb({ ll: [c.lat, c.lng], label: tx("the center of the map (location is off)", "el centro del mapa (ubicación apagada)"), fallback: true }); }
      }
    }, 400);
  }

  /* ----- step 2: ride times for every pick ----- */
  function go() {
    if (!sel.length) return;
    view = "results"; startNow = true; startMin = nowMin();
    sheet.innerHTML = head("🚌 " + tx("Bus times", "Tiempos en autobús")) + '<div class="tp-body"><div class="tp-from" style="padding:24px;text-align:center">' + tx("Finding your location…", "Buscando tu ubicación…") + "</div></div>";
    wire({});
    getFrom(function (f) { from = f; compute(); });
  }
  function compute() {
    var now = new Date(), sm = startNow ? now.getHours() * 60 + now.getMinutes() : startMin;
    results = sel.map(rById).filter(Boolean).map(function (r) {
      var j = journeysTo(from.ll, r, sm, now);
      return { r: r, j: j, best: bestOf(j) };
    });
    results.sort(function (a, b) { return a.best.sortKey - b.best.sortKey; });
    renderResults();
  }
  /* a bus trip, or just walking when that's quicker */
  function bestOf(j) {
    var bus = j.opts[0] || null, walkOK = j.walk <= 30;
    if (bus && (!walkOK || bus.total < j.walk)) return { kind: "bus", opt: bus, sortKey: bus.arrive + (j.day ? 1440 : 0) };
    if (walkOK) return { kind: "walk", sortKey: nowMin() + j.walk };
    return { kind: "none", sortKey: 99999 };
  }
  function bar(opt) {
    var tot = opt.legs.reduce(function (a, l) { return a + (l.kind === "bus" ? l.arr - l.dep : l.m); }, 0) || 1;
    return '<div class="tp-bar2">' + opt.legs.map(function (l) {
      if (l.kind === "bus") { var r = RT[l.route]; return '<div class="tp-seg" style="flex:' + Math.max(l.arr - l.dep, 3) + ';background:' + r[2] + '">🚌 ' + esc(r[0]) + "</div>"; }
      return '<div class="tp-seg w' + (l.car ? " c" : "") + '" style="flex:' + Math.max(l.m, 1.5) + '">' + (l.m >= 4 ? (l.car ? "🚗" : "🚶") + l.m : (l.car ? "🚗" : "🚶")) + "</div>";
    }).join("") + "</div>";
  }
  function renderResults() {
    var timeVal = (function () { var m = startNow ? nowMin() : startMin; return (m < 600 ? "0" : "") + Math.floor(m / 60) + ":" + (m % 60 < 10 ? "0" : "") + (m % 60); })();
    var h = head("🚌 " + tx("Bus times", "Tiempos en autobús"), true) +
      '<div class="tp-body"><div class="tp-from">📍 ' + tx("From ", "Desde ") + esc(from.label) + "</div>" +
      (from.fallback ? '<div class="tp-warn">' + tx("Turn on location for exact times from where you are.", "Activa la ubicación para tiempos exactos desde donde estás.") + "</div>" : "") +
      '<div class="tp-row"><span>' + tx("Leave", "Salir") + '</span><input type="time" id="tpTime" value="' + timeVal + '" style="flex:1"><button class="tp-btn" data-act="now"' + (startNow ? ' style="opacity:.5"' : "") + ">" + tx("Now", "Ahora") + "</button></div>";
    var anyNoToday = results.some(function (x) { return x.j.noToday && !x.j.opts.length; });
    var d0 = new Date();
    if (svcFor(d0) === 0 && startNow) h += '<div class="tp-warn">' + tx("Citilink doesn't run today (Sunday or holiday). Showing the next day buses run.", "Citilink no opera hoy (domingo o feriado). Mostrando el siguiente día con servicio.") + "</div>";
    h += results.map(function (x, i) {
      var j = x.j, b = x.best, top, sub, barHtml = "";
      if (b.kind === "bus") {
        var o = b.opt;
        top = '<span class="tp-big">' + fmtD(o.total) + "</span>";
        sub = (j.day ? "<b>" + esc(j.day) + "</b> · " : "") + tx("Leave ", "Salir ") + fmtT(o.leave) + " → " + tx("arrive ", "llegar ") + fmtT(o.arrive) + (o.transfers ? " · " + o.transfers + " " + tx(o.transfers > 1 ? "transfers" : "transfer", o.transfers > 1 ? "transbordos" : "transbordo") : "");
        barHtml = bar(o);
      } else if (b.kind === "walk") {
        top = '<span class="tp-big">🚶 ' + fmtD(j.walk) + "</span>"; sub = tx("Close enough to walk (", "Cerca para caminar (") + (j.walkM / 1609.34).toFixed(1) + " mi)";
      } else {
        top = '<span class="tp-big" style="color:#fbbf24">—</span>';
        sub = j.noToday ? tx("No Citilink bus found for this trip right now.", "No hay autobús Citilink para este viaje ahora.") : tx("No bus route nearby.", "No hay ruta de autobús cercana.");
      }
      sub += " · 🚗 ~" + fmtD(carMin(j.walkM));
      return '<button class="tp-res" data-i="' + i + '"><div class="tp-top"><b>' + icon(x.r) + " " + esc(x.r.name) + "</b>" + top + '</div><div class="tp-sub">' + sub + "</div>" + barHtml + "</button>";
    }).join("");
    h += '<div class="tp-from" style="margin-top:6px;opacity:.65">' + tx("From the Citilink schedule, not live. Buses can run late.", "Del horario de Citilink, no en vivo. Los autobuses pueden retrasarse.") + "</div></div>";
    sheet.innerHTML = h;
    wire({ back: function () { view = "pick"; clearDraw(); render(); } });
    var ti = sheet.querySelector("#tpTime");
    ti.onchange = function () { var p = ti.value.split(":"); if (p.length === 2) { startNow = false; startMin = (+p[0]) * 60 + (+p[1]); compute(); } };
    sheet.querySelector('[data-act="now"]').onclick = function () { startNow = true; compute(); };
    Array.prototype.forEach.call(sheet.querySelectorAll(".tp-res"), function (b) {
      b.onclick = function () { cur = results[+b.dataset.i]; curOpt = 0; view = "detail"; render(); };
    });
  }

  /* ----- real walking routes (street paths; needs internet, falls back to a straight line) ----- */
  var WALK_URL = "https://routing.openstreetmap.de/routed-foot/route/v1/foot/";
  var CAR_URL = "https://routing.openstreetmap.de/routed-car/route/v1/driving/";
  var carMin = function (m) { return Math.max(1, Math.ceil(m * CAR_DETOUR / CAR_M_PER_MIN)); };
  var DIR_EN = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];
  var DIR_ES = ["norte", "noreste", "este", "sureste", "sur", "suroeste", "oeste", "noroeste"];
  var MOD = {
    "left": ["Turn left", "Gira a la izquierda", "↰"], "right": ["Turn right", "Gira a la derecha", "↱"],
    "slight left": ["Bear left", "Mantente a la izquierda", "↖"], "slight right": ["Bear right", "Mantente a la derecha", "↗"],
    "sharp left": ["Turn sharp left", "Gira cerrado a la izquierda", "↰"], "sharp right": ["Turn sharp right", "Gira cerrado a la derecha", "↱"],
    "straight": ["Continue straight", "Sigue recto", "↑"], "uturn": ["Make a U-turn", "Da la vuelta", "↩"]
  };
  function cardinal(deg) { var d = Math.round((((deg % 360) + 360) % 360) / 45) % 8; return tx(DIR_EN[d], DIR_ES[d]); }
  function bearingTo(a, b) {
    var dy = b[0] - a[0], dx = (b[1] - a[1]) * Math.cos(a[0] * Math.PI / 180);
    return (Math.atan2(dx, dy) * 180 / Math.PI + 360) % 360;
  }
  function fmtDist(m) {
    var ft = m * 3.281;
    if (ft < 1000) return Math.max(10, Math.round(ft / 10) * 10) + " ft";
    return (m / 1609.34).toFixed(1) + " mi";
  }
  function stepInfo(st) {
    var m = st.maneuver || {}, nm = st.name || "", ty = m.type, md = MOD[m.modifier], on = nm ? tx(" onto ", " hacia ") + nm : "";
    if (ty === "depart") return { icon: "↑", text: tx("Head ", "Dirígete al ") + cardinal(m.bearing_after || 0) + (nm ? tx(" on ", " por ") + nm : "") };
    if (ty === "arrive") return { icon: "🏁", text: tx("Arrive", "Llegas") };
    if (ty === "on ramp") return { icon: md ? md[2] : "↗", text: tx("Take the ramp", "Toma la rampa") + on };
    if (ty === "off ramp") return { icon: md ? md[2] : "↗", text: tx("Take the exit", "Toma la salida") + on };
    if (ty === "roundabout" || ty === "rotary" || ty === "roundabout turn") return { icon: "⟳", text: tx("Go around the roundabout", "Entra en la rotonda") + on };
    if (ty === "new name" || ty === "continue" || !md) return { icon: "↑", text: nm ? tx("Continue on ", "Sigue por ") + nm : tx("Continue", "Sigue") };
    return { icon: md[2], text: tx(md[0], md[1]) + on };
  }
  function mkRoute(pts, steps, od, dur) {
    var cum = [0], i;
    for (i = 1; i < pts.length; i++) cum.push(cum[i - 1] + dist(pts[i - 1], pts[i]));
    var len = cum[cum.length - 1], sc = od && len ? len / od : 1, acc = 0;
    var st = steps.map(function (s) {
      var inf = stepInfo(s), o = { at: acc * sc, text: inf.text, icon: inf.icon, d: (s.distance || 0) * sc, last: false };
      acc += s.distance || 0; return o;
    });
    if (st.length) st[st.length - 1].last = true;
    return { pts: pts, cum: cum, len: len, steps: st, dur: dur || 0 };
  }
  function project(rt, p) {
    var best = { off: INF, along: 0 }, kx = 111320 * Math.cos(p[0] * Math.PI / 180), ky = 110540;
    for (var i = 0; i < rt.pts.length - 1; i++) {
      var a = rt.pts[i], b = rt.pts[i + 1], bx = (b[1] - a[1]) * kx, by = (b[0] - a[0]) * ky, px = (p[1] - a[1]) * kx, py = (p[0] - a[0]) * ky;
      var l2 = bx * bx + by * by, t = l2 ? Math.max(0, Math.min(1, (px * bx + py * by) / l2)) : 0, dx = px - t * bx, dy = py - t * by, off = Math.sqrt(dx * dx + dy * dy);
      if (off < best.off) best = { off: off, along: rt.cum[i] + t * Math.sqrt(l2) };
    }
    return best;
  }
  var wkey = function (a, b) { return [a[0].toFixed(5), a[1].toFixed(5), b[0].toFixed(5), b[1].toFixed(5)].join(","); };
  function fetchWalk(a, b, cb, car) {
    var k = (car ? "c" : "w") + wkey(a, b);
    if (walkCache[k]) return cb(walkCache[k]);
    if (dist(a, b) < 30) return cb(mkRoute([a, b], [], 0));
    var done = false, to = null, ctl = window.AbortController ? new AbortController() : null;
    var fin = function (v) { if (done) return; done = true; clearTimeout(to); if (v) walkCache[k] = v; cb(v); };
    to = setTimeout(function () { try { if (ctl) ctl.abort(); } catch (e) {} fin(null); }, 9000);
    try {
      fetch((car ? CAR_URL : WALK_URL) + a[1] + "," + a[0] + ";" + b[1] + "," + b[0] + "?overview=full&geometries=geojson&steps=true", ctl ? { signal: ctl.signal } : undefined)
        .then(function (r) { return r.json(); })
        .then(function (j) {
          var rt = j && j.routes && j.routes[0]; if (!rt || !rt.geometry) return fin(null);
          var pts = rt.geometry.coordinates.map(function (c) { return [c[1], c[0]]; });
          fin(mkRoute(pts, (rt.legs && rt.legs[0] && rt.legs[0].steps) || [], rt.distance, rt.duration));
        }).catch(function () { fin(null); });
    } catch (e) { fin(null); }
  }
  /* real street distance replaces the straight-line guess, so the leave time stays honest */
  function retime(o) {
    var L2 = o.legs, fb = null, i, t;
    L2.forEach(function (l) { if (l.kind === "walk" && l.rt) l.m = l.car ? (l.rt.dur ? Math.max(1, Math.ceil(l.rt.dur / 60)) : carMin(l.rt.len / CAR_DETOUR)) : Math.max(1, Math.ceil(l.rt.len / WALK_M_PER_MIN)); });
    if (o.walkOnly) { var w = L2[0]; w.end = w.start + w.m; o.arrive = w.end; o.total = w.m; o.walkMin = w.m; return; }
    for (i = 0; i < L2.length; i++) if (L2[i].kind === "bus") { fb = L2[i]; break; }
    if (!fb) return;
    t = fb.dep - (L2[0].kind === "walk" ? L2[0].m : 0); o.leave = t;
    L2.forEach(function (l) { if (l.kind === "walk") { l.start = t; l.end = t + l.m; t = l.end; } else t = l.arr; });
    o.arrive = t; o.total = o.arrive - o.leave; o.walkMin = 0;
    L2.forEach(function (l) { if (l.kind === "walk") o.walkMin += l.m; });
  }
  function ensureWalks(o, cb) {
    if (o._wk) return;
    o._wk = 1;
    var legs = o.legs.filter(function (l) { return l.kind === "walk"; }), left = legs.length, ok = 0;
    if (!left) { o._wk = 2; return; }
    legs.forEach(function (l) {
      fetchWalk(l.a, l.b, function (rt) {
        if (rt) { l.rt = rt; ok++; }
        if (--left === 0) { o._wk = ok ? 2 : 0; if (ok) retime(o); if (cb) cb(ok > 0); }
      }, l.car);
    });
  }
  function walkOpt(x) {
    if (x.wopt) return x.wopt;
    var j = x.j, t = nowMin();
    return (x.wopt = { leave: t, arrive: t + j.walk, total: j.walk, busMin: 0, walkMin: j.walk, transfers: 0, walkOnly: 1,
      legs: [{ kind: "walk", m: j.walk, a: from.ll, b: [x.r.lat, x.r.lng], egress: 1, start: t, end: t + j.walk }] });
  }

  function carOpt(x) {
    if (x.copt) return x.copt;
    var j = x.j, t = nowMin(), m = carMin(j.walkM);
    return (x.copt = { leave: t, arrive: t + m, total: m, busMin: 0, walkMin: 0, transfers: 0, walkOnly: 1, car: 1,
      legs: [{ kind: "walk", car: 1, m: m, a: from.ll, b: [x.r.lat, x.r.lng], egress: 1, start: t, end: t + m }] });
  }

  /* ----- step 3: one trip, step by step, drawn on the map ----- */
  function stepHtml(opt, r) {
    var out = "";
    opt.legs.forEach(function (l) {
      if (l.kind === "walk") {
        var to = l.egress ? esc(r.name) : tx("the bus stop ", "la parada ") + esc(S[l.toStop][2]);
        out += '<div class="tp-step"><div class="ic">' + (l.car ? "🚗" : "🚶") + '</div><div class="tl"><b>' + (l.car ? tx("Drive ", "Conduce ") : tx("Walk ", "Camina ")) + l.m + " min</b> (" + (l.rt ? fmtDist(l.rt.len) : "~" + fmtDist(dist(l.a, l.b))) + ") " + tx("to ", "a ") + to + "<small>" + fmtT(l.start) + (l.egress ? " → " + tx("you're there at ", "llegas a las ") + fmtT(l.end) : "") + "</small>";
        if (l.rt && l.rt.steps.length > 1) {
          out += '<details><summary style="opacity:.8;font-size:calc(12px*var(--ts,1));margin-top:3px">' + tx("Turn-by-turn", "Paso a paso") + "</summary>" + l.rt.steps.filter(function (s) { return !s.last; }).map(function (s) {
            return '<small style="opacity:.9">' + s.icon + " " + esc(s.text) + " · " + fmtDist(s.d) + "</small>";
          }).join("") + "</details>";
        }
        out += "</div></div>";
      } else {
        var rt = RT[l.route], n = l.stops.length - 1;
        out += '<div class="tp-step"><div class="ic">🚌</div><div class="tl"><b>' + tx("Take ", "Toma ") + '<span class="brt2" style="background:' + rt[2] + '">' + esc(rt[0]) + "</span> " + esc(rt[1]) + "</b>" +
          "<small>" + tx("Board at ", "Sube en ") + esc(S[l.from][2]) + " · " + fmtT(l.dep) + "</small>" +
          "<small>" + tx("Ride ", "Viaje ") + fmtD(l.arr - l.dep) + " (" + n + " " + tx(n === 1 ? "stop" : "stops", n === 1 ? "parada" : "paradas") + ") " + tx("toward ", "hacia ") + esc(l.head) + "</small>" +
          "<small>" + tx("Get off at ", "Baja en ") + esc(S[l.to][2]) + " · " + fmtT(l.arr) + "</small></div></div>";
      }
    });
    return out;
  }
  function renderDetail() {
    var x = cur, r = x.r, j = x.j, b = x.best, o = null, kind = x.mode || b.kind;
    if (kind === "bus") o = j.opts[Math.min(curOpt, j.opts.length - 1)]; else if (kind === "walk") o = walkOpt(x); else if (kind === "car") o = carOpt(x);
    var h = head(icon(r) + " " + esc(r.name), true) + '<div class="tp-body">';
    if (!nav) h += '<div class="tp-modes">' + [["bus", "🚌", tx("Bus", "Bus")], ["walk", "🚶", tx("Walk", "Caminar")], ["car", "🚗", tx("Drive", "Auto")]].map(function (m) {
      return '<button class="tp-chip tp-mode' + (m[0] === kind ? " on" : "") + '" data-m="' + m[0] + '">' + m[1] + " " + m[2] + "</button>";
    }).join("") + "</div>";
    if (o) {
      h += '<div class="tp-top"><span class="tp-big">' + fmtD(o.total) + '</span><span style="flex:1;opacity:.85">' + fmtT(o.leave) + " → " + fmtT(o.arrive) + (j.day && !o.walkOnly ? " · " + esc(j.day) : "") + "</span></div>";
      if (o.legs.length > 1) h += '<div style="margin:6px 0 8px">' + bar(o) + "</div>";
      if (!o.walkOnly && !j.day && startNow && o.leave < nowMin()) h += '<div class="tp-warn">' + tx("Walk fast to catch this bus, or pick a later one.", "Camina rápido para alcanzar este autobús, o elige uno más tarde.") + "</div>";
      if (j.opts.length > 1 && !o.walkOnly) h += '<div style="margin-bottom:4px">' + j.opts.map(function (p, i) { return '<button class="tp-chip' + (i === curOpt ? " on" : "") + '" data-o="' + i + '">' + tx("Leave ", "Salir ") + fmtT(p.leave) + "</button>"; }).join("") + "</div>";
      if (!nav) {
        if (o.walkOnly || !j.day) h += '<button class="tp-start" data-act="start">▶ ' + tx("Start trip", "Iniciar viaje") + "</button>";
        else h += '<div class="tp-warn">' + tx("This trip is for " + esc(j.day) + ". Come back then and tap Start trip.", "Este viaje es para " + esc(j.day) + ". Vuelve entonces y toca Iniciar viaje.") + "</div>";
      }
      h += stepHtml(o, r);
    } else if (kind === "bus") {
      h += '<div class="tp-warn">' + tx("No Citilink bus found for this trip. Try the directions button.", "No hay autobús Citilink para este viaje. Prueba el botón de direcciones.") + "</div>";
    }
    if (o && o.car) h += '<div class="tp-from" style="opacity:.75">' + tx("Drive time is typical, without live traffic. Needs internet for the road route.", "El tiempo es típico, sin tráfico en vivo. Necesita internet para la ruta.") + "</div>";
    var url = "https://www.google.com/maps/dir/?api=1&travelmode=" + (kind === "car" ? "driving" : kind === "walk" ? "walking" : "transit") + "&origin=" + from.ll[0] + "," + from.ll[1] + "&destination=" + r.lat + "," + r.lng;
    h += '<div class="tp-row"><a class="tp-btn" style="text-decoration:none" target="_blank" href="' + url + '">🧭 ' + tx("Open in Google Maps", "Abrir en Google Maps") + "</a>" +
      (r.phoneHref ? '<a class="tp-btn" style="text-decoration:none" href="' + esc(r.phoneHref) + '">📞 ' + tx("Call", "Llamar") + "</a>" : "") + "</div>" +
      '<div class="tp-from" style="opacity:.65">' + tx("Bus times are from the Citilink schedule, not live. Buses can run late. Walking paths need internet. Hours at the place can change, so call first.", "Los horarios son del itinerario de Citilink, no en vivo. Los autobuses pueden retrasarse. Las rutas a pie necesitan internet. Los horarios del lugar pueden cambiar, llama primero.") + "</div></div>";
    sheet.innerHTML = h;
    wire({ back: function () { if (nav) return close(); view = "results"; clearDraw(); render(); } });
    Array.prototype.forEach.call(sheet.querySelectorAll(".tp-chip"), function (c) { c.onclick = function () { curOpt = +c.dataset.o; render(); }; });
    Array.prototype.forEach.call(sheet.querySelectorAll(".tp-mode"), function (c) { c.onclick = function () { x.mode = c.dataset.m; curOpt = 0; clearDraw(); render(); }; });
    var sb = sheet.querySelector('[data-act="start"]');
    if (sb) sb.onclick = function () { startNav(x, o); };
    if (o) {
      ensureWalks(o, function (ok) { if (ok && view === "detail" && cur === x) { if (o.walkOnly && !o.car) j.walk = o.total; render(); } });
      draw(o, r, !!nav);
    }
  }
  function draw(o, r, noFit) {
    clearDraw(); drawn = L.layerGroup().addTo(map);
    var pts = [from.ll, [r.lat, r.lng]];
    o.legs.forEach(function (l) {
      if (l.kind === "walk") {
        var wl = l.rt ? l.rt.pts : [l.a, l.b];
        var da = l.car ? null : "1 11";
        L.polyline(wl, { color: "#fff", weight: 9, opacity: .95, dashArray: da, lineCap: "round", interactive: false }).addTo(drawn);
        L.polyline(wl, { color: "#2563eb", weight: 5, dashArray: da, lineCap: "round", interactive: false }).addTo(drawn);
        pts = pts.concat(wl);
      } else {
        var line = l.stops.map(function (i) { return [S[i][0], S[i][1]]; }), col = RT[l.route][2];
        L.polyline(line, { color: "#fff", weight: 9, opacity: .9, interactive: false }).addTo(drawn);
        L.polyline(line, { color: col, weight: 5, interactive: false }).addTo(drawn);
        [[l.from, l.dep], [l.to, l.arr]].forEach(function (p) {
          L.marker([S[p[0]][0], S[p[0]][1]], { interactive: false, icon: L.divIcon({ className: "", iconSize: [14, 14], iconAnchor: [7, 7], html: '<div class="tpdot" style="border-color:' + col + '"></div>' }) })
            .bindTooltip(fmtT(p[1]), { permanent: true, direction: "top", offset: [0, -6] }).addTo(drawn);
        });
        pts = pts.concat(line);
      }
    });
    L.marker([r.lat, r.lng], { interactive: false, zIndexOffset: 500, icon: L.divIcon({ className: "", iconSize: [24, 24], iconAnchor: [5, 22], html: '<div class="tpflag">🏁</div>' }) }).addTo(drawn);
    if (!noFit) try { map.fitBounds(L.latLngBounds(pts), { paddingTopLeft: [28, 70], paddingBottomRight: [28, 330], maxZoom: 16, animate: true }); } catch (e) {}
  }

  /* ---------- "Start trip": live turn-by-turn so nobody needs another maps app ---------- */
  var legTarget = function (n, l) { return l.egress ? n.r.name : tx("the stop ", "la parada ") + S[l.toStop][2]; };
  function advance(n) {
    var prev = n.legs[n.i]; n.i++; n.k = 0; n.off = 0;
    var l = n.legs[n.i];
    n.phase = !l ? "done" : (l.kind === "bus" ? "wait" : "walk");
    if (prev && prev.kind === "walk" && l && l.kind === "walk") n.phase = "walk";
  }
  /* pure state machine: takes a GPS point and the clock, returns what to show. No DOM here. */
  function navStep(n, pos, now, fix) {
    var vm = { icon: "", big: "", main: "", sub: "", alert: false, reroute: false, done: false, eta: 0 }, g = 0, leg, i;
    while (g++ < 6) {
      leg = n.legs[n.i];
      if (!leg) { n.phase = "done"; break; }
      if (n.phase === "walk") { if (dist(pos, leg.b) <= (leg.car ? 60 : 40)) { advance(n); continue; } }
      else if (n.phase === "wait") { if (now >= leg.dep - 2 && dist(pos, S[leg.from]) > 150) { n.phase = "ride"; n.k = 0; continue; } }
      else if (n.phase === "ride") {
        var st = leg.stops, last = st.length - 1, bk = n.k, bd = INF, d2;
        for (i = n.k; i <= last; i++) { d2 = dist(pos, S[st[i]]); if (d2 < bd) { bd = d2; bk = i; } }
        if (bd < 250) n.k = bk;
        if (n.k >= last && dist(pos, S[st[last]]) < 120) { advance(n); continue; }
      }
      break;
    }
    leg = n.legs[n.i];
    var nowEta = now;
    if (n.phase === "done") {
      vm.done = true; vm.icon = "🏁"; vm.main = tx("You've arrived!", "¡Has llegado!"); vm.sub = n.r.name; vm.eta = now;
      return vm;
    }
    if (n.phase === "walk") {
      var rem, nextBus = null;
      for (i = n.i + 1; i < n.legs.length; i++) if (n.legs[i].kind === "bus") { nextBus = n.legs[i]; break; }
      if (leg.rt && leg.rt.steps.length) {
        var pr = project(leg.rt, pos), ahead = null, s;
        rem = Math.max(0, leg.rt.len - pr.along);
        if (fix) { if (pr.off > (leg.car ? 100 : 70)) { n.off++; vm.reroute = n.off >= 2; } else n.off = 0; }
        for (i = 0; i < leg.rt.steps.length; i++) { s = leg.rt.steps[i]; if (s.at > pr.along + 8) { ahead = s; break; } }
        if (!ahead || ahead.last) { vm.icon = leg.car ? "🚗" : "🚶"; vm.main = (leg.car ? tx("Drive to ", "Conduce a ") : tx("Walk to ", "Camina a ")) + legTarget(n, leg); vm.big = fmtDist(rem); }
        else { vm.icon = ahead.icon; vm.main = ahead.text; vm.big = tx("In ", "En ") + fmtDist(Math.max(0, ahead.at - pr.along)); }
      } else {
        rem = dist(pos, leg.b) * DETOUR;
        vm.icon = "🧭"; vm.main = tx("Head ", "Dirígete al ") + cardinal(bearingTo(pos, leg.b)) + tx(" to ", " hacia ") + legTarget(n, leg); vm.big = "~" + fmtDist(rem);
      }
      var wm = Math.max(1, Math.ceil(rem / (leg.car ? CAR_M_PER_MIN : WALK_M_PER_MIN)));
      vm.sub = wm + " min" + (nextBus ? " · " + tx("then bus ", "luego autobús ") + RT[nextBus.route][0] + tx(" at ", " a las ") + fmtT(nextBus.dep) : "");
      if (nextBus && now + wm > nextBus.dep + 1) vm.sub += " · " + tx("hurry!", "¡apúrate!");
      nowEta = now + wm;
      if (n.o.walkOnly) vm.eta = now + wm;
    } else if (n.phase === "wait") {
      var mins = leg.dep - now;
      vm.icon = "🚏"; vm.big = fmtT(leg.dep);
      vm.main = tx("Wait for ", "Espera el ") + RT[leg.route][0] + " " + RT[leg.route][1];
      vm.sub = tx("at ", "en ") + S[leg.from][2] + " · " + (mins > 0 ? tx("in " + mins + " min", "en " + mins + " min") : (mins > -3 ? tx("leaving now", "sale ahora") : tx("may have left. Tap Re-plan", "puede que ya salió. Toca Replanear")));
      vm.late = mins < -2;
    } else {
      var left = leg.stops.length - 1 - n.k;
      vm.icon = "🚌";
      vm.big = left <= 0 ? tx("Get off now", "Baja ahora") : (left === 1 ? tx("Next stop", "Próxima parada") : left + " " + tx("stops", "paradas"));
      vm.main = left <= 1 ? tx("Get off at ", "Baja en ") + S[leg.to][2] : tx("Stay on ", "Sigue en ") + RT[leg.route][0] + tx(" until ", " hasta ") + S[leg.to][2];
      vm.sub = tx("Arrive ", "Llegas ") + fmtT(leg.arr);
      if (left <= 1) { vm.alert = true; var key = "r" + n.i + "_" + (left <= 0 ? 0 : 1); if (n.alerted[key]) vm.alert = false; else n.alerted[key] = 1; vm.exit = true; }
    }
    vm.eta = n.o.walkOnly ? nowEta : n.o.arrive;
    return vm;
  }

  var NAVHIDE = [".map-tools", "#busBtn", "#tpBtn", "#busCard", "#busNote"];
  function navUi() {
    if (nvTop) return;
    var c = document.createElement("style");
    c.textContent =
      "#nvTop{position:absolute;left:8px;right:8px;top:8px;z-index:1100;display:none;gap:12px;align-items:center;padding:12px 14px;border-radius:16px;background:rgba(10,14,23,.96);color:#fff;border:2px solid #22d3ee;box-shadow:0 8px 24px rgba(0,0,0,.5)}" +
      "#nvTop.alert{background:#fbbf24;color:#111;border-color:#fff}" +
      "#nvTop .nv-ic{font-size:calc(34px*var(--ts,1));line-height:1;width:44px;text-align:center;flex:none}" +
      "#nvTop .nv-big{font-size:calc(22px*var(--ts,1));font-weight:800;line-height:1.1}#nvTop .nv-main{font-size:calc(17px*var(--ts,1));font-weight:700;line-height:1.2;margin-top:2px}" +
      "#nvTop .nv-sub{font-size:calc(13px*var(--ts,1));opacity:.85;margin-top:3px}" +
      "#nvBot{position:absolute;left:0;right:0;bottom:0;z-index:1100;display:none;padding:10px 12px 12px;background:rgba(10,14,23,.97);color:#fff;border-radius:18px 18px 0 0;border-top:1px solid #334}" +
      "#nvBot .nv-eta{font-size:calc(16px*var(--ts,1));margin-bottom:8px;text-align:center}#nvBot .nv-btns{display:flex;gap:6px}" +
      "#nvBot button{flex:1;border:0;border-radius:12px;padding:7px 2px;background:rgba(127,127,127,.3);color:inherit;font-size:calc(18px*var(--ts,1));line-height:1.1}" +
      "#nvBot button small{display:block;font-size:calc(10px*var(--ts,1));margin-top:2px}#nvBot button.end{background:#ef4444;color:#fff}" +
      ".nvdot{width:22px;height:22px;border-radius:50%;background:#2563eb;border:3px solid #fff;box-shadow:0 0 0 7px rgba(37,99,235,.3)}";
    document.head.appendChild(c);
    nvTop = document.createElement("div"); nvTop.id = "nvTop";
    nvBot = document.createElement("div"); nvBot.id = "nvBot";
    [nvTop, nvBot].forEach(function (e) {
      ["click", "dblclick", "mousedown", "touchstart", "wheel"].forEach(function (ev) { e.addEventListener(ev, function (x) { x.stopPropagation(); }); });
      if (L.DomEvent) { L.DomEvent.disableClickPropagation(e); L.DomEvent.disableScrollPropagation(e); }
      tab.appendChild(e);
    });
  }
  function navBars(on) { if (nvTop) nvTop.style.display = on ? "flex" : "none"; if (nvBot) nvBot.style.display = on ? "block" : "none"; }
  function navChrome(hide) { NAVHIDE.forEach(function (s) { var e = tab.querySelector(s); if (e) e.style.display = hide ? "none" : ""; }); }
  function buzz(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }
  function say(txt) {
    if (!nav || !nav.speak || nav.said === txt) return; nav.said = txt;
    try { if (window.speechSynthesis) { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(txt); u.lang = es() ? "es-US" : "en-US"; speechSynthesis.speak(u); } } catch (e) {}
  }
  function paint(vm) {
    if (!nav || !vm) return;
    nav.vm = vm;
    var tcls = vm.alert || vm.exit ? "alert" : "";
    var th = '<div class="nv-ic">' + vm.icon + '</div><div style="flex:1;min-width:0"><div class="nv-big">' + esc(vm.big) + '</div><div class="nv-main">' + esc(vm.main) + '</div><div class="nv-sub">' + esc(vm.sub) + "</div></div>" +
      (!nav.gps && !vm.done ? '<div style="font-size:calc(12px*var(--ts,1));opacity:.8;max-width:70px">' + tx("Finding GPS…", "Buscando GPS…") + "</div>" : "");
    if (nav._th !== th || nav._tc !== tcls) { nvTop.className = tcls; nvTop.innerHTML = th; nav._th = th; nav._tc = tcls; }
    var left = Math.max(0, vm.eta - nowMin());
    var bh = '<div class="nv-eta">' + (vm.done ? "🏁 " + tx("Trip complete", "Viaje completo") : "<b>" + fmtD(left) + "</b> · " + tx("arrive ", "llegas ") + fmtT(vm.eta)) + "</div>" +
      '<div class="nv-btns">' +
      '<button data-n="steps" aria-label="Steps">📋<small>' + tx("Steps", "Pasos") + "</small></button>" +
      '<button data-n="center" aria-label="Center">🎯<small>' + tx("Center", "Centrar") + "</small></button>" +
      '<button data-n="speak" aria-label="Voice">' + (nav.speak ? "🔊" : "🔇") + "<small>" + tx("Voice", "Voz") + "</small></button>" +
      '<button data-n="skip" aria-label="Next step">⏭<small>' + tx("Next", "Sigue") + "</small></button>" +
      '<button data-n="replan" aria-label="Re-plan">🔄<small>' + tx("Re-plan", "Replanear") + "</small></button>" +
      '<button data-n="end" class="end" aria-label="End trip">✕<small>' + (vm.done ? tx("Done", "Listo") : tx("End", "Fin")) + "</small></button></div>";
    if (nav._bh !== bh) { nvBot.innerHTML = bh; nav._bh = bh; Array.prototype.forEach.call(nvBot.querySelectorAll("button"), function (b) { b.onclick = function () { navAct(b.dataset.n); }; }); }
    if (vm.alert) buzz([300, 150, 300, 150, 300]);
    say((vm.big ? vm.big + ". " : "") + vm.main);
  }
  function navAct(a) {
    if (!nav) return;
    if (a === "end") { endNav(); view = "results"; open(); }
    else if (a === "center") { nav.follow = true; if (nav.pos) map.setView(nav.pos, Math.max(map.getZoom(), 17), { animate: true }); }
    else if (a === "speak") { nav.speak = !nav.speak; nav.said = ""; try { localStorage.setItem("haven_tp_speak", nav.speak ? "1" : "0"); } catch (e) {} paint(nav.vm); if (nav.speak) { nav.said = ""; say(nav.vm.main); } }
    else if (a === "skip") {
      var cl = nav.legs[nav.i];
      if (nav.phase === "wait") { nav.phase = "ride"; nav.k = 0; } else if (nav.phase === "walk" || nav.phase === "ride") advance(nav);
      nav.pos = nav.pos || from.ll; paint(navStep(nav, nav.phase === "walk" || nav.phase === "ride" ? posFor(cl) : nav.pos, nowMin(), false));
    }
    else if (a === "replan") { endNav(); startNow = true; sheet.style.display = "flex"; go(); }
    else if (a === "steps") {
      var ix = nav.x.j.opts.indexOf(nav.o); if (ix >= 0) curOpt = ix;
      cur = nav.x; view = "detail"; open();
    }
  }
  /* after a manual skip, pretend we're at the end of the leg we skipped so the next phase starts cleanly */
  function posFor(prevLeg) {
    var l = nav.legs[nav.i]; if (!l) return nav.pos;
    if (l.kind === "walk") return prevLeg && prevLeg.kind === "bus" ? S[prevLeg.to] : nav.pos;
    return S[l.from];
  }
  function bearing(a, b) {
    var r = Math.PI / 180, y = Math.sin((b[1] - a[1]) * r) * Math.cos(b[0] * r),
        x = Math.cos(a[0] * r) * Math.sin(b[0] * r) - Math.sin(a[0] * r) * Math.cos(b[0] * r) * Math.cos((b[1] - a[1]) * r);
    return (Math.atan2(y, x) / r + 360) % 360;
  }
  /* Navigation arrow: turns with the phone's compass (or your direction of travel when driving). */
  function setArrow(hd) {
    if (!nav || !nav.mk || typeof hd !== "number" || isNaN(hd)) return;
    var cur = nav.hd == null ? hd : nav.hd, d = ((hd - cur + 540) % 360) - 180; nav.hd = cur + d; // short way round
    var el = nav.mk.getElement(); if (el && el.firstChild) el.firstChild.style.transform = "rotate(" + nav.hd + "deg)";
  }
  window.hvNavHeading = function (h) { if (nav && !(nav.driveAt && Date.now() - nav.driveAt < 3000)) setArrow(h); };
  function moveMarker(pos, hd) {
    if (!nav.mk) {
      nav.mk = L.marker(pos, { interactive: false, keyboard: false, zIndexOffset: 2000, icon: L.divIcon({ className: "", iconSize: [56, 56], iconAnchor: [28, 28], html: '<div class="hv-arrow"><svg viewBox="0 0 44 44"><path d="M22 2 L38 40 L22 31 L6 40 Z" fill="#2563eb" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg></div>' }) }).addTo(map);
      setArrow(typeof window.hvHeading === "number" ? window.hvHeading : 0);
    } else if (window.hvGlide) window.hvGlide(nav.mk, pos); else nav.mk.setLatLng(pos);
    if (typeof hd === "number" && !isNaN(hd)) setArrow(hd);
  }
  function reroute(leg, pos) {
    var n = nav; if (!n || n.rer) return; n.rer = true;
    fetchWalk(pos, leg.b, function (rt) {
      n.rer = false; if (nav !== n) return;
      if (rt) { leg.rt = rt; leg.a = pos; n.off = 0; draw(n.o, n.r, true); }
    }, leg.car);
  }
  function onFix(pos, acc, gpsHd) {
    if (!nav) return;
    if (acc && acc > 150 && nav.gps) return;
    var first = !nav.gps; nav.pos = pos; nav.gps = true;
    try { if (typeof state !== "undefined") state.loc = pos; } catch (e) {}
    var l0 = nav.legs[nav.i];
    if (first && nav.phase === "walk" && nav.i === 0 && l0 && dist(pos, l0.a) > 40) reroute(l0, pos);
    var vm = navStep(nav, pos, nowMin(), true);
    var hd = null;
    if (typeof gpsHd === "number" && !isNaN(gpsHd)) { hd = gpsHd; nav.driveAt = Date.now(); } // moving fast: follow the road
    else if (window.hvHeading == null && nav.fix && dist(nav.fix, pos) > 4) hd = bearing(nav.fix, pos); // no compass: use travel direction
    if (!nav.fix || dist(nav.fix, pos) > 4) nav.fix = pos;
    moveMarker(pos, hd);
    if (nav.follow) { try { var cp = map.latLngToContainerPoint(pos), sz = map.getSize(); if (Math.abs(cp.x - sz.x / 2) + Math.abs(cp.y - sz.y / 2) > 14) map.panTo(pos, { animate: true, duration: 1, easeLinearity: 1, noMoveStart: true }); } catch (e) {} }
    var cl = nav.legs[nav.i];
    if (vm.reroute && cl && cl.kind === "walk") reroute(cl, pos);
    if (vm.done && !nav.doneBuzz) { nav.doneBuzz = 1; buzz([400, 200, 400]); }
    paint(vm);
  }
  function startNav(x, o) {
    if (nav) endNav(true);
    navUi();
    nav = { x: x, r: x.r, o: o, legs: o.legs, i: 0, phase: "walk", k: 0, pos: from.ll, gps: false, follow: true, alerted: {}, off: 0, speak: false, vm: null, mk: null };
    try { nav.speak = localStorage.getItem("haven_tp_speak") === "1"; } catch (e) {}
    window.__hvNav = true; try { if (window.hvStartCompass) window.hvStartCompass(); } catch (e) {}
    close(); navChrome(true); navBars(true);
    try { if (typeof locMarker !== "undefined" && locMarker) locMarker.setOpacity(0); } catch (e) {}
    draw(o, x.r, true);
    map.on("dragstart", nav.drag = function () { if (nav) nav.follow = false; });
    try { map.setView(from.ll, o.car ? 16 : 17, { animate: true }); } catch (e) {}
    moveMarker(from.ll);
    paint(navStep(nav, from.ll, nowMin(), false));
    window.hvOnFix = function (ll, acc, hd) { onFix(ll, acc, hd); };
    window.hvOnGpsErr = function (e) { if (nav && e && e.code === 1) { nav.gps = false; nvTop.querySelector(".nv-sub").textContent = tx("Location is off. Turn it on, or tap Next to step through.", "La ubicación está apagada. Actívala, o toca Sigue para avanzar."); } };
    try { if (window.hvStartLive) window.hvStartLive(); } catch (e) {}
    try { if (typeof lastFixT !== "undefined" && state.loc && Date.now() - lastFixT < 10000) onFix(state.loc, 25); } catch (e) {} // use the fix we already have
    nav.tick = setInterval(function () { if (nav && nav.pos) paint(navStep(nav, nav.pos, nowMin(), false)); }, 15000);
    try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then(function (w) { if (nav) nav.wl = w; else w.release(); }).catch(function () {}); } catch (e) {}
  }
  function endNav(quiet) {
    var n = nav; if (!n) return; nav = null; window.__hvNav = false; window.hvOnFix = null; window.hvOnGpsErr = null;
    try { if (n.watch != null) navigator.geolocation.clearWatch(n.watch); } catch (e) {}
    clearInterval(n.tick);
    try { if (n.wl) n.wl.release(); } catch (e) {}
    try { if (n.mk) map.removeLayer(n.mk); map.off("dragstart", n.drag); } catch (e) {}
    try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
    try { if (typeof locMarker !== "undefined" && locMarker) locMarker.setOpacity(1); } catch (e) {}
    navBars(false); navChrome(false); clearDraw();
  }

  /* ---------- in-app destination links ----------
     The Directions and Bus buttons on pins/cards open THIS map instead of Google Maps or another app.
     mode "bus"  = Citilink bus trip (falls back to walking when no bus runs)
     mode "walk" = walking route with turn-by-turn, drawn on the Haven map */
  function goTo(d, mode) {
    if (!sheet || !d || isNaN(d.lat) || isNaN(d.lng)) return false;
    var r = d.id ? rById(d.id) : null, i;
    if (!r) for (i = 0; i < RESOURCES.length; i++) {
      var q = RESOURCES[i];
      if (typeof q.lat === "number" && Math.abs(q.lat - d.lat) < 2e-5 && Math.abs(q.lng - d.lng) < 2e-5) { r = q; break; }
    }
    if (!r) r = { id: "x-dest", name: d.name || tx("Destination", "Destino"), addr: d.addr || "", lat: +d.lat, lng: +d.lng, cats: [] };
    try { if (typeof closeSheet === "function") closeSheet(); } catch (e) {}
    try { var _psh = document.getElementById("sheet"); if (_psh) _psh.classList.remove("show"); var _psc = document.getElementById("scrim"); if (_psc) _psc.classList.remove("show"); var _ppk = document.getElementById("peek"); if (_ppk) _ppk.classList.remove("show"); } catch (e) {}
    try { if (typeof closeQuickActions === "function") closeQuickActions(); } catch (e) {}
    try { if (typeof goTab === "function") goTab("map"); } catch (e) {}
    if (nav) endNav(true);
    view = "results"; startNow = true; startMin = nowMin(); results = []; cur = null; curOpt = 0;
    sheet.classList.remove("det"); sheet.style.display = "flex";
    sheet.innerHTML = head((mode === "car" ? "🚗 " : mode === "walk" ? "🧭 " : "🚌 ") + esc(r.name)) + '<div class="tp-body"><div class="tp-from" style="padding:24px;text-align:center">' + tx("Finding your location…", "Buscando tu ubicación…") + "</div></div>";
    wire({});
    getFrom(function (f) {
      from = f;
      var j = journeysTo(f.ll, r, nowMin(), new Date()), best;
      if (mode === "walk") best = { kind: "walk", sortKey: 0 };
      else if (mode === "car") best = { kind: "car", sortKey: 0 };
      else best = j.opts[0] ? { kind: "bus", opt: j.opts[0], sortKey: 0 } : bestOf(j);
      cur = { r: r, j: j, best: best, mode: mode === "car" ? "car" : null }; results = [cur]; curOpt = 0; view = "detail";
      open();
      if (f.fallback) note(tx("Turn on location for exact directions from where you are.", "Activa la ubicación para direcciones exactas desde donde estás."));
    });
    return true;
  }
  window.havenGoTo = goTo;

  /* catch every Directions / Bus link in the app (pin cards, quick actions, events, jobs, saved pins, bus stops) */
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a || !sheet || a.closest("#tpSheet")) return;
    var go = a.getAttribute("data-hv-go"), href = a.getAttribute("href") || "", d = null, mode = null, m;
    if (go) { d = { lat: parseFloat(a.getAttribute("data-lat")), lng: parseFloat(a.getAttribute("data-lng")), name: a.getAttribute("data-name") || "" }; mode = go; }
    else if ((m = href.match(/^geo:(-?[\d.]+),(-?[\d.]+)(?:\?q=(.*))?$/i))) {
      var qs = ""; try { qs = decodeURIComponent(m[3] || ""); } catch (x) { qs = m[3] || ""; }
      var pm = qs.match(/^-?[\d.]+,-?[\d.]+\((.*)\)$/);
      d = { lat: parseFloat(m[1]), lng: parseFloat(m[2]), name: (pm ? pm[1] : qs.replace(/,\s*Fort Wayne,\s*IN\s*$/i, "")) }; mode = "walk";
    } else if (href.indexOf("google.com/maps/dir/") >= 0 && href.indexOf("origin=") < 0 && (m = href.match(/destination=(-?[\d.]+),(-?[\d.]+)/))) {
      d = { lat: parseFloat(m[1]), lng: parseFloat(m[2]), name: "" }; mode = /travelmode=driving/.test(href) ? "car" : "bus";
    }
    if (!d || isNaN(d.lat) || isNaN(d.lng)) return;
    e.preventDefault(); e.stopPropagation(); if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    goTo(d, mode);
  }, true);

  window.HAVEN_PLAN = { plan: plan, options: options, journeysTo: journeysTo, svcFor: svcFor, fmtT: fmtT, dismiss: function () { try { if (!nav) { close(); clearDraw(); } } catch (e) {} }, _t: { navStep: navStep, mkRoute: mkRoute, project: project, retime: retime, stepInfo: stepInfo, fmtDist: fmtDist, fetchWalk: fetchWalk, ensureWalks: ensureWalks, walkOpt: walkOpt } };

  function start() {
    if (typeof map === "undefined" || !map) { setTimeout(start, 200); return; }
    build();
  }
  if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", start); else start();
  }
  boot();
})();
