(function() {
    'use strict';

    angular
        .module('app.vote')
        .controller('VoteController', VoteController);

    VoteController.$inject = ['$rootScope', 'voteService' , 'user','$routeParams'];

    function VoteController($rootScope, voteService,user,$routeParams) {
        var vm = this;
        vm.selectedCombination = [];
        vm.votes = voteService.vote;
        console.log(user);

        vm.getVotes = voteService.getVotes($routeParams.sessionId);
        //console.log(user);
        var uids = user.uid;

        vm.buttonClass = "btn-default";

        vm.userVote = "";
        //vm.selectedCombination = "A";

        vm.addvote = function(n) {
          console.log(n);



            vm.selectedCombination.push(n);



            //vm.buttonClass = "btn-success";

            vm.userVote = "You voted for " + n;
        };

        $rootScope.$on('logout', function() {
            //   vm.parties.$destroy();
        });

        vm.selectedValues = function (n) {
            if (vm.selectedCombination.length > 2)
            {
                vm.selectedCombination.shift();
            }
            var obj = {};

            obj[uids] = vm.selectedCombination;
            vm.getVotes.update(obj);
            return vm.selectedCombination.indexOf(n);
        };
    }

})();