'use strict';

var Q = require('q');
/**
 * Mock an asynchronous function.
 * The function is invoked after a random amount of milliseconds. It only call the callback function
 * passed as argument by the caller.
 */
var asyncFunc1 = function(arg, cb) {	
	
	var delay = Math.round(Math.random()*1000);
	
	(function(str,delay){
		setTimeout(function() {			
			console.log('[call] asyncFunc1 : arg = '+str+' ('+delay+' ms)');
			cb(null, ''+str+' '+delay);				
		}, delay);		
	})(arg, delay);
};
/**
 * Promise class.
 * No error handling
 */
var MyPromise = function(arg) {
	return Q.promise(function(resolve,reject){
		asyncFunc1(arg,function(error, result){
			// we choose to ignore error as our mock async function
			// will always succeed
			resolve(result);
		})
	});
};
/**
 * Show how promises can be chained and how a fulfilled promise can pass its
 * result or error to the next function in the chain. 
 */
function testChainPassResult() {
	
	var promiseMeA = new MyPromise('A');
	
	promiseMeA.then(function(result){
		console.log('step 1 : promise fullfiled : result = '+result);
		// a promise object is returned so the next 'then' handler will wait until
		// it is resolved.
		return { 'promiseA' : result};
	}).then( function(result) {
		console.log('step 1 : result = '+JSON.stringify(result));
		
		// work on the result we received
		
	}).fin(function(){
		console.log('fin : testChainSuccess');
	});	
}

/**
 * returning a Promise from the then function
 */
function testChainPassPromise() {
	
	var promiseMeA = new MyPromise('A');
	
	promiseMeA.then(function(result){
		console.log('step 1 : promise fullfiled : result = '+result);
		// a promise object is returned so the next 'then' handler will wait until
		// it is resolved.
		return new MyPromise('B');
	}).then( function(result) {
		console.log('step 2 : promise fullfiled : result = '+result);
	}).fin(function(){
		console.log('fin : testChainSuccess');
	});	
}

//testChainPassResult();
testChainPassPromise();
