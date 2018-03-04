"use strict";

const assert = require('chai').assert;
const miner = require('../src/miner');

describe('objects propetry as object',function(done){

	it('extracts property "post" with type object',function(done){
		let result = miner.mine(
			{
				post : {
					selector : "div",
					type : {
						title : {
							selector : "h1"
						},
						text : {
							selector : "p",
							type : ["text"]
						}
					}
				}
			},
			`
			<body>
				<div>
					<h1>the title</h1>
					<p> l1:body text </p>
					<p> l2:body text </p>
				</div>
				<div>
					<h1>the title 1</h1>
					<p> body text 2</p>
				</div>
				<p> out of post text </p>
			</body>`
		);
		assert.deepEqual(result, {
			"post": {
			  "text": [
			    " l1:body text ",
			    " l2:body text "
			  ],
			  "title": "the title"
			}
		});
		done();
	});


	it('extracts "post" property with type object[]',function(done){
		let result = miner.mine(
			{
				post : {
					selector : "div",
					type : [{
						title : {
							selector : "h1"
						},
						text : {
							selector : "p",
							type : ["text"]
						}
					}]
				}
			},
			`
			<body>
				<div>
					<h1>the title</h1>
					<p> l1:body text </p>
					<p> l2:body text </p>
				</div>
				<div>
					<h1>the title 1</h1>
					<p> body text 2</p>
				</div>
				<p> out of post text </p>
			</body>`
		);
		assert.deepEqual(result, {
			"post": [
				    {
				      "text": [
				        " l1:body text ",
				        " l2:body text ",
				      ],
				      "title": "the title"
				    },
				    {
				      "text": [
				        " body text 2"
				      ],
				      "title": "the title 1"
				    }
				  ]
				});
		done();
	});
});
