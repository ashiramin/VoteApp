(function() {
    'use strict';

    angular
        .module('app.attendance')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['$rootScope', 'attendanceService' , 'user'];

    function AttendanceController($rootScope, attendanceService,user) {
        var vm = this;

        vm.attendance = attendanceService.getAttendanceByDay(user.uid);
        vm.totalcount = attendanceService.getAttendanceCount();


        vm.newResponse = new attendanceService.response();

        vm.attendanceExists = function() {

            if (vm.attendance.length > 0 )
            {
                return 1;
            }

            return 0;
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