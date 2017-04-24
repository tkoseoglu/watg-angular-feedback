(function() {
    "use strict";
    var app = angular.module('watgFeedbackModule');
    app.config(['$httpProvider', '$routeProvider', appConfig]);
    app.run(appRun);

    function appConfig($httpProvider, $routeProvider) {

        //this is for CORS operations
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        //disable IE ajax request caching
        $httpProvider.defaults.headers.common['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.common['Pragma'] = 'no-cache';

        //routes
        $routeProvider.when('/test', {
            templateUrl: 'src/app/tests/watgFeedbackTestView.html',
            controller: 'watgFeedbackTestController'
        }).otherwise({
            redirectTo: '/test'
        });
    }

    function appRun() {}
})();