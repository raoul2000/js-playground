"use strict";

const bob = require('../index');

bob.work('https://foundation.nodejs.org/news', {
    "post": {
      "selector": "div.post",
      "type": [{
        "title": '.post-header > h3.title',
        "body" : 'div.excerpt'
      }]
    }
  })
  .then(result => {
    console.log("FROM : https://foundation.nodejs.org/news");
    console.log(`found ${result.data.post.length} news`);
    console.log("-------------------------------------");
    result.data.post.forEach( aPost => {
      console.log(`====== ${aPost.title}`);
      if( aPost.body && aPost.body.length > 0) {
        console.log(`       ${aPost.body}`);
      }
    });
  })
  .catch(err => {
    console.err(err);
  });
