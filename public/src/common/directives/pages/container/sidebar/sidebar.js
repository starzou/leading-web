/**
 * @class sidebar
 * @description sidebar模块
 * @time 2014-12-05 14:20
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var sidebar = angular.module('directives.pages.container.sidebar', []);

    sidebar.directive('pageSidebar', [function () {
        return {
            restrict   : 'A',
            replace    : true,
            templateUrl: 'common/directives/pages/container/sidebar/sidebar.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {

                };
            }
        }
    }]);
})(window, document);