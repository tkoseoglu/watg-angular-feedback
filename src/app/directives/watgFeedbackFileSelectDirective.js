/**
 * Created by Kemal on 09/01/15.
 */
watgFeedbackModule.directive("watgFeedbackFileselect", function () {

    return {
        restrict: 'A',
        scope: {
            files: '=files',
            maxFileSize: '=maxFileSize',
            maxImageHeight: '=maxImageHeight',
            maxImageWidth: '=maxImageWidth',
            messages: '=',
            isBusy: '='
        },
        link: function (scope, element) {

            element.bind("change", function (e) {

                scope.messages = [];
                scope.imageSrc;
                var selectedFiles = (e.srcElement || e.target).files;

                if (selectedFiles) {
                    for (var i = 0; i < selectedFiles.length; i++) {

                        scope.isBusy = true;
                        scope.$apply();

                        var selectedFile = selectedFiles[i];
                        var reader = new FileReader();
                        var image = new Image();

                        reader.readAsDataURL(selectedFile);
                        reader.onload = (function (theFile) {
                            return function (e) {

                                var isValid = true;

                                image.src = e.target.result;
                                scope.imageSrc = image.src;

                                if (image.height > scope.maxImageHeight) {
                                    isValid = false;
                                    scope.messages.push("Image " + theFile.name + " (" + image.height + "px) exceeds the max height limit of " + scope.maxImageHeight + "px.");
                                }
                                if (image.width > scope.maxImageWidth) {
                                    isValid = false;
                                    scope.messages.push("Image " + theFile.name + " (" + image.width + "px) exceeds the max width limit of " + scope.maxImageHeight + "px.");
                                }
                                if (theFile.size > scope.maxFileSize) {
                                    isValid = false;
                                    scope.messages.push("File " + theFile.name + " (" + (theFile.size / (1024 * 1024)).toFixed(2) + " MB) exceeds the max size limit of " + (scope.maxFileSize / (1024 * 1024)) + " MB.");
                                }

                                if (isValid)
                                    scope.files.push(theFile);

                                scope.isBusy = false;
                                scope.$apply();
                            };
                        })(selectedFile);

                    }
                }
                else {
                    scope.messages.push("File not found");
                }
            })
        }

    }
});