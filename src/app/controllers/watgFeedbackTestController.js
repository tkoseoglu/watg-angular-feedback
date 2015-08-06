"use strict";
watgFeedbackModule.controller('watgFeedbackTestController',
    function watgFeedbackTestController($scope) {
        $scope.header = 'Feedback';

        $scope.getProjectDetailsUrl = 'http://itstage.watg.com/watgxapirest/api/Feedback/GetProjectDetails/';
        $scope.submitProjectFeedbackUrl = 'http://itstage.watg.com/watgxapirest/api/Feedback/AddProjectFeedback';
        $scope.user = {
            FullName: 'Tolga Koseoglu'
        };
    }
);

