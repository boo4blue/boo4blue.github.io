/* Onion AI — chat with the model running on your Cloud PC. */
const OWNER = "boo4blue", REPO = "boo4blue.github.io";
const API = "https://api.github.com/repos/" + OWNER + "/" + REPO;
const SYSTEM = "You are Onion AI, Blaze's personal AI assistant. You run on " +
  "his own cloud PC. Be helpful, direct, and a little playful. Keep answers " +
  "tight unless he asks for detail. You are great at coding.";
let token = localStorage.getItem("cloudpc_token") || "";
let mq = null, base = "", live = false, reqId = 0;
let history = JSON.parse(localStorage.getItem("onionai_hist") || "[]");

const $ = id => document.getElementById(id);
const b64 = s => btoa(unescape(encodeURIComponent(s)));
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g,
  c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));

async function api(path, opts) {
  opts = opts || {};
  opts.headers = Object.assign({
    "Accept": "application/vnd.github+json",
    "Authorization": "Bearer " + token
  }, opts.headers || {});
  const r = await fetch(API + path, opts);
  if (!r.ok) throw new Error("GitHub " + r.status);
  return r.json();
}

function setStatus(s) { $("status").className = "dot " + s; }

function addMsg(role, text) {
  const d = document.createElement("div");
  d.className = "msg " + role;
  d.innerHTML = esc(text);
  $("msgs").appendChild(d);
  $("msgs").scrollTop = $("msgs").scrollHeight;
  return d;
}

function saveHist() {
  localStorage.setItem("onionai_hist", JSON.stringify(history.slice(-40)));
}

// restore past conversation
history.forEach(m => { if (m.role !== "system") addMsg(m.role === "user" ? "user" : "ai", m.content); });

if (!token) { $("keyMsg").hidden = false; $("start").disabled = true; }

$("start").onclick = async () => {
  if (typeof mqtt === "undefined") { $("gateMsg").textContent = "Realtime library failed to load."; return; }
  const secret = Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map(b => b.toString(16).padStart(2, "0")).join("");
  base = "onionpc/v1/" + secret;
  $("gateMsg").textContent = "Waking Onion AI (first boot downloads the brain, ~5 min)...";
  $("start").disabled = true;
  try {
    await api("/contents/cloud-pc/inbox/ai-" + secret.slice(0, 8) + ".json", {
      method: "PUT",
      body: JSON.stringify({
        message: "cloudpc: onion ai session from web",
        content: b64(JSON.stringify({ id: "ai-" + secret.slice(0, 8),
          action: "aimodel", session: secret, minutes: 30 }))
      })
    });
  } catch (e) {
    $("gateMsg").textContent = "Failed to start: " + e.message +
      " — check your key on the PC dashboard.";
    $("start").disabled = false;
    return;
  }
  mq = mqtt.connect("wss://broker.emqx.io:8084/mqtt", { connectTimeout: 15000 });
  mq.on("connect", () => {
    mq.subscribe(base + "/ai/status");
    mq.subscribe(base + "/ai/out");
  });
  mq.on("error", () => { $("gateMsg").textContent = "Realtime link failed — try again."; $("start").disabled = false; });
  mq.on("message", (topic, payload) => {
    if (topic.endsWith("/ai/status")) {
      try {
        const s = JSON.parse(payload.toString());
        if (s.state === "ready") {
          live = true; setStatus("ok");
          $("gate").hidden = true; $("chat").hidden = false;
          addMsg("sys", "Onion AI is live 🧅");
        } else if (s.state === "ended") {
          endSession("Session ended.");
        }
      } catch (e) {}
    } else if (topic.endsWith("/ai/out")) {
      try {
        const m = JSON.parse(payload.toString());
        if (m.t === "tok") {
          let el = document.getElementById("stream-" + m.id);
          if (!el) {
            el = addMsg("ai", "");
            el.id = "stream-" + m.id;
            el.classList.add("typing");
          }
          el.textContent += m.text;
          $("msgs").scrollTop = $("msgs").scrollHeight;
        } else if (m.t === "done" || m.t === "error") {
          const el = document.getElementById("stream-" + m.id);
          if (el) {
            el.classList.remove("typing");
            el.removeAttribute("id");
            const text = m.t === "error" ? "Error: " + m.error : el.textContent;
            if (m.t === "error") el.textContent = text;
            history.push({ role: "assistant", content: el.textContent });
            saveHist();
          }
          $("send").disabled = false;
        }
      } catch (e) {}
    }
  });
};

function endSession(t) {
  live = false; setStatus("idle");
  addMsg("sys", t);
  try { mq && mq.end(); } catch (e) {}
  mq = null;
  $("stop").disabled = true;
}

$("stop").onclick = () => {
  if (mq && mq.connected) mq.publish(base + "/ai/in", JSON.stringify({ t: "stop" }));
  endSession("Stopping...");
};

function send() {
  const text = $("in").value.trim();
  if (!text || !live) return;
  $("in").value = "";
  addMsg("user", text);
  history.push({ role: "user", content: text });
  saveHist();
  const id = "r" + (++reqId);
  const msgs = [{ role: "system", content: SYSTEM }]
    .concat(history.filter(m => m.role !== "system").slice(-20));
  mq.publish(base + "/ai/in", JSON.stringify({ t: "chat", id, messages: msgs }));
  $("send").disabled = true;
}

$("send").onclick = send;
$("in").addEventListener("keydown", e => { if (e.key === "Enter") send(); });
setStatus("idle");
