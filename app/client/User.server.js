/*
   Server-side User class
*/
function User(io,client) {
    var user = this;
    var client;
    function init() {
        // variables
        client = client;
        user.id = client.id;
        
        
        // functions
        user.send = send;
        user.info = info;
        user.set = set;
        user.get = get;
    }
    
    // Send message
    function send(data) {
        if (typeof data == "string") {
            client.broadcast.emit('chat message', {'msg': data, 'id': user.id});
        }
        else if (typeof data === "object"){
            client.broadcast.to(data.to).emit('chat message',{'msg': data.message, 'id': user.id});
        }
        
    }
    
    function set(vari, val) {
        user[vari] = val;
        
    }
    function get(vari) {
        return user[vari];
    }
    
    // Return user info
    function info() {
        var info = {};
        
        return info;
    }
    
    
    init();
}

module.exports = User;