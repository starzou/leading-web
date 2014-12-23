/**
 * @class fileUpload
 * @description fileUpload 模块
 * @time 2014-12-23 10:35
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var fileUpload = angular.module('components.fileUpload', []);

    /**
     * 上传服务对象
     */
    fileUpload.provider('fileUploader', function () {
        var me = {
            sendFile: function (options, file) {
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                xhr.open("POST", options.url, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            options.success && options.success();
                        } else {
                            options.error && options.error();
                        }
                    }
                };
                formData.append(options.name, file);
                xhr.send(formData);
            }
        };

        this.$get = [function () {
            return me;
        }];
    });

    fileUpload.directive('fileUpload', ['fileUploader', function (fileUploader) {
        return {
            restrict   : 'A',
            replace    : true,
            scope      : true,
            templateUrl: 'common/components/fileUpload/fileUpload.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    var fileUploadElement = $element[0],
                        fileInput = fileUploadElement.querySelector('[type="file"]'),
                        addFilesButton = fileUploadElement.querySelector('.addFilesButton'),
                        startUploadFilesButton = fileUploadElement.querySelector('.startUploadFilesButton'),
                        cancelUploadFilesButton = fileUploadElement.querySelector('.cancelUploadFilesButton');

                    $scope.files = [];

                    var options = {
                        url : '/rest/files',
                        name: 'myFile'
                    };

                    // 选择文件
                    fileInput.addEventListener('change', function () {
                        angular.forEach(fileInput.files, function (file) {
                            $scope.files.push(file);
                        });
                        $scope.$digest();
                    }, false);

                    // 添加文件
                    addFilesButton.addEventListener('click', function () {
                        fileInput.click();
                    }, false);

                    // 开始上传
                    startUploadFilesButton.addEventListener('click', function () {
                        angular.forEach($scope.files, function (file) {
                            $scope.upload(file);
                        });
                    }, false);

                    // 取消上传
                    cancelUploadFilesButton.addEventListener('click', function () {
                        $scope.files.length = 0;
                        fileInput.files.length = 0;
                        $scope.$digest();
                    }, false);


                    $scope.upload = function (file, index) {
                        fileUploader.sendFile(options, file);
                    };

                    $scope.cancel = function (file, index) {
                        $scope.files.splice(index, 1);
                    };


                    console.log('link...');
                };
            }
        }
    }]);

})(window, document);