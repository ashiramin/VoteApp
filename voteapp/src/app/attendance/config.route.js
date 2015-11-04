(function() {
    'use strict';

    angular
        .module('app.attendance')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.when('/abc', {
            templateUrl: 'app/attendance/attendance.html',
          //  controller: 'AttendanceController',
           // controllerAs: 'vm'

        });
    }

    resolveUser.$inject = ['authService'];

    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireAuth();
    }

})();
