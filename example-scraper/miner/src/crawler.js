"use strict";

const request = require('request-promise-native');
const async   = require('async');
const bob     = require('./miner');


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
    if(  itinerary.hasOwnProperty('url') && itinerary.hasOwnProperty('name')) {
      return crawlUrl(itinerary.url, extractionPlan)
      .then(result => Object.assign(result,{
        'source' : itinerary
      })); // overwritte the source = url
    } else {
      return Promise.reject({
        'source': itinerary,
        "data"  : null,
        "error" : "missing property : 'url' and 'name' are mandatory properties, and one of them is missing"
      });
    }
  }
};
