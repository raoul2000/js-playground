"use strict";

var parallel = require('../promise-utils').parallel,
  assert = require('chai').assert;


describe('Promise Parallel', function(done) {
  this.timeout(5000);

  it('Resolve a set of resolved promises in parallel (use relfect = false)', function(done) {

    let tasks = ["a", "b", "c"];
    let myFn = function(item, next, i) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, item);
      });
    };

    parallel(tasks, myFn, false).then(results => {
        assert.deepEqual(results, ["a", "b", "c"]);
        done();
      })
      .catch(err => {
        console.log(`Shouldn't get here as all promises resolve when put through promise-reflect`);
        done(err);
      });
  });


  it('Resolve a set of rejected promises in parallel (use relfect = false)', function(done) {

    let tasks = ["a", "b", "c"];
    let myFn = function(item, next, i) {
      if( item === "b") {
        return new Promise((resolve, reject) => {
          setTimeout(reject, 100, item);
        });
      } else {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, 100, item);
        });
      }
    };

    parallel(tasks, myFn, false).then(results => {
        done("shouldn't get there as one promise fails");
      })
      .catch(err => {
        assert.equal(err,"b");
        done();
      });
  });

});
