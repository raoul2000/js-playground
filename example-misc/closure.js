"use strict";
/**
 * Output : 
 * 	5
 * 	5
 * 	5
 * 	5
 * 	5
 */
function testNoClosure() {
	
	var funcArray = [];
	for (var int = 0; int < 5; int++) {
		var Func = function logInt(){
			this. run = function() {
				// the same int variable is enclosed by all 5 func adn at the end
				// of the loopn its value is 5 : '5' will be output 5 times to the console
				console.log(int);
			};
		};
		funcArray.push(new Func());
	}
	funcArray.forEach(function(item,i){
		item.run();
	});
}

/**
 * Output : 
 * 	0
 * 	1
 * 	2	
 * 	3
 * 	4
 */
function testClosure() {
	
	var funcArray = [];
	for (var int = 0; int < 5; int++) {
		
		var Func = function logInt(){
			var i = int;
			// each Func has its own closure with its own variable 'i' having its value
			// set to the loop int.
			this. run = function() {
				console.log(i);
			}
		};
		funcArray.push(new Func());
	}
	funcArray.forEach(function(item,i){
		item.run();
	});
}
console.log('test 1 ============================ ');
testNoClosure();
console.log('-');
testClosure();
///////////////////////////////////////////////////////////////////////////////////////////////
var myFunc = function(arg){
	var name = arg;
	// the variable 'name' is accessible by the returned anonymous function
	return function(){
		console.log('hello '+name);
	}
};
// there is one closure per function call 
var sayHelloToBob = myFunc('bob');
var sayHelloToTom = myFunc('tom');

console.log('test 2 ============================ ');
sayHelloToBob();
sayHelloToTom();