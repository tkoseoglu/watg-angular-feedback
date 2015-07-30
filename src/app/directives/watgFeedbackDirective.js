/**
 * Created by Kemal on 07/30/15.
 */
feedbackModule.directive("watgFeedback", function () {

    return {
        restrict: 'E',
        scope: {
            projectName: '=',
            serviceUrl: '='
        },
        link: function (scope, element) {

            console.log(scope.projectName);
            console.log(scope.serviceUrl);

        }

    }
});