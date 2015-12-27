(function() {
    'use strict';

    angular
        .module('app.results')
        .controller('ResultsController', ResultsController);

    ResultsController.$inject = ['$rootScope', 'adminService' , 'user' ,'$routeParams' ,'voteService'];

    function ResultsController($rootScope, adminService,user, $routeParams,voteService) {
        var vm = this;

        vm.votes =  adminService.GetTotalCount($routeParams.sessionId);

        vm.labels = ['A', 'B', 'C', 'D'];
        vm.polls = voteService.getPolls($routeParams.sessionId);
        vm.chartStuff = {};

        vm.items = {};
        vm.items["abc"] = {'adam':10, 'amalie':12};
        vm.items.a = 4;
        console.log(vm.items);
        vm.polls.$loaded().then(function() {

            console.log(vm.polls);
            for (var i = 0; i < vm.polls.length;i++) {
                vm.chartStuff[vm.polls[i].$id] = [];
                vm.chartStuff[vm.polls[i].$id]["label"] = [];
                vm.chartStuff[vm.polls[i].$id]["chartData"] = [];
                vm.chartStuff[vm.polls[i].$id]["votes"] = [];

                for (var iter = 0; iter< vm.polls[i].info.choices.length; iter++) {
                    vm.chartStuff[vm.polls[i].$id]["votes"].push(0);
                }

                vm.chartStuff[vm.polls[i].$id]["question"] = vm.polls[i].info.question;
                for (var j = 0; j < vm.polls[i].info.choices.length; j++) {
                    vm.chartStuff[vm.polls[i].$id][vm.polls[i].info.choices[j]] = 0;
                    vm.chartStuff[vm.polls[i].$id]["label"].push(vm.polls[i].info.choices[j]);

                }
                for (var key in vm.polls[i].votes) {
                    if (vm.polls[i].votes.hasOwnProperty(key)) {

                        for (j = 0; j < vm.polls[i].votes[key].length; j++) {

                            if (vm.chartStuff[vm.polls[i].$id].hasOwnProperty(vm.polls[i].votes[key][j])) {

                                var option =vm.polls[i].votes[key][j];
                                vm.chartStuff[vm.polls[i].$id][option]++;
                            }
                            var index = vm.chartStuff[vm.polls[i].$id]["label"].indexOf(option);
                            vm.chartStuff[vm.polls[i].$id]["votes"][index] = vm.chartStuff[vm.polls[i].$id][option]
                        }
                        vm.chartStuff[vm.polls[i].$id]["chartData"][0] = vm.chartStuff[vm.polls[i].$id]["votes"];
                    }

                }
            }

        });

        vm.polls.$watch(function (event) {


            if (event.event == "child_changed") {


                for (var i = 0; i< vm.chartStuff[event.key]["votes"].length; i++ ) {
                    vm.chartStuff[event.key]["votes"][i] = 0;
                }
               // console.log(event.key);
               // console.log(vm.polls.$getRecord(event.key));
                var pollObj = vm.polls.$getRecord(event.key);

                for (var prop in vm.chartStuff[event.key]) {
                    if (typeof vm.chartStuff[event.key][prop] === "number" ) {

                        vm.chartStuff[event.key][prop] = 0;
                    }
                }

                for (var key in pollObj.votes) {
                    if (pollObj.votes.hasOwnProperty(key)) {
                        for (var j = 0; j < pollObj.votes[key].length; j++) {

                            if (vm.chartStuff[pollObj.$id].hasOwnProperty(pollObj.votes[key][j])) {

                                var option =pollObj.votes[key][j];
                                vm.chartStuff[pollObj.$id][option]++;
                            }
                            var index = vm.chartStuff[pollObj.$id]["label"].indexOf(option);
                            vm.chartStuff[pollObj.$id]["votes"][index] = vm.chartStuff[pollObj.$id][option]
                        }
                        vm.chartStuff[pollObj.$id]["chartData"][0] = vm.chartStuff[pollObj.$id]["votes"];
                    }
                }

               }



        });



        $rootScope.$on('logout', function() {
            //   vm.parties.$destroy();
        });
    }

})();