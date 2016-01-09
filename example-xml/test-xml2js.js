'use strict';

var assert = require('assert');

describe("xml2js",function(){
	
	describe("parseString",function(){

		it("should parse simple XML",function(done){
			
			var fs = require("fs");
			var parser = require('xml2js');
			
			fs.readFile(__dirname + '/data/simple.xml', function(err, data) {
				if(err) throw err;
				parser.parseString(data, function(err, result) {
					if(err) throw err;
					done();
				});
			});
		});
		
		
		it("should parse xml with no error missing external DTD",function(done){
			
			var fs = require("fs");
			var parser = require('xml2js');
			
			fs.readFile(__dirname + '/data/external-dtd.xml', function(err, data) {
				if(err) throw err;
				parser.parseString(data, function(err, result) {
					if(err) throw err;
					done();
				});
			});
		});
		
		it("should not parse XML with unresolved entities",function(done){
			
			var fs = require("fs");
			var parser = require('xml2js');
			
			fs.readFile(__dirname + '/data/unresolved-entities.xml', function(err, data) {
				if(err) throw err;
				parser.parseString(data, function(err, result) {
					if(err) {
						done();
					}
				});				

			});
		});		
		
		it("should not parse XML with internal declared entities",function(done){
			
			var fs = require("fs");
			var parser = require('xml2js');
			
			fs.readFile(__dirname + '/data/internal-entities.xml', function(err, data) {
				if(err) throw err;
				parser.parseString(data, function(err, result) {
					if(err) {
						done();
					}
				});				

			});
		});			
	});
});