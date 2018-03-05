"use strict";

const assert = require('chai').assert;
const miner = require('../src/miner');

describe('objects properties as simple value',function(done){

	it('extracts property with type text',function(done){
		let result = miner.mine(
			{
				text : {
					selector : "b"
				}
			},
			"<p> text <b>text 1</b> <b>text 2</b> text</p>"
		);
		assert.deepEqual(result, { text : 'text 1'});
		done();
	});


	it('extracts first matching selector',function(done){
		let result = miner.mine(
			{
				text : {
					selector : "p"
				}
			},
			`<div>
				<p>1. text <b>bold</b> text</p>
				<p>2. text <b>bold</b> text</p>
			</div>
			`
		);
		assert.deepEqual(result, { text : '1. text bold text'});
		done();
	});

	it('extracts property with html type',function(done){
		let result = miner.mine(
			{
				text : {
					selector : "p",
					type : "html"
				}
			},
			"<p>lorem <b>ipsum</b> dolur</p>"
		);
		assert.deepEqual(result, { text : 'lorem <b>ipsum</b> dolur'});
		done();
	});

	it('extracts property from attribute value',function(done){
		let result = miner.mine(
			{
				class : {
					selector : "p",
					type : "@class"
				}
			},
			"<p class='front-page'>lorem <b>ipsum</b> dolur</p>"
		);
		assert.deepEqual(result, { class : 'front-page'});
		done();
	});

	it('extracts first matching property from multiple attribute value',function(done){
		let result = miner.mine(
			{
				class : {
					selector : "p",
					type : "@class"
				}
			},
			`<div>
				<p class='front-page-1'>lorem <b>ipsum</b> dolur</p>
				<p class='front-page-2'>lorem <b>ipsum</b> dolur</p>
			</div>`
		);

		assert.deepEqual(result, { class : 'front-page-1'});
		done();
	});

});
