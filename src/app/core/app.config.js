(function() {
    "use strict";
    var app = angular.module('watgFeedbackModule');
    app.config(['$routeProvider', '$httpProvider', appConfig]);
    app.run(appRun);

    function appConfig($routeProvider, $httpProvider) {
        //this is for CORS operations
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        //disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
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
