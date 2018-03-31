"use strict";

const assert  = require('chai').assert;
const expect  = require('chai').expect;
const crawler = require('../src/crawler');

const URL_PAGE1 = 'http://127.0.0.1:8080/page-1.html';
const URL_PAGE2 = 'http://127.0.0.1:8080/page-2.html';
const URL_PAGE_NOT_FOUND = 'http://127.0.0.1:8080/page-NOT_FOUND.html';

describe('crawler with array',function(done){

	it('crawl a list of URL',function(done){
    return crawler.start([
				URL_PAGE1,
				URL_PAGE2
			], "h1"
		)
    .then( result => {
      assert.deepEqual(result, [{
        'source' : URL_PAGE1,
        'data'   : 'page 1 : title'
      },
			{
				'source' : URL_PAGE2,
				'data'   : 'page 2 : title'
			}]);
      done();
    })
    .catch( err => {
      done(err);
    });
	});

	it('crawl a list of URL with failure',function(done){
    return crawler.start([
			URL_PAGE1,
			URL_PAGE_NOT_FOUND,
			URL_PAGE2
		], "h1")
    .then( result => {
			assert.lengthOf(result,3);
			assert.deepEqual(result[0], {
        'source' : URL_PAGE1,
        'data'   : 'page 1 : title'
      });
			assert.deepEqual(result[2], {
        'source' : URL_PAGE2,
        'data'   : 'page 2 : title'
      });
			assert.property(result[1],'error');
			assert.isNotNull(result[1].error);
			assert.equal(result[1].error.statusCode, 404, "404 status code is returned");
      done();
    })
    .catch( err => {
      done(err);
    });
	});
});
