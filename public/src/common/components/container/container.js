/**
 * @class container
 * @description 首页 container主体模块
 * @time 2014-12-05 14:20
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var container = angular.module('components.container', ['components.container.sidebar', 'components.container.content']);

    container.directive('pageContainer', [function () {
        return {
            restrict   : 'A',
            replace    : true,
            templateUrl: 'common/components/container/container.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {

                };
            }
        }
    }]);
})(window, document);