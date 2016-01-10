(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('authService', authService);

  authService.$inject = ['$rootScope', '$firebaseAuth', 'firebaseDataService', '$firebaseObject', '$q'];

  function authService($rootScope, $firebaseAuth, firebaseDataService, $firebaseObject, $q) {
    var firebaseAuthObject = $firebaseAuth(firebaseDataService.root);

    var currentUser;
    var adminRoles = ["poll", "results", "admin", "login", "register", "settings"];
    var userRoles = ["attendance", "vote", "login", "register", "settings"];

    firebaseAuthObject.$onAuth(function (auth) {
      currentUser = auth;
    });

    var service = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login: login,
      logout: logout,
      changePassword: changePassword,
      isLoggedIn: isLoggedIn,
      sendWelcomeEmail: sendWelcomeEmail,
      storeUserData: storeUserData,
      isUrlAllowed: isUrlAllowed,
      isUserAdmin: isUserAdmin
    };

    return service;

    ////////////


    function register(user) {
      return firebaseAuthObject.$createUser(user);
    }

    function login(user) {
      return firebaseAuthObject.$authWithPassword(user);
    }

    function logout() {
      $rootScope.$broadcast('logout');
      firebaseAuthObject.$unauth();
    }

    function changePassword(email,oldPassword,newPassword){
      var defered = $q.defer();
      firebaseAuthObject.$changePassword({
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
      }).then(function() {
        defered.resolve();
      },function(error) {
        defered.reject(error);
      });

      return defered.promise;
    }

    function isLoggedIn() {
      return currentUser;
    }

    function sendWelcomeEmail(emailAddress) {
      firebaseDataService.emails.push({
        emailAddress: emailAddress
      });
    }

    function storeUserData(user) {
      firebaseDataService.users.child(currentUser.uid).set({
        email: user.email,
        name: user.name,
        roleValue: 10
      });
    }

    function isUrlAllowed(uid, url) {
      var defered = $q.defer();
      if (uid !== undefined) {
        var userData = $firebaseObject(firebaseDataService.users.child(uid));
        userData.$loaded().then(function (data) {
          if (data.roleValue == 10) {
            defered.resolve(searchInArray(url, userRoles));
          }
          else if (data.roleValue == 99) {
            defered.resolve(searchInArray(url, adminRoles));
          }
        });
      }

      return defered.promise;
    }

    function isUserAdmin(uid) {
      var defered = $q.defer();
      var ref = firebaseDataService.users.child(uid);
      ref.once('value', function (dataSnapshot) {
        defered.resolve(dataSnapshot.val().roleValue == 99);
      });

      return defered.promise;
    }

    function searchInArray(str, strArray) {
      for (var i = 0; i < strArray.length; i++) {
        if (str.indexOf(strArray[i]) > -1) {
          return 1;
        }
      }
      return -1;
    }
  }

})();