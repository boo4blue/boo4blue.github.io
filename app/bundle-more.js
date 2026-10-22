
/* ===== guides.js ===== */
const GUIDES = [
  {
    audited: "2026-10-11", id: "snap", title: "SNAP / EBT (Food Stamps)", icon: "🛒",
    intro: "Monthly money on an EBT card for groceries. If your income is low, you likely qualify.",
    where: "Allen County Division of Family Resources", whereId: "dfr",
    bring: [
      "Photo ID (bring whatever ID you have — they work with you)",
      "Proof of income — pay stubs, or a letter from your employer",
      "Proof of address — lease, mail, or a letter from a shelter",
      "Social Security numbers for everyone in your household",
      "Utility bills, if you pay them",
    ],
    steps: [
      "Apply online at fssabenefits.in.gov, or walk into the DFR office",
      "Do the interview — a caseworker calls or meets you to verify your info",
      "Get a decision, usually within 30 days (faster if you're in crisis)",
      "Your EBT card arrives by mail — use it at most grocery stores",
    ],
    tips: "No income at all? Say so on the application — you can still qualify. Report income or address changes to keep your benefits coming.",
  },
  {
    id: "medicaid", title: "Medicaid (HIP & Hoosier Healthwise)", icon: "🩺",
    audited: "2026-10-10",
    intro: "Free or nearly-free health insurance from the state of Indiana.",
    where: "Same DFR office — or call 877-438-4479 (877-GET-HIP9)", whereId: "dfr",
    bring: [
      "Photo ID",
      "Proof of income",
      "Proof of Indiana address",
      "Social Security numbers for the household",
      "Immigration documents, if not a U.S. citizen",
    ],
    steps: [
      "HIP covers adults 19–64 with low income (a single adult up to about $22,000/yr in 2026)",
      "Hoosier Healthwise covers kids, pregnant women, and families",
      "Apply at the DFR office, by phone, or online — then pick a plan (Anthem, CareSource, or MHS)",
      "Show your card at free clinics like [[matthew-25-clinic]] (Matthew 25, 413 E Jefferson Blvd) or Neighborhood Health",
    ],
    tips: "Already on Medicaid? Keep your address updated with DFR or you can lose coverage at renewal time. HEADS UP: Indiana's new HIP work rules take effect Jan 2027 — non-disabled adults 19-64 must show 80 hrs/month of work, school, training, or volunteering (or earn $580+/month) to keep coverage; enrolling in January means proving work back to October 2026.",
  },
  {
    id: "medicare", title: "Medicare", icon: "🏥",
    audited: "2026-10-09",
    intro: "Federal health insurance if you're 65 or older, or have a qualifying disability.",
    where: "Social Security office", whereId: "ssa",
    bring: [
      "Photo ID and birth certificate",
      "Proof of U.S. citizenship or legal residency",
      "Work history info, if applying on disability",
    ],
    steps: [
      "Apply online at ssa.gov, by phone at 1-800-772-1213, or in person",
      "Turning 65? You can enroll starting 3 months before your birthday month",
      "On disability? Medicare usually starts after 24 months of SSDI payments",
      "Ask the office about drug coverage (Part D) and programs that pay your premiums if money is tight",
    ],
    tips: "Low income? Ask about Medicare Savings Programs — they can pay your premiums and more.",
  },
  {
    id: "wic", audited: "2026-10-09", title: "WIC (Moms & Young Kids)", icon: "🍼",
    intro: "Free healthy food, nutrition help, and breastfeeding support.",
    where: "WIC clinic — call (260) 458-2641 for an appointment", whereId: "wic-calhoun",
    bring: [
      "ID for yourself and each child you're enrolling",
      "Proof of your current address",
      "Proof of income — a pay stub or benefits letter",
    ],
    steps: [
      "Call ahead for a certification appointment — walk-ins are limited",
      "Bring everyone being enrolled to the first visit",
      "Get your WIC card loaded with monthly food benefits",
      "Use the WIC app to check your balance and scan groceries at the store",
    ],
    tips: "Pregnant, postpartum, breastfeeding, or have kids under 5? If money is tight, apply — WIC is separate from SNAP and you can have both.",
  },
  {
    audited: "2026-10-11", id: "ssi", title: "SSI & Disability (SSDI)", icon: "♿",
    intro: "Monthly checks if a disability keeps you from working.",
    where: "Social Security office", whereId: "ssa",
    bring: [
      "Photo ID and Social Security card",
      "Medical records — doctor names, hospitals, dates of treatment",
      "Work history for roughly the last 15 years",
      "Bank account info for direct deposit",
    ],
    steps: [
      "Apply online at ssa.gov, by phone, or in person — SSI is needs-based, SSDI is based on work history",
      "Most first applications are denied — appeal within 60 days and don't give up",
      "Get free help with appeals from [[indiana-legal-services]] (Indiana Legal Services, 110 W Berry St Ste 2007, (260) 424-9155)",
      "While you wait, ask the DFR office about other aid you may qualify for",
    ],
    tips: "Keep copies of everything you submit and write down the date of every appointment and call.",
  },
  {
    audited: "2026-10-11", id: "indiana-free-id", title: "Free Indiana ID for Voting", icon: "🪪",
    intro: "If you're 18 or older and a U.S. citizen, Indiana issues your state photo ID FREE for voting purposes — at any BMV branch. Re-verified 2026-10-11.",
    where: "Any BMV license branch — no appointment needed", whereId: "bmv-waynedale",
    bring: [
      "Proof of identity — a U.S. birth certificate or U.S. passport",
      "Proof of Social Security number — Social Security card, pay stub, or W-2",
      "Proof of lawful status — same birth certificate or passport works",
      "Two Indiana residency documents from the last 60 days — utility bill, bank statement, pay stub, or benefits letter (ask a shelter or caseworker about a residency letter if you have no mail)",
      "If your current legal name differs from your documents — proof of the name change",
    ],
    steps: [
      "Go to any BMV license branch (no appointment needed for IDs) and apply for a state identification card — tell them it's for voting purposes",
      "Qualify: U.S. citizen, 18 or older on or before the next general or municipal election, with the documents above",
      "The ID is FREE — it arrives by mail in about 10 days, so apply well before election season (check registration deadlines at indianavoters.in.gov)",
      "Under 18 and experiencing homelessness? Indiana law (IC 31-36-3-4) lets a school homeless-liaison or nonprofit sign a fee-waiver affidavit so your ID is free — ask your school's liaison or a shelter worker",
    ],
    tips: "Need a birth certificate first? Get a certified copy at [[allen-county-vital-records]] (Allen County Vital Records) and bring it to the BMV. No driver's license needed — this ID also works for jobs, housing applications, and anywhere a photo ID is required.",
  },
  {
    audited: "2026-10-11", id: "legal", title: "Free Legal Help", icon: "⚖️",
    intro: "Real lawyers who work for free when you're low-income.",
    where: "Indiana Legal Services", whereId: "indiana-legal-services",
    bring: [
      "Photo ID",
      "Any papers about your problem — eviction notice, denial letters, court dates",
      "Proof of income",
    ],
    steps: [
      "Call (260) 424-9155 — intake is Tue–Thu mornings, 8:30–11:30",
      "Or apply online at indianalegalservices.org (takes about 20 minutes)",
      "They handle housing, benefits denials, consumer debt, expungement, and domestic-violence cases",
      "No criminal cases — but ask them for a referral if that's your issue",
    ],
    tips: "Got an eviction notice? Call immediately — the deadlines to respond are short.",
  },
  {
    id: "bus", audited: "2026-10-08", title: "Getting Around Free", icon: "🚌",
    intro: "How to ride Citilink without paying full fare.",
    where: "Citilink Central Station downtown", whereId: "central-station",
    bring: [
      "ID if you have it",
      "Anything showing low income or a disability (for reduced fares)",
    ],
    steps: [
      "Get free passes in person: [[inasmuch-ministry]] (Inasmuch Ministry, 930 Broadway) hands out free Citilink bus passes, and [[salvation-army-aid]] (Salvation Army, 2901 N Clinton St) gives bus passes Monday/Wednesday/Friday for work, doctor visits, or job search — ask early in the month, supplies are limited",
      "Backup: call 211 and ask about transportation assistance",
      "Citilink sells reduced-fare passes for seniors and riders with disabilities",
      "On Medicaid? Call Verida at (855) 325-7586 (Mon–Fri 8 AM–6 PM) for FREE rides to doctor, dental, and dialysis appointments — book at least 3 days ahead; up to 20 one-way trips a year",
      "Plan trips with the route maps at Central Station — buses run Mon–Sat, no Sundays",
    ],
    tips: "A monthly pass is about $45 — if you ride every day, it pays for itself in two weeks.",
  },
  {
    id: "meds", title: "Free Medication", icon: "💊",
    audited: "2026-10-09",
    intro: "Real ways to get your prescriptions filled in Fort Wayne when you can't pay.",
    where: "Matthew 25 Health and Care — free meds for patients", whereId: "matthew-25-clinic",
    bring: [
      "Photo ID",
      "Your current pill bottles or a list of what you take",
      "Proof of no insurance or low income (a pay stub or benefits letter)",
    ],
    steps: [
      "Become a patient at [[matthew-25-clinic]] (Matthew 25 Health and Care, 413 E Jefferson Blvd) — they dispense medications to their patients free of charge",
      "Always ask the doctor for the generic version — it costs a fraction of the brand name",
      "Any Meijer pharmacy fills select prescriptions FREE with a doctor's prescription, no insurance needed - see [[meijer-free-prescriptions]] (Meijer Pharmacy Free Prescriptions Program): common oral antibiotics and prenatal vitamins (metformin and atorvastatin are NOT free there anymore)",
      "Show a free GoodRx coupon at any pharmacy to cut the price, no insurance needed",
      "Ask your pharmacist about manufacturer patient-assistance programs (RxAssist, NeedyMeds) — many give brand-name drugs free if your income is low",
      "Backup: call 211 and ask about prescription-assistance programs",
    ],
    tips: "Never skip doses to stretch your pills — tell the clinic first. They can often switch you to something cheaper or free.",
  },
  {
    id: "therapy", audited: "2026-10-10", title: "Free & Low-Cost Therapy", icon: "🧠",
    intro: "Counseling and mental-health help in Fort Wayne, even with no money and no insurance.",
    where: "Park Center — sliding-scale therapy", whereId: "park-center",
    bring: [
      "Photo ID",
      "Proof of income, if you have any (for the sliding fee scale)",
      "A list of any medications you take",
    ],
    steps: [
      "Call [[park-center]] (Park Center, 909 E State Blvd) at (260) 481-2700 and ask for intake — fees slide with your income",
      "No insurance? Say so — they take Medicaid and uninsured patients",
      "Ask about group therapy and support groups — they're often free",
      "Backup: call 211 for other free counseling options, including faith-based ones",
    ],
    tips: "In crisis, call or text 988 any time — it's free, 24/7, and you don't need insurance or an appointment.",
  },
  {
    id: "bus-passes", title: "Free Bus Passes", icon: "🎫",
    audited: "2026-10-08",
    intro: "Where to actually get your hands on free Citilink passes.",
    where: "Citilink Central Station downtown", whereId: "central-station",
    bring: [
      "ID if you have it",
      "Anything showing why you need them — a shelter letter, caseworker note, or job interview info",
    ],
    steps: [
      "Get free passes in person first: [[inasmuch-ministry]] (Inasmuch Ministry, 930 Broadway) hands out free Citilink bus passes, and [[salvation-army-aid]] (Salvation Army, 2901 N Clinton St) gives bus passes Monday/Wednesday/Friday for work, doctor visits, or job search — ask early in the month, supplies are limited",
      "Backup: call 211 and ask about transportation assistance and bus-pass programs",
      "Ask your WorkOne career coach about interview-trip passes while job hunting",
      "If you're a senior or have a disability, apply for Citilink's reduced-fare pass at Central Station",
      "Pick up a paper route map at Central Station so you know which bus to catch",
    ],
    tips: "Be specific about what you need the rides for — work, medical appointments, interviews. Programs prioritize trips with a purpose.",
  },
  {
    id: "gift-cards", audited: "2026-10-10", title: "Free Food Gift Cards", icon: "🍔",
    intro: "There's no government program for these — but churches and charities do hand out grocery and fast-food gift cards. Here's where to ask.",
    where: "Salvation Army", whereId: "salvation-army",
    bring: [
      "Photo ID",
      "Proof of address (a bill, lease, or shelter letter)",
      "Be ready to explain your situation — kids, no kitchen, no transportation",
    ],
    steps: [
      "Call 211 and ask specifically about gift-card or grocery assistance",
      "Ask at church offices — [[svdp-clothing-vouchers]] (St. Vincent de Paul, 1600 S Calhoun St) parish conferences and church benevolence funds are the classic source",
      "Ask [[salvation-army-aid]] (Salvation Army, 2901 N Clinton St) and [[just-neighbors]] (Just Neighbors, 2925 E State Blvd) about emergency food help — cards are sometimes given case by case",
      "Ask food pantries if they ever distribute grocery-store cards, especially around holidays",
      "If you're staying at a shelter, ask the staff — many keep a few emergency cards",
    ],
    tips: "Most cards are for grocery stores, not fast food — and it's usually one per household, not a regular thing. Be polite, be honest, and don't ask the same place twice in a row.",
  },
  {
    id: "addiction", audited: "2026-10-11", title: "Getting Help for Addiction", icon: "💜",
    intro: "Help for alcohol or drug problems in Fort Wayne — detox, rehab, and free support groups. Asking for help is the hard part; the rest is just showing up.",
    where: "SAMHSA National Helpline — free referrals 24/7", whereId: "parkview-behavioral",
    bring: [
      "Photo ID, if you have one",
      "Insurance card or Medicaid info, if you have it (no insurance? most places still take you)",
      "A list of any medications you take",
      "A bag with basics if you might stay overnight (detox/rehab)",
    ],
    steps: [
      "Call the SAMHSA National Helpline at 1-800-662-4357 — free, confidential, 24/7, and they'll match you to a local program",
      "Need detox right now? [[parkview-behavioral]] (Parkview Behavioral Health Institute, 1720 Beacon St, 260-373-7500) takes walk-ins 24/7 and accepts Medicaid",
      "Want residential rehab? [[fort-wayne-recovery]] (Fort Wayne Recovery, 310 E Dupont Rd, 833-762-3739) does intake 24/7 and helps with housing and jobs too",
      "On opioids? [[bhg-fw]] (BHG Fort Wayne Treatment Center, 3910 Lima Rd, 260-465-0130) does methadone/Suboxone outpatient treatment — dosing mornings Mon–Fri 5a–1p, weekends 5:30–9a",
      "Women leaving jail or short-term treatment: [[redemption-house]] (Redemption House, 2720 Fairfield Ave, 260-745-1005) offers a 6-month faith-based home",
      "For free ongoing support, just walk into an AA meeting (260-471-6262) or NA meeting (260-427-9113) — no sign-up, no cost",
      "Carry Narcan, it's free in Indiana: Overdose Lifeline's map at overdoselifeline.org/naloxone-indiana-distribution shows 24/7 NaloxBoxes (outdoor pickup, no interaction needed) and free naloxone vending machines — or they'll ship a free kit to you",
    ],
    tips: "You don't have to be 'ready' or hit rock bottom — call while you're thinking about it. If you use and you're scared about overdosing, Indiana's Lifeline Law protects people who call 911 for help.",
  },
  {
    audited: "2026-10-11", id: "freephone", title: "Getting a Free Phone (Lifeline)", icon: "📱",
    intro: "The federal Lifeline program gives low-income households a $9.25/month discount on phone or internet service — and several providers in Indiana throw in a free basic smartphone to go with it.",
    where: "Apply online or by phone — no store visit needed",
    bring: [
      "Proof you qualify — a benefit letter (SNAP, Medicaid, SSI, etc.) or proof your income is at/below 135% of the poverty line",
      "Proof of address",
      "Proof of identity (photo ID)",
    ],
    steps: [
      "Check that you qualify: SNAP, Medicaid, SSI, public housing, Veterans Pension — or income at/below 135% of the federal poverty line. One benefit per household.",
      "Apply through the FCC's National Verifier at nv.fcc.gov (or checklifeline.usac.org) — this is the official government approval step",
      "Pick an Indiana Lifeline provider: Assurance Wireless (free phone + plan on T-Mobile, 1-888-321-5880), SafeLink Wireless (free phone or free SIM, 1-800-378-1684), enTouch Wireless (free SIM for your own phone, 1-866-488-8719), AirTalk Wireless (free smartphone, 1-855-924-7825), TAG Mobile (free phone, new in Indiana 2026, 1-800-986-5670), TruConnect (free phone or SIM, apply online), Tempo (free phone, 1-833-998-3676), or Life Wireless (free phone or SIM, 1-888-543-3620) — all also listed as places in this app",
      "Enroll with the provider you chose — they activate your free phone or ship you one",
      "Re-certify once a year to keep the benefit",
    ],
    tips: "The old Affordable Connectivity Program (ACP) ENDED in June 2024 — if anyone tries to sign you up for ACP, it's a scam or outdated info. Lifeline is the program that's active now.",
  },
  {
    audited: "2026-10-10", id: "freedata", title: "Free Internet & WiFi", icon: "📶",
    intro: "Free WiFi spots all over Fort Wayne — libraries, coffee shops, and fast-food places — plus a free data discount if you qualify.",
    where: "Any of the spots below — no purchase needed at the library",
    steps: [
      "Best free internet downtown: [[acpl-main]] (Allen County Public Library main branch, 900 Library Plz — open Mon–Thu 9–9, Fri–Sat 9–6, Sun 12–5) — free WiFi, seating, power outlets",
      "Near-northwest side: ACPL Little Turtle branch, 2201 Sherman Blvd (Mon–Wed 10–9, Thu–Sat 10–6)",
      "Late hours: [[mcdonalds-255-e-coliseum-blvd]] (McDonald's, 255 E Coliseum Blvd — 24-hour drive-thru) — free WiFi, good when the library is closed",
      "Comfortable seating, open early: [[sb-coliseum]] (Starbucks, 301 E Coliseum Blvd — daily 4:30 AM–9:30 PM) — free WiFi, no purchase needed to sit",
      "Need data on your own phone? The Lifeline program above includes monthly high-speed data with most providers' free plans — see the Free Phone guide",
      "No library card needed just to use the WiFi — sit down, connect, and get online",
    ],
    tips: "Public WiFi is fine for browsing and job applications, but avoid logging into bank accounts on it. Libraries also have free computers and printers if you don't have a device.",
  },
  {
    audited: "2026-10-11", id: "lgbtq", title: "LGBTQ+ Support in Fort Wayne", icon: "🌈",
    intro: "Affirming places in Fort Wayne where you can be yourself — community, health care, legal help, and crisis lines that get it.",
    where: "Fort Wayne Pride Center — the year-round LGBTQ+ hub downtown", whereId: "fw-pride-center",
    steps: [
      "Need community? [[fw-pride-center]] (Fort Wayne Pride Center, 527 W Berry St) runs monthly support groups and social events — check fwpride.org for the calendar. Trans or nonbinary and 18+? Evolution X meets the 4th Tuesday, 7–9 PM.",
      "Need affirming health care? [[planned-parenthood-fw]] (Planned Parenthood, 2930 Lake Ave, 1-800-769-0045) offers gender-affirming hormone therapy on an informed-consent model — no therapist letter needed — plus STI testing on a sliding scale.",
      "Need free HIV/STD testing? [[positive-resource-connection]] (Positive Resource Connection, 525 Oxford St, 260-744-1144) does free confidential testing with no appointment, plus PrEP for the uninsured.",
      "Need legal help? [[indiana-legal-services]] (Indiana Legal Services, 110 W Berry St Ste 2007, 260-424-9155) does free name and gender-marker changes, fights discrimination, and helps with insurance coverage of gender-affirming care.",
      "Young and need someone to talk to? The Center for Nonviolence (260-456-4112) runs an LGBTQ+ youth group, and the Trevor Project (1-866-488-7386) is there 24/7.",
    ],
    tips: "You don't have to explain or justify who you are to get help at any of these places — that's the whole point of them.",
  },
  {
    id: "freefood", title: "Free Food in Fort Wayne", icon: "🍲",
    intro: "Three ways to eat free in Fort Wayne: food banks for groceries, hot meals served daily, and grab-and-go bag lunches.",
    where: "The Franciscan Center gives out 1,200+ free sack lunches every Saturday", whereId: "franciscan-food",
    steps: [
      "Need groceries? [[community-harvest]] (Community Harvest Food Bank, 999 E Tillman Rd) and neighborhood pantries like [[miss-virginia]] (Miss Virginia's Food Pantry, 1312 S Hanna St) hand out free food — bring a bag and check their hours before you go.",
      "Need a hot meal today? [[st-marys]] (St. Mary's Soup Kitchen, 1101 Lafayette St) serves free hot meals — tap their card for address, hours, and directions.",
      "Need a bag lunch to go? The Franciscan Center (4643 Gaywood Dr) gives out 1,200+ free sack lunches every Saturday — just show up, no appointment or ID needed.",
      "In a hurry? Search \"bag lunch\" in the Places tab to find bag-lunch spots near you.",
    ],
    tips: "Most food places are first-come, first-served — going early in the day usually means the best selection. Hours can change, so calling ahead never hurts.",
  },
  {
    id: "safehaven", title: "Safe Haven for Newborns", icon: "👶",
    audited: "2026-10-10",
    intro: "If you can't care for a newborn, Indiana law lets you surrender the baby safely, anonymously, and legally.",
    where: "Safe Haven Baby Boxes", whereId: "safehaven-hq",
    steps: [
      "Call the 24/7 Safe Haven Hotline at 1-866-99BABY1 (1-866-992-2291) \u2014 licensed counselors, fully confidential, can help with surrender or with resources to keep your baby",
      "Indiana's Safe Haven law covers infants 30 days old or younger \u2014 surrender is legal and you face no arrest or prosecution as long as the baby is unharmed",
      "Option 1 \u2014 baby box: place the newborn in a Safe Haven Baby Box at a fire station or hospital. A silent alarm instantly alerts the staff inside, who retrieve the baby within minutes. No cameras, no face-to-face contact. NOTE: there IS a box inside Fort Wayne \u2014 Lutheran Downtown Hospital, 702 Van Buren St (ED ambulance bay, dedicated May 2022); more boxes in New Haven and Woodburn (see map pins); every Fort Wayne fire station also takes babies directly (see FW Fire Station 1 pin)",
      "Option 2 \u2014 hand the baby directly to any on-duty hospital, fire station, police, or EMS worker, or call 911 and stay with the baby until responders arrive",
      "The baby gets a medical check, then Indiana DCS places the child with a caregiver and begins finding an adoptive family",
      "You have up to 30 days to change your mind after surrendering",
    ],
    tips: "There is no button that sends a hospital to your location \u2014 the boxes are fixed, staffed locations. In an emergency, call 911.",
  },
  {
    id: "winter", audited: "2026-10-10", title: "Staying Warm in Winter", icon: "\u2744\uFE0F",
    intro: "Fort Wayne's winter shelter plan (Dec 1 \u2013 Mar 31): warming centers by day, emergency beds at night when it's freezing.",
    where: "Fort Wayne Rescue Mission", whereId: "fwrm",
    steps: [
      "Daytime warming: [[fwrm]] (Fort Wayne Rescue Mission, 404 E Washington Blvd) — open 7am–6pm, 7 days a week, no matter the temperature",
      "Below 32\u00B0F at night: the Rescue Mission opens emergency weather beds \u2014 18+, sober on arrival, no active warrants",
      "Women & families: [[winter-contingency-shelter]] (Winter Contingency Emergency Shelter, Salvation Army, 2901 N Clinton St) — 24/7, walk in any time and check in with staff on arrival",
      "Families: call [[just-neighbors]] (Just Neighbors, 2925 E State Blvd, (260) 458-9772); single women: call [[josephines]] (Josephine's Place, 3505 Lake Ave, (260) 426-7358) — if full, check in at the Rescue Mission 4:30–6:30pm",
      "Daytime extra: [[inasmuch-ministry]] (Inasmuch Ministry, 930 Broadway) — Mon–Fri 7:30–11:30am, plus Mon evenings 4:30–6:30pm",
    ],
    tips: "If this app shows the \u2744\uFE0F cold alert, emergency beds are likely open tonight. If you think you're barred from the Rescue Mission, call (260) 426-7357 ext. 156 between 2\u20133pm to check your status.",
  },
  {
    id: "ride-bus", title: "Riding Citilink (Bus)", icon: "🚌",
    audited: "2026-10-10",
    intro: "Fort Wayne's bus system \u2014 $1.50 a ride covers most stops in this app.",
    where: "Citilink Central Station, 121 W Baker St",
    bring: [
      "Exact fare \u2014 drivers don't carry change",
    ],
    steps: [
      "Adult fare: $1.50 per ride, or $3.75 for an all-day pass \u2014 buy on the bus (exact change) or pay in the Token Transit app",
      "Kids under 5 ride free; ages 5\u201318, seniors, people with disabilities, and Medicare holders ride for $0.75 (bring a Citilink or school picture ID)",
      "Plan your trip: use the Transit Royale app, or call Citilink at (260) 432-4546 for personal trip planning",
      "Track your bus live in the DoubleMap app so you're not waiting out in the cold",
      "New to buses? Free travel training \u2014 in person or virtual \u2014 at fwcitilink.com/travel-training or (260) 432-4546",
      "Tap the 🚌 Bus button on any place in this app for turn-by-turn bus directions",
    ],
    tips: "No transfers \u2014 each boarding is a new fare. An all-day pass pays for itself after 3 rides.",
  },
  {
    audited: "2026-10-11", id: "free-bike", title: "Getting a Free Bike", icon: "🚴",
    intro: "There is a real, verified way to get a free bike in Fort Wayne: earn one through a bike ministry. The bikes are free — you just put in a few hours first.",
    where: "Heart of the City Bike Ministry", whereId: "hotc-bike-ministry",
    bring: [
      "Your ID, if you have one \u2014 call (260) 444-2901 first and ask what to bring",
      "Work clothes (you'll be fixing bikes in the shop)",
    ],
    steps: [
      "Call or stop by [[hotc-bike-ministry]] (Heart of the City Bike Ministry, 1651 Cass St) on a Friday morning — they are a program of Heart of the City Mission Foundation",
      "Sign up for earn-a-bike: 6 hours of community service, OR spend two Fridays helping in the bike shop",
      "Work your hours alongside the volunteers \u2014 you'll also learn how to repair bikes yourself",
      "Pick up your rebuilt, free bike when your hours are done",
      "Need air or a tune-up later? This app lists 8 free bike pump/repair stations on the trails",
    ],
    tips: "They stopped simply handing bikes out \u2014 the effort requirement is intentional, so the bike has real value. Bike availability depends on donations, and Friday hours can change, so call (260) 444-2901 ahead.",
  },
  {
    audited: "2026-10-10", id: "free-vouchers", title: "Getting Free Vouchers (Gas, Food & More)", icon: "\ud83c\udfab",
    intro: "Real places in Fort Wayne that hand out vouchers and gift cards for free food, clothes, bus rides, and more. Everything below is verified — but voucher funds run out fast, so call ahead and ask early in the month.",
    where: "St. Vincent de Paul — Free Vouchers", whereId: "svdp-clothing-vouchers",
    bring: [
      "Photo ID and proof of address (most places ask for these)",
      "If you were recently released from jail or prison: bring your release papers (needed for Salvation Army clothing vouchers)",
    ],
    steps: [
      "[[svdp-clothing-vouchers]] (St. Vincent de Paul, 1600 S Calhoun St): free clothing and furniture vouchers redeemable at their thrift store — ask in the store or contact a local SVdP parish conference. SVdP volunteers also give food vouchers to Community Harvest Food Bank and grocery store gift cards as needed through 22 locations across Northeast Indiana.",
      "[[salvation-army-aid]] (Salvation Army, 2901 N Clinton St, (260) 744-2311): bus passes handed out Monday/Wednesday/Friday for work, doctor visits, or job search — limited supply each month, so ask early. Clothing vouchers for people recently released (ID + release papers required) or in crisis situations (decided case by case).",
      "[[associated-churches]] (Associated Churches, 602 E Wayne St): through its Meijer Simply Give partnership, distributes grocery gift cards to families in need across its 130-church pantry network — ask at the food bank.",
      "HEAL Farm Markets: every summer, SNAP, WIC, and Senior produce vouchers are DOUBLED ($1 of vouchers buys $2 of fresh produce) at three Fort Wayne markets. The 2026 season ended in early September — call (425) 213-7516 or check sjchf.org for 2027 dates.",
      "Gas vouchers: no program in Fort Wayne advertises free gas vouchers year-round. Your best shot is calling 211 or the Salvation Army at (260) 744-2311 and asking about current travel or gas assistance funds — these change month to month and run out fast. The Salvation Army can also help with electric/gas BILLS (not fuel) by appointment when funds are available — you need a denial letter from your township trustee first.",
    ],
    tips: "Voucher money is limited everywhere — the start of the month is the best time to ask. Always call before traveling, and tell them what you need (gas, bus pass, clothes, food) so they can point you to the right fund.",
  },
  {
    audited: "2026-10-11", id: "banking", title: "Opening a bank account without a stable address", icon: "\ud83c\udfe6",
    intro: "Four Fort Wayne banks and credit unions offer truly free checking - $0 monthly fee, no direct-deposit tricks. You still need an ID and a Social Security number, plus an address for mail. Here's how to get each piece.",
    where: "Fifth Third Bank - Downtown (Express Banking)", whereId: "53-downtown-berry",
    bring: [
      "Photo ID - state ID, driver's license, passport, or (at Partners 1st) birth certificate",
      "Social Security number - card, pay stub, or W-2 (Partners 1st also accepts an ITIN card)",
      "Proof of address - lease, utility bill, bank statement, or a shelter/nonprofit letter (see steps)",
      "$0-$30 to open, depending on the bank",
    ],
    steps: [
      "Get a photo ID. An Indiana state ID costs $9 at the BMV - it's free only if you're 18+, a U.S. citizen, and eligible to vote. Homeless youth 16-17 can get one free through a nonprofit or government agency affidavit (Indiana law IC 31-36-3-4).",
      "No fixed address? Indiana's official Residency Affidavit (State Form 50879) lets a shelter or nonprofit write a letter on their letterhead saying they serve you and will accept your mail - that counts as your residency proof at the BMV.",
      "Lost your Social Security card? Replacements are FREE at ssa.gov (online) or any Social Security office - the card arrives by mail in 5-10 business days. Never pay a website that charges for this (official SSA scam warning).",
      "Pick a bank from the Free Banking pins: Fifth Third Express Banking ($0/mo, $0 to open, no overdraft fees - Bank On certified), Partners 1st Classic 1st Checking ($0/mo, about $5 to open, ITIN accepted), ProFed eChecking ($0/mo, $25 + $5 savings to open, eStatements required), or 3Rivers Simply Free Spending ($0/mo, $25 to open, eStatements required).",
      "Call first and ask two questions: (1) 'Do you use ChexSystems, and what happens if I'm in it?' (2) 'I don't have a fixed address - can I use a shelter address or letter?' None of these banks publish a homeless-address policy, so ask in person if the phone answer is unclear.",
      "No branches work for you? Online-only options like Chime, Cash App, or SoFi have no Fort Wayne branches - check their current terms yourself before signing up.",
    ],
    tips: "Look for the 'Bank On certified' label - it means no overdraft fees, ever. We checked and excluded: Chase Secure Banking ($4.95/month with no easy waiver), Huntington (the account is free but there are no Fort Wayne branches - the Mill Lake Rd branch is closed), Centra Credit Union (no Fort Wayne branches), and Summit Choice Credit Union (membership restricted to fire/police/city/county employees). USPS General Delivery works at the Fort Wayne Main Post Office, 1501 S Clinton St - address mail as YOUR NAME / GENERAL DELIVERY / FORT WAYNE, IN 46802-9999; bring photo ID to pick up; mail is held up to 30 days.",
  },
  {
    audited: "2026-10-11", id: "free-backpacks", title: "Free Backpacks & School Supplies", icon: "\ud83c\udf92",
    intro: "Five verified Fort Wayne programs give out free backpacks \u2014 every one is seasonal (late July / early August), so mark your calendar and call ahead.",
    where: "Salvation Army \u2014 Tools for School", whereId: "salvation-army-tools-for-school",
    bring: [
      "Photo ID",
      "Social Security cards or birth certificates for school-age kids (the Salvation Army asks for these \u2014 call to confirm the current-year process)",
      "Proof of income or assistance, if you have it",
    ],
    steps: [
      "[[salvation-army-tools-for-school]] (Salvation Army, 2901 N Clinton St, (260) 744-2311) runs Tools for School every summer: supplies are collected mid-June through late July and fully-stocked backpacks for K\u201312 students go out in early August (2026 distribution: Aug 5, 4\u20137pm). Seasonal \u2014 call to confirm next year's dates and how to apply.",
      "[[anthis-career-center]]: the FWCS Back-to-School Block Party happens the first Saturday of August, 9am\u201312pm, at the Bill C. Anthis Center parking lot, 1200 S Barr St. The first 500 students to finish the FWCS passport get a free backpack plus supplies. Free for all FWCS families, while supplies last \u2014 call (260) 467-2120 to confirm.",
      "[[bowen-center]] (Bowen Health, 2100 Goshen Rd #102, (260) 471-3500) hosts a Backpack Giveaway & Health Fair every July at Rudisill Plaza, 201 E Rudisill Blvd \u2014 free school supplies plus immunizations and health screenings. Seasonal \u2014 call to confirm next year's date.",
      "[[acpl-main]] (Allen County Public Library, Main Library, 900 Library Plaza) partners with Blessings in a Backpack for an end-of-July giveaway \u2014 free backpacks filled with non-perishable food, first-come-first-served for school-aged children (child must be present). Note: these are food bags, not school-supply backpacks. Seasonal.",
      "Fort Wayne Police Department's National Night Out (first Tuesday of August) handed out 700 backpacks with school supplies in 2026 \u2014 the location changes every year, so call FWPD non-emergency to confirm next year's site.",
    ],
    tips: "Supplies run out fast at every one of these \u2014 go early. Missed the season? Ask [[salvation-army-aid]] (Salvation Army, 2901 N Clinton St, (260) 744-2311) whether any supplies remain.",
  },
  {
    audited: "2026-10-10", id: "free-water-bottles", title: "Free Reusable Water Bottles", icon: "\ud83d\udca7",
    intro: "Free reusable water bottles are harder to find than you'd think \u2014 here are the two verified sources in Fort Wayne, both with honest caveats.",
    where: "Food Not Bombs Fort Wayne", whereId: "food-not-bombs-fw",
    bring: [
      "Just yourself \u2014 no ID or paperwork needed",
    ],
    steps: [
      "[[food-not-bombs-fw]] (Food Not Bombs Fort Wayne) runs a summer insulated-bottle drive \u2014 donated bottles are cleaned, filled with cold water, and handed out to people experiencing homelessness during regular meal shares. Show up Sundays 2\u20133pm at Freimann Square, 200 E Main St. Seasonal (summer heat season) \u2014 call The Honey Plant, 1436 N Wells St, ahead to confirm bottles are available.",
      "[[salvation-army-tools-for-school]] (Salvation Army, 2901 N Clinton St, (260) 744-2311) packs water bottles inside its Tools for School backpacks for K\u201312 students every August \u2014 the bottles come bundled with the backpack, not standalone. Seasonal \u2014 call to confirm.",
    ],
    tips: "No verified spot in Fort Wayne hands out reusable bottles year-round as a walk-in item. For drinking water any time, check the Drinking Water pins on the map \u2014 and every library branch has water fountains.",
  },
  {
    audited: "2026-10-10", id: "free-hygiene", title: "Free Hygiene Products", icon: "\ud83e\uddfc",
    intro: "Four verified Fort Wayne spots that hand out free soap, shampoo, deodorant, toothbrushes, and more \u2014 no purchase, no catch.",
    where: "Ave Maria House", whereId: "ave-maria",
    bring: [
      "Just yourself \u2014 no ID or paperwork needed at most of these",
    ],
    steps: [
      "[[ave-maria]] (Ave Maria House, 432 Madison St, (260) 424-8231) \u2014 walk-in day respite for the homeless, Mon\u2013Fri 10am\u20131pm. Free razors, deodorant, toothpaste, and travel-size toiletries, plus t-shirts, underwear, and boxers. You can also shower, do laundry, and use computers.",
      "[[fwcs-clothing-bank]] (FWCS Clothing Bank, 1511 Catalpa St Door #26, (260) 467-2520) gives free toiletries to FWCS students \u2014 but you need a referral from the student's school case manager or counselor, and appointments are required (Mon\u2013Fri 8am\u20132pm).",
      "[[clothes-for-joes]] (Clothes For Joes, 2202 S Calhoun St, (260) 442-8600) \u2014 veterans shop free Saturdays 10am\u20132pm: soap, toothbrushes, toothpaste, shampoo, and other hygiene items plus clothing. Veterans only \u2014 bring veteran ID if you have it.",
      "[[blessing-our-community]] (Blessing Our Community, (260) 255-4073) hands out free care packages with hygiene items at outreach events \u2014 back-to-school, Easter, and a Christmas giveaway with coats and blankets. Event-based, not walk-in \u2014 call or text to confirm the next event date.",
    ],
    tips: "Hygiene supplies go fast at walk-in spots \u2014 go early in the day. If supplies are out, ask the staff when the next restock lands.",
  },
  {
    audited: "2026-10-11", id: "free-clothes", title: "Free Clothes, Shoes & Socks", icon: "\ud83d\udc55",
    intro: "Free clothes, shoes, and socks in Fort Wayne \u2014 not thrift stores, actually free. Some need a referral, some are walk-in.",
    where: "FWCS Clothing Bank", whereId: "fwcs-clothing-bank",
    bring: [
      "Photo ID, if you have it",
      "For the FWCS Clothing Bank: a referral from the student's school case manager or counselor",
    ],
    steps: [
      "[[fwcs-clothing-bank]] (FWCS Clothing Bank, 1511 Catalpa St Door #26, (260) 467-2520) \u2014 free clothes, shoes, coats, and NEW socks and underwear for FWCS students facing poverty or homelessness. Referral from the school case manager or counselor required; appointments required, Mon\u2013Fri 8am\u20132pm.",
      "[[ave-maria]] (Ave Maria House, 432 Madison St) \u2014 free t-shirts, underwear, and boxers for homeless guests, Mon\u2013Fri 10am\u20131pm. Walk in, no referral needed.",
      "[[clothes-for-joes]] (Clothes For Joes, 2202 S Calhoun St, (260) 442-8600) \u2014 free new and lightly used clothing for veterans, Saturdays 10am\u20132pm. Veterans only.",
      "[[svdp-clothing-vouchers]] (St. Vincent de Paul, 1600 S Calhoun St, (260) 456-3561) \u2014 free clothing vouchers redeemable at their thrift store, for anyone regardless of background. Vouchers come through the Society \u2014 call first to find out how to get one.",
      "Salvation Army Angel Tree (2901 N Clinton St, (260) 744-2311) \u2014 every Christmas, new clothing and toys for kids ages 0\u201314 in families facing hardship. Seasonal \u2014 call to confirm current-year dates.",
    ],
    tips: "Need winter coats? The Christmas giveaways ([[blessing-our-community]] and Angel Tree) are the best bet \u2014 both seasonal, so plan ahead. Just outside Fort Wayne: Woodburn Community Clothing Bank (4707 Lynnwood, Woodburn, ~15 min east) gives free shoes, socks, and winter gear to Allen County residents.",
  },
  {
    id: "oregon-snap", audited: "2026-10-10", title: "SNAP / EBT (Oregon)", icon: "🛒", area: "portland",
    intro: "Monthly money on an EBT card for groceries, run by the Oregon Dept. of Human Services (ODHS). If your income is low, you likely qualify.",
    where: "ODHS Five Oak Self-Sufficiency Office — 290 SW 5th Ave", whereId: "odhs-five-oak-portland",
    bring: [
      "Photo ID (bring whatever ID you have — they work with you)",
      "Proof of income for the last 30 days — pay stubs, or just say you have no income",
      "Social Security numbers for everyone applying (the cards themselves aren't required)",
      "Proof of address — a letter from a shelter counts; tell them if you're homeless",
    ],
    steps: [
      "Apply online at benefits.oregon.gov (the ONE system), by phone at 800-699-9075, or in person at any ODHS Self-Sufficiency office",
      "Do the interview — a worker meets you in person or calls you (most Portland offices offer same-day or next-day interviews)",
      "Get a decision, usually within 30 days — faster if you're in crisis",
      "Your EBT card arrives by mail; use it at most grocery stores and manage benefits in the Oregon ONE Mobile app",
    ],
    tips: "You can apply with no ID and no address — just tell them you're homeless. ODHS verifies what you can't document. Older adults and people with disabilities can also start by calling their local Senior Services office and do the interview by phone.",
  },
  {
    id: "oregon-ohp", audited: "2026-10-10", title: "Oregon Health Plan (OHP)", icon: "🩺", area: "portland",
    intro: "Oregon's Medicaid — free health coverage for low-income Oregonians: doctor visits, prescriptions, mental health and addiction treatment, plus dental.",
    where: "Outside In — 1132 SW 13th Ave (OHP enrollment help for homeless youth)", whereId: "outside-in",
    bring: [
      "Photo ID",
      "Proof of income",
      "Proof of Oregon address — or tell them you're homeless in Oregon",
      "Social Security numbers for the household",
      "Immigration documents, if not a U.S. citizen",
    ],
    steps: [
      "Apply online at benefits.oregon.gov (the ONE system) or at OregonHealthCare.gov",
      "Apply by phone: 1-800-699-9075 (TTY 711) — help in many languages",
      "Get free one-on-one help from an OHP-certified community partner — find one at OregonHealthCare.gov/GetHelp",
      "After approval you're assigned a coordinated care organization (CCO) that manages your care; you can see a doctor even before your OHP ID card arrives",
    ],
    tips: "All kids and teens 19 and under qualify regardless of immigration status. Renew every year or you lose coverage — keep your address updated with OHP.",
  },
  {
    id: "oregon-legal", audited: "2026-10-10", title: "Free Legal Help (Portland)", icon: "⚖️", area: "portland",
    intro: "Two nonprofits give free civil legal help to low-income Portlanders — housing and eviction, benefits appeals, domestic violence, and consumer debt.",
    where: "Legal Aid Services of Oregon — Portland, 621 SW Morrison St, Suite 900", whereId: "legal-aid-services-oregon-portland",
    bring: [
      "Photo ID",
      "Proof of income — they generally help people up to about 125% of the federal poverty level",
      "Any papers about your legal problem — eviction notice, court dates, benefits denial letters",
    ],
    steps: [
      "Call Legal Aid Services of Oregon at (503) 224-4086 for intake: Mon–Fri 9 AM–12 PM & 1–5 PM",
      "For benefits issues (OHP, SNAP, SSI/SSDI, unemployment) ask about the Public Benefits Hotline first",
      "Oregon Law Center — Portland, 621 SW Morrison St, Suite 1450, (503) 295-2760 (oregonlawcenter.org) is the other free option",
      "Neither handles criminal cases — for criminal matters, ask the court to appoint a public defender",
    ],
    tips: "Call early in the day — intake lines fill up. Got an eviction notice? You usually have very little time to respond in Oregon, so call the day you get it.",
  },
  {
    id: "oregon-freephone", audited: "2026-10-10", title: "Free / Discounted Phone (Oregon Lifeline)", icon: "📱", area: "portland",
    intro: "Oregon Lifeline is a federal-plus-state program giving low-income Oregonians a monthly discount on phone or internet — and free wireless minutes and data through Access Wireless.",
    where: "Apply at lifeline.oregon.gov or call (800) 848-4442 (weekdays 9 AM–4 PM)",
    bring: [
      "Photo ID",
      "Proof you're on a qualifying program — a SNAP or OHP/Medicaid benefit letter works",
    ],
    steps: [
      "Important: Oregon does NOT use the federal National Verifier — use Oregon's own process at lifeline.oregon.gov",
      "Apply online at lifeline.oregon.gov or call (800) 848-4442, weekdays 9 AM–4 PM",
      "For free wireless voice minutes and data, apply through Access Wireless (accesswireless.com)",
      "One benefit per household — and you must recertify every year or you lose it",
    ],
    tips: "Discounts run up to about $20/month off phone or $24/month off high-speed internet — check lifeline.oregon.gov for current amounts. On Tribal lands there's an extra ~$25/month.",
  },
  {
    audited: "2026-10-10", id: "oregon-id", title: "Free Oregon ID (Homeless)", icon: "🪪", area: "portland",
    intro: "Oregon law (HB 3026, in effect since 2022) makes the DMV waive ID card fees for people experiencing homelessness.",
    where: "Downtown Portland DMV", whereId: "dmv-downtown-portland",
    bring: [
      "A Determination of Homelessness form — signed by a shelter, nonprofit, or social-service agency that knows you",
      "Whatever ID or documents you have (a birth certificate helps if you have one)",
      "Note: the waiver covers ID cards only, NOT driver licenses — if you hold an Oregon driver license you'll have to surrender it to get the free ID",
    ],
    steps: [
      "Ask a shelter, day center, or nonprofit you use for a Determination of Homelessness form — many Portland providers keep them on hand",
      "Take the signed form to any Oregon DMV office",
      "The DMV issues your ID card free — the application, renewals, and up to two replacement cards are covered",
    ],
    tips: "Don't pay a third party for this — the form and the ID are free. Ask your caseworker or day center staff; they do these regularly.",
  },
  {
    id: "trimet-fare", title: "TriMet Reduced Fare (Honored Citizen)", icon: "🚌", area: "portland", audited: "2026-10-10",
    intro: "TriMet's Honored Citizen fare cuts bus, MAX, and WES fares roughly in half — for low-income riders, seniors 65+, people on Medicare, people with disabilities, and veterans.",
    where: "TriMet Honored Citizen Reduced Fare", whereId: "trimet-honored-citizen",
    bring: [
      "Government-issued photo ID",
      "Proof of low income — recent pay stub, OHP card, or SNAP award letter (enrollment in OHP or SNAP also qualifies you)",
      "If applying on disability: a provider-signed application, or an SSA benefit letter dated within the last 3 months",
    ],
    steps: [
      "Low income (ages 18–64, up to 200% of the poverty level): get an eligibility screening at a community partner site (IRCO, WorkSource Oregon, Centro Cultural, and others)",
      "Take your verification receipt to the TriMet Ticket Office at Pioneer Courthouse Square for a personalized Hop card",
      "Seniors 65+, Medicare, or disability: fill out the Honored Citizen application — call 503-962-2455 to have one mailed, with provider verification of disability",
      "Re-verify every 2 years to keep the fare. Need door-to-door rides? Ask TriMet about LIFT paratransit: (503) 238-7433",
    ],
    tips: "With a Hop card you never pay more than $28/month — after that, rides are free the rest of the month.",
  },
  {
    audited: "2026-10-11", id: "oregon-211", title: "211info (Oregon Helpline)", icon: "📞", area: "portland",
    intro: "211info is Oregon's free, confidential helpline and searchable directory for housing, shelter, food, utilities, health care, and more — covering all 36 Oregon counties.",
    where: "211info", whereId: "211info-oregon",
    bring: [
      "Just your ZIP code and a description of what you need — no ID, no paperwork",
    ],
    steps: [
      "Call 211 — from a landline you can also dial (503) 222-5555, or toll-free (866) 698-6155",
      "Text your ZIP code to 898211 to chat with a specialist by text",
      "Search the database yourself at 211info.org, or email help@211info.org",
      "Specialists are available Monday–Friday, 8 AM–6 PM, with interpreters in 150+ languages",
    ],
    tips: "211 is for non-emergency help finding services — always call 911 for emergencies. Top requests are utility help, rent help, food, and shelter, so call early in the day.",
  },
  {
    id: "oregon-winter", title: "Staying Warm in Winter (Portland)", icon: "❄️", area: "portland",
    intro: "When winter thresholds hit (around 25°F or snow/ice, roughly Nov–Mar), Multnomah County opens extra severe-weather shelters across the county — on top of nearly 3,000 year-round shelter beds (per county releases, Feb 2025) plus 200 winter-only beds at Salvation Army shelters.",
    where: "Multnomah County Severe Weather Shelters (via 211)", whereId: "multnomah-severe-weather-shelters",
    steps: [
      "Call [[211info-oregon]] (dial 211) or visit 211info.org — during severe weather they run 24 hours and will tell you which shelters are open tonight",
      "Free rides to warming shelters: call 211 and ask — 211info arranges transportation",
      "TriMet will not turn away anyone riding to or from an emergency warming shelter during shelter hours — tell the driver you are headed to a shelter",
      "Pets are allowed at all severe-weather sites, and all sites are accessible",
      "Daytime: Multnomah County Library branches are open normal hours as warming spaces — check the interactive warming map at multco.us/cold",
      "Worried about someone outside in the cold? Call the non-emergency line (503) 823-3333 for a welfare check — call 911 if their life is in danger",
    ],
    tips: "Severe-weather shelters open only when thresholds are met — always call 211 first instead of walking to last year's site. For the latest openings bookmark multco.us/cold.",
    audited: "2026-10-10",
  },
  {
    id: "lost-id", title: "Replacing Lost ID & Papers", icon: "🪪", area: "fort-wayne",
    intro: "No ID makes everything harder. Here is the usual order to get your papers back.",
    where: "Inasmuch Ministry — help with ID and birth certificates", whereId: "inasmuch-ministry",
    bring: ["Any ID or paper you still have, even expired", "A letter from a shelter or mission saying you stay there, if you can get one"],
    steps: [
      "Start with your birth certificate. Order it from the Indiana Department of Health or the health department where you were born. There is a fee, so ask Inasmuch Ministry whether they can help pay.",
      "Next, get a replacement Social Security card. It is free at ssa.gov or any Social Security office. There is a limit on replacements per year, so only ask when you need it.",
      "Then get a state ID at the BMV. Ask the BMV what proof of address they take and whether any fee waiver applies to you.",
      "Need a mailing address? Ask your shelter or mission, or ask any post office about General Delivery, where they hold mail for you."
    ],
    tips: "Take a photo of every paper once you have it and keep it safe. Fees and rules change, so call before you go.",
    audited: "2026-10-12",
  },
  {
    id: "rights-police", title: "If Police Tell You to Move", icon: "⚖️", area: "fort-wayne",
    intro: "General information, not legal advice. Staying calm keeps you safest.",
    where: "Indiana Legal Help (indianalegalhelp.org) or call 211",
    steps: [
      "Stay calm, keep your hands where they can be seen, and don't run or argue.",
      "Ask: \"Am I free to go?\" If yes, you can leave. If they say you are being detained, ask why.",
      "You can stay silent. You can say \"I don't consent to a search.\" Do not physically resist.",
      "Ask for the officer's name and badge number. Write down what happened, the time, and the place as soon as you can.",
      "If you think something was unfair, call 211 or visit Indiana Legal Help to find free legal aid."
    ],
    tips: "Having your ID and a charged phone helps. Ask a shelter or day center where it is okay to rest during the day.",
    audited: "2026-10-12",
  },
  {
    id: "veterans", title: "Veterans: Where to Start", icon: "🎖\uFE0F", area: "fort-wayne",
    intro: "Veterans have extra help for housing, health care and benefits.",
    where: "Call 211 and ask for the Allen County Veterans Service Office",
    bring: ["DD-214 or any discharge papers if you have them", "Photo ID"],
    steps: [
      "In crisis? Call 988 then press 1, or text 838255.",
      "Need housing? Call the Homeless Veterans Hotline at 1-877-424-3838.",
      "Ask the county Veterans Service Officer to help you file for benefits and get your discharge papers.",
      "Ask any VA clinic about health care and mental health help."
    ],
    tips: "Veterans' phone menus are long. Stay on the line and say \"homeless veteran\" to reach a person faster.",
    audited: "2026-10-12",
  },
  {
    id: "reentry", title: "After Prison or a Record", icon: "🔓", area: "fort-wayne",
    intro: "A record does not end your options. Many people get housing, work and a clean record back.",
    where: "Call 211 and ask for reentry help",
    steps: [
      "Ask 211 for local reentry programs. They can help with ID, housing leads, and work.",
      "Look for jobs marked fair-chance in the Jobs tab. Be honest, and say what you've done since.",
      "Ask Indiana Legal Help about expungement. Indiana law lets many people seal an old record after a waiting period.",
      "In the Places tab, use the filters to find shelters and programs that accept people with a record."
    ],
    tips: "Keep copies of every court paper. They are needed for expungement and for some housing applications.",
    audited: "2026-10-12",
  },
  {
    id: "quit-nicotine", title: "Quit Smoking or Vaping (Free)", icon: "🌬\uFE0F", area: "fort-wayne",
    intro: "Free coaching and often free patches or gum.",
    where: "Indiana Quitline: 1-800-QUIT-NOW (1-800-784-8669)",
    steps: [
      "Call 1-800-784-8669. It is free and open every day.",
      "Ask about free nicotine patches or gum. Eligible Hoosiers can often get them by mail.",
      "Tell them if you live in a shelter or have no fixed address."
    ],
    tips: "Cravings are strongest in the first few days. Keep gum or candy in your pocket.",
    audited: "2026-10-12",
  },
  {
    id: "call-script", title: "What to Say When You Call", icon: "☎️", area: "fort-wayne",
    intro: "A short script for calling a shelter, pantry or agency.",
    where: "Any shelter, pantry or agency in the Places tab",
    steps: [
      "Say: \"Hi, my name is ___. I need help with ___ (a bed / food / a bus pass).\"",
      "Ask: \"Do you have room tonight?\" or \"When are you open?\"",
      "Ask: \"What do I need to bring? Do I need an ID?\"",
      "Ask: \"Can I bring my pet, my partner or my kids?\"",
      "Write down the name of who you spoke to and the time."
    ],
    tips: "If you're not sure, say so. Staff hear this every day and want to help.",
    audited: "2026-10-12",
  },
  {
    id: "storms", title: "Tornado, Flood & Power Outage", icon: "🌪\uFE0F", area: "fort-wayne",
    intro: "What to do when severe weather hits and you don't have a home to shelter in.",
    where: "Call 211 to find open emergency shelters",
    steps: [
      "Tornado warning: go inside the nearest sturdy building (library, store, church, shelter) and ask staff to let you in. Go to the lowest floor, in a room without windows.",
      "No building nearby? Get as low as you can, away from trees and cars, and cover your head. Don't shelter under an overpass.",
      "Flooding: move to higher ground. Never walk or drive through floodwater.",
      "Power out: look for charging spots in the Places tab and keep your phone on low-power mode.",
      "Call 211 afterward to find shelter, food and supplies."
    ],
    tips: "Turn on phone alerts for your area. Haven also shows a banner when a warning is active.",
    audited: "2026-10-12",
  },
  {
    id: "heat", title: "Staying Cool in Summer", icon: "🥵", area: "fort-wayne",
    intro: "Heat can be dangerous. Plan your day around shade, water and air conditioning.",
    where: "Libraries, day centers and water spots on the map",
    steps: [
      "Drink water before you feel thirsty. Use the water category on the map to find refill spots.",
      "Rest in air conditioning during the hottest hours (noon to 5 pm): libraries, day centers, stores.",
      "Wear light clothes and a hat. Wet a shirt or towel to cool your neck.",
      "Warning signs: dizziness, confusion, nausea, hot dry skin or no sweating. Move to cool shade and call 911.",
      "Never stay in a parked car. Check on others who look unwell."
    ],
    tips: "Alcohol and some medicines make heat worse. Drink extra water.",
    audited: "2026-10-12",
  },
  {
    id: "scams", title: "Scams to Watch For", icon: "🚨", area: "fort-wayne",
    intro: "People in tough spots are often targeted. These are common signs of a scam.",
    where: "Not sure? Call 211 to check before you pay or share anything",
    steps: [
      "Real benefit offices never ask you to pay to apply for food stamps, housing or Medicaid.",
      "Anyone asking for gift cards, Cash App, Zelle or wire money is a scam.",
      "Never give your Social Security number by text or to an unexpected caller.",
      "Be careful with jobs that charge for training or promise big pay for little work.",
      "Payday and title loans can trap you in debt. Ask a mission about other options first."
    ],
    tips: "If it feels rushed or too good to be true, stop and ask someone you trust.",
    audited: "2026-10-12",
  },
];

