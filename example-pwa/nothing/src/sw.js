const version = "0.0.9m";
const cacheName = `nothing-${version}`;

// download and activate imediately the service worker
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

self.addEventListener("message", event => {
    if (event.data === "skipWaiting") {
        self.skipWaiting();
    }
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
