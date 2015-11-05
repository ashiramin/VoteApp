(function() {
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
            resolve: {user: resolveUser}
        });
    }

    resolveUser.$inject = ['authService'];

    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireAuth();
    }

})();
