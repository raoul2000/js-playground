'use strict';
var Client = require('ftp');
var path = require('path');

// coopy file ./package.json to FTP home folder and rename
// to "remote-package.json"

var c = new Client();
c.on('ready', function() {
  console.log("ready");

  c.cwd("upload",function(err){
    if (err) throw err;

    console.log("CWD : ok");
    c.put( path.join(__dirname, "package.json"), 'remote-package.json', function(err) {
      if (err) throw err;
      console.log("done");
      c.end();
    });
  });
});

// connect to localhost:21 as anonymous
c.connect({
  "host" : "XXXXX",
  "user" : "XXXXX",
  "password" : "XXXXX"
});
