"use strict";

var reflect = require('../promise-utils').reflect,
  assert = require('chai').assert;


describe('Promise Reflect', function(done) {
  this.timeout(5000);


  it('Call Promise.all', function(done) {
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p1-ok");
      }, 100, "one");
    });
    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p2-ok");
      }, 200, "two");
    });
    let p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p3-ok");
      }, 300, "three");
    });

    let p4 = new Promise((resolve, reject) => {
      reject("reject-p4");
    });

    let promisesArray = [p1, p2, p3, p4];

    Promise.all(promisesArray.map(reflect))
      .then(results => {
        assert.isArray(results);

        let resolved = results.filter(result => result.resolved);
        assert.lengthOf(resolved, 3);
        assert.deepEqual(resolved, [{
          "value": "p1-ok",
          "error": null,
          "resolved": true
        }, {
          "value": "p2-ok",
          "error": null,
          "resolved": true
        }, {
          "value": "p3-ok",
          "error": null,
          "resolved": true
        }]);

        let rejected = results.filter(result => result.resolved === false);
        assert.lengthOf(rejected, 1);
        assert.deepEqual(rejected, [{
          "value": null,
          "error": "reject-p4",
          "resolved": false
        }]);

        done();
      })
      .catch(err => {
        console.log(`Shouldn't get here as all promises resolve when put through promise-reflect`);
        done(err);
      });
  });

});
