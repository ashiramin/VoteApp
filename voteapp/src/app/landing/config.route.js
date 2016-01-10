(function () {
  'use strict';

  angular
    .module('app.landing')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingController',
      controllerAs: 'vm',
      resolve: {user: resolveUser}
    });
  }

  resolveUser.$inject = ['authService'];

  function resolveUser(authService) {
    if (authService.firebaseAuthObject.$getAuth() != null) {
      var uid = authService.firebaseAuthObject.$getAuth().uid;
      return authService.isUserAdmin(uid);
    }
    return false;

  }

})();