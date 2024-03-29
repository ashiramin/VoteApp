(function () {
  'use strict';

  angular
    .module('app.vote')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/vote/:sessionId', {
      templateUrl: 'app/vote/vote.html',
      controller: 'VoteController',
      controllerAs: 'vm',
      resolve: {
        user: resolveUser,
        attendance: hasAttendance

      }
    });

    $routeProvider.when('/vote/:sessionId/confirmation', {
      templateUrl: 'app/vote/confirmation.html',

    });
  }

  resolveUser.$inject = ['authService'];
  hasAttendance.$inject = ['authService', '$q', 'attendanceService', '$timeout', '$route'];

  function hasAttendance(authService, $q, attendanceService, $timeout, $route) {

    var uid = authService.firebaseAuthObject.$getAuth().uid;
    var atted = attendanceService.getAttendanceForUser(uid, $route.current.params.sessionId);
    return atted;


  }

  function resolveUser(authService) {
    return authService.firebaseAuthObject.$requireAuth();
  }

})();