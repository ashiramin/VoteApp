(function() {
  'use strict';

  angular
    .module('app.waitList')
    .controller('WaitListController', WaitListController);

  WaitListController.$inject = ['$rootScope', 'partyService', 'user'];

  function WaitListController($rootScope, partyService, user) {
    var vm = this;

    vm.parties = partyService.getPartiesByUser(user.uid);

    console.log(vm.parties.length);

    $rootScope.$on('logout', function() {
      vm.parties.$destroy();
    });
  }

})();
