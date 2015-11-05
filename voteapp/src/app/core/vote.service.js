(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('voteService', voteService);

    voteService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function voteService($firebaseArray, firebaseDataService) {


        var votes = ['A','B','C','D'];
        var service = {

            getVotes: getVotes,
            vote: votes

        };

        return service;

        ////////////

        function getVotes(sessionId) {
            return firebaseDataService.voteSessions.child(sessionId).child("votes");
        }




    }

})();