/**
 * Created by Kemal on 07/30/15.
 */
var watgFeedbackModule = angular.module('watgFeedback', ['watgFeedback.templates', 'watgRichtext'])
    .config(function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

/**
 * Created by Kemal on 07/30/15.
 */
watgFeedbackModule.directive("watgFeedback", function (watgFeedbackService) {
    var controller = ['$scope', function ($scope) {

        $scope.header = 'Feedback';
        $scope.isBusySubmittingFeedback = false;
        $scope.showConfirmation = false;
        $scope.form = {};
        $scope.max = 5;
        $scope.stars = [];
        $scope.ratingValue = 3;
        $scope.feebackContentResetCount = [];
        $scope.feedbackConfig = {
            height: 100,             //default 300
            multiLine: true,       //default true
            bootstrapCssPath: 'public/css/vendor.min.css',
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
        $scope.attachmentMaxSize = (1024 * 1024) / 5;
        $scope.attachmentMaxImageHeight = 1000;
        $scope.attachmentMaxImageWidth = 1000;
        $scope.attachmentUploadIsBusy = false;
        $scope.attachmentUploadMessages = [];

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

        $scope.getAppDevProjectByProjectName = function () {
            $scope.isBusy = true;
            watgFeedbackService.getAppDevProjectByProjectName($scope.getUrl + '/' + $scope.projectName).then(function (result) {
                $scope.appDevProjectUI.AppDevProjectId = result.AppDevProjectId;
                $scope.appDevProjectUI.AppDevProjectName = result.AppDevProjectName;
                $scope.appDevProjectUI.AppDevProjectDescription = result.AppDevProjectDescription;
                $scope.appDevProjectUI.AppDevProjectVersion = result.AppDevProjectVersion;
                $scope.isBusy = false;
            });
        };

        $scope.submitAppDevProjectFeedback = function () {

            $scope.isBusySubmittingFeedback = true;

            $scope.appDevProjectUI.Vendor = navigator["appMinorVersion"];
            $scope.appDevProjectUI.Platform = navigator["platform"];
            $scope.appDevProjectUI.UserAgent = navigator["userAgent"];
            $scope.appDevProjectUI.ScreenResolution = window.screen.availWidth + '*' + window.screen.availHeight;
            $scope.appDevProjectUI.Rating = $scope.ratingValue;

            if ($scope.urlReferrer)
                $scope.appDevProjectUI.FeedbackContent += "<br />(Previous page) " + $scope.urlReferrer;

            watgFeedbackService.submitAppDevProjectFeedback($scope.appDevProjectUI, $scope.submitUrl).then(function (result) {

                console.log(result);
                var transactionResult = result;

                if (transactionResult.HasError === true)
                    console.error('Feedback Error ' + transactionResult.Message);

                $scope.showConfirmation = true;
                $scope.isBusySubmittingFeedback = false;

            });
        };
        $scope.toggle = function (index) {
            $scope.ratingValue = index + 1;
        };
        $scope.$watch('ratingValue', function (oldValue, newValue) {
            if (newValue) {
                updateStars();
            }
        });
        $scope.$watch('projectName', function (oldValue, newValue) {
            if (newValue) {
                $scope.getAppDevProjectByProjectName();
            }
        });
        $scope.$watch('appDevProjectUI.FeedbackContent', function (newValue) {

            if (newValue === "" || newValue === "<br>")
                $scope.form.inputForm.$setValidity("message", false);
            else
                $scope.form.inputForm.$setValidity("message", true);

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

    }];
    return {
        restrict: 'E',
        templateUrl: 'app/templates/watgFeedbackTemplate.html',
        scope: {
            projectName: '=',
            getUrl: '=',
            submitUrl: '=',
            userFullName: '=',
            urlReferrer: '=',
            logsEnabled: "="
        },
        controller: controller,
        link: function (scope) {

            if (scope.logsEnabled) {
                console.log(scope.projectName);
                console.log(scope.getUrl);
                console.log(scope.submitUrl);
                console.log(scope.userFullName);
                console.log(scope.urlReferrer);
            }


        }
    }
});
/**
 * Created by Kemal on 09/01/15.
 */
watgFeedbackModule.directive("watgFeedbackFileselect", function () {

    return {
        restrict: 'A',
        scope: {
            files: '=files',
            maxFileSize: '=maxFileSize',
            maxImageHeight: '=maxImageHeight',
            maxImageWidth: '=maxImageWidth',
            messages: '=',
            isBusy: '='
        },
        link: function (scope, element) {

            element.bind("change", function (e) {

                scope.messages = [];
                scope.imageSrc;
                var selectedFiles = (e.srcElement || e.target).files;

                if (selectedFiles) {
                    for (var i = 0; i < selectedFiles.length; i++) {

                        scope.isBusy = true;
                        scope.$apply();

                        var selectedFile = selectedFiles[i];
                        var reader = new FileReader();
                        var image = new Image();

                        reader.readAsDataURL(selectedFile);
                        reader.onload = (function (theFile) {
                            return function (e) {

                                var isValid = true;

                                image.src = e.target.result;
                                scope.imageSrc = image.src;

                                if (image.height > scope.maxImageHeight) {
                                    isValid = false;
                                    scope.messages.push("Image " + theFile.name + " (" + image.height + "px) exceeds the max height limit of " + scope.maxImageHeight + "px.");
                                }
                                if (image.width > scope.maxImageWidth) {
                                    isValid = false;
                                    scope.messages.push("Image " + theFile.name + " (" + image.width + "px) exceeds the max width limit of " + scope.maxImageHeight + "px.");
                                }
                                if (theFile.size > scope.maxFileSize) {
                                    isValid = false;
                                    scope.messages.push("File " + theFile.name + " (" + (theFile.size / (1024 * 1024)).toFixed(2) + " MB) exceeds the max size limit of " + (scope.maxFileSize / (1024 * 1024)) + " MB.");
                                }

                                if (isValid)
                                    scope.files.push(theFile);

                                scope.isBusy = false;
                                scope.$apply();
                            };
                        })(selectedFile);

                    }
                }
                else {
                    scope.messages.push("File not found");
                }
            })
        }

    }
});
/**
 * Created by Kemal on 07/30/15.
 */
'use strict';
watgFeedbackModule.factory('watgFeedbackService', function ($http) {

    return {
        getAppDevProjectByProjectName: function (url) {
            console.log(url);
            return $http({
                method: 'GET',
                withCredentials: true,
                url: url
            }).
                then(function (response) {
                    return response.data;
                });
        },
        submitAppDevProjectFeedback: function (vm, url) {

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
                then(function (response) {
                    console.timeEnd('Posting Note');
                    return response.data;
                });


        }
    }

});