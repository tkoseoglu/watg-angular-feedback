"use strict";
feedbackModule.controller('feedbackController',
    function feedbackController($scope, feedbackService) {
        $scope.header = 'Feedback';

        $scope.projectName = "eMail Campaign App";
        $scope.getProjectDetailsUrl = 'http://itstage.watg.com/watgxapirest/api/Feedback/GetProjectDetails/';
        $scope.submitProjectFeedbackUrl = 'http://itstage.watg.com/watgxapirest/api/Feedback/AddProjectFeedback';
        $scope.userFullName = "Tolga Koseoglu";

    }
);

