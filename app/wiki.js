/* Haven FW website wiki (#38): port of the Android app's wiki.js — 📚 "Wikipedia for the app",
   a plain-language encyclopedia of practical know-how. General information only:
   not legal advice, not medical advice. When in doubt, call 211. Never fabricate:
   no made-up hours, addresses, or program names — links go to real site categories,
   tabs, and phone numbers only. English-only labels (site convention). */
"use strict";
(function () {
  if (typeof goTab !== "function") return;
  var es = function () { return false; }; /* site convention: English only */
  var L = function (en, s) { return en; };
  var E = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); };
  var stripTags = function (s) { return String(s).replace(/<[^>]*>/g, " "); };

  var CATS = [
    ["rights",  "🛡️", "Know your rights"],
    ["health",  "🏥", "Health & safety"],
    ["docs",    "🆔", "ID & documents"],
    ["daily",   "🧰", "Day to day"],
    ["housing", "🏠", "Shelter & housing"],
    ["sos",     "🆘", "Emergencies"]
  ];

  /* [id, cat, icon, title, body_html, links]
     links: {cat:"shelter",label} | {tab:"guide",label} | {tel:"211",label} */
  var ARTICLES = [
    ["wiki-police", "rights", "🚔", "If police tell you to move",
      "<p>Stay calm and keep your hands visible. You can ask: <b>\"Am I free to leave?\"</b> If the answer is yes, you can walk away calmly.</p>" +
      "<ul><li>Indiana law bans camping on public property, so police can order you to move from parks, sidewalks, and underpasses. You don't have to argue the law on the spot — move first, then get help.</li>" +
      "<li>You don't have to consent to a search of your bags. You can say <b>\"I don't consent to a search.\"</b> Stay polite and never resist physically.</li>" +
      "<li>If you're told to leave a business or shelter property, leave — a trespass ticket makes everything harder later.</li></ul>" +
      "<p>Need somewhere to go? Check the map for shelters and day centers, or call 211.</p>",
      [{ cat: "shelter", label: "See shelters" }, { tel: "211", label: "Call 211" }]],

    ["wiki-cold", "health", "🥶", "Cold nights: hypothermia & frostbite",
      "<p>Hypothermia can start <b>well above freezing</b>, especially if you're wet or it's windy.</p>" +
      "<ul><li><b>Hypothermia signs:</b> violent shivering that then <i>stops</i>, confusion, clumsiness, drowsiness.</li>" +
      "<li><b>Frostbite signs:</b> skin turns white or gray, waxy and numb — usually fingers, toes, ears, nose. Don't rub it. Get inside and warm up slowly.</li>" +
      "<li>Layers beat one heavy coat. Keep feet dry — wet socks are dangerous. A hat matters more than you'd think.</li></ul>" +
      "<p>If someone is confused, slurring, or can't stay awake in the cold, <b>call 911</b> — that's an emergency. The app shows a ❄️ alert on the map when freezing weather is coming, with a button to find warm places.</p>",
      [{ cat: "shelter", label: "Find a warm place" }, { tel: "911", label: "Call 911" }]],

    ["wiki-heat", "health", "🥵", "Hot days: beating the heat",
      "<ul><li><b>Heat exhaustion:</b> heavy sweating, weakness, headache, nausea. Move to shade, drink water, cool your skin with water.</li>" +
      "<li><b>Heat stroke is an emergency:</b> hot or dry skin, confusion, fainting. <b>Call 911</b> immediately and cool the person as fast as you can.</li>" +
      "<li>Drink water <i>before</i> you're thirsty. Libraries, malls, and day centers are free air conditioning.</li>" +
      "<li>Never leave kids or pets in a car — not even for a minute.</li></ul>",
      [{ cat: "water", label: "Find water" }, { cat: "day", label: "Day centers" }]],

    ["wiki-id", "docs", "🪪", "Getting an Indiana ID",
      "<p>An ID unlocks almost everything: shelter beds, jobs, benefits, housing lists. It's worth the effort.</p>" +
      "<ul><li>The Indiana BMV decides which documents it accepts — usually proof of who you are, your Social Security number, and Indiana residency. The exact list is on the BMV website and changes, so <b>confirm before you go</b>.</li>" +
      "<li>No birth certificate? You can order one from the state where you were born (there's usually a fee — ask 211 about help paying).</li>" +
      "<li>No stable address? Ask a day center, shelter, or outreach worker about using their address for mail — many help with this.</li>" +
      "<li>Tip: keep copies or photos of every document on your phone.</li></ul>",
      [{ cat: "day", label: "Day centers" }, { tel: "211", label: "Call 211" }]],

    ["wiki-docs", "docs", "📄", "Replacing lost documents",
      "<ul><li><b>Birth certificate:</b> order it from the vital-records office of the state where you were born. There's usually a fee.</li>" +
      "<li><b>Social Security card:</b> free to replace at ssa.gov or a Social Security office — you can only get a few replacements per year, so keep it safe.</li>" +
      "<li>If everything was stolen, file a police report — the report number helps when agencies ask what happened.</li>" +
      "<li>Ask 211 or a day center about funds that help pay document fees.</li></ul>",
      [{ tel: "211", label: "Call 211" }]],

    ["wiki-mail", "daily", "📬", "Getting mail without an address",
      "<ul><li><b>USPS General Delivery:</b> the post office will hold mail for you. Address it as: YOUR FULL NAME, General Delivery, then the post office's city, state, and ZIP. Ask the main post office (or 211) which ZIP to use, and bring ID to pick it up.</li>" +
      "<li>Some shelters and day centers let clients receive mail there — <b>ask first</b> before you address anything to them.</li>" +
      "<li>For benefits and official mail, keep one consistent mailing address everywhere so nothing gets lost.</li></ul>",
      [{ tel: "211", label: "Call 211" }]],

    ["wiki-phone", "daily", "🔋", "Keeping your phone charged & connected",
      "<p>Your phone is your lifeline: maps, 211, job callbacks. Protect its charge.</p>" +
      "<ul><li><b>Free Wi-Fi + outlets:</b> libraries, fast-food lobbies, laundromats while you wash. The map shows free Wi-Fi and charging spots.</li>" +
      "<li>Battery-saver mode, lower screen brightness, and closing unused apps can double your day.</li>" +
      "<li>Ask 211 about free or low-cost phone programs (like Lifeline) — eligibility is usually based on benefits you already get.</li></ul>",
      [{ cat: "charge", label: "Charging spots" }, { cat: "wifi", label: "Free Wi-Fi" }]],

    ["wiki-laundry", "daily", "👕", "Clean clothes for free or cheap",
      "<ul><li>The map lists free laundry programs and low-cost laundromats — <b>check hours</b> before you haul everything over.</li>" +
      "<li>Some churches and ministries run free laundry days each month; ask 211 what's coming up.</li>" +
      "<li>A sink, a bar of soap, and a clothesline work in a pinch. Dry completely — damp clothes in a bag grow mildew fast.</li>" +
      "<li>Thrift stores on the map often have the cheapest replacement clothes in town.</li></ul>",
      [{ cat: "laundry", label: "Laundry spots" }, { cat: "freeclothes", label: "Free clothes" }]],

    ["wiki-belongings", "daily", "🎒", "If your belongings are stolen",
      "<ul><li><b>Report it:</b> a police report listing what was taken helps with replacements and some aid programs.</li>" +
      "<li>Some shelters and day centers have lockers or storage — ask when you check in.</li>" +
      "<li>Keep the irreplaceable stuff on you or photographed: ID, papers, photos of anything sentimental.</li>" +
      "<li>Don't try to get things back by force — it can turn a theft report into a charge against you.</li></ul>",
      [{ cat: "day", label: "Day centers" }]],

    ["wiki-bus", "daily", "🚌", "Riding the bus",
      "<ul><li>Citilink runs Fort Wayne's buses. Routes and schedules are on their site — or plan a trip right on this site's map.</li>" +
      "<li>Fares and pass prices change, so <b>check before you ride</b>; drivers can answer questions, and carry exact change if you pay cash.</li>" +
      "<li>Free or reduced passes exist for some situations — ask 211 or a day center what's current.</li>" +
      "<li>Plan to arrive early. Buses run on schedules, not on your emergency.</li></ul>",
      [{ cat: "bus", label: "Transit info" }, { tab: "guide", label: "Open Guides" }]],

    ["wiki-intake", "housing", "🛏️", "What to expect at a shelter intake",
      "<p>Intake is just questions: name, ID if you have it, why you need shelter, health or medication needs. Answer honestly — it gets you the right bed.</p>" +
      "<ul><li><b>Bring:</b> ID, medications in their bottles, phone charger. Leave valuables elsewhere if you can.</li>" +
      "<li><b>Ask about:</b> curfew, chores, how long you can stay, storage for your things, and what help they offer next — case workers are gold.</li>" +
      "<li>Rules exist because dozens of strangers share one building. Breaking curfew or fighting usually means losing the bed.</li></ul>",
      [{ cat: "shelter", label: "See shelters" }]],

    ["wiki-vouchers", "housing", "🏘️", "Housing help: the short version",
      "<p>The full step-by-step lives in the Guides tab — <b>\"Housing Vouchers (Section 8)\"</b>: where to apply, what to bring, the waitlist reality, and alternatives while you wait.</p>" +
      "<ul><li><b>Short version:</b> apply everywhere you're eligible, keep your contact info current with every housing authority, and answer every letter fast — missed mail is the #1 way people lose their spot.</li>" +
      "<li>While you wait: shelters, transitional programs, and roommate situations bridge the gap.</li></ul>",
      [{ tab: "guide", label: "Open Guides" }]],

    ["wiki-numbers", "sos", "📞", "Who to call in an emergency",
      "<ul><li><b>911</b> — danger right now: crime, fire, medical emergency, overdose. Always free, even with no plan or minutes.</li>" +
      "<li><b>211</b> — not an emergency but you need help: shelter tonight, food, bills, ID help. Real humans, local referrals.</li>" +
      "<li><b>988</b> — you're in crisis or thinking about suicide: call or text 988, any time. Free and confidential.</li></ul>" +
      "<p><b>Save all three in your phone today.</b></p>",
      [{ tel: "911", label: "Call 911" }, { tel: "211", label: "Call 211" }, { tel: "988", label: "Call or text 988" }]],

    ["wiki-overdose", "sos", "💊", "Overdose: how to help",
      "<ul><li><b>Signs:</b> can't be woken up, slow or stopped breathing, blue or gray lips or nails.</li>" +
      "<li><b>Call 911 first.</b> Indiana law protects people who call for help during an overdose when they act in good faith — don't let fear stop the call.</li>" +
      "<li>If naloxone (Narcan) is around, use it — it can't hurt someone who isn't overdosing. Then rescue breathing if you know how, and roll them onto their side (recovery position).</li>" +
      "<li><b>Stay until help arrives.</b> The person may need another dose, or may wake up confused and combative — that's the overdose, not them.</li></ul>",
      [{ cat: "narcan", label: "Free naloxone" }, { tel: "911", label: "Call 911" }]]
  ];

  var st = { q: "", cat: "" };
  var wikiLast = "", wikiDeb = null;

  /* wiki-specific styles (card base comes from the site theme) */
  if (!document.getElementById("wikiCss")) {
    var css = document.createElement("style");
    css.id = "wikiCss";
    css.textContent = ".wikicard{margin:10px 16px;padding:14px 16px}.wikicard h3{margin:0 0 4px;font-size:17px}"
      + ".wikicat{font-size:12px;opacity:.75;margin-bottom:8px}.wikibody{font-size:14.5px;line-height:1.5}"
      + ".wikibody p{margin:0 0 8px}.wikibody ul{margin:0 0 8px;padding-left:20px}.wikibody li{margin-bottom:6px}"
      + ".wikilinks{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.wikifoot{margin:14px 16px;font-size:12.5px;opacity:.7}";
    document.head.appendChild(css);
  }

  function match(a) {
    if (st.cat && a[1] !== st.cat) return false;
    if (!st.q) return true;
    var hay = (a[3] + " " + stripTags(a[4])).toLowerCase();
    return st.q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
  }

  function linkBtn(l) {
    var lab = E(l.label);
    if (l.cat) return '<button class="qbtn" data-wcat="' + E(l.cat) + '">' + lab + "</button>";
    if (l.tab) return '<button class="qbtn" data-wtab="' + E(l.tab) + '">' + lab + "</button>";
    if (l.tel) return '<a class="qbtn" href="tel:' + E(l.tel) + '">' + lab + "</a>";
    return "";
  }

  function card(a) {
    var cat = null, i;
    for (i = 0; i < CATS.length; i++) if (CATS[i][0] === a[1]) cat = CATS[i];
    var catL = cat ? E(cat[2]) : "";
    return '<article class="card wikicard" data-wid="' + E(a[0]) + '">'
      + "<h3>" + a[2] + " " + E(a[3]) + "</h3>"
      + '<div class="wikicat">' + (cat ? cat[1] : "") + " " + catL + "</div>"
      + '<div class="wikibody">' + a[4] + "</div>"
      + '<div class="wikilinks">' + a[5].map(linkBtn).join("") + "</div>"
      + "</article>";
  }

  function render() {
    var el = document.getElementById("tab-wiki");
    if (!el) return;
    var list = ARTICLES.filter(match);
    document.getElementById("wikiChips").innerHTML =
      '<button class="chip' + (!st.cat ? " on" : "") + '" data-c="">All</button>' +
      CATS.map(function (c) { return '<button class="chip' + (st.cat === c[0] ? " on" : "") + '" data-c="' + c[0] + '">' + c[1] + " " + E(c[2]) + "</button>"; }).join("");
    document.getElementById("wikiBody").innerHTML = list.length
      ? list.map(card).join("") +
        '<p class="wikifoot">Wiki is general information, not legal or medical advice. When in doubt, call 211.</p>'
      : '<div class="empty"><div class="big">📚</div><h3>No articles found</h3><p>Try a different search.</p></div>'
        + '<p class="wikifoot">Wiki is general information, not legal or medical advice. When in doubt, call 211.</p>';
    bind(el);
  }

  /* Site adaptation of the app's category links: apply the site filter, then show the map.
     NOTE: the module-local render() is the wiki renderer; the site's places renderer
     is reached explicitly via window.render. */
  function applyWikiCat(cat) {
    try {
      document.querySelectorAll("#sidebar-filters .filter-btn").forEach(function (b) {
        b.classList.toggle("active", b.dataset.cat === cat);
      });
      var cats = activeCats();
      document.querySelectorAll("#filters .filter-btn").forEach(function (b) {
        b.classList.toggle("active", cats.indexOf(b.dataset.cat) >= 0 || (cats.length === 0 && b.dataset.cat === ""));
      });
      if (window.render && window.render !== render) window.render(cats, activeQ());
    } catch (e) {}
  }

  function bind(el) {
    el.querySelectorAll("[data-wcat]").forEach(function (b) {
      b.addEventListener("click", function () { applyWikiCat(b.dataset.wcat); goTab("map"); });
    });
    el.querySelectorAll("[data-wtab]").forEach(function (b) {
      b.addEventListener("click", function () { goTab(b.dataset.wtab); });
    });
    el.querySelectorAll("#wikiChips [data-c]").forEach(function (b) {
      b.addEventListener("click", function () {
        st.cat = b.dataset.c; render();
        var sc = document.querySelector("#tab-wiki .scroll"); if (sc) sc.scrollTop = 0;
      });
    });
  }

  /* ---- DOM: section (inserted after the Learn tab, mirroring the app) ---- */
  var host = document.getElementById("tab-learn");
  if (host && !document.getElementById("tab-wiki")) {
    var sec = document.createElement("div");
    sec.id = "tab-wiki"; sec.className = "tab";
    sec.innerHTML = '<div class="content"><div class="secHead"><h2>📚 Wiki</h2>'
      + "<p>A mini-Wikipedia: practical know-how, written plainly</p></div>"
      + '<div class="searchbar" style="margin:0 16px 10px"><span class="mag">🔍</span><input id="wikiQ" type="search" autocomplete="off" placeholder="Search police, ID, cold, mail, overdose…"><button class="iconbtn" id="wikiClear" aria-label="Clear search">✕</button></div>'
      + '<div class="chips" id="wikiChips"></div>'
      + '<div class="scroll" id="wikiBody" style="padding-top:2px"></div></div>';
    host.parentNode.insertBefore(sec, host.nextSibling);
    document.getElementById("wikiQ").addEventListener("input", function (e) {
      var v = e.target.value.trim().toLowerCase();
      if (v === wikiLast) return;
      if (wikiDeb) clearTimeout(wikiDeb);
      wikiDeb = setTimeout(function () { wikiDeb = null; wikiLast = v; st.q = v; render(); }, 150);
    });
    document.getElementById("wikiClear").addEventListener("click", function () {
      if (wikiDeb) { clearTimeout(wikiDeb); wikiDeb = null; }
      st.q = ""; wikiLast = ""; document.getElementById("wikiQ").value = ""; render();
    });
    render();
  }

  window.renderWiki = render;
  window.goWiki = function () { goTab("wiki"); };
  window._wikiApi = { match: match, card: card, linkBtn: linkBtn, ARTICLES: ARTICLES, CATS: CATS, applyWikiCat: applyWikiCat };
})();
