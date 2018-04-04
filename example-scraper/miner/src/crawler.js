"use strict";

const request = require('request-promise-native');
const async   = require('async');
const bob     = require('./miner');
var URL       = require('url-parse');

/**
 * Turns a possibly relative url into an absolute url relatively to baseUrl
 * @param  {string} baseUrl base URL
 * @param  {string} nextUrl the url (possibly relative) to normalize
 * @return {string}         the normalozed url
 */
function normalizeNextUrl(baseUrl, nextUrl) {
  let result = new URL(nextUrl, baseUrl);
  return result.href;
}
exports.normalizeNextUrl = normalizeNextUrl;

/**
 * creates and return a random integer.
 * If an object is povided, it should have following format :
 * delay = {
 *  'min' : int, // minimum value
 *  'max' : int // maximum value
 * }
 * @param  {mixed} delay  object or integer
 * @return {int}        random integer value
 */
function randomDelay(delay) {
  let min = 0, max = 0;
  if( ! delay ) {
    return 0;
  }else if( typeof delay === 'object') {
    ({min=0,max=5000} = delay);
  } else if (typeof delay === 'string') {
    max = parseInt(delay,10);
  } else if (typeof delay === 'number') {
    max = delay;
  } else {
    throw new TypeError('Expected all arguments to be numbers');
  }
	return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomDelay = randomDelay;

/**
 * Perform a possibly delayed HTTP request using provided options.
 *
 * @param  {object} options Request option object that can contain additional
 * properties (like 'delay' for example)
 * @return {Promise}         Promise resvoled by the request result
 */
function requestProvider(options) {
  let delay = randomDelay(options.delay);
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve( request(options));
    }, delay);
  });
}

/**
 * options = {
 *  "url"     : 'http://hostname:port/path',
 *  "nextUrl" : {
 *    "selector" : "h1 > div.post > a",
 *    "type"     : "@href"
 *  },
 *  "maxJump"  : 10,
 *  "delay" : {
 *    "min" : 1000,
 *    "max" : 4000
 *  }
 * }
 * @param  {string|object} options the url of the page when string,
 * @param  {[type]} extractionPlan [description]
 * @param  {Number} [jumpCount=0]  [description]
 * @return {[type]}                [description]
 */
function crawlUrlMultipage(options, extractionPlan, jumpCount = 0, visitedUrl = []) {
 if( visitedUrl.length === 0) {
   visitedUrl.push(options.url);
 }
 return requestProvider(options,2000)
  .then( page => {
    let result = {
      'source' : options.url,
      'data'   : bob.mine(extractionPlan, page)
    };
    if( options.hasOwnProperty('nextUrl') === false || jumpCount === options.maxJump) {
      return result;
    } else {
      let nextPage = bob.mine({ "url" : options.nextUrl}, page);
      if( nextPage.url ) {
        options.url = normalizeNextUrl(options.url, nextPage.url);
        if ( ! visitedUrl.includes(options.url)) {
          visitedUrl.push(options.url);
          return crawlUrlMultipage(options, extractionPlan, jumpCount + 1, visitedUrl)
          .then( nextResult => {
            return [result].concat(nextResult);
          });
        } else { // loop detected
          return result;
        }
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
 * Start the mining for the given itinerary and using the extractionPlan
 *
 * @param  {mixed} itinerary      string, object or array describing the pages
 * to mine
 * @param  {mixed} extractionPlan string, object or array describing how to
 * extract data from a page
 * @return {Promise}              resolved by the extraction result
 */
exports.start = function( itinerary , extractionPlan ) {

  if( typeof itinerary === 'string') {      // itinerary is assumed to be an URL
    return crawlUrlMultipage({ "url" : itinerary}, extractionPlan);
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
