(function() {
    'use strict';

    angular
        .module('app.attendance')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['$rootScope', 'attendanceService' , 'user' , 'adminService', '$location'];

    function AttendanceController($rootScope, attendanceService,user,adminService,$location) {
        var vm = this;

        vm.attendance = attendanceService.getAttendanceByDay(user.uid,"sdsd");
        vm.totalcount = attendanceService.getAttendanceCount("sdsd");
        vm.sessionId = "";

        vm.test = function () {
            console.log("asdsad");
        };

        vm.newResponse = new attendanceService.response();
        vm.count = 0;
        vm.attendanceExists = function() {

            if (vm.attendance.length > 0 )
            {
                return 1;
            }


            return 0;


            //console.log("Call");



            //
            // attendanceService.getAttendanceForUser(user.uid);

        };

        vm.checkSessionId = function(sessionId) {
            vm.abc = adminService.SessionExists(sessionId);
            vm.abc.$loaded().then(function()
            {

                if (vm.abc.length > 0)
                {
                    vm.error = "";
                    vm.newResponse.present = true;
                    if (vm.attendanceExists() == 0) {
                        //vm.attendance.$add(vm.newResponse);
                        attendanceService.takeUserAttendance(user.uid,sessionId);
                    }
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


        };

        $rootScope.$on('logout', function() {
         //   vm.parties.$destroy();
        });
    }

})();