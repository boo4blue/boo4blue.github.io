/* Haven FW web — Discord-style chat (ported from the app's community chat look).
   The app has three channels: General / Ask for Help / Free Stuff.
   This module redeclares app.js's chat store/render/send as channel-aware
   (loaded after app.js, so these win). Messages stay local-only, one
   100-message store per channel. One-time migration moves the old
   single-thread 'haven_chat' store into #general.
   Layout: left channel sidebar, channel header, Discord-style message rows
   (avatar circle, username, timestamp, grouped consecutive messages),
   rounded composer with emoji picker, hover actions (copy/delete). */
var CHAT_CHANNELS = [
  ["general", "💬", "General", "Say something kind…"],
  ["help", "🆘", "Ask for Help", "What do you need help with?"],
  ["freebies", "🎁", "Free Stuff", "Giving something away? Post it here…"]
];
var DC_AV_COLORS = ["#5865F2", "#57F287", "#EB459E", "#ED4245", "#E67E22", "#9B59B6", "#1ABC9C", "#E91E63", "#FEE75C", "#2ECC71"];
var DC_EMOJIS = ["😀", "😂", "😍", "🤣", "😊", "🙏", "👍", "👎", "❤️", "🔥", "🎉", "😢", "😮", "🤔", "👏", "💯", "🙌", "😴", "🤝", "💜"];
function chatChanKey(ch) { return "haven_chat_" + ch; }
function chatChanValid(ch) {
  for (var i = 0; i < CHAT_CHANNELS.length; i++) if (CHAT_CHANNELS[i][0] === ch) return true;
  return false;
}
function chatChan() {
  var c = null;
  try { c = localStorage.getItem("haven_chat_chan"); } catch (e) {}
  return chatChanValid(c) ? c : "general";
}
function chatMigrate() {
  try {
    if (localStorage.getItem(chatChanKey("general")) !== null) return;
    var legacy = localStorage.getItem("haven_chat");
    if (legacy === null) return;
    localStorage.setItem(chatChanKey("general"), legacy);
    localStorage.removeItem("haven_chat");
  } catch (e) {}
}
function chatItems() {
  chatMigrate();
  try {
    var c = JSON.parse(localStorage.getItem(chatChanKey(chatChan())) || "[]");
    return Array.isArray(c) ? c : [];
  } catch (e) { return []; }
}
function saveChat(c) {
  try { localStorage.setItem(chatChanKey(chatChan()), JSON.stringify(c)); } catch (e) {}
}
function chatChanMeta(ch) {
  for (var i = 0; i < CHAT_CHANNELS.length; i++) if (CHAT_CHANNELS[i][0] === ch) return CHAT_CHANNELS[i];
  return CHAT_CHANNELS[0];
}
function setChatChan(ch) {
  if (!chatChanValid(ch)) return;
  try { localStorage.setItem("haven_chat_chan", ch); } catch (e) {}
  renderChatChips();
  var inp = document.getElementById("chat-input");
  if (inp) inp.placeholder = chatChanMeta(ch)[3];
  renderChat();
}
function renderChatChips() {
  var box = document.getElementById("chat-channels");
  if (!box) return;
  var cur = chatChan();
  var html = "";
  for (var i = 0; i < CHAT_CHANNELS.length; i++) {
    var x = CHAT_CHANNELS[i];
    html += '<button type="button" class="dc-chan' + (x[0] === cur ? " on" : "") + '"' +
      ' onclick="setChatChan(\'' + x[0] + '\')"><span class="dc-hash">#</span><span>' + escapeHtml(x[2]) + "</span></button>";
  }
  box.innerHTML = html;
}
function dcAvatarColor(name) {
  var h = 0, s = String(name || "?");
  for (var i = 0; i < s.length; i++) h = ((h * 31) + s.charCodeAt(i)) >>> 0;
  return DC_AV_COLORS[h % DC_AV_COLORS.length];
}
function renderChat(scroll) {
  renderChatChips();
  var meta = chatChanMeta(chatChan());
  var inp = document.getElementById("chat-input");
  if (inp) inp.placeholder = meta[3];
  var hn = document.getElementById("dc-chan-name");
  if (hn) hn.textContent = "# " + String(meta[2]).toLowerCase();
  var box = document.getElementById("chat-msgs");
  if (!box) return;
  var c = chatItems();
  if (!c.length) {
    box.innerHTML = '<div class="dc-empty"><div class="dc-empty-hash">#</div>' +
      '<div class="dc-empty-title">Welcome to #' + escapeHtml(String(meta[2]).toLowerCase()) + "!</div>" +
      '<div class="dc-empty-sub">This is the start of the channel.<br>Say hi. 👋</div></div>';
  } else {
    var html = "", prevN = null;
    for (var i = 0; i < c.length; i++) {
      var m = c[i] || {};
      var n = String(m.n == null ? "?" : m.n), t = String(m.t || ""), x = String(m.x || "");
      var grouped = (n === prevN);
      prevN = n;
      html += '<div class="dc-msg' + (grouped ? " grouped" : "") + '">' +
        '<div class="dc-av" style="background:' + dcAvatarColor(n) + '">' + (grouped ? "" : escapeHtml(n.charAt(0).toUpperCase() || "?")) + "</div>" +
        '<div class="dc-body">' +
        (grouped ? "" : '<div class="dc-head"><span class="dc-name">' + escapeHtml(n) + '</span><span class="dc-time">' + escapeHtml(t) + "</span></div>") +
        '<div class="dc-text">' + escapeHtml(x) + "</div>" +
        "</div>" +
        '<div class="dc-actions"><button type="button" onclick="dcCopyMsg(' + i + ')" aria-label="Copy message">⧉</button>' +
        '<button type="button" onclick="dcDelMsg(' + i + ')" aria-label="Delete message">🗑</button></div>' +
        "</div>";
    }
    box.innerHTML = html;
  }
  if (scroll !== false) box.scrollTop = box.scrollHeight;
  renderMutedWords();
}
function dcCopyMsg(i) {
  var c = chatItems();
  var m = c[i];
  if (!m) return;
  var txt = String(m.x || "");
  var done = function () { if (typeof miniToast === "function") miniToast("Copied ⧉"); };
  var fallback = function () {
    try {
      var ta = document.createElement("textarea");
      ta.value = txt;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      if (ok) done();
      else if (typeof miniToast === "function") miniToast("Copy failed — long-press to copy");
    } catch (e) {
      if (typeof miniToast === "function") miniToast("Copy failed — long-press to copy");
    }
  };
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, fallback);
      return;
    }
  } catch (e) {}
  fallback();
}
function dcDelMsg(i) {
  var c = chatItems();
  if (i < 0 || i >= c.length) return;
  c.splice(i, 1);
  saveChat(c);
  renderChat(false);
}
function dcToggleEmoji(ev) {
  if (ev && ev.stopPropagation) ev.stopPropagation();
  var p = document.getElementById("dc-emoji-pop");
  if (!p) return;
  if (p.style.display === "grid") { p.style.display = "none"; return; }
  if (!p.innerHTML) {
    p.innerHTML = DC_EMOJIS.map(function (e) {
      return '<button type="button" onclick="dcInsertEmoji(\'' + e + '\')" aria-label="Insert emoji">' + e + "</button>";
    }).join("");
  }
  p.style.display = "grid";
}
function dcInsertEmoji(e) {
  var inp = document.getElementById("chat-input");
  if (inp) {
    var s = inp.selectionStart, en = inp.selectionEnd;
    if (s == null) { s = inp.value.length; en = s; }
    inp.value = inp.value.slice(0, s) + e + inp.value.slice(en);
    inp.focus();
    try { inp.setSelectionRange(s + e.length, s + e.length); } catch (x) {}
  }
  var p = document.getElementById("dc-emoji-pop");
  if (p) p.style.display = "none";
}
function sendChat() {
  var inp = document.getElementById("chat-input");
  if (!inp) return;
  var v = inp.value.trim();
  if (!v) return;
  var hit = chatMutedHit(v);
  if (hit) { miniToast("🚫 Blocked: contains a muted word"); return; }
  var c = chatItems();
  c.push({ n: chatName(), x: v.slice(0, 300), t: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) });
  saveChat(c.slice(-100));
  inp.value = "";
  renderChat();
  if (!(chatCrisisCheck(v) && chatCrisisAlert())) miniToast("Message sent 💬");
}
if (typeof document !== "undefined" && document.addEventListener) {
  document.addEventListener("click", function (e) {
    var p = document.getElementById("dc-emoji-pop");
    if (p && p.style.display === "grid" && e.target && e.target.closest &&
        !e.target.closest("#dc-emoji-pop") && !e.target.closest("#dc-emoji-btn")) {
      p.style.display = "none";
    }
  });
}

