
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
function renderListPage(reset){var el=document.getElementById('list');if(!el)return;if(havenDataFailed){el.innerHTML=HAVEN_DATA_ERR_HTML;return;}if(reset){_listShown=0;el.innerHTML='';}var list=curList||[];var end=Math.min(_listShown+_listPageSize,list.length);var html='';for(var idx=_listShown;idx<end;idx++){var r=list[idx];var fk=favKey(r),fav=favIds().includes(fk);var d=(sortMode==='near'&&userLoc)?distMi(userLoc.lat,userLoc.lng,r.lat,r.lng):null;html+=`<div class="card" onclick="openSheet(${idx})"><button class="fav-btn" onclick="event.stopPropagation();toggleFav('${escapeAttr(fk)}')">${fav?'★':'☆'}</button><h3>${escapeHtml(r.name)}${openBadge(r)}</h3><p>📍 ${escapeHtml(r.addr||'')}</p><p>${escapeHtml((r.desc||'').substring(0,120))}</p>${d!=null?`<p>📏 ${d.toFixed(1)} mi</p>`:''}${r.lat?`<a class="sheet-btn small" href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}" target="_blank" rel="noopener" onclick="event.stopPropagation()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px" aria-hidden="true"><use href="#haven-directions"/></svg> Directions</a>`:''}${r.lat?`<a class="sheet-btn small" href="https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}&travelmode=transit" target="_blank" rel="noopener" onclick="event.stopPropagation()">Transit</a>`:''}</div>`;}_listShown=end;var _empty=(openNow?'<div style="text-align:center;padding:24px 20px;"><div style="color:#fff;font-weight:700;font-size:16px;margin-bottom:8px;">Nothing open right now</div><div style="color:#aaa;font-size:14px;margin-bottom:14px;line-height:1.5;">Most places are closed at this hour. If you need somewhere to go tonight:</div><button class="sheet-btn" onclick="openSafeTonight()" style="margin-bottom:8px;">Safe Tonight — shelters open now</button><br><a class="sheet-btn" href="tel:211">Call 211 for help</a></div>':'<p style="color:#888;text-align:center;padding:20px;">No places found</p>');el.insertAdjacentHTML('beforeend',html||_empty);if(_listShown<list.length){el.insertAdjacentHTML('beforeend','<div id="list-more" style="text-align:center;padding:16px;"><button class="sheet-btn" onclick="renderListPage(false)">Show more ('+(_listShown)+'/'+list.length+')</button></div>');}var more=document.getElementById('list-more');if(more&&_listShown>=list.length)more.remove();}
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
      '<div style="font-size:13px;color:#7c8aff;margin-top:4px;">'+badges+'<span style="margin-left:4px;">'+mins+' min walk</span></div>'+
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
