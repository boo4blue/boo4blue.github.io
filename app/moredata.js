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
