/* Haven FW website — Budget Studio (#26).
 * Ported from the app's budget.js (Plan-tab Budget Studio): income/expense
 * builder, needs-vs-wants donut, upcoming bills with reminders, 5
 * plain-language budgeting lessons, savings goals, savings challenges,
 * debt-snowball tracker, and a daily check-in streak. All data stays on this
 * device (localStorage, same keys as the app). Loaded after app.js; uses its
 * globals: escapeHtml, escapeAttr, miniToast, requestNotifPerm, goTab. */

var bgt_store = {
  get: function (k, fb) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; } },
  set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
function bgt_uid() { return "b" + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36); }
function bgt_money(n) {
  n = Number(n) || 0;
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: n % 1 ? 2 : 0 });
}
function bgtE(s) { return (typeof escapeHtml === "function" ? escapeHtml : String)(s == null ? "" : s); }
function bgtEA(s) { return (typeof escapeAttr === "function" ? escapeAttr : String)(s == null ? "" : s); }

var bgt_budget = bgt_store.get("haven_budget_v1", { income: [], expenses: [] });
if (!bgt_budget || !Array.isArray(bgt_budget.income)) bgt_budget = { income: [], expenses: [] };
if (!Array.isArray(bgt_budget.expenses)) bgt_budget.expenses = [];
var bgt_goals = bgt_store.get("haven_bgoals_v1", []); if (!Array.isArray(bgt_goals)) bgt_goals = [];
var bgt_lessons = bgt_store.get("haven_blessons_v1", []); if (!Array.isArray(bgt_lessons)) bgt_lessons = [];
var bgt_debts = bgt_store.get("haven_debts_v1", []); if (!Array.isArray(bgt_debts)) bgt_debts = [];
var bgt_challenges = bgt_store.get("haven_challenges_v1", []); if (!Array.isArray(bgt_challenges)) bgt_challenges = [];
var bgt_checkin = bgt_store.get("haven_checkin_v1", { last: "", streak: 0 });
var bgt_tab = "budget";
var bgt_expKind = "need";

function bgt_saveBudget() { bgt_store.set("haven_budget_v1", bgt_budget); }
function bgt_saveGoals() { bgt_store.set("haven_bgoals_v1", bgt_goals); }
function bgt_saveLessons() { bgt_store.set("haven_blessons_v1", bgt_lessons); }
function bgt_saveDebts() { bgt_store.set("haven_debts_v1", bgt_debts); }
function bgt_saveChallenges() { bgt_store.set("haven_challenges_v1", bgt_challenges); }
function bgt_saveCheckin() { bgt_store.set("haven_checkin_v1", bgt_checkin); }

