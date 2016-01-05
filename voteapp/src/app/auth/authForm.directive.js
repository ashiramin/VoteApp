(function() {
  'use strict';

  angular
    .module('app.auth')
    .directive('gzAuthForm', gzAuthForm);

  function gzAuthForm() {
    return {
      templateUrl: 'app/auth/authForm.html',
      restrict: 'E',
      controller: AuthFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        submitAction: '&',
        error: '=',
        formTitle: '@'
      },
      transclude: true,
      link: function(scope, elem, attr, ctrl, transclude) {
        console.log(ctrl);
        transclude(scope,function(clone, transScope) {

          transScope.name = ctrl.user.name;

          angular.forEach(clone, function(cloneEl) {
            if (cloneEl.nodeType === 3)  {

              return;
            }
            var destinationId = cloneEl.attributes["transclude-to"].value;
            var destination = elem.find('[transclude-id="'+ destinationId +'"]');
            if (destination.length) {
              destination.append(cloneEl);
            } else {
              cloneEl.remove();
            }
          });
        });
      }
    }
  }

  function AuthFormController() {
    var vm = this;

    vm.user = {
      name: '',
      email: '',
      password: ''
    };
  }

})();