'use strict';

var Q = require('q');

/**
 * Mock an asynchronous function.
 */
var asyncCallback = function(arg, cb) {	
	var delay = Math.random()*1000;
	(function(v,d){
		setTimeout(function() {
			cb('asyncCallback done : arg = '+v+' ('+Math.round(d)+' ms)');
		}, d);		
	})(arg, delay);
};
/**
 * Mock an asynchronous function.
 */
var asyncLog = function(arg,cb) {	
	var delay = Math.random()*1000;
	(function(v,d){
		setTimeout(function() {
			var ts = Math.round(d);
			console.log('asyncCallback done : arg = '+v+' ('+ts+' ms)');
			cb('done arg : '+v+' ('+ts+' ms)');
		}, d);		
	})(arg, delay);
};

/**
 * With A.all, the 'then' function is called whan all promises have been settled. Each one output its result
 * in an array, maintaining the same order as in the myPromises array. So, even if execution is asynchronous 
 * (done in random order) the result array allow to retrieve the result of each promise.
 * 
 * Example output :
 *  
 * 		begin (2)
 * 		end (2)
 * 		asyncCallback done : arg = 2 (499 ms)
 * 		asyncCallback done : arg = 4 (705 ms)
 * 		asyncCallback done : arg = 1 (786 ms)
 * 		asyncCallback done : arg = 3 (805 ms)
 * 		asyncCallback done : arg = 0 (826 ms)
 * 		(2) allSettled : result = ["done arg : 0 (826 ms)","done arg : 1 (786 ms)","done arg : 2 (499 ms)","done arg : 3 (805 ms)","done arg : 4 (705 ms)"]
 */
function test2(){
	console.log('begin (2)');
	
	var myPromises = [];
	for (var int = 0; int < 5; int++) {
		
		var asyncPromise = function(arg){
			
			return Q.Promise(function(resolve,reject){
				asyncLog(arg,function(result){
					resolve(result);
				});
			})
		}		
		myPromises.push(asyncPromise(int));
	}
	
	Q.all(myPromises)
		.then(function(result){
			console.log('(2) allSettled : result = '+JSON.stringify(result));
		});
	console.log('end (2)');
}

/**
 * Illustrate asynchronous execution.
 * Even if each promise is started in order, the execution is in a different order (due to random setTimeout)
 * Example output : 
 * 		begin (1)
 * 		starting promise n°0
 * 		starting promise n°1
 * 		starting promise n°2
 * 		starting promise n°3
 * 		starting promise n°4
 * 		done (1)
 * 		result = asyncCallback done : arg = hello 3 (11 ms)
 * 		result = asyncCallback done : arg = hello 4 (16 ms)
 * 		result = asyncCallback done : arg = hello 2 (122 ms)
 * 		result = asyncCallback done : arg = hello 0 (802 ms)
 * 		result = asyncCallback done : arg = hello 1 (954 ms)
 */
function test1() {
	console.log('begin (1)');
	
	var asyncPromise = function(arg){
		return Q.Promise(function(resolve,reject){
			asyncCallback(arg,function(result){
				resolve(result);
			})
		})
	}	
	
	for (var int = 0; int < 5; int++) {
		console.log('starting promise n°'+int);
		
		asyncPromise('hello '+int)
		.then(function(result){
			console.log('result = '+result);
		});
	}
	console.log('done (1)');
}

test1();
//test2();