/* ---------------- 5 plain-language lessons (from the app) ---------------- */
var BGT_LESSONS = [
  { id: "bl-zero", icon: "💼", t: "Give every dollar a job",
    body: [
      "A budget isn't punishment — it's a plan. Before the month starts, list every dollar coming in, then assign each one a job: rent, food, bus fare, savings. When every dollar has a job, none of them mysteriously disappear.",
      "This is called a zero-based budget: income minus planned spending equals zero. It works on $400 a month — especially on $400 a month.",
      "Start with the builder above. Add your income first, then your must-pay bills. Whatever is left gets a job too — even if its job is just \u201csavings.\u201d",
    ],
    tryIt: "List your income and your 3 must-pay bills in the Budget tab right now." },
  { id: "bl-needs", icon: "⚖️", t: "Needs vs. wants: the 2-question test",
    body: [
      "A need keeps you alive, housed, or able to work: food, shelter, medicine, bus fare to a job. A want is everything else — snacks, streaming, new clothes when the old ones still work.",
      "The 2-question test: 1) Can I be okay without this for 48 hours? 2) Is there a free way to meet this need? If you answer yes to either, it's probably a want.",
      "A classic target is 50/30/20 — 50% needs, 30% wants, 20% savings. On a tight income, aim for 80/10/10 first: needs covered, a little breathing room, a little saved. Direction matters more than perfection.",
    ],
    tryIt: "Tag each expense above as Need or Want. Be honest — this page won't judge." },
  { id: "bl-envelope", icon: "✉️", t: "The envelope method",
    body: [
      "Old school and unbeatable: put the cash for each spending category in its own envelope — Food, Transport, Personal. When an envelope is empty, spending in that category stops until next month.",
      "No cash? Do it digitally: the Budget tab above is your envelope system. Many free checking accounts let you make separate savings \u201cbuckets\u201d — ask when you open one.",
      "Envelopes kill the #1 budget killer: the slow leak of $5 here and $8 there. Cash you can see is money you respect.",
    ],
    tryIt: "Pick your leakiest spending category and give it a strict limit this month." },
  { id: "bl-irregular", icon: "📉", t: "Budgeting with irregular income",
    body: [
      "Day labor, gigs, seasonal work — income jumps around. So budget to your LOW number: the least you usually make in a month. Plan your must-pays against that.",
      "List bills in priority order: 1) food and shelter, 2) transport to work, 3) phone, 4) everything else. In a good month, the extra goes straight to savings — it doesn't become extra spending.",
      "One bad month shouldn't destroy the plan. That's exactly what the $500 cushion in the next lesson is for.",
    ],
    tryIt: "What's the lowest your monthly income gets? Put that number in the Budget tab." },
  { id: "bl-cushion", icon: "🛟", t: "Build a $500 safety cushion",
    body: [
      "One car repair or clinic visit can turn into debt when there's no cushion. $500 covers most small emergencies and breaks that cycle.",
      "The math: $20 a week is $500 in 25 weeks. $10 a week gets you there in a year. Start with whatever doesn't hurt — even $5 counts. Set it as a goal in the Goals tab.",
      "Keep it somewhere slightly hard to touch — a savings bucket, not your pocket. A free checking or savings account works, and the banking guide shows where to open one with $0.",
    ],
    tryIt: "Create a \u201c$500 cushion\u201d goal in the Goals tab and add your first $5." },
];

/* ---------------- savings challenges (from the app) ---------------- */
var BGT_CHALLENGES = [
  { id: "ch-nospend", icon: "🚫", days: 2, t: "No-spend weekend", d: "2 days. Spend $0 on wants — needs only." },
  { id: "ch-5day", icon: "💵", days: 7, t: "$5-a-day week", d: "7 days. Put $5 into savings every day: $35 total." },
  { id: "ch-noeat", icon: "🍲", days: 7, t: "No eating out week", d: "7 days. Cook or eat free meals only." },
  { id: "ch-roundup", icon: "🪙", days: 7, t: "Round-up week", d: "7 days. Round every purchase up and save the difference." },
];

/* ---------------- sums ---------------- */
function bgt_sumInc() { return bgt_budget.income.reduce(function (a, x) { return a + (+x.amt || 0); }, 0); }
function bgt_sumExp() { return bgt_budget.expenses.reduce(function (a, x) { return a + (+x.amt || 0); }, 0); }
function bgt_sumNeed() { return bgt_budget.expenses.filter(function (x) { return x.kind !== "want"; }).reduce(function (a, x) { return a + (+x.amt || 0); }, 0); }
function bgt_sumWant() { return bgt_budget.expenses.filter(function (x) { return x.kind === "want"; }).reduce(function (a, x) { return a + (+x.amt || 0); }, 0); }

