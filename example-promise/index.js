'use strict';

var Q = require('q');

var asyncCallback = function(arg, cb) {	
	var delay = Math.random()*1000;
	(function(v,d){
		setTimeout(function() {
			cb('asyncCallback done : arg = '+v+' ('+Math.round(d)+' ms)');
		}, d);		
	})(arg, delay);
};

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

var chainPromise = function(arg){
	return Q.Promise(function(resolve,reject){
		asyncCallback(arg,function(result){
			resolve(result);
		})
	})
}


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
		
		asyncPromise('hello '+int)
		.then(function(result){
			console.log('result = '+result);
		});
	}
	console.log('done (1)');
}

//test1();
test2();

