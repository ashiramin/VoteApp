(function() {
    'use strict';

    angular
        .module('app.attendance')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['$rootScope', 'attendanceService' , 'user' , 'adminService', '$location'];

    function AttendanceController($rootScope, attendanceService,user,adminService,$location) {
        var vm = this;

        vm.attendance = attendanceService.getAttendanceByDay(user.uid);
        vm.totalcount = attendanceService.getAttendanceCount();
        vm.sessionId = "";

        vm.newResponse = new attendanceService.response();

        vm.attendanceExists = function() {

            if (vm.attendance.length > 0 )
            {
                return 1;
            }

            return 0;
        };

        vm.checkSessionId = function(sessionId) {
            vm.abc = adminService.SessionExists(sessionId);
            vm.abc.$loaded().then(function()
            {

                if (vm.abc.length > 0)
                {
                    vm.error = "";
                    $location.path('/vote/' + sessionId);
                }
                else
                {
                    vm.error = "Invalid";
                }

            });
            //console.log(abc);

        };

        vm.addParty = function () {

            vm.newResponse.present = true;

            vm.attendance.$add(vm.newResponse);
        };

        $rootScope.$on('logout', function() {
         //   vm.parties.$destroy();
        });
    }

})();