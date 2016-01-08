/**
 * http://usejsdoc.org/
 */
console.log('starting ...');

var SSH = require('simple-ssh');
var async = require('async');

var ssh_config = {
	host : '192.168.99.100',
	user : 'root',
	pass : 'screencast',
	port : 32768
};


var ssh_listFolders = function(conn) {
	var ssh = new SSH(conn);
	var output = '';
	var errOut = '';
	return function(callback) {
		ssh.exec("ls -d *tomcat*/", {
			out : function(stdout) {
				output += stdout;
			},
			err : function(stderr) {
				errOut += stderr;
			},
			exit : function(code) {
				if( code === 0 ){
					var folders = output.split("\n").map(function(el,i){
						var trimed = el.trim();
						return trimed.substring(0,trimed.length-1);
					});
					callback(null, {
						"listTomcatFolder" : folders
					});					
				} else {
					callback(new Error(errOut+" exit code =  "+code));	
				}				
			}
		}).start();
	};
};


var ssh_loadEntities = function(conn) {
	var ssh = new SSH(conn);
	var output = '';
	var errOut = '';
	return function(callback) {
		ssh.exec('cat ./cfg/eomvar.dtd', {
			out : function(stdout) {
				output += stdout;
			},
			err : function(stderr) {
				errOut += stderr;
			},
			exit : function(code) {
				if( code === 0 ) {
					var eomvarEntities = {};
					if( output && output !== 0){
						var arStr = output.split("\n");
						
						for (var idx = 0; idx < arStr.length; idx++) {
							var elt = arStr[idx];
							var match = /^<!ENTITY[\t ]+([a-zA-Z_]+)+[\t ]+"(.+)">$/.exec(elt);
							if(match !== null) {
								var entityName  = match[1];
								var entityValue = match[2];
								eomvarEntities[entityName] = entityValue;
							}					
						}
						callback(null, {
							"eomvarEntities" : eomvarEntities
						});					
					}
				} else {
					callback(new Error(errOut+" exit code =  "+code));	
				}		
			}
		}).start();
	};
};

var ssh_extractTomcatconfig = function(conn, path, tomcatId) {
	var ssh = new SSH(conn);
	var output = '';
	var errOut = '';
	return function(callback){
		ssh.exec("cat "+path, {
			out : function(stdout) {
				output += stdout;
			},
			err : function(stderr) {
				errOut += stderr;
			},
			exit : function(code) {
				
				if( code !== 0 ) {
					callback(new Error(errOut+" exit code =  "+code));	
					return;
				} 
		
				var result = {};
				var context = []; 
				var connector = [];
				if( output && output !== 0){
					// remove XML comments
					stdout = output.replace(/<!--.*-->/g,"");
					console.log(stdout);
					
					// extract servlet info ////////////////////////////////////////////////

					var reServlet = /<Context.*path="([^"]*)".*docBase="([^"]*)"/g;
					
					while (match = reServlet.exec(stdout)) {
						context.push({
							'path'    :  match[1],
							'docBase' : match[2]
						});
					}

					// extract tomcat configuration info ///////////////////////////////////

					var reConnector = /<Connector[ \n\t]+port="([^"]*)".*protocol="([^"]*)"/g;
					while (match = reConnector.exec(stdout)) {
						connector.push({
							'port'     :  match[1],
							'protocol' : match[2]
						});
					}
					callback(null, {
						"tomcatConfig" : {
							"context" : context,
							"connector" : connector
						}
					});	
				}

			}
		}).start();		
	};
};


var taskList = [];
//taskList.push(new ssh_listFolders(ssh_config));
//taskList.push(new ssh_loadEntities(ssh_config));
taskList.push(new ssh_extractTomcatconfig(ssh_config,' ./jakarta-tomcat-web/conf/server.xml','web'));

async.parallel(taskList, function(err,result){
	if(err) {
		console.log('error');
		console.error(err);
		return;
	}
	console.log('result');
	console.log(JSON.stringify(result));
	
//	taskList = [];
//	taskList.push(new ssh_listFolders(ssh_config));
//	taskList.push(new ssh_loadEntities(ssh_config));
//	
//	async.series(taskList,function(err,result){
//		if(err) {
//			console.log('error');
//			console.error(err);
//			return;
//		}
//		console.log('result');
//		console.log(result);		
//	});
});