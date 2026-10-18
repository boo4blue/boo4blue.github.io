/* Haven FW alerts.js — meal + daily alerts (web-Notification port of the app's
   more-features.js section 7 alerts).
   Feature #42. Loaded after app.js; uses its globals: favIds, miniToast,
   requestNotifPerm, allPlaces/RESOURCES. No IIFE (site module convention).
   Same localStorage key 'haven_plus' as the app; merge-read/write so the
   display-mode keys (icon/hc, owned by modes.js) are never clobbered.
   The app used the Android native bridge (HavenBridge.scheduleReminder) to
   schedule these; on the web they fire from the 30s poll (same pattern as
   meds.js checkMeds): once per day per place/hour. */
var ALERT_TIPS = [
  "Charge your phone whenever you can. Libraries, missions and many stores have outlets.",
  "Take a photo of your ID and important papers and keep it safe.",
  "Call before you go. Hours change, and a short call saves a trip.",
  "Drink water, even in winter. It helps you think and stay well.",
  "Ask for help early. Staff at missions and day centers want to help.",
  "One small step a day adds up. Pick one thing in My Plan today.",
  "Keep a list of phone numbers on paper in case your phone dies.",
  "Sleep and a hot meal make everything easier. Don't skip them.",
  "Wear layers in cold weather. Dry socks matter more than a heavy coat.",
  "Bring a pen. You'll fill out forms almost everywhere.",
  "Save your bus pass or fare in a safe pocket, not your bag.",
  "If you're asked for an address, ask the mission whether you can use theirs for mail.",
  "Be kind to yourself. Hard days don't erase your progress.",
  "Ask about free dental, vision and clothing. Many places don't advertise it."
];
var AL_LEADS = [30, 45, 60];
var AL_HOURS = [8, 9, 12, 18];
function alDayKey(d) {
  d = d || new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
/* Merge-read: app defaults, unknown keys (incl. icon/hc) preserved via alSave. */
function alPlus() {
  var p = {};
  try { p = JSON.parse(localStorage.getItem('haven_plus') || '{}') || {}; } catch (e) { p = {}; }
  return {
    meal: !!p.meal,
    lead: AL_LEADS.indexOf(p.lead) >= 0 ? p.lead : 45,
    daily: !!p.daily,
    hour: AL_HOURS.indexOf(p.hour) >= 0 ? p.hour : 9,
    fired: (p.fired && typeof p.fired === 'object') ? p.fired : {}
  };
}
function alSave(p) {
  var cur = {};
  try { cur = JSON.parse(localStorage.getItem('haven_plus') || '{}') || {}; } catch (e) { cur = {}; }
  cur.meal = !!p.meal; cur.lead = p.lead; cur.daily = !!p.daily; cur.hour = p.hour; cur.fired = p.fired || {};
  try { localStorage.setItem('haven_plus', JSON.stringify(cur)); } catch (e) {}
}
function alFmt(m) {
  var hh = Math.floor(m / 60), mm = m % 60, ap = hh >= 12 ? 'PM' : 'AM', h12 = hh % 12 || 12;
  return h12 + ':' + String(mm).padStart(2, '0') + ' ' + ap;
}
/* Today's [openMin, closeMin] from the structured hours dict — same parsing
   and normalization as app.js isOpenNow (Sunday key-7 fallback, HHMM>1440). */
function alHoursToday(r) {
  var h = r && r.hours;
  if (!h || typeof h !== 'object') return null;
  var day = new Date().getDay(), v = h[day];
  if (v === undefined && day === 0) v = h[7];
  if (!Array.isArray(v) || v.length !== 2 || typeof v[0] !== 'number' || typeof v[1] !== 'number') return null;
  var o = v[0], c = v[1];
  if (o > 1440 || c > 1440) { var conv = function (x) { return Math.floor(x / 100) * 60 + (x % 100); }; o = conv(o); c = conv(c); }
  if (!(o >= 0 && c > o && c <= 1440)) return null;
  return [o, c];
}
function alNotify(title, body) {
  try {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(title, { body: body });
    } else if (typeof miniToast === 'function') {
      miniToast(title + ' — ' + body);
    }
  } catch (e) { try { if (typeof miniToast === 'function') miniToast(title + ' — ' + body); } catch (e2) {} }
}
function alPlaceByKey(fk) {
  var list = (typeof allPlaces !== 'undefined' && allPlaces && allPlaces.length) ? allPlaces :
    ((typeof RESOURCES !== 'undefined' && RESOURCES) ? RESOURCES : []);
  for (var i = 0; i < list.length; i++) {
    var r = list[i];
    if ((r.id || r.name) === fk) return r;
  }
  return null;
}
/* Meal alerts: for each saved place with structured hours, fire once per day
   when we are inside [open-lead, open). (App: native reminder at open-lead.) */
