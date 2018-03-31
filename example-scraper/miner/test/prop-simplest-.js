"use strict";

const assert = require('chai').assert;
const miner  = require('../src/miner');

describe('objects properties as simple value',function(done){

	it('extracts property with default type',function(done){
		let result = miner.mine(
			{
				text :  "b"
			},
			"<p> text <b>text 1</b> <b>text 2</b> text</p>"
		);
		assert.deepEqual(result, { text : 'text 1'});
		done();
	});

	it('extracts property with default type',function(done){
		let result = miner.mine(
			{
				text :  ["b"]
			},
			"<p> text <b>text 1</b> <b>text 2</b> text</p>"
		);
		assert.deepEqual(result, { text : ['text 1', 'text 2']});
		done();
	});

});