/* ---------------- donut + insight ---------------- */
function bgt_donutHtml(need, want, left) {
  var tot = need + want + Math.max(left, 0);
  if (tot <= 0) return "";
  var pn = need / tot * 100, pw = want / tot * 100, pl = Math.max(left, 0) / tot * 100;
  function seg(frac, off, color) {
    return frac > 0
      ? '<circle cx="60" cy="60" r="48" fill="none" stroke="' + color + '" stroke-width="16" pathLength="100" stroke-dasharray="' + frac.toFixed(1) + " " + (100 - frac).toFixed(1) + '" stroke-dashoffset="' + (-off).toFixed(1) + '" stroke-linecap="butt"></circle>'
      : "";
  }
  return '<div class="bgt-donutwrap"><div class="bgt-donut"><svg viewBox="0 0 120 120" width="110" height="110">' +
    '<circle cx="60" cy="60" r="48" fill="none" stroke="rgba(127,127,127,.18)" stroke-width="16"></circle>' +
    seg(pn, 25, "#f59e0b") + seg(pw, 25 + pn, "#8b5cf6") + seg(pl, 25 + pn + pw, "#34d399") +
    '</svg></div><div class="bgt-leg">' +
    '<div><i style="background:#f59e0b"></i>Needs<span>' + bgt_money(need) + '</span></div>' +
    '<div><i style="background:#8b5cf6"></i>Wants<span>' + bgt_money(want) + '</span></div>' +
    '<div><i style="background:#34d399"></i>Left over<span>' + bgt_money(Math.max(left, 0)) + '</span></div>' +
    "</div></div>";
}
function bgt_insightHtml(inc, exp, left) {
  var cls = "", txt;
  if (inc <= 0) { txt = "Add your monthly income above to see your full picture."; }
  else if (left < 0) { cls = "warn"; txt = "You're planning to spend " + bgt_money(-left) + " more than you earn. Look at your Wants — what can wait until next month?"; }
  else if (left / inc >= 0.2) { cls = "good"; txt = "You're setting aside " + Math.round(left / inc * 100) + "% — that's the dream zone. Future you says thanks."; }
  else { txt = "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings. On a tight budget, even 80/10/10 moves you forward."; }
  return '<div class="bgt-tip ' + cls + '">' + bgtE(txt) + "</div>";
}
function bgt_listHtml(items, isExp) {
  if (!items.length) return '<div class="bgt-empty"><div class="big">' + (isExp ? "🧾" : "💵") + "</div>Nothing here yet — add your first one below.</div>";
  return items.map(function (x) {
    return '<div class="bgt-row"><div class="nm">' + bgtE(x.name) + "</div>" +
      (isExp ? '<span class="bgt-tag ' + (x.kind === "want" ? "want" : "need") + '">' + (x.kind === "want" ? "Want" : "Need") + "</span>" : "") +
      (isExp && x.due >= 1 && x.due <= 31 ? '<span class="bgt-tag due">📅 ' + x.due + "</span>" : "") +
      '<div class="amt">' + bgt_money(x.amt) + '</div>' +
      '<button class="bgt-del" data-bact="bdel" data-bid="' + bgtEA(x.id) + '" aria-label="delete">✕</button></div>';
  }).join("");
}

/* ---------------- bills: due dates + reminders ---------------- */
function bgt_nextDue(dueDay) {
  var now = new Date();
  var d = new Date(now.getFullYear(), now.getMonth(), dueDay, 9, 0, 0);
  if (d <= now) d = new Date(now.getFullYear(), now.getMonth() + 1, dueDay, 9, 0, 0);
  return d;
}
function bgt_billsHtml() {
  var withDue = bgt_budget.expenses.filter(function (x) { return x.due >= 1 && x.due <= 31; });
  if (!withDue.length) return "";
  var now = new Date();
  var rows = withDue.map(function (x) { return { x: x, d: bgt_nextDue(x.due) }; })
    .sort(function (a, b) { return a.d - b.d; });
  return '<div class="bgt-card"><h4>📅 Upcoming bills</h4>' +
    rows.map(function (r) {
      var days = Math.ceil((r.d - now) / 864e5);
      var lbl = days <= 0 ? "Due today!" : days === 1 ? "Due tomorrow" : "Due in " + days + " days";
      var cls = days <= 1 ? "over" : days <= 3 ? "soon" : "";
      return '<div class="bgt-row"><div class="nm">' + bgtE(r.x.name) + '</div><span class="bgt-due ' + cls + '">' + lbl + '</span><div class="amt">' + bgt_money(r.x.amt) + "</div></div>";
    }).join("") +
    '<div class="bgt-tip">A reminder pops up here 2 days before each bill is due. Allow notifications for alerts when this tab isn\u2019t open.</div></div>';
}
var bgt_billTimers = [];
function bgt_scheduleBillReminders() {
  bgt_billTimers.forEach(clearTimeout); bgt_billTimers = [];
  var fired = bgt_store.get("haven_billrem_v1", {});
  bgt_budget.expenses.forEach(function (x) {
    if (!(x.due >= 1 && x.due <= 31)) return;
    var d = bgt_nextDue(x.due);
    var key = x.id + ":" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    if (fired[key]) return;
    var delay = d.getTime() - 2 * 864e5 - Date.now();
    if (delay <= 60000 || delay > 2147483647) return;
    bgt_billTimers.push(setTimeout(function () {
      fired[key] = 1; bgt_store.set("haven_billrem_v1", fired);
      var msg = "Bill due in 2 days: " + x.name + " — " + bgt_money(x.amt);
      try {
        if (typeof Notification !== "undefined" && Notification.permission === "granted") { new Notification("💸 " + x.name, { body: msg }); }
        else if (typeof miniToast === "function") { miniToast("⏰ " + msg); }
      } catch (err) { if (typeof miniToast === "function") miniToast("⏰ " + msg); }
    }, delay));
  });
}

