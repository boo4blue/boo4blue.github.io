/* === flyers.js === */
/* ---------- printable flyers (11 designs, print-optimized) ----------
   Loaded after data.js + i18n.js, before app.js. Pure builder functions so
   they can be unit-tested in node; DOM is only touched on click/render. */
const FLYERS = [
  { id: "general",  icon: "🆘", color: "#dc2626", special: "general" },
  { id: "shelters", icon: "🏠", color: "#ea7a3c", cats: ["shelter"], max: 14 },
  { id: "food",     icon: "🍲", color: "#d97706", cats: ["food", "meals"], max: 14 },
  { id: "clinics",  icon: "🩺", color: "#0284c7", cats: ["health"], max: 14 },
  { id: "showers",  icon: "🚿", color: "#7c3aed", cats: ["day", "laundry"], max: 14 },
  { id: "transit",  icon: "🚌", color: "#0891b2", cats: ["bus"], max: 14 },
  { id: "wifi",     icon: "📶", color: "#0369a1", cats: ["wifi", "charge"], max: 14 },
  { id: "narcan",   icon: "💉", color: "#db2777", cats: ["narcan"], max: 14 },
  { id: "recovery", icon: "🧠", color: "#6d28d9", cats: ["recovery", "mental"], max: 14 },
  { id: "youth",    icon: "🧑‍🎓", color: "#e11d48", cats: ["youth"], max: 14 },
  { id: "benefits", icon: "💰", color: "#15803d", cats: ["benefits", "cash"], max: 14 },
];

function fesc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function flyerTitle(f) { return t("fly_" + f.id); }

const FLY_DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function flyTime(m) {
  let h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? "p" : "a";
  h = h % 12 || 12;
  return h + (mm ? ":" + String(mm).padStart(2, "0") : "") + ap;
}
/* Compact one-line hours, e.g. "Mo–Fr 8a–5p · Sa 10a–2p" */
function flyerHours(r) {
  if (r.hours) {
    const days = [];
    for (let d = 0; d < 7; d++) if (r.hours[d]) days.push({ d, s: r.hours[d][0], e: r.hours[d][1] });
    if (!days.length) return "";
    const groups = []; let cur = [days[0]];
    for (let i = 1; i < days.length; i++) {
      const p = days[i - 1], c = days[i];
      if (c.d === p.d + 1 && c.s === p.s && c.e === p.e) cur.push(c);
      else { groups.push(cur); cur = [c]; }
    }
    groups.push(cur);
    return groups.map(g => {
      const dl = g.length > 2 ? FLY_DOW[g[0].d] + "–" + FLY_DOW[g[g.length - 1].d]
                              : g.map(x => FLY_DOW[x.d]).join(",");
      return dl + " " + flyTime(g[0].s) + "–" + flyTime(g[0].e);
    }).join(" · ");
  }
  return r.hoursText || "";
}

function flyerCard(r) {
  const hrs = flyerHours(r);
  return '<div class="card"><div class="nm">' + fesc(r.name) + "</div>" +
    '<div class="meta">' + fesc(r.addr || "") +
    (r.addr && r.zip ? ", " + fesc(r.zip) : "") +
    (r.phone ? ' · <b class="ph">' + fesc(r.phone) + "</b>" : "") + "</div>" +
    (hrs ? '<div class="hrs">⏰ ' + fesc(hrs) + "</div>" : "") +
    (r.desc ? '<div class="ds">' + fesc(r.desc) + "</div>" : "") + "</div>";
}

function flyerSection(icon, title, cats, max) {
  const list = RESOURCES.filter(r => r.cats.some(c => cats.indexOf(c) !== -1)).slice(0, max);
  if (!list.length) return "";
  return '<h2><span class="h2i">' + icon + "</span> " + fesc(title) + "</h2>" +
    '<div class="cols">' + list.map(flyerCard).join("") + "</div>";
}

/* ---------- Rescue Mission flyers (10, verified facts only) ----------
   Static informational flyers for hanging up INSIDE the Fort Wayne Rescue
   Mission — rules, programs, services. All content researched 2026-09-27
   from fwrm.org, the Mission's own filings, and local news. Nothing invented:
   items that vary are labeled "ask staff". Body copy is English (wall
   audience); titles are localized. */
const RM_NAVY = "#1f3a5f", RM_GOLD = "#c9a227";

