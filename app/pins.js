/* Haven FW website — My pins (feature #28): mark your own spots on the map.
   Ported from the Android app's more-features.js ("My pins"). Everything stays on
   this device in localStorage 'haven_pins' (same key as the app). */
(function () {
  "use strict";
  var KEY = "haven_pins";
  var PIN_TYPES = [
    ["safe", "🛡️", "Safe spot", "#34d399"],
    ["shower", "🚿", "Shower", "#b48cf2"],
    ["laundry", "🧺", "Laundry", "#93c5fd"],
    ["sleep", "🛏️", "Sleep spot", "#fb923c"],
    ["water", "💧", "Water", "#38bdf8"],
    ["charge", "🔌", "Charging", "#facc15"],
    ["other", "⭐", "Other", "#f472b6"]
  ];
  function pinT(k) { for (var i = 0; i < PIN_TYPES.length; i++) if (PIN_TYPES[i][0] === k) return PIN_TYPES[i]; return PIN_TYPES[6]; }
  function pins() { try { var p = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(p) ? p : []; } catch (e) { return []; } }
  function savePins(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) {} }
  function esc(s) { return typeof escapeHtml === "function" ? escapeHtml(s) : String(s == null ? "" : s); }
  function escA(s) { return typeof escapeAttr === "function" ? escapeAttr(s) : String(s == null ? "" : s); }
  function toast(m) { if (typeof miniToast === "function") miniToast(m); }

  /* ---------- map layer ---------- */
  var pinLayer = null;
  function drawPins() {
    if (typeof L === "undefined" || typeof map === "undefined" || !map) return;
    try {
      if (pinLayer) { try { map.removeLayer(pinLayer); } catch (e) {} pinLayer = null; }
      pinLayer = L.layerGroup().addTo(map);
      pins().forEach(function (p) {
        if (typeof p.lat !== "number" || typeof p.lng !== "number" || isNaN(p.lat) || isNaN(p.lng)) return;
        var pt = pinT(p.type);
        L.marker([p.lat, p.lng], {
          icon: L.divIcon({ className: "", html: '<div class="mypin" style="background:' + pt[3] + '">' + pt[1] + "</div>", iconSize: [34, 34], iconAnchor: [17, 17] }),
          zIndexOffset: 900
        }).on("click", function () { pinDetail(p.id); }).addTo(pinLayer);
      });
    } catch (e) {}
  }

  /* ---------- overlay dialog ---------- */
  function closePinOv() { var o = document.getElementById("pinOv"); if (o) o.remove(); }
  function pinOv(html) {
    closePinOv();
    var ov = document.createElement("div");
    ov.id = "pinOv"; ov.className = "pin-ov";
    ov.innerHTML = '<div class="pin-card">' + html + "</div>";
    ov.addEventListener("click", function (e) { if (e.target === ov) closePinOv(); });
    document.body.appendChild(ov);
    return ov;
  }

  /* ---------- add a pin ---------- */
  function addPin(lat, lng) {
    if (typeof lat !== "number" || typeof lng !== "number" || isNaN(lat) || isNaN(lng)) return;
    var type = "safe";
    var ov = pinOv(
      "<h2 style=\"color:#fff;margin:0 0 8px;\">📌 New pin</h2>" +
      "<p style=\"color:#888;font-size:14px;margin:0 0 12px;\">Mark your own spot. It is saved only on this device. You can share it later.</p>" +
      "<input id=\"pnName\" maxlength=\"40\" placeholder=\"Name\" autocomplete=\"off\" aria-label=\"Pin name\" style=\"width:100%;padding:10px;border:1px solid #333;border-radius:8px;background:#0f1420;color:#fff;font-size:15px;box-sizing:border-box;\">" +
      "<div id=\"pnTypes\" style=\"display:flex;flex-wrap:wrap;gap:6px;margin:12px 0;\"></div>" +
      "<textarea id=\"pnNote\" maxlength=\"200\" placeholder=\"Note (optional)\" aria-label=\"Pin note\" style=\"width:100%;padding:10px;border:1px solid #333;border-radius:8px;background:#0f1420;color:#fff;font-size:14px;min-height:56px;box-sizing:border-box;\"></textarea>" +
      "<div style=\"display:flex;gap:8px;margin-top:12px;\">" +
      "<button id=\"pnSave\" style=\"flex:1;padding:12px;background:#7c8aff;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:bold;cursor:pointer;\">💾 Save pin</button>" +
      "<button id=\"pnX\" style=\"padding:12px 18px;background:#2a2f3e;color:#fff;border:1px solid #444;border-radius:10px;font-size:15px;cursor:pointer;\">✕</button></div>"
    );
    var draw = function () {
      ov.querySelector("#pnTypes").innerHTML = PIN_TYPES.map(function (t) {
        return '<button data-k="' + t[0] + '" style="padding:8px 12px;border-radius:14px;border:1px solid ' + (type === t[0] ? "#7c8aff" : "#444") + ";background:" + (type === t[0] ? "#2a2440" : "#1a1f2e") + ';color:#fff;font-size:14px;cursor:pointer;">' + t[1] + " " + esc(t[2]) + "</button>";
      }).join("");
      ov.querySelectorAll("#pnTypes [data-k]").forEach(function (b) {
        b.onclick = function () { type = b.dataset.k; draw(); };
      });
    };
    draw();
    ov.querySelector("#pnX").onclick = closePinOv;
    ov.querySelector("#pnSave").onclick = function () {
      var name = ov.querySelector("#pnName").value.trim() || pinT(type)[2];
      var note = ov.querySelector("#pnNote").value.trim();
      var a = pins();
      a.push({ id: "p" + Date.now().toString(36), name: name, type: type, note: note, lat: lat, lng: lng });
      savePins(a); closePinOv(); drawPins(); renderPinsList();
      toast("Pin saved 📌");
    };
    var nm = ov.querySelector("#pnName"); if (nm) nm.focus();
  }
  function pinHere() {
    var c = null;
    if (typeof userLoc !== "undefined" && userLoc && typeof userLoc.lat === "number") c = [userLoc.lat, userLoc.lng];
    else if (typeof map !== "undefined" && map) { try { var z = map.getCenter(); c = [z.lat, z.lng]; } catch (e) {} }
    if (!c) { toast("Map is not ready yet — try again in a moment."); return; }
    addPin(c[0], c[1]);
  }

  /* ---------- pin detail ---------- */
  function sharePin(p) {
    var pt = pinT(p.type);
    var txt = "📌 " + p.name + " (" + pt[2] + ")" + (p.note ? " - " + p.note : "") + "\nhttps://www.google.com/maps/search/?api=1&query=" + p.lat + "," + p.lng;
    if (navigator.share) { navigator.share({ text: txt }).catch(function () {}); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { toast("Copied! 📋"); }, function () { prompt("Copy:", txt); });
      return;
    }
    prompt("Copy:", txt);
  }
  function pinDetail(id) {
    var p = pins().filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var pt = pinT(p.type);
    var ov = pinOv(
      "<h2 style=\"color:#fff;margin:0 0 4px;\">" + pt[1] + " " + esc(p.name) + "</h2>" +
      "<p style=\"color:#888;font-size:13px;margin:0 0 12px;\">" + esc(pt[2]) + " · Only you see this pin</p>" +
      (p.note ? "<p style=\"color:#e0e0e0;background:#232a3d;border-radius:8px;padding:10px;font-size:14px;\">" + esc(p.note) + "</p>" : "") +
      '<a href="https://www.google.com/maps/search/?api=1&query=' + p.lat + "," + p.lng + '" target="_blank" rel="noopener" style="display:block;text-align:center;padding:12px;background:#7c8aff;color:#fff;border-radius:10px;text-decoration:none;font-weight:bold;margin-bottom:8px;">🧭 Directions</a>' +
      '<button id="pnShare" style="width:100%;padding:12px;background:#2a2f3e;color:#fff;border:1px solid #444;border-radius:10px;font-size:15px;cursor:pointer;margin-bottom:8px;">📤 Share with someone I trust</button>' +
      '<button id="pnDel" style="width:100%;padding:12px;background:#2a2f3e;color:#ff8a8a;border:1px solid #5a2a2a;border-radius:10px;font-size:15px;cursor:pointer;margin-bottom:8px;">🗑️ Delete pin</button>' +
      '<button id="pnX" style="width:100%;padding:12px;background:transparent;color:#888;border:none;font-size:15px;cursor:pointer;">✕ Close</button>'
    );
    ov.querySelector("#pnX").onclick = closePinOv;
    ov.querySelector("#pnShare").onclick = function () { sharePin(p); };
    ov.querySelector("#pnDel").onclick = function () {
      if (!confirm("Delete this pin?")) return;
      savePins(pins().filter(function (x) { return x.id !== id; }));
      closePinOv(); drawPins(); renderPinsList();
      toast("Pin deleted");
    };
  }

  /* ---------- Saved tab list ---------- */
  function renderPinsList() {
    var el = document.getElementById("pins-list");
    if (!el) return;
    var list = pins();
    el.innerHTML = list.map(function (p) {
      var pt = pinT(p.type);
      return '<div class="card" style="display:flex;gap:10px;align-items:center;">' +
        '<div style="width:38px;height:38px;flex:none;border-radius:50%;background:' + pt[3] + ";border:2px dashed #fff;display:flex;align-items:center;justify-content:center;font-size:18px;\">" + pt[1] + "</div>" +
        '<div style="flex:1;min-width:0;"><div style="color:#fff;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(p.name) + '</div><div style="color:#888;font-size:12px;">' + esc(pt[2]) + (p.note ? " · " + esc(p.note.substring(0, 60)) : "") + "</div></div>" +
        '<a href="https://www.google.com/maps/search/?api=1&query=' + p.lat + "," + p.lng + '" target="_blank" rel="noopener" aria-label="Directions" style="font-size:20px;text-decoration:none;">🧭</a>' +
        "<button onclick=\"window._pinShareById('" + escA(p.id) + '\')" aria-label="Share pin" style="background:none;border:none;font-size:20px;cursor:pointer;">📤</button>' +
        "<button onclick=\"window._pinDelById('" + escA(p.id) + '\')" aria-label="Delete pin" style="background:none;border:none;font-size:18px;cursor:pointer;">🗑️</button></div>';
    }).join("") || '<p style="color:#888">No pins yet — tap 📌 on the map to mark your own spot.</p>';
  }
  window._pinShareById = function (id) { var p = pins().filter(function (x) { return x.id === id; })[0]; if (p) sharePin(p); };
  window._pinDelById = function (id) {
    if (!confirm("Delete this pin?")) return;
    savePins(pins().filter(function (x) { return x.id !== id; }));
    drawPins(); renderPinsList();
    toast("Pin deleted");
  };

  /* ---------- boot: wait for the map, then wire up ---------- */
  function boot() {
    if (typeof L === "undefined" || typeof map === "undefined" || !map) { setTimeout(boot, 400); return; }
    var wrap = document.getElementById("map-wrap");
    if (wrap && !document.getElementById("pinBtn")) {
      var b = document.createElement("button");
      b.id = "pinBtn"; b.className = "pin-fab"; b.setAttribute("aria-label", "Drop a pin at the map center"); b.textContent = "📌";
      b.onclick = function () { pinHere(); };
      wrap.appendChild(b);
    }
    try { map.on("contextmenu", function (e) { addPin(e.latlng.lat, e.latlng.lng); }); } catch (e) {}
    drawPins();
    try {
      if (typeof renderFavs === "function" && !renderFavs._pinsWrapped) {
        var _rf = renderFavs;
        renderFavs = function () { _rf(); renderPinsList(); };
        renderFavs._pinsWrapped = true;
      }
    } catch (e) {}
    renderPinsList();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  /* exposed for tests/debugging */
  window._pinsApi = { KEY: KEY, pins: pins, savePins: savePins, pinT: pinT, drawPins: drawPins, renderPinsList: renderPinsList, addPin: addPin, pinDetail: pinDetail, pinHere: pinHere };
})();
