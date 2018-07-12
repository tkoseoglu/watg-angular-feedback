angular.module('watgFeedbackModule.templates', []).run(['$templateCache', function ($templateCache) {
  "use strict";
  $templateCache.put("app/directives/templates/watgFeedbackTemplate.html",
    "<div class=feedbackMainContent ng-cloak><h2>Feedback</h2><div ng-show=isBusy>Preparing page... <i class=\"fa fa-refresh fa-spin\"></i></div><div ng-hide=isBusy><form name=form.inputForm class=feedbackForm novalidate ng-hide=\"showConfirmation || projectNotFound\"><div class=form-group><div>{{appDevProjectUI.AppDevProjectName}} ({{appDevProjectUI.AppDevProjectVersion}}) Description</div><div><strong>{{appDevProjectUI.AppDevProjectDescription}}</strong></div></div><div class=form-group ng-class=\"{'has-error': form.inputForm.feedbackContent.$invalid}\"><div>Feedback from <strong>{{userFullName}}</strong></div><div froala=editorOptions ng-model=appDevProjectUI.FeedbackContent required></div></div><div class=form-group><div>Click stars to rate</div><div><ul class=star-rating><li ng-repeat=\"star in stars\" class=star ng-class=\"{filled: star.filled}\" ng-click=toggle($index)><i class=\"fa fa-star\"></i></li></ul></div></div><div class=form-group ng-class=\"{'has-error': form.inputForm.file.$invalid}\"><watg-fileupload config=watgFileuploadConfig></watg-fileupload></div><hr><div class=form-group><div class=pull-right><button class=\"btn btn-primary\" type=button ng-disabled=\"form.inputForm.$invalid || isBusySubmittingFeedback || !appDevProjectUI.AppDevProjectId || !appDevProjectUI.FeedbackContent\" ng-click=submitAppDevProjectFeedback()><i class=\"fa fa-refresh fa-spin\" ng-show=isBusySubmittingFeedback></i> Submit</button></div><br></div></form><div ng-show=showConfirmation><h3>Thank you! <small>Your feedback has been successfully recorded.</small></h3></div><div ng-show=projectNotFound><h3>Oops! Something went wrong</h3><div class=\"alert alert-danger\">Feedback not possible at the moment. Please try again later. WATG AppDev has been notified.</div></div></div></div>");
}]);
