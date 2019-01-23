
const util = require('util');
var request = require("request");

module.exports = function(app,io){
    // Initialize a new socket.io application.
    /*
        create Event - Request to join a room
        new message Event - Send message to user
        rec message Event - receive / broadcast message over sokcet connection
        typing Event - User typing message over socket connection
        disconnect Event - Triggered when user disconnects from chat screen
    */
    io.sockets.on('connection', function(socket) {
        socket.on('create', function (room) {
            socket.join(room);
        });
        socket.on('new_message',function(data){
            socket.broadcast.to(data.chat_id).emit('rec_message', {message: data.message, chat_id: data.chat_id,user_id:data.user_id});
        });
        socket.on('typing',function(data){
            socket.broadcast.to(data.chat_id).emit('typing',data);
        });
        socket.on('stop_typing',function(data){
            socket.broadcast.to(data.chat_id).emit('stop_typing', data);
        });
        socket.on('disconnect', function () {
          console.log('Disconnected');
        });
      });
};
