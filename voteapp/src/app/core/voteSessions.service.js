(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('voteSessionService', partyService);

    voteSessionService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function voteSessionService($firebaseArray, firebaseDataService) {

        var service = {
            getPartiesByUser: getPartiesByUser,
            Party: Party
        };

        return service;

        ////////////

        function getPartiesByUser(uid) {
            return $firebaseArray(firebaseDataService.users.child(uid).child('parties'));
        }

        function Party() {
            this.name = '';
            this.phone = '';
            this.size = '';
            this.done = false;
            this.notified = false;
        }

        function Vote() {
            this.name ='';
            this.options = '';
        }

        function CreateVoteSession() {

        }

        function SessionExists() {

        }





    }

})();