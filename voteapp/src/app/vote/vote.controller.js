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

        vm.addvote = function(n) {
          console.log(n);

            var obj = {};
            obj[uids] = n;

            vm.getVotes.update(obj);
        };

        $rootScope.$on('logout', function() {
            //   vm.parties.$destroy();
        });
    }

})();