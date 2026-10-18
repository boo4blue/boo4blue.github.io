/* Haven FW website - plus categories (feature #37).
 * Ported from the Android app's plus-data.js: 12 extra "special needs" categories.
 * Existing places are tagged into them from their own name/tags/description text -
 * no new addresses or phone numbers are invented here. Tags are APPENDED after the
 * primary category, so map pin icons/colors never change.
 * English-only labels (site convention); the app's Spanish labels are not ported.
 * Uses app.js globals: FILTER_CATS, PIN_EMOJI, PIN_COLOR, RESOURCES, init.
 * This file loads after app.js; the fetch+eval of the data file resolves later,
 * so the FILTER_CATS merge below always lands before init() builds the filter UI.
 * Tagging runs AFTER the wrapped init() so volunteer entries (merged at the start
 * of init by volunteer.js) get tagged too. Idempotent via per-entry cat guard.
 */
"use strict";
var PLUS_CATS = {
  seniors:    ["🧓", "#f59e0b", "Seniors (60+)",
               /senior|elder|older adult|60\+|65\+|aging|meals on wheels|medicare|aarp/,
               /senior|elder|older adult|60\+|65\+|meals on wheels/],
  veterans:   ["🎖️", "#60a5fa", "Veterans",
               /veteran|\bva\b|military|vfw|american legion|gi bill/,
               /veterans?\b/],
  disability: ["♿", "#34d399", "Disability Help",
               /disab|wheelchair|special needs|paratransit|vocational rehab|blind|deaf|autis|accessib/],
  legal:      ["⚖️", "#a3a3e8", "Legal Help",
               /legal|attorney|lawyer|expunge|eviction|\bils\b/,
               /legal (aid|help|clinic|services?|advice|representation)|free (lawyer|attorney)s?|pro bono/],
  dentalvis:  ["🦷", "#67e8f9", "Dental & Vision",
               /dental|dentist|\bvision\b|eye ?care|eyeglass|optomet|glasses/],
  safety:     ["🛡️", "#fb7185", "Safety & DV",
               /domestic violence|abuse|trafficking|sexual assault|survivor|\bdv\b|victim/],
  jobsedu:    ["🎓", "#38bdf8", "Jobs & Education",
               /\bjobs?\b|employment|resume|career|work ?force|job training|\bged\b|adult education|literacy|workone/],
  newcomers:  ["🌍", "#c4b5fd", "Immigrants & Refugees",
               /immigrant|refugee|\besl\b|interpret|asylum|burmese|spanish[- ]speaking|bilingual/],
  utilities:  ["💡", "#fde047", "Rent & Utilities",
               /rent help|rent assist|utility|utilities|energy assist|\bheap\b|weatheriz|eviction prevention/],
  reentry:    ["🔓", "#94a3b8", "Re-entry & Records",
               /re-?entry|felon|criminal record|second chance|expunge/],
  library:    ["📚", "#818cf8", "Libraries",
               /library/],
  pregnancy:  ["🤰", "#f9a8d4", "Pregnancy & Baby",
               /pregnan|prenatal|maternal|\bwic\b|diaper|crib|infant/]
};

/* merge the 12 categories into the site's filter/pin tables */
try {
  if (typeof FILTER_CATS !== "undefined") {
    Object.keys(PLUS_CATS).forEach(function (k) {
      if (FILTER_CATS[k]) return;
      FILTER_CATS[k] = PLUS_CATS[k][0] + " " + PLUS_CATS[k][2];
    });
  }
  if (typeof PIN_EMOJI !== "undefined") {
    Object.keys(PLUS_CATS).forEach(function (k) {
      if (!PIN_EMOJI[k]) PIN_EMOJI[k] = PLUS_CATS[k][0];
    });
  }
  if (typeof PIN_COLOR !== "undefined") {
    Object.keys(PLUS_CATS).forEach(function (k) {
      if (!PIN_COLOR[k]) PIN_COLOR[k] = PLUS_CATS[k][1];
    });
  }
} catch (e) {}

/* tag one entry; returns number of cats added */
function plusTagEntry(r) {
  var added = 0;
  try {
    var nt = (r.name + " " + (r.tags || []).join(" ")).toLowerCase();
    var all = nt + " " + (r.desc || "").toLowerCase();
    Object.keys(PLUS_CATS).forEach(function (k) {
      var v = PLUS_CATS[k];
      if ((r.cats || []).indexOf(k) >= 0) return;
      if (v[3].test(nt) || (v[4] && v[4].test(all))) {
        (r.cats = r.cats || []).push(k);
        added++;
      }
    });
  } catch (e) {}
  return added;
}

/* tag every loaded resource; safe to call repeatedly */
function plusTagAll() {
  var n = 0;
  try {
    if (typeof RESOURCES === "undefined" || !RESOURCES) return 0;
    RESOURCES.forEach(function (r) { n += plusTagEntry(r); });
  } catch (e) {}
  return n;
}

/* run tagging after init() so volunteer-merged entries are covered too */
try {
  var _plusOrigInit = window.init;
  if (typeof _plusOrigInit === "function") {
    window.init = function () {
      var out = _plusOrigInit.apply(this, arguments);
      plusTagAll();
      return out;
    };
  }
} catch (e) {}

window._plusApi = { PLUS_CATS: PLUS_CATS, plusTagEntry: plusTagEntry, plusTagAll: plusTagAll };
