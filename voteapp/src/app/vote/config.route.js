(function() {
    'use strict';

    angular
        .module('app.vote')
        .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.when('/vote/:sessionId', {
            templateUrl: 'app/vote/vote.html',
            controller: 'VoteController',
            controllerAs: 'vm',
            resolve:
            {user: resolveUser,
               attendance: hasAttendance

            }
        });
    }

    resolveUser.$inject = ['authService'];
    hasAttendance.$inject = ['authService','$q','attendanceService', '$timeout'];

    function hasAttendance(authService,$q,attendanceService,$timeout)
    {
        var uid = authService.firebaseAuthObject.$getAuth().uid;
        var attend = attendanceService.getAttendanceByDay(uid);
        var deferred = $q.defer();

        setTimeout(function() {
            attend.$loaded().then(function ()
            {
                if (attend.length < 1)
                {
                    console.log(attend);

                    deferred.reject("asdsad");
                    //console.log(defer);

                }

                else
                {
                    deferred.resolve("asda");
                }
            });
        }, 1);



        //console.log("asdas");
        return deferred.promise;



    }

    function resolveUser(authService) {
        return authService.firebaseAuthObject.$requireAuth();
    }

})();
