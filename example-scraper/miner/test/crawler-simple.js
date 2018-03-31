"use strict";

const assert  = require('chai').assert;
const expect  = require('chai').expect;
const crawler = require('../src/crawler');

const TEST_BASE_URL = 'http://127.0.0.1:8080/page-1.html';

describe('crawler',function(done){

	it('crawl a simple URL',function(done){
    return crawler.start(TEST_BASE_URL, "h1")
    .then( result => {
      assert.deepEqual(result, {
        'source' : TEST_BASE_URL,
        'data'   : 'page 1 : title'
      });
      done();
    })
    .catch( err => {
      done(err);
    });
	});

});
