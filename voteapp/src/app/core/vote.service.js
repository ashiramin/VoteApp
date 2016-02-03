(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('voteService', voteService);

    voteService.$inject = ['$firebaseArray', 'firebaseDataService', '$firebaseObject', '$q'];

    function voteService($firebaseArray, firebaseDataService, $firebaseObject,$q) {


        var votes = ['A','B','C','D'];
        var service = {

            getVotes: getVotes,
            vote: votes,
            getPolls: getPolls,
          saveVotes: saveVote

        };

        return service;

        ////////////

        function getVotes(sessionId) {

            return firebaseDataService.voteSessions.child(sessionId);
        }

        function getPolls(sessionId) {

            return $firebaseArray(firebaseDataService.voteSessions.child(sessionId));
        }


      function saveVote(sessionId,obj,id) {
        var onComplete = function(error) {
          if (error) {
            defered.reject();
          } else {
            defered.resolve();
          }
        };
        var defered = $q.defer();
        firebaseDataService.voteSessions.child(sessionId).child(id).child("votes").update(obj,onComplete)

        return defered.promise;
      }




    }

})();