/**
 * @class fileUpload
 * @description fileUpload 模块
 * @time 2014-12-23 10:35
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var fileUpload = angular.module('components.fileUpload', ['angularFileUpload']);

    fileUpload.directive('fileUpload', ['$compile', function ($compile) {
        return {
            restrict   : 'A',
            replace    : true,
            scope      : true,
            templateUrl: 'common/components/fileUpload/fileUpload.tpl.html',
            compile    : function ($element, $attr) {
                var element = $element[0],
                    addFilesButton = element.querySelector('.addFilesButton'),
                    $addFilesButton = angular.element(addFilesButton);

                return function ($scope, $element, $attr) {
                    // 设置 uploader对象
                    $scope.uploader = $scope[$attr.fileUpload || 'uploader'];

                    // 生成 file input
                    var $fileInput = angular.element('<input type="file" nv-file-select uploader="uploader"/>');

                    // 设置多选
                    if ('multiple' in $attr) {
                        $fileInput.attr('multiple', 'multiple');
                    }

                    // 编译, 追加 file input
                    var cloneFileInput = $compile($fileInput)($scope);
                    $addFilesButton.append(cloneFileInput);
                };
            }
        }
    }]);

})(window, document);