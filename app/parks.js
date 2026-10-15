/* Haven FW website — City parks (feature #40).
 * Ported from the Android app's haven-parks.js: 10 Fort Wayne city parks for the
 * "Parks & Hangouts" (hangout) category. In the app, pins were placed from street
 * addresses and nearby known spots, so they can be a little off.
 * Idempotent: skips any park whose id — or lowercased name — is already in
 * RESOURCES (same rule as the app). Loaded after app.js; wraps init() so the
 * parks land in RESOURCES before allPlaces is built (same pattern as the #24
 * donators feature). Fort Wayne only: no `area` field means areaOf() defaults
 * them to fort-wayne, matching the app. English-only per site convention. */
"use strict";
(function () {
  var PARK_HOURS = { 0: [360, 1380], 1: [360, 1380], 2: [360, 1380], 3: [360, 1380], 4: [360, 1380], 5: [360, 1380], 6: [360, 1380] }; /* 6 AM - 11 PM daily */
  var PARKS = [
    { id: "nuckols-memorial-park", name: "Nuckols Memorial Park", addr: "901 E Jefferson Blvd", zip: "46802", lat: 41.0762, lng: -85.1255,
      desc: "Small downtown-east park at Jefferson Blvd, Harmar St and Maumee Ave, with a memorial to John Nuckols, Fort Wayne's first Black city councilman. Open 6 AM-11 PM daily.",
      tags: ["park", "downtown", "donators"] },
    { id: "memorial-park", name: "Memorial Park", addr: "2301 Maumee Ave", zip: "46803", lat: 41.07692, lng: -85.10748,
      desc: "Big east-side park with a pool, splash pad, pavilion, playground, ball diamond and basketball courts, plus a memorial wall. Open 6 AM-11 PM daily.",
      tags: ["park", "splash pad", "pavilion", "playground"] },
    { id: "meyers-park", name: "Robert E. Meyers Park", addr: "Jefferson Blvd (next to Parkview Field)", zip: "46802", lat: 41.07345, lng: -85.14366,
      desc: "Small downtown park beside Parkview Field with an amphitheater and a splash pad. Open 6 AM-11 PM daily.",
      tags: ["park", "downtown", "splash pad"] },
    { id: "rockhill-park", name: "Rockhill Park", addr: "1400 Catalpa St", zip: "46802", lat: 41.073, lng: -85.17666,
      desc: "West-side park with a ball diamond, basketball court, playground, pavilion and a Rivergreenway connection. Open 6 AM-11 PM daily.",
      tags: ["park", "pavilion", "playground", "trail"] },
    { id: "mccormick-park", name: "McCormick Park", addr: "3530 Harvester St", zip: "46803", lat: 41.0642, lng: -85.0908,
      desc: "Southeast park with a pavilion, playground, basketball court, splash pad, restrooms and picnic tables. Open 6 AM-11 PM daily.",
      tags: ["park", "restrooms", "splash pad", "pavilion"] },
    { id: "lions-park", name: "Lions Park", addr: "3257 Carew St", zip: "46805", lat: 41.1065, lng: -85.1086,
      desc: "North-side park with a pavilion, playground, ball diamond, basketball and tennis courts, and four pickleball courts. Open 6 AM-11 PM daily.",
      tags: ["park", "pavilion", "playground", "restrooms"] },
    { id: "weisser-park", name: "Weisser Park", addr: "3000 S Hanna St", zip: "46806", lat: 41.05747, lng: -85.12827,
      desc: "Neighborhood park with a rec center, pavilion, playground, ball diamond, basketball and tennis courts. Open 6 AM-11 PM daily.",
      tags: ["park", "pavilion", "playground", "restrooms"] },
    { id: "courthouse-green", name: "Courthouse Green", addr: "Calhoun St & Berry St", zip: "46802", lat: 41.0792, lng: -85.1386,
      desc: "Downtown lawn with fountains and benches next to the Allen County Courthouse. A handy place to sit downtown. Open 6 AM-11 PM daily.",
      tags: ["park", "downtown", "benches"] },
    { id: "japanese-friendship-garden", name: "Japanese Friendship Garden", addr: "E Main St (between Arts United Center and the Museum of Art)", zip: "46802", lat: 41.0813, lng: -85.1366,
      desc: "Tiny quiet garden downtown, a gift from Fort Wayne's sister city Takaoka, Japan. Open 6 AM-11 PM daily.",
      tags: ["park", "downtown", "garden"] },
    { id: "hanna-homestead-park", name: "Hanna Homestead Park", addr: "1000 E Lewis St (Lewis St & Gay St)", zip: "46803", lat: 41.07, lng: -85.1235,
      desc: "Southeast-of-downtown park with a walking path, open-air shelter with restrooms, basketball court, ball diamond and playground. Open 6 AM-11 PM daily. Pin placed from the address, so it may be a little off.",
      tags: ["park", "restrooms", "pavilion", "playground"] }
  ];

  function parksEnsure() {
    try {
      if (typeof RESOURCES === "undefined" || !Array.isArray(RESOURCES)) return 0;
      var have = {};
      RESOURCES.forEach(function (r) {
        if (!r) return;
        if (r.id) have[r.id] = 1;
        if (r.name) have[String(r.name).toLowerCase()] = 1;
      });
      var added = 0;
      PARKS.forEach(function (p) {
        if (have[p.id] || have[p.name.toLowerCase()]) return;
        p.cats = ["hangout"];
        p.hours = PARK_HOURS;
        p.hoursText = "6 AM-11 PM daily";
        RESOURCES.push(p);
        have[p.id] = 1;
        have[p.name.toLowerCase()] = 1;
        added++;
      });
      return added;
    } catch (e) { return 0; }
  }

  /* Hook into the site boot: parks must be in RESOURCES before init() builds
     allPlaces. Guard flag keeps the wrap idempotent if the file loads twice. */
  try {
    if (typeof init === "function" && !init.__parksWrapped) {
      var _init40 = init;
      init = function () { try { parksEnsure(); } catch (e) {} _init40(); };
      init.__parksWrapped = true;
    } else if (typeof init === "function") {
      try { parksEnsure(); } catch (e) {}
    }
  } catch (e) {}
})();
