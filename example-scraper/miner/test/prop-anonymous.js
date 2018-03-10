"use strict";

const assert = require('chai').assert;
const miner  = require('../src/miner');

describe('anonymous property extraction',function(done){

	it('extracts the first matching text',function(done){
		let result = miner.mine("b",
			"<p> text <b>text 1</b> <b>text 2</b> text</p>"
		);
		assert.deepEqual(result,'text 1');
		done();
	});

	it('extracts all first match texts for each selector',function(done){
		let result = miner.mine(["b", "div"],
			`<p> text
				<b>text 1</b>
				<b>text 2
					<div>some value</div>
				</b>
			text</p>`
		);
		assert.deepEqual(result,['text 1', 'some value']);
		done();
	});

});
