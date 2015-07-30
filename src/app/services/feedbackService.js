/**
 * Created by Kemal on 07/30/15.
 */
'use strict';
feedbackModule.factory('feedbackService', function ($http, $log, $q, $rootScope) {

    return {
        //feedback
        getProjectDetails: function (projectName, url) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: url
            }).
                then(function (response) {
                    return response.data;
                });
        },
        //POST
        addProjectFeedback: function (vm, url) {
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