const RESCUE_FLYERS = [
{ id: "rm-welcome", icon: "🏠", color: RM_NAVY, titleKey: "flyrm_welcome",
  intro: "Serving Fort Wayne since 1903 — a home for the homeless, food for the hungry, and hope for the future.",
  sections: [
    { h: "📍 Where to go", items: [
      "The Rescue Mission — 404 E Washington Blvd, Fort Wayne, IN 46802",
      "Charis House (women & children) — 5920 Decatur Rd, Fort Wayne, IN 46816",
      "Treasure House thrift store — 10202 Coldwater Rd, Fort Wayne",
      "Main phone: (260) 426-7357" ] },
    { h: "🕐 Need help now?", items: [
      "Life House (men's emergency shelter) — staff on-site 24/7",
      "Charis House (women & children) — staff on-site 24/7",
      "Community meals served to the public 365 days a year",
      "Call (260) 426-7357 or stop by the front desk — staff will point you right" ] },
    { h: "🤝 Who it's for", items: [
      "Men, women, and children experiencing a homeless crisis",
      "Serving Fort Wayne, Allen County, and 9 surrounding counties",
      "Faith-based nonprofit — privately funded, takes no government money",
      "Mission: to provide, through the power of Jesus Christ, a home for the homeless, food for the hungry, and hope for their future" ] }
  ] },
{ id: "rm-meals", icon: "🍲", color: "#b45309", titleKey: "flyrm_meals",
  intro: "Three free meals a day, every day of the year — open to everyone, not just residents.",
  sections: [
    { h: "⏰ Meal times (daily, 404 E Washington Blvd)", items: [
      "Men — Breakfast 6:30–7:30 AM",
      "Men — Lunch 11:30 AM–12:30 PM",
      "Men — Dinner 4:30–5:30 PM",
      "Women & children — Breakfast 6:30–8:00 AM",
      "Women & children — Lunch 12:00–1:00 PM",
      "Women & children — Dinner 5:00–6:00 PM" ] },
    { h: "ℹ️ Good to know", items: [
      "You do NOT have to be a resident to eat — the Community Meals program is for anyone in need",
      "Meals are served 365 days a year — holiday meals may replace normal hours",
      "The Mission serves hundreds of thousands of meals a year to residents and the public",
      "Each year the Mission hosts big free holiday meals — watch the bulletin board for dates" ] }
  ] },
{ id: "rm-lifehouse", icon: "🌙", color: "#334155", titleKey: "flyrm_lifehouse",
  intro: "Immediate emergency shelter for men 18+ — plus the community meals program.",
  sections: [
    { h: "🛏️ Emergency shelter", items: [
      "200 beds for men — up to 30 days of emergency housing",
      "For men 18 years and older in need of immediate housing",
      "Cot check-in 7:30 PM (men 18+) — arrive on time",
      "After 10 PM there is no in-and-out — if you leave, you leave for the night",
      "First come, first served — call (260) 426-7357 to check availability" ] },
    { h: "🎒 What you get", items: [
      "A safe bed for the night, plus food",
      "Personal toiletry items and clothing",
      "Life coaches — help planning your next steps",
      "Referrals to other services and support" ] },
    { h: "⛪ Daily rhythm", items: [
      "Devotionals 10:00–11:00 daily — ask staff for the current schedule",
      "Basic needs, spiritual support, and referrals at no cost",
      "Staying longer? Ask about the residential programs when you're ready" ] }
  ] },
{ id: "rm-charis", icon: "👩‍👧", color: "#9d2c5a", titleKey: "flyrm_charis",
  intro: "Short- and long-term residential programs for women and children in a homeless crisis — 50 residential beds.",
  sections: [
    { h: "📍 Charis House", items: [
      "5920 Decatur Rd, Fort Wayne, IN 46816 (new building, opened 2024)",
      "Phone: (260) 426-8123 — call to ask about intake",
      "30+ emergency beds for women — up to 30 days" ] },
    { h: "📅 The programs", items: [
      "Short-term residential: 3–6 months",
      "Long-term transformational: up to 2 years",
      "For women 18+ and their children in a homeless crisis" ] },
    { h: "⛪ Daily rhythm", items: [
      "Devotionals 8:30 AM Mon–Thu, 10:00 AM Friday",
      "Ask staff for the current intake process and office hours" ] },
    { h: "💜 Services inside", items: [
      "Case management, life-skills training, parenting classes, support groups",
      "Art therapy and activities for children",
      "On-site mental health clinic (Alliance Health Centers, opened Oct 2025): counseling + psychiatry for residents — any insurance, or none" ] }
  ] },
{ id: "rm-restoration", icon: "💪", color: "#166534", titleKey: "flyrm_restoration",
  intro: "Short- and long-term residential programs for men — tackling the root causes, not just the symptoms.",
  sections: [
    { h: "🎯 What it is", items: [
      "122 beds across short- and long-term residential programs for men",
      "Short-term: 3–6 months • Fresh Start: 6–9 months • Long-term: up to 1 year",
      "Goes beyond food and shelter: intensive help with addiction, mental health, trauma, and unemployment" ] },
    { h: "📚 What's included", items: [
      "Safe housing and daily meals",
      "Case management and spiritual support",
      "Devotionals 10:00–11:00 AM daily",
      "Help building a plan toward stable housing and work" ] },
    { h: "🚪 How to start", items: [
      "Call (260) 426-7357 and ask about Restoration House",
      "Complete an intake interview to see if you qualify and a bed is open",
      "Be ready to commit to change — the program asks for real commitment" ] }
  ] },
{ id: "rm-rules", icon: "📋", color: "#7c2d12", titleKey: "flyrm_rules",
  intro: "The basics everyone should know — the full current rules list is posted at the Mission and given at intake. Staff have the final word.",
  sections: [
    { h: "⏰ Times to know", items: [
      "Meals daily: men 6:30–7:30a / 11:30a–12:30p / 4:30–5:30p — women & children 6:30–8a / 12–1p / 5–6p",
      "Devotionals 10:00–11:00 daily (men's); women 8:30a Mon–Thu, 10a Fri",
      "Emergency shelter: up to 30 days; men 18+" ] },
    { h: "🤝 Community living", items: [
      "Treat everyone with respect — residents, staff, volunteers, and neighbors",
      "After 10 PM there is no in-and-out — if you leave, you leave for the night",
      "The posted rules can change — read the rules sheet at intake and ask staff when unsure",
      "Night shelter check-in 7:30 PM daily — confirm at the desk each day" ] },
    { h: "❄️ Winter emergency beds", items: [
      "Extra bed nights are offered in the coldest months",
      "Must be 18+, arrive sober, and have no active warrants",
      "Ask staff about current winter availability" ] }
  ] },
{ id: "rm-day", icon: "☀️", color: "#0369a1", titleKey: "flyrm_day",
  intro: "What a typical day looks like — so you always know what's next.",
  sections: [
    { h: "⏰ Daily rhythm (404 E Washington Blvd)", items: [
      "6:30 AM — Breakfast begins (men 6:30–7:30 / women & children 6:30–8:00)",
      "10:00 AM — Devotionals (until 11:00)",
      "11:30 AM — Lunch begins (men 11:30–12:30 / women & children 12:00–1:00)",
      "4:30 PM — Dinner begins (men 4:30–5:30 / women & children 5:00–6:00)",
      "7:30 PM — Cot check-in (men 18+)" ] },
    { h: "ℹ️ Good to know", items: [
      "Staff are on-site 24/7 — knock any time in an emergency",
      "Meals are free and open to everyone, every single day of the year",
      "Need a case manager, a referral, or help with next steps? Ask at the front desk",
      "Treasure House thrift store (10202 Coldwater Rd) — open Mon–Sat 10a–6p" ] }
  ] },
{ id: "rm-learning", icon: "📚", color: "#6d28d9", titleKey: "flyrm_learning",
  intro: "Free education for residents — build the skills that get you hired. (Ask staff to confirm current class details.)",
  sections: [
    { h: "🎓 What you can learn", items: [
      "Reading, writing, grammar, and math — at your own level",
      "Skills development for the workplace",
      "Employment training to help you get and keep a job" ] },
    { h: "ℹ️ Good to know", items: [
      "The Learning Center has served Mission residents since 1993",
      "Classes are part of the residential programs — ask your case manager how to enroll",
      "No cost to residents" ] }
  ] },
{ id: "rm-foundation", icon: "🏛️", color: "#854d0e", titleKey: "flyrm_foundation",
  intro: "What 'the Foundation' actually is — it's not a resident program, it's what keeps the Mission running.",
  sections: [
    { h: "🏛️ The Foundation", items: [
      "Full name: Fort Wayne Rescue Mission Ministries Foundation, Inc.",
      "Its job: raise and manage the donations that fund the Mission",
      "Established in the 1990s to make sure the homeless and hungry in Fort Wayne will ALWAYS have a place to go" ] },
    { h: "💰 Privately funded", items: [
      "The Mission takes NO government money — it runs entirely on donations",
      "That's why Treasure House thrift store proceeds go straight to Mission programs",
      "Every donated dollar stays local, serving Fort Wayne and the surrounding counties" ] },
    { h: "📞 Corporate office", items: [
      "404 E Washington Blvd, Fort Wayne, IN 46802",
      "Phone: (260) 426-7357 (planned giving: ask for Laurie Brumbaugh, ext. 164)",
      "President & CEO: Pastor Thomas McArthur",
      "Learn more or give: fwrm.org" ] }
  ] },
{ id: "rm-help", icon: "🤝", color: "#0e7490", titleKey: "flyrm_help",
  intro: "For the community board — here's how neighbors can pitch in.",
  sections: [
    { h: "🛍️ Treasure House thrift store", items: [
      "10202 Coldwater Rd, Fort Wayne — (260) 456-9200",
      "Store open Mon–Sat, 10a–6p — shop, donate goods, or volunteer",
      "Donation center: Wed–Fri 10a–4p, Sat 10a–1p",
      "ALL proceeds help fund the Mission's programs" ] },
    { h: "🙋 Volunteer", items: [
      "Serve meals, work the front desk, sort donations, stock thrift shelves",
      "Build real relationships with residents",
      "Sign up at fwrm.org" ] },
    { h: "🍗 Holiday meals", items: [
      "Each year the Mission serves thousands of free holiday meals to the community",
      "Holiday meals may replace the normal daily hours — watch fwrm.org for details",
      "Volunteers make it happen — watch fwrm.org for sign-ups" ] },
    { h: "💜 Why it matters", items: [
      "4.7 stars from 90+ community reviews — neighbors trust this place",
      "100% privately funded: every gift keeps beds open and meals served" ] }
  ] }
];

function buildRescueFlyer(rf) {
  const date = new Date().toLocaleDateString();
  const secs = rf.sections.map(s =>
    '<div class="rsec"><div class="rsech">' + fesc(s.h) + "</div><ul class=\"rslist\">" +
    s.items.map(it => "<li>" + fesc(it) + "</li>").join("") + "</ul></div>").join("");
  return "<!DOCTYPE html><html><head><meta charset=\"utf-8\">" +
    "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style>" +
    "@page{margin:11mm}*{box-sizing:border-box}" +
    "body{font-family:Arial,Helvetica,sans-serif;color:#181818;margin:0;padding:0}" +
    ".rmbanner{background:" + rf.color + ";color:#fff;border-radius:14px;padding:22px 26px;" +
    "border-bottom:8px solid " + RM_GOLD + "}" +
    ".rmkicker{font-size:12px;letter-spacing:3px;opacity:.85;font-weight:700}" +
    ".rmtitle{margin:8px 0 6px;font-size:34px}" +
    ".rmsub{font-size:15px;opacity:.93;line-height:1.45;max-width:640px}" +
    ".rmstrip{background:#fef9e7;border:2px solid " + RM_GOLD + ";border-radius:10px;" +
    "padding:10px 14px;margin:14px 0;font-size:15px;font-weight:600}" +
    ".rsec{margin:0 0 16px;break-inside:avoid}" +
    ".rsech{font-size:19px;font-weight:800;margin-bottom:6px;padding-bottom:4px;" +
    "border-bottom:3px solid " + rf.color + "}" +
    ".rslist{margin:0;padding-left:22px;font-size:14.5px;line-height:1.55}" +
    ".rslist li{margin-bottom:3px}" +
    ".rmfoot{margin-top:18px;padding-top:10px;border-top:1px solid #e5e7eb;" +
    "color:#6b7280;font-size:12.5px;display:flex;justify-content:space-between}" +
    "@media print{.rmbanner{-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
    ".rmstrip{-webkit-print-color-adjust:exact;print-color-adjust:exact}}" +
    "</style></head><body>" +
    '<div class="rmbanner"><div class="rmkicker">⛪ FORT WAYNE RESCUE MISSION • EST. 1903</div>' +
    '<div class="rmtitle">' + rf.icon + " " + fesc(t(rf.titleKey)) + "</div>" +
    '<div class="rmsub">' + fesc(rf.intro) + "</div></div>" +
    '<div class="rmstrip">📞 (260) 426-7357 &nbsp;•&nbsp; 404 E Washington Blvd, Fort Wayne &nbsp;•&nbsp; fwrm.org</div>' +
    secs +
    '<div class="rmfoot"><span>💜 ' + fesc(t("fly_confirm")) + "</span>" +
    "<span>" + fesc(t("fly_printed")) + ": " + fesc(date) + "</span></div>" +
    "</body></html>";
}

