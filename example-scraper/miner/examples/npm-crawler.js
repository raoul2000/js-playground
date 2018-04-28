"use strict";

const bob = require('../index');

bob.work({
    "url": 'https://www.npmjs.com/search?q=crawler&ranking=popularity&page=0&perPage=20',
    "nextUrl": {
      "selector": ".search__searchTopbar___2R2Ol .pagination__page___300Ea:last > a",
      "type": "@href"
    },
    "maxJump": 1
  }, {
    "module": {
      "selector": "section",
      "type": [{
        "name": 'h3',
        "description": "p"
      }]
    }
  })
  .then(result => {
    console.log(JSON.stringify(result));
  })
  .catch(err => {
    console.error(err);
  });
