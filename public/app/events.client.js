 var socket = io();
 var user;
      socket.on('connect', function() {
          user = new User(socket);
      });
      
      $('#messageForm').submit(function(){
        user.send($('#m').val(),$('#to').val()); 
        return false;
      });
      socket.on('chat message', function(data){
        $('#messages').append($('<li>').text(data.id + ": " + data.msg));
      });