/* ===== gguides.js ===== */
/* Haven FW website — Smarter Guide tab (feature #32, ported from the app's gm-guides.js):
   category chips, synonym search, "Suggested for today", live open-now badges,
   distance + View map / Directions / Call buttons per guide, [[place]] rich links,
   and bring/steps checklists that remember progress.
   Uses the same 'hvgp' localStorage store as the old Guide tab, so existing
   check-off progress is kept. English-only per site convention. */
"use strict";
var SG_CH=[["all","✨","All"],["food","🛒","Food"],["health","🩺","Health"],["money","💳","Money & ID"],["home","🏠","Housing & safety"],["move","🚌","Getting around"],["phone","📱","Phone & internet"]];
function sgCatOf(g){var s=String((g.id||"")+" "+(g.title||"")).toLowerCase();
  if(/snap|wic|food|ebt|meal|gift/.test(s))return"food";
  if(/medic|meds|therap|addict|health|dental|glass|walker|mental/.test(s))return"health";
  if(/ssi|legal|voucher|benefit|\bid\b|license|budget|money/.test(s))return"money";
  if(/shelter|safe|winter|heat|hous|storm|lgbt/.test(s))return"home";
  if(/bus|ride|bike|transit/.test(s))return"move";
  if(/phone|data|internet|wifi/.test(s))return"phone";
  return"all";}
