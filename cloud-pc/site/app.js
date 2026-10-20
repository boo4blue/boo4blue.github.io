/* Boo's Cloud PC dashboard. Static page -> GitHub API -> Actions runners. */
const OWNER = "boo4blue", REPO = "boo4blue.github.io";
const API = "https://api.github.com/repos/" + OWNER + "/" + REPO;
let token = localStorage.getItem("cloudpc_token") || "";
let activeTab = "shell";

const $ = id => document.getElementById(id);
const b64 = s => btoa(unescape(encodeURIComponent(s)));
const ub64 = s => decodeURIComponent(escape(atob(s.replace(/\n/g, ""))));
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g,
  c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));

async function api(path, opts) {
  opts = opts || {};
  opts.headers = Object.assign({
    "Accept": "application/vnd.github+json",
    "Authorization": "Bearer " + token
  }, opts.headers || {});
  const r = await fetch(API + path, opts);
  if (!r.ok) {
    const t = await r.text();
    throw new Error("GitHub " + r.status + ": " + t.slice(0, 200));
  }
  return r.status === 204 ? null : r.json();
}

function setStatus(ok) {
  const d = $("status");
  d.className = "dot " + (ok === true ? "ok" : ok === false ? "bad" : "idle");
}

async function boot() {
  if (!token) { $("setup").hidden = false; $("app").hidden = true; return; }
  try {
    await api("/contents/cloud-pc/README.md");
    setStatus(true);
    $("setup").hidden = true; $("app").hidden = false;
    loadJobs(); loadDisk();
  } catch (e) {
    setStatus(false);
    $("setup").hidden = false; $("app").hidden = true;
    alert("Key didn't work: " + e.message);
  }
}

$("saveToken").onclick = () => {
  token = $("token").value.trim();
  if (!token) return;
  localStorage.setItem("cloudpc_token", token);
  boot();
};
$("forget").onclick = e => {
  e.preventDefault();
  localStorage.removeItem("cloudpc_token"); token = "";
  location.reload();
};

document.querySelectorAll(".tabs button").forEach(b => {
  b.onclick = () => {
    document.querySelectorAll(".tabs button").forEach(x => x.classList.remove("on"));
    b.classList.add("on"); activeTab = b.dataset.tab;
    document.querySelectorAll(".pane").forEach(p => p.hidden = true);
    $("tab-" + activeTab).hidden = false;
  };
});

function buildJob() {
  const id = "web-" + Date.now().toString(36);
  if (activeTab === "shell") {
    const command = $("f-command").value.trim();
    if (!command) throw new Error("type a command first");
    return { id, action: "shell", command };
  }
  if (activeTab === "fetch") {
    const url = $("f-url").value.trim(), dest = $("f-dest").value.trim();
    if (!url || !dest) throw new Error("need a URL and a save-as path");
    return { id, action: "fetch", url, dest };
  }
  if (activeTab === "agent") {
    const task = $("f-task").value.trim();
    if (!task) throw new Error("describe the task first");
    return { id, action: "agent", task };
  }
  const path = $("f-path").value.trim(), content = $("f-content").value;
  if (!path) throw new Error("need a file path");
  return { id, action: "store", path, content };
}

$("send").onclick = async () => {
  const msg = $("sendMsg");
  try {
    const job = buildJob();
    msg.textContent = "Sending...";
    await api("/contents/cloud-pc/inbox/" + job.id + ".json", {
      method: "PUT",
      body: JSON.stringify({
        message: "cloudpc: job " + job.id + " from web",
        content: b64(JSON.stringify(job, null, 2))
      })
    });
    msg.textContent = "Sent! The PC wakes up in ~30s. Watching for the answer...";
    watchJob(job.id);
  } catch (e) { msg.textContent = "Failed: " + e.message; }
};

const seen = {};
async function watchJob(id) {
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 15000));
    try {
      const f = await api("/contents/cloud-pc/outbox/" + id + ".json");
      loadJobs();
      return;
    } catch (e) { /* not ready yet */ }
  }
  $("sendMsg").textContent = "Still nothing after 10 min — check the Actions tab.";
}

function resultText(r) {
  const res = r.result || {};
  if (r.action === "shell")
    return "exit=" + res.exit + "\n" + (res.stdout || "") + (res.stderr || "");
  if (r.action === "agent")
    return (res.agent && (res.agent.answer || res.agent.error)) || JSON.stringify(res).slice(0, 2000);
  return JSON.stringify(res, null, 2).slice(0, 2000);
}

async function loadJobs() {
  const box = $("jobs");
  try {
    const files = await api("/contents/cloud-pc/outbox");
    files.sort((a, b) => b.name.localeCompare(a.name));
    box.innerHTML = "";
    for (const f of files.slice(0, 20)) {
      if (!f.name.endsWith(".json")) continue;
      const d = await api("/contents/cloud-pc/outbox/" + f.name);
      const r = JSON.parse(ub64(d.content));
      const ok = r.result && (r.result.ok || (r.result.agent && r.result.agent.ok));
      const div = document.createElement("div");
      div.className = "job";
      div.innerHTML =
        '<div class="head"><span class="id">' + esc(r.id) + " · " + esc(r.action) +
        '</span><span class="badge ' + (ok ? "ok" : "bad") + '">' +
        (ok ? "done" : "failed") + "</span></div>" +
        '<pre hidden>' + esc(resultText(r)) + "</pre>";
      div.querySelector(".head").onclick = () => {
        const pre = div.querySelector("pre"); pre.hidden = !pre.hidden;
      };
      box.appendChild(div);
    }
    if (!box.children.length) box.innerHTML = '<p class="fine">No jobs yet.</p>';
  } catch (e) { box.innerHTML = '<p class="fine">Could not load jobs: ' + esc(e.message) + "</p>"; }
}

