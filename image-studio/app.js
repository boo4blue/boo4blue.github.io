// Onion Image Studio v2 — page logic.
// Orders leave this static page as a GitHub "create file" link: Blaze taps
// Commit on his own GitHub account, the JSON lands in image-studio/queue/,
// and the studio runner cooks it and commits the picture back here.
const REPO_NEW = "https://github.com/boo4blue/boo4blue.github.io/new/main/image-studio/queue";
const REFS_PREFIX = "image-studio/queue/refs/";
const DEFAULT_NEGATIVE = "low quality, worst quality, blurry, deformed, bad anatomy, " +
  "deformed hands, fewer than 5 fingers, less than five fingers, missing fingers, " +
  "extra fingers, fused fingers, merged fingers, mutated hands, malformed limbs, " +
  "extra limbs, watermark, text, signature, jpeg artifacts, out of frame";
const DEFAULT_POSITIVE = "masterpiece, best quality, very aesthetic, absurdres, " +
  "clean lineart, cel shading, sharp focus, high detail";

// Same wording the runner uses when IT does the polishing (llm_chat route).
const IMPROVE_INSTRUCTIONS = {
  prompt: "Rewrite the following image-generation prompt into a richer, more detailed version. Keep the exact same subject and meaning; add concrete visual details, materials, lighting and composition. Reply with ONLY the rewritten prompt as one comma-separated line — no quotes, no explanation.\n\n",
  negative: "Expand the following negative prompt for an image generator into a thorough comma-separated block list of everything that should NOT appear: quality flaws, anatomy errors, artifacts, unwanted objects and styles. Reply with ONLY the comma-separated list.\n\n",
  positive: "Expand the following quality/style tags for an image generator into a richer comma-separated list of positive quality boosters. Reply with ONLY the comma-separated list.\n\n",
  edit: "Rewrite the following image-edit instruction into a clearer, more concrete edit prompt for an image editor: say exactly what changes and what stays the same. Reply with ONLY the rewritten instruction, one line, no quotes.\n\n"
};
const FIELD_INPUT = { prompt: "prompt", negative: "negative",
                      positive: "positive", edit: "edit-prompt" };

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
function snap(v) {
  v = parseInt(v, 10);
  if (isNaN(v)) return null;
  v = Math.max(512, Math.min(1536, v));
  return Math.round(v / 64) * 64;
}
function newId() {
  return "img-" + Date.now().toString(36) + "-" +
    Math.random().toString(36).slice(2, 6);
}

// ---- pending (orders sent from THIS phone, not yet in the gallery index) --
function loadPending() {
  try { return JSON.parse(localStorage.getItem("is_pending") || "[]"); }
  catch (e) { return []; }
}
function savePending(list) {
  try { localStorage.setItem("is_pending", JSON.stringify(list.slice(0, 12))); }
  catch (e) {}
}

// ---- shared send flow -------------------------------------------------------
function sendOrder(job, pendingInfo, boxId, linkId) {
  const url = REPO_NEW + "?filename=" + encodeURIComponent(job.id + ".json") +
    "&value=" + encodeURIComponent(JSON.stringify(job, null, 2));
  $(linkId).href = url;
  $(boxId).hidden = false;
  const pend = loadPending();
  pend.unshift(pendingInfo);
  savePending(pend);
  render();
  $(boxId).scrollIntoView({ behavior: "smooth", block: "center" });
  window.open(url, "_blank", "noopener");
}

// ---- AI improve -------------------------------------------------------------
// Try an instant in-page rewrite via the keyless text route. If that route
// fails, flag the field instead: the order then carries improve: [...] and
// the studio runner rewrites the field itself before cooking.
const improveFlags = { new: new Set(), edit: new Set() };

async function improveField(field, scope) {
  const input = $(FIELD_INPUT[field]);
  const note = $("note-" + field);
  const text = input.value.trim();
  if (!text) { note.textContent = "type something first 👆"; return; }
  note.textContent = "✨ polishing…";
  let rewritten = null;
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 25000);
    const r = await fetch("https://text.pollinations.ai/" +
      encodeURIComponent(IMPROVE_INSTRUCTIONS[field] + text),
      { signal: ctl.signal });
    clearTimeout(t);
    if (r.ok) {
      const out = (await r.text()).trim().replace(/^"|"$/g, "");
      if (out.length >= 8 && out.length <= 3000 &&
          !/^error/i.test(out)) rewritten = out;
    }
  } catch (e) { /* route unavailable — fall through to the runner flag */ }
  if (rewritten) {
    input.value = rewritten;
    improveFlags[scope].delete(field);
    input.classList.remove("willpolish");
    note.textContent = "✨ polished!";
  } else {
    improveFlags[scope].add(field);
    input.classList.add("willpolish");
    note.textContent = "couldn't polish instantly — the studio will polish it while cooking ✨";
  }
}
document.querySelectorAll("[data-improve]").forEach(btn =>
  btn.addEventListener("click", () => {
    const field = btn.dataset.improve;
    improveField(field, field === "edit" ? "edit" : "new");
  }));

