"use strict";
feedbackModule.controller('feedbackController',
    function feedbackController($scope, feedbackService) {
        $scope.header = 'Feedback';

        $scope.projectName = "WATG1";
        $scope.serviceUrl = 'http://itstage.watg.com/watgxapirest/api';


        //$rootScope.watgxapirestUrl = 'http://localhost/WATGx.API.REST.Web/api';
        //$rootScope.watgxapirestUrl = 'http://itworks.watg.com/watgxapirest/api';
    }
);

