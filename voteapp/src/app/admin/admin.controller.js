(function() {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['adminService' ,'$routeParams', '$location','$uibModal','attendanceService'];

    function AdminController(adminService,$routeParams,$location,$uibModal,attendanceService) {
        var vm = this;

        vm.sessionId =$routeParams.sessionId !== undefined ? $routeParams.sessionId : "";

        vm.checkSessionId = function (sessionId) {
            var sessionExists =  adminService.SessionExists(sessionId);
            sessionExists.$loaded().then(function() {
                if (sessionExists.length > 0) {
                    $location.path('/admin/' + sessionId);
                }

            });
        };


        if (vm.sessionId != "") {
            vm.users = adminService.getAllUsers();

            vm.usernames = [];

            vm.Modal = function (user) {

                $uibModal.open({
                    animation: true,
                    templateUrl: 'app/admin/modal.html',
                    controller: 'ModalInstanceCtrll',
                    controllerAs: "vm",
                   // size: size,
                    resolve: {
                        user: user,
                        attendanceInfo: attendanceService.getAttendanceInfoForUser(user.uid,vm.sessionId)

                    }
                });
            };

            vm.sessionUsers = adminService.getSessionUsers(vm.sessionId);

            vm.sessionUsers.$watch(function(event) {
                console.log(event);
                if (event.event == "child_added") {
                    var user = vm.users.$getRecord(event.key);
                    var userInfo = vm.sessionUsers.$getRecord(event.key);
                    var obj = {
                        uid: event.key,
                        name: user.name,
                        timestamp: new Date(userInfo.timestamp).toLocaleTimeString(),
                        email: user.email,
                        locked: userInfo.locked
                    };

                    vm.usernames.push(obj);
                }
                else if (event.event == "child_changed") {
                    for (var i = 0;i < vm.usernames.length;i++) {
                        if (vm.usernames[i].uid == event.key) {

                            vm.usernames[i].locked = vm.sessionUsers.$getRecord(event.key).locked;
                        }
                    }
                }

            });
        }


     /*   $rootScope.$on('logout', function() {
            //   vm.parties.$destroy();
        });*/
    }

    angular.module('app.admin').controller('ModalInstanceCtrll', function ($rootScope,$uibModalInstance,attendanceInfo,attendanceService,user,$routeParams) {
        var vm = this;

        vm.dialogTitle = "Unlock user";
        vm.message = attendanceInfo.message;
        vm.ok = function () {
            //$rootScope.$broadcast('lockuser');
          //  attendanceService.lockUser(user.uid,$routeParams.sessionId, vm.message);
            attendanceService.unlockUser(user.uid,$routeParams.sessionId);
            $uibModalInstance.close();
        };
        vm.cancel = function () {
            // console.log(attendanceService);
            // attendanceService.lockUser(uids,$routeParams.sessionId);
            $uibModalInstance.dismiss('cancel');
        };
    });

})();