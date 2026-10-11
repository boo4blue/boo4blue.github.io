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
