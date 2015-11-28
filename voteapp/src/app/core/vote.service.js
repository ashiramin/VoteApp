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
            vote: votes,
            getPolls: getPolls

        };

        return service;

        ////////////

        function getVotes(sessionId) {
            console.log(firebaseDataService.voteSessions.child(sessionId).child("votes"));
            return firebaseDataService.voteSessions.child(sessionId);
        }

        function getPolls(sessionId) {
            return $firebaseArray(firebaseDataService.voteSessions.child(sessionId));
        }




    }

})();