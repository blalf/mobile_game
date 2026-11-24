const V='0.10.0',C='ivoire-'+V,CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 const put=res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res};
 if(r.mode==='navigate'||r.url.endsWith('.html')||r.url.endsWith('.webmanifest')){e.respondWith(fetch(r,{cache:'no-store'}).then(put).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(put)))});
