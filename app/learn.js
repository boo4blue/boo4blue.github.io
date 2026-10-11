/* Haven FW learn: 🎓 Learn tab — GED / diploma, free courses & apps, college & aid, trades,
   English & citizenship, basic skills, test prep, kids. Links go to the official sites.
   Programs, fees and deadlines change: always confirm on the site or by phone. */
"use strict";
(function () {
  if (typeof TABS === "undefined" || typeof goTab !== "function") return;
  const es = () => settings && settings.lang === "es";
  const L = (en, s) => (es() ? s : en);
  const E = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const CATS_L = [
    ["ged",     "📝", "GED & Diploma",        "GED y diploma"],
    ["courses", "💻", "Free courses & apps",  "Cursos y apps gratis"],
    ["college", "🏫", "College & aid",        "Universidad y ayuda"],
    ["trades",  "🔧", "Trades & careers",     "Oficios y carreras"],
    ["english", "🗣️", "English & citizenship", "Inglés y ciudadanía"],
    ["skills",  "🧰", "Basic & digital skills", "Habilidades básicas"],
    ["test",    "✏️", "Test prep",            "Preparación de exámenes"],
    ["kids",    "🧒", "Kids & family",        "Niños y familia"],
  ];
  const FREE = ["Free", "Gratis"], MOST = ["Free to learn · certificate costs", "Gratis · el certificado cuesta"],
        LOW = ["Free or low cost", "Gratis o bajo costo"], AID = ["Aid available", "Hay ayuda económica"];
  const SEARCH = q => "https://duckduckgo.com/?q=" + encodeURIComponent(q);

  // [id, cat, icon, name, desc, url, cost, app?, extra tags]
  const ITEMS = [
    ["ged-com", "ged", "🎓", "GED.com (official)", "The official GED site. Make a free account, see what the 4 tests cover, take the practice test to check if you're ready, then schedule your test. Test fees vary by state — ask your adult-ed program or WorkOne about help paying.", "https://ged.com", LOW, false, ["GED", "High school equivalency", "Practice test"]],
    ["hiset", "ged", "📘", "HiSET (other equivalency test)", "A second high school equivalency test used in many states. Local adult-education programs can tell you which test(s) they prepare you for in Indiana, so ask before you pay for anything.", "https://hiset.org", LOW, false, ["HiSET", "High school equivalency"]],
    ["in-adulted", "ged", "🏛️", "Indiana adult education (state)", "Indiana's Dept. of Workforce Development lists free adult-education classes — GED/HiSET prep, reading, math and English. Search the site for “adult education” to find classes near Fort Wayne.", "https://www.in.gov/dwd/", FREE, false, ["Free classes", "Adult education", "GED prep"]],
    ["excel-center", "ged", "🏫", "The Excel Center (adult diploma)", "Free public high school for adults in Indiana — earn a real high school diploma, not just an equivalency. Check the site for the Fort Wayne location, ages and what support they offer.", "https://excelcenter.org", FREE, false, ["Adult diploma", "Free tuition"]],
    ["khan-ged", "ged", "📐", "Khan Academy — math, reading, science", "Free lessons and practice from basic math up through algebra, reading and writing, science and social studies. A great free study partner while you prepare for the GED or HiSET.", "https://www.khanacademy.org", FREE, true, ["Free", "Math", "Reading", "Science", "Self-paced"]],
    ["library-ged", "ged", "📚", "Ask the library for study help", "Libraries have free study books, computers, quiet space and often tutors or classes for adult learners. Tap to see library locations on the map.", "", FREE, false, ["Free", "Study space", "Computers"], { cat: "library" }],

    ["alison", "courses", "🧠", "Alison", "Hundreds of free online courses in business, IT, health, language, personal development and more. Learning is free; a certificate or diploma costs extra. Has Android and iPhone apps.", "https://alison.com", MOST, true, ["Free courses", "Certificates", "App"]],
    ["coursera", "courses", "🌐", "Coursera", "University and company courses. Many can be audited free; paid certificates are optional, and financial aid is available if you apply.", "https://www.coursera.org", AID, true, ["Free to audit", "Certificates", "Financial aid"]],
    ["edx", "courses", "🎒", "edX", "College-level courses from universities. Auditing is usually free; verified certificates cost money.", "https://www.edx.org", MOST, true, ["Free to audit", "College courses"]],
    ["ocw", "courses", "🏛️", "MIT OpenCourseWare", "Free lecture notes, videos and problem sets from real MIT classes. No sign-up or certificate — just learning.", "https://ocw.mit.edu", FREE, false, ["Free", "College level", "No sign-up"]],
    ["fcc", "courses", "👨‍💻", "freeCodeCamp", "Free coding lessons and projects for web development, data and more — a path toward tech jobs.", "https://www.freecodecamp.org", FREE, false, ["Free", "Coding", "Tech jobs"]],
    ["grow-google", "courses", "📈", "Grow with Google", "Free beginner training on digital skills, using computers at work, and starting a business.", "https://grow.google", FREE, false, ["Free", "Digital skills", "Career"]],
    ["libby", "courses", "🎧", "Libby (library ebooks & audiobooks)", "With a free library card you can borrow ebooks and audiobooks on your phone. Ask the Allen County Public Library which apps they support.", "https://libbyapp.com", FREE, true, ["Free", "Audiobooks", "Ebooks", "Library card"]],
    ["crashcourse", "courses", "▶️", "Crash Course (YouTube)", "Quick, fun video lessons on history, science, literature, economics and more.", "https://www.youtube.com/@crashcourse", FREE, false, ["Free", "Videos"]],
    ["duolingo", "courses", "🦉", "Duolingo", "Free bite-size language lessons, including Spanish and English.", "https://www.duolingo.com", FREE, true, ["Free", "Languages", "App"]],

    ["fafsa", "college", "💵", "FAFSA (free money for school)", "The free federal form for grants (like Pell), work-study and loans. Never pay anyone to file it — it's always free at studentaid.gov. Many Indiana state aid programs use it too.", "https://studentaid.gov", FREE, false, ["FAFSA", "Grants", "Financial aid"]],
    ["learn-more-in", "college", "🧭", "Learn More Indiana", "Indiana's college-planning hub: find schools, apply for state aid and learn about grants for short career programs (like the Workforce Ready Grant). Check eligibility.", "https://learnmoreindiana.org", FREE, false, ["Indiana", "State aid", "Planning"]],
    ["ivytech", "college", "🏫", "Ivy Tech Community College", "Indiana's community college, with a Fort Wayne campus. Certificates and 2-year degrees, lower tuition, and classes you can transfer to a 4-year school.", "https://www.ivytech.edu", AID, false, ["Community college", "Certificates", "Transfer"]],
    ["pfw", "college", "🎓", "Purdue Fort Wayne", "4-year public university in Fort Wayne. Ask the admissions and financial-aid offices about aid and adult-student options.", "https://www.pfw.edu", AID, false, ["University", "Fort Wayne"]],
    ["iufw", "college", "🎓", "IU Fort Wayne", "The Indiana University side of the Fort Wayne campus. Search the name for programs, admissions and aid.", SEARCH("IU Fort Wayne admissions"), AID, false, ["University", "Fort Wayne"]],
    ["usf", "college", "🎓", "University of Saint Francis", "Private university in Fort Wayne with many health and education programs. Ask about scholarships.", "https://www.sf.edu", AID, false, ["University", "Fort Wayne", "Scholarships"]],
    ["21cs", "college", "⭐", "21st Century Scholars (Indiana)", "Indiana scholarship for income-eligible students — students usually must sign up in 7th or 8th grade, so tell any young person you know about it.", "https://scholars.in.gov", FREE, false, ["Scholarship", "Indiana", "Middle school"]],
    ["bigfuture", "college", "🔎", "BigFuture (College Board)", "Free tools to search colleges, plan costs and find scholarships.", "https://bigfuture.collegeboard.org", FREE, false, ["Free", "Scholarship search", "College search"]],
    ["commonapp", "college", "📨", "Common App", "Apply to many colleges with one application. Fee waivers are available if cost is a barrier.", "https://www.commonapp.org", AID, false, ["Applications", "Fee waivers"]],
    ["fastweb", "college", "💰", "Fastweb scholarship search", "Free scholarship matching. Never pay a fee to “find” scholarships.", "https://www.fastweb.com", FREE, false, ["Free", "Scholarships"]],
    ["clep", "college", "⏱️", "CLEP (college credit by exam)", "Pass an exam, earn college credit, and save time and tuition. Check that your school accepts it.", "https://clep.collegeboard.org", LOW, false, ["College credit", "Exams"]],
    ["gibill", "college", "🎖️", "GI Bill (veterans)", "Veterans and family members can use education benefits for college, trades and training. Ask the Allen County Veterans Service Office to help you apply.", "https://www.va.gov/education/", FREE, false, ["Veterans", "Benefits"], { cat: "veterans", label: ["Veterans places", "Lugares para veteranos"] }],

    ["apprentice", "trades", "🛠️", "Apprenticeship.gov", "Earn while you learn: paid on-the-job training in the trades and other careers. Search by job and state.", "https://www.apprenticeship.gov", FREE, false, ["Paid training", "Trades", "Earn & learn"]],
    ["careeronestop", "trades", "🧭", "CareerOneStop (U.S. Dept. of Labor)", "Explore careers, find training and certifications, and search jobs, with free tools like a skills matcher.", "https://www.careeronestop.org", FREE, false, ["Career", "Training finder"]],
    ["onet", "trades", "🔬", "O*NET OnLine", "See what any job involves, what it pays and what skills it needs.", "https://www.onetonline.org", FREE, false, ["Career explorer", "Pay"]],
    ["jobcorps-l", "trades", "🏕️", "Job Corps & residential programs", "Live on-site while you learn a trade, with housing and meals. See the Programs tab.", "", FREE, false, ["Free", "Housing", "Trades"], { tab: "programs", label: ["Open Programs tab", "Abrir Programas"] }],
    ["workone-l", "trades", "💼", "Job help in Fort Wayne", "WorkOne and other local career centers offer resume help, training and job leads. Tap to see them on the Places list.", "", FREE, false, ["Free", "Resume", "Job training"], { cat: "jobsedu" }],
    ["gg-certs", "trades", "🎫", "Google Career Certificates", "Job-ready training for jobs like IT support and data analysis. Not free, but financial aid and scholarships exist — apply for aid first.", "https://grow.google/certificates/", AID, false, ["Certificates", "IT", "Aid available"]],

    ["usalearns", "english", "🇺🇸", "USA Learns", "Free online English lessons plus citizenship and reading help, made for adults.", "https://www.usalearns.org", FREE, false, ["Free", "ESL", "Citizenship"]],
    ["voa", "english", "🎙️", "VOA Learning English", "Free news stories, lessons and videos written for English learners.", "https://learningenglish.voanews.com", FREE, false, ["Free", "ESL", "Listening"]],
    ["uscis", "english", "🗽", "USCIS citizenship study tools", "Free official civics and English test study materials — flashcards, practice and an app.", "https://www.uscis.gov/citizenship", FREE, true, ["Free", "Citizenship", "Civics test"]],
    ["newcomers-l", "english", "🌍", "Local help for new arrivals", "Local groups that help immigrants and refugees with English, paperwork and jobs. Tap to see them.", "", FREE, false, ["Free", "ESL", "Immigrants"], { cat: "newcomers" }],

    ["gcf", "skills", "🖱️", "GCFGlobal (GCFLearnFree)", "Free, simple tutorials on computers, email, the internet, Word, Excel, resumes, job skills and money.", "https://edu.gcfglobal.org", FREE, false, ["Free", "Computers", "Resume", "Beginner"]],
    ["typing", "skills", "⌨️", "Typing.com", "Free typing lessons — a fast way to look more job-ready.", "https://www.typing.com", FREE, false, ["Free", "Typing"]],
    ["proliteracy", "skills", "📖", "ProLiteracy — adult reading help", "Find adult literacy programs and tutors if you want to read or write better. Libraries often connect adults with tutors too.", "https://www.proliteracy.org", FREE, false, ["Reading", "Literacy"]],
    ["khan-math", "skills", "➗", "Khan Academy — start from the basics", "Starts at basic arithmetic and lets you go at your own speed. Free, and nobody sees your score but you.", "https://www.khanacademy.org/math", FREE, true, ["Free", "Math", "Beginner"]],

    ["sat-khan", "test", "✏️", "Official SAT practice (Khan Academy)", "Free, official SAT practice with personalized study plans.", "https://www.khanacademy.org/test-prep/sat", FREE, true, ["Free", "SAT"]],
    ["asvab", "test", "🪖", "ASVAB (military entrance test)", "Info and practice for the test used to enlist. Ask a recruiter or your school about free versions.", "https://www.officialasvab.com", FREE, false, ["Military", "Practice test"]],
    ["ged-test-l", "test", "📝", "GED practice", "The official GED site has practice tests that show whether you're ready. See the GED & Diploma section.", "", LOW, false, ["GED", "Practice test"], { filt: "ged", label: ["Go to GED section", "Ir a GED"] }],

    ["khan-kids", "kids", "🧸", "Khan Academy Kids", "Free learning app for ages 2–8: reading, math and stories. No ads.", "https://learn.khanacademy.org/khan-academy-kids/", FREE, true, ["Free", "Ages 2–8", "App"]],
    ["pbskids", "kids", "📺", "PBS Kids", "Free games and videos that teach reading, math and science.", "https://pbskids.org", FREE, true, ["Free", "Games", "Videos"]],
    ["scratch", "kids", "🐱", "Scratch (kids coding)", "Free, fun block-based coding for kids to make games and stories.", "https://scratch.mit.edu", FREE, false, ["Free", "Coding", "Kids"]],
    ["headstart", "kids", "🏠", "Head Start (free preschool)", "Free early learning for young children in low-income families, plus family support. Use the site to find a program in Allen County.", "https://eclkc.ohs.acf.hhs.gov", FREE, false, ["Free", "Preschool", "Families"]],
    ["library-kids", "kids", "📚", "Library story times & homework help", "Libraries have free story times, homework help and summer reading programs. Tap to see library locations.", "", FREE, false, ["Free", "Story time", "Homework help"], { cat: "library" }],
  ];

  const STEPS = [
    ["🪪", "Gather your papers", "Reúne tus documentos", "Programs usually ask for a photo ID and proof you live in the area. Requirements vary — ask first."],
    ["🏫", "Find free classes", "Busca clases gratis", "Call or visit adult education, WorkOne or the library. Classes and tutoring are usually free."],
    ["🧪", "Take a practice test", "Haz un examen de práctica", "See where you stand before you study, so you spend time where it helps."],
    ["📚", "Study a little every day", "Estudia un poco cada día", "15–30 minutes a day beats one long night. Khan Academy is free for math, reading and science."],
    ["📅", "Register and test", "Inscríbete y presenta", "Sign up at GED.com (or for HiSET), schedule it, and bring your ID. Ask about help with test fees."],
    ["🚀", "Plan your next step", "Planea tu siguiente paso", "Use your GED or diploma for college, a trade program or a better job. Check the other sections here."],
  ];

  const st = { cat: "all", q: "", free: false, steps: false };
  const costOf = i => (es() ? i[6][1] : i[6][0]);

  function card(i) {
    const ex = i[9] || {};
    const free = i[6] === FREE;
    const btns = [];
    if (i[5]) btns.push(`<a class="qbtn primary" href="${E(i[5])}" target="_blank" onclick="event.stopPropagation()">${L("Open", "Abrir")} ↗</a>`);
    if (ex.cat) btns.push(`<button class="qbtn${i[5] ? "" : " primary"}" data-lcat="${ex.cat}">${E(ex.label ? (es() ? ex.label[1] : ex.label[0]) : L("See places", "Ver lugares"))}</button>`);
    if (ex.tab) btns.push(`<button class="qbtn primary" data-ltab="${ex.tab}">${E(es() ? ex.label[1] : ex.label[0])}</button>`);
    if (ex.filt) btns.push(`<button class="qbtn primary" data-lfilt="${ex.filt}">${E(es() ? ex.label[1] : ex.label[0])}</button>`);
    const cl = CATS_L.find(c => c[0] === i[1]);
    return `<div class="card learncard">
      <div class="lhead"><div class="lic">${i[2]}</div><div style="flex:1;min-width:0"><h3>${E(i[3])}</h3>
        <div class="meta"><span class="badge ${free ? "open" : "unknown"}">${E(costOf(i))}</span>${i[7] ? `<span class="catpill">📱 ${L("App", "App")}</span>` : ""}<span class="catpill">${cl[1]} ${E(es() ? cl[3] : cl[2])}</span></div></div></div>
      <p class="desc" style="margin-top:6px">${E(i[4])}</p>
      ${i[8] && i[8].length ? `<div class="tagrow">${i[8].map(t => `<span class="tag">✓ ${E(t)}</span>`).join("")}</div>` : ""}
      <div class="quick">${btns.join("")}</div></div>`;
  }

  function render() {
    const el = document.getElementById("learnBody"); if (!el) return;
    const chips = `<button class="chip${st.cat === "all" ? " on" : ""}" data-c="all">${L("All", "Todo")}</button>` +
      CATS_L.map(c => `<button class="chip${st.cat === c[0] ? " on" : ""}" data-c="${c[0]}">${c[1]} ${E(es() ? c[3] : c[2])}</button>`).join("");
    document.getElementById("learnChips").innerHTML = chips;
    const tf = document.getElementById("learnFree"); tf.classList.toggle("on", st.free);
    const q = st.q.trim().toLowerCase();
    const list = ITEMS.filter(i => {
      if (st.cat !== "all" && i[1] !== st.cat) return false;
      if (st.free && i[6] !== FREE) return false;
      if (q && !(i[3] + " " + i[4] + " " + (i[8] || []).join(" ") + " " + i[6][0]).toLowerCase().includes(q)) return false;
      return true;
    });
    const showSteps = (st.cat === "all" || st.cat === "ged") && !q;
    let h = "";
    if (showSteps) {
      h += `<div class="card learnsteps${st.steps ? " open" : ""}" id="learnSteps"><button class="lsHead" id="lsToggle"><span class="lic">🗺️</span><span style="flex:1;text-align:left"><b>${L("How to get your GED — step by step", "Cómo obtener tu GED — paso a paso")}</b><small>${L("6 steps · tap to open", "6 pasos · toca para abrir")}</small></span><span class="gchev">›</span></button>
        <ol class="lsBody">${STEPS.map(s => `<li><span class="n">${s[0]}</span><div><b>${E(es() ? s[2] : s[1])}</b><p>${E(s[3])}</p></div></li>`).join("")}</ol></div>`;
    }
    h += list.length ? list.map(card).join("") : `<div class="empty"><div class="big">🔍</div><h3>${L("Nothing found", "No se encontró nada")}</h3><p>${L("Try a different word or category.", "Prueba otra palabra o categoría.")}</p></div>`;
    h += `<p class="learnnote">${L("Programs, fees and deadlines change — check the website or call to confirm. Links need internet.", "Los programas, costos y fechas cambian — confirma en el sitio o por teléfono. Los enlaces necesitan internet.")}</p>`;
    el.innerHTML = h;
    el.querySelectorAll("[data-lcat]").forEach(b => b.addEventListener("click", () => { state.cats = [b.dataset.lcat]; if (typeof renderChips === "function") renderChips(); goTab("list"); }));
    el.querySelectorAll("[data-ltab]").forEach(b => b.addEventListener("click", () => goTab(b.dataset.ltab)));
    el.querySelectorAll("[data-lfilt]").forEach(b => b.addEventListener("click", () => { st.cat = b.dataset.lfilt; render(); document.getElementById("tab-learn").scrollTop = 0; el.scrollTop = 0; }));
    const ls = el.querySelector("#lsToggle");
    if (ls) ls.addEventListener("click", () => { st.steps = !st.steps; el.querySelector("#learnSteps").classList.toggle("open", st.steps); });
    document.querySelectorAll("#learnChips [data-c]").forEach(b => b.addEventListener("click", () => { st.cat = b.dataset.c; render(); }));
  }

  /* ---- DOM: section, nav button, drawer entry ---- */
  const main = document.querySelector("main");
  if (main && !document.getElementById("tab-learn")) {
    const sec = document.createElement("section"); sec.className = "tab"; sec.id = "tab-learn";
    sec.innerHTML = `<div class="secHead"><h2 id="learnTitle"></h2><p id="learnSub"></p></div>
      <div class="searchbar" style="margin:0 16px 10px"><span class="mag">🔍</span><input id="learnQ" type="search" autocomplete="off"><button class="iconbtn" id="learnClear" aria-label="Clear">✕</button></div>
      <div class="chips listchips" id="learnChips"></div>
      <div class="listopts" style="padding:0 16px 8px"><div class="toggle" id="learnFree"><span id="learnFreeL"></span><span class="sw"></span></div></div>
      <div class="scroll" id="learnBody" style="padding-top:2px"></div>`;
    main.appendChild(sec);
    const txt = () => {
      document.getElementById("learnTitle").textContent = "🎓 " + L("Learn", "Aprender");
      document.getElementById("learnSub").textContent = L("GED, free courses & apps, college, trades — everything to help you learn", "GED, cursos y apps gratis, universidad, oficios — todo para aprender");
      document.getElementById("learnQ").placeholder = L("Search GED, Alison, FAFSA, English…", "Buscar GED, Alison, FAFSA, inglés…");
      document.getElementById("learnFreeL").textContent = L("Free only", "Solo gratis");
    };
    txt();
    document.getElementById("learnQ").addEventListener("input", e => { st.q = e.target.value; render(); });
    document.getElementById("learnClear").addEventListener("click", () => { st.q = ""; document.getElementById("learnQ").value = ""; render(); });
    document.getElementById("learnFree").addEventListener("click", () => { st.free = !st.free; render(); });
    window.__learnTxt = txt;
  }
  const nav = document.querySelector("nav");
  if (nav && !nav.querySelector('[data-tab="learn"]')) {
    const b = document.createElement("button"); b.dataset.tab = "learn";
    b.innerHTML = `<span class="ni">🎓</span><span data-i18n="nav_learn">Learn</span>`;
    b.addEventListener("click", () => goTab("learn"));
    const ref = nav.querySelector('[data-tab="jobs"]'); nav.insertBefore(b, ref ? ref.nextSibling : null);
  }
  if (!TABS.some(x => x[0] === "learn")) {
    const i = TABS.findIndex(x => x[0] === "programs"); TABS.splice(i < 0 ? TABS.length - 3 : i + 1, 0, ["learn", "📚", "nav_learn"]);
  }
  if (typeof STRINGS !== "undefined") { STRINGS.en.nav_learn = "Learn"; STRINGS.es.nav_learn = "Aprender"; if (STRINGS.my) STRINGS.my.nav_learn = "လေ့လာရန်"; }
  if (typeof renderDrawer === "function") renderDrawer();
  if (typeof applyI18n === "function") applyI18n();

  const baseGo = goTab;
  goTab = function (tb) { baseGo(tb); if (tb === "learn") { if (window.__learnTxt) window.__learnTxt(); render(); } };
  window.goLearn = () => goTab("learn");
})();
