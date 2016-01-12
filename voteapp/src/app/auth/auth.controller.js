(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$location', 'authService'];

  function AuthController($location, authService) {
    var vm = this;

    vm.register = register;
    vm.login = login;
    vm.resetPassword = resetPassword;

    function register(user) {

      return authService.register(user)
        .then(function() {
          return vm.login(user);
        })
        .then(function() {
            return authService.storeUserData(user);
        })
        .catch(function(error) {

          vm.error = error;
        });
    }


    function resetPassword(email) {
      authService.resetPassword(email)
        .then(function (response) {
          vm.error = response;
        })
        .catch(function (error) {
          vm.error= error;
        })
    }

    function login(user) {

      return authService.login(user)
        .then(function(response) {
          $location.path('/attendance');
          return response;
        })
        .catch(function(error) {
          vm.error = error;
        });
    }

  }

})();