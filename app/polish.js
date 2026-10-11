/* Haven FW polish: keep the active bottom-nav tab centered when the bar scrolls */
"use strict";
(function () {
  const nav = document.querySelector("nav");
  if (!nav) return;
  const center = () => {
    const b = nav.querySelector("button.on");
    if (b && b.scrollIntoView) b.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  };
  new MutationObserver(center).observe(nav, { subtree: true, attributes: true, attributeFilter: ["class"] });
  setTimeout(center, 600);
})();

/* Haven FW polish v2: one-tap theme button in the header (Dark → Light → Auto), synced with Settings */
(function () {
  const t = window.havenTheme, info = document.getElementById("infoBtn");
  if (!t || !info || document.getElementById("themeBtn")) return;
  const ICON = { dark: "🌙", light: "☀️", auto: "📱" }, ORDER = ["dark", "light", "auto"], root = document.documentElement;
  const btn = document.createElement("button");
  btn.className = "iconbtn"; btn.id = "themeBtn";
  const sync = () => {
    const m = t.get(); btn.textContent = ICON[m] || ICON.dark; btn.setAttribute("aria-label", "Theme: " + m);
    document.querySelectorAll("[data-theme]").forEach(x => x.classList.toggle("on", x.dataset.theme === m));
  };
  const rawSet = t.set;
  t.set = v => { root.classList.add("theme-anim"); rawSet(v); sync(); setTimeout(() => root.classList.remove("theme-anim"), 450); };
  btn.addEventListener("click", () => t.set(ORDER[(ORDER.indexOf(t.get()) + 1) % ORDER.length]));
  info.parentNode.insertBefore(btn, info); sync();
})();

