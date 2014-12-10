/**
 * @class sidebar
 * @description sidebar模块
 * @time 2014-12-05 14:20
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var sidebar = angular.module('components.container.sidebar', []);

    sidebar.directive('pageSidebar', [function () {
        return {
            restrict   : 'A',
            replace    : true,
            templateUrl: 'common/components/container/sidebar/sidebar.tpl.html',
            scope      : true,
            controller : ['$scope', function ($scope) {
                $scope.menus = [{
                    menuName: '积分发放',
                    url     : '#/',
                    subList : [{menuName: '消费送积分', url: '#/points/consumes'}, {
                        menuName: '收藏送积分',
                        url     : '#/points/consumes'
                    }, {
                        menuName: '评价送积分',
                        url     : '#/points/consumes'
                    }]
                }];
                console.log($scope);
            }],
            compile    : function ($element, $attr) {
                return function ($scope, $element, $attr) {
                    var $body = angular.element(document.body),
                        element = $element[0],
                        sidebarMenu = element.querySelector('.page-sidebar-menu'),
                        $sidebarMenu = angular.element(sidebarMenu),
                        sidebarToggler = element.querySelector('.sidebar-toggler');

                    /**
                     * 显示, 隐藏 sidebar
                     */
                    sidebarToggler.addEventListener('click', function () {
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


                    /**
                     * 显示, 隐藏 menu
                     */
                    $sidebarMenu.on('click', function (event) {
                        var target = event.target,
                            liElement,
                            liElements,
                            ulElement;

                        if (target.tagName.toLowerCase() === 'a') {
                            liElement = target.parentNode;
                        } else {
                            liElement = target.parentNode.parentNode;
                        }

                        ulElement = liElement.parentNode;
                        liElements = ulElement.children;

                        for (var i = 0; i < liElements.length; i++) {
                            if (liElements[i] != liElement) {
                                liElements[i].classList.remove('active');
                            }
                        }

                        liElement.classList.toggle('active');

                        var arrow = liElement.querySelector('a > .arrow');
                        arrow && arrow.classList.toggle('open');
                    });

                };
            }
        }
    }]);
})(window, document);