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
            getAttendanceForUser: GetAttendanceForUser

        };


        return service;
        ////////////

        function GetAttendanceForUser(uid)
        {
            var datetoday = getDate();

            var attendanceRecord = firebaseDataService.attendance.child(datetoday).child(uid);
            var defered = $q.defer();


                attendanceRecord.once("value", function (snapshot) {

                    //
                    if (snapshot.exists())
                    {
                        console.log(snapshot.val());
                        defered.resolve("asdsa");
                    }
                    else
                    {
                        defered.reject("asssssdsa");
                    }
                    //
                    //return 1;

                });


           // return 1;
            return defered.promise;




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