var SG_SYN=[["food stamps","snap ebt grocery"],["doctor","medicaid medicare clinic"],["rent","housing shelter"],["cold","winter shelter"],["hot","heat"],["phone","freephone"],["internet","data wifi"],["ride","bus"],["lawyer","legal"],["drugs","addiction recovery"],["mental","therapy"],["hungry","food snap"],["glasses","vision"],["medicine","meds pharmacy"]];
var sgCat="all", sgQ="";
function sgGet(k){try{return JSON.parse(localStorage.getItem(k)||"{}");}catch(e){return{};}}
function sgSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function sgHay(g){return{t:String(g.title||"").toLowerCase(),
  all:[g.title,g.intro,g.where,(g.bring||[]).join(" "),(g.steps||[]).join(" "),g.tips].join(" ").toLowerCase()};}
function sgMatch(g){var h=sgHay(g);
  if(sgCat!=="all"&&sgCatOf(g)!==sgCat)return 0;
  if(!sgQ)return 1;
  var score=0, toks=sgQ.split(/\s+/).filter(Boolean), ti, si, wi, grp, hit;
  for(ti=0;ti<toks.length;ti++){var tk=toks[ti];grp=[tk];
    for(si=0;si<SG_SYN.length;si++){if(SG_SYN[si][0].indexOf(tk)>=0||tk.indexOf(SG_SYN[si][0])>=0){var ws=SG_SYN[si][1].split(" ");for(wi=0;wi<ws.length;wi++)grp.push(ws[wi]);}}
    hit=0;
    for(wi=0;wi<grp.length;wi++){var w=grp[wi];if(h.t.indexOf(w)>=0)hit+=5;else if(h.all.indexOf(w)>=0)hit+=1;}
    if(!hit)return 0;
    score+=hit;}
  return score;}
