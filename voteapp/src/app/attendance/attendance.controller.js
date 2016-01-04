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




        vm.checkSessionId = function(sessionId) {
            vm.abc = adminService.SessionExists(sessionId);

            vm.attendanceInfo = attendanceService.getAttendanceInfoForUser(user.uid,vm.sessionId);


            vm.abc.$loaded().then(function()
            {
                vm.attendance = attendanceService.getAttendanceByDay(user.uid,vm.sessionId);

                if (vm.abc.length > 0)
                {
                    vm.error = "";
                    vm.newResponse.present = true;
                    //console.log(vm.attendanceExists());
                    vm.attendanceInfo.then(function(data) {
                        console.log(data);
                        if (data == null) {
                            attendanceService.takeUserAttendance(user.uid,sessionId);
                            $location.path('/vote/' + sessionId);
                        }
                        else if (data.locked) {
                            vm.error = "You have been locked out. Please ask to be let back in"
                        }
                        else if(data) {
                            $location.path('/vote/' + sessionId);
                        }
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