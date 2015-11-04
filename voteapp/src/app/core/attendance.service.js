(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('attendanceService', attendanceService);

    attendanceService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function attendanceService($firebaseArray, firebaseDataService) {

        var service = {

            response: Response
        };

        return service;

        ////////////

       

        function Response() {
            this.yes = '';
            this.no ='';
            
        }
    }

})();