function sgPlace(g){try{var r=(typeof byId==="function")?byId(g.whereId):null;return (r&&r.id)?r:null;}catch(e){return null;}}
function sgRich(s){var x=(typeof escapeHtml==="function")?escapeHtml(String(s==null?"":s)):String(s==null?"":s);
  return x.replace(/\[\[([a-z0-9-]+)\]\]/g,function(m,id){
    var r=null;try{r=(typeof byId==="function")?byId(id):null;}catch(e){}
    if(r&&r.id){var nm=(typeof escapeHtml==="function")?escapeHtml(r.name):r.name;
      return '<button class="sg-place" data-sgplace="'+id+'">'+nm+'</button>';}
    return m;});}
function sgProg(g){var p=sgGet("hvgp")[g.id]||{},n=((g.bring)||[]).length;
  return{done:(p.b||[]).length,n:n,b:p.b||[],s:p.s||[]};}
function sgOpenBadge(r){var s=null;try{s=(typeof isOpenNow==="function")?isOpenNow(r):null;}catch(e){}
  if(s===true)return '<span class="sg-open">🟢 Open now</span>';
  if(s===false)return '<span class="sg-closed">🔴 Closed now</span>';
  return "";}
function sgDist(r){try{
  if(typeof userLoc!=="undefined"&&userLoc&&r&&r.lat&&typeof distMi==="function"){
    return ' <span class="sg-dist">📍 '+distMi(userLoc.lat,userLoc.lng,r.lat,r.lng).toFixed(1)+' mi</span>';}
  }catch(e){}
  return "";}
