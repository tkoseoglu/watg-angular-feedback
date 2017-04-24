/**
 * Created by Kemal on 07/30/15.
 */
(function() {
    "use strict";
    var modules = ['ngRoute',
        'watgFeedbackModule.templates',
        'watgFeedbackModule.const',
        'watgRichtextModule',
        'watgFileuploadModule'
    ];
    angular.module('watgFeedbackModule', modules);
}());