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

    function updateUserList() {
        userCount = Object.keys(usr).length;
        io.emit('user list', {'userCount': userCount, 'users': usr});
    }
    
    function connection(client) {
        // Create User based on client
        usr[client.id] = new User(io, client);
        updateUserList();
        console.log('usr[' + usr[client.id].id + '] connected');
        
        client.on('disconnect', function(){
            delete usr[client.id];
            updateUserList();
            console.log('user disconnected');
        });
        
        client.on('chat message', usr[client.id].send);
        
        client.on('user set', function(d) {
            console.log('setting user variable: ' +d.vari);
            usr[client.id].set(d.vari,d.val);
            updateUserList();
        });
    }
}


module.exports = clientSocket;