function sgTelHref(r){try{
  if(r.phoneHref)return "tel:+"+String(r.phoneHref).replace(/[^0-9+]/g,"");
  if(r.phone){var d=String(r.phone).replace(/\D/g,"");if(d)return "tel:+"+d;}
  }catch(e){}
  return "";}
function sgCard(g){var r=sgPlace(g),p=sgProg(g);
  var open=sgOpenBadge(r),dist=sgDist(r);
  var pill=p.n?'<span class="sg-pill" data-pill="'+g.id+'">'+p.done+'/'+p.n+' ready</span>':"";
  var gid=(typeof escapeAttr==="function")?escapeAttr(g.id):g.id;
  var head='<button class="sg-head"><div class="sg-ic">'+(g.icon||"📖")+'</div>'+
    '<div class="sg-main"><h3>'+sgRich(g.title)+'</h3><p>'+sgRich(g.intro)+'</p>'+
    '<div class="sg-meta">'+open+dist+pill+'</div></div><div class="sg-chev">›</div></button>';
  var where=(g.where?'<div class="sg-where">📍 <b>'+sgRich(g.where)+'</b></div>':"");
  var btns="";
  if(r){btns='<div class="sg-btns">';
    if(r.lat)btns+='<button class="sg-b" data-sgmap="'+gid+'">🗺️ View map</button>';
    if(r.lat)btns+='<a class="sg-b" target="_blank" rel="noopener" href="https://maps.google.com/?q='+r.lat+','+r.lng+'">➤ Directions</a>';
    var tel=sgTelHref(r);if(tel)btns+='<a class="sg-b" href="'+tel+'">📞 Call</a>';
    btns+='</div>';}
  var bring="";
  if(g.bring&&g.bring.length){
    bring='<div class="sg-sec">BRING <small>tap to check off</small></div><ul class="sg-chk">'+
      g.bring.map(function(b,i){var done=p.b.indexOf(i)>=0;
        return '<li data-k="b" data-i="'+i+'" class="'+(done?"done":"")+'"><i></i><span>'+sgRich(b)+'</span></li>';}).join("")+'</ul>';}
  var steps='<div class="sg-sec">STEPS</div>';
  if(g.steps&&g.steps.length){
    steps+='<ol class="sg-steps">'+g.steps.map(function(s,i){var done=p.s.indexOf("s"+i)>=0;
      return '<li data-k="s" data-i="'+i+'" class="'+(done?"done":"")+'"><i>'+(i+1)+'</i><span>'+sgRich(s)+'</span></li>';}).join("")+'</ol>';}
  else steps="";
  var tips=g.tips?'<div class="sg-tip">💡 '+sgRich(g.tips)+'</div>':"";
  return '<div class="sg-card" data-g="'+gid+'" data-cat="'+sgCatOf(g)+'">'+head+
    '<div class="sg-body">'+where+btns+bring+steps+tips+'</div></div>';}
