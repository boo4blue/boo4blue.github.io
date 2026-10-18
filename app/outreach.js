/* Haven FW website — Saturday outreach + everyday guides (feature #47).
 * Ported from the Android app's haven-adds.js (fw-haven www/haven-adds.js):
 * recurring Saturday outreach events, generated from today's date so they
 * never go stale, plus two everyday guides.
 * No IIFE (site module convention). Loaded after tab-data.js (EVENTS) and
 * guides.js (GUIDES); everything is idempotent via id dedup, and missing
 * globals are a no-op rather than a crash. */

function outreachIso(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function outreachNextSaturdays(n) {
  var start = new Date(); start.setHours(12, 0, 0, 0);
  start.setDate(start.getDate() + ((6 - start.getDay() + 7) % 7)); // next Saturday (today if Saturday)
  var out = [];
  for (var i = 0; i < n; i++) { var d = new Date(start); d.setDate(start.getDate() + 7 * i); out.push(d); }
  return out;
}

function outreachEnsureEvents() {
  try {
    if (typeof EVENTS === "undefined" || !Array.isArray(EVENTS)) return 0;
    var have = {};
    EVENTS.forEach(function (e) { if (e && e.id) have[e.id] = 1; });
    function add(e) { if (!have[e.id]) { have[e.id] = 1; EVENTS.push(e); return 1; } return 0; }
    var added = 0;

    var MISSION = { venue: "Fort Wayne Rescue Mission", addr: "404 E Washington Blvd", zip: "46802", lat: 41.077783, lng: -85.133665 };
    var KINGS_ANCHOR = new Date("2026-10-03T12:00:00"); // Kingsman runs every other Saturday from this date

    outreachNextSaturdays(14).forEach(function (d) {
      var ds = outreachIso(d);
      // Feeding the Hungry — every Saturday at the mission
      added += add({ id: "evt-ftm-" + ds, audited: "2026-10-18",
        title: "Feeding the Hungry — free lunches & water bottles",
        venue: MISSION.venue, addr: MISSION.addr, zip: MISSION.zip, lat: MISSION.lat, lng: MISSION.lng,
        date: ds, time: "Saturdays, around 10–11am", cat: "food",
        desc: "Volunteers show up at the mission on Saturdays and hand out free lunches and reusable water bottles. Arrival time can shift a little, so try to be there by 10." });
      // Kingsman — every other Saturday
      var diff = Math.round((d - KINGS_ANCHOR) / 864e5);
      if (diff >= 0 && diff % 14 === 0) {
        added += add({ id: "evt-kingsman-" + ds, audited: "2026-10-18",
          title: "Kingsman free lunches (every 2 weeks)",
          venue: MISSION.venue, addr: MISSION.addr, zip: MISSION.zip, lat: MISSION.lat, lng: MISSION.lng,
          date: ds, time: "Saturday, around 11:30am", cat: "food",
          desc: "Kingsman shows up at the mission with free lunches every other Saturday around 11:30. Check which Saturday it is before you go." });
      }
      // Streetlife — first and last Saturday of the month
      var dim = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      if (d.getDate() <= 7 || d.getDate() + 7 > dim) {
        added += add({ id: "evt-streetlife-" + ds, audited: "2026-10-18",
          title: "Streetlife — free food, music & drinks",
          venue: "Freimann Park", addr: "Freimann Square, 300 E Main St", zip: "46802", lat: 41.0806, lng: -85.1375,
          date: ds, time: "11am–1pm (1st & last Saturday of the month)", cat: "food",
          desc: "Streetlife hands out free food and drinks, reusable cups and other items, with live music. Held the first and last Saturday of each month." });
      }
    });
    return added;
  } catch (e) { return 0; }
}

var OUTREACH_GUIDES = [
  { id: "budget-basics", audited: "2026-10-18", title: "Learning to budget", icon: "💵",
    intro: "A simple way to stretch very little money so the important bills get paid first.",
    where: "Free help: dial 211 for local financial coaching and bill assistance",
    bring: ["Every source of money you get (paycheck, benefits, gigs)", "A list of what you owe and when it's due", "A notebook or the Notes app on your phone"],
    steps: [
      "Write down everything coming in each month, even small amounts",
      "List your must-pay items first: housing, food, phone, bus fare, medicine",
      "Subtract must-pays from income. What's left is your wiggle room",
      "Track every dollar you spend for one week. Most people find leaks they didn't know about",
      "Pay small, urgent bills first (rent, utilities). Call creditors before you miss a payment and ask for a plan",
      "Put even $1–$5 a week aside as a cushion so one surprise doesn't sink you"
    ],
    tips: "Check SNAP, Lifeline phone and bus-pass guides in Haven. Every free resource you use is money you keep. Never pay anyone upfront to \"fix\" your credit." },
  { id: "free-wifi", audited: "2026-10-18", title: "Free WiFi: where and how to connect", icon: "📶",
    intro: "Free internet for job applications, benefits and staying in touch.",
    where: "Libraries, and many fast-food places and gas stations",
    steps: [
      "Libraries have free WiFi, usually with no password. Tap the 📶 Free WiFi category on the map",
      "Many fast-food places and some gas stations offer free WiFi. Look for the network name posted on the door or at the register",
      "If a network asks for a password, ask the cashier politely. Some print it on the receipt",
      "Buy something small if the place expects customers to, and don't stay for hours at a busy spot",
      "Haven doesn't list passwords, because places change them and may remove free WiFi if they're shared widely"
    ],
    tips: "On public WiFi, skip banking or entering Social Security numbers if you can. Log out of accounts when you leave." }
];

function outreachEnsureGuides() {
  try {
    if (typeof GUIDES === "undefined" || !Array.isArray(GUIDES)) return 0;
    var have = {};
    GUIDES.forEach(function (g) { if (g && g.id) have[g.id] = 1; });
    var added = 0;
    OUTREACH_GUIDES.forEach(function (g) {
      if (have[g.id]) return;
      GUIDES.push(g); have[g.id] = 1; added++;
    });
    return added;
  } catch (e) { return 0; }
}

outreachEnsureEvents();
outreachEnsureGuides();
