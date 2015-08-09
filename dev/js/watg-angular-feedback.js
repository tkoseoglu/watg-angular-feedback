/**
 * Created by Kemal on 07/30/15.
 */
var watgFeedbackModule = angular.module('watgFeedback', ['ngRoute', 'watgFeedback.templates','watgRichtext'])
    .config(function ($routeProvider, $httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];


        $routeProvider
            .when('/',
            {
                templateUrl: 'app/views/watgFeedbackView.html',
                controller: 'watgFeedbackTestController'
            })
            .otherwise({redirectTo: '/'});
    });

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


/**
 * Created by Kemal on 07/30/15.
 */
watgFeedbackModule.directive("watgFeedback", function (watgFeedbackService) {
    var controller = ['$scope', function ($scope) {

        $scope.header = 'Feedback';
        $scope.isBusySubmittingFeedback = false;
        $scope.showConfirmation = false;
        $scope.form = {};
        $scope.feedbackItem = {
            feedback: '',
            applicationId: 0,
            applicationName: '',
            applicationDescription: '',
            applicationVersion: '',
            vendor: '',
            platform: '',
            userAgent: '',
            screenResolution: '',
            rating: null
        };
        $scope.max = 5;
        $scope.stars = [];
        $scope.ratingValue = 3;

        $scope.feebackContentResetCount = [];
        $scope.feedbackConfig = {
            height: 300,             //default 300
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


        $scope.getProjectDetails = function () {
            $scope.isBusy = true;
            watgFeedbackService.getProjectDetails($scope.getUrl + '/' + $scope.projectName).then(function (result) {
                $scope.feedbackItem.applicationId = result.Id;
                $scope.feedbackItem.applicationName = result.ProjectName;
                $scope.feedbackItem.applicationDescription = result.ProjectDescription;
                $scope.feedbackItem.applicationVersion = result.Version;
                $scope.isBusy = false;
            });
        };
        $scope.submitFeedback = function () {

            $scope.isBusySubmittingFeedback = true;

            $scope.feedbackItem.vendor = navigator.vendor;
            $scope.feedbackItem.platform = navigator.platform;
            $scope.feedbackItem.userAgent = navigator.userAgent;
            $scope.feedbackItem.screenResolution = screen.width + '*' + screen.height;
            $scope.feedbackItem.rating = $scope.ratingValue;

            if ($scope.urlReferrer)
                $scope.feedbackItem.feedback += "<br />(Previous page) " + $scope.urlReferrer;

            watgFeedbackService.addProjectFeedback($scope.feedbackItem, $scope.submitUrl).then(function (result) {

                console.log(result);
                var transactionResult = result;

                if (transactionResult.HasError === true)
                    consoloe.error('Feedback Error ' + transactionResult.Message);

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
                $scope.getProjectDetails();
            }
        });
        $scope.$watch('feedbackItem.feedback', function (newValue, oldValue) {

            if (newValue === "" || newValue === "<br>")
                $scope.form.inputForm.$setValidity("message", false);
            else
                $scope.form.inputForm.$setValidity("message", true);

            console.log('rich text changed');
        });


        $scope.getProjectDetails();

        function updateStars() {
            $scope.stars = [];
            for (var i = 0; i < $scope.max; i++) {
                $scope.stars.push({
                    filled: i < $scope.ratingValue
                });
            }
        }

    }];
    return {
        restrict: 'E',
        templateUrl: 'app/templates/watgFeedbackTemplate.html',
        scope: {
            projectName: '=',
            getUrl: '=',
            submitUrl: '=',
            userFullName: '=',
            urlReferrer: '='
        },
        controller: controller,
        link: function (scope) {

            console.log(scope.projectName);
            console.log(scope.getUrl);
            console.log(scope.submitUrl);
            console.log(scope.userFullName);

        }

    }
});
/**
 * Created by Kemal on 07/30/15.
 */
'use strict';
watgFeedbackModule.factory('watgFeedbackService', function ($http) {

    return {
        getProjectDetails: function (url) {
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
        addProjectFeedback: function (vm, url) {
            console.log(vm);
            console.log(url);
            return $http({
                method: 'POST',
                data: $.param(vm),
                withCredentials: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: url
            }).
                then(function (response) {
                    return response.data;
                });
        }
    }

});