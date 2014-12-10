/**
 * @class header
 * @description 首页 header头部模块
 * @time 2014-12-05 14:20
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var header = angular.module('components.header', []);

    header.directive('pageHeader', [function () {
        return {
            restrict   : 'A',
            replace    : true,
            templateUrl: 'common/components/header/header.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {

                };
            }
        }
    }]);
})(window, document);