(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('attendanceService', attendanceService);

    attendanceService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function attendanceService($firebaseArray, firebaseDataService) {

        var service = {

            response: response
        };

        return service;

        ////////////

       

        function response() {
            this.yes = '';
            this.no ='';
            
        }
    }

})();