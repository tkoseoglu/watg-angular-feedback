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