/* Haven FW polish v3: guided start questionnaire (language → accessibility → about you → review) */
(function () {
  if (typeof openStartQ !== "function" || typeof settings === "undefined") return;
  const X = {
    en: { n: "Step {n} of {t}", next: "Next", back: "Back", fin: "Finish", skip: "Skip — show everything", cancel: "Cancel",
      w1: "Welcome to Haven", w2: "Free help in Fort Wayne. Pick your language, then answer a few quick questions so Haven fits you. Nothing leaves your phone.",
      a1: "Make Haven easier to use", a2: "Tap any that help. You can change this later.",
      y1: "A little about you", y2: "Tap any that fit. Haven highlights help for you.",
      r1: "Your Haven", r2: "Check this looks right, then finish.",
      none: "Nothing selected, so Haven will show everything.", will: "Haven will", big: "Use larger text", tts: "Read aloud",
      hide: "Hide tabs: ", mark: "Highlight help for: ", later: "Change anytime: Settings → My situation",
      d: { eyes: "Turns on larger text", read: "Reads guides and places aloud", simple: "Larger text and fewer tabs", kids: "Family and children's help", vet: "Veteran services", senior: "Senior services", disab: "Accessible places and services", record: "Re-entry help, keeps Jobs tabs", newus: "Language and newcomer help", pets: "Pet-friendly help", work: "Keeps Jobs and Gigs tabs" },
      tab: { jobs: "Jobs", events: "Events", gigs: "Gigs", programs: "Programs", chat: "Chat" } },
    es: { n: "Paso {n} de {t}", next: "Siguiente", back: "Atrás", fin: "Terminar", skip: "Omitir — mostrar todo", cancel: "Cancelar",
      w1: "Bienvenido a Haven", w2: "Ayuda gratis en Fort Wayne. Elige tu idioma y responde unas preguntas para que Haven se adapte a ti. Nada sale de tu teléfono.",
      a1: "Haz Haven más fácil de usar", a2: "Toca lo que te ayude. Puedes cambiarlo después.",
      y1: "Un poco sobre ti", y2: "Toca lo que te aplique. Haven destaca ayuda para ti.",
      r1: "Tu Haven", r2: "Revisa que todo esté bien y termina.",
      none: "No elegiste nada, así que Haven mostrará todo.", will: "Haven va a", big: "Usar texto más grande", tts: "Leer en voz alta",
      hide: "Ocultar pestañas: ", mark: "Destacar ayuda para: ", later: "Cámbialo cuando quieras: Ajustes → Mi situación",
      d: { eyes: "Activa el texto más grande", read: "Lee guías y lugares en voz alta", simple: "Texto grande y menos pestañas", kids: "Ayuda para familias y niños", vet: "Servicios para veteranos", senior: "Servicios para mayores", disab: "Lugares y servicios accesibles", record: "Ayuda de reinserción, mantiene Empleos", newus: "Ayuda de idioma y para recién llegados", pets: "Ayuda con mascotas", work: "Mantiene Empleos y Trabajos" },
      tab: { jobs: "Empleos", events: "Eventos", gigs: "Trabajos", programs: "Programas", chat: "Chat" } }
  };
  const STEPS = ["lang", "access", "you", "review"], ACC = ["eyes", "read", "simple"],
    YOU = ["kids", "vet", "senior", "disab", "record", "newus", "pets", "work"];
  const x = k => (X[settings.lang] || X.en)[k];
  const E = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const split = k => { const m = qt(k).match(/^(\S+)\s+([\s\S]*)$/); return m ? [m[1], m[2]] : ["•", qt(k)]; };
  const hiddenTabs = a => {
    if (a.simple) return ["jobs", "events", "gigs", "programs", "chat"];
    if (!Object.values(a).some(Boolean)) return [];
    return a.work || a.record ? [] : ["jobs", "gigs"];
  };

  openStartQ = function (fromSettings) {
    let ov = document.getElementById("startQ");
    if (!ov) { ov = document.createElement("div"); ov.id = "startQ"; document.body.appendChild(ov); }
    ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
    const cur = Object.assign({}, (settings.profile && settings.profile.a) || {});
    const names = { en: "English", es: "Español", my: "မြန်မာ" };
    let i = 0, dir = 1;
    const finish = skip => {
      if (skip) { if (!fromSettings) settings.profile = { done: true, showAll: true, a: {} }; }
      else {
        settings.profile = { done: true, showAll: false, a: cur };
        if (cur.eyes || cur.simple) settings.largeText = true;
        if (cur.read) settings.tts = true;
      }
      saveSettings(); applySettings(); ov.remove(); renderList(); renderJobs();
      if (state.tab === "settings") renderSettings();
    };
    const opt = k => {
      const p = split(k);
      return `<button class="sqx-opt${cur[k] ? " on" : ""}" data-k="${k}" aria-pressed="${!!cur[k]}"><span class="sqx-ic">${E(p[0])}</span><span class="sqx-tx"><b>${E(p[1])}</b><small>${E(x("d")[k])}</small></span><span class="sqx-ck">✓</span></button>`;
    };
    const head = (a, b) => `<h2>${E(x(a))}</h2><p class="sq-sub">${E(x(b))}</p>`;
    const review = () => {
      const on = ACC.concat(YOU).filter(k => cur[k]);
      if (!on.length) return `<p class="sqx-none">${E(x("none"))}</p>`;
      const hid = hiddenTabs(cur), mk = YOU.filter(k => cur[k]), rows = [];
      if (cur.eyes || cur.simple) rows.push(["🔎", x("big")]);
      if (cur.read) rows.push(["🔊", x("tts")]);
      if (mk.length) rows.push(["⭐", x("mark") + mk.map(k => split(k)[1]).join(", ")]);
      if (hid.length) rows.push(["🙈", x("hide") + hid.map(id => x("tab")[id]).join(", ")]);
      return `<div class="sqx-chips">${on.map(k => `<span>${E(split(k)[0])} ${E(split(k)[1])}</span>`).join("")}</div>` +
        `<div class="sqx-sum"><h3>${E(x("will"))}</h3>${rows.map(r => `<div><i>${r[0]}</i><span>${E(r[1])}</span></div>`).join("")}</div>`;
    };
    const draw = () => {
      const total = STEPS.length, id = STEPS[i];
      const inner = id === "lang"
        ? head("w1", "w2") + `<div class="sqx-langs">${Object.keys(names).map(l => `<button class="sqx-lang${settings.lang === l ? " on" : ""}" data-l="${l}">${names[l]}</button>`).join("")}</div>`
        : id === "access" ? head("a1", "a2") + `<div class="sqx-list">${ACC.map(opt).join("")}</div>`
        : id === "you" ? head("y1", "y2") + `<div class="sqx-list">${YOU.map(opt).join("")}</div>`
        : head("r1", "r2") + review() + `<p class="sqx-later">${E(x("later"))}</p>`;
      ov.innerHTML = `<div class="sq-in sqx"><div class="sqx-top"><div class="sqx-bar"><i style="width:${((i + 1) / total) * 100}%"></i></div><span>${E(x("n").replace("{n}", i + 1).replace("{t}", total))}</span></div>` +
        `<div class="sqx-body ${dir > 0 ? "fwd" : dir < 0 ? "back" : ""}">${inner}</div>` +
        `<div class="sqx-nav">${i ? `<button class="sqx-back">${E(x("back"))}</button>` : ""}<button class="sqx-next">${E(x(i === total - 1 ? "fin" : "next"))}</button></div>` +
        `<button class="sq-skip">${E(fromSettings ? x("cancel") : x("skip"))}</button></div>`;
      ov.querySelectorAll("[data-l]").forEach(b => b.addEventListener("click", () => {
        settings.lang = b.dataset.l; saveSettings(); applySettings(); applyI18n();
        renderChips(); renderInfo(); renderList(); renderSaved(); dir = 0; draw();
      }));
      ov.querySelectorAll("[data-k]").forEach(b => b.addEventListener("click", () => {
        const on = !cur[b.dataset.k]; cur[b.dataset.k] = on;
        b.classList.toggle("on", on); b.setAttribute("aria-pressed", on);
        try { if (navigator.vibrate) navigator.vibrate(8); } catch (e) {}
      }));
      const bk = ov.querySelector(".sqx-back"); if (bk) bk.addEventListener("click", () => { i--; dir = -1; draw(); });
      ov.querySelector(".sqx-next").addEventListener("click", () => { if (i < total - 1) { i++; dir = 1; draw(); } else finish(false); });
      ov.querySelector(".sq-skip").addEventListener("click", () => finish(true));
      ov.scrollTop = 0;
    };
    draw();
  };
})();
