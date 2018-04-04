"use strict";

const assert  = require('chai').assert;
const expect  = require('chai').expect;
const crawler = require('../src/crawler');

const TEST_BASE_URL = 'http://127.0.0.1:8080/page-1.html';

describe('crawler with request options',function(done){

	it('crawl a simple object',function(done){
    return crawler.start({
			"url" : TEST_BASE_URL,
			"headers" : {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0;) Gecko/20100101 Firefox/59.0'
			},
			"qs" : {
				"param1" : "value1",
				"param2" : "value2",
			},
			"callback" : function(err, resp,body) {
				if(err) {
					console.error(err);
				}
			}
		}, "h1")
    .then( result => {
      assert.deepEqual(result, {
        'source' :  TEST_BASE_URL,
        'data'   : 'page 1 : title'
      });
      done();
    })
    .catch( err => {
      done(err);
    });
	});

});
