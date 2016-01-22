(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('adminService', adminService);

  adminService.$inject = ['$firebaseArray', 'firebaseDataService', 'voteService','$firebaseObject','$q'];

  function adminService($firebaseArray, firebaseDataService, voteService,$firebaseObject,$q) {

    var service = {
      CreateSession: CreateSession,
      SessionExists: SessionExists,
      GetTotalCount: GetTotalCounts,
      CreatePoll: CreatePoll,
      getAllUsers: getAllUsers,
      getSessionUsers: getSessionUsers,
      toggleLock: toggleLock

    };

    return service;

    ////////////

    function getSessionUsers(sessionId) {
      return $firebaseArray(firebaseDataService.attendance.child(sessionId));
    }

    function getAllUsers() {
      return $firebaseArray(firebaseDataService.users);
    }


    function GetTotalCounts(sessionId) {
      //console.log('asdasd');
      //console.log(sessionId);
      return $firebaseArray(voteService.getVotes(sessionId));
    };


    function SessionExists(sessionId) {


      return $firebaseArray(firebaseDataService.voteSessions.child(sessionId));


    };

    function CreateSession(sessionId) {
      firebaseDataService.voteSessions.child(sessionId).set({timestamp: Firebase.ServerValue.TIMESTAMP});
    }

    function CreatePoll(sessionId, choices, maxOptions, question) {
      var obj = {};
      obj = {
        info: {
          question: question,
          choices: choices,
          maxOptions: maxOptions,
          timestamp: Firebase.ServerValue.TIMESTAMP,
          locked: false
        }
      };

      $firebaseArray(firebaseDataService.voteSessions.child(sessionId)).$add(obj);

    }

    function toggleLock(sessionId,pollId) {
      var onComplete = function(error) {
        if (error) {
          defered.reject();
        } else {
          defered.resolve();
        }
      };

      var defered = $q.defer();
      var ref = $firebaseObject(firebaseDataService.voteSessions.child(sessionId).child(pollId).child("info"));
      ref.$loaded().then(function(data) {

        if (data.locked == false) {
          firebaseDataService.voteSessions.child(sessionId).child(pollId).child("info").update({'locked' : true},onComplete);
        }
        else if (data.locked == true) {
          firebaseDataService.voteSessions.child(sessionId).child(pollId).child("info").update({'locked' : false},onComplete);
        }
      });
     return defered.promise;
    }


  }

})();
