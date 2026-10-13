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
