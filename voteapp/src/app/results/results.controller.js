(function() {
    'use strict';

    angular
        .module('app.results')
        .controller('ResultsController', ResultsController);

    ResultsController.$inject = ['$rootScope', 'adminService' , 'user' ,'$routeParams'];

    function ResultsController($rootScope, adminService,user, $routeParams) {
        var vm = this;

        vm.votes =  adminService.GetTotalCount($routeParams.sessionId);

        vm.labels = ['A', 'B', 'C', 'D'];
       // vm.series = ['Series A', 'Series B'];


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
            });

            vm.data = [
                [vm.A, vm.B, vm.C, vm.D]

            ];
        });

        $rootScope.$on('logout', function() {
            //   vm.parties.$destroy();
        });
    }

})();