function buildFlyerHTML(fid) {
  if (typeof RESCUE_FLYERS !== "undefined") {
    const rf = RESCUE_FLYERS.find(x => x.id === fid);
    if (rf) return buildRescueFlyer(rf);
  }
  const f = FLYERS.find(x => x.id === fid) || FLYERS[0];
  const date = new Date().toLocaleDateString();
  const emerg = '<div class="emerg">📞 <b>211</b> — ' + fesc(t("fly_emerg211")) +
    ' &nbsp;·&nbsp; 💛 <b>988</b> — ' + fesc(t("fly_emerg988")) + "</div>";
  let body = "";
  if (f.id === "general") {
    body += '<div class="hlsec">' + HOTLINES.slice(0, 4).map(h => {
      const num = h.href.indexOf("tel:") === 0 ? h.href.slice(4)
        : h.href.indexOf("sms:") === 0 ? h.href.slice(4).split("?")[0] : "";
      return '<div class="hl"><div class="hli">' + h.icon + '</div><div><b>' + fesc(h.name) +
        '</b><br><span class="hln">' + fesc(num || h.desc) + "</span></div></div>";
    }).join("") + "</div>";
    body += flyerSection("🏠", t("fly_shelters"), ["shelter"], 5);
    body += flyerSection("🍲", t("fly_food"), ["food", "meals"], 6);
    body += flyerSection("🩺", t("fly_clinics"), ["health"], 4);
  } else {
    body += flyerSection(f.icon, flyerTitle(f), f.cats, f.max);
  }
  return "<!DOCTYPE html><html><head><meta charset=\"utf-8\">" +
    "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style>" +
    "@page{margin:11mm}*{box-sizing:border-box}" +
    "body{font-family:Arial,Helvetica,sans-serif;color:#181818;margin:0;padding:0}" +
    ".banner{background:" + f.color + ";color:#fff;border-radius:14px;padding:20px 24px;margin-bottom:14px}" +
    ".banner h1{margin:0;font-size:32px;letter-spacing:.5px}" +
    ".banner .tag{margin-top:4px;font-size:14px;opacity:.92}" +
    ".emerg{background:#fef3c7;border:2px solid #f59e0b;border-radius:10px;" +
    "padding:10px 14px;margin-bottom:14px;font-size:16px}" +
    ".hlsec{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:6px}" +
    ".hl{flex:1 1 44%;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;" +
    "padding:10px 12px;display:flex;gap:10px;align-items:center}" +
    ".hli{font-size:26px}.hln{font-size:19px;font-weight:700}" +
    "h2{font-size:20px;margin:20px 0 10px;padding-bottom:6px;border-bottom:3px solid " + f.color + "}" +
    ".h2i{margin-right:4px}" +
    ".cols{column-count:2;column-gap:14px}" +
    ".card{break-inside:avoid;border:1px solid #e5e7eb;border-top:4px solid " + f.color + ";" +
    "border-radius:10px;padding:10px 12px;margin:0 0 12px;background:#fff}" +
    ".nm{font-size:15px;font-weight:700}" +
    ".meta{font-size:12.5px;color:#4b5563;margin-top:2px}.ph{color:#111}" +
    ".hrs{display:inline-block;background:#eef2ff;color:#3730a3;font-size:12px;font-weight:600;" +
    "padding:2px 9px;border-radius:20px;margin-top:6px}" +
    ".ds{font-size:12px;color:#6b7280;margin-top:5px;line-height:1.35}" +
    ".fine{margin-top:20px;padding-top:10px;border-top:1px solid #e5e7eb;" +
    "color:#6b7280;font-size:12px;display:flex;justify-content:space-between}" +
    "@media print{.banner{-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
    ".emerg{-webkit-print-color-adjust:exact;print-color-adjust:exact}" +
    ".hrs{-webkit-print-color-adjust:exact;print-color-adjust:exact}}" +
    "</style></head><body>" +
    '<div class="banner"><h1>' + f.icon + " " + fesc(flyerTitle(f)) + "</h1>" +
    '<div class="tag">Haven FW · ' + fesc(t("fly_tagline")) + "</div></div>" +
    emerg + body +
    '<div class="fine"><span>💜 ' + fesc(t("fly_confirm")) + "</span>" +
    "<span>" + fesc(t("fly_printed")) + ": " + fesc(date) + "</span></div>" +
    "</body></html>";
}

function printFlyerId(id) {
  const html = buildFlyerHTML(id);
  try {
    if (typeof window !== "undefined" && window.HavenBridge && HavenBridge.printFlyer) {
      HavenBridge.printFlyer(html);
      return true;
    }
  } catch (e) {}
  if (typeof toast === "function") toast(t("fly_noprint"));
  return false;
}

/* Help-tab grid of flyer buttons: resource flyers + Rescue Mission flyers */
function rmTitle(rf) { return t(rf.titleKey); }

function renderFlyerList() {
  const el = typeof document !== "undefined" ? document.getElementById("flyerGrid") : null;
  if (!el) return;
  const btn = (id, icon, color, name) =>
    '<button class="flycard" data-fly="' + id + '" style="--fc:' + color + '">' +
    '<span class="femo">' + icon + '</span>' +
    '<span class="fname">' + fesc(name) + '</span>' +
    '<span class="fgo">📤</span></button>';
  el.innerHTML =
    FLYERS.map(f => btn(f.id, f.icon, f.color, flyerTitle(f))).join("") +
    (typeof RESCUE_FLYERS !== "undefined" && RESCUE_FLYERS.length ?
      '<div class="flyer-grouphead">' + fesc(t("fly_rmhead")) + "</div>" +
      RESCUE_FLYERS.map(rf => btn(rf.id, rf.icon, rf.color, rmTitle(rf))).join("") : "");
  el.querySelectorAll("[data-fly]").forEach(b =>
    b.addEventListener("click", () => {
      const id = b.getAttribute("data-fly");
      if (typeof openFlyerSheet === "function") openFlyerSheet(id); else printFlyerId(id);
    }));
}




