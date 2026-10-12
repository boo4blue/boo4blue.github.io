/* Haven FW web — Program tools (ported from the app's hidden ptools tab).
   Per-program "bring" checklist + personal notes, saved on this device.
   Loaded after app.js; uses its globals (PROGRAMS, escapeHtml, escapeAttr, goTab, toggleSidebar). */
let progToolsId = null;
function progToolsState() {
  try { return JSON.parse(localStorage.getItem('haven_ptools') || '{}'); }
  catch (e) { return {}; }
}
function saveProgToolsState(s) {
  try { localStorage.setItem('haven_ptools', JSON.stringify(s)); } catch (e) {}
}
function openProgTools(id) {
  progToolsId = id;
  document.querySelectorAll('nav button').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  document.getElementById('tab-ptools').classList.add('active');
  renderPTools();
  if (typeof toggleSidebar === 'function') toggleSidebar();
  window.scrollTo(0, 0);
}
function renderPTools() {
  const list = (typeof PROGRAMS !== 'undefined' ? PROGRAMS : []);
  const p = list.find(x => x.id === progToolsId) || list[0];
  const el = document.getElementById('ptools-body');
  if (!el) return;
  if (!p) { el.innerHTML = '<p class="gdim">No programs available.</p>'; return; }
  const st = progToolsState()[p.id] || { bring: {}, notes: '' };
  const bring = (p.bring || []).map((b, i) =>
    `<label class="bringrow"><input type="checkbox" data-bring="${i}"${st.bring[i] ? ' checked' : ''}><span>${escapeHtml(b)}</span></label>`).join('');
  const nogo = (p.noGo || []).map(x => `<li>${escapeHtml(x)}</li>`).join('');
  const sched = (p.dayPlan || []).map(s =>
    `<li><b>${escapeHtml(s.t)}</b> — ${escapeHtml(s.what)}</li>`).join('');
  el.innerHTML =
    `<button class="sheet-btn" onclick="goTab('programs')">‹ Programs</button>` +
    `<div class="card" style="margin-top:10px"><h3>🏕️ ${escapeHtml(p.name)}</h3>` +
    `<div class="meta"><span class="badge">${escapeHtml(p.type)}</span>` +
    `<span class="badge">Ages ${escapeHtml(p.ages)}</span><span class="badge">Free</span>` +
    `<span class="badge">📍 ${escapeHtml(p.city)}</span></div>` +
    `<p class="gdim">Check off what you already have and jot down your own notes — saved on this device.</p></div>` +
    (bring ? `<div class="gsec">✅ My bring-checklist</div><div>${bring}</div>` : '') +
    (nogo ? `<div class="gsec">🚫 Not allowed</div><ul class="gsteps">${nogo}</ul>` : '') +
    (sched ? `<div class="gsec">⏱️ Daily schedule</div><ul class="gsteps">${sched}</ul>` : '') +
    `<div class="gsec">📝 My notes</div>` +
    `<textarea id="ptoolsNotes" class="txtin" rows="4" placeholder="Questions to ask, things to remember…">${escapeHtml(st.notes || '')}</textarea>` +
    `<p class="learn-note">Notes save automatically on this device.</p>` +
    `<div class="meta" style="margin-top:10px">` +
    (p.phoneHref ? `<a class="sheet-btn" href="tel:${escapeAttr(p.phoneHref)}">📞 ${escapeAttr(p.phone)}</a>` : '') +
    (p.web ? `<a class="sheet-btn" href="${escapeAttr(p.web)}" target="_blank" rel="noopener">🌐 Website</a>` : '') +
    (typeof p.lat === 'number' ? `<a class="sheet-btn" href="https://maps.google.com/?q=${p.lat},${p.lng}" target="_blank">🗺️ Directions</a>` : '') +
    (typeof p.lat === 'number' ? `<a class="sheet-btn" href="https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}&travelmode=transit" target="_blank">🚌 Transit</a>` : '') +
    `</div>`;
  el.querySelectorAll('[data-bring]').forEach(cb => cb.addEventListener('change', () => {
    const all = progToolsState();
    const cur = all[p.id] || { bring: {}, notes: '' };
    cur.bring[cb.dataset.bring] = cb.checked;
    all[p.id] = cur;
    saveProgToolsState(all);
  }));
  const ta = el.querySelector('#ptoolsNotes');
  if (ta) ta.addEventListener('input', () => {
    const all = progToolsState();
    const cur = all[p.id] || { bring: {}, notes: '' };
    cur.notes = ta.value;
    all[p.id] = cur;
    saveProgToolsState(all);
  });
}
