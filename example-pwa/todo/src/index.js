'use strict';

require('./style.css');
require('./index.html');
var Elm = require('./Main.elm');

Elm.Main.embed(document.getElementById('main'));
