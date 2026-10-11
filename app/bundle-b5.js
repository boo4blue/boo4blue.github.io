/* === guide-add.js === */
/* Haven FW guide-add: listings from the Rescue Mission resource guide (Mar 2026 + booklet) that were not yet in the app.
   Pins on a few are approximate (placed from nearby known addresses): use the street address and call ahead. */
"use strict";
(function () {
  var RES = [
 {
  "id": "dupont-hospital",
  "name": "Dupont Hospital (Emergency Room)",
  "cats": [
   "health"
  ],
  "addr": "2520 E Dupont Rd",
  "zip": "46825",
  "lat": 41.1745,
  "lng": -85.1078,
  "phone": "(260) 416-3000",
  "phoneHref": "+12604163000",
  "desc": "24/7 emergency room and full hospital on the north side. Emergency rooms must see and stabilize you whether or not you can pay or have insurance. Ask about financial assistance (charity care) afterward so a bill doesn't follow you.",
  "tags": [
   "Hospital",
   "ER",
   "24/7 emergency"
  ],
  "web": "https://www.theduponthospital.com",
  "hours": {
   "0": [
    0,
    1440
   ],
   "1": [
    0,
    1440
   ],
   "2": [
    0,
    1440
   ],
   "3": [
    0,
    1440
   ],
   "4": [
    0,
    1440
   ],
   "5": [
    0,
    1440
   ],
   "6": [
    0,
    1440
   ]
  },
  "hoursText": "Emergency room open 24/7."
 },
 {
  "id": "lutheran-hospital",
  "name": "Lutheran Hospital (Emergency Room)",
  "cats": [
   "health"
  ],
  "addr": "7950 W Jefferson Blvd",
  "zip": "46804",
  "lat": 41.038897,
  "lng": -85.249476,
  "phone": "(260) 435-7001",
  "phoneHref": "+12604357001",
  "desc": "24/7 emergency room and full hospital on the west side. Emergency rooms must see and stabilize you whether or not you can pay or have insurance. Ask about financial assistance (charity care) afterward so a bill doesn't follow you. Lutheran also has a financial assistance program listed in Haven.",
  "tags": [
   "Hospital",
   "ER",
   "24/7 emergency"
  ],
  "web": "https://www.lutheranhospital.com",
  "hours": {
   "0": [
    0,
    1440
   ],
   "1": [
    0,
    1440
   ],
   "2": [
    0,
    1440
   ],
   "3": [
    0,
    1440
   ],
   "4": [
    0,
    1440
   ],
   "5": [
    0,
    1440
   ],
   "6": [
    0,
    1440
   ]
  },
  "hoursText": "Emergency room open 24/7."
 },
 {
  "id": "lutheran-downtown-hospital",
  "name": "Lutheran Downtown Hospital",
  "cats": [
   "health"
  ],
  "addr": "702 Van Buren St",
  "zip": "46802",
  "lat": 41.07846,
  "lng": -85.150306,
  "phone": "(260) 425-3000",
  "phoneHref": "+12604253000",
  "desc": "Downtown hospital close to the shelters. Call before you go to ask whether the emergency room is open. Emergency rooms must see and stabilize you whether or not you can pay or have insurance. Ask about financial assistance (charity care) afterward so a bill doesn't follow you.",
  "tags": [
   "Hospital",
   "Downtown"
  ],
  "web": "https://www.lutherandowntownhospital.com",
  "hoursText": "Call to confirm emergency room hours."
 },
 {
  "id": "stellhorn-er",
  "name": "Stellhorn ER",
  "cats": [
   "health"
  ],
  "addr": "6515 Stellhorn Rd",
  "zip": "46815",
  "lat": 41.1224,
  "lng": -85.06,
  "phone": "(260) 425-4200",
  "phoneHref": "+12604254200",
  "desc": "Emergency room on the northeast side (listed in the Rescue Mission booklet). Call to confirm hours before you go. Emergency rooms must see and stabilize you whether or not you can pay or have insurance. Ask about financial assistance (charity care) afterward so a bill doesn't follow you.",
  "tags": [
   "ER",
   "Emergency"
  ],
  "hoursText": "Call to confirm hours."
 },
 {
  "id": "parkview-randallia-hospital",
  "name": "Parkview Hospital Randallia (ER & Psych ER)",
  "cats": [
   "health",
   "mental"
  ],
  "addr": "2200 Randallia Dr",
  "zip": "46805",
  "lat": 41.095697,
  "lng": -85.109792,
  "phone": "(260) 373-4000",
  "phoneHref": "+12603734000",
  "desc": "Hospital with a 24/7 emergency room. Psychiatric emergency evaluations happen here. Parkview 24-hour HelpLine: (260) 471-9440 or (800) 284-8439. Emergency rooms must see and stabilize you whether or not you can pay or have insurance. Ask about financial assistance (charity care) afterward so a bill doesn't follow you.",
  "tags": [
   "Hospital",
   "ER",
   "Psych ER",
   "24/7 emergency"
  ],
  "web": "https://www.parkview.com/locations/parkview-hospital-randallia",
  "hours": {
   "0": [
    0,
    1440
   ],
   "1": [
    0,
    1440
   ],
   "2": [
    0,
    1440
   ],
   "3": [
    0,
    1440
   ],
   "4": [
    0,
    1440
   ],
   "5": [
    0,
    1440
   ],
   "6": [
    0,
    1440
   ]
  },
  "hoursText": "Emergency room open 24/7."
 },
 {
  "id": "parkview-regional-medical-center",
  "name": "Parkview Regional Medical Center (PRMC)",
  "cats": [
   "health"
  ],
  "addr": "11109 Parkview Plaza Dr, Entrance 1",
  "zip": "46845",
  "lat": 41.190139,
  "lng": -85.100542,
  "phone": "(260) 266-1000",
  "phoneHref": "+12602661000",
  "desc": "Large hospital on the far north side with a 24/7 emergency room. Toll free (888) 480-0012. It is far from the bus lines, so plan your ride. Emergency rooms must see and stabilize you whether or not you can pay or have insurance. Ask about financial assistance (charity care) afterward so a bill doesn't follow you. Parkview financial assistance is listed separately in Haven.",
  "tags": [
   "Hospital",
   "ER",
   "24/7 emergency"
  ],
  "web": "https://www.parkview.com/locations/parkview-regional-medical-center",
  "hours": {
   "0": [
    0,
    1440
   ],
   "1": [
    0,
    1440
   ],
   "2": [
    0,
    1440
   ],
   "3": [
    0,
    1440
   ],
   "4": [
    0,
    1440
   ],
   "5": [
    0,
    1440
   ],
   "6": [
    0,
    1440
   ]
  },
  "hoursText": "Emergency room open 24/7."
 },
 {
  "id": "meridian-health-services",
  "name": "Meridian Health Services",
  "cats": [
   "mental",
   "recovery"
  ],
  "addr": "4545 W Jefferson Blvd",
  "zip": "46804",
  "lat": 41.0679,
  "lng": -85.1989,
  "phone": "(260) 436-0932",
  "phoneHref": "+12604360932",
  "desc": "Counseling and behavioral-health services, listed in the Rescue Mission resource guide under mental and behavioral health. Call to ask about services, costs and sliding-scale options.",
  "tags": [
   "Counseling",
   "Mental health"
  ],
  "hoursText": "Call for current hours."
 },
 {
  "id": "cross-connections-counseling",
  "name": "Cross Connections Counseling",
  "cats": [
   "mental"
  ],
  "addr": "4618 E State Blvd, Suite 300",
  "zip": "46815",
  "lat": 41.098,
  "lng": -85.081,
  "phone": "(260) 373-0213",
  "phoneHref": "+12603730213",
  "desc": "Counseling practice listed in the Rescue Mission resource guide. Call to ask about costs, insurance and any sliding-scale help.",
  "tags": [
   "Counseling",
   "Mental health"
  ],
  "web": "https://www.crossconnectionscounseling.com",
  "hoursText": "Call for current hours."
 },
 {
  "id": "headwaters-counseling",
  "name": "Headwaters Counseling",
  "cats": [
   "mental"
  ],
  "addr": "2712 S Calhoun St",
  "zip": "46807",
  "lat": 41.0603,
  "lng": -85.138,
  "phone": "(260) 744-4326",
  "phoneHref": "+12607444326",
  "desc": "Counseling center listed in the Rescue Mission resource guide, on the Calhoun St bus corridor. Call to ask about costs and sliding-scale help.",
  "tags": [
   "Counseling",
   "Mental health"
  ],
  "hoursText": "Call for current hours."
 },
 {
  "id": "crosswinds-counseling",
  "name": "Crosswinds Counseling",
  "cats": [
   "mental"
  ],
  "addr": "4150 Illinois Rd",
  "zip": "46804",
  "lat": 41.075034,
  "lng": -85.195304,
  "phone": "(260) 271-7165",
  "phoneHref": "+12602717165",
  "desc": "Counseling services listed in the resource booklet. Toll free (877) 594-9204. Call to ask about costs and sliding-scale help.",
  "tags": [
   "Counseling",
   "Mental health"
  ],
  "web": "https://www.crosswindscounseling.org",
  "hoursText": "Call for current hours."
 },
 {
  "id": "stillwater-hospice",
  "name": "Stillwater Hospice",
  "cats": [
   "health"
  ],
  "addr": "5910 Homestead Rd",
  "zip": "46814",
  "lat": 41.029886,
  "lng": -85.28562,
  "phone": "(260) 435-3222",
  "phoneHref": "+12604353222",
  "desc": "Hospice care for people near the end of life and their families. Also offers grief support (see Peggy F. Murphy Community Grief Center). Toll free (800) 288-4111.",
  "tags": [
   "Hospice",
   "Grief support"
  ],
  "web": "https://www.stillwater-hospice.org",
  "hoursText": "Call for current hours."
 },
 {
  "id": "oak-street-health-calhoun",
  "name": "Oak Street Health — S Calhoun St",
  "cats": [
   "health"
  ],
  "addr": "3916 S Calhoun St",
  "zip": "46807",
  "lat": 41.0492,
  "lng": -85.137,
  "phone": "(260) 328-1341",
  "phoneHref": "+12603281341",
  "desc": "Second Fort Wayne primary-care clinic for Medicare patients (the other is 436 E Washington Blvd). On the Calhoun St bus route. Call to ask who qualifies.",
  "tags": [
   "Primary care",
   "Medicare"
  ],
  "web": "https://www.oakstreethealth.com",
  "hoursText": "Call for current hours."
 },
 {
  "id": "consumer-credit-counseling",
  "name": "Consumer Credit Counseling",
  "cats": [
   "cash"
  ],
  "addr": "4105 W Jefferson Blvd",
  "zip": "46804",
  "lat": 41.0687,
  "lng": -85.1934,
  "phone": "(260) 432-8200",
  "phoneHref": "+12604328200",
  "desc": "Help with debt, budgeting and money problems, listed in the Rescue Mission guide under general assistance. Call to ask about fees before you sign up for anything.",
  "tags": [
   "Debt help",
   "Budgeting"
  ],
  "hoursText": "Call for current hours."
 },
 {
  "id": "dav-transportation",
  "name": "DAV Transportation (Veterans)",
  "cats": [
   "veterans",
   "bus"
  ],
  "addr": "2121 Lake Ave",
  "zip": "46805",
  "lat": 41.090704,
  "lng": -85.10933,
  "phone": "(260) 421-1033",
  "phoneHref": "+12604211033",
  "desc": "Disabled American Veterans ride service at the VA hospital campus, for veterans who need a ride to VA appointments. Call ahead to ask about the schedule and sign-up rules.",
  "tags": [
   "Veterans",
   "Rides",
   "VA"
  ],
  "hoursText": "Call for current hours."
 },
 {
  "id": "voa-liberty-landing",
  "name": "VOA Liberty Landing (Veterans)",
  "cats": [
   "veterans"
  ],
  "addr": "2833 S Calhoun St",
  "zip": "46807",
  "lat": 41.059231,
  "lng": -85.138076,
  "phone": "(260) 755-6154",
  "phoneHref": "+12607556154",
  "desc": "Volunteers of America program for veterans, listed in the Veterans section of the resource booklet. Call to ask what it offers and whether you qualify.",
  "tags": [
   "Veterans",
   "VOA"
  ],
  "web": "https://www.voaohin.org",
  "hoursText": "Call for current hours."
 },
 {
  "id": "allen-county-bar-association",
  "name": "Allen County Bar Association",
  "cats": [
   "legal"
  ],
  "addr": "924 S Calhoun St",
  "zip": "46802",
  "lat": 41.0762,
  "lng": -85.1385,
  "phone": "(260) 423-2359",
  "phoneHref": "+12604232359",
  "desc": "Free Legal Line for general legal questions, Tuesdays 5–7 PM: (260) 423-2358. Office line (260) 423-2359.",
  "tags": [
   "Legal line",
   "Free advice"
  ],
  "web": "https://www.allencountybar.org",
  "hoursText": "Legal Line: Tuesdays 5–7 PM at (260) 423-2358."
 },
 {
  "id": "fort-wayne-parks-recreation",
  "name": "Fort Wayne Parks & Recreation",
  "cats": [
   "hangout"
  ],
  "addr": "705 E State Blvd",
  "zip": "46805",
  "lat": 41.0965,
  "lng": -85.13,
  "phone": "(260) 427-6000",
  "phoneHref": "+12604276000",
  "desc": "City parks office: park info, free and low-cost programs, and where to find pools, splash pads and community centers.",
  "tags": [
   "Parks",
   "Rec centers"
  ],
  "web": "https://www.fortwayneparks.org",
  "hoursText": "Office; call for hours."
 },
 {
  "id": "fort-wayne-trails",
  "name": "Fort Wayne Trails",
  "cats": [
   "hangout"
  ],
  "addr": "300 E Main St",
  "zip": "46802",
  "lat": 41.0807,
  "lng": -85.1357,
  "phone": "(260) 969-0079",
  "phoneHref": "+12609690079",
  "desc": "Info on the city trail network (Rivergreenway and more): free places to walk, bike and sit outdoors.",
  "tags": [
   "Trails",
   "Walking",
   "Outdoors"
  ],
  "web": "https://fwtrails.org",
  "hoursText": "Office; call for hours."
 },
 {
  "id": "fwcs-health-wellness",
  "name": "FWCS Health & Wellness Services",
  "cats": [
   "health",
   "youth"
  ],
  "addr": "1200 S Clinton St",
  "zip": "46802",
  "lat": 41.0745,
  "lng": -85.1375,
  "phone": "(260) 467-1080",
  "phoneHref": "+12604671080",
  "desc": "Fort Wayne Community Schools health office: school nurses, vaccines, and health help for students. See also FWCS Families in Transition for students without stable housing.",
  "tags": [
   "Students",
   "School health"
  ],
  "web": "https://www.fortwayneschools.org/departments/health-wellness",
  "hoursText": "Call for current hours."
 },
 {
  "id": "building-a-stronger-family",
  "name": "Building a Stronger Family",
  "cats": [
   "youth"
  ],
  "addr": "921 E Dupont Rd, #909",
  "zip": "46825",
  "lat": 41.1778,
  "lng": -85.1297,
  "phone": "(260) 797-5892",
  "phoneHref": "+12607975892",
  "desc": "Parenting and family support listed in the Support & Education section of the resource booklet. Call to ask about classes and home visits.",
  "tags": [
   "Parenting",
   "Family support"
  ],
  "web": "https://www.buildingastrongerfamily.org",
  "hoursText": "Call for current hours."
 },
 {
  "id": "ymca-greater-fort-wayne-office",
  "name": "YMCA of Greater Fort Wayne (Association Office)",
  "cats": [
   "youth"
  ],
  "addr": "347 W Berry St, Suite 500",
  "zip": "46802",
  "lat": 41.078137,
  "lng": -85.144429,
  "phone": "(260) 422-6488",
  "phoneHref": "+12604226488",
  "desc": "YMCA main office. Call to ask about financial assistance for memberships and youth programs. The Central Branch is listed separately in Haven.",
  "tags": [
   "YMCA",
   "Financial assistance"
  ],
  "web": "https://www.fwymca.org",
  "hoursText": "Office; call for hours."
 }
];
  var JOBS_ADD = [
 {
  "id": "job-labor-ready",
  "name": "Labor Ready",
  "type": "day",
  "addr": "3968 W Jefferson Blvd",
  "zip": "46804",
  "lat": 41.0692,
  "lng": -85.1916,
  "phone": "(260) 745-4577",
  "phoneHref": "+12607454577",
  "desc": "Day-labor staffing listed in the Rescue Mission guide under employment help. Call first to ask what to bring and when to arrive.",
  "tags": [
   "Day labor",
   "General labor"
  ]
 },
 {
  "id": "job-labor-works",
  "name": "Labor Works",
  "type": "day",
  "addr": "2028 S Calhoun St",
  "zip": "46807",
  "lat": 41.0669,
  "lng": -85.1379,
  "phone": "(260) 745-7575",
  "phoneHref": "+12607457575",
  "desc": "Day-labor and temp staffing on the Calhoun St bus line. Call first to ask what to bring and when to arrive.",
  "tags": [
   "Day labor",
   "Temp"
  ]
 },
 {
  "id": "job-kastle-krew",
  "name": "Kastle Krew Staffing & Transportation",
  "type": "agency",
  "addr": "4310 Lake Ave",
  "zip": "46815",
  "lat": 41.0909,
  "lng": -85.08,
  "phone": "(260) 206-4792",
  "phoneHref": "+12602064792",
  "desc": "Staffing agency that also offers rides to work, listed in the Rescue Mission guide. Call to ask about openings and the transportation service.",
  "tags": [
   "Temp",
   "Transportation to work"
  ]
 }
];
  var HOT = [
 {
  "name": "Hickory Treatment Centers",
  "desc": "Substance-use treatment admissions and information",
  "href": "tel:+18006042117",
  "icon": "💜"
 },
 {
  "name": "LOOKup Indiana",
  "desc": "24/7 mental-health and behavioral-health help: call 877-257-0208 or text LOOKUP to 494949",
  "href": "tel:+18772570208",
  "icon": "🧠"
 },
 {
  "name": "National Human Trafficking Hotline",
  "desc": "24/7 confidential help. Call 888-373-7888 or text HELP to 233733",
  "href": "tel:+18883737888",
  "icon": "🛡️"
 }
];
  window.HAVEN_PHONELINES = [
 {
  "name": "Empower Works",
  "desc": "Employment help — listed in the Rescue Mission guide. Call for details",
  "href": "tel:+12604085210",
  "icon": "💼"
 },
 {
  "name": "Countilink",
  "desc": "County transportation service — call for service area, fares and how to book",
  "href": "tel:+12604242010",
  "icon": "🚐"
 },
 {
  "name": "Field of Dreams (youth transitional housing)",
  "desc": "Transitional housing for youth — call to ask about openings",
  "href": "tel:+12606002836",
  "icon": "🏠"
 },
 {
  "name": "YMCA Youth Services Bureau — Safe Place",
  "desc": "Help for homeless youth. Call 260-449-7511, or text SAFE and your location to 44357",
  "href": "tel:+12604497511",
  "icon": "🧑‍🎓"
 },
 {
  "name": "Women's Care Center hotline (Español/English)",
  "desc": "Pregnancy help hotline in Spanish and English",
  "href": "tel:+15742342341",
  "icon": "🤱"
 },
 {
  "name": "La Leche League of Indiana",
  "desc": "Breastfeeding support and Fort Wayne groups",
  "href": "tel:+12602556574",
  "icon": "🍼"
 },
 {
  "name": "Fertility Care Specialist of NE Indiana",
  "desc": "146 N Rufus St, New Haven — call for services and costs",
  "href": "tel:+12604946444",
  "icon": "🩺"
 },
 {
  "name": "Allen County Healthy Homes Program",
  "desc": "2242 Carroll Rd — home health and safety help. Lead screening: 260-449-7504",
  "href": "tel:+12604497459",
  "icon": "🏡"
 },
 {
  "name": "Purdue Extension — Allen County",
  "desc": "4001 Crescent Ave — nutrition, gardening and family classes",
  "href": "tel:+12604816826",
  "icon": "🌱"
 },
 {
  "name": "Multi-County Medical Outreach Clinic",
  "desc": "885 Connexion Way, Columbia City (formerly Wolf Lake Free Health Clinic) — free clinic. Call for hours",
  "href": "tel:+12605641946",
  "icon": "🩺"
 },
 {
  "name": "Park Center — other sites",
  "desc": "1909 Carew St and 2710 Lake Ave: call 260-373-8000",
  "href": "tel:+12603738000",
  "icon": "🧠"
 },
 {
  "name": "New Hope Farms",
  "desc": "Food listing at 2715 Brooklyn Ave — no phone given. Tap to open the address in Maps",
  "href": "geo:0,0?q=2715%20Brooklyn%20Ave%2C%20Fort%20Wayne%2C%20IN",
  "icon": "🥕"
 },
 {
  "name": "Indiana Free Legal Answers",
  "desc": "Ask a volunteer attorney a civil legal question online, free if you qualify (no criminal cases)",
  "href": "https://indiana.freelegalanswers.org/",
  "icon": "⚖️"
 }
];
  function have(list, id) { return list.some(function (x) { return x.id === id; }); }
  if (typeof RESOURCES !== "undefined") RES.forEach(function (r) { if (!have(RESOURCES, r.id)) RESOURCES.push(r); });
  if (typeof JOBS !== "undefined") JOBS_ADD.forEach(function (j) { if (!have(JOBS, j.id)) JOBS.push(j); });
  if (typeof HOTLINES !== "undefined") HOT.forEach(function (h) { if (!HOTLINES.some(function (x) { return x.href === h.href; })) HOTLINES.push(h); });
})();