function checkMealAlerts() {
  var p = alPlus();
  if (!p.meal) return;
  var now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes(), dk = alDayKey(now), changed = false;
  var favs = (typeof favIds === 'function') ? favIds() : [];
  for (var i = 0; i < favs.length; i++) {
    var r = alPlaceByKey(favs[i]);
    if (!r) continue;
    var hc = alHoursToday(r);
    if (!hc) continue;
    var o = hc[0];
    if (nowMin >= o - p.lead && nowMin < o) {
      var key = 'meal_' + favs[i] + '_' + dk;
      if (!p.fired[key]) {
        p.fired[key] = 1; changed = true;
        alNotify('🍽️ ' + (r.name || 'Saved place') + ' opens at ' + alFmt(o), 'Haven FW');
      }
    }
  }
  if (changed) alSave(p);
}
/* Daily encouragement: one tip per day at/after the chosen hour.
   Tip rotation matches the app: TIPS[floor(day/86400000) % TIPS.length]. */
function checkDailyAlert(nowDate) {
  var p = alPlus();
  if (!p.daily) return;
  var now = nowDate || new Date(), dk = alDayKey(now), key = 'daily_' + dk;
  if (p.fired[key]) return;
  if (now.getHours() * 60 + now.getMinutes() < p.hour * 60) return;
  p.fired[key] = 1; alSave(p);
  var tip = ALERT_TIPS[Math.floor(now.getTime() / 86400000) % ALERT_TIPS.length];
  alNotify("🌱 Haven: today's encouragement", tip);
}
function checkAlerts() {
  try { checkMealAlerts(); } catch (e) {}
  try { checkDailyAlert(); } catch (e) {}
}
function toggleAlertMeal() {
  var p = alPlus(); p.meal = !p.meal; alSave(p);
  if (p.meal && typeof requestNotifPerm === 'function') requestNotifPerm();
  alRenderCard();
}
function setAlertLead(m) {
  if (AL_LEADS.indexOf(m) < 0) return;
  var p = alPlus(); p.lead = m; alSave(p); alRenderCard();
}
function toggleAlertDaily() {
  var p = alPlus(); p.daily = !p.daily; alSave(p);
  if (p.daily && typeof requestNotifPerm === 'function') requestNotifPerm();
  alRenderCard();
}
function setAlertHour(h) {
  if (AL_HOURS.indexOf(h) < 0) return;
  var p = alPlus(); p.hour = h; alSave(p); alRenderCard();
}
/* Sync the Settings card: toggle labels + selected lead/hour chips. Null-DOM safe. */
function alRenderCard() {
  try {
    var p = alPlus();
    var mb = (typeof document !== 'undefined') ? document.getElementById('alert-meal-btn') : null;
    if (mb) mb.textContent = '🍽️ Opening alerts: ' + (p.meal ? 'On' : 'Off');
    var db = (typeof document !== 'undefined') ? document.getElementById('alert-daily-btn') : null;
    if (db) db.textContent = '🌱 Daily encouragement: ' + (p.daily ? 'On' : 'Off');
    if (typeof document === 'undefined' || !document.querySelectorAll) return;
    document.querySelectorAll('.al-chip[data-lead]').forEach(function (el) {
      el.classList.toggle('on', +el.getAttribute('data-lead') === p.lead);
    });
    document.querySelectorAll('.al-chip[data-hour]').forEach(function (el) {
      el.classList.toggle('on', +el.getAttribute('data-hour') === p.hour);
    });
  } catch (e) {}
}
function alertsWire() {
  alRenderCard();
  checkAlerts();
}
if (typeof document !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', alertsWire);
} else if (typeof document !== 'undefined') {
  alertsWire();
}
try { setInterval(checkAlerts, 30000); } catch (e) {}
/* Test hook (vm). */
try { window._alertsApi = { alPlus: alPlus, alSave: alSave, alFmt: alFmt, alHoursToday: alHoursToday, checkMealAlerts: checkMealAlerts, checkDailyAlert: checkDailyAlert, toggleAlertMeal: toggleAlertMeal, setAlertLead: setAlertLead, toggleAlertDaily: toggleAlertDaily, setAlertHour: setAlertHour, alRenderCard: alRenderCard, ALERT_TIPS: ALERT_TIPS }; } catch (e) {}
