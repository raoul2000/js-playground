'use strict';

const cacheName = 'myApp-v3';
const dataCacheName = 'myAppData-v3';
const dataUrl = 'https://randomuser.me/api';
const avatarUrl = 'https://randomuser.me/api/portraits/';

let filesToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/images/avatar.png',
    '/style.css',
];

self.addEventListener('install', (e) => {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then( (cache) => {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log(`[ServiceWorker] Activate - cacheName = ${cacheName}`);
    e.waitUntil(
        caches.keys().then( (keyList) => {
            return Promise.all(keyList.map(function (key) {
                console.log(`key : ${key}`);
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);

    if (e.request.url.startsWith(avatarUrl)) {
        console.log(`[ServiceWorker] avatar req ${e.request.url}`);
        e.respondWith(
            caches.open(dataCacheName).then( (cache) => {
                return cache.match(e.request.url).then( (response) => {
                    if (response) {
                        return response;
                    } else {
                        return fetch(e.request).then(function (response) {
                            cache.put(e.request.url, response.clone());
                            return response;
                        });
                    }
                });
            })
        );
    } else if (e.request.url.startsWith(dataUrl)) {
        /*
         * When the request URL contains dataUrl, the app is asking for fresh
         * data. In this case, the service worker always goes to the
         * network and then caches the response. This is called the "Cache then
         * network" strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
         */
        console.log('[ServiceWorker] data request : network first');
        e.respondWith(
            caches.open(dataCacheName).then( (cache) => {
                return fetch(e.request).then( (response) => {

                    cache.keys().then(function(keys) {
                        console.log(`SW : deleting cache ${dataCacheName} - ${keys.length} keys`);
                        return Promise.all(
                            keys.map( (requestKey) => {
                                console.log(`SW : deleting cache Keu ${requestKey.url}`);
                                return cache.delete(requestKey);
                            })
                        );
                    })
                    .then( () => {
                        console.log(`SW : adding current response to cache`);
                        cache.put(e.request.url, response.clone());
                        return response;
                    });
                });
            })
        );
    } else {
        /*
         * The app is asking for app shell files. In this scenario the app uses the
         * "Cache, falling back to the network" offline strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
         */
        console.log('[ServiceWorker] shell files');
        e.respondWith(
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
    }
});
