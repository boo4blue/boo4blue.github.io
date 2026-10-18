/* Haven FW website: "More numbers to call" phone-lines list under the hotlines
   on the Help tab. Ports the app's guide-add.js HAVEN_PHONELINES + the
   guide-add-ui.js phonelines fill(). Fort Wayne-local numbers only, so the
   section is hidden when the Portland area is active (same rule as the app's
   Fort Wayne-only donators button). */
(function () {
  "use strict";

  /* Data verified 2026-10-17 by the app-side pass (guide-add.js):
     Countilink was a defunct 2013 bus service - the card now dials the
     Allen County Council on Aging (senior transportation), which the
     260-424-2010 number actually reaches. */
  window.HAVEN_PHONELINES = [
    { name: "Empower Works", desc: "Employment help — listed in the Rescue Mission guide. Call for details", href: "tel:+12604085210", icon: "💼" },
    { name: "Allen County Council on Aging — Transportation", desc: "Senior transportation in Allen County — call for service area, fares and how to book", href: "tel:+12604242010", icon: "🚐" },
    { name: "Field of Dreams (youth transitional housing)", desc: "Transitional housing for youth — call to ask about openings", href: "tel:+12606002836", icon: "🏠" },
    { name: "YMCA Youth Services Bureau — Safe Place", desc: "Help for homeless youth. Call 260-449-7511, or text SAFE and your location to 44357", href: "tel:+12604497511", icon: "🧑‍🎓" },
    { name: "Women's Care Center hotline (Español/English)", desc: "Pregnancy help hotline in Spanish and English", href: "tel:+15742342341", icon: "🤱" },
    { name: "La Leche League of Indiana", desc: "Breastfeeding support and Fort Wayne groups", href: "tel:+12602556574", icon: "🍼" },
    { name: "Fertility Care Specialist of NE Indiana", desc: "146 N Rufus St, New Haven — call for services and costs", href: "tel:+12604946444", icon: "🩺" },
    { name: "Allen County Healthy Homes Program", desc: "2242 Carroll Rd — home health and safety help. Lead screening: 260-449-7504", href: "tel:+12604497504", icon: "🏡" },
    { name: "Purdue Extension — Allen County", desc: "4001 Crescent Ave — nutrition, gardening and family classes", href: "tel:+12604816826", icon: "🌱" },
    { name: "Multi-County Medical Outreach Clinic", desc: "885 Connexion Way, Columbia City (formerly Wolf Lake Free Health Clinic) — free clinic. Call for hours", href: "tel:+12605641946", icon: "🩺" },
    { name: "Park Center — other sites", desc: "1909 Carew St and 2710 Lake Ave: call 260-373-8000", href: "tel:+12603738000", icon: "🧠" },
    { name: "New Hope Farms", desc: "Food listing at 2715 Brooklyn Ave — no phone given. Tap to open the address in Maps", href: "geo:0,0?q=2715%20Brooklyn%20Ave%2C%20Fort%20Wayne%2C%20IN", icon: "🥕" },
    { name: "Indiana Free Legal Answers", desc: "Ask a volunteer attorney a civil legal question online, free if you qualify (no criminal cases)", href: "https://indiana.freelegalanswers.org/", icon: "⚖️" }
  ];

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* Label for the tap link: phone number for tel:, "Open" for web, "Map" for geo:. */
  function plLabel(href) {
    if (typeof href !== "string") return "Open";
    if (href.indexOf("tel:") === 0) {
      var d = href.slice(4).replace(/^\+1/, "").replace(/[^0-9]/g, "");
      if (d.length === 10) return "📞 " + d.slice(0, 3) + "-" + d.slice(3, 6) + "-" + d.slice(6);
      return "📞 Call";
    }
    if (/^https?:/.test(href)) return "Open ↗";
    if (href.indexOf("geo:") === 0) return "🗺️ Map";
    return "Open";
  }

  function renderPhonelines() {
    var el = document.getElementById("phonelines");
    if (!el) return;
    var fw = typeof getArea === "function" ? getArea() === "fort-wayne" : true;
    if (!fw) { el.innerHTML = ""; return; }
    var list = window.HAVEN_PHONELINES || [];
    if (!list.length) { el.innerHTML = ""; return; }
    var html = '<div class="pl-sec"><h2 style="margin:18px 0 4px;">📞 More numbers to call</h2>' +
      '<p style="color:#888;font-size:14px;margin:0 0 12px;">Direct lines to more help around Fort Wayne.</p></div>';
    html += list.map(function (h) {
      var href = esc(h.href || "#");
      var ext = /^https?:/.test(h.href || "") ? ' target="_blank" rel="noopener"' : "";
      return '<div class="hotline pl-line"><h3>' + esc(h.icon || "📞") + " " + esc(h.name || "") + "</h3>" +
        "<p>" + esc(h.desc || "") + "</p>" +
        '<a href="' + href + '"' + ext + ">" + esc(plLabel(h.href)) + "</a></div>";
    }).join("");
    el.innerHTML = html;
  }
  window.renderPhonelines = renderPhonelines;

  /* App parity: the New Hope Farms row uses a geo: link. Same delegated
     handler as the app's gm-theme.js - rewrites geo: taps into a Google
     Maps directions link so it works in a browser. */
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href^="geo:"]') : null;
    if (!a) return;
    var h = a.getAttribute("href"), m = h.match(/^geo:([-\d.]+),([-\d.]+)(?:\?q=(.*))?$/);
    if (!m) return;
    var q = "";
    try { q = decodeURIComponent(m[3] || ""); } catch (x) {}
    if (/^[-\d.]+,[-\d.]+/.test(q)) q = "";
    var dest = encodeURIComponent(q || (m[1] + "," + m[2]));
    a.setAttribute("href", "https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + dest);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  }, true);

  /* Wrap renderHotlines so the phone-lines follow every hotline render
     (init + area switch), same pattern as the donators/parks wraps. */
  (function wrap() {
    if (typeof window.renderHotlines !== "function") return;
    if (window.renderHotlines.__plWrapped) return;
    var orig = window.renderHotlines;
    window.renderHotlines = function () { var r = orig.apply(this, arguments); try { renderPhonelines(); } catch (e) {} return r; };
    window.renderHotlines.__plWrapped = true;
  })();
  try { renderPhonelines(); } catch (e) {}
})();
