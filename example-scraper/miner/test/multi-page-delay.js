"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const crawler = require('../src/crawler');


describe('crawler multi pages with delay', function(done) {

  it('crawl next pages limit to 2', function(done) {
    this.timeout(10000);
    return crawler.start({
        "name": "page 1",
        "url": 'http://127.0.0.1:8080/sequence-1.html',
        "nextUrl": {
          "selector": "a",
          "type": "@href",
        },
				'maxJump' : 2,
        'delay' : 1000
      }, {
        title: "h1",
        text: "p"
      })
      .then(result => {
        //console.log("final = ", result);
        assert.isArray(result);
        assert.lengthOf(result, 3);
        assert.deepEqual(result[0], {
          source: 'http://127.0.0.1:8080/sequence-1.html',
          data: {
            title: 'Sequence 1',
            text: 'First page in the sequence'
          }
        });
        assert.deepEqual(result[1], {
          source: 'http://127.0.0.1:8080/sequence-2.html',
          data: {
            title: 'Sequence 2',
            text: 'Second page in the sequence'
          }
        });
        done();
      })
      .catch(err => {
        done(err);
      });
  });

});