function sgSuggest(list){var m=new Date().getMonth()+1,ids=[];
  var cold=m>=11||m<=3,hot=m>=6&&m<=9;
  if(cold){ids.push("winter","safehaven");}
  if(hot){ids.push("heat");}
  var v=sgGet("hv_gview");
  Object.keys(v).sort(function(a,b){return v[b]-v[a];}).slice(0,2).forEach(function(i){ids.push(i);});
  list.forEach(function(g){var r=sgPlace(g);
    if(r&&ids.length<8){try{if(typeof isOpenNow==="function"&&isOpenNow(r)===true)ids.push(g.id);}catch(e){}}});
  var seen={},out=[];
  ids.forEach(function(i){if(seen[i])return;seen[i]=1;
    var g=null;list.forEach(function(x){if(x.id===i)g=x;});
    if(g)out.push(g);});
  return out.slice(0,4);}
function sgPaint(){var box=document.getElementById("ggCards");if(!box)return;
  var area=null;try{area=(typeof getArea==="function")?getArea():"fort-wayne";}catch(e){area="fort-wayne";}
  var list=(typeof GUIDES!=="undefined"?GUIDES:[]).filter(function(g){return !g.area||g.area===area;});
  var L=list.map(function(g){return{g:g,s:sgMatch(g)};}).filter(function(x){return x.s;});
  if(sgQ)L.sort(function(a,b){return b.s-a.s;});
  var sg=(!sgQ&&sgCat==="all")?sgSuggest(list):[];
  var html="";
  if(sg.length){
    html+='<div class="sg-sug"><div class="sg-sh">⭐ Suggested for today</div><div class="sg-sr">'+
      sg.map(function(g){var ic=g.icon||"📖";
        return '<button data-go="'+((typeof escapeAttr==="function")?escapeAttr(g.id):g.id)+'"><span>'+ic+'</span>'+sgRich(g.title)+'</button>';}).join("")+'</div></div>';}
  if(L.length)html+='<div class="sg-grid">'+L.map(function(x){return sgCard(x.g);}).join("")+'</div>';
  else html+='<div class="sg-empty">😕 No guide found for &ldquo;'+sgRich(sgQ)+'&rdquo;.<br>Try &ldquo;food&rdquo;, &ldquo;rent&rdquo;, &ldquo;doctor&rdquo; or &ldquo;phone&rdquo;.</div>';
  box.innerHTML=html;
  sgBind(box);}
