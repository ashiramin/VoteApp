(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('adminService', adminService);

    adminService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function adminService($firebaseArray, firebaseDataService) {

        var service = {
            Createsession: CreateSession,
            SessionExists: SessionExists

        };

        return service;

        ////////////

        function SessionExists(sessionId){


            return $firebaseArray(firebaseDataService.voteSessions.child(sessionId));


        };

       function CreateSession(sessionId) {
           var obj = {};
           obj["sdsd"] = {
               info: {
                   choices: ['A', 'B', 'C', 'D'],
                   timestamp: Firebase.ServerValue.TIMESTAMP
               }
           };

            firebaseDataService.voteSessions.update(obj);


       }
    }

})();
