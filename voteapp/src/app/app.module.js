(function () {
  'use strict';

  angular
    .module('app', [
      // Angular modules.
      'ngAnimate',

      'ui.router',
      'ngRoute',

      // Third party modules.
      'firebase',
      'chart.js',
      'ui.bootstrap',

      // Custom modules.

      'app.auth',
      'app.core',
      'app.landing',
      'app.layout',
      //   'app.waitList',
      'app.attendance',
      'app.vote',
      'app.admin',
      'app.results',
      'app.poll',
      'app.settings'


    ])
    .config(configFunction)
    .run(runFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }

  runFunction.$inject = ['$rootScope', '$location', 'authService'];

  function runFunction($rootScope, $location, authService) {
    $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
      if (error === "AUTH_REQUIRED") {
        $location.path('/');
      }

      if (error === "ATTENDANCE_REQUIRED") {
        $location.path('/attendance');
      }


    });

    $rootScope.$on('lockuser', function () {
      $location.path('/attendance');

    });

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
      if (authService.firebaseAuthObject.$waitForAuth() && ($location.url() !='/' || $location.url() !='/login' || $location.url() !='/register')) {
        authService.firebaseAuthObject.$waitForAuth().then(function (data) {
          if (data != null) {
            authService.isUrlAllowed(data.uid,$location.url()).then(function (userData) {
              if (userData == -1) {
                $location.path("/")
              }
            })
          }
        });
      }
    });

  }

})();