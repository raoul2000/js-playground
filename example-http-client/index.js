'use strict';

var http = require('http');



var getAllUsers = function _getAllUsers(callback){
	var req = http.request({
		"host" : "jsonplaceholder.typicode.com",
		"path" : '/users',
		"port" : '80',
		"method" : 'GET'
	},function(response) {
		var json = '';
		
		response.on('error', function(err){
			callback(err);
		});
		response.on('data', function(data) {
			json += data;
		});

		response.on('end', function() {
			callback(null,JSON.parse(json));
		})
	});
};
getAllUsers(function(err,users){
	if(err) throw err;
	
	console.log("users count"+users.length);
});

/**
 * Consume JSON API : retrieve a post by id
 */
var getSinglePost = function _getSinglePost(id, callback){
	
	http.get("http://jsonplaceholder.typicode.com/posts/"+id, function(resp){
		console.log("Got response: " + resp.statusCode);
		var json = '';
		resp.on('data',function(data){
			json += data;
		});
		resp.on('end', function() {
			callback(null,JSON.parse(json));
		});
		resp.resume();
	}).on("error",function(err){
		callback(err);
	});
};

getSinglePost(1, function(err,post){
	if(err) throw err;
	
	console.log("user Id = "+post.userId);
	console.log("title = "+post.title);
});