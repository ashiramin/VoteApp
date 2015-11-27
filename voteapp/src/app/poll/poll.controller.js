(function() {
    'use strict';

    angular
        .module('app.poll')
        .controller('PollController', PollController);

    PollController.$inject = ['$rootScope', 'adminService' , 'user' ,'$routeParams','$location'];

    function PollController($rootScope, adminService,user, $routeParams,$location) {

        var vm = this;

        vm.sessionId = "hello";

        vm.option = "";

        vm.maxOptions = 1;

        vm.choices = [];

        vm.addChoices = function (option) {
            vm.choices.push(option);
            vm.option = "";
        };

        vm.createPoll = function () {
          adminService.CreatePoll(vm.sessionId,vm.choices,vm.maxOptions);
        };

        // TODO: Fix delete function
        vm.deletechoice = function(choice)
        {

            var i = vm.choices.indexOf(choice);
            if(i != -1) {
                console.log('sdsd');
               vm.choices =  vm.choices.splice(i, 1);
            }
        };

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