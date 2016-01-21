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
                "<button class='btn btn-warning' type='button' ng-click='vm.cancel()'>Cancel</button>" +
                "</div>"

            };
        });

    VoteController.$inject = ['$scope', 'voteService' , 'user','$routeParams','$uibModal' ];

    function VoteController($scope, voteService,user,$routeParams,$uibModal) {

      var vm = this;
        //console.log(vm);
        vm.selectedCombination = [];
      vm.choices = {};
      vm.selectedOption = {};

      vm.submitChoices = function(id) {
        console.log(vm.choices[id]);
        var obj = {};

        var final = [];
        for (var key in vm.choices[id]) {
          if (vm.choices[id].hasOwnProperty(key)) {
            if(vm.choices[id][key] == true)
            {
              final.push(key);
            }
          }
        }
        obj[uids] = final;
        console.log(obj);
       vm.getVotes.child(id).child("votes").update(obj);
      };

      vm.disableCheckboxes = function(id) {

      };

      vm.goOffline = function () {
        Firebase.goOffline();
      };

      vm.goOnline = function() {
        Firebase.goOnline();
      };

      $scope.$watch('vm.choices', function (items) {

        //console.log(items);
        var selectedItems;
        angular.forEach(items, function(item,key){
          //console.log(item);
          //console.log(key);
          vm.selectedOption[key] = 0;
          angular.forEach(item, function(property) {

         //   console.log(property);
            if (property) {
              vm.selectedOption[key]++;
            }
          });


        });
      },true);
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

       /* vm.polls.$watch(function(event) {
            if (event.event == "child_added") {
            //    var pollId = vm.polls.$getRecord(event.key)
                vm.selectedCombination[event.key] = [];
            }
        });*/

      vm.polls.$loaded().then(function() {
        for (var i = 0; i < vm.polls.length;i++) {
          vm.selectedCombination[vm.polls[i].$id] = [];
          vm.choices[vm.polls[i].$id] = {};
          vm.selectedOption[vm.polls[i].$id] = 0;
        }
      });


      vm.buttonClass = "btn-default";

        vm.userVote = "";

        vm.addvote = function(index,n,id,maxOptions) {
            var obj = {};
            if (vm.selectedCombination[id].indexOf(n) < 0) {
                vm.selectedCombination[id].push(n);
            }

            //console.log(vm.selectedCombination);
            //console.log(vm.polls.length);
            obj[uids] = vm.selectedCombination[id];
          console.log(obj);

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
          //$uibModalInstance.close();
            $uibModalInstance.dismiss('cancel');
        };
    });

})();