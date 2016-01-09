'use strict';
var xpath = require('xpath'), 
	DOMParser = require('xmldom').DOMParser, 
	fs = require('fs'), 
	assert = require('chai').assert;

var doc = new DOMParser().parseFromString(
	fs.readFileSync(__dirname + '/data/xpath.xml', 'utf-8')
);

describe('xpath',function(done){
	
	it("/root-node/node : should return an array containing the 'node' node",function(done){
		
		var xpResult = xpath.select('/root-node/node',doc);
		
		assert.typeOf(xpResult, 'Array');
		assert.lengthOf(xpResult,1);
		assert.equal(xpResult[0].tagName,"node");
		done();
	});
	
	it("//* : should return an array containing all nodes",function(done){
		
		var xpResult = xpath.select('//*',doc);
		assert.lengthOf(xpResult,8);
		done();
	});
	
	it("//*/@* : should return an array containing the all attributes",function(done){
		
		var xpResult = xpath.select('//*/@*',doc);
		

		assert.lengthOf(xpResult,3);
		assert.equal(xpResult[0].name, "an-float-attribute");
		assert.equal(xpResult[1].name, "an-integer-attribute");
		done();
	});
	
	it("//*[@an-integer-attribute] : should return nodes having attribute 'an-integer-attribute' ",function(done){
		
		var xpResult = xpath.select('//*[@an-integer-attribute]',doc);
		
		assert.lengthOf(xpResult,2);
		assert.equal(xpResult[0].tagName, "child-c");
		assert.equal(xpResult[1].tagName, "child-d");
		done();
	});	
	
	it("//*[@an-integer-attribute='888'] : should return nodes having attribute 'an-integer-attribute' with value 888 ",function(done){
		
		var xpResult = xpath.select("//*[@an-integer-attribute='888']",doc);
		
		assert.lengthOf(xpResult,1);
		assert.equal(xpResult[0].tagName, "child-d");
		done();
	});		
});