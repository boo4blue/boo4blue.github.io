"use strict";
/* Onion Core — Website Maker (console)
   Reads the site list from data/state.json (kept fresh by the workshop runner).
   Changes travel as small order files: this page builds the order, then a
   one-tap GitHub page files it — no keys or tokens live in this page. */
const GATE_HASH = "eb1e3080e8ae9b5c773eaeda61a43b7a610092372df52f5e1c6ea68e05ac43d4";
const STATE_URL = "data/state.json";
const REPO_NEW = "https://github.com/boo4blue/boo4blue.github.io/new/main/my-websites/queue";
const $ = (id) => document.getElementById(id);

let SITES = [];
let formMode = "create";       // "create" | "edit"
let editingSlug = null;
let curTpl = "poster";
let renameSlug = null;
let deleteSlug = null;

/* ---------- helpers ---------- */
async function sha256hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function slugify(name) {
  return String(name || "").toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 58).replace(/-+$/, "");
}
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function show(view) {
  for (const v of ["lock", "home", "form", "rename", "delete"])
    $("view-" + v).classList.toggle("hidden", v !== view);
  window.scrollTo(0, 0);
}
function pending() {
  try { return JSON.parse(localStorage.getItem("oc_pending") || "[]"); } catch (e) { return []; }
}
function setPending(list) {
  try { localStorage.setItem("oc_pending", JSON.stringify(list.slice(0, 12))); } catch (e) {}
}
function opId() {
  return "oc-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
}
function fileOp(op, sendboxId, linkId) {
  op.id = opId(); op.v = 1; op.gate = GATE_HASH; op.ts = Date.now();
  const list = pending(); list.unshift(op); setPending(list);
  const url = REPO_NEW + "?filename=" + encodeURIComponent(op.id + ".json") +
    "&value=" + encodeURIComponent(JSON.stringify(op, null, 2));
  $(linkId).href = url;
  $(sendboxId).classList.remove("hidden");
  renderHome();
}

/* ---------- unlock ---------- */
async function tryUnlock(pass) {
  if (!pass) return false;
  return (await sha256hex(pass)) === GATE_HASH;
}
$("unlock-btn").addEventListener("click", async () => {
  const pass = $("pass-input").value.trim();
  if (await tryUnlock(pass)) {
    try { localStorage.setItem("oc_pass", pass); } catch (e) {}
    enterApp();
  } else {
    $("lock-err").textContent = "That's not the passcode. Try again.";
  }
});
function enterApp() { show("home"); loadState(); }

/* ---------- state + cards ---------- */
async function loadState() {
  try {
    const r = await fetch(STATE_URL + "?t=" + Date.now());
    if (r.ok) { const d = await r.json(); SITES = d.sites || []; }
  } catch (e) { /* keep last known */ }
  prunePending();
  renderHome();
}
function prunePending() {
  const bySlug = {};
  for (const s of SITES) bySlug[s.slug] = s;
  const keep = pending().filter((op) => {
    if (Date.now() - op.ts > 45 * 60 * 1000) return false; // stale either way
    if (op.type === "create") return !bySlug[op.slug];
    if (op.type === "update") { const s = bySlug[op.slug]; return !(s && s.updatedAt && Date.parse(s.updatedAt) > op.ts); }
    if (op.type === "rename") return !bySlug[op.newSlug];
    if (op.type === "delete") return !!bySlug[op.slug];
    return false;
  });
  setPending(keep);
}
function renderHome() {
  const cards = $("cards");
  const pend = pending();
  let html = "";
  for (const op of pend) {
    const label = op.type === "create" ? "Building your new site…"
      : op.type === "update" ? "Rebuilding with your changes…"
      : op.type === "rename" ? "Moving to the new name…"
      : "Deleting…";
    html += `<div class="scard"><h3>${esc(op.displayName || op.newSlug || op.slug)}</h3>` +
      `<span class="state building">⏳ ${label}</span></div>`;
  }
  for (const s of SITES) {
    const made = s.kind === "made";
    const chip = made ? `<span class="kindchip">Made here</span>`
      : `<span class="kindchip ext">${esc(s.kindLabel || "Website")}</span>`;
    let inner = `<h3>${esc(s.displayName)}${chip}</h3>` +
      `<a class="addr" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.url)}</a>`;
    if (made) inner += `<div class="soon">Later, with your domain: ${esc(s.slug)}.onioncore.com</div>`;
    if (s.status === "error" && s.lastError)
      inner += `<div><span class="state error">Hit a snag</span></div><div class="note">${esc(s.lastError)}</div>`;
    else if (made) inner += `<div><span class="state live">● Live</span></div>`;
    if (!made && s.note) inner += `<div class="note">${esc(s.note)}</div>`;
    if (!made) inner += `<div class="note">Hosted on GitHub — visit-only here for now.</div>`;
    inner += `<div class="sact"><a class="sbtn" href="${esc(s.url)}" target="_blank" rel="noopener">Visit →</a>`;
    if (made) {
      inner += `<button class="sbtn" data-edit="${esc(s.slug)}">✏️ Edit</button>` +
        `<button class="sbtn" data-rename="${esc(s.slug)}">Rename</button>` +
        `<button class="sbtn dangerb" data-del="${esc(s.slug)}">Delete</button>`;
    }
    inner += `</div>`;
    html += `<div class="scard">${inner}</div>`;
  }
  cards.innerHTML = html || `<p class="muted">No websites yet. Make your first one!</p>`;
  const strip = $("cookstrip");
  if (pend.length) {
    strip.classList.remove("hidden");
    strip.textContent = "⏳ Cooking… your list updates itself in a minute or two. You can close this page.";
  } else strip.classList.add("hidden");
  cards.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => openEdit(b.dataset.edit)));
  cards.querySelectorAll("[data-rename]").forEach((b) => b.addEventListener("click", () => openRename(b.dataset.rename)));
  cards.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", () => openDelete(b.dataset.del)));
}

