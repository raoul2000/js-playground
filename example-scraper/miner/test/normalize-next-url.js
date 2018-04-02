"use strict";

const assert  = require('chai').assert;
const expect  = require('chai').expect;
const crawler = require('../src/crawler');


describe('next url builder',function(done){

	it('resolve relative url',function(done){
		let result = crawler.normalizeNextUrl(
			'http://hostname:87/path/to/file.html',
			'next-file.html'
		);
		assert.equal(result,'http://hostname:87/path/to/next-file.html')
		done();
	});

	it('resolve relative url with absolute path',function(done){
		let result = crawler.normalizeNextUrl(
			'http://hostname:87/path/to/file.html',
			'/next-file.html'
		);
		assert.equal(result,'http://hostname:87/next-file.html')
		done();
	});

	it('resolve absolute url',function(done){
		let result = crawler.normalizeNextUrl(
			'http://hostname:87/path/to/file.html',
			'http://host2/folder/next-file.html'
		);
		assert.equal(result,'http://host2/folder/next-file.html')
		done();
	});

	it('ignore query params with relative url',function(done){
		let result = crawler.normalizeNextUrl(
			'http://hostname:87/path/to/file.html?p=value&p2=a%20b',
			'next-file.html'
		);
		assert.equal(result,'http://hostname:87/path/to/next-file.html')
		done();
	});

	it('ignore query params with absolute url',function(done){
		let result = crawler.normalizeNextUrl(
			'http://hostname:87/path/to/file.html?p=value&p2=a%20b',
			'http://host2/folder/next-file.html'
		);
		assert.equal(result,'http://host2/folder/next-file.html')
		done();
	});

});
