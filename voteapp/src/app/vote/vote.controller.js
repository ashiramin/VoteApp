(function() {
    'use strict';

    angular
        .module('app.vote')
        .controller('VoteController', VoteController);

    VoteController.$inject = ['$rootScope', 'voteService' , 'user','$routeParams'];

    function VoteController($rootScope, voteService,user,$routeParams) {
        var vm = this;
        vm.selectedCombination = [];


        vm.getVotes = voteService.getVotes($routeParams.sessionId);

        var uids = user.uid;

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

})();