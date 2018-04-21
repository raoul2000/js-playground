"use strict";

const bob = require('../index');

bob.work({
    "url": 'https://www.npmjs.com/search?q=crawler&ranking=popularity',
    "nextUrl": {
      "selector": ".search__searchTopbar___2R2Ol .pagination__page___300Ea > a",

      "type": "@href"
    },
    "maxJump": 3
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
    /*
    console.log(`found ${result.data.module.length} modules`);

    console.log("-------------------------------------");
    result.data.module.forEach(aModule => {
      console.log(aModule.name);
    });*/
  })
  .catch(err => {
    console.error(err);
  });
