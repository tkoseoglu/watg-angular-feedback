/**
 * Created by Kemal on 07/30/15.
 */
var feedbackModule = angular.module('feedbackModule', ['ngRoute', 'ngSanitize'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: 'app/views/feedbackView.html',
                controller: 'feedbackController'
            })
            .otherwise({redirectTo: '/'});
    });