/* ---------------- panels ---------------- */
function bgt_panelBudget() {
  var inc = bgt_sumInc(), exp = bgt_sumExp(), left = inc - exp;
  return '<div class="bgt-card"><h4>📊 Your monthly picture</h4>' +
    '<div class="bgt-left"><b style="color:' + (left < 0 ? "#f87171" : "#34d399") + '">' + (left < 0 ? "−" : "") + bgt_money(Math.abs(left)) + '</b><small>left over each month</small></div>' +
    '<div class="bgt-stats"><div class="bgt-stat"><b style="color:#34d399">' + bgt_money(inc) + "</b><small>Income</small></div>" +
    '<div class="bgt-stat"><b style="color:#f59e0b">' + bgt_money(exp) + "</b><small>Planned spending</small></div></div>" +
    bgt_donutHtml(bgt_sumNeed(), bgt_sumWant(), left) + bgt_insightHtml(inc, exp, left) + "</div>" +
    '<div class="bgt-card"><h4>💵 Income</h4>' + bgt_listHtml(bgt_budget.income, false) +
    '<div class="bgt-add"><input class="nm" id="bIncName" placeholder="Name — e.g. Day labor, SNAP, SSI" maxlength="40">' +
    '<input class="amt" id="bIncAmt" inputmode="decimal" placeholder="Amount">' +
    '<button class="bgt-btn" data-bact="incadd">Add</button></div></div>' +
    '<div class="bgt-card"><h4>🧾 Planned spending</h4>' + bgt_listHtml(bgt_budget.expenses, true) +
    '<div class="bgt-add"><input class="nm" id="bExpName" placeholder="Name — e.g. Rent, Food, Bus fare" maxlength="40">' +
    '<input class="amt" id="bExpAmt" inputmode="decimal" placeholder="Amount">' +
    '<input class="due" id="bExpDue" inputmode="numeric" placeholder="Due" maxlength="2" title="Day of month due (optional)">' +
    '<button class="bgt-btn" data-bact="expadd">Add</button></div>' +
    '<div class="bgt-kind" id="bExpKind"><button data-bact="expkind" data-bid="need" class="' + (bgt_expKind === "need" ? "on-n" : "") + '">Need</button>' +
    '<button data-bact="expkind" data-bid="want" class="' + (bgt_expKind === "want" ? "on-w" : "") + '">Want</button></div></div>' +
    bgt_billsHtml() +
    '<div class="bgt-card bgt-bank"><b>🏦 No bank account?</b>' +
    "<p>Stashing cash under the mattress loses to inflation and temptation. Fort Wayne banks offer free checking with $0 monthly fees — some let you open with $0.</p>" +
    '<button data-bact="bankgo">See free banking options</button></div>';
}
function bgt_panelLearn() {
  var n = bgt_lessons.length;
  return '<div class="bgt-card"><h4>🎓 Budgeting school</h4>' +
    '<div class="bgt-sub">Five short lessons that teach you to run your money instead of chasing it.</div>' +
    '<div style="margin-top:8px;font-weight:800;font-size:13px">' + n + " / " + BGT_LESSONS.length + " lessons learned</div>" +
    '<div class="bgo-bar" style="margin-top:8px"><div class="bgo-fill" style="width:' + Math.round(n / BGT_LESSONS.length * 100) + '%;background:linear-gradient(90deg,#818cf8,#22d3ee)"></div></div></div>' +
    BGT_LESSONS.map(function (ls) {
      var learned = bgt_lessons.indexOf(ls.id) >= 0;
      return '<div class="lsn' + (learned ? " learned" : "") + '">' +
        '<button class="lsn-head" data-bact="lsnhead"><div class="lsn-ic">' + ls.icon + "</div><b>" + bgtE(ls.t) + '</b><span class="lsn-state">' + (learned ? "✓ Learned" : "›") + "</span></button>" +
        '<div class="lsn-body">' + ls.body.map(function (p) { return "<p>" + bgtE(p) + "</p>"; }).join("") +
        '<div class="lsn-try"><b>Try this:</b> ' + bgtE(ls.tryIt) + "</div>" +
        '<button class="lsn-done" data-bact="ldone" data-bid="' + ls.id + '">' + (learned ? "Learned ✓ — tap to unmark" : "Mark as learned") + "</button></div></div>";
    }).join("");
}
function bgt_challengesHtml() {
  var active = bgt_challenges.filter(function (c) { return !c.done; });
  var avail = BGT_CHALLENGES.filter(function (t) { return !bgt_challenges.some(function (c) { return c.tpl === t.id && !c.done; }); });
  var h = '<div class="bgt-sec"><div class="bar"></div><h3>⚡ Challenges</h3></div>';
  h += active.map(function (c) {
    var t = BGT_CHALLENGES.find(function (x) { return x.id === c.tpl; }); if (!t) return "";
    var dayN = Math.min(t.days, Math.floor((Date.now() - c.start) / 864e5) + 1);
    var canFinish = Date.now() >= c.end;
    return '<div class="bgo' + (c.done ? " done" : "") + '"><div class="bgo-top"><b>' + t.icon + " " + bgtE(t.t) + "</b><span>Day " + dayN + " / " + t.days + "</span></div>" +
      '<div class="bgo-bar"><div class="bgo-fill" style="width:' + Math.round(dayN / t.days * 100) + '%"></div></div>' +
      '<button class="lsn-done" data-bact="chfin" data-bid="' + bgtEA(c.id) + '"' + (canFinish ? "" : ' disabled style="opacity:.5"') + ">" + (canFinish ? "Finish challenge" : "Ends " + new Date(c.end).toLocaleDateString()) + "</button></div>";
  }).join("");
  h += '<div class="bgt-card"><h4>🎮 Start a challenge</h4>' +
    (avail.length ? avail.map(function (t) {
      return '<div class="bgt-row"><div class="nm">' + t.icon + " <b>" + bgtE(t.t) + '</b><br><small style="opacity:.7">' + bgtE(t.d) + '</small></div><button class="bgt-btn" data-bact="chstart" data-bid="' + t.id + '">Start</button></div>';
    }).join("") : '<div class="bgt-empty">All challenges are active or done — finish one to play it again.</div>') + "</div>";
  return h;
}
function bgt_panelGoals() {
  var goalsHtml = '<div class="bgt-card"><h4>🎯 Savings goals</h4>' +
    '<div class="bgt-sub">Name it, set a number, feed it a little at a time. Small deposits beat big intentions.</div>' +
    '<div class="bgt-add"><input class="nm" id="bGoalName" placeholder="Goal name — e.g. $500 cushion" maxlength="40">' +
    '<input class="amt" id="bGoalTgt" inputmode="decimal" placeholder="Target $">' +
    '<button class="bgt-btn" data-bact="goaladd">Add</button></div></div>';
  if (bgt_goals.length) {
    goalsHtml += bgt_goals.map(function (g) {
      var pct = g.target > 0 ? Math.min(100, Math.round(g.saved / g.target * 100)) : 0;
      var done = g.target > 0 && g.saved >= g.target;
      return '<div class="bgo' + (done ? " done" : "") + '"><div class="bgo-top"><b>' + bgtE(g.name) + (done ? " 🎉" : "") + "</b><span>" + bgt_money(g.saved) + " / " + bgt_money(g.target) + "</span></div>" +
        '<div class="bgo-bar"><div class="bgo-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="bgo-add"><input inputmode="decimal" id="ga-' + bgtEA(g.id) + '" placeholder="Add $">' +
        '<button class="bgt-btn" data-bact="gadd" data-bid="' + bgtEA(g.id) + '">Add</button>' +
        '<button class="bgt-del" data-bact="gdel" data-bid="' + bgtEA(g.id) + '" aria-label="delete">✕</button></div></div>';
    }).join("");
  } else {
    goalsHtml += '<div class="bgt-card"><div class="bgt-empty"><div class="big">🎯</div>No goals yet — start with a $500 safety cushion.</div></div>';
  }
  return goalsHtml + bgt_challengesHtml();
}
function bgt_panelDebts() {
  var total = bgt_debts.reduce(function (a, x) { return a + Math.max(x.owed, 0); }, 0);
  var sorted = bgt_debts.slice().sort(function (a, b) { return a.owed - b.owed; });
  var h = '<div class="bgt-card"><h4>💳 Debt snowball</h4>' +
    '<div class="bgt-left"><b style="color:#f87171">' + bgt_money(total) + "</b><small>total owed</small></div>" +
    '<div class="bgt-tip">Pay the minimum on everything, then attack the smallest debt first. Every payoff frees money for the next one.</div></div>' +
    '<div class="bgt-card"><h4>➕ Add a debt</h4>' +
    '<div class="bgt-add"><input class="nm" id="bDebtName" placeholder="Name — e.g. Credit card" maxlength="40">' +
    '<input class="amt" id="bDebtOwed" inputmode="decimal" placeholder="Owed $">' +
    '<button class="bgt-btn" data-bact="debtadd">Add</button></div></div>';
  if (sorted.length) {
    h += sorted.map(function (g, i) {
      var done = g.owed <= 0;
      var pct = g.start > 0 ? Math.min(100, Math.round((g.start - Math.max(g.owed, 0)) / g.start * 100)) : 100;
      return '<div class="bgo' + (done ? " done" : "") + '"><div class="bgo-top"><b>' + (done ? "🎉 " : "#" + (i + 1) + " ") + bgtE(g.name) + "</b><span>" + bgt_money(Math.max(g.owed, 0)) + " left</span></div>" +
        '<div class="bgo-bar"><div class="bgo-fill" style="width:' + pct + '%"></div></div>' +
        (done ? '<div style="font-size:13px;font-weight:800;color:#34d399">Paid off!</div>' :
          '<div class="bgo-add"><input inputmode="decimal" id="da-' + bgtEA(g.id) + '" placeholder="Payment $">' +
          '<button class="bgt-btn" data-bact="dpay" data-bid="' + bgtEA(g.id) + '">Pay</button>' +
          '<button class="bgt-del" data-bact="ddel" data-bid="' + bgtEA(g.id) + '" aria-label="delete">✕</button></div>') + "</div>";
    }).join("");
  } else {
    h += '<div class="bgt-card"><div class="bgt-empty"><div class="big">💳</div>No debts tracked. Owing nothing is the goal — keep it that way.</div></div>';
  }
  return h;
}

