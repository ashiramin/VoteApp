(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('attendanceService', attendanceService);

    attendanceService.$inject = ['$rootScope','$firebaseArray', 'firebaseDataService','$firebaseObject','$q'];

    function attendanceService($rootScope,$firebaseArray, firebaseDataService,$firebaseObject,$q) {

        var service = {

            getAttendanceByDay: GetAttendanceByDay,
            response: Response,
            getAttendanceCount: GetAttendanceCount,
            getAttendanceForUser: GetAttendanceForUser,
            takeUserAttendance: TakeUserAttendance,
            lockUser: lockUser
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
                    if (snapshot.exists() && !snapshot.val().locked)
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


        function lockUser(uid,sessionId,message) {
            var ref = firebaseDataService.attendance.child(sessionId).child(uid);
            ref.update({ locked: true, message: message });
            $rootScope.$broadcast('lockuser');
        }


        function TakeUserAttendance(uid,sessionId)
        {
            var ref = firebaseDataService.attendance.child(sessionId);

            var obj = {};

            obj[uid] = {
                present : true,
                locked: false,
                timestamp: Firebase.ServerValue.TIMESTAMP

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