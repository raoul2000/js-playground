'use strict';

var assert = require('assert');

describe("xml2js",function(){
	
	describe("DOMParser",function(){
		
		it("should parse simple XML",function(done){
			
			var fs = require("fs");
			var DOMParser = require('xmldom').DOMParser;
			
			fs.readFile(__dirname + '/data/simple.xml', 'utf-8',  function(err, data) {
				if(err) throw err;
				new DOMParser().parseFromString(data);
				done();
			});
		});
		
		
		it("should parse xml with no error missing external DTD",function(done){
			
			var fs = require("fs");
			var DOMParser = require('xmldom').DOMParser;
			
			fs.readFile(__dirname + '/data/external-dtd.xml', 'utf-8', function(err, data) {
				if(err) throw err;
				new DOMParser().parseFromString(data);
				done();
			});
		});
		
		it("should parse XML with unresolved entities",function(done){
			
			var fs = require("fs");
			var DOMParser = require('xmldom').DOMParser;
			
			fs.readFile(__dirname + '/data/unresolved-entities.xml', 'utf-8', function(err, data) {
				if(err) throw err;
				new DOMParser().parseFromString(data);
				done();			
			});
		});		
		
		it("should parse XML with internal declared entities",function(done){
			
			var fs = require("fs");
			var DOMParser = require('xmldom').DOMParser;
			
			fs.readFile(__dirname + '/data/internal-entities.xml',  'utf-8', function(err, data) {
				if(err) throw err;
				new DOMParser().parseFromString(data);
				done();				
			});
		});			
	});
});