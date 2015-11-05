(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$rootScope', 'adminService' , 'user'];

    function AdminController($rootScope, adminService,user) {
        var vm = this;

        vm.sessionId ="";

        vm.createSession = adminService.Createsession(vm.sessionId);

        console.log(vm.createSession);

        var obj = {};
        obj = {
            info: {
                choices: ['A', 'B', 'C', 'D'],
                timestamp: Firebase.ServerValue.TIMESTAMP
            }
        };

      //  vm.createSession.$add(obj);


        $rootScope.$on('logout', function() {
            //   vm.parties.$destroy();
        });
    }

})();