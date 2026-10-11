/* Haven FW plus-data: extra categories. Existing pins are tagged into them from their own
   name/tags/description text. No new addresses or phone numbers are invented here. */
"use strict";
(function () {
  if (typeof CATS === "undefined" || typeof RESOURCES === "undefined") return;

  // key: [icon, color, English, Spanish, search words, regex on name+tags, regex on name+tags+desc (optional)]
  const NEW = {
    seniors:    ["🧓", "#f59e0b", "Seniors (60+)", "Mayores (60+)", "senior elder older aging medicare meals on wheels aarp",
                 /senior|elder|older adult|60\+|65\+|aging|meals on wheels|medicare|aarp/, /senior|elder|older adult|60\+|65\+|meals on wheels/],
    veterans:   ["🎖️", "#60a5fa", "Veterans", "Veteranos", "veteran vet military va vfw legion",
                 /veteran|\bva\b|military|vfw|american legion|gi bill/, /veterans?\b/],
    disability: ["♿", "#34d399", "Disability Help", "Discapacidad", "disability disabled wheelchair blind deaf autism special needs",
                 /disab|wheelchair|special needs|paratransit|vocational rehab|blind|deaf|autis|accessib/],
    legal:      ["⚖️", "#a3a3e8", "Legal Help", "Ayuda legal", "legal lawyer attorney eviction expunge court",
                 /legal|attorney|lawyer|expunge|eviction|\bils\b/, /legal (aid|help|clinic|services?|advice|representation)|free (lawyer|attorney)s?|pro bono/],
    dentalvis:  ["🦷", "#67e8f9", "Dental & Vision", "Dental y visión", "dental dentist teeth vision eye glasses optometrist",
                 /dental|dentist|\bvision\b|eye ?care|eyeglass|optomet|glasses/],
    safety:     ["🛡️", "#fb7185", "Safety & DV", "Seguridad y violencia doméstica", "domestic violence abuse trafficking assault survivor safe",
                 /domestic violence|abuse|trafficking|sexual assault|survivor|\bdv\b|victim/],
    jobsedu:    ["🎓", "#38bdf8", "Jobs & Education", "Empleo y educación", "job work employment career ged school training literacy resume",
                 /\bjobs?\b|employment|resume|career|work ?force|job training|\bged\b|adult education|literacy|workone/],
    newcomers:  ["🌍", "#c4b5fd", "Immigrants & Refugees", "Inmigrantes y refugiados", "immigrant refugee esl interpreter language spanish burmese",
                 /immigrant|refugee|\besl\b|interpret|asylum|burmese|spanish[- ]speaking|bilingual/],
    utilities:  ["💡", "#fde047", "Rent & Utilities", "Renta y servicios", "rent utility utilities electric gas heap eviction weatherization",
                 /rent help|rent assist|utility|utilities|energy assist|\bheap\b|weatheriz|eviction prevention/],
    reentry:    ["🔓", "#94a3b8", "Re-entry & Records", "Reinserción y antecedentes", "reentry felon record expunge second chance",
                 /re-?entry|felon|criminal record|second chance|expunge/],
    library:    ["📚", "#818cf8", "Libraries", "Bibliotecas", "library books computers wifi",
                 /library/],
    pregnancy:  ["🤰", "#f9a8d4", "Pregnancy & Baby", "Embarazo y bebé", "pregnant pregnancy prenatal maternal baby wic diaper",
                 /pregnan|prenatal|maternal|\bwic\b|diaper|crib|infant/],
  };

  window.PLUS_CAT_WORDS = {};
  Object.entries(NEW).forEach(([k, v]) => {
    if (CATS[k]) return;
    CATS[k] = { label: v[2], icon: v[0], color: v[1], es: v[3] };
    window.PLUS_CAT_WORDS[k] = v[4];
    if (typeof STRINGS !== "undefined") {
      ["en", "my"].forEach(l => { if (STRINGS[l]) STRINGS[l]["cat_" + k] = v[2]; });
      if (STRINGS.es) STRINGS.es["cat_" + k] = v[3];
    }
  });

  // existing categories get search words too (used by the category-panel search box)
  const OLD_WORDS = {
    shelter: "shelter bed housing homeless sleep", food: "food pantry groceries", meals: "meal hot lunch dinner breakfast soup kitchen",
    health: "clinic doctor medical nurse", day: "shower day center", thrift: "thrift cheap clothes", bus: "bus transit pass ride",
    benefits: "benefits snap medicaid office", recovery: "recovery addiction sober rehab", cash: "cash money aid financial",
    mental: "mental health counseling therapy crisis", youth: "youth teen young", pets: "pets dog cat animal vet",
    wifi: "wifi internet computer", charge: "charge phone outlet", bathroom: "restroom toilet bathroom", water: "water drink fountain",
  };
  Object.entries(OLD_WORDS).forEach(([k, w]) => { if (!window.PLUS_CAT_WORDS[k]) window.PLUS_CAT_WORDS[k] = w; });

  // tag existing pins (added after the primary category so pin colors/icons do not change)
  RESOURCES.forEach(r => {
    const nt = (r.name + " " + (r.tags || []).join(" ")).toLowerCase();
    const all = nt + " " + (r.desc || "").toLowerCase();
    Object.entries(NEW).forEach(([k, v]) => {
      if (r.cats.includes(k)) return;
      if (v[5].test(nt) || (v[6] && v[6].test(all))) r.cats.push(k);
    });
  });
})();
