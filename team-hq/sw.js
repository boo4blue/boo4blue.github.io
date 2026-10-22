/* Team HQ shell cache — 202610221904 */
var C = "teamhq-202610221904";
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(C).then(function(c){ return c.add("./index.html"); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k!==C; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  var url = e.request.url;
  if(e.request.method !== "GET") return;
  if(url.indexOf("status.json") >= 0){
    e.respondWith(fetch(e.request).then(function(r){
      var cp = r.clone(); caches.open(C).then(function(c){ c.put(e.request, cp); }); return r;
    }).catch(function(){ return caches.match(e.request); }));
    return;
  }
  if(new URL(url).origin === location.origin){
    e.respondWith(caches.match(e.request).then(function(hit){
      return hit || fetch(e.request).then(function(r){
        var cp = r.clone(); caches.open(C).then(function(c){ c.put(e.request, cp); }); return r;
      }).catch(function(){ return caches.match("./index.html"); });
    }));
  }
});
