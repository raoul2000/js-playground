var EventEmitter = require("events").EventEmitter,
 	util = require('util');

function Phone(){

	var interval = null;
	var ringCount = 0;
	EventEmitter.call(this);

	this.incRingCount = function(){
		ringCount++;
	};
	this.getRingCount = function(){
		return ringCount;
	};
	this.isRinging = function(){
		return interval !== null;
	};
	this.getMaxRingCount = function(){
		return 3;
	};
	/**
	 *
	 */
	this.makeCall = function() {
		if( this.isRinging() ) {
			console.log('the phone is already ringing');
		} else {
			var fnStartRing = function(){
				ringCount++;
				this.emit('ring');
			};
			interval = setInterval(
				fnStartRing.bind(this),
				1000
			);
		}
	};
	/**
	 *
	 */
	this.reply = function(afterRingCount){

		if(  ! this.isRinging() ){
			console.log('the phone is not ringing');
			return;
		}

		afterRingCount = afterRingCount || 1;
		console.log('ring count = '+ringCount);

		if( this.getRingCount() >= afterRingCount ){
			clearInterval(interval);
			ringCount = 0;
			console.log('yes ?');
		} else if( this.getRingCount() >= this.getMaxRingCount()){
			throw new Error('expire');
		}
	};

}
util.inherits(Phone, EventEmitter);


/////////////////////////////////////////////////////////////////////////////////////////////////////

var myPhone = new Phone();
myPhone.on('ring',function(){
	console.log('ring');
	this.reply(2);
});

myPhone.makeCall();
