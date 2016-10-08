(function() {
    "use strict";
    angular.module("watgFeedbackModule").controller("watgFeedbackTestController", ['$scope', '$window', 'CONST_WATGXRESTAPIURL', watgFeedbackTestController]);

    function watgFeedbackTestController($scope, $window, CONST_WATGXRESTAPIURL) {
        $scope.header = 'Feedback';
        $scope.maxAttachmentSize = (1024 * 1024) * 1;
        $scope.maxNumberOfAttachments = 2;
        $scope.getAppDevProjectByProjectNameUrl = CONST_WATGXRESTAPIURL + '/Feedback/GetAppDevProjectByProjectName';
        $scope.submitAppDevProjectFeedbackUrl = CONST_WATGXRESTAPIURL + '/Feedback/SubmitAppDevProjectFeedback';
        $scope.user = {
            FullName: 'Tolga Koseoglu'
        };
        console.log(navigator["vendor"]);
        navigator["appCodeName"];
        navigator["appName"];
        navigator["appMinorVersion"];
        navigator["cpuClass"];
        navigator["platform"];
        navigator["plugins"];
        navigator["opsProfile"];
        navigator["userProfile"];
        navigator["systemLanguage"];
        navigator["userLanguage"];
        navigator["appVersion"];
        navigator["userAgent"];
        navigator["onLine"];
        navigator["cookieEnabled"];
        navigator["mimeTypes"];
        for (var p in navigator) {
            console.log(p);
            console.log(navigator[p]);
        }
    }
}());
