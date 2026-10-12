/* Haven FW website — Medication reminders (#27).
 * Ported from the app's Settings-tab medication reminders (localStorage 'haven_meds').
 * Loaded after app.js; uses its globals: escapeHtml, miniToast, requestNotifPerm. */
function getMeds() {
  try {
    const m = JSON.parse(localStorage.getItem('haven_meds') || '[]');
    return Array.isArray(m) ? m : [];
  } catch (e) { return []; }
}
function saveMeds(m) {
  try { localStorage.setItem('haven_meds', JSON.stringify(m)); } catch (e) {}
}
function medTodayKey() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function medTimeLabel(t) {
  try {
    const p = String(t).split(':');
    let h = parseInt(p[0], 10);
    if (isNaN(h)) return String(t);
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + String(p[1] || '00').padStart(2, '0') + ' ' + ap;
  } catch (e) { return String(t); }
}
function renderMeds() {
  const box = document.getElementById('med-list');
  if (!box) return;
  const meds = getMeds();
  box.innerHTML = meds.length ? meds.map((m, i) =>
    '<div class="check"><span class="ct" style="text-decoration:none">💊 ' + escapeHtml(m.name || '') +
    '</span><span class="todo-time">⏰ ' + escapeHtml(medTimeLabel(m.time)) +
    '</span><button class="todo-del" onclick="delMed(' + i + ')" aria-label="Delete medication">✕</button></div>'
  ).join('') : '<p style="color:#888">No medications yet — add one below.</p>';
}
function addMed() {
  const nEl = document.getElementById('med-name');
  const tEl = document.getElementById('med-time');
  const name = (nEl.value || '').trim(), time = tEl.value;
  if (!name || !time) { miniToast('Enter a name and time'); return; }
  const meds = getMeds();
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  meds.push({
    id: 'm' + Date.now().toString(36),
    name: name,
    time: time,
    last: time <= hh ? medTodayKey() : null // already past today -> don't fire immediately
  });
  saveMeds(meds);
  nEl.value = '';
  renderMeds();
  if (typeof requestNotifPerm === 'function') requestNotifPerm();
  miniToast('💊 ' + name + ' · ' + medTimeLabel(time));
}
function delMed(i) {
  const meds = getMeds();
  if (!meds[i]) return;
  meds.splice(i, 1);
  saveMeds(meds);
  renderMeds();
}
/* Fires each med's daily reminder once per day (30s poll + startup), same pattern as to-do reminders. */
function checkMeds() {
  try {
    const meds = getMeds();
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const key = medTodayKey();
    let changed = false;
    meds.forEach(m => {
      if (m && m.time && m.time <= hh && m.last !== key) {
        m.last = key;
        changed = true;
        const body = 'Time for your medication: ' + (m.name || '');
        try {
          if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            new Notification('💊 Haven FW', { body: body });
          } else {
            miniToast('💊 ' + body);
          }
        } catch (e) { try { miniToast('💊 ' + body); } catch (e2) {} }
      }
    });
    if (changed) saveMeds(meds);
  } catch (e) {}
}
function medsWire() {
  renderMeds();
  checkMeds();
  const nEl = document.getElementById('med-name');
  if (nEl && !nEl._medWired) {
    nEl._medWired = true;
    nEl.addEventListener('keydown', e => { if (e.key === 'Enter') addMed(); });
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', medsWire);
} else {
  medsWire();
}
setInterval(checkMeds, 30000);
