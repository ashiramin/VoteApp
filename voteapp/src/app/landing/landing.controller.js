(function() {
    'use strict';

    angular
        .module('app.landing')
        .controller('LandingController', LandingController);

    LandingController.$inject = ['$rootScope','authService'];

    function LandingController($rootScope,authService) {
        var vm = this;

        vm.isLoggedIn = authService.isLoggedIn;

    }

})();
