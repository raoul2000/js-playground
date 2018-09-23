const version = "0.0.10";
const cacheName = `nothing-${version}`;

function sendMessageToClient(client, msg){
    return new Promise(function(resolve, reject){
        var msg_chan = new MessageChannel();

        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };
    });
}

function sendMessageToAllClient(msg){
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            sendMessageToClient(client, msg).then(m => console.log("SW Received Message: "+m));
        })
    })
}

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
    console.log('SW : fetching');
    sendMessageToAllClient("fetch");
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