/* Haven FW web — Chat channels (ported from the app's community chat).
   The app has three channels: General / Ask for Help / Free Stuff.
   This module redeclares app.js's chat store/render/send as channel-aware
   (loaded after app.js, so these win). Messages stay local-only, one
   100-message store per channel. One-time migration moves the old
   single-thread 'haven_chat' store into #general. */
var CHAT_CHANNELS = [
  ["general", "💬", "General", "Say something kind…"],
  ["help", "🆘", "Ask for Help", "What do you need help with?"],
  ["freebies", "🎁", "Free Stuff", "Giving something away? Post it here…"]
];
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
    html += '<button class="chat-chip' + (x[0] === cur ? " on" : "") + '"' +
      ' onclick="setChatChan(\'' + x[0] + '\')">' + x[1] + " " + escapeHtml(x[2]) + "</button>";
  }
  box.innerHTML = html;
}
function renderChat() {
  renderChatChips();
  var inp = document.getElementById("chat-input");
  if (inp) inp.placeholder = chatChanMeta(chatChan())[3];
  var box = document.getElementById("chat-msgs");
  if (!box) return;
  var c = chatItems();
  box.innerHTML = c.map(function (m) {
    return '<div style="margin-bottom:10px;padding:8px 10px;background:#232a3d;border-radius:8px;">' +
      '<b style="color:#7c8aff;font-size:13px">' + escapeHtml(m.n) + "</b>" +
      '<span style="color:#666;font-size:11px;margin-left:6px">' + escapeHtml(m.t) + "</span>" +
      '<div style="color:#e0e0e0;word-wrap:break-word;margin-top:2px">' + escapeHtml(m.x) + "</div></div>";
  }).join("") || '<p style="color:#888">No messages yet — say hi. 👋</p>';
  box.scrollTop = box.scrollHeight;
}
function sendChat() {
  var inp = document.getElementById("chat-input");
  if (!inp) return;
  var v = inp.value.trim();
  if (!v) return;
  var c = chatItems();
  c.push({ n: chatName(), x: v.slice(0, 300), t: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) });
  saveChat(c.slice(-100));
  inp.value = "";
  renderChat();
  if (!(chatCrisisCheck(v) && chatCrisisAlert())) miniToast("Message sent 💬");
}
