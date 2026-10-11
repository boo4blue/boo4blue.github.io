/* Directions: open Google Maps with the place's name + address so its info card shows (not just a bare pin) */
document.addEventListener("click", function(e){
  const a = e.target.closest && e.target.closest('a[href^="geo:"]'); if(!a) return;
  const h = a.getAttribute("href"), m = h.match(/^geo:([-\d.]+),([-\d.]+)(?:\?q=(.*))?$/); if(!m) return;
  let q = ""; try { q = decodeURIComponent(m[3] || ""); } catch(x) {}
  if (/^[-\d.]+,[-\d.]+/.test(q)) q = "";                       // bare coordinates -> use the lat/lng below
  const dest = encodeURIComponent(q || (m[1] + "," + m[2]));
  a.setAttribute("href", "https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + dest);
  a.setAttribute("target", "_blank");
}, true);
