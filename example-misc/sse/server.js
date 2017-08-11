var express = require('express')
var serveStatic = require('serve-static')
var SSE = require('sse')

var app = express()
app.use(serveStatic(__dirname))


app.get('/ping', function(req, res, next){
  res.json({ message: 'pong' });
});

/*
app.get('/my-sse', function(req, res, next){
  console.log("do something");
  next();
});
*/

var server = app.listen(8888, function (err) {
  if (err) throw err
  console.log('server ready on http://localhost:8888')
})

var sse = new SSE(server, {
  path   : '/my-sse'
});

sse.on('connection', function (connection) {
  console.log('new connection')
  var pusher = setInterval(function () {
    connection.send({
      event: 'server-time',
      data: new Date().toTimeString()
    })
  }, 1000)

  connection.on('close', function () {
    console.log('lost connection')
    clearInterval(pusher)
  })
})
