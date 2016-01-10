(function() {
  'use strict';

  angular
    .module('app.settings')
    .controller('SettingsController', SettingsController);
  SettingsController.$inject = ['$rootScope', 'user', 'authService'];

  function SettingsController($rootScope, user,authService) {
    var vm = this;
    vm.success = false;

    vm.changePassword = function () {

      authService.changePassword(user.password.email,vm.oldPassword,vm.newPassword)
        .then(function (success) {
          vm.success = true;
          vm.message = "Password changed successfully";
          vm.oldPassword = vm.newPassword = "";
        }).catch(function (error) {
          vm.success = false;
          vm.message = error;

          console.log(vm.message);
        });

    };

    $rootScope.$on('logout', function() {

    });
  }

})();