/* ---------- create / edit form ---------- */
function setTpl(tpl) {
  curTpl = tpl;
  document.querySelectorAll("#tpl-chips .chip").forEach((c) => c.classList.toggle("on", c.dataset.tpl === tpl));
  for (const t of ["blank", "poster", "linklist", "photowall"])
    $("fields-" + t).classList.toggle("hidden", t !== tpl);
}
document.querySelectorAll("#tpl-chips .chip").forEach((c) =>
  c.addEventListener("click", () => setTpl(c.dataset.tpl)));

function addLinkRow(label, url) {
  const rows = $("link-rows");
  if (rows.children.length >= 8) return;
  const div = document.createElement("div");
  div.className = "linkrow";
  div.innerHTML = `<input class="lr-label" type="text" placeholder="Words on the button" maxlength="40">
                   <input class="lr-url" type="text" placeholder="https://…" maxlength="300">`;
  div.querySelector(".lr-label").value = label || "";
  div.querySelector(".lr-url").value = url || "";
  rows.appendChild(div);
}
$("link-add").addEventListener("click", () => addLinkRow("", ""));

function collectFields() {
  if (curTpl === "blank") return { text: $("fld-blank-text").value.trim() };
  if (curTpl === "poster") return {
    heading: $("fld-poster-heading").value.trim(),
    text: $("fld-poster-text").value.trim(),
    bg: $("fld-poster-bg").value, ink: $("fld-poster-ink").value, accent: $("fld-poster-accent").value,
  };
  if (curTpl === "linklist") {
    const links = [];
    document.querySelectorAll("#link-rows .linkrow").forEach((r) => {
      const label = r.querySelector(".lr-label").value.trim();
      const url = r.querySelector(".lr-url").value.trim();
      if (label && url) links.push({ label, url });
    });
    return { title: $("fld-links-title").value.trim(), links };
  }
  return {
    title: $("fld-wall-title").value.trim(),
    images: $("fld-wall-images").value.split(/\n+/).map((s) => s.trim()).filter(Boolean).slice(0, 12),
  };
}
function fillFields(tpl, f) {
  f = f || {};
  if (tpl === "blank") $("fld-blank-text").value = f.text || "";
  if (tpl === "poster") {
    $("fld-poster-heading").value = f.heading || "";
    $("fld-poster-text").value = f.text || "";
    $("fld-poster-bg").value = f.bg || "#0b0b16";
    $("fld-poster-ink").value = f.ink || "#f5f5fa";
    $("fld-poster-accent").value = f.accent || "#22d3ee";
  }
  if (tpl === "linklist") {
    $("fld-links-title").value = f.title || "";
    $("link-rows").innerHTML = "";
    (f.links && f.links.length ? f.links : [{ label: "", url: "" }, { label: "", url: "" }])
      .forEach((l) => addLinkRow(l.label, l.url));
  }
  if (tpl === "photowall") {
    $("fld-wall-title").value = f.title || "";
    $("fld-wall-images").value = (f.images || []).join("\n");
  }
}
function refreshAddrPreview() {
  const slug = slugify($("f-name").value);
  $("f-addr").textContent = slug ? slug : "…";
  $("f-addr2").textContent = slug ? slug + ".onioncore.com" : "….onioncore.com";
}
$("f-name").addEventListener("input", refreshAddrPreview);