function sgToggle(box,gid,k,i){var P=sgGet("hvgp"),o=P[gid]=P[gid]||{b:[],s:[]};
  var arr=(k==="s")?o.s:o.b,key=(k==="s")?"s"+i:i,at=arr.indexOf(key);
  if(at>=0)arr.splice(at,1);else arr.push(key);
  sgSet("hvgp",P);
  var card=box.querySelector('.sg-card[data-g="'+gid+'"]');
  if(card){var pill=card.querySelector("[data-pill]");
    if(pill&&k==="b"){var n=card.querySelectorAll(".sg-chk li").length;
      pill.textContent=o.b.length+"/"+n+" ready";
      pill.classList.toggle("all",o.b.length===n&&n>0);}}}
function sgBind(box){
  box.querySelectorAll(".sg-card").forEach(function(c){
    var head=c.querySelector(".sg-head");
    if(head)head.onclick=function(){var o=c.classList.toggle("open");
      if(o){var v=sgGet("hv_gview"),id=c.getAttribute("data-g");v[id]=(v[id]||0)+1;sgSet("hv_gview",v);}};});
  box.querySelectorAll("[data-sgplace]").forEach(function(b){
    b.onclick=function(e){e.stopPropagation();
      var r=null;try{r=(typeof byId==="function")?byId(b.getAttribute("data-sgplace")):null;}catch(x){}
      if(r&&r.id&&typeof showSheet==="function"){try{showSheet(r);}catch(x){}}};});
  box.querySelectorAll("[data-sgmap]").forEach(function(b){
    b.onclick=function(e){e.stopPropagation();
      var r=null;try{r=(typeof byId==="function")?byId(b.getAttribute("data-sgmap")):null;}catch(x){}
      if(!(r&&r.id&&r.lat))return;
      try{if(typeof goTab==="function")goTab("map");}catch(x){}
      setTimeout(function(){try{
        if(typeof map!=="undefined"&&map&&typeof map.setView==="function")map.setView([r.lat,r.lng],16);
      }catch(x){}},150);};});
  box.querySelectorAll(".sg-chk li,.sg-steps li").forEach(function(li){
    li.onclick=function(){var c=li;while(c&&!c.classList.contains("sg-card"))c=c.parentNode;
      if(!c)return;
      sgToggle(box,c.getAttribute("data-g"),li.getAttribute("data-k"),parseInt(li.getAttribute("data-i"),10));
      li.classList.toggle("done");};});
  box.querySelectorAll("[data-go]").forEach(function(b){
    b.onclick=function(){var t=box.querySelector('.sg-card[data-g="'+b.getAttribute("data-go")+'"]');
      if(t){t.classList.add("open");
        var v=sgGet("hv_gview"),id=t.getAttribute("data-g");v[id]=(v[id]||0)+1;sgSet("hv_gview",v);
        try{t.scrollIntoView({behavior:"smooth",block:"start"});}catch(e){}}};});}
