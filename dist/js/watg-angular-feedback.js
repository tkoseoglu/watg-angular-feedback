/**
 * Created by Kemal on 07/30/15.
 */
(function() {
    "use strict";
    var modules = ['ngRoute',
    'watgFeedback.templates',
    'watgRichtext',
    'watgFileuploadModule'];
    var watgFeedbackModule = angular.module('watgFeedbackApp', modules);
}());

/**
 * Created by Kemal on 07/30/15.
 */
(function () {
    "use strict";
    angular.module("watgFeedbackModule").directive("watgFeedback", watgFeedback);
    var controller = ['$scope', "watgFeedbackService", function ($scope, watgFeedbackService) {
        var boostrapCssPath = "dev/css/vendor.min.css";
        $scope.header = 'Feedback';
        $scope.isBusySubmittingFeedback = false;
        $scope.showConfirmation = false;
        $scope.form = {};
        $scope.max = 5;
        $scope.ratingValue = 0;
        $scope.stars = [];
        $scope.feebackContentResetCount = [];
        $scope.projectNotFound = false;
        $scope.reset = function () {
            $scope.appDevProjectUI = {
                AppDevProjectId: 0,
                AppDevProjectName: '',
                AppDevProjectDescription: '',
                AppDevProjectVersion: '',
                FeedbackContent: '',
                Vendor: '',
                Platform: '',
                UserAgent: '',
                ScreenResolution: '',
                Rating: null,
                Files: []
            };
            $scope.watgFileuploadConfig = {
                Title: "Attachments",
                Files: [],
                MaxFileSize: 1024 * 1024 * 5,
                MaxNumberOfFiles: 5,
                AllowedFileExtensions: "png,jpg,doc,docx,pdf"
            };
            $scope.feedbackRichtextConfig = {
                height: $scope.feedbackInputHeight,
                multiLine: true,
                bootstrapCssPath: boostrapCssPath,
                showVariablesSelector: true,
                showFontSelector: true,
                showFontSizeSelector: true,
                showColorSelector: true,
                showBold: true,
                showItalic: true,
                showStrikeThrough: true,
                showUnderline: true,
                showUnorderedList: true,
                showOrderedList: true,
                showReduceIndent: true,
                showIndent: true,
                showLeftAlign: true,
                showCenterAlign: true,
                showRightAlign: true,
                showJustify: true,
                showUndo: true,
                showRedo: true,
                showInsertLink: true,
                showRemoveLink: true,
                showSourceCode: false
            };
        };
        $scope.getAppDevProjectByProjectName = function () {
            $scope.isBusy = true;
            var url = $scope.watgApiUrl + '/Feedback/GetAppDevProjectByProjectName' + '/' + $scope.projectName;
            watgFeedbackService.getAppDevProjectByProjectName(url).then(function (result) {
                $scope.isBusy = false;
                if (result && result.AppDevProjectId !== undefined) {
                    $scope.projectNotFound = false;
                    $scope.appDevProjectUI.AppDevProjectId = result.AppDevProjectId;
                    $scope.appDevProjectUI.AppDevProjectName = result.AppDevProjectName;
                    $scope.appDevProjectUI.AppDevProjectDescription = result.AppDevProjectDescription;
                    $scope.appDevProjectUI.AppDevProjectVersion = result.AppDevProjectVersion;
                }
                else {
                    $scope.projectNotFound = true;
                    var email = {
                        subject: 'Application Feedback',
                        body: 'Users are unable to submit feedback for ' + $scope.projectName + ' because it was not found in AppDev.',
                        recipients: [{
                            Name: 'App Dev',
                            Email: 'appdev@watg.com'
                        }],
                        fromEmail: 'appdev@watg.com',
                        fromName: 'App Dev'
                    };
                    url = $scope.watgApiUrl + '/Common/SendEmailAPI';
                    watgFeedbackService.sendEmail(email, url).then(function (result) {
                        if (result.HasError) {
                            console.error("Failed sending AppDev notification emails");
                            console.error(result.Message);
                        }
                        else {
                            console.info("AppDev Email sent successfully");
                        }
                    });
                }
            });
        };
        $scope.submitAppDevProjectFeedback = function () {
            $scope.isBusySubmittingFeedback = true;
            $scope.appDevProjectUI.Vendor = navigator["vendor"];
            $scope.appDevProjectUI.Platform = navigator["platform"];
            $scope.appDevProjectUI.UserAgent = navigator["userAgent"];
            $scope.appDevProjectUI.ScreenResolution = window.screen.availWidth + '*' + window.screen.availHeight;
            $scope.appDevProjectUI.Rating = $scope.ratingValue;
            if ($scope.urlReferrer) $scope.appDevProjectUI.FeedbackContent += "<br />(Previous page) " + $scope.urlReferrer;
            $scope.appDevProjectUI.Files = $scope.watgFileuploadConfig.Files;
            var url = $scope.watgApiUrl + '/Feedback/SubmitAppDevProjectFeedback';
            watgFeedbackService.submitAppDevProjectFeedback($scope.appDevProjectUI, url).then(function (result) {
                var transactionResult = result;
                if (transactionResult.HasError === true) console.error('Feedback Error ' + transactionResult.Message);
                $scope.showConfirmation = true;
                $scope.isBusySubmittingFeedback = false;
                $scope.reset();
            });
        };
        $scope.toggle = function (index) {
            $scope.ratingValue = index + 1;
        };
        $scope.$watch('ratingValue', function (oldValue) {
            if (oldValue) {
                updateStars();
            }
        });
        $scope.$watch('projectName', function (oldValue, newValue) {
            if (newValue !== null && newValue !== "" && newValue !== undefined) {
                $scope.getAppDevProjectByProjectName();
            }
        });
        $scope.$watch('appDevProjectUI.FeedbackContent', function (newValue) {
            if (newValue === "" || newValue === "<br>") $scope.form.inputForm.$setValidity("message", false);
            else $scope.form.inputForm.$setValidity("message", true);
        });

        function updateStars() {
            $scope.stars = [];
            for (var i = 0; i < $scope.max; i++) {
                $scope.stars.push({
                    filled: i < $scope.ratingValue
                });
            }
        }
        //$scope.getAppDevProjectByProjectName();
        $scope.reset();
        updateStars();
    }];

    function watgFeedback() {
        return {
            restrict: 'E',
            templateUrl: 'src/app/directives/templates/watgFeedbackTemplate.html',
            scope: {
                projectName: '=',
                watgApiUrl: '=',
                userFullName: '=',
                urlReferrer: '=',
                logsEnabled: "=?",
                feedbackInputHeight: "=?",
                feedbackMaxNumberOfAttachments: "=?",
                feedbackAttachmentMaxSize: "=?",
                feedbackAttachmentImageMaxHeight: "=?",
                feedbackAttachmentImageMaxWidth: "=?"
            },
            controller: controller,
            link: function (scope) {
                if (!scope.feedbackInputHeight) scope.feedbackInputHeight = 100;
                if (!scope.feedbackAttachmentMaxSize) scope.feedbackAttachmentMaxSize = (1024 * 1024) * 2;
                if (!scope.feedbackAttachmentImageMaxHeight) scope.feedbackAttachmentImageMaxHeight = 1000;
                if (!scope.feedbackAttachmentImageMaxWidth) scope.feedbackAttachmentImageMaxWidth = 1000;
                if (!scope.feedbackMaxNumberOfAttachments) scope.feedbackMaxNumberOfAttachments = 5;
                if (!scope.logsEnabled) scope.logsEnabled = true;
                if (scope.logsEnabled) {
                    console.log(scope.projectName);
                    console.log(scope.watgApiUrl);
                    console.log(scope.userFullName);
                    console.log(scope.urlReferrer);
                }
            }
        };
    }
})();

