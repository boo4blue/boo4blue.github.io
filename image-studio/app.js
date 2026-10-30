// Onion Image Studio — page logic.
// Orders leave this static page as a GitHub "create file" link: Blaze taps
// Commit on his own GitHub account, the JSON lands in image-studio/queue/,
// and the studio runner cooks it and commits the picture back here.
const REPO_NEW = "https://github.com/boo4blue/boo4blue.github.io/new/main/image-studio/queue";
const DEFAULT_NEGATIVE = "low quality, worst quality, blurry, deformed, bad anatomy, " +
  "deformed hands, fewer than 5 fingers, less than five fingers, missing fingers, " +
  "extra fingers, fused fingers, merged fingers, mutated hands, malformed limbs, " +
  "extra limbs, watermark, text, signature, jpeg artifacts, out of frame";

const $ = (id) => document.getElementById(id);
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
}
function ago(iso) {
  if (!iso) return "";
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}
async function j(path) {
  try {
    const r = await fetch(path, { cache: "no-store" });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; }
}

// ---- form state ------------------------------------------------------------
let preset = "anime";
$("negative").value = DEFAULT_NEGATIVE;

$("presets").addEventListener("click", (e) => {
  const b = e.target.closest(".chip");
  if (!b) return;
  preset = b.dataset.preset;
  document.querySelectorAll(".chip").forEach(c =>
    c.classList.toggle("on", c === b));
});
document.querySelectorAll('input[name="mode"]').forEach(r =>
  r.addEventListener("change", () => {
    document.querySelectorAll(".mode").forEach(m =>
      m.classList.toggle("on", m.querySelector("input").checked));
  }));

function loadPending() {
  try { return JSON.parse(localStorage.getItem("is_pending") || "[]"); }
  catch (e) { return []; }
}
function savePending(list) {
  try { localStorage.setItem("is_pending", JSON.stringify(list.slice(0, 10))); }
  catch (e) {}
}

$("generate").addEventListener("click", () => {
  const prompt = $("prompt").value.trim();
  if (!prompt) {
    $("prompt").focus();
    $("prompt").placeholder = "Type what you want to see first! 👆";
    return;
  }
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const id = "img-" + Date.now().toString(36) + "-" +
    Math.random().toString(36).slice(2, 6);
  const job = {
    id: id, type: "image-studio",
    prompt: prompt,
    negative: $("negative").value.trim(),
    preset: preset, mode: mode,
    size: $("size").value,
    at: new Date().toISOString()
  };
  const url = REPO_NEW + "?filename=" + encodeURIComponent(id + ".json") +
    "&value=" + encodeURIComponent(JSON.stringify(job, null, 2));
  const link = $("sendlink");
  link.href = url;
  $("sendbox").hidden = false;
  const pend = loadPending();
  pend.unshift({ id: id, prompt: prompt, preset: preset, mode: mode, at: job.at });
  savePending(pend);
  render();
  $("sendbox").scrollIntoView({ behavior: "smooth", block: "center" });
  window.open(url, "_blank", "noopener");
});

// ---- gallery ---------------------------------------------------------------
const STATE_LABEL = {
  sent: "✉️ SENT — WAITING FOR PICKUP", queued: "🕐 QUEUED",
  cooking: "🔥 COOKING", done: "✅ DONE", failed: "✗ FAILED"
};
function card(e) {
  const div = document.createElement("div");
  div.className = "gcard";
  let top;
  if (e.state === "done" && e.image) {
    top = '<img src="' + esc(e.image) + '" loading="lazy" alt="">';
  } else if (e.state === "cooking") {
    top = '<div class="ph">🔥</div>';
  } else if (e.state === "failed") {
    top = '<div class="ph">🚫</div>';
  } else {
    top = '<div class="ph">🎨</div>';
  }
  let html = top + '<div class="gbody"><div class="gprompt">' + esc(e.prompt) +
    '</div><div class="gmeta">' + esc(e.preset || "") + " · " +
    esc(e.mode || "") + " · " + ago(e.at) + "</div>" +
    '<span class="state ' + esc(e.state) + '">' +
    (STATE_LABEL[e.state] || esc(e.state)) + "</span>";
  if (e.state === "failed" && e.error)
    html += '<div class="gerr">' + esc(e.error) + "</div>";
  if (e.state === "done" && e.image)
    html += '<br><a class="dl" href="' + esc(e.image) + '" download>⬇ Download</a>';
  div.innerHTML = html + "</div>";
  return div;
}

async function render() {
  const status = await j("data/status.json");
  const nav = $("nav-status");
  if (status && status.at &&
      (Date.now() - new Date(status.at).getTime()) < 15 * 60 * 1000) {
    nav.innerHTML = '<span class="dot on"></span>studio awake · checked ' + ago(status.at);
  } else {
    nav.innerHTML = '<span class="dot"></span>studio resting — orders still queue up';
  }
  const idx = (await j("gallery/index.json")) || [];
  const seen = new Set(idx.map(e => e.id));
  const mine = loadPending()
    .filter(p => !seen.has(p.id))
    .map(p => ({ ...p, state: "sent" }));
  const all = mine.concat(idx);
  const gal = $("gallery");
  gal.innerHTML = "";
  if (!all.length) {
    $("gal-note").textContent = "No pictures yet — yours will be the first. 🎉";
    return;
  }
  $("gal-note").textContent = all.length + " order" + (all.length > 1 ? "s" : "") +
    " · newest first · this page refreshes itself";
  for (const e of all) gal.appendChild(card(e));
  // drop pendings that have fully landed (done/failed already visible)
  const landed = new Set(idx.filter(e => e.state === "done" || e.state === "failed")
    .map(e => e.id));
  if (landed.size) savePending(loadPending().filter(p => !landed.has(p.id)));
}

render();
setInterval(render, 45000);
