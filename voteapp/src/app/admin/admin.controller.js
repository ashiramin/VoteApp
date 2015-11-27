(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$rootScope', 'adminService' , 'user'];

    function AdminController(adminService,user) {
        var vm = this;

        vm.sessionId ="";

        vm.createSession = function() {
            console.log("sadasd");
            adminService.Createsession(vm.sessionId);
        };

        vm.votes =  adminService.getTotalCount;

        vm.A = 0;
        vm.B = 0;
        vm.C = 0;
        vm.D = 0;





        var obj = {};
        obj = {
            info: {
                choices: ['A', 'B', 'C', 'D'],
                timestamp: Firebase.ServerValue.TIMESTAMP
            }
        };

      //  vm.createSession.$add(obj);


     /*   $rootScope.$on('logout', function() {
            //   vm.parties.$destroy();
        });*/
    }

})();