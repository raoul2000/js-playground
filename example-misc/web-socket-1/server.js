"user strict";

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});

app.ws('/ws', function(ws, req) {

  //console.log(ws);

  ws.on('message', function(msg) {
    console.log(msg);
    ws.send('hello');
  });

  console.log('socket', req.testing); // set by the middleware
});

app.listen(3000);
