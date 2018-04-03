"use strict";

const assert  = require('chai').assert;
const expect  = require('chai').expect;
const crawler = require('../src/crawler');


describe('random delay generator',function(done){

	it('create a random int between 0 and 3',function(done){
		let result = crawler.randomDelay(3);
		console.log(result);
		assert.isBelow(result,3+1);
		assert.isAbove(result, -1);
		done();
	});

	it('create a random int between 1 and 3',function(done){
		let result = crawler.randomDelay({ min : 1, max: 3});
		console.log(result);
		assert.isBelow(result,3+1);
		assert.isAbove(result, 0);
		done();
	});
});
