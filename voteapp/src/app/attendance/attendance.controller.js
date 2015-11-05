(function() {
    'use strict';

    angular
        .module('app.attendance')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['$rootScope', 'attendanceService' , 'user'];

    function AttendanceController($rootScope, attendanceService,user) {
        var vm = this;

        vm.attendance = attendanceService.getAttendanceByDay;
        console.log(vm.attendance);
        console.log(attendanceService);

        vm.newResponse = new attendanceService.response();

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