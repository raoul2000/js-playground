'use strict';

var http = require('http');

/**
 * Consume JSON API : get a list of all users
 */
var getAllUsers = function _getAllUsers(callback){
	
	var req = http.request({
		"hostname" : "jsonplaceholder.typicode.com",
		"path" : '/users',
		"port" : '80',
		"method" : 'GET'
	},function(response) {
		var json = '';
		// this result in the data response will be considered as a string and not a Buffer
		response.setEncoding('utf8'); 
		response.on('error', function(err){
			callback(err);
		});
		response.on('data', function(data) {
			json += data;
		});

		response.on('end', function() {
			callback(null,JSON.parse(json));
		})
	}).end();
};
getAllUsers(function(err,users){
	if(err) throw err;
	
	console.log("users count : "+users.length);
});

/**
 * Consume JSON API : retrieve a post by id
 * Use the simplified notation (no need to 'end' the request)
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

/**
 * Create a post.
 * Send data (as json), with corresponding header
 */
var createPost = function _createPost(title, body, author, callback){
	
	var post = {
		'title' : title,
		'body'  : body,
		'author': author
	};
	var postData = JSON.stringify(post);
	
	var req = http.request({
		"hostname" : "jsonplaceholder.typicode.com",
		"path" : '/posts',
		"port" : '80',
		"method" : 'POST',
		"headers" : {
			'Content-Type': 'application/json; charset=utf-8',
			'Content-Length': postData.length
		}		
	},function(response) {
		var json = '';
		response.setEncoding('utf8');
		console.log("STATUS: "+response.statusCode);
		console.log("HEADERS:"+ JSON.stringify(response.headers));
		
		response.on('error', function(err){
			callback(err);
		});
		response.on('data', function(data) {
			console.log(data);
		});

		response.on('end', function() {
			callback(null);
		})
	});
	
	req.write(postData)
	req.end();
};

createPost('this is my test', 'lorem ipsum', 1, function(err){
	if(err) throw err;
	console.log('done');
});