/**
 * @class fileUpload
 * @description fileUpload 模块
 * @time 2014-12-23 10:35
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var fileUpload = angular.module('components.fileUpload', []);

    fileUpload.directive('fileUpload', [function () {
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

                    }, false);

                    // 取消上传
                    cancelUploadFilesButton.addEventListener('click', function () {
                        $scope.files.length = 0;
                        fileInput.files.length = 0;
                        $scope.$digest();
                    }, false);


                    console.log('link...');
                };
            }
        }
    }]);

})(window, document);