/* === extras.js === */
/* Haven FW extras: added guides + hotlines (general info; confirm details by phone) */
"use strict";
(function () {
  if (typeof HOTLINES !== "undefined") {
    HOTLINES.push(
      { name: "Veterans Crisis Line", desc: "24/7 for veterans — call 988 then press 1", href: "tel:+18002738255", icon: "🎖️", crisis: true },
      { name: "Homeless Veterans Hotline", desc: "VA help with housing and services for veterans", href: "tel:+18774243838", icon: "🏠" },
      { name: "Indiana Quitline", desc: "Free coaching to quit smoking or vaping — often free patches or gum", href: "tel:+18007848669", icon: "🌬️" },
      { name: "National DV Hotline", desc: "24/7 safe, confidential help leaving an abusive situation", href: "tel:+18007997233", icon: "🛡️", crisis: true },
      { name: "Indiana DCS Hotline", desc: "Report child abuse or neglect, 24/7", href: "tel:+18008005556", icon: "🧒" },
      { name: "Adult Protective Services (IN)", desc: "Report abuse or neglect of an adult who can't protect themselves", href: "tel:+18009926978", icon: "🧓" }
    );
  }
  if (typeof GUIDES === "undefined") return;
  GUIDES.push(
    { id: "lost-id", title: "Replacing Lost ID & Papers", icon: "🪪",
      intro: "No ID makes everything harder. Here is the usual order to get your papers back.",
      where: "Inasmuch Ministry — help with ID and birth certificates", whereId: "inasmuch-ministry",
      bring: ["Any ID or paper you still have, even expired", "A letter from a shelter or mission saying you stay there, if you can get one"],
      steps: [
        "Start with your birth certificate. Order it from the Indiana Department of Health or the health department where you were born. There is a fee, so ask Inasmuch Ministry whether they can help pay.",
        "Next, get a replacement Social Security card. It is free at ssa.gov or any Social Security office. There is a limit on replacements per year, so only ask when you need it.",
        "Then get a state ID at the BMV. Ask the BMV what proof of address they take and whether any fee waiver applies to you.",
        "Need a mailing address? Ask your shelter or mission, or ask any post office about General Delivery, where they hold mail for you."
      ],
      tips: "Take a photo of every paper once you have it and keep it safe. Fees and rules change, so call before you go." },
    { id: "rights-police", title: "If Police Tell You to Move", icon: "⚖️",
      intro: "General information, not legal advice. Staying calm keeps you safest.",
      where: "Indiana Legal Help (indianalegalhelp.org) or call 211",
      steps: [
        "Stay calm, keep your hands where they can be seen, and don't run or argue.",
        "Ask: \"Am I free to go?\" If yes, you can leave. If they say you are being detained, ask why.",
        "You can stay silent. You can say \"I don't consent to a search.\" Do not physically resist.",
        "Ask for the officer's name and badge number. Write down what happened, the time, and the place as soon as you can.",
        "If you think something was unfair, call 211 or visit Indiana Legal Help to find free legal aid."
      ],
      tips: "Having your ID and a charged phone helps. Ask a shelter or day center where it is okay to rest during the day." },
    { id: "veterans", title: "Veterans: Where to Start", icon: "🎖️",
      intro: "Veterans have extra help for housing, health care and benefits.",
      where: "Call 211 and ask for the Allen County Veterans Service Office",
      bring: ["DD-214 or any discharge papers if you have them", "Photo ID"],
      steps: [
        "In crisis? Call 988 then press 1, or text 838255.",
        "Need housing? Call the Homeless Veterans Hotline at 1-877-424-3838.",
        "Ask the county Veterans Service Officer to help you file for benefits and get your discharge papers.",
        "Ask any VA clinic about health care and mental health help."
      ],
      tips: "Veterans' phone menus are long. Stay on the line and say \"homeless veteran\" to reach a person faster." },
    { id: "reentry", title: "After Prison or a Record", icon: "🔓",
      intro: "A record does not end your options. Many people get housing, work and a clean record back.",
      where: "Call 211 and ask for reentry help",
      steps: [
        "Ask 211 for local reentry programs. They can help with ID, housing leads, and work.",
        "Look for jobs marked fair-chance in the Jobs tab. Be honest, and say what you've done since.",
        "Ask Indiana Legal Help about expungement. Indiana law lets many people seal an old record after a waiting period.",
        "In the Places tab, use the filters to find shelters and programs that accept people with a record."
      ],
      tips: "Keep copies of every court paper. They are needed for expungement and for some housing applications." },
    { id: "quit-nicotine", title: "Quit Smoking or Vaping (Free)", icon: "🌬️",
      intro: "Free coaching and often free patches or gum.",
      where: "Indiana Quitline: 1-800-QUIT-NOW (1-800-784-8669)",
      steps: [
        "Call 1-800-784-8669. It is free and open every day.",
        "Ask about free nicotine patches or gum. Eligible Hoosiers can often get them by mail.",
        "Tell them if you live in a shelter or have no fixed address."
      ],
      tips: "Cravings are strongest in the first few days. Keep gum or candy in your pocket." },
    { id: "call-script", title: "What to Say When You Call", icon: "☎️",
      intro: "A short script for calling a shelter, pantry or agency.",
      where: "Any shelter, pantry or agency in the Places tab",
      steps: [
        "Say: \"Hi, my name is ___. I need help with ___ (a bed / food / a bus pass).\"",
        "Ask: \"Do you have room tonight?\" or \"When are you open?\"",
        "Ask: \"What do I need to bring? Do I need an ID?\"",
        "Ask: \"Can I bring my pet, my partner or my kids?\"",
        "Write down the name of who you spoke to and the time."
      ],
      tips: "If you're not sure, say so. Staff hear this every day and want to help." },
    { id: "storms", title: "Tornado, Flood & Power Outage", icon: "🌪️",
      intro: "What to do when severe weather hits and you don't have a home to shelter in.",
      where: "Call 211 to find open emergency shelters",
      steps: [
        "Tornado warning: go inside the nearest sturdy building (library, store, church, shelter) and ask staff to let you in. Go to the lowest floor, in a room without windows.",
        "No building nearby? Get as low as you can, away from trees and cars, and cover your head. Don't shelter under an overpass.",
        "Flooding: move to higher ground. Never walk or drive through floodwater.",
        "Power out: look for charging spots in the Places tab and keep your phone on low-power mode.",
        "Call 211 afterward to find shelter, food and supplies."
      ],
      tips: "Turn on phone alerts for your area. Haven also shows a banner when a warning is active." },
    { id: "heat", title: "Staying Cool in Summer", icon: "🥵",
      intro: "Heat can be dangerous. Plan your day around shade, water and air conditioning.",
      where: "Libraries, day centers and water spots on the map",
      steps: [
        "Drink water before you feel thirsty. Use the water category on the map to find refill spots.",
        "Rest in air conditioning during the hottest hours (noon to 5 pm): libraries, day centers, stores.",
        "Wear light clothes and a hat. Wet a shirt or towel to cool your neck.",
        "Warning signs: dizziness, confusion, nausea, hot dry skin or no sweating. Move to cool shade and call 911.",
        "Never stay in a parked car. Check on others who look unwell."
      ],
      tips: "Alcohol and some medicines make heat worse. Drink extra water." },
    { id: "scams", title: "Scams to Watch For", icon: "🚨",
      intro: "People in tough spots are often targeted. These are common signs of a scam.",
      where: "Not sure? Call 211 to check before you pay or share anything",
      steps: [
        "Real benefit offices never ask you to pay to apply for food stamps, housing or Medicaid.",
        "Anyone asking for gift cards, Cash App, Zelle or wire money is a scam.",
        "Never give your Social Security number by text or to an unexpected caller.",
        "Be careful with jobs that charge for training or promise big pay for little work.",
        "Payday and title loans can trap you in debt. Ask a mission about other options first."
      ],
      tips: "If it feels rushed or too good to be true, stop and ask someone you trust." }
  );

  if (typeof GUIDE_ES !== "undefined") Object.assign(GUIDE_ES, {
    "lost-id": { title: "Reemplazar identificación y documentos", intro: "Sin identificación todo es más difícil. Este es el orden usual para recuperar tus papeles.",
      bring: ["Cualquier identificación o papel que aún tengas, aunque esté vencido", "Una carta de un refugio o misión que diga que te quedas allí, si puedes conseguirla"],
      steps: ["Empieza con tu acta de nacimiento. Pídela al Departamento de Salud de Indiana o al departamento de salud del lugar donde naciste. Tiene un costo; pregunta a Inasmuch Ministry si pueden ayudarte a pagarlo.",
        "Luego pide una tarjeta de Seguro Social de reemplazo. Es gratis en ssa.gov o en cualquier oficina del Seguro Social. Hay un límite de reemplazos por año, así que pídela solo cuando la necesites.",
        "Después saca una identificación estatal en el BMV. Pregunta qué comprobante de domicilio aceptan y si hay alguna exención de costo para ti.",
        "¿Necesitas dirección postal? Pregunta en tu refugio o misión, o en cualquier oficina de correos por General Delivery, donde guardan tu correo."],
      tips: "Toma una foto de cada papel cuando lo recuperes y guárdala en un lugar seguro. Los costos y reglas cambian, así que llama antes de ir." },
    "rights-police": { title: "Si la policía te pide que te muevas", intro: "Información general, no es asesoría legal. Mantener la calma es lo más seguro.",
      steps: ["Mantén la calma, deja las manos a la vista y no corras ni discutas.",
        "Pregunta: \"¿Soy libre de irme?\" Si la respuesta es sí, puedes irte. Si dicen que te detienen, pregunta por qué.",
        "Puedes guardar silencio. Puedes decir: \"No doy mi consentimiento para un registro.\" No te resistas físicamente.",
        "Pide el nombre y número de placa del oficial. Anota lo que pasó, la hora y el lugar apenas puedas.",
        "Si crees que algo fue injusto, llama al 211 o visita Indiana Legal Help para encontrar ayuda legal gratuita."],
      tips: "Ayuda tener tu identificación y el teléfono cargado. Pregunta en un refugio o centro de día dónde puedes descansar durante el día." },
    "veterans": { title: "Veteranos: por dónde empezar", intro: "Los veteranos tienen ayuda adicional para vivienda, salud y beneficios.",
      bring: ["DD-214 u otros papeles de baja, si los tienes", "Identificación con foto"],
      steps: ["¿En crisis? Llama al 988 y oprime 1, o envía un texto al 838255.",
        "¿Necesitas vivienda? Llama a la línea para veteranos sin hogar: 1-877-424-3838.",
        "Pide al Oficial de Servicios para Veteranos del condado que te ayude a solicitar beneficios y conseguir tus papeles de baja.",
        "Pregunta en cualquier clínica del VA por atención médica y de salud mental."],
      tips: "Los menús telefónicos para veteranos son largos. Quédate en la línea y di \"homeless veteran\" para hablar con una persona más rápido." },
    "reentry": { title: "Después de la cárcel o con antecedentes", intro: "Tener antecedentes no acaba tus opciones. Muchas personas consiguen vivienda, trabajo y limpiar su récord.",
      steps: ["Pide al 211 programas locales de reinserción. Pueden ayudar con identificación, vivienda y trabajo.",
        "Busca empleos marcados como fair-chance en la pestaña de Trabajos. Sé honesto y cuenta lo que has hecho desde entonces.",
        "Pregunta en Indiana Legal Help por la eliminación de antecedentes (expungement). La ley de Indiana permite sellar muchos récords después de un tiempo de espera.",
        "En la pestaña Lugares, usa los filtros para encontrar refugios y programas que acepten a personas con antecedentes."],
      tips: "Guarda copias de todos los papeles de la corte. Se necesitan para la eliminación de antecedentes y algunas solicitudes de vivienda." },
    "quit-nicotine": { title: "Dejar de fumar o vapear (gratis)", intro: "Asesoría gratuita y, a menudo, parches o chicles de nicotina gratis.",
      steps: ["Llama al 1-800-784-8669. Es gratis y atienden todos los días.",
        "Pregunta por parches o chicles de nicotina gratis. Las personas elegibles de Indiana a menudo los reciben por correo.",
        "Diles si vives en un refugio o no tienes domicilio fijo."],
      tips: "Los antojos son más fuertes en los primeros días. Lleva chicle o caramelos en el bolsillo." },
    "call-script": { title: "Qué decir cuando llamas", intro: "Un guion corto para llamar a un refugio, despensa o agencia.",
      steps: ["Di: \"Hola, me llamo ___. Necesito ayuda con ___ (una cama / comida / un pase de autobús).\"",
        "Pregunta: \"¿Tienen espacio esta noche?\" o \"¿A qué hora abren?\"",
        "Pregunta: \"¿Qué debo llevar? ¿Necesito identificación?\"",
        "Pregunta: \"¿Puedo llevar a mi mascota, mi pareja o mis hijos?\"",
        "Anota el nombre de la persona con quien hablaste y la hora."],
      tips: "Si no estás seguro, dilo. El personal escucha esto todos los días y quiere ayudar." },
    "storms": { title: "Tornado, inundación y apagón", intro: "Qué hacer cuando hay mal tiempo y no tienes una casa donde refugiarte.",
      steps: ["Aviso de tornado: entra al edificio resistente más cercano (biblioteca, tienda, iglesia, refugio) y pide al personal que te deje pasar. Ve al piso más bajo, a un cuarto sin ventanas.",
        "¿No hay edificio cerca? Agáchate lo más que puedas, lejos de árboles y autos, y cúbrete la cabeza. No te refugies bajo un paso elevado.",
        "Inundación: busca terreno más alto. Nunca camines ni manejes por agua de inundación.",
        "Sin electricidad: busca lugares para cargar en la pestaña Lugares y pon el teléfono en modo de ahorro de batería.",
        "Después, llama al 211 para encontrar refugio, comida y suministros."],
      tips: "Activa las alertas del teléfono para tu zona. Haven también muestra un aviso cuando hay una alerta activa." },
    "heat": { title: "Mantenerse fresco en verano", intro: "El calor puede ser peligroso. Planea tu día alrededor de sombra, agua y aire acondicionado.",
      steps: ["Toma agua antes de tener sed. Usa la categoría de agua en el mapa para encontrar dónde rellenar.",
        "Descansa con aire acondicionado en las horas más calurosas (mediodía a 5 pm): bibliotecas, centros de día, tiendas.",
        "Usa ropa ligera y gorra. Moja una camisa o toalla para refrescar el cuello.",
        "Señales de alerta: mareo, confusión, náuseas, piel caliente y seca o sin sudor. Ve a la sombra y llama al 911.",
        "Nunca te quedes en un auto estacionado. Fíjate en otras personas que se vean mal."],
      tips: "El alcohol y algunos medicamentos empeoran el calor. Toma más agua." },
    "scams": { title: "Estafas a las que debes prestar atención", intro: "Las personas en momentos difíciles son blanco frecuente. Estas son señales comunes de estafa.",
      steps: ["Las oficinas de beneficios reales nunca piden que pagues para solicitar cupones de comida, vivienda o Medicaid.",
        "Quien te pida tarjetas de regalo, Cash App, Zelle o transferencias es un estafador.",
        "Nunca des tu número de Seguro Social por texto ni a una llamada inesperada.",
        "Cuidado con empleos que cobran por capacitación o prometen mucho dinero por poco trabajo.",
        "Los préstamos de día de pago y de título pueden atraparte en deudas. Antes pregunta en una misión por otras opciones."],
      tips: "Si te presionan o suena demasiado bueno para ser verdad, detente y pregunta a alguien de confianza." }
  });
})();




