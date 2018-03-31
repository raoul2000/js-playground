"use strict";

const crawler = require('../../src/crawler');

const TEST_BASE_URL = 'https://foundation.nodejs.org/news';

crawler.start(TEST_BASE_URL, {
    "post": {
      "selector": "div.post",
      "type": [{
        "title": '.post-header > h3.title'
      }]
    }
  })
  .then(result => {
    console.log("FROM : "+TEST_BASE_URL);
    console.log(`found ${result.data.post.length} news`);
    console.log("-------------------------------------");
    result.data.post.forEach( aPost => {
      console.log(aPost.title);
    });
  })
  .catch(err => {
    console.err(err);
  });
