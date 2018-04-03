"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const crawler = require('../src/crawler');


describe('crawler multi pages loop', function(done) {

  it('crawl next pages and stop when looping', function(done) {
    return crawler.start({
        "url": 'http://127.0.0.1:8080/loop-1.html',
        "nextUrl": {
          "selector": "a",
          "type": "@href"
        },
        "maxJump": 3
      }, {
        title: "h1",
        text: "p"
      })
      .then(result => {
        //console.log("final = ", result);
        assert.isArray(result);
        assert.lengthOf(result, 2);
        assert.deepEqual(result[0], {
          source: 'http://127.0.0.1:8080/loop-1.html',
          data: {
            title: 'Loop : step 1',
            text: 'page 1'
          }
        });

        assert.deepEqual(result[1], {
          source: 'http://127.0.0.1:8080/loop-2.html',
          data: {
            title: 'Loop : step 2',
            text: 'page 2'
          }
        });

        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('crawl next pages and stop when looping', function(done) {
    return crawler.start([
      {
        "url": 'http://127.0.0.1:8080/loop-1.html',
        "nextUrl": {
          "selector": "a",
          "type": "@href"
        },
        "maxJump": 3
      }, {
        "url": 'http://127.0.0.1:8080/sequence-1.html',
        "nextUrl": {
          "selector": "a",
          "type": "@href"
        }
      }
    ], {
        title: "h1",
        text: "p"
      })
      .then(result => {
        //console.log("final = ", JSON.stringify(result));
        assert.isArray(result);
        assert.lengthOf(result, 2);

        assert.isArray(result[0]);
        assert.lengthOf(result[0], 2);

        assert.isArray(result[1]);
        assert.lengthOf(result[1], 4);

        done();
      })
      .catch(err => {
        done(err);
      });
  });

});
