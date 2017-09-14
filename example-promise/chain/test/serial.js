"use strict";

var serial = require('../promise-utils').serial,
  assert = require('chai').assert;


describe('Promise Serial', function(done) {
  this.timeout(5000);


  it('Resolve a set of promises in sequence (use relfect = true)', function(done) {

    let tasks = ["a", "b", "c"];
    let myFn = function(item, next, i) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 100, item);
      });
    };

    serial(tasks, myFn).then(results => {
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

});
