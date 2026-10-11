/* Haven safety + polish: chat block/report, accessibility labels, data-freshness note. */
(function () {
  var KEY = "haven_chat_blocked";
  function blocked() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function block(id) { var b = blocked(); if (id && b.indexOf(id) < 0) { b.push(id); try { localStorage.setItem(KEY, JSON.stringify(b)); } catch (e) {} } }
  function es() { return typeof settings !== "undefined" && settings.lang === "es"; }
  function say(en, sp) { return es() ? sp : en; }

  var _bind = window.chatMsgBindLongPress;
  if (typeof _bind === "function") window.chatMsgBindLongPress = function (div, m, mine, p) {
    if (!mine && m && m.device_id && blocked().indexOf(m.device_id) >= 0) div.style.display = "none";
    return _bind.apply(this, arguments);
  };

  var _menu = window.chatMsgMenu;
  if (typeof _menu === "function") window.chatMsgMenu = function (m, mine, p, div) {
    _menu.apply(this, arguments);
    if (mine || !m) return;
    var body = document.getElementById("msgSheetBody"); if (!body) return;
    var cancel = body.querySelector(".cancel");
    function add(label, cls, fn) {
      var b = document.createElement("button"); b.className = "mbtn " + cls; b.textContent = label; b.addEventListener("click", fn);
      body.insertBefore(b, cancel || null);
    }
    add("🚫 " + say("Block this user", "Bloquear a este usuario"), "danger", function () {
      block(m.device_id); if (div) div.style.display = "none"; chatMsgHide(); toast(say("User blocked. You won't see their messages.", "Usuario bloqueado."));
    });
    add("⚠️ " + say("Report this message", "Reportar este mensaje"), "danger", async function () {
      var ok = false;
      try {
        var r = await chatApi("chat_reports", { method: "POST", headers: { apikey: CHAT_KEY, Authorization: "Bearer " + CHAT_KEY, "Content-Type": "application/json", Prefer: "return=minimal" },
          body: JSON.stringify({ message_id: m.id, reported_device: m.device_id, reporter_device: chat.deviceId, text: (p && p.text) || "" }) });
        ok = r.ok;
      } catch (e) {}
      if (div) div.style.display = "none"; chatMsgHide();
      toast(ok ? say("Reported. Thank you.", "Reportado. Gracias.") : say("Hidden for you. Report couldn't be sent right now.", "Oculto para ti. No se pudo enviar el reporte."));
    });
  };

  function a11y() {
    document.querySelectorAll("nav button[data-tab]").forEach(function (b) {
      var s = b.querySelector("[data-i18n]"); if (s) b.setAttribute("aria-label", s.textContent.trim());
      b.setAttribute("aria-current", b.classList.contains("on") ? "page" : "false");
    });
    document.querySelectorAll("img:not([alt])").forEach(function (i) { i.setAttribute("alt", ""); });
    document.querySelectorAll("input:not([aria-label]),textarea:not([aria-label])").forEach(function (i) { if (i.placeholder) i.setAttribute("aria-label", i.placeholder); });
    document.querySelectorAll("button:not([aria-label])").forEach(function (b) { if (!b.textContent.trim() && b.title) b.setAttribute("aria-label", b.title); });
  }
  function note() {
    var sc = document.querySelector("#tab-info .scroll"); if (!sc || document.getElementById("hvFresh")) return;
    var d = document.createElement("p"); d.id = "hvFresh"; d.className = "tip"; d.style.margin = "12px 0";
    d.textContent = say("Listings last updated Oct 3, 2026. Hours and services change, so call before you go. Tap ⚠️ on a place to report a problem.", "Listados actualizados el 3 de oct. de 2026. Los horarios cambian; llama antes de ir. Toca ⚠️ en un lugar para reportar un problema.");
    sc.appendChild(d);
  }
  function run() { try { a11y(); note(); } catch (e) {} }
  document.addEventListener("click", function () { setTimeout(run, 120); });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  setTimeout(run, 800);
})();
