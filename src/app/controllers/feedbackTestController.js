"use strict";
watgFeedbackModule.controller('feedbackTestController',
    function feedbackTestController($scope) {
        $scope.header = 'Feedback';

        $scope.projectName = "eMail Campaign App";
        $scope.getProjectDetailsUrl = 'http://itstage.watg.com/watgxapirest/api/Feedback/GetProjectDetails/';
        $scope.submitProjectFeedbackUrl = 'http://itstage.watg.com/watgxapirest/api/Feedback/AddProjectFeedback';
        $scope.user = {
            FullName: 'Tolga Koseoglu'
        }


    }
);

