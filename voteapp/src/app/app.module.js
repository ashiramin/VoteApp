(function () {
    'use strict';

    angular
        .module('app', [
            // Angular modules.
            'ngRoute',

            // Third party modules.
            'firebase',
            'chart.js',

            // Custom modules.

            'app.auth',
            'app.core',
            'app.landing',
            'app.layout',
         //   'app.waitList',
            'app.attendance',
            'app.vote',
            'app.admin',
            'app.results'



        ])
        .config(configFunction)
        .run(runFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }

    runFunction.$inject = ['$rootScope', '$location'];

    function runFunction($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
            if (error === "AUTH_REQUIRED") {
                $location.path('/');
            }

            if (error === "ATTENDANCE_REQ") {
                $location.path('/attendance');
            }


        });
    }

})();