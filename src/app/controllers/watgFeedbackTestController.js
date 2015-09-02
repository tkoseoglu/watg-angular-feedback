"use strict";
watgFeedbackModule.controller('watgFeedbackTestController',
    function watgFeedbackTestController($scope, $window) {
        $scope.header = 'Feedback';

        //var feedbackServiceLocation = "http://localhost:12240/api/Feedback/";

        var feedbackServiceLocation = "http://localhost/WATGx.API.REST.Web/api/Feedback/";

        $scope.maxAttachmentSize = (1024 * 1024) * 1;
        $scope.maxNumberOfAttachments = 2;
        $scope.getAppDevProjectByProjectNameUrl = feedbackServiceLocation + 'GetAppDevProjectByProjectName';
        $scope.submitAppDevProjectFeedbackUrl = feedbackServiceLocation + 'SubmitAppDevProjectFeedback';
        $scope.user = {
            FullName: 'Tolga Koseoglu'
        };
    }
);

