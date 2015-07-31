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