async function loadDisk() {
  const box = $("disk");
  try {
    const t = await api("/git/trees/main?recursive=1");
    const files = t.tree.filter(n =>
      n.path.startsWith("cloud-pc/storage/") && n.type === "blob" &&
      !n.path.endsWith("/.gitkeep"));
    box.innerHTML = files.length
      ? files.map(n => '<div class="file">' +
          esc(n.path.replace("cloud-pc/storage/", "")) +
          ' <span class="fine">' + (n.size / 1024).toFixed(1) + " KB</span></div>").join("")
      : '<p class="fine">Disk is empty.</p>';
  } catch (e) { box.innerHTML = '<p class="fine">Could not load disk: ' + esc(e.message) + "</p>"; }
}

$("refresh").onclick = loadJobs;
$("refreshDisk").onclick = loadDisk;

/* ---------- Live desktop over MQTT ---------- */
let mq = null, deskSecret = "", deskBase = "", deskOn = false;

function mqPub(topic, obj) {
  if (mq && mq.connected) mq.publish(topic, JSON.stringify(obj));
}

function deskMsg(t) { $("deskState").textContent = t; }

$("deskStart").onclick = async () => {
  if (typeof mqtt === "undefined") { deskMsg("MQTT library failed to load."); return; }
  deskSecret = Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map(b => b.toString(16).padStart(2, "0")).join("");
  deskMsg("Waking the PC (installing desktop, ~2 min)...");
  $("deskStart").disabled = true;
  try {
    await api("/contents/cloud-pc/inbox/desk-" + deskSecret.slice(0, 8) + ".json", {
      method: "PUT",
      body: JSON.stringify({
        message: "cloudpc: desktop session from web",
        content: b64(JSON.stringify({ id: "desk-" + deskSecret.slice(0, 8),
          action: "desktop", session: deskSecret, minutes: 30 }))
      })
    });
  } catch (e) {
    deskMsg("Key can't write (GitHub 403) — fix it above, or tell me in chat " +
      "“start desktop” and I'll start it for you.");
    $("deskStart").disabled = false;
    return;
  }
  deskConnect(deskSecret);
};

function deskConnect(secret) {
  deskSecret = secret;
  deskBase = "onionpc/v1/" + deskSecret;
  mq.on("connect", () => {
    mq.subscribe(deskBase + "/status");
    mq.subscribe(deskBase + "/screen");
    deskMsg("Waiting for the desktop to boot...");
  });
  mq.on("error", () => deskMsg("Realtime link failed — the PC may still boot; try Stop then Start."));
  mq.on("message", (topic, payload) => {
    if (topic === deskBase + "/status") {
      try {
        const s = JSON.parse(payload.toString());
        if (s.state === "ready") {
          deskOn = true;
          $("deskWrap").hidden = false;
          $("deskStop").disabled = false;
          deskMsg("Live — click the screen, type below.");
        } else if (s.state === "ended") {
          deskEnd("Session ended (" + (s.shots || 0) + " frames).");
        }
      } catch (e) {}
    } else if (topic === deskBase + "/screen") {
      const img = new Image();
      img.onload = () => {
        const c = $("screen");
        c.width = img.naturalWidth; c.height = img.naturalHeight;
        c.getContext("2d").drawImage(img, 0, 0);
      };
      img.src = "data:image/jpeg;base64," + payload.toString();
    }
  });
};

function deskEnd(t) {
  deskOn = false;
  deskMsg(t);
  $("deskStart").disabled = false;
  $("deskStop").disabled = true;
  try { mq && mq.end(); } catch (e) {}
  mq = null;
}

$("deskStop").onclick = () => {
  mqPub(deskBase + "/input", { type: "stop" });
  deskEnd("Stopping...");
};

$("screen").addEventListener("click", e => {
  if (!deskOn) return;
  const c = $("screen"), r = c.getBoundingClientRect();
  const cx = (e.clientX - r.left) * (c.width / r.width);
  const cy = (e.clientY - r.top) * (c.height / r.height);
  // Bridge desktop is 1024x768; map canvas pixels back to desktop pixels.
  mqPub(deskBase + "/input", { type: "click",
    x: Math.round(cx * 1024 / c.width), y: Math.round(cy * 768 / c.height),
    button: 1 });
});

$("typeSend").onclick = () => {
  const t = $("typebox").value;
  if (!t || !deskOn) return;
  mqPub(deskBase + "/input", { type: "type", text: t });
  $("typebox").value = "";
};
$("typebox").addEventListener("keydown", e => {
  if (e.key === "Enter") $("typeSend").onclick();
});

document.querySelectorAll("[data-app]").forEach(b => {
  b.onclick = () => deskOn && mqPub(deskBase + "/input", { type: "launch", app: b.dataset.app });
});
document.querySelectorAll("[data-key]").forEach(b => {
  b.onclick = () => deskOn && mqPub(deskBase + "/input", { type: "key", key: b.dataset.key });
});

// Deep link: ?session=<secret> — joins a desktop started from chat.
(function () {
  const s = new URLSearchParams(location.search).get("session");
  if (s && /^[0-9a-f]{16}$/.test(s) && typeof mqtt !== "undefined") {
    history.replaceState(null, "", location.pathname);
    $("deskStart").disabled = true;
    deskMsg("Connecting to your desktop session...");
    deskConnect(s);
  }
})();

boot();
