(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('attendanceService', attendanceService);

    attendanceService.$inject = ['$firebaseArray', 'firebaseDataService','$firebaseObject',];

    function attendanceService($firebaseArray, firebaseDataService,$firebaseObject) {

        var service = {

            getAttendanceByDay: GetAttendanceByDay,
            response: Response,
            getAttendanceCount: GetAttendanceCount,
            get: function() {
                return $firebaseObject(firebaseDataService.attendance.child("11-5-2015").child("b9e4d1e1-aaf9-46a5-bf87-7c482daa1109"))
            }

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