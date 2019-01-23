var createError = require('http-errors');
var express = require('express');
var cors = require('cors');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(process.env.PORT, function() {
  console.log('Server running on port '+process.env.PORT);
});
require('./routes')(app, io);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  module.exports = app;