// ---- new-picture form state ---------------------------------------------------
let preset = "anime";
let count = 1;
$("negative").value = DEFAULT_NEGATIVE;
$("positive").value = DEFAULT_POSITIVE;

$("presets").addEventListener("click", (e) => {
  const b = e.target.closest(".chip");
  if (!b) return;
  preset = b.dataset.preset;
  document.querySelectorAll("#presets .chip").forEach(c =>
    c.classList.toggle("on", c === b));
});
function chipRow(rowId, attr, fn) {
  $(rowId).addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    document.querySelectorAll("#" + rowId + " .chip").forEach(c =>
      c.classList.toggle("on", c === b));
    fn(b.dataset[attr]);
  });
}
chipRow("counts", "count", v => { count = parseInt(v, 10); });
let assetKind = "anything";
chipRow("assets", "asset", v => { assetKind = v; });
document.querySelectorAll('input[name="mode"]').forEach(r =>
  r.addEventListener("change", () => {
    document.querySelectorAll(".mode").forEach(m =>
      m.classList.toggle("on", m.querySelector("input").checked));
  }));

$("size").addEventListener("change", () => {
  $("customsize").hidden = $("size").value !== "custom";
  updateSnapNote();
});
function updateSnapNote() {
  const w = snap($("cw").value), h = snap($("ch").value);
  $("snapnote").textContent = (w && h)
    ? "→ the studio will use " + w + "×" + h + " (sizes snap to tidy numbers)"
    : "512–1536 each way";
}
$("cw").addEventListener("input", updateSnapNote);
$("ch").addEventListener("input", updateSnapNote);

function refCheck() {
  const has = $("ref-url").value.trim() || $("ref-file").value.trim();
  $("refstrength").hidden = !has;
}
$("ref-url").addEventListener("input", refCheck);
$("ref-file").addEventListener("input", refCheck);
$("ref-strength").addEventListener("input", () =>
  $("ref-strength-val").textContent = Number($("ref-strength").value).toFixed(2));

function creativityWord(v) {
  v = Number(v);
  if (v <= 5) return v + " — follows your words closely";
  if (v <= 8.5) return v + " — balanced";
  return v + " — wild & surprising";
}
$("guidance").addEventListener("input", () =>
  $("guidance-val").textContent = creativityWord($("guidance").value));
$("steps").addEventListener("input", () =>
  $("steps-val").textContent = $("steps").value);

$("generate").addEventListener("click", () => {
  const prompt = $("prompt").value.trim();
  if (!prompt) {
    $("prompt").focus();
    $("prompt").placeholder = "Type what you want to see first! 👆";
    return;
  }
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const id = newId();
  const job = {
    id: id, type: "image-studio",
    prompt: prompt,
    negative: $("negative").value.trim(),
    positive: $("positive").value.trim(),
    preset: preset, mode: mode,
    size: $("size").value,
    count: count,
    guidance: Number($("guidance").value),
    steps: Number($("steps").value),
    at: new Date().toISOString()
  };
  const seed = parseInt($("seed").value, 10);
  if (seed > 0) job.seed = seed;
  if (assetKind !== "anything") job.asset = assetKind;
  if (job.size === "custom") {
    job.width = snap($("cw").value) || 1024;
    job.height = snap($("ch").value) || 1024;
  }
  const refUrl = $("ref-url").value.trim();
  const refFile = $("ref-file").value.trim();
  if (refUrl) job.ref_url = refUrl;
  else if (refFile) job.ref_path = REFS_PREFIX + refFile.replace(/^\/+/, "");
  if (job.ref_url || job.ref_path)
    job.ref_strength = Number($("ref-strength").value);
  const flags = [...improveFlags.new];
  if (flags.length) job.improve = flags;
  sendOrder(job, { id: id, prompt: prompt, preset: preset, mode: mode,
                   kind: "new", at: job.at }, "sendbox", "sendlink");
});