/* === more-data.js === */
/* Haven FW more-data: extra guides, hotlines, gigs and listing corrections.
   General information only. Rules, fees and phone numbers change, so call or check the website first. */
"use strict";
(function () {
  if (typeof HOTLINES !== "undefined") {
    HOTLINES.push(
      { name: "Parkview SOS / HelpLine", desc: "24/7 Parkview Behavioral Health HelpLine. Ask them to send the SOS mobile crisis team to you. Toll-free 800-284-8439", href: "tel:+12604719440", icon: "🆘", crisis: true },
      { name: "VA Benefits Hotline", desc: "Veterans: benefits, claims and help finding the right VA office", href: "tel:+18008271000", icon: "🎖️" },
      { name: "NAMI HelpLine", desc: "Free mental-health info and referrals, weekdays (call or text)", href: "tel:+18009506264", icon: "🧠" },
      { name: "Poison Control", desc: "24/7 free help if someone swallowed something harmful", href: "tel:+18002221222", icon: "☠️" },
      { name: "National Runaway Safeline", desc: "24/7 help for youth who ran away or are thinking about it", href: "tel:+18007862929", icon: "🧑‍🎓" }
    );
  }

  if (typeof RESOURCES !== "undefined") {
    const f = RESOURCES.find(r => r.id === "freimann-square");
    if (f && !/community report/i.test(f.desc)) {
      f.desc += " Community report: food is served here (for people and for dogs), clothing is handed out, and it is a drug-free zone. Times vary, so ask on site or call to confirm.";
      f.tags = (f.tags || []).concat(["free food", "dog food", "free clothes", "drug-free zone"]);
    }
    const a = RESOURCES.find(r => r.id === "associated-churches");
    if (a && !/no longer give/i.test(a.desc)) {
      a.desc += " Update: the Associated Churches food bank no longer gives out vouchers. Call before you go.";
    }
    const im = RESOURCES.find(r => r.id === "inasmuch-ministry");
    if (im && !/Bus passes: ask/i.test(im.desc)) {
      im.desc += " Reminder: gas vouchers come only through your township trustee, not Inasmuch.";
    }
  }

  if (typeof CATS !== "undefined") {
    CATS.splash = { label: "Splash Pads", icon: "💦", color: "#38bdf8" };
    CATS.skate = { label: "Skate Parks", icon: "🛹", color: "#f97316" };
    if (typeof STRINGS !== "undefined") {
      if (STRINGS.en) { STRINGS.en.cat_splash = "Splash Pads"; STRINGS.en.cat_skate = "Skate Parks"; }
      if (STRINGS.es) { STRINGS.es.cat_splash = "Áreas de agua"; STRINGS.es.cat_skate = "Skate parks"; }
      if (STRINGS.my) { STRINGS.my.cat_splash = "ရေဆော့ကွင်း"; STRINGS.my.cat_skate = "စကိတ်ပန်းခြံ"; }
    }
  }
  if (typeof RESOURCES !== "undefined") {
    const pc = RESOURCES.find(r => r.id === "park-center");
    if (pc && !/HelpLine: 260/.test(pc.desc)) {
      pc.desc += " Parkview SOS line: call the 24/7 Parkview Behavioral Health HelpLine at 260-471-9440 (toll-free 800-284-8439) and ask for the SOS mobile crisis team. They can come to you. The team aims to arrive within about an hour in Allen County. HelpLine: 260-471-9440.";
      pc.tags = (pc.tags || []).concat(["SOS", "mobile crisis", "24 hour HelpLine"]);
    }
    const sp = (id, name, addr, zip, lat, lng, extra, hrs) => RESOURCES.push({
      id, name, cats: ["splash", "hangout"], addr, zip, lat, lng, phone: "(260) 427-6000", phoneHref: "+12604276000",
      web: "https://www.fortwayneparks.org/facilities/family-aquatic-centers/splash-pads.html",
      desc: "Free city splash pad. Open about 9 AM to " + (hrs || "9 PM") + ", roughly Memorial Day weekend to early October, weather permitting. Touch the green button to start the water. " + (extra || "") + " Dogs are not allowed within 100 feet of a splash pad. Check the Parks and Recreation site for this year's dates.",
      tags: ["free", "splash pad", "park", "summer"]
    });
    sp("splash-buckner", "Buckner Park Splash Pad", "6114 Bass Rd", "46818", 41.091028, -85.222044, "The park also has two playgrounds, a pavilion and restrooms.");
    sp("splash-franklin", "Franklin School Park Splash Pad", "1903 St Marys Ave", "46808", 41.0925125, -85.1561182, "Seating around the pad and a rentable community room.");
    sp("splash-kreager", "Kreager Park (Taylor's Dream) Splash Pad", "7225 N River Rd", "46815", 41.090221, -85.040234, "Boundless playground and walking trails.");
    sp("splash-mccormick", "McCormick Park Splash Pad", "2300 Raymond Ave (Holly Ave)", "46803", 41.0642958, -85.0908257, "Playground and pavilion.");
    sp("splash-memorial", "Memorial Park Splash Pad", "2301 Maumee Ave", "46803", 41.0768542, -85.1074246, "Near the Maumee Ave and Glasgow Ave corner.");
    sp("splash-shoaff", "Shoaff Park Splash Pad", "6401 St Joe Rd", "46835", 41.1404824, -85.0934002, "Big park with river access, trails and a playground.");
    sp("splash-waynedale", "Waynedale Park Splash Pad", "2900 Koons St (Elzey St)", "46809", 41.0167381, -85.1742633, "Restrooms, playground and tennis courts.");
    sp("splash-promenade", "Promenade Park Water Rill", "202 W Superior St", "46802", 41.0824178, -85.1426023, "Downtown on the river. The Water Rill closes a little earlier in the fall than the others.");
    sp("splash-meyers", "Robert E. Meyers Park Splash Pad", "1301 Ewing St (Parkview Field north gate)", "46802", 41.0750672, -85.1411841, "Inside the north gate of Parkview Field. Open weekdays on days with no scheduled events.", "5 PM");
    RESOURCES.push({
      id: "lawton-skatepark", name: "Lawton Skatepark", cats: ["skate", "hangout"], addr: "1600 N Clinton St", zip: "46805", lat: 41.087598, lng: -85.1391042,
      phone: "(260) 427-6000", phoneHref: "+12604276000",
      desc: "Free outdoor skatepark in Lawton Park with lights for evening sessions. It is older, with ledges and bowls for many skill levels. It is open to the public most of the day, roughly 7 AM to 11 PM. Ask local skate shops, thrift stores and Buy Nothing groups about free or cheap used boards. Wear a helmet if you have one.",
      tags: ["free", "skate", "park", "lights"]
    });
    RESOURCES.push({
      id: "allen-vso", name: "Allen County Veteran Services Office", cats: ["benefits"], addr: "1 E Main St, Suite 106", zip: "46802", lat: 41.0809489, lng: -85.1392111,
      phone: "(260) 449-7861", phoneHref: "+12604497861",
      hours: { 1: [480, 990], 2: [480, 990], 3: [480, 990], 4: [480, 990], 5: [480, 990] },
      desc: "County office that helps veterans and their families with VA benefits claims, health care sign-up, pensions and a veteran property tax deduction. Free. Bring your DD-214 (discharge papers) and an ID. If you are in crisis, call the Veterans Crisis Line instead: 988, then press 1.",
      tags: ["veterans", "VA benefits", "claims", "DD-214", "free help"]
    });
  }

  if (typeof GIGS !== "undefined") {
    GIGS.push(
      { id: "gig-prolific", title: "Prolific (paid research surveys)", venue: "Online · any phone or computer",
        pay: "Paid per study · cash out by PayPal",
        desc: "Real university and company research studies that pay for your time. Pay per study is usually small but it does get paid. Studies come in waves, so check in often.",
        needs: "18+, email, PayPal account. Never pay to join any survey site.",
        url: "https://www.prolific.com", kind: "survey", added: "2026-09-30" },
      { id: "gig-usertesting", title: "UserTesting (test websites and apps)", venue: "Online · phone or computer with mic",
        pay: "Often about $10 for a 20-minute test (advertised)",
        desc: "Talk out loud while you use a website or app and get paid. You have to pass a short practice test first, and tests are not always available.",
        needs: "18+, working microphone, PayPal account, clear speaking voice",
        url: "https://www.usertesting.com/get-paid-to-test", kind: "survey", added: "2026-09-30" },
      { id: "gig-swagbucks", title: "Swagbucks (surveys, offers; low pay)", venue: "Online · phone or computer",
        pay: "Small rewards, paid as gift cards or PayPal",
        desc: "Known site that does pay out, but slowly and in small amounts. Treat it as pocket change, not a job. Skip any offer that asks for a credit card.",
        needs: "18+, email address",
        url: "https://www.swagbucks.com", kind: "survey", added: "2026-09-30" }
    );
  }

  if (typeof GUIDES === "undefined") return;
  GUIDES.push(
    { id: "housing", title: "Housing Help: Rent, Waitlists & Vouchers", icon: "🏘️",
      intro: "Steps to get on housing lists and find help paying for a place.",
      where: "Dial 211 and ask for \"coordinated entry\" for homeless housing. Also the Fort Wayne Housing Authority and your township trustee.",
      bring: ["Any ID, even expired", "Proof of income if you have it, or a note that you have none", "A letter from a shelter or case manager that you are homeless, if you can get one"],
      steps: [
        "Call 211 and say you are homeless or about to lose your housing. Ask to be entered in the coordinated entry list. That list decides who gets rapid rehousing and other programs.",
        "Ask your shelter or mission case manager to help. They can often start the paperwork and write the letters you need.",
        "Get on the Section 8 (Housing Choice Voucher) waitlist whenever it is open. Waitlists open and close, so ask the Fort Wayne Housing Authority how to be told when it opens. Also apply for public housing and other subsidized buildings, which have their own lists.",
        "For rent or utility help before you lose your home, see your township trustee first. Many churches and Inasmuch Ministry can help after that.",
        "Looking for landlords who take vouchers or who rent to people with records? Ask 211, your case manager, or a reentry program for current names. Ask the landlord up front so you do not waste application fees.",
        "For free advice on renting, buying, or avoiding eviction, call a HUD-approved housing counselor: 800-569-4287."
      ],
      tips: "Keep your phone number and mailing address current on every list. Many people lose their place on a waitlist because a letter could not reach them." },
    { id: "families", title: "Families: School, Child Care & Baby Needs", icon: "👨‍👩‍👧",
      intro: "Help for parents who have kids and no stable home.",
      where: "Your child's school district liaison for homeless students, WIC, and a family shelter. Call 211 for current family programs.",
      bring: ["Child's birth certificate and shot records if you have them (school must enroll without them)", "Any ID you have"],
      steps: [
        "School: under the federal McKinney-Vento law, kids without a stable home can enroll right away, even with no records or proof of address. Ask for the district's homeless liaison. Your child may also get free rides to their old school and free school meals.",
        "Child care: apply for the state child care voucher at fssabenefits.in.gov, or ask DFR. Say you are homeless, because that can move you up the list.",
        "Food: sign up for WIC for formula, milk and food for kids under 5 and for pregnant or nursing moms. See the WIC guide in this app.",
        "Diapers and formula: ask your shelter, WIC office, and local churches. Many give diapers monthly even if they do not advertise it.",
        "Family shelter: use the \"Families\" filter on the Places tab, then call. Family beds are limited, so call early in the day.",
        "Youth programs and after-school care are listed under the Youth category."
      ],
      tips: "You never have to say why you lost housing. You only have to say you do not have a fixed place right now." },
    { id: "seniors", title: "Seniors: Meals, Housing & Rides", icon: "🧓",
      intro: "Help for people 60 and over.",
      where: "Your area Agency on Aging (call 211 to be connected) and senior centers.",
      bring: ["Photo ID and Medicare/Medicaid card if you have them"],
      steps: [
        "Meals: ask the Agency on Aging about Meals on Wheels (delivered meals) and senior center lunches. Many are free or by donation for people 60+.",
        "Housing: apply for senior housing and subsidized senior buildings. Waits can be long, so apply to several at the same time.",
        "Medicines: ask about Medicare Extra Help (Low Income Subsidy) at ssa.gov or 800-772-1213, and Indiana's SHIP counselors for free Medicare advice.",
        "Rides: ask the Agency on Aging and Citilink about reduced fares and rides to medical appointments. See the rides guide in this app.",
        "Assisted living: Indiana's Medicaid waiver programs can help pay for assisted living or care at home. Ask the Agency on Aging or a hospital social worker to check what you may qualify for, and ask each place if it takes Medicaid waiver before you tour."
      ],
      tips: "If you cannot get out, say so on the phone. Many senior programs will send someone to you or do the paperwork by phone." },
    { id: "newarrivals", title: "New to the US: Interpreters & Help", icon: "🌎",
      intro: "How to get help in your language and find agencies that help newcomers.",
      where: "World Relief Fort Wayne, Catholic Charities and other resettlement agencies. Call 211 and ask for an interpreter.",
      bring: ["Any immigration papers you have", "Passport or ID from your home country"],
      steps: [
        "Interpreter: you have the right to a free interpreter at hospitals, clinics, schools, and government offices. Say your language and the word \"interpreter.\" Use the Show-a-card button on the Help tab.",
        "Call 211 and ask for your language. They can connect you with an interpreter.",
        "Resettlement agencies help with housing, jobs, English classes and benefits. Ask which ones are open to you.",
        "English and citizenship classes are offered by the library, adult education programs and some churches. Many are free.",
        "Food: ask pantries about culturally familiar food. Some places keep rice, beans and other staples.",
        "For immigration legal help, use only a licensed lawyer or a DOJ-accredited representative. Never pay a \"notario\" or anyone who promises you papers."
      ],
      tips: "Free legal help exists. Ask the Legal Aid guide in this app before paying anyone." },
    { id: "disability", title: "Disability: Walkers, Wheelchairs & Prosthetics", icon: "♿",
      intro: "Where to look for mobility aids and limbs for free or low cost.",
      where: "Your doctor or clinic, Medicaid or Medicare, Indiana Vocational Rehabilitation, and ATTAIN (Indiana's assistive technology program).",
      bring: ["Doctor's note or prescription if you have one", "Medicaid or Medicare card"],
      steps: [
        "Walker, cane, rollator with a seat, or wheelchair: Medicare and Medicaid cover these with a doctor's order. Ask your clinic to write it.",
        "No insurance: ask 211, churches, senior centers and your Agency on Aging about medical equipment \"loan closets.\" They lend or give used equipment.",
        "ATTAIN, Indiana's assistive technology program, can lend, reuse and help you find equipment. Search \"ATTAIN Indiana.\"",
        "Prosthetic arms and legs: Medicaid and Medicare cover them. Without insurance, Limbs for Life Foundation and some clinics have help programs. Indiana Vocational Rehabilitation can help if it will help you work.",
        "Used equipment is also given away on Buy Nothing groups and some church groups. Clean it and have it checked before use.",
        "For SSI and SSDI help, see the Disability (SSI) guide in this app."
      ],
      tips: "Ask the shelter ahead of time about stairs, elevators and accessible beds. The ♿ Accessible filter on the Places tab helps." },
    { id: "freestuff", title: "Free Stuff: Backpacks, Bags, Bottles, Coats", icon: "🎒",
      intro: "Where free gear usually comes from. Most of it is not advertised, so ask.",
      where: "Missions, clothing closets, churches, and the Free Clothes and Free & Thrift categories on the Places tab.",
      steps: [
        "Backpacks and bags: ask missions and day centers. Back-to-school drives in late summer give out backpacks. Stores and food pantries often have spare reusable or plastic bags.",
        "Coats, hats, gloves, blankets and pillows: clothing closets and missions hand these out, especially in fall. Many churches have winter coat drives.",
        "Job interview clothes: ask the job help programs in the Jobs tab and clothing closets. Some places give a full outfit for an interview.",
        "Water bottle: refill for free at the Drinking Water pins on the map. Ask missions for a free bottle.",
        "Bike helmet and pads: ask Safe Kids groups, fire stations, police and health department events, and bike co-ops. Helmets are often given away at safety days.",
        "Free groups: look for Buy Nothing groups on Facebook and the Buy Nothing app. People give away things for free.",
        "Ask at every place you visit: \"Do you have anything else you give out?\" You will often find more."
      ],
      tips: "Come early. Gear goes fast, especially coats and sleeping bags at the start of cold weather." },
    { id: "glasses", title: "Free & Cheap Glasses and Eye Exams", icon: "👓",
      intro: "Ways to see better without much money.",
      where: "Local Lions Club, community health center, and your Medicaid plan.",
      bring: ["Your last prescription if you have it", "Medicaid card if you have it"],
      steps: [
        "Medicaid: HIP and other Indiana Medicaid plans may cover an eye exam and glasses. Ask your plan.",
        "Lions Clubs: ask your local club about help paying for glasses. Ask 211 or a mission to connect you.",
        "New Eyes (neweyes.org) pays for glasses for people with low income. You apply through a social worker, clinic or agency.",
        "Community health centers charge by income for eye exams. Call and ask for the sliding fee.",
        "Cheap online glasses: Zenni and similar sites start under about $10 with your prescription.",
        "Reading glasses: dollar stores and many pharmacies sell them for a few dollars."
      ],
      tips: "A prescription is yours. Ask for a paper copy after any exam." },
    { id: "tech", title: "Laptops, Phones, Chargers & Earbuds", icon: "💻",
      intro: "How to get a computer and a decent phone and charger without overspending. Prices change.",
      where: "PCs for People, Human-I-T, your library, and your Lifeline phone provider.",
      steps: [
        "Free or cheap laptop: PCs for People (pcsforpeople.org) and Human-I-T (human-i.org) offer low-cost computers and internet for people with low income. Libraries lend laptops or hotspots, and give free computer time.",
        "Free phone and service: see the Free Phone guide in this app (Lifeline). Many providers include a free phone.",
        "Buying a phone: a refurbished or used phone gives much better value than a new cheap one. Good budget lines are Motorola Moto G, Samsung Galaxy A series and Google Pixel \"a\" models. Look for one released in the last 2-3 years with at least 64 GB.",
        "Charger and cord: ask libraries, missions and thrift stores. Dollar stores sell cords, but a cheap, no-name charger can be unsafe. Anker is a reliable cheap brand.",
        "Power bank (portable charger): a 10,000 mAh Anker power bank is usually around $20-30 and charges a phone 2-3 times.",
        "Earbuds and headphones: Anker Soundcore earbuds and headphones are well reviewed for about $20-60. Wired earbuds for $10 never run out of battery."
      ],
      tips: "Never pay for a \"free\" phone or computer. Real programs never ask for a fee up front." },
    { id: "haircut", title: "Free Haircuts & Self-Care", icon: "💈",
      intro: "Low-cost cuts, massages and a fresh start.",
      where: "Beauty and barber schools, missions, and events like Project Homeless Connect.",
      steps: [
        "Beauty and barber schools: student cuts are cheap or free. Call and ask for the student clinic.",
        "Many missions and outreach events offer free haircuts on certain days. Ask at the front desk.",
        "Great Clips has a Clips of Kindness program with shelters and nonprofits. Ask your case manager.",
        "Massage schools often have low-cost student massages.",
        "Dental and vision: community health centers charge by income. Ask about dental days and free clinics."
      ],
      tips: "A haircut can help you feel ready for an interview. Ask for one before job fairs." },
    { id: "service-animal", title: "Service Dogs & Emotional Support Animals", icon: "🐕‍🦺",
      intro: "What the rules are and how to get one.",
      where: "A service dog school, your doctor or therapist, and your housing provider.",
      steps: [
        "Service dog: trained to do a task for a disability. Under the ADA, no paper certificate is needed. Staff may only ask if it is needed for a disability and what task it does.",
        "Waits can be long. Programs like Paws With A Cause, Canine Companions and Pets for Vets train dogs, often for free or low cost for people with need.",
        "Emotional support animal (ESA): not a service dog. It has no public-access rights, but the Fair Housing Act can let you keep one in housing that bans pets, with a letter from a licensed provider.",
        "Do not buy a \"registration\" or certificate online. They are not legally required.",
        "Pet-friendly shelters and free vet care are on the map under Pet Help."
      ],
      tips: "Ask your doctor or therapist whether an ESA letter makes sense for you." },
    { id: "foster-youth", title: "Aging Out of Foster Care", icon: "🧑‍🎓",
      intro: "Help for young people leaving foster care.",
      where: "Your DCS caseworker, and 211 for transitional housing and independent living programs.",
      steps: [
        "Ask your caseworker about Indiana's Collaborative Care, which can keep help going to age 21, and about Older Youth Services (Chafee) for housing, school and job help.",
        "Ask about the Education and Training Voucher, which helps pay for college or trade school.",
        "Transitional housing and independent living programs exist for young adults. Ask 211 and the Youth category on the map.",
        "Get your documents (birth certificate, Social Security card, state ID) before you leave care. See the Lost ID guide.",
        "You can call the National Runaway Safeline at 800-786-2929 if you are on the street."
      ],
      tips: "Ask early. Some help ends if you do not sign up before your 18th, 19th or 21st birthday." },
    { id: "pregnancy", title: "Pregnant or New Parent", icon: "🤰",
      intro: "Care and baby gear for expecting and new parents.",
      where: "Your doctor or a community health center, WIC, and a diaper bank.",
      steps: [
        "Medicaid covers pregnancy care. Apply right away at fssabenefits.in.gov or at DFR. Ask about presumptive eligibility, which gives temporary coverage while the application is processed.",
        "WIC gives food, formula help and nursing support. See the WIC guide in this app.",
        "Cribs and car seats: ask Cribs for Kids, Safe Kids, health departments and local churches for free or low-cost ones.",
        "Diapers and formula: diaper banks, WIC and churches. Ask monthly.",
        "If you cannot care for a newborn, Indiana's Safe Haven law lets you surrender a baby up to 60 days old. See the Safe Haven guide."
      ],
      tips: "Go to the first prenatal visit as early as you can, even without insurance sorted out." },
    { id: "detox", title: "Detox, Treatment & Sober Living", icon: "💜",
      intro: "Where to start if you want to stop using.",
      where: "SAMHSA Helpline 800-662-4357 (free, 24/7) and findtreatment.gov.",
      steps: [
        "Call SAMHSA at 800-662-4357 or 988 any time. Say you want a detox or treatment bed today.",
        "Do not stop alcohol or benzodiazepines suddenly on your own. Withdrawal can be dangerous. Go to detox or an ER.",
        "Medicaid usually pays for treatment. Ask the program to check your coverage.",
        "Sober living and recovery housing are on the map under Recovery. Ask each one about rules and cost.",
        "Free Narcan is at places marked with the Narcan category. Carry it."
      ],
      tips: "Use the HART Recovery Line on the Help tab for a local person to help you find a bed." },
    { id: "travel", title: "Getting to Another City or State", icon: "🚌",
      intro: "Ways to travel when you have no money. Always have a place to go first.",
      where: "Missions, the Salvation Army, Travelers Aid, and Greyhound's Home Free program (through agencies).",
      steps: [
        "Have a person and a place waiting at the other end. Agencies want proof that someone will take you in.",
        "Ask missions, the Salvation Army, and your case manager about bus or train tickets home. Some programs pay for one-way tickets.",
        "Greyhound's Home Free program works through nonprofits and agencies. Ask your case manager to look into it.",
        "Travelers Aid and some churches can help travelers who are stranded.",
        "Bring ID. Call the program first and ask what they need."
      ],
      tips: "Be careful of strangers who offer a ride or ticket for something in return. Use an agency." },
    { id: "banking", title: "Banking Without Fees", icon: "🏦",
      intro: "Ways to hold and cash money without losing it to fees.",
      where: "Banks and credit unions that offer second-chance or low-fee accounts. Ask each one.",
      bring: ["ID", "Proof of address or a letter from a shelter"],
      steps: [
        "Ask for a second-chance or Bank On certified account. These have no overdraft fees and are open to people with past bank problems. See joinbankon.org.",
        "Credit unions often have lower fees. Ask about a share (savings) account.",
        "Prepaid cards can work, but watch the monthly fees.",
        "Check cashing: your own bank usually cashes your checks free. Check-cashing stores charge fees.",
        "Direct deposit: ask your employer or benefit office. It is usually free and gets your money faster."
      ],
      tips: "Never give a PIN, login or card number to anyone who calls or texts." },
    { id: "surveys", title: "Survey Sites & Apps: What Really Pays", icon: "📝",
      intro: "Money-making sites that really do pay, and how to avoid the fake ones.",
      where: "See the Gigs tab for current listings.",
      steps: [
        "Prolific and UserTesting pay for research and usability tests. They are listed in the Gigs tab.",
        "Swagbucks and similar sites pay small amounts. Treat them as pocket change.",
        "Real sites never ask you to pay to join, pay a \"processing fee,\" or buy anything first.",
        "Use PayPal or a gift card for payout and watch the minimum cash-out amount.",
        "Use a separate email address for survey sites to keep your inbox clean."
      ],
      tips: "If it promises hundreds of dollars a day for easy clicks, it is a scam." },
    { id: "nokitchen", title: "Food With No Kitchen or Fridge", icon: "🥫",
      intro: "Eat well and stay safe when you cannot cook or keep things cold.",
      where: "Food banks and hot meals on the map, and the Weekly food calendar on the Help tab.",
      steps: [
        "Ask pantries for no-cook items: canned beans, tuna, chicken, peanut butter, crackers, fruit cups, tortillas, oatmeal cups and ready-to-eat meals with pull tabs.",
        "Pick a can opener with pull-tab cans so you do not need tools.",
        "Without a fridge, avoid raw meat, milk, eggs and leftovers that sat out more than 2 hours (1 hour in summer).",
        "Eat cold food from a cooler in the shade if you can get ice. Throw it out when it gets warm.",
        "Look at hot meals under Hot Meals on the map and use Food by day of the week."
      ],
      tips: "If you are unsure whether food is safe, throw it out. Food poisoning is worse out here." },
    { id: "hygiene", title: "Free Hygiene Supplies", icon: "🧼",
      intro: "Soap, razors, period products and dental care.",
      where: "Day centers, missions, health departments and diaper/hygiene banks.",
      steps: [
        "Ask at day centers and missions. Many keep soap, razors, deodorant, toothbrushes and period products at the front desk.",
        "Showers and laundry are on the map under Showers & Day and Laundry.",
        "Period products: ask clinics, schools, shelters and the health department. Ask quietly. Staff expect this question.",
        "Dental care: community health centers charge by income. Ask about free dental days.",
        "The Medicine Cabinet program at the Franciscan Center gives out over-the-counter items. See its listing."
      ],
      tips: "Ask for what you need. Staff would rather give than see someone go without." },
    { id: "workgear", title: "Work Gear & First-Week Help", icon: "🥾",
      intro: "Boots, tools and bus fare for a new job.",
      where: "Job programs in the Jobs tab, missions, and your township trustee.",
      steps: [
        "Tell the job program or temp agency what you need. Many have a fund for boots, uniforms and tools.",
        "Ask missions and churches about work boots and clothing.",
        "Bus fare: free bus pass places are on the map under Bus Passes. Ask your employer about a transit benefit.",
        "Ask your caseworker about a first-week support fund.",
        "Interview clothes: see the Free Stuff guide."
      ],
      tips: "Ask at the first interview if the employer provides gear. Many do." },
    { id: "cold-safety", title: "Cold Weather Safety & Warming Centers", icon: "🥶",
      intro: "Warning signs and what to do when it gets dangerously cold.",
      where: "Call 211 for warming centers and emergency overflow shelter on code blue nights.",
      steps: [
        "Check the Haven cold banner on the map. When it is very cold, call 211 and ask for \"warming centers\" and \"overflow shelter\" for tonight. Hours change from night to night.",
        "Layer up: a wool or synthetic base layer, a warm middle layer, and a wind and water layer. Cotton gets wet and makes you colder. Keep your head, hands and feet covered.",
        "Keep your socks dry. Change wet socks as soon as you can, even if it means using a bathroom or a store.",
        "Mild cold warning signs: shivering, numb fingers or toes, clumsy hands. Get inside and warm up right away.",
        "Serious warning signs: shivering that stops, confusion, slurred speech, very drowsy. Call 911. Do not rub frostbitten skin. Warm it slowly with body heat, not hot water.",
        "Do not drink alcohol to warm up. It makes you lose heat faster. Do not use a grill, stove or generator inside any space.",
        "Libraries, Citilink Central Station, and some stores and 24-hour places are warm by day. See the Free Stuff guide for coats, gloves and blankets."
      ],
      tips: "If you see someone outside who looks cold and confused, call 911 or 211. You may save a life." },
    { id: "medrides", title: "Rides to Medical Appointments (Medicaid)", icon: "🚖",
      intro: "Some Medicaid plans pay for rides to the doctor.",
      where: "The member services number on the back of your Medicaid card.",
      steps: [
        "Call the number on your Medicaid card and ask about \"non-emergency transportation.\" Coverage differs by plan, and not every Indiana plan covers rides.",
        "Book 2 to 3 business days ahead, and have your appointment date, time and address ready.",
        "Medicare Advantage plans sometimes cover rides too. Ask your plan.",
        "No coverage? Community Transportation Network (CTN, 5601 Industrial Rd, Fort Wayne) gives rides to seniors, people with disabilities and low-income families. Call 211 to get their current number. Also ask the Agency on Aging, Citilink's accessible service and local churches for free or reduced rides."
      ],
      tips: "Keep the confirmation number. Ride services can be late, so book the earliest appointment time you can." }
  );
})();



