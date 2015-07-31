/**
 * Created by Kemal on 07/30/15.
 */
watgFeedbackModule.directive("watgFeedback", function (feedbackService) {
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

        $scope.getProjectDetails = function () {
            $scope.isBusy = true;
            feedbackService.getProjectDetails($scope.getUrl + '/' + $scope.projectName).then(function (result) {
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

            feedbackService.addProjectFeedback($scope.feedbackItem, $scope.submitUrl).then(function (result) {

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
        function updateStars() {

            $scope.stars = [];
            for (var i = 0; i < $scope.max; i++) {
                $scope.stars.push({
                    filled: i < $scope.ratingValue
                });
            }
        }

        $scope.getProjectDetails();

    }];
    return {
        restrict: 'E',
        templateUrl: 'app/templates/feedbackTemplate.html',
        scope: {
            projectName: '=',
            getUrl: '=',
            submitUrl: '=',
            userFullName: '='
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