// ---- source pickers (edit + crop) ----------------------------------------------
function wireSource(prefix) {
  const state = { source: null };
  const prev = $(prefix + "-srcprev");
  function show() {
    if (!state.source) {
      prev.innerHTML = '<span class="muted">No source picked yet.</span>';
      return;
    }
    if (state.source.kind === "gallery" || state.source.kind === "url") {
      const url = state.source.kind === "gallery"
        ? state.source.value.replace(/^image-studio\//, "")
        : state.source.value;
      prev.innerHTML = '<img src="' + esc(url) + '" alt="">' +
        '<span class="muted">' + esc(state.source.label || "") + "</span>";
    } else {
      prev.innerHTML = '<span class="muted">📁 ' +
        esc(state.source.label || state.source.value) + "</span>";
    }
  }
  $(prefix + "-url").addEventListener("change", () => {
    const v = $(prefix + "-url").value.trim();
    if (v) { state.source = { kind: "url", value: v, label: "from a link" }; show(); }
  });
  $(prefix + "-file").addEventListener("change", () => {
    const v = $(prefix + "-file").value.trim();
    if (v) {
      state.source = { kind: "ref", value: REFS_PREFIX + v.replace(/^\/+/, ""),
                       label: v };
      show();
    }
  });
  return { state, show,
           set(src) { state.source = src; show(); } };
}
const editSrc = wireSource("edit");
const cropSrc = wireSource("crop");

// ---- edit form ---------------------------------------------------------------
let editCount = 1;
chipRow("edit-counts", "count", v => { editCount = parseInt(v, 10); });
function strengthWord(v) {
  v = Number(v);
  if (v <= 0.35) return v.toFixed(2) + " — a gentle touch-up";
  if (v <= 0.7) return v.toFixed(2) + " — a solid change";
  return v.toFixed(2) + " — a big change";
}
$("edit-strength").addEventListener("input", () =>
  $("edit-strength-val").textContent = strengthWord($("edit-strength").value));

$("edit-go").addEventListener("click", () => {
  if (!editSrc.state.source) {
    $("editcard").scrollIntoView({ behavior: "smooth" });
    $("edit-srcprev").innerHTML =
      '<span class="gerr">Pick a source picture first — tap ✏️ Edit under a gallery picture, paste a link, or upload one. 👆</span>';
    return;
  }
  const prompt = $("edit-prompt").value.trim();
  if (!prompt) { $("edit-prompt").focus(); return; }
  const id = newId();
  const job = {
    id: id, type: "edit",
    prompt: prompt,
    source: { kind: editSrc.state.source.kind,
              value: editSrc.state.source.value },
    strength: Number($("edit-strength").value),
    count: editCount,
    at: new Date().toISOString()
  };
  if (editSrc.state.source.preset) job.preset = editSrc.state.source.preset;
  const seed = parseInt($("edit-seed").value, 10);
  if (seed > 0) job.seed = seed;
  const flags = [...improveFlags.edit];
  if (flags.length) job.improve = flags;
  sendOrder(job, { id: id, prompt: "✏️ Edit: " + prompt, kind: "edit",
                   mode: "studio", at: job.at },
            "edit-sendbox", "edit-sendlink");
});

// ---- crop form ---------------------------------------------------------------
let cropMode = "subject";
chipRow("crop-modes", "cropmode", v => { cropMode = v; });
$("crop-go").addEventListener("click", () => {
  if (!cropSrc.state.source) {
    $("cropcard").scrollIntoView({ behavior: "smooth" });
    $("crop-srcprev").innerHTML =
      '<span class="gerr">Pick a source picture first — tap ✂️ Crop under a gallery picture, paste a link, or upload one. 👆</span>';
    return;
  }
  const id = newId();
  const names = { subject: "just the subject", square: "square",
                  tall: "tall", wide: "wide" };
  const job = {
    id: id, type: "crop",
    crop_mode: cropMode,
    source: { kind: cropSrc.state.source.kind,
              value: cropSrc.state.source.value },
    at: new Date().toISOString()
  };
  sendOrder(job, { id: id, prompt: "✂️ Crop (" + names[cropMode] + ")",
                   kind: "crop", mode: "crop", at: job.at },
            "crop-sendbox", "crop-sendlink");
});

// ---- gallery ---------------------------------------------------------------
const STATE_LABEL = {
  sent: "✉️ SENT — WAITING FOR PICKUP", queued: "🕐 QUEUED",
  cooking: "🔥 COOKING", done: "✅ DONE", failed: "✗ FAILED"
};
function detailsBlock(e) {
  const rows = [];
  if (e.final_prompt && e.final_prompt !== e.prompt)
    rows.push(["Final prompt", e.final_prompt]);
  if (e.final_negative) rows.push(["Final negatives", e.final_negative]);
  if (e.positive) rows.push(["Good things", e.positive]);
  if (e.seed != null) rows.push(["Seed used", e.seed]);
  else if (e.seed_requested) rows.push(["Seed asked for", e.seed_requested]);
  if (e.width && e.height) rows.push(["Size", e.width + "×" + e.height]);
  if (e.improved && e.improved.length)
    rows.push(["AI-polished", e.improved.join(", ")]);
  if (e.kind === "edit") {
    rows.push(["Change strength", e.strength]);
    if (e.source) rows.push(["Edited from", e.source.value || ""]);
  }
  if (e.kind === "crop") rows.push(["Crop shape", e.crop_mode || "subject"]);
  if (e.asset) rows.push(["Asset kind", e.asset +
    (e.cutout === "done" ? " — transparent PNG ✓"
     : e.cutout === "pending" ? " — cutout pending (plain background for now)"
     : e.cutout === "skipped" ? " — full-frame (tiles don't get cut out)" : "")]);
  if (e.ref) rows.push(["Reference", e.ref +
    (e.ip_adapter ? " (look borrowed ✓)" : " (sent; check the picture)")]);
  if (!rows.length) return "";
  return '<details class="gfinal"><summary>What was actually used</summary>' +
    rows.map(r => '<div class="frow"><b>' + esc(r[0]) + ":</b> " +
      esc(r[1]) + "</div>").join("") + "</details>";
}
function card(e) {
  const div = document.createElement("div");
  div.className = "gcard";
  let top;
  if (e.state === "done" && e.image) {
    top = '<img src="' + esc(e.image) + '" loading="lazy" alt=""' +
      (e.transparent ? ' class="alpha"' : "") + '>';
  } else if (e.state === "cooking") {
    top = '<div class="ph">🔥</div>';
  } else if (e.state === "failed") {
    top = '<div class="ph">🚫</div>';
  } else {
    top = '<div class="ph">🎨</div>';
  }
  const shownPrompt = (e.state === "done" && e.final_prompt)
    ? e.final_prompt : e.prompt;
  const badge = e.kind === "edit" ? ' <span class="kindbadge">✏️ EDIT</span>'
    : e.kind === "crop" ? ' <span class="kindbadge">✂️ CROP</span>'
    : e.asset ? ' <span class="kindbadge">🧩 ' + esc(e.asset) + "</span>" : "";
  const meta = [e.preset, e.mode,
    (e.width && e.height) ? e.width + "×" + e.height : "",
    (e.seed != null) ? "seed " + e.seed : "",
    (e.of > 1) ? "pic " + e.part + "/" + e.of : "",
    ago(e.at)].filter(Boolean).join(" · ");
  let html = top + '<div class="gbody"><div class="gprompt">' +
    esc(shownPrompt) + badge + '</div><div class="gmeta">' + esc(meta) +
    '</div><span class="state ' + esc(e.state) + '">' +
    (STATE_LABEL[e.state] || esc(e.state)) + "</span>";
  if (e.state === "failed" && e.error)
    html += '<div class="gerr">' + esc(e.error) + "</div>";
  html += detailsBlock(e);
  if (e.state === "done" && e.image) {
    html += '<div class="gact"><a class="dl" href="' + esc(e.image) +
      '" download>⬇ Download</a>' +
      '<button type="button" class="gbtn" data-edit="' + esc(e.id) +
      '">✏️ Edit</button>' +
      '<button type="button" class="gbtn" data-crop="' + esc(e.id) +
      '">✂️ Crop</button></div>';
  }
  div.innerHTML = html + "</div>";
  return div;
}

let galleryIndex = [];
$("gallery").addEventListener("click", (e) => {
  const eb = e.target.closest("[data-edit]");
  const cb = e.target.closest("[data-crop]");
  const btn = eb || cb;
  if (!btn) return;
  const entry = galleryIndex.find(x => x.id === (eb ? eb.dataset.edit
                                                    : cb.dataset.crop));
  if (!entry || !entry.image) return;
  const src = { kind: "gallery", value: "image-studio/" + entry.image,
                label: "gallery picture", preset: entry.preset || undefined };
  if (eb) {
    editSrc.set(src);
    $("editcard").scrollIntoView({ behavior: "smooth" });
  } else {
    cropSrc.set(src);
    $("cropcard").scrollIntoView({ behavior: "smooth" });
  }
});

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
  galleryIndex = idx;
  const seen = new Set();
  idx.forEach(e => { seen.add(e.id); if (e.group) seen.add(e.group); });
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
  const landed = new Set(idx.filter(e => e.state === "done" || e.state === "failed")
    .flatMap(e => [e.id, e.group].filter(Boolean)));
  if (landed.size) savePending(loadPending().filter(p => !landed.has(p.id)));
}

render();
setInterval(render, 45000);