/* ---------------- daily check-in streak ---------------- */
function bgt_dayStr(d) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
function bgt_checkinState() {
  var today = bgt_dayStr(new Date());
  if (bgt_checkin.last === today) return { done: true, streak: bgt_checkin.streak };
  var y = new Date(); y.setDate(y.getDate() - 1);
  return { done: false, streak: bgt_checkin.last === bgt_dayStr(y) ? bgt_checkin.streak : 0 };
}
function bgt_doCheckin() {
  var st = bgt_checkinState();
  if (st.done) return;
  bgt_checkin.streak = st.streak + 1;
  bgt_checkin.last = bgt_dayStr(new Date());
  bgt_saveCheckin();
  if (typeof miniToast === "function") miniToast("🔥 Checked in — " + bgt_checkin.streak + "-day streak!");
}
function bgt_checkinHtml() {
  var st = bgt_checkinState();
  return '<div class="ck-card"><div class="ck-flame">🔥</div><div class="ck-mid"><b>' + st.streak + " day streak</b>" +
    "<small>" + (st.done ? "Checked in today — see you tomorrow." : "One tap: did you move forward today?") + "</small></div>" +
    (st.done ? '<div class="ck-done">✓</div>' : '<button class="ck-btn" data-bact="ckin">Check in</button>') + "</div>";
}

