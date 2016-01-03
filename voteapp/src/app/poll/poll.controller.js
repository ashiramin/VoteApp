(function() {
    'use strict';

    angular
        .module('app.poll')
        .controller('PollController', PollController);

    PollController.$inject = ['$rootScope', 'adminService' , 'user' ,'$routeParams','$location'];

    function PollController(adminService,user, $routeParams,$location) {

        var vm = this;

        vm.sessionId = $routeParams.sessionId;
       // console.log($routeParams);
        vm.option = "";

        vm.maxOptions = 1;

        vm.choices = [];

        vm.question = "";

        vm.addChoices = function (option) {
            vm.choices.push(option);
            vm.option = "";
        };

        vm.createPoll = function () {
          adminService.CreatePoll(vm.sessionId,vm.choices,vm.maxOptions,vm.question);
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