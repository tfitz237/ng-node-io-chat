(function(){
    "use strict";
    
    angular
        .module('app.chat')
        .controller('ChatCtrl', ChatCtrl);
        
        ChatCtrl.$inject = ['$scope', 'User', '$mdSidenav', '$filter'];
        
        function ChatCtrl($scope, User, $mdSidenav, $filter) {
            var ctrl = this;
            var socket = io();
            var user;
            socket.on('connect', function() {
                User.init(socket);
                var username = prompt("Please enter your name");
                User.set('name',username);
                ctrl.messages = [];
                ctrl.sendMessage = sendMessage;
                ctrl.toggleSidenav = toggleSidenav;
                ctrl.sendPM = sendPM;
                ctrl.clickName = clickName;
            });
              
            function sendMessage() {
                var data;
                if(ctrl.msg.length > 0) {
                    if(typeof ctrl.to !== "undefined") {
                        var to = findInObject(ctrl.users, 'name', ctrl.to);
                        data = User.send(ctrl.msg,to.id); 
                    } else {
                        data = User.send(ctrl.msg,ctrl.to);
                    }
                ctrl.messages.push(data);
                ctrl.msg = undefined;
                ctrl.to = undefined;
                }
                return false;
            }
              
            function toggleSidenav(menuId) {
                $mdSidenav(menuId).toggle();
            }
              
            function sendPM(id) {
                ctrl.to = id;
            }  
              
              
            socket.on('chat message', function(data){
                data.name = ctrl.users[data.id].name;
                ctrl.messages.push(data);
                $scope.$apply();
            });
              
            socket.on('user list', function(data){
                ctrl.userCount = data.userCount;
                ctrl.users = data.users;
                $scope.$apply();
            });
            
            function clickName(name) {
                if(User.get('name') == name)  {
                    var newname = prompt("New name:");
                    User.set('name', newname);
                
                    
                } else {
                    sendPM(name);
                }
                
            
            }
            

        
            
            
        }
        
        
        
        
        
        function findInObject(obj,vari,val) {
                for (var i in obj) {
                if (obj[i][vari] == val) return obj[i];
            }
            return false;
        }
})();