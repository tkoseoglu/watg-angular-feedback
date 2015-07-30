/**
 * Created by Kemal on 07/30/15.
 */
var watgFeedbackModule = angular.module('watgFeedback', ['ngRoute', 'ngSanitize'])
    .config(function ($routeProvider, $httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];


        $routeProvider
            .when('/',
            {
                templateUrl: 'app/views/feedbackView.html',
                controller: 'feedbackTestController'
            })
            .otherwise({redirectTo: '/'});
    });
