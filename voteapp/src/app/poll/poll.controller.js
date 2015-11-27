(function() {
    'use strict';

    angular
        .module('app.poll')
        .controller('PollController', PollController);

    PollController.$inject = ['$rootScope', 'adminService' , 'user' ,'$routeParams','$location'];

    function PollController($rootScope, adminService,user, $routeParams,$location) {

        var vm = this;

        vm.sessionId = "";

        vm.checkSessionId = function (sessionId) {
            var sessionExists =  adminService.SessionExists(sessionId);
            console.log(sessionExists);
            sessionExists.$loaded().then(function() {

                if (sessionExists.length > 0) {

                }
                else
                {
                    $location.path('/poll/' + sessionId);
                }

            });
        };
    }

})();