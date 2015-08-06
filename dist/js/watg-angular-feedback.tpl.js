angular.module('watgFeedback.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("app/templates/watgFeedbackTemplate.html",
    "<div class=feedbackMainContent><h2>Feedback</h2><div ng-show=isBusy>Loading...<i class=\"fa fa-refresh fa-spin\"></i></div><div ng-hide=isBusy><form name=form.inputForm novalidate ng-cloak ng-hide=showConfirmation><div class=form-group><label>Application Name</label><br><strong>{{feedbackItem.applicationName}} {{feedbackItem.applicationVersion}}</strong></div><div class=form-group><label>Application Details</label><br><strong>{{feedbackItem.applicationDescription}}</strong></div><div class=form-group ng-class=\"{'has-error': form.inputForm.message.$invalid}\"><label>Feedback from {{userFullName}}</label><div><watg-richtext-editor id=\"'feedbackContent'\" rich-text=feedbackItem.feedback config=feedbackConfig reset-count=feebackContentResetCount required></watg-richtext-editor></div></div><div class=form-group><label>Rating</label><br><ul class=star-rating><li ng-repeat=\"star in stars\" class=star ng-class=\"{filled: star.filled}\" ng-click=toggle($index)><i class=\"fa fa-star\"></i></li></ul></div><hr><div class=form-group><button class=\"btn btn-primary pull-right\" type=button ng-disabled=\"form.inputForm.$invalid || isBusySubmittingFeedback || !feedbackItem.applicationId\" ng-click=submitFeedback()><i class=\"fa fa-refresh fa-spin\" ng-show=isBusySubmittingFeedback></i> Submit</button><br></div></form><div ng-show=showConfirmation><h3>Thank you! <small>Your feedback has been successfully recorded.</small></h3></div></div></div>");
}]);