/**
 * Created by Kemal on 07/30/15.
 */
(function() {
    "use strict";
    angular.module("watgFeedbackModule").factory("watgFeedbackService", ["$http", watgFeedbackService]);

    function watgFeedbackService($http) {
        return {
            getAppDevProjectByProjectName: function(url) {
                return $http({
                    method: 'GET',
                    withCredentials: true,
                    url: url
                }).
                    then(function(response) {
                        return response.data;
                    });
            },
            submitAppDevProjectFeedback: function(vm, url) {
                console.log('Service 2 ' + url);
                var formData = new FormData();
                formData.append('FeedbackContent', vm.FeedbackContent);
                formData.append('Vendor', vm.Vendor);
                formData.append('Platform', vm.Platform);
                formData.append('UserAgent', vm.UserAgent);
                formData.append('ScreenResolution', vm.ScreenResolution);
                formData.append('Rating', vm.Rating);
                formData.append('AppDevProjectId', vm.AppDevProjectId);
                for (var i = 0; i < vm.Files.length; i++) {
                    formData.append("Files[" + i + "]", vm.Files[i]);
                }
                return $http({
                    url: url,
                    method: 'POST',
                    transformRequest: angular.identity,
                    data: formData,
                    withCredentials: true,
                    headers: {
                        'Content-Type': undefined
                    }
                }).
                    then(function(response) {
                        console.timeEnd('Posting Note');
                        return response.data;
                    });
            },
            sendEmail: function(email, url) {
                console.log(email);
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: url,
                    data: email
                }).
                    then(function(response) {
                        return response.data;
                    });
            }
        };
    }
})();
