(function() {
    'use strict';

    angular
        .module('app.vote')
        .controller('VoteController', VoteController);

    VoteController.$inject = ['$rootScope', 'voteService' , 'user'];

    function VoteController($rootScope, voteService,user) {
        var vm = this;

        vm.attendance = voteService.getAttendanceByDay(user.uid);
        vm.totalcount = voteService.getAttendanceCount();
        console.log(vm.attendance.length);
        console.log(vm.totalcount.length);

        vm.newResponse = new voteService.response();

        vm.attendanceExists = function() {

            if (!vm.attendance)
            {
                return false;
            }

            return true;
        };

        vm.addParty = function () {
            vm.newResponse.present = true;
            console.log(vm.newResponse);
            vm.attendance.$add(vm.newResponse);
        };

        $rootScope.$on('logout', function() {
            //   vm.parties.$destroy();
        });
    }

})();