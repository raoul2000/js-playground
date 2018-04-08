"use strict";

const bob = require('../index');

bob.work('https://www.nytimes.com/', "h1.story-heading > a")
  .then(result => {
    console.log(result.data);
  })
  .catch(err => {
    console.err(err);
  });
