"use strict";
feedbackModule.controller('feedbackController',
    function feedbackController($scope, feedbackService) {
        $scope.header = 'Feedback';

        $scope.projectName = "WATG1";
        $scope.serviceUrl = 'http://itstage.watg.com/watgxapirest/api';
        $scope.userFullName = "Tolga Koseoglu";

    }
);

