/* Donators: groups that just show up, hand out food/supplies, and leave. Not events.
   Shown behind a Donators button in the Events tab. A map pin is added only when the
   group goes to a place that isn't already pinned. */
(function () {
  var DEALERS = { id: "dealers-to-disciples", name: "Dealers to Disciples", cats: ["meals"],
    addr: "508 E Washington Blvd", zip: "46802", lat: 41.07785, lng: -85.13195,
    desc: "Donators who show up Saturdays around 3pm with free food and water. Next to the gas station near the mission. Times can shift a little.",
    tags: ["donators", "free food", "free water", "Saturday"], hoursText: "Saturdays, around 3pm" };
  if (typeof RESOURCES !== "undefined" && !RESOURCES.some(function (r) { return r.id === DEALERS.id; })) RESOURCES.push(DEALERS);

  function nextKingsman() {
    var anchor = new Date("2026-10-03T12:00:00"), today = new Date(); today.setHours(0, 0, 0, 0);
    var d = new Date(anchor);
    while (d < today) d.setDate(d.getDate() + 14);
    return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  }

  var DONORS = [
    { name: "Feeding the Hungry", gives: "Free lunches and reusable water bottles", when: "Saturdays, around 10-11am (try to be there by 10)", where: "Fort Wayne Rescue Mission (404 E Washington Blvd) and Freimann Square (201 E Main St)", pin: "fwrm", at: ["fwrm", "freimann-square"], why: "" },
    { name: "Kingsman", gives: "Free lunches", when: "Every other Saturday, around 11:30am. Next: " + nextKingsman(), where: "Fort Wayne Rescue Mission, 404 E Washington Blvd", pin: "fwrm", at: ["fwrm"], why: "" },
    { name: "Dealers to Disciples", gives: "Free food and water", when: "Saturdays, around 3pm", where: "508 E Washington Blvd (next to the gas station near the mission)", pin: DEALERS.id, at: [DEALERS.id, "fwrm"], why: "" }
  ];

  window.HAVEN_DONORS = DONORS;

  function esc2(x) { return String(x).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function openPin(id) {
    close();
    if (typeof goTab === "function") goTab("map");
    setTimeout(function () {
      try { var r = byId(id); if (r) { map.setView([r.lat, r.lng], 16, { animate: true }); selectMarker(id); showPeek(r); } } catch (e) {}
    }, 200);
  }

  var panel;
  function close() { if (panel) panel.style.display = "none"; }
  function open() {
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "donatorsPanel";
      panel.style.cssText = "position:fixed;left:0;right:0;top:0;bottom:0;z-index:9000;background:var(--bg);color:var(--txt);overflow-y:auto;padding:16px 16px 90px";
      document.body.appendChild(panel);
    }
    panel.innerHTML = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><h2 style="flex:1;font-size:22px">Donators</h2><button class="qbtn" id="donClose">Close</button></div>' +
      '<p style="color:var(--mut);font-size:14px;margin-bottom:12px">Groups that show up, hand out free food and supplies, and leave. Times can shift, so get there a little early.</p>' +
      DONORS.map(function (d, i) {
        return '<div class="card" style="margin-bottom:10px"><h3>' + esc2(d.name) + '</h3>' +
          '<div class="meta" style="margin-top:6px">Gives: ' + esc2(d.gives) + '</div>' +
          '<div class="meta" style="margin-top:4px">When: ' + esc2(d.when) + '</div>' +
          '<div class="addr" style="margin-top:4px">Where: ' + esc2(d.where) + '</div>' +
          (d.why ? '<div class="meta" style="margin-top:4px">Why they give: ' + esc2(d.why) + '</div>' : '') +
          (d.pin ? '<div class="quick"><button class="qbtn primary" data-don="' + i + '">Show on map</button></div>' : '') + '</div>';
      }).join("");
    panel.style.display = "block"; panel.scrollTop = 0;
    panel.querySelector("#donClose").onclick = close;
    panel.querySelectorAll("[data-don]").forEach(function (b) { b.onclick = function () { openPin(DONORS[+b.dataset.don].pin); }; });
  }

  function addButton() {
    var tab = document.getElementById("tab-events");
    if (!tab || document.getElementById("donatorsBtn")) return;
    var b = document.createElement("button");
    b.id = "donatorsBtn"; b.className = "widebtn"; b.style.margin = "4px 16px 8px";
    b.textContent = "Donators: free food & supplies groups";
    b.onclick = open;
    var head = tab.querySelector(".secHead");
    if (head && head.nextSibling) tab.insertBefore(b, head.nextSibling); else tab.appendChild(b);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addButton); else addButton();
})();
