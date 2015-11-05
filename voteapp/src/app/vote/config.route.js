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
        console.log(vm.attendance.length);
        console.log(vm.totalcount.length);

        vm.newResponse = new attendanceService.response();

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