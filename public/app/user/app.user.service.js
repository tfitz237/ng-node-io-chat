(function(){
    "use strict";
    
    angular
        .module('app.user')
        .factory('User', User);
        
        function User() {
            var user = this;
            
            return {send: send, init: init,set:set,get:get};
            
            
            function init(socket) {
                user.id = socket.id;
                user.send = send;
                user.socket = socket;
            }
    
            function send(message,to) {
                var data = {
                    message: message,
                    to:to,
                    sentAt: new Date()
                };
                user.socket.emit('chat message', data);
                data.from = user.name;
                return data;
            }
            
            function set(vari,val) {
                user[vari] = val;
                user.socket.emit('user set', {'vari': vari, 'val': val});
                
            }
            function get(vari) {
                return user[vari];
            }
            
            
        }
    
})();