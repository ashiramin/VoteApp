(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('attendanceService', attendanceService);

    attendanceService.$inject = ['$firebaseArray', 'firebaseDataService','$firebaseObject','$q'];

    function attendanceService($firebaseArray, firebaseDataService,$firebaseObject,$q) {

        var service = {

            getAttendanceByDay: GetAttendanceByDay,
            response: Response,
            getAttendanceCount: GetAttendanceCount,
            getAttendanceForUser: GetAttendanceForUser,
            takeUserAttendance: TakeUserAttendance

        };


        return service;
        ////////////

        function GetAttendanceForUser(uid,sessionId)
        {
            var datetoday = getDate();

            var attendanceRecord = firebaseDataService.attendance.child(sessionId).child(uid);
            var defered = $q.defer();


                attendanceRecord.once("value", function (snapshot) {

                    //
                    if (snapshot.exists())
                    {
                        console.log(snapshot.val());
                        defered.resolve();
                    }
                    else
                    {
                        defered.reject("ATTENDANCE_REQUIRED");
                    }
                    //
                    //return 1;

                });


           // return 1;
            return defered.promise;




        }


        function TakeUserAttendance(uid,sessionId)
        {
            var ref = firebaseDataService.attendance.child(sessionId);

            var obj = {};

            obj[uid] = {
                present : true
            };

            ref.update(obj);
        }


        function getDate()
        {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            var datetoday = mm + "-" + dd + "-" + yyyy;
            return datetoday;
        }

        function GetAttendanceByDay(uid,sessionId){


            var datetoday = getDate();

            return $firebaseArray(firebaseDataService.attendance.child(sessionId).child(uid));
        }

        function GetAttendanceCount(sessionId){
            var datetoday = getDate();
            return $firebaseArray(firebaseDataService.attendance.child(sessionId));
        }

        function Response() {
            this.present = false;
            
        }



    }

})();