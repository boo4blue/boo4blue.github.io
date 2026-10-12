/* Haven FW website — Real Jobs tab (feature #29).
 * Ported from the app's JOBS database (tab-data.js). Type chips + search +
 * area filtering + open-now-first sort + Call/Apply/Directions/Map buttons.
 * Loaded after app.js; renderJobs() in app.js delegates to renderJobsReal().
 * Uses app.js globals: getArea, isOpenNow, escapeHtml, escapeAttr, miniToast, goTab. */
var jobTypeFilter = 'all', jobQuery = '';
function jobsInArea() {
  var all = (typeof JOBS !== 'undefined' ? JOBS : []);
  var a = (typeof getArea === 'function' ? getArea() : 'fort-wayne');
  return all.filter(function (j) { return (j.area || 'fort-wayne') === a; });
}
function jobOpenBadge(j) {
  if (typeof isOpenNow !== 'function') return '';
  var st = null;
  try { st = isOpenNow(j); } catch (e) { return ''; }
  if (st === true) return ' <span style="background:#14532d;color:#4ade80;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700;">🟢 Open now</span>';
  if (st === false) return ' <span style="background:#3f1d1d;color:#f87171;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700;">🔴 Closed</span>';
  return '';
}
function jobCardHtml(j) {
  var ty = (typeof JOB_TYPES !== 'undefined' && JOB_TYPES[j.type]) || { label: j.type || 'Job', icon: '💼', color: '#5cc8ff' };
  var E = (typeof escapeHtml === 'function') ? escapeHtml : function (s) { return String(s); };
  var EA = (typeof escapeAttr === 'function') ? escapeAttr : function (s) { return String(s); };
  var color = EA(ty.color || '#5cc8ff');
  var h = '<div style="background:#1a1f2e;border:1px solid #2a2f3e;border-radius:12px;padding:12px;margin-bottom:8px;border-left:4px solid ' + color + ';">';
  h += '<div style="display:flex;gap:10px;align-items:flex-start;"><div style="font-size:24px;flex:none;">' + E(ty.icon || '💼') + '</div><div style="flex:1;min-width:0;">';
  h += '<div style="font-weight:700;color:#fff;font-size:15px;">' + E(j.name || 'Job') + '</div>';
  h += '<div style="margin:4px 0;display:flex;gap:6px;flex-wrap:wrap;align-items:center;">';
  h += '<span style="background:' + color + '22;color:' + color + ';padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700;">' + E(ty.icon || '') + ' ' + E(ty.label || '') + '</span>' + jobOpenBadge(j) + '</div>';
  if (j.addr) h += '<div style="font-size:13px;color:#888;">📌 ' + E(j.addr) + '</div>';
  if (j.phone) h += '<div style="font-size:13px;color:#888;">📞 ' + E(j.phone) + '</div>';
  if (j.hoursText) h += '<div style="font-size:12px;color:#888;margin-top:2px;">🕐 ' + E(j.hoursText) + '</div>';
  if (j.desc) h += '<div style="font-size:13px;color:#ccc;margin-top:6px;">' + E(j.desc) + '</div>';
  if (j.tags && j.tags.length) h += '<div style="margin-top:6px;">' + j.tags.map(function (t) { return '<span style="background:#2a2f3e;padding:2px 8px;border-radius:10px;font-size:11px;color:#aaa;margin:2px;display:inline-block;">✓ ' + E(t) + '</span>'; }).join('') + '</div>';
  h += '<div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;">';
  if (j.phoneHref || j.phone) h += '<a class="sheet-btn" href="tel:' + EA(j.phoneHref || j.phone) + '">📞 Call</a>';
  if (j.web) h += '<a class="sheet-btn" href="' + EA(j.web) + '" target="_blank" rel="noopener">🌐 Apply</a>';
  if (j.lat && j.lng) {
    h += '<a class="sheet-btn" href="https://www.google.com/maps/dir/?api=1&destination=' + j.lat + ',' + j.lng + '" target="_blank" rel="noopener">🗺️ Directions</a>';
    h += '<button class="sheet-btn" onclick="jobShowOnMap(\'' + EA(j.id || '') + '\')">📍 Map</button>';
  }
  h += '</div></div></div></div>';
  return h;
}
function renderJobsReal() {
  var listEl = document.getElementById('jobs-list');
  if (!listEl) return;
  var chipsEl = document.getElementById('job-chips');
  var jobs = jobsInArea();
  var types = [];
  jobs.forEach(function (j) { if (j.type && types.indexOf(j.type) < 0) types.push(j.type); });
  if (chipsEl) {
    var ch = '<button class="filter-btn' + (jobTypeFilter === 'all' ? ' active' : '') + '" data-jt="all">All</button>';
    types.forEach(function (t) {
      var ty = (typeof JOB_TYPES !== 'undefined' && JOB_TYPES[t]) || { label: t, icon: '💼' };
      ch += '<button class="filter-btn' + (jobTypeFilter === t ? ' active' : '') + '" data-jt="' + t + '">' + ty.icon + ' ' + ty.label + '</button>';
    });
    chipsEl.innerHTML = ch;
  }
  var q = (jobQuery || '').toLowerCase();
  var list = jobs.filter(function (j) {
    if (jobTypeFilter !== 'all' && j.type !== jobTypeFilter) return false;
    if (q) {
      var hay = ((j.name || '') + ' ' + (j.addr || '') + ' ' + (j.desc || '') + ' ' + ((j.tags || []).join(' '))).toLowerCase();
      if (hay.indexOf(q) < 0) return false;
    }
    return true;
  });
  if (typeof isOpenNow === 'function') {
    list = list.slice().sort(function (a, b) {
      var oa = false, ob = false;
      try { oa = isOpenNow(a) === true; } catch (e) {}
      try { ob = isOpenNow(b) === true; } catch (e) {}
      return (oa ? 0 : 1) - (ob ? 0 : 1);
    });
  }
  if (!list.length) {
    listEl.innerHTML = '<div style="text-align:center;color:#888;padding:20px;">' + (jobs.length ? 'No jobs match your search.' : 'No job listings in this area yet.') + '</div>';
    return;
  }
  listEl.innerHTML = list.map(jobCardHtml).join('');
}
function jobShowOnMap(id) {
  var jobs = (typeof JOBS !== 'undefined' ? JOBS : []);
  var j = null;
  for (var i = 0; i < jobs.length; i++) if (jobs[i].id === id) { j = jobs[i]; break; }
  if (!j || !j.lat || !j.lng) { if (typeof miniToast === 'function') miniToast("That job isn't on the map."); return; }
  try { if (typeof goTab === 'function') goTab('map'); } catch (e) {}
  setTimeout(function () {
    try {
      if (typeof map !== 'undefined' && map && typeof map.setView === 'function') map.setView([j.lat, j.lng], 16);
      if (typeof L !== 'undefined') {
        var E = (typeof escapeHtml === 'function') ? escapeHtml : function (s) { return String(s); };
        var m = L.marker([j.lat, j.lng]).addTo(map);
        m.bindPopup('<b>' + E(j.name || 'Job') + '</b><br>' + E(j.addr || '')).openPopup();
        setTimeout(function () { try { map.removeLayer(m); } catch (e) {} }, 30000);
      }
    } catch (e) {}
  }, 250);
}
(function bindJobsUi() {
  function bind() {
    var jc = document.getElementById('job-chips');
    if (jc) jc.addEventListener('click', function (e) {
      var c = e.target.closest ? e.target.closest('[data-jt]') : null;
      if (c) { jobTypeFilter = c.getAttribute('data-jt'); renderJobs(); }
    });
    var js = document.getElementById('jobs-search');
    if (js) js.addEventListener('input', function (e) { jobQuery = e.target.value; renderJobs(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
