(function() {
    'use strict';

    angular
        .module('app.poll')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {

        $routeProvider
            .when('/poll', {
            templateUrl: 'app/poll/poll.html',
            controller: 'PollController',
            controllerAs: 'vm',
            resolve: {user: resolveUser}
        })
        .when('/poll/:sessionId', {
            templateUrl: 'app/poll/create-poll.html',
            controller: 'PollController',
            controllerAs: 'vm',
            resolve: {user: resolveUser}
        });


    }

    resolveUser.$inject = ['authService'];

    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireAuth();
    }

})();
