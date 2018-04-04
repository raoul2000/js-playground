"use strict";

const crawler = require('../../src/crawler');


crawler.start('https://www.nytimes.com/', "h1.story-heading > a")
  .then(result => {
    console.log(result.data);
  })
  .catch(err => {
    console.err(err);
  });