function renderGuidesSmart(){var box=document.getElementById("ggCards");
  if(!box||typeof GUIDES==="undefined")return;
  if(!document.getElementById("sgTop")){
    var top=document.createElement("div");top.id="sgTop";top.className="sg-top";
    top.innerHTML='<input id="sgQ" class="sg-q" type="search" placeholder="What do you need? (food, rent, doctor, phone…)" autocomplete="off">'+
      '<div class="sg-chips">'+SG_CH.map(function(c){
        return '<button data-c="'+c[0]+'" class="'+(c[0]===sgCat?"on":"")+'"><span>'+c[1]+'</span> '+c[2]+'</button>';}).join("")+'</div>';
    box.parentNode.insertBefore(top,box);
    var q=top.querySelector("#sgQ");
    q.oninput=function(e){sgQ=e.target.value.trim().toLowerCase();sgPaint();};
    top.querySelectorAll(".sg-chips button").forEach(function(b){
      b.onclick=function(){sgCat=b.getAttribute("data-c");
        top.querySelectorAll(".sg-chips button").forEach(function(x){x.classList.toggle("on",x===b);});
        sgPaint();};});}
  else{var qq=document.getElementById("sgQ");if(qq&&document.activeElement!==qq)qq.value=sgQ;}
  sgPaint();}
if(typeof window!=="undefined"){window.renderGuides=renderGuidesSmart;}

/* ===== jobs.js ===== */
/* Haven FW website — Real Jobs tab (feature #29).
 * Ported from the app's JOBS database (tab-data.js). Type chips + search +
 * area filtering + open-now-first sort + Call/Apply/Directions/Map buttons.
 * Loaded after app.js; renderJobs() in app.js delegates to renderJobsReal().
 * Uses app.js globals: getArea, isOpenNow, escapeHtml, escapeAttr, miniToast, goTab. */
var jobTypeFilter = 'all', jobQuery = '';
function jobsInArea() {
  var all = (typeof JOBS !== 'undefined' ? JOBS : []);
  var a = (typeof getArea === 'function' ? getArea() : 'fort-wayne');
  return all.filter(function (j) { return (j.area || 'fort-wayne') === a; });
}
function jobOpenBadge(j) {
  if (typeof isOpenNow !== 'function') return '';
  var st = null;
  try { st = isOpenNow(j); } catch (e) { return ''; }
  if (st === true) return ' <span style="background:#14532d;color:#4ade80;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700;">🟢 Open now</span>';
  if (st === false) return ' <span style="background:#3f1d1d;color:#f87171;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700;">🔴 Closed</span>';
  return '';
}
function jobCardHtml(j) {
  var ty = (typeof JOB_TYPES !== 'undefined' && JOB_TYPES[j.type]) || { label: j.type || 'Job', icon: '💼', color: '#5cc8ff' };
  var E = (typeof escapeHtml === 'function') ? escapeHtml : function (s) { return String(s); };
  var EA = (typeof escapeAttr === 'function') ? escapeAttr : function (s) { return String(s); };
  var color = EA(ty.color || '#5cc8ff');
  var h = '<div style="background:#1a1f2e;border:1px solid #2a2f3e;border-radius:12px;padding:12px;margin-bottom:8px;border-left:4px solid ' + color + ';">';
  h += '<div style="display:flex;gap:10px;align-items:flex-start;"><div style="font-size:24px;flex:none;">' + E(ty.icon || '💼') + '</div><div style="flex:1;min-width:0;">';
  h += '<div style="font-weight:700;color:#fff;font-size:15px;">' + E(j.name || 'Job') + '</div>';
  h += '<div style="margin:4px 0;display:flex;gap:6px;flex-wrap:wrap;align-items:center;">';
  h += '<span style="background:' + color + '22;color:' + color + ';padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700;">' + E(ty.icon || '') + ' ' + E(ty.label || '') + '</span>' + jobOpenBadge(j) + '</div>';
  if (j.addr) h += '<div style="font-size:13px;color:#888;">📌 ' + E(j.addr) + '</div>';
  if (j.phone) h += '<div style="font-size:13px;color:#888;">📞 ' + E(j.phone) + '</div>';
  if (j.hoursText) h += '<div style="font-size:12px;color:#888;margin-top:2px;">🕐 ' + E(j.hoursText) + '</div>';
  if (j.desc) h += '<div style="font-size:13px;color:#ccc;margin-top:6px;">' + E(j.desc) + '</div>';
  if (j.tags && j.tags.length) h += '<div style="margin-top:6px;">' + j.tags.map(function (t) { return '<span style="background:#2a2f3e;padding:2px 8px;border-radius:10px;font-size:11px;color:#aaa;margin:2px;display:inline-block;">✓ ' + E(t) + '</span>'; }).join('') + '</div>';
  h += '<div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;">';
  if (j.phoneHref || j.phone) h += '<a class="sheet-btn" href="tel:' + EA(j.phoneHref || j.phone) + '">📞 Call</a>';
  if (j.web) h += '<a class="sheet-btn" href="' + EA(j.web) + '" target="_blank" rel="noopener">🌐 Apply</a>';
  if (j.lat && j.lng) {
    h += '<a class="sheet-btn" href="https://www.google.com/maps/dir/?api=1&destination=' + j.lat + ',' + j.lng + '" target="_blank" rel="noopener">🗺️ Directions</a>';
    h += '<button class="sheet-btn" onclick="jobShowOnMap(\'' + EA(j.id || '') + '\')">📍 Map</button>';
  }
  h += '</div></div></div></div>';
  return h;
}
function renderJobsReal() {
  var listEl = document.getElementById('jobs-list');
  if (!listEl) return;
  var chipsEl = document.getElementById('job-chips');
  var jobs = jobsInArea();
  var types = [];
  jobs.forEach(function (j) { if (j.type && types.indexOf(j.type) < 0) types.push(j.type); });
  if (chipsEl) {
    var ch = '<button class="filter-btn' + (jobTypeFilter === 'all' ? ' active' : '') + '" data-jt="all">All</button>';
    types.forEach(function (t) {
      var ty = (typeof JOB_TYPES !== 'undefined' && JOB_TYPES[t]) || { label: t, icon: '💼' };
      ch += '<button class="filter-btn' + (jobTypeFilter === t ? ' active' : '') + '" data-jt="' + t + '">' + ty.icon + ' ' + ty.label + '</button>';
    });
    chipsEl.innerHTML = ch;
  }
  var q = (jobQuery || '').toLowerCase();
  var list = jobs.filter(function (j) {
    if (jobTypeFilter !== 'all' && j.type !== jobTypeFilter) return false;
    if (q) {
      var hay = ((j.name || '') + ' ' + (j.addr || '') + ' ' + (j.desc || '') + ' ' + ((j.tags || []).join(' '))).toLowerCase();
      if (hay.indexOf(q) < 0) return false;
    }
    return true;
  });
  if (typeof isOpenNow === 'function') {
    list = list.slice().sort(function (a, b) {
      var oa = false, ob = false;
      try { oa = isOpenNow(a) === true; } catch (e) {}
      try { ob = isOpenNow(b) === true; } catch (e) {}
      return (oa ? 0 : 1) - (ob ? 0 : 1);
    });
  }
  if (!list.length) {
    listEl.innerHTML = '<div style="text-align:center;color:#888;padding:20px;">' + (jobs.length ? 'No jobs match your search.' : 'No job listings in this area yet.') + '</div>';
    return;
  }
  listEl.innerHTML = list.map(jobCardHtml).join('');
}
function jobShowOnMap(id) {
  var jobs = (typeof JOBS !== 'undefined' ? JOBS : []);
  var j = null;
  for (var i = 0; i < jobs.length; i++) if (jobs[i].id === id) { j = jobs[i]; break; }
  if (!j || !j.lat || !j.lng) { if (typeof miniToast === 'function') miniToast("That job isn't on the map."); return; }
  try { if (typeof goTab === 'function') goTab('map'); } catch (e) {}
  setTimeout(function () {
    try {
      if (typeof map !== 'undefined' && map && typeof map.setView === 'function') map.setView([j.lat, j.lng], 16);
      if (typeof L !== 'undefined') {
        var E = (typeof escapeHtml === 'function') ? escapeHtml : function (s) { return String(s); };
        var m = L.marker([j.lat, j.lng]).addTo(map);
        m.bindPopup('<b>' + E(j.name || 'Job') + '</b><br>' + E(j.addr || '')).openPopup();
        setTimeout(function () { try { map.removeLayer(m); } catch (e) {} }, 30000);
      }
    } catch (e) {}
  }, 250);
}
(function bindJobsUi() {
  function bind() {
    var jc = document.getElementById('job-chips');
    if (jc) jc.addEventListener('click', function (e) {
      var c = e.target.closest ? e.target.closest('[data-jt]') : null;
      if (c) { jobTypeFilter = c.getAttribute('data-jt'); renderJobs(); }
    });
    var js = document.getElementById('jobs-search');
    if (js) js.addEventListener('input', function (e) { jobQuery = e.target.value; renderJobs(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();

/* ===== wiki.js ===== */
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
