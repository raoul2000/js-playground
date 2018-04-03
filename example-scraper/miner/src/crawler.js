"use strict";

const cheerio = require('cheerio');
const request = require('request-promise-native');
const async   = require('async');
const bob     = require('./miner');
var URL     = require('url-parse');

function normalizeNextUrl(baseUrl, nextUrl) {
  let result = new URL(nextUrl, baseUrl);
  return result.href;
}

exports.normalizeNextUrl = normalizeNextUrl;


/**
 * options = {
 *  "name"    : "multi page",
 *  "url"     : 'http://hostname:port/path',
 *  "nextUrl" : {
 *    "selector" : "h1 > div.post > a",
 *    "type"     : "@href"
 *  },
 *  "maxJump"  : 10
 * }
 * @param  {[type]} options        [description]
 * @param  {[type]} extractionPlan [description]
 * @param  {Number} [jumpCount=0]  [description]
 * @return {[type]}                [description]
 */
function crawlUrlMultipage(options, extractionPlan, jumpCount = 0) {
  //console.log("crawling url : "+options.url);
  return request(options.url)
  .then( page => {
    let result = {
      'source' : options.url,
      'data'   : bob.mine(extractionPlan, page)
    };
    //console.log(`jumpCount = ${jumpCount} : result = `,result);
    if( options.hasOwnProperty('nextUrl') === false || jumpCount === options.maxJump) {
      return result;
    } else {
      let nextPage = bob.mine({ "url" : options.nextUrl}, page);
      if( nextPage.url ) {

        //console.log("nextPage (raw) : ",nextPage.url);
        options.url = normalizeNextUrl(options.url, nextPage.url);
        //console.log("nextPage (norm): ",options.url);

        return crawlUrlMultipage(options, extractionPlan, jumpCount + 1)
        .then( nextResult => {
          return [result].concat(nextResult);
        });
      } else {
        return result;
      }
    }
  })
  .catch( err => ({
    'source' : options.url,
    'data'   : null,
    'error'  : err
  }));
}


/**
 * Load a page and extract data from it
 *
 * @param  {string} url            URL of the page to process
 * @param  {object} extractionPlan extraction plan definition used to extract data
 * @return {Promise}                Promise result of extraction
 */
function crawlUrl(url, extractionPlan) {
  return request(url)
  .then( page => ({
    'source' : url,
    'data'   : bob.mine(extractionPlan, page)
  }))
  .catch( err => ({
    'source' : url,
    'data'   : null,
    'error'  : err
  }));
}

exports.start = function( itinerary , extractionPlan ) {

  if( typeof itinerary === 'string') {      // itinerary is assumed to be an URL
    return crawlUrl(itinerary,extractionPlan);
  }
  else if( Array.isArray(itinerary)) {      // itinerary is an array of URL
    return new Promise( (resolve, reject ) => {
      // create task list
      let tasks = itinerary.map( url => {
        let taskFn = function(cb) {
          exports.start(url,extractionPlan)
          .then( result => { cb(null,result);})
          .catch(err    => { cb(err);        });
        };
        return async.reflect(taskFn);
      });
      // run in parallel
      async.parallel(tasks, (err,results) => {
        if(err) { reject(err);      }
        else    { resolve(results.map( r => r.value)); }
      });
    }); // new Promise (end)
  }
  else if (typeof itinerary === 'object') { // itinerary is url+name
    if(  itinerary.hasOwnProperty('url') ) {
      return crawlUrlMultipage(itinerary, extractionPlan)
      .then( result => {
        return result;
      });
    } else {
      return Promise.reject({
        'source': null,
        "data"  : null,
        "error" : "missing property : 'url'"
      });
    }
  }
};
