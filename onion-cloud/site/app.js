async function j(path) {
  try {
    const r = await fetch(path, { cache: "no-store" });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; }
}
function ago(iso) {
  if (!iso) return "—";
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return s + "s ago";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
}

(async function () {
  const status = await j("data/status.json");
  const nav = document.getElementById("nav-status");
  const dot = nav.querySelector(".dot");
  if (status && status.alive) {
    dot.classList.add("on");
    nav.innerHTML = '<span class="dot on"></span>online';
    document.getElementById("st-alive").textContent = "online";
    document.getElementById("st-alive").style.color = "var(--green)";
    document.getElementById("st-beat").textContent = ago(status.at);
  } else {
    document.getElementById("st-alive").textContent = "waking…";
    document.getElementById("st-beat").textContent = "—";
  }

  const idx = await j("data/index.json");
  const tasksEl = document.getElementById("tasks");
  if (idx && idx.length) {
    document.getElementById("st-tasks").textContent = idx.length;
    tasksEl.innerHTML = "";
    for (const t of idx.slice(0, 20)) {
      const div = document.createElement("div");
      div.className = "task";
      div.innerHTML =
        '<div class="t-head"><span class="t-type">' + esc(t.type) + '</span>' +
        '<span class="' + (t.ok ? "badge-ok" : "badge-err") + '">' + (t.ok ? "✓ done" : "✗ failed") + '</span></div>' +
        '<div class="t-prompt">' + esc(t.id) + ' · ' + ago(t.at) + '</div>' +
        '<div class="t-body">loading…</div>';
      div.onclick = async () => {
        div.classList.toggle("open");
        const body = div.querySelector(".t-body");
        if (body.dataset.loaded) return;
        body.dataset.loaded = "1";
        const full = await j("data/tasks/" + t.id + ".json");
        if (!full) { body.textContent = "could not load result"; return; }
        let html = "<b>prompt:</b> " + esc(full.prompt || "(none)");
        if (full.ok && full.result) {
          if (full.result.text) html += "<br><br>" + esc(full.result.text).slice(0, 2000);
          if (full.result.image_url) html += '<br><img src="' + esc(full.result.image_url) + '" loading="lazy">';
          if (full.result.fahrenheit != null)
            html += "<br><br>🌡 " + esc(full.result.fahrenheit) + "°F in " + esc(full.result.place);
        } else if (full.error) {
          html += "<br><br>error: " + esc(full.error);
        }
        body.innerHTML = html;
      };
      tasksEl.appendChild(div);
    }
  } else {
    document.getElementById("st-tasks").textContent = "0";
    tasksEl.innerHTML = '<p class="muted">No tasks yet — run one above.</p>';
  }

  const dg = await j("data/digest.json");
  const dgEl = document.getElementById("digest");
  if (dg && dg.weather && dg.weather.time) {
    const w = dg.weather;
    let rows = "";
    for (let i = 0; i < Math.min(3, w.time.length); i++) {
      rows += "<p>📅 " + esc(w.time[i]) + ": " + esc(w.temperature_2m_min[i]) + "–" +
              esc(w.temperature_2m_max[i]) + "°F</p>";
    }
    dgEl.innerHTML = "<h3>Digest for " + esc(dg.date) + "</h3>" + rows +
      '<p class="muted">tasks completed all-time: ' + (dg.tasks_completed || 0) + "</p>";
  } else {
    dgEl.innerHTML = '<p class="muted">First digest lands tomorrow at 7am ET.</p>';
  }
})();