/* ---- Chat moderation (local-only): muted words + clear channel ----
   Muted words live in localStorage under "haven_chat_muted" (same key as the
   Android app). A message containing any muted word (case-insensitive
   substring) is blocked at send time with an honest toast. The muted-words
   manager and the clear-channel button live in the Moderation card under the
   chat (rendered by renderMutedWords, called from renderChat). All
   fail-closed; no-ops when the moderation card is absent. */
function chatGetMuted() {
  try {
    var a = JSON.parse(localStorage.getItem("haven_chat_muted") || "[]");
    if (!Array.isArray(a)) return [];
    return a.filter(function (x) { return typeof x === "string" && x.trim(); });
  } catch (e) { return []; }
}
function chatSaveMuted(a) {
  try { localStorage.setItem("haven_chat_muted", JSON.stringify(a)); } catch (e) {}
}
function chatMutedHit(text) {
  var words = chatGetMuted();
  if (!words.length) return null;
  var t = String(text || "").toLowerCase();
  for (var i = 0; i < words.length; i++) {
    var w = String(words[i]).toLowerCase().trim();
    if (w && t.indexOf(w) >= 0) return words[i];
  }
  return null;
}
function renderMutedWords() {
  var box = document.getElementById("muted-list");
  if (!box) return;
  var words = chatGetMuted();
  box.innerHTML = words.length ? words.map(function (w, i) {
    return '<span style="display:inline-flex;align-items:center;gap:6px;background:#2a3040;border:1px solid #444;border-radius:16px;padding:6px 6px 6px 12px;margin:0 6px 6px 0;font-size:13px;color:#fff;">' +
      escapeHtml(w) +
      '<button onclick="chatRemoveMuted(' + i + ')" aria-label="Remove muted word" style="background:none;border:none;color:#e74c3c;font-size:14px;cursor:pointer;padding:0 4px;">✕</button></span>';
  }).join("") : '<span style="color:#888;font-size:13px;">No muted words yet.</span>';
}
function chatAddMuted() {
  var inp = document.getElementById("muted-input");
  if (!inp) return;
  var w = inp.value.trim().slice(0, 40);
  if (!w) return;
  var a = chatGetMuted();
  var seen = a.map(function (x) { return String(x).toLowerCase(); });
  if (seen.indexOf(w.toLowerCase()) >= 0) { miniToast("Already muted"); inp.value = ""; return; }
  a.push(w);
  chatSaveMuted(a);
  inp.value = "";
  renderMutedWords();
  miniToast("Muted 🔇");
}
function chatRemoveMuted(i) {
  var a = chatGetMuted();
  if (i < 0 || i >= a.length) return;
  a.splice(i, 1);
  chatSaveMuted(a);
  renderMutedWords();
}
function chatClearChannel() {
  var meta = chatChanMeta(chatChan());
  if (!confirm("Clear all messages in #" + String(meta[2]).toLowerCase() + "?")) return;
  saveChat([]);
  renderChat();
  miniToast("Channel cleared 🧹");
}
