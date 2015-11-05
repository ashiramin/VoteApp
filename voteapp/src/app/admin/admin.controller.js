(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$rootScope', 'adminService' , 'user'];

    function AdminController($rootScope, adminService,user) {
        var vm = this;

        vm.attendance = adminService.getAttendanceByDay(user.uid);
        vm.totalcount = adminService.getAttendanceCount();
        console.log(vm.attendance.length);
        console.log(vm.totalcount.length);

        vm.newResponse = new adminService.response();

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