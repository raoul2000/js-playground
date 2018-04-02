"use strict";

const assert  = require('chai').assert;
const expect  = require('chai').expect;
const crawler = require('../src/crawler');

const TEST_BASE_URL = 'http://127.0.0.1:8080/page-1.html';

describe('crawler with object',function(done){

	it('crawl a simple object',function(done){
    return crawler.start({
			"url" : TEST_BASE_URL
		}, "h1")
    .then( result => {
      assert.deepEqual(result, {
        'source' : {
					"url" : TEST_BASE_URL
				},
        'data'   : 'page 1 : title'
      });
      done();
    })
    .catch( err => {
      done(err);
    });
	});

	it('fails to crawl when object has no property \"url\"',function(done){
    return crawler.start({
			"NOT_URL" : TEST_BASE_URL
		}, "h1")
    .then( result => {
			console.log(result);
      done(new Error("should have failed"));
    })
    .catch( err => {
			console.log("ERROR");
			//done();
			assert.deepEqual(err, {
				"source" : {
					"url" : TEST_BASE_URL
				},
        "error" : 'missing property : \'url\' and \'name\' are mandatory properties, and one of them is missing',
        'data'  : null
      });
      done();
    });
	});

});
