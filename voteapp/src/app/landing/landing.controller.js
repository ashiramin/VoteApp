(function () {
  'use strict';

  angular
    .module('app.landing')
    .controller('LandingController', LandingController);

  LandingController.$inject = ['$rootScope', 'authService' , 'user'];

  function LandingController($rootScope, authService,user) {
    var vm = this;
    console.log(user);
    vm.isAdmin = user;
    vm.isLoggedIn = authService.isLoggedIn;



  }

})();
