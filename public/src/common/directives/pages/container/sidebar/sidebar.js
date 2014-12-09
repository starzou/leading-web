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
                    var $body = angular.element(document.body),
                        element = $element[0],
                        $sidebarMenu = angular.element(element.querySelector('.page-sidebar-menu')),
                        sidebarToggler = element.querySelector('.sidebar-toggler');
                    
                    sidebarToggler.addEventListener('click', function () {
                        /**
                         * sidebar 已经关闭, 则显示
                         */
                        if ($body.hasClass('page-sidebar-closed')) {
                            $body.removeClass('page-sidebar-closed');
                            $sidebarMenu.removeClass('page-sidebar-menu-closed');

                            $body.addClass('page-sidebar-fixed');
                        } else {
                            $body.addClass('page-sidebar-closed');
                            $sidebarMenu.addClass('page-sidebar-menu-closed');

                            $body.removeClass('page-sidebar-fixed');
                        }
                    });
                };
            }
        }
    }]);
})(window, document);