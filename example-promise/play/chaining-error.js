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
			
			var result = ''+str+' '+delay;
			// depending on the value of str, 
			if( str == 'reject') {
				cb('reject : '+result);
			} else if( str == 'exception') {
				cb('exception : '+result);
			} else {
				cb(null,result);				
			}
			
		}, delay);		
	})(arg, delay);
};
/**
 * Parametrized Promise constructor
 */
var MyPromise = function(arg) {
	return Q.promise(function(resolve,reject){
		asyncFunc1(arg,function(error, result){
			
			var throwException = function(arg){
				throw new Error(arg);
			};
			
			if(error) {
				if(error.startsWith('reject')){
					reject(error);	
				} else {
					resolve(throwException(error));
				}
			} else {				
				resolve(result);
			}
		})
	});
};

/**
 * Show a promise being rejected which invoke the 'fail' function in the chain.
 */
function testChainReject() {
	
	var promiseMeA = new MyPromise('A');
	var promiseMeB = new MyPromise('B');
	var promiseMeReject = new MyPromise('reject');
	
	promiseMeA.then(function(result){
		console.log('step 1 : promise fullfiled : result = '+result);
		return promiseMeB;
	}).then( function(result) {
		console.log('step 2 : promise fullfiled : result = '+result);
		return promiseMeReject;	// fails
	}).then(function(result){
		// we will never reach this function
		console.log('step 3 : promise fullfiled : result = '+result);
	}).fail(function(error){
		
		// note that the fail function is a shortcut for then(undefined, func)
		
		console.log('catch : promise rejected - error = '+error);
	}).fin(function(){
		console.log('fin : testChainReject');
	});		
}
/**
 * Exception is caught if thrown from the promise constructor call back
 */
function testChainException1() {
	
	var promiseMeA = new MyPromise('A');
	var promiseMeB = new MyPromise('B');
	var promiseMeEx = Q.promise(function(resolve, reject){
		// throws exception in the constructor callback of the Promise
		// otherwise it will NOT be caught by the 'fail' handler
		throw 'exception';
	});
	
	// 
	
	promiseMeA.then(function(result){
		console.log('step 1 : promise fullfiled : result = '+result);
		return promiseMeB;
	}).then( function(result) {
		console.log('step 2 : promise fullfiled : result = '+result);
		return promiseMeEx;	// fails
	}).then(function(result){
		// we will never reach this function
		console.log('step 3 : promise fullfiled : result = '+result);
	}).fail(function(error){
		console.log('catch error = '+error);
	}).fin(function(){
		console.log('fin : testChainException1');
	});			
}
/**
 * Exception thrown from the then handler is caught
 */
function testChainException2() {
	
	var promiseMeA = new MyPromise('A');
	
	promiseMeA.then(function(result){
		console.log('step 1 : promise fullfiled : result = '+result);
		throw 'exception';
	}).fail(function(error){
		console.log('catch error = '+error);
	}).fin(function(){
		console.log('fin : testChainException2');
	});			
}

testChainReject();
testChainException1();
testChainException2();