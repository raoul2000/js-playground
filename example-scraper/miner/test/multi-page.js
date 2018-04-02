"use strict";

const assert  = require('chai').assert;
const expect  = require('chai').expect;
const crawler = require('../src/crawler');


describe('crawler multi pages',function(done){

	it('crawl next pages',function(done){
    return crawler.start({
			"name"    : "page 1",
			"url"     : 'http://127.0.0.1:8080/sequence-1.html',
			"nextUrl" : {
				"selector" : "a",
				"type"     : "@href"
			}
		}, "h1")
    .then( result => {
			console.log("final = ",result);
      done();
    })
    .catch( err => {
      done(err);
    });
	});

});
