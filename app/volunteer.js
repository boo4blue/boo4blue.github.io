/* Haven FW website - Volunteer tab (feature #33).
 * Ported from the Android app's haven-volunteer.js. Overrides window.renderVolunteer
 * (declared as a stub in app.js); this file loads after app.js so the override wins.
 * Data: window.HAVEN_VOL / window.HAVEN_VOL_GROUPS from volunteer-data.js.
 * Uses app.js globals: escapeHtml, escapeAttr, distMi, userLoc, goTab, miniToast,
 * openPlacePanel, getArea, map. English-only (site convention). */
"use strict";
var volGroup = "all", volQuery = "";
var VOL_ICONS = { all: "✨", meals: "🍲", animals: "🐾", build: "🔨", kids: "🧑‍🎓", people: "🤝", hub: "🔎", earn: "🛠️", court: "⚖️" };

function volGroups() { return (typeof HAVEN_VOL_GROUPS !== "undefined" && HAVEN_VOL_GROUPS) || [["all", "All"]]; }
function volData() { return (typeof HAVEN_VOL !== "undefined" && HAVEN_VOL) || []; }
function volToday() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function volLive() { var t0 = volToday(); return volData().filter(function (v) { return !v.until || v.until >= t0; }); }
function volIsFW() { try { return (typeof getArea === "function" ? getArea() : "fort-wayne") === "fort-wayne"; } catch (e) { return true; } }
function volDistTxt(v) {
  try {
    if (typeof v.lat === "number" && typeof userLoc !== "undefined" && userLoc && typeof distMi === "function") {
      var m = distMi(userLoc.lat, userLoc.lng, v.lat, v.lng);
      return "📍 " + m.toFixed(1) + " mi";
    }
  } catch (e) {}
  return "";
}
function volPhoneHref(v) {
  if (v.phoneHref) return v.phoneHref;
  var d = String(v.phone || "").replace(/\D/g, "");
  if (d.length === 10) return "+1" + d;
  return d ? "+" + d : "";
}
function volDirUrl(v) {
  if (typeof v.lat === "number") return "https://maps.google.com/?q=" + v.lat + "," + v.lng;
  return "https://maps.google.com/?q=" + encodeURIComponent((v.name || "") + "," + (v.addr || ""));
}
function volTransitUrl(v) {
  var d = (typeof v.lat === "number") ? (v.lat + "," + v.lng) : ((v.name || "") + " " + (v.addr || ""));
  return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(d) + "&travelmode=transit";
}
function volCard(v) {
  var E = (typeof escapeHtml === "function") ? escapeHtml : function (s) { return String(s); };
  var EA = (typeof escapeAttr === "function") ? escapeAttr : function (s) { return String(s); };
  var earn = v.cat === "workmeal", col = earn ? "#10b981" : "#f59e0b";
  var dist = volDistTxt(v);
  var badge = v.v === "ok"
    ? '<span class="vl-badge ok">✅ Details confirmed</span>'
    : '<span class="vl-badge call">📞 Call to confirm</span>';
  var court = v.court ? '<span class="vl-badge court">⚖️ Court / school hours OK</span>' : "";
  var btns = "";
  if (v.phone) btns += '<a class="vl-btn" href="tel:' + EA(volPhoneHref(v)) + '">📞 Call</a>';
  if (v.web) btns += '<a class="vl-btn" href="' + EA(v.web) + '" target="_blank" rel="noopener">🌐 Sign up / info</a>';
  if (v.addr || typeof v.lat === "number") {
    btns += '<a class="vl-btn" href="' + EA(volDirUrl(v)) + '" target="_blank" rel="noopener">🗺️ Directions</a>';
    btns += '<a class="vl-btn" href="' + EA(volTransitUrl(v)) + '" target="_blank" rel="noopener">🚌 Transit</a>';
  }
  if (typeof v.lat === "number") btns += '<button class="vl-btn" data-volmap="' + EA(v.id) + '">🗺️ Map</button>';
  var tags = (v.tags && v.tags.length) ? '<div class="vl-tags">' + v.tags.map(function (t) { return "<span>✓ " + E(t) + "</span>"; }).join("") + "</div>" : "";
  var h = '<div class="vl-card" style="border-left:4px solid ' + col + ';">';
  h += '<div class="vl-top"><div class="vl-ic">' + (earn ? "🛠️" : "🙌") + "</div>";
  h += '<div><div class="vl-name">' + E(v.name) + '</div><div class="vl-meta">' + badge + court + (dist ? '<span class="vl-dist">' + E(dist) + "</span>" : "") + "</div></div></div>";
  if (v.addr) h += '<div class="vl-addr">📌 ' + E(v.addr) + (v.zip ? ", Fort Wayne, IN " + E(v.zip) : "") + "</div>";
  h += '<div class="vl-rows">'
    + (v.how ? '<div class="vl-row"><b>How to sign up</b><span>' + E(v.how) + "</span></div>" : "")
    + (v.times ? '<div class="vl-row"><b>When</b><span>' + E(v.times) + "</span></div>" : "")
    + (v.perk ? '<div class="vl-row vl-perk"><b>What you get</b><span>' + E(v.perk) + "</span></div>" : "")
    + "</div>";
  h += tags + (btns ? '<div class="vl-act">' + btns + "</div>" : "");
  return h + "</div>";
}
function volMatch(v) {
  if (volGroup === "court") { if (!v.court) return false; }
  else if (volGroup === "earn") { if (v.cat !== "workmeal") return false; }
  else if (volGroup !== "all" && v.g !== volGroup) return false;
  if (volQuery) {
    var hay = (v.name + " " + (v.addr || "") + " " + (v.how || "") + " " + (v.times || "") + " " + (v.perk || "") + " " + (v.tags || []).join(" ")).toLowerCase();
    if (hay.indexOf(volQuery) < 0) return false;
  }
  return true;
}
window.volShowOnMap = function (id) {
  var r = null;
  try { r = volData().filter(function (v) { return v.id === id; })[0] || null; } catch (e) {}
  if (!r) { if (typeof miniToast === "function") miniToast("That place isn't on the map."); return; }
  try { if (typeof goTab === "function") goTab("map"); } catch (e) {}
  setTimeout(function () {
    try {
      if (typeof map !== "undefined" && map && typeof r.lat === "number" && typeof map.setView === "function") map.setView([r.lat, r.lng], 16);
      if (typeof openPlacePanel === "function") openPlacePanel({ name: r.name, addr: r.addr, phone: r.phone, lat: r.lat, lng: r.lng, cats: ["volunteer"] });
    } catch (e) {}
  }, 250);
};
window.renderVolunteer = function () {
  var el = document.getElementById("volunteer-list");
  if (!el) return;
  var E = (typeof escapeHtml === "function") ? escapeHtml : function (s) { return String(s); };
  // Build the shell once so the search input keeps focus across re-renders.
  if (!document.getElementById("volChips")) {
    el.innerHTML = '<div id="volNote"></div>'
      + '<input id="volQ" type="search" autocomplete="off" placeholder="Search (food, dogs, kids, bike…)">'
      + '<div id="volChips"></div><div id="volList"></div>';
    document.getElementById("volQ").addEventListener("input", function (e) { volQuery = e.target.value.trim().toLowerCase(); window.renderVolunteer(); });
  }
  var note = document.getElementById("volNote");
  if (note) note.innerHTML = volIsFW() ? "" : '<div class="vl-areanote">📍 Fort Wayne listings — Portland volunteer listings coming soon.</div>';
  var chipsEl = document.getElementById("volChips");
  var groups = volGroups();
  chipsEl.innerHTML = groups.map(function (g) {
    var k = g[0], icon = VOL_ICONS[k] || "•";
    return '<button class="vl-chip' + (volGroup === k ? " on" : "") + '" data-vg="' + k + '">' + icon + " " + E(g[1]) + "</button>";
  }).join("");
  chipsEl.querySelectorAll(".vl-chip").forEach(function (b) {
    b.onclick = function () { volGroup = b.getAttribute("data-vg"); window.renderVolunteer(); };
  });
  var list = volLive().filter(volMatch);
  list.sort(function (a, b) {
    if (volGroup === "all" && !volQuery) {
      var ea = a.cat === "workmeal" ? 0 : 1, eb = b.cat === "workmeal" ? 0 : 1;
      if (ea !== eb) return ea - eb;
    }
    try {
      if (typeof userLoc !== "undefined" && userLoc && typeof a.lat === "number" && typeof b.lat === "number" && typeof distMi === "function")
        return distMi(userLoc.lat, userLoc.lng, a.lat, a.lng) - distMi(userLoc.lat, userLoc.lng, b.lat, b.lng);
    } catch (e) {}
    return String(a.name || "").localeCompare(String(b.name || ""));
  });
  var listEl = document.getElementById("volList");
  var head = '<div class="vl-sum">🙌 ' + list.length + " places" + ((volGroup === "all" && !volQuery) ? " · work-for-it programs first" : "") + "</div>";
  listEl.innerHTML = list.length ? head + list.map(volCard).join("")
    : '<div class="vl-empty">😕 Nothing matches. Try “food”, “dogs” or clear the search.</div>';
  listEl.querySelectorAll("[data-volmap]").forEach(function (b) {
    b.onclick = function (e) { e.stopPropagation(); window.volShowOnMap(b.getAttribute("data-volmap")); };
  });
};
/* Cross-link banners on Jobs + Gigs (same as the app). Guarded by .vol-banner so re-runs are safe. */
function volBanner() {
  if (typeof document === "undefined") return;
  [["tab-jobs", "jobs-list"], ["tab-gigs", "gig-list"]].forEach(function (pair) {
    try {
      var tab = document.getElementById(pair[0]); if (!tab || tab.querySelector(".vol-banner")) return;
      var anchor = document.getElementById(pair[1]); if (!anchor || !anchor.parentNode) return;
      var b = document.createElement("button");
      b.className = "vol-banner";
      b.innerHTML = '🙌 <span><b>Volunteer or work for a meal</b><small>Places that need help — and ways to earn a bike, a program spot or more</small></span> ›';
      b.onclick = function () { try { if (typeof goTab === "function") goTab("volunteer"); } catch (e) {} };
      anchor.parentNode.insertBefore(b, anchor);
    } catch (e) {}
  });
}
try { volBanner(); } catch (e) {}
/* Map pins + Places-list entries: the app merges volunteer listings into RESOURCES.
 * On the website the data file loads later (fetch+eval in loadData), so merge lazily
 * at the start of init(). Idempotent via _volMerged + per-id guard. */
