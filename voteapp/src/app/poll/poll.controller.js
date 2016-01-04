(function() {
    'use strict';

    angular
        .module('app.poll')
        .controller('PollController', PollController);

    PollController.$inject = ['adminService' , 'user' , '$location', '$routeParams' ,'$uibModal'];

    function PollController(adminService,user, $location, $routeParams,$uibModal) {

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
            console.log($routeParams);
          adminService.CreatePoll(vm.sessionId,vm.choices,vm.maxOptions,vm.question);
        };

        vm.Modal = function () {

            $uibModal.open({
                animation: true,
                templateUrl: 'app/poll/modal.html',
                controller: 'PollModalInstanceCtrl',
                controllerAs: "vm",
                // size: size,
                resolve: {
                    sessionId: function () {
                        return vm.sessionId;
                    }
                    //attendanceInfo: attendanceService.getAttendanceInfoForUser(user.uid,vm.sessionId)

                }
            });
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
                    $location.path('/poll/' + sessionId);
                }
                else
                {


                }
                vm.Modal();
                //$location.path('/poll/' + sessionId);

            });
        };
    }

    angular.module('app.poll').controller('PollModalInstanceCtrl', function ($uibModalInstance,$location,sessionId,adminService) {
        var vm = this;
        vm.dialogTitle = "Warning";
        vm.ok = function () {
            adminService.CreateSession(sessionId);
            $location.path('/poll/' + sessionId);
            $uibModalInstance.close();
        };
        vm.cancel = function () {

            $uibModalInstance.dismiss('cancel');
        };
    });

})();