"use strict";

const assert  = require('chai').assert;
const expect  = require('chai').expect;
const asyncUtil = require('async');

const crawler = require('../src/crawler');

const TEST_BASE_URL = 'http://127.0.0.1:8080/blog/index.html';

describe('crawler a blog in 2 steps',function(done){

	it('crawl a simple object',function(done){
    return crawler.start(
			TEST_BASE_URL,
			{
				"posts" : {
					"selector" : "ul > li > div.post",
					"type" : [{
						"title" : "h2",
						"pageUrl" : {
							"selector" : "a",
							"type" : "@href"
						}
					}]
				}
			})
    .then( result => {
			console.log(JSON.stringify(result));

			let tasks = result.data.posts.map( post => {
				let pageUrl = crawler.normalizeNextUrl(TEST_BASE_URL,post.pageUrl);
				return asyncUtil.reflect( (cb) => {
					crawler.start(
						pageUrl,
						{
							"body" : "div.body"
						}
					)
					.then( result => { post.body = result.value.data.body; cb(null, result);})
					.catch(error  => { cb(error);       });
				})
			});

			asyncUtil.parallel(tasks, (error,results) => {
				if(error) {
					console.error(error);
					done(error);
				} else {
					console.log(JSON.stringify(results));
					done();
				}
			});
      //done();
    })
    .catch( err => {
      done(err);
    });
	});

});
