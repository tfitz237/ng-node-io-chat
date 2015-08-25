(function(){
    "use strict";
    
    angular
        .module('app.chat')
        .controller('ChatCtrl', ChatCtrl);
        
        ChatCtrl.$inject = ['$scope', 'User', '$mdSidenav'];
        
        function ChatCtrl($scope, User, $mdSidenav) {
            var vm = this;
             var socket = io();
             var user;
              socket.on('connect', function() {
                  User.init(socket);
                  vm.messages = [];
                  vm.sendMessage = sendMessage;
                  vm.toggleSidenav = toggleSidenav;
              });
              
              function sendMessage() {
                var message = User.send(vm.msg,vm.to); 
                vm.messages.push(message);
                vm.msg = undefined;
                vm.to = undefined;
                return false;
              }
              
              function toggleSidenav(menuId) {
                  $mdSidenav(menuId).toggle();
                  
              }
              
              
              socket.on('chat message', function(data){
                vm.messages.push({'name': data.id, 'message': data.msg});
                $scope.$apply();
              });
              
              socket.on('user list', function(data){
                  console.log(data);
                  vm.userCount = data.userCount;
                  vm.users = data.users;
                  $scope.$apply();
              });
        }
        
    
})();