var _volMerged = false;
function volMergeIntoResources() {
  if (_volMerged) return;
  if (typeof RESOURCES === "undefined" || !RESOURCES || typeof RESOURCES.push !== "function") return;
  if (typeof HAVEN_VOL === "undefined" || !HAVEN_VOL.length) return;
  _volMerged = true;
  try {
    if (typeof FILTER_CATS !== "undefined") {
      FILTER_CATS.volunteer = "🙌 Volunteer";
      FILTER_CATS.workmeal = "🛠️ Work for a meal";
    }
    if (typeof PIN_EMOJI !== "undefined") { PIN_EMOJI.volunteer = "🙌"; PIN_EMOJI.workmeal = "🛠️"; }
    if (typeof PIN_COLOR !== "undefined") { PIN_COLOR.volunteer = "#f59e0b"; PIN_COLOR.workmeal = "#10b981"; }
  } catch (e) {}
  var seen = {};
  try { RESOURCES.forEach(function (r) { seen[r.id] = 1; }); } catch (e) {}
  HAVEN_VOL.forEach(function (v) {
    if (typeof v.lat !== "number" || seen[v.id]) return;
    seen[v.id] = 1;
    var desc = "🙌 HOW: " + v.how + " WHEN: " + v.times + " YOU GET: " + v.perk +
      (v.v === "call" ? " (Details from a listing - call first.)" : "");
    RESOURCES.push({
      id: v.id, name: v.name, cats: [v.cat], addr: v.addr, zip: v.zip, lat: v.lat, lng: v.lng,
      phone: v.phone, phoneHref: v.phoneHref, web: v.web, desc: desc,
      tags: (v.tags || []).concat(["volunteer"]), hoursText: v.times
    });
  });
}
try {
  var _volOrigInit = window.init;
  if (typeof _volOrigInit === "function" && !window.init._volWrapped) {
    var _volWrappedInit = function () {
      try { volMergeIntoResources(); } catch (e) {}
      return _volOrigInit.apply(this, arguments);
    };
    _volWrappedInit._volWrapped = true;
    window.init = _volWrappedInit;
  }
} catch (e) {}
