(function() {
    'use strict';

    angular
        .module('app.attendance')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['$rootScope', 'attendanceService' , 'user' , 'adminService', '$location' ,'$q'];

    function AttendanceController($rootScope, attendanceService,user,adminService,$location,$q) {
        var vm = this;
        vm.sessionId = "";

        vm.totalcount = attendanceService.getAttendanceCount("sdsd");


        vm.test = function () {
            console.log("asdsad");
        };

        vm.newResponse = new attendanceService.response();
        vm.count = 0;
        vm.attendanceExists = function() {
            var defered = $q.defer();
            vm.attendance.$loaded().then(function () {
                console.log(vm.attendance.length);
                if (vm.attendance.length > 0 )
                {
                    defered.reject("ATTENDANCE_REQUIRED");
                }


                defered.resolve();
            });

            return defered.promise;

        };

        vm.checkSessionId = function(sessionId) {
            vm.abc = adminService.SessionExists(sessionId);
            vm.abc.$loaded().then(function()
            {
                vm.attendance = attendanceService.getAttendanceByDay(user.uid,vm.sessionId);

                if (vm.abc.length > 0)
                {
                    vm.error = "";
                    vm.newResponse.present = true;
                    //console.log(vm.attendanceExists());
                    vm.attendanceExists().then(function () {
                       // $location.path('/vote/' + sessionId);
                        console.log("hello");
                        attendanceService.takeUserAttendance(user.uid,sessionId);
                        $location.path('/vote/' + sessionId);
                    }, function (error) {
                        $location.path('/vote/' + sessionId);
                        console.log(error);

                    });


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