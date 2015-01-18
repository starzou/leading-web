/**
 * @class menu
 * @description 菜单栏
 * @time 2014-12-10 16:10
 * @author StarZou
 **/
(function (window, document) {
    'use strict';

    var menu = angular.module('components.container.sidebar.menu', ['resources.menus']);

    menu.provider('menuUtil', function () {
        var html = '',
            hasNext = false;

        var me = {
            createMenuElement: function (menus) {
                html = '';
                return this.renderMenuTree(menus);
            },

            /**
             * 渲染 菜单树
             * @param menus
             * @returns  html
             */
            renderMenuTree: function (menus) {
                menus.forEach(function (element) {
                    hasNext = element.subList && element.subList.length > 0; // 有子菜单

                    html += '<li><a href="' + element.url + '"><i class="icon-home"></i><span class="title">' + element.menuName + '</span><span class="selected"></span>';

                    if (hasNext) {
                        html += '<span class="arrow"></span>'; // 加上箭头
                    }

                    html += '</a>';

                    if (hasNext) { // 渲染子菜单
                        html += '<ul class="sub-menu">';
                        me.renderMenuTree(element.subList);
                        html += '</ul>';
                    }

                    html += '</li>';
                });
                return html;
            }
        };

        this.$get = [function () {
            return me;
        }];
    });

    menu.directive('sidebarMenu', ['menuUtil', 'Menus', function (menuUtil, Menus) {
        return {
            restrict: 'A',
            compile : function ($element, $attr) {
                //console.log('compile', $element);
                return function ($scope, $element, $attr) {
                    //console.log('link', $element, $scope);

                    Menus.query(function (menus) {
                        var html = menuUtil.createMenuElement(menus);
                        $element[0].outerHTML = html;
                    });

                    //console.log(html);
                    //console.log($element[0]);
                };
            }
        }
    }]);

})(window, document);