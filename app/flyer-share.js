/* ---------- Flyer sharing ----------
   Tap a flyer -> bottom sheet: Share (any app) / Text / Email / Copy / Print.
   The recipient does NOT need Haven FW: the flyer goes out as plain text.
   If the native bridge has shareFlyer(html,title,text) (see the patch notes),
   it is used first so the flyer goes out as a picture (Bluetooth, Instagram,
   Snapchat, Messenger...). Loaded after app.js. */
"use strict";
(function () {
  Object.assign(STRINGS.en, {
    fshare_title: "Share this flyer", fshare_any: "Share…", fshare_any_s: "Messenger, Instagram, Snapchat, Bluetooth, email…",
    fshare_sms: "Text message", fshare_mail: "Email", fshare_copy: "Copy text", fshare_copy_s: "Paste anywhere",
    fshare_copied: "Copied — paste it anywhere", fshare_print: "Print", fshare_close: "Close",
    fshare_hint: "If nothing opened, tap Copy text and paste it.", fshare_from: "Shared from the Haven FW app"
  });
  Object.assign(STRINGS.es, {
    fshare_title: "Compartir este volante", fshare_any: "Compartir…", fshare_any_s: "Messenger, Instagram, Snapchat, Bluetooth, correo…",
    fshare_sms: "Mensaje de texto", fshare_mail: "Correo", fshare_copy: "Copiar texto", fshare_copy_s: "Pégalo donde quieras",
    fshare_copied: "Copiado — pégalo donde quieras", fshare_print: "Imprimir", fshare_close: "Cerrar",
    fshare_hint: "Si no se abrió nada, toca Copiar texto y pégalo.", fshare_from: "Compartido desde la app Haven FW"
  });

  const BLOCK = { DIV: 1, P: 1, H1: 1, H2: 1, H3: 1, UL: 1, OL: 1, LI: 1, BR: 1, TABLE: 1, TR: 1 };

  /* Flyer HTML -> tidy plain text */
  function flyerText(id, compact) {
    const doc = new DOMParser().parseFromString(buildFlyerHTML(id), "text/html");
    doc.querySelectorAll("style,script").forEach(n => n.remove());
    let out = "";
    const nl = (n) => { out = out.replace(/[ \t]+$/, ""); if (!out) return; const have = out.match(/\n*$/)[0].length; out += "\n".repeat(Math.max(0, n - have)); };
    (function walk(node) {
      node.childNodes.forEach(c => {
        if (c.nodeType === 3) { const s = c.nodeValue.replace(/\s+/g, " "); if (s.trim() || (out && !out.endsWith("\n") && !out.endsWith(" "))) out += s; return; }
        if (c.nodeType !== 1) return;
        const cls = c.className || "", par = c.parentNode, pcls = (par && par.className) || "";
        if (compact && /\bds\b/.test(cls)) return;
        if (c.tagName === "BR" && par && par.parentNode && /\bhl\b/.test(par.parentNode.className || "")) { out += " — "; return; }
        const inl = (c.tagName === "DIV" && (/\bhli\b/.test(cls) || /\bhl\b/.test(pcls)));
        const isB = (BLOCK[c.tagName] && !inl) || (c.tagName === "SPAN" && /\b(fine|rmfoot)\b/.test(pcls));
        if (c.tagName === "H2" || /\b(rsech)\b/.test(cls)) nl(2); else if (isB) nl(1);
        if (c.tagName === "LI") out += "• ";
        walk(c);
        if (/\bhli\b/.test(cls)) out += " ";
        if (/\b(card|rsec|hl)\b/.test(cls) || c.tagName === "H1") nl(2); else if (isB) nl(1);
      });
    })(doc.body);
    out = out.replace(/\u00a0/g, " ").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    const link = (typeof SHARE_URL !== "undefined") ? SHARE_URL : "";
    return out + "\n\n" + t("fshare_from") + (link ? ": " + link : "");
  }

  function flyerName(id) {
    const f = (typeof FLYERS !== "undefined" && FLYERS.find(x => x.id === id));
    if (f) return f.icon + " " + t("fly_" + id);
    const rf = (typeof RESCUE_FLYERS !== "undefined" && RESCUE_FLYERS.find(x => x.id === id));
    return rf ? rf.icon + " " + t(rf.titleKey) : "Haven FW";
  }

  /* Launch an external-app URL from an iframe so a scheme the app can't
     handle fails quietly instead of replacing the whole page. */
  function launch(url) {
    const f = document.createElement("iframe");
    f.style.cssText = "display:none;width:0;height:0;border:0";
    f.src = url;
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 2500);
  }

  /* The app's WebView can't open mailto: links (it shows an error page and
     breaks the app), so email goes out through an Android intent instead. */
  window.havenMail = function (subject, body) {
    launch("intent://share#Intent;action=android.intent.action.SEND;type=message/rfc822;" +
      "S.android.intent.extra.SUBJECT=" + encodeURIComponent(subject || "") + ";" +
      "S.android.intent.extra.TEXT=" + encodeURIComponent(body || "") + ";end");
    setTimeout(() => toast(t("fshare_hint")), 1800);
  };

  function copyText(txt) {
    const ok = () => toast(t("fshare_copied"));
    const old = () => {
      const ta = document.createElement("textarea");
      ta.value = txt; ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.appendChild(ta); ta.focus(); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) {}
      ta.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, old); else old();
  }

  function shareAny(id, title, txt) {
    const b = window.HavenBridge;
    try { if (b && typeof b.shareFlyer === "function") { b.shareFlyer(buildFlyerHTML(id), title, txt); return; } } catch (e) {}
    if (navigator.share) { navigator.share({ title: title, text: txt }).catch(() => {}); return; }
    launch("intent://share#Intent;action=android.intent.action.SEND;type=text/plain;" +
      "S.android.intent.extra.SUBJECT=" + encodeURIComponent(title) + ";" +
      "S.android.intent.extra.TEXT=" + encodeURIComponent(txt) + ";end");
    setTimeout(() => toast(t("fshare_hint")), 1800);
  }

  function injectCss() {
    if (document.getElementById("fshareCss")) return;
    const s = document.createElement("style"); s.id = "fshareCss";
    s.textContent =
      "#fshare{position:fixed;inset:0;z-index:998;background:rgba(0,0,0,.55);display:flex;align-items:flex-end}" +
      "#fshare .fs-sheet{width:100%;max-height:85%;overflow:auto;background:var(--card,#141b2e);color:var(--txt,#f2f5fb);" +
      "border-radius:18px 18px 0 0;padding:14px 14px calc(14px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--line,#26304a)}" +
      "#fshare .fs-h{font-weight:800;font-size:16px;margin:2px 4px 10px}" +
      "#fshare .fs-btn{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:13px 12px;margin-bottom:8px;" +
      "border-radius:12px;border:1px solid var(--line,#26304a);background:var(--card2,#1a2338);color:inherit;font-size:15px;font-weight:700}" +
      "#fshare .fs-btn small{display:block;font-weight:500;font-size:12px;color:var(--mut,#9aa4bb);margin-top:2px}" +
      "#fshare .fs-btn .fi{font-size:22px}" +
      "#fshare .fs-pri{background:var(--grad,linear-gradient(135deg,#6ea8ff,#8a7bff));color:#0a0e17;border:0}" +
      "#fshare .fs-pri small{color:rgba(10,14,23,.75)}" +
      "#fshare .fs-x{justify-content:center;background:transparent;margin:4px 0 0}";
    document.head.appendChild(s);
  }

  window.openFlyerSheet = function (id) {
    injectCss();
    const old = document.getElementById("fshare"); if (old) old.remove();
    const title = flyerName(id) + " · Haven FW";
    let txt = "";
    try { txt = flyerText(id); } catch (e) { txt = title; }
    const ov = document.createElement("div"); ov.id = "fshare";
    const row = (cls, ic, name, sub, act) =>
      '<button class="fs-btn ' + cls + '" data-act="' + act + '"><span class="fi">' + ic + '</span><span>' +
      fesc(name) + (sub ? "<small>" + fesc(sub) + "</small>" : "") + "</span></button>";
    ov.innerHTML = '<div class="fs-sheet"><div class="fs-h">' + fesc(flyerName(id)) + " — " + fesc(t("fshare_title")) + "</div>" +
      row("fs-pri", "📤", t("fshare_any"), t("fshare_any_s"), "any") +
      row("", "💬", t("fshare_sms"), "", "sms") +
      row("", "✉️", t("fshare_mail"), "", "mail") +
      row("", "📋", t("fshare_copy"), t("fshare_copy_s"), "copy") +
      row("", "🖨️", t("fshare_print"), "", "print") +
      row("fs-x", "", t("fshare_close"), "", "close") + "</div>";
    document.body.appendChild(ov);
    const close = () => ov.remove();
    ov.addEventListener("click", e => {
      if (e.target === ov) return close();
      const b = e.target.closest("[data-act]"); if (!b) return;
      const a = b.getAttribute("data-act");
      if (a === "close") close();
      else if (a === "any") shareAny(id, title, txt);
      else if (a === "sms") window.location.href = "sms:?body=" + encodeURIComponent(flyerText(id, true));
      else if (a === "mail") window.havenMail(title, txt);
      else if (a === "copy") copyText(txt);
      else if (a === "print") { close(); printFlyerId(id); }
    });
  };
})();
