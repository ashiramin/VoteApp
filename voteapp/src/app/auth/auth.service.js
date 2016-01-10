(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('authService', authService);

  authService.$inject = ['$rootScope', '$firebaseAuth', 'firebaseDataService', '$firebaseObject', '$q'];

  function authService($rootScope, $firebaseAuth, firebaseDataService, $firebaseObject, $q) {
    var firebaseAuthObject = $firebaseAuth(firebaseDataService.root);

    var currentUser;
    var adminRoles = ["poll", "results", "admin", "login", "register"];
    var userRoles = ["attendance", "vote", "login", "register"];

    firebaseAuthObject.$onAuth(function (auth) {
      currentUser = auth;
    });

    var service = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login: login,
      logout: logout,
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
      console.log(defered.promise);
      return defered.promise;
    }

    function searchInArray(str, strArray) {
      console.log(str);
      console.log(adminRoles);
      for (var i = 0; i < strArray.length; i++) {
        if (str.indexOf(strArray[i]) > -1) {
          return 1;
        }
      }
      return -1;
    }


  }

})();