/**
 * Created by Kemal on 07/30/15.
 */
feedbackModule.directive("watgFeedback", function () {


    var controller = ['$scope', function ($scope) {

        $scope.header = 'Feedback';
        $scope.projectName = 'eMail Campaign App';
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
        }

        $scope.getProjectDetails = function () {
            $scope.isBusy = true;

            /* appService.getProjectDetails($scope.projectName).then(function (result) {
             $scope.feedbackItem.applicationId = result.Id;
             $scope.feedbackItem.applicationName = result.ProjectName;
             $scope.feedbackItem.applicationDescription = result.ProjectDescription;
             $scope.feedbackItem.applicationVersion = result.Version;
             $scope.isBusy = false;
             });*/

            $scope.isBusy = false;

        };
        $scope.getProjectDetails();

        $scope.submitFeedback = function () {

            $scope.isBusySubmittingFeedback = true;

            $scope.feedbackItem.vendor = navigator.vendor;
            $scope.feedbackItem.platform = navigator.platform;
            $scope.feedbackItem.userAgent = navigator.userAgent;
            $scope.feedbackItem.screenResolution = screen.width + '*' + screen.height;
            $scope.feedbackItem.rating = $scope.ratingValue;

            /* appService.addProjectFeedback($scope.feedbackItem).then(function (result) {

             var transactionResult = result;

             if (transactionResult.HasError === true) {
             toastr.error("Error submitting feedback", transactionResult.Message);
             }
             else {
             toastr.success("Feedback submitted");
             $scope.showConfirmation = true;
             }

             $scope.isBusySubmittingFeedback = false;

             });*/
        };

        //rating

        $scope.max = 5;
        $scope.stars = [];
        $scope.ratingValue = 3;

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
        };
    }];


    return {
        restrict: 'E',
        templateUrl: 'app/templates/feedbackTemplate.html',
        scope: {
            projectName: '=',
            serviceUrl: '=',
            userFullName: '='
        },
        controller: controller,
        link: function (scope, element) {

            console.log(scope.projectName);
            console.log(scope.serviceUrl);
            console.log(scope.userFullName);

        }

    }
});