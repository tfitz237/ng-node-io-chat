(function(){
    "use strict";
    
    angular
        .module('app.chat')
        .controller('ChatCtrl', ChatCtrl);
        
        ChatCtrl.$inject = ['$scope', 'User', '$mdSidenav', '$filter'];
        
        function ChatCtrl($scope, User, $mdSidenav, $filter) {
            var vm = this;
            var socket = io();
            var user;
            socket.on('connect', function() {
                User.init(socket);
                var username = prompt("Please enter your name");
                User.set('name',username);
                vm.messages = [];
                vm.sendMessage = sendMessage;
                vm.toggleSidenav = toggleSidenav;
                vm.sendPM = sendPM;
                vm.clickName = clickName;
            });
              
            function sendMessage() {
                var message;
                if(vm.msg.length > 0) {
                    if(typeof vm.to !== "undefined") {
                        var to = findInObject(vm.users, 'name', vm.to);
                        console.log(to.id);
                        message = User.send(vm.msg,to.id); 
                    }
                    else message = User.send(vm.msg,vm.to);
                vm.messages.push(message);
                vm.msg = undefined;
                vm.to = undefined;
                }
                return false;
            }
              
            function toggleSidenav(menuId) {
                $mdSidenav(menuId).toggle();
            }
              
            function sendPM(id) {
                vm.to = id;
            }  
              
              
            socket.on('chat message', function(data){
                vm.messages.push({'name': vm.users[data.id].name, 'message': data.msg});
                $scope.$apply();
            });
              
            socket.on('user list', function(data){
                vm.userCount = data.userCount;
                vm.users = data.users;
                $scope.$apply();
            });
            
            function clickName(name) {
                if(User.get('name') == name)  {
                    var newname = prompt("New name:");
                    changeUserName(newname);
                
                    
                } else 
                    sendPM(name);
                
            
            }
            
            function changeUserName(name) {
                User.set('name', name);
            }
        
            
            
        }
        
        
        
        
        
        function findInObject(obj,vari,val) {
                for (var i in obj) {
                if (obj[i][vari] == val) return obj[i];
            }
            return false;
        }
})();