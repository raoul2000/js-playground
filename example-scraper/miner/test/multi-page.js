"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const crawler = require('../src/crawler');


describe('crawler multi pages', function(done) {

  it('crawl next pages no limit', function(done) {
    return crawler.start({
        "name": "page 1",
        "url": 'http://127.0.0.1:8080/sequence-1.html',
        "nextUrl": {
          "selector": "a",
          "type": "@href"
        }
      }, {
        title: "h1",
        text: "p"
      })
      .then(result => {
        //console.log("final = ", result);
        assert.isArray(result);
        assert.lengthOf(result, 4);
        assert.deepEqual(result[0], {
          source:  'http://127.0.0.1:8080/sequence-1.html',
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
        assert.deepEqual(result[2], {
          source: 'http://127.0.0.1:8080/sequence-3.html',
          data: {
            title: 'Sequence 3',
            text: 'Third page in the sequence'
          }
        });
        assert.deepEqual(result[3], {
          source:  'http://127.0.0.1:8080/sequence-4.html',
          data: {
            title: 'Sequence 4 - last',
            text: 'Last page in the sequence'
          }
        });
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('crawl next pages limit to 2', function(done) {
    return crawler.start({
        "name": "page 1",
        "url": 'http://127.0.0.1:8080/sequence-1.html',
        "nextUrl": {
          "selector": "a",
          "type": "@href",
        },
				'maxJump' : 2
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
