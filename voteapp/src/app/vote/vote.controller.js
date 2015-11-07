(function() {
    'use strict';

    angular
        .module('app.vote')
        .controller('VoteController', VoteController);

    VoteController.$inject = ['$rootScope', 'voteService' , 'user'];

    function VoteController($rootScope, voteService,user) {
        var vm = this;

        vm.votes = voteService.vote;

        vm.getVotes = voteService.getVotes("sdsd");

        var uids = user.uid;

        vm.buttonClass = "btn-default";

        vm.userVote = "";
        //vm.selectedCombination = "A";

        vm.addvote = function(n) {
          console.log(n);
            vm.selectedCombination =n;

            var obj = {};
            obj[uids] = n;

            vm.getVotes.update(obj);

            //vm.buttonClass = "btn-success";

            vm.userVote = "You voted for " + n;
        };

        $rootScope.$on('logout', function() {
            //   vm.parties.$destroy();
        });
    }

})();