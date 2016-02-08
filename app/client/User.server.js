/*
   Server-side User class
*/
function User(io,client) {
    var user = this;
    var client;
    function init() {
        // variables
        user.id = client.id;
        
        
        // functions
        user.send = send;
        user.info = info;
        user.set = set;
        user.get = get;
    }
    
    // Send message
    function send(data) {
        data.id = user.id;
        if(typeof data.to === "undefined") {
            client.broadcast.emit('chat message', data );
        } else {
            client.broadcast.to(data.to).emit('chat message',data);
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