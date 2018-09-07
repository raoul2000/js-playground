const version = "0.0.9n";
const cacheName = `nothing-${version}`;

// download service worker but does not activate it immediately 
// The user is prompted when new SW is available
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                `/`,
                `/index.html`,
                `/app.js`,
                '/images/404.png'
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('message', function(event){
    console.log("SW Received Message: " + event.data);
    switch(event.data) {
        case "READ-SW-VERSION":
            event.ports[0].postMessage(version);
        break;
        case "SKIP-WAITING":
            self.skipWaiting();
        break;
        default:
            event.ports[0].postMessage(event.data);
    }
});