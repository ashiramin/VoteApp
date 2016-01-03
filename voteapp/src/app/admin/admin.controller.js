(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['adminService' ,'$routeParams', '$location'];

    function AdminController(adminService,$routeParams,$location) {
        var vm = this;

        vm.sessionId =$routeParams.sessionId !== undefined ? $routeParams.sessionId : "";

        vm.checkSessionId = function (sessionId) {
            var sessionExists =  adminService.SessionExists(sessionId);
            sessionExists.$loaded().then(function() {
                if (sessionExists.length > 0) {
                    $location.path('/admin/' + sessionId);
                }

            });
        };


        if (vm.sessionId != "") {
            vm.users = adminService.getAllUsers();

            vm.usernames = [];

            vm.sessionUsers = adminService.getSessionUsers(vm.sessionId);

            vm.sessionUsers.$watch(function(event) {
                
                var user = vm.users.$getRecord(event.key);
                var timestamp = vm.sessionUsers.$getRecord(event.key).timestamp;
                var obj = {
                    name: user.name,
                    timestamp: new Date(timestamp).toLocaleTimeString(),
                    email: user.email
                };

                vm.usernames.push(obj);

            });
        }


     /*   $rootScope.$on('logout', function() {
            //   vm.parties.$destroy();
        });*/
    }

})();