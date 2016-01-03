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




            //console.log("Call");



            //
            // attendanceService.getAttendanceForUser(user.uid);

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
                        attendanceService.takeUserAttendance(user.uid,sessionId);
                    });
                    if (vm.attendanceExists() == 0) {
                        //vm.attendance.$add(vm.newResponse);

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