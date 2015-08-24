/*
    Server-side clientSocket event logic
*/
var User = require("./User.server.js");
// object of currently connected users
var usr = {};

function clientSocket(io) {
    var self = this;
    self.connection = connection;

    
    function connection(client) {
       
        // Create user based on client
        usr[client.id] = new User(io, client);
        console.log('usr[' + usr[client.id].id + '] connected');
        
        client.on('disconnect', function(){
            console.log('user disconnected');
        });
        
        client.on('chat message', usr[client.id].send);
    }
}


module.exports = clientSocket;