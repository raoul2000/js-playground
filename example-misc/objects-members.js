"use strict";
var assert = require('chai').assert,
expect= require('chai').expect;

var MyObject = function() {
	
	this.public1 = 'I am public member 1';
	
	var private1 = 'I am private memeber 1';
	var private2 = 'I am private memeber 2';
	
	this.fnPrivileged1 = function(){
		return private1;
	}
	
	var fnPrivate1 = function(){
		return 'I am private';
	}
};

MyObject.prototype.public2 = 'I am public member 2';


var myObject = new MyObject();

describe('privileged method',function(done){
	
	it('can access private members',function(done){
		expect(myObject).to.have.property('fnPrivileged1');
		expect(myObject.fnPrivileged1()).to.be.equal('I am private memeber 1');
		done();
	});
	
});

describe('private method',function(done){
	
	it('cannot be accessed ',function(done){
		expect(myObject).to.not.have.property('fnPrivate1');
		done();
	});
	
});

describe('public members',function(done){
	
	it('can be accessed from outside',function(done){
		expect(myObject).to.have.property('public1','I am public member 1');
		expect(myObject).to.have.property('public2','I am public member 2');

		done();
	});
	
});

describe('private members',function(done){
	
	it('cannot be accessed from outside',function(done){
		expect(myObject).to.not.have.property('private1');
		expect(myObject).to.not.have.property('private2');

		done();
	});
	
});