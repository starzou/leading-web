/**
 * @class menu
 * @description 菜单栏
 * @time 2014-12-10 16:10
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var menu = angular.module('components.container.sidebar.menu', []);

    menu.directive('sidebarMenu', [function () {
        return {
            restrict   : 'A',
            replace    : true,
            templateUrl: 'common/components/container/sidebar/menu/menu.tpl.html',
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {

                };
            }
        }
    }]);

})(window, document);