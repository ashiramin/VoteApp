(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('adminService', adminService);

    adminService.$inject = ['$firebaseArray', 'firebaseDataService' , 'voteService'];

    function adminService($firebaseArray, firebaseDataService , voteService) {

        var service = {
            Createsession: CreateSession,
            SessionExists: SessionExists,
            GetTotalCount: GetTotalCounts,


        };

        return service;

        ////////////

        function GetTotalCounts(sessionId)
        {
            //console.log('asdasd');
            //console.log(sessionId);
            return $firebaseArray(voteService.getVotes(sessionId));
        };


        function SessionExists(sessionId){


            return $firebaseArray(firebaseDataService.voteSessions.child(sessionId));


        };

       function CreateSession(sessionId) {
           var obj = {};

           obj[sessionId] = {
               info: {
                   choices: ['A', 'B', 'C', 'D'],
                   maxOptions : 2,
                   timestamp: Firebase.ServerValue.TIMESTAMP
               }
           };

            firebaseDataService.voteSessions.update(obj);


       }


    }

})();
