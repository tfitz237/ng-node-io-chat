(function(){
    "use strict";
    
    angular
        .module('app.user')
        .factory('User', User);
        
        function User() {
            var user = this;
            
            return {send: send, init: init};
            
            
            function init(socket) {
                user.id = socket.id;
                user.send = send;
                user.socket = socket;
            }
    
            function send(message,to) {
                 if(typeof to === "undefined") {
                    user.socket.emit('chat message', message);
                    }
                else {
                    user.socket.emit('chat message', {'message': message, 'to': to});
                }
            
                // Clean up
                return {'name': user.id, 'message': message };
            }
            
            
            
        }
    
})();