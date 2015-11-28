(function() {
    'use strict';

    angular
        .module('app.vote')
        .controller('VoteController', VoteController);

    VoteController.$inject = ['$rootScope', 'voteService' , 'user','$routeParams'];

    function VoteController($rootScope, voteService,user,$routeParams) {
        var vm = this;
        vm.selectedCombination = new Array();
        console.log(vm.selectedCombination)
        vm.votes = voteService.vote;
        console.log(user);

        vm.getVotes = voteService.getVotes($routeParams.sessionId);
        //console.log(user);
        var uids = user.uid;

        vm.polls = voteService.getPolls($routeParams.sessionId);

        vm.buttonClass = "btn-default";

        vm.userVote = "";
        //vm.selectedCombination = "A";

        vm.addvote = function(n,id,maxOptions) {
          console.log(n);


            var obj = {};
            vm.selectedCombination[id] =n;
            console.log(vm.selectedCombination);
            console.log(vm.polls.length);
            obj[uids] = vm.selectedCombination[id];
            // vm.getVotes.child("hello").child(id).update(obj);
            if (id != undefined) {
                vm.getVotes.child(id).child("votes").update(obj);
            }

            //vm.buttonClass = "btn-success";

            vm.userVote = "You voted for " + n;
        };

        $rootScope.$on('logout', function() {
            //   vm.parties.$destroy();
        });

        vm.selectedValues = function (n,id,maxOptions) {
            if (vm.selectedCombination.length > maxOptions)
            {
                vm.selectedCombination.shift();
            }


            obj[uids] = vm.selectedCombination;
           // vm.getVotes.child("hello").child(id).update(obj);
            if (id != undefined) {
                vm.getVotes.child(id).child("votes").update(obj);
            }
            return vm.selectedCombination.indexOf(n);
        };
    }

})();