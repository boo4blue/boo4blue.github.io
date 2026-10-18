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