$("new-btn").addEventListener("click", () => {
  formMode = "create"; editingSlug = null;
  $("form-title").textContent = "Make a website";
  $("form-go").textContent = "🚀 Make my website";
  $("f-name").value = ""; $("f-name").disabled = false;
  $("sendbox").classList.add("hidden"); $("form-err").textContent = "";
  setTpl("poster"); fillFields("poster", {}); fillFields("blank", {});
  $("link-rows").innerHTML = ""; addLinkRow("", ""); addLinkRow("", "");
  $("fld-wall-title").value = ""; $("fld-wall-images").value = "";
  refreshAddrPreview();
  show("form");
});
function openEdit(slug) {
  const s = SITES.find((x) => x.slug === slug);
  if (!s) return;
  formMode = "edit"; editingSlug = slug;
  $("form-title").textContent = "Edit " + s.displayName;
  $("form-go").textContent = "💾 Save my changes";
  $("f-name").value = s.displayName; $("f-name").disabled = true;
  $("sendbox").classList.add("hidden"); $("form-err").textContent = "";
  setTpl(s.template || "poster");
  fillFields(s.template || "poster", s.fields || {});
  refreshAddrPreview();
  show("form");
}
$("form-go").addEventListener("click", () => {
  const fields = collectFields();
  if (formMode === "create") {
    const name = $("f-name").value.trim();
    const slug = slugify(name);
    if (!name || slug.length < 2) { $("form-err").textContent = "Give it a name first (at least 2 letters)."; return; }
    if (SITES.some((s) => s.slug === slug) || pending().some((o) => o.slug === slug)) {
      $("form-err").textContent = "You already have a site with that name. Pick another."; return;
    }
    fileOp({ type: "create", slug, displayName: name, template: curTpl, fields }, "sendbox", "send-link");
  } else {
    fileOp({ type: "update", slug: editingSlug, displayName: SITES.find((x) => x.slug === editingSlug)?.displayName || editingSlug, template: curTpl, fields }, "sendbox", "send-link");
  }
});

/* ---------- rename ---------- */
function openRename(slug) {
  const s = SITES.find((x) => x.slug === slug);
  if (!s) return;
  renameSlug = slug;
  $("rn-old").textContent = s.displayName;
  $("rn-name").value = s.displayName;
  $("rn-sendbox").classList.add("hidden"); $("rn-err").textContent = "";
  refreshRn(); show("rename");
}
function refreshRn() {
  const slug = slugify($("rn-name").value);
  $("rn-addr").textContent = slug ? slug + " — and later " + slug + ".onioncore.com" : "…";
}
$("rn-name").addEventListener("input", refreshRn);
$("rn-go").addEventListener("click", () => {
  const name = $("rn-name").value.trim();
  const newSlug = slugify(name);
  if (!name || newSlug.length < 2) { $("rn-err").textContent = "Give it a name first (at least 2 letters)."; return; }
  if (newSlug === renameSlug) { $("rn-err").textContent = "That's the same name it already has."; return; }
  if (SITES.some((s) => s.slug === newSlug)) { $("rn-err").textContent = "That name is taken by another of your sites."; return; }
  fileOp({ type: "rename", slug: renameSlug, newSlug, displayName: name }, "rn-sendbox", "rn-send-link");
});

/* ---------- delete ---------- */
function openDelete(slug) {
  const s = SITES.find((x) => x.slug === slug);
  if (!s) return;
  deleteSlug = slug;
  $("del-name").textContent = s.displayName;
  $("del-sendbox").classList.add("hidden");
  show("delete");
}
$("del-go").addEventListener("click", () => {
  fileOp({ type: "delete", slug: deleteSlug, displayName: $("del-name").textContent }, "del-sendbox", "del-send-link");
});

/* ---------- nav ---------- */
document.querySelectorAll("[data-back]").forEach((b) =>
  b.addEventListener("click", () => { show("home"); loadState(); }));

/* ---------- boot ---------- */
(async () => {
  const saved = (() => { try { return localStorage.getItem("oc_pass"); } catch (e) { return null; } })();
  if (saved && (await tryUnlock(saved))) { enterApp(); return; }
  show("lock");
})();
setInterval(() => { if (!$("view-home").classList.contains("hidden")) loadState(); }, 30000);
