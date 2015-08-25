/*
    Server-side clientSocket event logic
*/
var User = require("./User.server.js");
// object of currently connected users
var usr = {};
var userCount = 0;
function clientSocket(io) {
    var self = this;
    self.connection = connection;

    function userList() {
        userCount = Object.keys(usr).length;
        io.emit('user list', {'userCount': userCount, 'users': usr});
    }
    
    
    function connection(client) {
        
       
        // Create user based on client
        usr[client.id] = new User(io, client);
        userList();
       

        console.log('usr[' + usr[client.id].id + '] connected');
        
        client.on('disconnect', function(){
            delete usr[client.id];
            userList();
            
            console.log('user disconnected');
        });
        
        client.on('chat message', usr[client.id].send);
        
        
    }
}


module.exports = clientSocket;