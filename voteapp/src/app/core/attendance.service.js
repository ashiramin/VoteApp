(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('attendanceService', attendanceService);

    attendanceService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function attendanceService($firebaseArray, firebaseDataService) {

        var service = {

            getAttendanceByDay: GetAttendanceByDay,
            response: Response,
            getAttendanceCount: GetAttendanceCount

        };

        return service;

        ////////////

        function getDate()
        {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            var datetoday = mm + "-" + dd + "-" + yyyy;
            return datetoday;
        }

        function GetAttendanceByDay(uid){


            var datetoday = getDate();

            return $firebaseArray(firebaseDataService.attendance.child(datetoday).child(uid));
        }

        function GetAttendanceCount(){
            var datetoday = getDate();
            return $firebaseArray(firebaseDataService.attendance.child(datetoday));
        }

        function Response() {
            this.present = false;
            
        }
    }

})();