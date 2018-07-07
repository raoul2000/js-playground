'use strict';

require('./style.css');
require('./index.html');

var Elm = require('./Main.elm');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function () { console.log('Service Worker Registered'); });
} else {
    console.warn("service worker not available");
    
}


Elm.Main.embed(document.getElementById('main'));
