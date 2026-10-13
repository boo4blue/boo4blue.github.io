/* Haven FW website — 📅 Food by day (feature #35).
 * Ported from the app's openFoodByDay (app.js extras section).
 * Day-picker overlay: food/meals places open on a chosen day, sorted by
 * opening time. Area-aware (uses placesInArea). Tap a row to open the
 * place's detail sheet.
 * Loaded after app.js; uses its globals: placesInArea, escapeHtml,
 * goTab, showSheet, openBadge, PIN_EMOJI. */
var FOODDAY_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function fdToMin(x) {
  x = +x;
  if (!(x >= 0)) return null;
  if (x > 1440) x = Math.floor(x / 100) * 60 + (x % 100); // HHMM -> minutes
  return (x >= 0 && x <= 1440) ? x : null;
}
function fdDayHours(r, day) {
  const h = r && r.hours;
  if (!h || typeof h !== 'object') return null;
  let v = h[day];
  if (v === undefined && day === 0) v = h[7]; // Sunday fallback, like isOpenNow
  if (!Array.isArray(v) || v.length !== 2) return null;
  const o = fdToMin(v[0]), c = fdToMin(v[1]);
  if (o === null || c === null || c <= o) return null;
  return [o, c];
}
function fdFmtT(m) {
  let h = Math.floor(m / 60), mm = m % 60;
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12; if (h === 0) h = 12;
  return h + ':' + String(mm).padStart(2, '0') + ' ' + ap;
}
function fdEmoji(r) {
  try {
    const c = (r.cats || [])[0];
    if (typeof PIN_EMOJI !== 'undefined' && PIN_EMOJI && PIN_EMOJI[c]) return PIN_EMOJI[c];
  } catch (e) {}
  return '🍽️';
}
function closeFoodDay() {
  const o = document.getElementById('foodday-ov');
  if (o) o.remove();
}
function openFoodDay() {
  closeFoodDay();
  let sel = new Date().getDay();
  const ov = document.createElement('div');
  ov.id = 'foodday-ov';
  ov.innerHTML = '<div id="foodday-in"><h2>📅 Food by day</h2>' +
    '<p class="finder-sub">Meal times for each day, earliest first. <b>Call first to confirm.</b></p>' +
    '<div class="finder-chips" id="fd-days"></div>' +
    '<div class="finder-sub" id="fd-count"></div><div id="fd-res"></div>' +
    '<button class="sheet-btn" id="fd-x" style="margin-top:12px;width:100%;">✕ Close</button></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click', function (e) { if (e.target === ov) closeFoodDay(); });
  ov.querySelector('#fd-x').addEventListener('click', closeFoodDay);
  const esc = (typeof escapeHtml === 'function') ? escapeHtml : function (s) { return String(s); };
  const draw = function () {
    ov.querySelector('#fd-days').innerHTML = FOODDAY_DAYS.map(function (d, i) {
      return '<button class="filter-btn' + (i === sel ? ' active' : '') + '" data-d="' + i + '">' + d + '</button>';
    }).join('');
    const list = placesInArea().map(function (r) { return { r: r, hh: fdDayHours(r, sel) }; })
      .filter(function (x) {
        return x.hh && ((x.r.cats || []).includes('food') || (x.r.cats || []).includes('meals'));
      })
      .sort(function (a, b) { return a.hh[0] - b.hh[0]; });
    const today = sel === new Date().getDay();
    ov.querySelector('#fd-count').textContent = list.length + ' places serving ' + FOODDAY_DAYS[sel] + (today ? ' (today)' : '');
    const box = ov.querySelector('#fd-res');
    box.innerHTML = list.map(function (x, i) {
      return '<button class="finder-row" data-i="' + i + '"><span class="fi">' + fdEmoji(x.r) + '</span>' +
        '<span class="fb"><b>' + esc(x.r.name) + '</b><small>🕒 ' + fdFmtT(x.hh[0]) + ' – ' + fdFmtT(x.hh[1]) +
        (x.r.addr ? ' · ' + esc(x.r.addr) : '') + '</small></span>' +
        (today && typeof openBadge === 'function' ? openBadge(x.r) : '') + '</button>';
    }).join('') || '<p class="finder-sub">Nothing listed for this day.</p>';
    ov.querySelectorAll('[data-d]').forEach(function (b) {
      b.addEventListener('click', function () { sel = +b.getAttribute('data-d'); draw(); });
    });
    box.querySelectorAll('[data-i]').forEach(function (b) {
      b.addEventListener('click', function () {
        const r = list[+b.getAttribute('data-i')].r;
        closeFoodDay();
        if (typeof goTab === 'function') goTab('map');
        if (typeof showSheet === 'function') showSheet(r);
      });
    });
  };
  draw();
}
window._fooddayApi = {
  FOODDAY_DAYS: FOODDAY_DAYS, fdToMin: fdToMin, fdDayHours: fdDayHours,
  fdFmtT: fdFmtT, fdEmoji: fdEmoji, openFoodDay: openFoodDay, closeFoodDay: closeFoodDay
};
