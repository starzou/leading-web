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
                    var optionPropertyName = $attr['progress']; // options对象的属性名
                    var $options = $scope[optionPropertyName]; // 读取配置

                    $scope.options = $options; // 设置

                    $scope.$watch(optionPropertyName + '.width', function (newValue, oldValue) {
                        if (newValue === oldValue && newValue === undefined) {
                            return;
                        }

                        // 调用完成函数
                        (+newValue === 100) && $options.complete && $options.complete(newValue, $options);

                        // 调用更新函数
                        $options.update && $options.update(newValue, $options);

                        // 更新title
                        $options.title = ('已完成 ' + newValue + '%');
                    });

                };
            }
        }
    }]);

})(window, document);