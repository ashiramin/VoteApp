(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('attendanceService', attendanceService);

    attendanceService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function attendanceService($firebaseArray, firebaseDataService) {

        var service = {

            getAttendanceByDay: GetAttendanceByDay(),
            response: Response,
            getAttendanceCount: GetAttendanceCount()

        };

        return service;

        ////////////

        function GetAttendanceByDay(){
            return $firebaseArray(firebaseDataService.attendance.child("Monday"));
        }

        function GetAttendanceCount(){
            return $firebaseArray(firebaseDataService.attendance.child("Monday"));
        }

        function Response() {
            this.present = false;
            
        }
    }

})();