/**
 * Created by Kemal on 07/30/15.
 */
(function() {
    "use strict";
    angular.module("watgFeedbackModule").directive("watgFeedback", watgFeedback);
    var controller = ['$scope', "watgFeedbackService", function($scope, watgFeedbackService) {
        var boostrapCssPath = "dev/css/vendor.min.css";
        $scope.header = 'Feedback';
        $scope.isBusySubmittingFeedback = false;
        $scope.showConfirmation = false;
        $scope.form = {};
        $scope.max = 5;
        $scope.stars = [];
        $scope.ratingValue = 0;
        $scope.attachmentUploadIsBusy = false;
        $scope.attachmentUploadMessages = [];
        $scope.feebackContentResetCount = [];
        $scope.reset = function() {
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
        $scope.getAppDevProjectByProjectName = function() {
            $scope.isBusy = true;
            watgFeedbackService.getAppDevProjectByProjectName($scope.getUrl + '/' + $scope.projectName).then(function(result) {
                $scope.appDevProjectUI.AppDevProjectId = result.AppDevProjectId;
                $scope.appDevProjectUI.AppDevProjectName = result.AppDevProjectName;
                $scope.appDevProjectUI.AppDevProjectDescription = result.AppDevProjectDescription;
                $scope.appDevProjectUI.AppDevProjectVersion = result.AppDevProjectVersion;
                $scope.isBusy = false;
            });
        };
        $scope.submitAppDevProjectFeedback = function() {
            $scope.isBusySubmittingFeedback = true;
            $scope.appDevProjectUI.Vendor = navigator["vendor"];
            $scope.appDevProjectUI.Platform = navigator["platform"];
            $scope.appDevProjectUI.UserAgent = navigator["userAgent"];
            $scope.appDevProjectUI.ScreenResolution = window.screen.availWidth + '*' + window.screen.availHeight;
            $scope.appDevProjectUI.Rating = $scope.ratingValue;
            if ($scope.urlReferrer) $scope.appDevProjectUI.FeedbackContent += "<br />(Previous page) " + $scope.urlReferrer;
            $scope.appDevProjectUI.Files = $scope.watgFileuploadConfig.Files;
            watgFeedbackService.submitAppDevProjectFeedback($scope.appDevProjectUI, $scope.submitUrl).then(function(result) {
                var transactionResult = result;
                if (transactionResult.HasError === true) console.error('Feedback Error ' + transactionResult.Message);
                $scope.showConfirmation = true;
                $scope.isBusySubmittingFeedback = false;
                $scope.reset();
            });
        };
        $scope.toggle = function(index) {
            $scope.ratingValue = index + 1;
        };
        $scope.$watch('ratingValue', function(oldValue) {
            if (oldValue) {
                updateStars();
            }
        });
        $scope.$watch('projectName', function(oldValue, newValue) {
            if (newValue) {
                $scope.getAppDevProjectByProjectName();
            }
        });
        $scope.$watch('appDevProjectUI.FeedbackContent', function(newValue) {
            if (newValue === "" || newValue === "<br>") $scope.form.inputForm.$setValidity("message", false);
            else $scope.form.inputForm.$setValidity("message", true);
        });
        $scope.$watchCollection("appDevProjectUI.Files", function(newValue, oldValue) {
            $scope.attachmentUploadMessages = [];
        });

        function updateStars() {
            $scope.stars = [];
            for (var i = 0; i < $scope.max; i++) {
                $scope.stars.push({
                    filled: i < $scope.ratingValue
                });
            }
        }
        $scope.getAppDevProjectByProjectName();
        $scope.reset();
        updateStars();

    }];

    function watgFeedback() {
        return {
            restrict: 'E',
            templateUrl: 'src/app/directives/templates/watgFeedbackTemplate.html',
            scope: {
                projectName: '=',
                getUrl: '=',
                submitUrl: '=',
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
            link: function(scope) {
                if (!scope.feedbackInputHeight) scope.feedbackInputHeight = 100;
                if (!scope.feedbackAttachmentMaxSize) scope.feedbackAttachmentMaxSize = (1024 * 1024) * 2;
                if (!scope.feedbackAttachmentImageMaxHeight) scope.feedbackAttachmentImageMaxHeight = 1000;
                if (!scope.feedbackAttachmentImageMaxWidth) scope.feedbackAttachmentImageMaxWidth = 1000;
                if (!scope.feedbackMaxNumberOfAttachments) scope.feedbackMaxNumberOfAttachments = 5;
                if (!scope.logsEnabled) scope.logsEnabled = true;
                if (scope.logsEnabled) {
                    console.log(scope.projectName);
                    console.log(scope.getUrl);
                    console.log(scope.submitUrl);
                    console.log(scope.userFullName);
                    console.log(scope.urlReferrer);
                }
            }
        };
    }
})();
