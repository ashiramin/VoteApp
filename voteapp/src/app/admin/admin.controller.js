(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$rootScope', 'adminService' , 'user'];

    function AdminController($rootScope, adminService,user) {
        var vm = this;

        vm.sessionId ="";

        vm.createSession = function() {
            adminService.Createsession(vm.sessionId);
        };

        vm.votes =  adminService.getTotalCount;

        vm.A = 0;
        vm.B = 0;
        vm.C = 0;
        vm.D = 0;

        vm.votes.$watch(function (event) {
            console.log(event);

            vm.A = 0;
            vm.B = 0;
            vm.C = 0;
            vm.D = 0;

            angular.forEach(vm.votes, function(vote) {
                console.log(vote);
                if (vote.$value == "A")
                {
                    vm.A++
                }
                else if (vote.$value == "B")
                {
                    vm.B++
                }
                else if (vote.$value == "C")
                {
                    vm.C++
                }
                else
                {
                    vm.D++
                }
            })
        });



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