/* === budget.js === */
/* Haven FW — Budget Studio: premium Plan tab (progress hero + steps) and a budgeting
   tool that teaches budgeting: income/expense builder, needs-vs-wants donut, savings
   goals, and 5 plain-language lessons. All data stays on this phone (localStorage). */
"use strict";
(function () {
  const es = () => { try { return typeof settings !== "undefined" && settings.lang === "es"; } catch (e) { return false; } };
  const L = (en, s) => (es() ? s : en);
  const E = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const uid = () => "b" + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
  const money = n => "$" + Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: Number(n) % 1 ? 2 : 0 });

  const store = {
    get(k, fb) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
  let budget = store.get("haven_budget_v1", { income: [], expenses: [] });
  let bgoals = store.get("haven_bgoals_v1", []);
  let blessons = store.get("haven_blessons_v1", []);
  let debts = store.get("haven_debts_v1", []);
  let challenges = store.get("haven_challenges_v1", []);
  let checkin = store.get("haven_checkin_v1", { last: "", streak: 0 });
  let btab = "budget";
  const saveBudget = () => store.set("haven_budget_v1", budget);
  const saveGoals = () => store.set("haven_bgoals_v1", bgoals);
  const saveLessons = () => store.set("haven_blessons_v1", blessons);
  const saveDebts = () => store.set("haven_debts_v1", debts);
  const saveChallenges = () => store.set("haven_challenges_v1", challenges);
  const saveCheckin = () => store.set("haven_checkin_v1", checkin);

  /* ---------------- lessons: plain-language budgeting school ---------------- */
  const LESSONS = [
    { id: "bl-zero", icon: "💼",
      t: L("Give every dollar a job", "Dale un trabajo a cada dólar"),
      body: [
        L("A budget isn't punishment — it's a plan. Before the month starts, list every dollar coming in, then assign each one a job: rent, food, bus fare, savings. When every dollar has a job, none of them mysteriously disappear.",
          "Un presupuesto no es un castigo, es un plan. Antes de que empiece el mes, anota cada dólar que entra y asígnale un trabajo: renta, comida, pasaje, ahorros. Cuando cada dólar tiene un trabajo, ninguno desaparece misteriosamente."),
        L("This is called a zero-based budget: income minus planned spending equals zero. It works on $400 a month — especially on $400 a month.",
          "Esto se llama presupuesto base cero: ingresos menos gastos planeados igual a cero. Funciona con $400 al mes, especialmente con $400 al mes."),
        L("Start with the builder above. Add your income first, then your must-pay bills. Whatever is left gets a job too — even if its job is just “savings.”",
          "Empieza con la herramienta de arriba. Agrega tus ingresos primero, luego tus cuentas obligatorias. Lo que sobre también recibe un trabajo, aunque sea “ahorros.”"),
      ],
      tryIt: L("List your income and your 3 must-pay bills in the Budget tab right now.", "Anota tus ingresos y tus 3 cuentas obligatorias en la pestaña Presupuesto ahora mismo.") },
    { id: "bl-needs", icon: "⚖️",
      t: L("Needs vs. wants: the 2-question test", "Necesidades vs. deseos: la prueba de 2 preguntas"),
      body: [
        L("A need keeps you alive, housed, or able to work: food, shelter, medicine, bus fare to a job. A want is everything else — snacks, streaming, new clothes when the old ones still work.",
          "Una necesidad te mantiene vivo, con techo o capaz de trabajar: comida, vivienda, medicinas, pasaje al trabajo. Un deseo es todo lo demás: antojos, streaming, ropa nueva cuando la vieja aún sirve."),
        L("The 2-question test: 1) Can I be okay without this for 48 hours? 2) Is there a free way to meet this need? If you answer yes to either, it's probably a want.",
          "La prueba de 2 preguntas: 1) ¿Puedo estar bien sin esto por 48 horas? 2) ¿Hay una forma gratis de cubrir esta necesidad? Si respondes sí a alguna, probablemente es un deseo."),
        L("A classic target is 50/30/20 — 50% needs, 30% wants, 20% savings. On a tight income, aim for 80/10/10 first: needs covered, a little breathing room, a little saved. Direction matters more than perfection.",
          "Una meta clásica es 50/30/20: 50% necesidades, 30% deseos, 20% ahorros. Con poco ingreso, apunta a 80/10/10 primero: necesidades cubiertas, un poco de aire, un poco ahorrado. La dirección importa más que la perfección."),
      ],
      tryIt: L("Tag each expense above as Need or Want. Be honest — the app won't judge.", "Marca cada gasto de arriba como Necesidad o Deseo. Sé honesto, la app no juzga.") },
    { id: "bl-envelope", icon: "✉️",
      t: L("The envelope method", "El método de los sobres"),
      body: [
        L("Old school and unbeatable: put the cash for each spending category in its own envelope — Food, Transport, Personal. When an envelope is empty, spending in that category stops until next month.",
          "Clásico e imbatible: pon el efectivo de cada categoría en su propio sobre: Comida, Transporte, Personal. Cuando un sobre se vacía, el gasto en esa categoría se detiene hasta el próximo mes."),
        L("No cash? Do it digitally: the Budget tab above is your envelope system. Many free checking accounts let you make separate savings “buckets” — ask when you open one.",
          "¿Sin efectivo? Hazlo digital: la pestaña Presupuesto es tu sistema de sobres. Muchas cuentas de cheques gratis permiten crear “cubetas” de ahorro separadas; pregunta al abrir una."),
        L("Envelopes kill the #1 budget killer: the slow leak of $5 here and $8 there. Cash you can see is money you respect.",
          "Los sobres matan al asesino #1 del presupuesto: la fuga lenta de $5 aquí y $8 allá. El efectivo que puedes ver es dinero que respetas."),
      ],
      tryIt: L("Pick your leakiest spending category and give it a strict limit this month.", "Elige tu categoría con más fugas y ponle un límite estricto este mes.") },
    { id: "bl-irregular", icon: "📉",
      t: L("Budgeting with irregular income", "Presupuestar con ingresos irregulares"),
      body: [
        L("Day labor, gigs, seasonal work — income jumps around. So budget to your LOW number: the least you usually make in a month. Plan your must-pays against that.",
          "Trabajo por día, gigs, trabajo temporal: el ingreso varía. Así que presupuesta con tu número BAJO: lo mínimo que sueles ganar en un mes. Planea tus cuentas obligatorias con eso."),
        L("List bills in priority order: 1) food and shelter, 2) transport to work, 3) phone, 4) everything else. In a good month, the extra goes straight to savings — it doesn't become extra spending.",
          "Ordena tus cuentas por prioridad: 1) comida y techo, 2) transporte al trabajo, 3) teléfono, 4) lo demás. En un buen mes, el extra va directo a ahorros, no se vuelve gasto extra."),
        L("One bad month shouldn't destroy the plan. That's exactly what the $500 cushion in the next lesson is for.",
          "Un mal mes no debería destruir el plan. Para eso es el colchón de $500 de la próxima lección."),
      ],
      tryIt: L("What's the lowest your monthly income gets? Put that number in the Budget tab.", "¿Cuál es lo mínimo que ganas en un mes? Pon ese número en la pestaña Presupuesto.") },
    { id: "bl-cushion", icon: "🛟",
      t: L("Build a $500 safety cushion", "Crea un colchón de seguridad de $500"),
      body: [
        L("One car repair or clinic visit can turn into debt when there's no cushion. $500 covers most small emergencies and breaks that cycle.",
          "Una reparación del auto o una visita a la clínica se vuelve deuda cuando no hay colchón. $500 cubre la mayoría de emergencias pequeñas y rompe ese ciclo."),
        L("The math: $20 a week is $500 in 25 weeks. $10 a week gets you there in a year. Start with whatever doesn't hurt — even $5 counts. Set it as a goal in the Goals tab.",
          "Las cuentas: $20 por semana son $500 en 25 semanas. $10 por semana te llevan en un año. Empieza con lo que no duela, hasta $5 cuenta. Ponlo como meta en la pestaña Metas."),
        L("Keep it somewhere slightly hard to touch — a savings bucket, not your pocket. A free checking or savings account works, and the banking guide shows where to open one with $0.",
          "Guárdalo en un lugar un poco difícil de tocar: una cubeta de ahorros, no tu bolsillo. Una cuenta de cheques o ahorros gratis funciona; la guía de banca muestra dónde abrir una con $0."),
      ],
      tryIt: L("Create a “$500 cushion” goal in the Goals tab and add your first $5.", "Crea una meta “colchón de $500” en la pestaña Metas y agrega tus primeros $5.") },
  ];

  /* ---------------- premium styles ---------------- */
  let cssDone = false;
  function injectCss() {
    if (cssDone) return; cssDone = true;
    const c = document.createElement("style");
    c.textContent =
      ".pp-hero{position:relative;overflow:hidden;border-radius:24px;margin:12px 16px 4px;padding:18px;color:#fff;background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#0e7490 130%);box-shadow:0 12px 32px rgba(99,102,241,.38)}" +
      ".pp-hero::before,.pp-hero::after{content:'';position:absolute;border-radius:50%;opacity:.35;pointer-events:none}" +
      ".pp-hero::before{width:190px;height:190px;background:#22d3ee;top:-80px;right:-60px}" +
      ".pp-hero::after{width:150px;height:150px;background:#f472b6;bottom:-70px;left:-50px}" +
      ".pp-in{position:relative;z-index:1;display:flex;gap:16px;align-items:center}" +
      ".pp-ringwrap{position:relative;width:98px;height:98px;flex:none}" +
      ".pp-ringwrap svg{transform:rotate(-90deg);display:block}" +
      ".pp-track{fill:none;stroke:rgba(255,255,255,.28);stroke-width:10}" +
      ".pp-ring{fill:none;stroke:#fff;stroke-width:10;stroke-linecap:round;transition:stroke-dashoffset .8s ease}" +
      ".pp-pct{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:calc(20px*var(--ts,1))}" +
      ".pp-hello{font-size:calc(12.5px*var(--ts,1));opacity:.85}" +
      ".pp-title{font-size:calc(19px*var(--ts,1));font-weight:800;margin:2px 0 4px;line-height:1.25}" +
      ".pp-sub{font-size:calc(13px*var(--ts,1));opacity:.92;line-height:1.45}" +
      ".pp-sec{margin:20px 16px 10px;display:flex;align-items:center;gap:10px}" +
      ".pp-sec h3{margin:0;font-size:calc(16.5px*var(--ts,1));font-weight:800;letter-spacing:-.2px}" +
      ".pp-sec .bar{width:5px;height:22px;border-radius:3px;background:linear-gradient(180deg,#818cf8,#22d3ee);flex:none}" +
      ".pp-sec .cnt{margin-left:auto;font-size:calc(12.5px*var(--ts,1));color:var(--mut);font-weight:700}" +
      ".pp-step{display:flex;gap:12px;align-items:flex-start;background:var(--card);border:1px solid var(--line);border-radius:18px;padding:13px 12px;margin:0 16px 10px;box-shadow:var(--sh1)}" +
      ".pp-num{width:30px;height:30px;border-radius:10px;flex:none;display:flex;align-items:center;justify-content:center;font-weight:800;background:linear-gradient(135deg,#818cf8,#22d3ee);color:#fff;font-size:calc(14px*var(--ts,1))}" +
      ".pp-step.done{opacity:.6}" +
      ".pp-step.done .pp-t{text-decoration:line-through}" +
      ".pp-mid{flex:1;min-width:0}" +
      ".pp-t{font-weight:700;font-size:calc(14.5px*var(--ts,1));line-height:1.3}" +
      ".pp-d{color:var(--mut);font-size:calc(12.5px*var(--ts,1));margin-top:3px;line-height:1.5}" +
      ".pp-check{flex:none;width:36px;height:36px;border-radius:50%;border:2px solid var(--line);background:transparent;font-size:calc(17px*var(--ts,1));cursor:pointer;transition:transform .15s,background .2s,border-color .2s;color:transparent}" +
      ".pp-check:active{transform:scale(.88)}" +
      ".pp-step.done .pp-check{background:linear-gradient(135deg,#34d399,#10b981);border-color:transparent;color:#fff}" +
      ".pp-go{flex:none;align-self:center;border:0;border-radius:12px;padding:9px 12px;font-weight:800;font-size:calc(12.5px*var(--ts,1));background:linear-gradient(135deg,#818cf8,#6366f1);color:#fff;cursor:pointer;box-shadow:0 4px 14px rgba(99,102,241,.35)}" +
      ".bgt-pills{display:flex;gap:8px;margin:0 16px 12px}" +
      ".bgt-pill{flex:1;border:1.5px solid var(--line);background:var(--card);color:var(--txt);border-radius:14px;padding:11px 6px;font-weight:800;font-size:calc(13px*var(--ts,1));cursor:pointer;transition:transform .12s}" +
      ".bgt-pill:active{transform:scale(.96)}" +
      ".bgt-pill.on{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;border-color:transparent;box-shadow:0 6px 18px rgba(124,58,237,.4)}" +
      ".bgt-card{background:var(--card);border:1px solid var(--line);border-radius:20px;margin:0 16px 12px;padding:16px;box-shadow:var(--sh1)}" +
      ".bgt-card h4{margin:0 0 10px;font-size:calc(14.5px*var(--ts,1));font-weight:800}" +
      ".bgt-left{text-align:center;margin:2px 0 4px}" +
      ".bgt-left b{font-size:calc(30px*var(--ts,1));font-weight:800;letter-spacing:-.5px}" +
      ".bgt-left small{display:block;opacity:.65;font-size:calc(12px*var(--ts,1));margin-top:2px}" +
      ".bgt-stats{display:flex;gap:10px;margin:10px 0 4px}" +
      ".bgt-stat{flex:1;background:rgba(127,127,127,.1);border-radius:14px;padding:10px 6px;text-align:center}" +
      ".bgt-stat b{display:block;font-size:calc(16px*var(--ts,1));font-variant-numeric:tabular-nums}" +
      ".bgt-stat small{opacity:.65;font-size:calc(11.5px*var(--ts,1))}" +
      ".bgt-donutwrap{display:flex;gap:14px;align-items:center;margin:6px 0 2px}" +
      ".bgt-donut{width:110px;height:110px;flex:none}" +
      ".bgt-donut svg{transform:rotate(-90deg);display:block}" +
      ".bgt-leg{flex:1;min-width:0;font-size:calc(13px*var(--ts,1))}" +
      ".bgt-leg div{display:flex;align-items:center;gap:8px;margin:5px 0}" +
      ".bgt-leg i{width:12px;height:12px;border-radius:4px;flex:none}" +
      ".bgt-leg span{margin-left:auto;font-weight:800;font-variant-numeric:tabular-nums}" +
      ".bgt-row{display:flex;gap:8px;align-items:center;padding:10px 0;border-bottom:1px solid var(--line)}" +
      ".bgt-row:last-of-type{border-bottom:0}" +
      ".bgt-row .nm{flex:1;min-width:0;font-weight:600;font-size:calc(13.5px*var(--ts,1));overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
      ".bgt-row .amt{font-weight:800;font-variant-numeric:tabular-nums;font-size:calc(13.5px*var(--ts,1))}" +
      ".bgt-tag{font-size:calc(10.5px*var(--ts,1));font-weight:800;border-radius:999px;padding:3px 8px;flex:none}" +
      ".bgt-tag.need{background:rgba(245,158,11,.18);color:#f59e0b}" +
      ".bgt-tag.want{background:rgba(139,92,246,.18);color:#a78bfa}" +
      ".bgt-del{border:0;background:rgba(127,127,127,.2);color:inherit;border-radius:50%;width:28px;height:28px;flex:none;cursor:pointer;font-size:calc(13px*var(--ts,1))}" +
      ".bgt-add{display:flex;gap:8px;margin-top:10px}" +
      ".bgt-add input{min-width:0;background:rgba(127,127,127,.12);border:1px solid var(--line);color:inherit;border-radius:12px;padding:10px;font-size:calc(14px*var(--ts,1))}" +
      ".bgt-add input.nm{flex:1}" +
      ".bgt-add input.amt{flex:0 0 84px}" +
      ".bgt-btn{border:0;border-radius:12px;padding:10px 14px;font-weight:800;font-size:calc(14px*var(--ts,1));background:linear-gradient(135deg,#34d399,#10b981);color:#04160a;cursor:pointer;flex:none;box-shadow:0 4px 14px rgba(52,211,153,.35)}" +
      ".bgt-btn:active{transform:scale(.95)}" +
      ".bgt-kind{display:flex;gap:6px;margin-top:8px}" +
      ".bgt-kind button{border:1.5px solid var(--line);background:transparent;color:inherit;border-radius:999px;padding:7px 12px;font-size:calc(12px*var(--ts,1));font-weight:700;cursor:pointer}" +
      ".bgt-kind button.on-n{background:#f59e0b;border-color:#f59e0b;color:#1a1005}" +
      ".bgt-kind button.on-w{background:#8b5cf6;border-color:#8b5cf6;color:#fff}" +
      ".bgt-tip{border-radius:14px;padding:11px 13px;font-size:calc(13px*var(--ts,1));margin-top:12px;line-height:1.55;background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.32)}" +
      ".bgt-tip.warn{background:rgba(251,191,36,.12);border-color:rgba(251,191,36,.4)}" +
      ".bgt-tip.good{background:rgba(52,211,153,.12);border-color:rgba(52,211,153,.4)}" +
      ".bgt-bank{margin-top:12px;border-radius:16px;padding:14px;background:linear-gradient(135deg,rgba(79,70,229,.18),rgba(124,58,237,.12));border:1px solid rgba(129,140,248,.4)}" +
      ".bgt-bank b{display:block;font-size:calc(14px*var(--ts,1));margin-bottom:4px}" +
      ".bgt-bank p{margin:0 0 10px;font-size:calc(12.5px*var(--ts,1));color:var(--mut);line-height:1.5}" +
      ".bgt-bank button{border:0;border-radius:12px;padding:10px 14px;font-weight:800;background:linear-gradient(135deg,#818cf8,#6366f1);color:#fff;cursor:pointer}" +
      ".bgt-empty{text-align:center;padding:18px 10px;color:var(--mut);font-size:calc(13px*var(--ts,1));line-height:1.6}" +
      ".bgt-empty .big{font-size:calc(34px*var(--ts,1));margin-bottom:6px}" +
      ".lsn{border:1px solid var(--line);border-radius:18px;background:var(--card);margin:0 16px 10px;overflow:hidden;box-shadow:var(--sh1)}" +
      ".lsn-head{display:flex;gap:12px;align-items:center;padding:14px;width:100%;background:none;border:0;color:inherit;text-align:left;cursor:pointer}" +
      ".lsn-ic{width:42px;height:42px;border-radius:13px;flex:none;display:flex;align-items:center;justify-content:center;font-size:calc(21px*var(--ts,1));background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff;box-shadow:0 4px 12px rgba(239,68,68,.3)}" +
      ".lsn-head b{flex:1;font-size:calc(14px*var(--ts,1));line-height:1.35}" +
      ".lsn-state{flex:none;font-size:calc(12px*var(--ts,1));font-weight:800;color:var(--mut)}" +
      ".lsn.learned .lsn-state{color:#34d399}" +
      ".lsn-body{display:none;padding:0 14px 14px}" +
      ".lsn.open .lsn-body{display:block}" +
      ".lsn-body p{color:var(--mut);font-size:calc(13.5px*var(--ts,1));line-height:1.6;margin:0 0 9px}" +
      ".lsn-try{background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.3);border-radius:12px;padding:10px 12px;font-size:calc(13px*var(--ts,1));margin:10px 0;line-height:1.55}" +
      ".lsn-done{border:0;border-radius:12px;padding:11px;font-weight:800;width:100%;font-size:calc(13.5px*var(--ts,1));cursor:pointer;background:linear-gradient(135deg,#34d399,#10b981);color:#04160a}" +
      ".lsn.learned .lsn-done{background:rgba(127,127,127,.2);color:inherit}" +
      ".goal{border:1px solid var(--line);border-radius:18px;background:var(--card);margin:0 16px 10px;padding:14px;box-shadow:var(--sh1)}" +
      ".goal-top{display:flex;align-items:baseline;gap:8px;margin-bottom:8px}" +
      ".goal-top b{flex:1;font-size:calc(14.5px*var(--ts,1))}" +
      ".goal-top span{font-size:calc(13px*var(--ts,1));color:var(--mut);font-variant-numeric:tabular-nums}" +
      ".goal-bar{height:12px;background:rgba(127,127,127,.18);border-radius:7px;overflow:hidden;margin-bottom:10px}" +
      ".goal-fill{height:100%;background:linear-gradient(90deg,#f59e0b,#ef4444);border-radius:7px;transition:width .6s ease}" +
      ".goal.done .goal-fill{background:linear-gradient(90deg,#34d399,#10b981)}" +
      ".goal-add{display:flex;gap:8px;align-items:center}" +
      ".goal-add input{flex:1;min-width:0;background:rgba(127,127,127,.12);border:1px solid var(--line);color:inherit;border-radius:12px;padding:9px 10px;font-size:calc(14px*var(--ts,1))}" +
      ".pp-todos{margin-top:4px}" +
      ".pp-xp{margin-top:10px;position:relative;z-index:1}" +
      ".pp-xp-top{display:flex;justify-content:space-between;font-size:calc(12px*var(--ts,1));font-weight:800;opacity:.95;margin-bottom:5px}" +
      ".pp-xpbar{height:8px;border-radius:5px;background:rgba(255,255,255,.25);overflow:hidden}" +
      ".pp-xpbar div{height:100%;border-radius:5px;background:linear-gradient(90deg,#fde68a,#f59e0b);transition:width .8s ease}" +
      ".bdg-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:0 16px 4px}" +
      ".bdg{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:10px 4px;text-align:center;opacity:.45;filter:grayscale(1)}" +
      ".bdg.got{opacity:1;filter:none;border-color:rgba(245,158,11,.5);box-shadow:0 4px 14px rgba(245,158,11,.18)}" +
      ".bdg-ic{font-size:calc(26px*var(--ts,1))}" +
      ".bdg-nm{font-size:calc(10.5px*var(--ts,1));font-weight:700;margin-top:4px;line-height:1.25;color:var(--mut)}" +
      ".bdg.got .bdg-nm{color:var(--txt)}" +
      ".lvlup{position:fixed;inset:0;z-index:10002;display:none;align-items:center;justify-content:center;background:rgba(4,6,12,.7)}" +
      ".lvlup.show{display:flex}" +
      ".lvlup-card{text-align:center;background:linear-gradient(160deg,#1e1b4b,#4c1d95);border:1px solid rgba(167,139,250,.5);border-radius:28px;padding:36px 32px;margin:0 32px;color:#fff;box-shadow:0 24px 70px rgba(124,58,237,.55);animation:lvlpop .45s cubic-bezier(.2,1.4,.4,1)}" +
      "@keyframes lvlpop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}" +
      ".lvlup-badge{font-size:calc(64px*var(--ts,1));animation:lvlshine 1.2s ease infinite}" +
      "@keyframes lvlshine{0%,100%{transform:scale(1) rotate(-4deg)}50%{transform:scale(1.12) rotate(4deg)}}" +
      ".lvlup-t{font-size:calc(26px*var(--ts,1));font-weight:800;margin-top:8px}" +
      ".lvlup-l{font-size:calc(18px*var(--ts,1));font-weight:800;color:#fde68a;margin-top:4px}" +
      ".lvlup-s{font-size:calc(13.5px*var(--ts,1));opacity:.85;margin:10px 0 18px;line-height:1.5}" +
      ".lvlup-btn{border:0;border-radius:14px;padding:13px 34px;font-weight:800;font-size:calc(15px*var(--ts,1));background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#1a1005;cursor:pointer}" +
      ".ck-card{display:flex;gap:12px;align-items:center;background:linear-gradient(135deg,rgba(249,115,22,.16),rgba(239,68,68,.1));border:1px solid rgba(249,115,22,.4);border-radius:20px;margin:10px 16px 4px;padding:14px;box-shadow:var(--sh1)}" +
      ".ck-flame{font-size:calc(30px*var(--ts,1));flex:none}" +
      ".ck-mid{flex:1;min-width:0}.ck-mid b{font-size:calc(15px*var(--ts,1))}.ck-mid small{display:block;color:var(--mut);font-size:calc(12px*var(--ts,1));margin-top:2px;line-height:1.4}" +
      ".ck-btn{border:0;border-radius:14px;padding:11px 18px;font-weight:800;font-size:calc(13.5px*var(--ts,1));background:linear-gradient(135deg,#fb923c,#ef4444);color:#fff;cursor:pointer;flex:none;box-shadow:0 4px 14px rgba(239,68,68,.4)}" +
      ".ck-btn:active{transform:scale(.95)}" +
      ".ck-done{width:38px;height:38px;flex:none;border-radius:50%;background:linear-gradient(135deg,#34d399,#10b981);color:#fff;display:flex;align-items:center;justify-content:center;font-size:calc(18px*var(--ts,1));font-weight:800}" +
      ".bgt-tag.due{background:rgba(34,211,238,.15);color:#67e8f9}" +
      ".bgt-due{font-size:calc(11.5px*var(--ts,1));font-weight:800;border-radius:999px;padding:4px 10px;background:rgba(127,127,127,.18);flex:none}" +
      ".bgt-due.soon{background:rgba(251,191,36,.2);color:#fbbf24}" +
      ".bgt-due.over{background:rgba(239,68,68,.22);color:#f87171}" +
      ".bgt-add input.due{flex:0 0 70px}";
    document.head.appendChild(c);
  }

  /* ---------------- hero + steps ---------------- */
  function greeting() {
    const h = new Date().getHours();
    return L(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening",
             h < 12 ? "Buenos días" : h < 18 ? "Buenas tardes" : "Buenas noches");
  }
  function heroHtml(done, total, pct) {
    const C = 2 * Math.PI * 44;
    const off = C * (1 - pct / 100);
    const msg = pct >= 100
      ? L("All steps done — you're building something real. 🎉", "Todo listo: estás construyendo algo real. 🎉")
      : pct >= 50
      ? L("Over halfway there. Keep the momentum.", "Más de la mitad. Sigue así.")
      : L("Every step forward counts. Start with one.", "Cada paso cuenta. Empieza con uno.");
    return `<div class="pp-hero"><div class="pp-in">
      <div class="pp-ringwrap"><svg viewBox="0 0 100 100" width="98" height="98">
        <circle class="pp-track" cx="50" cy="50" r="44"></circle>
        <circle class="pp-ring" cx="50" cy="50" r="44" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"></circle>
      </svg><div class="pp-pct">${pct}%</div></div>
      <div><div class="pp-hello">${E(greeting())}</div>
      <div class="pp-title">${E(L("Your comeback plan", "Tu plan de superación"))}</div>
      <div class="pp-sub">${done} / ${total} ${E(L("steps done", "pasos listos"))} · ${E(msg)}</div>
      ${xpBarHtml()}</div>
    </div></div>`;
  }
  function stepsHtml() {
    return PLAN.map((p, i) => {
      const c = state.plan.includes(p.id);
      return `<div class="pp-step${c ? " done" : ""}">
        <div class="pp-num">${i + 1}</div>
        <div class="pp-mid"><div class="pp-t">${E(p.t)}</div><div class="pp-d">${E(p.d)}</div></div>
        ${p.go ? `<button class="pp-go" data-go="${p.id}">${E(L("Find help", "Buscar ayuda"))}</button>` : ""}
        <button class="pp-check" data-p="${p.id}" aria-label="toggle">${c ? "✓" : ""}</button>
      </div>`;
    }).join("");
  }

  /* ---------------- budget builder ---------------- */
  const sumInc = () => budget.income.reduce((a, x) => a + (+x.amt || 0), 0);
  const sumExp = () => budget.expenses.reduce((a, x) => a + (+x.amt || 0), 0);
  const sumNeed = () => budget.expenses.filter(x => x.kind !== "want").reduce((a, x) => a + (+x.amt || 0), 0);
  const sumWant = () => budget.expenses.filter(x => x.kind === "want").reduce((a, x) => a + (+x.amt || 0), 0);

  function donutHtml(need, want, left) {
    const tot = need + want + Math.max(left, 0);
    if (tot <= 0) return "";
    const pn = need / tot * 100, pw = want / tot * 100, pl = Math.max(left, 0) / tot * 100;
    const seg = (frac, off, color, cls) => frac > 0
      ? `<circle class="${cls}" cx="60" cy="60" r="48" fill="none" stroke="${color}" stroke-width="16" pathLength="100" stroke-dasharray="${frac.toFixed(1)} ${(100 - frac).toFixed(1)}" stroke-dashoffset="${(-off).toFixed(1)}" stroke-linecap="butt"></circle>` : "";
    return `<div class="bgt-donutwrap">
      <div class="bgt-donut"><svg viewBox="0 0 120 120" width="110" height="110">
        <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(127,127,127,.18)" stroke-width="16"></circle>
        ${seg(pn, 25, "#f59e0b", "")}${seg(pw, 25 + pn, "#8b5cf6", "")}${seg(pl, 25 + pn + pw, "#34d399", "")}
      </svg></div>
      <div class="bgt-leg">
        <div><i style="background:#f59e0b"></i>${E(L("Needs", "Necesidades"))}<span>${money(need)}</span></div>
        <div><i style="background:#8b5cf6"></i>${E(L("Wants", "Deseos"))}<span>${money(want)}</span></div>
        <div><i style="background:#34d399"></i>${E(L("Left over", "Sobrante"))}<span>${money(Math.max(left, 0))}</span></div>
      </div></div>`;
  }
  function insightHtml(inc, exp, left) {
    let cls = "", txt;
    if (inc <= 0) { txt = L("Add your monthly income above to see your full picture.", "Agrega tu ingreso mensual arriba para ver el panorama completo."); }
    else if (left < 0) { cls = "warn"; txt = L(`You're planning to spend ${money(-left)} more than you earn. Look at your Wants — what can wait until next month?`, `Planeas gastar ${money(-left)} más de lo que ganas. Mira tus Deseos: ¿qué puede esperar al próximo mes?`); }
    else if (left / inc >= 0.2) { cls = "good"; txt = L(`You're setting aside ${Math.round(left / inc * 100)}% — that's the dream zone. Future you says thanks.`, `Estás apartando el ${Math.round(left / inc * 100)}%: esa es la zona ideal. Tu yo del futuro te lo agradece.`); }
    else { txt = L("Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings. On a tight budget, even 80/10/10 moves you forward.", "Prueba la regla 50/30/20: 50% necesidades, 30% deseos, 20% ahorros. Con poco presupuesto, hasta 80/10/10 te hace avanzar."); }
    return `<div class="bgt-tip ${cls}">${E(txt)}</div>`;
  }
  function listHtml(items, isExp) {
    if (!items.length) return `<div class="bgt-empty"><div class="big">${isExp ? "🧾" : "💵"}</div>${E(L("Nothing here yet — add your first one below.", "Nada aquí todavía: agrega el primero abajo."))}</div>`;
    return items.map(x => `<div class="bgt-row" data-bid="${x.id}">
      <div class="nm">${E(x.name)}</div>
      ${isExp ? `<span class="bgt-tag ${x.kind === "want" ? "want" : "need"}">${x.kind === "want" ? E(L("Want", "Deseo")) : E(L("Need", "Necesidad"))}</span>` : ""}
      ${isExp && x.due >= 1 && x.due <= 31 ? `<span class="bgt-tag due">📅 ${x.due}</span>` : ""}
      <div class="amt">${money(x.amt)}</div>
      <button class="bgt-del" data-bdel="${x.id}" aria-label="delete">✕</button>
    </div>`).join("");
  }
  function panelBudget() {
    const inc = sumInc(), exp = sumExp(), left = inc - exp;
    return `<div class="bgt-card"><h4>📊 ${E(L("Your monthly picture", "Tu panorama mensual"))}</h4>
      <div class="bgt-left"><b style="color:${left < 0 ? "#f87171" : "#34d399"}">${left < 0 ? "−" : ""}${money(Math.abs(left))}</b>
      <small>${E(L("left over each month", "sobrante cada mes"))}</small></div>
      <div class="bgt-stats">
        <div class="bgt-stat"><b style="color:#34d399">${money(inc)}</b><small>${E(L("Income", "Ingresos"))}</small></div>
        <div class="bgt-stat"><b style="color:#f59e0b">${money(exp)}</b><small>${E(L("Planned spending", "Gasto planeado"))}</small></div>
      </div>
      ${donutHtml(sumNeed(), sumWant(), left)}
      ${insightHtml(inc, exp, left)}
    </div>
    <div class="bgt-card"><h4>💵 ${E(L("Income", "Ingresos"))}</h4>
      ${listHtml(budget.income, false)}
      <div class="bgt-add"><input class="nm" id="bIncName" placeholder="${E(L("Name — e.g. Day labor, SNAP, SSI", "Nombre — ej. trabajo por día, SNAP, SSI"))}" maxlength="40">
      <input class="amt" id="bIncAmt" inputmode="decimal" placeholder="${E(L("Amount", "Cantidad"))}">
      <button class="bgt-btn" id="bIncAdd">${E(L("Add", "Agregar"))}</button></div>
    </div>
    <div class="bgt-card"><h4>🧾 ${E(L("Planned spending", "Gasto planeado"))}</h4>
      ${listHtml(budget.expenses, true)}
      <div class="bgt-add"><input class="nm" id="bExpName" placeholder="${E(L("Name — e.g. Rent, Food, Bus fare", "Nombre — ej. renta, comida, pasaje"))}" maxlength="40">
      <input class="amt" id="bExpAmt" inputmode="decimal" placeholder="${E(L("Amount", "Cantidad"))}">
      <input class="due" id="bExpDue" inputmode="numeric" placeholder="${E(L("Due", "Día"))}" maxlength="2" title="${E(L("Day of month due (optional)", "Día del mes de vencimiento (opcional)"))}">
      <button class="bgt-btn" id="bExpAdd">${E(L("Add", "Agregar"))}</button></div>
      <div class="bgt-kind" id="bExpKind">
        <button data-k="need" class="on-n">${E(L("Need", "Necesidad"))}</button>
        <button data-k="want">${E(L("Want", "Deseo"))}</button>
      </div>
    </div>
    ${billsHtml()}
    <div class="bgt-card bgt-bank" style="margin-left:16px;margin-right:16px"><b>🏦 ${E(L("No bank account?", "¿Sin cuenta bancaria?"))}</b>
      <p>${E(L("Stashing cash under the mattress loses to inflation and temptation. These Fort Wayne banks offer free checking with $0 monthly fees — some let you open with $0.", "Guardar efectivo bajo el colchón pierde contra la inflación y la tentación. Estos bancos de Fort Wayne ofrecen cheques gratis sin cargos mensuales; algunos te dejan abrir con $0."))}</p>
      <button id="bBankGo">${E(L("See free banking options", "Ver opciones de banca gratis"))}</button>
    </div>`;
  }

  /* ---------------- learn panel ---------------- */
  function panelLearn() {
    const n = blessons.length;
    return `<div class="bgt-card"><h4>🎓 ${E(L("Budgeting school", "Escuela de presupuesto"))}</h4>
      <div class="bgt-sub" style="color:var(--mut);font-size:calc(13px*var(--ts,1));line-height:1.55">${E(L("Five short lessons that teach you to run your money instead of chasing it.", "Cinco lecciones cortas que te enseñan a manejar tu dinero en vez de perseguirlo."))}</div>
      <div style="margin-top:8px;font-weight:800;font-size:calc(13px*var(--ts,1))">${n} / ${LESSONS.length} ${E(L("lessons learned", "lecciones aprendidas"))}</div>
      <div class="goal-bar" style="margin-top:8px"><div class="goal-fill" style="width:${Math.round(n / LESSONS.length * 100)}%;background:linear-gradient(90deg,#818cf8,#22d3ee)"></div></div>
    </div>` +
    LESSONS.map(ls => {
      const learned = blessons.includes(ls.id);
      return `<div class="lsn${learned ? " learned" : ""}" data-lsn="${ls.id}">
        <button class="lsn-head"><div class="lsn-ic">${ls.icon}</div><b>${E(ls.t)}</b>
        <span class="lsn-state">${learned ? "✓ " + E(L("Learned", "Aprendido")) : "›"}</span></button>
        <div class="lsn-body">${ls.body.map(p => `<p>${E(p)}</p>`).join("")}
          <div class="lsn-try"><b>${E(L("Try this:", "Prueba esto:"))}</b> ${E(ls.tryIt)}</div>
          <button class="lsn-done" data-ldone="${ls.id}">${learned ? E(L("Learned ✓ — tap to unmark", "Aprendido ✓ — toca para desmarcar")) : E(L("Mark as learned", "Marcar como aprendido"))}</button>
        </div></div>`;
    }).join("");
  }

  /* ---------------- goals panel ---------------- */
  function panelGoals() {
    return `<div class="bgt-card"><h4>🎯 ${E(L("Savings goals", "Metas de ahorro"))}</h4>
      <div style="color:var(--mut);font-size:calc(13px*var(--ts,1));line-height:1.55;margin-bottom:6px">${E(L("Name it, set a number, feed it a little at a time. Small deposits beat big intentions.", "Ponle nombre, ponle un número, aliméntala poco a poco. Los depósitos pequeños vencen a las grandes intenciones."))}</div>
      <div class="bgt-add"><input class="nm" id="bGoalName" placeholder="${E(L("Goal name — e.g. $500 cushion", "Nombre — ej. colchón de $500"))}" maxlength="40">
      <input class="amt" id="bGoalTgt" inputmode="decimal" placeholder="${E(L("Target $", "Meta $"))}">
      <button class="bgt-btn" id="bGoalAdd">${E(L("Add", "Agregar"))}</button></div>
    </div>` +
    (bgoals.length ? bgoals.map(g => {
      const pct = g.target > 0 ? Math.min(100, Math.round(g.saved / g.target * 100)) : 0;
      const done = g.target > 0 && g.saved >= g.target;
      return `<div class="goal${done ? " done" : ""}" data-gid="${g.id}">
        <div class="goal-top"><b>${E(g.name)} ${done ? "🎉" : ""}</b><span>${money(g.saved)} / ${money(g.target)}</span></div>
        <div class="goal-bar"><div class="goal-fill" style="width:${pct}%"></div></div>
        <div class="goal-add"><input inputmode="decimal" id="ga-${g.id}" placeholder="${E(L("Add $", "Agregar $"))}">
        <button class="bgt-btn" data-gadd="${g.id}">${E(L("Add", "Agregar"))}</button>
        <button class="bgt-del" data-gdel="${g.id}" aria-label="delete">✕</button></div>
      </div>`;
    }).join("") : `<div class="bgt-card"><div class="bgt-empty"><div class="big">🎯</div>${E(L("No goals yet — start with a $500 safety cushion.", "Sin metas todavía: empieza con un colchón de $500."))}</div></div>`) +
    challengesHtml();
  }

  function budgetSectionHtml() {
    const tabs = [["budget", "💰", L("Budget", "Presupuesto")], ["learn", "🎓", L("Learn", "Aprender")], ["goals", "🎯", L("Goals", "Metas")], ["debts", "💳", L("Debts", "Deudas")]];
    return `<div class="pp-sec"><div class="bar"></div><h3>${E(L("Budget Studio", "Estudio de presupuesto"))}</h3></div>
    <div class="bgt-pills">${tabs.map(([id, ic, lb]) => `<button class="bgt-pill${btab === id ? " on" : ""}" data-btab="${id}">${ic} ${E(lb)}</button>`).join("")}</div>
    <div id="bgtPanel">${btab === "budget" ? panelBudget() : btab === "learn" ? panelLearn() : btab === "debts" ? panelDebts() : panelGoals()}</div>`;
  }

  /* after any budget change: maybe award builder XP, check badges, re-render */
  function budgetXpRefresh() {
    let res = null;
    if (budget.income.length && budget.expenses.length) res = grantXp("budget:built", XP_BUDGET);
    checkBadges(); renderPlan();
    if (res && res.ups.length) setTimeout(() => showLevelUp(res.ups[res.ups.length - 1]), 400);
  }
  /* ---------------- wiring ---------------- */
  function numVal(id) {
    const el = document.getElementById(id);
    const v = parseFloat(String(el && el.value || "").replace(/[^0-9.]/g, ""));
    return isNaN(v) || v < 0 ? 0 : Math.round(v * 100) / 100;
  }
  function wireBudget(el) {
    el.querySelectorAll("[data-btab]").forEach(b => b.addEventListener("click", () => { btab = b.dataset.btab; renderPlan(); }));
    // income
    const ia = el.querySelector("#bIncAdd");
    if (ia) ia.addEventListener("click", () => {
      const nm = (el.querySelector("#bIncName").value || "").trim(), amt = numVal("bIncAmt");
      if (!nm || amt <= 0) return;
      budget.income.push({ id: uid(), name: nm, amt }); saveBudget(); budgetXpRefresh();
    });
    // expenses
    let expKind = "need";
    el.querySelectorAll("#bExpKind button").forEach(b => b.addEventListener("click", () => {
      expKind = b.dataset.k;
      el.querySelectorAll("#bExpKind button").forEach(x => x.classList.remove("on-n", "on-w"));
      b.classList.add(expKind === "need" ? "on-n" : "on-w");
    }));
    const xa = el.querySelector("#bExpAdd");
    if (xa) xa.addEventListener("click", () => {
      const nm = (el.querySelector("#bExpName").value || "").trim(), amt = numVal("bExpAmt");
      if (!nm || amt <= 0) return;
      let due = parseInt(String(el.querySelector("#bExpDue").value || "").replace(/\D/g, ""), 10);
      if (!(due >= 1 && due <= 31)) due = 0;
      budget.expenses.push({ id: uid(), name: nm, amt, kind: expKind, due }); saveBudget(); budgetXpRefresh();
    });
    // deletes
    el.querySelectorAll("[data-bdel]").forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.bdel;
      budget.income = budget.income.filter(x => x.id !== id);
      budget.expenses = budget.expenses.filter(x => x.id !== id);
      saveBudget(); renderPlan();
    }));
    // banking guide
    const bg = el.querySelector("#bBankGo");
    if (bg) bg.addEventListener("click", () => { try { openGuideCard("banking"); } catch (e) {} });
    // daily check-in
    const ck = el.querySelector("#ckBtn");
    if (ck) ck.addEventListener("click", () => {
      const res = doCheckin();
      checkBadges(); renderPlan();
      if (res && res.ups.length) setTimeout(() => showLevelUp(res.ups[res.ups.length - 1]), 400);
    });
    // debts
    const dadd = el.querySelector("#bDebtAdd");
    if (dadd) dadd.addEventListener("click", () => {
      const nm = (el.querySelector("#bDebtName").value || "").trim(), owed = numVal("bDebtOwed");
      if (!nm || owed <= 0) return;
      debts.push({ id: uid(), name: nm, owed, start: owed }); saveDebts(); checkBadges(); renderPlan();
    });
    el.querySelectorAll("[data-dpay]").forEach(b => b.addEventListener("click", () => {
      const g = debts.find(x => x.id === b.dataset.dpay), v = numVal("da-" + b.dataset.dpay);
      if (!g || v <= 0) return;
      const wasDone = g.owed <= 0;
      g.owed = Math.round((g.owed - v) * 100) / 100; saveDebts();
      const res = (!wasDone && g.owed <= 0) ? grantXp("debt:clear:" + g.id, 100) : null;
      checkBadges(); renderPlan();
      if (res && res.ups.length) setTimeout(() => showLevelUp(res.ups[res.ups.length - 1]), 400);
    }));
    el.querySelectorAll("[data-ddel]").forEach(b => b.addEventListener("click", () => {
      debts = debts.filter(x => x.id !== b.dataset.ddel); saveDebts(); renderPlan();
    }));
    // challenges
    el.querySelectorAll("[data-chstart]").forEach(b => b.addEventListener("click", () => {
      const t = CHALLENGES.find(x => x.id === b.dataset.chstart); if (!t) return;
      const now = Date.now();
      challenges.push({ id: uid(), tpl: t.id, start: now, end: now + t.days * 86400000, done: false });
      saveChallenges(); renderPlan();
    }));
    el.querySelectorAll("[data-chfin]").forEach(b => b.addEventListener("click", () => {
      const c = challenges.find(x => x.id === b.dataset.chfin); if (!c || c.done || Date.now() < c.end) return;
      const t = CHALLENGES.find(x => x.id === c.tpl);
      c.done = true; saveChallenges();
      const res = grantXp("challenge:" + c.id, t ? t.xp : 50);
      checkBadges(); renderPlan();
      if (res && res.ups.length) setTimeout(() => showLevelUp(res.ups[res.ups.length - 1]), 400);
    }));
    // lessons
    el.querySelectorAll(".lsn-head").forEach(h => h.addEventListener("click", () => h.closest(".lsn").classList.toggle("open")));
    el.querySelectorAll("[data-ldone]").forEach(b => b.addEventListener("click", e => {
      e.stopPropagation();
      const id = b.dataset.ldone, i = blessons.indexOf(id);
      let res = null;
      if (i >= 0) blessons.splice(i, 1); else { blessons.push(id); res = grantXp("lesson:" + id, XP_LESSON); }
      saveLessons(); checkBadges(); renderPlan();
      if (res && res.ups.length) setTimeout(() => showLevelUp(res.ups[res.ups.length - 1]), 400);
      setTimeout(() => { const c = document.querySelector(`.lsn[data-lsn="${id}"]`); if (c) c.classList.add("open"); }, 60);
    }));
    // goals
    const gadd = el.querySelector("#bGoalAdd");
    if (gadd) gadd.addEventListener("click", () => {
      const nm = (el.querySelector("#bGoalName").value || "").trim(), tgt = numVal("bGoalTgt");
      if (!nm || tgt <= 0) return;
      const first = bgoals.length === 0;
      bgoals.push({ id: uid(), name: nm, target: tgt, saved: 0 }); saveGoals();
      let res = first ? grantXp("goal:first", XP_GOAL) : null;
      checkBadges(); renderPlan();
      if (res && res.ups.length) setTimeout(() => showLevelUp(res.ups[res.ups.length - 1]), 400);
    });
    el.querySelectorAll("[data-gadd]").forEach(b => b.addEventListener("click", () => {
      const g = bgoals.find(x => x.id === b.dataset.gadd), v = numVal("ga-" + b.dataset.gadd);
      if (!g || v <= 0) return;
      const wasDone = g.target > 0 && g.saved >= g.target;
      g.saved = Math.round((g.saved + v) * 100) / 100; saveGoals();
      let res = (!wasDone && g.target > 0 && g.saved >= g.target) ? grantXp("goal:done:" + g.id, XP_CUSHION) : null;
      checkBadges(); renderPlan();
      if (res && res.ups.length) setTimeout(() => showLevelUp(res.ups[res.ups.length - 1]), 400);
    }));
    el.querySelectorAll("[data-gdel]").forEach(b => b.addEventListener("click", () => {
      bgoals = bgoals.filter(x => x.id !== b.dataset.gdel); saveGoals(); renderPlan();
    }));
  }

  /* ---------------- premium plan render (replaces app.js renderPlan) ---------------- */
  function renderPlanPremium() {
    const el = document.getElementById("planList"); if (!el || typeof PLAN === "undefined") return;
    // to-do completions grant XP (once each) — diffed here so no app.js changes are needed
    let pendingUps = [];
    try {
      (state.todos || []).forEach(td => {
        if (td.done) { const r = grantXp("todo:" + td.id, XP_TODO); if (r && r.ups.length) pendingUps = pendingUps.concat(r.ups); }
      });
    } catch (e) {}
    checkBadges();
    const done = state.plan.length, total = PLAN.length;
    const pct = total ? Math.round(done / total * 100) : 0;
    el.innerHTML =
      heroHtml(done, total, pct) +
      checkinHtml() +
      `<div class="pp-sec"><div class="bar"></div><h3>${E(L("My comeback steps", "Mis pasos de superación"))}</h3><span class="cnt">${done}/${total}</span></div>` +
      stepsHtml() +
      badgesHtml() +
      budgetSectionHtml() +
      `<div class="pp-sec"><div class="bar"></div><h3>${E(L("To-do list", "Lista de tareas"))}</h3></div><div class="pp-todos"></div>`;
    el.querySelector(".pp-todos").innerHTML = renderTodos();
    wireTodos(el);
    wireBudget(el);
    el.querySelectorAll(".pp-check").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); togglePlan(b.dataset.p); }));
    el.querySelectorAll(".pp-go").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); planGo(b.dataset.go); }));
    try { scheduleBillReminders(); } catch (e) {}
    if (pendingUps.length) setTimeout(() => showLevelUp(pendingUps[pendingUps.length - 1]), 400);
  }

  /* ---------------- boot ---------------- */
  function boot() {
    if (typeof renderPlan === "undefined" || typeof PLAN === "undefined" || typeof renderTodos === "undefined") { setTimeout(boot, 250); return; }
    injectCss();
    try { renderPlan = renderPlanPremium; } catch (e) {}
    try {
      if (typeof togglePlan !== "undefined" && !togglePlan._xpWrapped) {
        const _tp = togglePlan;
        const wrapped = function (id) {
          const was = state.plan.includes(id);
          let res = null;
          if (!was) res = grantXp("step:" + id, XP_STEP);
          _tp(id);
          if (!was) { checkBadges(); if (res && res.ups.length) setTimeout(() => showLevelUp(res.ups[res.ups.length - 1]), 450); }
        };
        wrapped._xpWrapped = true;
        togglePlan = wrapped;
      }
    } catch (e) {}
    try {
      if (typeof voteVerify !== "undefined" && !voteVerify._xpWrapped) {
        const _vv = voteVerify;
        const wrappedV = function (id, which) {
          const before = getVerify(id).mine;
          _vv(id, which);
          if (!before && getVerify(id).mine) {
            const res = grantXp("verify:" + id, 15);
            checkBadges();
            try { toast("+15 XP · " + L("thanks for verifying!", "¡gracias por verificar!")); } catch (e) {}
            if (res && res.ups.length) setTimeout(() => showLevelUp(res.ups[res.ups.length - 1]), 450);
          }
        };
        wrappedV._xpWrapped = true;
        voteVerify = wrappedV;
      }
    } catch (e) {}
    try { if (typeof state !== "undefined" && state.tab === "plan") renderPlan(); } catch (e) {}
  }
  if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", boot); else boot();

  /* ---------------- XP, levels, badges ---------------- */
  const XP_STEP = 50, XP_LESSON = 25, XP_TODO = 10, XP_BUDGET = 30, XP_GOAL = 20, XP_CUSHION = 100;
  const xpForLevel = l => 50 * (l - 1) * l;   // total XP needed to REACH level l
  function levelForXp(xp) { let l = 1; while (xp >= xpForLevel(l + 1)) l++; return l; }
  function xpLoad() { const d = store.get("haven_xp_v1", null); return d && typeof d.xp === "number" ? d : { xp: 0, badges: [], events: {} }; }
  function xpSave(d) { store.set("haven_xp_v1", d); }

  const BADGES = [
    { id: "bd-first-step", icon: "👣", n: () => L("First Step", "Primer paso"), d: () => L("Complete your first comeback step", "Completa tu primer paso de superación"), when: () => state.plan.length >= 1 },
    { id: "bd-halfway", icon: "💪", n: () => L("Halfway Hero", "Héroe a la mitad"), d: () => L("Complete 4 comeback steps", "Completa 4 pasos de superación"), when: () => state.plan.length >= 4 },
    { id: "bd-comeback", icon: "🏆", n: () => L("Comeback Complete", "Superación completa"), d: () => L("Finish all comeback steps", "Termina todos los pasos de superación"), when: () => typeof PLAN !== "undefined" && state.plan.length >= PLAN.length },
    { id: "bd-budget", icon: "💰", n: () => L("Budget Builder", "Constructor de presupuesto"), d: () => L("Log income and spending in your budget", "Registra ingresos y gastos en tu presupuesto"), when: () => budget.income.length > 0 && budget.expenses.length > 0 },
    { id: "bd-scholar", icon: "🎓", n: () => L("Budget Scholar", "Estudiante de presupuesto"), d: () => L("Finish all 5 budgeting lessons", "Termina las 5 lecciones de presupuesto"), when: () => blessons.length >= LESSONS.length },
    { id: "bd-saver", icon: "🎯", n: () => L("Goal Setter", "Creador de metas"), d: () => L("Create your first savings goal", "Crea tu primera meta de ahorro"), when: () => bgoals.length >= 1 },
    { id: "bd-cushion", icon: "🛟", n: () => L("Cushion Builder", "Constructor de colchón"), d: () => L("Fully fund a savings goal", "Financia por completo una meta de ahorro"), when: () => bgoals.some(g => g.target > 0 && g.saved >= g.target) },
    { id: "bd-doer", icon: "✅", n: () => L("Doer", "Hacedor"), d: () => L("Complete 5 to-dos", "Completa 5 tareas"), when: () => Object.keys(xpLoad().events).filter(k => k.indexOf("todo:") === 0).length >= 5 },
    { id: "bd-streak7", icon: "🔥", n: () => L("Week Warrior", "Guerrero semanal"), d: () => L("Check in 7 days in a row", "Regístrate 7 días seguidos"), when: () => checkin.streak >= 7 },
    { id: "bd-streak30", icon: "⚡", n: () => L("Unstoppable", "Imparable"), d: () => L("Check in 30 days in a row", "Regístrate 30 días seguidos"), when: () => checkin.streak >= 30 },
    { id: "bd-debtfree", icon: "💥", n: () => L("Debt Destroyer", "Destructor de deudas"), d: () => L("Pay off a debt completely", "Paga por completo una deuda"), when: () => debts.some(g => g.owed <= 0) },
    { id: "bd-challenger", icon: "🎮", n: () => L("Challenger", "Desafiante"), d: () => L("Complete a savings challenge", "Completa un desafío de ahorro"), when: () => challenges.some(c => c.done) },
    { id: "bd-scout", icon: "🔍", n: () => L("Scout", "Explorador"), d: () => L("Verify 5 places", "Verifica 5 lugares"), when: () => Object.keys(xpLoad().events).filter(k => k.indexOf("verify:") === 0).length >= 5 },
    { id: "bd-inspector", icon: "🕵️", n: () => L("Inspector", "Inspector"), d: () => L("Verify 25 places", "Verifica 25 lugares"), when: () => Object.keys(xpLoad().events).filter(k => k.indexOf("verify:") === 0).length >= 25 },
  ];
  for (let _l = 2; _l <= 10; _l++) BADGES.push({ id: "bd-lvl-" + _l, icon: "🎖️", n: () => L("Level " + _l, "Nivel " + _l), d: () => L("Reach level " + _l, "Alcanza el nivel " + _l), when: () => false });

  /* grant XP once per key; returns {ups:[levels], total} or null if already granted */
  function grantXp(key, amount) {
    const d = xpLoad();
    if (d.events[key]) return null;
    d.events[key] = 1;
    const before = levelForXp(d.xp);
    d.xp += amount;
    const after = levelForXp(d.xp);
    const ups = [];
    for (let l = before + 1; l <= after; l++) { ups.push(l); if (!d.badges.includes("bd-lvl-" + l)) d.badges.push("bd-lvl-" + l); }
    xpSave(d);
    return { ups, total: d.xp };
  }
  function checkBadges() {
    const d = xpLoad(); let changed = false;
    BADGES.forEach(b => {
      if (!d.badges.includes(b.id)) {
        let ok = false; try { ok = b.when(); } catch (e) {}
        if (ok) { d.badges.push(b.id); changed = true; try { toast("🏅 " + L("Badge earned: ", "Insignia ganada: ") + b.n()); } catch (e) {} }
      }
    });
    if (changed) xpSave(d);
  }
  function showLevelUp(lvl) {
    let ov = document.getElementById("lvlUp");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "lvlUp"; ov.className = "lvlup";
      ov.innerHTML = `<div class="lvlup-card"><div class="lvlup-badge">🎖️</div>` +
        `<div class="lvlup-t">${E(L("Level up!", "¡Subiste de nivel!"))}</div><div class="lvlup-l"></div>` +
        `<div class="lvlup-s">${E(L("Your comeback is leveling up — keep going.", "Tu superación está subiendo de nivel. Sigue así."))}</div>` +
        `<button class="lvlup-btn">${E(L("Let's go", "Vamos"))}</button></div>`;
      ov.addEventListener("click", () => ov.classList.remove("show"));
      document.body.appendChild(ov);
    }
    ov.querySelector(".lvlup-l").textContent = L("Level ", "Nivel ") + lvl;
    ov.classList.remove("show"); void ov.offsetWidth; ov.classList.add("show");
  }
  function xpBarHtml() {
    const d = xpLoad(), lvl = levelForXp(d.xp);
    const cur = xpForLevel(lvl), next = xpForLevel(lvl + 1);
    const pct = Math.min(100, Math.round((d.xp - cur) / (next - cur) * 100));
    return `<div class="pp-xp"><div class="pp-xp-top"><span>⭐ ${E(L("Level", "Nivel"))} ${lvl}</span><span>${d.xp} / ${next} XP</span></div><div class="pp-xpbar"><div style="width:${pct}%"></div></div></div>`;
  }
  function badgesHtml() {
    const d = xpLoad();
    const cards = BADGES.map(b => {
      const got = d.badges.includes(b.id);
      return `<div class="bdg${got ? " got" : ""}" title="${E(b.d())}"><div class="bdg-ic">${got ? b.icon : "🔒"}</div><div class="bdg-nm">${E(b.n())}</div></div>`;
    }).join("");
    return `<div class="pp-sec"><div class="bar"></div><h3>🏅 ${E(L("Badges", "Insignias"))}</h3><span class="cnt">${d.badges.length}/${BADGES.length}</span></div><div class="bdg-grid">${cards}</div>`;
  }

  /* ---------------- daily check-in streak ---------------- */
  const dayStr = (d) => d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  function checkinState() {
    const today = dayStr(new Date());
    if (checkin.last === today) return { done: true, streak: checkin.streak };
    const y = new Date(); y.setDate(y.getDate() - 1);
    return { done: false, streak: checkin.last === dayStr(y) ? checkin.streak : 0 };
  }
  function doCheckin() {
    const st = checkinState();
    if (st.done) return null;
    const today = dayStr(new Date());
    checkin.streak = st.streak + 1;
    checkin.last = today;
    saveCheckin();
    return grantXp("checkin:" + today, 5);
  }
  function checkinHtml() {
    const st = checkinState();
    return `<div class="ck-card"><div class="ck-flame">🔥</div><div class="ck-mid">
      <b>${st.streak} ${E(L("day streak", "días seguidos"))}</b>
      <small>${st.done ? E(L("Checked in today — see you tomorrow.", "Registro de hoy listo. Nos vemos mañana.")) : E(L("One tap: did you move forward today?", "Un toque: ¿avanzaste hoy?"))}</small></div>
      ${st.done ? `<div class="ck-done">✓</div>` : `<button class="ck-btn" id="ckBtn">${E(L("Check in", "Registrar"))}</button>`}
    </div>`;
  }

  /* ---------------- bills: due dates + reminders ---------------- */
  function nextDue(dueDay) {
    const now = new Date();
    let d = new Date(now.getFullYear(), now.getMonth(), dueDay, 9, 0, 0);
    if (d <= now) d = new Date(now.getFullYear(), now.getMonth() + 1, dueDay, 9, 0, 0);
    return d;
  }
  function billsHtml() {
    const withDue = budget.expenses.filter(x => x.due >= 1 && x.due <= 31);
    if (!withDue.length) return "";
    const now = new Date();
    const rows = withDue.map(x => ({ x, d: nextDue(x.due) })).sort((a, b) => a.d - b.d);
    return `<div class="bgt-card"><h4>📅 ${E(L("Upcoming bills", "Próximas cuentas"))}</h4>` +
      rows.map(({ x, d }) => {
        const days = Math.ceil((d - now) / 86400000);
        const lbl = days <= 0 ? E(L("Due today!", "¡Vence hoy!")) : days === 1 ? E(L("Due tomorrow", "Vence mañana")) : E(L("Due in {n} days", "Vence en {n} días")).replace("{n}", days);
        const cls = days <= 1 ? "over" : days <= 3 ? "soon" : "";
        return `<div class="bgt-row"><div class="nm">${E(x.name)}</div><span class="bgt-due ${cls}">${lbl}</span><div class="amt">${money(x.amt)}</div></div>`;
      }).join("") +
      `<div class="bgt-tip">${E(L("We'll send a phone reminder 2 days before each bill is due.", "Te enviaremos un recordatorio al teléfono 2 días antes de cada vencimiento."))}</div></div>`;
  }
  function scheduleBillReminders() {
    try {
      const b = window.HavenBridge;
      if (!b || typeof b.scheduleReminder !== "function") return;
      if (typeof b.hasNotifPermission === "function" && !b.hasNotifPermission()) { try { b.requestNotifPermission(); } catch (e) {} }
      budget.expenses.forEach(x => {
        if (!(x.due >= 1 && x.due <= 31)) return;
        const d = nextDue(x.due);
        const remindAt = d.getTime() - 2 * 86400000;
        if (remindAt <= Date.now() + 60000) return;
        b.scheduleReminder("bill_" + x.id + "_" + d.getFullYear() + "-" + (d.getMonth() + 1),
          L("Bill due soon", "Cuenta por vencer"),
          x.name + " — " + money(x.amt) + ", " + L("due ", "vence ") + d.toLocaleDateString(),
          remindAt);
      });
    } catch (e) {}
  }

  /* ---------------- debt tracker (snowball) ---------------- */
  function panelDebts() {
    const total = debts.reduce((a, x) => a + Math.max(x.owed, 0), 0);
    const sorted = [...debts].sort((a, b) => a.owed - b.owed);
    return `<div class="bgt-card"><h4>💳 ${E(L("Debt snowball", "Bola de nieve de deudas"))}</h4>
      <div class="bgt-left"><b style="color:#f87171">${money(total)}</b><small>${E(L("total owed", "deuda total"))}</small></div>
      <div class="bgt-tip">${E(L("Pay the minimum on everything, then attack the smallest debt first. Every payoff frees money for the next one.", "Paga el mínimo en todo y ataca primero la deuda más pequeña. Cada deuda eliminada libera dinero para la siguiente."))}</div>
    </div>
    <div class="bgt-card"><h4>➕ ${E(L("Add a debt", "Agregar una deuda"))}</h4>
      <div class="bgt-add"><input class="nm" id="bDebtName" placeholder="${E(L("Name — e.g. Credit card", "Nombre — ej. tarjeta de crédito"))}" maxlength="40">
      <input class="amt" id="bDebtOwed" inputmode="decimal" placeholder="${E(L("Owed $", "Debe $"))}">
      <button class="bgt-btn" id="bDebtAdd">${E(L("Add", "Agregar"))}</button></div>
    </div>` +
    (sorted.length ? sorted.map((g, i) => {
      const done = g.owed <= 0;
      const pct = g.start > 0 ? Math.min(100, Math.round((g.start - Math.max(g.owed, 0)) / g.start * 100)) : 100;
      return `<div class="goal${done ? " done" : ""}">
        <div class="goal-top"><b>${done ? "🎉 " : "#" + (i + 1) + " "}${E(g.name)}</b><span>${money(Math.max(g.owed, 0))} ${E(L("left", "restante"))}</span></div>
        <div class="goal-bar"><div class="goal-fill" style="width:${pct}%"></div></div>
        ${done ? `<div style="font-size:calc(13px*var(--ts,1));font-weight:800;color:#34d399">${E(L("Paid off!", "¡Pagada!"))}</div>` :
        `<div class="goal-add"><input inputmode="decimal" id="da-${g.id}" placeholder="${E(L("Payment $", "Pago $"))}">
        <button class="bgt-btn" data-dpay="${g.id}">${E(L("Pay", "Pagar"))}</button>
        <button class="bgt-del" data-ddel="${g.id}" aria-label="delete">✕</button></div>`}
      </div>`;
    }).join("") : `<div class="bgt-card"><div class="bgt-empty"><div class="big">💳</div>${E(L("No debts tracked. Owing nothing is the goal — keep it that way.", "Sin deudas registradas. No deber nada es la meta."))}</div></div>`);
  }

  /* ---------------- savings challenges ---------------- */
  const CHALLENGES = [
    { id: "ch-nospend", icon: "🚫", days: 2, xp: 40, t: L("No-spend weekend", "Fin de semana sin gastar"), d: L("2 days. Spend $0 on wants — needs only.", "2 días. $0 en deseos, solo necesidades.") },
    { id: "ch-5day", icon: "💵", days: 7, xp: 75, t: L("$5-a-day week", "Semana de $5 al día"), d: L("7 days. Put $5 into savings every day: $35 total.", "7 días. Pon $5 en ahorros cada día: $35 en total.") },
    { id: "ch-noeat", icon: "🍲", days: 7, xp: 75, t: L("No eating out week", "Semana sin comer fuera"), d: L("7 days. Cook or eat free meals only.", "7 días. Solo cocina o comidas gratis.") },
    { id: "ch-roundup", icon: "🪙", days: 7, xp: 50, t: L("Round-up week", "Semana de redondeo"), d: L("7 days. Round every purchase up and save the difference.", "7 días. Redondea cada compra y ahorra la diferencia.") },
  ];
  function challengesHtml() {
    const active = challenges.filter(c => !c.done);
    const avail = CHALLENGES.filter(t => !challenges.some(c => c.tpl === t.id && !c.done));
    let h = `<div class="pp-sec"><div class="bar"></div><h3>⚡ ${E(L("Challenges", "Desafíos"))}</h3></div>`;
    h += active.map(c => {
      const t = CHALLENGES.find(x => x.id === c.tpl); if (!t) return "";
      const dayN = Math.min(t.days, Math.floor((Date.now() - c.start) / 86400000) + 1);
      const canFinish = Date.now() >= c.end;
      return `<div class="goal"><div class="goal-top"><b>${t.icon} ${E(t.t)}</b><span>${E(L("Day", "Día"))} ${dayN} / ${t.days}</span></div>
        <div class="goal-bar"><div class="goal-fill" style="width:${Math.round(dayN / t.days * 100)}%"></div></div>
        <button class="lsn-done" data-chfin="${c.id}"${canFinish ? "" : " disabled style=\"opacity:.5\""}>${canFinish ? E(L("Finish challenge", "Terminar desafío")) + " (+" + t.xp + " XP)" : E(L("Ends ", "Termina ")) + new Date(c.end).toLocaleDateString()}</button>
      </div>`;
    }).join("");
    h += `<div class="bgt-card"><h4>🎮 ${E(L("Start a challenge", "Empezar un desafío"))}</h4>` +
      (avail.length ? avail.map(t => `<div class="bgt-row"><div class="nm">${t.icon} <b>${E(t.t)}</b><br><small style="opacity:.7">${E(t.d)}</small></div><button class="bgt-btn" data-chstart="${t.id}">${E(L("Start", "Empezar"))}</button></div>`).join("")
      : `<div class="bgt-empty">${E(L("All challenges are active or done — finish one to play it again.", "Todos los desafíos están activos o terminados."))}</div>`) + `</div>`;
    return h;
  }

})();