/* === plus-data.js === */
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




/* === haven-adds.js === */
/* Haven additions: recurring Saturday outreach events, free-stuff/wifi/budget guides.
   Recurring events are generated from today's date, so they never go stale. */
(function () {
  function iso(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  var start = new Date(); start.setHours(12, 0, 0, 0);
  start.setDate(start.getDate() + ((6 - start.getDay() + 7) % 7)); // next Saturday (today if Saturday)
  var sats = [];
  for (var i = 0; i < 14; i++) { var d = new Date(start); d.setDate(start.getDate() + 7 * i); sats.push(d); }
  var have = {}; EVENTS.forEach(function (e) { have[e.id] = 1; });
  function add(e) { if (!have[e.id]) { have[e.id] = 1; EVENTS.push(e); } }

  var MISSION = { venue: "Fort Wayne Rescue Mission", addr: "404 E Washington Blvd", zip: "46802", lat: 41.077783, lng: -85.133665 };
  var KINGS_ANCHOR = new Date("2026-10-03T12:00:00");

  sats.forEach(function (d) {
    var ds = iso(d);
    // Feeding the Hungry — every Saturday at the mission
    add({ id: "evt-ftm-" + ds, title: "Feeding the Hungry — free lunches & water bottles", venue: MISSION.venue, addr: MISSION.addr, zip: MISSION.zip, lat: MISSION.lat, lng: MISSION.lng,
      date: ds, time: "Saturdays, around 10–11am", cat: "food",
      desc: "Volunteers show up at the mission on Saturdays and hand out free lunches and reusable water bottles. Arrival time can shift a little, so try to be there by 10." });
    // Kingsman — every other Saturday
    var diff = Math.round((d - KINGS_ANCHOR) / 864e5);
    if (diff >= 0 && diff % 14 === 0) {
      add({ id: "evt-kingsman-" + ds, title: "Kingsman free lunches (every 2 weeks)", venue: MISSION.venue, addr: MISSION.addr, zip: MISSION.zip, lat: MISSION.lat, lng: MISSION.lng,
        date: ds, time: "Saturday, around 11:30am", cat: "food",
        desc: "Kingsman shows up at the mission with free lunches every other Saturday around 11:30. Check which Saturday it is before you go." });
    }
    // Streetlife — first and last Saturday of the month
    var dim = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    if (d.getDate() <= 7 || d.getDate() + 7 > dim) {
      add({ id: "evt-streetlife-" + ds, title: "Streetlife — free food, music & drinks", venue: "Freimann Park", addr: "Freimann Square, 300 E Main St", zip: "46802", lat: 41.0806, lng: -85.1375,
        date: ds, time: "11am–1pm (1st & last Saturday of the month)", cat: "food",
        desc: "Streetlife hands out free food and drinks, reusable cups and other items, with live music. Held the first and last Saturday of each month." });
    }
  });

  // Guides
  var G = [
    { id: "budget-basics", title: "Learning to budget", icon: "💵",
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
    { id: "free-water-bottles", title: "Free reusable water bottles", icon: "💧",
      intro: "Where to pick up a free reusable bottle so you always have water on you.",
      where: "Parkview (ask at a Parkview location) and Saturday outreach at the mission",
      steps: [
        "Parkview gives out free reusable water bottles. Ask at a Parkview location whether they have them in stock",
        "Feeding the Hungry hands out water bottles with lunches at the mission on Saturdays (see Events)",
        "Refill for free at the water spots on Haven's map (tap the 💧 Drinking Water category)"
      ],
      tips: "Supplies run out, so go early and be polite. A bottle you already own is just as good for refilling at the free water spots." },
    { id: "free-wifi", title: "Free WiFi: where and how to connect", icon: "📶",
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
  var gh = {}; GUIDES.forEach(function (g) { gh[g.id] = 1; });
  G.forEach(function (g) { if (!gh[g.id]) GUIDES.push(g); });
})();




/* === haven-i18n-adds.js === */
/* Spanish + Burmese text for the budget, water-bottle and wifi guides. Burmese: please have a native speaker review. */
(function () {
  if (typeof GUIDE_ES !== "undefined") {
    GUIDE_ES["budget-basics"] = { title: "Aprender a hacer un presupuesto",
      intro: "Una forma sencilla de estirar muy poco dinero para pagar primero lo más importante.",
      bring: ["Todas tus fuentes de dinero (sueldo, beneficios, trabajitos)", "Una lista de lo que debes y cuándo vence", "Una libreta o la app de Notas del teléfono"],
      steps: ["Anota todo lo que entra cada mes, aunque sean cantidades pequeñas", "Haz primero la lista de pagos obligatorios: vivienda, comida, teléfono, pasaje de autobús, medicinas", "Resta los pagos obligatorios de tus ingresos. Lo que sobra es tu margen", "Anota cada dólar que gastes durante una semana. Casi todos descubren gastos que no sabían", "Paga primero las cuentas urgentes (renta, servicios). Llama a los acreedores antes de atrasarte y pide un plan", "Aparta aunque sea $1–$5 por semana como colchón para que una sorpresa no te hunda"],
      tips: "Revisa las guías de SNAP, teléfono Lifeline y pases de autobús en Haven. Cada recurso gratis que uses es dinero que te quedas. Nunca pagues por adelantado a nadie para \"arreglar\" tu crédito." };
    GUIDE_ES["free-water-bottles"] = { title: "Botellas de agua reutilizables gratis",
      intro: "Dónde conseguir una botella reutilizable gratis para tener siempre agua contigo.",
      steps: ["Parkview regala botellas reutilizables. Pregunta en un local de Parkview si tienen en existencia", "Feeding the Hungry reparte botellas de agua con el almuerzo en la misión los sábados (mira Eventos)", "Rellénala gratis en los puntos de agua del mapa de Haven (toca la categoría 💧 Drinking Water)"],
      tips: "Los suministros se acaban, así que ve temprano y sé amable. Una botella que ya tengas sirve igual para rellenar en los puntos de agua gratis." };
    GUIDE_ES["free-wifi"] = { title: "WiFi gratis: dónde y cómo conectarte",
      intro: "Internet gratis para solicitar empleo, beneficios y mantenerte en contacto.",
      steps: ["Las bibliotecas tienen WiFi gratis, normalmente sin contraseña. Toca la categoría 📶 Free WiFi en el mapa", "Muchos restaurantes de comida rápida y algunas gasolineras ofrecen WiFi gratis. Busca el nombre de la red en la puerta o en la caja", "Si la red pide contraseña, pregúntale amablemente al cajero. Algunos la imprimen en el recibo", "Compra algo pequeño si el lugar lo espera de sus clientes, y no te quedes horas en un lugar concurrido", "Haven no publica contraseñas, porque los lugares las cambian y pueden quitar el WiFi gratis si se comparten mucho"],
      tips: "En WiFi público evita entrar al banco o escribir tu número de Seguro Social. Cierra tus sesiones al irte." };
  }
  if (typeof GUIDE_MY !== "undefined") {
    GUIDE_MY["budget-basics"] = { title: "ဘတ်ဂျက်ချနည်း သင်ယူခြင်း",
      intro: "ငွေနည်းနည်းနဲ့ အရေးကြီးတဲ့ ငွေတောင်းခံလွှာတွေကို အရင်ပေးနိုင်ဖို့ လွယ်ကူတဲ့ နည်းလမ်း။",
      bring: ["ရရှိတဲ့ ငွေအရင်းအမြစ်အားလုံး (လစာ၊ ထောက်ပံ့ငွေ၊ ယာယီအလုပ်)", "ပေးစရာရှိတာတွေနဲ့ ပေးရမယ့်ရက် စာရင်း", "မှတ်စုစာအုပ် ဒါမှမဟုတ် ဖုန်းထဲက Notes app"],
      steps: ["တစ်လအတွင်း ဝင်ငွေအားလုံးကို နည်းနည်းလေးဖြစ်ရင်တောင် ရေးမှတ်ပါ", "မဖြစ်မနေပေးရမယ့်ဟာတွေကို အရင်စာရင်းပြုစုပါ - အိမ်ငှားခ၊ အစားအစာ၊ ဖုန်း၊ ဘတ်စ်ကားခ၊ ဆေး", "ဝင်ငွေထဲက မဖြစ်မနေကုန်ကျစရိတ်တွေ နုတ်ပါ။ ကျန်တာက သင့်ရဲ့ လက်ကျန်ငွေပါ", "တစ်ပတ်လုံး သုံးတဲ့ ဒေါ်လာတိုင်းကို မှတ်ပါ။ လူအများစုက မသိလိုက်ဘဲ ဆုံးရှုံးနေတာတွေ တွေ့ပါလိမ့်မယ်", "အရေးကြီးတဲ့ ဘီလ်တွေ (အိမ်ငှားခ၊ ဝန်ဆောင်မှုခ) ကို အရင်ပေးပါ။ မပေးနိုင်ခင် ငွေရှင်တွေကို ဆက်သွယ်ပြီး အစီအစဉ်တောင်းပါ", "တစ်ပတ်ကို $1–$5 လောက် အရန်အဖြစ် ဘေးချထားပါ - မမျှော်လင့်ထားတာ ဖြစ်လာရင် မပြိုလဲအောင်"],
      tips: "Haven ထဲက SNAP၊ Lifeline ဖုန်းနဲ့ ဘတ်စ်ကားလက်မှတ် လမ်းညွှန်တွေကို ကြည့်ပါ။ အခမဲ့အရင်းအမြစ်တိုင်းက သင်သိမ်းနိုင်တဲ့ ငွေပါ။ ခရက်ဒစ်ကို “ပြင်ပေးမယ်” ဆိုသူကို ကြိုပေးချေခြင်း လုံးဝမလုပ်ပါနဲ့။" };
    GUIDE_MY["free-water-bottles"] = { title: "အခမဲ့ ပြန်သုံးရေဘူး",
      intro: "ရေအမြဲပါနိုင်ဖို့ အခမဲ့ ပြန်သုံးရေဘူး ဘယ်မှာရနိုင်လဲ။",
      steps: ["Parkview က အခမဲ့ ပြန်သုံးရေဘူး ပေးပါတယ်။ Parkview ဌာနတစ်ခုမှာ လက်ကျန်ရှိမရှိ မေးကြည့်ပါ", "စနေနေ့တိုင်း mission မှာ Feeding the Hungry က နေ့လည်စာနဲ့အတူ ရေဘူးတွေ ဝေပါတယ် (Events ကိုကြည့်ပါ)", "Haven မြေပုံပေါ်က အခမဲ့ရေစက်တွေမှာ ရေပြန်ဖြည့်ပါ (💧 Drinking Water အမျိုးအစားကို နှိပ်ပါ)"],
      tips: "ပစ္စည်းတွေ ကုန်သွားတတ်လို့ စောစောသွားပြီး ယဉ်ကျေးစွာ တောင်းပါ။ သင့်မှာ ရှိပြီးသားဘူးကိုလည်း အခမဲ့ရေစက်တွေမှာ ဖြည့်လို့ရပါတယ်။" };
    GUIDE_MY["free-wifi"] = { title: "အခမဲ့ WiFi - ဘယ်မှာနဲ့ ဘယ်လိုချိတ်မလဲ",
      intro: "အလုပ်လျှောက်ရန်၊ ထောက်ပံ့ကြေးလျှောက်ရန်နဲ့ အဆက်အသွယ်ရှိနေဖို့ အခမဲ့အင်တာနက်။",
      steps: ["စာကြည့်တိုက်တွေမှာ အခမဲ့ WiFi ရှိပြီး များသောအားဖြင့် စကားဝှက်မလိုပါ။ မြေပုံပေါ်က 📶 Free WiFi အမျိုးအစားကို နှိပ်ပါ", "အမြန်စားဆိုင်အများနဲ့ ဓာတ်ဆီဆိုင်အချို့မှာ အခမဲ့ WiFi ရှိပါတယ်။ တံခါးမှာ ဒါမှမဟုတ် ငွေရှင်းကောင်တာမှာ ကပ်ထားတဲ့ network နာမည်ကို ရှာပါ", "စကားဝှက်တောင်းရင် ငွေကိုင်သူကို ယဉ်ကျေးစွာမေးပါ။ တချို့က ပြေစာပေါ်မှာ ရိုက်ထုတ်ပေးပါတယ်", "ဆိုင်က ဝယ်ဖို့မျှော်လင့်ရင် အသေးအဖွဲလေး ဝယ်ပါ၊ လူများတဲ့ဆိုင်မှာ နာရီများစွာ မနေပါနဲ့", "Haven က စကားဝှက်တွေ မစာရင်းပါဘူး၊ ဘာလို့လဲဆိုတော့ ဆိုင်တွေက ပြောင်းတတ်ပြီး အများကြီးမျှဝေရင် အခမဲ့ WiFi ဖြတ်ပစ်နိုင်လို့ပါ"],
      tips: "အများသုံး WiFi မှာ ဘဏ်လုပ်ငန်း ဒါမှမဟုတ် Social Security နံပါတ် ထည့်တာကို ရှောင်ပါ။ ထွက်ခွာတဲ့အခါ အကောင့်တွေကို log out လုပ်ပါ။" };
  }
})();



