'use strict';
/*
eslint space-before-function-paren:"off"
*/

const cacheName = 'myApp-v2';
const dataCacheName = 'myAppData-v2';

let filesToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/avatar.png',
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log(`[ServiceWorker] Activate - cacheName = ${cacheName}`);
    e.waitUntil(
        caches.keys().then(function (keyList) {
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
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});
