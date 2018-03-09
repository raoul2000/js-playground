"use strict";

const assert = require('chai').assert;
const miner = require('../src/miner');


describe('objects properties values as array',function(done){

	it('extracts property with type [text]',function(done){
		let result = miner.mine(
			{
				text : {
					selector : "b",
					type : ["text"]
				}
			},
			"<p> text <b>text 1</b> <b>text 2</b> text</p>"
		);
		assert.deepEqual(result, { text : ['text 1', 'text 2']});
		done();
	});

	it('extracts property with type [html]',function(done){
		let result = miner.mine(
			{
				text : {
					selector : "ul > li",
					type : ["html"]
				}
			},
			`<p>
				<ul>
					<li> text in <b>bold 1</b></li>
					<li> text in <b>bold 2</b></li>
				</ul>
			</p>`
		);
		assert.deepEqual(result, { text : [' text in <b>bold 1</b>', ' text in <b>bold 2</b>']});
		done();
	});

	it('extracts property with type [@attributeName]',function(done){
		let result = miner.mine(
			{
				text : {
					selector : "ul > li",
					type : ["@class"]
				}
			},
			`<p>
				<ul>
					<li class="line1"> text in <b>bold 1</b></li>
					<li class="line2"> text in <b>bold 2</b></li>
				</ul>
			</p>`
		);
		assert.deepEqual(result, { text : ['line1', 'line2']});
		done();
	});

});