/* ---------------- render ---------------- */
function renderBudgetStudio() {
  bgt_wireOnce();
  var ck = document.getElementById("plan-checkin");
  if (ck) ck.innerHTML = bgt_checkinHtml();
  var el = document.getElementById("budget-studio");
  if (!el) return;
  var tabs = [["budget", "💰", "Budget"], ["learn", "🎓", "Learn"], ["goals", "🎯", "Goals"], ["debts", "💳", "Debts"]];
  el.innerHTML = '<div class="bgt-sec"><div class="bar"></div><h3>💰 Budget Studio</h3></div>' +
    '<div class="bgt-pills">' + tabs.map(function (t) {
      return '<button class="bgt-pill' + (bgt_tab === t[0] ? " on" : "") + '" data-bact="btab" data-bid="' + t[0] + '">' + t[1] + " " + t[2] + "</button>";
    }).join("") + "</div>" +
    '<div id="bgtPanel">' + (bgt_tab === "budget" ? bgt_panelBudget() : bgt_tab === "learn" ? bgt_panelLearn() : bgt_tab === "debts" ? bgt_panelDebts() : bgt_panelGoals()) + "</div>";
  bgt_scheduleBillReminders();
}

/* ---------------- events (delegation) ---------------- */
var bgt_wired = false;
function bgt_wireOnce() {
  if (bgt_wired) return; bgt_wired = true;
  document.addEventListener("click", bgt_onClick);
}
function bgt_numVal(id) {
  var el = document.getElementById(id);
  var v = parseFloat(String((el && el.value) || "").replace(/[^0-9.]/g, ""));
  return isNaN(v) || v < 0 ? 0 : Math.round(v * 100) / 100;
}
function bgt_val(id) {
  var el = document.getElementById(id);
  return el ? String(el.value || "").trim() : "";
}
function bgt_openBankingGuide() {
  try {
    if (typeof goTab === "function") goTab("guide");
    setTimeout(function () {
      try {
        var btns = document.querySelectorAll("#ggCards button");
        for (var i = 0; i < btns.length; i++) {
          if (/bank account/i.test(btns[i].textContent || "")) { btns[i].click(); btns[i].scrollIntoView({ block: "center" }); return; }
        }
        if (typeof miniToast === "function") miniToast("Open the 🏦 banking guide below");
      } catch (e) {}
    }, 350);
  } catch (e) {}
}
function bgt_onClick(e) {
  var t = (e.target && e.target.closest) ? e.target.closest("[data-bact]") : null;
  if (!t) return;
  var act = t.getAttribute("data-bact"), id = t.getAttribute("data-bid");
  if (act === "btab") { bgt_tab = id; renderBudgetStudio(); }
  else if (act === "bdel") {
    bgt_budget.income = bgt_budget.income.filter(function (x) { return x.id !== id; });
    bgt_budget.expenses = bgt_budget.expenses.filter(function (x) { return x.id !== id; });
    bgt_saveBudget(); renderBudgetStudio();
  }
  else if (act === "lsnhead") { var card = t.closest(".lsn"); if (card) card.classList.toggle("open"); }
  else if (act === "ldone") {
    e.stopPropagation();
    var i = bgt_lessons.indexOf(id);
    if (i >= 0) bgt_lessons.splice(i, 1); else bgt_lessons.push(id);
    bgt_saveLessons(); renderBudgetStudio();
    if (typeof miniToast === "function") miniToast(i >= 0 ? "Unmarked" : "✓ Lesson learned");
  }
  else if (act === "incadd") {
    var nm = bgt_val("bIncName"), amt = bgt_numVal("bIncAmt");
    if (!nm || amt <= 0) { if (typeof miniToast === "function") miniToast("Enter a name and amount"); return; }
    bgt_budget.income.push({ id: bgt_uid(), name: nm, amt: amt });
    bgt_saveBudget(); renderBudgetStudio();
  }
  else if (act === "expadd") {
    var enm = bgt_val("bExpName"), eamt = bgt_numVal("bExpAmt");
    if (!enm || eamt <= 0) { if (typeof miniToast === "function") miniToast("Enter a name and amount"); return; }
    var due = parseInt(bgt_val("bExpDue").replace(/\D/g, ""), 10);
    if (!(due >= 1 && due <= 31)) due = 0;
    bgt_budget.expenses.push({ id: bgt_uid(), name: enm, amt: eamt, kind: bgt_expKind, due: due });
    bgt_saveBudget();
    if (due && typeof requestNotifPerm === "function") requestNotifPerm();
    renderBudgetStudio();
  }
  else if (act === "expkind") { bgt_expKind = id; renderBudgetStudio(); }
  else if (act === "bankgo") { bgt_openBankingGuide(); }
  else if (act === "ckin") { bgt_doCheckin(); renderBudgetStudio(); }
  else if (act === "goaladd") {
    var gnm = bgt_val("bGoalName"), tgt = bgt_numVal("bGoalTgt");
    if (!gnm || tgt <= 0) { if (typeof miniToast === "function") miniToast("Enter a goal name and target"); return; }
    bgt_goals.push({ id: bgt_uid(), name: gnm, target: tgt, saved: 0 });
    bgt_saveGoals(); renderBudgetStudio();
  }
  else if (act === "gadd") {
    var g = bgt_goals.find(function (x) { return x.id === id; }), v = bgt_numVal("ga-" + id);
    if (!g || v <= 0) return;
    var wasDone = g.target > 0 && g.saved >= g.target;
    g.saved = Math.round((g.saved + v) * 100) / 100;
    bgt_saveGoals(); renderBudgetStudio();
    if (!wasDone && g.target > 0 && g.saved >= g.target && typeof miniToast === "function") miniToast("🎉 Goal funded!");
  }
  else if (act === "gdel") { bgt_goals = bgt_goals.filter(function (x) { return x.id !== id; }); bgt_saveGoals(); renderBudgetStudio(); }
  else if (act === "debtadd") {
    var dnm = bgt_val("bDebtName"), owed = bgt_numVal("bDebtOwed");
    if (!dnm || owed <= 0) { if (typeof miniToast === "function") miniToast("Enter a name and amount owed"); return; }
    bgt_debts.push({ id: bgt_uid(), name: dnm, owed: owed, start: owed });
    bgt_saveDebts(); renderBudgetStudio();
  }
  else if (act === "dpay") {
    var db = bgt_debts.find(function (x) { return x.id === id; }), pv = bgt_numVal("da-" + id);
    if (!db || pv <= 0) return;
    var wasPaid = db.owed <= 0;
    db.owed = Math.round((db.owed - pv) * 100) / 100;
    bgt_saveDebts(); renderBudgetStudio();
    if (!wasPaid && db.owed <= 0 && typeof miniToast === "function") miniToast("💥 Debt destroyed!");
  }
  else if (act === "ddel") { bgt_debts = bgt_debts.filter(function (x) { return x.id !== id; }); bgt_saveDebts(); renderBudgetStudio(); }
  else if (act === "chstart") {
    var tpl = BGT_CHALLENGES.find(function (x) { return x.id === id; });
    if (!tpl) return;
    var now = Date.now();
    bgt_challenges.push({ id: bgt_uid(), tpl: tpl.id, start: now, end: now + tpl.days * 864e5, done: false });
    bgt_saveChallenges(); renderBudgetStudio();
    if (typeof miniToast === "function") miniToast(tpl.icon + " Challenge started!");
  }
  else if (act === "chfin") {
    var c = bgt_challenges.find(function (x) { return x.id === id; });
    if (!c || c.done || Date.now() < c.end) return;
    c.done = true; bgt_saveChallenges(); renderBudgetStudio();
    if (typeof miniToast === "function") miniToast("⚡ Challenge complete!");
  }
}
