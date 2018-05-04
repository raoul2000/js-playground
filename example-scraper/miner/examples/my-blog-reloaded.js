"use strict";

/**
 * This example illsutrate a 2 steps data extraction of blog posts. To run it you must
 * first start the test server (npm run server).
 *
 * For more info, see inline comments.
 */

const bob       = require('../index');
const crawler   = require('../src/crawler');
const asyncUtil = require('async');

const TEST_BASE_URL = 'http://127.0.0.1:8080/blog/index.html';

/**
 * Unlike the 'my-blog.js' example, here we are NOT going to extract more than the
 * post page urls from the index. Then in a second step. we will process each page
 * and extract post data.
 * Note that post pages are processed in parallel by Bob... that's how Bob work
 * when you pass an array of URL to work on.
 */
return bob.work(
  TEST_BASE_URL,
  {
    "pages" : {
      "selector" : "ul > li > div.post > div.sub-head > a",
      "type"     : ["@href"]
    }
  })
  .then( result => {
    return bob.work(
      result.data.pages.map(pageRelativeUrl => {  // turn relative URL to absolute URL
        return crawler.normalizeNextUrl(result.source,pageRelativeUrl);
      }),
      {
        "title"    : "h2",
        "sub-head" : "div.sub-head",
        "body"     : "div.body"
      }
    );
  })
  .then( finalResult => {
    console.log(JSON.stringify(finalResult));
  })
  .catch(err => {
    console.err(err);
  });
