/*
    Client-side User class

*/

function User(socket) {
    var user = this;
    
    function init() {
        user.id = socket.id;
        user.send = send;
    }
    
    function send(message,to) {
         if(to == '') {
            socket.emit('chat message', message);
            }
        else {
            socket.emit('chat message', {'message': message, 'to': to});
        }
    
        // Clean up
        $('#m').val(''); 
        $('#to').val('');
        $('#messages').append($('<li>').text(user.id + ": " + message));
    }
    
    init();
}