(function() {
    'use strict';

    angular
        .module('app.vote')
        .controller('VoteController', VoteController);

    angular
        .module('app.vote').directive('modalDialog' , function() {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,

                link: function(scope) {
                    scope.cancel = function() {
                        scope.$dismiss('cancel');
                    };
                },
                template:
                "<div>" +
                "<div class='modal-header'>" +
                "<h3 class='modal-title' ng-bind='vm.dialogTitle'></h3>" +
                "<div class='modal-body' ng-transclude></div>" +
                "</div>" +
                "<div class='modal-footer'>" +
                "<button class='btn btn-primary' type='button' ng-click='vm.ok()'>OK</button>" +
                "<button class='btn btn-warning' type='button' ng-click='vmcancel()'>Cancel</button>" +
                "</div>"

            };
        });

    VoteController.$inject = ['$rootScope', 'voteService' , 'user','$routeParams','$uibModal' ];

    function VoteController($rootScope, voteService,user,$routeParams,$uibModal) {

        var vm = this;
        //console.log(vm);
        vm.selectedCombination = [];
        console.log($uibModal);

        vm.items = ['item1', 'item2', 'item3'];
        var uids = user.uid;
        vm.Modal = function (size) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/vote/modal.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: "vm",
                size: size,
                resolve: {
                    user: user

                }
            });
        };

            vm.getVotes = voteService.getVotes($routeParams.sessionId);



        vm.polls = voteService.getPolls($routeParams.sessionId);


        vm.polls.$loaded().then(function() {

            for (var i = 0; i < vm.polls.length;i++) {
                vm.selectedCombination[vm.polls[i].$id] = [];
            }


        });


        vm.buttonClass = "btn-default";

        vm.userVote = "";

        vm.addvote = function(index,n,id,maxOptions) {
            var obj = {};
            if (vm.selectedCombination[id].indexOf(n) < 0) {
                vm.selectedCombination[id].push(n);
            }

            console.log(vm.selectedCombination);
            console.log(vm.polls.length);
            obj[uids] = vm.selectedCombination[id];

            if (vm.selectedCombination[id].length > maxOptions) {
                vm.selectedCombination[id].shift();
            }

            if (id != undefined) {
                vm.getVotes.child(id).child("votes").update(obj);
            }
            vm.userVote = "You voted for " + n;
        };


        vm.buttonSelected = function(n,id) {
              return vm.selectedCombination[id].indexOf(n);

        };

        $rootScope.$on('logout', function() {
            //   vm.parties.$destroy();
        });

    }

    angular.module('app.vote').controller('ModalInstanceCtrl', function ($rootScope,$uibModalInstance,attendanceService,user,$routeParams) {
        var vm = this;

        vm.dialogTitle = "Reason";
        vm.ok = function () {
            //$rootScope.$broadcast('lockuser');
            attendanceService.lockUser(user.uid,$routeParams.sessionId, vm.message);
            $uibModalInstance.close();
        };
        vm.cancel = function () {
           // console.log(attendanceService);
           // attendanceService.lockUser(uids,$routeParams.sessionId);
            $uibModalInstance.dismiss('cancel');
        };
    });

})();