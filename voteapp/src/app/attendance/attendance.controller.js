(function() {
    'use strict';

    angular
        .module('app.attendance')
        .controller('AttendanceController', AttendanceController);

    AttendanceController.$inject = ['$rootScope', 'partyService' , 'user'];

    function AttendanceController($rootScope, partyService,user) {
        var vm = this;

        vm.parties = partyService.getPartiesByUser(user.uid);

        $rootScope.$on('logout', function() {
            vm.parties.$destroy();
        });
    }

})();