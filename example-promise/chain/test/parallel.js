"use strict";

var parallel = require('../promise-utils').parallel,
  assert = require('chai').assert;


describe('Promise Parallel', function(done) {
  this.timeout(5000);


  it('Resolve a set of resolved promises in parallel (use relfect = true)', function(done) {

    let tasks = ["a", "b", "c"];
    let myFn = function(item, next, i) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, item);
      });
    };

    parallel(tasks, myFn).then(results => {
        assert.deepEqual(results, [{
            value: 'a',
            error: null,
            resolved: true
          },
          {
            value: 'b',
            error: null,
            resolved: true
          },
          {
            value: 'c',
            error: null,
            resolved: true
          }
        ]);
        done();
      })
      .catch(err => {
        console.log(`Shouldn't get here as all promises resolve when put through promise-reflect`);
        done(err);
      });
  });


  it('Resolve a set of rejected promises in parallel (use relfect = true)', function(done) {

    let tasks = ["a", "b", "c"];
    let myFn = function(item, next, i) {
      return new Promise((resolve, reject) => {
        setTimeout(reject, 1000, item);
      });
    };

    parallel(tasks, myFn).then(results => {
        assert.deepEqual(results, [{
            value: null,
            error: 'a',
            resolved: false
          },
          {
            value: null,
            error: 'b',
            resolved: false
          },
          {
            value: null,
            error: 'c',
            resolved: false
          }
        ]);
        done();
      })
      .catch(err => {
        console.log(`Shouldn't get here as all promises resolve when put through promise-reflect`);
        done(err);
      });
  });

});
