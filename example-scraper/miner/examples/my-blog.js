"use strict";

/**
 * This example illsutrate a 2 steps data extraction of blog posts. To run it you must
 * first start the test server (npm run server).
 *
 * For more info, see inline comments
 */

const bob       = require('../index');
const crawler   = require('../src/crawler');
const asyncUtil = require('async');

const TEST_BASE_URL = 'http://127.0.0.1:8080/blog/index.html';

/**
 * This is the first step where Bob will work on the post index pages to extract
 * post title and URL to the post page.
 */
return bob.work(
  TEST_BASE_URL,
  {
    "posts" : {
      "selector" : "ul > li > div.post",
      "type"     : [{
        "title"   : "h2",
        "pageUrl" : {
          "selector" : "a",
          "type"     : "@href"
        }
      }]
    }
  })
  .then( resultHome => {
    /**
     * Now, for each post, Bob is going to work on the page that contains the post
     * in order to extract the content (the post body).
     */
    let tasks = resultHome.data.posts.map( post => {
      return asyncUtil.reflect( (cb) => {
        bob.work(
          crawler.normalizeNextUrl(TEST_BASE_URL,post.pageUrl), // make url absolute
          "div.body"
        )
        .then( resultPost => {
           post.body = resultPost.data; // save thr post body
           cb(null, resultPost);
         })
        .catch(error  => {
          console.error(error);
          cb(error);
        });
      });
    });

    return new Promise( (resolve, reject) => {
      asyncUtil.parallel(tasks, (error , resultAllPost) => {
        if(error) {
          reject(error);
        } else {
          resolve(resultHome);
        }
      });
    });
  })
  .then( finalResult => {
    // the final result contains for each post :
    // - the title
    // - the page url
    // - the body content
    console.log(JSON.stringify(finalResult));
  })
  .catch(err => {
    console.err(err);
  });
