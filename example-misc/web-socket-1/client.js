"user strict";


const WebSocket = require('ws');

const ws = new WebSocket('ws://127.0.0.1:3000/ws');

ws.on('open', function open() {
  ws.send('message from the client');
});

ws.on('message', function incoming(data) {
  console.log("received :",data);
});

ws.on('close', function close() {
  console.log('disconnected');
});
