
/* ===== tab-data.js ===== */
/* Haven FW website tab data — ported from the app's own data (never fabricated).
   HOTLINES/PLAN/EVENTS/GIGS from fw-haven www/data.js.
   (LEARN_ITEMS already lives in app.js; do NOT redeclare it here.) */
const HOTLINES = [
  { name: "Indiana 211", area: "fort-wayne", desc: "24/7 help finding shelter, food & services", href: "tel:211", icon: "📞" },
  { name: "Oregon 211", area: "portland", desc: "24/7 help finding shelter, food & services", href: "tel:211", icon: "📞" },
  { name: "988 Crisis Line", desc: "24/7 mental-health crisis support", href: "tel:988", icon: "💛", crisis: true },
  { name: "Text 988", desc: "The same 988 crisis line, by text — no call needed", href: "sms:988", crisis: true },
  { name: "Crisis Text Line", desc: "24/7 — text HOME to 741741", href: "sms:741741?body=HOME", icon: "💬", crisis: true },
  { name: "SAMHSA Helpline", desc: "24/7 free referrals for drug & alcohol help", href: "tel:+18006624357", icon: "💜" },
  { name: "Trevor Project", desc: "24/7 crisis support for LGBTQ+ youth — call or text", href: "tel:+18664887386", icon: "🌈", crisis: true },
  { name: "Trans Lifeline", desc: "Peer support hotline run by & for trans people", href: "tel:+18775658860", icon: "💙", crisis: true },
  { name: "HART Recovery Line", area: "fort-wayne", desc: "City team linking you to recovery help — treatment, MAT & syringe services", href: "tel:+12604275801", icon: "🤝" },
  { name: "Safe Haven Hotline", desc: "24/7 confidential help for parents in crisis \u2014 surrender options for newborns 30 days or younger", href: "tel:+18669922291", icon: "👶" },
  { name: "Veterans Crisis Line", desc: "24/7 for veterans \u2014 call 988 then press 1", href: "tel:+18002738255", icon: "🎖\uFE0F", crisis: true },
  { name: "Homeless Veterans Hotline", desc: "VA help with housing and services for veterans", href: "tel:+18774243838", icon: "🏠" },
  { name: "Indiana Quitline", area: "fort-wayne", desc: "Free coaching to quit smoking or vaping \u2014 often free patches or gum", href: "tel:+18007848669", icon: "🌬\uFE0F" },
  { name: "National DV Hotline", desc: "24/7 safe, confidential help leaving an abusive situation", href: "tel:+18007997233", icon: "🛡\uFE0F", crisis: true },
  { name: "Indiana DCS Hotline", area: "fort-wayne", desc: "Report child abuse or neglect, 24/7", href: "tel:+18008005556", icon: "🧒" },
  { name: "Adult Protective Services (IN)", area: "fort-wayne", desc: "Report abuse or neglect of an adult who can't protect themselves", href: "tel:+18009926978", icon: "🧓" },

]

const PLAN = [
  { id: "plan-id", audited: "2026-10-10", t: "Get a photo ID", d: "ID unlocks everything else \u2014 benefits, jobs, housing. No ID? Free legal aid can help you get one.", go: { tab: "guide", guide: "legal" } },
  { id: "plan-snap", audited: "2026-10-10", t: "Apply for SNAP (food money)", d: "Monthly grocery money on an EBT card \u2014 you can qualify even with zero income.", go: { tab: "guide", guide: "snap" } },
  { id: "plan-shelter", audited: "2026-10-10", t: "Find tonight's shelter", d: "Don't wait until dark \u2014 call ahead and check bed availability.", go: { tab: "list", cat: "shelter" } },
  { id: "plan-eat", audited: "2026-10-10", t: "Eat today", d: "Hot meals are served daily across Fort Wayne \u2014 find the nearest one.", go: { tab: "list", cat: "meals" } },
  { id: "plan-medicaid", audited: "2026-10-10", t: "Apply for Medicaid", d: "Free or nearly-free health insurance from Indiana.", go: { tab: "guide", guide: "medicaid" } },
  { id: "plan-phone", audited: "2026-10-10", t: "Get a free phone", d: "Lifeline gives qualifying people a free phone plus monthly service.", go: { tab: "guide", guide: "freephone" } },
  { id: "plan-work", audited: "2026-10-10", t: "Find work", d: "Day labor can pay you the same day you show up.", go: { tab: "jobs" } },
  { id: "plan-211", audited: "2026-10-10", t: "Call 211 for anything else", d: "Free, confidential, 24/7 \u2014 they'll find help for whatever is still missing.", go: { tab: "info" } },
]

const EVENTS = [
  {
    id: "evt-ylni-market", title: "YLNI Farmers Market", venue: "Barr & Berry Streets (May–Oct) / 3811 Illinois Rd (Nov–Apr)",
    addr: "302 E Berry St", zip: "46802", lat: 41.0795, lng: -85.136306,
    date: "2026-10-17", time: "9am–1pm every Saturday (summer thru Oct 31, 2026; winter Nov 7, 2026–Apr 24, 2027 at 3811 Illinois Rd)", audited: "2026-10-10",
    desc: "Producer-only farmers market with local produce, meats, baked goods, crafts, and live music — free entry. 2026 summer season extended through Oct 31 (historic Barr St Market behind the History Center, Barr & Berry Sts); 2026–27 winter market Nov 7–Apr 24, 2027 at Parkwest Plaza, 3811 Illinois Rd — same Saturday 9am–1pm hours. Oct 25 Creature Crawl + all-October Market Bingo per market (2026).",
    url: "https://whatzup.com/organizer/ylni-farmers-market",
    cat: "market", added: "2026-09-27",
  },
  {
    id: "evt-fright-night", audited: "2026-10-09", title: "Fright Night 2026", venue: "Downtown Fort Wayne (Zombie Walk starts at ACPL Plaza)",
    addr: "900 Library Plaza", zip: "46802", lat: 41.07719, lng: -85.14315,
    date: "2026-10-17", time: "12pm–11pm",
    desc: "Fort Wayne's biggest free Halloween celebration — Zombie Walk, costume contest, trick-or-treating at downtown businesses, Boo Bus rides, and family activities.",
    url: "https://downtownfortwayne.com/events/fright-night/",
    cat: "outdoors", added: "2026-09-27",
  },
  {
    id: "evt-spooky-snacks", audited: "2026-10-09", title: "Spooky Snacks for Kids", venue: "Allen County Public Library, Georgetown Branch",
    addr: "6600 E State Blvd", zip: "46815", lat: 41.10206, lng: -85.05694,
    date: "2026-10-17", time: "1pm–2pm",
    desc: "Free kids' Halloween event at the library — spooky snacks and activities for children. AUDIT 2026-10-05: the live ACPL calendar shows this session marked FULL (registration was required) — call the Georgetown branch (260) 421-1320 before heading over.",
    cat: "kids", added: "2026-09-27",
  },
  {
    id: "evt-pam-free-thursday", audited: "2026-10-09", title: "Free First Thursday at Portland Art Museum", venue: "Portland Art Museum", area: "portland",
    addr: "1219 SW Park Ave", zip: "97205", lat: 45.51625, lng: -122.68357,
    date: "2026-11-05", time: "Thu 10am–7pm (first Thursday monthly)",
    desc: "Free museum admission on the first Thursday of every month — tickets reservable online a week ahead or at the door. Programs at the PAM CUT Tomorrow Theater in SE Portland are free too.",
    url: "https://portlandartmuseum.org/admission/",
    cat: "arts", added: "2026-10-04",
  },
  {
    id: "evt-portland-saturday-market", audited: "2026-10-08", title: "Portland Saturday Market", venue: "Tom McCall Waterfront Park / Ankeny Plaza", area: "portland",
    addr: "2 SW Naito Pkwy", zip: "97204", lat: 45.5231, lng: -122.67003,
    date: "2026-10-10", time: "Sat 10am–5pm, Sun 11am–4:30pm (weekly, Mar–Dec)",
    desc: "Largest continuously running outdoor market in the US — 250+ juried artisans selling only handmade goods, international food booths, and free live music. Free admission, rain or shine.",
    url: "https://www.portlandsaturdaymarket.com",
    cat: "market", added: "2026-10-04",
  },
  {
    id: "evt-psu-farmers-market", audited: "2026-10-09", title: "Portland Farmers Market at PSU", venue: "Portland State University, South Park Blocks", area: "portland",
    addr: "1803 SW Park Ave", zip: "97201", lat: 45.51229, lng: -122.68549,
    date: "2026-10-10", time: "Sat 8:30am–2pm thru Oct 30; 9am–2pm Nov–Mar (weekly, year-round)",
    desc: "Year-round flagship farmers market under the Park Blocks elms — up to 100 local farm and food vendors. Free entry; SNAP, Double Up Food Bucks, and Produce Match accepted. AUDIT 2026-10-07: still listed weekly year-round Sat 8:30am–2pm on portlandfarmersmarket.org; next occurrence this Sat 2026-10-10.",
    url: "https://www.portlandfarmersmarket.org/our-markets/psu/",
    cat: "market", added: "2026-10-04",
  },
  {
    id: "evt-winter-light-festival", audited: "2026-10-09", title: "Portland Winter Light Festival", venue: "Citywide (anchor: Pioneer Courthouse Square)", area: "portland",
    addr: "701 SW 6th Ave", zip: "97204", lat: 45.51909, lng: -122.67949,
    date: "2027-02-05", time: "Feb 5–13, 2027, evenings (anchors Fri–Sat 6pm–10pm) — 2027 dates confirmed",
    desc: "Free annual after-dark festival of light art, video projections, music, and food carts at sites across the city — anchored at Pioneer Courthouse Square, the World Trade Center, and the Electric Blocks. Dress warm. AUDIT 2026-10-07: Feb 5–13, 2027 dates confirmed (12th annual, theme 'In Other Words', per pdxwlf.com + Cascade A&E, Oct 2026).",
    url: "https://www.travelportland.com/events/portland-winter-light-festival/",
    cat: "arts", added: "2026-10-04",
  },
  {
    id: "evt-tree-lighting-pdx", audited: "2026-10-09", title: "Downtown Portland Tree Lighting Ceremony", venue: "Pioneer Courthouse Square", area: "portland",
    addr: "701 SW 6th Ave", zip: "97204", lat: 45.51909, lng: -122.67949,
    date: "2026-11-27", time: "Fri 5:30pm (day after Thanksgiving)",
    desc: "42nd annual lighting of downtown's 75-foot Douglas fir — free ceremony with a community sing-along led by Thomas Lauderdale of Pink Martini, live music, and a visit from Santa. AUDIT 2026-10-07: Fri Nov 27 5:30pm confirmed on DoPDX + thesquarepdx.org (Nov 2026 listing).",
    url: "https://news.trimet.org/2025/11/go-by-trimet-to-holiday-events-this-thanksgiving-weekend-and-beyond/",
    cat: "outdoors", added: "2026-10-04",
  },
  {
    id: "evt-peacock-lane", audited: "2026-10-09", title: "Peacock Lane Holiday Lights", venue: "SE Peacock Lane (between SE Belmont & SE Stark)", area: "portland",
    addr: "805 SE Peacock Ln", zip: "97214", lat: 45.51713, lng: -122.622,
    date: "2026-12-15", time: "Dec 15–31, 6pm–11pm nightly (pedestrian-only nights TBA — check peacocklane.org)",
    desc: "Four blocks of SE Portland where nearly every house decorates — a Portland tradition since 1932. Free to walk; the street closes to cars on pedestrian-only nights (check peacocklane.org for this year's dates).",
    url: "https://www.peacocklane.org/",
    cat: "outdoors", added: "2026-10-04",
  },
  {
    id: "evt-first-thursday-pearl", audited: "2026-10-09", title: "First Thursday Gallery Walk", venue: "Pearl District galleries (e.g. Blue Sky Gallery)", area: "portland",
    addr: "122 NW 8th Ave", zip: "97209", lat: 45.52424, lng: -122.678,
    date: "2026-11-05", time: "Thu 5pm–8pm (first Thursday monthly)",
    desc: "Year-round monthly gallery night — Pearl District galleries open new exhibitions with free evening receptions. The outdoor Street Gallery on NW 13th Ave runs April–October only.",
    url: "https://traveloregon.com/things-to-do/events/first-thursday-in-the-pearl-district-3/",
    cat: "arts", added: "2026-10-04",
  },
  {
    id: "evt-christmas-ships", audited: "2026-10-09", title: "Christmas Ships Parade", venue: "Willamette & Columbia Rivers (view from Riverplace Marina)", area: "portland",
    addr: "315 S Montgomery St", zip: "97201", lat: 45.50955, lng: -122.67357,
    date: "2026-12-07", time: "Dec 3–20, most nights ~7pm",
    desc: "70+ volunteer-decorated boats parade the Willamette and Columbia on 15 nights in December — free to watch from shore. Nightly routes vary; check the parade schedule before heading out.",
    url: "https://www.christmasships.org/about",
    cat: "outdoors", added: "2026-10-04",
  },
]

const GIGS = [
  {
    id: "gig-biolife-coldwater", audited: "2026-10-10", title: "BioLife Plasma — Coldwater Rd", venue: "BioLife Plasma Services",
    addr: "7921 Coldwater Rd", zip: "46825", lat: 41.152261, lng: -85.137603,
    phone: "(260) 489-8215", phoneHref: "+12604898215",
    url: "https://www.biolifeplasma.com/locations/indiana/fort-wayne-coldwater",
    pay: "Up to $750 first month (advertised) · paid per visit",
    desc: "Donate plasma (60–90 min a visit, up to 2x a week). Pay lands on a BioLife debit card right after each visit — the fastest legal cash for eligible healthy adults.",
    needs: "18+, photo ID, proof of address & SSN, pass a medical screening",
    kind: "plasma", added: "2026-09-27",
  },
  {
    id: "gig-biolife-getz", title: "BioLife Plasma — Getz Rd", venue: "BioLife Plasma Services",
    audited: "2026-10-10",
    addr: "1450 Getz Rd", zip: "46804", lat: 41.073142, lng: -85.220077,
    phone: "(260) 434-1922", phoneHref: "+12604341922",
    url: "https://www.biolifeplasma.com/locations/indiana/fort-wayne-getz",
    pay: "Up to $750 first month (advertised) · paid per visit",
    desc: "Second Fort Wayne BioLife center (southwest side, behind Speedway/Meijer on Getz Rd). Same deal: donate plasma, get paid on a debit card after each visit.",
    needs: "18+, photo ID, proof of address & SSN, pass a medical screening",
    kind: "plasma", added: "2026-09-27",
  },
  {
    id: "gig-csl-plasma", title: "CSL Plasma — South Side", venue: "CSL Plasma",
    audited: "2026-10-10",
    addr: "108 E Pettit Ave", zip: "46806", lat: 41.036828, lng: -85.135664,
    phone: "(260) 454-5083", phoneHref: "+12604545083",
    url: "https://www.cslplasma.com/center/089",
    pay: "Paid per visit on a prepaid card",
    desc: "A third paid plasma option in Fort Wayne (Southgate Plaza area). Pay lands on a reloadable prepaid card after each visit.",
    needs: "18+, photo ID, pass a medical screening",
    kind: "plasma", added: "2026-09-27",
  },
  {
    id: "gig-doordash", title: "DoorDash (Dasher)", venue: "Fort Wayne area — app-based",
    audited: "2026-10-10",
    pay: "Per delivery + 100% of tips · same-day payout",
    desc: "Deliver restaurant, grocery, and retail orders on your own schedule — no boss, no minimum hours. Sign up, pass the background check, and you can start earning the same day you go online.",
    needs: "18+, smartphone, SSN for background check, car with license + insurance",
    url: "https://dasher.doordash.com",
    kind: "app", added: "2026-09-27",
  },
  {
    id: "gig-ubereats", title: "Uber Eats (delivery)", venue: "Fort Wayne area — app-based",
    pay: "Per delivery + upfront tips · weekly or instant payout",
    desc: "Uber's food-delivery option in Fort Wayne — same flexibility as DoorDash, and you can run both apps at once to double your chances of an order.",
    needs: "18+, smartphone, SSN, background check, car (20 yrs old or newer) with license + insurance",
    url: "https://www.uber.com",
    kind: "app", added: "2026-09-27", audited: "2026-10-10",
  },
  {
    id: "gig-rover", title: "Rover — dog sitting & walking", venue: "Fort Wayne area — app-based",
    audited: "2026-10-10",
    pay: "You set your rates (~$15–28 per walk/visit)",
    desc: "Get paid to watch dogs or walk them — you set your own rates and schedule, and there are active sitters all over Fort Wayne. No car or special license needed, just love of animals and a clean background check.",
    needs: "18+, smartphone, pass an enhanced background check",
    url: "https://www.rover.com/become-a-sitter",
    kind: "app", added: "2026-09-27",
  },
  {
    id: "gig-taskrabbit", title: "TaskRabbit — odd jobs", venue: "Fort Wayne area — app-based",
    audited: "2026-10-10",
    pay: "Paid per completed task",
    desc: "App-based odd jobs around Fort Wayne — furniture assembly, moving help, mounting, cleaning, yard work. You pick the jobs and set your rate. Now available nationwide, including Fort Wayne.",
    needs: "18+, government ID, background check, smartphone, basic tools for handyman tasks",
    url: "https://www.taskrabbit.com",
    kind: "app", added: "2026-09-27",
  },
  {
    id: "gig-trials", title: "Paid clinical trials near Fort Wayne", venue: "Parkview Research Center & local sites",
    pay: "Varies by study — many pay participants",
    desc: "Over 100 clinical trials are currently recruiting near Fort Wayne (Parkview Research Center, Fort Wayne Medical Oncology, Parkview Randallia). Many pay participants. This is medical research, not surveys — eligibility and pay vary by study.",
    url: "https://policylab.us",
    kind: "study", added: "2026-09-27", audited: "2026-10-10",
  },
  {
    id: "gig-instacart", title: "Instacart (shopper)", venue: "Fort Wayne area — app-based",
    audited: "2026-10-10",
    pay: "Paid per order + 100% of tips · weekly or daily payout",
    desc: "Shop and deliver grocery orders from Fort Wayne stores (Meijer, Kroger, Walmart and more) on your own schedule. Full-service shoppers shop + deliver; in-store shoppers just shop scheduled shifts — no car needed for in-store.",
    needs: "18+, eligible to work in US, smartphone; full-service needs car + license/insurance and ability to lift 50 lbs",
    url: "https://shoppers.instacart.com",
    kind: "app", added: "2026-09-27",
  },

  
  {
    id: "gig-octapharma-powell-portland", title: "Octapharma Plasma — SE Powell", venue: "Octapharma Plasma", area: "portland",
    audited: "2026-10-10",
    hours: {1: [540, 1080], 2: [540, 1080], 3: [540, 1080], 4: [540, 1080], 5: [540, 1080], 6: [540, 1080], 7: [540, 1080]},
    hoursText: "Daily 9 AM–6 PM (verified Oct 2026).",
    addr: "12215 SE Powell Blvd", zip: "97236", lat: 45.49723, lng: -122.53687,
    phone: "(503) 505-9586", phoneHref: "+15035059586", url: "https://www.octapharmaplasma.com/plasma-donation/portland-or-135/",
    pay: "Paid per visit · new-donor bonuses (check site for current offer)",
    desc: "Donate plasma (about 60–90 min a visit, up to 2x a week) at the SE Powell center. Pay lands on a prepaid card after each visit — one of the fastest legal ways to earn cash in Portland.",
    needs: "18+, photo ID, proof of address & SSN, pass a medical screening",
    kind: "plasma", added: "2026-10-04",
  },
  {
    id: "gig-octapharma-milwaukie", title: "Octapharma Plasma — Milwaukie", venue: "Octapharma Plasma", area: "portland",
    audited: "2026-10-10",
    hours: {1: [480, 1080], 2: [480, 1080], 3: [480, 1080], 4: [480, 1080], 5: [480, 1080], 6: [480, 1080], 7: [480, 1080]},
    hoursText: "Daily 8 AM–6 PM (verified Oct 2026).",
    addr: "15828 SE McLoughlin Blvd", zip: "97267", lat: 45.4083, lng: -122.62418,
    phone: "(503) 406-3345", phoneHref: "+15034063345", url: "https://www.octapharmaplasma.com/plasma-donation/milwaukie-or-134/",
    pay: "Paid per visit · new-donor bonuses (check site for current offer)",
    desc: "Second Octapharma center just south of Portland in Milwaukie — same paid-plasma deal, about 15 min from downtown. Walk-ins welcome for new and returning donors.",
    needs: "18+, photo ID, proof of address & SSN, pass a medical screening",
    kind: "plasma", added: "2026-10-04",
  },
  {
    id: "gig-csl-plasma-glisan", title: "CSL Plasma — NE Glisan", venue: "CSL Plasma", area: "portland",
    audited: "2026-10-10",
    addr: "16225 NE Glisan St", zip: "97230", lat: 45.52687, lng: -122.49547,
    phone: "(503) 251-8822", phoneHref: "+15032518822", url: "https://www.cslplasma.com/center/055",
    pay: "Paid per visit on a prepaid card",
    desc: "CSL's Portland center (east side, near Gateway). Donate plasma up to twice a week; pay lands on a reloadable prepaid card after each visit.",
    needs: "18+, photo ID, pass a medical screening",
    kind: "plasma", added: "2026-10-04",
  },
  {
    id: "gig-grifols-holgate", title: "Grifols Biomat USA — Holgate", venue: "Grifols Biomat USA", area: "portland",
    audited: "2026-10-10",
    addr: "8033 SE Holgate Blvd", zip: "97206", lat: 45.49058, lng: -122.58064,
    phone: "(503) 777-5320", phoneHref: "+15037775320", url: "https://www.grifolsplasma.com/en/-/holgate-portland-oregon?y_source=1_MjY4NDQ4NTgtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D",
    pay: "Paid per visit (donors are compensated for their time)",
    hours: {1: [420, 1140], 2: [420, 1140], 3: [420, 1140], 4: [420, 1140], 5: [420, 1140], 6: [540, 960], 0: [540, 960]},
    hoursText: "Mon-Fri 7 AM-7 PM, Sat-Sun 9 AM-4 PM (verified Oct 2026).",
    desc: "Grifols plasma center in the Foster-Powell neighborhood. Donors are paid for their time; plasma goes to therapies for immune deficiencies, hemophilia, and hepatitis.",
    needs: "18+, photo ID, proof of address & SSN, pass a medical screening",
    kind: "plasma", added: "2026-10-04",
  },
  {
    id: "gig-biolife-washington-square", title: "BioLife Plasma — Washington Square", venue: "BioLife Plasma Services", area: "portland",
    audited: "2026-10-10",
    addr: "10154 SW Washington Square Rd", zip: "97223", lat: 45.44733, lng: -122.77753,
    phone: "(541) 320-9065", phoneHref: "+15413209065", url: "https://www.biolifeplasma.com/locations/oregon/portland",
    pay: "Up to $700 first month (advertised) · paid per visit",
    desc: "BioLife's Portland center (Washington Square area, SW side). Donate plasma up to twice a week; pay lands on a BioLife debit card right after each visit.",
    needs: "18+, photo ID, proof of address & SSN, pass a medical screening",
    kind: "plasma", added: "2026-10-04",
  },
  {
    id: "gig-peopleready-killingsworth", title: "PeopleReady — N Killingsworth", venue: "PeopleReady", area: "portland",
    audited: "2026-10-10",
    hours: {1: [540, 1080], 2: [540, 1080], 3: [540, 1080], 4: [540, 1080], 5: [540, 1080]},
    hoursText: "Mon-Fri 9 AM–6 PM (verified Oct 2026).",
    addr: "204 N Killingsworth St", zip: "97217", lat: 45.56244, lng: -122.66938,
    phone: "(503) 289-4616", phoneHref: "+15032894616", url: "https://www.peopleready.com/location/portland-or-1125/",
    pay: "Day-labor / temp shifts · next-day pay on many assignments",
    desc: "On-demand day labor: construction, warehouse, hospitality, events. Sign up in person or through the JobStack app and pick up shifts that pay as soon as the next day.",
    needs: "18+, ID + proof you can work in the US, JobStack app to claim shifts",
    kind: "daylabor", added: "2026-10-04",
  },
  {
    id: "gig-laborworks-82nd", title: "LaborWorks — SE 82nd Ave", venue: "LaborWorks", area: "portland",
    audited: "2026-10-10",
    addr: "4328 SE 82nd Ave, Ste 2000", zip: "97266", lat: 45.49064, lng: -122.57836,
    phone: "(503) 328-2230", phoneHref: "+15033282230", url: "http://www.laborworks.com/",
    pay: "Day labor \u00b7 daily pay (per worker reviews)",
    hours: {1: [330, 1080], 2: [330, 1080], 3: [330, 1080], 4: [330, 1080], 5: [330, 1080], 6: [360, 600]},
    hoursText: "Mon-Fri 5:30 AM-6 PM, Sat 6 AM-10 AM (verified Oct 2026).",
    desc: "Industrial day-labor staffing (SE Portland, near Eastport Plaza). Show up early, get sent to a same-day warehouse, construction, or cleanup shift. Bring ID and Social Security card for the application.",
    needs: "18+, photo ID + Social Security card (for I-9), show up early morning",
    kind: "daylabor", added: "2026-10-04",
  },
  {
    id: "gig-ohsu-trials", title: "OHSU Clinical Trials — Volunteer Studies", venue: "Oregon Health & Science University", area: "portland",
    audited: "2026-10-10",
    addr: "3181 SW Sam Jackson Park Rd", zip: "97239", lat: 45.49965, lng: -122.68578,
    phone: "(503) 346-0811", phoneHref: "+15033460811", url: "https://trials.ohsu.edu/",
    pay: "Varies by study — many studies pay participants",
    desc: "Search OHSU's recruiting research studies and volunteer — healthy-volunteer and condition-specific studies run year-round at the Marquam Hill campus. Each listing shows its own eligibility and compensation; contact the listed study team directly.",
    needs: "18+ (most studies); eligibility and pay vary by study — check each listing",
    kind: "study", added: "2026-10-04",
  },
  {
    id: "gig-doordash-portland", title: "DoorDash (Dasher)", venue: "Portland area — app-based", area: "portland",
    audited: "2026-10-10",
    pay: "Per delivery + 100% of tips · same-day payout",
    desc: "Deliver restaurant, grocery, and retail orders around Portland on your own schedule. Sign up, pass the background check, and you can start earning the same day you go online.",
    needs: "18+, smartphone, SSN for background check, car with license + insurance",
    url: "https://dasher.doordash.com",
    kind: "app", added: "2026-10-04",
  },
  {
    id: "gig-taskrabbit-portland", title: "TaskRabbit — odd jobs", venue: "Portland area — app-based", area: "portland",
    audited: "2026-10-10",
    pay: "You set your rates · paid per task",
    desc: "Pick up odd jobs around Portland — furniture assembly, moving help, cleaning, yard work. Set your own rates and schedule; clients book you through the app.",
    needs: "18+, smartphone, SSN for background check",
    url: "https://www.taskrabbit.com",
    kind: "app", added: "2026-10-04",
  },
  {
    id: "gig-rover-portland", title: "Rover — dog sitting & walking", venue: "Portland area — app-based", area: "portland",
    audited: "2026-10-10",
    pay: "You set your rates · paid per booking",
    desc: "Dog sitting, boarding, and walking in Portland — set your own schedule and rates. A busy metro market for sitters; Rover takes a service fee per booking.",
    needs: "18+, smartphone, pass a background check",
    url: "https://www.rover.com/become-a-sitter",
    kind: "app", added: "2026-10-04",
  },
  {
    id: "gig-instawork", title: "Instawork — shift-work app", venue: "Fort Wayne area — app-based",
    audited: "2026-10-10",
    pay: "Hourly · weekly pay, faster cash-out after 2nd shift",
    desc: "Day-labor-style shift work in Fort Wayne — warehousing, general labor, hospitality, events, food service, retail. Businesses post shifts up to a few hours in advance; you pick the ones that fit your availability. Free for workers, paid hourly (weekly at first).",
    needs: "18+, smartphone, profile + work history + references + short quiz; background check for some shifts",
    url: "https://www.instawork.com/local-staffing/fort-wayne",
    kind: "app", added: "2026-10-08",
  },
  {
    id: "job-empowering-care", audited: "2026-10-11", title: "Empowering Care Staffing and Employment Agency", name: "Empowering Care Staffing and Employment Agency", type: "agency",
    addr: "3521 Lake Ave STE 10b", zip: "46805", lat: 41.090916, lng: -85.09394,
    phone: "(260) 415-9909", phoneHref: "+12604159909", web: "https://empoweringcarestaffingagency.com",
    desc: "Staffing/employment agency — temp and employment placement. Listed Active with no closure/move signals.",
    tags: ["Temp", "Employment"],
    hours: { 1: [540, 1020], 2: [540, 1020], 3: [540, 1020], 4: [540, 1020], 5: [540, 900] },
    hoursText: "Mon–Thu 9am–5pm, Fri 9am–3pm.",
    reVerified: "2026-10-10: 3521 Lake Ave STE 10b + (260) 415-9909 + hours confirmed on active place listing (Active status) and business directories; no closure signals.",
  },
  {
    id: "job-premier-employee-solutions", title: "Premier Employee Solutions", name: "Premier Employee Solutions", type: "agency",
    addr: "5800 Fairfield Ave, Suite 200", zip: "46807", lat: 41.030913, lng: -85.143848,
    phone: "(260) 755-7533", phoneHref: "+12607557533", web: "http://www.thepremierpride.com/",
    desc: "Staffing agency — light industrial and warehouse placements (also branded \"1st Class Staffing\" with a Fort Wayne branch at this address). Free to job seekers; temp and temp-to-hire roles. Verified 2026-10-10: active listings at 5800 Fairfield Ave Ste 200, (260) 755-7533; no closure signals.",
    tags: ["Temp", "Industrial", "Warehouse", "South side"],
    hoursText: "Hours unconfirmed — call (260) 755-7533 before heading over.",
  },


  {
    audited: "2026-10-11", id: "job-sheet-metal-20", title: "Sheet Metal Workers Local 20 \u2014 Fort Wayne Apprenticeship", name: "Sheet Metal Workers Local 20 \u2014 Fort Wayne Apprenticeship", type: "help",
    addr: "3019 Waynewood Dr", zip: "46809", lat: 41.02133, lng: -85.17779,
    phone: "(260) 478-1614", phoneHref: "+12604781614", web: "https://smw20training.com/",
    desc: "Earn-while-you-learn union apprenticeship in sheet metal work (HVAC duct systems, architectural metal, welding): paid on-the-job training plus classroom instruction through the Local 20 Joint Apprenticeship & Training Trust, working toward a journeyman card. Equal-opportunity program; the training program covers the Fort Wayne area. Call the Fort Wayne area office (260) 478-1614 or toll-free (800) 835-4531 for application windows and requirements. Verified 2026-10-11: Fort Wayne office active at 3019 Waynewood Dr (place card active, 4.2 stars, no closure signals); official training site confirms Fort Wayne coverage.",
    tags: ["Free help", "Apprenticeship", "Skilled trades", "Union"],
    hours: { 1: [450, 990], 2: [450, 990], 3: [450, 990], 4: [450, 990], 5: [450, 990] },
  },



]

/* --- Real job listings ported from the app (feature #29) --- */
const JOB_TYPES = {
  agency: { label: "Temp Agencies", icon: "🏢", color: "#5cc8ff" },
  day:    { label: "Day Labor",      icon: "⚡", color: "#ffb020" },
  help:   { label: "Free Help",      icon: "🤝", color: "#7bc96f" },
};
const JOBS = [
  {
    id: "job-renhill", audited: "2026-10-11", name: "Renhill Staffing Services", type: "agency",
    addr: "4105 W Jefferson Blvd", zip: "46804", lat: 41.07004, lng: -85.19329,
    phone: "(260) 436-9237", phoneHref: "+12604369237", web: "https://renhill.com/",
    desc: "Regional staffing firm (Renhill HR on Demand, est. 1983) — industrial/warehouse, skilled trades, and clerical temp and temp-to-hire placements; walk in or apply online. Free to job seekers. active Fort Wayne office at 4105 W Jefferson Blvd, (260) 436-9237 (fresh directory listings, no closure signals).",
    tags: ["Temp", "Temp-to-hire", "Industrial", "Warehouse"],
    hoursText: "Hours unconfirmed — call (260) 436-9237 before heading over.",
  },
  {
    id: "job-kb-search-team", audited: "2026-10-11", name: "KB Search Team", type: "agency",
    addr: "111 E Ludwig Rd, Suite 104", zip: "46825", lat: 41.13956, lng: -85.14053,
    phone: "(260) 489-3350", phoneHref: "+12604893350", web: "https://kbsearchteam.com/",
    desc: "Woman-owned Fort Wayne recruiting & staffing firm, 17+ years in business — direct-hire, temp, and temp-to-hire placements in industrial, office, accounting/finance, engineering, IT, and management. Free to job seekers. 111 E Ludwig Rd Ste 104, (260) 489-3350 and Mon–Fri 8am–5pm match official American Staffing Association + Manta listings; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Direct hire", "Recruiting", "Woman-owned"],
    hoursText: "Office Mon–Fri 8am–5pm per Manta listing — call (260) 489-3350 to confirm.",
  },
  {
    id: "job-forge", audited: "2026-10-11", name: "Forge Industrial Staffing", type: "agency",
    addr: "5618 Coldwater Rd", zip: "46825", lat: 41.130567, lng: -85.135304,
    phone: "(260) 471-5900", phoneHref: "+12604715900", web: "https://forgestaff.com/",
    desc: "Industrial-focused staffing agency — temp, temp-to-hire, and direct-hire placements in manufacturing, warehouse, food production, and greenhouse work. Walk in Mon–Fri 7am–5pm or apply online; weekly pay and health/dental/vision benefits. Free to job seekers. active per official forgestaff.com Fort Wayne office listing (Mon–Fri 7am–5pm, matches entry hours); no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Industrial", "Warehouse"],
    hours: { 1: [420, 1020], 2: [420, 1020], 3: [420, 1020], 4: [420, 1020], 5: [420, 1020] },
  },
  {
    id: "job-triforce", audited: "2026-10-11", name: "Tri-Force Recruiting Specialists", type: "agency",
    addr: "13021 Cavendish Ct", zip: "46845", lat: 41.20274, lng: -85.12112,
    phone: "(260) 486-7182", phoneHref: "+12604867182", web: "https://www.triforce.com/",
    desc: "Long-running staffing/recruiting firm (est. 1991) — contract, temp-to-perm, and direct-hire placements in IT, engineering, technical sales, and corporate admin. Walk in Mon–Fri 9am–6pm or apply at triforce.com. Free to job seekers. active Fort Wayne office per official site, BBB, and current place listings; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Contract", "Professional"],
    hours: { 1: [540, 1080], 2: [540, 1080], 3: [540, 1080], 4: [540, 1080], 5: [540, 1080] },
  },
  {
    id: "job-trillium-drivers", audited: "2026-10-11", name: "Trillium Drivers — Fort Wayne", type: "agency",
    addr: "3401 Lake Ave", zip: "46805", lat: 41.09073, lng: -85.09487,
    phone: "(260) 338-4542", phoneHref: "+12603384542", web: "https://www.trilliumstaffing.com/",
    desc: "Driver-focused staffing division of Trillium Staffing (est. 1984) — CDL temp and temp-to-hire placements: flatbed, pickup & delivery, linehaul, hazmat tanker, yard dog, auto parts, dedicated routes. Apply online or walk in; free to job seekers. active Fort Wayne office at 3401 Lake Ave per current place listing, Mon–Fri 8am–5pm; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "CDL", "Truck drivers"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-express", audited: "2026-10-11", name: "Express Employment Professionals", type: "agency",
    addr: "4705 Illinois Rd, Suite 101", zip: "46804", lat: 41.074251, lng: -85.202435,
    phone: "(260) 470-9300", phoneHref: "+12604709300", web: "https://www.expresspros.com/us-indiana-fort-wayne",
    desc: "Staffing agency placing warehouse, office, and industrial workers — temp, temp-to-hire, and direct hire. You never pay a fee as the job seeker. office active at 4705 Illinois Rd Ste 101, (260) 470-9300, Mon–Fri 8–5 per official site + place card; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Warehouse"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-robert-half-fortwayne", audited: "2026-10-11", name: "Robert Half — Fort Wayne", type: "agency",
    addr: "9921 Dupont Circle Dr W, Suite 220", zip: "46825", lat: 41.17233, lng: -85.10903,
    phone: "(260) 399-2058", phoneHref: "+12603992058", web: "https://www.roberthalf.com/us/en/locations/in-fort-wayne/9921-dupont-circle-dr-w",
    desc: "Large staffing firm (345+ offices) — temp, temp-to-hire, and direct-hire placement for office, tech, finance, and professional roles. Free to job seekers; you never pay a fee. office active at 9921 Dupont Circle Dr W Ste 220, Mon–Fri 8am–6pm per official listing; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Professional"],
    hours: { 1: [480, 1080], 2: [480, 1080], 3: [480, 1080], 4: [480, 1080], 5: [480, 1080] },
  },
  {
    id: "job-manpower", audited: "2026-10-11", name: "Manpower", type: "agency",
    addr: "101 W Washington Center Rd, Suite A", zip: "46825", lat: 41.13252, lng: -85.14035,
    phone: "(260) 482-8285", phoneHref: "+12604828285",
    desc: "National staffing agency with Fort Wayne warehouse and office placements — short-term assignments and temp-to-perm jobs. active at 101 W Washington Center Rd Ste A, (260) 482-8285, Mon–Fri 8am–5pm per Birdeye (3.6/155 reviews); no closure signals.",
    tags: ["Temp", "Temp-to-hire"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-adecco", audited: "2026-10-11", name: "Adecco — Fort Wayne", type: "agency",
    addr: "1620 St Joe Center Rd", zip: "46825", lat: 41.132612, lng: -85.120111,
    phone: "(260) 202-0775", phoneHref: "+12602020775",
    desc: "Staffing agency for temp, temp-to-perm, clerical, and industrial work. The old W Coliseum Blvd Suite C office is permanently closed (per client reviews); this is the current Fort Wayne location.",
    tags: ["Temp", "Clerical", "Industrial"],
    hours: { 1: [540, 1020], 2: [540, 1020], 3: [540, 1020], 4: [540, 1020], 5: [540, 1020] },
  },
  {
    id: "job-peoplelink", name: "Peoplelink Staffing", type: "agency",
    audited: "2026-10-11",
    addr: "527 E Coliseum Blvd", zip: "46825", lat: 41.11925, lng: -85.13316,
    phone: "(260) 496-8283", phoneHref: "+12604968283", web: "https://www.peoplelinkstaffing.com",
    desc: "Local staffing agency placing general labor, warehouse, and manufacturing workers. active, no closure signals (YP + superpages Oct 2026 crawls); official site + fresh directories list 527 E Coliseum Blvd (older listings show 541, same building); hours per the company's own listing are Mon–Fri 8 AM–5 PM (was 9–6 from an unclaimed directory profile).",
    tags: ["General labor", "Warehouse", ""],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-workone", audited: "2026-10-11", name: "WorkOne Northeast (Career Center)", type: "help",
    addr: "201 E Rudisill Blvd, Suite 102", zip: "46806", lat: 41.05081, lng: -85.135155,
    phone: "(260) 745-3555", phoneHref: "+12607453555", web: "http://www.neinworks.org/",
    desc: "Free career center: job search help, resume workshops, walk-in computers for applications, and training money if you qualify.",
    tags: ["Free help", "Resume", "Computers"],
    hours: { 1: [480, 990], 2: [480, 990], 3: [480, 990], 4: [600, 990], 5: [480, 990] },
  },
  {
    id: "job-surge", name: "Surge Staffing", type: "agency",
    audited: "2026-10-11",
    addr: "3738 Allen Ave", zip: "46805", lat: 41.11164, lng: -85.13394,
    phone: "(260) 918-6900", phoneHref: "+12609186900", web: "https://www.surgestaffing.com",
    desc: "National temp agency — industrial, logistics, hospitality, and admin work. Walk-ins welcome, no appointment needed. You never pay a fee as the job seeker. active at 3738 Allen Ave, Mon–Fri 8am–5pm; no closure signals.",
    tags: ["Temp", "Walk-ins welcome", "Warehouse"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-prime-consulting-personnel", audited: "2026-10-11", name: "Prime Consulting Personnel", type: "agency",
    addr: "2420 N Coliseum Blvd #107", zip: "46805", lat: 41.09911, lng: -85.08779,
    phone: "(260) 387-5857", phoneHref: "+12603875857", web: "https://www.primeconsultinc.com",
    desc: "Local Fort Wayne staffing firm (est. 2015) — temporary, temp-to-direct, and direct-hire placements in light industrial, manufacturing, warehousing, skilled trades, and professional roles. Free to job seekers — you never pay a fee. active at 2420 N Coliseum Blvd #107, Mon–Fri 9am–4pm; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Light industrial", "Manufacturing", "Warehouse", ""],
    hours: { 1: [540, 960], 2: [540, 960], 3: [540, 960], 4: [540, 960], 5: [540, 960] },
  },
  {
    id: "job-elwood", name: "Elwood Staffing", type: "agency",
    audited: "2026-10-11",
    addr: "6422 Lima Rd", zip: "46818", lat: 41.13858, lng: -85.16166,
    phone: "(260) 497-6090", phoneHref: "+12604976090", web: "https://www.elwoodstaffing.com",
    desc: "Light industrial and manufacturing temp placements. Free to job seekers — you never pay a fee. active at 6422 Lima Rd 46818, (260) 497-6090, Mon–Fri 8 AM–5 PM per official site + directory listings; no closure signals.",
    tags: ["Temp", "Manufacturing", "Light industrial"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-spherion", audited: "2026-10-11", name: "Spherion", type: "agency",
    addr: "217 W Wayne St", zip: "46802", lat: 41.07784, lng: -85.14163,
    phone: "(260) 496-9900", phoneHref: "+12604969900", web: "https://www.spherion.com/our-offices/fort-wayne_1210/",
    desc: "Temp and direct-hire staffing plus free resume review and interview coaching. Downtown office — note older listings show a previous E State Blvd address. active at 217 W Wayne St, Mon–Fri 8am–5pm per official site + place card (4.4 stars, 58 reviews). still Active at 217 W Wayne St, (260) 496-9900, Mon–Fri 8am–5pm (official spherion.com office page).",
    tags: ["Temp", "Direct hire", "Free resume help"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-elite-medical-staffing", name: "Elite Medical Staffing", type: "agency",
    audited: "2026-10-11",
    addr: "4310 Illinois Rd, Ste 1503", zip: "46804", lat: 41.077028, lng: -85.19712,
    phone: "(260) 271-9308", phoneHref: "+12602719308", web: "http://getelitemedicalstaffing.com/",
    desc: "Temp staffing for nurses, CNAs, and medical support roles. You never pay a fee as the job seeker. 4310 Illinois Rd Ste 1503 46804, (260) 271-9308, Mon\u2013Fri 9 AM\u20135 PM, open and active.",
    tags: ["Temp", "Healthcare", "Nursing"],
    hours: { 1: [540, 1020], 2: [540, 1020], 3: [540, 1020], 4: [540, 1020], 5: [540, 1020] },
  },
  {
    id: "job-aerotek", audited: "2026-10-11", name: "Aerotek", type: "agency",
    addr: "7030 Pointe Inverness Way, Suite 210", zip: "46804", lat: 41.0739, lng: -85.2343,
    phone: "(260) 459-8010", phoneHref: "+12604598010", web: "https://www.aerotek.com",
    desc: "Staffing for manufacturing, logistics, and construction. Free to job seekers — you never pay a fee.",
    tags: ["Temp", "Manufacturing", "Construction"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-teksystems", audited: "2026-10-11", name: "TEKsystems — Fort Wayne", type: "agency",
    addr: "7030 Pointe Inverness Way, Suite 150", zip: "46804", lat: 41.07387, lng: -85.23419,
    phone: "(260) 459-8071", phoneHref: "+12604598071", web: "https://www.teksystems.com",
    desc: "IT and business staffing — contract, contract-to-hire, and direct placement in IT, engineering, and marketing/sales. Mon–Fri 8am–5pm. Free to job seekers — you never pay a fee. active at 7030 Pointe Inverness Way Suite 150, (260) 459-8071; multiple fresh place-card crawls; 2026 Best of Staffing winner; no closure signals. Distinct from Aerotek in the same building (Suite 210).",
    tags: ["Temp", "IT", "Contract"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-aston-carter", audited: "2026-10-11", name: "Aston Carter — Fort Wayne", type: "agency",
    addr: "7030 Pointe Inverness Way, Suite 210", zip: "46804", lat: 41.073851, lng: -85.234227,
    phone: "(260) 459-8707", phoneHref: "+12604598707", web: "https://www.astoncarter.com",
    desc: "Professional staffing in accounting/finance, governance/risk/compliance, operations/administrative, and customer support — temp, contract-to-hire, and direct placement; W-2 contract employees with health benefits. Free to job seekers — you never pay a fee. official site + Active place card confirm Fort Wayne office at 7030 Pointe Inverness Way Suite 210, (260) 459-8707, Mon–Fri 8am–5pm; no closure signals. Allegis Group sister brand in the same building as Aerotek (Suite 210) and TEKsystems (Suite 150) — distinct division, separate phone.",
    tags: ["Temp", "Professional", "Accounting"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-bone-personnel", name: "Bone Personnel", type: "agency",
    audited: "2026-10-11",
    addr: "5651 Coventry Ln, Suite 232", zip: "46804", lat: 41.03472, lng: -85.25846,
    phone: "(260) 715-9930", phoneHref: "+12607159930", web: "https://bone.careers/",
    desc: "Local Fort Wayne recruiting and staffing agency matching job seekers with employers (BBB A+ accredited, in business since 2015). Call to set up an appointment or ask about current openings — walk-ins by appointment per their contact page.",
    tags: ["Temp", "Staffing", "Recruiting", "verified Oct 2026"],
    hours: { 1: [450, 1050], 2: [450, 1050], 3: [450, 1050], 4: [450, 1050], 5: [450, 1050] },
  },
  {
    id: "job-proresources", audited: "2026-10-11", name: "Pro Resources Staffing Services", type: "agency",
    addr: "1728 Spy Run Ave", zip: "46805", lat: 41.09118, lng: -85.13435,
    phone: "(260) 420-2117", phoneHref: "+12604202117", web: "https://www.proresources.com",
    desc: "Locally owned since 1986 — light industrial, medical, and clerical temp work. Free to job seekers. active, same address/phone; official listings confirm Mon–Fri 8–12 & 1–5 (closed 12–1pm for lunch).",
    tags: ["Temp", "Local", "Medical", "Clerical"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
    hoursText: "Walk in Mon–Fri 8am–12pm and 1–5pm (closed 12–1pm for lunch).",
    reVerified: "2026-10-07: 1728 Spy Run Ave + (260) 420-2117 confirmed on official listing (Active, 4.4 stars, 298 reviews); split hours Mon–Fri 8–12 & 1–5 verified; ",
  },
  {
    id: "job-evotek", name: "Evotek Recruiting", type: "agency",
    addr: "1028 W Cook Rd Ste D", zip: "46825", lat: 41.147131, lng: -85.155948,
    phone: "(260) 247-9103", phoneHref: "+12602479103", web: "https://www.evotekrecruiting.com",
    desc: "Fort Wayne employment placement agency — direct-hire recruitment for engineering, management, professional, and skilled trades. BBB A+ accredited (since 2025), 9 years in business. Free to job seekers: screening, job placement, resume help.",
    tags: ["Temp", "Recruiting", "Engineering", "Skilled Trades"],
    hours: { 1: [540, 1020], 2: [540, 1020], 3: [540, 1020], 4: [540, 1020], 5: [540, 1020] },
    hoursText: "Mon–Fri 9am–5pm.",
    audited: "2026-10-11",
  },
  {
    id: "job-westaff", audited: "2026-10-11", name: "Westaff Staffing Solutions", type: "agency",
    addr: "7221 Engle Rd, Suite 110", zip: "46804", lat: 41.04304, lng: -85.23641,
    phone: "(260) 459-1000", phoneHref: "+12604591000", web: "https://www.westaff.com",
    desc: "Flexible temp staffing — light industrial, clerical, contact-center, and event staffing; weekly pay and benefits for associates. Free to job seekers — you never pay a fee. Oct 2026 business directories still list 7221 Engle Rd Ste 110, (260) 459-1000; their former 6202 Constitution Dr office shows permanently closed — use the Engle Rd branch. Call (260) 459-1000 to confirm hours before heading over.",
    tags: ["Temp", "Light industrial", "Clerical"],
    hoursText: "Hours unconfirmed — call (260) 459-1000 before heading over.",
  },
  {
    id: "job-wise-staffing", audited: "2026-10-11", name: "Wise Staffing Group", type: "agency",
    addr: "4930 Illinois Rd, Ste A", zip: "46804", lat: 41.07519, lng: -85.20641,
    phone: "(260) 203-2333", phoneHref: "+12602032333", web: "https://www.wisestaffinggroup.com",
    desc: "Full-service staffing agency — temporary and career placements across manufacturing, light industrial, and clerical. Free to job seekers. Note: moved from 4915 Illinois Rd to 4930 Illinois Rd (Ste A) in late 2025.",
    tags: ["Temp", "Manufacturing", "Light industrial", "Clerical"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-jobandtalent", audited: "2026-10-11", name: "Job&Talent", type: "agency",
    addr: "4646 W Jefferson Blvd, Suite 185", zip: "46804", lat: 41.06707, lng: -85.20087,
    phone: "(260) 424-8805", phoneHref: "+12604248805", web: "https://www.jobandtalent.com",
    desc: "Warehouse and logistics temp work. Free to job seekers — you never pay a fee. active at 4646 W Jefferson Blvd #185, Mon–Fri 8am–5pm; ",
    tags: ["Temp", "Warehouse", "Logistics"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-interim-healthcare-staffing", audited: "2026-10-11", name: "Interim HealthCare Staffing", type: "agency",
    addr: "111 E Ludwig Rd, Suite 105", zip: "46825", lat: 41.13956, lng: -85.14053,
    phone: "(260) 482-9405", phoneHref: "+12604829405", web: "https://www.interimhealthcare.com/location/fort-wayne-in",
    desc: "Healthcare staffing office placing CNAs, home health aides, and nurses on flexible shifts — you pick up the shifts you want. Serving Fort Wayne since 1972. Free to job seekers. address, phone (260) 482-9405, and location all match official listing; reviews show office Mon–Fri 8am–5pm; ",
    tags: ["Temp", "Healthcare", "CNAs", "Flexible shifts"],
    hoursText: "Office Mon–Fri 8am–5pm per recent reviews — call (260) 482-9405 to confirm.",
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-carroll-personnel", audited: "2026-10-11", name: "Carroll Personnel", type: "agency",
    addr: "6301 Constitution Dr", zip: "46804", lat: 41.067812, lng: -85.22506,
    phone: "(260) 436-0084", phoneHref: "+12604360084", web: "http://carrollpersonnel.com/",
    desc: "National recruiter since 1986, exclusively in long-term care, assisted living, and retirement segments of healthcare. Interim + permanent placement for administrators, directors of nursing, nurse consultants, marketing directors, controllers, and A/R consultants. Free to job seekers. active per place data at 6301 Constitution Dr, (260) 436-0084 per current directory listings; hours unconfirmed.",
    tags: ["Temp", "Healthcare", "Nursing", "Temp-to-hire"],
    hoursText: "Hours unconfirmed — call (260) 436-0084 before heading over.",
  },
  {
    id: "job-employmentplus", audited: "2026-10-11", name: "Employment Plus", type: "agency",
    addr: "4911 Illinois Rd", zip: "46804", lat: 41.07417, lng: -85.20453,
    phone: "(260) 432-3444", phoneHref: "+12604323444",
    desc: "Industrial, clerical, and technical staffing. Free to job seekers — you never pay a fee. still active at 4911 Illinois Rd, (260) 432-3444 per place card + directory crawls; hours still unconfirmed.",
    tags: ["Temp", "Industrial", "Clerical"],
    hoursText: "Hours unconfirmed — call (260) 432-3444 before heading over.",
  },
  {
    id: "job-workbox", audited: "2026-10-11", name: "Workbox Staffing", type: "agency",
    addr: "3911 E State Blvd", zip: "46805", lat: 41.09834, lng: -85.09002,
    phone: "(260) 740-3080", phoneHref: "+12607403080", web: "https://www.workboxstaffing.com",
    desc: "Industrial, manufacturing, and warehouse temp work with weekly pay. Free to job seekers.",
    tags: ["Temp", "Warehouse", "Weekly pay"],
    hours: { 1: [540, 1080], 2: [540, 1080], 3: [540, 1080], 4: [540, 1080], 5: [540, 1080] },
  },
  {
    audited: "2026-10-11", id: "job-rr-employment", name: "R&R Employment, Inc.", type: "agency",
    addr: "821 W Coliseum Blvd #1", zip: "46808", lat: 41.11742, lng: -85.15391,
    phone: "(260) 748-4801", phoneHref: "+12607484801",
    web: "https://clearlyrated.com/staffing/in-usa/fort-wayne-in/rr-employment-inc-fort-wayne-in",
    desc: "Staffing firm (HQ Decatur, IN; 4 locations) — temp, temp-to-hire, and direct-hire placements. Free to job seekers — you never pay a fee. Re-checked 2026-10-11: the Fort Wayne office at 821 W Coliseum Blvd #1 also appears under the name JobSquad Staffing Solutions with the same phone; one place card flags that office permanently closed while current job postings remain active — call first to confirm.",
    tags: ["Temp", "Call first"],
    hoursText: "Hours unconfirmed — call (260) 748-4801 before heading over.",
  },
  {
    id: "job-kelly", audited: "2026-10-11", name: "Kelly Services", type: "agency",
    addr: "3702 Rupp Dr", zip: "46815", lat: 41.11098, lng: -85.09985,
    phone: "(260) 484-2640", phoneHref: "+12604842640", web: "https://www.kellyservices.com",
    desc: "Office and light-industrial temp placements. Free to job seekers — you never pay a fee. still listed at 3702 Rupp Dr Ste 120, (260) 484-2640; no closure signals. A separate listing at 6319 Mutual Dr also circulates — call first.",
    tags: ["Temp", "Office", "Light industrial"],
    hoursText: "Hours unconfirmed — call (260) 484-2640 before heading over.",
  },
  {
    id: "job-armada", audited: "2026-10-11", name: "Armada Staffing Group", type: "agency",
    addr: "2210 Maplecrest Rd, Suite A", zip: "46815", lat: 41.09878, lng: -85.05988,
    phone: "(260) 493-8367", phoneHref: "+12604938367", web: "http://armadastaffinggroup.com/",
    desc: "Small local agency — welders, general labor, and warehouse placements. Free to job seekers.",
    tags: ["Temp", "Local", "Welding", "Warehouse"],
    hoursText: "Mon–Fri 7am–5pm (directory listings) — call (260) 493-8367 first. active, no closure signals.",
  },
  {
    id: "job-creative-financial-staffing", name: "Creative Financial Staffing", type: "agency",
    audited: "2026-10-11",
    addr: "9910 Dupont Circle Dr E", zip: "46825", lat: 41.17217, lng: -85.10676,
    phone: "(260) 676-4844", phoneHref: "+12606764844", web: "http://www.cfstaffing.com",
    desc: "Accounting/finance temp + direct-hire staffing, 23+ years in business. Free to job seekers. 9910 Dupont Circle Dr E Ste 230, (260) 676-4844 per fresh directory listings + BBB (A+ rating, not accredited); no closure signals.",
    tags: ["Temp", "Finance", "Office"],
    hoursText: "Mon–Fri 8am–5pm (directory listings) — call (260) 676-4844 first.",
  },
  {
    id: "job-tradesmen", audited: "2026-10-11", name: "Tradesmen International", type: "agency",
    addr: "1400 Airport North Office Park, Suite A", zip: "46825", lat: 41.14559, lng: -85.16254,
    phone: "(260) 497-9200", phoneHref: "+12604979200", web: "https://www.tradesmeninternational.com",
    desc: "Skilled construction trades staffing — electricians, carpenters, welders, and more. Free to job seekers. active at 1400 Airport North Office Park Suite A (3.3 stars, 7 reviews); Mon–Fri 7am–6pm; no closure signals.",
    tags: ["Temp", "Construction", "Skilled trades"],
    hours: { 1: [420, 1080], 2: [420, 1080], 3: [420, 1080], 4: [420, 1080], 5: [420, 1080] },
  },
  {
    id: "job-peopleready", name: "PeopleReady", type: "day",
    audited: "2026-10-11",
    addr: "3968 W Jefferson Blvd", zip: "46804", lat: 41.07374, lng: -85.19305,
    phone: "(260) 745-4577", phoneHref: "+12607454577", web: "https://www.peopleready.com",
    desc: "On-demand day labor (the successor to Labor Ready) — construction, manufacturing, and hospitality gigs, often same-day, booked through their JobStack app or in person.",
    tags: ["Day labor", "Same-day pay", "App + walk-in"],
    hours: { 1: [360, 1080], 2: [360, 1080], 3: [360, 1080], 4: [360, 1080], 5: [360, 1080], 6: [420, 660] },
  },
  {
    id: "job-bluejacket", name: "Blue Jacket Inc.", type: "help",
    audited: "2026-10-11",
    addr: "2826 S Calhoun St", zip: "46807", lat: 41.05918, lng: -85.13791,
    phone: "(260) 744-1900", phoneHref: "+12607441900", web: "https://www.bluejacketinc.org",
    desc: "Free 40-hour Career Academy job-readiness training plus job placement. Built for second chances — people with criminal records welcome — and open to anyone facing barriers to work. 2826 S Calhoun St 46807, (260) 744-1900, Mon\u2013Fri 8:30 AM\u20134:30 PM, 4.7 stars, no closure signals.",
    tags: ["Free help", "Job training", "Second chance"],
    hours: { 1: [510, 990], 2: [510, 990], 3: [510, 990], 4: [510, 990], 5: [510, 990] },
  },
  {
    id: "job-urbanleague", audited: "2026-10-11", name: "Fort Wayne Urban League", type: "help",
    addr: "2135 S Hanna St", zip: "46803", lat: 41.06562, lng: -85.12769,
    phone: "(260) 745-3100", phoneHref: "+12607453100", web: "https://www.fwul.org",
    desc: "Free Work Ready program, job fairs, computer lab, and a pre-apprenticeship pipeline into construction trades. active at 2135 S Hanna St (4.7 stars across 75+ reviews); most listings show Mon–Fri 8am–4:30pm, a few say 9–5 — call to confirm.",
    tags: ["Free help", "Job fairs", "Apprenticeship"],
    hours: { 1: [480, 990], 2: [480, 990], 3: [480, 990], 4: [480, 990], 5: [480, 990] },
  },
  {
    id: "job-goodwill-emp", audited: "2026-10-11", name: "Goodwill Employment Services", type: "help",
    addr: "1516 Magnavox Way", zip: "46804", lat: 41.07107, lng: -85.222,
    phone: "(260) 478-7617", phoneHref: "+12604787617", web: "https://www.fwgoodwill.org",
    desc: "Free job training and employment services for people with disabilities or other barriers to work. This is the services office, not a thrift store. corporate/services office at 1516 Magnavox Way, (260) 478-7617, still listed; office hours Mon–Fri 8 AM–4:30 PM (one listing says Fri until 3 PM).",
    tags: ["Free help", "Job training"],
    hoursText: "Office hours Mon–Fri 8:00 AM–4:30 PM (one listing says Friday until 3:00 PM) — call (260) 478-7617 first.",
  },
  {
    id: "job-acpl", audited: "2026-10-11", name: "Allen County Public Library — Main", type: "help",
    addr: "900 Library Plaza", zip: "46802", lat: 41.07719, lng: -85.14315,
    phone: "(260) 421-1200", phoneHref: "+12604211200", web: "https://www.acpl.lib.in.us",
    desc: "Free computers, WiFi, and printing for job applications, plus resume help and career workshops. No library card needed for most services.",
    tags: ["Free help", "Computers", "Resume", "WiFi"],
    hours: { 0: [720, 1020], 1: [540, 1260], 2: [540, 1260], 3: [540, 1260], 4: [540, 1260], 5: [540, 1080], 6: [540, 1080] },
  },
  {
    id: "job-abc-app", audited: "2026-10-11", name: "ABC Indiana/Kentucky Apprenticeship", type: "help",
    addr: "4201 Parnell Ave", zip: "46805", lat: 41.11632, lng: -85.12694,
    phone: "(260) 441-9897", phoneHref: "+12604419897", web: "https://www.abcindianakentucky.org",
    desc: "Dept. of Labor-approved construction apprenticeship — electrical, carpentry, plumbing, HVAC, welding. Evening classes so you can work full-time while training; earns credits toward a college degree. ABC of Fort Wayne place card Active at 4201 Parnell Ave, (260) 441-9897 matches; DWD INTraining confirms the program is open to the general public with career counseling and placement assistance. HONEST CAVEAT: tuition is listed at ~$7,400 + books/fees — not free (many apprentices offset it through their employer), and DWD lists no diploma prerequisite.",
    tags: ["Apprenticeship", "Skilled trades", "Tuition cost"],
    hoursText: "Training facility — call (260) 441-9897 before heading over.",
  },
  {
    id: "job-allstaff", audited: "2026-10-11", name: "AllStaff Behavioral Staffing", type: "agency",
    addr: "803 S Calhoun St", zip: "46802", lat: 41.07914, lng: -85.13947,
    phone: "(260) 209-4000", phoneHref: "+12602094000", web: "https://jobs.malonesolutions.com/",
    desc: "Malone staffing office — behavioral-health, clerical, and light-industrial temp and temp-to-hire placements. Free to job seekers — you never pay a fee.",
    tags: ["Temp", "Behavioral health", "Clerical"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-right-choice-staffing", audited: "2026-10-11", name: "Right Choice Staffing", type: "agency",
    addr: "110 E Wayne St Suite 1260", zip: "46802", lat: 41.0782, lng: -85.13892,
    phone: "(260) 699-2885", phoneHref: "+12606992885", web: "http://rchoicellc.com",
    desc: "Staffing company with a Fort Wayne office — temp and project staffing for light industrial, logistics, warehousing, manufacturing, hospitality support, and general labor; flexible coverage for single shifts, seasonal surges, and temp-to-hire. Free to job seekers. Indiana office still listed on official site (110 E Wayne St Suite 1260); no closure signals.",
    tags: ["Temp", "General labor", "Warehouse", "Downtown", ""],
    hoursText: "Office hours unconfirmed — call (260) 699-2885 before heading over.",
  },
  {
    id: "job-tower-staffing", audited: "2026-10-11", name: "Tower Staffing", type: "agency",
    addr: "1501 Goshen Ave", zip: "46808", lat: 41.10025, lng: -85.16236,
    phone: "(260) 483-7085", phoneHref: "+12604837085", web: "http://www.tpsjobs.net/",
    desc: "Local full-service staffing agency in Fort Wayne since 1953 — temporary, temp-to-permanent, and direct placement in clerical, construction, industrial, and customer-service roles. Free to job seekers — you never pay a fee. active at 1501 Goshen Ave, Mon–Fri 9am–5pm; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Construction", "Clerical", "Industrial"],
    hours: { 1: [540, 1020], 2: [540, 1020], 3: [540, 1020], 4: [540, 1020], 5: [540, 1020] },
  },
  {
    id: "job-jibe-staffing", audited: "2026-10-11", name: "Jibe Staffing — Fort Wayne Branch", type: "agency",
    addr: "5800 Fairfield Ave Ste 110", zip: "46807", lat: 41.03087, lng: -85.14384,
    phone: "(260) 234-2530", phoneHref: "+12602342530", web: "http://www.jibestaffing.com/",
    desc: "Temp staffing agency — laborer, forklift operator, and warehouse placements. Free to job seekers — you never pay a fee. active at 5800 Fairfield Ave Ste 110, Mon–Fri 9am–5pm; hiring posts as recent as Oct 2026; no closure signals.",
    tags: ["Temp", "Industrial", "Warehouse", "Forklift"],
    hours: { 1: [540, 1020], 2: [540, 1020], 3: [540, 1020], 4: [540, 1020], 5: [540, 1020] },
  },
  {
    id: "job-precision-medical-staffing", name: "Precision Medical Staffing", type: "agency",
    addr: "327 E Wayne St", zip: "46802", lat: 41.07915, lng: -85.13481,
    phone: "(260) 420-2800", phoneHref: "+12604202800", web: "https://www.precisionnursingstaffing.com/",
    desc: "Downtown Fort Wayne nursing staffing agency — temp placements for CNAs, RNs, and caregivers at area care facilities. Free to job seekers — you never pay a fee. Active — 327 E Wayne St, (260) 420-2800 unchanged; no closure signals.",
    tags: ["Temp", "Healthcare", "CNA", "Downtown", ""],
    hoursText: "Office hours unconfirmed — call (260) 420-2800 before heading over.",
  },
  {
    audited: "2026-10-11", id: "job-score-nei", name: "SCORE Northeast Indiana", type: "help",
    addr: "3201 Stellhorn Rd", zip: "46815", lat: 41.12009, lng: -85.0991,
    phone: "(260) 422-2601", phoneHref: "+12604222601", web: "https://score.org/northeastindiana/",
    desc: "Free one-on-one mentoring and workshops for starting or growing a small business — business planning, bookkeeping, marketing, and financing guidance from volunteer mentors; SBA partner. Not job placement. active at 3201 Stellhorn Rd (NIIC building, suite C-104); same phone; no closure signals.",
    tags: ["Free help", "Small business", "Mentoring", "Workshops"],
    hours: { 1: [540, 1080], 2: [540, 1080], 3: [540, 1080], 4: [540, 1080], 5: [540, 1080] },
  },
  {
    id: "job-leaders-staffing", audited: "2026-10-11", name: "Leaders Staffing LLC", type: "agency",
    addr: "4912 Lima Rd", zip: "46808", lat: 41.12334, lng: -85.15259,
    phone: "(260) 490-5627", phoneHref: "+12604905627", web: "http://leadersstaffing.com/",
    desc: "Fort Wayne-based staffing firm (since 2005) with branches across northeast Indiana — temp, temp-to-hire, and direct-hire placements in light industrial, assembly, warehouse, and clerical roles. Walk in Mon–Fri 8am–5pm or apply online. Free to job seekers — you never pay a fee. active listing at 4912 Lima Rd; no closure signals. still active, same address/phone, Mon–Fri 8am–5pm, 4.1/63 reviews; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Industrial", "Warehouse", "Clerical"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-integrity-staffing", audited: "2026-10-11", name: "Integrity Staffing Agency LLC", type: "agency",
    addr: "787 Petal Way", zip: "46816", lat: 41.01329, lng: -85.12524,
    phone: "(260) 387-5008", phoneHref: "+12603875008",
    desc: "Local Fort Wayne staffing agency — temp and temp-to-hire placements. Free to job seekers — you never pay a fee. Yellow Pages still pairs (260) 387-5008 with 787 Petal Way, Fort Wayne 46816; no closure signals. Hours unconfirmed — call first.",
    tags: ["Temp", "Temp-to-hire", "Local"],
    hoursText: "Hours unconfirmed — call (260) 387-5008 before heading over.",
  },
  {
    id: "job-h2b-consulting", audited: "2026-10-11", name: "H2B Consulting", type: "agency",
    addr: "110 E Wayne St, 12th Floor", zip: "46802", lat: 41.077627, lng: -85.138883,
    phone: "(260) 267-9557", phoneHref: "+12602679557", web: "https://www.h2bconsulting.com/",
    desc: "Fort Wayne recruiting/staffing firm — contract talent and staff augmentation, direct placement, and RPO for tech, healthcare, dental, and skilled-professional roles. Free to job seekers. Active at 110 E Wayne St, 12th floor, (260) 267-9557, Mon–Fri 8am–5pm per current place card; no closure signals.",
    tags: ["Temp", "Contract", "Professional", "Downtown", ""],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-peopleready-portland", name: "PeopleReady — Portland", type: "day", area: "portland",
    addr: "204 N Killingsworth St", zip: "97217", lat: 45.56244, lng: -122.66938,
    phone: "(503) 289-4616", phoneHref: "+15032894616", web: "https://www.peopleready.com/location/portland-or-1125/",
    desc: "Day-labor / on-demand staffing for construction, warehouse, hospitality, and general labor — pick up shifts in the JobStack app, next-day pay on many jobs. Free to job seekers.",
    tags: ["Day labor", "Next-day pay", "General labor", "Warehouse"],
    hours: { 1: [540, 1080], 2: [540, 1080], 3: [540, 1080], 4: [540, 1080], 5: [540, 1080] },
    reVerified: "2026-10-11: official PeopleReady location page (certified Sep 2026) confirms 204 N Killingsworth St, Portland OR 97217, (503) 289-4616, Mon–Fri 9am–6pm; Active status; ",
  },
  {
    id: "job-worksource-se", audited: "2026-10-11", name: "WorkSource Portland Metro — Southeast Center", type: "help", area: "portland",
    addr: "6401 SE Foster Rd", zip: "97206", lat: 45.48978, lng: -122.59666,
    phone: "(503) 934-0630", phoneHref: "+15039340630", web: "https://worksourceportlandmetro.org",
    desc: "Free state career center: job search help, resume review, interview practice, free workshops, computers for applications, and training scholarships if you qualify.",
    tags: ["Free help", "Resume", "Workshops", "Computers"],
    hours: { 1: [480, 990], 2: [480, 990], 3: [480, 990], 4: [480, 990], 5: [480, 990] },
    hoursText: "Call-first note: published Mon–Fri hours conflict across sources (worksourceportlandmetro.org place card says 8 AM–4:30 PM; TriMet official says 8:30 AM–4:30 PM; myworksourceportfolio says 8:30 AM–5 PM) — call (503) 934-0630 before going. address 6401 SE Foster Rd + phone confirmed on worksystems.org (Oct 2026) + qualityinfo.org; Active, no closure signals.",
  },
  {
    id: "job-worksource-nne", audited: "2026-10-11", name: "WorkSource Portland Metro — N/NE Center", type: "help", area: "portland",
    addr: "30 N Webster St, Suite E", zip: "97217", lat: 45.55969, lng: -122.66747,
    phone: "(503) 280-6046", phoneHref: "+15032806046", web: "https://worksourceportlandmetro.org",
    desc: "Free state career center for North/Northeast Portland: job search assistance, resume help, free workshops, and training money if you qualify. Walk-ins welcome.",
    tags: ["Free help", "Resume", "Workshops"],
    hours: { 1: [510, 990], 2: [510, 990], 3: [510, 990], 4: [510, 990], 5: [510, 990] },
  },
  {
    id: "job-ccc-eac", name: "Central City Concern — Employment Access Center", type: "help", area: "portland",
    audited: "2026-10-11",
    addr: "2 NW 2nd Ave", zip: "97209", lat: 45.5234, lng: -122.67204,
    phone: "(503) 226-7387", phoneHref: "+15032267387", web: "http://www.centralcityconcern.org/services/employment/employment-access-center/",
    desc: "Free employment help for low-income and homeless Portlanders: career exploration, job placement, retention support, and work-readiness services. No fee.",
    tags: ["Free help", "Homeless", "Job placement"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-express-east-portland", audited: "2026-10-11", name: "Express Employment Professionals — East Portland", type: "agency", area: "portland",
    addr: "10011 SE Division St, Suite 102", zip: "97266", lat: 45.50455, lng: -122.56026,
    phone: "(503) 254-1200", phoneHref: "+15032541200", web: "https://www.expresspros.com/us-oregon-portland-east",
    desc: "Staffing agency for temp, temp-to-hire, and direct hire — light industrial, warehouse, and office/clerical. You never pay a fee as the job seeker. office active, operating status Active, Mon–Fri 8–5 per expresspros.com + place card; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Warehouse", "Office"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-express-north-portland", audited: "2026-10-11", name: "Express Employment Professionals — North Portland", type: "agency", area: "portland",
    addr: "4790 N Lombard St", zip: "97203", lat: 45.58007, lng: -122.71819,
    phone: "(503) 735-1200", phoneHref: "+15037351200", web: "https://www.expresspros.com/us-oregon-portland-north",
    desc: "Staffing agency placing industrial, skilled trades, admin, and professional workers — temp, evaluation-to-hire, and direct hire. Free to job seekers. office active, operating status Active, Mon–Fri 8–5 (closed 12–1 lunch) per expresspros.com + place card; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Skilled trades", "Admin"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-goodwill-job-connection", audited: "2026-10-11", name: "Goodwill Job Connection", type: "help", area: "portland",
    addr: "1943 SE 6th Ave", zip: "97214", lat: 45.50911, lng: -122.66033,
    phone: "(503) 239-1734", phoneHref: "+15032391734", web: "https://meetgoodwill.org/job-connection-home/",
    desc: "Free job search and referral program: job leads, resume help, interview practice, and hiring events. Call for an appointment.",
    tags: ["Free help", "Resume", "Hiring events"],
    hours: { 1: [480, 990], 2: [480, 990], 3: [480, 990], 4: [480, 990], 5: [480, 990] },
  },
  {
    id: "job-new-avenues-pave", audited: "2026-10-11", name: "New Avenues for Youth — PAVE", type: "help", area: "portland",
    addr: "820 SW Oak St", zip: "97205", lat: 45.5222, lng: -122.67981,
    phone: "(503) 224-4339", phoneHref: "+15032244339", web: "https://www.newavenues.org/",
    desc: "Free job readiness training, internships, and education/employment help for homeless and at-risk youth through the PAVE program. Ages 14–24ish — call to check eligibility. Closed for lunch 12–1pm on Tuesdays.",
    tags: ["Free help", "Youth", "Internships", "Training"],
    hours: { 1: [540, 1110], 2: [540, 1110], 3: [540, 1110], 4: [540, 1110], 5: [540, 1110], 6: [780, 1110] },
  },
  {
    audited: "2026-10-11", id: "job-se-works", name: "SE Works", type: "help", area: "portland",
    addr: "8044 SE Harold St", zip: "97206", lat: 45.48284, lng: -122.58037,
    phone: "(503) 772-2300", phoneHref: "+15037722300", web: "https://seworks.org/",
    desc: "Free employment help: job search assistance, pre-employment training, vocational training, and programs for ex-offenders (PREP) and immigrants. Call for orientation.",
    tags: ["Free help", "Training", "Re-entry", "Immigrants"],
    hours: { 1: [480, 990], 2: [480, 990], 3: [480, 990], 4: [480, 990], 5: [480, 990] },
  },
  {
    id: "job-robert-half", audited: "2026-10-11", name: "Robert Half — Portland", type: "agency", area: "portland",
    addr: "222 SW Columbia St, Suite 1100", zip: "97201", lat: 45.51318, lng: -122.67733,
    phone: "(503) 265-5020", phoneHref: "+15032655020", web: "https://www.roberthalf.com/us/en/locations/or-portland/222-sw-columbia-st",
    desc: "Specialized staffing for finance, tech, marketing, legal, admin, and customer support — contract, temp, and permanent. Free to job seekers. active, same address; Mon–Fri 8am–6pm; no closure signals.",
    tags: ["Temp", "Office", "Tech", "Professional"],
    hours: { 1: [480, 1080], 2: [480, 1080], 3: [480, 1080], 4: [480, 1080], 5: [480, 1080] },
  },
  {
    id: "job-better-people", audited: "2026-10-11", name: "Better People", type: "help", area: "portland",
    addr: "4310 NE Martin Luther King Jr Blvd", zip: "97211", lat: 45.55465, lng: -122.66132,
    phone: "(503) 281-2663", phoneHref: "+15032812663",
    desc: "Job and life-readiness program for people with legal histories: classes, MRT, and referrals to employers paying at least $12/hr with benefits. Orientation Mon 10:30am; $35 enrollment fee reported. address corrected to 4310 NE MLK Jr Blvd per two directories (was listed at 3711); betterpeople.org now belongs to a different company — call first to confirm current status.",
    tags: ["Re-entry", "Job readiness", "Temp", "Call first"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-irco-workforce", audited: "2026-10-11", name: "IRCO — Workforce Development", type: "help", area: "portland",
    addr: "10301 NE Glisan St", zip: "97220", lat: 45.5266, lng: -122.55654,
    phone: "(503) 234-1541", phoneHref: "+15032341541", web: "https://irco.org/",
    desc: "Free culturally responsive workforce coaching for immigrants and refugees: ESL for work, job training, and help navigating the US job market. No fee. active at 10301 NE Glisan St, (503) 234-1541, Mon–Fri 8:30am–5pm; no closure signals.",
    tags: ["Free help", "Immigrants", "Training", "ESL"],
    hours: { 1: [510, 1020], 2: [510, 1020], 3: [510, 1020], 4: [510, 1020], 5: [510, 1020] },
  },
  {
    id: "job-nw-staffing", audited: "2026-10-11", name: "NW Staffing Resources", type: "agency", area: "portland",
    addr: "851 SW 6th Ave", zip: "97204", lat: 45.51808, lng: -122.67972,
    phone: "(503) 242-0611", phoneHref: "+15032420611", web: "http://www.nwstaffing.com/",
    desc: "Local downtown staffing agency for temp, temp-to-hire, and direct hire across many industries. Job seekers never pay a fee; reviews note fast placements.",
    tags: ["Temp", "Temp-to-hire", "Direct hire"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-hoosier-personnel", audited: "2026-10-11", name: "Hoosier Personnel Staffing, LLC", type: "agency",
    addr: "10315 Dawson's Creek Blvd, Suite C", zip: "46825", lat: 41.17705, lng: -85.14605,
    phone: "(260) 755-1762", phoneHref: "+12607551762", web: "https://hoosierpersonnel.com/",
    desc: "Locally owned and operated Fort Wayne staffing firm — temp, temp-to-hire, and direct-hire placements in light industrial, manufacturing, warehouse, clerical, customer service, and hospitality. Open interviews Mon–Fri 10am–2pm per their job posts; office hours Mon–Fri 9am–4pm. You never pay a fee as the job seeker. Active at 10315 Dawson's Creek Blvd Suite C, (260) 755-1762, office hours Mon–Fri 9am–4pm, 4.6-star place-card rating; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Warehouse", "Local"],
    hours: { 1: [540, 960], 2: [540, 960], 3: [540, 960], 4: [540, 960], 5: [540, 960] },
  },
  {
    id: "job-staffmark", audited: "2026-10-11", name: "Staffmark", type: "agency",
    addr: "9017 Coldwater Rd, Suite 300", zip: "46825", lat: 41.1628, lng: -85.13519,
    phone: "(260) 484-5300", phoneHref: "+12604845300", web: "https://www.staffmark.com/",
    desc: "One of the largest staffing companies in the country — temp, temp-to-hire, and direct-hire work in warehouse, manufacturing, and office roles. Office hours Mon–Fri 8am–5pm; free to job seekers. Fort Wayne office active (some reviews report slow phone response, so applying in person or online may be faster). ",
    tags: ["Temp", "Temp-to-hire", "Warehouse", "National", "Call first"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-staff-finders", audited: "2026-10-11", name: "Staff Finders, Inc.", type: "agency",
    addr: "1615 W Coliseum Blvd", zip: "46808", lat: 41.11725, lng: -85.16365,
    phone: "(260) 444-4249", phoneHref: "+12604444249", web: "https://www.stafffindersinc.net",
    desc: "Local Fort Wayne staffing agency (15 years in business) — temp and temporary placement work. Free to job seekers; you never pay a fee. active at 1615 W Coliseum Blvd, (260) 444-4249 (yellowpages + bizdb); no closure signals.",
    tags: ["Temp", "Local"],
    hoursText: "Hours unconfirmed — call (260) 444-4249 before heading over.",
  },
  {
    id: "job-first-call-medical", audited: "2026-10-11", name: "First Call Medical Staffing", type: "agency",
    addr: "528 W Washington Blvd", zip: "46802", lat: 41.0762, lng: -85.14659,
    phone: "(260) 424-1329", phoneHref: "+12604241329", web: "https://www.firstcallmedicalstaffing.com",
    desc: "Temporary medical staffing agency — places CNAs, nurses, and care staff at Fort Wayne healthcare facilities. Free to job seekers — you never pay a fee. still listed at 528 W Washington Blvd, (260) 424-1329, 24/7 directory listing; no closure signals.",
    tags: ["Temp", "Medical", "Healthcare"],
    hoursText: "Open 24/7 per directory listings — call (260) 424-1329 before heading over.",
  },
  {
    id: "job-labor-temporary", audited: "2026-10-11", name: "Labor Temporary Inc", type: "agency",
    addr: "3460 Stellhorn Rd, Suite B", zip: "46815", lat: 41.11839, lng: -85.09668,
    phone: "(260) 486-4727", phoneHref: "+12604864727",
    desc: "Local Fort Wayne day-labor / temporary staffing firm — general labor and warehouse assignments for job seekers. Free to job seekers; you never pay a fee. listed at 3460 Stellhorn Rd #B, (260) 486-4727; no closure signals found.",
    tags: ["Temp", "Day labor", "Local"],
    hoursText: "Hours unconfirmed — call (260) 486-4727 before heading over.",
  },
  {
    id: "job-alpha-rae", audited: "2026-10-11", name: "Alpha Rae Personnel", type: "agency",
    addr: "127 W Berry St, Suite 800", zip: "46802", lat: 41.07901, lng: -85.14063,
    phone: "1-800-837-8940", phoneHref: "+18008378940", web: "https://www.alpha-rae.com",
    desc: "Universal workforce staffing — temp, temp-to-hire, direct hire, and executive search. In the Centier Bank Building downtown (older listings show a previous 347 W Berry St address). Free to job seekers — you never pay a fee. active listing, operating status Active; no closure signals.",
    tags: ["Temp", "Direct hire", "Free to job seekers"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-core", name: "CORE Vocational Training", type: "help",
    audited: "2026-10-11",
    addr: "839 Northcrest Shopping Ctr", zip: "46805", lat: 41.11996, lng: -85.12836,
    phone: "(260) 483-2673", phoneHref: "+12604832673", web: "https://corevocationaltraining.org",
    desc: "Free vocational rehabilitation provider: on-site job skills training, real work experience with local business partners, and job placement for people with disabilities (visual, hearing, autism, developmental, TBI, and others).",
    tags: ["Free help", "Job training", "Disabilities"],
    hoursText: "Mon–Fri by appointment only — call (260) 483-2673 first. address/phone from official site + FULL_ADDRESS geocode; 4.9★/27 reviews, no closure signals.",
  },
  {
    id: "job-career-staffing", name: "Career Staffing LLC", type: "agency",
    audited: "2026-10-11",
    addr: "713 Airport North Office Park", zip: "46825", lat: 41.14628, lng: -85.16125,
    phone: "(260) 278-6500", phoneHref: "+12602786500", web: "https://mycareerstaffing.com/",
    desc: "Temporary, temp-to-hire, and long-term placements in manufacturing, light industrial, clerical, and professional fields — most requests filled within 24–48 hours. Completely free for job seekers; apply via the Job Seekers page. Mon–Fri 8 AM–4 PM per official site (active, no closure signals).",
    tags: ["Temp", "Temp-to-hire", "Manufacturing", "Light industrial"],
    hours: { 1: [480, 960], 2: [480, 960], 3: [480, 960], 4: [480, 960], 5: [480, 960] },
  },
  {
    id: "job-midwest-career", audited: "2026-10-11", name: "MidWest Career Staffing, Ltd.", type: "agency",
    addr: "1248 W Sherwood Terrace", zip: "46807", lat: 41.03987, lng: -85.15468,
    phone: "(260) 745-3810", phoneHref: "+12607453810",
    desc: "Independent Fort Wayne staffing firm, 20 years in business per Yellow Pages — temp and temp-to-hire placements. Free to job seekers, you never pay a fee. address/phone consistent across Yellow Pages, AllPages, and chamberofcommerce.com listings; FULL_ADDRESS geocode match; no closure signals; hours Mon–Fri 8am–5pm per active place-card listing.",
    tags: ["Temp", "Temp-to-hire", "Local"],
    hoursText: "Mon–Fri 8am–5pm; closed Sat–Sun. .",
  },
  {
    id: "job-next-step-staffing", audited: "2026-10-11", name: "The Next Step Staffing Inc.", type: "agency",
    addr: "3525 Lake Ave, Suite 5", zip: "46805", lat: 41.09058, lng: -85.09452,
    phone: "(260) 804-5627", phoneHref: "+12608045627", web: "http://www.thenextstepstaffing.com",
    desc: "Fort Wayne employment agency — temporary, temp-to-hire, and permanent placements, plus resume help, interview prep, and career counseling. Free to job seekers — you never pay a fee. address/phone/hours consistent across active place-card listing, Yellow Pages (13 years in business), headhunterslist, and mylocalservices; FULL_ADDRESS geocode match; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Local"],
    hoursText: "Mon–Tue 9am–4pm, Wed 10am–4pm, Thu–Fri 9am–4pm; closed Sat–Sun. .",
  },
  {
    id: "job-qci-technical-staffing", audited: "2026-10-11", name: "QCI Technical Staffing", type: "agency",
    addr: "3882 New Vision Dr", zip: "46845", lat: 41.187305, lng: -85.095166,
    phone: "(260) 436-9797", phoneHref: "+12604369797", web: "https://www.qcitech.com",
    desc: "Staffing firm for temporary, temp-to-perm, and direct-hire placements in skilled trades, industrial, and technical roles. official site (qcitech.com) is offline — address corrected to 3882 New Vision Dr per current place-card + directory listings (Active, (260) 436-9797, Mon–Fri 8–5); an archived 2006 copy of the official site showed 3970 New Vision Dr, so call ahead to confirm the current suite.",
    reVerified: "2026-10-07: addr corrected 3898 → 3882 New Vision Dr (current place card + independent directory; Active); phone (260) 436-9797 unchanged; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Skilled trades", "Industrial"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    id: "job-thunder-staffing", name: "Thunder Staffing Inc", type: "agency",
    audited: "2026-10-11",
    addr: "4242 Flagstaff Cove", zip: "46815", lat: 41.11992, lng: -85.02691,
    phone: "(260) 744-4543", phoneHref: "+12607444543", web: "https://thunderstaffinginc.com/",
    desc: "Fort Wayne staffing agency — temp and temp-to-hire placements in industrial and general roles; free to job seekers, you never pay a fee. active at 4242 Flagstaff Cove 46815, Mon–Fri 8am–4pm, (260) 744-4543; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Industrial", "Local"],
    hours: { 1: [480, 960], 2: [480, 960], 3: [480, 960], 4: [480, 960], 5: [480, 960] },
  },
  {
    id: "job-ibew-jatc", audited: "2026-10-11", name: "IBEW Local 305 — Electrical Apprenticeship (JATC)", type: "help",
    addr: "136 Chambeau Rd", zip: "46805", lat: 41.10839, lng: -85.14265,
    phone: "(260) 483-6257", phoneHref: "+12604836257", web: "https://www.ibew305.org/",
    desc: "Union-side path into the electrical trade run by IBEW Local 305 and the Fort Wayne Electrical JATC: paid apprenticeship combining on-the-job training with classroom instruction toward a journeyman electrician license — the union counterpart to the ABC merit-shop program. Apply through the JATC office at (260) 483-6257 (union hall (260) 484-9714). official JATC site still lists (260) 483-6257 at Chambeau Rd (office entrance 138 per fortwayneelectricaljatc.org, hall building 136 per D&B + place card — same complex); union hall (260) 484-9714; 4.7-star rating, no closure signals.",
    tags: ["Free help", "Apprenticeship", "Skilled trades", "Union"],
    hours: { 1: [480, 990], 2: [480, 990], 3: [480, 990], 4: [480, 990], 5: [480, 990] },
  },
  {
    audited: "2026-10-10", id: "job-plumbers-steamfitters-166", name: "Plumbers & Steamfitters Local 166 — Apprenticeship", type: "help",
    addr: "2930 W Ludwig Rd", zip: "46818", lat: 41.14028, lng: -85.1821,
    phone: "(260) 490-5690", phoneHref: "+12604905690", web: "http://www.ualocal166.org/",
    desc: "Free 5-year union apprenticeship in plumbing, pipefitting, welding, and HVAC service: paid on-the-job training plus classroom instruction in partnership with Ivy Tech — graduates earn a U.S. Department of Labor journeyman card and an associate degree at no cost (the union values the program at $50,000–$70,000). First-year applications being accepted for the June 2027 class per current postings. Call the apprenticeship line (260) 490-5690; union hall (260) 490-5696. address, phones, and Mon–Fri 8–5 hours from the official contact page at ualocal166.org; active place card (4.4 stars, 28 reviews, no closure signals); the local’s June 2026 new-apprentice orientation posts confirm the program is running.",
    tags: ["Free help", "Apprenticeship", "Skilled trades", "Union"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020] },
  },
  {
    audited: "2026-10-11", id: "job-sbdc-nei", name: "Indiana SBDC \u2014 Northeast Indiana", type: "help",
    addr: "3000 E Coliseum Blvd", zip: "46805", lat: 41.10901, lng: -85.10181,
    phone: "(260) 481-0500", phoneHref: "+12604810500", web: "https://isbdc.org",
    desc: "Free one-on-one advising for starting or growing a small business \u2014 business planning, bookkeeping, marketing, financing \u2014 from the SBA-backed Indiana Small Business Development Center network (hosted at Purdue Fort Wayne). Separate from SCORE's volunteer mentors; both are free and non-discriminatory. address 3000 E Coliseum Blvd + phone + Mon–Fri 9am–5pm all still match; same phone.",
    tags: ["Free help", "Business", "Self-employment"],
    hours: { 1: [540, 1020], 2: [540, 1020], 3: [540, 1020], 4: [540, 1020], 5: [540, 1020] },
    hoursText: "Mon–Fri 9am–5pm; advising by appointment — call (260) 481-0500 to schedule.",
  },
  {
    id: "job-svdp-build-to-work", name: "SVdP Build to Work (Carpentry + Job Skills)", type: "help",
    audited: "2026-10-11",
    addr: "1600 S Calhoun St", zip: "46802", lat: 41.070902, lng: -85.138584,
    phone: "(260) 456-3561", phoneHref: "+12604563561", web: "https://svdpfortwayne.org",
    desc: "Free 5-week, morning-only training for adults 18+ from the Society of St. Vincent de Paul – Fort Wayne: hands-on carpentry 3 days/week (measure, cut, frame, power tools on real projects like wheelchair ramps, decks, and furniture for families in need) plus a weekly life & career skills class covering resume writing, interview prep, budgeting, and money skills. You get paid while you learn; bus passes available to get to and from the program. No experience needed. Cohort-based — apply on svdpfortwayne.org; applications closed for the June 2026 cohort, so check the site for the next start date.",
    tags: ["Free help", "Job training", "Paid training", "Second chance"],
    hours: { 1: [540, 750], 2: [540, 750], 3: [540, 750], 4: [540, 750] },
    hoursText: "Cohort schedule: Mon–Thu 9am–12:30pm while a 5-week session runs. No current cohort confirmed as of 2026-10-06 — email/apply via svdpfortwayne.org and call (260) 456-3561 for the next start date.",
  },
  {
    id: "job-abounding-life", audited: "2026-10-11", name: "Abounding Life Resources & Recruitment Solutions", type: "agency",
    addr: "6029 Stoney Creek Dr", zip: "46825", lat: 41.13336, lng: -85.13985,
    phone: "(833) 693-5433", phoneHref: "+18336935433", web: "https://www.wechangedstaffing.com",
    desc: "Staffing agency — temp, temp-to-hire, direct hire, and medical staffing across industries; says it's the only Indiana agency that also gives its employees transportation and childcare referrals. Free to job seekers — you never pay a fee. current status 2026-10-02 listings confirm 6029 Stoney Creek Dr + (833) 693-5433; 'employment + transportation & childcare referrals' claim corroborated by current directory listings; no closure signals.",
    tags: ["Temp", "Local", "Transportation", "Childcare", ""],
    hours: { 1: [480, 1080], 2: [480, 1080], 3: [480, 1080], 4: [480, 1080], 5: [480, 1080] },
    hoursText: "Mon–Fri 8am–6pm; call (833) 693-5433 to confirm before heading over.",
  },
  {
    id: "job-pace-medical", name: "PACE Medical Staffing, Inc.", type: "agency",
    audited: "2026-10-11",
    addr: "6167 Stoney Creek Dr", zip: "46825", lat: 41.13416, lng: -85.13987,
    phone: "(260) 442-8884", phoneHref: "+12604428884", web: "https://www.pacemedcare.com/medical-staffing-for-employers",
    desc: "Supplemental medical staffing — places RNs, LPNs, CNAs, respiratory therapists, and allied health professionals at hospitals, nursing homes, physician offices, and home-care facilities. In business 21 years; directory listings show 24-hour operation. Free to job seekers — you never pay a fee. operating status Active/Open Now; no closure signals.",
    tags: ["Temp", "Medical staffing", "Free to job seekers", ""],
    hoursText: "Listings show open 24 hours — call (260) 442-8884 to confirm before heading over.",
  },
  {
    id: "job-united-staffing", audited: "2026-10-11", name: "United Staffing Solutions", type: "agency",
    addr: "4646 W Jefferson Blvd, Ste 240", zip: "46804", lat: 41.06707, lng: -85.20087,
    phone: "(260) 444-2019", phoneHref: "+12604442019", web: "https://www.unitedstaffingsolutions.org/",
    desc: "Healthcare staffing agency — places nurses, CNAs, and allied health professionals at local facilities; online application and weekly pay. Free to job seekers — you never pay a fee. operating status Active at 4646 W Jefferson Blvd Ste 240, (260) 444-2019, Mon–Fri 9 AM–4 PM per current directory listings; no closure signals.",
    tags: ["Temp", "Healthcare", "Nursing", "Free to job seekers", ""],
    hours: { 1: [540, 960], 2: [540, 960], 3: [540, 960], 4: [540, 960], 5: [540, 960] },
    hoursText: "Mon–Fri 9am–4pm; call (260) 444-2019 to confirm before heading over.",
  },
  {
    id: "job-star-staffing", name: "Star Staffing Services", type: "agency",
    audited: "2026-10-11",
    addr: "3010 E State Blvd", zip: "46805", lat: 41.09717, lng: -85.10066,
    phone: "(260) 482-8614", phoneHref: "+12604828614", web: "http://www.starstaffingservices.org/contact-us.html",
    desc: "Locally-owned temp/contract staffing agency — places associates with employers in light industrial and office roles; does basic math/reading pre-testing plus drug screening before placement. Free to job seekers — you never pay a fee. operating status Active at 3010 E State Blvd per official site + place card; no closure signals.",
    tags: ["Temp", "Local", "Day labor", "Free to job seekers", ""],
    hoursText: "Hours unconfirmed — call (260) 482-8614 before heading over.",
  },
  {
    id: "job-dabe-company", audited: "2026-10-11", name: "Dabe & Company", type: "agency",
    addr: "3508 Stellhorn Rd, Ste C", zip: "46815", lat: 41.11759, lng: -85.09821,
    phone: "(260) 492-4386", phoneHref: "+12604924386", web: "http://www.dabeandcompany.com",
    desc: "Staffing and employment agency — 'matching the best employees to the best employers.' Free to job seekers — you never pay a fee. operating status Active at 3508 Stellhorn Rd Ste C, Mon–Fri 8:30am–5pm per current directory listings; no closure signals.",
    tags: ["Temp", "Staffing", "Free to job seekers", ""],
    hours: { 1: [510, 1020], 2: [510, 1020], 3: [510, 1020], 4: [510, 1020], 5: [510, 1020] },
  },
  {
    id: "job-onsite-medical-staffing", audited: "2026-10-11", name: "On Site Medical Staffing", type: "agency",
    addr: "1833 Magnavox Way", zip: "46804", lat: 41.06837, lng: -85.22124,
    phone: "(260) 459-3398", phoneHref: "+12604593398",
    desc: "Small Fort Wayne healthcare staffing agency — places CNAs, home health aides, nurses, and general medical support staff at local facilities. Free to job seekers — you never pay a fee. address 1833 Magnavox Way + (260) 459-3398 match across current directory listings (Hubbiz, findabusinessthat, us-business.info); geocoder FULL_ADDRESS match; Re-checked 2026-10-10: a newer place listing shows 6215 Constitution Dr A, phone (260) 434-1981, site getelitemedicalstaffing.com - older directories still show 1833 Magnavox Way / (260) 459-3398; call before heading over.",
    tags: ["Temp", "Healthcare", "CNAs", "Free to job seekers", ""],
    hoursText: "Hours unconfirmed — call (260) 459-3398 before heading over.",
  },
  {
    id: "job-dreamer-staffing", audited: "2026-10-11", name: "Dreamer Staffing LLC", type: "agency",
    addr: "4804 Wayne Trace", zip: "46806", lat: 41.04043, lng: -85.08877,
    web: "https://inputfortwayne.com/turning-dreams-into-reality-meet-the-burmese-immigrant-helping-employers-and-job-seekers-connec/",
    desc: "Founded 2023 in Fort Wayne by Burmese immigrant Might Might — staffing agency connecting immigrants and refugees (especially the Burmese community, 9,000+ in Fort Wayne) with temp, warehouse, and manufacturing work. Hosts community job fairs (160+ applications at the first) and makes Burmese-language videos on resumes and interviews. real Fort Wayne address 4804 Wayne Trace (geocoder FULL_ADDRESS match), featured in Input Fort Wayne (2026) and listed on Indiana's 2025 community fair calendar; no closure signals. No public phone or hours found — reach out through the article page.",
    tags: ["Temp", "Staffing", "Immigrants", "Refugees", "Job fairs", ""],
    hoursText: "Hours unconfirmed — no public phone listing found; contact via the article link before heading over.",
  },
  {
    id: "job-weoc-niic", audited: "2026-10-11", name: "WEOC Women's Business Center (NIIC)", type: "help",
    addr: "3201 Stellhorn Rd", zip: "46815", lat: 41.11981, lng: -85.098882,
    phone: "(260) 416-3400", phoneHref: "+12604163400",
    desc: "SBA-recognized Women's Business Center at the Northeast Indiana Innovation Center (NIIC) — free no-cost business coaching, mentoring, training workshops, and access to capital for women at all stages of starting or growing a business. active at 3201 Stellhorn Rd (NIIC building), (260) 416-3400; named SBA Women's Center of the Year for the region; no closure signals.",
    tags: ["Free help", "Business coaching", "Mentoring", "Women", ""],
    hoursText: "Office hours unconfirmed — call (260) 416-3400 before heading over.",
  },
  {
    id: "job-staff-on-site", audited: "2026-10-11", name: "Staff On Site LLC", type: "agency",
    addr: "5800 Fairfield Ave", zip: "46807", lat: 41.03087, lng: -85.14384,
    phone: "(260) 557-3974", phoneHref: "+12605573974", web: "http://www.staff-onsite.com/",
    desc: "Healthcare staffing agency — hires RNs, LPNs, QMAs, and CNAs for facility staffing (full shifts down to 2-hour minimums) plus home care. Weekly pay, insurance available. Free to job seekers. Active listing at 5800 Fairfield Ave, (260) 557-3974, Mon–Fri 10am–2pm (staff-onsite.com + place card); no closure signals.",
    tags: ["Temp", "Healthcare", "CNA", ""],
    hoursText: "Office hours listed Mon–Fri 10am–2pm on directory listings — call (260) 557-3974 first.",
  },
  {
    id: "job-actalent", audited: "2026-10-11", name: "Actalent — Fort Wayne", type: "agency",
    addr: "7030 Pointe Inverness Way, Suite 210", zip: "46804", lat: 41.0739, lng: -85.2343,
    phone: "(260) 459-8000", phoneHref: "+12604598000", web: "https://www.actalentservices.com/en/locations/north-america/united-states/indiana/fort-wayne",
    desc: "Engineering and sciences staffing — contract, contract-to-hire, and direct placement. Free to job seekers — you never pay a fee. official actalentservices.com location page confirms Fort Wayne office at 7030 Pointe Inverness Way Suite 210, (260) 459-8000; Active place card; no closure signals. Allegis Group brand sharing the Suite 210 building with Aerotek and Aston Carter — distinct division, separate phone.",
    tags: ["Temp", "Engineering", "Sciences", ""],
    hoursText: "Office hours unconfirmed — call (260) 459-8000 before heading over.",
  },
  {
    id: "job-employment-1-fortwayne", audited: "2026-10-11", name: "Employment 1", type: "agency",
    addr: "1010 W Coliseum Blvd", zip: "46808", lat: 41.1183, lng: -85.15654,
    phone: "(260) 471-4800", phoneHref: "+12604714800",
    desc: "Fort Wayne staffing firm (est. 2001) — temporary staffing, temp-to-hire, and direct-hire placements in administrative & clerical, customer service, and light industrial roles. Free to job seekers — you never pay a fee. active at 1010 W Coliseum Blvd per multiple directories; no closure signals.",
    tags: ["Temp", "Temp-to-hire", "Clerical", "Customer service", "Light industrial", ""],
    hoursText: "Office hours unconfirmed — call (260) 471-4800 before heading over.",
  },
  {
    audited: "2026-10-11", id: "job-ironworkers-147", name: "Iron Workers Local 147 — Apprenticeship", type: "help",
    addr: "6345 Innovation Blvd", zip: "46818", lat: 41.13628, lng: -85.1789,
    phone: "(260) 484-8514", phoneHref: "+12604848514", web: "http://www.ironworkers147.org/",
    desc: "Union ironworker apprenticeship in Fort Wayne: 4-year paid program combining 4,200+ hours of on-the-job training with 204 hours of classroom instruction per year — structural steel, concrete reinforcement, rigging, welding, ornamental ironwork, blueprint reading; welding certification, OSHA 10/30, and other credentials included; competitive wage from day one. Apply in person at the union hall with driver's license, birth certificate, high school diploma or GED, and Social Security card (DD214 for veterans); 18+ and a pre-employment drug test required. address, phone, and program details from the official ironworkers147.org site (hall moved from the old 1211 W Coliseum Blvd location); active place card, no closure signals.",
    tags: ["Free help", "Apprenticeship", "Skilled trades", "Union", "Paid training", ""],
    hours: { 1: [450, 930], 2: [450, 930], 3: [450, 930], 4: [450, 930], 5: [450, 930] },
  },
  {
    id: "job-enterprise-staffing", audited: "2026-10-11", name: "Enterprise Staffing — Fort Wayne", type: "agency",
    addr: "7315 W Jefferson Blvd", zip: "46804", lat: 41.04608, lng: -85.23487,
    phone: "(260) 387-7376", phoneHref: "+12603877376", web: "https://www.enterprisestaffing.net/",
    desc: "Staffing agency — temp and temp-to-hire placements. Free to job seekers, you never pay a fee. active place listing (Active, no closure signals) and the company's own site both show 7315 W Jefferson Blvd, (260) 387-7376; hours Mon–Sat 8am–5pm per place listing.",
    tags: ["Temp", "Temp-to-hire"],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020], 6: [480, 1020] },
  },
  {
    id: "job-kendall-davis", audited: "2026-10-11", name: "Kendall & Davis, Inc.", type: "agency",
    addr: "111 E Ludwig Rd, Suite 109", zip: "46825", lat: 41.13956, lng: -85.14053,
    phone: "(260) 489-8014", phoneHref: "+12604898014", web: "https://kendalldavis.com/",
    desc: "Private search/recruiting firm in business since 1978 — technical, engineering, and IT talent search and placement (direct-hire and consulting roles). Free to job seekers — you never pay a fee. Yellow Pages and AllPages now both pair (260) 489-8014 with 111 E Ludwig Rd Ste 109 (geocoded 41.13956, -85.14053), Mon–Fri 8:00am–5:30pm; older directories listed 701 S Clinton St Ste 324 — office appears to have moved. Own site (kendalldavis.com) shows only a Rome City PO Box; no closure signals.",
    tags: ["Recruiting", "Search firm", "Technical", "Engineering"],
    hours: { 1: [480, 1050], 2: [480, 1050], 3: [480, 1050], 4: [480, 1050], 5: [480, 1050] },
  },
  {
    id: "job-grn-fort-wayne", audited: "2026-10-11", name: "GRN Fort Wayne — Global Recruiters of Fort Wayne", type: "agency",
    addr: "2121 Traders Crossing", zip: "46845", lat: 41.17998, lng: -85.11452,
    phone: "(260) 637-7685", phoneHref: "+12606377685",
    desc: "Global Recruiters Network franchise — free job placement and recruiting for job seekers in professional, manufacturing, sales, and management roles (employers pay, you never pay a fee). address (2121 Traders Crossing) and phone confirmed on SHRM vendor directory and 2026 directory crawls; no closure signals.",
    tags: ["Recruiting", "Placement", "Professional", "Sales", "Management"],
    hoursText: "Hours unconfirmed — call (260) 637-7685 before heading over.",
  },
]

/* ===== app.js ===== */
function toggleSidebar(){try{closeMore();}catch(e){}}
var HAVEN_BUILD=104;
var havenDataFailed=false;
var HAVEN_DATA_ERR_HTML="<div role='alert' style='margin:16px;padding:20px;border:1px solid #5b2b2b;border-radius:12px;background:#231418;text-align:center;'><div style='color:#fff;font-weight:700;font-size:16px;margin-bottom:8px;'>Couldn't load the directory</div><div style='color:#d8b4b4;font-size:14px;line-height:1.5;'>Check your connection and reopen.</div><div style='margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;'><a class='sheet-btn' href='tel:211'>Call 211 for help</a><a class='sheet-btn' href='sms:988'>Text 988</a></div></div>";
let allPlaces=[];let curList=[];let map,markers;let sortMode='def';let userLoc=null;let sheetPlace=null;let remindEditing=-1;function distMi(aLat,aLng,bLat,bLng){const R=3958.8,rad=Math.PI/180;const dLat=(bLat-aLat)*rad,dLng=(bLng-aLng)*rad;const h=Math.sin(dLat/2)**2+Math.cos(aLat*rad)*Math.cos(bLat*rad)*Math.sin(dLng/2)**2;return 2*R*Math.asin(Math.sqrt(h));}function applySort(list){if(sortMode==='az')return list.slice().sort((a,b)=>String(a.name||'').localeCompare(String(b.name||'')));if(sortMode==='near'&&userLoc)return list.slice().sort((a,b)=>distMi(userLoc.lat,userLoc.lng,a.lat,a.lng)-distMi(userLoc.lat,userLoc.lng,b.lat,b.lng));return list;}function activeCats(){return[...document.querySelectorAll('#sidebar-filters .filter-btn.active')].map(b=>b.dataset.cat).filter(c=>c);}function activeCat(){return activeCats()[0]||'';}function activeQ(){return document.getElementById('search').value;}function requestNear(sel){if(userLoc){sortMode='near';render(activeCats(),activeQ());return;}if(!navigator.geolocation){alert('Location is not supported on this device.');sel.value=sortMode;return;}document.getElementById('loc-note').textContent='getting location…';navigator.geolocation.getCurrentPosition(p=>{userLoc={lat:p.coords.latitude,lng:p.coords.longitude};sortMode='near';document.getElementById('loc-note').textContent='';render(activeCats(),activeQ());},()=>{document.getElementById('loc-note').textContent='';alert('Could not get your location. Showing default order.');sel.value=sortMode;},{timeout:8000});}const FILTER_CATS={'food':'🍔 Food','meals':'🍽️ Meals','shelter':'🏠 Shelter','health':'🏥 Health','mental':'🧠 Mental','recovery':'💪 Recovery','benefits':'💰 Benefits','bathroom':'🚻 Bathroom','laundry':'👕 Laundry','day':'☀️ Day','water':'💧 Water','wifi':'📶 WiFi','charge':'🔌 Charge','bus':'🚌 Transit','youth':'👦 Youth','pets':'🐾 Pets','freeclothes':'👔 Clothes','thrift':'🛒 Thrift','cash':'💵 Cash','vouchers':'🎟️ Vouchers','hangout':'🛋️ Hangout','lgbtq':'🏳️‍🌈 LGBTQ+','narcan':'💊 Narcan','bank':'🏦 Bank','babybox':'📦 Baby Box','bikeair':'🚲 Bike Air','freebike':'🚲 Free Bike'};const NEED_SYN={hungry:['food','meals'],starving:['food','meals'],eat:['food','meals'],food:['food','meals'],shower:['day'],hygiene:['day'],clean:['day','laundry'],laundry:['laundry'],wash:['laundry'],cold:['shelter'],sleep:['shelter'],bed:['shelter'],sick:['health'],hurt:['health'],doctor:['health'],bathroom:['bathroom'],restroom:['bathroom'],toilet:['bathroom'],water:['water'],thirsty:['water'],charge:['charge','wifi'],wifi:['wifi'],phone:['charge','wifi'],internet:['wifi'],dog:['pets'],pet:['pets'],period:['health'],pregnant:['health','babybox'],baby:['babybox','youth'],kids:['youth','freeclothes'],clothes:['freeclothes'],clothing:['freeclothes'],job:['cash'],money:['cash'],gig:['cash'],work:['cash'],bus:['bus'],ride:['bus'],benefits:['benefits'],vet:['benefits'],veteran:['benefits'],domestic:['mental'],abuse:['mental'],overdose:['narcan'],naloxone:['narcan'],lgbt:['lgbtq'],queer:['lgbtq'],youth:['youth'],teen:['youth'],recover:['recovery'],sober:['recovery'],therapy:['mental'],anxious:['mental'],depressed:['mental']};
function matchNeed(r,q){var txt=((r.name||'')+' '+(r.desc||'')+' '+(r.addr||'')+' '+((r.cats||[]).join(' '))+' '+((r.tags||[]).join(' '))).toLowerCase();var qt=q.trim();
if(NEED_SYN.hasOwnProperty(qt)){
if(new RegExp('\\b'+qt+'s?\\b').test(txt))return true;
}else if(txt.indexOf(q)>=0)return true;for(var k in NEED_SYN){if(new RegExp('\\b'+k+'s?\\b').test(q)){var cats=r.cats||[];for(var i=0;i<NEED_SYN[k].length;i++){if(cats.indexOf(NEED_SYN[k][i])>=0)return true;}}}return false;}const PIN_EMOJI={food:'🍔',meals:'🍽️',shelter:'🏠',health:'🏥',mental:'🧠',recovery:'💪',benefits:'💰',bathroom:'🚻',laundry:'👕',wifi:'📶',charge:'🔌',bus:'🚌',youth:'👦',pets:'🐾',freeclothes:'👔',thrift:'🛒',day:'☀️',water:'💧',cash:'💵',vouchers:'🎟️',bank:'🏦',babybox:'📦',bikeair:'🚲',freebike:'🚲',hangout:'🛋️',lgbtq:'🏳️‍🌈',narcan:'💊'};const PIN_COLOR={food:'#f59e0b',meals:'#f97316',shelter:'#3b82f6',health:'#ef4444',mental:'#8b5cf6',recovery:'#10b981',benefits:'#eab308',bathroom:'#06b6d4',laundry:'#6366f1',wifi:'#0ea5e9',charge:'#facc15',bus:'#14b8a6',youth:'#ec4899',pets:'#a855f7',freeclothes:'#64748b',thrift:'#78716c',day:'#fbbf24',water:'#38bdf8',cash:'#22c55e',vouchers:'#d946ef',bank:'#475569',babybox:'#f472b6',bikeair:'#84cc16',freebike:'#65a30d',hangout:'#a78bfa',lgbtq:'#f472b6',narcan:'#dc2626'};function favIds(){try{return JSON.parse(localStorage.getItem('haven_favs')||'[]');}catch(e){return[];}}function favKey(r){return r.id||r.name;}function escapeAttr(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}function escapeHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}function saveRecentSearch(q){let r=JSON.parse(localStorage.getItem('haven_recent')||'[]');r=[q,...r.filter(x=>x!==q)].slice(0,5);localStorage.setItem('haven_recent',JSON.stringify(r));renderRecent();buildMoreSheet();}function renderRecent(){const r=JSON.parse(localStorage.getItem('haven_recent')||'[]');const el=document.getElementById('recent-searches');if(!el)return;el.innerHTML=r.length ? '<div style="padding:0 16px 8px;"><small style="color:#888">Recent:</small>'+r.map(q=>`<button onclick="doRecent('${escapeAttr(q)}')" style="margin:2px;padding:4px 10px;border:1px solid #333;border-radius:12px;background:#1a1f2e;color:#aaa;font-size:12px;cursor:pointer;">${escapeHtml(q)}</button>`).join('')+'</div>':'';}function doRecent(q){document.getElementById('search').value=q;render(activeCats(),q);}function buildMoreSheet(){const ml=document.getElementById('more-list');if(!ml||ml.children.length)return;var row=function(m){return '<button class="more-row" onclick="moreGo(\''+m[0]+'\')"><svg class="mi" width="24" height="24" aria-hidden="true"><use href="#'+m[1]+'"/></svg><span class="ml">'+m[2]+'</span><svg class="chev" width="20" height="20" aria-hidden="true"><use href="#haven-chevron-right"/></svg></button>';};var groups=[{t:null,items:MORE_ITEMS.filter(function(m){return m[0]==='__apk__';})},{t:'Do',items:MORE_ITEMS.filter(function(m){return['jobs','gigs','events','volunteer'].indexOf(m[0])>=0;})},{t:'Learn',items:MORE_ITEMS.filter(function(m){return['guide','programs','learn','wiki'].indexOf(m[0])>=0;})}];ml.innerHTML=groups.map(function(g){return (g.t?'<div class="more-sec">'+g.t+'</div>':'')+g.items.map(row).join('');}).join('');}
function toggleFilterPanel(){const fp=document.getElementById('filter-panel');const ov=document.getElementById('sidebar-overlay');const open=fp.style.right==='0px';fp.style.right=open ? '-280px':'0px';ov.style.display=open ? 'none':'block';ov.onclick=()=>{fp.style.right='-280px';ov.style.display='none';ov.onclick=()=>toggleSidebar();};}let openNow=false;function syncOpenNowButtons(){var bg=openNow?'#22c55e':'#dc2626';var mb=document.getElementById('map-open-toggle');if(mb){mb.style.color='#fff';mb.style.background=bg;mb.style.borderColor=bg;}var pb=document.getElementById('places-open-toggle');if(pb){pb.style.background=bg;pb.style.color='#fff';}var tb=document.getElementById('pt-open-toggle');if(tb){tb.style.background=bg;tb.style.color='#fff';}}function toggleMapOpenNow(btn){openNow=!openNow;syncOpenNowButtons();updateFilterCount();render(activeCats(),activeQ());}function togglePlacesSheet(){const sh=document.getElementById('places-sheet');const open=sh.style.bottom==='0px';sh.style.bottom=open ? '-70vh':'0px';const btn=document.getElementById('places-toggle-btn');if(btn)btn.innerHTML=open?'📍 Nearby':'🗺️ Map';const cnt=document.getElementById('places-count');if(cnt&&curList)cnt.textContent=`(${curList.length})`;if(!open)initPlacesSheetFilters();}let placesSheetCats=[];function togglePlacesOpenNow(btn){openNow=!openNow;syncOpenNowButtons();renderPlacesSheet();}let bathroomOnly=false;let kidsMode=false;function isFamilyFriendly(r){var cats=r.cats||[];for(var i=0;i<cats.length;i++){if(cats[i]==='youth'||cats[i]==='babybox')return true;}var t=((r.name||'')+' '+(r.desc||'')+' '+((r.tags||[]).join(' '))).toLowerCase();return /\b(famil|children|kids|child|youth|mother|moms?)\w*|women & children|women and children/.test(t);}function ensureLoc(cb){if(userLoc){if(cb)cb();return;}if(!navigator.geolocation){if(cb)cb();return;}navigator.geolocation.getCurrentPosition(function(p){userLoc={lat:p.coords.latitude,lng:p.coords.longitude};if(cb)cb();},function(){if(cb)cb();},{timeout:8000});}function syncQuickToggles(){var on='#22c55e';[['bathroom-toggle',bathroomOnly],['bathroom-toggle-pt',bathroomOnly],['kids-toggle',kidsMode],['kids-toggle-pt',kidsMode]].forEach(function(pr){var el=document.getElementById(pr[0]);if(!el)return;el.style.background=pr[1]?on:'#2a2f3e';el.style.color=pr[1]?'#fff':'#aaa';el.style.borderColor=pr[1]?on:'#444';});}function toggleBathroom(){bathroomOnly=!bathroomOnly;syncQuickToggles();if(bathroomOnly){var ps=document.getElementById('places-sort');if(ps)ps.value='near';var ts=document.getElementById('pt-sort');if(ts)ts.value='near';ensureLoc(function(){renderPlacesSheet();renderPlacesTab();});}else{renderPlacesSheet();renderPlacesTab();}}function toggleKidsMode(){kidsMode=!kidsMode;syncQuickToggles();renderPlacesSheet();renderPlacesTab();}function initPlacesSheetFilters(){const pf=document.getElementById('places-filters');if(!pf||pf.children.length)return;pf.innerHTML=Object.entries(FILTER_CATS).map(([k,v])=>`<button onclick="togglePlacesSheetCat('${k}',this)" style="flex:none;padding:8px 12px;border:1px solid #444;border-radius:16px;background:#2a2f3e;color:#aaa;font-size:13px;cursor:pointer;">${v}</button>`).join('');}function togglePlacesSheetCat(cat,btn){const i=placesSheetCats.indexOf(cat);if(i>=0){placesSheetCats.splice(i,1);btn.style.background='#2a2f3e';btn.style.color='#aaa';}else{placesSheetCats.push(cat);btn.style.background='#7c8aff';btn.style.color='#fff';}renderPlacesSheet();}function renderPlacesSheet(){if(havenDataFailed){curList=[];var _le=document.getElementById('list');if(_le)_le.innerHTML=HAVEN_DATA_ERR_HTML;var _pc=document.getElementById('places-count');if(_pc)_pc.textContent='(0)';return;}const q=(document.getElementById('places-search').value||'').toLowerCase();const sort=document.getElementById('places-sort').value;let list=placesInArea();if(placesSheetCats.length)list=list.filter(r=>(r.cats||[]).some(c=>placesSheetCats.includes(c)));if(openNow)list=list.filter(r=>isOpenNow(r));if(bathroomOnly)list=list.filter(r=>(r.cats||[]).indexOf('bathroom')>=0);if(kidsMode)list=list.filter(r=>isFamilyFriendly(r));if(q)list=list.filter(function(r){return matchNeed(r,q);});if(sort==='az')list.sort((a,b)=>a.name.localeCompare(b.name));else if(sort==='near'&&userLoc){list.forEach(r=>{r._d=distMi(userLoc.lat,userLoc.lng,r.lat,r.lng);});list.sort((a,b)=>a._d-b._d);}curList=list;const cnt=document.getElementById('places-count');if(cnt)cnt.textContent=`(${list.length})`;var _empty=(openNow?'<div style="text-align:center;padding:24px 20px;"><div style="color:#fff;font-weight:700;font-size:16px;margin-bottom:8px;">Nothing open right now</div><div style="color:#aaa;font-size:14px;margin-bottom:14px;line-height:1.5;">Most places are closed at this hour. If you need somewhere to go tonight:</div><button class="sheet-btn" onclick="openSafeTonight()" style="margin-bottom:8px;">Safe Tonight — shelters open now</button><br><a class="sheet-btn" href="tel:211">Call 211 for help</a></div>':'<div style="text-align:center;padding:24px 20px;"><div style="color:#fff;font-weight:700;font-size:16px;margin-bottom:8px;">No places found</div><div style="color:#aaa;font-size:14px;margin-bottom:14px;line-height:1.5;">Try a different word — or if you need help right now:</div><button class="sheet-btn" onclick="openSafeTonight()" style="margin-bottom:8px;">Safe Tonight — shelters open now</button><br><a class="sheet-btn" href="tel:211">Call 211 for help</a></div>');document.getElementById('list').innerHTML=list.map((r,idx)=>{let emoji='💜',color='#7c8aff';for(const c of(r.cats||[])){if(PIN_EMOJI[c]){emoji=PIN_EMOJI[c];color=PIN_COLOR[c]||'#7c8aff';break;}}return `<div onclick="openPlacePanel(curList[${idx}])" style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #2a2f3e;cursor:pointer;"><div style="width:40px;height:40px;flex:none;border-radius:50%;background:${color}22;border:2px solid ${color};display:flex;align-items:center;justify-content:center;font-size:20px;">${emoji}</div><div style="flex:1;min-width:0;"><div style="color:#fff;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(r.name)}${openBadge(r)}</div><div style="color:#888;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(r.addr||'')}</div></div></div>`;}).join('')||_empty;}function toggleFilterCollapse(){const f=document.getElementById('sidebar-filters');const a=document.getElementById('filter-arrow');const hidden=f.style.display==='none';f.style.display=hidden ? 'block':'none';a.textContent=hidden ? '▼':'▶';}function toggleSortCollapse(){const f=document.getElementById('sort-sidebar');const a=document.getElementById('sort-arrow');const hidden=f.style.display==='none';f.style.display=hidden ? 'block':'none';a.textContent=hidden ? '▼':'▶';}function goBrowsePlaces(){goTab('map');setTimeout(()=>{const q=document.getElementById('search');if(q)q.focus({preventScroll:true});},120);}function openPlacePanel(r){
  var el=document.getElementById('peek');
  var content=document.getElementById('peek-content');
  if(!el||!content||!r)return;
  var name='', addr='', phone='', web='', desc='', cats='';
  try{name=escapeHtml(r.name||'Place');}catch(e){name='Place';}
  try{addr=escapeHtml(r.addr||'');}catch(e){}
  try{phone=escapeHtml(r.phone||'');}catch(e){}
  try{web=escapeAttr(r.web||'');}catch(e){}
  try{desc=escapeHtml(r.desc||'');}catch(e){}
  try{cats=escapeHtml((r.cats||[]).join(' · '));}catch(e){}
  var html='<button type="button" id="gmClose" aria-label="Close" onclick="closePlacePanel()" style="position:absolute;top:8px;right:8px;z-index:2;width:34px;height:34px;border-radius:50%;border:1px solid #444;background:#2a2f3e;color:#fff;font-size:16px;cursor:pointer;">✕</button>';
  html+='<div style="padding-top:6px;"><div style="font-size:18px;font-weight:600;color:#fff;line-height:1.25;padding-right:40px;">'+name+'</div>';
  if(cats)html+='<div style="margin-top:3px;font-size:13px;color:#888;">'+cats+'</div></div>';var stHtml=openDetailLine(r)||openStatusLine(r);if(stHtml)html+='<div style="margin-top:8px;font-size:14px;">'+stHtml+'</div>';
  html+='<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">';
  if(r.lat)html+='<a href="https://www.google.com/maps/dir/?api=1&destination='+r.lat+','+r.lng+'" target="_blank" style="padding:9px 16px;border-radius:20px;background:#4ade80;color:#06130b;text-decoration:none;font-weight:700;font-size:14px;min-height:44px;display:inline-flex;align-items:center;">Directions</a>';
  if(r.phone)html+='<a href="tel:'+escapeAttr(r.phone)+'" style="padding:9px 16px;border-radius:20px;border:1px solid #444;color:#7c8aff;text-decoration:none;font-weight:600;font-size:14px;min-height:44px;display:inline-flex;align-items:center;">Call</a>';else html+='<a href="tel:211" style="padding:9px 16px;border-radius:20px;border:1px solid #444;color:#7c8aff;text-decoration:none;font-weight:600;font-size:13px;">Call 211 for help</a>';html+='<a href="sms:?body='+encodeURIComponent(planText(r))+'" style="padding:9px 16px;border-radius:20px;border:1px solid #444;color:#7c8aff;text-decoration:none;font-weight:600;font-size:14px;min-height:44px;display:inline-flex;align-items:center;">Text my plan</a>';
  html+='</div>';
  if(addr)html+='<div style="font-size:15px;padding:9px 0;border-bottom:1px solid rgba(128,128,128,.25);color:#ddd;">📍 '+addr+'</div>';
  if(phone)html+='<div style="font-size:15px;padding:9px 0;border-bottom:1px solid rgba(128,128,128,.25);color:#ddd;">📞 <a href="tel:'+escapeAttr(r.phone)+'" style="color:#7c8aff;text-decoration:none;">'+phone+'</a></div>';
  if(web)html+='<div style="font-size:15px;padding:9px 0;border-bottom:1px solid rgba(128,128,128,.25);color:#ddd;">🌐 <a href="'+web+'" target="_blank" style="color:#7c8aff;text-decoration:none;">Website</a></div>';
  if(desc)html+='<p style="font-size:14px;line-height:1.5;margin:12px 0;color:#ccc;">'+desc+'</p>';
  content.innerHTML=html;
  el.classList.add('show');
}function closePlacePanel(){document.getElementById('peek').classList.remove('show','full');const pp=document.getElementById('place-panel');if(pp)pp.style.right='-400px';const btn=document.querySelector('button[onclick="togglePlacesSheet()"]');if(btn)btn.style.display='block';}function byId(id){return(typeof RESOURCES!=='undefined' ? RESOURCES:[]).find(r=>r.id===id)||{};}function formatHours(h){if(!h)return '';if(typeof h==='string'){try{h=JSON.parse(h);}catch(e){return h;}}if(typeof h!=='object')return String(h);const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];const fmt=m=>{const hh=Math.floor(m/60),mm=m % 60;const ap=hh>=12 ? 'PM':'AM';const h12=hh % 12||12;return `${h12}:${String(mm).padStart(2,'0')}${ap}`;};return days.map((d,i)=>{const v=h[String(i)]||h[i];if(!v)return `${d}:Closed`;if(Array.isArray(v))return `${d}:${fmt(v[0])}– ${fmt(v[1])}`;return `${d}:${v}`;}).join('<br>');}function toggleFavByKey(fk){let favs=favIds();favs=favs.includes(fk)? favs.filter(x=>x!==fk):[...favs,fk];localStorage.setItem('haven_favs',JSON.stringify(favs));render(activeCats(),activeQ());}function sharePlace(fk){const r=(typeof RESOURCES!=='undefined' ? RESOURCES:[]).find(x=>favKey(x)===fk)||{};const text=`${r.name}\n${r.addr||''}\n${r.phone||''}`;if(navigator.share)navigator.share({title:r.name,text});else if(navigator.clipboard){navigator.clipboard.writeText(text);alert('Copied!');}else prompt('Copy:',text);}function getVerify(fk){try{const all=JSON.parse(localStorage.getItem('haven_verify')||'{}');const v=all[fk];return(v&&typeof v==='object')?{ok:v.ok|0,bad:v.bad|0,mine:v.mine||null}:{ok:0,bad:0,mine:null};}catch(e){return{ok:0,bad:0,mine:null};}}function saveVerify(fk,v){let all={};try{all=JSON.parse(localStorage.getItem('haven_verify')||'{}');}catch(e){}all[fk]=v;try{localStorage.setItem('haven_verify',JSON.stringify(all));}catch(e){}}function migrateVerify(fk){const v=getVerify(fk);let legacy=false;try{legacy=localStorage.getItem('verified_'+fk)==='1';}catch(e){}if(legacy&&!v.mine){v.ok+=1;v.mine='ok';saveVerify(fk,v);try{localStorage.removeItem('verified_'+fk);}catch(e){}}return v;}function verifyPlace(fk){const v=getVerify(fk);if(v.mine){miniToast('Already verified ✓');return;}v.ok+=1;v.mine='ok';saveVerify(fk,v);miniToast('Thanks — marked as verified ✓');}function verifyBadgeHtml(v){const n=(v&&v.ok)|0;if(n<=0)return '';return '<p><span class="open-badge">✓ Verified by users'+(n>1 ? '('+n+')':'')+'</span></p>';}function isOpenNow(r){const h=r&&r.hours;if(!h||typeof h!=='object')return null;const d=new Date();const day=d.getDay();let v=h[day];if(v===undefined&&day===0)v=h[7];if(Array.isArray(v)&&v.length===0)return false;if(!Array.isArray(v)||v.length!==2||typeof v[0]!=='number'||typeof v[1]!=='number')return null;let o=v[0],c=v[1];if(o>1440||c>1440){const conv=x=>Math.floor(x/100)*60+(x % 100);o=conv(o);c=conv(c);}if(!(o>=0&&c>o&&c<=1440))return null;const now=d.getHours()*60+d.getMinutes();return now>=o&&now<c;}function openBadge(r){return isOpenNow(r)===true ? '<div class="open-badge open-now">🟢 Open now</div>':'';}function openStatusLine(r){const s=isOpenNow(r);if(s===true)return '<b style="color:#4ade80">🟢 Open now</b>';if(s===false)return '<span style="color:#e74c3c">🔴 Closed now</span>';return '';}function openDetailLine(r){var h=r&&r.hours;if(!h||typeof h!=='object')return '';var d=new Date();var day=d.getDay();var v=h[day];if(v===undefined&&day===0)v=h[7];if(!Array.isArray(v)||v.length!==2)return '';var fmt=function(m){var hh=Math.floor(m/60),mm=m%60,ap=hh>=12?'PM':'AM';var h12=hh%12||12;return h12+':'+String(mm).padStart(2,'0')+' '+ap;};var now=d.getHours()*60+d.getMinutes();if(now>=v[0]&&now<v[1])return 'Open now · closes '+fmt(v[1]);return 'Closed now · opens '+fmt(v[0]);}function toggleFavAttr(btn){toggleFav(btn.dataset.fkey);}function toggleFav(key){let ids=favIds();ids=ids.includes(key)? ids.filter(x=>x!==key):[...ids,key];try{localStorage.setItem('haven_favs',JSON.stringify(ids));}catch(e){}render(activeCats(),document.getElementById('search').value);renderFavs();}const AREAS={'fort-wayne':{name:'Fort Wayne,IN',short:'Fort Wayne',lat:41.0793,lon:-85.1394,zoom:12,tz:'America/Indiana/Indianapolis'},'portland':{name:'Portland,OR',short:'Portland',lat:45.5152,lon:-122.6784,zoom:12,tz:'America/Los_Angeles'}};function areaOf(r){return(r&&r.area)||'fort-wayne';}function getArea(){try{const a=localStorage.getItem('haven_area');if(a&&AREAS[a])return a;}catch(e){}return 'fort-wayne';}function areaCenter(){return AREAS[getArea()];}function placesInArea(){return allPlaces.filter(r=>areaOf(r)===getArea());}function setArea(a){if(!AREAS[a]||a===getArea())return;try{localStorage.setItem('haven_area',a);}catch(e){}applyArea();miniToast('📍 '+AREAS[a].name);}function cycleArea(){setArea(getArea()==='fort-wayne' ? 'portland':'fort-wayne');}function applyArea(){const A=areaCenter();const chip=document.getElementById('area-chip');if(chip){const an=chip.querySelector('.area-name');if(an)an.textContent=A.name;}const sub=document.getElementById('area-sub');if(sub)sub.textContent=A.short;const sub2=document.getElementById('area-sub2');if(sub2)sub2.textContent=A.short;const cnt=document.getElementById('count');if(cnt&&typeof allPlaces!=='undefined')cnt.textContent=placesInArea().length+' places';if(typeof map!=='undefined'&&map)map.setView([A.lat,A.lon],A.zoom);renderHotlines();renderJobs();renderGigs();renderEvents();renderGuides();loadWeather();if(typeof RESOURCES!=='undefined')render(activeCats(),activeQ());}function detectAreaGeo(){if(!navigator.geolocation)return;try{if(localStorage.getItem('haven_area'))return;}catch(e){return;}navigator.geolocation.getCurrentPosition(pos=>{try{if(localStorage.getItem('haven_area'))return;}catch(e){return;}const dFW=distMi(pos.coords.latitude,pos.coords.longitude,41.0793,-85.1394);const dPDX=distMi(pos.coords.latitude,pos.coords.longitude,45.5152,-122.6784);setArea(dPDX<dFW ? 'portland':'fort-wayne');},()=>{},{timeout:8000,maximumAge:900000});}function init(){havenDataFailed=(typeof RESOURCES==='undefined'||!RESOURCES.length);if(havenDataFailed){console.warn('RESOURCES not loaded or empty');}allPlaces=(typeof RESOURCES!=='undefined'?RESOURCES:[]).filter(r=>r.lat&&r.lng);
allPlaces.forEach(r=>{if(!r.name&&r.title)r.name=r.title;if(!r.cats&&r.cat)r.cats=[r.cat];if(!r.web&&r.url)r.web=r.url;});allPlaces.forEach(r=>{r._score=Math.max(...(r.cats||[]).map(c=>({shelter:9,meals:9,health:8,mental:8,recovery:7,benefits:7,food:6,cash:6,bathroom:5,water:5,youth:5,hangout:3,thrift:3}[c]||4)))*10;});document.getElementById('count').textContent=placesInArea().length+' places';if(typeof renderGuides==='function')renderGuides();const AC0=areaCenter();map=L.map('map',{zoomControl:false,zoomSnap:0.5,zoomDelta:0.5,zoomAnimation:true,fadeAnimation:true,markerZoomAnimation:true,inertia:true}).setView([AC0.lat,AC0.lon],AC0.zoom);L.control.zoom({position:'bottomright'}).addTo(map);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',{maxZoom:20,attribution:'© Esri'}).addTo(map);let zoomT=null;function updateZoomClasses(){const z=map.getZoom();document.body.classList.toggle('gs',z<14);document.body.classList.toggle('gm',z>=14&&z<16);document.body.classList.toggle('pnames',z>=16);}map.on('zoomend',()=>{updateZoomClasses();clearTimeout(zoomT);zoomT=setTimeout(()=>render(activeCats(),activeQ(),true),50);});map.on('zoomstart',()=>updateZoomClasses());const fc=document.getElementById('filters');fc.innerHTML='<button class="filter-btn active" data-cat="">All</button>'+Object.entries(FILTER_CATS).map(([k,v])=>`<button class="filter-btn" data-cat="${k}">${v}</button>`).join('');const sfc=document.getElementById('sidebar-filters');if(sfc){sfc.innerHTML='<button class="filter-btn active" data-cat="" style="display:block;width:100%;text-align:left;margin-bottom:4px;">All</button>'+Object.entries(FILTER_CATS).map(([k,v])=>`<button class="filter-btn" data-cat="${k}" style="display:block;width:100%;text-align:left;margin-bottom:4px;">${v}</button>`).join('');sfc.addEventListener('click',e=>{const btn=e.target.closest('.filter-btn');if(!btn||btn.dataset.cat===undefined)return;const cat=btn.dataset.cat;if(cat===''){document.querySelectorAll('#sidebar-filters .filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');}else{document.querySelector('#sidebar-filters .filter-btn[data-cat=""]').classList.remove('active');btn.classList.toggle('active');if(!document.querySelector('#sidebar-filters .filter-btn.active')){document.querySelector('#sidebar-filters .filter-btn[data-cat=""]').classList.add('active');}}const cats=activeCats();document.querySelectorAll('#filters .filter-btn').forEach(b=>b.classList.toggle('active',cats.includes(b.dataset.cat)||(cats.length===0&&b.dataset.cat==='')));render(cats,document.getElementById('search').value);});}fc.addEventListener('click',e=>{if(e.target.dataset.cat!==undefined){document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');render(e.target.dataset.cat,document.getElementById('search').value);}});let searchT=null;document.getElementById('search').addEventListener('input',e=>{clearTimeout(searchT);const sv=e.target.value;searchT=setTimeout(()=>render(activeCats(),sv),220);});document.getElementById('search').addEventListener('focus',()=>{const vb=document.getElementById('voice-btn');vb.style.display='flex';});document.getElementById('search').addEventListener('blur',()=>{setTimeout(()=>{document.getElementById('voice-btn').style.display='none';},200);});document.getElementById('search').addEventListener('change',e=>{const q=e.target.value.trim();if(q.length>2)saveRecentSearch(q);});document.getElementById('sort').addEventListener('change',e=>{const v=e.target.value;if(v==='near')requestNear(e.target);else{sortMode=v;render(activeCats(),activeQ());}});/* nav buttons use inline onclick -> goTab() (haven-fix) */render('','');renderEvents();renderGigs();renderHotlines();renderLearn();renderPrograms();renderTodos();try{buildMoreSheet();}catch(e){}checkTodoReminders();try{setInterval(checkTodoReminders,30000);}catch(e){}showUserLocation();applySettings();renderRecent();buildMoreSheet();applyArea();detectAreaGeo();document.getElementById('learn-chips').addEventListener('click',e=>{const c=e.target.closest ? e.target.closest('[data-lcat]'):null;if(c){learnCat=c.dataset.lcat;renderLearn();}});document.getElementById('learn-search').addEventListener('input',e=>{learnQ=e.target.value;renderLearn();});document.getElementById('learn-free').addEventListener('change',e=>{learnFree=e.target.checked;renderLearn();});document.getElementById('gig-chips').addEventListener('click',e=>{const c=e.target.closest ? e.target.closest('[data-gf]'):null;if(c){gigFilter=c.dataset.gf;renderGigs();}});document.getElementById('todo-add').addEventListener('click',addTodo);document.getElementById('todo-input').addEventListener('keydown',e=>{if(e.key==='Enter')addTodo();});}if(havenDataFailed){var _fle=document.getElementById('list');if(_fle)_fle.innerHTML=HAVEN_DATA_ERR_HTML;}let userMarker=null,userCircle=null;let watchId=null,userArrow=null;function showUserLocation(center){const btn=document.querySelector('button[onclick*="showUserLocation"]');const origText=btn?btn.textContent:'📍';if(btn&&center)btn.textContent='⏳';if(!navigator.geolocation||!map){if(btn)btn.textContent=origText;if(center)alert('Location not available.');return;}if(watchId){navigator.geolocation.clearWatch(watchId);watchId=null;}let first=true;watchId=navigator.geolocation.watchPosition(pos=>{if(btn)btn.textContent=origText;const lat=pos.coords.latitude,lng=pos.coords.longitude;userLoc={lat,lng};const heading=pos.coords.heading;const arrowHtml=heading!=null&&!isNaN(heading)?`<div style="position:absolute;top:-12px;left:7px;transform:rotate(${heading}deg);font-size:16px;">▲</div>`:'';const iconHtml=`<div style="position:relative;width:24px;height:24px;">${arrowHtml}<div style="width:24px;height:24px;border-radius:50%;background:#1a73e8;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4);"></div></div>`;if(userMarker){userMarker.setLatLng([lat,lng]);userMarker.setIcon(L.divIcon({html:iconHtml,className:'',iconSize:[24,24],iconAnchor:[12,12]}));}else{userMarker=L.marker([lat,lng],{icon:L.divIcon({html:iconHtml,className:'',iconSize:[24,24],iconAnchor:[12,12]}),zIndexOffset:1000}).addTo(map).bindPopup('📍 You are here');}if(userCircle)map.removeLayer(userCircle);if(pos.coords.accuracy&&pos.coords.accuracy<10000){userCircle=L.circle([lat,lng],{radius:pos.coords.accuracy,fillColor:'#1a73e8',fillOpacity:0.15,color:'#1a73e8',weight:1,opacity:0.3}).addTo(map);}if(first&&center){map.setView([lat,lng],14);first=false;}},err=>{if(btn)btn.textContent=origText;if(center){let msg='Could not get location. ';if(err.code===1)msg+='Permission denied.';alert(msg);}}, {enableHighAccuracy:true,timeout:15000,maximumAge:5000});}var _listShown=0;var _listPageSize=80;
function renderListPage(reset){var el=document.getElementById('list');if(!el)return;if(havenDataFailed){el.innerHTML=HAVEN_DATA_ERR_HTML;return;}if(reset){_listShown=0;el.innerHTML='';}var list=curList||[];var end=Math.min(_listShown+_listPageSize,list.length);var html='';for(var idx=_listShown;idx<end;idx++){var r=list[idx];var fk=favKey(r),fav=favIds().includes(fk);var d=(sortMode==='near'&&userLoc)?distMi(userLoc.lat,userLoc.lng,r.lat,r.lng):null;html+=`<div class="card" onclick="openSheet(${idx})"><button class="fav-btn" onclick="event.stopPropagation();toggleFav('${escapeAttr(fk)}')">${fav?'★':'☆'}</button><h3>${escapeHtml(r.name)}${openBadge(r)}</h3><p>📍 ${escapeHtml(r.addr||'')}</p><p>${escapeHtml((r.desc||'').substring(0,120))}</p>${(typeof openWords==='function'?openWords(r):'')}${(typeof busRowHtml==='function'?busRowHtml(r):'')}${d!=null?`<p>📏 ${d.toFixed(1)} mi</p>`:''}${r.lat?`<a class="sheet-btn small" href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px" aria-hidden="true"><use href="#haven-directions"/></svg> Directions</a>`:''}${r.lat?`<a class="sheet-btn small" href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}&travelmode=transit" target="_blank" rel="noopener" onclick="event.stopPropagation()">Transit</a>`:''}</div>`;}_listShown=end;var _empty=(openNow?'<div style="text-align:center;padding:24px 20px;"><div style="color:#fff;font-weight:700;font-size:16px;margin-bottom:8px;">Nothing open right now</div><div style="color:#aaa;font-size:14px;margin-bottom:14px;line-height:1.5;">Most places are closed at this hour. If you need somewhere to go tonight:</div><button class="sheet-btn" onclick="openSafeTonight()" style="margin-bottom:8px;">Safe Tonight — shelters open now</button><br><a class="sheet-btn" href="tel:211">Call 211 for help</a></div>':'<p style="color:#888;text-align:center;padding:20px;">No places found</p>');el.insertAdjacentHTML('beforeend',html||_empty);if(_listShown<list.length){el.insertAdjacentHTML('beforeend','<div id="list-more" style="text-align:center;padding:16px;"><button class="sheet-btn" onclick="renderListPage(false)">Show more ('+(_listShown)+'/'+list.length+')</button></div>');}var more=document.getElementById('list-more');if(more&&_listShown>=list.length)more.remove();}
function openPlacePanelById(pid){var r=null;try{r=(curList||[]).find(x=>String(x.id)===String(pid));}catch(e){}if(!r){try{r=(allPlaces||[]).find(x=>String(x.id)===String(pid));}catch(e2){}}if(r){openPlacePanel(r);}else{try{openPlacePanel(byId(pid));}catch(e3){}}}
function render(cats,q,skipList){try{uFC();}catch(e){}q=(q||'').toLowerCase();if(!Array.isArray(cats))cats=cats ?[cats]:[];let list=placesInArea();if(cats.length)list=list.filter(r=>(r.cats||[]).some(c=>cats.includes(c)));if(openNow)list=list.filter(r=>isOpenNow(r));if(q)list=list.filter(function(r){return matchNeed(r,q);});if(window._tagActive&&window._tagActive()&&window._tagMatch)list=list.filter(window._tagMatch);list=applySort(list);/* HTML pins used instead of Leaflet markers */const zoom=map ? map.getZoom():12;const PRI={shelter:9,meals:9,health:8,mental:8,recovery:7,benefits:7,food:6,cash:6,bathroom:5,water:5,youth:5,hangout:3,thrift:3};const favs=favIds();const score=r=>(favs.includes(favKey(r))? 100:0)+Math.max(...(r.cats||[]).map(c=>PRI[c]||4))*10+Math.min(((r.desc||'').length)/120,6);const filtered=activeCats().length>0;const minD=zoom>=17?30:zoom>=15?40:zoom>=13?52:64;const bnd=map.getBounds().pad(0.1);const inView=list.filter(r=>bnd.contains([r.lat,r.lng]));const sorted=[...inView].sort((a,b)=>(b._score||0)-(a._score||0));const keep=[],pts=[];const seen={};sorted.forEach(r=>{const k=r.lat.toFixed(5)+','+r.lng.toFixed(5);const n=seen[k]=(seen[k]||0)+1;if(n>1){const ang=n*2.4;r._jx=Math.sin(ang)*0.00004*n;r._jy=Math.cos(ang)*0.00005*n;}});const grid={};const gk=(x,y)=>Math.floor(x/minD)+','+Math.floor(y/minD);const keepCap=filtered?1000:200;for(const r of sorted){if(keep.length>=keepCap)break;if(filtered){keep.push(r);continue;}const lat=r.lat,lng=r.lng;const pt=map.latLngToContainerPoint([lat,lng]);const isFav=favs.includes(favKey(r));let blocked=false;if(!isFav){const gx=Math.floor(pt.x/minD),gy=Math.floor(pt.y/minD);for(let dx=-1;dx<=1&&!blocked;dx++)for(let dy=-1;dy<=1&&!blocked;dy++){const k=(gx+dx)+','+(gy+dy);if(grid[k])blocked=true;}}if(!blocked){keep.push(r);const k=gk(pt.x,pt.y);grid[k]=true;}}const ps=(typeof getPinScale==='function'?getPinScale():100)/100;keep.forEach(r=>{
  var pcat='';
  for(var ci=0;ci<(r.cats||[]).length;ci++){var c=r.cats[ci];if(PIN_EMOJI[c]){pcat=c;break;}}
  var lat=r.lat+(r._jx||0),lng=r.lng+(r._jy||0);
  var pw=Math.round(38*ps),ph=Math.round(48*ps);
  var _pid='';
  try{_pid=escapeAttr(r.id||'');}catch(e){}
  var pinHtml=pcat?'<div class="pin" data-pid="'+_pid+'"><img src="assets/pins/'+pcat+'.svg" alt="" draggable="false" style="width:'+pw+'px;height:'+ph+'px;display:block;"/></div>':'<div class="pin" data-pid="'+_pid+'"><div style="width:'+pw+'px;height:'+pw+'px;border-radius:50%;background:#7c8aff;display:flex;align-items:center;justify-content:center;font-size:20px;">💜</div></div>';
  var marker=L.marker([lat,lng],{icon:L.divIcon({html:pinHtml,className:'emoji-pin',iconSize:[pw,ph],iconAnchor:[Math.round(pw/2),ph]}),interactive:true,keyboard:false});
  (function(place){
    var _h=function(){openPlacePanel(place);};
    marker.on('click',_h);
    marker.on('touchstart',_h);
  })(r);
  marker.addTo(map);
});
/* clear old pin buttons not in current keep */
(function(){
  // _pinBtns is rebuilt each render, old ones removed via innerHTML clear at start
})();;curList=list;if(!skipList){renderListPage(true);}}function addTodo(){const inp=document.getElementById('todo-input');const v=inp.value.trim();if(!v)return;const t=todoItems();t.push({t:v,d:false});saveTodos(t);inp.value='';renderTodos();miniToast('To-do added ✅');}function toggleTodo(i){const t=todoItems();if(!t[i])return;t[i].d=!t[i].d;saveTodos(t);renderTodos();}function delTodo(i){const t=todoItems();if(!t[i])return;t.splice(i,1);saveTodos(t);renderTodos();}function chatItems(){try{const c=JSON.parse(localStorage.getItem('haven_chat')||'[]');return Array.isArray(c)? c:[];}catch(e){return[];}}function saveChat(c){try{localStorage.setItem('haven_chat',JSON.stringify(c));}catch(e){}}function chatName(){let n=null;try{n=localStorage.getItem('haven_chatname');}catch(e){}if(!n){n='Guest'+Math.floor(1000+Math.random()*9000);try{localStorage.setItem('haven_chatname',n);}catch(e){}}return n;}function renderChat(){const box=document.getElementById('chat-msgs');if(!box)return;const c=chatItems();box.innerHTML=c.map(m=>`<div style="margin-bottom:10px;padding:8px 10px;background:#232a3d;border-radius:8px;"><b style="color:#7c8aff;font-size:13px">${escapeHtml(m.n)}</b><span style="color:#666;font-size:11px;margin-left:6px">${escapeHtml(m.t)}</span><div style="color:#e0e0e0;word-wrap:break-word;margin-top:2px">${escapeHtml(m.x)}</div></div>`).join('')||'<p style="color:#888">No messages yet — say hi. 👋</p>';box.scrollTop=box.scrollHeight;}function sendChat(){const inp=document.getElementById('chat-input');if(!inp)return;const v=inp.value.trim();if(!v)return;const c=chatItems();c.push({n:chatName(),x:v.slice(0,300),t:new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})});saveChat(c.slice(-100));inp.value='';renderChat();if(!(chatCrisisCheck(v)&&chatCrisisAlert()))miniToast('Message sent 💬');}const CRISIS_POS=[/\bkill(ing)?\s+my\s*self\b/i,/\bsuicid\w*/i,/\bend\s+it\s+all\b/i,/\bend\s+my\s+life\b/i,/\bwant\s+to\s+die\b/i,/\bwanna\s+die\b/i,/\bdon'?t\s+want\s+to\s+live\b/i,/\bdo\s+not\s+want\s+to\s+live\b/i,/\bwish\s+i\s+(was|were)\s+dead\b/i,/\bmatarme\b/i,/\bsuicidarme\b/i,/\bsuicidio\b/i,/\bquitarme\s+la\s+vida\b/i,/\bquiero\s+morir\b/i,/\bme\s+quiero\s+morir\b/i,/\bno\s+quiero\s+vivir\b/i,];const CRISIS_VETO=[/\bsuicide\s+squad\b/i,/\blaughing\b/i,];function chatCrisisCheck(text){const t=String(text||'');if(CRISIS_VETO.some(rx=>rx.test(t)))return false;return CRISIS_POS.some(rx=>rx.test(t));}let lastCrisisAlert=0;function chatCrisisAlert(nowFn){const now=(nowFn||Date.now)();if(now-lastCrisisAlert<5*60*1000)return false;lastCrisisAlert=now;if(typeof goTab==='function')goTab('help');miniToast('You matter — call or text 988 💛');const cards=document.querySelectorAll('.crisis-hotline');cards.forEach(el=>el.classList.add('gold-flash'));if(cards.length&&cards[0].scrollIntoView)cards[0].scrollIntoView({block:'center',behavior:'smooth'});setTimeout(()=>cards.forEach(el=>el.classList.remove('gold-flash')),6000);return true;}function openSheet(i){const r=curList[i];if(r)showSheet(r);}function planText(r){return 'Hi - I am heading to '+(r.name||'a shelter')+', '+(r.addr||'')+'. Please check on me later. - Haven FW';}function showSheet(r){sheetPlace=r;const telHref=r.phoneHref ? 'tel:+'+String(r.phoneHref).replace(/^\+/,''):(r.phone ? 'tel:'+String(r.phone).replace(/[^0-9+]/g,''):'');document.getElementById('sheet-body').innerHTML=`<h2>${r.name}</h2>${r.addr ? `<div class="row">📍 ${r.addr}${r.zip ? ' '+r.zip:''}<button class="sheet-btn small" data-addr="${escapeAttr(r.addr+(r.zip ? ' '+r.zip : ''))}" onclick="copySheetAddr(this)" style="margin-left:8px;">Copy address</button></div>`:''}${(r.cats||[]).length ? `<div class="row">${(r.cats||[]).map(c=>`<span class="badge">${c}</span>`).join('')}</div>`:''}${r.desc ? `<div class="sec">About</div><div class="row">${r.desc}</div>`:''}${r.hoursText ? `<div class="sec">⏱ Hours</div><div class="row">${r.hoursText}${openDetailLine(r)||openStatusLine(r)}</div>`:''}${(r.tags||[]).length ? `<div class="sec">Services</div><div class="row">${(r.tags||[]).map(t=>`<span class="badge">${t}</span>`).join('')}</div>`:''}<div class="sec">Contact</div><div class="row">${telHref ? `<a class="sheet-btn" href="${telHref}">📞 ${r.phone||'Call'}</a>`:`<a class="sheet-btn" href="tel:211">Call 211 for help</a>`}${r.lat ? `<a class="sheet-btn" href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}" target="_blank">🗺️ Directions</a>`:''}${r.lat ? `<a class="sheet-btn" href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}&travelmode=transit" target="_blank">🚌 Transit</a>`:''}<a class="sheet-btn" href="sms:?body=${encodeURIComponent(planText(r))}">Text my plan</a>${r.web ? `<a class="sheet-btn" href="${r.web}" target="_blank">🌐 Website</a>`:''}<a class="sheet-btn" href="#" onclick="shareSheetPlace();return false;">📤 Share</a>${getTtsSetting()!=='off'&&typeof window!=='undefined'&&window.speechSynthesis ? `<a class="sheet-btn" href="#" onclick="toggleSheetTTS();return false;" id="sheet-tts-btn">🔊 Listen</a>`:''}</div>`;renderSheetNotes(r);document.getElementById('sheet-overlay').classList.add('open');document.body.style.overflow='hidden';}function closeSheet(){stopSheetTTS();document.getElementById('sheet-overlay').classList.remove('open');document.body.style.overflow='';}const NOTE_TAGS=[["respect","🙂 Staff were respectful"],["safe","🛡️ Felt safe"],["wait","⏳ Long wait"],["turned","🚫 Turned away"],["again","💜 Would go again"]];
function getNotes(){try{const n=JSON.parse(localStorage.getItem('haven_notes')||'{}');return n&&typeof n==='object'?n:{};}catch(e){return{};}}
function saveNotes(n){try{localStorage.setItem('haven_notes',JSON.stringify(n));}catch(e){}}
function toggleNoteTag(key,tag,btn){const all=getNotes();const n=all[key]||{tags:[],note:""};const i=n.tags.indexOf(tag);if(i>=0)n.tags.splice(i,1);else n.tags.push(tag);if(!n.tags.length&&!n.note)delete all[key];else all[key]=n;saveNotes(all);if(btn)btn.classList.toggle('on',n.tags.indexOf(tag)>=0);}
function renderSheetNotes(r){const body=document.getElementById('sheet-body');if(!body||body.querySelector('.plNote'))return;const key=favKey(r);const n=getNotes()[key]||{tags:[],note:""};const box=document.createElement('div');box.className='plNote';const h=document.createElement('h4');h.textContent='📝 My private notes';box.appendChild(h);const chips=document.createElement('div');chips.className='plChips';NOTE_TAGS.forEach(function(t){const b=document.createElement('button');b.type='button';b.className='plChip'+(n.tags.indexOf(t[0])>=0?' on':'');b.textContent=t[1];b.setAttribute('aria-pressed',n.tags.indexOf(t[0])>=0?'true':'false');b.onclick=function(){toggleNoteTag(key,t[0],b);b.setAttribute('aria-pressed',b.classList.contains('on')?'true':'false');};chips.appendChild(b);});box.appendChild(chips);const ta=document.createElement('textarea');ta.className='plTa';ta.maxLength=500;ta.placeholder='Your note about this place. Only you can see it.';ta.value=n.note||'';ta.addEventListener('input',function(){const a=getNotes();const cur=a[key]||{tags:[],note:""};cur.note=ta.value;if(!cur.tags.length&&!cur.note)delete a[key];else a[key]=cur;saveNotes(a);});box.appendChild(ta);const fine=document.createElement('div');fine.className='fine';fine.textContent='Private — stays on this device.';box.appendChild(fine);body.appendChild(box);}
const TTS_KEY='haven_tts';function getTtsSetting(){try{return localStorage.getItem(TTS_KEY)||'on';}catch(e){return 'on';}}function refreshTtsToggle(){const b=document.getElementById('tts-toggle');if(b)b.textContent=getTtsSetting()==='off' ? 'Enable':'Disable';}function setTTS(enable){try{localStorage.setItem(TTS_KEY,enable ? 'on':'off');}catch(e){}if(!enable)stopSheetTTS();refreshTtsToggle();}function ttsSupported(){return typeof window!=='undefined'&&!!window.speechSynthesis;}function sheetTtsText(r){const parts=[r.name];if(r.addr)parts.push(r.addr+(r.zip ? ' '+r.zip:''));if(r.phone)parts.push('Phone:'+r.phone);if(r.hoursText)parts.push('Hours:'+r.hoursText);if(r.desc)parts.push(r.desc);return parts.join('. ');}function stopSheetTTS(){if(ttsSupported())window.speechSynthesis.cancel();const b=document.getElementById('sheet-tts-btn');if(b)b.textContent='🔊 Listen';}function toggleSheetTTS(){const r=sheetPlace;if(!r)return;if(!ttsSupported()){miniToast('Read-aloud not supported on this device');return;}if(window.speechSynthesis.speaking){stopSheetTTS();return;}const u=new SpeechSynthesisUtterance(sheetTtsText(r));u.onend=function(){const b=document.getElementById('sheet-tts-btn');if(b)b.textContent='🔊 Listen';};window.speechSynthesis.cancel();window.speechSynthesis.speak(u);const b=document.getElementById('sheet-tts-btn');if(b)b.textContent='⏹ Stop';}function shareSheetPlace(){const r=sheetPlace;if(!r)return;const loc=(r.lat&&r.lng)? `https://maps.google.com/?q=${r.lat},${r.lng}`:'https://boo4blue.github.io/app/';const text=`📍 ${r.name}${r.addr ? '\n'+r.addr:''}${r.phone ? '\n'+r.phone:''}\n${loc}`;if(typeof navigator!=='undefined'&&navigator.share){navigator.share({title:r.name,text}).catch(()=>{});}else if(typeof navigator!=='undefined'&&navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(()=>miniToast('✓ Copied to clipboard')).catch(()=>miniToast('Copy failed'));}else if(typeof prompt!=='undefined'){prompt('Copy to share:',text);}}function copySheetAddr(btn){var txt=(btn&&btn.getAttribute('data-addr'))||'';if(!txt)return;function ok(){miniToast('Copied — paste it anywhere');}function old(){var ta=document.createElement('textarea');ta.value=txt;ta.style.cssText='position:fixed;opacity:0;top:0;left:0';document.body.appendChild(ta);ta.focus();ta.select();try{document.execCommand('copy');ok();}catch(e){}ta.remove();}if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(ok,old);else old();}function miniToast(msg){const t=document.getElementById('mini-toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),1800);}function toggleGuide(el,i){const old=el.querySelector('.guide-detail');if(old){old.remove();return;}const g=GUIDES[i];if(!g)return;const steps=Array.isArray(g.steps)? g.steps:[];const bring=Array.isArray(g.bring)? g.bring:[];let html='';if(steps.length){html+='<div class="gsec">📝 Steps</div><ol class="gsteps">'+steps.map(s=>{const t=typeof s==='string' ? s:(s.t||s.title||s.name||'');const d=typeof s==='string' ? '':(s.d||s.desc||s.text||'');return `<li><b>${t}</b>${d ? `<br><span class="gdim">${d}</span>`:''}</li>`;}).join('')+'</ol>';}if(bring.length){html+='<div class="gsec">🎒 Bring</div><ul class="gsteps">'+bring.map(b=>`<li>${typeof b==='string' ? b:(b.t||b.title||b.name||'')}</li>`).join('')+'</ul>';}if(g.where){html+=`<div class="gsec">📍 Where</div><p class="gdim">${g.where}<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(g.where)}" target="_blank">🗺️ Directions</a></p>`;}if(!html)html='<p class="gdim">No details available for this guide.</p>';const div=document.createElement('div');div.className='guide-detail';div.innerHTML=html;el.appendChild(div);}function renderJobs(){
  /* Delegates to jobs.js (feature #29). Falls back to a loading note if jobs.js failed. */
  if(typeof renderJobsReal==='function')return renderJobsReal();
  var el=document.getElementById('jobs-list');
  if(el)el.innerHTML='<div style="text-align:center;color:#888;padding:20px;">Job listings are loading…</div>';
}
const GIG_KINDS={plasma:['🩸','Plasma'],daylabor:['👷','Day labor'],app:['📱','Gig apps'],task:['🧰','Odd jobs'],survey:['📝','Surveys'],study:['🧪','Studies']};let gigFilter='all';function gigIsNew(g){if(!g.added)return false;const a=new Date(g.added+'T12:00:00');return!isNaN(a)&&(Date.now()-a.getTime())<7*864e5;}function gigsFiltered(){const all=typeof GIGS!=='undefined' ? GIGS:[];return all.filter(g=>areaOf(g)===getArea()&&(gigFilter==='all'||g.kind===gigFilter));}function renderGigs(){const chipsEl=document.getElementById('gig-chips');if(chipsEl){const all=typeof GIGS!=='undefined' ? GIGS:[];const fw=all.filter(g=>areaOf(g)===getArea());const kinds=Object.keys(GIG_KINDS).filter(k=>fw.some(g=>g.kind===k));chipsEl.innerHTML=`<button class="filter-btn${gigFilter==='all' ? ' active':''}" data-gf="all">All</button>`+kinds.map(k=>`<button class="filter-btn${gigFilter===k ? ' active':''}" data-gf="${k}">${GIG_KINDS[k][0]}${GIG_KINDS[k][1]}</button>`).join('');}const el=document.getElementById('gig-list');if(!el)return;const list=gigsFiltered();el.innerHTML=list.length ? list.map(g=>{const icon=(GIG_KINDS[g.kind]||['⚡'])[0];const btns=[];if(g.url&&g.url.trim())btns.push(`<a class="sheet-btn" href="${escapeAttr(g.url)}" target="_blank" rel="noopener">Apply ↗</a>`);if(g.phoneHref&&g.phoneHref.trim())btns.push(`<a class="sheet-btn" href="tel:${escapeAttr(g.phoneHref)}">📞 Call</a>`);else if(g.phone&&g.phone.trim())btns.push(`<a class="sheet-btn" href="tel:${escapeAttr(g.phone)}">📞 Call</a>`);if(g.lat)btns.push(`<a class="sheet-btn" href="https://www.google.com/maps/dir/?api=1&destination=${g.lat},${g.lng}" target="_blank" rel="noopener">🗺️ Directions</a>`);return `<div class="card"><h3>${icon}${escapeHtml(g.title||'')}</h3><p>📍 ${escapeHtml(g.venue||'')}${g.addr ? ' — '+escapeHtml(g.addr):''}</p><div class="meta"><span class="paypill">💵 ${escapeHtml(g.pay||'Paid gig')}</span>${gigIsNew(g)? '<span class="newpill">NEW</span>':''}</div><p>${escapeHtml(g.desc||'')}</p>${g.needs ? `<p>🎒<b>Needs:</b>${escapeHtml(g.needs)}</p>`:''}${btns.length ? `<div class="meta">${btns.join('')}</div>`:''}</div>`;}).join(''):'<p style="color:#888">No gigs found.</p>';}function renderPlan(){const steps=typeof PLAN!=='undefined'?PLAN:[];const done=JSON.parse(localStorage.getItem('haven_plan')||'[]');const pct=steps.length?Math.round(done.length/steps.length*100):0;
document.getElementById('plan-list').innerHTML=`<div style='background:#2a2f3e;border-radius:12px;height:28px;position:relative;overflow:hidden;margin-bottom:12px;'><div style='background:linear-gradient(90deg,#1a73e8,#7c4dff);height:100%;width:${pct}%;transition:width .3s;'></div><div style='position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;'>${done.length}/${steps.length} (${pct}%)</div></div>`+
steps.map((s,i)=>{const name=typeof s==='string'?s:(s.t||s.title||s.name);const desc=typeof s==='string'?'':(s.d||s.desc||'');const id=typeof s==='string'?i:(s.id||i);const c=done.includes(id);
return `<div style='background:#1a1f2e;border:1px solid #2a2f3e;border-radius:14px;padding:12px;margin-bottom:8px;display:flex;gap:12px;align-items:flex-start;${c?'opacity:.7;':''}'><button onclick='togglePlanStep("${id}")' style='background:none;border:0;font-size:22px;cursor:pointer;flex:none;'>${c?'✅':'⬜'}</button><div style='flex:1;min-width:0;'><div style='font-weight:700;font-size:15px;color:#fff;${c?'text-decoration:line-through;':''}'>${name}</div><div style='font-size:13px;color:#888;margin-top:2px;'>${desc}</div></div></div>`;}).join('');
if(typeof renderBudgetStudio==='function')renderBudgetStudio();
}
function togglePlanStep(id){let done=JSON.parse(localStorage.getItem('haven_plan')||'[]');const i=done.indexOf(id);if(i>=0)done.splice(i,1);else done.push(id);localStorage.setItem('haven_plan',JSON.stringify(done));renderPlan();}function togglePlan(id){let done=JSON.parse(localStorage.getItem('haven_plan')||'[]');done=done.includes(id)? done.filter(x=>x!==id):[...done,id];localStorage.setItem('haven_plan',JSON.stringify(done));renderPlan();}function renderHotlines(){const h=typeof HOTLINES!=='undefined' ? HOTLINES.filter(x=>!x.area||x.area===getArea()):[{name:'Indiana 211',area:'fort-wayne',href:'tel:211',desc:'Food,shelter,bills,crisis help'},{name:'Oregon 211',area:'portland',href:'tel:211',desc:'Food,shelter,bills,crisis help'},{name:'988 Crisis Line',href:'tel:988',desc:'Suicide&crisis,call or text',crisis:true}];document.getElementById('hotlines').innerHTML=h.map(x=>{const _hr=x.href||'';const _sms=_hr.indexOf('sms:')===0;const phone=_sms?_hr.slice(4).split('?')[0]:_hr.replace('tel:','');const cc=x.crisis ? ' crisis-hotline':'';return `<div class="hotline${cc}"><h3>${x.icon||''}${x.name}</h3><p>${x.desc||''}</p><a href="${x.href}">${_sms?'💬':'📞'} ${phone}</a></div>`;}).join('');}function getTextScale(){try{var v=parseInt(localStorage.getItem('haven_textscale'),10);if(v>=70&&v<=200)return v;}catch(e){}try{var old=localStorage.getItem('haven_textsize');if(old==='small')return 85;if(old==='large')return 120;}catch(e2){}return 100;}
function setTextScale(pct){pct=Math.max(70,Math.min(200,Math.round(pct)));document.documentElement.style.setProperty('--ts',(pct/100).toFixed(2));try{localStorage.setItem('haven_textscale',String(pct));localStorage.removeItem('haven_textsize');}catch(e){}var r=document.getElementById('textscale-range');if(r&&+r.value!==pct)r.value=pct;var v=document.getElementById('textscale-val');if(v)v.textContent=pct+'%';}
function stepTextScale(d){setTextScale(getTextScale()+d);}
function getPinScale(){try{var v=parseInt(localStorage.getItem('haven_pinscale'),10);if(v>=50&&v<=200)return v;}catch(e){}return 100;}
var _pinScaleApplied=0;function setPinScale(pct){pct=Math.max(50,Math.min(200,Math.round(pct)));try{localStorage.setItem('haven_pinscale',String(pct));}catch(e){}document.documentElement.style.setProperty('--ps',(pct/100).toFixed(2));var r=document.getElementById('pinscale-range');if(r&&+r.value!==pct)r.value=pct;var v=document.getElementById('pinscale-val');if(v)v.textContent=pct+'%';if(_pinScaleApplied&&_pinScaleApplied!==pct&&typeof map!=='undefined'&&map){try{render(activeCats(),activeQ());}catch(e2){}}_pinScaleApplied=pct;}
function stepPinScale(d){setPinScale(getPinScale()+d);}function setTheme(t){if(t==='light'){document.body.style.background='#f5f5f5';document.body.style.color='#222';}else{document.body.style.background='#0a0e17';document.body.style.color='#e0e0e0';}localStorage.setItem('haven_theme',t);}function applySettings(){setTextScale(getTextScale());setPinScale(getPinScale());const th=localStorage.getItem('haven_theme');if(th)setTheme(th);refreshTtsToggle();}function voiceSearch(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){alert('Voice search not supported in this browser.');return;}const r=new SR();const vb=document.getElementById('voice-btn');r.onresult=e=>{const q=e.results[0][0].transcript;document.getElementById('search').value=q;render(activeCats(),q);};r.onerror=()=>{miniToast('Could not hear you \u2014 try again.');if(vb)vb.classList.remove('listening');};r.onstart=()=>{if(vb)vb.classList.add('listening');};r.onend=()=>{if(vb)vb.classList.remove('listening');};r.start();}function copyAppLink(btn){navigator.clipboard.writeText('https://boo4blue.github.io/app/').then(()=>{btn.innerHTML='\u2713 Copied!';}).catch(()=>{miniToast('Copy failed \u2014 long-press the URL to copy it.');});}const LEARN_CATS=[['ged','📝','GED&Diploma'],['courses','💻','Free courses&apps'],['college','🏫','College&aid'],['trades','🔧','Trades&careers'],['english','🗣️','English&citizenship'],['skills','🧰','Basic&digital skills'],['test','✏️','Test prep'],['kids','🧒','Kids&family'],];const LEARN_ITEMS=[["ged-com","ged","🎓","GED.com(official)","The official GED site. Make a free account,see what the 4 tests cover,take the practice test to check if you're ready,then schedule your test. Test fees vary by state — ask your adult-ed program or WorkOne about help paying.","https://ged.com","Free or low cost",false,["GED","High school equivalency","Practice test"]],["hiset","ged","📘","HiSET(other equivalency test)","A second high school equivalency test used in many states. Local adult-education programs can tell you which test(s)they prepare you for in Indiana,so ask before you pay for anything.","https://hiset.org","Free or low cost",false,["HiSET","High school equivalency"]],["in-adulted","ged","🏛️","Indiana adult education(state)","Indiana’s Dept. of Workforce Development lists free adult-education classes — GED/HiSET prep,reading,math and English. Search the site for “adult education” to find classes near Fort Wayne.","https://www.in.gov/dwd/","Free",false,["Free classes","Adult education","GED prep"]],["excel-center","ged","🏫","The Excel Center(adult diploma)","Free public high school for adults in Indiana — earn a real high school diploma,not just an equivalency. Check the site for the Fort Wayne location,ages and what support they offer.","https://excelcenter.org","Free",false,["Adult diploma","Free tuition"]],["khan-ged","ged","📐","Khan Academy — math,reading,science","Free lessons and practice from basic math up through algebra,reading and writing,science and social studies. A great free study partner while you prepare for the GED or HiSET.","https://www.khanacademy.org","Free",true,["Free","Math","Reading","Science","Self-paced"]],["library-ged","ged","📚","Ask the library for study help","Libraries have free study books,computers,quiet space and often tutors or classes for adult learners. Tap to see library locations on the map.","","Free",false,["Free","Study space","Computers"],{q:"library",label:"See library places"}],["alison","courses","🧠","Alison","Hundreds of free online courses in business,IT,health,language,personal development and more. Learning is free;a certificate or diploma costs extra. Has Android and iPhone apps.","https://alison.com","Free to learn · certificate costs",true,["Free courses","Certificates","App"]],["coursera","courses","🌐","Coursera","University and company courses. Many can be audited free;paid certificates are optional,and financial aid is available if you apply.","https://www.coursera.org","Aid available",true,["Free to audit","Certificates","Financial aid"]],["edx","courses","🎒","edX","College-level courses from universities. Auditing is usually free;verified certificates cost money.","https://www.edx.org","Free to learn · certificate costs",false,["Free to audit","College courses"]],["ocw","courses","🏛️","MIT OpenCourseWare","Free lecture notes,videos and problem sets from real MIT classes. No sign-up or certificate — just learning.","https://ocw.mit.edu","Free",false,["Free","College level","No sign-up"]],["fcc","courses","👨‍💻","freeCodeCamp","Free coding lessons and projects for web development,data and more — a path toward tech jobs.","https://www.freecodecamp.org","Free",false,["Free","Coding","Tech jobs"]],["grow-google","courses","📈","Grow with Google","Free beginner training on digital skills,using computers at work,and starting a business.","https://grow.google","Free",false,["Free","Digital skills","Career"]],["libby","courses","🎧","Libby(library ebooks&audiobooks)","With a free library card you can borrow ebooks and audiobooks on your phone. Ask the Allen County Public Library which apps they support.","https://libbyapp.com","Free",true,["Free","Audiobooks","Ebooks","Library card"]],["crashcourse","courses","▶️","Crash Course(YouTube)","Quick,fun video lessons on history,science,literature,economics and more.","https://www.youtube.com/@crashcourse","Free",false,["Free","Videos"]],["duolingo","courses","🦉","Duolingo","Free bite-size language lessons,including Spanish and English.","https://www.duolingo.com","Free",true,["Free","Languages","App"]],["fafsa","college","💵","FAFSA(free money for school)","The free federal form for grants(like Pell),work-study and loans. Never pay anyone to file it — it’s always free at studentaid.gov. Many Indiana state aid programs use it too.","https://studentaid.gov","Free",false,["FAFSA","Grants","Financial aid"]],["learn-more-in","college","🧭","Learn More Indiana","Indiana’s college-planning hub:find schools,apply for state aid and learn about grants for short career programs(like the Workforce Ready Grant). Check eligibility.","https://learnmoreindiana.org","Free",false,["Indiana","State aid","Planning"]],["ivytech","college","🏫","Ivy Tech Community College","Indiana’s community college,with a Fort Wayne campus. Certificates and 2-year degrees,lower tuition,and classes you can transfer to a 4-year school.","https://www.ivytech.edu","Aid available",false,["Community college","Certificates","Transfer"]],["pfw","college","🎓","Purdue Fort Wayne","4-year public university in Fort Wayne. Ask the admissions and financial-aid offices about aid and adult-student options.","https://www.pfw.edu","Aid available",false,["University","Fort Wayne"]],["iufw","college","🎓","IU Fort Wayne","The Indiana University side of the Fort Wayne campus. Search the name for programs,admissions and aid.","https://duckduckgo.com/?q=IU%20Fort%20Wayne%20admissions","Aid available",false,["University","Fort Wayne"]],["usf","college","🎓","University of Saint Francis","Private university in Fort Wayne with many health and education programs. Ask about scholarships.","https://www.sf.edu","Aid available",false,["University","Fort Wayne","Scholarships"]],["21cs","college","⭐","21st Century Scholars(Indiana)","Indiana scholarship for income-eligible students — students usually must sign up in 7th or 8th grade,so tell any young person you know about it.","https://scholars.in.gov","Free",false,["Scholarship","Indiana","Middle school"]],["bigfuture","college","🔎","BigFuture(College Board)","Free tools to search colleges,plan costs and find scholarships.","https://bigfuture.collegeboard.org","Free",false,["Free","Scholarship search","College search"]],["commonapp","college","📨","Common App","Apply to many colleges with one application. Fee waivers are available if cost is a barrier.","https://www.commonapp.org","Aid available",false,["Applications","Fee waivers"]],["fastweb","college","💰","Fastweb scholarship search","Free scholarship matching. Never pay a fee to “find” scholarships.","https://www.fastweb.com","Free",false,["Free","Scholarships"]],["clep","college","⏱️","CLEP(college credit by exam)","Pass an exam,earn college credit,and save time and tuition. Check that your school accepts it.","https://clep.collegeboard.org","Free or low cost",false,["College credit","Exams"]],["gibill","college","🎖️","GI Bill(veterans)","Veterans and family members can use education benefits for college,trades and training. Ask the Allen County Veterans Service Office to help you apply.","https://www.va.gov/education/","Free",false,["Veterans","Benefits"],{q:"veterans",label:"See veterans places"}],["apprentice","trades","🛠️","Apprenticeship.gov","Earn while you learn:paid on-the-job training in the trades and other careers. Search by job and state.","https://www.apprenticeship.gov","Free",false,["Paid training","Trades","Earn&learn"]],["careeronestop","trades","🧭","CareerOneStop(U.S. Dept. of Labor)","Explore careers,find training and certifications,and search jobs,with free tools like a skills matcher.","https://www.careeronestop.org","Free",false,["Career","Training finder"]],["onet","trades","🔬","O*NET OnLine","See what any job involves,what it pays and what skills it needs.","https://www.onetonline.org","Free",false,["Career explorer","Pay"]],["jobcorps-l","trades","🏕️","Job Corps&residential programs","Live on-site while you learn a trade,with housing and meals. Tap to search Job Corps places on the map.","","Free",false,["Free","Housing","Trades"],{q:"Job Corps",label:"Search Job Corps places"}],["workone-l","trades","💼","Job help in Fort Wayne","WorkOne and other local career centers offer resume help,training and job leads. Tap to find them on the map.","","Free",false,["Free","Resume","Job training"],{q:"WorkOne",label:"Find job help places"}],["gg-certs","trades","🎫","Google Career Certificates","Job-ready training for jobs like IT support and data analysis. Not free,but financial aid and scholarships exist — apply for aid first.","https://grow.google/certificates/","Aid available",false,["Certificates","IT","Aid available"]],["usalearns","english","🇺🇸","USA Learns","Free online English lessons plus citizenship and reading help,made for adults.","https://www.usalearns.org","Free",false,["Free","ESL","Citizenship"]],["voa","english","🎙️","VOA Learning English","Free news stories,lessons and videos written for English learners.","https://learningenglish.voanews.com","Free",false,["Free","ESL","Listening"]],["uscis","english","🗽","USCIS citizenship study tools","Free official civics and English test study materials — flashcards,practice and an app.","https://www.uscis.gov/citizenship","Free",true,["Free","Citizenship","Civics test"]],["newcomers-l","english","🌍","Local help for new arrivals","Local groups that help immigrants and refugees with English,paperwork and jobs. Tap to find them on the map.","","Free",false,["Free","ESL","Immigrants"],{q:"immigrant",label:"Find places for new arrivals"}],["gcf","skills","🖱️","GCFGlobal(GCFLearnFree)","Free,simple tutorials on computers,email,the internet,Word,Excel,resumes,job skills and money.","https://edu.gcfglobal.org","Free",false,["Free","Computers","Resume","Beginner"]],["typing","skills","⌨️","Typing.com","Free typing lessons — a fast way to look more job-ready.","https://www.typing.com","Free",false,["Free","Typing"]],["proliteracy","skills","📖","ProLiteracy — adult reading help","Find adult literacy programs and tutors if you want to read or write better. Libraries often connect adults with tutors too.","https://www.proliteracy.org","Free",false,["Reading","Literacy"]],["khan-math","skills","➗","Khan Academy — start from the basics","Starts at basic arithmetic and lets you go at your own speed. Free,and nobody sees your score but you.","https://www.khanacademy.org/math","Free",true,["Free","Math","Beginner"]],["sat-khan","test","✏️","Official SAT practice(Khan Academy)","Free,official SAT practice with personalized study plans.","https://www.khanacademy.org/test-prep/sat","Free",true,["Free","SAT"]],["asvab","test","🪖","ASVAB(military entrance test)","Info and practice for the test used to enlist. Ask a recruiter or your school about free versions.","https://www.officialasvab.com","Free",false,["Military","Practice test"]],["ged-test-l","test","📝","GED practice","The official GED site has practice tests that show whether you’re ready. See the GED&Diploma section.","","Free or low cost",false,["GED","Practice test"],{learn:"ged",label:"Go to GED section"}],["khan-kids","kids","🧸","Khan Academy Kids","Free learning app for ages 2–8:reading,math and stories. No ads.","https://learn.khanacademy.org/khan-academy-kids/","Free",true,["Free","Ages 2–8","App"]],["pbskids","kids","📺","PBS Kids","Free games and videos that teach reading,math and science.","https://pbskids.org","Free",true,["Free","Games","Videos"]],["scratch","kids","🐱","Scratch(kids coding)","Free,fun block-based coding for kids to make games and stories.","https://scratch.mit.edu","Free",false,["Free","Coding","Kids"]],["headstart","kids","🏠","Head Start(free preschool)","Free early learning for young children in low-income families,plus family support. Use the site to find a program in Allen County.","https://eclkc.ohs.acf.hhs.gov","Free",false,["Free","Preschool","Families"]],["library-kids","kids","📚","Library story times&homework help","Libraries have free story times,homework help and summer reading programs. Tap to see library locations on the map.","","Free",false,["Free","Story time","Homework help"],{q:"library",label:"See library places"}],];const LEARN_STEPS=[["🪪","Gather your papers","Programs usually ask for a photo ID and proof you live in the area. Requirements vary — ask first."],["🏫","Find free classes","Call or visit adult education,WorkOne or the library. Classes and tutoring are usually free."],["🧪","Take a practice test","See where you stand before you study,so you spend time where it helps."],["📚","Study a little every day","15–30 minutes a day beats one long night. Khan Academy is free for math,reading and science."],["📅","Register and test","Sign up at GED.com(or for HiSET),schedule it,and bring your ID. Ask about help with test fees."],["🚀","Plan your next step","Use your GED or diploma for college,a trade program or a better job. Check the other sections here."],];let learnCat='all',learnQ='',learnFree=false;const PROGRAMS=[{"id":"atterbury-jobcorps","name":"Atterbury Job Corps Center","type":"Job Corps","ages":"16–24","cost":"Free","addr":"3129 E Edinburgh St","city":"Edinburgh,IN","zip":"46124","lat":39.36404,"lng":-86.02558,"phone":"(812)314-6002","phoneHref":"+18123146002","web":"https://atterbury.jobcorps.gov","ridePaid":true,"rideText":"Yes — Job Corps arranges and pays for your travel to the center when you're accepted. Transportation help is part of the program — ask about the trip home when you call.","housingText":"Free dorm-style housing on campus — you live there full-time while enrolled(up to 3 years). Ask about the current dorm setup when you call.","mealsText":"Free meals in the campus cafeteria — breakfast,lunch,and dinner.","payText":"A small living allowance paid every two weeks while you're enrolled,plus basic health care.","programText":"The nation's largest free residential job-training program,run by the U.S. Department of Labor. Earn your high school diploma or equivalent,train hands-on in a trade,take community college classes while living on center,and get job-placement help for up to 21 months after you graduate.","requirements":["Age 16–24 when you enroll","U.S. citizen or legal resident","Low income — on public assistance,below the poverty line,homeless,foster youth,or on free/reduced school lunch","A barrier to school or work(no diploma,behind on basic skills,etc.)","Drug-free","No active probation/parole or disqualifying court case(reviewed case by case)","If you have kids,suitable childcare must be arranged"],"trades":["Welding","Office Administration","Certified Nurse Assistant(CNA)","Heavy Equipment Mechanic","Security&Protective Services","Bricklaying(pre-apprentice)","Building Construction Technology(pre-apprentice)","Carpentry(pre-apprentice)","Cement Masonry","Electrical","Glazing(pre-apprentice)","Heavy Equipment Operations(pre-apprentice)","Painting(pre-apprentice)","Culinary Arts"],"workText":"Full-time structured days:breakfast around 7 AM,career training and academic classes in the morning,lunch,more training in the afternoon,dinner around 4:30 PM,then study or free time. You must attend every class,keep your grades up,join campus activities,and keep your dorm area clean.","dormRules":["Dorm housing on campus(ask about the current dorm setup when you call)","Set lights-out and curfew times — confirm the current schedule when you call","Zero tolerance:no drugs,alcohol,weapons,or violence — drug testing","Visitors only during set visiting hours","Keep your room clean and inspection-ready","Sign in and out when leaving campus"],"rules":["Follow the daily schedule — attendance is mandatory","Dress code and uniforms in the trade shops","No smoking inside buildings","Discipline system:major violations can get you sent home","Under 18 needs a parent or guardian to sign enrollment papers"],"statusText":"Heads-up:in 2025 the federal government tried to close all Job Corps centers. Courts blocked it and Congress funded the program through June 2027 — Atterbury is open and enrolling now. Still,call(812)314-6002 or(800)733-5627 to confirm before you travel.","distNote":"Edinburgh,IN — south of Indianapolis","dayPlan":[{"t":"7:00 AM","what":"Breakfast — campus cafeteria"},{"t":"Morning","what":"Career training+academic classes"},{"t":"Midday","what":"Lunch — campus cafeteria"},{"t":"Afternoon","what":"Career training continues"},{"t":"4:30 PM","what":"Dinner — campus cafeteria"},{"t":"Evening","what":"Study hall/free time"}],"timesNote":"Daily flow from the center’s published info — exact times can shift,confirm when you call.","bring":["Ask your admissions counselor for the full paperwork list when you call","If you have kids:suitable childcare must be arranged before you enroll","Show up drug-free — you will be tested"],"noGo":["Drugs,alcohol,weapons,or violence — zero tolerance,you are out","Skipping class — attendance is mandatory and tracked","Fighting,stealing,or other major violations","Failing drug tests"]},{"id":"americorps-nccc","name":"AmeriCorps NCCC","type":"AmeriCorps NCCC","ages":"18–26","cost":"Free","addr":"Campus assigned by region — North Central campus is in Vinton,IA","city":"Vinton,IA","zip":"","lat":42.16987,"lng":-92.02346,"phone":"","phoneHref":"","web":"https://americorps.gov/serve/fit-finder/americorps-nccc","ridePaid":true,"rideText":"Yes — NCCC covers your travel to campus at the start,travel between project rounds,and teams travel together to every service site.","housingText":"Team-based housing is provided for the whole 10 months — campus dorms during training and between projects. On project rounds the sponsor arranges housing(dorms,bunkhouses,churches,etc.).","mealsText":"Meals provided during campus training;a food allowance is provided on project rounds.","payText":"A small living stipend paid through the term,plus an education award you can use for college or trade school after you finish(amount varies by year).","programText":"A 10-month,full-time residential national service program for ages 18–26 — the modern program most directly modeled on the 1930s Civilian Conservation Corps. You live and work on teams of 10–12 doing disaster response,environmental conservation,infrastructure,and community projects across the country.","requirements":["Age 18–26","U.S. citizen,U.S. national,or lawful permanent resident","Pass a background check","Able to do full-time physical team service","Willing to live and travel with your team for the full 10 months"],"trades":[],"workText":"Full-time service — roughly 40+hours a week of hands-on project work such as disaster cleanup,trail building,and home repairs — plus team chores like cooking and cleaning. Strict team schedule.","dormRules":["Team housing with shared rooms","Curfews and quiet hours","Shared cooking and cleaning duties","No alcohol or drugs — violations mean dismissal"],"rules":["10-month commitment — you finish what you start","You serve wherever your team is assigned;you don't pick projects","Wear the NCCC uniform while on duty","Follow the member code of conduct"],"statusText":"Heads-up:NCCC members were sent home in April 2025 during federal cuts,so the program's future is uncertain — some 2026 activity has been posted since. Check americorps.gov for the current status before applying.","distNote":"North Central campus in Vinton,IA","dayPlan":[{"t":"Training weeks","what":"First weeks on campus — team training,PT,service skills"},{"t":"Project rounds","what":"6–8 week rounds — your team leader sets the daily schedule"},{"t":"Between rounds","what":"Back on campus — training and team time"}],"timesNote":"There is no fixed daily timetable — it changes with each project round. Your team leader sets the hours.","bring":["A valid ID and Social Security card for the background check","Ask your recruiter for the packing list — what to bring and what not to bring"],"noGo":["Not passing the background check","Drug or alcohol violations","Refusing team assignments — the program IS the team","Quitting early — the education award requires finishing the full term"]},{"id":"fwha-youthbuild","name":"Fort Wayne Housing Authority YouthBuild","type":"YouthBuild","ages":"16–24","cost":"Free","addr":"7315 Hanna St","city":"Fort Wayne,IN","zip":"46816","lat":41.01762,"lng":-85.12633,"phone":"(260)409-5050","phoneHref":"+12604095050","web":"https://fwha.org/youthbuild-program/","ridePaid":"partial","rideText":"No dorms and no relocation — it's a local Fort Wayne program,you keep living at home. Members earn money while training;ask at(260)409-5050 about help with bus passes or travel costs.","housingText":"No housing — this is a non-residential local program. You live where you are now and commute to training.","mealsText":"Not published — ask when you apply.","payText":"You earn money while you train(paid training plus stipends).","programText":"Free 6-month program(plus a full year of follow-up and case management)run by the Fort Wayne Housing Authority. Earn your high school diploma,get certified in construction and/or healthcare,and build real affordable housing in Fort Wayne neighborhoods.","requirements":["Age 16–24","Low-income family(includes youth experiencing housing instability)","Plus at least one of:foster care or aging out,justice-involved,a disability,child of an incarcerated parent,or migrant youth","Left high school before graduating(or re-enrolled after leaving)","Most members must live in 46805,46815,46803,46774,46806,46807,46816,46745,or 46819","Bring:state ID,Social Security card,high-school withdrawal proof,transcripts,proof of address"],"trades":["Construction(NCCER certification)","Construction Plus:logistics&material moving","Commercial Driver's License(CDL)","Healthcare certifications"],"workText":"Daily attendance for 6 months:GED/diploma classes,hands-on construction work building affordable housing,community service,leadership development,mentorship and internships.","dormRules":[],"rules":["Show up every day — attendance counts","Follow program behavior standards"],"statusText":"","distNote":"Right here in Fort Wayne","dayPlan":[{"t":"Weekdays","what":"GED/high-school diploma classes"},{"t":"Weekdays","what":"Hands-on construction training on real Fort Wayne housing sites"},{"t":"Weekly","what":"Community service,mentoring,and leadership sessions"}],"timesNote":"It is a weekday program for 6 months — exact daily hours are not published. Ask when you apply.","bring":["State ID","Social Security card","High-school withdrawal proof","School transcripts","Proof of address"],"noGo":["Missing days — daily attendance counts","Breaking program behavior standards","Not participating in classes and worksite training"]},{"id":"michigan-youth-challenge","name":"Michigan Youth ChalleNGe Academy","type":"Youth ChalleNGe","ages":"16–18","cost":"Free","addr":"5500 Armstrong Rd","city":"Battle Creek,MI","zip":"49037","lat":42.343566,"lng":-85.287696,"phone":"(800)372-0523","phoneHref":"+18003720523","web":"http://miycp.org/","ridePaid":false,"rideText":"Not published — ask the academy whether any travel help is available when you apply.","housingText":"Free dorms on the academy campus for the full 5½ months — you live there,barracks-style,separated by gender.","mealsText":"Meals provided on campus.","payText":"No pay — it's a free education program,not a job. You earn high school credit and a path to a diploma or GED.","programText":"Free 22-week residential program run with the Michigan National Guard for teens who are struggling in or out of school. Military-style structure and discipline,physical training,classes for high school credit,community service,and mentoring — plus a full year of mentoring after you graduate. Rated 4.7 stars across 650+reviews.","requirements":["Age 16–18","Behind in school,dropped out,or at risk of dropping out","No felony convictions","Drug-free(you'll be tested)","You volunteer — nobody can force you in","Mentally and physically able to handle a demanding program","Ask about out-of-state eligibility when you call"],"trades":["High school credit/diploma track","GED preparation","Job readiness&employability skills","Physical fitness training","Community service projects","Leadership development"],"workText":"Highly structured days:early wake-up,physical training,classes,drill,community service projects,study hall,lights out. You earn privileges through good conduct and effort.","dormRules":["Barracks-style dorms,separated by gender","Strict daily schedule — no leaving campus without permission","Zero tolerance for drugs,alcohol,or contraband","Limited phone calls and visits,especially early on","Uniforms and grooming standards","Respect the chain of command"],"rules":["Volunteer only — you must want to be there","No felony convictions","Drug test on arrival","Follow the cadet code of conduct","A mentor is assigned to you for the year after graduation"],"statusText":"Active — parent and cadet reviews from 2025–2026 confirm the program is running. Classes fill up,so apply early.","distNote":"Battle Creek,MI — about 2 hours north","dayPlan":[{"t":"Early morning","what":"Wake-up+physical training"},{"t":"Morning","what":"Classes(high school credit)"},{"t":"Midday","what":"Lunch+drill"},{"t":"Afternoon","what":"Community service projects"},{"t":"Evening","what":"Study hall,lights out"}],"timesNote":"Exact times are not published — this is the usual daily flow. Ask for the current schedule when you call.","bring":["Ask the academy what to bring — a packing list is sent after you are accepted","Show up drug-free — you will be tested on arrival"],"noGo":["Failing the drug test on arrival","Contraband — drugs,alcohol,weapons","Walking away — it is voluntary,but leaving means you are out","Serious disrespect or rule-breaking toward cadre and other cadets"]},{"id":"bluegrass-challenge","name":"Bluegrass ChalleNGe Academy","type":"Youth ChalleNGe","ages":"15½–18","cost":"Free","addr":"114 Conroy Ave,Bldg 5549","city":"Fort Knox,KY","zip":"40121","lat":37.900206,"lng":-85.982234,"phone":"(877)599-6884","phoneHref":"+18775996884","web":"https://www.bcachallenge.com/","ridePaid":false,"rideText":"Not published — ask the academy about travel help when you apply.","housingText":"Free residential dorms on Fort Knox — you live on a real Army post for the whole program.","mealsText":"Meals provided.","payText":"No pay — free education and training program.","programText":"Free residential program run by the Kentucky National Guard for teens 15½–18 who are failing school,have dropped out,or need a new direction. Military-style structure with classes toward a high school diploma or GED,physical fitness,community service,mentoring,and job skills. New classes start every January and July.","requirements":["Age 15½–18(at least 16 by graduation day)","Failing in school,dropped out,no diploma or GED yet","No felony convictions","Drug-free(you'll be tested)","You volunteer to attend","Unemployed or underemployed","Mentally and physically able to complete the program"],"trades":["High school diploma/GED track","Job readiness&career skills","Physical fitness","Community service","Leadership&life skills"],"workText":"Quasi-military daily routine:physical training,classes,drill,service projects,study time. Starts with a 2-week acclimation phase,then the full residential phase — followed by a year of mentoring after graduation.","dormRules":["Barracks dorms on post","No leaving post without permission","Zero tolerance:drugs,alcohol,contraband","Uniforms,haircut and grooming standards","Restricted phone calls and visits early in the program"],"rules":["You must volunteer — nobody can force you in","Applications are first come,first served — classes fill fast","Interview with an admissions coordinator(with a notary)","Drug test required","Follow the cadet creed and code of conduct"],"statusText":"Open and enrolling — classes start every January and July. Heads-up for Indiana teens:the program is for Kentucky residents,and out-of-state applicants need prior approval — call(877)599-6884 first.","distNote":"Fort Knox,KY — about 3 hours south","dayPlan":[{"t":"Early morning","what":"Wake-up+physical training"},{"t":"Morning","what":"Classes(high school credit)"},{"t":"Midday","what":"Lunch+drill"},{"t":"Afternoon","what":"Community service projects"},{"t":"Evening","what":"Study hall,lights out"}],"timesNote":"Exact times are not published — this is the usual daily flow. Ask for the current schedule when you call.","bring":["A packing list and directions are forwarded after you are accepted — ask at(877)599-6884","Show up drug-free — you will be tested on arrival"],"noGo":["Failing the drug test on arrival","Contraband — drugs,alcohol,weapons","Walking away — it is voluntary,but leaving means you are out","Serious disrespect or rule-breaking toward cadre and other cadets"]},{"id":"dayton-jobcorps","name":"Dayton Job Corps Center","type":"Job Corps","ages":"16–24","cost":"Free","addr":"3849 Germantown Pike","city":"Dayton,OH","zip":"45417","lat":39.733957,"lng":-84.256077,"phone":"(937)268-6571","phoneHref":"+19372686571","web":"https://dayton.jobcorps.gov/","ridePaid":true,"rideText":"Yes — Job Corps arranges and pays for your travel to the center when you're accepted. Transportation help is part of the program — ask about the trip home when you call.","housingText":"Free dorm-style housing on campus — you live there full-time while enrolled.(A limited number of nonresidential spots also exist.)","mealsText":"Free meals in the campus cafeteria — breakfast,lunch,and dinner.","payText":"A small living allowance paid every two weeks while you're enrolled,plus basic health care.","programText":"The same free federal Job Corps program as Atterbury,on a smaller residential campus in Dayton,Ohio(about 170 students). Earn your high school diploma or equivalent,train hands-on in a trade,and get job-placement help for up to 21 months after you graduate.","requirements":["Age 16–24 when you enroll","U.S. citizen or legal resident","Low income — on public assistance,below the poverty line,homeless,foster youth,or on free/reduced school lunch","A barrier to school or work(no diploma,behind on basic skills,etc.)","Drug-free","No active probation/parole or disqualifying court case(reviewed case by case)","If you have kids,suitable childcare must be arranged"],"trades":["Patient Care Technician(leads into the LPN advanced-training program)","Healthcare trades","Construction trades","Information Technology"],"workText":"Full-time structured days:career training and academic classes,meals in the cafeteria,study and recreation time. You must attend every class,keep your grades up,and follow the campus schedule.","dormRules":["Dorm housing on campus(ask about the current dorm setup when you call)","Set lights-out and curfew times — confirm the current schedule when you call","Zero tolerance:no drugs,alcohol,weapons,or violence — drug testing","Visitors only during set visiting hours","Keep your living area clean"],"rules":["Follow the daily schedule — attendance is mandatory","Dress code and uniforms in the trade shops","No smoking inside buildings","Discipline system:major violations can end your enrollment","Under 18 needs a parent or guardian to sign enrollment papers"],"statusText":"Same federal situation as every Job Corps center:the 2025 closure attempt was blocked by courts and Congress funded the program through June 2027. Call(937)268-6571 to confirm Dayton is enrolling and which trades are currently offered — the trade lineup changes.","distNote":"Dayton,OH — about 1½ hours southeast","dayPlan":[{"t":"7:00 AM","what":"Breakfast — campus cafeteria"},{"t":"Morning","what":"Career training+academic classes"},{"t":"Midday","what":"Lunch — campus cafeteria"},{"t":"Afternoon","what":"Career training continues"},{"t":"4:30 PM","what":"Dinner — campus cafeteria"},{"t":"Evening","what":"Study hall/free time"}],"timesNote":"Dayton runs the standard Job Corps daily flow — exact times are not published,confirm when you call.","bring":["Ask your admissions counselor for the full paperwork list when you call","If you have kids:suitable childcare must be arranged before you enroll","Show up drug-free — you will be tested"],"noGo":["Drugs,alcohol,weapons,or violence — zero tolerance,you are out","Skipping class — attendance is mandatory and tracked","Fighting,stealing,or other major violations","Failing drug tests"]},{"id":"teen-challenge-northern-indiana","name":"Adult&Teen Challenge Northern Indiana","type":"Faith-based recovery","ages":"18+","cost":"Free","addr":"1111 W Bristol St","city":"Elkhart,IN","zip":"46514","lat":41.702454,"lng":-85.990448,"phone":"(574)226-0789","phoneHref":"+15742260789","web":"http://www.adultandteenchallenge.com/","ridePaid":false,"rideText":"Not published — ask the center about travel help when you call.","housingText":"Residential — you live at the center for the full program,separated men's and women's homes.","mealsText":"Meals provided at the center.","payText":"No pay — it's a free recovery program. The final reentry phase can include getting outside employment while still living on campus.","programText":"Free 12-month Christian residential recovery program for adults stuck in addiction or other life-controlling issues. Bible-based curriculum,mentoring,life-skills training,work therapy,and recreation — no government funding,so it stays faith-centered. Rated 4.6 stars.","requirements":["Adult(18+)","Struggling with addiction or a life-controlling issue","Willing to commit to the full 12-month program","Complete a phone interview before acceptance","Detoxed and medically stable enough for residential life(ask about medical needs)"],"trades":["Work therapy(daily job-skills routine)","Life-skills training","Bible-based recovery curriculum","Mentoring","Optional reentry phase:outside employment while living on campus"],"workText":"Highly structured days built around the recovery curriculum,chapel,classes,assigned work duties(work therapy),mentoring,and recreation. Minimum 12 months — the induction and training phases are required to complete.","dormRules":["Live on campus the entire program — no coming and going","No phone calls or letters for at least the first 21 days;after that,only approved contacts","Zero tolerance for drugs,alcohol,or contraband","Daily schedule and dress standards","Separated men's and women's homes"],"rules":["Christian faith-based program — chapel and Bible study are part of it","12-month minimum commitment","Phone interview required before acceptance","Follow the student code of conduct","Reentry phase(optional):get a job but keep living on campus under program rules"],"statusText":"Active — 4.6-star rating with recent reviews. This is the nearest Teen Challenge center to Fort Wayne(about an hour away in Elkhart).","distNote":"Elkhart,IN — about 1 hour northwest","dayPlan":[{"t":"Daily","what":"Chapel+recovery classes"},{"t":"Daily","what":"Work therapy — assigned jobs around the center"},{"t":"Daily","what":"Mentoring,recreation,and study time"}],"timesNote":"Days are fully scheduled — exact times are not published. Ask when you call.","bring":["Call(574)226-0789 for the what-to-bring list — it is sent before you arrive"],"noGo":["Drugs or alcohol — zero tolerance","Leaving campus without permission","Contacting unapproved people during the restricted-communication period","Refusing the daily program routine"]}];function learnCatName(c){const f=LEARN_CATS.find(x=>x[0]===c);return f ? f[1]+' '+f[2]:c;}function learnCard(i){const extra=i[9]||{};const costCls=i[6]==='Free' ? 'open-badge':'badge';const btns=[];if(i[5]&&i[5].trim())btns.push(`<a class="sheet-btn" href="${i[5]}" target="_blank" rel="noopener">Open ↗</a>`);if(extra.q)btns.push(`<button class="sheet-btn" onclick="learnGoMap('${extra.q}')">🔍 ${extra.label||'See places'}</button>`);if(extra.learn)btns.push(`<button class="sheet-btn" onclick="learnFilter('${extra.learn}')">${extra.label||'View'}</button>`);return `<div class="card"><h3>${i[2]}${i[3]}</h3><div class="meta"><span class="${costCls}">${i[6]}</span>${i[7]? '<span class="badge">📱 App</span>':''}<span class="badge">${learnCatName(i[1])}</span></div><p>${i[4]}</p>${(i[8]||[]).length ? `<div class="meta">${(i[8]||[]).map(t=>`<span class="badge">✓ ${t}</span>`).join('')}</div>`:''}${btns.length ? `<div class="meta">${btns.join('')}</div>`:''}</div>`;}function renderLearn(){const chipsEl=document.getElementById('learn-chips');if(chipsEl){chipsEl.innerHTML=`<button class="filter-btn${learnCat==='all' ? ' active':''}" data-lcat="all">All</button>`+LEARN_CATS.map(c=>`<button class="filter-btn${learnCat===c[0]? ' active':''}" data-lcat="${c[0]}">${c[1]}${c[2]}</button>`).join('');}const q=learnQ.trim().toLowerCase();const list=LEARN_ITEMS.filter(i=>{if(learnCat!=='all'&&i[1]!==learnCat)return false;if(learnFree&&i[6]!=='Free')return false;if(q&&!(i[3]+' '+i[4]+' '+(i[8]||[]).join(' ')).toLowerCase().includes(q))return false;return true;});let h='';if((learnCat==='all'||learnCat==='ged')&&!q){h+=`<div class="card" onclick="toggleLearnSteps(this)"><h3>🗺️ How to get your GED — step by step</h3><p style="color:#7c8aff">6 steps · tap to open</p></div>`;}h+=list.length ? list.map(learnCard).join(''):'<p style="text-align:center;color:#888">Nothing found. Try a different word or category.</p>';h+='<p class="learn-note">Programs,fees and deadlines change — check the website or call to confirm. Links need internet.</p>';document.getElementById('learn-list').innerHTML=h;}function toggleLearnSteps(el){const old=el.querySelector('.guide-detail');if(old){old.remove();return;}const div=document.createElement('div');div.className='guide-detail';div.innerHTML='<div class="gsec">📝 Steps</div><ol class="gsteps">'+LEARN_STEPS.map(s=>`<li><b>${s[0]}${s[1]}</b><br><span class="gdim">${s[2]}</span></li>`).join('')+'</ol>';el.appendChild(div);}function learnFilter(cat){learnCat=cat;learnQ='';const s=document.getElementById('learn-search');if(s)s.value='';renderLearn();}function learnGoMap(q){document.querySelectorAll('#filters .filter-btn').forEach(b=>b.classList.toggle('active',b.dataset.cat===''));document.getElementById('search').value=q;document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('active',x.dataset.tab==='map'));document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.getElementById('tab-map').classList.add('active');if(map){setTimeout(()=>map.invalidateSize(),100);render('',q);}else{alert('Places are still loading — try again in a moment.');}}function progRideBadge(p){if(p.ridePaid===true)return '<span class="badge">✈️ Ride paid</span>';if(p.ridePaid==='partial')return '<span class="badge">🚌 Ride help</span>';return '<span class="badge">🚗 Get yourself there</span>';}function progDetail(p){const ul=a=>'<ul class="gsteps">'+a.map(x=>`<li>${escapeAttr(x)}</li>`).join('')+'</ul>';const chips=a=>'<div class="meta">'+a.map(x=>`<span class="badge">${escapeAttr(x)}</span>`).join('')+'</div>';let h='';if(p.statusText)h+=`<div class="gsec">⚠️ Heads-up</div><p class="gdim">${escapeAttr(p.statusText)}</p>`;h+=`<div class="gsec">✈️ Getting there</div><p class="gdim">${escapeAttr(p.rideText)}</p>`;h+=`<div class="gsec">🛏️ Housing</div><p class="gdim">${escapeAttr(p.housingText)}</p>`;h+=`<div class="gsec">🍽️ Meals&amp;pay</div><p class="gdim">${escapeAttr(p.mealsText)}${escapeAttr(p.payText)}</p>`;h+=`<div class="gsec">✅ Requirements</div>`+ul(p.requirements);if(p.trades&&p.trades.length)h+=`<div class="gsec">🔨 Trades&amp;training</div>`+chips(p.trades);h+=`<div class="gsec">💪 Typical day</div><p class="gdim">${escapeAttr(p.workText)}</p>`;if(p.dormRules&&p.dormRules.length)h+=`<div class="gsec">🌙 Dorm rules</div>`+ul(p.dormRules);h+=`<div class="gsec">📏 Rules</div>`+ul(p.rules);if(p.dayPlan&&p.dayPlan.length){h+=`<div class="gsec">⏱️ Daily schedule</div><ul class="gsteps">`+p.dayPlan.map(s=>`<li><b>${escapeAttr(s.t)}</b>— ${escapeAttr(s.what)}</li>`).join('')+`</ul>`;if(p.timesNote)h+=`<p class="gdim">${escapeAttr(p.timesNote)}</p>`;}if(p.bring&&p.bring.length)h+=`<div class="gsec">🎒 Bring</div>`+ul(p.bring);if(p.noGo&&p.noGo.length)h+=`<div class="gsec">🚫 Not allowed</div>`+ul(p.noGo);h+=`<a class="sheet-btn" href="#" onclick="event.stopPropagation();openProgTools('${p.id}');return false;" style="margin-top:10px">🧰 My checklist & notes</a>`;h+=`<div class="meta" style="margin-top:10px">`+(p.phoneHref ? `<a class="sheet-btn" href="tel:${escapeAttr(p.phoneHref)}" onclick="event.stopPropagation()">📞 ${escapeAttr(p.phone)}</a>`:'')+(p.web ? `<a class="sheet-btn" href="${escapeAttr(p.web)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">🌐 Website</a>`:'')+(typeof p.lat==='number' ? `<a class="sheet-btn" href="https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}" target="_blank" onclick="event.stopPropagation()">🗺️ Directions</a>`:'')+(typeof p.lat==='number' ? `<a class="sheet-btn" href="https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}&travelmode=transit" target="_blank" onclick="event.stopPropagation()">🚌 Transit</a>`:'')+`</div>`;return h;}function progCard(p){return `<div class="card" onclick="toggleProg(this,'${p.id}')">`+`<h3>🏕️ ${escapeAttr(p.name)}</h3>`+`<div class="meta"><span class="badge">${escapeAttr(p.type)}</span><span class="badge">Ages ${escapeAttr(p.ages)}</span><span class="badge">Free</span>${progRideBadge(p)}`+(p.dormRules&&p.dormRules.length ? '<span class="badge">🛏️ Dorms</span>':'<span class="badge">🏠 No dorms</span>')+`</div>`+`<div class="meta"><span class="badge">📍 ${escapeAttr(p.city)}</span></div>`+`<p>${escapeAttr(p.programText)}</p>`+`<p style="color:#7c8aff">Tap for details ›</p></div>`;}function toggleProg(el,id){const old=el.querySelector('.guide-detail');if(old){old.remove();return;}const p=PROGRAMS.find(x=>x.id===id);if(!p)return;const div=document.createElement('div');div.className='guide-detail';div.innerHTML=progDetail(p);el.appendChild(div);}function renderPrograms(){const el=document.getElementById('program-list');if(el)el.innerHTML=PROGRAMS.map(progCard).join('');}function wxIcon(code){if(code===0)return '☀️';if(code<=3)return '⛅';if(code<=48)return '🌫️';if(code<=57)return '🌦️';if(code<=67)return '🌧️';if(code<=77)return '🌨️';if(code<=82)return '🌧️';if(code<=86)return '❄️';return '⛈️';}function renderWeather(wx){const el=document.getElementById('wx-banner');if(!el||!wx||!wx.current)return;const t=Math.round(wx.current.temperature_2m);const f=Math.round(wx.current.apparent_temperature);const icon=wxIcon(wx.current.weather_code);if(f<=32){el.innerHTML=`<div class="wx-cold">🥶<b>Cold alert:</b>it feels like ${f}°F out there. `+`<a href="#" onclick="wxShelter();return false;">🏠 Find a warm place →</a></div>`;}else{el.innerHTML=`<div class="wx-bar">${icon}<span>${areaCenter().short}:<b>${t}°F</b>(feels like ${f}°F)</span></div>`;}renderRain(wx);}function fmtHour(iso){const m=/T(\d{2}):(\d{2})/.exec(iso||'');if(!m)return'';let h=+m[1];const ap=h>=12?'PM':'AM';h=h%12||12;return h+':'+m[2]+' '+ap;}function renderRain(wx){const el=document.getElementById('rain-banner');if(!el)return;el.innerHTML='';try{var temp=(wx&&wx.current)?(wx.current.apparent_temperature!=null?wx.current.apparent_temperature:wx.current.temperature_2m):null;var hr=new Date().getHours();if(temp!=null&&temp<=35&&hr>=15&&localStorage.getItem('haven_freeze_dismiss')!==new Date().toISOString().slice(0,10)){el.innerHTML='<div class="wx-rain wx-freeze"><b>Freezing tonight ('+Math.round(temp)+'F)</b> - get inside. <button class="sheet-btn small" onclick="dismissFreeze();openSafeTonight();">Shelters open now</button><button class="wx-dismiss" onclick="dismissFreeze()" aria-label="Dismiss">x</button></div>';return;}const H=wx&&wx.hourly;const ct=wx&&wx.current&&wx.current.time;if(!H||!H.time||!H.precipitation_probability||!ct)return;if(localStorage.getItem('haven_rain_dismiss')===new Date().toISOString().slice(0,10))return;const curH=ct.slice(0,13);let st=0;while(st<H.time.length&&H.time[st].slice(0,13)<curH)st++;let wet=-1;for(let i=st;i<st+12&&i<H.time.length;i++){if((+H.precipitation_probability[i]||0)>=50){wet=i;break;}}if(wet<0)return;el.innerHTML='<div class="wx-rain">🌧️ <b>Rain in the forecast</b> \u2014 starting around '+fmtHour(H.time[wet])+' ('+Math.round(H.precipitation_probability[wet])+'%). <span style="opacity:.75">Forecast, not a guarantee.</span><button class="wx-dismiss" onclick="dismissRain()" aria-label="Dismiss rain alert">\u2715</button></div>';}catch(e){}}function dismissRain(){const el=document.getElementById('rain-banner');if(el)el.innerHTML='';try{localStorage.setItem('haven_rain_dismiss',new Date().toISOString().slice(0,10));}catch(e){}}function dismissFreeze(){var el=document.getElementById('rain-banner');if(el)el.innerHTML='';try{localStorage.setItem('haven_freeze_dismiss',new Date().toISOString().slice(0,10));}catch(e){}}function wxShelter(){document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.getElementById('tab-map').classList.add('active');document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('active',x.dataset.tab==='map'));const b=document.querySelector('.filter-btn[data-cat="shelter"]');if(b)b.click();else alert('Places are still loading — try again in a moment.');}function loadWeather(){const A=areaCenter();const url='https://api.open-meteo.com/v1/forecast?latitude='+A.lat+'&longitude='+A.lon+'&current=temperature_2m,apparent_temperature,weather_code&hourly=precipitation_probability&forecast_days=1&temperature_unit=fahrenheit&timezone='+encodeURIComponent(A.tz);const ctl=typeof AbortController!=='undefined' ? new AbortController():null;const timer=setTimeout(()=>{if(ctl)ctl.abort();},8000);fetch(url,ctl ?{signal:ctl.signal}:{}).then(r=>{clearTimeout(timer);if(!r.ok)throw new Error('wx');return r.json();}).then(renderWeather).catch(()=>{clearTimeout(timer);});}function todoRemindLabel(ts){try{return new Date(ts).toLocaleString([],{month:'numeric',day:'numeric',hour:'numeric',minute:'2-digit'});}catch(e){return '';}}
function remindDtValue(ts){if(!ts)return '';try{const d=new Date(ts),p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+'T'+p(d.getHours())+':'+p(d.getMinutes());}catch(e){return '';}}
function todoRemindToggle(i){remindEditing=(remindEditing===i?-1:i);renderTodos();}
function todoRemindSave(i){const inp=document.getElementById('remind-dt-'+i);if(!inp)return;const ts=new Date(inp.value).getTime();if(!inp.value||isNaN(ts)){miniToast('Pick a date & time');return;}if(ts<=Date.now()){miniToast('Pick a future time');return;}const t=todoItems();if(!t[i])return;t[i].rem=ts;saveTodos(t);remindEditing=-1;renderTodos();requestNotifPerm();miniToast('⏰ Reminder set');}
function todoRemindClear(i){const t=todoItems();if(!t[i])return;delete t[i].rem;saveTodos(t);remindEditing=-1;renderTodos();miniToast('Reminder cleared');}
function requestNotifPerm(){try{if(typeof Notification!=='undefined'&&Notification.permission==='default'){Notification.requestPermission().catch(()=>{});}}catch(e){}}
function checkTodoReminders(){try{const t=todoItems();let changed=false;const now=Date.now();t.forEach(x=>{if(x&&x.rem&&!x.d&&x.rem<=now){x.rem=null;changed=true;const body=String(x.t||'To-do');try{if(typeof Notification!=='undefined'&&Notification.permission==='granted'){new Notification('⏰ Haven FW reminder',{body:body});}else{miniToast('⏰ '+body);}}catch(e){try{miniToast('⏰ '+body);}catch(e2){}}}});if(changed){saveTodos(t);renderTodos();}}catch(e){}}
if(document.readyState==='loading'){window.addEventListener('DOMContentLoaded',()=>{init();loadWeather();});}else{init();loadWeather();}


function printFlyer(cat,icon){
  const list=(allPlaces||[]).filter(r=>(r.cats||[]).includes(cat)).slice(0,20);
  const w=window.open('','_blank');
  let h='<html><head><title>'+cat+' Flyer</title>';
  h+='<style>body{font-family:system-ui,sans-serif;padding:24px;max-width:700px;margin:0 auto}';
  h+='h1{font-size:28px;margin-bottom:4px}p.sub{color:#666;margin-top:0}';
  h+='li{margin:10px 0;padding:10px;border:1px solid #ddd;border-radius:8px;list-style:none}';
  h+='ul{padding:0}.ph{font-weight:700}</style></head><body>';
  h+='<h1>'+icon+' '+cat.charAt(0).toUpperCase()+cat.slice(1)+'</h1>';
  h+='<p class="sub">Haven FW — Fort Wayne free resources</p><ul>';
  list.forEach(r=>{h+='<li><span class="ph">'+r.name+'</span><br>'+(r.addr||'')+'<br>'+(r.phone||'')+'</li>';});
  h+='</ul><p>Full directory: https://boo4blue.github.io/app/</p>';
  h+='</body></html>';
  w.document.write(h);w.document.close();
  setTimeout(()=>w.print(),500);
}

function uFC(){try{var n=activeCats().length+(openNow?1:0);var b=document.getElementById('fc');if(!b){var btn=document.getElementById('map-filter-btn');if(!btn)return;b=document.createElement('span');b.id='fc';b.style.cssText='position:absolute;top:-4px;right:-4px;background:#ea4335;color:#fff;border-radius:50%;min-width:18px;height:18px;font-size:11px;line-height:18px;text-align:center;font-weight:800;';btn.style.position='relative';btn.appendChild(b);}b.style.display=n?'block':'none';b.textContent=n;}catch(e){}}function updateFilterCount(){try{uFC();}catch(e){}}

function printFlyer(cat,icon){
  var list=(allPlaces||[]).filter(function(r){return (r.cats||[]).indexOf(cat)>=0;}).slice(0,20);
  var w=window.open('','_blank');
  var h='<html><head><title>'+cat+' Flyer</title>';
  h+='<style>body{font-family:system-ui,sans-serif;padding:24px;max-width:700px;margin:0 auto}';
  h+='h1{font-size:28px;margin-bottom:4px}p.sub{color:#666;margin-top:0}';
  h+='li{margin:10px 0;padding:10px;border:1px solid #ddd;border-radius:8px;list-style:none}';
  h+='ul{padding:0}.ph{font-weight:700}</style></head><body>';
  h+='<h1>'+icon+' '+cat.charAt(0).toUpperCase()+cat.slice(1)+'</h1>';
  h+='<p class="sub">Haven FW - Fort Wayne free resources</p><ul>';
  list.forEach(function(r){h+='<li><span class="ph">'+r.name+'</span><br>'+(r.addr||'')+'<br>'+(r.phone||'')+'</li>';});
  h+='</ul><p>Full directory: https://boo4blue.github.io/app/</p>';
  h+='</body></html>';
  w.document.write(h);w.document.close();
  setTimeout(function(){w.print();},500);
}



/* ===== Flyer share sheet (feature #25) =====
   Ported from the app's flyer-share.js: tapping a Help-tab flyer button now
   opens a share sheet (Share / Text / Email / Copy / Print) instead of
   printing directly. The recipient does NOT need Haven FW: the flyer goes
   out as plain text. */
function flyerShareList(cat){
  var list=(allPlaces||[]).filter(function(r){return (r.cats||[]).indexOf(cat)>=0;}).slice(0,20);
  return list;
}
function flyerPlainText(cat,compact){
  var list=flyerShareList(cat);
  var lines=list.map(function(r){
    var bits=[r.name||''];
    if(!compact){
      if(r.addr)bits.push(r.addr+(r.zip?' '+r.zip:''));
      if(r.phone)bits.push(r.phone);
    }
    return '• '+bits.join(' — ');
  });
  return cat.charAt(0).toUpperCase()+cat.slice(1)+' — free resources (Haven FW)\n\n'+lines.join('\n')+'\n\nShared from Haven FW: https://boo4blue.github.io/app/';
}
function copyFlyerText(cat){
  var txt=flyerPlainText(cat);
  function ok(){miniToast('Copied — paste it anywhere');}
  function old(){
    var ta=document.createElement('textarea');
    ta.value=txt;ta.style.cssText='position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta);ta.focus();ta.select();
    try{document.execCommand('copy');ok();}catch(e){}
    ta.remove();
  }
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(ok,old);else old();
}
function shareFlyerAny(cat,icon){
  var title=icon+' '+cat.charAt(0).toUpperCase()+cat.slice(1)+' · Haven FW';
  if(navigator.share){navigator.share({title:title,text:flyerPlainText(cat)}).catch(function(){});}
}
function openFlyerSheet(cat,icon){
  var title=icon+' '+cat.charAt(0).toUpperCase()+cat.slice(1);
  var canShare=!!(typeof navigator!=='undefined'&&navigator.share);
  function row(ic,label,sub,act){
    return '<button class="fs-btn'+(act==='share'?' fs-pri':'')+'" data-fact="'+act+'"><span class="fi">'+ic+'</span><span>'+escapeHtml(label)+(sub?'<small>'+escapeHtml(sub)+'</small>':'')+'</span></button>';
  }
  var h='<h2>'+escapeHtml(title)+'</h2><p class="row" style="color:#888;font-size:13px;">Share this flyer — the recipient does not need the app.</p>';
  if(canShare)h+=row('📤','Share…','Messages, email, social…','share');
  h+=row('💬','Text message','','sms');
  h+=row('✉️','Email','','mail');
  h+=row('📋','Copy text','Paste anywhere','copy');
  h+=row('🖨️','Print','','print');
  h+=row('✖️','Close','','close');
  var bodyEl=document.getElementById('sheet-body');
  bodyEl.innerHTML=h;
  bodyEl.dataset.flyerCat=cat;
  bodyEl.dataset.flyerIcon=icon;
  var btns=bodyEl.querySelectorAll('[data-fact]');
  for(var i=0;i<btns.length;i++)(function(b){
    b.addEventListener('click',function(){
      var a=b.getAttribute('data-fact');
      var c=bodyEl.dataset.flyerCat,ic=bodyEl.dataset.flyerIcon;
      if(a==='close')closeSheet();
      else if(a==='share'){shareFlyerAny(c,ic);}
      else if(a==='sms'){window.location.href='sms:?&body='+encodeURIComponent(flyerPlainText(c,true));}
      else if(a==='mail'){window.location.href='mailto:?subject='+encodeURIComponent(ic+' '+c.charAt(0).toUpperCase()+c.slice(1)+' · Haven FW')+'&body='+encodeURIComponent(flyerPlainText(c));}
      else if(a==='copy'){copyFlyerText(c);}
      else if(a==='print'){closeSheet();printFlyer(c,ic);}
    });
  })(btns[i]);
  document.getElementById('sheet-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}

function openNewHereGuide(){
  var h='<h2>Never stayed at a shelter before?</h2>';
  h+='<p class="nh-intro">It\'s okay to be nervous — almost everyone is their first time. Here\'s exactly what happens, so nothing catches you off guard.</p>';
  h+='<div class="nh-sec">🚪 What intake looks like</div>';
  h+='<p class="nh-p">You walk in and tell the front desk you need a bed for tonight. They\'ll ask your name and maybe your birthday, then check if there\'s space. It takes about 10–15 minutes. No appointment needed at most places — you can just show up.</p>';
  h+='<div class="nh-sec">🎒 What to bring</div>';
  h+='<p class="nh-p">Photo ID if you have one — but don\'t panic if you don\'t. Most emergency shelters won\'t turn you away for that. Bring any medications and your phone charger. That\'s really it. Leave behind anything valuable you can\'t keep on you at all times.</p>';
  h+='<div class="nh-sec">✊ Your rights</div>';
  h+='<p class="nh-p">You deserve to be treated with dignity — nobody gets to talk down to you for asking for help. Most emergency shelters cannot turn you away just because you don\'t have ID. And if you ever feel unsafe, you can walk out. You\'re not locked in.</p>';
  h+='<div class="nh-sec">🌙 If you arrive late</div>';
  h+='<p class="nh-p">Beds go fast, especially in winter. If you can, call ahead — the number is on the shelter\'s page here. If one place is full, ask them to call around for you. Shelters talk to each other and usually know who still has beds. Don\'t give up after one "no."</p>';
  h+='<div style="margin-top:18px;"><a class="sheet-btn" href="tel:211">📞 Call 211 — they can find you an open bed right now</a></div>';
  document.getElementById('sheet-body').innerHTML=h;
  document.getElementById('sheet-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}

function getFavs(){try{return JSON.parse(localStorage.getItem('haven_favs')||'[]');}catch(e){return[];}}
function isFav(id){return getFavs().indexOf(id)>=0;}
function toggleFav(id){var f=getFavs();var i=f.indexOf(id);if(i>=0)f.splice(i,1);else f.push(id);localStorage.setItem('haven_favs',JSON.stringify(f));try{renderSaved();}catch(e){}return i<0;}
function renderSaved(){
  var el=document.getElementById('saved-list');
  if(!el)return;
  var favs=getFavs();
  if(!favs.length){
    el.innerHTML='<div style="text-align:center;color:#888;padding:40px 20px;"><div style="font-size:48px;margin-bottom:12px;">💾</div><div>No saved places yet.</div><div style="font-size:13px;margin-top:8px;">Tap the ♡ on any place to save it here.</div></div>';
    return;
  }
  var places=(allPlaces||[]).filter(function(r){return favs.indexOf(r.id)>=0;});
  el.innerHTML=places.map(function(r){
    return '<div style="background:#1a1f2e;border:1px solid #2a2f3e;border-radius:12px;padding:12px;margin-bottom:8px;display:flex;gap:12px;align-items:center;">'+
      '<div style="flex:1;min-width:0;"><div style="font-weight:700;color:#fff;">'+r.name+'</div>'+
      (r.addr?'<div style="font-size:13px;color:#888;">'+r.addr+'</div>':'')+'</div>'+
      '<button onclick="toggleFav(\''+r.id+'\')" style="background:none;border:0;font-size:24px;cursor:pointer;">❤️</button></div>';
  }).join('');
}

function decodeEnt(s){try{var t=document.createElement('textarea');t.innerHTML=String(s==null?'':s);return t.value;}catch(e){return String(s==null?'':s);}}
function stripHtml(s){return decodeEnt(String(s||'')).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();}
function liveEventsUrl(){var d=new Date();var s=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');return 'https://whatzup.com/wp-json/tribe/events/v1/events?per_page=50&start_date='+s+'&status=publish';}
function mapLiveEvt(e){
  var v=e.venue||{};
  var sd=String(e.start_date||'');
  var dkey=sd.slice(0,10);
  var when=dkey;
  try{var dt=new Date(sd.replace(' ','T'));if(!isNaN(dt))when=dt.toLocaleDateString([],{weekday:'short',month:'short',day:'numeric'})+(e.all_day?'':' \u00b7 '+dt.toLocaleTimeString([],{hour:'numeric',minute:'2-digit'}));}catch(x){}
  var addr=[v.address,v.city,v.zip].filter(Boolean).join(', ');
  var rawDesc=(e.excerpt&&String(e.excerpt).trim())?e.excerpt:e.description;
  var desc=stripHtml(rawDesc).slice(0,180);
  return {id:'live-'+e.id,title:stripHtml(e.title),date:when,_dkey:dkey,venue:stripHtml(v.venue),addr:addr,desc:desc,url:e.website||e.url||'',live:true};
}
function mergeEvents(statics,live){
  var seen={},out=[];
  statics.forEach(function(e){var k=String(e.title||e.name||'').toLowerCase().trim()+'|'+String(e.date||'').slice(0,10);seen[k]=1;out.push(e);});
  live.forEach(function(e){var k=String(e.title||'').toLowerCase().trim()+'|'+(e._dkey||'');if(!seen[k]){seen[k]=1;out.push(e);}});
  return out;
}
function paintEventsList(el,evts){
  if(!evts.length){
    el.innerHTML='<div style="text-align:center;color:#888;padding:40px 20px;"><div style="font-size:48px;margin-bottom:12px;">\uD83D\uDCC5</div><div>No events right now.</div><div style="font-size:13px;margin-top:8px;">Check back soon!</div></div>';
    return;
  }
  el.innerHTML=evts.map(function(e){
    var btns=[];
    if(e.url&&String(e.url).trim())btns.push('<a class="sheet-btn" href="'+escapeAttr(e.url)+'" target="_blank" rel="noopener">\uD83C\uDF10 Website</a>');
    var mapsUrl=null;
    if(e.lat&&e.lng)mapsUrl='https://www.google.com/maps/dir/?api=1&destination='+e.lat+','+e.lng;
    else if(e.addr)mapsUrl='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(e.addr+(e.zip?' '+e.zip:''));
    if(mapsUrl)btns.push('<a class="sheet-btn" href="'+escapeAttr(mapsUrl)+'" target="_blank" rel="noopener">\uD83D\uDDFA\uFE0F Maps</a>');
    return '<div style="background:#1a1f2e;border:1px solid #2a2f3e;border-radius:12px;padding:12px;margin-bottom:8px;">'+
      '<div style="font-weight:700;color:#fff;">'+escapeHtml(e.name||e.title||'Event')+'</div>'+
      (e.date?'<div style="font-size:13px;color:#7aa8ff;">'+escapeHtml(e.date)+'</div>':'')+
      (e.venue?'<div style="font-size:13px;color:#888;">'+escapeHtml(e.venue)+'</div>':'')+
      (e.desc?'<div style="font-size:13px;color:#888;margin-top:4px;">'+escapeHtml(e.desc)+'</div>':'')+
      (btns.length?'<div class="meta" style="margin-top:8px;">'+btns.join('')+'</div>':'')+'</div>';
  }).join('');
}
var _liveEvts=null,_liveEvtsBusy=false;
function renderEvents(){
  var el=document.getElementById('events-list');
  if(!el)return;
  var statics=(typeof EVENTS!=='undefined'?EVENTS:[]);
  paintEventsList(el,mergeEvents(statics,_liveEvts||[]));
  if(_liveEvts||_liveEvtsBusy||typeof fetch==='undefined')return;
  _liveEvtsBusy=true;
  fetch(liveEventsUrl()).then(function(r){if(!r.ok)throw new Error('ev');return r.json();}).then(function(d){
    _liveEvts=(d.events||[]).map(mapLiveEvt);
    _liveEvtsBusy=false;
    var el2=document.getElementById('events-list');
    if(el2)paintEventsList(el2,mergeEvents(statics,_liveEvts));
  }).catch(function(){_liveEvtsBusy=false;});
}

function renderVolunteer(){
  var el=document.getElementById('volunteer-list');
  if(!el)return;
  var vols=(allPlaces||[]).filter(function(r){
    var cats=r.cats||[];
    return cats.indexOf('volunteer')>=0;
  });
  if(!vols.length){
    el.innerHTML='<div style="text-align:center;color:#888;padding:40px 20px;"><div style="font-size:48px;margin-bottom:12px;">🤝</div><div>No volunteer listings right now.</div></div>';
    return;
  }
  el.innerHTML=vols.map(function(r){
    return '<div style="background:#1a1f2e;border:1px solid #2a2f3e;border-radius:12px;padding:12px;margin-bottom:8px;">'+
      '<div style="font-weight:700;color:#fff;">'+r.name+'</div>'+
      (r.addr?'<div style="font-size:13px;color:#888;">'+r.addr+'</div>':'')+
      (r.phone?'<div style="font-size:13px;color:#888;">'+r.phone+'</div>':'')+'</div>';
  }).join('');
}

function renderGuides(){const box=document.getElementById('ggCards');if(!box||typeof GUIDES==='undefined')return;
let list=GUIDES.filter(g=>!g.area||g.area===getArea());
if(window._gq)list=list.filter(g=>(g.title+' '+(g.intro||'')).toLowerCase().includes(window._gq));
box.innerHTML=`<input id='gq' placeholder='Search guides...' oninput='window._gq=this.value.toLowerCase();renderGuides()' style='width:100%;padding:10px;border-radius:12px;border:1px solid #333;background:#1a1f2e;color:#fff;margin-bottom:10px;box-sizing:border-box;'><div style='display:grid;grid-template-columns:1fr 1fr;gap:8px;'>`+list.map((g,i)=>{const p=JSON.parse(localStorage.getItem('hvgp')||'{}')[g.id]||{},bn=(g.bring||[]).length,bd=(p.b||[]).length;
return `<div style='background:#1a1f2e;border:1px solid #2a2f3e;border-radius:14px;overflow:hidden;'><button onclick='openGuideReader("${g.id}")' style='width:100%;background:none;border:0;color:#fff;text-align:left;padding:12px;cursor:pointer;'><div style='font-size:22px;'>${g.icon||'📖'}</div><div style='font-weight:700;font-size:14px;margin:4px 0;'>${g.title}</div><div style='font-size:12px;color:#888;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;'>${g.intro||''}</div>${bn?`<div style='margin-top:6px;font-size:11px;color:#7aa8ff;'>${bd}/${bn} ready</div>`:''}<div style='font-size:12px;color:#7c8aff;margin-top:6px;'>Read \u2192</div></button></div>`;}).join('')+'</div>';const q=document.getElementById('gq');if(q&&window._gq){q.value=window._gq;q.focus();}}

function gchk(gid,k,el){const P=JSON.parse(localStorage.getItem('hvgp')||'{}'),o=P[gid]=P[gid]||{b:[],s:[]},a=k.toString().startsWith('s')?o.s:o.b,kk=k.toString().startsWith('s')?k:k,idx=a.indexOf(kk);if(idx>=0)a.splice(idx,1);else a.push(kk);localStorage.setItem('hvgp',JSON.stringify(P));renderGuides();refreshGuideReader();}
var guideReaderId=null;
function guideDetailHtml(g){var p={};try{p=JSON.parse(localStorage.getItem('hvgp')||'{}')[g.id]||{};}catch(e){}return (g.where?`<div style='font-size:15px;margin-bottom:10px;line-height:1.5;'>📍 <b>${g.where}</b></div>`:'')+(g.intro?`<div style='font-size:14px;color:#ccc;margin-bottom:6px;line-height:1.6;'>${g.intro}</div>`:'')+(g.bring?`<div style='font-size:11px;color:#888;margin:12px 0 4px;letter-spacing:1px;'>BRING (tap to check)</div>`+g.bring.map((b,bi)=>`<div onclick='gchk("${g.id}",${bi},this)' style='padding:12px 8px;border-bottom:1px solid #2a2f3e;font-size:15px;line-height:1.5;cursor:pointer;${(p.b||[]).includes(bi)?"text-decoration:line-through;opacity:.5":""}'>\u2610 ${b}</div>`).join(''):'')+(g.steps?`<div style='font-size:11px;color:#888;margin:12px 0 4px;letter-spacing:1px;'>STEPS</div>`+g.steps.map((s,si)=>`<div onclick='gchk("${g.id}","s"+${si},this)' style='padding:12px 8px;border-bottom:1px solid #2a2f3e;font-size:15px;line-height:1.6;cursor:pointer;${(p.s||[]).includes("s"+si)?"text-decoration:line-through;opacity:.5":""}'>${si+1}. ${s}</div>`).join(''):'')+(g.tips?`<div style='background:rgba(250,204,21,.1);border-radius:10px;padding:12px;margin-top:12px;font-size:14px;line-height:1.6;'>💡 ${g.tips}</div>`:'');}
function openGuideReader(gid){var gl=(typeof GUIDES!=='undefined'?GUIDES:[]);var g=null;for(var k=0;k<gl.length;k++){if(gl[k].id===gid){g=gl[k];break;}}if(!g)return;guideReaderId=gid;var ov=document.getElementById('guideReader');if(!ov){ov=document.createElement('div');ov.id='guideReader';document.body.appendChild(ov);}ov.innerHTML=`<div class='gr-head'><button class='gr-close' onclick='closeGuideReader()' aria-label='Close guide'>\u2715</button><div style='font-size:32px;'>${g.icon||'📖'}</div><h2>${g.title}</h2></div><div class='gr-body'>${guideDetailHtml(g)}</div>`;ov.style.display='block';try{ov.scrollTop=0;}catch(e){}document.body.style.overflow='hidden';}
function closeGuideReader(){var ov=document.getElementById('guideReader');if(ov)ov.style.display='none';document.body.style.overflow='';guideReaderId=null;}
function refreshGuideReader(){if(!guideReaderId)return;var gl=(typeof GUIDES!=='undefined'?GUIDES:[]);var g=null;for(var k=0;k<gl.length;k++){if(gl[k].id===guideReaderId){g=gl[k];break;}}if(!g)return;var ov=document.getElementById('guideReader');if(ov){var b=ov.querySelector('.gr-body');if(b)b.innerHTML=guideDetailHtml(g);}}


/* ---- "Can I go here?" finder — ported from the app's more-features.js ----
   Tap what you need (pets OK, no ID, couples, no sobriety, records OK...)
   and Haven checks each listing's text. Staff can use it at the front desk. */
function finderHay(r){return String((r.name||'')+' '+(r.desc||'')+' '+((r.tags||[]).join(' '))).toLowerCase();}
const FINDER_RX={
  pets:/\bpets?\b|\bdogs?\b|\bcats?\b|service animal/,
  noid:/without (a |an |any )?(photo )?id|id (is )?(not )?(required|needed)|no photo id|no identification|no (id|documents?) (needed|required)/,
  fam:/famil(y|ies)|children|kids|mothers?|infant|toddler|diaper/,
  vet:/veteran/,senior:/senior|elder|older adult|60\+|65\+|meals on wheels/,
  disab:/disab|wheelchair|mobility|walker/,
  couples:/couple|spouse|married|partner/,
  nosober:/no sobriety|sobriety (is )?(not )?(required|needed)|low[- ]barrier|no (drug|alcohol) (test|screen)|harm reduction|no sober/,
  record:/felon|criminal record|re-?entry|second chance|expunge|record cleared|with (a )?records?/
};
const FINDER_QF={
  pets:r=>(r.cats||[]).includes('pets')||FINDER_RX.pets.test(finderHay(r)),
  // Refined vs the app: the app's replace(RX.noid,'') also strips the "id required"
  // inside "photo id required", so the veto below missed it and "Photo ID required"
  // was wrongly shown as "No ID needed". We only strip explicit no-ID phrases here.
  noid:r=>{const h=finderHay(r);return FINDER_RX.noid.test(h)&&!/photo id required|id required\b(?! for)/.test(h.replace(/without (a |an |any )?(photo )?id|no photo id|no identification|no (id|documents?) (needed|required)/,''));},
  fam:r=>(r.cats||[]).includes('youth')||(r.cats||[]).includes('babybox')||FINDER_RX.fam.test(finderHay(r))
};
const FINDER_FILTERS=[
  ['open','🟢 Open now',r=>isOpenNow(r)===true],
  ['pets','🐾 Pets OK',r=>FINDER_QF.pets(r)],
  ['noid','🪪 No ID needed',r=>FINDER_QF.noid(r)],
  ['fam','👨‍👩‍👧 Families',r=>FINDER_QF.fam(r)],
  ['couples','💑 Couples',r=>FINDER_RX.couples.test(finderHay(r))],
  ['nosober','🍺 No sobriety needed',r=>FINDER_RX.nosober.test(finderHay(r))],
  ['record','🔓 Records OK',r=>FINDER_RX.record.test(finderHay(r))],
  ['vet','🎖️ Veterans',r=>FINDER_RX.vet.test(finderHay(r))],
  ['senior','🧓 Seniors',r=>FINDER_RX.senior.test(finderHay(r))],
  ['wheel','♿ Accessible',r=>!!r.wheel||FINDER_RX.disab.test(finderHay(r))]
];
function finderEmoji(r){const l=(typeof FILTER_CATS!=='undefined'&&FILTER_CATS[(r.cats||[])[0]])||'';return l.split(' ')[0]||'📍';}
function closeFinder(){const o=document.getElementById('finder-ov');if(o)o.remove();}
function openFinder(){
  const sel=new Set();let cat='';
  closeFinder();
  const ov=document.createElement('div');ov.id='finder-ov';
  ov.innerHTML='<div id="finder-in"><h2>🔎 Can I go here?</h2><p class="finder-sub">Tap what you need and Haven checks each listing\u2019s text. Staff can use this at the front desk. <b>Call to confirm before you go.</b></p><div class="finder-chips" id="ff-chips"></div><div class="finder-chips" id="ff-cats"></div><div class="finder-sub" id="ff-count"></div><div id="ff-res"></div><button class="sheet-btn" onclick="closeFinder()" style="margin-top:12px;width:100%;">✕ Close</button></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click',e=>{if(e.target===ov)closeFinder();});
  const draw=()=>{
    document.getElementById('ff-chips').innerHTML=FINDER_FILTERS.map(f=>'<button class="filter-btn'+(sel.has(f[0])?' active':'')+'" data-f="'+f[0]+'">'+escapeHtml(f[1])+'</button>').join('');
    const keys=typeof FILTER_CATS==='undefined'?[]:Object.keys(FILTER_CATS);
    document.getElementById('ff-cats').innerHTML='<button class="filter-btn'+(cat===''?' active':'')+'" data-c="">All types</button>'+keys.map(k=>'<button class="filter-btn'+(cat===k?' active':'')+'" data-c="'+k+'">'+escapeHtml(FILTER_CATS[k])+'</button>').join('');
    let list=placesInArea().filter(r=>(!cat||(r.cats||[]).includes(cat))&&[...sel].every(k=>FINDER_FILTERS.find(f=>f[0]===k)[2](r)));
    list.sort((a,b)=>((isOpenNow(b)===true?1:0)-(isOpenNow(a)===true?1:0)));
    if(typeof userLoc!=='undefined'&&userLoc)list.sort((a,b)=>(distMi(userLoc.lat,userLoc.lng,a.lat,a.lng)-distMi(userLoc.lat,userLoc.lng,b.lat,b.lng)));
    document.getElementById('ff-count').textContent=list.length+' places'+(sel.size?' matching '+sel.size+' filter'+(sel.size>1?'s':''):'');
    const rows=list.slice(0,40);
    const box=document.getElementById('ff-res');
    box.innerHTML=rows.map((r,i)=>'<button class="finder-row" data-i="'+i+'"><span class="fi">'+finderEmoji(r)+'</span><span class="fb"><b>'+escapeHtml(r.name)+'</b><small>'+escapeHtml(r.addr||'')+'</small></span>'+(isOpenNow(r)===true?'<span class="open-badge open-now">Open</span>':'')+'</button>').join('')||'<p class="finder-sub">Nothing matches. Try removing a filter.</p>';
    ov.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{const k=b.getAttribute('data-f');if(sel.has(k))sel.delete(k);else sel.add(k);draw();});
    ov.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{cat=b.getAttribute('data-c');draw();});
    box.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const r=rows[+b.getAttribute('data-i')];closeFinder();if(r)showSheet(r);});
  };
  draw();
}

/* ===== Donators (feature #24) =====
   Ported from the app's haven-donors.js: groups that just show up, hand out
   free food/supplies, and leave (not events). A "Donators" button in the
   Events tab opens a panel with the groups + "Show on map". Fort Wayne only:
   the groups are local, so the button hides in the Portland area. */
var DEALERS={id:"dealers-to-disciples",name:"Dealers to Disciples",cats:["meals"],
 addr:"508 E Washington Blvd",zip:"46802",lat:41.07785,lng:-85.13195,
 desc:"Donators who show up Saturdays around 3pm with free food and water. Next to the gas station near the mission. Times can shift a little.",
 tags:["donators","free food","free water","Saturday"],hoursText:"Saturdays, around 3pm"};
function donorsEnsure(){
 try{
  const L=(typeof RESOURCES!=="undefined"&&Array.isArray(RESOURCES))?RESOURCES:null;
  if(L&&!L.some(r=>r&&r.id===DEALERS.id))L.push(DEALERS);
 }catch(e){}
}
function nextKingsman(){
 const anchor=new Date("2026-10-03T12:00:00"),today=new Date();today.setHours(0,0,0,0);
 const d=new Date(anchor);while(d<today)d.setDate(d.getDate()+14);
 return d.toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"});
}
function havenDonors(){
 return [
  {name:"Feeding the Hungry",gives:"Free lunches and reusable water bottles",when:"Saturdays, around 10-11am (try to be there by 10)",where:"Fort Wayne Rescue Mission (404 E Washington Blvd) and Freimann Square (201 E Main St)",pin:"fwrm"},
  {name:"Kingsman",gives:"Free lunches",when:"Every other Saturday, around 11:30am. Next: "+nextKingsman(),where:"Fort Wayne Rescue Mission, 404 E Washington Blvd",pin:"fwrm"},
  {name:"Dealers to Disciples",gives:"Free food and water",when:"Saturdays, around 3pm",where:"508 E Washington Blvd (next to the gas station near the mission)",pin:"dealers-to-disciples"}
 ];
}
function donorEsc(x){return String(x==null?"":x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
function donorPinPlace(pinId){
 try{if(typeof byId==="function"){const r=byId(pinId);if(r&&r.id)return r;}}catch(e){}
 return null;
}
var donorsPanel=null;
function donorsClose(){try{if(donorsPanel)donorsPanel.style.display="none";}catch(e){}}
function donorsOpen(){
 try{
  donorsEnsure();
  if(!donorsPanel){
   donorsPanel=document.createElement("div");
   donorsPanel.id="donatorsPanel";
   donorsPanel.style.cssText="position:fixed;left:0;right:0;top:0;bottom:0;z-index:2000;background:#0f1420;color:#fff;overflow-y:auto;padding:16px 16px 90px;";
   document.body.appendChild(donorsPanel);
  }
  const list=havenDonors();
  donorsPanel.innerHTML=
   '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">'+
   '<h2 style="flex:1;font-size:22px;color:#fff;margin:0;">🤝 Donators</h2>'+
   '<button id="donClose" style="padding:10px 16px;background:#1a1f2e;border:1px solid #555;color:#fff;border-radius:10px;font-size:14px;cursor:pointer;">Close</button></div>'+
   '<p style="color:#aaa;font-size:14px;margin:0 0 12px;">Groups that show up, hand out free food and supplies, and leave. Times can shift, so get there a little early.</p>'+
   list.map((d,i)=>{
    const hasPin=!!donorPinPlace(d.pin);
    return '<div style="background:#1a1f2e;border:1px solid #333;border-radius:12px;padding:14px;margin-bottom:10px;">'+
     '<div style="font-size:17px;font-weight:800;color:#fff;">'+donorEsc(d.name)+"</div>"+
     '<div style="color:#ccc;font-size:14px;margin-top:6px;"><b style="color:#fff;">Gives:</b> '+donorEsc(d.gives)+"</div>"+
     '<div style="color:#ccc;font-size:14px;margin-top:4px;"><b style="color:#fff;">When:</b> '+donorEsc(d.when)+"</div>"+
     '<div style="color:#ccc;font-size:14px;margin-top:4px;"><b style="color:#fff;">Where:</b> '+donorEsc(d.where)+"</div>"+
     (hasPin?'<div style="margin-top:10px;"><button data-don="'+i+'" style="padding:10px 18px;background:#7c4dff;border:0;color:#fff;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;">📍 Show on map</button></div>':"")+
     "</div>";
   }).join("");
  donorsPanel.style.display="block";donorsPanel.scrollTop=0;
  const cb=donorsPanel.querySelector("#donClose");if(cb)cb.onclick=donorsClose;
  donorsPanel.querySelectorAll("[data-don]").forEach(b=>{b.onclick=function(){donorShowOnMap(list[+b.getAttribute("data-don")].pin);};});
 }catch(e){}
}
function donorShowOnMap(pinId){
 donorsClose();
 const r=donorPinPlace(pinId);
 if(!r){if(typeof miniToast==="function")miniToast("That place isn't on the map.");return;}
 try{if(typeof goTab==="function")goTab("map");}catch(e){}
 setTimeout(function(){
  try{
   if(typeof map!=="undefined"&&map&&r.lat&&r.lng&&typeof map.setView==="function")map.setView([r.lat,r.lng],16);
   if(typeof openPlacePanel==="function")openPlacePanel(r);
  }catch(e){}
 },250);
}
function renderDonatorsBtn(){
 try{
  const tab=document.getElementById("tab-events");if(!tab)return;
  const show=(typeof getArea==="function"?getArea():"fort-wayne")==="fort-wayne";
  let b=document.getElementById("donatorsBtn");
  if(!show){if(b)b.style.display="none";donorsClose();return;}
  if(!b){
   b=document.createElement("button");b.id="donatorsBtn";
   b.textContent="🤝 Donators: free food & supplies groups";
   b.style.cssText="display:block;width:100%;margin:0 0 12px;padding:14px;background:#1a1f2e;border:1px solid #7c4dff;color:#fff;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;";
   b.onclick=donorsOpen;
   const list=document.getElementById("events-list");
   if(list&&list.parentNode&&typeof list.parentNode.insertBefore==="function")list.parentNode.insertBefore(b,list);
   else if(typeof tab.appendChild==="function")tab.appendChild(b);
  }
  b.style.display="block";
 }catch(e){}
}
/* Hook into the site boot: DEALERS must be in RESOURCES before init() builds
   allPlaces, and the button must follow area switches. */
try{
 if(typeof init==="function"&&!init.__donorsWrapped){
  const _init24=init;
  init=function(){try{donorsEnsure();}catch(e){}_init24();try{renderDonatorsBtn();}catch(e){}};
  init.__donorsWrapped=true;
 }else if(typeof init==="function"){
  try{donorsEnsure();renderDonatorsBtn();}catch(e){}
 }
}catch(e){}
try{
 if(typeof applyArea==="function"&&!applyArea.__donorsWrapped){
  const _aa24=applyArea;
  applyArea=function(){_aa24();try{renderDonatorsBtn();}catch(e){}};
  applyArea.__donorsWrapped=true;
 }
}catch(e){}

/* website parity 2026-10-12 16:06 EDT: back-to-top FAB for the places list (#list), mirroring the Android app v22 polish (#topBtn). Fades in after ~600px of #list scrolling, tap jumps to top; appended to #places-sheet so list re-renders do not destroy it. */
(function(){
var list=document.getElementById("list");
var sheet=document.getElementById("places-sheet");
if(!list||!sheet||document.getElementById("topBtnW"))return;
var btn=document.createElement("button");
btn.id="topBtnW";btn.type="button";btn.innerHTML="\\u2191";
btn.setAttribute("aria-label","Back to top");
sheet.appendChild(btn);
var ticking=false;
list.addEventListener("scroll",function(){
 if(ticking)return;ticking=true;
 requestAnimationFrame(function(){btn.classList.toggle("show",list.scrollTop>600);ticking=false;});
},{passive:true});
var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)");
btn.addEventListener("click",function(){
 try{list.scrollTo({top:0,behavior:(reduce&&reduce.matches)?"auto":"smooth"});}catch(_){list.scrollTop=0;}
});
})();

/* SAFE TONIGHT + CHARGE MY PHONE — Boo's vision: action over information. */
function _stDirUrl(r){return 'https://www.google.com/maps/dir/?api=1&destination='+r.lat+','+r.lng;}
function _stRow(r){
  var d=(userLoc&&r.lat&&r.lng)?distMi(userLoc.lat,userLoc.lng,r.lat,r.lng).toFixed(1)+' mi away':'';
  var st=openStatusLine(r);
  var _stCall=(r&&r.phone)?'<a class="sheet-btn small" href="tel:'+String(r.phone).replace(/[^0-9+]/g,'')+'">Call</a>':'<a class="sheet-btn small" href="tel:211">Call 211</a>';
  return '<div style="background:#1a1f2e;border:1px solid #2a2f3e;border-radius:12px;padding:12px;margin-bottom:10px;">'+
    '<div style="font-weight:700;color:#fff;font-size:16px;">'+escapeHtml(r.name||'Unnamed')+'</div>'+
    (r.addr?'<div style="font-size:13px;color:#888;margin-top:2px;">'+escapeHtml(r.addr)+'</div>':'')+
    (d?'<div style="font-size:13px;color:#7c8aff;margin-top:2px;">'+d+'</div>':'')+
    (st?'<div style="margin-top:4px;">'+st+'</div>':'')+
    '<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;">'+_stCall+'<a class="sheet-btn small" href="'+_stDirUrl(r)+'" target="_blank" rel="noopener">Get Me There</a><a class="sheet-btn small" href="'+_stDirUrl(r)+'&travelmode=transit" target="_blank" rel="noopener">By bus</a></div></div>';
}
function _stNeedLoc(btn,rerun){
  if(!navigator.geolocation){miniToast('Location not supported on this device.');return;}
  btn.disabled=true;btn.textContent='Getting your location…';
  navigator.geolocation.getCurrentPosition(function(p){
    userLoc={lat:p.coords.latitude,lng:p.coords.longitude};
    rerun();
  },function(){miniToast('Could not get your location. Showing all, not sorted by distance.');btn.disabled=false;btn.textContent='Use my location';},{timeout:8000});
}
function openSafeTonight(){
  var list=placesInArea().filter(function(r){return (r.cats||[]).indexOf('shelter')>=0;});
  var open=list.filter(function(r){return isOpenNow(r)===true;});
  if(userLoc){open.forEach(function(r){r._d=distMi(userLoc.lat,userLoc.lng,r.lat,r.lng);});open.sort(function(a,b){return a._d-b._d;});}
  var h='<h2>Safe Tonight</h2>';
  h+='<p class="nh-intro">Shelters open right now, nearest first. One tap gets you turn-by-turn directions.</p>';
  if(!userLoc)h+='<div style="margin-bottom:12px;"><button class="sheet-btn small" onclick="_stNeedLoc(this,openSafeTonight)">Use my location</button></div>';
  if(!open.length){
    h+='<p class="nh-p">No shelters are showing as open right now — but hours can be wrong. <b>Call 211</b> and a real person will find you a bed tonight.</p>';
    h+='<div style="margin-top:12px;"><a class="sheet-btn" href="tel:211">Call 211 now</a></div>';
  }else{
    h+=open.map(_stRow).join('');
  }
  document.getElementById('sheet-body').innerHTML=h;
  document.getElementById('sheet-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function openChargeSpots(){
  var list=placesInArea().filter(function(r){var c=r.cats||[];return c.indexOf('charge')>=0||c.indexOf('wifi')>=0;});
  if(userLoc){list.forEach(function(r){r._d=distMi(userLoc.lat,userLoc.lng,r.lat,r.lng);});list.sort(function(a,b){return a._d-b._d;});}
  var h='<h2>Charge My Phone</h2>';
  h+='<p class="nh-intro">Free places to charge your phone and get online, nearest first. Your phone is your lifeline — maps, calls, help. Keep it alive.</p>';
  if(!userLoc)h+='<div style="margin-bottom:12px;"><button class="sheet-btn small" onclick="_stNeedLoc(this,openChargeSpots)">Use my location</button></div>';
  if(!list.length){
    h+='<p class="nh-p">No charging spots are listed in this area yet. Libraries and community centers usually have free outlets and WiFi — worth asking.</p><div style="margin-top:12px;"><a class="sheet-btn" href="tel:211">Call 211 for help</a></div>';
  }else{
    h+=list.map(_stRow).join('');
  }
  document.getElementById('sheet-body').innerHTML=h;
  document.getElementById('sheet-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function openBusStops(){
  if(typeof getArea==='function'&&getArea()==='portland'){
    document.getElementById('sheet-body').innerHTML='<h2>Bus Stops Near Me</h2><p class="nh-p">Citilink only runs in Fort Wayne — no bus stops to show here.</p>';
    document.getElementById('sheet-overlay').classList.add('open');document.body.style.overflow='hidden';return;
  }
  var bus=(typeof window!=='undefined')?window.HavenBus:null;
  if(!bus||!bus.stops||!bus.stops.length){
    document.getElementById('sheet-body').innerHTML='<h2>Bus Stops Near Me</h2><p class="nh-p">Bus stop data is not loaded right now. Try the Transit filter on the map instead.</p>';
    document.getElementById('sheet-overlay').classList.add('open');document.body.style.overflow='hidden';return;
  }
  var stops=bus.stops.map(function(s){return {lat:s[0],lng:s[1],name:s[2],id:s[3],routes:s[4]||[],wheel:s[5]};});
  var ref=userLoc?{lat:userLoc.lat,lng:userLoc.lng}:{lat:41.0806,lng:-85.1390};
  stops.forEach(function(x){x._d=distMi(ref.lat,ref.lng,x.lat,x.lng);});
  stops.sort(function(a,b){return a._d-b._d;});
  var h='<h2>Bus Stops Near Me</h2>';
  h+='<p class="nh-intro">The closest Citilink bus stops. Tap a stop to see its routes and get directions.</p>';
  if(userLoc){h+='<p class="nh-p">Works offline — stop data is built into the app.</p>';}
  else{h+='<p class="nh-p">Could not get your location — showing the closest stops to downtown Fort Wayne instead.</p><div style="margin-bottom:12px;"><button class="sheet-btn small" onclick="_stNeedLoc(this,openBusStops)">Use my location</button></div>';}
  stops.slice(0,8).forEach(function(x){
    var mins=Math.max(1,Math.round(x._d*20));
    var badges=(x.routes||[]).map(function(ri){var r=bus.routes[ri]||[];return '<span class="badge" title="'+escapeAttr(r[1]||'')+'" style="background:'+(r[2]||'#666')+'">'+escapeHtml(r[0]||'')+'</span>';}).join(' ');
    h+='<div style="background:#1a1f2e;border:1px solid #2a2f3e;border-radius:12px;padding:12px;margin-bottom:10px;">'+
      '<div style="font-weight:700;color:#fff;font-size:16px;">'+escapeHtml(x.name||'Bus stop')+(x.wheel===1?' \u267f':'')+'</div>'+
      '<div style="font-size:13px;color:#7c8aff;margin-top:4px;">'+badges+'<span style="margin-left:4px;">'+mins+' min walk</span><br>'+(typeof busNextHtml==='function'?busNextHtml(x.id):'')+'</div>'+
      '<div style="margin-top:10px;"><a class="sheet-btn small" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&travelmode=transit&destination='+x.lat+','+x.lng+'">Get Me There</a></div></div>';
  });
  document.getElementById('sheet-body').innerHTML=h;
  document.getElementById('sheet-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}

/* ===== webtabs.js ===== */
/* Haven FW website: Places + Profile tabs (ported from the Android app) */
/* Places tab (ported from the app's Places tab) */
let ptList=[];let ptCats=[];
function togglePtOpenNow(btn){openNow=!openNow;syncOpenNowButtons();renderPlacesTab();}
var PT_NEEDS={sleep:['shelter'],eat:['food','meals'],wash:['day','laundry','bathroom'],health:['health','mental','recovery']};
var PT_NEED_LABEL={sleep:'Sleep',eat:'Eat',wash:'Wash',health:'Health'};
function initPtNeeds(){const nr=document.getElementById('pt-needs');if(!nr||nr.children.length)return;var html='<button class="need-chip on" data-need="all" onclick="ptNeed(\'all\',this)">All</button>';for(var k in PT_NEED_LABEL){html+='<button class="need-chip" data-need="'+k+'" onclick="ptNeed(\''+k+'\',this)">'+PT_NEED_LABEL[k]+'</button>';}nr.innerHTML=html;}
function ptNeed(k,btn){var chips=document.querySelectorAll('#pt-needs .need-chip');for(var i=0;i<chips.length;i++)chips[i].classList.toggle('on',chips[i]===btn);ptCats=(k==='all')?[]:(PT_NEEDS[k]||[]).slice();var fb=document.querySelectorAll('#pt-filters .filter-btn');for(var j=0;j<fb.length;j++){var on=fb[j].dataset.cat&&ptCats.indexOf(fb[j].dataset.cat)>=0;fb[j].classList.toggle('active',!!on);fb[j].style.background=on?'#7c8aff':'#2a2f3e';fb[j].style.color=on?'#fff':'#aaa';}renderPlacesTab();}
function initPtFilters(){const pf=document.getElementById('pt-filters');if(!pf||pf.children.length)return;pf.innerHTML=Object.entries(FILTER_CATS).map(([k,v])=>`<button class="filter-btn" data-cat="${k}" onclick="togglePtCat('${k}',this)" style="flex:none;padding:12px 18px;min-height:48px;border:1px solid #444;border-radius:16px;background:#2a2f3e;color:#aaa;font-size:13px;cursor:pointer;">${v}</button>`).join('');}
function togglePtCat(cat,btn){const i=ptCats.indexOf(cat);if(i>=0){ptCats.splice(i,1);btn.style.background='#2a2f3e';btn.style.color='#aaa';}else{ptCats.push(cat);btn.style.background='#7c8aff';btn.style.color='#fff';}var nc=document.querySelectorAll('#pt-needs .need-chip');for(var n=0;n<nc.length;n++)nc[n].classList.remove('on');renderPlacesTab();}
function ptRowHtml(r,idx){let emoji='💜',color='#7c8aff';for(const c of(r.cats||[])){if(PIN_EMOJI[c]){emoji=PIN_EMOJI[c];color=PIN_COLOR[c]||'#7c8aff';break;}}return `<div onclick="openPlacePanel(ptList[${idx}])" style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #2a2f3e;cursor:pointer;"><div style="width:40px;height:40px;flex:none;border-radius:50%;background:${color}22;border:2px solid ${color};display:flex;align-items:center;justify-content:center;font-size:20px;">${emoji}</div><div style="flex:1;min-width:0;"><div style="color:#fff;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(r.name)}${openBadge(r)}</div><div style="color:#888;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(r.addr||'')}</div></div></div>`;}
function renderPlacesTab(){initPtNeeds();initPtFilters();const se=document.getElementById('pt-search');const so=document.getElementById('pt-sort');const box=document.getElementById('pt-list');if(!se||!so||!box)return;const q=(se.value||'').toLowerCase();const sort=so.value;let list=placesInArea();if(ptCats.length)list=list.filter(r=>(r.cats||[]).some(c=>ptCats.includes(c)));if(openNow)list=list.filter(r=>isOpenNow(r));if(typeof bathroomOnly!=='undefined'&&bathroomOnly)list=list.filter(r=>(r.cats||[]).indexOf('bathroom')>=0);if(typeof kidsMode!=='undefined'&&kidsMode)list=list.filter(r=>isFamilyFriendly(r));if(q)list=list.filter(function(r){return matchNeed(r,q);});if(sort==='az')list.sort((a,b)=>String(a.name||'').localeCompare(String(b.name||'')));else if(sort==='near'&&userLoc&&typeof userLoc.lat==='number'){list.forEach(r=>{r._d=distMi(userLoc.lat,userLoc.lng,r.lat,r.lng);});list.sort((a,b)=>a._d-b._d);}ptList=list;box.innerHTML=list.map((r,idx)=>ptRowHtml(r,idx)).join('')||(openNow?'<div style="text-align:center;padding:24px 20px;"><div style="color:#fff;font-weight:700;font-size:16px;margin-bottom:8px;">Nothing open right now</div><div style="color:#aaa;font-size:14px;margin-bottom:14px;line-height:1.5;">Most places are closed at this hour. If you need somewhere to go tonight:</div><button class="sheet-btn" onclick="openSafeTonight()" style="margin-bottom:8px;">Safe Tonight — shelters open now</button><br><a class="sheet-btn" href="tel:211">Call 211 for help</a></div>':'<div style="text-align:center;padding:24px 20px;"><div style="color:#fff;font-weight:700;font-size:16px;margin-bottom:8px;">No places found</div><div style="color:#aaa;font-size:14px;margin-bottom:14px;line-height:1.5;">Try a different word — or if you need help right now:</div><button class="sheet-btn" onclick="openSafeTonight()" style="margin-bottom:8px;">Safe Tonight — shelters open now</button><br><a class="sheet-btn" href="tel:211">Call 211 for help</a></div>');}
/* Profile tab (ported from the app's Profile tab) */
function renderProfile(){const box=document.getElementById('profile-body');if(!box)return;let nm='Guest';try{nm=chatName();}catch(e){}let favs=[];try{favs=JSON.parse(localStorage.getItem('haven_favs')||'[]');}catch(e){}let todos=[];try{todos=JSON.parse(localStorage.getItem('haven_todos')||'[]');}catch(e){}let ver=0;try{const all=JSON.parse(localStorage.getItem('haven_verify')||'{}');ver=Object.keys(all).filter(k=>all[k]&&all[k].mine).length;}catch(e){}let nPlaces=0;try{nPlaces=placesInArea().length;}catch(e){}let area='Fort Wayne';try{const as=document.getElementById('area-sub');if(as&&as.textContent)area=as.textContent;}catch(e){}box.innerHTML=`<div class="card"><div style="display:flex;align-items:center;gap:14px;"><div style="width:56px;height:56px;flex:none;border-radius:50%;background:#2a3040;display:flex;align-items:center;justify-content:center;font-size:28px;">👤</div><div style="min-width:0;"><div style="color:#fff;font-size:20px;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(nm)}</div><div style="color:#888;font-size:13px;">Web visitor · ${escapeHtml(area)}</div></div></div><div class="meta" style="margin-top:12px;"><button class="sheet-btn" onclick="editProfName()">✏️ Edit name</button></div></div><div class="card"><h3>📊 Stats</h3><div class="meta"><span class="badge">⭐ ${favs.length} saved</span><span class="badge">📋 ${todos.length} to-dos</span><span class="badge">✓ ${ver} verified</span><span class="badge">📍 ${nPlaces} places nearby</span></div></div><div class="card"><h3>🔗 Quick links</h3><div class="meta"><button class="sheet-btn" onclick="goTab('saved')">⭐ Saved</button><button class="sheet-btn" onclick="goTab('settings')">⚙️ Settings</button><button class="sheet-btn" onclick="goTab('help')">🆘 Help</button></div></div>`;}
function editProfName(){let cur='';try{cur=chatName();}catch(e){}const v=prompt('Display name:',cur);if(v==null)return;const nv=String(v).trim().slice(0,40)||cur;try{localStorage.setItem('haven_chatname',nv);}catch(e){}renderProfile();}

/* ===== pins.js ===== */
/* Haven FW website — My pins (feature #28): mark your own spots on the map.
   Ported from the Android app's more-features.js ("My pins"). Everything stays on
   this device in localStorage 'haven_pins' (same key as the app). */
(function () {
  "use strict";
  var KEY = "haven_pins";
  var PIN_TYPES = [
    ["safe", "🛡️", "Safe spot", "#34d399"],
    ["shower", "🚿", "Shower", "#b48cf2"],
    ["laundry", "🧺", "Laundry", "#93c5fd"],
    ["sleep", "🛏️", "Sleep spot", "#fb923c"],
    ["water", "💧", "Water", "#38bdf8"],
    ["charge", "🔌", "Charging", "#facc15"],
    ["other", "⭐", "Other", "#f472b6"]
  ];
  function pinT(k) { for (var i = 0; i < PIN_TYPES.length; i++) if (PIN_TYPES[i][0] === k) return PIN_TYPES[i]; return PIN_TYPES[6]; }
  function pins() { try { var p = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(p) ? p : []; } catch (e) { return []; } }
  function savePins(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) {} }
  function esc(s) { return typeof escapeHtml === "function" ? escapeHtml(s) : String(s == null ? "" : s); }
  function escA(s) { return typeof escapeAttr === "function" ? escapeAttr(s) : String(s == null ? "" : s); }
  function toast(m) { if (typeof miniToast === "function") miniToast(m); }

  /* ---------- map layer ---------- */
  var pinLayer = null;
  function drawPins() {
    if (typeof L === "undefined" || typeof map === "undefined" || !map) return;
    try {
      if (pinLayer) { try { map.removeLayer(pinLayer); } catch (e) {} pinLayer = null; }
      pinLayer = L.layerGroup().addTo(map);
      pins().forEach(function (p) {
        if (typeof p.lat !== "number" || typeof p.lng !== "number" || isNaN(p.lat) || isNaN(p.lng)) return;
        var pt = pinT(p.type);
        L.marker([p.lat, p.lng], {
          icon: L.divIcon({ className: "", html: '<div class="mypin" style="background:' + pt[3] + '">' + pt[1] + "</div>", iconSize: [34, 34], iconAnchor: [17, 17] }),
          zIndexOffset: 900
        }).on("click", function () { pinDetail(p.id); }).addTo(pinLayer);
      });
    } catch (e) {}
  }

  /* ---------- overlay dialog ---------- */
  function closePinOv() { var o = document.getElementById("pinOv"); if (o) o.remove(); }
  function pinOv(html) {
    closePinOv();
    var ov = document.createElement("div");
    ov.id = "pinOv"; ov.className = "pin-ov";
    ov.innerHTML = '<div class="pin-card">' + html + "</div>";
    ov.addEventListener("click", function (e) { if (e.target === ov) closePinOv(); });
    document.body.appendChild(ov);
    return ov;
  }

  /* ---------- add a pin ---------- */
  function addPin(lat, lng) {
    if (typeof lat !== "number" || typeof lng !== "number" || isNaN(lat) || isNaN(lng)) return;
    var type = "safe";
    var ov = pinOv(
      "<h2 style=\"color:#fff;margin:0 0 8px;\">📌 New pin</h2>" +
      "<p style=\"color:#888;font-size:14px;margin:0 0 12px;\">Mark your own spot. It is saved only on this device. You can share it later.</p>" +
      "<input id=\"pnName\" maxlength=\"40\" placeholder=\"Name\" autocomplete=\"off\" aria-label=\"Pin name\" style=\"width:100%;padding:10px;border:1px solid #333;border-radius:8px;background:#0f1420;color:#fff;font-size:15px;box-sizing:border-box;\">" +
      "<div id=\"pnTypes\" style=\"display:flex;flex-wrap:wrap;gap:6px;margin:12px 0;\"></div>" +
      "<textarea id=\"pnNote\" maxlength=\"200\" placeholder=\"Note (optional)\" aria-label=\"Pin note\" style=\"width:100%;padding:10px;border:1px solid #333;border-radius:8px;background:#0f1420;color:#fff;font-size:14px;min-height:56px;box-sizing:border-box;\"></textarea>" +
      "<div style=\"display:flex;gap:8px;margin-top:12px;\">" +
      "<button id=\"pnSave\" style=\"flex:1;padding:12px;background:#7c8aff;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:bold;cursor:pointer;\">💾 Save pin</button>" +
      "<button id=\"pnX\" style=\"padding:12px 18px;background:#2a2f3e;color:#fff;border:1px solid #444;border-radius:10px;font-size:15px;cursor:pointer;\">✕</button></div>"
    );
    var draw = function () {
      ov.querySelector("#pnTypes").innerHTML = PIN_TYPES.map(function (t) {
        return '<button data-k="' + t[0] + '" style="padding:8px 12px;border-radius:14px;border:1px solid ' + (type === t[0] ? "#7c8aff" : "#444") + ";background:" + (type === t[0] ? "#2a2440" : "#1a1f2e") + ';color:#fff;font-size:14px;cursor:pointer;">' + t[1] + " " + esc(t[2]) + "</button>";
      }).join("");
      ov.querySelectorAll("#pnTypes [data-k]").forEach(function (b) {
        b.onclick = function () { type = b.dataset.k; draw(); };
      });
    };
    draw();
    ov.querySelector("#pnX").onclick = closePinOv;
    ov.querySelector("#pnSave").onclick = function () {
      var name = ov.querySelector("#pnName").value.trim() || pinT(type)[2];
      var note = ov.querySelector("#pnNote").value.trim();
      var a = pins();
      a.push({ id: "p" + Date.now().toString(36), name: name, type: type, note: note, lat: lat, lng: lng });
      savePins(a); closePinOv(); drawPins(); renderPinsList();
      toast("Pin saved 📌");
    };
    var nm = ov.querySelector("#pnName"); if (nm) nm.focus();
  }
  function pinHere() {
    var c = null;
    if (typeof userLoc !== "undefined" && userLoc && typeof userLoc.lat === "number") c = [userLoc.lat, userLoc.lng];
    else if (typeof map !== "undefined" && map) { try { var z = map.getCenter(); c = [z.lat, z.lng]; } catch (e) {} }
    if (!c) { toast("Map is not ready yet — try again in a moment."); return; }
    addPin(c[0], c[1]);
  }

  /* ---------- pin detail ---------- */
  function sharePin(p) {
    var pt = pinT(p.type);
    var txt = "📌 " + p.name + " (" + pt[2] + ")" + (p.note ? " - " + p.note : "") + "\nhttps://www.google.com/maps/search/?api=1&query=" + p.lat + "," + p.lng;
    if (navigator.share) { navigator.share({ text: txt }).catch(function () {}); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { toast("Copied! 📋"); }, function () { prompt("Copy:", txt); });
      return;
    }
    prompt("Copy:", txt);
  }
  function pinDetail(id) {
    var p = pins().filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var pt = pinT(p.type);
    var ov = pinOv(
      "<h2 style=\"color:#fff;margin:0 0 4px;\">" + pt[1] + " " + esc(p.name) + "</h2>" +
      "<p style=\"color:#888;font-size:13px;margin:0 0 12px;\">" + esc(pt[2]) + " · Only you see this pin</p>" +
      (p.note ? "<p style=\"color:#e0e0e0;background:#232a3d;border-radius:8px;padding:10px;font-size:14px;\">" + esc(p.note) + "</p>" : "") +
      '<a href="https://www.google.com/maps/search/?api=1&query=' + p.lat + "," + p.lng + '" target="_blank" rel="noopener" style="display:block;text-align:center;padding:12px;background:#7c8aff;color:#fff;border-radius:10px;text-decoration:none;font-weight:bold;margin-bottom:8px;">🧭 Directions</a>' +
      '<button id="pnShare" style="width:100%;padding:12px;background:#2a2f3e;color:#fff;border:1px solid #444;border-radius:10px;font-size:15px;cursor:pointer;margin-bottom:8px;">📤 Share with someone I trust</button>' +
      '<button id="pnDel" style="width:100%;padding:12px;background:#2a2f3e;color:#ff8a8a;border:1px solid #5a2a2a;border-radius:10px;font-size:15px;cursor:pointer;margin-bottom:8px;">🗑️ Delete pin</button>' +
      '<button id="pnX" style="width:100%;padding:12px;background:transparent;color:#888;border:none;font-size:15px;cursor:pointer;">✕ Close</button>'
    );
    ov.querySelector("#pnX").onclick = closePinOv;
    ov.querySelector("#pnShare").onclick = function () { sharePin(p); };
    ov.querySelector("#pnDel").onclick = function () {
      if (!confirm("Delete this pin?")) return;
      savePins(pins().filter(function (x) { return x.id !== id; }));
      closePinOv(); drawPins(); renderPinsList();
      toast("Pin deleted");
    };
  }

  /* ---------- Saved tab list ---------- */
  function renderPinsList() {
    var el = document.getElementById("pins-list");
    if (!el) return;
    var list = pins();
    el.innerHTML = list.map(function (p) {
      var pt = pinT(p.type);
      return '<div class="card" style="display:flex;gap:10px;align-items:center;">' +
        '<div style="width:38px;height:38px;flex:none;border-radius:50%;background:' + pt[3] + ";border:2px dashed #fff;display:flex;align-items:center;justify-content:center;font-size:18px;\">" + pt[1] + "</div>" +
        '<div style="flex:1;min-width:0;"><div style="color:#fff;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(p.name) + '</div><div style="color:#888;font-size:12px;">' + esc(pt[2]) + (p.note ? " · " + esc(p.note.substring(0, 60)) : "") + "</div></div>" +
        '<a href="https://www.google.com/maps/search/?api=1&query=' + p.lat + "," + p.lng + '" target="_blank" rel="noopener" aria-label="Directions" style="font-size:20px;text-decoration:none;">🧭</a>' +
        "<button onclick=\"window._pinShareById('" + escA(p.id) + '\')" aria-label="Share pin" style="background:none;border:none;font-size:20px;cursor:pointer;">📤</button>' +
        "<button onclick=\"window._pinDelById('" + escA(p.id) + '\')" aria-label="Delete pin" style="background:none;border:none;font-size:18px;cursor:pointer;">🗑️</button></div>';
    }).join("") || '<p style="color:#888">No pins yet — tap 📌 on the map to mark your own spot.</p>';
  }
  window._pinShareById = function (id) { var p = pins().filter(function (x) { return x.id === id; })[0]; if (p) sharePin(p); };
  window._pinDelById = function (id) {
    if (!confirm("Delete this pin?")) return;
    savePins(pins().filter(function (x) { return x.id !== id; }));
    drawPins(); renderPinsList();
    toast("Pin deleted");
  };

  /* ---------- boot: wait for the map, then wire up ---------- */
  function boot() {
    if (typeof L === "undefined" || typeof map === "undefined" || !map) { setTimeout(boot, 400); return; }
    var wrap = document.getElementById("map-wrap");
    if (wrap && !document.getElementById("pinBtn")) {
      var b = document.createElement("button");
      b.id = "pinBtn"; b.className = "pin-fab"; b.setAttribute("aria-label", "Drop a pin at the map center"); b.textContent = "📌";
      b.onclick = function () { pinHere(); };
      wrap.appendChild(b);
    }
    try { map.on("contextmenu", function (e) { addPin(e.latlng.lat, e.latlng.lng); }); } catch (e) {}
    drawPins();
    try {
      if (typeof renderFavs === "function" && !renderFavs._pinsWrapped) {
        var _rf = renderFavs;
        renderFavs = function () { _rf(); renderPinsList(); };
        renderFavs._pinsWrapped = true;
      }
    } catch (e) {}
    renderPinsList();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  /* exposed for tests/debugging */
  window._pinsApi = { KEY: KEY, pins: pins, savePins: savePins, pinT: pinT, drawPins: drawPins, renderPinsList: renderPinsList, addPin: addPin, pinDetail: pinDetail, pinHere: pinHere };
})();

/* ===== busstops.js ===== */
/* Haven FW bus stops: every Citilink bus stop (746) with the route each one takes. Built in, works offline.
   Source: Citilink official GTFS feed (fwcitilink.com), updated Sep 1, 2026, service through Dec 31, 2026.
   routes: [short, long, color]  shapes: [routeIdx, encodedPolyline, towardStop, lengthMeters]
   stops: [lat, lng, name, stopId, [routeIdx], wheelchair 1/0/-1, [[shapeIdx, fractionAlongShape]]] */
"use strict";
(function () {
  var DATA = {"routes":[["1N","Northcrest","#db225d"],["1W","Waynedale","#db225d"],["21","Medlink","#b17a1e"],["2G","Georgetown","#5ea63d"],["3C","Canterbury via PFW","#21a9a0"],["4P","Parkview","#f2581d"],["6S","Southeast","#aa8100"],["8C","Calhoun / Southtown","#172e53"],["1SS","Social Security","#db225d"],["2TC","Time Corners","#5ea63d"],["3VW","Village Woods","#21a9a0"],["4WL","Wells / Ludwig","#f2581d"],["6FP","Franke Park","#aa8100"],["8GN","Glenbrook / Northrop","#172e53"],["9BT","Brooklyn / Taylor","#600439"],["9SF","St. Francis / Gateway","#600439"],["10NH","New Haven","#29a35b"],["1ARC","River Cove","#db225d"],["22JL","West Jefferson / Lutheran Hospital","#c9203d"],["7ANT","Anthony","#1b89ca"]],"shapes":[[0,"}|`zFtunfOjAA?vLVbSGbBJP@~BEpHzL|G`RfNvErB`Ft@~V_@lCVhCt@[hCnBrSlDw@EoGu@cDq@oAq@a@uBFG}@x@aD`@k@dAc@rBK~aAiAtg@l`@lD~A|BZzg@w@t@_@p@aCtAiCrM_CxL}CtC]lE~@tIfFnDfAz@f@jEnEnE|KbAf@LXtCr\\~`@iH~KSBxHdEG?bC","Central Station - Bay D",9416],[0,"}|`zFtunfOjAA?vLVbSGbBJP@~BEpHzL|G`RfNvErB`Ft@~V_@lCVhCt@[hCnBrSlDw@EoGu@cDq@oAq@a@uBFG}@x@aD`@k@dAc@rBK~aAiAtg@l`@lD~A|BZ|g@w@r@_@p@aCtAiCrM_CxL}CtC]lE~@tIfFnDfAz@f@jEnEnE|KbAf@LXtCr\\~`@iH~KSBxHdEG?|B","Central Station - Bay D",9413],[0,"sztyFdysfOKXiAL?wGmP\\Kqi@ee@tIi@Ci@_@kD}IuF{FqCsAyA[uIgFmE_AuC\\yL|CsM~BuAhCq@`Cs@^}g@v@}B[mD_Bch@w`@_MC{r@z@mCP}@`@cAzA[~AnB|TlDw@EoGu@cDiAgBoCAG}@x@aDqDgA{FQB_Cn@eGROb@\\d@EPa@Gy@gBrA{@|GGfB}P\\gDWgEiA}Ay@uRsNkDwBqOuH[gl@lDE","Colony and Campus",10261],[9,"oyryFdlcgOy}@A","Meijer Getz Rd",1118],[9,"oztyFptsfOCdDuAT?wGmP\\{KrBvPlpBfF|L~DzEd@hAd@hCZ~O]pFsI|^gEtWKjBFlAjC`Jl@bD@fCq@jJHJrf@ANff@jB~DhGjKy^BoEQcQLBbXIZAdJJ~a@zFA|E[xBs@fBsAxFaIpFiGbZnj@xGlPlEvPlEnZtEbS@nA?xE_iA?","Meijer Getz Rd",12226],[9,"ixtyFblcgO_GI_INSwlALoHA_XlFAvE[xBs@De@QPzAbF@pDr@@BxDR`@nCE{CuE_AAAqDoAoEfBsAxFaI`G}GuYmk@KcAXWfBGdTNjS]iGkKkB_EOgf@aWF}MC]Mr@iMU}BoCgLKuAJiDxEcZtH}[TqF_@kSt@gJUkCg@_B}AyBaEcE_@aA}JwjAnRIGaa@zAGEtE","Central Station - Bay N",10759],[9,"gxtyFblcgOaGI_INSwlALoHA_XfFA|E[xBs@nAnE@nDr@BBxDR`@nCE{CuE_ACAoDoAoEfBsAxFaI`G}GuYmk@KcAXWfBGdTNjS]iGkKkB_EOgf@aWF}MC]Mr@iMU}BoCgLKuAJiDxEcZtH}[TqF_@kSt@gJUkCg@_Bk@aAgGyGeAqK","West Jefferson at College (EB)",8885],[3,"ei~yFvfefOfB~hAJzWdw@uA~jAcDnJEdBW|a@u@h@jo@If@DpF~BxjBt@jfA`@bDrEbVd[~u@jEnEnE|KbAf@LXtCr\\~`@iH~KSBxHhFKAbB","Central Station - Bay Q",11007],[3,"sztyFbxsfO?r@uAT?wGmP\\Kqi@ee@tIiAUcEmKkAsK{Uek@aC_IYg@wEiDy@FmC}Ou@kfA{AypAG_ZWyFi@ko@ql@dAO_DmAy_AUsDiCsTgAaIuAmFyO}YeClCe@~@JzNm}AvEqJFXpT","Northwood Plaza",12045],[4,"s{tyF~wsfO?~@mC~@yLT}Dn@eE_g@cn@~KqKiBaJkEi\\TmBt@iEzE}HjD_AuH{AmzBwi@v@uEM_BDMNaBMgDFa@PkSNoFs@uKyDaEiDYk@Ao@x@gEhAiRl@aD@s@Oc@yAoA]}Aw@mAk@A{Br@kAYyDgCWYWoAk@Yg@LWl@?h@\\p@JnAWxAa@LMZD~A~@f@t@wACc@gAu@b@}B~@oABq@Mg@_@WqAJqA_@sBmAyEiGqKwEs@qAKgAt@_FE{D}KFYNqc@pAKj@D~D","Roebuck at St. Joe",10402],[4,"yc`zFhllfOCdCTt@bBr@jCjD\\fBPfLTx@n@b@rEXfAMtAw@nATxBKj@WjAiBzCaBb@oA@qAw@gDIeCi@mBK{BBiAf@gCIuDXL~KGB|CO~@_BjDxBlCpKvExEhGtC`Bh@l@RjATZJnAWxAi@TI|Ap@z@`@Cj@qACc@gAu@b@}B~@oABq@OaA^kE`AgCvWbXTjA[hCcIr_@`ExChKjDvEh@`JO~@QvVMtl@eAfAjyAlVq@|K{BxL}CtC]lE~@tIfFxAZpCrAjEnEnE|KbAf@LXtCr\\~`@iH~KSBbEi@xB?dI~AClC_A?_B","Central Station - Bay K",11120],[10,"icmyFvykfOGaOkr@j@\\tQN`i@hFGn@t{@T~dBaeAzAFzjAcwAlB[al@wo@dAApE","Central Station - Bay B",9656],[10,"s{tyF~vsfO@mDvo@eAZ`l@|_EmFhBObRgH~Dk@K}b@niAmA@cIq@wSK{[eW\\|ImSyGJ?cArBO?{BK]eBHAbFbFG{IjS{_A~@UosAo@qHcAmtA","Hessen Cassel Library",13393],[10,"icmyFxykfOGcOgr@j@h@v{@hFGn@t{@T~dBaeAzAFzjAcwAlB[al@wo@dAAnE","Central Station - Bay B",9656],[11,"qztyFzvsfOAzAuATFhXeSDoSrDmA`@gBjAqBbC{AbAuAByAl@oCC}@SiFaCkBa@wp@`@em@vGacAnCgA[]s@_AuLiAuFoOdLaNpLkQdMk]bXg^rVsOdJ{CpAiBd@iQ~BOt@d@|K?jS~CItAu@pC_D|A[~CMzBoAz@IBd|@lAxmB","Washington Center Huguenard",11551],[11,"oq`zFze~fOel@S_AarBKgh@tIIz@MzBqArF]tAu@pC_D|A[~CMzBoAz@ICse@KWe@ylA|CbAbDhDxAv@~@Nv]g@R~c@zA~Efk@ec@~BsAp[eCjnAkDdm@wGvp@a@jB`@lCjBvAh@lATdDF`AVtAk@xGy@vVuEzJ?xBv@bCACok@v@CAdD","Central Station - Bay C",13508],[5,"c{~yFxdkfO[h@DnCz@CGwE|EQRfPb@dEF|F`o@kBvfB}DdAfpAjl@iAThWh`AyAnAjxA`Gjt@lMyB~KSBxHhFKCnD","Central Station - Bay O",9619],[5,"s{tyFvvsfO?fBu@L?wGm@?_O\\mRhDyHo~@kAkyAyy@lAUiWkl@hAcC{pCeXr@kCXoGfBqF|C~@lw@ulAzCs[`@E_Fc@eESgP}EPy@jABbB","Harshman Hall",11189],[11,"oq`zFze~fOel@SkAi{CtIIz@MzBqA|AS","Cross Creek @ Kelsey Ct.",3253],[12,"gpyyF|`wfOQBG}MkOR_@OSk@[GeBbA_YF}Ag@cFoE}DqCgDcB}Bu@qBWoEVsBfAy@r@e@`Aa@bC?tF]d@yk@t@LrIHvz@qD?Ec_@YaAq@OgHL^dEDx[cN?Me^}@gFk@kAsMnO_AhBe@pD@jL","Profit at Executive (WB)",6570],[6,"wxjyF~agfOlLcGDb@rAhlCimA^ufBdBvAz}Av@lF@hAL~c@Cds@avBlDK?WgAi@Kc@b@Cp@iW^FpWjAhDC~\\kPZ?~A","Central Station - Bay E",11852],[6,"q{tyFvusfO?eCjP[B_]kAiDGqWfZ_@JAO{@q@Wc@b@Cp@rGEHfM`Ra@|NF~`@w@MkFEy{Ay@qFQm^oAqeAjCA^eAbFkF~HaHfKgH|B}@fEm@Nf]|yAyAu@k{@Ckj@vTkE~Y{IxXmLtJkF","Wayne Trace at Wayne Park (SB)",12146],[12,"{m_zFl{xfO@rAft@GO]Kq_ALc@?sC~j@w@\\e@?uFn@aDfCcCtAa@vEM~EpAvCzA|DpCbFnE|Af@~NBpKY\\XpQ_@F|MjcAmAfPCC_OfA_@z@{@fC_HbCuAeDePQmBB{BPe@tAe@lG{@{Ca]D[i@}G~^uGtJU?dI~AClC_A@iC","Central Station - Bay J",9097],[12,"q{tyFntsfOAnDu@L?wGm@?_O\\s_@zGnDh_@mEjEeAf@aAA]f@Pp@BnCX`CrC~NQx@}@`@k@n@mCdHkAz@g@HB~NgPBkcAlAG}MkOR_@OSk@[GeBbA_YF}Ag@cFoEeIeFoFyAwELuA`@gCbCo@`D?tF]d@yk@t@LrIHvz@qD?Ec_@YaAq@OgHL^dEDx[cN?Me^}@gFk@kAsMnO_AhBe@pD@fL","Profit at Executive (WB)",10801],[19,"q{tyFjrsfO?Yb@CfOWB_]kAiDGoWfZa@JAO{@q@Wc@b@Cp@jFEw@}z@[iAKeZvxGwJrVOzCkHbA}AvC{CbOqJdAc@p@Aq@@eAb@cOpJwCzCcA|A{CjH~OOaNj[hDzCHQIPxHdH","Southtown Centre (SB)",11041],[19,"smiyFvwofOhEzDl@lAlCyC_@gBEiC_A}CGaR_@qAT_ACwHiXPzCkHrDuEjPuKdAc@p@Cq@BeAb@cOpJwCzCcA|A{CjHsVNe}FpIBrxAw[b@WgAi@Kc@b@Cr@qv@nAoADUPJnz@tJU?dIN?nAClC_A@{F","Central Station - Bay G",11997],[19,"wmiyFtwofOlE|Dl@lAlCyC_@gBEiC_A}CGaR_@qAT_ACwHiXPzCkHbA}AvC{CbOqJdAc@p@Cq@BeAb@cOpJwCzCcA|A{CjHsVNe}FpIBrxAw[b@WgAe@K","Hanna Creighton Transit Center",9508],[13,"eadzFhpsfOoO^AqGKY\\Lnr@uAbmA_B|J@bUe@XOfc@[|n@oAo@hFBjBV~Bp@bCi@^M^AlC{EH_@t@`E`Lv@}@JsDlBACaBg@}BCkDgAqEQkCl@kFz@_AxENtDhAbNpLbJxIN`@zBmBrCcBz@UdGe@rMWfI`@~EbClNdFzAXpADtIcBhIIxAPvEtAtJGfMgBx}@kPnK_@jAABbEi@xB?dI~AClC_A@yE","Central Station - Bay H",11332],[13,"s{tyFbysfO?ZmC~@yLT}Dn@eE_g@cn@~KqKiBaJkEi\\TkBr@kE|E}C|AaTfIaCT}KBuLb@oNOsCY}DaAPc@AiCp@JEi@i@AMpCQl@cNqLYk@iEgA_F?w@bG@`APjCx@`Di@^M^AlC{EHYVE\\`E`Lv@}@JsDlBACaBg@}BGaEcA{DQmC}JsB@gDKU}p@hA{ADSNoHAuCRuBIwy@t@yNiCeDMoGp@}L|Co]p@BxHkNX","Westfield",10971],[7,"umiyFvwofOjEzDl@lAlCyCvD|Gh@bFdC@fBl@nAJbBvAjFhB|@|@zA`EOXLh@gBhCiC|AkDr@eu@n@IwZJo@?_D]me@iCHgAXcj@d_@iC~CaEfIuBpCcYfRT`~@k[h@LyDU[c@XDbCf@?Av@{cApAyyC`Fc@BAnF","Central Station - Bay A",10883],[7,"q{tyFrssfO?aAb@CxyCaFzcAqALyDU[c@XDbCf@?Av@j[i@Ua~@bYgRtBqC`EgIhC_Djb@sYjHgE|CM@t\\nH_QdMdL","Southtown Centre (SB)",8503],[14,"u~nyFpf_gOXAIqIy@eCm@g@g@UiRRA}b@|rAeCgCoZqH_n@q^aS}DsF","Sandpoint at Allegany",4398],[15,"uy{yFnsyfOa[r`@vH`Mn@`@pGrA|@|@b@rA`@dr@n@pEJl\\mp@Xo@eAyAo@mAgAu@{A_@oBa@_o@PgI?eKo@i`AnZ]","West Wind Apartments (SB)",5814],[14,"munyFbhzfOiFyHcAsCgCqQgSGTpo@sURgKsFgCWgE?Sax@gl@hBom@CK}\\TeHYktAg[ZCok@zAGAbC","Central Station - Bay P",7642],[14,"q{tyFvtsfO?eBlUc@Fd\\Il@?hMfCAXjtAUdHJ|\\nm@Bfl@iBR`x@fE?fCVfKrFrUSX`wBIbWhWc@IqIy@eCm@g@g@UiRRA}b@|rAeCgCoZqH_n@q^aS}DsF","Sandpoint at Allegany",12776],[15,"k}|yFlnyfO~d@YhAJnO{Rx@sAfBqEd@XZbB~k@g@JpW~k@s@JzW|JA`AQt@o@zDeGvCkChBw@rNo@?f@d@NVS?e@~KW|AcE_@slA`AaPkFao@bCgAnSsDdSEGiXt@M@kD","Central Station - Bay I",8087],[15,"oztyFnusfOCfCuATFhXeSDoSrDcCfAjF`o@aA`P^rlA}AbEq]hAiBv@wCjC{DdGu@n@aAP}J@K{W_l@r@KqW_l@f@MkBP[Cq@Pg@`Am@dBCAyCcAJ_@a@{@hBqCtIiBjDep@~y@vH`Mn@`@pGrA|@|@b@rA`@dr@n@pEJl\\mp@Xo@eAyAo@mAgAkA{CM}B[wf@PgVq@ieAnZ]","West Wind Apartments (SB)",13673],[16,"}ttyFtyzeO?wB`C@V~U^x_Bb@bc@SxQn@n]Vx\\|@p{AMXEpCDdC`@dD^~d@jA|eD~@l`AuEpOyF|NoZb@Yf{AN~x@dRa@?n@","Central Station - Bay F",11728],[16,"q{tyF~rsfOA~EmC~@qGLEgI}DLO_y@Xg{A|[_@FgBbEyKtEqO_Am`As@obCw@irAWwFqAktBDiJzA@?oJaBQ@sFaAsw@_@y_BOoNgCBA_F","Hartzell St./Green St.",11999],[18,"elmyFhckgOUe@dAiAqAaFzCs@CcAZyAZc@fBcAmGoPkIuWuFsLqF_JoGeIgl@oi@w]a^yE{FoIoN}\\at@qpABUACuBd@C?n@nA?","Meijer Getz Rd",6316],[18,"ixtyFticgOp@C@i@_D@BtBhpAAx]zu@|HnMjGjHh\\r\\`l@li@`GnHqCbDM|@ClN^HEcGaDHkEvAcF^yAtAeAnDqF{BoCe@aDIJro@~H?rHaAnKCpFgBjE?zCfAlArAb@bAvBfLvC~FfBlBd@\\jATfCk@OaDmAqC","Village at Coventry Kroger",8469],[18,"yknyFtaigO?`@^HEcGaDHkEvAcF^yAtAeAnDqF{BoCe@aDIJro@~H?rHaAnKCpFgBjE?zCfAlArAb@bAvBfLvC~FfBlBd@\\jATfCk@OaDmAqC","Village at Coventry Kroger",3304],[5,"k{~yFfekfOSZDnCz@CGwE|EQRfPb@dEF|F`o@kBvfB}DdAfpAjl@iAThWh`AyAnAjxA`Gjt@lMyB~KSBxHhFKCnD","Central Station - Bay O",9601],[5,"s{tyFvvsfO?fBu@L?wGm@?_O\\mRhDyHo~@kAkyAyy@lAUiWkl@hAcC{pCeXr@kCXoGfBqF|C~@lw@ulAzCs[`@E_Fc@eESgP}EPy@jAB|A","Harshman Hall",11186],[11,"oq`zFze~fOel@S_AarBKgh@tIIz@MzBqArF]tAu@pC_D|A[~CMzBoAz@ICse@KWe@ylA|CbAbDhDxAv@~@Nv]g@R~c@zA~Efk@ec@~BsAp[eCjnAkDdm@wGvp@a@jB`@lCjBvAh@xHt@TQFi@M[]GQHKj@Pb@XDjBm@dCUpZwFzJ?xBv@bCACok@v@CAdD","Central Station - Bay C",13630],[17,"i{czF|umfO[p@?|Bv@fCFdH{@dElTfLdtAnp@xZdTnBp@`Ft@~V_@lCVhCt@[hCnBrSlDw@EoGu@cDq@oAq@a@uBFG}@x@aD`@k@dAc@rBK~aAiAtg@l`@lD~A|BZ|g@w@r@_@p@aCtAiCrM_CxL}CtC]lE~@tIfFnDfAz@f@jEnEnE|KbAf@LXtCr\\~`@iH~KSBxHdEG?|B","Central Station - Bay D",10963],[17,"sztyFdysfOKXiAL?wGmP\\Kqi@ee@tIi@Ci@_@kD}IuF{FqCsAyA[uIgFmE_AuC\\yL|CsM~BuAhCq@`Cs@^}g@v@}B[mD_Bch@w`@_MC{r@z@mCP}@`@cAzA[~AnB|TlDw@EoGu@cDiAgBoCAG}@x@aDqDgAuCQsT\\wAIyDm@}Ai@mEmCqTwO}aByx@}FeDn@}BCgEIoCq@cBAoCt@uAV\\Xc@W]kAjB","River Cove (WB)",11303],[2,"yhkzFjdlfObIGf@Ql@aAHyFcFD[Im@{@eBwG}AkDKiHQe@t`@k@rPNb@xn@d@`C@bJWhBbBh_CInF~AhfCp@pnBvNI@rC_@XgFFi@]_CA?jGCLm@?BcL~jD{CrHw@pJcB~j@oLX|_@tIIz@MzBqArAS?kAy@FE_H?Y|@C","Meijer on Center Rd",14014],[2,"aoazF~xxfO^A@iGL_AEoD]cF_RdCgk@jLcCacDs^x@AqGKYo^t@iD[oF_C_JuG_FgE_EwBoJgBaLu@_E_AyCsAqH}EqBg@gCAuf@hD[q_@OaEi@{z@H{Da@{y@e@cDI}I`@iDMiToVn@@pDl@`ERfDMfCq@hAw@h@iFXsDrAuQh@wVNk@CiAcA[{AxAqL@oCfCo@`DEBtD`EECuDlFGbDPDvBVl@f@VnA@","PRMC Entrance 1",13073],[1,"{njyF~ryfOt`@GYtAm@j@}NlJp@lCfGvGdQf`@nA|A_@|Ae@XoDAE~PmFFAjCiAPiEpDaAH","Hickory Creek Apartments",2675],[1,"}ziyFjt|fOaHN[gAwQq_AE}NaPOiUyDeCq@_CaBoNyOe@}@GaBiDe@iOk@sIR}Iv@kV~C}Kd@yPU{Ds@}BiAmC{BaCqC}CmFuJu[u@oF?{HsK}Ay_@eV}BeAmo@j@k]e[s@]oKH_C_XnRIGaa@zAGEzF","Central Station - Bay M",9614],[1,"q{tyFrusfOAjCu@LFhXeSDmQ`D`C|WhOuCxNGl^z[jHDrOa@lUO|BdAx_@dV`IdA~@pA@lG`@zCxK|]|ClF`CpClEdDbCz@bCXjPR|Ke@l\\eEnNe@~GLjIp@nIzArc@vKvEv@fIZfl@IYtAm@j@}NlJp@lCfGvGdQf`@nA|A_@|Ae@XoDAE~PmFFAjCiAPiEpDcAH","Hickory Creek Apartments",11476],[1,"yziyFjt|fOeHN[gAwQq_AE}NaPOiUyDeCq@_CaBoNyOe@}@GaBiDe@iOk@sIR}Iv@kV~C}Kd@yPU{Ds@}BiAmC{BaCqC}CmFuJu[u@oF?{HsK}Ay_@eV}BeAmo@j@k]e[s@]oKH_C_XnRIGaa@zAGExF","Central Station - Bay M",9620],[8,"q{tyFvusfOAfCu@LFhXeSDmQ`D`C|WhOuCfNOr@\\|FzFlUhSjHDrOa@lUO|BdAx_@dV`IdA~@pA@lG`@zCxK|]|ClF`CpClCzB|BhAfCj@zBL`LNpHKhb@_FnNe@~GLjGb@pIvApe@hL~HfA~EJpv@Klh@]K}AeDuO[FEb@","Social Security Office",10644],[8,"a`hyFj_yfOATt@ErC|MJ|Awr@^YtAm@j@wN|IkB^ie@c@{VgEkD_BwLuM{BsCOi@AkAiDe@iOk@sIR}Iv@kV~C}Kd@yPU{Ds@}BiAmC{BaCqC}CmFuJu[u@oF?{HsK}Ay_@eV}BeAmo@j@k]e[s@]oKH_C_XnRIGaa@zAGEzF","Central Station - Bay M",10320],[13,"s`dzFhpsfOaP^AqGKY\\Lxt@yAxjA{A|J@bUe@XObc@[`o@oAo@hFBjBV~Bp@bCi@^M^AlC{EHYVCl@~@lC","Glenbrook Square",5481]],"stops":[[41.044987,-85.137209,"Calhoun after Seminole (SB)","882",[7],-1,[[30,0.3574]]],[41.051727,-85.113659,"Anthony at Grier (SB)","1094",[19],-1,[[24,0.4131]]],[41.111677,-85.154316,"Sherman Blvd at Villa Park Ct (SB)","1020",[12],-1,[[22,0.2884]]],[41.1154,-85.0611,"Maplecrest at Midfield","307",[3],-1,[[8,0.929]]],[41.0792,-85.1395,"Calhoun at Berry","721",[12],-1,[[23,0.0916]]],[41.0868,-85.1457,"Wells St. at Third St. (SB)","826",[11],-1,[[15,0.8265],[44,0.8188]]],[41.114102,-85.08056,"Reed at Beckstine (SB)","1227",[3],-1,[[7,0.1781]]],[41.069779,-85.050471,"Lincoln Hwy at Wayne Motel (WB)","v6m8",[16],-1,[[37,0.2927]]],[41.079886,-85.14652,"Fairfield at Pearl (SB)","433",[11,12],-1,[[15,0.885],[22,0.8091],[44,0.886]]],[41.103707,-85.129434,"Parnell at Vance","341",[0,17],-1,[[2,0.4406],[46,0.4001]]],[41.095997,-85.136651,"Spy Run at State","1218",[4,13],-1,[[9,0.3097],[28,0.2923]]],[41.079111,-85.132642,"Clay at Wayne","416",[0,3,17],-1,[[2,0.1459],[8,0.1254],[46,0.1325]]],[41.0646,-85.1379,"Calhoun near Creighton","1183",[7],-1,[[29,0.9142]]],[41.054292,-85.14488,"Fairfield at Kinsmoor (SB)","594",[10],-1,[[12,0.1972]]],[41.031687,-85.118718,"Paulding at Bowser","617",[10],-1,[[12,0.8711]]],[41.1288,-85.1244,"Gardenview Apartments","263",[0,17],-1,[[2,0.8626],[46,0.7394]]],[41.018129,-85.083527,"Tillman at Chadwick (WB)","1195",[6],-1,[[20,0.0963]]],[41.07207,-85.13862,"Central Station - Bay H","central-bay-H",[7,13],-1,[[27,0.9998],[30,0.0004]]],[41.058859,-85.130648,"Warsaw St. at Boltz St. (SB)","1041",[6],-1,[[21,0.2252]]],[41.017175,-85.1362,"Calhoun near Tillman (SB)","894",[10],-1,[[12,0.5433]]],[41.059089,-85.113949,"Anthony at McKee (SB)","1086",[19],-1,[[24,0.3391]]],[41.067838,-85.180784,"Freeman at Taylor (SB)","244",[9],-1,[[4,0.4228]]],[41.04245,-85.137107,"Calhoun at Sherwood","556",[7],-1,[[30,0.3905]]],[41.090288,-85.095538,"3327 Lake","316",[3],-1,[[7,0.5403]]],[41.098851,-85.065304,"5936 E State","286",[3],-1,[[8,0.7206]]],[41.0476,-85.1446,"Fairfield at Branning (SB)","599",[10],-1,[[12,0.2527]]],[41.058006,-85.137777,"Calhoun near Esmond","1179",[7],-1,[[29,0.8469],[30,0.1873]]],[41.039185,-85.18948,"Ardmore at 3 Oaks (SB)","1334",[14],-1,[[31,0.413],[34,0.7981]]],[41.08927,-85.114979,"Sunshine Cleaners","749",[5],-1,[[17,0.3528],[43,0.3529]]],[41.084191,-85.16932,"Leesburg after tracks (NB)","1248",[15],-1,[[36,0.2833]]],[41.124463,-85.165973,"Executive at Dividend (SB)","506",[12],-1,[[22,0.0252]]],[41.052038,-85.127783,"Hanna at Hamilton","994",[6],-1,[[20,0.7324]]],[41.1021,-85.1309,"Parnell at Kenwood (SB)","558",[0,17],-1,[[0,0.5628],[1,0.563],[45,0.6243]]],[41.0554,-85.1375,"Calhoun near Packard","844",[7],-1,[[29,0.8203]]],[41.096,-85.14,"Clinton after State","586",[13],-1,[[27,0.7267]]],[41.096583,-85.146457,"Wells / State","88",[11],-1,[[14,0.276]]],[41.136555,-85.167141,"Cross Creek @ Kelsey Ct.","89",[2,11],1,[[15,0.2405],[18,0.9954],[44,0.2382],[47,0.9828]]],[41.079622,-85.144864,"Main at Ewing (WB)","794",[12],-1,[[23,0.1436]]],[41.117197,-85.108198,"PFW Union","82",[4],-1,[[9,0.7981],[10,0.254]]],[41.042717,-85.167539,"Bluffton at Sandpoint (SB)","1252",[1,8],-1,[[51,0.5324],[53,0.5745]]],[41.128977,-85.124763,"Clinton before Gardenview Apartments","265",[0,17],-1,[[0,0.1362],[1,0.1362],[45,0.2573]]],[41.141,-85.1172,"Clinton at Red Haw","1015",[17],-1,[[45,0.1219]]],[41.104733,-85.060331,"Maplecrest at Alvarez","344",[3],-1,[[8,0.8306]]],[41.043058,-85.167264,"Bluffton at Sandpoint (NB)","206",[1,8],-1,[[50,0.4196],[52,0.4197],[54,0.459]]],[41.069128,-85.067632,"New Haven at Medford","224",[16],-1,[[38,0.59]]],[41.07218,-85.1388,"Central Station - Bay E","central-bay-E",[6,12],-1,[[20,0.9999],[23,0.0]]],[41.104927,-85.14739,"3126 Wells","724",[11],-1,[[14,0.3566]]],[41.049012,-85.175108,"Wenonah at Ojibway","150",[14],-1,[[33,0.2484]]],[41.103613,-85.147465,"Wells St. in front of Allen Co Juvenile Center (SB)","732",[11],-1,[[15,0.6876],[44,0.6812]]],[41.139224,-85.183617,"Ludwig past Hillside Oaks","987664",[11],0,[[15,0.1159]]],[41.102453,-85.138142,"Clinton before Dunwood","1225",[13],0,[[28,0.3599]]],[41.0678,-85.1558,"Taylor at Thompson (WB)","1315",[14],-1,[[34,0.1568]]],[41.07219,-85.13936,"Central Station - Bay B","central-bay-B",[4,10],-1,[[9,0.0],[11,0.9998],[13,0.9999]]],[41.070891,-85.180639,"Freeman at Portage","261",[9],-1,[[5,0.5751],[6,0.6917]]],[41.105232,-85.152712,"Franke Park NB","97",[12],-1,[[19,0.1956],[23,0.5109]]],[41.10622,-85.11573,"Lassus Anthony Blvd","572",[4],-1,[[9,0.5848]]],[41.074728,-85.198382,"Illinois / Apple Glen","70",[9],-1,[[4,0.6356]]],[41.073124,-85.14373,"Ewing at Brackenridge","465",[1,8],-1,[[51,0.0453],[53,0.0487]]],[41.075224,-85.121006,"Lewis at Ohio (WB)","208",[16],-1,[[37,0.8442]]],[41.085526,-85.114844,"Anthony at Cody (NB)","777",[5],-1,[[17,0.3157],[43,0.3158]]],[41.148979,-85.108359,"River Cove (WB)","80",[17],-1,[[45,0.0011],[46,0.9993]]],[41.064238,-85.143291,"Creighton near Hoagland","589",[10],-1,[[12,0.1035]]],[41.06876,-85.092228,"New Haven at Holly","186",[16],-1,[[38,0.4179]]],[41.053731,-85.107049,"Oxford at Autumn","521",[6],-1,[[21,0.4371]]],[41.073807,-85.15415,"West Jefferson at College (EB)","73",[9],-1,[[5,0.8296],[6,0.9998]]],[41.075534,-85.138727,"Calhoun at Lewis (SB)","496",[12],-1,[[22,0.9357]]],[41.0332,-85.1366,"Calhoun near Hawthorne","1174",[7],-1,[[29,0.5734]]],[41.146689,-85.160891,"Airport Office Park","987657",[2],1,[[48,0.1346]]],[41.074735,-85.191645,"Illinois Rd Past Hillegas","239",[9],-1,[[4,0.5891]]],[41.06925,-85.133586,"Wallace at Lafayette","955",[6,19],-1,[[20,0.9379],[21,0.062],[24,0.0641]]],[41.085669,-85.15592,"St. Mary's Ave. at Sinclair St. (SB)","1033",[12],-1,[[22,0.6543]]],[41.062297,-85.128184,"Hanna at Suttenfield","1126",[6,19],-1,[[20,0.8284],[25,0.7603],[26,0.9592]]],[41.050424,-85.113589,"Anthony at Rudisill (SB)","1095",[19],-1,[[24,0.4263]]],[41.1175,-85.183638,"Brandys and Best Inn","1292",[15],-1,[[32,0.6999],[36,0.8723]]],[41.027539,-85.095951,"Hessen Cassel at Castlewood","1197",[6],-1,[[20,0.275]]],[41.080677,-85.134897,"Lafayette at Main","473",[4,13],-1,[[9,0.1381],[28,0.1296]]],[41.121966,-85.152746,"Lima at Production (SB)","728",[11],-1,[[15,0.5292],[44,0.5243]]],[41.075295,-85.137075,"Clinton at Lewis (SB)","450",[0,4,5,13,17],-1,[[0,0.9421],[1,0.9424],[10,0.9369],[16,0.9394],[27,0.9337],[42,0.9393],[45,0.9504]]],[41.074369,-85.217128,"Meijer Express Illinois Rd","54",[9],-1,[[5,0.0476],[6,0.0577]]],[41.078565,-85.136955,"Wayne after Clinton","l3n8",[5],-1,[[17,0.0945],[43,0.0946]]],[41.096663,-85.123287,"State near Crescent","565",[4],-1,[[9,0.4217]]],[41.082837,-85.130106,"Columbia and Lafort","331",[3],-1,[[8,0.175]]],[41.101135,-85.059177,"Georgetown Square","76",[3],-1,[[8,0.7688]]],[41.116021,-85.099803,"Hobson at Timberhill","782",[5],-1,[[16,0.1437],[42,0.143]]],[41.082368,-85.155839,"St. Mary's Ave. at Burgess St (SB)","949",[12],-1,[[22,0.6946]]],[41.067729,-85.162432,"Taylor at Electric","1282",[14],-1,[[33,0.6536]]],[41.0156,-85.1107,"Southtown Mobile Home Park entrance northbound","900",[19],-1,[[24,0.8859],[25,0.2209],[26,0.2789]]],[41.067045,-85.187624,"Taylor at Portage School","260",[9],-1,[[5,0.4846],[6,0.5822]]],[41.033034,-85.13671,"Calhoun at Hawthorne (SB)","1237",[7],-1,[[30,0.5395]]],[41.08705,-85.124114,"Lake at Tecumseh","381",[3],-1,[[7,0.7648]]],[41.066256,-85.20155,"Jefferson at Woodridge","b51z",[9],-1,[[4,0.754]]],[41.080056,-85.118659,"Wayne at Hanover","775",[5],-1,[[17,0.2335],[43,0.2336]]],[41.04205,-85.113047,"Anthony at Capitol","912",[19],-1,[[25,0.4717],[26,0.5952]]],[41.085526,-85.11507,"Anthony at Cody (SB)","768",[5],-1,[[16,0.6388],[42,0.6385]]],[41.050323,-85.093639,"Wayne Trace at Diplomat Dr (SB)","986",[6],-1,[[21,0.5518]]],[41.045744,-85.132211,"Lafayette at McKinnie","654321",[10],0,[[11,0.5208],[13,0.5207]]],[41.0392,-85.1094,"Pettit at Plaza","639",[10],-1,[[11,0.2446],[13,0.2444]]],[41.030708,-85.112881,"Anthony and Paulding (SB)","1362",[19],-1,[[24,0.6246]]],[41.030372,-85.125595,"Decatur off Paulding","1239",[7],-1,[[30,0.6778]]],[41.032484,-85.090855,"Paulding at New Covenant (EB)","ghrx",[6],-1,[[21,0.788]]],[41.032124,-85.1058,"Paulding near Abbott","697",[10],-1,[[12,0.9526]]],[41.092976,-85.140054,"Clinton at Elizabeth (SB)","541",[13],-1,[[27,0.7567]]],[41.079278,-85.11476,"Anthony at Washington (SB)","792",[5],-1,[[16,0.7109],[42,0.7107]]],[41.096971,-85.108375,"State at Carew","778",[5],-1,[[17,0.4819],[43,0.482]]],[41.028817,-85.167167,"Waynedale BMV (SB)","10001000",[1,8],1,[[51,0.6687],[53,0.7215]]],[41.031731,-85.129806,"Paulding before Warsaw","919",[7],-1,[[29,0.5045]]],[41.096434,-85.131471,"State at Parnell","561",[4],-1,[[9,0.3553]]],[41.047066,-85.095339,"Diplomat Plaza","515",[6],-1,[[21,0.6101]]],[41.040294,-85.144338,"Fairfield at Maple Grove (SB)","604",[10],-1,[[12,0.3132]]],[41.063041,-85.145084,"Fairfield at Pierce (NB)","715",[10],-1,[[11,0.8257],[13,0.8257]]],[41.08088,-85.114667,"Anthony and Berry (NB)","9g4v",[5],-1,[[17,0.2696],[43,0.2697]]],[41.026302,-85.168098,"Star Bank","1270",[8],-1,[[53,0.7489]]],[41.0924,-85.156,"St. Mary's at Archer","1012",[12],-1,[[23,0.3561]]],[41.111296,-85.145976,"401 Fernhill","727",[11],-1,[[14,0.4287]]],[41.041869,-85.198104,"Clubview at Arden","108",[14],-1,[[31,0.0],[34,0.6561]]],[41.075174,-85.129248,"Lewis near Hanna","168",[16],-1,[[38,0.1123]]],[41.045127,-85.19825,"Clubview at Engle","gl8o",[14],-1,[[34,0.6278]]],[41.058943,-85.165249,"Brooklyn at Whitmore (SB)","1319",[14],-1,[[34,0.2954]]],[41.076207,-85.138205,"Cathedral/Diocesan Museum","123458",[4,13],1,[[9,0.0622],[28,0.0576]]],[41.061544,-85.211726,"Jefferson at North Bend","468",[9],-1,[[4,0.8369]]],[41.07515,-85.131801,"Lewis and Clay","438",[0,3,16,17],-1,[[2,0.1021],[8,0.0882],[38,0.0945],[46,0.0927]]],[41.034516,-85.112731,"Anthony Shopping Plaza","909",[19],-1,[[25,0.4019],[26,0.5072]]],[41.0317,-85.1356,"Bishop Luers (WB)","935",[7],-1,[[29,0.5494]]],[41.090131,-85.095554,"Lake near 3401","274",[3],-1,[[8,0.4389]]],[41.057035,-85.154098,"Broadway @ Wildwood (IB)","987682",[1,8],1,[[50,0.642],[52,0.6422],[54,0.6663]]],[41.087353,-85.171825,"St. Francis University","1284",[15],-1,[[36,0.3148]]],[41.079631,-85.138217,"Clinton at Berry (SB)","475",[0,3,4,13,17],-1,[[0,0.8899],[1,0.8902],[7,0.9055],[10,0.8927],[27,0.8901],[45,0.9056]]],[41.045022,-85.195279,"Engle Ridge at Engle","987674",[14],0,[[31,0.1262],[34,0.6995]]],[41.039,-85.1318,"Pettit before Lafayette","704",[10],-1,[[11,0.4399],[13,0.4398]]],[41.07219,-85.13954,"Central Station - Bay A","central-bay-A",[7,13],-1,[[28,0.0],[29,1.0]]],[41.132424,-85.176211,"Washington Center at Industrial","603",[11],-1,[[14,0.8792]]],[41.12892,-85.103177,"Canterbury Apts","683",[4],-1,[[10,0.0161]]],[41.078893,-85.134383,"Lafayette at Wayne","472",[4,13],-1,[[9,0.1186],[28,0.1111]]],[41.042337,-85.144424,"Fairfield at Sherwood Terrace (SB)","602",[10],-1,[[12,0.2963]]],[41.096774,-85.125377,"State near Kentucky","583",[4],-1,[[10,0.6427]]],[41.131308,-85.13568,"Coldwater at Stratton","1152",[13],-1,[[28,0.7983]]],[41.068622,-85.190102,"Autumn Creek (SB)","259",[9],-1,[[5,0.4298],[6,0.5159]]],[41.068934,-85.092012,"New Haven at Holly","194",[16],-1,[[37,0.5904]]],[41.05017,-85.135855,"Rudisill Plaza","11",[10],1,[[11,0.5999],[13,0.5999]]],[41.028603,-85.169057,"Prairie Grove Cemetery","733",[1,8],-1,[[50,0.2412],[52,0.2414],[54,0.2926]]],[41.068748,-85.099288,"New Haven at Edsall","197",[16],-1,[[37,0.6425]]],[41.103586,-85.06018,"Georgetown Blvd @ Maplecrest","987659",[3],1,[[8,0.8183]]],[41.078563,-85.151671,"Main at Jackson (WB)","936",[15],-1,[[36,0.1331]]],[41.095783,-85.168059,"Tyler at State","1285",[15],-1,[[36,0.4086]]],[41.069237,-85.070502,"New Haven near Sheridan","6rm5",[16],-1,[[37,0.4365]]],[41.033569,-85.180821,"Sandpoint at Arbor","138",[14],-1,[[31,0.7507],[34,0.9143]]],[41.105899,-85.116009,"Anthony before Crescent (SB)","579",[4],-1,[[10,0.4778]]],[41.088251,-85.121791,"Lake at California","326",[3],-1,[[7,0.7433]]],[41.070117,-85.016846,"Lincoln Hwy at Broadway","emk9",[16],-1,[[38,0.9537]]],[41.076982,-85.14415,"Allen County Library","425",[1,8,11,15],-1,[[14,0.082],[36,0.0706],[51,0.0828],[53,0.0892]]],[41.096072,-85.111681,"Parkview Hospital (Inbound)","95",[5],-1,[[16,0.4841],[42,0.4837]]],[41.093814,-85.11139,"St. Anne's Home","752",[5],-1,[[17,0.426],[43,0.4261]]],[41.139239,-85.179859,"Ludwig at Innovation Blvd","562",[11],-1,[[15,0.1394],[18,0.5769],[44,0.1381]]],[41.096039,-85.111447,"Parkview Randallia (Outbound)","92",[5],-1,[[17,0.4481],[43,0.4482]]],[41.113754,-85.140148,"Glenbrook Square","17",[13],-1,[[27,0.481],[28,0.5429],[55,0.9967]]],[41.070343,-85.016481,"Lincoln before Broadway","190",[16],-1,[[37,0.0494]]],[41.092548,-85.145856,"Wells St. past Archer Ave.","823",[11],-1,[[15,0.7791],[44,0.7719]]],[41.076529,-85.145604,"Fairfield at Washington (SB)","491",[11],-1,[[15,0.9131],[44,0.9139]]],[41.046591,-85.111745,"McKinnie near Euclid","976",[6],-1,[[20,0.5646]]],[41.038008,-85.096176,"Hessen Cassel at Heritage","628",[6,10],-1,[[11,0.0867],[13,0.0868],[20,0.3729]]],[41.075077,-85.114721,"Lewis at Anthony (EB)","113",[16],-1,[[38,0.2139]]],[41.077818,-85.139142,"IMP Center","494",[5,12],-1,[[17,0.0716],[23,0.0772],[43,0.0716]]],[41.036575,-85.166364,"Winchester Woods","657",[1,8],-1,[[51,0.5925],[53,0.6393]]],[41.033826,-85.258989,"Village at Coventry Kroger","43",[18],-1,[[39,0.0],[40,0.9998],[41,0.9995]]],[41.089989,-85.1002,"Lake at Maycrest","273",[3],-1,[[8,0.4064]]],[41.091049,-85.134446,"Spy Run past Riverside","674",[4,13],-1,[[9,0.2522],[28,0.2378]]],[41.079042,-85.133996,"Wayne near Barr","738",[5],-1,[[17,0.1173],[43,0.1173]]],[41.0641,-85.143,"Creighton and Hoagland","717",[10],-1,[[11,0.8575],[13,0.8575]]],[41.147484,-85.137461,"Cook before Westfield","1151",[13],-1,[[28,0.9709]]],[41.0989,-85.1157,"Anthony at Dodge (SB)","581",[4],-1,[[10,0.5478]]],[41.088592,-85.155857,"St. Mary's at Spring","1009",[12],-1,[[23,0.3169]]],[41.066793,-85.165411,"Brooklyn and Taylor (SB)","107",[14],-1,[[34,0.2274]]],[41.062375,-85.138012,"Calhoun at Suttenfield (SB)","1164",[7],-1,[[29,0.8915],[30,0.1302]]],[41.120375,-85.129466,"Northcrest Shopping","1118",[0,17],-1,[[0,0.2659],[1,0.266],[2,0.6585],[45,0.3689],[46,0.598]]],[41.028696,-85.124345,"Decatur after Farwood (SB)","1168",[7],-1,[[30,0.703]]],[41.0225,-85.1716,"Old Trail at Fairoak","699",[1,8],-1,[[50,0.1653],[52,0.1655],[54,0.2219]]],[41.031586,-85.130095,"Towles School","614",[7],-1,[[30,0.6226]]],[41.09461,-85.156065,"North Highlands Apartments","1014",[12],-1,[[23,0.3788]]],[41.124888,-85.135514,"Coldwater at Northeast","1150",[13],-1,[[28,0.7331]]],[41.0067,-85.1241,"Southbridge Office","1241",[7],-1,[[29,0.0935]]],[41.039111,-85.112767,"Pettit at Anthony","641",[10],-1,[[11,0.2739],[13,0.2738]]],[41.081191,-85.168977,"Citilink Office (Outbound)","55",[15],-1,[[36,0.259]]],[41.125295,-85.135777,"Sunoco Hut","1155",[13],-1,[[27,0.3049],[55,0.6321]]],[41.040952,-85.096513,"Hessen Cassel before Maplegrove","123464",[6],1,[[21,0.6735]]],[41.090317,-85.088489,"Oley's Pizza","338",[3],-1,[[8,0.4884]]],[41.0662,-85.138,"Calhoun at Butler","1204",[7,10],-1,[[13,0.9233],[29,0.9305]]],[41.127502,-85.106894,"Stonehedge at Bus Hut","684",[4],-1,[[10,0.0514]]],[41.075813,-85.140224,"Harrison at Jefferson","471",[4,13],-1,[[9,0.0428],[28,0.0392]]],[41.078201,-85.133334,"Washington at Lafayette (WB)","495",[5],-1,[[16,0.8763],[42,0.8762]]],[41.060565,-85.128127,"Hanna at Pontiac (NB)","987668",[6],1,[[20,0.8122]]],[41.078413,-85.139478,"Calhoun at Wayne (SB)","1338",[12],-1,[[22,0.8998]]],[41.0457,-85.1371,"Calhoun before McKinnie","837",[7],-1,[[29,0.7212]]],[41.069023,-85.18985,"Autumn Creek (NB)","249",[9],-1,[[4,0.5264]]],[41.0838,-85.1693,"Leesburg after Railroad Tracks (SB)","106",[15],-1,[[35,0.5212]]],[41.074355,-85.138511,"Calhoun at Douglas (SB)","1337",[12,16,19],-1,[[22,0.9504],[25,0.9584],[37,0.9769]]],[41.047965,-85.127596,"Hanna at Baxter","993",[6],-1,[[20,0.6942]]],[41.0089,-85.1693,"Bluffton at Commercial (SB)","1272",[8],-1,[[53,0.9315]]],[41.068594,-85.104534,"New Haven at Lumbard","198",[16],-1,[[37,0.6801]]],[41.080532,-85.150368,"Superior at Van Buren (WB)","501",[12],-1,[[23,0.1999]]],[41.0646,-85.1652,"Brooklyn at Ontario","1278",[14],-1,[[33,0.5769]]],[41.060647,-85.215616,"Jefferson before Time Corners","432",[9],-1,[[4,0.8648]]],[41.096884,-85.119908,"State at Florida","282",[4],0,[[10,0.6012]]],[41.11976,-85.150931,"Lima at Dunn (SB)","815",[11],-1,[[15,0.5505],[44,0.5455]]],[41.1123,-85.1255,"Parnell at Ridgewood","984",[0,17],-1,[[2,0.5427],[46,0.4928]]],[41.07201,-85.13938,"Central Station - Bay N","central-bay-N",[3,9],-1,[[5,1.0],[8,0.0]]],[41.0184,-85.1694,"Kroger Store (SB)","1277",[1,8],-1,[[49,0.0191],[51,0.7713],[53,0.8323]]],[41.0907,-85.1112,"VA Hospital","751",[5],-1,[[17,0.3952],[43,0.3953]]],[41.028563,-85.078313,"Wayne Trace beyond Santa Ana (SB)","1192",[6],-1,[[21,0.9054]]],[41.1162,-85.1256,"Parnell before Coliseum","991",[0,17],-1,[[2,0.5849],[46,0.5311]]],[41.097933,-85.115472,"Anthony at Lynn","566",[4],-1,[[9,0.4958]]],[41.023053,-85.112194,"Lutheran Concord Village","987670",[19],1,[[25,0.2957],[26,0.3732]]],[41.07201,-85.13918,"Central Station - Bay O","central-bay-O",[5,11],-1,[[14,0.0],[16,0.9999],[42,0.9999]]],[41.097846,-85.079307,"State and Reed (EB)","3oil",[3],-1,[[8,0.6203]]],[41.075284,-85.129987,"Lewisat Monroe","lcw0",[16,19],-1,[[25,0.8911],[37,0.9084]]],[41.112368,-85.115161,"Ivy Tech South","573",[4],-1,[[9,0.6517]]],[41.05985,-85.218989,"Covington and Getz (WB)","psro",[9],-1,[[4,0.89]]],[41.07206,-85.13846,"Central Station - Bay G","central-bay-G",[19],-1,[[24,0.0],[25,0.9997]]],[41.024706,-85.076741,"Wayne Trace beyond Strathdon (SB)","1193",[6],-1,[[21,0.9422]]],[41.075027,-85.143792,"Ewing at Jefferson","424",[1,8,11,15],-1,[[14,0.063],[36,0.0546],[51,0.0637],[53,0.0686]]],[41.08409,-85.129865,"Lake at St. Joseph","329",[3],-1,[[7,0.8179]]],[41.102356,-85.11566,"Anthony at Kenwood (NB)","571",[4],-1,[[9,0.5432]]],[41.096195,-85.131254,"Parnell at State (NB)","5",[0,17],-1,[[2,0.3546],[46,0.322]]],[41.031659,-85.121019,"Paulding at Smith","616",[10],-1,[[12,0.8566]]],[41.07208,-85.1392,"Central Station - Bay K","central-bay-K",[4,10],-1,[[10,1.0],[12,0.0]]],[41.115577,-85.148554,"Wells at Beckwith","3sad",[11],-1,[[15,0.589],[44,0.5835]]],[41.068517,-85.142729,"Masterson at Hoagland","1346",[14],-1,[[34,0.0647]]],[41.07201,-85.13955,"Central Station - Bay M","central-bay-M",[0,1,8,17],-1,[[2,0.0004],[46,0.0004],[50,0.9999],[52,0.9999],[54,0.9999]]],[41.02333,-85.118675,"Decatur near Tamera","934",[7],-1,[[29,0.3729]]],[41.0799,-85.1253,"East Central Towers","743",[5],-1,[[17,0.1836],[43,0.1836]]],[41.047077,-85.113418,"Anthony at McKinnie (SB)","1097",[19],-1,[[24,0.4599]]],[41.012791,-85.181127,"3321 Thurber (WB)","158",[1],-1,[[49,0.7865],[51,0.9501]]],[41.068339,-85.138249,"Calhoun at Masterson (SB)","1160",[7,10],-1,[[12,0.0365],[30,0.0523]]],[41.026604,-85.122001,"Decatur at Hystone","933",[7],-1,[[29,0.4154]]],[41.085032,-85.145502,"Wells at High","795",[11],-1,[[14,0.1647]]],[41.017605,-85.18326,"Lower Huntington at Kumfer","423",[1],-1,[[50,0.0326],[52,0.0328]]],[41.060861,-85.114029,"Anthony at Pontiac (SB)","1084",[19],-1,[[24,0.3212]]],[41.053365,-85.129264,"Oxford at Monroe","1042",[6],-1,[[21,0.2826]]],[41.111627,-85.148043,"Wells at Ashley Warehouse","498",[11],-1,[[15,0.6216],[44,0.6159]]],[41.044778,-85.11308,"Anthony before McKinnie","913",[19],-1,[[25,0.497],[26,0.6271]]],[41.066568,-85.1652,"Brooklyn and Brown (NB)","i0ri",[14],-1,[[33,0.6055]]],[41.092981,-85.134521,"Spy Run at Elizabeth","1217",[4,13],-1,[[9,0.2727],[28,0.2573]]],[41.088526,-85.145593,"Wells before Fifth","797",[11],-1,[[14,0.1983]]],[41.14862,-85.11102,"River Cove Office","240",[17],-1,[[46,0.9661]]],[41.07218,-85.13916,"Central Station - Bay C","central-bay-C",[5,11],-1,[[15,1.0],[17,0.0],[43,0.0],[44,1.0]]],[41.05097,-85.137488,"Calhoun before Rudisill (SB)","sdea",[7],-1,[[30,0.2792]]],[41.053353,-85.126732,"Oxford at Weiser Park","1113",[6],-1,[[21,0.3002]]],[41.070038,-85.035489,"IN-930 near PNC Bank (WB)","3wvx",[16],-1,[[37,0.1854]]],[41.0163,-85.112044,"Old Decatur at Anthony (NB)","902",[19],-1,[[24,0.8984],[25,0.2324],[26,0.2934]]],[41.067688,-85.156397,"Taylor at Thompson","157",[14],-1,[[33,0.7202]]],[41.031711,-85.113943,"Paulding at CVS (EB)","6trk",[10],-1,[[12,0.9012]]],[41.020202,-85.171627,"Old Trail at Lower Huntington","1288",[8],-1,[[54,0.1972]]],[41.119036,-85.149933,"Lima near Merkler","805",[11],-1,[[14,0.5249]]],[41.115698,-85.099545,"Hobson at Timberhill","757",[5],-1,[[17,0.8853],[43,0.8855]]],[41.187267,-85.094726,"New Vision at 3800 New Vision","294",[2],-1,[[47,0.0613]]],[41.1066,-85.1271,"Parnell at Northlawn","818",[0,17],-1,[[2,0.4774],[46,0.4335]]],[41.117149,-85.154369,"Sherman near Coliseum (NB)","ur8h",[12],-1,[[19,0.4288],[23,0.6526]]],[41.0527,-85.1738,"Wenonah at Nuttman","151",[14],-1,[[33,0.305]]],[41.017761,-85.114855,"Tall Oaks Apartments","932",[7],-1,[[29,0.3087]]],[41.101002,-85.138072,"Clinton at Grove","1223",[13],-1,[[28,0.3452]]],[41.072868,-85.147898,"Broadway at Lavina (SB)","597",[1,8],-1,[[51,0.177],[53,0.1909]]],[41.088578,-85.156022,"St. Mary's Ave. at Spring St. (SB)","944",[12],-1,[[22,0.6188]]],[41.106418,-85.099213,"Hobson Rd. across from Varsity Lane (SB)","783",[5],-1,[[16,0.2547],[42,0.2541]]],[41.021416,-85.16939,"Bluffton at Waynewood (SB)","1336",[1,8],-1,[[51,0.7422],[53,0.8008]]],[41.0997,-85.1643,"Cambridge at Trinity","1286",[15],-1,[[36,0.4628]]],[41.064783,-85.121953,"Creighton and Oliver","1142",[19],-1,[[24,0.2181]]],[41.1039,-85.12948,"Parnell at Vance (SB)","351",[0,17],-1,[[0,0.5381],[1,0.5382],[45,0.603]]],[41.11898,-85.099717,"Hobson at Stellhorn","758",[5],-1,[[17,0.9178],[43,0.918]]],[41.0356,-85.0961,"Hessen Cassel at Larkwood","627",[6,10],-1,[[11,0.059],[13,0.0591],[20,0.3504]]],[41.120172,-85.071028,"Stellhorn at Eicher (WB)","1203",[3],-1,[[7,0.0467]]],[41.185553,-85.103134,"PRMC Entrance 11","1330",[2],-1,[[48,0.8582]]],[41.086933,-85.145572,"Wells at Lev's Pawn Shop","796",[11],-1,[[14,0.183]]],[41.071502,-85.189785,"Ardmore at Washington Road","250",[9],-1,[[4,0.549]]],[41.02021,-85.074354,"Wayne Trace at Wayne Park (SB)","1194",[6],-1,[[20,0.0021],[21,0.9864]]],[41.0785,-85.1646,"Main at Greenwood","1260",[15],-1,[[35,0.6392]]],[41.085206,-85.145663,"Wells St. at High St. (SB)","736",[11],-1,[[15,0.8396],[44,0.8318]]],[41.064626,-85.127252,"Creighton near Weisser Park","1141",[19],-1,[[24,0.1776]]],[41.096121,-85.153857,"Sherman at State","987666",[12],1,[[22,0.5049]]],[41.045885,-85.167418,"Bluffton Rd & Engle Rd","6p34",[1,8],-1,[[51,0.5018],[53,0.5415]]],[41.079948,-85.122371,"Wayne near University","773",[5],-1,[[17,0.2056],[43,0.2056]]],[41.139022,-85.192534,"Ludwig at Huguenard","808",[11],-1,[[15,0.0584],[18,0.2417],[44,0.0579]]],[41.119135,-85.125992,"Parnell near California","1001",[0,17],-1,[[0,0.3479],[1,0.348],[45,0.4395]]],[41.0751,-85.1213,"Lewis at Ohio (EB)","172",[16],-1,[[38,0.1679]]],[41.105456,-85.152678,"Franke Park SB","1358",[12],-1,[[22,0.3874]]],[41.053382,-85.121546,"Oxford at Oliver","1137",[6],-1,[[21,0.3362]]],[41.0752,-85.118,"Lewis at McCulloch (WB)","205",[16],-1,[[37,0.8227]]],[41.132036,-85.192601,"Washington Center Huguenard","90",[11],-1,[[14,0.9987],[15,0.001],[18,0.004],[44,0.001]]],[41.123372,-85.095459,"Harshman Hall","987687",[5],1,[[16,0.002],[17,0.9959],[42,0.0013],[43,0.9961]]],[41.071461,-85.190037,"Ardmore at North Washington (SB)","258",[9],-1,[[5,0.4006],[6,0.4804]]],[41.090608,-85.086696,"Lake at Inwood","313",[3],-1,[[7,0.4726]]],[41.068812,-85.087738,"New Haven at Coliseum (EB)","114",[16],-1,[[38,0.4493]]],[41.0866,-85.1558,"St. Mary's at Third","938",[12],-1,[[23,0.2964]]],[41.0421,-85.1369,"Calhoun at Sherwood","834",[7],-1,[[29,0.6845]]],[41.025894,-85.136451,"Calhoun at Concord","889",[10],-1,[[12,0.4711]]],[41.049287,-85.137413,"Calhoun at CVS (SB)","876",[7],-1,[[30,0.3012]]],[41.053377,-85.113562,"Anthony before Oxford (NB)","1091",[19],-1,[[25,0.5766],[26,0.7276]]],[41.1313,-85.123,"Bishop Dwenger High School","1028",[0,17],-1,[[0,0.1044],[1,0.1044],[45,0.2301]]],[41.079443,-85.1314,"Wayne at Monroe","740",[5],-1,[[17,0.1372],[43,0.1373]]],[41.067099,-85.152556,"Broadway past Taylor","456",[1,8],1,[[51,0.2436],[53,0.2628]]],[41.054101,-85.09732,"Oxford before Hessen Cassel","518",[6],-1,[[21,0.5046]]],[41.040112,-85.09623,"Hessen Cassel at Maple Grove","630",[6,10],-1,[[11,0.1108],[13,0.1109],[20,0.3926]]],[41.064323,-85.140508,"Creighton at Webster","588",[10],-1,[[12,0.086]]],[41.113798,-85.099432,"Hobson at St. Croix","755",[5],-1,[[17,0.8664],[43,0.8666]]],[41.011908,-85.107543,"Southtown Square Apartments at Serenity Dr 1","898",[19],-1,[[24,0.8416],[25,0.1801],[26,0.2275]]],[41.095047,-85.156209,"West State Plaza","1031",[12],-1,[[22,0.5397]]],[41.091255,-85.078994,"Black Bear Creek Apartments","275",[3],-1,[[8,0.5596]]],[41.060754,-85.122649,"Pontiac Market","925",[19],-1,[[25,0.706],[26,0.8907]]],[41.120459,-85.063636,"McDonalds (WB)","308",[3],-1,[[8,0.991]]],[41.0202,-85.1741,"Lower Huntington at Elzey","682",[1],-1,[[50,0.1187],[52,0.1189]]],[41.014576,-85.111974,"Anthony after Lafayette (NB)","iwyf",[19],-1,[[25,0.0986],[26,0.1246]]],[41.0138,-85.1698,"Old Trail at Westward","1290",[1,8],-1,[[49,0.2478],[51,0.8246],[54,0.1242]]],[41.039034,-85.118588,"Pettit at Bowser","644",[10],-1,[[11,0.3247],[13,0.3246]]],[41.084434,-85.126523,"Columbia and Dearborn","333",[3],-1,[[8,0.2041]]],[41.060756,-85.118991,"Pontiac past Holton","861",[19],-1,[[25,0.6803],[26,0.8583]]],[41.075087,-85.125976,"Lewis at Harmar (EB)","218",[16],-1,[[38,0.1352]]],[41.069599,-85.045348,"930 near McDonald's","226",[16],-1,[[38,0.746]]],[41.190261,-85.100371,"PRMC Entrance 4","287",[2],-1,[[48,0.9603]]],[41.17743,-85.167442,"Lima Rd Walmart","741987",[2],1,[[47,0.6057]]],[41.067454,-85.185134,"Taylor at Filmore (EB)","g1u0",[9],-1,[[5,0.5056],[6,0.6076]]],[41.096537,-85.127637,"State at Bayer","563",[4],-1,[[9,0.3864]]],[41.053252,-85.127853,"Hanna before Oxford","1059",[6],-1,[[20,0.7437]]],[41.021566,-85.136307,"Calhoun at Morningside (SB)","892",[10],-1,[[12,0.5069]]],[41.07229,-85.14806,"Broadway at Martin","858",[1,8],-1,[[50,0.8345],[52,0.8346],[54,0.8458]]],[41.039,-85.1205,"Pettit at Oliver","646",[10],-1,[[11,0.3414],[13,0.3413]]],[41.009102,-85.126249,"Hanna at Dolphin","1172",[7],-1,[[29,0.1315]]],[41.104696,-85.098773,"Vance at Hobson (WB)","1348",[5],-1,[[17,0.774],[43,0.7741]]],[41.04902,-85.175253,"Wenonah Lane at Ojibway Trail (SB)","1322",[14],-1,[[34,0.4427]]],[41.1185,-85.0808,"Reed at Doenges (SB)","1221",[3],-1,[[7,0.1338]]],[41.090026,-85.102935,"Lake at Beacon (WB)","317",[3],-1,[[7,0.5969]]],[41.097299,-85.103161,"State at Beacon","786",[5],-1,[[16,0.3994],[42,0.399]]],[41.038962,-85.112967,"Anthony before Pettit","911",[19],-1,[[25,0.4431],[26,0.5591]]],[41.064218,-85.165334,"Brooklyn at Hale (SB)","1318",[14],-1,[[34,0.2497]]],[41.013118,-85.108407,"Southtown Square Apartments","50",[19],-1,[[24,0.8555],[25,0.1929],[26,0.2436]]],[41.1204,-85.0649,"Northwood Plaza","77",[3],-1,[[7,0.0],[8,0.9998]]],[41.089815,-85.110864,"Lake at Randallia (WB)","319",[3],-1,[[7,0.6575]]],[41.006322,-85.166139,"Social Security Office","1273",[8],-1,[[53,1.0],[54,0.0001]]],[41.09723,-85.146827,"Wells St. at Clayton Ave. (SB)","821",[11],-1,[[15,0.7402],[44,0.7334]]],[41.03613,-85.144209,"Fairfield at Fairfax (SB)","608",[10],-1,[[12,0.3477]]],[41.098095,-85.146795,"Wells at Irene","819",[11],-1,[[14,0.2908]]],[41.1188,-85.1355,"Coldwater at Coliseum","1231",[13],-1,[[27,0.3687],[55,0.7641]]],[41.145651,-85.136628,"Northrop High School (SB)","539",[13],-1,[[27,0.1047],[55,0.2182]]],[41.060556,-85.137742,"Calhoun at Pontiac (NB)","987673",[7],0,[[29,0.8729]]],[41.018137,-85.171707,"Old Trail near Kroger","1287",[8],-1,[[54,0.1749]]],[41.107873,-85.147567,"Edy's","725",[11],-1,[[14,0.385]]],[41.0985,-85.1315,"North Side High School (SB)","578",[0,17],-1,[[0,0.6062],[1,0.6064],[45,0.6616]]],[41.09826,-85.070032,"State near Voors","280",[3],-1,[[8,0.6872]]],[41.112097,-85.1258,"Parnell at Ridgewood (SB)","302",[0,17],-1,[[0,0.431],[1,0.4311],[45,0.5109]]],[41.052901,-85.156461,"Broadway @ Nuttman (IB)","987684",[1,8],1,[[50,0.5892],[52,0.5893],[54,0.617]]],[41.155893,-85.165656,"Lima Rd at Lima Valley","987660",[2],1,[[47,0.7967]]],[41.089488,-85.167877,"Tyler at Emerson","1249",[15],-1,[[36,0.3561]]],[41.097432,-85.099604,"State near Dollar General","761",[5],-1,[[16,0.3682],[42,0.3677]]],[41.092084,-85.12943,"St. Joseph at Delaware","340",[0,17],-1,[[2,0.3036],[46,0.2756]]],[41.0308,-85.1431,"Fairfield Past Paulding (SB)","16",[10],-1,[[12,0.3927]]],[41.018433,-85.180475,"Lower Huntington at Ideal","189",[1],-1,[[50,0.0588],[52,0.059]]],[41.071349,-85.200982,"Wendy's (SB)","430",[9],-1,[[4,0.6863],[5,0.2728],[6,0.3257]]],[41.053389,-85.114987,"Oxford at Lillie","1102",[6],-1,[[21,0.3817]]],[41.126851,-85.135594,"Coldwater at Essex","1229",[13],-1,[[28,0.7531]]],[41.061351,-85.152171,"Broadway @ Grace","987685",[1,8],1,[[50,0.6956],[52,0.6957],[54,0.7163]]],[41.089213,-85.145765,"Wells St. before Spring St. (SB)","825",[11],-1,[[15,0.8066],[44,0.7992]]],[41.0787,-85.15967,"Main past Mechanic (WB)","1005",[15],-1,[[36,0.1829]]],[41.079084,-85.147329,"Main at Fulton","917",[15],-1,[[35,0.8207]]],[41.134306,-85.120681,"Clinton at Colony","1004",[0,17],-1,[[2,0.9296],[46,0.8002]]],[41.032188,-85.102894,"Paulding at Turtle Creek","621",[10],-1,[[12,0.9709]]],[41.073653,-85.180607,"Freeman at Jefferson","262",[9],-1,[[5,0.6036],[6,0.7262]]],[41.097026,-85.115644,"State / Anthony","79",[4],-1,[[10,0.5666]]],[41.12136,-85.099813,"St. Joe at Dean Dr","552",[5],-1,[[17,0.9414],[43,0.9416]]],[41.068093,-85.128647,"Hanna at Lasselle (SB)","957",[6,19],-1,[[21,0.1122],[24,0.1193]]],[41.07301,-85.114308,"Anthony at Luther","202",[16],-1,[[37,0.7775]]],[41.119517,-85.135251,"Coldwater at Noble","1228",[13],-1,[[28,0.6785]]],[41.0656,-85.1281,"Hanna Creighton Transit Center","1371",[6,19],-1,[[20,0.8609],[21,0.1421],[24,0.1523],[25,0.7925],[26,0.9998]]],[41.078963,-85.125455,"Maumee Terrace Apartments (WB)","770",[5],-1,[[16,0.8066],[42,0.8065]]],[41.122091,-85.152347,"Lima at Production","806",[11],-1,[[14,0.5591]]],[41.07207,-85.13883,"Central Station - Bay I","central-bay-I",[14,15],-1,[[34,0.0001],[35,0.9999]]],[41.050692,-85.162477,"Bluffton BK","987686",[1,8],1,[[51,0.4404],[53,0.4751]]],[41.121905,-85.10021,"St. Joe Rd at Broyles - Bus Hut - (NW Corner)(SB)","1185",[4],-1,[[10,0.1567]]],[41.025949,-85.112388,"Anthony at Gladstone","910",[19],-1,[[25,0.3225],[26,0.4071]]],[41.078599,-85.167153,"Main past Runnion (WB)","1345",[15],-1,[[36,0.229]]],[41.081187,-85.169399,"Citilink Office (Inbound)","1370",[15],-1,[[35,0.5597]]],[41.0405,-85.1018,"2717 Maple Grove","634",[10],-1,[[11,0.1645],[13,0.1644]]],[41.022812,-85.112495,"Anthony at Southdale (SB)","905",[19],-1,[[24,0.7041]]],[41.098063,-85.075904,"State at Berkley","279",[3],-1,[[8,0.6461]]],[41.065945,-85.189592,"Taylor at Ardmore (WB)","247",[9],-1,[[4,0.4914]]],[41.128787,-85.135999,"Wal-Mart (SB)","1230",[13],-1,[[27,0.2704],[55,0.5609]]],[41.038512,-85.136727,"Calhoun before Pettit (NB)","829",[7],-1,[[29,0.6478]]],[41.104947,-85.147578,"Wells after Franke Park (SB)","729",[11],-1,[[44,0.6703]]],[41.036573,-85.09633,"Hessen Cassel at Ashcroft","987667",[6],1,[[21,0.7135]]],[41.076831,-85.142056,"Washington at Webster","241",[9],-1,[[4,0.0845]]],[41.134693,-85.120949,"Washington Square (SB)","486",[17],-1,[[45,0.1921]]],[41.025011,-85.126645,"Hanna at Kimberton (NB)","123466",[10],1,[[12,0.7637]]],[41.045061,-85.096359,"Hessen Cassel at Clermont","987654",[6],1,[[20,0.4389]]],[41.097283,-85.164347,"Cambridge before Purdue (SB)","1258",[15],-1,[[35,0.2454]]],[41.124494,-85.160442,"Profit at Dividend","505",[12],-1,[[19,0.9235],[23,0.9536]]],[41.130023,-85.148152,"Industrial and Heine Dr (Benchmark)","123460",[11],1,[[15,0.419],[44,0.4151]]],[41.100266,-85.147154,"Wells before Russell","803",[11],-1,[[14,0.3118]]],[41.186854,-85.100473,"PRMC Entrance 1","293",[2],-1,[[47,0.0],[48,0.9999]]],[41.069945,-85.033096,"Lincoln Hwy. at Halls Sign","228",[16],-1,[[38,0.84]]],[41.11746,-85.177662,"Coliseum at Hatfield","1293",[15],-1,[[32,0.7864],[36,0.9091]]],[41.094178,-85.168151,"Tyler Ave. at Huffman Blvd. (SB)","1297",[15],-1,[[35,0.3283]]],[41.132391,-85.136142,"Coldwater past Washington Center","1153",[13],-1,[[27,0.235],[55,0.4876]]],[41.075268,-85.132806,"Lewis at Lafayette","528",[16,19],-1,[[25,0.9109],[37,0.9286]]],[41.070982,-85.011523,"Hartzell St./Green St.","68",[16],-1,[[37,0.0008],[38,0.9973]]],[41.018562,-85.112023,"Anthony at Woodside","903",[19],-1,[[25,0.2541],[26,0.3207]]],[41.046253,-85.118401,"McKinnie before Robinwood","990",[6],-1,[[20,0.6124]]],[41.089019,-85.119254,"Lake at Delta","325",[3],-1,[[7,0.7226]]],[41.030242,-85.167292,"Old Trail near Bella Vista","731",[1,8],-1,[[50,0.2656],[52,0.2658],[54,0.3155]]],[41.147499,-85.136746,"Coldwater and Cook Rd. (SB)","1367",[13],-1,[[27,0.0865],[55,0.1807]]],[41.073702,-85.114501,"Anthony at Alliger (SB)","175",[16],-1,[[38,0.2287]]],[41.089557,-85.115322,"Lake at Anthony (EB)","335",[3],-1,[[8,0.3007]]],[41.105009,-85.091724,"Vance at Sherbourne (WB)","1349",[5],-1,[[17,0.7209],[43,0.7211]]],[41.0933,-85.0791,"Richfield Apartments","277",[3],-1,[[8,0.5784]]],[41.07519,-85.152728,"Washington at Rockhill (WB)","243",[9],-1,[[4,0.1595]]],[41.07218,-85.13896,"Central Station - Bay D","central-bay-D",[0,1,8,17],-1,[[0,0.9997],[1,1.0],[45,1.0],[51,0.0],[53,0.0]]],[41.031616,-85.127119,"Paulding at Hanna","987672",[7],0,[[30,0.6521]]],[41.064699,-85.124613,"Creighton and Gay","1127",[19],-1,[[24,0.1978]]],[41.1269,-85.1001,"Arbor Glen Nursing Home","681",[4],-1,[[9,0.9603]]],[41.111495,-85.15415,"Sherman at Villa Park","1021",[12],-1,[[19,0.3331],[23,0.5945]]],[41.054991,-85.144756,"Fairfield at Packard","666",[10],-1,[[11,0.7332],[13,0.7333]]],[41.070167,-85.030934,"Delmart Plaza","233",[16],-1,[[37,0.1528]]],[41.189559,-85.103259,"PRMC Entrance 6","1331",[2],-1,[[48,0.8922]]],[41.0967,-85.1276,"Park Center (WB)","283",[4],-1,[[10,0.6596]]],[41.074247,-85.128748,"Hanna at Douglas (NB)","1135",[19],-1,[[25,0.8748]]],[41.067382,-85.152352,"Broadway and Taylor","3",[1,8],1,[[50,0.7653],[52,0.7654],[54,0.7812]]],[41.0119,-85.1693,"Bluffton at St. Louis (SB)","1271",[8],-1,[[53,0.9002]]],[41.0887,-85.1152,"Anthony at Tilden (SB)","789",[5],-1,[[16,0.6021],[42,0.6018]]],[41.06952,-85.0495,"930 near Wayne Motel","225",[16],-1,[[38,0.7169]]],[41.067854,-85.147889,"Taylor before Fox (WB)","wp3a",[14],-1,[[34,0.1047]]],[41.097145,-85.103493,"State at Beacon","779",[5],-1,[[17,0.5186],[43,0.5187]]],[41.13473,-85.192571,"Huguenard at Transportation Dr (NB)","809",[11],-1,[[15,0.0231],[18,0.0957],[44,0.0229]]],[41.072129,-85.114442,"Anthony at Hayden (SB)","176",[16],-1,[[38,0.2432]]],[41.082808,-85.135471,"Spy Run at Superior","474",[4,13],-1,[[9,0.1614],[28,0.1516]]],[41.049821,-85.113364,"Anthony before Rudisill","914",[19],-1,[[25,0.5437],[26,0.686]]],[41.090733,-85.081269,"Arbor Lake","312",[3],-1,[[7,0.4311]]],[41.122427,-85.125831,"Clinton at Fairington","156",[0,17],-1,[[2,0.7419],[46,0.6737]]],[41.078478,-85.167475,"Main at Davis","1259",[15],-1,[[35,0.6092]]],[41.070806,-85.202994,"Apple Glen/Wal-Mart","123457",[9],1,[[5,0.2502],[6,0.2985]]],[41.102214,-85.154026,"Sherman at Mildred (SB)","1023",[12],-1,[[22,0.4301]]],[41.090992,-85.079193,"Reed at Lake (SB)","310",[3],-1,[[7,0.4111]]],[41.081053,-85.136009,"FW Museum of Art","1187",[0,3,4,17],-1,[[0,0.8562],[1,0.8565],[7,0.8768],[10,0.8642],[45,0.8766]]],[41.065031,-85.114228,"Anthony and Creighton (EB)","48",[19],-1,[[24,0.2775]]],[41.07001,-85.112752,"Wayne Trace at Fletcher (WB)","200",[16],-1,[[37,0.7431]]],[41.068687,-85.128502,"Hanna at Masterson","1073",[6,19],-1,[[20,0.892],[25,0.8233]]],[41.089937,-85.156038,"St. Mary's Ave. at Huffman St. (SB)","943",[12],-1,[[22,0.6022]]],[41.031569,-85.126907,"Hanna at Paulding","987662",[10],0,[[12,0.8181]]],[41.01464,-85.112227,"Anthony before Lafayette (SB)","901",[19],-1,[[24,0.9151]]],[41.100747,-85.153833,"Sherman near Elmer","1016",[12],-1,[[19,0.1152],[23,0.462]]],[41.069828,-85.131218,"Wallace at Clay (WB)","1140",[6],-1,[[20,0.9201]]],[41.110727,-85.080394,"Reed at Trierwood (SB)","442",[3],-1,[[7,0.2121]]],[41.028715,-85.136603,"Pursley at Calhoun","987661",[10],1,[[12,0.4462]]],[41.077,-85.148455,"Broadway at Wayne (SB)","1166",[1,8],-1,[[51,0.1365],[53,0.1471]]],[41.096611,-85.0793,"Reed at Forest","278",[3],-1,[[8,0.6089]]],[41.113815,-85.154369,"Sherman at Louisedale (SB)","1019",[12],-1,[[22,0.2623]]],[41.074531,-85.149284,"Jefferson at Van Buren","557",[9],-1,[[5,0.8685]]],[41.105424,-85.080045,"Reed at Vance (SB)","443",[3],-1,[[7,0.2656]]],[41.053718,-85.111317,"Oxford past Euclid","522",[6],-1,[[21,0.4075]]],[41.063247,-85.145223,"Fairfield at Pierce (SB)","590",[10],-1,[[12,0.123]]],[41.031133,-85.125954,"Decatur near Paulding","896",[7],-1,[[29,0.4717]]],[41.063462,-85.130718,"Warsaw St. at Taber St. (SB)","1038",[6],-1,[[21,0.1831]]],[41.069997,-85.030442,"Lincoln Hwy. at Hartzell","229",[16],-1,[[38,0.8585]]],[41.0497,-85.1373,"Family Dollar","1244",[7],-1,[[29,0.7621]]],[41.042438,-85.167965,"Sandpoint at Bluffton","140",[14],-1,[[33,0.0612]]],[41.028745,-85.124205,"Decatur at Farwood","897",[7],-1,[[29,0.4438]]],[41.102264,-85.138452,"Salvation Army","1029",[13],-1,[[27,0.6627]]],[41.049912,-85.127645,"Hanna at Rudisill","1057",[6],-1,[[20,0.7124]]],[41.078308,-85.153307,"Main at Rockhill","952",[15],-1,[[35,0.7575]]],[41.09136,-85.156086,"St. Mary's Ave. and Putnam St. (SB)","1032",[12],-1,[[22,0.5848]]],[41.046282,-85.114844,"McKinnie past Lillie","988",[6],-1,[[20,0.5871]]],[41.056674,-85.113863,"Anthony at Eckert (SB)","1090",[19],-1,[[24,0.3634]]],[41.068639,-85.099508,"New Haven at Edsall","184",[16],-1,[[38,0.367]]],[41.07515,-85.133867,"Lewis at Lafayette","165",[0,3,16,17],-1,[[2,0.0851],[8,0.0737],[38,0.08],[46,0.0773]]],[41.07207,-85.139,"Central Station - Bay J","central-bay-J",[6,12],-1,[[21,0.0],[22,0.9999]]],[41.129777,-85.101653,"Roebuck at St. Joe","81",[4],-1,[[9,1.0],[10,0.0]]],[41.045343,-85.144526,"Fairfield at Maxine (SB)","601",[10],-1,[[12,0.2714]]],[41.079132,-85.119364,"Washington at Schick","987663",[5],1,[[16,0.7532],[42,0.753]]],[41.061042,-85.152343,"Broadway @ Maple","987680",[1,8],1,[[51,0.3023],[53,0.3261]]],[41.097254,-85.098826,"State at Hobson","753",[5],-1,[[17,0.5537],[43,0.5539]]],[41.013604,-85.118937,"Southtown Centre (SB)","1372",[7,19],-1,[[24,0.9997],[25,0.0],[26,0.0001],[29,0.0],[30,0.9994]]],[41.052191,-85.137447,"South Side High School","1246",[7],-1,[[29,0.7875]]],[41.031521,-85.133604,"Bishop Luers (EB)","613",[7],-1,[[30,0.5878]]],[41.1078,-85.1263,"Parnell past Somerset (SB)","322",[0,17],-1,[[0,0.4839],[1,0.4841],[45,0.5564]]],[41.046915,-85.101141,"McKinnie near McMillen","980",[6],-1,[[20,0.4892]]],[41.132444,-85.171007,"Washington Center and Country Forest Dr","l5ks",[11],-1,[[14,0.8413]]],[41.132542,-85.165601,"Crosscreek at Center","427",[11],-1,[[14,0.8019]]],[41.102,-85.1309,"Parnell at Kenwood","974",[0,17],-1,[[2,0.4185],[46,0.38]]],[41.0406,-85.0978,"Maple Grove at Schaper","631",[10],-1,[[11,0.1296],[13,0.1295]]],[41.03874,-85.113155,"Anthony past Pettit (SB)","1098",[19],-1,[[24,0.5438]]],[41.089609,-85.117055,"Lake before Forest Park","370",[3],-1,[[7,0.7048]]],[41.096737,-85.119746,"State at Florida","677",[4],-1,[[9,0.4505]]],[41.069921,-85.199227,"Apple Glen near PetSmart","434",[9],-1,[[4,0.7039],[5,0.2928],[6,0.3499]]],[41.097539,-85.09032,"State at Pizza Hut (EB)","kldx",[5],-1,[[17,0.6178],[43,0.6179]]],[41.059255,-85.137852,"Blue Jacket (SB)","866",[7],-1,[[30,0.1709]]],[41.097262,-85.07952,"Reed past State (SB)","445",[3],-1,[[7,0.3479]]],[41.046751,-85.106598,"McKinnie at Queen","977",[6],-1,[[20,0.5281]]],[41.132329,-85.156254,"Washington Center at YWCA","123459",[11],1,[[15,0.3344],[44,0.3313]]],[41.078599,-85.159246,"Main near Mechanic","950",[15],-1,[[35,0.6951]]],[41.100698,-85.115595,"Anthony at Charlotte","678",[4],-1,[[9,0.5254]]],[41.117387,-85.189882,"Coliseum","1291",[15],-1,[[32,0.6095],[36,0.8338]]],[41.067537,-85.165172,"Brooklyn and Taylor (NB)","111",[14],-1,[[33,0.6195]]],[41.021226,-85.171595,"Old Trail at Waynewood","689",[1,8],-1,[[50,0.1506],[52,0.1508],[54,0.2082]]],[41.185819,-85.098581,"Parkview Plaza at New Vision","1329",[2],-1,[[47,0.0331]]],[41.02365,-85.095881,"Hessen Cassel at Oakwood","1196",[6],-1,[[20,0.2386]]],[41.075239,-85.127236,"Lewis at Francis (WB)","211",[16],0,[[37,0.8887]]],[41.08927,-85.134408,"Spy Run at Tennessee","672",[4,13],-1,[[9,0.2332],[28,0.2197]]],[41.053351,-85.125321,"Oxford @ S Park Dr","987676",[6],0,[[21,0.31]]],[41.078595,-85.137957,"Clinton at Wayne (SB)","476",[0,3,4,13,17],-1,[[0,0.9024],[1,0.9026],[7,0.9161],[10,0.9033],[27,0.9005],[45,0.9163]]],[41.016255,-85.171428,"Old Trail at McArthur","421",[1,8],-1,[[49,0.3622],[51,0.8513],[54,0.1538]]],[41.087252,-85.171975,"Francis College (SB)","1308",[15],-1,[[35,0.4642]]],[41.145706,-85.113989,"Concordia Gardens","290",[17],-1,[[46,0.9229]]],[41.09669,-85.131428,"Parnell at State (SB)","419",[0,17],-1,[[0,0.6276],[1,0.6278],[45,0.68]]],[41.075061,-85.117038,"Lewis at Winter (EB)","174",[16],-1,[[38,0.1977]]],[41.056573,-85.130546,"Warsaw St. at Eckart St. (SB)","959",[6],-1,[[21,0.2461]]],[41.067567,-85.185199,"Taylor at Fillmore (WB)","246",[9],-1,[[4,0.4567]]],[41.090394,-85.085378,"Lake before Inwood (EB)","5qmy",[3],-1,[[8,0.5102]]],[41.0685,-85.1094,"Wayne Trace at DuBois","179",[16],-1,[[37,0.7152],[38,0.2976]]],[41.124683,-85.154466,"Lima before Ley","807",[11],-1,[[14,0.5884]]],[41.078518,-85.163639,"Main at Watkins","1262",[15],-1,[[35,0.6492]]],[41.032627,-85.079888,"Paulding near Wayne Trace","1190",[6],-1,[[21,0.8641]]],[41.108853,-85.17063,"Bowen Health Center","104",[15],-1,[[32,0.0296],[36,0.587]]],[41.0908,-85.1114,"Randallia at Vermont (SB)","788",[5],-1,[[16,0.545],[42,0.5447]]],[41.085489,-85.127129,"Lake at Dearborn","388",[3],-1,[[7,0.7927]]],[41.108067,-85.099357,"Postal Credit Union","784",[5],-1,[[16,0.2356],[42,0.235]]],[41.075113,-85.124023,"Lewis at Division (EB)","169",[16],-1,[[38,0.1489]]],[41.1217,-85.1238,"4931 Fairington","36",[0],-1,[[2,0.7672]]],[41.136596,-85.165227,"Meijer on Center Rd","813",[2,11],-1,[[14,0.7429],[47,0.9991],[48,0.0004]]],[41.0561,-85.1649,"Goodwill Industries","1268",[14],-1,[[33,0.4535]]],[41.056557,-85.144821,"Fairfield before Wildwood","711",[10],-1,[[11,0.7512],[13,0.7512]]],[41.095277,-85.146425,"Wells St. at Florence Ave. (SB)","822",[11],-1,[[15,0.7564],[44,0.7495]]],[41.032363,-85.094701,"Castlewood Shopping","1188",[6],-1,[[21,0.7613]]],[41.088801,-85.16799,"Tyler Ave. at Spring St. (SB)","1307",[15],-1,[[35,0.4022]]],[41.050295,-85.144735,"Fairfield at Rudisill","83",[10],-1,[[12,0.2303]]],[41.032771,-85.112656,"Anthony and Paulding (NB)","51",[19],-1,[[25,0.3857],[26,0.4868]]],[41.1244,-85.126301,"Clinton at Wakefield (SB)","269",[0,17],-1,[[0,0.1928],[1,0.1928],[45,0.3061]]],[41.160416,-85.165801,"Lima Rd past Wallen Rd","147456",[2],1,[[47,0.7609]]],[41.064841,-85.119013,"Creighton at Holton","1133",[19],-1,[[24,0.2406]]],[41.121334,-85.100153,"St. Joe Rd at Broyles (SW corner)(SB)","554",[5],-1,[[16,0.0823],[42,0.0816]]],[41.039182,-85.16667,"Bluffton Rd at Shell Gas Station","yk93",[1,8],-1,[[50,0.3744],[52,0.3745],[54,0.4168]]],[41.0391,-85.1153,"Pettit at Winter","642",[10],-1,[[11,0.296],[13,0.2959]]],[41.06749,-85.182157,"Taylor at Henrietta","483",[9],-1,[[5,0.5289],[6,0.6358]]],[41.132114,-85.185804,"Washington Center at N Oak Blvd","812",[11],-1,[[14,0.9491]]],[41.067807,-85.152218,"Taylor at Broadway (WB)","1313",[14],-1,[[34,0.1332]]],[41.066273,-85.219268,"Coventry Court West","252",[9,18],-1,[[3,0.4729],[4,0.9519],[39,0.8764]]],[41.133765,-85.113455,"Colony and Campus","417",[0],-1,[[0,0.0],[1,0.0],[2,0.9995]]],[41.046258,-85.126834,"McKinnie before Hanna","1052",[6],-1,[[20,0.6723]]],[41.031541,-85.166139,"1st Source Bank","744",[1,8],-1,[[50,0.2858],[52,0.286],[54,0.3343]]],[41.069249,-85.040697,"Lincoln Plaza","115",[16],-1,[[38,0.7828]]],[41.054021,-85.14473,"Fairfield before Kinsmoor","709",[10],-1,[[11,0.7221],[13,0.7221]]],[41.148769,-85.109587,"River Cove","248",[17],-1,[[46,0.9768]]],[41.0901,-85.1559,"St. Mary's at Huffman","1010",[12],-1,[[23,0.3324]]],[41.090066,-85.097576,"Lake at Whiteoak (EB)","74",[3],-1,[[8,0.4248]]],[41.064186,-85.140792,"Creighton at Webster (EB)","iy7h",[10],-1,[[11,0.8767],[13,0.8768]]],[41.069353,-85.133848,"Wallace past Lafayette","987669",[6],1,[[20,0.9397]]],[41.058559,-85.144901,"Fairfield at Home","712",[10],-1,[[11,0.7742],[13,0.7742]]],[41.100124,-85.060798,"State at Maplecrest","296",[3],-1,[[8,0.7541]]],[41.058814,-85.145046,"Fairfield at Home (SB)","592",[10],-1,[[12,0.1597]]],[41.051945,-85.137536,"Calhoun after Oakdale (SB)","874",[7],-1,[[30,0.2665]]],[41.0393,-85.1061,"Werling Dr. at Pettit Ave. (SB)","637",[10],-1,[[11,0.2158],[13,0.2141]]],[41.046229,-85.121802,"McKinnie at Smith","1050",[6],-1,[[20,0.6365]]],[41.078619,-85.155673,"Main at Camp Allen","1034",[15],-1,[[35,0.7323]]],[41.017105,-85.121765,"Tillman at Phoenix","549",[7],-1,[[29,0.2508]]],[41.014223,-85.183842,"7402 Hickory Creek","170",[1],-1,[[49,0.9308],[51,0.9838]]],[41.053956,-85.130417,"Warsaw and Wiebke","1359",[6],-1,[[21,0.27]]],[41.057155,-85.154175,"Broadway @ Wildwood (OB)","987681",[1,8],1,[[51,0.3435],[53,0.3706]]],[41.033921,-85.144134,"Courts of Woodhurst (SB)","609",[10],-1,[[12,0.366]]],[41.121368,-85.135374,"Coldwater at Collins","1148",[13],-1,[[28,0.6973]]],[41.089682,-85.111384,"Lake at Randallia (EB)","137",[3,5],-1,[[8,0.3282],[17,0.3845],[43,0.3846]]],[41.085287,-85.12942,"St. Joseph at Loree","930",[0,17],-1,[[2,0.2267],[46,0.2058]]],[41.07982,-85.127851,"Wayne at Francis","742",[5],-1,[[17,0.1644],[43,0.1644]]],[41.075218,-85.123894,"Lewis at Division (WB)","209",[16],-1,[[37,0.8648]]],[41.090107,-85.145615,"Wells before Huffman","798",[11],-1,[[14,0.2135]]],[41.060766,-85.114953,"Pontiac at Lillie","859",[19],-1,[[25,0.6519],[26,0.8225]]],[41.028968,-85.142375,"Fairfield at Birchtree (SB)","931",[10],-1,[[12,0.4088]]],[41.115973,-85.154455,"Sherman Blvd at Trick Ave (SB)","1017",[12],-1,[[22,0.2359]]],[41.0696,-85.1299,"Wallace at Monroe","956",[6,19],-1,[[21,0.0885],[24,0.0933]]],[41.181308,-85.09436,"Diebold (SB)","295",[2],-1,[[47,0.1116]]],[41.075005,-85.143978,"Taco Bell Ewing St.","852369",[1,8,9,15],1,[[5,0.9166],[35,0.9082],[50,0.9049],[52,0.905],[54,0.9114]]],[41.108294,-85.116084,"Anthony Health Food Store","577",[4],-1,[[10,0.4537]]],[41.082331,-85.155442,"Burgess at St Marys","502",[12],-1,[[23,0.2494]]],[41.057092,-85.144998,"Fairfield at Wildwood (SB)","593",[10],-1,[[12,0.174]]],[41.088421,-85.119619,"Delta at Tilden","268",[3],-1,[[8,0.2656]]],[41.057516,-85.113707,"Anthony at Colerick (NB)","1087",[19],-1,[[25,0.615],[26,0.776]]],[41.118459,-85.125605,"Parnell at California","288",[0,17],-1,[[2,0.6094],[46,0.5533]]],[41.186647,-85.097014,"LabCorp","987678",[2],1,[[47,0.046]]],[41.109078,-85.168532,"Parkview Studio Apartments (SB)","1339",[15],-1,[[35,0.0586]]],[41.069091,-85.076703,"New Haven at Meyer","234",[16],-1,[[37,0.4809]]],[41.072,-85.13896,"Central Station - Bay P","central-bay-P",[14,15],-1,[[33,0.9999],[36,0.0]]],[41.071061,-85.180762,"Freeman at Portage (SB)","428",[9],-1,[[4,0.3935]]],[41.124,-85.1358,"ARC on Coldwater (SB)","1154",[13],-1,[[27,0.3176],[55,0.6584]]],[41.047912,-85.09203,"Wayne Trace at McKinnie (SB)","100",[6],-1,[[21,0.5768]]],[41.0959,-85.156075,"St. Mary's / State","96",[12],-1,[[19,0.0002],[23,0.3921]]],[41.108079,-85.190803,"Independence at Hillegas","1344",[15],-1,[[32,0.3876],[36,0.7394]]],[41.036215,-85.136093,"Southgate Plaza","86",[7],-1,[[29,0.6162],[30,0.4899]]],[41.089788,-85.106178,"Lake at Carew (EB)","987679",[3],1,[[7,0.6218],[8,0.3646]]],[41.019441,-85.126544,"Silver Birch","9",[10],-1,[[12,0.625]]],[41.06078,-85.130594,"Warsaw St. at Pontiac St. (SB)","1040",[6],-1,[[21,0.2076]]],[41.075041,-85.147955,"Broadway at Jefferson (SB)","1167",[1,8],-1,[[51,0.156],[53,0.1681]]],[41.102504,-85.115876,"Anthony at Kenwood (SB)","580",[4],-1,[[10,0.5118]]],[41.1092,-85.1367,"Coldwater after Ernst (SB)","1157",[13],-1,[[27,0.5851]]],[41.100441,-85.131605,"Parnell at Charlotte (SB)","1055",[0,17],-1,[[0,0.5833],[1,0.5835],[45,0.6419]]],[41.094,-85.168,"Tyler at Huffman","1253",[15],-1,[[36,0.3928]]],[41.112644,-85.144622,"Lima North of Fernhill","1147",[11],1,[[14,0.4523]]],[41.089714,-85.114753,"Lake at Anthony (WB)","323",[3],-1,[[7,0.6873]]],[41.090357,-85.093269,"Lake at Laverne","315",[3],-1,[[7,0.5229]]],[41.01494,-85.17381,"2701 McArthur","1298",[1],-1,[[49,0.4618],[51,0.8745]]],[41.126302,-85.165517,"Profit at Executive (WB)","105",[12],-1,[[19,0.9998],[22,0.0],[23,1.0]]],[41.101022,-85.07975,"Reed at Karen (SB)","444",[3],-1,[[7,0.3099]]],[41.087115,-85.128298,"St. Joseph at Elmwood","940",[0,17],-1,[[2,0.2485],[46,0.2256]]],[41.054858,-85.137659,"Calhoun after Packard (SB)","871",[7],-1,[[30,0.2284]]],[41.124088,-85.154461,"Lima at Ley (SB)","814",[11],-1,[[15,0.5087],[44,0.504]]],[41.152257,-85.138234,"BioLife","1327",[2,13],-1,[[27,0.0242],[48,0.3236],[55,0.0519]]],[41.070329,-85.021986,"Lincoln at State","191",[16],-1,[[37,0.0887]]],[41.116564,-85.125946,"Parnell past Coliseum (SB)","418",[0,17],-1,[[0,0.3783],[1,0.3784],[45,0.4656]]],[41.0644,-85.1381,"Calhoun at Creighton (SB)","1162",[7,10],-1,[[12,0.0692],[30,0.1037]]],[41.116935,-85.168784,"Harris at Schomburg","67",[15],-1,[[32,0.9312],[36,0.9707]]],[41.098187,-85.131335,"Parnell at Nettie","963",[0,17],-1,[[2,0.3762],[46,0.3416]]],[41.068942,-85.089402,"New Haven at Redwood","193",[16],-1,[[37,0.5718]]],[41.053385,-85.117317,"Oxford at Reed","1104",[6],-1,[[21,0.3655]]],[41.064307,-85.219274,"Getz at Lois Lane","251",[9,18],-1,[[3,0.2773],[4,0.9341],[39,0.8418]]],[41.07218,-85.13857,"Central Station - Bay F","central-bay-F",[16],-1,[[37,1.0],[38,0.0001]]],[41.030907,-85.11255,"League for the Blind","618",[19],1,[[24,0.6227],[25,0.3684],[26,0.465]]],[41.112671,-85.192182,"Hillegas at Millie's Bakery","1324",[15],-1,[[32,0.4979],[36,0.7863]]],[41.092205,-85.167958,"Tyler at Cherokee","1251",[15],-1,[[36,0.3782]]],[41.076359,-85.145229,"Washington at Fairfield (WB)","401",[9],-1,[[4,0.1068]]],[41.075518,-85.150561,"Washington at Jackson (WB)","402",[9],-1,[[4,0.1443]]],[41.0621,-85.1378,"Calhoun at Suttenfield","1182",[7],-1,[[29,0.8887]]],[41.1199,-85.0782,"Stellhorn at Haffner (WB)","1215",[3],-1,[[7,0.1016]]],[41.0696,-85.138193,"Calhoun near Wallace","1210",[6,7,10,19],-1,[[11,0.9622],[13,0.9623],[20,0.9733],[24,0.0261],[29,0.9653]]],[41.118826,-85.061367,"Maplecrest at Birchdale","309",[3],-1,[[8,0.9606]]],[41.053025,-85.165029,"Nuttman at Brooklyn","154",[14],-1,[[33,0.4063]]],[41.1024,-85.163128,"Gateway Plaza","1255",[15],-1,[[36,0.5033]]],[41.118631,-85.162485,"Bowen Health Directors Row","503",[12],-1,[[19,0.6426],[23,0.7827]]],[41.044485,-85.167266,"4301 Bluffton","769",[1,8],-1,[[50,0.4362],[52,0.4363],[54,0.4744]]],[41.1068,-85.1389,"Clinton at Figel (SB)","1158",[13],-1,[[27,0.6139]]],[41.117979,-85.155544,"Coliseum at Regency Inn (WB)","q8ml",[12],-1,[[19,0.4549],[23,0.6685]]],[41.023557,-85.119018,"Decatur at Dawnan (SB)","1240",[7],-1,[[30,0.7896]]],[41.1099,-85.1162,"Anthony before St Joe River (SB)","685",[4],-1,[[10,0.4377]]],[41.020634,-85.123316,"Tamera Senior Villas","1353",[10],-1,[[12,0.676]]],[41.079231,-85.147479,"Main at Fulton","1326",[15],-1,[[36,0.1068]]],[41.0601,-85.1652,"Brooklyn at Covington","155",[14],-1,[[33,0.5116]]],[41.100479,-85.131447,"Parnell near Charlotte","1053",[0,17],-1,[[2,0.4011],[46,0.3642]]],[41.115835,-85.154327,"Sherman at Trick","1024",[12],-1,[[19,0.4066],[23,0.6391]]],[41.112529,-85.115386,"Anthony near Ivy Tech (SB)","576",[4],-1,[[10,0.4108]]],[41.053903,-85.113755,"Anthony at Oxford (SB)","1100",[19],-1,[[24,0.3912]]],[41.107537,-85.137144,"Turnstone","123462",[13],1,[[28,0.423]]],[41.075186,-85.116894,"Lewis at Winter (WB)","204",[16],-1,[[37,0.8147]]],[41.068857,-85.07871,"New Haven at Meyer","187",[16],-1,[[38,0.5125]]],[41.061532,-85.219263,"Time Corners","71",[9,18],-1,[[3,0.0012],[4,0.9089],[39,0.7931]]],[41.018218,-85.078892,"Crown Colony","65",[6],-1,[[20,0.0633]]],[41.089985,-85.105743,"Lake at Carew","987677",[3],1,[[7,0.6184]]],[41.090495,-85.089712,"Lake at Annette","447",[3],-1,[[7,0.4957]]],[41.069953,-85.150539,"Broadway near Swinney (SB)","610",[1,8],-1,[[51,0.2118],[53,0.2285]]],[41.075117,-85.135991,"Lewis near Clinton","162",[0,3,16,17],-1,[[2,0.0677],[8,0.0589],[38,0.0652],[46,0.0614]]],[41.032288,-85.098541,"Hessen Cassel Library","624",[10],-1,[[11,0.0012],[12,0.9983],[13,0.0013]]],[41.09311,-85.129908,"Parnell at St. Joe (SB)","1065",[0,4,17],-1,[[0,0.6758],[1,0.676],[10,0.7119],[45,0.7215]]],[41.053369,-85.124034,"Oxford at Gaywood","1109",[6],-1,[[21,0.3189]]],[41.079,-85.144714,"Edsall House","488",[11,15],-1,[[14,0.1018],[36,0.0873]]],[41.079525,-85.14459,"Main at Ewing","953",[12],-1,[[22,0.832]]],[41.097169,-85.108101,"State at Carew","763",[5],-1,[[16,0.4427],[42,0.4423]]],[41.056533,-85.127993,"Hanna before Eckart","1139",[6],-1,[[20,0.7744]]],[41.113334,-85.168687,"West Wind Apartments (SB)","9hpy",[15],-1,[[32,0.9999],[35,0.0001],[36,0.9999]]],[41.0697,-85.1124,"Wayne Trace near Fletcher","177",[16],-1,[[38,0.2739]]],[41.055942,-85.165045,"Brooklyn at Goodwill (SB)","1320",[14],-1,[[34,0.3215]]],[41.076986,-85.132086,"Clay at Jefferson","415",[0,3,17],-1,[[2,0.1224],[8,0.1054],[46,0.1112]]],[41.052912,-85.156648,"Broadway @ Nuttman (OB)","987683",[1,8],1,[[51,0.3887],[53,0.4193]]],[41.042422,-85.113273,"Anthony at Capitol (SB)","6lv4",[19],-1,[[24,0.5068]]],[41.057192,-85.137606,"Calhoun near Wildwood","847",[7],-1,[[29,0.8386]]],[41.085999,-85.123465,"Columbia and Tecumseh","266",[3],-1,[[8,0.2299]]],[41.068715,-85.095028,"New Haven at Fleetwood","185",[16],-1,[[38,0.3983]]],[41.012815,-85.177528,"Mcarthur at Bradbury","149",[1],-1,[[49,0.6096],[51,0.9089]]],[41.117188,-85.14841,"Lima at Coliseum","804",[11],-1,[[14,0.504]]],[41.090571,-85.168043,"Tyler Ave. at Ellen Ave. (SB)","1305",[15],-1,[[35,0.3779]]],[41.05016,-85.144496,"Rudisill at Fairfield","84",[10],-1,[[11,0.6777],[13,0.6753]]],[41.108519,-85.115769,"Wooden Nickel Music","680",[4],-1,[[9,0.6095]]],[41.068489,-85.104309,"New Haven at Lumbard","182",[16],-1,[[38,0.3334]]],[41.040348,-85.172571,"Sandpoint at Allegany","139",[14],-1,[[31,1.0],[33,0.0003],[34,1.0]]],[41.092585,-85.145711,"Wells at Archer (NB)","801",[11],-1,[[14,0.2372]]],[41.0677,-85.1601,"Taylor near Pauline","1283",[14],-1,[[33,0.6795]]],[41.1384,-85.1187,"Clinton before Bethany (SB)","256",[17],-1,[[45,0.1507]]],[41.067749,-85.148699,"Taylor at Fox","160",[14],-1,[[33,0.805]]],[41.113645,-85.154235,"Sherman at Louisedale","1022",[12],-1,[[19,0.3695],[23,0.6166]]],[41.074782,-85.155362,"Washington at Nelson (WB)","404",[9],-1,[[4,0.178]]],[41.178101,-85.131131,"Dupont and Coldwater Rd. (NB)","21",[2],-1,[[48,0.5618]]],[41.1114,-85.0608,"Maplecrest at Landmark","342",[3],-1,[[8,0.8921]]],[41.015654,-85.1848,"Hickory Creek Apartments","112",[1],-1,[[49,0.9991],[50,0.0],[51,0.9997],[52,0.0]]],[41.078424,-85.145836,"W Berry St at Fairfield Ave","5yn0",[1,8],-1,[[51,0.1068],[53,0.1151]]],[41.089213,-85.12847,"St. Joseph at Tennessee","945",[0,17],-1,[[2,0.2714],[46,0.2465]]],[41.149822,-85.138081,"Westfield","66",[2,13],-1,[[27,0.0003],[28,0.9999],[48,0.3029],[55,0.0024]]],[41.015295,-85.126405,"Hanna at Hanna Way","1243",[7],-1,[[29,0.1947]]],[41.14709,-85.145274,"FWCS Transportation","20014",[2],1,[[48,0.2352]]],[41.072,-85.13881,"Central Station - Bay Q","central-bay-q",[3,9],-1,[[4,0.0],[7,1.0]]],[41.027988,-85.1125,"Anthony before Hollis","915",[19],-1,[[25,0.3414],[26,0.4309]]],[41.139433,-85.171416,"Ludwig at Country Forest","987665",[11],0,[[15,0.192]]],[41.012495,-85.119957,"Southtown Blvd at Patriot Crossing (SB)","531",[7,19],-1,[[25,0.0126],[26,0.0162],[29,0.014]]],[41.032027,-85.109351,"Paulding at Plaza","619",[10],-1,[[12,0.9303]]],[41.068404,-85.106674,"New Haven at Summer","181",[16],-1,[[38,0.3168]]],[41.074764,-85.145341,"McDonalds (SB)","459",[11],-1,[[15,0.9279],[44,0.9286]]],[41.019505,-85.112371,"Anthony at Seddlemeyer (SB)","906",[19],-1,[[24,0.7374]]],[41.064993,-85.116616,"Creighton near Winter","1134",[19],-1,[[24,0.2592]]],[41.125362,-85.14796,"Industrial and Ley","123461",[11],1,[[15,0.4585],[44,0.4542]]],[41.0117,-85.1691,"Bluffton at St. Louis (NB)","1274",[8],-1,[[54,0.0989]]],[41.080233,-85.141296,"Main at Harrison (WB)","793",[12],-1,[[23,0.115]]],[41.067765,-85.158988,"Taylor at Phenie (WB)","1316",[14],-1,[[34,0.1778]]],[41.078838,-85.129318,"Washington at Hanna (WB)","771",[5],-1,[[16,0.8403],[42,0.8402]]],[41.053966,-85.102719,"McMillen Park","987675",[6],0,[[21,0.4672]]],[41.076667,-85.144247,"Wayne at Library","143",[15],-1,[[35,0.8848]]],[41.069884,-85.034893,"IN-930 E near PNC Bank (EB)","yvbq",[16],-1,[[38,0.8274]]],[41.086193,-85.135497,"Spy Run at Baltes","669",[4,13],-1,[[9,0.1986],[28,0.187]]],[41.070445,-85.149836,"Broadway @ Electric Works","987658",[1,8],1,[[50,0.8081],[52,0.8083],[54,0.8212]]],[41.061055,-85.145137,"Fairfield past Meyer (SB)","591",[10],-1,[[12,0.1411]]],[41.053164,-85.16485,"Brooklyn at Nuttman (SB)","1321",[14],-1,[[34,0.3456]]],[41.039359,-85.136994,"Calhoun at Pettit (SB)","885",[7],-1,[[30,0.4309]]],[41.094392,-85.156177,"St Marys at Margaret","w905",[12],-1,[[22,0.5477]]],[41.046496,-85.137289,"Calhoun at Lexington","880",[7],-1,[[30,0.3377]]],[41.060885,-85.165345,"Brooklyn at Carlton (SB)","1265",[14],-1,[[34,0.2786]]],[41.039,-85.127,"Pettit before Hanna","703",[10],-1,[[11,0.398],[13,0.398]]],[41.042318,-85.132053,"Lafayette at Sherwood","987655",[10],0,[[11,0.4814],[13,0.4814]]],[41.123974,-85.102174,"Canterbury","574",[4],-1,[[10,0.1206]]],[41.108035,-85.060567,"Maplecrest at Vance (NB)","poeq",[3],-1,[[8,0.8611]]],[41.090474,-85.145792,"Wells St. at Huffman St. (SB)","735",[11],-1,[[15,0.7963],[44,0.7889]]],[41.096607,-85.136983,"Spy Run at State","1222",[13],-1,[[28,0.299]]],[41.089864,-85.103332,"Lake at Beacon (EB)","337",[3],-1,[[8,0.3845]]],[41.075014,-85.138402,"Calhoun at Lewis","411",[3,5,12,16],-1,[[8,0.04],[17,0.0434],[23,0.0478],[38,0.0462],[43,0.0434]]],[41.068821,-85.082878,"Rae Magnet Wire","223",[16],-1,[[38,0.4833]]],[41.090571,-85.08159,"Lake and Pine Valley (EB)","848-NEW",[3],-1,[[8,0.5367]]],[41.030511,-85.095895,"Hessen Cassel near Frosch","1198",[6],-1,[[20,0.3027]]],[41.09024,-85.097694,"Lake at Hobson","78",[3],-1,[[7,0.5568]]],[41.0688,-85.0968,"New Haven at Birchwood","196",[16],-1,[[37,0.6247]]],[41.099211,-85.147176,"Wells St. at Lillian Ave. (SB)","817",[11],-1,[[15,0.7238],[44,0.7171]]],[41.068311,-85.180601,"Freeman at Ash Centre","550",[9],-1,[[5,0.5485],[6,0.6595]]],[41.090204,-85.093178,"Lake near Laverne","339",[3],-1,[[8,0.4556]]],[41.068428,-85.145255,"Fairfield at Masterson","1311",[14],-1,[[33,0.8507]]],[41.071579,-85.219263,"Meijer Getz Rd","255",[9,18],-1,[[3,1.0],[4,1.0],[5,0.0001],[6,0.0003],[39,0.9696],[40,0.0285]]],[41.068954,-85.21929,"Getz at Breconshire","254",[9,18],-1,[[3,0.7397],[4,0.9762],[39,0.9235]]],[41.087478,-85.114941,"Anthony at Columbia (NB)","747",[5],-1,[[17,0.335],[43,0.3351]]],[41.06372,-85.114126,"Anthony at Milan (SB)","1080",[19],-1,[[24,0.2925]]],[41.060982,-85.144998,"Boys & Girls Club","713",[10],-1,[[11,0.802],[13,0.8021]]],[41.079764,-85.143072,"Senior Community Center","954",[12],-1,[[22,0.8464]]],[41.122499,-85.099851,"St. Joe at Broyles (NE corner)","1184",[4],-1,[[9,0.9131]]],[41.034536,-85.113026,"Anthony Plaza (SB)","1099",[19],-1,[[24,0.5861]]],[41.06075,-85.126801,"Pontiac at Weisser Park","926",[19],-1,[[25,0.7352],[26,0.9275]]],[41.036377,-85.166123,"Winchester Woods Apartments","760",[1,8],-1,[[50,0.3416],[52,0.3418],[54,0.3863]]],[41.112273,-85.135625,"Fernhill at Target","540",[13],-1,[[27,0.5495]]],[41.067741,-85.151837,"Dollar General","159",[14],-1,[[33,0.7704]]],[41.093601,-85.079331,"Reed at Heatherwind (SB)","857",[3],-1,[[7,0.3848]]],[41.097416,-85.093945,"State at Laverne","781",[5],-1,[[17,0.5905],[43,0.5906]]],[41.017704,-85.115021,"Tall Oaks Apartments (SB)","1170",[7],-1,[[30,0.8766]]],[41.038889,-85.248431,"Lutheran Hospital","39",[18],-1,[[40,0.6105],[41,0.0]]],[41.074426,-85.204613,"Illinois near T-Mobile","257",[9],-1,[[5,0.1456],[6,0.1763]]],[41.116389,-85.135133,"Coldwater before Coliseum","yck4",[13],-1,[[28,0.6468]]]]};
  window.HavenBus = { routes: DATA.routes, stops: DATA.stops };
  if (typeof L === "undefined") return;
  var KEY_ON = "haven_busstops_on";

  var es = function () { try { return (localStorage.getItem("haven_lang") || "").indexOf("es") === 0; } catch (e) { return false; } };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var getOn = function () { try { var v = localStorage.getItem(KEY_ON); return v === null ? false : v === "1"; } catch (e) { return false; } };
  var setSaved = function (v) { try { localStorage.setItem(KEY_ON, v ? "1" : "0"); } catch (e) {} };

  var layer = null, on = false, btn, note, card, routeLayer = null, cur = null, focus = -1, decoded = {};

  /* ---------- polyline helpers ---------- */
  function decode(str) {
    var i = 0, lat = 0, lng = 0, out = [];
    while (i < str.length) {
      var b, sh = 0, r = 0;
      do { b = str.charCodeAt(i++) - 63; r |= (b & 31) << sh; sh += 5; } while (b >= 32);
      lat += (r & 1) ? ~(r >> 1) : (r >> 1); sh = 0; r = 0;
      do { b = str.charCodeAt(i++) - 63; r |= (b & 31) << sh; sh += 5; } while (b >= 32);
      lng += (r & 1) ? ~(r >> 1) : (r >> 1);
      out.push([lat / 1e5, lng / 1e5]);
    }
    return out;
  }
  var dist = function (a, b) { var dy = (b[0] - a[0]) * 110540, dx = (b[1] - a[1]) * 111320 * Math.cos(a[0] * Math.PI / 180); return Math.sqrt(dx * dx + dy * dy); };
  function shapePts(i) {
    if (decoded[i]) return decoded[i];
    var p = decode(DATA.shapes[i][1]), cum = [0];
    for (var k = 1; k < p.length; k++) cum.push(cum[k - 1] + dist(p[k - 1], p[k]));
    return (decoded[i] = { p: p, cum: cum, len: cum[cum.length - 1] });
  }
  /* split a shape at the stop: [behind, ahead] */
  function split(i, frac) {
    var s = shapePts(i), target = Math.max(0, Math.min(1, frac)) * s.len, k = 1;
    while (k < s.cum.length - 1 && s.cum[k] < target) k++;
    var a = s.p[k - 1], b = s.p[k], seg = s.cum[k] - s.cum[k - 1], t = seg ? (target - s.cum[k - 1]) / seg : 0;
    var m = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    return [s.p.slice(0, k).concat([m]), [m].concat(s.p.slice(k))];
  }
  function bearing(a, b) {
    var dy = b[0] - a[0], dx = (b[1] - a[1]) * Math.cos(a[0] * Math.PI / 180);
    return (Math.atan2(dx, dy) * 180 / Math.PI + 360) % 360;
  }

  /* ---------- UI ---------- */
  function build() {
    var tab = document.getElementById("map-wrap") || document.getElementById("tab-map"); if (!tab) return;
    var css = document.createElement("style");
    css.textContent =
      "#busBtn{position:absolute;right:10px;top:172px;z-index:500;width:48px;height:48px;border-radius:16px;font-size:calc(20px*var(--ts,1));border:1px solid var(--line,#334);background:var(--glass2,rgba(20,26,40,.9));box-shadow:var(--sh1,0 6px 18px rgba(0,0,0,.35));cursor:pointer}" +
      "#busBtn.on{background:#22d3ee;border-color:#fff}" +
      "#busNote{position:absolute;left:50%;transform:translateX(-50%);top:228px;z-index:700;max-width:86%;padding:8px 14px;border-radius:14px;font-size:calc(13px*var(--ts,1));background:rgba(10,14,23,.92);color:#fff;display:none;text-align:center}" +
      ".bstop{width:22px;height:22px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;font-size:calc(12px*var(--ts,1));line-height:1}" +
      ".bstop-cl.marker-cluster div{background:#0e7490;color:#fff;font-weight:700}" +
      ".bstop-cl.marker-cluster{background:rgba(34,211,238,.45)}" +
      ".brt{display:inline-block;padding:1px 8px;border-radius:9px;color:#fff;font-size:calc(12px*var(--ts,1));font-weight:800;white-space:nowrap}" +
      ".barrow{font-size:calc(15px*var(--ts,1));line-height:15px;text-align:center;color:#fff;text-shadow:0 0 3px #000,0 0 3px #000;pointer-events:none}" +
      ".bflag{font-size:calc(22px*var(--ts,1));line-height:22px;text-shadow:0 1px 3px #000;pointer-events:none}" +
      "#busCard{position:absolute;left:10px;right:10px;bottom:10px;z-index:800;padding:10px 12px;border-radius:16px;background:var(--glass2,rgba(20,27,46,.97));color:var(--txt,#fff);border:1px solid var(--line,#334);box-shadow:0 8px 24px rgba(0,0,0,.45);display:none;font-size:calc(13px*var(--ts,1))}" +
      "#busCard .bc-h{display:flex;align-items:center;gap:8px}#busCard .bc-h b{flex:1;font-size:calc(14px*var(--ts,1));line-height:1.2}" +
      "#busCard .bc-x{border:0;background:rgba(127,127,127,.25);color:inherit;border-radius:50%;width:28px;height:28px;font-size:calc(14px*var(--ts,1))}" +
      "#busCard .bc-rows{margin-top:6px;max-height:112px;overflow:auto}" +
      "#busCard .bc-row{display:flex;align-items:center;gap:6px;width:100%;text-align:left;border:1.5px solid transparent;background:rgba(127,127,127,.14);color:inherit;border-radius:10px;padding:5px 7px;margin-bottom:4px;font-size:calc(12.5px*var(--ts,1))}" +
      "#busCard .bc-row.sel{border-color:#22d3ee}" +
      "#busCard .bc-a{display:flex;gap:8px;margin-top:4px;flex-wrap:wrap}" +
      "#busCard .bc-a button,#busCard .bc-a a{border:0;border-radius:10px;padding:6px 10px;background:rgba(34,211,238,.2);color:inherit;font-size:calc(12.5px*var(--ts,1));text-decoration:none}";
    document.head.appendChild(css);
    btn = document.createElement("button"); btn.id = "busBtn"; btn.textContent = "🚏";
    btn.setAttribute("aria-label", es() ? "Paradas de autobús" : "Bus stops");
    btn.onclick = function () { setOn(!on, true); };
    note = document.createElement("div"); note.id = "busNote";
    card = document.createElement("div"); card.id = "busCard";
    ["click", "dblclick", "mousedown", "touchstart", "wheel"].forEach(function (ev) { card.addEventListener(ev, function (e) { e.stopPropagation(); }); });
    if (L.DomEvent) { L.DomEvent.disableClickPropagation(card); L.DomEvent.disableScrollPropagation(card); }
    tab.appendChild(btn); tab.appendChild(note); tab.appendChild(card);
  }
  function say(msg, ms) {
    if (!note) return; note.textContent = msg; note.style.display = "block";
    clearTimeout(say.t); if (ms) say.t = setTimeout(function () { note.style.display = "none"; }, ms);
  }

  /* ---------- route drawing ---------- */
  function clearRoute() {
    if (routeLayer) { map.removeLayer(routeLayer); routeLayer = null; }
    cur = null; focus = -1; if (card) card.style.display = "none";
  }
  function drawRoute() {
    if (routeLayer) map.removeLayer(routeLayer);
    routeLayer = L.layerGroup().addTo(map);
    var all = [];
    cur.stop[6].forEach(function (sf) {
      if (focus >= 0 && sf[0] !== focus) return;
      var sh = DATA.shapes[sf[0]], col = DATA.routes[sh[0]][2], parts = split(sf[0], sf[1]), behind = parts[0], ahead = parts[1];
      L.polyline(behind, { color: col, weight: 4, opacity: .35, dashArray: "2 8", interactive: false }).addTo(routeLayer);
      L.polyline(ahead, { color: "#fff", weight: 9, opacity: .9, interactive: false }).addTo(routeLayer);
      L.polyline(ahead, { color: col, weight: 5, opacity: 1, interactive: false }).addTo(routeLayer);
      // direction arrows about every 700 m
      var acc = 450;
      for (var k = 1; k < ahead.length; k++) {
        var d = dist(ahead[k - 1], ahead[k]); acc += d;
        if (acc >= 700 && d > 15) {
          acc = 0;
          L.marker(ahead[k], { interactive: false, keyboard: false, icon: L.divIcon({ className: "", iconSize: [16, 16], iconAnchor: [8, 8], html: '<div class="barrow" style="transform:rotate(' + bearing(ahead[k - 1], ahead[k]).toFixed(0) + 'deg)">▲</div>' }) }).addTo(routeLayer);
        }
      }
      L.marker(ahead[ahead.length - 1], { interactive: false, keyboard: false, zIndexOffset: 300, icon: L.divIcon({ className: "", iconSize: [22, 22], iconAnchor: [4, 20], html: '<div class="bflag">🏁</div>' }) }).addTo(routeLayer);
      all = all.concat(ahead);
    });
    return all;
  }
  function fit(pts) {
    if (!pts.length) return;
    try { map.fitBounds(L.latLngBounds(pts), { paddingTopLeft: [28, 90], paddingBottomRight: [28, 230], maxZoom: 15, animate: true }); } catch (e) {}
  }
  function renderCard() {
    var s = cur.stop;
    var rows = s[6].map(function (sf) {
      var sh = DATA.shapes[sf[0]], r = DATA.routes[sh[0]];
      return '<button class="bc-row' + (focus === sf[0] ? " sel" : "") + '" data-i="' + sf[0] + '"><span class="brt" style="background:' + r[2] + '">' + esc(r[0]) + "</span><span>" + esc(r[1]) +
        ' → <b>' + esc(sh[2]) + "</b></span></button>";
    }).join("");
    var dir = "https://www.google.com/maps/dir/?api=1&travelmode=transit&destination=" + s[0] + "," + s[1];
    card.innerHTML =
      '<div class="bc-h"><b>🚏 ' + esc(s[2]) + (s[5] === 1 ? " ♿" : "") + '</b><button class="bc-x" aria-label="Close">✕</button></div>' +
      '<div class="bc-rows">' + rows + "</div>" +
      '<div class="bc-a"><button data-act="fit">🗺 ' + (es() ? "Ver toda la ruta" : "Show whole route") + '</button><a href="' + dir + '" data-hv-go="walk" data-lat="' + s[0] + '" data-lng="' + s[1] + '" data-name="' + esc(s[2]) + '">🧭 ' + (es() ? "Cómo llegar" : "Directions") + "</a></div>" +
      '<div style="font-size:calc(11px*var(--ts,1));opacity:.65;margin-top:4px">' + (es() ? "Parada " : "Stop ") + esc(s[3]) + " · Citilink · " + (es() ? "▲ = dirección del autobús, línea punteada = ya pasó" : "▲ = bus direction, dotted = already passed") + "</div>";
    card.style.display = "block";
    card.querySelector(".bc-x").onclick = clearRoute;
    card.querySelector('[data-act="fit"]').onclick = function () { fit(drawRoute()); };
    Array.prototype.forEach.call(card.querySelectorAll(".bc-row"), function (b) {
      b.onclick = function () { var i = +b.dataset.i; focus = focus === i ? -1 : i; renderCard(); fit(drawRoute()); };
    });
  }
  function showStop(s) {
    try { if (typeof hidePeek === "function") hidePeek(); } catch (e) {}
    cur = { stop: s }; focus = -1; renderCard();
    fit(drawRoute());
  }

  /* ---------- stop pins ---------- */
  function make() {
    layer = L.markerClusterGroup({
      hvBus: true, /* tells gm-pins.js not to force-disable clustering for the bus layer */
      showCoverageOnHover: false, spiderfyOnMaxZoom: false, chunkedLoading: true,
      maxClusterRadius: function (z) { var ps = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--ps")) || 1; return Math.round((z < 14 ? 80 : 56) * Math.min(Math.max(ps, 1), 2.5)); },
      disableClusteringAtZoom: 17,
      iconCreateFunction: function (c) { return L.divIcon({ html: '<div class="hv-bsc">🚌<b>' + c.getChildCount() + '</b></div>', className: "hv-bscw", iconSize: [54, 28], iconAnchor: [27, 14] }); }
    });
    var ms = DATA.stops.map(function (s) {
      var col = s[4].length ? DATA.routes[s[4][0]][2] : "#22d3ee";
      var icon = L.divIcon({ className: "mk", html: '<div class="bstop" style="background:' + col + '">🚌</div>', iconSize: [22, 22], iconAnchor: [11, 11] });
      var m = L.marker([s[0], s[1]], { icon: icon, zIndexOffset: -200, title: s[2] });
      m.on("click", function (e) { if (e.originalEvent) L.DomEvent.stopPropagation(e); showStop(s); });
      return m;
    });
    layer.addLayers(ms);
  }
  function setOn(v, announce) {
    on = v; btn.classList.toggle("on", on); setSaved(on);
    if (!on) { clearRoute(); if (layer) map.removeLayer(layer); if (announce) say(es() ? "Paradas ocultas" : "Bus stops hidden", 1500); return; }
    if (!layer) make();
    map.addLayer(layer);
    if (announce) say("🚏 " + DATA.stops.length + (es() ? " paradas. Toca una para ver su ruta" : " Citilink stops. Tap one to see its route"), 3000);
  }

  /* ---------- website: Citilink stops are Fort Wayne-only; hide in Portland ---------- */
  function busAreaSync() {
    var fw = true;
    try { fw = !(typeof getArea === "function") || getArea() !== "portland"; } catch (e) {}
    if (btn) btn.style.display = fw ? "" : "none";
    if (!fw && on) {
      try { if (layer) map.removeLayer(layer); } catch (e) {}
      on = false; if (btn) btn.classList.remove("on"); clearRoute();
    }
  }
  try {
    if (typeof applyArea === "function" && !applyArea.__busWrapped) {
      var _aaBus = applyArea;
      applyArea = function () { _aaBus(); try { busAreaSync(); } catch (e) {} };
      applyArea.__busWrapped = true;
    }
  } catch (e) {}
  function start() {
    if (typeof map === "undefined" || !map) { setTimeout(start, 200); return; }
    build();
    map.on("click", function () { if (cur) clearRoute(); });
    if (getOn()) setOn(true, false);
    try { busAreaSync(); } catch (e) {}
  }
  if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", start); else start();
})();

/* ===== bustimes.js ===== */
/* Citilink departures — official GTFS feed, updated Sep 1 2026, valid through Dec 31 2026.
   Per stop_id: flat [minutes, routeIdx, svc, ...] sorted by minutes. svc: 1=Mon-Fri, 2=Saturday. No Sunday service. */
"use strict";
window.HavenBusTimes={"417":[340,0,1,459,0,1,460,0,1,460,0,2,579,0,1,579,0,2,580,0,1,580,0,2,699,0,1,699,0,2,700,0,1,700,0,2,819,0,1,819,0,2,820,0,1,820,0,2,939,0,1,939,0,2,940,0,1,940,0,2,1059,0,1,1059,0,2,1060,0,1,1060,0,2,1179,0,1,1180,0,1],"1028":[343,0,1,405,17,1,463,0,1,463,0,2,525,17,1,525,17,2,583,0,1,583,0,2,645,17,1,645,17,2,703,0,1,703,0,2,765,17,1,765,17,2,823,0,1,823,0,2,885,17,1,885,17,2,943,0,1,943,0,2,1005,17,1,1005,17,2,1063,0,1,1063,0,2,1125,17,1,1183,0,1],"265":[344,0,1,406,17,1,464,0,1,464,0,2,526,17,1,526,17,2,584,0,1,584,0,2,646,17,1,646,17,2,704,0,1,704,0,2,766,17,1,766,17,2,824,0,1,824,0,2,886,17,1,886,17,2,944,0,1,944,0,2,1006,17,1,1006,17,2,1064,0,1,1064,0,2,1126,17,1,1184,0,1],"269":[346,0,1,407,17,1,466,0,1,466,0,2,527,17,1,527,17,2,586,0,1,586,0,2,647,17,1,647,17,2,706,0,1,706,0,2,767,17,1,767,17,2,826,0,1,826,0,2,887,17,1,887,17,2,946,0,1,946,0,2,1007,17,1,1007,17,2,1066,0,1,1066,0,2,1127,17,1,1186,0,1],"1118":[348,0,1,392,17,1,408,17,1,451,0,1,468,0,1,468,0,2,512,17,1,512,17,2,528,17,1,528,17,2,571,0,1,571,0,2,588,0,1,588,0,2,632,17,1,632,17,2,648,17,1,648,17,2,691,0,1,691,0,2,708,0,1,708,0,2,752,17,1,752,17,2,768,17,1,768,17,2,811,0,1,811,0,2,828,0,1,828,0,2,872,17,1,872,17,2,888,17,1,888,17,2,931,0,1,931,0,2,948,0,1,948,0,2,992,17,1,992,17,2,1008,17,1,1008,17,2,1051,0,1,1051,0,2,1068,0,1,1068,0,2,1112,17,1,1128,17,1,1171,0,1,1188,0,1,1232,17,1],"1001":[350,0,1,410,17,1,470,0,1,470,0,2,530,17,1,530,17,2,590,0,1,590,0,2,650,17,1,650,17,2,710,0,1,710,0,2,770,17,1,770,17,2,830,0,1,830,0,2,890,17,1,890,17,2,950,0,1,950,0,2,1010,17,1,1010,17,2,1070,0,1,1070,0,2,1130,17,1,1190,0,1],"418":[350,0,1,410,17,1,470,0,1,470,0,2,530,17,1,530,17,2,590,0,1,590,0,2,650,17,1,650,17,2,710,0,1,710,0,2,770,17,1,770,17,2,830,0,1,830,0,2,890,17,1,890,17,2,950,0,1,950,0,2,1010,17,1,1010,17,2,1070,0,1,1070,0,2,1130,17,1,1190,0,1],"302":[351,0,1,411,17,1,471,0,1,471,0,2,531,17,1,531,17,2,591,0,1,591,0,2,651,17,1,651,17,2,711,0,1,711,0,2,771,17,1,771,17,2,831,0,1,831,0,2,891,17,1,891,17,2,951,0,1,951,0,2,1011,17,1,1011,17,2,1071,0,1,1071,0,2,1131,17,1,1191,0,1],"322":[352,0,1,412,17,1,472,0,1,472,0,2,532,17,1,532,17,2,592,0,1,592,0,2,652,17,1,652,17,2,712,0,1,712,0,2,772,17,1,772,17,2,832,0,1,832,0,2,892,17,1,892,17,2,952,0,1,952,0,2,1012,17,1,1012,17,2,1072,0,1,1072,0,2,1132,17,1,1192,0,1],"351":[353,0,1,413,17,1,473,0,1,473,0,2,533,17,1,533,17,2,593,0,1,593,0,2,653,17,1,653,17,2,713,0,1,713,0,2,773,17,1,773,17,2,833,0,1,833,0,2,893,17,1,893,17,2,953,0,1,953,0,2,1013,17,1,1013,17,2,1073,0,1,1073,0,2,1133,17,1,1193,0,1],"558":[354,0,1,414,17,1,474,0,1,474,0,2,534,17,1,534,17,2,594,0,1,594,0,2,654,17,1,654,17,2,714,0,1,714,0,2,774,17,1,774,17,2,834,0,1,834,0,2,894,17,1,894,17,2,954,0,1,954,0,2,1014,17,1,1014,17,2,1074,0,1,1074,0,2,1134,17,1,1194,0,1],"1055":[354,0,1,414,17,1,474,0,1,474,0,2,534,17,1,534,17,2,594,0,1,594,0,2,654,17,1,654,17,2,714,0,1,714,0,2,774,17,1,774,17,2,834,0,1,834,0,2,894,17,1,894,17,2,954,0,1,954,0,2,1014,17,1,1014,17,2,1074,0,1,1074,0,2,1134,17,1,1194,0,1],"578":[355,0,1,415,17,1,475,0,1,475,0,2,535,17,1,535,17,2,595,0,1,595,0,2,655,17,1,655,17,2,715,0,1,715,0,2,775,17,1,775,17,2,835,0,1,835,0,2,895,17,1,895,17,2,955,0,1,955,0,2,1015,17,1,1015,17,2,1075,0,1,1075,0,2,1135,17,1,1195,0,1],"419":[355,0,1,415,17,1,475,0,1,475,0,2,535,17,1,535,17,2,595,0,1,595,0,2,655,17,1,655,17,2,715,0,1,715,0,2,775,17,1,775,17,2,835,0,1,835,0,2,895,17,1,895,17,2,955,0,1,955,0,2,1015,17,1,1015,17,2,1075,0,1,1075,0,2,1135,17,1,1195,0,1],"1065":[357,0,1,357,4,1,416,17,1,417,4,1,477,0,1,477,0,2,477,4,1,477,4,2,536,17,1,536,17,2,537,4,1,537,4,2,597,0,1,597,0,2,597,4,1,597,4,2,656,17,1,656,17,2,657,4,1,657,4,2,717,0,1,717,0,2,717,4,1,717,4,2,776,17,1,776,17,2,777,4,1,777,4,2,837,0,1,837,0,2,837,4,1,837,4,2,896,17,1,896,17,2,897,4,1,897,4,2,957,0,1,957,0,2,957,4,1,957,4,2,1016,17,1,1016,17,2,1017,4,1,1017,4,2,1077,0,1,1077,0,2,1077,4,1,1077,4,2,1136,17,1,1137,4,1,1197,0,1,1197,4,1],"1187":[361,3,1,361,4,1,362,0,1,421,3,1,421,4,1,421,17,1,481,3,1,481,3,2,481,4,1,481,4,2,482,0,1,482,0,2,541,3,1,541,3,2,541,4,1,541,4,2,541,17,1,541,17,2,601,3,1,601,3,2,601,4,1,601,4,2,602,0,1,602,0,2,661,3,1,661,3,2,661,4,1,661,4,2,661,17,1,661,17,2,721,3,1,721,3,2,721,4,1,721,4,2,722,0,1,722,0,2,781,3,1,781,3,2,781,4,1,781,4,2,781,17,1,781,17,2,841,3,1,841,3,2,841,4,1,841,4,2,842,0,1,842,0,2,901,3,1,901,3,2,901,4,1,901,4,2,901,17,1,901,17,2,961,3,1,961,3,2,961,4,1,961,4,2,962,0,1,962,0,2,1021,3,1,1021,3,2,1021,4,1,1021,4,2,1021,17,1,1021,17,2,1081,3,1,1081,3,2,1081,4,1,1081,4,2,1082,0,1,1082,0,2,1141,3,1,1141,4,1,1141,17,1,1201,3,1,1201,4,1,1202,0,1],"475":[362,3,1,362,4,1,362,13,1,363,0,1,422,3,1,422,4,1,422,13,1,422,17,1,482,3,1,482,3,2,482,4,1,482,4,2,482,13,1,482,13,2,483,0,1,483,0,2,542,3,1,542,3,2,542,4,1,542,4,2,542,13,1,542,13,2,542,17,1,542,17,2,572,13,1,602,3,1,602,3,2,602,4,1,602,4,2,602,13,1,602,13,2,603,0,1,603,0,2,632,13,1,662,3,1,662,3,2,662,4,1,662,4,2,662,13,1,662,13,2,662,17,1,662,17,2,692,13,1,722,3,1,722,3,2,722,4,1,722,4,2,722,13,1,722,13,2,723,0,1,723,0,2,752,13,1,782,3,1,782,3,2,782,4,1,782,4,2,782,13,1,782,13,2,782,17,1,782,17,2,812,13,1,842,3,1,842,3,2,842,4,1,842,4,2,842,13,1,842,13,2,843,0,1,843,0,2,872,13,1,902,3,1,902,3,2,902,4,1,902,4,2,902,13,1,902,13,2,902,17,1,902,17,2,932,13,1,962,3,1,962,3,2,962,4,1,962,4,2,962,13,1,962,13,2,963,0,1,963,0,2,992,13,1,1022,3,1,1022,3,2,1022,4,1,1022,4,2,1022,13,1,1022,13,2,1022,17,1,1022,17,2,1082,3,1,1082,3,2,1082,4,1,1082,4,2,1082,13,1,1082,13,2,1083,0,1,1083,0,2,1142,3,1,1142,4,1,1142,13,1,1142,17,1,1202,3,1,1202,4,1,1202,13,1,1203,0,1],"476":[362,3,1,362,4,1,362,13,1,364,0,1,422,3,1,422,4,1,422,17,1,423,13,1,482,3,1,482,3,2,482,4,1,482,4,2,482,13,2,483,13,1,484,0,1,484,0,2,542,3,1,542,3,2,542,4,1,542,4,2,542,13,2,542,17,1,542,17,2,543,13,1,572,13,1,602,3,1,602,3,2,602,4,1,602,4,2,602,13,2,603,13,1,604,0,1,604,0,2,632,13,1,662,3,1,662,3,2,662,4,1,662,4,2,662,13,2,662,17,1,662,17,2,663,13,1,692,13,1,722,3,1,722,3,2,722,4,1,722,4,2,722,13,2,723,13,1,724,0,1,724,0,2,752,13,1,782,3,1,782,3,2,782,4,1,782,4,2,782,13,2,782,17,1,782,17,2,783,13,1,812,13,1,842,3,1,842,3,2,842,4,1,842,4,2,842,13,2,843,13,1,844,0,1,844,0,2,872,13,1,902,3,1,902,3,2,902,4,1,902,4,2,902,13,2,902,17,1,902,17,2,903,13,1,932,13,1,962,3,1,962,3,2,962,4,1,962,4,2,962,13,2,963,13,1,964,0,1,964,0,2,992,13,1,1022,3,1,1022,3,2,1022,4,1,1022,4,2,1022,13,2,1022,17,1,1022,17,2,1023,13,1,1082,3,1,1082,3,2,1082,4,1,1082,4,2,1082,13,2,1083,13,1,1084,0,1,1084,0,2,1142,3,1,1142,4,1,1142,17,1,1143,13,1,1202,3,1,1202,4,1,1203,13,1,1204,0,1],"450":[363,4,1,363,13,1,365,0,1,365,5,1,423,4,1,423,13,1,423,17,1,425,5,1,483,4,1,483,4,2,483,13,1,483,13,2,485,0,1,485,0,2,485,5,1,485,5,2,543,4,1,543,4,2,543,13,1,543,13,2,543,17,1,543,17,2,545,5,1,545,5,2,573,13,1,575,5,1,603,4,1,603,4,2,603,13,1,603,13,2,605,0,1,605,0,2,605,5,1,605,5,2,633,13,1,635,5,1,663,4,1,663,4,2,663,13,1,663,13,2,663,17,1,663,17,2,665,5,1,665,5,2,693,13,1,695,5,1,723,4,1,723,4,2,723,13,1,723,13,2,725,0,1,725,0,2,725,5,1,725,5,2,753,13,1,755,5,1,783,4,1,783,4,2,783,13,1,783,13,2,783,17,1,783,17,2,785,5,1,785,5,2,813,13,1,815,5,1,843,4,1,843,4,2,843,13,1,843,13,2,845,0,1,845,0,2,845,5,1,845,5,2,873,13,1,875,5,1,903,4,1,903,4,2,903,13,1,903,13,2,903,17,1,903,17,2,905,5,1,905,5,2,933,13,1,935,5,1,963,4,1,963,4,2,963,13,1,963,13,2,965,0,1,965,0,2,965,5,1,965,5,2,993,13,1,995,5,1,1023,4,1,1023,4,2,1023,13,1,1023,13,2,1023,17,1,1023,17,2,1025,5,1,1025,5,2,1083,4,1,1083,4,2,1083,13,1,1083,13,2,1085,0,1,1085,0,2,1085,5,1,1085,5,2,1143,4,1,1143,13,1,1143,17,1,1145,5,1,1203,4,1,1203,13,1,1205,0,1,1205,5,1],"central-bay-D":[367,0,1,375,8,1,425,17,1,435,1,1,487,0,1,487,0,2,495,1,2,495,8,1,545,17,1,545,17,2,555,1,1,555,1,2,607,0,1,607,0,2,615,1,2,615,8,1,665,17,1,665,17,2,675,1,1,675,1,2,727,0,1,727,0,2,735,1,2,735,8,1,785,17,1,785,17,2,795,1,1,795,1,2,847,0,1,847,0,2,855,1,2,855,8,1,905,17,1,905,17,2,915,1,1,915,1,2,967,0,1,967,0,2,975,1,2,975,8,1,1025,17,1,1025,17,2,1035,1,1,1035,1,2,1087,0,1,1087,0,2,1095,1,1,1145,17,1,1155,1,1,1207,0,1,1215,1,1],"central-bay-M":[364,1,1,375,17,1,424,8,1,435,0,1,484,1,1,484,1,2,495,17,1,495,17,2,544,1,2,544,8,1,555,0,1,555,0,2,604,1,1,604,1,2,615,17,1,615,17,2,664,1,2,664,8,1,675,0,1,675,0,2,724,1,1,724,1,2,735,17,1,735,17,2,784,1,2,784,8,1,795,0,1,795,0,2,844,1,1,844,1,2,855,17,1,855,17,2,904,1,2,904,8,1,915,0,1,915,0,2,964,1,1,964,1,2,975,17,1,975,17,2,1024,1,2,1024,8,1,1035,0,1,1035,0,2,1084,1,1,1084,1,2,1095,17,1,1144,1,1,1155,0,1,1204,1,1,1215,17,1],"162":[376,3,1,377,16,1,377,17,1,436,3,1,437,0,1,437,16,1,496,3,1,497,3,2,497,16,1,497,16,2,497,17,1,497,17,2,556,3,1,557,0,1,557,0,2,557,3,2,557,16,1,557,16,2,616,3,1,617,3,2,617,16,1,617,16,2,617,17,1,617,17,2,676,3,1,677,0,1,677,0,2,677,3,2,677,16,1,677,16,2,736,3,1,737,3,2,737,16,1,737,16,2,737,17,1,737,17,2,796,3,1,797,0,1,797,0,2,797,3,2,797,16,1,797,16,2,856,3,1,857,3,2,857,16,1,857,16,2,857,17,1,857,17,2,916,3,1,917,0,1,917,0,2,917,3,2,917,16,1,917,16,2,976,3,1,977,3,2,977,16,1,977,16,2,977,17,1,977,17,2,1036,3,1,1037,0,1,1037,0,2,1037,3,2,1037,16,1,1037,16,2,1096,3,1,1097,16,1,1097,17,1,1156,3,1,1157,0,1,1157,16,1,1216,3,1,1217,16,1,1217,17,1],"165":[377,3,1,377,16,1,377,17,1,437,0,1,437,3,1,437,16,1,497,3,1,497,3,2,497,16,1,497,16,2,497,17,1,497,17,2,557,0,1,557,0,2,557,3,1,557,3,2,557,16,1,557,16,2,617,3,1,617,3,2,617,16,1,617,16,2,617,17,1,617,17,2,677,0,1,677,0,2,677,3,1,677,3,2,677,16,1,677,16,2,737,3,1,737,3,2,737,16,1,737,16,2,737,17,1,737,17,2,797,0,1,797,0,2,797,3,1,797,3,2,797,16,1,797,16,2,857,3,1,857,3,2,857,16,1,857,16,2,857,17,1,857,17,2,917,0,1,917,0,2,917,3,1,917,3,2,917,16,1,917,16,2,977,3,1,977,3,2,977,16,1,977,16,2,977,17,1,977,17,2,1037,0,1,1037,0,2,1037,3,1,1037,3,2,1037,16,1,1037,16,2,1097,3,1,1097,16,1,1097,17,1,1157,0,1,1157,3,1,1157,16,1,1217,3,1,1217,16,1,1217,17,1],"438":[377,3,1,378,16,1,378,17,1,437,3,1,438,0,1,438,16,1,497,3,1,497,3,2,498,16,1,498,16,2,498,17,1,498,17,2,557,3,1,557,3,2,558,0,1,558,0,2,558,16,1,558,16,2,617,3,1,617,3,2,618,16,1,618,16,2,618,17,1,618,17,2,677,3,1,677,3,2,678,0,1,678,0,2,678,16,1,678,16,2,737,3,1,737,3,2,738,16,1,738,16,2,738,17,1,738,17,2,797,3,1,797,3,2,798,0,1,798,0,2,798,16,1,798,16,2,857,3,1,857,3,2,858,16,1,858,16,2,858,17,1,858,17,2,917,3,1,917,3,2,918,0,1,918,0,2,918,16,1,918,16,2,977,3,1,977,3,2,978,16,1,978,16,2,978,17,1,978,17,2,1037,3,1,1037,3,2,1038,0,1,1038,0,2,1038,16,1,1038,16,2,1097,3,1,1098,16,1,1098,17,1,1157,3,1,1158,0,1,1158,16,1,1217,3,1,1218,16,1,1218,17,1],"415":[377,3,1,378,17,1,437,3,1,438,0,1,497,3,1,498,3,2,498,17,1,498,17,2,557,3,1,558,0,1,558,0,2,558,3,2,617,3,1,618,3,2,618,17,1,618,17,2,677,3,1,678,0,1,678,0,2,678,3,2,737,3,1,738,3,2,738,17,1,738,17,2,797,3,1,798,0,1,798,0,2,798,3,2,857,3,1,858,3,2,858,17,1,858,17,2,917,3,1,918,0,1,918,0,2,918,3,2,977,3,1,978,3,2,978,17,1,978,17,2,1037,3,1,1038,0,1,1038,0,2,1038,3,2,1097,3,1,1098,17,1,1157,3,1,1158,0,1,1217,3,1,1218,17,1],"416":[378,3,1,379,17,1,438,3,1,439,0,1,498,3,1,498,3,2,499,17,1,499,17,2,558,3,1,558,3,2,559,0,1,559,0,2,618,3,1,618,3,2,619,17,1,619,17,2,678,3,1,678,3,2,679,0,1,679,0,2,738,3,1,738,3,2,739,17,1,739,17,2,798,3,1,798,3,2,799,0,1,799,0,2,858,3,1,858,3,2,859,17,1,859,17,2,918,3,1,918,3,2,919,0,1,919,0,2,978,3,1,978,3,2,979,17,1,979,17,2,1038,3,1,1038,3,2,1039,0,1,1039,0,2,1098,3,1,1099,17,1,1158,3,1,1159,0,1,1218,3,1,1219,17,1],"930":[381,17,1,441,0,1,501,17,1,501,17,2,561,0,1,561,0,2,621,17,1,621,17,2,681,0,1,681,0,2,741,17,1,741,17,2,801,0,1,801,0,2,861,17,1,861,17,2,921,0,1,921,0,2,981,17,1,981,17,2,1041,0,1,1041,0,2,1101,17,1,1161,0,1,1221,17,1],"940":[382,17,1,442,0,1,502,17,1,502,17,2,562,0,1,562,0,2,622,17,1,622,17,2,682,0,1,682,0,2,742,17,1,742,17,2,802,0,1,802,0,2,862,17,1,862,17,2,922,0,1,922,0,2,982,17,1,982,17,2,1042,0,1,1042,0,2,1102,17,1,1162,0,1,1222,17,1],"945":[383,17,1,443,0,1,503,17,1,503,17,2,563,0,1,563,0,2,623,17,1,623,17,2,683,0,1,683,0,2,743,17,1,743,17,2,803,0,1,803,0,2,863,17,1,863,17,2,923,0,1,923,0,2,983,17,1,983,17,2,1043,0,1,1043,0,2,1103,17,1,1163,0,1,1223,17,1],"340":[384,17,1,444,0,1,504,17,1,504,17,2,564,0,1,564,0,2,624,17,1,624,17,2,684,0,1,684,0,2,744,17,1,744,17,2,804,0,1,804,0,2,864,17,1,864,17,2,924,0,1,924,0,2,984,17,1,984,17,2,1044,0,1,1044,0,2,1104,17,1,1164,0,1,1224,17,1],"5":[385,17,1,445,0,1,505,17,1,505,17,2,565,0,1,565,0,2,625,17,1,625,17,2,685,0,1,685,0,2,745,17,1,745,17,2,805,0,1,805,0,2,865,17,1,865,17,2,925,0,1,925,0,2,985,17,1,985,17,2,1045,0,1,1045,0,2,1105,17,1,1165,0,1,1225,17,1],"963":[385,17,1,445,0,1,505,17,1,505,17,2,565,0,1,565,0,2,625,17,1,625,17,2,685,0,1,685,0,2,745,17,1,745,17,2,805,0,1,805,0,2,865,17,1,865,17,2,925,0,1,925,0,2,985,17,1,985,17,2,1045,0,1,1045,0,2,1105,17,1,1165,0,1,1225,17,1],"1053":[386,17,1,446,0,1,506,17,1,506,17,2,566,0,1,566,0,2,626,17,1,626,17,2,686,0,1,686,0,2,746,17,1,746,17,2,806,0,1,806,0,2,866,17,1,866,17,2,926,0,1,926,0,2,986,17,1,986,17,2,1046,0,1,1046,0,2,1106,17,1,1166,0,1,1226,17,1],"974":[386,17,1,446,0,1,506,17,1,506,17,2,566,0,1,566,0,2,626,17,1,626,17,2,686,0,1,686,0,2,746,17,1,746,17,2,806,0,1,806,0,2,866,17,1,866,17,2,926,0,1,926,0,2,986,17,1,986,17,2,1046,0,1,1046,0,2,1106,17,1,1166,0,1,1226,17,1],"341":[387,17,1,447,0,1,507,17,1,507,17,2,567,0,1,567,0,2,627,17,1,627,17,2,687,0,1,687,0,2,747,17,1,747,17,2,807,0,1,807,0,2,867,17,1,867,17,2,927,0,1,927,0,2,987,17,1,987,17,2,1047,0,1,1047,0,2,1107,17,1,1167,0,1,1227,17,1],"818":[388,17,1,447,0,1,508,17,1,508,17,2,567,0,1,567,0,2,628,17,1,628,17,2,687,0,1,687,0,2,748,17,1,748,17,2,807,0,1,807,0,2,868,17,1,868,17,2,927,0,1,927,0,2,988,17,1,988,17,2,1047,0,1,1047,0,2,1108,17,1,1167,0,1,1228,17,1],"984":[389,17,1,448,0,1,509,17,1,509,17,2,568,0,1,568,0,2,629,17,1,629,17,2,688,0,1,688,0,2,749,17,1,749,17,2,808,0,1,808,0,2,869,17,1,869,17,2,928,0,1,928,0,2,989,17,1,989,17,2,1048,0,1,1048,0,2,1109,17,1,1168,0,1,1229,17,1],"991":[390,17,1,449,0,1,510,17,1,510,17,2,569,0,1,569,0,2,630,17,1,630,17,2,689,0,1,689,0,2,750,17,1,750,17,2,809,0,1,809,0,2,870,17,1,870,17,2,929,0,1,929,0,2,990,17,1,990,17,2,1049,0,1,1049,0,2,1110,17,1,1169,0,1,1230,17,1],"288":[391,17,1,450,0,1,511,17,1,511,17,2,570,0,1,570,0,2,631,17,1,631,17,2,690,0,1,690,0,2,751,17,1,751,17,2,810,0,1,810,0,2,871,17,1,871,17,2,930,0,1,930,0,2,991,17,1,991,17,2,1050,0,1,1050,0,2,1111,17,1,1170,0,1,1231,17,1],"156":[394,17,1,453,0,1,514,17,1,514,17,2,573,0,1,573,0,2,634,17,1,634,17,2,693,0,1,693,0,2,754,17,1,754,17,2,813,0,1,813,0,2,874,17,1,874,17,2,933,0,1,933,0,2,994,17,1,994,17,2,1053,0,1,1053,0,2,1114,17,1,1173,0,1,1234,17,1],"36":[454,0,1,574,0,1,574,0,2,694,0,1,694,0,2,814,0,1,814,0,2,934,0,1,934,0,2,1054,0,1,1054,0,2,1174,0,1],"263":[395,17,1,456,0,1,515,17,1,515,17,2,576,0,1,576,0,2,635,17,1,635,17,2,696,0,1,696,0,2,755,17,1,755,17,2,816,0,1,816,0,2,875,17,1,875,17,2,936,0,1,936,0,2,995,17,1,995,17,2,1056,0,1,1056,0,2,1115,17,1,1176,0,1,1235,17,1],"1004":[396,17,1,458,0,1,516,17,1,516,17,2,578,0,1,578,0,2,636,17,1,636,17,2,698,0,1,698,0,2,756,17,1,756,17,2,818,0,1,818,0,2,876,17,1,876,17,2,938,0,1,938,0,2,996,17,1,996,17,2,1058,0,1,1058,0,2,1116,17,1,1178,0,1,1236,17,1],"71":[334,9,1,390,18,1,394,9,1,450,18,1,454,9,1,454,9,2,510,18,1,514,9,1,514,9,2,570,18,1,574,9,1,574,9,2,630,18,1,634,9,1,634,9,2,690,18,1,694,9,1,694,9,2,750,18,1,754,9,1,754,9,2,810,18,1,814,9,1,814,9,2,870,18,1,874,9,1,874,9,2,930,18,1,934,9,1,934,9,2,990,18,1,994,9,1,994,9,2,1050,18,1,1054,9,1,1054,9,2,1110,18,1,1114,9,1,1170,18,1,1174,9,1,1230,18,1,1234,9,1],"251":[335,9,1,391,18,1,395,9,1,451,18,1,455,9,1,455,9,2,511,18,1,515,9,1,515,9,2,571,18,1,575,9,1,575,9,2,631,18,1,635,9,1,635,9,2,691,18,1,695,9,1,695,9,2,751,18,1,755,9,1,755,9,2,811,18,1,815,9,1,815,9,2,871,18,1,875,9,1,875,9,2,931,18,1,935,9,1,935,9,2,991,18,1,995,9,1,995,9,2,1051,18,1,1055,9,1,1055,9,2,1111,18,1,1115,9,1,1171,18,1,1175,9,1,1231,18,1,1235,9,1],"252":[335,9,1,392,18,1,396,9,1,452,18,1,455,9,2,456,9,1,512,18,1,516,9,1,516,9,2,572,18,1,576,9,1,576,9,2,632,18,1,636,9,1,636,9,2,692,18,1,696,9,1,696,9,2,752,18,1,756,9,1,756,9,2,812,18,1,816,9,1,816,9,2,872,18,1,876,9,1,876,9,2,932,18,1,936,9,1,936,9,2,992,18,1,996,9,1,996,9,2,1052,18,1,1056,9,1,1056,9,2,1112,18,1,1116,9,1,1172,18,1,1176,9,1,1232,18,1,1236,9,1],"254":[336,9,1,394,18,1,397,9,1,454,18,1,456,9,2,457,9,1,514,18,1,517,9,1,517,9,2,574,18,1,577,9,1,577,9,2,634,18,1,637,9,1,637,9,2,694,18,1,697,9,1,697,9,2,754,18,1,757,9,1,757,9,2,814,18,1,817,9,1,817,9,2,874,18,1,877,9,1,877,9,2,934,18,1,937,9,1,937,9,2,994,18,1,997,9,1,997,9,2,1054,18,1,1057,9,1,1057,9,2,1114,18,1,1117,9,1,1174,18,1,1177,9,1,1234,18,1,1237,9,1],"255":[337,9,1,395,18,1,397,9,1,400,18,1,455,18,1,457,9,1,457,9,2,460,18,1,515,18,1,517,9,1,517,9,2,520,18,1,575,18,1,577,9,1,577,9,2,580,18,1,635,18,1,637,9,1,637,9,2,640,18,1,695,18,1,697,9,1,697,9,2,700,18,1,755,18,1,757,9,1,757,9,2,760,18,1,815,18,1,817,9,1,817,9,2,820,18,1,875,18,1,877,9,1,877,9,2,880,18,1,935,18,1,937,9,1,937,9,2,940,18,1,995,18,1,997,9,1,997,9,2,1000,18,1,1055,18,1,1057,9,1,1057,9,2,1060,18,1,1115,18,1,1117,9,1,1120,18,1,1175,18,1,1177,9,1,1180,18,1,1235,18,1,1237,9,1],"central-bay-q":[365,3,1,375,9,1,425,3,1,435,9,1,485,3,1,485,3,2,495,9,1,495,9,2,545,3,1,545,3,2,555,9,1,555,9,2,605,3,1,605,3,2,615,9,1,615,9,2,665,3,1,665,3,2,675,9,1,675,9,2,725,3,1,725,3,2,735,9,1,735,9,2,785,3,1,785,3,2,795,9,1,795,9,2,845,3,1,845,3,2,855,9,1,855,9,2,905,3,1,905,3,2,915,9,1,915,9,2,965,3,1,965,3,2,975,9,1,975,9,2,1025,3,1,1025,3,2,1035,9,1,1035,9,2,1085,3,1,1085,3,2,1095,9,1,1145,3,1,1155,9,1,1205,3,1,1215,9,1],"241":[377,9,1,437,9,1,497,9,1,497,9,2,557,9,1,557,9,2,617,9,1,617,9,2,677,9,1,677,9,2,737,9,1,737,9,2,797,9,1,797,9,2,857,9,1,857,9,2,917,9,1,917,9,2,977,9,1,977,9,2,1037,9,1,1037,9,2,1097,9,1,1157,9,1,1217,9,1],"401":[377,9,1,437,9,1,497,9,1,498,9,2,557,9,1,558,9,2,617,9,1,618,9,2,677,9,1,678,9,2,737,9,1,738,9,2,797,9,1,798,9,2,857,9,1,858,9,2,917,9,1,918,9,2,977,9,1,978,9,2,1037,9,1,1038,9,2,1097,9,1,1157,9,1,1217,9,1],"402":[378,9,1,438,9,1,498,9,1,498,9,2,558,9,1,558,9,2,618,9,1,618,9,2,678,9,1,678,9,2,738,9,1,738,9,2,798,9,1,798,9,2,858,9,1,858,9,2,918,9,1,918,9,2,978,9,1,978,9,2,1038,9,1,1038,9,2,1098,9,1,1158,9,1,1218,9,1],"243":[379,9,1,439,9,1,499,9,1,499,9,2,559,9,1,559,9,2,619,9,1,619,9,2,679,9,1,679,9,2,739,9,1,739,9,2,799,9,1,799,9,2,859,9,1,859,9,2,919,9,1,919,9,2,979,9,1,979,9,2,1039,9,1,1039,9,2,1099,9,1,1159,9,1,1219,9,1],"404":[379,9,1,439,9,1,499,9,1,499,9,2,559,9,1,559,9,2,619,9,1,619,9,2,679,9,1,679,9,2,739,9,1,739,9,2,799,9,1,799,9,2,859,9,1,859,9,2,919,9,1,919,9,2,979,9,1,979,9,2,1039,9,1,1039,9,2,1099,9,1,1159,9,1,1219,9,1],"428":[384,9,1,444,9,1,504,9,1,504,9,2,564,9,1,564,9,2,624,9,1,624,9,2,684,9,1,684,9,2,744,9,1,744,9,2,804,9,1,804,9,2,864,9,1,864,9,2,924,9,1,924,9,2,984,9,1,984,9,2,1044,9,1,1044,9,2,1104,9,1,1164,9,1,1224,9,1],"244":[384,9,1,444,9,1,504,9,1,504,9,2,564,9,1,564,9,2,624,9,1,624,9,2,684,9,1,684,9,2,744,9,1,744,9,2,804,9,1,804,9,2,864,9,1,864,9,2,924,9,1,924,9,2,984,9,1,984,9,2,1044,9,1,1044,9,2,1104,9,1,1164,9,1,1224,9,1],"246":[385,9,1,445,9,1,505,9,1,505,9,2,565,9,1,565,9,2,625,9,1,625,9,2,685,9,1,685,9,2,745,9,1,745,9,2,805,9,1,805,9,2,865,9,1,865,9,2,925,9,1,925,9,2,985,9,1,985,9,2,1045,9,1,1045,9,2,1105,9,1,1165,9,1,1225,9,1],"247":[386,9,1,446,9,1,506,9,1,506,9,2,566,9,1,566,9,2,626,9,1,626,9,2,686,9,1,686,9,2,746,9,1,746,9,2,806,9,1,806,9,2,866,9,1,866,9,2,926,9,1,926,9,2,986,9,1,986,9,2,1046,9,1,1046,9,2,1106,9,1,1166,9,1,1226,9,1],"249":[387,9,1,447,9,1,507,9,1,507,9,2,567,9,1,567,9,2,627,9,1,627,9,2,687,9,1,687,9,2,747,9,1,747,9,2,807,9,1,807,9,2,867,9,1,867,9,2,927,9,1,927,9,2,987,9,1,987,9,2,1047,9,1,1047,9,2,1107,9,1,1167,9,1,1227,9,1],"250":[387,9,1,447,9,1,507,9,1,507,9,2,567,9,1,567,9,2,627,9,1,627,9,2,687,9,1,687,9,2,747,9,1,747,9,2,807,9,1,807,9,2,867,9,1,867,9,2,927,9,1,927,9,2,987,9,1,987,9,2,1047,9,1,1047,9,2,1107,9,1,1167,9,1,1227,9,1],"239":[388,9,1,448,9,1,508,9,1,508,9,2,568,9,1,568,9,2,628,9,1,628,9,2,688,9,1,688,9,2,748,9,1,748,9,2,808,9,1,808,9,2,868,9,1,868,9,2,928,9,1,928,9,2,988,9,1,988,9,2,1048,9,1,1048,9,2,1108,9,1,1168,9,1,1228,9,1],"70":[389,9,1,449,9,1,509,9,1,509,9,2,569,9,1,569,9,2,629,9,1,629,9,2,689,9,1,689,9,2,749,9,1,749,9,2,809,9,1,809,9,2,869,9,1,869,9,2,929,9,1,929,9,2,989,9,1,989,9,2,1049,9,1,1049,9,2,1109,9,1,1169,9,1,1229,9,1],"430":[341,9,1,390,9,1,401,9,1,450,9,1,461,9,1,463,9,2,510,9,1,510,9,2,521,9,1,523,9,2,570,9,1,570,9,2,581,9,1,583,9,2,630,9,1,630,9,2,641,9,1,643,9,2,690,9,1,690,9,2,701,9,1,703,9,2,750,9,1,750,9,2,761,9,1,763,9,2,810,9,1,810,9,2,821,9,1,823,9,2,870,9,1,870,9,2,881,9,1,883,9,2,930,9,1,930,9,2,941,9,1,943,9,2,990,9,1,990,9,2,1001,9,1,1003,9,2,1050,9,1,1050,9,2,1061,9,1,1063,9,2,1110,9,1,1121,9,1,1170,9,1,1181,9,1,1230,9,1,1241,9,1],"434":[342,9,1,390,9,1,402,9,1,450,9,1,462,9,1,463,9,2,510,9,1,511,9,2,522,9,1,524,9,2,570,9,1,571,9,2,582,9,1,584,9,2,630,9,1,631,9,2,642,9,1,644,9,2,690,9,1,691,9,2,702,9,1,704,9,2,750,9,1,751,9,2,762,9,1,764,9,2,810,9,1,811,9,2,822,9,1,824,9,2,870,9,1,871,9,2,882,9,1,884,9,2,930,9,1,931,9,2,942,9,1,944,9,2,990,9,1,991,9,2,1002,9,1,1004,9,2,1050,9,1,1051,9,2,1062,9,1,1064,9,2,1110,9,1,1122,9,1,1170,9,1,1182,9,1,1230,9,1,1242,9,1],"b51z":[391,9,1,451,9,1,511,9,1,511,9,2,571,9,1,571,9,2,631,9,1,631,9,2,691,9,1,691,9,2,751,9,1,751,9,2,811,9,1,811,9,2,871,9,1,871,9,2,931,9,1,931,9,2,991,9,1,991,9,2,1051,9,1,1051,9,2,1111,9,1,1171,9,1,1231,9,1],"468":[393,9,1,453,9,1,513,9,1,513,9,2,573,9,1,573,9,2,633,9,1,633,9,2,693,9,1,693,9,2,753,9,1,753,9,2,813,9,1,813,9,2,873,9,1,873,9,2,933,9,1,933,9,2,993,9,1,993,9,2,1053,9,1,1053,9,2,1113,9,1,1173,9,1,1233,9,1],"432":[393,9,1,453,9,1,513,9,1,514,9,2,573,9,1,574,9,2,633,9,1,634,9,2,693,9,1,694,9,2,753,9,1,754,9,2,813,9,1,814,9,2,873,9,1,874,9,2,933,9,1,934,9,2,993,9,1,994,9,2,1053,9,1,1054,9,2,1113,9,1,1173,9,1,1233,9,1],"psro":[394,9,1,454,9,1,514,9,1,514,9,2,574,9,1,574,9,2,634,9,1,634,9,2,694,9,1,694,9,2,754,9,1,754,9,2,814,9,1,814,9,2,874,9,1,874,9,2,934,9,1,934,9,2,994,9,1,994,9,2,1054,9,1,1054,9,2,1114,9,1,1174,9,1,1234,9,1],"54":[338,9,1,398,9,1,458,9,1,458,9,2,518,9,1,518,9,2,578,9,1,578,9,2,638,9,1,638,9,2,698,9,1,698,9,2,758,9,1,758,9,2,818,9,1,818,9,2,878,9,1,878,9,2,938,9,1,938,9,2,998,9,1,998,9,2,1058,9,1,1058,9,2,1118,9,1,1178,9,1,1238,9,1],"257":[339,9,1,399,9,1,459,9,1,460,9,2,519,9,1,520,9,2,579,9,1,580,9,2,639,9,1,640,9,2,699,9,1,700,9,2,759,9,1,760,9,2,819,9,1,820,9,2,879,9,1,880,9,2,939,9,1,940,9,2,999,9,1,1000,9,2,1059,9,1,1060,9,2,1119,9,1,1179,9,1,1239,9,1],"123457":[341,9,1,401,9,1,461,9,1,462,9,2,521,9,1,522,9,2,581,9,1,582,9,2,641,9,1,642,9,2,701,9,1,702,9,2,761,9,1,762,9,2,821,9,1,822,9,2,881,9,1,882,9,2,941,9,1,942,9,2,1001,9,1,1002,9,2,1061,9,1,1062,9,2,1121,9,1,1181,9,1,1241,9,1],"258":[344,9,1,404,9,1,464,9,1,465,9,2,524,9,1,525,9,2,584,9,1,585,9,2,644,9,1,645,9,2,704,9,1,705,9,2,764,9,1,765,9,2,824,9,1,825,9,2,884,9,1,885,9,2,944,9,1,945,9,2,1004,9,1,1005,9,2,1064,9,1,1065,9,2,1124,9,1,1184,9,1,1243,9,1],"259":[344,9,1,404,9,1,464,9,1,466,9,2,524,9,1,526,9,2,584,9,1,586,9,2,644,9,1,646,9,2,704,9,1,706,9,2,764,9,1,766,9,2,824,9,1,826,9,2,884,9,1,886,9,2,944,9,1,946,9,2,1004,9,1,1006,9,2,1064,9,1,1066,9,2,1124,9,1,1184,9,1,1244,9,1],"260":[345,9,1,405,9,1,465,9,1,467,9,2,525,9,1,527,9,2,585,9,1,587,9,2,645,9,1,647,9,2,705,9,1,707,9,2,765,9,1,767,9,2,825,9,1,827,9,2,885,9,1,887,9,2,945,9,1,947,9,2,1005,9,1,1007,9,2,1065,9,1,1067,9,2,1125,9,1,1185,9,1,1245,9,1],"g1u0":[346,9,1,406,9,1,466,9,1,467,9,2,526,9,1,527,9,2,586,9,1,587,9,2,646,9,1,647,9,2,706,9,1,707,9,2,766,9,1,767,9,2,826,9,1,827,9,2,886,9,1,887,9,2,946,9,1,947,9,2,1006,9,1,1007,9,2,1066,9,1,1067,9,2,1126,9,1,1186,9,1,1245,9,1],"483":[347,9,1,407,9,1,467,9,1,468,9,2,527,9,1,528,9,2,587,9,1,588,9,2,647,9,1,648,9,2,707,9,1,708,9,2,767,9,1,768,9,2,827,9,1,828,9,2,887,9,1,888,9,2,947,9,1,948,9,2,1007,9,1,1008,9,2,1067,9,1,1068,9,2,1127,9,1,1187,9,1,1245,9,1],"550":[347,9,1,407,9,1,467,9,1,468,9,2,527,9,1,529,9,2,587,9,1,589,9,2,647,9,1,649,9,2,707,9,1,709,9,2,767,9,1,769,9,2,827,9,1,829,9,2,887,9,1,889,9,2,947,9,1,949,9,2,1007,9,1,1009,9,2,1067,9,1,1069,9,2,1127,9,1,1187,9,1,1246,9,1],"261":[348,9,1,408,9,1,468,9,1,469,9,2,528,9,1,530,9,2,588,9,1,590,9,2,648,9,1,650,9,2,708,9,1,710,9,2,768,9,1,770,9,2,828,9,1,830,9,2,888,9,1,890,9,2,948,9,1,950,9,2,1008,9,1,1010,9,2,1068,9,1,1070,9,2,1128,9,1,1188,9,1,1246,9,1],"262":[350,9,1,410,9,1,469,9,2,470,9,1,530,9,1,531,9,2,590,9,1,591,9,2,650,9,1,651,9,2,710,9,1,711,9,2,770,9,1,771,9,2,830,9,1,831,9,2,890,9,1,891,9,2,950,9,1,951,9,2,1010,9,1,1011,9,2,1070,9,1,1071,9,2,1130,9,1,1190,9,1,1246,9,1],"73":[354,9,1,414,9,1,474,9,1,474,9,2,534,9,1,534,9,2,594,9,1,594,9,2,654,9,1,654,9,2,714,9,1,714,9,2,774,9,1,774,9,2,834,9,1,834,9,2,894,9,1,894,9,2,954,9,1,954,9,2,1014,9,1,1014,9,2,1074,9,1,1074,9,2,1134,9,1,1194,9,1,1250,9,1],"557":[357,9,1,417,9,1,477,9,1,477,9,2,537,9,1,537,9,2,597,9,1,597,9,2,657,9,1,657,9,2,717,9,1,717,9,2,777,9,1,777,9,2,837,9,1,837,9,2,897,9,1,897,9,2,957,9,1,957,9,2,1017,9,1,1017,9,2,1077,9,1,1077,9,2,1137,9,1,1197,9,1],"852369":[360,9,1,361,1,1,364,15,1,420,9,1,421,8,1,424,15,1,480,9,1,480,9,2,481,1,1,481,1,2,484,15,1,484,15,2,540,9,1,540,9,2,541,1,2,541,8,1,544,15,1,544,15,2,600,9,1,600,9,2,601,1,1,601,1,2,604,15,1,604,15,2,660,9,1,660,9,2,661,1,2,661,8,1,664,15,1,664,15,2,720,9,1,720,9,2,721,1,1,721,1,2,724,15,1,724,15,2,780,9,1,780,9,2,781,1,2,781,8,1,784,15,1,784,15,2,840,9,1,840,9,2,841,1,1,841,1,2,844,15,1,844,15,2,900,9,1,900,9,2,901,1,2,901,8,1,904,15,1,904,15,2,960,9,1,960,9,2,961,1,1,961,1,2,964,15,1,964,15,2,1020,9,1,1020,9,2,1021,1,2,1021,8,1,1024,15,1,1024,15,2,1080,9,1,1080,9,2,1081,1,1,1081,1,2,1084,15,1,1084,15,2,1140,9,1,1141,1,1,1144,15,1,1200,9,1,1201,1,1,1204,15,1],"central-bay-N":[366,9,1,375,3,1,426,9,1,435,3,1,486,9,1,486,9,2,495,3,1,495,3,2,546,9,1,546,9,2,555,3,1,555,3,2,606,9,1,606,9,2,615,3,1,615,3,2,666,9,1,666,9,2,675,3,1,675,3,2,726,9,1,726,9,2,735,3,1,735,3,2,786,9,1,786,9,2,795,3,1,795,3,2,846,9,1,846,9,2,855,3,1,855,3,2,906,9,1,906,9,2,915,3,1,915,3,2,966,9,1,966,9,2,975,3,1,975,3,2,1026,9,1,1026,9,2,1035,3,1,1035,3,2,1086,9,1,1086,9,2,1095,3,1,1146,9,1,1155,3,1,1206,9,1,1215,3,1],"77":[340,3,1,400,3,1,460,3,1,460,3,2,520,3,1,520,3,2,580,3,1,580,3,2,640,3,1,640,3,2,700,3,1,700,3,2,760,3,1,760,3,2,820,3,1,820,3,2,880,3,1,880,3,2,940,3,1,940,3,2,1000,3,1,1000,3,2,1060,3,1,1060,3,2,1120,3,1,1180,3,1,1240,3,1],"1203":[341,3,1,401,3,1,461,3,1,461,3,2,521,3,1,521,3,2,581,3,1,581,3,2,641,3,1,641,3,2,701,3,1,701,3,2,761,3,1,761,3,2,821,3,1,821,3,2,881,3,1,881,3,2,941,3,1,941,3,2,1001,3,1,1001,3,2,1061,3,1,1061,3,2,1121,3,1,1181,3,1],"1215":[342,3,1,402,3,1,462,3,1,462,3,2,522,3,1,522,3,2,582,3,1,582,3,2,642,3,1,642,3,2,702,3,1,702,3,2,762,3,1,762,3,2,822,3,1,822,3,2,882,3,1,882,3,2,942,3,1,942,3,2,1002,3,1,1002,3,2,1062,3,1,1062,3,2,1122,3,1,1182,3,1],"1221":[342,3,1,402,3,1,462,3,1,462,3,2,522,3,1,522,3,2,582,3,1,582,3,2,642,3,1,642,3,2,702,3,1,702,3,2,762,3,1,762,3,2,822,3,1,822,3,2,882,3,1,882,3,2,942,3,1,942,3,2,1002,3,1,1002,3,2,1062,3,1,1062,3,2,1122,3,1,1182,3,1],"1227":[343,3,1,403,3,1,463,3,1,463,3,2,523,3,1,523,3,2,583,3,1,583,3,2,643,3,1,643,3,2,703,3,1,703,3,2,763,3,1,763,3,2,823,3,1,823,3,2,883,3,1,883,3,2,943,3,1,943,3,2,1003,3,1,1003,3,2,1063,3,1,1063,3,2,1123,3,1,1183,3,1],"442":[344,3,1,404,3,1,464,3,1,464,3,2,524,3,1,524,3,2,584,3,1,584,3,2,644,3,1,644,3,2,704,3,1,704,3,2,764,3,1,764,3,2,824,3,1,824,3,2,884,3,1,884,3,2,944,3,1,944,3,2,1004,3,1,1004,3,2,1064,3,1,1064,3,2,1124,3,1,1184,3,1],"443":[345,3,1,405,3,1,465,3,1,465,3,2,525,3,1,525,3,2,585,3,1,585,3,2,645,3,1,645,3,2,705,3,1,705,3,2,765,3,1,765,3,2,825,3,1,825,3,2,885,3,1,885,3,2,945,3,1,945,3,2,1005,3,1,1005,3,2,1065,3,1,1065,3,2,1125,3,1,1185,3,1],"444":[346,3,1,406,3,1,466,3,1,466,3,2,526,3,1,526,3,2,586,3,1,586,3,2,646,3,1,646,3,2,706,3,1,706,3,2,766,3,1,766,3,2,826,3,1,826,3,2,886,3,1,886,3,2,946,3,1,946,3,2,1006,3,1,1006,3,2,1066,3,1,1066,3,2,1126,3,1,1186,3,1],"445":[346,3,1,406,3,1,466,3,1,466,3,2,526,3,1,526,3,2,586,3,1,586,3,2,646,3,1,646,3,2,706,3,1,706,3,2,766,3,1,766,3,2,826,3,1,826,3,2,886,3,1,886,3,2,946,3,1,946,3,2,1006,3,1,1006,3,2,1066,3,1,1066,3,2,1126,3,1,1186,3,1],"857":[347,3,1,407,3,1,467,3,1,467,3,2,527,3,1,527,3,2,587,3,1,587,3,2,647,3,1,647,3,2,707,3,1,707,3,2,767,3,1,767,3,2,827,3,1,827,3,2,887,3,1,887,3,2,947,3,1,947,3,2,1007,3,1,1007,3,2,1067,3,1,1067,3,2,1127,3,1,1187,3,1],"310":[347,3,1,407,3,1,467,3,1,468,3,2,527,3,1,528,3,2,587,3,1,588,3,2,647,3,1,648,3,2,707,3,1,708,3,2,767,3,1,768,3,2,827,3,1,828,3,2,887,3,1,888,3,2,947,3,1,948,3,2,1007,3,1,1008,3,2,1067,3,1,1068,3,2,1127,3,1,1187,3,1],"312":[348,3,1,408,3,1,468,3,1,468,3,2,528,3,1,528,3,2,588,3,1,588,3,2,648,3,1,648,3,2,708,3,1,708,3,2,768,3,1,768,3,2,828,3,1,828,3,2,888,3,1,888,3,2,948,3,1,948,3,2,1008,3,1,1008,3,2,1068,3,1,1068,3,2,1128,3,1,1188,3,1],"313":[348,3,1,408,3,1,468,3,1,469,3,2,528,3,1,529,3,2,588,3,1,589,3,2,648,3,1,649,3,2,708,3,1,709,3,2,768,3,1,769,3,2,828,3,1,829,3,2,888,3,1,889,3,2,948,3,1,949,3,2,1008,3,1,1009,3,2,1068,3,1,1069,3,2,1128,3,1,1188,3,1],"447":[349,3,1,409,3,1,469,3,1,469,3,2,529,3,1,529,3,2,589,3,1,589,3,2,649,3,1,649,3,2,709,3,1,709,3,2,769,3,1,769,3,2,829,3,1,829,3,2,889,3,1,889,3,2,949,3,1,949,3,2,1009,3,1,1009,3,2,1069,3,1,1069,3,2,1129,3,1,1189,3,1],"315":[349,3,1,409,3,1,469,3,1,470,3,2,529,3,1,530,3,2,589,3,1,590,3,2,649,3,1,650,3,2,709,3,1,710,3,2,769,3,1,770,3,2,829,3,1,830,3,2,889,3,1,890,3,2,949,3,1,950,3,2,1009,3,1,1010,3,2,1069,3,1,1070,3,2,1129,3,1,1189,3,1],"316":[350,3,1,410,3,1,470,3,1,470,3,2,530,3,1,530,3,2,590,3,1,590,3,2,650,3,1,650,3,2,710,3,1,710,3,2,770,3,1,770,3,2,830,3,1,830,3,2,890,3,1,890,3,2,950,3,1,950,3,2,1010,3,1,1010,3,2,1070,3,1,1070,3,2,1130,3,1,1190,3,1],"78":[350,3,1,410,3,1,470,3,1,470,3,2,530,3,1,530,3,2,590,3,1,590,3,2,650,3,1,650,3,2,710,3,1,710,3,2,770,3,1,770,3,2,830,3,1,830,3,2,890,3,1,890,3,2,950,3,1,950,3,2,1010,3,1,1010,3,2,1070,3,1,1070,3,2,1130,3,1,1190,3,1],"317":[351,3,1,411,3,1,471,3,1,472,3,2,531,3,1,532,3,2,591,3,1,592,3,2,651,3,1,652,3,2,711,3,1,712,3,2,771,3,1,772,3,2,831,3,1,832,3,2,891,3,1,892,3,2,951,3,1,952,3,2,1011,3,1,1012,3,2,1071,3,1,1072,3,2,1131,3,1,1191,3,1],"987677":[352,3,1,412,3,1,472,3,1,472,3,2,532,3,1,532,3,2,592,3,1,592,3,2,652,3,1,652,3,2,712,3,1,712,3,2,772,3,1,772,3,2,832,3,1,832,3,2,892,3,1,892,3,2,952,3,1,952,3,2,1012,3,1,1012,3,2,1072,3,1,1072,3,2,1132,3,1,1192,3,1],"987679":[352,3,1,383,3,1,412,3,1,443,3,1,472,3,1,472,3,2,503,3,1,503,3,2,532,3,1,532,3,2,563,3,1,563,3,2,592,3,1,592,3,2,623,3,1,623,3,2,652,3,1,652,3,2,683,3,1,683,3,2,712,3,1,712,3,2,743,3,1,743,3,2,772,3,1,772,3,2,803,3,1,803,3,2,832,3,1,832,3,2,863,3,1,863,3,2,892,3,1,892,3,2,923,3,1,923,3,2,952,3,1,952,3,2,983,3,1,983,3,2,1012,3,1,1012,3,2,1043,3,1,1043,3,2,1072,3,1,1072,3,2,1103,3,1,1132,3,1,1163,3,1,1192,3,1,1223,3,1],"319":[353,3,1,413,3,1,473,3,1,474,3,2,533,3,1,534,3,2,593,3,1,594,3,2,653,3,1,654,3,2,713,3,1,714,3,2,773,3,1,774,3,2,833,3,1,834,3,2,893,3,1,894,3,2,953,3,1,954,3,2,1013,3,1,1014,3,2,1073,3,1,1074,3,2,1133,3,1,1193,3,1],"323":[354,3,1,414,3,1,474,3,1,475,3,2,534,3,1,535,3,2,594,3,1,595,3,2,654,3,1,655,3,2,714,3,1,715,3,2,774,3,1,775,3,2,834,3,1,835,3,2,894,3,1,895,3,2,954,3,1,955,3,2,1014,3,1,1015,3,2,1074,3,1,1075,3,2,1134,3,1,1194,3,1],"370":[355,3,1,415,3,1,475,3,1,475,3,2,535,3,1,535,3,2,595,3,1,595,3,2,655,3,1,655,3,2,715,3,1,715,3,2,775,3,1,775,3,2,835,3,1,835,3,2,895,3,1,895,3,2,955,3,1,955,3,2,1015,3,1,1015,3,2,1075,3,1,1075,3,2,1135,3,1,1195,3,1],"325":[356,3,1,416,3,1,476,3,1,476,3,2,536,3,1,536,3,2,596,3,1,596,3,2,656,3,1,656,3,2,716,3,1,716,3,2,776,3,1,776,3,2,836,3,1,836,3,2,896,3,1,896,3,2,956,3,1,956,3,2,1016,3,1,1016,3,2,1076,3,1,1076,3,2,1136,3,1,1196,3,1],"326":[356,3,1,416,3,1,476,3,1,476,3,2,536,3,1,536,3,2,596,3,1,596,3,2,656,3,1,656,3,2,716,3,1,716,3,2,776,3,1,776,3,2,836,3,1,836,3,2,896,3,1,896,3,2,956,3,1,956,3,2,1016,3,1,1016,3,2,1076,3,1,1076,3,2,1136,3,1,1196,3,1],"381":[357,3,1,417,3,1,477,3,1,477,3,2,537,3,1,537,3,2,597,3,1,597,3,2,657,3,1,657,3,2,717,3,1,717,3,2,777,3,1,777,3,2,837,3,1,837,3,2,897,3,1,897,3,2,957,3,1,957,3,2,1017,3,1,1017,3,2,1077,3,1,1077,3,2,1137,3,1,1197,3,1],"388":[358,3,1,418,3,1,478,3,1,478,3,2,538,3,1,538,3,2,598,3,1,598,3,2,658,3,1,658,3,2,718,3,1,718,3,2,778,3,1,778,3,2,838,3,1,838,3,2,898,3,1,898,3,2,958,3,1,958,3,2,1018,3,1,1018,3,2,1078,3,1,1078,3,2,1138,3,1,1198,3,1],"329":[359,3,1,419,3,1,479,3,1,479,3,2,539,3,1,539,3,2,599,3,1,599,3,2,659,3,1,659,3,2,719,3,1,719,3,2,779,3,1,779,3,2,839,3,1,839,3,2,899,3,1,899,3,2,959,3,1,959,3,2,1019,3,1,1019,3,2,1079,3,1,1079,3,2,1139,3,1,1199,3,1],"411":[376,3,1,376,5,1,376,12,1,376,16,1,436,3,1,436,5,1,436,12,1,436,16,1,496,3,1,496,3,2,496,5,1,496,5,2,496,12,1,496,12,2,496,16,1,496,16,2,526,5,1,556,3,1,556,3,2,556,5,1,556,5,2,556,12,1,556,12,2,556,16,1,556,16,2,586,5,1,616,3,1,616,3,2,616,5,1,616,5,2,616,12,1,616,12,2,616,16,1,616,16,2,646,5,1,676,3,1,676,3,2,676,5,1,676,5,2,676,12,1,676,12,2,676,16,1,676,16,2,706,5,1,736,3,1,736,3,2,736,5,1,736,5,2,736,12,1,736,12,2,736,16,1,736,16,2,766,5,1,796,3,1,796,3,2,796,5,1,796,5,2,796,12,1,796,12,2,796,16,1,796,16,2,826,5,1,856,3,1,856,3,2,856,5,1,856,5,2,856,12,1,856,12,2,856,16,1,856,16,2,886,5,1,916,3,1,916,3,2,916,5,1,916,5,2,916,12,1,916,12,2,916,16,1,916,16,2,946,5,1,976,3,1,976,3,2,976,5,1,976,5,2,976,12,1,976,12,2,976,16,1,976,16,2,1036,3,1,1036,3,2,1036,5,1,1036,5,2,1036,12,1,1036,12,2,1036,16,1,1036,16,2,1096,3,1,1096,5,1,1096,12,1,1096,16,1,1156,3,1,1156,5,1,1156,12,1,1156,16,1,1216,3,1,1216,5,1,1216,12,1,1216,16,1],"331":[379,3,1,439,3,1,499,3,1,499,3,2,559,3,1,559,3,2,619,3,1,619,3,2,679,3,1,679,3,2,739,3,1,739,3,2,799,3,1,799,3,2,859,3,1,859,3,2,919,3,1,919,3,2,979,3,1,979,3,2,1039,3,1,1039,3,2,1099,3,1,1159,3,1,1219,3,1],"333":[379,3,1,439,3,1,499,3,1,500,3,2,559,3,1,560,3,2,619,3,1,620,3,2,679,3,1,680,3,2,739,3,1,740,3,2,799,3,1,800,3,2,859,3,1,860,3,2,919,3,1,920,3,2,979,3,1,980,3,2,1039,3,1,1040,3,2,1099,3,1,1159,3,1,1219,3,1],"266":[380,3,1,440,3,1,500,3,1,500,3,2,560,3,1,560,3,2,620,3,1,620,3,2,680,3,1,680,3,2,740,3,1,740,3,2,800,3,1,800,3,2,860,3,1,860,3,2,920,3,1,920,3,2,980,3,1,980,3,2,1040,3,1,1040,3,2,1100,3,1,1160,3,1,1220,3,1],"268":[381,3,1,441,3,1,501,3,1,501,3,2,561,3,1,561,3,2,621,3,1,621,3,2,681,3,1,681,3,2,741,3,1,741,3,2,801,3,1,801,3,2,861,3,1,861,3,2,921,3,1,921,3,2,981,3,1,981,3,2,1041,3,1,1041,3,2,1101,3,1,1161,3,1,1221,3,1],"335":[381,3,1,441,3,1,501,3,1,502,3,2,561,3,1,562,3,2,621,3,1,622,3,2,681,3,1,682,3,2,741,3,1,742,3,2,801,3,1,802,3,2,861,3,1,862,3,2,921,3,1,922,3,2,981,3,1,982,3,2,1041,3,1,1042,3,2,1101,3,1,1161,3,1,1221,3,1],"137":[382,3,1,384,5,1,442,3,1,444,5,1,502,3,1,503,3,2,504,5,1,504,5,2,534,5,1,562,3,1,563,3,2,564,5,1,564,5,2,594,5,1,622,3,1,623,3,2,624,5,1,624,5,2,654,5,1,682,3,1,683,3,2,684,5,1,684,5,2,714,5,1,742,3,1,743,3,2,744,5,1,744,5,2,774,5,1,802,3,1,803,3,2,804,5,1,804,5,2,834,5,1,862,3,1,863,3,2,864,5,1,864,5,2,894,5,1,922,3,1,923,3,2,924,5,1,924,5,2,954,5,1,982,3,1,983,3,2,984,5,1,984,5,2,1042,3,1,1043,3,2,1044,5,1,1044,5,2,1102,3,1,1104,5,1,1162,3,1,1164,5,1,1222,3,1,1224,5,1],"337":[383,3,1,443,3,1,503,3,1,504,3,2,563,3,1,564,3,2,623,3,1,624,3,2,683,3,1,684,3,2,743,3,1,744,3,2,803,3,1,804,3,2,863,3,1,864,3,2,923,3,1,924,3,2,983,3,1,984,3,2,1043,3,1,1044,3,2,1103,3,1,1163,3,1,1223,3,1],"273":[384,3,1,444,3,1,504,3,1,504,3,2,564,3,1,564,3,2,624,3,1,624,3,2,684,3,1,684,3,2,744,3,1,744,3,2,804,3,1,804,3,2,864,3,1,864,3,2,924,3,1,924,3,2,984,3,1,984,3,2,1044,3,1,1044,3,2,1104,3,1,1164,3,1,1224,3,1],"74":[384,3,1,444,3,1,504,3,1,505,3,2,564,3,1,565,3,2,624,3,1,625,3,2,684,3,1,685,3,2,744,3,1,745,3,2,804,3,1,805,3,2,864,3,1,865,3,2,924,3,1,925,3,2,984,3,1,985,3,2,1044,3,1,1045,3,2,1104,3,1,1164,3,1,1224,3,1],"274":[384,3,1,444,3,1,504,3,1,505,3,2,564,3,1,565,3,2,624,3,1,625,3,2,684,3,1,685,3,2,744,3,1,745,3,2,804,3,1,805,3,2,864,3,1,865,3,2,924,3,1,925,3,2,984,3,1,985,3,2,1044,3,1,1045,3,2,1104,3,1,1164,3,1,1224,3,1],"339":[385,3,1,445,3,1,505,3,1,505,3,2,565,3,1,565,3,2,625,3,1,625,3,2,685,3,1,685,3,2,745,3,1,745,3,2,805,3,1,805,3,2,865,3,1,865,3,2,925,3,1,925,3,2,985,3,1,985,3,2,1045,3,1,1045,3,2,1105,3,1,1165,3,1,1225,3,1],"338":[386,3,1,446,3,1,506,3,1,506,3,2,566,3,1,566,3,2,626,3,1,626,3,2,686,3,1,686,3,2,746,3,1,746,3,2,806,3,1,806,3,2,866,3,1,866,3,2,926,3,1,926,3,2,986,3,1,986,3,2,1046,3,1,1046,3,2,1106,3,1,1166,3,1,1226,3,1],"5qmy":[386,3,1,446,3,1,506,3,1,506,3,2,566,3,1,566,3,2,626,3,1,626,3,2,686,3,1,686,3,2,746,3,1,746,3,2,806,3,1,806,3,2,866,3,1,866,3,2,926,3,1,926,3,2,986,3,1,986,3,2,1046,3,1,1046,3,2,1106,3,1,1166,3,1,1226,3,1],"848-NEW":[387,3,1,447,3,1,507,3,1,507,3,2,567,3,1,567,3,2,627,3,1,627,3,2,687,3,1,687,3,2,747,3,1,747,3,2,807,3,1,807,3,2,867,3,1,867,3,2,927,3,1,927,3,2,987,3,1,987,3,2,1047,3,1,1047,3,2,1107,3,1,1167,3,1,1227,3,1],"275":[388,3,1,448,3,1,508,3,1,508,3,2,568,3,1,568,3,2,628,3,1,628,3,2,688,3,1,688,3,2,748,3,1,748,3,2,808,3,1,808,3,2,868,3,1,868,3,2,928,3,1,928,3,2,988,3,1,988,3,2,1048,3,1,1048,3,2,1108,3,1,1168,3,1,1228,3,1],"277":[388,3,1,448,3,1,508,3,1,508,3,2,568,3,1,568,3,2,628,3,1,628,3,2,688,3,1,688,3,2,748,3,1,748,3,2,808,3,1,808,3,2,868,3,1,868,3,2,928,3,1,928,3,2,988,3,1,988,3,2,1048,3,1,1048,3,2,1108,3,1,1168,3,1,1228,3,1],"278":[389,3,1,449,3,1,509,3,1,509,3,2,569,3,1,569,3,2,629,3,1,629,3,2,689,3,1,689,3,2,749,3,1,749,3,2,809,3,1,809,3,2,869,3,1,869,3,2,929,3,1,929,3,2,989,3,1,989,3,2,1049,3,1,1049,3,2,1109,3,1,1169,3,1,1229,3,1],"3oil":[389,3,1,449,3,1,509,3,1,509,3,2,569,3,1,569,3,2,629,3,1,629,3,2,689,3,1,689,3,2,749,3,1,749,3,2,809,3,1,809,3,2,869,3,1,869,3,2,929,3,1,929,3,2,989,3,1,989,3,2,1049,3,1,1049,3,2,1109,3,1,1169,3,1,1229,3,1],"279":[389,3,1,449,3,1,509,3,1,510,3,2,569,3,1,570,3,2,629,3,1,630,3,2,689,3,1,690,3,2,749,3,1,750,3,2,809,3,1,810,3,2,869,3,1,870,3,2,929,3,1,930,3,2,989,3,1,990,3,2,1049,3,1,1050,3,2,1109,3,1,1169,3,1,1229,3,1],"280":[390,3,1,450,3,1,510,3,1,511,3,2,570,3,1,571,3,2,630,3,1,631,3,2,690,3,1,691,3,2,750,3,1,751,3,2,810,3,1,811,3,2,870,3,1,871,3,2,930,3,1,931,3,2,990,3,1,991,3,2,1050,3,1,1051,3,2,1110,3,1,1170,3,1,1230,3,1],"286":[391,3,1,451,3,1,511,3,1,512,3,2,571,3,1,572,3,2,631,3,1,632,3,2,691,3,1,692,3,2,751,3,1,752,3,2,811,3,1,812,3,2,871,3,1,872,3,2,931,3,1,932,3,2,991,3,1,992,3,2,1051,3,1,1052,3,2,1111,3,1,1171,3,1,1231,3,1],"296":[392,3,1,452,3,1,512,3,1,513,3,2,572,3,1,573,3,2,632,3,1,633,3,2,692,3,1,693,3,2,752,3,1,753,3,2,812,3,1,813,3,2,872,3,1,873,3,2,932,3,1,933,3,2,992,3,1,993,3,2,1052,3,1,1053,3,2,1112,3,1,1172,3,1,1232,3,1],"76":[392,3,1,452,3,1,512,3,1,513,3,2,572,3,1,573,3,2,632,3,1,633,3,2,692,3,1,693,3,2,752,3,1,753,3,2,812,3,1,813,3,2,872,3,1,873,3,2,932,3,1,933,3,2,992,3,1,993,3,2,1052,3,1,1053,3,2,1112,3,1,1172,3,1,1232,3,1],"987659":[394,3,1,454,3,1,514,3,1,514,3,2,574,3,1,574,3,2,634,3,1,634,3,2,694,3,1,694,3,2,754,3,1,754,3,2,814,3,1,814,3,2,874,3,1,874,3,2,934,3,1,934,3,2,994,3,1,994,3,2,1054,3,1,1054,3,2,1114,3,1,1174,3,1,1234,3,1],"344":[395,3,1,455,3,1,515,3,1,515,3,2,575,3,1,575,3,2,635,3,1,635,3,2,695,3,1,695,3,2,755,3,1,755,3,2,815,3,1,815,3,2,875,3,1,875,3,2,935,3,1,935,3,2,995,3,1,995,3,2,1055,3,1,1055,3,2,1115,3,1,1175,3,1,1235,3,1],"poeq":[395,3,1,455,3,1,515,3,1,516,3,2,575,3,1,576,3,2,635,3,1,636,3,2,695,3,1,696,3,2,755,3,1,756,3,2,815,3,1,816,3,2,875,3,1,876,3,2,935,3,1,936,3,2,995,3,1,996,3,2,1055,3,1,1056,3,2,1115,3,1,1175,3,1,1235,3,1],"342":[396,3,1,456,3,1,516,3,1,517,3,2,576,3,1,577,3,2,636,3,1,637,3,2,696,3,1,697,3,2,756,3,1,757,3,2,816,3,1,817,3,2,876,3,1,877,3,2,936,3,1,937,3,2,996,3,1,997,3,2,1056,3,1,1057,3,2,1116,3,1,1176,3,1,1236,3,1],"307":[397,3,1,457,3,1,517,3,1,518,3,2,577,3,1,578,3,2,637,3,1,638,3,2,697,3,1,698,3,2,757,3,1,758,3,2,817,3,1,818,3,2,877,3,1,878,3,2,937,3,1,938,3,2,997,3,1,998,3,2,1057,3,1,1058,3,2,1117,3,1,1177,3,1,1237,3,1],"309":[398,3,1,458,3,1,518,3,1,519,3,2,578,3,1,579,3,2,638,3,1,639,3,2,698,3,1,699,3,2,758,3,1,759,3,2,818,3,1,819,3,2,878,3,1,879,3,2,938,3,1,939,3,2,998,3,1,999,3,2,1058,3,1,1059,3,2,1118,3,1,1178,3,1,1238,3,1],"308":[399,3,1,459,3,1,519,3,1,520,3,2,579,3,1,580,3,2,639,3,1,640,3,2,699,3,1,700,3,2,759,3,1,760,3,2,819,3,1,820,3,2,879,3,1,880,3,2,939,3,1,940,3,2,999,3,1,1000,3,2,1059,3,1,1060,3,2,1119,3,1,1179,3,1,1239,3,1],"central-bay-B":[364,10,1,375,4,1,424,10,1,435,4,1,484,10,1,485,10,2,495,4,1,495,4,2,544,10,1,545,10,2,555,4,1,555,4,2,604,10,1,605,10,2,615,4,1,615,4,2,664,10,1,665,10,2,675,4,1,675,4,2,724,10,1,725,10,2,735,4,1,735,4,2,784,10,1,785,10,2,795,4,1,795,4,2,844,10,1,845,10,2,855,4,1,855,4,2,904,10,1,905,10,2,915,4,1,915,4,2,964,10,1,965,10,2,975,4,1,975,4,2,1024,10,1,1025,10,2,1035,4,1,1035,4,2,1084,10,1,1085,10,2,1095,4,1,1144,10,1,1155,4,1,1204,10,1,1215,4,1],"471":[376,4,1,376,13,1,436,4,1,436,13,1,496,4,1,496,4,2,496,13,1,496,13,2,526,13,1,556,4,1,556,4,2,556,13,1,556,13,2,586,13,1,616,4,1,616,4,2,616,13,1,616,13,2,646,13,1,676,4,1,676,4,2,676,13,1,676,13,2,706,13,1,736,4,1,736,4,2,736,13,1,736,13,2,766,13,1,796,4,1,796,4,2,796,13,1,796,13,2,826,13,1,856,4,1,856,4,2,856,13,1,856,13,2,886,13,1,916,4,1,916,4,2,916,13,1,916,13,2,946,13,1,976,4,1,976,4,2,976,13,1,976,13,2,1036,4,1,1036,4,2,1036,13,1,1036,13,2,1096,4,1,1096,13,1,1156,4,1,1156,13,1,1216,4,1,1216,13,1],"123458":[376,4,1,376,13,1,436,4,1,436,13,1,496,4,1,496,4,2,496,13,1,496,13,2,526,13,1,556,4,1,556,4,2,556,13,1,556,13,2,586,13,1,616,4,1,616,4,2,616,13,1,616,13,2,646,13,1,676,4,1,676,4,2,676,13,1,676,13,2,706,13,1,736,4,1,736,4,2,736,13,1,736,13,2,766,13,1,796,4,1,796,4,2,796,13,1,796,13,2,826,13,1,856,4,1,856,4,2,856,13,1,856,13,2,886,13,1,916,4,1,916,4,2,916,13,1,916,13,2,946,13,1,976,4,1,976,4,2,976,13,1,976,13,2,1036,4,1,1036,4,2,1036,13,1,1036,13,2,1096,4,1,1096,13,1,1156,4,1,1156,13,1,1216,4,1,1216,13,1],"472":[377,4,1,377,13,1,437,4,1,437,13,1,497,4,1,497,4,2,497,13,1,497,13,2,527,13,1,557,4,1,557,4,2,557,13,1,557,13,2,587,13,1,617,4,1,617,4,2,617,13,1,617,13,2,647,13,1,677,4,1,677,4,2,677,13,1,677,13,2,707,13,1,737,4,1,737,4,2,737,13,1,737,13,2,767,13,1,797,4,1,797,4,2,797,13,1,797,13,2,827,13,1,857,4,1,857,4,2,857,13,1,857,13,2,887,13,1,917,4,1,917,4,2,917,13,1,917,13,2,947,13,1,977,4,1,977,4,2,977,13,1,977,13,2,1037,4,1,1037,4,2,1037,13,1,1037,13,2,1097,4,1,1097,13,1,1157,4,1,1157,13,1,1217,4,1,1217,13,1],"473":[377,4,1,377,13,1,437,4,1,437,13,1,497,4,1,497,4,2,497,13,1,497,13,2,527,13,1,557,4,1,557,4,2,557,13,1,557,13,2,587,13,1,617,4,1,617,4,2,617,13,1,617,13,2,647,13,1,677,4,1,677,4,2,677,13,1,677,13,2,707,13,1,737,4,1,737,4,2,737,13,1,737,13,2,767,13,1,797,4,1,797,4,2,797,13,1,797,13,2,827,13,1,857,4,1,857,4,2,857,13,1,857,13,2,887,13,1,917,4,1,917,4,2,917,13,1,917,13,2,947,13,1,977,4,1,977,4,2,977,13,1,977,13,2,1037,4,1,1037,4,2,1037,13,1,1037,13,2,1097,4,1,1097,13,1,1157,4,1,1157,13,1,1217,4,1,1217,13,1],"474":[378,4,1,378,13,1,438,4,1,438,13,1,498,4,1,498,4,2,498,13,1,498,13,2,528,13,1,558,4,1,558,4,2,558,13,1,558,13,2,588,13,1,618,4,1,618,4,2,618,13,1,618,13,2,648,13,1,678,4,1,678,4,2,678,13,1,678,13,2,708,13,1,738,4,1,738,4,2,738,13,1,738,13,2,768,13,1,798,4,1,798,4,2,798,13,1,798,13,2,828,13,1,858,4,1,858,4,2,858,13,1,858,13,2,888,13,1,918,4,1,918,4,2,918,13,1,918,13,2,948,13,1,978,4,1,978,4,2,978,13,1,978,13,2,1038,4,1,1038,4,2,1038,13,1,1038,13,2,1098,4,1,1098,13,1,1158,4,1,1158,13,1,1218,4,1,1218,13,1],"669":[378,4,1,378,13,1,438,4,1,438,13,1,498,4,1,498,4,2,498,13,1,499,13,2,528,13,1,558,4,1,558,4,2,558,13,1,559,13,2,588,13,1,618,4,1,618,4,2,618,13,1,619,13,2,648,13,1,678,4,1,678,4,2,678,13,1,679,13,2,708,13,1,738,4,1,738,4,2,738,13,1,739,13,2,768,13,1,798,4,1,798,4,2,798,13,1,799,13,2,828,13,1,858,4,1,858,4,2,858,13,1,859,13,2,888,13,1,918,4,1,918,4,2,918,13,1,919,13,2,948,13,1,978,4,1,978,4,2,978,13,1,979,13,2,1038,4,1,1038,4,2,1038,13,1,1039,13,2,1098,4,1,1098,13,1,1158,4,1,1158,13,1,1218,4,1,1218,13,1],"672":[379,4,1,379,13,1,439,4,1,439,13,1,499,4,1,499,4,2,499,13,1,499,13,2,529,13,1,559,4,1,559,4,2,559,13,1,559,13,2,589,13,1,619,4,1,619,4,2,619,13,1,619,13,2,649,13,1,679,4,1,679,4,2,679,13,1,679,13,2,709,13,1,739,4,1,739,4,2,739,13,1,739,13,2,769,13,1,799,4,1,799,4,2,799,13,1,799,13,2,829,13,1,859,4,1,859,4,2,859,13,1,859,13,2,889,13,1,919,4,1,919,4,2,919,13,1,919,13,2,949,13,1,979,4,1,979,4,2,979,13,1,979,13,2,1039,4,1,1039,4,2,1039,13,1,1039,13,2,1099,4,1,1099,13,1,1159,4,1,1159,13,1,1219,4,1,1219,13,1],"674":[379,4,1,379,13,1,439,4,1,439,13,1,499,4,1,499,4,2,499,13,1,499,13,2,529,13,1,559,4,1,559,4,2,559,13,1,559,13,2,589,13,1,619,4,1,619,4,2,619,13,1,619,13,2,649,13,1,679,4,1,679,4,2,679,13,1,679,13,2,709,13,1,739,4,1,739,4,2,739,13,1,739,13,2,769,13,1,799,4,1,799,4,2,799,13,1,799,13,2,829,13,1,859,4,1,859,4,2,859,13,1,859,13,2,889,13,1,919,4,1,919,4,2,919,13,1,919,13,2,949,13,1,979,4,1,979,4,2,979,13,1,979,13,2,1039,4,1,1039,4,2,1039,13,1,1039,13,2,1099,4,1,1099,13,1,1159,4,1,1159,13,1,1219,4,1,1219,13,1],"1217":[379,4,1,380,13,1,439,4,1,440,13,1,499,4,1,500,4,2,500,13,1,500,13,2,530,13,1,559,4,1,560,4,2,560,13,1,560,13,2,590,13,1,619,4,1,620,4,2,620,13,1,620,13,2,650,13,1,679,4,1,680,4,2,680,13,1,680,13,2,710,13,1,739,4,1,740,4,2,740,13,1,740,13,2,770,13,1,799,4,1,800,4,2,800,13,1,800,13,2,830,13,1,859,4,1,860,4,2,860,13,1,860,13,2,890,13,1,919,4,1,920,4,2,920,13,1,920,13,2,950,13,1,979,4,1,980,4,2,980,13,1,980,13,2,1039,4,1,1040,4,2,1040,13,1,1040,13,2,1099,4,1,1100,13,1,1159,4,1,1160,13,1,1219,4,1,1220,13,1],"1218":[380,4,1,380,13,1,440,4,1,440,13,1,500,4,1,500,4,2,500,13,1,500,13,2,530,13,1,560,4,1,560,4,2,560,13,1,560,13,2,590,13,1,620,4,1,620,4,2,620,13,1,620,13,2,650,13,1,680,4,1,680,4,2,680,13,1,680,13,2,710,13,1,740,4,1,740,4,2,740,13,1,740,13,2,770,13,1,800,4,1,800,4,2,800,13,1,800,13,2,830,13,1,860,4,1,860,4,2,860,13,1,860,13,2,890,13,1,920,4,1,920,4,2,920,13,1,920,13,2,950,13,1,980,4,1,980,4,2,980,13,1,980,13,2,1040,4,1,1040,4,2,1040,13,1,1040,13,2,1100,4,1,1100,13,1,1160,4,1,1160,13,1,1220,4,1,1220,13,1],"561":[381,4,1,441,4,1,501,4,1,501,4,2,561,4,1,561,4,2,621,4,1,621,4,2,681,4,1,681,4,2,741,4,1,741,4,2,801,4,1,801,4,2,861,4,1,861,4,2,921,4,1,921,4,2,981,4,1,981,4,2,1041,4,1,1041,4,2,1101,4,1,1161,4,1,1221,4,1],"563":[381,4,1,441,4,1,501,4,1,501,4,2,561,4,1,561,4,2,621,4,1,621,4,2,681,4,1,681,4,2,741,4,1,741,4,2,801,4,1,801,4,2,861,4,1,861,4,2,921,4,1,921,4,2,981,4,1,981,4,2,1041,4,1,1041,4,2,1101,4,1,1161,4,1,1221,4,1],"565":[382,4,1,442,4,1,502,4,1,502,4,2,562,4,1,562,4,2,622,4,1,622,4,2,682,4,1,682,4,2,742,4,1,742,4,2,802,4,1,802,4,2,862,4,1,862,4,2,922,4,1,922,4,2,982,4,1,982,4,2,1042,4,1,1042,4,2,1102,4,1,1162,4,1,1222,4,1],"677":[382,4,1,442,4,1,502,4,1,502,4,2,562,4,1,562,4,2,622,4,1,622,4,2,682,4,1,682,4,2,742,4,1,742,4,2,802,4,1,802,4,2,862,4,1,862,4,2,922,4,1,922,4,2,982,4,1,982,4,2,1042,4,1,1042,4,2,1102,4,1,1162,4,1,1222,4,1],"566":[383,4,1,443,4,1,503,4,1,503,4,2,563,4,1,563,4,2,623,4,1,623,4,2,683,4,1,683,4,2,743,4,1,743,4,2,803,4,1,803,4,2,863,4,1,863,4,2,923,4,1,923,4,2,983,4,1,983,4,2,1043,4,1,1043,4,2,1103,4,1,1163,4,1,1223,4,1],"678":[384,4,1,444,4,1,504,4,1,504,4,2,564,4,1,564,4,2,624,4,1,624,4,2,684,4,1,684,4,2,744,4,1,744,4,2,804,4,1,804,4,2,864,4,1,864,4,2,924,4,1,924,4,2,984,4,1,984,4,2,1044,4,1,1044,4,2,1104,4,1,1164,4,1,1224,4,1],"571":[384,4,1,444,4,1,504,4,1,504,4,2,564,4,1,564,4,2,624,4,1,624,4,2,684,4,1,684,4,2,744,4,1,744,4,2,804,4,1,804,4,2,864,4,1,864,4,2,924,4,1,924,4,2,984,4,1,984,4,2,1044,4,1,1044,4,2,1104,4,1,1164,4,1,1224,4,1],"572":[384,4,1,444,4,1,504,4,1,505,4,2,564,4,1,565,4,2,624,4,1,625,4,2,684,4,1,685,4,2,744,4,1,745,4,2,804,4,1,805,4,2,864,4,1,865,4,2,924,4,1,925,4,2,984,4,1,985,4,2,1044,4,1,1045,4,2,1104,4,1,1164,4,1,1224,4,1],"680":[384,4,1,444,4,1,504,4,1,506,4,2,564,4,1,566,4,2,624,4,1,626,4,2,684,4,1,686,4,2,744,4,1,746,4,2,804,4,1,806,4,2,864,4,1,866,4,2,924,4,1,926,4,2,984,4,1,986,4,2,1044,4,1,1046,4,2,1104,4,1,1164,4,1,1224,4,1],"573":[386,4,1,446,4,1,506,4,1,506,4,2,566,4,1,566,4,2,626,4,1,626,4,2,686,4,1,686,4,2,746,4,1,746,4,2,806,4,1,806,4,2,866,4,1,866,4,2,926,4,1,926,4,2,986,4,1,986,4,2,1046,4,1,1046,4,2,1106,4,1,1166,4,1,1226,4,1],"82":[345,4,1,390,4,1,405,4,1,450,4,1,465,4,1,465,4,2,509,4,2,510,4,1,525,4,1,525,4,2,569,4,2,570,4,1,585,4,1,585,4,2,629,4,2,630,4,1,645,4,1,645,4,2,689,4,2,690,4,1,705,4,1,705,4,2,749,4,2,750,4,1,765,4,1,765,4,2,809,4,2,810,4,1,825,4,1,825,4,2,869,4,2,870,4,1,885,4,1,885,4,2,929,4,2,930,4,1,945,4,1,945,4,2,989,4,2,990,4,1,1005,4,1,1005,4,2,1049,4,2,1050,4,1,1065,4,1,1065,4,2,1110,4,1,1125,4,1,1170,4,1,1185,4,1,1230,4,1],"1184":[395,4,1,455,4,1,515,4,1,515,4,2,575,4,1,575,4,2,635,4,1,635,4,2,695,4,1,695,4,2,755,4,1,755,4,2,815,4,1,815,4,2,875,4,1,875,4,2,935,4,1,935,4,2,995,4,1,995,4,2,1055,4,1,1055,4,2,1115,4,1,1175,4,1,1235,4,1],"681":[398,4,1,458,4,1,518,4,1,518,4,2,578,4,1,578,4,2,638,4,1,638,4,2,698,4,1,698,4,2,758,4,1,758,4,2,818,4,1,818,4,2,878,4,1,878,4,2,938,4,1,938,4,2,998,4,1,998,4,2,1058,4,1,1058,4,2,1118,4,1,1178,4,1,1238,4,1],"81":[340,4,1,400,4,1,460,4,1,460,4,2,519,4,2,520,4,1,520,4,2,579,4,2,580,4,1,580,4,2,639,4,2,640,4,1,640,4,2,699,4,2,700,4,1,700,4,2,759,4,2,760,4,1,760,4,2,819,4,2,820,4,1,820,4,2,879,4,2,880,4,1,880,4,2,939,4,2,940,4,1,940,4,2,999,4,2,1000,4,1,1000,4,2,1059,4,2,1060,4,1,1060,4,2,1120,4,1,1180,4,1,1240,4,1],"683":[340,4,1,400,4,1,460,4,1,460,4,2,520,4,1,520,4,2,580,4,1,580,4,2,640,4,1,640,4,2,700,4,1,700,4,2,760,4,1,760,4,2,820,4,1,820,4,2,880,4,1,880,4,2,940,4,1,940,4,2,1000,4,1,1000,4,2,1060,4,1,1060,4,2,1120,4,1,1180,4,1],"684":[341,4,1,401,4,1,461,4,1,461,4,2,521,4,1,521,4,2,581,4,1,581,4,2,641,4,1,641,4,2,701,4,1,701,4,2,761,4,1,761,4,2,821,4,1,821,4,2,881,4,1,881,4,2,941,4,1,941,4,2,1001,4,1,1001,4,2,1061,4,1,1061,4,2,1121,4,1,1181,4,1],"574":[342,4,1,402,4,1,462,4,1,462,4,2,522,4,1,522,4,2,582,4,1,582,4,2,642,4,1,642,4,2,702,4,1,702,4,2,762,4,1,762,4,2,822,4,1,822,4,2,882,4,1,882,4,2,942,4,1,942,4,2,1002,4,1,1002,4,2,1062,4,1,1062,4,2,1122,4,1,1182,4,1],"1185":[343,4,1,403,4,1,463,4,1,463,4,2,523,4,1,523,4,2,583,4,1,583,4,2,643,4,1,643,4,2,703,4,1,703,4,2,763,4,1,763,4,2,823,4,1,823,4,2,883,4,1,883,4,2,943,4,1,943,4,2,1003,4,1,1003,4,2,1063,4,1,1063,4,2,1123,4,1,1183,4,1],"576":[349,4,1,409,4,1,469,4,1,469,4,2,529,4,1,529,4,2,589,4,1,589,4,2,649,4,1,649,4,2,709,4,1,709,4,2,769,4,1,769,4,2,829,4,1,829,4,2,889,4,1,889,4,2,949,4,1,949,4,2,1009,4,1,1009,4,2,1069,4,1,1069,4,2,1129,4,1,1189,4,1],"685":[349,4,1,409,4,1,469,4,1,469,4,2,529,4,1,529,4,2,589,4,1,589,4,2,649,4,1,649,4,2,709,4,1,709,4,2,769,4,1,769,4,2,829,4,1,829,4,2,889,4,1,889,4,2,949,4,1,949,4,2,1009,4,1,1009,4,2,1069,4,1,1069,4,2,1129,4,1,1189,4,1],"577":[350,4,1,410,4,1,470,4,1,470,4,2,530,4,1,530,4,2,590,4,1,590,4,2,650,4,1,650,4,2,710,4,1,710,4,2,770,4,1,770,4,2,830,4,1,830,4,2,890,4,1,890,4,2,950,4,1,950,4,2,1010,4,1,1010,4,2,1070,4,1,1070,4,2,1130,4,1,1190,4,1],"579":[350,4,1,410,4,1,470,4,1,470,4,2,530,4,1,530,4,2,590,4,1,590,4,2,650,4,1,650,4,2,710,4,1,710,4,2,770,4,1,770,4,2,830,4,1,830,4,2,890,4,1,890,4,2,950,4,1,950,4,2,1010,4,1,1010,4,2,1070,4,1,1070,4,2,1130,4,1,1190,4,1],"580":[351,4,1,411,4,1,471,4,1,471,4,2,531,4,1,531,4,2,591,4,1,591,4,2,651,4,1,651,4,2,711,4,1,711,4,2,771,4,1,771,4,2,831,4,1,831,4,2,891,4,1,891,4,2,951,4,1,951,4,2,1011,4,1,1011,4,2,1071,4,1,1071,4,2,1131,4,1,1191,4,1],"581":[352,4,1,412,4,1,472,4,1,472,4,2,532,4,1,532,4,2,592,4,1,592,4,2,652,4,1,652,4,2,712,4,1,712,4,2,772,4,1,772,4,2,832,4,1,832,4,2,892,4,1,892,4,2,952,4,1,952,4,2,1012,4,1,1012,4,2,1072,4,1,1072,4,2,1132,4,1,1192,4,1],"79":[352,4,1,412,4,1,472,4,1,472,4,2,532,4,1,532,4,2,592,4,1,592,4,2,652,4,1,652,4,2,712,4,1,712,4,2,772,4,1,772,4,2,832,4,1,832,4,2,892,4,1,892,4,2,952,4,1,952,4,2,1012,4,1,1012,4,2,1072,4,1,1072,4,2,1132,4,1,1192,4,1],"282":[353,4,1,413,4,1,473,4,1,473,4,2,533,4,1,533,4,2,593,4,1,593,4,2,653,4,1,653,4,2,713,4,1,713,4,2,773,4,1,773,4,2,833,4,1,833,4,2,893,4,1,893,4,2,953,4,1,953,4,2,1013,4,1,1013,4,2,1073,4,1,1073,4,2,1133,4,1,1193,4,1],"583":[355,4,1,415,4,1,475,4,1,475,4,2,535,4,1,535,4,2,595,4,1,595,4,2,655,4,1,655,4,2,715,4,1,715,4,2,775,4,1,775,4,2,835,4,1,835,4,2,895,4,1,895,4,2,955,4,1,955,4,2,1015,4,1,1015,4,2,1075,4,1,1075,4,2,1135,4,1,1195,4,1],"283":[355,4,1,415,4,1,475,4,1,475,4,2,535,4,1,535,4,2,595,4,1,595,4,2,655,4,1,655,4,2,715,4,1,715,4,2,775,4,1,775,4,2,835,4,1,835,4,2,895,4,1,895,4,2,955,4,1,955,4,2,1015,4,1,1015,4,2,1075,4,1,1075,4,2,1135,4,1,1195,4,1],"central-bay-K":[365,4,1,375,10,1,425,4,1,435,10,1,485,4,1,485,4,2,495,10,1,495,10,2,545,4,1,545,4,2,555,10,1,555,10,2,605,4,1,605,4,2,615,10,1,615,10,2,665,4,1,665,4,2,675,10,1,675,10,2,725,4,1,725,4,2,735,10,1,735,10,2,785,4,1,785,4,2,795,10,1,795,10,2,845,4,1,845,4,2,855,10,1,855,10,2,905,4,1,905,4,2,915,10,1,915,10,2,965,4,1,965,4,2,975,10,1,975,10,2,1025,4,1,1025,4,2,1035,10,1,1035,10,2,1085,4,1,1085,4,2,1095,10,1,1145,4,1,1155,10,1,1205,4,1,1215,10,1],"624":[340,10,1,400,10,1,460,10,1,460,10,2,520,10,1,520,10,2,580,10,1,580,10,2,640,10,1,640,10,2,700,10,1,700,10,2,760,10,1,760,10,2,820,10,1,820,10,2,880,10,1,880,10,2,940,10,1,940,10,2,1000,10,1,1000,10,2,1060,10,1,1060,10,2,1120,10,1,1180,10,1,1240,10,1],"627":[341,10,1,347,6,1,401,10,1,407,6,1,461,10,1,461,10,2,467,6,1,467,6,2,521,10,1,521,10,2,527,6,1,527,6,2,581,10,1,581,10,2,587,6,1,587,6,2,641,10,1,641,10,2,647,6,1,647,6,2,701,10,1,701,10,2,707,6,1,707,6,2,761,10,1,761,10,2,767,6,1,767,6,2,821,10,1,821,10,2,827,6,1,827,6,2,881,10,1,881,10,2,887,6,1,887,6,2,941,10,1,941,10,2,947,6,1,947,6,2,1001,10,1,1001,10,2,1007,6,1,1007,6,2,1061,10,1,1061,10,2,1067,6,1,1067,6,2,1121,10,1,1127,6,1,1181,10,1,1187,6,1],"628":[342,10,1,347,6,1,402,10,1,407,6,1,462,10,1,462,10,2,467,6,1,468,6,2,522,10,1,522,10,2,527,6,1,528,6,2,582,10,1,582,10,2,587,6,1,588,6,2,642,10,1,642,10,2,647,6,1,648,6,2,702,10,1,702,10,2,707,6,1,708,6,2,762,10,1,762,10,2,767,6,1,768,6,2,822,10,1,822,10,2,827,6,1,828,6,2,882,10,1,882,10,2,887,6,1,888,6,2,942,10,1,942,10,2,947,6,1,948,6,2,1002,10,1,1002,10,2,1007,6,1,1008,6,2,1062,10,1,1062,10,2,1067,6,1,1068,6,2,1122,10,1,1127,6,1,1182,10,1,1187,6,1],"630":[343,10,1,348,6,1,403,10,1,408,6,1,463,10,1,463,10,2,468,6,1,468,6,2,523,10,1,523,10,2,528,6,1,528,6,2,583,10,1,583,10,2,588,6,1,588,6,2,643,10,1,643,10,2,648,6,1,648,6,2,703,10,1,703,10,2,708,6,1,708,6,2,763,10,1,763,10,2,768,6,1,768,6,2,823,10,1,823,10,2,828,6,1,828,6,2,883,10,1,883,10,2,888,6,1,888,6,2,943,10,1,943,10,2,948,6,1,948,6,2,1003,10,1,1003,10,2,1008,6,1,1008,6,2,1063,10,1,1063,10,2,1068,6,1,1068,6,2,1123,10,1,1128,6,1,1183,10,1,1188,6,1],"631":[344,10,1,403,10,1,463,10,1,464,10,2,523,10,1,523,10,2,583,10,1,583,10,2,643,10,1,643,10,2,703,10,1,703,10,2,763,10,1,763,10,2,823,10,1,823,10,2,883,10,1,883,10,2,943,10,1,943,10,2,1003,10,1,1003,10,2,1063,10,1,1063,10,2,1123,10,1,1183,10,1],"634":[344,10,1,404,10,1,464,10,1,465,10,2,524,10,1,524,10,2,584,10,1,584,10,2,644,10,1,644,10,2,704,10,1,704,10,2,764,10,1,764,10,2,824,10,1,824,10,2,884,10,1,884,10,2,944,10,1,944,10,2,1004,10,1,1004,10,2,1064,10,1,1064,10,2,1124,10,1,1184,10,1],"637":[345,10,1,405,10,1,465,10,1,466,10,2,525,10,1,525,10,2,585,10,1,585,10,2,645,10,1,645,10,2,705,10,1,705,10,2,765,10,1,765,10,2,825,10,1,825,10,2,885,10,1,885,10,2,945,10,1,945,10,2,1005,10,1,1005,10,2,1065,10,1,1065,10,2,1125,10,1,1185,10,1],"639":[346,10,1,406,10,1,466,10,1,466,10,2,526,10,1,526,10,2,586,10,1,586,10,2,646,10,1,646,10,2,706,10,1,706,10,2,766,10,1,766,10,2,826,10,1,826,10,2,886,10,1,886,10,2,946,10,1,946,10,2,1006,10,1,1006,10,2,1066,10,1,1066,10,2,1126,10,1,1186,10,1],"641":[347,10,1,407,10,1,467,10,1,467,10,2,527,10,1,527,10,2,587,10,1,587,10,2,647,10,1,647,10,2,707,10,1,707,10,2,767,10,1,767,10,2,827,10,1,827,10,2,887,10,1,887,10,2,947,10,1,947,10,2,1007,10,1,1007,10,2,1067,10,1,1067,10,2,1127,10,1,1187,10,1],"642":[347,10,1,407,10,1,467,10,1,467,10,2,527,10,1,527,10,2,587,10,1,587,10,2,647,10,1,647,10,2,707,10,1,707,10,2,767,10,1,767,10,2,827,10,1,827,10,2,887,10,1,887,10,2,947,10,1,947,10,2,1007,10,1,1007,10,2,1067,10,1,1067,10,2,1127,10,1,1187,10,1],"644":[348,10,1,408,10,1,468,10,1,468,10,2,528,10,1,528,10,2,588,10,1,588,10,2,648,10,1,648,10,2,708,10,1,708,10,2,768,10,1,768,10,2,828,10,1,828,10,2,888,10,1,888,10,2,948,10,1,948,10,2,1008,10,1,1008,10,2,1068,10,1,1068,10,2,1128,10,1,1188,10,1],"646":[349,10,1,409,10,1,468,10,2,469,10,1,529,10,1,529,10,2,589,10,1,589,10,2,649,10,1,649,10,2,709,10,1,709,10,2,769,10,1,769,10,2,829,10,1,829,10,2,889,10,1,889,10,2,949,10,1,949,10,2,1009,10,1,1009,10,2,1069,10,1,1069,10,2,1129,10,1,1189,10,1],"703":[350,10,1,410,10,1,470,10,1,470,10,2,530,10,1,530,10,2,590,10,1,590,10,2,650,10,1,650,10,2,710,10,1,710,10,2,770,10,1,770,10,2,830,10,1,830,10,2,890,10,1,890,10,2,950,10,1,950,10,2,1010,10,1,1010,10,2,1070,10,1,1070,10,2,1130,10,1,1190,10,1],"704":[351,10,1,411,10,1,471,10,1,471,10,2,531,10,1,531,10,2,591,10,1,591,10,2,651,10,1,651,10,2,711,10,1,711,10,2,771,10,1,771,10,2,831,10,1,831,10,2,891,10,1,891,10,2,951,10,1,951,10,2,1011,10,1,1011,10,2,1071,10,1,1071,10,2,1131,10,1,1191,10,1],"987655":[351,10,1,412,10,1,472,10,1,472,10,2,532,10,1,532,10,2,592,10,1,592,10,2,652,10,1,652,10,2,712,10,1,712,10,2,772,10,1,772,10,2,832,10,1,832,10,2,892,10,1,892,10,2,952,10,1,952,10,2,1012,10,1,1012,10,2,1072,10,1,1072,10,2,1132,10,1,1192,10,1],"654321":[352,10,1,413,10,1,472,10,2,473,10,1,533,10,1,533,10,2,593,10,1,593,10,2,653,10,1,653,10,2,713,10,1,713,10,2,773,10,1,773,10,2,833,10,1,833,10,2,893,10,1,893,10,2,953,10,1,953,10,2,1013,10,1,1013,10,2,1073,10,1,1073,10,2,1133,10,1,1193,10,1],"11":[355,10,1,415,10,1,475,10,1,475,10,2,535,10,1,535,10,2,595,10,1,595,10,2,655,10,1,655,10,2,715,10,1,715,10,2,775,10,1,775,10,2,835,10,1,835,10,2,895,10,1,895,10,2,955,10,1,955,10,2,1015,10,1,1015,10,2,1075,10,1,1075,10,2,1135,10,1,1195,10,1],"84":[356,10,1,416,10,1,476,10,1,477,10,2,536,10,1,537,10,2,596,10,1,597,10,2,656,10,1,657,10,2,716,10,1,717,10,2,776,10,1,777,10,2,836,10,1,837,10,2,896,10,1,897,10,2,956,10,1,957,10,2,1016,10,1,1017,10,2,1076,10,1,1077,10,2,1136,10,1,1196,10,1],"709":[357,10,1,417,10,1,477,10,1,478,10,2,537,10,1,538,10,2,597,10,1,598,10,2,657,10,1,658,10,2,717,10,1,718,10,2,777,10,1,778,10,2,837,10,1,838,10,2,897,10,1,898,10,2,957,10,1,958,10,2,1017,10,1,1018,10,2,1077,10,1,1078,10,2,1137,10,1,1197,10,1],"666":[357,10,1,417,10,1,477,10,1,479,10,2,537,10,1,538,10,2,597,10,1,598,10,2,657,10,1,658,10,2,717,10,1,718,10,2,777,10,1,778,10,2,837,10,1,838,10,2,897,10,1,898,10,2,957,10,1,958,10,2,1017,10,1,1018,10,2,1077,10,1,1078,10,2,1137,10,1,1197,10,1],"711":[357,10,1,417,10,1,477,10,1,479,10,2,537,10,1,538,10,2,597,10,1,598,10,2,657,10,1,658,10,2,717,10,1,718,10,2,777,10,1,778,10,2,837,10,1,838,10,2,897,10,1,898,10,2,957,10,1,958,10,2,1017,10,1,1018,10,2,1077,10,1,1078,10,2,1137,10,1,1197,10,1],"712":[358,10,1,418,10,1,478,10,1,480,10,2,538,10,1,539,10,2,598,10,1,599,10,2,658,10,1,659,10,2,718,10,1,719,10,2,778,10,1,779,10,2,838,10,1,839,10,2,898,10,1,899,10,2,958,10,1,959,10,2,1018,10,1,1019,10,2,1078,10,1,1079,10,2,1138,10,1,1198,10,1],"713":[359,10,1,419,10,1,479,10,1,480,10,2,539,10,1,540,10,2,599,10,1,600,10,2,659,10,1,660,10,2,719,10,1,720,10,2,779,10,1,780,10,2,839,10,1,840,10,2,899,10,1,900,10,2,959,10,1,960,10,2,1019,10,1,1020,10,2,1079,10,1,1080,10,2,1139,10,1,1199,10,1],"715":[359,10,1,419,10,1,479,10,1,481,10,2,539,10,1,540,10,2,599,10,1,600,10,2,659,10,1,660,10,2,719,10,1,720,10,2,779,10,1,780,10,2,839,10,1,840,10,2,899,10,1,900,10,2,959,10,1,960,10,2,1019,10,1,1020,10,2,1079,10,1,1080,10,2,1139,10,1,1199,10,1],"717":[360,10,1,420,10,1,480,10,1,482,10,2,540,10,1,541,10,2,600,10,1,601,10,2,660,10,1,661,10,2,720,10,1,721,10,2,780,10,1,781,10,2,840,10,1,841,10,2,900,10,1,901,10,2,960,10,1,961,10,2,1020,10,1,1021,10,2,1080,10,1,1081,10,2,1140,10,1,1200,10,1],"iy7h":[361,10,1,420,10,1,480,10,1,482,10,2,540,10,1,541,10,2,600,10,1,601,10,2,660,10,1,661,10,2,720,10,1,721,10,2,780,10,1,781,10,2,840,10,1,841,10,2,900,10,1,901,10,2,960,10,1,961,10,2,1020,10,1,1021,10,2,1080,10,1,1081,10,2,1140,10,1,1200,10,1],"1210":[363,10,1,364,6,1,364,7,1,376,19,1,423,10,1,424,6,1,424,7,1,436,19,1,483,10,1,484,6,1,484,7,1,484,7,2,484,10,2,485,6,2,496,19,1,496,19,2,543,10,1,544,6,1,544,7,1,544,7,2,544,10,2,545,6,2,556,19,1,556,19,2,574,7,1,603,10,1,604,6,1,604,7,1,604,7,2,604,10,2,605,6,2,616,19,1,616,19,2,634,7,1,663,10,1,664,6,1,664,7,1,664,7,2,664,10,2,665,6,2,676,19,1,676,19,2,694,7,1,723,10,1,724,6,1,724,7,1,724,7,2,724,10,2,725,6,2,736,19,1,736,19,2,754,7,1,783,10,1,784,6,1,784,7,1,784,7,2,784,10,2,785,6,2,796,19,1,796,19,2,814,7,1,843,10,1,844,6,1,844,7,1,844,7,2,844,10,2,845,6,2,856,19,1,856,19,2,874,7,1,903,10,1,904,6,1,904,7,1,904,7,2,904,10,2,905,6,2,916,19,1,916,19,2,934,7,1,963,10,1,964,6,1,964,7,1,964,7,2,964,10,2,965,6,2,976,19,1,976,19,2,994,7,1,1023,10,1,1024,6,1,1024,7,1,1024,7,2,1024,10,2,1025,6,2,1036,19,1,1036,19,2,1083,10,1,1084,6,1,1084,7,1,1084,7,2,1084,10,2,1085,6,2,1096,19,1,1143,10,1,1144,6,1,1144,7,1,1156,19,1,1203,10,1,1204,6,1,1204,7,1,1216,19,1],"1160":[376,7,1,376,10,1,436,7,1,436,10,1,496,7,1,496,7,2,496,10,1,496,10,2,526,7,1,556,7,1,556,7,2,556,10,1,556,10,2,586,7,1,616,7,1,616,7,2,616,10,1,616,10,2,646,7,1,676,7,1,676,7,2,676,10,1,676,10,2,706,7,1,736,7,1,736,7,2,736,10,1,736,10,2,766,7,1,796,7,1,796,7,2,796,10,1,796,10,2,826,7,1,856,7,1,856,7,2,856,10,1,856,10,2,886,7,1,916,7,1,916,7,2,916,10,1,916,10,2,946,7,1,976,7,1,976,7,2,976,10,1,976,10,2,1036,7,1,1036,7,2,1036,10,1,1036,10,2,1096,7,1,1096,10,1,1156,7,1,1156,10,1,1216,7,1,1216,10,1],"1162":[377,7,1,377,10,1,437,7,1,437,10,1,497,7,1,497,7,2,497,10,1,497,10,2,527,7,1,557,7,1,557,7,2,557,10,1,557,10,2,587,7,1,617,7,1,617,7,2,617,10,1,617,10,2,647,7,1,677,7,1,677,7,2,677,10,1,677,10,2,707,7,1,737,7,1,737,7,2,737,10,1,737,10,2,767,7,1,797,7,1,797,7,2,797,10,1,797,10,2,827,7,1,857,7,1,857,7,2,857,10,1,857,10,2,887,7,1,917,7,1,917,7,2,917,10,1,917,10,2,947,7,1,977,7,1,977,7,2,977,10,1,977,10,2,1037,7,1,1037,7,2,1037,10,1,1037,10,2,1097,7,1,1097,10,1,1157,7,1,1157,10,1,1217,7,1,1217,10,1],"588":[377,10,1,437,10,1,497,10,1,497,10,2,557,10,1,557,10,2,617,10,1,617,10,2,677,10,1,677,10,2,737,10,1,737,10,2,797,10,1,797,10,2,857,10,1,857,10,2,917,10,1,917,10,2,977,10,1,977,10,2,1037,10,1,1037,10,2,1097,10,1,1157,10,1,1217,10,1],"589":[377,10,1,437,10,1,497,10,1,497,10,2,557,10,1,557,10,2,617,10,1,617,10,2,677,10,1,677,10,2,737,10,1,737,10,2,797,10,1,797,10,2,857,10,1,857,10,2,917,10,1,917,10,2,977,10,1,977,10,2,1037,10,1,1037,10,2,1097,10,1,1157,10,1,1217,10,1],"590":[378,10,1,438,10,1,498,10,1,498,10,2,558,10,1,558,10,2,618,10,1,618,10,2,678,10,1,678,10,2,738,10,1,738,10,2,798,10,1,798,10,2,858,10,1,858,10,2,918,10,1,918,10,2,978,10,1,978,10,2,1038,10,1,1038,10,2,1098,10,1,1158,10,1,1218,10,1],"591":[378,10,1,438,10,1,498,10,1,498,10,2,558,10,1,558,10,2,618,10,1,618,10,2,678,10,1,678,10,2,738,10,1,738,10,2,798,10,1,798,10,2,858,10,1,858,10,2,918,10,1,918,10,2,978,10,1,978,10,2,1038,10,1,1038,10,2,1098,10,1,1158,10,1,1218,10,1],"592":[378,10,1,438,10,1,498,10,1,498,10,2,558,10,1,558,10,2,618,10,1,618,10,2,678,10,1,678,10,2,738,10,1,738,10,2,798,10,1,798,10,2,858,10,1,858,10,2,918,10,1,918,10,2,978,10,1,978,10,2,1038,10,1,1038,10,2,1098,10,1,1158,10,1,1218,10,1],"593":[379,10,1,439,10,1,499,10,1,499,10,2,559,10,1,559,10,2,619,10,1,619,10,2,679,10,1,679,10,2,739,10,1,739,10,2,799,10,1,799,10,2,859,10,1,859,10,2,919,10,1,919,10,2,979,10,1,979,10,2,1039,10,1,1039,10,2,1099,10,1,1159,10,1,1219,10,1],"594":[379,10,1,439,10,1,499,10,1,499,10,2,559,10,1,559,10,2,619,10,1,619,10,2,679,10,1,679,10,2,739,10,1,739,10,2,799,10,1,799,10,2,859,10,1,859,10,2,919,10,1,919,10,2,979,10,1,979,10,2,1039,10,1,1039,10,2,1099,10,1,1159,10,1,1219,10,1],"83":[380,10,1,440,10,1,500,10,1,500,10,2,560,10,1,560,10,2,620,10,1,620,10,2,680,10,1,680,10,2,740,10,1,740,10,2,800,10,1,800,10,2,860,10,1,860,10,2,920,10,1,920,10,2,980,10,1,980,10,2,1040,10,1,1040,10,2,1100,10,1,1160,10,1,1220,10,1],"599":[380,10,1,440,10,1,500,10,1,500,10,2,560,10,1,560,10,2,620,10,1,620,10,2,680,10,1,680,10,2,740,10,1,740,10,2,800,10,1,800,10,2,860,10,1,860,10,2,920,10,1,920,10,2,980,10,1,980,10,2,1040,10,1,1040,10,2,1100,10,1,1160,10,1,1220,10,1],"601":[381,10,1,441,10,1,501,10,1,501,10,2,561,10,1,561,10,2,621,10,1,621,10,2,681,10,1,681,10,2,741,10,1,741,10,2,801,10,1,801,10,2,861,10,1,861,10,2,921,10,1,921,10,2,981,10,1,981,10,2,1041,10,1,1041,10,2,1101,10,1,1161,10,1,1221,10,1],"602":[381,10,1,441,10,1,501,10,1,501,10,2,561,10,1,561,10,2,621,10,1,621,10,2,681,10,1,681,10,2,741,10,1,741,10,2,801,10,1,801,10,2,861,10,1,861,10,2,921,10,1,921,10,2,981,10,1,981,10,2,1041,10,1,1041,10,2,1101,10,1,1161,10,1,1221,10,1],"604":[382,10,1,442,10,1,502,10,1,502,10,2,562,10,1,562,10,2,622,10,1,622,10,2,682,10,1,682,10,2,742,10,1,742,10,2,802,10,1,802,10,2,862,10,1,862,10,2,922,10,1,922,10,2,982,10,1,982,10,2,1042,10,1,1042,10,2,1102,10,1,1162,10,1,1222,10,1],"608":[382,10,1,442,10,1,502,10,1,502,10,2,562,10,1,562,10,2,622,10,1,622,10,2,682,10,1,682,10,2,742,10,1,742,10,2,802,10,1,802,10,2,862,10,1,862,10,2,922,10,1,922,10,2,982,10,1,982,10,2,1042,10,1,1042,10,2,1102,10,1,1162,10,1,1222,10,1],"609":[383,10,1,443,10,1,503,10,1,503,10,2,563,10,1,563,10,2,623,10,1,623,10,2,683,10,1,683,10,2,743,10,1,743,10,2,803,10,1,803,10,2,863,10,1,863,10,2,923,10,1,923,10,2,983,10,1,983,10,2,1043,10,1,1043,10,2,1103,10,1,1163,10,1,1223,10,1],"16":[383,10,1,443,10,1,503,10,1,503,10,2,563,10,1,563,10,2,623,10,1,623,10,2,683,10,1,683,10,2,743,10,1,743,10,2,803,10,1,803,10,2,863,10,1,863,10,2,923,10,1,923,10,2,983,10,1,983,10,2,1043,10,1,1043,10,2,1103,10,1,1163,10,1,1223,10,1],"931":[384,10,1,444,10,1,504,10,1,504,10,2,564,10,1,564,10,2,624,10,1,624,10,2,684,10,1,684,10,2,744,10,1,744,10,2,804,10,1,804,10,2,864,10,1,864,10,2,924,10,1,924,10,2,984,10,1,984,10,2,1044,10,1,1044,10,2,1104,10,1,1164,10,1,1224,10,1],"987661":[384,10,1,444,10,1,504,10,1,504,10,2,564,10,1,564,10,2,624,10,1,624,10,2,684,10,1,684,10,2,744,10,1,744,10,2,804,10,1,804,10,2,864,10,1,864,10,2,924,10,1,924,10,2,984,10,1,984,10,2,1044,10,1,1044,10,2,1104,10,1,1164,10,1,1224,10,1],"889":[385,10,1,445,10,1,505,10,1,505,10,2,565,10,1,565,10,2,625,10,1,625,10,2,685,10,1,685,10,2,745,10,1,745,10,2,805,10,1,805,10,2,865,10,1,865,10,2,925,10,1,925,10,2,985,10,1,985,10,2,1045,10,1,1045,10,2,1105,10,1,1165,10,1,1225,10,1],"892":[386,10,1,446,10,1,506,10,1,506,10,2,566,10,1,566,10,2,626,10,1,626,10,2,686,10,1,686,10,2,746,10,1,746,10,2,806,10,1,806,10,2,866,10,1,866,10,2,926,10,1,926,10,2,986,10,1,986,10,2,1046,10,1,1046,10,2,1106,10,1,1166,10,1,1226,10,1],"894":[386,10,1,446,10,1,506,10,1,506,10,2,566,10,1,566,10,2,626,10,1,626,10,2,686,10,1,686,10,2,746,10,1,746,10,2,806,10,1,806,10,2,866,10,1,866,10,2,926,10,1,926,10,2,986,10,1,986,10,2,1046,10,1,1046,10,2,1106,10,1,1166,10,1,1226,10,1],"9":[388,10,1,448,10,1,508,10,1,508,10,2,568,10,1,568,10,2,628,10,1,628,10,2,688,10,1,688,10,2,748,10,1,748,10,2,808,10,1,808,10,2,868,10,1,868,10,2,928,10,1,928,10,2,988,10,1,988,10,2,1048,10,1,1048,10,2,1108,10,1,1168,10,1,1228,10,1],"1353":[390,10,1,450,10,1,510,10,1,510,10,2,570,10,1,570,10,2,630,10,1,630,10,2,690,10,1,690,10,2,750,10,1,750,10,2,810,10,1,810,10,2,870,10,1,870,10,2,930,10,1,930,10,2,990,10,1,990,10,2,1050,10,1,1050,10,2,1110,10,1,1170,10,1,1230,10,1],"123466":[392,10,1,452,10,1,512,10,1,512,10,2,572,10,1,572,10,2,632,10,1,632,10,2,692,10,1,692,10,2,752,10,1,752,10,2,812,10,1,812,10,2,872,10,1,872,10,2,932,10,1,932,10,2,992,10,1,992,10,2,1052,10,1,1052,10,2,1112,10,1,1172,10,1,1232,10,1],"987662":[394,10,1,454,10,1,514,10,1,514,10,2,574,10,1,574,10,2,634,10,1,634,10,2,694,10,1,694,10,2,754,10,1,754,10,2,814,10,1,814,10,2,874,10,1,874,10,2,934,10,1,934,10,2,994,10,1,994,10,2,1054,10,1,1054,10,2,1114,10,1,1174,10,1,1234,10,1],"616":[395,10,1,455,10,1,515,10,1,515,10,2,575,10,1,575,10,2,635,10,1,635,10,2,695,10,1,695,10,2,755,10,1,755,10,2,815,10,1,815,10,2,875,10,1,875,10,2,935,10,1,935,10,2,995,10,1,995,10,2,1055,10,1,1055,10,2,1115,10,1,1175,10,1,1235,10,1],"617":[396,10,1,456,10,1,516,10,1,516,10,2,576,10,1,576,10,2,636,10,1,636,10,2,696,10,1,696,10,2,756,10,1,756,10,2,816,10,1,816,10,2,876,10,1,876,10,2,936,10,1,936,10,2,996,10,1,996,10,2,1056,10,1,1056,10,2,1116,10,1,1176,10,1,1236,10,1],"6trk":[397,10,1,457,10,1,517,10,1,517,10,2,577,10,1,577,10,2,637,10,1,637,10,2,697,10,1,697,10,2,757,10,1,757,10,2,817,10,1,817,10,2,877,10,1,877,10,2,937,10,1,937,10,2,997,10,1,997,10,2,1057,10,1,1057,10,2,1117,10,1,1177,10,1,1237,10,1],"619":[398,10,1,458,10,1,518,10,1,518,10,2,578,10,1,578,10,2,638,10,1,638,10,2,698,10,1,698,10,2,758,10,1,758,10,2,818,10,1,818,10,2,878,10,1,878,10,2,938,10,1,938,10,2,998,10,1,998,10,2,1058,10,1,1058,10,2,1118,10,1,1178,10,1,1238,10,1],"697":[399,10,1,459,10,1,519,10,1,519,10,2,579,10,1,579,10,2,639,10,1,639,10,2,699,10,1,699,10,2,759,10,1,759,10,2,819,10,1,819,10,2,879,10,1,879,10,2,939,10,1,939,10,2,999,10,1,999,10,2,1059,10,1,1059,10,2,1119,10,1,1179,10,1,1239,10,1],"621":[399,10,1,459,10,1,519,10,1,519,10,2,579,10,1,579,10,2,639,10,1,639,10,2,699,10,1,699,10,2,759,10,1,759,10,2,819,10,1,819,10,2,879,10,1,879,10,2,939,10,1,939,10,2,999,10,1,999,10,2,1059,10,1,1059,10,2,1119,10,1,1179,10,1,1239,10,1],"1204":[362,7,1,421,10,1,422,7,1,481,10,1,482,7,1,482,7,2,541,10,1,542,7,1,542,7,2,542,10,2,572,7,1,601,10,1,602,7,1,602,7,2,602,10,2,632,7,1,661,10,1,662,7,1,662,7,2,662,10,2,692,7,1,721,10,1,722,7,1,722,7,2,722,10,2,752,7,1,781,10,1,782,7,1,782,7,2,782,10,2,812,7,1,841,10,1,842,7,1,842,7,2,842,10,2,872,7,1,901,10,1,902,7,1,902,7,2,902,10,2,932,7,1,961,10,1,962,7,1,962,7,2,962,10,2,992,7,1,1021,10,1,1022,7,1,1022,7,2,1022,10,2,1081,10,1,1082,7,1,1082,7,2,1082,10,2,1141,10,1,1142,7,1,1201,10,1,1202,7,1],"central-bay-O":[367,5,1,375,11,1,427,5,1,435,11,1,487,5,1,487,5,2,495,11,1,495,11,2,525,11,1,547,5,1,547,5,2,555,11,1,555,11,2,577,5,1,585,11,1,607,5,1,607,5,2,615,11,1,615,11,2,637,5,1,645,11,1,667,5,1,667,5,2,675,11,1,675,11,2,697,5,1,705,11,1,727,5,1,727,5,2,735,11,1,735,11,2,757,5,1,765,11,1,787,5,1,787,5,2,795,11,1,795,11,2,817,5,1,825,11,1,847,5,1,847,5,2,855,11,1,855,11,2,877,5,1,885,11,1,907,5,1,907,5,2,915,11,1,915,11,2,937,5,1,945,11,1,967,5,1,967,5,2,975,11,1,975,11,2,997,5,1,1027,5,1,1027,5,2,1035,11,1,1035,11,2,1087,5,1,1087,5,2,1095,11,1,1147,5,1,1155,11,1,1207,5,1,1215,11,1],"424":[377,8,1,377,11,1,377,15,1,437,1,1,437,11,1,437,15,1,497,1,2,497,8,1,497,11,1,497,11,2,497,15,1,497,15,2,527,11,1,557,1,1,557,1,2,557,11,1,557,11,2,557,15,1,557,15,2,587,11,1,617,1,2,617,8,1,617,11,1,617,11,2,617,15,1,617,15,2,647,11,1,677,1,1,677,1,2,677,11,1,677,11,2,677,15,1,677,15,2,707,11,1,737,1,2,737,8,1,737,11,1,737,11,2,737,15,1,737,15,2,767,11,1,797,1,1,797,1,2,797,11,1,797,11,2,797,15,1,797,15,2,827,11,1,857,1,2,857,8,1,857,11,1,857,11,2,857,15,1,857,15,2,887,11,1,917,1,1,917,1,2,917,11,1,917,11,2,917,15,1,917,15,2,947,11,1,977,1,2,977,8,1,977,11,1,977,11,2,977,15,1,977,15,2,1037,1,1,1037,1,2,1037,11,1,1037,11,2,1037,15,1,1037,15,2,1097,1,1,1097,11,1,1097,15,1,1157,1,1,1157,11,1,1157,15,1,1217,1,1,1217,11,1,1217,15,1],"425":[377,8,1,377,11,1,377,15,1,437,1,1,437,11,1,437,15,1,497,8,1,497,11,1,497,11,2,497,15,1,497,15,2,498,1,2,527,11,1,557,1,1,557,11,1,557,11,2,557,15,1,557,15,2,558,1,2,587,11,1,617,8,1,617,11,1,617,11,2,617,15,1,617,15,2,618,1,2,647,11,1,677,1,1,677,11,1,677,11,2,677,15,1,677,15,2,678,1,2,707,11,1,737,8,1,737,11,1,737,11,2,737,15,1,737,15,2,738,1,2,767,11,1,797,1,1,797,11,1,797,11,2,797,15,1,797,15,2,798,1,2,827,11,1,857,8,1,857,11,1,857,11,2,857,15,1,857,15,2,858,1,2,887,11,1,917,1,1,917,11,1,917,11,2,917,15,1,917,15,2,918,1,2,947,11,1,977,8,1,977,11,1,977,11,2,977,15,1,977,15,2,978,1,2,1037,1,1,1037,11,1,1037,11,2,1037,15,1,1037,15,2,1038,1,2,1097,1,1,1097,11,1,1097,15,1,1157,1,1,1157,11,1,1157,15,1,1217,1,1,1217,11,1,1217,15,1],"488":[378,11,1,378,15,1,438,11,1,438,15,1,498,11,1,498,11,2,498,15,1,498,15,2,528,11,1,558,11,1,558,11,2,558,15,1,558,15,2,588,11,1,618,11,1,618,11,2,618,15,1,618,15,2,648,11,1,678,11,1,678,11,2,678,15,1,678,15,2,708,11,1,738,11,1,738,11,2,738,15,1,738,15,2,768,11,1,798,11,1,798,11,2,798,15,1,798,15,2,828,11,1,858,11,1,858,11,2,858,15,1,858,15,2,888,11,1,918,11,1,918,11,2,918,15,1,918,15,2,948,11,1,978,11,1,978,11,2,978,15,1,978,15,2,1038,11,1,1038,11,2,1038,15,1,1038,15,2,1098,11,1,1098,15,1,1158,11,1,1158,15,1,1218,11,1,1218,15,1],"795":[380,11,1,440,11,1,500,11,1,500,11,2,530,11,1,560,11,1,560,11,2,590,11,1,620,11,1,620,11,2,650,11,1,680,11,1,680,11,2,710,11,1,740,11,1,740,11,2,770,11,1,800,11,1,800,11,2,830,11,1,860,11,1,860,11,2,890,11,1,920,11,1,920,11,2,950,11,1,980,11,1,980,11,2,1040,11,1,1040,11,2,1100,11,1,1160,11,1,1220,11,1],"796":[380,11,1,440,11,1,500,11,1,500,11,2,530,11,1,560,11,1,560,11,2,590,11,1,620,11,1,620,11,2,650,11,1,680,11,1,680,11,2,710,11,1,740,11,1,740,11,2,770,11,1,800,11,1,800,11,2,830,11,1,860,11,1,860,11,2,890,11,1,920,11,1,920,11,2,950,11,1,980,11,1,980,11,2,1040,11,1,1040,11,2,1100,11,1,1160,11,1,1220,11,1],"797":[381,11,1,441,11,1,501,11,1,501,11,2,531,11,1,561,11,1,561,11,2,591,11,1,621,11,1,621,11,2,651,11,1,681,11,1,681,11,2,711,11,1,741,11,1,741,11,2,771,11,1,801,11,1,801,11,2,831,11,1,861,11,1,861,11,2,891,11,1,921,11,1,921,11,2,951,11,1,981,11,1,981,11,2,1041,11,1,1041,11,2,1101,11,1,1161,11,1,1221,11,1],"798":[381,11,1,441,11,1,501,11,1,501,11,2,531,11,1,561,11,1,561,11,2,591,11,1,621,11,1,621,11,2,651,11,1,681,11,1,681,11,2,711,11,1,741,11,1,741,11,2,771,11,1,801,11,1,801,11,2,831,11,1,861,11,1,861,11,2,891,11,1,921,11,1,921,11,2,951,11,1,981,11,1,981,11,2,1041,11,1,1041,11,2,1101,11,1,1161,11,1,1221,11,1],"801":[382,11,1,442,11,1,502,11,1,502,11,2,532,11,1,562,11,1,562,11,2,592,11,1,622,11,1,622,11,2,652,11,1,682,11,1,682,11,2,712,11,1,742,11,1,742,11,2,772,11,1,802,11,1,802,11,2,832,11,1,862,11,1,862,11,2,892,11,1,922,11,1,922,11,2,952,11,1,982,11,1,982,11,2,1042,11,1,1042,11,2,1102,11,1,1162,11,1,1222,11,1],"88":[383,11,1,443,11,1,503,11,1,503,11,2,533,11,1,563,11,1,563,11,2,593,11,1,623,11,1,623,11,2,653,11,1,683,11,1,683,11,2,713,11,1,743,11,1,743,11,2,773,11,1,803,11,1,803,11,2,833,11,1,863,11,1,863,11,2,893,11,1,923,11,1,923,11,2,953,11,1,983,11,1,983,11,2,1043,11,1,1043,11,2,1103,11,1,1163,11,1,1223,11,1],"819":[383,11,1,443,11,1,503,11,1,503,11,2,533,11,1,563,11,1,563,11,2,593,11,1,623,11,1,623,11,2,653,11,1,683,11,1,683,11,2,713,11,1,743,11,1,743,11,2,773,11,1,803,11,1,803,11,2,833,11,1,863,11,1,863,11,2,893,11,1,923,11,1,923,11,2,953,11,1,983,11,1,983,11,2,1043,11,1,1043,11,2,1103,11,1,1163,11,1,1223,11,1],"803":[384,11,1,444,11,1,504,11,1,504,11,2,534,11,1,564,11,1,564,11,2,594,11,1,624,11,1,624,11,2,654,11,1,684,11,1,684,11,2,714,11,1,744,11,1,744,11,2,774,11,1,804,11,1,804,11,2,834,11,1,864,11,1,864,11,2,894,11,1,924,11,1,924,11,2,954,11,1,984,11,1,984,11,2,1044,11,1,1044,11,2,1104,11,1,1164,11,1,1224,11,1],"724":[385,11,1,445,11,1,505,11,1,505,11,2,535,11,1,565,11,1,565,11,2,595,11,1,625,11,1,625,11,2,655,11,1,685,11,1,685,11,2,715,11,1,745,11,1,745,11,2,775,11,1,805,11,1,805,11,2,835,11,1,865,11,1,865,11,2,895,11,1,925,11,1,925,11,2,955,11,1,985,11,1,985,11,2,1045,11,1,1045,11,2,1105,11,1,1165,11,1,1225,11,1],"725":[386,11,1,446,11,1,506,11,1,506,11,2,536,11,1,566,11,1,566,11,2,596,11,1,626,11,1,626,11,2,656,11,1,686,11,1,686,11,2,716,11,1,746,11,1,746,11,2,776,11,1,806,11,1,806,11,2,836,11,1,866,11,1,866,11,2,896,11,1,926,11,1,926,11,2,956,11,1,986,11,1,986,11,2,1046,11,1,1046,11,2,1106,11,1,1166,11,1,1226,11,1],"727":[387,11,1,447,11,1,507,11,1,507,11,2,537,11,1,567,11,1,567,11,2,597,11,1,627,11,1,627,11,2,657,11,1,687,11,1,687,11,2,717,11,1,747,11,1,747,11,2,777,11,1,807,11,1,807,11,2,837,11,1,867,11,1,867,11,2,897,11,1,927,11,1,927,11,2,957,11,1,987,11,1,987,11,2,1047,11,1,1047,11,2,1107,11,1,1167,11,1,1227,11,1],"1147":[387,11,1,447,11,1,507,11,1,507,11,2,537,11,1,567,11,1,567,11,2,597,11,1,627,11,1,627,11,2,657,11,1,687,11,1,687,11,2,717,11,1,747,11,1,747,11,2,777,11,1,807,11,1,807,11,2,837,11,1,867,11,1,867,11,2,897,11,1,927,11,1,927,11,2,957,11,1,987,11,1,987,11,2,1047,11,1,1047,11,2,1107,11,1,1167,11,1,1227,11,1],"804":[388,11,1,448,11,1,508,11,1,508,11,2,538,11,1,568,11,1,568,11,2,598,11,1,628,11,1,628,11,2,658,11,1,688,11,1,688,11,2,718,11,1,748,11,1,748,11,2,778,11,1,808,11,1,808,11,2,838,11,1,868,11,1,868,11,2,898,11,1,928,11,1,928,11,2,958,11,1,988,11,1,988,11,2,1048,11,1,1048,11,2,1108,11,1,1168,11,1,1228,11,1],"805":[389,11,1,449,11,1,509,11,1,509,11,2,539,11,1,569,11,1,569,11,2,599,11,1,629,11,1,629,11,2,659,11,1,689,11,1,689,11,2,719,11,1,749,11,1,749,11,2,779,11,1,809,11,1,809,11,2,839,11,1,869,11,1,869,11,2,899,11,1,929,11,1,929,11,2,959,11,1,989,11,1,989,11,2,1049,11,1,1049,11,2,1109,11,1,1169,11,1,1229,11,1],"806":[390,11,1,450,11,1,510,11,1,510,11,2,540,11,1,570,11,1,570,11,2,600,11,1,630,11,1,630,11,2,660,11,1,690,11,1,690,11,2,720,11,1,750,11,1,750,11,2,780,11,1,810,11,1,810,11,2,840,11,1,870,11,1,870,11,2,900,11,1,930,11,1,930,11,2,960,11,1,990,11,1,990,11,2,1050,11,1,1050,11,2,1110,11,1,1170,11,1,1230,11,1],"807":[390,11,1,450,11,1,510,11,1,510,11,2,540,11,1,570,11,1,570,11,2,600,11,1,630,11,1,630,11,2,660,11,1,690,11,1,690,11,2,720,11,1,750,11,1,750,11,2,780,11,1,810,11,1,810,11,2,840,11,1,870,11,1,870,11,2,900,11,1,930,11,1,930,11,2,960,11,1,990,11,1,990,11,2,1050,11,1,1050,11,2,1110,11,1,1170,11,1,1230,11,1],"813":[340,2,1,394,2,1,394,11,1,400,2,1,454,2,1,454,11,1,460,2,1,514,2,1,514,11,1,514,11,2,520,2,1,544,11,1,574,2,1,574,11,1,574,11,2,580,2,1,604,11,1,634,2,1,634,11,1,634,11,2,640,2,1,664,11,1,694,2,1,694,11,1,694,11,2,700,2,1,724,11,1,754,2,1,754,11,1,754,11,2,760,2,1,784,11,1,814,2,1,814,11,1,814,11,2,820,2,1,844,11,1,874,2,1,874,11,1,874,11,2,880,2,1,904,11,1,934,2,1,934,11,1,934,11,2,940,2,1,964,11,1,994,2,1,994,11,1,994,11,2,1000,2,1,1054,2,1,1054,11,1,1054,11,2,1060,2,1,1114,2,1,1114,11,1,1120,2,1,1174,2,1,1174,11,1,1180,2,1,1234,2,1,1234,11,1],"427":[396,11,1,456,11,1,515,11,2,516,11,1,545,11,1,575,11,2,576,11,1,605,11,1,635,11,2,636,11,1,665,11,1,695,11,2,696,11,1,725,11,1,755,11,2,756,11,1,785,11,1,815,11,2,816,11,1,845,11,1,875,11,2,876,11,1,905,11,1,935,11,2,936,11,1,965,11,1,995,11,2,996,11,1,1055,11,2,1056,11,1,1116,11,1,1176,11,1,1236,11,1],"l5ks":[397,11,1,457,11,1,516,11,2,517,11,1,546,11,1,576,11,2,577,11,1,606,11,1,636,11,2,637,11,1,666,11,1,696,11,2,697,11,1,726,11,1,756,11,2,757,11,1,786,11,1,816,11,2,817,11,1,846,11,1,876,11,2,877,11,1,906,11,1,936,11,2,937,11,1,966,11,1,996,11,2,997,11,1,1056,11,2,1057,11,1,1117,11,1,1177,11,1,1237,11,1],"603":[397,11,1,457,11,1,516,11,2,517,11,1,546,11,1,576,11,2,577,11,1,606,11,1,636,11,2,637,11,1,666,11,1,696,11,2,697,11,1,726,11,1,756,11,2,757,11,1,786,11,1,816,11,2,817,11,1,846,11,1,876,11,2,877,11,1,906,11,1,936,11,2,937,11,1,966,11,1,996,11,2,997,11,1,1056,11,2,1057,11,1,1117,11,1,1177,11,1,1237,11,1],"812":[398,11,1,458,11,1,517,11,2,518,11,1,547,11,1,577,11,2,578,11,1,607,11,1,637,11,2,638,11,1,667,11,1,697,11,2,698,11,1,727,11,1,757,11,2,758,11,1,787,11,1,817,11,2,818,11,1,847,11,1,877,11,2,878,11,1,907,11,1,937,11,2,938,11,1,967,11,1,997,11,2,998,11,1,1057,11,2,1058,11,1,1118,11,1,1178,11,1,1238,11,1],"90":[338,11,1,398,11,1,458,11,1,458,11,2,518,11,1,518,11,2,548,11,1,578,11,1,578,11,2,608,11,1,638,11,1,638,11,2,668,11,1,698,11,1,698,11,2,728,11,1,758,11,1,758,11,2,788,11,1,818,11,1,818,11,2,848,11,1,878,11,1,878,11,2,908,11,1,938,11,1,938,11,2,968,11,1,998,11,1,998,11,2,1058,11,1,1058,11,2,1118,11,1,1178,11,1,1238,11,1],"809":[339,11,1,399,11,1,459,11,1,459,11,2,519,11,1,519,11,2,549,11,1,579,11,1,579,11,2,609,11,1,639,11,1,639,11,2,669,11,1,699,11,1,699,11,2,729,11,1,759,11,1,759,11,2,789,11,1,819,11,1,819,11,2,849,11,1,879,11,1,879,11,2,909,11,1,939,11,1,939,11,2,969,11,1,999,11,1,999,11,2,1059,11,1,1059,11,2,1119,11,1,1179,11,1,1239,11,1],"808":[340,11,1,400,11,1,460,11,1,460,11,2,520,11,1,520,11,2,550,11,1,580,11,1,580,11,2,610,11,1,640,11,1,640,11,2,670,11,1,700,11,1,700,11,2,730,11,1,760,11,1,760,11,2,790,11,1,820,11,1,820,11,2,850,11,1,880,11,1,880,11,2,910,11,1,940,11,1,940,11,2,970,11,1,1000,11,1,1000,11,2,1060,11,1,1060,11,2,1120,11,1,1180,11,1,1240,11,1],"987664":[341,11,1,401,11,1,461,11,1,461,11,2,521,11,1,521,11,2,581,11,1,581,11,2,641,11,1,641,11,2,701,11,1,701,11,2,761,11,1,761,11,2,821,11,1,821,11,2,881,11,1,881,11,2,941,11,1,941,11,2,1001,11,1,1001,11,2,1061,11,1,1061,11,2,1121,11,1,1181,11,1],"562":[342,11,1,402,11,1,462,11,1,462,11,2,522,11,1,522,11,2,552,11,1,582,11,1,582,11,2,612,11,1,642,11,1,642,11,2,672,11,1,702,11,1,702,11,2,732,11,1,762,11,1,762,11,2,792,11,1,822,11,1,822,11,2,852,11,1,882,11,1,882,11,2,912,11,1,942,11,1,942,11,2,972,11,1,1002,11,1,1002,11,2,1062,11,1,1062,11,2,1122,11,1,1182,11,1,1242,11,1],"987665":[343,11,1,403,11,1,463,11,1,463,11,2,523,11,1,523,11,2,583,11,1,583,11,2,643,11,1,643,11,2,703,11,1,703,11,2,763,11,1,763,11,2,823,11,1,823,11,2,883,11,1,883,11,2,943,11,1,943,11,2,1003,11,1,1003,11,2,1063,11,1,1063,11,2,1123,11,1,1183,11,1],"89":[344,11,1,393,2,1,404,11,1,453,2,1,464,11,1,464,11,2,513,2,1,524,11,1,524,11,2,554,11,1,573,2,1,584,11,1,584,11,2,614,11,1,633,2,1,644,11,1,644,11,2,674,11,1,693,2,1,704,11,1,704,11,2,734,11,1,753,2,1,764,11,1,764,11,2,794,11,1,813,2,1,824,11,1,824,11,2,854,11,1,873,2,1,884,11,1,884,11,2,914,11,1,933,2,1,944,11,1,944,11,2,974,11,1,993,2,1,1004,11,1,1004,11,2,1053,2,1,1064,11,1,1064,11,2,1113,2,1,1124,11,1,1173,2,1,1184,11,1,1233,2,1,1244,11,1],"123459":[347,11,1,406,11,1,466,11,1,466,11,2,526,11,1,526,11,2,556,11,1,586,11,1,586,11,2,616,11,1,646,11,1,646,11,2,676,11,1,706,11,1,706,11,2,736,11,1,766,11,1,766,11,2,796,11,1,826,11,1,826,11,2,856,11,1,886,11,1,886,11,2,916,11,1,946,11,1,946,11,2,976,11,1,1006,11,1,1006,11,2,1066,11,1,1066,11,2,1126,11,1,1186,11,1],"123460":[349,11,1,408,11,1,468,11,1,468,11,2,528,11,1,528,11,2,558,11,1,588,11,1,588,11,2,618,11,1,648,11,1,648,11,2,678,11,1,708,11,1,708,11,2,738,11,1,768,11,1,768,11,2,798,11,1,828,11,1,828,11,2,858,11,1,888,11,1,888,11,2,918,11,1,948,11,1,948,11,2,978,11,1,1008,11,1,1008,11,2,1068,11,1,1068,11,2,1128,11,1,1188,11,1],"123461":[350,11,1,408,11,1,468,11,1,468,11,2,528,11,1,528,11,2,558,11,1,588,11,1,588,11,2,618,11,1,648,11,1,648,11,2,678,11,1,708,11,1,708,11,2,738,11,1,768,11,1,768,11,2,798,11,1,828,11,1,828,11,2,858,11,1,888,11,1,888,11,2,918,11,1,948,11,1,948,11,2,978,11,1,1008,11,1,1008,11,2,1068,11,1,1068,11,2,1128,11,1,1188,11,1],"814":[351,11,1,410,11,1,470,11,1,470,11,2,530,11,1,530,11,2,560,11,1,590,11,1,590,11,2,620,11,1,650,11,1,650,11,2,680,11,1,710,11,1,710,11,2,740,11,1,770,11,1,770,11,2,800,11,1,830,11,1,830,11,2,860,11,1,890,11,1,890,11,2,920,11,1,950,11,1,950,11,2,980,11,1,1010,11,1,1010,11,2,1070,11,1,1070,11,2,1130,11,1,1190,11,1],"728":[352,11,1,410,11,1,470,11,1,470,11,2,530,11,1,530,11,2,560,11,1,590,11,1,590,11,2,620,11,1,650,11,1,650,11,2,680,11,1,710,11,1,710,11,2,740,11,1,770,11,1,770,11,2,800,11,1,830,11,1,830,11,2,860,11,1,890,11,1,890,11,2,920,11,1,950,11,1,950,11,2,980,11,1,1010,11,1,1010,11,2,1070,11,1,1070,11,2,1130,11,1,1190,11,1],"815":[352,11,1,411,11,1,470,11,2,471,11,1,531,11,1,531,11,2,560,11,1,591,11,1,591,11,2,620,11,1,651,11,1,651,11,2,680,11,1,711,11,1,711,11,2,740,11,1,771,11,1,771,11,2,800,11,1,831,11,1,831,11,2,860,11,1,891,11,1,891,11,2,920,11,1,951,11,1,951,11,2,980,11,1,1011,11,1,1011,11,2,1071,11,1,1071,11,2,1131,11,1,1191,11,1],"3sad":[353,11,1,411,11,1,471,11,1,471,11,2,531,11,1,531,11,2,561,11,1,591,11,1,591,11,2,621,11,1,651,11,1,651,11,2,681,11,1,711,11,1,711,11,2,741,11,1,771,11,1,771,11,2,801,11,1,831,11,1,831,11,2,861,11,1,891,11,1,891,11,2,921,11,1,951,11,1,951,11,2,981,11,1,1011,11,1,1011,11,2,1071,11,1,1071,11,2,1131,11,1,1191,11,1],"498":[353,11,1,412,11,1,472,11,1,472,11,2,532,11,1,532,11,2,562,11,1,592,11,1,592,11,2,622,11,1,652,11,1,652,11,2,682,11,1,712,11,1,712,11,2,742,11,1,772,11,1,772,11,2,802,11,1,832,11,1,832,11,2,862,11,1,892,11,1,892,11,2,922,11,1,952,11,1,952,11,2,982,11,1,1012,11,1,1012,11,2,1072,11,1,1072,11,2,1132,11,1,1192,11,1],"732":[355,11,1,414,11,1,473,11,2,474,11,1,534,11,1,534,11,2,564,11,1,594,11,1,594,11,2,624,11,1,654,11,1,654,11,2,684,11,1,714,11,1,714,11,2,744,11,1,774,11,1,774,11,2,804,11,1,834,11,1,834,11,2,864,11,1,894,11,1,894,11,2,924,11,1,954,11,1,954,11,2,984,11,1,1014,11,1,1014,11,2,1074,11,1,1074,11,2,1134,11,1,1194,11,1],"817":[355,11,1,414,11,1,474,11,1,474,11,2,534,11,1,534,11,2,564,11,1,594,11,1,594,11,2,624,11,1,654,11,1,654,11,2,684,11,1,714,11,1,714,11,2,744,11,1,774,11,1,774,11,2,804,11,1,834,11,1,834,11,2,864,11,1,894,11,1,894,11,2,924,11,1,954,11,1,954,11,2,984,11,1,1014,11,1,1014,11,2,1074,11,1,1074,11,2,1134,11,1,1194,11,1],"821":[355,11,1,415,11,1,475,11,1,475,11,2,535,11,1,535,11,2,565,11,1,595,11,1,595,11,2,625,11,1,655,11,1,655,11,2,685,11,1,715,11,1,715,11,2,745,11,1,775,11,1,775,11,2,805,11,1,835,11,1,835,11,2,865,11,1,895,11,1,895,11,2,925,11,1,955,11,1,955,11,2,985,11,1,1015,11,1,1015,11,2,1075,11,1,1075,11,2,1135,11,1,1195,11,1],"822":[356,11,1,415,11,1,475,11,1,475,11,2,535,11,1,535,11,2,565,11,1,595,11,1,595,11,2,625,11,1,655,11,1,655,11,2,685,11,1,715,11,1,715,11,2,745,11,1,775,11,1,775,11,2,805,11,1,835,11,1,835,11,2,865,11,1,895,11,1,895,11,2,925,11,1,955,11,1,955,11,2,985,11,1,1015,11,1,1015,11,2,1075,11,1,1075,11,2,1135,11,1,1195,11,1],"823":[357,11,1,416,11,1,476,11,1,476,11,2,536,11,1,536,11,2,566,11,1,596,11,1,596,11,2,626,11,1,656,11,1,656,11,2,686,11,1,716,11,1,716,11,2,746,11,1,776,11,1,776,11,2,806,11,1,836,11,1,836,11,2,866,11,1,896,11,1,896,11,2,926,11,1,956,11,1,956,11,2,986,11,1,1016,11,1,1016,11,2,1076,11,1,1076,11,2,1136,11,1,1196,11,1],"735":[358,11,1,417,11,1,477,11,1,477,11,2,537,11,1,537,11,2,567,11,1,597,11,1,597,11,2,627,11,1,657,11,1,657,11,2,687,11,1,717,11,1,717,11,2,747,11,1,777,11,1,777,11,2,807,11,1,837,11,1,837,11,2,867,11,1,897,11,1,897,11,2,927,11,1,957,11,1,957,11,2,987,11,1,1017,11,1,1017,11,2,1077,11,1,1077,11,2,1137,11,1,1197,11,1],"825":[358,11,1,417,11,1,477,11,1,477,11,2,537,11,1,537,11,2,567,11,1,597,11,1,597,11,2,627,11,1,657,11,1,657,11,2,687,11,1,717,11,1,717,11,2,747,11,1,777,11,1,777,11,2,807,11,1,837,11,1,837,11,2,867,11,1,897,11,1,897,11,2,927,11,1,957,11,1,957,11,2,987,11,1,1017,11,1,1017,11,2,1077,11,1,1077,11,2,1137,11,1,1197,11,1],"826":[359,11,1,418,11,1,478,11,1,478,11,2,538,11,1,538,11,2,568,11,1,598,11,1,598,11,2,628,11,1,658,11,1,658,11,2,688,11,1,718,11,1,718,11,2,748,11,1,778,11,1,778,11,2,808,11,1,838,11,1,838,11,2,868,11,1,898,11,1,898,11,2,928,11,1,958,11,1,958,11,2,988,11,1,1018,11,1,1018,11,2,1078,11,1,1078,11,2,1138,11,1,1198,11,1],"736":[359,11,1,419,11,1,478,11,2,479,11,1,539,11,1,539,11,2,568,11,1,599,11,1,599,11,2,628,11,1,659,11,1,659,11,2,688,11,1,719,11,1,719,11,2,748,11,1,779,11,1,779,11,2,808,11,1,839,11,1,839,11,2,868,11,1,899,11,1,899,11,2,928,11,1,959,11,1,959,11,2,988,11,1,1019,11,1,1019,11,2,1079,11,1,1079,11,2,1139,11,1,1199,11,1],"433":[360,12,1,361,11,1,420,11,1,420,12,1,480,11,1,480,11,2,480,12,1,480,12,2,540,11,1,540,11,2,540,12,1,540,12,2,570,11,1,600,11,1,600,11,2,600,12,1,600,12,2,630,11,1,660,11,1,660,11,2,660,12,1,660,12,2,690,11,1,720,11,1,720,11,2,720,12,1,720,12,2,750,11,1,780,11,1,780,11,2,780,12,1,780,12,2,810,11,1,840,11,1,840,11,2,840,12,1,840,12,2,870,11,1,900,11,1,900,11,2,900,12,1,900,12,2,930,11,1,960,11,1,960,11,2,960,12,1,960,12,2,990,11,1,1020,11,1,1020,11,2,1020,12,1,1020,12,2,1080,11,1,1080,11,2,1080,12,1,1080,12,2,1140,11,1,1140,12,1,1200,11,1,1200,12,1],"491":[362,11,1,421,11,1,481,11,1,481,11,2,541,11,1,541,11,2,571,11,1,601,11,1,601,11,2,631,11,1,661,11,1,661,11,2,691,11,1,721,11,1,721,11,2,751,11,1,781,11,1,781,11,2,811,11,1,841,11,1,841,11,2,871,11,1,901,11,1,901,11,2,931,11,1,961,11,1,961,11,2,991,11,1,1021,11,1,1021,11,2,1081,11,1,1081,11,2,1141,11,1,1201,11,1],"459":[362,11,1,422,11,1,482,11,1,482,11,2,542,11,1,542,11,2,572,11,1,602,11,1,602,11,2,632,11,1,662,11,1,662,11,2,692,11,1,722,11,1,722,11,2,752,11,1,782,11,1,782,11,2,812,11,1,842,11,1,842,11,2,872,11,1,902,11,1,902,11,2,932,11,1,962,11,1,962,11,2,992,11,1,1022,11,1,1022,11,2,1082,11,1,1082,11,2,1142,11,1,1202,11,1],"central-bay-C":[365,11,1,375,5,1,425,11,1,435,5,1,485,11,1,485,11,2,495,5,1,495,5,2,525,5,1,545,11,1,545,11,2,555,5,1,555,5,2,575,11,1,585,5,1,605,11,1,605,11,2,615,5,1,615,5,2,635,11,1,645,5,1,665,11,1,665,11,2,675,5,1,675,5,2,695,11,1,705,5,1,725,11,1,725,11,2,735,5,1,735,5,2,755,11,1,765,5,1,785,11,1,785,11,2,795,5,1,795,5,2,815,11,1,825,5,1,845,11,1,845,11,2,855,5,1,855,5,2,875,11,1,885,5,1,905,11,1,905,11,2,915,5,1,915,5,2,935,11,1,945,5,1,965,11,1,965,11,2,975,5,1,975,5,2,995,11,1,1025,11,1,1025,11,2,1035,5,1,1035,5,2,1085,11,1,1085,11,2,1095,5,1,1145,11,1,1155,5,1,1205,11,1,1215,5,1],"987687":[340,5,1,400,5,1,460,5,1,461,5,2,520,5,1,520,5,2,521,5,2,550,5,1,580,5,1,580,5,2,581,5,2,610,5,1,640,5,1,640,5,2,641,5,2,670,5,1,700,5,1,700,5,2,701,5,2,730,5,1,760,5,1,760,5,2,761,5,2,790,5,1,820,5,1,820,5,2,821,5,2,850,5,1,880,5,1,880,5,2,881,5,2,910,5,1,940,5,1,940,5,2,941,5,2,970,5,1,1000,5,1,1000,5,2,1001,5,2,1060,5,1,1060,5,2,1061,5,2,1120,5,1,1180,5,1,1240,5,1],"554":[342,5,1,402,5,1,462,5,1,462,5,2,522,5,1,522,5,2,552,5,1,582,5,1,582,5,2,612,5,1,642,5,1,642,5,2,672,5,1,702,5,1,702,5,2,732,5,1,762,5,1,762,5,2,792,5,1,822,5,1,822,5,2,852,5,1,882,5,1,882,5,2,912,5,1,942,5,1,942,5,2,972,5,1,1002,5,1,1002,5,2,1062,5,1,1062,5,2,1122,5,1,1182,5,1],"782":[344,5,1,404,5,1,463,5,2,464,5,1,523,5,2,524,5,1,554,5,1,583,5,2,584,5,1,614,5,1,643,5,2,644,5,1,674,5,1,703,5,2,704,5,1,734,5,1,763,5,2,764,5,1,794,5,1,823,5,2,824,5,1,854,5,1,883,5,2,884,5,1,914,5,1,943,5,2,944,5,1,974,5,1,1003,5,2,1004,5,1,1063,5,2,1064,5,1,1124,5,1,1184,5,1],"784":[346,5,1,406,5,1,466,5,1,466,5,2,526,5,1,526,5,2,556,5,1,586,5,1,586,5,2,616,5,1,646,5,1,646,5,2,676,5,1,706,5,1,706,5,2,736,5,1,766,5,1,766,5,2,796,5,1,826,5,1,826,5,2,856,5,1,886,5,1,886,5,2,916,5,1,946,5,1,946,5,2,976,5,1,1006,5,1,1006,5,2,1066,5,1,1066,5,2,1126,5,1,1186,5,1],"783":[347,5,1,407,5,1,466,5,2,467,5,1,526,5,2,527,5,1,557,5,1,586,5,2,587,5,1,617,5,1,646,5,2,647,5,1,677,5,1,706,5,2,707,5,1,737,5,1,766,5,2,767,5,1,797,5,1,826,5,2,827,5,1,857,5,1,886,5,2,887,5,1,917,5,1,946,5,2,947,5,1,977,5,1,1006,5,2,1007,5,1,1066,5,2,1067,5,1,1127,5,1,1187,5,1],"761":[350,5,1,410,5,1,469,5,2,470,5,1,529,5,2,530,5,1,560,5,1,589,5,2,590,5,1,620,5,1,649,5,2,650,5,1,680,5,1,709,5,2,710,5,1,740,5,1,769,5,2,770,5,1,800,5,1,829,5,2,830,5,1,860,5,1,889,5,2,890,5,1,920,5,1,949,5,2,950,5,1,980,5,1,1009,5,2,1010,5,1,1069,5,2,1070,5,1,1130,5,1,1190,5,1],"786":[351,5,1,411,5,1,470,5,2,471,5,1,530,5,2,531,5,1,561,5,1,590,5,2,591,5,1,621,5,1,650,5,2,651,5,1,681,5,1,710,5,2,711,5,1,741,5,1,770,5,2,771,5,1,801,5,1,830,5,2,831,5,1,861,5,1,890,5,2,891,5,1,921,5,1,950,5,2,951,5,1,981,5,1,1010,5,2,1011,5,1,1070,5,2,1071,5,1,1131,5,1,1191,5,1],"763":[352,5,1,412,5,1,471,5,2,472,5,1,531,5,2,532,5,1,562,5,1,591,5,2,592,5,1,622,5,1,651,5,2,652,5,1,682,5,1,711,5,2,712,5,1,742,5,1,771,5,2,772,5,1,802,5,1,831,5,2,832,5,1,862,5,1,891,5,2,892,5,1,922,5,1,951,5,2,952,5,1,982,5,1,1011,5,2,1012,5,1,1071,5,2,1072,5,1,1132,5,1,1192,5,1],"95":[353,5,1,413,5,1,473,5,1,473,5,2,533,5,1,533,5,2,563,5,1,593,5,1,593,5,2,623,5,1,653,5,1,653,5,2,683,5,1,713,5,1,713,5,2,743,5,1,773,5,1,773,5,2,803,5,1,833,5,1,833,5,2,863,5,1,893,5,1,893,5,2,923,5,1,953,5,1,953,5,2,983,5,1,1013,5,1,1013,5,2,1073,5,1,1073,5,2,1133,5,1,1193,5,1],"788":[355,5,1,415,5,1,474,5,2,475,5,1,534,5,2,535,5,1,565,5,1,594,5,2,595,5,1,625,5,1,654,5,2,655,5,1,685,5,1,714,5,2,715,5,1,745,5,1,774,5,2,775,5,1,805,5,1,834,5,2,835,5,1,865,5,1,894,5,2,895,5,1,925,5,1,954,5,2,955,5,1,985,5,1,1014,5,2,1015,5,1,1074,5,2,1075,5,1,1135,5,1,1195,5,1],"789":[356,5,1,416,5,1,476,5,1,476,5,2,536,5,1,536,5,2,566,5,1,596,5,1,596,5,2,626,5,1,656,5,1,656,5,2,686,5,1,716,5,1,716,5,2,746,5,1,776,5,1,776,5,2,806,5,1,836,5,1,836,5,2,866,5,1,896,5,1,896,5,2,926,5,1,956,5,1,956,5,2,986,5,1,1016,5,1,1016,5,2,1076,5,1,1076,5,2,1136,5,1,1196,5,1],"768":[357,5,1,417,5,1,477,5,1,477,5,2,537,5,1,537,5,2,567,5,1,597,5,1,597,5,2,627,5,1,657,5,1,657,5,2,687,5,1,717,5,1,717,5,2,747,5,1,777,5,1,777,5,2,807,5,1,837,5,1,837,5,2,867,5,1,897,5,1,897,5,2,927,5,1,957,5,1,957,5,2,987,5,1,1017,5,1,1017,5,2,1077,5,1,1077,5,2,1137,5,1,1197,5,1],"792":[359,5,1,419,5,1,479,5,1,479,5,2,539,5,1,539,5,2,569,5,1,599,5,1,599,5,2,629,5,1,659,5,1,659,5,2,689,5,1,719,5,1,719,5,2,749,5,1,779,5,1,779,5,2,809,5,1,839,5,1,839,5,2,869,5,1,899,5,1,899,5,2,929,5,1,959,5,1,959,5,2,989,5,1,1019,5,1,1019,5,2,1079,5,1,1079,5,2,1139,5,1,1199,5,1],"987663":[360,5,1,420,5,1,480,5,1,480,5,2,540,5,1,540,5,2,570,5,1,600,5,1,600,5,2,630,5,1,660,5,1,660,5,2,690,5,1,720,5,1,720,5,2,750,5,1,780,5,1,780,5,2,810,5,1,840,5,1,840,5,2,870,5,1,900,5,1,900,5,2,930,5,1,960,5,1,960,5,2,990,5,1,1020,5,1,1020,5,2,1080,5,1,1080,5,2,1140,5,1,1200,5,1],"770":[362,5,1,422,5,1,481,5,2,482,5,1,541,5,2,542,5,1,572,5,1,601,5,2,602,5,1,632,5,1,661,5,2,662,5,1,692,5,1,721,5,2,722,5,1,752,5,1,781,5,2,782,5,1,812,5,1,841,5,2,842,5,1,872,5,1,901,5,2,902,5,1,932,5,1,961,5,2,962,5,1,992,5,1,1021,5,2,1022,5,1,1081,5,2,1082,5,1,1142,5,1,1202,5,1],"771":[363,5,1,423,5,1,482,5,2,483,5,1,542,5,2,543,5,1,573,5,1,602,5,2,603,5,1,633,5,1,662,5,2,663,5,1,693,5,1,722,5,2,723,5,1,753,5,1,782,5,2,783,5,1,813,5,1,842,5,2,843,5,1,873,5,1,902,5,2,903,5,1,933,5,1,962,5,2,963,5,1,993,5,1,1022,5,2,1023,5,1,1082,5,2,1083,5,1,1143,5,1,1203,5,1],"495":[364,5,1,424,5,1,483,5,2,484,5,1,543,5,2,544,5,1,574,5,1,603,5,2,604,5,1,634,5,1,663,5,2,664,5,1,694,5,1,723,5,2,724,5,1,754,5,1,783,5,2,784,5,1,814,5,1,843,5,2,844,5,1,874,5,1,903,5,2,904,5,1,934,5,1,963,5,2,964,5,1,994,5,1,1023,5,2,1024,5,1,1083,5,2,1084,5,1,1144,5,1,1204,5,1],"494":[377,5,1,377,12,1,437,5,1,437,12,1,497,5,1,497,5,2,497,12,1,497,12,2,527,5,1,557,5,1,557,5,2,557,12,1,557,12,2,587,5,1,617,5,1,617,5,2,617,12,1,617,12,2,647,5,1,677,5,1,677,5,2,677,12,1,677,12,2,707,5,1,737,5,1,737,5,2,737,12,1,737,12,2,767,5,1,797,5,1,797,5,2,797,12,1,797,12,2,827,5,1,857,5,1,857,5,2,857,12,1,857,12,2,887,5,1,917,5,1,917,5,2,917,12,1,917,12,2,947,5,1,977,5,1,977,5,2,977,12,1,977,12,2,1037,5,1,1037,5,2,1037,12,1,1037,12,2,1097,5,1,1097,12,1,1157,5,1,1157,12,1,1217,5,1,1217,12,1],"l3n8":[377,5,1,437,5,1,497,5,1,497,5,2,527,5,1,557,5,1,557,5,2,587,5,1,617,5,1,617,5,2,647,5,1,677,5,1,677,5,2,707,5,1,737,5,1,737,5,2,767,5,1,797,5,1,797,5,2,827,5,1,857,5,1,857,5,2,887,5,1,917,5,1,917,5,2,947,5,1,977,5,1,977,5,2,1037,5,1,1037,5,2,1097,5,1,1157,5,1,1217,5,1],"738":[378,5,1,438,5,1,498,5,1,499,5,2,528,5,1,558,5,1,559,5,2,588,5,1,618,5,1,619,5,2,648,5,1,678,5,1,679,5,2,708,5,1,738,5,1,739,5,2,768,5,1,798,5,1,799,5,2,828,5,1,858,5,1,859,5,2,888,5,1,918,5,1,919,5,2,948,5,1,978,5,1,979,5,2,1038,5,1,1039,5,2,1098,5,1,1158,5,1,1218,5,1],"740":[378,5,1,438,5,1,498,5,1,499,5,2,528,5,1,558,5,1,559,5,2,588,5,1,618,5,1,619,5,2,648,5,1,678,5,1,679,5,2,708,5,1,738,5,1,739,5,2,768,5,1,798,5,1,799,5,2,828,5,1,858,5,1,859,5,2,888,5,1,918,5,1,919,5,2,948,5,1,978,5,1,979,5,2,1038,5,1,1039,5,2,1098,5,1,1158,5,1,1218,5,1],"742":[379,5,1,439,5,1,499,5,1,500,5,2,529,5,1,559,5,1,560,5,2,589,5,1,619,5,1,620,5,2,649,5,1,679,5,1,680,5,2,709,5,1,739,5,1,740,5,2,769,5,1,799,5,1,800,5,2,829,5,1,859,5,1,860,5,2,889,5,1,919,5,1,920,5,2,949,5,1,979,5,1,980,5,2,1039,5,1,1040,5,2,1099,5,1,1159,5,1,1219,5,1],"743":[379,5,1,439,5,1,499,5,1,500,5,2,529,5,1,559,5,1,560,5,2,589,5,1,619,5,1,620,5,2,649,5,1,679,5,1,680,5,2,709,5,1,739,5,1,740,5,2,769,5,1,799,5,1,800,5,2,829,5,1,859,5,1,860,5,2,889,5,1,919,5,1,920,5,2,949,5,1,979,5,1,980,5,2,1039,5,1,1040,5,2,1099,5,1,1159,5,1,1219,5,1],"773":[380,5,1,440,5,1,500,5,1,500,5,2,530,5,1,560,5,1,560,5,2,590,5,1,620,5,1,620,5,2,650,5,1,680,5,1,680,5,2,710,5,1,740,5,1,740,5,2,770,5,1,800,5,1,800,5,2,830,5,1,860,5,1,860,5,2,890,5,1,920,5,1,920,5,2,950,5,1,980,5,1,980,5,2,1040,5,1,1040,5,2,1100,5,1,1160,5,1,1220,5,1],"775":[380,5,1,440,5,1,500,5,1,501,5,2,530,5,1,560,5,1,561,5,2,590,5,1,620,5,1,621,5,2,650,5,1,680,5,1,681,5,2,710,5,1,740,5,1,741,5,2,770,5,1,800,5,1,801,5,2,830,5,1,860,5,1,861,5,2,890,5,1,920,5,1,921,5,2,950,5,1,980,5,1,981,5,2,1040,5,1,1041,5,2,1100,5,1,1160,5,1,1220,5,1],"9g4v":[381,5,1,441,5,1,501,5,1,502,5,2,531,5,1,561,5,1,562,5,2,591,5,1,621,5,1,622,5,2,651,5,1,681,5,1,682,5,2,711,5,1,741,5,1,742,5,2,771,5,1,801,5,1,802,5,2,831,5,1,861,5,1,862,5,2,891,5,1,921,5,1,922,5,2,951,5,1,981,5,1,982,5,2,1041,5,1,1042,5,2,1101,5,1,1161,5,1,1221,5,1],"777":[382,5,1,442,5,1,502,5,1,503,5,2,532,5,1,562,5,1,563,5,2,592,5,1,622,5,1,623,5,2,652,5,1,682,5,1,683,5,2,712,5,1,742,5,1,743,5,2,772,5,1,802,5,1,803,5,2,832,5,1,862,5,1,863,5,2,892,5,1,922,5,1,923,5,2,952,5,1,982,5,1,983,5,2,1042,5,1,1043,5,2,1102,5,1,1162,5,1,1222,5,1],"747":[382,5,1,442,5,1,502,5,1,503,5,2,532,5,1,562,5,1,563,5,2,592,5,1,622,5,1,623,5,2,652,5,1,682,5,1,683,5,2,712,5,1,742,5,1,743,5,2,772,5,1,802,5,1,803,5,2,832,5,1,862,5,1,863,5,2,892,5,1,922,5,1,923,5,2,952,5,1,982,5,1,983,5,2,1042,5,1,1043,5,2,1102,5,1,1162,5,1,1222,5,1],"749":[383,5,1,443,5,1,503,5,1,504,5,2,533,5,1,563,5,1,564,5,2,593,5,1,623,5,1,624,5,2,653,5,1,683,5,1,684,5,2,713,5,1,743,5,1,744,5,2,773,5,1,803,5,1,804,5,2,833,5,1,863,5,1,864,5,2,893,5,1,923,5,1,924,5,2,953,5,1,983,5,1,984,5,2,1043,5,1,1044,5,2,1103,5,1,1163,5,1,1223,5,1],"751":[384,5,1,444,5,1,504,5,1,505,5,2,534,5,1,564,5,1,565,5,2,594,5,1,624,5,1,625,5,2,654,5,1,684,5,1,685,5,2,714,5,1,744,5,1,745,5,2,774,5,1,804,5,1,805,5,2,834,5,1,864,5,1,865,5,2,894,5,1,924,5,1,925,5,2,954,5,1,984,5,1,985,5,2,1044,5,1,1045,5,2,1104,5,1,1164,5,1,1224,5,1],"752":[385,5,1,445,5,1,505,5,1,505,5,2,535,5,1,565,5,1,565,5,2,595,5,1,625,5,1,625,5,2,655,5,1,685,5,1,685,5,2,715,5,1,745,5,1,745,5,2,775,5,1,805,5,1,805,5,2,835,5,1,865,5,1,865,5,2,895,5,1,925,5,1,925,5,2,955,5,1,985,5,1,985,5,2,1045,5,1,1045,5,2,1105,5,1,1165,5,1,1225,5,1],"92":[385,5,1,445,5,1,505,5,1,506,5,2,535,5,1,565,5,1,566,5,2,595,5,1,625,5,1,626,5,2,655,5,1,685,5,1,686,5,2,715,5,1,745,5,1,746,5,2,775,5,1,805,5,1,806,5,2,835,5,1,865,5,1,866,5,2,895,5,1,925,5,1,926,5,2,955,5,1,985,5,1,986,5,2,1045,5,1,1046,5,2,1105,5,1,1165,5,1,1225,5,1],"778":[386,5,1,446,5,1,506,5,1,507,5,2,536,5,1,566,5,1,567,5,2,596,5,1,626,5,1,627,5,2,656,5,1,686,5,1,687,5,2,716,5,1,746,5,1,747,5,2,776,5,1,806,5,1,807,5,2,836,5,1,866,5,1,867,5,2,896,5,1,926,5,1,927,5,2,956,5,1,986,5,1,987,5,2,1046,5,1,1047,5,2,1106,5,1,1166,5,1,1226,5,1],"779":[387,5,1,447,5,1,507,5,1,508,5,2,537,5,1,567,5,1,568,5,2,597,5,1,627,5,1,628,5,2,657,5,1,687,5,1,688,5,2,717,5,1,747,5,1,748,5,2,777,5,1,807,5,1,808,5,2,837,5,1,867,5,1,868,5,2,897,5,1,927,5,1,928,5,2,957,5,1,987,5,1,988,5,2,1047,5,1,1048,5,2,1107,5,1,1167,5,1,1227,5,1],"753":[388,5,1,448,5,1,508,5,1,509,5,2,538,5,1,568,5,1,569,5,2,598,5,1,628,5,1,629,5,2,658,5,1,688,5,1,689,5,2,718,5,1,748,5,1,749,5,2,778,5,1,808,5,1,809,5,2,838,5,1,868,5,1,869,5,2,898,5,1,928,5,1,929,5,2,958,5,1,988,5,1,989,5,2,1048,5,1,1049,5,2,1108,5,1,1168,5,1,1228,5,1],"781":[389,5,1,449,5,1,509,5,1,510,5,2,539,5,1,569,5,1,570,5,2,599,5,1,629,5,1,630,5,2,659,5,1,689,5,1,690,5,2,719,5,1,749,5,1,750,5,2,779,5,1,809,5,1,810,5,2,839,5,1,869,5,1,870,5,2,899,5,1,929,5,1,930,5,2,959,5,1,989,5,1,990,5,2,1049,5,1,1050,5,2,1109,5,1,1169,5,1,1229,5,1],"kldx":[390,5,1,450,5,1,510,5,1,510,5,2,540,5,1,570,5,1,570,5,2,600,5,1,630,5,1,630,5,2,660,5,1,690,5,1,690,5,2,720,5,1,750,5,1,750,5,2,780,5,1,810,5,1,810,5,2,840,5,1,870,5,1,870,5,2,900,5,1,930,5,1,930,5,2,960,5,1,990,5,1,990,5,2,1050,5,1,1050,5,2,1110,5,1,1170,5,1,1230,5,1],"1349":[392,5,1,452,5,1,512,5,1,513,5,2,542,5,1,572,5,1,573,5,2,602,5,1,632,5,1,633,5,2,662,5,1,692,5,1,693,5,2,722,5,1,752,5,1,753,5,2,782,5,1,812,5,1,813,5,2,842,5,1,872,5,1,873,5,2,902,5,1,932,5,1,933,5,2,962,5,1,992,5,1,993,5,2,1052,5,1,1053,5,2,1112,5,1,1172,5,1,1232,5,1],"1348":[394,5,1,454,5,1,514,5,1,514,5,2,544,5,1,574,5,1,574,5,2,604,5,1,634,5,1,634,5,2,664,5,1,694,5,1,694,5,2,724,5,1,754,5,1,754,5,2,784,5,1,814,5,1,814,5,2,844,5,1,874,5,1,874,5,2,904,5,1,934,5,1,934,5,2,964,5,1,994,5,1,994,5,2,1054,5,1,1054,5,2,1114,5,1,1174,5,1,1234,5,1],"755":[396,5,1,456,5,1,516,5,1,517,5,2,546,5,1,576,5,1,577,5,2,606,5,1,636,5,1,637,5,2,666,5,1,696,5,1,697,5,2,726,5,1,756,5,1,757,5,2,786,5,1,816,5,1,817,5,2,846,5,1,876,5,1,877,5,2,906,5,1,936,5,1,937,5,2,966,5,1,996,5,1,997,5,2,1056,5,1,1057,5,2,1116,5,1,1176,5,1,1236,5,1],"757":[397,5,1,457,5,1,517,5,1,517,5,2,547,5,1,577,5,1,577,5,2,607,5,1,637,5,1,637,5,2,667,5,1,697,5,1,697,5,2,727,5,1,757,5,1,757,5,2,787,5,1,817,5,1,817,5,2,847,5,1,877,5,1,877,5,2,907,5,1,937,5,1,937,5,2,967,5,1,997,5,1,997,5,2,1057,5,1,1057,5,2,1117,5,1,1177,5,1,1237,5,1],"758":[398,5,1,458,5,1,518,5,1,518,5,2,548,5,1,578,5,1,578,5,2,608,5,1,638,5,1,638,5,2,668,5,1,698,5,1,698,5,2,728,5,1,758,5,1,758,5,2,788,5,1,818,5,1,818,5,2,848,5,1,878,5,1,878,5,2,908,5,1,938,5,1,938,5,2,968,5,1,998,5,1,998,5,2,1058,5,1,1058,5,2,1118,5,1,1178,5,1,1238,5,1],"552":[399,5,1,459,5,1,519,5,1,519,5,2,549,5,1,579,5,1,579,5,2,609,5,1,639,5,1,639,5,2,669,5,1,699,5,1,699,5,2,729,5,1,759,5,1,759,5,2,789,5,1,819,5,1,819,5,2,849,5,1,879,5,1,879,5,2,909,5,1,939,5,1,939,5,2,969,5,1,999,5,1,999,5,2,1059,5,1,1059,5,2,1119,5,1,1179,5,1,1239,5,1],"96":[325,12,1,385,12,1,445,12,1,445,12,2,505,12,1,505,12,2,565,12,1,565,12,2,625,12,1,625,12,2,685,12,1,685,12,2,745,12,1,745,12,2,805,12,1,805,12,2,865,12,1,865,12,2,925,12,1,925,12,2,985,12,1,985,12,2,1045,12,1,1045,12,2,1105,12,1,1165,12,1,1225,12,1],"1016":[327,12,1,387,12,1,447,12,1,447,12,2,507,12,1,507,12,2,567,12,1,567,12,2,627,12,1,627,12,2,687,12,1,687,12,2,747,12,1,747,12,2,807,12,1,807,12,2,867,12,1,867,12,2,927,12,1,927,12,2,987,12,1,987,12,2,1047,12,1,1047,12,2,1107,12,1,1167,12,1,1227,12,1],"97":[328,12,1,388,12,1,448,12,1,448,12,2,508,12,1,508,12,2,568,12,1,568,12,2,628,12,1,628,12,2,688,12,1,688,12,2,748,12,1,748,12,2,808,12,1,808,12,2,868,12,1,868,12,2,928,12,1,928,12,2,988,12,1,988,12,2,1048,12,1,1048,12,2,1108,12,1,1168,12,1,1228,12,1],"1021":[330,12,1,390,12,1,450,12,1,450,12,2,510,12,1,510,12,2,570,12,1,570,12,2,630,12,1,630,12,2,690,12,1,690,12,2,750,12,1,750,12,2,810,12,1,810,12,2,870,12,1,870,12,2,930,12,1,930,12,2,990,12,1,990,12,2,1050,12,1,1050,12,2,1110,12,1,1170,12,1,1230,12,1],"1022":[331,12,1,391,12,1,451,12,1,451,12,2,511,12,1,511,12,2,571,12,1,571,12,2,631,12,1,631,12,2,691,12,1,691,12,2,751,12,1,751,12,2,811,12,1,811,12,2,871,12,1,871,12,2,931,12,1,931,12,2,991,12,1,991,12,2,1051,12,1,1051,12,2,1111,12,1,1171,12,1,1231,12,1],"1024":[332,12,1,392,12,1,452,12,1,452,12,2,512,12,1,512,12,2,572,12,1,572,12,2,632,12,1,632,12,2,692,12,1,692,12,2,752,12,1,752,12,2,812,12,1,812,12,2,872,12,1,872,12,2,932,12,1,932,12,2,992,12,1,992,12,2,1052,12,1,1052,12,2,1112,12,1,1172,12,1,1232,12,1],"ur8h":[332,12,1,392,12,1,452,12,1,452,12,2,512,12,1,512,12,2,572,12,1,572,12,2,632,12,1,632,12,2,692,12,1,692,12,2,752,12,1,752,12,2,812,12,1,812,12,2,872,12,1,872,12,2,932,12,1,932,12,2,992,12,1,992,12,2,1052,12,1,1052,12,2,1112,12,1,1172,12,1,1232,12,1],"q8ml":[333,12,1,393,12,1,453,12,1,453,12,2,513,12,1,513,12,2,573,12,1,573,12,2,633,12,1,633,12,2,693,12,1,693,12,2,753,12,1,753,12,2,813,12,1,813,12,2,873,12,1,873,12,2,933,12,1,933,12,2,993,12,1,993,12,2,1053,12,1,1053,12,2,1113,12,1,1173,12,1,1233,12,1],"503":[334,12,1,394,12,1,454,12,1,454,12,2,514,12,1,514,12,2,574,12,1,574,12,2,634,12,1,634,12,2,694,12,1,694,12,2,754,12,1,754,12,2,814,12,1,814,12,2,874,12,1,874,12,2,934,12,1,934,12,2,994,12,1,994,12,2,1054,12,1,1054,12,2,1114,12,1,1174,12,1,1234,12,1],"505":[341,12,1,401,12,1,461,12,1,461,12,2,521,12,1,521,12,2,581,12,1,581,12,2,641,12,1,641,12,2,701,12,1,701,12,2,761,12,1,761,12,2,821,12,1,821,12,2,881,12,1,881,12,2,941,12,1,941,12,2,1001,12,1,1001,12,2,1061,12,1,1061,12,2,1121,12,1,1181,12,1,1241,12,1],"105":[342,12,1,402,12,1,462,12,1,462,12,2,522,12,1,522,12,2,582,12,1,582,12,2,642,12,1,642,12,2,702,12,1,702,12,2,762,12,1,762,12,2,822,12,1,822,12,2,882,12,1,882,12,2,942,12,1,942,12,2,1002,12,1,1002,12,2,1062,12,1,1062,12,2,1122,12,1,1182,12,1,1242,12,1],"1194":[339,6,1,399,6,1,459,6,1,459,6,2,519,6,1,519,6,2,579,6,1,579,6,2,639,6,1,639,6,2,699,6,1,699,6,2,759,6,1,759,6,2,819,6,1,819,6,2,879,6,1,879,6,2,939,6,1,939,6,2,999,6,1,999,6,2,1059,6,1,1059,6,2,1119,6,1,1179,6,1,1239,6,1],"65":[340,6,1,400,6,1,460,6,1,460,6,2,520,6,1,520,6,2,580,6,1,580,6,2,640,6,1,640,6,2,700,6,1,700,6,2,760,6,1,760,6,2,820,6,1,820,6,2,880,6,1,880,6,2,940,6,1,940,6,2,1000,6,1,1000,6,2,1060,6,1,1060,6,2,1120,6,1,1180,6,1],"1195":[341,6,1,401,6,1,461,6,1,461,6,2,521,6,1,521,6,2,581,6,1,581,6,2,641,6,1,641,6,2,701,6,1,701,6,2,761,6,1,761,6,2,821,6,1,821,6,2,881,6,1,881,6,2,941,6,1,941,6,2,1001,6,1,1001,6,2,1061,6,1,1061,6,2,1121,6,1,1181,6,1],"1196":[344,6,1,404,6,1,464,6,1,464,6,2,524,6,1,524,6,2,584,6,1,584,6,2,644,6,1,644,6,2,704,6,1,704,6,2,764,6,1,764,6,2,824,6,1,824,6,2,884,6,1,884,6,2,944,6,1,944,6,2,1004,6,1,1004,6,2,1064,6,1,1064,6,2,1124,6,1,1184,6,1],"1197":[345,6,1,405,6,1,465,6,1,465,6,2,525,6,1,525,6,2,585,6,1,585,6,2,645,6,1,645,6,2,705,6,1,705,6,2,765,6,1,765,6,2,825,6,1,825,6,2,885,6,1,885,6,2,945,6,1,945,6,2,1005,6,1,1005,6,2,1065,6,1,1065,6,2,1125,6,1,1185,6,1],"1198":[346,6,1,406,6,1,466,6,1,466,6,2,526,6,1,526,6,2,586,6,1,586,6,2,646,6,1,646,6,2,706,6,1,706,6,2,766,6,1,766,6,2,826,6,1,826,6,2,886,6,1,886,6,2,946,6,1,946,6,2,1006,6,1,1006,6,2,1066,6,1,1066,6,2,1126,6,1,1186,6,1],"987654":[349,6,1,409,6,1,469,6,1,469,6,2,529,6,1,529,6,2,589,6,1,589,6,2,649,6,1,649,6,2,709,6,1,709,6,2,769,6,1,769,6,2,829,6,1,829,6,2,889,6,1,889,6,2,949,6,1,949,6,2,1009,6,1,1009,6,2,1069,6,1,1069,6,2,1129,6,1,1189,6,1],"980":[350,6,1,410,6,1,470,6,1,470,6,2,530,6,1,530,6,2,590,6,1,590,6,2,650,6,1,650,6,2,710,6,1,710,6,2,770,6,1,770,6,2,830,6,1,830,6,2,890,6,1,890,6,2,950,6,1,950,6,2,1010,6,1,1010,6,2,1070,6,1,1070,6,2,1130,6,1,1190,6,1],"977":[351,6,1,411,6,1,471,6,1,471,6,2,531,6,1,531,6,2,591,6,1,591,6,2,651,6,1,651,6,2,711,6,1,711,6,2,771,6,1,771,6,2,831,6,1,831,6,2,891,6,1,891,6,2,951,6,1,951,6,2,1011,6,1,1011,6,2,1071,6,1,1071,6,2,1131,6,1,1191,6,1],"976":[352,6,1,412,6,1,472,6,1,472,6,2,532,6,1,532,6,2,592,6,1,592,6,2,652,6,1,652,6,2,712,6,1,712,6,2,772,6,1,772,6,2,832,6,1,832,6,2,892,6,1,892,6,2,952,6,1,952,6,2,1012,6,1,1012,6,2,1072,6,1,1072,6,2,1132,6,1,1192,6,1],"988":[352,6,1,412,6,1,472,6,1,473,6,2,532,6,1,533,6,2,592,6,1,593,6,2,652,6,1,653,6,2,712,6,1,713,6,2,772,6,1,773,6,2,832,6,1,833,6,2,892,6,1,893,6,2,952,6,1,953,6,2,1012,6,1,1013,6,2,1072,6,1,1073,6,2,1132,6,1,1192,6,1],"990":[353,6,1,413,6,1,473,6,1,474,6,2,533,6,1,534,6,2,593,6,1,594,6,2,653,6,1,654,6,2,713,6,1,714,6,2,773,6,1,774,6,2,833,6,1,834,6,2,893,6,1,894,6,2,953,6,1,954,6,2,1013,6,1,1014,6,2,1073,6,1,1074,6,2,1133,6,1,1193,6,1],"1050":[354,6,1,414,6,1,474,6,1,474,6,2,534,6,1,534,6,2,594,6,1,594,6,2,654,6,1,654,6,2,714,6,1,714,6,2,774,6,1,774,6,2,834,6,1,834,6,2,894,6,1,894,6,2,954,6,1,954,6,2,1014,6,1,1014,6,2,1074,6,1,1074,6,2,1134,6,1,1194,6,1],"1052":[354,6,1,414,6,1,474,6,1,475,6,2,534,6,1,535,6,2,594,6,1,595,6,2,654,6,1,655,6,2,714,6,1,715,6,2,774,6,1,775,6,2,834,6,1,835,6,2,894,6,1,895,6,2,954,6,1,955,6,2,1014,6,1,1015,6,2,1074,6,1,1075,6,2,1134,6,1,1194,6,1],"993":[355,6,1,415,6,1,475,6,1,476,6,2,535,6,1,536,6,2,595,6,1,596,6,2,655,6,1,656,6,2,715,6,1,716,6,2,775,6,1,776,6,2,835,6,1,836,6,2,895,6,1,896,6,2,955,6,1,956,6,2,1015,6,1,1016,6,2,1075,6,1,1076,6,2,1135,6,1,1195,6,1],"1057":[355,6,1,415,6,1,475,6,1,476,6,2,535,6,1,536,6,2,595,6,1,596,6,2,655,6,1,656,6,2,715,6,1,716,6,2,775,6,1,776,6,2,835,6,1,836,6,2,895,6,1,896,6,2,955,6,1,956,6,2,1015,6,1,1016,6,2,1075,6,1,1076,6,2,1135,6,1,1195,6,1],"994":[356,6,1,416,6,1,476,6,1,476,6,2,536,6,1,536,6,2,596,6,1,596,6,2,656,6,1,656,6,2,716,6,1,716,6,2,776,6,1,776,6,2,836,6,1,836,6,2,896,6,1,896,6,2,956,6,1,956,6,2,1016,6,1,1016,6,2,1076,6,1,1076,6,2,1136,6,1,1196,6,1],"1059":[356,6,1,416,6,1,476,6,1,477,6,2,536,6,1,537,6,2,596,6,1,597,6,2,656,6,1,657,6,2,716,6,1,717,6,2,776,6,1,777,6,2,836,6,1,837,6,2,896,6,1,897,6,2,956,6,1,957,6,2,1016,6,1,1017,6,2,1076,6,1,1077,6,2,1136,6,1,1196,6,1],"1139":[357,6,1,417,6,1,477,6,1,477,6,2,537,6,1,537,6,2,597,6,1,597,6,2,657,6,1,657,6,2,717,6,1,717,6,2,777,6,1,777,6,2,837,6,1,837,6,2,897,6,1,897,6,2,957,6,1,957,6,2,1017,6,1,1017,6,2,1077,6,1,1077,6,2,1137,6,1,1197,6,1],"987668":[358,6,1,418,6,1,478,6,1,478,6,2,538,6,1,538,6,2,598,6,1,598,6,2,658,6,1,658,6,2,718,6,1,718,6,2,778,6,1,778,6,2,838,6,1,838,6,2,898,6,1,898,6,2,958,6,1,958,6,2,1018,6,1,1018,6,2,1078,6,1,1078,6,2,1138,6,1,1198,6,1],"1126":[356,19,1,358,6,1,415,19,1,418,6,1,475,19,1,475,19,2,478,6,1,479,6,2,535,19,1,535,19,2,538,6,1,539,6,2,595,19,1,595,19,2,598,6,1,599,6,2,655,19,1,655,19,2,658,6,1,659,6,2,715,19,1,715,19,2,718,6,1,719,6,2,775,19,1,775,19,2,778,6,1,779,6,2,835,19,1,835,19,2,838,6,1,839,6,2,895,19,1,895,19,2,898,6,1,899,6,2,955,19,1,955,19,2,958,6,1,959,6,2,1015,19,1,1015,19,2,1018,6,1,1019,6,2,1075,19,1,1075,19,2,1078,6,1,1079,6,2,1135,19,1,1138,6,1,1195,19,1,1198,6,1,1255,19,1],"1371":[356,19,1,359,6,1,381,6,1,381,19,1,416,19,1,419,6,1,441,6,1,441,19,1,476,19,1,476,19,2,479,6,1,480,6,2,500,6,2,501,6,1,501,19,1,501,19,2,536,19,1,536,19,2,539,6,1,540,6,2,560,6,2,561,6,1,561,19,1,561,19,2,596,19,1,596,19,2,599,6,1,600,6,2,620,6,2,621,6,1,621,19,1,621,19,2,656,19,1,656,19,2,659,6,1,660,6,2,680,6,2,681,6,1,681,19,1,681,19,2,716,19,1,716,19,2,719,6,1,720,6,2,740,6,2,741,6,1,741,19,1,741,19,2,776,19,1,776,19,2,779,6,1,780,6,2,800,6,2,801,6,1,801,19,1,801,19,2,836,19,1,836,19,2,839,6,1,840,6,2,860,6,2,861,6,1,861,19,1,861,19,2,896,19,1,896,19,2,899,6,1,900,6,2,920,6,2,921,6,1,921,19,1,921,19,2,956,19,1,956,19,2,959,6,1,960,6,2,980,6,2,981,6,1,981,19,1,981,19,2,1016,19,1,1016,19,2,1019,6,1,1020,6,2,1040,6,2,1041,6,1,1041,19,1,1041,19,2,1076,19,1,1076,19,2,1079,6,1,1080,6,2,1101,6,1,1101,19,1,1136,19,1,1139,6,1,1161,6,1,1161,19,1,1196,19,1,1199,6,1,1221,6,1,1221,19,1,1256,19,1],"1073":[358,19,1,360,6,1,417,19,1,420,6,1,477,19,1,477,19,2,480,6,1,481,6,2,537,19,1,537,19,2,540,6,1,541,6,2,597,19,1,597,19,2,600,6,1,601,6,2,657,19,1,657,19,2,660,6,1,661,6,2,717,19,1,717,19,2,720,6,1,721,6,2,777,19,1,777,19,2,780,6,1,781,6,2,837,19,1,837,19,2,840,6,1,841,6,2,897,19,1,897,19,2,900,6,1,901,6,2,957,19,1,957,19,2,960,6,1,961,6,2,1017,19,1,1017,19,2,1020,6,1,1021,6,2,1077,19,1,1077,19,2,1080,6,1,1081,6,2,1137,19,1,1140,6,1,1197,19,1,1200,6,1],"1140":[361,6,1,421,6,1,481,6,1,482,6,2,541,6,1,542,6,2,601,6,1,602,6,2,661,6,1,662,6,2,721,6,1,722,6,2,781,6,1,782,6,2,841,6,1,842,6,2,901,6,1,902,6,2,961,6,1,962,6,2,1021,6,1,1022,6,2,1081,6,1,1082,6,2,1141,6,1,1201,6,1],"955":[362,6,1,377,19,1,378,6,1,422,6,1,437,19,1,438,6,1,482,6,1,483,6,2,497,6,2,497,19,1,497,19,2,498,6,1,542,6,1,543,6,2,557,6,2,557,19,1,557,19,2,558,6,1,602,6,1,603,6,2,617,6,2,617,19,1,617,19,2,618,6,1,662,6,1,663,6,2,677,6,2,677,19,1,677,19,2,678,6,1,722,6,1,723,6,2,737,6,2,737,19,1,737,19,2,738,6,1,782,6,1,783,6,2,797,6,2,797,19,1,797,19,2,798,6,1,842,6,1,843,6,2,857,6,2,857,19,1,857,19,2,858,6,1,902,6,1,903,6,2,917,6,2,917,19,1,917,19,2,918,6,1,962,6,1,963,6,2,977,6,2,977,19,1,977,19,2,978,6,1,1022,6,1,1023,6,2,1037,6,2,1037,19,1,1037,19,2,1038,6,1,1082,6,1,1083,6,2,1097,19,1,1098,6,1,1142,6,1,1157,19,1,1158,6,1,1202,6,1,1217,19,1,1218,6,1],"987669":[362,6,1,422,6,1,482,6,1,483,6,2,542,6,1,543,6,2,602,6,1,603,6,2,662,6,1,663,6,2,722,6,1,723,6,2,782,6,1,783,6,2,842,6,1,843,6,2,902,6,1,903,6,2,962,6,1,963,6,2,1022,6,1,1023,6,2,1082,6,1,1083,6,2,1142,6,1,1202,6,1],"central-bay-E":[365,6,1,375,12,1,425,6,1,435,12,1,485,6,1,486,6,2,495,12,1,495,12,2,545,6,1,546,6,2,555,12,1,555,12,2,605,6,1,606,6,2,615,12,1,615,12,2,665,6,1,666,6,2,675,12,1,675,12,2,725,6,1,726,6,2,735,12,1,735,12,2,785,6,1,786,6,2,795,12,1,795,12,2,845,6,1,846,6,2,855,12,1,855,12,2,905,6,1,906,6,2,915,12,1,915,12,2,965,6,1,966,6,2,975,12,1,975,12,2,1025,6,1,1026,6,2,1035,12,1,1035,12,2,1085,6,1,1086,6,2,1095,12,1,1145,6,1,1155,12,1,1205,6,1,1215,12,1],"central-bay-J":[366,12,1,375,6,1,426,12,1,435,6,1,486,12,1,486,12,2,495,6,1,495,6,2,546,12,1,546,12,2,555,6,1,555,6,2,606,12,1,606,12,2,615,6,1,615,6,2,666,12,1,666,12,2,675,6,1,675,6,2,726,12,1,726,12,2,735,6,1,735,6,2,786,12,1,786,12,2,795,6,1,795,6,2,846,12,1,846,12,2,855,6,1,855,6,2,906,12,1,906,12,2,915,6,1,915,6,2,966,12,1,966,12,2,975,6,1,975,6,2,1026,12,1,1026,12,2,1035,6,1,1035,6,2,1086,12,1,1086,12,2,1095,6,1,1146,12,1,1155,6,1,1206,12,1,1215,6,1],"956":[379,6,1,379,19,1,439,6,1,439,19,1,498,6,2,499,6,1,499,19,1,499,19,2,558,6,2,559,6,1,559,19,1,559,19,2,618,6,2,619,6,1,619,19,1,619,19,2,678,6,2,679,6,1,679,19,1,679,19,2,738,6,2,739,6,1,739,19,1,739,19,2,798,6,2,799,6,1,799,19,1,799,19,2,858,6,2,859,6,1,859,19,1,859,19,2,918,6,2,919,6,1,919,19,1,919,19,2,978,6,2,979,6,1,979,19,1,979,19,2,1038,6,2,1039,6,1,1039,19,1,1039,19,2,1099,6,1,1099,19,1,1159,6,1,1159,19,1,1219,6,1,1219,19,1],"957":[380,6,1,380,19,1,440,6,1,440,19,1,499,6,2,500,6,1,500,19,1,500,19,2,559,6,2,560,6,1,560,19,1,560,19,2,619,6,2,620,6,1,620,19,1,620,19,2,679,6,2,680,6,1,680,19,1,680,19,2,739,6,2,740,6,1,740,19,1,740,19,2,799,6,2,800,6,1,800,19,1,800,19,2,859,6,2,860,6,1,860,19,1,860,19,2,919,6,2,920,6,1,920,19,1,920,19,2,979,6,2,980,6,1,980,19,1,980,19,2,1039,6,2,1040,6,1,1040,19,1,1040,19,2,1100,6,1,1100,19,1,1160,6,1,1160,19,1,1220,6,1,1220,19,1],"1038":[382,6,1,442,6,1,501,6,2,502,6,1,561,6,2,562,6,1,621,6,2,622,6,1,681,6,2,682,6,1,741,6,2,742,6,1,801,6,2,802,6,1,861,6,2,862,6,1,921,6,2,922,6,1,981,6,2,982,6,1,1041,6,2,1042,6,1,1102,6,1,1162,6,1,1222,6,1],"1040":[383,6,1,443,6,1,502,6,2,503,6,1,562,6,2,563,6,1,622,6,2,623,6,1,682,6,2,683,6,1,742,6,2,743,6,1,802,6,2,803,6,1,862,6,2,863,6,1,922,6,2,923,6,1,982,6,2,983,6,1,1042,6,2,1043,6,1,1103,6,1,1163,6,1,1223,6,1],"1041":[383,6,1,443,6,1,502,6,2,503,6,1,562,6,2,563,6,1,622,6,2,623,6,1,682,6,2,683,6,1,742,6,2,743,6,1,802,6,2,803,6,1,862,6,2,863,6,1,922,6,2,923,6,1,982,6,2,983,6,1,1042,6,2,1043,6,1,1103,6,1,1163,6,1,1223,6,1],"959":[384,6,1,444,6,1,503,6,2,504,6,1,563,6,2,564,6,1,623,6,2,624,6,1,683,6,2,684,6,1,743,6,2,744,6,1,803,6,2,804,6,1,863,6,2,864,6,1,923,6,2,924,6,1,983,6,2,984,6,1,1043,6,2,1044,6,1,1104,6,1,1164,6,1,1224,6,1],"1359":[384,6,1,444,6,1,504,6,1,504,6,2,564,6,1,564,6,2,624,6,1,624,6,2,684,6,1,684,6,2,744,6,1,744,6,2,804,6,1,804,6,2,864,6,1,864,6,2,924,6,1,924,6,2,984,6,1,984,6,2,1044,6,1,1044,6,2,1104,6,1,1164,6,1,1224,6,1],"1042":[385,6,1,445,6,1,504,6,2,505,6,1,564,6,2,565,6,1,624,6,2,625,6,1,684,6,2,685,6,1,744,6,2,745,6,1,804,6,2,805,6,1,864,6,2,865,6,1,924,6,2,925,6,1,984,6,2,985,6,1,1044,6,2,1045,6,1,1105,6,1,1165,6,1,1225,6,1],"1113":[385,6,1,445,6,1,504,6,2,505,6,1,564,6,2,565,6,1,624,6,2,625,6,1,684,6,2,685,6,1,744,6,2,745,6,1,804,6,2,805,6,1,864,6,2,865,6,1,924,6,2,925,6,1,984,6,2,985,6,1,1044,6,2,1045,6,1,1105,6,1,1165,6,1,1225,6,1],"987676":[385,6,1,445,6,1,505,6,1,505,6,2,565,6,1,565,6,2,625,6,1,625,6,2,685,6,1,685,6,2,745,6,1,745,6,2,805,6,1,805,6,2,865,6,1,865,6,2,925,6,1,925,6,2,985,6,1,985,6,2,1045,6,1,1045,6,2,1105,6,1,1165,6,1,1225,6,1],"1109":[386,6,1,446,6,1,505,6,2,506,6,1,565,6,2,566,6,1,625,6,2,626,6,1,685,6,2,686,6,1,745,6,2,746,6,1,805,6,2,806,6,1,865,6,2,866,6,1,925,6,2,926,6,1,985,6,2,986,6,1,1045,6,2,1046,6,1,1106,6,1,1166,6,1,1226,6,1],"1137":[386,6,1,446,6,1,505,6,2,506,6,1,565,6,2,566,6,1,625,6,2,626,6,1,685,6,2,686,6,1,745,6,2,746,6,1,805,6,2,806,6,1,865,6,2,866,6,1,925,6,2,926,6,1,985,6,2,986,6,1,1045,6,2,1046,6,1,1106,6,1,1166,6,1,1226,6,1],"1104":[387,6,1,447,6,1,506,6,2,507,6,1,566,6,2,567,6,1,626,6,2,627,6,1,686,6,2,687,6,1,746,6,2,747,6,1,806,6,2,807,6,1,866,6,2,867,6,1,926,6,2,927,6,1,986,6,2,987,6,1,1046,6,2,1047,6,1,1107,6,1,1167,6,1,1227,6,1],"1102":[387,6,1,447,6,1,507,6,1,507,6,2,567,6,1,567,6,2,627,6,1,627,6,2,687,6,1,687,6,2,747,6,1,747,6,2,807,6,1,807,6,2,867,6,1,867,6,2,927,6,1,927,6,2,987,6,1,987,6,2,1047,6,1,1047,6,2,1107,6,1,1167,6,1,1227,6,1],"522":[388,6,1,448,6,1,507,6,2,508,6,1,567,6,2,568,6,1,627,6,2,628,6,1,687,6,2,688,6,1,747,6,2,748,6,1,807,6,2,808,6,1,867,6,2,868,6,1,927,6,2,928,6,1,987,6,2,988,6,1,1047,6,2,1048,6,1,1108,6,1,1168,6,1,1228,6,1],"521":[389,6,1,449,6,1,508,6,2,509,6,1,568,6,2,569,6,1,628,6,2,629,6,1,688,6,2,689,6,1,748,6,2,749,6,1,808,6,2,809,6,1,868,6,2,869,6,1,928,6,2,929,6,1,988,6,2,989,6,1,1048,6,2,1049,6,1,1109,6,1,1169,6,1,1229,6,1],"987675":[389,6,1,449,6,1,509,6,1,509,6,2,569,6,1,569,6,2,629,6,1,629,6,2,689,6,1,689,6,2,749,6,1,749,6,2,809,6,1,809,6,2,869,6,1,869,6,2,929,6,1,929,6,2,989,6,1,989,6,2,1049,6,1,1049,6,2,1109,6,1,1169,6,1,1229,6,1],"518":[390,6,1,450,6,1,510,6,1,510,6,2,570,6,1,570,6,2,630,6,1,630,6,2,690,6,1,690,6,2,750,6,1,750,6,2,810,6,1,810,6,2,870,6,1,870,6,2,930,6,1,930,6,2,990,6,1,990,6,2,1050,6,1,1050,6,2,1110,6,1,1170,6,1,1230,6,1],"986":[392,6,1,452,6,1,511,6,2,512,6,1,571,6,2,572,6,1,631,6,2,632,6,1,691,6,2,692,6,1,751,6,2,752,6,1,811,6,2,812,6,1,871,6,2,872,6,1,931,6,2,932,6,1,991,6,2,992,6,1,1051,6,2,1052,6,1,1112,6,1,1172,6,1,1232,6,1],"100":[392,6,1,452,6,1,512,6,1,512,6,2,572,6,1,572,6,2,632,6,1,632,6,2,692,6,1,692,6,2,752,6,1,752,6,2,812,6,1,812,6,2,872,6,1,872,6,2,932,6,1,932,6,2,992,6,1,992,6,2,1052,6,1,1052,6,2,1112,6,1,1172,6,1,1232,6,1],"515":[393,6,1,453,6,1,513,6,1,513,6,2,573,6,1,573,6,2,633,6,1,633,6,2,693,6,1,693,6,2,753,6,1,753,6,2,813,6,1,813,6,2,873,6,1,873,6,2,933,6,1,933,6,2,993,6,1,993,6,2,1053,6,1,1053,6,2,1113,6,1,1173,6,1,1233,6,1],"123464":[394,6,1,454,6,1,514,6,1,514,6,2,574,6,1,574,6,2,634,6,1,634,6,2,694,6,1,694,6,2,754,6,1,754,6,2,814,6,1,814,6,2,874,6,1,874,6,2,934,6,1,934,6,2,994,6,1,994,6,2,1054,6,1,1054,6,2,1114,6,1,1174,6,1,1234,6,1],"987667":[395,6,1,455,6,1,515,6,1,515,6,2,575,6,1,575,6,2,635,6,1,635,6,2,695,6,1,695,6,2,755,6,1,755,6,2,815,6,1,815,6,2,875,6,1,875,6,2,935,6,1,935,6,2,995,6,1,995,6,2,1055,6,1,1055,6,2,1115,6,1,1175,6,1,1235,6,1],"1188":[395,6,1,455,6,1,515,6,1,515,6,2,575,6,1,575,6,2,635,6,1,635,6,2,695,6,1,695,6,2,755,6,1,755,6,2,815,6,1,815,6,2,875,6,1,875,6,2,935,6,1,935,6,2,995,6,1,995,6,2,1055,6,1,1055,6,2,1115,6,1,1175,6,1,1235,6,1],"ghrx":[396,6,1,456,6,1,516,6,1,516,6,2,576,6,1,576,6,2,636,6,1,636,6,2,696,6,1,696,6,2,756,6,1,756,6,2,816,6,1,816,6,2,876,6,1,876,6,2,936,6,1,936,6,2,996,6,1,996,6,2,1056,6,1,1056,6,2,1116,6,1,1176,6,1,1236,6,1],"1190":[397,6,1,457,6,1,517,6,1,517,6,2,577,6,1,577,6,2,637,6,1,637,6,2,697,6,1,697,6,2,757,6,1,757,6,2,817,6,1,817,6,2,877,6,1,877,6,2,937,6,1,937,6,2,997,6,1,997,6,2,1057,6,1,1057,6,2,1117,6,1,1177,6,1,1237,6,1],"1192":[398,6,1,458,6,1,518,6,1,518,6,2,578,6,1,578,6,2,638,6,1,638,6,2,698,6,1,698,6,2,758,6,1,758,6,2,818,6,1,818,6,2,878,6,1,878,6,2,938,6,1,938,6,2,998,6,1,998,6,2,1058,6,1,1058,6,2,1118,6,1,1178,6,1,1238,6,1],"1193":[398,6,1,458,6,1,518,6,1,518,6,2,578,6,1,578,6,2,638,6,1,638,6,2,698,6,1,698,6,2,758,6,1,758,6,2,818,6,1,818,6,2,878,6,1,878,6,2,938,6,1,938,6,2,998,6,1,998,6,2,1058,6,1,1058,6,2,1118,6,1,1178,6,1,1238,6,1],"506":[342,12,1,402,12,1,462,12,1,462,12,2,522,12,1,522,12,2,582,12,1,582,12,2,642,12,1,642,12,2,702,12,1,702,12,2,762,12,1,762,12,2,822,12,1,822,12,2,882,12,1,882,12,2,942,12,1,942,12,2,1002,12,1,1002,12,2,1062,12,1,1062,12,2,1122,12,1,1182,12,1],"1017":[346,12,1,406,12,1,466,12,1,466,12,2,526,12,1,526,12,2,586,12,1,586,12,2,646,12,1,646,12,2,706,12,1,706,12,2,766,12,1,766,12,2,826,12,1,826,12,2,886,12,1,886,12,2,946,12,1,946,12,2,1006,12,1,1006,12,2,1066,12,1,1066,12,2,1126,12,1,1186,12,1],"1019":[346,12,1,406,12,1,466,12,1,466,12,2,526,12,1,526,12,2,586,12,1,586,12,2,646,12,1,646,12,2,706,12,1,706,12,2,766,12,1,766,12,2,826,12,1,826,12,2,886,12,1,886,12,2,946,12,1,946,12,2,1006,12,1,1006,12,2,1066,12,1,1066,12,2,1126,12,1,1186,12,1],"1020":[346,12,1,406,12,1,466,12,1,466,12,2,526,12,1,526,12,2,586,12,1,586,12,2,646,12,1,646,12,2,706,12,1,706,12,2,766,12,1,766,12,2,826,12,1,826,12,2,886,12,1,886,12,2,946,12,1,946,12,2,1006,12,1,1006,12,2,1066,12,1,1066,12,2,1126,12,1,1186,12,1],"1358":[348,12,1,408,12,1,468,12,1,468,12,2,528,12,1,528,12,2,588,12,1,588,12,2,648,12,1,648,12,2,708,12,1,708,12,2,768,12,1,768,12,2,828,12,1,828,12,2,888,12,1,888,12,2,948,12,1,948,12,2,1008,12,1,1008,12,2,1068,12,1,1068,12,2,1128,12,1,1188,12,1],"1023":[349,12,1,409,12,1,469,12,1,469,12,2,529,12,1,529,12,2,589,12,1,589,12,2,649,12,1,649,12,2,709,12,1,709,12,2,769,12,1,769,12,2,829,12,1,829,12,2,889,12,1,889,12,2,949,12,1,949,12,2,1009,12,1,1009,12,2,1069,12,1,1069,12,2,1129,12,1,1189,12,1],"987666":[352,12,1,412,12,1,471,12,2,472,12,1,531,12,2,532,12,1,591,12,2,592,12,1,651,12,2,652,12,1,711,12,2,712,12,1,771,12,2,772,12,1,831,12,2,832,12,1,891,12,2,892,12,1,951,12,2,952,12,1,1011,12,2,1012,12,1,1071,12,2,1072,12,1,1132,12,1,1192,12,1],"1031":[353,12,1,413,12,1,472,12,2,473,12,1,532,12,2,533,12,1,592,12,2,593,12,1,652,12,2,653,12,1,712,12,2,713,12,1,772,12,2,773,12,1,832,12,2,833,12,1,892,12,2,893,12,1,952,12,2,953,12,1,1012,12,2,1013,12,1,1072,12,2,1073,12,1,1133,12,1,1193,12,1],"w905":[353,12,1,413,12,1,472,12,2,473,12,1,532,12,2,533,12,1,592,12,2,593,12,1,652,12,2,653,12,1,712,12,2,713,12,1,772,12,2,773,12,1,832,12,2,833,12,1,892,12,2,893,12,1,952,12,2,953,12,1,1012,12,2,1013,12,1,1072,12,2,1073,12,1,1133,12,1,1193,12,1],"1032":[354,12,1,414,12,1,474,12,1,474,12,2,534,12,1,534,12,2,594,12,1,594,12,2,654,12,1,654,12,2,714,12,1,714,12,2,774,12,1,774,12,2,834,12,1,834,12,2,894,12,1,894,12,2,954,12,1,954,12,2,1014,12,1,1014,12,2,1074,12,1,1074,12,2,1134,12,1,1194,12,1],"943":[355,12,1,415,12,1,474,12,2,475,12,1,534,12,2,535,12,1,594,12,2,595,12,1,654,12,2,655,12,1,714,12,2,715,12,1,774,12,2,775,12,1,834,12,2,835,12,1,894,12,2,895,12,1,954,12,2,955,12,1,1014,12,2,1015,12,1,1074,12,2,1075,12,1,1135,12,1,1195,12,1],"944":[355,12,1,415,12,1,474,12,2,475,12,1,534,12,2,535,12,1,594,12,2,595,12,1,654,12,2,655,12,1,714,12,2,715,12,1,774,12,2,775,12,1,834,12,2,835,12,1,894,12,2,895,12,1,954,12,2,955,12,1,1014,12,2,1015,12,1,1074,12,2,1075,12,1,1135,12,1,1195,12,1],"1033":[356,12,1,416,12,1,476,12,1,476,12,2,536,12,1,536,12,2,596,12,1,596,12,2,656,12,1,656,12,2,716,12,1,716,12,2,776,12,1,776,12,2,836,12,1,836,12,2,896,12,1,896,12,2,956,12,1,956,12,2,1016,12,1,1016,12,2,1076,12,1,1076,12,2,1136,12,1,1196,12,1],"949":[357,12,1,417,12,1,477,12,1,477,12,2,537,12,1,537,12,2,597,12,1,597,12,2,657,12,1,657,12,2,717,12,1,717,12,2,777,12,1,777,12,2,837,12,1,837,12,2,897,12,1,897,12,2,957,12,1,957,12,2,1017,12,1,1017,12,2,1077,12,1,1077,12,2,1137,12,1,1197,12,1],"953":[361,12,1,421,12,1,481,12,1,481,12,2,541,12,1,541,12,2,601,12,1,601,12,2,661,12,1,661,12,2,721,12,1,721,12,2,781,12,1,781,12,2,841,12,1,841,12,2,901,12,1,901,12,2,961,12,1,961,12,2,1021,12,1,1021,12,2,1081,12,1,1081,12,2,1141,12,1,1201,12,1],"954":[361,12,1,421,12,1,481,12,1,481,12,2,541,12,1,541,12,2,601,12,1,601,12,2,661,12,1,661,12,2,721,12,1,721,12,2,781,12,1,781,12,2,841,12,1,841,12,2,901,12,1,901,12,2,961,12,1,961,12,2,1021,12,1,1021,12,2,1081,12,1,1081,12,2,1141,12,1,1201,12,1],"1338":[362,12,1,422,12,1,482,12,1,482,12,2,542,12,1,542,12,2,602,12,1,602,12,2,662,12,1,662,12,2,722,12,1,722,12,2,782,12,1,782,12,2,842,12,1,842,12,2,902,12,1,902,12,2,962,12,1,962,12,2,1022,12,1,1022,12,2,1082,12,1,1082,12,2,1142,12,1,1202,12,1],"496":[363,12,1,423,12,1,483,12,1,483,12,2,543,12,1,543,12,2,603,12,1,603,12,2,663,12,1,663,12,2,723,12,1,723,12,2,783,12,1,783,12,2,843,12,1,843,12,2,903,12,1,903,12,2,963,12,1,963,12,2,1023,12,1,1023,12,2,1083,12,1,1083,12,2,1143,12,1,1203,12,1],"1337":[363,16,1,363,19,1,364,12,1,423,16,1,423,19,1,424,12,1,483,16,1,483,19,1,483,19,2,484,12,1,484,12,2,484,16,2,543,16,1,543,19,1,543,19,2,544,12,1,544,12,2,544,16,2,603,16,1,603,19,1,603,19,2,604,12,1,604,12,2,604,16,2,663,16,1,663,19,1,663,19,2,664,12,1,664,12,2,664,16,2,723,16,1,723,19,1,723,19,2,724,12,1,724,12,2,724,16,2,783,16,1,783,19,1,783,19,2,784,12,1,784,12,2,784,16,2,843,16,1,843,19,1,843,19,2,844,12,1,844,12,2,844,16,2,903,16,1,903,19,1,903,19,2,904,12,1,904,12,2,904,16,2,963,16,1,963,19,1,963,19,2,964,12,1,964,12,2,964,16,2,1023,16,1,1023,19,1,1023,19,2,1024,12,1,1024,12,2,1024,16,2,1083,16,1,1083,19,1,1083,19,2,1084,12,1,1084,12,2,1084,16,2,1143,16,1,1143,19,1,1144,12,1,1203,16,1,1203,19,1,1204,12,1],"721":[377,12,1,437,12,1,497,12,1,497,12,2,557,12,1,557,12,2,617,12,1,617,12,2,677,12,1,677,12,2,737,12,1,737,12,2,797,12,1,797,12,2,857,12,1,857,12,2,917,12,1,917,12,2,977,12,1,977,12,2,1037,12,1,1037,12,2,1097,12,1,1157,12,1,1217,12,1],"793":[378,12,1,438,12,1,498,12,1,498,12,2,558,12,1,558,12,2,618,12,1,618,12,2,678,12,1,678,12,2,738,12,1,738,12,2,798,12,1,798,12,2,858,12,1,858,12,2,918,12,1,918,12,2,978,12,1,978,12,2,1038,12,1,1038,12,2,1098,12,1,1158,12,1,1218,12,1],"794":[379,12,1,439,12,1,499,12,1,499,12,2,559,12,1,559,12,2,619,12,1,619,12,2,679,12,1,679,12,2,739,12,1,739,12,2,799,12,1,799,12,2,859,12,1,859,12,2,919,12,1,919,12,2,979,12,1,979,12,2,1039,12,1,1039,12,2,1099,12,1,1159,12,1,1219,12,1],"501":[380,12,1,440,12,1,500,12,1,500,12,2,560,12,1,560,12,2,620,12,1,620,12,2,680,12,1,680,12,2,740,12,1,740,12,2,800,12,1,800,12,2,860,12,1,860,12,2,920,12,1,920,12,2,980,12,1,980,12,2,1040,12,1,1040,12,2,1100,12,1,1160,12,1,1220,12,1],"502":[381,12,1,441,12,1,501,12,1,501,12,2,561,12,1,561,12,2,621,12,1,621,12,2,681,12,1,681,12,2,741,12,1,741,12,2,801,12,1,801,12,2,861,12,1,861,12,2,921,12,1,921,12,2,981,12,1,981,12,2,1041,12,1,1041,12,2,1101,12,1,1161,12,1,1221,12,1],"938":[383,12,1,443,12,1,503,12,1,503,12,2,563,12,1,563,12,2,623,12,1,623,12,2,683,12,1,683,12,2,743,12,1,743,12,2,803,12,1,803,12,2,863,12,1,863,12,2,923,12,1,923,12,2,983,12,1,983,12,2,1043,12,1,1043,12,2,1103,12,1,1163,12,1,1223,12,1],"1009":[383,12,1,443,12,1,503,12,1,503,12,2,563,12,1,563,12,2,623,12,1,623,12,2,683,12,1,683,12,2,743,12,1,743,12,2,803,12,1,803,12,2,863,12,1,863,12,2,923,12,1,923,12,2,983,12,1,983,12,2,1043,12,1,1043,12,2,1103,12,1,1163,12,1,1223,12,1],"1010":[383,12,1,443,12,1,503,12,1,503,12,2,563,12,1,563,12,2,623,12,1,623,12,2,683,12,1,683,12,2,743,12,1,743,12,2,803,12,1,803,12,2,863,12,1,863,12,2,923,12,1,923,12,2,983,12,1,983,12,2,1043,12,1,1043,12,2,1103,12,1,1163,12,1,1223,12,1],"1012":[384,12,1,444,12,1,504,12,1,504,12,2,564,12,1,564,12,2,624,12,1,624,12,2,684,12,1,684,12,2,744,12,1,744,12,2,804,12,1,804,12,2,864,12,1,864,12,2,924,12,1,924,12,2,984,12,1,984,12,2,1044,12,1,1044,12,2,1104,12,1,1164,12,1,1224,12,1],"1014":[385,12,1,445,12,1,505,12,1,505,12,2,565,12,1,565,12,2,625,12,1,625,12,2,685,12,1,685,12,2,745,12,1,745,12,2,805,12,1,805,12,2,865,12,1,865,12,2,925,12,1,925,12,2,985,12,1,985,12,2,1045,12,1,1045,12,2,1105,12,1,1165,12,1,1225,12,1],"central-bay-G":[365,19,1,375,19,1,425,19,1,435,19,1,485,19,1,485,19,2,495,19,1,495,19,2,545,19,1,545,19,2,555,19,1,555,19,2,605,19,1,605,19,2,615,19,1,615,19,2,665,19,1,665,19,2,675,19,1,675,19,2,725,19,1,725,19,2,735,19,1,735,19,2,785,19,1,785,19,2,795,19,1,795,19,2,845,19,1,845,19,2,855,19,1,855,19,2,905,19,1,905,19,2,915,19,1,915,19,2,965,19,1,965,19,2,975,19,1,975,19,2,1025,19,1,1025,19,2,1035,19,1,1035,19,2,1085,19,1,1085,19,2,1095,19,1,1145,19,1,1155,19,1,1205,19,1,1215,19,1],"1141":[382,19,1,442,19,1,502,19,1,502,19,2,562,19,1,562,19,2,622,19,1,622,19,2,682,19,1,682,19,2,742,19,1,742,19,2,802,19,1,802,19,2,862,19,1,862,19,2,922,19,1,922,19,2,982,19,1,982,19,2,1042,19,1,1042,19,2,1102,19,1,1162,19,1,1222,19,1],"1127":[382,19,1,442,19,1,502,19,1,502,19,2,562,19,1,562,19,2,622,19,1,622,19,2,682,19,1,682,19,2,742,19,1,742,19,2,802,19,1,802,19,2,862,19,1,862,19,2,922,19,1,922,19,2,982,19,1,982,19,2,1042,19,1,1042,19,2,1102,19,1,1162,19,1,1222,19,1],"1142":[383,19,1,443,19,1,503,19,1,503,19,2,563,19,1,563,19,2,623,19,1,623,19,2,683,19,1,683,19,2,743,19,1,743,19,2,803,19,1,803,19,2,863,19,1,863,19,2,923,19,1,923,19,2,983,19,1,983,19,2,1043,19,1,1043,19,2,1103,19,1,1163,19,1,1223,19,1],"1133":[383,19,1,443,19,1,503,19,1,503,19,2,563,19,1,563,19,2,623,19,1,623,19,2,683,19,1,683,19,2,743,19,1,743,19,2,803,19,1,803,19,2,863,19,1,863,19,2,923,19,1,923,19,2,983,19,1,983,19,2,1043,19,1,1043,19,2,1103,19,1,1163,19,1,1223,19,1],"1134":[383,19,1,443,19,1,503,19,1,503,19,2,563,19,1,563,19,2,623,19,1,623,19,2,683,19,1,683,19,2,743,19,1,743,19,2,803,19,1,803,19,2,863,19,1,863,19,2,923,19,1,923,19,2,983,19,1,983,19,2,1043,19,1,1043,19,2,1103,19,1,1163,19,1,1223,19,1],"48":[384,19,1,444,19,1,504,19,1,504,19,2,564,19,1,564,19,2,624,19,1,624,19,2,684,19,1,684,19,2,744,19,1,744,19,2,804,19,1,804,19,2,864,19,1,864,19,2,924,19,1,924,19,2,984,19,1,984,19,2,1044,19,1,1044,19,2,1104,19,1,1164,19,1,1224,19,1],"1080":[384,19,1,444,19,1,504,19,1,504,19,2,564,19,1,564,19,2,624,19,1,624,19,2,684,19,1,684,19,2,744,19,1,744,19,2,804,19,1,804,19,2,864,19,1,864,19,2,924,19,1,924,19,2,984,19,1,984,19,2,1044,19,1,1044,19,2,1104,19,1,1164,19,1,1224,19,1],"1084":[385,19,1,445,19,1,505,19,1,505,19,2,565,19,1,565,19,2,625,19,1,625,19,2,685,19,1,685,19,2,745,19,1,745,19,2,805,19,1,805,19,2,865,19,1,865,19,2,925,19,1,925,19,2,985,19,1,985,19,2,1045,19,1,1045,19,2,1105,19,1,1165,19,1,1225,19,1],"1086":[385,19,1,445,19,1,505,19,1,505,19,2,565,19,1,565,19,2,625,19,1,625,19,2,685,19,1,685,19,2,745,19,1,745,19,2,805,19,1,805,19,2,865,19,1,865,19,2,925,19,1,925,19,2,985,19,1,985,19,2,1045,19,1,1045,19,2,1105,19,1,1165,19,1,1225,19,1],"1090":[386,19,1,446,19,1,506,19,1,506,19,2,566,19,1,566,19,2,626,19,1,626,19,2,686,19,1,686,19,2,746,19,1,746,19,2,806,19,1,806,19,2,866,19,1,866,19,2,926,19,1,926,19,2,986,19,1,986,19,2,1046,19,1,1046,19,2,1106,19,1,1166,19,1,1226,19,1],"1100":[387,19,1,447,19,1,507,19,1,507,19,2,567,19,1,567,19,2,627,19,1,627,19,2,687,19,1,687,19,2,747,19,1,747,19,2,807,19,1,807,19,2,867,19,1,867,19,2,927,19,1,927,19,2,987,19,1,987,19,2,1047,19,1,1047,19,2,1107,19,1,1167,19,1,1227,19,1],"1094":[387,19,1,447,19,1,507,19,1,507,19,2,567,19,1,567,19,2,627,19,1,627,19,2,687,19,1,687,19,2,747,19,1,747,19,2,807,19,1,807,19,2,867,19,1,867,19,2,927,19,1,927,19,2,987,19,1,987,19,2,1047,19,1,1047,19,2,1107,19,1,1167,19,1,1227,19,1],"1095":[387,19,1,447,19,1,507,19,1,507,19,2,567,19,1,567,19,2,627,19,1,627,19,2,687,19,1,687,19,2,747,19,1,747,19,2,807,19,1,807,19,2,867,19,1,867,19,2,927,19,1,927,19,2,987,19,1,987,19,2,1047,19,1,1047,19,2,1107,19,1,1167,19,1,1227,19,1],"1097":[388,19,1,448,19,1,508,19,1,508,19,2,568,19,1,568,19,2,628,19,1,628,19,2,688,19,1,688,19,2,748,19,1,748,19,2,808,19,1,808,19,2,868,19,1,868,19,2,928,19,1,928,19,2,988,19,1,988,19,2,1048,19,1,1048,19,2,1108,19,1,1168,19,1,1228,19,1],"6lv4":[389,19,1,449,19,1,509,19,1,509,19,2,569,19,1,569,19,2,629,19,1,629,19,2,689,19,1,689,19,2,749,19,1,749,19,2,809,19,1,809,19,2,869,19,1,869,19,2,929,19,1,929,19,2,989,19,1,989,19,2,1049,19,1,1049,19,2,1109,19,1,1169,19,1,1229,19,1],"1098":[390,19,1,450,19,1,510,19,1,510,19,2,570,19,1,570,19,2,630,19,1,630,19,2,690,19,1,690,19,2,750,19,1,750,19,2,810,19,1,810,19,2,870,19,1,870,19,2,930,19,1,930,19,2,990,19,1,990,19,2,1050,19,1,1050,19,2,1110,19,1,1170,19,1,1230,19,1],"1099":[391,19,1,451,19,1,511,19,1,511,19,2,571,19,1,571,19,2,631,19,1,631,19,2,691,19,1,691,19,2,751,19,1,751,19,2,811,19,1,811,19,2,871,19,1,871,19,2,931,19,1,931,19,2,991,19,1,991,19,2,1051,19,1,1051,19,2,1111,19,1,1171,19,1,1231,19,1],"618":[347,19,1,392,19,1,407,19,1,452,19,1,467,19,1,468,19,2,512,19,1,512,19,2,527,19,1,528,19,2,572,19,1,572,19,2,587,19,1,588,19,2,632,19,1,632,19,2,647,19,1,648,19,2,692,19,1,692,19,2,707,19,1,708,19,2,752,19,1,752,19,2,767,19,1,768,19,2,812,19,1,812,19,2,827,19,1,828,19,2,872,19,1,872,19,2,887,19,1,888,19,2,932,19,1,932,19,2,947,19,1,948,19,2,992,19,1,992,19,2,1007,19,1,1008,19,2,1052,19,1,1052,19,2,1067,19,1,1068,19,2,1112,19,1,1127,19,1,1172,19,1,1187,19,1,1232,19,1,1247,19,1],"1362":[392,19,1,452,19,1,512,19,1,512,19,2,572,19,1,572,19,2,632,19,1,632,19,2,692,19,1,692,19,2,752,19,1,752,19,2,812,19,1,812,19,2,872,19,1,872,19,2,932,19,1,932,19,2,992,19,1,992,19,2,1052,19,1,1052,19,2,1112,19,1,1172,19,1,1232,19,1],"905":[394,19,1,454,19,1,514,19,1,514,19,2,574,19,1,574,19,2,634,19,1,634,19,2,694,19,1,694,19,2,754,19,1,754,19,2,814,19,1,814,19,2,874,19,1,874,19,2,934,19,1,934,19,2,994,19,1,994,19,2,1054,19,1,1054,19,2,1114,19,1,1174,19,1,1234,19,1],"906":[394,19,1,454,19,1,514,19,1,514,19,2,574,19,1,574,19,2,634,19,1,634,19,2,694,19,1,694,19,2,754,19,1,754,19,2,814,19,1,814,19,2,874,19,1,874,19,2,934,19,1,934,19,2,994,19,1,994,19,2,1054,19,1,1054,19,2,1114,19,1,1174,19,1,1234,19,1],"898":[344,19,1,396,19,1,404,19,1,456,19,1,464,19,1,464,19,2,516,19,1,516,19,2,524,19,1,524,19,2,576,19,1,576,19,2,584,19,1,584,19,2,636,19,1,636,19,2,644,19,1,644,19,2,696,19,1,696,19,2,704,19,1,704,19,2,756,19,1,756,19,2,764,19,1,764,19,2,816,19,1,816,19,2,824,19,1,824,19,2,876,19,1,876,19,2,884,19,1,884,19,2,936,19,1,936,19,2,944,19,1,944,19,2,996,19,1,996,19,2,1004,19,1,1004,19,2,1056,19,1,1056,19,2,1064,19,1,1064,19,2,1116,19,1,1124,19,1,1176,19,1,1184,19,1,1236,19,1,1244,19,1],"50":[344,19,1,397,19,1,404,19,1,457,19,1,464,19,1,464,19,2,517,19,1,517,19,2,524,19,1,524,19,2,577,19,1,577,19,2,584,19,1,584,19,2,637,19,1,637,19,2,644,19,1,644,19,2,697,19,1,697,19,2,704,19,1,704,19,2,757,19,1,757,19,2,764,19,1,764,19,2,817,19,1,817,19,2,824,19,1,824,19,2,877,19,1,877,19,2,884,19,1,884,19,2,937,19,1,937,19,2,944,19,1,944,19,2,997,19,1,997,19,2,1004,19,1,1004,19,2,1057,19,1,1057,19,2,1064,19,1,1064,19,2,1117,19,1,1124,19,1,1177,19,1,1184,19,1,1237,19,1,1244,19,1],"900":[345,19,1,397,19,1,404,19,1,457,19,1,464,19,1,465,19,2,517,19,1,517,19,2,524,19,1,525,19,2,577,19,1,577,19,2,584,19,1,585,19,2,637,19,1,637,19,2,644,19,1,645,19,2,697,19,1,697,19,2,704,19,1,705,19,2,757,19,1,757,19,2,764,19,1,765,19,2,817,19,1,817,19,2,824,19,1,825,19,2,877,19,1,877,19,2,884,19,1,885,19,2,937,19,1,937,19,2,944,19,1,945,19,2,997,19,1,997,19,2,1004,19,1,1005,19,2,1057,19,1,1057,19,2,1064,19,1,1065,19,2,1117,19,1,1124,19,1,1177,19,1,1184,19,1,1237,19,1,1244,19,1],"902":[345,19,1,398,19,1,405,19,1,458,19,1,465,19,1,465,19,2,518,19,1,518,19,2,525,19,1,525,19,2,578,19,1,578,19,2,585,19,1,585,19,2,638,19,1,638,19,2,645,19,1,645,19,2,698,19,1,698,19,2,705,19,1,705,19,2,758,19,1,758,19,2,765,19,1,765,19,2,818,19,1,818,19,2,825,19,1,825,19,2,878,19,1,878,19,2,885,19,1,885,19,2,938,19,1,938,19,2,945,19,1,945,19,2,998,19,1,998,19,2,1005,19,1,1005,19,2,1058,19,1,1058,19,2,1065,19,1,1065,19,2,1118,19,1,1125,19,1,1178,19,1,1185,19,1,1238,19,1,1245,19,1],"901":[398,19,1,458,19,1,518,19,1,518,19,2,578,19,1,578,19,2,638,19,1,638,19,2,698,19,1,698,19,2,758,19,1,758,19,2,818,19,1,818,19,2,878,19,1,878,19,2,938,19,1,938,19,2,998,19,1,998,19,2,1058,19,1,1058,19,2,1118,19,1,1178,19,1,1238,19,1],"1372":[335,7,1,340,19,1,395,7,1,400,19,1,455,7,1,455,7,2,460,19,1,460,19,2,515,7,1,515,7,2,520,19,1,520,19,2,545,7,1,575,7,1,575,7,2,580,19,1,580,19,2,605,7,1,635,7,1,635,7,2,640,19,1,640,19,2,665,7,1,695,7,1,695,7,2,700,19,1,700,19,2,725,7,1,755,7,1,755,7,2,760,19,1,760,19,2,785,7,1,815,7,1,815,7,2,820,19,1,820,19,2,845,7,1,875,7,1,875,7,2,880,19,1,880,19,2,905,7,1,935,7,1,935,7,2,940,19,1,940,19,2,965,7,1,995,7,1,995,7,2,1000,19,1,1000,19,2,1055,7,1,1055,7,2,1060,19,1,1060,19,2,1115,7,1,1120,19,1,1175,7,1,1180,19,1,1235,7,1,1240,19,1],"531":[335,7,1,340,19,1,395,7,1,400,19,1,455,7,1,455,7,2,460,19,1,460,19,2,515,7,1,515,7,2,520,19,1,520,19,2,545,7,1,575,7,1,575,7,2,580,19,1,580,19,2,605,7,1,635,7,1,635,7,2,640,19,1,640,19,2,665,7,1,695,7,1,695,7,2,700,19,1,700,19,2,725,7,1,755,7,1,755,7,2,760,19,1,760,19,2,785,7,1,815,7,1,815,7,2,820,19,1,820,19,2,845,7,1,875,7,1,875,7,2,880,19,1,880,19,2,905,7,1,935,7,1,935,7,2,940,19,1,940,19,2,965,7,1,995,7,1,995,7,2,1000,19,1,1000,19,2,1055,7,1,1055,7,2,1060,19,1,1060,19,2,1115,7,1,1120,19,1,1175,7,1,1180,19,1,1240,19,1],"iwyf":[342,19,1,402,19,1,462,19,1,462,19,2,522,19,1,522,19,2,582,19,1,582,19,2,642,19,1,642,19,2,702,19,1,702,19,2,762,19,1,762,19,2,822,19,1,822,19,2,882,19,1,882,19,2,942,19,1,942,19,2,1002,19,1,1002,19,2,1062,19,1,1062,19,2,1122,19,1,1182,19,1,1242,19,1],"903":[345,19,1,405,19,1,465,19,1,466,19,2,525,19,1,526,19,2,585,19,1,586,19,2,645,19,1,646,19,2,705,19,1,706,19,2,765,19,1,766,19,2,825,19,1,826,19,2,885,19,1,886,19,2,945,19,1,946,19,2,1005,19,1,1006,19,2,1065,19,1,1066,19,2,1125,19,1,1185,19,1,1245,19,1],"987670":[345,19,1,406,19,1,466,19,1,466,19,2,526,19,1,526,19,2,586,19,1,586,19,2,646,19,1,646,19,2,706,19,1,706,19,2,766,19,1,766,19,2,826,19,1,826,19,2,886,19,1,886,19,2,946,19,1,946,19,2,1006,19,1,1006,19,2,1066,19,1,1066,19,2,1126,19,1,1186,19,1,1246,19,1],"910":[347,19,1,407,19,1,467,19,1,467,19,2,527,19,1,527,19,2,587,19,1,587,19,2,647,19,1,647,19,2,707,19,1,707,19,2,767,19,1,767,19,2,827,19,1,827,19,2,887,19,1,887,19,2,947,19,1,947,19,2,1007,19,1,1007,19,2,1067,19,1,1067,19,2,1127,19,1,1187,19,1,1247,19,1],"915":[347,19,1,407,19,1,467,19,1,467,19,2,527,19,1,527,19,2,587,19,1,587,19,2,647,19,1,647,19,2,707,19,1,707,19,2,767,19,1,767,19,2,827,19,1,827,19,2,887,19,1,887,19,2,947,19,1,947,19,2,1007,19,1,1007,19,2,1067,19,1,1067,19,2,1127,19,1,1187,19,1,1247,19,1],"51":[348,19,1,408,19,1,468,19,1,468,19,2,528,19,1,528,19,2,588,19,1,588,19,2,648,19,1,648,19,2,708,19,1,708,19,2,768,19,1,768,19,2,828,19,1,828,19,2,888,19,1,888,19,2,948,19,1,948,19,2,1008,19,1,1008,19,2,1068,19,1,1068,19,2,1128,19,1,1188,19,1,1248,19,1],"909":[349,19,1,408,19,1,468,19,1,468,19,2,528,19,1,528,19,2,588,19,1,588,19,2,648,19,1,648,19,2,708,19,1,708,19,2,768,19,1,768,19,2,828,19,1,828,19,2,888,19,1,888,19,2,948,19,1,948,19,2,1008,19,1,1008,19,2,1068,19,1,1068,19,2,1128,19,1,1188,19,1,1248,19,1],"911":[349,19,1,409,19,1,469,19,1,469,19,2,529,19,1,529,19,2,589,19,1,589,19,2,649,19,1,649,19,2,709,19,1,709,19,2,769,19,1,769,19,2,829,19,1,829,19,2,889,19,1,889,19,2,949,19,1,949,19,2,1009,19,1,1009,19,2,1069,19,1,1069,19,2,1129,19,1,1189,19,1,1249,19,1],"912":[350,19,1,409,19,1,469,19,1,469,19,2,529,19,1,529,19,2,589,19,1,589,19,2,649,19,1,649,19,2,709,19,1,709,19,2,769,19,1,769,19,2,829,19,1,829,19,2,889,19,1,889,19,2,949,19,1,949,19,2,1009,19,1,1009,19,2,1069,19,1,1069,19,2,1129,19,1,1189,19,1,1249,19,1],"913":[350,19,1,410,19,1,470,19,1,470,19,2,530,19,1,530,19,2,590,19,1,590,19,2,650,19,1,650,19,2,710,19,1,710,19,2,770,19,1,770,19,2,830,19,1,830,19,2,890,19,1,890,19,2,950,19,1,950,19,2,1010,19,1,1010,19,2,1070,19,1,1070,19,2,1130,19,1,1190,19,1,1250,19,1],"914":[351,19,1,411,19,1,471,19,1,471,19,2,531,19,1,531,19,2,591,19,1,591,19,2,651,19,1,651,19,2,711,19,1,711,19,2,771,19,1,771,19,2,831,19,1,831,19,2,891,19,1,891,19,2,951,19,1,951,19,2,1011,19,1,1011,19,2,1071,19,1,1071,19,2,1131,19,1,1191,19,1,1251,19,1],"1091":[352,19,1,412,19,1,471,19,2,472,19,1,531,19,2,532,19,1,591,19,2,592,19,1,651,19,2,652,19,1,711,19,2,712,19,1,771,19,2,772,19,1,831,19,2,832,19,1,891,19,2,892,19,1,951,19,2,952,19,1,1011,19,2,1012,19,1,1071,19,2,1072,19,1,1132,19,1,1192,19,1,1252,19,1],"1087":[353,19,1,412,19,1,472,19,1,472,19,2,532,19,1,532,19,2,592,19,1,592,19,2,652,19,1,652,19,2,712,19,1,712,19,2,772,19,1,772,19,2,832,19,1,832,19,2,892,19,1,892,19,2,952,19,1,952,19,2,1012,19,1,1012,19,2,1072,19,1,1072,19,2,1132,19,1,1192,19,1,1252,19,1],"859":[353,19,1,413,19,1,473,19,1,473,19,2,533,19,1,533,19,2,593,19,1,593,19,2,653,19,1,653,19,2,713,19,1,713,19,2,773,19,1,773,19,2,833,19,1,833,19,2,893,19,1,893,19,2,953,19,1,953,19,2,1013,19,1,1013,19,2,1073,19,1,1073,19,2,1133,19,1,1193,19,1,1253,19,1],"861":[354,19,1,414,19,1,473,19,2,474,19,1,533,19,2,534,19,1,593,19,2,594,19,1,653,19,2,654,19,1,713,19,2,714,19,1,773,19,2,774,19,1,833,19,2,834,19,1,893,19,2,894,19,1,953,19,2,954,19,1,1013,19,2,1014,19,1,1073,19,2,1074,19,1,1134,19,1,1194,19,1,1254,19,1],"925":[355,19,1,414,19,1,474,19,1,474,19,2,534,19,1,534,19,2,594,19,1,594,19,2,654,19,1,654,19,2,714,19,1,714,19,2,774,19,1,774,19,2,834,19,1,834,19,2,894,19,1,894,19,2,954,19,1,954,19,2,1014,19,1,1014,19,2,1074,19,1,1074,19,2,1134,19,1,1194,19,1,1254,19,1],"926":[355,19,1,415,19,1,475,19,1,475,19,2,535,19,1,535,19,2,595,19,1,595,19,2,655,19,1,655,19,2,715,19,1,715,19,2,775,19,1,775,19,2,835,19,1,835,19,2,895,19,1,895,19,2,955,19,1,955,19,2,1015,19,1,1015,19,2,1075,19,1,1075,19,2,1135,19,1,1195,19,1,1255,19,1],"1135":[360,19,1,419,19,1,479,19,1,479,19,2,539,19,1,539,19,2,599,19,1,599,19,2,659,19,1,659,19,2,719,19,1,719,19,2,779,19,1,779,19,2,839,19,1,839,19,2,899,19,1,899,19,2,959,19,1,959,19,2,1019,19,1,1019,19,2,1079,19,1,1079,19,2,1139,19,1,1199,19,1],"lcw0":[359,16,1,361,19,1,419,16,1,420,19,1,479,16,1,480,19,1,480,19,2,482,16,2,539,16,1,540,19,1,540,19,2,542,16,2,599,16,1,600,19,1,600,19,2,602,16,2,659,16,1,660,19,1,660,19,2,662,16,2,719,16,1,720,19,1,720,19,2,722,16,2,779,16,1,780,19,1,780,19,2,782,16,2,839,16,1,840,19,1,840,19,2,842,16,2,899,16,1,900,19,1,900,19,2,902,16,2,959,16,1,960,19,1,960,19,2,962,16,2,1019,16,1,1020,19,1,1020,19,2,1022,16,2,1079,16,1,1080,19,1,1080,19,2,1082,16,2,1139,16,1,1140,19,1,1199,16,1,1200,19,1],"528":[361,16,1,361,19,1,421,16,1,421,19,1,481,16,1,481,19,1,481,19,2,483,16,2,541,16,1,541,19,1,541,19,2,543,16,2,601,16,1,601,19,1,601,19,2,603,16,2,661,16,1,661,19,1,661,19,2,663,16,2,721,16,1,721,19,1,721,19,2,723,16,2,781,16,1,781,19,1,781,19,2,783,16,2,841,16,1,841,19,1,841,19,2,843,16,2,901,16,1,901,19,1,901,19,2,903,16,2,961,16,1,961,19,1,961,19,2,963,16,2,1021,16,1,1021,19,1,1021,19,2,1023,16,2,1081,16,1,1081,19,1,1081,19,2,1083,16,2,1141,16,1,1141,19,1,1201,16,1,1201,19,1],"66":[342,13,1,347,2,1,402,13,1,407,2,1,462,13,1,462,13,2,467,2,1,522,13,1,522,13,2,527,2,1,552,13,1,582,13,1,582,13,2,587,2,1,612,13,1,642,13,1,642,13,2,647,2,1,672,13,1,702,13,1,702,13,2,707,2,1,732,13,1,762,13,1,762,13,2,767,2,1,792,13,1,822,13,1,822,13,2,827,2,1,852,13,1,882,13,1,882,13,2,887,2,1,912,13,1,942,13,1,942,13,2,947,2,1,972,13,1,1002,13,1,1002,13,2,1007,2,1,1062,13,1,1062,13,2,1067,2,1,1122,13,1,1127,2,1,1182,13,1,1187,2,1,1242,13,1],"1327":[342,13,1,347,2,1,402,13,1,407,2,1,462,13,1,462,13,2,467,2,1,522,13,1,522,13,2,527,2,1,552,13,1,582,13,1,582,13,2,587,2,1,612,13,1,642,13,1,642,13,2,647,2,1,672,13,1,702,13,1,702,13,2,707,2,1,732,13,1,762,13,1,762,13,2,767,2,1,792,13,1,822,13,1,822,13,2,827,2,1,852,13,1,882,13,1,882,13,2,887,2,1,912,13,1,942,13,1,942,13,2,947,2,1,972,13,1,1002,13,1,1002,13,2,1007,2,1,1062,13,1,1062,13,2,1067,2,1,1122,13,1,1127,2,1,1182,13,1,1187,2,1,1242,13,1],"1367":[344,13,1,404,13,1,464,13,1,464,13,2,524,13,1,524,13,2,554,13,1,584,13,1,584,13,2,614,13,1,644,13,1,644,13,2,674,13,1,704,13,1,704,13,2,734,13,1,764,13,1,764,13,2,794,13,1,824,13,1,824,13,2,854,13,1,884,13,1,884,13,2,914,13,1,944,13,1,944,13,2,974,13,1,1004,13,1,1004,13,2,1064,13,1,1064,13,2,1124,13,1,1184,13,1,1244,13,1],"539":[344,13,1,404,13,1,464,13,1,464,13,2,524,13,1,524,13,2,554,13,1,584,13,1,584,13,2,614,13,1,644,13,1,644,13,2,674,13,1,704,13,1,704,13,2,734,13,1,764,13,1,764,13,2,794,13,1,824,13,1,824,13,2,854,13,1,884,13,1,884,13,2,914,13,1,944,13,1,944,13,2,974,13,1,1004,13,1,1004,13,2,1064,13,1,1064,13,2,1124,13,1,1184,13,1,1244,13,1],"1153":[347,13,1,407,13,1,467,13,1,467,13,2,527,13,1,527,13,2,557,13,1,587,13,1,587,13,2,617,13,1,647,13,1,647,13,2,677,13,1,707,13,1,707,13,2,737,13,1,767,13,1,767,13,2,797,13,1,827,13,1,827,13,2,857,13,1,887,13,1,887,13,2,917,13,1,947,13,1,947,13,2,977,13,1,1007,13,1,1007,13,2,1067,13,1,1067,13,2,1127,13,1,1187,13,1,1247,13,1],"1230":[348,13,1,408,13,1,468,13,1,468,13,2,528,13,1,528,13,2,558,13,1,588,13,1,588,13,2,618,13,1,648,13,1,648,13,2,678,13,1,708,13,1,708,13,2,738,13,1,768,13,1,768,13,2,798,13,1,828,13,1,828,13,2,858,13,1,888,13,1,888,13,2,918,13,1,948,13,1,948,13,2,978,13,1,1008,13,1,1008,13,2,1068,13,1,1068,13,2,1128,13,1,1188,13,1,1248,13,1],"1155":[348,13,1,408,13,1,468,13,1,468,13,2,528,13,1,528,13,2,558,13,1,588,13,1,588,13,2,618,13,1,648,13,1,648,13,2,678,13,1,708,13,1,708,13,2,738,13,1,768,13,1,768,13,2,798,13,1,828,13,1,828,13,2,858,13,1,888,13,1,888,13,2,918,13,1,948,13,1,948,13,2,978,13,1,1008,13,1,1008,13,2,1068,13,1,1068,13,2,1128,13,1,1188,13,1,1248,13,1],"1154":[348,13,1,409,13,1,468,13,2,469,13,1,528,13,2,529,13,1,558,13,1,588,13,2,589,13,1,618,13,1,648,13,2,649,13,1,678,13,1,708,13,2,709,13,1,738,13,1,768,13,2,769,13,1,798,13,1,828,13,2,829,13,1,858,13,1,888,13,2,889,13,1,918,13,1,948,13,2,949,13,1,978,13,1,1008,13,2,1009,13,1,1068,13,2,1069,13,1,1129,13,1,1189,13,1,1249,13,1],"1231":[349,13,1,410,13,1,469,13,2,470,13,1,529,13,2,530,13,1,559,13,1,589,13,2,590,13,1,619,13,1,649,13,2,650,13,1,679,13,1,709,13,2,710,13,1,739,13,1,769,13,2,770,13,1,799,13,1,829,13,2,830,13,1,859,13,1,889,13,2,890,13,1,919,13,1,949,13,2,950,13,1,979,13,1,1009,13,2,1010,13,1,1069,13,2,1070,13,1,1130,13,1,1190,13,1,1250,13,1],"17":[352,13,1,385,13,1,412,13,1,445,13,1,472,13,1,472,13,2,505,13,1,505,13,2,532,13,1,532,13,2,535,13,1,562,13,1,565,13,1,565,13,2,592,13,1,592,13,2,595,13,1,622,13,1,625,13,1,625,13,2,652,13,1,652,13,2,655,13,1,682,13,1,685,13,1,685,13,2,712,13,1,712,13,2,715,13,1,742,13,1,745,13,1,745,13,2,772,13,1,772,13,2,775,13,1,802,13,1,805,13,1,805,13,2,832,13,1,832,13,2,835,13,1,862,13,1,865,13,1,865,13,2,892,13,1,892,13,2,895,13,1,922,13,1,925,13,1,925,13,2,952,13,1,952,13,2,955,13,1,982,13,1,985,13,1,985,13,2,1012,13,1,1012,13,2,1045,13,1,1045,13,2,1072,13,1,1072,13,2,1105,13,1,1132,13,1,1165,13,1,1192,13,1,1225,13,1,1252,13,1],"540":[353,13,1,414,13,1,473,13,2,474,13,1,533,13,2,534,13,1,563,13,1,593,13,2,594,13,1,623,13,1,653,13,2,654,13,1,683,13,1,713,13,2,714,13,1,743,13,1,773,13,2,774,13,1,803,13,1,833,13,2,834,13,1,863,13,1,893,13,2,894,13,1,923,13,1,953,13,2,954,13,1,983,13,1,1013,13,2,1014,13,1,1073,13,2,1074,13,1,1134,13,1,1194,13,1],"1157":[354,13,1,415,13,1,474,13,2,475,13,1,534,13,2,535,13,1,564,13,1,594,13,2,595,13,1,624,13,1,654,13,2,655,13,1,684,13,1,714,13,2,715,13,1,744,13,1,774,13,2,775,13,1,804,13,1,834,13,2,835,13,1,864,13,1,894,13,2,895,13,1,924,13,1,954,13,2,955,13,1,984,13,1,1014,13,2,1015,13,1,1074,13,2,1075,13,1,1135,13,1,1195,13,1],"1158":[355,13,1,415,13,1,475,13,1,475,13,2,535,13,1,535,13,2,565,13,1,595,13,1,595,13,2,625,13,1,655,13,1,655,13,2,685,13,1,715,13,1,715,13,2,745,13,1,775,13,1,775,13,2,805,13,1,835,13,1,835,13,2,865,13,1,895,13,1,895,13,2,925,13,1,955,13,1,955,13,2,985,13,1,1015,13,1,1015,13,2,1075,13,1,1075,13,2,1135,13,1,1195,13,1],"1029":[356,13,1,417,13,1,476,13,2,477,13,1,536,13,2,537,13,1,566,13,1,596,13,2,597,13,1,626,13,1,656,13,2,657,13,1,686,13,1,716,13,2,717,13,1,746,13,1,776,13,2,777,13,1,806,13,1,836,13,2,837,13,1,866,13,1,896,13,2,897,13,1,926,13,1,956,13,2,957,13,1,986,13,1,1016,13,2,1017,13,1,1076,13,2,1077,13,1,1137,13,1,1197,13,1],"586":[358,13,1,418,13,1,478,13,1,478,13,2,538,13,1,538,13,2,568,13,1,598,13,1,598,13,2,628,13,1,658,13,1,658,13,2,688,13,1,718,13,1,718,13,2,748,13,1,778,13,1,778,13,2,808,13,1,838,13,1,838,13,2,868,13,1,898,13,1,898,13,2,928,13,1,958,13,1,958,13,2,988,13,1,1018,13,1,1018,13,2,1078,13,1,1078,13,2,1138,13,1,1198,13,1],"541":[359,13,1,419,13,1,479,13,1,479,13,2,539,13,1,539,13,2,568,13,1,599,13,1,599,13,2,628,13,1,659,13,1,659,13,2,688,13,1,719,13,1,719,13,2,748,13,1,779,13,1,779,13,2,808,13,1,839,13,1,839,13,2,868,13,1,899,13,1,899,13,2,928,13,1,959,13,1,959,13,2,988,13,1,1019,13,1,1019,13,2,1079,13,1,1079,13,2,1139,13,1,1199,13,1],"central-bay-H":[365,13,1,375,7,1,425,13,1,435,7,1,485,13,1,485,13,2,495,7,1,495,7,2,525,7,1,545,13,1,545,13,2,555,7,1,555,7,2,575,13,1,585,7,1,605,13,1,605,13,2,615,7,1,615,7,2,635,13,1,645,7,1,665,13,1,665,13,2,675,7,1,675,7,2,695,13,1,705,7,1,725,13,1,725,13,2,735,7,1,735,7,2,755,13,1,765,7,1,785,13,1,785,13,2,795,7,1,795,7,2,815,13,1,825,7,1,845,13,1,845,13,2,855,7,1,855,7,2,875,13,1,885,7,1,905,13,1,905,13,2,915,7,1,915,7,2,935,13,1,945,7,1,965,13,1,965,13,2,975,7,1,975,7,2,995,13,1,1025,13,1,1025,13,2,1035,7,1,1035,7,2,1085,13,1,1085,13,2,1095,7,1,1145,13,1,1155,7,1,1205,13,1,1215,7,1],"central-bay-A":[365,7,1,375,13,1,425,7,1,435,13,1,485,7,1,485,7,2,495,13,1,495,13,2,525,13,1,545,7,1,545,7,2,555,13,1,555,13,2,575,7,1,585,13,1,605,7,1,605,7,2,615,13,1,615,13,2,635,7,1,645,13,1,665,7,1,665,7,2,675,13,1,675,13,2,695,7,1,705,13,1,725,7,1,725,7,2,735,13,1,735,13,2,755,7,1,765,13,1,785,7,1,785,7,2,795,13,1,795,13,2,815,7,1,825,13,1,845,7,1,845,7,2,855,13,1,855,13,2,875,7,1,885,13,1,905,7,1,905,7,2,915,13,1,915,13,2,935,7,1,945,13,1,965,7,1,965,7,2,975,13,1,975,13,2,995,7,1,1025,7,1,1025,7,2,1035,13,1,1035,13,2,1085,7,1,1085,7,2,1095,13,1,1145,7,1,1155,13,1,1205,7,1,1215,13,1],"1222":[380,13,1,440,13,1,500,13,1,501,13,2,530,13,1,560,13,1,561,13,2,590,13,1,620,13,1,621,13,2,650,13,1,680,13,1,681,13,2,710,13,1,740,13,1,741,13,2,770,13,1,800,13,1,801,13,2,830,13,1,860,13,1,861,13,2,890,13,1,920,13,1,921,13,2,950,13,1,980,13,1,981,13,2,1040,13,1,1041,13,2,1100,13,1,1160,13,1,1220,13,1],"1223":[381,13,1,441,13,1,501,13,1,501,13,2,531,13,1,561,13,1,561,13,2,591,13,1,621,13,1,621,13,2,651,13,1,681,13,1,681,13,2,711,13,1,741,13,1,741,13,2,771,13,1,801,13,1,801,13,2,831,13,1,861,13,1,861,13,2,891,13,1,921,13,1,921,13,2,951,13,1,981,13,1,981,13,2,1041,13,1,1041,13,2,1101,13,1,1161,13,1,1221,13,1],"1225":[382,13,1,442,13,1,502,13,1,502,13,2,532,13,1,562,13,1,562,13,2,592,13,1,622,13,1,622,13,2,652,13,1,682,13,1,682,13,2,712,13,1,742,13,1,742,13,2,772,13,1,802,13,1,802,13,2,832,13,1,862,13,1,862,13,2,892,13,1,922,13,1,922,13,2,952,13,1,982,13,1,982,13,2,1042,13,1,1042,13,2,1102,13,1,1162,13,1,1222,13,1],"123462":[383,13,1,443,13,1,503,13,1,503,13,2,533,13,1,563,13,1,563,13,2,593,13,1,623,13,1,623,13,2,653,13,1,683,13,1,683,13,2,713,13,1,743,13,1,743,13,2,773,13,1,803,13,1,803,13,2,833,13,1,863,13,1,863,13,2,893,13,1,923,13,1,923,13,2,953,13,1,983,13,1,983,13,2,1043,13,1,1043,13,2,1103,13,1,1163,13,1,1223,13,1],"yck4":[389,13,1,449,13,1,509,13,1,509,13,2,539,13,1,569,13,1,569,13,2,599,13,1,629,13,1,629,13,2,659,13,1,689,13,1,689,13,2,719,13,1,749,13,1,749,13,2,779,13,1,809,13,1,809,13,2,839,13,1,869,13,1,869,13,2,899,13,1,929,13,1,929,13,2,959,13,1,989,13,1,989,13,2,1049,13,1,1049,13,2,1109,13,1,1169,13,1,1229,13,1],"1228":[390,13,1,450,13,1,510,13,1,510,13,2,540,13,1,570,13,1,570,13,2,600,13,1,630,13,1,630,13,2,660,13,1,690,13,1,690,13,2,720,13,1,750,13,1,750,13,2,780,13,1,810,13,1,810,13,2,840,13,1,870,13,1,870,13,2,900,13,1,930,13,1,930,13,2,960,13,1,990,13,1,990,13,2,1050,13,1,1050,13,2,1110,13,1,1170,13,1,1230,13,1],"1148":[391,13,1,451,13,1,511,13,1,511,13,2,541,13,1,571,13,1,571,13,2,601,13,1,631,13,1,631,13,2,661,13,1,691,13,1,691,13,2,721,13,1,751,13,1,751,13,2,781,13,1,811,13,1,811,13,2,841,13,1,871,13,1,871,13,2,901,13,1,931,13,1,931,13,2,961,13,1,991,13,1,991,13,2,1051,13,1,1051,13,2,1111,13,1,1171,13,1,1231,13,1],"1150":[392,13,1,452,13,1,512,13,1,512,13,2,542,13,1,572,13,1,572,13,2,602,13,1,632,13,1,632,13,2,662,13,1,692,13,1,692,13,2,722,13,1,752,13,1,752,13,2,782,13,1,812,13,1,812,13,2,842,13,1,872,13,1,872,13,2,902,13,1,932,13,1,932,13,2,962,13,1,992,13,1,992,13,2,1052,13,1,1052,13,2,1112,13,1,1172,13,1,1232,13,1],"1229":[393,13,1,453,13,1,513,13,1,513,13,2,543,13,1,573,13,1,573,13,2,603,13,1,633,13,1,633,13,2,663,13,1,693,13,1,693,13,2,723,13,1,753,13,1,753,13,2,783,13,1,813,13,1,813,13,2,843,13,1,873,13,1,873,13,2,903,13,1,933,13,1,933,13,2,963,13,1,993,13,1,993,13,2,1053,13,1,1053,13,2,1113,13,1,1173,13,1,1233,13,1],"1152":[394,13,1,454,13,1,514,13,1,515,13,2,544,13,1,574,13,1,575,13,2,604,13,1,634,13,1,635,13,2,664,13,1,694,13,1,695,13,2,724,13,1,754,13,1,755,13,2,784,13,1,814,13,1,815,13,2,844,13,1,874,13,1,875,13,2,904,13,1,934,13,1,935,13,2,964,13,1,994,13,1,995,13,2,1054,13,1,1055,13,2,1114,13,1,1174,13,1,1234,13,1],"1151":[401,13,1,461,13,1,521,13,1,521,13,2,551,13,1,581,13,1,581,13,2,611,13,1,641,13,1,641,13,2,671,13,1,701,13,1,701,13,2,731,13,1,761,13,1,761,13,2,791,13,1,821,13,1,821,13,2,851,13,1,881,13,1,881,13,2,911,13,1,941,13,1,941,13,2,971,13,1,1001,13,1,1001,13,2,1061,13,1,1061,13,2,1121,13,1,1181,13,1,1241,13,1],"1241":[337,7,1,397,7,1,457,7,1,457,7,2,517,7,1,517,7,2,547,7,1,577,7,1,577,7,2,607,7,1,637,7,1,637,7,2,667,7,1,697,7,1,697,7,2,727,7,1,757,7,1,757,7,2,787,7,1,817,7,1,817,7,2,847,7,1,877,7,1,877,7,2,907,7,1,937,7,1,937,7,2,967,7,1,997,7,1,997,7,2,1057,7,1,1057,7,2,1117,7,1,1177,7,1],"1172":[338,7,1,398,7,1,458,7,1,458,7,2,518,7,1,518,7,2,548,7,1,578,7,1,578,7,2,608,7,1,638,7,1,638,7,2,668,7,1,698,7,1,698,7,2,728,7,1,758,7,1,758,7,2,788,7,1,818,7,1,818,7,2,848,7,1,878,7,1,878,7,2,908,7,1,938,7,1,938,7,2,968,7,1,998,7,1,998,7,2,1058,7,1,1058,7,2,1118,7,1,1178,7,1],"1243":[340,7,1,400,7,1,460,7,1,460,7,2,520,7,1,520,7,2,550,7,1,580,7,1,580,7,2,610,7,1,640,7,1,640,7,2,670,7,1,700,7,1,700,7,2,730,7,1,760,7,1,760,7,2,790,7,1,820,7,1,820,7,2,850,7,1,880,7,1,880,7,2,910,7,1,940,7,1,940,7,2,970,7,1,1000,7,1,1000,7,2,1060,7,1,1060,7,2,1120,7,1,1180,7,1],"549":[341,7,1,401,7,1,461,7,1,461,7,2,521,7,1,521,7,2,551,7,1,581,7,1,581,7,2,611,7,1,641,7,1,641,7,2,671,7,1,701,7,1,701,7,2,731,7,1,761,7,1,761,7,2,791,7,1,821,7,1,821,7,2,851,7,1,881,7,1,881,7,2,911,7,1,941,7,1,941,7,2,971,7,1,1001,7,1,1001,7,2,1061,7,1,1061,7,2,1121,7,1,1181,7,1],"932":[343,7,1,403,7,1,463,7,1,463,7,2,523,7,1,523,7,2,553,7,1,583,7,1,583,7,2,613,7,1,643,7,1,643,7,2,673,7,1,703,7,1,703,7,2,733,7,1,763,7,1,763,7,2,793,7,1,823,7,1,823,7,2,853,7,1,883,7,1,883,7,2,913,7,1,943,7,1,943,7,2,973,7,1,1003,7,1,1003,7,2,1063,7,1,1063,7,2,1123,7,1,1183,7,1],"934":[344,7,1,404,7,1,464,7,1,464,7,2,524,7,1,524,7,2,554,7,1,584,7,1,584,7,2,614,7,1,644,7,1,644,7,2,674,7,1,704,7,1,704,7,2,734,7,1,764,7,1,764,7,2,794,7,1,824,7,1,824,7,2,854,7,1,884,7,1,884,7,2,914,7,1,944,7,1,944,7,2,974,7,1,1004,7,1,1004,7,2,1064,7,1,1064,7,2,1124,7,1,1184,7,1],"933":[345,7,1,405,7,1,465,7,1,465,7,2,525,7,1,525,7,2,555,7,1,585,7,1,585,7,2,615,7,1,645,7,1,645,7,2,675,7,1,705,7,1,705,7,2,735,7,1,765,7,1,765,7,2,795,7,1,825,7,1,825,7,2,855,7,1,885,7,1,885,7,2,915,7,1,945,7,1,945,7,2,975,7,1,1005,7,1,1005,7,2,1065,7,1,1065,7,2,1125,7,1,1185,7,1],"897":[346,7,1,406,7,1,466,7,1,466,7,2,526,7,1,526,7,2,556,7,1,586,7,1,586,7,2,616,7,1,646,7,1,646,7,2,676,7,1,706,7,1,706,7,2,736,7,1,766,7,1,766,7,2,796,7,1,826,7,1,826,7,2,856,7,1,886,7,1,886,7,2,916,7,1,946,7,1,946,7,2,976,7,1,1006,7,1,1006,7,2,1066,7,1,1066,7,2,1126,7,1,1186,7,1],"896":[346,7,1,406,7,1,466,7,1,466,7,2,526,7,1,526,7,2,556,7,1,586,7,1,586,7,2,616,7,1,646,7,1,646,7,2,676,7,1,706,7,1,706,7,2,736,7,1,766,7,1,766,7,2,796,7,1,826,7,1,826,7,2,856,7,1,886,7,1,886,7,2,916,7,1,946,7,1,946,7,2,976,7,1,1006,7,1,1006,7,2,1066,7,1,1066,7,2,1126,7,1,1186,7,1],"919":[347,7,1,407,7,1,467,7,1,467,7,2,527,7,1,527,7,2,557,7,1,587,7,1,587,7,2,617,7,1,647,7,1,647,7,2,677,7,1,707,7,1,707,7,2,737,7,1,767,7,1,767,7,2,797,7,1,827,7,1,827,7,2,857,7,1,887,7,1,887,7,2,917,7,1,947,7,1,947,7,2,977,7,1,1007,7,1,1007,7,2,1067,7,1,1067,7,2,1127,7,1,1187,7,1],"935":[348,7,1,408,7,1,468,7,1,468,7,2,528,7,1,528,7,2,558,7,1,588,7,1,588,7,2,618,7,1,648,7,1,648,7,2,678,7,1,708,7,1,708,7,2,738,7,1,768,7,1,768,7,2,798,7,1,828,7,1,828,7,2,858,7,1,888,7,1,888,7,2,918,7,1,948,7,1,948,7,2,978,7,1,1008,7,1,1008,7,2,1068,7,1,1068,7,2,1128,7,1,1188,7,1],"1174":[349,7,1,409,7,1,469,7,1,469,7,2,529,7,1,529,7,2,559,7,1,589,7,1,589,7,2,619,7,1,649,7,1,649,7,2,679,7,1,709,7,1,709,7,2,739,7,1,769,7,1,769,7,2,799,7,1,829,7,1,829,7,2,859,7,1,889,7,1,889,7,2,919,7,1,949,7,1,949,7,2,979,7,1,1009,7,1,1009,7,2,1069,7,1,1069,7,2,1129,7,1,1189,7,1],"86":[350,7,1,385,7,1,410,7,1,445,7,1,470,7,1,470,7,2,505,7,1,505,7,2,530,7,1,530,7,2,535,7,1,560,7,1,565,7,1,565,7,2,590,7,1,590,7,2,595,7,1,620,7,1,625,7,1,625,7,2,650,7,1,650,7,2,655,7,1,680,7,1,685,7,1,685,7,2,710,7,1,710,7,2,715,7,1,740,7,1,745,7,1,745,7,2,770,7,1,770,7,2,775,7,1,800,7,1,805,7,1,805,7,2,830,7,1,830,7,2,835,7,1,860,7,1,865,7,1,865,7,2,890,7,1,890,7,2,895,7,1,920,7,1,925,7,1,925,7,2,950,7,1,950,7,2,955,7,1,980,7,1,985,7,1,985,7,2,1010,7,1,1010,7,2,1045,7,1,1045,7,2,1070,7,1,1070,7,2,1105,7,1,1130,7,1,1165,7,1,1190,7,1,1225,7,1],"829":[351,7,1,411,7,1,471,7,1,471,7,2,531,7,1,531,7,2,561,7,1,591,7,1,591,7,2,621,7,1,651,7,1,651,7,2,681,7,1,711,7,1,711,7,2,741,7,1,771,7,1,771,7,2,801,7,1,831,7,1,831,7,2,861,7,1,891,7,1,891,7,2,921,7,1,951,7,1,951,7,2,981,7,1,1011,7,1,1011,7,2,1071,7,1,1071,7,2,1131,7,1,1191,7,1],"834":[353,7,1,413,7,1,473,7,1,473,7,2,533,7,1,533,7,2,563,7,1,593,7,1,593,7,2,623,7,1,653,7,1,653,7,2,683,7,1,713,7,1,713,7,2,743,7,1,773,7,1,773,7,2,803,7,1,833,7,1,833,7,2,863,7,1,893,7,1,893,7,2,923,7,1,953,7,1,953,7,2,983,7,1,1013,7,1,1013,7,2,1073,7,1,1073,7,2,1133,7,1,1193,7,1],"837":[354,7,1,414,7,1,474,7,1,474,7,2,534,7,1,534,7,2,564,7,1,594,7,1,594,7,2,624,7,1,654,7,1,654,7,2,684,7,1,714,7,1,714,7,2,744,7,1,774,7,1,774,7,2,804,7,1,834,7,1,834,7,2,864,7,1,894,7,1,894,7,2,924,7,1,954,7,1,954,7,2,984,7,1,1014,7,1,1014,7,2,1074,7,1,1074,7,2,1134,7,1,1194,7,1],"1244":[356,7,1,416,7,1,476,7,1,476,7,2,536,7,1,536,7,2,566,7,1,596,7,1,596,7,2,626,7,1,656,7,1,656,7,2,686,7,1,716,7,1,716,7,2,746,7,1,776,7,1,776,7,2,806,7,1,836,7,1,836,7,2,866,7,1,896,7,1,896,7,2,926,7,1,956,7,1,956,7,2,986,7,1,1016,7,1,1016,7,2,1076,7,1,1076,7,2,1136,7,1,1196,7,1],"1246":[357,7,1,417,7,1,477,7,1,477,7,2,537,7,1,537,7,2,567,7,1,597,7,1,597,7,2,627,7,1,657,7,1,657,7,2,687,7,1,717,7,1,717,7,2,747,7,1,777,7,1,777,7,2,807,7,1,837,7,1,837,7,2,867,7,1,897,7,1,897,7,2,927,7,1,957,7,1,957,7,2,987,7,1,1017,7,1,1017,7,2,1077,7,1,1077,7,2,1137,7,1,1197,7,1],"844":[358,7,1,418,7,1,478,7,1,478,7,2,538,7,1,538,7,2,568,7,1,598,7,1,598,7,2,628,7,1,658,7,1,658,7,2,688,7,1,718,7,1,718,7,2,748,7,1,778,7,1,778,7,2,808,7,1,838,7,1,838,7,2,868,7,1,898,7,1,898,7,2,928,7,1,958,7,1,958,7,2,988,7,1,1018,7,1,1018,7,2,1078,7,1,1078,7,2,1138,7,1,1198,7,1],"847":[359,7,1,419,7,1,479,7,1,479,7,2,539,7,1,539,7,2,569,7,1,599,7,1,599,7,2,629,7,1,659,7,1,659,7,2,689,7,1,719,7,1,719,7,2,749,7,1,779,7,1,779,7,2,809,7,1,839,7,1,839,7,2,869,7,1,899,7,1,899,7,2,929,7,1,959,7,1,959,7,2,989,7,1,1019,7,1,1019,7,2,1079,7,1,1079,7,2,1139,7,1,1199,7,1],"987673":[360,7,1,420,7,1,480,7,1,480,7,2,540,7,1,540,7,2,600,7,1,600,7,2,660,7,1,660,7,2,720,7,1,720,7,2,780,7,1,780,7,2,840,7,1,840,7,2,900,7,1,900,7,2,960,7,1,960,7,2,1020,7,1,1020,7,2,1080,7,1,1080,7,2,1140,7,1,1200,7,1],"1182":[361,7,1,421,7,1,481,7,1,481,7,2,541,7,1,541,7,2,601,7,1,601,7,2,661,7,1,661,7,2,721,7,1,721,7,2,781,7,1,781,7,2,841,7,1,841,7,2,901,7,1,901,7,2,961,7,1,961,7,2,1021,7,1,1021,7,2,1081,7,1,1081,7,2,1141,7,1,1201,7,1],"1183":[362,7,1,422,7,1,482,7,1,482,7,2,542,7,1,542,7,2,572,7,1,602,7,1,602,7,2,632,7,1,662,7,1,662,7,2,692,7,1,722,7,1,722,7,2,752,7,1,782,7,1,782,7,2,812,7,1,842,7,1,842,7,2,872,7,1,902,7,1,902,7,2,932,7,1,962,7,1,962,7,2,992,7,1,1022,7,1,1022,7,2,1082,7,1,1082,7,2,1142,7,1,1202,7,1],"1164":[378,7,1,438,7,1,498,7,1,498,7,2,528,7,1,558,7,1,558,7,2,571,7,1,588,7,1,618,7,1,618,7,2,631,7,1,648,7,1,678,7,1,678,7,2,691,7,1,708,7,1,738,7,1,738,7,2,751,7,1,768,7,1,798,7,1,798,7,2,811,7,1,828,7,1,858,7,1,858,7,2,871,7,1,888,7,1,918,7,1,918,7,2,931,7,1,948,7,1,978,7,1,978,7,2,991,7,1,1038,7,1,1038,7,2,1098,7,1,1158,7,1,1218,7,1],"866":[378,7,1,438,7,1,498,7,1,498,7,2,528,7,1,558,7,1,558,7,2,588,7,1,618,7,1,618,7,2,648,7,1,678,7,1,678,7,2,708,7,1,738,7,1,738,7,2,768,7,1,798,7,1,798,7,2,828,7,1,858,7,1,858,7,2,888,7,1,918,7,1,918,7,2,948,7,1,978,7,1,978,7,2,1038,7,1,1038,7,2,1098,7,1,1158,7,1,1218,7,1],"1179":[379,7,1,439,7,1,499,7,1,499,7,2,529,7,1,559,7,1,559,7,2,569,7,1,589,7,1,619,7,1,619,7,2,629,7,1,649,7,1,679,7,1,679,7,2,689,7,1,709,7,1,739,7,1,739,7,2,749,7,1,769,7,1,799,7,1,799,7,2,809,7,1,829,7,1,859,7,1,859,7,2,869,7,1,889,7,1,919,7,1,919,7,2,929,7,1,949,7,1,979,7,1,979,7,2,989,7,1,1039,7,1,1039,7,2,1099,7,1,1159,7,1,1219,7,1],"871":[380,7,1,440,7,1,500,7,1,500,7,2,530,7,1,560,7,1,560,7,2,590,7,1,620,7,1,620,7,2,650,7,1,680,7,1,680,7,2,710,7,1,740,7,1,740,7,2,770,7,1,800,7,1,800,7,2,830,7,1,860,7,1,860,7,2,890,7,1,920,7,1,920,7,2,950,7,1,980,7,1,980,7,2,1040,7,1,1040,7,2,1100,7,1,1160,7,1,1220,7,1],"874":[380,7,1,440,7,1,500,7,1,500,7,2,530,7,1,560,7,1,560,7,2,590,7,1,620,7,1,620,7,2,650,7,1,680,7,1,680,7,2,710,7,1,740,7,1,740,7,2,770,7,1,800,7,1,800,7,2,830,7,1,860,7,1,860,7,2,890,7,1,920,7,1,920,7,2,950,7,1,980,7,1,980,7,2,1040,7,1,1040,7,2,1100,7,1,1160,7,1,1220,7,1],"sdea":[381,7,1,441,7,1,501,7,1,501,7,2,531,7,1,561,7,1,561,7,2,591,7,1,621,7,1,621,7,2,651,7,1,681,7,1,681,7,2,711,7,1,741,7,1,741,7,2,771,7,1,801,7,1,801,7,2,831,7,1,861,7,1,861,7,2,891,7,1,921,7,1,921,7,2,951,7,1,981,7,1,981,7,2,1041,7,1,1041,7,2,1101,7,1,1161,7,1,1221,7,1],"876":[381,7,1,441,7,1,501,7,1,501,7,2,531,7,1,561,7,1,561,7,2,591,7,1,621,7,1,621,7,2,651,7,1,681,7,1,681,7,2,711,7,1,741,7,1,741,7,2,771,7,1,801,7,1,801,7,2,831,7,1,861,7,1,861,7,2,891,7,1,921,7,1,921,7,2,951,7,1,981,7,1,981,7,2,1041,7,1,1041,7,2,1101,7,1,1161,7,1,1221,7,1],"880":[382,7,1,442,7,1,502,7,1,502,7,2,532,7,1,562,7,1,562,7,2,592,7,1,622,7,1,622,7,2,652,7,1,682,7,1,682,7,2,712,7,1,742,7,1,742,7,2,772,7,1,802,7,1,802,7,2,832,7,1,862,7,1,862,7,2,892,7,1,922,7,1,922,7,2,952,7,1,982,7,1,982,7,2,1042,7,1,1042,7,2,1102,7,1,1162,7,1,1222,7,1],"882":[382,7,1,442,7,1,502,7,1,502,7,2,532,7,1,562,7,1,562,7,2,592,7,1,622,7,1,622,7,2,652,7,1,682,7,1,682,7,2,712,7,1,742,7,1,742,7,2,772,7,1,802,7,1,802,7,2,832,7,1,862,7,1,862,7,2,892,7,1,922,7,1,922,7,2,952,7,1,982,7,1,982,7,2,1042,7,1,1042,7,2,1102,7,1,1162,7,1,1222,7,1],"556":[383,7,1,443,7,1,503,7,1,503,7,2,533,7,1,563,7,1,563,7,2,593,7,1,623,7,1,623,7,2,653,7,1,683,7,1,683,7,2,713,7,1,743,7,1,743,7,2,773,7,1,803,7,1,803,7,2,833,7,1,863,7,1,863,7,2,893,7,1,923,7,1,923,7,2,953,7,1,983,7,1,983,7,2,1043,7,1,1043,7,2,1103,7,1,1163,7,1,1223,7,1],"885":[384,7,1,444,7,1,504,7,1,504,7,2,534,7,1,564,7,1,564,7,2,594,7,1,624,7,1,624,7,2,654,7,1,684,7,1,684,7,2,714,7,1,744,7,1,744,7,2,774,7,1,804,7,1,804,7,2,834,7,1,864,7,1,864,7,2,894,7,1,924,7,1,924,7,2,954,7,1,984,7,1,984,7,2,1044,7,1,1044,7,2,1104,7,1,1164,7,1,1224,7,1],"1237":[386,7,1,446,7,1,506,7,1,506,7,2,536,7,1,566,7,1,566,7,2,596,7,1,626,7,1,626,7,2,656,7,1,686,7,1,686,7,2,716,7,1,746,7,1,746,7,2,776,7,1,806,7,1,806,7,2,836,7,1,866,7,1,866,7,2,896,7,1,926,7,1,926,7,2,956,7,1,986,7,1,986,7,2,1046,7,1,1046,7,2,1106,7,1,1166,7,1,1226,7,1],"613":[387,7,1,447,7,1,507,7,1,507,7,2,537,7,1,567,7,1,567,7,2,597,7,1,627,7,1,627,7,2,657,7,1,687,7,1,687,7,2,717,7,1,747,7,1,747,7,2,777,7,1,807,7,1,807,7,2,837,7,1,867,7,1,867,7,2,897,7,1,927,7,1,927,7,2,957,7,1,987,7,1,987,7,2,1047,7,1,1047,7,2,1107,7,1,1167,7,1,1227,7,1],"614":[388,7,1,448,7,1,508,7,1,508,7,2,538,7,1,568,7,1,568,7,2,598,7,1,628,7,1,628,7,2,658,7,1,688,7,1,688,7,2,718,7,1,748,7,1,748,7,2,778,7,1,808,7,1,808,7,2,838,7,1,868,7,1,868,7,2,898,7,1,928,7,1,928,7,2,958,7,1,988,7,1,988,7,2,1048,7,1,1048,7,2,1108,7,1,1168,7,1,1228,7,1],"987672":[388,7,1,448,7,1,508,7,1,508,7,2,538,7,1,568,7,1,568,7,2,598,7,1,628,7,1,628,7,2,658,7,1,688,7,1,688,7,2,718,7,1,748,7,1,748,7,2,778,7,1,808,7,1,808,7,2,838,7,1,868,7,1,868,7,2,898,7,1,928,7,1,928,7,2,958,7,1,988,7,1,988,7,2,1048,7,1,1048,7,2,1108,7,1,1168,7,1,1228,7,1],"1239":[389,7,1,449,7,1,509,7,1,509,7,2,539,7,1,569,7,1,569,7,2,599,7,1,629,7,1,629,7,2,659,7,1,689,7,1,689,7,2,719,7,1,749,7,1,749,7,2,779,7,1,809,7,1,809,7,2,839,7,1,869,7,1,869,7,2,899,7,1,929,7,1,929,7,2,959,7,1,989,7,1,989,7,2,1049,7,1,1049,7,2,1109,7,1,1169,7,1,1229,7,1],"1168":[389,7,1,449,7,1,509,7,1,509,7,2,539,7,1,569,7,1,569,7,2,599,7,1,629,7,1,629,7,2,659,7,1,689,7,1,689,7,2,719,7,1,749,7,1,749,7,2,779,7,1,809,7,1,809,7,2,839,7,1,869,7,1,869,7,2,899,7,1,929,7,1,929,7,2,959,7,1,989,7,1,989,7,2,1049,7,1,1049,7,2,1109,7,1,1169,7,1,1229,7,1],"1240":[391,7,1,451,7,1,511,7,1,511,7,2,541,7,1,571,7,1,571,7,2,601,7,1,631,7,1,631,7,2,661,7,1,691,7,1,691,7,2,721,7,1,751,7,1,751,7,2,781,7,1,811,7,1,811,7,2,841,7,1,871,7,1,871,7,2,901,7,1,931,7,1,931,7,2,961,7,1,991,7,1,991,7,2,1051,7,1,1051,7,2,1111,7,1,1171,7,1,1231,7,1],"1170":[393,7,1,453,7,1,513,7,1,513,7,2,543,7,1,573,7,1,573,7,2,603,7,1,633,7,1,633,7,2,663,7,1,693,7,1,693,7,2,723,7,1,753,7,1,753,7,2,783,7,1,813,7,1,813,7,2,843,7,1,873,7,1,873,7,2,903,7,1,933,7,1,933,7,2,963,7,1,993,7,1,993,7,2,1053,7,1,1053,7,2,1113,7,1,1173,7,1,1233,7,1],"108":[330,14,1,390,14,1,450,14,1,452,14,2,510,14,1,512,14,2,570,14,1,572,14,2,630,14,1,632,14,2,690,14,1,692,14,2,750,14,1,752,14,2,810,14,1,812,14,2,870,14,1,872,14,2,930,14,1,932,14,2,990,14,1,992,14,2,1050,14,1,1052,14,2,1110,14,1,1170,14,1,1230,14,1],"987674":[331,14,1,391,14,1,451,14,1,453,14,2,511,14,1,513,14,2,571,14,1,573,14,2,631,14,1,633,14,2,691,14,1,693,14,2,751,14,1,753,14,2,811,14,1,813,14,2,871,14,1,873,14,2,931,14,1,933,14,2,991,14,1,993,14,2,1051,14,1,1053,14,2,1111,14,1,1171,14,1,1231,14,1],"1334":[333,14,1,393,14,1,453,14,1,455,14,2,513,14,1,515,14,2,573,14,1,575,14,2,633,14,1,635,14,2,693,14,1,695,14,2,753,14,1,755,14,2,813,14,1,815,14,2,873,14,1,875,14,2,933,14,1,935,14,2,993,14,1,995,14,2,1053,14,1,1055,14,2,1113,14,1,1173,14,1,1233,14,1],"138":[335,14,1,395,14,1,455,14,1,457,14,2,515,14,1,516,14,2,575,14,1,576,14,2,635,14,1,636,14,2,695,14,1,696,14,2,755,14,1,756,14,2,815,14,1,816,14,2,875,14,1,876,14,2,935,14,1,936,14,2,995,14,1,996,14,2,1055,14,1,1056,14,2,1115,14,1,1175,14,1,1235,14,1],"139":[337,14,1,397,14,1,457,14,1,457,14,2,517,14,1,517,14,2,577,14,1,577,14,2,637,14,1,637,14,2,697,14,1,697,14,2,757,14,1,757,14,2,817,14,1,817,14,2,877,14,1,877,14,2,937,14,1,937,14,2,997,14,1,997,14,2,1057,14,1,1057,14,2,1117,14,1,1177,14,1,1237,14,1],"104":[336,15,1,396,15,1,455,15,2,456,15,1,515,15,2,516,15,1,575,15,2,576,15,1,635,15,2,636,15,1,695,15,2,696,15,1,755,15,2,756,15,1,815,15,2,816,15,1,875,15,2,876,15,1,935,15,2,936,15,1,995,15,2,996,15,1,1055,15,2,1056,15,1,1116,15,1,1176,15,1,1236,15,1],"1344":[340,15,1,400,15,1,460,15,1,460,15,2,520,15,1,520,15,2,580,15,1,580,15,2,640,15,1,640,15,2,700,15,1,700,15,2,760,15,1,760,15,2,820,15,1,820,15,2,880,15,1,880,15,2,940,15,1,940,15,2,1000,15,1,1000,15,2,1060,15,1,1060,15,2,1120,15,1,1180,15,1,1240,15,1],"1324":[342,15,1,401,15,1,461,15,1,461,15,2,521,15,1,521,15,2,581,15,1,581,15,2,641,15,1,641,15,2,701,15,1,701,15,2,761,15,1,761,15,2,821,15,1,821,15,2,881,15,1,881,15,2,941,15,1,941,15,2,1001,15,1,1001,15,2,1061,15,1,1061,15,2,1121,15,1,1181,15,1,1241,15,1],"1291":[343,15,1,403,15,1,463,15,1,463,15,2,523,15,1,523,15,2,583,15,1,583,15,2,643,15,1,643,15,2,703,15,1,703,15,2,763,15,1,763,15,2,823,15,1,823,15,2,883,15,1,883,15,2,943,15,1,943,15,2,1003,15,1,1003,15,2,1063,15,1,1063,15,2,1123,15,1,1183,15,1,1243,15,1],"1292":[344,15,1,405,15,1,464,15,2,465,15,1,524,15,2,525,15,1,584,15,2,585,15,1,644,15,2,645,15,1,704,15,2,705,15,1,764,15,2,765,15,1,824,15,2,825,15,1,884,15,2,885,15,1,944,15,2,945,15,1,1004,15,2,1005,15,1,1064,15,2,1065,15,1,1125,15,1,1185,15,1,1245,15,1],"1293":[345,15,1,406,15,1,465,15,2,466,15,1,525,15,2,526,15,1,585,15,2,586,15,1,645,15,2,646,15,1,705,15,2,706,15,1,765,15,2,766,15,1,825,15,2,826,15,1,885,15,2,886,15,1,945,15,2,946,15,1,1005,15,2,1006,15,1,1065,15,2,1066,15,1,1126,15,1,1186,15,1,1246,15,1],"67":[347,15,1,407,15,1,467,15,1,467,15,2,527,15,1,527,15,2,587,15,1,587,15,2,647,15,1,647,15,2,707,15,1,707,15,2,767,15,1,767,15,2,827,15,1,827,15,2,887,15,1,887,15,2,947,15,1,947,15,2,1007,15,1,1007,15,2,1067,15,1,1067,15,2,1127,15,1,1187,15,1,1247,15,1],"9hpy":[348,15,1,408,15,1,468,15,1,468,15,2,528,15,1,528,15,2,588,15,1,588,15,2,648,15,1,648,15,2,708,15,1,708,15,2,768,15,1,768,15,2,828,15,1,828,15,2,888,15,1,888,15,2,948,15,1,948,15,2,1008,15,1,1008,15,2,1068,15,1,1068,15,2,1128,15,1,1188,15,1,1248,15,1],"140":[338,14,1,398,14,1,458,14,1,458,14,2,518,14,1,518,14,2,578,14,1,578,14,2,638,14,1,638,14,2,698,14,1,698,14,2,758,14,1,758,14,2,818,14,1,818,14,2,878,14,1,878,14,2,938,14,1,938,14,2,998,14,1,998,14,2,1058,14,1,1058,14,2,1118,14,1,1178,14,1],"150":[342,14,1,402,14,1,462,14,1,462,14,2,522,14,1,522,14,2,582,14,1,582,14,2,642,14,1,642,14,2,702,14,1,702,14,2,762,14,1,762,14,2,822,14,1,822,14,2,882,14,1,882,14,2,942,14,1,942,14,2,1002,14,1,1002,14,2,1062,14,1,1062,14,2,1122,14,1,1182,14,1],"151":[343,14,1,403,14,1,463,14,1,464,14,2,523,14,1,524,14,2,583,14,1,584,14,2,643,14,1,644,14,2,703,14,1,704,14,2,763,14,1,764,14,2,823,14,1,824,14,2,883,14,1,884,14,2,943,14,1,944,14,2,1003,14,1,1004,14,2,1063,14,1,1064,14,2,1123,14,1,1183,14,1],"154":[345,14,1,405,14,1,465,14,1,466,14,2,525,14,1,526,14,2,585,14,1,586,14,2,645,14,1,646,14,2,705,14,1,706,14,2,765,14,1,766,14,2,825,14,1,826,14,2,885,14,1,886,14,2,945,14,1,946,14,2,1005,14,1,1006,14,2,1065,14,1,1066,14,2,1125,14,1,1185,14,1],"1268":[347,14,1,407,14,1,467,14,1,467,14,2,527,14,1,527,14,2,587,14,1,587,14,2,647,14,1,647,14,2,707,14,1,707,14,2,767,14,1,767,14,2,827,14,1,827,14,2,887,14,1,887,14,2,947,14,1,947,14,2,1007,14,1,1007,14,2,1067,14,1,1067,14,2,1127,14,1,1187,14,1],"155":[348,14,1,408,14,1,468,14,1,469,14,2,528,14,1,529,14,2,588,14,1,589,14,2,648,14,1,649,14,2,708,14,1,709,14,2,768,14,1,769,14,2,828,14,1,829,14,2,888,14,1,889,14,2,948,14,1,949,14,2,1008,14,1,1009,14,2,1068,14,1,1069,14,2,1128,14,1,1188,14,1],"1278":[351,14,1,411,14,1,471,14,1,471,14,2,531,14,1,531,14,2,591,14,1,591,14,2,651,14,1,651,14,2,711,14,1,711,14,2,771,14,1,771,14,2,831,14,1,831,14,2,891,14,1,891,14,2,951,14,1,951,14,2,1011,14,1,1011,14,2,1071,14,1,1071,14,2,1131,14,1,1191,14,1],"i0ri":[352,14,1,412,14,1,472,14,1,472,14,2,532,14,1,532,14,2,592,14,1,592,14,2,652,14,1,652,14,2,712,14,1,712,14,2,772,14,1,772,14,2,832,14,1,832,14,2,892,14,1,892,14,2,952,14,1,952,14,2,1012,14,1,1012,14,2,1072,14,1,1072,14,2,1132,14,1,1192,14,1],"111":[352,14,1,412,14,1,472,14,1,472,14,2,532,14,1,532,14,2,592,14,1,592,14,2,652,14,1,652,14,2,712,14,1,712,14,2,772,14,1,772,14,2,832,14,1,832,14,2,892,14,1,892,14,2,952,14,1,952,14,2,1012,14,1,1012,14,2,1072,14,1,1072,14,2,1132,14,1,1192,14,1],"1282":[353,14,1,413,14,1,473,14,1,473,14,2,533,14,1,533,14,2,593,14,1,593,14,2,653,14,1,653,14,2,713,14,1,713,14,2,773,14,1,773,14,2,833,14,1,833,14,2,893,14,1,893,14,2,953,14,1,953,14,2,1013,14,1,1013,14,2,1073,14,1,1073,14,2,1133,14,1,1193,14,1],"1283":[354,14,1,414,14,1,474,14,1,474,14,2,534,14,1,534,14,2,594,14,1,594,14,2,654,14,1,654,14,2,714,14,1,714,14,2,774,14,1,774,14,2,834,14,1,834,14,2,894,14,1,894,14,2,954,14,1,954,14,2,1014,14,1,1014,14,2,1074,14,1,1074,14,2,1134,14,1,1194,14,1],"157":[355,14,1,415,14,1,475,14,1,475,14,2,535,14,1,535,14,2,595,14,1,595,14,2,655,14,1,655,14,2,715,14,1,715,14,2,775,14,1,775,14,2,835,14,1,835,14,2,895,14,1,895,14,2,955,14,1,955,14,2,1015,14,1,1015,14,2,1075,14,1,1075,14,2,1135,14,1,1195,14,1],"159":[357,14,1,417,14,1,477,14,1,477,14,2,537,14,1,537,14,2,597,14,1,597,14,2,657,14,1,657,14,2,717,14,1,717,14,2,777,14,1,777,14,2,837,14,1,837,14,2,897,14,1,897,14,2,957,14,1,957,14,2,1017,14,1,1017,14,2,1077,14,1,1077,14,2,1137,14,1,1197,14,1],"160":[358,14,1,418,14,1,478,14,1,478,14,2,538,14,1,538,14,2,598,14,1,598,14,2,658,14,1,658,14,2,718,14,1,718,14,2,778,14,1,778,14,2,838,14,1,838,14,2,898,14,1,898,14,2,958,14,1,958,14,2,1018,14,1,1018,14,2,1078,14,1,1078,14,2,1138,14,1,1198,14,1],"1311":[359,14,1,419,14,1,479,14,1,479,14,2,539,14,1,539,14,2,599,14,1,599,14,2,659,14,1,659,14,2,719,14,1,719,14,2,779,14,1,779,14,2,839,14,1,839,14,2,899,14,1,899,14,2,959,14,1,959,14,2,1019,14,1,1019,14,2,1079,14,1,1079,14,2,1139,14,1,1199,14,1],"central-bay-P":[364,14,1,375,15,1,424,14,1,435,15,1,484,14,1,484,14,2,495,15,1,495,15,2,544,14,1,544,14,2,555,15,1,555,15,2,604,14,1,604,14,2,615,15,1,615,15,2,664,14,1,664,14,2,675,15,1,675,15,2,724,14,1,724,14,2,735,15,1,735,15,2,784,14,1,784,14,2,795,15,1,795,15,2,844,14,1,844,14,2,855,15,1,855,15,2,904,14,1,904,14,2,915,15,1,915,15,2,964,14,1,964,14,2,975,15,1,975,15,2,1024,14,1,1024,14,2,1035,15,1,1035,15,2,1084,14,1,1084,14,2,1095,15,1,1144,14,1,1155,15,1,1204,14,1,1215,15,1],"central-bay-I":[365,15,1,375,14,1,425,15,1,435,14,1,485,15,1,485,15,2,495,14,1,495,14,2,545,15,1,545,15,2,555,14,1,555,14,2,605,15,1,605,15,2,615,14,1,615,14,2,665,15,1,665,15,2,675,14,1,675,14,2,725,15,1,725,15,2,735,14,1,735,14,2,785,15,1,785,15,2,795,14,1,795,14,2,845,15,1,845,15,2,855,14,1,855,14,2,905,15,1,905,15,2,915,14,1,915,14,2,965,15,1,965,15,2,975,14,1,975,14,2,1025,15,1,1025,15,2,1035,14,1,1035,14,2,1085,15,1,1085,15,2,1095,14,1,1145,15,1,1155,14,1,1205,15,1,1215,14,1],"1346":[376,14,1,436,14,1,496,14,1,496,14,2,556,14,1,556,14,2,616,14,1,616,14,2,676,14,1,676,14,2,736,14,1,736,14,2,796,14,1,796,14,2,856,14,1,856,14,2,916,14,1,916,14,2,976,14,1,976,14,2,1036,14,1,1036,14,2,1096,14,1,1156,14,1,1216,14,1],"wp3a":[377,14,1,437,14,1,497,14,1,497,14,2,557,14,1,557,14,2,617,14,1,617,14,2,677,14,1,677,14,2,737,14,1,737,14,2,797,14,1,797,14,2,857,14,1,857,14,2,917,14,1,917,14,2,977,14,1,977,14,2,1037,14,1,1037,14,2,1097,14,1,1157,14,1,1217,14,1],"1313":[378,14,1,438,14,1,498,14,1,498,14,2,558,14,1,558,14,2,618,14,1,618,14,2,678,14,1,678,14,2,738,14,1,738,14,2,798,14,1,798,14,2,858,14,1,858,14,2,918,14,1,918,14,2,978,14,1,978,14,2,1038,14,1,1038,14,2,1098,14,1,1158,14,1,1218,14,1],"1315":[378,14,1,438,14,1,498,14,1,499,14,2,558,14,1,559,14,2,618,14,1,619,14,2,678,14,1,679,14,2,738,14,1,739,14,2,798,14,1,799,14,2,858,14,1,859,14,2,918,14,1,919,14,2,978,14,1,979,14,2,1038,14,1,1039,14,2,1098,14,1,1158,14,1,1218,14,1],"1316":[379,14,1,439,14,1,499,14,1,499,14,2,559,14,1,560,14,2,619,14,1,619,14,2,679,14,1,680,14,2,739,14,1,739,14,2,799,14,1,800,14,2,859,14,1,859,14,2,919,14,1,920,14,2,979,14,1,979,14,2,1039,14,1,1040,14,2,1099,14,1,1159,14,1,1219,14,1],"107":[380,14,1,440,14,1,500,14,1,500,14,2,560,14,1,561,14,2,620,14,1,620,14,2,680,14,1,681,14,2,740,14,1,740,14,2,800,14,1,801,14,2,860,14,1,860,14,2,920,14,1,921,14,2,980,14,1,980,14,2,1040,14,1,1041,14,2,1100,14,1,1160,14,1,1220,14,1],"1318":[381,14,1,441,14,1,501,14,1,501,14,2,561,14,1,562,14,2,621,14,1,621,14,2,681,14,1,682,14,2,741,14,1,741,14,2,801,14,1,802,14,2,861,14,1,861,14,2,921,14,1,922,14,2,981,14,1,981,14,2,1041,14,1,1042,14,2,1101,14,1,1161,14,1,1221,14,1],"1265":[381,14,1,441,14,1,501,14,1,502,14,2,561,14,1,563,14,2,621,14,1,622,14,2,681,14,1,683,14,2,741,14,1,742,14,2,801,14,1,803,14,2,861,14,1,862,14,2,921,14,1,923,14,2,981,14,1,982,14,2,1041,14,1,1043,14,2,1101,14,1,1161,14,1,1221,14,1],"1319":[382,14,1,442,14,1,502,14,1,503,14,2,562,14,1,564,14,2,622,14,1,623,14,2,682,14,1,684,14,2,742,14,1,743,14,2,802,14,1,804,14,2,862,14,1,863,14,2,922,14,1,924,14,2,982,14,1,983,14,2,1042,14,1,1044,14,2,1102,14,1,1162,14,1,1222,14,1],"1320":[382,14,1,442,14,1,502,14,1,504,14,2,562,14,1,564,14,2,622,14,1,624,14,2,682,14,1,684,14,2,742,14,1,744,14,2,802,14,1,804,14,2,862,14,1,864,14,2,922,14,1,924,14,2,982,14,1,984,14,2,1042,14,1,1044,14,2,1102,14,1,1162,14,1,1222,14,1],"1321":[383,14,1,443,14,1,503,14,1,505,14,2,563,14,1,565,14,2,623,14,1,625,14,2,683,14,1,685,14,2,743,14,1,745,14,2,803,14,1,805,14,2,863,14,1,865,14,2,923,14,1,925,14,2,983,14,1,985,14,2,1043,14,1,1045,14,2,1103,14,1,1163,14,1,1223,14,1],"1322":[385,14,1,445,14,1,505,14,1,507,14,2,565,14,1,567,14,2,625,14,1,627,14,2,685,14,1,687,14,2,745,14,1,747,14,2,805,14,1,807,14,2,865,14,1,867,14,2,925,14,1,927,14,2,985,14,1,987,14,2,1045,14,1,1047,14,2,1105,14,1,1165,14,1,1225,14,1],"gl8o":[389,14,1,449,14,1,509,14,1,511,14,2,569,14,1,571,14,2,629,14,1,631,14,2,689,14,1,691,14,2,749,14,1,751,14,2,809,14,1,811,14,2,869,14,1,871,14,2,929,14,1,931,14,2,989,14,1,991,14,2,1049,14,1,1051,14,2,1109,14,1,1169,14,1,1229,14,1],"1339":[349,15,1,409,15,1,469,15,1,469,15,2,529,15,1,529,15,2,589,15,1,589,15,2,649,15,1,649,15,2,709,15,1,709,15,2,769,15,1,769,15,2,829,15,1,829,15,2,889,15,1,889,15,2,949,15,1,949,15,2,1009,15,1,1009,15,2,1069,15,1,1069,15,2,1129,15,1,1189,15,1],"1258":[352,15,1,412,15,1,472,15,1,472,15,2,532,15,1,532,15,2,592,15,1,592,15,2,652,15,1,652,15,2,712,15,1,712,15,2,772,15,1,772,15,2,832,15,1,832,15,2,892,15,1,892,15,2,952,15,1,952,15,2,1012,15,1,1012,15,2,1072,15,1,1072,15,2,1132,15,1,1192,15,1],"1297":[354,15,1,414,15,1,474,15,1,474,15,2,534,15,1,534,15,2,594,15,1,594,15,2,654,15,1,654,15,2,714,15,1,714,15,2,774,15,1,774,15,2,834,15,1,834,15,2,894,15,1,894,15,2,954,15,1,954,15,2,1014,15,1,1014,15,2,1074,15,1,1074,15,2,1134,15,1,1194,15,1],"1305":[355,15,1,415,15,1,475,15,1,475,15,2,535,15,1,535,15,2,595,15,1,595,15,2,655,15,1,655,15,2,715,15,1,715,15,2,775,15,1,775,15,2,835,15,1,835,15,2,895,15,1,895,15,2,955,15,1,955,15,2,1015,15,1,1015,15,2,1075,15,1,1075,15,2,1135,15,1,1195,15,1],"1307":[355,15,1,415,15,1,475,15,1,475,15,2,535,15,1,535,15,2,595,15,1,595,15,2,655,15,1,655,15,2,715,15,1,715,15,2,775,15,1,775,15,2,835,15,1,835,15,2,895,15,1,895,15,2,955,15,1,955,15,2,1015,15,1,1015,15,2,1075,15,1,1075,15,2,1135,15,1,1195,15,1],"1308":[356,15,1,416,15,1,476,15,1,476,15,2,536,15,1,536,15,2,596,15,1,596,15,2,656,15,1,656,15,2,716,15,1,716,15,2,776,15,1,776,15,2,836,15,1,836,15,2,896,15,1,896,15,2,956,15,1,956,15,2,1016,15,1,1016,15,2,1076,15,1,1076,15,2,1136,15,1,1196,15,1],"106":[357,15,1,417,15,1,477,15,1,477,15,2,537,15,1,537,15,2,597,15,1,597,15,2,657,15,1,657,15,2,717,15,1,717,15,2,777,15,1,777,15,2,837,15,1,837,15,2,897,15,1,897,15,2,957,15,1,957,15,2,1017,15,1,1017,15,2,1077,15,1,1077,15,2,1137,15,1,1197,15,1],"1370":[358,15,1,418,15,1,478,15,1,478,15,2,538,15,1,538,15,2,598,15,1,598,15,2,658,15,1,658,15,2,718,15,1,718,15,2,778,15,1,778,15,2,838,15,1,838,15,2,898,15,1,898,15,2,958,15,1,958,15,2,1018,15,1,1018,15,2,1078,15,1,1078,15,2,1138,15,1,1198,15,1],"1259":[359,15,1,419,15,1,479,15,1,479,15,2,539,15,1,539,15,2,599,15,1,599,15,2,659,15,1,659,15,2,719,15,1,719,15,2,779,15,1,779,15,2,839,15,1,839,15,2,899,15,1,899,15,2,959,15,1,959,15,2,1019,15,1,1019,15,2,1079,15,1,1079,15,2,1139,15,1,1199,15,1],"1260":[359,15,1,419,15,1,479,15,1,479,15,2,539,15,1,539,15,2,599,15,1,599,15,2,659,15,1,659,15,2,719,15,1,719,15,2,779,15,1,779,15,2,839,15,1,839,15,2,899,15,1,899,15,2,959,15,1,959,15,2,1019,15,1,1019,15,2,1079,15,1,1079,15,2,1139,15,1,1199,15,1],"1262":[360,15,1,420,15,1,480,15,1,480,15,2,540,15,1,540,15,2,600,15,1,600,15,2,660,15,1,660,15,2,720,15,1,720,15,2,780,15,1,780,15,2,840,15,1,840,15,2,900,15,1,900,15,2,960,15,1,960,15,2,1020,15,1,1020,15,2,1080,15,1,1080,15,2,1140,15,1,1200,15,1],"950":[360,15,1,420,15,1,480,15,1,480,15,2,540,15,1,540,15,2,600,15,1,600,15,2,660,15,1,660,15,2,720,15,1,720,15,2,780,15,1,780,15,2,840,15,1,840,15,2,900,15,1,900,15,2,960,15,1,960,15,2,1020,15,1,1020,15,2,1080,15,1,1080,15,2,1140,15,1,1200,15,1],"1034":[361,15,1,421,15,1,481,15,1,481,15,2,541,15,1,541,15,2,601,15,1,601,15,2,661,15,1,661,15,2,721,15,1,721,15,2,781,15,1,781,15,2,841,15,1,841,15,2,901,15,1,901,15,2,961,15,1,961,15,2,1021,15,1,1021,15,2,1081,15,1,1081,15,2,1141,15,1,1201,15,1],"952":[361,15,1,421,15,1,481,15,1,481,15,2,541,15,1,541,15,2,601,15,1,601,15,2,661,15,1,661,15,2,721,15,1,721,15,2,781,15,1,781,15,2,841,15,1,841,15,2,901,15,1,901,15,2,961,15,1,961,15,2,1021,15,1,1021,15,2,1081,15,1,1081,15,2,1141,15,1,1201,15,1],"917":[362,15,1,422,15,1,482,15,1,482,15,2,542,15,1,542,15,2,602,15,1,602,15,2,662,15,1,662,15,2,722,15,1,722,15,2,782,15,1,782,15,2,842,15,1,842,15,2,902,15,1,902,15,2,962,15,1,962,15,2,1022,15,1,1022,15,2,1082,15,1,1082,15,2,1142,15,1,1202,15,1],"143":[363,15,1,423,15,1,483,15,1,483,15,2,543,15,1,543,15,2,603,15,1,603,15,2,663,15,1,663,15,2,723,15,1,723,15,2,783,15,1,783,15,2,843,15,1,843,15,2,903,15,1,903,15,2,963,15,1,963,15,2,1023,15,1,1023,15,2,1083,15,1,1083,15,2,1143,15,1,1203,15,1],"1326":[378,15,1,438,15,1,498,15,1,498,15,2,558,15,1,558,15,2,618,15,1,618,15,2,678,15,1,678,15,2,738,15,1,738,15,2,798,15,1,798,15,2,858,15,1,858,15,2,918,15,1,918,15,2,978,15,1,978,15,2,1038,15,1,1038,15,2,1098,15,1,1158,15,1,1218,15,1],"936":[379,15,1,439,15,1,499,15,1,499,15,2,559,15,1,559,15,2,619,15,1,619,15,2,679,15,1,679,15,2,739,15,1,739,15,2,799,15,1,799,15,2,859,15,1,859,15,2,919,15,1,919,15,2,979,15,1,979,15,2,1039,15,1,1039,15,2,1099,15,1,1159,15,1,1219,15,1],"1005":[381,15,1,441,15,1,501,15,1,501,15,2,561,15,1,561,15,2,621,15,1,621,15,2,681,15,1,681,15,2,741,15,1,741,15,2,801,15,1,801,15,2,861,15,1,861,15,2,921,15,1,921,15,2,981,15,1,981,15,2,1041,15,1,1041,15,2,1101,15,1,1161,15,1,1221,15,1],"1345":[382,15,1,442,15,1,502,15,1,502,15,2,562,15,1,562,15,2,622,15,1,622,15,2,682,15,1,682,15,2,742,15,1,742,15,2,802,15,1,802,15,2,862,15,1,862,15,2,922,15,1,922,15,2,982,15,1,982,15,2,1042,15,1,1042,15,2,1102,15,1,1162,15,1,1222,15,1],"55":[383,15,1,443,15,1,503,15,1,503,15,2,563,15,1,563,15,2,623,15,1,623,15,2,683,15,1,683,15,2,743,15,1,743,15,2,803,15,1,803,15,2,863,15,1,863,15,2,923,15,1,923,15,2,983,15,1,983,15,2,1043,15,1,1043,15,2,1103,15,1,1163,15,1,1223,15,1],"1248":[384,15,1,444,15,1,504,15,1,504,15,2,564,15,1,564,15,2,624,15,1,624,15,2,684,15,1,684,15,2,744,15,1,744,15,2,804,15,1,804,15,2,864,15,1,864,15,2,924,15,1,924,15,2,984,15,1,984,15,2,1044,15,1,1044,15,2,1104,15,1,1164,15,1,1224,15,1],"1284":[385,15,1,445,15,1,505,15,1,505,15,2,565,15,1,565,15,2,625,15,1,625,15,2,685,15,1,685,15,2,745,15,1,745,15,2,805,15,1,805,15,2,865,15,1,865,15,2,925,15,1,925,15,2,985,15,1,985,15,2,1045,15,1,1045,15,2,1105,15,1,1165,15,1,1225,15,1],"1249":[387,15,1,447,15,1,507,15,1,507,15,2,567,15,1,567,15,2,627,15,1,627,15,2,687,15,1,687,15,2,747,15,1,747,15,2,807,15,1,807,15,2,867,15,1,867,15,2,927,15,1,927,15,2,987,15,1,987,15,2,1047,15,1,1047,15,2,1107,15,1,1167,15,1,1227,15,1],"1251":[388,15,1,448,15,1,507,15,2,508,15,1,567,15,2,568,15,1,627,15,2,628,15,1,687,15,2,688,15,1,747,15,2,748,15,1,807,15,2,808,15,1,867,15,2,868,15,1,927,15,2,928,15,1,987,15,2,988,15,1,1047,15,2,1048,15,1,1108,15,1,1168,15,1,1228,15,1],"1253":[388,15,1,448,15,1,508,15,1,508,15,2,568,15,1,568,15,2,628,15,1,628,15,2,688,15,1,688,15,2,748,15,1,748,15,2,808,15,1,808,15,2,868,15,1,868,15,2,928,15,1,928,15,2,988,15,1,988,15,2,1048,15,1,1048,15,2,1108,15,1,1168,15,1,1228,15,1],"1285":[389,15,1,449,15,1,508,15,2,509,15,1,568,15,2,569,15,1,628,15,2,629,15,1,688,15,2,689,15,1,748,15,2,749,15,1,808,15,2,809,15,1,868,15,2,869,15,1,928,15,2,929,15,1,988,15,2,989,15,1,1048,15,2,1049,15,1,1109,15,1,1169,15,1,1229,15,1],"1286":[391,15,1,451,15,1,510,15,2,511,15,1,570,15,2,571,15,1,630,15,2,631,15,1,690,15,2,691,15,1,750,15,2,751,15,1,810,15,2,811,15,1,870,15,2,871,15,1,930,15,2,931,15,1,990,15,2,991,15,1,1050,15,2,1051,15,1,1111,15,1,1171,15,1,1231,15,1],"1255":[393,15,1,453,15,1,512,15,2,513,15,1,572,15,2,573,15,1,632,15,2,633,15,1,692,15,2,693,15,1,752,15,2,753,15,1,812,15,2,813,15,1,872,15,2,873,15,1,932,15,2,933,15,1,992,15,2,993,15,1,1052,15,2,1053,15,1,1113,15,1,1173,15,1,1233,15,1],"68":[338,16,1,398,16,1,458,16,1,458,16,2,518,16,1,518,16,2,578,16,1,578,16,2,638,16,1,638,16,2,698,16,1,698,16,2,758,16,1,758,16,2,818,16,1,818,16,2,878,16,1,878,16,2,938,16,1,938,16,2,998,16,1,998,16,2,1058,16,1,1058,16,2,1118,16,1,1178,16,1,1238,16,1],"190":[339,16,1,399,16,1,459,16,1,459,16,2,519,16,1,519,16,2,579,16,1,579,16,2,639,16,1,639,16,2,699,16,1,699,16,2,759,16,1,759,16,2,819,16,1,819,16,2,879,16,1,879,16,2,939,16,1,939,16,2,999,16,1,999,16,2,1059,16,1,1059,16,2,1119,16,1,1179,16,1],"191":[340,16,1,400,16,1,460,16,1,460,16,2,520,16,1,520,16,2,580,16,1,580,16,2,640,16,1,640,16,2,700,16,1,700,16,2,760,16,1,760,16,2,820,16,1,820,16,2,880,16,1,880,16,2,940,16,1,940,16,2,1000,16,1,1000,16,2,1060,16,1,1060,16,2,1120,16,1,1180,16,1],"233":[342,16,1,402,16,1,462,16,1,462,16,2,522,16,1,522,16,2,582,16,1,582,16,2,642,16,1,642,16,2,702,16,1,702,16,2,762,16,1,762,16,2,822,16,1,822,16,2,882,16,1,882,16,2,942,16,1,942,16,2,1002,16,1,1002,16,2,1062,16,1,1062,16,2,1122,16,1,1182,16,1],"3wvx":[343,16,1,403,16,1,463,16,1,463,16,2,523,16,1,523,16,2,583,16,1,583,16,2,643,16,1,643,16,2,703,16,1,703,16,2,763,16,1,763,16,2,823,16,1,823,16,2,883,16,1,883,16,2,943,16,1,943,16,2,1003,16,1,1003,16,2,1063,16,1,1063,16,2,1123,16,1,1183,16,1],"v6m8":[346,16,1,406,16,1,466,16,1,466,16,2,526,16,1,526,16,2,586,16,1,586,16,2,646,16,1,646,16,2,706,16,1,706,16,2,766,16,1,766,16,2,826,16,1,826,16,2,886,16,1,886,16,2,946,16,1,946,16,2,1006,16,1,1006,16,2,1066,16,1,1066,16,2,1126,16,1,1186,16,1],"6rm5":[350,16,1,410,16,1,470,16,1,470,16,2,530,16,1,530,16,2,590,16,1,590,16,2,650,16,1,650,16,2,710,16,1,710,16,2,770,16,1,770,16,2,830,16,1,830,16,2,890,16,1,890,16,2,950,16,1,950,16,2,1010,16,1,1010,16,2,1070,16,1,1070,16,2,1130,16,1,1190,16,1],"234":[350,16,1,410,16,1,470,16,1,471,16,2,530,16,1,531,16,2,590,16,1,591,16,2,650,16,1,651,16,2,710,16,1,711,16,2,770,16,1,771,16,2,830,16,1,831,16,2,890,16,1,891,16,2,950,16,1,951,16,2,1010,16,1,1011,16,2,1070,16,1,1071,16,2,1130,16,1,1190,16,1],"193":[351,16,1,411,16,1,471,16,1,473,16,2,531,16,1,533,16,2,591,16,1,593,16,2,651,16,1,653,16,2,711,16,1,713,16,2,771,16,1,773,16,2,831,16,1,833,16,2,891,16,1,893,16,2,951,16,1,953,16,2,1011,16,1,1013,16,2,1071,16,1,1073,16,2,1131,16,1,1191,16,1],"194":[351,16,1,411,16,1,471,16,1,474,16,2,531,16,1,534,16,2,591,16,1,594,16,2,651,16,1,654,16,2,711,16,1,714,16,2,771,16,1,774,16,2,831,16,1,834,16,2,891,16,1,894,16,2,951,16,1,954,16,2,1011,16,1,1014,16,2,1071,16,1,1074,16,2,1131,16,1,1191,16,1],"196":[352,16,1,412,16,1,472,16,1,475,16,2,532,16,1,535,16,2,592,16,1,595,16,2,652,16,1,655,16,2,712,16,1,715,16,2,772,16,1,775,16,2,832,16,1,835,16,2,892,16,1,895,16,2,952,16,1,955,16,2,1012,16,1,1015,16,2,1072,16,1,1075,16,2,1132,16,1,1192,16,1],"197":[353,16,1,413,16,1,473,16,1,475,16,2,533,16,1,535,16,2,593,16,1,595,16,2,653,16,1,655,16,2,713,16,1,715,16,2,773,16,1,775,16,2,833,16,1,835,16,2,893,16,1,895,16,2,953,16,1,955,16,2,1013,16,1,1015,16,2,1073,16,1,1075,16,2,1133,16,1,1193,16,1],"198":[354,16,1,414,16,1,474,16,1,476,16,2,534,16,1,536,16,2,594,16,1,596,16,2,654,16,1,656,16,2,714,16,1,716,16,2,774,16,1,776,16,2,834,16,1,836,16,2,894,16,1,896,16,2,954,16,1,956,16,2,1014,16,1,1016,16,2,1074,16,1,1076,16,2,1134,16,1,1194,16,1],"179":[354,16,1,383,16,1,414,16,1,443,16,1,474,16,1,477,16,2,503,16,1,503,16,2,534,16,1,537,16,2,563,16,1,563,16,2,594,16,1,597,16,2,623,16,1,623,16,2,654,16,1,657,16,2,683,16,1,683,16,2,714,16,1,717,16,2,743,16,1,743,16,2,774,16,1,777,16,2,803,16,1,803,16,2,834,16,1,837,16,2,863,16,1,863,16,2,894,16,1,897,16,2,923,16,1,923,16,2,954,16,1,957,16,2,983,16,1,983,16,2,1014,16,1,1017,16,2,1043,16,1,1043,16,2,1074,16,1,1077,16,2,1103,16,1,1134,16,1,1163,16,1,1194,16,1,1223,16,1],"200":[354,16,1,414,16,1,474,16,1,478,16,2,534,16,1,538,16,2,594,16,1,598,16,2,654,16,1,658,16,2,714,16,1,718,16,2,774,16,1,778,16,2,834,16,1,838,16,2,894,16,1,898,16,2,954,16,1,958,16,2,1014,16,1,1018,16,2,1074,16,1,1078,16,2,1134,16,1,1194,16,1],"202":[354,16,1,414,16,1,474,16,1,479,16,2,534,16,1,539,16,2,594,16,1,599,16,2,654,16,1,659,16,2,714,16,1,719,16,2,774,16,1,779,16,2,834,16,1,839,16,2,894,16,1,899,16,2,954,16,1,959,16,2,1014,16,1,1019,16,2,1074,16,1,1079,16,2,1134,16,1,1194,16,1],"204":[355,16,1,415,16,1,475,16,1,480,16,2,535,16,1,540,16,2,595,16,1,600,16,2,655,16,1,660,16,2,715,16,1,720,16,2,775,16,1,780,16,2,835,16,1,840,16,2,895,16,1,900,16,2,955,16,1,960,16,2,1015,16,1,1020,16,2,1075,16,1,1080,16,2,1135,16,1,1195,16,1],"205":[356,16,1,416,16,1,476,16,1,480,16,2,536,16,1,540,16,2,596,16,1,600,16,2,656,16,1,660,16,2,716,16,1,720,16,2,776,16,1,780,16,2,836,16,1,840,16,2,896,16,1,900,16,2,956,16,1,960,16,2,1016,16,1,1020,16,2,1076,16,1,1080,16,2,1136,16,1,1196,16,1],"208":[357,16,1,417,16,1,477,16,1,481,16,2,537,16,1,541,16,2,597,16,1,601,16,2,657,16,1,661,16,2,717,16,1,721,16,2,777,16,1,781,16,2,837,16,1,841,16,2,897,16,1,901,16,2,957,16,1,961,16,2,1017,16,1,1021,16,2,1077,16,1,1081,16,2,1137,16,1,1197,16,1],"209":[357,16,1,417,16,1,477,16,1,481,16,2,537,16,1,541,16,2,597,16,1,601,16,2,657,16,1,661,16,2,717,16,1,721,16,2,777,16,1,781,16,2,837,16,1,841,16,2,897,16,1,901,16,2,957,16,1,961,16,2,1017,16,1,1021,16,2,1077,16,1,1081,16,2,1137,16,1,1197,16,1],"211":[358,16,1,418,16,1,478,16,1,482,16,2,538,16,1,542,16,2,598,16,1,602,16,2,658,16,1,662,16,2,718,16,1,722,16,2,778,16,1,782,16,2,838,16,1,842,16,2,898,16,1,902,16,2,958,16,1,962,16,2,1018,16,1,1022,16,2,1078,16,1,1082,16,2,1138,16,1,1198,16,1],"central-bay-F":[365,16,1,375,16,1,425,16,1,435,16,1,485,16,1,485,16,2,495,16,1,495,16,2,545,16,1,545,16,2,555,16,1,555,16,2,605,16,1,605,16,2,615,16,1,615,16,2,665,16,1,665,16,2,675,16,1,675,16,2,725,16,1,725,16,2,735,16,1,735,16,2,785,16,1,785,16,2,795,16,1,795,16,2,845,16,1,845,16,2,855,16,1,855,16,2,905,16,1,905,16,2,915,16,1,915,16,2,965,16,1,965,16,2,975,16,1,975,16,2,1025,16,1,1025,16,2,1035,16,1,1035,16,2,1085,16,1,1085,16,2,1095,16,1,1145,16,1,1155,16,1,1205,16,1,1215,16,1],"168":[378,16,1,438,16,1,498,16,1,498,16,2,558,16,1,558,16,2,618,16,1,618,16,2,678,16,1,678,16,2,738,16,1,738,16,2,798,16,1,798,16,2,858,16,1,858,16,2,918,16,1,918,16,2,978,16,1,978,16,2,1038,16,1,1038,16,2,1098,16,1,1158,16,1,1218,16,1],"218":[379,16,1,439,16,1,499,16,1,499,16,2,559,16,1,559,16,2,619,16,1,619,16,2,679,16,1,679,16,2,739,16,1,739,16,2,799,16,1,799,16,2,859,16,1,859,16,2,919,16,1,919,16,2,979,16,1,979,16,2,1039,16,1,1039,16,2,1099,16,1,1159,16,1,1219,16,1],"169":[379,16,1,439,16,1,499,16,1,499,16,2,559,16,1,559,16,2,619,16,1,619,16,2,679,16,1,679,16,2,739,16,1,739,16,2,799,16,1,799,16,2,859,16,1,859,16,2,919,16,1,919,16,2,979,16,1,979,16,2,1039,16,1,1039,16,2,1099,16,1,1159,16,1,1219,16,1],"172":[380,16,1,440,16,1,500,16,1,500,16,2,560,16,1,560,16,2,620,16,1,620,16,2,680,16,1,680,16,2,740,16,1,740,16,2,800,16,1,800,16,2,860,16,1,860,16,2,920,16,1,920,16,2,980,16,1,980,16,2,1040,16,1,1040,16,2,1100,16,1,1160,16,1,1220,16,1],"174":[381,16,1,441,16,1,501,16,1,501,16,2,561,16,1,561,16,2,621,16,1,621,16,2,681,16,1,681,16,2,741,16,1,741,16,2,801,16,1,801,16,2,861,16,1,861,16,2,921,16,1,921,16,2,981,16,1,981,16,2,1041,16,1,1041,16,2,1101,16,1,1161,16,1,1221,16,1],"113":[381,16,1,441,16,1,501,16,1,501,16,2,561,16,1,561,16,2,621,16,1,621,16,2,681,16,1,681,16,2,741,16,1,741,16,2,801,16,1,801,16,2,861,16,1,861,16,2,921,16,1,921,16,2,981,16,1,981,16,2,1041,16,1,1041,16,2,1101,16,1,1161,16,1,1221,16,1],"175":[381,16,1,441,16,1,501,16,1,502,16,2,561,16,1,562,16,2,621,16,1,622,16,2,681,16,1,682,16,2,741,16,1,742,16,2,801,16,1,802,16,2,861,16,1,862,16,2,921,16,1,922,16,2,981,16,1,982,16,2,1041,16,1,1042,16,2,1101,16,1,1161,16,1,1221,16,1],"176":[382,16,1,442,16,1,502,16,1,502,16,2,562,16,1,562,16,2,622,16,1,622,16,2,682,16,1,682,16,2,742,16,1,742,16,2,802,16,1,802,16,2,862,16,1,862,16,2,922,16,1,922,16,2,982,16,1,982,16,2,1042,16,1,1042,16,2,1102,16,1,1162,16,1,1222,16,1],"177":[382,16,1,442,16,1,502,16,1,502,16,2,562,16,1,562,16,2,622,16,1,622,16,2,682,16,1,682,16,2,742,16,1,742,16,2,802,16,1,802,16,2,862,16,1,862,16,2,922,16,1,922,16,2,982,16,1,982,16,2,1042,16,1,1042,16,2,1102,16,1,1162,16,1,1222,16,1],"181":[383,16,1,443,16,1,503,16,1,503,16,2,563,16,1,563,16,2,623,16,1,623,16,2,683,16,1,683,16,2,743,16,1,743,16,2,803,16,1,803,16,2,863,16,1,863,16,2,923,16,1,923,16,2,983,16,1,983,16,2,1043,16,1,1043,16,2,1103,16,1,1163,16,1,1223,16,1],"182":[383,16,1,443,16,1,503,16,1,504,16,2,563,16,1,564,16,2,623,16,1,624,16,2,683,16,1,684,16,2,743,16,1,744,16,2,803,16,1,804,16,2,863,16,1,864,16,2,923,16,1,924,16,2,983,16,1,984,16,2,1043,16,1,1044,16,2,1103,16,1,1163,16,1,1223,16,1],"184":[384,16,1,444,16,1,504,16,1,504,16,2,564,16,1,564,16,2,624,16,1,624,16,2,684,16,1,684,16,2,744,16,1,744,16,2,804,16,1,804,16,2,864,16,1,864,16,2,924,16,1,924,16,2,984,16,1,984,16,2,1044,16,1,1044,16,2,1104,16,1,1164,16,1,1224,16,1],"185":[385,16,1,445,16,1,505,16,1,505,16,2,565,16,1,565,16,2,625,16,1,625,16,2,685,16,1,685,16,2,745,16,1,745,16,2,805,16,1,805,16,2,865,16,1,865,16,2,925,16,1,925,16,2,985,16,1,985,16,2,1045,16,1,1045,16,2,1105,16,1,1165,16,1,1225,16,1],"186":[385,16,1,445,16,1,505,16,1,505,16,2,565,16,1,565,16,2,625,16,1,625,16,2,685,16,1,685,16,2,745,16,1,745,16,2,805,16,1,805,16,2,865,16,1,865,16,2,925,16,1,925,16,2,985,16,1,985,16,2,1045,16,1,1045,16,2,1105,16,1,1165,16,1,1225,16,1],"114":[386,16,1,446,16,1,506,16,1,506,16,2,566,16,1,566,16,2,626,16,1,626,16,2,686,16,1,686,16,2,746,16,1,746,16,2,806,16,1,806,16,2,866,16,1,866,16,2,926,16,1,926,16,2,986,16,1,986,16,2,1046,16,1,1046,16,2,1106,16,1,1166,16,1,1226,16,1],"223":[386,16,1,446,16,1,506,16,1,506,16,2,566,16,1,566,16,2,626,16,1,626,16,2,686,16,1,686,16,2,746,16,1,746,16,2,806,16,1,806,16,2,866,16,1,866,16,2,926,16,1,926,16,2,986,16,1,986,16,2,1046,16,1,1046,16,2,1106,16,1,1166,16,1,1226,16,1],"187":[387,16,1,447,16,1,507,16,1,507,16,2,567,16,1,567,16,2,627,16,1,627,16,2,687,16,1,687,16,2,747,16,1,747,16,2,807,16,1,807,16,2,867,16,1,867,16,2,927,16,1,927,16,2,987,16,1,987,16,2,1047,16,1,1047,16,2,1107,16,1,1167,16,1,1227,16,1],"224":[388,16,1,448,16,1,508,16,1,508,16,2,568,16,1,568,16,2,628,16,1,628,16,2,688,16,1,688,16,2,748,16,1,748,16,2,808,16,1,808,16,2,868,16,1,868,16,2,928,16,1,928,16,2,988,16,1,988,16,2,1048,16,1,1048,16,2,1108,16,1,1168,16,1,1228,16,1],"225":[390,16,1,450,16,1,510,16,1,510,16,2,570,16,1,570,16,2,630,16,1,630,16,2,690,16,1,690,16,2,750,16,1,750,16,2,810,16,1,810,16,2,870,16,1,870,16,2,930,16,1,930,16,2,990,16,1,990,16,2,1050,16,1,1050,16,2,1110,16,1,1170,16,1,1230,16,1],"226":[390,16,1,450,16,1,510,16,1,510,16,2,570,16,1,570,16,2,630,16,1,630,16,2,690,16,1,690,16,2,750,16,1,750,16,2,810,16,1,810,16,2,870,16,1,870,16,2,930,16,1,930,16,2,990,16,1,990,16,2,1050,16,1,1050,16,2,1110,16,1,1170,16,1,1230,16,1],"115":[391,16,1,451,16,1,511,16,1,511,16,2,571,16,1,571,16,2,631,16,1,631,16,2,691,16,1,691,16,2,751,16,1,751,16,2,811,16,1,811,16,2,871,16,1,871,16,2,931,16,1,931,16,2,991,16,1,991,16,2,1051,16,1,1051,16,2,1111,16,1,1171,16,1,1231,16,1],"yvbq":[392,16,1,452,16,1,512,16,1,513,16,2,572,16,1,573,16,2,632,16,1,633,16,2,692,16,1,693,16,2,752,16,1,753,16,2,812,16,1,813,16,2,872,16,1,873,16,2,932,16,1,933,16,2,992,16,1,993,16,2,1052,16,1,1053,16,2,1112,16,1,1172,16,1,1232,16,1],"228":[393,16,1,453,16,1,513,16,1,513,16,2,573,16,1,573,16,2,633,16,1,633,16,2,693,16,1,693,16,2,753,16,1,753,16,2,813,16,1,813,16,2,873,16,1,873,16,2,933,16,1,933,16,2,993,16,1,993,16,2,1053,16,1,1053,16,2,1113,16,1,1173,16,1,1233,16,1],"229":[393,16,1,453,16,1,513,16,1,514,16,2,573,16,1,574,16,2,633,16,1,634,16,2,693,16,1,694,16,2,753,16,1,754,16,2,813,16,1,814,16,2,873,16,1,874,16,2,933,16,1,934,16,2,993,16,1,994,16,2,1053,16,1,1054,16,2,1113,16,1,1173,16,1,1233,16,1],"emk9":[397,16,1,457,16,1,517,16,1,517,16,2,577,16,1,577,16,2,637,16,1,637,16,2,697,16,1,697,16,2,757,16,1,757,16,2,817,16,1,817,16,2,877,16,1,877,16,2,937,16,1,937,16,2,997,16,1,997,16,2,1057,16,1,1057,16,2,1117,16,1,1177,16,1,1237,16,1],"43":[365,18,1,425,18,1,485,18,1,545,18,1,605,18,1,665,18,1,725,18,1,785,18,1,845,18,1,905,18,1,965,18,1,1025,18,1,1085,18,1,1145,18,1,1205,18,1],"39":[350,18,1,410,18,1,470,18,1,530,18,1,590,18,1,650,18,1,710,18,1,770,18,1,830,18,1,890,18,1,950,18,1,1010,18,1,1070,18,1,1130,18,1,1190,18,1],"729":[563,11,1,623,11,1,683,11,1,743,11,1,803,11,1,863,11,1,923,11,1,983,11,1],"80":[400,17,1,520,17,1,520,17,2,640,17,1,640,17,2,760,17,1,760,17,2,880,17,1,880,17,2,1000,17,1,1000,17,2,1120,17,1,1240,17,1],"1015":[402,17,1,522,17,1,522,17,2,642,17,1,642,17,2,762,17,1,762,17,2,882,17,1,882,17,2,1002,17,1,1002,17,2,1122,17,1],"256":[403,17,1,523,17,1,523,17,2,643,17,1,643,17,2,763,17,1,763,17,2,883,17,1,883,17,2,1003,17,1,1003,17,2,1123,17,1],"486":[404,17,1,524,17,1,524,17,2,644,17,1,644,17,2,764,17,1,764,17,2,884,17,1,884,17,2,1004,17,1,1004,17,2,1124,17,1],"290":[399,17,1,519,17,1,519,17,2,639,17,1,639,17,2,759,17,1,759,17,2,879,17,1,879,17,2,999,17,1,999,17,2,1119,17,1,1239,17,1],"240":[400,17,1,520,17,1,520,17,2,640,17,1,640,17,2,760,17,1,760,17,2,880,17,1,880,17,2,1000,17,1,1000,17,2,1120,17,1,1240,17,1],"248":[400,17,1,520,17,1,520,17,2,640,17,1,640,17,2,760,17,1,760,17,2,880,17,1,880,17,2,1000,17,1,1000,17,2,1120,17,1,1240,17,1],"293":[360,2,1,420,2,1,480,2,1,540,2,1,600,2,1,660,2,1,720,2,1,780,2,1,840,2,1,900,2,1,960,2,1,1020,2,1,1080,2,1,1140,2,1,1200,2,1],"1329":[361,2,1,421,2,1,481,2,1,541,2,1,601,2,1,661,2,1,721,2,1,781,2,1,841,2,1,901,2,1,961,2,1,1021,2,1,1081,2,1,1141,2,1,1201,2,1],"987678":[362,2,1,422,2,1,482,2,1,542,2,1,602,2,1,662,2,1,722,2,1,782,2,1,842,2,1,902,2,1,962,2,1,1022,2,1,1082,2,1,1142,2,1,1202,2,1],"294":[362,2,1,422,2,1,482,2,1,542,2,1,602,2,1,662,2,1,722,2,1,782,2,1,842,2,1,902,2,1,962,2,1,1022,2,1,1082,2,1,1142,2,1,1202,2,1],"295":[364,2,1,424,2,1,484,2,1,544,2,1,604,2,1,664,2,1,724,2,1,784,2,1,844,2,1,904,2,1,964,2,1,1024,2,1,1084,2,1,1144,2,1,1204,2,1],"741987":[380,2,1,440,2,1,500,2,1,560,2,1,620,2,1,680,2,1,740,2,1,800,2,1,860,2,1,920,2,1,980,2,1,1040,2,1,1100,2,1,1160,2,1,1220,2,1],"147456":[385,2,1,445,2,1,505,2,1,565,2,1,625,2,1,685,2,1,745,2,1,805,2,1,865,2,1,925,2,1,985,2,1,1045,2,1,1105,2,1,1165,2,1,1225,2,1],"987660":[387,2,1,447,2,1,507,2,1,567,2,1,627,2,1,687,2,1,747,2,1,807,2,1,867,2,1,927,2,1,987,2,1,1047,2,1,1107,2,1,1167,2,1,1227,2,1],"987657":[343,2,1,403,2,1,463,2,1,523,2,1,583,2,1,643,2,1,703,2,1,763,2,1,823,2,1,883,2,1,943,2,1,1003,2,1,1063,2,1,1123,2,1,1183,2,1],"20014":[345,2,1,405,2,1,465,2,1,525,2,1,585,2,1,645,2,1,705,2,1,765,2,1,825,2,1,885,2,1,945,2,1,1005,2,1,1065,2,1,1125,2,1,1185,2,1],"21":[352,2,1,412,2,1,472,2,1,532,2,1,592,2,1,652,2,1,712,2,1,772,2,1,832,2,1,892,2,1,952,2,1,1012,2,1,1072,2,1,1132,2,1,1192,2,1],"1330":[357,2,1,417,2,1,477,2,1,537,2,1,597,2,1,657,2,1,717,2,1,777,2,1,837,2,1,897,2,1,957,2,1,1017,2,1,1077,2,1,1137,2,1,1197,2,1],"1331":[358,2,1,418,2,1,478,2,1,538,2,1,598,2,1,658,2,1,718,2,1,778,2,1,838,2,1,898,2,1,958,2,1,1018,2,1,1078,2,1,1138,2,1,1198,2,1],"287":[359,2,1,419,2,1,479,2,1,539,2,1,599,2,1,659,2,1,719,2,1,779,2,1,839,2,1,899,2,1,959,2,1,1019,2,1,1079,2,1,1139,2,1,1199,2,1],"1277":[334,1,1,394,8,1,454,1,1,454,1,2,514,1,2,514,8,1,574,1,1,574,1,2,634,1,2,634,8,1,694,1,1,694,1,2,754,1,2,754,8,1,814,1,1,814,1,2,874,1,2,874,8,1,934,1,1,934,1,2,994,1,2,994,8,1,1054,1,1,1054,1,2,1114,1,1,1174,1,1,1234,1,1],"1290":[336,1,1,403,8,1,456,1,1,456,1,2,516,1,2,523,8,1,576,1,1,576,1,2,636,1,2,643,8,1,696,1,1,696,1,2,756,1,2,763,8,1,816,1,1,816,1,2,876,1,2,883,8,1,936,1,1,936,1,2,996,1,2,1003,8,1,1056,1,1,1056,1,2,1116,1,1,1176,1,1,1236,1,1],"421":[337,1,1,404,8,1,457,1,1,457,1,2,517,1,2,524,8,1,577,1,1,577,1,2,637,1,2,644,8,1,697,1,1,697,1,2,757,1,2,764,8,1,817,1,1,817,1,2,877,1,2,884,8,1,937,1,1,937,1,2,997,1,2,1004,8,1,1057,1,1,1057,1,2,1117,1,1,1177,1,1,1237,1,1],"1298":[338,1,1,458,1,1,458,1,2,518,1,2,578,1,1,578,1,2,638,1,2,698,1,1,698,1,2,758,1,2,818,1,1,818,1,2,878,1,2,938,1,1,938,1,2,998,1,2,1058,1,1,1058,1,2,1118,1,1,1178,1,1,1238,1,1],"149":[339,1,1,459,1,1,459,1,2,519,1,2,579,1,1,579,1,2,639,1,2,699,1,1,699,1,2,759,1,2,819,1,1,819,1,2,879,1,2,939,1,1,939,1,2,999,1,2,1059,1,1,1059,1,2,1119,1,1,1179,1,1,1239,1,1],"158":[340,1,1,460,1,1,461,1,2,520,1,2,580,1,1,580,1,2,640,1,2,700,1,1,700,1,2,760,1,2,820,1,1,820,1,2,880,1,2,940,1,1,940,1,2,1000,1,2,1060,1,1,1060,1,2,1120,1,1,1180,1,1,1240,1,1],"170":[341,1,1,461,1,1,462,1,2,521,1,2,581,1,1,581,1,2,641,1,2,701,1,1,701,1,2,761,1,2,821,1,1,821,1,2,881,1,2,941,1,1,941,1,2,1001,1,2,1061,1,1,1061,1,2,1121,1,1,1181,1,1,1241,1,1],"112":[342,1,1,462,1,1,462,1,2,522,1,2,582,1,1,582,1,2,642,1,2,702,1,1,702,1,2,762,1,2,822,1,1,822,1,2,882,1,2,942,1,1,942,1,2,1002,1,2,1062,1,1,1062,1,2,1122,1,1,1182,1,1,1242,1,1],"423":[343,1,1,463,1,1,463,1,2,523,1,2,583,1,1,583,1,2,643,1,2,703,1,1,703,1,2,763,1,2,823,1,1,823,1,2,883,1,2,943,1,1,943,1,2,1003,1,2,1063,1,1,1063,1,2,1123,1,1,1183,1,1],"189":[343,1,1,463,1,1,463,1,2,523,1,2,583,1,1,583,1,2,643,1,2,703,1,1,703,1,2,763,1,2,823,1,1,823,1,2,883,1,2,943,1,1,943,1,2,1003,1,2,1063,1,1,1063,1,2,1123,1,1,1183,1,1],"682":[344,1,1,464,1,1,464,1,2,524,1,2,584,1,1,584,1,2,644,1,2,704,1,1,704,1,2,764,1,2,824,1,1,824,1,2,884,1,2,944,1,1,944,1,2,1004,1,2,1064,1,1,1064,1,2,1124,1,1,1184,1,1],"689":[345,1,1,405,8,1,465,1,1,465,1,2,525,1,2,525,8,1,585,1,1,585,1,2,645,1,2,645,8,1,705,1,1,705,1,2,765,1,2,765,8,1,825,1,1,825,1,2,885,1,2,885,8,1,945,1,1,945,1,2,1005,1,2,1005,8,1,1065,1,1,1065,1,2,1125,1,1,1185,1,1],"699":[345,1,1,405,8,1,465,1,1,465,1,2,525,1,2,525,8,1,585,1,1,585,1,2,645,1,2,645,8,1,705,1,1,705,1,2,765,1,2,765,8,1,825,1,1,825,1,2,885,1,2,885,8,1,945,1,1,945,1,2,1005,1,2,1005,8,1,1065,1,1,1065,1,2,1125,1,1,1185,1,1],"733":[346,1,1,407,8,1,466,1,1,466,1,2,526,1,2,527,8,1,586,1,1,586,1,2,646,1,2,647,8,1,706,1,1,706,1,2,766,1,2,767,8,1,826,1,1,826,1,2,886,1,2,887,8,1,946,1,1,946,1,2,1006,1,2,1007,8,1,1066,1,1,1066,1,2,1126,1,1,1186,1,1],"731":[347,1,1,407,8,1,467,1,1,467,1,2,527,1,2,527,8,1,587,1,1,587,1,2,647,1,2,647,8,1,707,1,1,707,1,2,767,1,2,767,8,1,827,1,1,827,1,2,887,1,2,887,8,1,947,1,1,947,1,2,1007,1,2,1007,8,1,1067,1,1,1067,1,2,1127,1,1,1187,1,1],"744":[347,1,1,407,8,1,467,1,1,467,1,2,527,1,2,527,8,1,587,1,1,587,1,2,647,1,2,647,8,1,707,1,1,707,1,2,767,1,2,767,8,1,827,1,1,827,1,2,887,1,2,887,8,1,947,1,1,947,1,2,1007,1,2,1007,8,1,1067,1,1,1067,1,2,1127,1,1,1187,1,1],"760":[348,1,1,408,8,1,468,1,1,468,1,2,528,1,2,528,8,1,588,1,1,588,1,2,648,1,2,648,8,1,708,1,1,708,1,2,768,1,2,768,8,1,828,1,1,828,1,2,888,1,2,888,8,1,948,1,1,948,1,2,1008,1,2,1008,8,1,1068,1,1,1068,1,2,1128,1,1,1188,1,1],"yk93":[349,1,1,409,8,1,469,1,1,469,1,2,529,1,2,529,8,1,589,1,1,589,1,2,649,1,2,649,8,1,709,1,1,709,1,2,769,1,2,769,8,1,829,1,1,829,1,2,889,1,2,889,8,1,949,1,1,949,1,2,1009,1,2,1009,8,1,1069,1,1,1069,1,2,1129,1,1,1189,1,1],"206":[350,1,1,410,8,1,470,1,1,470,1,2,530,1,2,530,8,1,590,1,1,590,1,2,650,1,2,650,8,1,710,1,1,710,1,2,770,1,2,770,8,1,830,1,1,830,1,2,890,1,2,890,8,1,950,1,1,950,1,2,1010,1,2,1010,8,1,1070,1,1,1070,1,2,1130,1,1,1190,1,1],"769":[350,1,1,410,8,1,470,1,1,470,1,2,530,1,2,530,8,1,590,1,1,590,1,2,650,1,2,650,8,1,710,1,1,710,1,2,770,1,2,770,8,1,830,1,1,830,1,2,890,1,2,890,8,1,950,1,1,950,1,2,1010,1,2,1010,8,1,1070,1,1,1070,1,2,1130,1,1,1190,1,1],"987684":[353,1,1,413,8,1,473,1,1,473,1,2,533,1,2,533,8,1,593,1,1,593,1,2,653,1,2,653,8,1,713,1,1,713,1,2,773,1,2,773,8,1,833,1,1,833,1,2,893,1,2,893,8,1,953,1,1,953,1,2,1013,1,2,1013,8,1,1073,1,1,1073,1,2,1133,1,1,1193,1,1],"987682":[354,1,1,414,8,1,474,1,1,474,1,2,534,1,2,534,8,1,594,1,1,594,1,2,654,1,2,654,8,1,714,1,1,714,1,2,774,1,2,774,8,1,834,1,1,834,1,2,894,1,2,894,8,1,954,1,1,954,1,2,1014,1,2,1014,8,1,1074,1,1,1074,1,2,1134,1,1,1194,1,1],"987685":[355,1,1,415,8,1,475,1,1,475,1,2,535,1,2,535,8,1,595,1,1,595,1,2,655,1,2,655,8,1,715,1,1,715,1,2,775,1,2,775,8,1,835,1,1,835,1,2,895,1,2,895,8,1,955,1,1,955,1,2,1015,1,2,1015,8,1,1075,1,1,1075,1,2,1135,1,1,1195,1,1],"3":[356,1,1,416,8,1,476,1,1,476,1,2,536,1,2,536,8,1,596,1,1,596,1,2,656,1,2,656,8,1,716,1,1,716,1,2,776,1,2,776,8,1,836,1,1,836,1,2,896,1,2,896,8,1,956,1,1,956,1,2,1016,1,2,1016,8,1,1076,1,1,1076,1,2,1136,1,1,1196,1,1],"987658":[357,1,1,417,8,1,477,1,1,477,1,2,537,1,2,537,8,1,597,1,1,597,1,2,657,1,2,657,8,1,717,1,1,717,1,2,777,1,2,777,8,1,837,1,1,837,1,2,897,1,2,897,8,1,957,1,1,957,1,2,1017,1,2,1017,8,1,1077,1,1,1077,1,2,1137,1,1,1197,1,1],"858":[358,1,1,418,8,1,478,1,1,478,1,2,538,1,2,538,8,1,598,1,1,598,1,2,658,1,2,658,8,1,718,1,1,718,1,2,778,1,2,778,8,1,838,1,1,838,1,2,898,1,2,898,8,1,958,1,1,958,1,2,1018,1,2,1018,8,1,1078,1,1,1078,1,2,1138,1,1,1198,1,1],"465":[376,8,1,436,1,1,496,8,1,497,1,2,556,1,1,557,1,2,616,8,1,617,1,2,676,1,1,677,1,2,736,8,1,737,1,2,796,1,1,797,1,2,856,8,1,857,1,2,916,1,1,917,1,2,976,8,1,977,1,2,1036,1,1,1037,1,2,1096,1,1,1156,1,1,1216,1,1],"5yn0":[378,8,1,438,1,1,498,8,1,499,1,2,558,1,1,559,1,2,618,8,1,619,1,2,678,1,1,679,1,2,738,8,1,739,1,2,798,1,1,799,1,2,858,8,1,859,1,2,918,1,1,919,1,2,978,8,1,979,1,2,1038,1,1,1039,1,2,1098,1,1,1158,1,1,1218,1,1],"1166":[379,8,1,439,1,1,499,8,1,500,1,2,559,1,1,560,1,2,619,8,1,620,1,2,679,1,1,680,1,2,739,8,1,740,1,2,799,1,1,800,1,2,859,8,1,860,1,2,919,1,1,920,1,2,979,8,1,980,1,2,1039,1,1,1040,1,2,1099,1,1,1159,1,1,1219,1,1],"1167":[379,8,1,439,1,1,499,8,1,501,1,2,559,1,1,561,1,2,619,8,1,621,1,2,679,1,1,681,1,2,739,8,1,741,1,2,799,1,1,801,1,2,859,8,1,861,1,2,919,1,1,921,1,2,979,8,1,981,1,2,1039,1,1,1041,1,2,1099,1,1,1159,1,1,1219,1,1],"597":[380,8,1,440,1,1,500,8,1,502,1,2,560,1,1,562,1,2,620,8,1,622,1,2,680,1,1,682,1,2,740,8,1,742,1,2,800,1,1,802,1,2,860,8,1,862,1,2,920,1,1,922,1,2,980,8,1,982,1,2,1040,1,1,1042,1,2,1100,1,1,1160,1,1,1220,1,1],"610":[381,8,1,441,1,1,501,8,1,503,1,2,561,1,1,563,1,2,621,8,1,623,1,2,681,1,1,683,1,2,741,8,1,743,1,2,801,1,1,803,1,2,861,8,1,863,1,2,921,1,1,923,1,2,981,8,1,983,1,2,1041,1,1,1043,1,2,1101,1,1,1161,1,1,1221,1,1],"456":[382,8,1,442,1,1,502,8,1,504,1,2,562,1,1,564,1,2,622,8,1,624,1,2,682,1,1,684,1,2,742,8,1,744,1,2,802,1,1,804,1,2,862,8,1,864,1,2,922,1,1,924,1,2,982,8,1,984,1,2,1042,1,1,1044,1,2,1102,1,1,1162,1,1,1222,1,1],"987680":[383,8,1,443,1,1,503,8,1,505,1,2,563,1,1,565,1,2,623,8,1,625,1,2,683,1,1,685,1,2,743,8,1,745,1,2,803,1,1,805,1,2,863,8,1,865,1,2,923,1,1,925,1,2,983,8,1,985,1,2,1043,1,1,1045,1,2,1103,1,1,1163,1,1,1223,1,1],"987681":[384,8,1,444,1,1,504,8,1,506,1,2,564,1,1,566,1,2,624,8,1,626,1,2,684,1,1,686,1,2,744,8,1,746,1,2,804,1,1,806,1,2,864,8,1,866,1,2,924,1,1,926,1,2,984,8,1,986,1,2,1044,1,1,1046,1,2,1104,1,1,1164,1,1,1224,1,1],"987683":[385,8,1,445,1,1,505,8,1,507,1,2,565,1,1,567,1,2,625,8,1,627,1,2,685,1,1,687,1,2,745,8,1,747,1,2,805,1,1,807,1,2,865,8,1,867,1,2,925,1,1,927,1,2,985,8,1,987,1,2,1045,1,1,1047,1,2,1105,1,1,1165,1,1,1225,1,1],"987686":[386,8,1,446,1,1,506,8,1,508,1,2,566,1,1,568,1,2,626,8,1,628,1,2,686,1,1,688,1,2,746,8,1,748,1,2,806,1,1,808,1,2,866,8,1,868,1,2,926,1,1,928,1,2,986,8,1,988,1,2,1046,1,1,1048,1,2,1106,1,1,1166,1,1,1226,1,1],"6p34":[388,8,1,448,1,1,508,8,1,509,1,2,568,1,1,569,1,2,628,8,1,629,1,2,688,1,1,689,1,2,748,8,1,749,1,2,808,1,1,809,1,2,868,8,1,869,1,2,928,1,1,929,1,2,988,8,1,989,1,2,1048,1,1,1049,1,2,1108,1,1,1168,1,1,1228,1,1],"1252":[388,8,1,449,1,1,508,8,1,509,1,2,569,1,1,569,1,2,628,8,1,629,1,2,689,1,1,689,1,2,748,8,1,749,1,2,809,1,1,809,1,2,868,8,1,869,1,2,929,1,1,929,1,2,988,8,1,989,1,2,1049,1,1,1049,1,2,1109,1,1,1169,1,1,1229,1,1],"657":[390,8,1,450,1,1,510,8,1,511,1,2,570,1,1,571,1,2,630,8,1,631,1,2,690,1,1,691,1,2,750,8,1,751,1,2,810,1,1,811,1,2,870,8,1,871,1,2,930,1,1,931,1,2,990,8,1,991,1,2,1050,1,1,1051,1,2,1110,1,1,1170,1,1,1230,1,1],"10001000":[392,8,1,452,1,1,512,1,2,512,8,1,572,1,1,572,1,2,632,1,2,632,8,1,692,1,1,692,1,2,752,1,2,752,8,1,812,1,1,812,1,2,872,1,2,872,8,1,932,1,1,932,1,2,992,1,2,992,8,1,1052,1,1,1052,1,2,1112,1,1,1172,1,1,1232,1,1],"1336":[393,8,1,453,1,1,513,1,2,513,8,1,573,1,1,573,1,2,633,1,2,633,8,1,693,1,1,693,1,2,753,1,2,753,8,1,813,1,1,813,1,2,873,1,2,873,8,1,933,1,1,933,1,2,993,1,2,993,8,1,1053,1,1,1053,1,2,1113,1,1,1173,1,1,1233,1,1],"1270":[392,8,1,512,8,1,632,8,1,752,8,1,872,8,1,992,8,1],"1271":[397,8,1,517,8,1,637,8,1,757,8,1,877,8,1,997,8,1],"1272":[398,8,1,518,8,1,638,8,1,758,8,1,878,8,1,998,8,1],"1273":[401,8,1,521,8,1,641,8,1,761,8,1,881,8,1,1001,8,1],"1274":[403,8,1,523,8,1,643,8,1,763,8,1,883,8,1,1003,8,1],"1287":[404,8,1,524,8,1,644,8,1,764,8,1,884,8,1,1004,8,1],"1288":[405,8,1,525,8,1,645,8,1,765,8,1,885,8,1,1005,8,1]};
/* ===== ptools.js ===== */
/* Haven FW web — Program tools (ported from the app's hidden ptools tab).
   Per-program "bring" checklist + personal notes, saved on this device.
   Loaded after app.js; uses its globals (PROGRAMS, escapeHtml, escapeAttr, goTab, toggleSidebar). */
let progToolsId = null;
function progToolsState() {
  try { return JSON.parse(localStorage.getItem('haven_ptools') || '{}'); }
  catch (e) { return {}; }
}
function saveProgToolsState(s) {
  try { localStorage.setItem('haven_ptools', JSON.stringify(s)); } catch (e) {}
}
function openProgTools(id) {
  progToolsId = id;
  document.querySelectorAll('nav button').forEach(x => x.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
  document.getElementById('tab-ptools').classList.add('active');
  renderPTools();
  if (typeof toggleSidebar === 'function') toggleSidebar();
  window.scrollTo(0, 0);
}
function renderPTools() {
  const list = (typeof PROGRAMS !== 'undefined' ? PROGRAMS : []);
  const p = list.find(x => x.id === progToolsId) || list[0];
  const el = document.getElementById('ptools-body');
  if (!el) return;
  if (!p) { el.innerHTML = '<p class="gdim">No programs available.</p>'; return; }
  const st = progToolsState()[p.id] || { bring: {}, notes: '' };
  const bring = (p.bring || []).map((b, i) =>
    `<label class="bringrow"><input type="checkbox" data-bring="${i}"${st.bring[i] ? ' checked' : ''}><span>${escapeHtml(b)}</span></label>`).join('');
  const nogo = (p.noGo || []).map(x => `<li>${escapeHtml(x)}</li>`).join('');
  const sched = (p.dayPlan || []).map(s =>
    `<li><b>${escapeHtml(s.t)}</b> — ${escapeHtml(s.what)}</li>`).join('');
  el.innerHTML =
    `<button class="sheet-btn" onclick="goTab('programs')">‹ Programs</button>` +
    `<div class="card" style="margin-top:10px"><h3>🏕️ ${escapeHtml(p.name)}</h3>` +
    `<div class="meta"><span class="badge">${escapeHtml(p.type)}</span>` +
    `<span class="badge">Ages ${escapeHtml(p.ages)}</span><span class="badge">Free</span>` +
    `<span class="badge">📍 ${escapeHtml(p.city)}</span></div>` +
    `<p class="gdim">Check off what you already have and jot down your own notes — saved on this device.</p></div>` +
    (bring ? `<div class="gsec">✅ My bring-checklist</div><div>${bring}</div>` : '') +
    (nogo ? `<div class="gsec">🚫 Not allowed</div><ul class="gsteps">${nogo}</ul>` : '') +
    (sched ? `<div class="gsec">⏱️ Daily schedule</div><ul class="gsteps">${sched}</ul>` : '') +
    `<div class="gsec">📝 My notes</div>` +
    `<textarea id="ptoolsNotes" class="txtin" rows="4" placeholder="Questions to ask, things to remember…">${escapeHtml(st.notes || '')}</textarea>` +
    `<p class="learn-note">Notes save automatically on this device.</p>` +
    `<div class="meta" style="margin-top:10px">` +
    (p.phoneHref ? `<a class="sheet-btn" href="tel:${escapeAttr(p.phoneHref)}">📞 ${escapeAttr(p.phone)}</a>` : '') +
    (p.web ? `<a class="sheet-btn" href="${escapeAttr(p.web)}" target="_blank" rel="noopener">🌐 Website</a>` : '') +
    (typeof p.lat === 'number' ? `<a class="sheet-btn" href="https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}" target="_blank">🗺️ Directions</a>` : '') +
    (typeof p.lat === 'number' ? `<a class="sheet-btn" href="https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}&travelmode=transit" target="_blank">🚌 Transit</a>` : '') +
    `</div>`;
  el.querySelectorAll('[data-bring]').forEach(cb => cb.addEventListener('change', () => {
    const all = progToolsState();
    const cur = all[p.id] || { bring: {}, notes: '' };
    cur.bring[cb.dataset.bring] = cb.checked;
    all[p.id] = cur;
    saveProgToolsState(all);
  }));
  const ta = el.querySelector('#ptoolsNotes');
  if (ta) ta.addEventListener('input', () => {
    const all = progToolsState();
    const cur = all[p.id] || { bring: {}, notes: '' };
    cur.notes = ta.value;
    all[p.id] = cur;
    saveProgToolsState(all);
  });
}

/* ===== showcard.js ===== */
/* Haven FW website — 🪧 Show-a-card (feature #34).
 * Ported from the app's "show a card" (app.js CARDS + more-features.js section 5).
 * Tap a phrase, hold the phone up to staff: big English text + big translation.
 * Extra languages: Español, Burmese (မြန်မာ), Arabic (العربية), Haitian Creole (Kreyòl),
 * Swahili (Kiswahili). Language choice persists in localStorage 'haven_cardlang'.
 * Loaded after app.js; uses its globals: escapeHtml. */
var SHOWCARD_EN = [
  "I need a bed tonight.",
  "I need food.",
  "I need an interpreter.",
  "I need medical help.",
  "I need to charge my phone.",
  "I need a bus pass.",
  "I need a shower.",
  "I need a ride.",
  "I need to make a phone call."
];
var SHOWCARD_ES = [
  "Necesito una cama esta noche.",
  "Necesito comida.",
  "Necesito un intérprete.",
  "Necesito ayuda médica.",
  "Necesito cargar mi teléfono.",
  "Necesito un pase de autobús.",
  "Necesito una ducha.",
  "Necesito transporte.",
  "Necesito hacer una llamada."
];
var SHOWCARD_LANGS = {
  es: { n: "Español", dir: "ltr" },
  my: { n: "မြန်မာ", dir: "ltr", t: ["ဒီည အိပ်ဖို့ ခုတင် လိုပါတယ်။", "အစားအစာ လိုပါတယ်။", "စကားပြန် လိုပါတယ်။", "ဆေးဘက်ဆိုင်ရာ အကူအညီ လိုပါတယ်။", "ဖုန်း အားသွင်းချင်ပါတယ်။", "ဘတ်စ်ကား လက်မှတ် လိုပါတယ်။", "ရေချိုးချင်ပါတယ်။", "သွားလာရေး အကူအညီ လိုပါတယ်။", "ဖုန်းခေါ်ချင်ပါတယ်။"] },
  ar: { n: "العربية", dir: "rtl", t: ["أحتاج إلى سرير الليلة.", "أحتاج إلى طعام.", "أحتاج إلى مترجم.", "أحتاج إلى مساعدة طبية.", "أحتاج إلى شحن هاتفي.", "أحتاج إلى تذكرة حافلة.", "أحتاج إلى الاستحمام.", "أحتاج إلى وسيلة نقل.", "أحتاج إلى إجراء مكالمة هاتفية."] },
  ht: { n: "Kreyòl", dir: "ltr", t: ["Mwen bezwen yon kabann aswè a.", "Mwen bezwen manje.", "Mwen bezwen yon entèprèt.", "Mwen bezwen èd medikal.", "Mwen bezwen chaje telefòn mwen.", "Mwen bezwen yon tikè bis.", "Mwen bezwen pran yon douch.", "Mwen bezwen transpò.", "Mwen bezwen fè yon apèl telefòn."] },
  sw: { n: "Kiswahili", dir: "ltr", t: ["Ninahitaji kitanda usiku wa leo.", "Ninahitaji chakula.", "Ninahitaji mkalimani.", "Ninahitaji msaada wa matibabu.", "Ninahitaji kuchaji simu yangu.", "Ninahitaji tiketi ya basi.", "Ninahitaji kuoga.", "Ninahitaji usafiri.", "Ninahitaji kupiga simu."] }
};
function cardGetLang() {
  try {
    const l = localStorage.getItem('haven_cardlang');
    if (l && SHOWCARD_LANGS[l]) return l;
  } catch (e) {}
  return 'es';
}
function cardSetLang(l) {
  if (!SHOWCARD_LANGS[l]) return;
  try { localStorage.setItem('haven_cardlang', l); } catch (e) {}
}
function cardSecondText(i, lang) {
  if (lang === 'es') return SHOWCARD_ES[i];
  const L = SHOWCARD_LANGS[lang];
  return (L && L.t && L.t[i]) || '';
}
function closeShowCard() {
  const o = document.getElementById('cardOv');
  if (o) o.remove();
}
function showCard(i) {
  i = Number(i);
  if (!Number.isInteger(i) || i < 0 || i >= SHOWCARD_EN.length) return;
  closeShowCard();
  const ov = document.createElement('div');
  ov.id = 'cardOv';
  let lang = cardGetLang();
  const esc = (typeof escapeHtml === 'function') ? escapeHtml : (s => String(s));
  function draw() {
    const L = SHOWCARD_LANGS[lang] || SHOWCARD_LANGS.es;
    const chips = Object.keys(SHOWCARD_LANGS).map(k =>
      '<button data-l="' + k + '" class="' + (k === lang ? 'on' : '') + '">' + esc(SHOWCARD_LANGS[k].n) + '</button>'
    ).join('');
    ov.innerHTML = '<div class="cardOvIn">' +
      '<div class="cardBig">' + esc(SHOWCARD_EN[i]) + '</div>' +
      '<div class="cardBig sm" dir="' + L.dir + '">' + esc(cardSecondText(i, lang)) + '</div>' +
      '<div class="cardLangs">' + chips + '</div>' +
      '<button class="cardClose" data-x="1">✕ Close</button></div>';
    ov.querySelectorAll('[data-l]').forEach(b => b.addEventListener('click', e => {
      e.stopPropagation();
      lang = b.dataset.l;
      cardSetLang(lang);
      draw();
    }));
    const x = ov.querySelector('[data-x]');
    if (x) x.addEventListener('click', e => { e.stopPropagation(); closeShowCard(); });
  }
  ov.addEventListener('click', () => closeShowCard());
  draw();
  document.body.appendChild(ov);
}
function closeCardPicker() {
  const o = document.getElementById('cardPick');
  if (o) o.remove();
}
function openCardPicker() {
  closeCardPicker();
  const lang = cardGetLang();
  const esc = (typeof escapeHtml === 'function') ? escapeHtml : (s => String(s));
  const ov = document.createElement('div');
  ov.id = 'cardPick';
  ov.innerHTML = '<div class="cardPickIn"><h2>🪧 Show a card</h2>' +
    '<p class="cardPickSub">Tap one, then show your phone to staff.</p>' +
    SHOWCARD_EN.map((c, i) =>
      '<button class="cardOpt" data-c="' + i + '">' + esc(c) +
      '<small>' + esc(cardSecondText(i, lang)) + '</small></button>'
    ).join('') +
    '<button class="cardClose" id="cardPickX">✕ Close</button></div>';
  ov.querySelectorAll('[data-c]').forEach(b => b.addEventListener('click', () => {
    const i = Number(b.dataset.c);
    closeCardPicker();
    showCard(i);
  }));
  const x = ov.querySelector('#cardPickX');
  if (x) x.addEventListener('click', () => closeCardPicker());
  document.body.appendChild(ov);
}
window._showcardApi = {
  SHOWCARD_EN, SHOWCARD_ES, SHOWCARD_LANGS,
  cardGetLang, cardSetLang, cardSecondText,
  showCard, openCardPicker, closeShowCard, closeCardPicker
};

/* ===== foodday.js ===== */
/* Haven FW website — 📅 Food by day (feature #35).
 * Ported from the app's openFoodByDay (app.js extras section).
 * Day-picker overlay: food/meals places open on a chosen day, sorted by
 * opening time. Area-aware (uses placesInArea). Tap a row to open the
 * place's detail sheet.
 * Loaded after app.js; uses its globals: placesInArea, escapeHtml,
 * goTab, showSheet, openBadge, PIN_EMOJI. */
var FOODDAY_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function fdToMin(x) {
  x = +x;
  if (!(x >= 0)) return null;
  if (x > 1440) x = Math.floor(x / 100) * 60 + (x % 100); // HHMM -> minutes
  return (x >= 0 && x <= 1440) ? x : null;
}
function fdDayHours(r, day) {
  const h = r && r.hours;
  if (!h || typeof h !== 'object') return null;
  let v = h[day];
  if (v === undefined && day === 0) v = h[7]; // Sunday fallback, like isOpenNow
  if (!Array.isArray(v) || v.length !== 2) return null;
  const o = fdToMin(v[0]), c = fdToMin(v[1]);
  if (o === null || c === null || c <= o) return null;
  return [o, c];
}
function fdFmtT(m) {
  let h = Math.floor(m / 60), mm = m % 60;
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12; if (h === 0) h = 12;
  return h + ':' + String(mm).padStart(2, '0') + ' ' + ap;
}
function fdEmoji(r) {
  try {
    const c = (r.cats || [])[0];
    if (typeof PIN_EMOJI !== 'undefined' && PIN_EMOJI && PIN_EMOJI[c]) return PIN_EMOJI[c];
  } catch (e) {}
  return '🍽️';
}
function closeFoodDay() {
  const o = document.getElementById('foodday-ov');
  if (o) o.remove();
}
function openFoodDay() {
  closeFoodDay();
  let sel = new Date().getDay();
  const ov = document.createElement('div');
  ov.id = 'foodday-ov';
  ov.innerHTML = '<div id="foodday-in"><h2>📅 Food by day</h2>' +
    '<p class="finder-sub">Meal times for each day, earliest first. <b>Call first to confirm.</b></p>' +
    '<div class="finder-chips" id="fd-days"></div>' +
    '<div class="finder-sub" id="fd-count"></div><div id="fd-res"></div>' +
    '<button class="sheet-btn" id="fd-x" style="margin-top:12px;width:100%;">✕ Close</button></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click', function (e) { if (e.target === ov) closeFoodDay(); });
  ov.querySelector('#fd-x').addEventListener('click', closeFoodDay);
  const esc = (typeof escapeHtml === 'function') ? escapeHtml : function (s) { return String(s); };
  const draw = function () {
    ov.querySelector('#fd-days').innerHTML = FOODDAY_DAYS.map(function (d, i) {
      return '<button class="filter-btn' + (i === sel ? ' active' : '') + '" data-d="' + i + '">' + d + '</button>';
    }).join('');
    const list = placesInArea().map(function (r) { return { r: r, hh: fdDayHours(r, sel) }; })
      .filter(function (x) {
        return x.hh && ((x.r.cats || []).includes('food') || (x.r.cats || []).includes('meals'));
      })
      .sort(function (a, b) { return a.hh[0] - b.hh[0]; });
    const today = sel === new Date().getDay();
    ov.querySelector('#fd-count').textContent = list.length + ' places serving ' + FOODDAY_DAYS[sel] + (today ? ' (today)' : '');
    const box = ov.querySelector('#fd-res');
    box.innerHTML = list.map(function (x, i) {
      return '<button class="finder-row" data-i="' + i + '"><span class="fi">' + fdEmoji(x.r) + '</span>' +
        '<span class="fb"><b>' + esc(x.r.name) + '</b><small>🕒 ' + fdFmtT(x.hh[0]) + ' – ' + fdFmtT(x.hh[1]) +
        (x.r.addr ? ' · ' + esc(x.r.addr) : '') + '</small></span>' +
        (today && typeof openBadge === 'function' ? openBadge(x.r) : '') + '</button>';
    }).join('') || '<p class="finder-sub">Nothing listed for this day.</p>';
    ov.querySelectorAll('[data-d]').forEach(function (b) {
      b.addEventListener('click', function () { sel = +b.getAttribute('data-d'); draw(); });
    });
    box.querySelectorAll('[data-i]').forEach(function (b) {
      b.addEventListener('click', function () {
        const r = list[+b.getAttribute('data-i')].r;
        closeFoodDay();
        if (typeof goTab === 'function') goTab('map');
        if (typeof showSheet === 'function') showSheet(r);
      });
    });
  };
  draw();
}
window._fooddayApi = {
  FOODDAY_DAYS: FOODDAY_DAYS, fdToMin: fdToMin, fdDayHours: fdDayHours,
  fdFmtT: fdFmtT, fdEmoji: fdEmoji, openFoodDay: openFoodDay, closeFoodDay: closeFoodDay
};

/* ===== modes.js ===== */
/* Haven FW modes.js - display modes (icon-first + high contrast). Split out of
   app.js so the app.js push stays under the github single-arg size limit. */
/* Feature #36: display modes (icon-first + high contrast), ported from the app's
   more-features.js section 7. Same localStorage key 'haven_plus' as the app, so the
   preference carries over conceptually. Meal/daily alerts are ported separately in
   alerts.js (feature #42, web-Notification versions of the native reminders);
   setPlus merge-writes so toggling display modes never wipes the alert keys. */
function getPlus(){try{const p=JSON.parse(localStorage.getItem('haven_plus')||'{}')||{};return{icon:!!p.icon,hc:!!p.hc};}catch(e){return{icon:false,hc:false};}}
/* Merge-write (feature #42 fix): the old setPlus rewrote haven_plus with ONLY
   icon/hc, silently wiping the meal/daily alert keys that share this store.
   Now it reads the stored object first and only assigns its own keys. */
function setPlus(p){try{const cur=JSON.parse(localStorage.getItem('haven_plus')||'{}')||{};cur.icon=!!p.icon;cur.hc=!!p.hc;localStorage.setItem('haven_plus',JSON.stringify(cur));}catch(e){}}
function applyPlus(){try{const p=getPlus();document.body.classList.toggle('iconfirst',p.icon);document.body.classList.toggle('hc',p.hc);const ib=document.getElementById('plus-icon-btn');if(ib)ib.textContent='🖼️ Icon-first: '+(p.icon?'On':'Off');const hb=document.getElementById('plus-hc-btn');if(hb)hb.textContent='🌗 High contrast: '+(p.hc?'On':'Off');}catch(e){}}
function togglePlus(k){const p=getPlus();p[k]=!p[k];setPlus(p);applyPlus();}
applyPlus();

/* ===== pluscats.js ===== */
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

/* ===== tagfilter.js ===== */
/* Haven FW website — 🏷️ Tag filter sheet (feature #39).
 * Ported from the Android app's plus-ui.js: a bottom-sheet tag filter that sits on top
 * of the category/search/open-now filters. Tap a tag chip to include it; Match-any vs
 * Match-all segmented control; tag search with 150ms debounce; Clear + "Show N places".
 * Entry points: 🏷️ button on the map overlay (below the 🕐 open-now toggle) and a TAGS
 * section in the filter panel (the site analogue of the app's Categories panel button).
 * Hooks into app.js render(): render() applies window._tagActive/_tagMatch to its list
 * (one-line guarded insertion there), and render is wrapped here to refresh the 🏷️
 * count badges. Loaded after app.js; needs its globals: placesInArea, activeCats,
 * activeQ, isOpenNow, escapeHtml, escapeAttr, render. English-only per site convention. */
var tfTags = [];
var tfAll = false;
var tfQ = "";
var tfDeb = null, tfLast = "";

function tfNorm(s) { return String(s || "").toLowerCase().trim(); }
/* Skip audit noise + overly long tags, same rule as the app */
function tfSkip(s) { return /^verified/i.test(s) || /days old/i.test(s) || s.length > 32; }

function tfActive() { return tfTags.length > 0; }
function tfMatch(r) {
  if (!tfTags.length) return true;
  const tg = (r.tags || []).map(tfNorm);
  return tfAll ? tfTags.every(x => tg.indexOf(x) >= 0) : tfTags.some(x => tg.indexOf(x) >= 0);
}
window._tagActive = tfActive;
window._tagMatch = tfMatch;

/* Base list: the app's pipeline minus tags (area + categories + open-now + search) */
function tfBaseList() {
  let list = (typeof placesInArea === "function") ? placesInArea() : [];
  const cats = (typeof activeCats === "function") ? activeCats() : [];
  if (cats.length) list = list.filter(r => (r.cats || []).some(c => cats.indexOf(c) >= 0));
  if (typeof openNow !== "undefined" && openNow && typeof isOpenNow === "function")
    list = list.filter(r => isOpenNow(r));
  const q = tfNorm((typeof activeQ === "function") ? activeQ() : "");
  if (q) list = list.filter(r => ((r.name || "") + " " + (r.desc || "") + " " + (r.addr || "")).toLowerCase().indexOf(q) >= 0);
  return list;
}

function tfCounts() {
  const m = {};
  tfBaseList().forEach(r => (r.tags || []).forEach(t => {
    t = tfNorm(t); if (t && !tfSkip(t)) m[t] = (m[t] || 0) + 1;
  }));
  tfTags.forEach(t => { if (!m[t]) m[t] = 0; });
  return Object.entries(m).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
}

function tfRefresh() {
  if (typeof render === "function") render(activeCats(), activeQ());
  tfUpdateBtns();
}

function tfUpdateBtns() {
  const n = tfTags.length;
  const badge = n ? ' <span class="catn">' + n + "</span>" : "";
  document.querySelectorAll(".tagbtn").forEach(b => {
    if (b.classList.contains("tagbtn-map")) b.innerHTML = "🏷️" + badge;
    else b.innerHTML = "🏷️ Filter by tags" + badge;
  });
}

function tfEnsureSheet() {
  if (document.getElementById("tagSheet")) return;
  const sc = document.createElement("div");
  sc.id = "tagScrim";
  sc.addEventListener("click", tfClose);
  const sh = document.createElement("div");
  sh.id = "tagSheet";
  sh.setAttribute("aria-label", "Filter by tags");
  sh.innerHTML =
    '<div class="grab"></div>' +
    '<div class="thead"><h2>🏷️ Filter by tags</h2><button class="iconbtn" id="tagClose" aria-label="Close">✕</button></div>' +
    '<div class="tsearch"><span class="mag">🔍</span><input id="tagQ" type="search" autocomplete="off" placeholder="Search tags… (veterans, seniors, no ID)"><button class="iconbtn" id="tagQClear" aria-label="Clear search" style="display:none">✕</button></div>' +
    '<div class="topts"><div class="seg" id="tagMode"><button id="tagModeAny" data-m="any">Match any</button><button id="tagModeAll" data-m="all">Match all</button></div><button class="tclear" id="tagClear">Clear</button></div>' +
    '<div class="tchips" id="tagChips"></div>' +
    '<button class="widebtn tdone" id="tagDone">Show places</button>';
  document.body.appendChild(sc);
  document.body.appendChild(sh);
  sh.querySelector("#tagClose").addEventListener("click", tfClose);
  sh.querySelector("#tagDone").addEventListener("click", tfClose);
  sh.querySelector("#tagClear").addEventListener("click", () => { tfTags = []; tfDraw(); tfRefresh(); });
  const qIn = sh.querySelector("#tagQ"), qClear = sh.querySelector("#tagQClear");
  qIn.addEventListener("input", () => {
    const v = tfNorm(qIn.value);
    qClear.style.display = qIn.value ? "flex" : "none";
    if (v === tfLast) return;
    tfQ = v;
    if (tfDeb) clearTimeout(tfDeb);
    tfDeb = setTimeout(() => { tfDeb = null; tfLast = v; tfDraw(); }, 150);
  });
  qClear.addEventListener("click", () => {
    if (tfDeb) { clearTimeout(tfDeb); tfDeb = null; }
    qIn.value = ""; tfQ = ""; tfLast = ""; qClear.style.display = "none"; tfDraw(); qIn.focus();
  });
  ["tagModeAny", "tagModeAll"].forEach(id => {
    const b = sh.querySelector("#" + id);
    if (b) b.addEventListener("click", () => { tfAll = b.dataset.m === "all"; tfDraw(); tfRefresh(); });
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") tfClose();
  });
}

function tfDraw() {
  const sh = document.getElementById("tagSheet"); if (!sh) return;
  const mb = [sh.querySelector("#tagModeAny"), sh.querySelector("#tagModeAll")].filter(Boolean);
  mb.forEach(b => b.classList.toggle("on", (b.dataset.m === "all") === tfAll));
  const all = tfCounts();
  const counts = {};
  all.forEach(([t, n]) => { counts[t] = n; });
  let shown = all.filter(([t]) => tfTags.indexOf(t) < 0 && (!tfQ || t.indexOf(tfQ) >= 0));
  shown = shown.slice(0, tfQ ? 80 : 50);
  const chip = (t, n, on) =>
    '<button class="tchip' + (on ? " on" : "") + '" data-t="' + encodeURIComponent(t) + '">' +
    (on ? "✓ " : "") + escapeHtml(t.charAt(0).toUpperCase() + t.slice(1)) + " <i>" + n + "</i></button>";
  let h = tfTags.map(t => chip(t, counts[t] || 0, true)).join("");
  h += shown.map(([t, n]) => chip(t, n, false)).join("");
  if (!h) h = '<p class="tnone">No tags match.</p>';
  const box = sh.querySelector("#tagChips");
  box.innerHTML = h;
  box.querySelectorAll(".tchip").forEach(b => b.addEventListener("click", () => {
    const t = decodeURIComponent(b.dataset.t), i = tfTags.indexOf(t);
    if (i >= 0) tfTags.splice(i, 1); else tfTags.push(t);
    tfDraw(); tfRefresh();
  }));
  const n = tfBaseList().filter(tfMatch).length;
  sh.querySelector("#tagDone").textContent = "Show " + n + " place" + (n === 1 ? "" : "s");
}

function openTags(prefill) {
  tfEnsureSheet();
  tfQ = prefill ? tfNorm(prefill) : "";
  const qi = document.getElementById("tagQ");
  if (qi) { qi.value = tfQ; tfLast = tfQ; }
  tfDraw();
  document.getElementById("tagScrim").classList.add("show");
  document.getElementById("tagSheet").classList.add("show");
}
function tfClose() {
  const a = document.getElementById("tagScrim"), b = document.getElementById("tagSheet");
  if (a) a.classList.remove("show");
  if (b) b.classList.remove("show");
}
function closeTags() { tfClose(); }

/* ---- entry buttons ---- */
(function tfMount() {
  /* Map overlay button, below the 🕐 open-now toggle */
  const wrap = document.getElementById("map-wrap");
  const openT = document.getElementById("map-open-toggle");
  if (wrap && !document.getElementById("tagBtnMap")) {
    const b = document.createElement("button");
    b.id = "tagBtnMap";
    b.className = "tagbtn tagbtn-map";
    b.setAttribute("aria-label", "Filter by tags");
    b.style.cssText = "position:absolute;top:172px;right:10px;z-index:500;width:44px;height:44px;border:1px solid #333;border-radius:12px;background:rgba(26,31,46,0.95);color:#7c8aff;font-size:18px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;";
    b.innerHTML = "🏷️";
    b.addEventListener("click", () => openTags());
    wrap.appendChild(b);
  }
  /* TAGS section in the filter panel, after CATEGORIES */
  const sf = document.getElementById("sidebar-filters");
  if (sf && !document.getElementById("tagBtnPanel")) {
    const h = document.createElement("h3");
    h.textContent = "TAGS";
    h.style.cssText = "color:#888;font-size:12px;margin:16px 0 8px;";
    const b = document.createElement("button");
    b.id = "tagBtnPanel";
    b.className = "tagbtn tagbtn-wide";
    b.innerHTML = "🏷️ Filter by tags";
    b.addEventListener("click", () => { toggleFilterPanel(); openTags(); });
    sf.insertAdjacentElement("afterend", h);
    h.insertAdjacentElement("afterend", b);
  }
  tfUpdateBtns();
})();

/* ---- hook into render(): refresh 🏷️ count badges after every render ---- */
(function tfHookRender() {
  if (typeof render === "function" && !render._tagHooked) {
    const base = render;
    const wrapped = function (cats, q) { base(cats, q); tfUpdateBtns(); };
    wrapped._tagHooked = true;
    render = wrapped;
  }
})();

/* test api */
window._tagApi = { norm: tfNorm, skip: tfSkip, counts: tfCounts, match: tfMatch, active: tfActive, draw: tfDraw, ensure: tfEnsureSheet, close: tfClose, updateBtns: tfUpdateBtns, baseList: tfBaseList };

/* ===== parks.js ===== */
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

/* ===== alerts.js ===== */
/* Haven FW alerts.js — meal + daily alerts (web-Notification port of the app's
   more-features.js section 7 alerts).
   Feature #42. Loaded after app.js; uses its globals: favIds, miniToast,
   requestNotifPerm, allPlaces/RESOURCES. No IIFE (site module convention).
   Same localStorage key 'haven_plus' as the app; merge-read/write so the
   display-mode keys (icon/hc, owned by modes.js) are never clobbered.
   The app used the Android native bridge (HavenBridge.scheduleReminder) to
   schedule these; on the web they fire from the 30s poll (same pattern as
   meds.js checkMeds): once per day per place/hour. */
var ALERT_TIPS = [
  "Charge your phone whenever you can. Libraries, missions and many stores have outlets.",
  "Take a photo of your ID and important papers and keep it safe.",
  "Call before you go. Hours change, and a short call saves a trip.",
  "Drink water, even in winter. It helps you think and stay well.",
  "Ask for help early. Staff at missions and day centers want to help.",
  "One small step a day adds up. Pick one thing in My Plan today.",
  "Keep a list of phone numbers on paper in case your phone dies.",
  "Sleep and a hot meal make everything easier. Don't skip them.",
  "Wear layers in cold weather. Dry socks matter more than a heavy coat.",
  "Bring a pen. You'll fill out forms almost everywhere.",
  "Save your bus pass or fare in a safe pocket, not your bag.",
  "If you're asked for an address, ask the mission whether you can use theirs for mail.",
  "Be kind to yourself. Hard days don't erase your progress.",
  "Ask about free dental, vision and clothing. Many places don't advertise it."
];
var AL_LEADS = [30, 45, 60];
var AL_HOURS = [8, 9, 12, 18];
function alDayKey(d) {
  d = d || new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
/* Merge-read: app defaults, unknown keys (incl. icon/hc) preserved via alSave. */
function alPlus() {
  var p = {};
  try { p = JSON.parse(localStorage.getItem('haven_plus') || '{}') || {}; } catch (e) { p = {}; }
  return {
    meal: !!p.meal,
    lead: AL_LEADS.indexOf(p.lead) >= 0 ? p.lead : 45,
    daily: !!p.daily,
    hour: AL_HOURS.indexOf(p.hour) >= 0 ? p.hour : 9,
    fired: (p.fired && typeof p.fired === 'object') ? p.fired : {}
  };
}
function alSave(p) {
  var cur = {};
  try { cur = JSON.parse(localStorage.getItem('haven_plus') || '{}') || {}; } catch (e) { cur = {}; }
  cur.meal = !!p.meal; cur.lead = p.lead; cur.daily = !!p.daily; cur.hour = p.hour; cur.fired = p.fired || {};
  try { localStorage.setItem('haven_plus', JSON.stringify(cur)); } catch (e) {}
}
function alFmt(m) {
  var hh = Math.floor(m / 60), mm = m % 60, ap = hh >= 12 ? 'PM' : 'AM', h12 = hh % 12 || 12;
  return h12 + ':' + String(mm).padStart(2, '0') + ' ' + ap;
}
/* Today's [openMin, closeMin] from the structured hours dict — same parsing
   and normalization as app.js isOpenNow (Sunday key-7 fallback, HHMM>1440). */
function alHoursToday(r) {
  var h = r && r.hours;
  if (!h || typeof h !== 'object') return null;
  var day = new Date().getDay(), v = h[day];
  if (v === undefined && day === 0) v = h[7];
  if (!Array.isArray(v) || v.length !== 2 || typeof v[0] !== 'number' || typeof v[1] !== 'number') return null;
  var o = v[0], c = v[1];
  if (o > 1440 || c > 1440) { var conv = function (x) { return Math.floor(x / 100) * 60 + (x % 100); }; o = conv(o); c = conv(c); }
  if (!(o >= 0 && c > o && c <= 1440)) return null;
  return [o, c];
}
function alNotify(title, body) {
  try {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(title, { body: body });
    } else if (typeof miniToast === 'function') {
      miniToast(title + ' — ' + body);
    }
  } catch (e) { try { if (typeof miniToast === 'function') miniToast(title + ' — ' + body); } catch (e2) {} }
}
function alPlaceByKey(fk) {
  var list = (typeof allPlaces !== 'undefined' && allPlaces && allPlaces.length) ? allPlaces :
    ((typeof RESOURCES !== 'undefined' && RESOURCES) ? RESOURCES : []);
  for (var i = 0; i < list.length; i++) {
    var r = list[i];
    if ((r.id || r.name) === fk) return r;
  }
  return null;
}
/* Meal alerts: for each saved place with structured hours, fire once per day
   when we are inside [open-lead, open). (App: native reminder at open-lead.) */
function checkMealAlerts() {
  var p = alPlus();
  if (!p.meal) return;
  var now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes(), dk = alDayKey(now), changed = false;
  var favs = (typeof favIds === 'function') ? favIds() : [];
  for (var i = 0; i < favs.length; i++) {
    var r = alPlaceByKey(favs[i]);
    if (!r) continue;
    var hc = alHoursToday(r);
    if (!hc) continue;
    var o = hc[0];
    if (nowMin >= o - p.lead && nowMin < o) {
      var key = 'meal_' + favs[i] + '_' + dk;
      if (!p.fired[key]) {
        p.fired[key] = 1; changed = true;
        alNotify('🍽️ ' + (r.name || 'Saved place') + ' opens at ' + alFmt(o), 'Haven FW');
      }
    }
  }
  if (changed) alSave(p);
}
/* Daily encouragement: one tip per day at/after the chosen hour.
   Tip rotation matches the app: TIPS[floor(day/86400000) % TIPS.length]. */
function checkDailyAlert(nowDate) {
  var p = alPlus();
  if (!p.daily) return;
  var now = nowDate || new Date(), dk = alDayKey(now), key = 'daily_' + dk;
  if (p.fired[key]) return;
  if (now.getHours() * 60 + now.getMinutes() < p.hour * 60) return;
  p.fired[key] = 1; alSave(p);
  var tip = ALERT_TIPS[Math.floor(now.getTime() / 86400000) % ALERT_TIPS.length];
  alNotify("🌱 Haven: today's encouragement", tip);
}
function checkAlerts() {
  try { checkMealAlerts(); } catch (e) {}
  try { checkDailyAlert(); } catch (e) {}
}
function toggleAlertMeal() {
  var p = alPlus(); p.meal = !p.meal; alSave(p);
  if (p.meal && typeof requestNotifPerm === 'function') requestNotifPerm();
  alRenderCard();
}
function setAlertLead(m) {
  if (AL_LEADS.indexOf(m) < 0) return;
  var p = alPlus(); p.lead = m; alSave(p); alRenderCard();
}
function toggleAlertDaily() {
  var p = alPlus(); p.daily = !p.daily; alSave(p);
  if (p.daily && typeof requestNotifPerm === 'function') requestNotifPerm();
  alRenderCard();
}
function setAlertHour(h) {
  if (AL_HOURS.indexOf(h) < 0) return;
  var p = alPlus(); p.hour = h; alSave(p); alRenderCard();
}
/* Sync the Settings card: toggle labels + selected lead/hour chips. Null-DOM safe. */
function alRenderCard() {
  try {
    var p = alPlus();
    var mb = (typeof document !== 'undefined') ? document.getElementById('alert-meal-btn') : null;
    if (mb) mb.textContent = '🍽️ Opening alerts: ' + (p.meal ? 'On' : 'Off');
    var db = (typeof document !== 'undefined') ? document.getElementById('alert-daily-btn') : null;
    if (db) db.textContent = '🌱 Daily encouragement: ' + (p.daily ? 'On' : 'Off');
    if (typeof document === 'undefined' || !document.querySelectorAll) return;
    document.querySelectorAll('.al-chip[data-lead]').forEach(function (el) {
      el.classList.toggle('on', +el.getAttribute('data-lead') === p.lead);
    });
    document.querySelectorAll('.al-chip[data-hour]').forEach(function (el) {
      el.classList.toggle('on', +el.getAttribute('data-hour') === p.hour);
    });
  } catch (e) {}
}
function alertsWire() {
  alRenderCard();
  checkAlerts();
}
if (typeof document !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', alertsWire);
} else if (typeof document !== 'undefined') {
  alertsWire();
}
try { setInterval(checkAlerts, 30000); } catch (e) {}
/* Test hook (vm). */
try { window._alertsApi = { alPlus: alPlus, alSave: alSave, alFmt: alFmt, alHoursToday: alHoursToday, checkMealAlerts: checkMealAlerts, checkDailyAlert: checkDailyAlert, toggleAlertMeal: toggleAlertMeal, setAlertLead: setAlertLead, toggleAlertDaily: toggleAlertDaily, setAlertHour: setAlertHour, alRenderCard: alRenderCard, ALERT_TIPS: ALERT_TIPS }; } catch (e) {}

/* ===== phonelines.js ===== */
/* Haven FW website: "More numbers to call" phone-lines list under the hotlines
   on the Help tab. Ports the app's guide-add.js HAVEN_PHONELINES + the
   guide-add-ui.js phonelines fill(). Fort Wayne-local numbers only, so the
   section is hidden when the Portland area is active (same rule as the app's
   Fort Wayne-only donators button). */
(function () {
  "use strict";

  /* Data verified 2026-10-17 by the app-side pass (guide-add.js):
     Countilink was a defunct 2013 bus service - the card now dials the
     Allen County Council on Aging (senior transportation), which the
     260-424-2010 number actually reaches. */
  window.HAVEN_PHONELINES = [
    { name: "Empower Works", desc: "Employment help — listed in the Rescue Mission guide. Call for details", href: "tel:+12604085210", icon: "💼" },
    { name: "Allen County Council on Aging — Transportation", desc: "Senior transportation in Allen County — call for service area, fares and how to book", href: "tel:+12604242010", icon: "🚐" },
    { name: "Field of Dreams (youth transitional housing)", desc: "Transitional housing for youth — call to ask about openings", href: "tel:+12606002836", icon: "🏠" },
    { name: "YMCA Youth Services Bureau — Safe Place", desc: "Help for homeless youth. Call 260-449-7511, or text SAFE and your location to 44357", href: "tel:+12604497511", icon: "🧑‍🎓" },
    { name: "Women's Care Center hotline (Español/English)", desc: "Pregnancy help hotline in Spanish and English", href: "tel:+15742342341", icon: "🤱" },
    { name: "La Leche League of Indiana", desc: "Breastfeeding support and Fort Wayne groups", href: "tel:+12602556574", icon: "🍼" },
    { name: "Fertility Care Specialist of NE Indiana", desc: "146 N Rufus St, New Haven — call for services and costs", href: "tel:+12604946444", icon: "🩺" },
    { name: "Allen County Healthy Homes Program", desc: "2242 Carroll Rd — home health and safety help. Lead screening: 260-449-7504", href: "tel:+12604497504", icon: "🏡" },
    { name: "Purdue Extension — Allen County", desc: "4001 Crescent Ave — nutrition, gardening and family classes", href: "tel:+12604816826", icon: "🌱" },
    { name: "Multi-County Medical Outreach Clinic", desc: "885 Connexion Way, Columbia City (formerly Wolf Lake Free Health Clinic) — free clinic. Call for hours", href: "tel:+12605641946", icon: "🩺" },
    { name: "Park Center — other sites", desc: "1909 Carew St and 2710 Lake Ave: call 260-373-8000", href: "tel:+12603738000", icon: "🧠" },
    { name: "New Hope Farms", desc: "Food listing at 2715 Brooklyn Ave — no phone given. Tap to open the address in Maps", href: "geo:0,0?q=2715%20Brooklyn%20Ave%2C%20Fort%20Wayne%2C%20IN", icon: "🥕" },
    { name: "Indiana Free Legal Answers", desc: "Ask a volunteer attorney a civil legal question online, free if you qualify (no criminal cases)", href: "https://indiana.freelegalanswers.org/", icon: "⚖️" }
  ];

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* Label for the tap link: phone number for tel:, "Open" for web, "Map" for geo:. */
  function plLabel(href) {
    if (typeof href !== "string") return "Open";
    if (href.indexOf("tel:") === 0) {
      var d = href.slice(4).replace(/^\+1/, "").replace(/[^0-9]/g, "");
      if (d.length === 10) return "📞 " + d.slice(0, 3) + "-" + d.slice(3, 6) + "-" + d.slice(6);
      return "📞 Call";
    }
    if (/^https?:/.test(href)) return "Open ↗";
    if (href.indexOf("geo:") === 0) return "🗺️ Map";
    return "Open";
  }

  function renderPhonelines() {
    var el = document.getElementById("phonelines");
    if (!el) return;
    var fw = typeof getArea === "function" ? getArea() === "fort-wayne" : true;
    if (!fw) { el.innerHTML = ""; return; }
    var list = window.HAVEN_PHONELINES || [];
    if (!list.length) { el.innerHTML = ""; return; }
    var html = '<div class="pl-sec"><h2 style="margin:18px 0 4px;">📞 More numbers to call</h2>' +
      '<p style="color:#888;font-size:14px;margin:0 0 12px;">Direct lines to more help around Fort Wayne.</p></div>';
    html += list.map(function (h) {
      var href = esc(h.href || "#");
      var ext = /^https?:/.test(h.href || "") ? ' target="_blank" rel="noopener"' : "";
      return '<div class="hotline pl-line"><h3>' + esc(h.icon || "📞") + " " + esc(h.name || "") + "</h3>" +
        "<p>" + esc(h.desc || "") + "</p>" +
        '<a href="' + href + '"' + ext + ">" + esc(plLabel(h.href)) + "</a></div>";
    }).join("");
    el.innerHTML = html;
  }
  window.renderPhonelines = renderPhonelines;

  /* App parity: the New Hope Farms row uses a geo: link. Same delegated
     handler as the app's gm-theme.js - rewrites geo: taps into a Google
     Maps directions link so it works in a browser. */
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href^="geo:"]') : null;
    if (!a) return;
    var h = a.getAttribute("href"), m = h.match(/^geo:([-\d.]+),([-\d.]+)(?:\?q=(.*))?$/);
    if (!m) return;
    var q = "";
    try { q = decodeURIComponent(m[3] || ""); } catch (x) {}
    if (/^[-\d.]+,[-\d.]+/.test(q)) q = "";
    var dest = encodeURIComponent(q || (m[1] + "," + m[2]));
    a.setAttribute("href", "https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + dest);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  }, true);

  /* Wrap renderHotlines so the phone-lines follow every hotline render
     (init + area switch), same pattern as the donators/parks wraps. */
  (function wrap() {
    if (typeof window.renderHotlines !== "function") return;
    if (window.renderHotlines.__plWrapped) return;
    var orig = window.renderHotlines;
    window.renderHotlines = function () { var r = orig.apply(this, arguments); try { renderPhonelines(); } catch (e) {} return r; };
    window.renderHotlines.__plWrapped = true;
  })();
  try { renderPhonelines(); } catch (e) {}
})();

/* ===== lasttab.js ===== */
/* LASTTAB (feature #44): pick up where you left off — ported from the app's
   gm-lasttab.js. The site reopens on the tab you were using instead of always
   landing on the map. Every goTab() switch is saved to localStorage
   ("haven_lasttab", same key as the app); once after boot settles, the site
   jumps back to it. Also remembers HOW FAR you were scrolled ("haven_lasttab_scroll").

   WEBSITE ADAPTATIONS vs the app source:
   - active tab marker is ".tab.active" here (app uses ".tab.on").
   - validTab() checks the bottom-nav button (nav button[data-tab]) rather than
     the tab div: tab-ptools has a div but no nav button, and clicking it would
     throw. Same skip-map / unknown-tab guards as the app.
   - boot restore clicks the nav button DIRECTLY instead of calling goTab():
     the site's goTab() runs toggleSidebar() first, which would pop the sidebar
     open on every cold boot. The wrap still covers goTab() for saving, since
     every switch path (sidebar, wiki, ptools, jobs, foodday, crisis jump)
     flows through goTab().
   - window._lasttabApi exposes the pure helpers for vm tests (alerts.js precedent).
   No changes to any existing file's behavior; plain localStorage try/catch. */
(function () {
  var KEY = "haven_lasttab";
  var SCROLL_KEY = "haven_lasttab_scroll";
  var MIN_Y = 60;
  function save(tb) { try { localStorage.setItem(KEY, tb); } catch (e) {} }
  function load() { try { return localStorage.getItem(KEY) || ""; } catch (e) { return ""; } }
  function navBtn(tb) {
    try { return document.querySelector('nav button[data-tab="' + tb + '"]'); }
    catch (e) { return null; }
  }
  function validTab(tb) { return !!tb && tb !== "map" && !!navBtn(tb); }
  function saveScrollState(s) { try { localStorage.setItem(SCROLL_KEY, JSON.stringify(s)); } catch (e) {} }
  function loadScrollRaw() { try { return JSON.parse(localStorage.getItem(SCROLL_KEY) || "null"); } catch (e) { return null; } }
  function loadScroll() {
    var s = loadScrollRaw();
    return (s && s.tb && s.id && typeof s.y === "number" && s.y >= MIN_Y) ? s : null;
  }

  var restoring = false;
  /* HV-LASTTAB-NOYANK (from app): the boot restore fires ~1.5s after load, but
     a fast user can tap a tab inside that window -- without a guard the restore
     yanks them back to the saved tab anyway. userMoved records a
     user-initiated switch before boot settles; boot() then skips the restore
     and honors the tap. Additive only; normal cold-boot restore is unchanged. */
  var bootDone = false, userMoved = false;
  function wrap() {
    if (typeof goTab !== "function") return false;
    var baseGo = goTab;
    goTab = function (tb) {
      if (!restoring && tb) { if (!bootDone) userMoved = true; save(tb); }
      return baseGo.apply(this, arguments);
    };
    return true;
  }
  if (!wrap()) {
    var tries = 0;
    var iv = setInterval(function () {
      if (wrap() || ++tries > 20) clearInterval(iv);
    }, 250);
  }

  /* Scroll tracking: capture-phase so non-bubbling scroller events are seen. */
  var scrollT = null, pending = null;
  function flushScroll() {
    if (!pending) return;
    var p = pending; pending = null;
    if (p.y >= MIN_Y) { saveScrollState(p); return; }
    var cur = loadScrollRaw();
    if (cur && cur.id === p.id) saveScrollState({ tb: p.tb, id: p.id, y: 0 });
  }
  document.addEventListener("scroll", function (e) {
    var t = e.target;
    if (!(t instanceof Element) || !t.id) return;
    var sec = document.querySelector(".tab.active");
    if (!sec || !sec.contains(t)) return;
    pending = { tb: sec.id.replace(/^tab-/, ""), id: t.id, y: Math.round(t.scrollTop) || 0 };
    clearTimeout(scrollT);
    scrollT = setTimeout(flushScroll, 400);
  /* HV-SCROLL-PASSIVE (from app): the capture-phase scroll tracker never calls
     preventDefault, so mark it passive - the compositor can start scrolling
     without waiting for this JS. capture:true keeps the capture semantics. */
  }, { capture: true, passive: true });
  window.addEventListener("pagehide", function () { if (pending) flushScroll(); });

  /* HV-LASTTAB-NOFIGHT (from app): the retry loop kept re-asserting the saved
     scrollTop every 350ms until the content converged -- if the user started
     scrolling the restored tab inside that ~4s window, every tick yanked them
     back to the saved position. A touchstart/wheel listener on the scroller
     now cancels the loop the moment the user interacts: programmatic scrollTop
     sets never fire touchstart/wheel, so no false cancels. Listeners are
     passive and detached on every exit path. */
  function restoreScroll(s) {
    var n = 0, elA = null, cancelled = false;
    function onUser() { cancelled = true; }
    function detach() {
      try {
        if (elA) {
          elA.removeEventListener("touchstart", onUser);
          elA.removeEventListener("wheel", onUser);
        }
      } catch (e) {}
      elA = null;
    }
    function attach(el) {
      if (el === elA) return;
      detach();
      elA = el;
      try {
        elA.addEventListener("touchstart", onUser, { passive: true });
        elA.addEventListener("wheel", onUser, { passive: true });
      } catch (e) {}
    }
    function stop() { clearInterval(iv2); detach(); }
    var iv2 = setInterval(function () {
      if (cancelled) { stop(); return; }
      n++;
      var sec = document.querySelector(".tab.active");
      var el = document.getElementById(s.id);
      var tabOk = sec && sec.id === "tab-" + s.tb;
      if (el && tabOk) attach(el);
      if (el && tabOk && n < 12) {
        try { el.scrollTop = s.y; } catch (x) {}
        if (el.scrollHeight >= s.y + el.clientHeight - 40) {
          stop();
          return;
        }
      }
      if (n >= 12) {
        if (el && tabOk) { try { el.scrollTop = s.y; } catch (x) {} }
        stop();
      }
    }, 350);
  }

  function boot() {
    bootDone = true;
    if (userMoved) return; /* user already picked a tab -- don't yank them back */
    var tb = load();
    if (!validTab(tb)) return;
    var btn = navBtn(tb);
    if (!btn) return;
    restoring = true;
    try { btn.click(); } catch (e) {}
    restoring = false;
    var s = loadScroll();
    if (s && s.tb === tb) setTimeout(function () { restoreScroll(s); }, 600);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { setTimeout(boot, 1500); });
  } else {
    setTimeout(boot, 1500);
  }

  /* Test hook (alerts.js precedent): pure helpers for vm tests. */
  try { window._lasttabApi = { save: save, load: load, validTab: validTab, loadScroll: loadScroll, saveScrollState: saveScrollState, KEY: KEY, SCROLL_KEY: SCROLL_KEY }; } catch (e) {}
})();

/* ===== fabmenu.js ===== */
/* Haven FW website: pop-out map menu (FAB).
   Feature #45: ports the app's gm-fab.js + gm-fab.css — moves Near me, Add my
   pin, Bus stops and Trip planner into one bottom-right button that fans them
   out. English-only (site convention); no i18n layer on the site.
   Also fixes a live layout bug: the tag-filter button, the pin FAB and the bus
   button all sat at top:172px right:10px and overlapped each other; the bus
   button was additionally appended to #tab-map (no positioned ancestor), so it
   was positioned against the page instead of the map. */
(function () {
  "use strict";
  /* App ORDER verbatim: [id/query, label]. The site's Near-me button is the
     anonymous button in the map search row (onclick="showUserLocation(true)"). */
  var ORDER = [
    { q: '#tab-map button[onclick*="showUserLocation"]', label: "Near me" },
    { id: "pinBtn", label: "Add my pin" },
    { id: "busBtn", label: "Bus stops" }
  ];
  var fab = null, main = null, found = {}, obs = null, iv = null, mapWired = false;

  function $(id) { try { return document.getElementById(id); } catch (e) { return null; } }
  function findIt(o) {
    if (o.id) return $(o.id);
    try { return document.querySelector(o.q); } catch (e) { return null; }
  }
  function setOpen(on, why) {
    if (!fab || !main) return;
    var wasOpen = fab.classList.contains("open");
    fab.classList.toggle("open", !!on);
    try { main.setAttribute("aria-expanded", on ? "true" : "false"); } catch (e) {}
    /* HV-FAB-FOCUS-RETURN (ported): on dismiss paths, hand focus back to the
       trigger so a keyboard/screen-reader user doesn't resume Tab from an
       invisible item. Item-tap closes are excluded: the tapped action (e.g.
       the trip sheet) manages focus itself. */
    if (!on && wasOpen && why !== "item") {
      try {
        var ae = document.activeElement;
        if (ae && ae !== main && fab.contains(ae) && main.focus) main.focus({ preventScroll: true });
      } catch (e) {}
    }
  }
  function place() {
    if (!fab) return 0;
    var n = 0;
    ORDER.forEach(function (o, idx) {
      var el = findIt(o);
      if (!el) return;
      n++;
      if (el.parentNode !== fab) fab.appendChild(el);
      try {
        el.classList.add("hvf-it");
        el.style.setProperty("--i", String(idx));
        el.setAttribute("data-lbl", o.label);
        el.setAttribute("aria-label", o.label);
      } catch (e) {}
      var key = o.id || o.q;
      if (!found[key]) {
        found[key] = 1;
        el.addEventListener("click", function () { setTimeout(function () { setOpen(false, "item"); }, 120); });
      }
    });
    return n;
  }
  function wireMap() {
    if (mapWired) return;
    try {
      if (typeof map !== "undefined" && map && map.on) {
        map.on("dragstart zoomstart", function () { setOpen(false, "dismiss"); });
        mapWired = true;
      }
    } catch (e) {}
  }
  function build() {
    var wrap = $("map-wrap") || $("tab-map");
    if (!wrap || $("hvFab")) return false;
    fab = document.createElement("div"); fab.id = "hvFab";
    main = document.createElement("button"); main.id = "hvFabMain"; main.type = "button";
    main.setAttribute("aria-label", "Map menu"); main.setAttribute("aria-expanded", "false");
    main.innerHTML = "<span>\uff0b</span>";
    main.addEventListener("click", function (e) { e.stopPropagation(); setOpen(!fab.classList.contains("open")); });
    ["mousedown", "touchstart", "dblclick", "wheel"].forEach(function (ev) {
      fab.addEventListener(ev, function (e) { e.stopPropagation(); }, { passive: true });
    });
    try { if (window.L && L.DomEvent) L.DomEvent.disableClickPropagation(fab); } catch (e) {}
    fab.appendChild(main);
    wrap.appendChild(fab);
    place();
    /* The pin/bus/trip buttons are created by their own modules a moment
       later (after the Leaflet map boots): grab them as they appear. */
    var tab = $("tab-map") || wrap;
    try {
      obs = new MutationObserver(function () { if (place() === ORDER.length && obs) { obs.disconnect(); obs = null; } });
      obs.observe(tab, { childList: true, subtree: true });
    } catch (e) { obs = null; }
    var tries = 0;
    iv = setInterval(function () { place(); wireMap(); if (++tries > 40 || !obs) { clearInterval(iv); iv = null; } }, 500);
    document.addEventListener("click", function (e) { if (fab && fab.classList.contains("open") && !fab.contains(e.target)) setOpen(false, "dismiss"); }, true);
    document.addEventListener("touchstart", function (e) { if (fab && fab.classList.contains("open") && !fab.contains(e.target)) setOpen(false, "dismiss"); }, { capture: true, passive: true });
    document.addEventListener("keydown", function (e) { if (e && e.key === "Escape") setOpen(false, "dismiss"); });
    wireMap();
    return true;
  }
  function boot() {
    if ($("hvFab")) return;
    if (!$("map-wrap") && !$("tab-map")) { setTimeout(boot, 400); return; }
    build();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  try {
    window._fabApi = {
      build: build, place: place, setOpen: setOpen, ORDER: ORDER,
      get fab() { return fab; }, get main() { return main; }
    };
  } catch (e) {}
})();

/* ===== moredata.js ===== */
/* Haven FW website — more-data (feature #46).
 * Ported from the Android app's more-data.js: extra hotlines, gigs, guides,
 * two places and listing corrections. General info only — rules, fees and
 * phone numbers change, so call first. English-only per site convention.
 * Idempotent: hotlines dedup by name, gigs/guides by id, places by id AND
 * lowercased name (same rule as the app and #40 parks.js).
 * HOTLINES/GIGS/GUIDES land at script load (tab-data.js + guides.js load
 * before this file). The RESOURCES touches run inside a wrapped init()
 * (same pattern as parks.js #40) because the website's RESOURCES arrives
 * asynchronously from the Catbox data file.
 * Deliberately NOT ported: the 9 splash-pad pins (the website already covers
 * all 10 city splash pads under the water category, marked seasonal) and the
 * es/my translations (the site is English-only). */
"use strict";
(function () {

  var HOTLINES_ADD = [
      /* DATA QUALITY (HV-SOS-TOLLFREE): card text advertises toll-free 800-284-8439 but the button dialed 260-471-9440 (both are real PBHI HelpLine numbers per parkview.com) - href now dials the toll-free number shown in the card, per HV-HEALTHYHOMES-HREF. */
      { name: "Parkview SOS / HelpLine", desc: "24/7 Parkview Behavioral Health HelpLine. Ask them to send the SOS mobile crisis team to you. Toll-free 800-284-8439", href: "tel:+18002848439", icon: "🆘", crisis: true },
      { name: "VA Benefits Hotline", desc: "Veterans: benefits, claims and help finding the right VA office", href: "tel:+18008271000", icon: "🎖️" },
      { name: "NAMI HelpLine", desc: "Free mental-health info and referrals, weekdays (call or text)", href: "tel:+18009506264", icon: "🧠" },
      { name: "Poison Control", desc: "24/7 free help if someone swallowed something harmful", href: "tel:+18002221222", icon: "☠️" },
      { name: "National Runaway Safeline", desc: "24/7 help for youth who ran away or are thinking about it", href: "tel:+18007862929", icon: "🧑‍🎓" }
    ];

  var GIGS_ADD = [
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
    ];

  var GUIDES_ADD = [
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
    { id: "banking-fees", title: "Banking Without Fees", icon: "🏦",
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
  ];

  var PLACES_ADD = [
    {
      id: "lawton-skatepark", name: "Lawton Skatepark", cats: ["skate", "hangout"], addr: "1600 N Clinton St", zip: "46805", lat: 41.087598, lng: -85.1391042,
      phone: "(260) 427-6000", phoneHref: "+12604276000",
      desc: "Free outdoor skatepark in Lawton Park with lights for evening sessions. It is older, with ledges and bowls for many skill levels. It is open to the public most of the day, roughly 7 AM to 11 PM. Ask local skate shops, thrift stores and Buy Nothing groups about free or cheap used boards. Wear a helmet if you have one.",
      tags: ["free", "skate", "park", "lights"]
    },
    {
      id: "allen-vso", name: "Allen County Veteran Services Office", cats: ["benefits"], addr: "1 E Main St, Suite 106", zip: "46802", lat: 41.0809489, lng: -85.1392111,
      phone: "(260) 449-7861", phoneHref: "+12604497861",
      hours: { 1: [480, 990], 2: [480, 990], 3: [480, 990], 4: [480, 990], 5: [480, 990] },
      desc: "County office that helps veterans and their families with VA benefits claims, health care sign-up, pensions and a veteran property tax deduction. Free. Bring your DD-214 (discharge papers) and an ID. If you are in crisis, call the Veterans Crisis Line instead: 988, then press 1.",
      tags: ["veterans", "VA benefits", "claims", "DD-214", "free help"]
    }
  ];

  function ensureHotlines() {
    try {
      if (typeof HOTLINES === "undefined" || !Array.isArray(HOTLINES)) return 0;
      var have = {};
      HOTLINES.forEach(function (h) { if (h && h.name) have[h.name] = 1; });
      var added = 0;
      HOTLINES_ADD.forEach(function (h) {
        if (have[h.name]) return;
        HOTLINES.push(h); have[h.name] = 1; added++;
      });
      return added;
    } catch (e) { return 0; }
  }

  function ensureGigs() {
    try {
      if (typeof GIGS === "undefined" || !Array.isArray(GIGS)) return 0;
      var have = {};
      GIGS.forEach(function (g) { if (g && g.id) have[g.id] = 1; });
      var added = 0;
      GIGS_ADD.forEach(function (g) {
        if (have[g.id]) return;
        GIGS.push(g); have[g.id] = 1; added++;
      });
      return added;
    } catch (e) { return 0; }
  }

  function ensureGuides() {
    try {
      if (typeof GUIDES === "undefined" || !Array.isArray(GUIDES)) return 0;
      var have = {};
      GUIDES.forEach(function (g) { if (g && g.id) have[g.id] = 1; });
      var added = 0;
      GUIDES_ADD.forEach(function (g) {
        if (have[g.id]) return;
        GUIDES.push(g); have[g.id] = 1; added++;
      });
      return added;
    } catch (e) { return 0; }
  }

  /* Listing corrections + new places, applied to the runtime RESOURCES.
     Verbatim from the app's more-data.js; each correction is guarded by its
     own "not already applied" test so re-runs are no-ops. */
  function ensureResources() {
    try {
      if (typeof RESOURCES === "undefined" || !Array.isArray(RESOURCES)) return 0;
      var added = 0;
      var f = RESOURCES.find(function (r) { return r.id === "freimann-square"; });
      if (f && !/community report/i.test(f.desc || "")) {
        f.desc += " Community report: food is served here (for people and for dogs), clothing is handed out, and it is a drug-free zone. Times vary, so ask on site or call to confirm.";
        f.tags = (f.tags || []).concat(["free food", "dog food", "free clothes", "drug-free zone"]);
        added++;
      }
      var a = RESOURCES.find(function (r) { return r.id === "associated-churches"; });
      if (a && !/no longer give/i.test(a.desc || "")) {
        a.desc += " Update: the Associated Churches food bank no longer gives out vouchers. Call before you go.";
        added++;
      }
      var im = RESOURCES.find(function (r) { return r.id === "inasmuch-ministry"; });
      /* App's guard (!/Bus passes: ask/) re-fires on repeat runs because the
         appended text never contains that phrase; guard on the appended
         reminder itself so re-runs are no-ops. Same intent, idempotent. */
      if (im && !/township trustee, not Inasmuch/i.test(im.desc || "")) {
        im.desc += " Reminder: gas vouchers come only through your township trustee, not Inasmuch.";
        added++;
      }
      var pc = RESOURCES.find(function (r) { return r.id === "park-center"; });
      if (pc && !/HelpLine: 260/.test(pc.desc || "")) {
        pc.desc += " Parkview SOS line: call the 24/7 Parkview Behavioral Health HelpLine at 260-471-9440 (toll-free 800-284-8439) and ask for the SOS mobile crisis team. They can come to you. The team aims to arrive within about an hour in Allen County. HelpLine: 260-471-9440.";
        pc.tags = (pc.tags || []).concat(["SOS", "mobile crisis", "24 hour HelpLine"]);
        added++;
      }
      var have = {};
      RESOURCES.forEach(function (r) {
        if (!r) return;
        if (r.id) have[r.id] = 1;
        if (r.name) have[String(r.name).toLowerCase()] = 1;
      });
      PLACES_ADD.forEach(function (p) {
        if (have[p.id] || have[String(p.name).toLowerCase()]) return;
        RESOURCES.push(p);
        have[p.id] = 1;
        have[String(p.name).toLowerCase()] = 1;
        added++;
      });
      return added;
    } catch (e) { return 0; }
  }

  /* Mirror the app's CATS.skate on the website's filter/emoji/color tables so
     the skatepark pin and its filter button render like the app's. */
  function ensureSkateCat() {
    try {
      if (typeof FILTER_CATS !== "undefined" && !FILTER_CATS.skate) FILTER_CATS.skate = "🛹 Skate Parks";
      if (typeof PIN_EMOJI !== "undefined" && !PIN_EMOJI.skate) PIN_EMOJI.skate = "🛹";
      if (typeof PIN_COLOR !== "undefined" && !PIN_COLOR.skate) PIN_COLOR.skate = "#f97316";
    } catch (e) {}
  }

  var _mdCounts = {
    hotlines: ensureHotlines(),
    gigs: ensureGigs(),
    guides: ensureGuides()
  };
  ensureSkateCat();
  window._moredataApi = {
    counts: function () { return _mdCounts; },
    ensureResources: ensureResources
  };

  /* Hook into the site boot: places + corrections must land in RESOURCES
     before init() builds allPlaces. Same wrap pattern as parks.js #40. */
  try {
    if (typeof init === "function" && !init.__moredataWrapped) {
      var _initMD = init;
      init = function () { try { ensureResources(); } catch (e) {} _initMD(); };
      init.__moredataWrapped = true;
    } else if (typeof init === "function") {
      try { ensureResources(); } catch (e) {}
    }
  } catch (e) {}
})();

/* ===== settings-extra.js ===== */
/* Haven FW website — extra Settings cards ported from the app's Settings tab:
   area/city switcher row, use-my-location, voice search, suggest-a-place
   (localStorage queue), and my-documents photo wallet (localStorage).
   Loaded after app.js; hooks into applySettings() the same way the app's
   gm-size.js wraps renderSettings. English-only per site convention. */

function refreshSettingsArea() {
  var el = document.getElementById('set-area-label');
  if (!el) return;
  try {
    var A = areaCenter();
    el.textContent = '📍 ' + (A && A.name ? A.name : getArea());
  } catch (e) { el.textContent = getArea(); }
}
function wsSwitchArea() {
  try { cycleArea(); } catch (e) {}
  refreshSettingsArea();
}

/* ---------- suggest a place (app: haven_suggest) ---------- */
function wsugLoad() {
  try {
    var a = JSON.parse(localStorage.getItem('haven_suggest') || '[]');
    return Array.isArray(a) ? a : [];
  } catch (e) { return []; }
}
function wsugSave(a) {
  try { localStorage.setItem('haven_suggest', JSON.stringify(a)); } catch (e) {}
}
function wsugFillCats() {
  var sel = document.getElementById('wsugCat');
  if (!sel || sel.options.length) return;
  try {
    Object.keys(FILTER_CATS).forEach(function (k) {
      var o = document.createElement('option');
      o.value = k;
      o.textContent = FILTER_CATS[k];
      sel.appendChild(o);
    });
  } catch (e) {}
}
function wsugAdd() {
  var nameEl = document.getElementById('wsugName');
  var name = nameEl ? nameEl.value.trim() : '';
  if (!name) { miniToast('Give the place a name first'); return; }
  var addrEl = document.getElementById('wsugAddr');
  var catEl = document.getElementById('wsugCat');
  var notesEl = document.getElementById('wsugNotes');
  var a = wsugLoad();
  a.push({
    name: name.slice(0, 80),
    addr: addrEl ? addrEl.value.trim().slice(0, 120) : '',
    cat: catEl ? catEl.value : '',
    notes: notesEl ? notesEl.value.trim().slice(0, 500) : '',
    ts: Date.now()
  });
  wsugSave(a);
  if (nameEl) nameEl.value = '';
  if (addrEl) addrEl.value = '';
  if (notesEl) notesEl.value = '';
  renderWsugList();
  miniToast('Suggestion saved ✅');
}
function wsugDel(i) {
  var a = wsugLoad();
  if (i < 0 || i >= a.length) return;
  a.splice(i, 1);
  wsugSave(a);
  renderWsugList();
}
function wsugShare(i) {
  var s = wsugLoad()[i];
  if (!s) return;
  var catName = '';
  try { catName = FILTER_CATS[s.cat] || s.cat || ''; } catch (e) {}
  var txt = 'Suggested place for Haven FW:\n' + s.name +
    (s.addr ? '\n' + s.addr : '') +
    (catName ? '\nCategory: ' + catName : '') +
    (s.notes ? '\n' + s.notes : '');
  if (navigator.share) { navigator.share({ text: txt }).catch(function () {}); }
  else if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(function () { miniToast('Copied ✅'); }, function () {});
  } else { miniToast('Sharing not supported here'); }
}
function renderWsugList() {
  var el = document.getElementById('wsugList');
  if (!el) return;
  wsugFillCats();
  var a = wsugLoad();
  if (!a.length) {
    el.innerHTML = '<p style="color:#666;font-size:13px;">No suggestions yet. Know a place that should be on the map? Add it above.</p>';
    return;
  }
  el.innerHTML = '<p style="color:#888;font-size:13px;margin:0 0 8px;">Saved on this device (' + a.length + ')</p>' + a.map(function (s, i) {
    var catName = '';
    try { catName = FILTER_CATS[s.cat] || s.cat || ''; } catch (e) {}
    return '<div style="display:flex;align-items:center;gap:8px;padding:10px;background:#1a1f2e;border-radius:8px;margin-bottom:8px;">' +
      '<div style="flex:1;min-width:0;"><b style="color:#fff;">' + escapeHtml(s.name) + '</b>' +
      '<div style="color:#888;font-size:13px;">' + escapeHtml(s.addr || '') + (catName ? ' · ' + escapeHtml(catName) : '') + '</div></div>' +
      '<button class="sheet-btn" style="padding:8px 12px;font-size:14px;" onclick="wsugShare(' + i + ')" aria-label="Share suggestion">📤</button>' +
      '<button class="sheet-btn" style="padding:8px 12px;font-size:14px;background:#3a1f1f;" onclick="wsugDel(' + i + ')" aria-label="Delete suggestion">🗑️</button>' +
      '</div>';
  }).join('');
}

/* ---------- my documents photo wallet (app: haven_docs) ---------- */
function wdocLoad() {
  try {
    var a = JSON.parse(localStorage.getItem('haven_docs') || '[]');
    return Array.isArray(a) ? a : [];
  } catch (e) { return []; }
}
function wdocSave(a) {
  try { localStorage.setItem('haven_docs', JSON.stringify(a)); return true; }
  catch (e) { return false; }
}
function handleWdocFile(ev) {
  var f = ev.target.files && ev.target.files[0];
  ev.target.value = '';
  if (!f) return;
  var img = new Image();
  img.onload = function () {
    try {
      var sc = Math.min(1, 1000 / Math.max(img.width, img.height));
      var cv = document.createElement('canvas');
      cv.width = Math.max(1, Math.round(img.width * sc));
      cv.height = Math.max(1, Math.round(img.height * sc));
      cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
      try { URL.revokeObjectURL(img.src); } catch (e2) {}
      var a = wdocLoad();
      if (a.length >= 10) { miniToast('Document wallet is full (10 max)'); return; }
      var labEl = document.getElementById('wdocLabel');
      var lab = labEl ? labEl.value.trim().slice(0, 40) : '';
      a.push({ label: lab || 'Untitled', url: cv.toDataURL('image/jpeg', 0.7), ts: Date.now() });
      if (!wdocSave(a)) { miniToast('Not enough storage space'); return; }
      if (labEl) labEl.value = '';
      renderWdocGrid();
      miniToast('Document saved ✅');
    } catch (err) { miniToast('Could not read that photo'); }
  };
  img.onerror = function () { miniToast('Could not read that photo'); };
  img.src = URL.createObjectURL(f);
}
function wdocDel(i) {
  var a = wdocLoad();
  if (i < 0 || i >= a.length) return;
  a.splice(i, 1);
  wdocSave(a);
  renderWdocGrid();
}
function wdocView(i) {
  var d = wdocLoad()[i];
  if (!d) return;
  var ov = document.getElementById('wdocLight');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'wdocLight';
    ov.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:2600;align-items:center;justify-content:center;flex-direction:column;padding:20px;';
    ov.innerHTML = '<img id="wdocLightImg" style="max-width:100%;max-height:85vh;border-radius:8px;" alt="">' +
      '<button class="sheet-btn" style="margin-top:12px;" onclick="document.getElementById(\'wdocLight\').style.display=\'none\'">✕ Close</button>';
    ov.addEventListener('click', function (e) { if (e.target === ov) ov.style.display = 'none'; });
    document.body.appendChild(ov);
  }
  var im = document.getElementById('wdocLightImg');
  if (im) { im.src = d.url; im.alt = d.label || 'Document'; }
  ov.style.display = 'flex';
}
function renderWdocGrid() {
  var el = document.getElementById('wdocGrid');
  if (!el) return;
  var a = wdocLoad();
  if (!a.length) {
    el.innerHTML = '<p style="color:#666;font-size:13px;">No documents yet. Keep photos of your ID, benefits letters, or anything important — saved only on this device.</p>';
    return;
  }
  el.innerHTML = a.map(function (d, i) {
    return '<div style="position:relative;background:#1a1f2e;border-radius:10px;overflow:hidden;">' +
      '<img src="' + d.url + '" onclick="wdocView(' + i + ')" loading="lazy" decoding="async" alt="' + escapeAttr(d.label || 'Document') + '" style="width:100%;height:110px;object-fit:cover;display:block;cursor:pointer;">' +
      '<div style="padding:6px 8px;font-size:12px;color:#ccc;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(d.label || 'Untitled') + '</div>' +
      '<button onclick="wdocDel(' + i + ')" aria-label="Delete document" style="position:absolute;top:4px;right:4px;background:rgba(0,0,0,.6);border:none;border-radius:50%;width:30px;height:30px;font-size:14px;cursor:pointer;">🗑️</button>' +
      '</div>';
  }).join('');
}

/* ---------- hook into settings open (same pattern as the app's gm-size.js) ---------- */
(function () {
  if (typeof applySettings === 'function') {
    var baseApply = applySettings;
    applySettings = function () {
      try { baseApply(); } catch (e) {}
      try { refreshSettingsArea(); } catch (e2) {}
      try { renderWsugList(); } catch (e3) {}
      try { renderWdocGrid(); } catch (e4) {}
    };
  }
  // Wire the hidden file input once the DOM is ready
  function wireDocInput() {
    var fi = document.getElementById('wdocFile');
    if (fi && !fi.dataset.wired) {
      fi.dataset.wired = '1';
      fi.addEventListener('change', handleWdocFile);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireDocInput);
  } else { wireDocInput(); }
})();

/* ===== outreach.js ===== */
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

/* ===== volunteer-data.js ===== */
/* Haven FW website - Volunteer tab data (feature #33).
   Ported verbatim from the Android app (haven-volunteer-data.js).
   Each entry becomes a card on the Volunteer tab; entries with lat/lng get a Map button.
   v: "ok" = details came from an official page or a news story; "call" = details come from a
   directory listing or are a best guess -- call first. Hours change; always call ahead. */
"use strict";
window.HAVEN_VOL_GROUPS = [["all", "All"], ["meals", "Meals & pantries"], ["animals", "Animals"], ["build", "Build & repair"], ["kids", "Kids & mentoring"], ["people", "People & outreach"], ["hub", "Sign-up hubs"], ["earn", "Work for a meal / earn"], ["court", "Court & school hours"]];
window.HAVEN_VOL = [
 {
  "id": "vol-volunteer-center",
  "g": "hub",
  "cat": "volunteer",
  "name": "Volunteer Center (Volunteer Fort Wayne)",
  "addr": "3401 Lake Ave",
  "zip": "46805",
  "lat": 41.0907,
  "lng": -85.09484,
  "phone": "(260) 424-3505",
  "phoneHref": "+12604243505",
  "web": "https://www.volunteerfortwayne.org",
  "how": "Browse 140+ local nonprofits on their website and match by interest or zip code, or call them and they'll point you to a place. Also runs Coats for Kids, free tax help (VITA) and expungement help.",
  "times": "Sign up online any time. Call the office to talk to a person.",
  "perk": "Free volunteer insurance, training and recognition (55+ program). Letters for volunteer hours on request - ask.",
  "v": "ok",
  "tags": [
   "sign-up hub",
   "140+ agencies",
   "55+ program",
   "all ages"
  ]
 },
 {
  "id": "vol-allen-county-parks",
  "g": "hub",
  "cat": "volunteer",
  "name": "Allen County Parks (volunteer application)",
  "addr": "7324 Yohne Rd",
  "zip": "46809",
  "phone": "",
  "phoneHref": "",
  "web": "https://allencountyparks.org/volunteer-in-the-allen-county-parks/",
  "how": "Fill out the volunteer application on the Allen County Parks website, then email it to programs@allencountyparks.org or mail it to Volunteer Department, 7324 Yohne Rd, Fort Wayne IN 46809.",
  "times": "Varies by park and season.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "parks",
   "outdoors",
   "application"
  ]
 },
 {
  "id": "vol-community-harvest",
  "g": "meals",
  "cat": "volunteer",
  "name": "Community Harvest Food Bank",
  "addr": "999 E Tillman Rd",
  "zip": "46816",
  "lat": 41.018378,
  "lng": -85.122476,
  "phone": "(260) 447-3696",
  "phoneHref": "+12604473696",
  "web": "http://www.communityharvest.org/",
  "how": "Sign up online at communityharvest.org/volunteer, or walk in Saturday morning right at 7:30 AM (a county list says 14 and older). Jobs: stocking shelves, packing, decorating donation bags.",
  "times": "Saturdays 7:30 - 11:30 AM walk-in. Weekdays by sign-up (building open Mon-Fri 8:30 AM - 5 PM).",
  "perk": "Not confirmed - ask the volunteer coordinator about take-home food. Accepts court-ordered and school hours.",
  "v": "ok",
  "court": true,
  "tags": [
   "food bank",
   "Saturday walk-in",
   "court hours ok",
   "age 14+"
  ]
 },
 {
  "id": "vol-salvation-army-pantry",
  "g": "meals",
  "cat": "volunteer",
  "name": "Salvation Army of Allen County Food Pantry",
  "addr": "2901 N Clinton St",
  "zip": "46805",
  "lat": 41.10229,
  "lng": -85.138996,
  "phone": "(260) 744-2311",
  "phoneHref": "+12607442311",
  "web": "https://www.salvationarmyusa.org/in/fort-wayne/n-clinton-street-corps/volunteer-new-volunteer/",
  "how": "Call or email Jennifer Prichard (Community Engagement): 260-744-2311 ext 205, Jennifer.Prichard@usc.salvationarmy.org. Bell-ringing spots are claimed on their website.",
  "times": "Food pantry help: Mon, Tue and Thu 10 AM - 1 PM all year. October: Christmas assistance intake. Nov-Dec: bell ringing. December: gift handout. August: school-supply backpacks.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "pantry",
   "holiday help",
   "Christmas"
  ]
 },
 {
  "id": "vol-fwrm",
  "g": "meals",
  "cat": "volunteer",
  "name": "Fort Wayne Rescue Mission",
  "addr": "404 E Washington Blvd",
  "zip": "46802",
  "lat": 41.077903,
  "lng": -85.133545,
  "phone": "(260) 426-7357",
  "phoneHref": "+12604267357",
  "web": "https://fwrm.org",
  "how": "Volunteers prep and serve meals in the kitchen (some shifts start around 6 AM) and help on big holiday meal days (Thanksgiving, Christmas Eve, Easter). Call (260) 426-7357 to ask for the volunteer contact.",
  "times": "Three meals a day, every day - call for open shifts.",
  "perk": "Not confirmed for volunteers - ask.",
  "v": "ok",
  "tags": [
   "hot meals",
   "kitchen",
   "holidays",
   "groups welcome"
  ]
 },
 {
  "id": "vol-st-marys",
  "g": "meals",
  "cat": "volunteer",
  "name": "St. Mary's Soup Kitchen",
  "addr": "1101 Lafayette St",
  "zip": "46802",
  "lat": 41.076725,
  "lng": -85.1334,
  "phone": "(260) 426-1217",
  "phoneHref": "+12604261217",
  "web": "https://stmarysfw.org",
  "how": "Sign up to volunteer on the St. Mary's Soup Kitchen website (stmarysfw.org) or call (260) 426-1217.",
  "times": "They serve meals 7 days a week, all year - call for shift times.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "soup kitchen",
   "7 days a week"
  ]
 },
 {
  "id": "vol-miss-virginia",
  "g": "meals",
  "cat": "volunteer",
  "name": "Miss Virginia's Food Pantry",
  "addr": "1312 S Hanna St",
  "zip": "46802",
  "lat": 41.073972,
  "lng": -85.129059,
  "phone": "(260) 426-0176",
  "phoneHref": "+12604260176",
  "web": "https://www.missvirginiafoodpantry.com",
  "how": "Partner of St. Mary's Soup Kitchen. Gifts of time and food are welcome - call (260) 426-0176 or stop by during pantry hours.",
  "times": "Groceries handed out Tue and Wed 10 AM - 1 PM.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "pantry",
   "Tue/Wed"
  ]
 },
 {
  "id": "vol-st-andrews-soup",
  "g": "meals",
  "cat": "volunteer",
  "name": "St. Andrew's Soup Kitchen",
  "addr": "2714 New Haven Ave",
  "zip": "46803",
  "lat": 41.068628,
  "lng": -85.102696,
  "phone": "(260) 423-6326",
  "phoneHref": "+12604236326",
  "web": "",
  "how": "Call (260) 423-6326 and ask how to help serve.",
  "times": "Meal service Mon, Wed, Fri 11 AM - 1 PM (call to confirm days).",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "soup kitchen"
  ]
 },
 {
  "id": "vol-turner-chapel",
  "g": "meals",
  "cat": "volunteer",
  "name": "Turner Chapel Food Pantry",
  "addr": "836 E Jefferson Blvd",
  "zip": "46803",
  "lat": 41.07782,
  "lng": -85.12628,
  "phone": "(260) 426-3121",
  "phoneHref": "+12604263121",
  "web": "http://turnerchapelftwayne.org/",
  "how": "Call (260) 426-3121 and ask how to help with the pantry or the hot dinner.",
  "times": "Pantry 1st, 3rd and 5th Friday 9-11 AM. Hot meal 2nd and 4th Friday 5:30-7 PM.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "pantry",
   "hot dinner",
   "Fridays"
  ]
 },
 {
  "id": "vol-franciscan-food",
  "g": "meals",
  "cat": "volunteer",
  "name": "The Franciscan Center \u2014 Food Distribution",
  "addr": "4643 Gaywood Dr",
  "zip": "46806",
  "lat": 41.041717,
  "lng": -85.122264,
  "phone": "(260) 744-3977",
  "phoneHref": "+12607443977",
  "web": "https://www.thefranciscancenter.org",
  "how": "Call (260) 744-3977 and schedule volunteer hours ahead of time (a county list notes you must call first).",
  "times": "Food distribution Tue and Thu 9-11 AM, Sat 8-10 AM. Volunteer times by appointment.",
  "perk": "Not confirmed - ask. Listed as accepting court-ordered hours.",
  "v": "call",
  "court": true,
  "tags": [
   "food distribution",
   "call ahead",
   "court hours ok"
  ]
 },
 {
  "id": "vol-associated-churches",
  "g": "meals",
  "cat": "volunteer",
  "name": "Associated Churches Food Bank",
  "addr": "602 E Wayne St",
  "zip": "46802",
  "lat": 41.079581,
  "lng": -85.130775,
  "phone": "(260) 422-3528",
  "phoneHref": "+12604223528",
  "web": "https://www.associatedchurches.org/",
  "how": "Call (260) 422-3528 and ask for volunteer shifts. They also run the Stuff-a-Bus food drive each fall.",
  "times": "Pantry open weekdays about 8 AM - 3 PM - call for shifts.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "food bank",
   "food drive"
  ]
 },
 {
  "id": "vol-homebound-meals",
  "g": "meals",
  "cat": "volunteer",
  "name": "Homebound Meals Inc.",
  "addr": "611 W Berry St",
  "zip": "46802",
  "lat": 41.077983,
  "lng": -85.148042,
  "phone": "(260) 422-3296",
  "phoneHref": "+12604223296",
  "web": "http://www.homeboundmealsfw.org/",
  "how": "Drive a route and hand-deliver hot lunches to homebound neighbors. Call (260) 422-3296 to sign up. 140+ volunteers do this.",
  "times": "Meals go out at noon, Mon-Fri. Call for route times.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "meal delivery",
   "driver",
   "weekdays"
  ]
 },
 {
  "id": "vol-hopes-harbor",
  "g": "meals",
  "cat": "volunteer",
  "name": "Hope's Harbor Family Hospitality Home",
  "addr": "7922 W Jefferson Blvd",
  "zip": "46804",
  "lat": 41.040845,
  "lng": -85.24892,
  "phone": "(260) 459-8550",
  "phoneHref": "+12604598550",
  "web": "https://www.hopesharborfw.org/",
  "how": "Volunteers cook home-style meals for families staying near the hospital. Call (260) 459-8550 and ask how to sign up a meal.",
  "times": "Meals are scheduled with the house - call.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "cook a meal",
   "families",
   "groups"
  ]
 },
 {
  "id": "vol-glass-park-fridge",
  "g": "meals",
  "cat": "volunteer",
  "name": "Forward Indiana Community Fridge - Glass Park",
  "addr": "4235 Fairfield Ave",
  "zip": "46807",
  "lat": 41.04549,
  "lng": -85.14418,
  "phone": "",
  "phoneHref": "",
  "web": "https://forwardindiana.wixsite.com/forward",
  "how": "Keep the free community fridge stocked: drop off unopened, unexpired food. Run by neighbors and Forward Indiana volunteers.",
  "times": "Open 24/7 - drop food any time.",
  "perk": "Not confirmed - it is free food for anyone who needs it.",
  "v": "ok",
  "tags": [
   "community fridge",
   "24/7",
   "drop-off"
  ]
 },
 {
  "id": "vol-food-not-bombs",
  "g": "meals",
  "cat": "volunteer",
  "name": "Food Not Bombs Fort Wayne",
  "addr": "200 E Main St",
  "zip": "46802",
  "lat": 41.081249,
  "lng": -85.137378,
  "phone": "",
  "phoneHref": "",
  "web": "https://ko-fi.com/foodnotbombsfortwayne",
  "how": "Volunteer-run meal group, going 15 years. Show up at the Sunday meal and ask how to help; no sign-up form.",
  "times": "Sundays 2:00 - 3:00 PM at Freimann Square (downtown).",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "free meal",
   "Sundays",
   "no sign-up"
  ]
 },
 {
  "id": "vol-blessed-portion",
  "g": "meals",
  "cat": "volunteer",
  "name": "Blessed Portion Ministries",
  "addr": "Wayne St & Fulton St",
  "zip": "46802",
  "lat": 41.07719,
  "lng": -85.14691,
  "phone": "",
  "phoneHref": "",
  "web": "https://www.theblessedportionministries.org/",
  "how": "Volunteer-run street ministry. Check their website's Friday update, or find the team downtown near Wayne and Fulton, and ask how to help.",
  "times": "Friday evenings, usually about 7 PM.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "street outreach",
   "Fridays"
  ]
 },
 {
  "id": "vol-out-of-a-jam",
  "g": "meals",
  "cat": "volunteer",
  "name": "Out of a Jam \u2014 Feeding Fort Wayne",
  "addr": "2310 Weisser Park Ave",
  "zip": "46803",
  "lat": 41.064186,
  "lng": -85.127195,
  "phone": "(260) 376-4847",
  "phoneHref": "+12603764847",
  "web": "https://www.outofajamfw.org/",
  "how": "Call (260) 376-4847 and ask about kitchen help.",
  "times": "Kitchen Mon-Thu 10 AM - 2 PM (back entrance on Hannah St).",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "kitchen",
   "Mon-Thu"
  ]
 },
 {
  "id": "vol-human-ag-coop",
  "g": "meals",
  "cat": "volunteer",
  "name": "Human Agricultural Cooperative",
  "addr": "1010 N Coliseum Blvd",
  "zip": "46805",
  "phone": "",
  "phoneHref": "",
  "web": "",
  "how": "Volunteers unload and sort food for a weekly free food giveaway (about 1,400 boxes). Email humanagriculturalcoop@gmail.com to confirm this week's day.",
  "times": "Unloading about 7:30 - 10 AM at 1010 N Coliseum Blvd, then curbside handout from 11 AM.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "food giveaway",
   "email first"
  ]
 },
 {
  "id": "vol-humane-fw",
  "g": "animals",
  "cat": "volunteer",
  "name": "Humane Fort Wayne",
  "addr": "1333 Maycrest Dr",
  "zip": "46805",
  "lat": 41.089301,
  "lng": -85.100314,
  "phone": "(260) 744-0454",
  "phoneHref": "+12607440454",
  "web": "https://humanefw.org/volunteer",
  "how": "Sign up for a shift on humanefw.org/volunteer. The Pet Food Pantry needs no long-term commitment. Dog Tails on Trails: take a short orientation, then check out a dog for a pup cup or a whole day.",
  "times": "Shifts available every day (clinic-side shifts Mon-Fri). Pet-food-pantry shifts are posted online.",
  "perk": "A dog buddy for the day (Tails on Trails). Form for school or community-service hours.",
  "v": "ok",
  "court": true,
  "tags": [
   "dogs",
   "cats",
   "pet food pantry",
   "court/school hours",
   "no commitment"
  ]
 },
 {
  "id": "vol-fwacc",
  "g": "animals",
  "cat": "volunteer",
  "name": "Fort Wayne Animal Care & Control",
  "addr": "3020 Hillegas Rd",
  "zip": "46808",
  "lat": 41.102473,
  "lng": -85.191124,
  "phone": "(260) 427-5502",
  "phoneHref": "+12604275502",
  "web": "https://www.cityoffortwayne.in.gov/163/Adoptions",
  "how": "Call (260) 427-5502 and ask about volunteer or dog-walking help.",
  "times": "Adoption lobby Tue/Thu/Fri 12-5:30, Wed 12-6, 1st and 3rd Sat 9-12. Call for volunteer times.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "animal control",
   "dogs"
  ]
 },
 {
  "id": "vol-neighborlink",
  "g": "build",
  "cat": "volunteer",
  "name": "NeighborLink Fort Wayne",
  "addr": "2826 S Calhoun St",
  "zip": "46807",
  "lat": 41.059356,
  "lng": -85.137878,
  "phone": "(260) 209-0074",
  "phoneHref": "+12602090074",
  "web": "http://www.neighborlinkfortwayne.org/",
  "how": "Sign up on their website to help neighbors with yard work, small repairs and ramps, for an hour or a day, in any Fort Wayne zip code. Phone: (260) 209-0074.",
  "times": "Projects are posted online - pick one that fits your schedule.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "yard work",
   "repairs",
   "any zip",
   "one-day jobs"
  ]
 },
 {
  "id": "vol-svdp-carpenters",
  "g": "build",
  "cat": "volunteer",
  "name": "SVdP Carpenter's Sons (Free Home Repairs)",
  "addr": "1600 S Calhoun St",
  "zip": "46802",
  "lat": 41.071022,
  "lng": -85.138464,
  "phone": "(260) 456-3561",
  "phoneHref": "+12604563561",
  "web": "https://svdpfortwayne.org/carpenter/",
  "how": "Skilled volunteers (and helpers) build ramps, rails and porches for low-income homeowners. Call (260) 456-3561 to join a crew.",
  "times": "Volunteer crews work Tuesday mornings.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "carpentry",
   "ramps",
   "Tuesdays"
  ]
 },
 {
  "id": "vol-habitat-restore",
  "g": "build",
  "cat": "volunteer",
  "name": "Habitat for Humanity ReStore \u2014 Greater Fort Wayne",
  "addr": "4747 Lima Rd",
  "zip": "46808",
  "lat": 41.121307,
  "lng": -85.153079,
  "phone": "(260) 470-4200",
  "phoneHref": "+12604704200",
  "web": "https://habitatgfw.com/restore",
  "how": "Call (260) 470-4200 and ask about store help, donation pickup crews and build days.",
  "times": "Store open Mon-Sat 10 AM - 5 PM. Call for volunteer shifts.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "ReStore",
   "building",
   "donation pickup"
  ]
 },
 {
  "id": "vol-svdp-thrift",
  "g": "build",
  "cat": "volunteer",
  "name": "St. Vincent de Paul Thrift Store",
  "addr": "1600 S Calhoun St",
  "zip": "46802",
  "lat": 41.071182,
  "lng": -85.138564,
  "phone": "(260) 456-3561",
  "phoneHref": "+12604563561",
  "web": "https://svdpfortwayne.org/thrift-store/",
  "how": "St. Vincent de Paul is volunteer-driven: call (260) 456-3561 to ask about store or warehouse help.",
  "times": "Store open Mon-Sat about 9:30 AM - 5:30 PM. Call for volunteer shifts.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "thrift",
   "vouchers"
  ]
 },
 {
  "id": "vol-mustard-seed",
  "g": "build",
  "cat": "volunteer",
  "name": "Mustard Seed Furniture Bank of Fort Wayne",
  "addr": "3636 Illinois Rd",
  "zip": "46804",
  "lat": 41.075168,
  "lng": -85.188679,
  "phone": "(260) 471-5802",
  "phoneHref": "+12604715802",
  "web": "https://mustardseedfortwayne.com/",
  "how": "Furniture bank: call (260) 471-5802 and ask about lifting, sorting and delivery help.",
  "times": "Open Mon-Fri 10 AM - 4 PM.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "furniture",
   "lifting"
  ]
 },
 {
  "id": "vol-bgc",
  "g": "kids",
  "cat": "volunteer",
  "name": "Boys & Girls Clubs of Fort Wayne",
  "addr": "2609 Fairfield Ave",
  "zip": "46807",
  "lat": 41.061079,
  "lng": -85.144392,
  "phone": "(260) 744-0998",
  "phoneHref": "+12607440998",
  "web": "https://www.bgcfw.org/",
  "how": "Call (260) 744-0998 and ask about volunteering with kids. Listed as accepting court-ordered hours.",
  "times": "Open after school, Mon-Fri about 2:30 - 7:30 PM.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "court": true,
  "tags": [
   "kids",
   "after school",
   "court hours ok"
  ]
 },
 {
  "id": "vol-bbbs",
  "g": "kids",
  "cat": "volunteer",
  "name": "Big Brothers Big Sisters of Northeast Indiana",
  "addr": "1005 W Rudisill Blvd, Suite 101",
  "zip": "46807",
  "lat": 41.049731,
  "lng": -85.150757,
  "phone": "(260) 456-1600",
  "phoneHref": "+12604561600",
  "web": "https://bbbsnei.org/",
  "how": "Apply to become a Big: a few hours a month with a kid ages 6-18. Call (260) 456-1600.",
  "times": "Office Mon-Fri; matches meet a few hours a month.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "mentor",
   "ages 6-18"
  ]
 },
 {
  "id": "vol-casa",
  "g": "kids",
  "cat": "volunteer",
  "name": "Allen County CASA Program",
  "addr": "1 E Main St, Suite 421",
  "zip": "46802",
  "lat": 41.08165,
  "lng": -85.1391,
  "phone": "(260) 449-7190",
  "phoneHref": "+12604497190",
  "web": "http://www.allencountycasa.org/",
  "how": "Trained volunteer advocates speak up for abused and neglected kids in court. Call (260) 449-7190 to learn about the training.",
  "times": "Training first, then by court appointment.",
  "perk": "Training provided.",
  "v": "call",
  "tags": [
   "court advocate",
   "training"
  ]
 },
 {
  "id": "vol-project-reads",
  "g": "kids",
  "cat": "volunteer",
  "name": "Project Reads \u2014 Free Youth Reading Tutoring",
  "addr": "1005 W Rudisill Blvd",
  "zip": "46807",
  "lat": 41.049586,
  "lng": -85.151163,
  "phone": "(260) 423-6447",
  "phoneHref": "+12604236447",
  "web": "http://www.literacyalliance.org/",
  "how": "Volunteer tutors help kids and adults build reading skills. Call (260) 423-6447.",
  "times": "Office Mon-Fri; tutoring times vary.",
  "perk": "Training provided - ask.",
  "v": "call",
  "tags": [
   "tutor",
   "reading"
  ]
 },
 {
  "id": "vol-study-connection",
  "g": "kids",
  "cat": "volunteer",
  "name": "FWCS Study Connection",
  "addr": "230 E Douglas Ave",
  "zip": "46802",
  "lat": 41.07415,
  "lng": -85.13562,
  "phone": "(260) 467-8810",
  "phoneHref": "+12604678810",
  "web": "https://www.fortwayneschools.org/families/face",
  "how": "One hour a week after school during the school year, helping an elementary student with homework. Sign up through the FWCS FACE Center: (260) 467-8810.",
  "times": "After school, 1 hour a week during the school year.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "tutor",
   "1 hr/week"
  ]
 },
 {
  "id": "vol-ja",
  "g": "kids",
  "cat": "volunteer",
  "name": "Junior Achievement of Northern Indiana",
  "addr": "550 E Wallen Rd",
  "zip": "46825",
  "lat": 41.160471,
  "lng": -85.136426,
  "phone": "(260) 484-2543",
  "phoneHref": "+12604842543",
  "web": "https://northernindiana.ja.org/",
  "how": "Teach a short money, career or business lesson in a local school or after-school program. Call (260) 484-2543.",
  "times": "Classroom visits during school hours.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "teach",
   "school"
  ]
 },
 {
  "id": "vol-special-olympics",
  "g": "kids",
  "cat": "volunteer",
  "name": "Special Olympics Allen County",
  "addr": "5651 Coventry Ln #151",
  "zip": "46804",
  "lat": 41.034662,
  "lng": -85.258081,
  "phone": "(260) 402-1302",
  "phoneHref": "+12604021302",
  "web": "https://www.specialolympicsallencounty.org/contact-us",
  "how": "Coach, cheer or help at events. Call (260) 402-1302.",
  "times": "Call for practice and event schedules.",
  "perk": "Not confirmed - ask.",
  "v": "call",
  "tags": [
   "sports",
   "coaching"
  ]
 },
 {
  "id": "vol-coats-for-kids",
  "g": "kids",
  "cat": "volunteer",
  "name": "Coats for Kids (Volunteer Center)",
  "addr": "3401 Lake Ave",
  "zip": "46805",
  "phone": "(260) 424-3505",
  "phoneHref": "+12604243505",
  "web": "https://volunteerfortwayne.org/",
  "how": "Volunteer Center's annual coat drive: collect, sort and hand out winter coats for kids. Call (260) 424-3505.",
  "times": "Coat collection runs Nov 1 - 30 every year.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "seasonal",
   "November",
   "coats"
  ]
 },
 {
  "id": "vol-ave-maria",
  "g": "people",
  "cat": "volunteer",
  "name": "Ave Maria House",
  "addr": "432 Madison St",
  "zip": "46802",
  "lat": 41.07618,
  "lng": -85.132243,
  "phone": "(260) 424-8231",
  "phoneHref": "+12604248231",
  "web": "https://stmarysfw.org/ave-maria-house/",
  "how": "Day respite for people experiencing homelessness. Call the parish office at (260) 424-8231 about volunteering.",
  "times": "Open Mon-Fri 10 AM - 1 PM.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "tags": [
   "day center",
   "showers",
   "laundry"
  ]
 },
 {
  "id": "vol-stand-down",
  "g": "people",
  "cat": "volunteer",
  "name": "Allen County Homeless Veteran Stand Down",
  "addr": "Grand Wayne Center, 120 W Jefferson Blvd",
  "zip": "46802",
  "lat": 41.07658,
  "lng": -85.14048,
  "phone": "(260) 424-3505",
  "phoneHref": "+12604243505",
  "web": "https://opportunities.volunteerfortwayne.org/need/detail/?need_id=829777",
  "how": "One-day event helping homeless veterans (clothes, services, food). Ask the Volunteer Center how to sign up: (260) 424-3505.",
  "times": "Friday, Oct 9, 2026, 9:30 AM - 1 PM at the Grand Wayne Center, 120 W Jefferson Blvd.",
  "perk": "Not confirmed - ask.",
  "v": "ok",
  "until": "2026-10-09",
  "tags": [
   "veterans",
   "one-day event"
  ]
 },
 {
  "id": "vol-earn-a-bike",
  "g": "earn",
  "cat": "workmeal",
  "name": "Earn-a-Bike - Heart of the City Bike Ministry",
  "addr": "1651 Cass St",
  "zip": "46808",
  "lat": 41.09057,
  "lng": -85.14446,
  "phone": "(260) 444-2901",
  "phoneHref": "+12604442901",
  "web": "https://www.hotcfw.org/",
  "how": "Show up at the bike shop and work for a free bike: rebuild donated bikes, or do community service hours. Free repair lessons too. Questions: (260) 444-2901.",
  "times": "Shop open Fridays 9 AM - noon (use door 3 off the north parking lot). Earn it with 6 hours of community service, or two Fridays working in the shop.",
  "perk": "A free bike you earn, plus free repair lessons.",
  "v": "ok",
  "tags": [
   "free bike",
   "earn it",
   "Fridays",
   "repair lessons"
  ]
 },
 {
  "id": "vol-givehear",
  "g": "earn",
  "cat": "workmeal",
  "name": "GiveHear \u2014 Nonprofit Audiologists",
  "addr": "130 W Main Street Ste 150",
  "zip": "46802",
  "lat": 41.080493,
  "lng": -85.141234,
  "phone": "(260) 602-3276",
  "phoneHref": "+12606023276",
  "web": "https://www.givehear.org/",
  "how": "Call (260) 602-3276 and ask about their 'Circle of Giving': people who get hearing help give community volunteer hours back. Sliding-fee hearing clinic downtown.",
  "times": "Clinic Mon-Fri 9 AM - 5 PM (Saturdays limited - call first).",
  "perk": "Hearing tests and hearing aids at reduced cost, with volunteer hours given back.",
  "v": "ok",
  "tags": [
   "hearing aids",
   "volunteer hours back"
  ]
 },
 {
  "id": "vol-sa-arc",
  "g": "earn",
  "cat": "workmeal",
  "name": "Salvation Army Adult Rehabilitation Center",
  "addr": "427 W Washington Blvd",
  "zip": "46802",
  "lat": 41.076108,
  "lng": -85.145095,
  "phone": "(260) 424-1655",
  "phoneHref": "+12604241655",
  "web": "https://satruck.org/",
  "how": "Free 180-day program for men 18+ with counseling, life-skills and work therapy. Residents pay nothing. Call (260) 424-1655 for intake.",
  "times": "Live-in program. Intake office Mon-Sat 9 AM - 9 PM (closed Sunday).",
  "perk": "A free place in the program, funded by the Salvation Army stores.",
  "v": "ok",
  "tags": [
   "men 18+",
   "work therapy",
   "free",
   "residential"
  ]
 },
 {
  "id": "vol-fwrm-programs",
  "g": "earn",
  "cat": "workmeal",
  "name": "Fort Wayne Rescue Mission - Work Therapy Programs",
  "addr": "404 E Washington Blvd",
  "zip": "46802",
  "lat": 41.078063,
  "lng": -85.133645,
  "phone": "(260) 426-7357",
  "phoneHref": "+12604267357",
  "web": "https://fwrm.org",
  "how": "Men's residential programs (3-6 months up to 1 year) with case management, classes and work therapy. Must be 18+, drug and alcohol free, and complete an intake interview. Call (260) 426-7357.",
  "times": "Programs run all year - call for eligibility and openings.",
  "perk": "Housing, meals and program support while you work the program.",
  "v": "ok",
  "tags": [
   "men 18+",
   "work therapy",
   "residential"
  ]
 },
 {
  "id": "vol-habitat-sweat",
  "g": "earn",
  "cat": "workmeal",
  "name": "Habitat for Humanity - Sweat Equity Homes",
  "addr": "2085 Humphrey St",
  "zip": "46803",
  "lat": 41.078146,
  "lng": -85.11088,
  "phone": "(260) 422-4828",
  "phoneHref": "+12604224828",
  "web": "https://habitatgfw.com/apply",
  "how": "Work toward owning a home: families put in 'sweat equity' hours and repay an affordable mortgage. Apply at habitatgfw.com/apply or call (260) 422-4828.",
  "times": "Office Mon-Fri 9 AM - 4 PM.",
  "perk": "An affordable home you help build.",
  "v": "ok",
  "tags": [
   "home",
   "sweat equity"
  ]
 }
];

/* ===== volunteer.js ===== */
/* Haven FW website - Volunteer tab (feature #33).
 * Ported from the Android app's haven-volunteer.js. Overrides window.renderVolunteer
 * (declared as a stub in app.js); this file loads after app.js so the override wins.
 * Data: window.HAVEN_VOL / window.HAVEN_VOL_GROUPS from volunteer-data.js.
 * Uses app.js globals: escapeHtml, escapeAttr, distMi, userLoc, goTab, miniToast,
 * openPlacePanel, getArea, map. English-only (site convention). */
"use strict";
var volGroup = "all", volQuery = "";
var VOL_ICONS = { all: "✨", meals: "🍲", animals: "🐾", build: "🔨", kids: "🧑‍🎓", people: "🤝", hub: "🔎", earn: "🛠️", court: "⚖️" };

function volGroups() { return (typeof HAVEN_VOL_GROUPS !== "undefined" && HAVEN_VOL_GROUPS) || [["all", "All"]]; }
function volData() { return (typeof HAVEN_VOL !== "undefined" && HAVEN_VOL) || []; }
function volToday() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function volLive() { var t0 = volToday(); return volData().filter(function (v) { return !v.until || v.until >= t0; }); }
function volIsFW() { try { return (typeof getArea === "function" ? getArea() : "fort-wayne") === "fort-wayne"; } catch (e) { return true; } }
function volDistTxt(v) {
  try {
    if (typeof v.lat === "number" && typeof userLoc !== "undefined" && userLoc && typeof distMi === "function") {
      var m = distMi(userLoc.lat, userLoc.lng, v.lat, v.lng);
      return "📍 " + m.toFixed(1) + " mi";
    }
  } catch (e) {}
  return "";
}
function volPhoneHref(v) {
  if (v.phoneHref) return v.phoneHref;
  var d = String(v.phone || "").replace(/\D/g, "");
  if (d.length === 10) return "+1" + d;
  return d ? "+" + d : "";
}
function volDirUrl(v) {
  if (typeof v.lat === "number") return "https://www.google.com/maps/dir/?api=1&destination=" + v.lat + "," + v.lng;
  return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent((v.name || "") + "," + (v.addr || ""));
}
function volTransitUrl(v) {
  var d = (typeof v.lat === "number") ? (v.lat + "," + v.lng) : ((v.name || "") + " " + (v.addr || ""));
  return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(d) + "&travelmode=transit";
}
function volCard(v) {
  var E = (typeof escapeHtml === "function") ? escapeHtml : function (s) { return String(s); };
  var EA = (typeof escapeAttr === "function") ? escapeAttr : function (s) { return String(s); };
  var earn = v.cat === "workmeal", col = earn ? "#10b981" : "#f59e0b";
  var dist = volDistTxt(v);
  var badge = v.v === "ok"
    ? '<span class="vl-badge ok">✅ Details confirmed</span>'
    : '<span class="vl-badge call">📞 Call to confirm</span>';
  var court = v.court ? '<span class="vl-badge court">⚖️ Court / school hours OK</span>' : "";
  var btns = "";
  if (v.phone) btns += '<a class="vl-btn" href="tel:' + EA(volPhoneHref(v)) + '">📞 Call</a>';
  if (v.web) btns += '<a class="vl-btn" href="' + EA(v.web) + '" target="_blank" rel="noopener">🌐 Sign up / info</a>';
  if (v.addr || typeof v.lat === "number") {
    btns += '<a class="vl-btn" href="' + EA(volDirUrl(v)) + '" target="_blank" rel="noopener">🗺️ Directions</a>';
    btns += '<a class="vl-btn" href="' + EA(volTransitUrl(v)) + '" target="_blank" rel="noopener">🚌 Transit</a>';
  }
  if (typeof v.lat === "number") btns += '<button class="vl-btn" data-volmap="' + EA(v.id) + '">🗺️ Map</button>';
  var tags = (v.tags && v.tags.length) ? '<div class="vl-tags">' + v.tags.map(function (t) { return "<span>✓ " + E(t) + "</span>"; }).join("") + "</div>" : "";
  var h = '<div class="vl-card" style="border-left:4px solid ' + col + ';">';
  h += '<div class="vl-top"><div class="vl-ic">' + (earn ? "🛠️" : "🙌") + "</div>";
  h += '<div><div class="vl-name">' + E(v.name) + '</div><div class="vl-meta">' + badge + court + (dist ? '<span class="vl-dist">' + E(dist) + "</span>" : "") + "</div></div></div>";
  if (v.addr) h += '<div class="vl-addr">📌 ' + E(v.addr) + (v.zip ? ", Fort Wayne, IN " + E(v.zip) : "") + "</div>";
  h += '<div class="vl-rows">'
    + (v.how ? '<div class="vl-row"><b>How to sign up</b><span>' + E(v.how) + "</span></div>" : "")
    + (v.times ? '<div class="vl-row"><b>When</b><span>' + E(v.times) + "</span></div>" : "")
    + (v.perk ? '<div class="vl-row vl-perk"><b>What you get</b><span>' + E(v.perk) + "</span></div>" : "")
    + "</div>";
  h += tags + (btns ? '<div class="vl-act">' + btns + "</div>" : "");
  return h + "</div>";
}
function volMatch(v) {
  if (volGroup === "court") { if (!v.court) return false; }
  else if (volGroup === "earn") { if (v.cat !== "workmeal") return false; }
  else if (volGroup !== "all" && v.g !== volGroup) return false;
  if (volQuery) {
    var hay = (v.name + " " + (v.addr || "") + " " + (v.how || "") + " " + (v.times || "") + " " + (v.perk || "") + " " + (v.tags || []).join(" ")).toLowerCase();
    if (hay.indexOf(volQuery) < 0) return false;
  }
  return true;
}
window.volShowOnMap = function (id) {
  var r = null;
  try { r = volData().filter(function (v) { return v.id === id; })[0] || null; } catch (e) {}
  if (!r) { if (typeof miniToast === "function") miniToast("That place isn't on the map."); return; }
  try { if (typeof goTab === "function") goTab("map"); } catch (e) {}
  setTimeout(function () {
    try {
      if (typeof map !== "undefined" && map && typeof r.lat === "number" && typeof map.setView === "function") map.setView([r.lat, r.lng], 16);
      if (typeof openPlacePanel === "function") openPlacePanel({ name: r.name, addr: r.addr, phone: r.phone, lat: r.lat, lng: r.lng, cats: ["volunteer"] });
    } catch (e) {}
  }, 250);
};
window.renderVolunteer = function () {
  var el = document.getElementById("volunteer-list");
  if (!el) return;
  var E = (typeof escapeHtml === "function") ? escapeHtml : function (s) { return String(s); };
  // Build the shell once so the search input keeps focus across re-renders.
  if (!document.getElementById("volChips")) {
    el.innerHTML = '<div id="volNote"></div>'
      + '<input id="volQ" type="search" autocomplete="off" placeholder="Search (food, dogs, kids, bike…)">'
      + '<div id="volChips"></div><div id="volList"></div>';
    document.getElementById("volQ").addEventListener("input", function (e) { volQuery = e.target.value.trim().toLowerCase(); window.renderVolunteer(); });
  }
  var note = document.getElementById("volNote");
  if (note) note.innerHTML = volIsFW() ? "" : '<div class="vl-areanote">📍 Fort Wayne listings — Portland volunteer listings coming soon.</div>';
  var chipsEl = document.getElementById("volChips");
  var groups = volGroups();
  chipsEl.innerHTML = groups.map(function (g) {
    var k = g[0], icon = VOL_ICONS[k] || "•";
    return '<button class="vl-chip' + (volGroup === k ? " on" : "") + '" data-vg="' + k + '">' + icon + " " + E(g[1]) + "</button>";
  }).join("");
  chipsEl.querySelectorAll(".vl-chip").forEach(function (b) {
    b.onclick = function () { volGroup = b.getAttribute("data-vg"); window.renderVolunteer(); };
  });
  var list = volLive().filter(volMatch);
  list.sort(function (a, b) {
    if (volGroup === "all" && !volQuery) {
      var ea = a.cat === "workmeal" ? 0 : 1, eb = b.cat === "workmeal" ? 0 : 1;
      if (ea !== eb) return ea - eb;
    }
    try {
      if (typeof userLoc !== "undefined" && userLoc && typeof a.lat === "number" && typeof b.lat === "number" && typeof distMi === "function")
        return distMi(userLoc.lat, userLoc.lng, a.lat, a.lng) - distMi(userLoc.lat, userLoc.lng, b.lat, b.lng);
    } catch (e) {}
    return String(a.name || "").localeCompare(String(b.name || ""));
  });
  var listEl = document.getElementById("volList");
  var head = '<div class="vl-sum">🙌 ' + list.length + " places" + ((volGroup === "all" && !volQuery) ? " · work-for-it programs first" : "") + "</div>";
  listEl.innerHTML = list.length ? head + list.map(volCard).join("")
    : '<div class="vl-empty">😕 Nothing matches. Try “food”, “dogs” or clear the search.</div>';
  listEl.querySelectorAll("[data-volmap]").forEach(function (b) {
    b.onclick = function (e) { e.stopPropagation(); window.volShowOnMap(b.getAttribute("data-volmap")); };
  });
};
/* Cross-link banners on Jobs + Gigs (same as the app). Guarded by .vol-banner so re-runs are safe. */
function volBanner() {
  if (typeof document === "undefined") return;
  [["tab-jobs", "jobs-list"], ["tab-gigs", "gig-list"]].forEach(function (pair) {
    try {
      var tab = document.getElementById(pair[0]); if (!tab || tab.querySelector(".vol-banner")) return;
      var anchor = document.getElementById(pair[1]); if (!anchor || !anchor.parentNode) return;
      var b = document.createElement("button");
      b.className = "vol-banner";
      b.innerHTML = '🙌 <span><b>Volunteer or work for a meal</b><small>Places that need help — and ways to earn a bike, a program spot or more</small></span> ›';
      b.onclick = function () { try { if (typeof goTab === "function") goTab("volunteer"); } catch (e) {} };
      anchor.parentNode.insertBefore(b, anchor);
    } catch (e) {}
  });
}
try { volBanner(); } catch (e) {}
/* Map pins + Places-list entries: the app merges volunteer listings into RESOURCES.
 * On the website the data file loads later (fetch+eval in loadData), so merge lazily
 * at the start of init(). Idempotent via _volMerged + per-id guard. */
var _volMerged = false;
function volMergeIntoResources() {
  if (_volMerged) return;
  if (typeof RESOURCES === "undefined" || !RESOURCES || typeof RESOURCES.push !== "function") return;
  if (typeof HAVEN_VOL === "undefined" || !HAVEN_VOL.length) return;
  _volMerged = true;
  try {
    if (typeof FILTER_CATS !== "undefined") {
      FILTER_CATS.volunteer = "🙌 Volunteer";
      FILTER_CATS.workmeal = "🛠️ Work for a meal";
    }
    if (typeof PIN_EMOJI !== "undefined") { PIN_EMOJI.volunteer = "🙌"; PIN_EMOJI.workmeal = "🛠️"; }
    if (typeof PIN_COLOR !== "undefined") { PIN_COLOR.volunteer = "#f59e0b"; PIN_COLOR.workmeal = "#10b981"; }
  } catch (e) {}
  var seen = {};
  try { RESOURCES.forEach(function (r) { seen[r.id] = 1; }); } catch (e) {}
  HAVEN_VOL.forEach(function (v) {
    if (typeof v.lat !== "number" || seen[v.id]) return;
    seen[v.id] = 1;
    var desc = "🙌 HOW: " + v.how + " WHEN: " + v.times + " YOU GET: " + v.perk +
      (v.v === "call" ? " (Details from a listing - call first.)" : "");
    RESOURCES.push({
      id: v.id, name: v.name, cats: [v.cat], addr: v.addr, zip: v.zip, lat: v.lat, lng: v.lng,
      phone: v.phone, phoneHref: v.phoneHref, web: v.web, desc: desc,
      tags: (v.tags || []).concat(["volunteer"]), hoursText: v.times
    });
  });
}
try {
  var _volOrigInit = window.init;
  if (typeof _volOrigInit === "function" && !window.init._volWrapped) {
    var _volWrappedInit = function () {
      try { volMergeIntoResources(); } catch (e) {}
      return _volOrigInit.apply(this, arguments);
    };
    _volWrappedInit._volWrapped = true;
    window.init = _volWrappedInit;
  }
} catch (e) {}

/* ===== site-fix.js ===== */
/* Haven FW website — haven-fix additions (2026-10-22, website team).
   New navigation (5 bottom tabs + More sheet), crisis strip, About sheet,
   lazy loading of the More bundle (guides/jobs/wiki). Loaded LAST in
   bundle-core.js so every core global exists. No IIFE (site convention). */

var MORE_BUNDLE_URL = "bundle-more.js?v=TOKEN";

/* More sheet items: [tab, sprite symbol id, label] */
var MORE_ITEMS = [
  ["__apk__", "haven-phone", "Get the Android app"],
  ["guide", "haven-guide", "Guide"],
  ["jobs", "haven-jobs", "Jobs"],
  ["events", "haven-events", "Events"],
  ["gigs", "haven-gigs", "Gigs"],
  ["volunteer", "haven-volunteer", "Volunteer"],
  ["programs", "haven-programs", "Programs"],
  ["learn", "haven-learn", "Learn"],
  ["wiki", "haven-wiki", "Wiki"],
  ["settings", "haven-settings", "Settings"]
];
var CORE_TABS = { map: 1, places: 1, help: 1, saved: 1 };
var MORE_TABS = {};
MORE_ITEMS.forEach(function (m) { MORE_TABS[m[0]] = 1; });

function openMore() {
  var ms = document.getElementById("more-sheet");
  if (ms) ms.classList.add("open");
  var ov = document.getElementById("more-overlay");
  if (ov) ov.style.display = "block";
}
function closeMore() {
  var ms = document.getElementById("more-sheet");
  if (ms) ms.classList.remove("open");
  var ov = document.getElementById("more-overlay");
  if (ov) ov.style.display = "none";
}

/* Lazy-load the More bundle (guides/guides-smart/jobs/wiki). Idempotent. */
var _moreBundleState = "idle";
var _moreBundleQueue = [];
function ensureMoreBundle(cb) {
  if (typeof cb === "function" && _moreBundleState === "ready") { cb(); return; }
  if (typeof cb === "function") _moreBundleQueue.push(cb);
  if (_moreBundleState === "loading" || _moreBundleState === "ready") return;
  _moreBundleState = "loading";
  var s = document.createElement("script");
  s.src = MORE_BUNDLE_URL;
  s.onload = function () {
    _moreBundleState = "ready";
    try { if (typeof outreachEnsureEvents === "function") outreachEnsureEvents(); } catch (e) {}
    try { if (typeof outreachEnsureGuides === "function") outreachEnsureGuides(); } catch (e) {}
    var q = _moreBundleQueue; _moreBundleQueue = [];
    q.forEach(function (fn) { try { fn(); } catch (e2) {} });
  };
  s.onerror = function () {
    _moreBundleState = "failed";
    _moreBundleQueue = [];
    try { miniToast("Couldn't load that section — check your connection"); } catch (e) {}
  };
  document.head.appendChild(s);
}

function goTab(name) {
  if (name === "more") { openMore(); return; }
  if (!CORE_TABS[name] && !MORE_TABS[name]) name = "map";
  try { closeMore(); } catch (e) {}
  var btns = document.querySelectorAll("nav button");
  btns.forEach(function (x) { x.classList.toggle("active", x.dataset.tab === name); });
  document.querySelectorAll(".tab").forEach(function (x) { x.classList.remove("active"); });
  var tp = document.getElementById("tab-" + name);
  if (tp) tp.classList.add("active");
  try { if (typeof closePlacePanel === "function") closePlacePanel(); } catch (e2) {}
  try {
    var ps = document.getElementById("places-sheet");
    if (ps && ps.style.bottom === "0px") togglePlacesSheet();
  } catch (e3) {}
  try {
    var ptb = document.getElementById("places-toggle-btn");
    if (ptb) ptb.style.display = name === "map" ? "block" : "none";
  } catch (e4) {}
  try { var sc = document.getElementById("slim-crisis"); if (sc) sc.style.display = (name === "map") ? "none" : "flex"; } catch (e6) {}
  try { if (name === "help" && typeof helpSub === "function") helpSub("now"); } catch (e7) {}
  try {
    if (name === "jobs") { if (typeof renderJobsReal === "function") renderJobsReal(); else renderJobs(); }
    else if (name === "saved") { renderSaved(); renderFavs(); renderTodos(); }
    else if (name === "events") renderEvents();
    else if (name === "volunteer") renderVolunteer();
    else if (name === "guide") renderGuides();
    else if (name === "gigs") renderGigs();
    else if (name === "help") renderHotlines();
    else if (name === "settings") applySettings();
    else if (name === "learn") renderLearn();
    else if (name === "places") renderPlacesTab();
    else if (name === "programs") renderPrograms();
    else if (name === "wiki") { if (typeof renderWiki === "function") renderWiki(); }
    else if (name === "map" && typeof map !== "undefined" && map) setTimeout(function () { map.invalidateSize(); }, 100);
  } catch (e5) {}
}

function moreGo(name) {
  if (name === "__apk__") { closeMore(); window.open("https://boo4blue.github.io/", "_blank", "noopener"); return; }
  closeMore();
  ensureMoreBundle(function () { goTab(name); });
}

/* Crisis strip chips: open-now places of a category, nearest first. */
function crisisChip(cat) {
  goTab("map");
  try {
    document.querySelectorAll("#filters .filter-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.cat === cat);
    });
  } catch (e) {}
  try {
    var ot = document.getElementById("map-open-toggle");
    if (!openNow) { openNow = true; syncOpenNowButtons(); }
  } catch (e2) {}
  try {
    sortMode = "near";
    var q = document.getElementById("search");
    render([cat], q ? q.value : "");
  } catch (e3) {}
  try {
    if (!userLoc && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (p) {
        userLoc = { lat: p.coords.latitude, lng: p.coords.longitude };
        try { var q2 = document.getElementById("search"); render([cat], q2 ? q2.value : ""); } catch (e) {}
        try { renderPlacesSheet(); } catch (e2) {}
      }, function () {}, { timeout: 8000 });
    }
  } catch (e4) {}
  try {
    placesSheetCats = [cat];
    openNow = true; syncOpenNowButtons();
    var so = document.getElementById("places-sort");
    if (so) so.value = "near";
    renderPlacesSheet();
    var sh = document.getElementById("places-sheet");
    if (sh && sh.style.bottom !== "0px") togglePlacesSheet();
  } catch (e5) {}
}

/* About sheet: who runs Haven (spec §5, copy locked). */
function openAbout() {
  var body = document.getElementById("sheet-body");
  var ov = document.getElementById("sheet-overlay");
  if (!body || !ov) return;
  var ver = (typeof HAVEN_BUILD !== "undefined") ? HAVEN_BUILD : "?";
  body.innerHTML =
    '<h2>About Haven FW</h2>' +
    '<div class="row">Haven FW is a free project by <b>Blaze</b>, a Fort Wayne local. ' +
    'It lists free food, shelter, showers, and help around town — checked by hand and updated regularly. ' +
    'Everything here is free. If something\'s wrong or outdated, tell us and we\'ll fix it.</div>' +
    '<div class="row"><a class="sheet-btn" href="https://boo4blue.github.io/app/">Share Haven FW</a></div>' +
    '<div class="meta"><span class="badge">Site build ' + ver + '</span></div>';
  ov.classList.add("open");
  try { document.body.style.overflow = "hidden"; } catch (e) {}
}

/* Help sub-tabs (visual refresh): Right now / Talk to someone / Guides. */
function helpSub(name, btn) {
  var chips = document.querySelectorAll('#tab-help .hsub-chip');
  for (var i = 0; i < chips.length; i++) chips[i].classList.toggle('on', chips[i].dataset.hs === name);
  var subs = document.querySelectorAll('#tab-help .helpsub');
  for (var j = 0; j < subs.length; j++) subs[j].style.display = subs[j].dataset.hs === name ? 'block' : 'none';
}

/* ===== pass4.js ===== */
/* ===== Haven FW — Pass 4 =====
   Tonight strip · offline My-plan card · plain-words open status ·
   honest bus rows (no fabricated times) · I'm-okay ping.
   Every feature ships with a dead-end ladder + an offline path.
   Loads last in bundle-core.js; wraps goTab/renderSaved at load. */
(function () {
"use strict";

/* ---------- shared helpers ---------- */

function p4RefLoc() {
  try { if (typeof userLoc !== "undefined" && userLoc && userLoc.lat) return userLoc; } catch (e) {}
  try { if (typeof areaCenter === "function") { var a = areaCenter(); return { lat: a.lat, lng: a.lon }; } } catch (e2) {}
  return { lat: 41.0806, lng: -85.1390 };
}

function p4Area() {
  try { return getArea(); } catch (e) { return "fort-wayne"; }
}

/* nearest place in cats; prefers open-now, falls back to nearest */
function p4Pick(cats) {
  if (typeof allPlaces === "undefined" || !allPlaces.length) return null;
  var ref = p4RefLoc(), area = p4Area();
  var list = allPlaces.filter(function (r) {
    if (!r || !r.lat || !r.lng) return false;
    if ((r.area || "fort-wayne") !== area) return false;
    var rc = r.cats || [];
    return cats.some(function (c) { return rc.indexOf(c) >= 0; });
  });
  if (!list.length) return null;
  var open = list.filter(function (r) { try { return isOpenNow(r) === true; } catch (e) { return false; } });
  var pool = open.length ? open : list;
  var best = null, bd = 1e9;
  pool.forEach(function (r) {
    var d = distMi(ref.lat, ref.lng, r.lat, r.lng);
    if (d < bd) { bd = d; best = r; }
  });
  if (best) best._p4d = bd;
  return best;
}

function computeTonightPicks() {
  return {
    sleep: p4Pick(["shelter"]),
    eat: p4Pick(["food", "meals"]),
    shower: p4Pick(["day"])
  };
}

function p4Slim(r) {
  if (!r) return null;
  return { name: r.name, addr: r.addr || "", phone: r.phone || "", phoneHref: r.phoneHref || "", lat: r.lat, lng: r.lng };
}

function p4TelOf(r) {
  if (r.phoneHref) return "tel:+" + String(r.phoneHref).replace(/^\+/, "");
  if (r.phone) return "tel:" + String(r.phone).replace(/[^0-9+]/g, "");
  return "tel:211";
}

/* ---------- plain-words open status ---------- */

function p4Seg(v) {
  if (!Array.isArray(v) || v.length !== 2 || typeof v[0] !== "number" || typeof v[1] !== "number") return null;
  var o = v[0], c = v[1];
  if (o > 1440 || c > 1440) {
    var conv = function (x) { return Math.floor(x / 100) * 60 + (x % 100); };
    o = conv(o); c = conv(c);
  }
  if (!(o >= 0 && c > o && c <= 1440)) return null;
  return { o: o, c: c };
}

function p4FmtT(m) {
  var hh = Math.floor(m / 60), mm = m % 60, ap = hh >= 12 ? "PM" : "AM", h12 = hh % 12 || 12;
  return h12 + (mm ? ":" + String(mm).padStart(2, "0") : "") + " " + ap;
}

/* Plain words for a place's open state. Never invents hours. */
function openWords(r) {
  var unk = '<span class="ow-unknown">Hours not listed — call first</span>';
  var h = r && r.hours;
  if (!h || typeof h !== "object") return unk;
  var d = new Date(), day = d.getDay();
  var v = h[day]; if (v === undefined && day === 0) v = h[7];
  var now = d.getHours() * 60 + d.getMinutes();
  var seg = p4Seg(v);
  if (seg) {
    if (now >= seg.o && now < seg.c) {
      var left = seg.c - now;
      if (left <= 60) return '<span class="ow-open">Open now · closes in ' + left + ' min</span>';
      return '<span class="ow-open">Open now · closes ' + p4FmtT(seg.c) + '</span>';
    }
    if (now < seg.o) {
      var to = seg.o - now;
      if (to <= 60) return '<span class="ow-soon">Opens in ' + to + ' min</span>';
      return '<span class="ow-soon">Opens ' + p4FmtT(seg.o) + ' today</span>';
    }
  }
  var nd = (day + 1) % 7, tv = h[nd]; if (tv === undefined && nd === 0) tv = h[7];
  var tseg = p4Seg(tv);
  if (tseg) return '<span class="ow-closed">Closed now · opens ' + p4FmtT(tseg.o) + ' tomorrow</span>';
  if (seg) return '<span class="ow-closed">Closed now · call first</span>';
  return unk;
}

/* ---------- honest bus rows (no schedule data exists — never a fake countdown) ---------- */

var _p4stops = null;
function p4Stops() {
  if (_p4stops) return _p4stops;
  try {
    var bus = window.HavenBus;
    if (!bus || !bus.stops) return [];
    _p4stops = bus.stops.map(function (s) { return { lat: s[0], lng: s[1], name: s[2], id: s[3], routes: s[4] || [] }; });
  } catch (e) { _p4stops = []; }
  return _p4stops;
}

/* ---------- real next-bus countdown (official Citilink GTFS, Sep 1 2026) ---------- */

function p4ServiceMask() {
  var d = new Date().getDay();
  if (d === 0) return 0; /* Sunday: no Citilink service */
  if (d === 6) return 2; /* Saturday */
  return 1;              /* Mon-Fri */
}

function p4InWords(mins) {
  if (mins < 60) return "in " + mins + " min";
  var h = Math.floor(mins / 60), m = mins % 60;
  return "in " + h + " hr" + (m ? " " + m + " min" : "");
}

/* next departures for a GTFS stop_id. Returns {buses:[{routeIdx,inMin}]} or {none:'sunday'|'done'|'nodata'} */
function nextBuses(stopId, count) {
  count = count || 2;
  var svc = p4ServiceMask();
  if (!svc) return { none: "sunday" };
  var arr = (window.HavenBusTimes || {})[stopId];
  if (!arr || !arr.length) return { none: "nodata" };
  var nowD = new Date(), now = nowD.getHours() * 60 + nowD.getMinutes(), out = [];
  for (var i = 0; i < arr.length && out.length < count; i += 3) {
    var mm = arr[i], ri = arr[i + 1], sv = arr[i + 2];
    if ((sv & svc) && mm >= now) out.push({ routeIdx: ri, inMin: mm - now });
  }
  if (!out.length) return { none: "done" };
  return { buses: out };
}

function p4RouteShort(ri) {
  try {
    var r = window.HavenBus.routes[ri] || [];
    return r[0] || "";
  } catch (e) { return ""; }
}

/* compact "next bus" line for a stop_id; honest about no-service cases */
function busNextHtml(stopId) {
  var nb = nextBuses(stopId, 2);
  if (nb.buses) {
    var s = nb.buses.map(function (b) {
      return "<b>" + escapeHtml(p4RouteShort(b.routeIdx)) + "</b> " + p4InWords(b.inMin);
    }).join(" · ");
    return '<span class="bus-next">Next bus: ' + s + "</span>";
  }
  if (nb.none === "sunday") return '<span class="bus-next">No buses on Sundays</span>';
  if (nb.none === "done") return '<span class="bus-next">No more buses today</span>';
  return '<span class="bus-next"><a href="tel:+12604324546" onclick="event.stopPropagation()">Call Citilink for times</a></span>';
}

function busRowHtml(r) {
  if (p4Area() !== "fort-wayne" || !r || !r.lat) return "";
  var stops = p4Stops();
  if (!stops.length) return "";
  var best = null, bd = 1e9, i, s, d;
  for (i = 0; i < stops.length; i++) {
    s = stops[i]; d = distMi(r.lat, r.lng, s.lat, s.lng);
    if (d < bd) { bd = d; best = s; }
  }
  if (!best) return "";
  var badges = "";
  try {
    var bus = window.HavenBus;
    badges = (best.routes || []).slice(0, 3).map(function (ri) {
      var rr = bus.routes[ri] || [];
      return '<span class="badge" style="background:' + (rr[2] || "#666") + '">' + escapeHtml(rr[0] || "") + "</span>";
    }).join(" ");
  } catch (e) {}
  return '<p class="bus-row">🚌 <b>' + escapeHtml(best.name || "Bus stop") + "</b> · " + bd.toFixed(1) + " mi " + badges +
    "<br>" + busNextHtml(best.id) + "</p>";
}

/* ---------- Tonight strip ---------- */

var TONIGHT_STEPS = [
  { key: "sleep", icon: "🛏️", label: "Sleep tonight", empty: "No shelter found" },
  { key: "eat", icon: "🍽️", label: "Eat", empty: "No food found" },
  { key: "shower", icon: "🚿", label: "Shower", empty: "No showers found" }
];

function p4TonightDone() {
  try {
    var t = JSON.parse(localStorage.getItem("haven_tonight") || "{}");
    var today = new Date().toISOString().slice(0, 10);
    if (t.date !== today) return [];
    return t.done || [];
  } catch (e) { return []; }
}

function p4MarkTonight(key) {
  try {
    var today = new Date().toISOString().slice(0, 10);
    var t = JSON.parse(localStorage.getItem("haven_tonight") || "{}");
    if (t.date !== today) t = { date: today, done: [] };
    if (t.done.indexOf(key) < 0) t.done.push(key);
    localStorage.setItem("haven_tonight", JSON.stringify(t));
  } catch (e) {}
  renderTonightStrip();
}

function renderTonightStrip() {
  var el = document.getElementById("tonight-strip");
  if (!el) return;
  var picks = computeTonightPicks();
  var done = p4TonightDone();
  try {
    localStorage.setItem("haven_tonight_picks", JSON.stringify({
      sleep: p4Slim(picks.sleep), eat: p4Slim(picks.eat), shower: p4Slim(picks.shower)
    }));
  } catch (e) {}
  var html = '<div class="tonight-card"><div class="tonight-head"><b>Tonight</b><span>the 3 things that matter most</span></div>';
  html += TONIGHT_STEPS.map(function (st) {
    var r = picks[st.key], isDone = done.indexOf(st.key) >= 0, inner;
    if (!r) {
      inner = '<div class="tstep-missing">' + st.empty + ' right now.</div>' +
        '<div class="tstep-btns"><a class="sheet-btn small" href="tel:211">Call 211 for help</a>' +
        '<a class="sheet-btn small" href="sms:988">Text 988</a></div>';
    } else {
      inner = '<div class="tstep-name">' + escapeHtml(r.name) + "</div>" +
        '<div class="tstep-sub">' + openWords(r) + (r._p4d != null ? " · " + r._p4d.toFixed(1) + " mi" : "") + "</div>" +
        '<div class="tstep-btns"><a class="sheet-btn small" href="' + p4TelOf(r) + '">Call</a>' +
        (r.lat ? '<a class="sheet-btn small" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=' + r.lat + "," + r.lng + '">Directions</a>' : "") +
        '<button class="sheet-btn small" onclick="okPingStep(\'' + st.key + '\')">I\'m here</button>' +
        (isDone ? "" : '<button class="sheet-btn small" onclick="p4MarkTonight(\'' + st.key + '\')">✓ Done</button>') + "</div>";
    }
    return '<div class="tstep' + (isDone ? " done" : "") + '"><div class="tstep-icon">' + st.icon + '</div>' +
      '<div class="tstep-body"><div class="tstep-label">' + st.label + "</div>" + inner + "</div>" +
      (isDone ? '<div class="tstep-check">✓</div>' : "") + "</div>";
  }).join("");
  el.innerHTML = html + "</div>";
}

function renderTonightStripSoon(tries) {
  renderTonightStrip();
  if (tries > 0 && (typeof allPlaces === "undefined" || !allPlaces.length)) {
    setTimeout(function () { renderTonightStripSoon(tries - 1); }, 1500);
  }
}

/* ---------- I'm-okay ping ---------- */

function okPing(placeName) {
  var contact = "";
  try { contact = localStorage.getItem("haven_ok_contact") || ""; } catch (e) {}
  contact = String(contact).replace(/\D/g, "");
  if (contact.length < 10) {
    var v = prompt("Who should get your I'm-okay text? Enter their mobile number:");
    if (v == null) return;
    v = String(v).replace(/\D/g, "");
    if (v.length === 11 && v.charAt(0) === "1") v = v.slice(1);
    if (v.length !== 10) { alert("That number doesn't look right — 10 digits needed."); return; }
    contact = v;
    try { localStorage.setItem("haven_ok_contact", contact); } catch (e2) {}
  }
  var msg = "I'm okay" + (placeName ? ", at " + placeName : "") + " — via Haven FW";
  window.location.href = "sms:+1" + contact + "?body=" + encodeURIComponent(msg);
}

function okPingStep(key) {
  var p = computeTonightPicks(), r = p[key];
  okPing(r ? r.name : null);
}

/* ---------- offline My-plan card (pinned top of Saved) ---------- */

function planCardHtml() {
  var picks = null;
  try { picks = JSON.parse(localStorage.getItem("haven_tonight_picks") || "null"); } catch (e) { picks = null; }
  if (!picks) {
    var f = computeTonightPicks();
    picks = { sleep: p4Slim(f.sleep), eat: p4Slim(f.eat), shower: p4Slim(f.shower) };
  }
  var done = p4TonightDone();
  var rows = [
    { key: "sleep", label: "Sleep tonight", r: picks.sleep },
    { key: "eat", label: "Eat tomorrow", r: picks.eat },
    { key: "shower", label: "Shower", r: picks.shower }
  ];
  var html = '<div class="plan-card"><div class="plan-head"><b>My plan</b><span>works offline</span></div>';
  var anyPick = false;
  rows.forEach(function (row) {
    var r = row.r;
    if (r && r.name) {
      anyPick = true;
      var isDone = done.indexOf(row.key) >= 0;
      html += '<div class="plan-row' + (isDone ? " done" : "") + '"><div style="flex:1;min-width:0;"><b>' +
        escapeHtml(r.name) + "</b>" + (r.addr ? '<div class="plan-addr">' + escapeHtml(r.addr) + "</div>" : "") + "</div>" +
        '<div class="plan-btns">' +
        (r.phone || r.phoneHref ? '<a class="sheet-btn small" href="' + p4TelOf(r) + '">Call</a>' : "") +
        (r.lat ? '<a class="sheet-btn small" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=' + r.lat + "," + r.lng + '">Directions</a>' : "") +
        "</div></div>";
    }
  });
  if (!anyPick) {
    html += '<p class="plan-empty">No plan yet — open the Map tab and the Tonight strip builds one from places near you.</p>' +
      '<div class="plan-btns"><button class="sheet-btn small" onclick="goTab(\'map\')">Open Map</button></div>';
  }
  var msg = "My Haven plan: " + rows.map(function (row) {
    return row.label + ": " + (row.r && row.r.name ? row.r.name : "—");
  }).join(" | ");
  html += '<div class="plan-btns"><a class="sheet-btn" href="sms:?body=' + encodeURIComponent(msg) + '">Text my plan</a>' +
    '<button class="sheet-btn" onclick="okPing(null)">I\'m okay</button></div>';
  try {
    var steps = (typeof PLAN !== "undefined" ? PLAN : []).length;
    var nd = JSON.parse(localStorage.getItem("haven_plan") || "[]").length;
    if (steps) html += '<div class="plan-prog">' + nd + " of " + steps + " longer-term steps done</div>";
  } catch (e) {}
  return html + '<p class="plan-note">Saved on this phone. No signal needed.</p></div>';
}

/* ---------- hooks: re-render strip on map tab, pin plan card on saved tab ---------- */

try {
  var _goTabP4 = goTab;
  goTab = function (n) {
    _goTabP4(n);
    if (n === "map") { try { renderTonightStrip(); } catch (e) {} }
  };
} catch (e) {}

try {
  var _renderSavedP4 = renderSaved;
  renderSaved = function () {
    _renderSavedP4();
    try {
      var el = document.getElementById("saved-list");
      if (!el) return;
      var old = document.getElementById("p4-plan-card");
      if (old) old.remove();
      el.insertAdjacentHTML("afterbegin", '<div id="p4-plan-card">' + planCardHtml() + "</div>");
    } catch (e2) {}
  };
} catch (e3) {}

renderTonightStripSoon(4);

/* expose what cards + inline handlers need */
window.openWords = openWords;
window.busRowHtml = busRowHtml;
window.nextBuses = nextBuses;
window.busNextHtml = busNextHtml;
window.okPing = okPing;
window.okPingStep = okPingStep;
window.p4MarkTonight = p4MarkTonight;
window.renderTonightStrip = renderTonightStrip;
window.computeTonightPicks = computeTonightPicks;

})();
