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

    VoteController.$inject = ['$scope', 'voteService' , 'user','$routeParams','$uibModal' , '$interval' ];

    function VoteController($scope, voteService,user,$routeParams,$uibModal,$interval) {

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
        
        //Firebase.goOnline();
       vm.getVotes.child(id).child("votes").update(obj, function () {
        // Firebase.goOffline();

       });
        //Firebase.goOffline();
      };

      vm.goOffline = function () {
        Firebase.goOffline();
      };

      vm.goOnline = function() {
        Firebase.goOnline();
      };

      var update = $interval(function () {
       // Firebase.goOnline();
        //Firebase.goOffline();
      },10000);

      $scope.$watch('vm.choices', function (items) {

        angular.forEach(items, function(item,key){
          vm.selectedOption[key] = 0;
          angular.forEach(item, function(property) {
            if (property) {
              vm.selectedOption[key]++;
            }
          });


        });
      },true);

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

      /*    vm.polls.$watch(function(event) {
          console.log(event.event);
            if (event.event == "child_added") {
            //    var pollId = vm.polls.$getRecord(event.key)
            //    vm.selectedCombination[event.key] = [];
            }
        });*/

      vm.polls.$loaded().then(function() {
       // Firebase.goOffline();
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

      $scope.$on('$destroy',function() {
        Firebase.goOnline();
        $interval.cancel(update);
      })

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

            $uibModalInstance.dismiss('cancel');
        };
    });

})();