angular.module('templates-main', ['app/directives/feedbackTemplate.html']);

angular.module("app/directives/feedbackTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/directives/feedbackTemplate.html",
    "<style>\n" +
    "    .star-rating {\n" +
    "        margin: 0;\n" +
    "        padding: 0;\n" +
    "        display: inline-block;\n" +
    "    }\n" +
    "\n" +
    "    .star-rating .star {\n" +
    "        padding: 1px;\n" +
    "        color: #ddd;\n" +
    "        font-size: 20px;\n" +
    "        text-shadow: .05em .05em #aaa;\n" +
    "        list-style-type: none;\n" +
    "        display: inline-block;\n" +
    "        cursor: pointer;\n" +
    "    }\n" +
    "\n" +
    "    .star-rating .star.filled {\n" +
    "        color: #fd0;\n" +
    "    }\n" +
    "\n" +
    "    .star-rating.readonly .star.filled {\n" +
    "        color: #666;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-xs-12\">\n" +
    "        <h2>Feedback</h2>\n" +
    "        <div ng-show=\"isBusy\">\n" +
    "            Loading...<i class=\"fa fa-refresh fa-spin\"></i>\n" +
    "        </div>\n" +
    "        <div ng-hide=\"isBusy\">\n" +
    "            <form name=\"form.inputForm\"\n" +
    "                  novalidate\n" +
    "                  ng-cloak\n" +
    "                  ng-hide=\"showConfirmation\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label>Application Name</label><br/>\n" +
    "                    <strong>{{feedbackItem.applicationName}} {{feedbackItem.applicationVersion}}</strong>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label>Application Details</label><br/> <strong>{{feedbackItem.applicationDescription}}</strong>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\"\n" +
    "                     ng-class=\"{'has-error': form.inputForm.message.$invalid}\">\n" +
    "                    <label>Feedback from {{userName}}</label>\n" +
    "                <textarea name=\"message\"\n" +
    "                          class=\"form-control\"\n" +
    "                          rows=\"4\"\n" +
    "                          ng-disabled=\"isBusySubmittingFeedback\"\n" +
    "                          ng-model=\"feedbackItem.feedback\"\n" +
    "                          required></textarea>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label>Rating</label><br/>\n" +
    "                    <ul class=\"star-rating\">\n" +
    "                        <li ng-repeat=\"star in stars\"\n" +
    "                            class=\"star\"\n" +
    "                            ng-class=\"{filled: star.filled}\"\n" +
    "                            ng-click=\"toggle($index)\">\n" +
    "                            <i class=\"fa fa-star\"></i>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <hr/>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <button class=\"btn btn-primary pull-right\"\n" +
    "                            type=\"button\"\n" +
    "                            ng-disabled=\"form.inputForm.$invalid || isBusySubmittingFeedback || !feedbackItem.applicationId\"\n" +
    "                            ng-click=\"submitFeedback()\">\n" +
    "                        <i class=\"fa fa-refresh fa-spin\"\n" +
    "                           ng-show=\"isBusySubmittingFeedback\"></i> Submit\n" +
    "                    </button>\n" +
    "                    <br/>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <div ng-show=\"showConfirmation\">\n" +
    "                <h3>Thank you!\n" +
    "                    <small>Your feedback has been successfully recorded.</small>\n" +
    "                </h3>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
