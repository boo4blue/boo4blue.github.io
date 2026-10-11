/* Haven FW: "More numbers to call" list under the hotlines on the Info tab. */
"use strict";
(function () {
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fill() {
    var el = document.getElementById("phonelines");
    var list = window.HAVEN_PHONELINES;
    if (!el || !list || !list.length) return;
    el.innerHTML = '<div class="secHead" style="padding:14px 2px 8px"><h2 style="font-size:calc(18px*var(--ts,1))">More numbers to call</h2>' +
      '<p>From the Rescue Mission resource guide. Hours and eligibility change, so call first.</p></div>' +
      list.map(function (h) {
        var ext = /^https?:/.test(h.href) ? ' target="_blank" rel="noopener"' : "";
        return '<a class="hcard" href="' + esc(h.href) + '"' + ext + '><div class="ic">' + h.icon + '</div>' +
          '<div><h3>' + esc(h.name) + '</h3><p>' + esc(h.desc) + '</p></div><div class="go">›</div></a>';
      }).join("");
  }
  if (typeof renderInfo === "function") {
    var orig = renderInfo;
    renderInfo = function () { var r = orig.apply(this, arguments); fill(); return r; };
  }
  fill();
})();
