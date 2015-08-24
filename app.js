var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clientSocketReq = require('./app/client/events.server.js');
var clientSocket = new clientSocketReq(io);

//scripts
app.use('/socketio', express.static('node_modules/socket.io/node_modules/socket.io-client'));
// js files
app.use('/app',express.static('public/app'));
// static index
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', clientSocket.connection);

http.listen(process.env.PORT, process.env.IP, function () {
  var host = this.address().address;
  var port = this.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});