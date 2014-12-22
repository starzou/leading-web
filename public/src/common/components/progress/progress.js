/**
 * @class progress
 * @description progress 模块
 * @time 2014-12-22 10:35
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var progress = angular.module('components.progress', []);

    progress.directive('progress', [function () {
        return {
            restrict   : 'A',
            replace    : true,
            scope      : true,
            templateUrl: 'common/components/progress/progress.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    var $options = $scope[$attr['progress']]; // 读取配置
                    var options = angular.copy($options); // 复制配置
                    
                    $scope.options = options; // 设置

                    $options.setWidth = function (width) {
                        options.width = width;
                    };

                    $options.setTitle = function (title) {
                        options.title = title;
                    };
                };
            }
        }
    }]);

})(window, document);