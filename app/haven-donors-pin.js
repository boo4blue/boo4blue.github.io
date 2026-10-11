/* Donators button on the map pin card: shows which donator groups come to this place,
   what they give, and the days/times. Wraps the pin card so it shows on any pin that has donors. */
(function () {
  var orig = window.showPeek;
  if (typeof orig !== "function") return;
  function esc2(x) { return String(x).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  window.showPeek = function (r) {
    orig.apply(this, arguments);
    try {
      var list = (window.HAVEN_DONORS || []).filter(function (d) { return r && (d.pin === r.id || (d.at || []).indexOf(r.id) >= 0); });
      if (!list.length) return;
      var el = document.getElementById("peek"), row = el && el.querySelector(".gm-a"), body = el && el.querySelector(".gm-body");
      if (!row || !body) return;
      var btn = document.createElement("button");
      btn.id = "gmDonors"; btn.textContent = "Donators (" + list.length + ")";
      row.appendChild(btn);
      var box = document.createElement("div");
      box.style.cssText = "display:none;margin:6px 0 10px";
      box.innerHTML = list.map(function (d) {
        return '<div style="background:var(--card2);border:1px solid var(--line);border-radius:12px;padding:10px 12px;margin-bottom:8px">' +
          '<div style="font-weight:700;font-size:16px">' + esc2(d.name) + '</div>' +
          '<div style="margin-top:4px">Gives: ' + esc2(d.gives) + '</div>' +
          '<div style="margin-top:2px">When: ' + esc2(d.when) + '</div>' +
          '<div style="margin-top:2px">Where: ' + esc2(d.where) + '</div>' +
          (d.why ? '<div style="margin-top:2px">Why they give: ' + esc2(d.why) + '</div>' : '') + '</div>';
      }).join("");
      body.insertBefore(box, body.firstChild);
      btn.onclick = function () {
        var show = box.style.display === "none";
        box.style.display = show ? "block" : "none";
        if (show) { el.classList.add("full"); el.scrollTop = 0; }
      };
    } catch (e) {}
  };
})();
