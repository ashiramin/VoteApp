(function() {
  'use strict';

  angular
    .module('app.auth')
    .factory('authService', authService);

  authService.$inject = ['$rootScope', '$firebaseAuth', 'firebaseDataService'];

  function authService($rootScope, $firebaseAuth, firebaseDataService) {
    var firebaseAuthObject = $firebaseAuth(firebaseDataService.root);

    var currentUser;

    firebaseAuthObject.$onAuth(function(auth) {
      currentUser = auth;
    });

    var service = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      sendWelcomeEmail: sendWelcomeEmail,
      storeUserData: storeUserData
    };

    return service;

    ////////////

    function register(user) {
      return firebaseAuthObject.$createUser(user);
    }

    function login(user) {
      return firebaseAuthObject.$authWithPassword(user);
    }

    function storeUserData(user) {
      firebaseDataService.users.child(currentUser.uid).set({
        email: user.email,
        name: user.name
      });
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

  }

})();